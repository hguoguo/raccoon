import{j as e,g as l}from"./index-hyqxTCwJ.js";import{K as n}from"./KnowledgeLayout-CwkOMHwC.js";import{C as s,A as a,S as o}from"./ArticleNav-DhfiS38Y.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as i}from"./SideNote-BKvanovA.js";import{I as x}from"./InterviewSection-BBNdwyyN.js";import{D as m}from"./DiagramBlock-CLaKE9_7.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"JSONB 概述",level:2},{id:"json-vs-jsonb",text:"JSON vs JSONB 对比",level:3},{id:"storage-format",text:"存储格式与索引",level:3},{id:"query-operators",text:"查询操作符详解",level:3},{id:"indexing-strategies",text:"GIN 索引策略",level:3},{id:"use-cases",text:"典型应用场景",level:2},{id:"performance-tuning",text:"性能优化技巧",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"与其他数据库对比",level:2},{id:"related",text:"知识关联",level:2}];function E({meta:t}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(n,{meta:t,children:[e.jsxs("div",{className:"mb-8 pb-6 border-b border-border-light",children:[e.jsx("h1",{className:"font-display font-bold text-3xl sm:text-4xl mb-3 text-ink",children:t.title}),e.jsxs("div",{className:"flex flex-wrap gap-2 items-center text-sm text-ink-muted",children:[e.jsx("span",{className:"px-2 py-1 bg-accent-soft text-accent rounded-md font-medium",children:t.level}),e.jsx("span",{children:"难度 ⭐⭐⭐⭐"}),e.jsxs("span",{children:["预计阅读 ",t.readingTime," 分钟"]})]}),e.jsx("div",{className:"mt-3 flex flex-wrap gap-2",children:t.tags.map(d=>e.jsx("span",{className:"px-2.5 py-0.5 bg-parchment-deep text-ink-muted rounded-full text-xs",children:d},d))})]}),e.jsxs("section",{id:"definition",className:"mb-8",children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"pl-4 border-l-4 border-accent bg-accent-soft/40 py-3 pr-4 rounded-r-paper-md italic text-ink-light",children:"PostgreSQL 的 JSONB（Binary JSON）是一种高效的二进制 JSON 存储格式，支持 GIN 索引、丰富的查询操作符和路径表达式，使 PostgreSQL 具备强大的 NoSQL 能力，可在关系型数据库中灵活处理半结构化数据。"}),e.jsx(i,{label:"为什么需要 JSONB？",children:'传统关系型数据库擅长处理结构化数据，但在面对灵活的、模式多变的半结构化数据时显得力不从心。PostgreSQL 通过 JSONB 类型，既保留了关系型数据库的事务一致性、ACID 特性，又获得了类似 MongoDB 的灵活性，实现了"两全其美"。'})]}),e.jsxs("section",{id:"overview",className:"mb-8",children:[e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"JSONB 概述"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["PostgreSQL 提供了两种 JSON 数据类型：",e.jsx("strong",{children:"JSON"})," 和 ",e.jsx("strong",{children:"JSONB"}),"。虽然它们都用于存储 JSON 数据，但实现方式和适用场景有显著差异："]}),e.jsx("h3",{id:"json-vs-jsonb",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"JSON vs JSONB 对比"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-border text-[14px] sm:text-[15px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"JSON"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"JSONB"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"存储格式"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"文本格式（原样保存）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"二进制格式（解析后存储）"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"写入性能"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（快速）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐（需解析转换）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"读取性能"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐（每次需重新解析）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（无需解析）"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"索引支持"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"❌ 不支持"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✅ 支持 GIN/GIST 索引"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"键顺序保留"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✅ 保留原始顺序"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"❌ 不保证顺序"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"重复键处理"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"保留所有重复键"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"只保留最后一个值"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"存储空间"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"较大（含空格、换行）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"较小（压缩存储）"})]})]})]})}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"推荐"}),"：除非有特殊需求（如必须保留键顺序），否则",e.jsx("strong",{children:"优先使用 JSONB"}),"。它在查询性能、索引支持和存储空间方面都有明显优势。"]}),e.jsx("h3",{id:"storage-format",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"存储格式与索引"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"JSONB 采用二进制格式存储，内部结构包含类型标记、长度信息和嵌套层级，使得查询时无需重新解析整个文档："}),e.jsx(m,{title:"JSONB 内部存储结构",children:`graph TD
                JSONB_DOC["JSONB Document"] --> HEADER["Header<br/>Version + Flags"]
                HEADER --> ROOT_OBJ["Root Object/Array"]
                ROOT_OBJ --> KEY1["Key: name"]
                ROOT_OBJ --> VAL1["Value: String"]
                ROOT_OBJ --> KEY2["Key: age"]
                ROOT_OBJ --> VAL2["Value: Integer"]
                ROOT_OBJ --> KEY3["Key: address"]
                ROOT_OBJ --> NESTED["Nested Object"]
                NESTED --> STREET["street: ..."]
                NESTED --> CITY["city: ..."]
                
                style HEADER fill:#e1f5fe
                style ROOT_OBJ fill:#fff3e0
                style NESTED fill:#f3e5f5
              `}),e.jsx("h3",{id:"query-operators",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"查询操作符详解"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"PostgreSQL 为 JSONB 提供了丰富的操作符，支持各种查询和提取场景："}),e.jsx(r,{code:`-- 基础表结构
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    profile JSONB
);

-- 插入示例数据
INSERT INTO users (username, profile) VALUES
('alice', '{"name": "Alice", "age": 30, "email": "alice@example.com", "address": {"city": "Beijing", "zipcode": "100000"}}'),
('bob', '{"name": "Bob", "age": 25, "email": "bob@example.com", "address": {"city": "Shanghai", "zipcode": "200000"}}'),
('charlie', '{"name": "Charlie", "age": 35, "skills": ["Java", "Python", "Go"], "projects": [{"name": "Project A", "role": "Lead"}]}');

-- ========== 基本操作符 ==========

-- ->  返回 JSONB 对象字段或数组元素
SELECT profile->'name' FROM users WHERE username = 'alice';
-- 结果: "Alice"

-- ->> 返回文本格式
SELECT profile->>'name' FROM users WHERE username = 'alice';
-- 结果: Alice (text)

-- #>  按路径获取 JSONB 对象
SELECT profile#>'{address, city}' FROM users WHERE username = 'alice';
-- 结果: "Beijing"

-- #>> 按路径获取文本
SELECT profile#>>'{address, city}' FROM users WHERE username = 'alice';
-- 结果: Beijing (text)

-- ========== 存在性检查 ==========

-- ?   检查顶层键是否存在
SELECT * FROM users WHERE profile ? 'email';

-- ?|  检查是否包含任一指定键
SELECT * FROM users WHERE profile ?| array['phone', 'email'];

-- ?&  检查是否包含所有指定键
SELECT * FROM users WHERE profile ?& array['name', 'age'];

-- @>  包含操作符（左侧包含右侧）
SELECT * FROM users WHERE profile @> '{"age": 30}';

-- <@  被包含操作符（左侧被右侧包含）
SELECT * FROM users WHERE '{"age": 30}' <@ profile;

-- ========== 修改操作符 ==========

-- ||  合并两个 JSONB 对象
UPDATE users 
SET profile = profile || '{"phone": "123456"}'::jsonb
WHERE username = 'alice';

-- -   删除键
UPDATE users 
SET profile = profile - 'email'
WHERE username = 'bob';

-- #-  按路径删除
UPDATE users 
SET profile = profile #- '{address, zipcode}'
WHERE username = 'alice';`,language:"sql",description:"JSONB 操作符提供了丰富的查询和修改能力"}),e.jsx("h3",{id:"indexing-strategies",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"GIN 索引策略"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"GIN（Generalized Inverted Index）是 PostgreSQL 为 JSONB 提供的高效索引类型，支持快速的存在性检查和包含查询："}),e.jsx(r,{code:`-- ========== 创建 GIN 索引 ==========

-- 默认 GIN 索引（支持 ?、?|、?&、@>、<@ 操作符）
CREATE INDEX idx_users_profile ON users USING GIN (profile);

-- jsonb_path_ops 索引（仅支持 @> 操作符，但更小更快）
CREATE INDEX idx_users_profile_path ON users USING GIN (profile jsonb_path_ops);

-- ========== 索引效果验证 ==========

-- 查看索引大小
SELECT 
    indexrelid::regclass AS index_name,
    pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
WHERE tablename = 'users';

-- 强制使用索引进行查询
SET enable_seqscan = off;
EXPLAIN ANALYZE SELECT * FROM users WHERE profile @> '{"age": 30}';
SET enable_seqscan = on;

-- ========== 部分索引（针对特定键） ==========

-- 只对包含特定键的行建立索引
CREATE INDEX idx_users_with_email ON users USING GIN (profile)
WHERE profile ? 'email';

-- ========== 表达式索引 ==========

-- 对嵌套字段建立索引
CREATE INDEX idx_users_city ON users ((profile->'address'->>'city'));

-- 查询时使用相同表达式
SELECT * FROM users WHERE profile->'address'->>'city' = 'Beijing';`,language:"sql",description:"GIN 索引大幅提升 JSONB 查询性能"}),e.jsx(i,{label:"GIN 索引选择建议",children:e.jsxs("ul",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"默认 GIN"}),"：适合多种查询场景，功能全面"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"jsonb_path_ops"}),"：如果只用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@>"})," 操作符，选择此类型可节省 30-50% 空间"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"部分索引"}),"：当只有部分行需要索引时，可大幅减小索引大小"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"表达式索引"}),"：频繁查询某个特定字段时，考虑建立表达式索引"]})]})})]}),e.jsxs("section",{id:"use-cases",className:"mb-8",children:[e.jsx("h2",{id:"use-cases",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"典型应用场景"}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"border border-border rounded-paper-md p-5 bg-white shadow-sm",children:[e.jsxs("h3",{className:"font-semibold text-ink mb-3 flex items-center",children:[e.jsx("span",{className:"mr-2",children:"📋"}),"场景 1：用户配置和偏好设置"]}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-3",children:"不同用户的配置项可能差异很大，使用 JSONB 可以灵活存储，无需预先定义所有字段："}),e.jsx(r,{code:`CREATE TABLE user_settings (
    user_id INT PRIMARY KEY REFERENCES users(id),
    settings JSONB DEFAULT '{}'::jsonb
);

-- 存储多样化配置
INSERT INTO user_settings (user_id, settings) VALUES
(1, '{"theme": "dark", "language": "zh-CN", "notifications": {"email": true, "sms": false}}'),
(2, '{"theme": "light", "timezone": "Asia/Shanghai", "dashboard": {"widgets": ["calendar", "tasks"]}}');

-- 查询特定配置
SELECT user_id, settings->>'theme' AS theme
FROM user_settings
WHERE settings->'notifications'->>'email' = 'true';`,language:"sql",description:"灵活存储用户个性化配置"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-5 bg-white shadow-sm",children:[e.jsxs("h3",{className:"font-semibold text-ink mb-3 flex items-center",children:[e.jsx("span",{className:"mr-2",children:"🛒"}),"场景 2：电商产品属性"]}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-3",children:"不同类别的商品有不同的属性（手机有屏幕尺寸，衣服有尺码），JSONB 完美适配这种动态 schema："}),e.jsx(r,{code:`CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    category VARCHAR(50),
    attributes JSONB
);

INSERT INTO products (name, category, attributes) VALUES
('iPhone 15 Pro', 'electronics', '{"brand": "Apple", "screen_size": "6.1 inch", "storage": "256GB", "colors": ["Black", "White", "Blue"]}'),
('Nike Air Max', 'shoes', '{"brand": "Nike", "size": ["US 8", "US 9", "US 10"], "color": "Red", "material": "Mesh"}');

-- 查询特定属性的商品
SELECT name, attributes->>'brand' AS brand
FROM products
WHERE attributes @> '{"brand": "Apple"}';

-- 查找包含特定颜色的商品
SELECT name
FROM products
WHERE attributes->'colors' ? 'Blue';`,language:"sql",description:"灵活管理异构商品属性"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-5 bg-white shadow-sm",children:[e.jsxs("h3",{className:"font-semibold text-ink mb-3 flex items-center",children:[e.jsx("span",{className:"mr-2",children:"📊"}),"场景 3：日志和事件数据"]}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-3",children:"日志数据结构多变，JSONB 可以存储任意格式的日志条目，同时支持高效查询："}),e.jsx(r,{code:`CREATE TABLE application_logs (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    level VARCHAR(10),
    message TEXT,
    metadata JSONB
);

INSERT INTO application_logs (level, message, metadata) VALUES
('ERROR', 'Database connection failed', '{"database": "postgres", "host": "db.example.com", "port": 5432, "retry_count": 3}'),
('INFO', 'User login successful', '{"user_id": 123, "ip_address": "192.168.1.100", "browser": "Chrome", "os": "macOS"}');

-- 查询特定条件的日志
SELECT * FROM application_logs
WHERE metadata @> '{"database": "postgres"}'
AND level = 'ERROR';

-- 统计错误日志数量
SELECT 
    metadata->>'database' AS database_name,
    COUNT(*) AS error_count
FROM application_logs
WHERE level = 'ERROR'
GROUP BY metadata->>'database';`,language:"sql",description:"灵活存储和查询结构化日志"})]})]})]}),e.jsxs("section",{id:"performance-tuning",className:"mb-8",children:[e.jsx("h2",{id:"performance-tuning",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"性能优化技巧"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{type:"info",title:"技巧 1：选择合适的索引类型",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:["如果只使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@>"})," 操作符，使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"jsonb_path_ops"})," 索引可节省 30-50% 空间并提升查询速度。"]})}),e.jsx(s,{type:"info",title:"技巧 2：避免在 JSONB 上执行全表扫描",children:e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"对于频繁查询的字段，考虑将其提取为普通列并建立 B-tree 索引，或使用表达式索引。"})}),e.jsx(s,{type:"warning",title:"技巧 3：控制 JSONB 文档大小",children:e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"单个 JSONB 文档不宜过大（建议 < 1MB）。过大的文档会影响查询性能和内存使用。如需存储大型文档，考虑分拆或使用 TOAST。"})}),e.jsx(s,{type:"info",title:"技巧 4：使用 jsonb_set 进行局部更新",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:["相比读取-修改-写入整个文档，",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"jsonb_set()"})," 函数可以直接修改嵌套字段，减少数据传输量。"]})})]}),e.jsx(r,{code:`-- ========== 使用 jsonb_set 进行局部更新 ==========

-- 更新嵌套字段
UPDATE users
SET profile = jsonb_set(profile, '{address, city}', '"Guangzhou"')
WHERE username = 'alice';

-- 添加新字段
UPDATE users
SET profile = jsonb_set(profile, '{phone}', '"123456789"')
WHERE username = 'bob';

-- 追加到数组
UPDATE users
SET profile = jsonb_set(
    profile, 
    '{skills}', 
    (profile->'skills') || '"Rust"'
)
WHERE username = 'charlie';

-- ========== 监控 JSONB 性能 ==========

-- 查看慢查询
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
WHERE query LIKE '%profile%'
ORDER BY mean_time DESC
LIMIT 10;

-- 检查索引使用情况
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
WHERE tablename = 'users';`,language:"sql",description:"JSONB 性能优化最佳实践"})]}),e.jsxs("section",{id:"misconceptions",className:"mb-8",children:[e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"常见误区"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{type:"danger",title:"误区 1：JSONB 可以完全替代关系型设计",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：JSONB 适合存储半结构化、模式多变的数据，但对于核心业务数据（如订单、用户基本信息），仍应使用规范化的关系型设计。混合使用才能发挥最大优势。"]})}),e.jsx(s,{type:"danger",title:"误区 2：JSONB 查询一定很慢",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：合理使用 GIN 索引后，JSONB 查询性能可以接近甚至超过某些关系型查询。关键在于正确选择索引类型和优化查询语句。"]})}),e.jsx(s,{type:"warning",title:"误区 3：所有 JSON 字段都应该用 JSONB",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：如果只是简单存储和返回 JSON 字符串，不需要查询内部字段，使用 JSON 类型更合适（写入更快）。只有在需要查询、索引时才使用 JSONB。"]})}),e.jsx(s,{type:"info",title:"误区 4：JSONB 不支持事务",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：JSONB 完全支持 PostgreSQL 的事务机制（ACID），可以参与事务回滚、隔离级别控制等，与普通列没有区别。"]})})]})]}),e.jsxs("section",{id:"interview",className:"mb-8",children:[e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"面试真题"}),e.jsx(x,{questions:[{question:"PostgreSQL 中 JSON 和 JSONB 的区别是什么？如何选择？",answer:`主要区别：
1. 存储格式：JSON 是文本格式，JSONB 是二进制格式
2. 写入性能：JSON 更快（无需解析），JSONB 较慢（需转换）
3. 读取性能：JSONB 更快（无需重新解析），JSON 每次需解析
4. 索引支持：JSON 不支持索引，JSONB 支持 GIN/GIST 索引
5. 键顺序：JSON 保留原始顺序，JSONB 不保证
6. 存储空间：JSONB 更紧凑（去除空白字符）

选择建议：
- 只需存储和返回，不查询内部 → 使用 JSON
- 需要查询、过滤、索引内部字段 → 使用 JSONB（推荐）
- 大部分场景都应使用 JSONB`},{question:"如何优化 JSONB 查询性能？",answer:`优化策略：
1. 使用 GIN 索引：CREATE INDEX idx ON table USING GIN (jsonb_column);
2. 如果只用 @> 操作符，使用 jsonb_path_ops 索引类型，节省空间
3. 对频繁查询的字段建立表达式索引
4. 使用部分索引，只对需要的行建立索引
5. 避免在 JSONB 上进行复杂计算，尽量提取为普通列
6. 控制文档大小，避免单个文档过大（< 1MB）
7. 使用 EXPLAIN ANALYZE 分析查询计划，确保使用索引`},{question:"JSONB 的 GIN 索引是如何工作的？",answer:`GIN（Generalized Inverted Index）索引工作原理：
1. 将 JSONB 文档中的每个键值对提取为索引条目
2. 构建倒排索引，键作为索引键，指向包含该键的行
3. 查询时，通过索引快速定位包含特定键的行
4. 支持的操作符：?、?|、?&、@>、<@

索引类型：
- 默认 GIN：支持所有操作符，索引较大
- jsonb_path_ops：只支持 @>，索引更小更快（节省 30-50% 空间）

注意：GIN 索引不支持排序和范围查询，这些场景需要使用 B-tree 或表达式索引。`},{question:"如何在 JSONB 中更新嵌套字段？",answer:`更新方法：
1. 使用 jsonb_set() 函数进行局部更新：
   UPDATE table SET col = jsonb_set(col, '{key1,key2}', 'new_value')
   
2. 使用 || 操作符合并：
   UPDATE table SET col = col || '{"new_key": "value"}'::jsonb
   
3. 使用 - 操作符删除键：
   UPDATE table SET col = col - 'key_to_delete'
   
4. 使用 #- 操作符按路径删除：
   UPDATE table SET col = col #- '{key1,key2}'

最佳实践：
- 优先使用 jsonb_set() 进行精确更新
- 避免读取-修改-写入整个文档
- 批量更新时使用事务保证一致性`},{question:"PostgreSQL JSONB 与 MongoDB 相比有什么优势和劣势？",answer:`PostgreSQL JSONB 的优势：
1. ACID 事务支持，数据一致性强
2. 可以与传统关系型数据混合使用
3. 强大的 SQL 查询能力（JOIN、聚合、窗口函数）
4. 成熟的高可用方案（流复制、逻辑复制）
5. 丰富的扩展生态（PostGIS、pgvector 等）
6. 单一技术栈，降低运维复杂度

PostgreSQL JSONB 的劣势：
1. 水平扩展能力不如 MongoDB（分片较复杂）
2. 写入性能略低于 MongoDB（需维护索引和事务）
3. 文档验证能力较弱（MongoDB 有 JSON Schema 验证）
4. 社区对纯 NoSQL 场景的最佳实践较少

选型建议：
- 需要强一致性、复杂查询 → PostgreSQL JSONB
- 需要海量数据、水平扩展 → MongoDB
- 已有 PostgreSQL 基础设施 → 优先使用 JSONB`}]})]}),e.jsxs("section",{id:"comparison",className:"mb-8",children:[e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"与其他数据库对比"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"min-w-full border-collapse border border-border text-[14px] sm:text-[15px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"PostgreSQL JSONB"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"MySQL JSON"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"MongoDB"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"存储格式"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"二进制（高效）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"二进制（5.7+）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"BSON"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"索引支持"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（GIN/GIST）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐（虚拟列索引）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（原生索引）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"查询语言"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"SQL + JSON 操作符"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"SQL + JSON 函数"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"MongoDB Query Language"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"事务支持"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✅ 完整 ACID"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✅ 完整 ACID"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⚠️ 单文档事务"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"JOIN 支持"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✅ 强大"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✅ 支持"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"❌ 不支持（需 $lookup）"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"水平扩展"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⚠️ 较复杂（Citus）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⚠️ 有限支持"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✅ 原生分片"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"Schema 验证"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⚠️ 需 CHECK 约束"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⚠️ 有限支持"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✅ JSON Schema"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"适用场景"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"混合负载、复杂查询"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"Web 应用、简单 JSON"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"纯 NoSQL、大数据量"})]})]})]})}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-4",children:[e.jsx("strong",{children:"选型建议"}),"：需要关系型和 NoSQL 混合能力选 PostgreSQL；已有 MySQL 生态选 MySQL JSON；纯 NoSQL、海量数据选 MongoDB。"]})]}),e.jsxs("section",{id:"related",className:"mb-8",children:[e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"知识关联"}),e.jsxs("div",{className:"grid sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🐘 PostgreSQL核心原理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"深入学习 MVCC、WAL、VACUUM 等核心机制"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🔧 PostgreSQL扩展生态"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"了解 pgvector、TimescaleDB 等扩展插件"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🗄️ MySQL数据库"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"对比 MySQL 的 JSON 类型实现"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"📦 Redis缓存实战"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"学习如何使用 Redis 缓存 JSONB 查询结果"})]})]})]}),e.jsx(a,{...l(t.category,t.id)})]})}),e.jsx(o,{items:c})]})}export{E as default};
