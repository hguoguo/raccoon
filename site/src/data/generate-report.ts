// 详细分析报告生成脚本
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

console.log('=== 页面完整性分析报告 ===\n');
console.log(`生成时间: ${new Date().toLocaleString('zh-CN')}\n`);

// 1. 获取所有实际存在的页面文件
const existingFiles = getAllTsxFiles(PAGES_ROOT);

// 2. 解析 chapters.ts 文件提取元数据（更精确的正则）
const chaptersContent = fs.readFileSync(CHAPTERS_FILE, 'utf-8');

// 使用更精确的正则表达式提取文章定义及其上下文
const articlePattern = /\{\s*slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"][^}]*meta:\s*\{[^}]*category:\s*['"]([^'"]+)['"]/g;
const articles: Array<{ slug: string; title: string; category: string }> = [];
let match;

while ((match = articlePattern.exec(chaptersContent)) !== null) {
  articles.push({
    slug: match[1],
    title: match[2],
    category: match[3]
  });
}

// 3. 构建现有文件的映射
const existingFileMap = new Map<string, string>();
for (const file of existingFiles) {
  const slug = extractSlug(file);
  const relativePath = path.relative(PAGES_ROOT, file);
  existingFileMap.set(slug, relativePath);
}

// 4. 检查路径问题
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('📋 问题 1: 路径存放有问题的页面\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// 4.1 检查重复的 slug
const slugCount = new Map<string, string[]>();
for (const file of existingFiles) {
  const slug = extractSlug(file);
  if (!slugCount.has(slug)) {
    slugCount.set(slug, []);
  }
  slugCount.get(slug)!.push(path.relative(PAGES_ROOT, file));
}

const duplicateSlugs = Array.from(slugCount.entries()).filter(([_, paths]) => paths.length > 1);

if (duplicateSlugs.length > 0) {
  console.log('❌ 发现重复的 slug（同一篇文章出现在多个位置）:\n');
  duplicateSlugs.forEach(([slug, paths]) => {
    console.log(`📄 Slug: ${slug}`);
    paths.forEach(p => console.log(`   └─ ${p}`));
    console.log('');
  });
  console.log('💡 建议: 保留正确的路径，删除重复的文件\n');
} else {
  console.log('✅ 未发现重复的 slug\n');
}

// 4.2 检查不在元数据中的文件（孤立文件）
const metaSlugs = new Set(articles.map(a => a.slug));
const orphanedFiles: Array<{ path: string; slug: string }> = [];

for (const file of existingFiles) {
  const slug = extractSlug(file);
  if (!metaSlugs.has(slug)) {
    orphanedFiles.push({
      path: path.relative(PAGES_ROOT, file),
      slug
    });
  }
}

if (orphanedFiles.length > 0) {
  console.log('⚠️  以下文件在 pages 中存在但不在 chapters.ts 元数据中:\n');
  orphanedFiles.forEach(({ path, slug }) => {
    console.log(`   📄 ${path}`);
    console.log(`      Slug: ${slug}`);
    console.log('');
  });
  console.log('💡 建议: 要么在 chapters.ts 中添加元数据，要么删除这些文件\n');
} else {
  console.log('✅ 所有文件都在元数据中有对应定义\n');
}

// 5. 检查缺失的页面
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('📋 问题 2: 元数据中存在但 pages 中缺失的页面\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const missingPages = articles.filter(a => !existingFileMap.has(a.slug));

if (missingPages.length === 0) {
  console.log('✅ 所有元数据定义的页面都已实现\n');
} else {
  console.log(`共缺失 ${missingPages.length} 个页面:\n`);
  console.log('按章节分组:\n');
  
  // 按 chapter 分组
  const groupedByChapter = new Map<string, Array<{ slug: string; title: string; category: string }>>();
  for (const page of missingPages) {
    if (!groupedByChapter.has(page.category)) {
      groupedByChapter.set(page.category, []);
    }
    groupedByChapter.get(page.category)!.push(page);
  }
  
  groupedByChapter.forEach((pages, chapterId) => {
    console.log(`📚 章节: ${chapterId}`);
    pages.forEach(page => {
      console.log(`   ├─ ${page.slug}`);
      console.log(`   │  标题: ${page.title}`);
      console.log(`   │  期望路径: <domain>/<subcategory>/${chapterId}/${page.slug}.tsx`);
      console.log('');
    });
  });
  
  console.log('\nMarkdown 表格格式:\n');
  console.log('| Slug | 标题 | 章节ID | 状态 |');
  console.log('|------|------|--------|------|');
  missingPages.forEach(page => {
    const status = page.title.includes('未实现') ? '🔴 待实现' : '🟡 需创建';
    console.log(`| ${page.slug} | ${page.title.replace(/\|/g, '\\|')} | ${page.category} | ${status} |`);
  });
  console.log('\n');
}

// 6. 统计信息
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('📊 统计信息\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`总页面文件数:          ${existingFiles.length}`);
console.log(`元数据定义文章数:      ${articles.length}`);
console.log(`已实现页面数:          ${articles.length - missingPages.length}`);
console.log(`缺失页面数:            ${missingPages.length}`);
console.log(`孤立文件数:            ${orphanedFiles.length}`);
console.log(`重复 slug 数:          ${duplicateSlugs.length}`);
console.log(`实现率:                ${((articles.length - missingPages.length) / articles.length * 100).toFixed(2)}%`);
console.log('');

// 7. 建议操作
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('💡 建议操作\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (duplicateSlugs.length > 0) {
  console.log('1. 处理重复的 slug:');
  duplicateSlugs.forEach(([slug, paths]) => {
    console.log(`   - ${slug}: 检查 ${paths.join(' 和 ')}, 保留正确的路径`);
  });
  console.log('');
}

if (orphanedFiles.length > 0) {
  console.log('2. 处理孤立文件:');
  orphanedFiles.forEach(({ path }) => {
    console.log(`   - ${path}: 添加元数据或删除文件`);
  });
  console.log('');
}

if (missingPages.length > 0) {
  console.log('3. 创建缺失的页面:');
  console.log(`   共需创建 ${missingPages.length} 个页面`);
  console.log('   建议使用 create-knowledge-page skill 批量创建\n');
}

if (duplicateSlugs.length === 0 && orphanedFiles.length === 0 && missingPages.length === 0) {
  console.log('✅ 所有检查通过！页面结构完全符合规范。\n');
}
