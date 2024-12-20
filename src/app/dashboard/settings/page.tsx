"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { removeToken } from "@/lib/utils";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { bankList } from "@/app/dashboard/connectivity/constants";
import ChangePassword from "@/components/Dashboard/settings/edit-password-form";
import ChangePin from "@/components/Dashboard/settings/edit-pin-form";
import PayMethodForm from "@/components/Dashboard/settings/payment-method";
import UnlistBank from "@/components/Dashboard/settings/unlist-bank-form";
import useEndpoint from "@/lib/apiCall";
import apiCAll from "@/lib/apiCall";
import { loginAPI, registerAPI } from "@/axios/endpoints/auth";
import { notify } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useUser } from "@/context/user";
import { useStore } from "@/context/store";

export default function Connectivity() {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [unlist, setUnlist] = React.useState<boolean>(false);
  const [changePass, setChangePass] = React.useState<boolean>(false);
  const [showTerms, setShowTerms] = React.useState<boolean>(false);
  const [changePayMethod, setChangePayMethod] = React.useState<boolean>(false);
  const [step, setStep] = React.useState<number>(1);
  const [mounted, setMounted] = useState(false);
  const {setAllConnectedBanks} = useStore()

  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { id } = useParams();

  const handleThemeChange = (isChecked: boolean) => {
    const newTheme = isChecked ? "light" : "dark";
    setTheme(newTheme);
  };
  const settings = [
    // {
    //   name: "Password",
    //   label: "Change",
    //   action: () => setIsSuccess(true),
    // },
    // {
    //   name: "Create Kuda Virtual Account",
    //   label: "Create",
    //   action: () => setChangePass(true),
    // },
    
    {
      name: "Privacy Policy",
      label: "View",
      action: () => setShowTerms(true),
    },
    {
      name: "Third Party",
      label: "Switch",
      action: () => console.log("switch toggled"),
    },
    // {
    //   name: "Unlist a Bank",
    //   label: "Details",
    //   action: () => setUnlist(true),
    // },
    
  ];
  /*
   *
   *
   *
   *
   */
  function getBankLogo(bankName: string): string {
    const bank = bankList.find((bank) => bank.name === bankName);
    return bank?.logo as string;
  }

  async function handleConnectToBank() {
    setIsSuccess(true);

    // usage for ge request
    await apiCAll({
      url: "/api/connet",
      method: "get",
      sCB(res) {
        console.log(res);
      },
      eCB(res) {
        console.log(res);
      },
      toast: true,
    });

    // method two
    // const {error, serverResponse} = await registerAPI({name: "ifeoluwa"})
  }

  const { user, getUser } = useUser();

  const handleSignOut = () => {
    removeToken();
    setAllConnectedBanks([])
    // window.localStorage.clear();
    localStorage.removeItem("selectedBankId")
    router.push("/auth");
  };
  /*
   *
   *
   *
   *
   */

  useEffect(() => {
    getUser();
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="w-full h-full lg:pt-24">
      <div className="w-full max-w-[42rem] mx-auto rounded-xl bg-milky dark:bg-onboard-bg border border-white px-5 lg:px-10 py-5 border-opacity-25 lg:flex justify-between">
        <div className="profile flex items-center justify-between h-[2.938rem] w-auto space-x-7">
          <div className="flex space-x-2">
            <Avatar className="w-[2.688rem] h-[2.688rem]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="h-[2.938rem]">
              <p className="dark:text-white font-bold text-xl">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="dark:text-white font-medium opacity-40">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        <Button className="mt-12 lg:mt-0 border-2">Update Profile</Button>
      </div>

      <div className="w-full max-w-[42rem] mx-auto rounded-xl bg-milky dark:bg-onboard-bg border border-white px-5 lg:px-10 py-5 border-opacity-25 mt-5 space-y-4">
        {settings.map((setting, index) => (
          <div key={index} className="w-full flex justify-between items-center">
            <p className="dark:text-white">{setting.name}</p>

            {setting.label !== "Switch" ? (
              <Button className="w-24 border-2" onClick={setting.action}>
                {setting.label}
              </Button>
            ) : (
              <Switch />
            )}
          </div>
        ))}
        <div className="w-full flex justify-between items-center">
          <p className="dark:text-white font-medium">Light mode</p>

          <div>
            <Switch
              checked={theme === "light"}
              onCheckedChange={handleThemeChange}
            />
          </div>
        </div>

        <div className="inline-flex">
          <Button
            variant={"ghost-red"}
            className="space-x-2 mt-8"
            onClick={handleSignOut}
          >
            <p>Sign out</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
            >
              <path
                d="M13.1249 10.3131C13.1247 10.4224 13.1654 10.5279 13.2391 10.6087C13.3128 10.6895 13.414 10.7398 13.5229 10.7497C13.6318 10.7595 13.7404 10.7283 13.8275 10.6621C13.9145 10.5959 13.9735 10.4995 13.993 10.3919L14 10.3131L14 0.686896C14.0002 0.577555 13.9595 0.472101 13.8858 0.391299C13.8121 0.310498 13.7109 0.260205 13.602 0.250326C13.4931 0.240446 13.3844 0.271696 13.2974 0.33792C13.2104 0.404144 13.1514 0.500544 13.1319 0.608137L13.1249 0.686896L13.1249 10.3131ZM-2.29549e-07 5.5C-3.45663e-05 5.60241 0.0358541 5.70159 0.101415 5.78026C0.166977 5.85893 0.258057 5.91212 0.358795 5.93055L0.437555 5.93755L10.7586 5.93405L7.5662 9.12382C7.49358 9.19612 7.44863 9.2916 7.4392 9.39363C7.42976 9.49566 7.45644 9.59776 7.51456 9.68214L7.56532 9.7434C7.63772 9.81589 7.73326 9.86067 7.83528 9.86994C7.93731 9.87922 8.03936 9.8524 8.12364 9.79416L8.1849 9.7434L12.1229 5.81241C12.1837 5.75143 12.2252 5.67377 12.2419 5.58926L12.2515 5.4965C12.2515 5.42974 12.2362 5.36386 12.2068 5.30394C12.1774 5.24401 12.1346 5.19164 12.0818 5.15083L8.1849 1.25047C8.10762 1.1738 8.00453 1.12869 7.89578 1.12396C7.78702 1.11922 7.68041 1.1552 7.59675 1.22485C7.5131 1.29451 7.45841 1.39285 7.44338 1.50066C7.42834 1.60848 7.45404 1.71802 7.51544 1.80791L7.56532 1.86917L10.7516 5.05894L0.437555 5.06244C0.321508 5.06244 0.210213 5.10854 0.128156 5.1906C0.0460994 5.27266 -2.24476e-07 5.38395 -2.29549e-07 5.5Z"
                fill="#D53030"
              />
            </svg>
          </Button>
        </div>
      </div>

      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent className=" text-left text-white">
          <div className="inline-flex justify-between">
            <p className="font-bold text-white text-xl">Change password</p>
            <DialogClose asChild>
              <Image
                src={"/dashboard/settings/x.svg"}
                alt="cancle"
                width={45}
                height={45}
              />
            </DialogClose>
          </div>

          <Separator className="mb-5 mt-3 opacity-40 h-[0.038rem]" />

          <ChangePassword />
        </DialogContent>
      </Dialog>

      <Dialog open={changePass} onOpenChange={setChangePass}>
        <DialogContent className=" text-left text-white">
          <div className="inline-flex justify-between">
            <p className="font-bold text-white text-xl">Change Pin</p>
            <DialogClose asChild>
              <Image
                src={"/dashboard/settings/x.svg"}
                alt="cancle"
                width={45}
                height={45}
              />
            </DialogClose>
          </div>

          <Separator className="mb-5 mt-3 opacity-40 h-[0.038rem]" />

          <ChangePin />
        </DialogContent>
      </Dialog>

      <Dialog open={changePayMethod} onOpenChange={setChangePayMethod}>
        <DialogContent className=" text-left text-white">
          <div className="inline-flex justify-between">
            <p className="font-bold text-white text-xl">Payment Methods</p>
            <DialogClose asChild>
              <Image
                src={"/dashboard/settings/x.svg"}
                alt="cancle"
                width={45}
                height={45}
              />
            </DialogClose>
          </div>

          <Separator className="mb-5 mt-3 opacity-40 h-[0.038rem]" />

          <PayMethodForm />
        </DialogContent>
      </Dialog>

      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className=" text-left text-white w-full  max-w-[1003px] h-[577px]">
          <div className="inline-flex justify-between">
            <p className="font-bold text-white text-xl">Privacy Policy</p>
            <DialogClose>
              <Image
                src={"/dashboard/settings/x.svg"}
                alt="cancle"
                width={45}
                height={45}
              />
            </DialogClose>
          </div>

          <Separator className="mb-5 mt-3 opacity-40 h-[0.038rem]" />

          <div className="w-full overflow-y-scroll">
            <div className=" p-10 bg-input ">
              <p className="text-white">
                Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                interdum tellus elit sed risus. Maecenas eget condimentum velit,
                sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Praesent
                auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor
                urna. Curabitur vel bibendum lorem. Morbi convallis convallis
                diam sit amet lacinia. Aliquam in elementum tellus. Curabitur
                tempor quis eros tempus lacinia. Nam bibendum pellentesque quam
                a convallis. Sed ut vulputate nisi. Integer in felis sed leo
                vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat
                ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus
                lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit
                amet magna non ligula vestibulum eleifend. Nulla varius volutpat
                turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed
                nec ante dictum sem condimentum ullamcorper quis venenatis nisi.
                Proin vitae facilisis nisi, ac posuere leo. Nam pulvinar blandit
                velit, id condimentum diam faucibus at. Aliquam lacus nisi,
                sollicitudin at nisi nec, fermentum congue felis. Quisque mauris
                dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae
                mauris nec ante pretium finibus. Donec nisl neque, pharetra ac
                elit eu, faucibus aliquam ligula. Nullam dictum, tellus
                tincidunt tempor laoreet, nibh elit sollicitudin felis, eget
                feugiat sapien diam nec nisl. Aenean gravida turpis nisi,
                consequat dictum risus dapibus a. Duis felis ante, varius in
                neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem
                sit amet cursus. Etiam pulvinar purus vitae justo pharetra
                consequat. Mauris id mi ut arcu feugiat maximus. Mauris
                consequat tellus id tempus aliquet. Vestibulum dictum ultrices
                elit a luctus. Sed in ante ut leo congue posuere at sit amet
                ligula. Pellentesque eget augue nec nisl sodales blandit sed et
                sem. Aenean quis finibus arcu, in hendrerit purus. Praesent ac
                aliquet lorem. Morbi feugiat aliquam ligula, et vestibulum
                ligula hendrerit vitae. Sed ex lorem, pulvinar sed auctor sit
                amet, molestie a nibh. Ut euismod nisl arcu, sed placerat nulla
                volutpat aliquet. Ut id convallis nisl. Ut mauris leo, lacinia
                sed elit id, sagittis rhoncus odio. Pellentesque sapien libero,
                lobortis a placerat et, malesuada sit amet dui. Nam sem sapien,
                congue eu rutrum nec, pellentesque eget ligula.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={unlist} onOpenChange={setUnlist}>
        <DialogContent className=" text-left text-white">
          <div className="inline-flex justify-between">
            <p className="font-bold text-white text-xl">Unlist Bank</p>
            <DialogClose asChild>
              <Image
                src={"/dashboard/settings/x.svg"}
                alt="cancel"
                width={45}
                height={45}
              />
            </DialogClose>
          </div>

          <Separator className="mb-5 mt-3 opacity-40 h-[0.038rem]" />

          <UnlistBank />
        </DialogContent>
      </Dialog>
    </section>
  );
}
