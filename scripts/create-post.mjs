#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createPost() {
  const title = await question('文章标题: ');
  const description = await question('文章描述: ');
  const tags = await question('标签 (用逗号分隔): ');

  const date = new Date().toISOString().split('T')[0];
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');

  const content = `export const metadata = {
  title: "${title}",
  description: "${description}",
  date: "${date}",
  tags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
};

# ${title}

${description}

`;

  const filePath = path.join(process.cwd(), 'app', '(website)', 'notes', `${slug}.mdx`);
  fs.writeFileSync(filePath, content);

  console.log(`\n✅ 文章创建成功：${filePath}`);
  rl.close();
}

createPost().catch(console.error); 