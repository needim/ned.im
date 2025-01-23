"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { useMemo } from "react";

export const polaroidVariants = {
  "1x1": "w-20 h-20",
  "4x5": "w-20 h-24",
  "4x3": "w-20 h-16",
};

const Polaroid = ({
  src,
  variant,
  onClick,
  fullscreen,
  index = 0,
  total = 0,
  isVisible,
}: {
  src: string;
  index?: number;
  total?: number;
  isVisible?: boolean;
  variant: keyof typeof polaroidVariants;
  onClick?: () => void;
  fullscreen?: boolean;
}) => {
  const variantClasses = polaroidVariants[variant] || polaroidVariants["1x1"];
  const randomRotation = useMemo(() => Math.random() * 30 - 15, []);

  return (
    <motion.div
      onClick={onClick}
      variants={{
        hidden: { scale: 0, rotate: 0, zIndex: total - index },
        show: { scale: 1, rotate: fullscreen ? 0 : randomRotation },
      }}
      initial={"hidden"}
      animate={isVisible ? "show" : "hidden"}
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 360,
        damping: 20,
      }}
      whileHover={{
        rotate: 0,
        scale: 1.2,
        left: index === 0 ? 0 : 30,
        cursor: "zoom-in",
        transition: {
          duration: 0.1,
          type: "tween",
          stiffness: 1360,
          damping: 20,
        },
        transitionEnd: { zIndex: total - index },
      }}
      className={cn(
        "w-20 h-auto shadow-polaroid rounded-lg z-10 relative",
        fullscreen && "w-full h-full"
      )}
    >
      <motion.div
        className={cn(
          "w-auto h-auto relative",
          fullscreen ? "h-auto min-w-72" : variantClasses
        )}
      >
        <Image
          width={480}
          height={640}
          className="object-contain rounded-lg bg-white p-1.5"
          src={src}
          alt=""
        />
      </motion.div>
    </motion.div>
  );
};

export default Polaroid;
