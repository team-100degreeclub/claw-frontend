"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToInsights() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/hq/dashboard/workstation/insights");
  }, [router]);

  return null; // Nothing renders
}
