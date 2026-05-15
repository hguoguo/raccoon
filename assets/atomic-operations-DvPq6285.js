import{j as e,g as a}from"./index-hyqxTCwJ.js";import{K as i}from"./KnowledgeLayout-CwkOMHwC.js";import{P as n}from"./Playground-C6lk-t6G.js";import{S as o}from"./SideNote-BKvanovA.js";import{C as t,A as d,S as c}from"./ArticleNav-DhfiS38Y.js";import{D as s}from"./DiagramBlock-CLaKE9_7.js";import{I as l}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"architecture",text:"一、原子操作架构",level:2},{id:"cas-principle",text:"二、CAS 原理详解",level:2},{id:"cas-mechanism",text:"2.1 CAS 工作机制",level:3},{id:"aba-problem",text:"2.2 ABA 问题及解决",level:3},{id:"atomic-classes",text:"三、原子类分类",level:2},{id:"basic-types",text:"3.1 基本类型原子类",level:3},{id:"array-types",text:"3.2 数组类型原子类",level:3},{id:"reference-types",text:"3.3 引用类型原子类",level:3},{id:"field-updater",text:"3.4 字段更新器",level:3},{id:"longadder",text:"四、LongAdder 高性能计数器",level:2},{id:"unsafe",text:"五、Unsafe 底层支持",level:2},{id:"misconceptions",text:"六、常见误区",level:2},{id:"interview",text:"七、面试真题",level:2},{id:"comparison",text:"八、对比总结",level:2},{id:"related",text:"九、知识关联",level:2}];function b({meta:r}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(i,{meta:r,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Java 原子操作类是基于",e.jsx("strong",{className:"text-accent",children:"CAS（Compare-And-Swap）"}),"实现的无锁线程安全工具，位于",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"java.util.concurrent.atomic"})," 包中。 通过硬件级别的原子指令保证操作的原子性，避免了传统锁的上下文切换开销，在高并发场景下性能显著优于 synchronized。"]})}),e.jsxs(t,{type:"tip",title:"为什么需要原子操作？",children:["多线程环境下，",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"count++"})," 这类复合操作（读取-修改-写入）不是原子的，会导致数据竞争。传统解决方案是使用 synchronized 加锁，但锁会带来上下文切换、线程阻塞等性能开销。CAS 通过硬件支持的原子指令，在用户态完成比较和交换，无需进入内核态，性能更高。"]}),e.jsx("h2",{id:"architecture",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、原子操作架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java 原子类基于 ",e.jsx("strong",{children:"CAS + volatile + Unsafe"})," 三大核心技术实现。CAS 保证原子性，volatile 保证可见性，Unsafe 提供底层内存操作能力。 原子类分为四大类：基本类型、数组类型、引用类型、字段更新器。"]}),e.jsx(s,{title:"原子类体系结构",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌─────────────────────────────────────────────────────┐
│         java.util.concurrent.atomic                   │
├──────────────────┬──────────────────────────────────┤
│  基本类型         │     数组类型                      │
│ AtomicInteger    │ AtomicIntegerArray               │
│ AtomicLong       │ AtomicLongArray                  │
│ AtomicBoolean    │ AtomicReferenceArray             │
├──────────────────┼──────────────────────────────────┤
│  引用类型         │     字段更新器                    │
│ AtomicReference  │ AtomicIntegerFieldUpdater        │
│ AtomicStampedRef │ AtomicLongFieldUpdater           │
│ AtomicMarkableRef│ AtomicReferenceFieldUpdater      │
├──────────────────┴──────────────────────────────────┤
│  高性能计数器（JDK 8+）                               │
│ LongAdder, DoubleAdder, LongAccumulator             │
└─────────────────────────────────────────────────────┘

核心依赖：
• CAS: compareAndSet() → Unsafe.compareAndSwapInt()
• volatile: 保证变量可见性
• Unsafe: 直接操作内存地址
            `})}),e.jsx("h2",{id:"cas-principle",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、CAS 原理详解"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"CAS（Compare-And-Swap）"})," 是一种无锁算法，包含三个操作数：",e.jsx("strong",{children:"内存位置 V"}),"、",e.jsx("strong",{children:"预期原值 A"}),"、",e.jsx("strong",{children:"新值 B"}),"。 只有当 V 的值等于 A 时，才将 V 更新为 B，否则不做任何操作。整个过程是原子的，由 CPU 硬件指令保证。"]}),e.jsx("h3",{id:"cas-mechanism",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.1 CAS 工作机制"}),e.jsx(n,{code:`// AtomicInteger 的核心方法
public class AtomicInteger extends Number implements java.io.Serializable {
    private static final long serialVersionUID = 6214790243416807050L;
    
    // setup to use Unsafe.compareAndSwapInt for updates
    private static final Unsafe unsafe = Unsafe.getUnsafe();
    private static final long valueOffset;
    
    static {
        try {
            // 获取 value 字段在内存中的偏移量
            valueOffset = unsafe.objectFieldOffset
                (AtomicInteger.class.getDeclaredField("value"));
        } catch (Exception ex) { throw new Error(ex); }
    }
    
    private volatile int value;  // volatile 保证可见性
    
    // CAS 操作：如果当前值 == expect，则更新为 update
    public final boolean compareAndSet(int expect, int update) {
        return unsafe.compareAndSwapInt(this, valueOffset, expect, update);
    }
    
    // 自旋递增：典型 CAS 应用
    public final int incrementAndGet() {
        for (;;) {  // 无限循环（自旋）
            int current = get();       // ① 读取当前值
            int next = current + 1;    // ② 计算新值
            if (compareAndSet(current, next))  // ③ CAS 尝试更新
                return next;           // ④ 成功则返回
            // ⑤ 失败则重试（其他线程修改了值）
        }
    }
}`,language:"java",filename:"AtomicInteger.java",description:"AtomicInteger 基于 CAS 的实现原理",highlights:[21,26]}),e.jsx(s,{title:"CAS 工作流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
线程1                          线程2                        内存值
  ↓                              ↓                            ↓
读取 value = 5                 读取 value = 5              value = 5
计算 next = 6                  计算 next = 6               
CAS(5, 6) ✓ 成功                                              value = 6
                               CAS(5, 6) ✗ 失败（期望5，实际6）
                               重新读取 value = 6
                               计算 next = 7
                               CAS(6, 7) ✓ 成功              value = 7

关键点：
• CAS 失败不会阻塞线程，而是立即返回 false
• 调用方通常使用自旋（for 循环）重试
• 高竞争场景下，自旋会消耗 CPU，此时应改用锁
            `})}),e.jsx("h3",{id:"aba-problem",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.2 ABA 问题及解决"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"ABA 问题"}),"：线程1 读取值 A，准备 CAS 更新；线程2 将值从 A→B→A；线程1 执行 CAS 时发现值仍是 A，认为未被修改，但实际上值已经变化过。 这可能导致逻辑错误（如链表节点被错误复用）。"]}),e.jsx(n,{code:`import java.util.concurrent.atomic.AtomicStampedReference;
import java.util.concurrent.atomic.AtomicMarkableReference;

public class ABADemo {
    
    // 问题演示：普通 AtomicReference 存在 ABA 问题
    public void abaProblem() {
        AtomicReference<Integer> ref = new AtomicReference<>(100);
        
        // 线程1：准备将 100 改为 200
        new Thread(() -> {
            Integer expected = ref.get();  // 读取 100
            try { Thread.sleep(1000); } catch (InterruptedException e) {}  // 模拟延迟
            boolean success = ref.compareAndSet(expected, 200);
            System.out.println("线程1 CAS 结果: " + success);  // true（但中间值已变过）
        }).start();
        
        // 线程2：快速将 100→150→100
        new Thread(() -> {
            ref.compareAndSet(100, 150);
            ref.compareAndSet(150, 100);
            System.out.println("线程2 完成 ABA 操作");
        }).start();
    }
    
    // 解决方案1：AtomicStampedReference（带版本号）
    public void solveWithStamp() {
        // 初始值 100，版本号 0
        AtomicStampedReference<Integer> stampedRef = new AtomicStampedReference<>(100, 0);
        
        int[] stampHolder = new int[1];
        Integer value = stampedRef.get(stampHolder);
        int stamp = stampHolder[0];  // 版本号 0
        
        // CAS 时必须同时匹配值和版本号
        boolean success = stampedRef.compareAndSet(
            value, 200,      // 期望值 → 新值
            stamp, stamp + 1 // 期望版本 → 新版本
        );
        System.out.println("带版本号的 CAS: " + success);
    }
    
    // 解决方案2：AtomicMarkableReference（带标记位）
    public void solveWithMark() {
        // 初始值 100，标记 false
        AtomicMarkableReference<Integer> markableRef = new AtomicMarkableReference<>(100, false);
        
        boolean[] markHolder = new boolean[1];
        Integer value = markableRef.get(markHolder);
        
        // CAS 时同时检查标记位
        boolean success = markableRef.compareAndSet(value, 200, false, true);
        System.out.println("带标记的 CAS: " + success);
    }
}`,language:"java",filename:"ABADemo.java",description:"ABA 问题演示及两种解决方案",highlights:[33,48]}),e.jsxs(t,{type:"warning",title:"何时需要解决 ABA？",children:["如果业务逻辑只关心最终值（如计数器），ABA 不影响正确性，无需处理。",e.jsx("br",{}),"如果业务逻辑关心中间状态（如链表节点的指针修改、对象引用复用），必须使用 AtomicStampedReference 或 AtomicMarkableReference。"]}),e.jsx("h2",{id:"atomic-classes",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、原子类分类"}),e.jsx("h3",{id:"basic-types",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 基本类型原子类"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"AtomicInteger"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"AtomicLong"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"AtomicBoolean"}),"用于替代基本类型的 volatile 变量，提供原子读写操作。"]}),e.jsx(n,{code:`import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicBoolean;

public class BasicAtomicDemo {
    private AtomicInteger count = new AtomicInteger(0);
    private AtomicLong timestamp = new AtomicLong(System.currentTimeMillis());
    private AtomicBoolean flag = new AtomicBoolean(false);
    
    // 常用方法
    public void demonstrateMethods() {
        // ① get/set：普通读写
        int current = count.get();
        count.set(100);
        
        // ② getAndSet：原子设置并返回旧值
        int oldValue = count.getAndSet(200);  // 返回 100，设置为 200
        
        // ③ compareAndSet：CAS 更新
        boolean success = count.compareAndSet(200, 300);  // true
        
        // ④ getAndIncrement / incrementAndGet：原子递增
        int v1 = count.getAndIncrement();  // 返回 300，然后变为 301
        int v2 = count.incrementAndGet();  // 先变为 302，然后返回 302
        
        // ⑤ getAndAdd / addAndGet：原子增加指定值
        int v3 = count.getAndAdd(10);   // 返回 302，然后变为 312
        int v4 = count.addAndGet(10);   // 先变为 322，然后返回 322
        
        // ⑥ 函数式更新（JDK 8+）
        count.updateAndGet(x -> x * 2);  // 322 * 2 = 644
        count.accumulateAndGet(10, (x, y) -> x + y);  // 644 + 10 = 654
    }
}`,language:"java",filename:"BasicAtomicDemo.java",description:"基本类型原子类的常用方法",highlights:[16,20,24,28,32]}),e.jsx("h3",{id:"array-types",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 数组类型原子类"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"AtomicIntegerArray"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"AtomicLongArray"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"AtomicReferenceArray"}),"用于对数组元素进行原子操作。注意：原子类保护的是",e.jsx("strong",{children:"数组元素的修改"}),"，而非数组引用本身。"]}),e.jsx(n,{code:`import java.util.concurrent.atomic.AtomicIntegerArray;

public class AtomicArrayDemo {
    private AtomicIntegerArray array = new AtomicIntegerArray(10);  // 长度为10的数组
    
    public void demonstrateArrayOps() {
        // ① 设置元素
        array.set(0, 100);
        
        // ② 获取元素
        int value = array.get(0);  // 100
        
        // ③ CAS 更新指定索引的元素
        boolean success = array.compareAndSet(0, 100, 200);  // true
        
        // ④ 原子递增
        int oldValue = array.getAndIncrement(0);  // 返回 200，变为 201
        
        // ⑤ 原子增加
        int newValue = array.addAndGet(0, 50);  // 201 + 50 = 251
        
        System.out.println("数组内容: " + array);
    }
}`,language:"java",filename:"AtomicArrayDemo.java",description:"数组类型原子类的使用"}),e.jsx("h3",{id:"reference-types",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.3 引用类型原子类"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"AtomicReference"})," 用于原子更新对象引用，适用于需要 CAS 更新复杂对象的场景。"]}),e.jsx(n,{code:`import java.util.concurrent.atomic.AtomicReference;

public class AtomicReferenceDemo {
    
    static class User {
        String name;
        int age;
        
        User(String name, int age) {
            this.name = name;
            this.age = age;
        }
        
        @Override
        public String toString() {
            return "User{name='" + name + "', age=" + age + "}";
        }
    }
    
    private AtomicReference<User> userRef = new AtomicReference<>();
    
    public void demonstrateReferenceOps() {
        // ① 设置对象引用
        User user1 = new User("Alice", 25);
        userRef.set(user1);
        
        // ② CAS 更新引用（整个对象替换）
        User user2 = new User("Bob", 30);
        boolean success = userRef.compareAndSet(user1, user2);  // true
        
        // ③ 获取当前引用
        User current = userRef.get();
        System.out.println("当前用户: " + current);  // User{name='Bob', age=30}
        
        // ④ 函数式更新
        userRef.updateAndGet(u -> new User(u.name.toUpperCase(), u.age + 1));
        System.out.println("更新后: " + userRef.get());  // User{name='BOB', age=31}
    }
}`,language:"java",filename:"AtomicReferenceDemo.java",description:"AtomicReference 原子更新对象引用"}),e.jsxs(o,{label:"注意事项",children:["AtomicReference 的 CAS 比较的是",e.jsx("strong",{children:"引用地址"}),"，而非对象内容。如果需要基于对象内容判断，需确保传入的是同一对象实例，或使用 AtomicStampedReference 配合版本号。"]}),e.jsx("h3",{id:"field-updater",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.4 字段更新器"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"AtomicIntegerFieldUpdater"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"AtomicLongFieldUpdater"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"AtomicReferenceFieldUpdater"}),"用于以原子方式更新类的",e.jsx("strong",{children:"指定字段"}),"，避免为每个字段创建单独的原子对象，节省内存。"]}),e.jsx(n,{code:`import java.util.concurrent.atomic.AtomicIntegerFieldUpdater;

public class FieldUpdaterDemo {
    
    static class Product {
        // 必须用 volatile 修饰
        volatile int stock;
        volatile String name;
        
        Product(String name, int stock) {
            this.name = name;
            this.stock = stock;
        }
    }
    
    // 创建字段更新器（静态单例，避免重复创建）
    private static final AtomicIntegerFieldUpdater<Product> STOCK_UPDATER =
        AtomicIntegerFieldUpdater.newUpdater(Product.class, "stock");
    
    public void demonstrateFieldUpdate() {
        Product product = new Product("iPhone", 100);
        
        // ① CAS 更新字段
        boolean success = STOCK_UPDATER.compareAndSet(product, 100, 99);  // true
        
        // ② 原子递减
        int oldStock = STOCK_UPDATER.getAndDecrement(product);  // 返回 99，变为 98
        
        // ③ 原子增加
        int newStock = STOCK_UPDATER.addAndGet(product, 10);  // 98 + 10 = 108
        
        System.out.println("库存: " + product.stock);  // 108
    }
}`,language:"java",filename:"FieldUpdaterDemo.java",description:"字段更新器：原子更新类的指定字段",highlights:[18,24,28]}),e.jsxs(t,{type:"danger",title:"字段更新器的限制",children:["① 字段必须是 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"volatile"})," 修饰；② 字段不能是 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"static"}),"；③ 只能访问当前类及其子类的字段；④ 更新器必须是静态单例，频繁创建会影响性能。"]}),e.jsx("h2",{id:"longadder",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、LongAdder 高性能计数器"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"LongAdder"}),"（JDK 8+）是 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"AtomicLong"})," 的高性能替代品，专为",e.jsx("strong",{children:"高并发累加"}),"场景设计。 它采用",e.jsx("strong",{children:"分段累加"}),"策略：多个线程操作不同的 Cell（单元格），最后汇总结果，大幅减少 CAS 竞争。"]}),e.jsx(s,{title:"LongAdder vs AtomicLong 性能对比",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
AtomicLong（单点竞争）：
线程1 ──→ CAS ──┐
线程2 ──→ CAS ──┤──→ 共享变量（激烈竞争，大量自旋）
线程3 ──→ CAS ──┘
线程N ──→ CAS ──┘

LongAdder（分段累加）：
线程1 ──→ Cell[0] ──┐
线程2 ──→ Cell[1] ──┤
线程3 ──→ Cell[2] ──┼──→ sum() 时汇总
线程4 ──→ Cell[0] ──┤
...                 ──┘
线程N ──→ Cell[M] ──┘

性能提升：
• 低并发：两者相当
• 高并发：LongAdder 吞吐量提升 5-10 倍
• 适用场景：计数器、统计指标（不要求实时精确值）
            `})}),e.jsx(n,{code:`import java.util.concurrent.atomic.LongAdder;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.IntStream;

public class LongAdderDemo {
    
    public void performanceComparison() throws InterruptedException {
        int threadCount = 100;
        int operationsPerThread = 100000;
        
        // 测试 AtomicLong
        AtomicLong atomicLong = new AtomicLong(0);
        long start = System.currentTimeMillis();
        
        Thread[] threads1 = new Thread[threadCount];
        for (int i = 0; i < threadCount; i++) {
            threads1[i] = new Thread(() -> {
                for (int j = 0; j < operationsPerThread; j++) {
                    atomicLong.incrementAndGet();
                }
            });
            threads1[i].start();
        }
        for (Thread t : threads1) t.join();
        
        long atomicTime = System.currentTimeMillis() - start;
        System.out.println("AtomicLong 耗时: " + atomicTime + "ms, 结果: " + atomicLong.get());
        
        // 测试 LongAdder
        LongAdder longAdder = new LongAdder();
        start = System.currentTimeMillis();
        
        Thread[] threads2 = new Thread[threadCount];
        for (int i = 0; i < threadCount; i++) {
            threads2[i] = new Thread(() -> {
                for (int j = 0; j < operationsPerThread; j++) {
                    longAdder.increment();
                }
            });
            threads2[i].start();
        }
        for (Thread t : threads2) t.join();
        
        long adderTime = System.currentTimeMillis() - start;
        System.out.println("LongAdder 耗时: " + adderTime + "ms, 结果: " + longAdder.sum());
        System.out.println("性能提升: " + (atomicTime * 1.0 / adderTime) + "x");
    }
    
    // LongAdder 常用方法
    public void basicUsage() {
        LongAdder counter = new LongAdder();
        
        counter.increment();           // 递增
        counter.add(10);               // 增加指定值
        counter.decrement();           // 递减（JDK 11+）
        
        long total = counter.sum();    // 获取总和（非原子操作，可能不准确）
        counter.reset();               // 重置为0
    }
}`,language:"java",filename:"LongAdderDemo.java",description:"LongAdder 高性能计数器：分段累加策略",highlights:[41,52]}),e.jsxs(t,{type:"info",title:"何时使用 LongAdder？",children:[e.jsx("strong",{children:"选择 LongAdder："}),"高并发累加场景（如统计 PV、QPS、请求数），允许最终一致性，不需要实时精确值。",e.jsx("br",{}),e.jsx("strong",{children:"选择 AtomicLong："}),"需要强一致性、实时准确值的场景（如订单号生成、序列号分配）。"]}),e.jsx("h2",{id:"unsafe",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、Unsafe 底层支持"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"sun.misc.Unsafe"})," 是 Java 提供的",e.jsx("strong",{children:"不安全"}),"操作类，允许直接操作内存、绕过 JVM 安全检查。 原子类、AQS、ConcurrentHashMap 等核心并发组件都依赖 Unsafe 实现。普通开发者",e.jsx("strong",{children:"不应直接使用"})," Unsafe，因为它破坏了 Java 的安全模型。"]}),e.jsx(n,{code:`import sun.misc.Unsafe;
import java.lang.reflect.Field;

public class UnsafeDemo {
    
    // 获取 Unsafe 实例（反射方式，生产环境不推荐）
    private static Unsafe getUnsafe() throws Exception {
        Field field = Unsafe.class.getDeclaredField("theUnsafe");
        field.setAccessible(true);
        return (Unsafe) field.get(null);
    }
    
    public void demonstrateUnsafe() throws Exception {
        Unsafe unsafe = getUnsafe();
        
        // ① 分配/释放内存（类似 C 的 malloc/free）
        long address = unsafe.allocateMemory(1024);  // 分配 1KB
        unsafe.setMemory(address, 1024, (byte) 0);   // 清零
        unsafe.freeMemory(address);                   // 释放
        
        // ② CAS 操作（原子类的底层实现）
        class Data { volatile int value = 100; }
        Data data = new Data();
        
        long offset = unsafe.objectFieldOffset(Data.class.getDeclaredField("value"));
        boolean success = unsafe.compareAndSwapInt(data, offset, 100, 200);
        System.out.println("CAS 结果: " + success + ", 当前值: " + data.value);
        
        // ③ 直接读写内存
        unsafe.putInt(address, 42);
        int value = unsafe.getInt(address);
        System.out.println("直接内存读写: " + value);
        
        // ④ 内存屏障（保证有序性）
        unsafe.loadFence();   // 读屏障
        unsafe.storeFence();  // 写屏障
        unsafe.fullFence();   // 全屏障
    }
}`,language:"java",filename:"UnsafeDemo.java",description:"Unsafe 底层操作示例（仅供学习，生产环境禁用）",highlights:[25,30,36]}),e.jsx(t,{type:"danger",title:"⚠️ Unsafe 的危险性",children:"① 绕过 JVM 类型检查和内存管理，容易导致内存泄漏、段错误；② 不同 JDK 版本的 API 可能不兼容；③ JDK 9+ 已将 Unsafe 模块化，普通代码无法访问；④ 除非开发框架级库（如 Netty、Kafka），否则绝不要使用 Unsafe。"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、常见误区"}),e.jsxs(t,{type:"danger",title:"误区1：原子类比 synchronized 一定快",children:[e.jsx("strong",{children:"错误认知："}),"AtomicInteger 比 synchronized 快，所以应该优先使用。",e.jsx("br",{}),e.jsx("strong",{children:"正确理解："}),"低竞争场景下，两者性能相当；高竞争场景下，CAS 自旋会消耗大量 CPU，性能反而低于 synchronized（后者会让线程阻塞，释放 CPU）。JDK 8+ 的 LongAdder 在高并发累加场景下才显著优于 AtomicLong。应根据具体场景选择。"]}),e.jsxs(t,{type:"danger",title:"误区2：CAS 没有性能开销",children:[e.jsx("strong",{children:"错误认知："}),"CAS 是无锁的，所以没有性能开销。",e.jsx("br",{}),e.jsx("strong",{children:"正确理解："}),"CAS 虽然避免了线程阻塞和上下文切换，但",e.jsx("strong",{children:"自旋重试"}),"会持续占用 CPU。在高竞争场景下，多个线程不断 CAS 失败并重试，导致 CPU 空转，吞吐量下降。此时应改用锁或 LongAdder。"]}),e.jsxs(t,{type:"danger",title:"误区3：AtomicReference 保证对象内部状态的线程安全",children:[e.jsx("strong",{children:"错误认知："}),"用 AtomicReference 包装对象后，对象内部的字段就线程安全了。",e.jsx("br",{}),e.jsx("strong",{children:"正确理解："}),"AtomicReference 只保证",e.jsx("strong",{children:"引用本身的原子性"}),"，不保证对象内部字段的线程安全。如果多个线程通过同一个引用修改对象内部状态，仍需要同步机制。如需线程安全的对象，应使用不可变对象或内部同步。"]}),e.jsxs(t,{type:"warning",title:"误区4：LongAdder 的结果总是精确的",children:[e.jsx("strong",{children:"错误认知："}),"LongAdder.sum() 返回的结果是实时准确的。",e.jsx("br",{}),e.jsx("strong",{children:"正确理解："}),"LongAdder 采用分段累加，sum() 遍历所有 Cell 求和，这个过程",e.jsx("strong",{children:"不是原子的"}),"。如果在求和过程中有其他线程正在修改某个 Cell，结果可能不一致。LongAdder 适用于统计场景，不适用于需要强一致性的场景（如余额扣减）。"]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、面试真题"}),e.jsx(l,{questions:[{question:"CAS 的原理是什么？有什么优缺点？",answer:"原理：CAS 包含三个操作数——内存位置 V、预期原值 A、新值 B。只有当 V 的值等于 A 时，才将 V 更新为 B，整个过程由 CPU 硬件指令（如 x86 的 CMPXCHG）保证原子性。优点：① 无锁，避免线程阻塞和上下文切换；② 低竞争场景下性能优异；③ 支持细粒度同步。缺点：① ABA 问题；② 高竞争场景下自旋消耗 CPU；③ 只能保证单个变量的原子性，复合操作仍需锁。"},{question:"ABA 问题如何解决？",answer:"解决方案有两种：① AtomicStampedReference：在值的基础上增加版本号（stamp），每次修改递增版本号，CAS 时同时比较值和版本号；② AtomicMarkableReference：在值的基础上增加布尔标记位，适用于只关心是否被修改过的场景。选择依据：如果需要记录修改次数，用 StampedReference；如果只关心是否被修改，用 MarkableReference。"},{question:"AtomicLong 和 LongAdder 的区别？如何选择？",answer:"区别：① 实现机制：AtomicLong 基于单一变量的 CAS，高竞争时大量自旋；LongAdder 采用分段累加（Cell 数组），多个线程操作不同 Cell，减少竞争。② 性能：低并发时两者相当；高并发时 LongAdder 吞吐量提升 5-10 倍。③ 一致性：AtomicLong 保证强一致性，实时准确；LongAdder 的 sum() 非原子，可能不一致。选择：需要实时精确值（如序列号）用 AtomicLong；高并发统计（如 PV、QPS）用 LongAdder。"},{question:"volatile 和原子类的区别？",answer:"volatile 只保证可见性和有序性，不保证原子性。例如 volatile int count，count++ 操作包含读取-修改-写入三步，volatile 无法保证这三步的原子性，仍会导致数据竞争。原子类（如 AtomicInteger）基于 CAS 实现，保证复合操作的原子性。简单说：volatile 适合单一读写操作，原子类适合复合操作（递增、递减、CAS 更新）。"},{question:"Unsafe 类的作用是什么？为什么叫 Unsafe？",answer:"作用：Unsafe 提供底层内存操作能力，包括：① CAS 操作（compareAndSwapInt 等）；② 直接内存分配/释放（allocateMemory/freeMemory）；③ 内存屏障（loadFence/storeFence）；④ 对象字段偏移量计算（objectFieldOffset）。叫 Unsafe 的原因：① 绕过 JVM 类型检查和内存管理，容易导致内存泄漏、段错误；② 破坏 Java 沙箱安全模型；③ 不同 JDK 版本 API 不兼容；④ 普通开发者误用风险极高。因此仅限框架开发者使用。"},{question:"字段更新器（FieldUpdater）的使用场景和限制？",answer:"使用场景：当类中有多个 volatile 字段需要原子更新，但不想为每个字段创建单独的原子对象时，使用字段更新器可以节省内存。例如一个 Product 类有 stock、version 等多个字段，可以用一个 AtomicIntegerFieldUpdater 更新所有 int 字段。限制：① 字段必须是 volatile；② 字段不能是 static；③ 只能访问当前类及其子类的字段；④ 更新器必须是静态单例；⑤ 性能略低于专用原子类（因为需要反射查找字段）。"}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、对比总结"}),e.jsxs("table",{className:"w-full border-collapse my-6 text-[13px] sm:text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"原子类"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"适用场景"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"性能特点"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"关键特性"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"AtomicInteger/Long"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"通用计数器、状态标志"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"低竞争时优异，高竞争时自旋开销大"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"CAS、自旋、函数式更新"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"AtomicReference"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"原子更新对象引用"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"与 AtomicInteger 相当"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"引用级别 CAS"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"AtomicStampedReference"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"解决 ABA 问题"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"额外版本号开销"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"值 + 版本号双重校验"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"LongAdder"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"高并发累加统计"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"高并发时性能提升 5-10 倍"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"分段累加、最终一致性"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"FieldUpdater"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"原子更新类的字段"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"略低于专用原子类"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"节省内存、反射开销"})]})]})]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、知识关联"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"原子操作是无锁并发编程的核心，与以下知识点密切相关："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"前置知识："}),e.jsx("a",{href:"/docs/03-multithreading/multi-threading-basics",className:"text-accent hover:underline",children:"多线程基础"})," — 理解线程安全、原子性、可见性概念"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"关联知识："}),e.jsx("a",{href:"/docs/03-multithreading/synchronization",className:"text-accent hover:underline",children:"同步机制"})," — synchronized、ReentrantLock 等传统锁机制"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"关联知识："}),e.jsx("a",{href:"/docs/02-collections/concurrent-collections",className:"text-accent hover:underline",children:"并发集合类"})," — ConcurrentHashMap 内部使用 CAS + synchronized"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"进阶知识："}),e.jsx("a",{href:"/docs/04-jvm/jvm-memory-model",className:"text-accent hover:underline",children:"JVM 内存模型"})," — volatile 的内存语义、happens-before 原则"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"进阶知识："}),e.jsx("a",{href:"/docs/03-multithreading/thread-pool",className:"text-accent hover:underline",children:"线程池"})," — ThreadPoolExecutor 使用 AtomicInteger 管理线程数"]})]}),e.jsx(d,{...a(r.category,r.id)})]})}),e.jsx(c,{items:m})]})}export{b as default};
