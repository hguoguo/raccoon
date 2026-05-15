import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as o}from"./KnowledgeLayout-CwkOMHwC.js";import{P as a}from"./Playground-C6lk-t6G.js";import{S as r}from"./SideNote-BKvanovA.js";import{C as t,A as n,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as s}from"./DiagramBlock-CLaKE9_7.js";import{I as p}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"architecture",text:"一、Hadoop 架构概览",level:2},{id:"hdfs",text:"二、HDFS 分布式文件系统",level:2},{id:"mapreduce",text:"三、MapReduce 计算模型",level:2},{id:"yarn",text:"四、YARN 资源管理",level:2},{id:"ecosystem",text:"五、Hadoop 生态系统",level:2},{id:"high-availability",text:"六、高可用机制",level:2},{id:"optimization",text:"七、性能优化",level:2},{id:"misconceptions",text:"八、常见误区",level:2},{id:"interview",text:"九、面试真题",level:2},{id:"related",text:"十、知识关联",level:2}];function f({meta:d}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(o,{meta:d,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Apache Hadoop 是一个",e.jsx("strong",{className:"text-accent",children:"开源的分布式计算和存储框架"}),"，核心组件包括 HDFS（分布式文件系统）、MapReduce（批处理引擎）和 YARN（资源管理器），能够可靠地存储和处理 PB 级数据，是大数据生态系统的基石。"]})}),e.jsx(t,{type:"tip",title:"为什么学习 Hadoop？",children:"虽然 Spark、Flink 等新一代计算引擎在性能和易用性上超越了 MapReduce，但 Hadoop 的 HDFS 和 YARN 仍然是大数据基础设施的核心。理解 Hadoop 有助于掌握分布式系统的基本原理，并为学习其他大数据技术打下基础。"}),e.jsx("h2",{id:"architecture",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、Hadoop 架构概览"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Hadoop 采用主从架构，由 NameNode（元数据管理）、DataNode（数据存储）、ResourceManager（资源调度）和 NodeManager（节点管理）组成。"}),e.jsx(s,{title:"Hadoop 2.x 架构",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
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
            `})}),e.jsxs(r,{label:"Hadoop 版本演进",children:[e.jsx("strong",{children:"Hadoop 1.x"}),"：MapReduce 同时负责计算和资源管理",e.jsx("br",{}),e.jsx("strong",{children:"Hadoop 2.x"}),"：引入 YARN，分离资源管理和计算",e.jsx("br",{}),e.jsx("strong",{children:"Hadoop 3.x"}),"：支持纠删码、多 NameNode、容器化部署"]}),e.jsx("h2",{id:"hdfs",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、HDFS 分布式文件系统"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HDFS（Hadoop Distributed File System）是 Hadoop 的存储层，设计用于存储超大文件，提供高吞吐量的数据访问。"}),e.jsx(a,{code:`# HDFS Shell 常用命令

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
hdfs dfsadmin -safemode leave           # 离开安全模式`,language:"bash",highlights:[5,6,7,8,9,10,13,14,17,20,23],filename:"hdfs_commands.sh",description:"HDFS 常用命令"}),e.jsx(s,{title:"HDFS 读写流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
写文件：
Client → NameNode (请求写入)
NameNode → Client (返回 DataNode 列表)
Client → DataNode1 → DataNode2 → DataNode3 (流水线复制)

读文件：
Client → NameNode (请求读取)
NameNode → Client (返回 Block 位置)
Client → DataNode (直接读取数据)
            `})}),e.jsx(t,{type:"info",title:"HDFS 核心特性",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"大文件存储"}),"：适合 GB-TB 级文件，不适合小文件"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"一次写入多次读取"}),"：不支持随机写，追加写有限支持"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"高容错性"}),"：数据自动复制（默认 3 副本）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"流式访问"}),"：高吞吐量，低延迟不是重点"]}),e.jsxs("li",{children:[e.jsx("strong",{children:" commodity hardware"}),"：运行在廉价硬件上"]})]})}),e.jsx("h2",{id:"mapreduce",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、MapReduce 计算模型"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:'MapReduce 是 Hadoop 的计算引擎，采用"分而治之"的思想，将计算分为 Map（映射）和 Reduce（归约）两个阶段。'}),e.jsx(a,{code:`from mrjob.job import MRJob

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
# python wordcount.py -r hadoop hdfs:///input/data.txt -o hdfs:///output/`,language:"python",highlights:[6,8,11,13],filename:"wordcount_mr.py",description:"MapReduce WordCount 示例"}),e.jsx(s,{title:"MapReduce 执行流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
Input Split → Map → Shuffle & Sort → Reduce → Output
     │         │         │              │         │
     ▼         ▼         ▼              ▼         ▼
  Split 1   Map Task  Partition     Reduce    Result 1
  Split 2   Map Task  Merge         Task      Result 2
  Split 3   Map Task                Reduce    Result 3
                                  Task
            `})}),e.jsx(r,{label:"Shuffle 过程",children:"Shuffle 是 MapReduce 中最关键的阶段，包括：① Partition（分区）；② Sort（排序）；③ Merge（合并）；④ Copy（拉取）。它决定了数据如何从 Map 端传输到 Reduce 端，是性能优化的重点。"}),e.jsx("h2",{id:"yarn",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、YARN 资源管理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"YARN（Yet Another Resource Negotiator）是 Hadoop 2.x 引入的资源管理系统，负责集群资源的统一管理和调度。"}),e.jsx(s,{title:"YARN 架构",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
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
            `})}),e.jsx(a,{code:`# YARN 常用命令

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
yarn top                                    # 实时监控`,language:"bash",highlights:[4,5,6,9,12,15,18,21],filename:"yarn_commands.sh",description:"YARN 常用命令"}),e.jsx(t,{type:"tip",title:"YARN 调度器类型",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"FIFO Scheduler"}),"：先进先出，简单但不支持多租户"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Capacity Scheduler"}),"：容量调度，支持多队列和资源共享（默认）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Fair Scheduler"}),"：公平调度，确保每个应用获得公平的资源份额"]})]})}),e.jsx("h2",{id:"ecosystem",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、Hadoop 生态系统"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Hadoop 生态系统包含众多组件，覆盖数据采集、存储、计算、查询、机器学习等各个环节。"}),e.jsx(s,{title:"Hadoop 生态系统",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
数据采集：Flume, Sqoop, Kafka
数据存储：HDFS, HBase, Kudu
数据计算：MapReduce, Spark, Flink, Tez
数据查询：Hive, Impala, Presto
资源管理：YARN
协调服务：ZooKeeper
工作流：Oozie, Azkaban
监控：Ambari, Cloudera Manager
            `})}),e.jsx(a,{code:`# Hive SQL 示例（Hadoop 上的 SQL 引擎）

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
FROM raw_events;`,language:"sql",highlights:[4,15,19,27,35],filename:"hive_sql.sql",description:"Hive SQL 示例"}),e.jsxs(r,{label:"组件选择建议",children:[e.jsx("strong",{children:"离线批处理"}),"：MapReduce（稳定）或 Spark（快速）",e.jsx("br",{}),e.jsx("strong",{children:"实时计算"}),"：Flink 或 Spark Streaming",e.jsx("br",{}),e.jsx("strong",{children:"交互式查询"}),"：Impala、Presto 或 Hive LLAP",e.jsx("br",{}),e.jsx("strong",{children:"NoSQL"}),"：HBase（列式）或 Kudu（分析型）",e.jsx("br",{}),e.jsx("strong",{children:"数据仓库"}),"：Hive 或 Spark SQL"]}),e.jsx("h2",{id:"high-availability",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、高可用机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Hadoop 通过 NameNode HA、YARN RM HA、数据副本等机制实现高可用性，避免单点故障。"}),e.jsx(s,{title:"NameNode HA 架构",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
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
            `})}),e.jsx(a,{code:`# HDFS HA 配置（hdfs-site.xml）

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
</property>`,language:"xml",highlights:[5,10,15,20,26,32],filename:"hdfs-ha-config.xml",description:"HDFS HA 配置示例"}),e.jsx(t,{type:"warning",title:"HA 注意事项",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsx("li",{children:"需要至少 3 个 JournalNode 保证容错"}),e.jsx("li",{children:"配置 ZooKeeper 用于自动故障转移"}),e.jsx("li",{children:"Standby NameNode 定期 checkpoint"}),e.jsx("li",{children:"客户端需要配置 failover proxy provider"}),e.jsx("li",{children:"测试故障转移确保配置正确"})]})}),e.jsx("h2",{id:"optimization",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、性能优化"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Hadoop 性能优化涉及 HDFS、MapReduce、YARN 等多个层面，需要根据具体场景进行调整。"}),e.jsx(t,{type:"tip",title:"HDFS 优化要点",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"块大小"}),"：大文件使用较大 block size（默认 128MB）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"副本数"}),"：根据可靠性需求调整（默认 3）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"小文件问题"}),"：使用 HAR 或 SequenceFile 合并小文件"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"机架感知"}),"：配置网络拓扑优化数据放置"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"压缩"}),"：启用 Snappy 或 LZO 压缩节省空间"]})]})}),e.jsx(a,{code:`# MapReduce 优化配置（mapred-site.xml）

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
</property>`,language:"xml",highlights:[5,11,17,23,28,34,39],filename:"mapreduce-optimization.xml",description:"MapReduce 优化配置"}),e.jsx(r,{label:"数据倾斜处理",children:"MapReduce 中的数据倾斜会导致某些 reduce task 执行时间过长。解决方法：① 自定义 Partitioner 均匀分布数据；② 使用 Combiner 预聚合；③ 增加 reduce 任务数；④ 对 key 加盐分散。"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：Hadoop 适合所有场景",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 Hadoop 可以处理所有类型的数据处理任务。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：Hadoop 适合离线批处理和大文件存储，不适合低延迟查询、实时流处理或小文件场景。应根据业务需求选择合适的技术栈，如实时场景用 Flink，交互式查询用 Presto。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：副本数越多越安全",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为增加副本数可以无限提高数据可靠性。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：3 副本已经能提供 99.999% 的可靠性，更多副本会显著增加存储成本。应该通过 RAID、备份等其他手段提高可靠性，而非盲目增加副本数。"]})]}),e.jsxs(t,{type:"warning",title:"误区 3：忽略小文件问题",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 HDFS 可以高效存储大量小文件。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：每个文件在 NameNode 中占用约 150 字节元数据，大量小文件会导致 NameNode 内存耗尽。应使用 HAR、SequenceFile 或 HBase 存储小文件。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、面试真题"}),e.jsx(p,{questions:[{question:"HDFS 的读写流程是什么？",answer:"写流程：① Client 向 NameNode 请求写入；② NameNode 检查权限并返回 DataNode 列表；③ Client 建立 pipeline 依次写入数据；④ DataNode 逐副本复制；⑤ 完成后向 NameNode 确认。读流程：① Client 向 NameNode 请求文件位置；② NameNode 返回 Block 所在的 DataNode；③ Client 直接从 DataNode 读取数据（就近原则）。"},{question:"MapReduce 的 Shuffle 过程详解",answer:"Shuffle 包括：① Map 端：Partition（分区）→ Sort（排序）→ Spill（溢写）→ Merge（合并）；② Reduce 端：Copy（拉取）→ Merge（合并）→ Sort（排序）。Shuffle 是 MapReduce 的性能瓶颈，优化重点在于减少数据传输量和提高并行度。"},{question:"YARN 的工作流程是什么？",answer:"① Client 向 ResourceManager 提交应用；② RM 分配 Container 启动 ApplicationMaster；③ AM 向 RM 申请资源；④ RM 分配 Container；⑤ AM 在 Container 中启动任务；⑥ 任务执行完成后 AM 向 RM 报告；⑦ RM 释放资源。整个过程实现了资源管理和应用执行的解耦。"},{question:"Hadoop 如何处理数据倾斜？",answer:"① 自定义 Partitioner 均匀分布数据；② 使用 Combiner 预聚合减少数据量；③ 增加 reduce 任务数；④ 对 key 加盐（salting）分散热点；⑤ 采样分析数据分布；⑥ 使用 MapJoin 避免 shuffle。关键是要让数据均匀分布到各个 reduce task。"},{question:"NameNode HA 的实现原理",answer:"通过 Active-Standby 架构实现：① 两个 NameNode 共享 edits log（通过 JournalNode 集群）；② Active NN 处理客户端请求并写入 edits；③ Standby NN 同步 edits 并保持最新状态；④ ZooKeeper 监控 NN 健康状态；⑤ 故障时自动切换。QJM（Quorum Journal Manager）保证 edits 的一致性。"},{question:"Hadoop 相比传统数据库的优势和劣势",answer:"优势：① 可扩展性强（横向扩展）；② 成本低（ commodity hardware）；③ 容错性好；④ 适合批处理大数据。劣势：① 延迟高；② 不支持随机写；③ 小文件效率低；④ SQL 支持弱。Hadoop 适合离线分析，传统数据库适合在线事务处理。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/infra/bigdata/13-bigdata-ecosystem/flink-streaming",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"实时计算 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"Flink 流处理"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"低延迟实时分析"})]}),e.jsxs("a",{href:"/docs/infra/bigdata/13-bigdata-ecosystem/spark-computing",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-accent mb-1",children:"迭代计算 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-accent",children:"Spark 分布式计算"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"内存计算引擎"})]}),e.jsxs("a",{href:"/docs/infra/bigdata/13-bigdata-ecosystem/hive-data-warehouse",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"SQL 引擎 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"Hive 数据仓库"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"SQL on Hadoop"})]}),e.jsxs("a",{href:"/docs/infra/messaging/kafka/kafka-architecture",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"数据摄入 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"Kafka 消息队列"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"实时数据管道"})]})]}),e.jsx(t,{type:"info",title:"学习建议",children:"Hadoop 学习建议按以下顺序：① 理解 HDFS 架构和操作；② 掌握 MapReduce 编程模型；③ 学习 YARN 资源管理；④ 了解生态系统组件（Hive、HBase 等）；⑤ 实践性能优化和高可用配置。虽然 MapReduce 逐渐被 Spark/Flink 取代，但 HDFS 和 YARN 仍是大数据基础设施的核心。"}),e.jsx(n,{...i(d.category,d.id)})]})}),e.jsx(l,{items:m})]})}export{f as default};
