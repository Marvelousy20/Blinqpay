"use client";

import React from "react";
import { hasToken } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { notify } from "@/components/ui/toast";

const Home = () => {
  const router = useRouter();

  const protectedRuteHandler = () => {
    notify.warn("checking user validity!");
    if (hasToken()) return router.push("/dashboard");
    return router.push("/auth");
  };

  React.useEffect(() => {
    protectedRuteHandler();
  }, []);

  return null;
};

export default Home;
