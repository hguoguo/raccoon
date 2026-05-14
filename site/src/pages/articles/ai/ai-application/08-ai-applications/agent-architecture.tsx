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
  { id: 'overview', text: '整体架构', level: 2 },
  { id: 'core', text: '核心原理', level: 2 },
  { id: 'workflow', text: '工作流程', level: 2 },
  { id: 'implementation', text: '实现示例', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比分析', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function AgentArchitecture({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Agent 架构设计是构建<strong className="text-accent">自主智能体系统</strong>的方法论，通过组合<strong className="text-accent">规划（Planning）</strong>、<strong className="text-accent">记忆（Memory）</strong>、<strong className="text-accent">工具（Tools）</strong>和<strong className="text-accent">反思（Reflection）</strong>四大核心模块，使 AI 能够独立完成复杂任务。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 Agent 架构？">
            传统 LLM 只能单次响应，无法处理多步任务。Agent 通过循环执行"思考-行动-观察"，具备长期记忆和工具调用能力，能完成编程、数据分析、自动化运维等复杂工作。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            整体架构
          </h2>

          <DiagramBlock title="Agent 核心架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────┐
│           Agent 大脑                 │
├──────────┬──────────┬────────┬──────┤
│ Planning │ Memory   │ Tools  │Reflect│
│ (规划)   │ (记忆)   │(工具)  │(反思) │
└────┬─────┴────┬─────┴───┬────┴───┬───┘
     │          │          │        │
     ▼          ▼          ▼        ▼
  Task      Short-term  API Calls  Self-
 Decompose  & Long-term  Web Search Critique
            Storage      Code Exec
            `}</pre>
          </DiagramBlock>

          <SideNote label="ReAct 模式">
            最经典的 Agent 模式：<strong>Reasoning + Acting</strong>，交替进行推理和行动。论文《ReAct: Synergizing Reasoning and Acting in Language Models》是该领域的奠基之作。
          </SideNote>

          <h2 id="core" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            核心原理
          </h2>

          <h3 id="planning-module" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1. 规划模块（Planning）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            将复杂任务分解为可执行的子任务序列。
          </p>

          <Playground
            code={`from langgraph.graph import StateGraph, END
from typing import TypedDict, List

class AgentState(TypedDict):
    task: str
    steps: List[str]
    current_step: int
    results: dict

# 任务分解节点
def planner_node(state: AgentState) -> AgentState:
    task = state["task"]
    
    # 使用 LLM 分解任务
    prompt = f"""将以下任务分解为具体步骤：
任务: {task}

请返回步骤列表（JSON 格式）："""
    
    # 假设 llm.invoke 返回步骤列表
    steps = ["搜索相关信息", "分析数据", "生成报告"]
    
    return {
        "steps": steps,
        "current_step": 0,
        "results": {}
    }

# 执行节点
def executor_node(state: AgentState) -> AgentState:
    current_step = state["current_step"]
    steps = state["steps"]
    
    if current_step >= len(steps):
        return {"current_step": current_step}
    
    step = steps[current_step]
    print(f"执行步骤 {current_step + 1}: {step}")
    
    # 执行具体操作...
    result = f"步骤 {current_step + 1} 完成"
    
    return {
        "current_step": current_step + 1,
        "results": {**state["results"], step: result}
    }`}
            language="python"
            highlights={[12, 24, 32, 40, 48]}
            filename="agent_planning.py"
            description="Agent 任务规划与执行"
          />

          <h3 id="memory-system" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2. 记忆系统（Memory）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Agent 需要多种记忆类型来保持上下文和学习能力。
          </p>

          <Playground
            code={`from langchain.memory import ConversationBufferMemory
from langchain.memory import VectorStoreRetrieverMemory
from langchain_community.vectorstores import Chroma

# 短期记忆：对话历史
short_term_memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# 长期记忆：向量存储
embeddings = OpenAIEmbeddings()
vectorstore = Chroma(embedding_function=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
long_term_memory = VectorStoreRetrieverMemory(retriever=retriever)

# 保存信息
short_term_memory.save_context(
    {"input": "我叫小明"},
    {"output": "你好小明！"}
)

long_term_memory.save_context(
    {"input": "用户喜欢 Python"},
    {"output": "已记录"}
)

# 检索记忆
relevant = long_term_memory.load_memory_variables(
    {"query": "用户偏好"}
)`}
            language="python"
            highlights={[6, 14, 21, 25, 30, 35]}
            filename="agent_memory.py"
            description="Agent 的记忆系统实现"
          />

          <h3 id="tool-integration" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3. 工具集成（Tools）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Agent 通过工具扩展能力边界，执行实际操作。
          </p>

          <Playground
            code={`from langchain.tools import Tool
from langchain_community.tools import DuckDuckGoSearchRun

# 工具 1: 网络搜索
search_tool = DuckDuckGoSearchRun()

# 工具 2: 计算器
def calculator(expression: str) -> str:
    """计算数学表达式"""
    try:
        return str(eval(expression))
    except:
        return "计算错误"

calculator_tool = Tool(
    name="Calculator",
    func=calculator,
    description="用于数学计算"
)

# 工具 3: 天气查询
def weather_api(city: str) -> str:
    """查询天气"""
    response = requests.get(f"https://api.weather.com/{city}")
    return response.json()["temperature"]

weather_tool = Tool(
    name="WeatherAPI",
    func=weather_api,
    description="查询城市天气"
)

# 注册所有工具
tools = [search_tool, calculator_tool, weather_tool]`}
            language="python"
            highlights={[5, 8, 16, 24, 32, 37]}
            filename="agent_tools.py"
            description="Agent 工具集成示例"
          />

          <h2 id="workflow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            工作流程
          </h2>

          <DiagramBlock title="Agent 执行循环">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
用户输入: "分析某公司股票并生成报告"
         │
         ▼
┌──────────────┐
│  Thought     │ ← LLM 思考下一步行动
│  (规划)      │
└──────┬───────┘
         │
         ▼
┌──────────────┐
│  Action      │ ← 选择工具并执行
│  (行动)      │   search_stock_data("AAPL")
└──────┬───────┘
         │
         ▼
┌──────────────┐
│ Observation  │ ← 获取工具返回结果
│  (观察)      │   {price: 150, volume: ...}
└──────┬───────┘
         │
         ├─ 任务未完成 ──▶ 回到 Thought
         │
         └─ 任务完成 ──▶ 输出最终答案
            `}</pre>
          </DiagramBlock>

          <h2 id="implementation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            实现示例
          </h2>

          <Playground
            code={`from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langchain_community.tools import DuckDuckGoSearchRun

# 1. 创建 LLM
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# 2. 准备工具
tools = [DuckDuckGoSearchRun()]

# 3. 创建 ReAct Agent
agent = create_react_agent(llm, tools)

# 4. 执行任务
inputs = {
    "messages": [("user", "查找 2024 年 AI 领域的重大突破")]
}

result = agent.invoke(inputs)

# 5. 查看执行过程
for message in result["messages"]:
    print(f"{message.type}: {message.content[:100]}...")
    if hasattr(message, 'tool_calls'):
        print(f"  工具调用: {message.tool_calls}")`}
            language="python"
            highlights={[6, 9, 12, 15, 21, 25]}
            filename="react_agent.py"
            description="使用 LangGraph 创建 ReAct Agent"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            常见误区
          </h2>

          <Callout type="danger" title="误区 1：Agent 可以完全自主运行">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted">
              <strong>错误认知</strong>：Agent 不需要人工干预就能完成所有任务。<br/>
              <strong>实际情况</strong>：当前 Agent 仍需人类监督，特别是在关键决策点。生产系统应实现 Human-in-the-loop 机制，允许人工审核和干预。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：工具越多越好">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted">
              <strong>错误认知</strong>：给 Agent 提供几十种工具能提升能力。<br/>
              <strong>实际情况</strong>：过多工具增加选择难度和延迟。应根据场景精选 5-10 个核心工具，并通过工具描述优化帮助 LLM 准确选择。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：无需考虑成本控制">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted">
              <strong>错误认知</strong>：Agent 可以无限次调用 LLM 和工具。<br/>
              <strong>实际情况</strong>：每次思考和行动都产生成本。需设置最大迭代次数、缓存常用结果、使用小模型处理简单任务，否则成本会失控。
            </p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "ReAct 模式的工作原理是什么？",
                answer: "ReAct（Reasoning + Acting）的核心流程：<strong>① Thought</strong>：LLM 分析当前状态，决定下一步行动；<strong>② Action</strong>：执行选定的工具或操作；<strong>③ Observation</strong>：获取行动结果；<strong>④ 循环</strong>：重复上述步骤直到任务完成或达到最大迭代次数。优势是将推理和行动结合，避免纯推理的幻觉和纯行动的盲目性。"
              },
              {
                question: "如何防止 Agent 进入无限循环？",
                answer: "防护策略：<strong>① 最大迭代限制</strong>：设置 max_iterations（通常 10-20）；<strong>② 超时控制</strong>：设置总执行时间上限；<strong>③ 状态检测</strong>：检测是否重复执行相同动作；<strong>④ 强制终止条件</strong>：检测到特定关键词（如完成任务）立即退出；<strong>⑤ 人工干预</strong>：长时间运行时通知人类操作员。"
              },
              {
                question: "Agent 的记忆系统如何设计？",
                answer: "分层设计：<strong>① 短期记忆</strong>：维护最近 N 轮对话（滑动窗口），超出部分丢弃或摘要；<strong>② 长期记忆</strong>：使用向量数据库存储重要信息，支持语义检索；<strong>③ 工作记忆</strong>：当前任务的中间变量和状态；<strong>④ 元记忆</strong>：记录 Agent 自身的行为模式和偏好。关键是平衡上下文长度和信息完整性。"
              },
              {
                question: "如何评估 Agent 的性能？",
                answer: "评估维度：<strong>① 任务完成率</strong>：成功完成任务的比例；<strong>② 效率指标</strong>：平均迭代次数、执行时间、Token 消耗；<strong>③ 准确性</strong>：最终答案的正确性；<strong>④ 鲁棒性</strong>：面对异常输入的稳定性；<strong>⑤ 成本效益</strong>：单位任务的成本。推荐使用 AgentBench 等基准测试框架。"
              },
              {
                question: "单 Agent 和多 Agent 系统的选择依据？",
                answer: "选择标准：<strong>单 Agent</strong>适合线性任务、成本敏感场景；<strong>多 Agent</strong>适合复杂协作、需要专业分工的场景（如一个负责搜索、一个负责分析、一个负责写作）。多 Agent 的优势是并行处理和专业化，但带来协调开销和通信成本。建议从单 Agent 开始，复杂度提升后再拆分。"
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
                  <th className="border border-gray-300 px-4 py-2 text-left">Agent 类型</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">特点</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">适用场景</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">复杂度</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">ReAct Agent</td>
                  <td className="border border-gray-300 px-4 py-2">推理+行动循环</td>
                  <td className="border border-gray-300 px-4 py-2">通用任务</td>
                  <td className="border border-gray-300 px-4 py-2">中</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Plan-and-Execute</td>
                  <td className="border border-gray-300 px-4 py-2">先规划后执行</td>
                  <td className="border border-gray-300 px-4 py-2">复杂多步任务</td>
                  <td className="border border-gray-300 px-4 py-2">高</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Reflexion Agent</td>
                  <td className="border border-gray-300 px-4 py-2">自我反思改进</td>
                  <td className="border border-gray-300 px-4 py-2">需要迭代的任务</td>
                  <td className="border border-gray-300 px-4 py-2">高</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Multi-Agent</td>
                  <td className="border border-gray-300 px-4 py-2">多角色协作</td>
                  <td className="border border-gray-300 px-4 py-2">大规模复杂项目</td>
                  <td className="border border-gray-300 px-4 py-2">非常高</td>
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
                  <a href="/docs/07-langchain-framework/agent-patterns" className="text-primary hover:underline">
                    📖 Agent 模式
                  </a>
                </li>
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/07-langchain-framework/langgraph-core" className="text-primary hover:underline">
                    📖 LangGraph 核心
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <h3 className="font-semibold text-ink mb-2">延伸阅读</h3>
              <ul className="space-y-2">
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/08-ai-applications/tool-integration" className="text-primary hover:underline">
                    🔗 工具集成与调用
                  </a>
                </li>
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/08-ai-applications/memory-management" className="text-primary hover:underline">
                    🔗 记忆管理
                  </a>
                </li>
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/08-ai-applications/multi-agent-systems" className="text-primary hover:underline">
                    🔗 多智能体系统
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
