import Redis from "ioredis";
import { Page } from "puppeteer";

export type TStatus = "pending" | "processing" | "completed";

export interface IOrder {
  number: string;
  status: TStatus;
}

export const redis = new Redis(
  "rediss://red-cqh3sl4s1f4s73bit8lg:JomzZ7RnR46p85ZSg8rE7gmRRAL9I7qM@oregon-redis.render.com:6379"
);

export const orders: Map<string, IOrder> = new Map();

export const addOrders = (values: string[], page: Page, cb?: (orders: Map<string, IOrder>, page: Page) => void) => {
  let hasNewOrder = false;

  values.forEach((order) => {
    const exists = orders.has(order);
    hasNewOrder = !exists || hasNewOrder;

    if (!exists) orders.set(order, { status: "pending", number: order });
    if (cb && hasNewOrder) cb(orders, page);
  });
};

export const updateOrderStatus = async (order: string, status: TStatus) => {
  const exists = orders.has(order);
  if (!exists) return;

  orders.set(order, { number: order, status });

  console.log(orders.values());
};
