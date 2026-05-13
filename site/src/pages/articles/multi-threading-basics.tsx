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
  { id: 'creation-methods', text: '一、线程创建方式', level: 2 },
  { id: 'extend-thread', text: '1.1 继承 Thread 类', level: 3 },
  { id: 'implement-runnable', text: '1.2 实现 Runnable 接口', level: 3 },
  { id: 'implement-callable', text: '1.3 实现 Callable 接口', level: 3 },
  { id: 'thread-vs-runnable', text: '二、Thread vs Runnable 对比', level: 2 },
  { id: 'lifecycle', text: '三、线程生命周期', level: 2 },
  { id: 'six-states', text: '3.1 六种状态详解', level: 3 },
  { id: 'state-transitions', text: '3.2 状态转换图', level: 3 },
  { id: 'thread-safety', text: '四、线程安全问题', level: 2 },
  { id: 'atomicity-visibility-ordering', text: '4.1 原子性、可见性、有序性', level: 3 },
  { id: 'common-problems', text: '4.2 常见问题示例', level: 3 },
  { id: 'misconceptions', text: '五、常见误区', level: 2 },
  { id: 'interview', text: '六、面试真题', level: 2 },
  { id: 'comparison', text: '七、对比总结', level: 2 },
  { id: 'related', text: '八、知识关联', level: 2 },
]

export default function MultiThreadingBasics({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Java 多线程是通过<strong className="text-accent">并发执行多个线程</strong>来提升程序性能的技术，每个线程是独立的执行流，共享进程资源（堆内存），
              但拥有独立的栈空间。掌握线程创建、生命周期管理和线程安全是构建高并发系统的基石。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么必须掌握多线程？">
            现代 CPU 都是多核架构，单线程无法充分利用硬件资源。多线程可以并行处理任务（如 Web 服务器同时响应多个请求、批量数据处理），显著提升吞吐量。但同时也引入了线程安全、死锁等复杂问题，需要深入理解底层原理。
          </Callout>

          <h2 id="creation-methods" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、线程创建方式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 提供了三种创建线程的方式：<strong>继承 Thread 类</strong>、<strong>实现 Runnable 接口</strong>和<strong>实现 Callable 接口</strong>。
            其中前两种是最常用的方式，Callable 则用于需要返回值的场景。
          </p>

          <DiagramBlock title="线程创建方式全景图">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────┐
│         Java 线程创建方式               │
├──────────────┬──────────┬───────────────┤
│ 继承 Thread  │实现Runnable│实现 Callable  │
│   (不推荐)   │ (推荐)    │ (有返回值)     │
├──────────────┼──────────┼───────────────┤
│ 重写 run()   │实现 run() │实现 call()    │
│ 直接 start() │包装Thread │FutureTask包装  │
│ 无返回值     │无返回值   │有返回值       │
└──────────────┴──────────┴───────────────┘
            `}</pre>
          </DiagramBlock>

          <h3 id="extend-thread" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.1 继承 Thread 类
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            最直接的方式是创建一个类继承 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">java.lang.Thread</code>，
            重写 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">run()</code> 方法，然后调用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">start()</code> 启动线程。
          </p>

          <Playground
            code={`// 方式1：继承 Thread 类
public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("线程名称: " + Thread.currentThread().getName());
        System.out.println("正在执行任务...");
        
        // 模拟耗时操作
        for (int i = 0; i < 5; i++) {
            System.out.println("计数: " + i);
            try {
                Thread.sleep(1000); // 休眠1秒
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// 使用方式
public class Main {
    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start(); // 启动线程（异步执行）
        
        System.out.println("主线程继续执行...");
    }
}`}
            language="java"
            highlights={[2, 4, 22, 23]}
            filename="MyThread.java"
            description="继承 Thread 类创建线程"
          />

          <Callout type="warning" title="为什么不推荐继承 Thread？">
            Java 是单继承机制，如果类已经继承了其他父类，就无法再继承 Thread。此外，这种方式将"任务逻辑"和"线程控制"耦合在一起，不符合面向对象的设计原则。
          </Callout>

          <h3 id="implement-runnable" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.2 实现 Runnable 接口
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>推荐方式</strong>：实现 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">java.lang.Runnable</code> 接口，
            实现 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">run()</code> 方法，然后将 Runnable 实例传递给 Thread 构造函数。
          </p>

          <Playground
            code={`// 方式2：实现 Runnable 接口（推荐）
public class MyTask implements Runnable {
    private final String taskName;
    
    public MyTask(String taskName) {
        this.taskName = taskName;
    }
    
    @Override
    public void run() {
        System.out.println("[" + taskName + "] 线程名称: " + Thread.currentThread().getName());
        
        // 执行具体任务
        for (int i = 0; i < 3; i++) {
            System.out.println("[" + taskName + "] 处理中: " + i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt(); // 恢复中断状态
                return;
            }
        }
        
        System.out.println("[" + taskName + "] 任务完成");
    }
}

// 使用方式
public class Main {
    public static void main(String[] args) {
        // 创建 Runnable 任务
        Runnable task1 = new MyTask("任务1");
        Runnable task2 = new MyTask("任务2");
        
        // 包装为 Thread 并启动
        Thread thread1 = new Thread(task1, "Thread-1");
        Thread thread2 = new Thread(task2, "Thread-2");
        
        thread1.start();
        thread2.start();
        
        System.out.println("主线程等待子线程完成...");
    }
}`}
            language="java"
            highlights={[2, 10, 31, 36, 37]}
            filename="MyTask.java"
            description="实现 Runnable 接口创建线程（推荐）"
          />

          <SideNote label="优势分析">
            Runnable 方式解耦了"任务逻辑"和"线程控制"，同一个 Runnable 可以被多个 Thread 执行（线程池场景），也便于单元测试。此外，由于 Java 支持多实现，类可以同时实现 Runnable 和其他接口。
          </SideNote>

          <h3 id="implement-callable" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.3 实现 Callable 接口
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当需要<strong>返回值</strong>或<strong>抛出受检异常</strong>时，使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">java.util.concurrent.Callable</code> 接口。
            它需要通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">FutureTask</code> 包装后才能交给 Thread 执行。
          </p>

          <Playground
            code={`import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

// 方式3：实现 Callable 接口（有返回值）
public class MyCalculator implements Callable<Integer> {
    private final int n;
    
    public MyCalculator(int n) {
        this.n = n;
    }
    
    @Override
    public Integer call() throws Exception {
        System.out.println("计算斐波那契数列 F(" + n + ")");
        
        if (n <= 1) {
            return n;
        }
        
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        
        return b; // 返回计算结果
    }
}

// 使用方式
public class Main {
    public static void main(String[] args) throws Exception {
        // 创建 Callable 任务
        Callable<Integer> task = new MyCalculator(10);
        
        // 包装为 FutureTask
        FutureTask<Integer> futureTask = new FutureTask<>(task);
        
        // 启动线程
        Thread thread = new Thread(futureTask, "Calculator-Thread");
        thread.start();
        
        // 主线程可以做其他事情...
        System.out.println("主线程等待计算结果...");
        
        // 获取返回值（阻塞直到计算完成）
        Integer result = futureTask.get();
        System.out.println("计算结果: F(10) = " + result);
    }
}`}
            language="java"
            highlights={[5, 13, 33, 36, 43]}
            filename="MyCalculator.java"
            description="实现 Callable 接口创建线程（有返回值）"
          />

          <Callout type="info" title="Callable vs Runnable 核心区别">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>返回值</strong>：Callable 的 <code className="font-mono text-[12px]">call()</code> 有返回值，Runnable 的 <code className="font-mono text-[12px]">run()</code> 无返回值</li>
              <li><strong>异常</strong>：Callable 可以抛出受检异常，Runnable 只能捕获内部异常</li>
              <li><strong>使用场景</strong>：Callable 适合需要获取结果的场景（如并行计算、数据库查询），Runnable 适合纯任务执行</li>
            </ul>
          </Callout>

          <h2 id="thread-vs-runnable" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Thread vs Runnable 对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            理解 Thread 和 Runnable 的本质区别，有助于在正确场景选择合适的方式。
          </p>

          <table className="w-full border-collapse my-5 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left py-3 px-4 font-semibold text-ink">对比维度</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">继承 Thread</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">实现 Runnable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="py-3 px-4 font-medium text-ink">继承关系</td>
                <td className="py-3 px-4 text-ink-muted">单继承，占用继承名额</td>
                <td className="py-3 px-4 text-ink-muted">多实现，不影响其他继承</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="py-3 px-4 font-medium text-ink">职责分离</td>
                <td className="py-3 px-4 text-ink-muted">任务和线程耦合</td>
                <td className="py-3 px-4 text-ink-muted">任务和线程解耦 ✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-ink">资源共享</td>
                <td className="py-3 px-4 text-ink-muted">每个 Thread 独立实例</td>
                <td className="py-3 px-4 text-ink-muted">同一 Runnable 可被多个 Thread 共享 ✅</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="py-3 px-4 font-medium text-ink">扩展性</td>
                <td className="py-3 px-4 text-ink-muted">难以适配线程池</td>
                <td className="py-3 px-4 text-ink-muted">天然适配线程池 ✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-ink">推荐程度</td>
                <td className="py-3 px-4 text-rose font-medium">❌ 不推荐</td>
                <td className="py-3 px-4 text-teal font-medium">✅ 强烈推荐</td>
              </tr>
            </tbody>
          </table>

          <Callout type="danger" title="经典面试题：多个线程共享数据">
            如果使用继承 Thread 的方式，每个 Thread 实例都有独立的成员变量，无法共享数据。而 Runnable 可以实现同一个实例被多个 Thread 共享，天然支持数据共享场景（如售票系统）。
          </Callout>

          <h2 id="lifecycle" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、线程生命周期
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 线程从创建到终止经历<strong>六种状态</strong>，定义在 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">java.lang.Thread.State</code> 枚举中。
            理解状态转换是调试并发问题的关键。
          </p>

          <h3 id="six-states" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 六种状态详解
          </h3>

          <table className="w-full border-collapse my-5 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left py-3 px-4 font-semibold text-ink">状态</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">说明</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">触发条件</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="py-3 px-4 font-mono text-accent font-medium">NEW</td>
                <td className="py-3 px-4 text-ink-muted">新建状态</td>
                <td className="py-3 px-4 text-ink-muted">创建 Thread 对象但未调用 start()</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="py-3 px-4 font-mono text-accent font-medium">RUNNABLE</td>
                <td className="py-3 px-4 text-ink-muted">可运行状态</td>
                <td className="py-3 px-4 text-ink-muted">调用 start() 后，可能在运行也可能在等待 CPU</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-accent font-medium">BLOCKED</td>
                <td className="py-3 px-4 text-ink-muted">阻塞状态</td>
                <td className="py-3 px-4 text-ink-muted">等待获取 synchronized 锁</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="py-3 px-4 font-mono text-accent font-medium">WAITING</td>
                <td className="py-3 px-4 text-ink-muted">无限期等待</td>
                <td className="py-3 px-4 text-ink-muted">调用 Object.wait()、Thread.join()、LockSupport.park()</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-accent font-medium">TIMED_WAITING</td>
                <td className="py-3 px-4 text-ink-muted">限期等待</td>
                <td className="py-3 px-4 text-ink-muted">调用 Thread.sleep(long)、wait(long)、join(long)</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="py-3 px-4 font-mono text-accent font-medium">TERMINATED</td>
                <td className="py-3 px-4 text-ink-muted">终止状态</td>
                <td className="py-3 px-4 text-ink-muted">run() 方法执行完毕或异常退出</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`public class ThreadStateDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            System.out.println("子线程开始执行");
            
            // TIMED_WAITING: sleep 1秒
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            
            System.out.println("子线程结束");
        });
        
        // NEW: 刚创建
        System.out.println("状态1: " + thread.getState()); // NEW
        
        thread.start();
        
        // RUNNABLE: 已启动
        Thread.sleep(100); // 确保子线程已启动
        System.out.println("状态2: " + thread.getState()); // RUNNABLE 或 TIMED_WAITING
        
        // 等待子线程结束
        thread.join();
        
        // TERMINATED: 已结束
        System.out.println("状态3: " + thread.getState()); // TERMINATED
    }
}`}
            language="java"
            highlights={[16, 20, 27]}
            filename="ThreadStateDemo.java"
            description="观察线程状态变化"
          />

          <h3 id="state-transitions" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 状态转换图
          </h3>

          <DiagramBlock title="Java 线程状态转换图">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
                    ┌─────────┐
                    │   NEW   │
                    └────┬────┘
                         │ start()
                         ▼
                  ┌──────────────┐
                  │  RUNNABLE    │◀──────────────┐
                  └──┬───────┬──┘               │
                     │       │                   │
          获取锁失败  │       │ 获得锁/时间到      │
                     ▼       │                   │
                  ┌──────────┴──┐               │
                  │   BLOCKED   │───────────────┘
                  └─────────────┘
                     
                  ┌──────────────┐
                  │   WAITING    │
                  └──┬───────┬──┘
                     │       │
          wait()/   │       │ notify()/
          join()/   │       │ interrupt()
          park()    │       │
                     ▼       │
                  ┌──────────┴──┐
                  │TIMED_WAITING│
                  └──────┬──────┘
                         │ 超时
                         ▼
                  ┌──────────────┐
                  │ TERMINATED   │
                  └──────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="RUNNABLE 的特殊性">
            Java 的 RUNNABLE 状态实际上包含了操作系统层面的"就绪"和"运行"两种状态。线程可能在 CPU 上执行，也可能在等待 CPU 时间片，JVM 不区分这两种情况。
          </SideNote>

          <h2 id="thread-safety" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、线程安全问题
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当多个线程同时访问共享资源且没有适当的同步机制时，就会出现<strong>线程安全问题</strong>，导致数据不一致、脏读、丢失更新等严重 Bug。
          </p>

          <h3 id="atomicity-visibility-ordering" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 原子性、可见性、有序性
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            线程安全问题的根源可以归结为三大特性被破坏：
          </p>

          <table className="w-full border-collapse my-5 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left py-3 px-4 font-semibold text-ink">特性</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">含义</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">解决方案</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="py-3 px-4 font-medium text-ink">原子性</td>
                <td className="py-3 px-4 text-ink-muted">操作不可分割，要么全部执行成功，要么全部不执行</td>
                <td className="py-3 px-4 text-ink-muted">synchronized、ReentrantLock、Atomic 类</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="py-3 px-4 font-medium text-ink">可见性</td>
                <td className="py-3 px-4 text-ink-muted">一个线程修改共享变量后，其他线程能立即看到最新值</td>
                <td className="py-3 px-4 text-ink-muted">volatile、synchronized、final</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-ink">有序性</td>
                <td className="py-3 px-4 text-ink-muted">程序执行顺序符合代码书写顺序（禁止指令重排序）</td>
                <td className="py-3 px-4 text-ink-muted">volatile、synchronized、happens-before</td>
              </tr>
            </tbody>
          </table>

          <h3 id="common-problems" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 常见问题示例
          </h3>

          <Callout type="danger" title="经典案例：计数器丢失更新">
            以下代码展示了典型的线程安全问题：多个线程同时对共享变量 <code className="font-mono text-[12px]">count</code> 进行递增操作，最终结果小于预期值。
          </Callout>

          <Playground
            code={`public class CounterProblem {
    private static int count = 0;
    
    public static void main(String[] args) throws InterruptedException {
        // 创建10个线程，每个线程递增1000次
        Thread[] threads = new Thread[10];
        
        for (int i = 0; i < 10; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    count++; // ❌ 非原子操作：读取-修改-写入
                }
            });
            threads[i].start();
        }
        
        // 等待所有线程完成
        for (Thread thread : threads) {
            thread.join();
        }
        
        System.out.println("期望值: 10000");
        System.out.println("实际值: " + count); // ⚠️ 通常小于10000！
    }
}`}
            language="java"
            highlights={[11, 22]}
            filename="CounterProblem.java"
            description="线程安全问题演示：计数器丢失更新"
          />

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>问题分析</strong>：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">count++</code> 看似一条语句，实际上包含三个步骤：
          </p>

          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-4 ml-4">
            <li><strong>读取</strong>：从主内存读取 count 的值到工作内存</li>
            <li><strong>修改</strong>：在工作内存中将值加 1</li>
            <li><strong>写入</strong>：将新值写回主内存</li>
          </ol>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当两个线程同时执行这三个步骤时，可能发生以下交错：
          </p>

          <DiagramBlock title="竞态条件时序图">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
线程A                          线程B
  │                              │
  ├─ 读取 count = 0              │
  │                              ├─ 读取 count = 0  ⚠️ 读到旧值
  ├─ 修改 count = 1              │
  │                              ├─ 修改 count = 1
  ├─ 写入 count = 1              │
  │                              ├─ 写入 count = 1  ❌ 覆盖A的结果
  │                              │
  最终 count = 1（应为2）
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`// ✅ 修复方案1：使用 synchronized
public class CounterFixed {
    private static int count = 0;
    private static final Object lock = new Object();
    
    public static void main(String[] args) throws InterruptedException {
        Thread[] threads = new Thread[10];
        
        for (int i = 0; i < 10; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    synchronized (lock) { // 加锁保证原子性
                        count++;
                    }
                }
            });
            threads[i].start();
        }
        
        for (Thread thread : threads) {
            thread.join();
        }
        
        System.out.println("修复后的值: " + count); // ✅ 10000
    }
}

// ✅ 修复方案2：使用 AtomicInteger
import java.util.concurrent.atomic.AtomicInteger;

public class CounterAtomic {
    private static AtomicInteger count = new AtomicInteger(0);
    
    public static void main(String[] args) throws InterruptedException {
        Thread[] threads = new Thread[10];
        
        for (int i = 0; i < 10; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    count.incrementAndGet(); // CAS 原子操作
                }
            });
            threads[i].start();
        }
        
        for (Thread thread : threads) {
            thread.join();
        }
        
        System.out.println("原子类的值: " + count.get()); // ✅ 10000
    }
}`}
            language="java"
            highlights={[12, 32, 37]}
            filename="CounterFixed.java"
            description="线程安全修复方案对比"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、常见误区
          </h2>

          <Callout type="danger" title="误区1：start() 和 run() 的区别">
            <p className="mt-2"><strong>错误认知</strong>：调用 <code className="font-mono text-[12px]">run()</code> 也能启动新线程。</p>
            <p className="mt-2"><strong>真相</strong>：<code className="font-mono text-[12px]">run()</code> 只是普通方法调用，仍在当前线程执行；只有 <code className="font-mono text-[12px]">start()</code> 才会创建新线程并异步执行 <code className="font-mono text-[12px]">run()</code>。</p>
          </Callout>

          <Callout type="danger" title="误区2：线程越多越好">
            <p className="mt-2"><strong>错误认知</strong>：创建更多线程可以提升性能。</p>
            <p className="mt-2"><strong>真相</strong>：线程创建和切换有开销（上下文切换、内存占用）。CPU 密集型任务应限制线程数（通常为 CPU 核心数），I/O 密集型可适当增加。过度创建线程会导致性能下降甚至 OOM。</p>
          </Callout>

          <Callout type="danger" title="误区3：volatile 能保证原子性">
            <p className="mt-2"><strong>错误认知</strong>：用 <code className="font-mono text-[12px]">volatile</code> 修饰变量就能解决所有线程安全问题。</p>
            <p className="mt-2"><strong>真相</strong>：<code className="font-mono text-[12px]">volatile</code> 只保证可见性和有序性，<strong>不保证原子性</strong>。对于 <code className="font-mono text-[12px]">count++</code> 这类复合操作，仍需使用 <code className="font-mono text-[12px]">synchronized</code> 或 <code className="font-mono text-[12px]">AtomicInteger</code>。</p>
          </Callout>

          <Callout type="warning" title="误区4：Thread.stop() 是安全的终止方式">
            <p className="mt-2"><strong>错误认知</strong>：调用 <code className="font-mono text-[12px]">thread.stop()</code> 可以强制终止线程。</p>
            <p className="mt-2"><strong>真相</strong>：<code className="font-mono text-[12px]">stop()</code> 已被标记为 <code className="font-mono text-[12px]">@Deprecated</code>，因为它会立即释放所有锁，可能导致对象处于不一致状态。正确做法是使用<strong>中断机制</strong>（<code className="font-mono text-[12px]">interrupt()</code>）配合标志位优雅终止。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: 'Thread 和 Runnable 有什么区别？哪种方式更好？',
              answer: 'Thread 是类，Runnable 是接口。继承 Thread 会占用单继承名额且任务与线程耦合；实现 Runnable 支持多实现、解耦任务和线程、便于资源共享和适配线程池。因此推荐使用 Runnable 方式。'
            },
            {
              question: 'start() 和 run() 方法的区别是什么？',
              answer: 'start() 会创建新线程并异步执行 run() 方法中的代码；直接调用 run() 只是普通方法调用，仍在当前线程同步执行，不会启动新线程。'
            },
            {
              question: 'Java 线程有哪些状态？BLOCKED 和 WAITING 有什么区别？',
              answer: 'Java 线程有6种状态：NEW、RUNNABLE、BLOCKED、WAITING、TIMED_WAITING、TERMINATED。BLOCKED 是等待获取 synchronized 锁时的状态；WAITING 是调用 wait()/join()/park() 后无限期等待其他线程通知的状态。'
            },
            {
              question: '什么是线程安全？如何保证线程安全？',
              answer: '线程安全指多个线程访问共享资源时不会出现数据不一致问题。保证线程安全的方法包括：使用 synchronized/ReentrantLock 加锁、使用 volatile 保证可见性、使用 Atomic 类进行原子操作、使用 ThreadLocal 隔离线程间数据、使用不可变对象。'
            },
            {
              question: 'volatile 关键字的作用是什么？它能保证原子性吗？',
              answer: 'volatile 保证变量的可见性（一个线程修改后其他线程立即可见）和有序性（禁止指令重排序），但不保证原子性。对于 count++ 这类复合操作，仍需使用 synchronized 或 AtomicInteger。'
            },
            {
              question: '为什么不建议使用 Thread.stop() 终止线程？正确的终止方式是什么？',
              answer: 'Thread.stop() 会立即释放所有锁，可能导致对象处于不一致状态，已被废弃。正确方式是使用中断机制：调用 thread.interrupt() 设置中断标志，在 run() 中通过 isInterrupted() 检查标志并优雅退出。'
            }
          ]} />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、对比总结
          </h2>

          <table className="w-full border-collapse my-5 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left py-3 px-4 font-semibold text-ink">特性</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">继承 Thread</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">实现 Runnable</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">实现 Callable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="py-3 px-4 font-medium text-ink">返回值</td>
                <td className="py-3 px-4 text-ink-muted">无</td>
                <td className="py-3 px-4 text-ink-muted">无</td>
                <td className="py-3 px-4 text-teal font-medium">有 ✅</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="py-3 px-4 font-medium text-ink">异常处理</td>
                <td className="py-3 px-4 text-ink-muted">只能捕获</td>
                <td className="py-3 px-4 text-ink-muted">只能捕获</td>
                <td className="py-3 px-4 text-teal font-medium">可抛出 ✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-ink">继承限制</td>
                <td className="py-3 px-4 text-rose font-medium">单继承 ❌</td>
                <td className="py-3 px-4 text-teal font-medium">多实现 ✅</td>
                <td className="py-3 px-4 text-teal font-medium">多实现 ✅</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="py-3 px-4 font-medium text-ink">适用场景</td>
                <td className="py-3 px-4 text-ink-muted">简单示例</td>
                <td className="py-3 px-4 text-teal font-medium">通用场景 ✅</td>
                <td className="py-3 px-4 text-teal font-medium">需要结果 ✅</td>
              </tr>
            </tbody>
          </table>

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
            <div className="border border-border rounded-paper-md p-4 bg-parchment-light/30">
              <div className="text-[11px] font-mono text-ink-faded uppercase tracking-[0.06em] mb-2">前置知识</div>
              <ul className="space-y-1 text-[13px] text-ink-muted">
                <li>• Java 基础语法</li>
                <li>• 面向对象编程</li>
                <li>• JVM 内存模型</li>
              </ul>
            </div>
            <div className="border border-border rounded-paper-md p-4 bg-accent-soft/20">
              <div className="text-[11px] font-mono text-accent uppercase tracking-[0.06em] mb-2">延伸学习</div>
              <ul className="space-y-1 text-[13px] text-ink-muted">
                <li>• synchronized 原理</li>
                <li>• ReentrantLock 锁机制</li>
                <li>• 线程池 ThreadPoolExecutor</li>
                <li>• ConcurrentHashMap</li>
              </ul>
            </div>
          </div>

          <Callout type="info" title="下一步学习建议">
            掌握多线程基础后，建议深入学习：<strong>synchronized 底层原理</strong>（Monitor、偏向锁、轻量级锁、重量级锁）、<strong>JUC 并发工具包</strong>（ThreadPoolExecutor、CountDownLatch、CyclicBarrier）、<strong>并发容器</strong>（ConcurrentHashMap、CopyOnWriteArrayList）以及<strong>锁优化技术</strong>（CAS、AQS、读写锁）。
          </Callout>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      {/* SmartTOC 直接渲染，不用 aside 包裹 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}