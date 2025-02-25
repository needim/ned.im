import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import matter from 'gray-matter';
import { LRUCache } from 'lru-cache';

// 使用 LRU 缓存替代简单的 Map，限制缓存大小
const mdxCache = new LRUCache<string, MDXRemoteSerializeResult>({
  max: 100, // 最多缓存100个编译结果
  ttl: 1000 * 60 * 60, // 缓存1小时
});

// 添加一个计数器来跟踪缓存命中率
let cacheHits = 0;
let cacheMisses = 0;

/**
 * 编译Markdown/MDX内容为可渲染的组件
 * @param source Markdown/MDX源代码
 * @param options 额外的编译选项
 * @returns 编译后的MDX结果
 */
export async function compileMarkdown(
  source: string,
  options?: {
    disableCache?: boolean;
    additionalScope?: Record<string, unknown>;
  }
): Promise<MDXRemoteSerializeResult> {
  try {
    // 使用源文本作为缓存键
    const cacheKey = source;
    
    // 检查缓存（除非明确禁用）
    if (!options?.disableCache) {
      const cached = mdxCache.get(cacheKey);
      if (cached) {
        cacheHits++;
        return cached;
      }
    }
    
    cacheMisses++;
    
    const { content, data } = matter(source);
    
    // 合并前置数据和额外的作用域数据
    const scope = {
      ...data,
      ...(options?.additionalScope || {})
    };
    
    const compiled = await serialize(content, {
      mdxOptions: {
        format: 'mdx',
        // @ts-ignore: Plugin type compatibility
        remarkPlugins: [remarkGfm, remarkFrontmatter],
      },
      scope, // 传递合并后的作用域数据
    });
    
    // 存入缓存（除非明确禁用）
    if (!options?.disableCache) {
      mdxCache.set(cacheKey, compiled);
    }
    
    return compiled;
  } catch (error) {
    console.error('Error compiling MDX:', error);
    
    // 返回一个错误占位符，而不是抛出错误
    // 这样可以避免整个页面崩溃
    return {
      compiledSource: `
        export default function MDXContent() {
          return React.createElement('div', { className: 'mdx-error' },
            React.createElement('h3', {}, 'Error rendering content'),
            React.createElement('p', {}, 'There was an error rendering this content.')
          )
        }
      `,
      scope: {},
      frontmatter: {},
    } as MDXRemoteSerializeResult;
  }
}

/**
 * 获取缓存统计信息
 */
export function getMDXCacheStats() {
  return {
    size: mdxCache.size,
    hits: cacheHits,
    misses: cacheMisses,
    hitRate: cacheHits / (cacheHits + cacheMisses) || 0,
  };
}

/**
 * 清除MDX缓存
 */
export function clearMDXCache() {
  mdxCache.clear();
  cacheHits = 0;
  cacheMisses = 0;
} 