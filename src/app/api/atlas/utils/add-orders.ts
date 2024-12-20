import axios from "axios";
import { Page } from "puppeteer";
import * as monitorOrders from "./monitor-orders";
import { addOrders, IOrder, redis, updateOrderStatus } from "./values";

const BACKEND_URL = "http://localhost:3000/api";

const checkPending = (orders: any) => {
  for (let order of orders.values()) {
    if (order.status === "pending") return true;
  }

  return false;
};

const openOrder = async (order: IOrder, prevPage: Page) => {
  const page = await prevPage.browser().newPage();
  await page.goto(`https://www.bybit.com/fiat/trade/otc/orderList/${order.number}`);

  await page.waitForNetworkIdle({ timeout: 0 });

  const rate = await page.$$eval(".summary-item-value.buy", (el) => el?.[1]?.innerHTML).catch(() => "N/A");
  const amountInNaira = await page.$$eval(".summary-item-value.buy", (el) => el?.[0]?.innerHTML).catch(() => "N/A");
  const amountInUSDT = await page.$$eval(".summary-item-value.buy", (el) => el?.[2]?.innerHTML).catch(() => "N/A");

  const accountName = await page.$$eval(".by-space-item", (el) => el?.[16]?.innerHTML).catch(() => "N/A");
  const bankName = await page.$$eval(".by-space-item", (el) => el?.[20]?.innerHTML).catch(() => "N/A");
  const accountNumber = await page.$$eval(".by-space-item", (el) => el?.[18]?.innerHTML).catch(() => "N/A");

  const extractedOrder = {
    rate,
    bankName,
    accountName,
    amountInUSDT,
    amountInNaira,
    accountNumber,
    orderId: order.number,
  };

  console.log(`
    Rate: ${rate}
    Bank Name: ${bankName}
    Order ID: ${order.number}
    Account Name: ${accountName}
    Amount in USDT: ${amountInUSDT}
    Account Number: ${accountNumber}
    Amount in Naira: ${amountInNaira}
  `);

  await redis.lpush("orders", JSON.stringify(extractedOrder)); // Store order in Redis

  try {
    await axios.post(`${BACKEND_URL}/order`, extractedOrder);
    console.log(`Order data sent to backend for order ID: ${order.number}`);
  } catch (error: any) {
    console.error(`Error sending data to backend for order ID: ${order.number}: ${error?.message}`);
  }
};

const callback = async (orders: any, page: Page) => {
  let count = 0;
  const hasNewOrder = checkPending(orders);
  if (!hasNewOrder) return;

  monitorOrders.stop();

  for (let [, order] of orders) {
    if (count >= 3) break;
    if (order.status !== "pending") continue;

    await openOrder(order, page);
    updateOrderStatus(order.number, "processing");

    count++;
  }

  monitorOrders.start(page);
};

export const getOrderIds = async (page: Page) => {
  const orders = await page.$$eval(".id", (ids) => ids.map((el) => el.innerHTML));
  if (orders.length) addOrders(orders || [], page, callback);
};
