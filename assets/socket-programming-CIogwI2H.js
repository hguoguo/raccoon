import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as l}from"./KnowledgeLayout-CwkOMHwC.js";import{C as t,A as a,S as d}from"./ArticleNav-DhfiS38Y.js";import{C as s,P as c}from"./Playground-C6lk-t6G.js";import{D as r}from"./DiagramBlock-CLaKE9_7.js";import{I as x}from"./InterviewSection-BBNdwyyN.js";import{S as o}from"./SideNote-BKvanovA.js";import{C as p}from"./ContextSwitcher-Cjd-h5IL.js";const m=[{id:"overview",text:"Socket 编程概述",level:2},{id:"socket-concept",text:"什么是 Socket？",level:2},{id:"tcp-socket",text:"TCP Socket 编程",level:2},{id:"tcp-server",text:"服务端实现",level:3},{id:"tcp-client",text:"客户端实现",level:3},{id:"udp-socket",text:"UDP Socket 编程",level:2},{id:"udp-server",text:"服务端实现",level:3},{id:"udp-client",text:"客户端实现",level:3},{id:"tcp-vs-udp",text:"TCP vs UDP 编程对比",level:2},{id:"nio-intro",text:"NIO 与多路复用",level:2},{id:"reactor-pattern",text:"Reactor 模式详解",level:2},{id:"netty-framework",text:"Netty 框架简介",level:2},{id:"common-issues",text:"常见问题与误区",level:2},{id:"interview-questions",text:"面试真题",level:2}];function S({meta:n}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20",children:e.jsxs(l,{meta:n,children:[e.jsxs("section",{id:"overview",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"Socket 编程概述"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Socket（套接字）是网络编程的基础抽象，它提供了应用程序与网络协议栈之间的接口。通过 Socket，程序员可以使用统一的 API 进行网络通信，而无需关心底层协议的复杂细节。"}),e.jsx(t,{type:"info",title:"为什么需要 Socket？",children:"在网络通信中，应用层程序需要与传输层（TCP/UDP）交互。Socket 作为操作系统提供的系统调用接口，屏蔽了协议实现的复杂性，让开发者可以专注于业务逻辑。"})]}),e.jsxs("section",{id:"socket-concept",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"什么是 Socket？"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Socket 是 IP 地址和端口号的组合，唯一标识网络中的一个通信端点。一个完整的 Socket 由五元组组成："}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] my-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"元素"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"说明"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"示例"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"协议"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"TCP 或 UDP"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"TCP"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"源 IP"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"发送方 IP 地址"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"192.168.1.100"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"源端口"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"发送方端口号"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"54321"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"目标 IP"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"接收方 IP 地址"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"10.0.0.1"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"目标端口"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"接收方端口号"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"8080"})]})]})]}),e.jsx(r,{title:"Socket 通信模型",children:`graph LR
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
    style D fill:#dcfce7,stroke:#22c55e,stroke-width:2px`}),e.jsx(o,{label:"端口范围",children:"端口号范围是 0-65535。其中 0-1023 是知名端口（Well-known Ports），如 HTTP(80)、HTTPS(443)；1024-49151 是注册端口；49152-65535 是动态/私有端口。"})]}),e.jsxs("section",{id:"tcp-socket",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"TCP Socket 编程"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["TCP Socket 提供面向连接的可靠通信。Java 中使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"ServerSocket"})," 和 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Socket"})," 类实现。"]})]}),e.jsxs("section",{id:"tcp-server",children:[e.jsx("h3",{id:"tcp-server",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"服务端实现"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"TCP 服务端需要经历以下步骤：创建 ServerSocket → 绑定端口 → 监听连接 → 接受客户端 → 处理请求 → 关闭连接。"}),e.jsx(s,{language:"java",code:`import java.io.*;
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
}`}),e.jsx(t,{type:"warning",title:"注意资源泄漏",children:"必须正确关闭 Socket 和流资源。建议使用 try-with-resources 语句自动管理资源，避免文件描述符泄漏。"})]}),e.jsxs("section",{id:"tcp-client",children:[e.jsx("h3",{id:"tcp-client",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"客户端实现"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"TCP 客户端的实现相对简单：创建 Socket → 连接服务端 → 发送/接收数据 → 关闭连接。"}),e.jsx(s,{language:"java",code:`import java.io.*;
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
}`}),e.jsxs(o,{label:"连接超时",children:["可以使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"socket.connect(new InetSocketAddress(host, port), timeout)"})," 设置连接超时时间，避免无限等待。"]})]}),e.jsxs("section",{id:"udp-socket",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"UDP Socket 编程"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["UDP Socket 提供无连接的不可靠通信。Java 中使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"DatagramSocket"})," 和 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"DatagramPacket"})," 类实现。"]})]}),e.jsxs("section",{id:"udp-server",children:[e.jsx("h3",{id:"udp-server",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"服务端实现"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"UDP 服务端不需要建立连接，直接接收数据报并响应。"}),e.jsx(s,{language:"java",code:`import java.net.*;

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
}`})]}),e.jsxs("section",{id:"udp-client",children:[e.jsx("h3",{id:"udp-client",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"客户端实现"}),e.jsx(s,{language:"java",code:`import java.net.*;

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
}`}),e.jsx(t,{type:"tip",title:"UDP 的特点",children:"UDP 不保证数据到达、不保证顺序、不重传丢失的数据包。适用于实时性要求高、能容忍少量丢包的场景，如视频直播、在线游戏、DNS 查询等。"})]}),e.jsxs("section",{id:"tcp-vs-udp",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"TCP vs UDP 编程对比"}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] my-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"TCP"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"UDP"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"API 类"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"ServerSocket, Socket"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"DatagramSocket, DatagramPacket"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"连接方式"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"面向连接（三次握手）"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"无连接"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"数据传输"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"字节流（Stream）"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"数据报（Packet）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"可靠性"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"保证可靠、有序"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"不保证，可能丢包/乱序"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"粘包问题"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"存在，需自行处理边界"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"不存在，以数据包为单位"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"并发模型"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"多线程/线程池/NIO"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"单线程即可处理多个客户端"})]})]})]}),e.jsx(p,{simpleContent:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"文件传输 📁："}),"选择 TCP，必须保证数据完整性和顺序"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"即时通讯 💬："}),"选择 TCP，确保消息不丢失"]})]}),hardcoreContent:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"视频直播 📹："}),"选择 UDP，容忍少量丢包以换取低延迟"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"DNS 查询 🔍："}),"选择 UDP，快速响应，失败可重试"]})]})})]}),e.jsxs("section",{id:"nio-intro",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"NIO 与多路复用"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["传统的 BIO（Blocking I/O）模型中，每个连接需要一个独立的线程处理，导致线程资源浪费。NIO（Non-blocking I/O）引入了",e.jsx("strong",{children:"多路复用器（Selector）"}),"，允许单个线程管理多个 Channel。"]}),e.jsx(r,{title:"BIO vs NIO 模型对比",children:`graph TB
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
    style NIO fill:#dcfce7,stroke:#22c55e,stroke-width:2px`}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:e.jsx("strong",{children:"NIO 核心组件："})}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Channel（通道）："}),"双向数据传输通道，类似 Stream 但支持非阻塞模式"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Buffer（缓冲区）："}),"数据的容器，所有数据读写都通过 Buffer"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Selector（选择器）："}),"多路复用器，监控多个 Channel 的 I/O 事件（可读、可写、连接、接受）"]})]}),e.jsx(s,{language:"java",code:`import java.net.*;
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
}`}),e.jsxs(o,{label:"零拷贝技术",children:["NIO 支持 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"FileChannel.transferTo()"})," 等方法实现零拷贝，减少数据在内核态和用户态之间的复制次数，提升性能。"]})]}),e.jsxs("section",{id:"reactor-pattern",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"Reactor 模式详解"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Reactor 模式是一种事件驱动的设计模式，广泛应用于高性能网络框架（如 Netty、Redis）。它将 I/O 多路复用与事件处理分离，通过分发器（Dispatcher）将事件分发给对应的处理器（Handler）。"}),e.jsx(r,{title:"Reactor 模式架构",children:`graph TB
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
    style Business fill:#dcfce7,stroke:#22c55e,stroke-width:2px`}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:e.jsx("strong",{children:"Reactor 模式的三种变体："})}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] my-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"模式"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"线程模型"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"适用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"单 Reactor 单线程"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"所有操作在同一线程"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"简单场景，CPU 密集型少"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"单 Reactor 多线程"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"Reactor 处理 I/O，业务逻辑交给线程池"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"大多数应用场景（Redis 采用）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"主从 Reactor 多线程"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"Main Reactor 处理连接，Sub Reactor 处理 I/O"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"高并发场景（Netty 默认采用）"})]})]})]}),e.jsx(t,{type:"info",title:"为什么 Reactor 性能高？",children:e.jsxs("ol",{className:"list-decimal list-inside space-y-1 mt-2",children:[e.jsx("li",{children:"避免了线程频繁创建和销毁的开销"}),e.jsx("li",{children:"减少了上下文切换的次数"}),e.jsx("li",{children:"I/O 多路复用允许单线程管理成千上万个连接"}),e.jsx("li",{children:"事件驱动模型提高了 CPU 利用率"})]})})]}),e.jsxs("section",{id:"netty-framework",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"Netty 框架简介"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Netty 是一个基于 NIO 的高性能异步事件驱动网络应用框架，广泛用于分布式系统、RPC 框架（Dubbo、gRPC）、大数据（Hadoop、Spark）等领域。"}),e.jsx(r,{title:"Netty 核心架构",children:`graph TB
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
    style Pipeline fill:#f3e8ff,stroke:#a855f7,stroke-width:2px`}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:e.jsx("strong",{children:"Netty 核心组件："})}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"EventLoopGroup："}),"事件循环组，包含多个 EventLoop，每个 EventLoop 负责处理多个 Channel 的 I/O 事件"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Channel："}),"网络连接的抽象，封装了 Socket 的操作"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"ChannelPipeline："}),"责任链模式，管理一系列 ChannelHandler，处理入站和出站事件"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"ChannelHandler："}),"业务逻辑处理器，分为 InboundHandler（读）和 OutboundHandler（写）"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"ByteBuf："}),"Netty 自定义的缓冲区，比 JDK 的 ByteBuffer 更强大，支持引用计数和池化"]})]}),e.jsx(s,{language:"java",code:`import io.netty.bootstrap.ServerBootstrap;
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
}`}),e.jsx(t,{type:"tip",title:"Netty 的优势",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsx("li",{children:"高性能：基于 NIO 和零拷贝技术"}),e.jsx("li",{children:"易用性：封装了复杂的 NIO 细节"}),e.jsx("li",{children:"可扩展性：丰富的编解码器和协议支持"}),e.jsx("li",{children:"社区活跃：被众多知名项目采用"})]})})]}),e.jsxs("section",{id:"common-issues",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"常见问题与误区"}),e.jsx(t,{type:"warning",title:"误区 1：TCP 没有粘包问题",children:"TCP 是面向字节流的协议，发送方多次发送的小数据可能被合并成一个数据包（粘包），或者一个大数据包被拆分成多个小包（拆包）。必须在应用层处理消息边界，常用方法包括：固定长度、分隔符、长度字段。"}),e.jsx(t,{type:"warning",title:"误区 2：UDP 不需要处理并发",children:"虽然 UDP 是面向数据报的，单个线程可以处理多个客户端，但在高并发场景下仍然需要考虑性能优化，如使用对象池复用 DatagramPacket、批量发送等。"}),e.jsx(t,{type:"warning",title:"误区 3：NIO 一定比 BIO 快",children:"NIO 的优势在于高并发场景（成千上万个连接）。如果连接数较少且每个连接的处理时间长，BIO + 线程池可能更简单高效。应根据实际场景选择合适的模型。"}),e.jsx(t,{type:"tip",title:"如何调试 Socket 连接问题？",children:e.jsx(s,{language:"bash",code:`# 查看监听的端口
netstat -tuln | grep 8080

# 查看 TCP 连接状态
ss -tan | grep 8080

# 测试端口连通性
telnet localhost 8080

# 抓包分析（需要 root 权限）
tcpdump -i any port 8080 -X`})})]}),e.jsxs("section",{id:"interview-questions",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"面试真题"}),e.jsx(x,{questions:[{question:"TCP 粘包和拆包是什么？如何解决？",answer:`粘包是指 TCP 将多个小数据包合并成一个大数据包发送；拆包是指将一个大数据包分成多个小包发送。这是因为 TCP 是面向字节流的，没有消息边界。解决方法：1) 固定长度：每个消息固定大小，不足补空；2) 分隔符：使用特殊字符（如 
）分隔消息；3) 长度字段：在消息头部添加长度信息（最常用，如前 4 字节表示消息长度）。`},{question:"BIO、NIO、AIO 的区别是什么？",answer:"BIO（Blocking I/O）：同步阻塞，每个连接需要一个独立线程，适合连接数少的场景。NIO（Non-blocking I/O）：同步非阻塞，通过 Selector 实现 I/O 多路复用，单线程可管理多个连接，适合高并发场景。AIO（Asynchronous I/O）：异步非阻塞，I/O 操作完成后由操作系统通知应用程序，Java 7 引入，但实际应用较少，Netty 主要使用 NIO。"},{question:"什么是 Reactor 模式？Netty 如何使用 Reactor？",answer:"Reactor 模式是一种事件驱动的设计模式，通过 Selector 监控多个 Channel 的 I/O 事件，并将事件分发给对应的 Handler 处理。Netty 默认采用主从 Reactor 多线程模型：BossGroup（Main Reactor）负责处理连接请求，WorkerGroup（Sub Reactor）负责处理 I/O 读写事件，业务逻辑可以交给额外的线程池处理。"},{question:"TCP 和 UDP 的应用场景分别有哪些？",answer:"TCP 适用于对可靠性要求高的场景：HTTP/HTTPS、FTP、SMTP、SSH、数据库连接、即时通讯等。UDP 适用于对实时性要求高、能容忍少量丢包的场景：DNS 查询、DHCP、视频直播、VoIP、在线游戏、QUIC 协议等。"},{question:"Netty 为什么性能高？",answer:"Netty 性能高的原因：1) 基于 NIO 和 I/O 多路复用，单线程可处理大量连接；2) 零拷贝技术：使用 Direct Buffer、FileRegion.transferTo 等减少数据复制；3) 内存池：ByteBuf 支持池化分配，减少 GC 压力；4) 高效的序列化：支持 Protobuf、MessagePack 等高效协议；5) 无锁设计：大量使用 CAS 和局部变量，减少锁竞争。"},{question:"如何处理 Socket 连接的资源泄漏问题？",answer:"资源泄漏的主要原因是没有正确关闭 Socket 和流。解决方案：1) 使用 try-with-resources 自动关闭资源；2) 在 finally 块中显式关闭；3) 设置 SO_TIMEOUT 避免无限阻塞；4) 使用连接池管理连接生命周期；5) 监控文件描述符数量，及时发现泄漏。"},{question:"什么是心跳机制？如何实现？",answer:"心跳机制用于检测连接是否存活。实现方法：1) 客户端定期发送心跳包（如每 30 秒发送一次 ping）；2) 服务端收到心跳后回复 pong；3) 如果服务端在一定时间内（如 90 秒）未收到心跳，则认为连接已断开，主动关闭连接。Netty 提供了 IdleStateHandler 简化心跳实现。"}]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"实验场"}),e.jsx(c,{description:"模拟 TCP 客户端和服务端的通信过程",code:`// TCP 通信模拟
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
sim.close();`,language:"javascript"}),e.jsx(t,{type:"info",title:"运行结果",children:e.jsx(s,{language:"text",code:`服务器启动，监听端口 8080...
客户端连接到 localhost:8080
三次握手完成，连接建立
【输出】客户端发送: Hello
【输入】服务端响应: Echo: Hello
【输出】客户端发送: World
【输入】服务端响应: Echo: World
四次挥手，连接关闭`})})]}),e.jsx(a,{...i(n.category,n.id)})]})}),e.jsx(d,{items:m})]})}export{S as default};
