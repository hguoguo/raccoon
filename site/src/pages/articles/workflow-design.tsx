import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import SideNote from '../../components/knowledge/SideNote'
import SmartTOC from '../../components/knowledge/SmartTOC'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import type { KnowledgeNode, TocItem } from '../../data/types'

const meta: KnowledgeNode = {
  id: 'workflow-design',
  title: 'Workflow 工作流设计',
  level: 'Expert',
  tags: ['Workflow', 'DAG', '状态机', 'Retry', 'Timeout', '并发执行', '持久化'],
  difficulty: 5,
  category: '07-langchain-framework',
  prerequisites: ['langgraph-core', 'agent-patterns'],
  relatedPatterns: ['langchain-advanced'],
  readingTime: 50,
}

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'dag', text: '一、DAG 有向无环图', level: 2 },
  { id: 'state-machine', text: '二、状态机模式', level: 2 },
  { id: 'retry', text: '三、Retry 重试机制', level: 2 },
  { id: 'timeout', text: '四、Timeout 超时控制', level: 2 },
  { id: 'concurrency', text: '五、并发执行', level: 2 },
  { id: 'persistence', text: '六、工作流持久化', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function WorkflowDesign() {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Workflow 是<strong className="text-accent">生产级 LLM 应用的工作流设计体系</strong>，涵盖 DAG 编排、容错机制（Retry/Timeout）、并发优化和状态持久化，
              确保复杂任务在高可用、高性能和高可靠性要求下稳定运行。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 Workflow 设计？">
            简单的 Chain 或 Agent 在开发环境运行良好，但在生产环境面临 API 失败、超时、高并发等挑战。Workflow 设计提供系统化的解决方案，将实验性代码转化为可靠的生产系统。
          </Callout>

          <h2 id="dag" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、DAG 有向无环图
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            DAG（Directed Acyclic Graph）是工作流编排的基础模型，节点表示任务，边表示依赖关系，无环保证不会无限循环。
          </p>

          <DiagramBlock title="DAG 工作流示例">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
         ┌─────────┐
         │  START  │
         └────┬────┘
              │
       ┌──────┴──────┐
       ▼             ▼
  ┌─────────┐   ┌─────────┐
  │ Task A  │   │ Task B  │  ← 并行执行
  └────┬────┘   └────┬────┘
       └──────┬──────┘
              ▼
       ┌─────────────┐
       │ Merge Task  │  ← 等待 A、B 完成
       └──────┬──────┘
              ▼
       ┌─────────────┐
       │  Task C     │  ← 依赖 Merge 结果
       └──────┬──────┘
              ▼
         ┌─────────┐
         │   END   │
         └─────────┘
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`from langgraph.graph import StateGraph, END
from typing import TypedDict

class WorkflowState(TypedDict):
    data_a: str
    data_b: str
    merged_result: str
    final_result: str

# 定义独立任务
def task_a(state: WorkflowState) -> WorkflowState:
    """任务 A：数据收集"""
    result = collect_data_source_a()
    return {"data_a": result}

def task_b(state: WorkflowState) -> WorkflowState:
    """任务 B：数据收集"""
    result = collect_data_source_b()
    return {"data_b": result}

def merge_task(state: WorkflowState) -> WorkflowState:
    """合并任务：整合 A 和 B 的结果"""
    merged = f"{state['data_a']} + {state['data_b']}"
    return {"merged_result": merged}

def task_c(state: WorkflowState) -> WorkflowState:
    """任务 C：基于合并结果生成最终输出"""
    final = process_merged_data(state["merged_result"])
    return {"final_result": final}

# 构建 DAG
workflow = StateGraph(WorkflowState)
workflow.add_node("task_a", task_a)
workflow.add_node("task_b", task_b)
workflow.add_node("merge", merge_task)
workflow.add_node("task_c", task_c)

# 定义依赖关系
workflow.add_edge(START, "task_a")
workflow.add_edge(START, "task_b")
workflow.add_edge("task_a", "merge")
workflow.add_edge("task_b", "merge")
workflow.add_edge("merge", "task_c")
workflow.add_edge("task_c", END)

app = workflow.compile()`}
            language="python"
            highlights={[33, 39, 40, 41, 42]}
            filename="dag_workflow.py"
            description="DAG 工作流实现"
          />

          <SideNote label="DAG vs 循环">
            LangGraph 支持循环（如 ReAct），但 DAG 更适合确定性流程。混合使用：核心流程用 DAG，局部迭代用循环（需设置最大迭代次数防止死循环）。
          </SideNote>

          <h2 id="state-machine" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、状态机模式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            状态机通过明确的状态转换规则管理工作流生命周期，适合有清晰阶段划分的任务（如订单处理、审批流程）。
          </p>

          <Playground
            code={`from enum import Enum
from typing import TypedDict

class OrderStatus(Enum):
    PENDING = "pending"
    VALIDATING = "validating"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class OrderState(TypedDict):
    order_id: str
    status: OrderStatus
    error_message: str | None

# 状态转换函数
def validate_order(state: OrderState) -> OrderState:
    """验证订单"""
    try:
        if is_valid(state["order_id"]):
            return {"status": OrderStatus.PROCESSING}
        else:
            return {"status": OrderStatus.FAILED, "error_message": "无效订单"}
    except Exception as e:
        return {"status": OrderStatus.FAILED, "error_message": str(e)}

def process_order(state: OrderState) -> OrderState:
    """处理订单"""
    try:
        execute_order(state["order_id"])
        return {"status": OrderStatus.COMPLETED}
    except Exception as e:
        return {"status": OrderStatus.FAILED, "error_message": str(e)}

# 状态路由
def route_by_status(state: OrderState) -> str:
    if state["status"] == OrderStatus.PENDING:
        return "validate"
    elif state["status"] == OrderStatus.VALIDATING:
        return "process"
    elif state["status"] in [OrderStatus.COMPLETED, OrderStatus.FAILED]:
        return END
    else:
        return "validate"  # 默认回到验证

workflow = StateGraph(OrderState)
workflow.add_node("validate", validate_order)
workflow.add_node("process", process_order)

workflow.add_conditional_edges(
    source=START,
    path=route_by_status,
    path_map={"validate": "validate", "process": "process", END: END}
)
workflow.add_conditional_edges(
    source="validate",
    path=route_by_status,
    path_map={"validate": "validate", "process": "process", END: END}
)
workflow.add_conditional_edges(
    source="process",
    path=route_by_status,
    path_map={"validate": "validate", "process": "process", END: END}
)`}
            language="python"
            highlights={[15, 28, 40, 52]}
            filename="state_machine.py"
            description="状态机工作流"
          />

          <Callout type="info" title="状态机优势">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>可预测性</strong>：状态转换规则明确，易于理解和调试</li>
              <li><strong>可恢复性</strong>：失败后可从特定状态重启，无需从头开始</li>
              <li><strong>可扩展性</strong>：新增状态只需添加节点和转换规则</li>
              <li><strong>可观测性</strong>：实时监控当前状态，便于运维</li>
            </ul>
          </Callout>

          <h2 id="retry" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Retry 重试机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            重试机制应对临时性故障（网络抖动、API 限流），通过指数退避策略平衡成功率和延迟。
          </p>

          <Playground
            code={`import time
from functools import wraps

def retry_with_backoff(max_retries=3, base_delay=1, backoff_factor=2):
    """带指数退避的重试装饰器"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except TemporaryError as e:
                    if attempt == max_retries - 1:
                        raise  # 最后一次重试仍失败，抛出异常
                    
                    delay = base_delay * (backoff_factor ** attempt)
                    print(f"Attempt {attempt + 1} failed: {e}. Retrying in {delay}s...")
                    time.sleep(delay)
            
            raise Exception("Max retries exceeded")
        return wrapper
    return decorator

# 使用示例
@retry_with_backoff(max_retries=3, base_delay=1, backoff_factor=2)
def call_llm_api(prompt: str) -> str:
    """调用 LLM API（可能因网络问题失败）"""
    response = llm.invoke(prompt)
    return response.content

# 在 LangGraph 节点中使用
def robust_llm_node(state: WorkflowState) -> WorkflowState:
    try:
        result = call_llm_api(state["prompt"])
        return {"result": result, "retry_count": 0}
    except Exception as e:
        return {"error": str(e), "retry_count": 3}`}
            language="python"
            highlights={[4, 25, 33]}
            filename="retry_mechanism.py"
            description="重试机制实现"
          />

          <DiagramBlock title="指数退避策略">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
尝试次数    延迟时间    累计时间
─────────────────────────────
第 1 次     0s         0s
第 2 次     1s         1s
第 3 次     2s         3s
第 4 次     4s         7s
第 5 次     8s         15s

公式: delay = base_delay × (backoff_factor ^ attempt)
            `}</pre>
          </DiagramBlock>

          <SideNote label="重试最佳实践">
            仅对临时性错误重试（网络超时、503 Service Unavailable）。永久性错误（400 Bad Request、参数错误）不应重试。设置合理的最大重试次数（通常 3-5 次）避免无限循环。
          </SideNote>

          <h2 id="timeout" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Timeout 超时控制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            超时控制防止单个任务阻塞整个工作流，保障系统的响应性和资源利用率。
          </p>

          <Playground
            code={`import asyncio
from concurrent.futures import TimeoutError

async def execute_with_timeout(coro, timeout_seconds=30):
    """异步超时控制"""
    try:
        result = await asyncio.wait_for(coro, timeout=timeout_seconds)
        return {"status": "success", "result": result}
    except asyncio.TimeoutError:
        return {"status": "timeout", "error": f"Task exceeded {timeout_seconds}s limit"}
    except Exception as e:
        return {"status": "error", "error": str(e)}

# 在 LangGraph 中使用
async def llm_node_with_timeout(state: WorkflowState) -> WorkflowState:
    coro = llm.ainvoke(state["prompt"])
    outcome = await execute_with_timeout(coro, timeout_seconds=10)
    
    if outcome["status"] == "success":
        return {"result": outcome["result"]}
    elif outcome["status"] == "timeout":
        return {"error": "LLM 响应超时，使用缓存结果", "result": get_cached_response(state["prompt"])}
    else:
        return {"error": outcome["error"]}

# 同步版本的超时控制
from func_timeout import func_set_timeout, FunctionTimedOut

@func_set_timeout(10)
def sync_llm_call(prompt: str) -> str:
    return llm.invoke(prompt).content

def sync_node(state: WorkflowState) -> WorkflowState:
    try:
        result = sync_llm_call(state["prompt"])
        return {"result": result}
    except FunctionTimedOut:
        return {"error": "超时", "result": fallback_result()}`}
            language="python"
            highlights={[4, 15, 29, 35]}
            filename="timeout_control.py"
            description="超时控制实现"
          />

          <Callout type="warning" title="超时策略选择">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>硬超时</strong>：直接终止任务，返回错误或降级结果</li>
              <li><strong>软超时</strong>：任务继续在后台执行，但前端已返回超时提示</li>
              <li><strong>分级超时</strong>：不同任务设置不同超时阈值（关键任务更长）</li>
            </ul>
          </Callout>

          <h2 id="concurrency" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、并发执行
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            并发执行提升工作流吞吐量，LangGraph 通过 RunnableParallel 和异步节点天然支持并发。
          </p>

          <Playground
            code={`from langgraph.graph import StateGraph
from langchain_core.runnables import RunnableParallel
import asyncio

# 方式 1：使用 RunnableParallel（推荐）
parallel_processing = RunnableParallel({
    "summary": summary_chain,
    "keywords": keyword_chain,
    "sentiment": sentiment_chain,
})

def parallel_node(state: WorkflowState) -> WorkflowState:
    results = parallel_processing.invoke({"text": state["input"]})
    return results

# 方式 2：异步节点并发
async def async_task_a(state: WorkflowState) -> WorkflowState:
    result = await llm.ainvoke("任务 A")
    return {"data_a": result.content}

async def async_task_b(state: WorkflowState) -> WorkflowState:
    result = await llm.ainvoke("任务 B")
    return {"data_b": result.content}

# LangGraph 自动并发执行异步节点
workflow = StateGraph(WorkflowState)
workflow.add_node("task_a", async_task_a)
workflow.add_node("task_b", async_task_b)
workflow.add_edge(START, "task_a")
workflow.add_edge(START, "task_b")
# ... 其他边

app = workflow.compile()

# 并发执行
result = await app.ainvoke({"input": "test"})

# 方式 3：手动控制并发数（避免过载）
import asyncio

async def batch_process(items: list, max_concurrent=5):
    semaphore = asyncio.Semaphore(max_concurrent)
    
    async def process_with_limit(item):
        async with semaphore:
            return await process_item(item)
    
    tasks = [process_with_limit(item) for item in items]
    return await asyncio.gather(*tasks)`}
            language="python"
            highlights={[6, 18, 23, 30, 45]}
            filename="concurrency.py"
            description="并发执行策略"
          />

          <SideNote label="并发限制">
            虽然并发提升性能，但需注意：① API 速率限制（Rate Limit）；② 内存占用；③ 数据库连接池大小。使用 Semaphore 控制最大并发数，避免资源耗尽。
          </SideNote>

          <h2 id="persistence" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、工作流持久化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            持久化保存工作流状态，支持断点续传、审计追溯和故障恢复。生产环境推荐使用 PostgreSQL 或 Redis。
          </p>

          <Playground
            code={`from langgraph.checkpoint.postgres import PostgresSaver
from langgraph.checkpoint.redis import RedisSaver
import psycopg2

# 方式 1：PostgreSQL（推荐生产环境）
conn_string = "postgresql://user:pass@localhost:5432/langgraph"
postgres_saver = PostgresSaver.from_conn_string(conn_string)

# 初始化表（首次运行时执行）
postgres_saver.setup()

# 方式 2：Redis（适合高频读写）
redis_saver = RedisSaver.from_conn_string("redis://localhost:6379")

# 编译时传入 saver
app = workflow.compile(checkpointer=postgres_saver)

# 执行并持久化
config = {"configurable": {"thread_id": "workflow_123"}}
result = app.invoke(initial_state, config=config)

# 查询历史状态
history = app.get_state_history(config)
for snapshot in history:
    print(f"Step: {snapshot.metadata['step']}, Status: {snapshot.values['status']}")

# 从特定 checkpoint 恢复
target_checkpoint = history[5]  # 恢复到第 5 步
restored_state = target_checkpoint.values
result = app.invoke(restored_state, config=config)

# 清理过期 checkpoint（定期维护）
def cleanup_old_checkpoints(saver, days=30):
    cutoff_date = datetime.now() - timedelta(days=days)
    saver.delete_checkpoints_before(cutoff_date)`}
            language="python"
            highlights={[7, 10, 13, 16, 20, 24, 30, 35]}
            filename="persistence.py"
            description="工作流持久化方案"
          />

          <Callout type="info" title="持久化存储对比">
            <table className="w-full text-[12px] sm:text-[13px] mt-3">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">存储后端</th>
                  <th className="text-left py-2">适用场景</th>
                  <th className="text-left py-2">优点</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-light">
                  <td className="py-2 font-mono">Memory</td>
                  <td className="py-2">开发测试</td>
                  <td className="py-2">零配置，速度快</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 font-mono">SQLite</td>
                  <td className="py-2">小型应用</td>
                  <td className="py-2">轻量级，无需服务器</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 font-mono">PostgreSQL</td>
                  <td className="py-2">生产环境</td>
                  <td className="py-2">可靠，支持复杂查询</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">Redis</td>
                  <td className="py-2">高并发场景</td>
                  <td className="py-2">极速读写，适合缓存</td>
                </tr>
              </tbody>
            </table>
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区 1：所有任务都需要重试">
            <p className="mb-2"><strong>错误认知</strong>：认为为所有节点添加重试机制能提升可靠性。</p>
            <p><strong>正确理解</strong>：重试仅适用于临时性故障。对于幂等性操作（如写入数据库）需谨慎，避免重复执行导致数据不一致。非幂等操作应结合事务或补偿机制。</p>
          </Callout>

          <Callout type="danger" title="误区 2：超时时间越长越好">
            <p className="mb-2"><strong>错误认知</strong>：认为设置较长的超时时间能减少失败率。</p>
            <p><strong>正确理解</strong>：过长的超时会浪费资源并降低系统响应性。应根据 SLA 要求设置合理超时（如 P95 延迟的 2-3 倍），并提供降级策略而非无限等待。</p>
          </Callout>

          <Callout type="danger" title="误区 3：并发越高性能越好">
            <p className="mb-2"><strong>错误认知</strong>：认为最大化并发数能线性提升吞吐量。</p>
            <p><strong>正确理解</strong>：超过系统承载能力的并发会导致资源竞争、上下文切换开销增加，反而降低性能。应通过压测找到最优并发数，并使用限流保护下游服务。</p>
          </Callout>

          <Callout type="warning" title="误区 4：持久化无需考虑清理策略">
            <p className="mb-2"><strong>错误认知</strong>：认为 checkpoint 可以无限累积。</p>
            <p><strong>正确理解</strong>：未清理的 checkpoint 会占用大量存储空间并降低查询性能。应定期清理过期数据（如保留 30 天），或对长期运行的工作流使用增量保存而非全量快照。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "如何设计一个高可用的 LLM 工作流？",
              answer: "① 多区域部署负载均衡；② 重试机制应对临时故障；③ 超时控制防止阻塞；④ 降级策略（缓存、简化模型）；⑤ 健康检查和自动故障转移；⑥ 监控告警实时感知异常；⑦ 灰度发布降低变更风险。"
            },
            {
              question: "DAG 工作流中如何处理节点失败？",
              answer: "① 单个节点失败不影响其他并行分支；② 失败节点根据错误类型决定是否重试；③ 提供 fallback 节点处理永久失败；④ 记录失败原因便于后续分析；⑤ 对于关键路径，可设计补偿节点回滚已执行操作。"
            },
            {
              question: "如何实现工作流的版本管理？",
              answer: "① 工作流定义（代码）使用 Git 版本控制；② Checkpoint 数据标记版本号；③ 支持按版本回放历史执行；④ 新版本与旧版本并行运行对比效果；⑤ 提供版本回滚能力。关键是保持向后兼容性。"
            },
            {
              question: "并发执行的线程安全问题如何处理？",
              answer: "① 使用不可变数据结构避免共享状态修改；② 对必须共享的资源使用锁或原子操作；③ 数据库操作使用事务隔离；④ LangGraph 的 State 更新是原子的，无需额外同步；⑤ 避免在节点中使用全局变量。"
            },
            {
              question: "如何监控工作流的健康状态？",
              answer: "① 埋点记录每个节点的耗时、成功率、重试次数；② 集成 Prometheus + Grafana 可视化监控；③ 设置告警规则（如 P99 延迟 > 阈值、错误率 > 5%）；④ 分布式追踪（Jaeger/Zipkin）定位瓶颈；⑤ 定期生成健康报告。"
            },
            {
              question: "工作流持久化的性能优化策略有哪些？",
              answer: "① 异步写入 checkpoint 不阻塞主流程；② 精简 State 只保存必要字段；③ 使用增量保存而非全量快照；④ 定期清理过期数据；⑤ 选择合适的存储后端（Redis 适合高频，PostgreSQL 适合复杂查询）；⑥ 批量写入减少 I/O 次数。"
            },
            {
              question: "如何保障工作流的幂等性？",
              answer: "① 为每个任务生成唯一 ID，执行前检查是否已处理；② 数据库操作使用 UPSERT 而非 INSERT；③ 外部 API 调用记录请求指纹避免重复；④ 使用消息队列的 Exactly-Once 语义；⑤ 设计补偿机制撤销已执行操作。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/07-langchain-framework/langgraph-core" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">LangGraph 核心</div>
              <div className="text-[12px] text-ink-muted mt-1">StateGraph、Checkpoint</div>
            </a>
            <a href="/docs/07-langchain-framework/agent-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">Agent 设计模式</div>
              <div className="text-[12px] text-ink-muted mt-1">ReAct、Planner、Router</div>
            </a>
            <a href="/docs/07-langchain-framework/langchain-advanced" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">基础技能 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">LangChain 进阶</div>
              <div className="text-[12px] text-ink-muted mt-1">RunnableParallel、LCEL</div>
            </a>
            <a href="/docs/05-python-engineering/python-engineering" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">工程实践 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Python 工程化</div>
              <div className="text-[12px] text-ink-muted mt-1">日志、监控、测试</div>
            </a>
          </div>

          <Callout type="info" title="总结">
            Workflow 设计是 LLM 应用从原型走向生产的关键环节。掌握 DAG 编排、容错机制、并发优化和持久化策略，能够构建高可用、高性能的智能系统。建议结合实际项目练习，逐步完善工作流的健壮性。
          </Callout>

        </KnowledgeLayout>
      </div>

      <aside className="hidden xl:block w-[240px] shrink-0 px-4 py-8 sticky top-0 h-screen overflow-y-auto">
        <SmartTOC items={tocItems} />
      </aside>

      <ArticleNav 
        prevTitle="Agent 设计模式"
        prevPath="/docs/07-langchain-framework/agent-patterns"
        nextTitle="LangChain 基础核心"
        nextPath="/docs/07-langchain-framework/langchain-basics"
      />
    </div>
  )
}
