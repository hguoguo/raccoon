import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as o}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as r}from"./SideNote-BKvanovA.js";import{C as s,A as d,S as a}from"./ArticleNav-DhfiS38Y.js";import{D as l}from"./DiagramBlock-CLaKE9_7.js";import{I as c}from"./InterviewSection-BBNdwyyN.js";const x=[{id:"definition",text:"一句话定义",level:2},{id:"execution-plan",text:"一、执行计划分析",level:2},{id:"index-optimization",text:"二、索引优化策略",level:2},{id:"statistics",text:"三、统计信息管理",level:2},{id:"region-split",text:"四、Region 分裂与调度",level:2},{id:"pd-scheduling",text:"五、PD 调度优化",level:2},{id:"tiflash-acceleration",text:"六、TiFlash 加速技巧",level:2},{id:"resource-control",text:"七、资源控制与隔离",level:2},{id:"slow-query",text:"八、慢查询诊断",level:2},{id:"misconceptions",text:"九、常见误区",level:2},{id:"interview",text:"十、面试真题",level:2},{id:"related",text:"十一、知识关联",level:2}];function b({meta:i}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(o,{meta:i,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["TiDB 性能调优是通过",e.jsx("strong",{className:"text-accent",children:"执行计划分析"}),"、",e.jsx("strong",{children:"索引优化"}),"、",e.jsx("strong",{children:"统计信息更新"}),"、",e.jsx("strong",{children:"Region 调度"}),"等手段， 提升分布式数据库查询性能和吞吐量的系统性工程，需要结合业务场景和集群状态综合优化。"]})}),e.jsx(s,{type:"tip",title:"为什么需要专门的性能调优？",children:"TiDB 作为分布式数据库，性能瓶颈可能出现在多个层面：SQL 层（执行计划不佳）、存储层（Region 分布不均）、网络层（跨节点通信开销）、调度层（PD 调度不及时）。单机 MySQL 的优化经验不能完全套用，需要理解分布式特性才能精准定位问题。"}),e.jsx("h2",{id:"execution-plan",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、执行计划分析"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"EXPLAIN"})," 是性能优化的第一步，通过查看执行计划可以了解 TiDB 如何选择索引、是否下推计算、是否使用并行执行等关键信息。"]}),e.jsx(t,{code:`# 基础执行计划
EXPLAIN SELECT * FROM orders WHERE user_id = 1001 AND status = 'paid';

# 详细执行计划（包含实际执行统计）
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 1001 AND status = 'paid';

# 查看分布式执行计划
EXPLAIN FORMAT = 'brief' SELECT * FROM orders WHERE user_id = 1001;`,language:"sql",highlights:[2,5,8],filename:"execution_plan_analysis.sql",description:"执行计划分析示例"}),e.jsx(s,{type:"warning",title:"执行计划陷阱",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"estRows 不准确"}),"：统计信息过时会导致预估行数偏差，影响优化器决策。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"算子未下推"}),"：Selection、Aggregation 等算子在 root 层执行会增加网络传输开销。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"全表扫描"}),"：TableScan 表示未使用索引，应检查索引设计或查询条件。"]})]})}),e.jsx("h2",{id:"index-optimization",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、索引优化策略"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"TiDB 支持 B+Tree 索引、前缀索引、联合索引等，索引设计与 MySQL 类似，但在分布式环境下需要考虑数据分布和 Region 分裂的影响。"}),e.jsx(t,{code:`# 创建联合索引（最左前缀原则）
CREATE INDEX idx_user_status ON orders (user_id, status, created_at);

# 创建前缀索引（适用于长字符串）
CREATE INDEX idx_email_prefix ON users (email(20));

# 查看索引使用情况
SHOW INDEX FROM orders;

# 删除无效索引
DROP INDEX idx_unused ON orders;

# 强制使用索引（不推荐，仅用于测试）
SELECT * FROM orders FORCE INDEX (idx_user_status) WHERE user_id = 1001;

# 覆盖索引优化（避免回表）
SELECT user_id, status FROM orders WHERE user_id = 1001;
-- 如果 idx_user_status 包含 user_id 和 status，则无需回表`,language:"sql",highlights:[2,5,8,11,14,17],filename:"index_optimization.sql",description:"索引优化示例"}),e.jsx(r,{label:"分布式索引特点",children:"TiDB 的索引也是分布式存储的，每个索引分区对应一个或多个 Region。联合索引的设计不仅要考虑查询模式，还要考虑数据热点：如果索引列的值分布不均（如时间戳），可能导致某些 Region 过大，触发频繁分裂。建议使用分散性好的列作为索引前缀。"}),e.jsx("h2",{id:"statistics",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、统计信息管理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"统计信息是优化器生成执行计划的依据，包括表的行数、列的distinct值、直方图等。统计信息不准确会导致优化器选择次优计划。"}),e.jsx(t,{code:`# 手动更新统计信息
ANALYZE TABLE orders;
ANALYZE TABLE orders INDEX idx_user_status;

# 查看统计信息健康度
SHOW STATS_HEALTHY WHERE db_name = 'test' AND table_name = 'orders';

# 查看统计信息详情
SHOW STATS_META WHERE db_name = 'test' AND table_name = 'orders';
SHOW STATS_BUCKETS WHERE db_name = 'test' AND table_name = 'orders';

# 调整自动收集策略
SET GLOBAL tidb_auto_analyze_ratio = 0.5; -- 默认 0.5（变化超过 50% 时自动分析）
SET GLOBAL tidb_auto_analyze_start_time = '00:00 +0000';
SET GLOBAL tidb_auto_analyze_end_time = '23:59 +0000';

# 禁用自动分析（大数据量时避免性能抖动）
SET GLOBAL tidb_enable_auto_analyze = OFF;`,language:"sql",highlights:[2,3,6,9,10,13,14,17],filename:"statistics_management.sql",description:"统计信息管理"}),e.jsx(s,{type:"tip",title:"统计信息最佳实践",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"定期 ANALYZE"}),"：数据大量变更后（INSERT/UPDATE/DELETE 超过 50%）立即执行 ANALYZE TABLE。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"避开高峰期"}),"：ANALYZE 会消耗 CPU 和 I/O，建议在低峰期执行。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"监控健康度"}),"：通过 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"SHOW STATS_HEALTHY"})," 定期检查，健康度低于 80% 时手动分析。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"采样率调整"}),"：大表可使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"ANALYZE TABLE orders WITH 0.1 SAMPLERATE;"})," 降低采样率，加快分析速度。"]})]})}),e.jsx("h2",{id:"region-split",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、Region 分裂与调度"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Region 是 TiDB 数据分片的基本单位，默认大小为 96MB。Region 分裂和调度直接影响查询性能：热点 Region 会导致单节点负载过高，分布不均会影响并行查询效率。"}),e.jsx(l,{title:"Region 分裂机制",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
分裂触发条件：
1. Region 大小超过阈值（默认 96MB）
2. Region 行数过多（默认 100 万行）
3. 手动触发 split region

分裂流程：
┌────────────────────────────────────┐
│ 1. PD 检测到 Region 过大           │
│ 2. 选择分裂点（通常为中点）         │
│ 3. 创建两个新 Region                │
│ 4. 迁移数据到新 Region              │
│ 5. 更新元数据，删除旧 Region        │
└────────────────────────────────────┘

热点问题：
- 自增主键导致写入集中到最后一个 Region
- 时间戳索引导致近期数据集中在少数 Region
- 解决方案：使用 SHARD_ROW_ID_BITS 打散数据
            `})}),e.jsx(t,{code:`# 查看 Region 分布
SELECT 
    table_name,
    COUNT(*) as region_count,
    SUM(approx_size) / 1024 / 1024 as total_size_mb,
    AVG(approx_size) / 1024 / 1024 as avg_region_size_mb
FROM information_schema.tikv_region_status
WHERE db_name = 'test'
GROUP BY table_name
ORDER BY total_size_mb DESC;

# 查找热点 Region
SELECT * FROM information_schema.tikv_hot_regions LIMIT 10;

# 手动分裂 Region（谨慎使用）
SPLIT TABLE orders BETWEEN (0) AND (1000000) REGIONS 16;

# 打散数据避免热点（建表时指定）
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT,
    user_id BIGINT,
    amount DECIMAL(10,2),
    PRIMARY KEY (id)
) SHARD_ROW_ID_BITS = 4 PRE_SPLIT_REGIONS = 4;
-- SHARD_ROW_ID_BITS: 将 row_id 打散到 2^4=16 个区域
-- PRE_SPLIT_REGIONS: 预分裂为 2^4=16 个 Region`,language:"sql",highlights:[2,12,15,18,25],filename:"region_management.sql",description:"Region 管理示例"}),e.jsxs(r,{label:"SHARD_ROW_ID_BITS 原理",children:["默认情况下，TiDB 的聚簇索引按主键顺序存储，自增主键会导致写入集中到最后一个 Region。通过 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"SHARD_ROW_ID_BITS"}),"，TiDB 会在 row_id 中加入随机位，将数据打散到多个 Region，避免写入热点。但代价是范围查询性能下降（数据不连续）。"]}),e.jsx("h2",{id:"pd-scheduling",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、PD 调度优化"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"PD 负责 Region 的负载均衡和故障恢复。合理的调度策略可以避免热点、提升资源利用率。PD 提供多种调度器，可根据场景启用或禁用。"}),e.jsx(t,{code:`# 查看当前启用的调度器
pd-ctl scheduler show

# 查看调度器配置
pd-ctl config show

# 启用/禁用调度器
pd-ctl scheduler add balance-leader-scheduler
pd-ctl scheduler remove balance-region-scheduler

# 调整调度参数
pd-ctl config set leader-schedule-limit 4
pd-ctl config set region-schedule-limit 2048
pd-ctl config set replica-schedule-limit 64

# 查看调度操作历史
pd-ctl operator show

# 手动触发平衡
pd-ctl scheduler add balance-leader-scheduler
pd-ctl scheduler add balance-region-scheduler

# 监控调度效果
pd-ctl store | grep "leader_count|region_count"`,language:"bash",highlights:[2,5,8,9,12,13,14,17,20,21,24],filename:"pd_scheduling.sh",description:"PD 调度优化"}),e.jsx(s,{type:"info",title:"常用调度器说明",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"balance-leader-scheduler"}),"：平衡 Leader 分布，避免单节点负载过高。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"balance-region-scheduler"}),"：平衡 Region 副本分布，保证存储均衡。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"balance-hot-region-scheduler"}),"：检测并迁移热点 Region（默认启用）。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"label-scheduler"}),"：根据节点标签（如 SSD/HDD）调度 Region。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"evict-leader-scheduler"}),"：驱逐指定 Store 上的 Leader（维护时使用）。"]})]})}),e.jsx("h2",{id:"tiflash-acceleration",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、TiFlash 加速技巧"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"TiFlash 通过列式存储和 MPP 并行执行加速 OLAP 查询。合理使用 TiFlash 可将复杂分析查询性能提升 10-100 倍。"}),e.jsx(t,{code:`# 为表添加 TiFlash 副本
ALTER TABLE orders SET TIFLASH REPLICA 2;

# 强制使用 TiFlash 执行查询
SELECT /*+ READ_FROM_STORAGE(TIFLASH[orders]) */ 
    DATE(created_at) as order_date,
    COUNT(*) as order_count,
    SUM(amount) as total_revenue
FROM orders
GROUP BY DATE(created_at);

# 启用 MPP 并行执行
SET tidb_allow_mpp = ON;
SET tidb_enforce_mpp = ON; -- 强制使用 MPP（失败则报错）

# 查看 MPP 执行计划
EXPLAIN SELECT /*+ READ_FROM_STORAGE(TIFLASH[orders]) */ 
    COUNT(*) FROM orders;
-- 输出中应包含 "MppMode: MPP" 和 "ExchangeSender/ExchangeReceiver"

# 监控 TiFlash 同步进度
SELECT 
    table_name,
    replica_count,
    available,
    progress
FROM information_schema.tiflash_replica
WHERE progress {'<'} 1.0;

# 调整 TiFlash 查询并发度
SET GLOBAL tiflash_quota_max_cpu = 16; -- 限制 CPU 使用`,language:"sql",highlights:[2,5,13,14,17,22,29],filename:"tiflash_acceleration.sql",description:"TiFlash 加速技巧"}),e.jsx(r,{label:"MPP 适用场景",children:"MPP（Massively Parallel Processing）适合大表聚合、多表 JOIN、窗口函数等 OLAP 场景。对于小表查询或点查，MPP 的初始化开销可能超过收益，此时应使用 TiKV。TiDB 优化器会自动判断是否使用 MPP，也可通过 Hint 强制指定。"}),e.jsx("h2",{id:"resource-control",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、资源控制与隔离"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"TiDB 6.0+ 引入 Resource Control 功能，通过 Resource Group 实现多租户资源隔离，避免 OLAP 查询占用过多资源影响 OLTP 业务。"}),e.jsx(t,{code:`# 创建资源组
CREATE RESOURCE GROUP oltp_group RU_PER_SECOND = 10000 PRIORITY = HIGH;
CREATE RESOURCE GROUP olap_group RU_PER_SECOND = 5000 PRIORITY = LOW;

# 为用户绑定资源组
ALTER USER 'oltp_user'@'%' RESOURCE GROUP oltp_group;
ALTER USER 'olap_user'@'%' RESOURCE GROUP olap_group;

# 会话级切换资源组
SET RESOURCE GROUP olap_group;
SELECT COUNT(*) FROM large_table; -- 使用 olap_group 的资源配额

# 查看资源组使用情况
SELECT * FROM information_schema.resource_groups;
SELECT * FROM information_schema.resource_usage_summary;

# 调整资源组配额
ALTER RESOURCE GROUP oltp_group RU_PER_SECOND = 20000;
ALTER RESOURCE GROUP olap_group PRIORITY = MEDIUM;

# 监控资源消耗
SELECT 
    resource_group_name,
    SUM(read_ru) as total_read_ru,
    SUM(write_ru) as total_write_ru
FROM information_schema.resource_usage_summary
GROUP BY resource_group_name;`,language:"sql",highlights:[2,3,6,7,10,14,15,18,19,22],filename:"resource_control.sql",description:"资源控制与隔离"}),e.jsx(s,{type:"tip",title:"Resource Control 最佳实践",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"OLTP 高优先级"}),"：事务型业务设置 PRIORITY = HIGH，保证低延迟。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"OLAP 限流"}),"：分析型业务设置 RU_PER_SECOND 上限，避免资源耗尽。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"动态调整"}),"：根据业务峰谷时段动态调整配额（如夜间提高 OLAP 配额）。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"监控告警"}),"：监控各资源组的 RU 使用率，设置告警阈值（如使用率 ",">"," 80%）。"]})]})}),e.jsx("h2",{id:"slow-query",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、慢查询诊断"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"TiDB 内置慢查询日志，记录执行时间超过阈值的 SQL。通过分析慢查询可以快速定位性能瓶颈。"}),e.jsx(t,{code:`# 查看慢查询阈值
SHOW VARIABLES LIKE 'tidb_slow_log_threshold'; -- 默认 300ms

# 调整慢查询阈值
SET GLOBAL tidb_slow_log_threshold = 100; -- 100ms

# 查询慢查询日志
SELECT * FROM information_schema.slow_query 
WHERE time > NOW() - INTERVAL 1 HOUR
ORDER BY query_time DESC 
LIMIT 10;

# 分析慢查询详情
SELECT 
    digest_text,
    COUNT(*) as exec_count,
    AVG(query_time) as avg_time,
    MAX(query_time) as max_time,
    SUM(total_keys) as total_keys_scanned
FROM information_schema.slow_query
WHERE time > NOW() - INTERVAL 1 DAY
GROUP BY digest_text
ORDER BY avg_time DESC
LIMIT 20;

# 开启全量日志（调试用，生产环境慎用）
SET GLOBAL tidb_enable_collect_execution_info = ON;
SET GLOBAL tidb_record_plan_in_slow_log = ON;

# 导出慢查询日志
tiup cluster display tidb-cluster # 找到 TiDB 节点
# 日志路径：/tidb-deploy/tidb-4000/log/tidb_slow_query.log`,language:"sql",highlights:[2,5,8,14,24,27,28],filename:"slow_query_diagnosis.sql",description:"慢查询诊断"}),e.jsx(l,{title:"慢查询分析流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
慢查询诊断步骤：

1. 定位慢查询
   └─ 查询 information_schema.slow_query

2. 分析执行计划
   └─ EXPLAIN ANALYZE <slow_sql>

3. 检查统计信息
   └─ SHOW STATS_HEALTHY

4. 验证索引使用
   └─ 查看执行计划中的 access object

5. 检查资源竞争
   └─ 查看 CPU、I/O、网络监控

6. 优化方案
   ├─ 添加/调整索引
   ├─ 重写 SQL（避免子查询、减少 JOIN）
   ├─ 更新统计信息（ANALYZE TABLE）
   ├─ 使用 TiFlash 加速（OLAP 场景）
   └─ 调整资源配置（Resource Group）
            `})}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、常见误区"}),e.jsxs(s,{type:"danger",title:"误区 1：TiDB 不需要索引",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：分布式数据库自动优化，索引不重要。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：TiDB 同样依赖索引加速查询。缺少索引会导致全表扫描，在分布式环境下代价更高（跨节点传输大量数据）。索引设计原则与 MySQL 类似：最左前缀、覆盖索引、避免索引失效。"]})]}),e.jsxs(s,{type:"danger",title:"误区 2：统计信息会自动更新，无需关心",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：TiDB 自动收集统计信息，不需要手动干预。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：虽然 TiDB 有自动分析功能，但在数据大量变更后（如批量导入），自动分析可能滞后，导致执行计划不佳。建议定期执行 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"ANALYZE TABLE"}),"，特别是核心业务表。"]})]}),e.jsxs(s,{type:"danger",title:"误区 3：Region 越多越好",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：Region 数量多意味着并行度高，性能好。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：Region 过多会增加 PD 调度开销和元数据管理成本。单个 Region 建议保持在 50-100MB，过小（","<","10MB）会导致 Region 数量爆炸，过大（",">","200MB）会影响分裂和迁移效率。让 PD 自动管理即可，避免手动分裂。"]})]}),e.jsxs(s,{type:"warning",title:"误区 4：TiFlash 可以加速所有查询",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：启用 TiFlash 后所有查询都会变快。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：TiFlash 仅加速 OLAP 场景（聚合、JOIN、扫描大表）。对于点查（WHERE id = ?）、小表查询，TiKV 性能更好。TiFlash 还有数据同步延迟（毫秒级），刚写入的数据可能查不到。应根据查询类型智能路由。"]})]}),e.jsxs(s,{type:"warning",title:"误区 5：EXPLAIN 的结果就是最终执行计划",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：EXPLAIN 输出的执行计划一定会被执行。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：EXPLAIN 显示的是优化器生成的计划，但实际执行时可能因运行时信息（如缓存、并发度）而调整。使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"EXPLAIN ANALYZE"})," 可查看实际执行情况，包括实际行数、执行时间、算子耗时等，更准确。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、面试真题"}),e.jsx(c,{questions:[{question:"如何优化 TiDB 的慢查询？",answer:"优化步骤：① 通过 information_schema.slow_query 定位慢查询；② 使用 EXPLAIN ANALYZE 分析执行计划，检查是否有 TableScan、算子是否下推；③ 检查统计信息健康度（SHOW STATS_HEALTHY），必要时执行 ANALYZE TABLE；④ 验证索引使用，添加缺失索引或调整联合索引顺序；⑤ 对于 OLAP 查询，考虑使用 TiFlash 加速（ALTER TABLE SET TIFLASH REPLICA）；⑥ 检查是否有资源竞争，使用 Resource Group 隔离 OLTP/OLAP；⑦ 重写 SQL（避免子查询、减少 JOIN、使用覆盖索引）。"},{question:"TiDB 的统计信息有什么作用？如何管理？",answer:"统计信息用于优化器估算行数和选择执行计划，包括表的行数、列的 distinct 值、直方图等。管理方法：① 自动收集：tidb_auto_analyze_ratio 控制触发阈值（默认 50%）；② 手动更新：ANALYZE TABLE 立即更新统计信息；③ 监控健康度：SHOW STATS_HEALTHY 查看统计信息准确度；④ 调整采样率：大表使用 WITH 0.1 SAMPLERATE 加快分析；⑤ 避开高峰期：ANALYZE 消耗资源，建议在低峰期执行。统计信息不准确会导致优化器选择次优计划，如误判行数导致选择 HashJoin 而非 Nested Loop。"},{question:"什么是 Region 热点？如何解决？",answer:"Region 热点指某个 Region 的读写请求远高于其他 Region，导致单节点负载过高。常见原因：① 自增主键导致写入集中到最后一个 Region；② 时间戳索引使近期数据集中在少数 Region；③ 某条热门记录被频繁访问。解决方案：① 使用 SHARD_ROW_ID_BITS 打散数据（将 row_id 随机化）；② 使用 PRE_SPLIT_REGIONS 预分裂 Region；③ 应用层加盐（如在 user_id 前加哈希前缀）；④ PD 的 balance-hot-region-scheduler 自动迁移热点 Region；⑤ 使用 TiFlash 分担读压力。监控热点可通过 information_schema.tikv_hot_regions 查看。"},{question:"TiFlash 如何加速查询？什么场景适合使用？",answer:"TiFlash 通过列式存储和 MPP 并行执行加速 OLAP 查询。优势：① 列式存储：只读取需要的列，减少 I/O；② 向量化执行：SIMD 指令加速计算；③ MPP 并行：将查询任务分发到多个 TiFlash 节点并行处理；④ 数据压缩：列式数据压缩率高，节省存储。适用场景：大表聚合（COUNT/SUM/AVG）、多表 JOIN、窗口函数、实时报表。不适用场景：点查（WHERE id = ?）、小表查询、刚写入的数据（同步延迟）。通过 EXPLAIN 查看执行计划中是否使用 TiFlash，或使用 Hint 强制指定。"},{question:"TiDB 的资源控制（Resource Group）有什么作用？",answer:"Resource Group 实现多租户资源隔离，通过 RU（Request Unit）配额限制不同业务的资源使用。作用：① 防止 OLAP 查询占用过多资源影响 OLTP 业务；② 保证关键业务的高优先级；③ 实现细粒度的资源分配（CPU、I/O、内存）。使用方法：创建资源组（CREATE RESOURCE GROUP）并设置 RU_PER_SECOND 和 PRIORITY；将用户绑定到资源组（ALTER USER RESOURCE GROUP）；会话级切换（SET RESOURCE GROUP）。监控通过 information_schema.resource_usage_summary 查看各资源组的 RU 消耗。适用于混合负载场景（HTAP），保证业务稳定性。"},{question:"EXPLAIN 和 EXPLAIN ANALYZE 有什么区别？",answer:"EXPLAIN 显示优化器生成的执行计划（预估信息），包括算子类型、预估行数（estRows）、访问对象等，但不执行 SQL。EXPLAIN ANALYZE 实际执行 SQL 并返回真实统计信息，包括实际行数（actRows）、执行时间（execTime）、算子耗时、内存使用等。区别：① EXPLAIN 快速但不准确（基于统计信息估算）；② EXPLAIN ANALYZE 准确但有性能开销（实际执行）；③ EXPLAIN 适合开发阶段快速验证；④ EXPLAIN ANALYZE 适合生产环境排查慢查询。建议先用 EXPLAIN 看计划是否合理，再用 EXPLAIN ANALYZE 验证实际性能。"},{question:"TiDB 扩容后性能没有提升，可能的原因是什么？",answer:"可能原因：① Region 分布不均：新增节点未接收足够 Region，PD 调度滞后。解决：等待 PD 自动平衡或手动触发 balance-region-scheduler；② 热点未缓解：如果存在写入热点，扩容无法分散负载。解决：使用 SHARD_ROW_ID_BITS 打散数据；③ 查询未并行化：单条查询可能只在单个 TiKV 节点执行。解决：优化 SQL 使其能利用多节点（如大范围扫描、聚合查询）；④ 网络瓶颈：跨节点通信开销大。解决：检查网络带宽和延迟；⑤ 统计信息过时：优化器未感知新节点。解决：执行 ANALYZE TABLE 更新统计信息；⑥ TiDB Server 瓶颈：计算层未扩容。解决：同时扩展 TiDB Server 节点。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/tidb/tidb-architecture",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"TiDB 架构与存储引擎"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"理解分布式架构基础"})]}),e.jsxs("a",{href:"/docs/mysql/mysql-index-optimization",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-accent mb-1",children:"对比学习 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-accent",children:"MySQL 索引优化实战"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"传统数据库索引优化对比"})]}),e.jsxs("a",{href:"/docs/tidb/tidb-vs-mysql",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"深入学习 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"TiDB vs MySQL 选型指南"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"技术选型与迁移策略"})]}),e.jsxs("a",{href:"/docs/clickhouse/clickhouse-performance",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"相关技术 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"ClickHouse 性能优化"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"OLAP 数据库优化对比"})]})]}),e.jsx(s,{type:"info",title:"学习建议",children:"TiDB 性能调优是理论与实践结合的系统工程。建议按以下顺序深入：① 掌握 EXPLAIN 分析执行计划，识别性能瓶颈；② 学习索引设计原则，避免常见陷阱；③ 理解统计信息的作用，定期维护；④ 熟悉 Region 分裂和 PD 调度机制；⑤ 实践 TiFlash 加速 OLAP 查询；⑥ 使用 Resource Group 实现资源隔离；⑦ 通过慢查询日志持续监控和优化。性能调优没有银弹，需要根据具体场景灵活应用各种手段。"}),e.jsx(d,{...n(i.category,i.id)})]})}),e.jsx(a,{items:x})]})}export{b as default};
