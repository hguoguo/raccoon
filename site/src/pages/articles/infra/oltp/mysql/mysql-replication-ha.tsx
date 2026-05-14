import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import ArticleNav from '../../../../../components/article/ArticleNav'
import Playground from '../../../../../components/knowledge/Playground'
import Callout from '../../../../../components/ui/Callout'
import SideNote from '../../../../../components/knowledge/SideNote'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'replication-overview', text: '主从复制架构', level: 2 },
  { id: 'binlog-mechanism', text: 'Binlog 日志机制', level: 3 },
  { id: 'replication-process', text: '复制流程详解', level: 3 },
  { id: 'gtid-replication', text: 'GTID 全局事务标识符', level: 3 },
  { id: 'ha-solutions', text: '高可用方案', level: 2 },
  { id: 'mha-architecture', text: 'MHA 高可用架构', level: 3 },
  { id: 'orchestrator', text: 'Orchestrator 拓扑管理', level: 3 },
  { id: 'read-write-splitting', text: '读写分离实践', level: 3 },
  { id: 'sharding-strategy', text: '分库分表策略', level: 3 },
  { id: 'source-code', text: '源码分析', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比其他 HA 方案', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function MysqlReplicationHa({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>
          {/* 头部信息 */}
          <div className="mb-8 pb-6 border-b border-border-light">
            <h1 className="font-display font-bold text-3xl sm:text-4xl mb-3 text-ink">
              {meta.title}
            </h1>
            <div className="flex flex-wrap gap-2 items-center text-sm text-ink-muted">
              <span className="px-2 py-1 bg-accent-soft text-accent rounded-md font-medium">
                {meta.level}
              </span>
              <span>难度 ⭐⭐⭐⭐⭐</span>
              <span>预计阅读 {meta.readingTime} 分钟</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-parchment-deep text-ink-muted rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 一句话定义 */}
          <section id="definition" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              一句话定义
            </h2>
            <blockquote className="pl-4 border-l-4 border-accent bg-accent-soft/40 py-3 pr-4 rounded-r-paper-md italic text-ink-light">
              MySQL 主从复制是基于 Binlog 的异步/半同步数据同步机制，配合 MHA、Orchestrator 等高可用工具实现故障自动切换，通过读写分离和分库分表提升系统整体性能和可扩展性。
            </blockquote>
            <SideNote label="为什么需要主从复制？">
              单点故障风险、读写性能瓶颈、数据备份需求、地理容灾部署——这些都是推动 MySQL 主从复制成为企业级应用标配的核心驱动力。
            </SideNote>
          </section>

          {/* 主从复制架构 */}
          <section id="replication-overview" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              主从复制架构
            </h2>
            <DiagramBlock title="MySQL 主从复制架构">
              {`graph LR
                APP["Application"] --> MASTER["Master<br/>Primary"]
                MASTER -->|Binlog| SLAVE1["Slave 1<br/>Secondary"]
                MASTER -->|Binlog| SLAVE2["Slave 2<br/>Secondary"]
                MASTER -->|Binlog| SLAVE3["Slave 3<br/>Secondary"]
                SLAVE1 --> READ["Read Operations"]
                SLAVE2 --> READ
                SLAVE3 --> READ
                MASTER --> WRITE["Write Operations"]
                
                style MASTER fill:#ff6b6b,stroke:#c92a2a,color:#fff
                style SLAVE1 fill:#4dabf7,stroke:#1864ab,color:#fff
                style SLAVE2 fill:#4dabf7,stroke:#1864ab,color:#fff
                style SLAVE3 fill:#4dabf7,stroke:#1864ab,color:#fff
              `}
            </DiagramBlock>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              MySQL 主从复制采用<strong className="text-ink">一主多从</strong>的架构模式：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong className="text-ink">Master（主库）</strong>：处理所有写操作，生成 Binlog 日志</li>
              <li><strong className="text-ink">Slave（从库）</strong>：拉取 Master 的 Binlog，重放 SQL 保持数据一致</li>
              <li><strong className="text-ink">异步复制</strong>：默认模式，Master 不等待 Slave 确认即返回客户端</li>
              <li><strong className="text-ink">半同步复制</strong>：至少一个 Slave 确认后 Master 才返回，提升数据安全性</li>
            </ul>
            <Callout type="warning" title="复制延迟问题">
              异步复制模式下，Slave 可能存在秒级甚至分钟级的延迟。对于强一致性要求的场景，需要考虑半同步复制或 Group Replication。
            </Callout>
          </section>

          {/* Binlog 日志机制 */}
          <section id="binlog-mechanism" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              Binlog 日志机制
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Binlog（Binary Log）是 MySQL Server 层产生的二进制日志，记录所有修改数据的 SQL 语句。它是主从复制和数据恢复的核心基础。
            </p>
            <DiagramBlock title="Binlog 三种格式对比">
              {`graph TD
                FORMAT["Binlog Format"] --> STATEMENT["STATEMENT<br/>基于SQL语句"]
                FORMAT --> ROW["ROW<br/>基于行变化"]
                FORMAT --> MIXED["MIXED<br/>混合模式"]
                
                STATEMENT --> S_PROS["优点：日志量小"]
                STATEMENT --> S_CONS["缺点：非确定性函数不安全"]
                
                ROW --> R_PROS["优点：精确可靠"]
                ROW --> R_CONS["缺点：日志量大"]
                
                MIXED --> M_DESC["默认使用STATEMENT<br/>特殊场景切换ROW"]
                
                style ROW fill:#69db7c,stroke:#2b8a3e,color:#fff
              `}
            </DiagramBlock>
            <Playground
              code={`-- 查看 Binlog 状态
SHOW MASTER STATUS;

-- 查看 Binlog 格式
SHOW VARIABLES LIKE 'binlog_format';

-- 查看当前 Binlog 文件
SHOW BINARY LOGS;

-- 解析 Binlog 内容
mysqlbinlog --base64-output=DECODE-ROWS -v mysql-bin.000001`}
              language="sql"
              description="查看 Binlog 配置"
            />
            <SideNote label="Binlog vs Redo Log">
              Binlog 属于 Server 层，逻辑日志，用于主从复制和恢复；Redo Log 属于 InnoDB 引擎层，物理日志，用于崩溃恢复。两者协同工作保证数据持久性和一致性。
            </SideNote>
          </section>

          {/* 复制流程详解 */}
          <section id="replication-process" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              复制流程详解
            </h3>
            <DiagramBlock title="主从复制三线程模型">
              {`sequenceDiagram
                participant Client as Client
                participant Master as Master
                participant Binlog as Binlog Dump Thread
                participant IO as Slave IO Thread
                participant Relay as Relay Log
                participant SQL as Slave SQL Thread
                participant SlaveDB as Slave DB
                
                Client->>Master: WRITE Query
                Master->>Master: Execute & Generate Binlog
                Master->>Binlog: Send Binlog Events
                Binlog->>IO: Transfer Binlog
                IO->>Relay: Write to Relay Log
                IO->>IO: Update master.info
                SQL->>Relay: Read Relay Log
                SQL->>SlaveDB: Replay SQL Statements
                SlaveDB->>SlaveDB: Execute & Commit`}
            </DiagramBlock>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              复制过程涉及三个关键线程：
            </p>
            <ol className="list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong className="text-ink">Binlog Dump Thread（Master）</strong>：读取 Binlog 事件并发送给 Slave</li>
              <li><strong className="text-ink">IO Thread（Slave）</strong>：连接 Master，接收 Binlog 并写入 Relay Log</li>
              <li><strong className="text-ink">SQL Thread（Slave）</strong>：读取 Relay Log，重放 SQL 语句</li>
            </ol>
            <Callout type="info" title="并行复制优化">
              MySQL 5.6 引入基于 Schema 的并行复制，5.7 引入基于 Group Commit 的并行复制，8.0 引入 WRITESET 并行复制，显著提升 Slave 回放速度，降低复制延迟。
            </Callout>
          </section>

          {/* GTID 全局事务标识符 */}
          <section id="gtid-replication" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              GTID 全局事务标识符
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              GTID（Global Transaction Identifier）是 MySQL 5.6 引入的全局事务标识符，由 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">server_uuid:transaction_id</code> 组成，简化了主从切换和故障恢复流程。
            </p>
            <Playground
              code={`[mysqld]
gtid_mode = ON
enforce_gtid_consistency = ON
log_bin = mysql-bin
binlog_format = ROW

-- 查看 GTID 执行状态
SHOW GLOBAL VARIABLES LIKE 'gtid_executed';

-- 基于 GTID 的主从配置
CHANGE MASTER TO
  MASTER_HOST='master_host',
  MASTER_AUTO_POSITION=1;`}
              language="sql"
              description="启用 GTID 模式"
            />
            <ContextSwitcher
              simpleContent={<p>基于 Binlog 文件名和位置（File + Position），主从切换时需要手动计算位置，容易出错。</p>}
              hardcoreContent={<p>基于全局事务 ID，自动定位复制位点，支持无损主从切换，简化运维复杂度。</p>}
            />
          </section>

          {/* 高可用方案 */}
          <section id="ha-solutions" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              高可用方案
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              MySQL 高可用方案经历了从手动切换到自动化管理的演进，主流方案包括 MHA、Orchestrator、Group Replication 等。
            </p>
            <DiagramBlock title="高可用方案演进">
              {`graph LR
                MANUAL["手动切换<br/>Keepalived+VIP"] --> MHA["MHA<br/>Master High Availability"]
                MHA --> ORCHESTRATOR["Orchestrator<br/>拓扑管理"]
                ORCHESTRATOR --> GR["Group Replication<br/>MGR"]
                GR --> INNODB_CLUSTER["InnoDB Cluster<br/>MySQL Shell"]
                
                style GR fill:#ffd43b,stroke:#f08c00,color:#000
                style INNODB_CLUSTER fill:#69db7c,stroke:#2b8a3e,color:#fff
              `}
            </DiagramBlock>
          </section>

          {/* MHA 高可用架构 */}
          <section id="mha-architecture" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              MHA 高可用架构
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              MHA（Master High Availability）是日本 DeNA 公司开发的 MySQL 高可用解决方案，能在 30 秒内完成故障检测和主从切换。
            </p>
            <DiagramBlock title="MHA 架构组件">
              {`graph TB
                MANAGER["MHA Manager<br/>监控节点"] --> MONITOR["监控 Master 健康"]
                MANAGER --> SELECT["选择新 Master"]
                MANAGER --> SWITCH["执行主从切换"]
                
                NODE["MHA Node<br/>数据节点"] --> SAVE["保存差异 Binlog"]
                NODE --> APPLY["应用差异日志"]
                NODE --> PROMOTE["提升为新 Master"]
                
                MASTER["Master"] -.->|SSH| NODE
                SLAVE1["Slave 1"] -.->|SSH| NODE
                SLAVE2["Slave 2"] -.->|SSH| NODE
                
                style MANAGER fill:#ff6b6b,stroke:#c92a2a,color:#fff
                style NODE fill:#4dabf7,stroke:#1864ab,color:#fff
              `}
            </DiagramBlock>
            <Playground
              code={`[server default]
user=mha_repl
password=password
ssh_user=root
repl_user=repl
repl_password=repl_pass
manager_workdir=/var/log/masterha/app1
manager_log=/var/log/masterha/app1/manager.log

[server1]
hostname=192.168.1.10
candidate_master=1

[server2]
hostname=192.168.1.11
candidate_master=1

[server3]
hostname=192.168.1.12
no_master=1

# 启动 MHA Manager
masterha_manager --conf=/etc/masterha/app1.cnf --remove_dead_master_conf --ignore_last_failover`}
              language="bash"
              description="MHA 配置文件示例"
            />
            <Callout type="warning" title="MHA 的局限性">
              MHA 已停止维护（最后更新 2018 年），不支持 MySQL 8.0+，且依赖 SSH 免密登录，存在安全隐患。生产环境建议使用 Orchestrator 或 MGR。
            </Callout>
          </section>

          {/* Orchestrator 拓扑管理 */}
          <section id="orchestrator" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              Orchestrator 拓扑管理
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Orchestrator 是 GitHub 开源的 MySQL 拓扑管理和可视化工具，支持自动故障检测、智能主从切换、拓扑可视化等功能。
            </p>
            <DiagramBlock title="Orchestrator 核心功能">
              {`graph TD
                ORCH["Orchestrator"] --> DISCOVER["自动发现拓扑"]
                ORCH --> DETECT["故障检测"]
                ORCH --> RECOVERY["自动恢复"]
                ORCH --> VISUALIZE["拓扑可视化"]
                ORCH --> API["RESTful API"]
                
                DISCOVER --> TOPOLOGY["构建复制拓扑图"]
                DETECT --> HEALTH_CHECK["心跳检测"]
                RECOVERY --> FAILOVER["自动 Failover"]
                RECOVERY --> REBUILD["重建从库"]
                
                style ORCH fill:#9775fa,stroke:#5f3dc4,color:#fff
              `}
            </DiagramBlock>
            <SideNote label="Orchestrator vs MHA">
              Orchestrator 无需 SSH 免密登录，通过 MySQL 协议通信更安全；提供 Web UI 直观展示拓扑关系；支持更灵活的恢复策略（如 Pseudo-GTID）。
            </SideNote>
          </section>

          {/* 读写分离实践 */}
          <section id="read-write-splitting" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              读写分离实践
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              读写分离通过将读请求分发到多个 Slave，减轻 Master 负载，提升系统整体吞吐量。实现方式包括客户端路由和中间件代理。
            </p>
            <DiagramBlock title="读写分离架构">
              {`graph LR
                APP["Application"] --> PROXY["Proxy Layer"]
                PROXY -->|WRITE| MASTER["Master"]
                PROXY -->|READ| SLAVE_POOL["Slave Pool"]
                SLAVE_POOL --> SLAVE1["Slave 1"]
                SLAVE_POOL --> SLAVE2["Slave 2"]
                SLAVE_POOL --> SLAVE3["Slave 3"]
                
                subgraph "Proxy Solutions"
                  PROXY1["MyCat"]
                  PROXY2["ShardingSphere-Proxy"]
                  PROXY3["ProxySQL"]
                end
                
                style MASTER fill:#ff6b6b,stroke:#c92a2a,color:#fff
                style SLAVE_POOL fill:#4dabf7,stroke:#1864ab,color:#fff
              `}
            </DiagramBlock>
            <Playground
              code={`spring:
  shardingsphere:
    datasource:
      names: master,slave1,slave2
      master:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://master:3306/db
      slave1:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://slave1:3306/db
      slave2:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://slave2:3306/db
    
    masterslave:
      load-balance-algorithm-type: round_robin
      name: ms_ds
      master-data-source-name: master
      slave-data-source-names: slave1,slave2`}
              language="yaml"
              description="ShardingSphere 读写分离配置"
            />
            <Callout type="danger" title="读写分离的陷阱">
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>刚写入的数据立即读取可能因复制延迟查不到（最终一致性问题）</li>
                <li>强制走主库：添加 Hint <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">/* master */</code></li>
                <li>避免在 Slave 上执行写操作，会导致主从数据不一致</li>
              </ul>
            </Callout>
          </section>

          {/* 分库分表策略 */}
          <section id="sharding-strategy" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              分库分表策略
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              当单表数据量超过千万级别时，需要考虑分库分表。常见策略包括垂直拆分和水平拆分。
            </p>
            <DiagramBlock title="分库分表策略">
              {`graph TD
                SHARDING["分库分表"] --> VERTICAL["垂直拆分"]
                SHARDING --> HORIZONTAL["水平拆分"]
                
                VERTICAL --> V_TABLE["按列拆分<br/>大字段独立"]
                VERTICAL --> V_DB["按业务拆分<br/>微服务化"]
                
                HORIZONTAL --> H_RANGE["范围分片<br/>按时间/ID区间"]
                HORIZONTAL --> H_HASH["哈希分片<br/>user_id % N"]
                HORIZONTAL --> H_GEO["地理分片<br/>按区域"]
                
                style HORIZONTAL fill:#ffd43b,stroke:#f08c00,color:#000
              `}
            </DiagramBlock>
            <ContextSwitcher
              simpleContent={<p>将大表按列拆分为多个小表（如用户基本信息表和扩展信息表），或将不同业务的表拆分到不同数据库。优点是解耦清晰，缺点是无法解决单表数据量大的问题。</p>}
              hardcoreContent={<p>将同一张表的数据按某种规则（如 user_id % 16）分散到多个表或数据库中。优点是能显著降低单表压力，缺点是跨分片查询复杂，需要中间件支持。</p>}
            />
            <Playground
              code={`spring:
  shardingsphere:
    sharding:
      tables:
        t_order:
          actual-data-nodes: ds\${0..1}.t_order_\${0..1}
          table-strategy:
            inline:
              sharding-column: order_id
              algorithm-expression: t_order_\${order_id % 2}
          key-generator:
            column: order_id
            type: SNOWFLAKE
      
      binding-tables: t_order,t_order_item
      broadcast-tables: t_address`}
              language="yaml"
              description="ShardingSphere 水平分表示例"
            />
          </section>

          {/* 源码分析 */}
          <section id="source-code" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              源码分析
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              MySQL 主从复制的核心逻辑位于 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">sql/rpl_*.cc</code> 文件中。以下是关键流程的伪代码实现：
            </p>
            <Playground
              code={`// sql/rpl_binlog_sender.cc
void Binlog_sender::run() {
  // 1. 验证 Slave 权限
  check_slave_capability();
  
  // 2. 初始化 Binlog 文件读取位置
  init_binlog_position(start_file, start_pos);
  
  // 3. 循环发送 Binlog 事件
  while (!abort_flag) {
    // 读取下一个 Event
    Log_event* event = read_next_event();
    
    if (event == NULL) {
      // Binlog 轮转，打开新文件
      rotate_to_next_binlog();
      continue;
    }
    
    // 发送 Event 到 Slave
    send_event(event);
    
    // 更新 Slave 反馈的位置
    update_slave_position();
  }
}`}
              language="cpp"
              description="Binlog Dump 线程核心逻辑"
            />
            <Playground
              code={`// sql/rpl_slave.cc
void handle_slave_io() {
  // 1. 连接 Master
  connect_to_master();
  
  // 2. 注册 Slave 到 Master
  register_slave();
  
  // 3. 请求 Binlog Dump
  request_binlog_dump(binlog_file, binlog_pos);
  
  // 4. 接收并写入 Relay Log
  while (running) {
    Packet* packet = receive_from_master();
    
    if (packet->is_rotate_event()) {
      rotate_relay_log();
    } else {
      write_to_relay_log(packet);
      update_master_info();  // 记录 master.info
    }
  }
}`}
              language="cpp"
              description="Slave IO 线程核心逻辑"
            />
            <SideNote label="关键数据结构">
              <ul className="list-disc list-inside space-y-1">
                <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">MYSQL_BIN_LOG</code>：Binlog 文件管理器</li>
                <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Relay_log_info</code>：Slave 复制状态信息</li>
                <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Log_event</code>：Binlog 事件基类</li>
              </ul>
            </SideNote>
          </section>

          {/* 常见误区 */}
          <section id="misconceptions" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              常见误区
            </h2>
            <div className="space-y-4">
              <Callout type="danger" title="误区 1：主从复制是实时同步的">
                <p className="mb-2">实际上，异步复制模式下 Slave 存在延迟，可能是毫秒级也可能是分钟级。只有半同步复制或 Group Replication 才能提供准实时同步。</p>
                <p><strong>正确做法：</strong>监控 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Seconds_Behind_Master</code>，对强一致性场景使用半同步复制。</p>
              </Callout>
              
              <Callout type="danger" title="误区 2：Slave 越多越好">
                <p className="mb-2">每个 Slave 都会增加 Master 的网络带宽压力和 Binlog Dump 线程负载。过多的 Slave 反而会影响 Master 性能。</p>
                <p><strong>正确做法：</strong>采用级联复制（A → B → C）或使用中间件缓存热点数据。</p>
              </Callout>
              
              <Callout type="danger" title="误区 3：主从切换后不需要修复旧 Master">
                <p className="mb-2">故障切换后，旧 Master 可能包含未同步的数据，直接重新加入集群会导致数据冲突。</p>
                <p><strong>正确做法：</strong>使用 MHA 的 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">apply_diff_relay_logs</code> 补偿差异数据，或重新全量同步。</p>
              </Callout>
              
              <Callout type="danger" title="误区 4：GTID 可以完全替代传统复制">
                <p className="mb-2">GTID 虽然简化了运维，但在某些场景下（如混合 DDL/DML 事务）可能触发 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ER_GTID_UNSAFE_STATEMENT</code> 错误。</p>
                <p><strong>正确做法：</strong>开启 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">enforce_gtid_consistency</code>，避免不安全的事务操作。</p>
              </Callout>
              
              <Callout type="danger" title="误区 5：分库分表后 JOIN 查询会自动优化">
                <p className="mb-2">跨分片的 JOIN 查询性能极差，可能导致全表扫描或笛卡尔积。</p>
                <p><strong>正确做法：</strong>通过冗余字段避免跨分片 JOIN，或使用全局表（广播表）存储字典数据。</p>
              </Callout>
            </div>
          </section>

          {/* 面试真题 */}
          <section id="interview" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              面试真题
            </h2>
            <InterviewSection
              questions={[
                {
                  question: 'MySQL 主从复制的原理是什么？涉及哪些线程？',
                  answer: '主从复制基于 Binlog 日志，涉及三个线程：Master 的 Binlog Dump Thread 负责发送 Binlog，Slave 的 IO Thread 负责接收并写入 Relay Log，SQL Thread 负责重放 SQL。复制过程是异步的，可能存在延迟。',
                },
                {
                  question: '如何解决主从复制延迟问题？',
                  answer: '① 升级硬件（SSD、大内存）；② 优化 SQL，减少大事务；③ 启用并行复制（MySQL 5.7+）；④ 使用半同步复制；⑤ 业务层面容忍最终一致性，或强制走主库读取关键数据。',
                },
                {
                  question: 'GTID 相比传统复制有什么优势？',
                  answer: 'GTID 的优势：① 简化主从切换，无需手动计算 Binlog 位置；② 支持无损故障恢复；③ 便于监控和调试；④ 支持多源复制。缺点是某些特殊事务（如 CREATE TEMPORARY TABLE + DML）不被支持。',
                },
                {
                  question: 'MHA 的故障切换流程是怎样的？',
                  answer: '① Monitor 检测到 Master 宕机；② 选择候选 Master（优先选择数据最新的 Slave）；③ 保存其他 Slave 的差异 Relay Log；④ 将差异日志应用到新 Master；⑤ 其他 Slave 重新指向新 Master；⑥ 更新配置文件，移除旧 Master。整个过程通常在 10-30 秒内完成。',
                },
                {
                  question: '读写分离场景下，如何保证刚写入的数据能立即读到？',
                  answer: '有三种方案：① 强制走主库（添加 Hint 或通过路由策略）；② 等待 Slave 同步完成（轮询检查 Seconds_Behind_Master）；③ 使用缓存，写入时同时更新缓存，读取时优先读缓存。推荐方案 1，简单可靠。',
                },
                {
                  question: '分库分表后，如何实现分布式事务？',
                  answer: '可选方案：① XA 两阶段提交（性能差，不推荐）；② TCC 补偿事务（业务侵入性强）；③ 本地消息表 + 定时任务（最终一致性）；④ Seata AT 模式（自动补偿，推荐）；⑤ ShardingSphere 的柔性事务（BASE 理论）。根据业务场景选择，大多数场景接受最终一致性。',
                },
                {
                  question: 'Binlog 的三种格式有什么区别？生产环境用哪种？',
                  answer: 'STATEMENT 基于 SQL 语句，日志量小但不安全（非确定性函数如 NOW()、UUID() 会导致主从不一致）；ROW 基于行变化，精确可靠但日志量大；MIXED 混合模式，默认使用 STATEMENT，遇到不安全语句自动切换为 ROW。生产环境推荐使用 ROW 格式，确保数据一致性。',
                },
              ]}
            />
          </section>

          {/* 对比其他 HA 方案 */}
          <section id="comparison" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              对比其他 HA 方案
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-border-light text-sm">
                <thead>
                  <tr className="bg-parchment-deep">
                    <th className="border border-border-light px-4 py-2 text-left">特性</th>
                    <th className="border border-border-light px-4 py-2 text-left">MHA</th>
                    <th className="border border-border-light px-4 py-2 text-left">Orchestrator</th>
                    <th className="border border-border-light px-4 py-2 text-left">MGR</th>
                    <th className="border border-border-light px-4 py-2 text-left">InnoDB Cluster</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border-light px-4 py-2 font-medium">开发状态</td>
                    <td className="border border-border-light px-4 py-2 text-red-600">已停止维护</td>
                    <td className="border border-border-light px-4 py-2 text-green-600">活跃</td>
                    <td className="border border-border-light px-4 py-2 text-green-600">官方支持</td>
                    <td className="border border-border-light px-4 py-2 text-green-600">官方支持</td>
                  </tr>
                  <tr>
                    <td className="border border-border-light px-4 py-2 font-medium">故障切换时间</td>
                    <td className="border border-border-light px-4 py-2">10-30 秒</td>
                    <td className="border border-border-light px-4 py-2">10-60 秒</td>
                    <td className="border border-border-light px-4 py-2">&lt; 10 秒</td>
                    <td className="border border-border-light px-4 py-2">&lt; 10 秒</td>
                  </tr>
                  <tr>
                    <td className="border border-border-light px-4 py-2 font-medium">数据一致性</td>
                    <td className="border border-border-light px-4 py-2">最终一致</td>
                    <td className="border border-border-light px-4 py-2">最终一致</td>
                    <td className="border border-border-light px-4 py-2 text-green-600">强一致</td>
                    <td className="border border-border-light px-4 py-2 text-green-600">强一致</td>
                  </tr>
                  <tr>
                    <td className="border border-border-light px-4 py-2 font-medium">部署复杂度</td>
                    <td className="border border-border-light px-4 py-2">中等</td>
                    <td className="border border-border-light px-4 py-2">较高</td>
                    <td className="border border-border-light px-4 py-2">高</td>
                    <td className="border border-border-light px-4 py-2">高</td>
                  </tr>
                  <tr>
                    <td className="border border-border-light px-4 py-2 font-medium">适用场景</td>
                    <td className="border border-border-light px-4 py-2">遗留系统</td>
                    <td className="border border-border-light px-4 py-2">大规模集群</td>
                    <td className="border border-border-light px-4 py-2">金融级高可用</td>
                    <td className="border border-border-light px-4 py-2">云原生部署</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Callout type="info" title="选型建议">
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>中小规模</strong>：Orchestrator（成熟稳定，社区活跃）</li>
                <li><strong>金融级要求</strong>：MGR（强一致性，官方支持）</li>
                <li><strong>云原生环境</strong>：InnoDB Cluster + MySQL Operator（Kubernetes 友好）</li>
                <li><strong>遗留系统</strong>：MHA（谨慎使用，考虑迁移）</li>
              </ul>
            </Callout>
          </section>

          {/* 知识关联 */}
          <section id="related" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              知识关联
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-parchment-deep rounded-paper-md border border-border-light">
                <h4 className="font-semibold text-ink mb-2">前置知识</h4>
                <ul className="space-y-1 text-sm text-ink-muted">
                  <li>• <a href="/docs/mysql/mysql-architecture" className="text-accent hover:underline">MySQL 架构与存储引擎</a></li>
                </ul>
              </div>
              <div className="p-4 bg-parchment-deep rounded-paper-md border border-border-light">
                <h4 className="font-semibold text-ink mb-2">相关知识点</h4>
                <ul className="space-y-1 text-sm text-ink-muted">
                  <li>• <a href="/docs/mysql/mysql-index-optimization" className="text-accent hover:underline">MySQL 索引优化实战</a></li>
                  <li>• <a href="/docs/mysql/mysql-performance-tuning" className="text-accent hover:underline">MySQL 性能调优</a></li>
                  <li>• <a href="/docs/postgresql/postgresql-replication" className="text-accent hover:underline">PostgreSQL 高可用与复制</a></li>
                </ul>
              </div>
            </div>
          </section>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，禁止用 <aside> 包裹！组件自行管理桌面/移动端显隐 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
