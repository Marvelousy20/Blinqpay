const orders: any[] = [];

import Redis from "ioredis";
import { NextRequest } from "next/server";

const redis = new Redis(
  "rediss://red-cqh3sl4s1f4s73bit8lg:JomzZ7RnR46p85ZSg8rE7gmRRAL9I7qM@oregon-redis.render.com:6379"
);

export async function POST(request: NextRequest) {
  const body = await request.json();
  orders.push(body);
  return Response.json({});
}

export async function GET() {
  console.log("orders", orders);

  const xrders = await redis.lrange("orders", 0, -1); // Retrieve orders from Redis

  const yrders = xrders.map((x) => JSON.parse(x));

  return Response.json(orders?.length ? orders : yrders);
}
