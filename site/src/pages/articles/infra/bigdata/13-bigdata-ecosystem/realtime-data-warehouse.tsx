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
  { id: 'architecture-patterns', text: '一、实时数仓架构模式', level: 2 },
  { id: 'lambda-architecture', text: '二、Lambda 架构详解', level: 2 },
  { id: 'kappa-architecture', text: '三、Kappa 架构详解', level: 2 },
  { id: 'stream-batch-unified', text: '四、流批一体架构', level: 2 },
  { id: 'data-lake-integration', text: '五、数据湖集成', level: 2 },
  { id: 'tech-stack', text: '六、技术栈选型', level: 2 },
  { id: 'implementation', text: '七、实现方案', level: 2 },
  { id: 'performance', text: '八、性能优化', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function RealtimeDataWarehouse({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              实时数仓是<strong className="text-accent">支持秒级或亚秒级数据延迟</strong>的数据仓库架构，通过流式计算引擎对实时数据进行处理和分析，提供低延迟的数据查询和决策支持能力，适用于实时监控、实时推荐、风控等场景。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要实时数仓？">
            传统离线数仓 T+1 的延迟无法满足现代业务对实时性的要求。实时数仓可以将数据延迟从小时级降低到秒级，支持实时决策和快速响应，是数字化转型的关键基础设施。
          </Callout>

          <h2 id="architecture-patterns" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、实时数仓架构模式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            实时数仓经历了从 Lambda 架构到 Kappa 架构，再到流批一体架构的演进过程，每种架构都有其适用场景和优缺点。
          </p>

          <DiagramBlock title="实时数仓架构演进">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
演进路线：
Lambda → Kappa → 流批一体

特点对比：
┌──────────┬────────────┬────────────┬────────────┐
│ 架构     │ 复杂度     │ 一致性     │ 维护成本   │
├──────────┼────────────┼────────────┼────────────┤
│ Lambda   │ 高         │ 最终一致   │ 高         │
│ Kappa    │ 中         │ 强一致     │ 中         │
│ 流批一体 │ 低         │ 强一致     │ 低         │
└──────────┴────────────┴────────────┴────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="架构选择原则">
            选择架构时需要考虑：数据延迟要求、数据一致性要求、团队技术能力、运维复杂度等因素。没有最好的架构，只有最适合的架构。
          </SideNote>

          <h2 id="lambda-architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Lambda 架构详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Lambda 架构将数据处理分为批处理层和速度层，通过服务层合并结果，兼顾准确性和实时性。
          </p>

          <DiagramBlock title="Lambda 架构三层结构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
                    ┌─────────────┐
                    │  Service Layer │
                    │  (合并结果)    │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │ Batch Layer  │ │Speed Layer  │ │ Serving Layer│
    │ (离线计算)   │ │(实时计算)   │ │ (查询服务)   │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │ HDFS/Hive   │ │ Kafka/Flink │ │  OLAP Engine │
    └─────────────┘ └─────────────┘ └─────────────┘
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`// Lambda 架构示例代码
// 批处理层 - Hive SQL
CREATE TABLE batch_user_behavior AS
SELECT 
    user_id,
    COUNT(*) as total_actions,
    AVG(action_duration) as avg_duration
FROM user_behavior_log
WHERE dt >= '${'{'}batch_date{'}'}'
GROUP BY user_id;

// 速度层 - Flink Streaming
DataStream<UserAction> actions = env.addSource(kafkaSource);
actions
    .keyBy(UserAction::getUserId)
    .window(TumblingEventTimeWindows.of(Time.minutes(5)))
    .aggregate(new UserActionAggregator())
    .addSink(redisSink);

// 服务层 - 结果合并
public class LambdaServiceLayer {
    public UserStats getUserStats(String userId) {
        // 获取批处理结果
        UserStats batchStats = batchStore.get(userId);
        // 获取实时结果
        UserStats realTimeStats = redisStore.get(userId);
        // 合并结果
        return mergeStats(batchStats, realTimeStats);
    }
}`}
            language="java"
            highlights={[3, 12, 22]}
            filename="LambdaArchitecture.java"
            description="Lambda 架构实现示例"
          />

          <Callout type="warning" title="Lambda 架构的问题">
            ① <strong>代码重复</strong>：批处理和流处理需要维护两套代码；② <strong>数据不一致</strong>：两层计算结果可能存在差异；③ <strong>运维复杂</strong>：需要维护多个系统组件；④ <strong>资源浪费</strong>：相同逻辑在不同层重复计算。
          </Callout>

          <h2 id="kappa-architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Kappa 架构详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kappa 架构简化了 Lambda 架构，只保留流处理层，通过重放历史数据来处理批量计算需求。
          </p>

          <DiagramBlock title="Kappa 架构流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
数据源 → Kafka → Flink Stream Processing → OLAP Engine
                ↕
          (历史数据重放)
          
优势：
• 单一代码库
• 数据一致性保证
• 简化运维
• 支持历史数据回溯
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`// Kappa 架构 - 统一流处理
public class KappaArchitecture {
    
    // 实时数据处理
    public void processRealTime() {
        DataStream<Event> stream = env.addSource(kafkaSource);
        stream
            .keyBy(Event::getUserId)
            .window(TumblingEventTimeWindows.of(Time.minutes(1)))
            .process(new EventProcessor())
            .addSink(olapSink);
    }
    
    // 历史数据重放（批量处理）
    public void replayHistory(LocalDate startDate, LocalDate endDate) {
        // 从 Kafka 重放历史数据
        DataStream<Event> historyStream = env.addSource(
            new KafkaSourceBuilder<Event>()
                .setTopics("events")
                .setStartingOffsets(OffsetsInitializer.timestamp(startDate.toEpochDay() * 86400000))
                .setStoppingOffsets(OffsetsInitializer.timestamp(endDate.toEpochDay() * 86400000))
                .build()
        );
        
        // 使用相同的处理逻辑
        historyStream
            .keyBy(Event::getUserId)
            .window(TumblingEventTimeWindows.of(Time.days(1)))
            .process(new EventProcessor())  // 相同的处理器
            .addSink(olapSink);
    }
}`}
            language="java"
            highlights={[7, 16, 25]}
            filename="KappaArchitecture.java"
            description="Kappa 架构实现示例"
          />

          <SideNote label="Kappa 架构优势">
            Kappa 架构的核心思想是"一切皆流"，通过消息队列的重放能力，用统一的流处理逻辑替代批处理和流处理的双重实现。
          </SideNote>

          <h2 id="stream-batch-unified" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、流批一体架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            流批一体架构是最新的演进方向，通过统一的 API 和引擎同时支持流处理和批处理，彻底解决代码重复问题。
          </p>

          <Playground
            code={`// Flink 流批一体示例
public class StreamBatchUnified {
    
    // 统一的 Table API
    public void unifiedProcessing() {
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        EnvironmentSettings settings = EnvironmentSettings.newInstance().build();
        TableEnvironment tableEnv = TableEnvironment.create(settings);
        
        // 定义数据源（可以是流也可以是批）
        tableEnv.executeSql(
            "CREATE TABLE user_events (" +
            "    user_id BIGINT," +
            "    event_type STRING," +
            "    event_time TIMESTAMP(3)," +
            "    WATERMARK FOR event_time AS event_time - INTERVAL '5' SECOND" +
            ") WITH (" +
            "    'connector' = 'kafka'," +
            "    'topic' = 'user-events'," +
            "    'properties.bootstrap.servers' = 'localhost:9092'" +
            ")"
        );
        
        // 统一的 SQL 查询（流批通用）
        Table result = tableEnv.sqlQuery(
            "SELECT " +
            "    user_id, " +
            "    COUNT(*) as event_count, " +
            "    TUMBLE_START(event_time, INTERVAL '1' HOUR) as window_start " +
            "FROM user_events " +
            "GROUP BY user_id, TUMBLE(event_time, INTERVAL '1' HOUR)"
        );
        
        // 输出结果
        tableEnv.executeSql("INSERT INTO result_table SELECT * FROM " + result);
    }
    
    // 批处理模式
    public void batchProcessing() {
        // 切换到批执行模式
        tableEnv.getConfig().setExecutionMode(ExecutionMode.BATCH);
        
        // 读取历史数据
        Table batchData = tableEnv.from("hive_catalog.default.historical_events");
        
        // 使用相同的 SQL 逻辑
        Table batchResult = tableEnv.sqlQuery(
            "SELECT user_id, COUNT(*) FROM historical_events GROUP BY user_id"
        );
    }
}`}
            language="java"
            highlights={[11, 25, 38, 43]}
            filename="StreamBatchUnified.java"
            description="流批一体架构实现"
          />

          <Callout type="info" title="流批一体的核心价值">
            ① <strong>代码复用</strong>：一套代码同时支持流和批；② <strong>语义一致</strong>：流批处理结果完全一致；③ <strong>简化运维</strong>：只需维护一个系统；④ <strong>灵活切换</strong>：根据场景选择执行模式。
          </Callout>

          <h2 id="data-lake-integration" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、数据湖集成
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            现代实时数仓通常与数据湖集成，利用 Iceberg、Hudi 等数据湖格式实现 ACID 事务和时间旅行查询。
          </p>

          <Playground
            code={`// Flink + Iceberg 实时数仓示例
public class RealtimeDataLake {
    
    public void realtimeToDataLake() {
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        StreamTableEnvironment tableEnv = StreamTableEnvironment.create(env);
        
        // 创建 Iceberg 表
        tableEnv.executeSql(
            "CREATE CATALOG iceberg_catalog WITH (" +
            "    'type' = 'iceberg'," +
            "    'catalog-type' = 'hive'," +
            "    'uri' = 'thrift://hive-metastore:9083'," +
            "    'warehouse' = 'hdfs:///warehouse'" +
            ")"
        );
        
        // 实时写入 Iceberg
        tableEnv.executeSql(
            "INSERT INTO iceberg_catalog.db.realtime_events " +
            "SELECT * FROM kafka_source_table"
        );
        
        // 实时查询
        Table realtimeQuery = tableEnv.sqlQuery(
            "SELECT " +
            "    DATE_FORMAT(event_time, 'yyyy-MM-dd HH:00') as hour, " +
            "    COUNT(*) as event_count " +
            "FROM iceberg_catalog.db.realtime_events " +
            "WHERE event_time >= CURRENT_TIMESTAMP - INTERVAL '1' HOUR " +
            "GROUP BY DATE_FORMAT(event_time, 'yyyy-MM-dd HH:00')"
        );
    }
    
    // 时间旅行查询
    public void timeTravelQuery() {
        tableEnv.executeSql(
            "SELECT * FROM iceberg_catalog.db.realtime_events " +
            "FOR SYSTEM_TIME AS OF TIMESTAMP '2024-01-01 00:00:00'"
        );
    }
}`}
            language="java"
            highlights={[9, 18, 25, 35]}
            filename="RealtimeDataLake.java"
            description="实时数仓与数据湖集成"
          />

          <DiagramBlock title="实时数仓技术栈">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
数据采集层：Flume, Logstash, Canal, Debezium
消息队列层：Kafka, Pulsar, RocketMQ
计算引擎层：Flink, Spark Streaming
存储层：Iceberg, Hudi, Delta Lake
查询引擎：Presto, Trino, ClickHouse
调度层：Airflow, DolphinScheduler
监控层：Prometheus, Grafana
            `}</pre>
          </DiagramBlock>

          <h2 id="tech-stack" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、技术栈选型
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            实时数仓技术栈选择需要考虑数据规模、延迟要求、团队技能等多个因素。
          </p>

          <Callout type="tip" title="技术栈选型建议">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>中小规模</strong>：Flink + Kafka + Redis + MySQL</li>
              <li><strong>大规模</strong>：Flink + Kafka + Iceberg + Presto</li>
              <li><strong>超大规模</strong>：Flink + Kafka + Hudi + ClickHouse</li>
              <li><strong>云原生</strong>：Kinesis + Lambda + Redshift + Athena</li>
            </ul>
          </Callout>

          <h2 id="implementation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、实现方案
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            实时数仓的实现需要分层设计，包括 ODS、DWD、DWS、ADS 等层次。
          </p>

          <Playground
            code={`// 实时数仓分层实现
public class RealtimeDataWarehouse {
    
    // ODS 层 - 原始数据层
    public void odsLayer() {
        // 从 Kafka 读取原始数据
        DataStream<String> rawStream = env.addSource(kafkaSource);
        
        // 直接写入 ODS 表
        rawStream.addSink(new JdbcSink<>(
            "INSERT INTO ods_raw_data VALUES (?, ?, ?)",
            (statement, data) -> {
                statement.setString(1, extractField(data, "id"));
                statement.setString(2, extractField(data, "timestamp"));
                statement.setString(3, data);
            }
        ));
    }
    
    // DWD 层 - 明细数据层
    public void dwdLayer() {
        DataStream<Event> cleanedStream = rawStream
            .map(new DataCleaner())
            .filter(new DataValidator());
        
        // 维度关联
        DataStream<EnrichedEvent> enrichedStream = cleanedStream
            .keyBy(Event::getUserId)
            .connect(userDimensionStream)
            .process(new DimensionJoinFunction());
        
        enrichedStream.addSink(icebergSink);
    }
    
    // DWS 层 - 汇总数据层
    public void dwsLayer() {
        DataStream<UserStats> statsStream = enrichedStream
            .keyBy(EnrichedEvent::getUserId)
            .window(TumblingEventTimeWindows.of(Time.hours(1)))
            .aggregate(new UserStatsAggregator());
        
        statsStream.addSink(clickhouseSink);
    }
    
    // ADS 层 - 应用数据层
    public void adsLayer() {
        // 为具体应用提供定制化数据
        DataStream<DashboardData> dashboardStream = statsStream
            .map(new DashboardDataTransformer());
        
        dashboardStream.addSink(redisSink);
    }
}`}
            language="java"
            highlights={[7, 21, 32, 43]}
            filename="DataWarehouseLayers.java"
            description="实时数仓分层实现"
          />

          <h2 id="performance" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、性能优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            实时数仓性能优化涉及多个层面，包括数据倾斜处理、状态管理优化、 checkpoint 调优等。
          </p>

          <Callout type="tip" title="性能优化要点">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>数据倾斜</strong>：使用加盐技术分散热点 key</li>
              <li><strong>状态优化</strong>：合理设置 TTL，使用 RocksDB 状态后端</li>
              <li><strong>Checkpoint 调优</strong>：启用增量 checkpoint，调整间隔</li>
              <li><strong>并行度设置</strong>：根据数据量和集群资源合理配置</li>
              <li><strong>内存管理</strong>：调整 JVM 参数，避免 GC 问题</li>
            </ul>
          </Callout>

          <Playground
            code={`// 性能优化配置
public class PerformanceOptimization {
    
    public void optimizeConfiguration() {
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        
        // 1. 并行度优化
        env.setParallelism(16);
        
        // 2. Checkpoint 优化
        env.enableCheckpointing(60000);
        CheckpointConfig config = env.getCheckpointConfig();
        config.enableUnalignedCheckpoints(); // 非对齐 checkpoint
        config.setMinPauseBetweenCheckpoints(30000);
        
        // 3. 状态后端优化
        RocksDBStateBackend rocksDB = new RocksDBStateBackend("hdfs:///checkpoints");
        rocksDB.setIncrementalCheckpointing(true);
        env.setStateBackend(rocksDB);
        
        // 4. 网络缓冲区优化
        env.getConfig().setNetworkBufferSize(64 * 1024);
        
        // 5. 反压监控
        env.getConfig().setLatencyTrackingInterval(5000);
    }
    
    // 数据倾斜处理
    public void handleDataSkew(DataStream<Event> stream) {
        return stream
            .map(event -> {
                // 加盐处理
                String saltedKey = event.getKey() + "_" + RandomUtils.nextInt(0, 100);
                return Tuple2.of(saltedKey, event);
            })
            .keyBy(value -> value.f0)
            .window(TumblingEventTimeWindows.of(Time.minutes(5)))
            .aggregate(new Aggregator())
            .map(tuple -> {
                // 去盐
                String originalKey = tuple.f0.split("_")[0];
                return Tuple2.of(originalKey, tuple.f1);
            });
    }
}`}
            language="java"
            highlights={[8, 11, 16, 21, 24, 29]}
            filename="PerformanceOptimization.java"
            description="实时数仓性能优化"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1：实时数仓可以完全替代离线数仓">
            <p className="mb-2"><strong>错误认知</strong>：认为有了实时数仓就不需要离线数仓了。</p>
            <p><strong>正确理解</strong>：实时数仓和离线数仓各有优势，应该互补使用。实时数仓适合低延迟场景，离线数仓适合复杂分析和历史数据挖掘。</p>
          </Callout>

          <Callout type="danger" title="误区 2：延迟越低越好">
            <p className="mb-2"><strong>错误认知</strong>：认为实时数仓的延迟应该追求极致低。</p>
            <p><strong>正确理解</strong>：过低的延迟会增加系统复杂度和成本。应该根据业务需求选择合适的延迟级别，通常秒级延迟已经能满足大部分场景。</p>
          </Callout>

          <Callout type="warning" title="误区 3：忽略数据质量">
            <p className="mb-2"><strong>错误认知</strong>：认为实时数仓只需要关注性能，不需要关注数据质量。</p>
            <p><strong>正确理解</strong>：数据质量是数仓的生命线，实时数仓同样需要完善的数据校验、监控和治理机制。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Lambda 架构和 Kappa 架构的区别是什么？",
              answer: "Lambda 架构采用批流分离的设计，有批处理层和速度层，代码复杂但准确性高；Kappa 架构只保留流处理层，通过重放历史数据实现批量计算，代码简单但依赖消息队列的重放能力。Kappa 是 Lambda 的简化版本。"
            },
            {
              question: "如何实现实时数仓的数据一致性？",
              answer: "① 使用 Exactly-Once 语义保证数据处理不重复不丢失；② 采用两阶段提交协议；③ 合理设置 checkpoint；④ 使用支持事务的存储系统；⑤ 建立数据对账机制。关键是要在性能和一致性之间找到平衡。"
            },
            {
              question: "实时数仓如何处理数据倾斜问题？",
              answer: "① 加盐技术：给热点 key 添加随机前缀分散数据；② 提高并行度；③ 使用 rebalance 重新分区；④ 预聚合减少数据量；⑤ 优化 key 的选择。需要根据具体情况选择合适的方案。"
            },
            {
              question: "实时数仓的分层设计有哪些？",
              answer: "① ODS 层：原始数据层，保持数据原貌；② DWD 层：明细数据层，清洗和标准化；③ DWS 层：汇总数据层，轻度聚合；④ ADS 层：应用数据层，面向具体业务。分层设计有利于数据管理和复用。"
            },
            {
              question: "如何优化实时数仓的性能？",
              answer: "① 合理设置并行度；② 优化 checkpoint 配置；③ 选择合适的状态后端；④ 处理数据倾斜；⑤ 调整内存参数；⑥ 监控反压情况；⑦ 优化序列化方式；⑧ 使用增量计算。"
            },
            {
              question: "实时数仓与数据湖如何集成？",
              answer: "通过 Iceberg、Hudi 等数据湖格式实现：① 实时数据写入数据湖；② 利用数据湖的 ACID 特性保证一致性；③ 使用时间旅行功能支持历史查询；④ 统一批流存储格式。数据湖为实时数仓提供了可靠的存储基础。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/infra/bigdata/13-bigdata-ecosystem/stream-batch-unified" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">核心技术 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">流批一体处理</div>
              <div className="text-[12px] text-ink-muted mt-1">统一计算引擎</div>
            </a>
            <a href="/docs/infra/bigdata/13-bigdata-ecosystem/flink-streaming" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">计算引擎 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">Flink 实时计算</div>
              <div className="text-[12px] text-ink-muted mt-1">流处理核心引擎</div>
            </a>
            <a href="/docs/infra/messaging/kafka/kafka-architecture" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">数据接入 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">Kafka 消息队列</div>
              <div className="text-[12px] text-ink-muted mt-1">实时数据管道</div>
            </a>
            <a href="/docs/infra/oltp/clickhouse/clickhouse-architecture" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">查询引擎 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">ClickHouse OLAP</div>
              <div className="text-[12px] text-ink-muted mt-1">实时分析查询</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            实时数仓学习建议按以下顺序：① 理解传统数仓概念；② 掌握 Lambda 和 Kappa 架构；③ 学习 Flink 流处理；④ 实践流批一体；⑤ 了解数据湖集成。建议从简单的实时统计开始，逐步构建完整的实时数仓体系。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
