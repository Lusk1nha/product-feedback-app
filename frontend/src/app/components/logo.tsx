"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { AppTextGradient } from "./app-text-gradient";

interface LogoProps {
  className?: string;
}

export function LogoGradient(props: Readonly<LogoProps>) {
  const { className } = props;

  return (
    <motion.h1
      className={cn("flex items-center justify-center", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AppTextGradient className="text-xl sm:text-3xl font-bold">
        Feedback Board App
      </AppTextGradient>
    </motion.h1>
  );
}
