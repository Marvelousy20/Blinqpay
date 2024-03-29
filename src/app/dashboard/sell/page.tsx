"use client";
import { AlertTriangle } from "lucide-react";
import { ISellColumn } from "./column";
import { sellData } from "./data";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SellMobileTable from "./SellMobileTable";

export default function Sell() {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div>
        <AlertTriangle size={36} />
      </div>

      <div className="max-w-sm text-center mt-2">
        {/* <span className="text-xl">
          Contact Us on{" "}
          <a
            href=""
            className="underline underline-offset-2 text-blue-500"
          >
            WhatsApp
          </a>{" "}
          to join the OTC community and sell your assets instantly.
        </span> */}
        <span className="text-xl">
          Connect to customer support{" "}
          <a href="" className="underline underline-offset-2 text-blue-500">
            WhatsApp
          </a>
        </span>
      </div>

      {/* <div className="lg:flex justify-between gap-x-8 items-center grid grid-cols-2">
        <h1 className="text-lg md:text-2xl font-bold">
          Sell Dashboard for Merchants
        </h1>

        <Button variant="primary" className="">
          Trade Request
        </Button>
      </div> */}

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 mt-12 gap-x-12 gap-y-5">
        <div className="relative bg-input rounded-3xl border border-white border-opacity-25 px-3 py-3 xl:py-4">
          <span className="text-3xl absolute right-5 top-0">...</span>

          <h3 className="opacity-50">Trade Counts</h3>

          <h4 className="mt-3 text-2xl font-bold">200</h4>
        </div>
        <div className="relative bg-input rounded-3xl border border-white border-opacity-25 px-3 py-3 xl:py-4">
          <span className="text-3xl absolute right-5 top-0">...</span>

          <h3 className="opacity-50">Amount of USDT Sold</h3>

          <h4 className="mt-3 text-2xl font-bold flex items-center gap-x-2">
            <p>&#36;10,000</p>
          </h4>
        </div>

        <div className="relative bg-input rounded-3xl border border-white border-opacity-25 px-3 py-3 xl:py-4">
          <span className="text-3xl absolute right-5 top-0">...</span>

          <div>
            <div>
              <h3 className="opacity-50">Amount in Naira</h3>
              <h4 className="mt-3 text-2xl font-bold">&#8358;400,000,00</h4>
            </div>
          </div>
        </div>
      </div> */}

      {/* <h4 className="mt-8 text-2xl font-bold">History</h4>
      <div className="hidden lg:block">
        <DataTable columns={ISellColumn} data={sellData} noHeader />
      </div>
      <div className="lg:hidden">
        <SellMobileTable data={sellData} />
      </div> */}
    </div>
  );
}
