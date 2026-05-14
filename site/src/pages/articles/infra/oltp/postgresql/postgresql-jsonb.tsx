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
  { id: 'overview', text: 'JSONB 概述', level: 2 },
  { id: 'json-vs-jsonb', text: 'JSON vs JSONB 对比', level: 3 },
  { id: 'storage-format', text: '存储格式与索引', level: 3 },
  { id: 'query-operators', text: '查询操作符详解', level: 3 },
  { id: 'indexing-strategies', text: 'GIN 索引策略', level: 3 },
  { id: 'use-cases', text: '典型应用场景', level: 2 },
  { id: 'performance-tuning', text: '性能优化技巧', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '与其他数据库对比', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function PostgreSqlJsonb({ meta }: { meta: KnowledgeNode }) {
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
              <span>难度 ⭐⭐⭐⭐</span>
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
            <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              一句话定义
            </h2>
            <blockquote className="pl-4 border-l-4 border-accent bg-accent-soft/40 py-3 pr-4 rounded-r-paper-md italic text-ink-light">
              PostgreSQL 的 JSONB（Binary JSON）是一种高效的二进制 JSON 存储格式，支持 GIN 索引、丰富的查询操作符和路径表达式，使 PostgreSQL 具备强大的 NoSQL 能力，可在关系型数据库中灵活处理半结构化数据。
            </blockquote>
            <SideNote label="为什么需要 JSONB？">
              传统关系型数据库擅长处理结构化数据，但在面对灵活的、模式多变的半结构化数据时显得力不从心。PostgreSQL 通过 JSONB 类型，既保留了关系型数据库的事务一致性、ACID 特性，又获得了类似 MongoDB 的灵活性，实现了"两全其美"。
            </SideNote>
          </section>

          {/* JSONB 概述 */}
          <section id="overview" className="mb-8">
            <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              JSONB 概述
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              PostgreSQL 提供了两种 JSON 数据类型：<strong>JSON</strong> 和 <strong>JSONB</strong>。虽然它们都用于存储 JSON 数据，但实现方式和适用场景有显著差异：
            </p>

            <h3 id="json-vs-jsonb" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              JSON vs JSONB 对比
            </h3>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-border text-[14px] sm:text-[15px]">
                <thead>
                  <tr className="bg-parchment-deep">
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">特性</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">JSON</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">JSONB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">存储格式</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">文本格式（原样保存）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">二进制格式（解析后存储）</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">写入性能</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（快速）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐（需解析转换）</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">读取性能</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐（每次需重新解析）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（无需解析）</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">索引支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">❌ 不支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 支持 GIN/GIST 索引</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">键顺序保留</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 保留原始顺序</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">❌ 不保证顺序</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">重复键处理</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">保留所有重复键</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">只保留最后一个值</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">存储空间</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">较大（含空格、换行）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">较小（压缩存储）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong>推荐</strong>：除非有特殊需求（如必须保留键顺序），否则<strong>优先使用 JSONB</strong>。它在查询性能、索引支持和存储空间方面都有明显优势。
            </p>

            <h3 id="storage-format" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              存储格式与索引
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              JSONB 采用二进制格式存储，内部结构包含类型标记、长度信息和嵌套层级，使得查询时无需重新解析整个文档：
            </p>

            <DiagramBlock title="JSONB 内部存储结构">
              {`graph TD
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
              `}
            </DiagramBlock>

            <h3 id="query-operators" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              查询操作符详解
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              PostgreSQL 为 JSONB 提供了丰富的操作符，支持各种查询和提取场景：
            </p>

            <Playground
              code={`-- 基础表结构
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
WHERE username = 'alice';`}
              language="sql"
              description="JSONB 操作符提供了丰富的查询和修改能力"
            />

            <h3 id="indexing-strategies" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              GIN 索引策略
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              GIN（Generalized Inverted Index）是 PostgreSQL 为 JSONB 提供的高效索引类型，支持快速的存在性检查和包含查询：
            </p>

            <Playground
              code={`-- ========== 创建 GIN 索引 ==========

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
SELECT * FROM users WHERE profile->'address'->>'city' = 'Beijing';`}
              language="sql"
              description="GIN 索引大幅提升 JSONB 查询性能"
            />

            <SideNote label="GIN 索引选择建议">
              <ul className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2">
                <li><strong>默认 GIN</strong>：适合多种查询场景，功能全面</li>
                <li><strong>jsonb_path_ops</strong>：如果只用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">{'@>'}</code> 操作符，选择此类型可节省 30-50% 空间</li>
                <li><strong>部分索引</strong>：当只有部分行需要索引时，可大幅减小索引大小</li>
                <li><strong>表达式索引</strong>：频繁查询某个特定字段时，考虑建立表达式索引</li>
              </ul>
            </SideNote>
          </section>

          {/* 典型应用场景 */}
          <section id="use-cases" className="mb-8">
            <h2 id="use-cases" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              典型应用场景
            </h2>

            <div className="space-y-6">
              <div className="border border-border rounded-paper-md p-5 bg-white shadow-sm">
                <h3 className="font-semibold text-ink mb-3 flex items-center">
                  <span className="mr-2">📋</span>
                  场景 1：用户配置和偏好设置
                </h3>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-3">
                  不同用户的配置项可能差异很大，使用 JSONB 可以灵活存储，无需预先定义所有字段：
                </p>
                <Playground
                  code={`CREATE TABLE user_settings (
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
WHERE settings->'notifications'->>'email' = 'true';`}
                  language="sql"
                  description="灵活存储用户个性化配置"
                />
              </div>

              <div className="border border-border rounded-paper-md p-5 bg-white shadow-sm">
                <h3 className="font-semibold text-ink mb-3 flex items-center">
                  <span className="mr-2">🛒</span>
                  场景 2：电商产品属性
                </h3>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-3">
                  不同类别的商品有不同的属性（手机有屏幕尺寸，衣服有尺码），JSONB 完美适配这种动态 schema：
                </p>
                <Playground
                  code={`CREATE TABLE products (
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
WHERE attributes->'colors' ? 'Blue';`}
                  language="sql"
                  description="灵活管理异构商品属性"
                />
              </div>

              <div className="border border-border rounded-paper-md p-5 bg-white shadow-sm">
                <h3 className="font-semibold text-ink mb-3 flex items-center">
                  <span className="mr-2">📊</span>
                  场景 3：日志和事件数据
                </h3>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-3">
                  日志数据结构多变，JSONB 可以存储任意格式的日志条目，同时支持高效查询：
                </p>
                <Playground
                  code={`CREATE TABLE application_logs (
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
GROUP BY metadata->>'database';`}
                  language="sql"
                  description="灵活存储和查询结构化日志"
                />
              </div>
            </div>
          </section>

          {/* 性能优化技巧 */}
          <section id="performance-tuning" className="mb-8">
            <h2 id="performance-tuning" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              性能优化技巧
            </h2>

            <div className="space-y-4">
              <Callout type="info" title="技巧 1：选择合适的索引类型">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  如果只使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">{'@>'}</code> 操作符，使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">jsonb_path_ops</code> 索引可节省 30-50% 空间并提升查询速度。
                </p>
              </Callout>

              <Callout type="info" title="技巧 2：避免在 JSONB 上执行全表扫描">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  对于频繁查询的字段，考虑将其提取为普通列并建立 B-tree 索引，或使用表达式索引。
                </p>
              </Callout>

              <Callout type="warning" title="技巧 3：控制 JSONB 文档大小">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  单个 JSONB 文档不宜过大（建议 &lt; 1MB）。过大的文档会影响查询性能和内存使用。如需存储大型文档，考虑分拆或使用 TOAST。
                </p>
              </Callout>

              <Callout type="info" title="技巧 4：使用 jsonb_set 进行局部更新">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  相比读取-修改-写入整个文档，<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">jsonb_set()</code> 函数可以直接修改嵌套字段，减少数据传输量。
                </p>
              </Callout>
            </div>

            <Playground
              code={`-- ========== 使用 jsonb_set 进行局部更新 ==========

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
WHERE tablename = 'users';`}
              language="sql"
              description="JSONB 性能优化最佳实践"
            />
          </section>

          {/* 常见误区 */}
          <section id="misconceptions" className="mb-8">
            <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              常见误区
            </h2>

            <div className="space-y-4">
              <Callout type="danger" title="误区 1：JSONB 可以完全替代关系型设计">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：JSONB 适合存储半结构化、模式多变的数据，但对于核心业务数据（如订单、用户基本信息），仍应使用规范化的关系型设计。混合使用才能发挥最大优势。
                </p>
              </Callout>

              <Callout type="danger" title="误区 2：JSONB 查询一定很慢">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：合理使用 GIN 索引后，JSONB 查询性能可以接近甚至超过某些关系型查询。关键在于正确选择索引类型和优化查询语句。
                </p>
              </Callout>

              <Callout type="warning" title="误区 3：所有 JSON 字段都应该用 JSONB">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：如果只是简单存储和返回 JSON 字符串，不需要查询内部字段，使用 JSON 类型更合适（写入更快）。只有在需要查询、索引时才使用 JSONB。
                </p>
              </Callout>

              <Callout type="info" title="误区 4：JSONB 不支持事务">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：JSONB 完全支持 PostgreSQL 的事务机制（ACID），可以参与事务回滚、隔离级别控制等，与普通列没有区别。
                </p>
              </Callout>
            </div>
          </section>

          {/* 面试真题 */}
          <section id="interview" className="mb-8">
            <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              面试真题
            </h2>

            <InterviewSection
              questions={[
                {
                  question: 'PostgreSQL 中 JSON 和 JSONB 的区别是什么？如何选择？',
                  answer: `主要区别：
1. 存储格式：JSON 是文本格式，JSONB 是二进制格式
2. 写入性能：JSON 更快（无需解析），JSONB 较慢（需转换）
3. 读取性能：JSONB 更快（无需重新解析），JSON 每次需解析
4. 索引支持：JSON 不支持索引，JSONB 支持 GIN/GIST 索引
5. 键顺序：JSON 保留原始顺序，JSONB 不保证
6. 存储空间：JSONB 更紧凑（去除空白字符）

选择建议：
- 只需存储和返回，不查询内部 → 使用 JSON
- 需要查询、过滤、索引内部字段 → 使用 JSONB（推荐）
- 大部分场景都应使用 JSONB`,
                },
                {
                  question: '如何优化 JSONB 查询性能？',
                  answer: `优化策略：
1. 使用 GIN 索引：CREATE INDEX idx ON table USING GIN (jsonb_column);
2. 如果只用 @> 操作符，使用 jsonb_path_ops 索引类型，节省空间
3. 对频繁查询的字段建立表达式索引
4. 使用部分索引，只对需要的行建立索引
5. 避免在 JSONB 上进行复杂计算，尽量提取为普通列
6. 控制文档大小，避免单个文档过大（< 1MB）
7. 使用 EXPLAIN ANALYZE 分析查询计划，确保使用索引`,
                },
                {
                  question: 'JSONB 的 GIN 索引是如何工作的？',
                  answer: `GIN（Generalized Inverted Index）索引工作原理：
1. 将 JSONB 文档中的每个键值对提取为索引条目
2. 构建倒排索引，键作为索引键，指向包含该键的行
3. 查询时，通过索引快速定位包含特定键的行
4. 支持的操作符：?、?|、?&、@>、<@

索引类型：
- 默认 GIN：支持所有操作符，索引较大
- jsonb_path_ops：只支持 @>，索引更小更快（节省 30-50% 空间）

注意：GIN 索引不支持排序和范围查询，这些场景需要使用 B-tree 或表达式索引。`,
                },
                {
                  question: '如何在 JSONB 中更新嵌套字段？',
                  answer: `更新方法：
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
- 批量更新时使用事务保证一致性`,
                },
                {
                  question: 'PostgreSQL JSONB 与 MongoDB 相比有什么优势和劣势？',
                  answer: `PostgreSQL JSONB 的优势：
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
- 已有 PostgreSQL 基础设施 → 优先使用 JSONB`,
                },
              ]}
            />
          </section>

          {/* 与其他数据库对比 */}
          <section id="comparison" className="mb-8">
            <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              与其他数据库对比
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-border text-[14px] sm:text-[15px]">
                <thead>
                  <tr className="bg-parchment-deep">
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">特性</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">PostgreSQL JSONB</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">MySQL JSON</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">MongoDB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">存储格式</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">二进制（高效）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">二进制（5.7+）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">BSON</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">索引支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（GIN/GIST）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐（虚拟列索引）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（原生索引）</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">查询语言</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">SQL + JSON 操作符</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">SQL + JSON 函数</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">MongoDB Query Language</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">事务支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 完整 ACID</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 完整 ACID</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⚠️ 单文档事务</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">JOIN 支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 强大</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">❌ 不支持（需 $lookup）</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">水平扩展</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⚠️ 较复杂（Citus）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⚠️ 有限支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 原生分片</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">Schema 验证</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⚠️ 需 CHECK 约束</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⚠️ 有限支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ JSON Schema</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">适用场景</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">混合负载、复杂查询</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">Web 应用、简单 JSON</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">纯 NoSQL、大数据量</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-4">
              <strong>选型建议</strong>：需要关系型和 NoSQL 混合能力选 PostgreSQL；已有 MySQL 生态选 MySQL JSON；纯 NoSQL、海量数据选 MongoDB。
            </p>
          </section>

          {/* 知识关联 */}
          <section id="related" className="mb-8">
            <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              知识关联
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🐘 PostgreSQL核心原理</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  深入学习 MVCC、WAL、VACUUM 等核心机制
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🔧 PostgreSQL扩展生态</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  了解 pgvector、TimescaleDB 等扩展插件
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🗄️ MySQL数据库</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  对比 MySQL 的 JSON 类型实现
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">📦 Redis缓存实战</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  学习如何使用 Redis 缓存 JSONB 查询结果
                </p>
              </div>
            </div>
          </section>

          {/* 文章导航 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* 右侧目录 - 直接渲染，不用 aside 包裹 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
