import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import SideNote from '../../components/knowledge/SideNote'
import SmartTOC from '../../components/knowledge/SmartTOC'
import ContextSwitcher from '../../components/knowledge/ContextSwitcher'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'architecture', text: '一、同步机制架构', level: 2 },
  { id: 'synchronized', text: '二、synchronized 关键字', level: 2 },
  { id: 'sync-usage', text: '2.1 三种使用方式', level: 3 },
  { id: 'sync-principle', text: '2.2 底层原理（Monitor）', level: 3 },
  { id: 'sync-upgrade', text: '2.3 锁升级过程', level: 3 },
  { id: 'reentrantlock', text: '三、ReentrantLock 显式锁', level: 2 },
  { id: 'lock-features', text: '3.1 核心特性', level: 3 },
  { id: 'lock-vs-sync', text: '3.2 ReentrantLock vs synchronized', level: 3 },
  { id: 'condition', text: '四、Condition 条件变量', level: 2 },
  { id: 'readwrite-lock', text: '五、读写锁 ReadWriteLock', level: 2 },
  { id: 'semaphore', text: '六、信号量 Semaphore', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'comparison', text: '九、对比总结', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function Synchronization({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Java 同步机制是通过<strong className="text-accent">锁（Lock）</strong>控制多个线程对共享资源的访问顺序，确保同一时刻只有一个线程能执行临界区代码，
              从而保证数据一致性和线程安全。核心实现包括 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">synchronized</code> 关键字和 
              <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">java.util.concurrent.locks</code> 包中的显式锁。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要同步？">
            多线程环境下，如果多个线程同时读写共享变量（如计数器、集合），会导致数据竞争（Race Condition），产生不可预期的结果。同步机制通过互斥访问确保操作的原子性，是构建线程安全程序的基石。
          </Callout>

          <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、同步机制架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 提供了两套同步机制：<strong>内置锁（synchronized）</strong>和<strong>显式锁（Lock 接口）</strong>。前者由 JVM 自动管理，后者需要手动获取和释放。
            此外还有读写锁、信号量等高级同步工具，适用于不同场景。
          </p>

          <DiagramBlock title="Java 同步机制全景图">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────────────┐
│              Java 同步机制体系                        │
├──────────────────┬──────────────────────────────────┤
│   内置锁         │     显式锁（JUC）                 │
│  synchronized    │  Lock 接口                       │
├──────────────────┼──────────────────────────────────┤
│ • Monitor 对象   │ • ReentrantLock（可重入锁）       │
│ • 自动加解锁     │ • ReadWriteLock（读写锁）         │
│ • 不可中断       │ • Condition（条件变量）           │
│ • 非公平锁       │ • Semaphore（信号量）             │
│                  │ • StampedLock（邮戳锁）           │
├──────────────────┴──────────────────────────────────┤
│  共同目标：保证原子性、可见性、有序性                  │
└─────────────────────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <h2 id="synchronized" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、synchronized 关键字
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">synchronized</code> 是 Java 最基础的同步机制，由 JVM 层面实现。
            它基于 <strong>Monitor 对象</strong>（监视器锁），每个 Java 对象都有一个关联的 Monitor。当线程进入 synchronized 块时，会自动获取 Monitor，退出时自动释放。
          </p>

          <h3 id="sync-usage" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 三种使用方式
          </h3>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            synchronized 可以修饰<strong>实例方法</strong>、<strong>静态方法</strong>或<strong>同步代码块</strong>，锁定不同的对象。
          </p>

          <Playground
            code={`public class Counter {
    private int count = 0;
    
    // 方式1：修饰实例方法 - 锁定 this 对象
    public synchronized void increment() {
        count++;  // 线程安全
    }
    
    // 方式2：修饰静态方法 - 锁定 Counter.class 对象
    public static synchronized void staticIncrement() {
        // 所有实例共享此锁
    }
    
    // 方式3：同步代码块 - 锁定指定对象（推荐）
    public void fineGrainedIncrement() {
        synchronized (this) {
            count++;
        }
    }
}`}
            language="java"
            filename="Counter.java"
            description="synchronized 三种使用方式对比"
          />

          <SideNote label="最佳实践">
            优先使用同步代码块而非同步方法，因为可以精确控制锁的范围和对象。避免锁定 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">this</code> 或 Class 对象，推荐使用私有 final 对象作为锁，防止外部代码意外获取同一锁导致死锁。
          </SideNote>

          <h3 id="sync-principle" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 底层原理（Monitor）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            synchronized 的底层依赖 <strong>Monitor（管程/监视器）</strong>。每个 Java 对象头中都包含一个 Monitor 指针，指向堆中的 Monitor 对象。
            Monitor 内部维护了三个关键数据结构：
          </p>

          <DiagramBlock title="Monitor 内部结构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────┐
│          Monitor 对象                     │
├─────────────────────────────────────────┤
│  Owner Thread: 持有锁的线程               │
│  Entry List:    等待获取锁的线程队列       │
│  Wait Set:      调用 wait() 的线程集合     │
└─────────────────────────────────────────┘

工作流程：
1. 线程尝试获取锁 → 成功则设置 Owner
2. 失败则进入 Entry List 阻塞
3. Owner 释放锁 → 从 Entry List 唤醒一个线程
4. 调用 wait() → 进入 Wait Set，释放锁
5. 调用 notify() → 从 Wait Set 唤醒一个线程
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`// Monitor 工作流程示例
public class MonitorDemo {
    private final Object lock = new Object();
    
    public void criticalSection() {
        synchronized (lock) {  // ① 尝试获取 lock 的 Monitor
            // ② 成功获取 → 成为 Owner
            System.out.println("持有锁，执行临界区");
            
            try {
                lock.wait();  // ③ 调用 wait → 进入 Wait Set，释放锁
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            
            // ⑤ 被 notify 唤醒 → 重新竞争锁
            System.out.println("重新获得锁，继续执行");
        }
        // ⑥ 退出 synchronized → 释放锁，唤醒 Entry List 中的线程
    }
    
    public void notifyOther() {
        synchronized (lock) {
            lock.notify();  // ④ 从 Wait Set 唤醒一个线程
        }
    }
}`}
            language="java"
            filename="MonitorDemo.java"
            description="Monitor 工作流程：Owner、Entry List、Wait Set 的协作"
            highlights={[3, 8, 15, 21]}
          />

          <h3 id="sync-upgrade" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.3 锁升级过程
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JDK 6 引入了<strong>偏向锁 → 轻量级锁 → 重量级锁</strong>的升级机制，优化无竞争场景下的性能。
            锁的状态存储在对象头的 Mark Word 中，随着竞争加剧逐步升级，但<strong>不可降级</strong>。
          </p>

          <DiagramBlock title="锁升级流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
无竞争                          轻微竞争                   激烈竞争
  ↓                                ↓                         ↓
偏向锁 ──────────────→ 轻量级锁 ──────────────→ 重量级锁
( CAS 标记线程ID )    ( CAS 自旋 )            ( 操作系统 Mutex )
  ↑                    ↑                       ↑
最优性能              中等性能                 最差性能
( 无同步开销 )        ( 用户态自旋 )          ( 内核态切换 )

注意：锁只能升级，不能降级！
            `}</pre>
          </DiagramBlock>

          <Callout type="warning" title="锁升级不可逆">
            一旦升级为重量级锁，即使后续没有竞争，也不会降级回轻量级锁或偏向锁。因此要避免频繁加解锁同一对象，否则会导致性能退化。可以通过 JVM 参数 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">-XX:-UseBiasedLocking</code> 禁用偏向锁（JDK 15+ 已默认禁用）。
          </Callout>

          <h2 id="reentrantlock" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、ReentrantLock 显式锁
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">java.util.concurrent.locks.ReentrantLock</code> 是 JUC 包提供的显式锁实现，
            基于 <strong>AQS（AbstractQueuedSynchronizer）</strong> 框架。相比 synchronized，它提供了更灵活的锁控制能力。
          </p>

          <h3 id="lock-features" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 核心特性
          </h3>

          <Playground
            code={`import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.TimeUnit;

public class ReentrantLockDemo {
    private final ReentrantLock lock = new ReentrantLock();
    private int count = 0;
    
    // 特性1：手动加解锁（必须在 finally 中释放）
    public void increment() {
        lock.lock();  // 获取锁
        try {
            count++;
        } finally {
            lock.unlock();  // 务必在 finally 中释放，防止死锁
        }
    }
    
    // 特性2：支持超时获取锁
    public boolean tryIncrement() throws InterruptedException {
        if (lock.tryLock(1, TimeUnit.SECONDS)) {  // 最多等待1秒
            try {
                count++;
                return true;
            } finally {
                lock.unlock();
            }
        }
        return false;  // 超时未获取到锁
    }
    
    // 特性3：支持公平锁（构造函数传入 true）
    private final ReentrantLock fairLock = new ReentrantLock(true);
    
    // 特性4：可中断获取锁
    public void interruptibleIncrement() throws InterruptedException {
        lock.lockInterruptibly();  // 响应中断
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
    
    // 特性5：支持多个条件变量
    private final java.util.concurrent.locks.Condition notFull = lock.newCondition();
    private final java.util.concurrent.locks.Condition notEmpty = lock.newCondition();
}`}
            language="java"
            filename="ReentrantLockDemo.java"
            description="ReentrantLock 五大核心特性"
            highlights={[10, 20, 29, 34, 42]}
          />

          <Callout type="danger" title="⚠️ 必须手动释放锁">
            ReentrantLock 不会像 synchronized 那样自动释放锁，<strong>必须在 finally 块中调用 unlock()</strong>。如果忘记释放或异常导致未执行 unlock()，将造成永久死锁，其他线程永远无法获取锁。
          </Callout>

          <h3 id="lock-vs-sync" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 ReentrantLock vs synchronized
          </h3>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment border-b-2 border-border">
                <th className="text-left py-2 px-3 font-semibold text-ink">特性</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">synchronized</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">ReentrantLock</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 font-medium text-ink">实现层面</td>
                <td className="py-2 px-3 text-ink-muted">JVM（字节码 monitorenter/monitorexit）</td>
                <td className="py-2 px-3 text-ink-muted">JDK（AQS + CAS）</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 font-medium text-ink">锁释放</td>
                <td className="py-2 px-3 text-ink-muted">自动释放（方法结束或异常）</td>
                <td className="py-2 px-3 text-ink-muted">手动释放（必须在 finally 中）</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 font-medium text-ink">可中断</td>
                <td className="py-2 px-3 text-ink-muted">❌ 不支持</td>
                <td className="py-2 px-3 text-ink-muted">✅ lockInterruptibly()</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 font-medium text-ink">超时获取</td>
                <td className="py-2 px-3 text-ink-muted">❌ 不支持</td>
                <td className="py-2 px-3 text-ink-muted">✅ tryLock(timeout)</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 font-medium text-ink">公平锁</td>
                <td className="py-2 px-3 text-ink-muted">❌ 仅非公平</td>
                <td className="py-2 px-3 text-ink-muted">✅ 可选（构造参数）</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 font-medium text-ink">多条件变量</td>
                <td className="py-2 px-3 text-ink-muted">❌ 单一 wait/notify</td>
                <td className="py-2 px-3 text-ink-muted">✅ 多个 Condition</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-ink">性能（JDK 6+）</td>
                <td className="py-2 px-3 text-ink-muted">相当（锁优化后）</td>
                <td className="py-2 px-3 text-ink-muted">相当（AQS 高效）</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="如何选择？">
            <strong>优先使用 synchronized</strong>：代码简洁、不易出错、JVM 自动优化。<br/>
            <strong>需要以下特性时用 ReentrantLock</strong>：可中断、超时获取、公平锁、多条件变量、尝试获取锁（tryLock）。
          </Callout>

          <h2 id="condition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Condition 条件变量
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Condition</code> 是 ReentrantLock 配套的条件变量，替代传统的 
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Object.wait()/notify()</code>。优势在于可以创建多个条件变量，精准控制线程唤醒。
          </p>

          <Playground
            code={`import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.Condition;
import java.util.LinkedList;
import java.util.Queue;

public class BoundedBuffer<T> {
    private final Queue<T> buffer = new LinkedList<>();
    private final int capacity;
    private final ReentrantLock lock = new ReentrantLock();
    
    // 两个条件变量：缓冲区满 / 缓冲区空
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();
    
    public BoundedBuffer(int capacity) {
        this.capacity = capacity;
    }
    
    public void produce(T item) throws InterruptedException {
        lock.lock();
        try {
            // 如果缓冲区满了，等待 notFull 信号
            while (buffer.size() == capacity) {
                notFull.await();  // 释放锁，进入等待队列
            }
            
            buffer.offer(item);
            System.out.println("生产: " + item + ", 当前大小: " + buffer.size());
            
            // 通知消费者：缓冲区非空
            notEmpty.signal();  // 唤醒一个等待 notEmpty 的消费者
        } finally {
            lock.unlock();
        }
    }
    
    @SuppressWarnings("unchecked")
    public T consume() throws InterruptedException {
        lock.lock();
        try {
            // 如果缓冲区空了，等待 notEmpty 信号
            while (buffer.isEmpty()) {
                notEmpty.await();  // 释放锁，进入等待队列
            }
            
            T item = buffer.poll();
            System.out.println("消费: " + item + ", 当前大小: " + buffer.size());
            
            // 通知生产者：缓冲区非满
            notFull.signal();  // 唤醒一个等待 notFull 的生产者
            return item;
        } finally {
            lock.unlock();
        }
    }
}`}
            language="java"
            filename="BoundedBuffer.java"
            description="Condition 实现生产者-消费者模式：两个条件变量精准控制"
            highlights={[23, 28, 38, 43]}
          />

          <SideNote label="vs Object.wait/notify">
            Object.wait/notify 只能有一个等待队列，无法区分不同类型的等待（如"满"和"空"）。Condition 允许创建多个条件变量，每个条件有独立的等待队列，避免了虚假唤醒和无效唤醒问题。
          </SideNote>

          <h2 id="readwrite-lock" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、读写锁 ReadWriteLock
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ReadWriteLock</code> 维护了一对锁：<strong>读锁（共享锁）</strong>和<strong>写锁（排他锁）</strong>。
            读锁允许多个线程同时读取，写锁独占访问。适用于<strong>读多写少</strong>的场景，显著提升并发性能。
          </p>

          <Playground
            code={`import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.HashMap;
import java.util.Map;

public class CachedDataStore {
    private final Map<String, String> cache = new HashMap<>();
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
    
    // 读操作：共享锁，多个线程可同时读取
    public String read(String key) {
        rwLock.readLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + " 读取: " + key);
            return cache.get(key);
        } finally {
            rwLock.readLock().unlock();
        }
    }
    
    // 写操作：排他锁，同一时刻只有一个线程能写入
    public void write(String key, String value) {
        rwLock.writeLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + " 写入: " + key + "=" + value);
            cache.put(key, value);
        } finally {
            rwLock.writeLock().unlock();
        }
    }
    
    // 锁降级：先获取写锁，再获取读锁，最后释放写锁
    public String readAfterWrite(String key, String newValue) {
        rwLock.writeLock().lock();
        try {
            cache.put(key, newValue);
            
            // 在释放写锁前，获取读锁（锁降级）
            rwLock.readLock().lock();
        } finally {
            rwLock.writeLock().unlock();  // 释放写锁，但保留读锁
        }
        
        try {
            return cache.get(key);  // 以读锁状态读取数据
        } finally {
            rwLock.readLock().unlock();  // 最终释放读锁
        }
    }
}`}
            language="java"
            filename="CachedDataStore.java"
            description="ReadWriteLock：读共享、写独占，支持锁降级"
            highlights={[12, 22, 34]}
          />

          <Callout type="tip" title="锁降级的重要性">
            锁降级（写锁 → 读锁）保证了数据一致性：线程在写入后立即以读锁状态读取，确保其他线程在此期间无法修改数据。注意：<strong>不支持锁升级</strong>（读锁 → 写锁），会导致死锁。
          </Callout>

          <h2 id="semaphore" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、信号量 Semaphore
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Semaphore</code> 用于控制同时访问特定资源的线程数量。它维护了一个许可（permit）计数器，
            线程通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">acquire()</code> 获取许可，<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">release()</code> 释放许可。
            典型应用场景：数据库连接池、限流器。
          </p>

          <Playground
            code={`import java.util.concurrent.Semaphore;

public class DatabaseConnectionPool {
    private final Semaphore semaphore;
    
    public DatabaseConnectionPool(int maxConnections) {
        // 初始化信号量，最大并发连接数
        this.semaphore = new Semaphore(maxConnections);
    }
    
    public void executeQuery(String query) throws InterruptedException {
        // 获取许可（如果没有可用许可则阻塞）
        semaphore.acquire();
        try {
            System.out.println(Thread.currentThread().getName() + " 执行查询: " + query);
            // 模拟数据库操作耗时
            Thread.sleep(1000);
        } finally {
            // 释放许可，允许其他线程获取
            semaphore.release();
        }
    }
    
    public static void main(String[] args) {
        DatabaseConnectionPool pool = new DatabaseConnectionPool(3);  // 最多3个并发连接
        
        // 创建10个线程模拟并发请求
        for (int i = 0; i < 10; i++) {
            new Thread(() -> {
                try {
                    pool.executeQuery("SELECT * FROM users");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }, "Thread-" + i).start();
        }
    }
}`}
            language="java"
            filename="DatabaseConnectionPool.java"
            description="Semaphore 实现数据库连接池：限制并发连接数"
            highlights={[13, 19]}
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区1：synchronized 锁定的是代码">
            <strong>错误认知：</strong>synchronized 锁定的是代码块或方法。<br/>
            <strong>正确理解：</strong>synchronized 锁定的是<strong>对象</strong>（实例方法锁 this，静态方法锁 Class 对象，代码块锁指定对象）。代码本身不会被锁定，只是通过对象的 Monitor 实现互斥访问。
          </Callout>

          <Callout type="danger" title="误区2：ReentrantLock 性能一定优于 synchronized">
            <strong>错误认知：</strong>ReentrantLock 比 synchronized 快。<br/>
            <strong>正确理解：</strong>JDK 6+ 之后，synchronized 经过锁优化（偏向锁、轻量级锁、锁消除、锁粗化），在无竞争或低竞争场景下性能与 ReentrantLock 相当。只有在需要高级特性（如可中断、公平锁）时才选择 ReentrantLock。
          </Callout>

          <Callout type="danger" title="误区3：volatile 可以替代 synchronized">
            <strong>错误认知：</strong>用 volatile 修饰变量就能保证线程安全。<br/>
            <strong>正确理解：</strong>volatile 只保证<strong>可见性</strong>和<strong>有序性</strong>，不保证<strong>原子性</strong>。例如 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">count++</code> 操作包含读取-修改-写入三步，volatile 无法保证这三步的原子性，仍需 synchronized 或 AtomicInteger。
          </Callout>

          <Callout type="warning" title="误区4：公平锁性能更好">
            <strong>错误认知：</strong>公平锁能保证线程按顺序获取锁，所以性能更好。<br/>
            <strong>正确理解：</strong>公平锁需要维护队列和上下文切换，吞吐量远低于非公平锁。除非业务严格要求 FIFO 顺序（如排队系统），否则应使用默认的非公平锁以提升性能。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "synchronized 和 ReentrantLock 的区别？",
              answer: "① 实现层面：synchronized 是 JVM 层面的内置锁（字节码 monitorenter/monitorexit），ReentrantLock 是 JDK 层面的显式锁（基于 AQS + CAS）。② 锁释放：synchronized 自动释放，ReentrantLock 必须手动在 finally 中释放。③ 功能特性：ReentrantLock 支持可中断（lockInterruptibly）、超时获取（tryLock）、公平锁、多条件变量（Condition），synchronized 不支持。④ 性能：JDK 6+ 后两者性能相当，优先使用 synchronized，需要高级特性时用 ReentrantLock。"
            },
            {
              question: "什么是锁升级？为什么不能降级？",
              answer: "锁升级是 JDK 6 引入的优化机制：无竞争时使用偏向锁（CAS 标记线程 ID），轻微竞争时升级为轻量级锁（CAS 自旋），激烈竞争时升级为重量级锁（操作系统 Mutex）。升级过程记录在对象头的 Mark Word 中。不能降级是因为：① 降级需要额外的状态管理和同步开销；② 重量级锁通常意味着高竞争，降级后很快又会升级，得不偿失；③ JVM 设计决策，简化实现复杂度。"
            },
            {
              question: "ReentrantLock 为什么必须在 finally 中释放锁？",
              answer: "因为如果不在 finally 中释放，当临界区代码抛出异常时，unlock() 不会执行，导致锁永久未被释放。其他线程尝试获取该锁时会永久阻塞，造成死锁。finally 块保证无论是否发生异常，锁都会被释放，这是防御性编程的最佳实践。"
            },
            {
              question: "ReadWriteLock 的适用场景是什么？",
              answer: "适用于<strong>读多写少</strong>的场景，如缓存系统、配置管理器、元数据存储。读操作使用共享锁（多个线程可同时读取），写操作使用排他锁（独占访问）。如果读写比例达到 10:1 以上，使用 ReadWriteLock 可显著提升并发性能。但如果写操作频繁，读写锁的维护开销反而可能降低性能，此时应选择普通互斥锁。"
            },
            {
              question: "Condition 相比 Object.wait/notify 有什么优势？",
              answer: "① 多条件变量：Condition 可以创建多个条件（如 notFull、notEmpty），每个条件有独立的等待队列，而 Object 只有一个等待队列。② 精准唤醒：signal() 只唤醒等待特定条件的线程，避免无效唤醒；notify() 随机唤醒一个线程，可能导致唤醒错误的线程。③ 可中断：Condition.await() 支持响应中断，Object.wait() 虽然也响应中断，但无法区分是哪个条件被中断。④ 超时等待：Condition 支持 await(timeout)，Object 也有 wait(timeout)，但 Condition 的 API 更统一。"
            },
            {
              question: "什么是 ABA 问题？如何解决？",
              answer: "ABA 问题发生在 CAS 操作中：线程1 读取值 A，准备 CAS 更新为 B；此时线程2 将值从 A 改为 B，又改回 A；线程1 执行 CAS 时发现值仍是 A，认为未被修改，但实际上值已经变化过两次。解决方案：① 添加版本号（AtomicStampedReference），每次修改递增版本号；② 使用 AtomicMarkableReference，标记是否被修改过。Java 中 AtomicInteger 不会遇到 ABA 问题，因为它只关心最终值，不关心中间状态。"
            },
          ]} />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、对比总结
          </h2>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment border-b-2 border-border">
                <th className="text-left py-2 px-3 font-semibold text-ink">同步机制</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">适用场景</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">性能特点</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">关键特性</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 font-medium text-ink">synchronized</td>
                <td className="py-2 px-3 text-ink-muted">通用场景，简单同步</td>
                <td className="py-2 px-3 text-ink-muted">JVM 优化，无竞争时极快</td>
                <td className="py-2 px-3 text-ink-muted">自动管理、不可中断、非公平</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 font-medium text-ink">ReentrantLock</td>
                <td className="py-2 px-3 text-ink-muted">需要高级控制的场景</td>
                <td className="py-2 px-3 text-ink-muted">与 synchronized 相当</td>
                <td className="py-2 px-3 text-ink-muted">可中断、超时、公平、多条件</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 font-medium text-ink">ReadWriteLock</td>
                <td className="py-2 px-3 text-ink-muted">读多写少（如缓存）</td>
                <td className="py-2 px-3 text-ink-muted">读并发时性能优异</td>
                <td className="py-2 px-3 text-ink-muted">读共享、写独占、锁降级</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 font-medium text-ink">Semaphore</td>
                <td className="py-2 px-3 text-ink-muted">限流、资源池</td>
                <td className="py-2 px-3 text-ink-muted">控制并发数，开销小</td>
                <td className="py-2 px-3 text-ink-muted">许可计数、 acquire/release</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-ink">Condition</td>
                <td className="py-2 px-3 text-ink-muted">复杂线程协作</td>
                <td className="py-2 px-3 text-ink-muted">与 ReentrantLock 绑定</td>
                <td className="py-2 px-3 text-ink-muted">多条件队列、精准唤醒</td>
              </tr>
            </tbody>
          </table>

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            同步机制是多线程编程的核心，与以下知识点密切相关：
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><strong>前置知识：</strong><a href="/docs/03-multithreading/multi-threading-basics" className="text-accent hover:underline">多线程基础</a> — 理解线程创建、生命周期、线程安全概念</li>
            <li><strong>关联知识：</strong><a href="/docs/03-multithreading/atomic-operations" className="text-accent hover:underline">原子操作类</a> — CAS 无锁同步，性能优于传统锁</li>
            <li><strong>关联知识：</strong><a href="/docs/03-multithreading/concurrent-utils" className="text-accent hover:underline">并发工具类</a> — CountDownLatch、CyclicBarrier 等同步辅助类</li>
            <li><strong>关联知识：</strong><a href="/docs/03-multithreading/thread-pool" className="text-accent hover:underline">线程池</a> — 线程复用与管理，避免频繁创建销毁线程</li>
            <li><strong>进阶知识：</strong><a href="/docs/02-collections/concurrent-collections" className="text-accent hover:underline">并发集合类</a> — ConcurrentHashMap、CopyOnWriteArrayList 等线程安全容器</li>
          </ul>

          {/* ⚠️ ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      {/* ⚠️ SmartTOC 直接渲染，不要用 <aside> 包裹！组件自行管理桌面端右侧栏和移动端右侧抽屉 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
