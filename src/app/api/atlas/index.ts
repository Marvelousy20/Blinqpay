import puppeteer from "puppeteer-extra";
import { monitorOrders } from "./utils/monitor-orders";
import stealthPlugin from "puppeteer-extra-plugin-stealth";

const pendingOrdersListPageURL =
  "https://www.bybit.com/fiat/trade/otc/orderList/?orderType=processing&coin=&actionType=&status=10";

const loginURL =
  "https://www.bybit.com/en/login?redirect_url=https://www.bybit.com/fiat/trade/otc/orderList/?orderType=processing&coin=&actionType=&status=10";

puppeteer.use(stealthPlugin());

const start = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-features=IsolateOrigins,site-per-process", loginURL],
  });

  const pages = await browser.pages();

  const page = pages?.[0];
  page?.setDefaultNavigationTimeout(0);

  await page.waitForFunction(`window.location.href.startsWith("${pendingOrdersListPageURL}")`, { timeout: 0 });

  await monitorOrders(page);
};

start();
