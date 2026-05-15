import{j as e,g as a}from"./index-hyqxTCwJ.js";import{K as i}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as l}from"./SideNote-BKvanovA.js";import{C as r,A as o,S as n}from"./ArticleNav-DhfiS38Y.js";import{D as t}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const x=[{id:"definition",text:"一句话定义",level:2},{id:"core-concepts",text:"一、核心概念",level:2},{id:"architecture",text:"1.1 HDFS架构",level:3},{id:"namenode-datanode",text:"1.2 NameNode与DataNode",level:3},{id:"block-replication",text:"二、块存储与副本机制",level:2},{id:"block-storage",text:"2.1 块存储",level:3},{id:"replication",text:"2.2 副本机制",level:3},{id:"read-write",text:"三、读写流程",level:2},{id:"read-flow",text:"3.1 读取流程",level:3},{id:"write-flow",text:"3.2 写入流程",level:3},{id:"ha",text:"四、高可用机制",level:2},{id:"ha-architecture",text:"4.1 HA架构",level:3},{id:"federation",text:"4.2 联邦机制",level:3},{id:"commands",text:"五、常用命令",level:2},{id:"basic-commands",text:"5.1 基础命令",level:3},{id:"admin-commands",text:"5.2 管理命令",level:3},{id:"optimization",text:"六、性能优化",level:2},{id:"small-files",text:"6.1 小文件问题",level:3},{id:"tuning",text:"6.2 参数调优",level:3},{id:"misconceptions",text:"七、常见误区",level:2},{id:"interview",text:"八、面试真题",level:2},{id:"comparison",text:"九、HDFS vs 其他文件系统",level:2},{id:"related",text:"十、知识关联",level:2}];function j({meta:d}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(i,{meta:d,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["HDFS（Hadoop Distributed File System）是一个",e.jsx("strong",{className:"text-accent",children:"分布式文件系统"}),"， 设计用于在 commodity hardware（普通硬件）上存储超大文件，提供高吞吐量的数据访问，适合批处理场景。"]})}),e.jsx(r,{type:"tip",title:"为什么需要 HDFS？",children:"传统文件系统无法处理 PB 级数据，且单点故障风险高。HDFS 通过分布式存储、多副本机制、自动故障恢复，实现了海量数据的高可靠存储，是 Hadoop 生态的基石。"}),e.jsx("h2",{id:"core-concepts",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、核心概念"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HDFS 采用 Master-Slave 架构，将大文件切分为块（Block），分散存储在多个 DataNode 上，由 NameNode 统一管理元数据。"}),e.jsx("h3",{id:"architecture",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.1 HDFS架构"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HDFS 集群由一个 NameNode（主节点）和多个 DataNode（从节点）组成。NameNode 管理文件系统命名空间和元数据，DataNode 存储实际数据块。"}),e.jsx(t,{title:"HDFS 架构图",children:`graph TB
    Client[Client] --> NN[NameNode<br/>元数据管理]
    
    NN --> DN1[DataNode 1<br/>Block A, Block B]
    NN --> DN2[DataNode 2<br/>Block C, Block D]
    NN --> DN3[DataNode 3<br/>Block E, Block F]
    
    DN1 -.->|心跳| NN
    DN2 -.->|心跳| NN
    DN3 -.->|心跳| NN
    
    style Client fill:#e1f5ff
    style NN fill:#fff4e6
    style DN1 fill:#e8f5e9
    style DN2 fill:#e8f5e9
    style DN3 fill:#e8f5e9`}),e.jsx(l,{label:"架构特点",children:e.jsxs("ul",{className:"space-y-2 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Master-Slave："}),"单一 NameNode 管理多个 DataNode"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"元数据与数据分离："}),"NameNode 存元数据，DataNode 存数据块"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"心跳机制："}),"DataNode 定期向 NameNode 发送心跳，报告健康状态"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"一次写入多次读取："}),"HDFS 优化了读操作，不支持随机写"]})]})}),e.jsx("h3",{id:"namenode-datanode",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.2 NameNode与DataNode"}),e.jsxs("table",{className:"w-full border-collapse my-4 text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left",children:"组件"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left",children:"职责"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left",children:"存储内容"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"NameNode"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"管理命名空间、权限控制、块映射、副本策略"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"FsImage（元数据快照）+ EditsLog（操作日志）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"DataNode"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"存储数据块、执行读写请求、定期汇报块信息"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"实际数据块（Block）+ 校验和（Checksum）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"Secondary NameNode"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"定期合并 FsImage 和 EditsLog，减轻 NameNode 负担"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Checkpoint 镜像（不是 NameNode 的热备）"})]})]})]}),e.jsx(r,{type:"warning",title:"Secondary NameNode 不是热备",children:"Secondary NameNode 只负责定期合并 FsImage 和 EditsLog，防止日志过大。**它不是 NameNode 的热备节点**，NameNode 宕机后无法自动切换。生产环境应配置 HA（High Availability）架构。"}),e.jsx("h2",{id:"block-replication",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、块存储与副本机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HDFS 将大文件切分为固定大小的块（Block），每个块有多个副本，分散存储在不同节点上，确保数据可靠性。"}),e.jsx("h3",{id:"block-storage",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.1 块存储"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HDFS 默认块大小为 128MB（Hadoop 2.x+），远大于传统文件系统的 4KB。大块减少了寻址时间，提高了吞吐量。"}),e.jsx(t,{title:"文件分块存储",children:`graph LR
    File[File: 500MB] --> B1[Block 0: 128MB]
    File --> B2[Block 1: 128MB]
    File --> B3[Block 2: 128MB]
    File --> B4[Block 3: 116MB]
    
    B1 --> DN1[DN1]
    B2 --> DN2[DN2]
    B3 --> DN3[DN3]
    B4 --> DN1
    
    style File fill:#e1f5ff
    style B1 fill:#fff4e6
    style B2 fill:#fff4e6
    style B3 fill:#fff4e6
    style B4 fill:#fff4e6`}),e.jsx(l,{label:"块大小选择",children:e.jsxs("ul",{className:"space-y-2 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Hadoop 1.x："}),"默认 64MB"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Hadoop 2.x+："}),"默认 128MB"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"配置参数："}),e.jsx("code",{className:"font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded",children:"dfs.blocksize"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"原则："}),"块大小应使单个文件的块数量在几千以内"]})]})}),e.jsx("h3",{id:"replication",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.2 副本机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HDFS 默认每个块有 3 个副本，采用机架感知策略放置副本，平衡可靠性和存储成本。"}),e.jsx(t,{title:"副本放置策略（机架感知）",children:`graph TB
    subgraph Rack1 [机架 1]
      DN1[DN1: Replica 1<br/>本地节点]
      DN2[DN2: Replica 2<br/>同机架不同节点]
    end
    
    subgraph Rack2 [机架 2]
      DN3[DN3: Replica 3<br/>不同机架]
    end
    
    Client --> DN1
    
    style DN1 fill:#e1f5ff
    style DN2 fill:#fff4e6
    style DN3 fill:#fff4e6`}),e.jsxs(r,{type:"info",title:"副本放置策略",children:[e.jsx("strong",{children:"第 1 个副本："}),"如果客户端在集群内，放在客户端所在节点；否则随机选择。",e.jsx("br",{}),e.jsx("strong",{children:"第 2 个副本："}),"放在与第 1 个副本不同机架的节点上。",e.jsx("br",{}),e.jsx("strong",{children:"第 3 个副本："}),"放在与第 2 个副本相同机架的不同节点上。",e.jsx("br",{}),e.jsx("strong",{children:"更多副本："}),"随机选择，确保每个机架不超过一定数量。",e.jsx("br",{}),"这种策略既保证了容错性（跨机架），又减少了网络传输（同机架）。"]}),e.jsx("h2",{id:"read-write",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、读写流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"理解 HDFS 的读写流程对于性能优化和故障排查至关重要。"}),e.jsx("h3",{id:"read-flow",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 读取流程"}),e.jsx(t,{title:"HDFS 读取流程",children:`sequenceDiagram
    participant C as Client
    participant NN as NameNode
    participant DN1 as DataNode 1
    participant DN2 as DataNode 2
    
    C->>NN: 1. 请求文件块位置
    NN-->>C: 2. 返回块列表（按距离排序）
    
    C->>DN1: 3. 读取 Block 0（最近节点）
    DN1-->>C: 4. 返回数据
    
    C->>DN2: 5. 读取 Block 1
    DN2-->>C: 6. 返回数据
    
    Note over C,DN2: 并行读取多个块`}),e.jsx(s,{code:`// Java API 读取 HDFS 文件
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;

import java.io.InputStream;
import java.net.URI;

public class HdfsReadExample {
    public static void main(String[] args) throws Exception {
        // 1. 获取 FileSystem 实例
        Configuration conf = new Configuration();
        FileSystem fs = FileSystem.get(new URI("hdfs://namenode:8020"), conf);
        
        // 2. 打开文件输入流
        Path filePath = new Path("/user/data/input.txt");
        InputStream in = fs.open(filePath);
        
        // 3. 读取数据
        IOUtils.copyBytes(in, System.out, 4096, false);
        
        // 4. 关闭资源
        IOUtils.closeStream(in);
        fs.close();
    }
}`,language:"java",description:"Java API 读取 HDFS 文件"}),e.jsx("h3",{id:"write-flow",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 写入流程"}),e.jsx(t,{title:"HDFS 写入流程",children:`sequenceDiagram
    participant C as Client
    participant NN as NameNode
    participant DN1 as DataNode 1
    participant DN2 as DataNode 2
    participant DN3 as DataNode 3
    
    C->>NN: 1. 请求创建文件
    NN-->>C: 2. 返回可写入的 DataNode 列表
    
    C->>DN1: 3. 建立 Pipeline: DN1 → DN2 → DN3
    DN1-->>C: 4. 确认 Pipeline 建立
    
    C->>DN1: 5. 发送 Packet（数据包）
    DN1->>DN2: 6. 转发 Packet
    DN2->>DN3: 7. 转发 Packet
    
    DN3-->>DN2: 8. ACK 确认
    DN2-->>DN1: 9. ACK 确认
    DN1-->>C: 10. ACK 确认
    
    Note over C,DN3: 流水线方式写入，并行复制`}),e.jsx(s,{code:`// Java API 写入 HDFS 文件
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;

import java.io.OutputStream;
import java.net.URI;

public class HdfsWriteExample {
    public static void main(String[] args) throws Exception {
        // 1. 获取 FileSystem 实例
        Configuration conf = new Configuration();
        FileSystem fs = FileSystem.get(new URI("hdfs://namenode:8020"), conf);
        
        // 2. 创建文件输出流
        Path filePath = new Path("/user/data/output.txt");
        OutputStream out = fs.create(filePath);
        
        // 3. 写入数据
        String data = "Hello HDFS!";
        out.write(data.getBytes("UTF-8"));
        
        // 4. 关闭资源
        IOUtils.closeStream(out);
        fs.close();
    }
}`,language:"java",description:"Java API 写入 HDFS 文件"}),e.jsx(l,{label:"写入流程要点",children:e.jsxs("ul",{className:"space-y-2 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Pipeline："}),"数据以流水线方式在 DataNode 间传递，减少网络传输"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Packet："}),"数据被拆分为 64KB 的 Packet，逐个发送"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ACK："}),"每个 DataNode 写入成功后返回 ACK，确保数据完整性"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"租约机制："}),"客户端获得文件租约，保证同一时刻只有一个客户端写入"]})]})}),e.jsx("h2",{id:"ha",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、高可用机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Hadoop 2.x 引入了 HA（High Availability）机制，解决 NameNode 单点故障问题。"}),e.jsx("h3",{id:"ha-architecture",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 HA架构"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HA 架构部署两个 NameNode：Active（活跃）和 Standby（ standby）。Active 处理客户端请求，Standby 实时同步元数据，当 Active 故障时自动切换。"}),e.jsx(t,{title:"HDFS HA 架构",children:`graph TB
    Client[Client] --> ZKFC[ZooKeeper FailoverController]
    
    ZKFC --> AN[Active NameNode]
    ZKFC --> SN[Standby NameNode]
    
    AN --> DN1[DataNode 1]
    AN --> DN2[DataNode 2]
    AN --> DN3[DataNode 3]
    
    AN -.->|EditsLog| QJM[Quorum Journal Manager]
    SN -.->|EditsLog| QJM
    
    ZK -.-> ZKFC
    
    style Client fill:#e1f5ff
    style AN fill:#c8e6c9
    style SN fill:#fff9c4
    style ZKFC fill:#ffe0b2`}),e.jsx(r,{type:"tip",title:"HA 关键组件",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"ZooKeeper："}),"选举 Active NameNode，实现故障检测"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ZKFC（ZKFailoverController）："}),"监控 NameNode 健康状态，触发故障转移"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"QJM（Quorum Journal Manager）："}),"共享存储，Active 写入 EditsLog，Standby 读取同步"]})]})}),e.jsx("h3",{id:"federation",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.2 联邦机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Federation（联邦）允许多个 NameNode 独立管理不同的命名空间，共享底层 DataNode 存储，解决单个 NameNode 内存瓶颈问题。"}),e.jsx(t,{title:"HDFS Federation",children:`graph TB
    NN1[NameNode 1<br/>Namespace: /ns1] --> DN[DataNodes<br/>共享存储池]
    NN2[NameNode 2<br/>Namespace: /ns2] --> DN
    NN3[NameNode 3<br/>Namespace: /ns3] --> DN
    
    style NN1 fill:#e1f5ff
    style NN2 fill:#e1f5ff
    style NN3 fill:#e1f5ff
    style DN fill:#e8f5e9`}),e.jsx("h2",{id:"commands",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、常用命令"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HDFS 提供了类似 Linux 的命令工具，用于文件管理和集群维护。"}),e.jsx("h3",{id:"basic-commands",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.1 基础命令"}),e.jsx(s,{code:`# 查看目录
hdfs dfs -ls /
hdfs dfs -ls -R /user  # 递归查看

# 创建目录
hdfs dfs -mkdir -p /user/data/input

# 上传文件
hdfs dfs -put localfile.txt /user/data/
hdfs dfs -copyFromLocal localfile.txt /user/data/

# 下载文件
hdfs dfs -get /user/data/remotefile.txt ./
hdfs dfs -copyToLocal /user/data/remotefile.txt ./

# 查看文件内容
hdfs dfs -cat /user/data/file.txt
hdfs dfs -tail -f /user/data/log.txt  # 实时查看末尾

# 删除文件/目录
hdfs dfs -rm /user/data/file.txt
hdfs dfs -rm -r /user/data/dir  # 递归删除

# 移动/重命名
hdfs dfs -mv /user/data/old.txt /user/data/new.txt

# 查看磁盘使用情况
hdfs dfs -df -h /
hdfs dfs -du -h /user/data`,language:"bash",description:"HDFS 基础命令"}),e.jsx("h3",{id:"admin-commands",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.2 管理命令"}),e.jsx(s,{code:`# 查看集群状态
hdfs dfsadmin -report

# 安全模式管理
hdfs dfsadmin -safemode get    # 查看状态
hdfs dfsadmin -safemode enter   # 进入
hdfs dfsadmin -safemode leave   # 离开

# 负载均衡
hdfs balancer -threshold 10  # 平衡度阈值 10%

# 检查文件系统
hdfs fsck / -files -blocks -locations

# NameNode 格式化（谨慎使用！）
hdfs namenode -format

# 查看块信息
hdfs fsck /user/data/file.txt -files -blocks

# 设置副本数
hdfs dfs -setrep -w 3 /user/data/file.txt`,language:"bash",description:"HDFS 管理命令"}),e.jsxs(r,{type:"warning",title:"安全模式",children:["NameNode 启动时会进入安全模式（Safe Mode），此时文件系统只读，不接受写入操作。NameNode 会检查所有 DataNode 上报的块信息，当满足最小副本条件后自动退出安全模式。手动干预时使用 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded",children:"-safemode leave"}),"。"]}),e.jsx("h2",{id:"optimization",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、性能优化"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HDFS 性能优化主要关注小文件问题、网络带宽、磁盘 I/O 等方面。"}),e.jsx("h3",{id:"small-files",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"6.1 小文件问题"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"小文件（远小于块大小的文件）会占用大量 NameNode 内存，降低集群性能。每个文件、目录、块在 NameNode 中约占用 150 字节元数据。"}),e.jsxs("table",{className:"w-full border-collapse my-4 text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left",children:"解决方案"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left",children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"HAR（Hadoop Archive）"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"将小文件打包为 HAR 文件，减少元数据"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"SequenceFile"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"将小文件合并为 SequenceFile（Key-Value 格式）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"CombineFileInputFormat"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"MapReduce 中合并小文件输入"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"调整块大小"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"对小文件适当减小块大小（不推荐）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"从源头控制"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"业务层合并小文件后再写入 HDFS"})]})]})]}),e.jsx("h3",{id:"tuning",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"6.2 参数调优"}),e.jsx(s,{code:`# hdfs-site.xml 关键参数

<!-- 副本数量 -->
<property>
    <name>dfs.replication</name>
    <value>3</value>
</property>

<!-- 块大小（128MB） -->
<property>
    <name>dfs.blocksize</name>
    <value>134217728</value>
</property>

<!-- NameNode 最大内存 -->
<property>
    <name>dfs.namenode.handler.count</name>
    <value>100</value>
</property>

<!-- DataNode 数据传输线程数 -->
<property>
    <name>dfs.datanode.max.transfer.threads</name>
    <value>8192</value>
</property>

<!-- 心跳间隔（秒） -->
<property>
    <name>dfs.heartbeat.interval</name>
    <value>3</value>
</property>

<!-- 副本放置策略 -->
<property>
    <name>dfs.replication.max</name>
    <value>512</value>
</property>`,language:"xml",description:"HDFS 关键配置参数"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、常见误区"}),e.jsxs("table",{className:"w-full border-collapse my-4 text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-red-50",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left",children:"误区"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left",children:"正确理解"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"HDFS 适合存储小文件"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"HDFS 适合存储大文件（GB~TB 级），小文件会占用大量 NameNode 内存"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Secondary NameNode 是热备"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Secondary NameNode 只负责合并 FsImage，不是热备节点"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"HDFS 支持随机写"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"HDFS 只支持追加写（append），不支持随机修改"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"副本越多越安全"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"副本增加存储成本和写入压力，3 副本已足够，更多副本收益递减"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"HDFS 延迟很低"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"HDFS 优化了吞吐量，而非延迟，不适合低延迟访问场景"})]})]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、面试真题"}),e.jsx(m,{questions:[{question:"HDFS 的读写流程是怎样的？",answer:"读取流程：① Client 向 NameNode 请求文件块位置；② NameNode 返回块列表（按距离排序）；③ Client 直接从 DataNode 并行读取数据块。写入流程：① Client 向 NameNode 请求创建文件；② NameNode 返回可写入的 DataNode 列表；③ Client 建立 Pipeline（DN1 → DN2 → DN3）；④ 以 Packet 为单位流水线写入，每个节点写入后返回 ACK。"},{question:"HDFS 如何处理小文件问题？",answer:"小文件会占用大量 NameNode 内存（每个文件约 150 字节）。解决方案：① 使用 HAR（Hadoop Archive）打包小文件；② 使用 SequenceFile 合并小文件；③ 使用 CombineFileInputFormat 在 MapReduce 中合并输入；④ 从业务层控制，合并后再写入 HDFS；⑤ 调整块大小（不推荐）。"},{question:"HDFS 的副本放置策略是什么？",answer:"默认 3 副本：第 1 个副本放在客户端所在节点（或随机节点）；第 2 个副本放在不同机架的节点上；第 3 个副本放在与第 2 个副本相同机架的不同节点上。这种策略既保证了容错性（跨机架），又减少了网络传输（同机架）。可通过机架感知脚本自定义策略。"},{question:"NameNode 和 DataNode 的职责分别是什么？",answer:"NameNode：管理文件系统命名空间、权限控制、块映射关系、副本策略，存储 FsImage（元数据快照）和 EditsLog（操作日志）。DataNode：存储实际数据块、执行客户端读写请求、定期向 NameNode 发送心跳和块报告。NameNode 是 Master，DataNode 是 Slave。"},{question:"HDFS 如何实现高可用（HA）？",answer:"HA 架构部署两个 NameNode：Active 和 Standby。Active 处理客户端请求，Standby 实时同步元数据。关键组件：① ZooKeeper：选举 Active NameNode；② ZKFC：监控 NameNode 健康，触发故障转移；③ QJM（Quorum Journal Manager）：共享存储，Active 写入 EditsLog，Standby 读取同步。Active 故障时，Standby 自动接管。"},{question:"HDFS 的块大小为什么设置为 128MB？",answer:"块大小影响寻址时间和传输时间。块太小会增加寻址次数，降低吞吐量；块太大会导致 MapReduce 任务粒度过粗，影响并行度。128MB 是经验值，使得寻址时间约占传输时间的 1%，平衡了两者。可根据集群情况调整，但应使单个文件的块数量在几千以内。"},{question:"HDFS 与传统文件系统（如 ext4）的区别是什么？",answer:"HDFS 是分布式文件系统，设计用于存储超大文件（GB~TB），运行在 commodity hardware 上，提供高吞吐量，适合一次写入多次读取的批处理场景；ext4 是本地文件系统，适合小文件、随机读写、低延迟场景。HDFS 不支持随机写、硬链接，但提供高可靠性和水平扩展能力。"}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、HDFS vs 其他文件系统"}),e.jsxs("table",{className:"w-full border-collapse my-4 text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left",children:"维度"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left",children:"HDFS"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left",children:"S3"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left",children:"Ceph"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"类型"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"分布式文件系统"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"对象存储"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"统一存储系统"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"适用场景"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Hadoop 批处理"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"云存储、备份归档"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"块/对象/文件存储"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"一致性"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"强一致性"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"最终一致性"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"强一致性"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"扩展性"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"数千节点"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"无限扩展"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"数千节点"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2 font-semibold",children:"修改支持"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"仅追加写"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"覆盖写"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"随机读写"})]})]})]}),e.jsxs(r,{type:"info",title:"选型建议",children:[e.jsx("strong",{children:"使用 HDFS："}),"Hadoop 生态系统、批处理、需要 POSIX 兼容的场景。",e.jsx("br",{}),e.jsx("strong",{children:"使用 S3："}),"云原生应用、数据湖、备份归档、需要无限扩展的场景。",e.jsx("br",{}),e.jsx("strong",{children:"使用 Ceph："}),"需要统一块/对象/文件存储、私有云部署的场景。",e.jsx("br",{}),e.jsx("strong",{children:"趋势："}),"越来越多公司使用 S3 + Presto/Spark 替代 HDFS，降低运维成本。"]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、知识关联"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HDFS 作为 Hadoop 生态的存储基石，与多个知识点紧密相关："}),e.jsxs("ul",{className:"space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsxs("li",{children:["📌 ",e.jsx("strong",{children:"Hadoop 生态系统"}),"：HDFS 是 Hadoop 的核心组件之一，与 MapReduce、YARN 共同构成 Hadoop 三大支柱"]}),e.jsxs("li",{children:["📌 ",e.jsx("strong",{children:"Hive 数据仓库"}),"：Hive 默认使用 HDFS 存储数据，HQL 查询底层转换为 MapReduce 读取 HDFS"]}),e.jsxs("li",{children:["📌 ",e.jsx("strong",{children:"分布式系统"}),"：HDFS 的一致性协议、副本机制、故障恢复是分布式系统的经典案例"]}),e.jsxs("li",{children:["📌 ",e.jsx("strong",{children:"Spark 分布式计算"}),"：Spark 可直接读取 HDFS 数据，相比 MapReduce 性能提升 10-100 倍"]}),e.jsxs("li",{children:["📌 ",e.jsx("strong",{children:"存储系统"}),"：对比学习 HDFS、S3、Ceph、GlusterFS 等分布式存储系统的设计差异"]})]}),e.jsx(o,{...a(d.category,d.id)})]})}),e.jsx(n,{items:x})]})}export{j as default};
