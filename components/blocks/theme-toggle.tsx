"use client";

import useNextValue from "@/components/hooks/use-next-value";
import { cn } from "@/lib/utils";
import {
  IconContrastFilled,
  IconMoon,
  IconSun,
  IconSunFilled,
} from "@tabler/icons-react";
import { motion, useAnimation } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({
  hideIndicator = false,
}: {
  hideIndicator?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const controlsSun = useAnimation();
  const controlsMoon = useAnimation();
  const controlsContrast = useAnimation();

  const iconVariants = {
    sun: {
      rotate: 0,
      scale: 1,
      opacity: 1,
    },
    moon: {
      rotate: 0,
      scale: 1,
      opacity: 1,
    },
    system: {
      rotate: 0,
      scale: 1,
      opacity: 1,
    },
    // applies to all
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: 180,
    },
    systemHidden: {
      scale: 0,
      opacity: 0,
    },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies(mounted): <explanation>
  useEffect(() => {
    if (theme === "system") {
      controlsSun.start("hidden");
      controlsContrast.start("system");
      controlsMoon.start("hidden");
    } else {
      controlsSun.start(theme === "light" ? "sun" : "hidden");
      controlsMoon.start(theme === "dark" ? "moon" : "hidden");
      controlsContrast.start("systemHidden");
    }
  }, [mounted, controlsContrast, controlsMoon, controlsSun, theme]);

  const nextTheme = useNextValue(
    ["light", "system", "dark"] as const,
    theme as string
  );

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="flex items-center gap-2 cursor-pointer group"
      onClick={() => {
        setTheme(nextTheme);
      }}
    >
      {!hideIndicator && (
        <div
          className={cn(
            "text-muted-foreground text-xs",
            hideIndicator &&
              "transition-all translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 delay-150"
          )}
        >
          {theme}
        </div>
      )}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        style={{ height: 24, width: 40 }}
        className={cn(
          "flex items-center bg-zinc-0 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/30 dark:ring-white/10 rounded-full shadow-inner dark:shadow-black/10 relative"
        )}
      >
        <motion.div
          animate={{
            x: theme === "light" ? 4 : theme === "system" ? 12 : 20,
            transition: { duration: 0.1, ease: "easeInOut" },
          }}
          style={{ height: 16, width: 16 }}
          className={cn(
            "rounded-full transition-all duration-300 ease-in-out relative"
          )}
        >
          <motion.div
            style={{ height: 16, width: 16 }}
            className="absolute top-0 left-0"
            variants={iconVariants}
            initial="hidden"
            animate={controlsSun}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <IconSunFilled className="size-4" />
          </motion.div>
          <motion.div
            style={{ height: 16, width: 16 }}
            className="absolute top-0 left-0"
            variants={iconVariants}
            initial="hidden"
            animate={controlsContrast}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <IconContrastFilled className="size-4 dark:rotate-180" />
          </motion.div>
          <motion.div
            style={{ height: 16, width: 16 }}
            className="absolute top-0 left-0"
            variants={iconVariants}
            initial="hidden"
            animate={controlsMoon}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <IconMoon className="size-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </button>
  );
}
