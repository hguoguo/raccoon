import{j as e,g as o}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as i}from"./SideNote-BKvanovA.js";import{C as r,A as l,S as d}from"./ArticleNav-DhfiS38Y.js";import{D as n}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"core",text:"核心原理",level:2},{id:"workflow",text:"工作流程",level:2},{id:"implementation",text:"实现示例",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比分析",level:2},{id:"related",text:"知识关联",level:2}];function j({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(a,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Agent 架构设计是构建",e.jsx("strong",{className:"text-accent",children:"自主智能体系统"}),"的方法论，通过组合",e.jsx("strong",{className:"text-accent",children:"规划（Planning）"}),"、",e.jsx("strong",{className:"text-accent",children:"记忆（Memory）"}),"、",e.jsx("strong",{className:"text-accent",children:"工具（Tools）"}),"和",e.jsx("strong",{className:"text-accent",children:"反思（Reflection）"}),"四大核心模块，使 AI 能够独立完成复杂任务。"]})}),e.jsx(r,{type:"tip",title:"为什么需要 Agent 架构？",children:'传统 LLM 只能单次响应，无法处理多步任务。Agent 通过循环执行"思考-行动-观察"，具备长期记忆和工具调用能力，能完成编程、数据分析、自动化运维等复杂工作。'}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"整体架构"}),e.jsx(n,{title:"Agent 核心架构",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
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
            `})}),e.jsxs(i,{label:"ReAct 模式",children:["最经典的 Agent 模式：",e.jsx("strong",{children:"Reasoning + Acting"}),"，交替进行推理和行动。论文《ReAct: Synergizing Reasoning and Acting in Language Models》是该领域的奠基之作。"]}),e.jsx("h2",{id:"core",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"核心原理"}),e.jsx("h3",{id:"planning-module",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1. 规划模块（Planning）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"将复杂任务分解为可执行的子任务序列。"}),e.jsx(t,{code:`from langgraph.graph import StateGraph, END
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
    }`,language:"python",highlights:[12,24,32,40,48],filename:"agent_planning.py",description:"Agent 任务规划与执行"}),e.jsx("h3",{id:"memory-system",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2. 记忆系统（Memory）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Agent 需要多种记忆类型来保持上下文和学习能力。"}),e.jsx(t,{code:`from langchain.memory import ConversationBufferMemory
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
)`,language:"python",highlights:[6,14,21,25,30,35],filename:"agent_memory.py",description:"Agent 的记忆系统实现"}),e.jsx("h3",{id:"tool-integration",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3. 工具集成（Tools）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Agent 通过工具扩展能力边界，执行实际操作。"}),e.jsx(t,{code:`from langchain.tools import Tool
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
tools = [search_tool, calculator_tool, weather_tool]`,language:"python",highlights:[5,8,16,24,32,37],filename:"agent_tools.py",description:"Agent 工具集成示例"}),e.jsx("h2",{id:"workflow",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"工作流程"}),e.jsx(n,{title:"Agent 执行循环",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
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
            `})}),e.jsx("h2",{id:"implementation",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"实现示例"}),e.jsx(t,{code:`from langgraph.prebuilt import create_react_agent
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
        print(f"  工具调用: {message.tool_calls}")`,language:"python",highlights:[6,9,12,15,21,25],filename:"react_agent.py",description:"使用 LangGraph 创建 ReAct Agent"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"常见误区"}),e.jsx(r,{type:"danger",title:"误区 1：Agent 可以完全自主运行",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted",children:[e.jsx("strong",{children:"错误认知"}),"：Agent 不需要人工干预就能完成所有任务。",e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：当前 Agent 仍需人类监督，特别是在关键决策点。生产系统应实现 Human-in-the-loop 机制，允许人工审核和干预。"]})}),e.jsx(r,{type:"danger",title:"误区 2：工具越多越好",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted",children:[e.jsx("strong",{children:"错误认知"}),"：给 Agent 提供几十种工具能提升能力。",e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：过多工具增加选择难度和延迟。应根据场景精选 5-10 个核心工具，并通过工具描述优化帮助 LLM 准确选择。"]})}),e.jsx(r,{type:"danger",title:"误区 3：无需考虑成本控制",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted",children:[e.jsx("strong",{children:"错误认知"}),"：Agent 可以无限次调用 LLM 和工具。",e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：每次思考和行动都产生成本。需设置最大迭代次数、缓存常用结果、使用小模型处理简单任务，否则成本会失控。"]})}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"面试真题"}),e.jsx(m,{questions:[{question:"ReAct 模式的工作原理是什么？",answer:"ReAct（Reasoning + Acting）的核心流程：<strong>① Thought</strong>：LLM 分析当前状态，决定下一步行动；<strong>② Action</strong>：执行选定的工具或操作；<strong>③ Observation</strong>：获取行动结果；<strong>④ 循环</strong>：重复上述步骤直到任务完成或达到最大迭代次数。优势是将推理和行动结合，避免纯推理的幻觉和纯行动的盲目性。"},{question:"如何防止 Agent 进入无限循环？",answer:"防护策略：<strong>① 最大迭代限制</strong>：设置 max_iterations（通常 10-20）；<strong>② 超时控制</strong>：设置总执行时间上限；<strong>③ 状态检测</strong>：检测是否重复执行相同动作；<strong>④ 强制终止条件</strong>：检测到特定关键词（如完成任务）立即退出；<strong>⑤ 人工干预</strong>：长时间运行时通知人类操作员。"},{question:"Agent 的记忆系统如何设计？",answer:"分层设计：<strong>① 短期记忆</strong>：维护最近 N 轮对话（滑动窗口），超出部分丢弃或摘要；<strong>② 长期记忆</strong>：使用向量数据库存储重要信息，支持语义检索；<strong>③ 工作记忆</strong>：当前任务的中间变量和状态；<strong>④ 元记忆</strong>：记录 Agent 自身的行为模式和偏好。关键是平衡上下文长度和信息完整性。"},{question:"如何评估 Agent 的性能？",answer:"评估维度：<strong>① 任务完成率</strong>：成功完成任务的比例；<strong>② 效率指标</strong>：平均迭代次数、执行时间、Token 消耗；<strong>③ 准确性</strong>：最终答案的正确性；<strong>④ 鲁棒性</strong>：面对异常输入的稳定性；<strong>⑤ 成本效益</strong>：单位任务的成本。推荐使用 AgentBench 等基准测试框架。"},{question:"单 Agent 和多 Agent 系统的选择依据？",answer:"选择标准：<strong>单 Agent</strong>适合线性任务、成本敏感场景；<strong>多 Agent</strong>适合复杂协作、需要专业分工的场景（如一个负责搜索、一个负责分析、一个负责写作）。多 Agent 的优势是并行处理和专业化，但带来协调开销和通信成本。建议从单 Agent 开始，复杂度提升后再拆分。"}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"对比分析"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"Agent 类型"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"特点"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"适用场景"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"复杂度"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"ReAct Agent"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"推理+行动循环"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"通用任务"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"中"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"Plan-and-Execute"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"先规划后执行"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"复杂多步任务"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"高"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"Reflexion Agent"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"自我反思改进"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"需要迭代的任务"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"高"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"Multi-Agent"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"多角色协作"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"大规模复杂项目"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"非常高"})]})]})]})}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"前置知识"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/07-langchain-framework/agent-patterns",className:"text-primary hover:underline",children:"📖 Agent 模式"})}),e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/07-langchain-framework/langgraph-core",className:"text-primary hover:underline",children:"📖 LangGraph 核心"})})]})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"延伸阅读"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/tool-integration",className:"text-primary hover:underline",children:"🔗 工具集成与调用"})}),e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/memory-management",className:"text-primary hover:underline",children:"🔗 记忆管理"})}),e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/multi-agent-systems",className:"text-primary hover:underline",children:"🔗 多智能体系统"})})]})]})]}),e.jsx(l,{...o(s.category,s.id)})]})}),e.jsx(d,{items:c})]})}export{j as default};
