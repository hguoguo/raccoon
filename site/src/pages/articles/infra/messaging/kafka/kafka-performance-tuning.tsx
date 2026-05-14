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
  { id: 'overview', text: '一、Kafka 性能指标', level: 2 },
  { id: 'producer-tuning', text: '二、生产者性能调优', level: 2 },
  { id: 'batch-compression', text: '2.1 批量发送与压缩', level: 3 },
  { id: 'acks-config', text: '2.2 ACK 配置权衡', level: 3 },
  { id: 'consumer-tuning', text: '三、消费者性能调优', level: 2 },
  { id: 'fetch-config', text: '3.1 拉取配置优化', level: 3 },
  { id: 'parallel-consume', text: '3.2 并行消费策略', level: 3 },
  { id: 'broker-tuning', text: '四、Broker 端调优', level: 2 },
  { id: 'io-optimization', text: '4.1 I/O 优化', level: 3 },
  { id: 'network-optimization', text: '4.2 网络优化', level: 3 },
  { id: 'partition-design', text: '五、Partition 设计原则', level: 2 },
  { id: 'monitoring', text: '六、监控与诊断', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function KafkaPerformanceTuning({ meta }: { meta: KnowledgeNode }) {
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
              Kafka 性能调优是通过<strong className="text-accent">批量发送、数据压缩、零拷贝、Page Cache</strong>等技术手段，结合合理的参数配置（如 batch.size、linger.ms、acks），在保证消息可靠性的前提下，实现<strong className="text-accent">百万级 TPS</strong>的高吞吐和毫秒级低延迟。
            </p>
          </blockquote>

          {/* ========== 一、Kafka 性能指标 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Kafka 性能指标
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 的性能主要通过以下指标衡量：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>吞吐量（Throughput）</strong>：每秒处理的消息数量（TPS）或数据量（MB/s）</li>
            <li><strong>延迟（Latency）</strong>：消息从生产到消费的端到端时间（P50、P95、P99）</li>
            <li><strong>CPU 使用率</strong>：Broker 和服务器的 CPU 负载</li>
            <li><strong>磁盘 I/O</strong>：读写速度和 IOPS</li>
            <li><strong>网络带宽</strong>：入网和出网流量</li>
          </ul>

          <Callout type="info" title="性能目标参考">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>典型场景：</strong><br/>
              - 日志收集：吞吐量优先（百万级 TPS），延迟可接受秒级<br/>
              - 实时推荐：延迟优先（毫秒级），吞吐量要求中等<br/>
              - 金融交易：可靠性优先，吞吐量和延迟需平衡
            </p>
          </Callout>

          {/* ========== 二、生产者性能调优 ========== */}
          <h2 id="producer-tuning" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、生产者性能调优
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            生产者是 Kafka 性能的入口，优化生产者可以显著提升整体吞吐量。关键参数包括批量大小、等待时间、压缩算法等。
          </p>

          <h3 id="batch-compression" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 批量发送与压缩
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka Producer 支持将多条消息打包成一个批次（Batch）发送，减少网络往返次数。同时支持多种压缩算法，降低网络传输开销。
          </p>

          <Playground 
            code={`Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

// 批量发送配置
props.put("batch.size", 32768);        // 32KB，默认 16KB
props.put("linger.ms", 10);            // 等待 10ms，默认 0ms
props.put("buffer.memory", 67108864);  // 64MB 缓冲区

// 压缩配置
props.put("compression.type", "lz4");  // lz4/snappy/gzip/zstd

KafkaProducer<String, String> producer = new KafkaProducer<>(props);`}
            language="java"
            description="生产者批量发送与压缩配置"
          />

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>batch.size</strong>：批次大小，越大吞吐量越高，但延迟也增加。建议 16KB-64KB</li>
            <li><strong>linger.ms</strong>：等待时间，给批次填充更多消息的时间。建议 5-20ms</li>
            <li><strong>compression.type</strong>：压缩算法，LZ4 性价比高，ZSTD 压缩率最高但 CPU 开销大</li>
          </ul>

          <DiagramBlock title="批量发送流程">
            {`graph LR
              M1["Message 1"] --> BATCH["Batch Buffer"]
              M2["Message 2"] --> BATCH
              M3["Message 3"] --> BATCH
              
              BATCH -->|"batch.size 或 linger.ms 触发"| COMPRESS["Compression"]
              COMPRESS --> SEND["Send to Broker"]`}
          </DiagramBlock>

          <SideNote label="压缩算法选择">
            <p className="text-[13px] leading-[1.7]">
              <strong>LZ4</strong>：压缩速度快，解压更快，适合大多数场景。<br/>
              <strong>Snappy</strong>：Google 开发，平衡压缩率和速度。<br/>
              <strong>Gzip</strong>：压缩率高，但 CPU 开销大。<br/>
              <strong>ZSTD</strong>：Facebook 开发，压缩率最高，适合网络带宽受限场景。
            </p>
          </SideNote>

          <h3 id="acks-config" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 ACK 配置权衡
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>acks</strong> 参数控制生产者需要等待多少个副本确认后才认为发送成功。不同的配置在性能和可靠性之间有不同的权衡。
          </p>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="px-3 py-2 text-left font-semibold text-ink">acks 配置</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">含义</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">性能</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">可靠性</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="px-3 py-2 font-medium text-ink">acks=0</td>
                <td className="px-3 py-2 text-ink-muted">不等待任何确认</td>
                <td className="px-3 py-2 text-ink-muted">最高</td>
                <td className="px-3 py-2 text-ink-muted">最低（可能丢失）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">acks=1</td>
                <td className="px-3 py-2 text-ink-muted">等待 Leader 确认</td>
                <td className="px-3 py-2 text-ink-muted">较高</td>
                <td className="px-3 py-2 text-ink-muted">中等（Leader 故障时丢失）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">acks=all</td>
                <td className="px-3 py-2 text-ink-muted">等待所有 ISR 确认</td>
                <td className="px-3 py-2 text-ink-muted">较低</td>
                <td className="px-3 py-2 text-ink-muted">最高（不丢失）</td>
              </tr>
            </tbody>
          </table>

          <Callout type="warning" title="acks 配置建议">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>日志收集场景</strong>：acks=1，追求高吞吐，允许少量丢失。<br/>
              <strong>金融交易场景</strong>：acks=all + enable.idempotence=true，保证不丢失不重复。<br/>
              <strong>一般业务场景</strong>：acks=1，平衡性能和可靠性。
            </p>
          </Callout>

          {/* ========== 三、消费者性能调优 ========== */}
          <h2 id="consumer-tuning" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、消费者性能调优
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            消费者的性能调优主要关注拉取效率和处理能力，避免成为系统瓶颈。
          </p>

          <h3 id="fetch-config" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 拉取配置优化
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Consumer 通过 pull 模式从 Broker 拉取消息，合理配置拉取参数可以提升消费效率。
          </p>

          <Playground 
            code={`Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "my-group");
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

// 拉取配置
props.put("fetch.min.bytes", 1024);       // 最小拉取 1KB
props.put("fetch.max.wait.ms", 500);      // 最大等待 500ms
props.put("max.poll.records", 500);       // 每次拉取 500 条
props.put("max.partition.fetch.bytes", 1048576);  // 每个 Partition 最多 1MB

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);`}
            language="java"
            description="消费者拉取配置优化"
          />

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>fetch.min.bytes</strong>：最小拉取字节数，Broker 等待数据达到此值才返回。增大可减少请求次数</li>
            <li><strong>fetch.max.wait.ms</strong>：最大等待时间，避免长时间等待。建议 100-500ms</li>
            <li><strong>max.poll.records</strong>：每次 poll 返回的最大记录数。根据处理速度调整，默认 500</li>
            <li><strong>max.partition.fetch.bytes</strong>：每个 Partition 一次拉取的最大字节数。默认 1MB</li>
          </ul>

          <h3 id="parallel-consume" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 并行消费策略
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当单线程消费成为瓶颈时，可以采用并行消费策略提升吞吐量。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>增加 Consumer 实例</strong>：在同一 Consumer Group 中增加实例数，最多等于 Partition 数</li>
            <li><strong>多线程消费</strong>：单个 Consumer 内部使用线程池并行处理消息</li>
            <li><strong>异步处理</strong>：将消息发送到内部队列，由工作线程异步处理</li>
          </ul>

          <DiagramBlock title="并行消费架构">
            {`graph TB
              subgraph "Kafka Cluster"
                P0["Partition 0"]
                P1["Partition 1"]
                P2["Partition 2"]
              end

              subgraph "Consumer Instance 1"
                C1["Consumer Thread"]
                TP1["Thread Pool"]
                W1["Worker 1"]
                W2["Worker 2"]
              end

              subgraph "Consumer Instance 2"
                C2["Consumer Thread"]
                TP2["Thread Pool"]
                W3["Worker 3"]
                W4["Worker 4"]
              end

              P0 --> C1
              P1 --> C2
              
              C1 --> TP1
              TP1 --> W1
              TP1 --> W2
              
              C2 --> TP2
              TP2 --> W3
              TP2 --> W4`}
          </DiagramBlock>

          <Callout type="danger" title="多线程消费注意事项">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              Kafka Consumer 不是线程安全的，<strong>不能在多个线程中共享同一个 Consumer 实例</strong>。正确的做法是：① 每个线程独立创建 Consumer；② 或者单线程 poll，多线程处理业务逻辑。
            </p>
          </Callout>

          {/* ========== 四、Broker 端调优 ========== */}
          <h2 id="broker-tuning" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Broker 端调优
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Broker 是 Kafka 的核心，其性能直接影响整个集群的吞吐量和延迟。
          </p>

          <h3 id="io-optimization" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 I/O 优化
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 依赖顺序 I/O 和 Page Cache 实现高性能，但仍有一些参数可以进一步优化。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>log.segment.bytes</strong>：Segment 文件大小，默认 1GB。减小可加快日志清理，但增加文件句柄数</li>
            <li><strong>log.retention.hours</strong>：日志保留时间，默认 168 小时（7 天）。根据存储容量调整</li>
            <li><strong>num.io.threads</strong>：I/O 线程数，默认 8。根据磁盘数量调整，通常设置为磁盘数的 2-3 倍</li>
            <li><strong>num.network.threads</strong>：网络线程数，默认 3。根据网络带宽和连接数调整</li>
          </ul>

          <SideNote label="磁盘选型">
            <p className="text-[13px] leading-[1.7]">
              <strong>SSD vs HDD</strong>：SSD 的随机读写性能远优于 HDD，但 Kafka 主要是顺序 I/O，HDD 也能提供不错的性能。如果预算充足，推荐使用 SSD，尤其是 NVMe SSD。
            </p>
          </SideNote>

          <h3 id="network-optimization" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 网络优化
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            网络是分布式系统的瓶颈之一，优化网络配置可以提升数据传输效率。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>socket.send.buffer.bytes</strong>：发送缓冲区大小，默认 100KB。增大可提升吞吐量</li>
            <li><strong>socket.receive.buffer.bytes</strong>：接收缓冲区大小，默认 100KB</li>
            <li><strong>socket.request.max.bytes</strong>：最大请求大小，默认 100MB。防止超大请求导致 OOM</li>
            <li><strong>启用零拷贝</strong>：Kafka 默认使用 sendfile 实现零拷贝，确保操作系统支持</li>
          </ul>

          <Callout type="info" title="JVM 参数优化">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              Broker 的 JVM 参数也很重要：<br/>
              <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">-Xms6g -Xmx6g</code>（堆内存）<br/>
              <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">-XX:+UseG1GC</code>（垃圾回收器）<br/>
              注意：Kafka 主要依赖 Page Cache，堆内存不需要太大，6-8GB 足够。
            </p>
          </Callout>

          {/* ========== 五、Partition 设计原则 ========== */}
          <h2 id="partition-design" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Partition 设计原则
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Partition 的数量和分布对性能有重要影响。合理的 Partition 设计可以实现负载均衡和水平扩展。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Partition 数量</strong>：决定最大并行度。建议设置为 Broker 数量的整数倍</li>
            <li><strong>均匀分布</strong>：Partition 应均匀分布在不同的 Broker 上，避免热点</li>
            <li><strong>不要过多</strong>：每个 Broker 承载 2000-4000 个 Partition 为宜，过多会导致：</li>
            <ul className="list-disc list-inside ml-4 space-y-1 text-[13px] sm:text-[14px] text-ink-muted">
              <li>文件句柄耗尽</li>
              <li>Leader 选举时间变长</li>
              <li>Consumer Rebalance 耗时增加</li>
            </ul>
          </ul>

          <DiagramBlock title="Partition 分布示例">
            {`graph TB
              subgraph "Topic: orders (6 Partitions)"
                P0["Partition 0"]
                P1["Partition 1"]
                P2["Partition 2"]
                P3["Partition 3"]
                P4["Partition 4"]
                P5["Partition 5"]
              end

              subgraph "Broker Cluster"
                B1["Broker 1<br/>P0, P3"]
                B2["Broker 2<br/>P1, P4"]
                B3["Broker 3<br/>P2, P5"]
              end

              P0 --> B1
              P1 --> B2
              P2 --> B3
              P3 --> B1
              P4 --> B2
              P5 --> B3`}
          </DiagramBlock>

          <Callout type="warning" title="Partition 扩容限制">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              Kafka 支持增加 Partition 数量，但<strong>不支持减少</strong>。扩容后，旧数据不会重新分布，只有新数据会使用新的 Partition。因此，建议在创建 Topic 时就规划好 Partition 数量。
            </p>
          </Callout>

          {/* ========== 六、监控与诊断 ========== */}
          <h2 id="monitoring" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、监控与诊断
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            完善的监控体系是性能调优的基础。Kafka 提供了丰富的 JMX 指标，可以通过 Prometheus + Grafana 进行可视化监控。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Producer 指标</strong>：record-send-rate、batch-size-avg、compression-rate-avg</li>
            <li><strong>Consumer 指标</strong>：records-consumed-rate、fetch-latency-avg、commit-latency-avg</li>
            <li><strong>Broker 指标</strong>：bytes-in/out-rate、request-handler-avg-idle-percent、under-replicated-partitions</li>
            <li><strong>Topic 指标</strong>：log-end-offset、log-start-offset、partition-count</li>
          </ul>

          <Playground 
            code={`# Prometheus Kafka Exporter 配置
scrape_configs:
  - job_name: 'kafka'
    static_configs:
      - targets: ['kafka-exporter:9308']

# Grafana Dashboard 关键面板
- Throughput (Bytes In/Out)
- Request Handler Idle %
- Under Replicated Partitions
- Consumer Lag
- P95/P99 Latency`}
            language="yaml"
            description="Kafka 监控配置示例"
          />

          <SideNote label="关键告警规则">
            <p className="text-[13px] leading-[1.7]">
              <strong>Under Replicated Partitions &gt; 0</strong>：副本不同步，可能存在 Broker 故障。<br/>
              <strong>Request Handler Idle % &lt; 30%</strong>：Broker 负载过高，需要扩容。<br/>
              <strong>Consumer Lag 持续增长</strong>：消费速度慢于生产速度，需要优化或扩容。
            </p>
          </SideNote>

          {/* ========== 七、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区 1：增加 Partition 就能提升性能">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>Partition 数量应与 Consumer 并行度匹配。如果 Consumer 数量不变，增加 Partition 不会提升消费性能，反而会增加 Broker 负担。只有在增加 Consumer 实例时，增加 Partition 才有意义。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：压缩一定会降低性能">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>虽然压缩会消耗 CPU，但可以显著减少网络传输和磁盘 I/O。在网络带宽或磁盘 I/O 成为瓶颈的场景下，压缩反而能提升整体吞吐量。LZ4 的压缩/解压速度非常快，CPU 开销很小。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：acks=all 性能很差">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>acks=all 确实比 acks=1 慢，但差距通常在 10-20% 左右，并不是数量级的差异。通过批量发送、异步处理等优化，可以在保证可靠性的同时获得不错的性能。对于关键业务，这点性能损失是值得的。
            </p>
          </Callout>

          {/* ========== 八、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'Kafka 如何实现高吞吐？',
                answer: 'Kafka 的高吞吐主要来自以下几个方面：\n\n1. **顺序 I/O**：消息追加写入日志文件，避免随机 I/O 的磁头寻道开销。\n\n2. **Page Cache**：直接使用操作系统的页缓存，避免 JVM GC 压力，利用 OS 的预读和延迟写入优化。\n\n3. **零拷贝技术**：使用 sendfile 系统调用，减少数据在内核态和用户态之间的拷贝次数。\n\n4. **批量发送**：Producer 将多条消息打包成批次发送，减少网络往返次数。\n\n5. **数据压缩**：支持 LZ4、Snappy 等压缩算法，减少网络传输和磁盘 I/O。\n\n6. **分区并行**：Topic 分为多个 Partition，分布在不同 Broker 上，实现水平扩展。',
              },
              {
                question: '如何优化 Kafka Producer 的性能？',
                answer: '优化 Producer 性能的关键参数：\n\n1. **batch.size**：增大批次大小（默认 16KB，建议 32-64KB），提高批量发送效率。\n\n2. **linger.ms**：设置等待时间（默认 0ms，建议 5-20ms），让批次填充更多消息。\n\n3. **compression.type**：启用压缩（推荐 lz4），减少网络传输开销。\n\n4. **acks**：根据场景选择（日志收集用 acks=1，金融交易用 acks=all）。\n\n5. **buffer.memory**：增大缓冲区（默认 32MB），避免阻塞。\n\n6. **max.in.flight.requests.per.connection**：增大并发请求数（默认 5），提高吞吐量。',
              },
              {
                question: 'Kafka Consumer 消费慢怎么办？',
                answer: 'Consumer 消费慢的优化方案：\n\n1. **增加 Consumer 实例**：在同一 Consumer Group 中增加实例数，最多等于 Partition 数。\n\n2. **优化业务逻辑**：减少单条消息的处理时间，避免阻塞。\n\n3. **批量处理**：一次性处理多条消息，减少 I/O 次数。\n\n4. **异步处理**：将消息发送到内部队列，由工作线程异步处理。\n\n5. **调整拉取参数**：增大 max.poll.records、fetch.min.bytes，减少 poll 次数。\n\n6. **监控 Consumer Lag**：及时发现消费延迟，采取扩容措施。',
              },
              {
                question: 'Kafka 的零拷贝是如何实现的？有什么优势？',
                answer: 'Kafka 使用 Linux 的 `sendfile` 系统调用实现零拷贝。\n\n**传统 I/O**：数据需要经过 4 次拷贝和 4 次上下文切换：\n- Disk → Kernel Buffer → User Buffer → Socket Buffer → NIC Buffer\n\n**零拷贝**：数据只需要 2 次拷贝和 2 次上下文切换：\n- Disk → Kernel Buffer → NIC Buffer（通过 DMA 直接传输）\n\n**优势**：\n1. 减少 CPU 使用率（降低 50% 以上）\n2. 提升网络传输性能（提升 2-3 倍）\n3. 降低延迟\n\nKafka 在发送消息给 Consumer 时，直接从 Page Cache 读取数据，通过 `sendfile` 发送到网络 socket，避免了数据在用户态和内核态之间的来回拷贝。',
              },
              {
                question: '如何选择合适的压缩算法？',
                answer: 'Kafka 支持的压缩算法及适用场景：\n\n1. **LZ4**（推荐）：\n   - 压缩速度快，解压更快\n   - CPU 开销小\n   - 适合大多数场景\n\n2. **Snappy**：\n   - Google 开发\n   - 平衡压缩率和速度\n   - Hadoop 生态常用\n\n3. **Gzip**：\n   - 压缩率高\n   - CPU 开销大\n   - 适合网络带宽受限场景\n\n4. **ZSTD**：\n   - Facebook 开发\n   - 压缩率最高\n   - CPU 开销较大\n   - 适合存储成本高的场景\n\n**选择建议**：优先使用 LZ4，它在性能和压缩率之间取得了很好的平衡。如果网络带宽是瓶颈，可以考虑 ZSTD。',
              },
            ]}
          />

          {/* ========== 九、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <ul className="space-y-3 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
            <li>
              <strong>前置知识：</strong>建议先了解 <a href="/docs/kafka/kafka-architecture" className="text-accent hover:underline">Kafka 架构与核心概念</a> 和 <a href="/docs/kafka/kafka-producer-consumer" className="text-accent hover:underline">Kafka 生产者与消费者</a>。
            </li>
            <li>
              <strong>相关知识点：</strong>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><a href="/docs/kafka/kafka-reliability" className="text-accent hover:underline">Kafka 消息可靠性保证</a>：ACK 机制、事务、幂等性详解</li>
                <li><a href="/docs/kafka/kafka-streams" className="text-accent hover:underline">Kafka Streams 流处理</a>：实时流处理应用开发</li>
                <li><a href="/docs/rocketmq/rocketmq-advanced" className="text-accent hover:underline">RocketMQ 高级特性</a>：对比学习不同 MQ 的性能优化</li>
                <li><a href="/docs/09-ai-engineering/observability-monitoring" className="text-accent hover:underline">全链路监控告警体系</a>：Kafka 监控的最佳实践</li>
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
