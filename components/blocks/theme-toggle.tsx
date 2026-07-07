"use client";

import useNextValue from "@/components/hooks/use-next-value";
import { cn } from "@/lib/utils";
import {
	IconContrastFilled,
	IconMoonFilled,
	IconSunFilled,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({
	hideIndicator = false,
}: {
	hideIndicator?: boolean;
}) {
	const [mounted, setMounted] = useState(false);
	const { setTheme, theme } = useTheme();
	const currentTheme = theme ?? "system";

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

	const nextTheme = useNextValue(
		["light", "system", "dark"] as const,
		currentTheme,
	);

	if (!mounted) {
		return null;
	}

	return (
		<button
			className="flex items-center cursor-pointer group"
			onClick={() => {
				setTheme(nextTheme);
			}}
		>
			{!hideIndicator && (
				<div
					className={cn(
						"text-muted-foreground text-xs mr-2",
						hideIndicator &&
							"transition-all translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 delay-150",
					)}
				>
					{theme}
				</div>
			)}
			<motion.div
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.9 }}
				className={cn("size-5 flex items-center relative")}
			>
				<motion.div
					className={cn(
						"size-5 transition-all duration-300 ease-in-out relative",
					)}
				>
					<motion.div
						className="size-5 absolute top-0 left-0"
						variants={iconVariants}
						initial="hidden"
						animate={currentTheme === "light" ? "sun" : "hidden"}
						transition={{ duration: 0.2, ease: "easeInOut" }}
					>
						<IconSunFilled className="size-5" />
					</motion.div>
					<motion.div
						className="size-5 absolute top-0 left-0"
						variants={iconVariants}
						initial="hidden"
						animate={currentTheme === "system" ? "system" : "systemHidden"}
						transition={{ duration: 0.2, ease: "easeInOut" }}
					>
						<IconContrastFilled className="size-5 dark:rotate-180" />
					</motion.div>
					<motion.div
						className="size-5 absolute top-0 left-0"
						variants={iconVariants}
						initial="hidden"
						animate={currentTheme === "dark" ? "moon" : "hidden"}
						transition={{ duration: 0.2, ease: "easeInOut" }}
					>
						<IconMoonFilled className="size-5" />
					</motion.div>
				</motion.div>
			</motion.div>
		</button>
	);
}
