import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import InteractiveFlow from '../../../../../components/knowledge/InteractiveFlow'
import SideNote from '../../../../../components/knowledge/SideNote'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、Kafka 核心定位', level: 2 },
  { id: 'architecture', text: '二、整体架构设计', level: 2 },
  { id: 'core-components', text: '三、核心组件详解', level: 2 },
  { id: 'topic-partition', text: '3.1 Topic 与 Partition', level: 3 },
  { id: 'broker-cluster', text: '3.2 Broker 集群', level: 3 },
  { id: 'consumer-group', text: '3.3 Consumer Group', level: 3 },
  { id: 'zookeeper-krart', text: '四、元数据管理演进', level: 2 },
  { id: 'zookeeper-mode', text: '4.1 ZooKeeper 模式', level: 3 },
  { id: 'kraft-mode', text: '4.2 KRaft 模式', level: 3 },
  { id: 'replication', text: '五、副本机制与高可用', level: 2 },
  { id: 'leader-follower', text: '5.1 Leader-Follower 模型', level: 3 },
  { id: 'isr-mechanism', text: '5.2 ISR 机制', level: 3 },
  { id: 'storage', text: '六、存储引擎设计', level: 2 },
  { id: 'log-segment', text: '6.1 Log Segment 结构', level: 3 },
  { id: 'index-files', text: '6.2 索引文件', level: 3 },
  { id: 'zero-copy', text: '七、高性能原理', level: 2 },
  { id: 'sequential-io', text: '7.1 顺序 I/O', level: 3 },
  { id: 'page-cache', text: '7.2 Page Cache', level: 3 },
  { id: 'zerocopy-transfer', text: '7.3 零拷贝技术', level: 3 },
  { id: 'comparison', text: '八、与其他 MQ 对比', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function KafkaArchitecture({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Kafka 是一个<strong className="text-accent">分布式流处理平台</strong>，采用发布-订阅模式，通过 Partition 分区、副本复制、Page Cache + 零拷贝等技术，实现<strong className="text-accent">百万级 TPS</strong>的高吞吐、低延迟消息传递，广泛应用于日志收集、实时数据管道和事件驱动架构。
            </p>
          </blockquote>

          {/* ========== 一、Kafka 核心定位 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Kafka 核心定位
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 最初由 LinkedIn 开发，后捐赠给 Apache 基金会。它不是传统的消息队列，而是一个<strong>分布式流处理平台</strong>，具备三大核心能力：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>发布和订阅记录流</strong>：类似消息队列或企业消息系统</li>
            <li><strong>以容错方式存储记录流</strong>：持久化到磁盘，支持回溯消费</li>
            <li><strong>实时处理记录流</strong>：通过 Kafka Streams 进行流式计算</li>
          </ul>

          <Callout type="info" title="Kafka vs 传统 MQ">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              传统 MQ（如 RabbitMQ）强调消息的即时消费和路由灵活性，而 Kafka 强调<strong>高吞吐、持久化和顺序保证</strong>。Kafka 的消息会持久化到磁盘，默认保留 7 天，消费者可以重复消费历史数据，这是其作为流处理平台的基础。
            </p>
          </Callout>

          {/* ========== 二、整体架构设计 ========== */}
          <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、整体架构设计
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 采用典型的分布式架构，包含 Producer、Broker、Consumer 三大角色，通过 ZooKeeper（或 KRaft）协调集群状态。
          </p>

          <DiagramBlock title="Kafka 整体架构图">
            {`graph TB
              subgraph "Producer 端"
                P1["Producer 1"]
                P2["Producer 2"]
              end

              subgraph "Kafka Cluster"
                B1["Broker 1<br/>Partition 0<br/>Partition 3"]
                B2["Broker 2<br/>Partition 1<br/>Partition 4"]
                B3["Broker 3<br/>Partition 2<br/>Partition 5"]
                
                B1 ---|"Replica"| B2
                B2 ---|"Replica"| B3
                B3 ---|"Replica"| B1
              end

              subgraph "Coordination"
                ZK["ZooKeeper / KRaft<br/>元数据管理"]
              end

              subgraph "Consumer 端"
                CG["Consumer Group"]
                C1["Consumer 1"]
                C2["Consumer 2"]
                C3["Consumer 3"]
              end

              P1 -->|"Publish"| B1
              P2 -->|"Publish"| B2
              
              B1 -->|"Consume"| C1
              B2 -->|"Consume"| C2
              B3 -->|"Consume"| C3

              ZK -.->|"Metadata"| B1
              ZK -.->|"Metadata"| B2
              ZK -.->|"Metadata"| B3`}
          </DiagramBlock>

          <SideNote label="关键设计">
            <p className="text-[13px] leading-[1.7]">
              Kafka 将 Topic 拆分为多个 Partition，每个 Partition 分布在不同 Broker 上，实现水平扩展和负载均衡。
            </p>
          </SideNote>

          {/* ========== 三、核心组件详解 ========== */}
          <h2 id="core-components" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、核心组件详解
          </h2>

          <h3 id="topic-partition" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 Topic 与 Partition
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>Topic</strong> 是消息的逻辑分类，类似数据库中的表。<strong>Partition</strong> 是 Topic 的物理分片，每个 Partition 是一个有序的、不可变的消息序列。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>有序性保证</strong>：同一 Partition 内的消息严格有序（按 Offset 递增）</li>
            <li><strong>并行度</strong>：Partition 数量决定了 Consumer 的最大并行度</li>
            <li><strong>分布性</strong>：Partition 均匀分布在不同的 Broker 上</li>
          </ul>

          <DiagramBlock title="Topic-Partition 关系">
            {`graph LR
              T["Topic: orders"]
              
              T --> P0["Partition 0<br/>Offset: 0,1,2,3..."]
              T --> P1["Partition 1<br/>Offset: 0,1,2,3..."]
              T --> P2["Partition 2<br/>Offset: 0,1,2,3..."]
              
              P0 --> B1["Broker 1"]
              P1 --> B2["Broker 2"]
              P2 --> B3["Broker 3"]`}
          </DiagramBlock>

          <Callout type="warning" title="Partition 设计原则">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              Partition 数量应在创建 Topic 时确定，后续只能增加不能减少。建议根据预期的 Consumer 并行度和吞吐量来规划，通常设置为 Broker 数量的整数倍。
            </p>
          </Callout>

          <h3 id="broker-cluster" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 Broker 集群
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>Broker</strong> 是 Kafka 的服务节点，负责消息的存储和转发。一个 Kafka 集群由多个 Broker 组成，每个 Broker 有唯一的 ID。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>无状态设计</strong>：Broker 不保存 Consumer 的消费状态（存储在 __consumer_offsets Topic 中）</li>
            <li><strong>水平扩展</strong>：增加 Broker 即可提升集群容量</li>
            <li><strong>控制器选举</strong>：其中一个 Broker 担任 Controller，负责 Partition 的 Leader 选举和副本同步</li>
          </ul>

          <h3 id="consumer-group" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.3 Consumer Group
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>Consumer Group</strong> 是一组消费者的逻辑集合，用于实现消息的负载均衡消费。同一 Group 内的 Consumer 共同消费一个 Topic，每条消息只会被 Group 中的一个 Consumer 消费。
          </p>

          <DiagramBlock title="Consumer Group 消费模式">
            {`graph TB
              subgraph "Topic: logs (3 Partitions)"
                P0["Partition 0"]
                P1["Partition 1"]
                P2["Partition 2"]
              end

              subgraph "Consumer Group A"
                CA1["Consumer A1"]
                CA2["Consumer A2"]
              end

              subgraph "Consumer Group B"
                CB1["Consumer B1"]
                CB2["Consumer B2"]
                CB3["Consumer B3"]
              end

              P0 --> CA1
              P1 --> CA2
              P2 --> CA1

              P0 --> CB1
              P1 --> CB2
              P2 --> CB3`}
          </DiagramBlock>

          <SideNote label="重平衡">
            <p className="text-[13px] leading-[1.7]">
              当 Consumer 加入或离开 Group 时，会触发 Rebalance，重新分配 Partition。期间会出现短暂的消费停滞（Stop-The-World）。
            </p>
          </SideNote>

          {/* ========== 四、元数据管理演进 ========== */}
          <h2 id="zookeeper-krart" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、元数据管理演进
          </h2>

          <h3 id="zookeeper-mode" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 ZooKeeper 模式（传统架构）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            在 Kafka 2.8 之前，Kafka 依赖 ZooKeeper 存储元数据（Topic 配置、Partition 状态、Consumer Offset 等）。这种架构存在以下问题：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>性能瓶颈</strong>：ZooKeeper 成为集群扩展的瓶颈</li>
            <li><strong>运维复杂</strong>：需要同时维护 Kafka 和 ZooKeeper 两套集群</li>
            <li><strong>脑裂风险</strong>：Controller 故障时可能引发脑裂</li>
          </ul>

          <h3 id="kraft-mode" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 KRaft 模式（新架构）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 2.8 引入了 <strong>KRaft（Kafka Raft）</strong>模式，使用 Raft 共识算法替代 ZooKeeper，实现了元数据的自我管理。Kafka 3.3+ 已将 KRaft 标记为生产就绪。
          </p>

          <Callout type="info" title="KRaft 优势">
            <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]">
              <li><strong>简化架构</strong>：无需部署 ZooKeeper，降低运维复杂度</li>
              <li><strong>提升性能</strong>：消除 ZooKeeper 的性能瓶颈，支持更大规模的集群</li>
              <li><strong>快速故障恢复</strong>：Controller 切换更快，减少不可用时间</li>
            </ul>
          </Callout>

          <ContextSwitcher
            simpleContent={
              <div className="space-y-3">
                <p className="text-[14px] leading-[1.8]">
                  <strong>元数据存储：</strong>Topic 配置、ISR 列表、Consumer Offset 等都存储在 ZooKeeper 的 ZNode 中。
                </p>
                <p className="text-[14px] leading-[1.8]">
                  <strong>Controller 选举：</strong>通过 ZooKeeper 的临时节点实现 Controller 选举，第一个创建 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">/controller</code> 节点的 Broker 成为 Controller。
                </p>
                <p className="text-[14px] leading-[1.8] text-red-600">
                  <strong>缺点：</strong>ZooKeeper 的写性能限制了 Kafka 集群的扩展能力，且增加了运维成本。
                </p>
              </div>
            }
            hardcoreContent={
              <div className="space-y-3">
                <p className="text-[14px] leading-[1.8]">
                  <strong>元数据存储：</strong>元数据存储在内部的 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">__cluster_metadata</code> Topic 中，使用 Raft 协议保证一致性。
                </p>
                <p className="text-[14px] leading-[1.8]">
                  <strong>Controller Quorum：</strong>一组 Broker 组成 Controller Quorum，通过 Raft 协议选举 Leader Controller，其他 Broker 作为 Follower 同步元数据。
                </p>
                <p className="text-[14px] leading-[1.8] text-green-600">
                  <strong>优势：</strong>消除了 ZooKeeper 依赖，提升了可扩展性和故障恢复速度。
                </p>
              </div>
            }
          />

          {/* ========== 五、副本机制与高可用 ========== */}
          <h2 id="replication" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、副本机制与高可用
          </h2>

          <h3 id="leader-follower" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 Leader-Follower 模型
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            每个 Partition 有多个副本（Replica），其中一个为 <strong>Leader</strong>，其他为 <strong>Follower</strong>。所有读写请求都由 Leader 处理，Follower 从 Leader 拉取数据进行同步。
          </p>

          <DiagramBlock title="副本同步流程">
            {`graph TB
              subgraph "Partition 0 (Replication Factor=3)"
                L["Leader<br/>Broker 1"]
                F1["Follower<br/>Broker 2"]
                F2["Follower<br/>Broker 3"]
              end

              P["Producer"] -->|"Write"| L
              C["Consumer"] -->|"Read"| L

              L -->|"Fetch"| F1
              L -->|"Fetch"| F2

              F1 -->|"ACK"| L
              F2 -->|"ACK"| L`}
          </DiagramBlock>

          <h3 id="isr-mechanism" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 ISR 机制
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>ISR（In-Sync Replicas）</strong> 是与 Leader 保持同步的副本集合。只有 ISR 中的副本才有资格被选举为新的 Leader。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>同步判断标准</strong>：Follower 落后 Leader 的时间不超过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">replica.lag.time.max.ms</code>（默认 30 秒）</li>
            <li><strong>动态调整</strong>：Follower 滞后过多会被移出 ISR，追上后重新加入</li>
            <li><strong>Leader 选举</strong>：只有 ISR 中的副本才能参与选举，保证数据不丢失</li>
          </ul>

          <Callout type="warning" title="OSR 与 AR">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>AR（Assigned Replicas）</strong>：所有副本集合。<br/>
              <strong>OSR（Out-of-Sync Replicas）</strong>：滞后过多的副本集合。<br/>
              关系：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">AR = ISR + OSR</code>
            </p>
          </Callout>

          {/* ========== 六、存储引擎设计 ========== */}
          <h2 id="storage" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、存储引擎设计
          </h2>

          <h3 id="log-segment" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.1 Log Segment 结构
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 将每个 Partition 的数据划分为多个 <strong>Segment</strong>（段），每个 Segment 对应一个文件夹，包含三个文件：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>.log</strong>：数据文件，存储实际的消息内容</li>
            <li><strong>.index</strong>：偏移量索引文件，稀疏索引，加速消息查找</li>
            <li><strong>.timeindex</strong>：时间戳索引文件，支持基于时间的查询</li>
          </ul>

          <DiagramBlock title="Segment 文件结构">
            {`graph LR
              subgraph "Partition 0"
                S1["Segment 1<br/>00000000000000000000.log<br/>00000000000000000000.index<br/>00000000000000000000.timeindex"]
                S2["Segment 2<br/>00000000000000001000.log<br/>00000000000000001000.index<br/>00000000000000001000.timeindex"]
                S3["Segment 3<br/>00000000000000002000.log<br/>00000000000000002000.index<br/>00000000000000002000.timeindex"]
              end

              S1 --> S2
              S2 --> S3`}
          </DiagramBlock>

          <SideNote label="Segment 滚动">
            <p className="text-[13px] leading-[1.7]">
              当 Segment 达到 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">log.segment.bytes</code>（默认 1GB）或 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">log.roll.ms</code>（默认 7 天）时，会创建新的 Segment。
            </p>
          </SideNote>

          <h3 id="index-files" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.2 索引文件
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 使用<strong>稀疏索引</strong>来加速消息查找。索引文件中并非每条消息都有索引项，而是每隔一定字节（默认 4KB）创建一个索引项。
          </p>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            查找消息时，先通过索引找到最近的索引项，然后顺序扫描 .log 文件找到目标消息。这种设计在索引大小和查询性能之间取得了平衡。
          </p>

          {/* ========== 七、高性能原理 ========== */}
          <h2 id="zero-copy" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、高性能原理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 能够实现百万级 TPS 的关键在于三大核心技术：顺序 I/O、Page Cache 和零拷贝。
          </p>

          <h3 id="sequential-io" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            7.1 顺序 I/O
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 将消息<strong>追加写入</strong>到日志文件末尾，避免了随机 I/O 的磁头寻道开销。顺序写的性能接近内存操作，远高于随机写。
          </p>

          <Callout type="info" title="顺序写 vs 随机写">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              机械硬盘的顺序写速度约为 <strong>600 MB/s</strong>，而随机写仅为 <strong>100 KB/s</strong>，相差 6000 倍。即使是 SSD，顺序写也有明显优势。
            </p>
          </Callout>

          <h3 id="page-cache" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            7.2 Page Cache
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 直接使用操作系统的 <strong>Page Cache</strong>（页缓存），而不是 JVM 堆内存。这样做的好处是：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>避免 GC 压力</strong>：数据不在 JVM 堆中，不会触发频繁的垃圾回收</li>
            <li><strong>利用操作系统优化</strong>：OS 会自动预读和延迟写入，提升 I/O 效率</li>
            <li><strong>进程重启不丢数据</strong>：Page Cache 中的数据仍在 OS 内核中，重启后可快速恢复</li>
          </ul>

          <h3 id="zerocopy-transfer" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            7.3 零拷贝技术
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 使用 Linux 的 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">sendfile</code> 系统调用实现零拷贝，减少了数据在内核态和用户态之间的拷贝次数。
          </p>

          <DiagramBlock title="传统 I/O vs 零拷贝">
            {`graph TB
              subgraph "传统 I/O (4次拷贝 + 4次上下文切换)"
                A1["Disk → Kernel Buffer"]
                A2["Kernel Buffer → User Buffer"]
                A3["User Buffer → Socket Buffer"]
                A4["Socket Buffer → NIC Buffer"]
              end

              subgraph "零拷贝 (2次拷贝 + 2次上下文切换)"
                B1["Disk → Kernel Buffer"]
                B2["Kernel Buffer → NIC Buffer (DMA)"]
              end

              A1 --> A2
              A2 --> A3
              A3 --> A4

              B1 --> B2`}
          </DiagramBlock>

          <SideNote label="性能提升">
            <p className="text-[13px] leading-[1.7]">
              零拷贝技术使 Kafka 的网络传输性能提升了 2-3 倍，CPU 使用率降低了 50% 以上。
            </p>
          </SideNote>

          {/* ========== 八、与其他 MQ 对比 ========== */}
          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、与其他 MQ 对比
          </h2>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="px-3 py-2 text-left font-semibold text-ink">特性</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">Kafka</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">RocketMQ</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">RabbitMQ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="px-3 py-2 font-medium text-ink">吞吐量</td>
                <td className="px-3 py-2 text-ink-muted">百万级 TPS</td>
                <td className="px-3 py-2 text-ink-muted">十万级 TPS</td>
                <td className="px-3 py-2 text-ink-muted">万级 TPS</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">延迟</td>
                <td className="px-3 py-2 text-ink-muted">毫秒级</td>
                <td className="px-3 py-2 text-ink-muted">毫秒级</td>
                <td className="px-3 py-2 text-ink-muted">微秒级</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">可靠性</td>
                <td className="px-3 py-2 text-ink-muted">高（副本机制）</td>
                <td className="px-3 py-2 text-ink-muted">高（主从同步）</td>
                <td className="px-3 py-2 text-ink-muted">中（镜像队列）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">消息堆积</td>
                <td className="px-3 py-2 text-ink-muted">优秀（持久化磁盘）</td>
                <td className="px-3 py-2 text-ink-muted">优秀（持久化磁盘）</td>
                <td className="px-3 py-2 text-ink-muted">一般（内存为主）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">适用场景</td>
                <td className="px-3 py-2 text-ink-muted">日志收集、大数据管道</td>
                <td className="px-3 py-2 text-ink-muted">金融交易、订单处理</td>
                <td className="px-3 py-2 text-ink-muted">即时通讯、路由分发</td>
              </tr>
            </tbody>
          </table>

          {/* ========== 九、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1：Kafka 消息一定会丢失">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>Kafka 通过 ACK 机制、副本同步、幂等性等特性可以实现 Exactly-Once 语义，消息不会丢失。但需要正确配置参数（如 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">acks=all</code>、<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">enable.idempotence=true</code>）。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：Partition 越多越好">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>Partition 过多会导致：① 文件句柄耗尽；② Leader 选举时间变长；③ Consumer Rebalance 耗时增加。应根据实际需求合理设置，通常每个 Broker 承载 2000-4000 个 Partition 为宜。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：Kafka 只能用于日志收集">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>Kafka 是一个通用的流处理平台，除了日志收集，还广泛应用于：① 实时数据管道；② 事件驱动架构；③ 用户行为追踪；④ 指标监控；⑤ 流式 ETL 等场景。
            </p>
          </Callout>

          {/* ========== 十、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'Kafka 为什么这么快？',
                answer: 'Kafka 的高性能主要来自三个方面：\n\n1. **顺序 I/O**：消息追加写入日志文件，避免随机 I/O 的磁头寻道开销。\n\n2. **Page Cache**：直接使用操作系统的页缓存，避免 JVM GC 压力，利用 OS 的预读和延迟写入优化。\n\n3. **零拷贝技术**：使用 sendfile 系统调用，减少数据在内核态和用户态之间的拷贝次数，从 4 次拷贝降低到 2 次。\n\n此外，批量发送、数据压缩、分区并行等机制也进一步提升了性能。',
              },
              {
                question: 'Kafka 如何保证消息不丢失？',
                answer: 'Kafka 通过以下机制保证消息可靠性：\n\n1. **生产者端**：设置 `acks=all`，确保所有 ISR 副本都确认后才认为发送成功；启用幂等性（`enable.idempotence=true`）防止重复发送。\n\n2. **Broker 端**：配置足够的副本数（`replication.factor >= 3`）；确保 `min.insync.replicas >= 2`，保证至少有 2 个副本同步成功。\n\n3. **消费者端**：手动提交 Offset，在业务逻辑执行成功后再提交，避免消费失败但 Offset 已提交的情况。\n\n4. **事务支持**：使用 Kafka 事务实现 Exactly-Once 语义，确保消息既不丢失也不重复。',
              },
              {
                question: 'Kafka 的 ISR 机制是什么？有什么作用？',
                answer: 'ISR（In-Sync Replicas）是与 Leader 保持同步的副本集合。\n\n**判断标准**：Follower 落后 Leader 的时间不超过 `replica.lag.time.max.ms`（默认 30 秒）。\n\n**作用**：\n1. **Leader 选举**：只有 ISR 中的副本才有资格被选举为新的 Leader，保证数据不丢失。\n2. **ACK 机制**：当 `acks=all` 时，需要等待所有 ISR 副本确认后才返回成功。\n3. **动态调整**：Follower 滞后过多会被移出 ISR，追上后重新加入，确保同步质量。',
              },
              {
                question: 'Kafka 如何实现零拷贝？',
                answer: 'Kafka 使用 Linux 的 `sendfile` 系统调用实现零拷贝。\n\n**传统 I/O**：数据需要经过 4 次拷贝和 4 次上下文切换：\n- Disk → Kernel Buffer → User Buffer → Socket Buffer → NIC Buffer\n\n**零拷贝**：数据只需要 2 次拷贝和 2 次上下文切换：\n- Disk → Kernel Buffer → NIC Buffer（通过 DMA 直接传输）\n\nKafka 在发送消息给 Consumer 时，直接从 Page Cache 读取数据，通过 `sendfile` 发送到网络 socket，避免了数据在用户态和内核态之间的来回拷贝，显著提升了性能。',
              },
              {
                question: 'Kafka 中 ZooKeeper 的作用是什么？KRaft 模式有何改进？',
                answer: '**ZooKeeper 的作用**：\n1. **元数据存储**：存储 Topic 配置、Partition 状态、Consumer Offset 等。\n2. **Controller 选举**：通过临时节点实现 Controller 选举。\n3. **Broker 注册**：Broker 启动时在 ZK 中创建临时节点，故障时自动删除。\n\n**KRaft 模式的改进**：\n1. **去除 ZooKeeper 依赖**：元数据存储在内部的 `__cluster_metadata` Topic 中。\n2. **Raft 共识算法**：使用 Raft 协议保证元数据一致性，替代 ZK 的 ZAB 协议。\n3. **性能提升**：消除了 ZK 的性能瓶颈，支持更大规模的集群。\n4. **简化运维**：只需维护一套 Kafka 集群，降低了运维复杂度。',
              },
            ]}
          />

          {/* ========== 十一、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>

          <ul className="space-y-3 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
            <li>
              <strong>前置知识：</strong>本文是 Kafka 系列的入门篇，建议先了解分布式系统基础概念。
            </li>
            <li>
              <strong>下一篇：</strong><a href="/docs/kafka/kafka-producer-consumer" className="text-accent hover:underline">Kafka 生产者与消费者</a>，深入学习 Producer 的发送机制和 Consumer 的消费策略。
            </li>
            <li>
              <strong>相关知识点：</strong>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><a href="/docs/kafka/kafka-reliability" className="text-accent hover:underline">Kafka 消息可靠性保证</a>：ACK 机制、事务、幂等性详解</li>
                <li><a href="/docs/kafka/kafka-performance-tuning" className="text-accent hover:underline">Kafka 性能调优</a>：批量发送、压缩算法、参数调优</li>
                <li><a href="/docs/rocketmq/rocketmq-architecture" className="text-accent hover:underline">RocketMQ 架构设计</a>：对比学习不同 MQ 的设计思路</li>
              </ul>
            </li>
          </ul>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，禁止用 <aside> 包裹！组件自行管理桌面/移动端显隐 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
