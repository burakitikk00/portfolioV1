"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  style = {},
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 380,
        damping: 24,
      },
    },
  };

  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-block overflow-visible ${className}`}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {word.split("").map((letter, letterIdx) => (
            <motion.span
              key={letterIdx}
              variants={letterVariants}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
          {wordIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}
