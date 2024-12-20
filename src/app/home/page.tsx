"use client";
import Image from "next/image";
// import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import TabSignUp from "@/components/LandingPage/SignUp";
import Dashboard from "@/components/LandingPage/Dashboard";
import Payment from "@/components/LandingPage/Payment";
import PeopleCard from "@/components/LandingPage/Card";
import FAQ from "@/components/LandingPage/FAQ";
import Footer from "@/components/LandingPage/Footer";
import Link from "next/link";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-card";
import { Tabs } from "@/components/ui/atabs";

const imgs = [
  {
    img: "/partners/binance.svg",
    className: "w-32 h-16 md:w-44 md:h-28",
  },
  {
    img: "/partners/Paxful.svg",
    className: "w-32 h-16 md:w-44 md:h-28",
  },
  {
    img: "/partners/KuCoin.svg",
    className: "w-32 h-16 md:w-44 md:h-28",
  },
  {
    img: "/partners/remitano.svg",
    className: "w-16 h-16 md:w-28 md:h-28",
  },
  {
    img: "/partners/bybit.svg",
    className: "w-32 h-16 md:w-44 md:h-28",
  },
  {
    img: "/partners/kuda-bank.svg",
    className: "w-32 h-16 md:w-44 md:h-28",
  },
  {
    img: "/partners/providus.svg",
    className: "w-32 h-[20px] md:w-44 md:h-[20px]",
  },
  {
    img: "https://i0.wp.com/blog.noones.com/wp-content/uploads/2023/06/1cd3b064a253651ab1e963f31d72400283e9bb04-1.png?fit=188%2C62&ssl=1",
    className: "w-32 h-[20px] md:w-44 md:h-[20px]",
  },
];

export default function Home() {
  const words = `Bridging the gap between crypto and fiat economies`;

  const tabs = [
    {
      title: "Sign up",
      value: "signup",
      content: (
        <div className="">
          <TabSignUp />
        </div>
      ),
    },

    {
      title: "Connect",
      value: "connect",
      content: (
        <div className="">
          <Dashboard />
        </div>
      ),
    },

    {
      title: "Payment",
      value: "payment",
      content: (
        <div className="">
          <Payment />
        </div>
      ),
    },
  ];

  return (
    <div className="relative px-4 md:px-8">
      <div className="">
        {/* Hero */}
        <div className="hero relative px-4 md:px-8 lg:px-16">
          <div className="absolute inset-0 z-0">
            <Image
              src="/landing/gradient.png"
              alt="gradient"
              layout="fill"
              // objectFit="cover"
              className="z-0"
            />
          </div>
          <div className="z-10">
            {/* navbar */}
            <nav className="flex items-center justify-between py-6 relative z-50">
              <div className="text-xl md:text-3xl font-bold">BlinqPay</div>
              {/* <div>
                <ul className="flex space-x-12">
                  <li>Home</li>
                  <li>Solutions</li>
                  <li>Customers</li>
                  <li>Pricing</li>
                  <li>Docs</li>
                </ul>
              </div> */}
              <div className="space-x-3 md:space-x-5">
                {/* <Link
                  href="/auth"
                  className="px-8 md:px-16 cursor-pointer bg-[#4A33FB] py-2 md:py-3 rounded-[30px] hover:bg-opacity-75 transition-all ease-in-out duration-200"
                >
                  
                </Link> */}
                <Link
                  href="/auth"
                  className="px-6 md:px-16 py-2 md:py-3 rounded-[30px] relative bg-[#4A33FB] text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600"
                >
                  <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                  <span className="relative z-20">Login</span>
                </Link>
                <Link
                  href="/auth/register"
                  className="py-2 md:py-3 rounded-[30px] hover:opacity-75 transition-all ease-in-out duration-200"
                >
                  Sign up
                </Link>
              </div>
            </nav>

            {/* texts */}
            <div className="flex flex-col md:flex-row items-center justify-between py-16 md:pt-24 lg:py-32">
              <Image
                src="/landing/blue.svg"
                alt="blue"
                width={852}
                height={800}
                className="absolute left-0 top-0"
              />
              <div className="max-w-2xl z-20">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                  <TextGenerateEffect words={words} />
                </h1>

                {/* <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold ">
                  Bridging the gap between crypto and fiat economies
                </h1> */}

                <p className="mt-6">
                  Blinqpay provides an infrastructure for crypto vendors across
                  different exchanges and never needing to worry about manually
                  handling crypto payments to your customers.
                </p>
              </div>

              <div className="lg:mr-24">
                <Image
                  src="/landing/hero.svg"
                  alt="hero.svg"
                  width={458}
                  height={403}
                  className="hidden md:block"
                />
                <Image
                  src="/landing/hero.svg"
                  alt="hero.svg"
                  width={308}
                  height={253}
                  className="block md:hidden mt-10"
                />
              </div>
            </div>
          </div>
        </div>
        {/* partners */}
        <div className="relative w-full">
          <div className="flex w-full">
            <InfiniteMovingCards
              items={imgs}
              pauseOnHover={true}
              speed="normal"
            />
          </div>
        </div>

        {/* How to use Blinqpay */}
        <div className="mt-28">
          <h1 className="text-2xl md:text-3xl font-bold text-opacity-20">
            How to use AtlasPay in these three steps?
          </h1>

          {/* <Tabs defaultValue="signup" className="w-full mt-9">
            <TabsList className="mb-[3.75rem]">
              <TabsTrigger value="signup">Sign up</TabsTrigger>
              <TabsTrigger value="dashboard">Connect</TabsTrigger>
              <TabsTrigger value="payment">Payouts</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <TabSignUp />
            </TabsContent>
            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>
            <TabsContent value="payment">
              <Payment />
            </TabsContent>
          </Tabs> */}
          <div className="h-[44rem] md:h-[44rem] [perspective:1000px] relative flex flex-col w-full items-start justify-start mt-9">
            <Tabs tabs={tabs} />
          </div>
        </div>
        {/* Testimonial */}
        <div className="mt-28">
          <h1 className="text-2xl md:text-3xl font-bold">
            What people say about us
          </h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <PeopleCard
              name="Omoshalawe"
              content="I love the page responsivess and user interface design. It's just a cool app to use. As for the registration, it's just fast and I was happyy I could start making payments easily within 10mins."
              description="Crypto Merchant"
            />
            <PeopleCard
              name="Yakubu"
              content="I love how fast the customer service representative was. She was too polite and had good knowledge of everything. With her help, I was able to connect my exchanges within minutes."
              description="Crypto Merchant"
            />
            <PeopleCard
              name="Okechukwu"
              content="The feature whereby you can connect to more than one bank is simply amazing. Everything about the app is nothing short of amazing. Bad network cant stop me from trading."
              description="Crypto Merchant"
            />
            <PeopleCard
              name="Mohammed"
              content="My favorite feature is the fact that you can use dark or light mode. I appreciate this feature because light sensivity can be an issue when you stay on the computer for too long."
              description="Crypto Merchant"
            />
            <PeopleCard
              name="Chukwuemeka"
              content="This appp is a 5 star app. They practically raise the bnar too high. Now I can exploit the merchant space on different exchanges. Nice one guys."
              description="Crypto Merchant"
            />
            <PeopleCard
              name="Kola"
              content="The partnership feature was a breath of fresh air. It's wonderful to see a company who is all about growth for both customers and themselves. I am happy to be among your first set of partners."
              description="Crypto Merchant"
            />
          </div>
        </div>
        {/* FAQ */}
        <div className="mt-28">
          <h1 className="text-2xl md:text-3xl font-bold">FAQ</h1>
          <div className="mt-10">
            <FAQ />
          </div>
        </div>
        {/* Unkwown text */}
        <div className="mt-40 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Become a faster and reliable crypto vendor in the BLINQ of an eye
          </h1>

          <p className="text-lg mt-6">
            Start using blinq for free, no credit card or personal info needed,
            use blinq for 3 days free!!!
          </p>

          <div className="space-x-4 mt-16">
            <Link
              href="/auth"
              className="px-6 md:px-16 font-medium py-2 md:py-3 rounded-[30px] relative bg-[#4A33FB] text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600"
            >
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative z-20">Try it for free</span>
            </Link>
          </div>
        </div>
        {/* Footer */}
        <div className="relative">
          <div className="absolute inset-0">
            <Image
              src="/landing/footerGradient.svg"
              alt="footer"
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
          </div>

          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
