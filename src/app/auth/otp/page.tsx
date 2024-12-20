import ForgetPassword from "@/components/Onboarding/ForgetPassword";
import Otp from "@/components/Onboarding/otp";
import { Suspense } from "react";
export default function ForgotPassword() {
  return (
    <main className="w-full h-screen place-content-center grid bg-primary  p-4 md:p-0">
      <Suspense>
        <Otp />
      </Suspense>
    </main>
  );
}
