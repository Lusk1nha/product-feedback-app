"use client";

import Link from "next/link";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { WavyText } from "./ui/wavy-text";

export function AuthorWaterMark() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      className="w-full text-[#3A4374] flex flex-wrap sm:flex-row items-center justify-center text-center text-sm font-medium gap-x-1 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      System developed by{" "}
      <Link
        href="https://www.linkedin.com/in/olucaspedro/"
        className="hover:underline text-[#ff00a2]"
        target="_blank"
      >
        <WavyText text="Lucas Pedro Da Hora" replay />
      </Link>
    </motion.div>
  );
}
