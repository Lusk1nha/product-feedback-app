import { FC, memo } from "react";
import { motion, Variants, HTMLMotionProps } from "motion/react";

interface WavyTextProps extends HTMLMotionProps<"div"> {
  text: string;
  delay?: number;
  replay: boolean;
  duration?: number;
}

/**
 * Component that creates a wavy text effect
 * Repo: https://codesandbox.io/p/sandbox/framer-motion-react-wavy-letter-text-animation-j69kkr?file=%2Fsrc%2FWavyText.tsx%3A63%2C10
 */
const WavyText: FC<WavyTextProps> = memo(
  ({ text, delay = 0, duration = 0.05, replay, ...props }: WavyTextProps) => {
    const letters = Array.from(text);

    const container: Variants = {
      hidden: {
        opacity: 0,
      },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: { staggerChildren: duration, delayChildren: i * delay },
      }),
    };

    const child: Variants = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
        },
      },
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
        },
      },
    };

    return (
      <motion.h1
        className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent"
        style={{ display: "flex", overflow: "hidden" }}
        variants={container}
        initial="hidden"
        animate={replay ? "visible" : "hidden"}
        {...props}
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={child}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>
    );
  }
);

WavyText.displayName = "WavyText";

export { WavyText };
