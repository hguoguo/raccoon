import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{I as d}from"./InteractiveFlow-GAP1pk49.js";import{S as r}from"./SideNote-BKvanovA.js";import{C as c}from"./ContextSwitcher-Cjd-h5IL.js";import{C as t,A as x,S as m}from"./ArticleNav-DhfiS38Y.js";import{D as i}from"./DiagramBlock-CLaKE9_7.js";import{I as o}from"./InterviewSection-BBNdwyyN.js";const h=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、消息可靠性挑战",level:2},{id:"producer-reliability",text:"二、生产者可靠性保证",level:2},{id:"confirm-mode",text:"2.1 Confirm 确认模式",level:3},{id:"transaction-mode",text:"2.2 事务模式",level:3},{id:"broker-reliability",text:"三、Broker 可靠性保证",level:2},{id:"persistence",text:"3.1 消息持久化",level:3},{id:"mirror-queue",text:"3.2 镜像队列",level:3},{id:"consumer-reliability",text:"四、消费者可靠性保证",level:2},{id:"ack-mechanism",text:"4.1 ACK 确认机制",level:3},{id:"retry-dead-letter",text:"4.2 重试与死信队列",level:3},{id:"reliability-patterns",text:"五、端到端可靠性方案",level:2},{id:"comparison",text:"六、可靠性方案对比",level:2},{id:"misconceptions",text:"七、常见误区",level:2},{id:"interview",text:"八、面试真题",level:2},{id:"related",text:"九、知识关联",level:2}];function v({meta:l}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(a,{meta:l,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["RabbitMQ 消息可靠性通过",e.jsx("strong",{className:"text-accent",children:"生产者 Confirm 确认、Broker 持久化与镜像队列、消费者 ACK 机制"}),"三层保障，确保消息从发送到消费的完整链路中不丢失、不重复，实现",e.jsx("strong",{className:"text-accent",children:"至少一次（At-Least-Once）"}),"或",e.jsx("strong",{className:"text-accent",children:"精确一次（Exactly-Once）"}),"的语义保证。"]})}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、消息可靠性挑战"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"在分布式消息系统中，消息可能在以下环节丢失："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"生产者发送失败"}),"：网络异常、Broker 宕机导致消息未到达"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Broker 存储丢失"}),"：节点故障、磁盘损坏导致已接收的消息丢失"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"消费者处理失败"}),"：消费异常、ACK 丢失导致消息未被正确处理"]})]}),e.jsx(i,{title:"消息丢失场景分析",children:`graph LR
              P["Producer"] -->|"① 发送失败"| N["Network"]
              N -->|"② 到达 Broker"| B["Broker"]
              B -->|"③ 存储失败"| D["Disk"]
              B -->|"④ 推送 Consumer"| C["Consumer"]
              C -->|"⑤ 处理失败"| E["Error"]
              
              style P fill:#e1f5ff
              style B fill:#fff4e6
              style C fill:#f0e6ff
              style D fill:#ffe6e6
              style E fill:#ffe6e6`}),e.jsx(t,{type:"warning",title:"可靠性 vs 性能权衡",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:["消息可靠性越强，性能开销越大。持久化、Confirm 确认、镜像队列都会增加延迟和降低吞吐。需要根据业务场景选择合适的可靠性级别：",e.jsx("strong",{children:"金融交易需要 Exactly-Once，日志收集可以接受 At-Most-Once"}),"。"]})}),e.jsx("h2",{id:"producer-reliability",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、生产者可靠性保证"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["RabbitMQ 提供两种机制确保生产者消息可靠送达 Broker：",e.jsx("strong",{children:"Confirm 确认模式"}),"和",e.jsx("strong",{children:"事务模式"}),"。"]}),e.jsx("h3",{id:"confirm-mode",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.1 Confirm 确认模式"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Confirm 模式是 RabbitMQ 推荐的轻量级可靠性方案。生产者发送消息后，Broker 会异步返回 ack（成功）或 nack（失败）确认。"}),e.jsx(r,{label:"Confirm 模式特点",children:e.jsxs("ul",{className:"space-y-2 text-[13px] leading-[1.7]",children:[e.jsx("li",{children:"✅ 异步非阻塞,性能高"}),e.jsx("li",{children:"✅ 支持批量确认"}),e.jsx("li",{children:"⚠️ 需要客户端维护未确认消息列表"}),e.jsx("li",{children:"⚠️ 不保证精确一次(可能重复)"})]})}),e.jsx(s,{code:`// 启用 Confirm 模式
channel.confirmSelect();

// 发送消息
String message = "Hello RabbitMQ";
channel.basicPublish("exchange", "routingKey", 
    MessageProperties.PERSISTENT_TEXT_PLAIN,
    message.getBytes());

// 等待确认(同步方式,生产环境建议异步)
if (channel.waitForConfirms()) {
    System.out.println("消息发送成功");
} else {
    System.out.println("消息发送失败,需要重试");
}

// 异步 Confirm 监听器(推荐)
channel.addConfirmListener(new ConfirmListener() {
    @Override
    public void handleAck(long deliveryTag, boolean multiple) {
        System.out.println("消息确认成功: " + deliveryTag);
        // 从未确认列表中移除
    }

    @Override
    public void handleNack(long deliveryTag, boolean multiple) {
        System.out.println("消息确认失败: " + deliveryTag);
        // 重发消息或记录日志
    }
});`,language:"java",description:"Java - Confirm 模式示例"}),e.jsx(t,{type:"info",title:"Confirm 模式工作流程",children:e.jsxs("ol",{className:"list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsxs("li",{children:["生产者调用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"channel.confirmSelect()"})," 启用 Confirm 模式"]}),e.jsxs("li",{children:["每条消息分配唯一的 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"deliveryTag"}),"（从 1 开始递增）"]}),e.jsx("li",{children:"Broker 持久化消息后，返回 ack/nack 确认"}),e.jsx("li",{children:"生产者根据确认结果决定是否需要重发"})]})}),e.jsx("h3",{id:"transaction-mode",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.2 事务模式"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"事务模式提供强一致性保证，但性能较差（比 Confirm 模式慢 10 倍以上），适用于对可靠性要求极高的场景。"}),e.jsx(s,{code:`try {
    // 开启事务
    channel.txSelect();
    
    // 发送消息
    channel.basicPublish("exchange", "routingKey", 
        MessageProperties.PERSISTENT_TEXT_PLAIN,
        "重要消息".getBytes());
    
    // 提交事务
    channel.txCommit();
    System.out.println("消息发送成功");
    
} catch (Exception e) {
    // 回滚事务
    channel.txRollback();
    System.out.println("消息发送失败,已回滚");
    // 重试逻辑
}`,language:"java",description:"Java - 事务模式示例"}),e.jsx(t,{type:"warning",title:"事务模式性能问题",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:["事务模式是同步阻塞的，每条消息都需要等待 Broker 返回确认才能继续发送下一条。在高吞吐场景下会导致严重的性能瓶颈，",e.jsx("strong",{children:"推荐使用 Confirm 模式替代"}),"。"]})}),e.jsx("h2",{id:"broker-reliability",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、Broker 可靠性保证"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Broker 层面的可靠性主要通过",e.jsx("strong",{children:"消息持久化"}),"和",e.jsx("strong",{children:"镜像队列"}),"实现，防止节点故障导致消息丢失。"]}),e.jsx("h3",{id:"persistence",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 消息持久化"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"消息持久化需要将 Exchange、Queue、Message 三者都设置为持久化，缺一不可。"}),e.jsx(i,{title:"消息持久化三要素",children:`graph TB
              subgraph "持久化三要素"
                E["Exchange 持久化<br/>durable=true"]
                Q["Queue 持久化<br/>durable=true"]
                M["Message 持久化<br/>deliveryMode=2"]
              end
              
              E -->|"绑定"| Q
              Q -->|"存储"| M
              M -->|"写入磁盘"| D[("Disk")]
              
              style E fill:#e1f5ff
              style Q fill:#e1f5ff
              style M fill:#fff4e6
              style D fill:#d4edda`}),e.jsx(s,{code:`// 1. 声明持久化 Exchange
channel.exchangeDeclare("myExchange", "direct", true); // durable=true

// 2. 声明持久化 Queue
Map<String, Object> args = new HashMap<>();
channel.queueDeclare("myQueue", true, false, false, args); // durable=true

// 3. 绑定 Exchange 和 Queue
channel.queueBind("myQueue", "myExchange", "routingKey");

// 4. 发送持久化消息
AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
    .deliveryMode(2) // 2=持久化, 1=非持久化
    .contentType("text/plain")
    .build();
    
channel.basicPublish("myExchange", "routingKey", props, 
    "持久化消息".getBytes());`,language:"java",description:"Java - 持久化配置示例"}),e.jsxs(r,{label:"持久化性能影响",children:[e.jsx("p",{className:"text-[13px] leading-[1.7] mb-2",children:"持久化会将消息写入磁盘,增加 I/O 开销。RabbitMQ 采用以下优化策略:"}),e.jsxs("ul",{className:"space-y-1 text-[13px] leading-[1.7]",children:[e.jsx("li",{children:"• 批量写入磁盘(减少 I/O 次数)"}),e.jsx("li",{children:"• 延迟刷盘(积累一定量后再写入)"}),e.jsx("li",{children:"• 使用 Page Cache 缓存热点数据"})]})]}),e.jsx("h3",{id:"mirror-queue",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 镜像队列"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"镜像队列（Mirror Queue）将队列复制到集群中的多个节点，当主节点故障时，从节点自动接管，实现高可用。"}),e.jsx(i,{title:"镜像队列架构",children:`graph TB
              subgraph "RabbitMQ Cluster"
                subgraph "Node 1 (Master)"
                  Q1["Queue (Master)"]
                end
                
                subgraph "Node 2 (Slave)"
                  Q2["Queue (Mirror)"]
                end
                
                subgraph "Node 3 (Slave)"
                  Q3["Queue (Mirror)"]
                end
              end
              
              P["Producer"] --> Q1
              Q1 -->|"同步"| Q2
              Q1 -->|"同步"| Q3
              Q1 --> C["Consumer"]
              
              style Q1 fill:#d4edda
              style Q2 fill:#fff4e6
              style Q3 fill:#fff4e6`}),e.jsx(s,{code:`// 通过策略配置镜像队列(推荐)
Map<String, Object> policy = new HashMap<>();
policy.put("ha-mode", "all"); // all: 所有节点, exactly: 指定数量, nodes: 指定节点
policy.put("ha-sync-mode", "automatic"); // automatic: 自动同步, manual: 手动同步

channel.exchangeDeclare("ha-exchange", "direct", true);
channel.queueDeclare("ha-queue", true, false, false, null);
channel.queueBind("ha-queue", "ha-exchange", "routingKey");

// 应用策略
Map<String, Object> arguments = new HashMap<>();
arguments.put("x-ha-policy", "all");
channel.queueDeclare("ha-queue-v2", true, false, false, arguments);`,language:"java",description:"Java - 配置镜像队列"}),e.jsx(t,{type:"info",title:"镜像队列注意事项",children:e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("li",{children:"镜像队列会增加网络带宽和存储开销（每个副本都保存完整消息）"}),e.jsxs("li",{children:["同步模式选择：",e.jsx("strong",{children:"automatic"})," 适合新队列，",e.jsx("strong",{children:"manual"})," 适合已有大量消息的队列"]}),e.jsxs("li",{children:["RabbitMQ 3.8+ 推荐使用 ",e.jsx("strong",{children:"Quorum Queues"}),"（基于 Raft 共识算法）替代镜像队列"]})]})}),e.jsx("h2",{id:"consumer-reliability",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、消费者可靠性保证"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["消费者可靠性通过 ",e.jsx("strong",{children:"ACK 确认机制"}),"和",e.jsx("strong",{children:"重试/死信队列"}),"保证消息被正确处理。"]}),e.jsx("h3",{id:"ack-mechanism",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 ACK 确认机制"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["RabbitMQ 支持自动 ACK 和手动 ACK 两种模式。",e.jsx("strong",{children:"生产环境必须使用手动 ACK"}),"，确保消息处理成功后才确认。"]}),e.jsx(s,{code:`// 禁用自动 ACK(autoAck=false)
channel.basicConsume("myQueue", false, new DefaultConsumer(channel) {
    @Override
    public void handleDelivery(String consumerTag, Envelope envelope, 
                                AMQP.BasicProperties properties, byte[] body) {
        try {
            String message = new String(body, "UTF-8");
            System.out.println("收到消息: " + message);
            
            // 处理业务逻辑
            processMessage(message);
            
            // 处理成功,发送 ACK
            channel.basicAck(envelope.getDeliveryTag(), false);
            System.out.println("消息处理成功,已确认");
            
        } catch (Exception e) {
            System.err.println("消息处理失败: " + e.getMessage());
            
            // 处理失败,拒绝消息并重新入队
            // requeue=true: 重新入队, false: 进入死信队列
            channel.basicNack(envelope.getDeliveryTag(), false, true);
        }
    }
});`,language:"java",description:"Java - 手动 ACK 示例"}),e.jsx(c,{simpleContent:e.jsxs("div",{className:"p-4 bg-parchment-light rounded-paper-md",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"自动 ACK"}),e.jsx("pre",{className:"text-[13px] text-ink-muted leading-[1.7] overflow-x-auto",children:`// autoAck=true(不推荐)
channel.basicConsume("queue", true, consumer);

优点:简单,无需手动确认
缺点:消息一旦投递立即删除,处理失败无法恢复
适用场景:对可靠性要求低的场景(如日志收集)`})]}),hardcoreContent:e.jsxs("div",{className:"p-4 bg-parchment-light rounded-paper-md",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"手动 ACK"}),e.jsx("pre",{className:"text-[13px] text-ink-muted leading-[1.7] overflow-x-auto",children:`// autoAck=false(推荐)
channel.basicConsume("queue", false, consumer);
// 处理成功后手动确认
channel.basicAck(deliveryTag, false);

优点:确保消息处理成功后才删除
缺点:需要手动管理 ACK,忘记 ACK 会导致消息堆积
适用场景:金融交易、订单处理等关键业务`})]})}),e.jsx(t,{type:"warning",title:"忘记 ACK 的后果",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:["如果消费者忘记发送 ACK，消息会一直处于 ",e.jsx("strong",{children:"Unacked"})," 状态，不会被重新投递，也不会被删除，导致消息堆积。可以使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"basicReject"})," 或 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"basicNack"})," 明确拒绝消息。"]})}),e.jsx("h3",{id:"retry-dead-letter",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.2 重试与死信队列"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["当消息处理失败时，可以通过",e.jsx("strong",{children:"重试机制"}),"重新处理，超过重试次数后转入",e.jsx("strong",{children:"死信队列（DLQ）"}),"进行人工干预。"]}),e.jsx(i,{title:"死信队列流程",children:`graph LR
              MQ["主队列"] -->|"处理失败"| R["重试计数器"]
              R -->|"未超限"| MQ
              R -->|"超限"| DLX["死信交换机"]
              DLX --> DLQ["死信队列"]
              DLQ --> Alert["告警/人工处理"]
              
              style MQ fill:#e1f5ff
              style DLX fill:#fff4e6
              style DLQ fill:#ffe6e6
              style Alert fill:#ffe6e6`}),e.jsx(s,{code:`// 1. 声明死信交换机和死信队列
channel.exchangeDeclare("dlx.exchange", "direct", true);
channel.queueDeclare("dlq.queue", true, false, false, null);
channel.queueBind("dlq.queue", "dlx.exchange", "dl.routingKey");

// 2. 声明主队列,配置死信参数
Map<String, Object> args = new HashMap<>();
args.put("x-dead-letter-exchange", "dlx.exchange"); // 死信交换机
args.put("x-dead-letter-routing-key", "dl.routingKey"); // 死信路由键
args.put("x-message-ttl", 60000); // 消息 TTL(可选)
args.put("x-max-length", 10000); // 队列最大长度(可选)

channel.exchangeDeclare("main.exchange", "direct", true);
channel.queueDeclare("main.queue", true, false, false, args);
channel.queueBind("main.queue", "main.exchange", "routingKey");

// 3. 消费失败时拒绝消息,进入死信队列
channel.basicNack(deliveryTag, false, false); // requeue=false`,language:"java",description:"Java - 配置死信队列"}),e.jsx("h2",{id:"reliability-patterns",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、端到端可靠性方案"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["完整的消息可靠性需要",e.jsx("strong",{children:"生产者 + Broker + 消费者"}),"三层协同，结合",e.jsx("strong",{children:"幂等性"}),"和",e.jsx("strong",{children:"事务补偿"}),"实现最终一致性。"]}),e.jsx(d,{title:"端到端可靠性保障流程",steps:[{label:"生产者发送",description:`启用 Confirm 模式,发送持久化消息
• channel.confirmSelect()
• deliveryMode=2
• 维护未确认消息列表`,icon:"📤"},{label:"Broker 存储",description:`持久化到磁盘,同步到镜像节点
• Exchange/Queue/Message 持久化
• 镜像队列同步
• 返回 ack 确认`,icon:"💾"},{label:"消费者处理",description:`手动 ACK,失败重试或进入死信队列
• autoAck=false
• 处理成功 basicAck
• 处理失败 basicNack
• 超限进入 DLQ`,icon:"✅"},{label:"幂等性保证",description:`消费者实现幂等处理,防止重复消费
• 唯一消息 ID
• 数据库唯一索引
• Redis 去重
• 状态机控制`,icon:"🔄"}]}),e.jsxs(t,{type:"info",title:"精确一次（Exactly-Once）实现方案",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] mb-3",children:["RabbitMQ 本身只提供",e.jsx("strong",{children:"至少一次（At-Least-Once）"}),"语义，要实现精确一次需要结合以下方案："]}),e.jsxs("ol",{className:"list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"生产者幂等"}),"：使用唯一消息 ID，Broker 去重（需插件支持）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"消费者幂等"}),"：基于业务主键或消息 ID 去重"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"事务补偿"}),"：记录消息处理状态，失败时回滚或重试"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"本地消息表"}),"：将消息发送与业务操作放在同一事务中"]})]})]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、可靠性方案对比"}),e.jsxs("table",{className:"w-full border-collapse text-[13px] sm:text-[14px] mb-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment border-b-2 border-border",children:[e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"方案"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"可靠性"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"性能影响"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"适用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{className:"border-b border-border-light hover:bg-parchment-deep/30",children:[e.jsx("td",{className:"p-3 font-medium text-ink",children:"Confirm 模式"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"高"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"低（异步）"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"通用场景（推荐）"})]}),e.jsxs("tr",{className:"border-b border-border-light hover:bg-parchment-deep/30",children:[e.jsx("td",{className:"p-3 font-medium text-ink",children:"事务模式"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"最高"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"极高（同步阻塞）"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"金融交易等极端场景"})]}),e.jsxs("tr",{className:"border-b border-border-light hover:bg-parchment-deep/30",children:[e.jsx("td",{className:"p-3 font-medium text-ink",children:"消息持久化"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"高"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"中（磁盘 I/O）"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"关键业务消息"})]}),e.jsxs("tr",{className:"border-b border-border-light hover:bg-parchment-deep/30",children:[e.jsx("td",{className:"p-3 font-medium text-ink",children:"镜像队列"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"最高"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"高（网络+存储）"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"高可用要求场景"})]}),e.jsxs("tr",{className:"border-b border-border-light hover:bg-parchment-deep/30",children:[e.jsx("td",{className:"p-3 font-medium text-ink",children:"手动 ACK"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"高"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"无"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"所有生产环境"})]})]})]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、常见误区"}),e.jsx(t,{type:"danger",title:"误区 1：只设置消息持久化就够了",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"错误认知"}),"：只要设置 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"deliveryMode=2"})," 就能保证消息不丢失。",e.jsx("br",{}),e.jsx("strong",{children:"正确做法"}),"：必须同时设置 Exchange、Queue、Message 三者都持久化，缺一不可。如果 Queue 不是持久化的，Broker 重启后 Queue 会消失，消息也会丢失。"]})}),e.jsx(t,{type:"danger",title:"误区 2：自动 ACK 更简单所以更好",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"错误认知"}),"：自动 ACK 无需手动管理，代码更简洁。",e.jsx("br",{}),e.jsx("strong",{children:"正确做法"}),"：自动 ACK 在消息投递给消费者后立即删除，如果消费者处理失败，消息无法恢复。",e.jsx("strong",{children:"生产环境必须使用手动 ACK"}),"，确保业务逻辑执行成功后再确认。"]})}),e.jsx(t,{type:"danger",title:"误区 3：Confirm 模式能保证精确一次",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"错误认知"}),"：Confirm 模式返回 ack 后，消息就一定只会被消费一次。",e.jsx("br",{}),e.jsx("strong",{children:"正确做法"}),"：Confirm 模式只保证消息到达 Broker，如果消费者处理失败并重试，可能导致重复消费。",e.jsx("strong",{children:"需要在消费者端实现幂等性"}),"（如唯一索引、Redis 去重）。"]})}),e.jsx(t,{type:"danger",title:"误区 4：镜像队列越多越好",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:[e.jsx("strong",{children:"错误认知"}),"：镜像副本越多，可靠性越高。",e.jsx("br",{}),e.jsx("strong",{children:"正确做法"}),"：镜像队列会显著增加网络带宽和存储开销。通常 2-3 个副本即可满足高可用需求。RabbitMQ 3.8+ 推荐使用 ",e.jsx("strong",{children:"Quorum Queues"}),"（基于 Raft），性能和可靠性更优。"]})}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、面试真题"}),e.jsx(o,{questions:[{question:"RabbitMQ 如何保证消息不丢失？",answer:`从三个层面保证：
1. 生产者：启用 Confirm 模式或事务模式，确保消息到达 Broker
2. Broker：Exchange、Queue、Message 都设置为持久化，配置镜像队列或 Quorum Queues
3. 消费者：使用手动 ACK，处理成功后再确认；配置死信队列处理失败消息

此外还需要在消费者端实现幂等性，防止重复消费。`},{question:"Confirm 模式和事务模式有什么区别？如何选择？",answer:`区别：
• Confirm 模式：异步非阻塞，性能高，支持批量确认
• 事务模式：同步阻塞，性能差（慢 10 倍以上），强一致性

选择：
• 绝大多数场景使用 Confirm 模式（推荐）
• 仅在极端可靠性要求且吞吐要求低的场景使用事务模式（如金融核心交易）`},{question:"什么是死信队列？如何使用？",answer:`死信队列（DLQ）用于存储无法被正常消费的消息，触发条件：
1. 消息被拒绝（basicReject/basicNack）且 requeue=false
2. 消息过期（TTL）
3. 队列达到最大长度

使用步骤：
1. 声明死信交换机和死信队列
2. 在主队列配置 x-dead-letter-exchange 和 x-dead-letter-routing-key
3. 消费失败时调用 basicNack(deliveryTag, false, false) 进入死信队列
4. 监控死信队列，人工干预或自动重试`},{question:"如何实现消息的精确一次（Exactly-Once）消费？",answer:`RabbitMQ 本身只提供至少一次语义，实现精确一次需要：
1. 生产者幂等：使用唯一消息 ID（可选，需插件支持）
2. 消费者幂等：基于业务主键或消息 ID 去重
   - 数据库唯一索引
   - Redis SETNX 去重
   - 状态机控制（检查消息是否已处理）
3. 事务补偿：记录消息处理状态，失败时回滚
4. 本地消息表：将消息发送与业务操作放在同一事务中

核心思想：允许消息重复投递，但业务处理保证幂等。`},{question:"镜像队列和 Quorum Queues 有什么区别？",answer:`镜像队列（Mirror Queue）：
• 基于主从复制，Master 处理读写，Slave 同步数据
• 同步策略：all/exactly/nodes
• 故障切换需要选举，可能有短暂不可用
• RabbitMQ 3.8 之前的高可用方案

Quorum Queues：
• 基于 Raft 共识算法，多数派写入成功即确认
• 自动故障转移，更强的一致性保证
• 性能优于镜像队列（尤其是写操作）
• RabbitMQ 3.8+ 推荐的高可用方案

建议：新项目优先使用 Quorum Queues。`},{question:"消费者忘记发送 ACK 会发生什么？如何解决？",answer:`后果：
• 消息处于 Unacked 状态，不会重新投递，也不会被删除
• 消费者重启后，消息会重新投递
• 长期不 ACK 会导致消息堆积，占用内存

解决方案：
1. 使用超时机制：设置 prefetchCount 限制未确认消息数量
2. 捕获异常：在 catch 块中调用 basicNack 拒绝消息
3. 监控告警：监控 Unacked 消息数量，超过阈值告警
4. 消费者心跳：配置 heartbeat 检测消费者存活状态`}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6",children:[e.jsxs("div",{className:"p-4 bg-parchment-deep/40 rounded-paper-md border border-border-light",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🔗 前置知识"}),e.jsxs("ul",{className:"space-y-1 text-[14px] text-ink-muted",children:[e.jsxs("li",{children:["• ",e.jsx("a",{href:"/docs/rabbitmq/rabbitmq-core",className:"text-accent hover:underline",children:"RabbitMQ 核心概念"})]}),e.jsxs("li",{children:["• ",e.jsx("a",{href:"/docs/rabbitmq/rabbitmq-routing",className:"text-accent hover:underline",children:"RabbitMQ 路由模式"})]})]})]}),e.jsxs("div",{className:"p-4 bg-parchment-deep/40 rounded-paper-md border border-border-light",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🔗 延伸阅读"}),e.jsxs("ul",{className:"space-y-1 text-[14px] text-ink-muted",children:[e.jsxs("li",{children:["• ",e.jsx("a",{href:"/docs/rabbitmq/rabbitmq-cluster",className:"text-accent hover:underline",children:"RabbitMQ 集群与高可用"})]}),e.jsxs("li",{children:["• ",e.jsx("a",{href:"/docs/kafka/kafka-reliability",className:"text-accent hover:underline",children:"Kafka 消息可靠性保证"})]}),e.jsxs("li",{children:["• ",e.jsx("a",{href:"/docs/rocketmq/rocketmq-transaction",className:"text-accent hover:underline",children:"RocketMQ 事务消息"})]})]})]})]}),e.jsx(t,{type:"info",title:"设计模式关联",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8]",children:["消息可靠性涉及多个设计模式：",e.jsx("strong",{children:"Message Reliability Pattern"}),"（消息可靠性模式）、",e.jsx("strong",{children:"High Availability Pattern"}),"（高可用模式）、",e.jsx("strong",{children:"Idempotency Pattern"}),"（幂等性模式）、",e.jsx("strong",{children:"Circuit Breaker Pattern"}),"（熔断器模式，用于重试控制）。"]})}),e.jsx(x,{...n(l.category,l.id)})]})}),e.jsx(m,{items:h})]})}export{v as default};
