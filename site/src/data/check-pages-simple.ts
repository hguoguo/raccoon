// 分析脚本：检查路径问题和缺失页面（不依赖 Vite）
import * as fs from 'fs';
import * as path from 'path';

const PAGES_ROOT = '/Users/liujianhua/IdeaProjects/raccoon-edu/site/src/pages/articles';
const CHAPTERS_FILE = '/Users/liujianhua/IdeaProjects/raccoon-edu/site/src/data/chapters.ts';

// 递归获取所有 .tsx 文件
function getAllTsxFiles(dir: string): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllTsxFiles(fullPath));
    } else if (item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// 从文件路径提取 slug
function extractSlug(filePath: string): string {
  return path.basename(filePath, '.tsx');
}

console.log('=== 开始分析 ===\n');

// 1. 获取所有实际存在的页面文件
const existingFiles = getAllTsxFiles(PAGES_ROOT);
console.log(`找到 ${existingFiles.length} 个页面文件\n`);

// 2. 解析 chapters.ts 文件提取元数据
const chaptersContent = fs.readFileSync(CHAPTERS_FILE, 'utf-8');

// 使用正则表达式提取所有文章定义
const articlePattern = /\{\s*slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"]/g;
const articles: Array<{ slug: string; title: string }> = [];
let match;

while ((match = articlePattern.exec(chaptersContent)) !== null) {
  articles.push({
    slug: match[1],
    title: match[2]
  });
}

console.log(`从 chapters.ts 中提取到 ${articles.length} 篇文章定义\n`);

// 3. 构建现有文件的 slug 集合
const existingSlugs = new Set(existingFiles.map(f => extractSlug(f)));

// 4. 检查路径问题
console.log('=== 1. 路径存放有问题的页面 ===\n');

// 检查是否有重复的 slug
const slugCount = new Map<string, string[]>();
for (const file of existingFiles) {
  const slug = extractSlug(file);
  if (!slugCount.has(slug)) {
    slugCount.set(slug, []);
  }
  slugCount.get(slug)!.push(path.relative(PAGES_ROOT, file));
}

const duplicateSlugs: Array<{ slug: string; paths: string[] }> = [];
for (const [slug, paths] of slugCount) {
  if (paths.length > 1) {
    duplicateSlugs.push({ slug, paths });
  }
}

if (duplicateSlugs.length > 0) {
  console.log('⚠️ 发现重复的 slug（可能存放在错误的目录）:\n');
  duplicateSlugs.forEach(({ slug, paths }) => {
    console.log(`Slug: ${slug}`);
    paths.forEach(p => console.log(`  - ${p}`));
    console.log('');
  });
} else {
  console.log('✅ 未发现重复的 slug\n');
}

// 检查不在元数据中的文件
const metaSlugs = new Set(articles.map(a => a.slug));
const orphanedFiles: string[] = [];

for (const file of existingFiles) {
  const slug = extractSlug(file);
  if (!metaSlugs.has(slug)) {
    orphanedFiles.push(path.relative(PAGES_ROOT, file));
  }
}

if (orphanedFiles.length > 0) {
  console.log('⚠️ 以下文件在 pages 中存在但不在 chapters.ts 元数据中:\n');
  orphanedFiles.forEach(file => {
    console.log(`  - ${file}`);
  });
  console.log('');
}

// 5. 检查缺失的页面
console.log('=== 2. 元数据中存在但 pages 中缺失的页面 ===\n');

const missingPages = articles.filter(a => !existingSlugs.has(a.slug));

if (missingPages.length === 0) {
  console.log('✅ 所有元数据定义的页面都已实现\n');
} else {
  console.log(`共缺失 ${missingPages.length} 个页面:\n`);
  console.log('| Slug | 标题 |');
  console.log('|------|------|');
  missingPages.forEach(page => {
    console.log(`| ${page.slug} | ${page.title.replace(/\|/g, '\\|')} |`);
  });
  console.log('\n');
}

// 6. 统计信息
console.log('=== 统计信息 ===\n');
console.log(`总页面文件数: ${existingFiles.length}`);
console.log(`元数据定义文章数: ${articles.length}`);
console.log(`已实现页面数: ${articles.length - missingPages.length}`);
console.log(`缺失页面数: ${missingPages.length}`);
console.log(`孤立文件数（不在元数据中）: ${orphanedFiles.length}`);
console.log(`重复 slug 数: ${duplicateSlugs.length}`);
console.log(`实现率: ${((articles.length - missingPages.length) / articles.length * 100).toFixed(2)}%`);
