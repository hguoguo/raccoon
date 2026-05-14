import type { KnowledgeNode, TocItem } from '../../../../../data/types'
import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import Callout from '../../../../../components/ui/Callout'
import CodeBlock from '../../../../../components/ui/CodeBlock'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import SideNote from '../../../../../components/knowledge/SideNote'
import Playground from '../../../../../components/knowledge/Playground'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'

const tocItems: TocItem[] = [
  { id: 'overview', text: 'Socket 编程概述', level: 2 },
  { id: 'socket-concept', text: '什么是 Socket？', level: 2 },
  { id: 'tcp-socket', text: 'TCP Socket 编程', level: 2 },
  { id: 'tcp-server', text: '服务端实现', level: 3 },
  { id: 'tcp-client', text: '客户端实现', level: 3 },
  { id: 'udp-socket', text: 'UDP Socket 编程', level: 2 },
  { id: 'udp-server', text: '服务端实现', level: 3 },
  { id: 'udp-client', text: '客户端实现', level: 3 },
  { id: 'tcp-vs-udp', text: 'TCP vs UDP 编程对比', level: 2 },
  { id: 'nio-intro', text: 'NIO 与多路复用', level: 2 },
  { id: 'reactor-pattern', text: 'Reactor 模式详解', level: 2 },
  { id: 'netty-framework', text: 'Netty 框架简介', level: 2 },
  { id: 'common-issues', text: '常见问题与误区', level: 2 },
  { id: 'interview-questions', text: '面试真题', level: 2 },
]

export default function SocketProgrammingPage({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>
          {/* ===== 定义 ===== */}
          <section id="overview">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              Socket 编程概述
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Socket（套接字）是网络编程的基础抽象，它提供了应用程序与网络协议栈之间的接口。通过 Socket，程序员可以使用统一的 API 进行网络通信，而无需关心底层协议的复杂细节。
            </p>
            <Callout type="info" title="为什么需要 Socket？">
              在网络通信中，应用层程序需要与传输层（TCP/UDP）交互。Socket 作为操作系统提供的系统调用接口，屏蔽了协议实现的复杂性，让开发者可以专注于业务逻辑。
            </Callout>
          </section>

          {/* ===== Socket 概念 ===== */}
          <section id="socket-concept">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              什么是 Socket？
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Socket 是 IP 地址和端口号的组合，唯一标识网络中的一个通信端点。一个完整的 Socket 由五元组组成：
            </p>

            <table className="w-full border-collapse text-[13px] sm:text-[14px] my-6">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-stone-300 px-3 py-2 text-left font-semibold text-ink">元素</th>
                  <th className="border border-stone-300 px-3 py-2 text-left font-semibold text-ink">说明</th>
                  <th className="border border-stone-300 px-3 py-2 text-left font-semibold text-ink">示例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted"><strong>协议</strong></td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">TCP 或 UDP</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]">TCP</td>
                </tr>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted"><strong>源 IP</strong></td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">发送方 IP 地址</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]">192.168.1.100</td>
                </tr>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted"><strong>源端口</strong></td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">发送方端口号</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]">54321</td>
                </tr>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted"><strong>目标 IP</strong></td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">接收方 IP 地址</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]">10.0.0.1</td>
                </tr>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted"><strong>目标端口</strong></td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">接收方端口号</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]">8080</td>
                </tr>
              </tbody>
            </table>

            <DiagramBlock title="Socket 通信模型">
              {`graph LR
    subgraph Client["客户端"]
        A[Application] --> B[Socket<br/>192.168.1.100:54321]
    end
    
    subgraph Network["网络"]
        B -->|【输出】数据包| C[(Internet)]
    end
    
    subgraph Server["服务端"]
        C -->|【输入】数据包| D[Socket<br/>10.0.0.1:8080]
        D --> E[Application]
    end
    
    style B fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style D fill:#dcfce7,stroke:#22c55e,stroke-width:2px`}
            </DiagramBlock>

            <SideNote label="端口范围">
              端口号范围是 0-65535。其中 0-1023 是知名端口（Well-known Ports），如 HTTP(80)、HTTPS(443)；1024-49151 是注册端口；49152-65535 是动态/私有端口。
            </SideNote>
          </section>

          {/* ===== TCP Socket 编程 ===== */}
          <section id="tcp-socket">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              TCP Socket 编程
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              TCP Socket 提供面向连接的可靠通信。Java 中使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ServerSocket</code> 和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Socket</code> 类实现。
            </p>
          </section>

          {/* TCP 服务端 */}
          <section id="tcp-server">
            <h3 id="tcp-server" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              服务端实现
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              TCP 服务端需要经历以下步骤：创建 ServerSocket → 绑定端口 → 监听连接 → 接受客户端 → 处理请求 → 关闭连接。
            </p>

            <CodeBlock
              language="java"
              code={`import java.io.*;
import java.net.*;

public class TcpServer {
    public static void main(String[] args) throws IOException {
        // 1. 创建 ServerSocket，绑定端口 8080
        ServerSocket serverSocket = new ServerSocket(8080);
        System.out.println("服务器启动，监听端口 8080...");
        
        // 2. 循环接受客户端连接
        while (true) {
            // 【输出】阻塞等待客户端连接
            Socket clientSocket = serverSocket.accept();
            System.out.println("新客户端连接: " + 
                clientSocket.getInetAddress() + ":" + 
                clientSocket.getPort());
            
            // 3. 为每个客户端创建独立线程处理
            new Thread(() -> {
                try {
                    handleClient(clientSocket);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
    
    private static void handleClient(Socket socket) throws IOException {
        try (
            // 【输入】从客户端读取数据
            BufferedReader in = new BufferedReader(
                new InputStreamReader(socket.getInputStream())
            );
            // 【输出】向客户端发送数据
            PrintWriter out = new PrintWriter(
                socket.getOutputStream(), true
            )
        ) {
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println("收到消息: " + inputLine);
                // 回声响应
                out.println("Echo: " + inputLine);
                
                if ("bye".equalsIgnoreCase(inputLine)) {
                    break;
                }
            }
        } finally {
            socket.close();
        }
    }
}`}
            />

            <Callout type="warning" title="注意资源泄漏">
              必须正确关闭 Socket 和流资源。建议使用 try-with-resources 语句自动管理资源，避免文件描述符泄漏。
            </Callout>
          </section>

          {/* TCP 客户端 */}
          <section id="tcp-client">
            <h3 id="tcp-client" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              客户端实现
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              TCP 客户端的实现相对简单：创建 Socket → 连接服务端 → 发送/接收数据 → 关闭连接。
            </p>

            <CodeBlock
              language="java"
              code={`import java.io.*;
import java.net.*;

public class TcpClient {
    public static void main(String[] args) throws IOException {
        // 1. 创建 Socket，连接服务端
        String host = "localhost";
        int port = 8080;
        
        try (Socket socket = new Socket(host, port);
             // 【输出】向服务端发送数据
             PrintWriter out = new PrintWriter(
                 socket.getOutputStream(), true
             );
             // 【输入】从服务端读取数据
             BufferedReader in = new BufferedReader(
                 new InputStreamReader(socket.getInputStream())
             );
             BufferedReader stdIn = new BufferedReader(
                 new InputStreamReader(System.in)
             )
        ) {
            String userInput;
            System.out.println("连接到服务端: " + host + ":" + port);
            
            // 2. 循环读取用户输入并发送
            while ((userInput = stdIn.readLine()) != null) {
                out.println(userInput);
                // 【输入】接收服务端响应
                String response = in.readLine();
                System.out.println("服务端响应: " + response);
                
                if ("bye".equalsIgnoreCase(userInput)) {
                    break;
                }
            }
        }
    }
}`}
            />

            <SideNote label="连接超时">
              可以使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">socket.connect(new InetSocketAddress(host, port), timeout)</code> 设置连接超时时间，避免无限等待。
            </SideNote>
          </section>

          {/* ===== UDP Socket 编程 ===== */}
          <section id="udp-socket">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              UDP Socket 编程
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              UDP Socket 提供无连接的不可靠通信。Java 中使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">DatagramSocket</code> 和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">DatagramPacket</code> 类实现。
            </p>
          </section>

          {/* UDP 服务端 */}
          <section id="udp-server">
            <h3 id="udp-server" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              服务端实现
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              UDP 服务端不需要建立连接，直接接收数据报并响应。
            </p>

            <CodeBlock
              language="java"
              code={`import java.net.*;

public class UdpServer {
    public static void main(String[] args) throws Exception {
        // 1. 创建 DatagramSocket，绑定端口 9000
        DatagramSocket socket = new DatagramSocket(9000);
        System.out.println("UDP 服务器启动，监听端口 9000...");
        
        byte[] receiveBuffer = new byte[1024];
        byte[] sendBuffer = new byte[1024];
        
        while (true) {
            // 2. 创建接收数据包
            DatagramPacket receivePacket = new DatagramPacket(
                receiveBuffer, receiveBuffer.length
            );
            
            // 【输入】阻塞等待接收数据
            socket.receive(receivePacket);
            
            // 3. 解析收到的数据
            String message = new String(
                receivePacket.getData(), 
                0, 
                receivePacket.getLength()
            );
            InetAddress clientAddress = receivePacket.getAddress();
            int clientPort = receivePacket.getPort();
            
            System.out.println("收到消息: " + message + 
                " 来自: " + clientAddress + ":" + clientPort);
            
            // 4. 构造响应数据
            String response = "Echo: " + message;
            sendBuffer = response.getBytes();
            
            // 【输出】发送响应给客户端
            DatagramPacket sendPacket = new DatagramPacket(
                sendBuffer, 
                sendBuffer.length,
                clientAddress, 
                clientPort
            );
            socket.send(sendPacket);
        }
    }
}`}
            />
          </section>

          {/* UDP 客户端 */}
          <section id="udp-client">
            <h3 id="udp-client" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              客户端实现
            </h3>

            <CodeBlock
              language="java"
              code={`import java.net.*;

public class UdpClient {
    public static void main(String[] args) throws Exception {
        // 1. 创建 DatagramSocket（不绑定特定端口）
        DatagramSocket socket = new DatagramSocket();
        
        String host = "localhost";
        int port = 9000;
        InetAddress address = InetAddress.getByName(host);
        
        // 2. 发送数据
        String message = "Hello UDP Server";
        byte[] sendBuffer = message.getBytes();
        
        // 【输出】发送数据报到服务端
        DatagramPacket sendPacket = new DatagramPacket(
            sendBuffer, 
            sendBuffer.length,
            address, 
            port
        );
        socket.send(sendPacket);
        System.out.println("已发送: " + message);
        
        // 3. 接收响应
        byte[] receiveBuffer = new byte[1024];
        DatagramPacket receivePacket = new DatagramPacket(
            receiveBuffer, 
            receiveBuffer.length
        );
        
        // 【输入】接收服务端响应
        socket.receive(receivePacket);
        
        String response = new String(
            receivePacket.getData(), 
            0, 
            receivePacket.getLength()
        );
        System.out.println("收到响应: " + response);
        
        socket.close();
    }
}`}
            />

            <Callout type="tip" title="UDP 的特点">
              UDP 不保证数据到达、不保证顺序、不重传丢失的数据包。适用于实时性要求高、能容忍少量丢包的场景，如视频直播、在线游戏、DNS 查询等。
            </Callout>
          </section>

          {/* ===== TCP vs UDP 编程对比 ===== */}
          <section id="tcp-vs-udp">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              TCP vs UDP 编程对比
            </h2>

            <table className="w-full border-collapse text-[13px] sm:text-[14px] my-6">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-stone-300 px-3 py-2 text-left font-semibold text-ink">特性</th>
                  <th className="border border-stone-300 px-3 py-2 text-left font-semibold text-ink">TCP</th>
                  <th className="border border-stone-300 px-3 py-2 text-left font-semibold text-ink">UDP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">API 类</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]">ServerSocket, Socket</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]">DatagramSocket, DatagramPacket</td>
                </tr>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">连接方式</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">面向连接（三次握手）</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">无连接</td>
                </tr>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">数据传输</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">字节流（Stream）</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">数据报（Packet）</td>
                </tr>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">可靠性</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">保证可靠、有序</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">不保证，可能丢包/乱序</td>
                </tr>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">粘包问题</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">存在，需自行处理边界</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">不存在，以数据包为单位</td>
                </tr>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">并发模型</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">多线程/线程池/NIO</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">单线程即可处理多个客户端</td>
                </tr>
              </tbody>
            </table>

            <ContextSwitcher
              simpleContent={
                <div className="space-y-3">
                  <p><strong>文件传输 📁：</strong>选择 TCP，必须保证数据完整性和顺序</p>
                  <p><strong>即时通讯 💬：</strong>选择 TCP，确保消息不丢失</p>
                </div>
              }
              hardcoreContent={
                <div className="space-y-3">
                  <p><strong>视频直播 📹：</strong>选择 UDP，容忍少量丢包以换取低延迟</p>
                  <p><strong>DNS 查询 🔍：</strong>选择 UDP，快速响应，失败可重试</p>
                </div>
              }
            />
          </section>

          {/* ===== NIO 与多路复用 ===== */}
          <section id="nio-intro">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              NIO 与多路复用
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              传统的 BIO（Blocking I/O）模型中，每个连接需要一个独立的线程处理，导致线程资源浪费。NIO（Non-blocking I/O）引入了<strong>多路复用器（Selector）</strong>，允许单个线程管理多个 Channel。
            </p>

            <DiagramBlock title="BIO vs NIO 模型对比">
              {`graph TB
    subgraph BIO["BIO 模型（一连接一线程）"]
        A1[Client1] --> T1[Thread1]
        A2[Client2] --> T2[Thread2]
        A3[Client3] --> T3[Thread3]
        T1 --> S1[Server]
        T2 --> S1
        T3 --> S1
    end
    
    subgraph NIO["NIO 模型（单线程多连接）"]
        B1[Client1] --> Sel[Selector]
        B2[Client2] --> Sel
        B3[Client3] --> Sel
        Sel --> T[Single Thread]
        T --> S2[Server]
    end
    
    style BIO fill:#fee2e2,stroke:#ef4444,stroke-width:2px
    style NIO fill:#dcfce7,stroke:#22c55e,stroke-width:2px`}
            </DiagramBlock>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong>NIO 核心组件：</strong>
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
              <li><strong className="text-ink">Channel（通道）：</strong>双向数据传输通道，类似 Stream 但支持非阻塞模式</li>
              <li><strong className="text-ink">Buffer（缓冲区）：</strong>数据的容器，所有数据读写都通过 Buffer</li>
              <li><strong className="text-ink">Selector（选择器）：</strong>多路复用器，监控多个 Channel 的 I/O 事件（可读、可写、连接、接受）</li>
            </ul>

            <CodeBlock
              language="java"
              code={`import java.net.*;
import java.nio.*;
import java.nio.channels.*;
import java.util.*;

public class NioServer {
    public static void main(String[] args) throws Exception {
        // 1. 创建 Selector
        Selector selector = Selector.open();
        
        // 2. 创建 ServerSocketChannel，设置为非阻塞
        ServerSocketChannel serverChannel = ServerSocketChannel.open();
        serverChannel.configureBlocking(false);
        serverChannel.bind(new InetSocketAddress(8080));
        
        // 3. 注册接受连接事件
        serverChannel.register(selector, SelectionKey.OP_ACCEPT);
        
        System.out.println("NIO 服务器启动...");
        
        // 4. 循环处理 I/O 事件
        while (true) {
            // 【输入】阻塞等待就绪的事件
            selector.select();
            
            Set<SelectionKey> selectedKeys = selector.selectedKeys();
            Iterator<SelectionKey> iterator = selectedKeys.iterator();
            
            while (iterator.hasNext()) {
                SelectionKey key = iterator.next();
                iterator.remove();
                
                if (key.isAcceptable()) {
                    // 接受新连接
                    handleAccept(serverChannel, selector);
                } else if (key.isReadable()) {
                    // 读取数据
                    handleRead(key);
                }
            }
        }
    }
    
    private static void handleAccept(ServerSocketChannel serverChannel, 
                                     Selector selector) throws Exception {
        SocketChannel clientChannel = serverChannel.accept();
        clientChannel.configureBlocking(false);
        // 【输出】注册读事件
        clientChannel.register(selector, SelectionKey.OP_READ);
        System.out.println("新客户端连接: " + clientChannel.getRemoteAddress());
    }
    
    private static void handleRead(SelectionKey key) throws Exception {
        SocketChannel clientChannel = (SocketChannel) key.channel();
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        
        // 【输入】读取数据到 Buffer
        int bytesRead = clientChannel.read(buffer);
        
        if (bytesRead > 0) {
            buffer.flip();
            byte[] data = new byte[buffer.remaining()];
            buffer.get(data);
            String message = new String(data, "UTF-8");
            System.out.println("收到消息: " + message);
            
            // 【输出】回声响应
            ByteBuffer responseBuffer = ByteBuffer.wrap(
                ("Echo: " + message).getBytes("UTF-8")
            );
            clientChannel.write(responseBuffer);
        } else if (bytesRead < 0) {
            // 客户端断开连接
            clientChannel.close();
            key.cancel();
        }
    }
}`}
            />

            <SideNote label="零拷贝技术">
              NIO 支持 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">FileChannel.transferTo()</code> 等方法实现零拷贝，减少数据在内核态和用户态之间的复制次数，提升性能。
            </SideNote>
          </section>

          {/* ===== Reactor 模式 ===== */}
          <section id="reactor-pattern">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              Reactor 模式详解
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Reactor 模式是一种事件驱动的设计模式，广泛应用于高性能网络框架（如 Netty、Redis）。它将 I/O 多路复用与事件处理分离，通过分发器（Dispatcher）将事件分发给对应的处理器（Handler）。
            </p>

            <DiagramBlock title="Reactor 模式架构">
              {`graph TB
    subgraph Reactor["Reactor 线程"]
        S[Selector 多路复用器]
        D[Dispatcher 分发器]
    end
    
    subgraph Handlers["Handler 处理器"]
        H1[Acceptor Handler<br/>处理新连接]
        H2[Read Handler<br/>处理读事件]
        H3[Write Handler<br/>处理写事件]
    end
    
    subgraph Business["业务线程池"]
        W1[Worker Thread 1]
        W2[Worker Thread 2]
        W3[Worker Thread 3]
    end
    
    C1[Client1] --> S
    C2[Client2] --> S
    C3[Client3] --> S
    
    S --> D
    D --> H1
    D --> H2
    D --> H3
    
    H2 -.->|耗时操作| W1
    H2 -.->|耗时操作| W2
    H2 -.->|耗时操作| W3
    
    style Reactor fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style Handlers fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style Business fill:#dcfce7,stroke:#22c55e,stroke-width:2px`}
            </DiagramBlock>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong>Reactor 模式的三种变体：</strong>
            </p>

            <table className="w-full border-collapse text-[13px] sm:text-[14px] my-6">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-stone-300 px-3 py-2 text-left font-semibold text-ink">模式</th>
                  <th className="border border-stone-300 px-3 py-2 text-left font-semibold text-ink">线程模型</th>
                  <th className="border border-stone-300 px-3 py-2 text-left font-semibold text-ink">适用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted"><strong>单 Reactor 单线程</strong></td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">所有操作在同一线程</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">简单场景，CPU 密集型少</td>
                </tr>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted"><strong>单 Reactor 多线程</strong></td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">Reactor 处理 I/O，业务逻辑交给线程池</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">大多数应用场景（Redis 采用）</td>
                </tr>
                <tr>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted"><strong>主从 Reactor 多线程</strong></td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">Main Reactor 处理连接，Sub Reactor 处理 I/O</td>
                  <td className="border border-stone-300 px-3 py-2 text-ink-muted">高并发场景（Netty 默认采用）</td>
                </tr>
              </tbody>
            </table>

            <Callout type="info" title="为什么 Reactor 性能高？">
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>避免了线程频繁创建和销毁的开销</li>
                <li>减少了上下文切换的次数</li>
                <li>I/O 多路复用允许单线程管理成千上万个连接</li>
                <li>事件驱动模型提高了 CPU 利用率</li>
              </ol>
            </Callout>
          </section>

          {/* ===== Netty 框架简介 ===== */}
          <section id="netty-framework">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              Netty 框架简介
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Netty 是一个基于 NIO 的高性能异步事件驱动网络应用框架，广泛用于分布式系统、RPC 框架（Dubbo、gRPC）、大数据（Hadoop、Spark）等领域。
            </p>

            <DiagramBlock title="Netty 核心架构">
              {`graph TB
    subgraph Bootstrap["引导类"]
        B[Bootstrap / ServerBootstrap]
    end
    
    subgraph EventLoop["EventLoopGroup"]
        EL1[EventLoop 1]
        EL2[EventLoop 2]
        EL3[EventLoop 3]
    end
    
    subgraph Channel["Channel"]
        C1[Channel 1]
        C2[Channel 2]
        C3[Channel 3]
    end
    
    subgraph Pipeline["ChannelPipeline"]
        P1[Inbound Handler 1]
        P2[Inbound Handler 2]
        P3[Outbound Handler 1]
    end
    
    B --> EL1
    B --> EL2
    B --> EL3
    
    EL1 --> C1
    EL2 --> C2
    EL3 --> C3
    
    C1 --> P1
    P1 --> P2
    P2 --> P3
    
    style Bootstrap fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style EventLoop fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style Channel fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    style Pipeline fill:#f3e8ff,stroke:#a855f7,stroke-width:2px`}
            </DiagramBlock>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong>Netty 核心组件：</strong>
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
              <li><strong className="text-ink">EventLoopGroup：</strong>事件循环组，包含多个 EventLoop，每个 EventLoop 负责处理多个 Channel 的 I/O 事件</li>
              <li><strong className="text-ink">Channel：</strong>网络连接的抽象，封装了 Socket 的操作</li>
              <li><strong className="text-ink">ChannelPipeline：</strong>责任链模式，管理一系列 ChannelHandler，处理入站和出站事件</li>
              <li><strong className="text-ink">ChannelHandler：</strong>业务逻辑处理器，分为 InboundHandler（读）和 OutboundHandler（写）</li>
              <li><strong className="text-ink">ByteBuf：</strong>Netty 自定义的缓冲区，比 JDK 的 ByteBuffer 更强大，支持引用计数和池化</li>
            </ul>

            <CodeBlock
              language="java"
              code={`import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;

public class NettyServer {
    public static void main(String[] args) throws Exception {
        // 1. 创建两个 EventLoopGroup
        // bossGroup 处理连接请求
        EventLoopGroup bossGroup = new NioEventLoopGroup(1);
        // workerGroup 处理 I/O 读写
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        
        try {
            ServerBootstrap bootstrap = new ServerBootstrap();
            bootstrap.group(bossGroup, workerGroup)
                .channel(NioServerSocketChannel.class)
                .childHandler(new ChannelInitializer<Channel>() {
                    @Override
                    protected void initChannel(Channel ch) {
                        ChannelPipeline pipeline = ch.pipeline();
                        // 【输入】添加解码器
                        pipeline.addLast(new StringDecoder());
                        // 【输出】添加编码器
                        pipeline.addLast(new StringEncoder());
                        // 添加自定义业务处理器
                        pipeline.addLast(new SimpleChannelInboundHandler<String>() {
                            @Override
                            protected void channelRead0(ChannelHandlerContext ctx, String msg) {
                                System.out.println("收到消息: " + msg);
                                // 【输出】回声响应
                                ctx.writeAndFlush("Echo: " + msg);
                            }
                            
                            @Override
                            public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
                                cause.printStackTrace();
                                ctx.close();
                            }
                        });
                    }
                });
            
            // 2. 绑定端口并启动
            ChannelFuture future = bootstrap.bind(8080).sync();
            System.out.println("Netty 服务器启动...");
            
            // 3. 等待服务器关闭
            future.channel().closeFuture().sync();
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}`}
            />

            <Callout type="tip" title="Netty 的优势">
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>高性能：基于 NIO 和零拷贝技术</li>
                <li>易用性：封装了复杂的 NIO 细节</li>
                <li>可扩展性：丰富的编解码器和协议支持</li>
                <li>社区活跃：被众多知名项目采用</li>
              </ul>
            </Callout>
          </section>

          {/* ===== 常见问题与误区 ===== */}
          <section id="common-issues">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              常见问题与误区
            </h2>

            <Callout type="warning" title="误区 1：TCP 没有粘包问题">
              TCP 是面向字节流的协议，发送方多次发送的小数据可能被合并成一个数据包（粘包），或者一个大数据包被拆分成多个小包（拆包）。必须在应用层处理消息边界，常用方法包括：固定长度、分隔符、长度字段。
            </Callout>

            <Callout type="warning" title="误区 2：UDP 不需要处理并发">
              虽然 UDP 是面向数据报的，单个线程可以处理多个客户端，但在高并发场景下仍然需要考虑性能优化，如使用对象池复用 DatagramPacket、批量发送等。
            </Callout>

            <Callout type="warning" title="误区 3：NIO 一定比 BIO 快">
              NIO 的优势在于高并发场景（成千上万个连接）。如果连接数较少且每个连接的处理时间长，BIO + 线程池可能更简单高效。应根据实际场景选择合适的模型。
            </Callout>

            <Callout type="tip" title="如何调试 Socket 连接问题？">
              <CodeBlock
                language="bash"
                code={`# 查看监听的端口
netstat -tuln | grep 8080

# 查看 TCP 连接状态
ss -tan | grep 8080

# 测试端口连通性
telnet localhost 8080

# 抓包分析（需要 root 权限）
tcpdump -i any port 8080 -X`}
              />
            </Callout>
          </section>

          {/* ===== 面试真题 ===== */}
          <section id="interview-questions">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              面试真题
            </h2>

            <InterviewSection
              questions={[
                {
                  question: 'TCP 粘包和拆包是什么？如何解决？',
                  answer: '粘包是指 TCP 将多个小数据包合并成一个大数据包发送；拆包是指将一个大数据包分成多个小包发送。这是因为 TCP 是面向字节流的，没有消息边界。解决方法：1) 固定长度：每个消息固定大小，不足补空；2) 分隔符：使用特殊字符（如 \n）分隔消息；3) 长度字段：在消息头部添加长度信息（最常用，如前 4 字节表示消息长度）。',
                },
                {
                  question: 'BIO、NIO、AIO 的区别是什么？',
                  answer: 'BIO（Blocking I/O）：同步阻塞，每个连接需要一个独立线程，适合连接数少的场景。NIO（Non-blocking I/O）：同步非阻塞，通过 Selector 实现 I/O 多路复用，单线程可管理多个连接，适合高并发场景。AIO（Asynchronous I/O）：异步非阻塞，I/O 操作完成后由操作系统通知应用程序，Java 7 引入，但实际应用较少，Netty 主要使用 NIO。',
                },
                {
                  question: '什么是 Reactor 模式？Netty 如何使用 Reactor？',
                  answer: 'Reactor 模式是一种事件驱动的设计模式，通过 Selector 监控多个 Channel 的 I/O 事件，并将事件分发给对应的 Handler 处理。Netty 默认采用主从 Reactor 多线程模型：BossGroup（Main Reactor）负责处理连接请求，WorkerGroup（Sub Reactor）负责处理 I/O 读写事件，业务逻辑可以交给额外的线程池处理。',
                },
                {
                  question: 'TCP 和 UDP 的应用场景分别有哪些？',
                  answer: 'TCP 适用于对可靠性要求高的场景：HTTP/HTTPS、FTP、SMTP、SSH、数据库连接、即时通讯等。UDP 适用于对实时性要求高、能容忍少量丢包的场景：DNS 查询、DHCP、视频直播、VoIP、在线游戏、QUIC 协议等。',
                },
                {
                  question: 'Netty 为什么性能高？',
                  answer: 'Netty 性能高的原因：1) 基于 NIO 和 I/O 多路复用，单线程可处理大量连接；2) 零拷贝技术：使用 Direct Buffer、FileRegion.transferTo 等减少数据复制；3) 内存池：ByteBuf 支持池化分配，减少 GC 压力；4) 高效的序列化：支持 Protobuf、MessagePack 等高效协议；5) 无锁设计：大量使用 CAS 和局部变量，减少锁竞争。',
                },
                {
                  question: '如何处理 Socket 连接的资源泄漏问题？',
                  answer: '资源泄漏的主要原因是没有正确关闭 Socket 和流。解决方案：1) 使用 try-with-resources 自动关闭资源；2) 在 finally 块中显式关闭；3) 设置 SO_TIMEOUT 避免无限阻塞；4) 使用连接池管理连接生命周期；5) 监控文件描述符数量，及时发现泄漏。',
                },
                {
                  question: '什么是心跳机制？如何实现？',
                  answer: '心跳机制用于检测连接是否存活。实现方法：1) 客户端定期发送心跳包（如每 30 秒发送一次 ping）；2) 服务端收到心跳后回复 pong；3) 如果服务端在一定时间内（如 90 秒）未收到心跳，则认为连接已断开，主动关闭连接。Netty 提供了 IdleStateHandler 简化心跳实现。',
                },
              ]}
            />
          </section>

          {/* ===== 实验场 ===== */}
          <section>
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              实验场
            </h2>
            <Playground
              description="模拟 TCP 客户端和服务端的通信过程"
              code={`// TCP 通信模拟
class TcpSimulation {
  constructor() {
    this.serverConnected = false;
    this.messages = [];
  }

  // 服务端启动
  startServer(port) {
    console.log(\`服务器启动，监听端口 \${port}...\`);
    this.serverConnected = true;
  }

  // 客户端连接
  connectClient(host, port) {
    if (this.serverConnected) {
      console.log(\`客户端连接到 \${host}:\${port}\`);
      console.log('三次握手完成，连接建立');
      return true;
    } else {
      console.log('连接失败：服务器未启动');
      return false;
    }
  }

  // 发送消息
  sendMessage(message) {
    console.log(\`【输出】客户端发送: \${message}\`);
    this.messages.push(message);
    
    // 模拟服务端回声响应
    const response = \`Echo: \${message}\`;
    console.log(\`【输入】服务端响应: \${response}\`);
    return response;
  }

  // 关闭连接
  close() {
    console.log('四次挥手，连接关闭');
    this.serverConnected = false;
    this.messages = [];
  }
}

const sim = new TcpSimulation();
sim.startServer(8080);
sim.connectClient('localhost', 8080);
sim.sendMessage('Hello');
sim.sendMessage('World');
sim.close();`}
              language="javascript"
            />
            <Callout type="info" title="运行结果">
              <CodeBlock
                language="text"
                code={`服务器启动，监听端口 8080...
客户端连接到 localhost:8080
三次握手完成，连接建立
【输出】客户端发送: Hello
【输入】服务端响应: Echo: Hello
【输出】客户端发送: World
【输入】服务端响应: Echo: World
四次挥手，连接关闭`}
              />
            </Callout>
          </section>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，禁止用 <aside> 包裹！组件自行管理桌面/移动端显隐 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
