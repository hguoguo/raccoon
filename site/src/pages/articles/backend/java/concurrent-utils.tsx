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
  { id: 'countdownlatch', text: '一、CountDownLatch', level: 2 },
  { id: 'cyclicbarrier', text: '二、CyclicBarrier', level: 2 },
  { id: 'semaphore', text: '三、Semaphore', level: 2 },
  { id: 'phaser', text: '四、Phaser', level: 2 },
  { id: 'exchanger', text: '五、Exchanger', level: 2 },
  { id: 'comparison', text: '六、对比总结', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function ConcurrentUtils({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              并发工具类是 Java <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">java.util.concurrent</code> 包提供的高级同步机制，
              包括<strong className="text-accent">CountDownLatch（倒计时锁）、CyclicBarrier（循环屏障）、Semaphore（信号量）</strong>等，
              用于简化多线程协作、资源控制和任务协调。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要并发工具类？">
            传统的 synchronized 和 wait/notify 机制过于底层，容易出错且难以维护。JUC 工具类提供了更高层次的抽象，如倒计时、屏障、限流等常见并发模式，使代码更简洁、更安全。
          </Callout>

          <h2 id="countdownlatch" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、CountDownLatch
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            CountDownLatch 允许一个或多个线程等待其他线程完成一组操作。它通过计数器实现：初始化时设置计数值，每次调用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">countDown()</code> 减 1，当计数器归零时，所有等待的线程被唤醒。
          </p>

          <DiagramBlock title="CountDownLatch 工作流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
主线程                          Worker 线程
  │                               │
  ├─ new CountDownLatch(3)       │
  │                               │
  ├─ 启动线程 1 ───────────────▶ │ countDown() → 2
  ├─ 启动线程 2 ───────────────▶ │ countDown() → 1
  ├─ 启动线程 3 ───────────────▶ │ countDown() → 0
  │                               │
  ├─ await() ◀──────────────────┤ (唤醒)
  │   (阻塞等待)                  │
  ▼                               ▼
继续执行                      线程结束
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`import java.util.concurrent.CountDownLatch;

public class CountDownLatchDemo {
    public static void main(String[] args) throws InterruptedException {
        int threadCount = 3;
        CountDownLatch latch = new CountDownLatch(threadCount);
        
        // 启动 3 个工作线程
        for (int i = 1; i <= threadCount; i++) {
            final int taskId = i;
            new Thread(() -> {
                try {
                    System.out.println("线程 " + taskId + " 开始执行");
                    Thread.sleep((long) (Math.random() * 2000));  // 模拟耗时操作
                    System.out.println("线程 " + taskId + " 执行完成");
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    latch.countDown();  // 计数器减 1
                    System.out.println("计数器剩余: " + latch.getCount());
                }
            }).start();
        }
        
        // 主线程等待所有工作线程完成
        System.out.println("主线程等待中...");
        latch.await();  // 阻塞直到计数器归零
        System.out.println("所有线程执行完毕，主线程继续");
    }
}

/*
预期输出：
主线程等待中...
线程 1 开始执行
线程 2 开始执行
线程 3 开始执行
线程 2 执行完成
计数器剩余: 2
线程 1 执行完成
计数器剩余: 1
线程 3 执行完成
计数器剩余: 0
所有线程执行完毕，主线程继续
*/`}
            language="java"
            highlights={[6, 17, 24, 27]}
            filename="CountDownLatchDemo.java"
            description="CountDownLatch 基础用法"
          />

          <h3 id="latch-scenarios" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            典型应用场景
          </h3>

          <Playground
            code={`// 场景 1：并行初始化多个组件，等待全部完成后启动服务
public class ServiceStartup {
    private static final int COMPONENT_COUNT = 4;
    
    public void startup() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(COMPONENT_COUNT);
        
        // 并行初始化数据库连接池
        new Thread(() -> {
            initDatabase();
            latch.countDown();
        }).start();
        
        // 并行初始化缓存
        new Thread(() -> {
            initCache();
            latch.countDown();
        }).start();
        
        // 并行初始化消息队列
        new Thread(() -> {
            initMessageQueue();
            latch.countDown();
        }).start();
        
        // 并行初始化配置中心
        new Thread(() -> {
            initConfigCenter();
            latch.countDown();
        }).start();
        
        // 等待所有组件初始化完成
        latch.await();
        System.out.println("所有组件初始化完成，服务启动");
    }
}

// 场景 2：性能测试 - 模拟并发请求
public class PerformanceTest {
    public void testConcurrentRequests() throws InterruptedException {
        int threadCount = 100;
        CountDownLatch startLatch = new CountDownLatch(1);  // 统一启动
        CountDownLatch endLatch = new CountDownLatch(threadCount);  // 等待全部完成
        
        for (int i = 0; i < threadCount; i++) {
            new Thread(() -> {
                try {
                    startLatch.await();  // 等待统一启动信号
                    executeRequest();  // 执行请求
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    endLatch.countDown();
                }
            }).start();
        }
        
        long startTime = System.currentTimeMillis();
        startLatch.countDown();  // 统一启动所有线程
        endLatch.await();  // 等待所有请求完成
        long endTime = System.currentTimeMillis();
        
        System.out.println("总耗时: " + (endTime - startTime) + "ms");
        System.out.println("平均 QPS: " + (threadCount * 1000.0 / (endTime - startTime)));
    }
}`}
            language="java"
            highlights={[6, 11, 37, 40, 47, 50]}
            filename="CountDownLatchScenarios.java"
            description="CountDownLatch 实际应用场景"
          />

          <SideNote label="一次性使用">
            CountDownLatch 的计数器只能递减不能重置，一旦归零就无法再次使用。如果需要可重用的屏障，应使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">CyclicBarrier</code>。
          </SideNote>

          <h2 id="cyclicbarrier" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、CyclicBarrier
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            CyclicBarrier 让一组线程互相等待，直到所有线程都到达某个屏障点（barrier point），然后同时继续执行。与 CountDownLatch 不同，CyclicBarrier 可以重复使用。
          </p>

          <DiagramBlock title="CyclicBarrier 工作流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
线程 1         线程 2         线程 3
  │              │              │
  ├─ 执行任务    ├─ 执行任务    ├─ 执行任务
  │              │              │
  ├─ await()     ├─ await()     ├─ await()
  │   (等待)     │   (等待)     │   (等待)
  │              │              │
  │◀────────────▶│◀────────────▶│
  │   所有线程到达屏障点          │
  │              │              │
  ├─ 继续执行    ├─ 继续执行    ├─ 继续执行
  ▼              ▼              ▼
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.BrokenBarrierException;

public class CyclicBarrierDemo {
    public static void main(String[] args) {
        int partyCount = 3;
        
        // 创建屏障，所有线程到达后执行回调
        CyclicBarrier barrier = new CyclicBarrier(partyCount, () -> {
            System.out.println("所有线程已到达屏障，执行汇总操作");
        });
        
        // 启动 3 个线程
        for (int i = 1; i <= partyCount; i++) {
            final int taskId = i;
            new Thread(() -> {
                try {
                    // 第一阶段：数据收集
                    System.out.println("线程 " + taskId + " 正在收集数据");
                    Thread.sleep((long) (Math.random() * 2000));
                    System.out.println("线程 " + taskId + " 数据收集完成");
                    
                    // 等待所有线程完成第一阶段
                    barrier.await();
                    
                    // 第二阶段：数据处理（所有线程同时开始）
                    System.out.println("线程 " + taskId + " 开始处理数据");
                    Thread.sleep(1000);
                    System.out.println("线程 " + taskId + " 数据处理完成");
                    
                    // 重置屏障，进行下一轮
                    System.out.println("线程 " + taskId + " 准备进入下一轮");
                    
                } catch (InterruptedException | BrokenBarrierException e) {
                    Thread.currentThread().interrupt();
                }
            }).start();
        }
    }
}

/*
预期输出：
线程 1 正在收集数据
线程 2 正在收集数据
线程 3 正在收集数据
线程 2 数据收集完成
线程 1 数据收集完成
线程 3 数据收集完成
所有线程已到达屏障，执行汇总操作
线程 1 开始处理数据
线程 2 开始处理数据
线程 3 开始处理数据
线程 1 数据处理完成
线程 1 准备进入下一轮
线程 2 数据处理完成
线程 2 准备进入下一轮
线程 3 数据处理完成
线程 3 准备进入下一轮
*/`}
            language="java"
            highlights={[9, 10, 25, 33]}
            filename="CyclicBarrierDemo.java"
            description="CyclicBarrier 多阶段任务"
          />

          <h3 id="barrier-vs-latch" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            CyclicBarrier vs CountDownLatch
          </h3>

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border p-2 text-left font-semibold">特性</th>
                <th className="border border-border p-2 text-left font-semibold">CountDownLatch</th>
                <th className="border border-border p-2 text-left font-semibold">CyclicBarrier</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2"><strong>重用性</strong></td>
                <td className="border border-border p-2">❌ 一次性</td>
                <td className="border border-border p-2">✅ 可重置</td>
              </tr>
              <tr className="bg-parchment-light">
                <td className="border border-border p-2"><strong>触发方式</strong></td>
                <td className="border border-border p-2">计数器归零</td>
                <td className="border border-border p-2">所有线程到达</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><strong>等待方</strong></td>
                <td className="border border-border p-2">一个或多个线程</td>
                <td className="border border-border p-2">所有参与线程</td>
              </tr>
              <tr className="bg-parchment-light">
                <td className="border border-border p-2"><strong>回调函数</strong></td>
                <td className="border border-border p-2">❌ 不支持</td>
                <td className="border border-border p-2">✅ 支持</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><strong>典型场景</strong></td>
                <td className="border border-border p-2">等待多个任务完成</td>
                <td className="border border-border p-2">多阶段并行计算</td>
              </tr>
            </tbody>
          </table>

          <h2 id="semaphore" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Semaphore
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Semaphore（信号量）用于控制同时访问特定资源的线程数量。它维护了一组许可证（permits），线程通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">acquire()</code> 获取许可证，通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">release()</code> 释放许可证。
          </p>

          <Playground
            code={`import java.util.concurrent.Semaphore;

public class SemaphoreDemo {
    public static void main(String[] args) {
        // 最多允许 3 个线程同时访问
        Semaphore semaphore = new Semaphore(3);
        
        // 模拟 10 个线程竞争资源
        for (int i = 1; i <= 10; i++) {
            final int taskId = i;
            new Thread(() -> {
                try {
                    System.out.println("线程 " + taskId + " 尝试获取许可证");
                    semaphore.acquire();  // 获取许可证（阻塞）
                    
                    System.out.println("线程 " + taskId + " 获得许可证，可用许可证: " + 
                        semaphore.availablePermits());
                    
                    // 模拟业务操作
                    Thread.sleep(2000);
                    System.out.println("线程 " + taskId + " 执行完成");
                    
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    semaphore.release();  // 释放许可证
                    System.out.println("线程 " + taskId + " 释放许可证，可用许可证: " + 
                        semaphore.availablePermits());
                }
            }).start();
        }
    }
}

/*
预期输出（部分）：
线程 1 尝试获取许可证
线程 2 尝试获取许可证
线程 3 尝试获取许可证
线程 1 获得许可证，可用许可证: 2
线程 2 获得许可证，可用许可证: 1
线程 3 获得许可证，可用许可证: 0
线程 4 尝试获取许可证 (阻塞等待)
...
*/`}
            language="java"
            highlights={[6, 14, 26]}
            filename="SemaphoreDemo.java"
            description="Semaphore 限流示例"
          />

          <h3 id="semaphore-scenarios" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            典型应用场景
          </h3>

          <Playground
            code={`// 场景 1：数据库连接池限流
public class DatabaseConnectionPool {
    private final Semaphore semaphore;
    private final Queue<Connection> connections;
    
    public DatabaseConnectionPool(int maxConnections) {
        this.semaphore = new Semaphore(maxConnections);
        this.connections = new LinkedList<>();
        // 初始化连接...
    }
    
    public Connection getConnection() throws InterruptedException {
        semaphore.acquire();  // 获取许可证
        synchronized (connections) {
            return connections.poll();
        }
    }
    
    public void releaseConnection(Connection conn) {
        synchronized (connections) {
            connections.offer(conn);
        }
        semaphore.release();  // 释放许可证
    }
}

// 场景 2：API 速率限制
public class RateLimiter {
    private final Semaphore semaphore;
    
    public RateLimiter(int maxRequestsPerSecond) {
        this.semaphore = new Semaphore(maxRequestsPerSecond);
        
        // 每秒重置许可证
        Executors.newSingleThreadScheduledExecutor().scheduleAtFixedRate(() -> {
            semaphore.release(maxRequestsPerSecond - semaphore.availablePermits());
        }, 1, 1, TimeUnit.SECONDS);
    }
    
    public boolean tryAcquire() {
        return semaphore.tryAcquire();  // 非阻塞尝试获取
    }
}

// 场景 3：公平信号量（FIFO 顺序）
Semaphore fairSemaphore = new Semaphore(3, true);  // 第二个参数为 true
// 公平模式下，等待时间最长的线程优先获得许可证`}
            language="java"
            highlights={[7, 13, 22, 31, 35, 43]}
            filename="SemaphoreScenarios.java"
            description="Semaphore 实际应用"
          />

          <SideNote label="公平 vs 非公平">
            Semaphore 构造函数支持公平模式：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">new Semaphore(permits, true)</code>。公平模式下，线程按 FIFO 顺序获取许可证；非公平模式（默认）性能更高但可能导致线程饥饿。
          </SideNote>

          <h2 id="phaser" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Phaser
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Phaser 是 JDK 7 引入的更灵活的同步工具，结合了 CountDownLatch 和 CyclicBarrier 的特性，支持动态注册/注销参与者，适用于多阶段任务且参与者数量可能变化的场景。
          </p>

          <Playground
            code={`import java.util.concurrent.Phaser;

public class PhaserDemo {
    public static void main(String[] args) {
        Phaser phaser = new Phaser(1);  // 注册主线程
        System.out.println("初始阶段: " + phaser.getPhase());
        
        // 动态注册 3 个线程
        for (int i = 1; i <= 3; i++) {
            final int taskId = i;
            phaser.register();  // 注册新参与者
            
            new Thread(() -> {
                try {
                    // 第一阶段
                    System.out.println("线程 " + taskId + " 执行阶段 1");
                    Thread.sleep(1000);
                    phaser.arriveAndAwaitAdvance();  // 到达并等待
                    
                    // 第二阶段
                    System.out.println("线程 " + taskId + " 执行阶段 2");
                    Thread.sleep(1000);
                    phaser.arriveAndAwaitAdvance();
                    
                    // 第三阶段
                    System.out.println("线程 " + taskId + " 执行阶段 3");
                    Thread.sleep(1000);
                    phaser.arriveAndDeregister();  // 到达并注销
                    
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }).start();
        }
        
        // 主线程等待所有阶段完成
        phaser.arriveAndAwaitAdvance();  // 阶段 1
        System.out.println("阶段 1 完成，当前阶段: " + phaser.getPhase());
        
        phaser.arriveAndAwaitAdvance();  // 阶段 2
        System.out.println("阶段 2 完成，当前阶段: " + phaser.getPhase());
        
        phaser.arriveAndAwaitAdvance();  // 阶段 3
        System.out.println("阶段 3 完成，当前阶段: " + phaser.getPhase());
        
        phaser.arriveAndDeregister();  // 主线程注销
    }
}`}
            language="java"
            highlights={[5, 11, 18, 23, 28, 37, 40, 43]}
            filename="PhaserDemo.java"
            description="Phaser 多阶段任务"
          />

          <Callout type="info" title="Phaser 核心方法">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">register()</code>：动态注册新参与者</li>
              <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">arriveAndAwaitAdvance()</code>：到达屏障并等待其他参与者</li>
              <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">arriveAndDeregister()</code>：到达屏障并注销（不再参与后续阶段）</li>
              <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">getPhase()</code>：获取当前阶段号</li>
              <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">forceTermination()</code>：强制终止 Phaser</li>
            </ul>
          </Callout>

          <h2 id="exchanger" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Exchanger
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Exchanger 用于两个线程之间交换数据。当一个线程调用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">exchange()</code> 时会阻塞，直到另一个线程也调用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">exchange()</code>，然后两者交换数据并继续执行。
          </p>

          <Playground
            code={`import java.util.concurrent.Exchanger;

public class ExchangerDemo {
    public static void main(String[] args) {
        Exchanger<String> exchanger = new Exchanger<>();
        
        // 线程 1：生产者
        new Thread(() -> {
            try {
                String data = "生产者数据";
                System.out.println("生产者发送: " + data);
                
                // 等待消费者并交换数据
                String received = exchanger.exchange(data);
                System.out.println("生产者收到: " + received);
                
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
        
        // 线程 2：消费者
        new Thread(() -> {
            try {
                Thread.sleep(1000);  // 模拟延迟
                
                String data = "消费者数据";
                System.out.println("消费者发送: " + data);
                
                // 等待生产者并交换数据
                String received = exchanger.exchange(data);
                System.out.println("消费者收到: " + received);
                
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
}

/*
预期输出：
生产者发送: 生产者数据
消费者发送: 消费者数据
生产者收到: 消费者数据
消费者收到: 生产者数据
*/`}
            language="java"
            highlights={[5, 14, 31]}
            filename="ExchangerDemo.java"
            description="Exchanger 数据交换"
          />

          <SideNote label="适用场景">
            Exchanger 适用于<strong>遗传算法</strong>（交换染色体）、<strong>管道设计</strong>（两个线程交替填充和清空缓冲区）等需要成对线程交换数据的场景。注意：Exchanger 仅支持两个线程配对，第三个线程会等待下一个配对。
          </SideNote>

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、对比总结
          </h2>

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border p-2 text-left font-semibold">工具类</th>
                <th className="border border-border p-2 text-left font-semibold">核心功能</th>
                <th className="border border-border p-2 text-left font-semibold">可重用</th>
                <th className="border border-border p-2 text-left font-semibold">典型场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2"><code className="font-mono text-[12px]">CountDownLatch</code></td>
                <td className="border border-border p-2">等待 N 个任务完成</td>
                <td className="border border-border p-2">❌</td>
                <td className="border border-border p-2">服务启动、并行初始化</td>
              </tr>
              <tr className="bg-parchment-light">
                <td className="border border-border p-2"><code className="font-mono text-[12px]">CyclicBarrier</code></td>
                <td className="border border-border p-2">N 个线程互相等待</td>
                <td className="border border-border p-2">✅</td>
                <td className="border border-border p-2">多阶段并行计算</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><code className="font-mono text-[12px]">Semaphore</code></td>
                <td className="border border-border p-2">控制并发访问数</td>
                <td className="border border-border p-2">✅</td>
                <td className="border border-border p-2">限流、资源池</td>
              </tr>
              <tr className="bg-parchment-light">
                <td className="border border-border p-2"><code className="font-mono text-[12px]">Phaser</code></td>
                <td className="border border-border p-2">灵活的多阶段同步</td>
                <td className="border border-border p-2">✅</td>
                <td className="border border-border p-2">动态参与者多阶段任务</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><code className="font-mono text-[12px]">Exchanger</code></td>
                <td className="border border-border p-2">两线程交换数据</td>
                <td className="border border-border p-2">✅</td>
                <td className="border border-border p-2">遗传算法、管道设计</td>
              </tr>
            </tbody>
          </table>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区 1：CountDownLatch 可以重置">
            <p className="mb-2"><strong>错误认知</strong>：认为调用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">countDown()</code> 后可以重新设置计数值。</p>
            <p><strong>正确理解</strong>：CountDownLatch 是一次性的，计数器归零后无法重置。如果需要可重用的屏障，应使用 CyclicBarrier 或 Phaser。</p>
          </Callout>

          <Callout type="danger" title="误区 2：CyclicBarrier 的回调只执行一次">
            <p className="mb-2"><strong>错误认知</strong>：认为构造函数中的 Runnable 回调只在第一次屏障触发时执行。</p>
            <p><strong>正确理解</strong>：每次所有线程到达屏障时，回调都会执行。这在多阶段计算中非常有用，可以在每个阶段结束时执行汇总操作。</p>
          </Callout>

          <Callout type="danger" title="误区 3：Semaphore 的 acquire() 不会阻塞">
            <p className="mb-2"><strong>错误认知</strong>：认为 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">acquire()</code> 会立即返回。</p>
            <p><strong>正确理解</strong>：如果没有可用许可证，<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">acquire()</code> 会阻塞直到有许可证可用。如果希望非阻塞，应使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">tryAcquire()</code>。</p>
          </Callout>

          <Callout type="warning" title="误区 4：Phaser 比 CyclicBarrier 总是更好">
            <p className="mb-2"><strong>错误认知</strong>：认为 Phaser 功能更强所以应该优先使用。</p>
            <p><strong>正确理解</strong>：Phaser 虽然更灵活，但也更复杂。对于简单的固定参与者多阶段任务，CyclicBarrier 更简洁高效。只有在参与者数量动态变化时才需要使用 Phaser。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "CountDownLatch 和 CyclicBarrier 的区别是什么？",
              answer: "① 重用性：CountDownLatch 是一次性的，CyclicBarrier 可重置重用；② 触发方式：CountDownLatch 由外部线程调用 countDown() 递减计数器，CyclicBarrier 由参与线程调用 await() 互相等待；③ 回调支持：CyclicBarrier 支持屏障动作（Runnable 回调），CountDownLatch 不支持；④ 典型场景：CountDownLatch 用于等待多个任务完成，CyclicBarrier 用于多阶段并行计算。"
            },
            {
              question: "Semaphore 如何实现限流？",
              answer: "Semaphore 通过控制许可证数量来限制并发访问数。初始化时设置 permits 数量，线程通过 acquire() 获取许可证（无可用许可证时阻塞），执行完业务后通过 release() 释放许可证。例如：设置 permits=100，则最多允许 100 个线程同时访问共享资源，超过的线程会被阻塞等待。"
            },
            {
              question: "CyclicBarrier 的 BrokenBarrierException 何时抛出？",
              answer: "以下情况会抛出 BrokenBarrierException：① 某个线程在等待时被中断（InterruptedException）；② 某个线程超时（await() 带超时参数）；③ 调用了 reset() 方法重置屏障；④ 屏障被强制终止。一旦屏障被破坏，所有等待的线程都会收到该异常，需要重新创建 CyclicBarrier 才能继续使用。"
            },
            {
              question: "Phaser 相比 CyclicBarrier 的优势是什么？",
              answer: "① 动态注册：Phaser 支持运行时 register() 和 arriveAndDeregister()，参与者数量可以变化；② 分层结构：Phaser 支持父子层级关系，适合复杂的多级同步；③ 灵活终止：可以通过 forceTermination() 强制终止；④ 阶段感知：getPhase() 可以获取当前阶段号。但 Phaser 也更复杂，简单场景建议用 CyclicBarrier。"
            },
            {
              question: "如何使用 Semaphore 实现数据库连接池？",
              answer: "① 初始化 Semaphore，permits = 最大连接数；② 获取连接时先 acquire() 获取许可证，再从连接池中取出连接；③ 归还连接时先将连接放回池，再 release() 释放许可证。这样确保任何时候活跃连接数不超过最大值。注意：acquire() 和连接获取必须是原子操作，避免竞态条件。"
            },
            {
              question: "Exchanger 的典型应用场景有哪些？",
              answer: "① 遗传算法：两个线程交换染色体进行交叉变异；② 管道设计：一个线程填充缓冲区，另一个线程清空缓冲区，通过 Exchanger 交换满/空缓冲区引用；③ 校对任务：两个线程独立处理数据，然后交换结果进行比对验证。注意：Exchanger 仅支持成对线程，奇数个线程会导致最后一个线程永久等待。"
            },
            {
              question: "如何选择合适的并发工具类？",
              answer: "① 等待多个任务完成 → CountDownLatch；② 多阶段并行计算，参与者固定 → CyclicBarrier；③ 控制并发访问数/限流 → Semaphore；④ 多阶段任务，参与者动态变化 → Phaser；⑤ 两线程交换数据 → Exchanger。选择原则：用最简单的工具满足需求，避免过度设计。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/03-multithreading/multi-threading-basics" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">多线程基础</div>
              <div className="text-[12px] text-ink-muted mt-1">线程创建、生命周期、线程安全</div>
            </a>
            <a href="/docs/03-multithreading/thread-pool" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">线程池深入解析</div>
              <div className="text-[12px] text-ink-muted mt-1">ThreadPoolExecutor、队列策略</div>
            </a>
            <a href="/docs/03-multithreading/synchronization" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">同步机制 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">同步机制详解</div>
              <div className="text-[12px] text-ink-muted mt-1">synchronized、ReentrantLock</div>
            </a>
            <a href="/docs/03-multithreading/fork-join" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">高级主题 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Fork/Join 框架</div>
              <div className="text-[12px] text-ink-muted mt-1">工作窃取算法、分治并行</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            并发工具类是多线程编程的利器，建议通过以下方式深入学习：① 阅读 JUC 源码，理解 AQS（AbstractQueuedSynchronizer）的实现原理；② 在实际项目中应用这些工具类，积累实战经验；③ 结合线程池使用，掌握复杂的并发场景；④ 学习 CompletableFuture 等更高级的异步编程工具。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
