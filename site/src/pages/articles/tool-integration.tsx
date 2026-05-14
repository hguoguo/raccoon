import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import SideNote from '../../components/knowledge/SideNote'
import SmartTOC from '../../components/knowledge/SmartTOC'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '整体架构', level: 2 },
  { id: 'core', text: '核心原理', level: 2 },
  { id: 'workflow', text: '工作流程', level: 2 },
  { id: 'implementation', text: '实现示例', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比分析', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function ToolIntegration({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              工具集成与调用（Tool Integration）是使 LLM Agent 能够<strong className="text-accent">调用外部 API、执行代码、访问数据库</strong>的机制，通过标准化的工具描述和调用协议，扩展 AI 的能力边界。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要工具集成？">
            LLM 本身只能处理文本，无法执行实际操作。通过工具集成，Agent 可以搜索网络、操作文件系统、调用业务 API、运行代码等，从"聊天机器人"升级为"智能助手"。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            整体架构
          </h2>

          <DiagramBlock title="工具集成架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌──────────────────────────────────────┐
│         LLM Agent                    │
│  (决策层：选择工具并生成参数)          │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│     Tool Router / Dispatcher         │
│  (路由层：解析调用并分发)              │
└────┬──────────┬──────────┬───────────┘
     │          │          │
     ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│ Web    │ │ Code   │ │ DB     │
│ Search │ │ Exec   │ │ Query  │
└────────┘ └────────┘ └────────┘
     │          │          │
     ▼          ▼          ▼
  HTTP API   Sandbox   SQL Engine
            `}</pre>
          </DiagramBlock>

          <SideNote label="Function Calling">
            OpenAI 的 Function Calling 是工具调用的标准协议，LLM 输出 JSON 格式的工具调用请求，由外部系统执行后返回结果。这是目前最主流的实现方式。
          </SideNote>

          <h2 id="core" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            核心原理
          </h2>

          <h3 id="tool-definition" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1. 工具定义规范
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            每个工具需要提供清晰的元数据，帮助 LLM 理解何时及如何使用。
          </p>

          <Playground
            code={`from langchain.tools import BaseTool
from pydantic import BaseModel, Field

# 定义工具输入 schema
class SearchInput(BaseModel):
    query: str = Field(description="搜索关键词")
    num_results: int = Field(default=5, description="返回结果数量")

# 自定义工具
class WebSearchTool(BaseTool):
    name: str = "web_search"
    description: str = "在互联网上搜索信息，适合查找实时数据和事实"
    args_schema: type[BaseModel] = SearchInput
    
    def _run(self, query: str, num_results: int = 5) -> str:
        """执行搜索"""
        results = search_api(query, num_results)
        return format_results(results)

# 使用工具
tool = WebSearchTool()
print(f"工具名称: {tool.name}")
print(f"工具描述: {tool.description}")`}
            language="python"
            highlights={[5, 12, 13, 14, 17]}
            filename="tool_definition.py"
            description="定义标准化的 Agent 工具"
          />

          <h3 id="tool-selection" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2. 工具选择机制
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            LLM 根据任务需求选择合适的工具。
          </p>

          <Playground
            code={`from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, ToolMessage

# 1. 定义工具列表
tools = [search_tool, calculator_tool, weather_tool]

# 2. 绑定工具到 LLM
llm_with_tools = llm.bind_tools(tools)

# 3. 用户提问
messages = [HumanMessage(content="北京今天天气如何？")]

# 4. LLM 决定调用哪个工具
response = llm_with_tools.invoke(messages)

# 5. 解析工具调用
if response.tool_calls:
    tool_call = response.tool_calls[0]
    print(f"调用工具: {tool_call['name']}")
    print(f"参数: {tool_call['args']}")
    
    # 6. 执行工具并返回结果
    result = execute_tool(tool_call)
    messages.append(response)
    messages.append(ToolMessage(content=result, tool_call_id=tool_call['id']))
    
    # 7. 获取最终答案
    final_response = llm.invoke(messages)
    print(final_response.content)`}
            language="python"
            highlights={[6, 9, 12, 15, 18, 24, 30]}
            filename="tool_selection.py"
            description="LLM 自动选择和调用工具"
          />

          <h3 id="error-handling" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3. 错误处理与重试
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            工具调用可能失败，需要健壮的错误处理机制。
          </p>

          <Playground
            code={`import requests
from tenacity import retry, stop_after_attempt, wait_exponential

class RobustAPITool:
    """带重试机制的 API 工具"""
    
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        reraise=True
    )
    def call_api(self, url: str, params: dict) -> dict:
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.Timeout:
            raise Exception("API 超时")
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429:
                raise Exception("速率限制，请稍后重试")
            raise Exception(f"HTTP 错误: {e}")

# 使用
tool = RobustAPITool()
try:
    result = tool.call_api("https://api.example.com/data", {"id": 123})
except Exception as e:
    print(f"工具调用失败: {e}")`}
            language="python"
            highlights={[7, 13, 16, 19, 22, 29]}
            filename="error_handling.py"
            description="工具调用的错误处理和重试机制"
          />

          <h2 id="workflow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            工作流程
          </h2>

          <DiagramBlock title="工具调用完整流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
用户查询: "帮我查一下 Python 的最新版本"
         │
         ▼
┌──────────────────┐
│ LLM 分析意图      │
│ 需要搜索工具      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 生成工具调用      │
│ web_search(       │
│   query="Python   │
│   latest version" │
│ )                 │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 执行工具          │
│ 调用搜索引擎 API   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 返回结果          │
│ "Python 3.12.0"  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ LLM 生成最终回答  │
│ "Python 最新版本  │
│  是 3.12.0"      │
└──────────────────┘
            `}</pre>
          </DiagramBlock>

          <h2 id="implementation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            实现示例
          </h2>

          <Playground
            code={`from langchain.tools import Tool
from langchain.agents import initialize_agent, AgentType
from langchain_openai import ChatOpenAI

# 1. 定义多个工具
def search_news(query: str) -> str:
    """搜索最新新闻"""
    return f"搜索结果: {query}"

def calculate(expression: str) -> str:
    """计算数学表达式"""
    return str(eval(expression))

def get_time() -> str:
    """获取当前时间"""
    from datetime import datetime
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

tools = [
    Tool(
        name="NewsSearch",
        func=search_news,
        description="搜索最新新闻和事件"
    ),
    Tool(
        name="Calculator",
        func=calculate,
        description="执行数学计算"
    ),
    Tool(
        name="TimeChecker",
        func=get_time,
        description="获取当前日期和时间"
    )
]

# 2. 初始化 Agent
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# 3. 执行任务
result = agent.run("现在几点了？计算 25 * 4 的结果")
print(result)`}
            language="python"
            highlights={[7, 11, 15, 21, 35, 42, 48]}
            filename="multi_tool_agent.py"
            description="多工具集成的 Agent 实现"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            常见误区
          </h2>

          <Callout type="danger" title="误区 1：工具描述越详细越好">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted">
              <strong>错误认知</strong>：把工具的每个细节都写进描述。<br/>
              <strong>实际情况</strong>：过长的描述增加 Token 成本且干扰 LLM 判断。描述应简洁明了，突出<strong>何时使用</strong>和<strong>输入输出格式</strong>，通常 2-3 句话最佳。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：不需要错误处理">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted">
              <strong>错误认知</strong>：工具调用总会成功。<br/>
              <strong>实际情况</strong>：网络超时、API 限流、参数错误都很常见。必须实现重试机制、超时控制和友好的错误提示，让 Agent 能根据错误信息调整策略。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：所有工具都同步调用">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted">
              <strong>错误认知</strong>：工具只能顺序执行。<br/>
              <strong>实际情况</strong>：独立的工具调用可以并行执行，大幅降低延迟。LangChain 支持异步工具调用，对于不依赖的工具应并发执行。
            </p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "Function Calling 的工作原理是什么？",
                answer: "Function Calling 流程：<strong>① 工具注册</strong>：将工具的名称、描述、参数 schema 传给 LLM；<strong>② LLM 决策</strong>：模型判断是否需要调用工具，如需则输出 JSON 格式的调用请求；<strong>③ 外部执行</strong>：应用层解析 JSON，执行对应工具；<strong>④ 结果返回</strong>：将执行结果以 ToolMessage 形式传回 LLM；<strong>⑤ 最终响应</strong>：LLM 结合工具结果生成最终答案。关键是 LLM 不直接执行工具，只是生成调用指令。"
              },
              {
                question: "如何设计一个好的工具描述？",
                answer: "好的工具描述应包含：<strong>① 功能说明</strong>：清晰说明工具做什么；<strong>② 使用场景</strong>：何时应该使用这个工具；<strong>③ 参数说明</strong>：每个参数的含义和格式；<strong>④ 返回值说明</strong>：返回什么类型的数据；<strong>⑤ 示例</strong>：典型的使用示例。避免模糊表述，使用具体动词，如'搜索网络获取实时信息'而非'处理信息'。"
              },
              {
                question: "如何处理工具调用的速率限制？",
                answer: "应对策略：<strong>① 指数退避重试</strong>：遇到 429 错误时按指数增长等待时间重试；<strong>② 令牌桶限流</strong>：客户端主动控制调用频率；<strong>③ 请求队列</strong>：将请求排队，按速率限制逐个处理；<strong>④ 缓存结果</strong>：对相同请求返回缓存结果；<strong>⑤ 降级方案</strong>：超过限制时使用备用工具或简化逻辑。"
              },
              {
                question: "工具调用中如何保证安全性？",
                answer: "安全措施：<strong>① 沙箱环境</strong>：代码执行在隔离的沙箱中；<strong>② 权限控制</strong>：工具最小权限原则，只授予必要权限；<strong>③ 输入验证</strong>：严格校验工具参数，防止注入攻击；<strong>④ 审计日志</strong>：记录所有工具调用；<strong>⑤ 人工审核</strong>：敏感操作（如删除、支付）需人工确认；<strong>⑥ 白名单机制</strong>：只允许访问授权的 API 和资源。"
              },
              {
                question: "如何选择同步工具和异步工具？",
                answer: "选择依据：<strong>同步工具</strong>适合快速操作（&lt;1s），如本地计算、缓存查询，实现简单；<strong>异步工具</strong>适合耗时操作（&gt;1s），如网络请求、文件处理，可并发执行提升效率。最佳实践是优先使用异步工具，对于独立的任务并行执行，对于有依赖的任务串行执行。LangChain 的 StructuredTool 同时支持 sync 和 async 方法。"
              }
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            对比分析
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-gray-300 px-4 py-2 text-left">特性</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Function Calling</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">ReAct Pattern</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Custom Parser</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">实现难度</td>
                  <td className="border border-gray-300 px-4 py-2">低（框架支持）</td>
                  <td className="border border-gray-300 px-4 py-2">中</td>
                  <td className="border border-gray-300 px-4 py-2">高</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">可靠性</td>
                  <td className="border border-gray-300 px-4 py-2">高（结构化）</td>
                  <td className="border border-gray-300 px-4 py-2">中</td>
                  <td className="border border-gray-300 px-4 py-2">低</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">灵活性</td>
                  <td className="border border-gray-300 px-4 py-2">中</td>
                  <td className="border border-gray-300 px-4 py-2">高</td>
                  <td className="border border-gray-300 px-4 py-2">高</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">适用模型</td>
                  <td className="border border-gray-300 px-4 py-2">支持 FC 的模型</td>
                  <td className="border border-gray-300 px-4 py-2">任意 LLM</td>
                  <td className="border border-gray-300 px-4 py-2">任意 LLM</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">推荐场景</td>
                  <td className="border border-gray-300 px-4 py-2">生产环境首选</td>
                  <td className="border border-gray-300 px-4 py-2">复杂推理任务</td>
                  <td className="border border-gray-300 px-4 py-2">特殊定制需求</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <h3 className="font-semibold text-ink mb-2">前置知识</h3>
              <ul className="space-y-2">
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/07-langchain-framework/function-calling" className="text-primary hover:underline">
                    📖 Function Calling
                  </a>
                </li>
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/07-langchain-framework/agent-patterns" className="text-primary hover:underline">
                    📖 Agent 模式
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <h3 className="font-semibold text-ink mb-2">延伸阅读</h3>
              <ul className="space-y-2">
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/08-ai-applications/agent-architecture" className="text-primary hover:underline">
                    🔗 Agent 架构设计
                  </a>
                </li>
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/08-ai-applications/memory-management" className="text-primary hover:underline">
                    🔗 记忆管理
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
