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
  { id: 'dag', text: '一、DAG 工作流', level: 2 },
  { id: 'pipeline', text: '二、Pipeline 模式', level: 2 },
  { id: 'error-handling', text: '三、错误处理', level: 2 },
  { id: 'retry', text: '四、重试机制', level: 2 },
  { id: 'fallback', text: '五、降级策略', level: 2 },
  { id: 'parallel', text: '六、并行执行', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function WorkflowDesign({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Workflow 是<strong className="text-accent">多个任务节点按特定顺序和依赖关系组织</strong>的执行流程，
              通过 DAG（有向无环图）或 Pipeline 模式实现复杂业务的自动化编排，提供错误处理、重试和监控能力。
            </p>
          </blockquote>

          <Callout type="tip" title="Workflow vs Chain vs Graph">
            Chain 是线性执行（A → B → C），Graph 支持循环和分支，Workflow 是更高层次的抽象，可以包含多个 Chain 或 Graph，并添加企业级特性如监控、告警、权限控制等。
          </Callout>

          <h2 id="dag" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、DAG 工作流
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            DAG（Directed Acyclic Graph，有向无环图）是 Workflow 的核心数据结构，确保任务按依赖顺序执行且不会出现循环依赖。
          </p>

          <Playground
            code={`from typing import Dict, List
from dataclasses import dataclass

@dataclass
class Task:
    name: str
    func: callable
    dependencies: List[str] = None
    
    def __post_init__(self):
        if self.dependencies is None:
            self.dependencies = []

class DAGWorkflow:
    def __init__(self):
        self.tasks: Dict[str, Task] = {}
        self.results: Dict[str, any] = {}
    
    def add_task(self, task: Task):
        self.tasks[task.name] = task
    
    def execute(self):
        """按拓扑排序执行任务"""
        executed = set()
        pending = list(self.tasks.keys())
        
        while pending:
            progress = False
            for task_name in pending[:]:
                task = self.tasks[task_name]
                # 检查所有依赖是否已执行
                if all(dep in executed for dep in task.dependencies):
                    print(f"执行任务: {task_name}")
                    result = task.func(self.results)
                    self.results[task_name] = result
                    executed.add(task_name)
                    pending.remove(task_name)
                    progress = True
            
            if not progress and pending:
                raise ValueError("检测到循环依赖")
        
        return self.results

# 使用示例
def load_data(results):
    return {"data": [1, 2, 3, 4, 5]}

def preprocess(results):
    data = results["load"]["data"]
    return {"processed": [x * 2 for x in data]}

def analyze(results):
    processed = results["preprocess"]["processed"]
    return {"avg": sum(processed) / len(processed)}

workflow = DAGWorkflow()
workflow.add_task(Task("load", load_data))
workflow.add_task(Task("preprocess", preprocess, dependencies=["load"]))
workflow.add_task(Task("analyze", analyze, dependencies=["preprocess"]))

result = workflow.execute()
print(result)`}
            language="python"
            highlights={[15, 22, 30, 48, 52, 56]}
            filename="dag_workflow.py"
            description="DAG 工作流实现"
          />

          <DiagramBlock title="DAG 执行顺序">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
     ┌──────────┐
     │   load   │
     └────┬─────┘
          │
          ▼
┌─────────────────┐
│   preprocess    │
└────┬────────┬───┘
     │        │
     ▼        ▼
┌────────┐ ┌────────┐
│analyze │ │validate│
└────┬───┘ └────┬───┘
     │          │
     ▼          ▼
     └────┬─────┘
          │
          ▼
     ┌──────────┐
     │  report  │
     └──────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="拓扑排序">
            DAG 的执行顺序通过拓扑排序算法确定，确保每个任务在其所有依赖完成后才执行。如果图中存在环，则无法进行拓扑排序，说明存在循环依赖。
          </SideNote>

          <h2 id="pipeline" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Pipeline 模式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Pipeline 是一种特殊的线性 Workflow，数据依次经过多个处理阶段，每个阶段的输出作为下一阶段的输入。
          </p>

          <Playground
            code={`from typing import Any, Callable

class Pipeline:
    def __init__(self):
        self.stages: List[Callable] = []
    
    def add_stage(self, stage: Callable) -> 'Pipeline':
        """添加处理阶段"""
        self.stages.append(stage)
        return self  # 支持链式调用
    
    def execute(self, input_data: Any) -> Any:
        """依次执行所有阶段"""
        data = input_data
        for i, stage in enumerate(self.stages):
            print(f"执行阶段 {i + 1}: {stage.__name__}")
            try:
                data = stage(data)
            except Exception as e:
                print(f"阶段 {i + 1} 失败: {e}")
                raise
        return data

# 定义处理阶段
def tokenize(text: str) -> List[str]:
    return text.lower().split()

def remove_stopwords(tokens: List[str]) -> List[str]:
    stopwords = {"the", "a", "an", "is", "are"}
    return [t for t in tokens if t not in stopwords]

def stem(tokens: List[str]) -> List[str]:
    # 简化的词干提取
    return [t[:-2] if len(t) > 4 else t for t in tokens]

def vectorize(tokens: List[str]) -> Dict[str, int]:
    vec = {}
    for token in tokens:
        vec[token] = vec.get(token, 0) + 1
    return vec

# 构建并执行 Pipeline
pipeline = Pipeline()
pipeline.add_stage(tokenize)
pipeline.add_stage(remove_stopwords)
pipeline.add_stage(stem)
pipeline.add_stage(vectorize)

text = "The cat is running and the dog is running too"
result = pipeline.execute(text)
print(result)  # {'cat': 1, 'runn': 1, 'and': 1, 'dog': 1, 'runn': 1, 'too': 1}`}
            language="python"
            highlights={[5, 9, 13, 37, 41, 45, 49]}
            filename="pipeline.py"
            description="Pipeline 模式实现"
          />

          <Callout type="info" title="Pipeline 适用场景">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>数据处理</strong>：ETL 流程（Extract → Transform → Load）</li>
              <li><strong>NLP 处理</strong>：分词 → 去停用词 → 词干提取 → 向量化</li>
              <li><strong>图像处理</strong>：加载 → 预处理 → 特征提取 → 分类</li>
              <li><strong>文档处理</strong>：解析 → 清洗 → 标注 → 索引</li>
            </ul>
          </Callout>

          <h2 id="error-handling" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、错误处理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            健壮的错误处理是生产级 Workflow 的关键，包括异常捕获、错误传播和 graceful degradation。
          </p>

          <Playground
            code={`from typing import Optional
import logging

logger = logging.getLogger(__name__)

class WorkflowError(Exception):
    """Workflow 自定义异常"""
    def __init__(self, task_name: str, original_error: Exception):
        self.task_name = task_name
        self.original_error = original_error
        super().__init__(f"Task '{task_name}' failed: {original_error}")

class ResilientTask:
    def __init__(self, name: str, func: callable, max_retries: int = 3):
        self.name = name
        self.func = func
        self.max_retries = max_retries
    
    def execute(self, context: dict) -> Optional[any]:
        """带重试和错误处理的执行"""
        last_error = None
        
        for attempt in range(1, self.max_retries + 1):
            try:
                logger.info(f"执行任务 {self.name} (尝试 {attempt}/{self.max_retries})")
                result = self.func(context)
                logger.info(f"任务 {self.name} 成功")
                return result
            except Exception as e:
                last_error = e
                logger.warning(f"任务 {self.name} 失败 (尝试 {attempt}): {e}")
                
                # 指数退避重试
                if attempt < self.max_retries:
                    wait_time = 2 ** attempt
                    logger.info(f"等待 {wait_time} 秒后重试...")
                    time.sleep(wait_time)
        
        # 所有重试都失败
        logger.error(f"任务 {self.name} 最终失败")
        raise WorkflowError(self.name, last_error)

# 使用示例
def unreliable_api_call(context):
    """模拟可能失败的 API 调用"""
    import random
    if random.random() < 0.7:  # 70% 失败率
        raise ConnectionError("API timeout")
    return {"data": "success"}

task = ResilientTask("api_call", unreliable_api_call, max_retries=3)
try:
    result = task.execute({})
    print(result)
except WorkflowError as e:
    print(f"工作流错误: {e}")`}
            language="python"
            highlights={[6, 14, 20, 30, 35, 43]}
            filename="error_handling.py"
            description="错误处理与重试机制"
          />

          <h2 id="retry" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、重试机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            重试策略包括固定间隔、指数退避和抖动（Jitter），用于处理临时性故障。
          </p>

          <Playground
            code={`import time
import random
from functools import wraps

def retry_with_backoff(
    max_retries: int = 3,
    base_delay: float = 1.0,
    max_delay: float = 60.0,
    exponential_base: float = 2.0,
    jitter: bool = True
):
    """
    带指数退避和抖动的重试装饰器
    
    Args:
        max_retries: 最大重试次数
        base_delay: 基础延迟时间（秒）
        max_delay: 最大延迟时间（秒）
        exponential_base: 指数基数
        jitter: 是否添加随机抖动
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            delay = base_delay
            
            for attempt in range(1, max_retries + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries:
                        raise
                    
                    # 计算延迟时间
                    current_delay = min(delay, max_delay)
                    
                    # 添加抖动（避免多个客户端同时重试）
                    if jitter:
                        current_delay *= (0.5 + random.random() * 0.5)
                    
                    print(f"尝试 {attempt} 失败: {e}")
                    print(f"等待 {current_delay:.2f} 秒后重试...")
                    time.sleep(current_delay)
                    
                    # 指数增长
                    delay *= exponential_base
            
            return None  # 不会到达这里
        return wrapper
    return decorator

# 使用示例
@retry_with_backoff(max_retries=5, base_delay=1.0, jitter=True)
def call_external_service(data):
    """调用外部服务"""
    import requests
    response = requests.post("https://api.example.com", json=data)
    response.raise_for_status()
    return response.json()

result = call_external_service({"key": "value"})`}
            language="python"
            highlights={[5, 24, 30, 37, 42, 46]}
            filename="retry_mechanism.py"
            description="重试机制实现"
          />

          <SideNote label="抖动（Jitter）">
            抖动在重试延迟中添加随机性，防止多个客户端在同一时刻重试导致"重试风暴"。Full Jitter 公式：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">sleep(random(0, min(cap, base * 2^attempt)))</code>
          </SideNote>

          <h2 id="fallback" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、降级策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当主要服务不可用时，降级策略提供备选方案以保证系统基本功能可用。
          </p>

          <Playground
            code={`from typing import Callable, Optional

class FallbackHandler:
    """降级处理器"""
    def __init__(self, primary: Callable, fallback: Callable):
        self.primary = primary
        self.fallback = fallback
    
    def execute(self, *args, **kwargs):
        """执行主逻辑，失败时降级"""
        try:
            return self.primary(*args, **kwargs)
        except Exception as e:
            print(f"主逻辑失败，切换到降级方案: {e}")
            try:
                return self.fallback(*args, **kwargs)
            except Exception as fallback_error:
                print(f"降级方案也失败: {fallback_error}")
                raise

# 示例：LLM 调用降级
def call_gpt4(prompt: str) -> str:
    """主方案：调用 GPT-4"""
    # 模拟 API 调用
    if random.random() < 0.3:  # 30% 失败率
        raise ConnectionError("GPT-4 API 不可用")
    return f"GPT-4 回答: {prompt}"

def call_gpt35(prompt: str) -> str:
    """降级方案：调用 GPT-3.5"""
    return f"GPT-3.5 回答: {prompt}"

def use_cached_response(prompt: str) -> str:
    """最终降级：使用缓存"""
    cached = {
        "你好": "你好！有什么可以帮助你的吗？",
        "天气": "今天天气晴朗"
    }
    return cached.get(prompt, "抱歉，暂时无法回答")

# 构建降级链
handler = FallbackHandler(
    primary=lambda p: call_gpt4(p),
    fallback=lambda p: FallbackHandler(
        primary=lambda p: call_gpt35(p),
        fallback=lambda p: use_cached_response(p)
    ).execute(p)
)

result = handler.execute("你好")
print(result)`}
            language="python"
            highlights={[4, 10, 15, 23, 30, 37, 47]}
            filename="fallback_strategy.py"
            description="降级策略实现"
          />

          <Callout type="warning" title="降级策略原则">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>渐进式降级</strong>：从高质量服务逐步降级到低质量但可用的服务</li>
              <li><strong>快速失败</strong>：主服务失败时应快速切换到降级方案，不要长时间等待</li>
              <li><strong>监控告警</strong>：降级触发时应发送告警，便于及时修复主服务</li>
              <li><strong>定期测试</strong>：定期测试降级方案是否仍然有效</li>
            </ul>
          </Callout>

          <h2 id="parallel" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、并行执行
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            对于无依赖关系的任务，可以并行执行以提高整体吞吐量。
          </p>

          <Playground
            code={`import asyncio
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Any

async def parallel_execute(tasks: List[callable], *args, **kwargs) -> List[Any]:
    """
    并行执行多个任务
    
    Args:
        tasks: 要执行的任务列表
        *args, **kwargs: 传递给每个任务的参数
    
    Returns:
        任务结果列表（按完成顺序）
    """
    loop = asyncio.get_event_loop()
    results = []
    
    with ThreadPoolExecutor(max_workers=len(tasks)) as executor:
        futures = [
            loop.run_in_executor(executor, task, *args, **kwargs)
            for task in tasks
        ]
        
        for future in as_completed(futures):
            try:
                result = await future
                results.append(result)
            except Exception as e:
                print(f"任务执行失败: {e}")
                results.append(None)
    
    return results

# 示例：并行处理多个文档
def process_document(doc_id: int) -> dict:
    """处理单个文档"""
    import time
    time.sleep(2)  # 模拟耗时操作
    return {"doc_id": doc_id, "status": "processed"}

async def main():
    doc_ids = [1, 2, 3, 4, 5]
    tasks = [lambda did=did: process_document(did) for did in doc_ids]
    
    start_time = time.time()
    results = await parallel_execute(tasks)
    elapsed = time.time() - start_time
    
    print(f"处理 {len(doc_ids)} 个文档耗时: {elapsed:.2f} 秒")
    print(f"结果数量: {len([r for r in results if r])}")

# 运行
asyncio.run(main())`}
            language="python"
            highlights={[5, 19, 22, 27, 37, 45, 49]}
            filename="parallel_execution.py"
            description="并行执行实现"
          />

          <DiagramBlock title="并行 vs 串行执行">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
串行执行（10秒）:
┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐
│ T1│→│ T2│→│ T3│→│ T4│→│ T5│
└───┘ └───┘ └───┘ └───┘ └───┘
 2s    2s    2s    2s    2s

并行执行（~2秒）:
┌───┐
│ T1│──┐
└───┘  │
┌───┐  │
│ T2│──┼──▶ 合并结果
└───┘  │
┌───┐  │
│ T3│──┤
└───┘  │
┌───┐  │
│ T4│──┤
└───┘  │
┌───┐  │
│ T5│──┘
└───┘
 2s（同时进行）
            `}</pre>
          </DiagramBlock>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区 1：过度并行化">
            <p className="mb-2"><strong>错误认知</strong>：认为所有任务都应该并行执行以提高性能。</p>
            <p><strong>正确理解</strong>：并行化有开销（线程创建、上下文切换、结果合并）。只有当任务足够耗时且无依赖时才值得并行。对于快速任务，串行执行可能更快。还要考虑资源限制（CPU、内存、API 速率限制）。</p>
          </Callout>

          <Callout type="danger" title="误区 2：忽略幂等性">
            <p className="mb-2"><strong>错误认知</strong>：认为重试总是安全的。</p>
            <p><strong>正确理解</strong>：重试要求操作是幂等的（多次执行结果相同）。非幂等操作（如扣款、发送通知）重试会导致重复执行。解决方案：① 使用唯一请求 ID；② 服务端去重；③ 将非幂等操作放在工作流末尾。</p>
          </Callout>

          <Callout type="warning" title="误区 3：硬编码超时时间">
            <p className="mb-2"><strong>错误认知</strong>：为所有任务设置相同的超时时间。</p>
            <p><strong>正确理解</strong>：不同任务的执行时间差异很大。应根据历史数据和 SLA 为每个任务设置合理的超时时间。过短的超时导致不必要的失败，过长的超时浪费资源并延迟错误检测。</p>
          </Callout>

          <Callout type="warning" title="误区 4：不记录中间状态">
            <p className="mb-2"><strong>错误认知</strong>：只记录最终结果，忽略中间状态。</p>
            <p><strong>正确理解</strong>：长工作流执行过程中应定期保存检查点（Checkpoint），这样可以在失败后从断点恢复而非从头开始。这对于耗时数小时的工作流尤为重要。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "如何设计一个支持断点续传的工作流引擎？",
              answer: "① 每个任务执行前后保存状态到持久化存储；② 使用唯一的工作流实例 ID；③ 记录每个任务的执行状态（pending/running/completed/failed）；④ 重启时从最后一个 completed 任务之后继续执行；⑤ 支持手动跳过失败任务。关键技术：Checkpoint、事务、状态机。"
            },
            {
              question: "如何处理工作流中的循环依赖？",
              answer: "① 在设计阶段通过拓扑排序检测循环依赖；② 如果业务确实需要循环，将其建模为迭代而非依赖循环（如：while 循环节点）；③ 使用 LangGraph 等有状态图框架，它们原生支持循环；④ 对于 DAG 引擎，抛出明确的错误提示用户重新设计工作流。"
            },
            {
              question: "分布式工作流如何保证 Exactly-Once 语义？",
              answer: "完全保证 Exactly-Once 非常困难，通常采用 At-Least-Once + 幂等性：① 消息队列至少投递一次；② 任务执行前检查是否已处理（通过唯一 ID）；③ 使用分布式锁防止并发执行；④ 数据库事务保证状态更新的原子性。某些场景可接受 At-Least-Once。"
            },
            {
              question: "工作流引擎如何选择：Airflow vs Prefect vs LangGraph？",
              answer: "Airflow：适合批处理 ETL，基于 DAG，调度强大但延迟高；Prefect：现代化 Python 工作流，动态 DAG，更好的错误处理；LangGraph：专为 LLM Agent 设计，支持状态持久化和人工干预。选择依据：任务类型（批处理/实时）、技术栈、是否需要 AI 集成。"
            },
            {
              question: "如何实现工作流的版本管理？",
              answer: "① 工作流定义存储在 Git 中；② 每次部署生成版本号（Git commit hash 或 semver）；③ 运行中的工作流实例绑定到特定版本；④ 新版本不影响正在运行的旧版本实例；⑤ 提供回滚机制。关键：工作流定义与执行解耦。"
            },
            {
              question: "如何监控工作流的健康状态？",
              answer: "① 指标监控：成功率、延迟、吞吐量；② 日志聚合：集中收集所有任务日志；③ 告警规则：失败率超过阈值、延迟过高；④ 可视化：DAG 执行图、实时状态；⑤ 追踪：分布式追踪（如 OpenTelemetry）跟踪请求在整个工作流中的路径。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/07-langchain-framework/langgraph-core" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">LangGraph 核心架构</div>
              <div className="text-[12px] text-ink-muted mt-1">StateGraph、Node、Edge</div>
            </a>
            <a href="/docs/07-langchain-framework/agent-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">Agent 设计模式</div>
              <div className="text-[12px] text-ink-muted mt-1">ReAct、Planner、Router</div>
            </a>
            <a href="/docs/01-python-basics/python-async" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">Python 异步编程</div>
              <div className="text-[12px] text-ink-muted mt-1">asyncio、并发执行</div>
            </a>
            <a href="/docs/07-langchain-framework/langchain-advanced" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">基础概念 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">LangChain 进阶</div>
              <div className="text-[12px] text-ink-muted mt-1">LCEL、Runnable 组合</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            Workflow 设计是系统工程的核心技能。建议：① 从简单的 Pipeline 开始实践；② 逐步添加错误处理和重试；③ 学习 Airflow/Prefect 等成熟框架的设计思想；④ 在实际项目中应用 DAG 思维分解复杂任务。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}