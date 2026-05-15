import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{I as i}from"./InteractiveFlow-GAP1pk49.js";import{S as l}from"./SideNote-BKvanovA.js";import{C as d}from"./ContextSwitcher-Cjd-h5IL.js";import{C as t,A as o,S as c}from"./ArticleNav-DhfiS38Y.js";import{D as x}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const p=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、NIO 整体架构",level:2},{id:"bio-vs-nio",text:"1.1 BIO vs NIO 对比",level:3},{id:"core-components",text:"二、核心组件详解",level:2},{id:"buffer",text:"2.1 Buffer（缓冲区）",level:3},{id:"channel",text:"2.2 Channel（通道）",level:3},{id:"selector",text:"2.3 Selector（选择器）",level:3},{id:"buffer-operations",text:"三、Buffer 操作机制",level:2},{id:"nio-model",text:"四、NIO 网络模型",level:2},{id:"reactor-pattern",text:"4.1 Reactor 模式",level:3},{id:"server-example",text:"五、NIO 服务器实现",level:2},{id:"zero-copy",text:"六、零拷贝技术",level:2},{id:"comparison",text:"七、IO 模型对比",level:2},{id:"misconceptions",text:"八、常见误区",level:2},{id:"interview",text:"九、面试真题",level:2},{id:"related",text:"十、知识关联",level:2}];function I({meta:r}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(a,{meta:r,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["NIO（New IO / Non-blocking IO）是 JDK 1.4 引入的非阻塞 IO 框架，基于",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1",children:"Buffer"}),"、",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1",children:"Channel"}),"、",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1",children:"Selector"}),"三大核心组件，支持单线程管理多个连接，实现高并发网络编程。"]})}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、NIO 整体架构"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"NIO 是对传统 BIO（Blocking IO）的重大改进。BIO 采用同步阻塞模型，每个连接需要一个独立线程处理；NIO 采用同步非阻塞模型，通过多路复用器（Selector）实现单线程管理成千上万个连接。"}),e.jsx("h3",{id:"bio-vs-nio",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.1 BIO vs NIO 对比"}),e.jsx("div",{className:"overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5",children:e.jsxs("table",{className:"w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-2.5 px-3 text-ink font-semibold",children:"特性"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-orange font-semibold",children:"BIO"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-teal font-semibold",children:"NIO"})]})}),e.jsxs("tbody",{className:"text-ink-muted",children:[e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"IO 模型"}),e.jsx("td",{className:"py-2.5 px-3",children:"同步阻塞"}),e.jsx("td",{className:"py-2.5 px-3",children:"同步非阻塞"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"数据单位"}),e.jsx("td",{className:"py-2.5 px-3",children:"Stream（流）"}),e.jsx("td",{className:"py-2.5 px-3",children:"Buffer（缓冲区）"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"连接方式"}),e.jsx("td",{className:"py-2.5 px-3",children:"一对一"}),e.jsx("td",{className:"py-2.5 px-3",children:"一对多（多路复用）"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"线程模型"}),e.jsx("td",{className:"py-2.5 px-3",children:"一个连接一个线程"}),e.jsx("td",{className:"py-2.5 px-3",children:"一个线程管理多个连接"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"适用场景"}),e.jsx("td",{className:"py-2.5 px-3",children:"连接数少且固定"}),e.jsx("td",{className:"py-2.5 px-3",children:"高并发、长连接"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"代表框架"}),e.jsx("td",{className:"py-2.5 px-3",children:"java.net.Socket"}),e.jsx("td",{className:"py-2.5 px-3",children:"java.nio.channels"})]})]})]})}),e.jsx(x,{title:"BIO vs NIO 线程模型对比",children:`graph LR
    subgraph BIO["BIO 模型 🔴"]
        C1["C1"] --> T1["Thread-1"]
        C2["C2"] --> T2["Thread-2"]
    end

    subgraph NIO["NIO 模型 🟢"]
        N1["C1"] --> S["Selector
Thread-1"]
        N2["C2"] --> S
    end

    BIO ~~~ NIO

    style BIO fill:#f5f0e8,stroke:#b5651d,color:#8b4c14
    style NIO fill:#f0f5f3,stroke:#5f7a68,color:#3d5245
    style T1 fill:#ede4d1,stroke:#b5651d,color:#8b4c14
    style T2 fill:#ede4d1,stroke:#b5651d,color:#8b4c14
    style S fill:#ede4d1,stroke:#5f7a68,color:#3d5245`}),e.jsxs(t,{type:"tip",title:"核心要点",children:["NIO 的核心优势在于",e.jsx("strong",{className:"text-ink-light font-semibold",children:"多路复用"}),"：通过 Selector 监听多个 Channel 的事件，只有当事件就绪时才进行处理，避免了 BIO 中线程阻塞等待的问题。这使得 NIO 非常适合高并发、长连接的场景。"]}),e.jsx("h2",{id:"core-components",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、核心组件详解"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["NIO 由三大核心组件构成：",e.jsx("strong",{className:"text-ink-light font-semibold",children:"Buffer（缓冲区）"}),"、",e.jsx("strong",{className:"text-ink-light font-semibold",children:"Channel（通道）"}),"、",e.jsx("strong",{className:"text-ink-light font-semibold",children:"Selector（选择器）"}),"。"]}),e.jsx("h3",{id:"buffer",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.1 Buffer（缓冲区）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Buffer 是一个固定大小的数据容器，用于在 Channel 之间传输数据。与 BIO 的 Stream 不同，Buffer 允许双向读写。"}),e.jsx(s,{language:"java",filename:"BufferTypes.java",description:"Buffer 主要类型",highlights:[1,3,5],code:`// ByteBuffer - 最常用，字节缓冲区
ByteBuffer byteBuf = ByteBuffer.allocate(1024);

// CharBuffer - 字符缓冲区
CharBuffer charBuf = CharBuffer.allocate(256);

// IntBuffer、LongBuffer、FloatBuffer、DoubleBuffer、ShortBuffer
IntBuffer intBuf = IntBuffer.allocate(128);`}),e.jsxs(l,{label:"直接缓冲区 vs 堆缓冲区",children:[e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"allocateDirect()"})," 创建的直接缓冲区位于 JVM 堆外内存，性能更高但创建销毁开销大。",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"allocate()"})," 创建的堆缓冲区位于 JVM 堆内，GC 可管理。"]}),e.jsx("h3",{id:"channel",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.2 Channel（通道）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Channel 是数据传输的通道，类似于 BIO 中的 Stream，但支持双向传输和非阻塞读写。"}),e.jsx(s,{language:"java",filename:"ChannelTypes.java",description:"Channel 主要类型",highlights:[1,3,5,7],code:`// FileChannel - 文件通道
FileChannel fileChannel = new FileInputStream("file.txt").getChannel();

// SocketChannel - TCP 套接字通道
SocketChannel socketChannel = SocketChannel.open();

// ServerSocketChannel - TCP 服务端通道
ServerSocketChannel serverChannel = ServerSocketChannel.open();

// DatagramChannel - UDP 通道
DatagramChannel datagramChannel = DatagramChannel.open();`}),e.jsx("h3",{id:"selector",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.3 Selector（选择器）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Selector 是 NIO 的核心，它允许单线程监控多个 Channel 的事件。当某个 Channel 有事件就绪时，Selector 会通知应用程序进行处理。"}),e.jsx(s,{language:"java",filename:"SelectorExample.java",description:"Selector 基本用法",highlights:[3,7,12],code:`// 1. 创建 Selector
Selector selector = Selector.open();

// 2. 将 Channel 注册到 Selector
ServerSocketChannel serverChannel = ServerSocketChannel.open();
serverChannel.configureBlocking(false); // 必须设置为非阻塞
serverChannel.register(selector, SelectionKey.OP_ACCEPT);

// 3. 轮询就绪事件
while (true) {
    int readyChannels = selector.select(); // 阻塞直到有事件就绪
    if (readyChannels == 0) continue;
    
    Set<SelectionKey> selectedKeys = selector.selectedKeys();
    Iterator<SelectionKey> keyIterator = selectedKeys.iterator();
    
    while (keyIterator.hasNext()) {
        SelectionKey key = keyIterator.next();
        if (key.isAcceptable()) {
            // 接受新连接
        } else if (key.isReadable()) {
            // 读取数据
        }
        keyIterator.remove(); // 必须手动移除
    }
}`}),e.jsxs(t,{type:"warning",title:"为什么必须设置非阻塞？",children:["Channel 注册到 Selector 之前，必须调用 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"configureBlocking(false)"}),"。如果 Channel 是阻塞的，注册时会抛出 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"IllegalBlockingModeException"}),"。"]}),e.jsx("h2",{id:"buffer-operations",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、Buffer 操作机制"}),e.jsx(d,{simpleContent:e.jsx("div",{className:"p-3 sm:p-4 bg-parchment-warm rounded-paper-md text-[13px] sm:text-[14px] text-ink-muted font-sans leading-[1.8]",children:"Buffer 的核心操作流程：put() 写入数据 → flip() 切换为读模式 → get() 读取数据 → clear() 清空缓冲区。flip() 是最关键的方法，它将 limit 设置为当前 position，position 重置为 0。"}),hardcoreContent:e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{language:"java",filename:"BufferOperations.java",description:"Buffer 完整操作流程",highlights:[5,9,13,17],code:`ByteBuffer buffer = ByteBuffer.allocate(1024);

// 1. 写模式：初始状态 position=0, limit=capacity=1024
System.out.println("初始: " + buffer); 

buffer.put("Hello".getBytes());
// 写入后: position=5, limit=1024

// 2. 切换为读模式：flip()
buffer.flip();
// 翻转后: position=0, limit=5

// 3. 读模式：读取数据
byte[] data = new byte[buffer.remaining()];
buffer.get(data);
System.out.println(new String(data)); // 输出: Hello

// 4. 清空缓冲区：clear()
buffer.clear();
// 清空后: position=0, limit=1024`}),e.jsxs(l,{label:"flip() vs rewind() vs clear()",children:[e.jsx("strong",{children:"flip()"}),"：写→读切换，limit=position, position=0。",e.jsx("br",{}),e.jsx("strong",{children:"rewind()"}),"：重读，position=0, limit 不变。",e.jsx("br",{}),e.jsx("strong",{children:"clear()"}),"：清空，position=0, limit=capacity，不真正清除数据。",e.jsx("br",{}),e.jsx("strong",{children:"compact()"}),"：压缩，将未读数据移到开头，适用于部分读取后继续写入。"]})]})}),e.jsx("h2",{id:"nio-model",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、NIO 网络模型"}),e.jsx("h3",{id:"reactor-pattern",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 Reactor 模式"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["NIO 的网络编程通常采用 ",e.jsx("strong",{className:"text-ink-light font-semibold",children:"Reactor 模式"}),"，这是一种事件驱动的设计模式。根据线程模型的不同，Reactor 模式分为三种变体："]}),e.jsx(i,{title:"Reactor 模式演进",steps:[{label:"单线程 Reactor",description:"一个线程处理所有事件，简单但性能瓶颈明显",icon:"🔘"},{label:"多线程 Reactor",description:"Reactor 线程负责监听，Worker 线程池处理读写",icon:"🔵"},{label:"主从 Reactor",description:"MainReactor 处理连接，SubReactor 处理读写，Netty 采用此模型",icon:"🟣"}]}),e.jsxs(t,{type:"info",title:"Netty 的线程模型",children:["Netty 采用",e.jsx("strong",{className:"text-ink-light font-semibold",children:"主从 Reactor 多线程模型"}),"：BossGroup（MainReactor）负责接受客户端连接，WorkerGroup（SubReactor）负责处理连接的读写事件。这种设计充分利用了多核 CPU，实现了高吞吐量。"]}),e.jsx("h2",{id:"server-example",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、NIO 服务器实现"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"下面是一个完整的 NIO 服务器示例："}),e.jsx(s,{language:"java",filename:"NIOServer.java",description:"NIO 服务器完整实现",highlights:[8,15,23,35],code:`public class NIOServer {
    private Selector selector;
    private ByteBuffer buffer = ByteBuffer.allocate(1024);
    
    public void start(int port) throws IOException {
        // 1. 创建 Selector
        selector = Selector.open();
        
        // 2. 创建 ServerSocketChannel 并配置为非阻塞
        ServerSocketChannel serverChannel = ServerSocketChannel.open();
        serverChannel.configureBlocking(false);
        serverChannel.bind(new InetSocketAddress(port));
        
        // 3. 注册 OP_ACCEPT 事件
        serverChannel.register(selector, SelectionKey.OP_ACCEPT);
        
        // 4. 轮询事件
        while (true) {
            selector.select();
            Set<SelectionKey> selectedKeys = selector.selectedKeys();
            Iterator<SelectionKey> iterator = selectedKeys.iterator();
            
            while (iterator.hasNext()) {
                SelectionKey key = iterator.next();
                iterator.remove();
                
                if (key.isAcceptable()) {
                    handleAccept(key);
                } else if (key.isReadable()) {
                    handleRead(key);
                }
            }
        }
    }
    
    private void handleAccept(SelectionKey key) throws IOException {
        ServerSocketChannel serverChannel = (ServerSocketChannel) key.channel();
        SocketChannel clientChannel = serverChannel.accept();
        clientChannel.configureBlocking(false);
        clientChannel.register(selector, SelectionKey.OP_READ);
    }
    
    private void handleRead(SelectionKey key) throws IOException {
        SocketChannel clientChannel = (SocketChannel) key.channel();
        buffer.clear();
        int bytesRead = clientChannel.read(buffer);
        if (bytesRead > 0) {
            buffer.flip();
            byte[] data = new byte[buffer.remaining()];
            buffer.get(data);
            System.out.println("Received: " + new String(data));
        }
    }
    
    public static void main(String[] args) throws IOException {
        new NIOServer().start(8080);
    }
}`}),e.jsxs(l,{label:"为什么需要手动移除 SelectionKey？",children:[e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"selector.selectedKeys()"})," 返回的是已就绪事件的集合，但不会自动移除。如果不手动调用 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"iterator.remove()"}),"，下次循环时会重复处理同一个事件，导致死循环或异常。"]}),e.jsx("h2",{id:"zero-copy",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、零拷贝技术"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["零拷贝（Zero-Copy）是指减少或消除数据在内核态和用户态之间的拷贝次数。NIO 提供了两种零拷贝实现方式：",e.jsx("strong",{className:"text-ink-light font-semibold",children:"mmap 内存映射"}),"和",e.jsx("strong",{className:"text-ink-light font-semibold",children:"sendFile 系统调用"}),"。"]}),e.jsx(s,{language:"java",filename:"SendFileExample.java",description:"sendFile 零拷贝示例",highlights:[7],code:`FileChannel sourceChannel = new FileInputStream("source.dat").getChannel();
FileChannel destChannel = new FileOutputStream("dest.dat").getChannel();

long position = 0;
long count = sourceChannel.size();

// 零拷贝传输：数据直接从源文件发送到目标文件
long bytesTransferred = sourceChannel.transferTo(position, count, destChannel);

System.out.println("Transferred: " + bytesTransferred + " bytes");
sourceChannel.close();
destChannel.close();`}),e.jsxs(t,{type:"tip",title:"零拷贝性能对比",children:["假设传输 1GB 文件：",e.jsx("br",{}),"• ",e.jsx("strong",{children:"传统 IO"}),"：4 次拷贝（磁盘→内核→用户→Socket→网卡），2 次上下文切换",e.jsx("br",{}),"• ",e.jsx("strong",{children:"mmap"}),"：3 次拷贝，2 次上下文切换",e.jsx("br",{}),"• ",e.jsx("strong",{children:"sendFile"}),"：2 次拷贝（磁盘→内核→Socket→网卡），1 次上下文切换",e.jsx("br",{}),"在高吞吐场景下，sendFile 比传统 IO 快约 30-50%。"]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、IO 模型对比"}),e.jsx("div",{className:"overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5",children:e.jsxs("table",{className:"w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[600px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-2.5 px-3 text-ink font-semibold",children:"特性"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-orange font-semibold",children:"BIO"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-teal font-semibold",children:"NIO"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-indigo font-semibold",children:"AIO"})]})}),e.jsxs("tbody",{className:"text-ink-muted",children:[e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"IO 模型"}),e.jsx("td",{className:"py-2.5 px-3",children:"同步阻塞"}),e.jsx("td",{className:"py-2.5 px-3",children:"同步非阻塞"}),e.jsx("td",{className:"py-2.5 px-3",children:"异步非阻塞"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"JDK 版本"}),e.jsx("td",{className:"py-2.5 px-3",children:"JDK 1.0"}),e.jsx("td",{className:"py-2.5 px-3",children:"JDK 1.4"}),e.jsx("td",{className:"py-2.5 px-3",children:"JDK 7"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"线程模型"}),e.jsx("td",{className:"py-2.5 px-3",children:"一连接一线程"}),e.jsx("td",{className:"py-2.5 px-3",children:"多路复用"}),e.jsx("td",{className:"py-2.5 px-3",children:"回调通知"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"并发能力"}),e.jsx("td",{className:"py-2.5 px-3",children:"低"}),e.jsx("td",{className:"py-2.5 px-3",children:"高"}),e.jsx("td",{className:"py-2.5 px-3",children:"极高"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"编程复杂度"}),e.jsx("td",{className:"py-2.5 px-3",children:"简单"}),e.jsx("td",{className:"py-2.5 px-3",children:"复杂"}),e.jsx("td",{className:"py-2.5 px-3",children:"中等"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"典型应用"}),e.jsx("td",{className:"py-2.5 px-3",children:"简单客户端"}),e.jsx("td",{className:"py-2.5 px-3",children:"Netty、Tomcat"}),e.jsx("td",{className:"py-2.5 px-3",children:"Windows 高性能服务"})]})]})]})}),e.jsxs(t,{type:"tip",title:"选型建议",children:["日常开发首选 ",e.jsx("strong",{children:"NIO"}),"（Netty 封装后易用性大幅提升）；简单场景用 BIO；AIO 在 Linux 上实际是伪异步，不建议使用。对于超高并发场景，直接使用 Netty 而非原生 NIO。"]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、常见误区"}),e.jsxs(t,{type:"danger",title:"误区一：NIO 一定比 BIO 快",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"NIO 性能全面优于 BIO",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"NIO 的优势在于",e.jsx("strong",{children:"高并发场景"}),"。如果连接数很少，BIO 的简单线程模型反而更高效，因为 NIO 的 Selector 轮询、Buffer 管理都有额外开销。"]}),e.jsxs(t,{type:"danger",title:"误区二：NIO 就是异步 IO",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"NIO = Non-blocking = 异步",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"NIO 是",e.jsx("strong",{children:"同步非阻塞"}),"，应用程序仍需主动调用 read()/write() 检查数据是否就绪。真正的异步 IO 是 JDK 7 引入的 AIO。"]}),e.jsxs(t,{type:"danger",title:"误区三：DirectBuffer 总是更快",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"直接缓冲区性能一定优于堆缓冲区",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"DirectBuffer 的优势在于",e.jsx("strong",{children:"大数据量、长生命周期"}),"场景。对于小数据量、短生命周期场景，DirectBuffer 的创建销毁开销反而更大。"]}),e.jsxs(t,{type:"danger",title:"误区四：Selector.select() 立即返回",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"select() 会立即返回就绪事件",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"selector.select()"})," 是",e.jsx("strong",{children:"阻塞调用"}),"，直到有事件就绪或超时才返回。"]}),e.jsxs(t,{type:"danger",title:"误区五：NIO 不需要关心线程安全",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"NIO 单线程模型，无需考虑并发",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"虽然 NIO 可以用单线程处理多个连接，但",e.jsx("strong",{children:"Buffer 不是线程安全的"}),"。如果多个线程共享同一个 Buffer，必须加锁或使用 ThreadLocal。"]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、面试真题"}),e.jsx(m,{questions:[{question:"NIO 和 BIO 的核心区别是什么？",answer:"BIO 是同步阻塞 IO，一个连接需要一个线程处理；NIO 是同步非阻塞 IO，通过 Selector 实现多路复用，单线程可管理多个连接。BIO 基于 Stream（流），单向传输；NIO 基于 Buffer（缓冲区）和 Channel（通道），双向传输。"},{question:"Buffer 的 flip()、clear()、compact() 有什么区别？",answer:"flip()：写→读切换，limit=position, position=0。clear()：清空，position=0, limit=capacity，不真正清除数据。compact()：压缩，将未读数据复制到缓冲区开头，position=剩余字节数，适用于部分读取后继续写入的场景。"},{question:"为什么 Channel 注册到 Selector 前必须设置为非阻塞？",answer:"因为 Selector 的设计初衷就是避免阻塞，实现多路复用。如果 Channel 是阻塞的，注册时会抛出 IllegalBlockingModeException。阻塞 Channel 与 Selector 的非阻塞理念相悖。"},{question:"什么是零拷贝？NIO 如何实现零拷贝？",answer:"零拷贝是指减少或消除数据在内核态和用户态之间的拷贝次数。NIO 提供两种实现：1）mmap 内存映射：将文件直接映射到用户空间内存；2）sendFile 系统调用：直接在两个文件描述符之间传输数据，完全绕过用户空间，只需 2 次 DMA 拷贝，性能最优。"},{question:"Selector.select() 的空轮询 Bug 是什么？如何解决？",answer:"JDK NIO 在 Linux epoll 实现中存在空轮询 Bug：selector.select() 在没有就绪事件时仍会返回，导致 CPU 100%。解决方案：1）升级到 JDK 8u51+（已修复）；2）使用 Netty（内部已处理）；3）手动检测并重建 Selector。"},{question:"DirectBuffer 和 HeapBuffer 的区别及选型建议？",answer:"DirectBuffer：位于 JVM 堆外内存，通过 JNI 直接与操作系统交互，适合大数据量、长生命周期场景。但创建销毁开销大，不受 GC 管理。HeapBuffer：位于 JVM 堆内，GC 可管理，创建销毁快，适合小数据量、短生命周期场景。"},{question:"Reactor 模式有哪些变体？Netty 采用哪种？",answer:"Reactor 模式有三种变体：1）单线程 Reactor；2）多线程 Reactor；3）主从 Reactor。Netty 采用主从 Reactor 多线程模型：BossGroup 接受连接，WorkerGroup 处理读写，实现了高吞吐量。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4",children:[e.jsx("div",{className:"text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3",children:"← 前置知识"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"📋"}),e.jsx("span",{children:"IO 流系统基础"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🧵"}),e.jsx("span",{children:"多线程与并发编程"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🌐"}),e.jsx("span",{children:"TCP/IP 网络协议"})]})]})]}),e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4",children:[e.jsx("div",{className:"text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3",children:"延伸知识 →"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"⚡"}),e.jsx("span",{children:"Netty 框架深度解析"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🔒"}),e.jsx("span",{children:"ConcurrentHashMap 源码分析"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🚀"}),e.jsx("span",{children:"高性能服务器架构设计"})]})]})]})]}),e.jsx(o,{...n(r.category,r.id)})]})}),e.jsx(c,{items:p})]})}export{I as default};
