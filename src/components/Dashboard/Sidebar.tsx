"use client";

import { cn } from "@/lib/utils";
import { IRoutes } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import { useState } from "react";

const routes: IRoutes[] = [
  {
    name: "Dashboard",
    icon: () => (
      <div>
        <Icons.Home fill="white" className="dark:block hidden" />
        <Icons.Home fill="black" className="dark:hidden block" />
      </div>
    ),
    link: "/dashboard",
  },

  {
    name: "Bank History",
    icon: () => (
      <div>
        <Icons.Bank stroke="white" className="dark:block hidden" />
        <Icons.Bank stroke="black" className="dark:hidden block" />
      </div>
    ),
    link: "/dashboard/bank-history",
  },
  {
    name: "Order History",
    icon: () => (
      <div>
        <Icons.Order stroke="white" className="dark:block hidden" />
        <Icons.Order stroke="black" className="dark:hidden block" />
      </div>
    ),
    link: "/dashboard/order-history",
  },
  {
    name: "Connectivity",
    icon: () => (
      <div>
        <Icons.Connectivity stroke="white" className="dark:block hidden" />
        <Icons.Connectivity stroke="black" className="dark:hidden block" />
      </div>
    ),
    link: "/dashboard/connectivity",
  },
  {
    name: "Subscription",
    icon: () => (
      <div>
        <Icons.Subscription stroke="white" className="dark:block hidden" />
        <Icons.Subscription stroke="black" className="dark:hidden block" />
      </div>
    ),
    link: "/dashboard/subscription",
  },
  
  {
    name: "Settings",
    icon: () => (
      <div>
        <Icons.Settings stroke="white" className="dark:block hidden" />
        <Icons.Settings stroke="black" className="dark:hidden block" />
      </div>
    ),
    link: "/dashboard/settings",
  },
];

interface SidebarProps {
  setOpen?: (value: boolean) => void;
}

export default function Sidebar({ setOpen }: SidebarProps) {
  const pathname = usePathname();
  const [showConnectAray, setShowConnectArray] = useState(false);

  return (
    <aside className="w-auto lg:w-44 xl:w-[13rem] space-y-8 pt-5">
      <div>
        <div className="text-3xl font-bold hidden lg:block">AtlasPay</div>
      </div>

      {routes.map((route, index) => {
        return route.name === "Connectivity" ? (
          <div className="w-full h-full" key={index}>
            <div
              role="button"
              onClick={() => setShowConnectArray((p) => !p)}
              className="trigger py-2 w-full flex items-center justify-between pr-3"
            >
              <div className="gap-6 flex items-center ">
                {route.icon()}
                <p>{route.name}</p>
              </div>

              <div>
                <Icons.ArrowIcon
                  stroke="white"
                  className={cn(
                    "transition-all dark:block hidden",
                    showConnectAray ? "rotate-90" : "rotate-0"
                  )}
                />
                <Icons.ArrowIcon
                  stroke="black"
                  className={cn(
                    "transition-all dark:hidden block",
                    showConnectAray ? "rotate-90" : "rotate-0"
                  )}
                />
              </div>
            </div>

            {showConnectAray && (
              <div className="list w-full px-2 space-y-1">
                {connectivitySubList.map((item, index) => (
                  <Link
                    href={item.link}
                    key={index}
                    className="flex gap-4 py-2 text-sm"
                    onClick={() => setOpen?.(false)}
                  >
                    <Image
                      src={item.icon}
                      width={24}
                      height={24}
                      alt="icon"
                      className="invisible"
                    />

                    <span
                      className={cn(
                        "opacity-70",
                        pathname === item.link ? "text-button-primary" : ""
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            href={route.link}
            key={index}
            className={"flex items-center gap-6"}
            onClick={() => setOpen?.(false)}
          >
            {route.icon()}
            <span
              className={cn(
                "opacity-70",
                pathname === route.link ? "text-button-primary" : ""
              )}
            >
              {route.name}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}

const connectivitySubList = [
  {
    name: "All Exchange",
    icon: "/dashboard/sidebar/connectivity.svg",
    link: "/dashboard/connectivity",
  },

  {
    name: "Connected Exchange",
    icon: "/dashboard/sidebar/connectivity.svg",
    link: "/dashboard/connectivity/connected",
  },
];
