import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{C as r,A as d,S as o}from"./ArticleNav-DhfiS38Y.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as c}from"./SideNote-BKvanovA.js";import{C as m}from"./ContextSwitcher-Cjd-h5IL.js";import{I as x}from"./InterviewSection-BBNdwyyN.js";import{D as l}from"./DiagramBlock-CLaKE9_7.js";const p=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"高可用架构概览",level:2},{id:"streaming-replication",text:"流复制机制",level:3},{id:"logical-replication",text:"逻辑复制",level:3},{id:"patroni",text:"Patroni高可用管理",level:3},{id:"pgpool",text:"Pgpool-II连接池与负载均衡",level:3},{id:"failover",text:"故障切换策略",level:2},{id:"source-code",text:"源码分析",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比其他方案",level:2},{id:"related",text:"知识关联",level:2}];function f({meta:t}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(a,{meta:t,children:[e.jsxs("div",{className:"mb-8 pb-6 border-b border-border-light",children:[e.jsx("h1",{className:"font-display font-bold text-3xl sm:text-4xl mb-3 text-ink",children:t.title}),e.jsxs("div",{className:"flex flex-wrap gap-2 items-center text-sm text-ink-muted",children:[e.jsx("span",{className:"px-2 py-1 bg-accent-soft text-accent rounded-md font-medium",children:t.level}),e.jsx("span",{children:"难度 ⭐⭐⭐⭐⭐"}),e.jsxs("span",{children:["预计阅读 ",t.readingTime," 分钟"]})]}),e.jsx("div",{className:"mt-3 flex flex-wrap gap-2",children:t.tags.map(i=>e.jsx("span",{className:"px-2.5 py-0.5 bg-parchment-deep text-ink-muted rounded-full text-xs",children:i},i))})]}),e.jsxs("section",{id:"definition",className:"mb-8",children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"pl-4 border-l-4 border-accent bg-accent-soft/40 py-3 pr-4 rounded-r-paper-md italic text-ink-light",children:"PostgreSQL 高可用与复制通过流复制、逻辑复制等机制实现数据冗余和故障转移，结合 Patroni、Pgpool-II 等工具构建自动化的主从切换、负载均衡和读写分离架构，确保数据库服务的持续可用性和数据一致性。"}),e.jsx(c,{label:"为什么需要高可用？",children:"根据统计，数据库宕机造成的业务损失平均每分钟可达数千到数万美元。高可用架构通过冗余部署和自动故障恢复，将系统可用性从 99% 提升到 99.99% 甚至更高，显著降低业务风险。"})]}),e.jsxs("section",{id:"overview",className:"mb-8",children:[e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"高可用架构概览"}),e.jsx(l,{title:"PostgreSQL 高可用架构",children:`graph TB
                CLIENT["Client Applications"] --> PGPOOL["Pgpool-II<br/>连接池/负载均衡"]
                PGPOOL --> PRIMARY["Primary Node<br/>主节点（读写）"]
                PGPOOL --> STANDBY1["Standby Node 1<br/>从节点（只读）"]
                PGPOOL --> STANDBY2["Standby Node 2<br/>从节点（只读）"]
                
                PRIMARY --> STREAM["Streaming Replication<br/>流复制（WAL）"]
                STREAM --> STANDBY1
                STREAM --> STANDBY2
                
                PATRONI["Patroni<br/>HA管理器"] -.->|监控| PRIMARY
                PATRONI -.->|监控| STANDBY1
                PATRONI -.->|监控| STANDBY2
                PATRONI --> ETCD["etcd/Consul<br/>分布式锁"]
                
                FAILOVER["自动故障切换"]
                PATRONI --> FAILOVER
                FAILOVER --> PROMOTE["Promote Standby to Primary"]
                
                style PRIMARY fill:#ff6b6b
                style STANDBY1 fill:#4ecdc4
                style STANDBY2 fill:#4ecdc4
                style PATRONI fill:#ffe66d
              `}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"PostgreSQL 高可用架构包含以下核心组件："}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"流复制"}),"：基于 WAL 日志的异步/同步复制机制"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"逻辑复制"}),"：基于表级别的细粒度复制"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Patroni"}),"：自动化高可用管理工具"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Pgpool-II"}),"：连接池、负载均衡和读写分离"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"故障检测"}),"：心跳监控和健康检查"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"自动切换"}),"：主从角色自动转换"]})]})]}),e.jsxs("section",{id:"replication-mechanisms",className:"mb-8",children:[e.jsx("h2",{id:"replication-mechanisms",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"核心复制机制"}),e.jsx("h3",{id:"streaming-replication",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"流复制机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"流复制是 PostgreSQL 最核心的复制机制，通过传输 WAL 日志实现主从数据同步："}),e.jsx(m,{simpleContent:e.jsxs("div",{children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:[e.jsx("strong",{children:"流复制基本原理"}),"：主节点持续生成 WAL 日志，从节点通过流式连接实时接收并重放这些日志，保持数据同步。"]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:[e.jsx("strong",{children:"复制模式"}),"："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted ml-4 mb-3",children:[e.jsx("li",{children:"异步复制：主节点不等待从节点确认，性能高但可能丢失数据"}),e.jsx("li",{children:"同步复制：主节点等待至少一个从节点确认，数据安全但延迟较高"}),e.jsx("li",{children:"半同步复制：平衡性能和安全性"})]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsx("strong",{children:"优势"}),"：配置简单、性能好、支持级联复制、可实现读写分离。"]})]}),hardcoreContent:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"流复制配置详解"}),e.jsx(s,{code:`-- 主节点配置 (postgresql.conf)
wal_level = replica              # WAL 级别（replica 或 logical）
max_wal_senders = 10             # 最大发送进程数
wal_keep_size = 1GB              # 保留的 WAL 大小
synchronous_standby_names = 'standby1,standby2'  # 同步从节点

-- 主节点认证配置 (pg_hba.conf)
# TYPE  DATABASE  USER  ADDRESS         METHOD
host    replication  replicator  192.168.1.0/24  md5

-- 创建复制用户
CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD 'secure_password';

-- 从节点配置 (postgresql.conf)
primary_conninfo = 'host=192.168.1.100 port=5432 user=replicator password=secure_password application_name=standby1'
primary_slot_name = 'standby1_slot'  # 可选：使用复制槽
hot_standby = on                     # 允许从节点接受查询

-- 初始化从节点（基础备份）
pg_basebackup -h 192.168.1.100 -U replicator -D /var/lib/postgresql/data -P -R

-- 查看复制状态
SELECT 
    client_addr,
    state,
    sent_lsn,
    write_lsn,
    flush_lsn,
    replay_lsn,
    sync_state,
    reply_time
FROM pg_stat_replication;`,language:"sql",description:"流复制配置和监控"})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"复制槽（Replication Slots）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:[e.jsx("strong",{children:"复制槽的作用"}),"：防止主节点过早清理从节点尚未接收的 WAL 日志，避免从节点落后过多时需要重新做基础备份。"]}),e.jsx(s,{code:`-- 创建物理复制槽
SELECT pg_create_physical_replication_slot('standby1_slot');

-- 创建逻辑复制槽
SELECT pg_create_logical_replication_slot('my_subscription', 'pgoutput');

-- 查看所有复制槽
SELECT slot_name, plugin, slot_type, active, restart_lsn
FROM pg_replication_slots;

-- 删除复制槽（谨慎操作）
SELECT pg_drop_replication_slot('unused_slot');

-- 复制槽监控
SELECT 
    slot_name,
    active,
    pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)) as lag_size
FROM pg_replication_slots;

-- 警告：未使用的复制槽会导致 WAL 无限累积！
-- 定期检查并清理不活跃的复制槽`,language:"sql",description:"复制槽管理和监控"})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"同步复制配置"}),e.jsx(s,{code:`-- 同步复制配置（主节点）
synchronous_commit = on            # 事务提交等待 WAL 刷盘
synchronous_standby_names = 'FIRST 1 (standby1, standby2)'

-- FIRST 1：至少 1 个从节点确认即可
-- ANY 2：任意 2 个从节点确认
-- quorum：法定人数模式

-- 查看同步状态
SELECT 
    pid,
    usename,
    application_name,
    client_addr,
    state,
    sync_state,  -- async/potential/sync/quorum
    reply_time
FROM pg_stat_replication;

-- 同步复制的性能影响
-- 优点：数据零丢失，强一致性
-- 缺点：写延迟增加（网络 RTT + 从节点处理时间）
-- 建议：同步从节点部署在低延迟网络中`,language:"sql",description:"同步复制配置和监控"})]})]})}),e.jsx("h3",{id:"logical-replication",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"逻辑复制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"逻辑复制基于表级别的变更数据捕获（CDC），支持更灵活的复制拓扑："}),e.jsx(s,{code:`-- 启用逻辑复制（主节点 postgresql.conf）
wal_level = logical
max_replication_slots = 10
max_wal_senders = 10

-- 创建发布（主节点）
CREATE PUBLICATION my_publication FOR TABLE users, orders;

-- 或者发布所有表
CREATE PUBLICATION all_tables FOR ALL TABLES;

-- 创建订阅（从节点）
CREATE SUBSCRIPTION my_subscription
CONNECTION 'host=192.168.1.100 dbname=mydb user=replicator password=secret'
PUBLICATION my_publication;

-- 查看发布
SELECT * FROM pg_publication;
SELECT * FROM pg_publication_tables;

-- 查看订阅
SELECT * FROM pg_subscription;
SELECT * FROM pg_stat_subscription;

-- 逻辑复制的优势
-- 1. 选择性复制：只复制指定的表
-- 2. 跨版本复制：不同 PostgreSQL 版本之间
-- 3. 双向复制：多主架构
-- 4. 数据转换：可在订阅端进行数据处理
-- 5. 合并复制：多个源合并到一个目标

-- 限制
-- 1. DDL 不会自动复制（需手动同步）
-- 2. 序列（sequence）不会自动同步
-- 3. TRUNCATE 默认不复制（需设置 publish_via_partition_root）`,language:"sql",description:"逻辑复制配置和使用"}),e.jsx("h3",{id:"patroni",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Patroni高可用管理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Patroni 是目前最流行的 PostgreSQL 高可用管理工具，提供自动故障检测和切换："}),e.jsx(s,{code:`# Patroni 配置文件示例 (patroni.yml)
scope: postgres-cluster
namespace: /service/
name: pg-node-1

restapi:
  listen: 0.0.0.0:8008
  connect_address: 192.168.1.101:8008

etcd:
  hosts: 192.168.1.10:2379,192.168.1.11:2379,192.168.1.12:2379

bootstrap:
  dcs:
    ttl: 30
    loop_wait: 10
    retry_timeout: 10
    maximum_lag_on_failover: 1048576  # 1MB
    synchronous_mode: false
    
    postgresql:
      use_pg_rewind: true
      parameters:
        wal_level: replica
        hot_standby: "on"
        max_wal_senders: 10
        max_replication_slots: 10
        wal_keep_size: 1GB
  
  initdb:
    - encoding: UTF8
    - data-checksums
  
  pg_hba:
    - host replication replicator 192.168.1.0/24 md5
    - host all all 0.0.0.0/0 md5

postgresql:
  listen: 0.0.0.0:5432
  connect_address: 192.168.1.101:5432
  data_dir: /var/lib/postgresql/14/main
  bin_dir: /usr/lib/postgresql/14/bin
  
  authentication:
    replication:
      username: replicator
      password: secure_password
    superuser:
      username: postgres
      password: secure_password

tags:
  nofailover: false
  noloadbalance: false
  clonefrom: false
  nosync: false

# 启动 Patroni
patroni patroni.yml

# 查看集群状态
patronictl -c patroni.yml list

# 手动切换主从
patronictl -c patroni.yml switchover

# 重新初始化从节点
patronictl -c patroni.yml reinit postgres-cluster pg-node-2`,language:"yaml",description:"Patroni 配置和管理"}),e.jsx("h3",{id:"pgpool",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Pgpool-II连接池与负载均衡"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Pgpool-II 是 PostgreSQL 的中间件，提供连接池、负载均衡、自动故障切换等功能："}),e.jsx(s,{code:`# Pgpool-II 配置示例 (pgpool.conf)

# 监听配置
listen_addresses = '*'
port = 9999

# 后端节点配置
backend_hostname0 = '192.168.1.101'
backend_port0 = 5432
backend_weight0 = 1
backend_data_directory0 = '/var/lib/postgresql/14/main'
backend_flag0 = 'ALLOW_TO_FAILOVER'

backend_hostname1 = '192.168.1.102'
backend_port1 = 5432
backend_weight1 = 1
backend_data_directory1 = '/var/lib/postgresql/14/main'
backend_flag1 = 'ALLOW_TO_FAILOVER'

# 连接池配置
num_init_children = 32
max_pool = 4
child_life_time = 300
connection_life_time = 0

# 负载均衡配置
load_balance_mode = on
ignore_leading_white_space = on
white_function_list = ''
black_function_list = 'nextval,setval'

# 健康检查
health_check_period = 10
health_check_timeout = 20
health_check_user = 'health_checker'
health_check_password = 'secret'
health_check_max_retries = 3

# 故障切换
failover_command = '/etc/pgpool-II/failover.sh %d %H /tmp/trigger_file'
follow_master_command = '/etc/pgpool-II/follow_master.sh %d %H %P %m'

# 在线恢复
recovery_user = 'postgres'
recovery_password = 'secret'
recovery_1st_stage_command = 'recovery_1st_stage'

# 启动 Pgpool-II
pgpool -f /etc/pgpool-II/pgpool.conf -a /etc/pgpool-II/pool_hba.conf

# 查看节点状态
psql -h localhost -p 9999 -U postgres -c "SHOW POOL_NODES;"`,language:"ini",description:"Pgpool-II 配置和管理"})]}),e.jsxs("section",{id:"failover",className:"mb-8",children:[e.jsx("h2",{id:"failover",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"故障切换策略"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"故障切换是高可用架构的核心能力，需要在数据一致性和服务可用性之间做出权衡："}),e.jsx(l,{title:"故障切换流程",children:`sequenceDiagram
                participant Monitor as 监控系统
                participant Primary as 主节点
                participant Standby as 从节点
                participant etcd as etcd/Consul
                participant App as 应用层
                
                Monitor->>Primary: 心跳检测
                Note over Primary: 主节点故障
                Monitor->>Monitor: 检测到故障
                Monitor->>etcd: 释放锁
                etcd->>Standby: 通知选举
                Standby->>Standby: 竞争成为新主
                Standby->>etcd: 获取锁成功
                Standby->>Standby: 提升为主节点
                Standby->>App: 更新连接信息
                App->>Standby: 连接到新主节点
                Note over Standby: 服务恢复`}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-6",children:[e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-white shadow-sm",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"自动切换策略"}),e.jsxs("ul",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-1",children:[e.jsxs("li",{children:["• ",e.jsx("strong",{children:"基于时间的检测"}),"：超时判定故障"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"多数派决策"}),"：避免脑裂"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"数据完整性检查"}),"：选择最接近的从节点"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"VIP 漂移"}),"：虚拟 IP 自动切换"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"DNS 更新"}),"：动态更新域名解析"]})]})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-white shadow-sm",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"手动切换场景"}),e.jsxs("ul",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-1",children:[e.jsxs("li",{children:["• ",e.jsx("strong",{children:"计划内维护"}),"：升级、补丁安装"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"硬件更换"}),"：服务器迁移"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"测试演练"}),"：验证 HA 流程"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"数据修复"}),"：人工干预恢复"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"灰度切换"}),"：逐步迁移流量"]})]})]})]}),e.jsxs(r,{type:"warning",title:"脑裂问题（Split-Brain）",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"脑裂"}),"是指网络分区导致多个节点同时认为自己是主节点，造成数据不一致。解决方案："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4",children:[e.jsx("li",{children:"使用分布式锁（etcd/Consul/ZooKeeper）确保唯一主节点"}),e.jsx("li",{children:"采用 STONITH（Shoot The Other Node In The Head）机制强制关闭旧主"}),e.jsx("li",{children:"配置 fencing 设备隔离故障节点"}),e.jsx("li",{children:"设置合理的超时时间和重试策略"})]})]})]}),e.jsxs("section",{id:"source-code",className:"mb-8",children:[e.jsx("h2",{id:"source-code",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"源码分析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"PostgreSQL 复制机制的核心代码位于 src/backend/replication/ 目录："}),e.jsx(s,{code:`/* PostgreSQL 流复制核心源码结构
 * 
 * src/backend/replication/
 * ├── walsender.c      - WAL 发送进程（主节点）
 * ├── walreceiver.c    - WAL 接收进程（从节点）
 * ├── syncrep.c        - 同步复制管理
 * ├── slot.c           - 复制槽管理
 * └── logical/         - 逻辑复制实现
 *     ├── worker.c     - 逻辑复制工作进程
 *     ├── decoder.c    - WAL 解码器
 *     └── origin.c     - 复制原点跟踪
 */

// WAL 发送进程主循环（src/backend/replication/walsender.c）
void
WalSndLoop(void)
{
    for (;;)
    {
        // 1. 检查是否有新的 WAL 数据
        if (XLogSendPhysical())
        {
            // 发送 WAL 数据到从节点
            pq_flush();
        }
        
        // 2. 处理同步复制请求
        if (am_sync_standby())
        {
            SyncRepWaitForLSN(XactCommitLSN);
        }
        
        // 3. 响应从节点的心跳和反馈
        ProcessRepliesIfAny();
        
        // 4. 检查是否需要退出
        if (got_SIGTERM)
            break;
        
        // 5. 等待事件（避免忙等待）
        WaitLatchOrSocket(&WalSnd->latch, ...);
    }
}

// WAL 接收进程（src/backend/replication/walreceiver.c）
static void
WalReceiverMain(void)
{
    // 1. 连接到主节点
    conn = walrcv_connect(conninfo);
    
    // 2. 启动复制协议
    walrcv_startstreaming(conn, startpoint);
    
    // 3. 接收并写入 WAL 数据
    while (!shutdown_requested)
    {
        len = walrcv_receive(conn, &buf);
        
        if (len > 0)
        {
            // 写入 WAL 文件
            XLogWalRcvWrite(buf, len, startptr);
            
            // 更新接收位置
            XLogWalRcvFlush(false);
            
            // 发送反馈给主节点
            XLogWalRcvSendHSFeedback(false);
        }
    }
    
    // 4. 清理资源
    walrcv_disconnect(conn);
}

// 同步复制等待（src/backend/replication/syncrep.c）
void
SyncRepWaitForLSN(XLogRecPtr XactCommitLSN)
{
    // 1. 注册等待
    SyncRepQueueInsert(MODE_SYNC_COMMIT);
    
    // 2. 等待从节点确认
    while (!SyncRepWakeQueue(false, MODE_SYNC_COMMIT))
    {
        ConditionVariableSleep(&MyProc->syncRepCond, ...);
    }
    
    // 3. 确认完成
    ConditionVariableCancelSleep();
}

// 故障检测逻辑（简化版）
bool
CheckStandbyHealth(StandbyInfo *standby)
{
    TimestampTz now = GetCurrentTimestamp();
    TimestampTz last_reply = standby->last_reply_time;
    
    // 计算延迟
    int64 delay_ms = TimestampDifferenceMilliseconds(last_reply, now);
    
    // 判断是否超时
    if (delay_ms > wal_receiver_timeout)
    {
        elog(WARNING, "standby %s is lagging (%ld ms)",
             standby->application_name, delay_ms);
        return false;
    }
    
    return true;
}`,language:"c",description:"PostgreSQL 复制机制核心源码"})]}),e.jsxs("section",{id:"misconceptions",className:"mb-8",children:[e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"常见误区"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{type:"danger",title:"误区 1：同步复制一定能保证零数据丢失",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：同步复制只能保证在正常情况下的数据一致性。如果主节点和所有同步从节点同时故障（如机房断电），仍可能丢失已提交但未持久化的事务。真正的零丢失需要结合持久化存储和地理分散部署。"]})}),e.jsxs(r,{type:"danger",title:"误区 2：从节点越多越好",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：每个从节点都会增加主节点的负载（网络带宽、WAL 发送进程）。过多的从节点会导致："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4",children:[e.jsx("li",{children:"主节点 CPU 和网络瓶颈"}),e.jsx("li",{children:"WAL 生成速度超过发送速度"}),e.jsx("li",{children:"从节点延迟增加"}),e.jsx("li",{children:"故障切换时间变长"})]}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2",children:"建议：一般不超过 5-8 个直接连接的从节点，更多从节点可使用级联复制。"})]}),e.jsxs(r,{type:"warning",title:"误区 3：Patroni 可以解决所有高可用问题",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：Patroni 是一个优秀的 HA 工具，但不是银弹。它无法解决："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4",children:[e.jsx("li",{children:"网络分区导致的脑裂（需要正确的 etcd 配置）"}),e.jsx("li",{children:"数据损坏或逻辑错误"}),e.jsx("li",{children:"应用程序的连接重试逻辑"}),e.jsx("li",{children:"备份和灾难恢复策略"})]})]}),e.jsxs(r,{type:"info",title:"误区 4：逻辑复制可以完全替代流复制",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：逻辑复制和流复制各有适用场景："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4",children:[e.jsx("li",{children:"流复制：整个实例复制，适合 HA 和读写分离"}),e.jsx("li",{children:"逻辑复制：表级别复制，适合数据集成、跨版本、选择性复制"}),e.jsx("li",{children:"两者可以结合使用，不是互斥关系"})]})]})]})]}),e.jsxs("section",{id:"interview",className:"mb-8",children:[e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"面试真题"}),e.jsx(x,{questions:[{question:"PostgreSQL 流复制中，异步复制和同步复制的区别是什么？如何选择？",answer:`异步复制 vs 同步复制：

异步复制：
- 主节点提交事务后立即返回，不等待从节点确认
- 优点：性能高，延迟低
- 缺点：主节点故障时可能丢失最近的事务
- 适用：对性能要求高、可容忍少量数据丢失的场景

同步复制：
- 主节点等待至少一个从节点确认后才返回
- 优点：数据零丢失，强一致性
- 缺点：写延迟增加（取决于网络 RTT）
- 适用：金融、电商等对数据一致性要求极高的场景

选择建议：
1. 评估业务对数据丢失的容忍度
2. 测试同步复制对性能的影响
3. 考虑混合模式：关键表同步，其他表异步
4. 使用 synchronous_standby_names = 'FIRST 1 (standby1, standby2)' 提供冗余`},{question:"什么是复制槽？为什么需要使用它？",answer:`复制槽（Replication Slot）的作用：

问题背景：
- 主节点会定期清理旧的 WAL 文件以节省空间
- 如果从节点落后太多，需要的 WAL 已被清理，从节点将无法继续复制
- 传统方式需要重新做基础备份，耗时且影响服务

复制槽解决方案：
- 复制槽记录每个从节点的进度
- 主节点保留所有从节点需要的 WAL 文件
- 即使从节点暂时断开，重连后也能继续复制

类型：
1. 物理复制槽：用于流复制
2. 逻辑复制槽：用于逻辑复制

注意事项：
- 未使用的复制槽会导致 WAL 无限累积，耗尽磁盘空间
- 必须定期监控和清理不活跃的复制槽
- 生产环境建议始终使用复制槽`},{question:"Patroni 是如何实现自动故障切换的？",answer:`Patroni 自动故障切换流程：

1. 健康检查：
   - 每个节点定期向 etcd/Consul 发送心跳
   - 主节点持有分布式锁（leader lock）
   - 锁的 TTL 通常为 30 秒

2. 故障检测：
   - 如果主节点未能续租锁，锁过期
   - 从节点检测到锁释放

3. 选举新主：
   - 从节点竞争获取锁
   - 选择 WAL 位置最新的从节点（通过 compare_and_swap）
   - 确保数据一致性（maximum_lag_on_failover 参数控制）

4. 提升新主：
   - 新主执行 pg_ctl promote
   - 更新配置为可写模式
   - 通知其他节点新的主节点信息

5. 客户端重连：
   - 应用层通过 VIP、DNS 或服务发现连接到新主
   - Patroni 提供 REST API 查询当前主节点

关键配置：
- ttl: 锁的生存时间
- loop_wait: 检查间隔
- retry_timeout: 重试超时
- maximum_lag_on_failover: 允许的最大延迟`},{question:"如何监控 PostgreSQL 复制延迟？延迟过大的原因有哪些？",answer:`监控复制延迟的方法：

1. 基于 LSN（推荐）：
SELECT 
    client_addr,
    pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) as replay_lag_bytes,
    extract(epoch from replay_lag) as replay_lag_seconds
FROM pg_stat_replication;

2. 基于时间：
SELECT 
    application_name,
    extract(epoch from now() - pg_last_xact_replay_timestamp()) as lag_seconds
FROM pg_stat_replication;

3. Patroni/Pgpool 监控接口

延迟过大的原因：
1. 网络问题：带宽不足、高延迟、丢包
2. 主节点负载过高：WAL 生成速度超过发送速度
3. 从节点性能不足：重放速度慢（CPU、I/O 瓶颈）
4. 大事务：单个大事务导致长时间阻塞
5. 检查点频繁：影响 I/O 性能
6. 从节点正在执行长时间查询

优化策略：
- 增加 wal_buffers 和 max_wal_size
- 优化从节点硬件（SSD、充足内存）
- 避免在从节点执行重型查询
- 使用压缩传输（如果网络带宽有限）
- 调整 checkpoint_timeout 和 checkpoint_completion_target`},{question:"如何实现 PostgreSQL 的读写分离？需要注意哪些问题？",answer:`读写分离实现方案：

方案 1：Pgpool-II
- 配置 load_balance_mode = on
- 自动将 SELECT 路由到从节点
- 支持透明的故障切换

方案 2：应用程序层
- 使用不同的数据源（主库写、从库读）
- Spring Boot: @ReadOnlyConnection 注解
- 需要处理连接管理和路由逻辑

方案 3：DNS/VIP 路由
- 写操作指向主节点 VIP
- 读操作指向从节点 VIP
- 配合负载均衡器使用

需要注意的问题：
1. 复制延迟：刚写入的数据可能立即读取不到
   - 解决方案：关键查询强制走主库，或使用同步复制

2. 会话一致性：同一会话的读写应在同一节点
   - 解决方案：使用 sticky session 或事务绑定

3. 事务边界：事务内的读写必须在主节点
   - 解决方案：检测事务状态，自动路由

4. 故障切换：从节点提升为主后，应用需要重新连接
   - 解决方案：使用连接池自动重连，或重试机制

5. 监控告警：实时监控延迟和节点状态
   - 解决方案：集成 Prometheus + Grafana`}]})]}),e.jsxs("section",{id:"comparison",className:"mb-8",children:[e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"对比其他方案"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"min-w-full border-collapse border border-border text-[14px] sm:text-[15px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"PostgreSQL + Patroni"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"MySQL MGR"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"云数据库 HA"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"架构复杂度"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐（中等，需额外组件）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐（内置，较简单）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（完全托管）"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"故障切换时间"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"10-30 秒"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"5-15 秒"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"30-60 秒"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"数据一致性"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（可配置同步复制）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（Paxos 协议）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐（取决于服务商）"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"扩展性"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐（支持级联复制）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐（最多 9 节点）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（自动扩展）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"运维成本"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐（需自行维护）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐（相对简单）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（零运维）"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"成本"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（开源免费）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（开源免费）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐（按实例付费）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"适用场景"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"自建 IDC、混合云、灵活定制"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"MySQL 生态、中小规模"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"快速启动、免运维、弹性需求"})]})]})]})}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-4",children:[e.jsx("strong",{children:"选型建议"}),"：PostgreSQL + Patroni 适合需要自主控制和灵活定制的场景；MySQL MGR 适合 MySQL 技术栈；云数据库 HA 适合快速启动和免运维需求。"]})]}),e.jsxs("section",{id:"related",className:"mb-8",children:[e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"知识关联"}),e.jsxs("div",{className:"grid sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🐘 PostgreSQL核心原理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"深入学习 MVCC、WAL、VACUUM 等核心机制"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🗄️ MySQL主从复制与高可用"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"对比 MySQL 的复制机制和高可用方案"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🔧 PostgreSQL扩展生态"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"了解各种扩展插件的功能和应用场景"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"☁️ Kubernetes 中的有状态服务"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"学习如何在 K8s 中部署和管理 PostgreSQL 集群"})]})]})]}),e.jsx(d,{...n(t.category,t.id)})]})}),e.jsx(o,{items:p})]})}export{f as default};
