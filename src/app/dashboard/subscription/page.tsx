"use client";

import { Button } from "@/components/ui/button";
import { cn, formatAmount } from "@/lib/utils";

const tiers = [
  {
    tier: "Monthly",
    tag: "Most Popular",
    text: "Enjoy your merchants benefit on a go when you subscrube to Blinqpay software",
    benefits: ["Transfer Limit", "Amount per transfer", "Payout on a go", "Unlimited", "Lorem ipsum", "Lorem Ipsum"],
    price: null,
    action: () => console.log("Montly package clicked"),
  },

  {
    tier: "Weekly",
    tag: "New Choice",
    text: "Enjoy your merchants benefit on a go when you subscrube to Blinqpay software",
    benefits: ["Transfer Limit", "Amount per transfer", "Payout on a go", "Unlimited", "Lorem ipsum", "Lorem Ipsum"],
    price: null,
    action: () => console.log("Weekly package clicked"),
  },

  {
    tier: "24 Hour",
    tag: "Limited Offer",
    text: "Enjoy your merchants benefit on a go when you subscrube to Blinqpay software",
    benefits: ["Transfer Limit", "Amount per transfer", "Payout on a go", "Unlimited", "Lorem ipsum", "Lorem Ipsum"],
    price: null,
    action: () => console.log("Weekly package clicked"),
  },
];

export default function Subscription() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-8 lg:pt-32">
      {tiers.map((tier, index) => (
        <div
          key={index}
          className={cn(
            "border rounded-xl py-7 px-5",
            tier.tier === "Weekly"
              ? "bg-button-primary bg-opacity-[0.06] border-button-primary"
              : "bg-success bg-opacity-[0.06] border-success "
          )}
        >
          <p
            className={cn(
              "rounded-xl p-2 text-bold inline-flex",
              tier.tier === "Weekly" ? "bg-button-primary" : "bg-success text-black"
            )}
          >
            {tier.tag}
          </p>
          <h3 className="text-bold text-3xl font-bold mt-5">{tier.tier} Package</h3>
          <p className="text-sm opacity-50 mt-3">{tier.text}</p>
          {/* <ul className="mt-5">
            {tier.benefits?.map((benefit, index) => (
              <li key={index} className="list-disc list-inside">
                {benefit}
              </li>
            ))}
          </ul> */}

          <Button className="w-full mt-7 py-4" onClick={tier.action}>
            Pay {formatAmount(tier?.price || 0)} USDT
          </Button>
        </div>
      ))}
    </div>
  );
}
