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
  { id: 'core-concepts', text: '一、核心概念与术语', level: 2 },
  { id: 'messaging-patterns', text: '二、消息传递模式', level: 2 },
  { id: 'kafka-deep-dive', text: '三、Kafka 深度解析', level: 2 },
  { id: 'rocketmq-features', text: '四、RocketMQ 高级特性', level: 2 },
  { id: 'rabbitmq-routing', text: '五、RabbitMQ 路由机制', level: 2 },
  { id: 'reliability-guarantee', text: '六、消息可靠性保证', level: 2 },
  { id: 'idempotency', text: '七、幂等性设计', level: 2 },
  { id: 'ordered-messages', text: '八、顺序消息', level: 2 },
  { id: 'dead-letter', text: '九、死信队列', level: 2 },
  { id: 'comparison', text: '十、三大 MQ 对比', level: 2 },
  { id: 'misconceptions', text: '十一、常见误区', level: 2 },
  { id: 'interview', text: '十二、面试真题', level: 2 },
  { id: 'related', text: '十三、知识关联', level: 2 },
]

export default function MessageQueue({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              消息队列是分布式系统中的<strong className="text-accent">异步通信中间件</strong>,通过生产者-消费者模型实现服务解耦、流量削峰和最终一致性,是微服务架构的核心基础设施。
            </p>
          </blockquote>

          <Callout type="info" title="为什么需要消息队列?">
            • <strong>解耦:</strong> 生产者无需知道消费者的存在<br/>
            • <strong>异步:</strong> 提升系统响应速度,非关键路径异步处理<br/>
            • <strong>削峰:</strong> 缓冲突发流量,保护后端服务<br/>
            • <strong>最终一致性:</strong> 通过消息可靠投递实现分布式事务
          </Callout>

          <h2 id="core-concepts" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、核心概念与术语
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            理解消息队列前,需要掌握以下核心概念:
          </p>

          <h3 id="producer-consumer" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            生产者与消费者
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>Producer(生产者):</strong> 发送消息的应用,只负责将消息发送到 MQ</li>
            <li><strong>Consumer(消费者):</strong> 接收并处理消息的应用,从 MQ 拉取或订阅消息</li>
            <li><strong>Broker:</strong> 消息队列服务器,负责存储和转发消息</li>
          </ul>

          <h3 id="topic-queue" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            Topic 与 Queue
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>Topic(主题):</strong> 消息的逻辑分类,如 "order.created"、"user.registered"</li>
            <li><strong>Queue(队列):</strong> 消息的物理存储单元,Kafka 中称为 Partition</li>
            <li><strong>Consumer Group(消费组):</strong> 一组共同消费同一 Topic 的消费者,实现负载均衡</li>
          </ul>

          <SideNote label="发布-订阅 vs 点对点">
            • <strong>Publish-Subscribe:</strong> 一条消息可被多个 Consumer Group 消费(Kafka/RocketMQ)<br/>
            • <strong>Point-to-Point:</strong> 一条消息只能被一个消费者消费(RabbitMQ 队列模式)
          </SideNote>

          <h2 id="messaging-patterns" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、消息传递模式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            消息队列支持多种传递模式,满足不同业务场景需求:
          </p>

          <DiagramBlock title="三种消息传递模式">
{`graph TB
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
    end`}
          </DiagramBlock>

          <h3 id="pub-sub" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            发布-订阅(Pub/Sub)
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            一条消息可以被多个消费者组独立消费,适合事件驱动架构。例如用户注册成功后,同时触发发送邮件、发送短信、初始化积分等多个操作。
          </p>

          <h3 id="point-to-point" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            点对点(Point-to-Point)
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            一条消息只能被一个消费者消费,适合任务分发场景。例如订单处理队列,多个消费者实例竞争消费,实现水平扩展。
          </p>

          <h3 id="request-reply" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            请求-回复(Request-Reply)
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            通过 Correlation ID 实现异步 RPC,生产者发送请求后等待响应。RabbitMQ 通过 Reply-To 队列实现此模式。
          </p>

          <h2 id="kafka-deep-dive" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Kafka 深度解析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 是 LinkedIn 开源的高吞吐分布式消息系统,专为大数据实时流处理设计。
          </p>

          <DiagramBlock title="Kafka 架构">
{`graph TB
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
    P2 --> C3`}
          </DiagramBlock>

          <h3 id="kafka-partition" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            Partition 分区机制
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>水平扩展:</strong> Topic 分为多个 Partition,分布在不同的 Broker 上</li>
            <li><strong>并行消费:</strong> 每个 Partition 只能被 Consumer Group 中的一个消费者消费</li>
            <li><strong>顺序保证:</strong> 单个 Partition 内消息严格有序</li>
            <li><strong>副本机制:</strong> 每个 Partition 有 Leader 和 Follower,保证高可用</li>
          </ul>

          <Callout type="warning" title="Partition 数量设计">
            Partition 数量一旦确定无法减少(只能增加)。建议:<br/>
            • 初期设置为消费者实例数的整数倍<br/>
            • 考虑未来扩容需求,预留足够的 Partition<br/>
            • 过多 Partition 会增加 ZooKeeper/KRaft 负担
          </Callout>

          <h3 id="kafka-offset" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            Offset 位移管理
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 通过 Offset 记录消费者在 Partition 中的消费位置:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>自动提交:</strong> enable.auto.commit=true,定期自动提交 Offset(可能丢失或重复)</li>
            <li><strong>手动提交:</strong> 业务处理成功后手动提交,保证至少一次消费</li>
            <li><strong>__consumer_offsets:</strong> Kafka 内部 Topic,存储所有 Consumer Group 的 Offset</li>
          </ul>

          <h3 id="kafka-replication" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            ISR 副本同步机制
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 通过 ISR(In-Sync Replicas)机制保证数据可靠性:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>Leader:</strong> 负责处理读写请求</li>
            <li><strong>Follower:</strong> 从 Leader 同步数据,不对外提供服务</li>
            <li><strong>ISR:</strong> 与 Leader 保持同步的副本集合,落后超过阈值的 Follower 会被移出 ISR</li>
            <li><strong>ACK 机制:</strong> acks=0(不等待)、acks=1(Leader 确认)、acks=all(所有 ISR 确认)</li>
          </ul>

          <SideNote label="Kafka 高性能秘诀">
            • <strong>顺序写磁盘:</strong> 利用磁盘顺序写性能接近内存写的特性<br/>
            • <strong>零拷贝:</strong> sendfile 系统调用,避免内核态与用户态数据拷贝<br/>
            • <strong>页缓存:</strong> 利用 OS Page Cache,而非 JVM Heap<br/>
            • <strong>批量发送:</strong> Producer 批量压缩发送,减少网络往返
          </SideNote>

          <h2 id="rocketmq-features" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、RocketMQ 高级特性
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 是阿里巴巴开源的企业级消息队列,以事务消息和顺序消息著称。
          </p>

          <h3 id="rocketmq-transaction" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            事务消息
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 的事务消息实现分布式事务的最终一致性:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>发送 Half 消息:</strong> Producer 发送半消息到 Broker,此时对 Consumer 不可见</li>
            <li><strong>执行本地事务:</strong> Producer 执行数据库操作</li>
            <li><strong>提交/回滚:</strong> 根据本地事务结果,向 Broker 发送 Commit 或 Rollback</li>
            <li><strong>回查机制:</strong> 如果 Broker 未收到确认,会定期回查 Producer 本地事务状态</li>
          </ol>

          <DiagramBlock title="RocketMQ 事务消息流程">
{`sequenceDiagram
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
    end`}
          </DiagramBlock>

          <h3 id="rocketmq-orderly" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            顺序消息
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 支持全局顺序和分区顺序两种模式:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>全局顺序:</strong> 整个 Topic 只有一个 Queue,性能低,不推荐</li>
            <li><strong>分区顺序:</strong> 相同业务 ID(如订单号)的消息发送到同一个 Queue,保证局部有序</li>
            <li><strong>MessageQueueSelector:</strong> 自定义选择算法,确保同一订单的消息路由到同一 Queue</li>
          </ul>

          <h3 id="rocketmq-delay" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            延迟消息
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 支持固定等级的延迟消息,适用于订单超时取消、定时任务等场景:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>延迟等级:</strong> 默认 18 个等级(1s、5s、10s、30s、1m、2m...2h)</li>
            <li><strong>实现原理:</strong> 消息先存入 SCHEDULE_TOPIC_XXXX,到期后转存到真实 Topic</li>
            <li><strong>限制:</strong> 不支持任意时间延迟,只能选择预设等级(RocketMQ 5.0 支持任意延迟)</li>
          </ul>

          <h2 id="rabbitmq-routing" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、RabbitMQ 路由机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RabbitMQ 基于 AMQP 协议,通过 Exchange 实现灵活的消息路由。
          </p>

          <DiagramBlock title="RabbitMQ 四种 Exchange 类型">
{`graph TB
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
    end`}
          </DiagramBlock>

          <h3 id="exchange-types" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            四种 Exchange 类型
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>Direct:</strong> 精确匹配 Routing Key,一对一路由</li>
            <li><strong>Fanout:</strong> 广播模式,忽略 Routing Key,发送给所有绑定队列</li>
            <li><strong>Topic:</strong> 通配符匹配,# 匹配零或多个单词,* 匹配一个单词</li>
            <li><strong>Headers:</strong> 根据消息 Header 属性匹配,较少使用</li>
          </ul>

          <SideNote label="AMQP 核心概念">
            • <strong>Virtual Host:</strong> 逻辑隔离,类似命名空间<br/>
            • <strong>Binding:</strong> Exchange 与 Queue 的绑定关系<br/>
            • <strong>Routing Key:</strong> 消息的路由标识<br/>
            • <strong>Prefetch Count:</strong> 消费者每次拉取的消息数量,控制并发
          </SideNote>

          <h2 id="reliability-guarantee" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、消息可靠性保证
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            消息可靠性是消息队列的核心要求,需要从生产者、Broker、消费者三个环节保证:
          </p>

          <h3 id="producer-reliability" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            生产者可靠性
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>Kafka:</strong> acks=all + retries + enable.idempotence=true</li>
            <li><strong>RocketMQ:</strong> 同步发送 + 重试机制,事务消息保证最终一致</li>
            <li><strong>RabbitMQ:</strong> Confirm 模式 + 持久化消息</li>
          </ul>

          <h3 id="broker-reliability" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            Broker 可靠性
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>持久化:</strong> 消息写入磁盘,防止 Broker 重启丢失</li>
            <li><strong>副本机制:</strong> Kafka ISR、RocketMQ 主从同步、RabbitMQ 镜像队列</li>
            <li><strong>刷盘策略:</strong> 同步刷盘(安全但慢) vs 异步刷盘(快但有丢失风险)</li>
          </ul>

          <h3 id="consumer-reliability" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            消费者可靠性
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>手动 ACK:</strong> 业务处理成功后再确认,避免消息丢失</li>
            <li><strong>重试机制:</strong> 消费失败后重新入队或进入死信队列</li>
            <li><strong>幂等性:</strong> 消费者必须实现幂等,防止重复消费导致数据错误</li>
          </ul>

          <Callout type="warning" title="消息丢失的常见场景">
            • 生产者发送失败未重试<br/>
            • Broker 未持久化就宕机<br/>
            • 消费者自动 ACK 但处理失败<br/>
            • 网络抖动导致 ACK 丢失<br/>
            <strong>解决:</strong> 全链路可靠性配置 + 消息追踪 + 对账补偿
          </Callout>

          <h2 id="idempotency" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、幂等性设计
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            由于网络重试、消费者重启等原因,消息可能被重复消费。消费者必须实现幂等性,确保多次处理同一消息的结果一致。
          </p>

          <h3 id="idempotency-strategies" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            幂等性实现方案
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>唯一索引:</strong> 数据库设置唯一键,重复插入报错(最简单可靠)</li>
            <li><strong>Redis 去重:</strong> 消费前检查 messageId 是否已处理,setnx 原子操作</li>
            <li><strong>状态机:</strong> 订单状态只能单向流转(待支付→已支付),重复消息不会改变状态</li>
            <li><strong>Token 机制:</strong> 生产者生成唯一 Token,消费者校验 Token 是否已使用</li>
          </ul>

          <Playground
            code={`@Service
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
}`}
            language="java"
            filename="OrderConsumer.java"
            description="幂等性消费者示例(Spring Boot + Redis)"
          />

          <h2 id="ordered-messages" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、顺序消息
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            某些业务场景要求消息严格按顺序处理,如订单创建→支付→发货的状态流转。
          </p>

          <h3 id="ordering-guarantee" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            顺序保证的前提
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>单 Partition/Queue:</strong> 相同业务 ID 的消息必须发送到同一分区</li>
            <li><strong>单消费者:</strong> 一个分区只能被一个消费者实例消费</li>
            <li><strong>同步处理:</strong> 消费者不能并发处理同一分区的消息</li>
          </ul>

          <Callout type="warning" title="顺序消息的性能代价">
            顺序消息会显著降低吞吐量,因为失去了并行处理能力。仅在必要时使用,如金融交易、订单状态流转等强顺序场景。
          </Callout>

          <h3 id="ordering-implementation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            实现方案对比
          </h3>
          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border p-2 text-left font-semibold">方案</th>
                <th className="border border-border p-2 text-left font-semibold">实现方式</th>
                <th className="border border-border p-2 text-left font-semibold">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2"><strong>Kafka</strong></td>
                <td className="border border-border p-2">指定 key 发送到同一 Partition</td>
                <td className="border border-border p-2">日志聚合、事件溯源</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><strong>RocketMQ</strong></td>
                <td className="border border-border p-2">MessageQueueSelector 选择 Queue</td>
                <td className="border border-border p-2">订单流转、证券交易</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><strong>RabbitMQ</strong></td>
                <td className="border border-border p-2">单队列 + 单消费者</td>
                <td className="border border-border p-2">简单顺序场景</td>
              </tr>
            </tbody>
          </table>

          <h2 id="dead-letter" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、死信队列
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            死信队列(Dead Letter Queue,DLQ)用于存储无法正常消费的消息,便于后续排查和处理。
          </p>

          <h3 id="dlq-triggers" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            消息进入死信队列的条件
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>消费失败:</strong> 消息被拒绝(reject/nack)且不重新入队</li>
            <li><strong>TTL 过期:</strong> 消息在队列中存活时间超过 TTL</li>
            <li><strong>队列满:</strong> 队列达到最大长度,新消息被丢弃到 DLQ</li>
          </ul>

          <DiagramBlock title="死信队列工作流程">
{`graph LR
    P[生产者] -->|发送| Q[主队列]
    Q -->|消费失败| DLX[死信交换机]
    DLX -->|路由| DLQ[死信队列]
    DLQ -->|人工处理| Worker[运维人员]
    
    style DLQ fill:#ffebee
    style DLX fill:#fff3e0`}
          </DiagramBlock>

          <h3 id="dlq-handling" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            死信消息处理策略
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>人工介入:</strong> 查看死信消息内容,修复 Bug 后重新发送</li>
            <li><strong>自动重试:</strong> 定时任务将死信消息重新投递到主队列(有限次数)</li>
            <li><strong>告警通知:</strong> 死信队列积压超过阈值时触发告警</li>
            <li><strong>日志记录:</strong> 记录死信消息详情,便于问题追溯</li>
          </ul>

          <SideNote label="各 MQ 的死信实现">
            • <strong>Kafka:</strong> 无原生 DLQ,需自行实现(创建独立的 dead-letter-topic)<br/>
            • <strong>RocketMQ:</strong> 内置死信队列(%DLQ% + ConsumerGroup)<br/>
            • <strong>RabbitMQ:</strong> 通过 x-dead-letter-exchange 参数配置
          </SideNote>

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、三大 MQ 对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka、RocketMQ、RabbitMQ 各有优劣,选型需结合业务场景:
          </p>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border p-2 text-left font-semibold">维度</th>
                <th className="border border-border p-2 text-left font-semibold">Kafka</th>
                <th className="border border-border p-2 text-left font-semibold">RocketMQ</th>
                <th className="border border-border p-2 text-left font-semibold">RabbitMQ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2"><strong>开发语言</strong></td>
                <td className="border border-border p-2">Scala/Java</td>
                <td className="border border-border p-2">Java</td>
                <td className="border border-border p-2">Erlang</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><strong>吞吐量</strong></td>
                <td className="border border-border p-2 text-green-600 font-semibold">极高(百万级 TPS)</td>
                <td className="border border-border p-2">高(十万级 TPS)</td>
                <td className="border border-border p-2">中等(万级 TPS)</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><strong>延迟</strong></td>
                <td className="border border-border p-2">毫秒级</td>
                <td className="border border-border p-2">毫秒级</td>
                <td className="border border-border p-2 text-green-600 font-semibold">微秒级</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><strong>事务消息</strong></td>
                <td className="border border-border p-2 text-red-600">❌ 不支持</td>
                <td className="border border-border p-2 text-green-600 font-semibold">✅ 原生支持</td>
                <td className="border border-border p-2 text-red-600">❌ 不支持</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><strong>顺序消息</strong></td>
                <td className="border border-border p-2 text-green-600 font-semibold">✅ Partition 级别</td>
                <td className="border border-border p-2 text-green-600 font-semibold">✅ Queue 级别</td>
                <td className="border border-border p-2">⚠️ 单队列</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><strong>延迟消息</strong></td>
                <td className="border border-border p-2 text-red-600">❌ 不支持</td>
                <td className="border border-border p-2 text-green-600 font-semibold">✅ 固定等级</td>
                <td className="border border-border p-2 text-green-600 font-semibold">✅ TTL + DLX</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><strong>消息回溯</strong></td>
                <td className="border border-border p-2 text-green-600 font-semibold">✅ 按 Offset/时间</td>
                <td className="border border-border p-2 text-green-600 font-semibold">✅ 按时间</td>
                <td className="border border-border p-2 text-red-600">❌ 不支持</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><strong>适用场景</strong></td>
                <td className="border border-border p-2">大数据、日志聚合、流处理</td>
                <td className="border border-border p-2">电商、金融、事务场景</td>
                <td className="border border-border p-2">低延迟、复杂路由</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="选型建议">
            • <strong>大数据/日志场景:</strong> 选 Kafka,吞吐量最高,生态完善<br/>
            • <strong>电商/金融场景:</strong> 选 RocketMQ,事务消息、顺序消息能力强<br/>
            • <strong>低延迟/复杂路由:</strong> 选 RabbitMQ,AMQP 协议灵活,延迟最低<br/>
            • <strong>云原生场景:</strong> 考虑 Pulsar(新一代云原生 MQ)
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、常见误区
          </h2>

          <h3 id="misconception-1" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            误区 1:消息队列保证消息不丢失
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong className="text-red-600">错误!</strong> 消息队列本身不保证 100% 不丢失,需要正确配置生产者 ACK、Broker 持久化、消费者手动确认。默认配置下,消息仍可能丢失。
          </p>

          <h3 id="misconception-2" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            误区 2:消息队列能解决所有分布式事务问题
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong className="text-red-600">错误!</strong> 消息队列只能实现最终一致性,无法替代强一致性事务。对于需要即时一致性的场景(如转账),仍需使用 2PC/TCC 等方案。
          </p>

          <h3 id="misconception-3" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            误区 3:Kafka 适合所有消息场景
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong className="text-red-600">错误!</strong> Kafka 擅长高吞吐批量处理,但不适合低延迟、复杂路由、事务消息等场景。应根据业务需求选择合适的 MQ。
          </p>

          <h3 id="misconception-4" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            误区 4:消费者越多越好
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong className="text-red-600">错误!</strong> 消费者数量不应超过 Partition/Queue 数量,否则多余的消费者会空闲。Kafka 中,一个 Partition 只能被 Consumer Group 中的一个消费者消费。
          </p>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: '如何保证消息不丢失?',
                answer: `从三个环节保证:

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
• 异常告警`
              },
              {
                question: '如何处理消息积压?',
                answer: `<strong>紧急处理:</strong>
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
3. 设计降级方案,高峰期丢弃非核心消息`
              },
              {
                question: '如何实现消息的顺序消费?',
                answer: `<strong>前提条件:</strong>
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
});`
              },
              {
                question: '什么是消息幂等性?如何实现?',
                answer: `<strong>幂等性定义:</strong>
多次处理同一消息的结果与处理一次相同,不会产生副作用。

<strong>实现方案:</strong>
1. <strong>唯一索引:</strong> 数据库设置唯一键,重复插入报错(最可靠)
2. <strong>Redis 去重:</strong> setnx(messageId, 1, TTL),原子操作
3. <strong>状态机:</strong> 订单状态只能单向流转,重复消息不改变状态
4. <strong>Token 机制:</strong> 生产者生成唯一 Token,消费者校验

<strong>注意事项:</strong>
• 幂等性必须在消费者端实现
• 去重标记需要设置合理的 TTL
• 异常时需清理幂等标记,允许重试`
              },
              {
                question: 'Kafka 为什么吞吐量这么高?',
                answer: `<strong>1. 顺序写磁盘:</strong>
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
不每条消息都建索引,而是每隔一段距离建立索引,节省空间`
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十三、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            消息队列与以下知识点密切相关:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><a href="/docs/08-microservices/distributed-transaction" className="text-accent hover:underline">分布式事务</a> - 通过消息队列实现最终一致性</li>
            <li><a href="/docs/08-microservices/spring-cloud-core" className="text-accent hover:underline">Spring Cloud 核心组件</a> - 微服务间的异步通信</li>
            <li><a href="/docs/03-multithreading/multi-threading-basics" className="text-accent hover:underline">多线程基础</a> - 消费者并发处理</li>
            <li><a href="/docs/infra/messaging/kafka/kafka-architecture" className="text-accent hover:underline">Kafka 架构</a> - 深入理解 Kafka 原理</li>
            <li><a href="/docs/infra/messaging/rocketmq/rocketmq-architecture" className="text-accent hover:underline">RocketMQ 架构</a> - 企业级消息队列实践</li>
          </ul>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
