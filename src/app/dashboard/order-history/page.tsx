"use client";

import { DataTable, PaginationTypes } from "@/components/ui/data-table";
import { columns } from "./column";
// import { orderHistoryData } from "./data";
import OrderHistoryMobileTable from "@/app/dashboard/order-history/OrderHistoryMobileTable";
import apiCAll from "@/lib/apiCall";
import { useEffect, useState } from "react";
import { IOrderHistory } from "@/types";
import EmptyState from "@/components/empty-state";
import { endpoints } from "@/lib/endpoints";

export default function OrderHistory() {
  const [data, setData] = useState<IOrderHistory[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationTypes | undefined>();

  async function getOrders() {
    try {
      await apiCAll({
        url: "order/history?page=1&pageSize=10",
        method: "get",
        sCB(res) {
          setData(res.data.data);
          const paginationData: PaginationTypes = res.data.pagination;
          setPaginationData(paginationData);
        },
      });
    } catch (error) {
      console.log(error, "this is the error!!");
    }
  }

  async function getMoreOrders(page: number) {
    // return console.log(page, "this is the page number");

    try {
      await apiCAll({
        url: `${endpoints.GET_ALL_ORDERS}?page=${page}&pageSize=10`,
        method: "get",
        sCB(res) {
          console.log(res.data);
          setData(res.data.data);
          const paginationData: PaginationTypes = res.data.pagination;
          setPaginationData(paginationData);
        },
      });
    } catch (error) {
      console.log(error, "this is the error!!");
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  // console.log(data);

  return data.length >= 1 ? (
    <section className="w-full h-full pb-10">
      <div className="hidden lg:block">
        <DataTable columns={columns} data={data} paginationData={paginationData} getPageData={getMoreOrders} />
      </div>

      <div className="block lg:hidden">
        <OrderHistoryMobileTable data={data} paginationData={paginationData} getPageData={getMoreOrders} />
      </div>
    </section>
  ) : (
    <EmptyState label="No order history found." />
  );
}
