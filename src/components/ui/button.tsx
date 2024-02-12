import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center py-2 justify-center rounded-xl hover:opacity-80 text-[15px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "dark:bg-button-bg border border dark:border-border-fade rounded-[22px] dark:text-white hover:focus-visible:ring-ring-button-bg hover:opacity-80",
        link: "",
        outline:
          "dark:bg-button-connect bg-milky rounded-[2.25rem] dark:text-white hover:focus-visible:ring-ring-button-connect",
        primary:
          "bg-button-primary  rounded-[4.625rem] px-5 p-4 text-white font-medium hover: focus-visible:ring-ring-button-primary",
        "ghost-red":
          "bg-transparent border border-ghost-border rounded-[4.625rem] px-5 p-4 text-ghost-text font-medium hover: focus-visible:ring-ring-ghost-text",
        "landing-outline": "",
      },
      size: {
        default: "h-10 px-4",
        lg: "h-12 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      isLoading,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
          >
            <path
              d="M11.875 1.875C11.875 1.37772 11.6775 0.900805 11.3258 0.549175C10.9742 0.197544 10.4973 0 10 0C9.50272 0 9.02581 0.197544 8.67417 0.549175C8.32254 0.900805 8.125 1.37772 8.125 1.875C8.125 2.37228 8.32254 2.84919 8.67417 3.20083C9.02581 3.55246 9.50272 3.75 10 3.75C10.4973 3.75 10.9742 3.55246 11.3258 3.20083C11.6775 2.84919 11.875 2.37228 11.875 1.875ZM11.875 18.125C11.875 17.6277 11.6775 17.1508 11.3258 16.7992C10.9742 16.4475 10.4973 16.25 10 16.25C9.50272 16.25 9.02581 16.4475 8.67417 16.7992C8.32254 17.1508 8.125 17.6277 8.125 18.125C8.125 18.6223 8.32254 19.0992 8.67417 19.4508C9.02581 19.8025 9.50272 20 10 20C10.4973 20 10.9742 19.8025 11.3258 19.4508C11.6775 19.0992 11.875 18.6223 11.875 18.125ZM1.875 11.875C2.37228 11.875 2.84919 11.6775 3.20083 11.3258C3.55246 10.9742 3.75 10.4973 3.75 10C3.75 9.50272 3.55246 9.02581 3.20083 8.67417C2.84919 8.32254 2.37228 8.125 1.875 8.125C1.37772 8.125 0.900805 8.32254 0.549175 8.67417C0.197544 9.02581 0 9.50272 0 10C0 10.4973 0.197544 10.9742 0.549175 11.3258C0.900805 11.6775 1.37772 11.875 1.875 11.875ZM20 10C20 9.50272 19.8025 9.02581 19.4508 8.67417C19.0992 8.32254 18.6223 8.125 18.125 8.125C17.6277 8.125 17.1508 8.32254 16.7992 8.67417C16.4475 9.02581 16.25 9.50272 16.25 10C16.25 10.4973 16.4475 10.9742 16.7992 11.3258C17.1508 11.6775 17.6277 11.875 18.125 11.875C18.6223 11.875 19.0992 11.6775 19.4508 11.3258C19.8025 10.9742 20 10.4973 20 10ZM5.58203 17.0703C5.75619 16.8962 5.89433 16.6894 5.98859 16.4619C6.08284 16.2343 6.13135 15.9904 6.13135 15.7441C6.13135 15.4978 6.08284 15.254 5.98859 15.0264C5.89433 14.7989 5.75619 14.5921 5.58203 14.418C5.40788 14.2438 5.20112 14.1057 4.97358 14.0114C4.74603 13.9172 4.50215 13.8687 4.25586 13.8687C3.75845 13.8687 3.28141 14.0662 2.92969 14.418C2.57796 14.7697 2.38037 15.2467 2.38037 15.7441C2.38037 16.2416 2.57796 16.7186 2.92969 17.0703C3.28141 17.422 3.75845 17.6196 4.25586 17.6196C4.75327 17.6196 5.23031 17.422 5.58203 17.0703ZM5.58203 5.57812C5.76484 5.406 5.91121 5.1989 6.01247 4.96913C6.11372 4.73936 6.1678 4.4916 6.17148 4.24053C6.17516 3.98947 6.12838 3.74022 6.03391 3.50758C5.93944 3.27494 5.79921 3.06364 5.62153 2.88622C5.44385 2.7088 5.23235 2.56888 4.99957 2.47475C4.76678 2.38063 4.51747 2.33421 4.26641 2.33827C4.01535 2.34232 3.76766 2.39676 3.53804 2.49835C3.30842 2.59995 3.10155 2.74663 2.92969 2.92969C2.57796 3.28141 2.38037 3.75845 2.38037 4.25586C2.38037 4.75327 2.57796 5.23031 2.92969 5.58203C3.28141 5.93375 3.75845 6.13135 4.25586 6.13135C4.75327 6.13135 5.23031 5.93375 5.58203 5.58203V5.57812ZM14.418 17.0703C14.5921 17.2445 14.7989 17.3826 15.0264 17.4769C15.254 17.5711 15.4978 17.6196 15.7441 17.6196C15.9904 17.6196 16.2343 17.5711 16.4619 17.4769C16.6894 17.3826 16.8962 17.2445 17.0703 17.0703C17.2445 16.8962 17.3826 16.6894 17.4769 16.4619C17.5711 16.2343 17.6196 15.9904 17.6196 15.7441C17.6196 15.4978 17.5711 15.254 17.4769 15.0264C17.3826 14.7989 17.2445 14.5921 17.0703 14.418C16.8962 14.2438 16.6894 14.1057 16.4619 14.0114C16.2343 13.9172 15.9904 13.8687 15.7441 13.8687C15.4978 13.8687 15.254 13.9172 15.0264 14.0114C14.7989 14.1057 14.5921 14.2438 14.418 14.418C14.2438 14.5921 14.1057 14.7989 14.0114 15.0264C13.9172 15.254 13.8687 15.4978 13.8687 15.7441C13.8687 15.9904 13.9172 16.2343 14.0114 16.4619C14.1057 16.6894 14.2438 16.8962 14.418 17.0703Z"
              fill={`${variant === "outline" ? "#07041B" : "white"}`}
            />
          </svg>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
