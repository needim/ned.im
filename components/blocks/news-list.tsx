"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconExternalLink, IconClock, IconTag, IconTrendingUp } from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { newsItems, type NewsItem } from "@/data/news";

const categoryColors = {
  "技术": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "AI": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "开源": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "区块链": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "默认": "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
};

export function NewsList() {
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ["全部", ...Array.from(new Set(newsItems.map(item => item.category)))];
  
  const filteredNews = selectedCategory === "全部" 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  // 避免水合错误：在客户端挂载前显示加载状态
  if (!mounted) {
    return (
      <div className="mt-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-muted rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 新闻列表 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {filteredNews.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group p-6 rounded-lg border bg-card hover:bg-card/80 transition-all duration-200 hover:shadow-md"
            >
              <div className="space-y-3">
                {/* 标题和外链图标 */}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline"
                    >
                      {item.title}
                      <IconExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </h2>
                </div>

                {/* 描述 */}
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* 元信息 */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <IconClock className="w-4 h-4" />
                    <span>
                      {mounted ? formatDistanceToNow(new Date(item.publishedAt), { 
                        addSuffix: true, 
                        locale: zhCN 
                      }) : new Date(item.publishedAt).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                  
                  <span className="text-muted-foreground/60">•</span>
                  
                  <span>{item.source}</span>
                  
                  <span className="text-muted-foreground/60">•</span>
                  
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      categoryColors[item.category as keyof typeof categoryColors] || categoryColors["默认"]
                    }`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* 标签 */}
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
                      >
                        <IconTag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <IconTrendingUp className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">暂无相关快报</p>
        </div>
      )}
    </div>
  );
}