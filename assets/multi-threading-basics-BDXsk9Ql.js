import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as r}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as l}from"./SideNote-BKvanovA.js";import{C as t,A as d,S as c}from"./ArticleNav-DhfiS38Y.js";import{C as x}from"./ContextSwitcher-Cjd-h5IL.js";import{D as a}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const o=[{id:"definition",text:"一句话定义",level:2},{id:"creation-methods",text:"一、线程创建方式",level:2},{id:"extend-thread",text:"1.1 继承 Thread 类",level:3},{id:"implement-runnable",text:"1.2 实现 Runnable 接口",level:3},{id:"implement-callable",text:"1.3 实现 Callable 接口",level:3},{id:"thread-vs-runnable",text:"二、Thread vs Runnable 对比",level:2},{id:"lifecycle",text:"三、线程生命周期",level:2},{id:"six-states",text:"3.1 六种状态详解",level:3},{id:"state-transitions",text:"3.2 状态转换图",level:3},{id:"thread-safety",text:"四、线程安全问题",level:2},{id:"atomicity-visibility-ordering",text:"4.1 原子性、可见性、有序性",level:3},{id:"common-problems",text:"4.2 常见问题示例",level:3},{id:"misconceptions",text:"五、常见误区",level:2},{id:"interview",text:"六、面试真题",level:2},{id:"comparison",text:"七、对比总结",level:2},{id:"related",text:"八、知识关联",level:2}];function f({meta:n}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(r,{meta:n,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Java 多线程是通过",e.jsx("strong",{className:"text-accent",children:"并发执行多个线程"}),"来提升程序性能的技术，每个线程是独立的执行流，共享进程资源（堆内存）， 但拥有独立的栈空间。掌握线程创建、生命周期管理和线程安全是构建高并发系统的基石。"]})}),e.jsx(t,{type:"tip",title:"为什么必须掌握多线程？",children:"现代 CPU 都是多核架构，单线程无法充分利用硬件资源。多线程可以并行处理任务（如 Web 服务器同时响应多个请求、批量数据处理），显著提升吞吐量。但同时也引入了线程安全、死锁等复杂问题，需要深入理解底层原理。"}),e.jsx("h2",{id:"creation-methods",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、线程创建方式"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java 提供了三种创建线程的方式：",e.jsx("strong",{children:"继承 Thread 类"}),"、",e.jsx("strong",{children:"实现 Runnable 接口"}),"和",e.jsx("strong",{children:"实现 Callable 接口"}),"。 其中前两种是最常用的方式，Callable 则用于需要返回值的场景。"]}),e.jsx(a,{title:"线程创建方式全景图",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
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
            `})}),e.jsx("h3",{id:"extend-thread",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.1 继承 Thread 类"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["最直接的方式是创建一个类继承 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"java.lang.Thread"}),"， 重写 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"run()"})," 方法，然后调用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"start()"})," 启动线程。"]}),e.jsx(s,{code:`// 方式1：继承 Thread 类
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
}`,language:"java",highlights:[2,4,22,23],filename:"MyThread.java",description:"继承 Thread 类创建线程"}),e.jsx(t,{type:"warning",title:"为什么不推荐继承 Thread？",children:'Java 是单继承机制，如果类已经继承了其他父类，就无法再继承 Thread。此外，这种方式将"任务逻辑"和"线程控制"耦合在一起，不符合面向对象的设计原则。'}),e.jsx("h3",{id:"implement-runnable",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.2 实现 Runnable 接口"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"推荐方式"}),"：实现 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"java.lang.Runnable"})," 接口， 实现 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"run()"})," 方法，然后将 Runnable 实例传递给 Thread 构造函数。"]}),e.jsx(s,{code:`// 方式2：实现 Runnable 接口（推荐）
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
}`,language:"java",highlights:[2,10,31,36,37],filename:"MyTask.java",description:"实现 Runnable 接口创建线程（推荐）"}),e.jsx(l,{label:"优势分析",children:'Runnable 方式解耦了"任务逻辑"和"线程控制"，同一个 Runnable 可以被多个 Thread 执行（线程池场景），也便于单元测试。此外，由于 Java 支持多实现，类可以同时实现 Runnable 和其他接口。'}),e.jsx("h3",{id:"implement-callable",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.3 实现 Callable 接口"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["当需要",e.jsx("strong",{children:"返回值"}),"或",e.jsx("strong",{children:"抛出受检异常"}),"时，使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"java.util.concurrent.Callable"})," 接口。 它需要通过 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"FutureTask"})," 包装后才能交给 Thread 执行。"]}),e.jsx(s,{code:`import java.util.concurrent.Callable;
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
}`,language:"java",highlights:[5,13,33,36,43],filename:"MyCalculator.java",description:"实现 Callable 接口创建线程（有返回值）"}),e.jsx(t,{type:"info",title:"Callable vs Runnable 核心区别",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"返回值"}),"：Callable 的 ",e.jsx("code",{className:"font-mono text-[12px]",children:"call()"})," 有返回值，Runnable 的 ",e.jsx("code",{className:"font-mono text-[12px]",children:"run()"})," 无返回值"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"异常"}),"：Callable 可以抛出受检异常，Runnable 只能捕获内部异常"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"使用场景"}),"：Callable 适合需要获取结果的场景（如并行计算、数据库查询），Runnable 适合纯任务执行"]})]})}),e.jsx("h2",{id:"thread-vs-runnable",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、Thread vs Runnable 对比"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"理解 Thread 和 Runnable 的本质区别，有助于在正确场景选择合适的方式。"}),e.jsxs("table",{className:"w-full border-collapse my-5 text-[13px] sm:text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-light border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"对比维度"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"继承 Thread"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"实现 Runnable"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-3 px-4 font-medium text-ink",children:"继承关系"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"单继承，占用继承名额"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"多实现，不影响其他继承"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"py-3 px-4 font-medium text-ink",children:"职责分离"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"任务和线程耦合"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"任务和线程解耦 ✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-3 px-4 font-medium text-ink",children:"资源共享"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"每个 Thread 独立实例"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"同一 Runnable 可被多个 Thread 共享 ✅"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"py-3 px-4 font-medium text-ink",children:"扩展性"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"难以适配线程池"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"天然适配线程池 ✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-3 px-4 font-medium text-ink",children:"推荐程度"}),e.jsx("td",{className:"py-3 px-4 text-rose font-medium",children:"❌ 不推荐"}),e.jsx("td",{className:"py-3 px-4 text-teal font-medium",children:"✅ 强烈推荐"})]})]})]}),e.jsx(t,{type:"danger",title:"经典面试题：多个线程共享数据",children:"如果使用继承 Thread 的方式，每个 Thread 实例都有独立的成员变量，无法共享数据。而 Runnable 可以实现同一个实例被多个 Thread 共享，天然支持数据共享场景（如售票系统）。"}),e.jsx(x,{simpleContent:e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:e.jsx("strong",{children:"场景化选择指南："})}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-accent",children:"简单任务"})," → 实现 Runnable，代码简洁且解耦"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-accent",children:"需要返回值"})," → 使用 Callable + FutureTask"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-accent",children:"线程池场景"})," → 必须用 Runnable 或 Callable（线程池不接受 Thread 子类）"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-rose",children:"快速原型"})," → 可用 Thread（仅演示，生产环境不推荐）"]})]}),e.jsx(s,{code:`// ✅ 推荐：Runnable 方式
Runnable task = () -> System.out.println("Hello from " + Thread.currentThread().getName());
new Thread(task, "Worker-1").start();

// ✅ 需要结果：Callable 方式
Callable<Integer> calc = () -> 42;
FutureTask<Integer> future = new FutureTask<>(calc);
new Thread(future).start();
Integer result = future.get(); // 阻塞获取结果

// ❌ 不推荐：直接继承 Thread
class MyThread extends Thread {
    public void run() { /* ... */ }
}
new MyThread().start();`,language:"java",highlights:[2,6,10],filename:"ScenarioExamples.java",description:"不同场景的代码示例"})]}),hardcoreContent:e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:e.jsx("strong",{children:"底层原理深度解析："})}),e.jsxs("ol",{className:"list-decimal list-inside space-y-3 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Thread 的本质"}),"：Thread 是 JVM 对操作系统线程的抽象，调用 ",e.jsx("code",{className:"font-mono text-[12px]",children:"start()"})," 会通过 JNI 调用操作系统的 ",e.jsx("code",{className:"font-mono text-[12px]",children:"pthread_create"}),"（Linux）或 ",e.jsx("code",{className:"font-mono text-[12px]",children:"CreateThread"}),"（Windows）创建原生线程。"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Runnable 的设计哲学"}),"：遵循",e.jsx("strong",{children:"命令模式"}),'（Command Pattern），将"任务逻辑"封装为对象，与"执行机制"（Thread）解耦。这使得同一任务可以被不同执行器复用（如 ThreadPoolExecutor、ForkJoinPool）。']}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Callable 的实现机制"}),"：Callable 通过 ",e.jsx("code",{className:"font-mono text-[12px]",children:"FutureTask"})," 包装，FutureTask 内部维护了状态机（NEW → COMPLETING → NORMAL/EXCEPTIONAL/CANCELLED），使用 ",e.jsx("code",{className:"font-mono text-[12px]",children:"Unsafe.park/unpark"})," 实现阻塞等待，基于 ",e.jsx("code",{className:"font-mono text-[12px]",children:"CAS"})," 保证状态转换的原子性。"]})]}),e.jsx(s,{code:`// FutureTask 核心源码简化版
public class FutureTask<V> implements RunnableFuture<V> {
    private volatile int state; // NEW=0, COMPLETING=1, NORMAL=2...
    private Callable<V> callable;
    private Object outcome; // 存储结果或异常
    
    public V get() throws InterruptedException, ExecutionException {
        int s = state;
        if (s <= COMPLETING) // 如果未完成，阻塞等待
            s = awaitDone(false, 0L);
        return report(s); // 返回结果或抛出异常
    }
    
    public void run() {
        if (state != NEW || !UNSAFE.compareAndSwapObject(...))
            return;
        try {
            Callable<V> c = callable;
            if (c != null && state == NEW) {
                V result = c.call(); // 执行任务
                set(result); // CAS 设置结果
            }
        } catch (Throwable ex) {
            setException(ex); // CAS 设置异常
        }
    }
}`,language:"java",highlights:[2,7,15,21,24],filename:"FutureTask-Core.java",description:"FutureTask 底层实现原理"}),e.jsxs(t,{type:"info",title:"关键洞察",children:["Callable 的价值不仅在于返回值，更在于它提供了",e.jsx("strong",{children:"异步任务的生命周期管理"}),'能力（取消、超时、异常传播），这是构建现代并发框架（如 CompletableFuture）的基础。Thread 和 Runnable 只是"启动即忘"的火射模型，缺乏对任务状态的精细控制。']})]})}),e.jsx("h2",{id:"lifecycle",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、线程生命周期"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java 线程从创建到终止经历",e.jsx("strong",{children:"六种状态"}),"，定义在 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"java.lang.Thread.State"})," 枚举中。 理解状态转换是调试并发问题的关键。"]}),e.jsx("h3",{id:"six-states",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 六种状态详解"}),e.jsxs("table",{className:"w-full border-collapse my-5 text-[13px] sm:text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-light border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"状态"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"说明"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"触发条件"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-3 px-4 font-mono text-accent font-medium",children:"NEW"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"新建状态"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"创建 Thread 对象但未调用 start()"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"py-3 px-4 font-mono text-accent font-medium",children:"RUNNABLE"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"可运行状态"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"调用 start() 后，可能在运行也可能在等待 CPU"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-3 px-4 font-mono text-accent font-medium",children:"BLOCKED"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"阻塞状态"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"等待获取 synchronized 锁"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"py-3 px-4 font-mono text-accent font-medium",children:"WAITING"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"无限期等待"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"调用 Object.wait()、Thread.join()、LockSupport.park()"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-3 px-4 font-mono text-accent font-medium",children:"TIMED_WAITING"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"限期等待"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"调用 Thread.sleep(long)、wait(long)、join(long)"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"py-3 px-4 font-mono text-accent font-medium",children:"TERMINATED"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"终止状态"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"run() 方法执行完毕或异常退出"})]})]})]}),e.jsx(s,{code:`public class ThreadStateDemo {
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
}`,language:"java",highlights:[16,20,27],filename:"ThreadStateDemo.java",description:"观察线程状态变化"}),e.jsx("h3",{id:"state-transitions",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 状态转换图"}),e.jsx(a,{title:"Java 线程状态转换图",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
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
            `})}),e.jsx(l,{label:"RUNNABLE 的特殊性",children:'Java 的 RUNNABLE 状态实际上包含了操作系统层面的"就绪"和"运行"两种状态。线程可能在 CPU 上执行，也可能在等待 CPU 时间片，JVM 不区分这两种情况。'}),e.jsx("h2",{id:"thread-safety",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、线程安全问题"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["当多个线程同时访问共享资源且没有适当的同步机制时，就会出现",e.jsx("strong",{children:"线程安全问题"}),"，导致数据不一致、脏读、丢失更新等严重 Bug。"]}),e.jsx("h3",{id:"atomicity-visibility-ordering",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 原子性、可见性、有序性"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"线程安全问题的根源可以归结为三大特性被破坏："}),e.jsxs("table",{className:"w-full border-collapse my-5 text-[13px] sm:text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-light border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"含义"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"解决方案"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-3 px-4 font-medium text-ink",children:"原子性"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"操作不可分割，要么全部执行成功，要么全部不执行"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"synchronized、ReentrantLock、Atomic 类"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"py-3 px-4 font-medium text-ink",children:"可见性"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"一个线程修改共享变量后，其他线程能立即看到最新值"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"volatile、synchronized、final"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-3 px-4 font-medium text-ink",children:"有序性"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"程序执行顺序符合代码书写顺序（禁止指令重排序）"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"volatile、synchronized、happens-before"})]})]})]}),e.jsx("h3",{id:"common-problems",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.2 常见问题示例"}),e.jsxs(t,{type:"danger",title:"经典案例：计数器丢失更新",children:["以下代码展示了典型的线程安全问题：多个线程同时对共享变量 ",e.jsx("code",{className:"font-mono text-[12px]",children:"count"})," 进行递增操作，最终结果小于预期值。"]}),e.jsx(s,{code:`public class CounterProblem {
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
}`,language:"java",highlights:[11,22],filename:"CounterProblem.java",description:"线程安全问题演示：计数器丢失更新"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"问题分析"}),"：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"count++"})," 看似一条语句，实际上包含三个步骤："]}),e.jsxs("ol",{className:"list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-4 ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"读取"}),"：从主内存读取 count 的值到工作内存"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"修改"}),"：在工作内存中将值加 1"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"写入"}),"：将新值写回主内存"]})]}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"当两个线程同时执行这三个步骤时，可能发生以下交错："}),e.jsx(a,{title:"竞态条件时序图",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
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
            `})}),e.jsx(s,{code:`// ✅ 修复方案1：使用 synchronized
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
}`,language:"java",highlights:[12,32,37],filename:"CounterFixed.java",description:"线程安全修复方案对比"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、常见误区"}),e.jsxs(t,{type:"danger",title:"误区1：start() 和 run() 的区别",children:[e.jsxs("p",{className:"mt-2",children:[e.jsx("strong",{children:"错误认知"}),"：调用 ",e.jsx("code",{className:"font-mono text-[12px]",children:"run()"})," 也能启动新线程。"]}),e.jsxs("p",{className:"mt-2",children:[e.jsx("strong",{children:"真相"}),"：",e.jsx("code",{className:"font-mono text-[12px]",children:"run()"})," 只是普通方法调用，仍在当前线程执行；只有 ",e.jsx("code",{className:"font-mono text-[12px]",children:"start()"})," 才会创建新线程并异步执行 ",e.jsx("code",{className:"font-mono text-[12px]",children:"run()"}),"。"]})]}),e.jsxs(t,{type:"danger",title:"误区2：线程越多越好",children:[e.jsxs("p",{className:"mt-2",children:[e.jsx("strong",{children:"错误认知"}),"：创建更多线程可以提升性能。"]}),e.jsxs("p",{className:"mt-2",children:[e.jsx("strong",{children:"真相"}),"：线程创建和切换有开销（上下文切换、内存占用）。CPU 密集型任务应限制线程数（通常为 CPU 核心数），I/O 密集型可适当增加。过度创建线程会导致性能下降甚至 OOM。"]})]}),e.jsxs(t,{type:"danger",title:"误区3：volatile 能保证原子性",children:[e.jsxs("p",{className:"mt-2",children:[e.jsx("strong",{children:"错误认知"}),"：用 ",e.jsx("code",{className:"font-mono text-[12px]",children:"volatile"})," 修饰变量就能解决所有线程安全问题。"]}),e.jsxs("p",{className:"mt-2",children:[e.jsx("strong",{children:"真相"}),"：",e.jsx("code",{className:"font-mono text-[12px]",children:"volatile"})," 只保证可见性和有序性，",e.jsx("strong",{children:"不保证原子性"}),"。对于 ",e.jsx("code",{className:"font-mono text-[12px]",children:"count++"})," 这类复合操作，仍需使用 ",e.jsx("code",{className:"font-mono text-[12px]",children:"synchronized"})," 或 ",e.jsx("code",{className:"font-mono text-[12px]",children:"AtomicInteger"}),"。"]})]}),e.jsxs(t,{type:"warning",title:"误区4：Thread.stop() 是安全的终止方式",children:[e.jsxs("p",{className:"mt-2",children:[e.jsx("strong",{children:"错误认知"}),"：调用 ",e.jsx("code",{className:"font-mono text-[12px]",children:"thread.stop()"})," 可以强制终止线程。"]}),e.jsxs("p",{className:"mt-2",children:[e.jsx("strong",{children:"真相"}),"：",e.jsx("code",{className:"font-mono text-[12px]",children:"stop()"})," 已被标记为 ",e.jsx("code",{className:"font-mono text-[12px]",children:"@Deprecated"}),"，因为它会立即释放所有锁，可能导致对象处于不一致状态。正确做法是使用",e.jsx("strong",{children:"中断机制"}),"（",e.jsx("code",{className:"font-mono text-[12px]",children:"interrupt()"}),"）配合标志位优雅终止。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、面试真题"}),e.jsx(m,{questions:[{question:"Thread 和 Runnable 有什么区别？哪种方式更好？",answer:"Thread 是类，Runnable 是接口。继承 Thread 会占用单继承名额且任务与线程耦合；实现 Runnable 支持多实现、解耦任务和线程、便于资源共享和适配线程池。因此推荐使用 Runnable 方式。"},{question:"start() 和 run() 方法的区别是什么？",answer:"start() 会创建新线程并异步执行 run() 方法中的代码；直接调用 run() 只是普通方法调用，仍在当前线程同步执行，不会启动新线程。"},{question:"Java 线程有哪些状态？BLOCKED 和 WAITING 有什么区别？",answer:"Java 线程有6种状态：NEW、RUNNABLE、BLOCKED、WAITING、TIMED_WAITING、TERMINATED。BLOCKED 是等待获取 synchronized 锁时的状态；WAITING 是调用 wait()/join()/park() 后无限期等待其他线程通知的状态。"},{question:"什么是线程安全？如何保证线程安全？",answer:"线程安全指多个线程访问共享资源时不会出现数据不一致问题。保证线程安全的方法包括：使用 synchronized/ReentrantLock 加锁、使用 volatile 保证可见性、使用 Atomic 类进行原子操作、使用 ThreadLocal 隔离线程间数据、使用不可变对象。"},{question:"volatile 关键字的作用是什么？它能保证原子性吗？",answer:"volatile 保证变量的可见性（一个线程修改后其他线程立即可见）和有序性（禁止指令重排序），但不保证原子性。对于 count++ 这类复合操作，仍需使用 synchronized 或 AtomicInteger。"},{question:"为什么不建议使用 Thread.stop() 终止线程？正确的终止方式是什么？",answer:"Thread.stop() 会立即释放所有锁，可能导致对象处于不一致状态，已被废弃。正确方式是使用中断机制：调用 thread.interrupt() 设置中断标志，在 run() 中通过 isInterrupted() 检查标志并优雅退出。"}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、对比总结"}),e.jsxs("table",{className:"w-full border-collapse my-5 text-[13px] sm:text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-light border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"继承 Thread"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"实现 Runnable"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink",children:"实现 Callable"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-3 px-4 font-medium text-ink",children:"返回值"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"无"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"无"}),e.jsx("td",{className:"py-3 px-4 text-teal font-medium",children:"有 ✅"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"py-3 px-4 font-medium text-ink",children:"异常处理"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"只能捕获"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"只能捕获"}),e.jsx("td",{className:"py-3 px-4 text-teal font-medium",children:"可抛出 ✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-3 px-4 font-medium text-ink",children:"继承限制"}),e.jsx("td",{className:"py-3 px-4 text-rose font-medium",children:"单继承 ❌"}),e.jsx("td",{className:"py-3 px-4 text-teal font-medium",children:"多实现 ✅"}),e.jsx("td",{className:"py-3 px-4 text-teal font-medium",children:"多实现 ✅"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"py-3 px-4 font-medium text-ink",children:"适用场景"}),e.jsx("td",{className:"py-3 px-4 text-ink-muted",children:"简单示例"}),e.jsx("td",{className:"py-3 px-4 text-teal font-medium",children:"通用场景 ✅"}),e.jsx("td",{className:"py-3 px-4 text-teal font-medium",children:"需要结果 ✅"})]})]})]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 my-5",children:[e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-parchment-light/30",children:[e.jsx("div",{className:"text-[11px] font-mono text-ink-faded uppercase tracking-[0.06em] mb-2",children:"前置知识"}),e.jsxs("ul",{className:"space-y-1 text-[13px] text-ink-muted",children:[e.jsx("li",{children:"• Java 基础语法"}),e.jsx("li",{children:"• 面向对象编程"}),e.jsx("li",{children:"• JVM 内存模型"})]})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-accent-soft/20",children:[e.jsx("div",{className:"text-[11px] font-mono text-accent uppercase tracking-[0.06em] mb-2",children:"延伸学习"}),e.jsxs("ul",{className:"space-y-1 text-[13px] text-ink-muted",children:[e.jsx("li",{children:"• synchronized 原理"}),e.jsx("li",{children:"• ReentrantLock 锁机制"}),e.jsx("li",{children:"• 线程池 ThreadPoolExecutor"}),e.jsx("li",{children:"• ConcurrentHashMap"})]})]})]}),e.jsxs(t,{type:"info",title:"下一步学习建议",children:["掌握多线程基础后，建议深入学习：",e.jsx("strong",{children:"synchronized 底层原理"}),"（Monitor、偏向锁、轻量级锁、重量级锁）、",e.jsx("strong",{children:"JUC 并发工具包"}),"（ThreadPoolExecutor、CountDownLatch、CyclicBarrier）、",e.jsx("strong",{children:"并发容器"}),"（ConcurrentHashMap、CopyOnWriteArrayList）以及",e.jsx("strong",{children:"锁优化技术"}),"（CAS、AQS、读写锁）。"]}),e.jsx(d,{...i(n.category,n.id)})]})}),e.jsx(c,{items:o})]})}export{f as default};
