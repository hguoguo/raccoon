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
  { id: 'overview', text: '一、GitHub Copilot 概述', level: 2 },
  { id: 'features', text: '二、核心功能', level: 2 },
  { id: 'installation', text: '三、安装与配置', level: 2 },
  { id: 'usage', text: '四、使用技巧', level: 2 },
  { id: 'customization', text: '五、个性化定制', level: 2 },
  { id: 'misconceptions', text: '六、常见误区', level: 2 },
  { id: 'interview', text: '七、面试真题', level: 2 },
  { id: 'related', text: '八、知识关联', level: 2 },
]

export default function GithubCopilot({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              GitHub Copilot 是由 GitHub 和 OpenAI 联合开发的<strong className="text-accent">AI 编程助手</strong>，基于 Codex 模型（GPT-3 的代码专用版本），
              提供实时代码建议、自动补全和函数生成功能，集成到主流 IDE 中，显著提升编码效率。
            </p>
          </blockquote>

          <Callout type="tip" title="Copilot 的诞生背景">
            2021 年 6 月发布，是首个大规模商用的 AI 编程工具。基于 OpenAI Codex 模型，该模型在 GPT-3 基础上针对代码进行了专门训练，学习了 GitHub 上数十亿行公开代码。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、GitHub Copilot 概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            GitHub Copilot 作为 VSCode、JetBrains 等主流 IDE 的插件存在，通过分析当前文件上下文、注释和函数签名，实时生成代码建议。它不是独立的编辑器，而是增强现有开发环境的智能辅助工具。
          </p>

          <DiagramBlock title="GitHub Copilot 技术架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────┐
│         IDE (VSCode/JetBrains)      │
├─────────────────────────────────────┤
│     Copilot Extension Plugin        │
│  - 捕获编辑器上下文                  │
│  - 发送请求到云端                    │
│  - 渲染代码建议                      │
└──────────────┬──────────────────────┘
               │ HTTPS
               ▼
┌─────────────────────────────────────┐
│   GitHub Copilot Cloud Service      │
│  - 身份验证                          │
│  - 请求路由                          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│    OpenAI Codex Model               │
│  - 代码理解                          │
│  - 代码生成                          │
│  - 多语言支持                        │
└─────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="技术栈">
            Copilot 后端使用 OpenAI Codex 模型（已停止更新，现升级为 GPT-4 系列），前端通过 Language Server Protocol (LSP) 与 IDE 通信，支持实时流式响应。
          </SideNote>

          <h2 id="features" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、核心功能
          </h2>

          <h3 id="code-completion" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1. 智能代码补全
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Copilot 最基础的功能是根据当前光标位置和上下文，预测下一行或下一个代码块。它能理解变量名、函数调用、API 使用模式等。
          </p>

          <Playground
            code={`# Python 示例：Copilot 自动补全

# 输入注释
def calculate_average(numbers: list[float]) -> float:
    # Copilot 自动生成完整实现
    if not numbers:
        return 0.0
    return sum(numbers) / len(numbers)

# JavaScript 示例
// 根据函数名推断实现
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

# SQL 查询生成
# 获取最近 30 天的订单统计
SELECT 
    DATE(created_at) as order_date,
    COUNT(*) as total_orders,
    SUM(amount) as total_revenue
FROM orders
WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY DATE(created_at)
ORDER BY order_date DESC;`}
            language="python"
            highlights={[5, 13, 22]}
            filename="copilot-completion.py"
            description="Copilot 智能补全示例"
          />

          <h3 id="function-generation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2. 函数级代码生成
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            通过编写详细的注释或函数签名，Copilot 可以生成完整的函数实现，包括边界检查、错误处理和文档字符串。
          </p>

          <Playground
            code={`# 示例 1：根据 docstring 生成代码
def binary_search(arr: list[int], target: int) -> int:
    """
    在有序数组中查找目标值的索引
    
    Args:
        arr: 升序排列的整数列表
        target: 要查找的目标值
    
    Returns:
        目标值的索引，未找到返回 -1
    
    Time Complexity: O(log n)
    Space Complexity: O(1)
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # 防止溢出
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# 示例 2：REST API 端点
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

@app.post("/users")
def create_user(user: UserCreate):
    """
    创建新用户
    
    Validates input and creates user in database.
    Returns user ID on success.
    """
    # 验证邮箱格式
    if "@" not in user.email:
        raise HTTPException(status_code=400, detail="Invalid email")
    
    # 密码强度检查
    if len(user.password) < 8:
        raise HTTPException(status_code=400, detail="Password too weak")
    
    # TODO: 保存到数据库
    return {"message": "User created", "username": user.username}`}
            language="python"
            highlights={[1, 25, 35]}
            filename="function-generation.py"
            description="函数级代码生成示例"
          />

          <h3 id="test-generation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3. 测试用例生成
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Copilot 能够根据函数实现自动生成单元测试，覆盖正常场景和边界情况。
          </p>

          <Playground
            code={`import pytest
from calculator import add, divide

# Copilot 生成的测试用例
def test_add_positive_numbers():
    assert add(2, 3) == 5

def test_add_negative_numbers():
    assert add(-1, -1) == -2

def test_add_zero():
    assert add(0, 5) == 5

def test_divide_normal():
    assert divide(10, 2) == 5.0

def test_divide_by_zero():
    with pytest.raises(ValueError):
        divide(10, 0)

def test_divide_float_result():
    assert divide(7, 2) == 3.5`}
            language="python"
            highlights={[5, 12, 18]}
            filename="test_calculator.py"
            description="自动生成的测试用例"
          />

          <h2 id="installation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、安装与配置
          </h2>

          <h3 id="vscode-install" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            VSCode 安装步骤
          </h3>
          <ol className="list-decimal list-inside space-y-2 mb-4 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted ml-2">
            <li>打开 VSCode，进入 Extensions 面板（Ctrl/Cmd + Shift + X）</li>
            <li>搜索 "GitHub Copilot"，点击 Install</li>
            <li>安装完成后，点击右下角通知中的 "Sign in to GitHub"</li>
            <li>浏览器中授权 GitHub 账户（需要付费订阅）</li>
            <li>重启 VSCode，开始使用</li>
          </ol>

          <h3 id="jetbrains-install" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            JetBrains IDE 安装步骤
          </h3>
          <ol className="list-decimal list-inside space-y-2 mb-4 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted ml-2">
            <li>打开 IntelliJ IDEA / PyCharm / WebStorm 等</li>
            <li>进入 Settings → Plugins → Marketplace</li>
            <li>搜索 "GitHub Copilot"，点击 Install</li>
            <li>重启 IDE，在 Tools 菜单中找到 GitHub Copilot</li>
            <li>登录 GitHub 账户并授权</li>
          </ol>

          <Callout type="info" title="订阅费用">
            GitHub Copilot 个人版 $10/月，商业版 $19/月。学生、教师和开源项目维护者可申请免费使用。
          </Callout>

          <h2 id="usage" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、使用技巧
          </h2>

          <h3 id="effective-comments" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1. 编写有效的注释
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            注释越详细，Copilot 生成的代码越准确。包含以下信息能提升效果：
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted ml-2">
            <li>函数的输入输出类型</li>
            <li>算法思路或关键步骤</li>
            <li>边界条件和异常处理</li>
            <li>性能要求（时间/空间复杂度）</li>
          </ul>

          <Playground
            code={`# ❌ 糟糕的注释
def process(data):
    # 处理数据
    pass

# ✅ 优秀的注释
def process_data(records: list[dict]) -> dict[str, list]:
    """
    对记录列表进行分类处理
    
    根据 record['type'] 字段将记录分组：
    - 'error': 错误日志
    - 'warning': 警告信息
    - 'info': 普通信息
    
    Args:
        records: 原始记录列表，每项包含 'type' 和 'message' 字段
    
    Returns:
        字典，key 为类型，value 为该类型的消息列表
    
    Example:
        >>> process_data([{'type': 'error', 'message': 'fail'}])
        {'error': ['fail'], 'warning': [], 'info': []}
    """
    result = {'error': [], 'warning': [], 'info': []}
    for record in records:
        record_type = record.get('type', 'info')
        if record_type in result:
            result[record_type].append(record['message'])
    return result`}
            language="python"
            highlights={[2, 9]}
            filename="comment-quality.py"
            description="注释质量对比"
          />

          <h3 id="context-awareness" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2. 利用上下文感知
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Copilot 会读取当前文件和相邻文件的内容，因此：
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted ml-2">
            <li>保持相关文件同时打开，提供更多上下文</li>
            <li>先定义数据类型和接口，再生成实现代码</li>
            <li>使用一致的命名规范，帮助 Copilot 理解意图</li>
          </ul>

          <h3 id="keyboard-shortcuts" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3. 快捷键操作
          </h3>
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-parchment-deep border-b border-border">
                <th className="text-left py-2 px-3 text-[13px] font-semibold text-ink">操作</th>
                <th className="text-left py-2 px-3 text-[13px] font-semibold text-ink">macOS</th>
                <th className="text-left py-2 px-3 text-[13px] font-semibold text-ink">Windows/Linux</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 text-[13px] text-ink-muted">接受建议</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Tab</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Tab</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 text-[13px] text-ink-muted">逐词接受</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Cmd + →</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Ctrl + →</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 text-[13px] text-ink-muted">查看下一个建议</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Alt/Opt + ]</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Alt + ]</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 text-[13px] text-ink-muted">查看上一个建议</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Alt/Opt + [</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Alt + [</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 text-[13px] text-ink-muted">触发建议</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Cmd + Enter</td>
                <td className="py-2 px-3 text-[13px] font-mono text-accent">Ctrl + Enter</td>
              </tr>
            </tbody>
          </table>

          <h2 id="customization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、个性化定制
          </h2>

          <h3 id="ignore-files" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1. 排除敏感文件
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            在项目根目录创建 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">.copilotignore</code> 文件，防止敏感代码发送到云端：
          </p>

          <Playground
            code={`# .copilotignore
# 排除配置文件
*.env
config/secrets.yml

# 排除测试数据
tests/fixtures/*.json

# 排除专有算法
src/proprietary/**/*.py`}
            language="plaintext"
            highlights={[2, 6, 9]}
            filename=".copilotignore"
            description="Copilot 忽略文件配置"
          />

          <h3 id="language-settings" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2. 语言特定设置
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            可以在 VSCode settings.json 中为不同语言定制 Copilot 行为：
          </p>

          <Playground
            code={`{
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": false,
    "scminput": false
  },
  "github.copilot.editor.enableAutoCompletions": true,
  "github.copilot.inlineSuggest.enable": true
}`}
            language="json"
            highlights={[2, 8, 9]}
            filename="settings.json"
            description="Copilot 配置示例"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、常见误区
          </h2>

          <div className="space-y-4 mb-6">
            <Callout type="danger" title="误区 1：Copilot 总是正确的">
              Copilot 可能生成看似合理但实际错误的代码（称为"幻觉"）。例如引用不存在的 API、使用过时的语法、或产生逻辑错误。必须人工验证每一行生成的代码。
            </Callout>

            <Callout type="danger" title="误区 2：不需要理解生成的代码">
              盲目接受 Copilot 的建议会导致对代码库失去掌控。当出现问题时，无法调试和优化。应该把 Copilot 当作"高级同事"，理解其思路后再决定是否采用。
            </Callout>

            <Callout type="danger" title="误区 3：所有语言都同样好用">
              Copilot 在主流语言（Python、JavaScript、Java）上表现优秀，但在小众语言或领域特定语言（DSL）上效果较差。对于新语言，可能需要更多引导和修正。
            </Callout>
          </div>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "GitHub Copilot 的工作原理是什么？它如何保证代码建议的相关性？",
                answer: "Copilot 基于 Transformer 架构的语言模型，在数十亿行公开代码上训练。工作时，它将当前编辑器内容（前后文各数千字符）作为 prompt 发送给模型，模型预测最可能的下一段代码。相关性通过以下方式保证：1) 分析当前文件的 imports、类定义和函数签名；2) 考虑相邻打开的文件；3) 学习常见的代码模式和最佳实践；4) 根据注释中的关键词匹配相似代码片段。"
              },
              {
                question: "使用 Copilot 是否存在代码泄露风险？企业如何保障安全？",
                answer: "存在一定风险，因为代码片段会发送到云端处理。GitHub 提供了缓解措施：1) 数据传输加密（HTTPS）；2) 不存储用户代码用于模型训练（企业版）；3) .copilotignore 排除敏感文件。企业还应：a) 制定 AI 工具使用政策；b) 定期审计代码库；c) 使用私有部署的 AI 模型（如 GitHub Copilot Enterprise）；d) 对机密项目禁用 Copilot。"
              },
              {
                question: "Copilot 生成的代码可能存在版权问题吗？如何规避？",
                answer: "理论上存在风险，因为模型训练数据来自 GitHub 公开仓库，可能包含受版权保护的代码。实践中：1) Copilot 不会原样复制代码，而是学习模式后重新生成；2) GitHub 提供版权赔偿保障（最高$100万）；3) 启用\"公共代码过滤\"功能，避免生成与训练数据高度相似的代码。最佳实践是：审查生成代码的独特性，避免直接复制大段代码。"
              },
              {
                question: "如何评估 Copilot 对团队生产力的影响？有哪些量化指标？",
                answer: "可从多维度评估：1) 编码速度：完成相同任务的时间缩短比例（研究显示平均提升 55%）；2) 代码质量：Bug 率、代码审查通过率变化；3) 开发者满意度：问卷调查主观感受；4) 重复性工作减少：样板代码、单元测试的自动化程度；5) 学习曲线：新人上手速度。建议使用 A/B 测试，对比使用和不使用 Copilot 的小组。"
              },
              {
                question: "Copilot 与传统代码片段管理器（如 Snippets）的区别是什么？",
                answer: "主要区别：1) 智能程度：Snippets 是静态模板，Copilot 动态生成适应上下文的代码；2) 灵活性：Snippets 需要预定义，Copilot 可应对未知场景；3) 学习能力：Copilot 从海量代码中学习模式，Snippets 依赖手动积累；4) 交互方式：Snippets 通过快捷键触发，Copilot 实时建议。两者可互补使用：Snippets 管理团队规范代码，Copilot 处理日常编码。"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            本知识点与以下内容密切相关：
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted ml-2">
            <li><strong className="text-accent">Cursor AI Editor</strong>：AI 原生编辑器，提供更深度的 AI 集成和多文件编辑能力</li>
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
