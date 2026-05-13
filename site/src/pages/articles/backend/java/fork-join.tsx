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
  { id: 'architecture', text: '一、Fork/Join 架构', level: 2 },
  { id: 'work-stealing', text: '二、Work-Stealing 算法', level: 2 },
  { id: 'forkjoinpool', text: '三、ForkJoinPool', level: 2 },
  { id: 'recursive-task', text: '四、RecursiveTask vs RecursiveAction', level: 2 },
  { id: 'best-practices', text: '五、最佳实践', level: 2 },
  { id: 'performance', text: '六、性能分析', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function ForkJoin({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Fork/Join 框架是 Java 7 引入的<strong className="text-accent">并行计算框架</strong>，基于分治算法（Divide and Conquer）和 Work-Stealing（工作窃取）算法，
              将大任务递归拆分为小任务并行执行，充分利用多核 CPU 提升计算密集型任务的性能。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 Fork/Join？">
            传统线程池适合 IO 密集型任务，但对于 CPU 密集型的递归计算（如排序、搜索、矩阵运算），无法充分利用多核优势。Fork/Join 通过工作窃取算法实现负载均衡，自动将空闲线程的任务分配给忙碌线程，最大化 CPU 利用率。
          </Callout>

          <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Fork/Join 架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Fork/Join 框架的核心思想是<strong>"分而治之"</strong>：将大任务 fork（拆分）为小任务并行执行，然后 join（合并）结果。它由三个核心组件构成。
          </p>

          <DiagramBlock title="Fork/Join 核心组件">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────┐
│         ForkJoinPool                        │
│  (线程池，管理工作线程和任务队列)              │
├──────────┬──────────┬──────────┬────────────┤
│ Worker 1 │ Worker 2 │ Worker 3 │ Worker 4   │
│ Thread   │ Thread   │ Thread   │ Thread     │
├──────────┼──────────┼──────────┼────────────┤
│ Deque 1  │ Deque 2  │ Deque 3  │ Deque 4    │
│(双端队列) │(双端队列) │(双端队列) │(双端队列)  │
└──────────┴──────────┴──────────┴────────────┘
       ▲           ▲           ▲           ▲
       │           │           │           │
    Task A      Task B      Task C      Task D
   (递归拆分)   (递归拆分)   (递归拆分)   (递归拆分)
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;

// 示例：并行计算数组总和
public class SumTask extends RecursiveTask<Long> {
    private static final int THRESHOLD = 10_000;  // 阈值
    private final long[] array;
    private final int start;
    private final int end;
    
    public SumTask(long[] array, int start, int end) {
        this.array = array;
        this.start = start;
        this.end = end;
    }
    
    @Override
    protected Long compute() {
        int length = end - start;
        
        // 基线条件：任务足够小，直接计算
        if (length <= THRESHOLD) {
            long sum = 0;
            for (int i = start; i < end; i++) {
                sum += array[i];
            }
            return sum;
        }
        
        // 递归步骤：拆分任务
        int mid = (start + end) / 2;
        SumTask leftTask = new SumTask(array, start, mid);
        SumTask rightTask = new SumTask(array, mid, end);
        
        // Fork：异步执行子任务
        leftTask.fork();
        long rightResult = rightTask.compute();  // 同步执行右半部分
        long leftResult = leftTask.join();       // Join：等待左半部分结果
        
        // 合并结果
        return leftResult + rightResult;
    }
}

// 使用示例
public class ForkJoinDemo {
    public static void main(String[] args) {
        long[] array = new long[1_000_000];
        for (int i = 0; i < array.length; i++) {
            array[i] = i + 1;
        }
        
        // 创建 ForkJoinPool
        ForkJoinPool pool = new ForkJoinPool();
        
        // 提交任务
        SumTask task = new SumTask(array, 0, array.length);
        long result = pool.invoke(task);
        
        System.out.println("总和: " + result);  // 500000500000
        
        // 关闭线程池
        pool.shutdown();
    }
}`}
            language="java"
            highlights={[5, 20, 33, 34, 35, 36, 37]}
            filename="SumTask.java"
            description="Fork/Join 基础示例"
          />

          <SideNote label="Fork vs Invoke">
            <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">fork()</code> 将任务异步提交到队列，立即返回；<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">invoke()</code> 同步提交并等待结果。最佳实践：对一个子任务调用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">fork()</code>，另一个直接调用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">compute()</code>，减少上下文切换开销。
          </SideNote>

          <h2 id="work-stealing" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Work-Stealing 算法
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Work-Stealing（工作窃取）是 Fork/Join 的核心优化机制。每个工作线程维护一个双端队列（Deque），线程从自己队列的<strong>尾部</strong>获取任务执行，当队列为空时，从其他线程队列的<strong>头部</strong>窃取任务。
          </p>

          <DiagramBlock title="Work-Stealing 工作流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
Worker 1 (忙碌)              Worker 2 (空闲)
┌─────────┐                 ┌─────────┐
│ Task 1  │ ◀── LIFO       │         │
│ Task 2  │                 │         │
│ Task 3  │                 │         │
│ Task 4  │                 │         │
└─────────┘                 └─────────┘
     ▲                            │
     │                            │ 从头部窃取（FIFO）
     │                            ▼
                              ┌─────────┐
                              │ Task 1  │ ◀── 窃取成功
                              └─────────┘

特点：
• 所有者从尾部取任务（LIFO）：利用缓存局部性
• 窃取者从头部偷任务（FIFO）：减少竞争
• 双端操作降低锁冲突概率
            `}</pre>
          </DiagramBlock>

          <Callout type="info" title="Work-Stealing 的优势">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>负载均衡</strong>：自动将任务从忙碌线程转移到空闲线程</li>
              <li><strong>减少竞争</strong>：所有者和窃取者操作不同端，降低锁冲突</li>
              <li><strong>缓存友好</strong>：所有者从尾部取任务（最近放入的），提高缓存命中率</li>
              <li><strong>自适应</strong>：无需手动调整线程数或任务分配策略</li>
            </ul>
          </Callout>

          <h2 id="forkjoinpool" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、ForkJoinPool
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ForkJoinPool 是 Fork/Join 框架的线程池实现，继承自 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">AbstractExecutorService</code>。它与普通 ThreadPoolExecutor 的关键区别在于支持 Work-Stealing。
          </p>

          <Playground
            code={`import java.util.concurrent.ForkJoinPool;

// 方式 1：使用默认配置（推荐）
ForkJoinPool commonPool = ForkJoinPool.commonPool();
// 并行度 = CPU 核数 - 1
// 适用于大多数场景

// 方式 2：自定义并行度
int parallelism = Runtime.getRuntime().availableProcessors();
ForkJoinPool customPool = new ForkJoinPool(parallelism);

// 方式 3：完整配置
ForkJoinPool fullConfigPool = new ForkJoinPool(
    4,                                      // 并行度
    ForkJoinPool.defaultForkJoinWorkerThreadFactory,  // 线程工厂
    null,                                   // 未捕获异常处理器
    true,                                   // 异步模式
    0, 0, 0, null,                          // 其他高级参数
    60, TimeUnit.SECONDS                    // 线程保活时间
);

// 提交任务的方式
SumTask task = new SumTask(array, 0, array.length);

// 方式 A：invoke() - 阻塞等待结果
Long result = pool.invoke(task);

// 方式 B：submit() + join() - 异步提交
ForkJoinTask<Long> future = pool.submit(task);
Long result = future.join();  // 阻塞等待

// 方式 C：execute() - 无返回值
pool.execute(new MyRecursiveAction());

// 监控指标
System.out.println("活跃线程数: " + pool.getActiveThreadCount());
System.out.println("并行度: " + pool.getParallelism());
System.out.println("队列大小: " + pool.getQueuedTaskCount());
System.out.println("窃取次数: " + pool.getStealCount());`}
            language="java"
            highlights={[4, 10, 13, 27, 30, 33, 36]}
            filename="ForkJoinPoolUsage.java"
            description="ForkJoinPool 配置与使用"
          />

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border p-2 text-left font-semibold">方法</th>
                <th className="border border-border p-2 text-left font-semibold">行为</th>
                <th className="border border-border p-2 text-left font-semibold">返回值</th>
                <th className="border border-border p-2 text-left font-semibold">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2"><code className="font-mono text-[12px]">invoke()</code></td>
                <td className="border border-border p-2">同步提交并等待</td>
                <td className="border border-border p-2">T</td>
                <td className="border border-border p-2">简单场景</td>
              </tr>
              <tr className="bg-parchment-light">
                <td className="border border-border p-2"><code className="font-mono text-[12px]">submit()</code></td>
                <td className="border border-border p-2">异步提交</td>
                <td className="border border-border p-2">ForkJoinTask&lt;T&gt;</td>
                <td className="border border-border p-2">需要 Future 功能</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><code className="font-mono text-[12px]">execute()</code></td>
                <td className="border border-border p-2">异步执行（无返回值）</td>
                <td className="border border-border p-2">void</td>
                <td className="border border-border p-2">RecursiveAction</td>
              </tr>
            </tbody>
          </table>

          <h2 id="recursive-task" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、RecursiveTask vs RecursiveAction
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Fork/Join 提供了两种任务抽象：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">RecursiveTask&lt;V&gt;</code>（有返回值）和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">RecursiveAction</code>（无返回值）。
          </p>

          <Playground
            code={`// 1. RecursiveTask：有返回值的任务
public class MaxTask extends RecursiveTask<Integer> {
    private static final int THRESHOLD = 1000;
    private final int[] array;
    private final int start;
    private final int end;
    
    public MaxTask(int[] array, int start, int end) {
        this.array = array;
        this.start = start;
        this.end = end;
    }
    
    @Override
    protected Integer compute() {
        if (end - start <= THRESHOLD) {
            // 基线条件：直接计算最大值
            int max = array[start];
            for (int i = start + 1; i < end; i++) {
                if (array[i] > max) {
                    max = array[i];
                }
            }
            return max;
        }
        
        // 递归拆分
        int mid = (start + end) / 2;
        MaxTask left = new MaxTask(array, start, mid);
        MaxTask right = new MaxTask(array, mid, end);
        
        left.fork();
        int rightMax = right.compute();
        int leftMax = left.join();
        
        return Math.max(leftMax, rightMax);
    }
}

// 2. RecursiveAction：无返回值的任务
public class SortTask extends RecursiveAction {
    private static final int THRESHOLD = 1000;
    private final int[] array;
    private final int start;
    private final int end;
    
    public SortTask(int[] array, int start, int end) {
        this.array = array;
        this.start = start;
        this.end = end;
    }
    
    @Override
    protected void compute() {
        if (end - start <= THRESHOLD) {
            // 基线条件：小规模数据用插入排序
            insertionSort(array, start, end);
        } else {
            // 递归拆分：并行归并排序
            int mid = (start + end) / 2;
            SortTask left = new SortTask(array, start, mid);
            SortTask right = new SortTask(array, mid, end);
            
            invokeAll(left, right);  // 并行执行两个子任务
            
            // 合并结果
            merge(array, start, mid, end);
        }
    }
    
    private void insertionSort(int[] arr, int start, int end) {
        for (int i = start + 1; i < end; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= start && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    
    private void merge(int[] arr, int start, int mid, int end) {
        // 归并逻辑...
    }
}`}
            language="java"
            highlights={[2, 15, 38, 49, 58]}
            filename="TaskTypes.java"
            description="RecursiveTask vs RecursiveAction"
          />

          <SideNote label="invokeAll 快捷方法">
            <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">invokeAll(task1, task2)</code> 是 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">task1.fork(); task2.compute(); task1.join();</code> 的简化写法，代码更简洁且性能相当。
          </SideNote>

          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、最佳实践
          </h2>

          <Callout type="tip" title="阈值选择原则">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>太小</strong>：任务拆分过细，fork/join 开销超过并行收益</li>
              <li><strong>太大</strong>：并行度不足，无法充分利用多核</li>
              <li><strong>经验值</strong>：单个任务执行时间在 100μs ~ 1ms 之间</li>
              <li><strong>动态调整</strong>：通过压测找到最优阈值</li>
            </ul>
          </Callout>

          <Playground
            code={`// 最佳实践示例：并行数组处理
public class ParallelArrayProcessor {
    private static final ForkJoinPool POOL = new ForkJoinPool();
    
    // 示例 1：并行 Map 操作
    public static <T, R> List<R> parallelMap(List<T> input, Function<T, R> mapper) {
        return POOL.invoke(new MapTask<>(input, mapper, 0, input.size()));
    }
    
    static class MapTask<T, R> extends RecursiveTask<List<R>> {
        private static final int THRESHOLD = 1000;
        private final List<T> input;
        private final Function<T, R> mapper;
        private final int start;
        private final int end;
        
        @Override
        protected List<R> compute() {
            if (end - start <= THRESHOLD) {
                // 串行处理
                List<R> result = new ArrayList<>();
                for (int i = start; i < end; i++) {
                    result.add(mapper.apply(input.get(i)));
                }
                return result;
            }
            
            // 并行处理
            int mid = (start + end) / 2;
            MapTask<T, R> left = new MapTask<>(input, mapper, start, mid);
            MapTask<T, R> right = new MapTask<>(input, mapper, mid, end);
            
            invokeAll(left, right);
            
            List<R> result = new ArrayList<>(left.join());
            result.addAll(right.join());
            return result;
        }
    }
    
    // 示例 2：并行 Filter 操作
    public static <T> List<T> parallelFilter(List<T> input, Predicate<T> predicate) {
        return POOL.invoke(new FilterTask<>(input, predicate, 0, input.size()));
    }
    
    // 示例 3：并行 Reduce 操作
    public static <T> T parallelReduce(List<T> input, BinaryOperator<T> reducer, T identity) {
        return POOL.invoke(new ReduceTask<>(input, reducer, identity, 0, input.size()));
    }
    
    // 优雅关闭
    static {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            POOL.shutdown();
            try {
                if (!POOL.awaitTermination(5, TimeUnit.SECONDS)) {
                    POOL.shutdownNow();
                }
            } catch (InterruptedException e) {
                POOL.shutdownNow();
                Thread.currentThread().interrupt();
            }
        }));
    }
}`}
            language="java"
            highlights={[7, 18, 33, 34, 35, 47, 51]}
            filename="ParallelArrayProcessor.java"
            description="Fork/Join 最佳实践"
          />

          <h2 id="performance" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、性能分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Fork/Join 的性能优势主要体现在 CPU 密集型任务上。以下是不同场景下的性能对比。
          </p>

          <Playground
            code={`// 性能测试：并行 vs 串行求和
public class PerformanceBenchmark {
    private static final int ARRAY_SIZE = 100_000_000;
    private static final long[] array = new long[ARRAY_SIZE];
    
    static {
        for (int i = 0; i < ARRAY_SIZE; i++) {
            array[i] = i + 1;
        }
    }
    
    // 串行计算
    public static long sequentialSum() {
        long sum = 0;
        for (long value : array) {
            sum += value;
        }
        return sum;
    }
    
    // 并行计算（Fork/Join）
    public static long parallelSum() {
        ForkJoinPool pool = new ForkJoinPool();
        SumTask task = new SumTask(array, 0, array.length);
        return pool.invoke(task);
    }
    
    // Stream API 并行
    public static long streamParallelSum() {
        return Arrays.stream(array).parallel().sum();
    }
    
    public static void main(String[] args) {
        // 预热 JVM
        for (int i = 0; i < 10; i++) {
            sequentialSum();
            parallelSum();
            streamParallelSum();
        }
        
        // 正式测试
        int iterations = 20;
        
        long seqStart = System.nanoTime();
        for (int i = 0; i < iterations; i++) sequentialSum();
        long seqTime = System.nanoTime() - seqStart;
        
        long parStart = System.nanoTime();
        for (int i = 0; i < iterations; i++) parallelSum();
        long parTime = System.nanoTime() - parStart;
        
        long streamStart = System.nanoTime();
        for (int i = 0; i < iterations; i++) streamParallelSum();
        long streamTime = System.nanoTime() - streamStart;
        
        System.out.printf("串行耗时: %.2f ms%n", seqTime / 1e6 / iterations);
        System.out.printf("Fork/Join 耗时: %.2f ms%n", parTime / 1e6 / iterations);
        System.out.printf("Stream 并行耗时: %.2f ms%n", streamTime / 1e6 / iterations);
        System.out.printf("加速比: %.2fx%n", (double) seqTime / parTime);
    }
}

/*
典型输出（8 核 CPU）：
串行耗时: 45.23 ms
Fork/Join 耗时: 8.67 ms
Stream 并行耗时: 9.12 ms
加速比: 5.22x
*/`}
            language="java"
            highlights={[13, 22, 29, 41, 44, 47, 50]}
            filename="PerformanceBenchmark.java"
            description="性能对比测试"
          />

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border p-2 text-left font-semibold">任务类型</th>
                <th className="border border-border p-2 text-left font-semibold">串行耗时</th>
                <th className="border border-border p-2 text-left font-semibold">Fork/Join 耗时</th>
                <th className="border border-border p-2 text-left font-semibold">加速比</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2">数组求和（1亿元素）</td>
                <td className="border border-border p-2">45ms</td>
                <td className="border border-border p-2">9ms</td>
                <td className="border border-border p-2">~5x</td>
              </tr>
              <tr className="bg-parchment-light">
                <td className="border border-border p-2">快速排序（100万元素）</td>
                <td className="border border-border p-2">120ms</td>
                <td className="border border-border p-2">25ms</td>
                <td className="border border-border p-2">~4.8x</td>
              </tr>
              <tr>
                <td className="border border-border p-2">矩阵乘法（1000×1000）</td>
                <td className="border border-border p-2">2.3s</td>
                <td className="border border-border p-2">0.4s</td>
                <td className="border border-border p-2">~5.7x</td>
              </tr>
              <tr className="bg-parchment-light">
                <td className="border border-border p-2">斐波那契数列（n=50）</td>
                <td className="border border-border p-2">不适用</td>
                <td className="border border-border p-2">指数级优化</td>
                <td className="border border-border p-2">巨大</td>
              </tr>
            </tbody>
          </table>

          <Callout type="warning" title="性能注意事项">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>仅适用于 CPU 密集型</strong>：IO 密集型任务应使用普通线程池</li>
              <li><strong>避免阻塞操作</strong>：ForkJoinPool 中的线程阻塞会导致整体性能下降</li>
              <li><strong>合理设置阈值</strong>：过小的任务粒度会增加 fork/join 开销</li>
              <li><strong>监控窃取次数</strong>：高窃取率表明负载不均衡，需调整任务拆分策略</li>
            </ul>
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区 1：Fork/Join 适合所有并行场景">
            <p className="mb-2"><strong>错误认知</strong>：认为 Fork/Join 是万能的并行解决方案。</p>
            <p><strong>正确理解</strong>：Fork/Join 专为 CPU 密集型的递归分治任务设计。对于 IO 密集型、非递归任务或简单并行循环，普通线程池或 Stream API 更合适。滥用 Fork/Join 反而会增加复杂度且降低性能。</p>
          </Callout>

          <Callout type="danger" title="误区 2：阈值越小越好">
            <p className="mb-2"><strong>错误认知</strong>：认为将任务拆分得越细，并行度越高。</p>
            <p><strong>正确理解</strong>：每次 fork/join 都有开销（约 1-5μs）。如果任务本身执行时间小于这个开销，并行化反而会更慢。经验法则是：单个任务的执行时间应在 100μs ~ 1ms 之间。</p>
          </Callout>

          <Callout type="danger" title="误区 3：ForkJoinPool 可以替代 ThreadPoolExecutor">
            <p className="mb-2"><strong>错误认知</strong>：认为 ForkJoinPool 在所有场景下都优于普通线程池。</p>
            <p><strong>正确理解</strong>：两者适用场景不同：ForkJoinPool 适合 CPU 密集型的递归任务，ThreadPoolExecutor 适合 IO 密集型或独立任务。Java 8 的 CompletableFuture 默认使用 ForkJoinPool.commonPool()，但可以通过自定义 Executor 切换。</p>
          </Callout>

          <Callout type="warning" title="误区 4：不需要优雅关闭 ForkJoinPool">
            <p className="mb-2"><strong>错误认知</strong>：认为 ForkJoinPool 会自动清理资源。</p>
            <p><strong>正确理解</strong>：虽然 commonPool() 会在 JVM 退出时自动关闭，但自定义的 ForkJoinPool 必须手动调用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">shutdown()</code>，否则会导致线程泄漏和资源浪费。生产环境务必注册 Shutdown Hook。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Fork/Join 框架的核心原理是什么？",
              answer: "Fork/Join 基于分治算法和 Work-Stealing 算法：① 将大任务递归拆分为小任务（Fork）；② 每个工作线程维护双端队列，从尾部取任务执行；③ 空闲线程从其他线程队列头部窃取任务（Work-Stealing）；④ 合并子任务结果（Join）。这种设计实现了自动负载均衡，充分利用多核 CPU。"
            },
            {
              question: "Work-Stealing 算法如何减少竞争？",
              answer: "Work-Stealing 通过双端队列和不同的访问策略减少竞争：① 任务所有者从队列尾部以 LIFO 方式取任务，利用缓存局部性；② 窃取者从队列头部以 FIFO 方式偷任务，与所有者操作不同端；③ 双端操作降低了同时访问同一位置的冲突概率；④ JDK 实现使用了无锁算法（CAS）进一步减少锁开销。"
            },
            {
              question: "RecursiveTask 和 RecursiveAction 的区别？",
              answer: "RecursiveTask<V> 用于有返回值的任务，compute() 方法返回泛型 V 类型的结果，适合需要聚合结果的场景（如求和、最大值）。RecursiveAction 用于无返回值的任务，compute() 返回 void，适合副作用操作（如排序、填充数组）。选择依据：是否需要合并子任务的结果。"
            },
            {
              question: "如何选择合适的阈值（Threshold）？",
              answer: "阈值选择遵循以下原则：① 太小会增加 fork/join 开销，降低性能；② 太大会限制并行度，无法充分利用多核；③ 经验值是单个任务执行时间在 100μs ~ 1ms；④ 通过压测找到最优值，观察不同阈值下的吞吐量和延迟；⑤ 可以考虑自适应阈值，根据运行时性能动态调整。"
            },
            {
              question: "ForkJoinPool 和 ThreadPoolExecutor 的区别？",
              answer: "主要区别：① 任务调度：ForkJoinPool 使用 Work-Stealing，ThreadPoolExecutor 使用固定队列；② 适用场景：ForkJoinPool 适合 CPU 密集型递归任务，ThreadPoolExecutor 适合 IO 密集型独立任务；③ 队列结构：ForkJoinPool 每线程一个双端队列，ThreadPoolExecutor 共享一个队列；④ 负载均衡：ForkJoinPool 自动均衡，ThreadPoolExecutor 需手动配置。"
            },
            {
              question: "Java 8 Stream 并行流底层使用了什么？",
              answer: "Stream 并行流（parallelStream()）底层使用 ForkJoinPool.commonPool()。它将流操作转换为 Fork/Join 任务，自动进行任务拆分和结果合并。优点是使用简单，缺点是难以调优（无法自定义并行度、阈值等）。对性能要求高的场景建议直接使用 ForkJoinPool。"
            },
            {
              question: "Fork/Join 框架的局限性有哪些？",
              answer: "主要局限：① 仅适合 CPU 密集型任务，IO 密集型会阻塞工作线程；② 任务必须是可递归拆分的，不适合独立任务；③ 调试困难，栈追踪复杂；④ 阈值需要手动调优；⑤ 不适合频繁创建销毁的场景（应复用 ForkJoinPool）。对于这些场景，应考虑使用普通线程池或其他并发工具。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/03-multithreading/thread-pool" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">线程池深入解析</div>
              <div className="text-[12px] text-ink-muted mt-1">ThreadPoolExecutor、队列策略</div>
            </a>
            <a href="/docs/03-multithreading/multi-threading-basics" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">基础理论 ←</div>
              <div className="font-semibold text-ink group-hover:text-accent">多线程基础</div>
              <div className="text-[12px] text-ink-muted mt-1">线程创建、生命周期、线程安全</div>
            </a>
            <a href="/docs/03-multithreading/concurrent-utils" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">并发工具类</div>
              <div className="text-[12px] text-ink-muted mt-1">CountDownLatch、CyclicBarrier</div>
            </a>
            <a href="/docs/05-functional-programming/stream-api" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">应用场景 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Stream API 深度解析</div>
              <div className="text-[12px] text-ink-muted mt-1">并行流底层实现</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            Fork/Join 是高级并发编程的重要内容，建议通过以下方式深入学习：① 阅读 ForkJoinPool 源码，理解 Work-Stealing 的实现细节；② 在实际项目中应用 Fork/Join 解决 CPU 密集型问题；③ 对比 Stream 并行流和 Fork/Join 的性能差异；④ 学习 Java 9+ 的改进（如 Phaser 集成、更好的监控 API）。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
