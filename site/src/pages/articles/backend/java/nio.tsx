import KnowledgeLayout from '../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../components/knowledge/Playground'
import InteractiveFlow from '../../../components/knowledge/InteractiveFlow'
import SideNote from '../../../components/knowledge/SideNote'
import ContextSwitcher from '../../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../../components/knowledge/SmartTOC'
import Callout from '../../../components/ui/Callout'
import DiagramBlock from '../../../components/ui/DiagramBlock'
import InterviewSection from '../../../components/ui/InterviewSection'
import ArticleNav from '../../../components/article/ArticleNav'
import { getArticleNav } from '../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、NIO 整体架构', level: 2 },
  { id: 'bio-vs-nio', text: '1.1 BIO vs NIO 对比', level: 3 },
  { id: 'core-components', text: '二、核心组件详解', level: 2 },
  { id: 'buffer', text: '2.1 Buffer（缓冲区）', level: 3 },
  { id: 'channel', text: '2.2 Channel（通道）', level: 3 },
  { id: 'selector', text: '2.3 Selector（选择器）', level: 3 },
  { id: 'buffer-operations', text: '三、Buffer 操作机制', level: 2 },
  { id: 'nio-model', text: '四、NIO 网络模型', level: 2 },
  { id: 'reactor-pattern', text: '4.1 Reactor 模式', level: 3 },
  { id: 'server-example', text: '五、NIO 服务器实现', level: 2 },
  { id: 'zero-copy', text: '六、零拷贝技术', level: 2 },
  { id: 'comparison', text: '七、IO 模型对比', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function Nio({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              NIO（New IO / Non-blocking IO）是 JDK 1.4 引入的非阻塞 IO 框架，基于
              <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1">Buffer</code>、
              <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1">Channel</code>、
              <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1">Selector</code>
              三大核心组件，支持单线程管理多个连接，实现高并发网络编程。
            </p>
          </blockquote>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、NIO 整体架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            NIO 是对传统 BIO（Blocking IO）的重大改进。BIO 采用同步阻塞模型，每个连接需要一个独立线程处理；NIO 采用同步非阻塞模型，通过多路复用器（Selector）实现单线程管理成千上万个连接。
          </p>

          <h3 id="bio-vs-nio" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.1 BIO vs NIO 对比
          </h3>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">特性</th>
                  <th className="text-left py-2.5 px-3 text-orange font-semibold">BIO</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">NIO</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">IO 模型</td><td className="py-2.5 px-3">同步阻塞</td><td className="py-2.5 px-3">同步非阻塞</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">数据单位</td><td className="py-2.5 px-3">Stream（流）</td><td className="py-2.5 px-3">Buffer（缓冲区）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">连接方式</td><td className="py-2.5 px-3">一对一</td><td className="py-2.5 px-3">一对多（多路复用）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">线程模型</td><td className="py-2.5 px-3">一个连接一个线程</td><td className="py-2.5 px-3">一个线程管理多个连接</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">适用场景</td><td className="py-2.5 px-3">连接数少且固定</td><td className="py-2.5 px-3">高并发、长连接</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">代表框架</td><td className="py-2.5 px-3">java.net.Socket</td><td className="py-2.5 px-3">java.nio.channels</td></tr>
              </tbody>
            </table>
          </div>

          <DiagramBlock title="BIO vs NIO 线程模型对比">
            <svg className="w-full max-w-[600px] mx-auto block" viewBox="0 0 600 200">
              <text x="150" y="20" fill="#b5651d" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">BIO 模型</text>
              <rect x="20" y="30" width="260" height="100" rx="6" fill="#f5f0e8" stroke="#d4c5a9" strokeWidth="2"/>
              <circle cx="60" cy="60" r="15" fill="#b5651d" opacity="0.2" stroke="#b5651d" strokeWidth="2"/>
              <text x="60" y="65" fill="#b5651d" fontSize="10" fontFamily="monospace" textAnchor="middle">C1</text>
              <line x1="75" y1="60" x2="120" y2="60" stroke="#b5651d" strokeWidth="2"/>
              <rect x="120" y="45" width="80" height="30" rx="4" fill="#b5651d" opacity="0.15" stroke="#b5651d"/>
              <text x="160" y="65" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">Thread-1</text>
              <circle cx="60" cy="100" r="15" fill="#b5651d" opacity="0.2" stroke="#b5651d" strokeWidth="2"/>
              <text x="60" y="105" fill="#b5651d" fontSize="10" fontFamily="monospace" textAnchor="middle">C2</text>
              <line x1="75" y1="100" x2="120" y2="100" stroke="#b5651d" strokeWidth="2"/>
              <rect x="120" y="85" width="80" height="30" rx="4" fill="#b5651d" opacity="0.15" stroke="#b5651d"/>
              <text x="160" y="105" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">Thread-2</text>
              <text x="150" y="150" fill="#8a7d6b" fontSize="9" fontFamily="sans-serif" textAnchor="middle">n 个连接 → n 个线程</text>
              
              <text x="450" y="20" fill="#5f7a68" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">NIO 模型</text>
              <rect x="320" y="30" width="260" height="100" rx="6" fill="#f0f5f3" stroke="#5f7a68" strokeWidth="2"/>
              <circle cx="360" cy="60" r="15" fill="#5f7a68" opacity="0.2" stroke="#5f7a68" strokeWidth="2"/>
              <text x="360" y="65" fill="#5f7a68" fontSize="10" fontFamily="monospace" textAnchor="middle">C1</text>
              <line x1="375" y1="60" x2="420" y2="60" stroke="#5f7a68" strokeWidth="2"/>
              <circle cx="360" cy="100" r="15" fill="#5f7a68" opacity="0.2" stroke="#5f7a68" strokeWidth="2"/>
              <text x="360" y="105" fill="#5f7a68" fontSize="10" fontFamily="monospace" textAnchor="middle">C2</text>
              <line x1="375" y1="100" x2="420" y2="100" stroke="#5f7a68" strokeWidth="2"/>
              <rect x="420" y="50" width="100" height="60" rx="4" fill="#5f7a68" opacity="0.15" stroke="#5f7a68"/>
              <text x="470" y="85" fill="#3d5245" fontSize="9" fontFamily="monospace" textAnchor="middle">Selector</text>
              <text x="470" y="100" fill="#3d5245" fontSize="9" fontFamily="monospace" textAnchor="middle">Thread-1</text>
              <text x="450" y="150" fill="#8a7d6b" fontSize="9" fontFamily="sans-serif" textAnchor="middle">n 个连接 → 1 个线程</text>
            </svg>
          </DiagramBlock>

          <Callout type="tip" title="核心要点">
            NIO 的核心优势在于<strong className="text-ink-light font-semibold">多路复用</strong>：通过 Selector 监听多个 Channel 的事件，只有当事件就绪时才进行处理，避免了 BIO 中线程阻塞等待的问题。这使得 NIO 非常适合高并发、长连接的场景。
          </Callout>

          <h2 id="core-components" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、核心组件详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            NIO 由三大核心组件构成：<strong className="text-ink-light font-semibold">Buffer（缓冲区）</strong>、<strong className="text-ink-light font-semibold">Channel（通道）</strong>、<strong className="text-ink-light font-semibold">Selector（选择器）</strong>。
          </p>

          <h3 id="buffer" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 Buffer（缓冲区）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Buffer 是一个固定大小的数据容器，用于在 Channel 之间传输数据。与 BIO 的 Stream 不同，Buffer 允许双向读写。
          </p>

          <Playground language="java" filename="BufferTypes.java" description="Buffer 主要类型" highlights={[1, 3, 5]}
            code={`// ByteBuffer - 最常用，字节缓冲区
ByteBuffer byteBuf = ByteBuffer.allocate(1024);

// CharBuffer - 字符缓冲区
CharBuffer charBuf = CharBuffer.allocate(256);

// IntBuffer、LongBuffer、FloatBuffer、DoubleBuffer、ShortBuffer
IntBuffer intBuf = IntBuffer.allocate(128);`}
          />

          <SideNote label="直接缓冲区 vs 堆缓冲区">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">allocateDirect()</code> 创建的直接缓冲区位于 JVM 堆外内存，性能更高但创建销毁开销大。<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">allocate()</code> 创建的堆缓冲区位于 JVM 堆内，GC 可管理。
          </SideNote>

          <h3 id="channel" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 Channel（通道）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Channel 是数据传输的通道，类似于 BIO 中的 Stream，但支持双向传输和非阻塞读写。
          </p>

          <Playground language="java" filename="ChannelTypes.java" description="Channel 主要类型" highlights={[1, 3, 5, 7]}
            code={`// FileChannel - 文件通道
FileChannel fileChannel = new FileInputStream("file.txt").getChannel();

// SocketChannel - TCP 套接字通道
SocketChannel socketChannel = SocketChannel.open();

// ServerSocketChannel - TCP 服务端通道
ServerSocketChannel serverChannel = ServerSocketChannel.open();

// DatagramChannel - UDP 通道
DatagramChannel datagramChannel = DatagramChannel.open();`}
          />

          <h3 id="selector" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.3 Selector（选择器）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Selector 是 NIO 的核心，它允许单线程监控多个 Channel 的事件。当某个 Channel 有事件就绪时，Selector 会通知应用程序进行处理。
          </p>

          <Playground language="java" filename="SelectorExample.java" description="Selector 基本用法" highlights={[3, 7, 12]}
            code={`// 1. 创建 Selector
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
}`}
          />

          <Callout type="warning" title="为什么必须设置非阻塞？">
            Channel 注册到 Selector 之前，必须调用 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">configureBlocking(false)</code>。如果 Channel 是阻塞的，注册时会抛出 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">IllegalBlockingModeException</code>。
          </Callout>

          <h2 id="buffer-operations" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Buffer 操作机制
          </h2>

          <ContextSwitcher
            simpleContent={
              <div className="p-3 sm:p-4 bg-parchment-warm rounded-paper-md text-[13px] sm:text-[14px] text-ink-muted font-sans leading-[1.8]">
                Buffer 的核心操作流程：put() 写入数据 → flip() 切换为读模式 → get() 读取数据 → clear() 清空缓冲区。flip() 是最关键的方法，它将 limit 设置为当前 position，position 重置为 0。
              </div>
            }
            hardcoreContent={
              <div className="space-y-3">
                <Playground language="java" filename="BufferOperations.java" description="Buffer 完整操作流程" highlights={[5, 9, 13, 17]}
                  code={`ByteBuffer buffer = ByteBuffer.allocate(1024);

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
// 清空后: position=0, limit=1024`}
                />
                <SideNote label="flip() vs rewind() vs clear()">
                  <strong>flip()</strong>：写→读切换，limit=position, position=0。<br/>
                  <strong>rewind()</strong>：重读，position=0, limit 不变。<br/>
                  <strong>clear()</strong>：清空，position=0, limit=capacity，不真正清除数据。<br/>
                  <strong>compact()</strong>：压缩，将未读数据移到开头，适用于部分读取后继续写入。
                </SideNote>
              </div>
            }
          />

          <h2 id="nio-model" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、NIO 网络模型
          </h2>

          <h3 id="reactor-pattern" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 Reactor 模式
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            NIO 的网络编程通常采用 <strong className="text-ink-light font-semibold">Reactor 模式</strong>，这是一种事件驱动的设计模式。根据线程模型的不同，Reactor 模式分为三种变体：
          </p>

          <InteractiveFlow title="Reactor 模式演进" steps={[
            { label: '单线程 Reactor', description: '一个线程处理所有事件，简单但性能瓶颈明显', icon: '🔘' },
            { label: '多线程 Reactor', description: 'Reactor 线程负责监听，Worker 线程池处理读写', icon: '🔵' },
            { label: '主从 Reactor', description: 'MainReactor 处理连接，SubReactor 处理读写，Netty 采用此模型', icon: '🟣' },
          ]} />

          <Callout type="info" title="Netty 的线程模型">
            Netty 采用<strong className="text-ink-light font-semibold">主从 Reactor 多线程模型</strong>：BossGroup（MainReactor）负责接受客户端连接，WorkerGroup（SubReactor）负责处理连接的读写事件。这种设计充分利用了多核 CPU，实现了高吞吐量。
          </Callout>

          <h2 id="server-example" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、NIO 服务器实现
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            下面是一个完整的 NIO 服务器示例：
          </p>

          <Playground language="java" filename="NIOServer.java" description="NIO 服务器完整实现" highlights={[8, 15, 23, 35]}
            code={`public class NIOServer {
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
}`}
          />

          <SideNote label="为什么需要手动移除 SelectionKey？">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">selector.selectedKeys()</code> 返回的是已就绪事件的集合，但不会自动移除。如果不手动调用 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">iterator.remove()</code>，下次循环时会重复处理同一个事件，导致死循环或异常。
          </SideNote>

          <h2 id="zero-copy" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、零拷贝技术
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            零拷贝（Zero-Copy）是指减少或消除数据在内核态和用户态之间的拷贝次数。NIO 提供了两种零拷贝实现方式：<strong className="text-ink-light font-semibold">mmap 内存映射</strong>和<strong className="text-ink-light font-semibold">sendFile 系统调用</strong>。
          </p>

          <Playground language="java" filename="SendFileExample.java" description="sendFile 零拷贝示例" highlights={[7]}
            code={`FileChannel sourceChannel = new FileInputStream("source.dat").getChannel();
FileChannel destChannel = new FileOutputStream("dest.dat").getChannel();

long position = 0;
long count = sourceChannel.size();

// 零拷贝传输：数据直接从源文件发送到目标文件
long bytesTransferred = sourceChannel.transferTo(position, count, destChannel);

System.out.println("Transferred: " + bytesTransferred + " bytes");
sourceChannel.close();
destChannel.close();`}
          />

          <Callout type="tip" title="零拷贝性能对比">
            假设传输 1GB 文件：<br/>
            • <strong>传统 IO</strong>：4 次拷贝（磁盘→内核→用户→Socket→网卡），2 次上下文切换<br/>
            • <strong>mmap</strong>：3 次拷贝，2 次上下文切换<br/>
            • <strong>sendFile</strong>：2 次拷贝（磁盘→内核→Socket→网卡），1 次上下文切换<br/>
            在高吞吐场景下，sendFile 比传统 IO 快约 30-50%。
          </Callout>

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、IO 模型对比
          </h2>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">特性</th>
                  <th className="text-left py-2.5 px-3 text-orange font-semibold">BIO</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">NIO</th>
                  <th className="text-left py-2.5 px-3 text-indigo font-semibold">AIO</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">IO 模型</td><td className="py-2.5 px-3">同步阻塞</td><td className="py-2.5 px-3">同步非阻塞</td><td className="py-2.5 px-3">异步非阻塞</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">JDK 版本</td><td className="py-2.5 px-3">JDK 1.0</td><td className="py-2.5 px-3">JDK 1.4</td><td className="py-2.5 px-3">JDK 7</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">线程模型</td><td className="py-2.5 px-3">一连接一线程</td><td className="py-2.5 px-3">多路复用</td><td className="py-2.5 px-3">回调通知</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">并发能力</td><td className="py-2.5 px-3">低</td><td className="py-2.5 px-3">高</td><td className="py-2.5 px-3">极高</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">编程复杂度</td><td className="py-2.5 px-3">简单</td><td className="py-2.5 px-3">复杂</td><td className="py-2.5 px-3">中等</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">典型应用</td><td className="py-2.5 px-3">简单客户端</td><td className="py-2.5 px-3">Netty、Tomcat</td><td className="py-2.5 px-3">Windows 高性能服务</td></tr>
              </tbody>
            </table>
          </div>

          <Callout type="tip" title="选型建议">
            日常开发首选 <strong>NIO</strong>（Netty 封装后易用性大幅提升）；简单场景用 BIO；AIO 在 Linux 上实际是伪异步，不建议使用。对于超高并发场景，直接使用 Netty 而非原生 NIO。
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区一：NIO 一定比 BIO 快">
            <span className="font-semibold text-ink-light">你以为的：</span>NIO 性能全面优于 BIO<br/>
            <span className="font-semibold text-accent">实际：</span>NIO 的优势在于<strong>高并发场景</strong>。如果连接数很少，BIO 的简单线程模型反而更高效，因为 NIO 的 Selector 轮询、Buffer 管理都有额外开销。
          </Callout>

          <Callout type="danger" title="误区二：NIO 就是异步 IO">
            <span className="font-semibold text-ink-light">你以为的：</span>NIO = Non-blocking = 异步<br/>
            <span className="font-semibold text-accent">实际：</span>NIO 是<strong>同步非阻塞</strong>，应用程序仍需主动调用 read()/write() 检查数据是否就绪。真正的异步 IO 是 JDK 7 引入的 AIO。
          </Callout>

          <Callout type="danger" title="误区三：DirectBuffer 总是更快">
            <span className="font-semibold text-ink-light">你以为的：</span>直接缓冲区性能一定优于堆缓冲区<br/>
            <span className="font-semibold text-accent">实际：</span>DirectBuffer 的优势在于<strong>大数据量、长生命周期</strong>场景。对于小数据量、短生命周期场景，DirectBuffer 的创建销毁开销反而更大。
          </Callout>

          <Callout type="danger" title="误区四：Selector.select() 立即返回">
            <span className="font-semibold text-ink-light">你以为的：</span>select() 会立即返回就绪事件<br/>
            <span className="font-semibold text-accent">实际：</span><code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">selector.select()</code> 是<strong>阻塞调用</strong>，直到有事件就绪或超时才返回。
          </Callout>

          <Callout type="danger" title="误区五：NIO 不需要关心线程安全">
            <span className="font-semibold text-ink-light">你以为的：</span>NIO 单线程模型，无需考虑并发<br/>
            <span className="font-semibold text-accent">实际：</span>虽然 NIO 可以用单线程处理多个连接，但<strong>Buffer 不是线程安全的</strong>。如果多个线程共享同一个 Buffer，必须加锁或使用 ThreadLocal。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection questions={[
            { question: 'NIO 和 BIO 的核心区别是什么？', answer: 'BIO 是同步阻塞 IO，一个连接需要一个线程处理；NIO 是同步非阻塞 IO，通过 Selector 实现多路复用，单线程可管理多个连接。BIO 基于 Stream（流），单向传输；NIO 基于 Buffer（缓冲区）和 Channel（通道），双向传输。' },
            { question: 'Buffer 的 flip()、clear()、compact() 有什么区别？', answer: 'flip()：写→读切换，limit=position, position=0。clear()：清空，position=0, limit=capacity，不真正清除数据。compact()：压缩，将未读数据复制到缓冲区开头，position=剩余字节数，适用于部分读取后继续写入的场景。' },
            { question: '为什么 Channel 注册到 Selector 前必须设置为非阻塞？', answer: '因为 Selector 的设计初衷就是避免阻塞，实现多路复用。如果 Channel 是阻塞的，注册时会抛出 IllegalBlockingModeException。阻塞 Channel 与 Selector 的非阻塞理念相悖。' },
            { question: '什么是零拷贝？NIO 如何实现零拷贝？', answer: '零拷贝是指减少或消除数据在内核态和用户态之间的拷贝次数。NIO 提供两种实现：1）mmap 内存映射：将文件直接映射到用户空间内存；2）sendFile 系统调用：直接在两个文件描述符之间传输数据，完全绕过用户空间，只需 2 次 DMA 拷贝，性能最优。' },
            { question: 'Selector.select() 的空轮询 Bug 是什么？如何解决？', answer: 'JDK NIO 在 Linux epoll 实现中存在空轮询 Bug：selector.select() 在没有就绪事件时仍会返回，导致 CPU 100%。解决方案：1）升级到 JDK 8u51+（已修复）；2）使用 Netty（内部已处理）；3）手动检测并重建 Selector。' },
            { question: 'DirectBuffer 和 HeapBuffer 的区别及选型建议？', answer: 'DirectBuffer：位于 JVM 堆外内存，通过 JNI 直接与操作系统交互，适合大数据量、长生命周期场景。但创建销毁开销大，不受 GC 管理。HeapBuffer：位于 JVM 堆内，GC 可管理，创建销毁快，适合小数据量、短生命周期场景。' },
            { question: 'Reactor 模式有哪些变体？Netty 采用哪种？', answer: 'Reactor 模式有三种变体：1）单线程 Reactor；2）多线程 Reactor；3）主从 Reactor。Netty 采用主从 Reactor 多线程模型：BossGroup 接受连接，WorkerGroup 处理读写，实现了高吞吐量。' },
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">← 前置知识</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">📋</span><span>IO 流系统基础</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🧵</span><span>多线程与并发编程</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🌐</span><span>TCP/IP 网络协议</span></div>
              </div>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">延伸知识 →</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">⚡</span><span>Netty 框架深度解析</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔒</span><span>ConcurrentHashMap 源码分析</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🚀</span><span>高性能服务器架构设计</span></div>
              </div>
            </div>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      <SmartTOC items={tocItems} />
    </div>
  )
}
