import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import InteractiveFlow from '../../../../../components/knowledge/InteractiveFlow'
import SideNote from '../../../../../components/knowledge/SideNote'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、并发集合类概述', level: 2 },
  { id: 'concurrent-hashmap', text: '二、ConcurrentHashMap 深度解析', level: 2 },
  { id: 'jdk7-segment-lock', text: '2.1 JDK 7 分段锁机制', level: 3 },
  { id: 'jdk8-cas-sync', text: '2.2 JDK 8 CAS + synchronized', level: 3 },
  { id: 'put-flow', text: '2.3 put 操作流程', level: 3 },
  { id: 'size-optimization', text: '2.4 size() 方法优化', level: 3 },
  { id: 'copy-on-write', text: '三、CopyOnWriteArrayList 原理', level: 2 },
  { id: 'cow-mechanism', text: '3.1 写时复制机制', level: 3 },
  { id: 'cow-scenarios', text: '3.2 适用场景分析', level: 3 },
  { id: 'blocking-queue', text: '四、BlockingQueue 阻塞队列', level: 2 },
  { id: 'array-blocking-queue', text: '4.1 ArrayBlockingQueue', level: 3 },
  { id: 'linked-blocking-queue', text: '4.2 LinkedBlockingQueue', level: 3 },
  { id: 'producer-consumer', text: '4.3 生产者-消费者模式', level: 3 },
  { id: 'concurrent-linked-queue', text: '五、ConcurrentLinkedQueue 无锁队列', level: 2 },
  { id: 'cas-algorithm', text: '5.1 CAS 算法实现', level: 3 },
  { id: 'queue-comparison', text: '5.2 与 BlockingQueue 对比', level: 3 },
  { id: 'selection-guide', text: '六、并发集合类选型对比', level: 2 },
  { id: 'performance-tips', text: '七、性能优化技巧', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function ConcurrentCollections({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              并发集合类是 Java 提供的<strong className="text-accent">线程安全</strong>的集合数据结构，通过细粒度锁、CAS 原子操作、写时复制等机制，在保证数据一致性的同时最大化并发性能，避免传统同步集合的性能瓶颈。
            </p>
          </blockquote>

          {/* ========== 一、并发集合类概述 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、并发集合类概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            在多线程环境下，传统的 HashMap、ArrayList 等集合类不是线程安全的，直接使用会导致数据不一致或异常。Java 提供了多种解决方案：
          </p>

          <DiagramBlock title="并发集合类家族图谱">
            <svg className="w-full max-w-[600px] mx-auto block" viewBox="0 0 600 320">
              <rect x="200" y="10" width="200" height="35" rx="4" fill="#ede4d1" stroke="#d4c5a9"/>
              <text x="300" y="33" fill="#6b5e4c" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">java.util.concurrent</text>
              
              <rect x="20" y="70" width="180" height="30" rx="4" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="110" y="90" fill="#8b4c14" fontSize="10" fontFamily="monospace" textAnchor="middle">ConcurrentHashMap</text>
              
              <rect x="210" y="70" width="180" height="30" rx="4" fill="rgba(160,82,45,0.12)" stroke="#a0522d"/>
              <text x="300" y="90" fill="#a0522d" fontSize="10" fontFamily="monospace" textAnchor="middle">CopyOnWriteArrayList</text>
              
              <rect x="400" y="70" width="180" height="30" rx="4" fill="rgba(95,122,104,0.15)" stroke="#5f7a68"/>
              <text x="490" y="90" fill="#5f7a68" fontSize="10" fontFamily="monospace" textAnchor="middle">BlockingQueue 接口</text>
              
              <line x1="300" y1="45" x2="110" y2="70" stroke="#d4c5a9" strokeWidth="1.5"/>
              <line x1="300" y1="45" x2="300" y2="70" stroke="#d4c5a9" strokeWidth="1.5"/>
              <line x1="300" y1="45" x2="490" y2="70" stroke="#d4c5a9" strokeWidth="1.5"/>
              
              <rect x="30" y="130" width="160" height="25" rx="4" fill="#f5f0e8" stroke="#d4c5a9"/>
              <text x="110" y="147" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">ArrayBlockingQueue</text>
              
              <rect x="30" y="165" width="160" height="25" rx="4" fill="#f5f0e8" stroke="#d4c5a9"/>
              <text x="110" y="182" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">LinkedBlockingQueue</text>
              
              <rect x="30" y="200" width="160" height="25" rx="4" fill="#f5f0e8" stroke="#d4c5a9"/>
              <text x="110" y="217" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">PriorityBlockingQueue</text>
              
              <line x1="490" y1="100" x2="110" y2="130" stroke="#5f7a68" strokeWidth="1.5"/>
              <line x1="490" y1="100" x2="110" y2="165" stroke="#5f7a68" strokeWidth="1.5"/>
              <line x1="490" y1="100" x2="110" y2="200" stroke="#5f7a68" strokeWidth="1.5"/>
              
              <rect x="210" y="130" width="180" height="30" rx="4" fill="rgba(120,100,160,0.12)" stroke="#7864a0"/>
              <text x="300" y="150" fill="#7864a0" fontSize="10" fontFamily="monospace" textAnchor="middle">ConcurrentLinkedQueue</text>
              
              <rect x="400" y="130" width="180" height="30" rx="4" fill="rgba(140,100,80,0.12)" stroke="#8c6450"/>
              <text x="490" y="150" fill="#8c6450" fontSize="10" fontFamily="monospace" textAnchor="middle">ConcurrentSkipListMap</text>
              
              <rect x="20" y="250" width="560" height="60" rx="4" fill="rgba(240,230,210,0.5)" stroke="#d4c5a9" strokeDasharray="5,5"/>
              <text x="300" y="270" fill="#6b5e4c" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">核心设计思想</text>
              <text x="300" y="290" fill="#8b7d6b" fontSize="9" fontFamily="monospace" textAnchor="middle">细粒度锁 | CAS 原子操作 | 写时复制 | 分段技术</text>
            </svg>
          </DiagramBlock>

          <SideNote label="为什么需要并发集合？">
            <p className="text-sm text-ink-muted">
              传统同步方式（如 Collections.synchronizedMap）对整个集合加锁，所有线程串行访问，并发度低。并发集合通过更精细的锁策略或无锁算法，允许多个线程同时操作不同部分的数据，显著提升吞吐量。
            </p>
          </SideNote>

          {/* ========== 二、ConcurrentHashMap 深度解析 ========== */}
          <h2 id="concurrent-hashmap" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、ConcurrentHashMap 深度解析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ConcurrentHashMap 是并发集合中最常用的类，它在保证线程安全的同时提供接近 HashMap 的性能。JDK 7 和 JDK 8 的实现策略有显著差异。
          </p>

          {/* 2.1 JDK 7 分段锁机制 */}
          <h3 id="jdk7-segment-lock" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 JDK 7 分段锁机制
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JDK 7 采用<strong className="text-accent">分段锁（Segment）</strong>技术，将数据分成多个段，每个段独立加锁。默认 16 个段，支持最多 16 个线程并发访问不同段。
          </p>

          <Playground 
            language="java"
            filename="ConcurrentHashMap.java (JDK 7)"
            description="JDK 7 ConcurrentHashMap 结构"
            code={`// JDK 7 内部结构示意
public class ConcurrentHashMap<K, V> {
    // 分段数组，默认 16 个 Segment
    final Segment<K,V>[] segments;
    
    static class Segment<K,V> extends ReentrantLock {
        // 每个 Segment 包含一个 HashEntry 数组
        transient volatile HashEntry<K,V>[] table;
        
        // put 操作需要获取 Segment 锁
        V put(K key, int hash, V value, boolean onlyIfAbsent) {
            lock(); // 锁定当前 Segment
            try {
                // ... 执行插入逻辑
            } finally {
                unlock();
            }
        }
    }
}`}
          />

          <Callout type="warning" title="JDK 7 的局限性">
            <ul className="list-disc list-inside space-y-2 text-sm text-ink-muted">
              <li>并发度固定为 Segment 数量（默认 16），无法动态调整</li>
              <li>内存开销大，每个 Segment 都是独立的 ReentrantLock 对象</li>
              <li>扩容时需要锁定整个 Segment，影响性能</li>
            </ul>
          </Callout>

          {/* 2.2 JDK 8 CAS + synchronized */}
          <h3 id="jdk8-cas-sync" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 JDK 8 CAS + synchronized
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JDK 8 彻底重构了实现，抛弃了 Segment，改用<strong className="text-accent">CAS + synchronized</strong>锁定链表或红黑树的头节点，实现了更细粒度的并发控制。
          </p>

          <DiagramBlock title="JDK 8 ConcurrentHashMap 架构">
            <svg className="w-full max-w-[550px] mx-auto block" viewBox="0 0 550 240">
              <rect x="20" y="10" width="510" height="30" rx="4" fill="#ede4d1" stroke="#d4c5a9"/>
              <text x="275" y="30" fill="#6b5e4c" fontSize="11" fontFamily="monospace" textAnchor="middle">Node[] table (数组)</text>
              
              <rect x="20" y="50" width="80" height="30" rx="4" fill="#f5f0e8" stroke="#d4c5a9"/>
              <text x="60" y="70" fill="#a99d8e" fontSize="9" fontFamily="monospace" textAnchor="middle">[0]</text>
              
              <rect x="100" y="50" width="80" height="30" rx="4" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="140" y="70" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">[1]</text>
              <line x1="140" y1="80" x2="140" y2="100" stroke="#b5651d" strokeWidth="1.5"/>
              <rect x="100" y="100" width="80" height="25" rx="4" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="140" y="117" fill="#8b4c14" fontSize="8" fontFamily="monospace" textAnchor="middle">Node A</text>
              <line x1="140" y1="125" x2="140" y2="140" stroke="#b5651d" strokeWidth="1.5"/>
              <rect x="100" y="140" width="80" height="25" rx="4" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="140" y="157" fill="#8b4c14" fontSize="8" fontFamily="monospace" textAnchor="middle">Node B 🔒</text>
              
              <rect x="180" y="50" width="80" height="30" rx="4" fill="#f5f0e8" stroke="#d4c5a9"/>
              <text x="220" y="70" fill="#a99d8e" fontSize="9" fontFamily="monospace" textAnchor="middle">[2]</text>
              
              <rect x="260" y="50" width="80" height="30" rx="4" fill="rgba(160,82,45,0.12)" stroke="#a0522d"/>
              <text x="300" y="70" fill="#a0522d" fontSize="9" fontFamily="monospace" textAnchor="middle">[3]</text>
              <circle cx="300" cy="100" r="12" fill="rgba(160,82,45,0.12)" stroke="#a0522d" strokeWidth="1.5"/>
              <text x="300" y="104" fill="#a0522d" fontSize="8" fontFamily="monospace" textAnchor="middle">8</text>
              <line x1="292" y1="110" x2="280" y2="125" stroke="#a0522d"/>
              <line x1="308" y1="110" x2="320" y2="125" stroke="#a0522d"/>
              <circle cx="270" cy="140" r="12" fill="rgba(95,122,104,0.15)" stroke="#5f7a68" strokeWidth="1.5"/>
              <text x="270" y="144" fill="#5f7a68" fontSize="8" fontFamily="monospace" textAnchor="middle">4 🔒</text>
              <circle cx="330" cy="140" r="12" fill="rgba(95,122,104,0.15)" stroke="#5f7a68" strokeWidth="1.5"/>
              <text x="330" y="144" fill="#5f7a68" fontSize="8" fontFamily="monospace" textAnchor="middle">12</text>
              
              <text x="140" y="185" fill="#8b4c14" fontSize="8" fontFamily="monospace" textAnchor="middle">synchronized(Node A)</text>
              <text x="300" y="185" fill="#a0522d" fontSize="8" fontFamily="monospace" textAnchor="middle">synchronized(树根节点)</text>
              
              <rect x="20" y="200" width="510" height="30" rx="4" fill="rgba(240,230,210,0.5)" stroke="#d4c5a9" strokeDasharray="5,5"/>
              <text x="275" y="220" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">🔒 表示锁定的节点，其他线程可并发访问其他桶</text>
            </svg>
          </DiagramBlock>

          <Playground 
            language="java"
            filename="ConcurrentHashMap.java (JDK 8)"
            description="JDK 8 核心字段"
            code={`public class ConcurrentHashMap<K, V> {
    // 存储数据的数组
    transient volatile Node<K,V>[] table;
    
    // 用于初始化和扩容控制的标记
    private transient volatile int sizeCtl;
    
    // CAS 更新数组元素
    static final <K,V> boolean casTabAt(Node<K,V>[] tab, int i,
                                        Node<K,V> c, Node<K,V> v) {
        return U.compareAndSwapObject(tab, ((long)i << ASHIFT) + ABASE, c, v);
    }
    
    // 获取并设置节点值（配合 synchronized）
    static final <K,V> void setTabAt(Node<K,V>[] tab, int i, Node<K,V> v) {
        U.putObjectVolatile(tab, ((long)i << ASHIFT) + ABASE, v);
    }
}`}
          />

          <SideNote label="JDK 8 的优势">
            <p className="text-sm text-ink-muted">
              • 并发度更高：理论上支持 N 个线程并发访问 N 个不同的桶<br/>
              • 内存占用更少：无需额外的 Segment 对象<br/>
              • 扩容更高效：支持多线程协助扩容
            </p>
          </SideNote>

          {/* 2.3 put 操作流程 */}
          <h3 id="put-flow" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.3 put 操作流程
          </h3>
          
          <InteractiveFlow
            title="ConcurrentHashMap put 流程"
            steps={[
              {
                label: "计算哈希",
                description: "通过 spread() 方法计算 key 的哈希值，减少冲突",
                icon: "🔢"
              },
              {
                label: "初始化检查",
                description: "如果 table 为空，调用 initTable() 初始化",
                icon: "✅"
              },
              {
                label: "CAS 插入空桶",
                description: "如果桶为空，使用 CAS 直接插入新节点",
                icon: "⚡"
              },
              {
                label: "处理扩容",
                description: "如果遇到 forwarding 节点，协助扩容",
                icon: "🔄"
              },
              {
                label: "锁定头节点",
                description: "对链表头或树根节点加 synchronized 锁",
                icon: "🔒"
              },
              {
                label: "遍历插入",
                description: "遍历链表或红黑树，找到插入位置",
                icon: "🔍"
              },
              {
                label: "树化判断",
                description: "链表长度 >= 8 时转换为红黑树",
                icon: "🌳"
              }
            ]}
          />

          {/* 2.4 size() 方法优化 */}
          <h3 id="size-optimization" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.4 size() 方法优化
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ConcurrentHashMap 的 size() 方法需要在高并发下准确统计元素数量，但不能长时间锁定整个表。JDK 8 采用了<strong className="text-accent">分段累加 + 重试机制</strong>。
          </p>

          <Playground 
            language="java"
            filename="ConcurrentHashMap.java"
            description="size() 实现策略"
            code={`public int size() {
    long n = sumCount();
    return ((n < 0L) ? 0 : (n > (long)Integer.MAX_VALUE) 
            ? Integer.MAX_VALUE : (int)n);
}

final long sumCount() {
    CounterCell[] as = counterCells; 
    CounterCell a;
    long sum = baseCount;
    
    // 累加所有 CounterCell 的值
    if (as != null) {
        for (int i = 0; i < as.length; ++i) {
            if ((a = as[i]) != null)
                sum += a.value;
        }
    }
    return sum;
}

// CounterCell 使用 @sun.misc.Contended 避免伪共享
@sun.misc.Contended 
static final class CounterCell {
    volatile long value;
    CounterCell(long x) { value = x; }
}`}
          />

          <Callout type="info" title="CounterCell 机制">
            <p className="text-sm text-ink-muted">
              每次添加或删除元素时，会随机选择一个 CounterCell 进行累加，避免多个线程竞争同一个变量。sumCount() 时将所有 CounterCell 的值相加得到总数。这种设计类似 LongAdder 的原理。
            </p>
          </Callout>

          {/* ========== 三、CopyOnWriteArrayList 原理 ========== */}
          <h2 id="copy-on-write" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、CopyOnWriteArrayList 原理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            CopyOnWriteArrayList 采用<strong className="text-accent">写时复制（Copy-On-Write）</strong>策略，适用于读多写少的场景。每次修改操作都会复制一份新的数组，在副本上执行修改，然后替换引用。
          </p>

          {/* 3.1 写时复制机制 */}
          <h3 id="cow-mechanism" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 写时复制机制
          </h3>

          <DiagramBlock title="CopyOnWriteArrayList 写时复制过程">
            <svg className="w-full max-w-[550px] mx-auto block" viewBox="0 0 550 200">
              <text x="275" y="20" fill="#6b5e4c" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">步骤 1: 读取操作（无锁）</text>
              <rect x="20" y="35" width="120" height="30" rx="4" fill="#f5f0e8" stroke="#d4c5a9"/>
              <text x="80" y="55" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">Thread A: get(0)</text>
              <line x1="80" y1="65" x2="80" y2="85" stroke="#6b5e4c" strokeWidth="1.5"/>
              <rect x="20" y="85" width="120" height="25" rx="4" fill="#ede4d1" stroke="#d4c5a9"/>
              <text x="80" y="102" fill="#6b5e4c" fontSize="8" fontFamily="monospace" textAnchor="middle">[A, B, C]</text>
              <text x="160" y="102" fill="#5f7a68" fontSize="8" fontFamily="monospace" textAnchor="middle">← 引用指向</text>
              
              <text x="275" y="135" fill="#6b5e4c" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">步骤 2: 写入操作（复制+修改）</text>
              <rect x="220" y="150" width="140" height="30" rx="4" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="290" y="170" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">Thread B: add(D)</text>
              <line x1="290" y1="150" x2="290" y2="135" stroke="#b5651d" strokeWidth="1.5"/>
              <rect x="380" y="150" width="120" height="25" rx="4" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="440" y="167" fill="#8b4c14" fontSize="8" fontFamily="monospace" textAnchor="middle">[A, B, C, D]</text>
              <text x="360" y="167" fill="#b5651d" fontSize="8" fontFamily="monospace" textAnchor="middle">新数组 →</text>
              
              <line x1="290" y1="180" x2="440" y2="180" stroke="#b5651d" strokeWidth="1.5" strokeDasharray="5,5"/>
              <text x="365" y="195" fill="#b5651d" fontSize="7" fontFamily="monospace" textAnchor="middle">CAS 替换引用</text>
            </svg>
          </DiagramBlock>

          <Playground 
            language="java"
            filename="CopyOnWriteArrayList.java"
            description="CopyOnWriteArrayList 核心代码"
            code={`public class CopyOnWriteArrayList<E> {
    // volatile 保证可见性
    private transient volatile Object[] array;
    
    public E get(int index) {
        // 读操作无锁，直接访问
        return get(getArray(), index);
    }
    
    public boolean add(E e) {
        final ReentrantLock lock = this.lock;
        lock.lock(); // 写操作需要加锁
        try {
            Object[] elements = getArray();
            int len = elements.length;
            
            // ① 复制新数组
            Object[] newElements = Arrays.copyOf(elements, len + 1);
            
            // ② 在新数组上修改
            newElements[len] = e;
            
            // ③ 替换引用（volatile 写保证可见性）
            setArray(newElements);
            return true;
        } finally {
            lock.unlock();
        }
    }
}`}
          />

          {/* 3.2 适用场景分析 */}
          <h3 id="cow-scenarios" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 适用场景分析
          </h3>

          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border p-2 text-left text-sm font-semibold text-ink">特性</th>
                <th className="border border-border p-2 text-left text-sm font-semibold text-ink">CopyOnWriteArrayList</th>
                <th className="border border-border p-2 text-left text-sm font-semibold text-ink">Collections.synchronizedList</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2 text-sm text-ink-muted">读性能</td>
                <td className="border border-border p-2 text-sm text-ink-muted">⭐⭐⭐⭐⭐ 无锁</td>
                <td className="border border-border p-2 text-sm text-ink-muted">⭐⭐ 需要锁</td>
              </tr>
              <tr className="bg-parchment-soft/30">
                <td className="border border-border p-2 text-sm text-ink-muted">写性能</td>
                <td className="border border-border p-2 text-sm text-ink-muted">⭐ 复制数组，慢</td>
                <td className="border border-border p-2 text-sm text-ink-muted">⭐⭐⭐ 只需加锁</td>
              </tr>
              <tr>
                <td className="border border-border p-2 text-sm text-ink-muted">内存占用</td>
                <td className="border border-border p-2 text-sm text-ink-muted">高（写时双倍）</td>
                <td className="border border-border p-2 text-sm text-ink-muted">低</td>
              </tr>
              <tr className="bg-parchment-soft/30">
                <td className="border border-border p-2 text-sm text-ink-muted">迭代器</td>
                <td className="border border-border p-2 text-sm text-ink-muted">弱一致性（不抛异常）</td>
                <td className="border border-border p-2 text-sm text-ink-muted">强一致性（需手动同步）</td>
              </tr>
            </tbody>
          </table>

          <Callout type="tip" title="最佳实践">
            <p className="text-sm text-ink-muted">
              <strong>适用场景：</strong>监听器列表、配置信息缓存、白名单/黑名单等读远多于写的场景。<br/>
              <strong>不适用场景：</strong>频繁写入、大数据量（复制成本高）、要求实时一致性的场景。
            </p>
          </Callout>

          {/* ========== 四、BlockingQueue 阻塞队列 ========== */}
          <h2 id="blocking-queue" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、BlockingQueue 阻塞队列
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            BlockingQueue 是支持两个附加操作的 Queue：当队列为空时，获取元素的线程会等待队列变为非空；当队列满时，存储元素的线程会等待队列可用。它是<strong className="text-accent">生产者-消费者模式</strong>的核心组件。
          </p>

          {/* 4.1 ArrayBlockingQueue */}
          <h3 id="array-blocking-queue" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 ArrayBlockingQueue
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            基于数组的有界阻塞队列，使用<strong className="text-accent">单个 ReentrantLock + 两个 Condition</strong>（notEmpty、notFull）实现阻塞和唤醒。
          </p>

          <Playground 
            language="java"
            filename="ArrayBlockingQueue.java"
            description="ArrayBlockingQueue 核心实现"
            code={`public class ArrayBlockingQueue<E> {
    final Object[] items;
    final ReentrantLock lock;
    private final Condition notEmpty;  // 队列空时等待
    private final Condition notFull;   // 队列满时等待
    
    public void put(E e) throws InterruptedException {
        checkNotNull(e);
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            // 队列满时等待
            while (count == items.length)
                notFull.await();
            enqueue(e);
        } finally {
            lock.unlock();
        }
    }
    
    public E take() throws InterruptedException {
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            // 队列空时等待
            while (count == 0)
                notEmpty.await();
            return dequeue();
        } finally {
            lock.unlock();
        }
    }
    
    private void enqueue(E x) {
        items[putIndex] = x;
        if (++putIndex == items.length) putIndex = 0;
        count++;
        notEmpty.signal(); // 唤醒一个等待的消费者
    }
}`}
          />

          {/* 4.2 LinkedBlockingQueue */}
          <h3 id="linked-blocking-queue" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 LinkedBlockingQueue
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            基于链表的阻塞队列，可选有界或无界（默认 Integer.MAX_VALUE）。使用<strong className="text-accent">两把锁</strong>（takeLock、putLock）分别保护入队和出队操作，实现更高的并发度。
          </p>

          <SideNote label="两把锁的优势">
            <p className="text-sm text-ink-muted">
              ArrayBlockingQueue 只有一把锁，入队和出队不能并发。LinkedBlockingQueue 使用两把独立的锁，生产者和消费者可以同时操作，吞吐量更高。
            </p>
          </SideNote>

          {/* 4.3 生产者-消费者模式 */}
          <h3 id="producer-consumer" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.3 生产者-消费者模式
          </h3>

          <Playground 
            language="java"
            filename="ProducerConsumerDemo.java"
            description="使用 BlockingQueue 实现生产者-消费者"
            code={`import java.util.concurrent.*;

public class ProducerConsumerDemo {
    private static final int QUEUE_CAPACITY = 10;
    private static final BlockingQueue<String> queue = 
        new ArrayBlockingQueue<>(QUEUE_CAPACITY);
    
    // 生产者
    static class Producer implements Runnable {
        public void run() {
            try {
                for (int i = 0; i < 100; i++) {
                    String message = "Message-" + i;
                    queue.put(message); // 队列满时阻塞
                    System.out.println("Produced: " + message);
                    Thread.sleep(100);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
    
    // 消费者
    static class Consumer implements Runnable {
        public void run() {
            try {
                while (true) {
                    String message = queue.take(); // 队列空时阻塞
                    System.out.println("Consumed: " + message);
                    Thread.sleep(200);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
    
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        executor.execute(new Producer());
        executor.execute(new Consumer());
        executor.execute(new Consumer());
        executor.shutdown();
    }
}`}
          />

          <ContextSwitcher
            simpleContent={
              <div className="space-y-2 text-sm text-ink-muted">
                <p><strong>抛出异常：</strong>add/remove/element，队列满/空时抛异常</p>
                <p><strong>返回特殊值：</strong>offer/poll/peek，失败返回 false/null</p>
              </div>
            }
            hardcoreContent={
              <div className="space-y-2 text-sm text-ink-muted">
                <p><strong>阻塞等待：</strong>put/take，队列满/空时一直阻塞</p>
                <p><strong>超时退出：</strong>offer(e,time,unit)/poll(time,unit)，超时返回 false/null</p>
              </div>
            }
          />

          {/* ========== 五、ConcurrentLinkedQueue 无锁队列 ========== */}
          <h2 id="concurrent-linked-queue" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、ConcurrentLinkedQueue 无锁队列
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ConcurrentLinkedQueue 是基于链表的<strong className="text-accent">无锁非阻塞</strong>线程安全队列，使用 CAS 算法实现并发控制，适用于高并发场景。
          </p>

          {/* 5.1 CAS 算法实现 */}
          <h3 id="cas-algorithm" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 CAS 算法实现
          </h3>

          <Playground 
            language="java"
            filename="ConcurrentLinkedQueue.java"
            description="ConcurrentLinkedQueue offer 操作"
            code={`public class ConcurrentLinkedQueue<E> {
    private transient volatile Node<E> head;
    private transient volatile Node<E> tail;
    
    public boolean offer(E e) {
        checkNotNull(e);
        final Node<E> newNode = new Node<E>(e);
        
        for (Node<E> t = tail, p = t;;) {
            Node<E> q = p.next;
            if (q == null) {
                // p 是尾节点，尝试 CAS 设置 next
                if (p.casNext(null, newNode)) {
                    // CAS 成功，更新 tail（可能延迟更新）
                    if (p != t) // hop two nodes at a time
                        casTail(t, newNode);
                    return true;
                }
                // CAS 失败，说明其他线程已修改，重试
            }
            else if (p == q)
                // p 指向自己，说明已被删除，重新从 head 开始
                p = (t != (t = tail)) ? t : head;
            else
                // p 不是尾节点，继续向后查找
                p = (p != t && t != (t = tail)) ? t : q;
        }
    }
}`}
          />

          <Callout type="warning" title="tail 延迟更新">
            <p className="text-sm text-ink-muted">
              ConcurrentLinkedQueue 的 tail 不一定总是指向真正的尾节点，可能滞后 1-2 个节点。这是为了减少 CAS 竞争次数而做的优化，称为"HOPS"策略。
            </p>
          </Callout>

          {/* 5.2 与 BlockingQueue 对比 */}
          <h3 id="queue-comparison" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 与 BlockingQueue 对比
          </h3>

          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border p-2 text-left text-sm font-semibold text-ink">特性</th>
                <th className="border border-border p-2 text-left text-sm font-semibold text-ink">ConcurrentLinkedQueue</th>
                <th className="border border-border p-2 text-left text-sm font-semibold text-ink">LinkedBlockingQueue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2 text-sm text-ink-muted">实现方式</td>
                <td className="border border-border p-2 text-sm text-ink-muted">CAS 无锁</td>
                <td className="border border-border p-2 text-sm text-ink-muted">ReentrantLock</td>
              </tr>
              <tr className="bg-parchment-soft/30">
                <td className="border border-border p-2 text-sm text-ink-muted">阻塞能力</td>
                <td className="border border-border p-2 text-sm text-ink-muted">❌ 不支持</td>
                <td className="border border-border p-2 text-sm text-ink-muted">✅ 支持</td>
              </tr>
              <tr>
                <td className="border border-border p-2 text-sm text-ink-muted">容量限制</td>
                <td className="border border-border p-2 text-sm text-ink-muted">无界</td>
                <td className="border border-border p-2 text-sm text-ink-muted">可选有界</td>
              </tr>
              <tr className="bg-parchment-soft/30">
                <td className="border border-border p-2 text-sm text-ink-muted">性能特点</td>
                <td className="border border-border p-2 text-sm text-ink-muted">高并发下更好</td>
                <td className="border border-border p-2 text-sm text-ink-muted">中等并发稳定</td>
              </tr>
              <tr>
                <td className="border border-border p-2 text-sm text-ink-muted">适用场景</td>
                <td className="border border-border p-2 text-sm text-ink-muted">不需要阻塞的高并发</td>
                <td className="border border-border p-2 text-sm text-ink-muted">生产者-消费者</td>
              </tr>
            </tbody>
          </table>

          {/* ========== 六、并发集合类选型对比 ========== */}
          <h2 id="selection-guide" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、并发集合类选型对比
          </h2>

          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border p-2 text-left text-sm font-semibold text-ink">集合类</th>
                <th className="border border-border p-2 text-left text-sm font-semibold text-ink">底层机制</th>
                <th className="border border-border p-2 text-left text-sm font-semibold text-ink">并发度</th>
                <th className="border border-border p-2 text-left text-sm font-semibold text-ink">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2 text-sm text-ink-muted font-mono">ConcurrentHashMap</td>
                <td className="border border-border p-2 text-sm text-ink-muted">CAS + synchronized</td>
                <td className="border border-border p-2 text-sm text-ink-muted">高（桶级别）</td>
                <td className="border border-border p-2 text-sm text-ink-muted">高并发键值对存储</td>
              </tr>
              <tr className="bg-parchment-soft/30">
                <td className="border border-border p-2 text-sm text-ink-muted font-mono">CopyOnWriteArrayList</td>
                <td className="border border-border p-2 text-sm text-ink-muted">写时复制</td>
                <td className="border border-border p-2 text-sm text-ink-muted">读极高/写极低</td>
                <td className="border border-border p-2 text-sm text-ink-muted">读多写少（监听器列表）</td>
              </tr>
              <tr>
                <td className="border border-border p-2 text-sm text-ink-muted font-mono">ArrayBlockingQueue</td>
                <td className="border border-border p-2 text-sm text-ink-muted">单锁 + Condition</td>
                <td className="border border-border p-2 text-sm text-ink-muted">中</td>
                <td className="border border-border p-2 text-sm text-ink-muted">有界缓冲、生产者-消费者</td>
              </tr>
              <tr className="bg-parchment-soft/30">
                <td className="border border-border p-2 text-sm text-ink-muted font-mono">LinkedBlockingQueue</td>
                <td className="border border-border p-2 text-sm text-ink-muted">双锁</td>
                <td className="border border-border p-2 text-sm text-ink-muted">中高</td>
                <td className="border border-border p-2 text-sm text-ink-muted">高吞吐生产者-消费者</td>
              </tr>
              <tr>
                <td className="border border-border p-2 text-sm text-ink-muted font-mono">ConcurrentLinkedQueue</td>
                <td className="border border-border p-2 text-sm text-ink-muted">CAS 无锁</td>
                <td className="border border-border p-2 text-sm text-ink-muted">极高</td>
                <td className="border border-border p-2 text-sm text-ink-muted">高并发无需阻塞</td>
              </tr>
            </tbody>
          </table>

          {/* ========== 七、性能优化技巧 ========== */}
          <h2 id="performance-tips" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、性能优化技巧
          </h2>

          <Callout type="tip" title="ConcurrentHashMap 初始化容量">
            <p className="text-sm text-ink-muted">
              <strong>问题：</strong>频繁扩容会影响性能。<br/>
              <strong>优化：</strong>预估数据量，初始化时指定合适容量：<code className="font-mono text-xs bg-parchment-warm px-1 rounded">{"new ConcurrentHashMap<>(expectedSize / 0.75f + 1)"}</code>
            </p>
          </Callout>

          <Callout type="tip" title="避免过度使用 CopyOnWriteArrayList">
            <p className="text-sm text-ink-muted">
              <strong>陷阱：</strong>大数据量的 CopyOnWriteArrayList 每次写入都复制整个数组，导致 GC 压力大。<br/>
              <strong>建议：</strong>数据量超过 1000 或写入频率较高时，考虑使用 ReadWriteLock + ArrayList。
            </p>
          </Callout>

          <Callout type="tip" title="选择合适的 BlockingQueue">
            <p className="text-sm text-ink-muted">
              • 需要<strong>有界</strong>防止内存溢出 → ArrayBlockingQueue<br/>
              • 追求<strong>高吞吐</strong> → LinkedBlockingQueue（双锁）<br/>
              • 需要<strong>优先级</strong> → PriorityBlockingQueue<br/>
              • 需要<strong>延迟任务</strong> → DelayedWorkQueue（ScheduledThreadPoolExecutor 内部使用）
            </p>
          </Callout>

          {/* ========== 八、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区 1：ConcurrentHashMap 完全线程安全">
            <p className="text-sm text-ink-muted">
              <strong>错误认知：</strong>ConcurrentHashMap 的所有操作都是原子的。<br/>
              <strong>真相：</strong>复合操作（如"检查后执行"）仍需外部同步：
              <pre className="mt-2 bg-parchment-deep p-2 rounded text-xs overflow-x-auto">
{`// ❌ 不安全：check-then-act 不是原子操作
if (!map.containsKey(key)) {
    map.put(key, value);
}

// ✅ 安全：使用原子方法
map.putIfAbsent(key, value);`}
              </pre>
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：CopyOnWriteArrayList 适合所有读多写少场景">
            <p className="text-sm text-ink-muted">
              <strong>错误认知：</strong>只要读多写少就用 CopyOnWriteArrayList。<br/>
              <strong>真相：</strong>数据量大时复制成本极高，且迭代器是快照视图，无法看到最新数据。应考虑 ReadWriteLock。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：BlockingQueue 的 put/take 不会中断">
            <p className="text-sm text-ink-muted">
              <strong>错误认知：</strong>阻塞操作无法被中断。<br/>
              <strong>真相：</strong>put/take 都会响应中断并抛出 InterruptedException，必须正确处理：
              <pre className="mt-2 bg-parchment-deep p-2 rounded text-xs overflow-x-auto">
{`try {
    queue.put(item);
} catch (InterruptedException e) {
    Thread.currentThread().interrupt(); // 恢复中断状态
    break; // 退出循环
}`}
              </pre>
            </p>
          </Callout>

          <Callout type="danger" title="误区 4：ConcurrentLinkedQueue 可以替代 BlockingQueue">
            <p className="text-sm text-ink-muted">
              <strong>错误认知：</strong>ConcurrentLinkedQueue 性能更好，应该全面替代 BlockingQueue。<br/>
              <strong>真相：</strong>ConcurrentLinkedQueue 不支持阻塞，无法实现背压（backpressure），可能导致生产者过快造成内存溢出。
            </p>
          </Callout>

          <Callout type="danger" title="误区 5：size() 方法是精确的">
            <p className="text-sm text-ink-muted">
              <strong>错误认知：</strong>ConcurrentHashMap.size() 返回精确的元素数量。<br/>
              <strong>真相：</strong>在高并发下，size() 可能返回近似值。如果需要精确计数，应使用 LongAdder 手动维护。
            </p>
          </Callout>

          {/* ========== 九、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "ConcurrentHashMap 在 JDK 7 和 JDK 8 中的实现有什么区别？",
                answer: "JDK 7 使用 Segment 分段锁，默认 16 个段，每个段是一把 ReentrantLock。JDK 8 抛弃 Segment，改用 CAS + synchronized 锁定链表/红黑树头节点，实现更细粒度的并发控制。JDK 8 的优势：并发度更高（理论上是桶的数量）、内存占用更少、支持多线程协助扩容。"
              },
              {
                question: "ConcurrentHashMap 的 size() 方法如何保证高并发下的准确性？",
                answer: "JDK 8 使用 CounterCell 数组，每次修改操作随机选择一个 CounterCell 进行累加（类似 LongAdder），避免竞争。size() 时遍历所有 CounterCell 求和。这种方式牺牲了一定的实时性换取高性能，高并发下可能返回近似值。"
              },
              {
                question: "CopyOnWriteArrayList 的优缺点是什么？适用什么场景？",
                answer: "优点：读操作无锁，性能极高；迭代器不会抛 ConcurrentModificationException。缺点：写操作需要复制整个数组，内存开销大，数据量大时性能差；迭代器是快照视图，看不到最新数据。适用场景：监听器列表、配置缓存等读远多于写且数据量不大的场景。"
              },
              {
                question: "ArrayBlockingQueue 和 LinkedBlockingQueue 的区别？",
                answer: "ArrayBlockingQueue：基于数组，有界，使用一把锁，入队出队不能并发，内存连续性能好。LinkedBlockingQueue：基于链表，可选有界（默认 Integer.MAX_VALUE），使用两把锁（takeLock/putLock），入队出队可并发，吞吐量更高但内存开销大。选择建议：需要严格限制容量用 ArrayBlockingQueue，追求高吞吐用 LinkedBlockingQueue。"
              },
              {
                question: "ConcurrentLinkedQueue 是如何实现线程安全的？",
                answer: "使用 CAS（Compare-And-Swap）原子操作实现无锁并发。核心思想：入队时通过 CAS 设置尾节点的 next 指针，失败则重试；tail 指针可能延迟更新（HOPS 策略）以减少 CAS 竞争。优势是无锁高并发，劣势是不支持阻塞操作，无法实现背压。"
              },
              {
                question: "什么是伪共享（False Sharing）？ConcurrentHashMap 如何解决？",
                answer: "伪共享：多个线程修改同一缓存行上的不同变量，导致缓存行频繁失效，性能下降。ConcurrentHashMap 的 CounterCell 使用 @sun.misc.Contended 注解填充缓存行，确保每个 CounterCell 独占一个缓存行，避免伪共享。Java 8 还可通过 -XX:+EnableContended 启用。"
              },
              {
                question: "如何实现一个线程安全的 LRU Cache？",
                answer: "方案 1：使用 LinkedHashMap + ReentrantReadWriteLock，读锁获取，写锁更新。方案 2：使用 ConcurrentHashMap + 双向链表 + 细粒度锁，类似 JDK 8 LinkedHashMap 的内部实现。方案 3（推荐）：直接使用 Guava 的 CacheBuilder 或 Caffeine，它们已经优化了并发性能和淘汰策略。"
              },
              {
                question: "BlockingQueue 的四种操作方法有什么区别？",
                answer: "① 抛出异常：add/remove/element，队列满/空时抛异常。② 返回特殊值：offer/poll/peek，失败返回 false/null。③ 阻塞等待：put/take，队列满/空时一直阻塞。④ 超时退出：offer(e,time,unit)/poll(time,unit)，超时返回 false/null。生产环境推荐使用阻塞或超时方法，避免忙等待。"
              }
            ]}
          />

          {/* ========== 十、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="border border-border-light rounded-paper-md p-4 bg-parchment-soft/30">
              <h4 className="font-semibold text-ink mb-2 text-sm">前置知识</h4>
              <ul className="space-y-1 text-sm text-ink-muted">
                <li>• <a href="/docs/02-collections/hashmap-deep-dive" className="text-accent hover:underline">HashMap 深度剖析</a></li>
                <li>• 多线程基础（synchronized、volatile）</li>
                <li>• CAS 原子操作原理</li>
              </ul>
            </div>
            
            <div className="border border-border-light rounded-paper-md p-4 bg-parchment-soft/30">
              <h4 className="font-semibold text-ink mb-2 text-sm">延伸学习</h4>
              <ul className="space-y-1 text-sm text-ink-muted">
                <li>• 线程池与任务调度</li>
                <li>• AQS 抽象队列同步器</li>
                <li>• 分布式缓存（Redis）</li>
              </ul>
            </div>
          </div>

          <Callout type="info" title="实战建议">
            <p className="text-sm text-ink-muted">
              在实际项目中，优先使用 java.util.concurrent 包下的并发集合，而非手动同步。根据读写比例、是否需要阻塞、数据量大小等因素选择合适的集合类。记住：<strong>没有最好的集合，只有最适合场景的集合。</strong>
            </p>
          </Callout>

          {/* ========== 文章导航 ========== */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      {/* SmartTOC 直接渲染，不用 aside 包裹 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
