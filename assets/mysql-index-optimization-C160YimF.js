import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as x}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as i}from"./SideNote-BKvanovA.js";import{C as t,A as a,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as d}from"./DiagramBlock-CLaKE9_7.js";import{I as o}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"index-basics",text:"一、索引基础概念",level:2},{id:"bplus-tree",text:"二、B+树数据结构",level:2},{id:"clustered-index",text:"三、聚簇索引 vs 非聚簇索引",level:2},{id:"covering-index",text:"四、覆盖索引",level:2},{id:"leftmost-prefix",text:"五、最左前缀原则",level:2},{id:"index-pushdown",text:"六、索引下推（ICP）",level:2},{id:"index-merge",text:"七、索引合并",level:2},{id:"index-failure",text:"八、索引失效场景",level:2},{id:"execution-plan",text:"九、执行计划分析",level:2},{id:"optimization-strategy",text:"十、索引优化策略",level:2},{id:"misconceptions",text:"十一、常见误区",level:2},{id:"interview",text:"十二、面试真题",level:2},{id:"related",text:"十三、知识关联",level:2}];function j({meta:r}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(x,{meta:r,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["MySQL 索引是基于",e.jsx("strong",{className:"text-accent",children:"B+树数据结构"}),"的有序数据组织方式，通过减少磁盘 I/O 次数加速数据检索， 包括聚簇索引（数据与索引存储在一起）和辅助索引（仅存储索引列和主键），合理使用索引可将查询复杂度从 O(n) 降至 O(log n)。"]})}),e.jsx(t,{type:"tip",title:"为什么索引如此重要？",children:"在百万级数据表中，无索引的全表扫描可能需要数秒甚至数十秒，而使用索引可在毫秒级完成查询。索引是数据库性能优化的第一道防线，但过度索引会降低写入性能并占用额外存储空间，需要权衡利弊。"}),e.jsx("h2",{id:"index-basics",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、索引基础概念"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"索引类似于书籍的目录，通过维护有序的数据结构快速定位目标记录，避免全表扫描。MySQL 支持多种索引类型："}),e.jsx("div",{className:"overflow-x-auto my-5",children:e.jsxs("table",{className:"min-w-full border-collapse border border-border",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink",children:"索引类型"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink",children:"特点"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink",children:"适用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:e.jsx("strong",{children:"PRIMARY KEY"})}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"主键索引，唯一且非空"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"每表一个，自动创建"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:e.jsx("strong",{children:"UNIQUE"})}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"唯一索引，允许 NULL"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"邮箱、手机号等唯一字段"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:e.jsx("strong",{children:"NORMAL"})}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"普通索引，无限制"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"频繁查询的字段"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:e.jsx("strong",{children:"FULLTEXT"})}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"全文索引，分词搜索"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"文章内容、商品描述"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:e.jsx("strong",{children:"SPATIAL"})}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"空间索引，地理坐标"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"GIS 应用、位置服务"})]})]})]})}),e.jsx(s,{code:`-- 创建索引
CREATE INDEX idx_username ON users(username);
CREATE UNIQUE INDEX idx_email ON users(email);

-- 创建复合索引
CREATE INDEX idx_age_city ON users(age, city);

-- 查看表的索引
SHOW INDEX FROM users;

-- 删除索引
DROP INDEX idx_username ON users;

-- 修改表时添加索引
ALTER TABLE users ADD INDEX idx_phone(phone);`,language:"sql",highlights:[2,3,6,9,12,15],filename:"index_operations.sql",description:"索引管理常用命令"}),e.jsx("h2",{id:"bplus-tree",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、B+树数据结构"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"InnoDB 默认使用 B+树作为索引结构。相比 B 树，B+树的非叶子节点只存储键值不存储数据，叶子节点存储所有数据并通过链表连接，适合范围查询和顺序访问。"}),e.jsx(d,{title:"B+树结构示意图",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
         ┌─────────┐
         │   17    │  ← 根节点（非叶子）
         └────┬────┘
       ┌──────┴──────┐
       ▼             ▼
  ┌─────────┐   ┌─────────┐
  │ 5  10    │   │ 25  30  │  ← 内部节点
  └─┬──┬──┬─┘   └─┬──┬──┬─┘
    ▼  ▼  ▼       ▼  ▼  ▼
  ┌──┐┌──┐┌──┐ ┌──┐┌──┐┌──┐
  │1 ││3 ││7 │ │12││20││28│  ← 叶子节点（存储数据）
  └──┘└──┘└──┘ └──┘└──┘└──┘
     ↔   ↔   ↔    ↔   ↔   ↔   ← 叶子节点通过链表连接

B+树特点：
1. 所有数据存储在叶子节点
2. 非叶子节点只存键值（索引项）
3. 叶子节点通过双向链表连接
4. 树高度通常为 2-4 层（千万级数据）
5. 每次查询只需 2-4 次磁盘 I/O
            `})}),e.jsx(i,{label:"为什么 B+树比 B 树更适合数据库？",children:"① B+树非叶子节点不存数据，单页可容纳更多索引项，降低树高度；② 叶子节点链表连接，范围查询无需回溯父节点；③ 顺序遍历效率高，适合 ORDER BY 和 GROUP BY。B 树每个节点都存数据，范围查询需要中序遍历，效率较低。"}),e.jsx(s,{code:`-- B+树高度计算示例
-- 假设：
-- - 每页大小 16KB
-- - 主键 BIGINT（8字节）+ 指针 6字节 = 14字节
-- - 非叶子节点每页可存：16384 / 14 ≈ 1170 个索引项
-- - 叶子节点每页可存约 100 条记录

-- 2 层 B+树可存储：1170 × 100 = 117,000 条记录
-- 3 层 B+树可存储：1170 × 1170 × 100 = 13,689,000 条记录（千万级）
-- 4 层 B+树可存储：1170³ × 100 = 16,016,130,000 条记录（百亿级）

-- 结论：千万级数据只需 3 次磁盘 I/O！

-- 查看表的 B+树深度（需要 performance_schema）
SELECT 
    table_name,
    index_name,
    stat_value AS btree_depth
FROM information_schema.INNODB_SYS_INDEXSTATS
WHERE table_name = 'users';`,language:"sql",highlights:[16,17,18,19,20,21],filename:"btree_analysis.sql",description:"B+树高度分析"}),e.jsx("h2",{id:"clustered-index",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、聚簇索引 vs 非聚簇索引"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["InnoDB 采用聚簇索引组织数据：",e.jsx("strong",{children:"数据行存储在聚簇索引的叶子节点中"}),"，主键索引就是聚簇索引。辅助索引（非聚簇索引）的叶子节点存储主键值，查询时需要",e.jsx("strong",{children:"回表"}),"。"]}),e.jsx(d,{title:"聚簇索引与辅助索引对比",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
聚簇索引（主键索引）：
┌──────────────────────────────┐
│  B+树叶子节点存储完整数据行    │
│  (id=1, name='Alice', age=25)│
│  (id=2, name='Bob', age=30)  │
│  (id=3, name='Charlie', ...) │
└──────────────────────────────┘
✅ 主键查询无需回表，速度最快

辅助索引（二级索引）：
┌──────────────────────────────┐
│  B+树叶子节点存储：            │
│  (name='Alice' → id=1)       │
│  (name='Bob' → id=2)         │
│  (name='Charlie' → id=3)     │
└──────────────────────────────┘
⚠️ 查询其他字段需回表：
   SELECT age FROM users WHERE name='Alice'
   1. 通过辅助索引找到 id=1
   2. 通过 id=1 查聚簇索引获取 age

回表开销：每次回表需要额外的磁盘 I/O
            `})}),e.jsx(s,{code:`-- 示例：回表查询
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    age INT,
    email VARCHAR(100),
    INDEX idx_name(name)  -- 辅助索引
);

-- 场景 1：覆盖索引（无需回表）
SELECT id, name FROM users WHERE name = 'Alice';
-- ✅ 辅助索引已包含 id 和 name，直接返回

-- 场景 2：需要回表
SELECT id, name, age FROM users WHERE name = 'Alice';
-- ⚠️ 辅助索引只有 name，需回表查 age

-- 场景 3：主键查询（聚簇索引）
SELECT * FROM users WHERE id = 1;
-- ✅ 直接通过聚簇索引获取所有字段

-- 查看是否回表（Extra 列显示 "Using index" 表示覆盖索引）
EXPLAIN SELECT id, name FROM users WHERE name = 'Alice';
EXPLAIN SELECT id, name, age FROM users WHERE name = 'Alice';`,language:"sql",highlights:[12,17,22,26,27],filename:"clustered_vs_secondary.sql",description:"聚簇索引与回表演示"}),e.jsxs(t,{type:"warning",title:"回表性能影响",children:["如果查询需要回表且结果集较大（如 1000 行），会导致 1000 次随机 I/O，性能可能比全表扫描还差。此时优化器可能放弃使用索引，改为全表扫描。可通过 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"FORCE INDEX"})," 强制使用索引，或创建覆盖索引避免回表。"]}),e.jsx("h2",{id:"covering-index",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、覆盖索引"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["覆盖索引是指查询的列都能从索引中获取，无需回表查聚簇索引。这是最高效的索引使用方式，EXPLAIN 的 Extra 列会显示 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Using index"}),"。"]}),e.jsx(s,{code:`-- 创建复合索引
CREATE INDEX idx_age_city_name ON users(age, city, name);

-- 场景 1：覆盖索引（查询列都在索引中）
SELECT age, city, name FROM users WHERE age = 25 AND city = 'Beijing';
-- ✅ Extra: Using index

-- 场景 2：需要回表（查询了未索引的字段）
SELECT age, city, name, email FROM users WHERE age = 25 AND city = 'Beijing';
-- ❌ Extra: Using where（需要回表查 email）

-- 场景 3：部分覆盖（只查询索引前缀）
SELECT age, city FROM users WHERE age = 25;
-- ✅ Extra: Using index

-- 最佳实践：将频繁查询的字段加入索引实现覆盖
-- 但注意：索引列过多会降低写入性能，需权衡`,language:"sql",highlights:[2,5,9,13],filename:"covering_index.sql",description:"覆盖索引示例"}),e.jsx(i,{label:"覆盖索引的优势",children:"① 避免回表，减少磁盘 I/O；② 索引文件通常比数据文件小，能加载更多索引页到 Buffer Pool；③ 索引按列值排序，对 ORDER BY 和 GROUP BY 友好。但索引列过多会增加存储开销和维护成本，建议控制在 5 个字段以内。"}),e.jsx("h2",{id:"leftmost-prefix",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、最左前缀原则"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["对于复合索引 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"(a, b, c)"}),"，查询条件必须从最左边开始匹配，跳过中间列会导致索引失效。这类似于电话簿先按姓排序，再按名排序。"]}),e.jsx(s,{code:`-- 创建复合索引
CREATE INDEX idx_abc ON users(a, b, c);

-- ✅ 有效使用索引的情况
SELECT * FROM users WHERE a = 1;                    -- 使用 a
SELECT * FROM users WHERE a = 1 AND b = 2;          -- 使用 a, b
SELECT * FROM users WHERE a = 1 AND b = 2 AND c = 3;-- 使用 a, b, c
SELECT * FROM users WHERE a = 1 AND c = 3;          -- 使用 a（c 无法使用）

-- ❌ 索引失效的情况
SELECT * FROM users WHERE b = 2;                    -- 缺少 a，索引失效
SELECT * FROM users WHERE b = 2 AND c = 3;          -- 缺少 a，索引失效
SELECT * FROM users WHERE c = 3;                    -- 缺少 a, b，索引失效

-- ⚠️ 范围查询后的列无法使用索引
SELECT * FROM users WHERE a = 1 AND b > 10 AND c = 3;
-- 使用 a, b（c 无法使用，因为 b 是范围查询）

-- ✅ 调整顺序优化
SELECT * FROM users WHERE a = 1 AND c = 3 AND b > 10;
-- MySQL 优化器会自动调整顺序为 a, b, c`,language:"sql",highlights:[5,6,7,8,11,12,13,16,20],filename:"leftmost_prefix.sql",description:"最左前缀原则演示"}),e.jsx(d,{title:"最左前缀匹配规则",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
复合索引 idx(a, b, c) 的匹配规则：

WHERE 条件                  使用的索引列      说明
─────────────────────────────────────────────────────
a = 1                       a               ✅ 匹配最左
a = 1 AND b = 2             a, b            ✅ 连续匹配
a = 1 AND b = 2 AND c = 3   a, b, c         ✅ 完全匹配
a = 1 AND c = 3             a               ⚠️ 跳过 b，c 失效
b = 2                       无              ❌ 缺少最左列
b = 2 AND c = 3             无              ❌ 缺少最左列
a = 1 AND b > 10 AND c = 3  a, b            ⚠️ 范围后失效
a > 1 AND b = 2             a               ⚠️ 范围后失效

关键规则：
1. 必须从最左列开始
2. 不能跳过中间列
3. 范围查询（>, <, BETWEEN, LIKE）后的列无法使用索引
4. MySQL 优化器会自动调整 AND 条件的顺序
            `})}),e.jsx("h2",{id:"index-pushdown",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、索引下推（ICP）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Index Condition Pushdown（ICP）是 MySQL 5.6 引入的优化技术。传统方式下，存储引擎根据索引定位记录后回表，Server 层再过滤 WHERE 条件；ICP 将部分过滤条件下推到存储引擎层，减少回表次数。"}),e.jsx(s,{code:`-- 创建复合索引
CREATE INDEX idx_name_age ON users(name, age);

-- 查询：姓名以 "张" 开头且年龄 > 25 的用户
SELECT * FROM users WHERE name LIKE '张%' AND age > 25;

-- 传统方式（无 ICP）：
-- 1. 存储引擎通过索引找到所有 name LIKE '张%' 的记录
-- 2. 对每条记录回表获取完整数据
-- 3. Server 层过滤 age > 25
-- 回表次数 = 所有姓张的用户数（可能很多）

-- ICP 优化后：
-- 1. 存储引擎通过索引找到 name LIKE '张%' 的记录
-- 2. 在索引层检查 age > 25（索引中包含 age）
-- 3. 只对满足条件的记录回表
-- 回表次数 = 姓张且年龄>25 的用户数（大幅减少）

-- 查看是否启用 ICP
SHOW VARIABLES LIKE 'optimizer_switch';
-- 确保 index_condition_pushdown=on

-- EXPLAIN 输出中 Extra 列显示 "Using index condition" 表示使用了 ICP
EXPLAIN SELECT * FROM users WHERE name LIKE '张%' AND age > 25;`,language:"sql",highlights:[2,5,21,25],filename:"index_pushdown.sql",description:"索引下推优化"}),e.jsx(t,{type:"info",title:"ICP 的适用条件",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsx("li",{children:"只能用于辅助索引（二级索引），不能用于聚簇索引"}),e.jsx("li",{children:"WHERE 条件中的字段必须在索引中"}),e.jsx("li",{children:"子查询和触发器触发的查询不使用 ICP"}),e.jsx("li",{children:"适用于范围查询（LIKE、>、<、BETWEEN）后的字段过滤"})]})}),e.jsx("h2",{id:"index-merge",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、索引合并"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Index Merge 是 MySQL 对多个单列索引的合并优化。当 WHERE 条件涉及多个单列索引时，MySQL 可以分别使用各个索引，然后合并结果集。包括三种算法：Union、Intersection、Sort-Union。"}),e.jsx(s,{code:`-- 创建多个单列索引
CREATE INDEX idx_age ON users(age);
CREATE INDEX idx_city ON users(city);

-- 场景 1：Union（OR 条件）
SELECT * FROM users WHERE age = 25 OR city = 'Beijing';
-- 分别查 idx_age 和 idx_city，然后取并集
-- Extra: Using union(idx_age,idx_city); Using where

-- 场景 2：Intersection（AND 条件）
SELECT * FROM users WHERE age = 25 AND city = 'Beijing';
-- 分别查 idx_age 和 idx_city，然后取交集
-- Extra: Using intersect(idx_age,idx_city); Using where

-- 场景 3：Sort-Union（范围查询 + OR）
SELECT * FROM users WHERE age > 25 OR city = 'Beijing';
-- 分别查后排序合并
-- Extra: Using sort_union(idx_age,idx_city); Using where

-- 优化建议：优先使用复合索引替代索引合并
CREATE INDEX idx_age_city ON users(age, city);
-- 这样可以直接使用复合索引，性能更好`,language:"sql",highlights:[2,3,6,11,16,21],filename:"index_merge.sql",description:"索引合并优化"}),e.jsx(i,{label:"索引合并的局限性",children:"索引合并虽然比全表扫描快，但不如复合索引高效。因为需要多次索引扫描和结果集合并，开销较大。如果发现 EXPLAIN 显示 Using union/intersect，应考虑创建合适的复合索引替代。"}),e.jsx("h2",{id:"index-failure",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、索引失效场景"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"以下情况会导致索引失效，退化为全表扫描（type=ALL）。理解这些场景对编写高效 SQL 至关重要。"}),e.jsx(s,{code:`CREATE INDEX idx_name ON users(name);
CREATE INDEX idx_age ON users(age);

-- ❌ 1. 对索引列做函数运算
SELECT * FROM users WHERE YEAR(create_time) = 2024;
-- ✅ 修正：使用范围查询
SELECT * FROM users WHERE create_time >= '2024-01-01' AND create_time < '2025-01-01';

-- ❌ 2. 隐式类型转换
SELECT * FROM users WHERE phone = 13800138000;  -- phone 是 VARCHAR
-- ✅ 修正：加引号
SELECT * FROM users WHERE phone = '13800138000';

-- ❌ 3. LIKE 以 % 开头
SELECT * FROM users WHERE name LIKE '%张三';
-- ✅ 修正：使用前缀匹配或使用全文索引
SELECT * FROM users WHERE name LIKE '张三%';

-- ❌ 4. OR 条件中有未索引的列
SELECT * FROM users WHERE age = 25 OR email = 'test@example.com';  -- email 无索引
-- ✅ 修正：为 email 创建索引，或拆分为 UNION

-- ❌ 5. != 或 NOT IN
SELECT * FROM users WHERE age != 25;
SELECT * FROM users WHERE age NOT IN (25, 30);
-- ✅ 修正：改用 IN 或范围查询（如果选择性高）

-- ❌ 6. IS NULL / IS NOT NULL（低选择性时）
SELECT * FROM users WHERE status IS NULL;  -- 如果大部分为 NULL，索引失效
-- ✅ 修正：确保索引选择性高（区分度 > 10%）

-- ❌ 7. 联合索引违反最左前缀
SELECT * FROM users WHERE b = 2;  -- 索引为 (a, b, c)
-- ✅ 修正：查询包含 a

-- ❌ 8. ORDER BY 与索引顺序不一致
SELECT * FROM users ORDER BY age DESC, city ASC;  -- 索引为 (age, city)
-- ✅ 修正：ORDER BY age DESC, city DESC（方向一致）`,language:"sql",highlights:[5,10,15,20,24,25,28,32,36],filename:"index_failure_cases.sql",description:"索引失效常见场景"}),e.jsxs(t,{type:"danger",title:"隐式类型转换陷阱",children:["这是最常见的索引失效原因！当字符串字段与数字比较时，MySQL 会将字符串转换为数字，导致索引失效。例如 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"VARCHAR 字段 = 123"})," 会触发转换。务必确保数据类型一致。"]}),e.jsx("h2",{id:"execution-plan",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、执行计划分析"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["EXPLAIN 是分析 SQL 执行计划的利器，通过查看各列信息判断索引使用情况。重点关注 ",e.jsx("strong",{children:"type"}),"、",e.jsx("strong",{children:"key"}),"、",e.jsx("strong",{children:"rows"})," 和 ",e.jsx("strong",{children:"Extra"})," 列。"]}),e.jsx(s,{code:`EXPLAIN SELECT id, name, age FROM users 
WHERE age > 25 AND city = 'Beijing' 
ORDER BY age DESC 
LIMIT 10;

-- 输出示例：
-- +----+-------------+-------+------------+-------+---------------+---------+---------+------+------+----------+------------------------------------------+
-- | id | select_type | table | partitions | type  | possible_keys | key     | key_len | ref  | rows | filtered | Extra                                    |
-- +----+-------------+-------+------------+-------+---------------+---------+---------+------+------+----------+------------------------------------------+
-- |  1 | SIMPLE      | users | NULL       | range | idx_age_city  | idx_... | 154     | NULL | 1000 |   100.00 | Using where; Using index; Using filesort |
-- +----+-------------+-------+------------+-------+---------------+---------+---------+------+------+----------+------------------------------------------+

-- 关键字段解读：
-- type: ALL < index < range < ref < eq_ref < const < system（从左到右性能递增）
-- key: 实际使用的索引
-- rows: 预估扫描行数
-- Extra: 
--   - Using index: 覆盖索引
--   - Using where: Server 层过滤
--   - Using filesort: 需要额外排序（性能差）
--   - Using temporary: 使用临时表（性能差）
--   - Using index condition: 使用了 ICP`,language:"sql",highlights:[1,15,16,17,18],filename:"explain_analysis.sql",description:"EXPLAIN 执行计划分析"}),e.jsx("div",{className:"overflow-x-auto my-5",children:e.jsxs("table",{className:"min-w-full border-collapse border border-border",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink",children:"type 值"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink",children:"含义"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink",children:"性能"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:e.jsx("strong",{children:"system"})}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"表只有一行记录"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-green-600",children:"最优"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:e.jsx("strong",{children:"const"})}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"主键或唯一索引等值查询"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-green-600",children:"最优"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:e.jsx("strong",{children:"eq_ref"})}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"JOIN 中使用主键或唯一索引"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-green-600",children:"很好"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:e.jsx("strong",{children:"ref"})}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"非唯一索引等值查询"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-yellow-600",children:"良好"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:e.jsx("strong",{children:"range"})}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"索引范围扫描（>、<、BETWEEN、IN）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-yellow-600",children:"可接受"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:e.jsx("strong",{children:"index"})}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"全索引扫描"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-orange-600",children:"较差"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink",children:e.jsx("strong",{children:"ALL"})}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-ink-muted",children:"全表扫描"}),e.jsx("td",{className:"border border-border px-3 py-2 text-[13px] text-red-600",children:"最差"})]})]})]})}),e.jsx("h2",{id:"optimization-strategy",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、索引优化策略"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"基于以上原理，总结实用的索引优化策略："}),e.jsx(s,{code:`-- 策略 1：为高频查询创建索引
-- 分析慢查询日志，为 WHERE、ORDER BY、GROUP BY 中的字段创建索引
SELECT * FROM slow_query_log ORDER BY query_time DESC LIMIT 10;

-- 策略 2：使用覆盖索引避免回表
CREATE INDEX idx_covering ON orders(user_id, order_no, amount, status);
SELECT user_id, order_no, amount, status FROM orders WHERE user_id = 100;

-- 策略 3：遵循最左前缀设计复合索引
-- 如果经常查询 (a), (a,b), (a,b,c)，创建索引 (a, b, c) 即可
CREATE INDEX idx_abc ON table_name(a, b, c);

-- 策略 4：控制索引数量（一般不超过 5-6 个）
-- 每个索引都会降低 INSERT/UPDATE/DELETE 性能
SHOW INDEX FROM table_name;  -- 查看当前索引数

-- 策略 5：选择区分度高的列作为索引
-- 区分度 = COUNT(DISTINCT column) / COUNT(*)
-- 性别（区分度 0.5）不适合单独建索引，用户 ID（区分度 1.0）适合
SELECT COUNT(DISTINCT gender) / COUNT(*) AS selectivity FROM users;

-- 策略 6：使用前缀索引减少索引大小
CREATE INDEX idx_name_prefix ON users(name(10));  -- 只索引前 10 个字符

-- 策略 7：定期分析和优化索引
ANALYZE TABLE users;  -- 更新统计信息
OPTIMIZE TABLE users;  -- 整理碎片（大表谨慎使用）

-- 策略 8：监控索引使用情况
SELECT * FROM sys.schema_unused_indexes;  -- 找出未使用的索引`,language:"sql",highlights:[3,7,11,14,18,22,25,26,29],filename:"optimization_strategies.sql",description:"索引优化最佳实践"}),e.jsx(t,{type:"tip",title:"索引设计黄金法则",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"精准打击"}),"：只为真正需要的查询创建索引，避免过度索引"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"复合优先"}),"：优先使用复合索引替代多个单列索引"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"覆盖为王"}),"：尽量让索引覆盖查询所需的所有字段"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"区分度高"}),"：选择区分度 > 10% 的列建索引"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"定期清理"}),"：删除长期未使用的索引，减少维护成本"]})]})}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：索引越多越好",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：为所有查询字段都创建索引。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：每个索引都会占用存储空间，并在 INSERT/UPDATE/DELETE 时增加维护成本。一般建议单表索引不超过 5-6 个。应通过分析慢查询日志，只为高频且性能差的查询创建索引。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：主键一定是自增 ID",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：所有表都应该使用 AUTO_INCREMENT 整数作为主键。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：虽然自增主键有利于聚簇索引的顺序插入，但在分布式系统中 UUID 更合适。InnoDB 也支持字符串主键，但要注意长度（可使用前缀索引）。关键是主键要短、唯一、稳定。"]})]}),e.jsxs(t,{type:"danger",title:"误区 3：LIKE 一定不能用索引",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：LIKE 查询都会导致索引失效。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"LIKE 'prefix%'"}),"（前缀匹配）可以使用索引，只有 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"LIKE '%suffix'"})," 或 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"LIKE '%middle%'"})," 才会失效。全文索引可以解决模糊搜索问题。"]})]}),e.jsxs(t,{type:"warning",title:"误区 4：ORDER BY 一定会排序",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：ORDER BY 总是需要额外的排序操作。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：如果 ORDER BY 的字段与索引顺序一致，且排序方向相同（都是 ASC 或 DESC），可以直接利用索引的有序性，无需额外排序（Extra 不显示 Using filesort）。否则需要文件排序，性能较差。"]})]}),e.jsxs(t,{type:"warning",title:"误区 5：COUNT(*) 很慢",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：COUNT(*) 需要扫描全表，性能很差。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：MyISAM 保存了总行数，COUNT(*) 是 O(1)。InnoDB 需要扫描，但会选择最小的辅助索引扫描（而非聚簇索引），因为辅助索引更小。如果只需要近似值，可使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"SHOW TABLE STATUS"})," 或维护计数器表。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十二、面试真题"}),e.jsx(o,{questions:[{question:"为什么 InnoDB 选择 B+树而不是 B 树或哈希表作为索引结构？",answer:"① B+树非叶子节点只存键值，单页可容纳更多索引项，降低树高度（减少 I/O）；② 叶子节点通过链表连接，范围查询和顺序遍历效率高；③ B 树每个节点都存数据，范围查询需要中序遍历，效率低；④ 哈希表只支持等值查询，不支持范围查询和排序，且哈希冲突会影响性能。B+树在等值查询、范围查询、排序场景下综合表现最优。"},{question:"什么是回表？如何避免回表？",answer:"回表是指通过辅助索引查询时，需要再次查询聚簇索引获取完整数据行的过程。避免回表的方法：① 使用覆盖索引，让查询的列都包含在索引中；② 只查询必要的字段，避免 SELECT *；③ 将频繁查询的字段加入复合索引。覆盖索引的 EXPLAIN 输出中 Extra 列会显示 'Using index'。"},{question:"最左前缀原则是什么？违反会有什么后果？",answer:"最左前缀原则指复合索引 (a, b, c) 的查询条件必须从最左边开始匹配。违反后果：① 跳过最左列（如 WHERE b=1）会导致索引完全失效；② 跳过中间列（如 WHERE a=1 AND c=1）只能使用部分索引（a）；③ 范围查询后的列无法使用索引（如 WHERE a=1 AND b>10 AND c=1，c 无法使用）。解决方案：调整查询条件顺序或重新设计索引。"},{question:"什么情况下索引会失效？列举至少 5 种场景。",answer:"① 对索引列做函数运算（YEAR(create_time)=2024）；② 隐式类型转换（VARCHAR 字段与数字比较）；③ LIKE 以 % 开头（LIKE '%abc'）；④ OR 条件中有未索引的列；⑤ != 或 NOT IN 操作；⑥ IS NULL / IS NOT NULL（低选择性时）；⑦ 联合索引违反最左前缀；⑧ ORDER BY 与索引顺序不一致。解决方法：避免函数运算、确保类型一致、使用前缀匹配、为所有 OR 列建索引、改用 IN 或范围查询、遵循最左前缀、保持排序方向一致。"},{question:"如何优化一条慢查询？请描述完整的优化流程。",answer:"① 开启慢查询日志，定位慢 SQL；② 使用 EXPLAIN 分析执行计划，关注 type、key、rows、Extra；③ 检查是否全表扫描（type=ALL），如果是则考虑添加索引；④ 检查是否回表过多，考虑使用覆盖索引；⑤ 检查是否有索引失效场景（函数运算、类型转换等）；⑥ 检查索引选择性，区分度低的列不适合单独建索引；⑦ 测试优化后的 SQL，对比执行时间；⑧ 监控生产环境效果，必要时调整。"},{question:"聚簇索引和辅助索引的区别是什么？",answer:"① 数据存储：聚簇索引的叶子节点存储完整数据行，辅助索引只存储索引列和主键值；② 数量：每表只有一个聚簇索引（通常是主键），可以有多个辅助索引；③ 查询效率：聚簇索引查询无需回表，辅助索引查询非索引列需要回表；④ 物理存储：聚簇索引决定数据的物理存储顺序，辅助索引是逻辑结构；⑤ 更新成本：更新聚簇索引可能导致数据页分裂，成本高；更新辅助索引只影响索引页。"},{question:"索引下推（ICP）的原理和优势是什么？",answer:"ICP 将部分 WHERE 过滤条件下推到存储引擎层。传统方式：存储引擎根据索引定位记录 → 回表获取完整数据 → Server 层过滤 WHERE 条件。ICP 优化后：存储引擎在索引层就检查部分 WHERE 条件（必须是索引中的字段）→ 只对满足条件的记录回表。优势：减少回表次数，降低 I/O 开销。适用于范围查询后的字段过滤，EXPLAIN 显示 'Using index condition'。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十三、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/mysql/mysql-architecture",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"MySQL 架构与存储引擎"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"InnoDB 架构、Buffer Pool、MVCC"})]}),e.jsxs("a",{href:"/docs/mysql/mysql-transaction-lock",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-accent mb-1",children:"深入学习 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-accent",children:"MySQL 事务与锁机制"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"ACID、隔离级别、间隙锁、死锁"})]}),e.jsxs("a",{href:"/docs/mysql/mysql-performance-tuning",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"高级主题 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"MySQL 性能调优"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"慢查询分析、参数调优、监控工具"})]}),e.jsxs("a",{href:"/docs/backend/java/sql-optimization",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"相关技术 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"SQL 优化基础"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"通用 SQL 优化技巧、执行计划"})]})]}),e.jsx(t,{type:"info",title:"学习建议",children:"索引优化是 MySQL 性能调优的核心技能。建议按以下步骤掌握：① 理解 B+树数据结构和聚簇索引原理；② 熟练掌握 EXPLAIN 分析执行计划；③ 通过实验验证各种索引失效场景；④ 在实际项目中应用覆盖索引、最左前缀等优化技巧；⑤ 结合慢查询日志持续优化。理论结合实践才能真正提升性能优化能力。"}),e.jsx(a,{...n(r.category,r.id)})]})}),e.jsx(l,{items:c})]})}export{j as default};
