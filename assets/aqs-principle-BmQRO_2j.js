import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as d}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as i}from"./SideNote-BKvanovA.js";import{C as s,A as l,S as c}from"./ArticleNav-DhfiS38Y.js";import{D as a}from"./DiagramBlock-CLaKE9_7.js";import{I as x}from"./InterviewSection-BBNdwyyN.js";const o=[{id:"definition",text:"一句话定义",level:2},{id:"architecture",text:"一、AQS 整体架构",level:2},{id:"core-components",text:"1.1 核心组件",level:3},{id:"state-management",text:"1.2 状态管理",level:3},{id:"queue-structure",text:"二、CLH 同步队列",level:2},{id:"node-structure",text:"2.1 Node 节点结构",level:3},{id:"queue-operations",text:"2.2 入队与出队操作",level:3},{id:"exclusive-mode",text:"三、独占模式",level:2},{id:"acquire-logic",text:"3.1 acquire() 获取锁流程",level:3},{id:"release-logic",text:"3.2 release() 释放锁流程",level:3},{id:"shared-mode",text:"四、共享模式",level:2},{id:"acquire-shared",text:"4.1 acquireShared() 获取流程",level:3},{id:"release-shared",text:"4.2 releaseShared() 释放流程",level:3},{id:"reentrantlock-impl",text:"五、ReentrantLock 实现剖析",level:2},{id:"fair-vs-unfair",text:"5.1 公平锁 vs 非公平锁",level:3},{id:"source-analysis",text:"5.2 源码深度解析",level:3},{id:"playground",text:"六、代码实验场",level:2},{id:"misconceptions",text:"七、常见误区",level:2},{id:"interview",text:"八、面试真题",level:2},{id:"comparison",text:"九、对比分析",level:2},{id:"related",text:"十、知识关联",level:2}];function g({meta:r}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(d,{meta:r,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["AQS（AbstractQueuedSynchronizer）是 Java 并发包的核心框架，通过",e.jsx("strong",{children:"volatile state 变量"}),"和",e.jsx("strong",{children:"CLH 双向队列"}),"实现线程的排队与唤醒机制， 为 ReentrantLock、CountDownLatch、Semaphore 等提供了统一的同步器基础。"]})}),e.jsx(s,{type:"tip",title:"为什么必须掌握 AQS？",children:"AQS 是 JUC 并发工具的基石，理解了 AQS 就能举一反三掌握所有基于 AQS 实现的同步器。 面试中高频考察 AQS 原理，尤其是 CLH 队列、独占/共享模式、ReentrantLock 实现细节。 掌握 AQS 是成为高级 Java 工程师的必经之路。"}),e.jsx("h2",{id:"architecture",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、AQS 整体架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["AQS 采用",e.jsx("strong",{children:"模板方法模式"}),"设计，定义了同步器的基本框架，子类只需实现特定的 tryAcquire/tryRelease 等方法即可。 其核心由三个部分组成：",e.jsx("strong",{children:"volatile state 状态变量"}),"、",e.jsx("strong",{children:"CLH 同步队列"}),"、",e.jsx("strong",{children:"Condition 条件队列"}),"。"]}),e.jsx(a,{title:"AQS 核心架构图",children:`graph TB
    subgraph "AQS 核心组件"
        State[volatile int state<br/>同步状态]
        Queue[CLH 双向队列<br/>等待线程]
        Condition[Condition 队列<br/>await/signal]
    end
    
    subgraph "子类实现"
        ReentrantLock[ReentrantLock]
        CountDownLatch[CountDownLatch]
        Semaphore[Semaphore]
        ReadWriteLock[ReadWriteLock]
    end
    
    State --> Queue
    Queue --> Condition
    ReentrantLock -.继承.-> AQS
    CountDownLatch -.继承.-> AQS
    Semaphore -.继承.-> AQS
    ReadWriteLock -.继承.-> AQS
    
    style State fill:#ffe4b5
    style Queue fill:#e1f5ff
    style Condition fill:#d4edda`}),e.jsxs(i,{label:"设计思想",children:[e.jsx("strong",{children:"模板方法模式："}),"AQS 定义了 acquire/release 等模板方法，内部调用子类实现的 tryAcquire/tryRelease。",e.jsx("br",{}),e.jsx("strong",{children:"FIFO 队列："}),"CLH 队列保证线程按请求顺序获得锁，避免饥饿问题。",e.jsx("br",{}),e.jsx("strong",{children:"自旋 + 阻塞："}),"先自旋尝试获取锁，失败后加入队列阻塞，平衡性能与 CPU 消耗。"]}),e.jsx("h3",{id:"core-components",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.1 核心组件"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"组件"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"类型"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"作用"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:e.jsx("code",{children:"state"})}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"volatile int"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"同步状态（0=未锁定，>0=已锁定，可重入计数）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:e.jsx("code",{children:"head/tail"})}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"volatile Node"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"CLH 队列的头尾指针"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:e.jsx("code",{children:"exclusiveOwnerThread"})}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"Thread"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"独占模式下持有锁的线程"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:e.jsx("code",{children:"Node"})}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"内部类"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"队列节点，封装线程和等待状态"})]})]})]})}),e.jsx("h3",{id:"state-management",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.2 状态管理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"AQS 使用 CAS 操作原子性地修改 state 变量，确保多线程环境下的状态一致性。"}),e.jsx(t,{code:`// AQS 中的核心 CAS 操作
protected final boolean compareAndSetState(int expect, int update) {
    // 使用 Unsafe 的 CAS 操作
    return unsafe.compareAndSwapInt(this, stateOffset, expect, update);
}

// 独占模式下获取 state
protected final boolean tryAcquire(int arg) {
    throw new UnsupportedOperationException(); // 子类必须实现
}

// 独占模式下释放 state
protected final boolean tryRelease(int arg) {
    throw new UnsupportedOperationException(); // 子类必须实现
}`,language:"java",description:"AQS 状态管理的核心方法"}),e.jsx(s,{type:"info",title:"state 的含义因同步器而异",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"ReentrantLock："}),"state=0 表示未锁定，state>0 表示锁定，值为重入次数"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"CountDownLatch："}),"state=初始计数值，每次 countDown() 减 1，减到 0 时唤醒所有等待线程"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Semaphore："}),"state=可用许可数，acquire() 减 1，release() 加 1"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ReadWriteLock："}),"高 16 位表示读锁计数，低 16 位表示写锁计数"]})]})}),e.jsx("h2",{id:"queue-structure",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、CLH 同步队列"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["AQS 使用改良版的 CLH（Craig, Landin, and Hagersten）队列来管理等待线程。 这是一个",e.jsx("strong",{children:"双向链表"}),"，头节点是虚拟节点（dummy node），不关联实际线程， 后续节点是等待获取锁的线程。"]}),e.jsx(a,{title:"CLH 队列结构",children:`graph LR
    Head[Head<br/>Dummy Node] --> Node1[Node 1<br/>Thread-A<br/>waitStatus=SIGNAL]
    Node1 --> Node2[Node 2<br/>Thread-B<br/>waitStatus=0]
    Node2 --> Node3[Node 3<br/>Thread-C<br/>waitStatus=0]
    Node3 --> Tail[Tail]
    
    Head <-.-> Node1
    Node1 <-.-> Node2
    Node2 <-.-> Node3
    Node3 <-.-> Tail
    
    style Head fill:#ffe4b5
    style Tail fill:#ffe4b5`}),e.jsx("h3",{id:"node-structure",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.1 Node 节点结构"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Node 是 CLH 队列的基本单元，每个节点包含线程引用、等待状态、前后指针等信息。"}),e.jsx(t,{code:`static final class Node {
    // 等待状态
    static final int CANCELLED =  1;   // 线程已取消
    static final int SIGNAL    = -1;   // 后继线程需要被唤醒
    static final int CONDITION = -2;   // 线程在 Condition 队列中
    static final int PROPAGATE = -3;   // 共享模式下传播唤醒
    
    volatile int waitStatus;       // 等待状态
    volatile Node prev;            // 前驱节点
    volatile Node next;            // 后继节点
    volatile Thread thread;        // 当前线程
    Node nextWaiter;               // Condition 队列中的下一个节点
    
    // 判断是否为共享模式
    final boolean isShared() {
        return nextWaiter == SHARED;
    }
}`,language:"java",description:"Node 节点的核心字段"}),e.jsxs(i,{label:"waitStatus 详解",children:[e.jsx("strong",{children:"SIGNAL (-1)："}),"最常见状态，表示后继节点已被阻塞，当前节点释放锁时需要唤醒后继节点。",e.jsx("br",{}),e.jsx("strong",{children:"CANCELLED (1)："}),"线程因超时或中断被取消，该节点会从队列中移除。",e.jsx("br",{}),e.jsx("strong",{children:"CONDITION (-2)："}),"线程在 Condition 队列中等待，不在 CLH 队列中。",e.jsx("br",{}),e.jsx("strong",{children:"PROPAGATE (-3)："}),"共享模式下使用，表示需要向后传播唤醒信号。"]}),e.jsx("h3",{id:"queue-operations",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.2 入队与出队操作"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"当线程获取锁失败时，会被封装成 Node 加入 CLH 队列尾部；当锁释放时，头节点的后继节点会被唤醒并尝试获取锁。"}),e.jsx(t,{code:`// 将节点加入队列尾部
private Node enq(final Node node) {
    for (;;) {
        Node t = tail;
        if (t == null) { // 队列为空，初始化
            if (compareAndSetHead(new Node()))
                tail = head;
        } else {
            node.prev = t;
            if (compareAndSetTail(t, node)) { // CAS 设置尾节点
                t.next = node;
                return t;
            }
        }
    }
}

// 唤醒后继节点
private void unparkSuccessor(Node node) {
    Node s = node.next;
    if (s != null && s.waitStatus <= 0)
        LockSupport.unpark(s.thread); // 唤醒线程
}`,language:"java",description:"CLH 队列的入队与唤醒操作"}),e.jsx(s,{type:"warning",title:"⚠️ CAS 循环的重要性",children:"enq() 方法使用无限循环 + CAS 确保在多线程竞争下正确地将节点加入队列尾部。 如果 CAS 失败（其他线程同时修改了 tail），会重新读取 tail 并重试，直到成功为止。 这是无锁并发编程的经典模式。"}),e.jsx("h2",{id:"exclusive-mode",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、独占模式"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"独占模式下，同一时刻只有一个线程能持有锁。ReentrantLock 就是典型的独占模式实现。"}),e.jsx("h3",{id:"acquire-logic",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 acquire() 获取锁流程"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["acquire() 是独占模式下获取锁的入口方法，采用",e.jsx("strong",{children:'"尝试获取 → 入队等待 → 自旋重试"'}),"的策略。"]}),e.jsx(a,{title:"acquire() 执行流程",children:`graph TD
    Start[调用 acquire] --> TryActry{tryAcquire 成功?}
    TryActry -- 是 --> Success[获取锁成功]
    TryActry -- 否 --> AddWaiter[addWaiter 加入队列]
    AddWaiter --> AcquireQueued[acquireQueued 自旋等待]
    AcquireQueued --> ParkCheck{是否应该 park?}
    ParkCheck -- 是 --> Park[LockSupport.park 阻塞]
    ParkCheck -- 否 --> Retry[继续自旋]
    Park --> WakeUp[被唤醒]
    WakeUp --> Retry
    Retry --> CheckInterrupt{是否被中断?}
    CheckInterrupt -- 是 --> SetInterrupt[记录中断状态]
    CheckInterrupt -- 否 --> TryActry
    SetInterrupt --> End[返回]
    Success --> End
    
    style Start fill:#e1f5ff
    style Success fill:#d4edda
    style End fill:#ffe4b5`}),e.jsx(t,{code:`public final void acquire(int arg) {
    // 1. 尝试获取锁
    if (!tryAcquire(arg) &&
        // 2. 获取失败，加入队列并自旋等待
        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
        // 3. 如果等待过程中被中断，恢复中断状态
        selfInterrupt();
}

// 子类必须实现的模板方法
protected boolean tryAcquire(int arg) {
    throw new UnsupportedOperationException();
}`,language:"java",description:"acquire() 方法的执行逻辑"}),e.jsx("h3",{id:"release-logic",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 release() 释放锁流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"release() 方法释放锁并唤醒后继节点，相对简单直接。"}),e.jsx(t,{code:`public final boolean release(int arg) {
    // 1. 尝试释放锁
    if (tryRelease(arg)) {
        Node h = head;
        // 2. 如果头节点存在且状态正常，唤醒后继节点
        if (h != null && h.waitStatus != 0)
            unparkSuccessor(h);
        return true;
    }
    return false;
}

// 子类必须实现的模板方法
protected boolean tryRelease(int arg) {
    throw new UnsupportedOperationException();
}`,language:"java",description:"release() 方法的执行逻辑"}),e.jsx("h2",{id:"shared-mode",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、共享模式"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:'共享模式下，多个线程可以同时持有"锁"（实际上是共享资源）。 CountDownLatch、Semaphore、ReadWriteLock 的读锁都使用共享模式。'}),e.jsx("h3",{id:"acquire-shared",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 acquireShared() 获取流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"共享模式的获取逻辑与独占模式类似，但 tryAcquireShared() 返回值的含义不同："}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"返回值"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"含义"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"< 0"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"获取失败，需要进入队列等待"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"= 0"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"获取成功，但后继节点不能再获取"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"> 0"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"获取成功，且后继节点也可能获取成功（需要传播唤醒）"})]})]})]})}),e.jsx(t,{code:`public final void acquireShared(int arg) {
    // 返回值 < 0 表示获取失败
    if (tryAcquireShared(arg) < 0)
        doAcquireShared(arg);
}

private void doAcquireShared(int arg) {
    final Node node = addWaiter(Node.SHARED);
    boolean failed = true;
    try {
        boolean interrupted = false;
        for (;;) {
            final Node p = node.predecessor();
            if (p == head) {
                int r = tryAcquireShared(arg);
                if (r >= 0) {
                    // 获取成功，传播唤醒信号
                    setHeadAndPropagate(node, r);
                    p.next = null; // help GC
                    if (interrupted)
                        selfInterrupt();
                    failed = false;
                    return;
                }
            }
            if (shouldParkAfterFailedAcquire(p, node) &&
                parkAndCheckInterrupt())
                interrupted = true;
        }
    } finally {
        if (failed)
            cancelAcquire(node);
    }
}`,language:"java",description:"共享模式的获取逻辑"}),e.jsx("h3",{id:"release-shared",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.2 releaseShared() 释放流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"共享模式释放时需要传播唤醒信号，让多个等待线程都能被唤醒。"}),e.jsx(t,{code:`public final boolean releaseShared(int arg) {
    if (tryReleaseShared(arg)) {
        doReleaseShared();
        return true;
    }
    return false;
}

private void doReleaseShared() {
    for (;;) {
        Node h = head;
        if (h != null && h != tail) {
            int ws = h.waitStatus;
            if (ws == Node.SIGNAL) {
                if (!compareAndSetWaitStatus(h, Node.SIGNAL, 0))
                    continue;
                unparkSuccessor(h); // 唤醒后继节点
            } else if (ws == 0 &&
                     !compareAndSetWaitStatus(h, 0, Node.PROPAGATE))
                continue;
        }
        if (h == head)
            break;
    }
}`,language:"java",description:"共享模式的释放与传播唤醒"}),e.jsx("h2",{id:"reentrantlock-impl",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、ReentrantLock 实现剖析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"ReentrantLock 是 AQS 最典型的应用，它通过内部类 Sync 继承 AQS，实现了公平锁和非公平锁两种模式。"}),e.jsx("h3",{id:"fair-vs-unfair",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.1 公平锁 vs 非公平锁"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"特性"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"公平锁"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"非公平锁"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"获取策略"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"按 FIFO 顺序，检查队列中是否有等待线程"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"直接 CAS 抢锁，不考虑队列"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"吞吐量"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"较低（频繁上下文切换）"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"较高（减少线程挂起/唤醒）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"饥饿问题"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"✅ 不会饥饿"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"❌ 可能饥饿"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"默认选择"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"需显式指定"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"✅ 默认模式"})]})]})]})}),e.jsx(s,{type:"tip",title:"为什么默认是非公平锁？",children:"非公平锁的吞吐量更高，因为新到达的线程可以直接尝试获取锁，避免了不必要的线程挂起和唤醒。 虽然可能导致某些线程饥饿，但在大多数场景下性能优势明显。只有在对公平性有严格要求时才使用公平锁。"}),e.jsx("h3",{id:"source-analysis",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.2 源码深度解析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"让我们深入 ReentrantLock 的核心实现，看它是如何利用 AQS 的。"}),e.jsx(t,{code:`// ReentrantLock 的内部类
abstract static class Sync extends AbstractQueuedSynchronizer {
    // 非公平锁的 tryAcquire 实现
    final boolean nonfairTryAcquire(int acquires) {
        final Thread current = Thread.currentThread();
        int c = getState();
        if (c == 0) {
            // state=0，直接 CAS 抢锁
            if (compareAndSetState(0, acquires)) {
                setExclusiveOwnerThread(current);
                return true;
            }
        }
        // 重入逻辑：如果当前线程已持有锁
        else if (current == getExclusiveOwnerThread()) {
            int nextc = c + acquires;
            if (nextc < 0) // 溢出检测
                throw new Error("Maximum lock count exceeded");
            setState(nextc);
            return true;
        }
        return false;
    }
}

// 公平锁的实现
static final class FairSync extends Sync {
    protected final boolean tryAcquire(int acquires) {
        final Thread current = Thread.currentThread();
        int c = getState();
        if (c == 0) {
            // 关键区别：检查队列中是否有等待线程
            if (!hasQueuedPredecessors() &&
                compareAndSetState(0, acquires)) {
                setExclusiveOwnerThread(current);
                return true;
            }
        }
        else if (current == getExclusiveOwnerThread()) {
            int nextc = c + acquires;
            if (nextc < 0)
                throw new Error("Maximum lock count exceeded");
            setState(nextc);
            return true;
        }
        return false;
    }
}`,language:"java",description:"ReentrantLock 公平锁与非公平锁的核心差异"}),e.jsx(i,{label:"hasQueuedPredecessors()",children:"这是公平锁的关键方法，用于判断队列中是否有等待时间更长的线程。 如果有，则当前线程不能插队，必须排队等待，保证了公平性。"}),e.jsx("h2",{id:"playground",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、代码实验场"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"通过实际代码观察 AQS 在不同场景下的行为。"}),e.jsx(t,{code:`import java.util.concurrent.locks.ReentrantLock;

public class AQSDemo {
    private static final ReentrantLock lock = new ReentrantLock();
    private static int counter = 0;
    
    public static void main(String[] args) throws InterruptedException {
        Thread[] threads = new Thread[10];
        
        // 创建 10 个线程竞争锁
        for (int i = 0; i < 10; i++) {
            threads[i] = new Thread(() -> {
                lock.lock();
                try {
                    System.out.println(Thread.currentThread().getName() + " 获取锁");
                    counter++;
                    Thread.sleep(100); // 模拟业务处理
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    System.out.println(Thread.currentThread().getName() + " 释放锁");
                    lock.unlock();
                }
            }, "Thread-" + i);
        }
        
        // 启动所有线程
        for (Thread thread : threads) {
            thread.start();
        }
        
        // 等待所有线程完成
        for (Thread thread : threads) {
            thread.join();
        }
        
        System.out.println("最终计数: " + counter);
    }
}`,language:"java",description:"多线程竞争 ReentrantLock 示例"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、常见误区"}),e.jsxs("div",{className:"space-y-4 mb-6",children:[e.jsx(s,{type:"warning",title:"误区 1：AQS 只能用于实现互斥锁",children:e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"事实："}),"AQS 支持独占模式和共享模式，不仅可以实现互斥锁（如 ReentrantLock）， 还可以实现共享资源的同步器（如 CountDownLatch、Semaphore、ReadWriteLock）。"]})}),e.jsx(s,{type:"warning",title:"误区 2：CLH 队列是严格的 FIFO",children:e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"事实："}),'非公平锁模式下，新到达的线程可以"插队"直接尝试获取锁，不一定遵循 FIFO。 只有公平锁才严格保证 FIFO 顺序。']})}),e.jsx(s,{type:"warning",title:"误区 3：state 只能是 0 或 1",children:e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"事实："}),"对于可重入锁，state 可以大于 1，表示重入次数。 每次重入 state+1，每次释放 state-1，直到 state=0 才完全释放锁。"]})}),e.jsx(s,{type:"warning",title:"误区 4：AQS 的队列是无界的",children:e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"事实："}),"CLH 队列理论上是无界的，但如果大量线程同时竞争锁，会导致内存占用过高。 在实际应用中应该控制并发度，避免过多线程同时竞争同一把锁。"]})})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、面试真题"}),e.jsx(x,{questions:[{question:"AQS 的核心原理是什么？",answer:"AQS 通过 volatile state 变量表示同步状态，使用 CLH 双向队列管理等待线程。线程获取锁失败时加入队列阻塞，释放锁时唤醒后继节点。采用模板方法模式，子类实现 tryAcquire/tryRelease 等方法。"},{question:"CLH 队列的头节点有什么特殊之处？",answer:"头节点是虚拟节点（dummy node），不关联实际线程。它的作用是简化队列操作，当头节点的后继节点被唤醒时，该节点会成为新的头节点。这种设计避免了处理头节点为空的情况。"},{question:"ReentrantLock 的公平锁和非公平锁有什么区别？",answer:"公平锁在获取锁时会检查队列中是否有等待线程（hasQueuedPredecessors），如果有则排队等待；非公平锁直接 CAS 尝试获取锁，不考虑队列。非公平锁吞吐量更高，但可能导致饥饿；公平锁保证 FIFO 顺序，但性能稍差。"},{question:"AQS 如何实现可重入？",answer:"通过 exclusiveOwnerThread 字段记录持有锁的线程。在 tryAcquire 中，如果当前线程等于 exclusiveOwnerThread，说明是重入，直接 state+1 并返回 true。释放时 state-1，直到 state=0 才清除 exclusiveOwnerThread。"},{question:"共享模式和独占模式的主要区别是什么？",answer:"独占模式同一时刻只有一个线程能持有锁（如 ReentrantLock）；共享模式多个线程可以同时持有'锁'（如 CountDownLatch、Semaphore）。tryAcquireShared 返回值有不同含义：<0 失败，=0 成功但后继不能获取，>0 成功且后继也可能获取。"},{question:"AQS 中的自旋和阻塞是如何配合的？",answer:"线程先自旋尝试获取锁（避免立即阻塞的开销），如果多次自旋后仍失败，则通过 LockSupport.park() 阻塞线程。被唤醒后再次自旋尝试。这种策略平衡了 CPU 消耗和响应速度。"},{question:"waitStatus 的 SIGNAL 状态有什么作用？",answer:"SIGNAL (-1) 表示后继节点已被阻塞，当前节点释放锁时需要唤醒后继节点。这是最常见的状态，确保线程能够被正确唤醒，避免丢失唤醒信号。"}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、对比分析"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"特性"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"synchronized"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"ReentrantLock (AQS)"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"实现层面"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"JVM 层面（Monitor）"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"Java 代码层面（AQS）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"锁升级"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"✅ 偏向锁 → 轻量级锁 → 重量级锁"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"❌ 无锁升级机制"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"公平性"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"❌ 非公平"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"✅ 支持公平/非公平"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"可中断"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"❌ 不可中断"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"✅ 支持 lockInterruptibly()"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"超时获取"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"❌ 不支持"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"✅ 支持 tryLock(timeout)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"Condition"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"✅ 一个 wait/notify"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"✅ 多个 Condition 对象"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"性能"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"JDK 6+ 优化后接近"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"高竞争下略优"})]})]})]})}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、知识关联"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"AQS 是多线程同步的核心，与以下知识点密切相关："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"前置知识："}),e.jsx("a",{href:"/docs/03-multithreading/lock-mechanism",className:"text-accent hover:underline",children:"Java 锁机制深入剖析"})," — 理解偏向锁、轻量级锁、重量级锁的升级过程"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"关联知识："}),e.jsx("a",{href:"/docs/03-multithreading/concurrent-utils",className:"text-accent hover:underline",children:"并发工具类"})," — CountDownLatch、CyclicBarrier、Semaphore 都基于 AQS 实现"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"关联知识："}),e.jsx("a",{href:"/docs/03-multithreading/thread-pool",className:"text-accent hover:underline",children:"线程池最佳实践"})," — ThreadPoolExecutor 内部使用 AQS 管理工作线程"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"进阶知识："}),e.jsx("a",{href:"/docs/02-collections/concurrent-collections",className:"text-accent hover:underline",children:"并发集合类"})," — ConcurrentHashMap 等容器内部使用 AQS 实现线程安全"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"延伸学习："}),"Condition 条件队列 — AQS 的另一重要组成部分，实现 await/signal 机制"]})]}),e.jsxs(s,{type:"info",title:"下一步学习建议",children:["掌握 AQS 后，建议深入学习：",e.jsx("strong",{children:"Condition 条件队列"}),"（await/signal 机制）、",e.jsx("strong",{children:"StampedLock"}),"（乐观读锁）、",e.jsx("strong",{children:"LongAdder"}),"（高性能计数器）以及",e.jsx("strong",{children:"自定义同步器"}),"的实现。"]}),e.jsx(l,{...n(r.category,r.id)})]})}),e.jsx(c,{items:o})]})}export{g as default};
