"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
  memoryUsage: number | null;
}

// 扩展LayoutShift接口
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

// 扩展FirstInputDelay接口
interface FirstInputDelay extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

// 扩展Performance接口
interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
    memoryUsage: null,
  });
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // 只在开发环境中显示
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    // 检测是否按下了 Alt+P 组合键
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "p") {
        setVisible(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // 测量 FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const fcp = entries[0].startTime;
        setMetrics(prev => ({ ...prev, fcp }));
      }
    });
    
    fcpObserver.observe({ type: "paint", buffered: true });

    // 测量 LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const lcp = entries[entries.length - 1].startTime;
        setMetrics(prev => ({ ...prev, lcp }));
      }
    });
    
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

    // 测量 CLS (Cumulative Layout Shift)
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0;
      for (const entry of entryList.getEntries()) {
        const layoutShift = entry as LayoutShift;
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
        }
      }
      setMetrics(prev => ({ ...prev, cls: clsValue }));
    });
    
    clsObserver.observe({ type: "layout-shift", buffered: true });

    // 测量 FID (First Input Delay)
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const firstInput = entries[0] as FirstInputDelay;
        const fid = firstInput.processingStart - firstInput.startTime;
        setMetrics(prev => ({ ...prev, fid }));
      }
    });
    
    fidObserver.observe({ type: "first-input", buffered: true });

    // 测量 TTFB (Time to First Byte)
    const navigationEntries = performance.getEntriesByType("navigation");
    if (navigationEntries.length > 0) {
      const ttfb = (navigationEntries[0] as PerformanceNavigationTiming).responseStart;
      setMetrics(prev => ({ ...prev, ttfb }));
    }

    // 定期更新内存使用情况
    const memoryInterval = setInterval(() => {
      const extendedPerformance = performance as ExtendedPerformance;
      if (extendedPerformance.memory) {
        const memoryUsage = extendedPerformance.memory.usedJSHeapSize / (1024 * 1024); // MB
        setMetrics(prev => ({ ...prev, memoryUsage }));
      }
    }, 2000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
      clearInterval(memoryInterval);
    };
  }, []);

  if (!visible || process.env.NODE_ENV !== "development") {
    return null;
  }

  const getMetricColor = (name: string, value: number | null): string => {
    if (value === null) return "text-gray-400";
    
    switch (name) {
      case "fcp":
        return value < 1800 ? "text-green-500" : value < 3000 ? "text-yellow-500" : "text-red-500";
      case "lcp":
        return value < 2500 ? "text-green-500" : value < 4000 ? "text-yellow-500" : "text-red-500";
      case "cls":
        return value < 0.1 ? "text-green-500" : value < 0.25 ? "text-yellow-500" : "text-red-500";
      case "fid":
        return value < 100 ? "text-green-500" : value < 300 ? "text-yellow-500" : "text-red-500";
      case "ttfb":
        return value < 200 ? "text-green-500" : value < 500 ? "text-yellow-500" : "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
        theme === "dark" ? "bg-zinc-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Performance Metrics</h3>
        <button 
          onClick={() => setVisible(false)}
          className="text-sm px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-700"
        >
          Close
        </button>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>FCP:</span>
          <span className={getMetricColor("fcp", metrics.fcp)}>
            {metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : "Measuring..."}
          </span>
        </div>
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getMetricColor("lcp", metrics.lcp)}>
            {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : "Measuring..."}
          </span>
        </div>
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getMetricColor("cls", metrics.cls)}>
            {metrics.cls !== null ? metrics.cls.toFixed(3) : "Measuring..."}
          </span>
        </div>
        <div className="flex justify-between">
          <span>FID:</span>
          <span className={getMetricColor("fid", metrics.fid)}>
            {metrics.fid ? `${metrics.fid.toFixed(0)}ms` : "Waiting..."}
          </span>
        </div>
        <div className="flex justify-between">
          <span>TTFB:</span>
          <span className={getMetricColor("ttfb", metrics.ttfb)}>
            {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : "Measuring..."}
          </span>
        </div>
        {metrics.memoryUsage !== null && (
          <div className="flex justify-between">
            <span>Memory:</span>
            <span>{metrics.memoryUsage.toFixed(1)} MB</span>
          </div>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Press Alt+P to toggle
      </div>
    </div>
  );
} 