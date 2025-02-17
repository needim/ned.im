const dateFormat = {
  day: {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
    locale: "zh-CN"
  },
  month: {
    year: "numeric" as const,
    month: "long" as const,
    locale: "zh-CN"
  },
  year: {
    year: "numeric" as const,
    locale: "zh-CN"
  },
};

export const timelineItems = [
  {
    date: '',
    event: '无业游民',
    title: '继续制作视频',
    description: '当累计投入达到10000小时，那些看似沉寂的作品会像中子星物质般突然被「点亮」——每克重量都释放出超新星级别的能量。我希望保持这种克制的燃烧，宇宙一定会送来匹配我频率的观众星群.',
    icon: '🎥',
    photos: [
      { src: '/changelog/2024-01-01-全职博主/IMG_2055.JPG', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_2054.JPG', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_2053.JPG', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_0482.jpg', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_0012.jpg', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_0499.jpg', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_1771.jpg', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_1762.jpg', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_0716.jpg', variant: '4x5' }
    ],
    dateFormatOptions: dateFormat.year
  },
  {
    date: '2024-09-03',
    event: '域名迁移',
    title: '域名迁移到Cloudflare',
    description: '最终还是把域名转移到了Cloudflare上 😌',
    icon: '🌐',
    photos: [
      { src: 'https://img.laogou717.com/file/d749a9314c9861c45ed13.png', variant: '4x3' }
    ],
    dateFormatOptions: dateFormat.day
  },
  {
    date: '2024-08-23',
    event: '新域名上线',
    title: '新的开始',
    description: '欢迎来到 www.laogou717.com',
    icon: '🎉',
    dateFormatOptions: dateFormat.day
  },
  {
    date: '2024-04-11',
    event: 'OneAPI部署',
    title: 'OneAPI部署经验',
    description: 'OneAPI部署其实没有大家想的那么复杂，找个免费的SQL数据库对照着文档做基本不会有大问题.',
    icon: '💻',
    photos: [
      { src: 'https://img.laogou717.com/file/335d626feb22b52bc4ade.jpg', variant: '4x3' }
    ],
    link: 'https://github.com/songquanpeng/one-api',
    dateFormatOptions: dateFormat.day
  },
  {
    date: '2024-02-15',
    event: '失眠的夜',
    title: '深夜的思绪',
    description: '距离开工还剩两天,根本睡不着,完全不想上班啊...',
    icon: '🌙',
    dateFormatOptions: dateFormat.day,
    metadata: {
      time: '03:55:00',
      location: '卧室',
      music: {
        platform: 'netease',
        id: '1836462679',
        url: 'https://music.163.com/#/song?id=1836462679'
      }
    }
  },
  {
    date: '2024-01-09',
    event: '视频创作',
    title: '一只Emo的大肥猫',
    description: '分享了一个关于猫咪的视频作品',
    icon: '🎥',
    dateFormatOptions: dateFormat.day,
    metadata: {
      video: 'https://player.bilibili.com/player.html?aid=752652004&bvid=BV12k4y197v6&cid=176424111&autoplay=0',
      from: '神烦老狗'
    }
  },
  {
    date: '2022-01-01',
    event: '遇见了她',
    title: '生命中的温暖',
    description: '我当时是做公司的摄影,经常与她聊天,后来一起去玩了一次剧本杀,我们熟络了起来。她跟以前的我很像，胆小、幼稚但很善良.',
    icon: '💝',
    photos: [
      { src: '/changelog/2022-01-01-遇见她/IMG_2028.JPG', variant: '4x3' },
      { src: '/changelog/2022-01-01-遇见她/IMG_2027.JPG', variant: '4x3' }
    ],
    dateFormatOptions: dateFormat.day
  },
  {
    date: '2021',
    event: '电商实习生涯',
    title: '电商实习生涯',
    description: '在电商公司实习，我说我希望一月能挣四千块，面试的人笑了出来，说当然可以了。呆了两年半认识了一些朋友,他们人都很好.',
    icon: '💼',
    photos: [
      { src: '/changelog/2021-06-01-电商实习/IMG_2066.JPG', variant: '1x1' },
      { src: '/changelog/2021-06-01-电商实习/IMG_2033.PNG', variant: '1x1' },
      { src: '/changelog/2021-06-01-电商实习/IMG_2031.JPG', variant: '4x5' },
      { src: '/changelog/2021-06-01-电商实习/IMG_2030.JPG', variant: '4x5' }
    ],
    dateFormatOptions: dateFormat.year
  },
  {
    date: '2018-09-01',
    event: '警校生活',
    title: '寻找自我的三年',
    description: '半封闭式的管理让我不适应，但我找到了自己的方向 - 阅读了大量的书籍，自学了我感谢去的东西，期望把浪费的时间都补回来.',
    icon: '👮',
    photos: [
      { src: '/changelog/2018-09-01-警校/IMG_2040.JPG', variant: '4x3' },
      { src: '/changelog/2018-09-01-警校/IMG_2039.JPG', variant: '4x3' }
    ],
    dateFormatOptions: dateFormat.year
  },
  {
    date: '2018-03-01',
    event: '电子厂流水线',
    title: '短暂的尝试与逃离',
    description: '18年的暑假,我跟着朋友在苹果蓝牙耳机生产线上，我尝试改变自己内向的性格。一个新人的眼神仿佛看透了我，一瞬间我又变回了那个内向的自己。最后逃回老家.',
    icon: '🏭',
    photos: [
      { src: '/changelog/2018-03-01-电子厂/IMG_2045.JPG', variant: '1x1' },
      { src: '/changelog/2018-03-01-电子厂/IMG_2044.JPG', variant: '1x1' },
      { src: '/changelog/2018-03-01-电子厂/IMG_2042.JPG', variant: '1x1' }
    ],
    dateFormatOptions: dateFormat.year
  },
  {
    date: '2008',
    event: '摄影初体验',
    title: '创意的萌芽',
    description: '用母亲的摩托罗拉翻盖手机拍摄"特技视频"，虽然只能录制一分钟的无声视频，但我拍了很多有趣的画面，比如瞬间移动、第一视角的打斗视频。这是我第一次接触摄影创作.',
    icon: '📱',
    photos: [
      { src: '/changelog/2008-01-01-第一次拍摄/motorola.png', variant: '4x5' },
      { src: '/changelog/2008-01-01-第一次拍摄/IMG_2113.jpg', variant: '4x5' }
    ],
    dateFormatOptions: dateFormat.year
  },
  {
    date: '1999-01-24',
    event: '生命的开始',
    title: '河南小村庄',
    description: '我出生在中国河南的一个小村庄里，是父母结婚七年后的第一个孩子，我还有个小我三岁的弟弟.',
    icon: '👶',
    photos: [
      { src: '/changelog/1999-01-24-出生/IMG_2051.JPG', variant: '4x5' },
      { src: '/changelog/1999-01-24-出生/IMG_2050.JPG', variant: '4x5' },
      { src: '/changelog/1999-01-24-出生/IMG_2049.JPG', variant: '4x5' },
      { src: '/changelog/1999-01-24-出生/IMG_2048.JPG', variant: '4x5' },
      { src: '/changelog/1999-01-24-出生/IMG_2047.JPG', variant: '4x3' },
      { src: '/changelog/1999-01-24-出生/IMG_2046.JPG', variant: '1x1' },
      { src: '/changelog/1999-01-24-出生/IMG_2041.JPG', variant: '4x3' }
    ],
    dateFormatOptions: dateFormat.day
  }
];

export const changelog = timelineItems
  .filter(item => item.date) // Filter out items with empty dates
  .sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  }); 