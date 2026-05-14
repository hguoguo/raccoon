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
  { id: 'overview', text: '一、Kafka Streams 概述', level: 2 },
  { id: 'architecture', text: '二、核心架构设计', level: 2 },
  { id: 'stream-table', text: '三、Stream 与 Table', level: 2 },
  { id: 'stream-api', text: '四、Stream API 编程模型', level: 2 },
  { id: 'state-store', text: '五、状态存储机制', level: 2 },
  { id: 'windowing', text: '六、窗口操作', level: 2 },
  { id: 'join-operations', text: '七、Join 操作', level: 2 },
  { id: 'fault-tolerance', text: '八、容错与一致性', level: 2 },
  { id: 'comparison', text: '九、与其他流处理框架对比', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function KafkaStreams({ meta }: { meta: KnowledgeNode }) {
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
              Kafka Streams 是一个<strong className="text-accent">客户端库</strong>，用于构建实时流处理应用，它基于 Kafka 的发布-订阅模式，提供强大的 DSL 和 Processor API，支持状态管理、窗口操作、Join 等复杂流处理逻辑，实现<strong className="text-accent">Exactly-Once</strong>语义。
            </p>
          </blockquote>

          {/* ========== 一、Kafka Streams 概述 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Kafka Streams 概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka Streams 是 Apache Kafka 提供的一个<strong>轻量级流处理库</strong>，它允许开发者使用 Java 或 Scala 编写实时数据处理应用。与传统的大数据流处理框架（如 Flink、Spark Streaming）不同，Kafka Streams 不需要独立的集群，而是作为普通应用运行。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>轻量级部署</strong>：无需独立集群，嵌入到应用中运行</li>
            <li><strong>弹性扩展</strong>：通过增加应用实例自动实现水平扩展</li>
            <li><strong>状态管理</strong>：内置 RocksDB 状态存储，支持故障恢复</li>
            <li><strong>Exactly-Once</strong>：端到端的一次性语义保证</li>
            <li><strong>低延迟</strong>：毫秒级处理延迟，适合实时场景</li>
          </ul>

          <Callout type="info" title="Kafka Streams vs 传统流处理框架">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              传统流处理框架（如 Flink）需要独立的集群资源，而 Kafka Streams 直接嵌入到应用中，利用 Kafka 作为存储层，简化了运维复杂度。但这也意味着 Kafka Streams 的功能相对有限，适合中等复杂度的流处理场景。
            </p>
          </Callout>

          {/* ========== 二、核心架构设计 ========== */}
          <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、核心架构设计
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka Streams 应用由多个<strong>Stream Task</strong>组成，每个 Task 负责处理一个或多个 Partition 的数据。Task 分为 Source、Processor 和 Sink 三种类型。
          </p>

          <DiagramBlock title="Kafka Streams 架构图">
            {`graph TB
              subgraph "Input Topics"
                IT1["Topic A"]
                IT2["Topic B"]
              end

              subgraph "Kafka Streams Application"
                ST1["Stream Task 1<br/>Source → Processor → Sink"]
                ST2["Stream Task 2<br/>Source → Processor → Sink"]
                SS["State Store<br/>RocksDB"]
              end

              subgraph "Output Topics"
                OT1["Topic C"]
                OT2["Topic D"]
              end

              IT1 --> ST1
              IT2 --> ST2
              
              ST1 -->|"Write State"| SS
              ST2 -->|"Read State"| SS
              
              ST1 --> OT1
              ST2 --> OT2`}
          </DiagramBlock>

          <SideNote label="关键设计">
            <p className="text-[13px] leading-[1.7]">
              Kafka Streams 将流处理逻辑分解为拓扑结构（Topology），每个节点执行特定的转换操作，形成有向无环图（DAG）。
            </p>
          </SideNote>

          {/* ========== 三、Stream 与 Table ========== */}
          <h2 id="stream-table" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Stream 与 Table
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka Streams 引入了两个核心抽象：<strong>KStream</strong> 和 <strong>KTable</strong>，分别代表事件流和状态表。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>KStream</strong>：表示无限的事件流，每条记录都是独立的事实（如用户点击事件）</li>
            <li><strong>KTable</strong>：表示变化的数据集，每条记录是对之前状态的更新（如用户最新位置）</li>
            <li><strong>转换关系</strong>：KStream 可以聚合为 KTable，KTable 可以转换为 KStream</li>
          </ul>

          <DiagramBlock title="Stream 与 Table 的关系">
            {`graph LR
              KS["KStream<br/>事件流<br/>user:click:page1<br/>user:click:page2<br/>user:click:page3"]
              
              AGG["聚合操作<br/>groupBy + count"]
              
              KT["KTable<br/>状态表<br/>user:count:3"]
              
              KS --> AGG
              AGG --> KT
              
              KT -.->|"toStream()"| KS2["KStream<br/>变更流<br/>user:count:1<br/>user:count:2<br/>user:count:3"]`}
          </DiagramBlock>

          <Callout type="warning" title="选择 Stream 还是 Table？">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              如果关注的是<strong>事件本身</strong>（如日志、点击流），使用 KStream；如果关注的是<strong>最新状态</strong>（如用户画像、库存数量），使用 KTable。两者可以相互转换，灵活组合。
            </p>
          </Callout>

          {/* ========== 四、Stream API 编程模型 ========== */}
          <h2 id="stream-api" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Stream API 编程模型
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka Streams 提供了两种编程模型：<strong>DSL（领域特定语言）</strong>和<strong>Processor API</strong>。DSL 适合常见的流处理操作，Processor API 提供更细粒度的控制。
          </p>

          <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 DSL 示例
          </h3>
          <Playground 
            code={`// 创建 StreamsBuilder
StreamsBuilder builder = new StreamsBuilder();

// 从输入 Topic 读取数据
KStream<String, String> textLines = builder.stream("input-topic");

// 分词、分组、计数
KTable<String, Long> wordCounts = textLines
    .flatMapValues(value -> Arrays.asList(value.toLowerCase().split("\\\\W+")))
    .groupBy((key, word) -> word)
    .count();

// 将结果写入输出 Topic
wordCounts.toStream().to("output-topic", Produced.with(Serdes.String(), Serdes.Long()));

// 构建拓扑并启动
KafkaStreams streams = new KafkaStreams(builder.build(), config);
streams.start();`}
            language="java"
            description="WordCount 示例"
          />

          <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 Processor API 示例
          </h3>
          <Playground 
            code={`public class MyProcessor implements Processor<String, String> {
    private ProcessorContext context;
    private KeyValueStore<String, Integer> stateStore;

    @Override
    public void init(ProcessorContext context) {
        this.context = context;
        // 获取状态存储
        this.stateStore = context.getStateStore("my-store");
    }

    @Override
    public void process(String key, String value) {
        // 处理逻辑
        Integer count = stateStore.get(key);
        if (count == null) {
            count = 0;
        }
        count++;
        stateStore.put(key, count);
        
        // 转发到下游
        context.forward(key, String.valueOf(count));
    }

    @Override
    public void close() {
        // 清理资源
    }
}`}
            language="java"
            description="自定义 Processor"
          />

          {/* ========== 五、状态存储机制 ========== */}
          <h2 id="state-store" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、状态存储机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka Streams 使用<strong>RocksDB</strong>作为默认的状态存储引擎，将状态持久化到本地磁盘。同时，状态也会备份到 Kafka Topic 中，实现故障恢复。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>本地存储</strong>：使用 RocksDB 存储状态，支持高效的读写操作</li>
            <li><strong>变更日志</strong>：状态变更记录到内部的 changelog Topic，实现持久化</li>
            <li><strong>故障恢复</strong>：应用重启时，从 changelog Topic 恢复状态</li>
            <li><strong>可插拔</strong>：可以自定义状态存储实现（如 InMemory）</li>
          </ul>

          <DiagramBlock title="状态存储架构">
            {`graph TB
              subgraph "Application Instance"
                TASK["Stream Task"]
                ROCKS["RocksDB<br/>本地状态存储"]
              end

              subgraph "Kafka Cluster"
                CHANGELOG["changelog-topic<br/>状态备份"]
              end

              TASK -->|"Write"| ROCKS
              ROCKS -->|"Sync"| CHANGELOG
              
              TASK -->|"Read"| ROCKS
              
              CHANGELOG -.->|"Restore on restart"| ROCKS`}
          </DiagramBlock>

          <SideNote label="性能优化">
            <p className="text-[13px] leading-[1.7]">
              RocksDB 的配置对性能影响很大，建议根据实际场景调整 block cache、write buffer 等参数。
            </p>
          </SideNote>

          {/* ========== 六、窗口操作 ========== */}
          <h2 id="windowing" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、窗口操作
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            窗口操作是流处理中的核心概念，Kafka Streams 支持多种窗口类型，用于对无限数据流进行有界计算。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Tumbling Window（滚动窗口）</strong>：固定大小、不重叠的时间窗口（如每 5 分钟统计一次）</li>
            <li><strong>Hopping Window（滑动窗口）</strong>：固定大小、可重叠的时间窗口（如每 1 分钟统计过去 5 分钟的数据）</li>
            <li><strong>Session Window（会话窗口）</strong>：基于活动间隙动态划分的窗口（如用户会话）</li>
          </ul>

          <Playground 
            code={`// 滚动窗口：每 5 分钟统计一次
KTable<Windowed<String>, Long> tumblingCounts = stream
    .groupByKey()
    .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5)))
    .count();

// 滑动窗口：每 1 分钟统计过去 5 分钟的数据
KTable<Windowed<String>, Long> hoppingCounts = stream
    .groupByKey()
    .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5))
        .advanceBy(Duration.ofMinutes(1)))
    .count();

// 会话窗口：基于 30 分钟不活动间隔
KTable<Windowed<String>, Long> sessionCounts = stream
    .groupByKey()
    .windowedBy(SessionWindows.ofInactivityGapWithNoGrace(Duration.ofMinutes(30)))
    .count();`}
            language="java"
            description="窗口操作示例"
          />

          <Callout type="info" title="窗口保留时间">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              窗口数据不会永久保存，可以通过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">retention.ms</code> 配置窗口的保留时间。超过保留时间的窗口数据会被自动清理。
            </p>
          </Callout>

          {/* ========== 七、Join 操作 ========== */}
          <h2 id="join-operations" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、Join 操作
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka Streams 支持多种 Join 操作，包括 Stream-Stream Join、Stream-Table Join 和 Table-Table Join，用于关联不同数据源的信息。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Stream-Stream Join</strong>：两个事件流的 Join，需要指定时间窗口</li>
            <li><strong>Stream-Table Join</strong>：事件流与状态表的 Join，用于 enrich 数据</li>
            <li><strong>Table-Table Join</strong>：两个状态表的 Join，产生变更流</li>
          </ul>

          <Playground 
            code={`// 订单流
KStream<String, Order> orders = builder.stream("orders-topic");

// 用户信息表
KTable<String, User> users = builder.table("users-topic");

// Join：为订单添加用户信息
KStream<String, EnrichedOrder> enrichedOrders = orders
    .join(users,
        (order, user) -> new EnrichedOrder(order, user),
        JoinWindows.ofTimeDifferenceWithNoGrace(Duration.ofMinutes(5)));

enrichedOrders.to("enriched-orders-topic");`}
            language="java"
            description="Stream-Table Join 示例"
          />

          <SideNote label="Join 注意事项">
            <p className="text-[13px] leading-[1.7]">
              Stream-Stream Join 必须指定时间窗口，因为两个流的事件可能在不同时间到达。窗口大小决定了事件可以关联的时间范围。
            </p>
          </SideNote>

          {/* ========== 八、容错与一致性 ========== */}
          <h2 id="fault-tolerance" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、容错与一致性
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka Streams 通过以下机制实现容错和一致性保证：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Changelog Topic</strong>：状态变更持久化到 Kafka，支持故障恢复</li>
            <li><strong>Checkpoint</strong>：定期保存处理进度，避免重复处理</li>
            <li><strong>Exactly-Once</strong>：通过事务机制实现端到端的一次性语义</li>
            <li><strong>Standby Replica</strong>：可选的备用副本，加速故障转移</li>
          </ul>

          <DiagramBlock title="容错机制">
            {`graph TB
              subgraph "Instance 1"
                TASK1["Task 1"]
                STATE1["State Store 1"]
              end

              subgraph "Instance 2"
                TASK2["Task 2"]
                STATE2["State Store 2"]
              end

              subgraph "Kafka Cluster"
                CL1["changelog-topic-partition-1"]
                CL2["changelog-topic-partition-2"]
              end

              TASK1 -->|"Write"| STATE1
              STATE1 -->|"Sync"| CL1
              
              TASK2 -->|"Write"| STATE2
              STATE2 -->|"Sync"| CL2
              
              CL1 -.->|"Restore"| STATE2
              CL2 -.->|"Restore"| STATE1`}
          </DiagramBlock>

          <Callout type="info" title="Exactly-Once 配置">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              启用 Exactly-Once 语义只需设置：<br/>
              <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">processing.guarantee=exactly_once_v2</code><br/>
              Kafka Streams 会自动使用事务机制，确保消息既不丢失也不重复。
            </p>
          </Callout>

          {/* ========== 九、与其他流处理框架对比 ========== */}
          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、与其他流处理框架对比
          </h2>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="px-3 py-2 text-left font-semibold text-ink">特性</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">Kafka Streams</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">Flink</th>
                <th className="px-3 py-2 text-left font-semibold text-ink">Spark Streaming</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="px-3 py-2 font-medium text-ink">部署模式</td>
                <td className="px-3 py-2 text-ink-muted">嵌入式（无独立集群）</td>
                <td className="px-3 py-2 text-ink-muted">独立集群</td>
                <td className="px-3 py-2 text-ink-muted">独立集群</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">延迟</td>
                <td className="px-3 py-2 text-ink-muted">毫秒级</td>
                <td className="px-3 py-2 text-ink-muted">毫秒级</td>
                <td className="px-3 py-2 text-ink-muted">秒级（微批次）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">状态管理</td>
                <td className="px-3 py-2 text-ink-muted">RocksDB + Changelog</td>
                <td className="px-3 py-2 text-ink-muted">RocksDB + Checkpoint</td>
                <td className="px-3 py-2 text-ink-muted">内存/RDD</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">Exactly-Once</td>
                <td className="px-3 py-2 text-ink-muted">支持（v2）</td>
                <td className="px-3 py-2 text-ink-muted">支持</td>
                <td className="px-3 py-2 text-ink-muted">有限支持</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-ink">适用场景</td>
                <td className="px-3 py-2 text-ink-muted">中等复杂度流处理</td>
                <td className="px-3 py-2 text-ink-muted">复杂流处理、CEP</td>
                <td className="px-3 py-2 text-ink-muted">批流统一、ML</td>
              </tr>
            </tbody>
          </table>

          {/* ========== 十、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="danger" title="误区 1：Kafka Streams 需要独立集群">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>Kafka Streams 是客户端库，直接嵌入到应用中运行，不需要独立的集群。应用的每个实例都是一个独立的流处理器，通过 Kafka Consumer Group 实现负载均衡。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：状态存储在内存中会丢失">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>Kafka Streams 的状态存储在 RocksDB（持久化到磁盘），并且同步到 Kafka 的 changelog Topic。即使应用重启，状态也可以从 changelog 恢复，不会丢失。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：只能处理简单场景">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>事实：</strong>Kafka Streams 支持复杂的流处理操作，包括多步转换、聚合、Join、窗口操作等。虽然功能不如 Flink 全面，但对于大多数实时数据处理场景已经足够。
            </p>
          </Callout>

          {/* ========== 十一、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'Kafka Streams 与 Flink 有什么区别？如何选择？',
                answer: '**主要区别**：\n\n1. **部署模式**：Kafka Streams 是嵌入式库，无需独立集群；Flink 需要独立集群。\n\n2. **功能复杂度**：Flink 支持更复杂的流处理（如 CEP、复杂事件处理）；Kafka Streams 适合中等复杂度场景。\n\n3. **生态系统**：Flink 有更丰富的生态（Table API、ML、Gelly）；Kafka Streams 与 Kafka 深度集成。\n\n4. **学习曲线**：Kafka Streams 更简单易用；Flink 功能强大但学习成本高。\n\n**选择建议**：\n- 如果已经使用 Kafka，且流处理逻辑不太复杂，优先选择 Kafka Streams。\n- 如果需要复杂的流处理、CEP、或与批处理统一，选择 Flink。\n- 考虑团队技术栈和运维能力。',
              },
              {
                question: 'Kafka Streams 如何实现 Exactly-Once 语义？',
                answer: 'Kafka Streams 通过以下机制实现 Exactly-Once：\n\n1. **幂等 Producer**：启用 `enable.idempotence=true`，防止生产者重复发送。\n\n2. **事务机制**：使用 Kafka 事务，将消费、处理、生产作为一个原子操作。\n\n3. **Changelog Topic**：状态变更持久化到 Kafka，支持故障恢复。\n\n4. **Checkpoint**：定期保存处理进度，避免重复处理。\n\n配置方式：设置 `processing.guarantee=exactly_once_v2`，Kafka Streams 会自动处理所有细节。',
              },
              {
                question: 'Kafka Streams 的状态存储是如何工作的？',
                answer: 'Kafka Streams 的状态存储工作流程：\n\n1. **本地存储**：使用 RocksDB 将状态持久化到本地磁盘，支持高效读写。\n\n2. **Changelog Topic**：每次状态变更都会记录到内部的 changelog Topic，实现持久化和备份。\n\n3. **故障恢复**：应用重启时，从 changelog Topic 重新播放状态变更，恢复到最新状态。\n\n4. **Standby Replica**（可选）：维护备用副本，加速故障转移，减少恢复时间。\n\n这种设计既保证了性能（本地 RocksDB），又保证了可靠性（Kafka 备份）。',
              },
              {
                question: 'Kafka Streams 中的 KStream 和 KTable 有什么区别？',
                answer: '**KStream**：\n- 表示无限的事件流\n- 每条记录都是独立的事实\n- 适合处理日志、点击流等事件数据\n- 示例：用户点击事件、订单创建事件\n\n**KTable**：\n- 表示变化的数据集（物化视图）\n- 每条记录是对之前状态的更新\n- 适合维护最新状态\n- 示例：用户最新位置、商品库存数量\n\n**转换关系**：\n- KStream 可以通过聚合操作（groupBy + count/sum）转换为 KTable\n- KTable 可以通过 `toStream()` 转换为 KStream（产生变更流）',
              },
              {
                question: 'Kafka Streams 如何处理背压（Backpressure）？',
                answer: 'Kafka Streams 通过以下机制处理背压：\n\n1. **Consumer 拉取控制**：基于 Kafka Consumer 的拉取模式，可以根据处理能力控制拉取速度。\n\n2. **缓冲区限制**：内部使用有限的缓冲区，当缓冲区满时会暂停拉取。\n\n3. **异步处理**：支持异步处理模式，避免阻塞主线程。\n\n4. **监控指标**：提供 `record-lag-max` 等指标，监控消费延迟，及时发现背压问题。\n\n**最佳实践**：\n- 合理设置 `max.poll.records` 和 `fetch.max.bytes`\n- 监控消费延迟和吞吐量\n- 必要时增加应用实例数，水平扩展处理能力',
              },
            ]}
          />

          {/* ========== 十二、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>

          <ul className="space-y-3 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
            <li>
              <strong>前置知识：</strong>建议先了解 <a href="/docs/kafka/kafka-architecture" className="text-accent hover:underline">Kafka 架构与核心概念</a> 和 <a href="/docs/kafka/kafka-producer-consumer" className="text-accent hover:underline">Kafka 生产者与消费者</a>。
            </li>
            <li>
              <strong>下一篇：</strong><a href="/docs/kafka/kafka-performance-tuning" className="text-accent hover:underline">Kafka 性能调优</a>，深入学习 Kafka 的性能优化技巧。
            </li>
            <li>
              <strong>相关知识点：</strong>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><a href="/docs/13-bigdata-ecosystem/flink-streaming" className="text-accent hover:underline">Flink 实时计算框架</a>：对比学习不同流处理框架</li>
                <li><a href="/docs/13-bigdata-ecosystem/stream-batch-unified" className="text-accent hover:underline">流批一体处理</a>：了解流处理和批处理的统一</li>
                <li><a href="/docs/13-bigdata-ecosystem/realtime-data-warehouse" className="text-accent hover:underline">实时数仓架构设计</a>：Kafka Streams 在实时数仓中的应用</li>
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
