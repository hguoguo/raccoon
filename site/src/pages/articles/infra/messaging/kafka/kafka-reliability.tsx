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
  { id: 'reliability-overview', text: '一、可靠性保障体系', level: 2 },
  { id: 'ack-deep-dive', text: '二、ACK 机制深度解析', level: 2 },
  { id: 'ack-implementation', text: '2.1 ACK 实现原理', level: 3 },
  { id: 'isr-mechanism', text: '三、ISR 机制详解', level: 2 },
  { id: 'isr-sync', text: '3.1 ISR 同步流程', level: 3 },
  { id: 'osr-ar', text: '3.2 OSR 与 AR', level: 3 },
  { id: 'replication', text: '四、副本同步机制', level: 2 },
  { id: 'leader-follower-sync', text: '4.1 Leader-Follower 同步', level: 3 },
  { id: 'hw-leo', text: '4.2 HW 与 LEO', level: 3 },
  { id: 'idempotence', text: '五、幂等性机制', level: 2 },
  { id: 'pid-sequence', text: '5.1 PID 与 Sequence Number', level: 3 },
  { id: 'idempotence-limitations', text: '5.2 幂等性限制', level: 3 },
  { id: 'transaction', text: '六、事务机制', level: 2 },
  { id: 'transaction-flow', text: '6.1 事务流程', level: 3 },
  { id: 'exactly-once', text: '6.2 Exactly-Once 语义', level: 3 },
  { id: 'message-loss-scenarios', text: '七、消息丢失场景分析', level: 2 },
  { id: 'producer-loss', text: '7.1 Producer 端丢失', level: 3 },
  { id: 'broker-loss', text: '7.2 Broker 端丢失', level: 3 },
  { id: 'consumer-loss', text: '7.3 Consumer 端丢失', level: 3 },
  { id: 'reliability-config', text: '八、可靠性配置最佳实践', level: 2 },
  { id: 'comparison', text: '九、与其他 MQ 可靠性对比', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function KafkaReliability({ meta }: { meta: KnowledgeNode }) {
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
              Kafka 通过<strong className="text-accent">ACK 确认、ISR 副本同步、幂等性、事务</strong>等多层机制，在保证高吞吐的同时实现消息的可靠传递，支持 At-Least-Once、At-Most-Once 和 Exactly-Once 三种语义。
            </p>
          </blockquote>

          {/* ========== 一、可靠性保障体系 ========== */}
          <h2 id="reliability-overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、可靠性保障体系
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 的可靠性保障贯穿整个消息链路，从 Producer 到 Broker 再到 Consumer，每个环节都有相应的机制。
          </p>

          <DiagramBlock title="Kafka 可靠性保障全景图">
            {`graph TB
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
              C2 --> C3`}
          </DiagramBlock>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Producer 端</strong>：幂等性、事务、重试、ACK 确认</li>
            <li><strong>Broker 端</strong>：副本复制、ISR 管理、HW 截断、持久化存储</li>
            <li><strong>Consumer 端</strong>：手动提交 Offset、幂等消费、事务消费</li>
          </ul>

          <Callout type="info" title="三种消息语义">
            <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]">
              <li><strong>At-Most-Once（最多一次）</strong>：消息可能丢失，但不会重复。适用于日志收集等允许丢失的场景。</li>
              <li><strong>At-Least-Once（至少一次）</strong>：消息不会丢失，但可能重复。适用于大多数业务场景，需在消费端实现幂等性。</li>
              <li><strong>Exactly-Once（精确一次）</strong>：消息既不丢失也不重复。适用于金融交易等对一致性要求极高的场景。</li>
            </ul>
          </Callout>

          {/* ========== 二、ACK 机制深度解析 ========== */}
          <h2 id="ack-deep-dive" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、ACK 机制深度解析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ACK 机制是 Kafka 保证消息可靠性的第一道防线，决定了 Producer 如何确认消息发送成功。
          </p>

          <h3 id="ack-implementation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 ACK 实现原理
          </h3>

          <DiagramBlock title="ACK 工作流程">
            {`sequenceDiagram
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
              end`}
          </DiagramBlock>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>关键参数：</strong>
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>acks=0</strong>：Producer 不等待任何确认，发送后立即返回。性能最高，但可能丢消息。</li>
            <li><strong>acks=1</strong>：Leader 写入成功后立即返回。如果 Leader 在 Follower 同步前故障，消息会丢失。</li>
            <li><strong>acks=all（或 -1）</strong>：Leader 和所有 ISR 中的 Follower 都写入成功后才返回。可靠性最高。</li>
          </ul>

          <SideNote label="重要提示">
            <p className="text-[13px] leading-[1.7]">
              <strong>重要提示：</strong>acks=all 必须配合 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">min.insync.replicas</code> 使用，否则当 ISR 只剩 Leader 时，acks=all 退化为 acks=1。
            </p>
          </SideNote>

          {/* ========== 三、ISR 机制详解 ========== */}
          <h2 id="isr-mechanism" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、ISR 机制详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ISR（In-Sync Replicas）是 Kafka 可靠性保障的核心机制，确保只有与 Leader 保持同步的副本才能参与选举和 ACK 确认。
          </p>

          <h3 id="isr-sync" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 ISR 同步流程
          </h3>

          <DiagramBlock title="ISR 同步机制">
            {`graph TB
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
              F2 -.->|"滞后超过阈值<br/>移出 ISR"| L`}
          </DiagramBlock>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>同步判断标准：</strong>Follower 落后 Leader 的时间不超过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">replica.lag.time.max.ms</code>（默认 30 秒）。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>动态调整</strong>：Follower 追上 Leader 后重新加入 ISR；滞后过多被移出 ISR</li>
            <li><strong>Leader 选举</strong>：只有 ISR 中的副本才有资格被选举为新的 Leader</li>
            <li><strong>ACK 确认</strong>：acks=all 时，需要等待所有 ISR 副本确认</li>
          </ul>

          <h3 id="osr-ar" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 OSR 与 AR
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 中的副本集合分为三类：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>AR（Assigned Replicas）</strong>：所有副本集合，包括 ISR 和 OSR</li>
            <li><strong>ISR（In-Sync Replicas）</strong>：与 Leader 保持同步的副本集合</li>
            <li><strong>OSR（Out-of-Sync Replicas）</strong>：滞后过多的副本集合</li>
          </ul>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            关系：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">AR = ISR + OSR</code>
          </p>

          <Callout type="warning" title="ISR 收缩风险">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              如果所有 Follower 都滞后被移出 ISR，导致 ISR 只剩 Leader，此时：
              <br/>① acks=all 退化为 acks=1，可靠性降低；
              <br/>② 如果 Leader 故障，没有可用的 Follower 选举，Partition 不可用。
              <br/><br/>
              <strong>解决方案：</strong>设置 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">min.insync.replicas=2</code>，当 ISR &lt; 2 时拒绝写入，避免数据丢失。
            </p>
          </Callout>

          {/* ========== 四、副本同步机制 ========== */}
          <h2 id="replication" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、副本同步机制
          </h2>

          <h3 id="leader-follower-sync" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 Leader-Follower 同步
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 采用 Leader-Follower 模型进行副本同步：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Leader</strong>：处理所有读写请求，维护 HW 和 LEO</li>
            <li><strong>Follower</strong>：只读，定期从 Leader 拉取数据进行同步</li>
            <li><strong>同步方式</strong>：Follower 主动发起 Fetch Request，Leader 返回最新数据</li>
          </ul>

          <h3 id="hw-leo" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 HW 与 LEO
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 使用两个重要的偏移量来管理副本同步：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>LEO（Log End Offset）</strong>：日志末尾偏移量，表示下一条待写入消息的位置</li>
            <li><strong>HW（High Watermark）</strong>：高水位，表示所有 ISR 副本都已同步的最大偏移量</li>
          </ul>

          <DiagramBlock title="HW 与 LEO 关系">
            {`graph LR
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
              style F23 fill:#90EE90`}
          </DiagramBlock>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>关键规则：</strong>
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li>Consumer 只能消费 HW 之前的消息，保证不会读到未完全同步的数据</li>
            <li>Leader 故障时，新 Leader 会截断 HW 之后的消息，保证数据一致性</li>
            <li>HW 由 Leader 定期更新，取所有 ISR 副本 LEO 的最小值</li>
          </ul>

          <SideNote label="重要提示">
            <p className="text-[13px] leading-[1.7]">
              <strong>示例：</strong>如果 Leader LEO=100，Follower1 LEO=100，Follower2 LEO=98，则 HW=min(100, 100, 98)=98。Consumer 最多只能消费到 Offset 97。
            </p>
          </SideNote>

          {/* ========== 五、幂等性机制 ========== */}
          <h2 id="idempotence" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、幂等性机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            幂等性保证 Producer 重试时不会产生重复消息。Kafka 0.11+ 引入了幂等性 Producer。
          </p>

          <h3 id="pid-sequence" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 PID 与 Sequence Number
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            幂等性通过以下两个标识实现：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>PID（Producer ID）</strong>：每个 Producer 实例的唯一标识，由 Broker 分配</li>
            <li><strong>Sequence Number</strong>：每条消息的序列号，按 Partition 递增</li>
          </ul>

          <DiagramBlock title="幂等性去重流程">
            {`sequenceDiagram
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
              B-->>P: ACK Success (Discard)`}
          </DiagramBlock>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>工作原理：</strong>Broker 为每个 PID + Partition 维护最新的 Sequence Number。收到消息时，如果 Sequence Number ≤ 已处理的最新值，判定为重复消息并丢弃。
          </p>

          <h3 id="idempotence-limitations" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 幂等性限制
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            幂等性有以下限制：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>单 Partition 有效</strong>：只能在单个 Partition 内保证幂等性，跨 Partition 无效</li>
            <li><strong>单会话有效</strong>：Producer 重启后 PID 会变化，无法检测之前会话的重复</li>
            <li><strong>有限窗口</strong>：Broker 只保留最近 5 分钟的 Sequence Number（可配置）</li>
          </ul>

          <Callout type="info" title="启用幂等性">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              设置 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">enable.idempotence=true</code> 即可启用。此时 Kafka 会自动设置：
              <br/>• <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">acks=all</code>
              <br/>• <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">retries=Integer.MAX_VALUE</code>
              <br/>• <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">max.in.flight.requests.per.connection=5</code>
            </p>
          </Callout>

          {/* ========== 六、事务机制 ========== */}
          <h2 id="transaction" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、事务机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            事务机制解决了幂等性的局限，实现了跨 Partition 和跨会话的 Exactly-Once 语义。
          </p>

          <h3 id="transaction-flow" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.1 事务流程
          </h3>

          <DiagramBlock title="Kafka 事务流程">
            {`sequenceDiagram
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
              TC-->>P: Commit Success`}
          </DiagramBlock>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>关键组件：</strong>
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Transaction Coordinator</strong>：事务协调器，管理事务状态</li>
            <li><strong>Transaction Log</strong>：事务日志，存储在 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">__transaction_state</code> Topic</li>
            <li><strong>Control Batch</strong>：控制批次，标记事务的开始和结束</li>
          </ul>

          <h3 id="exactly-once" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.2 Exactly-Once 语义
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 通过以下方式实现端到端的 Exactly-Once 语义：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Producer 端</strong>：使用事务发送消息，保证原子性</li>
            <li><strong>Broker 端</strong>：事务消息对 Consumer 不可见，直到事务提交</li>
            <li><strong>Consumer 端</strong>：设置 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">isolation.level=read_committed</code>，只读取已提交的事务消息</li>
          </ul>

          <ContextSwitcher
            simpleContent={
              <div className="space-y-3">
                <p className="text-[14px] leading-[1.8]">
                  Consumer 可以读取所有消息，包括未提交的事务消息和已中止的消息。
                </p>
                <p className="text-[14px] leading-[1.8] text-red-600">
                  <strong>缺点：</strong>可能读到脏数据，不适用于生产环境。
                </p>
              </div>
            }
            hardcoreContent={
              <div className="space-y-3">
                <p className="text-[14px] leading-[1.8]">
                  Consumer 只能读取已提交的事务消息，未提交或已中止的消息对 Consumer 不可见。
                </p>
                <p className="text-[14px] leading-[1.8] text-green-600">
                  <strong>优点：</strong>保证数据一致性，是实现 Exactly-Once 的关键配置。
                </p>
              </div>
            }
          />

          <Callout type="tip" title="Exactly-Once 配置">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>Producer 端：</strong><br/>
              <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">transactional.id=my-transaction</code><br/>
              <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">enable.idempotence=true</code>
              <br/><br/>
              <strong>Consumer 端：</strong><br/>
              <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">isolation.level=read_committed</code>
            </p>
          </Callout>

          {/* ========== 七、消息丢失场景分析 ========== */}
          <h2 id="message-loss-scenarios" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、消息丢失场景分析
          </h2>

          <h3 id="producer-loss" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            7.1 Producer 端丢失
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>acks=0</strong>：发送后不等待确认，网络故障导致消息丢失</li>
            <li><strong>缓冲区满</strong>：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">buffer.memory</code> 耗尽且 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">max.block.ms</code> 超时</li>
            <li><strong>重试次数耗尽</strong>：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">retries</code> 用尽后放弃发送</li>
          </ul>

          <h3 id="broker-loss" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            7.2 Broker 端丢失
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>acks=1 + Leader 故障</strong>：Leader 写入成功但 Follower 未同步，Leader 故障后消息丢失</li>
            <li><strong>unclean.leader.election.enable=true</strong>：非 ISR 副本被选举为 Leader，导致数据回滚</li>
            <li><strong>磁盘故障</strong>：所有副本所在的磁盘同时损坏（概率极低）</li>
          </ul>

          <h3 id="consumer-loss" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            7.3 Consumer 端丢失
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>自动提交 Offset</strong>：poll 后立即提交，但处理失败，导致消息丢失</li>
            <li><strong>Rebalance</strong>：重平衡期间未提交 Offset，新 Consumer 从旧位置开始消费，跳过部分消息</li>
            <li><strong>消费异常</strong>：处理消息时抛出异常但未捕获，Offset 已提交</li>
          </ul>

          <Callout type="danger" title="典型丢失场景">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>场景：</strong>acks=1，replication.factor=3，min.insync.replicas=1。<br/>
              <strong>过程：</strong>Leader 写入成功后返回 ACK，此时 Follower 正在同步。Leader 突然宕机，触发选举，新的 Leader 是从旧的 Follower 中选出的，缺少刚才写入的消息。<br/>
              <strong>解决：</strong>设置 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">acks=all</code> + <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">min.insync.replicas=2</code>。
            </p>
          </Callout>

          {/* ========== 八、可靠性配置最佳实践 ========== */}
          <h2 id="reliability-config" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、可靠性配置最佳实践
          </h2>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="px-3 py-2 text-left font-semibold text-ink">组件</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">参数</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">推荐值</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="px-3 py-2 font-medium text-ink" rowSpan={4}>Producer</td>
                <td className="px-3 py-2 font-mono text-[12px] text-ink-muted">acks</td>
                <td className="px-3 py-2 text-ink-muted">all</td>
                <td className="px-3 py-2 text-ink-muted">等待所有 ISR 确认</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-[12px] text-ink-muted">enable.idempotence</td>
                <td className="px-3 py-2 text-ink-muted">true</td>
                <td className="px-3 py-2 text-ink-muted">启用幂等性</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-[12px] text-ink-muted">retries</td>
                <td className="px-3 py-2 text-ink-muted">Integer.MAX_VALUE</td>
                <td className="px-3 py-2 text-ink-muted">无限重试</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-[12px] text-ink-muted">transactional.id</td>
                <td className="px-3 py-2 text-ink-muted">自定义</td>
                <td className="px-3 py-2 text-ink-muted">启用事务（需要 Exactly-Once 时）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink" rowSpan={3}>Broker</td>
                <td className="px-3 py-2 font-mono text-[12px] text-ink-muted">replication.factor</td>
                <td className="px-3 py-2 text-ink-muted">≥ 3</td>
                <td className="px-3 py-2 text-ink-muted">副本数</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-[12px] text-ink-muted">min.insync.replicas</td>
                <td className="px-3 py-2 text-ink-muted">2</td>
                <td className="px-3 py-2 text-ink-muted">最小同步副本数</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-[12px] text-ink-muted">unclean.leader.election.enable</td>
                <td className="px-3 py-2 text-ink-muted">false</td>
                <td className="px-3 py-2 text-ink-muted">禁止非 ISR 选举</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink" rowSpan={2}>Consumer</td>
                <td className="px-3 py-2 font-mono text-[12px] text-ink-muted">enable.auto.commit</td>
                <td className="px-3 py-2 text-ink-muted">false</td>
                <td className="px-3 py-2 text-ink-muted">手动提交 Offset</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-[12px] text-ink-muted">isolation.level</td>
                <td className="px-3 py-2 text-ink-muted">read_committed</td>
                <td className="px-3 py-2 text-ink-muted">只读已提交消息</td>
              </tr>
            </tbody>
          </table>

          {/* ========== 九、与其他 MQ 可靠性对比 ========== */}
          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、与其他 MQ 可靠性对比
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
                <td className="px-3 py-2 font-medium text-ink">副本机制</td>
                <td className="px-3 py-2 text-ink-muted">ISR + HW</td>
                <td className="px-3 py-2 text-ink-muted">主从同步 + Dledger</td>
                <td className="px-3 py-2 text-ink-muted">镜像队列</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">事务支持</td>
                <td className="px-3 py-2 text-ink-muted">✅ 完整支持</td>
                <td className="px-3 py-2 text-ink-muted">✅ 事务消息</td>
                <td className="px-3 py-2 text-ink-muted">❌ 不支持</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">幂等性</td>
                <td className="px-3 py-2 text-ink-muted">✅ PID + Sequence</td>
                <td className="px-3 py-2 text-ink-muted">✅ 业务层实现</td>
                <td className="px-3 py-2 text-ink-muted">❌ 需业务层实现</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">Exactly-Once</td>
                <td className="px-3 py-2 text-ink-muted">✅ 端到端支持</td>
                <td className="px-3 py-2 text-ink-muted">⚠️ 半消息事务</td>
                <td className="px-3 py-2 text-ink-muted">❌ 不支持</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">持久化</td>
                <td className="px-3 py-2 text-ink-muted">顺序写磁盘</td>
                <td className="px-3 py-2 text-ink-muted">CommitLog</td>
                <td className="px-3 py-2 text-ink-muted">内存 + 异步刷盘</td>
              </tr>
            </tbody>
          </table>

          {/* ========== 十、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="danger" title="误区 1：acks=all 就万无一失">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>acks=all 只保证 ISR 中的副本都确认，但如果 ISR 只剩 Leader（其他 Follower 都滞后被移出），acks=all 退化为 acks=1。必须配合 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">min.insync.replicas=2</code> 使用。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：幂等性可以保证全局不重复">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>幂等性只在<strong>单 Partition</strong>内有效，跨 Partition 无效。如果需要跨 Partition 的 Exactly-Once，必须使用事务机制。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：事务性能很差，不能用">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>事务确实会带来性能开销（约 20%-30%），但对于金融交易等关键场景，这是必须的代价。可以通过批量提交事务、优化事务粒度等方式减轻影响。
            </p>
          </Callout>

          {/* ========== 十一、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'Kafka 如何保证消息不丢失？',
                answer: 'Kafka 通过多层机制保证消息可靠性：\n\n**Producer 端**：\n1. 设置 `acks=all`，等待所有 ISR 副本确认。\n2. 启用幂等性（`enable.idempotence=true`），防止重复发送。\n3. 设置 `retries=Integer.MAX_VALUE`，无限重试直到成功。\n\n**Broker 端**：\n1. 配置 `replication.factor>=3`，保证足够的副本数。\n2. 设置 `min.insync.replicas=2`，确保至少有 2 个副本同步成功。\n3. 禁用 `unclean.leader.election.enable=false`，防止非 ISR 副本选举为 Leader。\n\n**Consumer 端**：\n1. 关闭自动提交（`enable.auto.commit=false`）。\n2. 手动提交 Offset，在业务逻辑执行成功后再提交。\n3. 实现幂等消费，防止重复处理。',
              },
              {
                question: '解释一下 Kafka 的 ISR 机制和 HW、LEO 的作用。',
                answer: '**ISR（In-Sync Replicas）**：与 Leader 保持同步的副本集合。判断标准是 Follower 落后 Leader 的时间不超过 `replica.lag.time.max.ms`（默认 30 秒）。\n\n**作用**：\n1. **Leader 选举**：只有 ISR 中的副本才有资格被选举为新的 Leader，保证数据不丢失。\n2. **ACK 确认**：acks=all 时，需要等待所有 ISR 副本确认。\n\n**LEO（Log End Offset）**：日志末尾偏移量，表示下一条待写入消息的位置。\n\n**HW（High Watermark）**：高水位，表示所有 ISR 副本都已同步的最大偏移量。Consumer 只能消费 HW 之前的消息，保证不会读到未完全同步的数据。\n\n**关系**：HW = min(所有 ISR 副本的 LEO)。Leader 故障时，新 Leader 会截断 HW 之后的消息，保证数据一致性。',
              },
              {
                question: 'Kafka 的幂等性和事务有什么区别？',
                answer: '**幂等性**：\n- **范围**：单 Partition 内有效，跨 Partition 无效。\n- **实现**：通过 PID（Producer ID）和 Sequence Number 去重。\n- **会话**：单会话有效，Producer 重启后 PID 变化，无法检测之前的重复。\n- **适用场景**：防止网络超时重试导致的重复发送。\n\n**事务**：\n- **范围**：跨 Partition、跨会话有效。\n- **实现**：通过 Transaction Coordinator 和两阶段提交协议。\n- **会话**：通过 `transactional.id` 标识，重启后可恢复事务状态。\n- **适用场景**：实现端到端的 Exactly-Once 语义，如跨多个 Topic 的原子操作。\n\n**总结**：幂等性是事务的基础，事务是幂等性的扩展。启用事务时会自动启用幂等性。',
              },
              {
                question: '什么情况下 Kafka 会丢失消息？如何避免？',
                answer: '**丢失场景**：\n\n1. **Producer 端**：acks=0 或不重试。→ 解决：设置 `acks=all` + `retries=Integer.MAX_VALUE`。\n\n2. **Broker 端**：acks=1 且 Leader 故障，或非 ISR 选举。→ 解决：`acks=all` + `min.insync.replicas=2` + `unclean.leader.election.enable=false`。\n\n3. **Consumer 端**：自动提交 Offset 后处理失败。→ 解决：手动提交 Offset，业务成功后再提交。\n\n**最佳实践**：\n- Producer：`acks=all` + `enable.idempotence=true` + `retries=Integer.MAX_VALUE`\n- Broker：`replication.factor=3` + `min.insync.replicas=2`\n- Consumer：`enable.auto.commit=false` + 手动提交 + 幂等消费',
              },
              {
                question: 'Kafka 如何实现 Exactly-Once 语义？',
                answer: 'Kafka 通过以下方式实现端到端的 Exactly-Once 语义：\n\n**Producer 端**：\n1. 设置 `transactional.id`，启用事务。\n2. 使用 `beginTransaction()`、`sendMessages()`、`commitTransaction()` 包裹发送逻辑。\n3. 自动启用幂等性（`enable.idempotence=true`）。\n\n**Broker 端**：\n1. Transaction Coordinator 管理事务状态。\n2. 事务消息对 Consumer 不可见，直到事务提交。\n3. 通过 Control Batch 标记事务边界。\n\n**Consumer 端**：\n1. 设置 `isolation.level=read_committed`，只读取已提交的事务消息。\n2. 在事务中处理消息并提交 Offset，保证原子性。\n\n**注意**：事务会带来性能开销（约 20%-30%），仅在需要强一致性的场景使用。',
              },
            ]}
          />

          {/* ========== 十二、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>

          <ul className="space-y-3 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
            <li>
              <strong>前置知识：</strong>建议先阅读 <a href="/docs/kafka/kafka-architecture" className="text-accent hover:underline">Kafka 架构与核心概念</a> 和 <a href="/docs/kafka/kafka-producer-consumer" className="text-accent hover:underline">Kafka 生产者与消费者</a>。
            </li>
            <li>
              <strong>下一篇：</strong><a href="/docs/kafka/kafka-streams" className="text-accent hover:underline">Kafka Streams 流处理</a>，学习如何基于 Kafka 构建实时流式应用。
            </li>
            <li>
              <strong>相关知识点：</strong>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><a href="/docs/kafka/kafka-performance-tuning" className="text-accent hover:underline">Kafka 性能调优</a>：在可靠性和性能之间找到平衡</li>
                <li><a href="/docs/rocketmq/rocketmq-reliability" className="text-accent hover:underline">RocketMQ 消息可靠性</a>：对比学习不同 MQ 的可靠性设计</li>
                <li><a href="/docs/backend/java/08-microservices/distributed-transaction" className="text-accent hover:underline">分布式事务</a>：理解事务在分布式系统中的应用</li>
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
