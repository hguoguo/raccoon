import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as l}from"./KnowledgeLayout-CwkOMHwC.js";import{C as r,A as o,S as c}from"./ArticleNav-DhfiS38Y.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as a}from"./SideNote-BKvanovA.js";import{C as x}from"./ContextSwitcher-Cjd-h5IL.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";import{D as i}from"./DiagramBlock-CLaKE9_7.js";const p=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"mvcc",text:"多版本并发控制(MVCC)",level:3},{id:"wal",text:"预写日志(WAL)机制",level:3},{id:"vacuum",text:"VACUUM机制",level:3},{id:"toast",text:"TOAST存储机制",level:3},{id:"source-code",text:"源码分析",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比其他数据库",level:2},{id:"related",text:"知识关联",level:2}];function S({meta:t}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(l,{meta:t,children:[e.jsxs("div",{className:"mb-8 pb-6 border-b border-border-light",children:[e.jsx("h1",{className:"font-display font-bold text-3xl sm:text-4xl mb-3 text-ink",children:t.title}),e.jsxs("div",{className:"flex flex-wrap gap-2 items-center text-sm text-ink-muted",children:[e.jsx("span",{className:"px-2 py-1 bg-accent-soft text-accent rounded-md font-medium",children:t.level}),e.jsx("span",{children:"难度 ⭐⭐⭐⭐"}),e.jsxs("span",{children:["预计阅读 ",t.readingTime," 分钟"]})]}),e.jsx("div",{className:"mt-3 flex flex-wrap gap-2",children:t.tags.map(d=>e.jsx("span",{className:"px-2.5 py-0.5 bg-parchment-deep text-ink-muted rounded-full text-xs",children:d},d))})]}),e.jsxs("section",{id:"definition",className:"mb-8",children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"pl-4 border-l-4 border-accent bg-accent-soft/40 py-3 pr-4 rounded-r-paper-md italic text-ink-light",children:"PostgreSQL 是一个功能强大、高度可扩展的企业级开源对象-关系型数据库管理系统，以其先进的多版本并发控制(MVCC)、预写日志(WAL)、VACUUM机制和TOAST存储等核心原理，实现了高并发、高可用和数据一致性。"}),e.jsx(a,{label:"为什么叫 PostgreSQL？",children:"PostgreSQL 起源于 1986 年的 POSTGRES 项目，由 UC Berkeley 的 Michael Stonebraker 教授领导开发。最初称为 POSTGRES，以支持扩展数据类型为目标。后来在增加了对 SQL 查询语言的支持后，于 1996 年更名为 PostgreSQL，以反映其对 SQL 的支持。"})]}),e.jsxs("section",{id:"overview",className:"mb-8",children:[e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"整体架构"}),e.jsx(i,{title:"PostgreSQL 整体架构",children:`graph TD
                CLIENT["Client Applications<br/>psql, JDBC, ODBC"] --> FRONTEND["Frontend Process<br/>postgres process"]
                FRONTEND --> BACKEND["Backend Process<br/>per connection"]
                BACKEND --> SHARED["Shared Components"]
                SHARED --> WAL["WAL Buffer"]
                SHARED --> BUFFER["Shared Buffer Pool"]
                SHARED --> BGWRITER["Background Writer"]
                SHARED --> CHECKPOINTER["Checkpointer"]
                SHARED --> STATS["Statistics Collector"]
                BACKEND --> STORAGE["Storage System<br/>Tables, Indexes, TOAST"]
                BACKEND --> TRANSACTION["Transaction Manager<br/>MVCC, Locks, 2PC"]
                BACKEND --> RECOVERY["Recovery Manager<br/>Crash Recovery"]
              `}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"PostgreSQL 的核心架构包含以下关键组件："}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"进程模型"}),"：每个客户端连接创建一个独立的 Backend 进程"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"共享内存"}),"：Buffer Pool、WAL Buffer、锁管理器等共享组件"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"后台进程"}),"：WAL Writer、BGWriter、Checkpointer、Autovacuum 等"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"存储系统"}),"：表、索引、TOAST 表等物理存储结构"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"事务管理"}),"：MVCC、锁定机制、两阶段提交"]})]})]}),e.jsxs("section",{id:"core",className:"mb-8",children:[e.jsx("h2",{id:"core",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"核心原理"}),e.jsx("h3",{id:"mvcc",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"多版本并发控制(MVCC)"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"PostgreSQL 使用 MVCC 实现高并发下的数据一致性，允许读写操作不相互阻塞："}),e.jsx(x,{simpleContent:e.jsxs("div",{children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:[e.jsx("strong",{children:"MVCC 基本思想"}),"：为每一行数据保存多个版本，读操作访问过去某个时间点的数据版本，写操作创建新的数据版本。"]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:[e.jsx("strong",{children:"关键字段"}),"：每行数据包含 xmin、xmax、cmin、cmax 等系统字段，用于判断数据版本的可见性。"]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsx("strong",{children:"优势"}),"：避免了读写冲突，提高了并发性能，实现了快照隔离（Snapshot Isolation）。"]})]}),hardcoreContent:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"MVCC 详细机制"}),e.jsx(s,{code:`-- MVCC 系统字段说明
xmin: 插入该行的事务ID
xmax: 删除该行的事务ID（若为0表示未被删除）
cmin: 插入该行的命令ID
cmax: 删除该行的命令ID

-- 可见性判断（简化版）
-- 假设当前事务ID为 cur_txid，快照中活跃事务ID范围为 snapshot_xmin ~ snapshot_xmax
bool HeapTupleSatisfiesVisibility(HeapTuple tuple, Snapshot snapshot) {
    if (tuple->t_xmin >= snapshot->xmax) {
        // 未来事务插入的行，不可见
        return false;
    }
    
    if (TransactionIdIsNormal(tuple->t_xmin) &&
        (tuple->t_xmin < snapshot->xmin) &&
        !TransactionIdDidCommit(tuple->t_xmin)) {
        // 插入行的事务未提交，不可见
        return false;
    }
    
    if (tuple->t_xmax != InvalidTransactionId) {
        if (tuple->t_xmax >= snapshot->xmax) {
            // 被未来事务删除，可见
            return true;
        }
        
        if (TransactionIdIsNormal(tuple->t_xmax) &&
            (tuple->t_xmax < snapshot->xmin) &&
            TransactionIdDidCommit(tuple->t_xmax)) {
            // 被已提交的事务删除，不可见
            return false;
        }
    }
    
    return true;  // 行可见
}`,language:"c",description:"MVCC 通过系统字段判断数据版本的可见性"})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"MVCC 与传统锁定的区别"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:[e.jsx("strong",{children:"传统锁定"}),"：读写互相阻塞，需要等待锁释放。"]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsx("strong",{children:"MVCC"}),"：读操作不需要锁，写操作只锁定少量行，大大减少了锁竞争。"]}),e.jsx(i,{title:"MVCC vs 传统锁定",children:`graph LR
                        A["传统锁定"] --> B["读操作: SELECT * FROM accounts WHERE id = 1;"]
                        A --> C["写操作: UPDATE accounts SET balance = balance + 100 WHERE id = 1;"]
                        B --> D["读等待写完成"]
                        C --> E["写等待读完成"]
                        
                        F["MVCC"] --> G["读操作: SELECT * FROM accounts WHERE id = 1;"]
                        F --> H["写操作: UPDATE accounts SET balance = balance + 100 WHERE id = 1;"]
                        G --> I["读取行的旧版本"]
                        H --> J["创建行的新版本"]
                        I --> K["读写并行执行"]
                        J --> K
                      `})]})]})}),e.jsx("h3",{id:"wal",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"预写日志(WAL)机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"WAL（Write-Ahead Logging）是 PostgreSQL 实现事务持久性和崩溃恢复的核心机制，确保数据修改前先记录日志："}),e.jsx(s,{code:`-- WAL 基本原理
1. 所有数据修改操作都必须先记录 WAL 日志
2. WAL 日志写入磁盘后，数据页才能被修改
3. 系统崩溃时，通过 WAL 日志恢复未完成的事务

-- WAL 相关参数
wal_level = replica          # 控制WAL记录的详细程度
wal_buffers = 16MB           # WAL 缓冲区大小
checkpoint_timeout = 5min    # 检查点间隔
max_wal_size = 1GB           # 最大 WAL 文件大小
min_wal_size = 80MB          # 最小 WAL 文件大小

-- 查看 WAL 相关统计
SELECT 
    pg_current_wal_lsn(),           -- 当前 WAL 位置
    pg_walfile_name(pg_current_wal_lsn()),  -- 当前 WAL 文件名
    count(*) as wal_files_count     -- WAL 文件数量
FROM pg_ls_waldir();`,language:"sql",description:"WAL 机制确保数据持久性和崩溃恢复能力"}),e.jsx("h3",{id:"vacuum",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"VACUUM机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"VACUUM 是 PostgreSQL 清理死元组、回收存储空间的重要机制，防止数据膨胀："}),e.jsx(s,{code:`-- VACUUM 基本操作
VACUUM table_name;              -- 回收死元组空间，更新统计信息
VACUUM FULL table_name;         -- 完全重建表，回收最大空间（排他锁）
VACUUM ANALYZE table_name;      -- VACUUM + 更新统计信息
VACUUM (FREEZE, VERBOSE) table_name;  -- 冻结旧元组，详细输出

-- 自动清理相关参数
autovacuum = on                 -- 启用自动清理
autovacuum_naptime = 1min       -- 自动清理检查间隔
autovacuum_vacuum_threshold = 50 -- 触发VACUUM的死元组阈值
autovacuum_analyze_threshold = 50 -- 触发ANALYZE的插入/更新阈值
autovacuum_vacuum_scale_factor = 0.2 -- VACUUM阈值比例因子

-- 检查表的膨胀情况
SELECT schemaname, tablename,
       pg_size_pretty(pg_table_size(relid)) AS table_size,
       n_dead_tup AS dead_tuples,
       COALESCE(
           ROUND((n_dead_tup::float/(n_tup_ins+n_tup_upd)*100)::numeric, 2),
           0
       ) AS dead_tuple_percent
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000;`,language:"sql",description:"VACUUM 机制清理死元组，防止表膨胀"}),e.jsx("h3",{id:"toast",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"TOAST存储机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"TOAST（The Oversized-Attribute Storage Technique）用于存储超长字段，解决单行数据超过页面限制的问题："}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-6",children:[e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-white shadow-sm",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"TOAST 策略"}),e.jsxs("ul",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-1",children:[e.jsx("li",{children:"• PLAIN：不压缩、不进行外部存储（固定长度类型）"}),e.jsx("li",{children:"• EXTENDED：压缩后再进行外部存储（默认策略）"}),e.jsx("li",{children:"• EXTERNAL：不压缩，只进行外部存储（大文本）"}),e.jsx("li",{children:"• MAIN：先压缩，不行再外部存储"})]})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-white shadow-sm",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"TOAST 参数"}),e.jsxs("ul",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-1",children:[e.jsx("li",{children:"• TOAST_TUPLE_THRESHOLD：2KB（超过此值考虑TOAST）"}),e.jsx("li",{children:"• TOAST_TUPLE_TARGET：1KB（压缩后目标大小）"}),e.jsx("li",{children:"• Page Size：通常8KB"}),e.jsx("li",{children:"• 有效行大小：约8KB-200B"})]})]})]}),e.jsx(s,{code:`-- 查看表的TOAST信息
SELECT 
    t.tablename,
    t.hasoids,
    info.spcname AS tablespace,
    toast.spcname AS toast_tablespace
FROM pg_tables t
LEFT JOIN pg_class c ON c.relname = t.tablename
LEFT JOIN pg_tablespace info ON info.oid = c.reltablespace
LEFT JOIN pg_class tc ON tc.oid = c.reltoastrelid
LEFT JOIN pg_tablespace toast ON toast.oid = tc.reltablespace
WHERE t.tablename = 'your_table';

-- 设置列的TOAST策略
ALTER TABLE large_table ALTER COLUMN large_column SET STORAGE PLAIN;   -- 禁用TOAST
ALTER TABLE large_table ALTER COLUMN large_column SET STORAGE EXTERNAL; -- 外部存储

-- TOAST表结构
-- 当行数据过大时，PostgreSQL将大字段存储到TOAST表中
-- 原表中只保留一个指向TOAST表的指针
d pg_toast.pg_toast_12345  -- TOAST表的命名规则为pg_toast_[oid]`,language:"sql",description:"TOAST 机制处理超长字段，扩展存储容量"})]}),e.jsxs("section",{id:"source-code",className:"mb-8",children:[e.jsx("h2",{id:"source-code",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"源码分析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"PostgreSQL 使用 C 语言编写，以下是几个核心模块的源码结构分析："}),e.jsx(s,{code:`/* PostgreSQL 核心源码结构（src/backend/）
 * 
 * storage/     - 存储引擎：缓冲区管理、WAL、文件访问
 *   buffer/    - Shared Buffer Pool 实现
 *   wal/       - WAL 日志管理
 *   fsm/       - Free Space Map 管理
 * 
 * access/      - 访问方法：堆表、索引实现
 *   heap/      - 堆表存储引擎（HEAP）
 *   transam/   - 事务管理：MVCC、XLOG
 *   
 * utils/       - 工具函数：内存管理、错误处理、配置
 *   mmgr/      - 内存上下文管理
 *   init/      - 后端初始化
 * 
 * executor/    - 执行器：查询执行计划
 * tcop/        - 前端/后端协议：命令处理循环
 */

// MVCC 相关的核心结构（src/include/access/htup_details.h）
typedef struct HeapTupleFields
{
    TransactionId t_xmin;      /* 插入该行的事务ID */
    TransactionId t_xmax;      /* 删除该行的事务ID */
    union
    {
        CommandId   t_cid;     /* 插入/删除命令ID */
        TransactionId t_xvac;  /* VACUUM事务ID */
    }           t_field3;
} HeapTupleFields;

// 事务ID比较函数（src/backend/access/transam.c）
TransactionId
GetCurrentTransactionId(void)
{
    if (TransactionState->transactionId == InvalidTransactionId)
    {
        elog(ERROR, "no transaction identifier assigned");
    }
    return TransactionState->transactionId;
}

// WAL 写入函数（简化版）
XLogRecPtr
XLogInsert(RMGId rmid, uint8 info, XLogRecData *rdata)
{
    XLogRecPtr  StartPos;
    XLogRecPtr  EndPos;
    
    LWLockAcquire(WALInsertLock, LW_EXCLUSIVE);
    
    StartPos = XLogCtl->Insert.pos;
    
    // 构建并写入WAL记录
    EndPos = XLogBeginInsert(rmid, info, rdata);
    
    LWLockRelease(WALInsertLock);
    
    return EndPos;
}

// VACUUM 主函数（src/backend/commands/vacuum.c）
void
vacuum_rel(Relation rel, VacuumStmt *vacstmt, bool is_top_level)
{
    LVRelStats *relstats;
    
    // 初始化清理统计信息
    relstats = (LVRelStats *) palloc0(sizeof(LVRelStats));
    
    // 执行清理操作
    vacuum_set_xid_limits(rel, ...);
    vacuum_truncate_clog(rel, ...);
    
    // 扫描表，清理死元组
    foreach_block(&vacuum_params, rel, relstats);
    
    // 更新统计信息
    vacuum_update_relstats(rel, ...);
    
    // 提交事务
    CommandCounterIncrement();
}`,language:"c",description:"PostgreSQL 核心源码展示了 MVCC、WAL、VACUUM 的实现细节"}),e.jsx(a,{label:"PostgreSQL 源码特点",children:e.jsxs("ol",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"模块化设计"}),"：各功能模块职责清晰，便于维护和扩展"]}),e.jsx("li",{children:e.jsx("strong",{children:"跨平台兼容"})}),e.jsx("li",{children:e.jsx("strong",{children:"内存管理"})}),e.jsx("li",{children:e.jsx("strong",{children:"丰富的插件机制"})})]})})]}),e.jsxs("section",{id:"misconceptions",className:"mb-8",children:[e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"常见误区"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs(r,{type:"danger",title:"误区 1：PostgreSQL 的 MVCC 完全避免了锁",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：MVCC 只是减少了锁的使用，但并未完全消除。在以下场景仍需要锁："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4",children:[e.jsx("li",{children:"DDL 操作（如 ALTER TABLE）需要 AccessExclusiveLock"}),e.jsx("li",{children:"行级锁（SELECT FOR UPDATE/SHARE）"}),e.jsx("li",{children:"意向锁（IX、IS 等）防止高层级冲突"}),e.jsx("li",{children:"死锁检测和预防机制"})]})]}),e.jsx(r,{type:"danger",title:"误区 2：VACUUM 会立即回收磁盘空间",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：普通 VACUUM 只是将死元组标记为空闲，供后续插入使用，但不会释放给操作系统。只有 VACUUM FULL 才会收缩表大小，但需要排他锁。"]})}),e.jsx(r,{type:"warning",title:"误区 3：WAL 文件越大越好",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：WAL 文件大小需要平衡性能和恢复时间。太大的 WAL 文件在崩溃恢复时需要更长时间，太小则导致频繁的检查点操作影响性能。通常设置为 1GB-4GB。"]})}),e.jsx(r,{type:"info",title:"误区 4：PostgreSQL 不支持并行查询",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：自 PostgreSQL 9.6 起引入了并行查询功能，后续版本不断改进。虽然并行能力不如专用分析型数据库，但在适当场景下可显著提升查询性能。"]})})]})]}),e.jsxs("section",{id:"interview",className:"mb-8",children:[e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"面试真题"}),e.jsx(m,{questions:[{question:"PostgreSQL 的 MVCC 机制是如何工作的？与 MySQL InnoDB 的区别是什么？",answer:`PostgreSQL MVCC 工作原理：
1. 每行数据包含 xmin、xmax 等系统字段，标识插入和删除该行的事务ID
2. 读操作通过快照判断数据版本的可见性，不阻塞写操作
3. 写操作创建新版本，不直接修改原数据
4. 通过 VACUUM 回收死元组，清理无效数据

与 MySQL InnoDB 的区别：
- InnoDB：聚集索引，主键与行数据一起存储
- PostgreSQL：堆表存储，行物理位置与主键无关
- InnoDB：间隙锁防止幻读
- PostgreSQL：快照隔离，通过序列化失败检测处理串行化异常
- InnoDB：行级锁更细粒度
- PostgreSQL：MVCC 实现更彻底，几乎无读锁`},{question:"WAL（预写日志）机制的作用是什么？如何影响性能？",answer:`WAL 机制的作用：
1. 持久性保障：确保事务提交前修改已记录到持久存储
2. 崩溃恢复：系统崩溃后可通过 WAL 重放恢复数据
3. 时间点恢复：支持恢复到指定时间点
4. 流复制：WAL 是主备复制的基础

对性能的影响：
- 积极影响：减少随机写入，提高写入性能
- 消极影响：WAL 写入带来额外 I/O 开销
- 优化策略：调整 wal_buffers、checkpoint_segments 等参数`},{question:"VACUUM 和 VACUUM FULL 的区别？何时应该使用它们？",answer:`VACUUM vs VACUUM FULL：
- VACUUM：清理死元组，更新统计信息，空间供后续插入重用，不释放给 OS
- VACUUM FULL：重建整个表，去除碎片，释放空间给 OS，需要排他锁

使用时机：
- VACUUM：日常运行，可自动执行
- VACUUM FULL：表严重膨胀时，需停机维护窗口

自动清理参数：
- autovacuum_vacuum_threshold：死元组阈值
- autovacuum_vacuum_scale_factor：比例因子
- vacuum_cost_delay：控制清理速度，避免影响业务`},{question:"什么是 TOAST 机制？它是如何工作的？",answer:`TOAST（The Oversized-Attribute Storage Technique）机制：
- 目的：处理超过 8KB 单行限制的大字段
- 工作原理：
  1. 当行大小超过页面的 1/4 时，启动 TOAST
  2. 尝试压缩数据（可选）
  3. 如果仍然太大，移动到 TOAST 表
  4. 原表保留指向 TOAST 表的指针

TOAST 策略：
- PLAIN：不压缩不外部存储
- EXTENDED：先压缩，再外部存储（默认）
- EXTERNAL：不压缩，只外部存储
- MAIN：先压缩，必要时外部存储`},{question:"PostgreSQL 的事务 ID 回卷问题是什么？如何避免？",answer:`事务 ID 回卷（XID Wraparound）问题：
- 原因：PostgreSQL 的事务ID是32位整数，约20亿次事务后会回卷
- 影响：新事务可能看到未来事务的数据变化
- 避免方法：
  1. 定期执行 VACUUM（至少每20亿事务一次）
  2. 监控 pg_database.datfrozenxid
  3. 使用 autovacuum 防止事务ID耗尽
  4. 在极端情况下执行 CLUSTER 或 VACUUM FULL

冻结机制：
- 通过 freezing 冻结老事务ID，防止回卷
- VACUUM 会自动冻结足够老的行`}]})]}),e.jsxs("section",{id:"comparison",className:"mb-8",children:[e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"对比其他数据库"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"min-w-full border-collapse border border-border text-[14px] sm:text-[15px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"PostgreSQL"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"MySQL"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"Oracle"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"存储引擎"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"堆表（Heap Table）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"多种（InnoDB, MyISAM等）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"块存储（Block Storage）"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"MVCC实现"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✓ 事务ID + 可见性映射"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✓ InnoDB使用回滚段"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✓ 多版本数据块"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"扩展性"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✓ 丰富的扩展机制"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⚠️ 插件机制有限"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⚠️ 商业扩展为主"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"JSON支持"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（原生丰富支持）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐（MySQL 5.7+）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐（需要额外许可）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"全文检索"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（Tsearch2）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐（MySQL全文索引）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐（Oracle Text）"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"地理信息"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（PostGIS扩展）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐（MySQL空间类型）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐（Spatial Option）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"并行查询"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐（9.6+并行支持）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐（8.0+有限支持）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（全面并行）"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"适用场景"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"复杂查询、GIS、JSON、企业级应用"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"Web应用、OLTP、简单查询"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"大型企业、OLTP/OLAP混合负载"})]})]})]})}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-4",children:[e.jsx("strong",{children:"选型建议"}),"：PostgreSQL 适合需要复杂数据类型、高级功能的场景；MySQL 适合简单 Web 应用；Oracle 适合大型企业级应用。"]})]}),e.jsxs("section",{id:"related",className:"mb-8",children:[e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"知识关联"}),e.jsxs("div",{className:"grid sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🐘 PostgreSQL JSONB与NoSQL能力"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"深入学习 PostgreSQL 的 JSONB 数据类型和 NoSQL 特性"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🔧 PostgreSQL扩展生态"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"了解 PostGIS、pgvector、TimescaleDB 等扩展插件"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🌐 PostgreSQL高可用与复制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"学习流复制、逻辑复制、Patroni 等高可用方案"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🗄️ MySQL数据库"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"对比 MySQL 的架构设计和实现原理"})]})]})]}),e.jsx(o,{...n(t.category,t.id)})]})}),e.jsx(c,{items:p})]})}export{S as default};
