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
  { id: 'architecture', text: '一、Hadoop 架构概览', level: 2 },
  { id: 'hdfs', text: '二、HDFS 分布式文件系统', level: 2 },
  { id: 'mapreduce', text: '三、MapReduce 计算模型', level: 2 },
  { id: 'yarn', text: '四、YARN 资源管理', level: 2 },
  { id: 'ecosystem', text: '五、Hadoop 生态系统', level: 2 },
  { id: 'high-availability', text: '六、高可用机制', level: 2 },
  { id: 'optimization', text: '七、性能优化', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function HadoopEcosystem({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Apache Hadoop 是一个<strong className="text-accent">开源的分布式计算和存储框架</strong>，核心组件包括 HDFS（分布式文件系统）、MapReduce（批处理引擎）和 YARN（资源管理器），能够可靠地存储和处理 PB 级数据，是大数据生态系统的基石。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么学习 Hadoop？">
            虽然 Spark、Flink 等新一代计算引擎在性能和易用性上超越了 MapReduce，但 Hadoop 的 HDFS 和 YARN 仍然是大数据基础设施的核心。理解 Hadoop 有助于掌握分布式系统的基本原理，并为学习其他大数据技术打下基础。
          </Callout>

          <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Hadoop 架构概览
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Hadoop 采用主从架构，由 NameNode（元数据管理）、DataNode（数据存储）、ResourceManager（资源调度）和 NodeManager（节点管理）组成。
          </p>

          <DiagramBlock title="Hadoop 2.x 架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────┐
│           Hadoop Cluster                    │
│                                             │
│  ┌──────────┐         ┌──────────┐         │
│  │NameNode  │         │ResourceManager│    │
│  │(Master)  │         │  (Master)  │       │
│  └──────────┘         └──────────┘         │
│       │                      │              │
│  ┌────┴────┐          ┌─────┴─────┐        │
│  ▼         ▼          ▼           ▼        │
│DataNode  DataNode  NodeManager NodeManager │
│(Slave)   (Slave)   (Slave)     (Slave)     │
└─────────────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="Hadoop 版本演进">
            <strong>Hadoop 1.x</strong>：MapReduce 同时负责计算和资源管理<br/>
            <strong>Hadoop 2.x</strong>：引入 YARN，分离资源管理和计算<br/>
            <strong>Hadoop 3.x</strong>：支持纠删码、多 NameNode、容器化部署
          </SideNote>

          <h2 id="hdfs" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、HDFS 分布式文件系统
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HDFS（Hadoop Distributed File System）是 Hadoop 的存储层，设计用于存储超大文件，提供高吞吐量的数据访问。
          </p>

          <Playground
            code={`# HDFS Shell 常用命令

# 1. 文件操作
hdfs dfs -ls /                          # 列出目录
hdfs dfs -mkdir -p /user/data/input     # 创建目录
hdfs dfs -put local.txt /user/data/     # 上传文件
hdfs dfs -get /user/data/output ./      # 下载文件
hdfs dfs -cat /user/data/file.txt       # 查看文件
hdfs dfs -rm /user/data/old_file.txt    # 删除文件

# 2. 文件权限
hdfs dfs -chmod 755 /user/data/         # 修改权限
hdfs dfs -chown user:group /user/data/  # 修改所有者

# 3. 副本管理
hdfs dfs -setrep -w 3 /user/data/file   # 设置副本数

# 4. 空间查询
hdfs dfs -df -h /                       # 查看磁盘使用
hdfs dfs -du -h /user/data/             # 查看文件大小

# 5. 安全模式
hdfs dfsadmin -safemode enter           # 进入安全模式
hdfs dfsadmin -safemode leave           # 离开安全模式`}
            language="bash"
            highlights={[5, 6, 7, 8, 9, 10, 13, 14, 17, 20, 23]}
            filename="hdfs_commands.sh"
            description="HDFS 常用命令"
          />

          <DiagramBlock title="HDFS 读写流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
写文件：
Client → NameNode (请求写入)
NameNode → Client (返回 DataNode 列表)
Client → DataNode1 → DataNode2 → DataNode3 (流水线复制)

读文件：
Client → NameNode (请求读取)
NameNode → Client (返回 Block 位置)
Client → DataNode (直接读取数据)
            `}</pre>
          </DiagramBlock>

          <Callout type="info" title="HDFS 核心特性">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>大文件存储</strong>：适合 GB-TB 级文件，不适合小文件</li>
              <li><strong>一次写入多次读取</strong>：不支持随机写，追加写有限支持</li>
              <li><strong>高容错性</strong>：数据自动复制（默认 3 副本）</li>
              <li><strong>流式访问</strong>：高吞吐量，低延迟不是重点</li>
              <li><strong> commodity hardware</strong>：运行在廉价硬件上</li>
            </ul>
          </Callout>

          <h2 id="mapreduce" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、MapReduce 计算模型
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            MapReduce 是 Hadoop 的计算引擎，采用"分而治之"的思想，将计算分为 Map（映射）和 Reduce（归约）两个阶段。
          </p>

          <Playground
            code={`from mrjob.job import MRJob

class WordCount(MRJob):
    """WordCount MapReduce 示例"""
    
    def mapper(self, _, line):
        """Map 阶段：分割单词"""
        for word in line.split():
            yield word.lower(), 1
    
    def reducer(self, key, values):
        """Reduce 阶段：统计词频"""
        yield key, sum(values)

if __name__ == '__main__':
    WordCount.run()

# 运行方式：
# python wordcount.py input.txt > output.txt
# 或提交到 Hadoop 集群：
# python wordcount.py -r hadoop hdfs:///input/data.txt -o hdfs:///output/`}
            language="python"
            highlights={[6, 8, 11, 13]}
            filename="wordcount_mr.py"
            description="MapReduce WordCount 示例"
          />

          <DiagramBlock title="MapReduce 执行流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
Input Split → Map → Shuffle & Sort → Reduce → Output
     │         │         │              │         │
     ▼         ▼         ▼              ▼         ▼
  Split 1   Map Task  Partition     Reduce    Result 1
  Split 2   Map Task  Merge         Task      Result 2
  Split 3   Map Task                Reduce    Result 3
                                  Task
            `}</pre>
          </DiagramBlock>

          <SideNote label="Shuffle 过程">
            Shuffle 是 MapReduce 中最关键的阶段，包括：① Partition（分区）；② Sort（排序）；③ Merge（合并）；④ Copy（拉取）。它决定了数据如何从 Map 端传输到 Reduce 端，是性能优化的重点。
          </SideNote>

          <h2 id="yarn" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、YARN 资源管理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            YARN（Yet Another Resource Negotiator）是 Hadoop 2.x 引入的资源管理系统，负责集群资源的统一管理和调度。
          </p>

          <DiagramBlock title="YARN 架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌────────────────────────────────────────┐
│         ResourceManager (Master)       │
│  ┌──────────────┐  ┌────────────────┐ │
│  │Scheduler     │  │ApplicationsManager│ │
│  └──────────────┘  └────────────────┘ │
└────────────────────────────────────────┘
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
┌────────┐ ┌────────┐ ┌────────┐
│NodeMgr │ │NodeMgr │ │NodeMgr │
│(Slave) │ │(Slave) │ │(Slave) │
└────────┘ └────────┘ └────────┘
    │         │         │
    ▼         ▼         ▼
 Container Container Container
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# YARN 常用命令

# 1. 应用管理
yarn application -list                      # 列出所有应用
yarn application -kill <application_id>     # 杀死应用
yarn application -status <application_id>   # 查看状态

# 2. 容器管理
yarn container -list <application_id>       # 列出容器

# 3. 日志查看
yarn logs -applicationId <application_id>   # 查看应用日志

# 4. 队列管理
yarn queue -status <queue_name>             # 查看队列状态

# 5. 节点管理
yarn node -list                             # 列出节点
yarn node -status <node_id>                 # 查看节点状态

# 6. 资源查看
yarn top                                    # 实时监控`}
            language="bash"
            highlights={[4, 5, 6, 9, 12, 15, 18, 21]}
            filename="yarn_commands.sh"
            description="YARN 常用命令"
          />

          <Callout type="tip" title="YARN 调度器类型">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>FIFO Scheduler</strong>：先进先出，简单但不支持多租户</li>
              <li><strong>Capacity Scheduler</strong>：容量调度，支持多队列和资源共享（默认）</li>
              <li><strong>Fair Scheduler</strong>：公平调度，确保每个应用获得公平的资源份额</li>
            </ul>
          </Callout>

          <h2 id="ecosystem" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Hadoop 生态系统
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Hadoop 生态系统包含众多组件，覆盖数据采集、存储、计算、查询、机器学习等各个环节。
          </p>

          <DiagramBlock title="Hadoop 生态系统">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
数据采集：Flume, Sqoop, Kafka
数据存储：HDFS, HBase, Kudu
数据计算：MapReduce, Spark, Flink, Tez
数据查询：Hive, Impala, Presto
资源管理：YARN
协调服务：ZooKeeper
工作流：Oozie, Azkaban
监控：Ambari, Cloudera Manager
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# Hive SQL 示例（Hadoop 上的 SQL 引擎）

-- 1. 创建表
CREATE TABLE IF NOT EXISTS users (
    id INT,
    name STRING,
    age INT,
    city STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE;

-- 2. 加载数据
LOAD DATA LOCAL INPATH '/local/users.csv' 
INTO TABLE users;

-- 3. 查询数据
SELECT city, COUNT(*) as user_count, AVG(age) as avg_age
FROM users
WHERE age >= 18
GROUP BY city
ORDER BY user_count DESC
LIMIT 10;

-- 4. 分区表
CREATE TABLE events (
    event_id INT,
    event_name STRING
)
PARTITIONED BY (dt STRING, hour INT)
STORED AS PARQUET;

-- 5. 动态分区插入
INSERT INTO events PARTITION(dt, hour)
SELECT event_id, event_name, dt, hour
FROM raw_events;`}
            language="sql"
            highlights={[4, 15, 19, 27, 35]}
            filename="hive_sql.sql"
            description="Hive SQL 示例"
          />

          <SideNote label="组件选择建议">
            <strong>离线批处理</strong>：MapReduce（稳定）或 Spark（快速）<br/>
            <strong>实时计算</strong>：Flink 或 Spark Streaming<br/>
            <strong>交互式查询</strong>：Impala、Presto 或 Hive LLAP<br/>
            <strong>NoSQL</strong>：HBase（列式）或 Kudu（分析型）<br/>
            <strong>数据仓库</strong>：Hive 或 Spark SQL
          </SideNote>

          <h2 id="high-availability" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、高可用机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Hadoop 通过 NameNode HA、YARN RM HA、数据副本等机制实现高可用性，避免单点故障。
          </p>

          <DiagramBlock title="NameNode HA 架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌──────────────┐     ┌──────────────┐
│ Active NN    │◄───►│ Standby NN   │
│              │ QJM  │              │
└──────────────┘     └──────────────┘
       │                    │
       ▼                    ▼
┌──────────────┐     ┌──────────────┐
│ JournalNode  │     │ JournalNode  │
│  Cluster     │     │  Cluster     │
└──────────────┘     └──────────────┘
       │                    │
       ▼                    ▼
  DataNodes           DataNodes
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# HDFS HA 配置（hdfs-site.xml）

<!-- NameNode HA 配置 -->
<property>
    <name>dfs.nameservices</name>
    <value>mycluster</value>
</property>

<property>
    <name>dfs.ha.namenodes.mycluster</name>
    <value>nn1,nn2</value>
</property>

<property>
    <name>dfs.namenode.rpc-address.mycluster.nn1</name>
    <value>host1:8020</value>
</property>

<property>
    <name>dfs.namenode.rpc-address.mycluster.nn2</name>
    <value>host2:8020</value>
</property>

<!-- JournalNode 配置 -->
<property>
    <name>dfs.namenode.shared.edits.dir</name>
    <value>qjournal://jn1:8485;jn2:8485;jn3:8485/mycluster</value>
</property>

<!-- 故障转移配置 -->
<property>
    <name>dfs.client.failover.proxy.provider.mycluster</name>
    <value>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider</value>
</property>`}
            language="xml"
            highlights={[5, 10, 15, 20, 26, 32]}
            filename="hdfs-ha-config.xml"
            description="HDFS HA 配置示例"
          />

          <Callout type="warning" title="HA 注意事项">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>需要至少 3 个 JournalNode 保证容错</li>
              <li>配置 ZooKeeper 用于自动故障转移</li>
              <li>Standby NameNode 定期 checkpoint</li>
              <li>客户端需要配置 failover proxy provider</li>
              <li>测试故障转移确保配置正确</li>
            </ul>
          </Callout>

          <h2 id="optimization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、性能优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Hadoop 性能优化涉及 HDFS、MapReduce、YARN 等多个层面，需要根据具体场景进行调整。
          </p>

          <Callout type="tip" title="HDFS 优化要点">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>块大小</strong>：大文件使用较大 block size（默认 128MB）</li>
              <li><strong>副本数</strong>：根据可靠性需求调整（默认 3）</li>
              <li><strong>小文件问题</strong>：使用 HAR 或 SequenceFile 合并小文件</li>
              <li><strong>机架感知</strong>：配置网络拓扑优化数据放置</li>
              <li><strong>压缩</strong>：启用 Snappy 或 LZO 压缩节省空间</li>
            </ul>
          </Callout>

          <Playground
            code={`# MapReduce 优化配置（mapred-site.xml）

<!-- Map 任务内存 -->
<property>
    <name>mapreduce.map.memory.mb</name>
    <value>2048</value>
</property>

<!-- Reduce 任务内存 -->
<property>
    <name>mapreduce.reduce.memory.mb</name>
    <value>4096</value>
</property>

<!-- Combiner 优化（减少 shuffle 数据量） -->
<property>
    <name>mapreduce.job.use.combiner</name>
    <value>true</value>
</property>

<!--  speculative execution（推测执行） -->
<property>
    <name>mapreduce.map.speculative</name>
    <value>true</value>
</property>

<property>
    <name>mapreduce.reduce.speculative</name>
    <value>true</value>
</property>

<!-- 压缩配置 -->
<property>
    <name>mapreduce.output.fileoutputformat.compress</name>
    <value>true</value>
</property>

<property>
    <name>mapreduce.output.fileoutputformat.compress.codec</name>
    <value>org.apache.hadoop.io.compress.SnappyCodec</value>
</property>`}
            language="xml"
            highlights={[5, 11, 17, 23, 28, 34, 39]}
            filename="mapreduce-optimization.xml"
            description="MapReduce 优化配置"
          />

          <SideNote label="数据倾斜处理">
            MapReduce 中的数据倾斜会导致某些 reduce task 执行时间过长。解决方法：① 自定义 Partitioner 均匀分布数据；② 使用 Combiner 预聚合；③ 增加 reduce 任务数；④ 对 key 加盐分散。
          </SideNote>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区 1：Hadoop 适合所有场景">
            <p className="mb-2"><strong>错误认知</strong>：认为 Hadoop 可以处理所有类型的数据处理任务。</p>
            <p><strong>正确理解</strong>：Hadoop 适合离线批处理和大文件存储，不适合低延迟查询、实时流处理或小文件场景。应根据业务需求选择合适的技术栈，如实时场景用 Flink，交互式查询用 Presto。</p>
          </Callout>

          <Callout type="danger" title="误区 2：副本数越多越安全">
            <p className="mb-2"><strong>错误认知</strong>：认为增加副本数可以无限提高数据可靠性。</p>
            <p><strong>正确理解</strong>：3 副本已经能提供 99.999% 的可靠性，更多副本会显著增加存储成本。应该通过 RAID、备份等其他手段提高可靠性，而非盲目增加副本数。</p>
          </Callout>

          <Callout type="warning" title="误区 3：忽略小文件问题">
            <p className="mb-2"><strong>错误认知</strong>：认为 HDFS 可以高效存储大量小文件。</p>
            <p><strong>正确理解</strong>：每个文件在 NameNode 中占用约 150 字节元数据，大量小文件会导致 NameNode 内存耗尽。应使用 HAR、SequenceFile 或 HBase 存储小文件。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "HDFS 的读写流程是什么？",
              answer: "写流程：① Client 向 NameNode 请求写入；② NameNode 检查权限并返回 DataNode 列表；③ Client 建立 pipeline 依次写入数据；④ DataNode 逐副本复制；⑤ 完成后向 NameNode 确认。读流程：① Client 向 NameNode 请求文件位置；② NameNode 返回 Block 所在的 DataNode；③ Client 直接从 DataNode 读取数据（就近原则）。"
            },
            {
              question: "MapReduce 的 Shuffle 过程详解",
              answer: "Shuffle 包括：① Map 端：Partition（分区）→ Sort（排序）→ Spill（溢写）→ Merge（合并）；② Reduce 端：Copy（拉取）→ Merge（合并）→ Sort（排序）。Shuffle 是 MapReduce 的性能瓶颈，优化重点在于减少数据传输量和提高并行度。"
            },
            {
              question: "YARN 的工作流程是什么？",
              answer: "① Client 向 ResourceManager 提交应用；② RM 分配 Container 启动 ApplicationMaster；③ AM 向 RM 申请资源；④ RM 分配 Container；⑤ AM 在 Container 中启动任务；⑥ 任务执行完成后 AM 向 RM 报告；⑦ RM 释放资源。整个过程实现了资源管理和应用执行的解耦。"
            },
            {
              question: "Hadoop 如何处理数据倾斜？",
              answer: "① 自定义 Partitioner 均匀分布数据；② 使用 Combiner 预聚合减少数据量；③ 增加 reduce 任务数；④ 对 key 加盐（salting）分散热点；⑤ 采样分析数据分布；⑥ 使用 MapJoin 避免 shuffle。关键是要让数据均匀分布到各个 reduce task。"
            },
            {
              question: "NameNode HA 的实现原理",
              answer: "通过 Active-Standby 架构实现：① 两个 NameNode 共享 edits log（通过 JournalNode 集群）；② Active NN 处理客户端请求并写入 edits；③ Standby NN 同步 edits 并保持最新状态；④ ZooKeeper 监控 NN 健康状态；⑤ 故障时自动切换。QJM（Quorum Journal Manager）保证 edits 的一致性。"
            },
            {
              question: "Hadoop 相比传统数据库的优势和劣势",
              answer: "优势：① 可扩展性强（横向扩展）；② 成本低（ commodity hardware）；③ 容错性好；④ 适合批处理大数据。劣势：① 延迟高；② 不支持随机写；③ 小文件效率低；④ SQL 支持弱。Hadoop 适合离线分析，传统数据库适合在线事务处理。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/infra/bigdata/13-bigdata-ecosystem/flink-streaming" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">实时计算 →</div>
              <div className="font-semibold text-ink group-hover:text-teal">Flink 流处理</div>
              <div className="text-[12px] text-ink-muted mt-1">低延迟实时分析</div>
            </a>
            <a href="/docs/infra/bigdata/13-bigdata-ecosystem/spark-computing" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">迭代计算 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">Spark 分布式计算</div>
              <div className="text-[12px] text-ink-muted mt-1">内存计算引擎</div>
            </a>
            <a href="/docs/infra/bigdata/13-bigdata-ecosystem/hive-data-warehouse" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">SQL 引擎 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">Hive 数据仓库</div>
              <div className="text-[12px] text-ink-muted mt-1">SQL on Hadoop</div>
            </a>
            <a href="/docs/infra/messaging/kafka/kafka-architecture" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">数据摄入 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Kafka 消息队列</div>
              <div className="text-[12px] text-ink-muted mt-1">实时数据管道</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            Hadoop 学习建议按以下顺序：① 理解 HDFS 架构和操作；② 掌握 MapReduce 编程模型；③ 学习 YARN 资源管理；④ 了解生态系统组件（Hive、HBase 等）；⑤ 实践性能优化和高可用配置。虽然 MapReduce 逐渐被 Spark/Flink 取代，但 HDFS 和 YARN 仍是大数据基础设施的核心。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}