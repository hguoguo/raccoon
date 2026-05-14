import KnowledgeLayout from '../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../components/knowledge/Playground'
import InteractiveFlow from '../../../../components/knowledge/InteractiveFlow'
import SideNote from '../../../../components/knowledge/SideNote'
import ContextSwitcher from '../../../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../../../components/knowledge/SmartTOC'
import Callout from '../../../../components/ui/Callout'
import DiagramBlock from '../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'producer-overview', text: '一、Producer 核心架构', level: 2 },
  { id: 'producer-components', text: '1.1 核心组件', level: 3 },
  { id: 'send-flow', text: '二、消息发送流程', level: 2 },
  { id: 'serialization', text: '2.1 序列化机制', level: 3 },
  { id: 'partition-strategy', text: '2.2 分区策略', level: 3 },
  { id: 'batching', text: '2.3 批量发送', level: 3 },
  { id: 'ack-mechanism', text: '三、ACK 确认机制', level: 2 },
  { id: 'ack-levels', text: '3.1 ACK 级别详解', level: 3 },
  { id: 'reliability-config', text: '3.2 可靠性配置', level: 3 },
  { id: 'consumer-overview', text: '四、Consumer 核心架构', level: 2 },
  { id: 'consumer-types', text: '4.1 消费者类型', level: 3 },
  { id: 'poll-model', text: '五、Pull 消费模型', level: 2 },
  { id: 'offset-management', text: '六、Offset 管理', level: 2 },
  { id: 'auto-commit', text: '6.1 自动提交', level: 3 },
  { id: 'manual-commit', text: '6.2 手动提交', level: 3 },
  { id: 'rebalance', text: '七、Rebalance 机制', level: 2 },
  { id: 'rebalance-trigger', text: '7.1 触发条件', level: 3 },
  { id: 'rebalance-protocol', text: '7.2 重平衡协议', level: 3 },
  { id: 'consumer-group-coordinator', text: '八、Consumer Group Coordinator', level: 2 },
  { id: 'comparison', text: '九、Producer vs Consumer 对比', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function KafkaProducerConsumer({ meta }: { meta: KnowledgeNode }) {
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
              Kafka Producer 负责将消息<strong className="text-accent">序列化、分区、批量</strong>后发送到 Broker；Consumer 通过<strong className="text-accent">Pull 模式</strong>从 Broker 拉取消息，通过 Offset 管理消费进度，支持自动/手动提交和 Consumer Group 负载均衡。
            </p>
          </blockquote>

          {/* ========== 一、Producer 核心架构 ========== */}
          <h2 id="producer-overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Producer 核心架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka Producer 是线程安全的，采用异步发送模式。其核心设计目标是：<strong>高吞吐、低延迟、可靠性</strong>。
          </p>

          <h3 id="producer-components" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.1 核心组件
          </h3>

          <DiagramBlock title="Producer 内部架构">
            {`graph TB
              APP["Application"] -->|"send()"| PRODUCER["KafkaProducer"]
              
              PRODUCER --> INTERCEPTOR["Interceptor<br/>拦截器"]
              INTERCEPTOR --> SERIALIZER["Serializer<br/>序列化器"]
              SERIALIZER --> PARTITIONER["Partitioner<br/>分区器"]
              
              PARTITIONER --> RM["RecordAccumulator<br/>记录收集器"]
              RM -->|"Batch"| SENDER["Sender 线程"]
              
              SENDER --> NETWORK["NetworkClient<br/>网络客户端"]
              NETWORK --> BROKER["Broker Cluster"]
              
              METADATA["Metadata<br/>元数据管理器"] -.->|"Update"| PRODUCER
              METADATA -.->|"Fetch"| NETWORK`}
          </DiagramBlock>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Serializer（序列化器）</strong>：将 key/value 序列化为字节数组，支持 String、JSON、Avro 等格式</li>
            <li><strong>Partitioner（分区器）</strong>：决定消息发送到哪个 Partition，支持自定义策略</li>
            <li><strong>RecordAccumulator（记录收集器）</strong>：缓冲消息，形成 Batch，提升发送效率</li>
            <li><strong>Sender 线程</strong>：后台线程，负责从 RecordAccumulator 取出 Batch 并发送到 Broker</li>
            <li><strong>Metadata（元数据管理器）</strong>：缓存集群元数据（Topic、Partition、Leader 等信息）</li>
          </ul>

          <SideNote side="right">
            <p className="text-[13px] leading-[1.7]">
              <strong>关键设计：</strong>Producer 使用双缓冲区设计，一个缓冲区接收新消息，另一个缓冲区由 Sender 线程发送，实现生产与发送的解耦。
            </p>
          </SideNote>

          {/* ========== 二、消息发送流程 ========== */}
          <h2 id="send-flow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、消息发送流程
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Producer 发送消息的完整流程如下：
          </p>

          <InteractiveFlow
            steps={[
              {
                title: '1. 拦截器处理',
                description: '消息经过 ProducerInterceptor 链，可以修改消息内容或记录监控指标。',
              },
              {
                title: '2. 序列化',
                description: '通过 Serializer 将 key 和 value 序列化为 byte[]，默认使用 StringSerializer。',
              },
              {
                title: '3. 分区选择',
                description: 'Partitioner 根据 key 或轮询策略确定目标 Partition。如果指定了 key，使用 hash(key) % partitionCount；否则轮询分配。',
              },
              {
                title: '4. 追加到 Batch',
                description: '消息被追加到 RecordAccumulator 中对应的 Batch。如果当前 Batch 已满或超时，创建新的 Batch。',
              },
              {
                title: '5. Sender 线程发送',
                description: 'Sender 线程从 RecordAccumulator 取出可发送的 Batch，封装成 Request 通过网络客户端发送到 Broker Leader。',
              },
              {
                title: '6. 等待 ACK',
                description: '根据 acks 配置等待 Broker 确认。收到响应后调用 Callback 通知应用层。',
              },
            ]}
          />

          <h3 id="serialization" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 序列化机制
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 支持多种序列化方式，开发者可以实现自定义 Serializer。
          </p>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="px-3 py-2 text-left font-semibold text-ink">序列化器</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">适用场景</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">性能</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="px-3 py-2 font-medium text-ink">StringSerializer</td>
                <td className="px-3 py-2 text-ink-muted">字符串消息</td>
                <td className="px-3 py-2 text-ink-muted">快</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">ByteArraySerializer</td>
                <td className="px-3 py-2 text-ink-muted">二进制数据</td>
                <td className="px-3 py-2 text-ink-muted">最快</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">JsonSerializer</td>
                <td className="px-3 py-2 text-ink-muted">JSON 格式消息</td>
                <td className="px-3 py-2 text-ink-muted">中等</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">AvroSerializer</td>
                <td className="px-3 py-2 text-ink-muted">Schema 演进场景</td>
                <td className="px-3 py-2 text-ink-muted">较慢（需 Schema Registry）</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="序列化最佳实践">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              对于高性能场景，建议使用 Protobuf 或 Avro 等二进制序列化协议，相比 JSON 可减少 50%-80% 的消息体积，显著提升吞吐量。
            </p>
          </Callout>

          <h3 id="partition-strategy" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 分区策略
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 提供三种分区策略：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>指定 Partition</strong>：直接在 ProducerRecord 中指定 partition，优先级最高</li>
            <li><strong>按 Key 哈希</strong>：如果指定了 key，计算 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">hash(key) % numPartitions</code>，保证相同 key 的消息进入同一 Partition（有序性）</li>
            <li><strong>轮询（Round-Robin）</strong>：未指定 key 时，依次分配到各个 Partition，实现负载均衡</li>
          </ul>

          <ContextSwitcher
            scenarios={[
              {
                label: '按 Key 分区',
                content: (
                  <div className="space-y-3">
                    <p className="text-[14px] leading-[1.8]">
                      <strong>适用场景：</strong>需要保证消息顺序性，如订单状态变更、用户行为追踪。
                    </p>
                    <pre className="bg-parchment-deep p-3 rounded-paper-sm text-[13px] overflow-x-auto">
{`// 相同 orderId 的消息会进入同一 Partition
ProducerRecord<String, String> record = 
    new ProducerRecord<>("orders", orderId, orderData);
producer.send(record);`}
                    </pre>
                    <p className="text-[14px] leading-[1.8] text-green-600">
                      <strong>优点：</strong>保证局部有序；<strong>缺点：</strong>可能导致数据倾斜（热点 key）。
                    </p>
                  </div>
                ),
              },
              {
                label: '轮询分区',
                content: (
                  <div className="space-y-3">
                    <p className="text-[14px] leading-[1.8]">
                      <strong>适用场景：</strong>日志收集、指标上报等无需顺序性的场景。
                    </p>
                    <pre className="bg-parchment-deep p-3 rounded-paper-sm text-[13px] overflow-x-auto">
{`// 未指定 key，自动轮询分配
ProducerRecord<String, String> record = 
    new ProducerRecord<>("logs", logData);
producer.send(record);`}
                    </pre>
                    <p className="text-[14px] leading-[1.8] text-green-600">
                      <strong>优点：</strong>负载均衡好；<strong>缺点：</strong>无法保证顺序。
                    </p>
                  </div>
                ),
              },
            ]}
          />

          <h3 id="batching" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.3 批量发送
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Producer 会将多条消息打包成一个 <strong>Batch</strong> 一起发送，减少网络请求次数，提升吞吐量。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>batch.size</strong>：Batch 大小上限，默认 16KB。达到此值立即发送</li>
            <li><strong>linger.ms</strong>：等待时间，默认 0ms。设置后可累积更多消息再发送（牺牲延迟换吞吐）</li>
            <li><strong>compression.type</strong>：压缩算法，支持 gzip、snappy、lz4、zstd，减少网络传输量</li>
          </ul>

          <Callout type="success" title="批量发送优化建议">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              对于高吞吐场景，建议设置 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">linger.ms=5-10</code>，让 Batch 更充分；同时启用压缩（推荐 lz4），可在几乎不增加 CPU 开销的情况下减少 50% 以上的网络流量。
            </p>
          </Callout>

          {/* ========== 三、ACK 确认机制 ========== */}
          <h2 id="ack-mechanism" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、ACK 确认机制
          </h2>

          <h3 id="ack-levels" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 ACK 级别详解
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ACK 机制决定了 Producer 如何确认消息发送成功，直接影响可靠性和性能。
          </p>

          <DiagramBlock title="ACK 级别对比">
            {`graph TB
              subgraph "acks=0（不等待确认）"
                A1["Producer 发送"]
                A2["直接返回成功"]
                A1 --> A2
              end

              subgraph "acks=1（Leader 确认）"
                B1["Producer 发送"]
                B2["Leader 写入"]
                B3["返回成功"]
                B1 --> B2
                B2 --> B3
              end

              subgraph "acks=all（所有 ISR 确认）"
                C1["Producer 发送"]
                C2["Leader 写入"]
                C3["Follower 同步"]
                C4["所有 ISR 确认"]
                C5["返回成功"]
                C1 --> C2
                C2 --> C3
                C3 --> C4
                C4 --> C5
              end`}
          </DiagramBlock>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="px-3 py-2 text-left font-semibold text-ink">ACK 级别</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">可靠性</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">性能</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">适用场景</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="px-3 py-2 font-medium text-ink">acks=0</td>
                <td className="px-3 py-2 text-ink-muted">最低（可能丢消息）</td>
                <td className="px-3 py-2 text-ink-muted">最高</td>
                <td className="px-3 py-2 text-ink-muted">日志收集（允许丢失）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">acks=1</td>
                <td className="px-3 py-2 text-ink-muted">中等（Leader 故障会丢）</td>
                <td className="px-3 py-2 text-ink-muted">较高</td>
                <td className="px-3 py-2 text-ink-muted">一般业务场景</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">acks=all</td>
                <td className="px-3 py-2 text-ink-muted">最高（ISR 全部确认）</td>
                <td className="px-3 py-2 text-ink-muted">最低</td>
                <td className="px-3 py-2 text-ink-muted">金融交易、订单处理</td>
              </tr>
            </tbody>
          </table>

          <h3 id="reliability-config" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 可靠性配置
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            要实现 Exactly-Once 语义，需要综合配置以下参数：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>acks=all</strong>：确保所有 ISR 副本都确认</li>
            <li><strong>enable.idempotence=true</strong>：启用幂等性，防止重复发送</li>
            <li><strong>retries=Integer.MAX_VALUE</strong>：无限重试，确保消息最终发送成功</li>
            <li><strong>max.in.flight.requests.per.connection=5</strong>：限制单连接未完成请求数（幂等性要求 ≤ 5）</li>
            <li><strong>min.insync.replicas=2</strong>：Broker 端配置，确保至少有 2 个副本同步</li>
          </ul>

          <Callout type="warning" title="幂等性限制">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              启用幂等性后，Producer 只能保证<strong>单 Partition</strong>内的消息不重复。跨 Partition 的幂等性需要使用事务机制。
            </p>
          </Callout>

          {/* ========== 四、Consumer 核心架构 ========== */}
          <h2 id="consumer-overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Consumer 核心架构
          </h2>

          <h3 id="consumer-types" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 消费者类型
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka Consumer 分为两种类型：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>KafkaConsumer</strong>：高级 API，自动管理 Offset、Rebalance，适合大多数场景</li>
            <li><strong>Manual Assignment</strong>：手动分配 Partition，不使用 Consumer Group，适合特殊需求（如回放历史数据）</li>
          </ul>

          <DiagramBlock title="Consumer Group 架构">
            {`graph TB
              subgraph "Topic: events (4 Partitions)"
                P0["Partition 0"]
                P1["Partition 1"]
                P2["Partition 2"]
                P3["Partition 3"]
              end

              subgraph "Consumer Group A (2 Consumers)"
                CA1["Consumer A1<br/>消费 P0, P1"]
                CA2["Consumer A2<br/>消费 P2, P3"]
              end

              subgraph "Consumer Group B (4 Consumers)"
                CB1["Consumer B1<br/>消费 P0"]
                CB2["Consumer B2<br/>消费 P1"]
                CB3["Consumer B3<br/>消费 P2"]
                CB4["Consumer B4<br/>消费 P3"]
              end

              P0 --> CA1
              P1 --> CA1
              P2 --> CA2
              P3 --> CA2

              P0 --> CB1
              P1 --> CB2
              P2 --> CB3
              P3 --> CB4`}
          </DiagramBlock>

          <SideNote side="right">
            <p className="text-[13px] leading-[1.7]">
              <strong>关键规则：</strong>同一 Consumer Group 内，每个 Partition 只能被一个 Consumer 消费；但不同 Group 可以独立消费同一 Topic（发布-订阅模式）。
            </p>
          </SideNote>

          {/* ========== 五、Pull 消费模型 ========== */}
          <h2 id="poll-model" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Pull 消费模型
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka Consumer 采用 <strong>Pull（拉取）</strong>模式，而非 Push（推送）。这样做的好处是：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>流量控制</strong>：Consumer 根据自身处理能力控制拉取速度，避免背压问题</li>
            <li><strong>批量消费</strong>：一次 poll 可以拉取多条消息，提升处理效率</li>
            <li><strong>灵活性</strong>：Consumer 可以动态调整拉取批次大小和频率</li>
          </ul>

          <Callout type="info" title="Poll 循环示例">
            <pre className="bg-parchment-deep p-3 rounded-paper-sm text-[13px] overflow-x-auto">
{`KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Collections.singletonList("orders"));

while (true) {
    // 拉取消息，超时时间 100ms
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    
    for (ConsumerRecord<String, String> record : records) {
        // 处理消息
        processOrder(record.value());
    }
    
    // 手动提交 Offset
    consumer.commitSync();
}`}
            </pre>
          </Callout>

          {/* ========== 六、Offset 管理 ========== */}
          <h2 id="offset-management" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、Offset 管理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Offset 是 Consumer 消费进度的标识，Kafka 将 Offset 存储在内部的 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">__consumer_offsets</code> Topic 中。
          </p>

          <h3 id="auto-commit" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.1 自动提交
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            启用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">enable.auto.commit=true</code>（默认值）后，Consumer 会定期自动提交 Offset。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>提交频率</strong>：由 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">auto.commit.interval.ms</code> 控制，默认 5 秒</li>
            <li><strong>优点</strong>：简单易用，无需手动管理</li>
            <li><strong>缺点</strong>：可能出现消息丢失（提交后处理失败）或重复消费（处理成功但未提交）</li>
          </ul>

          <h3 id="manual-commit" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.2 手动提交
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            设置 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">enable.auto.commit=false</code> 后，需要手动调用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">commitSync()</code> 或 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">commitAsync()</code>。
          </p>

          <ContextSwitcher
            scenarios={[
              {
                label: '同步提交',
                content: (
                  <div className="space-y-3">
                    <p className="text-[14px] leading-[1.8]">
                      <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">commitSync()</code> 会阻塞直到提交成功或抛出异常。
                    </p>
                    <pre className="bg-parchment-deep p-3 rounded-paper-sm text-[13px] overflow-x-auto">
{`try {
    processMessage(record);
    consumer.commitSync(); // 阻塞等待
} catch (CommitFailedException e) {
    // 处理提交失败
    log.error("Commit failed", e);
}`}
                    </pre>
                    <p className="text-[14px] leading-[1.8]">
                      <strong>优点：</strong>可靠性高；<strong>缺点：</strong>影响吞吐量。
                    </p>
                  </div>
                ),
              },
              {
                label: '异步提交',
                content: (
                  <div className="space-y-3">
                    <p className="text-[14px] leading-[1.8]">
                      <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">commitAsync()</code> 立即返回，通过回调处理结果。
                    </p>
                    <pre className="bg-parchment-deep p-3 rounded-paper-sm text-[13px] overflow-x-auto">
{`consumer.commitAsync((offsets, exception) -> {
    if (exception != null) {
        log.error("Commit failed for offsets {}", offsets, exception);
    }
});`}
                    </pre>
                    <p className="text-[14px] leading-[1.8]">
                      <strong>优点：</strong>不阻塞，吞吐量高；<strong>缺点：</strong>失败时需自行处理重试。
                    </p>
                  </div>
                ),
              },
            ]}
          />

          <Callout type="warning" title="精确一次处理">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              要实现 Exactly-Once 语义，需要在<strong>业务逻辑执行成功后</strong>再提交 Offset。可以将 Offset 与业务数据一起存储到外部数据库，利用事务保证原子性。
            </p>
          </Callout>

          {/* ========== 七、Rebalance 机制 ========== */}
          <h2 id="rebalance" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、Rebalance 机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Rebalance 是 Consumer Group 重新分配 Partition 的过程，发生在以下场景：
          </p>

          <h3 id="rebalance-trigger" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            7.1 触发条件
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Consumer 加入</strong>：新的 Consumer 启动并加入 Group</li>
            <li><strong>Consumer 离开</strong>：Consumer 主动关闭或崩溃（超过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">session.timeout.ms</code> 未心跳）</li>
            <li><strong>Topic 扩容</strong>：增加了 Partition 数量</li>
            <li><strong>订阅变化</strong>：Consumer 订阅的 Topic 发生变化</li>
          </ul>

          <h3 id="rebalance-protocol" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            7.2 重平衡协议
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 提供了两种 Rebalance 协议：
          </p>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="px-3 py-2 text-left font-semibold text-ink">协议</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">特点</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">版本</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="px-3 py-2 font-medium text-ink">RangeAssignor</td>
                <td className="px-3 py-2 text-ink-muted">按范围分配，可能导致不均</td>
                <td className="px-3 py-2 text-ink-muted">默认（旧版）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">RoundRobinAssignor</td>
                <td className="px-3 py-2 text-ink-muted">轮询分配，更均衡</td>
                <td className="px-3 py-2 text-ink-muted">可选</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">StickyAssignor</td>
                <td className="px-3 py-2 text-ink-muted">粘性分配，最小化迁移</td>
                <td className="px-3 py-2 text-ink-muted">推荐（新版）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">CooperativeStickyAssignor</td>
                <td className="px-3 py-2 text-ink-muted">协作式增量 Rebalance</td>
                <td className="px-3 py-2 text-ink-muted">Kafka 2.4+（最优）</td>
              </tr>
            </tbody>
          </table>

          <Callout type="error" title="Rebalance 风暴">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              如果 Consumer 处理时间过长，超过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">max.poll.interval.ms</code>（默认 5 分钟），会被认为已死亡，触发 Rebalance。这可能导致"雪崩效应"，称为 Rebalance 风暴。
            </p>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] mt-2">
              <strong>解决方案：</strong>① 增大 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">max.poll.interval.ms</code>；② 减小 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">max.poll.records</code>；③ 优化业务逻辑处理速度。
            </p>
          </Callout>

          {/* ========== 八、Consumer Group Coordinator ========== */}
          <h2 id="consumer-group-coordinator" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、Consumer Group Coordinator
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            每个 Consumer Group 都有一个 <strong>Coordinator</strong>（由某个 Broker 担任），负责管理 Group 成员、分配 Partition、处理 Offset 提交等。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Group 注册</strong>：Consumer 启动时向 Coordinator 注册</li>
            <li><strong>心跳机制</strong>：Consumer 定期发送心跳（<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">heartbeat.interval.ms</code>），证明自己存活</li>
            <li><strong>Session Timeout</strong>：超过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">session.timeout.ms</code> 未收到心跳，认为 Consumer 已死亡</li>
            <li><strong>Offset 存储</strong>：Coordinator 将 Offset 写入 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">__consumer_offsets</code> Topic</li>
          </ul>

          <SideNote side="right">
            <p className="text-[13px] leading-[1.7]">
              <strong>查找 Coordinator：</strong>Consumer 通过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">group.id</code> 哈希计算找到对应的 Coordinator Broker，然后与其通信。
            </p>
          </SideNote>

          {/* ========== 九、Producer vs Consumer 对比 ========== */}
          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、Producer vs Consumer 对比
          </h2>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="px-3 py-2 text-left font-semibold text-ink">维度</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">Producer</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">Consumer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="px-3 py-2 font-medium text-ink">工作模式</td>
                <td className="px-3 py-2 text-ink-muted">Push（推送）</td>
                <td className="px-3 py-2 text-ink-muted">Pull（拉取）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">线程安全</td>
                <td className="px-3 py-2 text-ink-muted">是（可多线程共享）</td>
                <td className="px-3 py-2 text-ink-muted">否（需独立实例）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">核心优化</td>
                <td className="px-3 py-2 text-ink-muted">批量发送、压缩、零拷贝</td>
                <td className="px-3 py-2 text-ink-muted">批量拉取、并行消费</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">状态管理</td>
                <td className="px-3 py-2 text-ink-muted">无状态</td>
                <td className="px-3 py-2 text-ink-muted">维护 Offset</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">故障处理</td>
                <td className="px-3 py-2 text-ink-muted">重试、幂等性</td>
                <td className="px-3 py-2 text-ink-muted">Rebalance、Offset 重置</td>
              </tr>
            </tbody>
          </table>

          {/* ========== 十、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="error" title="误区 1：Consumer 线程越多越好">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>Consumer 的并行度由 Partition 数量决定。如果 Consumer 数量超过 Partition 数量，多余的 Consumer 会空闲。例如，Topic 有 6 个 Partition，最多只能有 6 个 Consumer 同时工作。
            </p>
          </Callout>

          <Callout type="error" title="误区 2：acks=1 就足够可靠">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>acks=1 只保证 Leader 写入成功，如果 Leader 在 Follower 同步前故障，消息会丢失。对于关键业务，必须使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">acks=all</code> + <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">min.insync.replicas=2</code>。
            </p>
          </Callout>

          <Callout type="error" title="误区 3：自动提交 Offset 最简单">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>自动提交虽然简单，但容易导致消息丢失或重复消费。生产环境建议使用手动提交，在业务逻辑执行成功后再提交 Offset，保证至少一次消费语义。
            </p>
          </Callout>

          {/* ========== 十一、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                q: 'Kafka Producer 的发送流程是怎样的？',
                a: 'Producer 发送消息的完整流程：\n\n1. **拦截器处理**：经过 ProducerInterceptor 链，可修改消息或记录监控。\n\n2. **序列化**：通过 Serializer 将 key/value 序列化为 byte[]。\n\n3. **分区选择**：Partitioner 根据 key 哈希或轮询策略确定目标 Partition。\n\n4. **追加到 Batch**：消息被追加到 RecordAccumulator 中的 Batch，达到 batch.size 或 linger.ms 后触发发送。\n\n5. **Sender 线程发送**：后台 Sender 线程从 RecordAccumulator 取出 Batch，通过网络客户端发送到 Broker Leader。\n\n6. **等待 ACK**：根据 acks 配置等待 Broker 确认，收到响应后调用 Callback 通知应用层。',
              },
              {
                q: 'Kafka 如何实现消息的顺序性？',
                a: 'Kafka 只能保证**Partition 级别**的有序性，无法保证全局有序。\n\n**实现方式**：\n1. **按 Key 分区**：将需要保证顺序的消息指定相同的 key，这样它们会进入同一 Partition。\n2. **单 Consumer 消费**：一个 Partition 只能被 Consumer Group 中的一个 Consumer 消费，保证处理顺序。\n\n**注意**：如果需要全局有序，只能使用单 Partition，但这会牺牲吞吐量，不建议在生产环境使用。',
              },
              {
                q: 'Consumer Rebalance 的过程是怎样的？有什么影响？',
                a: '**Rebalance 过程**：\n1. **协调者选举**：Group Coordinator 发现需要 Rebalance（Consumer 加入/离开）。\n2. **Join Group**：所有 Consumer 向 Coordinator 发送 JoinGroup 请求，选举 Leader Consumer。\n3. **分配策略**：Leader Consumer 根据分配策略（Range/RoundRobin/Sticky）计算 Partition 分配方案。\n4. **Sync Group**：Leader 将分配方案发送给 Coordinator，Coordinator 分发给所有 Consumer。\n5. **开始消费**：Consumer 根据分配结果开始消费对应的 Partition。\n\n**影响**：\n- **消费停滞**：Rebalance 期间所有 Consumer 停止消费（Stop-The-World）。\n- **重复消费**：Rebalance 后可能重复消费已处理但未提交 Offset 的消息。\n- **性能下降**：频繁 Rebalance 会显著降低消费吞吐量。',
              },
              {
                q: '如何保证 Kafka 消息不丢失和不重复？',
                a: '**不丢失**：\n1. **Producer 端**：设置 `acks=all`、`enable.idempotence=true`、`retries=Integer.MAX_VALUE`。\n2. **Broker 端**：配置 `replication.factor>=3`、`min.insync.replicas=2`、`unclean.leader.election.enable=false`。\n3. **Consumer 端**：手动提交 Offset，业务逻辑执行成功后再提交。\n\n**不重复**：\n1. **Producer 端**：启用幂等性（`enable.idempotence=true`），保证单 Partition 内不重复。\n2. **Consumer 端**：业务逻辑实现幂等性（如使用唯一 ID 去重），或使用 Kafka 事务实现 Exactly-Once 语义。',
              },
              {
                q: 'Kafka Consumer 的 Pull 模式相比 Push 模式有什么优势？',
                a: '**Pull 模式的优势**：\n\n1. **流量控制**：Consumer 根据自身处理能力控制拉取速度，避免背压问题。Push 模式下，如果 Consumer 处理慢，会导致消息堆积或丢弃。\n\n2. **批量消费**：一次 poll 可以拉取多条消息，提升处理效率。Push 模式通常逐条推送，效率较低。\n\n3. **灵活性**：Consumer 可以动态调整拉取批次大小和频率，适应不同的负载情况。\n\n4. **简化 Broker 设计**：Broker 无需维护 Consumer 的状态和推送逻辑，降低了复杂度。\n\n**缺点**：如果 Consumer 长时间不 poll，可能导致消息延迟。需要通过合理设置 `max.poll.interval.ms` 来平衡。',
              },
            ]}
          />

          {/* ========== 十二、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>

          <ul className="space-y-3 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
            <li>
              <strong>前置知识：</strong>建议先阅读 <a href="/docs/kafka/kafka-architecture" className="text-accent hover:underline">Kafka 架构与核心概念</a>，了解 Topic、Partition、Broker 等基础概念。
            </li>
            <li>
              <strong>下一篇：</strong><a href="/docs/kafka/kafka-reliability" className="text-accent hover:underline">Kafka 消息可靠性保证</a>，深入学习 ACK 机制、ISR、事务、幂等性等可靠性保障技术。
            </li>
            <li>
              <strong>相关知识点：</strong>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><a href="/docs/kafka/kafka-performance-tuning" className="text-accent hover:underline">Kafka 性能调优</a>：批量发送、压缩算法、参数调优详解</li>
                <li><a href="/docs/kafka/kafka-streams" className="text-accent hover:underline">Kafka Streams 流处理</a>：基于 Producer/Consumer 构建的流式计算框架</li>
                <li><a href="/docs/rocketmq/rocketmq-producer-consumer" className="text-accent hover:underline">RocketMQ 生产者与消费者</a>：对比学习不同 MQ 的设计差异</li>
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
