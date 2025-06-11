"use client";

import { useEffect } from "react";
import { initToolbar } from "@stagewise/toolbar";

const stagewiseConfig = {
  plugins: [],
};

export function StagewiseToolbar() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      initToolbar(stagewiseConfig);
    }
  }, []);

  return null; // This component doesn't render anything itself
}
