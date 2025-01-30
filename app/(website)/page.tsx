import { CareerCard } from "@/components/blocks/career-card";
import { Container } from "@/components/blocks/container";
import { GitHubIcon, XIcon } from "@/components/blocks/social-icons";
import { SocialLink } from "@/components/blocks/social-link";
import { getGithubInfo, getXInfo } from "@/server/thirdparty";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Readme() {
  const githubResponse = await getGithubInfo();
  const xResponse = await getXInfo();

  const last3weeks =
    githubResponse.data.user.contributionsCollection.contributionCalendar.weeks.slice(
      -3
    );
  const last14days = last3weeks
    .flatMap((week) => week.contributionDays)
    .slice(-14);

  const githubFollowers = githubResponse.data.user.followers.totalCount;
  const githubStars = githubResponse.data.user.repositories.nodes.reduce(
    (acc, repo) => acc + repo.stargazerCount,
    0
  );

  const myCareerItems = [
    {
      from: 2024,
      to: null,
      title: "Content Creator",
      company: { name: "Self-employed", url: "https://www.laogou717.com" },
      location: "Zhengzhou, China",
      description: "Creating content focused on AI technology and productivity tools."
    },
    {
      from: 2023,
      to: 2024,
      title: "Video Editor",
      company: { name: "E-commerce Company", url: null },
      location: "Zhengzhou, China",
      description: "Worked as a video editor from October 2023 to May 2024."
    },
    {
      from: 2021,
      to: 2023,
      title: "Product Photographer & Video Editor",
      company: { name: "E-commerce Company", url: null },
      location: "Zhengzhou, China",
      description: "Worked as a product photographer and video editor from May 2021 to September 2023."
    },
    {
      from: 2020,
      to: 2021,
      title: "Self Study Period",
      company: { name: "Self-employed", url: null },
      location: "Zhengzhou, China",
      description: "Spent a year in self-study and personal development."
    }
  ];

  return (
    <>
      <Container className="mt-9">
        <h1 className="tracking-tight text-4xl sm:text-5xl">
          Jonas (老狗)
          <span className="text-muted-foreground font-title font-extralight text-3xl sm:text-4xl block text-balance">
            AI Enthusiast & Content Creator
          </span>
        </h1>
        <div className="pro text-muted-foreground text-balance">
          <p className="mt-6">
            Hi <span className="text-xl">👋🏻</span>, I'm an AI enthusiast, video editor, and photographer. Check out my AI navigation site<br/>你好 👋🏻，我是一名人工智能爱好者、视频编辑和摄影师。欢迎访问我的AI工具导航网站{" "}
            <Link
              href="https://nav.laogou717.com"
              target="_blank"
              rel="nofollow noreferrer"
            >
              @nav.laogou717.com
            </Link>
          </p>
          <p>
            I'm passionate about breaking down information barriers and helping newcomers to AI technology. 
            My goal is to help others improve their efficiency, just as I would have wanted help when I was starting out. 
            If I happen to gain followers along the way, I consider it an honor.
             <br/>我热衷于打破信息壁垒，帮助人工智能技术新手。我的目标是帮助他人提高效率，就像我刚起步时希望别人帮助我一样。如果我在这条路上碰巧获得了追随者，我认为这是一种荣誉。
          </p>
        </div>
        <div className="mt-6 flex gap-6">
          <SocialLink
            href="https://x.com/shenfanlaogou"
            icon={XIcon}
            count={xResponse.data?.public_metrics?.followers_count}
            label="followers"
          />
          <SocialLink
            href="https://github.com/laogou717"
            aria-label="Follow on GitHub"
            icon={GitHubIcon}
            count={githubFollowers}
            label="followers"
          />
        </div>
      </Container>
      <Container className="mt-24 md:mt-20">
        <h2 className="text-3xl">Career</h2>
        <p className="text-muted-foreground mb-8 mt-3">
          With 14+ years of self-learning experience, most of my skills were acquired through the internet.
          <br/>我有 14 年以上的自学经验，大部分技能都是通过互联网获得的。
        </p>
        <div className="grid grid-cols-1 gap-3">
          {myCareerItems.map((item, index) => (
            <CareerCard key={index} item={item} />
          ))}
        </div>
      </Container>
    </>
  );
}
