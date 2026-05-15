import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as l}from"./KnowledgeLayout-CwkOMHwC.js";import{C as t,A as x,S as o}from"./ArticleNav-DhfiS38Y.js";import{C as d,P as c}from"./Playground-C6lk-t6G.js";import{D as s}from"./DiagramBlock-CLaKE9_7.js";import{I as a}from"./InterviewSection-BBNdwyyN.js";import{S as n}from"./SideNote-BKvanovA.js";import{C as m}from"./ContextSwitcher-Cjd-h5IL.js";const p=[{id:"overview",text:"TCP/IP 协议栈概述",level:2},{id:"osi-vs-tcpip",text:"OSI 七层模型 vs TCP/IP 四层模型",level:2},{id:"tcp-features",text:"TCP 核心特性",level:2},{id:"three-way-handshake",text:"三次握手建立连接",level:3},{id:"four-way-termination",text:"四次挥手断开连接",level:3},{id:"reliability-mechanism",text:"可靠性保障机制",level:2},{id:"flow-control",text:"流量控制与滑动窗口",level:3},{id:"congestion-control",text:"拥塞控制算法",level:3},{id:"udp-comparison",text:"TCP vs UDP 对比",level:2},{id:"common-issues",text:"常见问题与误区",level:2},{id:"interview-questions",text:"面试真题",level:2}];function g({meta:r}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20",children:e.jsxs(l,{meta:r,children:[e.jsxs("section",{id:"overview",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"TCP/IP 协议栈概述"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"TCP/IP（Transmission Control Protocol/Internet Protocol）是互联网的核心协议族，定义了计算机如何在网络中通信。它采用分层架构，将复杂的网络通信问题分解为多个层次，每层负责特定的功能。"}),e.jsx(t,{type:"info",title:"为什么叫 TCP/IP？",children:"虽然通常称为 TCP/IP 协议族，但实际上包含上百个协议。TCP 和 IP 是最核心的两个协议，因此以它们命名。IP 负责寻址和路由，TCP 负责可靠传输。"})]}),e.jsxs("section",{id:"osi-vs-tcpip",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"OSI 七层模型 vs TCP/IP 四层模型"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"理解 TCP/IP 需要先了解网络分层模型。OSI 模型是理论标准，而 TCP/IP 是实际应用的工业标准。"}),e.jsx(s,{title:"网络分层模型对比",children:`graph LR
    subgraph OSI["OSI 七层模型"]
        A7[应用层 Application]
        A6[表示层 Presentation]
        A5[会话层 Session]
        A4[传输层 Transport]
        A3[网络层 Network]
        A2[数据链路层 Data Link]
        A1[物理层 Physical]
    end
    
    subgraph TCPIP["TCP/IP 四层模型"]
        B4[应用层 Application<br/>HTTP/FTP/DNS]
        B3[传输层 Transport<br/>TCP/UDP]
        B2[网际层 Internet<br/>IP/ICMP]
        B1[网络接口层 Network Interface<br/>Ethernet/WiFi]
    end
    
    A7 --> B4
    A6 --> B4
    A5 --> B4
    A4 --> B3
    A3 --> B2
    A2 --> B1
    A1 --> B1`}),e.jsx(n,{label:"关键区别",children:"OSI 的表示层和会话层在 TCP/IP 中被合并到应用层，由应用程序自行处理。"}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] my-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"层次"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"OSI 模型"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"TCP/IP 模型"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"典型协议"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"应用层"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"应用层、表示层、会话层"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"应用层"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"HTTP, FTP, DNS, SMTP"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"传输层"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"传输层"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"传输层"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"TCP, UDP"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"网络层"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"网络层"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"网际层"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"IP, ICMP, ARP"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"底层"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"数据链路层、物理层"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"网络接口层"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"Ethernet, WiFi"})]})]})]})]}),e.jsxs("section",{id:"tcp-features",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"TCP 核心特性"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"TCP 是面向连接的、可靠的、基于字节流的传输层协议。其核心特性包括："}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"面向连接："}),"通信前必须通过三次握手建立连接，通信后通过四次挥手断开连接"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"可靠传输："}),"通过序列号、确认应答、超时重传等机制保证数据不丢失、不重复、按序到达"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"全双工通信："}),"连接双方可以同时发送和接收数据"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"流量控制："}),"通过滑动窗口机制防止发送方发送过快导致接收方缓冲区溢出"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"拥塞控制："}),"通过慢启动、拥塞避免、快重传、快恢复等算法避免网络过载"]})]}),e.jsx(t,{type:"warning",title:"TCP 不是万能的",children:"TCP 只能保证传输层的可靠性，无法保证应用层数据的正确性。例如，TCP 可以确保字节流完整到达，但无法确保 JSON 格式正确或业务逻辑无误。"})]}),e.jsxs("section",{id:"three-way-handshake",children:[e.jsx("h3",{id:"three-way-handshake",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"三次握手建立连接"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"三次握手（Three-Way Handshake）是 TCP 建立连接的过程，目的是同步双方的初始序列号（ISN），并确认双方的收发能力正常。"}),e.jsx(s,{title:"TCP 三次握手流程",children:`sequenceDiagram
    participant Client as 客户端
    participant Server as 服务端
    
    Note over Client,Server: 第一次握手
    Client->>Server: 【输出】SYN=1, seq=x<br/>【输入】无<br/>（客户端进入 SYN_SENT 状态）
    
    Note over Client,Server: 第二次握手
    Server->>Client: 【输出】SYN=1, ACK=1,<br/>seq=y, ack=x+1<br/>【输入】SYN包<br/>（服务端进入 SYN_RCVD 状态）
    
    Note over Client,Server: 第三次握手
    Client->>Server: 【输出】ACK=1, seq=x+1,<br/>ack=y+1<br/>【输入】SYN+ACK包<br/>（双方进入 ESTABLISHED 状态）`}),e.jsx(n,{label:"为什么需要三次？",children:"两次握手无法防止已失效的连接请求报文段突然又传送到服务端，导致错误建立连接。"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:e.jsx("strong",{children:"握手过程详解："})}),e.jsxs("ol",{className:"list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"第一次握手："}),"客户端发送 SYN 包（SYN=1, seq=x），进入 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"SYN_SENT"})," 状态，等待服务端确认"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"第二次握手："}),"服务端收到 SYN 包后，回复 SYN+ACK 包（SYN=1, ACK=1, seq=y, ack=x+1），进入 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"SYN_RCVD"})," 状态"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"第三次握手："}),"客户端收到 SYN+ACK 包后，发送 ACK 包（ACK=1, seq=x+1, ack=y+1），双方进入 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"ESTABLISHED"})," 状态，开始数据传输"]})]}),e.jsx(t,{type:"tip",title:"SYN Flood 攻击",children:"攻击者发送大量 SYN 包但不完成第三次握手，导致服务端维护大量半连接队列，耗尽资源。防御方法包括 SYN Cookie、增加队列长度、缩短超时时间等。"})]}),e.jsxs("section",{id:"four-way-termination",children:[e.jsx("h3",{id:"four-way-termination",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"四次挥手断开连接"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"由于 TCP 是全双工的，每个方向都需要单独关闭，因此需要四次挥手来断开连接。"}),e.jsx(s,{title:"TCP 四次挥手流程",children:`sequenceDiagram
    participant Client as 客户端
    participant Server as 服务端
    
    Note over Client,Server: 第一次挥手
    Client->>Server: 【输出】FIN=1, seq=u<br/>【输入】无<br/>（客户端进入 FIN_WAIT_1 状态）
    
    Note over Client,Server: 第二次挥手
    Server->>Client: 【输出】ACK=1, seq=v,<br/>ack=u+1<br/>【输入】FIN包<br/>（服务端进入 CLOSE_WAIT 状态）
    
    Note over Client,Server: 第三次挥手
    Server->>Client: 【输出】FIN=1, ACK=1,<br/>seq=w, ack=u+1<br/>【输入】无<br/>（服务端进入 LAST_ACK 状态）
    
    Note over Client,Server: 第四次挥手
    Client->>Server: 【输出】ACK=1, seq=u+1,<br/>ack=w+1<br/>【输入】FIN包<br/>（客户端进入 TIME_WAIT 状态，等待 2MSL 后关闭）`}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:e.jsx("strong",{children:"挥手过程详解："})}),e.jsxs("ol",{className:"list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"第一次挥手："}),"客户端发送 FIN 包，进入 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"FIN_WAIT_1"})," 状态，表示客户端没有数据要发送了"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"第二次挥手："}),"服务端收到 FIN 后，发送 ACK 确认，进入 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"CLOSE_WAIT"})," 状态。此时客户端到服务端的连接已关闭，但服务端仍可向客户端发送数据"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"第三次挥手："}),"服务端数据发送完毕后，发送 FIN 包，进入 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"LAST_ACK"})," 状态"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"第四次挥手："}),"客户端收到 FIN 后，发送 ACK 确认，进入 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"TIME_WAIT"})," 状态，等待 2MSL（Maximum Segment Lifetime）后关闭连接"]})]}),e.jsx(t,{type:"warning",title:"为什么客户端要等待 2MSL？",children:e.jsxs("ol",{className:"list-decimal list-inside space-y-1 mt-2",children:[e.jsx("li",{children:"确保最后一个 ACK 能到达服务端。如果 ACK 丢失，服务端会重传 FIN，客户端需要在 2MSL 内能够重传 ACK"}),e.jsx("li",{children:"让本连接持续时间内产生的所有报文段都从网络中消失，避免影响新连接"})]})})]}),e.jsxs("section",{id:"reliability-mechanism",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"可靠性保障机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"TCP 通过多种机制保证数据的可靠传输："}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] my-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"机制"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"作用"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"实现方式"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"校验和"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"检测数据在传输过程中的变化"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"CRC 校验，出错则丢弃"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"序列号"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"解决乱序和重复问题"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"每个字节都有唯一序号，接收方按序重组"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"确认应答"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"确保数据到达"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"ACK + 期望收到的下一个序号"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"超时重传"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"处理丢包"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"定时器超时未收到 ACK 则重传"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"连接管理"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"确保通信双方就绪"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"三次握手、四次挥手"})]})]})]})]}),e.jsxs("section",{id:"flow-control",children:[e.jsx("h3",{id:"flow-control",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"流量控制与滑动窗口"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["流量控制的目的是让发送方的发送速率不要太快，使得接收方来得及接收。TCP 使用",e.jsx("strong",{children:"滑动窗口"}),"机制实现流量控制。"]}),e.jsx(s,{title:"滑动窗口工作原理",children:`graph TD
    A[发送方缓冲区] -->|【输出】数据段 + 窗口大小 rwnd| B[接收方缓冲区]
    B -->|【输出】ACK + 新窗口大小 rwnd| A
    
    style A fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style B fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    
    subgraph "窗口状态"
        C[已发送已确认]
        D[已发送未确认]
        E[未发送可发送]
        F[未发送不可发送]
    end
    
    C --> D
    D --> E
    E --> F`}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:e.jsx("strong",{children:"滑动窗口工作机制："})}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2",children:[e.jsx("li",{children:"接收方在 ACK 报文中通告自己的接收窗口大小（rwnd, receive window）"}),e.jsx("li",{children:"发送方根据 rwnd 调整发送窗口大小，确保不会超出接收方的处理能力"}),e.jsx("li",{children:"当接收方缓冲区满时，rwnd=0，发送方停止发送，直到收到新的窗口更新"}),e.jsx("li",{children:'窗口随着数据的发送和确认不断"滑动"，故称滑动窗口'})]}),e.jsx(n,{label:"零窗口探测",children:"当 rwnd=0 时，发送方启动坚持定时器，定期发送探测报文，询问接收方窗口是否恢复。"})]}),e.jsxs("section",{id:"congestion-control",children:[e.jsx("h3",{id:"congestion-control",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"拥塞控制算法"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"拥塞控制的目的是防止过多的数据注入网络，使网络中的路由器或链路过载。TCP 使用四种算法协同工作："}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] my-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"算法"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"触发条件"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"行为"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"慢启动"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"连接建立或超时重传"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"cwnd 从 1 开始，每收到一个 ACK，cwnd++（指数增长）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"拥塞避免"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"cwnd ≥ ssthresh"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"每经过一个 RTT，cwnd++（线性增长）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"快重传"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"收到 3 个重复 ACK"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"立即重传丢失的报文段，无需等待超时"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:e.jsx("strong",{children:"快恢复"})}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"触发快重传后"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"ssthresh = cwnd/2，cwnd = ssthresh，进入拥塞避免"})]})]})]}),e.jsx(t,{type:"info",title:'慢启动真的"慢"吗？',children:'慢启动的名字具有误导性。实际上它是指数增长，初期增长速度非常快。"慢"是相对于后来的线性增长而言的。'})]}),e.jsxs("section",{id:"udp-comparison",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"TCP vs UDP 对比"}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] my-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"TCP"}),e.jsx("th",{className:"border border-stone-300 px-3 py-2 text-left font-semibold text-ink",children:"UDP"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"连接性"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"面向连接"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"无连接"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"可靠性"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"可靠传输"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"不可靠，可能丢包"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"有序性"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"保证顺序"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"不保证顺序"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"速度"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"较慢（有开销）"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"快（无额外开销）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"首部大小"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"20-60 字节"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"8 字节"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted",children:"应用场景"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"HTTP, FTP, SMTP, SSH"}),e.jsx("td",{className:"border border-stone-300 px-3 py-2 text-ink-muted font-mono text-[13px]",children:"DNS, DHCP, 视频直播, VoIP"})]})]})]}),e.jsx(m,{simpleContent:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Web 浏览 🌐："}),"选择 TCP，因为网页内容必须完整且有序"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"文件传输 📁："}),"选择 TCP，必须保证文件完整性"]})]}),hardcoreContent:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"视频直播 📹："}),"选择 UDP，容忍少量丢包以换取低延迟"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"在线游戏 🎮："}),"选择 UDP，实时性比可靠性更重要"]})]})})]}),e.jsxs("section",{id:"common-issues",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"常见问题与误区"}),e.jsx(t,{type:"warning",title:"误区 1：TCP 一定能保证数据不丢失",children:"TCP 只能保证传输层的可靠性。如果应用层处理不当（如缓冲区溢出、程序崩溃），数据仍然可能丢失。此外，TCP 无法应对网络分区、硬件故障等极端情况。"}),e.jsx(t,{type:"warning",title:"误区 2：UDP 一定比 TCP 快",children:"在网络状况良好时，UDP 确实更快。但在高丢包率环境下，UDP 应用层可能需要实现自己的重传机制，反而可能比 TCP 更慢。选择协议应根据具体场景权衡。"}),e.jsxs(t,{type:"warning",title:"误区 3：TIME_WAIT 状态无害",children:["高并发服务器会产生大量 TIME_WAIT 连接，占用端口资源（最多 65535 个）。解决方案包括：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"net.ipv4.tcp_tw_reuse"}),"、调整 MSL 值、使用长连接等。"]}),e.jsx(t,{type:"tip",title:"如何查看 TCP 连接状态？",children:e.jsx(d,{language:"bash",code:`# Linux 查看所有 TCP 连接
ss -tan

# 统计各状态的连接数
ss -tan | awk '{print $1}' | sort | uniq -c

# 查看 TIME_WAIT 状态的连接
ss -tan state time-wait | wc -l`})})]}),e.jsxs("section",{id:"interview-questions",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"面试真题"}),e.jsx(a,{questions:[{question:"为什么 TCP 握手是三次，挥手是四次？",answer:"握手时，服务端的 SYN 和 ACK 可以合并在一个报文中发送（第二次握手），所以只需要三次。而挥手时，服务端收到客户端的 FIN 后，可能还有数据要发送，不能立即关闭连接，所以先发送 ACK（第二次挥手），等数据发送完毕后再发送 FIN（第三次挥手），因此需要四次。"},{question:"TIME_WAIT 状态的作用是什么？为什么需要等待 2MSL？",answer:"TIME_WAIT 有两个作用：1) 确保最后一个 ACK 能到达服务端，如果 ACK 丢失，服务端会重传 FIN，客户端需要在 2MSL 内能够重传 ACK；2) 让本连接持续时间内产生的所有报文段都从网络中消失，避免影响新连接。2MSL 是报文最大生存时间的两倍，确保双向的报文都已消失。"},{question:"TCP 如何实现可靠性？列举至少三种机制。",answer:"TCP 通过以下机制实现可靠性：1) 校验和：检测数据错误；2) 序列号：解决乱序和重复问题；3) 确认应答：确保数据到达；4) 超时重传：处理丢包；5) 连接管理：三次握手确保双方就绪。"},{question:"慢启动和拥塞避免的区别是什么？",answer:"慢启动阶段，cwnd 从 1 开始，每收到一个 ACK，cwnd++，呈指数增长。当 cwnd ≥ ssthresh 时，进入拥塞避免阶段，每经过一个 RTT，cwnd++，呈线性增长。慢启动的目的是快速探测可用带宽，拥塞避免的目的是平稳增加发送速率，避免网络拥塞。"},{question:"什么是 SYN Flood 攻击？如何防御？",answer:"SYN Flood 是一种 DDoS 攻击，攻击者发送大量 SYN 包但不完成第三次握手，导致服务端维护大量半连接队列，耗尽资源。防御方法包括：1) SYN Cookie：服务端不维护半连接状态，而是通过哈希计算生成序列号；2) 增加半连接队列长度；3) 缩短 SYN 超时时间；4) 使用防火墙过滤异常流量。"},{question:"TCP 和 UDP 的应用场景分别有哪些？",answer:"TCP 适用于对可靠性要求高的场景：HTTP/HTTPS、FTP、SMTP、SSH、数据库连接等。UDP 适用于对实时性要求高、能容忍少量丢包的场景：DNS 查询、DHCP、视频直播、VoIP、在线游戏、QUIC 协议等。"},{question:"什么是粘包和拆包？如何解决？",answer:`粘包是指 TCP 将多个小数据包合并成一个大数据包发送；拆包是指将一个大数据包分成多个小包发送。这是因为 TCP 是面向字节流的，没有消息边界。解决方法：1) 固定长度：每个消息固定大小；2) 分隔符：使用特殊字符（如 
）分隔；3) 长度字段：在消息头部添加长度信息（最常用）。`}]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"实验场"}),e.jsx(c,{description:"模拟 TCP 三次握手和四次挥手的过程，观察状态变化",code:`// TCP 连接状态模拟
class TCPConnection {
  constructor() {
    this.state = 'CLOSED';
    this.seq = 0;
    this.ack = 0;
  }

  // 客户端发起连接
  clientConnect() {
    console.log('Client: SYN sent');
    this.state = 'SYN_SENT';
    this.seq++;
  }

  // 服务端响应
  serverAccept() {
    console.log('Server: SYN+ACK sent');
    this.state = 'SYN_RCVD';
    this.seq++;
    this.ack++;
  }

  // 客户端确认
  clientConfirm() {
    console.log('Client: ACK sent');
    this.state = 'ESTABLISHED';
    this.ack++;
  }

  getState() {
    return this.state;
  }
}

const conn = new TCPConnection();
console.log('Initial state:', conn.getState());

conn.clientConnect();
console.log('After SYN:', conn.getState());

conn.serverAccept();
console.log('After SYN+ACK:', conn.getState());

conn.clientConfirm();
console.log('Final state:', conn.getState());`,language:"javascript"}),e.jsx(t,{type:"info",title:"运行结果",children:e.jsx(d,{language:"text",code:`Initial state: CLOSED
After SYN: SYN_SENT
After SYN+ACK: SYN_RCVD
Final state: ESTABLISHED`})})]}),e.jsx(x,{...i(r.category,r.id)})]})}),e.jsx(o,{items:p})]})}export{g as default};
