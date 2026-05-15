import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as d}from"./SideNote-BKvanovA.js";import{C as t,A as o,S as n}from"./ArticleNav-DhfiS38Y.js";import{D as l}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const x=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、JVM内存结构总览",level:2},{id:"heap",text:"二、堆（Heap）",level:2},{id:"stack",text:"三、虚拟机栈（Stack）",level:2},{id:"method-area",text:"四、方法区（Method Area）",level:2},{id:"pc-register",text:"五、程序计数器",level:2},{id:"native-method-stack",text:"六、本地方法栈",level:2},{id:"direct-memory",text:"七、直接内存",level:2},{id:"memory-leak",text:"八、内存泄漏与溢出",level:2},{id:"misconceptions",text:"九、常见误区",level:2},{id:"interview",text:"十、面试真题",level:2},{id:"related",text:"十一、知识关联",level:2}];function f({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(a,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["JVM内存结构是Java虚拟机运行时数据区的组织方式，包含",e.jsx("strong",{className:"text-accent",children:"堆、栈、方法区、程序计数器和本地方法栈"}),"五个核心区域， 每个区域承担不同的职责，共同支撑Java程序的执行和对象管理。"]})}),e.jsx(t,{type:"tip",title:"为什么需要了解JVM内存结构？",children:"理解内存结构是性能调优、排查OOM错误、避免内存泄漏的基础。不同的内存区域有不同的生命周期和管理策略，直接影响应用的稳定性和性能。"}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、JVM内存结构总览"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"JVM将运行时数据区划分为多个部分，每个部分有明确的职责和生命周期："}),e.jsx(l,{title:"JVM运行时数据区",children:e.jsx("pre",{className:"text-[12px] sm:text-[13px] leading-relaxed text-left font-mono",children:`┌─────────────────────────────────────────┐
│         线程共享区域                     │
│  ┌──────────────┐  ┌────────────────┐   │
│  │    堆(Heap)   │  │  方法区(Method  │   │
│  │              │  │     Area)       │   │
│  │ - 对象实例    │  │                │   │
│  │ - 数组        │  │ - 类元数据      │   │
│  │ - GC主要区域   │  │ - 常量池        │   │
│  └──────────────┘  │ - 静态变量      │   │
│                    └────────────────┘   │
├─────────────────────────────────────────┤
│         线程私有区域                     │
│  ┌──────────────┐  ┌────────────────┐   │
│  │ 虚拟机栈(Stack)│  │  程序计数器(PC) │   │
│  │              │  │                │   │
│  │ - 局部变量表   │  │ - 当前行号      │   │
│  │ - 操作数栈     │  │ - 字节码地址    │   │
│  │ - 动态链接     │  │                │   │
│  │ - 方法出口     │  │                │   │
│  └──────────────┘  └────────────────┘   │
│  ┌──────────────┐                       │
│  │ 本地方法栈     │                       │
│  │              │                       │
│  │ - Native方法  │                       │
│  └──────────────┘                       │
└─────────────────────────────────────────┘`})}),e.jsxs(d,{children:[e.jsx("strong",{children:"线程共享"}),"：堆和方法区被所有线程共享，需要考虑线程安全问题。",e.jsx("br",{}),e.jsx("strong",{children:"线程私有"}),"：栈、程序计数器和本地方法栈是线程私有的，不存在线程安全问题。"]}),e.jsx("h2",{id:"heap",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、堆（Heap）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["堆是JVM中最大的内存区域，用于存储",e.jsx("strong",{className:"text-accent",children:"对象实例和数组"}),"，是垃圾收集器管理的主要区域。"]}),e.jsx("h3",{id:"heap-structure",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"堆的分区结构"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"现代JVM（如HotSpot）将堆分为新生代和老年代："}),e.jsx(r,{code:`// 查看堆内存配置
public class HeapInfo {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        
        System.out.println("最大堆内存: " + 
            runtime.maxMemory() / 1024 / 1024 + " MB");
        System.out.println("已分配堆内存: " + 
            runtime.totalMemory() / 1024 / 1024 + " MB");
        System.out.println("空闲堆内存: " + 
            runtime.freeMemory() / 1024 / 1024 + " MB");
        System.out.println("已使用堆内存: " + 
            (runtime.totalMemory() - runtime.freeMemory()) / 1024 / 1024 + " MB");
    }
}

// 输出示例：
// 最大堆内存: 4096 MB
// 已分配堆内存: 512 MB
// 空闲堆内存: 480 MB
// 已使用堆内存: 32 MB`,language:"java",description:"获取堆内存使用情况"}),e.jsxs(t,{type:"info",title:"新生代与老年代",children:[e.jsx("strong",{children:"新生代（Young Generation）"}),"：存放新创建的对象，分为 Eden 区和两个 Survivor 区（S0、S1）。大多数对象在新生代就被回收。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"老年代（Old Generation）"}),"：存放长期存活的对象。当对象在新生代经过多次GC仍存活，会被晋升到老年代。"]}),e.jsx("h3",{id:"heap-parameters",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"常用堆参数"}),e.jsxs("table",{className:"w-full border-collapse my-4 text-[13px] sm:text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"参数"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"说明"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"示例"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-Xms"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"初始堆大小"}),e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-Xms512m"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-Xmx"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"最大堆大小"}),e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-Xmx4g"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-Xmn"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"新生代大小"}),e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-Xmn1g"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-XX:NewRatio"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"老年代/新生代比例"}),e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-XX:NewRatio=2"})]})]})]}),e.jsx("h2",{id:"stack",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、虚拟机栈（Stack）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["虚拟机栈是",e.jsx("strong",{className:"text-accent",children:"线程私有"}),"的内存区域，描述Java方法执行的内存模型。每个方法执行时会创建一个栈帧（Stack Frame）。"]}),e.jsx("h3",{id:"stack-frame",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"栈帧结构"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"每个栈帧包含以下部分："}),e.jsx(l,{title:"栈帧结构",children:e.jsx("pre",{className:"text-[12px] sm:text-[13px] leading-relaxed text-left font-mono",children:`┌─────────────────────────┐
│      栈帧 (Stack Frame)  │
├─────────────────────────┤
│  局部变量表              │
│  - 方法参数              │
│  - 局部变量              │
│  - this引用              │
├─────────────────────────┤
│  操作数栈                │
│  - 临时计算结果           │
│  - 方法调用参数           │
├─────────────────────────┤
│  动态链接                 │
│  - 指向运行时常量池       │
├─────────────────────────┤
│  方法返回地址             │
│  - PC寄存器恢复位置       │
└─────────────────────────┘`})}),e.jsx(r,{code:`public class StackExample {
    private static int count = 0;
    
    // 递归调用演示栈溢出
    public static void recursiveCall() {
        count++;
        System.out.println("调用深度: " + count);
        recursiveCall(); // 无限递归
    }
    
    public static void main(String[] args) {
        try {
            recursiveCall();
        } catch (StackOverflowError e) {
            System.out.println("栈溢出！最大调用深度: " + count);
            // 输出：调用深度: 10000+（取决于-Xss参数）
            //       栈溢出！最大调用深度: 10xxx
        }
    }
}`,language:"java",description:"演示栈溢出（StackOverflowError）"}),e.jsxs(t,{type:"danger",title:"栈溢出风险",children:[e.jsx("strong",{children:"StackOverflowError"}),"：当线程请求的栈深度超过虚拟机允许的最大深度时抛出。常见于无限递归或过深的递归调用。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"OutOfMemoryError"}),"：如果栈扩展时无法申请到足够内存，也会抛出OOM（较少见）。"]}),e.jsx("h3",{id:"stack-parameters",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"栈相关参数"}),e.jsxs("table",{className:"w-full border-collapse my-4 text-[13px] sm:text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"参数"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"说明"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"默认值"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-Xss"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"每个线程的栈大小"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"1MB（64位JVM）"})]})})]}),e.jsxs(d,{children:[e.jsx("strong",{children:"-Xss设置建议："}),e.jsx("br",{}),"• 线程多且栈帧小：减小-Xss（如256k），节省内存",e.jsx("br",{}),"• 递归深度大或局部变量多：增大-Xss（如2MB），避免栈溢出",e.jsx("br",{}),"• 生产环境需根据实际场景压测确定"]}),e.jsx("h2",{id:"method-area",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、方法区（Method Area）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["方法区是",e.jsx("strong",{className:"text-accent",children:"线程共享"}),"的内存区域，用于存储已被虚拟机加载的类信息、常量、静态变量等。"]}),e.jsx("h3",{id:"method-area-evolution",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"方法区的演进"}),e.jsxs("table",{className:"w-full border-collapse my-4 text-[13px] sm:text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"JDK版本"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"实现"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"特点"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"JDK 7及以前"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"永久代（PermGen）"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"属于堆的一部分，容易OOM"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"JDK 8及以后"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"元空间（Metaspace）"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"使用本地内存，默认无上限"})]})]})]}),e.jsx(r,{code:`// 查看方法区（元空间）使用情况
public class MetaspaceInfo {
    public static void main(String[] args) {
        java.lang.management.MemoryMXBean memoryBean = 
            java.lang.management.ManagementFactory.getMemoryMXBean();
        
        for (java.lang.management.MemoryPoolMXBean pool : 
             memoryBean.getMemoryPoolMXBeans()) {
            if (pool.getName().contains("Metaspace")) {
                System.out.println("名称: " + pool.getName());
                System.out.println("已使用: " + 
                    pool.getUsage().getUsed() / 1024 / 1024 + " MB");
                System.out.println("最大值: " + 
                    pool.getUsage().getMax() / 1024 / 1024 + " MB");
            }
        }
    }
}

// 输出示例：
// 名称: Metaspace
// 已使用: 25 MB
// 最大值: -1 MB（-1表示无限制）`,language:"java",description:"监控元空间使用情况"}),e.jsx("h3",{id:"metaspace-parameters",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"元空间参数"}),e.jsxs("table",{className:"w-full border-collapse my-4 text-[13px] sm:text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"参数"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"说明"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"示例"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-XX:MetaspaceSize"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"初始元空间大小"}),e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-XX:MetaspaceSize=128m"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-XX:MaxMetaspaceSize"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"最大元空间大小"}),e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"-XX:MaxMetaspaceSize=512m"})]})]})]}),e.jsxs(t,{type:"warning",title:"元空间OOM风险",children:["虽然元空间默认无上限，但如果加载大量类（如动态代理、OSGi、热部署），可能导致本地内存耗尽。生产环境建议设置 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"-XX:MaxMetaspaceSize"})," 限制。"]}),e.jsx("h2",{id:"pc-register",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、程序计数器"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["程序计数器（Program Counter Register）是",e.jsx("strong",{className:"text-accent",children:"一块较小的内存空间"}),"，可以看作是当前线程所执行的字节码的行号指示器。"]}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"线程私有"}),"：每条线程都有一个独立的程序计数器"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"生命周期"}),"：与线程相同"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"作用"}),"：记录当前线程执行的字节码指令地址"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"唯一不会OOM的区域"}),"：因为只存储很小的行号信息"]})]}),e.jsx(d,{children:"如果线程正在执行的是Java方法，程序计数器记录的是正在执行的虚拟机字节码指令的地址；如果是Native方法，则计数器值为空（Undefined）。"}),e.jsx("h2",{id:"native-method-stack",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、本地方法栈"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"本地方法栈（Native Method Stack）与虚拟机栈类似，区别在于："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4",children:[e.jsxs("li",{children:["虚拟机栈为执行",e.jsx("strong",{className:"text-accent",children:"Java方法"}),"服务"]}),e.jsxs("li",{children:["本地方法栈为执行",e.jsx("strong",{className:"text-accent",children:"Native方法"}),"服务"]})]}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HotSpot虚拟机将本地方法栈和虚拟机栈合二为一，因此不需要单独区分。"}),e.jsx(r,{code:`public class NativeMethodExample {
    // 声明native方法
    public native void nativePrint();
    
    static {
        // 加载本地库
        System.loadLibrary("native-lib");
    }
    
    public static void main(String[] args) {
        new NativeMethodExample().nativePrint();
        // 调用C/C++实现的本地方法
        // 本地方法栈会为该调用分配内存
    }
}`,language:"java",description:"Native方法调用示例"}),e.jsx("h2",{id:"direct-memory",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、直接内存"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["直接内存（Direct Memory）不是JVM运行时数据区的一部分，但频繁被使用。通过 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"ByteBuffer.allocateDirect()"})," 分配。"]}),e.jsx(r,{code:`import java.nio.ByteBuffer;

public class DirectMemoryExample {
    public static void main(String[] args) {
        // 分配直接内存（不在堆中）
        ByteBuffer directBuffer = ByteBuffer.allocateDirect(1024 * 1024); // 1MB
        
        System.out.println("直接内存分配成功");
        System.out.println("容量: " + directBuffer.capacity() + " bytes");
        
        // 直接内存的优势：
        // 1. 避免Java堆和本地堆之间的数据拷贝
        // 2. I/O操作性能更高（零拷贝）
        
        // 注意：直接内存不受GC直接管理，需要手动释放或使用GC间接回收
    }
}`,language:"java",description:"直接内存分配与使用"}),e.jsxs(t,{type:"info",title:"直接内存的应用场景",children:[e.jsx("strong",{children:"NIO零拷贝"}),"：网络传输、文件I/O时避免数据在用户态和内核态之间复制。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"注意事项"}),"：直接内存分配和回收成本较高，适合大缓冲区、长生命周期的场景。"]}),e.jsx("h2",{id:"memory-leak",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、内存泄漏与溢出"}),e.jsx("h3",{id:"oom-types",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"常见的OOM类型"}),e.jsxs("table",{className:"w-full border-collapse my-4 text-[13px] sm:text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"异常类型"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"原因"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"解决方案"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{className:"border border-border-light px-3 py-2 font-mono",children:["OutOfMemoryError:",e.jsx("br",{}),"Java heap space"]}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"堆内存不足"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"增大-Xmx、优化代码、排查内存泄漏"})]}),e.jsxs("tr",{children:[e.jsxs("td",{className:"border border-border-light px-3 py-2 font-mono",children:["OutOfMemoryError:",e.jsx("br",{}),"GC overhead limit exceeded"]}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"GC时间占比超过98%"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"检查是否有内存泄漏、优化GC策略"})]}),e.jsxs("tr",{children:[e.jsxs("td",{className:"border border-border-light px-3 py-2 font-mono",children:["OutOfMemoryError:",e.jsx("br",{}),"Metaspace"]}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"元空间不足"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"增大MaxMetaspaceSize、减少动态类生成"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-mono",children:"StackOverflowError"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"栈深度超限"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"增大-Xss、优化递归逻辑"})]})]})]}),e.jsx(r,{code:`import java.util.ArrayList;
import java.util.List;

public class MemoryLeakDemo {
    private static List<byte[]> leakList = new ArrayList<>();
    
    public static void simulateLeak() {
        // 模拟内存泄漏：不断添加对象但不释放
        while (true) {
            leakList.add(new byte[1024 * 1024]); // 每次添加1MB
            System.out.println("已分配: " + 
                leakList.size() + " MB");
            
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    
    public static void main(String[] args) {
        // 运行参数：-Xmx100m
        // 约100次循环后抛出：OutOfMemoryError: Java heap space
        simulateLeak();
    }
}`,language:"java",description:"模拟堆内存泄漏"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、常见误区"}),e.jsxs(t,{type:"danger",title:"误区1：栈内存泄漏会导致OOM",children:[e.jsx("strong",{children:"错误"}),"：认为栈会发生内存泄漏。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"正确"}),"：栈是线程私有的，方法执行完毕后栈帧自动弹出，不会泄漏。栈只会因递归过深导致StackOverflowError。"]}),e.jsxs(t,{type:"danger",title:"误区2：方法区就是永久代",children:[e.jsx("strong",{children:"错误"}),"：认为方法区和永久代是同一个概念。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"正确"}),"：方法区是JVM规范中的概念，永久代是HotSpot JDK 7及以前的实现。JDK 8之后用元空间替代永久代，但方法区的概念依然存在。"]}),e.jsxs(t,{type:"danger",title:"误区3：堆越大越好",children:[e.jsx("strong",{children:"错误"}),"：认为堆内存设置越大性能越好。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"正确"}),"：堆过大会导致GC停顿时间变长。应根据应用实际需求设置合理的堆大小，并选择合适的GC算法。一般建议设置为物理内存的50%-75%。"]}),e.jsxs(t,{type:"danger",title:"误区4：程序计数器会OOM",children:[e.jsx("strong",{children:"错误"}),"：认为程序计数器可能抛出OutOfMemoryError。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"正确"}),"：程序计数器是JVM规范中唯一没有规定任何OutOfMemoryError情况的区域，因为它只存储很小的行号信息。"]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、面试真题"}),e.jsx(m,{questions:[{question:"JVM内存结构有哪些区域？哪些是线程共享的，哪些是线程私有的？",answer:`JVM内存结构包括：堆（Heap）、方法区（Method Area）、虚拟机栈（Stack）、程序计数器（PC Register）、本地方法栈（Native Method Stack）。

线程共享：堆、方法区
线程私有：虚拟机栈、程序计数器、本地方法栈`},{question:"堆为什么要分新生代和老年代？",answer:`基于弱分代假说：绝大多数对象朝生夕死。分代后可以采用不同的GC策略：
• 新生代：使用复制算法，效率高
• 老年代：使用标记-清除或标记-整理算法
这样能提升GC效率，减少停顿时间。`},{question:"JDK 8为什么用元空间替换永久代？",answer:`主要原因：
1. 永久代大小难以确定：设置太小易OOM，太大浪费内存
2. 元空间使用本地内存，默认无上限，更灵活
3. 简化Full GC：永久代回收效率低，元空间不受JVM GC直接管理
4. 与JRockit统一：Oracle收购BEA后，希望两个JVM实现保持一致`},{question:"什么情况下会发生StackOverflowError？如何解决？",answer:`发生场景：
• 无限递归调用
• 递归深度过大
• 方法局部变量过多

解决方案：
• 优化递归逻辑，改为迭代
• 增大-Xss参数（如从1MB增加到2MB）
• 减少方法局部变量数量`},{question:"如何排查内存泄漏问题？",answer:`排查步骤：
1. 监控：使用jstat、JVisualVM监控堆内存使用趋势
2. dump：使用jmap -dump生成堆转储文件
3. 分析：使用MAT（Memory Analyzer Tool）分析dump文件
4. 定位：查找支配树（Dominator Tree），找到占用内存最多的对象
5. 修复：检查代码中是否有未释放的资源、静态集合持续增长等问题`},{question:"直接内存和堆内存有什么区别？",answer:`区别：
1. 分配位置：直接内存在本地内存（堆外），堆内存在Java堆
2. GC管理：直接内存不受GC直接管理，堆内存由GC管理
3. 性能：直接内存I/O性能更高（零拷贝），但分配/回收成本高
4. 适用场景：直接内存适合大缓冲区、长时间使用的NIO操作；堆内存适合普通对象存储`}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 my-6",children:[e.jsxs("a",{href:"/docs/04-jvm/garbage-collection",className:"block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"→ 垃圾收集器详解"}),e.jsx("p",{className:"text-sm text-ink-muted",children:"了解不同内存区域的GC算法和收集器选择"})]}),e.jsxs("a",{href:"/docs/04-jvm/jvm-tuning",className:"block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"→ JVM调优实战"}),e.jsx("p",{className:"text-sm text-ink-muted",children:"学习如何根据内存结构进行JVM参数调优"})]}),e.jsxs("a",{href:"/docs/04-jvm/class-loading",className:"block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"→ 类加载机制"}),e.jsx("p",{className:"text-sm text-ink-muted",children:"了解类信息如何存储在方法区/元空间"})]}),e.jsxs("a",{href:"/docs/03-multithreading/multi-threading-basics",className:"block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"→ 多线程基础"}),e.jsx("p",{className:"text-sm text-ink-muted",children:"理解线程私有内存区域的线程安全特性"})]})]}),e.jsx(o,{...i(s.category,s.id)})]})}),e.jsx(n,{items:x})]})}export{f as default};
