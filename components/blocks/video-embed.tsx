import React, { useEffect, useState } from 'react';
import { IconBrandYoutube, IconBrandBilibili } from '@tabler/icons-react';
import { toast } from 'sonner';

// 使用模块级变量来跟踪 toast 是否已显示
let hasShownToast = false;

interface VideoEmbedProps {
  youtubeUrl: string;
  biliUrl: string;
}

export default function VideoEmbed({ youtubeUrl, biliUrl }: VideoEmbedProps) {
  const [useBili, setUseBili] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // 首先检查用户的手动选择
      const userPreference = localStorage.getItem('videoSource');
      const hasAcknowledged = localStorage.getItem('videoSourceAcknowledged') === 'true';
      console.log('VideoEmbed: User has acknowledged:', hasAcknowledged);
      
      if (userPreference) {
        console.log('VideoEmbed: Using saved preference:', userPreference);
        setUseBili(userPreference === 'bilibili');
        return;
      }

      // 然后检查地理位置
      const metaTag = document.querySelector('meta[name="user-country"]');
      const country = metaTag?.getAttribute('content');
      console.log('VideoEmbed: Meta tag found:', !!metaTag);
      console.log('VideoEmbed: Country from meta tag:', country);
      
      let shouldUseBili = false;

      // 在开发环境中，使用中间件设置的地理位置
      if (process.env.NODE_ENV === 'development') {
        console.log('VideoEmbed: Development environment detected');
        shouldUseBili = country === 'CN';
        console.log('VideoEmbed: Should use Bilibili (dev):', shouldUseBili);
      } else {
        // 生产环境中使用地理位置检测
        shouldUseBili = country === 'CN';
        console.log('VideoEmbed: Should use Bilibili (prod):', shouldUseBili);
      }
      
      // 如果地理位置检测失败，回退到语言检测
      if (!country) {
        console.log('VideoEmbed: No country detected, falling back to language detection');
        const lang = navigator.language || '';
        shouldUseBili = lang.toLowerCase().includes('zh');
        console.log('VideoEmbed: Language detection result:', { lang, shouldUseBili });
      }
      
      setUseBili(shouldUseBili);
      console.log('VideoEmbed: Final video source:', shouldUseBili ? 'Bilibili' : 'YouTube');
      
      // 等待用户交互后再显示提示
      const showToastAndPlaySound = () => {
        if (hasShownToast || hasAcknowledged) return;
        hasShownToast = true;

        try {
          console.log('准备播放音效...');
          const audio = new Audio('/sounds/pop.mp3');
          audio.volume = 0.3;
          
          console.log('尝试播放音效...');
          audio.play()
            .then(() => console.log('音效播放成功'))
            .catch(error => console.warn('音效播放失败:', error));

          // 显示提示
          if (shouldUseBili) {
            // 显示 Bilibili 相关提示
            toast(
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <IconBrandYoutube className="w-4 h-4 flex-shrink-0 text-zinc-900" />
                  <p className="font-medium text-zinc-900">如果搞错了,请原谅,您仍可在视频窗口内点击切换回 YouTube</p>
                </div>
                <button
                  onClick={() => {
                    localStorage.setItem('videoSourceAcknowledged', 'true');
                    toast.dismiss();
                  }}
                  className="self-end text-xs text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  不再提醒
                </button>
              </div>,
              {
                duration: 4000,
                className: '!bg-gradient-to-r !from-red-400 !to-white/90 !shadow-lg !border-none !rounded-lg animate-in slide-in-from-left-8 duration-300 backdrop-blur-sm',
                position: 'top-left',
              }
            );

            toast(
              <div className="flex items-center gap-3">
                <IconBrandBilibili className="w-4 h-4 flex-shrink-0 text-zinc-900" />
                <p className="font-medium text-zinc-900">看起来您好像来自中国,已为您切换为哔哩哔哩视频源</p>
              </div>,
              {
                duration: 4000,
                className: '!bg-gradient-to-r !from-[#00A1D6] !to-white/90 !shadow-lg !border-none !rounded-lg animate-in slide-in-from-left-8 duration-300 backdrop-blur-sm',
                position: 'top-left',
              }
            );
          } else {
            // 显示 YouTube 相关提示
            toast(
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <IconBrandBilibili className="w-4 h-4 flex-shrink-0 text-zinc-900" />
                  <p className="font-medium text-zinc-900">如果搞错了,请原谅,您仍可在视频窗口内点击切换回 哔哩哔哩</p>
                </div>
                <button
                  onClick={() => {
                    localStorage.setItem('videoSourceAcknowledged', 'true');
                    toast.dismiss();
                  }}
                  className="self-end text-xs text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  不再提醒
                </button>
              </div>,
              {
                duration: 4000,
                className: '!bg-gradient-to-r !from-[#00A1D6] !to-white/90 !shadow-lg !border-none !rounded-lg animate-in slide-in-from-left-8 duration-300 backdrop-blur-sm',
                position: 'top-left',
              }
            );

            toast(
              <div className="flex items-center gap-3">
                <IconBrandYoutube className="w-4 h-4 flex-shrink-0 text-zinc-900" />
                <p className="font-medium text-zinc-900">看起来您使用的是非中国IP,已为您切换为YouTube视频源</p>
              </div>,
              {
                duration: 4000,
                className: '!bg-gradient-to-r !from-red-400 !to-white/90 !shadow-lg !border-none !rounded-lg animate-in slide-in-from-left-8 duration-300 backdrop-blur-sm',
                position: 'top-left',
              }
            );
          }
        } catch (error) {
          console.error('音频加载失败:', error);
        }
      };

      // 监听用户交互
      const handleUserInteraction = () => {
        const hasInteracted = document.documentElement.hasAttribute('data-user-interacted');
        if (hasInteracted) {
          console.log('检测到用户交互，显示提示...');
          // 延迟显示提示，给用户一点反应时间
          setTimeout(showToastAndPlaySound, 1000);
          // 移除事件监听
          ['click', 'touchstart', 'keydown'].forEach(event => 
            document.removeEventListener(event, handleUserInteraction)
          );
        }
      };

      // 添加事件监听
      ['click', 'touchstart', 'keydown'].forEach(event => 
        document.addEventListener(event, handleUserInteraction)
      );

      // 清理函数
      return () => {
        ['click', 'touchstart', 'keydown'].forEach(event => 
          document.removeEventListener(event, handleUserInteraction)
        );
      };
    }
  }, []);

  // 保存用户的手动选择
  const handleVideoSourceChange = (useBilibili: boolean) => {
    setUseBili(useBilibili);
    localStorage.setItem('videoSource', useBilibili ? 'bilibili' : 'youtube');
  };

  // 开发环境下添加测试功能
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // 添加测试快捷键: Alt + Shift + T
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === 't') {
          localStorage.removeItem('videoSource');
          localStorage.removeItem('videoSourceAcknowledged'); // 同时清除确认状态
          hasShownToast = false; // 重置 toast 显示状态
          window.location.reload(); // 刷新页面以重新触发检测
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  if (useBili === null) {
    return <div className="aspect-video bg-muted animate-pulse rounded-xl" />;
  }

  return (
    <div className="relative aspect-video bg-muted rounded-xl overflow-hidden group">
      <button
        onClick={() => handleVideoSourceChange(!useBili)}
        className="absolute left-4 top-4 z-10 p-2 rounded-lg bg-white/10 backdrop-blur-sm 
                 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200
                 opacity-0 group-hover:opacity-100 flex items-center gap-2"
      >
        {useBili ? (
          <>
            <IconBrandYoutube className="w-5 h-5" />
            <span className="text-sm">切换到 YouTube</span>
          </>
        ) : (
          <>
            <IconBrandBilibili className="w-5 h-5" />
            <span className="text-sm">切换到哔哩哔哩</span>
          </>
        )}
      </button>

      <iframe
        src={useBili ? biliUrl : youtubeUrl}
        title={useBili ? "Bilibili 视频" : "YouTube 视频"}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
} 