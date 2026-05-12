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

const meta: KnowledgeNode = {
  id: 'agent-patterns',
  title: 'Agent 设计模式',
  level: 'Senior',
  tags: ['Agent', 'ReAct', 'Planner', 'Executor', 'Router', 'Reflection', 'Tool Agent'],
  difficulty: 4,
  category: '07-langchain-framework',
  prerequisites: ['langchain-basics', 'langgraph-core'],
  relatedPatterns: ['workflow-design', 'function-calling'],
  readingTime: 55,
}

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'react', text: '一、ReAct Agent', level: 2 },
  { id: 'planner', text: '二、Planner Agent', level: 2 },
  { id: 'executor', text: '三、Executor Agent', level: 2 },
  { id: 'router', text: '四、Router Agent', level: 2 },
  { id: 'reflection', text: '五、Reflection Agent', level: 2 },
  { id: 'tool-agent', text: '六、Tool Agent', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function AgentPatterns() {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Agent 是能够<strong className="text-accent">自主感知、推理和行动</strong>的智能体，通过循环调用 LLM 和工具完成复杂任务，
              不同 Agent 模式（ReAct、Planner、Router 等）针对特定场景优化决策和执行策略。
            </p>
          </blockquote>

          <Callout type="tip" title="Agent vs Chain">
            Chain 是预定义的固定流程（A→B→C），Agent 则根据运行时情况动态决定下一步行动。Agent 更适合开放域任务和不确定性高的场景。
          </Callout>

          <h2 id="react" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、ReAct Agent
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ReAct（Reasoning + Acting）是最经典的 Agent 模式，交替进行<strong>推理</strong>（Thought）和<strong>行动</strong>（Action），通过观察（Observation）结果持续迭代。
          </p>

          <Playground
            code={`from langchain.agents import create_react_agent, AgentExecutor
from langchain.prompts import PromptTemplate
from langchain.tools import tool

# 定义工具
@tool
def search(query: str) -> str:
    """搜索网络获取信息"""
    return f"搜索结果: {query}"

@tool
def calculator(expression: str) -> str:
    """执行数学计算"""
    return str(eval(expression))

# ReAct Prompt 模板
react_prompt = PromptTemplate.from_template("""
Answer the following questions as best you can. You have access to the following tools:

{tools}

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Begin!

Question: {input}
Thought:{agent_scratchpad}
""")

# 创建 ReAct Agent
agent = create_react_agent(model, [search, calculator], react_prompt)
agent_executor = AgentExecutor(agent=agent, tools=[search, calculator], verbose=True)

# 执行
result = agent_executor.invoke({
    "input": "北京的面积是多少平方公里？乘以2等于多少？"
})
print(result["output"])
# Thought: 我需要先查询北京的面积
# Action: search
# Action Input: 北京 面积
# Observation: 北京的面积是16410平方公里
# Thought: 现在我需要计算 16410 * 2
# Action: calculator
# Action Input: 16410 * 2
# Observation: 32820
# Thought: 我现在知道最终答案
# Final Answer: 北京的面积乘以2等于32820平方公里`}
            language="python"
            highlights={[33, 34, 38]}
            filename="react_agent.py"
            description="ReAct Agent 完整示例"
          />

          <DiagramBlock title="ReAct 执行循环">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌──────────┐
│ Question │
└────┬─────┘
     ▼
┌──────────┐
│ Thought  │ ◄──── 推理：分析当前状态
└────┬─────┘
     ▼
┌──────────┐
│  Action  │ ◄──── 行动：选择并调用工具
└────┬─────┘
     ▼
┌───────────┐
│Observation│ ◄──── 观察：获取工具返回结果
└────┬──────┘
     ▼
     │ 是否完成任务？
    ╱ ╲
  否   是
   │    │
   └────┼────────┐
        ▼        ▼
   继续循环  Final Answer
            `}</pre>
          </DiagramBlock>

          <SideNote label="ReAct 优势">
            ReAct 将推理过程显式化（Thought），使 Agent 的决策可解释、可调试。相比直接生成答案，ReAct 能更好地处理多步推理任务。
          </SideNote>

          <h2 id="planner" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Planner Agent
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Planner Agent 先将复杂任务分解为子任务计划，再逐步执行。适合需要长期规划和依赖管理的场景。
          </p>

          <Playground
            code={`from langgraph.graph import StateGraph, END
from typing import TypedDict, List

class PlannerState(TypedDict):
    task: str
    plan: List[str]
    current_step: int
    results: List[str]

# Step 1: 规划器生成执行计划
def planner_node(state: PlannerState) -> PlannerState:
    prompt = f"""
    将以下任务分解为可执行的步骤：
    任务：{state['task']}
    
    返回 JSON 格式的步骤列表，例如：
    ["步骤1", "步骤2", "步骤3"]
    """
    plan = llm.invoke(prompt)
    return {"plan": parse_json(plan), "current_step": 0}

# Step 2: 执行器逐个执行步骤
def executor_node(state: PlannerState) -> PlannerState:
    step = state["plan"][state["current_step"]]
    result = execute_step(step)
    
    return {
        "results": state["results"] + [result],
        "current_step": state["current_step"] + 1
    }

# Step 3: 判断是否完成
def should_continue(state: PlannerState) -> str:
    if state["current_step"] >= len(state["plan"]):
        return "end"
    else:
        return "execute"

# 构建工作流
workflow = StateGraph(PlannerState)
workflow.add_node("planner", planner_node)
workflow.add_node("executor", executor_node)

workflow.add_edge(START, "planner")
workflow.add_edge("planner", "executor")
workflow.add_conditional_edges(
    source="executor",
    path=should_continue,
    path_map={"execute": "executor", "end": END}
)

app = workflow.compile()
result = app.invoke({"task": "分析某公司股票并生成投资建议", "plan": [], "current_step": 0, "results": []})`}
            language="python"
            highlights={[16, 28, 38, 48]}
            filename="planner_agent.py"
            description="Planner Agent 工作流程"
          />

          <Callout type="info" title="Planner 适用场景">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>研究任务</strong>：需要多源信息收集和综合分析</li>
              <li><strong>代码生成</strong>：大型项目需分模块实现</li>
              <li><strong>数据分析</strong>：数据清洗 → 特征工程 → 建模 → 评估</li>
              <li><strong>内容创作</strong>：大纲 → 初稿 → 润色 → 校对</li>
            </ul>
          </Callout>

          <h2 id="executor" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Executor Agent
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Executor Agent 专注于高效执行预定义计划，通常与 Planner 配合使用。它不负责规划，只负责高质量完成分配的任务。
          </p>

          <Playground
            code={`# Executor 节点示例
def code_executor(state: PlannerState) -> PlannerState:
    """执行代码编写任务"""
    step = state["plan"][state["current_step"]]
    
    # 根据步骤类型选择执行策略
    if "测试" in step:
        code = generate_test_code(step)
        result = run_tests(code)
    elif "实现" in step:
        code = generate_implementation(step)
        result = lint_and_validate(code)
    else:
        result = generic_execute(step)
    
    return {
        "results": state["results"] + [{"step": step, "result": result}],
        "current_step": state["current_step"] + 1
    }

# Executor 可以集成错误处理和重试
def robust_executor(state: PlannerState) -> PlannerState:
    max_retries = 3
    for attempt in range(max_retries):
        try:
            result = execute_with_validation(state)
            return {"results": [...], "current_step": ...}
        except ExecutionError as e:
            if attempt == max_retries - 1:
                return {"error": str(e), "status": "failed"}
            # 重试前调整策略
            adjust_execution_strategy()`}
            language="python"
            highlights={[3, 18, 24]}
            filename="executor_agent.py"
            description="Executor Agent 实现"
          />

          <h2 id="router" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Router Agent
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Router Agent 根据输入特征将请求路由到最合适的专业 Agent 或工具，类似负载均衡器或分类器。
          </p>

          <Playground
            code={`from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

# Router Prompt
router_prompt = ChatPromptTemplate.from_messages([
    ("system", """
    你是一个智能路由器。根据用户问题，选择最合适的处理专家：
    
    - coding_expert: 编程、代码调试、算法问题
    - math_expert: 数学计算、公式推导、统计分析
    - writing_expert: 文案创作、翻译、润色
    - research_expert: 事实查询、文献调研、数据分析
    
    只返回专家名称，不要解释。
    """),
    ("human", "{question}")
])

model = ChatOpenAI(model="gpt-4o-mini", temperature=0)
router_chain = router_prompt | model | StrOutputParser()

# 路由函数
def route_question(state: dict) -> str:
    expert = router_chain.invoke({"question": state["question"]})
    return expert.strip()

# 在 LangGraph 中使用
workflow = StateGraph(AgentState)
workflow.add_node("coding_expert", coding_agent)
workflow.add_node("math_expert", math_agent)
workflow.add_node("writing_expert", writing_agent)
workflow.add_node("research_expert", research_agent)

workflow.add_conditional_edges(
    source=START,
    path=route_question,
    path_map={
        "coding_expert": "coding_expert",
        "math_expert": "math_expert",
        "writing_expert": "writing_expert",
        "research_expert": "research_expert"
    }
)`}
            language="python"
            highlights={[5, 23, 31]}
            filename="router_agent.py"
            description="Router Agent 实现"
          />

          <SideNote label="路由准确性">
            Router 的准确性直接影响整体性能。可通过 Few-shot 示例、领域关键词匹配或训练专用分类模型提升路由精度。对于边界模糊的情况，可提供 fallback 到通用 Agent。
          </SideNote>

          <h2 id="reflection" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Reflection Agent
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Reflection Agent 通过自我反思和批判改进输出质量，典型流程为：生成 → 反思 → 修正 → 输出。
          </p>

          <Playground
            code={`from langgraph.graph import StateGraph, END

class ReflectionState(TypedDict):
    draft: str
    critique: str
    revised: str
    iteration: int

# Step 1: 生成初稿
def generator(state: ReflectionState) -> ReflectionState:
    prompt = f"撰写一篇关于 {state['topic']} 的文章"
    draft = llm.invoke(prompt).content
    return {"draft": draft, "iteration": 1}

# Step 2: 自我批判
def critic(state: ReflectionState) -> ReflectionState:
    prompt = f"""
    请批判性地评估以下文章，指出不足之处：
    
    {state['draft']}
    
    从以下维度评估：
    1. 逻辑连贯性
    2. 事实准确性
    3. 表达清晰度
    4. 深度和洞察力
    """
    critique = llm.invoke(prompt).content
    return {"critique": critique}

# Step 3: 基于批判修订
def revisor(state: ReflectionState) -> ReflectionState:
    prompt = f"""
    根据以下批判意见修订文章：
    
    原文：
    {state['draft']}
    
    批判意见：
    {state['critique']}
    
    请生成改进后的版本。
    """
    revised = llm.invoke(prompt).content
    return {"revised": revised, "iteration": state["iteration"] + 1}

# Step 4: 判断是否需要继续迭代
def should_reflect(state: ReflectionState) -> str:
    if state["iteration"] >= 3:  # 最多迭代3次
        return "end"
    
    # 简单判断：如果批判中提到"严重问题"，继续反思
    if "严重" in state["critique"] or "重大" in state["critique"]:
        return "reflect"
    else:
        return "end"

# 构建工作流
workflow = StateGraph(ReflectionState)
workflow.add_node("generate", generator)
workflow.add_node("criticize", critic)
workflow.add_node("revise", revisor)

workflow.add_edge(START, "generate")
workflow.add_edge("generate", "criticize")
workflow.add_edge("criticize", "revise")
workflow.add_conditional_edges(
    source="revise",
    path=should_reflect,
    path_map={"reflect": "criticize", "end": END}
)

app = workflow.compile()
result = app.invoke({"topic": "量子计算"})
print(result["revised"])`}
            language="python"
            highlights={[11, 18, 36, 50, 59]}
            filename="reflection_agent.py"
            description="Reflection Agent 自我改进循环"
          />

          <Callout type="tip" title="Reflection 的价值">
            研究表明，引入反思机制可将复杂任务的成功率提升 20-40%。特别适用于需要高精度输出的场景（如法律文档、医疗建议、学术研究）。
          </Callout>

          <h2 id="tool-agent" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、Tool Agent
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Tool Agent 专注于工具的选择和调用，通过 Function Calling 或 ReAct 模式与外部系统交互。
          </p>

          <Playground
            code={`from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain.tools import tool

# 定义丰富的工具集
@tool
def search_web(query: str) -> str:
    """搜索网络获取最新信息"""
    return tavily_search(query)

@tool
def query_database(sql: str) -> str:
    """执行 SQL 查询数据库"""
    return execute_sql(sql)

@tool
def send_email(to: str, subject: str, body: str) -> str:
    """发送邮件"""
    return smtp_send(to, subject, body)

@tool
def generate_report(data: str, format: str) -> str:
    """生成数据报告"""
    return create_report(data, format)

# 创建 Tool Agent
tools = [search_web, query_database, send_email, generate_report]
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个多功能助手，可以使用工具完成任务"),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_tool_calling_agent(model, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# 复杂任务：多工具协作
result = agent_executor.invoke({
    "input": "查询上季度销售数据，生成PDF报告，并发送给经理"
})
# Agent 会自动：
# 1. 调用 query_database 获取销售数据
# 2. 调用 generate_report 生成 PDF
# 3. 调用 send_email 发送报告`}
            language="python"
            highlights={[28, 36, 41]}
            filename="tool_agent.py"
            description="Tool Agent 多工具协作"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区 1：ReAct 总是最优选择">
            <p className="mb-2"><strong>错误认知</strong>：认为 ReAct 适用于所有 Agent 场景。</p>
            <p><strong>正确理解</strong>：ReAct 适合需要多步推理的任务，但对于简单问答或单步操作，直接使用 LLM 或 Chain 更高效。ReAct 的多次迭代会增加延迟和成本。</p>
          </Callout>

          <Callout type="danger" title="误区 2：Planner 能完美分解任务">
            <p className="mb-2"><strong>错误认知</strong>：认为 Planner 生成的计划总是合理且可执行。</p>
            <p><strong>正确理解</strong>：Planner 可能生成不切实际或遗漏关键步骤的计划。应加入验证环节（如人工审核或自动检查），并提供计划修订机制。</p>
          </Callout>

          <Callout type="danger" title="误区 3：Router 不需要维护">
            <p className="mb-2"><strong>错误认知</strong>：认为配置好 Router 后就一劳永逸。</p>
            <p><strong>正确理解</strong>：随着新工具和专业 Agent 的添加，Router 需要持续更新路由规则和 Few-shot 示例。定期分析路由错误案例并优化提示词。</p>
          </Callout>

          <Callout type="warning" title="误区 4：Reflection 次数越多越好">
            <p className="mb-2"><strong>错误认知</strong>：认为增加反思迭代次数能持续提升质量。</p>
            <p><strong>正确理解</strong>：边际效应递减，通常 2-3 次迭代后改进有限。过多的反思会增加成本和延迟，甚至导致过度修改偏离原意。应设置合理的迭代上限。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "ReAct Agent 的核心思想是什么？",
              answer: "ReAct 将推理（Reasoning）和行动（Acting）交替进行，形成 Thought → Action → Observation 的循环。Thought 让 Agent 显式思考下一步，Action 调用工具获取信息，Observation 提供反馈指导后续推理。这种模式提升了复杂任务的可解释性和成功率。"
            },
            {
              question: "Planner-Executor 模式的优势是什么？",
              answer: "① 职责分离：Planner 专注战略规划，Executor 专注战术执行；② 可复用性：同一 Planner 可搭配不同 Executor；③ 容错性：执行失败时可重新规划而非从头开始；④ 可观测性：计划和执行过程清晰可追踪。适合长周期、多步骤的复杂任务。"
            },
            {
              question: "如何提升 Router Agent 的路由准确率？",
              answer: "① 提供清晰的专家描述和 Few-shot 示例；② 使用低 temperature（如 0）确保确定性输出；③ 对边界情况设置 fallback 机制；④ 定期分析路由日志，优化提示词；⑤ 对于关键场景，可训练专用分类模型替代 LLM 路由。"
            },
            {
              question: "Reflection Agent 的迭代终止条件如何设计？",
              answer: "① 固定迭代次数（如 3 次）；② 质量评分阈值（当批判分数低于阈值时停止）；③ 变化幅度检测（当修订内容与上一版差异小于阈值时停止）；④ 人工干预（达到最大迭代次数后转人工审核）。通常结合多种策略。"
            },
            {
              question: "Tool Agent 如何处理工具调用失败？",
              answer: "① 重试机制：自动重试 1-2 次；② 降级策略：主工具失败时切换到备用工具；③ 错误反馈：将错误信息返回给 LLM，让其调整参数或选择其他工具；④ 人工介入：关键工具失败时触发 HITL。应在 AgentExecutor 层面统一处理异常。"
            },
            {
              question: "如何选择适合的 Agent 模式？",
              answer: "简单任务 → 直接 LLM 或 Chain；多步推理 → ReAct；长期规划 → Planner-Executor；多领域 → Router；高精度要求 → Reflection；工具密集 → Tool Agent。实际项目中常组合多种模式，如 Router + ReAct + Reflection。"
            },
            {
              question: "Agent 的性能优化策略有哪些？",
              answer: "① 缓存频繁调用的工具结果；② 并行执行独立子任务；③ 精简 Prompt 减少 Token 消耗；④ 设置合理的超时和重试策略；⑤ 监控和日志分析瓶颈环节；⑥ 对稳定流程固化为 Chain 避免重复推理。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/07-langchain-framework/langgraph-core" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">LangGraph 核心</div>
              <div className="text-[12px] text-ink-muted mt-1">StateGraph、工作流编排</div>
            </a>
            <a href="/docs/07-langchain-framework/workflow-design" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">高级主题 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">Workflow 设计</div>
              <div className="text-[12px] text-ink-muted mt-1">DAG、容错、持久化</div>
            </a>
            <a href="/docs/06-ai-fundamentals/function-calling" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">Function Calling</div>
              <div className="text-[12px] text-ink-muted mt-1">工具调用机制</div>
            </a>
            <a href="/docs/07-langchain-framework/langchain-advanced" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">基础技能 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">LangChain 进阶</div>
              <div className="text-[12px] text-ink-muted mt-1">LCEL、Tool Binding</div>
            </a>
          </div>

          <Callout type="info" title="实践建议">
            从简单的 ReAct Agent 开始，逐步尝试更复杂的模式。建议使用 LangSmith 监控 Agent 执行过程，分析每个步骤的耗时和成功率，针对性优化薄弱环节。
          </Callout>

        </KnowledgeLayout>
      </div>

      <aside className="hidden xl:block w-[240px] shrink-0 px-4 py-8 sticky top-0 h-screen overflow-y-auto">
        <SmartTOC items={tocItems} />
      </aside>

      <ArticleNav {...getArticleNav(meta.category, meta.id)} />
    </div>
  )
}
