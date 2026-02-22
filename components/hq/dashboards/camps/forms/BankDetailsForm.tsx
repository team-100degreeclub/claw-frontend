"use client";

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, CreditCard, Eye, EyeOff, Hash, User } from "lucide-react";
import { CampFormValues } from "@/lib/types/api";

export function BankDetailsForm() {
  const [showAccount, setShowAccount] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const { control, setValue, getValues } =
    useFormContext<CampFormValues>();
  (getValues())
  /**
   * Local-only confirm field (not persisted)
   */
  // const confirmAccountNumber = useWatch({
  //   control,
  //   name: "bankDetails.confirmAccountNumber" as any,
  // });

  return (
    <div className="bg-zinc-950 mb-8 space-y-8 text-zinc-100">
  {/* Header */}
  <div className="space-y-2 ">
    <h3 className="text-xl font-bold text-white tracking-tight">
      Bank Account Details
    </h3>
    <p className="text-sm text-zinc-500 leading-relaxed ">
      Enter your bank details for receiving payments.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
    {/* Bank Name */}
    <FormField
      control={control}
      name="bankDetails.bank_name"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-zinc-400 text-xs font-medium flex items-center gap-2">
            <Building2 size={14} className="text-zinc-600" /> Bank Name
          </FormLabel>
          <FormControl>
            <Input 
              {...field} 
              placeholder="e.g., State Bank of India" 
              className="h-11 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 focus:border-white focus:ring-white transition-all rounded-lg"
            />
          </FormControl>
          <FormMessage className="text-red-400 text-[11px]" />
        </FormItem>
      )}
    />

    {/* IFSC */}
    <FormField
      control={control}
      name="bankDetails.ifsc"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-zinc-400 text-xs font-medium flex items-center gap-2">
            <Hash size={14} className="text-zinc-600" /> IFSC Code
          </FormLabel>
          <FormControl>
            <Input 
              {...field} 
              className="h-11 bg-zinc-900 border-zinc-800 text-white uppercase placeholder:text-zinc-700 focus:border-white focus:ring-white transition-all rounded-lg" 
              placeholder="SBIN0001234"
            />
          </FormControl>
          <FormMessage className="text-red-400 text-[11px]" />
        </FormItem>
      )}
    />

    {/* Account Holder */}
    <FormField
      control={control}
      name="bankDetails.account_holder_name"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-zinc-400 text-xs font-medium flex items-center gap-2">
            <User size={14} className="text-zinc-600" /> Account Holder Name
          </FormLabel>
          <FormControl>
            <Input 
              {...field} 
              placeholder="As per bank records"
              className="h-11 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 focus:border-white focus:ring-white transition-all rounded-lg"
            />
          </FormControl>
          <FormMessage className="text-red-400 text-[11px]" />
        </FormItem>
      )}
    />

    {/* Account Number */}
    <FormField
      control={control}
      name="bankDetails.account_number"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-zinc-400 text-xs font-medium flex items-center gap-2">
            <CreditCard size={14} className="text-zinc-600" /> Bank Account Number
          </FormLabel>
          <FormControl>
            <div className="relative group">
              <Input
                {...field}
                type={showAccount ? "text" : "password"}
                placeholder="Your bank account number"
                className="h-11 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 focus:border-white focus:ring-white transition-all rounded-lg pr-12 font-mono"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                onClick={() => setShowAccount((s) => !s)}
              >
                {showAccount ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage className="text-red-400 text-[11px]" />
        </FormItem>
      )}
    />
  </div>
</div>
  );
}
