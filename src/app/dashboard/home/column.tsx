"use client";

import { Button } from "@/components/ui/button";
import { cn, formatAmount } from "@/lib/utils";
import { IDashboard } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const dashboardColumn: ColumnDef<IDashboard>[] = [
  {
    accessorKey: "accountName",
    header: "Account Name",
    accessorFn: (row) => row.accountName,
  },

  {
    accessorKey: "accountNumber",
    header: "Account Number",
    accessorFn: (row) => row.accountNumber,
  },

  {
    accessorKey: "bankName",
    header: "Bank Name",
    cell: ({ row }) => <p className="w-28">{row.original.bankName}</p>,
  },

  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <p>&#8358;{formatAmount(row.original.amount)}</p>,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <p
          className={cn(
            "capitalize",
            status === "Successful"
              ? "text-success"
              : status === "Failed"
              ? "text-failed"
              : "text-pending"
          )}
        >
          {status}
        </p>
      );
    },
  },

  {
    accessorKey: "rate",
    header: "Rate",
    // accessorFn: (row) => row.rate,
    cell: ({ row }) => {
      return <p className="text-button-primary">&#8358;{row.original.rate}</p>;
    },
  },

  {
    accessorKey: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Button className="text-right font-normal">Pay now</Button>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Button className="text-cancel border border-cancel border-opacity-25">
            Cancel
          </Button>
        </div>
      );
    },
  },
];
