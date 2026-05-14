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

export default function MultiAgentSystems({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              多智能体系统（Multi-Agent Systems）是由<strong className="text-accent">多个 AI Agent 协同工作</strong>的架构模式，通过任务分解、角色分工和协作机制，解决单个 Agent 无法处理的复杂问题，实现 1+1&gt;2 的效果。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要多智能体？">
            复杂任务往往需要多种技能和视角。单 Agent 容易陷入思维定式或能力瓶颈。多 Agent 系统通过专业化分工、并行处理和相互验证，能显著提升任务完成质量和效率。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            整体架构
          </h2>

          <DiagramBlock title="多智能体协作架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
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
            `}</pre>
          </DiagramBlock>

          <SideNote label="典型应用场景">
            多 Agent 系统适合：<strong>软件开发</strong>（规划、编码、测试分工）、<strong>内容创作</strong>（研究、写作、编辑协作）、<strong>数据分析</strong>（数据收集、分析、可视化配合）、<strong>客户服务</strong>（分类、解答、升级处理）。
          </SideNote>

          <h2 id="core" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            核心原理
          </h2>

          <h3 id="task-decomposition" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1. 任务分解与分配
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            将复杂任务拆解为子任务，根据 Agent 专长分配：
          </p>

          <Playground
            code={`from langgraph.graph import StateGraph, END
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
    }`}
            language="python"
            highlights={[12, 28, 39, 50, 61]}
            filename="multi_agent_decomposition.py"
            description="多 Agent 任务分解与分配"
          />

          <h3 id="agent-communication" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2. Agent 间通信
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Agent 之间通过消息传递进行协作：
          </p>

          <Playground
            code={`from langchain_core.messages import HumanMessage, AIMessage

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
)`}
            language="python"
            highlights={[8, 17, 23, 34, 39, 45, 51]}
            filename="agent_communication.py"
            description="Agent 间的消息传递机制"
          />

          <h3 id="coordination-patterns" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3. 协作模式
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            常见的多 Agent 协作模式：
          </p>

          <ul className="list-disc list-inside space-y-2 mb-4 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
            <li><strong>流水线模式</strong>：Agent 按顺序处理，上一个的输出是下一个的输入</li>
            <li><strong>并行模式</strong>：多个 Agent 同时处理不同子任务，最后合并结果</li>
            <li><strong>投票模式</strong>：多个 Agent 独立给出答案，通过投票决定最终结果</li>
            <li><strong>辩论模式</strong>：Agent 扮演不同角色进行辩论，达成最优解</li>
            <li><strong>层次模式</strong>：Manager Agent 管理多个 Worker Agent</li>
          </ul>

          <h2 id="workflow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            工作流程
          </h2>

          <DiagramBlock title="多 Agent 协作流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
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
            `}</pre>
          </DiagramBlock>

          <h2 id="implementation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            实现示例
          </h2>

          <Playground
            code={`from crewai import Agent, Task, Crew
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
print(result)`}
            language="python"
            highlights={[8, 16, 24, 33, 40, 47, 55, 62]}
            filename="crewai_example.py"
            description="使用 CrewAI 框架实现多 Agent 系统"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            常见误区
          </h2>

          <Callout type="danger" title="误区 1：Agent 越多越好">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted">
              <strong>错误认知</strong>：增加 Agent 数量能线性提升效果。<br/>
              <strong>实际情况</strong>：过多 Agent 带来协调开销、通信延迟和成本激增。通常 3-5 个专业 Agent 就够了。关键是<strong>合理分工</strong>而非数量堆砌，每个 Agent 应有明确的职责边界。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：不需要冲突解决机制">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted">
              <strong>错误认知</strong>：Agent 之间总能达成一致。<br/>
              <strong>实际情况</strong>：不同 Agent 可能给出矛盾的建议。必须设计<strong>冲突解决策略</strong>：投票机制、优先级规则、仲裁 Agent 或人工介入。否则系统会陷入僵局或产生不一致的结果。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：忽略成本控制">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted">
              <strong>错误认知</strong>：多 Agent 系统的成本可以接受。<br/>
              <strong>实际情况</strong>：N 个 Agent 意味着 N 倍的 LLM 调用成本。优化策略：<strong>① 选择性激活</strong>：只调用必要的 Agent；<strong>② 缓存结果</strong>：避免重复计算；<strong>③ 小模型优先</strong>：简单任务用小模型；<strong>④ 批量处理</strong>：合并请求减少 API 调用次数。
            </p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "多 Agent 系统相比单 Agent 的优势和劣势？",
                answer: "<strong>优势</strong>：① 专业化分工，每个 Agent 专注特定领域；② 并行处理，提升效率；③ 相互验证，提高可靠性；④ 模块化设计，易于扩展和维护。<strong>劣势</strong>：① 成本更高（多次 LLM 调用）；② 协调复杂度高；③ 延迟增加；④ 调试困难。适用场景：复杂、多维度、需要多种技能的任务。"
              },
              {
                question: "如何设计 Agent 之间的通信协议？",
                answer: "通信设计要点：<strong>① 消息格式</strong>：标准化的 JSON 结构，包含发送者、接收者、内容、时间戳；<strong>② 同步 vs 异步</strong>：简单任务用同步，耗时操作用异步；<strong>③ 广播 vs 点对点</strong>：全局通知用广播，任务分配用点对点；<strong>④ 消息队列</strong>：使用 Redis/RabbitMQ 解耦；<strong>⑤ 超时机制</strong>：防止无限等待；<strong>⑥ 日志记录</strong>：追踪消息流转便于调试。"
              },
              {
                question: "如何处理 Agent 执行失败的情况？",
                answer: "容错策略：<strong>① 重试机制</strong>：失败后自动重试（最多 3 次）；<strong>② 降级方案</strong>：主 Agent 失败时切换到备用 Agent；<strong>③ 超时控制</strong>：设置最大执行时间；<strong>④ 异常隔离</strong>：一个 Agent 失败不影响其他 Agent；<strong>⑤ 人工介入</strong>：关键任务失败时通知人类操作员；<strong>⑥ 状态回滚</strong>：失败时恢复到之前的稳定状态。"
              },
              {
                question: "多 Agent 系统如何保证一致性？",
                answer: "一致性保障：<strong>① 共享状态管理</strong>：使用中央状态存储（如 Redis），所有 Agent 读写同一数据源；<strong>② 事务机制</strong>：关键操作使用事务保证原子性；<strong>③ 版本控制</strong>：状态变更时维护版本号，检测冲突；<strong>④ 锁机制</strong>：并发访问时加锁防止竞态条件；<strong>⑤ 最终一致性</strong>：允许短暂不一致，通过定期同步达到一致。"
              },
              {
                question: "如何评估多 Agent 系统的性能？",
                answer: "评估维度：<strong>① 任务完成率</strong>：成功完成任务的比例；<strong>② 执行时间</strong>：从开始到结束的总时长；<strong>③ 成本效益</strong>：单位任务的成本；<strong>④ 协作效率</strong>：Agent 间通信次数和延迟；<strong>⑤ 结果质量</strong>：人工评分或与基准对比；<strong>⑥ 可扩展性</strong>：增加 Agent 后的性能变化。建议使用 A/B 测试对比单 Agent 和多 Agent 的表现。"
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
                  <th className="border border-gray-300 px-4 py-2 text-left">单 Agent</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">多 Agent</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">混合模式</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">复杂度</td>
                  <td className="border border-gray-300 px-4 py-2">低</td>
                  <td className="border border-gray-300 px-4 py-2">高</td>
                  <td className="border border-gray-300 px-4 py-2">中</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">成本</td>
                  <td className="border border-gray-300 px-4 py-2">低</td>
                  <td className="border border-gray-300 px-4 py-2">高</td>
                  <td className="border border-gray-300 px-4 py-2">中</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">可靠性</td>
                  <td className="border border-gray-300 px-4 py-2">中</td>
                  <td className="border border-gray-300 px-4 py-2">高</td>
                  <td className="border border-gray-300 px-4 py-2">高</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">适用场景</td>
                  <td className="border border-gray-300 px-4 py-2">简单任务</td>
                  <td className="border border-gray-300 px-4 py-2">复杂协作</td>
                  <td className="border border-gray-300 px-4 py-2">中等复杂度</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">开发难度</td>
                  <td className="border border-gray-300 px-4 py-2">低</td>
                  <td className="border border-gray-300 px-4 py-2">高</td>
                  <td className="border border-gray-300 px-4 py-2">中</td>
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
                  <a href="/docs/08-ai-applications/agent-architecture" className="text-primary hover:underline">
                    📖 Agent 架构设计
                  </a>
                </li>
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/07-langchain-framework/workflow-design" className="text-primary hover:underline">
                    📖 工作流设计
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
