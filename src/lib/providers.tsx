"use client";

import { LazyMotion, domAnimation } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div className=" text-center max-w-7xl mx-auto">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </div>
  );
}
