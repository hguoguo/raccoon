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
  { id: 'happens-before', text: 'happens-before 规则', level: 3 },
  { id: 'memory-barrier', text: '内存屏障', level: 3 },
  { id: 'reordering', text: '指令重排序', level: 3 },
  { id: 'volatile-semantics', text: 'volatile 语义', level: 3 },
  { id: 'playground', text: '代码实验场', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比分析', level: 2 },
]

export default function JmmDeepDive({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              <strong>Java内存模型（JMM）</strong>是 Java 语言规范中定义的抽象模型，描述了多线程访问共享变量时的行为规范，
              通过<strong>主内存</strong>和<strong>工作内存</strong>的交互协议以及<strong>happens-before</strong>规则，
              保证多线程环境下的<strong>可见性</strong>、<strong>有序性</strong>和<strong>原子性</strong>。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么 JMM 如此重要？">
            JMM 是理解 Java 并发编程的基石。不懂 JMM 就无法真正理解 volatile、synchronized、CAS 等并发工具的原理，
            更无法解决生产环境中的线程安全问题。它是高级 Java 工程师的必备知识。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            整体架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JMM 定义了线程与主内存之间的抽象关系：<strong>所有变量存储在主内存</strong>，每个线程有自己独立的<strong>工作内存</strong>，
            线程对变量的操作必须在工作内存中进行，不能直接读写主内存。
          </p>

          <DiagramBlock title="JMM 内存结构示意">
            {`
+------------------+       +------------------+       +------------------+
|   Thread 1       |       |   Thread 2       |       |   Thread 3       |
|                  |       |                  |       |                  |
| +--------------+ |       | +--------------+ |       | +--------------+ |
| | Work Memory  | |       | | Work Memory  | |       | | Work Memory  | |
| |  (本地副本)   | |       | |  (本地副本)   | |       | |  (本地副本)   | |
| +------+-------+ |       | +------+-------+ |       | +------+-------+ |
|        |         |       |        |         |       |        |         |
|   read/write    |       |   read/write    |       |   read/write    |
|        |         |       |        |         |       |        |         |
+--------+---------+       +--------+---------+       +--------+---------+
         |                          |                          |
         |     load/store           |     load/store           |     load/store
         |                          |                          |
         v                          v                          v
+--------------------------------------------------------------------------+
|                         Main Memory (主内存)                              |
|                    所有共享变量存储在这里                                   |
|                    (堆内存中的实例字段、静态变量等)                          |
+--------------------------------------------------------------------------+
            `}
          </DiagramBlock>

          <SideNote>
            <p className="text-sm text-ink-muted">
              <strong>注意：</strong>JMM 是抽象模型，不是真实的物理内存布局。工作内存对应 CPU 缓存、寄存器等，
              主内存对应 RAM。JVM 实现可以自由优化，只要符合 JMM 规范即可。
            </p>
          </SideNote>

          <h2 id="core" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            核心原理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JMM 围绕三个核心特性展开：<strong>原子性</strong>、<strong>可见性</strong>、<strong>有序性</strong>。
          </p>

          <h3 id="happens-before" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            happens-before 规则
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">happens-before</code> 
            是 JMM 的核心概念，它定义了操作之间的<strong>偏序关系</strong>，保证了内存可见性。如果 A happens-before B，
            则 A 的结果对 B 可见。
          </p>

          <Playground
            code={`// 1. 程序次序规则：单线程内，按照代码顺序，书写在前面的操作先行发生于书写在后面的操作
int a = 1;      // happens-before
int b = a + 1;  // 能读取到 a=1

// 2. 管程锁定规则：一个 unlock 操作先行发生于后面对同一个锁的 lock 操作
synchronized(lock) {
    x = 1;
}  // unlock
// happens-before
synchronized(lock) {  // lock
    System.out.println(x);  // 能看到 x=1
}

// 3. volatile变量规则：对一个 volatile 变量的写操作先行发生于后面对这个变量的读操作
volatile boolean flag = false;
// Thread 1
flag = true;  // volatile write
// happens-before
// Thread 2
if (flag) {   // volatile read，能看到 flag=true
    // ...
}

// 4. 线程启动规则：Thread.start() 先行发生于该线程的每一个动作
Thread t = new Thread(() -> {
    System.out.println(x);  // 能看到主线程设置的 x
});
x = 100;
t.start();  // happens-before 线程内的所有操作

// 5. 线程终止规则：线程的所有操作先行发生于 Thread.join() 的返回
// 6. 线程中断规则：interrupt() 先行于检测到中断事件
// 7. 对象终结规则：对象构造完成先行于 finalize() 方法
// 8. 传递性：A happens-before B，B happens-before C，则 A happens-before C`}
            language="java"
            description="happens-before 八大规则"
          />

          <h3 id="memory-barrier" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            内存屏障
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            内存屏障（Memory Barrier）是 CPU 指令，用于控制<strong>指令重排序</strong>和<strong>内存可见性</strong>。
            JMM 通过插入内存屏障来实现 happens-before 规则。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">屏障类型</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作用</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">插入场景</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-sm">LoadLoad</td>
                  <td className="px-4 py-3 text-sm">确保 Load1 的数据装载先于 Load2</td>
                  <td className="px-4 py-3 text-sm">volatile 读后</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm">StoreStore</td>
                  <td className="px-4 py-3 text-sm">确保 Store1 数据刷新到内存先于 Store2</td>
                  <td className="px-4 py-3 text-sm">volatile 写前</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm">LoadStore</td>
                  <td className="px-4 py-3 text-sm">确保 Load1 数据装载先于 Store2 刷新</td>
                  <td className="px-4 py-3 text-sm">volatile 读后</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm">StoreLoad</td>
                  <td className="px-4 py-3 text-sm">确保 Store1 数据刷新先于 Load2 装载（开销最大）</td>
                  <td className="px-4 py-3 text-sm">volatile 写后</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="reordering" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            指令重排序
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            为了提高性能，编译器和处理器会对指令进行重排序。JMM 允许不影响单线程正确性的重排序，
            但会禁止可能影响多线程正确性的重排序。
          </p>

          <Playground
            code={`// 经典的重排序问题：双重检查锁定（DCL）单例
public class Singleton {
    private static Singleton instance;  // ❌ 缺少 volatile
    
    public static Singleton getInstance() {
        if (instance == null) {              // 第一次检查
            synchronized (Singleton.class) {
                if (instance == null) {      // 第二次检查
                    instance = new Singleton();  // ⚠️ 可能发生重排序
                    // 实际执行顺序可能是：
                    // 1. 分配内存空间
                    // 2. instance 引用指向内存（此时对象未初始化！）
                    // 3. 调用构造函数初始化对象
                    // 其他线程可能在步骤2后读取到未初始化的对象
                }
            }
        }
        return instance;
    }
}

// ✅ 正确做法：添加 volatile
private static volatile Singleton instance;
// volatile 禁止重排序，保证对象完全初始化后才暴露引用`}
            language="java"
            description="指令重排序示例"
          />

          <h3 id="volatile-semantics" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            volatile 语义
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">volatile</code> 
            是 JMM 提供的轻量级同步机制，具有两层语义：
          </p>
          <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
            <li><strong>保证可见性</strong>：当一个线程修改 volatile 变量后，新值立即刷新到主内存，其他线程读取时强制从主内存重新加载</li>
            <li><strong>禁止指令重排序</strong>：通过插入内存屏障，禁止 volatile 读写操作前后的重排序</li>
          </ul>

          <Callout type="warning" title="⚠️ volatile 不保证原子性">
            <p className="text-sm">
              volatile <strong>不能</strong>保证复合操作的原子性，如 <code className="font-mono text-xs">i++</code>。
              如果需要原子性，应使用 <code className="font-mono text-xs">AtomicInteger</code> 或 <code className="font-mono text-xs">synchronized</code>。
            </p>
          </Callout>

          <h2 id="playground" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            代码实验场
          </h2>
          <Playground
            code={`public class VolatileVisibility {
    private static volatile boolean flag = false;
    
    public static void main(String[] args) throws InterruptedException {
        // 线程1：修改 flag
        Thread writer = new Thread(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {}
            flag = true;
            System.out.println("Writer: flag = true");
        });
        
        // 线程2：读取 flag
        Thread reader = new Thread(() -> {
            int count = 0;
            while (!flag) {
                count++;
                // 如果没有 volatile，这里可能永远循环（读到缓存中的旧值）
                // 有了 volatile，能及时看到 writer 的修改
            }
            System.out.println("Reader: flag changed after " + count + " iterations");
        });
        
        reader.start();
        writer.start();
        
        writer.join();
        reader.join();
        
        System.out.println("Both threads completed");
    }
}`}
            language="java"
            description="volatile 可见性验证"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            常见误区
          </h2>

          <Callout type="danger" title="误区 1：认为 volatile 能保证原子性">
            <p className="text-sm mb-2">
              ❌ 错误认知：<code className="font-mono text-xs">volatile int counter; counter++;</code> 是线程安全的
            </p>
            <p className="text-sm">
              ✅ 正确理解：<code className="font-mono text-xs">counter++</code> 包含读-改-写三个步骤，volatile 只能保证单个读或写的可见性，
              无法保证复合操作的原子性。应使用 <code className="font-mono text-xs">AtomicInteger</code>。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：认为工作内存是线程私有的栈空间">
            <p className="text-sm mb-2">
              ❌ 错误认知：JMM 的工作内存 = JVM 栈
            </p>
            <p className="text-sm">
              ✅ 正确理解：工作内存是 JMM 的<strong>抽象概念</strong>，对应 CPU 寄存器、高速缓存等硬件层面。
              JVM 栈存储局部变量表，与工作内存不同。不要混淆 JMM 和 JVM 运行时数据区。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：认为 synchronized 只保证原子性">
            <p className="text-sm mb-2">
              ❌ 错误认知：synchronized 只管互斥，不管可见性
            </p>
            <p className="text-sm">
              ✅ 正确理解：synchronized 同时保证<strong>原子性</strong>、<strong>可见性</strong>和<strong>有序性</strong>。
              解锁时会刷新工作内存到主内存，加锁时会从主内存重新加载，天然满足 happens-before 规则。
            </p>
          </Callout>

          <Callout type="warning" title="误区 4：过度使用 volatile">
            <p className="text-sm">
              volatile 虽然比 synchronized 轻量，但也有性能开销（内存屏障会阻止某些优化）。
              只在确实需要可见性且操作简单时使用，复杂场景仍应用 synchronized 或 Lock。
            </p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            面试真题
          </h2>
          <InterviewSection
            questions={[
              {
                question: '什么是 Java 内存模型（JMM）？它解决了什么问题？',
                answer: `JMM 是 Java 语言规范定义的抽象内存模型，描述了多线程访问共享变量时的行为规范。

解决的问题：
1. 可见性问题：一个线程修改的变量，其他线程能否立即看到
2. 有序性问题：指令重排序是否会影响多线程正确性
3. 原子性问题：复合操作是否会被打断

JMM 通过主内存和工作内存的交互协议、happens-before 规则、内存屏障等机制，
在保证正确性的前提下，允许 JVM 和处理器进行各种优化。`
              },
              {
                question: 'volatile 关键字的作用是什么？底层原理是什么？',
                answer: `volatile 有两层语义：

1. 保证可见性：
   - 写操作：立即将新值刷新到主内存
   - 读操作：强制从主内存重新加载，不使用缓存
   
2. 禁止指令重排序：
   - 通过插入内存屏障（LoadLoad、StoreStore、LoadStore、StoreLoad）
   - 禁止 volatile 读写操作前后的重排序

底层原理：
- JVM 在 volatile 写前插入 StoreStore 屏障，写后插入 StoreLoad 屏障
- volatile 读前插入 LoadLoad 和 LoadStore 屏障
- 这些屏障最终映射为 CPU 的内存屏障指令（如 x86 的 LOCK 前缀指令）

注意：volatile 不保证原子性！`
              },
              {
                question: '什么是 happens-before 规则？列举主要的几条',
                answer: `happens-before 是 JMM 定义的偏序关系，如果 A happens-before B，则 A 的结果对 B 可见。

主要规则：
1. 程序次序规则：单线程内，代码顺序即执行顺序
2. 管程锁定规则：unlock 先行于后续对同一锁的 lock
3. volatile 变量规则：volatile 写先行于后续的 volatile 读
4. 线程启动规则：Thread.start() 先行于线程内的所有操作
5. 线程终止规则：线程内所有操作先行于 Thread.join() 返回
6. 传递性：A→B，B→C，则 A→C

这些规则是编译器、JVM、处理器优化的边界，违反 happens-before 的重排序是被禁止的。`
              },
              {
                question: 'synchronized 和 volatile 的区别是什么？',
                answer: `区别对比：

1. 保证的特性：
   - synchronized：原子性 + 可见性 + 有序性
   - volatile：可见性 + 有序性（不保证原子性）

2. 使用场景：
   - synchronized：适合复杂的同步逻辑、复合操作
   - volatile：适合简单的状态标志、单例 DCL

3. 性能：
   - synchronized：重量级，涉及线程阻塞/唤醒（JDK6+ 优化后有改善）
   - volatile：轻量级，只需内存屏障，不会阻塞线程

4. 底层实现：
   - synchronized：Monitor 对象、CAS、自旋、偏向锁等
   - volatile：内存屏障（LoadLoad、StoreStore 等）

最佳实践：简单场景用 volatile，复杂场景用 synchronized 或 Lock。`
              },
              {
                question: '什么是内存屏障？有哪些类型？',
                answer: `内存屏障（Memory Barrier）是 CPU 指令，用于控制指令重排序和内存可见性。

四种类型：
1. LoadLoad 屏障：确保 Load1 的数据装载先于 Load2
   - 插入位置：volatile 读之后
   
2. StoreStore 屏障：确保 Store1 数据刷新到内存先于 Store2
   - 插入位置：volatile 写之前
   
3. LoadStore 屏障：确保 Load1 数据装载先于 Store2 刷新
   - 插入位置：volatile 读之后
   
4. StoreLoad 屏障：确保 Store1 数据刷新先于 Load2 装载（开销最大）
   - 插入位置：volatile 写之后

JVM 通过在适当位置插入这些屏障，实现了 volatile 的语义和 happens-before 规则。`
              },
              {
                question: '双重检查锁定（DCL）为什么要用 volatile？',
                answer: `DCL 单例中使用 volatile 的原因：

问题场景：
instance = new Singleton(); 这行代码分为三步：
1. 分配内存空间
2. instance 引用指向内存地址
3. 调用构造函数初始化对象

如果没有 volatile，步骤 2 和 3 可能重排序：
- 线程 A 执行到步骤 2（instance 非空，但对象未初始化）
- 线程 B 检查 instance != null，直接使用未初始化的对象 → 错误

解决方案：
private static volatile Singleton instance;

volatile 禁止重排序，保证步骤 3 一定在步骤 2 之前完成，
其他线程看到的 instance 要么为 null，要么是完全初始化的对象。`
              },
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            对比分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JMM 中各种同步机制的全面对比：
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">特性</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">volatile</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">synchronized</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AtomicXXX</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr><td className="px-4 py-3 font-medium text-sm">原子性</td><td className="px-4 py-3 text-sm text-red-600">❌</td><td className="px-4 py-3 text-sm text-green-600">✅</td><td className="px-4 py-3 text-sm text-green-600">✅</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">可见性</td><td className="px-4 py-3 text-sm text-green-600">✅</td><td className="px-4 py-3 text-sm text-green-600">✅</td><td className="px-4 py-3 text-sm text-green-600">✅</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">有序性</td><td className="px-4 py-3 text-sm text-green-600">✅</td><td className="px-4 py-3 text-sm text-green-600">✅</td><td className="px-4 py-3 text-sm text-green-600">✅</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">阻塞线程</td><td className="px-4 py-3 text-sm text-green-600">❌</td><td className="px-4 py-3 text-sm text-red-600">✅</td><td className="px-4 py-3 text-sm text-green-600">❌</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">性能</td><td className="px-4 py-3 text-sm">⚡ 轻量</td><td className="px-4 py-3 text-sm">🐢 重量（已优化）</td><td className="px-4 py-3 text-sm">⚡ 轻量</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">适用场景</td><td className="px-4 py-3 text-sm">状态标志、DCL</td><td className="px-4 py-3 text-sm">复杂同步逻辑</td><td className="px-4 py-3 text-sm">计数器、累加器</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">底层实现</td><td className="px-4 py-3 text-sm">内存屏障</td><td className="px-4 py-3 text-sm">Monitor + CAS</td><td className="px-4 py-3 text-sm">CAS + volatile</td></tr>
              </tbody>
            </table>
          </div>

          <section id="related" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
              关联知识
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                <h4 className="font-semibold text-sm mb-2">→ Java锁机制深入剖析</h4>
                <p className="text-xs text-ink-muted">了解 synchronized 的锁升级过程和底层实现</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                <h4 className="font-semibold text-sm mb-2">→ CAS与原子类深度解析</h4>
                <p className="text-xs text-ink-muted">学习无锁并发编程和原子操作的实现原理</p>
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
