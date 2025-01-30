"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function NumberTicker({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    const animationDuration = 500; // 500ms
    const steps = 20;
    const stepDuration = animationDuration / steps;
    
    if (value !== previousValue.current) {
      const diff = value - previousValue.current;
      const increment = diff / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setDisplayValue(value);
          clearInterval(interval);
        } else {
          setDisplayValue(previousValue.current + (increment * currentStep));
        }
      }, stepDuration);

      previousValue.current = value;
      return () => clearInterval(interval);
    }
  }, [value]);

  return (
    <span className={cn("tabular-nums", className)}>
      {Math.round(displayValue).toLocaleString()}
    </span>
  );
}
