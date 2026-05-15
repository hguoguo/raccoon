import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as d}from"./SideNote-BKvanovA.js";import{C as t,A as l,S as o}from"./ArticleNav-DhfiS38Y.js";import{D as n}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const g=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"core",text:"核心原理",level:2},{id:"workflow",text:"工作流程",level:2},{id:"implementation",text:"实现示例",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比分析",level:2},{id:"related",text:"知识关联",level:2}];function u({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(a,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["多智能体系统（Multi-Agent Systems）是由",e.jsx("strong",{className:"text-accent",children:"多个 AI Agent 协同工作"}),"的架构模式，通过任务分解、角色分工和协作机制，解决单个 Agent 无法处理的复杂问题，实现 1+1>2 的效果。"]})}),e.jsx(t,{type:"tip",title:"为什么需要多智能体？",children:"复杂任务往往需要多种技能和视角。单 Agent 容易陷入思维定式或能力瓶颈。多 Agent 系统通过专业化分工、并行处理和相互验证，能显著提升任务完成质量和效率。"}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"整体架构"}),e.jsx(n,{title:"多智能体协作架构",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
         ┌──────────────┐
         │   Coordinator │ ← 协调者/管理者
         │    Agent      │    (任务分配、结果整合)
         └──┬────┬──────┘
            │    │
     ┌──────┘    └──────┐
     │                  │
┌────▼─────┐    ┌──────▼────┐
│ Research │    │  Writing   │ ← 工作者 Agent
│  Agent   │    │   Agent    │    (执行具体任务)
└────┬─────┘    └──────┬────┘
     │                  │
     └──────┬───────────┘
            │
     ┌──────▼──────┐
     │ Reviewer    │ ← 审核者 Agent
     │   Agent     │    (质量检查、反馈)
     └──────┬──────┘
            │
            ▼
      最终输出结果
            `})}),e.jsxs(d,{label:"典型应用场景",children:["多 Agent 系统适合：",e.jsx("strong",{children:"软件开发"}),"（规划、编码、测试分工）、",e.jsx("strong",{children:"内容创作"}),"（研究、写作、编辑协作）、",e.jsx("strong",{children:"数据分析"}),"（数据收集、分析、可视化配合）、",e.jsx("strong",{children:"客户服务"}),"（分类、解答、升级处理）。"]}),e.jsx("h2",{id:"core",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"核心原理"}),e.jsx("h3",{id:"task-decomposition",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1. 任务分解与分配"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"将复杂任务拆解为子任务，根据 Agent 专长分配："}),e.jsx(r,{code:`from langgraph.graph import StateGraph, END
from typing import TypedDict, List

class MultiAgentState(TypedDict):
    task: str
    subtasks: List[str]
    results: dict
    final_output: str

# 协调者 Agent：负责任务分解
def coordinator_agent(state: MultiAgentState) -> MultiAgentState:
    task = state["task"]
    
    # 使用 LLM 分解任务
    prompt = f"""将以下任务分解为独立的子任务：
任务: {task}

返回子任务列表（JSON 格式）"""
    
    # 模拟分解结果
    subtasks = [
        "收集相关数据和信息",
        "分析数据并提取关键点",
        "撰写初稿",
        "审核和优化内容"
    ]
    
    return {
        "subtasks": subtasks,
        "results": {}
    }

# 研究者 Agent：负责信息收集
def researcher_agent(state: MultiAgentState) -> MultiAgentState:
    print("研究者: 正在收集信息...")
    # 执行搜索、数据收集等操作
    research_data = "收集到的研究数据"
    
    return {
        "results": {**state["results"], "research": research_data}
    }

# 写作者 Agent：负责内容创作
def writer_agent(state: MultiAgentState) -> MultiAgentState:
    print("写作者: 正在撰写内容...")
    research = state["results"].get("research", "")
    # 基于研究数据撰写内容
    draft = f"基于 {research} 撰写的文章草稿"
    
    return {
        "results": {**state["results"], "draft": draft}
    }

# 审核者 Agent：负责质量检查
def reviewer_agent(state: MultiAgentState) -> MultiAgentState:
    print("审核者: 正在审核内容...")
    draft = state["results"].get("draft", "")
    # 审核并提出改进建议
    feedback = "内容结构清晰，建议增加案例"
    final = f"{draft}\\n\\n改进后: {feedback}"
    
    return {
        "results": {**state["results"], "final": final},
        "final_output": final
    }`,language:"python",highlights:[12,28,39,50,61],filename:"multi_agent_decomposition.py",description:"多 Agent 任务分解与分配"}),e.jsx("h3",{id:"agent-communication",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2. Agent 间通信"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Agent 之间通过消息传递进行协作："}),e.jsx(r,{code:`from langchain_core.messages import HumanMessage, AIMessage

# 消息传递模式
class AgentCommunication:
    def __init__(self):
        self.message_queue = []
    
    def send_message(self, from_agent: str, to_agent: str, content: str):
        """发送消息"""
        message = {
            "from": from_agent,
            "to": to_agent,
            "content": content,
            "timestamp": time.time()
        }
        self.message_queue.append(message)
        print(f"[{from_agent} → {to_agent}]: {content}")
    
    def receive_message(self, agent_name: str):
        """接收发给指定 Agent 的消息"""
        messages = [
            msg for msg in self.message_queue 
            if msg["to"] == agent_name
        ]
        return messages

# 使用示例
comm = AgentCommunication()

# 协调者分配任务
comm.send_message(
    "Coordinator", 
    "Researcher", 
    "请收集 Python 最新版本的特性"
)

# 研究者返回结果
comm.send_message(
    "Researcher", 
    "Writer", 
    "已收集到 Python 3.12 的新特性数据"
)

# 写作者请求审核
comm.send_message(
    "Writer", 
    "Reviewer", 
    "请审核我写的文章草稿"
)`,language:"python",highlights:[8,17,23,34,39,45,51],filename:"agent_communication.py",description:"Agent 间的消息传递机制"}),e.jsx("h3",{id:"coordination-patterns",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3. 协作模式"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"常见的多 Agent 协作模式："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 mb-4 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"流水线模式"}),"：Agent 按顺序处理，上一个的输出是下一个的输入"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"并行模式"}),"：多个 Agent 同时处理不同子任务，最后合并结果"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"投票模式"}),"：多个 Agent 独立给出答案，通过投票决定最终结果"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"辩论模式"}),"：Agent 扮演不同角色进行辩论，达成最优解"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"层次模式"}),"：Manager Agent 管理多个 Worker Agent"]})]}),e.jsx("h2",{id:"workflow",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"工作流程"}),e.jsx(n,{title:"多 Agent 协作流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
用户: "写一篇关于 AI 发展的深度文章"
         │
         ▼
┌──────────────────┐
│ Coordinator      │ ← 分析任务，制定计划
│ "需要研究、写作   │
│  和审核三个步骤"  │
└────────┬─────────┘
         │ 分配任务
    ┌────┼────┐
    ▼    ▼    ▼
┌────┐┌────┐┌────┐
│Res.││Write││Rev.│ ← 并行/串行执行
│earch││ er ││iew │
└─┬──┘└─┬──┘└─┬──┘
  │     │     │
  └─────┼─────┘
        │
        ▼
┌──────────────────┐
│ 整合结果          │ ← Coordinator 汇总
│ 生成最终文章      │
└────────┬─────────┘
         │
         ▼
   返回给用户
            `})}),e.jsx("h2",{id:"implementation",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"实现示例"}),e.jsx(r,{code:`from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI

# 1. 定义 LLM
llm = ChatOpenAI(model="gpt-4o-mini")

# 2. 创建专业 Agent
researcher = Agent(
    role="高级研究员",
    goal="深入研究主题并提供准确的信息",
    backstory="你是经验丰富的研究员，擅长从多个来源收集和验证信息",
    llm=llm,
    verbose=True
)

writer = Agent(
    role="资深作家",
    goal="基于研究结果撰写高质量文章",
    backstory="你是专业作家，擅长将复杂信息转化为通俗易懂的文章",
    llm=llm,
    verbose=True
)

reviewer = Agent(
    role="内容审核员",
    goal="确保文章质量和准确性",
    backstory="你是严格的编辑，擅长发现错误并提出改进建议",
    llm=llm,
    verbose=True
)

# 3. 定义任务
research_task = Task(
    description="研究 AI 在 2024 年的重大突破",
    agent=researcher,
    expected_output="一份包含 5 个关键突破的研究笔记"
)

writing_task = Task(
    description="基于研究笔记撰写一篇 1000 字的文章",
    agent=writer,
    context=[research_task],  # 依赖研究任务的结果
    expected_output="一篇结构完整的文章"
)

review_task = Task(
    description="审核文章并提出改进建议",
    agent=reviewer,
    context=[writing_task],
    expected_output="审核后的最终版本"
)

# 4. 创建 Crew 并执行
crew = Crew(
    agents=[researcher, writer, reviewer],
    tasks=[research_task, writing_task, review_task],
    verbose=True
)

result = crew.kickoff()
print(result)`,language:"python",highlights:[8,16,24,33,40,47,55,62],filename:"crewai_example.py",description:"使用 CrewAI 框架实现多 Agent 系统"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"常见误区"}),e.jsx(t,{type:"danger",title:"误区 1：Agent 越多越好",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted",children:[e.jsx("strong",{children:"错误认知"}),"：增加 Agent 数量能线性提升效果。",e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：过多 Agent 带来协调开销、通信延迟和成本激增。通常 3-5 个专业 Agent 就够了。关键是",e.jsx("strong",{children:"合理分工"}),"而非数量堆砌，每个 Agent 应有明确的职责边界。"]})}),e.jsx(t,{type:"danger",title:"误区 2：不需要冲突解决机制",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted",children:[e.jsx("strong",{children:"错误认知"}),"：Agent 之间总能达成一致。",e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：不同 Agent 可能给出矛盾的建议。必须设计",e.jsx("strong",{children:"冲突解决策略"}),"：投票机制、优先级规则、仲裁 Agent 或人工介入。否则系统会陷入僵局或产生不一致的结果。"]})}),e.jsx(t,{type:"danger",title:"误区 3：忽略成本控制",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted",children:[e.jsx("strong",{children:"错误认知"}),"：多 Agent 系统的成本可以接受。",e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：N 个 Agent 意味着 N 倍的 LLM 调用成本。优化策略：",e.jsx("strong",{children:"① 选择性激活"}),"：只调用必要的 Agent；",e.jsx("strong",{children:"② 缓存结果"}),"：避免重复计算；",e.jsx("strong",{children:"③ 小模型优先"}),"：简单任务用小模型；",e.jsx("strong",{children:"④ 批量处理"}),"：合并请求减少 API 调用次数。"]})}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"面试真题"}),e.jsx(m,{questions:[{question:"多 Agent 系统相比单 Agent 的优势和劣势？",answer:"<strong>优势</strong>：① 专业化分工，每个 Agent 专注特定领域；② 并行处理，提升效率；③ 相互验证，提高可靠性；④ 模块化设计，易于扩展和维护。<strong>劣势</strong>：① 成本更高（多次 LLM 调用）；② 协调复杂度高；③ 延迟增加；④ 调试困难。适用场景：复杂、多维度、需要多种技能的任务。"},{question:"如何设计 Agent 之间的通信协议？",answer:"通信设计要点：<strong>① 消息格式</strong>：标准化的 JSON 结构，包含发送者、接收者、内容、时间戳；<strong>② 同步 vs 异步</strong>：简单任务用同步，耗时操作用异步；<strong>③ 广播 vs 点对点</strong>：全局通知用广播，任务分配用点对点；<strong>④ 消息队列</strong>：使用 Redis/RabbitMQ 解耦；<strong>⑤ 超时机制</strong>：防止无限等待；<strong>⑥ 日志记录</strong>：追踪消息流转便于调试。"},{question:"如何处理 Agent 执行失败的情况？",answer:"容错策略：<strong>① 重试机制</strong>：失败后自动重试（最多 3 次）；<strong>② 降级方案</strong>：主 Agent 失败时切换到备用 Agent；<strong>③ 超时控制</strong>：设置最大执行时间；<strong>④ 异常隔离</strong>：一个 Agent 失败不影响其他 Agent；<strong>⑤ 人工介入</strong>：关键任务失败时通知人类操作员；<strong>⑥ 状态回滚</strong>：失败时恢复到之前的稳定状态。"},{question:"多 Agent 系统如何保证一致性？",answer:"一致性保障：<strong>① 共享状态管理</strong>：使用中央状态存储（如 Redis），所有 Agent 读写同一数据源；<strong>② 事务机制</strong>：关键操作使用事务保证原子性；<strong>③ 版本控制</strong>：状态变更时维护版本号，检测冲突；<strong>④ 锁机制</strong>：并发访问时加锁防止竞态条件；<strong>⑤ 最终一致性</strong>：允许短暂不一致，通过定期同步达到一致。"},{question:"如何评估多 Agent 系统的性能？",answer:"评估维度：<strong>① 任务完成率</strong>：成功完成任务的比例；<strong>② 执行时间</strong>：从开始到结束的总时长；<strong>③ 成本效益</strong>：单位任务的成本；<strong>④ 协作效率</strong>：Agent 间通信次数和延迟；<strong>⑤ 结果质量</strong>：人工评分或与基准对比；<strong>⑥ 可扩展性</strong>：增加 Agent 后的性能变化。建议使用 A/B 测试对比单 Agent 和多 Agent 的表现。"}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"对比分析"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"特性"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"单 Agent"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"多 Agent"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"混合模式"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"复杂度"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"低"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"高"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"中"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"成本"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"低"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"高"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"中"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"可靠性"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"中"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"高"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"高"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"适用场景"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"简单任务"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"复杂协作"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"中等复杂度"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"开发难度"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"低"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"高"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"中"})]})]})]})}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"前置知识"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/agent-architecture",className:"text-primary hover:underline",children:"📖 Agent 架构设计"})}),e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/07-langchain-framework/workflow-design",className:"text-primary hover:underline",children:"📖 工作流设计"})})]})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"延伸阅读"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/tool-integration",className:"text-primary hover:underline",children:"🔗 工具集成与调用"})}),e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/memory-management",className:"text-primary hover:underline",children:"🔗 记忆管理"})})]})]})]}),e.jsx(l,{...i(s.category,s.id)})]})}),e.jsx(o,{items:g})]})}export{u as default};
