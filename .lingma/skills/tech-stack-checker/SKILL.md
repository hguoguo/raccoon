---
name: tech-stack-checker
description: 扫描 chapters.ts 和 create-knowledge-points-todo.md，检查技术栈是否已存在。如果不存在，自动添加到待办清单中。当用户提供技术栈列表、JD要求、或询问某个技术是否已覆盖时使用。
---

# 技术栈检查与补充

## 工作流程

当用户提供技术栈列表时，按以下步骤执行：

### 步骤 1：解析输入

从用户输入中提取所有技术关键词，例如：
- Python
- 大模型（LLM）底层原理
- Prompt工程
- Function Calling
- LangChain
- LlamaIndex
- 向量数据库
- 微服务
- API插件开发
- Multi-Agent多智能体协作
- 大模型轻量化部署与量化推理

### 步骤 2：扫描现有配置

#### 2.1 检查 `chapters.ts`

读取 `/Users/liujianhua/IdeaProjects/raccoon-edu/site/src/data/chapters.ts`，在以下位置搜索技术关键词：

**搜索范围：**
- `domains[].subCategories[].chapters[].articles[]` 中的：
  - `slug` 字段
  - `title` 字段
  - `meta.tags` 数组
  - `meta.description`（如果有）

**匹配规则：**
- 精确匹配 slug（如 `langchain-basics` 匹配 "LangChain"）
- 模糊匹配 title 和 tags（如 "向量数据库" 匹配 `vector-database`）
- 同义词映射（见下方映射表）

#### 2.2 检查 `create-knowledge-points-todo.md`

读取 `/Users/liujianhua/IdeaProjects/raccoon-edu/docs/plans/create-knowledge-points-todo.md`，检查：
- 所有章节标题下的待办项
- 已标记为 `[x]` 的已完成项
- 未标记的 `[ ]` 待创建项

**注意：** 如果技术在 todo.md 中但标记为 `[x]`，视为已存在。

### 步骤 3：技术同义词映射

使用以下映射表进行智能匹配：

```
Python → python-basics, python-async, fastapi
LLM/大模型 → llm-basics
Prompt工程 → prompt-engineering
Function Calling → function-calling
LangChain → langchain-basics, langchain-advanced, langgraph-core
LlamaIndex → llamaindex-framework (可能缺失)
向量数据库 → vector-database
微服务 → spring-cloud-core, api-gateway, distributed-transaction
API插件 → api-plugin-development (可能缺失)
Multi-Agent → multi-agent-systems, agent-architecture
量化部署 → llm-quantization-deployment (可能缺失)
Redis → redis-cache (可能缺失)
模型微调 → model-finetuning (可能缺失)
金丝雀发布 → canary-deployment (可能缺失)
监控告警 → observability-monitoring (可能缺失)
```

### 步骤 4：分类结果

将技术栈分为三类：

**✅ 已覆盖**
- 在 `chapters.ts` 中存在对应的 article
- 或在 todo.md 中标记为 `[x]`

**📋 待创建**
- 在 todo.md 中存在但标记为 `[ ]`

**❌ 缺失**
- 在两个文件中都不存在

### 步骤 5：生成报告

输出格式化的检查结果：

```markdown
## 📊 技术栈覆盖情况

### ✅ 已覆盖（X/Y）
1. **技术名称** - 对应章节/文章
   - 位置：`chapters.ts` 第 N 行
   - Slug: `xxx-yyy`

### 📋 待创建（X/Y）
1. **技术名称** (`slug-name`)
   - 位置：todo.md 第 N 章

### ❌ 缺失（X/Y）
1. **技术名称** - 需要新增
```

### 步骤 6：补充缺失项（如需要）

如果用户确认要添加缺失的技术栈，执行以下操作：

#### 6.1 确定归属章节

根据技术类型选择合适章节：

| 技术类型 | 推荐章节 | 示例 |
|---------|---------|------|
| Java核心 | `01-java-core` | 反射、注解 |
| Spring框架 | `06-spring-framework` | Spring Boot、AOP |
| 数据库 | `07-database` | Redis、MySQL优化 |
| 微服务 | `08-microservices` | 网关、限流 |
| AI理论 | `06-ai-theory` | Prompt、Function Calling |
| AI框架 | `07-ai-frameworks` | LangChain、LlamaIndex |
| AI应用 | `08-ai-applications` | RAG、Agent |
| 工程化 | `11-build-tools` | CI/CD、Docker |
| 安全 | `12-java-security` | 加密、OWASP |

#### 6.2 生成元数据

为新知识点生成标准元数据：

```typescript
{
  slug: 'tech-name',
  title: '技术名称（可选标注🔥）',
  meta: {
    id: 'tech-name',
    title: '技术名称',
    level: 'Senior' | 'Expert', // 根据难度
    tags: ['技术名', '相关概念1', '相关概念2'],
    difficulty: 3-5, // 1-5级
    category: 'chapter-id',
    prerequisites: ['前置知识slug'],
    relatedPatterns: ['相关知识slug'],
    readingTime: 45-60 // 分钟
  }
}
```

#### 6.3 更新 todo.md

在对应章节下添加新条目：

```markdown
### X. 章节名称
- [ ] 技术名称（JD要求🔥）(`slug-name`)
```

**优先级标注规则：**
- JD明确要求 → 标注 `（JD要求🔥）`
- 前沿技术/差异化竞争 → 标注 `（新增章节🔥）`
- 普通补充 → 不标注

#### 6.4 建议下一步

提供创建页面的建议：

```
💡 建议操作：
1. 使用 create-knowledge-page skill 创建页面
2. 优先创建标记为 🔥 的高优先级知识点
3. 按照章节顺序逐步完成
```

## 示例用法

### 示例 1：检查单个技术

**用户输入：** "检查一下 Redis 是否在课程体系中"

**执行流程：**
1. 搜索 `chapters.ts` → 未找到 `redis` 相关 slug
2. 搜索 `todo.md` → 发现 `- [ ] Redis缓存实战（JD要求🔥）(redis-cache)`
3. 返回：📋 待创建状态

### 示例 2：批量检查技术栈

**用户输入：** 
```
检查这些技术：
- LlamaIndex
- 模型量化
- 金丝雀发布
```

**执行流程：**
1. 逐个检查三个技术
2. 发现都缺失
3. 归类到对应章节
4. 批量添加到 todo.md

### 示例 3：从JD提取并补充

**用户输入：** "这是JD要求的技术栈，帮我检查并补充..."

**执行流程：**
1. 解析JD中的所有技术关键词
2. 批量检查覆盖情况
3. 将缺失项按类别分组
4. 添加到合适的章节
5. 生成优先级建议

## 注意事项

1. **避免重复添加**
   - 添加前再次确认是否已存在
   - 检查同义词和变体拼写

2. **保持命名一致性**
   - slug 使用 kebab-case（小写+连字符）
   - title 使用中文，简洁明了
   - 遵循现有命名风格

3. **合理设置难度**
   - Junior: 基础概念、入门知识
   - Senior: 进阶应用、最佳实践
   - Expert: 源码分析、架构设计

4. **维护前置关系**
   - 确保 prerequisites 中的知识点已存在
   - relatedPatterns 指向相关知识形成网络

5. **优先处理JD要求**
   - JD明确提到的技术标注 🔥
   - 建议用户优先创建高优先级内容

## 相关文件

- 章节配置：`/site/src/data/chapters.ts`
- 待办清单：`/docs/plans/create-knowledge-points-todo.md`
- 页面模板：参考 `.lingma/skills/create-knowledge-page/references/page-template.md`
