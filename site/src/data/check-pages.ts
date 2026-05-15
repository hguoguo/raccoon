// 分析脚本：检查路径问题和缺失页面
import { domains, chapters } from './chapters';
import * as fs from 'fs';
import * as path from 'path';

const PAGES_ROOT = '/Users/liujianhua/IdeaProjects/raccoon-edu/site/src/pages/articles';

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

// 从文件路径提取期望的目录结构
function extractExpectedPath(filePath: string): { domainId?: string; subCategoryId?: string; chapterId?: string; slug: string } {
  const relativePath = path.relative(PAGES_ROOT, filePath);
  const parts = relativePath.split(path.sep);
  
  // 移除文件名
  const slug = parts.pop()?.replace('.tsx', '') || '';
  
  // 根据层级判断
  if (parts.length === 3) {
    // backend/java/01-java-core/slug.tsx
    return { domainId: parts[0], subCategoryId: parts[1], chapterId: parts[2], slug };
  } else if (parts.length === 4) {
    // infra/oltp/mysql/slug.tsx
    return { domainId: parts[0], subCategoryId: parts[1], chapterId: parts[2], slug };
  } else if (parts.length === 5) {
    // ai/ai-application/06-ai-theory/slug.tsx
    return { domainId: parts[0], subCategoryId: parts[1], chapterId: parts[2], slug };
  }
  
  return { slug };
}

console.log('=== 开始分析 ===\n');

// 1. 获取所有实际存在的页面文件
const existingFiles = getAllTsxFiles(PAGES_ROOT);
console.log(`找到 ${existingFiles.length} 个页面文件\n`);

// 2. 构建元数据中的所有文章映射
const metaArticles = new Map<string, { slug: string; chapterId: string; title: string; domainId: string; subCategoryId: string }>();

for (const domain of domains) {
  for (const subCategory of domain.subCategories) {
    for (const chapter of subCategory.chapters) {
      for (const article of chapter.articles) {
        const key = `${domain.id}/${subCategory.id}/${chapter.id}/${article.slug}`;
        metaArticles.set(article.slug, {
          slug: article.slug,
          chapterId: chapter.id,
          title: article.title,
          domainId: domain.id,
          subCategoryId: subCategory.id
        });
      }
    }
  }
}

console.log(`元数据中定义了 ${metaArticles.size} 篇文章\n`);

// 3. 检查路径问题
console.log('=== 1. 路径存放有问题的页面 ===\n');
const pathIssues: Array<{ file: string; issue: string; expectedPath?: string }> = [];

for (const file of existingFiles) {
  const slug = extractSlug(file);
  const expectedPath = extractExpectedPath(file);
  
  // 查找该 slug 在元数据中的位置
  const metaArticle = metaArticles.get(slug);
  
  if (!metaArticle) {
    pathIssues.push({
      file: path.relative(PAGES_ROOT, file),
      issue: '❌ 元数据中不存在此文章（可能是废弃页面或测试文件）'
    });
    continue;
  }
  
  // 检查路径是否符合规范
  const actualParts = path.relative(PAGES_ROOT, file).split(path.sep);
  const expectedChapterId = metaArticle.chapterId;
  
  // 检查 chapter 文件夹名称是否正确
  if (actualParts.length >= 3) {
    const actualChapterFolder = actualParts[actualParts.length - 2];
    if (actualChapterFolder !== expectedChapterId) {
      pathIssues.push({
        file: path.relative(PAGES_ROOT, file),
        issue: `⚠️ 章节文件夹名称不匹配`,
        expectedPath: `${metaArticle.domainId}/${metaArticle.subCategoryId}/${expectedChapterId}/${slug}.tsx`
      });
    }
  }
}

if (pathIssues.length === 0) {
  console.log('✅ 未发现路径问题\n');
} else {
  pathIssues.forEach(issue => {
    console.log(`文件: ${issue.file}`);
    console.log(`问题: ${issue.issue}`);
    if (issue.expectedPath) {
      console.log(`期望路径: ${issue.expectedPath}`);
    }
    console.log('---');
  });
  console.log('\n');
}

// 4. 检查缺失的页面
console.log('=== 2. 元数据中存在但 pages 中缺失的页面 ===\n');
const missingPages: Array<{ slug: string; title: string; chapterId: string; domainId: string; subCategoryId: string }> = [];

for (const [slug, meta] of metaArticles) {
  // 检查是否存在对应的文件
  const possiblePaths = [
    path.join(PAGES_ROOT, meta.domainId, meta.subCategoryId, meta.chapterId, `${slug}.tsx`),
  ];
  
  const exists = possiblePaths.some(p => fs.existsSync(p));
  
  if (!exists) {
    missingPages.push(meta);
  }
}

if (missingPages.length === 0) {
  console.log('✅ 所有元数据定义的页面都已实现\n');
} else {
  console.log(`共缺失 ${missingPages.length} 个页面:\n`);
  console.log('| Slug | 标题 | 章节ID | 领域 | 子类别 |');
  console.log('|------|------|--------|------|--------|');
  missingPages.forEach(page => {
    console.log(`| ${page.slug} | ${page.title.replace(/\|/g, '\\|')} | ${page.chapterId} | ${page.domainId} | ${page.subCategoryId} |`);
  });
  console.log('\n');
}

// 5. 统计信息
console.log('=== 统计信息 ===\n');
console.log(`总页面文件数: ${existingFiles.length}`);
console.log(`元数据定义文章数: ${metaArticles.size}`);
console.log(`已实现页面数: ${metaArticles.size - missingPages.length}`);
console.log(`缺失页面数: ${missingPages.length}`);
console.log(`路径问题数: ${pathIssues.length}`);
console.log(`实现率: ${((metaArticles.size - missingPages.length) / metaArticles.size * 100).toFixed(2)}%`);
