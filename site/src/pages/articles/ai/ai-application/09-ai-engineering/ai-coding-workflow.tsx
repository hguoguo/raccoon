import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、AI Coding 工具全景', level: 2 },
  { id: 'cursor', text: '二、Cursor AI 编辑器', level: 2 },
  { id: 'copilot', text: '三、GitHub Copilot', level: 2 },
  { id: 'claude-code', text: '四、Claude Code', level: 2 },
  { id: 'workflow', text: '五、AI 辅助开发工作流', level: 2 },
  { id: 'code-review', text: '六、AI 代码审查', level: 2 },
  { id: 'testing', text: '七、自动化测试生成', level: 2 },
  { id: 'best-practices', text: '八、最佳实践与陷阱', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function AiCodingWorkflow({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              AI Coding 是利用<strong className="text-accent">大语言模型辅助软件开发</strong>的实践范式，通过智能代码补全、自动生成、错误检测和重构建议，将开发者从重复性编码工作中解放，聚焦于架构设计和业务逻辑，提升开发效率 30-50%。
            </p>
          </blockquote>

          <Callout type="tip" title="AI Coding 的价值">
            根据 GitHub 研究，使用 Copilot 的开发者完成任务速度提升 55%，满意度提升 60%。AI 不是替代程序员，而是成为"结对编程伙伴"，处理样板代码、文档编写和常规调试，让开发者专注于创造性问题解决。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、AI Coding 工具全景
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            AI Coding 工具从简单的代码补全发展到完整的项目级助手，形成多层次的工具生态。
          </p>

          <DiagramBlock title="AI Coding 工具演进">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
第一代：代码补全 (2021-)
┌─────────────────────────────────────┐
│ GitHub Copilot                      │
│ - 行/函数级别补全                    │
│ - 基于上下文的预测                   │
│ - IDE 插件集成                       │
└─────────────────────────────────────┘

第二代：对话式助手 (2023-)
┌─────────────────────────────────────┐
│ ChatGPT + Code Interpreter          │
│ Claude + Artifacts                  │
│ - 自然语言交互                       │
│ - 代码解释与调试                     │
│ - 多轮迭代优化                       │
└─────────────────────────────────────┘

第三代：AI 原生编辑器 (2024-)
┌─────────────────────────────────────┐
│ Cursor / Claude Code                │
│ - 项目级上下文理解                   │
│ - 多文件协同编辑                     │
│ - 自主任务执行                       │
│ - Git 集成                           │
└─────────────────────────────────────┘

未来：自主 Agent (2025+)
┌─────────────────────────────────────┐
│ Devin / OpenDevin                   │
│ - 端到端任务完成                     │
│ - 自主规划与执行                     │
│ - 自我修复与优化                     │
└─────────────────────────────────────┘`}</pre>
          </DiagramBlock>

          <SideNote label="工具选择原则">
            <ul className="list-disc list-inside space-y-1 text-[13px]">
              <li><strong>日常编码</strong>：GitHub Copilot（成熟稳定）</li>
              <li><strong>复杂项目</strong>：Cursor（上下文理解强）</li>
              <li><strong>快速原型</strong>：Claude Code（生成速度快）</li>
              <li><strong>企业场景</strong>：自建模型 + 私有化部署</li>
            </ul>
          </SideNote>

          <h2 id="cursor" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Cursor AI 编辑器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Cursor 是基于 VS Code  fork 的 AI 原生编辑器，核心优势是<strong>深度集成项目上下文</strong>，能够理解整个代码库的结构和依赖关系，实现跨文件的智能编辑。
          </p>

          <Playground
            code={`# Cursor 核心功能演示

# 1. Composer 模式：多文件协同编辑
# 在对话框输入：
"创建一个用户认证系统，包括：
- models/user.py: User 模型
- routes/auth.py: 登录/注册路由
- middleware/auth.py: JWT 验证中间件
- tests/test_auth.py: 单元测试"

# Cursor 会自动生成所有文件并建立正确的导入关系

# 2. Chat 模式：代码解释与修改
# 选中代码后按 Cmd+K，输入：
"这段代码有什么性能问题？如何优化？"

# Cursor 会分析代码并给出具体建议：
"""
问题分析：
1. N+1 查询问题：循环中执行数据库查询
2. 缺少缓存：重复计算相同结果
3. 同步 I/O：阻塞主线程

优化建议：
- 使用 eager loading 减少查询次数
- 添加 Redis 缓存层
- 改为异步处理
"""

# 3. Tab 自动补全：上下文感知
# 输入函数名时，Cursor 会根据：
# - 当前文件的其他函数
# - 导入的模块
# - 项目中的相似代码
# 提供智能补全建议

# 4. @ 符号引用：精准上下文
# 在对话中使用：
"@user.py 这个模型的字段设计合理吗？"
"@package.json 需要添加哪些依赖？"
"@README.md 帮我更新 API 文档"

# Cursor 会读取指定文件内容并针对性回答`}
            language="python"
            highlights={[5, 17, 26, 40, 47]}
            filename="cursor_features.py"
            description="Cursor 核心功能示例"
          />

          <Callout type="info" title="Cursor vs VS Code + Copilot">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border p-2 text-left">特性</th>
                  <th className="border border-border p-2 text-left">Cursor</th>
                  <th className="border border-border p-2 text-left">VS Code + Copilot</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">项目级上下文</td>
                  <td className="border border-border p-2"><strong>✓ 内置支持</strong></td>
                  <td className="border border-border p-2">✗ 需手动配置</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">多文件编辑</td>
                  <td className="border border-border p-2"><strong>✓ Composer 模式</strong></td>
                  <td className="border border-border p-2">✗ 单文件限制</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">代码库搜索</td>
                  <td className="border border-border p-2"><strong>✓ 语义搜索</strong></td>
                  <td className="border border-border p-2">△ 基础搜索</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">自定义规则</td>
                  <td className="border border-border p-2"><strong>✓ .cursorrules</strong></td>
                  <td className="border border-border p-2">✗ 不支持</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">价格</td>
                  <td className="border border-border p-2">$20/月</td>
                  <td className="border border-border p-2">$10/月</td>
                </tr>
              </tbody>
            </table>
          </Callout>

          <h2 id="copilot" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、GitHub Copilot
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            GitHub Copilot 是最成熟的 AI 编程助手，由 OpenAI Codex 驱动，集成到主流 IDE 中，提供实时代码补全和聊天功能。
          </p>

          <Playground
            code={`// GitHub Copilot 使用技巧

// 1. 注释驱动的生成
// 在代码上方写清晰注释，Copilot 会生成对应实现

/**
 * 计算两个日期之间的工作日天数（排除周末）
 * @param startDate - 开始日期
 * @param endDate - 结束日期
 * @returns 工作日数量
 */
function countWorkdays(startDate: Date, endDate: Date): number {
  // Copilot 会自动生成类似下面的代码：
  let count = 0;
  const current = new Date(startDate);
  
  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
}

// 2. 示例引导
// 提供输入输出示例，Copilot 推断逻辑

// 示例：
// formatCurrency(1234.5) => "$1,234.50"
// formatCurrency(0) => "$0.00"
// formatCurrency(-50) => "-$50.00"
function formatCurrency(amount: number): string {
  // Copilot 生成格式化逻辑
  const sign = amount {'<'} 0 ? '-' : '';
  const absAmount = Math.abs(amount).toFixed(2);
  const [dollars, cents] = absAmount.split('.');
  const formattedDollars = parseInt(dollars).toLocaleString('en-US');
  return sign + '$' + formattedDollars + '.' + cents;
}

// 3. 测试生成
// 写完函数后，让 Copilot 生成测试用例

// 在 test 文件中输入：
describe{'('}'countWorkdays{'}', {'()'} {'=>'} {'{}'}
  // Copilot 会生成多个测试场景：
  it('should count workdays between two dates', () => {
    const start = new Date('2024-01-01'); // Monday
    const end = new Date('2024-01-07');   // Sunday
    expect(countWorkdays(start, end)).toBe(5);
  });
  
  it('should handle same day', () => {
    const date = new Date('2024-01-01');
    expect(countWorkdays(date, date)).toBe(1);
  });
  
  it('should exclude weekends', () => {
    const start = new Date('2024-01-05'); // Friday
    const end = new Date('2024-01-08');   // Monday
    expect(countWorkdays(start, end)).toBe(2);
  });
});

// 4. 快捷键提效
// Cmd/Ctrl + Enter: 接受建议
// Alt + ]: 查看下一个建议
// Alt + [: 查看上一个建议
// Cmd/Ctrl + I: 打开 inline chat`}
            language="typescript"
            highlights={[10, 31, 42, 54, 70]}
            filename="copilot_tips.ts"
            description="GitHub Copilot 高效用法"
          />

          <SideNote label="Copilot 最佳实践">
            ① 写清晰的函数签名和类型定义；② 使用描述性变量名；③ 分步编写复杂逻辑；④ 定期审查生成的代码；⑤ 结合单元测试验证正确性。Copilot 是助手而非替代品，保持批判性思维。
          </SideNote>

          <h2 id="claude-code" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Claude Code
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Claude Code 是 Anthropic 推出的命令行 AI 编程助手，特色是<strong>强大的长上下文处理能力</strong>（200K tokens），能够理解大型代码库并提供精准的修改建议。
          </p>

          <Playground
            code={`# Claude Code CLI 使用示例

# 1. 安装
npm install -g @anthropic-ai/claude-code

# 2. 初始化项目
cd my-project
claude init

# 3. 交互式会话
claude

# 进入交互模式后可以：

# A. 代码生成
>>> 创建一个 Express.js REST API，包含用户 CRUD 操作

# Claude 会生成：
# - server.js (主入口)
# - routes/users.js (路由)
# - controllers/userController.js (控制器)
# - models/User.js (数据模型)

# B. 代码审查
>>> 审查 src/auth 目录的安全性问题

# Claude 分析后报告：
"""
发现 3 个安全问题：
1. JWT secret 硬编码在代码中 → 应使用环境变量
2. 密码未加盐哈希 → 使用 bcrypt
3. 缺少速率限制 → 添加 express-rate-limit
"""

# C. 重构建议
>>> 如何将这个单体应用拆分为微服务？

# Claude 提供详细方案：
"""
建议拆分策略：
1. 用户服务 (user-service)
   - 负责用户管理、认证
   - 端口: 3001
   
2. 订单服务 (order-service)
   - 负责订单处理
   - 端口: 3002
   
3. API Gateway
   - 统一入口、路由转发
   - 端口: 3000

迁移步骤：
1. 提取共享模型和工具
2. 创建独立服务骨架
3. 逐步迁移业务逻辑
4. 添加服务间通信 (gRPC/RabbitMQ)
5. 部署与监控配置
"""

# D. 文档生成
>>> 为 API 端点生成 OpenAPI 规范

# Claude 生成完整的 swagger.yaml

# 4. 非交互模式（脚本集成）
claude --prompt "检查所有 Python 文件的 PEP8 合规性" > report.txt

# 5. 上下文控制
# 指定包含/排除的文件
claude --include "src/**/*.ts" --exclude "**/*.test.ts"

# 设置最大 token 使用
claude --max-tokens 50000`}
            language="bash"
            highlights={[10, 14, 23, 32, 45, 65, 70, 74]}
            filename="claude_code_usage.sh"
            description="Claude Code CLI 实战"
          />

          <Callout type="warning" title="Claude Code 的局限">
            虽然 Claude Code 上下文能力强，但：① 无法直接修改文件（需手动复制粘贴或配合其他工具）；② 对图形界面不友好（纯命令行）；③ 响应速度较慢（处理大上下文时）。适合代码审查、架构咨询等场景，日常编码推荐 Cursor 或 Copilot。
          </Callout>

          <h2 id="workflow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、AI 辅助开发工作流
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            高效的 AI Coding 不是简单地让 AI 写代码，而是建立<strong>人机协作的标准化流程</strong>，在每个开发阶段最大化 AI 的价值。
          </p>

          <DiagramBlock title="AI 增强开发工作流">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
需求分析阶段
┌──────────────┐     ┌──────────────┐
│ 需求文档      │────▶│ AI 辅助拆解   │
└──────────────┘     └──────────────┘
                          │
                          ▼
                   用户故事 + 验收标准

设计阶段
┌──────────────┐     ┌──────────────┐
│ 技术方案      │────▶│ AI 评审建议   │
└──────────────┘     └──────────────┘
                          │
                          ▼
                 架构图 + API 设计

编码阶段（核心）
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ 伪代码/注释   │────▶│ AI 生成代码   │────▶│ 人工审查调整  │
└──────────────┘     └──────────────┘     └──────────────┘
                          ▲                      │
                          └──── 迭代优化 ◀────────┘

测试阶段
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ 业务逻辑      │────▶│ AI 生成测试   │────▶│ 补充边缘案例  │
└──────────────┘     └──────────────┘     └──────────────┘

Code Review
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ PR 提交       │────▶│ AI 初步审查   │────▶│ 人工最终确认  │
└──────────────┘     └──────────────┘     └──────────────┘

关键原则:
- AI 负责"量"（生成大量候选方案）
- 人负责"质"（判断、选择、优化）
- 保持人在环路 (Human-in-the-loop)`}</pre>
          </DiagramBlock>

          <Playground
            code={`# 实际工作流示例：开发一个用户管理系统

# 第 1 步：需求澄清（与 AI 对话）
"""
我需要开发一个用户管理系统，功能包括：
- 用户注册/登录（邮箱 + 密码）
- JWT 认证
- 用户资料管理（头像、昵称、简介）
- 密码重置

技术栈：Python FastAPI + PostgreSQL + Redis

请帮我设计 API 端点和数据模型。
"""

# AI 返回设计方案后，人工审查并调整

# 第 2 步：生成项目骨架
"""
基于上述设计，创建项目结构：
- app/models/user.py
- app/schemas/user.py
- app/api/users.py
- app/core/security.py
- app/db/database.py
- tests/test_users.py
"""

# AI 生成文件骨架（含类型注解和 docstring）

# 第 3 步：逐个实现功能
# 打开 user.py，写注释：
"""
User 模型，映射到 users 表
字段：id, email, hashed_password, nickname, avatar_url, bio, created_at, updated_at
"""
# AI 生成 SQLAlchemy 模型代码

# 审查代码，修正不合理之处（如索引缺失）

# 第 4 步：实现业务逻辑
# 在 users.py 中写：
"""
POST /users/register
请求体：email, password, nickname
响应：用户信息（不含密码）
验证：邮箱唯一性、密码强度
"""
# AI 生成完整的路由函数

# 第 5 步：生成测试
# 在 test_users.py 中：
"""
测试用户注册：
1. 正常注册成功
2. 邮箱重复失败
3. 密码太弱失败
4. 邮箱格式错误失败
"""
# AI 生成 pytest 测试用例

# 运行测试，修复失败的用例

# 第 6 步：Code Review
# 提交 PR，让 AI 审查：
"""
审查这个 PR 的代码质量、安全性和性能问题
"""
# AI 指出潜在问题（如 SQL 注入风险、N+1 查询）

# 人工修复后合并

# 总耗时对比：
# 传统方式：2-3 天
# AI 辅助：4-6 小时（节省 70%+ 时间）`}
            language="python"
            highlights={[5, 23, 33, 42, 52, 62, 70, 80]}
            filename="ai_workflow_example.py"
            description="AI 辅助开发完整流程"
          />

          <h2 id="code-review" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、AI 代码审查
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            AI 代码审查可以自动化检测常见问题，作为人工 Code Review 的前置过滤层，提升审查效率和覆盖率。
          </p>

          <Playground
            code={`# AI 代码审查实践

# 1. 安全性审查
# 提交代码片段给 AI：
"""
审查以下代码的安全漏洞：

@app.route('/search')
def search():
    query = request.args.get('q')
    results = db.execute(f"SELECT * FROM products WHERE name LIKE '%{query}%'")
    return jsonify(results)
"""

# AI 反馈：
"""
🚨 严重：SQL 注入漏洞
- 问题：直接拼接用户输入到 SQL 语句
- 修复：使用参数化查询
  results = db.execute(
      "SELECT * FROM products WHERE name LIKE %s",
      (f"%{query}%",)
  )

⚠️ 警告：缺少输入验证
- 建议：限制查询长度、过滤特殊字符
"""

# 2. 性能审查
"""
审查这段代码的性能问题：

def get_user_orders(user_ids: List[int]):
    orders = []
    for user_id in user_ids:
        user = User.query.get(user_id)
        orders.extend(user.orders)
    return orders
"""

# AI 反馈：
"""
🚨 严重：N+1 查询问题
- 问题：循环中执行数据库查询，user_ids=100 时执行 101 次查询
- 修复：使用 eager loading
  users = User.query.options(joinedload(User.orders)).filter(
      User.id.in_(user_ids)
  ).all()
  return [order for user in users for order in user.orders]

💡 建议：添加分页限制，避免一次性加载过多数据
"""

# 3. 代码风格审查
"""
检查 Python 代码的 PEP8 合规性和最佳实践
"""

# AI 反馈：
"""
📝 风格问题：
- 第 5 行：变量名 'tmp' 不够描述性，建议改为 'temp_result'
- 第 12 行：函数过长（45 行），建议拆分为多个小函数
- 第 20 行：缺少类型注解，建议添加 -> Dict[str, Any]

✨ 改进建议：
- 使用列表推导式替代 map + lambda
- 添加 docstring 说明函数用途
- 常量 MAGIC_NUMBER 应提取为命名常量
"""

# 4. CI/CD 集成
# 在 GitHub Actions 中添加 AI 审查步骤：
"""
name: AI Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: AI Security Scan
        run: |
          pip install semgrep
          semgrep --config=p/security-audit .
      - name: AI Performance Check
        run: |
          # 自定义脚本调用 AI API 审查关键文件
          python scripts/ai_review.py --diff $\{'{''}{'}'{'}' github.event.pull_request.diff_url $\{'{''}{'}'{'}'
"""

# 5. 人工 + AI 协同审查流程
"""
1. AI 自动扫描 PR，生成初步报告
2. 开发者根据报告修复明显问题
3. 资深工程师进行深度审查（架构、设计模式）
4. AI 再次扫描确认修复效果
5. 合并代码

优势：
- AI 处理机械性问题（风格、简单 bug）
- 人类聚焦创造性问题（设计、可维护性）
- 审查时间减少 50%，遗漏率降低 30%
"""`}
            language="python"
            highlights={[5, 27, 44, 64, 86, 103, 122]}
            filename="ai_code_review.py"
            description="AI 代码审查实战"
          />

          <Callout type="tip" title="AI 审查的最佳时机">
            ① <strong>提交前自检</strong>：本地运行 AI 审查，修复明显问题后再提交；② <strong>PR 自动化</strong>：CI 流水线集成 AI 审查，作为合并前置条件；③ <strong>定期审计</strong>：每周对核心模块进行全面 AI 审查，发现潜在技术债务。
          </Callout>

          <h2 id="testing" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、自动化测试生成
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            AI 可以自动生成单元测试、集成测试和边界案例，显著提升测试覆盖率和质量，减少手动编写测试的时间。
          </p>

          <Playground
            code={`# AI 生成测试用例

# 被测函数
def calculate_discount(price: float, customer_type: str, years_as_customer: int) -> float:
    """
    计算折扣后的价格
    
    Args:
        price: 原价
        customer_type: 客户类型 ('regular', 'premium', 'vip')
        years_as_customer: 成为客户的年数
    
    Returns:
        折扣后价格
    """
    if price < 0:
        raise ValueError("Price cannot be negative")
    
    base_discount = 0
    
    # 客户类型折扣
    if customer_type == 'premium':
        base_discount = 0.1
    elif customer_type == 'vip':
        base_discount = 0.2
    
    # 忠诚度折扣（每年 1%，最多 10%）
    loyalty_discount = min(years_as_customer * 0.01, 0.1)
    
    total_discount = base_discount + loyalty_discount
    final_price = price * (1 - total_discount)
    
    return round(final_price, 2)


# AI 生成的测试套件
import pytest

class TestCalculateDiscount:
    """测试折扣计算函数"""
    
    # 1. 正常场景
    def test_regular_customer_no_loyalty(self):
        """普通客户，无忠诚度折扣"""
        assert calculate_discount(100, 'regular', 0) == 100.0
    
    def test_premium_customer(self):
        """高级客户，10% 折扣"""
        assert calculate_discount(100, 'premium', 0) == 90.0
    
    def test_vip_customer(self):
        """VIP 客户，20% 折扣"""
        assert calculate_discount(100, 'vip', 0) == 80.0
    
    def test_loyalty_discount(self):
        """忠诚度折扣，5 年客户额外 5%"""
        assert calculate_discount(100, 'regular', 5) == 95.0
    
    def test_combined_discounts(self):
        """组合折扣：VIP + 10 年忠诚度"""
        # VIP 20% + 忠诚度 10% = 30% 总折扣
        assert calculate_discount(100, 'vip', 10) == 70.0
    
    # 2. 边界情况
    def test_zero_price(self):
        """价格为零"""
        assert calculate_discount(0, 'vip', 10) == 0.0
    
    def test_max_loyalty_cap(self):
        """忠诚度折扣封顶（超过 10 年仍为 10%）"""
        assert calculate_discount(100, 'regular', 15) == 90.0
        assert calculate_discount(100, 'regular', 100) == 90.0
    
    def test_large_price(self):
        """大额订单"""
        assert calculate_discount(10000, 'vip', 5) == 7500.0
    
    # 3. 异常场景
    def test_negative_price_raises_error(self):
        """负价格抛出异常"""
        with pytest.raises(ValueError, match="Price cannot be negative"):
            calculate_discount(-10, 'regular', 0)
    
    def test_invalid_customer_type(self):
        """无效客户类型（应视为普通客户）"""
        assert calculate_discount(100, 'unknown', 0) == 100.0
    
    # 4. 浮点数精度
    def test_rounding_precision(self):
        """确保结果保留两位小数"""
        result = calculate_discount(99.99, 'premium', 3)
        assert result == 86.99  # 99.99 * (1 - 0.13) = 86.9913 → 86.99
    
    # 5. 属性测试（Property-based Testing）
    from hypothesis import given, strategies as st
    
    @given(
        price=st.floats(min_value=0, max_value=10000),
        years=st.integers(min_value=0, max_value=50)
    )
    def test_discount_never_exceeds_price(self, price, years):
        """折扣后价格不应超过原价"""
        result = calculate_discount(price, 'vip', years)
        assert result <= price
    
    @given(price=st.floats(min_value=0.01, max_value=10000))
    def test_discount_is_non_negative(self, price):
        """折扣后价格应为非负数"""
        result = calculate_discount(price, 'vip', 100)
        assert result >= 0


# AI 还能生成：
# - Mock 对象用于隔离测试
# - 集成测试场景
# - 性能基准测试
# - 模糊测试（Fuzzing）用例

# 测试覆盖率提升：
# 手动编写：60-70% 覆盖率，耗时 2-3 小时
# AI 辅助：85-95% 覆盖率，耗时 30 分钟`}
            language="python"
            highlights={[45, 53, 58, 63, 68, 73, 78, 83, 88, 93, 98, 106]}
            filename="ai_generated_tests.py"
            description="AI 生成的完整测试套件"
          />

          <SideNote label="测试生成技巧">
            ① 提供清晰的函数签名和 docstring；② 明确说明边界条件和异常场景；③ 要求 AI 生成多种测试类型（单元、集成、属性测试）；④ 人工审查测试逻辑的正确性；⑤ 定期运行测试确保有效性。
          </SideNote>

          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、最佳实践与陷阱
          </h2>

          <Callout type="tip" title="✅ 最佳实践">
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>渐进式采用</strong>：从代码补全开始，逐步尝试代码生成、审查、测试</li>
              <li><strong>保持审查</strong>：始终审查 AI 生成的代码，不要盲目信任</li>
              <li><strong>清晰指令</strong>：提供详细的上下文、约束条件和期望输出</li>
              <li><strong>迭代优化</strong>：通过多轮对话 refine 结果，而非期望一次完美</li>
              <li><strong>保护隐私</strong>：避免上传敏感代码到公共 AI 服务，企业场景使用私有化部署</li>
              <li><strong>版本控制</strong>：AI 生成的代码同样需要 Git 管理和 Code Review</li>
              <li><strong>学习而非依赖</strong>：理解 AI 生成的代码逻辑，将其作为学习工具</li>
            </ul>
          </Callout>

          <Callout type="danger" title="❌ 常见陷阱">
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>过度依赖</strong>：完全依赖 AI 导致技能退化，失去独立思考能力</li>
              <li><strong>安全漏洞</strong>：AI 可能生成看似合理但有安全隐患的代码（如硬编码密钥）</li>
              <li><strong>许可证风险</strong>：Copilot 训练数据包含开源代码，可能引发许可证争议</li>
              <li><strong>幻觉代码</strong>：AI 可能编造不存在的 API 或库函数</li>
              <li><strong>性能盲区</strong>：AI 生成的代码功能正确但性能低下（如嵌套循环）</li>
              <li><strong>上下文丢失</strong>：AI 不理解项目的整体架构和设计决策</li>
            </ul>
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1：AI 会取代程序员">
            <p className="mb-2"><strong>错误认知</strong>：认为 AI Coding 工具会让程序员失业。</p>
            <p><strong>正确理解</strong>：AI 目前只能处理模式化的编码任务，缺乏对业务需求的深刻理解、架构设计能力和创造性问题解决能力。历史经验表明，技术进步会改变工作内容而非消灭岗位。AI 会将程序员从重复劳动中解放，使其聚焦于更高价值的设计、创新和复杂问题解决。未来需要的是"AI 增强型开发者"，而非被替代者。</p>
          </Callout>

          <Callout type="danger" title="误区 2：AI 生成的代码无需审查">
            <p className="mb-2"><strong>错误认知</strong>：认为 AI 生成的代码可以直接使用，无需人工审查。</p>
            <p><strong>正确理解</strong>：AI 可能生成存在安全漏洞、性能问题或逻辑错误的代码。多项研究显示，Copilot 生成的代码中约 40% 存在安全缺陷。必须将 AI 生成的代码视为"草稿"，经过严格的人工审查、测试和安全扫描后才能合并。记住：<strong>你对代码质量负最终责任</strong>，而非 AI。</p>
          </Callout>

          <Callout type="danger" title="误区 3：提示词越详细越好">
            <p className="mb-2"><strong>错误认知</strong>：认为提供海量上下文能让 AI 生成更好的代码。</p>
            <p><strong>正确理解</strong>：过长的提示词会导致注意力分散、关键信息被淹没，甚至超出模型的上下文窗口。最佳实践是：<strong>精简而精准</strong>——提供必要的类型定义、接口约束和关键业务逻辑，去除无关细节。使用结构化格式（如 Markdown 列表、代码块）提高可读性。实验表明，200-500 tokens 的精炼提示词效果优于 2000+ tokens 的冗长描述。</p>
          </Callout>

          <Callout type="warning" title="误区 4：所有项目都适合 AI 辅助">
            <p className="mb-2"><strong>错误认知</strong>：认为在任何项目中引入 AI 都能提升效率。</p>
            <p><strong>正确理解</strong>：AI 在以下场景效果有限：① 高度创新的算法研发（无先例可循）；② 严格的合规行业（金融、医疗，需人工全程把控）；③ 遗留系统维护（AI 难以理解复杂的历史包袱）；④ 小型简单项目（引入 AI 的学习成本超过收益）。应根据项目特点评估 ROI，避免为了用 AI 而用 AI。</p>
          </Callout>

          <Callout type="warning" title="误区 5：免费工具足够专业开发">
            <p className="mb-2"><strong>错误认知</strong>：认为免费的 AI 工具（如 ChatGPT 免费版）能满足专业开发需求。</p>
            <p><strong>正确理解</strong>：免费版本通常有诸多限制：① 上下文窗口小（无法理解大型项目）；② 响应速度慢（影响开发流畅度）；③ 无代码专属优化（通用模型不如专用模型）；④ 隐私风险（代码可能被用于训练）。专业团队应投资付费工具（Copilot、Cursor Enterprise），获得更好的性能、隐私保障和技术支持。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "如何在团队中推广 AI Coding 工具？会遇到哪些阻力？如何解决？",
              answer: "推广策略：① 试点先行：选择 2-3 名愿意尝试的开发者作为早期采用者，收集成功案例；② 培训赋能：组织工作坊演示最佳实践，消除恐惧心理；③ 制定规范：建立 AI 代码审查指南、隐私保护政策和使用边界；④ 量化收益：跟踪指标（开发速度、bug 率、满意度），用数据说服管理层。常见阻力：① 老员工抵触（担心技能过时）→ 强调 AI 是增强而非替代；② 安全担忧（代码泄露）→ 采用私有化部署或企业版；③ 质量疑虑 → 展示测试数据和审查流程。关键是营造'AI 增强'而非'AI 替代'的文化。"
            },
            {
              question: "AI 生成的代码出现 Bug，责任归谁？如何规避法律风险？",
              answer: "责任归属：① 开发者负主要责任，因为你是代码的最终审查者和合并者；② 团队负管理责任，需建立 AI 代码审查流程；③ AI 提供商通常免责（服务协议中明确）。法律风险规避：① 审查许可证：确保 AI 训练数据来源合法，避免 GPL 等传染性许可证污染；② 知识产权：明确 AI 生成代码的所有权（通常归使用者）；③ 保密协议：不在公共 AI 工具中输入商业机密；④ 保险：考虑技术错误与遗漏保险（E&O Insurance）。最佳实践：将 AI 视为'初级开发者'，其产出需经'高级工程师'审查。"
            },
            {
              question: "比较 Cursor、GitHub Copilot 和 Claude Code 的适用场景和选型策略。",
              answer: "选型矩阵：① Cursor：适合中大型项目，需要深度上下文理解和多文件协同编辑，价格 $20/月，推荐全栈开发者使用；② GitHub Copilot：适合日常编码辅助，IDE 集成度高，生态系统完善，价格 $10/月，推荐团队成员普及使用；③ Claude Code：适合代码审查、架构咨询和文档生成，长上下文能力强（200K tokens），但无法直接编辑文件，推荐 Tech Lead 和架构师使用。混合策略：团队标配 Copilot（性价比最高），Tech Lead 额外配备 Cursor + Claude Code 处理复杂任务。企业场景优先考虑数据隐私和合规性，选择支持私有化部署的方案。"
            },
            {
              question: "AI 辅助开发如何保证代码质量和安全性？",
              answer: "质量保障体系：① 自动化测试：要求 AI 生成单元测试，覆盖率目标 {'>'}85%；② 静态分析：集成 SonarQube、ESLint 等工具检测代码异味；③ 安全扫描：使用 Snyk、Semgrep 检测漏洞和敏感信息泄露；④ 人工审查：资深工程师审查 AI 生成的关键代码（核心算法、安全相关、性能敏感）；⑤ 持续监控：生产环境监控异常行为和性能退化。安全红线：① 禁止 AI 生成加密密钥、密码等敏感信息；② 禁止直接使用 AI 提供的第三方库（需验证真实性）；③ 禁止在未审查的情况下合并 AI 代码。建立'AI 代码审查清单'，强制逐项检查。"
            },
            {
              question: "AI Coding 对软件开发生命周期（SDLC）各阶段的影响是什么？",
              answer: "各阶段影响：① 需求分析：AI 辅助拆解用户故事、识别模糊需求，缩短 20% 时间；② 设计：AI 生成架构图、API 设计草案，但最终决策仍需人类；③ 编码：效率提升 30-50%，但需增加审查时间；④ 测试：AI 自动生成测试用例，覆盖率提升 15-25%，测试编写时间减少 60%；⑤ 部署：AI 辅助编写 CI/CD 脚本、Dockerfile，减少配置错误；⑥ 运维：AI 分析日志、诊断问题，MTTR（平均修复时间）降低 40%。总体趋势：编码阶段时间占比下降，设计和审查阶段占比上升，开发者角色从'编码者'转向'架构师 + 审查者'。"
            },
            {
              question: "如何评估 AI Coding 工具的 ROI（投资回报率）？",
              answer: "ROI 评估框架：① 效率指标：代码行数/小时、任务完成时间、PR 合并周期（预期改善 30-50%）；② 质量指标：Bug 率、代码审查通过率、测试覆盖率（应保持或提升）；③ 满意度指标：开发者 NPS、工具使用频率、自愿续费率；④ 成本指标：工具订阅费、培训成本、潜在的返工成本。计算公式：ROI = (节省的人力成本 - 工具成本) / 工具成本 × 100%。示例：10 人团队，每人月薪 30K，AI 提升效率 30%，相当于节省 3 人成本（90K/月），工具成本 200$/月（≈1400 RMB），ROI = (90000 - 1400) / 1400 × 100% ≈ 6328%。注意：初期 1-2 个月可能有学习曲线导致效率暂时下降，应看长期趋势。"
            },
            {
              question: "AI 辅助开发的伦理问题有哪些？如何应对？",
              answer: "伦理挑战：① 偏见传递：AI 训练数据中的偏见（如性别、种族刻板印象）可能反映在代码注释或变量命名中 → 应对：多样化训练数据、人工审查敏感内容；② 知识产权：AI 生成的代码是否侵犯开源许可证 → 应对：使用明确授权的训练数据、法律咨询、代码相似度检测；③ 就业影响：AI 可能导致初级开发者岗位减少 → 应对：重新定义岗位职责，强调创意和问题解决能力，提供转岗培训；④ 透明度：是否应披露代码由 AI 生成 → 应对：建立标注规范，在 commit message 或注释中标明 AI 参与度；⑤ 责任归属：AI 错误导致的损失由谁承担 → 应对：明确人类最终责任，购买职业责任保险。核心原则：AI 是工具，人类保持道德和法律上的主体地位。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/08-python/python-async" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">Python 异步编程</div>
              <div className="text-[12px] text-ink-muted mt-1">现代 Python 开发基础</div>
            </a>
            <a href="/docs/09-ai-engineering/observability-monitoring" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">全链路监控告警</div>
              <div className="text-[12px] text-ink-muted mt-1">AI 生成代码的质量监控</div>
            </a>
            <a href="/docs/06-ai-fundamentals/cursor-ai-editor" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">工具深入 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">Cursor AI 编辑器详解</div>
              <div className="text-[12px] text-ink-muted mt-1">高级功能与定制</div>
            </a>
            <a href="/docs/06-ai-fundamentals/github-copilot" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">工具深入 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">GitHub Copilot 进阶</div>
              <div className="text-[12px] text-ink-muted mt-1">企业级配置与优化</div>
            </a>
          </div>

          <Callout type="info" title="学习路径建议">
            初学者建议：① 从 GitHub Copilot 开始（成本低、易上手）；② 掌握提示词工程技巧（清晰、结构化、迭代）；③ 尝试 Cursor 处理复杂项目；④ 学习 AI 代码审查方法；⑤ 探索自动化测试生成。进阶方向：自建 AI 编程助手（Fine-tune 专属模型）、AI Agent 工作流编排、企业级 AI 开发平台建设。记住：AI 是杠杆，放大你的能力，但不能替代基础功。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
