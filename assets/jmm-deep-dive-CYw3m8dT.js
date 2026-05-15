import{j as e,g as l}from"./index-hyqxTCwJ.js";import{K as i}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as a}from"./SideNote-BKvanovA.js";import{C as t,A as n,S as d}from"./ArticleNav-DhfiS38Y.js";import{D as o}from"./DiagramBlock-CLaKE9_7.js";import{I as x}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"core",text:"核心原理",level:2},{id:"happens-before",text:"happens-before 规则",level:3},{id:"memory-barrier",text:"内存屏障",level:3},{id:"reordering",text:"指令重排序",level:3},{id:"volatile-semantics",text:"volatile 语义",level:3},{id:"playground",text:"代码实验场",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比分析",level:2}];function f({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(i,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:[e.jsx("strong",{children:"Java内存模型（JMM）"}),"是 Java 语言规范中定义的抽象模型，描述了多线程访问共享变量时的行为规范， 通过",e.jsx("strong",{children:"主内存"}),"和",e.jsx("strong",{children:"工作内存"}),"的交互协议以及",e.jsx("strong",{children:"happens-before"}),"规则， 保证多线程环境下的",e.jsx("strong",{children:"可见性"}),"、",e.jsx("strong",{children:"有序性"}),"和",e.jsx("strong",{children:"原子性"}),"。"]})}),e.jsx(t,{type:"tip",title:"为什么 JMM 如此重要？",children:"JMM 是理解 Java 并发编程的基石。不懂 JMM 就无法真正理解 volatile、synchronized、CAS 等并发工具的原理， 更无法解决生产环境中的线程安全问题。它是高级 Java 工程师的必备知识。"}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"整体架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["JMM 定义了线程与主内存之间的抽象关系：",e.jsx("strong",{children:"所有变量存储在主内存"}),"，每个线程有自己独立的",e.jsx("strong",{children:"工作内存"}),"， 线程对变量的操作必须在工作内存中进行，不能直接读写主内存。"]}),e.jsx(o,{title:"JMM 内存结构示意",children:`
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
            `}),e.jsx(a,{children:e.jsxs("p",{className:"text-sm text-ink-muted",children:[e.jsx("strong",{children:"注意："}),"JMM 是抽象模型，不是真实的物理内存布局。工作内存对应 CPU 缓存、寄存器等， 主内存对应 RAM。JVM 实现可以自由优化，只要符合 JMM 规范即可。"]})}),e.jsx("h2",{id:"core",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"核心原理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["JMM 围绕三个核心特性展开：",e.jsx("strong",{children:"原子性"}),"、",e.jsx("strong",{children:"可见性"}),"、",e.jsx("strong",{children:"有序性"}),"。"]}),e.jsx("h3",{id:"happens-before",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"happens-before 规则"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"happens-before"}),"是 JMM 的核心概念，它定义了操作之间的",e.jsx("strong",{children:"偏序关系"}),"，保证了内存可见性。如果 A happens-before B， 则 A 的结果对 B 可见。"]}),e.jsx(r,{code:`// 1. 程序次序规则：单线程内，按照代码顺序，书写在前面的操作先行发生于书写在后面的操作
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
// 8. 传递性：A happens-before B，B happens-before C，则 A happens-before C`,language:"java",description:"happens-before 八大规则"}),e.jsx("h3",{id:"memory-barrier",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"内存屏障"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["内存屏障（Memory Barrier）是 CPU 指令，用于控制",e.jsx("strong",{children:"指令重排序"}),"和",e.jsx("strong",{children:"内存可见性"}),"。 JMM 通过插入内存屏障来实现 happens-before 规则。"]}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"屏障类型"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"作用"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"插入场景"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"LoadLoad"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"确保 Load1 的数据装载先于 Load2"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"volatile 读后"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"StoreStore"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"确保 Store1 数据刷新到内存先于 Store2"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"volatile 写前"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"LoadStore"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"确保 Load1 数据装载先于 Store2 刷新"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"volatile 读后"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"StoreLoad"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"确保 Store1 数据刷新先于 Load2 装载（开销最大）"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"volatile 写后"})]})]})]})}),e.jsx("h3",{id:"reordering",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"指令重排序"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"为了提高性能，编译器和处理器会对指令进行重排序。JMM 允许不影响单线程正确性的重排序， 但会禁止可能影响多线程正确性的重排序。"}),e.jsx(r,{code:`// 经典的重排序问题：双重检查锁定（DCL）单例
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
// volatile 禁止重排序，保证对象完全初始化后才暴露引用`,language:"java",description:"指令重排序示例"}),e.jsx("h3",{id:"volatile-semantics",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"volatile 语义"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"volatile"}),"是 JMM 提供的轻量级同步机制，具有两层语义："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"保证可见性"}),"：当一个线程修改 volatile 变量后，新值立即刷新到主内存，其他线程读取时强制从主内存重新加载"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"禁止指令重排序"}),"：通过插入内存屏障，禁止 volatile 读写操作前后的重排序"]})]}),e.jsx(t,{type:"warning",title:"⚠️ volatile 不保证原子性",children:e.jsxs("p",{className:"text-sm",children:["volatile ",e.jsx("strong",{children:"不能"}),"保证复合操作的原子性，如 ",e.jsx("code",{className:"font-mono text-xs",children:"i++"}),"。 如果需要原子性，应使用 ",e.jsx("code",{className:"font-mono text-xs",children:"AtomicInteger"})," 或 ",e.jsx("code",{className:"font-mono text-xs",children:"synchronized"}),"。"]})}),e.jsx("h2",{id:"playground",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"代码实验场"}),e.jsx(r,{code:`public class VolatileVisibility {
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
}`,language:"java",description:"volatile 可见性验证"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：认为 volatile 能保证原子性",children:[e.jsxs("p",{className:"text-sm mb-2",children:["❌ 错误认知：",e.jsx("code",{className:"font-mono text-xs",children:"volatile int counter; counter++;"})," 是线程安全的"]}),e.jsxs("p",{className:"text-sm",children:["✅ 正确理解：",e.jsx("code",{className:"font-mono text-xs",children:"counter++"})," 包含读-改-写三个步骤，volatile 只能保证单个读或写的可见性， 无法保证复合操作的原子性。应使用 ",e.jsx("code",{className:"font-mono text-xs",children:"AtomicInteger"}),"。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：认为工作内存是线程私有的栈空间",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 错误认知：JMM 的工作内存 = JVM 栈"}),e.jsxs("p",{className:"text-sm",children:["✅ 正确理解：工作内存是 JMM 的",e.jsx("strong",{children:"抽象概念"}),"，对应 CPU 寄存器、高速缓存等硬件层面。 JVM 栈存储局部变量表，与工作内存不同。不要混淆 JMM 和 JVM 运行时数据区。"]})]}),e.jsxs(t,{type:"danger",title:"误区 3：认为 synchronized 只保证原子性",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 错误认知：synchronized 只管互斥，不管可见性"}),e.jsxs("p",{className:"text-sm",children:["✅ 正确理解：synchronized 同时保证",e.jsx("strong",{children:"原子性"}),"、",e.jsx("strong",{children:"可见性"}),"和",e.jsx("strong",{children:"有序性"}),"。 解锁时会刷新工作内存到主内存，加锁时会从主内存重新加载，天然满足 happens-before 规则。"]})]}),e.jsx(t,{type:"warning",title:"误区 4：过度使用 volatile",children:e.jsx("p",{className:"text-sm",children:"volatile 虽然比 synchronized 轻量，但也有性能开销（内存屏障会阻止某些优化）。 只在确实需要可见性且操作简单时使用，复杂场景仍应用 synchronized 或 Lock。"})}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"面试真题"}),e.jsx(x,{questions:[{question:"什么是 Java 内存模型（JMM）？它解决了什么问题？",answer:`JMM 是 Java 语言规范定义的抽象内存模型，描述了多线程访问共享变量时的行为规范。

解决的问题：
1. 可见性问题：一个线程修改的变量，其他线程能否立即看到
2. 有序性问题：指令重排序是否会影响多线程正确性
3. 原子性问题：复合操作是否会被打断

JMM 通过主内存和工作内存的交互协议、happens-before 规则、内存屏障等机制，
在保证正确性的前提下，允许 JVM 和处理器进行各种优化。`},{question:"volatile 关键字的作用是什么？底层原理是什么？",answer:`volatile 有两层语义：

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

注意：volatile 不保证原子性！`},{question:"什么是 happens-before 规则？列举主要的几条",answer:`happens-before 是 JMM 定义的偏序关系，如果 A happens-before B，则 A 的结果对 B 可见。

主要规则：
1. 程序次序规则：单线程内，代码顺序即执行顺序
2. 管程锁定规则：unlock 先行于后续对同一锁的 lock
3. volatile 变量规则：volatile 写先行于后续的 volatile 读
4. 线程启动规则：Thread.start() 先行于线程内的所有操作
5. 线程终止规则：线程内所有操作先行于 Thread.join() 返回
6. 传递性：A→B，B→C，则 A→C

这些规则是编译器、JVM、处理器优化的边界，违反 happens-before 的重排序是被禁止的。`},{question:"synchronized 和 volatile 的区别是什么？",answer:`区别对比：

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

最佳实践：简单场景用 volatile，复杂场景用 synchronized 或 Lock。`},{question:"什么是内存屏障？有哪些类型？",answer:`内存屏障（Memory Barrier）是 CPU 指令，用于控制指令重排序和内存可见性。

四种类型：
1. LoadLoad 屏障：确保 Load1 的数据装载先于 Load2
   - 插入位置：volatile 读之后
   
2. StoreStore 屏障：确保 Store1 数据刷新到内存先于 Store2
   - 插入位置：volatile 写之前
   
3. LoadStore 屏障：确保 Load1 数据装载先于 Store2 刷新
   - 插入位置：volatile 读之后
   
4. StoreLoad 屏障：确保 Store1 数据刷新先于 Load2 装载（开销最大）
   - 插入位置：volatile 写之后

JVM 通过在适当位置插入这些屏障，实现了 volatile 的语义和 happens-before 规则。`},{question:"双重检查锁定（DCL）为什么要用 volatile？",answer:`DCL 单例中使用 volatile 的原因：

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
其他线程看到的 instance 要么为 null，要么是完全初始化的对象。`}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"对比分析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"JMM 中各种同步机制的全面对比："}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"特性"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"volatile"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"synchronized"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"AtomicXXX"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"原子性"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"❌"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"可见性"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"有序性"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"阻塞线程"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"❌"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"✅"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"❌"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"性能"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"⚡ 轻量"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"🐢 重量（已优化）"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"⚡ 轻量"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"适用场景"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"状态标志、DCL"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"复杂同步逻辑"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"计数器、累加器"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"底层实现"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"内存屏障"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"Monitor + CAS"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"CAS + volatile"})]})]})]})}),e.jsxs("section",{id:"related",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"关联知识"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 border border-border rounded-paper-md hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-sm mb-2",children:"→ Java锁机制深入剖析"}),e.jsx("p",{className:"text-xs text-ink-muted",children:"了解 synchronized 的锁升级过程和底层实现"})]}),e.jsxs("div",{className:"p-4 border border-border rounded-paper-md hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-sm mb-2",children:"→ CAS与原子类深度解析"}),e.jsx("p",{className:"text-xs text-ink-muted",children:"学习无锁并发编程和原子操作的实现原理"})]})]})]}),e.jsx(n,{...l(s.category,s.id)})]})}),e.jsx(d,{items:m})]})}export{f as default};
