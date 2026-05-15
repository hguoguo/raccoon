import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'mq-overview', text: '一、消息队列概述', level: 2 },
  { id: 'kafka-analysis', text: '二、Kafka 深度分析', level: 2 },
  { id: 'rocketmq-analysis', text: '三、RocketMQ 深度分析', level: 2 },
  { id: 'rabbitmq-analysis', text: '四、RabbitMQ 深度分析', level: 2 },
  { id: 'pulsar-analysis', text: '五、Pulsar 简要分析', level: 2 },
  { id: 'comparison-dimensions', text: '六、对比维度详解', level: 2 },
  { id: 'selection-guide', text: '七、选型决策指南', level: 2 },
  { id: 'scenario-matching', text: '八、典型场景匹配', level: 2 },
  { id: 'migration-strategy', text: '九、迁移与演进策略', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function MqSelectionGuide({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              消息队列（Message Queue）是分布式系统中的<strong className="text-accent">异步通信中间件</strong>，通过解耦生产者和消费者、削峰填谷、最终一致性等机制，提升系统的可扩展性、可靠性和响应速度。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要消息队列？">
            在微服务架构中，直接同步调用会导致服务间强耦合、雪崩效应和性能瓶颈。消息队列通过异步解耦，让生产者无需等待消费者处理完成，显著提升系统吞吐量和容错能力。同时提供持久化、重试、死信等可靠性保障机制。
          </Callout>

          <h2 id="mq-overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、消息队列概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            主流消息队列包括 Kafka、RocketMQ、RabbitMQ、Pulsar 等，各自有不同的设计目标和适用场景。
          </p>

          <DiagramBlock title="消息队列核心概念">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌──────────┐         ┌──────────────┐         ┌──────────┐
│Producer  │────────▶│ Message Queue│────────▶│Consumer  │
│(生产者)  │  Publish│  (Broker)     │ Subscribe│(消费者)  │
└──────────┘         └──────────────┘         └──────────┘
                            │
                      ┌─────┴─────┐
                      │  Topic    │  # 主题（逻辑分类）
                      │  Partition│  # 分区（并行度）
                      │  Queue    │  # 队列（FIFO）
                      └───────────┘

核心特性：
• 解耦：生产者和消费者无需知道对方存在
• 异步：生产者无需等待消费者处理完成
• 削峰：缓冲突发流量，平滑消费速率
• 持久化：消息落盘，防止丢失
• 重试：消费失败自动重试
• 死信：多次重试失败的消息转入死信队列
• 顺序性：保证同一分区的消息有序
• 事务：支持消息发送和消费的原子性
            `}</pre>
          </DiagramBlock>

          <SideNote label="选择困难症">
            面对众多消息队列，开发者常陷入选择困难：<strong>"我应该用 Kafka 还是 RocketMQ？"</strong>、<strong>"RabbitMQ 是不是过时了？"</strong>。本文章将从多个维度对比主流 MQ，帮助你做出明智的技术选型决策。
          </SideNote>

          <h2 id="kafka-analysis" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Kafka 深度分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 由 LinkedIn 开发，后捐赠给 Apache，是最流行的高吞吐分布式消息系统。
          </p>

          <Playground
            code={`# Kafka 核心特性

# 优势
# ✅ 超高吞吐量：单机百万级 TPS，适合大数据场景
# ✅ 水平扩展：通过增加 Partition 线性扩展
# ✅ 持久化：消息持久化到磁盘，支持回溯消费
# ✅ 生态系统：Connect、Streams、KSQL 等丰富组件
# ✅ 社区活跃：用户基数大，文档完善

# 劣势
# ❌ 延迟较高：毫秒级延迟，不适合实时性要求高的场景
# ❌ 功能单一：主要关注高吞吐，缺乏高级特性（如事务、延迟消息）
# ❌ 运维复杂：依赖 ZooKeeper（KRaft 模式正在改进）
# ❌ 小消息效率低：批量发送机制导致小消息延迟高

# 架构特点
# - Log-based：基于日志追加写入，顺序 I/O 性能高
# - Pull Model：消费者主动拉取消息，可控制消费速率
# - Batch Processing：批量发送和消费，提升吞吐
# - Zero Copy：使用 sendfile 系统调用，减少内存拷贝

# 典型应用场景
# 1. 日志收集：集中收集各服务的日志（ELK Stack）
# 2. 流式处理：实时数据分析（Kafka Streams + Flink）
# 3. 事件溯源：记录所有状态变更（Event Sourcing）
# 4. 指标监控：采集系统指标（Metrics Aggregation）
# 5. CDC：数据库变更捕获（Debezium + Kafka）

# 不适用场景
# - 低延迟要求（<10ms）
# - 复杂路由规则
# - 优先级队列
# - 小规模部署（<3 节点）

# 性能数据参考
# - 吞吐量：100 MB/s - 1 GB/s（取决于硬件和网络）
# - 延迟：P99 < 10ms（批量大小影响延迟）
# - 持久化：默认刷盘策略（可配置）
# - 副本数：通常 3 副本`}
            language="python"
            highlights={[4, 11, 20, 31, 40, 49]}
            filename="kafka-analysis.py"
            description="Kafka 深度分析"
          />

          <Callout type="info" title="Kafka 性能优化技巧">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>批量发送</strong>：增大 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">batch.size</code> 和 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">linger.ms</code></li>
              <li><strong>压缩算法</strong>：启用 LZ4 或 Zstd 压缩，减少网络传输</li>
              <li><strong>零拷贝</strong>：确保操作系统支持 sendfile</li>
              <li><strong>页缓存</strong>：利用 OS Page Cache，避免重复 I/O</li>
              <li><strong>分区数</strong>：根据消费者并行度设置合理分区数</li>
            </ul>
          </Callout>

          <h2 id="rocketmq-analysis" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、RocketMQ 深度分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 由阿里巴巴开发，后捐赠给 Apache，专为电商和金融场景设计。
          </p>

          <Playground
            code={`# RocketMQ 核心特性

# 优势
# ✅ 低延迟：毫秒级延迟，优于 Kafka
# ✅ 事务消息：支持分布式事务（半消息机制）
# ✅ 顺序消息：严格保证消息顺序（分区顺序）
# ✅ 延迟消息：支持 18 个级别的延迟投递
# ✅ 批量消息：支持批量发送和消费
# ✅ 消息过滤：支持 Tag 和 SQL92 表达式过滤
# ✅ 中文文档：阿里出品，中文资料丰富

# 劣势
# ❌ 吞吐量较低：相比 Kafka，吞吐略低（但仍很高）
# ❌ 生态较弱：周边工具不如 Kafka 丰富
# ❌ 社区规模：国际社区活跃度低于 Kafka
# ❌ Java 绑定：主要客户端是 Java，其他语言支持有限

# 架构特点
# - NameServer：轻量级服务发现（替代 ZooKeeper）
# - Broker：存储和转发消息，主从架构
# - Producer：支持同步/异步/单向发送
# - Consumer：支持 Push/Pull 两种模式
# - CommitLog：顺序写入，类似 Kafka
# - ConsumeQueue：索引文件，加速消费

# 典型应用场景
# 1. 订单处理：电商订单流转（下单 → 支付 → 发货）
# 2. 交易通知：金融交易实时通知
# 3. 异步解耦：微服务间异步通信
# 4. 定时任务：延迟消息实现定时调度
# 5. 大数据：日志收集和流式处理

# 不适用场景
# - 超大规模日志收集（>10 TB/天，优先 Kafka）
# - 跨地域多活（优先 Pulsar）
# - 非 Java 技术栈（优先 RabbitMQ）

# 性能数据参考
# - 吞吐量：10-100 万 TPS（取决于配置）
# - 延迟：P99 < 5ms
# - 持久化：同步/异步刷盘（可配置）
# - 副本数：主从复制（2-3 副本）

# 独特功能示例
# 事务消息
producer.sendMessageInTransaction(msg, transactionListener)

# 延迟消息（18个级别）
# 1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h
message.setDelayTimeLevel(3)  # 10秒后投递

# 顺序消息
producer.send(msg, messageQueueSelector, orderId)`}
            language="python"
            highlights={[4, 12, 21, 30, 39, 48, 56]}
            filename="rocketmq-analysis.py"
            description="RocketMQ 深度分析"
          />

          <SideNote label="事务消息原理">
            RocketMQ 的事务消息通过<strong>半消息（Half Message）</strong>机制实现：① 生产者发送半消息（对消费者不可见）；② 执行本地事务；③ 根据事务结果提交或回滚半消息；④ 如果生产者宕机，Broker 会回查事务状态。这保证了消息发送和本地事务的最终一致性。
          </SideNote>

          <h2 id="rabbitmq-analysis" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、RabbitMQ 深度分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RabbitMQ 基于 Erlang 开发，实现 AMQP 协议，以灵活的路由和低延迟著称。
          </p>

          <Playground
            code={`# RabbitMQ 核心特性

# 优势
# ✅ 低延迟：亚毫秒级延迟，实时性最好
# ✅ 灵活路由：Exchange + Routing Key 实现复杂路由
# ✅ 多协议支持：AMQP、MQTT、STOMP 等
# ✅ 管理界面：内置 Web UI，易于监控和管理
# ✅ 多语言客户端：几乎所有主流语言都有成熟客户端
# ✅ 插件生态：丰富的插件（Shovel、Federation、Consistent Hash）

# 劣势
# ❌ 吞吐量较低：单机万级 TPS，不适合大数据场景
# ❌ 持久化性能：持久化消息性能下降明显
# ❌ 集群扩展：镜像队列模式扩展性有限
# ❌ Erlang 门槛：二次开发和调试需要 Erlang 知识

# 架构特点
# - Exchange：消息路由器，决定消息发送到哪个 Queue
# - Queue：消息队列，存储待消费的消息
# - Binding：Exchange 和 Queue 的绑定关系
# - Routing Key：路由键，匹配 Binding 规则
# - Virtual Host：虚拟主机，隔离不同应用
# - Channel：信道，复用 TCP 连接

# Exchange 类型
# 1. Direct：精确匹配 Routing Key
# 2. Fanout：广播到所有绑定的 Queue
# 3. Topic：通配符匹配（*.error、order.#）
# 4. Headers：根据消息头属性匹配（较少使用）

# 典型应用场景
# 1. 任务队列：后台任务异步处理（Celery + RabbitMQ）
# 2. RPC：远程过程调用（请求-响应模式）
# 3. 实时通知：即时消息推送（聊天、通知）
# 4. IoT：设备消息收发（MQTT 协议）
# 5. 微服务：服务间异步通信（小规模）

# 不适用场景
# - 海量日志收集（>100 万 TPS，优先 Kafka）
# - 大数据流式处理（优先 Kafka + Flink）
# - 超长消息堆积（>1000 万条，优先 RocketMQ）

# 性能数据参考
# - 吞吐量：1-10 万 TPS（持久化会降低）
# - 延迟：P99 < 1ms（非持久化）
# - 持久化：同步刷盘，性能下降 50-80%
# - 集群：镜像队列，通常 3-5 节点

# 路由示例
# Direct Exchange
channel.queueBind(queue, exchange, "order.created")

# Topic Exchange
channel.queueBind(queue, exchange, "order.*")   # 匹配 order.created, order.cancelled
channel.queueBind(queue, exchange, "*.error")    # 匹配 order.error, payment.error

# Fanout Exchange（广播）
channel.queueBind(queue, exchange, "")  # Routing Key 忽略`}
            language="python"
            highlights={[4, 12, 20, 29, 37, 46, 54]}
            filename="rabbitmq-analysis.py"
            description="RabbitMQ 深度分析"
          />

          <Callout type="warning" title="RabbitMQ 性能陷阱">
            RabbitMQ 在<strong>持久化 + 镜像队列</strong>模式下性能会大幅下降（可能降低 80%）。如果追求高性能，应权衡可靠性需求：① 非关键消息使用非持久化；② 减少镜像队列数量；③ 优化预取计数（prefetch_count）；④ 考虑切换到 Kafka 或 RocketMQ。
          </Callout>

          <h2 id="pulsar-analysis" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Pulsar 简要分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Pulsar 由 Yahoo 开发，后捐赠给 Apache，采用存算分离架构，适合云原生环境。
          </p>

          <Playground
            code={`# Pulsar 核心特性

# 优势
# ✅ 存算分离：Broker（计算）和 BookKeeper（存储）独立扩展
# ✅ 多租户：原生支持多租户和资源隔离
# ✅ 跨地域复制：内置 geo-replication，支持多活
# ✅ 统一队列：同时支持队列和流语义
# ✅ 云原生：Kubernetes 友好，弹性伸缩
# ✅ 分层存储：热数据 SSD，冷数据对象存储

# 劣势
# ❌ 架构复杂：组件多（Broker、BookKeeper、ZooKeeper）
# ❌ 运维难度：学习曲线陡峭，故障排查困难
# ❌ 社区规模：用户基数小于 Kafka 和 RocketMQ
# ❌ 成熟度：相对年轻，生产案例较少

# 架构特点
# - Broker：无状态，负责路由和负载均衡
# - BookKeeper：分布式日志存储，保证持久化
# - ZooKeeper：元数据管理和协调
# - Topic Partition：类似 Kafka 的分区
# - Subscription：多种订阅模式（Exclusive、Shared、Failover、Key_Shared）

# 典型应用场景
# 1. 跨地域多活：全球化业务（电商、社交）
# 2. 云原生架构：Kubernetes 环境下的消息中间件
# 3. 多租户平台：SaaS 平台的消息服务
# 4. 混合负载：同时需要队列和流处理的场景

# 性能数据参考
# - 吞吐量：与 Kafka 相当（百万级 TPS）
# - 延迟：P99 < 5ms
# - 持久化：BookKeeper 强一致性
# - 副本数：通常 3 副本（BookKeeper Ensemble）

# 注意
# Pulsar 适合有专门运维团队的大公司
# 中小团队建议优先选择 Kafka 或 RocketMQ`}
            language="python"
            highlights={[4, 12, 20, 28, 35]}
            filename="pulsar-analysis.py"
            description="Pulsar 简要分析"
          />

          <h2 id="comparison-dimensions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、对比维度详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            从多个维度对比主流消息队列，帮助全面评估。
          </p>

          <DiagramBlock title="消息队列综合对比表">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌──────────────┬──────────┬───────────┬──────────┬──────────┐
│   维度       │  Kafka   │ RocketMQ  │ RabbitMQ │  Pulsar  │
├──────────────┼──────────┼───────────┼──────────┼──────────┤
│ 吞吐量       │  ⭐⭐⭐⭐⭐ │ ⭐⭐⭐⭐   │ ⭐⭐      │ ⭐⭐⭐⭐⭐ │
│ 延迟         │  ⭐⭐⭐    │ ⭐⭐⭐⭐   │ ⭐⭐⭐⭐⭐  │ ⭐⭐⭐⭐   │
│ 可靠性       │  ⭐⭐⭐⭐   │ ⭐⭐⭐⭐⭐ │ ⭐⭐⭐⭐   │ ⭐⭐⭐⭐⭐ │
│ 功能丰富度   │  ⭐⭐⭐    │ ⭐⭐⭐⭐⭐ │ ⭐⭐⭐⭐⭐  │ ⭐⭐⭐⭐   │
│ 运维复杂度   │  ⭐⭐⭐    │ ⭐⭐⭐⭐   │ ⭐⭐⭐⭐⭐  │ ⭐⭐      │
│ 社区活跃度   │  ⭐⭐⭐⭐⭐ │ ⭐⭐⭐⭐   │ ⭐⭐⭐⭐   │ ⭐⭐⭐    │
│ 多语言支持   │  ⭐⭐⭐⭐   │ ⭐⭐⭐    │ ⭐⭐⭐⭐⭐  │ ⭐⭐⭐⭐   │
│ 云原生友好   │  ⭐⭐⭐    │ ⭐⭐⭐    │ ⭐⭐⭐    │ ⭐⭐⭐⭐⭐ │
│ 学习曲线     │  ⭐⭐⭐    │ ⭐⭐⭐⭐   │ ⭐⭐⭐⭐⭐  │ ⭐⭐      │
│ 适用规模     │  大      │ 中大      │ 中小     │ 大       │
└──────────────┴──────────┴───────────┴──────────┴──────────┘

⭐越多表示表现越好（运维复杂度相反，⭐越多越简单）

详细对比：
1. 吞吐量：Kafka ≈ Pulsar > RocketMQ > RabbitMQ
2. 延迟：RabbitMQ < RocketMQ < Pulsar < Kafka
3. 可靠性：RocketMQ ≈ Pulsar > Kafka > RabbitMQ
4. 功能：RocketMQ ≈ RabbitMQ > Pulsar > Kafka
5. 运维：RabbitMQ > RocketMQ > Kafka > Pulsar
6. 社区：Kafka > RabbitMQ > RocketMQ > Pulsar
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# 技术细节对比

# 1. 存储模型
# Kafka:     Log-based，顺序追加，Segment 分段
# RocketMQ:  CommitLog + ConsumeQueue，类似 Kafka
# RabbitMQ:  Queue（内存 + 磁盘），随机访问
# Pulsar:    BookKeeper Ledger，分段存储

# 2. 消费模式
# Kafka:     Pull（消费者主动拉取）
# RocketMQ:  Push/Pull（两种模式）
# RabbitMQ:  Push（Broker 推送）
# Pulsar:    Push（支持背压）

# 3. 消息顺序
# Kafka:     分区内有序
# RocketMQ:  分区内有序，支持全局顺序
# RabbitMQ:  单队列有序（但集群不保证）
# Pulsar:    分区内有序，Key_Shared 支持 key 级别顺序

# 4. 事务支持
# Kafka:     幂等性 + 事务（Exactly-Once）
# RocketMQ:  事务消息（半消息机制）
# RabbitMQ:  不支持（需应用层保证）
# Pulsar:    支持事务（实验性）

# 5. 消息过滤
# Kafka:     不支持（需消费后过滤）
# RocketMQ:  Tag + SQL92 表达式
# RabbitMQ:  Exchange 路由规则
# Pulsar:    支持正则表达式

# 6. 延迟消息
# Kafka:     不支持（需外部调度）
# RocketMQ:  18 个级别
# RabbitMQ:  插件支持（TTL + DLX）
# Pulsar:    支持（延迟级别可配置）

# 7. 死信队列
# Kafka:     不支持（需手动实现）
# RocketMQ:  内置支持
# RabbitMQ:  DLX（Dead Letter Exchange）
# Pulsar:    内置支持

# 8. 消息回溯
# Kafka:     支持（基于 Offset）
# RocketMQ:  支持（基于时间）
# RabbitMQ:  不支持（消费即删除）
# Pulsar:    支持（基于 Cursor）`}
            language="python"
            highlights={[4, 12, 20, 28, 36, 44, 52, 60]}
            filename="mq-comparison.py"
            description="消息队列技术细节对比"
          />

          <SideNote label="没有银弹">
            不存在"最好的消息队列"，只有"最适合的场景"。Kafka 在大数据领域无可匹敌，RocketMQ 在电商金融场景表现出色，RabbitMQ 在小规模实时系统中简单易用，Pulsar 在云原生和多租户场景独具优势。关键是<strong>理解自身需求</strong>，而非盲目追随潮流。
          </SideNote>

          <h2 id="selection-guide" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、选型决策指南
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            通过决策树快速定位适合的消息队列。
          </p>

          <DiagramBlock title="消息队列选型决策树">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
开始
 │
 ├─ 吞吐量需求 > 100 万 TPS？
 │   ├─ 是 → Kafka 或 Pulsar
 │   │        ├─ 需要跨地域多活？ → Pulsar
 │   │        └─ 否则 → Kafka
 │   └─ 否 ↓
 │
 ├─ 延迟要求 < 5ms？
 │   ├─ 是 → RabbitMQ 或 RocketMQ
 │   │        ├─ 需要复杂路由？ → RabbitMQ
 │   │        └─ 否则 → RocketMQ
 │   └─ 否 ↓
 │
 ├─ 需要事务消息？
 │   ├─ 是 → RocketMQ
 │   └─ 否 ↓
 │
 ├─ 需要延迟消息？
 │   ├─ 是 → RocketMQ 或 RabbitMQ（插件）
 │   └─ 否 ↓
 │
 ├─ 技术栈主要是 Java？
 │   ├─ 是 → RocketMQ 或 Kafka
 │   └─ 否 → RabbitMQ（多语言支持好）
 │
 ├─ 部署在 Kubernetes？
 │   ├─ 是 → Pulsar 或 Kafka（Operator）
 │   └─ 否 ↓
 │
 ├─ 团队规模 < 10 人？
 │   ├─ 是 → RabbitMQ（运维简单）
 │   └─ 否 ↓
 │
 └─ 默认推荐 → RocketMQ（功能均衡）

简化版：
• 大数据/日志 → Kafka
• 电商/金融 → RocketMQ
• 小规模/实时 → RabbitMQ
• 云原生/多租户 → Pulsar
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# 选型检查清单

# 回答以下问题，打分最高的即为最佳选择

# 1. 吞吐量需求（满分 5 分）
# - < 1 万 TPS:    Kafka(1), RocketMQ(3), RabbitMQ(5), Pulsar(1)
# - 1-10 万 TPS:   Kafka(3), RocketMQ(5), RabbitMQ(3), Pulsar(3)
# - 10-100 万 TPS: Kafka(5), RocketMQ(4), RabbitMQ(1), Pulsar(5)
# - > 100 万 TPS:  Kafka(5), RocketMQ(3), RabbitMQ(1), Pulsar(5)

# 2. 延迟要求（满分 5 分）
# - < 1ms:         Kafka(2), RocketMQ(3), RabbitMQ(5), Pulsar(3)
# - 1-5ms:         Kafka(3), RocketMQ(5), RabbitMQ(5), Pulsar(4)
# - 5-10ms:        Kafka(4), RocketMQ(5), RabbitMQ(5), Pulsar(5)
# - > 10ms:        Kafka(5), RocketMQ(5), RabbitMQ(5), Pulsar(5)

# 3. 功能需求（满分 5 分）
# - 事务消息:      Kafka(2), RocketMQ(5), RabbitMQ(1), Pulsar(3)
# - 延迟消息:      Kafka(1), RocketMQ(5), RabbitMQ(3), Pulsar(4)
# - 顺序消息:      Kafka(3), RocketMQ(5), RabbitMQ(2), Pulsar(4)
# - 消息过滤:      Kafka(1), RocketMQ(5), RabbitMQ(5), Pulsar(4)

# 4. 运维能力（满分 5 分）
# - 团队 < 5 人:   Kafka(2), RocketMQ(3), RabbitMQ(5), Pulsar(1)
# - 团队 5-20 人:  Kafka(3), RocketMQ(4), RabbitMQ(5), Pulsar(2)
# - 团队 > 20 人:  Kafka(5), RocketMQ(5), RabbitMQ(5), Pulsar(4)

# 5. 技术栈匹配（满分 5 分）
# - Java:          Kafka(4), RocketMQ(5), RabbitMQ(3), Pulsar(4)
# - Python/Go:     Kafka(4), RocketMQ(2), RabbitMQ(5), Pulsar(4)
# - 多语言混合:    Kafka(4), RocketMQ(2), RabbitMQ(5), Pulsar(4)

# 计算方法
# 1. 根据实际需求，为每个维度打分
# 2. 累加各消息队列的总分
# 3. 选择总分最高的

# 示例：电商订单系统
# - 吞吐量：10 万 TPS → Kafka(3), RocketMQ(5), RabbitMQ(3), Pulsar(3)
# - 延迟：5ms → Kafka(4), RocketMQ(5), RabbitMQ(5), Pulsar(5)
# - 功能：需要事务 → Kafka(2), RocketMQ(5), RabbitMQ(1), Pulsar(3)
# - 运维：10 人团队 → Kafka(3), RocketMQ(4), RabbitMQ(5), Pulsar(2)
# - 技术栈：Java → Kafka(4), RocketMQ(5), RabbitMQ(3), Pulsar(4)
# 
# 总分：Kafka(16), RocketMQ(24), RabbitMQ(17), Pulsar(17)
# 结论：选择 RocketMQ ✅`}
            language="python"
            highlights={[6, 16, 26, 36, 46, 56]}
            filename="selection-checklist.py"
            description="选型决策检查清单"
          />

          <Callout type="tip" title="POC 验证建议">
            理论分析后，务必进行<strong>概念验证（POC）</strong>：① 搭建最小可用集群；② 模拟真实负载（吞吐量、延迟、消息大小）；③ 测试故障场景（节点宕机、网络分区）；④ 监控资源消耗（CPU、内存、磁盘、网络）；⑤ 评估运维复杂度。POC 能暴露理论分析无法发现的问题。
          </Callout>

          <h2 id="scenario-matching" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、典型场景匹配
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            不同业务场景对消息队列的需求差异巨大，以下是典型场景的最佳实践。
          </p>

          <Playground
            code={`# 典型场景与推荐方案

# 场景 1: 日志收集（大数据）
# 需求：高吞吐、持久化、回溯消费
# 推荐：Kafka
# 理由：Kafka 在日志收集领域是事实标准，配合 ELK/Flink 形成完整生态
# 架构：App → Filebeat → Kafka → Logstash → Elasticsearch → Kibana
# 注意：合理设置 Partition 数和副本数，启用压缩

# 场景 2: 订单处理（电商）
# 需求：事务、顺序、延迟消息、可靠性
# 推荐：RocketMQ
# 理由：事务消息保证订单和库存的一致性，顺序消息保证订单状态流转
# 架构：Order Service → RocketMQ → Payment Service → Delivery Service
# 注意：使用事务消息 + 本地事务表保证最终一致性

# 场景 3: 实时通知（IM/推送）
# 需求：低延迟、灵活路由、多语言
# 推荐：RabbitMQ
# 理由：亚毫秒级延迟，Topic Exchange 支持灵活订阅，多语言客户端成熟
# 架构：Notification Service → RabbitMQ → User Device
# 注意：使用 TTL + DLX 实现离线消息，Fanout Exchange 实现广播

# 场景 4: 流式处理（实时分析）
# 需求：高吞吐、低延迟、流处理集成
# 推荐：Kafka + Flink
# 理由：Kafka Streams 和 Flink 原生集成，支持 Exactly-Once 语义
# 架构：Data Source → Kafka → Flink → Data Sink
# 注意：合理设置 checkpoint 间隔，平衡延迟和容错

# 场景 5: 跨地域多活（全球化）
# 需求：异地复制、多租户、云原生
# 推荐：Pulsar
# 理由：内置 geo-replication，原生多租户，Kubernetes 友好
# 架构：Region A ↔ Pulsar Geo-Replication ↔ Region B
# 注意：评估网络延迟，配置冲突解决策略

# 场景 6: 任务队列（后台处理）
# 需求：简单、可靠、易运维
# 推荐：RabbitMQ 或 Redis（轻量级）
# 理由：RabbitMQ 提供完善的 ACK 和重试机制，Redis 适合简单场景
# 架构：Web App → RabbitMQ → Worker Pool
# 注意：设置 prefetch_count 避免单消费者过载

# 场景 7: IoT 设备消息
# 需求：海量连接、低功耗、MQTT 协议
# 推荐：RabbitMQ（MQTT 插件）或 EMQX
# 理由：RabbitMQ 支持 MQTT 协议，EMQX 专为 IoT 设计
# 架构：IoT Device → MQTT Broker → Backend Service
# 注意：限制单设备消息频率，实现设备认证

# 场景 8: 微服务异步通信
# 需求：解耦、可靠、易用
# 推荐：根据规模选择
# - 小规模（<10 服务）：RabbitMQ
# - 中规模（10-50 服务）：RocketMQ
# - 大规模（>50 服务）：Kafka 或 Pulsar
# 注意：定义统一的消息 schema，使用 Schema Registry`}
            language="python"
            highlights={[4, 11, 18, 25, 32, 39, 46, 53]}
            filename="scenario-matching.py"
            description="典型场景匹配"
          />

          <SideNote label="混合使用">
            大型系统往往<strong>同时使用多种消息队列</strong>：Kafka 处理日志和大数据，RocketMQ 处理核心业务，RabbitMQ 处理实时通知。不要试图用一种 MQ 解决所有问题，应根据子系统的特性选择最合适的方案。
          </SideNote>

          <h2 id="migration-strategy" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、迁移与演进策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            随着业务发展，可能需要从一个 MQ 迁移到另一个，以下是平滑迁移的策略。
          </p>

          <Playground
            code={`# 消息队列迁移策略

# 策略 1: 双写迁移（推荐）
# 步骤：
# 1. 修改生产者，同时写入旧 MQ 和新 MQ
# 2. 消费者从新 MQ 消费，验证数据正确性
# 3. 逐步切换流量（10% → 50% → 100%）
# 4. 观察稳定后，停止写入旧 MQ
# 5. 清理旧 MQ 数据和资源

# 优点：可回滚，风险低
# 缺点：生产者代码复杂，短期资源翻倍

# 伪代码示例
class DualWriter:
    def __init__(self, old_mq, new_mq):
        self.old_mq = old_mq
        self.new_mq = new_mq
    
    def send(self, message):
        # 先写新 MQ，失败则回退
        try:
            self.new_mq.send(message)
        except Exception as e:
            log.error(f"New MQ failed: {e}")
            self.old_mq.send(message)  # 降级
        
        # 异步写旧 MQ（不影响主流程）
        asyncio.create_task(self.old_mq.send_async(message))

# 策略 2: 数据同步迁移
# 步骤：
# 1. 部署新 MQ 集群
# 2. 编写同步工具，从旧 MQ 读取消息写入新 MQ
# 3. 保持同步直到追平最新偏移量
# 4. 切换消费者到新 MQ
# 5. 切换生产者到新 MQ

# 优点：生产者无需改动
# 缺点：同步工具有延迟，可能丢失消息

# 策略 3: 灰度迁移
# 步骤：
# 1. 新业务直接使用新 MQ
# 2. 旧业务逐步迁移（按服务或按功能模块）
# 3. 最终全部迁移完成后下线旧 MQ

# 优点：风险分散，便于问题定位
# 缺点：迁移周期长，维护两套系统

# 迁移注意事项
# 1. 消息格式兼容：确保新旧 MQ 消息格式一致
# 2. 偏移量管理：记录迁移点的 Offset，避免重复或丢失
# 3. 监控告警：密切关注延迟、错误率、堆积量
# 4. 回滚预案：准备快速回滚到旧 MQ 的方案
# 5. 数据校验：抽样对比新旧 MQ 的数据一致性
# 6. 性能测试：迁移前后进行性能基准测试

# 迁移检查清单
# □ 评估迁移必要性（是否真的需要换？）
# □ 制定详细迁移计划（时间表、责任人）
# □ 搭建新 MQ 环境并测试
# □ 开发双写或同步工具
# □ 小流量灰度验证（1-5%）
# □ 全量切换前的压力测试
# □ 正式切换并密切监控
# □ 稳定运行一周后清理旧系统
# □ 总结迁移经验，更新文档`}
            language="python"
            highlights={[4, 21, 35, 45, 55, 65]}
            filename="migration-strategy.py"
            description="消息队列迁移策略"
          />

          <Callout type="danger" title="迁移风险提示">
            消息队列迁移是<strong>高风险操作</strong>，可能导致消息丢失、重复消费、服务中断。务必：① 在测试环境充分验证；② 选择业务低峰期执行；③ 准备完整的回滚方案；④ 全程监控系统指标；⑤ 保留旧系统至少一个月作为备份。切勿在生产环境直接切换！
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="danger" title="误区 1：Kafka 适合所有场景">
            <p className="mb-2"><strong>错误认知</strong>：认为 Kafka 是最流行的消息队列，所以应该用于所有场景。</p>
            <p><strong>正确理解</strong>：Kafka 的优势在于<strong>高吞吐</strong>，但在低延迟、复杂路由、事务消息等方面不如其他 MQ。对于小规模系统，Kafka 的运维复杂度和资源消耗可能得不偿失。应根据实际需求选择，而非盲目追随潮流。</p>
          </Callout>

          <Callout type="danger" title="误区 2：消息队列保证消息不丢失">
            <p className="mb-2"><strong>错误认知</strong>：认为使用了消息队列就万事大吉，消息永远不会丢失。</p>
            <p><strong>正确理解</strong>：消息队列只能<strong>降低</strong>消息丢失的概率，不能完全消除。需要正确配置：① 生产者 ACK 机制（all/-1）；② Broker 持久化（同步刷盘）；③ 副本数（≥3）；④ 消费者手动 ACK。任何环节配置不当都可能导致消息丢失。</p>
          </Callout>

          <Callout type="danger" title="误区 3：吞吐量越高越好">
            <p className="mb-2"><strong>错误认知</strong>：认为应该选择吞吐量最高的消息队列。</p>
            <p><strong>正确理解</strong>：吞吐量只是众多考量因素之一。如果实际负载只有 1000 TPS，选择支持百万 TPS 的 Kafka 就是<strong>过度设计</strong>。应综合考虑：延迟、可靠性、功能、运维成本、团队技能等因素。适合的才是最好的。</p>
          </Callout>

          <Callout type="warning" title="误区 4：不需要监控和告警">
            <p className="mb-2"><strong>错误认知</strong>：认为消息队列部署后就可以不管了。</p>
            <p><strong>正确理解</strong>：消息队列是系统的<strong>关键基础设施</strong>，必须建立完善的监控体系：① 消息堆积量（Lag）；② 生产/消费速率；③ 延迟（P99/P95）；④ 错误率；⑤ 资源使用率（CPU、内存、磁盘、网络）。设置告警阈值，及时发现和处理问题。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Kafka、RocketMQ、RabbitMQ 的主要区别是什么？",
              answer: "① 吞吐量：Kafka > RocketMQ > RabbitMQ；② 延迟：RabbitMQ < RocketMQ < Kafka；③ 功能：RocketMQ/RabbitMQ 功能丰富（事务、延迟、过滤），Kafka 专注高吞吐；④ 运维：RabbitMQ 最简单，Kafka 中等，Pulsar 最复杂；⑤ 适用场景：Kafka 适合大数据/日志，RocketMQ 适合电商/金融，RabbitMQ 适合小规模实时系统。"
            },
            {
              question: "如何保证消息不丢失？",
              answer: "三个层面：① 生产者：启用 ACK 机制（acks=all），重试机制，本地消息表；② Broker：持久化（同步刷盘），多副本（≥3），RAFT/ZooKeeper 保证一致性；③ 消费者：手动 ACK，幂等消费，死信队列。端到端的可靠性需要三者配合，任何环节薄弱都会导致消息丢失。"
            },
            {
              question: "如何处理消息积压？",
              answer: "① 临时扩容：增加消费者实例或分区数；② 优化消费逻辑：减少单次处理时间，批量消费；③ 丢弃非关键消息：设置 TTL，过期自动删除；④ 分流处理：将积压消息导入临时队列，单独处理；⑤ 预防：监控 Lag 指标，设置告警，提前扩容。根本原因是消费速度慢于生产速度，需从两者入手解决。"
            },
            {
              question: "RocketMQ 的事务消息原理是什么？",
              answer: "通过半消息（Half Message）机制：① 生产者发送半消息到 Broker（对消费者不可见）；② 执行本地事务；③ 根据事务结果向 Broker 发送 Commit 或 Rollback；④ 如果生产者宕机，Broker 定期回查生产者事务状态；⑤ 根据回查结果决定提交或回滚半消息。这保证了消息发送和本地事务的最终一致性。"
            },
            {
              question: "Kafka 为什么吞吐量这么高？",
              answer: "① 顺序 I/O：基于日志追加写入，利用磁盘顺序读写性能；② 零拷贝：使用 sendfile 系统调用，减少内核态和用户态切换；③ 页缓存：利用 OS Page Cache，避免重复 I/O；④ 批量发送：生产者和消费者都支持批量处理，减少网络往返；⑤ 分区并行：通过 Partition 实现水平扩展，多个分区并行处理。"
            },
            {
              question: "如何选择消息队列的分区数？",
              answer: "考虑因素：① 消费者并行度：分区数 ≥ 消费者实例数；② 吞吐量需求：单分区吞吐量有限（Kafka 约 10 MB/s），根据总吞吐计算；③ 重平衡开销：分区数过多会增加 Rebalance 时间；④ 文件句柄：每个分区对应多个文件，受 OS 限制；⑤ 未来扩展：预留 20-50% 余量。经验值：Kafka 通常 6-12 分区，RocketMQ 4-8 队列。"
            },
            {
              question: "消息队列如何实现顺序消费？",
              answer: "① Kafka：同一 Partition 内的消息有序，将需要顺序的消息发送到同一 Partition（通过 Key 哈希）；② RocketMQ：支持分区顺序和全局顺序，使用 MessageQueueSelector 选择队列；③ RabbitMQ：单队列内有序，但集群不保证全局顺序；④ Pulsar：Key_Shared 订阅模式支持 key 级别顺序。关键是保证相关消息路由到同一物理队列。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/infra/messaging/kafka/kafka-architecture" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">深入学习 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">Kafka 架构与核心概念</div>
              <div className="text-[12px] text-ink-muted mt-1">Broker、Topic、Partition</div>
            </a>
            <a href="/docs/infra/messaging/rocketmq/rocketmq-transaction" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">核心技术 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">RocketMQ 事务消息</div>
              <div className="text-[12px] text-ink-muted mt-1">半消息、回查机制</div>
            </a>
            <a href="/docs/infra/messaging/message-queue-comparison/mq-reliability-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">进阶主题 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">消息可靠性保障模式</div>
              <div className="text-[12px] text-ink-muted mt-1">ACK、幂等、事务</div>
            </a>
            <a href="/docs/08-microservices/distributed-transaction" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">分布式事务</div>
              <div className="text-[12px] text-ink-muted mt-1">2PC、TCC、Saga</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            消息队列是分布式系统的核心组件，建议通过以下方式深入学习：① 官方文档：阅读 Kafka、RocketMQ、RabbitMQ 的官方文档；② 源码分析：研究核心模块（存储、网络、副本）；③ 实践部署：搭建集群并压测；④ 故障演练：模拟节点宕机、网络分区；⑤ 性能调优：调整参数并观察效果。理论结合实践才能真正掌握。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
