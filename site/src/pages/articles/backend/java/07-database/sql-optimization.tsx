import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import SideNote from '../../components/knowledge/SideNote'
import SmartTOC from '../../components/knowledge/SmartTOC'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'index-basics', text: '一、索引基础', level: 2 },
  { id: 'b-plus-tree', text: '二、B+树原理（重点🔥）', level: 2 },
  { id: 'index-types', text: '三、索引类型', level: 2 },
  { id: 'execution-plan', text: '四、执行计划分析', level: 2 },
  { id: 'index-optimization', text: '五、索引优化策略', level: 2 },
  { id: 'common-problems', text: '六、常见问题与解决', level: 2 },
  { id: 'slow-query', text: '七、慢查询优化', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function SqlOptimization({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              SQL 优化是通过<strong className="text-accent">合理使用索引、优化查询语句、调整表结构</strong>等手段，
              提升数据库查询性能的过程，核心目标是减少 I/O 操作和 CPU 计算。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 SQL 优化？">
            随着数据量增长，未经优化的 SQL 查询可能从毫秒级退化到秒级甚至分钟级。SQL 优化是后端工程师的核心技能之一，直接影响系统响应速度和用户体验。
          </Callout>

          <h2 id="index-basics" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、索引基础
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            索引是数据库中用于快速查找数据的数据结构，类似于书籍的目录。没有索引时，数据库需要全表扫描（Full Table Scan），时间复杂度为 O(n)；使用索引后，时间复杂度可降至 O(log n)。
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">特性</th>
                <th className="text-left p-3 font-semibold text-ink">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">优势</td>
                <td className="p-3">大幅提升查询速度，减少 I/O 操作</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">劣势</td>
                <td className="p-3">占用存储空间，降低写操作性能（INSERT/UPDATE/DELETE）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">适用场景</td>
                <td className="p-3">频繁查询、数据量大、选择性高的字段</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">不适用场景</td>
                <td className="p-3">频繁更新、数据量小、选择性低的字段（如性别）</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`-- 创建索引
CREATE INDEX idx_user_name ON users(name);                    -- 普通索引
CREATE UNIQUE INDEX idx_user_email ON users(email);           -- 唯一索引
CREATE INDEX idx_user_age_name ON users(age, name);           -- 联合索引

-- 查看索引
SHOW INDEX FROM users;

-- 删除索引
DROP INDEX idx_user_name ON users;

-- 查看表结构（包含索引信息）
DESC users;`}
            language="sql"
            highlights={[1, 2, 3]}
            filename="IndexOperations.sql"
            description="索引基本操作"
          />

          <SideNote label="索引的选择性">
            选择性 = 不同值的数量 / 总记录数。选择性越高（接近 1），索引效果越好。例如：身份证号的选择性接近 1，适合建索引；性别的选择性只有 0.5，不适合建索引。
          </SideNote>

          <h2 id="b-plus-tree" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、B+树原理（重点🔥）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            MySQL InnoDB 引擎使用 <strong className="text-accent">B+树</strong>作为索引数据结构，相比 B 树和哈希表，B+树更适合磁盘存储和范围查询。
          </p>

          <DiagramBlock title="B+树结构示意">
            {`\`\`\`mermaid
graph TB
    Root[根节点<br/>10, 20, 30] --> N1[内部节点<br/>5, 8]
    Root --> N2[内部节点<br/>15, 18]
    Root --> N3[内部节点<br/>25, 28]
    Root --> N4[内部节点<br/>35, 38]
    
    N1 --> L1[叶子节点<br/>1, 3, 5, 7, 8]
    N1 --> L2[叶子节点<br/>9, 10]
    
    N2 --> L3[叶子节点<br/>11, 13, 15, 17, 18]
    N2 --> L4[叶子节点<br/>19, 20]
    
    N3 --> L5[叶子节点<br/>21, 23, 25, 27, 28]
    N3 --> L6[叶子节点<br/>29, 30]
    
    N4 --> L7[叶子节点<br/>31, 33, 35, 37, 38]
    N4 --> L8[叶子节点<br/>39, 40]
    
    L1 -.-> L2 -.-> L3 -.-> L4 -.-> L5 -.-> L6 -.-> L7 -.-> L8
    
    style Root fill:#ff9999
    style N1 fill:#ffcc99
    style N2 fill:#ffcc99
    style N3 fill:#ffcc99
    style N4 fill:#ffcc99
    style L1 fill:#99ff99
    style L2 fill:#99ff99
    style L3 fill:#99ff99
    style L4 fill:#99ff99
    style L5 fill:#99ff99
    style L6 fill:#99ff99
    style L7 fill:#99ff99
    style L8 fill:#99ff99
\`\`\``}
          </DiagramBlock>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>B+树的特点：</strong>
          </p>
          <ol className="list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-6 space-y-2">
            <li><strong>所有数据存储在叶子节点</strong>：非叶子节点只存储键值和指针，不存储实际数据</li>
            <li><strong>叶子节点形成链表</strong>：便于范围查询（如 BETWEEN、&gt;、&lt;）</li>
            <li><strong>树的高度低</strong>：通常 2-4 层即可存储千万级数据，每次查询只需 2-4 次磁盘 I/O</li>
            <li><strong>节点大小固定</strong>：InnoDB 默认页大小为 16KB，一个节点可存储大量键值</li>
          </ol>

          <Callout type="info" title="为什么不用 B 树或哈希表？">
            <strong>B 树</strong>：每个节点都存储数据，导致单个节点能存储的键值较少，树的高度增加，I/O 次数增多。<br/><br/>
            <strong>哈希表</strong>：虽然等值查询快（O(1)），但不支持范围查询和排序，且存在哈希冲突问题。<br/><br/>
            <strong>B+树</strong>：综合了 B 树和哈希表的优点，既支持高效等值查询，又支持范围查询和排序。
          </Callout>

          <h2 id="index-types" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、索引类型
          </h2>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">索引类型</th>
                <th className="text-left p-3 font-semibold text-ink">特点</th>
                <th className="text-left p-3 font-semibold text-ink">使用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">主键索引</td>
                <td className="p-3">聚簇索引，数据按主键顺序存储</td>
                <td className="p-3">每张表必须有，通常是自增 ID</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">唯一索引</td>
                <td className="p-3">索引列的值必须唯一，允许 NULL</td>
                <td className="p-3">邮箱、手机号、身份证号等</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">普通索引</td>
                <td className="p-3">最基本的索引，无限制</td>
                <td className="p-3">频繁查询的字段</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">联合索引</td>
                <td className="p-3">多个字段组成的索引，遵循最左前缀原则</td>
                <td className="p-3">多条件组合查询</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">全文索引</td>
                <td className="p-3">用于全文搜索，支持分词</td>
                <td className="p-3">文章内容、商品描述等</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">覆盖索引</td>
                <td className="p-3">索引包含查询所需的所有字段，无需回表</td>
                <td className="p-3">高频查询且字段较少</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`-- 示例表结构
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,       -- 主键索引（聚簇索引）
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,                  -- 唯一索引
    age INT,
    city VARCHAR(50),
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name),                      -- 普通索引
    INDEX idx_city_age (city, age)              -- 联合索引
);

-- 聚簇索引 vs 二级索引
-- 聚簇索引：叶子节点存储完整数据行
-- SELECT * FROM users WHERE id = 1;  -- 直接通过聚簇索引找到数据

-- 二级索引：叶子节点存储主键值，需要回表查询
-- SELECT * FROM users WHERE email = 'test@example.com';  
-- 1. 通过二级索引找到主键 id
-- 2. 通过主键在聚簇索引中查找完整数据（回表）

-- 覆盖索引：无需回表
-- SELECT id, email FROM users WHERE email = 'test@example.com';  
-- 直接从二级索引获取 id 和 email，无需回表`}
            language="sql"
            highlights={[3, 6, 10, 11]}
            filename="IndexTypes.sql"
            description="索引类型示例"
          />

          <SideNote label="最左前缀原则">
            联合索引 (city, age) 可以支持以下查询：<br/>
            ✅ WHERE city = '北京'<br/>
            ✅ WHERE city = '北京' AND age = 25<br/>
            ❌ WHERE age = 25（缺少最左列 city）<br/><br/>
            原因：B+树先按 city 排序，再按 age 排序。如果跳过 city 直接查 age，无法利用索引的有序性。
          </SideNote>

          <h2 id="execution-plan" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、执行计划分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">EXPLAIN</code> 是 SQL 优化的核心工具，用于查看 MySQL 如何执行查询语句。
          </p>

          <Playground
            code={`-- 使用 EXPLAIN 分析查询
EXPLAIN SELECT * FROM users WHERE city = '北京' AND age > 20;

-- 输出结果示例：
-- +----+-------------+-------+------------+------+---------------+--------------+---------+-------------+------+----------+-----------------------+
-- | id | select_type | table | partitions | type | possible_keys | key          | key_len | ref         | rows | filtered | Extra                 |
-- +----+-------------+-------+------------+------+---------------+--------------+---------+-------------+------+----------+-----------------------+
-- |  1 | SIMPLE      | users | NULL       | ref  | idx_city_age  | idx_city_age | 202     | const,const |  100 |    50.00 | Using index condition |
-- +----+-------------+-------+------------+------+---------------+--------------+---------+-------------+------+----------+-----------------------+`}
            language="sql"
            highlights={[1]}
            filename="ExplainExample.sql"
            description="EXPLAIN 使用示例"
          />

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>关键字段解读：</strong>
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">字段</th>
                <th className="text-left p-3 font-semibold text-ink">含义</th>
                <th className="text-left p-3 font-semibold text-ink">优化建议</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">type</td>
                <td className="p-3">访问类型（性能从高到低）</td>
                <td className="p-3">至少达到 range，最好达到 ref 或 eq_ref</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">key</td>
                <td className="p-3">实际使用的索引</td>
                <td className="p-3">确保使用了预期索引</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">rows</td>
                <td className="p-3">预估扫描行数</td>
                <td className="p-3">越少越好，超过 1000 需优化</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">Extra</td>
                <td className="p-3">额外信息</td>
                <td className="p-3">避免 Using filesort、Using temporary</td>
              </tr>
            </tbody>
          </table>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>type 字段详解（性能从高到低）：</strong>
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">type</th>
                <th className="text-left p-3 font-semibold text-ink">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-green">system</td>
                <td className="p-3">表只有一行记录（常量表）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-green">const</td>
                <td className="p-3">通过主键或唯一索引等值查询，最多返回一行</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-green">eq_ref</td>
                <td className="p-3">联表查询时使用主键或唯一索引</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-yellow">ref</td>
                <td className="p-3">使用普通索引等值查询</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-yellow">range</td>
                <td className="p-3">索引范围扫描（BETWEEN、&gt;、&lt;、IN）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-orange">index</td>
                <td className="p-3">全索引扫描（比全表扫描快）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-rose">ALL</td>
                <td className="p-3">全表扫描（性能最差，必须优化）</td>
              </tr>
            </tbody>
          </table>

          <Callout type="warning" title="Extra 字段的警示信号">
            <strong>Using filesort</strong>：需要额外的排序操作，无法利用索引排序。优化方法：添加合适的索引或使用覆盖索引。<br/><br/>
            <strong>Using temporary</strong>：需要创建临时表，常见于 GROUP BY、DISTINCT、UNION。优化方法：添加索引或改写查询。<br/><br/>
            <strong>Using index</strong>：✅ 好事！表示使用了覆盖索引，无需回表。<br/><br/>
            <strong>Using where</strong>：需要在存储引擎层过滤后，再在 Server 层过滤。如果能下推到存储引擎层更好。
          </Callout>

          <h2 id="index-optimization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、索引优化策略
          </h2>

          <h3 id="index-failure" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1. 索引失效场景
          </h3>

          <Playground
            code={`-- ❌ 场景1：对索引列进行函数运算
SELECT * FROM users WHERE YEAR(create_time) = 2024;
-- ✅ 优化：改为范围查询
SELECT * FROM users WHERE create_time >= '2024-01-01' AND create_time < '2025-01-01';

-- ❌ 场景2：对索引列进行类型转换
SELECT * FROM users WHERE phone = 13800138000;  -- phone 是 VARCHAR 类型
-- ✅ 优化：使用字符串
SELECT * FROM users WHERE phone = '13800138000';

-- ❌ 场景3：模糊查询以 % 开头
SELECT * FROM users WHERE name LIKE '%张三';
-- ✅ 优化：使用前缀匹配（如果业务允许）
SELECT * FROM users WHERE name LIKE '张三%';

-- ❌ 场景4：OR 连接的条件中有未索引的列
SELECT * FROM users WHERE name = '张三' OR age = 25;  -- age 无索引
-- ✅ 优化：为 age 添加索引，或使用 UNION
SELECT * FROM users WHERE name = '张三'
UNION
SELECT * FROM users WHERE age = 25;

-- ❌ 场景5：NOT、!=、<> 操作符
SELECT * FROM users WHERE name != '张三';
-- ✅ 优化：改为 IN 或范围查询
SELECT * FROM users WHERE name IN ('李四', '王五');

-- ❌ 场景6：联合索引违反最左前缀原则
-- 索引：idx_city_age (city, age)
SELECT * FROM users WHERE age = 25;  -- 缺少 city
-- ✅ 优化：添加 city 条件
SELECT * FROM users WHERE city = '北京' AND age = 25;

-- ❌ 场景7：IS NULL / IS NOT NULL（某些版本）
SELECT * FROM users WHERE name IS NULL;
-- ✅ 优化：尽量避免 NULL 值，使用默认值替代`}
            language="sql"
            highlights={[1, 7, 13, 19, 25, 31, 38]}
            filename="IndexFailure.sql"
            description="索引失效场景及优化"
          />

          <h3 id="covering-index" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2. 覆盖索引优化
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            覆盖索引是指查询的字段都在索引中，无需回表查询聚簇索引，可大幅提升性能。
          </p>

          <Playground
            code={`-- 创建联合索引
CREATE INDEX idx_city_age_name ON users(city, age, name);

-- ✅ 覆盖索引：查询字段都在索引中
SELECT city, age, name FROM users WHERE city = '北京' AND age > 20;
-- Extra: Using index（无需回表）

-- ❌ 非覆盖索引：需要回表查询 email
SELECT city, age, name, email FROM users WHERE city = '北京' AND age > 20;
-- Extra: Using index condition（需要回表）

-- 优化建议：如果 email 查询频率高，可将其加入索引
CREATE INDEX idx_city_age_name_email ON users(city, age, name, email);`}
            language="sql"
            highlights={[5, 9, 13]}
            filename="CoveringIndex.sql"
            description="覆盖索引优化示例"
          />

          <h3 id="index-selection" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3. 索引选择原则
          </h3>

          <ol className="list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-6 space-y-3">
            <li>
              <strong>选择性高的字段优先</strong>：如身份证号 &gt; 手机号 &gt; 姓名 &gt; 性别
            </li>
            <li>
              <strong>频繁查询的字段</strong>：WHERE、ORDER BY、GROUP BY、JOIN 中的字段
            </li>
            <li>
              <strong>联合索引字段顺序</strong>：等值查询字段在前，范围查询字段在后
            </li>
            <li>
              <strong>避免过多索引</strong>：每张表索引不超过 5 个，否则影响写性能
            </li>
            <li>
              <strong>定期清理无用索引</strong>：通过 performance_schema 或慢查询日志分析
            </li>
          </ol>

          <h2 id="common-problems" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、常见问题与解决
          </h2>

          <h3 id="deep-pagination" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1. 深分页问题
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当 LIMIT offset, size 中的 offset 很大时（如 LIMIT 100000, 10），MySQL 需要扫描前 100000 条记录然后丢弃，性能极差。
          </p>

          <Playground
            code={`-- ❌ 深分页：扫描 100010 条记录，丢弃前 100000 条
SELECT * FROM users ORDER BY id LIMIT 100000, 10;

-- ✅ 优化方案1：延迟关联（子查询优化）
SELECT * FROM users 
INNER JOIN (
    SELECT id FROM users ORDER BY id LIMIT 100000, 10
) AS tmp USING (id);
-- 子查询只扫描索引，不回表，性能提升 10 倍以上

-- ✅ 优化方案2：游标分页（推荐）
-- 记录上一页最后一条记录的 id
SELECT * FROM users WHERE id > 100000 ORDER BY id LIMIT 10;
-- 直接定位到起始位置，无需扫描前面的记录

-- ✅ 优化方案3：限制最大页数
-- 前端限制用户只能翻到第 100 页，避免恶意请求
if (page > 100) {
    page = 100;
}`}
            language="sql"
            highlights={[1, 5, 12, 18]}
            filename="DeepPagination.sql"
            description="深分页优化方案"
          />

          <h3 id="join-optimization" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2. JOIN 优化
          </h3>

          <Playground
            code={`-- ❌ 笛卡尔积：未指定 JOIN 条件
SELECT * FROM users, orders;

-- ❌ 驱动表选择不当
SELECT * FROM users u 
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.city = '北京';
-- 如果 users 表有 100 万条，orders 表有 1000 万条，性能很差

-- ✅ 优化1：确保 JOIN 字段有索引
ALTER TABLE orders ADD INDEX idx_user_id (user_id);

-- ✅ 优化2：小表驱动大表（MySQL 优化器会自动选择，但可手动提示）
SELECT * FROM orders o 
STRAIGHT_JOIN users u ON u.id = o.user_id  -- 强制 orders 为驱动表
WHERE o.create_time > '2024-01-01';

-- ✅ 优化3：减少 JOIN 表数量
-- 将多次 JOIN 拆分为多次单表查询，在应用层组装数据
List<User> users = userMapper.selectByCity('北京');
List<Long> userIds = users.stream().map(User::getId).collect(Collectors.toList());
List<Order> orders = orderMapper.selectByUserIds(userIds);`}
            language="sql"
            highlights={[1, 5, 11, 14, 21]}
            filename="JoinOptimization.sql"
            description="JOIN 优化示例"
          />

          <h3 id="group-by-optimization" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3. GROUP BY 优化
          </h3>

          <Playground
            code={`-- ❌ 未使用索引，需要文件排序
SELECT city, COUNT(*) FROM users GROUP BY city;
-- Extra: Using temporary; Using filesort

-- ✅ 优化：为 city 添加索引
CREATE INDEX idx_city ON users(city);
-- Extra: Using index（利用索引的有序性，无需排序）

-- ❌ GROUP BY + ORDER BY 不同字段
SELECT city, COUNT(*) as cnt FROM users GROUP BY city ORDER BY cnt DESC;
-- Extra: Using temporary; Using filesort

-- ✅ 优化：添加联合索引
CREATE INDEX idx_city ON users(city);
-- 或在应用层排序（数据量小时）`}
            language="sql"
            highlights={[1, 6, 10, 14]}
            filename="GroupByOptimization.sql"
            description="GROUP BY 优化示例"
          />

          <h2 id="slow-query" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、慢查询优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            慢查询是指执行时间超过阈值的 SQL 语句。MySQL 提供慢查询日志功能，用于捕获和分析慢查询。
          </p>

          <Playground
            code={`-- 1. 开启慢查询日志（my.cnf）
[mysqld]
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2  # 超过 2 秒的查询记录为慢查询

-- 2. 查看慢查询配置
SHOW VARIABLES LIKE 'slow_query%';
SHOW VARIABLES LIKE 'long_query_time';

-- 3. 分析慢查询日志
# 使用 mysqldumpslow 工具
mysqldumpslow -s t -t 10 /var/log/mysql/slow.log
# -s t: 按执行时间排序
# -t 10: 显示前 10 条

-- 4. 使用 pt-query-digest（Percona Toolkit）
pt-query-digest /var/log/mysql/slow.log

-- 5. 实时监控慢查询
SELECT * FROM information_schema.processlist 
WHERE TIME > 2 
AND COMMAND != 'Sleep';`}
            language="sql"
            highlights={[3, 5, 12, 17, 21]}
            filename="SlowQuery.sql"
            description="慢查询日志配置与分析"
          />

          <Callout type="tip" title="慢查询优化步骤">
            1. 开启慢查询日志，设置合理的阈值（如 1-2 秒）<br/>
            2. 定期分析慢查询日志，找出 Top 10 慢查询<br/>
            3. 使用 EXPLAIN 分析执行计划<br/>
            4. 优化索引、改写 SQL、调整表结构<br/>
            5. 验证优化效果，持续监控
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">误区</th>
                <th className="text-left p-3 font-semibold text-ink">真相</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">索引越多越好</td>
                <td className="p-3">索引会降低写性能，应平衡读写需求，每张表不超过 5 个索引</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">主键一定是自增 ID</td>
                <td className="p-3">UUID 也可作为主键，但会导致页分裂，性能较差</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">LIKE '%xxx%' 一定走索引</td>
                <td className="p-3">只有 LIKE 'xxx%'（前缀匹配）才能使用索引</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">COUNT(*) 比 COUNT(1) 慢</td>
                <td className="p-3">在 InnoDB 中两者性能相同，都是统计行数</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">ORDER BY 一定会排序</td>
                <td className="p-3">如果 ORDER BY 字段有索引，可直接利用索引的有序性</td>
              </tr>
            </tbody>
          </table>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: '为什么 MySQL 使用 B+树而不是 B 树或哈希表？',
                answer: 'B+树相比 B 树的优势：\n1. 所有数据存储在叶子节点，非叶子节点只存储键值，单个节点可存储更多键值，树的高度更低（2-4 层即可存储千万级数据）\n2. 叶子节点形成链表，便于范围查询（BETWEEN、>、<）\n3. 磁盘 I/O 次数更少（树高度低）\n\n哈希表的问题：\n1. 不支持范围查询和排序\n2. 存在哈希冲突问题\n3. 不适合磁盘存储（随机 I/O 多）\n\n因此，B+树综合了 B 树和哈希表的优点，既支持高效等值查询，又支持范围查询和排序，非常适合磁盘存储。'
              },
              {
                question: '什么是聚簇索引和二级索引？有什么区别？',
                answer: '聚簇索引（Clustered Index）：\n- InnoDB 的主键索引就是聚簇索引\n- 叶子节点存储完整的数据行\n- 数据按主键顺序物理存储\n- 每张表只有一个聚簇索引\n\n二级索引（Secondary Index）：\n- 非主键字段的索引\n- 叶子节点存储主键值（而非完整数据）\n- 查询时需要回表（通过主键在聚簇索引中查找完整数据）\n- 每张表可以有多个二级索引\n\n性能差异：聚簇索引查询无需回表，性能优于二级索引。因此，频繁查询的字段应尽量使用覆盖索引或减少回表次数。'
              },
              {
                question: '什么是最左前缀原则？举例说明。',
                answer: '最左前缀原则：联合索引 (a, b, c) 可以支持以下查询：\n✅ WHERE a = 1\n✅ WHERE a = 1 AND b = 2\n✅ WHERE a = 1 AND b = 2 AND c = 3\n❌ WHERE b = 2（缺少最左列 a）\n❌ WHERE c = 3（缺少最左列 a 和 b）\n\n原因：B+树先按 a 排序，再按 b 排序，最后按 c 排序。如果跳过 a 直接查 b，无法利用索引的有序性。\n\n例外情况：如果查询条件覆盖了索引的所有字段（覆盖索引），即使违反最左前缀原则也可能使用索引。'
              },
              {
                question: '如何优化深分页问题？',
                answer: '深分页问题：LIMIT 100000, 10 需要扫描前 100000 条记录然后丢弃，性能极差。\n\n优化方案：\n1. 延迟关联：SELECT * FROM users INNER JOIN (SELECT id FROM users ORDER BY id LIMIT 100000, 10) AS tmp USING (id)。子查询只扫描索引，不回表，性能提升 10 倍以上。\n2. 游标分页：SELECT * FROM users WHERE id > 100000 ORDER BY id LIMIT 10。直接定位到起始位置，无需扫描前面的记录。\n3. 限制最大页数：前端限制用户只能翻到第 100 页，避免恶意请求。\n\n推荐使用游标分页，性能最优且实现简单。'
              },
              {
                question: 'EXPLAIN 输出中 type 字段有哪些值？性能从高到低排序。',
                answer: 'type 字段表示访问类型，性能从高到低：\n1. system：表只有一行记录（常量表）\n2. const：通过主键或唯一索引等值查询，最多返回一行\n3. eq_ref：联表查询时使用主键或唯一索引\n4. ref：使用普通索引等值查询\n5. range：索引范围扫描（BETWEEN、>、<、IN）\n6. index：全索引扫描（比全表扫描快）\n7. ALL：全表扫描（性能最差，必须优化）\n\n优化目标：至少达到 range，最好达到 ref 或 eq_ref。如果出现 ALL，必须添加索引或改写 SQL。'
              },
              {
                question: '什么情况下索引会失效？',
                answer: '索引失效的常见场景：\n1. 对索引列进行函数运算：WHERE YEAR(create_time) = 2024\n2. 对索引列进行类型转换：WHERE phone = 13800138000（phone 是 VARCHAR）\n3. 模糊查询以 % 开头：WHERE name LIKE \'%张三\'\n4. OR 连接的条件中有未索引的列\n5. NOT、!=、<> 操作符\n6. 联合索引违反最左前缀原则\n7. IS NULL / IS NOT NULL（某些版本）\n\n优化方法：避免对索引列进行运算，使用范围查询替代函数运算，确保 OR 两边的字段都有索引，遵循最左前缀原则。'
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <a href="/docs/07-database/jdbc" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">前置知识 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">JDBC 底层原理</div>
              <div className="text-[12px] text-ink-muted mt-1">SQL 执行的基础</div>
            </a>
            <a href="/docs/07-database/mybatis" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">MyBatis SQL映射</div>
              <div className="text-[12px] text-ink-muted mt-1">ORM 框架中的 SQL 优化</div>
            </a>
            <a href="/docs/04-jvm/jvm-tuning" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">JVM 调优实战</div>
              <div className="text-[12px] text-ink-muted mt-1">全链路性能优化</div>
            </a>
            <a href="/docs/08-microservices/distributed-transaction" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">进阶知识 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">分布式事务</div>
              <div className="text-[12px] text-ink-muted mt-1">分布式环境下的性能优化</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            SQL 优化是后端工程师的核心技能，建议重点掌握：① B+树原理和索引类型；② EXPLAIN 执行计划分析；③ 索引失效场景和优化策略；④ 深分页、JOIN、GROUP BY 等常见问题的解决方案。可以通过 MySQL 官方文档和《高性能 MySQL》深入学习。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
