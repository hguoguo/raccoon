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
  { id: 'architecture', text: '一、Flink 架构概览', level: 2 },
  { id: 'stream-api', text: '二、DataStream API', level: 2 },
  { id: 'window', text: '三、窗口机制', level: 2 },
  { id: 'watermark', text: '四、Watermark 水位线', level: 2 },
  { id: 'state-checkpoint', text: '五、状态管理与 Checkpoint', level: 2 },
  { id: 'exactly-once', text: '六、Exactly-Once 语义', level: 2 },
  { id: 'fault-tolerance', text: '七、容错机制', level: 2 },
  { id: 'performance', text: '八、性能优化', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function FlinkStreaming({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Apache Flink 是一个<strong className="text-accent">分布式流处理引擎</strong>，支持高吞吐、低延迟的实时数据处理，提供精确一次（Exactly-Once）语义和强大的状态管理能力，适用于实时分析、事件驱动应用和复杂事件处理场景。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么选择 Flink？">
            Flink 原生支持流处理，相比 Spark Streaming 的微批处理模型，具有更低的延迟和更高的吞吐量。其基于 Chandy-Lamport 算法的 checkpoint 机制保证了数据一致性，适合对实时性和准确性要求极高的场景。
          </Callout>

          <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Flink 架构概览
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Flink 采用主从架构，由 JobManager（主节点）和 TaskManager（工作节点）组成，支持 standalone、YARN、Kubernetes 等多种部署模式。
          </p>

          <DiagramBlock title="Flink 运行时架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────┐
│              JobManager (Master)             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │Dispatcher│  │ResourceManager│ │Checkpoint│ │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│TaskManager│ │TaskManager│ │TaskManager│
│ Slot 1   │ │ Slot 2   │ │ Slot 3   │
│ Task A   │ │ Task B   │ │ Task C   │
└──────────┘ └──────────┘ └──────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="Slot 概念">
            每个 TaskManager 可以配置多个 slot，slot 是资源隔离的最小单位。一个 slot 可以执行一个 subtask，多个 subtask 可以共享同一个 slot（通过 pipelining）。
          </SideNote>

          <h2 id="stream-api" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、DataStream API
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            DataStream API 是 Flink 的核心编程接口，用于构建流处理应用程序。它提供了丰富的转换操作，如 map、filter、keyBy、window 等。
          </p>

          <Playground
            code={`import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.api.common.functions.MapFunction;

public class FlinkWordCount {
    public static void main(String[] args) throws Exception {
        // 1. 创建执行环境
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        
        // 2. 设置并行度
        env.setParallelism(4);
        
        // 3. 读取数据源
        DataStream<String> textStream = env.socketTextStream("localhost", 9999);
        
        // 4. 转换操作
        DataStream<WordCount> wordCounts = textStream
            .flatMap((String line, Collector<WordCount> out) -> {
                for (String word : line.split("\\\\s+")) {
                    out.collect(new WordCount(word, 1));
                }
            })
            .returns(WordCount.class)
            .keyBy(value -> value.word)
            .sum("count");
        
        // 5. 输出结果
        wordCounts.print();
        
        // 6. 执行作业
        env.execute("Flink Word Count");
    }
    
    public static class WordCount {
        public String word;
        public long count;
        
        public WordCount() {}
        
        public WordCount(String word, long count) {
            this.word = word;
            this.count = count;
        }
    }
}`}
            language="java"
            highlights={[7, 10, 13, 16, 22, 26]}
            filename="FlinkWordCount.java"
            description="Flink DataStream API 基础示例"
          />

          <Callout type="info" title="API 层次结构">
            Flink 提供三层 API：<br/>
            ① <strong>ProcessFunction</strong>：最底层，提供最大的灵活性<br/>
            ② <strong>DataStream API</strong>：核心 API，平衡灵活性和易用性<br/>
            ③ <strong>Table API / SQL</strong>：最高层，声明式查询，适合熟悉 SQL 的用户
          </Callout>

          <h2 id="window" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、窗口机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            窗口是将无限流划分为有限块进行计算的机制。Flink 支持时间窗口（Tumbling、Sliding、Session）和计数窗口。
          </p>

          <Playground
            code={`// Tumbling Window（滚动窗口）- 不重叠
DataStream<SensorReading> sensorData = ...;
sensorData
    .keyBy(SensorReading::getSensorId)
    .window(TumblingEventTimeWindows.of(Time.minutes(5)))
    .average(SensorReading::getTemperature);

// Sliding Window（滑动窗口）- 重叠
sensorData
    .keyBy(SensorReading::getSensorId)
    .window(SlidingEventTimeWindows.of(Time.minutes(10), Time.minutes(1)))
    .average(SensorReading::getTemperature);

// Session Window（会话窗口）- 动态间隔
sensorData
    .keyBy(SensorReading::getSensorId)
    .window(EventTimeSessionWindows.withGap(Time.minutes(10)))
    .average(SensorReading::getTemperature);`}
            language="java"
            highlights={[4, 8, 12]}
            filename="WindowTypes.java"
            description="Flink 窗口类型对比"
          />

          <DiagramBlock title="窗口类型可视化">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
Tumbling Window (5min):
[-----][-----][-----][-----]

Sliding Window (10min, slide 1min):
[----------]
 [----------]
  [----------]
   [----------]

Session Window (gap 10min):
[----]        [------]     [---]
            `}</pre>
          </DiagramBlock>

          <h2 id="watermark" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Watermark 水位线
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Watermark 是 Flink 处理乱序事件时间的机制，表示"在这个时间点之前的数据都已到达"。它决定了窗口的触发时机。
          </p>

          <Playground
            code={`// 分配 timestamp 和 watermark
DataStream<SensorReading> sensorData = ...;

// 方式 1：Bounded Out-of-Orderness（有界乱序）
sensorData.assignTimestampsAndWatermarks(
    WatermarkStrategy.<SensorReading>forBoundedOutOfOrderness(Duration.ofSeconds(5))
        .withTimestampAssigner((event, timestamp) -> event.getTimestamp())
);

// 方式 2：Monotonous Timestamps（单调递增）
sensorData.assignTimestampsAndWatermarks(
    WatermarkStrategy.<SensorReading>forMonotonousTimestamps()
        .withTimestampAssigner((event, timestamp) -> event.getTimestamp())
);

// 自定义 Watermark Strategy
WatermarkStrategy<SensorReading> customStrategy = new WatermarkStrategy<SensorReading>() {
    @Override
    public TimestampAssigner<SensorReading> createTimestampAssigner(Context context) {
        return (event, recordTimestamp) -> event.getTimestamp();
    }
    
    @Override
    public WatermarkGenerator<SensorReading> createWatermarkGenerator(Context context) {
        return new BoundedOutOfOrdernessWatermarks<>(Duration.ofSeconds(10));
    }
};`}
            language="java"
            highlights={[5, 10, 16]}
            filename="WatermarkStrategy.java"
            description="Watermark 策略配置"
          />

          <SideNote label="Watermark 重要性">
            Watermark 过大会导致延迟增加，过小会导致数据丢失。需要根据实际业务的乱序程度合理设置，通常设置为最大预期乱序时间。
          </SideNote>

          <h2 id="state-checkpoint" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、状态管理与 Checkpoint
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Flink 的状态管理允许算子保存中间结果，Checkpoint 机制定期保存状态快照，实现故障恢复。
          </p>

          <Playground
            code={`// 使用 ValueState
public class StatefulMapper extends RichMapFunction<String, String> {
    private transient ValueState<Integer> countState;
    
    @Override
    public void open(Configuration parameters) {
        ValueStateDescriptor<Integer> descriptor = 
            new ValueStateDescriptor<>("count", Integer.class, 0);
        countState = getRuntimeContext().getState(descriptor);
    }
    
    @Override
    public String map(String value) {
        Integer currentCount = countState.value();
        currentCount++;
        countState.update(currentCount);
        return value + " (count: " + currentCount + ")";
    }
}

// 启用 Checkpoint
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
env.enableCheckpointing(60000); // 每 60 秒 checkpoint
env.getCheckpointConfig().setCheckpointingMode(CheckpointingMode.EXACTLY_ONCE);
env.getCheckpointConfig().setMinPauseBetweenCheckpoints(30000); // 最小间隔
env.getCheckpointConfig().setCheckpointTimeout(600000); // 超时时间
env.getCheckpointConfig().setMaxConcurrentCheckpoints(1); // 最大并发数`}
            language="java"
            highlights={[3, 7, 12, 21, 22, 23]}
            filename="StateManagement.java"
            description="状态管理与 Checkpoint 配置"
          />

          <Callout type="warning" title="状态后端选择">
            Flink 提供三种状态后端：<br/>
            ① <strong>MemoryStateBackend</strong>：状态存储在 JVM 堆内存，适合小状态测试<br/>
            ② <strong>FsStateBackend</strong>：状态存储在文件系统，checkpoint 元数据在 JobManager<br/>
            ③ <strong>RocksDBStateBackend</strong>：状态存储在 RocksDB，适合大状态生产环境
          </Callout>

          <h2 id="exactly-once" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、Exactly-Once 语义
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Exactly-Once 语义保证每条数据只被处理一次，即使发生故障也不会重复或丢失。Flink 通过 Checkpoint + 两阶段提交实现。
          </p>

          <DiagramBlock title="两阶段提交流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
Phase 1: Pre-commit
Source → Transform → Sink (prepare commit)
         ↓ Checkpoint Barrier
       Global Snapshot

Phase 2: Commit
All operators acknowledge checkpoint
Sink commits transaction
Data is durably stored
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`// Kafka Sink with Exactly-Once semantics
DataStream<String> stream = ...;

stream.addSink(new FlinkKafkaProducer<String>(
    "localhost:9092",           // broker addresses
    "output-topic",             // target topic
    new SimpleStringSchema()    // serialization schema
)).setParallelism(4);

// 配置 Kafka producer properties
Properties properties = new Properties();
properties.setProperty("transaction.timeout.ms", "600000");
properties.setProperty("enable.idempotence", "true");

FlinkKafkaProducer<String> kafkaProducer = new FlinkKafkaProducer<>(
    "output-topic",
    new KeyedSerializationSchemaWrapper<>(new SimpleStringSchema()),
    properties,
    FlinkKafkaProducer.Semantic.EXACTLY_ONCE
);

stream.addSink(kafkaProducer);`}
            language="java"
            highlights={[4, 11, 16]}
            filename="ExactlyOnceKafka.java"
            description="Kafka Sink Exactly-Once 配置"
          />

          <h2 id="fault-tolerance" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、容错机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Flink 的容错基于 Chandy-Lamport 分布式快照算法，通过周期性 checkpoint 实现故障恢复。
          </p>

          <Playground
            code={`// 容错配置最佳实践
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// 启用 checkpoint
env.enableCheckpointing(60000);

// 配置 checkpoint 行为
CheckpointConfig config = env.getCheckpointConfig();
config.setCheckpointingMode(CheckpointingMode.EXACTLY_ONCE);
config.setMinPauseBetweenCheckpoints(30000);
config.setCheckpointTimeout(600000);
config.setMaxConcurrentCheckpoints(1);
config.setExternalizedCheckpointCleanup(
    ExternalizedCheckpointCleanup.RETAIN_ON_CANCELLATION
);

// 配置重启策略
env.setRestartStrategy(RestartStrategies.fixedDelayRestart(
    3,      // 尝试重启次数
    Time.of(10, TimeUnit.SECONDS)  // 重启间隔
));

// 配置状态后端
env.setStateBackend(new RocksDBStateBackend("hdfs:///checkpoints"));`}
            language="java"
            highlights={[5, 8, 17, 22]}
            filename="FaultToleranceConfig.java"
            description="容错机制配置"
          />

          <h2 id="performance" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、性能优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Flink 性能优化涉及并行度设置、状态后端选择、网络缓冲区配置等多个方面。
          </p>

          <Callout type="tip" title="性能优化要点">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>并行度设置</strong>：根据数据量和集群资源合理设置 parallelism</li>
              <li><strong>状态优化</strong>：使用 RocksDB 状态后端，启用增量 checkpoint</li>
              <li><strong>网络调优</strong>：调整 network buffer 大小，减少序列化开销</li>
              <li><strong>反压处理</strong>：监控反压指标，优化慢算子</li>
              <li><strong>数据倾斜</strong>：使用 salting 技术解决 key 分布不均问题</li>
            </ul>
          </Callout>

          <Playground
            code={`// 性能优化配置示例
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// 1. 设置合适的并行度
env.setParallelism(16);

// 2. 配置网络缓冲区
env.getConfig().setNetworkBufferSize(32 * 1024); // 32KB

// 3. 启用对象重用
env.getConfig().enableObjectReuse();

// 4. 配置 RocksDB 状态后端
RocksDBStateBackend rocksDB = new RocksDBStateBackend("hdfs:///checkpoints");
rocksDB.setIncrementalCheckpointing(true); // 增量 checkpoint
env.setStateBackend(rocksDB);

// 5. 优化 checkpoint
env.enableCheckpointing(60000);
env.getCheckpointConfig().enableUnalignedCheckpoints(); // 非对齐 checkpoint

// 6. 监控配置
env.getConfig().setLatencyTrackingInterval(5000); // 延迟追踪`}
            language="java"
            highlights={[5, 8, 11, 14, 18, 21]}
            filename="PerformanceOptimization.java"
            description="性能优化配置"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1：Watermark 越大越好">
            <p className="mb-2"><strong>错误认知</strong>：认为设置较大的 watermark 可以处理更多乱序数据。</p>
            <p><strong>正确理解</strong>：过大的 watermark 会增加处理延迟，影响实时性。应该根据实际业务的最大乱序时间来设置，通常在几秒到几分钟之间。</p>
          </Callout>

          <Callout type="danger" title="误区 2：Checkpoint 频率越高越好">
            <p className="mb-2"><strong>错误认知</strong>：认为频繁 checkpoint 可以提高数据安全性。</p>
            <p><strong>正确理解</strong>：过于频繁的 checkpoint 会增加系统负担，影响吞吐量。需要在数据安全和性能之间找到平衡点，通常 1-5 分钟一次比较合适。</p>
          </Callout>

          <Callout type="warning" title="误区 3：所有算子都需要状态">
            <p className="mb-2"><strong>错误认知</strong>：认为为所有算子添加状态可以提高程序功能。</p>
            <p><strong>正确理解</strong>：不必要的状态会增加内存消耗和 checkpoint 开销。只有真正需要跨事件保持信息的算子才应该使用状态。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Flink 相比 Spark Streaming 的优势是什么？",
              answer: "① 原生流处理 vs 微批处理，延迟更低；② 精确一次语义保证；③ 强大的状态管理；④ 更好的容错机制；⑤ 支持事件时间处理。Spark Streaming 适合批流统一场景，Flink 适合对延迟敏感的实时应用。"
            },
            {
              question: "解释 Flink 的 Checkpoint 机制原理",
              answer: "基于 Chandy-Lamport 分布式快照算法：① JobManager 定期发送 checkpoint barrier；② barrier 随数据流传播，触发各算子保存状态；③ 所有算子完成 checkpoint 后，JobManager 确认 checkpoint 完成；④ 故障时从最近的 checkpoint 恢复状态。"
            },
            {
              question: "如何处理 Flink 中的数据倾斜问题？",
              answer: "① 使用 salting 技术：给 key 添加随机前缀分散数据；② 调整并行度；③ 使用 rebalance 重新分区；④ 优化 key 的选择；⑤ 预聚合减少数据量。关键是要均匀分布数据到各个 subtask。"
            },
            {
              question: "Flink 的 Exactly-Once 语义是如何实现的？",
              answer: "通过 Checkpoint + 两阶段提交实现：① 周期性 checkpoint 保存状态；② sink 端支持事务；③ checkpoint 完成时提交事务；④ 故障时回滚未完成的事务。需要 source 可重放和 sink 支持事务。"
            },
            {
              question: "如何优化 Flink 作业的性能？",
              answer: "① 合理设置并行度；② 选择合适的状态后端；③ 启用增量 checkpoint；④ 优化网络缓冲区；⑤ 处理反压问题；⑥ 避免数据倾斜；⑦ 使用对象重用；⑧ 监控关键指标。"
            },
            {
              question: "Flink 的时间概念有哪些？有什么区别？",
              answer: "① Event Time：事件发生时间，最准确但需要 watermark；② Processing Time：系统处理时间，简单但不准确；③ Ingestion Time：进入 Flink 的时间，折中方案。推荐使用 Event Time 配合 watermark 处理乱序数据。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/infra/bigdata/13-bigdata-ecosystem/spark-computing" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">对比技术 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">Spark 分布式计算</div>
              <div className="text-[12px] text-ink-muted mt-1">批处理与微批流处理</div>
            </a>
            <a href="/docs/infra/bigdata/13-bigdata-ecosystem/hadoop-ecosystem" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">生态系统 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">Hadoop 生态系统</div>
              <div className="text-[12px] text-ink-muted mt-1">大数据基础架构</div>
            </a>
            <a href="/docs/infra/messaging/kafka/kafka-architecture" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">数据源 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">Kafka 消息队列</div>
              <div className="text-[12px] text-ink-muted mt-1">实时数据摄入</div>
            </a>
            <a href="/docs/infra/nosql/redis/redis-cache" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">状态存储 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Redis 缓存</div>
              <div className="text-[12px] text-ink-muted mt-1">外部状态管理</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            Flink 学习建议按以下顺序：① 掌握 DataStream API 基础操作；② 理解窗口和水位线机制；③ 深入学习状态管理和 checkpoint；④ 实践 Exactly-Once 语义；⑤ 掌握性能调优技巧。建议结合实际项目练习，从简单的 word count 开始逐步深入。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}