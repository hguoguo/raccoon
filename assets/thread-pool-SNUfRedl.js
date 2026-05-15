import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as n}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as d}from"./SideNote-BKvanovA.js";import{C as r,A as a,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as s}from"./DiagramBlock-CLaKE9_7.js";import{I as c}from"./InterviewSection-BBNdwyyN.js";const x=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、线程池架构",level:2},{id:"core-params",text:"二、核心参数详解",level:2},{id:"work-process",text:"三、工作流程",level:2},{id:"queue-strategy",text:"四、队列策略",level:2},{id:"reject-policy",text:"五、拒绝策略",level:2},{id:"thread-factory",text:"六、ThreadFactory",level:2},{id:"shutdown",text:"七、优雅关闭",level:2},{id:"best-practices",text:"八、最佳实践",level:2},{id:"misconceptions",text:"九、常见误区",level:2},{id:"interview",text:"十、面试真题",level:2},{id:"related",text:"十一、知识关联",level:2}];function N({meta:o}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(n,{meta:o,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["线程池是",e.jsx("strong",{className:"text-accent",children:"管理线程生命周期的容器"}),"，通过复用线程减少创建销毁开销，控制并发数量防止资源耗尽， 提供任务队列、拒绝策略等机制实现高效的异步任务执行。"]})}),e.jsx(r,{type:"tip",title:"为什么需要线程池？",children:"频繁创建销毁线程会带来巨大的性能开销（线程创建约需 1ms，上下文切换约需 5μs）。线程池通过复用线程、控制并发度、管理任务队列，在高并发场景下显著提升系统性能和稳定性。"}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、线程池架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java 线程池的核心类是 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"ThreadPoolExecutor"}),"，它继承自 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"AbstractExecutorService"}),"，实现了 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"ExecutorService"})," 接口。"]}),e.jsx(s,{title:"ThreadPoolExecutor 核心组件",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌─────────────────────────────────────────────┐
│         ThreadPoolExecutor                  │
├─────────────────────────────────────────────┤
│  corePoolSize    : 核心线程数                │
│  maximumPoolSize : 最大线程数                │
│  keepAliveTime   : 空闲线程存活时间          │
│  workQueue       : 任务队列                  │
│  threadFactory   : 线程工厂                  │
│  handler         : 拒绝策略                  │
├─────────────────────────────────────────────┤
│  Worker Threads (线程池中的工作线程)          │
│  ┌──────┐ ┌──────┐ ┌──────┐                │
│  │Thread│ │Thread│ │Thread│ ...             │
│  └──┬───┘ └──┬───┘ └──┬───┘                │
└─────┼────────┼────────┼────────────────────┘
      │        │        │
      ▼        ▼        ▼
  ┌────────────────────────┐
  │   BlockingQueue        │
  │   (workQueue)          │
  │   ┌───┐┌───┐┌───┐     │
  │   │T1 ││T2 ││T3 │...  │
  │   └───┘└───┘└───┘     │
  └────────────────────────┘
            `})}),e.jsxs(d,{label:"Worker 线程",children:["每个 Worker 线程都是一个 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"Thread"})," 对象，它会循环从队列中获取任务并执行。Worker 内部持有锁，确保线程安全地访问共享状态。"]}),e.jsx("h2",{id:"core-params",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、核心参数详解"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"ThreadPoolExecutor"})," 构造函数包含 7 个核心参数，理解它们是正确使用线程池的关键。"]}),e.jsx(t,{code:`public ThreadPoolExecutor(
    int corePoolSize,        // 核心线程数
    int maximumPoolSize,     // 最大线程数
    long keepAliveTime,      // 空闲线程存活时间
    TimeUnit unit,           // 时间单位
    BlockingQueue<Runnable> workQueue,  // 任务队列
    ThreadFactory threadFactory,        // 线程工厂
    RejectedExecutionHandler handler    // 拒绝策略
) {
    // 参数校验
    if (corePoolSize < 0 ||
        maximumPoolSize <= 0 ||
        maximumPoolSize < corePoolSize ||
        keepAliveTime < 0)
        throw new IllegalArgumentException();
    
    this.corePoolSize = corePoolSize;
    this.maximumPoolSize = maximumPoolSize;
    this.workQueue = workQueue;
    this.keepAliveTime = unit.toNanos(keepAliveTime);
    this.threadFactory = threadFactory;
    this.handler = handler;
}`,language:"java",highlights:[2,3,4,5,6,7,8],filename:"ThreadPoolExecutor.java",description:"ThreadPoolExecutor 构造函数"}),e.jsx("h3",{id:"core-pool-size",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1. corePoolSize（核心线程数）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["线程池中保持的最小线程数，即使这些线程处于空闲状态也不会被回收（除非设置了 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"allowCoreThreadTimeOut"}),"）。"]}),e.jsx(r,{type:"info",title:"核心线程行为",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"新任务到达"}),"：如果当前线程数 < corePoolSize，创建新线程执行任务"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"线程空闲"}),"：核心线程不会被回收（默认配置下）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"推荐值"}),"：CPU 密集型 = CPU 核数 + 1；IO 密集型 = CPU 核数 × 2"]})]})}),e.jsx("h3",{id:"maximum-pool-size",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2. maximumPoolSize（最大线程数）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"线程池中允许的最大线程数。当任务队列满且当前线程数 < maximumPoolSize 时，会创建非核心线程来处理任务。"}),e.jsx("h3",{id:"keep-alive-time",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3. keepAliveTime（空闲线程存活时间）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"非核心线程在空闲状态下保持存活的时间。超过此时间后，多余的非核心线程会被回收。"}),e.jsxs(d,{label:"allowCoreThreadTimeOut",children:["调用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"executor.allowCoreThreadTimeOut(true)"})," 可以让核心线程也受 keepAliveTime 限制，适用于负载波动大的场景。"]}),e.jsx("h2",{id:"work-process",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、工作流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"线程池处理任务的流程遵循严格的优先级顺序，理解这个流程对调优至关重要。"}),e.jsx(s,{title:"线程池任务提交流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
新任务提交
    │
    ▼
┌──────────────────────┐
│ 当前线程数 <          │
│ corePoolSize?        │
└────┬────────────┬────┘
     │ Yes        │ No
     ▼            ▼
  创建核心线程  ┌──────────────────────┐
               │ 任务队列是否已满？    │
               └────┬────────────┬────┘
                    │ No         │ Yes
                    ▼            ▼
               加入任务队列  ┌──────────────────────┐
                           │ 当前线程数 <          │
                           │ maximumPoolSize?      │
                           └────┬────────────┬────┘
                                │ Yes        │ No
                                ▼            ▼
                           创建非核心线程  执行拒绝策略
            `})}),e.jsx(t,{code:`// 示例：模拟线程池工作流程
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    2,              // corePoolSize
    4,              // maximumPoolSize
    60L,            // keepAliveTime
    TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(2),  // 容量为 2 的队列
    Executors.defaultThreadFactory(),
    new ThreadPoolExecutor.AbortPolicy()
);

// 提交 8 个任务，观察行为
for (int i = 1; i <= 8; i++) {
    final int taskId = i;
    executor.submit(() -> {
        System.out.println("任务 " + taskId + 
            " 由线程 " + Thread.currentThread().getName() + " 执行");
        try {
            Thread.sleep(2000);  // 模拟耗时操作
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    });
    System.out.println("已提交任务 " + taskId);
}

/*
预期输出（时间顺序）：
已提交任务 1
已提交任务 2
已提交任务 3
已提交任务 4
已提交任务 5
Exception in thread "main" java.util.concurrent.RejectedExecutionException
*/`,language:"java",highlights:[3,4,5,6,7],filename:"ThreadPoolWorkflow.java",description:"线程池工作流程演示"}),e.jsxs(r,{type:"warning",title:"关键结论",children:["任务提交顺序：",e.jsx("strong",{children:"核心线程 → 任务队列 → 非核心线程 → 拒绝策略"}),"。只有当队列满时才会创建非核心线程，这是很多开发者的认知盲区。"]}),e.jsx("h2",{id:"queue-strategy",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、队列策略"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["任务队列的选择直接影响线程池的行为和性能。Java 提供了多种 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"BlockingQueue"})," 实现。"]}),e.jsx(t,{code:`// 1. ArrayBlockingQueue：有界队列（推荐）
BlockingQueue<Runnable> queue1 = new ArrayBlockingQueue<>(100);
// 特点：固定容量，超出容量时触发拒绝策略
// 适用：大多数生产场景，防止内存溢出

// 2. LinkedBlockingQueue：无界队列（谨慎使用）
BlockingQueue<Runnable> queue2 = new LinkedBlockingQueue<>();
// 特点：默认 Integer.MAX_VALUE 容量，几乎不会满
// 风险：任务堆积导致 OOM，maximumPoolSize 失效

// 3. SynchronousQueue：不存储元素的队列
BlockingQueue<Runnable> queue3 = new SynchronousQueue<>();
// 特点：每个插入操作必须等待另一个线程的移除操作
// 适用：高吞吐量场景，如 Executors.newCachedThreadPool()

// 4. PriorityBlockingQueue：优先级队列
BlockingQueue<Runnable> queue4 = new PriorityBlockingQueue<>(
    100, 
    Comparator.comparingInt(task -> task.getPriority())
);
// 特点：按优先级排序，优先级高的先执行
// 注意：需要自定义 Runnable 支持优先级`,language:"java",highlights:[2,6,10,14],filename:"QueueStrategies.java",description:"四种常用任务队列对比"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"队列类型"}),e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"是否有界"}),e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"适用场景"}),e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"风险"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"ArrayBlockingQueue"})}),e.jsx("td",{className:"border border-border p-2",children:"✅ 有界"}),e.jsx("td",{className:"border border-border p-2",children:"通用场景"}),e.jsx("td",{className:"border border-border p-2",children:"可能触发拒绝"})]}),e.jsxs("tr",{className:"bg-parchment-light",children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"LinkedBlockingQueue"})}),e.jsx("td",{className:"border border-border p-2",children:"❌ 无界"}),e.jsx("td",{className:"border border-border p-2",children:"低负载场景"}),e.jsx("td",{className:"border border-border p-2",children:"OOM 风险"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"SynchronousQueue"})}),e.jsx("td",{className:"border border-border p-2",children:"✅ 无存储"}),e.jsx("td",{className:"border border-border p-2",children:"高吞吐场景"}),e.jsx("td",{className:"border border-border p-2",children:"线程数激增"})]}),e.jsxs("tr",{className:"bg-parchment-light",children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"PriorityBlockingQueue"})}),e.jsx("td",{className:"border border-border p-2",children:"❌ 无界"}),e.jsx("td",{className:"border border-border p-2",children:"优先级调度"}),e.jsx("td",{className:"border border-border p-2",children:"OOM + 饥饿"})]})]})]}),e.jsx("h2",{id:"reject-policy",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、拒绝策略"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"当线程池无法接受新任务时（队列满且达到最大线程数），会触发拒绝策略。JDK 提供了 4 种内置策略。"}),e.jsx(t,{code:`// 1. AbortPolicy（默认）：抛出异常
RejectedExecutionHandler abort = new ThreadPoolExecutor.AbortPolicy();
// 行为：直接抛出 RejectedExecutionException
// 适用：不允许任务丢失的场景，由调用方处理异常

// 2. CallerRunsPolicy：调用者运行
RejectedExecutionHandler callerRuns = new ThreadPoolExecutor.CallerRunsPolicy();
// 行为：由提交任务的线程自己执行该任务
// 适用：希望减缓提交速度的场景，提供简单反馈控制

// 3. DiscardPolicy：静默丢弃
RejectedExecutionHandler discard = new ThreadPoolExecutor.DiscardPolicy();
// 行为：直接丢弃任务，不抛异常也不通知
// 适用：允许任务丢失的非关键业务

// 4. DiscardOldestPolicy：丢弃最老任务
RejectedExecutionHandler discardOldest = new ThreadPoolExecutor.DiscardOldestPolicy();
// 行为：丢弃队列中最老的任务，然后重试提交
// 适用：新任务比旧任务更重要的场景

// 5. 自定义拒绝策略
RejectedExecutionHandler custom = (r, executor) -> {
    // 记录日志
    System.err.println("任务被拒绝: " + r.toString());
    
    // 持久化到数据库或消息队列
    saveToDatabase(r);
    
    // 或者降级处理
    fallbackService.execute(r);
};`,language:"java",highlights:[2,7,12,17,22],filename:"RejectPolicies.java",description:"五种拒绝策略对比"}),e.jsxs(r,{type:"danger",title:"生产环境建议",children:[e.jsx("strong",{children:"不要使用默认的 AbortPolicy"}),"！它会导致未捕获的异常中断业务流程。推荐使用：",e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"CallerRunsPolicy"}),"：提供背压机制，自动减缓提交速度"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"自定义策略"}),"：记录日志 + 持久化 + 告警，确保任务不丢失"]})]})]}),e.jsx("h2",{id:"thread-factory",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、ThreadFactory"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"ThreadFactory 用于自定义线程的创建逻辑，包括线程名称、优先级、是否为守护线程等。良好的线程命名对问题排查至关重要。"}),e.jsx(t,{code:`import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;

// 自定义 ThreadFactory
public class NamedThreadFactory implements ThreadFactory {
    private final String namePrefix;
    private final AtomicInteger threadNumber = new AtomicInteger(1);
    private final boolean daemon;
    private final int priority;

    public NamedThreadFactory(String namePrefix, boolean daemon, int priority) {
        this.namePrefix = namePrefix;
        this.daemon = daemon;
        this.priority = priority;
    }

    @Override
    public Thread newThread(Runnable r) {
        Thread thread = new Thread(r, namePrefix + "-thread-" + threadNumber.getAndIncrement());
        thread.setDaemon(daemon);
        thread.setPriority(priority);
        
        // 设置未捕获异常处理器
        thread.setUncaughtExceptionHandler((t, e) -> {
            System.err.println("线程 " + t.getName() + " 发生未捕获异常: " + e.getMessage());
            e.printStackTrace();
        });
        
        return thread;
    }
}

// 使用示例
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    4, 8, 60L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(100),
    new NamedThreadFactory("order-service", false, Thread.NORM_PRIORITY),
    new ThreadPoolExecutor.CallerRunsPolicy()
);

// 线程名称示例：order-service-thread-1, order-service-thread-2...`,language:"java",highlights:[5,19,24,35],filename:"NamedThreadFactory.java",description:"自定义 ThreadFactory"}),e.jsxs(d,{label:"线程命名规范",children:["推荐格式：",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"{业务模块}-{功能}-{序号}"}),"，如 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"order-service-thread-1"}),"。这样在日志和线程 dump 中能快速定位问题来源。"]}),e.jsx("h2",{id:"shutdown",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、优雅关闭"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"正确关闭线程池是避免任务丢失和资源泄漏的关键。JDK 提供了两种关闭方法。"}),e.jsx(t,{code:`ThreadPoolExecutor executor = new ThreadPoolExecutor(
    4, 8, 60L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(100)
);

// 提交任务...

// 方式 1：shutdown() - 温和关闭
executor.shutdown();  // 不再接受新任务，等待已有任务完成

try {
    // 等待最多 60 秒让所有任务完成
    if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
        System.err.println("部分任务未在 60 秒内完成");
        
        // 方式 2：shutdownNow() - 强制关闭
        List<Runnable> pendingTasks = executor.shutdownNow();
        System.out.println("未完成任务数: " + pendingTasks.size());
        
        // 再次等待
        if (!executor.awaitTermination(10, TimeUnit.SECONDS)) {
            System.err.println("线程池未能正常关闭");
        }
    }
} catch (InterruptedException e) {
    // 当前线程被中断，也要强制关闭
    executor.shutdownNow();
    Thread.currentThread().interrupt();
}

// Spring Boot 中的应用：注册 Shutdown Hook
Runtime.getRuntime().addShutdownHook(new Thread(() -> {
    System.out.println("正在关闭线程池...");
    gracefulShutdown(executor);
}));`,language:"java",highlights:[8,13,17,26,32],filename:"GracefulShutdown.java",description:"线程池优雅关闭流程"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"方法"}),e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"行为"}),e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"返回值"}),e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"适用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"shutdown()"})}),e.jsx("td",{className:"border border-border p-2",children:"停止接收新任务，等待已完成"}),e.jsx("td",{className:"border border-border p-2",children:"void"}),e.jsx("td",{className:"border border-border p-2",children:"正常关闭"})]}),e.jsxs("tr",{className:"bg-parchment-light",children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"shutdownNow()"})}),e.jsx("td",{className:"border border-border p-2",children:"中断所有线程，返回未执行任务"}),e.jsx("td",{className:"border border-border p-2",children:"List<Runnable>"}),e.jsx("td",{className:"border border-border p-2",children:"紧急关闭"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"awaitTermination()"})}),e.jsx("td",{className:"border border-border p-2",children:"阻塞等待指定时间"}),e.jsx("td",{className:"border border-border p-2",children:"boolean"}),e.jsx("td",{className:"border border-border p-2",children:"配合 shutdown 使用"})]})]})]}),e.jsx("h2",{id:"best-practices",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、最佳实践"}),e.jsx(r,{type:"tip",title:"参数配置建议",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"CPU 密集型"}),"：corePoolSize = CPU 核数 + 1，maximumPoolSize = corePoolSize"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"IO 密集型"}),"：corePoolSize = CPU 核数 × 2，maximumPoolSize = corePoolSize × 2"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"混合型"}),"：根据 CPU/IO 比例动态调整，或使用自适应线程池"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"队列容量"}),"：根据业务峰值 QPS × 平均响应时间估算，预留 20% 余量"]})]})}),e.jsx(t,{code:`// 最佳实践示例：订单处理线程池
public class OrderThreadPool {
    private static final int CPU_CORES = Runtime.getRuntime().availableProcessors();
    
    private static final ThreadPoolExecutor ORDER_EXECUTOR = new ThreadPoolExecutor(
        CPU_CORES * 2,              // corePoolSize: IO 密集型
        CPU_CORES * 4,              // maximumPoolSize
        60L,                        // keepAliveTime
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(1000),  // 有界队列，防止 OOM
        new NamedThreadFactory("order-pool", false, Thread.NORM_PRIORITY),
        new ThreadPoolExecutor.CallerRunsPolicy()  // 背压机制
    );
    
    static {
        // JVM 退出时优雅关闭
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("正在关闭订单线程池...");
            ORDER_EXECUTOR.shutdown();
            try {
                if (!ORDER_EXECUTOR.awaitTermination(30, TimeUnit.SECONDS)) {
                    ORDER_EXECUTOR.shutdownNow();
                }
            } catch (InterruptedException e) {
                ORDER_EXECUTOR.shutdownNow();
                Thread.currentThread().interrupt();
            }
        }));
    }
    
    public static void submitOrder(Order order) {
        ORDER_EXECUTOR.submit(() -> processOrder(order));
    }
    
    private static void processOrder(Order order) {
        // 订单处理逻辑
        System.out.println("处理订单: " + order.getId());
    }
    
    // 监控指标
    public static Map<String, Object> getMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("activeCount", ORDER_EXECUTOR.getActiveCount());
        metrics.put("poolSize", ORDER_EXECUTOR.getPoolSize());
        metrics.put("queueSize", ORDER_EXECUTOR.getQueue().size());
        metrics.put("completedTaskCount", ORDER_EXECUTOR.getCompletedTaskCount());
        return metrics;
    }
}`,language:"java",highlights:[6,7,8,9,10,11,12,16,41],filename:"OrderThreadPool.java",description:"生产级线程池配置示例"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、常见误区"}),e.jsxs(r,{type:"danger",title:"误区 1：Executors 工厂方法可以直接用",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误代码"}),"："]}),e.jsx("pre",{className:"bg-parchment-deep p-3 rounded-paper-sm text-[12px] font-mono mb-2",children:`ExecutorService executor = Executors.newFixedThreadPool(10);
ExecutorService executor = Executors.newCachedThreadPool();`}),e.jsxs("p",{children:[e.jsx("strong",{children:"问题"}),"：",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"newFixedThreadPool"})," 使用无界队列（OOM 风险），",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"newCachedThreadPool"})," 允许创建无限线程（资源耗尽风险）。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确做法"}),"：始终手动创建 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"ThreadPoolExecutor"}),"，明确指定所有参数。"]})]}),e.jsxs(r,{type:"danger",title:"误区 2：线程数越多越好",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为增加线程数可以提升吞吐量。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：线程过多会导致频繁的上下文切换（每次约 5μs），反而降低性能。CPU 密集型任务应限制线程数，IO 密集型可适当增加，但需通过压测找到最优值。"]})]}),e.jsxs(r,{type:"danger",title:"误区 3：任务队列越大越安全",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为增大队列容量可以容纳更多任务。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：过大的队列会掩盖线程池配置问题，导致任务积压、响应延迟增加，甚至引发 OOM。应根据业务 SLA 设置合理的队列容量，配合监控告警及时发现瓶颈。"]})]}),e.jsxs(r,{type:"warning",title:"误区 4：submit() 和 execute() 没区别",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为两者只是返回值不同。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"execute()"})," 的异常会直接抛出，而 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"submit()"})," 的异常会被吞掉，必须通过 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"Future.get()"})," 才能获取。生产环境建议使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"execute()"})," 或正确处理 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"Future"}),"。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、面试真题"}),e.jsx(c,{questions:[{question:"线程池的核心工作流程是什么？",answer:"① 判断当前线程数是否小于 corePoolSize，是则创建核心线程；② 否则尝试将任务加入工作队列；③ 如果队列已满且当前线程数小于 maximumPoolSize，则创建非核心线程；④ 如果达到 maximumPoolSize 且队列已满，则执行拒绝策略。关键点：只有队列满时才会创建非核心线程。"},{question:"为什么阿里巴巴禁止使用 Executors 创建线程池？",answer:"Executors 提供的工厂方法存在两大风险：① newFixedThreadPool 和 newSingleThreadExecutor 使用 LinkedBlockingQueue（无界队列），可能导致 OOM；② newCachedThreadPool 和 newScheduledThreadPool 允许创建 Integer.MAX_VALUE 个线程，可能导致资源耗尽。应手动创建 ThreadPoolExecutor，明确指定所有参数。"},{question:"如何合理配置线程池参数？",answer:"① CPU 密集型：corePoolSize = CPU 核数 + 1，避免过多上下文切换；② IO 密集型：corePoolSize = CPU 核数 × 2，因为线程大部分时间在等待 IO；③ 队列容量：根据峰值 QPS × 平均响应时间估算，预留 20% 余量；④ 拒绝策略：使用 CallerRunsPolicy 或自定义策略，避免任务丢失；⑤ 通过压测验证配置合理性。"},{question:"shutdown() 和 shutdownNow() 的区别？",answer:"shutdown() 是温和关闭：停止接收新任务，等待已提交任务完成，不会中断正在执行的任务。shutdownNow() 是强制关闭：立即中断所有线程（通过 Thread.interrupt()），返回未执行的任务列表。生产环境应先调用 shutdown()，超时后再调用 shutdownNow()。"},{question:"线程池中的线程是如何复用的？",answer:"Worker 线程执行完一个任务后，不会立即退出，而是进入循环从工作队列中获取下一个任务（通过 BlockingQueue.take() 阻塞等待）。只有当队列为空且超过 keepAliveTime 时，非核心线程才会退出。这种设计避免了频繁创建销毁线程的开销。"},{question:"如何监控线程池的运行状态？",answer:"通过以下方法获取关键指标：① getActiveCount()：正在执行任务的线程数；② getPoolSize()：当前线程总数；③ getQueue().size()：队列中等待的任务数；④ getCompletedTaskCount()：已完成任务总数；⑤ getRejectedExecutionHandler()：拒绝策略。建议将这些指标接入监控系统（如 Prometheus），设置告警阈值。"},{question:"线程池大小设置为 1 有什么问题？",answer:"单线程池存在两个主要问题：① 无法利用多核 CPU 的并行能力；② 如果某个任务阻塞（如同步 IO、死锁），整个线程池会停滞，后续任务无法执行。除非业务明确要求串行执行（如订单状态变更），否则不建议使用单线程池。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/03-multithreading/multi-threading-basics",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"多线程基础"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"线程创建、生命周期、线程安全"})]}),e.jsxs("a",{href:"/docs/03-multithreading/concurrent-utils",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-accent mb-1",children:"相关技术 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-accent",children:"并发工具类"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"CountDownLatch、CyclicBarrier"})]}),e.jsxs("a",{href:"/docs/03-multithreading/fork-join",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"高级主题 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"Fork/Join 框架"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"工作窃取算法、分治并行"})]}),e.jsxs("a",{href:"/docs/03-multithreading/synchronization",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"同步机制 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"同步机制详解"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"synchronized、ReentrantLock"})]})]}),e.jsx(r,{type:"info",title:"学习建议",children:"线程池是高并发编程的核心基础设施，建议通过以下方式深入学习：① 阅读 ThreadPoolExecutor 源码，理解 worker 线程的实现；② 在实际项目中应用线程池，积累调优经验；③ 学习 CompletableFuture 结合线程池的异步编程模式；④ 掌握线程池监控和故障排查技巧。"}),e.jsx(a,{...i(o.category,o.id)})]})}),e.jsx(l,{items:x})]})}export{N as default};
