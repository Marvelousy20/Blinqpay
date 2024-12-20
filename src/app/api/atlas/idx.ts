import puppeteer from "puppeteer-extra";
import { monitorOrders } from "./utils/monitor-orders";
import stealthPlugin from "puppeteer-extra-plugin-stealth";

const pendingOrdersListPageURL =
  "https://www.bybit.com/fiat/trade/otc/orderList/?orderType=processing&coin=&actionType=&status=10";

const loginURL = "file:///Users/arpeiks/Desktop/Bybit%20P2P%20Crypto%20Trading%20_%20Trade%20Fiat-to-Crypto.html";

puppeteer.use(stealthPlugin());

const start = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-features=IsolateOrigins,site-per-process", loginURL],
  });

  const pages = await browser.pages();

  const page = pages?.[0];
  page?.setDefaultNavigationTimeout(0);

  await page.waitForFunction(`window.location.href.startsWith("${loginURL}")`, { timeout: 0 });

  await monitorOrders(page);
};

start();
