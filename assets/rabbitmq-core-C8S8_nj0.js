import{j as e,g as r}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{I as l}from"./InteractiveFlow-GAP1pk49.js";import{S as x}from"./SideNote-BKvanovA.js";import{C as t,A as d,S as c}from"./ArticleNav-DhfiS38Y.js";import{D as n}from"./DiagramBlock-CLaKE9_7.js";import{I as o}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、RabbitMQ 核心定位",level:2},{id:"amqp-protocol",text:"二、AMQP 协议基础",level:2},{id:"core-components",text:"三、核心组件详解",level:2},{id:"virtual-host",text:"3.1 Virtual Host（虚拟主机）",level:3},{id:"exchange",text:"3.2 Exchange（交换机）",level:3},{id:"queue",text:"3.3 Queue（队列）",level:3},{id:"binding",text:"3.4 Binding（绑定）",level:3},{id:"routing-key",text:"3.5 Routing Key & Binding Key",level:3},{id:"message-flow",text:"四、消息流转流程",level:2},{id:"producer-flow",text:"4.1 Producer 发送流程",level:3},{id:"consumer-flow",text:"4.2 Consumer 消费流程",level:3},{id:"exchange-types",text:"五、Exchange 类型对比",level:2},{id:"direct-exchange",text:"5.1 Direct Exchange",level:3},{id:"fanout-exchange",text:"5.2 Fanout Exchange",level:3},{id:"topic-exchange",text:"5.3 Topic Exchange",level:3},{id:"headers-exchange",text:"5.4 Headers Exchange",level:3},{id:"comparison",text:"六、与其他 MQ 对比",level:2},{id:"misconceptions",text:"七、常见误区",level:2},{id:"interview",text:"八、面试真题",level:2},{id:"related",text:"九、知识关联",level:2}];function k({meta:i}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(a,{meta:i,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["RabbitMQ 是一个基于",e.jsx("strong",{className:"text-accent",children:"AMQP 协议"}),"的开源消息代理软件，采用",e.jsx("strong",{className:"text-accent",children:"Exchange-Queue-Binding"}),"架构模型，通过灵活的路由策略实现消息的发布-订阅和解耦，广泛应用于异步处理、流量削峰和系统解耦场景。"]})}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、RabbitMQ 核心定位"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["RabbitMQ 是用 Erlang 语言编写的消息中间件，实现了高级消息队列协议（AMQP 0.9.1）。它的核心设计理念是",e.jsx("strong",{children:"灵活的消息路由"}),"和",e.jsx("strong",{children:"可靠的消息传递"}),"。"]}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"消息解耦"}),"：生产者和消费者无需直接通信，通过 Broker 中转"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"异步处理"}),"：将耗时操作异步化，提升系统响应速度"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"流量削峰"}),"：缓冲突发流量，保护后端服务不被压垮"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"最终一致性"}),"：通过消息重试和补偿机制保证数据一致性"]})]}),e.jsx(t,{type:"info",title:"为什么选择 RabbitMQ？",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:["RabbitMQ 的优势在于",e.jsx("strong",{children:"丰富的路由模式"}),"（Direct、Fanout、Topic、Headers）、",e.jsx("strong",{children:"成熟的生态系统"}),"和",e.jsx("strong",{children:"多语言客户端支持"}),"。相比 Kafka 的高吞吐，RabbitMQ 更注重消息的灵活路由和低延迟，适合复杂的企业级消息场景。"]})}),e.jsx("h2",{id:"amqp-protocol",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、AMQP 协议基础"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"AMQP（Advanced Message Queuing Protocol）是一个开放标准的应用层协议，定义了消息中间件的通信规范。RabbitMQ 实现了 AMQP 0.9.1 版本。"}),e.jsx(n,{title:"AMQP 协议三层模型",children:`graph TB
              subgraph "Layer 3: Protocol"
                P["AMQP Protocol<br/>Commands, Methods"]
              end

              subgraph "Layer 2: Session"
                S["Session Layer<br/>Channels, Connections"]
              end

              subgraph "Layer 1: Transport"
                T["Transport Layer<br/>TCP/IP"]
              end

              P --> S
              S --> T`}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"AMQP 的核心概念包括："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Connection"}),"：TCP 连接，建立客户端与 Broker 的物理连接"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Channel"}),"：虚拟连接，复用 TCP 连接，减少资源消耗"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Exchange"}),"：接收生产者消息并根据路由规则转发到队列"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Queue"}),"：存储消息的缓冲区，消费者从中获取消息"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Binding"}),"：Exchange 和 Queue 之间的绑定关系"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Routing Key"}),"：消息的路由标识，决定消息流向哪个队列"]})]}),e.jsx(x,{label:"AMQP vs MQTT",children:e.jsx("p",{className:"text-[13px] sm:text-[14px] leading-[1.7]",children:"AMQP 面向企业级应用，强调可靠性和丰富功能；MQTT 面向 IoT 设备，强调轻量级和低带宽。RabbitMQ 通过插件也支持 MQTT、STOMP 等协议。"})}),e.jsx("h2",{id:"core-components",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、核心组件详解"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["RabbitMQ 的架构围绕五个核心组件展开：",e.jsx("strong",{children:"Virtual Host"}),"、",e.jsx("strong",{children:"Exchange"}),"、",e.jsx("strong",{children:"Queue"}),"、",e.jsx("strong",{children:"Binding"})," 和 ",e.jsx("strong",{children:"Routing Key"}),"。理解这些组件是掌握 RabbitMQ 的关键。"]}),e.jsx(n,{title:"RabbitMQ 核心架构",children:`graph LR
              P["Producer"] -->|"Publish<br/>(Routing Key)"| E["Exchange"]
              
              E -->|"Binding Key 1"| Q1["Queue 1"]
              E -->|"Binding Key 2"| Q2["Queue 2"]
              E -->|"Binding Key 3"| Q3["Queue 3"]
              
              Q1 --> C1["Consumer 1"]
              Q2 --> C2["Consumer 2"]
              Q3 --> C3["Consumer 3"]
              
              style E fill:#f9f,stroke:#333,stroke-width:3px
              style Q1 fill:#bbf,stroke:#333,stroke-width:2px
              style Q2 fill:#bbf,stroke:#333,stroke-width:2px
              style Q3 fill:#bbf,stroke:#333,stroke-width:2px`}),e.jsx("h3",{id:"virtual-host",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 Virtual Host（虚拟主机）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Virtual Host（vhost）是 RabbitMQ 中的",e.jsx("strong",{children:"逻辑隔离单元"}),"，类似于 MySQL 中的数据库。每个 vhost 拥有独立的 Exchange、Queue、Binding 和用户权限。"]}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"隔离性"}),"：不同 vhost 之间的资源完全隔离，互不可见"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"默认 vhost"}),"：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"/"}),"，RabbitMQ 启动时自动创建"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"使用场景"}),"：多租户环境、不同项目/环境隔离（dev/test/prod）"]})]}),e.jsx(s,{language:"bash",filename:"rabbitmqctl.sh",description:"Virtual Host 管理命令",code:`# 创建 Virtual Host
rabbitmqctl add_vhost /myapp

# 列出所有 Virtual Host
rabbitmqctl list_vhosts

# 删除 Virtual Host
rabbitmqctl delete_vhost /myapp

# 为用户授权访问指定 vhost
rabbitmqctl set_permissions -p /myapp user1 ".*" ".*" ".*"`}),e.jsx("h3",{id:"exchange",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 Exchange（交换机）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Exchange 是消息的",e.jsx("strong",{children:"第一站"}),"，生产者将消息发送到 Exchange，Exchange 根据路由规则将消息转发到一个或多个 Queue。Exchange 本身不存储消息。"]}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Exchange 的关键属性："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Name"}),"：交换机名称，唯一标识"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Type"}),"：交换机类型（direct、fanout、topic、headers）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Durable"}),"：是否持久化，Broker 重启后是否保留"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Auto-delete"}),"：最后一个绑定解除后是否自动删除"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Arguments"}),"：额外参数，如备用交换机（Alternate Exchange）"]})]}),e.jsx(t,{type:"warning",title:"Default Exchange",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:["RabbitMQ 自动创建一个名为空字符串（",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:'""'}),"）的 Direct Exchange，称为 Default Exchange。它会自动绑定到所有以相同名称命名的 Queue，Routing Key 即为 Queue 名称。这是最简单的消息发送方式。"]})}),e.jsx("h3",{id:"queue",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.3 Queue（队列）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Queue 是消息的",e.jsx("strong",{children:"存储容器"}),"，消费者从 Queue 中获取消息。Queue 可以绑定到多个 Exchange，一个 Exchange 也可以绑定到多个 Queue。"]}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Queue 的关键属性："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Name"}),"：队列名称，唯一标识"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Durable"}),"：是否持久化，Broker 重启后是否保留"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Exclusive"}),"：是否排他，仅创建者可用，连接关闭后自动删除"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Auto-delete"}),"：最后一个消费者断开后是否自动删除"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Arguments"}),"：额外参数，如 TTL、最大长度、死信队列等"]})]}),e.jsx(s,{language:"java",filename:"QueueDeclare.java",description:"Queue 声明示例",code:`// 声明持久化队列
channel.queueDeclare(
    "order.queue",      // 队列名称
    true,               // durable: 持久化
    false,              // exclusive: 非排他
    false,              // autoDelete: 不自动删除
    null                // arguments: 无额外参数
);

// 声明带 TTL 的队列
Map<String, Object> args = new HashMap<>();
args.put("x-message-ttl", 60000);  // 消息 TTL 60秒
args.put("x-max-length", 1000);     // 最大消息数 1000
args.put("x-dead-letter-exchange", "dlx.exchange");  // 死信交换机

channel.queueDeclare("delay.queue", true, false, false, args);`}),e.jsx("h3",{id:"binding",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.4 Binding（绑定）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Binding 是 Exchange 和 Queue 之间的",e.jsx("strong",{children:"关联关系"}),"，定义了消息如何从 Exchange 路由到 Queue。Binding 可以包含 Binding Key，用于路由匹配。"]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["一个 Queue 可以绑定到多个 Exchange，一个 Exchange 也可以绑定到多个 Queue，形成",e.jsx("strong",{children:"多对多"}),"的关系。"]}),e.jsx(s,{language:"java",filename:"QueueBind.java",description:"Binding 声明示例",code:`// 将队列绑定到交换机，指定 routing key
channel.queueBind(
    "order.queue",           // queue: 队列名称
    "order.exchange",        // exchange: 交换机名称
    "order.created"          // routingKey: 路由键
);

// Topic Exchange 支持通配符绑定
channel.queueBind(
    "notification.queue",
    "notification.exchange",
    "order.#"                // 匹配 order. 开头的所有 routing key
);`}),e.jsx("h3",{id:"routing-key",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.5 Routing Key & Binding Key"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"Routing Key"})," 是生产者发送消息时指定的路由标识，",e.jsx("strong",{children:"Binding Key"})," 是绑定时指定的匹配规则。Exchange 根据两者的匹配关系决定消息流向。"]}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Direct Exchange"}),"：Routing Key 必须与 Binding Key 完全匹配"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Fanout Exchange"}),"：忽略 Routing Key，广播到所有绑定队列"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Topic Exchange"}),"：支持通配符匹配（",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"*"})," 匹配一个单词，",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"#"})," 匹配零个或多个单词）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Headers Exchange"}),"：根据消息头属性匹配，忽略 Routing Key"]})]}),e.jsx("h2",{id:"message-flow",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、消息流转流程"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["理解消息从 Producer 到 Consumer 的完整流转过程，是掌握 RabbitMQ 的核心。整个流程分为",e.jsx("strong",{children:"发送阶段"}),"和",e.jsx("strong",{children:"消费阶段"}),"。"]}),e.jsx(l,{title:"RabbitMQ 消息流转全流程",steps:[{label:"Producer 发送消息",description:"Producer 建立 Connection 和 Channel，声明 Exchange，发送消息时指定 Exchange 名称和 Routing Key",icon:"📤"},{label:"Exchange 接收消息",description:"Exchange 接收消息后，根据类型和 Routing Key 查找匹配的 Binding，确定目标 Queue",icon:"🔄"},{label:"消息路由到 Queue",description:"消息被复制并存储到所有匹配的 Queue 中。如果找不到匹配的 Queue，消息会被丢弃或路由到备用交换机",icon:"📨"},{label:"Consumer 消费消息",description:"Consumer 从 Queue 拉取消息，处理后发送 ACK 确认。未 ACK 的消息会重新入队",icon:"✅"}]}),e.jsx(s,{language:"java",filename:"MessageFlow.java",description:"完整的消息发送和消费流程",code:`// Producer 发送
channel.basicPublish(
    "order.exchange",    // exchange
    "order.created",     // routing key
    null,                // props
    message.getBytes()   // body
);

// Consumer 消费（手动 ACK）
channel.basicConsume("order.queue", false, consumer);

// 处理消息后发送 ACK
channel.basicAck(deliveryTag, false);

// 处理失败发送 NACK（重新入队）
channel.basicNack(deliveryTag, false, true);`}),e.jsx("h3",{id:"producer-flow",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 Producer 发送流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Producer 发送消息的完整步骤："}),e.jsxs("ol",{className:"list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"建立连接"}),"：创建 Connection（TCP）和 Channel（虚拟连接）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"声明 Exchange"}),"：确保 Exchange 存在（幂等操作）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"发送消息"}),"：调用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"basicPublish"}),"，指定 Exchange、Routing Key 和消息体"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"确认机制"}),"：可选启用 Confirm 模式，等待 Broker 确认消息已接收"]})]}),e.jsx(t,{type:"tip",title:"Confirm 模式",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:["默认情况下，Producer 发送消息后不等待 Broker 确认。启用 Confirm 模式（",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"channel.confirmSelect()"}),"）后，Broker 会在消息持久化后发送 ACK，确保消息不丢失。"]})}),e.jsx("h3",{id:"consumer-flow",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.2 Consumer 消费流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Consumer 消费消息的两种模式："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Pull 模式"}),"：主动拉取消息（",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"basicGet"}),"），适用于低频消费"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Push 模式"}),"：被动接收消息（",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"basicConsume"}),"），Broker 主动推送，适用于高频消费"]})]}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"消费确认机制："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"自动 ACK"}),"：消息投递后立即确认，可能丢失消息"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"手动 ACK"}),"：业务处理完成后手动确认，保证消息不丢失"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"NACK"}),"：否定确认，可选择重新入队或丢弃"]})]}),e.jsx("h2",{id:"exchange-types",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、Exchange 类型对比"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"RabbitMQ 提供四种 Exchange 类型，每种类型有不同的路由策略。选择合适的 Exchange 类型是实现灵活消息路由的关键。"}),e.jsx("h3",{id:"direct-exchange",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.1 Direct Exchange"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"精确匹配"}),"：Routing Key 必须与 Binding Key 完全一致才能路由成功。适用于点对点消息传递。"]}),e.jsx(n,{title:"Direct Exchange 路由规则",children:`graph LR
              P["Producer<br/>Routing Key: error"] --> E["Direct Exchange"]
              
              E -->|"Binding Key: info"| Q1["Queue: info.log"]
              E -->|"Binding Key: error"| Q2["Queue: error.log"]
              E -->|"Binding Key: warning"| Q3["Queue: warning.log"]
              
              style Q2 fill:#9f9,stroke:#333,stroke-width:3px`}),e.jsx(s,{language:"java",filename:"DirectExchange.java",description:"Direct Exchange 示例",code:`// 声明 Direct Exchange
channel.exchangeDeclare("direct.exchange", BuiltinExchangeType.DIRECT, true);

// 绑定队列
channel.queueBind("error.queue", "direct.exchange", "error");
channel.queueBind("info.queue", "direct.exchange", "info");

// 发送消息
channel.basicPublish("direct.exchange", "error", null, message.getBytes());
// 只有 error.queue 会收到消息`}),e.jsx("h3",{id:"fanout-exchange",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.2 Fanout Exchange"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"广播模式"}),"：忽略 Routing Key，将消息复制到所有绑定的 Queue。适用于发布-订阅场景。"]}),e.jsx(n,{title:"Fanout Exchange 广播",children:`graph LR
              P["Producer<br/>Routing Key: ignored"] --> E["Fanout Exchange"]
              
              E --> Q1["Queue: email.service"]
              E --> Q2["Queue: sms.service"]
              E --> Q3["Queue: push.service"]
              
              style E fill:#ff9,stroke:#333,stroke-width:3px`}),e.jsx(s,{language:"java",filename:"FanoutExchange.java",description:"Fanout Exchange 示例",code:`// 声明 Fanout Exchange
channel.exchangeDeclare("fanout.exchange", BuiltinExchangeType.FANOUT, true);

// 绑定队列（Routing Key 被忽略）
channel.queueBind("email.queue", "fanout.exchange", "");
channel.queueBind("sms.queue", "fanout.exchange", "");

// 发送消息（Routing Key 任意）
channel.basicPublish("fanout.exchange", "", null, message.getBytes());
// 所有绑定的队列都会收到消息`}),e.jsx("h3",{id:"topic-exchange",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.3 Topic Exchange"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"通配符匹配"}),"：支持模式匹配，",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"*"})," 匹配一个单词，",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"#"})," 匹配零个或多个单词。最灵活的 Exchange 类型。"]}),e.jsx(n,{title:"Topic Exchange 通配符匹配",children:`graph LR
              P["Producer<br/>Routing Key: order.created"] --> E["Topic Exchange"]
              
              E -->|"Binding Key: order.*"| Q1["Queue: order.processor"]
              E -->|"Binding Key: order.#"| Q2["Queue: order.logger"]
              E -->|"Binding Key: *.created"| Q3["Queue: creation.notifier"]
              
              style Q1 fill:#9cf,stroke:#333,stroke-width:2px
              style Q2 fill:#9cf,stroke:#333,stroke-width:2px
              style Q3 fill:#9cf,stroke:#333,stroke-width:2px`}),e.jsx(t,{type:"info",title:"通配符规则",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"*"}),"（星号）匹配恰好一个单词，",e.jsx("strong",{children:"#"}),"（井号）匹配零个或多个单词。单词之间用点号分隔。",e.jsx("br",{}),"示例：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"order.*"})," 匹配 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"order.created"}),"，但不匹配 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"order.created.success"}),"；",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"order.#"})," 匹配所有以 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"order."})," 开头的 Routing Key。"]})}),e.jsx("h3",{id:"headers-exchange",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.4 Headers Exchange"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"头部匹配"}),"：根据消息头属性（headers）进行匹配，忽略 Routing Key。支持全匹配（",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"x-match=all"}),"）或任意匹配（",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"x-match=any"}),"）。"]}),e.jsx(s,{language:"java",filename:"HeadersExchange.java",description:"Headers Exchange 示例",code:`// 声明 Headers Exchange
channel.exchangeDeclare("headers.exchange", BuiltinExchangeType.HEADERS, true);

// 绑定队列，指定匹配规则
Map<String, Object> headers = new HashMap<>();
headers.put("x-match", "all");  // 所有 header 都要匹配
headers.put("format", "json");
headers.put("priority", "high");

channel.queueBind("priority.queue", "headers.exchange", "", headers);

// 发送消息，设置 headers
AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
    .headers(Map.of("format", "json", "priority", "high"))
    .build();
channel.basicPublish("headers.exchange", "", props, message.getBytes());`}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、与其他 MQ 对比"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"选择合适的消息中间件需要根据业务场景权衡。以下是 RabbitMQ 与 Kafka、RocketMQ 的对比："}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] mb-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-surface-raised border-b-2 border-border",children:[e.jsx("th",{className:"text-left p-2 sm:p-3 font-semibold text-ink",children:"维度"}),e.jsx("th",{className:"text-left p-2 sm:p-3 font-semibold text-ink",children:"RabbitMQ"}),e.jsx("th",{className:"text-left p-2 sm:p-3 font-semibold text-ink",children:"Kafka"}),e.jsx("th",{className:"text-left p-2 sm:p-3 font-semibold text-ink",children:"RocketMQ"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"p-2 sm:p-3 font-medium text-ink",children:"开发语言"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"Erlang"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"Scala/Java"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"Java"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-2 sm:p-3 font-medium text-ink",children:"吞吐量"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"万级 TPS"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"百万级 TPS"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"十万级 TPS"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-2 sm:p-3 font-medium text-ink",children:"延迟"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"微秒级"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"毫秒级"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"毫秒级"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-2 sm:p-3 font-medium text-ink",children:"路由能力"}),e.jsxs("td",{className:"p-2 sm:p-3 text-ink-muted",children:[e.jsx("strong",{children:"最强"}),"（4种 Exchange）"]}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"弱（仅 Topic）"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"中等（Tag 过滤）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-2 sm:p-3 font-medium text-ink",children:"消息可靠性"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"高（ACK + 持久化）"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"高（副本 + ISR）"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"高（事务消息）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-2 sm:p-3 font-medium text-ink",children:"适用场景"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"复杂路由、低延迟"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"日志收集、流处理"}),e.jsx("td",{className:"p-2 sm:p-3 text-ink-muted",children:"金融交易、顺序消息"})]})]})]}),e.jsxs(t,{type:"info",title:"场景选择建议",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] mb-3",children:[e.jsx("strong",{children:"电商订单系统"}),"：需要灵活路由订单消息到不同处理服务（库存、支付、物流）"]}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] mb-2",children:"✅ 推荐 RabbitMQ（Topic Exchange 实现灵活路由）"}),e.jsx("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted",children:"订单创建、支付、发货等事件需要路由到不同的下游服务，RabbitMQ 的 Topic Exchange 可以通过通配符实现精细化的路由控制。"}),e.jsxs("div",{className:"mt-4 pt-4 border-t border-border-light",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] mb-3",children:[e.jsx("strong",{children:"用户行为日志收集"}),"：海量用户点击、浏览日志需要高吞吐写入"]}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] mb-2",children:"❌ 不推荐 RabbitMQ，推荐 Kafka"}),e.jsx("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted",children:"日志场景吞吐量要求极高（百万级 TPS），Kafka 的顺序写磁盘和零拷贝技术更适合此场景。RabbitMQ 的吞吐量相对较低。"})]})]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、常见误区"}),e.jsxs("div",{className:"space-y-4 mb-6",children:[e.jsx(t,{type:"danger",title:"误区 1：Exchange 会存储消息",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"错误认知"}),"：认为 Exchange 像 Queue 一样会存储消息。",e.jsx("br",{}),e.jsx("strong",{children:"正确理解"}),"：Exchange 只是路由器，不存储消息。消息到达 Exchange 后会立即路由到匹配的 Queue，如果没有匹配的 Queue，消息会被丢弃（除非配置了备用交换机）。"]})}),e.jsx(t,{type:"danger",title:"误区 2：Fanout Exchange 不需要 Binding Key",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"错误认知"}),"：认为 Fanout Exchange 绑定时可以不传 Binding Key。",e.jsx("br",{}),e.jsx("strong",{children:"正确理解"}),"：虽然 Fanout Exchange 忽略 Routing Key，但绑定时仍需传入 Binding Key 参数（通常为空字符串 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:'""'}),"），这是 API 要求。"]})}),e.jsx(t,{type:"danger",title:"误区 3：消息持久化 = 不丢失",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"错误认知"}),"：认为设置了队列和消息持久化就绝对不会丢失消息。",e.jsx("br",{}),e.jsx("strong",{children:"正确理解"}),"：持久化只能防止 Broker 重启导致的数据丢失。如果消息还在内存中未刷盘时 Broker 宕机，仍可能丢失。需要配合 Confirm 机制和镜像队列才能保证高可靠。"]})}),e.jsx(t,{type:"danger",title:"误区 4：一个 Queue 只能被一个 Consumer 消费",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"错误认知"}),"：认为一个 Queue 只能有一个消费者。",e.jsx("br",{}),e.jsx("strong",{children:"正确理解"}),"：一个 Queue 可以有多个消费者，形成消费组。RabbitMQ 会以轮询方式将消息分发给不同的消费者，实现负载均衡。但如果需要广播，应该使用 Fanout Exchange + 多个 Queue。"]})})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、面试真题"}),e.jsx(o,{questions:[{question:"RabbitMQ 如何保证消息不丢失？",answer:`从三个层面保证：
1. **Producer 端**：启用 Confirm 模式，等待 Broker 确认
2. **Broker 端**：Exchange 和 Queue 都设置为持久化，消息也设置为持久化
3. **Consumer 端**：使用手动 ACK，业务处理完成后再确认

此外，还可以使用镜像队列（Mirror Queue）实现高可用，防止单点故障。`},{question:"Direct Exchange 和 Topic Exchange 的区别？",answer:"**Direct Exchange**：Routing Key 必须与 Binding Key 完全匹配，适用于精确路由。\n\n**Topic Exchange**：支持通配符匹配，* 匹配一个单词，# 匹配零个或多个单词，适用于模糊路由和模式匹配。\n\n示例：Routing Key 为 `order.created`，Direct 需要 Binding Key 也是 `order.created` 才能匹配；Topic 可以使用 `order.*` 或 `#.created` 进行匹配。"},{question:"什么是死信队列？如何使用？",answer:`死信队列（Dead Letter Queue，DLQ）用于存储无法被正常消费的消息，包括：
1. 消息被拒绝（basicReject/basicNack）且不重新入队
2. 消息过期（TTL）
3. 队列达到最大长度

使用方式：
\`\`\`java
// 声明死信交换机和队列
channel.exchangeDeclare("dlx.exchange", BuiltinExchangeType.DIRECT, true);
channel.queueDeclare("dlq.queue", true, false, false, null);
channel.queueBind("dlq.queue", "dlx.exchange", "dead.letter");

// 声明主队列，指定死信交换机
Map<String, Object> args = new HashMap<>();
args.put("x-dead-letter-exchange", "dlx.exchange");
args.put("x-dead-letter-routing-key", "dead.letter");
channel.queueDeclare("main.queue", true, false, false, args);
\`\`\``},{question:"RabbitMQ 如何实现延迟队列？",answer:`RabbitMQ 本身不支持延迟队列，可以通过两种方式实现：

1. **TTL + 死信队列**：
   - 设置消息或队列的 TTL（Time-To-Live）
   - 消息过期后进入死信队列
   - 消费者从死信队列消费，实现延迟效果

2. **rabbitmq-delayed-message-exchange 插件**：
   - 安装官方延迟消息插件
   - 声明 x-delayed-message 类型的 Exchange
   - 发送消息时设置 x-delay 头部指定延迟时间

推荐使用插件方式，更简洁高效。`},{question:"RabbitMQ 集群模式下，消息是如何分布的？",answer:`RabbitMQ 集群有两种模式：

1. **普通集群**：
   - Queue 的元数据在所有节点同步
   - 但消息只存储在创建该 Queue 的节点上
   - 其他节点访问时需要从主节点拉取消息
   - 存在单点故障风险

2. **镜像队列（HaPolicy）**：
   - Queue 的消息会在多个节点间同步
   - 主节点负责读写，镜像节点只负责同步
   - 主节点故障时，镜像节点晋升为主节点
   - 提供高可用性，但会增加网络开销

生产环境推荐使用镜像队列模式。`}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6",children:[e.jsxs("a",{href:"/docs/rabbitmq/rabbitmq-routing",className:"block p-4 bg-surface-raised hover:bg-surface-hover rounded-paper-md transition-colors border border-border-light",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"→ RabbitMQ 路由模式"}),e.jsx("p",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:"深入学习 Direct、Fanout、Topic、Headers 四种路由模式的实战应用"})]}),e.jsxs("a",{href:"/docs/rabbitmq/rabbitmq-reliability",className:"block p-4 bg-surface-raised hover:bg-surface-hover rounded-paper-md transition-colors border border-border-light",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"→ RabbitMQ 消息可靠性"}),e.jsx("p",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:"掌握持久化、ACK 机制、镜像队列等可靠性保障方案"})]}),e.jsxs("a",{href:"/docs/kafka/kafka-architecture",className:"block p-4 bg-surface-raised hover:bg-surface-hover rounded-paper-md transition-colors border border-border-light",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"→ Kafka 架构与核心概念"}),e.jsx("p",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:"对比学习 Kafka 的高吞吐架构设计"})]}),e.jsxs("a",{href:"/docs/rocketmq/rocketmq-architecture",className:"block p-4 bg-surface-raised hover:bg-surface-hover rounded-paper-md transition-colors border border-border-light",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"→ RocketMQ 架构设计"}),e.jsx("p",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:"了解 RocketMQ 的事务消息和顺序消息特性"})]})]}),e.jsx(d,{...r(i.category,i.id)})]})}),e.jsx(c,{items:m})]})}export{k as default};
