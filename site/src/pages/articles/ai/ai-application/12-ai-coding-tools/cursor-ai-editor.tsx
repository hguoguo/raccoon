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
  { id: 'overview', text: '一、Cursor 概述', level: 2 },
  { id: 'chat', text: '二、Chat 对话模式', level: 2 },
  { id: 'composer', text: '三、Composer 多文件编辑', level: 2 },
  { id: 'autocomplete', text: '四、智能代码补全', level: 2 },
  { id: 'shortcuts', text: '五、核心快捷键', level: 2 },
  { id: 'best-practices', text: '六、最佳实践', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function CursorAiEditor({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Cursor 是一款<strong className="text-accent">AI 原生代码编辑器</strong>，基于 VSCode 构建，深度集成大模型能力，提供 Chat 对话、Composer 多文件编辑、智能代码补全等功能，
              显著提升开发效率，代表下一代编程工具的发展方向。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么选择 Cursor？">
            相比传统 IDE + AI 插件的模式，Cursor 从底层重构了编辑器架构，实现 AI 与编辑器的无缝融合，支持上下文感知、多文件协同编辑和自然语言编程。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Cursor 概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Cursor 由前 OpenAI 工程师创立，2023 年发布后迅速获得开发者社区认可。它基于 VSCode 开源版本（Code - OSS）构建，兼容所有 VSCode 扩展，同时提供原生的 AI 功能。
          </p>

          <DiagramBlock title="Cursor 核心功能架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────┐
│              Cursor Editor                   │
├──────────┬──────────┬───────────┬───────────┤
│   Chat   │ Composer │ AutoComp  │  Codebase │
│  对话    │ 多文件编辑│ 智能补全  │  索引     │
├──────────┴──────────┴───────────┴───────────┤
│         LLM Integration Layer                │
│    (GPT-4 / Claude / Custom Models)         │
└─────────────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="技术栈">
            Cursor 使用 Electron + TypeScript 构建，前端基于 Monaco Editor（VSCode 的编辑器内核），后端通过 LSP（Language Server Protocol）提供语言服务。
          </SideNote>

          <h2 id="chat" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Chat 对话模式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Chat 是 Cursor 的基础交互模式，类似在 IDE 中嵌入一个智能助手，可以回答代码问题、生成代码片段、解释错误信息等。
          </p>

          <Playground
            code={`# Chat 使用场景示例

# 1. 代码解释
问：请解释这段代码的作用
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

答：这是一个快速排序算法的实现...

# 2. Bug 修复
问：这段代码为什么报错？
result = requests.get(url)
print(result.json())

答：可能缺少 import requests，或者网络请求超时...

# 3. 代码生成
问：帮我写一个 Python 装饰器，用于记录函数执行时间

答：
import time
from functools import wraps

def timer_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} executed in {end - start:.4f}s")
        return result
    return wrapper`}
            language="python"
            highlights={[5, 17, 25]}
            filename="chat-examples.py"
            description="Chat 对话模式典型场景"
          />

          <Callout type="warning" title="Chat 模式的局限">
            Chat 适合问答和简单代码生成，但无法直接修改项目文件。对于需要跨文件修改的任务，应使用 Composer 模式。
          </Callout>

          <h2 id="composer" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Composer 多文件编辑
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Composer 是 Cursor 的核心创新功能，允许通过自然语言描述任务，AI 自动分析代码库并修改多个文件，实现真正的"自然语言编程"。
          </p>

          <Playground
            code={`# Composer 使用示例

# 用户输入（自然语言）：
"为项目添加用户认证功能，包括登录、注册接口，使用 JWT token"

# Cursor 自动执行的操作：
# 1. 分析现有项目结构
# 2. 创建 auth/routes.py - 路由定义
# 3. 创建 auth/schemas.py - Pydantic 模型
# 4. 创建 auth/services.py - 业务逻辑
# 5. 修改 main.py - 注册路由
# 6. 更新 requirements.txt - 添加依赖

# 生成的代码文件：

# auth/routes.py
from fastapi import APIRouter, Depends, HTTPException
from .services import AuthService
from .schemas import LoginRequest, RegisterRequest

router = APIRouter(prefix="/auth", tags=["authentication"])
auth_service = AuthService()

@router.post("/login")
def login(request: LoginRequest):
    user = auth_service.authenticate(request.username, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth_service.create_token(user)
    return {"access_token": token, "token_type": "bearer"}

@router.post("/register")
def register(request: RegisterRequest):
    user = auth_service.create_user(request)
    token = auth_service.create_token(user)
    return {"access_token": token, "token_type": "bearer"}`}
            language="python"
            highlights={[14, 20, 26, 32, 38]}
            filename="composer-example.py"
            description="Composer 多文件编辑示例"
          />

          <DiagramBlock title="Composer 工作流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
用户输入需求
    │
    ▼
┌──────────────┐
│ 代码库索引    │ ◄── 扫描所有相关文件
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 任务规划      │ ◄── 拆解为子任务
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 多文件编辑    │ ◄── 并行修改多个文件
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 用户审查      │ ◄── 接受/拒绝更改
└──────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="上下文窗口">
            Composer 会自动读取相关文件作为上下文，但受限于 LLM 的 token 限制。对于大型项目，建议先用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">@符号</code> 指定关键文件。
          </SideNote>

          <h2 id="autocomplete" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、智能代码补全
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Cursor 的智能补全超越传统的基于语法的补全，能够理解代码语义、项目上下文和开发者意图，提供更精准的预测。
          </p>

          <Playground
            code={`# 智能补全示例

# 场景 1：根据注释生成代码
# TODO: 实现一个二分查找算法
def binary_search(arr: list[int], target: int) -> int:
    # Cursor 自动补全完整实现
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# 场景 2：根据函数名推断实现
def calculate_fibonacci(n: int) -> int:
    # 自动补全递归实现
    if n <= 1:
        return n
    return calculate_fibonacci(n - 1) + calculate_fibonacci(n - 2)

# 场景 3：API 调用模板
import requests

def fetch_user_data(user_id: int) -> dict:
    response = requests.get(
        f"https://api.example.com/users/{user_id}",
        headers={"Authorization": "Bearer YOUR_TOKEN"}
    )
    response.raise_for_status()
    return response.json()`}
            language="python"
            highlights={[5, 17, 26]}
            filename="autocomplete-examples.py"
            description="智能代码补全示例"
          />

          <Callout type="info" title="补全触发方式">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-ink">Tab 键</strong>：接受整行补全</li>
              <li><strong className="text-ink">Ctrl/Cmd + K</strong>：接受整个建议</li>
              <li><strong className="text-ink">Esc</strong>：拒绝当前建议</li>
              <li><strong className="text-ink">Alt/Opt + ]</strong>：查看下一个建议</li>
            </ul>
          </Callout>

          <h2 id="shortcuts" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、核心快捷键
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            掌握快捷键能大幅提升 Cursor 的使用效率。以下是高频操作的快捷键汇总（macOS / Windows）。
          </p>

          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-parchment-deep border-b border-border">
                <th className="text-left py-2 px-3 text-[13px] font-semibold text-ink">功能</th>
                <th className="text-left py-2 px-3 text-[13px] font-semibold text-ink">macOS</th>
                <th className="text-left py-2 px-3 text-[13px] font-semibold text-ink">Windows/Linux</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 text-[13px] text-ink-muted">打开 Chat</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Cmd + L</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Ctrl + L</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 text-[13px] text-ink-muted">打开 Composer</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Cmd + I</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Ctrl + I</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 text-[13px] text-ink-muted">生成代码</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Cmd + K</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Ctrl + K</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 text-[13px] text-ink-muted">接受补全</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Tab</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Tab</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 text-[13px] text-ink-muted">快速修复</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Cmd + .</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Ctrl + .</td>
              </tr>
            </tbody>
          </table>

          <SideNote label="自定义快捷键">
            可以在 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">Settings → Keyboard Shortcuts</code> 中自定义所有快捷键，支持与 VSCode 配置同步。
          </SideNote>

          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、最佳实践
          </h2>
          
          <h3 id="context-management" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1. 上下文管理
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            在使用 Chat 或 Composer 时，合理控制上下文范围能提升 AI 响应的准确性：
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted ml-2">
            <li>使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">@filename</code> 引用特定文件</li>
            <li>选中代码块后再提问，自动包含选中内容</li>
            <li>对于复杂任务，先描述整体架构再细化实现细节</li>
          </ul>

          <h3 id="iterative-development" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2. 迭代式开发
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            不要期望一次生成完美代码，采用小步迭代的方式：
          </p>
          <ol className="list-decimal list-inside space-y-2 mb-4 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted ml-2">
            <li>先生成基础框架</li>
            <li>逐步添加功能和边界处理</li>
            <li>让 AI 帮你优化性能和可读性</li>
            <li>最后补充文档和测试用例</li>
          </ol>

          <h3 id="code-review" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3. 代码审查
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            AI 生成的代码可能存在隐蔽问题，务必进行人工审查：
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted ml-2">
            <li>检查边界条件和异常处理</li>
            <li>验证算法复杂度是否符合预期</li>
            <li>确认没有引入安全漏洞（如 SQL 注入、XSS）</li>
            <li>运行单元测试确保功能正确</li>
          </ul>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <div className="space-y-4 mb-6">
            <Callout type="danger" title="误区 1：完全依赖 AI 编程">
              AI 是辅助工具而非替代品。过度依赖会导致对代码理解不足，遇到 AI 无法解决的问题时束手无策。应保持主动思考，将 AI 作为"结对编程伙伴"而非"代笔者"。
            </Callout>

            <Callout type="danger" title="误区 2：忽视代码审查">
              AI 生成的代码可能看似正确但存在性能问题、安全隐患或逻辑缺陷。必须像审查人类同事的代码一样严格审查 AI 生成的代码。
            </Callout>

            <Callout type="danger" title="误区 3：一次性生成复杂系统">
              试图用一条指令让 AI 生成完整的微服务架构往往会失败。应该分解任务，逐步构建，每步都验证结果。
            </Callout>
          </div>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "Cursor 与传统 IDE + AI 插件（如 GitHub Copilot）的区别是什么？",
                answer: "Cursor 是 AI 原生编辑器，从底层架构就围绕 AI 能力设计，支持深度上下文理解、多文件协同编辑和自然语言编程。而传统 IDE + 插件是事后集成，受限于 IDE 的扩展 API，功能相对孤立，无法实现真正的 AI 与编辑器的深度融合。"
              },
              {
                question: "Composer 模式的工作原理是什么？如何处理大型项目的上下文限制？",
                answer: "Composer 首先通过代码索引建立项目图谱，然后根据用户需求检索相关文件，使用向量相似度匹配筛选最相关的代码片段。对于大型项目，采用分层策略：先分析高层架构，再聚焦具体模块，必要时让用户手动指定关键文件（@符号）。还会使用摘要技术压缩长文件，只保留关键接口和类型定义。"
              },
              {
                question: "如何评估 AI 编程工具的效率提升？有哪些量化指标？",
                answer: "可以从以下维度衡量：1) 代码行数/小时（生产力）；2) Bug 率变化（质量）；3) 重复性任务耗时减少比例；4) 新功能开发周期缩短程度；5) 代码审查通过率。研究表明，合理使用 AI 工具可提升 30-50% 的开发效率，但需要结合具体场景分析。"
              },
              {
                question: "AI 生成的代码可能存在哪些安全风险？如何防范？",
                answer: "主要风险包括：1) 引入已知漏洞的依赖包；2) 硬编码敏感信息（密钥、密码）；3) 未正确处理用户输入导致注入攻击；4) 使用不安全的加密算法。防范措施：使用 SAST 工具静态扫描、依赖漏洞检测、人工安全审查、遵循 OWASP 最佳实践。"
              },
              {
                question: "在团队协作中，如何规范 AI 工具的使用？",
                answer: "建议制定团队规范：1) 明确 AI 生成代码的标识要求（如添加注释标记）；2) 强制代码审查流程，AI 代码需额外说明生成逻辑；3) 统一 Prompt 模板，保证代码风格一致；4) 定期分享最佳实践和踩坑经验；5) 建立内部知识库，沉淀常用代码片段的 AI 生成技巧。"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            本知识点与以下内容密切相关：
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted ml-2">
            <li><strong className="text-accent">GitHub Copilot</strong>：另一款主流 AI 编程助手，侧重代码补全和单文件生成</li>
            <li><strong className="text-accent">Claude Code</strong>：Anthropic 推出的 AI 编程工具，强调代码理解和重构</li>
            <li><strong className="text-accent">AI Coding Workflow</strong>：AI 辅助编程的最佳实践和工作流设计</li>
          </ul>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，禁止用 <aside> 包裹！组件自行管理桌面/移动端显隐 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
