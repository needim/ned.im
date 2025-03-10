# laogou717.com - 个人博客网站

![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC)

## 📢 声明

- 本项目基于 [nedim](https://github.com/needim) 的开源框架开发
- 由我本人进行口述，cursor 进行编写代码
- 原作者的代码很清晰，也很轻量，但我懒省事让 AI 搞了很多💩山代码
- 下一步计划是：等待一个更好的 AI 来帮我整理💩山，希望这一天快点到来

## 🚀 已加入的功能

### 📝 Notes 页面
- 用来存放个人日记和日常信息
- 支持 Markdown/MDX 格式
- 清晰的时间线展示

![notes](https://github.com/user-attachments/assets/bdf7593a-7d63-46fd-af09-bb6ce093bc6a)

### 🔧 Geek 页面
当作 [YouTube](https://www.youtube.com/@shenfanlaogou)、[B站](https://space.bilibili.com/46377861) 视频的操作补充

- **视频功能**:
  - 添加 YouTube 视频封面获取
    ![视频封面](https://github.com/user-attachments/assets/0d3cf32e-76c8-49c8-a022-e11339034937)
  - 增加手动切换视频源按钮
    ![B站视频](https://github.com/user-attachments/assets/25540c1e-c76d-4dcb-bdfc-1210f3ba7cdb)
  - 添加 IP 识别，自动切换可播放的视频源
  - 增加了消息提醒及音效
    ![消息提醒&音效](https://github.com/user-attachments/assets/679ee16c-f50a-4083-b549-8a0d79b47d3b)

### 💬 评论系统
- 加入了评论系统：[giscus](https://giscus.app)
- 基于 GitHub Discussions 的评论功能

![评论系统](https://github.com/user-attachments/assets/00290592-67cb-4c73-b75d-367d42a0c6fa)

### 🎵 音乐组件
- 添加了音乐组件，使用 Vercel 部署的 [neteasecloudmusicapi](https://gitlab.com/Binaryify/neteasecloudmusicapi)
- 支持播放、暂停、切换歌曲等功能

![音乐组件1](https://github.com/user-attachments/assets/bdf0795d-af98-45be-ac30-75172a98d430) ![音乐组件2](https://github.com/user-attachments/assets/052bfdc3-5e9b-4a7c-b8a6-5b99fcd4697a)
![音乐组件3](https://github.com/user-attachments/assets/d3cc1c72-3a3c-44df-a591-a90e0e152e1f) ![音乐组件4](https://github.com/user-attachments/assets/55a96341-11eb-4d2e-bab1-5a00e18bda60)

## 🛠️ 技术栈

- **前端框架**: Next.js 15.1.6
- **UI 库**: React 18.2.0
- **样式**: TailwindCSS, Shadcn UI
- **语言**: TypeScript
- **内容管理**: MDX, Notion API
- **部署**: Vercel

## 🚦 开始使用

### 前提条件
- Node.js 18+
- pnpm 9.15.4+

### 安装
```bash
# 克隆仓库
git clone https://github.com/laogou717/laogou717.com.git
cd laogou717.com

# 安装依赖
pnpm install

# 复制环境变量文件
cp .env.example .env.local
# 编辑 .env.local 文件，填入必要的环境变量
```

### 开发
```bash
# 启动开发服务器
pnpm dev
```

### 构建
```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

### 创建新文章
```bash
pnpm new-post
```

## 📝 开发计划
- 优化代码结构，减少技术债务（等待更好的 AI 帮忙整理💩山）
- 提升页面加载性能
- 添加更多交互功能

## 📄 许可证
本项目基于 [LICENSE](./LICENSE) 文件中的条款进行许可。

## 🙏 致谢
- 特别感谢 [nedim](https://github.com/needim) 提供的优秀开源框架
- 感谢所有开源项目的贡献者们
- 感谢 cursor 和各种 AI 工具（尽管它们有时候会制造💩山）

  
