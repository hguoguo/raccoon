import{j as e,g as l}from"./index-hyqxTCwJ.js";import{K as r}from"./KnowledgeLayout-CwkOMHwC.js";import{S as i}from"./SideNote-BKvanovA.js";import{C as a}from"./ContextSwitcher-Cjd-h5IL.js";import{C as t,A as x,S as d}from"./ArticleNav-DhfiS38Y.js";import{D as s}from"./DiagramBlock-CLaKE9_7.js";import{I as c}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"reliability-overview",text:"一、可靠性保障体系",level:2},{id:"ack-deep-dive",text:"二、ACK 机制深度解析",level:2},{id:"ack-implementation",text:"2.1 ACK 实现原理",level:3},{id:"isr-mechanism",text:"三、ISR 机制详解",level:2},{id:"isr-sync",text:"3.1 ISR 同步流程",level:3},{id:"osr-ar",text:"3.2 OSR 与 AR",level:3},{id:"replication",text:"四、副本同步机制",level:2},{id:"leader-follower-sync",text:"4.1 Leader-Follower 同步",level:3},{id:"hw-leo",text:"4.2 HW 与 LEO",level:3},{id:"idempotence",text:"五、幂等性机制",level:2},{id:"pid-sequence",text:"5.1 PID 与 Sequence Number",level:3},{id:"idempotence-limitations",text:"5.2 幂等性限制",level:3},{id:"transaction",text:"六、事务机制",level:2},{id:"transaction-flow",text:"6.1 事务流程",level:3},{id:"exactly-once",text:"6.2 Exactly-Once 语义",level:3},{id:"message-loss-scenarios",text:"七、消息丢失场景分析",level:2},{id:"producer-loss",text:"7.1 Producer 端丢失",level:3},{id:"broker-loss",text:"7.2 Broker 端丢失",level:3},{id:"consumer-loss",text:"7.3 Consumer 端丢失",level:3},{id:"reliability-config",text:"八、可靠性配置最佳实践",level:2},{id:"comparison",text:"九、与其他 MQ 可靠性对比",level:2},{id:"misconceptions",text:"十、常见误区",level:2},{id:"interview",text:"十一、面试真题",level:2},{id:"related",text:"十二、知识关联",level:2}];function k({meta:n}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(r,{meta:n,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Kafka 通过",e.jsx("strong",{className:"text-accent",children:"ACK 确认、ISR 副本同步、幂等性、事务"}),"等多层机制，在保证高吞吐的同时实现消息的可靠传递，支持 At-Least-Once、At-Most-Once 和 Exactly-Once 三种语义。"]})}),e.jsx("h2",{id:"reliability-overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、可靠性保障体系"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Kafka 的可靠性保障贯穿整个消息链路，从 Producer 到 Broker 再到 Consumer，每个环节都有相应的机制。"}),e.jsx(s,{title:"Kafka 可靠性保障全景图",children:`graph TB
              subgraph "Producer 端"
                P1["幂等性<br/>PID + Sequence"]
                P2["事务<br/>Transaction"]
                P3["重试机制<br/>Retries"]
                P4["ACK 确认<br/>acks=all"]
              end

              subgraph "Broker 端"
                B1["副本机制<br/>Replication Factor=3"]
                B2["ISR 管理<br/>In-Sync Replicas"]
                B3["HW 截断<br/>High Watermark"]
                B4["持久化<br/>Log Segment"]
              end

              subgraph "Consumer 端"
                C1["手动提交 Offset<br/>commitSync/Async"]
                C2["幂等消费<br/>业务去重"]
                C3["事务消费<br/>Read Committed"]
              end

              P1 --> P4
              P2 --> P4
              P3 --> P4
              
              P4 --> B1
              B1 --> B2
              B2 --> B3
              B3 --> B4

              B4 --> C1
              C1 --> C2
              C2 --> C3`}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Producer 端"}),"：幂等性、事务、重试、ACK 确认"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Broker 端"}),"：副本复制、ISR 管理、HW 截断、持久化存储"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Consumer 端"}),"：手动提交 Offset、幂等消费、事务消费"]})]}),e.jsx(t,{type:"info",title:"三种消息语义",children:e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"At-Most-Once（最多一次）"}),"：消息可能丢失，但不会重复。适用于日志收集等允许丢失的场景。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"At-Least-Once（至少一次）"}),"：消息不会丢失，但可能重复。适用于大多数业务场景，需在消费端实现幂等性。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Exactly-Once（精确一次）"}),"：消息既不丢失也不重复。适用于金融交易等对一致性要求极高的场景。"]})]})}),e.jsx("h2",{id:"ack-deep-dive",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、ACK 机制深度解析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"ACK 机制是 Kafka 保证消息可靠性的第一道防线，决定了 Producer 如何确认消息发送成功。"}),e.jsx("h3",{id:"ack-implementation",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.1 ACK 实现原理"}),e.jsx(s,{title:"ACK 工作流程",children:`sequenceDiagram
              participant P as Producer
              participant L as Leader
              participant F1 as Follower 1
              participant F2 as Follower 2

              P->>L: Send Message
              L->>L: Write to Log
              
              opt acks=1
                L-->>P: ACK Success
              end
              
              opt acks=all
                L->>F1: Fetch Request
                L->>F2: Fetch Request
                F1->>F1: Write to Log
                F2->>F2: Write to Log
                F1-->>L: ACK
                F2-->>L: ACK
                L-->>P: ACK Success
              end`}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:e.jsx("strong",{children:"关键参数："})}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"acks=0"}),"：Producer 不等待任何确认，发送后立即返回。性能最高，但可能丢消息。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"acks=1"}),"：Leader 写入成功后立即返回。如果 Leader 在 Follower 同步前故障，消息会丢失。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"acks=all（或 -1）"}),"：Leader 和所有 ISR 中的 Follower 都写入成功后才返回。可靠性最高。"]})]}),e.jsx(i,{label:"重要提示",children:e.jsxs("p",{className:"text-[13px] leading-[1.7]",children:[e.jsx("strong",{children:"重要提示："}),"acks=all 必须配合 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"min.insync.replicas"})," 使用，否则当 ISR 只剩 Leader 时，acks=all 退化为 acks=1。"]})}),e.jsx("h2",{id:"isr-mechanism",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、ISR 机制详解"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"ISR（In-Sync Replicas）是 Kafka 可靠性保障的核心机制，确保只有与 Leader 保持同步的副本才能参与选举和 ACK 确认。"}),e.jsx("h3",{id:"isr-sync",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 ISR 同步流程"}),e.jsx(s,{title:"ISR 同步机制",children:`graph TB
              subgraph "Partition 0 (RF=3)"
                L["Leader<br/>LEO=100<br/>HW=95"]
                F1["Follower 1<br/>LEO=100<br/>HW=95<br/>✅ In ISR"]
                F2["Follower 2<br/>LEO=98<br/>HW=95<br/>⚠️ Lagging"]
              end

              L -->|"Fetch Response<br/>LEO=100"| F1
              L -->|"Fetch Response<br/>LEO=100"| F2

              F1 -->|"Fetch Request"| L
              F2 -->|"Fetch Request"| L

              F1 -.->|"同步完成<br/>加入 ISR"| L
              F2 -.->|"滞后超过阈值<br/>移出 ISR"| L`}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"同步判断标准："}),"Follower 落后 Leader 的时间不超过 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"replica.lag.time.max.ms"}),"（默认 30 秒）。"]}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"动态调整"}),"：Follower 追上 Leader 后重新加入 ISR；滞后过多被移出 ISR"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Leader 选举"}),"：只有 ISR 中的副本才有资格被选举为新的 Leader"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ACK 确认"}),"：acks=all 时，需要等待所有 ISR 副本确认"]})]}),e.jsx("h3",{id:"osr-ar",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 OSR 与 AR"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Kafka 中的副本集合分为三类："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"AR（Assigned Replicas）"}),"：所有副本集合，包括 ISR 和 OSR"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ISR（In-Sync Replicas）"}),"：与 Leader 保持同步的副本集合"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"OSR（Out-of-Sync Replicas）"}),"：滞后过多的副本集合"]})]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["关系：",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"AR = ISR + OSR"})]}),e.jsx(t,{type:"warning",title:"ISR 收缩风险",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:["如果所有 Follower 都滞后被移出 ISR，导致 ISR 只剩 Leader，此时：",e.jsx("br",{}),"① acks=all 退化为 acks=1，可靠性降低；",e.jsx("br",{}),"② 如果 Leader 故障，没有可用的 Follower 选举，Partition 不可用。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"解决方案："}),"设置 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"min.insync.replicas=2"}),"，当 ISR < 2 时拒绝写入，避免数据丢失。"]})}),e.jsx("h2",{id:"replication",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、副本同步机制"}),e.jsx("h3",{id:"leader-follower-sync",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 Leader-Follower 同步"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Kafka 采用 Leader-Follower 模型进行副本同步："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Leader"}),"：处理所有读写请求，维护 HW 和 LEO"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Follower"}),"：只读，定期从 Leader 拉取数据进行同步"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"同步方式"}),"：Follower 主动发起 Fetch Request，Leader 返回最新数据"]})]}),e.jsx("h3",{id:"hw-leo",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.2 HW 与 LEO"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Kafka 使用两个重要的偏移量来管理副本同步："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"LEO（Log End Offset）"}),"：日志末尾偏移量，表示下一条待写入消息的位置"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"HW（High Watermark）"}),"：高水位，表示所有 ISR 副本都已同步的最大偏移量"]})]}),e.jsx(s,{title:"HW 与 LEO 关系",children:`graph LR
              subgraph "Leader"
                L1["Msg 0"]
                L2["Msg 1"]
                L3["Msg 2"]
                L4["Msg 3"]
                L5["Msg 4"]
              end

              subgraph "Follower 1"
                F11["Msg 0"]
                F12["Msg 1"]
                F13["Msg 2"]
                F14["Msg 3"]
              end

              subgraph "Follower 2"
                F21["Msg 0"]
                F22["Msg 1"]
                F23["Msg 2"]
              end

              L3 -.->|"HW=2<br/>Consumer 可见"| L3
              F13 -.->|"LEO=3"| F14
              F23 -.->|"LEO=2"| F23

              style L3 fill:#90EE90
              style F13 fill:#90EE90
              style F23 fill:#90EE90`}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:e.jsx("strong",{children:"关键规则："})}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsx("li",{children:"Consumer 只能消费 HW 之前的消息，保证不会读到未完全同步的数据"}),e.jsx("li",{children:"Leader 故障时，新 Leader 会截断 HW 之后的消息，保证数据一致性"}),e.jsx("li",{children:"HW 由 Leader 定期更新，取所有 ISR 副本 LEO 的最小值"})]}),e.jsx(i,{label:"重要提示",children:e.jsxs("p",{className:"text-[13px] leading-[1.7]",children:[e.jsx("strong",{children:"示例："}),"如果 Leader LEO=100，Follower1 LEO=100，Follower2 LEO=98，则 HW=min(100, 100, 98)=98。Consumer 最多只能消费到 Offset 97。"]})}),e.jsx("h2",{id:"idempotence",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、幂等性机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"幂等性保证 Producer 重试时不会产生重复消息。Kafka 0.11+ 引入了幂等性 Producer。"}),e.jsx("h3",{id:"pid-sequence",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.1 PID 与 Sequence Number"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"幂等性通过以下两个标识实现："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"PID（Producer ID）"}),"：每个 Producer 实例的唯一标识，由 Broker 分配"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sequence Number"}),"：每条消息的序列号，按 Partition 递增"]})]}),e.jsx(s,{title:"幂等性去重流程",children:`sequenceDiagram
              participant P as Producer<br/>(PID=100)
              participant B as Broker

              P->>B: Send Msg (PID=100, Seq=5)
              B->>B: Check: Last Seq for PID 100 = 4
              B->>B: 5 > 4, Accept
              B-->>P: ACK Success

              Note over P,B: Network Timeout, Retry

              P->>B: Retry Msg (PID=100, Seq=5)
              B->>B: Check: Last Seq for PID 100 = 5
              B->>B: 5 == 5, Duplicate!
              B-->>P: ACK Success (Discard)`}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"工作原理："}),"Broker 为每个 PID + Partition 维护最新的 Sequence Number。收到消息时，如果 Sequence Number ≤ 已处理的最新值，判定为重复消息并丢弃。"]}),e.jsx("h3",{id:"idempotence-limitations",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.2 幂等性限制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"幂等性有以下限制："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"单 Partition 有效"}),"：只能在单个 Partition 内保证幂等性，跨 Partition 无效"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"单会话有效"}),"：Producer 重启后 PID 会变化，无法检测之前会话的重复"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"有限窗口"}),"：Broker 只保留最近 5 分钟的 Sequence Number（可配置）"]})]}),e.jsx(t,{type:"info",title:"启用幂等性",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:["设置 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"enable.idempotence=true"})," 即可启用。此时 Kafka 会自动设置：",e.jsx("br",{}),"• ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"acks=all"}),e.jsx("br",{}),"• ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"retries=Integer.MAX_VALUE"}),e.jsx("br",{}),"• ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"max.in.flight.requests.per.connection=5"})]})}),e.jsx("h2",{id:"transaction",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、事务机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"事务机制解决了幂等性的局限，实现了跨 Partition 和跨会话的 Exactly-Once 语义。"}),e.jsx("h3",{id:"transaction-flow",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"6.1 事务流程"}),e.jsx(s,{title:"Kafka 事务流程",children:`sequenceDiagram
              participant P as Producer
              participant TC as Transaction Coordinator
              participant B1 as Broker 1<br/>(Partition A)
              participant B2 as Broker 2<br/>(Partition B)

              P->>TC: Begin Transaction
              TC-->>P: OK

              P->>B1: Send Msg to Partition A
              P->>B2: Send Msg to Partition B

              P->>TC: Commit Transaction
              TC->>B1: Prepare Commit
              TC->>B2: Prepare Commit
              B1-->>TC: Prepared
              B2-->>TC: Prepared
              TC->>B1: Do Commit
              TC->>B2: Do Commit
              TC-->>P: Commit Success`}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:e.jsx("strong",{children:"关键组件："})}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Transaction Coordinator"}),"：事务协调器，管理事务状态"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Transaction Log"}),"：事务日志，存储在 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"__transaction_state"})," Topic"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Control Batch"}),"：控制批次，标记事务的开始和结束"]})]}),e.jsx("h3",{id:"exactly-once",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"6.2 Exactly-Once 语义"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Kafka 通过以下方式实现端到端的 Exactly-Once 语义："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Producer 端"}),"：使用事务发送消息，保证原子性"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Broker 端"}),"：事务消息对 Consumer 不可见，直到事务提交"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Consumer 端"}),"：设置 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"isolation.level=read_committed"}),"，只读取已提交的事务消息"]})]}),e.jsx(a,{simpleContent:e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-[14px] leading-[1.8]",children:"Consumer 可以读取所有消息，包括未提交的事务消息和已中止的消息。"}),e.jsxs("p",{className:"text-[14px] leading-[1.8] text-red-600",children:[e.jsx("strong",{children:"缺点："}),"可能读到脏数据，不适用于生产环境。"]})]}),hardcoreContent:e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-[14px] leading-[1.8]",children:"Consumer 只能读取已提交的事务消息，未提交或已中止的消息对 Consumer 不可见。"}),e.jsxs("p",{className:"text-[14px] leading-[1.8] text-green-600",children:[e.jsx("strong",{children:"优点："}),"保证数据一致性，是实现 Exactly-Once 的关键配置。"]})]})}),e.jsx(t,{type:"tip",title:"Exactly-Once 配置",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"Producer 端："}),e.jsx("br",{}),e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"transactional.id=my-transaction"}),e.jsx("br",{}),e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"enable.idempotence=true"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"Consumer 端："}),e.jsx("br",{}),e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"isolation.level=read_committed"})]})}),e.jsx("h2",{id:"message-loss-scenarios",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、消息丢失场景分析"}),e.jsx("h3",{id:"producer-loss",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"7.1 Producer 端丢失"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"acks=0"}),"：发送后不等待确认，网络故障导致消息丢失"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"缓冲区满"}),"：",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"buffer.memory"})," 耗尽且 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"max.block.ms"})," 超时"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"重试次数耗尽"}),"：",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"retries"})," 用尽后放弃发送"]})]}),e.jsx("h3",{id:"broker-loss",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"7.2 Broker 端丢失"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"acks=1 + Leader 故障"}),"：Leader 写入成功但 Follower 未同步，Leader 故障后消息丢失"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"unclean.leader.election.enable=true"}),"：非 ISR 副本被选举为 Leader，导致数据回滚"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"磁盘故障"}),"：所有副本所在的磁盘同时损坏（概率极低）"]})]}),e.jsx("h3",{id:"consumer-loss",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"7.3 Consumer 端丢失"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"自动提交 Offset"}),"：poll 后立即提交，但处理失败，导致消息丢失"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Rebalance"}),"：重平衡期间未提交 Offset，新 Consumer 从旧位置开始消费，跳过部分消息"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"消费异常"}),"：处理消息时抛出异常但未捕获，Offset 已提交"]})]}),e.jsx(t,{type:"danger",title:"典型丢失场景",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"场景："}),"acks=1，replication.factor=3，min.insync.replicas=1。",e.jsx("br",{}),e.jsx("strong",{children:"过程："}),"Leader 写入成功后返回 ACK，此时 Follower 正在同步。Leader 突然宕机，触发选举，新的 Leader 是从旧的 Follower 中选出的，缺少刚才写入的消息。",e.jsx("br",{}),e.jsx("strong",{children:"解决："}),"设置 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"acks=all"})," + ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"min.insync.replicas=2"}),"。"]})}),e.jsx("h2",{id:"reliability-config",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、可靠性配置最佳实践"}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] mb-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep border-b-2 border-border",children:[e.jsx("th",{className:"px-3 py-2 text-left font-semibold text-ink",children:"组件"}),e.jsx("th",{className:"px-3 py-2 text-left font-semibold text-ink",children:"参数"}),e.jsx("th",{className:"px-3 py-2 text-left font-semibold text-ink",children:"推荐值"}),e.jsx("th",{className:"px-3 py-2 text-left font-semibold text-ink",children:"说明"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-medium text-ink",rowSpan:4,children:"Producer"}),e.jsx("td",{className:"px-3 py-2 font-mono text-[12px] text-ink-muted",children:"acks"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"all"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"等待所有 ISR 确认"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-mono text-[12px] text-ink-muted",children:"enable.idempotence"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"true"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"启用幂等性"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-mono text-[12px] text-ink-muted",children:"retries"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"Integer.MAX_VALUE"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"无限重试"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-mono text-[12px] text-ink-muted",children:"transactional.id"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"自定义"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"启用事务（需要 Exactly-Once 时）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-medium text-ink",rowSpan:3,children:"Broker"}),e.jsx("td",{className:"px-3 py-2 font-mono text-[12px] text-ink-muted",children:"replication.factor"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"≥ 3"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"副本数"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-mono text-[12px] text-ink-muted",children:"min.insync.replicas"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"2"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"最小同步副本数"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-mono text-[12px] text-ink-muted",children:"unclean.leader.election.enable"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"false"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"禁止非 ISR 选举"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-medium text-ink",rowSpan:2,children:"Consumer"}),e.jsx("td",{className:"px-3 py-2 font-mono text-[12px] text-ink-muted",children:"enable.auto.commit"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"false"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"手动提交 Offset"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-mono text-[12px] text-ink-muted",children:"isolation.level"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"read_committed"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"只读已提交消息"})]})]})]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、与其他 MQ 可靠性对比"}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] mb-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep border-b-2 border-border",children:[e.jsx("th",{className:"px-3 py-2 text-left font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"px-3 py-2 text-left font-semibold text-ink",children:"Kafka"}),e.jsx("th",{className:"px-3 py-2 text-left font-semibold text-ink",children:"RocketMQ"}),e.jsx("th",{className:"px-3 py-2 text-left font-semibold text-ink",children:"RabbitMQ"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-medium text-ink",children:"副本机制"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"ISR + HW"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"主从同步 + Dledger"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"镜像队列"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-medium text-ink",children:"事务支持"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"✅ 完整支持"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"✅ 事务消息"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"❌ 不支持"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-medium text-ink",children:"幂等性"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"✅ PID + Sequence"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"✅ 业务层实现"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"❌ 需业务层实现"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-medium text-ink",children:"Exactly-Once"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"✅ 端到端支持"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"⚠️ 半消息事务"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"❌ 不支持"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-medium text-ink",children:"持久化"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"顺序写磁盘"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"CommitLog"}),e.jsx("td",{className:"px-3 py-2 text-ink-muted",children:"内存 + 异步刷盘"})]})]})]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、常见误区"}),e.jsx(t,{type:"danger",title:"误区 1：acks=all 就万无一失",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"事实："}),"acks=all 只保证 ISR 中的副本都确认，但如果 ISR 只剩 Leader（其他 Follower 都滞后被移出），acks=all 退化为 acks=1。必须配合 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"min.insync.replicas=2"})," 使用。"]})}),e.jsx(t,{type:"danger",title:"误区 2：幂等性可以保证全局不重复",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"事实："}),"幂等性只在",e.jsx("strong",{children:"单 Partition"}),"内有效，跨 Partition 无效。如果需要跨 Partition 的 Exactly-Once，必须使用事务机制。"]})}),e.jsx(t,{type:"danger",title:"误区 3：事务性能很差，不能用",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"事实："}),"事务确实会带来性能开销（约 20%-30%），但对于金融交易等关键场景，这是必须的代价。可以通过批量提交事务、优化事务粒度等方式减轻影响。"]})}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、面试真题"}),e.jsx(c,{questions:[{question:"Kafka 如何保证消息不丢失？",answer:`Kafka 通过多层机制保证消息可靠性：

**Producer 端**：
1. 设置 \`acks=all\`，等待所有 ISR 副本确认。
2. 启用幂等性（\`enable.idempotence=true\`），防止重复发送。
3. 设置 \`retries=Integer.MAX_VALUE\`，无限重试直到成功。

**Broker 端**：
1. 配置 \`replication.factor>=3\`，保证足够的副本数。
2. 设置 \`min.insync.replicas=2\`，确保至少有 2 个副本同步成功。
3. 禁用 \`unclean.leader.election.enable=false\`，防止非 ISR 副本选举为 Leader。

**Consumer 端**：
1. 关闭自动提交（\`enable.auto.commit=false\`）。
2. 手动提交 Offset，在业务逻辑执行成功后再提交。
3. 实现幂等消费，防止重复处理。`},{question:"解释一下 Kafka 的 ISR 机制和 HW、LEO 的作用。",answer:`**ISR（In-Sync Replicas）**：与 Leader 保持同步的副本集合。判断标准是 Follower 落后 Leader 的时间不超过 \`replica.lag.time.max.ms\`（默认 30 秒）。

**作用**：
1. **Leader 选举**：只有 ISR 中的副本才有资格被选举为新的 Leader，保证数据不丢失。
2. **ACK 确认**：acks=all 时，需要等待所有 ISR 副本确认。

**LEO（Log End Offset）**：日志末尾偏移量，表示下一条待写入消息的位置。

**HW（High Watermark）**：高水位，表示所有 ISR 副本都已同步的最大偏移量。Consumer 只能消费 HW 之前的消息，保证不会读到未完全同步的数据。

**关系**：HW = min(所有 ISR 副本的 LEO)。Leader 故障时，新 Leader 会截断 HW 之后的消息，保证数据一致性。`},{question:"Kafka 的幂等性和事务有什么区别？",answer:`**幂等性**：
- **范围**：单 Partition 内有效，跨 Partition 无效。
- **实现**：通过 PID（Producer ID）和 Sequence Number 去重。
- **会话**：单会话有效，Producer 重启后 PID 变化，无法检测之前的重复。
- **适用场景**：防止网络超时重试导致的重复发送。

**事务**：
- **范围**：跨 Partition、跨会话有效。
- **实现**：通过 Transaction Coordinator 和两阶段提交协议。
- **会话**：通过 \`transactional.id\` 标识，重启后可恢复事务状态。
- **适用场景**：实现端到端的 Exactly-Once 语义，如跨多个 Topic 的原子操作。

**总结**：幂等性是事务的基础，事务是幂等性的扩展。启用事务时会自动启用幂等性。`},{question:"什么情况下 Kafka 会丢失消息？如何避免？",answer:"**丢失场景**：\n\n1. **Producer 端**：acks=0 或不重试。→ 解决：设置 `acks=all` + `retries=Integer.MAX_VALUE`。\n\n2. **Broker 端**：acks=1 且 Leader 故障，或非 ISR 选举。→ 解决：`acks=all` + `min.insync.replicas=2` + `unclean.leader.election.enable=false`。\n\n3. **Consumer 端**：自动提交 Offset 后处理失败。→ 解决：手动提交 Offset，业务成功后再提交。\n\n**最佳实践**：\n- Producer：`acks=all` + `enable.idempotence=true` + `retries=Integer.MAX_VALUE`\n- Broker：`replication.factor=3` + `min.insync.replicas=2`\n- Consumer：`enable.auto.commit=false` + 手动提交 + 幂等消费"},{question:"Kafka 如何实现 Exactly-Once 语义？",answer:`Kafka 通过以下方式实现端到端的 Exactly-Once 语义：

**Producer 端**：
1. 设置 \`transactional.id\`，启用事务。
2. 使用 \`beginTransaction()\`、\`sendMessages()\`、\`commitTransaction()\` 包裹发送逻辑。
3. 自动启用幂等性（\`enable.idempotence=true\`）。

**Broker 端**：
1. Transaction Coordinator 管理事务状态。
2. 事务消息对 Consumer 不可见，直到事务提交。
3. 通过 Control Batch 标记事务边界。

**Consumer 端**：
1. 设置 \`isolation.level=read_committed\`，只读取已提交的事务消息。
2. 在事务中处理消息并提交 Offset，保证原子性。

**注意**：事务会带来性能开销（约 20%-30%），仅在需要强一致性的场景使用。`}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十二、知识关联"}),e.jsxs("ul",{className:"space-y-3 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"前置知识："}),"建议先阅读 ",e.jsx("a",{href:"/docs/kafka/kafka-architecture",className:"text-accent hover:underline",children:"Kafka 架构与核心概念"})," 和 ",e.jsx("a",{href:"/docs/kafka/kafka-producer-consumer",className:"text-accent hover:underline",children:"Kafka 生产者与消费者"}),"。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"下一篇："}),e.jsx("a",{href:"/docs/kafka/kafka-streams",className:"text-accent hover:underline",children:"Kafka Streams 流处理"}),"，学习如何基于 Kafka 构建实时流式应用。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"相关知识点："}),e.jsxs("ul",{className:"list-disc list-inside ml-4 mt-2 space-y-1",children:[e.jsxs("li",{children:[e.jsx("a",{href:"/docs/kafka/kafka-performance-tuning",className:"text-accent hover:underline",children:"Kafka 性能调优"}),"：在可靠性和性能之间找到平衡"]}),e.jsxs("li",{children:[e.jsx("a",{href:"/docs/rocketmq/rocketmq-reliability",className:"text-accent hover:underline",children:"RocketMQ 消息可靠性"}),"：对比学习不同 MQ 的可靠性设计"]}),e.jsxs("li",{children:[e.jsx("a",{href:"/docs/backend/java/08-microservices/distributed-transaction",className:"text-accent hover:underline",children:"分布式事务"}),"：理解事务在分布式系统中的应用"]})]})]})]}),e.jsx(x,{...l(n.category,n.id)})]})}),e.jsx(d,{items:m})]})}export{k as default};
