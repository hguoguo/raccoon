import{j as e,g as l}from"./index-hyqxTCwJ.js";import{K as d}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{I as o}from"./InteractiveFlow-GAP1pk49.js";import{S as n}from"./SideNote-BKvanovA.js";import{C as a}from"./ContextSwitcher-Cjd-h5IL.js";import{C as t,A as c,S as m}from"./ArticleNav-DhfiS38Y.js";import{D as i}from"./DiagramBlock-CLaKE9_7.js";import{I as x}from"./InterviewSection-BBNdwyyN.js";const u=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、并发集合类概述",level:2},{id:"concurrent-hashmap",text:"二、ConcurrentHashMap 深度解析",level:2},{id:"jdk7-segment-lock",text:"2.1 JDK 7 分段锁机制",level:3},{id:"jdk8-cas-sync",text:"2.2 JDK 8 CAS + synchronized",level:3},{id:"put-flow",text:"2.3 put 操作流程",level:3},{id:"size-optimization",text:"2.4 size() 方法优化",level:3},{id:"copy-on-write",text:"三、CopyOnWriteArrayList 原理",level:2},{id:"cow-mechanism",text:"3.1 写时复制机制",level:3},{id:"cow-scenarios",text:"3.2 适用场景分析",level:3},{id:"blocking-queue",text:"四、BlockingQueue 阻塞队列",level:2},{id:"array-blocking-queue",text:"4.1 ArrayBlockingQueue",level:3},{id:"linked-blocking-queue",text:"4.2 LinkedBlockingQueue",level:3},{id:"producer-consumer",text:"4.3 生产者-消费者模式",level:3},{id:"concurrent-linked-queue",text:"五、ConcurrentLinkedQueue 无锁队列",level:2},{id:"cas-algorithm",text:"5.1 CAS 算法实现",level:3},{id:"queue-comparison",text:"5.2 与 BlockingQueue 对比",level:3},{id:"selection-guide",text:"六、并发集合类选型对比",level:2},{id:"performance-tips",text:"七、性能优化技巧",level:2},{id:"misconceptions",text:"八、常见误区",level:2},{id:"interview",text:"九、面试真题",level:2},{id:"related",text:"十、知识关联",level:2}];function C({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(d,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["并发集合类是 Java 提供的",e.jsx("strong",{className:"text-accent",children:"线程安全"}),"的集合数据结构，通过细粒度锁、CAS 原子操作、写时复制等机制，在保证数据一致性的同时最大化并发性能，避免传统同步集合的性能瓶颈。"]})}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、并发集合类概述"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"在多线程环境下，传统的 HashMap、ArrayList 等集合类不是线程安全的，直接使用会导致数据不一致或异常。Java 提供了多种解决方案："}),e.jsx(i,{title:"并发集合类家族图谱",children:`graph TD
              JUC["java.util.concurrent"] --> CHM["ConcurrentHashMap"]
              JUC --> COW["CopyOnWriteArrayList"]
              JUC --> BQ["BlockingQueue 接口"]
              BQ --> ABQ["ArrayBlockingQueue"]
              BQ --> LBQ["LinkedBlockingQueue"]
              BQ --> PBQ["PriorityBlockingQueue"]
              JUC --> CLQ["ConcurrentLinkedQueue"]
              JUC --> CSLM["ConcurrentSkipListMap"]
              JUC --> DESIGN["核心设计思想<br/>细粒度锁 | CAS | 写时复制 | 分段技术"]
              style JUC fill:#ede4d1,stroke:#d4c5a9
              style CHM fill:#b5651d25,stroke:#b5651d
              style COW fill:#a0522d20,stroke:#a0522d
              style BQ fill:#5f7a6825,stroke:#5f7a68
              style ABQ fill:#f5f0e8,stroke:#d4c5a9
              style LBQ fill:#f5f0e8,stroke:#d4c5a9
              style PBQ fill:#f5f0e8,stroke:#d4c5a9
              style CLQ fill:#7864a020,stroke:#7864a0
              style CSLM fill:#8c645020,stroke:#8c6450
              style DESIGN fill:#f0e6d280,stroke:#d4c5a9,stroke-dasharray: 5 5
            `}),e.jsx(n,{label:"为什么需要并发集合？",children:e.jsx("p",{className:"text-sm text-ink-muted",children:"传统同步方式（如 Collections.synchronizedMap）对整个集合加锁，所有线程串行访问，并发度低。并发集合通过更精细的锁策略或无锁算法，允许多个线程同时操作不同部分的数据，显著提升吞吐量。"})}),e.jsx("h2",{id:"concurrent-hashmap",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、ConcurrentHashMap 深度解析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"ConcurrentHashMap 是并发集合中最常用的类，它在保证线程安全的同时提供接近 HashMap 的性能。JDK 7 和 JDK 8 的实现策略有显著差异。"}),e.jsx("h3",{id:"jdk7-segment-lock",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.1 JDK 7 分段锁机制"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["JDK 7 采用",e.jsx("strong",{className:"text-accent",children:"分段锁（Segment）"}),"技术，将数据分成多个段，每个段独立加锁。默认 16 个段，支持最多 16 个线程并发访问不同段。"]}),e.jsx(r,{language:"java",filename:"ConcurrentHashMap.java (JDK 7)",description:"JDK 7 ConcurrentHashMap 结构",code:`// JDK 7 内部结构示意
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
}`}),e.jsx(t,{type:"warning",title:"JDK 7 的局限性",children:e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-sm text-ink-muted",children:[e.jsx("li",{children:"并发度固定为 Segment 数量（默认 16），无法动态调整"}),e.jsx("li",{children:"内存开销大，每个 Segment 都是独立的 ReentrantLock 对象"}),e.jsx("li",{children:"扩容时需要锁定整个 Segment，影响性能"})]})}),e.jsx("h3",{id:"jdk8-cas-sync",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.2 JDK 8 CAS + synchronized"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["JDK 8 彻底重构了实现，抛弃了 Segment，改用",e.jsx("strong",{className:"text-accent",children:"CAS + synchronized"}),"锁定链表或红黑树的头节点，实现了更细粒度的并发控制。"]}),e.jsx(i,{title:"JDK 8 ConcurrentHashMap 架构",children:`graph TD
              TABLE2["Node[] table 数组"]
              TABLE2 --> S0["[0] 空"]
              TABLE2 --> S1["[1] 链表"]
              TABLE2 --> S2["[2] 空"]
              TABLE2 --> S3["[3] 红黑树"]
              S1 --> NA["Node A"]
              NA --> NB["Node B 🔒"]
              S3 --> TN["8"]
              TN --> TL["4 🔒"]
              TN --> TR["12"]
              NB -.-> |"synchronized(Node A)"| NOTE2["其他线程可并发访问其他桶"]
              TL -.-> |"synchronized(树根节点)"| NOTE3["锁粒度：链表头或树根"]
              style TABLE2 fill:#ede4d1,stroke:#d4c5a9
              style S0 fill:#f5f0e8,stroke:#d4c5a9
              style S1 fill:#b5651d25,stroke:#b5651d
              style S2 fill:#f5f0e8,stroke:#d4c5a9
              style S3 fill:#a0522d20,stroke:#a0522d
              style NA fill:#b5651d25,stroke:#b5651d
              style NB fill:#b5651d25,stroke:#b5651d,stroke-width:2px
              style TN fill:#a0522d20,stroke:#a0522d
              style TL fill:#5f7a6825,stroke:#5f7a68,stroke-width:2px
              style TR fill:#5f7a6825,stroke:#5f7a68
            `}),e.jsx(r,{language:"java",filename:"ConcurrentHashMap.java (JDK 8)",description:"JDK 8 核心字段",code:`public class ConcurrentHashMap<K, V> {
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
}`}),e.jsx(n,{label:"JDK 8 的优势",children:e.jsxs("p",{className:"text-sm text-ink-muted",children:["• 并发度更高：理论上支持 N 个线程并发访问 N 个不同的桶",e.jsx("br",{}),"• 内存占用更少：无需额外的 Segment 对象",e.jsx("br",{}),"• 扩容更高效：支持多线程协助扩容"]})}),e.jsx("h3",{id:"put-flow",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.3 put 操作流程"}),e.jsx(o,{title:"ConcurrentHashMap put 流程",steps:[{label:"计算哈希",description:"通过 spread() 方法计算 key 的哈希值，减少冲突",icon:"🔢"},{label:"初始化检查",description:"如果 table 为空，调用 initTable() 初始化",icon:"✅"},{label:"CAS 插入空桶",description:"如果桶为空，使用 CAS 直接插入新节点",icon:"⚡"},{label:"处理扩容",description:"如果遇到 forwarding 节点，协助扩容",icon:"🔄"},{label:"锁定头节点",description:"对链表头或树根节点加 synchronized 锁",icon:"🔒"},{label:"遍历插入",description:"遍历链表或红黑树，找到插入位置",icon:"🔍"},{label:"树化判断",description:"链表长度 >= 8 时转换为红黑树",icon:"🌳"}]}),e.jsx("h3",{id:"size-optimization",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.4 size() 方法优化"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["ConcurrentHashMap 的 size() 方法需要在高并发下准确统计元素数量，但不能长时间锁定整个表。JDK 8 采用了",e.jsx("strong",{className:"text-accent",children:"分段累加 + 重试机制"}),"。"]}),e.jsx(r,{language:"java",filename:"ConcurrentHashMap.java",description:"size() 实现策略",code:`public int size() {
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
}`}),e.jsx(t,{type:"info",title:"CounterCell 机制",children:e.jsx("p",{className:"text-sm text-ink-muted",children:"每次添加或删除元素时，会随机选择一个 CounterCell 进行累加，避免多个线程竞争同一个变量。sumCount() 时将所有 CounterCell 的值相加得到总数。这种设计类似 LongAdder 的原理。"})}),e.jsx("h2",{id:"copy-on-write",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、CopyOnWriteArrayList 原理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["CopyOnWriteArrayList 采用",e.jsx("strong",{className:"text-accent",children:"写时复制（Copy-On-Write）"}),"策略，适用于读多写少的场景。每次修改操作都会复制一份新的数组，在副本上执行修改，然后替换引用。"]}),e.jsx("h3",{id:"cow-mechanism",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 写时复制机制"}),e.jsx(i,{title:"CopyOnWriteArrayList 写时复制过程",children:`graph TD
              subgraph 读取操作无锁
                TA["Thread A: get(0)"] --> ARR1["[A, B, C]"]
              end
              subgraph 写入操作复制+修改
                TB["Thread B: add(D)"] --> NEWARR["新数组 [A, B, C, D]"]
              end
              ARR1 -.-> |"引用指向"| NEWARR
              NEWARR -.-> |"CAS 替换引用"| FINAL["最终引用指向新数组"]
              style TA fill:#f5f0e8,stroke:#d4c5a9
              style ARR1 fill:#ede4d1,stroke:#d4c5a9
              style TB fill:#b5651d25,stroke:#b5651d
              style NEWARR fill:#b5651d25,stroke:#b5651d
              style FINAL fill:#f0e6d280,stroke:#d4c5a9,stroke-dasharray: 5 5
            `}),e.jsx(r,{language:"java",filename:"CopyOnWriteArrayList.java",description:"CopyOnWriteArrayList 核心代码",code:`public class CopyOnWriteArrayList<E> {
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
}`}),e.jsx("h3",{id:"cow-scenarios",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 适用场景分析"}),e.jsxs("table",{className:"w-full border-collapse mb-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border p-2 text-left text-sm font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-border p-2 text-left text-sm font-semibold text-ink",children:"CopyOnWriteArrayList"}),e.jsx("th",{className:"border border-border p-2 text-left text-sm font-semibold text-ink",children:"Collections.synchronizedList"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"读性能"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"⭐⭐⭐⭐⭐ 无锁"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"⭐⭐ 需要锁"})]}),e.jsxs("tr",{className:"bg-parchment-soft/30",children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"写性能"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"⭐ 复制数组，慢"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"⭐⭐⭐ 只需加锁"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"内存占用"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"高（写时双倍）"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"低"})]}),e.jsxs("tr",{className:"bg-parchment-soft/30",children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"迭代器"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"弱一致性（不抛异常）"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"强一致性（需手动同步）"})]})]})]}),e.jsx(t,{type:"tip",title:"最佳实践",children:e.jsxs("p",{className:"text-sm text-ink-muted",children:[e.jsx("strong",{children:"适用场景："}),"监听器列表、配置信息缓存、白名单/黑名单等读远多于写的场景。",e.jsx("br",{}),e.jsx("strong",{children:"不适用场景："}),"频繁写入、大数据量（复制成本高）、要求实时一致性的场景。"]})}),e.jsx("h2",{id:"blocking-queue",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、BlockingQueue 阻塞队列"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["BlockingQueue 是支持两个附加操作的 Queue：当队列为空时，获取元素的线程会等待队列变为非空；当队列满时，存储元素的线程会等待队列可用。它是",e.jsx("strong",{className:"text-accent",children:"生产者-消费者模式"}),"的核心组件。"]}),e.jsx("h3",{id:"array-blocking-queue",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 ArrayBlockingQueue"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["基于数组的有界阻塞队列，使用",e.jsx("strong",{className:"text-accent",children:"单个 ReentrantLock + 两个 Condition"}),"（notEmpty、notFull）实现阻塞和唤醒。"]}),e.jsx(r,{language:"java",filename:"ArrayBlockingQueue.java",description:"ArrayBlockingQueue 核心实现",code:`public class ArrayBlockingQueue<E> {
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
}`}),e.jsx("h3",{id:"linked-blocking-queue",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.2 LinkedBlockingQueue"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["基于链表的阻塞队列，可选有界或无界（默认 Integer.MAX_VALUE）。使用",e.jsx("strong",{className:"text-accent",children:"两把锁"}),"（takeLock、putLock）分别保护入队和出队操作，实现更高的并发度。"]}),e.jsx(n,{label:"两把锁的优势",children:e.jsx("p",{className:"text-sm text-ink-muted",children:"ArrayBlockingQueue 只有一把锁，入队和出队不能并发。LinkedBlockingQueue 使用两把独立的锁，生产者和消费者可以同时操作，吞吐量更高。"})}),e.jsx("h3",{id:"producer-consumer",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.3 生产者-消费者模式"}),e.jsx(r,{language:"java",filename:"ProducerConsumerDemo.java",description:"使用 BlockingQueue 实现生产者-消费者",code:`import java.util.concurrent.*;

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
}`}),e.jsx(a,{simpleContent:e.jsxs("div",{className:"space-y-2 text-sm text-ink-muted",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"抛出异常："}),"add/remove/element，队列满/空时抛异常"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"返回特殊值："}),"offer/poll/peek，失败返回 false/null"]})]}),hardcoreContent:e.jsxs("div",{className:"space-y-2 text-sm text-ink-muted",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"阻塞等待："}),"put/take，队列满/空时一直阻塞"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"超时退出："}),"offer(e,time,unit)/poll(time,unit)，超时返回 false/null"]})]})}),e.jsx("h2",{id:"concurrent-linked-queue",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、ConcurrentLinkedQueue 无锁队列"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["ConcurrentLinkedQueue 是基于链表的",e.jsx("strong",{className:"text-accent",children:"无锁非阻塞"}),"线程安全队列，使用 CAS 算法实现并发控制，适用于高并发场景。"]}),e.jsx("h3",{id:"cas-algorithm",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.1 CAS 算法实现"}),e.jsx(r,{language:"java",filename:"ConcurrentLinkedQueue.java",description:"ConcurrentLinkedQueue offer 操作",code:`public class ConcurrentLinkedQueue<E> {
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
}`}),e.jsx(t,{type:"warning",title:"tail 延迟更新",children:e.jsx("p",{className:"text-sm text-ink-muted",children:'ConcurrentLinkedQueue 的 tail 不一定总是指向真正的尾节点，可能滞后 1-2 个节点。这是为了减少 CAS 竞争次数而做的优化，称为"HOPS"策略。'})}),e.jsx("h3",{id:"queue-comparison",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.2 与 BlockingQueue 对比"}),e.jsxs("table",{className:"w-full border-collapse mb-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border p-2 text-left text-sm font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-border p-2 text-left text-sm font-semibold text-ink",children:"ConcurrentLinkedQueue"}),e.jsx("th",{className:"border border-border p-2 text-left text-sm font-semibold text-ink",children:"LinkedBlockingQueue"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"实现方式"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"CAS 无锁"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"ReentrantLock"})]}),e.jsxs("tr",{className:"bg-parchment-soft/30",children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"阻塞能力"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"❌ 不支持"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"✅ 支持"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"容量限制"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"无界"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"可选有界"})]}),e.jsxs("tr",{className:"bg-parchment-soft/30",children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"性能特点"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"高并发下更好"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"中等并发稳定"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"适用场景"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"不需要阻塞的高并发"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"生产者-消费者"})]})]})]}),e.jsx("h2",{id:"selection-guide",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、并发集合类选型对比"}),e.jsxs("table",{className:"w-full border-collapse mb-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border p-2 text-left text-sm font-semibold text-ink",children:"集合类"}),e.jsx("th",{className:"border border-border p-2 text-left text-sm font-semibold text-ink",children:"底层机制"}),e.jsx("th",{className:"border border-border p-2 text-left text-sm font-semibold text-ink",children:"并发度"}),e.jsx("th",{className:"border border-border p-2 text-left text-sm font-semibold text-ink",children:"适用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted font-mono",children:"ConcurrentHashMap"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"CAS + synchronized"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"高（桶级别）"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"高并发键值对存储"})]}),e.jsxs("tr",{className:"bg-parchment-soft/30",children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted font-mono",children:"CopyOnWriteArrayList"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"写时复制"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"读极高/写极低"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"读多写少（监听器列表）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted font-mono",children:"ArrayBlockingQueue"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"单锁 + Condition"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"中"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"有界缓冲、生产者-消费者"})]}),e.jsxs("tr",{className:"bg-parchment-soft/30",children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted font-mono",children:"LinkedBlockingQueue"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"双锁"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"中高"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"高吞吐生产者-消费者"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted font-mono",children:"ConcurrentLinkedQueue"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"CAS 无锁"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"极高"}),e.jsx("td",{className:"border border-border p-2 text-sm text-ink-muted",children:"高并发无需阻塞"})]})]})]}),e.jsx("h2",{id:"performance-tips",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、性能优化技巧"}),e.jsx(t,{type:"tip",title:"ConcurrentHashMap 初始化容量",children:e.jsxs("p",{className:"text-sm text-ink-muted",children:[e.jsx("strong",{children:"问题："}),"频繁扩容会影响性能。",e.jsx("br",{}),e.jsx("strong",{children:"优化："}),"预估数据量，初始化时指定合适容量：",e.jsx("code",{className:"font-mono text-xs bg-parchment-warm px-1 rounded",children:"new ConcurrentHashMap<>(expectedSize / 0.75f + 1)"})]})}),e.jsx(t,{type:"tip",title:"避免过度使用 CopyOnWriteArrayList",children:e.jsxs("p",{className:"text-sm text-ink-muted",children:[e.jsx("strong",{children:"陷阱："}),"大数据量的 CopyOnWriteArrayList 每次写入都复制整个数组，导致 GC 压力大。",e.jsx("br",{}),e.jsx("strong",{children:"建议："}),"数据量超过 1000 或写入频率较高时，考虑使用 ReadWriteLock + ArrayList。"]})}),e.jsx(t,{type:"tip",title:"选择合适的 BlockingQueue",children:e.jsxs("p",{className:"text-sm text-ink-muted",children:["• 需要",e.jsx("strong",{children:"有界"}),"防止内存溢出 → ArrayBlockingQueue",e.jsx("br",{}),"• 追求",e.jsx("strong",{children:"高吞吐"})," → LinkedBlockingQueue（双锁）",e.jsx("br",{}),"• 需要",e.jsx("strong",{children:"优先级"})," → PriorityBlockingQueue",e.jsx("br",{}),"• 需要",e.jsx("strong",{children:"延迟任务"})," → DelayedWorkQueue（ScheduledThreadPoolExecutor 内部使用）"]})}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、常见误区"}),e.jsx(t,{type:"danger",title:"误区 1：ConcurrentHashMap 完全线程安全",children:e.jsxs("p",{className:"text-sm text-ink-muted",children:[e.jsx("strong",{children:"错误认知："}),"ConcurrentHashMap 的所有操作都是原子的。",e.jsx("br",{}),e.jsx("strong",{children:"真相："}),'复合操作（如"检查后执行"）仍需外部同步：',e.jsx("pre",{className:"mt-2 bg-parchment-deep p-2 rounded text-xs overflow-x-auto",children:`// ❌ 不安全：check-then-act 不是原子操作
if (!map.containsKey(key)) {
    map.put(key, value);
}

// ✅ 安全：使用原子方法
map.putIfAbsent(key, value);`})]})}),e.jsx(t,{type:"danger",title:"误区 2：CopyOnWriteArrayList 适合所有读多写少场景",children:e.jsxs("p",{className:"text-sm text-ink-muted",children:[e.jsx("strong",{children:"错误认知："}),"只要读多写少就用 CopyOnWriteArrayList。",e.jsx("br",{}),e.jsx("strong",{children:"真相："}),"数据量大时复制成本极高，且迭代器是快照视图，无法看到最新数据。应考虑 ReadWriteLock。"]})}),e.jsx(t,{type:"danger",title:"误区 3：BlockingQueue 的 put/take 不会中断",children:e.jsxs("p",{className:"text-sm text-ink-muted",children:[e.jsx("strong",{children:"错误认知："}),"阻塞操作无法被中断。",e.jsx("br",{}),e.jsx("strong",{children:"真相："}),"put/take 都会响应中断并抛出 InterruptedException，必须正确处理：",e.jsx("pre",{className:"mt-2 bg-parchment-deep p-2 rounded text-xs overflow-x-auto",children:`try {
    queue.put(item);
} catch (InterruptedException e) {
    Thread.currentThread().interrupt(); // 恢复中断状态
    break; // 退出循环
}`})]})}),e.jsx(t,{type:"danger",title:"误区 4：ConcurrentLinkedQueue 可以替代 BlockingQueue",children:e.jsxs("p",{className:"text-sm text-ink-muted",children:[e.jsx("strong",{children:"错误认知："}),"ConcurrentLinkedQueue 性能更好，应该全面替代 BlockingQueue。",e.jsx("br",{}),e.jsx("strong",{children:"真相："}),"ConcurrentLinkedQueue 不支持阻塞，无法实现背压（backpressure），可能导致生产者过快造成内存溢出。"]})}),e.jsx(t,{type:"danger",title:"误区 5：size() 方法是精确的",children:e.jsxs("p",{className:"text-sm text-ink-muted",children:[e.jsx("strong",{children:"错误认知："}),"ConcurrentHashMap.size() 返回精确的元素数量。",e.jsx("br",{}),e.jsx("strong",{children:"真相："}),"在高并发下，size() 可能返回近似值。如果需要精确计数，应使用 LongAdder 手动维护。"]})}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、面试真题"}),e.jsx(x,{questions:[{question:"ConcurrentHashMap 在 JDK 7 和 JDK 8 中的实现有什么区别？",answer:"JDK 7 使用 Segment 分段锁，默认 16 个段，每个段是一把 ReentrantLock。JDK 8 抛弃 Segment，改用 CAS + synchronized 锁定链表/红黑树头节点，实现更细粒度的并发控制。JDK 8 的优势：并发度更高（理论上是桶的数量）、内存占用更少、支持多线程协助扩容。"},{question:"ConcurrentHashMap 的 size() 方法如何保证高并发下的准确性？",answer:"JDK 8 使用 CounterCell 数组，每次修改操作随机选择一个 CounterCell 进行累加（类似 LongAdder），避免竞争。size() 时遍历所有 CounterCell 求和。这种方式牺牲了一定的实时性换取高性能，高并发下可能返回近似值。"},{question:"CopyOnWriteArrayList 的优缺点是什么？适用什么场景？",answer:"优点：读操作无锁，性能极高；迭代器不会抛 ConcurrentModificationException。缺点：写操作需要复制整个数组，内存开销大，数据量大时性能差；迭代器是快照视图，看不到最新数据。适用场景：监听器列表、配置缓存等读远多于写且数据量不大的场景。"},{question:"ArrayBlockingQueue 和 LinkedBlockingQueue 的区别？",answer:"ArrayBlockingQueue：基于数组，有界，使用一把锁，入队出队不能并发，内存连续性能好。LinkedBlockingQueue：基于链表，可选有界（默认 Integer.MAX_VALUE），使用两把锁（takeLock/putLock），入队出队可并发，吞吐量更高但内存开销大。选择建议：需要严格限制容量用 ArrayBlockingQueue，追求高吞吐用 LinkedBlockingQueue。"},{question:"ConcurrentLinkedQueue 是如何实现线程安全的？",answer:"使用 CAS（Compare-And-Swap）原子操作实现无锁并发。核心思想：入队时通过 CAS 设置尾节点的 next 指针，失败则重试；tail 指针可能延迟更新（HOPS 策略）以减少 CAS 竞争。优势是无锁高并发，劣势是不支持阻塞操作，无法实现背压。"},{question:"什么是伪共享（False Sharing）？ConcurrentHashMap 如何解决？",answer:"伪共享：多个线程修改同一缓存行上的不同变量，导致缓存行频繁失效，性能下降。ConcurrentHashMap 的 CounterCell 使用 @sun.misc.Contended 注解填充缓存行，确保每个 CounterCell 独占一个缓存行，避免伪共享。Java 8 还可通过 -XX:+EnableContended 启用。"},{question:"如何实现一个线程安全的 LRU Cache？",answer:"方案 1：使用 LinkedHashMap + ReentrantReadWriteLock，读锁获取，写锁更新。方案 2：使用 ConcurrentHashMap + 双向链表 + 细粒度锁，类似 JDK 8 LinkedHashMap 的内部实现。方案 3（推荐）：直接使用 Guava 的 CacheBuilder 或 Caffeine，它们已经优化了并发性能和淘汰策略。"},{question:"BlockingQueue 的四种操作方法有什么区别？",answer:"① 抛出异常：add/remove/element，队列满/空时抛异常。② 返回特殊值：offer/poll/peek，失败返回 false/null。③ 阻塞等待：put/take，队列满/空时一直阻塞。④ 超时退出：offer(e,time,unit)/poll(time,unit)，超时返回 false/null。生产环境推荐使用阻塞或超时方法，避免忙等待。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8",children:[e.jsxs("div",{className:"border border-border-light rounded-paper-md p-4 bg-parchment-soft/30",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2 text-sm",children:"前置知识"}),e.jsxs("ul",{className:"space-y-1 text-sm text-ink-muted",children:[e.jsxs("li",{children:["• ",e.jsx("a",{href:"/docs/02-collections/hashmap-deep-dive",className:"text-accent hover:underline",children:"HashMap 深度剖析"})]}),e.jsx("li",{children:"• 多线程基础（synchronized、volatile）"}),e.jsx("li",{children:"• CAS 原子操作原理"})]})]}),e.jsxs("div",{className:"border border-border-light rounded-paper-md p-4 bg-parchment-soft/30",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2 text-sm",children:"延伸学习"}),e.jsxs("ul",{className:"space-y-1 text-sm text-ink-muted",children:[e.jsx("li",{children:"• 线程池与任务调度"}),e.jsx("li",{children:"• AQS 抽象队列同步器"}),e.jsx("li",{children:"• 分布式缓存（Redis）"})]})]})]}),e.jsx(t,{type:"info",title:"实战建议",children:e.jsxs("p",{className:"text-sm text-ink-muted",children:["在实际项目中，优先使用 java.util.concurrent 包下的并发集合，而非手动同步。根据读写比例、是否需要阻塞、数据量大小等因素选择合适的集合类。记住：",e.jsx("strong",{children:"没有最好的集合，只有最适合场景的集合。"})]})}),e.jsx(c,{...l(s.category,s.id)})]})}),e.jsx(m,{items:u})]})}export{C as default};
