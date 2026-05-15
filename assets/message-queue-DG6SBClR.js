import{j as e,g as d}from"./index-hyqxTCwJ.js";import{K as n}from"./KnowledgeLayout-CwkOMHwC.js";import{P as l}from"./Playground-C6lk-t6G.js";import{S as r}from"./SideNote-BKvanovA.js";import{C as s,A as x,S as o}from"./ArticleNav-DhfiS38Y.js";import{D as t}from"./DiagramBlock-CLaKE9_7.js";import{I as a}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"core-concepts",text:"一、核心概念与术语",level:2},{id:"messaging-patterns",text:"二、消息传递模式",level:2},{id:"kafka-deep-dive",text:"三、Kafka 深度解析",level:2},{id:"rocketmq-features",text:"四、RocketMQ 高级特性",level:2},{id:"rabbitmq-routing",text:"五、RabbitMQ 路由机制",level:2},{id:"reliability-guarantee",text:"六、消息可靠性保证",level:2},{id:"idempotency",text:"七、幂等性设计",level:2},{id:"ordered-messages",text:"八、顺序消息",level:2},{id:"dead-letter",text:"九、死信队列",level:2},{id:"comparison",text:"十、三大 MQ 对比",level:2},{id:"misconceptions",text:"十一、常见误区",level:2},{id:"interview",text:"十二、面试真题",level:2},{id:"related",text:"十三、知识关联",level:2}];function k({meta:i}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(n,{meta:i,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["消息队列是分布式系统中的",e.jsx("strong",{className:"text-accent",children:"异步通信中间件"}),",通过生产者-消费者模型实现服务解耦、流量削峰和最终一致性,是微服务架构的核心基础设施。"]})}),e.jsxs(s,{type:"info",title:"为什么需要消息队列?",children:["• ",e.jsx("strong",{children:"解耦:"})," 生产者无需知道消费者的存在",e.jsx("br",{}),"• ",e.jsx("strong",{children:"异步:"})," 提升系统响应速度,非关键路径异步处理",e.jsx("br",{}),"• ",e.jsx("strong",{children:"削峰:"})," 缓冲突发流量,保护后端服务",e.jsx("br",{}),"• ",e.jsx("strong",{children:"最终一致性:"})," 通过消息可靠投递实现分布式事务"]}),e.jsx("h2",{id:"core-concepts",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、核心概念与术语"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"理解消息队列前,需要掌握以下核心概念:"}),e.jsx("h3",{id:"producer-consumer",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"生产者与消费者"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Producer(生产者):"})," 发送消息的应用,只负责将消息发送到 MQ"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Consumer(消费者):"})," 接收并处理消息的应用,从 MQ 拉取或订阅消息"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Broker:"})," 消息队列服务器,负责存储和转发消息"]})]}),e.jsx("h3",{id:"topic-queue",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Topic 与 Queue"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Topic(主题):"}),' 消息的逻辑分类,如 "order.created"、"user.registered"']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Queue(队列):"})," 消息的物理存储单元,Kafka 中称为 Partition"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Consumer Group(消费组):"})," 一组共同消费同一 Topic 的消费者,实现负载均衡"]})]}),e.jsxs(r,{label:"发布-订阅 vs 点对点",children:["• ",e.jsx("strong",{children:"Publish-Subscribe:"})," 一条消息可被多个 Consumer Group 消费(Kafka/RocketMQ)",e.jsx("br",{}),"• ",e.jsx("strong",{children:"Point-to-Point:"})," 一条消息只能被一个消费者消费(RabbitMQ 队列模式)"]}),e.jsx("h2",{id:"messaging-patterns",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、消息传递模式"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"消息队列支持多种传递模式,满足不同业务场景需求:"}),e.jsx(t,{title:"三种消息传递模式",children:`graph TB
    subgraph "同步调用"
        A[服务 A] -->|直接调用| B[服务 B]
    end
    
    subgraph "异步消息 - 发布订阅"
        P[生产者] -->|发布| T[Topic]
        T -->|订阅| C1[消费者 1]
        T -->|订阅| C2[消费者 2]
        T -->|订阅| C3[消费者 3]
    end
    
    subgraph "异步消息 - 点对点"
        P2[生产者] -->|发送| Q[Queue]
        Q -->|消费| CG[消费者组]
    end`}),e.jsx("h3",{id:"pub-sub",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"发布-订阅(Pub/Sub)"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"一条消息可以被多个消费者组独立消费,适合事件驱动架构。例如用户注册成功后,同时触发发送邮件、发送短信、初始化积分等多个操作。"}),e.jsx("h3",{id:"point-to-point",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"点对点(Point-to-Point)"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"一条消息只能被一个消费者消费,适合任务分发场景。例如订单处理队列,多个消费者实例竞争消费,实现水平扩展。"}),e.jsx("h3",{id:"request-reply",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"请求-回复(Request-Reply)"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"通过 Correlation ID 实现异步 RPC,生产者发送请求后等待响应。RabbitMQ 通过 Reply-To 队列实现此模式。"}),e.jsx("h2",{id:"kafka-deep-dive",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、Kafka 深度解析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Kafka 是 LinkedIn 开源的高吞吐分布式消息系统,专为大数据实时流处理设计。"}),e.jsx(t,{title:"Kafka 架构",children:`graph TB
    subgraph "Kafka Cluster"
        B1[Broker 1]
        B2[Broker 2]
        B3[Broker 3]
    end
    
    subgraph "Topic: orders (3 Partitions)"
        P0[Partition 0<br/>Leader: B1]
        P1[Partition 1<br/>Leader: B2]
        P2[Partition 2<br/>Leader: B3]
    end
    
    subgraph "Consumer Group A"
        C1[Consumer 1<br/>消费 P0]
        C2[Consumer 2<br/>消费 P1]
        C3[Consumer 3<br/>消费 P2]
    end
    
    B1 --> P0
    B2 --> P1
    B3 --> P2
    P0 --> C1
    P1 --> C2
    P2 --> C3`}),e.jsx("h3",{id:"kafka-partition",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Partition 分区机制"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"水平扩展:"})," Topic 分为多个 Partition,分布在不同的 Broker 上"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"并行消费:"})," 每个 Partition 只能被 Consumer Group 中的一个消费者消费"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"顺序保证:"})," 单个 Partition 内消息严格有序"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"副本机制:"})," 每个 Partition 有 Leader 和 Follower,保证高可用"]})]}),e.jsxs(s,{type:"warning",title:"Partition 数量设计",children:["Partition 数量一旦确定无法减少(只能增加)。建议:",e.jsx("br",{}),"• 初期设置为消费者实例数的整数倍",e.jsx("br",{}),"• 考虑未来扩容需求,预留足够的 Partition",e.jsx("br",{}),"• 过多 Partition 会增加 ZooKeeper/KRaft 负担"]}),e.jsx("h3",{id:"kafka-offset",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Offset 位移管理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Kafka 通过 Offset 记录消费者在 Partition 中的消费位置:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"自动提交:"})," enable.auto.commit=true,定期自动提交 Offset(可能丢失或重复)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"手动提交:"})," 业务处理成功后手动提交,保证至少一次消费"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"__consumer_offsets:"})," Kafka 内部 Topic,存储所有 Consumer Group 的 Offset"]})]}),e.jsx("h3",{id:"kafka-replication",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"ISR 副本同步机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Kafka 通过 ISR(In-Sync Replicas)机制保证数据可靠性:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Leader:"})," 负责处理读写请求"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Follower:"})," 从 Leader 同步数据,不对外提供服务"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ISR:"})," 与 Leader 保持同步的副本集合,落后超过阈值的 Follower 会被移出 ISR"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ACK 机制:"})," acks=0(不等待)、acks=1(Leader 确认)、acks=all(所有 ISR 确认)"]})]}),e.jsxs(r,{label:"Kafka 高性能秘诀",children:["• ",e.jsx("strong",{children:"顺序写磁盘:"})," 利用磁盘顺序写性能接近内存写的特性",e.jsx("br",{}),"• ",e.jsx("strong",{children:"零拷贝:"})," sendfile 系统调用,避免内核态与用户态数据拷贝",e.jsx("br",{}),"• ",e.jsx("strong",{children:"页缓存:"})," 利用 OS Page Cache,而非 JVM Heap",e.jsx("br",{}),"• ",e.jsx("strong",{children:"批量发送:"})," Producer 批量压缩发送,减少网络往返"]}),e.jsx("h2",{id:"rocketmq-features",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、RocketMQ 高级特性"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"RocketMQ 是阿里巴巴开源的企业级消息队列,以事务消息和顺序消息著称。"}),e.jsx("h3",{id:"rocketmq-transaction",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"事务消息"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"RocketMQ 的事务消息实现分布式事务的最终一致性:"}),e.jsxs("ol",{className:"list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"发送 Half 消息:"})," Producer 发送半消息到 Broker,此时对 Consumer 不可见"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"执行本地事务:"})," Producer 执行数据库操作"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"提交/回滚:"})," 根据本地事务结果,向 Broker 发送 Commit 或 Rollback"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"回查机制:"})," 如果 Broker 未收到确认,会定期回查 Producer 本地事务状态"]})]}),e.jsx(t,{title:"RocketMQ 事务消息流程",children:`sequenceDiagram
    participant P as Producer
    participant B as Broker
    participant DB as Database
    participant C as Consumer
    
    P->>B: 1. 发送 Half 消息
    B-->>P: 2. 返回成功
    P->>DB: 3. 执行本地事务
    alt 本地事务成功
        P->>B: 4a. 发送 Commit
        B->>C: 5a. 投递消息给消费者
    else 本地事务失败
        P->>B: 4b. 发送 Rollback
        B-->>B: 5b. 删除 Half 消息
    end`}),e.jsx("h3",{id:"rocketmq-orderly",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"顺序消息"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"RocketMQ 支持全局顺序和分区顺序两种模式:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"全局顺序:"})," 整个 Topic 只有一个 Queue,性能低,不推荐"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"分区顺序:"})," 相同业务 ID(如订单号)的消息发送到同一个 Queue,保证局部有序"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"MessageQueueSelector:"})," 自定义选择算法,确保同一订单的消息路由到同一 Queue"]})]}),e.jsx("h3",{id:"rocketmq-delay",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"延迟消息"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"RocketMQ 支持固定等级的延迟消息,适用于订单超时取消、定时任务等场景:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"延迟等级:"})," 默认 18 个等级(1s、5s、10s、30s、1m、2m...2h)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"实现原理:"})," 消息先存入 SCHEDULE_TOPIC_XXXX,到期后转存到真实 Topic"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"限制:"})," 不支持任意时间延迟,只能选择预设等级(RocketMQ 5.0 支持任意延迟)"]})]}),e.jsx("h2",{id:"rabbitmq-routing",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、RabbitMQ 路由机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"RabbitMQ 基于 AMQP 协议,通过 Exchange 实现灵活的消息路由。"}),e.jsx(t,{title:"RabbitMQ 四种 Exchange 类型",children:`graph TB
    subgraph "Direct Exchange"
        D[Direct] -->|routing_key=error| Q1[Queue Error]
        D -->|routing_key=info| Q2[Queue Info]
    end
    
    subgraph "Fanout Exchange"
        F[Fanout] --> Q3[Queue A]
        F --> Q4[Queue B]
        F --> Q5[Queue C]
    end
    
    subgraph "Topic Exchange"
        T[Topic] -->|*.orange.*| Q6[Queue Orange]
        T -->|*.*.rabbit| Q7[Queue Rabbit]
        T -->|lazy.#| Q8[Queue Lazy]
    end
    
    subgraph "Headers Exchange"
        H[Headers] -->|匹配 header| Q9[Queue Matched]
    end`}),e.jsx("h3",{id:"exchange-types",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"四种 Exchange 类型"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Direct:"})," 精确匹配 Routing Key,一对一路由"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Fanout:"})," 广播模式,忽略 Routing Key,发送给所有绑定队列"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Topic:"})," 通配符匹配,# 匹配零或多个单词,* 匹配一个单词"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Headers:"})," 根据消息 Header 属性匹配,较少使用"]})]}),e.jsxs(r,{label:"AMQP 核心概念",children:["• ",e.jsx("strong",{children:"Virtual Host:"})," 逻辑隔离,类似命名空间",e.jsx("br",{}),"• ",e.jsx("strong",{children:"Binding:"})," Exchange 与 Queue 的绑定关系",e.jsx("br",{}),"• ",e.jsx("strong",{children:"Routing Key:"})," 消息的路由标识",e.jsx("br",{}),"• ",e.jsx("strong",{children:"Prefetch Count:"})," 消费者每次拉取的消息数量,控制并发"]}),e.jsx("h2",{id:"reliability-guarantee",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、消息可靠性保证"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"消息可靠性是消息队列的核心要求,需要从生产者、Broker、消费者三个环节保证:"}),e.jsx("h3",{id:"producer-reliability",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"生产者可靠性"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Kafka:"})," acks=all + retries + enable.idempotence=true"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"RocketMQ:"})," 同步发送 + 重试机制,事务消息保证最终一致"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"RabbitMQ:"})," Confirm 模式 + 持久化消息"]})]}),e.jsx("h3",{id:"broker-reliability",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Broker 可靠性"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"持久化:"})," 消息写入磁盘,防止 Broker 重启丢失"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"副本机制:"})," Kafka ISR、RocketMQ 主从同步、RabbitMQ 镜像队列"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"刷盘策略:"})," 同步刷盘(安全但慢) vs 异步刷盘(快但有丢失风险)"]})]}),e.jsx("h3",{id:"consumer-reliability",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"消费者可靠性"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"手动 ACK:"})," 业务处理成功后再确认,避免消息丢失"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"重试机制:"})," 消费失败后重新入队或进入死信队列"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"幂等性:"})," 消费者必须实现幂等,防止重复消费导致数据错误"]})]}),e.jsxs(s,{type:"warning",title:"消息丢失的常见场景",children:["• 生产者发送失败未重试",e.jsx("br",{}),"• Broker 未持久化就宕机",e.jsx("br",{}),"• 消费者自动 ACK 但处理失败",e.jsx("br",{}),"• 网络抖动导致 ACK 丢失",e.jsx("br",{}),e.jsx("strong",{children:"解决:"})," 全链路可靠性配置 + 消息追踪 + 对账补偿"]}),e.jsx("h2",{id:"idempotency",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、幂等性设计"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"由于网络重试、消费者重启等原因,消息可能被重复消费。消费者必须实现幂等性,确保多次处理同一消息的结果一致。"}),e.jsx("h3",{id:"idempotency-strategies",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"幂等性实现方案"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"唯一索引:"})," 数据库设置唯一键,重复插入报错(最简单可靠)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Redis 去重:"})," 消费前检查 messageId 是否已处理,setnx 原子操作"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"状态机:"})," 订单状态只能单向流转(待支付→已支付),重复消息不会改变状态"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Token 机制:"})," 生产者生成唯一 Token,消费者校验 Token 是否已使用"]})]}),e.jsx(l,{code:`@Service
public class OrderConsumer {
    
    @Autowired
    private StringRedisTemplate redisTemplate;
    
    @Autowired
    private OrderMapper orderMapper;
    
    @RabbitListener(queues = "order.queue")
    public void consumeOrder(Message message) {
        String messageId = message.getMessageProperties().getMessageId();
        String orderJson = new String(message.getBody());
        
        // 1. 检查是否已处理(幂等性校验)
        Boolean isProcessed = redisTemplate.opsForValue()
            .setIfAbsent("processed:" + messageId, "1", 24, TimeUnit.HOURS);
        
        if (Boolean.FALSE.equals(isProcessed)) {
            log.warn("消息已处理,messageId: {}", messageId);
            return; // 直接返回,不重复处理
        }
        
        try {
            // 2. 业务处理
            Order order = JSON.parseObject(orderJson, Order.class);
            orderMapper.insert(order);
            
            // 3. 后续操作...
            
        } catch (Exception e) {
            // 4. 异常时删除幂等标记,允许重试
            redisTemplate.delete("processed:" + messageId);
            throw e; // 触发重试
        }
    }
}`,language:"java",filename:"OrderConsumer.java",description:"幂等性消费者示例(Spring Boot + Redis)"}),e.jsx("h2",{id:"ordered-messages",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、顺序消息"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"某些业务场景要求消息严格按顺序处理,如订单创建→支付→发货的状态流转。"}),e.jsx("h3",{id:"ordering-guarantee",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"顺序保证的前提"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"单 Partition/Queue:"})," 相同业务 ID 的消息必须发送到同一分区"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"单消费者:"})," 一个分区只能被一个消费者实例消费"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"同步处理:"})," 消费者不能并发处理同一分区的消息"]})]}),e.jsx(s,{type:"warning",title:"顺序消息的性能代价",children:"顺序消息会显著降低吞吐量,因为失去了并行处理能力。仅在必要时使用,如金融交易、订单状态流转等强顺序场景。"}),e.jsx("h3",{id:"ordering-implementation",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"实现方案对比"}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] mb-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"方案"}),e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"实现方式"}),e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"适用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"Kafka"})}),e.jsx("td",{className:"border border-border p-2",children:"指定 key 发送到同一 Partition"}),e.jsx("td",{className:"border border-border p-2",children:"日志聚合、事件溯源"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"RocketMQ"})}),e.jsx("td",{className:"border border-border p-2",children:"MessageQueueSelector 选择 Queue"}),e.jsx("td",{className:"border border-border p-2",children:"订单流转、证券交易"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"RabbitMQ"})}),e.jsx("td",{className:"border border-border p-2",children:"单队列 + 单消费者"}),e.jsx("td",{className:"border border-border p-2",children:"简单顺序场景"})]})]})]}),e.jsx("h2",{id:"dead-letter",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、死信队列"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"死信队列(Dead Letter Queue,DLQ)用于存储无法正常消费的消息,便于后续排查和处理。"}),e.jsx("h3",{id:"dlq-triggers",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"消息进入死信队列的条件"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"消费失败:"})," 消息被拒绝(reject/nack)且不重新入队"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"TTL 过期:"})," 消息在队列中存活时间超过 TTL"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"队列满:"})," 队列达到最大长度,新消息被丢弃到 DLQ"]})]}),e.jsx(t,{title:"死信队列工作流程",children:`graph LR
    P[生产者] -->|发送| Q[主队列]
    Q -->|消费失败| DLX[死信交换机]
    DLX -->|路由| DLQ[死信队列]
    DLQ -->|人工处理| Worker[运维人员]
    
    style DLQ fill:#ffebee
    style DLX fill:#fff3e0`}),e.jsx("h3",{id:"dlq-handling",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"死信消息处理策略"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"人工介入:"})," 查看死信消息内容,修复 Bug 后重新发送"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"自动重试:"})," 定时任务将死信消息重新投递到主队列(有限次数)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"告警通知:"})," 死信队列积压超过阈值时触发告警"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"日志记录:"})," 记录死信消息详情,便于问题追溯"]})]}),e.jsxs(r,{label:"各 MQ 的死信实现",children:["• ",e.jsx("strong",{children:"Kafka:"})," 无原生 DLQ,需自行实现(创建独立的 dead-letter-topic)",e.jsx("br",{}),"• ",e.jsx("strong",{children:"RocketMQ:"})," 内置死信队列(%DLQ% + ConsumerGroup)",e.jsx("br",{}),"• ",e.jsx("strong",{children:"RabbitMQ:"})," 通过 x-dead-letter-exchange 参数配置"]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、三大 MQ 对比"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Kafka、RocketMQ、RabbitMQ 各有优劣,选型需结合业务场景:"}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] mb-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"维度"}),e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"Kafka"}),e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"RocketMQ"}),e.jsx("th",{className:"border border-border p-2 text-left font-semibold",children:"RabbitMQ"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"开发语言"})}),e.jsx("td",{className:"border border-border p-2",children:"Scala/Java"}),e.jsx("td",{className:"border border-border p-2",children:"Java"}),e.jsx("td",{className:"border border-border p-2",children:"Erlang"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"吞吐量"})}),e.jsx("td",{className:"border border-border p-2 text-green-600 font-semibold",children:"极高(百万级 TPS)"}),e.jsx("td",{className:"border border-border p-2",children:"高(十万级 TPS)"}),e.jsx("td",{className:"border border-border p-2",children:"中等(万级 TPS)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"延迟"})}),e.jsx("td",{className:"border border-border p-2",children:"毫秒级"}),e.jsx("td",{className:"border border-border p-2",children:"毫秒级"}),e.jsx("td",{className:"border border-border p-2 text-green-600 font-semibold",children:"微秒级"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"事务消息"})}),e.jsx("td",{className:"border border-border p-2 text-red-600",children:"❌ 不支持"}),e.jsx("td",{className:"border border-border p-2 text-green-600 font-semibold",children:"✅ 原生支持"}),e.jsx("td",{className:"border border-border p-2 text-red-600",children:"❌ 不支持"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"顺序消息"})}),e.jsx("td",{className:"border border-border p-2 text-green-600 font-semibold",children:"✅ Partition 级别"}),e.jsx("td",{className:"border border-border p-2 text-green-600 font-semibold",children:"✅ Queue 级别"}),e.jsx("td",{className:"border border-border p-2",children:"⚠️ 单队列"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"延迟消息"})}),e.jsx("td",{className:"border border-border p-2 text-red-600",children:"❌ 不支持"}),e.jsx("td",{className:"border border-border p-2 text-green-600 font-semibold",children:"✅ 固定等级"}),e.jsx("td",{className:"border border-border p-2 text-green-600 font-semibold",children:"✅ TTL + DLX"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"消息回溯"})}),e.jsx("td",{className:"border border-border p-2 text-green-600 font-semibold",children:"✅ 按 Offset/时间"}),e.jsx("td",{className:"border border-border p-2 text-green-600 font-semibold",children:"✅ 按时间"}),e.jsx("td",{className:"border border-border p-2 text-red-600",children:"❌ 不支持"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"适用场景"})}),e.jsx("td",{className:"border border-border p-2",children:"大数据、日志聚合、流处理"}),e.jsx("td",{className:"border border-border p-2",children:"电商、金融、事务场景"}),e.jsx("td",{className:"border border-border p-2",children:"低延迟、复杂路由"})]})]})]}),e.jsxs(s,{type:"info",title:"选型建议",children:["• ",e.jsx("strong",{children:"大数据/日志场景:"})," 选 Kafka,吞吐量最高,生态完善",e.jsx("br",{}),"• ",e.jsx("strong",{children:"电商/金融场景:"})," 选 RocketMQ,事务消息、顺序消息能力强",e.jsx("br",{}),"• ",e.jsx("strong",{children:"低延迟/复杂路由:"})," 选 RabbitMQ,AMQP 协议灵活,延迟最低",e.jsx("br",{}),"• ",e.jsx("strong",{children:"云原生场景:"})," 考虑 Pulsar(新一代云原生 MQ)"]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、常见误区"}),e.jsx("h3",{id:"misconception-1",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"误区 1:消息队列保证消息不丢失"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{className:"text-red-600",children:"错误!"})," 消息队列本身不保证 100% 不丢失,需要正确配置生产者 ACK、Broker 持久化、消费者手动确认。默认配置下,消息仍可能丢失。"]}),e.jsx("h3",{id:"misconception-2",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"误区 2:消息队列能解决所有分布式事务问题"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{className:"text-red-600",children:"错误!"})," 消息队列只能实现最终一致性,无法替代强一致性事务。对于需要即时一致性的场景(如转账),仍需使用 2PC/TCC 等方案。"]}),e.jsx("h3",{id:"misconception-3",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"误区 3:Kafka 适合所有消息场景"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{className:"text-red-600",children:"错误!"})," Kafka 擅长高吞吐批量处理,但不适合低延迟、复杂路由、事务消息等场景。应根据业务需求选择合适的 MQ。"]}),e.jsx("h3",{id:"misconception-4",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"误区 4:消费者越多越好"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{className:"text-red-600",children:"错误!"})," 消费者数量不应超过 Partition/Queue 数量,否则多余的消费者会空闲。Kafka 中,一个 Partition 只能被 Consumer Group 中的一个消费者消费。"]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十二、面试真题"}),e.jsx(a,{questions:[{question:"如何保证消息不丢失?",answer:`从三个环节保证:

<strong>生产者端:</strong>
• Kafka: acks=all + retries + enable.idempotence=true
• RocketMQ: 同步发送 + 重试机制
• RabbitMQ: Confirm 模式 + 持久化

<strong>Broker 端:</strong>
• 消息持久化到磁盘
• 副本机制(Kafka ISR、RocketMQ 主从、RabbitMQ 镜像队列)
• 同步刷盘(安全但慢)

<strong>消费者端:</strong>
• 手动 ACK,业务处理成功后再确认
• 消费失败后重试或进入死信队列
• 实现幂等性,防止重复消费

<strong>监控补偿:</strong>
• 消息追踪(TraceId)
• 定期对账(比对生产与消费数量)
• 异常告警`},{question:"如何处理消息积压?",answer:`<strong>紧急处理:</strong>
1. 临时扩容消费者实例,提高消费速度
2. 检查消费者是否有性能瓶颈(慢 SQL、外部调用超时)
3. 如果是 Kafka,可以增加 Partition 数量(需重建 Topic)

<strong>根本解决:</strong>
1. 优化消费者逻辑,减少单次处理耗时
2. 增加消费者实例数,充分利用 Partition
3. 评估是否需要调整消息生产速率

<strong>预防措施:</strong>
1. 设置积压告警阈值
2. 定期压测,评估系统容量
3. 设计降级方案,高峰期丢弃非核心消息`},{question:"如何实现消息的顺序消费?",answer:`<strong>前提条件:</strong>
1. 相同业务 ID 的消息发送到同一 Partition/Queue
2. 一个 Partition 只能被一个消费者实例消费
3. 消费者单线程处理或加锁保证顺序

<strong>Kafka 实现:</strong>
// 生产者指定 key,保证同一订单发到同一 Partition
producer.send(new ProducerRecord<>("orders", orderId, message));

// 消费者单线程处理
@KafkaListener(topics = "orders", concurrency = "1")

<strong>RocketMQ 实现:</strong>
// 生产者使用 MessageQueueSelector
producer.send(msg, (mqs, msg, arg) -> {
    Long orderId = (Long) arg;
    int index = (int)(orderId % mqs.size());
    return mqs.get(index);
}, orderId);

// 消费者使用 MessageListenerOrderly
consumer.registerMessageListener((MessageListenerOrderly) msgs -> {
    // 顺序处理
});`},{question:"什么是消息幂等性?如何实现?",answer:`<strong>幂等性定义:</strong>
多次处理同一消息的结果与处理一次相同,不会产生副作用。

<strong>实现方案:</strong>
1. <strong>唯一索引:</strong> 数据库设置唯一键,重复插入报错(最可靠)
2. <strong>Redis 去重:</strong> setnx(messageId, 1, TTL),原子操作
3. <strong>状态机:</strong> 订单状态只能单向流转,重复消息不改变状态
4. <strong>Token 机制:</strong> 生产者生成唯一 Token,消费者校验

<strong>注意事项:</strong>
• 幂等性必须在消费者端实现
• 去重标记需要设置合理的 TTL
• 异常时需清理幂等标记,允许重试`},{question:"Kafka 为什么吞吐量这么高?",answer:`<strong>1. 顺序写磁盘:</strong>
利用磁盘顺序写性能接近内存写的特性(约 600MB/s)

<strong>2. 零拷贝:</strong>
sendfile 系统调用,数据直接从 Page Cache 传输到网卡,避免内核态与用户态拷贝

<strong>3. 页缓存:</strong>
利用 OS Page Cache,而非 JVM Heap,避免 GC 影响

<strong>4. 批量发送:</strong>
Producer 批量压缩发送(linger.ms + batch.size),减少网络往返

<strong>5. 分区并行:</strong>
Topic 分为多个 Partition,分布在不同 Broker,实现水平扩展

<strong>6. 稀疏索引:</strong>
不每条消息都建索引,而是每隔一段距离建立索引,节省空间`}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十三、知识关联"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"消息队列与以下知识点密切相关:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6",children:[e.jsxs("li",{children:[e.jsx("a",{href:"/docs/08-microservices/distributed-transaction",className:"text-accent hover:underline",children:"分布式事务"})," - 通过消息队列实现最终一致性"]}),e.jsxs("li",{children:[e.jsx("a",{href:"/docs/08-microservices/spring-cloud-core",className:"text-accent hover:underline",children:"Spring Cloud 核心组件"})," - 微服务间的异步通信"]}),e.jsxs("li",{children:[e.jsx("a",{href:"/docs/03-multithreading/multi-threading-basics",className:"text-accent hover:underline",children:"多线程基础"})," - 消费者并发处理"]}),e.jsxs("li",{children:[e.jsx("a",{href:"/docs/infra/messaging/kafka/kafka-architecture",className:"text-accent hover:underline",children:"Kafka 架构"})," - 深入理解 Kafka 原理"]}),e.jsxs("li",{children:[e.jsx("a",{href:"/docs/infra/messaging/rocketmq/rocketmq-architecture",className:"text-accent hover:underline",children:"RocketMQ 架构"})," - 企业级消息队列实践"]})]}),e.jsx(x,{...d(i.category,i.id)})]})}),e.jsx(o,{items:c})]})}export{k as default};
