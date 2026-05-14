import SmartTOC from '../../components/knowledge/SmartTOC'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'
import Playground from '../../components/knowledge/Playground'
import SideNote from '../../components/knowledge/SideNote'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '整体架构', level: 2 },
  { id: 'core-concepts', text: '核心概念', level: 2 },
  { id: 'agent-roles', text: 'Agent 角色分工', level: 3 },
  { id: 'communication', text: '智能体通信机制', level: 3 },
  { id: 'coordination', text: '协调与决策', level: 3 },
  { id: 'task-decomposition', text: '任务分解策略', level: 3 },
  { id: 'workflow', text: '协作工作流程', level: 2 },
  { id: 'code-example', text: '代码实战', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '框架对比', level: 2 },
  { id: 'related', text: '关联知识点', level: 2 },
]

export default function MultiAgentCollaboration({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <div className="knowledge-layout" data-meta={JSON.stringify(meta)}>
          {/* 一句话定义 */}
          <section id="definition" className="mb-8">
            <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 pl-4 py-3 rounded-r-lg">
              <p className="text-[15px] sm:text-base leading-relaxed text-ink font-medium">
                Multi-Agent（多智能体）系统是由<strong>多个 autonomous agent（自主智能体）</strong>组成的分布式 AI 系统，通过<strong>任务分解、角色分工、协同决策</strong>解决复杂问题，模拟人类团队协作的工作模式。
              </p>
            </blockquote>
          </section>

          {/* 整体架构 */}
          <section id="overview" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              整体架构
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Multi-Agent 系统的核心思想是<strong>"分而治之"</strong>，将复杂任务拆解为子任务，由专业化的智能体分别处理，最终整合结果：
            </p>
            <DiagramBlock title="Multi-Agent 系统架构">
              {`graph TB
    subgraph User_Layer[用户层]
        U[用户请求]
    end
    
    subgraph Orchestrator_Layer[编排层]
        CO[Coordinator Agent<br/>协调者]
        TD[Task Decomposer<br/>任务分解器]
    end
    
    subgraph Worker_Layer[执行层]
        A1[Researcher Agent<br/>研究员]
        A2[Coder Agent<br/>程序员]
        A3[Reviewer Agent<br/>审核员]
        A4[Writer Agent<br/>写作者]
    end
    
    subgraph Resource_Layer[资源层]
        DB[(知识库)]
        API[外部工具/API]
        LLM[LLM Backend]
    end
    
    U --> CO
    CO --> TD
    TD --> A1
    TD --> A2
    TD --> A3
    TD --> A4
    
    A1 --> DB
    A2 --> API
    A3 --> LLM
    A4 --> LLM
    
    A1 --> CO
    A2 --> CO
    A3 --> CO
    A4 --> CO
    
    CO --> U
    
    style User_Layer fill:#e1f5ff
    style Orchestrator_Layer fill:#fff3cd
    style Worker_Layer fill:#d4edda
    style Resource_Layer fill:#f8d7da`}
            </DiagramBlock>
            <SideNote label="设计哲学">
              Multi-Agent 系统模仿人类团队的协作模式：有项目经理（Coordinator）、领域专家（Worker Agents）、共享资源（Knowledge Base），通过沟通和协调完成复杂任务。
            </SideNote>
          </section>

          {/* 核心概念 */}
          <section id="core-concepts" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              核心概念
            </h2>

            <h3 id="agent-roles" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              Agent 角色分工
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              在 Multi-Agent 系统中，每个 Agent 扮演特定角色，具备专属技能和职责：
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-[14px]">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">角色</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">职责</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">技能</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Coordinator</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">任务分配、进度监控、结果整合</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">项目管理、优先级判断</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Researcher</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">信息检索、资料收集、事实核查</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">搜索、知识图谱查询</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Coder</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">代码生成、调试、优化</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">编程、算法设计</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Reviewer</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">质量检查、错误检测、改进建议</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">代码审查、逻辑验证</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Writer</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">文档撰写、报告生成、内容润色</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">自然语言生成、格式化</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 id="communication" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              智能体通信机制
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Agent 之间通过<strong>消息传递</strong>进行通信，常见的通信模式包括：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong>点对点通信</strong>：两个 Agent 直接交换信息，适合简单协作</li>
              <li><strong>广播通信</strong>：一个 Agent 向多个 Agent 发送消息，适合任务分发</li>
              <li><strong>黑板模型</strong>：所有 Agent 共享一个公共工作区（Blackboard），读写中间结果</li>
              <li><strong>发布-订阅</strong>：Agent 订阅感兴趣的事件，事件触发时自动通知</li>
            </ul>
            <Playground
              language="python"
              description="Agent 间消息传递示例（基于 LangGraph）"
              code={`from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

# 定义状态结构
class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    current_agent: str
    task_result: dict

# 定义各个 Agent 节点
def researcher_agent(state: AgentState):
    """研究员：收集信息"""
    query = state['messages'][-1]
    # 模拟搜索操作
    research_data = {"sources": ["source1", "source2"], "facts": ["fact1", "fact2"]}
    return {
        "messages": [f"[Researcher] Found: {research_data}"],
        "task_result": research_data
    }

def coder_agent(state: AgentState):
    """程序员：编写代码"""
    requirements = state['task_result']
    # 模拟代码生成
    code = "def solution():\n    return 'optimized_code'"
    return {
        "messages": [f"[Coder] Generated: {code}"],
        "task_result": {"code": code}
    }

def reviewer_agent(state: AgentState):
    """审核员：质量检查"""
    code = state['task_result'].get('code', '')
    # 模拟代码审查
    review_result = {"issues": [], "approved": True}
    return {
        "messages": [f"[Reviewer] Approved: {review_result}"],
        "task_result": {"review": review_result}
    }

# 构建工作流
workflow = StateGraph(AgentState)
workflow.add_node("researcher", researcher_agent)
workflow.add_node("coder", coder_agent)
workflow.add_node("reviewer", reviewer_agent)

# 定义流转逻辑
workflow.set_entry_point("researcher")
workflow.add_edge("researcher", "coder")
workflow.add_edge("coder", "reviewer")
workflow.add_edge("reviewer", END)

app = workflow.compile()

# 执行
result = app.invoke({"messages": ["Build a web scraper"], "current_agent": "researcher"})
print(result['messages'])`}
            />

            <h3 id="coordination" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              协调与决策
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Coordinator Agent 负责全局协调，关键决策包括：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong>任务分配</strong>：根据 Agent 专长和当前负载分配子任务</li>
              <li><strong>冲突解决</strong>：当多个 Agent 产生矛盾结果时，采用投票、加权平均或人工介入</li>
              <li><strong>超时控制</strong>：设置每个 Agent 的执行时限，避免无限等待</li>
              <li><strong>结果整合</strong>：汇总各 Agent 的输出，生成最终答案</li>
            </ul>

            <h3 id="task-decomposition" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              任务分解策略
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              有效的任务分解是 Multi-Agent 系统成功的关键，常见策略包括：
            </p>
            <div className="space-y-4">
              <Callout type="info" title="顺序分解（Sequential）">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  将任务拆分为线性步骤，每个 Agent 依次执行。例如：研究 → 编码 → 测试 → 部署。优点是流程清晰，缺点是串行执行效率低。
                </p>
              </Callout>
              <Callout type="info" title="并行分解（Parallel）">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  将独立子任务分配给多个 Agent 同时执行。例如：同时分析多个数据源。优点是速度快，缺点是需要处理结果合并。
                </p>
              </Callout>
              <Callout type="info" title="层次分解（Hierarchical）">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  递归地将大任务分解为子任务，形成树状结构。顶层 Agent 负责高层规划，底层 Agent 负责具体执行。适合超大规模任务。
                </p>
              </Callout>
            </div>
          </section>

          {/* 协作工作流程 */}
          <section id="workflow" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              协作工作流程
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              典型的 Multi-Agent 协作流程包含以下阶段：
            </p>
            <DiagramBlock title="Multi-Agent 协作流程">
              {`sequenceDiagram
    participant User as 用户
    participant Coord as Coordinator
    participant Decomposer as Task Decomposer
    participant Agent1 as Researcher
    participant Agent2 as Coder
    participant Agent3 as Reviewer
    
    User->>Coord: 1. 提交复杂任务
    Coord->>Decomposer: 2. 请求任务分解
    Decomposer-->>Coord: 3. 返回子任务列表
    Coord->>Agent1: 4. 分配研究任务
    Coord->>Agent2: 5. 分配编码任务
    Agent1->>Agent1: 6. 执行研究
    Agent2->>Agent2: 7. 编写代码
    Agent1-->>Coord: 8. 返回研究成果
    Agent2-->>Coord: 9. 返回代码
    Coord->>Agent3: 10. 请求审核
    Agent3->>Agent3: 11. 质量检查
    Agent3-->>Coord: 12. 返回审核结果
    Coord->>Coord: 13. 整合所有结果
    Coord-->>User: 14. 返回最终答案`}
            </DiagramBlock>
          </section>

          {/* 代码实战 */}
          <section id="code-example" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              代码实战：构建多智能体协作系统
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              以下示例展示如何使用 AutoGen 框架构建一个多智能体协作系统，实现自动化代码开发流程：
            </p>
            <Playground
              language="python"
              description="基于 AutoGen 的多智能体协作示例"
              code={`import autogen
from autogen import AssistantAgent, UserProxyAgent

# 配置 LLM
config_list = [
    {
        "model": "gpt-4",
        "api_key": "your-api-key"
    }
]

llm_config = {"config_list": config_list, "temperature": 0.7}

# 创建各个 Agent
assistant = AssistantAgent(
    name="Assistant",
    llm_config=llm_config,
    system_message="You are a helpful AI assistant."
)

coder = AssistantAgent(
    name="Coder",
    llm_config=llm_config,
    system_message="""You are a professional software engineer. 
Write clean, efficient code with proper error handling.
Always include docstrings and comments."""
)

reviewer = AssistantAgent(
    name="Reviewer",
    llm_config=llm_config,
    system_message="""You are a senior code reviewer.
Check for:
1. Code correctness
2. Performance issues
3. Security vulnerabilities
4. Best practices
Provide constructive feedback."""
)

user_proxy = UserProxyAgent(
    name="User_Proxy",
    human_input_mode="TERMINATE",
    max_consecutive_auto_reply=10,
    code_execution_config={"work_dir": "coding"},
    system_message="A human user who initiates tasks."
)

# 定义任务
task = """
Create a Python script that:
1. Reads a CSV file
2. Performs data cleaning (handle missing values, duplicates)
3. Generates summary statistics
4. Saves the cleaned data to a new CSV file
"""

# 启动协作流程
# 第一步：用户发起任务
user_proxy.initiate_chat(
    assistant,
    message=task
)

# 第二步：助手协调其他 Agent
# （在实际应用中，可以通过 GroupChat 实现多 Agent 协作）

groupchat = autogen.GroupChat(
    agents=[user_proxy, assistant, coder, reviewer],
    messages=[],
    max_round=20
)

manager = autogen.GroupChatManager(
    groupchat=groupchat,
    llm_config=llm_config
)

user_proxy.initiate_chat(
    manager,
    message=task
)`}
            />
            <SideNote label="AutoGen 框架">
              AutoGen 是微软开源的多智能体框架，提供了 GroupChat、NestedChat 等高级抽象，简化了多 Agent 协作的开发。相比 LangChain，AutoGen 更专注于多智能体场景。
            </SideNote>
          </section>

          {/* 常见误区 */}
          <section id="misconceptions" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              常见误区
            </h2>
            
            <Callout type="danger" title="误区 1：Agent 越多越好">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                <strong>事实</strong>：过多的 Agent 会增加通信开销和协调复杂度，反而降低效率。最佳实践是根据任务复杂度选择 2-5 个专业化 Agent，而非盲目增加数量。关键在于<strong>角色分工明确</strong>，而非数量多少。
              </p>
            </Callout>

            <Callout type="danger" title="误区 2：Multi-Agent 总是比单 Agent 强大">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                <strong>事实</strong>：对于简单任务，单 Agent 更高效（无通信开销）。Multi-Agent 的优势体现在<strong>复杂任务分解</strong>和<strong>并行处理</strong>上。如果任务不需要分工协作，使用单 Agent 即可。
              </p>
            </Callout>

            <Callout type="danger" title="误区 3：Agent 之间可以无缝协作">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                <strong>事实</strong>：Agent 间的通信需要精心设计。常见问题包括：消息格式不一致、上下文丢失、循环依赖、死锁。必须定义清晰的<strong>通信协议</strong>和<strong>状态管理机制</strong>，否则协作会失败。
              </p>
            </Callout>

            <Callout type="warning" title="误区 4：忽略 Agent 的独立性">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                <strong>事实</strong>：每个 Agent 应该是<strong>autonomous（自主的）</strong>，有自己的目标、知识和决策能力。如果只是简单地串联多个 LLM 调用，那不是真正的 Multi-Agent 系统，而是管道（Pipeline）。真正的 Multi-Agent 允许 Agent 自主决策和动态调整策略。
              </p>
            </Callout>
          </section>

          {/* 面试真题 */}
          <section id="interview" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              面试真题
            </h2>
            <InterviewSection
              questions={[
                {
                  question: "什么是 Multi-Agent 系统？与单 Agent 系统有什么区别？",
                  answer: "Multi-Agent 系统是由多个自主智能体组成的分布式 AI 系统，通过任务分解、角色分工、协同决策解决复杂问题。与单 Agent 的区别：(1) 架构不同：单 Agent 是集中式，Multi-Agent 是分布式；(2) 能力不同：单 Agent 受限于单一模型的能力，Multi-Agent 通过专业化分工突破能力边界；(3) 适用场景不同：单 Agent 适合简单任务，Multi-Agent 适合复杂、多维度任务；(4) 复杂度不同：Multi-Agent 需要处理通信、协调、冲突解决等问题。"
                },
                {
                  question: "Multi-Agent 系统中的任务分解有哪些策略？",
                  answer: "主要策略包括：(1) 顺序分解（Sequential）：将任务拆分为线性步骤，依次执行，流程清晰但效率低；(2) 并行分解（Parallel）：将独立子任务分配给多个 Agent 同时执行，速度快但需处理结果合并；(3) 层次分解（Hierarchical）：递归地将大任务分解为子任务，形成树状结构，适合超大规模任务；(4) 基于能力的分解：根据 Agent 的专长分配任务，最大化利用各 Agent 的优势。选择策略需权衡任务特性、Agent 能力和性能要求。"
                },
                {
                  question: "如何解决 Multi-Agent 系统中的冲突问题？",
                  answer: "冲突解决策略包括：(1) 投票机制：多个 Agent 对同一问题给出不同答案时，采用多数票决定；(2) 加权平均：根据 Agent 的历史表现或可信度赋予权重，加权计算最终结果；(3) 仲裁者模式：引入专门的仲裁 Agent，负责判断和决策；(4) 人工介入：当自动决策不可靠时，交由人类专家判断；(5) 共识算法：类似分布式系统中的 Paxos、Raft，确保所有 Agent 达成一致。选择策略需考虑冲突类型、紧迫性和准确性要求。"
                },
                {
                  question: "Multi-Agent 系统的通信机制有哪些？各自的优缺点是什么？",
                  answer: "主要通信机制：(1) 点对点通信：直接交换信息，简单高效，但不适合多方协作；(2) 广播通信：一对多发送，适合任务分发，但可能产生冗余消息；(3) 黑板模型：共享公共工作区，灵活性强，但存在并发访问问题；(4) 发布-订阅：事件驱动，解耦性好，但需要维护订阅关系。优缺点权衡：点对点最简单但扩展性差，黑板最灵活但实现复杂，发布-订阅最适合异步场景但延迟较高。"
                },
                {
                  question: "AutoGen 和 LangGraph 在多智能体支持上有何区别？",
                  answer: "区别：(1) 定位不同：AutoGen 专为多智能体设计，提供 GroupChat、NestedChat 等原生支持；LangGraph 是 LangChain 的状态图扩展，侧重工作流编排。(2) 抽象层级不同：AutoGen 提供高层 Agent 抽象，开箱即用；LangGraph 需要手动定义状态和边，更灵活但更复杂。(3) 适用场景不同：AutoGen 适合快速构建多 Agent 应用；LangGraph 适合精细控制执行流程。(4) 生态不同：AutoGen 是微软出品，与 Azure 集成好；LangGraph 属于 LangChain 生态，社区更大。选择建议：纯多 Agent 场景选 AutoGen，需要复杂工作流选 LangGraph。"
                },
                {
                  question: "如何评估 Multi-Agent 系统的性能？",
                  answer: "评估维度包括：(1) 任务完成率：系统成功完成任务的比例；(2) 执行时间：从任务提交到结果返回的总时长；(3) 资源消耗：API 调用次数、token 消耗、计算资源；(4) 结果质量：答案准确性、完整性、一致性；(5) 可扩展性：增加 Agent 数量时的性能变化；(6) 鲁棒性：面对异常输入或 Agent 失败时的容错能力。常用指标：成功率、平均响应时间、token 效率（输出质量/token 数）、Agent 利用率（活跃时间/总时间）。"
                }
              ]}
            />
          </section>

          {/* 框架对比 */}
          <section id="comparison" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              主流框架对比
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              目前主流的多智能体框架各有特色：
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-[14px]">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">框架</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">开发方</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">核心特性</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">适用场景</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">AutoGen</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Microsoft</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">GroupChat、Code Execution、Human-in-the-loop</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">代码生成、自动化任务、对话系统</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">LangGraph</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">LangChain</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">State Graph、Cycle Support、Persistence</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">复杂工作流、状态管理、长期运行任务</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">CrewAI</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Community</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Role-based、Task Delegation、Process Flow</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">角色扮演、任务委派、业务流程自动化</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">MetaGPT</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">DeepWisdom</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">SOP-based、Software Company Simulation</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">软件开发、项目管理、标准化流程</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">ChatDev</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">OpenBMB</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Chat Chain、Software Development Lifecycle</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">软件开发生命周期、需求分析到部署</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Callout type="info" title="选择建议">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                如果需要快速原型验证，推荐 <strong>AutoGen</strong>（文档完善、社区活跃）；如果需要精细控制工作流，推荐 <strong>LangGraph</strong>（灵活性高）；如果关注角色扮演的业务场景，推荐 <strong>CrewAI</strong>（易用性好）。
              </p>
            </Callout>
          </section>

          {/* 关联知识点 */}
          <section id="related" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              关联知识点
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🤖 Agent 架构设计</h3>
                <p className="text-[14px] text-ink-muted">深入学习单个 Agent 的内部结构和设计模式</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🔗 LangGraph 工作流</h3>
                <p className="text-[14px] text-ink-muted">掌握状态图编排和循环工作流设计</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors">
                <h3 className="font-semibold text-ink mb-2">👥 CrewAI 框架</h3>
                <p className="text-[14px] text-ink-muted">了解基于角色的任务委派和流程管理</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🏢 MetaGPT 软件公司</h3>
                <p className="text-[14px] text-ink-muted">探索标准化流程和多角色协作模式</p>
              </div>
            </div>
          </section>

          {/* ⚠️ ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </div>
      </div>
      
      {/* ⚠️ SmartTOC 直接渲染，不要用 <aside> 包裹！ */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
