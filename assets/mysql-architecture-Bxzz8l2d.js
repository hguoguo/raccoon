import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as d}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as n}from"./SideNote-BKvanovA.js";import{C as t,A as l,S as x}from"./ArticleNav-DhfiS38Y.js";import{D as s}from"./DiagramBlock-CLaKE9_7.js";import{I as a}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"architecture-overview",text:"一、MySQL 整体架构",level:2},{id:"connector",text:"二、连接器（Connector）",level:2},{id:"query-cache",text:"三、查询缓存（Query Cache）",level:2},{id:"analyzer",text:"四、分析器（Analyzer）",level:2},{id:"optimizer",text:"五、优化器（Optimizer）",level:2},{id:"executor",text:"六、执行器（Executor）",level:2},{id:"storage-engine",text:"七、存储引擎层",level:2},{id:"innodb-architecture",text:"八、InnoDB 存储引擎架构",level:2},{id:"buffer-pool",text:"九、Buffer Pool 缓冲池",level:2},{id:"log-system",text:"十、日志系统（三大日志）",level:2},{id:"mvcc",text:"十一、MVCC 多版本并发控制",level:2},{id:"myisam-vs-innodb",text:"十二、MyISAM vs InnoDB",level:2},{id:"misconceptions",text:"十三、常见误区",level:2},{id:"interview",text:"十四、面试真题",level:2},{id:"related",text:"十五、知识关联",level:2}];function E({meta:o}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(d,{meta:o,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["MySQL 采用",e.jsx("strong",{className:"text-accent",children:"分层架构设计"}),"，分为 Server 层（连接器、查询缓存、分析器、优化器、执行器）和存储引擎层（InnoDB、MyISAM 等）， 通过插件式存储引擎实现灵活的数据管理，InnoDB 作为默认引擎提供事务支持、行级锁和 MVCC 机制。"]})}),e.jsx(t,{type:"tip",title:"为什么理解架构很重要？",children:"掌握 MySQL 架构是性能优化的基础。每个组件都可能成为瓶颈：连接数过多导致内存耗尽、查询缓存命中率低反而降低性能、索引失效导致全表扫描、Buffer Pool 配置不当引发频繁磁盘 I/O。只有理解数据流转的完整路径，才能精准定位问题。"}),e.jsx("h2",{id:"architecture-overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、MySQL 整体架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["MySQL 采用经典的",e.jsx("strong",{children:"客户端-服务器架构"}),"，整体分为两层：Server 层负责 SQL 解析、优化和执行；存储引擎层负责数据的实际存取。"]}),e.jsx(s,{title:"MySQL 架构全景图",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌─────────────────────────────────────────────────┐
│              Client / Connector                  │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│              Server Layer                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │Connector │→│Query     │→│Analyzer      │  │
│  │          │  │Cache     │  │(Lexer/Parser)│  │
│  └──────────┘  └──────────┘  └──────┬───────┘  │
│                                     │           │
│                              ┌──────▼───────┐   │
│                              │Optimizer     │   │
│                              │(Execution    │   │
│                              │ Plan)        │   │
│                              └──────┬───────┘   │
│                                     │           │
│                              ┌──────▼───────┐   │
│                              │Executor      │   │
│                              └──────┬───────┘   │
└─────────────────────────────────────┼───────────┘
                                      │
┌─────────────────────────────────────▼───────────┐
│         Storage Engine Layer                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ InnoDB   │  │ MyISAM   │  │ Memory       │  │
│  │(Default) │  │          │  │(Heap)        │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
└─────────────────────────────────────────────────┘
            `})}),e.jsx(n,{label:"插件式架构",children:"MySQL 的存储引擎采用插件式设计，可以根据业务需求选择不同的引擎。InnoDB 自 MySQL 5.5 起成为默认引擎，之前是 MyISAM。这种设计让 MySQL 既能处理 OLTP 事务场景（InnoDB），也能应对 OLAP 分析场景（ColumnStore）。"}),e.jsx("h2",{id:"connector",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、连接器（Connector）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"连接器负责建立和管理客户端与 MySQL 服务器的连接，包括身份验证、权限检查和连接维护。"}),e.jsx(r,{code:`# 查看当前连接数
SHOW STATUS LIKE 'Threads_connected';

# 查看最大连接数配置
SHOW VARIABLES LIKE 'max_connections';

# 修改最大连接数（临时生效）
SET GLOBAL max_connections = 500;

# 查看每个用户的连接数
SELECT user, host, COUNT(*) as connections
FROM information_schema.processlist
GROUP BY user, host;

# 杀死空闲连接
KILL <connection_id>;`,language:"sql",highlights:[2,5,8,11,17],filename:"connection_management.sql",description:"连接管理常用命令"}),e.jsx(t,{type:"warning",title:"长连接 vs 短连接",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"长连接"}),"：减少握手开销，但占用服务器资源（每个连接约 256KB 内存）。适合高频访问场景。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"短连接"}),"：用完即断，节省资源但增加握手成本。适合低频访问场景。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"连接池"}),"：应用层维护连接池（如 HikariCP），复用连接，平衡性能和资源消耗。"]})]})}),e.jsx("h2",{id:"query-cache",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、查询缓存（Query Cache）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["查询缓存保存 SELECT 语句及其结果，当相同 SQL 再次执行时直接返回缓存结果。",e.jsx("strong",{className:"text-rose",children:"MySQL 8.0 已移除该功能"}),"，因为高并发下缓存失效频繁，反而降低性能。"]}),e.jsx(s,{title:"查询缓存工作流程（MySQL 5.7 及之前）",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
SQL 请求
   │
   ▼
┌──────────────┐     命中缓存      ┌──────────────┐
│ Query Cache  │────────────────▶│ 返回结果      │
│ 查找         │                  └──────────────┘
└──────┬───────┘
       │ 未命中
       ▼
┌──────────────┐
│ 执行查询      │
│ (后续流程)    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 写入缓存      │
└──────────────┘

⚠️ 任何表的更新都会使该表的所有缓存失效！
            `})}),e.jsx(n,{label:"为什么移除查询缓存？",children:"在高并发写场景下，任何 UPDATE/INSERT/DELETE 都会导致相关表的缓存全部失效，造成频繁的缓存失效和重建，反而增加了 CPU 开销。MySQL 8.0 推荐使用应用层缓存（如 Redis）替代。"}),e.jsx("h2",{id:"analyzer",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、分析器（Analyzer）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"分析器对 SQL 进行词法分析和语法分析，将 SQL 字符串转换为抽象语法树（AST）。"}),e.jsx(r,{code:`-- 词法分析：识别关键字、表名、字段名
SELECT id, name FROM users WHERE age > 18;
       ^^  ^^       ^^^^^      ^^^    ^^
       |   |        |          |      |
     字段 字段     表名      字段   值

-- 语法分析：构建 AST（抽象语法树）
--      SELECT
--      /  |  --    id  name FROM users
--                |
--             WHERE
--                |
--            age > 18

-- 查看 SQL 解析结果（使用 EXPLAIN）
EXPLAIN SELECT id, name FROM users WHERE age > 18;`,language:"sql",highlights:[2,19],filename:"sql_analysis.sql",description:"SQL 分析过程"}),e.jsxs(t,{type:"info",title:"常见语法错误",children:["如果 SQL 语法有误，分析器会立即报错，不会进入后续阶段。例如：",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"SELEC * FROM users"}),"（关键字拼写错误）会在分析阶段被拦截。"]}),e.jsx("h2",{id:"optimizer",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、优化器（Optimizer）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"优化器决定如何执行 SQL：选择哪个索引、是否使用临时表、JOIN 的顺序等。它基于统计信息（行数、索引分布）计算不同执行计划的成本，选择最优方案。"}),e.jsx(r,{code:`-- 查看优化器选择的执行计划
EXPLAIN SELECT u.name, o.order_no
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.age > 18 AND o.status = 'paid';

-- 输出示例：
-- +----+-------------+-------+------+---------------+---------+---------+-----------+------+-------------+
-- | id | select_type | table | type | possible_keys | key     | key_len | ref       | rows | Extra       |
-- +----+-------------+-------+------+---------------+---------+---------+-----------+------+-------------+
-- |  1 | SIMPLE      | u     | ALL  | idx_age       | NULL    | NULL    | NULL      | 1000 | Using where |
-- |  1 | SIMPLE      | o     | ref  | idx_user_id   | idx_... | 4       | test.u.id |   10 | Using where |
-- +----+-------------+-------+------+---------------+---------+---------+-----------+------+-------------+

-- 强制使用特定索引（不推荐，除非确认优化器选错）
SELECT u.name FROM users u FORCE INDEX (idx_age) WHERE u.age > 18;`,language:"sql",highlights:[2,18],filename:"optimizer_example.sql",description:"优化器执行计划"}),e.jsxs(n,{label:"优化器的局限性",children:["优化器基于统计信息做决策，如果统计信息过时（如大量数据变更后未执行 ANALYZE TABLE），可能选择次优计划。定期执行 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"ANALYZE TABLE"})," 可更新统计信息。"]}),e.jsx("h2",{id:"executor",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、执行器（Executor）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"执行器根据优化器生成的执行计划，调用存储引擎接口执行查询。执行前会检查用户对表的权限。"}),e.jsx(r,{code:`-- 查看用户权限
SHOW GRANTS FOR 'username'@'localhost';

-- 授予权限
GRANT SELECT, INSERT ON database.table TO 'username'@'localhost';

-- 撤销权限
REVOKE DELETE ON database.table FROM 'username'@'localhost';

-- 刷新权限（使修改立即生效）
FLUSH PRIVILEGES;

-- 执行器工作流程伪代码
/*
1. 检查用户对表的 SELECT 权限
2. 调用存储引擎接口读取第一行
3. 判断是否符合 WHERE 条件
   - 符合：加入结果集
   - 不符合：跳过
4. 重复步骤 2-3 直到遍历完所有行
5. 返回结果集给客户端
*/`,language:"sql",highlights:[2,5,8,11],filename:"executor_permissions.sql",description:"执行器权限检查"}),e.jsx("h2",{id:"storage-engine",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、存储引擎层"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"存储引擎负责数据的物理存储和检索。MySQL 支持多种存储引擎，每种引擎有不同的特性："}),e.jsx("div",{className:"overflow-x-auto my-5",children:e.jsxs("table",{className:"min-w-full border-collapse border border-border",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink",children:"InnoDB"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink",children:"MyISAM"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink",children:"Memory"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"事务支持"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:"✅ ACID"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"❌ 不支持"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"❌ 不支持"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"锁粒度"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:"行级锁"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"表级锁"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"表级锁"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"外键支持"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:"✅ 支持"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"❌ 不支持"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"❌ 不支持"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"崩溃恢复"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:"✅ Redo Log"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"❌ 不支持"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"❌ 数据丢失"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"存储位置"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:"磁盘"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:"磁盘"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:"内存"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"适用场景"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:"OLTP 通用"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"只读/读多写少"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"临时表/缓存"})]})]})]})}),e.jsx("h2",{id:"innodb-architecture",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、InnoDB 存储引擎架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["InnoDB 是 MySQL 的默认存储引擎，采用",e.jsx("strong",{children:"聚簇索引"}),"组织数据，提供事务、行锁、MVCC 和外键支持。其内部架构包含多个关键组件："]}),e.jsx(s,{title:"InnoDB 内部架构",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌──────────────────────────────────────────────────┐
│              InnoDB Storage Engine                │
│                                                    │
│  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ Buffer Pool  │  │ Change Buffer            │  │
│  │ (缓冲池)      │  │ (变更缓冲)                │  │
│  └──────┬───────┘  └──────────────────────────┘  │
│         │                                         │
│  ┌──────▼───────┐  ┌──────────────────────────┐  │
│  │ Adaptive     │  │ Insert Buffer            │  │
│  │ Hash Index   │  │                          │  │
│  └──────────────┘  └──────────────────────────┘  │
│                                                    │
│  ┌────────────────────────────────────────────┐  │
│  │              Log System                     │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐   │  │
│  │  │Redo Log  │ │Undo Log  │ │Binlog    │   │  │
│  │  │(重做日志) │ │(回滚日志) │ │(归档日志) │   │  │
│  │  └──────────┘ └──────────┘ └──────────┘   │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
│  ┌────────────────────────────────────────────┐  │
│  │           Data Files (.ibd)                 │  │
│  │  - Tablespaces (表空间)                     │  │
│  │  - Indexes (B+ Tree)                        │  │
│  │  - Data Pages (16KB per page)               │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
            `})}),e.jsx("h2",{id:"buffer-pool",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、Buffer Pool 缓冲池"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Buffer Pool 是 InnoDB 最重要的内存结构，用于缓存数据页和索引页。合理配置 Buffer Pool 可以显著减少磁盘 I/O，提升查询性能。"}),e.jsx(r,{code:`-- 查看 Buffer Pool 配置
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
SHOW VARIABLES LIKE 'innodb_buffer_pool_instances';

-- 查看 Buffer Pool 使用情况
SELECT 
    pool_id,
    page_size,
    pages_used,
    pages_free,
    relocation_time
FROM information_schema.INNODB_BUFFER_POOL_STATS;

-- 计算 Buffer Pool 命中率
SELECT 
    (1 - (SUM(IFNULL(INNODB_BUFFER_POOL_READS, 0)) / 
          SUM(IFNULL(INNODB_BUFFER_POOL_READ_REQUESTS, 1)))) * 100 AS hit_rate
FROM information_schema.GLOBAL_STATUS;

-- 调整 Buffer Pool 大小（建议设置为物理内存的 50%-70%）
SET GLOBAL innodb_buffer_pool_size = 4294967296; -- 4GB

-- 在线调整 Buffer Pool（MySQL 5.7+，无需重启）
SET GLOBAL innodb_buffer_pool_size = 8589934592; -- 8GB`,language:"sql",highlights:[2,3,6,15,23,26],filename:"buffer_pool_config.sql",description:"Buffer Pool 配置与监控"}),e.jsx(t,{type:"tip",title:"Buffer Pool 最佳实践",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"大小设置"}),"：专用数据库服务器设置为物理内存的 70%-80%；共享服务器设置为 50%-60%。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"实例数量"}),"：Buffer Pool > 1GB 时，设置 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"innodb_buffer_pool_instances"})," 为 8 或 16，减少锁竞争。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"预加载"}),"：启动时使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"innodb_buffer_pool_load_at_startup=ON"})," 从磁盘加载热点数据。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"命中率监控"}),"：保持 Buffer Pool 命中率 > 99%，低于 95% 说明需要扩容。"]})]})}),e.jsx("h2",{id:"log-system",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、日志系统（三大日志）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["InnoDB 通过三种日志保证事务的持久性和一致性：",e.jsx("strong",{children:"Redo Log"}),"（重做日志）、",e.jsx("strong",{children:"Undo Log"}),"（回滚日志）和 ",e.jsx("strong",{children:"Binlog"}),"（归档日志）。"]}),e.jsx(s,{title:"三大日志对比",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌─────────────┬──────────────┬──────────────┬──────────────┐
│             │  Redo Log    │  Undo Log    │  Binlog      │
├─────────────┼──────────────┼──────────────┼──────────────┤
│ 所属层       │ InnoDB 引擎  │ InnoDB 引擎  │ Server 层    │
│ 作用         │ 崩溃恢复     │ 事务回滚     │ 主从复制      │
│              │ (Crash-safe) │ + MVCC       │ + 数据恢复    │
│ 写入方式     │ 顺序写       │ 顺序写       │ 追加写        │
│ 内容         │ 物理日志     │ 逻辑日志     │ 逻辑日志      │
│              │ (数据页变化)  │ (反向操作)    │ (SQL 语句)    │
│ 循环写入     │ ✅ 固定大小  │ ❌ 自动扩展  │ ❌ 追加文件    │
│ 刷盘时机     │ 事务提交时   │ 事务执行时   │ 事务提交时    │
└─────────────┴──────────────┴──────────────┴──────────────┘

两阶段提交流程：
1. 执行器调用引擎接口更新数据
2. InnoDB 生成 Redo Log（prepare 状态）
3. 执行器生成 Binlog
4. InnoDB 将 Redo Log 改为 commit 状态
            `})}),e.jsx(r,{code:`-- 查看 Redo Log 配置
SHOW VARIABLES LIKE 'innodb_log_file_size';
SHOW VARIABLES LIKE 'innodb_log_files_in_group';

-- 查看 Binlog 配置
SHOW VARIABLES LIKE 'log_bin';
SHOW VARIABLES LIKE 'binlog_format';  -- ROW/STATEMENT/MIXED
SHOW VARIABLES LIKE 'expire_logs_days';

-- 查看当前 Binlog 文件
SHOW MASTER STATUS;

-- 查看 Binlog 事件
SHOW BINLOG EVENTS IN 'mysql-bin.000001' LIMIT 10;

-- 手动切换 Binlog 文件
FLUSH LOGS;

-- 清理过期 Binlog（谨慎操作！）
PURGE BINARY LOGS BEFORE '2024-01-01 00:00:00';`,language:"sql",highlights:[2,3,6,7,8,11,14,17,20],filename:"log_configuration.sql",description:"日志系统配置"}),e.jsx(n,{label:"WAL 技术",children:"Write-Ahead Logging（预写式日志）：先写日志再写磁盘。InnoDB 更新数据时，先写 Redo Log 并标记事务为 prepare 状态，再写 Binlog，最后将 Redo Log 改为 commit 状态。这样即使中途崩溃，重启后也能通过 Redo Log 恢复数据。"}),e.jsx("h2",{id:"mvcc",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、MVCC 多版本并发控制"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["MVCC（Multi-Version Concurrency Control）通过保存数据的多个版本，实现读写不阻塞，提高并发性能。InnoDB 在 ",e.jsx("strong",{children:"READ COMMITTED"})," 和 ",e.jsx("strong",{children:"REPEATABLE READ"})," 隔离级别下使用 MVCC。"]}),e.jsx(r,{code:`-- MVCC 核心字段（每行记录隐藏列）
-- DB_TRX_ID: 最近修改该行的事务 ID
-- DB_ROLL_PTR: 回滚指针，指向 Undo Log 中的历史版本
-- DB_ROW_ID: 隐藏的行 ID（如果没有主键）

-- 查看事务信息
SELECT * FROM information_schema.INNODB_TRX;

-- 查看锁信息
SELECT * FROM information_schema.INNODB_LOCKS;

-- 查看锁等待情况
SELECT * FROM information_schema.INNODB_LOCK_WAITS;

-- MVCC 工作流程示例
START TRANSACTION;
-- 事务 A 读取数据（快照读，不加锁）
SELECT * FROM users WHERE id = 1;  -- 读到版本 1

-- 事务 B 更新数据（当前读，加锁）
UPDATE users SET name = 'new_name' WHERE id = 1;
COMMIT;

-- 事务 A 再次读取（REPEATABLE READ 下仍读到版本 1）
SELECT * FROM users WHERE id = 1;  -- 仍读到版本 1（快照）

-- 事务 A 提交后再读（读到最新版本）
COMMIT;
SELECT * FROM users WHERE id = 1;  -- 读到版本 2`,language:"sql",highlights:[2,3,4,17,19,22,26,29,30],filename:"mvcc_example.sql",description:"MVCC 工作机制"}),e.jsx(s,{title:"MVCC ReadView 机制",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
ReadView 四个关键属性：
┌────────────────────────────────────────┐
│ m_ids:    活跃事务 ID 列表              │
│ min_trx_id: 最小活跃事务 ID             │
│ max_trx_id: 下一个要分配的事务 ID        │
│ creator_trx_id: 创建 ReadView 的事务 ID │
└────────────────────────────────────────┘

可见性判断规则：
1. 如果 DB_TRX_ID < min_trx_id → 可见（事务已提交）
2. 如果 DB_TRX_ID >= max_trx_id → 不可见（事务后启动）
3. 如果 DB_TRX_ID 在 m_ids 中 → 不可见（事务活跃）
4. 其他情况 → 可见（事务已提交）

RC 级别：每次 SELECT 都创建新 ReadView
RR 级别：第一次 SELECT 创建 ReadView，后续复用
            `})}),e.jsx("h2",{id:"myisam-vs-innodb",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十二、MyISAM vs InnoDB"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"虽然 InnoDB 已成为默认引擎，但了解 MyISAM 的特性有助于理解 MySQL 的演进历程和适用场景。"}),e.jsx(r,{code:`-- 查看表使用的存储引擎
SHOW TABLE STATUS LIKE 'users';

-- 转换存储引擎
ALTER TABLE users ENGINE=InnoDB;
ALTER TABLE users ENGINE=MyISAM;

-- 创建表时指定引擎
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;

-- MyISAM 表优化（仅适用于 MyISAM）
OPTIMIZE TABLE logs;  -- 整理碎片，回收空间

-- 查看引擎支持情况
SHOW ENGINES;`,language:"sql",highlights:[2,5,6,9,17,20],filename:"engine_comparison.sql",description:"存储引擎切换与对比"}),e.jsxs(t,{type:"warning",title:"何时考虑 MyISAM？",children:["在现代 MySQL 应用中，几乎",e.jsx("strong",{children:"不建议"}),"使用 MyISAM。仅在以下极端场景考虑：",e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsx("li",{children:"只读或读多写少的数据仓库场景（MyISAM 压缩率更高）"}),e.jsx("li",{children:"需要全文索引但无法升级到 MySQL 5.6+（早期 InnoDB 不支持全文索引）"}),e.jsx("li",{children:"嵌入式设备内存极其有限（MyISAM 内存占用略低）"})]}),"绝大多数场景应使用 InnoDB。"]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十三、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：查询缓存能提升性能",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：开启查询缓存可以加速重复查询。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：MySQL 8.0 已移除查询缓存。高并发写场景下，缓存失效频繁，反而增加 CPU 开销。现代应用应使用 Redis/Memcached 等外部缓存系统。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：Buffer Pool 越大越好",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：将 Buffer Pool 设置为接近物理内存大小。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：Buffer Pool 过大可能导致操作系统内存不足，触发 swap，反而降低性能。建议设置为物理内存的 50%-70%，预留内存给操作系统和其他进程。"]})]}),e.jsxs(t,{type:"danger",title:"误区 3：MVCC 完全无锁",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：MVCC 下所有读操作都不加锁。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：MVCC 仅对",e.jsx("strong",{children:"快照读"}),"（普通 SELECT）不加锁。",e.jsx("strong",{children:"当前读"}),"（SELECT ... FOR UPDATE、UPDATE、DELETE）仍需加锁。混淆两者会导致死锁问题。"]})]}),e.jsxs(t,{type:"warning",title:"误区 4：Redo Log 和 Binlog 功能重复",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：有了 Redo Log 就不需要 Binlog。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：Redo Log 是物理日志，用于崩溃恢复，属于 InnoDB 引擎层；Binlog 是逻辑日志，用于主从复制和数据恢复，属于 Server 层。两者职责不同，缺一不可。"]})]}),e.jsxs(t,{type:"warning",title:"误区 5：InnoDB 一定比 MyISAM 慢",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：InnoDB 因支持事务而性能较差。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：InnoDB 通过 Buffer Pool、自适应哈希索引等技术，在大多数 OLTP 场景下性能优于 MyISAM。只有在纯读场景且无并发需求时，MyISAM 才略有优势。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十四、面试真题"}),e.jsx(a,{questions:[{question:"MySQL 一条 SQL 的执行流程是什么？",answer:"① 连接器建立连接并验证权限；② 查询缓存查找（MySQL 8.0 已移除）；③ 分析器进行词法和语法分析；④ 优化器生成执行计划（选择索引、JOIN 顺序）；⑤ 执行器检查权限并调用存储引擎接口；⑥ 存储引擎（如 InnoDB）执行数据读写，通过 Buffer Pool 缓存数据页，使用 Redo Log 保证持久性。"},{question:"InnoDB 和 MyISAM 的主要区别是什么？",answer:"① 事务：InnoDB 支持 ACID，MyISAM 不支持；② 锁粒度：InnoDB 支持行锁，MyISAM 只支持表锁；③ 外键：InnoDB 支持，MyISAM 不支持；④ 崩溃恢复：InnoDB 通过 Redo Log 恢复，MyISAM 不支持；⑤ 索引结构：InnoDB 使用聚簇索引，MyISAM 使用非聚簇索引；⑥ COUNT 性能：MyISAM 保存了总行数，COUNT(*) 更快。"},{question:"什么是 MVCC？它是如何实现的？",answer:"MVCC（多版本并发控制）通过保存数据的多个版本实现读写不阻塞。InnoDB 每行记录包含隐藏列：DB_TRX_ID（最近修改的事务 ID）、DB_ROLL_PTR（回滚指针指向 Undo Log）。读取时通过 ReadView 判断版本可见性：比较事务 ID 与活跃事务列表，决定返回哪个版本。RC 级别每次 SELECT 创建新 ReadView，RR 级别复用首次创建的 ReadView。"},{question:"Redo Log 和 Binlog 的区别是什么？",answer:"① 所属层：Redo Log 属于 InnoDB 引擎层，Binlog 属于 Server 层；② 内容：Redo Log 是物理日志（记录数据页变化），Binlog 是逻辑日志（记录 SQL 语句或行变化）；③ 用途：Redo Log 用于崩溃恢复（Crash-safe），Binlog 用于主从复制和数据恢复；④ 写入方式：Redo Log 循环写入固定大小文件，Binlog 追加写入新文件；⑤ 刷盘时机：Redo Log 在事务 prepare 时写入，Binlog 在事务提交前写入。"},{question:"Buffer Pool 的作用是什么？如何优化配置？",answer:"Buffer Pool 缓存数据页和索引页，减少磁盘 I/O。优化策略：① 大小设置为物理内存的 50%-70%；② Buffer Pool > 1GB 时设置 innodb_buffer_pool_instances 为 8 或 16，减少锁竞争；③ 启用 innodb_buffer_pool_load_at_startup 预加载热点数据；④ 监控命中率，保持 > 99%；⑤ 大表访问模式稳定时，可手动预热 Buffer Pool。"},{question:"什么是两阶段提交？为什么需要它？",answer:"两阶段提交保证 Redo Log 和 Binlog 的逻辑一致性。阶段 1（Prepare）：InnoDB 将 Redo Log 置为 prepare 状态；阶段 2（Commit）：执行器写入 Binlog 后，InnoDB 将 Redo Log 改为 commit 状态。如果崩溃发生在 prepare 后、commit 前，重启时 InnoDB 检查 Binlog 是否完整：完整则提交事务，不完整则回滚。这确保了主从复制和数据恢复的一致性。"},{question:"如何排查 MySQL 连接数过多的问题？",answer:"① 查看当前连接数：SHOW STATUS LIKE 'Threads_connected'；② 查看最大连接数：SHOW VARIABLES LIKE 'max_connections'；③ 分析连接来源：SELECT user, host, COUNT(*) FROM information_schema.processlist GROUP BY user, host；④ 检查应用层是否正确使用连接池（HikariCP、Druid）；⑤ 调整 max_connections（需评估服务器内存，每连接约 256KB）；⑥ 设置 wait_timeout 和 interactive_timeout 自动断开空闲连接。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十五、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/mysql/mysql-index-optimization",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"SQL 优化基础"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"索引原理、执行计划分析"})]}),e.jsxs("a",{href:"/docs/mysql/mysql-index-optimization",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-accent mb-1",children:"深入学习 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-accent",children:"MySQL 索引优化实战"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"B+树、覆盖索引、最左前缀"})]}),e.jsxs("a",{href:"/docs/mysql/mysql-transaction-lock",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"高级主题 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"MySQL 事务与锁机制"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"ACID、隔离级别、间隙锁、死锁"})]}),e.jsxs("a",{href:"/docs/postgresql/postgresql-core",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"对比学习 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"PostgreSQL 核心原理"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"MVCC 实现差异、WAL 机制"})]})]}),e.jsx(t,{type:"info",title:"学习建议",children:"MySQL 架构是性能优化的理论基础。建议按以下顺序深入：① 理解 SQL 执行流程（连接器 → 分析器 → 优化器 → 执行器）；② 掌握 InnoDB 核心组件（Buffer Pool、Redo Log、Undo Log）；③ 理解 MVCC 和事务隔离级别；④ 结合 EXPLAIN 分析实际查询的执行计划；⑤ 通过慢查询日志定位性能瓶颈。理论结合实践才能真正掌握。"}),e.jsx(l,{...i(o.category,o.id)})]})}),e.jsx(x,{items:m})]})}export{E as default};
