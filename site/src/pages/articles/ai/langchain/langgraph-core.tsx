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
  { id: 'stategraph', text: '一、StateGraph 基础', level: 2 },
  { id: 'node', text: '二、Node 节点', level: 2 },
  { id: 'edge', text: '三、Edge 边', level: 2 },
  { id: 'conditional-edge', text: '四、Conditional Edge', level: 2 },
  { id: 'start-end', text: '五、START / END', level: 2 },
  { id: 'state-management', text: '六、State 管理', level: 2 },
  { id: 'checkpoint', text: '七、Checkpoint 持久化', level: 2 },
  { id: 'interrupt', text: '八、Interrupt 中断', level: 2 },
  { id: 'human-in-loop', text: '九、Human-in-the-loop', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function LangGraphCore({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              LangGraph 是 LangChain 团队开发的<strong className="text-accent">有状态工作流编排框架</strong>，基于图论模型（Nodes + Edges）构建复杂的 Agent 系统，
              提供状态持久化、人工干预和循环控制能力，弥补了传统 Chain 线性执行的局限。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 LangGraph？">
            传统 LangChain Chain 是线性的（A → B → C），无法处理循环、条件分支和状态保持。LangGraph 通过图结构支持复杂的工作流模式，如 ReAct 循环、多 Agent 协作等。
          </Callout>

          <h2 id="stategraph" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、StateGraph 基础
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">StateGraph</code> 是 LangGraph 的核心类，定义了工作流的节点、边和状态 schema。
          </p>

          <Playground
            code={`from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

# 定义状态 schema
class AgentState(TypedDict):
    messages: Annotated[list, operator.add]  # 消息列表（累加）
    current_step: str  # 当前步骤
    result: str  # 最终结果

# 创建图
workflow = StateGraph(AgentState)

# 添加节点
def step_1(state: AgentState) -> AgentState:
    print("执行步骤 1")
    return {"current_step": "step_1", "messages": ["Step 1 completed"]}

def step_2(state: AgentState) -> AgentState:
    print("执行步骤 2")
    return {"current_step": "step_2", "messages": ["Step 2 completed"]}

workflow.add_node("step_1", step_1)
workflow.add_node("step_2", step_2)

# 添加边
workflow.add_edge("step_1", "step_2")
workflow.add_edge("step_2", END)

# 设置入口点
workflow.set_entry_point("step_1")

# 编译为可执行应用
app = workflow.compile()

# 执行
result = app.invoke({"messages": [], "current_step": "", "result": ""})
print(result)`}
            language="python"
            highlights={[6, 14, 28, 31, 34, 37]}
            filename="stategraph_basic.py"
            description="StateGraph 基础用法"
          />

          <DiagramBlock title="StateGraph 工作流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────┐     ┌──────────┐     ┌──────────┐     ┌─────┐
│  START  │────▶│  Node A  │────▶│  Node B  │────▶│ END │
└─────────┘     └──────────┘     └──────────┘     └─────┘
                     │                  │
                     ▼                  ▼
                Update State       Update State
            `}</pre>
          </DiagramBlock>

          <SideNote label="状态累加器">
            使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">Annotated[list, operator.add]</code> 可以让列表字段在每次节点更新时自动追加而非覆盖，适合累积对话历史。
          </SideNote>

          <h2 id="node" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Node 节点
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Node 是工作流中的执行单元，接收当前状态并返回状态更新（字典形式）。
          </p>

          <Playground
            code={`from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph

model = ChatOpenAI(model="gpt-4o-mini")

# Node 1：调用 LLM 生成回答
def llm_node(state: AgentState) -> AgentState:
    messages = state["messages"]
    response = model.invoke(messages)
    return {
        "messages": [response],  # 追加到消息列表
        "result": response.content
    }

# Node 2：验证结果质量
def validation_node(state: AgentState) -> AgentState:
    result = state["result"]
    
    # 简单验证：检查长度
    if len(result) < 10:
        return {"current_step": "retry", "messages": ["结果太短，重新生成"]}
    
    return {"current_step": "validated", "messages": ["验证通过"]}

# Node 3：后处理
def postprocess_node(state: AgentState) -> AgentState:
    result = state["result"]
    formatted = f"**最终答案**:\\n{result}"
    return {"result": formatted}`}
            language="python"
            highlights={[7, 18, 30]}
            filename="nodes.py"
            description="Node 定义示例"
          />

          <Callout type="info" title="Node 返回值规则">
            Node 必须返回一个字典，键对应 State 中定义的字段。未返回的字段保持不变，返回的字段会更新状态。使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">operator.add</code> 注解的列表字段会追加而非覆盖。
          </Callout>

          <h2 id="edge" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Edge 边
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Edge 定义节点间的流转关系，包括普通边（固定路径）和条件边（动态路由）。
          </p>

          <Playground
            code={`# 普通边：固定从 A 到 B
workflow.add_edge("node_a", "node_b")

# 多个前驱指向同一节点
workflow.add_edge("node_a", "merge_node")
workflow.add_edge("node_b", "merge_node")

# 条件边：根据状态动态选择下一节点
def route_based_on_step(state: AgentState) -> str:
    if state["current_step"] == "need_retry":
        return "retry_node"
    elif state["current_step"] == "completed":
        return "end_node"
    else:
        return "continue_node"

workflow.add_conditional_edges(
    source="decision_node",
    path=route_based_on_step,
    path_map={
        "retry_node": "retry_node",
        "end_node": END,
        "continue_node": "continue_node"
    }
)`}
            language="python"
            highlights={[2, 5, 6, 9, 17]}
            filename="edges.py"
            description="Edge 类型对比"
          />

          <h2 id="conditional-edge" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Conditional Edge
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            条件边实现工作流的分支逻辑，类似编程中的 if-else 或 switch-case。
          </p>

          <Playground
            code={`from langgraph.graph import StateGraph, END

def router(state: AgentState) -> str:
    """根据问题类型路由到不同专家"""
    last_message = state["messages"][-1].content
    
    if "代码" in last_message or "编程" in last_message:
        return "coding_expert"
    elif "数学" in last_message or "计算" in last_message:
        return "math_expert"
    else:
        return "general_expert"

workflow = StateGraph(AgentState)

# 添加专家节点
workflow.add_node("coding_expert", coding_agent)
workflow.add_node("math_expert", math_agent)
workflow.add_node("general_expert", general_agent)

# 添加条件路由
workflow.add_conditional_edges(
    source="router_node",
    path=router,
    path_map={
        "coding_expert": "coding_expert",
        "math_expert": "math_expert",
        "general_expert": "general_expert"
    }
)

# 所有专家都汇聚到同一结束节点
workflow.add_edge("coding_expert", END)
workflow.add_edge("math_expert", END)
workflow.add_edge("general_expert", END)`}
            language="python"
            highlights={[3, 22, 23, 24]}
            filename="conditional_edge.py"
            description="条件边实现路由"
          />

          <h2 id="start-end" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、START / END
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">START</code> 和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">END</code> 是 LangGraph 的特殊节点，标记工作流的入口和出口。
          </p>

          <Playground
            code={`from langgraph.graph import START, END

workflow = StateGraph(AgentState)

# 添加入口点（必须是第一个执行的节点）
workflow.set_entry_point("first_node")
# 等价于：workflow.add_edge(START, "first_node")

# 添加正常结束
workflow.add_edge("last_node", END)

# 多入口场景：根据初始状态选择不同起点
def choose_entry(state: AgentState) -> str:
    if state.get("skip_validation"):
        return "fast_path_node"
    else:
        return "full_path_node"

workflow.add_conditional_edges(
    source=START,
    path=choose_entry,
    path_map={
        "fast_path_node": "fast_path_node",
        "full_path_node": "full_path_node"
    }
)`}
            language="python"
            highlights={[6, 7, 10, 19]}
            filename="start_end.py"
            description="START/END 特殊节点"
          />

          <h2 id="state-management" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、State 管理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            State 是工作流的共享上下文，所有节点都可以读取和更新它。合理设计 State schema 是构建可靠工作流的关键。
          </p>

          <Playground
            code={`from typing import TypedDict, Annotated, Optional
import operator

# 复杂 State 示例
class ComplexState(TypedDict):
    # 消息历史（累加）
    messages: Annotated[list, operator.add]
    
    # 计数器（取最大值）
    retry_count: Annotated[int, max]
    
    # 标志位（直接覆盖）
    is_complete: bool
    
    # 可选字段
    error_message: Optional[str]
    
    # 嵌套结构
    metadata: dict
    
    # 中间结果缓存
    intermediate_results: dict

# 初始化 State
initial_state: ComplexState = {
    "messages": [],
    "retry_count": 0,
    "is_complete": False,
    "error_message": None,
    "metadata": {"user_id": "123"},
    "intermediate_results": {}
}

# 节点中更新 State
def update_state_node(state: ComplexState) -> ComplexState:
    return {
        "retry_count": state["retry_count"] + 1,
        "intermediate_results": {
            **state["intermediate_results"],
            "step_1_result": "some_value"
        }
    }`}
            language="python"
            highlights={[5, 25, 35]}
            filename="state_management.py"
            description="State Schema 设计"
          />

          <Callout type="warning" title="State 设计原则">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>最小化</strong>：只存储必要的状态，避免冗余</li>
              <li><strong>类型安全</strong>：使用 TypedDict 明确定义字段类型</li>
              <li><strong>不可变性</strong>：节点应返回新字典而非修改原状态</li>
              <li><strong>序列化友好</strong>：如需持久化，避免存储复杂对象</li>
            </ul>
          </Callout>

          <h2 id="checkpoint" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、Checkpoint 持久化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Checkpoint 机制保存工作流的中间状态，支持断点续传、时间旅行调试和人工干预。
          </p>

          <Playground
            code={`from langgraph.checkpoint.memory import MemorySaver
from langgraph.checkpoint.sqlite import SqliteSaver
import sqlite3

# 方式 1：内存存储（开发测试用）
memory_saver = MemorySaver()

# 方式 2：SQLite 持久化（轻量级生产环境）
conn = sqlite3.connect("checkpoints.db", check_same_thread=False)
sqlite_saver = SqliteSaver(conn)

# 编译时传入 saver
app = workflow.compile(checkpointer=sqlite_saver)

# 执行并保存状态
config = {"configurable": {"thread_id": "conversation_123"}}
result = app.invoke(initial_state, config=config)

# 从 checkpoint 恢复
saved_state = app.get_state(config)
print(saved_state.values)

# 继续执行（从上次中断处继续）
result = app.invoke(None, config=config)  # 传入 None 表示从 checkpoint 继续`}
            language="python"
            highlights={[6, 10, 13, 16, 20, 24]}
            filename="checkpoint.py"
            description="Checkpoint 持久化方案"
          />

          <SideNote label="Thread ID">
            <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">thread_id</code> 用于隔离不同会话的状态。多用户场景下，每个用户应有唯一的 thread_id，避免状态混淆。
          </SideNote>

          <h2 id="interrupt" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、Interrupt 中断
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Interrupt 允许在特定节点暂停工作流，等待外部输入（如人工审核、API 调用结果）后继续执行。
          </p>

          <Playground
            code={`from langgraph.graph import StateGraph, END

# 定义需要人工审核的节点
def review_node(state: AgentState) -> AgentState:
    # 这个节点会触发中断
    return state

workflow = StateGraph(AgentState)
workflow.add_node("review", review_node)
workflow.add_edge(START, "review")
workflow.add_edge("review", END)

# 编译时指定中断点
app = workflow.compile(interrupt_before=["review"])

# 执行到中断点
config = {"configurable": {"thread_id": "task_456"}}
app.invoke(initial_state, config=config)

# 检查工作流状态
state = app.get_state(config)
print(f"当前节点: {state.next}")  # 输出: ['review']

# 人工审核后继续
approved_state = {
    **state.values,
    "approved": True,
    "reviewer_comment": "内容合规"
}

# 从中断点继续执行
result = app.invoke(approved_state, config=config)`}
            language="python"
            highlights={[14, 18, 22, 26, 32]}
            filename="interrupt.py"
            description="Interrupt 中断机制"
          />

          <h2 id="human-in-loop" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、Human-in-the-loop
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Human-in-the-loop（HITL）模式将人工决策融入自动化工作流，适用于高风险场景（如内容审核、金融交易）。
          </p>

          <Playground
            code={`# 完整 HITL 流程示例
from langgraph.graph import StateGraph, END

def generate_response(state: AgentState) -> AgentState:
    """LLM 生成回答"""
    response = model.invoke(state["messages"])
    return {"messages": [response], "draft": response.content}

def human_review(state: AgentState) -> AgentState:
    """等待人工审核（通过 interrupt 实现）"""
    return state

def publish_or_revise(state: AgentState) -> AgentState:
    """根据审核结果决定发布或修改"""
    if state.get("approved"):
        return {"status": "published", "final_output": state["draft"]}
    else:
        return {"status": "revised", "messages": ["请重新生成"]}

workflow = StateGraph(AgentState)
workflow.add_node("generate", generate_response)
workflow.add_node("review", human_review)
workflow.add_node("publish", publish_or_revise)

workflow.add_edge(START, "generate")
workflow.add_edge("generate", "review")
workflow.add_edge("review", "publish")
workflow.add_edge("publish", END)

# 在 review 节点前中断
app = workflow.compile(interrupt_before=["review"])

# 第 1 步：自动生成草稿
config = {"configurable": {"thread_id": "hitl_789"}}
app.invoke({"messages": ["用户问题..."]}, config=config)

# 第 2 步：人工审核（前端展示 draft，用户点击批准/拒绝）
# ... 前端交互代码 ...

# 第 3 步：根据审核结果继续
if user_approved:
    continuation = {"approved": True}
else:
    continuation = {"approved": False}

result = app.invoke(continuation, config=config)
print(result["status"])  # published 或 revised`}
            language="python"
            highlights={[20, 32, 36, 40, 45]}
            filename="human_in_loop.py"
            description="Human-in-the-loop 完整流程"
          />

          <Callout type="tip" title="HITL 应用场景">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>内容审核</strong>：AI 生成内容需人工确认后才能发布</li>
              <li><strong>医疗诊断</strong>：AI 辅助诊断需医生最终确认</li>
              <li><strong>金融风控</strong>：异常交易需人工复核</li>
              <li><strong>法律文档</strong>：合同条款需律师审核</li>
            </ul>
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="danger" title="误区 1：State 越大越好">
            <p className="mb-2"><strong>错误认知</strong>：认为在 State 中存储越多信息越有利于节点间通信。</p>
            <p><strong>正确理解</strong>：过大的 State 会增加序列化开销（影响 Checkpoint 性能）和内存占用。应遵循"按需存储"原则，只在 State 中保留跨节点共享的数据，临时变量应在节点内部处理。</p>
          </Callout>

          <Callout type="danger" title="误区 2：所有节点都需要持久化">
            <p className="mb-2"><strong>错误认知</strong>：认为启用 Checkpoint 后所有状态都会自动保存。</p>
            <p><strong>正确理解</strong>：Checkpoint 只在节点执行完成后保存状态。如果节点执行中途崩溃，该节点的更新不会保存。关键操作应在独立节点中完成，确保原子性。</p>
          </Callout>

          <Callout type="danger" title="误区 3：Interrupt 可以随意插入">
            <p className="mb-2"><strong>错误认知</strong>：认为在任何节点前都可以设置中断。</p>
            <p><strong>正确理解</strong>：Interrupt 应在明确的决策点设置（如审核、确认）。过多中断会导致用户体验碎片化。建议仅在高风险操作前设置中断，并提供清晰的恢复指引。</p>
          </Callout>

          <Callout type="warning" title="误区 4：条件边不需要默认分支">
            <p className="mb-2"><strong>错误认知</strong>：认为条件判断总能匹配某个分支。</p>
            <p><strong>正确理解</strong>：必须提供默认分支处理未预期的情况，否则工作流会卡住。使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">path_map</code> 明确映射所有可能的返回值，或在使用条件函数时包含 else 分支。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "LangGraph 相比传统 LangChain Chain 的优势是什么？",
              answer: "① 支持循环和条件分支（图结构 vs 线性结构）；② 内置状态管理和持久化（Checkpoint）；③ 支持人工干预（Interrupt/HITL）；④ 更好的可视化和调试能力；⑤ 原生支持多 Agent 协作。传统 Chain 适合简单流水线，LangGraph 适合复杂工作流。"
            },
            {
              question: "State 中的 Annotated[list, operator.add] 有什么作用？",
              answer: "这定义了字段的合并策略。operator.add 表示每次节点返回该字段时，会将新值追加到现有列表而非覆盖。这对于累积对话历史、日志记录等场景非常有用。其他合并策略包括 operator.max（取最大值）、lambda a, b: b（覆盖）等。"
            },
            {
              question: "如何实现工作流的断点续传？",
              answer: "① 编译时传入 checkpointer（如 SqliteSaver）；② 执行时提供 thread_id 标识会话；③ 工作流中断后，状态自动保存到 checkpoint；④ 使用相同的 thread_id 再次调用 invoke(None, config)，会从上次中断处继续执行。关键是保持 thread_id 一致。"
            },
            {
              question: "Interrupt 和条件边的区别是什么？",
              answer: "Interrupt 是外部触发的暂停，等待人工或异步事件介入后手动恢复；条件边是内部逻辑决定的自动路由，根据状态立即选择下一节点。Interrupt 用于人机协作，条件边用于自动化决策。"
            },
            {
              question: "如何设计一个支持重试的工作流？",
              answer: "① State 中包含 retry_count 字段；② 失败节点返回时增加计数；③ 使用条件边判断：如果 retry_count < max_retries，回到失败节点重试；否则进入错误处理节点。注意设置最大重试次数避免无限循环。"
            },
            {
              question: "LangGraph 如何实现多 Agent 协作？",
              answer: "为每个 Agent 创建独立节点，通过 State 传递消息和任务。可以使用 Supervisor Agent 节点协调子 Agent 的执行顺序，或使用条件边根据任务类型路由到专业 Agent。所有 Agent 共享同一 StateGraph，通过 State 实现上下文同步。"
            },
            {
              question: "Checkpoint 的性能优化策略有哪些？",
              answer: "① 使用高性能存储后端（PostgreSQL > SQLite > Memory）；② 精简 State，避免存储大对象；③ 定期清理过期 checkpoint；④ 异步写入 checkpoint（不阻塞主流程）；⑤ 对频繁更新的字段使用增量保存而非全量保存。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/07-langchain-framework/langchain-advanced" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">LangChain 进阶</div>
              <div className="text-[12px] text-ink-muted mt-1">LCEL、Runnable 组合</div>
            </a>
            <a href="/docs/07-langchain-framework/agent-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">应用场景 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">Agent 设计模式</div>
              <div className="text-[12px] text-ink-muted mt-1">ReAct、Planner、Router Agent</div>
            </a>
            <a href="/docs/07-langchain-framework/workflow-design" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">高级主题 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">Workflow 设计</div>
              <div className="text-[12px] text-ink-muted mt-1">DAG、容错、持久化</div>
            </a>
            <a href="/docs/06-ai-fundamentals/function-calling" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Function Calling</div>
              <div className="text-[12px] text-ink-muted mt-1">工具调用与 Agent 集成</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            LangGraph 的学习曲线较陡，建议通过实际项目练习：① 从简单的线性工作流开始；② 逐步添加条件分支和循环；③ 实践 Checkpoint 和 Interrupt；④ 最后尝试多 Agent 协作场景。官方文档提供了丰富的示例代码。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
