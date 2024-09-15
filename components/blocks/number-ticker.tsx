"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function NumberTicker({
	value,
	direction = "up",
	delay = 0,
	className,
	label,
	play,
}: {
	value: number;
	direction?: "up" | "down";
	className?: string;
	label?: string;
	delay?: number; // delay in s
	play?: boolean;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const motionValue = useMotionValue(direction === "down" ? value : 0);
	const springValue = useSpring(motionValue, {
		damping: 100,
		stiffness: 1000,
	});

	useEffect(() => {
		play &&
			setTimeout(() => {
				motionValue.set(direction === "down" ? 0 : value);
			}, delay * 1000);
	}, [motionValue, play, delay, value, direction]);

	useEffect(
		() =>
			springValue.on("change", (latest) => {
				if (ref.current) {
					ref.current.textContent = `${Intl.NumberFormat("en-US").format(
						Number.parseInt(latest.toFixed(0)),
					)} ${label ? label : ""}`;
				}
			}),
		[springValue, label],
	);

	return typeof value === "string" ? (
		<>{value}</>
	) : (
		<span className={cn("inline-block tabular-nums", className)} ref={ref} />
	);
}
