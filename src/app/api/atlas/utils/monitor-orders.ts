import { Page } from "puppeteer";
import { getOrderIds } from "./add-orders";

const intervalTime = 10_000;
let intervalId: null | NodeJS.Timeout;

export const start = (page: Page) => {
  if (intervalId) return;
  console.log("starting to monitor for new orders");
  intervalId = setInterval(async () => await getOrderIds(page), intervalTime);
};

export const stop = () => {
  if (!intervalId) return;
  console.log("stopping new order monitoring");
  clearInterval(intervalId);
  intervalId = null;
};

export const monitorOrders = async (page: Page) => {
  if (!page) return;
  start(page);
};
