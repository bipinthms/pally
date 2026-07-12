"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Slim gold reading-progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-gold-500 via-gold-300 to-maroon-600"
    />
  );
}
