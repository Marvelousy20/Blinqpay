"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/store";
import { notify } from "@/components/ui/toast";
import { bankList } from "../constants";
import React, { useEffect, useState } from "react";
import apiCAll from "@/lib/apiCall";
import { IProviders } from "@/types";
import { AlertTriangle } from "lucide-react";
import EmptyState from "@/components/empty-state";

export default function Connected() {
  const router = useRouter();
  const { loggedIn } = useStore();
  console.log("user logged in?", loggedIn);
  const [data, setData] = useState<IProviders[]>([]);
  const [isFetching, setIsFetching] = React.useState(false);

  async function getConnectedProviders() {
    if (isFetching) return;

    try {
      setIsFetching(true);
      await apiCAll({
        url: "provider/connected",
        method: "get",
        sCB(res) {
          setData(res.data);
          setIsFetching(false);
        },
        eCB(res) {
          console.log(res);
          setIsFetching(false);
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getConnectedProviders();
  }, []);

  async function disconnectProvider(id: number | undefined) {
    await apiCAll({
      url: `provider/${id}/disconnect`,
      method: "post",
      sCB(res) {
        console.log(res);
        setData((prevData) => prevData.filter((provider) => provider?.id !== id));
      },
      eCB(res) {
        console.error(res.error);
      },
    });
  }

  console.log(data);

  return data?.length > 0 ? (
    <section className="w-full h-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 pt-10 lg:pt-20 px-9">
        {data.map((provider, index) => (
          <div
            key={index}
            className="w-full p-5 space-y-8 flex flex-col items-center border dark:border-border-connect bg-milky dark:bg-bank-bg"
          >
            <div className="w-full max-w-[16.25rem] relative h-[3.438rem]">
              {/* Add image when they come from the backend */}
              {provider?.logo && <Image src={provider?.logo} alt={"bank logo"} fill />}
            </div>

            <Button variant={"outline"} className="bg-gray-300" onClick={() => disconnectProvider(provider?.id)}>
              Disconnect
            </Button>
          </div>
        ))}
      </div>
    </section>
  ) : (
    // <div>
    //   <div className="flex flex-col justify-center items-center h-[80vh]">
    //     <div>
    //       <AlertTriangle size={36} />
    //     </div>

    //     <div className="max-w-sm text-center mt-2">
    //       <span className="text-xl">No Exchange connected yet.</span>
    //     </div>
    //   </div>
    // </div>
    <EmptyState isFetching={isFetching} label="No Exchange connected yet." />
  );
}
