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
  { id: 'lock-upgrade', text: '锁升级过程', level: 3 },
  { id: 'biased-lock', text: '偏向锁', level: 3 },
  { id: 'lightweight-lock', text: '轻量级锁', level: 3 },
  { id: 'heavyweight-lock', text: '重量级锁', level: 3 },
  { id: 'other-locks', text: '其他锁类型', level: 3 },
  { id: 'playground', text: '代码实验场', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比分析', level: 2 },
]

export default function LockMechanism({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Java 锁机制是 JVM 提供的多线程同步工具，通过<strong>Monitor 对象</strong>实现互斥访问，
              JDK 6+ 引入了<strong>锁升级</strong>优化（偏向锁 → 轻量级锁 → 重量级锁），
              在无竞争或低竞争场景下大幅减少线程阻塞和上下文切换的开销。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要锁升级？">
            传统的 synchronized 是重量级锁，涉及用户态和内核态的切换，性能较差。
            大多数情况下锁竞争并不激烈，JVM 通过锁升级策略，在低竞争时使用轻量级锁，
            只有在真正竞争激烈时才升级为重量级锁，从而兼顾安全性和性能。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            整体架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 锁的状态存储在对象头的 Mark Word 中，随着竞争程度逐步升级：
          </p>

          <DiagramBlock title="锁升级流程图">
            {`
无锁 → 偏向锁 → 轻量级锁 → 重量级锁
       ↓         ↓           ↓
   单线程访问  CAS竞争    队列等待
   (无反撤销) (自旋重试) (OS互斥量)
            `}
          </DiagramBlock>

          <SideNote>
            <p className="text-sm text-ink-muted">
              <strong>注意：</strong>锁只能升级不能降级。一旦升级为重量级锁，即使竞争消失也不会回退。
              这是为了避免频繁升级/降级带来的额外开销。
            </p>
          </SideNote>

          <h2 id="core" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            核心原理
          </h2>

          <h3 id="lock-upgrade" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            锁升级过程
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            synchronized 的锁升级是一个渐进的过程，根据竞争程度自动调整：
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-border border border-border rounded-paper-md">
              <thead className="bg-parchment-deep">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">锁状态</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">触发条件</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">实现方式</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">性能</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                <tr><td className="px-4 py-3 font-medium text-sm">无锁</td><td className="px-4 py-3 text-sm">对象刚创建</td><td className="px-4 py-3 text-sm">Mark Word 存储 hashCode</td><td className="px-4 py-3 text-sm">⚡ 最快</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">偏向锁</td><td className="px-4 py-3 text-sm">单线程访问</td><td className="px-4 py-3 text-sm">记录线程 ID</td><td className="px-4 py-3 text-sm">⚡ 很快</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">轻量级锁</td><td className="px-4 py-3 text-sm">轻微竞争</td><td className="px-4 py-3 text-sm">CAS + 自旋</td><td className="px-4 py-3 text-sm">⚡ 较快</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">重量级锁</td><td className="px-4 py-3 text-sm">激烈竞争</td><td className="px-4 py-3 text-sm">Monitor + 队列</td><td className="px-4 py-3 text-sm">🐢 较慢</td></tr>
              </tbody>
            </table>
          </div>

          <h3 id="biased-lock" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            偏向锁
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>偏向锁</strong>适用于只有一个线程访问同步块的场景。它在对象头和栈帧中记录线程 ID，
            后续该线程进入同步块时无需任何同步操作，只需测试 Mark Word 中是否存储着指向当前线程的偏向锁。
          </p>

          <Playground
            code={`// 偏向锁示例：单线程反复获取锁
public class BiasedLockDemo {
    private static final Object lock = new Object();
    
    public static void main(String[] args) {
        // 第一次获取锁：建立偏向锁
        synchronized (lock) {
            System.out.println("Thread 1 获取偏向锁");
        }
        
        // 第二次获取锁：无需同步操作，直接执行
        synchronized (lock) {
            System.out.println("Thread 1 再次获取偏向锁（无开销）");
        }
        
        // 如果其他线程尝试获取，偏向锁会被撤销并升级为轻量级锁
    }
}`}
            language="java"
            description="偏向锁的工作方式"
          />

          <Callout type="warning" title="⚠️ 偏向锁的撤销">
            <p className="text-sm">
              当有其他线程尝试获取偏向锁时，JVM 会<strong>撤销偏向锁</strong>并升级为轻量级锁。
              撤销过程需要 Stop-The-World，如果应用中存在大量锁竞争，建议禁用偏向锁：
              <code className="font-mono text-xs"> -XX:-UseBiasedLocking</code>
            </p>
          </Callout>

          <h3 id="lightweight-lock" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            轻量级锁
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>轻量级锁</strong>适用于多个线程交替执行同步块的场景（非同时竞争）。
            它通过将对象头的 Mark Word 复制到线程栈中的 Lock Record，然后使用 CAS 将 Mark Word 更新为指向 Lock Record 的指针。
          </p>

          <Playground
            code={`// 轻量级锁：CAS 竞争
public class LightweightLockDemo {
    private static final Object lock = new Object();
    
    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            synchronized (lock) {
                System.out.println("Thread 1 持有轻量级锁");
                try { Thread.sleep(10); } catch (Exception e) {}
            }
        });
        
        Thread t2 = new Thread(() -> {
            synchronized (lock) {
                System.out.println("Thread 2 持有轻量级锁");
            }
        });
        
        t1.start();
        t2.start();
        // 两个线程交替执行，不会升级为重量级锁
    }
}`}
            language="java"
            description="轻量级锁的 CAS 竞争"
          />

          <h3 id="heavyweight-lock" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            重量级锁
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>重量级锁</strong>依赖于操作系统的 Mutex Lock（互斥量）实现。
            当轻量级锁的 CAS 操作失败（说明存在真正的竞争），或者自旋超过一定次数后，锁会膨胀为重量级锁。
            此时未获取到锁的线程会被阻塞，进入等待队列，由操作系统负责唤醒。
          </p>

          <Callout type="danger" title="重量级锁的性能问题">
            <p className="text-sm">
              重量级锁会导致<strong>线程阻塞和唤醒</strong>，涉及用户态和内核态的切换，开销很大。
              这也是为什么 JDK 6+ 要引入锁升级优化的原因——尽量避免进入重量级锁状态。
            </p>
          </Callout>

          <h3 id="other-locks" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            其他锁类型
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            除了 synchronized 的内置锁，Java 还提供了多种显式锁：
          </p>
          <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
            <li><strong>自旋锁</strong>：线程不阻塞，通过循环检查锁状态，适合短时间的锁持有</li>
            <li><strong>适应性自旋</strong>：自旋时间根据前一次在同一个锁上的自旋时间及锁的拥有者的状态决定</li>
            <li><strong>锁消除</strong>：JIT 编译器检测到不可能存在共享数据竞争的锁，将其消除</li>
            <li><strong>锁粗化</strong>：将连续的加锁/解锁操作合并，减少重复加锁的开销</li>
          </ul>

          <h2 id="playground" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            代码实验场
          </h2>
          <Playground
            code={`import java.util.concurrent.locks.ReentrantLock;

public class LockComparison {
    private static int counter = 0;
    private static final Object syncLock = new Object();
    private static final ReentrantLock reentrantLock = new ReentrantLock();
    
    // synchronized 方式
    public static void incrementSync() {
        synchronized (syncLock) {
            counter++;
        }
    }
    
    // ReentrantLock 方式
    public static void incrementReentrant() {
        reentrantLock.lock();
        try {
            counter++;
        } finally {
            reentrantLock.unlock();
        }
    }
    
    public static void main(String[] args) throws InterruptedException {
        // 测试 synchronized
        long start = System.currentTimeMillis();
        for (int i = 0; i < 1_000_000; i++) {
            incrementSync();
        }
        System.out.println("synchronized: " + (System.currentTimeMillis() - start) + "ms");
        
        // 测试 ReentrantLock
        counter = 0;
        start = System.currentTimeMillis();
        for (int i = 0; i < 1_000_000; i++) {
            incrementReentrant();
        }
        System.out.println("ReentrantLock: " + (System.currentTimeMillis() - start) + "ms");
    }
}`}
            language="java"
            description="synchronized vs ReentrantLock 性能对比"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            常见误区
          </h2>

          <Callout type="danger" title="误区 1：认为 synchronized 一直是重量级锁">
            <p className="text-sm mb-2">
              ❌ 错误认知：synchronized 性能差，应该用 ReentrantLock 替代
            </p>
            <p className="text-sm">
              ✅ 正确理解：JDK 6+ 之后，synchronized 经过大量优化（锁升级、锁消除、锁粗化等），
              在低竞争场景下性能与 ReentrantLock 相当，甚至更好。只有在高竞争场景才需要考虑 ReentrantLock。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：认为锁可以降级">
            <p className="text-sm mb-2">
              ❌ 错误认知：竞争消失后，重量级锁会自动降级为轻量级锁
            </p>
            <p className="text-sm">
              ✅ 正确理解：锁<strong>只能升级不能降级</strong>。一旦升级为重量级锁，即使竞争消失也保持重量级状态。
              这是为了避免频繁升级/降级带来的额外开销。如果需要重新获得轻量级锁，必须释放后重新获取。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：认为偏向锁总是有益的">
            <p className="text-sm mb-2">
              ❌ 错误认知：开启偏向锁总能提升性能
            </p>
            <p className="text-sm">
              ✅ 正确理解：如果应用中存在大量锁竞争，偏向锁会频繁撤销，反而降低性能。
              在这种情况下应该禁用偏向锁：<code className="font-mono text-xs">-XX:-UseBiasedLocking</code>。
              偏向锁适合单线程访问同步块的场景。
            </p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            面试真题
          </h2>
          <InterviewSection
            questions={[
              {
                question: '请详细描述 synchronized 的锁升级过程',
                answer: `synchronized 的锁升级过程分为四个阶段：

1. 无锁状态：
   - 对象刚创建时，Mark Word 存储对象的 hashCode、分代年龄等信息
   - 没有任何线程持有锁

2. 偏向锁：
   - 当第一个线程访问同步块时，JVM 在对象头和栈帧中记录线程 ID
   - 后续该线程进入同步块时，只需测试 Mark Word 中是否存储着指向当前线程的偏向锁
   - 无需任何同步操作，性能极高
   - 适用场景：单线程反复访问同步块

3. 轻量级锁：
   - 当有其他线程尝试获取偏向锁时，偏向锁被撤销，升级为轻量级锁
   - 线程在栈帧中创建 Lock Record，复制对象头的 Mark Word
   - 使用 CAS 将 Mark Word 更新为指向 Lock Record 的指针
   - 如果 CAS 成功，获得锁；如果失败，说明存在竞争，自旋重试
   - 适用场景：多个线程交替执行同步块（非同时竞争）

4. 重量级锁：
   - 当轻量级锁的 CAS 操作失败（存在真正竞争），或自旋超过阈值
   - 锁膨胀为重量级锁，依赖操作系统的 Mutex Lock
   - 未获取到锁的线程被阻塞，进入等待队列
   - 由操作系统负责唤醒，涉及用户态和内核态切换，开销大

注意：锁只能升级不能降级。`
              },
              {
                question: 'synchronized 和 ReentrantLock 的区别是什么？',
                answer: `主要区别：

1. 实现层面：
   - synchronized：JVM 层面的关键字，底层通过 Monitor 实现
   - ReentrantLock：JDK 层面的类，基于 AQS（AbstractQueuedSynchronizer）实现

2. 锁的释放：
   - synchronized：自动释放（方法执行完或异常时）
   - ReentrantLock：必须手动释放（通常在 finally 块中）

3. 灵活性：
   - synchronized：功能相对简单
   - ReentrantLock：支持公平锁/非公平锁、可中断、超时获取、Condition 等高级特性

4. 性能：
   - JDK 6+ 之后，两者在低竞争场景下性能相当
   - 高竞争场景下，ReentrantLock 可能略优（因为可以更精细控制）

5. 调试：
   - synchronized：难以定位死锁
   - ReentrantLock：可以通过 getHoldCount()、isLocked() 等方法监控

最佳实践：优先使用 synchronized，只有在需要 ReentrantLock 的高级特性时才使用它。`
              },
              {
                question: '什么是自旋锁？优缺点是什么？',
                answer: `自旋锁是一种特殊的锁机制：

工作原理：
- 线程获取锁失败时，不立即阻塞，而是通过循环（自旋）不断检查锁状态
- 如果锁很快被释放，自旋可以避免线程阻塞/唤醒的开销

优点：
1. 避免线程上下文切换的开销
2. 适合锁持有时间短的场景
3. 提高系统吞吐量

缺点：
1. 如果锁长时间不释放，自旋会浪费 CPU 资源
2. 不适合高竞争或长临界区的场景

JVM 的优化：
- 适应性自旋：自旋时间根据前一次在同一个锁上的自旋时间及锁的拥有者的状态动态调整
- 自旋次数限制：默认自旋 10 次（可通过 -XX:PreBlockSpin 调整），超过后升级为重量级锁

适用场景：多核处理器、锁持有时间短、竞争不激烈的场景。`
              },
              {
                question: '什么是锁消除和锁粗化？',
                answer: `这两种都是 JVM 的锁优化技术：

锁消除（Lock Elimination）：
- JIT 编译器通过逃逸分析，检测到某些同步块不可能存在共享数据竞争
- 将这些不必要的锁完全消除，提升性能

示例：
StringBuffer sb = new StringBuffer();
sb.append("a").append("b");  // StringBuffer 内部有 synchronized
// JIT 发现 sb 是局部变量，不会被其他线程访问，消除内部的锁

锁粗化（Lock Coarsening）：
- 检测到连续的一系列操作都需要对同一个对象加锁
- 将加锁范围扩展到整个操作序列的外部，减少重复加锁/解锁的开销

示例：
// 优化前
for (int i = 0; i < 1000; i++) {
    synchronized (lock) {  // 重复加锁 1000 次
        doSomething();
    }
}

// 优化后（锁粗化）
synchronized (lock) {  // 只加锁一次
    for (int i = 0; i < 1000; i++) {
        doSomething();
    }
}

这两种优化都是由 JVM 自动完成的，开发者无需手动干预。`
              },
              {
                question: '如何选择合适的锁策略？',
                answer: `选择锁策略的原则：

1. 优先使用 synchronized：
   - 代码简洁，不易出错
   - JDK 6+ 性能已大幅优化
   - 适合大多数场景

2. 使用 ReentrantLock 的场景：
   - 需要公平锁（按请求顺序获取锁）
   - 需要可中断的锁获取（lockInterruptibly()）
   - 需要超时获取锁（tryLock(timeout)）
   - 需要多个条件变量（Condition）
   - 需要更细粒度的锁控制

3. 使用读写锁（ReentrantReadWriteLock）的场景：
   - 读多写少的场景
   - 读操作不互斥，写操作互斥
   - 提高并发读取性能

4. 使用 StampedLock 的场景：
   - Java 8 引入，性能优于 ReentrantReadWriteLock
   - 提供乐观读模式，进一步减少锁竞争
   - 但不支持重入，使用复杂度较高

5. 无锁方案（AtomicXXX、ConcurrentHashMap）：
   - 高并发计数器、累加器
   - 基于 CAS 的无锁算法
   - 避免锁竞争，性能最优

总结：从简单到复杂，从 synchronized → ReentrantLock → 读写锁 → 无锁，根据实际需求选择。`
              },
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            对比分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            各种锁机制的全面对比：
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-border border border-border rounded-paper-md">
              <thead className="bg-parchment-deep">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">特性</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">偏向锁</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">轻量级锁</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">重量级锁</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                <tr><td className="px-4 py-3 font-medium text-sm">适用场景</td><td className="px-4 py-3 text-sm">单线程访问</td><td className="px-4 py-3 text-sm">交替访问</td><td className="px-4 py-3 text-sm">同时竞争</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">实现方式</td><td className="px-4 py-3 text-sm">记录线程 ID</td><td className="px-4 py-3 text-sm">CAS + 自旋</td><td className="px-4 py-3 text-sm">Monitor + 队列</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">线程阻塞</td><td className="px-4 py-3 text-sm text-green-600">❌</td><td className="px-4 py-3 text-sm text-green-600">❌</td><td className="px-4 py-3 text-sm text-red-600">✅</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">性能</td><td className="px-4 py-3 text-sm">⚡⚡⚡ 极快</td><td className="px-4 py-3 text-sm">⚡⚡ 较快</td><td className="px-4 py-3 text-sm">🐢 较慢</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">CPU 占用</td><td className="px-4 py-3 text-sm">低</td><td className="px-4 py-3 text-sm">中（自旋）</td><td className="px-4 py-3 text-sm">低（阻塞）</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">可重入</td><td className="px-4 py-3 text-sm text-green-600">✅</td><td className="px-4 py-3 text-sm text-green-600">✅</td><td className="px-4 py-3 text-sm text-green-600">✅</td></tr>
              </tbody>
            </table>
          </div>

          <section id="related" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
              关联知识
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-paper-md hover:border-accent transition-colors">
                <h4 className="font-semibold text-sm mb-2">→ Java内存模型（JMM）深度解析</h4>
                <p className="text-xs text-ink-muted">理解 volatile 和 synchronized 的底层语义</p>
              </div>
              <div className="p-4 border border-border rounded-paper-md hover:border-accent transition-colors">
                <h4 className="font-semibold text-sm mb-2">→ AQS原理剖析</h4>
                <p className="text-xs text-ink-muted">学习 ReentrantLock 的实现基础</p>
              </div>
            </div>
          </section>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
