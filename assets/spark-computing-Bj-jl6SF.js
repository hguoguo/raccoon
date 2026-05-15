import{j as e,g as l}from"./index-hyqxTCwJ.js";import{K as d}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as a}from"./SideNote-BKvanovA.js";import{C as t,A as n,S as o}from"./ArticleNav-DhfiS38Y.js";import{D as i}from"./DiagramBlock-CLaKE9_7.js";import{I as p}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"architecture",text:"一、Spark 架构概览",level:2},{id:"rdd",text:"二、RDD 核心概念",level:2},{id:"dataframe-dataset",text:"三、DataFrame & Dataset",level:2},{id:"spark-sql",text:"四、Spark SQL",level:2},{id:"shuffle",text:"五、Shuffle 机制",level:2},{id:"caching",text:"六、缓存与持久化",level:2},{id:"optimization",text:"七、性能优化",level:2},{id:"misconceptions",text:"八、常见误区",level:2},{id:"interview",text:"九、面试真题",level:2},{id:"related",text:"十、知识关联",level:2}];function k({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(d,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Apache Spark 是一个",e.jsx("strong",{className:"text-accent",children:"统一的分布式大数据计算引擎"}),"，支持批处理、流处理、机器学习和图计算，基于内存计算模型提供比 Hadoop MapReduce 快 100 倍的性能，通过 RDD、DataFrame 等抽象简化大数据应用开发。"]})}),e.jsx(t,{type:"tip",title:"为什么选择 Spark？",children:"Spark 提供统一的技术栈处理多种大数据场景：Spark Core（批处理）、Spark Streaming（流处理）、Spark SQL（交互式查询）、MLlib（机器学习）、GraphX（图计算）。其基于内存的计算模型和 DAG 执行引擎使其在迭代算法和交互式数据分析场景中表现优异。"}),e.jsx("h2",{id:"architecture",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、Spark 架构概览"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spark 采用主从架构，由 Driver（驱动程序）和 Executor（执行器）组成，支持 standalone、YARN、Mesos、Kubernetes 等多种集群管理器。"}),e.jsx(i,{title:"Spark 运行时架构",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌─────────────────────────────────────────────┐
│              Cluster Manager                 │
│         (YARN / Mesos / K8s)                │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌──────────────┐      ┌────────────────┐
│   Driver     │      │   Executors    │
│  Program     │◄────►│  Worker Nodes  │
│              │      │                │
│ - SparkContext│     │ - Task 1       │
│ - DAGScheduler│     │ - Task 2       │
│ - SchedulerBackend│ │ - Cache        │
└──────────────┘      └────────────────┘
            `})}),e.jsx(a,{label:"Driver vs Executor",children:"Driver 负责程序调度、DAG 分解和任务分发；Executor 负责实际执行任务并存储数据。一个应用程序只有一个 Driver，但可以有多个 Executor。"}),e.jsx("h2",{id:"rdd",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、RDD 核心概念"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"RDD（Resilient Distributed Dataset）是 Spark 的核心抽象，表示不可变的分布式对象集合，具有容错性、并行性和惰性求值特性。"}),e.jsx(r,{code:`from pyspark import SparkContext

# 创建 SparkContext
sc = SparkContext("local", "RDD Example")

# 1. 从集合创建 RDD
data = [1, 2, 3, 4, 5]
rdd = sc.parallelize(data)

# 2. 从文件创建 RDD
rdd_file = sc.textFile("hdfs:///input/data.txt")

# 3. Transformation（转换操作 - 惰性求值）
rdd_mapped = rdd.map(lambda x: x * 2)
rdd_filtered = rdd.filter(lambda x: x > 2)
rdd_flatmapped = rdd.flatMap(lambda x: [x, x*2, x*3])

# 4. Action（行动操作 - 触发计算）
result = rdd_mapped.collect()
count = rdd_filtered.count()
sum_result = rdd.reduce(lambda a, b: a + b)

print(f"Mapped: {result}")
print(f"Count: {count}")
print(f"Sum: {sum_result}")

# 5. Key-Value RDD
kv_rdd = sc.parallelize([(1, "a"), (2, "b"), (1, "c"), (2, "d")])
grouped = kv_rdd.groupByKey().collect()
reduced = kv_rdd.reduceByKey(lambda a, b: a + b).collect()

sc.stop()`,language:"python",highlights:[7,10,13,14,15,18,19,20,23,24],filename:"rdd_basics.py",description:"RDD 基础操作示例"}),e.jsx(t,{type:"info",title:"RDD 五大特性",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"分区列表"}),"：RDD 由多个分区组成，每个分区在集群的不同节点上"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"依赖关系"}),"：记录 RDD 之间的依赖（窄依赖/宽依赖）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Compute 函数"}),"：计算每个分区的函数"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"分区器"}),"：Key-Value RDD 的分区策略（可选）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"优先位置"}),"：数据本地性优化（可选）"]})]})}),e.jsx(i,{title:"RDD 依赖关系",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
窄依赖（Narrow Dependency）：
Parent Partition 1 → Child Partition 1
Parent Partition 2 → Child Partition 2

宽依赖（Wide Dependency / Shuffle）：
Parent Partition 1 ─┐
Parent Partition 2 ─┼→ Child Partition 1
Parent Partition 3 ─┘
            `})}),e.jsx("h2",{id:"dataframe-dataset",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、DataFrame & Dataset"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"DataFrame 是带有 schema 信息的分布式数据集，Dataset 是类型安全的 API。相比 RDD，它们提供了更高级的抽象和优化。"}),e.jsx(r,{code:`from pyspark.sql import SparkSession
from pyspark.sql.functions import col, avg, count

# 创建 SparkSession
spark = SparkSession.builder     .appName("DataFrame Example")     .getOrCreate()

# 1. 从 RDD 创建 DataFrame
rdd = spark.sparkContext.parallelize([
    (1, "Alice", 25),
    (2, "Bob", 30),
    (3, "Charlie", 35)
])
df = rdd.toDF(["id", "name", "age"])

# 2. 从文件创建 DataFrame
df_csv = spark.read.csv("hdfs:///input/users.csv", header=True, inferSchema=True)
df_json = spark.read.json("hdfs:///input/data.json")
df_parquet = spark.read.parquet("hdfs:///input/users.parquet")

# 3. DataFrame 操作
df_filtered = df.filter(col("age") > 25)
df_selected = df.select("name", "age")
df_grouped = df.groupBy("age").agg(count("*").alias("count"))

# 4. SQL 查询
df.createOrReplaceTempView("users")
result = spark.sql("SELECT name, age FROM users WHERE age > 25")

# 5. Dataset（Scala/Java API）
// case class Person(id: Int, name: String, age: Int)
// val ds = Seq(Person(1, "Alice", 25)).toDS()

spark.stop()`,language:"python",highlights:[6,12,17,18,19,22,23,24,27],filename:"dataframe_basics.py",description:"DataFrame 基础操作"}),e.jsxs(a,{label:"RDD vs DataFrame vs Dataset",children:[e.jsx("strong",{children:"RDD"}),"：底层 API，灵活性高但无优化",e.jsx("br",{}),e.jsx("strong",{children:"DataFrame"}),"：带 schema，Catalyst 优化器自动优化",e.jsx("br",{}),e.jsx("strong",{children:"Dataset"}),"：类型安全（JVM 语言），结合两者优势",e.jsx("br",{}),"推荐使用 DataFrame/Dataset，性能更好且更易用。"]}),e.jsx("h2",{id:"spark-sql",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、Spark SQL"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spark SQL 允许使用 SQL 查询结构化数据，支持 Hive、Parquet、JSON 等多种数据源，并通过 Catalyst 优化器进行查询优化。"}),e.jsx(r,{code:`from pyspark.sql import SparkSession
from pyspark.sql.functions import window, count

spark = SparkSession.builder.appName("Spark SQL").getOrCreate()

# 1. 注册临时视图
df = spark.read.parquet("hdfs:///input/events.parquet")
df.createOrReplaceTempView("events")

# 2. 基本 SQL 查询
result = spark.sql("""
    SELECT user_id, COUNT(*) as event_count
    FROM events
    WHERE event_time >= '2024-01-01'
    GROUP BY user_id
    ORDER BY event_count DESC
    LIMIT 10
""")

# 3. 窗口函数
window_result = spark.sql("""
    SELECT 
        user_id,
        event_time,
        COUNT(*) OVER (
            PARTITION BY user_id 
            ORDER BY event_time 
            ROWS BETWEEN 7 PRECEDING AND CURRENT ROW
        ) as rolling_count
    FROM events
""")

# 4. UDF（用户自定义函数）
from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

@udf(returnType=StringType())
def categorize_age(age):
    if age < 18:
        return "minor"
    elif age < 60:
        return "adult"
    else:
        return "senior"

df_with_category = df.withColumn("category", categorize_age(df.age))

# 5. 写入结果
result.write.parquet("hdfs:///output/result.parquet", mode="overwrite")

spark.stop()`,language:"python",highlights:[8,11,21,33,42],filename:"spark_sql.py",description:"Spark SQL 高级用法"}),e.jsxs(t,{type:"tip",title:"Catalyst 优化器",children:["Spark SQL 使用 Catalyst 优化器进行查询优化，包括：",e.jsx("br",{}),"① ",e.jsx("strong",{children:"分析"}),"：解析 SQL，检查表和列是否存在",e.jsx("br",{}),"② ",e.jsx("strong",{children:"逻辑优化"}),"：谓词下推、常量折叠、投影剪枝",e.jsx("br",{}),"③ ",e.jsx("strong",{children:"物理规划"}),"：生成多个执行计划，选择最优方案",e.jsx("br",{}),"④ ",e.jsx("strong",{children:"代码生成"}),"：生成 Java 字节码执行"]}),e.jsx("h2",{id:"shuffle",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、Shuffle 机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Shuffle 是 Spark 中数据重新分布的过程，发生在宽依赖操作中（如 groupBy、join、reduceByKey）。它是性能瓶颈的主要来源。"}),e.jsx(i,{title:"Shuffle 过程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
Map Stage:
Task 1: [data] → partition & sort → spill to disk
Task 2: [data] → partition & sort → spill to disk

Shuffle Read:
Fetch partitions from all mappers

Reduce Stage:
Task 1: merge sorted data → process
Task 2: merge sorted data → process
            `})}),e.jsx(r,{code:`# Shuffle 相关配置优化
from pyspark import SparkConf

conf = SparkConf()

# 1. Shuffle 分区数（默认 200）
conf.set("spark.sql.shuffle.partitions", "400")

# 2. Shuffle 文件压缩
conf.set("spark.shuffle.compress", "true")
conf.set("spark.shuffle.spill.compress", "true")

# 3. Shuffle 内存比例
conf.set("spark.shuffle.memoryFraction", "0.2")

# 4. Shuffle 服务（外部 shuffle service）
conf.set("spark.shuffle.service.enabled", "true")

# 5. Sort-based Shuffle（默认）
conf.set("spark.shuffle.manager", "sort")

# 避免 Shuffle 的技巧：
# - 使用 broadcast join 替代普通 join
# - 预先分区数据
# - 使用 map-side combine（如 reduceByKey 而非 groupByKey）`,language:"python",highlights:[7,10,11,14,17,20],filename:"shuffle_optimization.py",description:"Shuffle 优化配置"}),e.jsx(a,{label:"Shuffle 优化原则",children:"尽量减少 Shuffle 操作：① 使用 reduceByKey 代替 groupByKey；② 小表使用 broadcast join；③ 合理设置分区数；④ 启用 shuffle 压缩；⑤ 监控 shuffle read/write 大小。"}),e.jsx("h2",{id:"caching",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、缓存与持久化"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spark 支持将 RDD/DataFrame 缓存到内存或磁盘，避免重复计算。这对于迭代算法和交互式查询非常有用。"}),e.jsx(r,{code:`from pyspark import StorageLevel

# 1. RDD 缓存
rdd = sc.parallelize(range(1000000))

# 不同存储级别
rdd.persist(StorageLevel.MEMORY_ONLY)           # 仅内存
rdd.persist(StorageLevel.MEMORY_AND_DISK)       # 内存+磁盘
rdd.persist(StorageLevel.DISK_ONLY)             # 仅磁盘
rdd.persist(StorageLevel.MEMORY_ONLY_SER)       # 序列化内存
rdd.persist(StorageLevel.OFF_HEAP)              # 堆外内存

# 2. DataFrame 缓存
df = spark.read.parquet("hdfs:///input/large_data.parquet")
df.cache()  # 等价于 df.persist(StorageLevel.MEMORY_AND_DISK)

# 3. 使用缓存
df.createOrReplaceTempView("cached_table")

# 第一次查询 - 加载数据并缓存
spark.sql("SELECT COUNT(*) FROM cached_table").show()

# 第二次查询 - 从缓存读取（更快）
spark.sql("SELECT AVG(value) FROM cached_table").show()

# 4. 释放缓存
df.unpersist()

# 5. 查看缓存状态
print(spark.sparkContext.getExecutorStorageStatus())`,language:"python",highlights:[7,8,9,10,11,15,21,24,27],filename:"caching.py",description:"缓存与持久化策略"}),e.jsx(t,{type:"warning",title:"缓存注意事项",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsx("li",{children:"只缓存频繁使用的数据集，避免浪费内存"}),e.jsx("li",{children:"大数据集使用 MEMORY_AND_DISK 级别"}),e.jsx("li",{children:"不再需要时及时 unpersist 释放资源"}),e.jsx("li",{children:"监控 Storage UI 了解缓存使用情况"}),e.jsx("li",{children:"序列化缓存（MEMORY_ONLY_SER）可节省空间但增加 CPU 开销"})]})}),e.jsx("h2",{id:"optimization",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、性能优化"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spark 性能优化涉及资源配置、数据倾斜处理、Shuffle 优化、缓存策略等多个方面。"}),e.jsx(t,{type:"tip",title:"性能优化要点",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"资源配置"}),"：合理设置 executor 数量、内存和 core 数"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"数据倾斜"}),"：使用 salting、broadcast join 解决"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"分区优化"}),"：调整分区数，避免过多或过少"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"广播变量"}),"：小表使用 broadcast 避免 shuffle"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"累加器"}),"：使用 accumulator 进行全局计数"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"序列化"}),"：使用 Kryo 序列化提升性能"]})]})}),e.jsx(r,{code:`# 性能优化配置示例
from pyspark import SparkConf

conf = SparkConf()

# 1. 资源配置
conf.set("spark.executor.instances", "10")
conf.set("spark.executor.cores", "4")
conf.set("spark.executor.memory", "8g")
conf.set("spark.driver.memory", "4g")

# 2. 并行度优化
conf.set("spark.default.parallelism", "200")
conf.set("spark.sql.shuffle.partitions", "400")

# 3. 序列化优化
conf.set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")

# 4. 动态资源分配
conf.set("spark.dynamicAllocation.enabled", "true")
conf.set("spark.dynamicAllocation.minExecutors", "2")
conf.set("spark.dynamicAllocation.maxExecutors", "20")

# 5. 数据倾斜处理 - Salting 技术
from pyspark.sql.functions import lit, concat, rand

# 给 key 添加随机前缀分散数据
df_skewed = df.withColumn("salted_key", 
    concat(col("key"), lit("_"), (rand() * 10).cast("int")))

# 分别聚合后再合并
result = df_skewed.groupBy("salted_key").agg(sum("value"))
    .withColumn("key", split(col("salted_key"), "_")[0])
    .groupBy("key").agg(sum("value"))

# 6. Broadcast Join
from pyspark.sql.functions import broadcast
small_df = spark.read.parquet("hdfs:///input/small_table.parquet")
result = large_df.join(broadcast(small_df), "key")`,language:"python",highlights:[7,8,9,13,14,17,20,21,22,27,35],filename:"performance_optimization.py",description:"Spark 性能优化实践"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：缓存所有数据",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为缓存可以提升所有操作的性能。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：缓存会占用大量内存，只应缓存频繁复用且计算成本高的数据集。一次性使用的数据不应缓存，否则会导致内存溢出或频繁的 cache evict。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：分区数越多越好",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为增加分区数可以提升并行度。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：过多的分区会增加调度开销和内存占用。一般建议每个分区 100-200MB 数据，总分区数在 2000-5000 之间。需要根据数据量和集群规模权衡。"]})]}),e.jsxs(t,{type:"warning",title:"误区 3：忽略数据本地性",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 Spark 会自动优化数据位置。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：虽然 Spark 会尽量利用数据本地性，但如果数据分布不均或网络带宽不足，仍会产生大量网络传输。应合理设计数据存储和分区策略。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、面试真题"}),e.jsx(p,{questions:[{question:"Spark 相比 Hadoop MapReduce 的优势是什么？",answer:"① 基于内存计算，速度快 10-100 倍；② DAG 执行引擎，减少中间结果写入磁盘；③ 统一技术栈（批处理、流处理、SQL、ML、Graph）；④ 丰富的 API（Scala、Java、Python、R）；⑤ 更好的容错机制。MapReduce 适合离线批处理，Spark 适合迭代计算和实时分析。"},{question:"解释 Spark 的宽依赖和窄依赖",answer:"窄依赖：父 RDD 的一个分区最多被子 RDD 的一个分区使用（如 map、filter），可以 pipeline 执行。宽依赖：父 RDD 的一个分区被子 RDD 的多个分区使用（如 groupBy、join），需要 shuffle。窄依赖有利于故障恢复和流水线优化。"},{question:"如何处理 Spark 中的数据倾斜？",answer:"① Salting 技术：给 key 添加随机前缀分散数据；② Broadcast join：小表广播避免 shuffle；③ 提高并行度；④ 自定义分区器；⑤ 过滤异常 key；⑥ 使用两阶段聚合。关键是均匀分布数据到各个 partition。"},{question:"Spark 的缓存级别有哪些？如何选择？",answer:"MEMORY_ONLY（最快，可能溢出）、MEMORY_AND_DISK（平衡）、DISK_ONLY（最慢，不占内存）、MEMORY_ONLY_SER（节省空间）、OFF_HEAP（堆外内存）。根据数据大小、访问频率和内存资源选择，一般推荐 MEMORY_AND_DISK。"},{question:"Spark SQL 的 Catalyst 优化器做了什么？",answer:"① 分析：解析 SQL，验证表和列；② 逻辑优化：谓词下推、常量折叠、投影剪枝、join 重排序；③ 物理规划：生成多个执行计划，基于成本选择最优；④ 代码生成：生成 Java 字节码执行。这些优化显著提升查询性能。"},{question:"Spark Streaming 和 Flink 的区别？",answer:"Spark Streaming 是微批处理（延迟秒级），Flink 是原生流处理（延迟毫秒级）。Flink 支持精确一次语义和事件时间处理更好。Spark 适合批流统一场景，Flink 适合低延迟实时应用。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/infra/bigdata/13-bigdata-ecosystem/flink-streaming",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"对比技术 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"Flink 实时计算"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"原生流处理引擎"})]}),e.jsxs("a",{href:"/docs/infra/bigdata/13-bigdata-ecosystem/hadoop-ecosystem",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-accent mb-1",children:"基础架构 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-accent",children:"Hadoop 生态系统"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"HDFS、YARN、MapReduce"})]}),e.jsxs("a",{href:"/docs/infra/bigdata/13-bigdata-ecosystem/hive-data-warehouse",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"数据仓库 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"Hive 数据仓库"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"SQL on Hadoop"})]}),e.jsxs("a",{href:"/docs/infra/messaging/kafka/kafka-architecture",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"数据源 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"Kafka 消息队列"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"实时数据摄入"})]})]}),e.jsx(t,{type:"info",title:"学习建议",children:"Spark 学习建议按以下顺序：① 掌握 RDD 基础操作和原理；② 学习 DataFrame/Dataset API；③ 深入 Spark SQL 和优化器；④ 理解 Shuffle 机制和调优；⑤ 掌握缓存和性能优化技巧。建议结合实际项目练习，从 WordCount 开始逐步深入到复杂的数据处理场景。"}),e.jsx(n,{...l(s.category,s.id)})]})}),e.jsx(o,{items:c})]})}export{k as default};
