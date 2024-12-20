"use client";

import Image from "next/image";
import { DataTable, PaginationTypes } from "@/components/ui/data-table";
import { dashboardColumn } from "./home/column";
import { Button } from "@/components/ui/button";
import MobileTable from "@/app/dashboard/home/DashboardMobileTable";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { formatAmount } from "@/lib/utils";
import apiCAll from "@/lib/apiCall";
import { useOrders } from "@/context/pendingOrder";
import { Icons } from "@/components/icons";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

import { SelectConnectedBanks } from "@/components/ui/select";
import PendingOrdersEmptyState from "@/components/pendingOrdersEmptyState";
import { usePathname } from "next/navigation";
import { notify } from "@/components/ui/toast";
import { useStore } from "@/context/store";
import { IDashboard } from "@/types";
import AutoPay from "./home/autopay";
import axios from "axios";

type DashboardSummary = {
  totalTransferCount: number;
  totalTransferAmount: number;
  walletBalance: number;
};

export default function Dashboard() {
  const [allOrders, getAllOrders] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary | null>(null);
  const [paginationData, setPaginationData] = useState<PaginationTypes | undefined>();

  const pathname = usePathname();
  const {
    connectedBanks,
    getAllConnectedBanks,
    selectedBankId,
    setSelectedBankId,
    accountBalance,
    getConnectedBanksBalance,
  } = useStore();

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const openPayDialog = () => {
    setIsPayDialogOpen(true);
  };

  const handleBlurToggle = () => {
    setIsBlurred((prevIsBlurred) => !prevIsBlurred);
  };

  // Get store values
  const { pendingOrders, getPendingOrders, isLoading, pendingOrdersIds, setPendingOrdersIds, setPendingOrders } =
    useOrders();

  const handlePayAllOrder = async () => {
    setIsLoading(true);
    const id = localStorage.getItem("selectedBankId");
    apiCAll({
      method: "post",
      url: "/order/pay",
      data: { orderIds: pendingOrdersIds },
      sCB(res) {
        setIsLoading(false);
        setIsPayDialogOpen(false);
        getPendingOrders();
        // setPendingOrdersIds([]);
        // getConnectedBanksBalance(Number(id));
        setTimeout(() => getConnectedBanksBalance(Number(id)), 5000);
      },
      eCB(res) {
        setIsLoading(false);
        setIsPayDialogOpen(false);
        console.error(res.error);
      },
      toast: true,
    });
  };

  const handleNoConfirmation = () => {
    setPendingOrdersIds([]);
    setIsDialogOpen(false);
    setIsPayDialogOpen(false);
  };

  const handleSelectChange = (id: string) => {
    setSelectedBankId(id);
    localStorage.setItem("selectedBankId", id);

    getConnectedBanksBalance(Number(id));
    setPayoutAccount(Number(id));
    return id;
  };

  const getMorePendingOrders = async (page: number) => {
    setIsLoading(true);
    try {
      await apiCAll({
        url: "/order/all?page=1&pageSize=10",
        method: "get",
        sCB(res) {
          const orders: IDashboard[] = res.data.data;
          setPendingOrders(orders);
          setPendingOrdersIds(orders.map((order) => order.id));
          const paginationData: PaginationTypes = res.data.pagination;
          setPaginationData(paginationData);
        },
      });
    } catch (error) {
      console.error(error, "this is the error");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(pendingOrders);

  const getOrders = async () => {
    console.log("here");
    console.log(isLoading);
    if (isLoading) return;
    setIsLoading(true);

    try {
      const orders: any = await axios.get("/api/order");

      const pOrders = orders?.data?.map((o: any) => ({
        id: 0,
        accountName: o.accountName,
        accountNumber: o.accountNumber,
        bankName: o.bankName,
        status: "pending",
        rate: +o.rate?.replace("NGN", "")?.replace(",", "")?.trim(),
        amount: +o.amountInNaira?.replace("NGN", "")?.replace(",", "")?.trim(),
        createdAt: new Date(),
        orderNumber: o.orderId,
        meta: null,
      }));

      console.log("jhere", pOrders);

      setPendingOrders(pOrders);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // ---------
  useEffect(() => {
    //getPendingOrders();
    getAllConnectedBanks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const id = setInterval(() => getOrders(), 5000);

    return clearInterval(id);
  }, []);

  const setPayoutAccount = async (id: number) => {
    await apiCAll({
      url: `/bank/activate/${id}`,
      method: "post",
      sCB(res) {
        console.log("payout account is bank with id", id);
      },
      eCB(res) {
        console.error(res.error);
      },
    });
  };

  useEffect(() => {
    const id = localStorage.getItem("selectedBankId");
    setSelectedBankId(id);
    if (id) {
      getConnectedBanksBalance(Number(id));
      setPayoutAccount(Number(id));
    } else {
      if (connectedBanks.length >= 1) {
        const defaultBankId = connectedBanks[0]?.id;
        setSelectedBankId(String(defaultBankId));
        getConnectedBanksBalance(Number(defaultBankId));
        localStorage.setItem("selectedBankId", String(connectedBanks[0].id));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedBanks, pathname]);

  const getDashboardSummary = async () => {
    apiCAll({
      method: "get",
      url: "order/summary",
      sCB(res) {
        setDashboardSummary(res.data);
        // console.log("Dashboard Hiistory", res.data);
      },
      eCB(res) {
        console.error(res.error);
      },
    });
  };

  useEffect(() => {
    getDashboardSummary();
  }, []);

  useEffect(() => {
    setInterval(() => getOrders, 10000);
  }, []);

  // newly added
  const handleDataChange = (updatedData: IDashboard[]) => {
    setPendingOrders(updatedData);
  };

  const toggleAtlas = () => {
    axios.post("/api/process");
  };

  return (
    <div className="">
      <div className="lg:flex justify-between">
        <div>
          <p className="flex items-center gap-x-2">
            <span className="opacity-50">Bank Balance</span>
          </p>
          <div className="flex items-center gap-2">
            <h2 className={`text-4xl flex items-center gap-x-2 font-bold ${isBlurred ? "blur" : ""}`}>
              {accountBalance !== null ? <p>&#8358;{formatAmount(accountBalance)}</p> : <p>&#8358;0.00</p>}
            </h2>
            <div onClick={handleBlurToggle}>
              {isBlurred ? (
                <div>
                  <Icons.Eye stroke="white" className="dark:block hidden" />
                  <Icons.Eye stroke="black" className="block dark:hidden" />
                </div>
              ) : (
                <div>
                  <Icons.Lock stroke="white" className="dark:block hidden" />
                  <Icons.Lock stroke="black" className="block dark:hidden" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center">
            <p className="opacity-60 mb-2">Available Banks</p>
          </div>
          <div className="text-center">
            <SelectConnectedBanks
              placeholder="Select Bank"
              options={connectedBanks}
              className="w-44"
              onChange={handleSelectChange}
              value={selectedBankId?.toString()}
            />
          </div>
        </div>
      </div>

      {/* Transfer details */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-12 gap-x-12 gap-y-5">
          <div className="relative bg-milky dark:bg-input rounded-3xl border border-white border-opacity-25 px-3 py-3 xl:py-4">
            <span className="text-3xl absolute right-5 top-0">...</span>

            <h3 className="opacity-50">Total Transfer Count</h3>

            <h4 className="mt-3 text-2xl font-bold">{dashboardSummary?.totalTransferCount}</h4>
          </div>
          <div className="relative bg-milky dark:bg-input rounded-3xl border border-white border-opacity-25 px-3 py-3 xl:py-4">
            <span className="text-3xl absolute right-5 top-0">...</span>

            <h3 className="opacity-50">Total Amount Transferred</h3>

            <h4 className={`mt-3 text-2xl font-bold ${isBlurred ? "blur" : ""}`}>
              {dashboardSummary !== null ? (
                <span>
                  &#8358;
                  {formatAmount(dashboardSummary?.totalTransferAmount as number)}
                </span>
              ) : (
                <span> &#8358;0.00</span>
              )}
            </h4>
          </div>

          <div className="relative bg-milky dark:bg-input rounded-3xl border border-white border-opacity-25 px-3 py-3 xl:py-4 flex items-center justify-between">
            <div>
              <h3 className="opacity-50">Wallet Ballance</h3>

              <h4 className="mt-3 text-2xl font-bold">
                {dashboardSummary !== null ? (
                  <span>
                    &#8358;
                    {formatAmount(dashboardSummary?.walletBalance as number)}
                  </span>
                ) : (
                  <span> &#8358;0.00</span>
                )}
              </h4>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 mt-8 lg:mt-5 items-center">
          <div className="flex items-center gap-2 col-span-3">
            <h3 className="sm:text-2xl font-bold whitespace-nowrap">
              <span>{pendingOrders.length} Active Orders</span>
            </h3>
            <button
              //onClick={getPendingOrders}
              className="gap-1 items-center text-gray-500  hidden md:flex"
            >
              <div className="h-6 w-6 rounded-md border-2 flex items-center justify-center border-gray-500">
                <div className={`${isLoading ? "animate-spin" : ""}`}>
                  <RefreshCcw size={12} />
                </div>
              </div>
            </button>
          </div>

          <div className="flex gap-x-1 sm:gap-x-1.5 lg:gap-x-5 col-span-5 justify-end items-center">
            <div>
              <Button className="!bg-button-primary text-[.75rem] lg:text-base text-white" onClick={getOrders}>
                S
              </Button>
            </div>
            <div>
              <AutoPay
                onAutoPayToggle={toggleAtlas}
                //onAutoPayToggle={handlePayAllOrder}
              />
            </div>
          </div>
        </div>
        <button
          //onClick={getPendingOrders}
          className="flex gap-2 items-center p-2 md:hidden text-black fixed bottom-5 left-1/2 transform -translate-x-1/2 justify-center w-16 h-16 rounded-full bg-onboard-bg dark:bg-gray-900"
        >
          <div className="h-8 w-8 flex items-center justify-center border-white rounded-md">
            <div className={`${isLoading ? "animate-spin" : ""}`}>
              <RefreshCcw size={26} color="white" />
            </div>
          </div>
        </button>
      </div>

      {/* Search icon */}
      <div></div>

      {/* Table */}
      {pendingOrders.length >= 1 ? (
        <section className="w-full h-full mt-10">
          <div className="hidden lg:block">
            <DataTable
              columns={dashboardColumn}
              data={pendingOrders}
              emptyStateLabel="No active orders yet."
              paginationData={paginationData}
              getPageData={getMorePendingOrders}
            />
          </div>

          <div className="lg:hidden">
            <MobileTable data={pendingOrders} onDataChange={handleDataChange} />
          </div>
        </section>
      ) : (
        <div className="mt-10">
          <PendingOrdersEmptyState label="No pending orders." />
        </div>
      )}

      <Dialog open={isPayDialogOpen} onOpenChange={setIsPayDialogOpen}>
        <DialogContent className="text-center text-white">
          <div className="flex flex-col items-center">
            <Image src="./dashboard/warning.svg" alt="warning" width={88} height={88} className="flex justify-center" />

            <p className="mt-5 font-medium text-lg lg:text-2xl">Are you sure you want to pay all orders?</p>

            <Button
              variant="primary"
              onClick={() => {}}
              isLoading={loading}
              className="w-full mt-12"
              //onClick={handlePayAllOrder}
            >
              Yes
            </Button>
            <Button
              className="w-full mt-5"
              //onClick={handleNoConfirmation}
            >
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
