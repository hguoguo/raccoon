import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'core-concepts', text: '一、核心概念', level: 2 },
  { id: 'hive-architecture', text: '1.1 Hive架构', level: 3 },
  { id: 'metastore', text: '1.2 Metastore元数据存储', level: 3 },
  { id: 'hql-basics', text: '二、HQL基础语法', level: 2 },
  { id: 'ddl', text: '2.1 DDL数据定义', level: 3 },
  { id: 'dml', text: '2.2 DML数据操作', level: 3 },
  { id: 'query', text: '2.3 查询语句', level: 3 },
  { id: 'partition-bucket', text: '三、分区与分桶', level: 2 },
  { id: 'partition-table', text: '3.1 分区表', level: 3 },
  { id: 'bucket-table', text: '3.2 分桶表', level: 3 },
  { id: 'udf', text: '四、UDF自定义函数', level: 2 },
  { id: 'udf-types', text: '4.1 UDF类型', level: 3 },
  { id: 'custom-udf', text: '4.2 自定义UDF开发', level: 3 },
  { id: 'optimization', text: '五、性能优化', level: 2 },
  { id: 'execution-plan', text: '5.1 执行计划分析', level: 3 },
  { id: 'optimize-strategies', text: '5.2 优化策略', level: 3 },
  { id: 'misconceptions', text: '六、常见误区', level: 2 },
  { id: 'interview', text: '七、面试真题', level: 2 },
  { id: 'comparison', text: '八、Hive vs Spark SQL', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function HiveDataWarehouse({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Hive 是一个基于 Hadoop 的<strong className="text-accent">数据仓库工具</strong>，提供类 SQL 查询语言（HQL），
              将 SQL 语句转换为 MapReduce/Tez/Spark 任务执行，使不熟悉编程的数据分析师也能处理海量数据。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 Hive？">
            在大数据时代，传统 RDBMS 无法处理 PB 级数据。Hive 通过 HQL 降低了大数据处理门槛，让数据分析师使用熟悉的 SQL 语法即可进行数据分析，无需编写复杂的 MapReduce 程序。
          </Callout>

          <h2 id="core-concepts" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、核心概念
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Hive 建立在 Hadoop HDFS 之上，提供数据仓库功能。它将结构化数据映射为表，通过 HQL 进行查询和分析，底层自动转换为分布式计算任务。
          </p>

          <h3 id="hive-architecture" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.1 Hive架构
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Hive 采用客户端-服务器架构，主要组件包括：Driver（驱动器）、Compiler（编译器）、Optimizer（优化器）、Executor（执行器）和 Metastore（元数据存储）。
          </p>

          <DiagramBlock title="Hive 架构图">
            {`graph TB
    Client[HQL Client] --> Driver[Driver 驱动器]
    Driver --> Compiler[Compiler 编译器]
    Compiler --> Optimizer[Optimizer 优化器]
    Optimizer --> Executor[Executor 执行器]
    
    Executor --> MR[MapReduce/Tez/Spark]
    Executor --> HDFS[HDFS 存储]
    
    Driver -.-> Metastore[(Metastore<br/>元数据存储)]
    
    style Client fill:#e1f5ff
    style Driver fill:#fff4e6
    style Metastore fill:#f3e5f5`}
          </DiagramBlock>

          <SideNote label="架构要点">
            <ul className="space-y-2 text-sm">
              <li><strong>Driver：</strong>接收 HQL 语句，协调各组件工作</li>
              <li><strong>Compiler：</strong>解析 HQL，生成抽象语法树（AST）</li>
              <li><strong>Optimizer：</strong>优化执行计划，如谓词下推、列裁剪</li>
              <li><strong>Executor：</strong>提交任务到 YARN，监控执行状态</li>
              <li><strong>Metastore：</strong>存储表结构、分区信息等元数据</li>
            </ul>
          </SideNote>

          <h3 id="metastore" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.2 Metastore元数据存储
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Metastore 是 Hive 的核心组件，存储所有表的元数据信息，包括表名、字段、数据类型、分区信息、存储位置等。默认使用 Derby 数据库，生产环境推荐使用 MySQL。
          </p>

          <Playground
            code={`# Metastore 配置（hive-site.xml）
<property>
    <name>javax.jdo.option.ConnectionURL</name>
    <value>jdbc:mysql://localhost:3306/hive_metastore?createDatabaseIfNotExist=true</value>
</property>
<property>
    <name>javax.jdo.option.ConnectionDriverName</name>
    <value>com.mysql.jdbc.Driver</value>
</property>
<property>
    <name>javax.jdo.option.ConnectionUserName</name>
    <value>hive</value>
</property>
<property>
    <name>javax.jdo.option.ConnectionPassword</name>
    <value>hive_password</value>
</property>`}
            language="xml"
            description="Metastore MySQL 连接配置"
          />

          <Callout type="warning" title="Metastore 高可用">
            生产环境必须配置 Metastore 高可用，避免单点故障。可以使用 MySQL 主从复制 + Keepalived，或使用云服务商提供的托管 Metastore 服务。
          </Callout>

          <h2 id="hql-basics" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、HQL基础语法
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HQL（Hive Query Language）语法与标准 SQL 高度兼容，支持 DDL、DML、DQL 等操作。掌握 HQL 是使用 Hive 的基础。
          </p>

          <h3 id="ddl" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 DDL数据定义
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            DDL（Data Definition Language）用于定义和管理表结构，包括创建、修改、删除表等操作。
          </p>

          <Playground
            code={`-- 创建内部表
CREATE TABLE IF NOT EXISTS employees (
    id INT COMMENT '员工ID',
    name STRING COMMENT '姓名',
    age INT COMMENT '年龄',
    department STRING COMMENT '部门',
    salary DOUBLE COMMENT '薪资'
)
COMMENT '员工信息表'
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE;

-- 创建外部表
CREATE EXTERNAL TABLE IF NOT EXISTS logs (
    log_time STRING,
    level STRING,
    message STRING
)
LOCATION '/user/hive/warehouse/logs';

-- 查看表结构
DESCRIBE FORMATTED employees;

-- 删除表
DROP TABLE IF EXISTS employees;`}
            language="sql"
            description="DDL 数据定义语言示例"
          />

          <SideNote label="内部表 vs 外部表">
            <ul className="space-y-2 text-sm">
              <li><strong>内部表：</strong>Hive 管理数据和元数据，删除表时数据和元数据都被删除</li>
              <li><strong>外部表：</strong>Hive 只管理元数据，删除表时只删除元数据，数据保留在 HDFS</li>
              <li><strong>建议：</strong>原始数据使用外部表，中间结果使用内部表</li>
            </ul>
          </SideNote>

          <h3 id="dml" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 DML数据操作
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            DML（Data Manipulation Language）用于数据的插入、更新、删除操作。Hive 适合批量加载，不适合频繁的单条记录操作。
          </p>

          <Playground
            code={`-- 从本地文件加载数据
LOAD DATA LOCAL INPATH '/home/data/employees.csv' 
OVERWRITE INTO TABLE employees;

-- 从 HDFS 加载数据
LOAD DATA INPATH '/user/data/employees.csv' 
INTO TABLE employees;

-- INSERT 插入数据
INSERT INTO TABLE employees 
VALUES (1, '张三', 25, '技术部', 15000.0);

-- INSERT OVERWRITE 覆盖写入
INSERT OVERWRITE TABLE employees 
SELECT * FROM employees_temp;

-- 多表插入
FROM source_table
INSERT INTO TABLE table1 SELECT col1, col2 WHERE condition1
INSERT INTO TABLE table2 SELECT col3, col4 WHERE condition2;`}
            language="sql"
            description="DML 数据操作语言示例"
          />

          <Callout type="info" title="LOAD DATA 原理">
            LOAD DATA 本质上是文件的移动操作（mv），不涉及数据解析和转换，因此速度极快。如果源文件在 HDFS 上，则是重命名操作；如果在本地文件系统，则是上传操作。
          </Callout>

          <h3 id="query" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.3 查询语句
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HQL 查询语法与 SQL 基本一致，支持 SELECT、WHERE、GROUP BY、ORDER BY、JOIN 等常用操作。
          </p>

          <Playground
            code={`-- 基本查询
SELECT name, salary 
FROM employees 
WHERE department = '技术部' 
  AND salary > 10000;

-- 聚合查询
SELECT department, 
       COUNT(*) as emp_count,
       AVG(salary) as avg_salary,
       MAX(salary) as max_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;

-- JOIN 查询
SELECT e.name, d.department_name
FROM employees e
JOIN departments d ON e.department = d.department_id;

-- 子查询
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- 窗口函数
SELECT name, department, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees;`}
            language="sql"
            description="HQL 查询语句示例"
          />

          <h2 id="partition-bucket" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、分区与分桶
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            分区和分桶是 Hive 优化的重要手段，通过合理组织数据存储结构，可以大幅提升查询性能。
          </p>

          <h3 id="partition-table" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 分区表
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            分区表将数据按照某个字段的值划分为不同的目录，查询时可以通过分区裁剪（Partition Pruning）跳过无关分区，减少扫描数据量。
          </p>

          <Playground
            code={`-- 创建分区表
CREATE TABLE orders (
    order_id INT,
    user_id INT,
    amount DOUBLE
)
PARTITIONED BY (dt STRING, region STRING)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

-- 加载数据到指定分区
LOAD DATA LOCAL INPATH '/data/orders_20240101_beijing.csv' 
INTO TABLE orders PARTITION (dt='2024-01-01', region='beijing');

LOAD DATA LOCAL INPATH '/data/orders_20240101_shanghai.csv' 
INTO TABLE orders PARTITION (dt='2024-01-01', region='shanghai');

-- 查询指定分区（触发分区裁剪）
SELECT * FROM orders 
WHERE dt = '2024-01-01' 
  AND region = 'beijing';

-- 查看分区
SHOW PARTITIONS orders;

-- 添加分区
ALTER TABLE orders ADD PARTITION (dt='2024-01-02', region='beijing');

-- 删除分区
ALTER TABLE orders DROP PARTITION (dt='2024-01-01', region='beijing');`}
            language="sql"
            description="分区表操作示例"
          />

          <DiagramBlock title="分区表目录结构">
            {`graph LR
    Root[/orders/] --> P1[dt=2024-01-01]
    Root --> P2[dt=2024-01-02]
    
    P1 --> R1[region=beijing]
    P1 --> R2[region=shanghai]
    P2 --> R3[region=beijing]
    
    R1 --> F1[data1.csv]
    R2 --> F2[data2.csv]
    R3 --> F3[data3.csv]
    
    style Root fill:#e1f5ff
    style P1 fill:#fff4e6
    style P2 fill:#fff4e6`}
          </DiagramBlock>

          <SideNote label="分区最佳实践">
            <ul className="space-y-2 text-sm">
              <li><strong>选择分区字段：</strong>高频查询条件、数据分布均匀、基数适中</li>
              <li><strong>避免过多分区：</strong>单个分区文件大小应 &gt; 128MB（一个 HDFS Block）</li>
              <li><strong>动态分区：</strong>使用 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">SET hive.exec.dynamic.partition=true</code></li>
              <li><strong>静态分区：</strong>手动指定分区值，适合已知分区场景</li>
            </ul>
          </SideNote>

          <h3 id="bucket-table" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 分桶表
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            分桶表将数据按照某个字段的哈希值分散到固定数量的桶（文件）中，适合抽样查询和 Map-Side Join 优化。
          </p>

          <Playground
            code={`-- 创建分桶表
CREATE TABLE users_bucketed (
    user_id INT,
    name STRING,
    age INT
)
CLUSTERED BY (user_id) INTO 4 BUCKETS
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

-- 启用分桶插入
SET hive.enforce.bucketing = true;

-- 插入数据（自动分桶）
INSERT INTO TABLE users_bucketed
SELECT user_id, name, age FROM users_source;

-- 抽样查询（TABLESAMPLE）
SELECT * FROM users_bucketed TABLESAMPLE(BUCKET 1 OUT OF 4 ON user_id);

-- 分桶 + 分区组合
CREATE TABLE orders_bucketed (
    order_id INT,
    user_id INT,
    amount DOUBLE
)
PARTITIONED BY (dt STRING)
CLUSTERED BY (user_id) INTO 8 BUCKETS;`}
            language="sql"
            description="分桶表操作示例"
          />

          <Callout type="tip" title="分桶的优势">
            <ul className="space-y-1 text-sm">
              <li><strong>抽样查询：</strong>快速抽取部分数据进行测试</li>
              <li><strong>Map-Side Join：</strong>两个表按相同字段分桶且桶数成倍数关系时，可进行高效的 Map-Side Join</li>
              <li><strong>数据倾斜优化：</strong>将热点数据分散到多个桶中</li>
            </ul>
          </Callout>

          <h2 id="udf" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、UDF自定义函数
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当内置函数无法满足需求时，可以通过 UDF（User Defined Function）扩展 Hive 的功能。Hive 支持三种类型的自定义函数。
          </p>

          <h3 id="udf-types" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 UDF类型
          </h3>

          <table className="w-full border-collapse my-4 text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left">类型</th>
                <th className="border border-border-light px-3 py-2 text-left">说明</th>
                <th className="border border-border-light px-3 py-2 text-left">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono text-xs">UDF</td>
                <td className="border border-border-light px-3 py-2">一对一输入输出</td>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">upper()</code>, <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">substring()</code></td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono text-xs">UDAF</td>
                <td className="border border-border-light px-3 py-2">多对一输入输出（聚合）</td>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">count()</code>, <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">sum()</code></td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono text-xs">UDTF</td>
                <td className="border border-border-light px-3 py-2">一对多输入输出（表生成）</td>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">explode()</code>, <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">json_tuple()</code></td>
              </tr>
            </tbody>
          </table>

          <h3 id="custom-udf" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 自定义UDF开发
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            开发自定义 UDF 需要继承 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">org.apache.hadoop.hive.ql.exec.UDF</code> 类，实现 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">evaluate()</code> 方法。
          </p>

          <Playground
            code={`// 自定义 UDF：格式化手机号
package com.example.hive.udf;

import org.apache.hadoop.hive.ql.exec.UDF;
import org.apache.hadoop.io.Text;

public class FormatPhoneUDF extends UDF {
    
    public Text evaluate(Text phone) {
        if (phone == null || phone.toString().length() != 11) {
            return null;
        }
        
        String p = phone.toString();
        // 格式：138****1234
        String formatted = p.substring(0, 3) + "****" + p.substring(7);
        return new Text(formatted);
    }
}

// 注册和使用 UDF
ADD JAR /path/to/hive-udf.jar;
CREATE TEMPORARY FUNCTION format_phone AS 'com.example.hive.udf.FormatPhoneUDF';

SELECT name, format_phone(phone) FROM users;`}
            language="java"
            description="自定义 UDF 开发示例"
          />

          <SideNote label="UDF 开发步骤">
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li>编写 Java 类，继承 UDF/UDAF/UDTF</li>
              <li>打包为 JAR 文件</li>
              <li>使用 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">ADD JAR</code> 添加到 Hive 会话</li>
              <li>使用 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">CREATE FUNCTION</code> 注册函数</li>
              <li>在 HQL 中调用自定义函数</li>
            </ol>
          </SideNote>

          <h2 id="optimization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、性能优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Hive 性能优化涉及多个层面，包括 SQL 写法、参数调优、数据模型设计等。合理的优化可以将查询时间从小时级降低到分钟级。
          </p>

          <h3 id="execution-plan" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 执行计划分析
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            使用 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">EXPLAIN</code> 命令查看 HQL 的执行计划，了解查询如何被转换为 MapReduce 任务。
          </p>

          <Playground
            code={`EXPLAIN EXTENDED
SELECT department, COUNT(*) as cnt
FROM employees
WHERE age > 25
GROUP BY department
HAVING cnt > 5;`}
            language="sql"
            description="查看执行计划"
          />

          <h3 id="optimize-strategies" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 优化策略
          </h3>

          <table className="w-full border-collapse my-4 text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left">优化策略</th>
                <th className="border border-border-light px-3 py-2 text-left">说明</th>
                <th className="border border-border-light px-3 py-2 text-left">配置参数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">列裁剪</td>
                <td className="border border-border-light px-3 py-2">只读取需要的列，减少 I/O</td>
                <td className="border border-border-light px-3 py-2 font-mono text-xs">hive.optimize.cp=true</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">谓词下推</td>
                <td className="border border-border-light px-3 py-2">尽早过滤数据，减少传输量</td>
                <td className="border border-border-light px-3 py-2 font-mono text-xs">hive.optimize.ppd=true</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">Map-Side Join</td>
                <td className="border border-border-light px-3 py-2">小表加载到内存，避免 Shuffle</td>
                <td className="border border-border-light px-3 py-2 font-mono text-xs">hive.auto.convert.join=true</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">并行执行</td>
                <td className="border border-border-light px-3 py-2">无依赖的 Stage 并行执行</td>
                <td className="border border-border-light px-3 py-2 font-mono text-xs">hive.exec.parallel=true</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">JVM 重用</td>
                <td className="border border-border-light px-3 py-2">减少 JVM 启动开销</td>
                <td className="border border-border-light px-3 py-2 font-mono text-xs">mapreduce.job.jvm.numtasks=10</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">压缩</td>
                <td className="border border-border-light px-3 py-2">减少网络传输和存储</td>
                <td className="border border-border-light px-3 py-2 font-mono text-xs">hive.exec.compress.output=true</td>
              </tr>
            </tbody>
          </table>

          <Callout type="warning" title="数据倾斜优化">
            <strong>问题：</strong>某些 Key 的数据量远大于其他 Key，导致个别 Reduce 任务执行时间过长。<br/><br/>
            <strong>解决方案：</strong>
            <ul className="mt-2 space-y-1 ml-4">
              <li>开启负载均衡：<code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">SET hive.groupby.skewindata=true</code></li>
              <li>对倾斜 Key 加随机前缀，分散到不同 Reduce</li>
              <li>使用 Map-Side Join 避免 Shuffle</li>
            </ul>
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、常见误区
          </h2>

          <table className="w-full border-collapse my-4 text-sm">
            <thead>
              <tr className="bg-red-50">
                <th className="border border-border-light px-3 py-2 text-left">误区</th>
                <th className="border border-border-light px-3 py-2 text-left">正确理解</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2">Hive 是数据库</td>
                <td className="border border-border-light px-3 py-2">Hive 是数据仓库工具，不支持实时读写和事务（早期版本），适合离线批处理</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">HQL 完全等同于 SQL</td>
                <td className="border border-border-light px-3 py-2">HQL 不支持某些 SQL 特性（如 UPDATE/DELETE 在早期版本），且执行引擎不同导致性能差异</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">分区越多越好</td>
                <td className="border border-border-light px-3 py-2">过多分区会产生大量小文件，增加 NameNode 负担，降低查询性能</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">COUNT(*) 很慢</td>
                <td className="border border-border-light px-3 py-2">Hive 2.x+ 使用向量化执行和 ORC 格式，COUNT(*) 可以从元数据直接获取，速度很快</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">Hive 不适合即席查询</td>
                <td className="border border-border-light px-3 py-2">配合 Tez/Spark 引擎和 LLAP（Live Long and Process），Hive 可以支持亚秒级响应</td>
              </tr>
            </tbody>
          </table>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "Hive 的内部表和外部表有什么区别？",
                answer: "内部表（Managed Table）由 Hive 管理数据和元数据，删除表时数据和元数据都被删除；外部表（External Table）Hive 只管理元数据，删除表时只删除元数据，数据保留在 HDFS。建议原始数据使用外部表，避免误删；中间结果使用内部表，便于管理。"
              },
              {
                question: "Hive 如何解决数据倾斜问题？",
                answer: "数据倾斜指某些 Key 的数据量远大于其他 Key。解决方案：① 开启负载均衡 SET hive.groupby.skewindata=true；② 对倾斜 Key 加随机前缀分散到不同 Reduce；③ 使用 Map-Side Join 避免 Shuffle；④ 调整 Reduce 数量 SET mapreduce.job.reduces=N；⑤ 使用 SALTED JOIN 技术。"
              },
              {
                question: "Hive 的分区和分桶有什么区别？",
                answer: "分区是按字段值将数据划分到不同目录，适合范围查询和分区裁剪；分桶是按字段哈希值将数据分散到固定数量的文件，适合抽样查询和 Map-Side Join。分区是粗粒度，分桶是细粒度，两者可以组合使用。"
              },
              {
                question: "Hive 执行 HQL 的过程是怎样的？",
                answer: "① Driver 接收 HQL；② Compiler 解析生成 AST；③ Optimizer 优化执行计划（谓词下推、列裁剪等）；④ Executor 提交任务到 YARN；⑤ MapReduce/Tez/Spark 执行计算；⑥ 返回结果。整个过程涉及元数据查询、SQL 解析、优化、分布式执行等多个阶段。"
              },
              {
                question: "Hive 有哪些性能优化手段？",
                answer: "① 合理使用分区和分桶；② 启用 Map-Side Join；③ 开启并行执行；④ 使用列式存储（ORC/Parquet）+ 压缩（Snappy）；⑤ 避免 SELECT *，使用列裁剪；⑥ 尽早过滤数据（谓词下推）；⑦ JVM 重用；⑧ 调整 Map/Reduce 数量；⑨ 使用 Explain 分析执行计划。"
              },
              {
                question: "Hive 中的 UDF、UDAF、UDTF 有什么区别？",
                answer: "UDF（User Defined Function）是一对一函数，如 upper()；UDAF（User Defined Aggregation Function）是多对一聚合函数，如 count()；UDTF（User Defined Table-generating Function）是一对多表生成函数，如 explode()。开发时需继承不同的基类并实现相应方法。"
              },
              {
                question: "Hive 如何处理小文件问题？",
                answer: "小文件会增加 NameNode 负担，降低查询性能。解决方案：① 合并小文件 SET hive.merge.mapfiles=true；② 使用 CombineHiveInputFormat；③ 调整 Map 数量；④ 定期运行 ALTER TABLE CONCATENATE；⑤ 使用 HAR（Hadoop Archive）归档；⑥ 从源头控制，避免产生过多小文件。"
              }
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、Hive vs Spark SQL
          </h2>

          <table className="w-full border-collapse my-4 text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left">维度</th>
                <th className="border border-border-light px-3 py-2 text-left">Hive</th>
                <th className="border border-border-light px-3 py-2 text-left">Spark SQL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">执行引擎</td>
                <td className="border border-border-light px-3 py-2">MapReduce/Tez</td>
                <td className="border border-border-light px-3 py-2">Spark（内存计算）</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">性能</td>
                <td className="border border-border-light px-3 py-2">较慢（磁盘 I/O 多）</td>
                <td className="border border-border-light px-3 py-2">快 10-100 倍（内存迭代）</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">延迟</td>
                <td className="border border-border-light px-3 py-2">分钟~小时级</td>
                <td className="border border-border-light px-3 py-2">秒~分钟级</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">适用场景</td>
                <td className="border border-border-light px-3 py-2">离线批处理、ETL</td>
                <td className="border border-border-light px-3 py-2">交互式查询、迭代计算</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">元数据</td>
                <td className="border border-border-light px-3 py-2">独立 Metastore</td>
                <td className="border border-border-light px-3 py-2">可复用 Hive Metastore</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">生态集成</td>
                <td className="border border-border-light px-3 py-2">Hadoop 生态</td>
                <td className="border border-border-light px-3 py-2">Spark 生态（MLlib、GraphX）</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="选型建议">
            <strong>使用 Hive：</strong>大规模离线 ETL、历史数据分析、对延迟不敏感的场景。<br/>
            <strong>使用 Spark SQL：</strong>交互式查询、迭代算法、机器学习、需要低延迟的场景。<br/>
            <strong>混合使用：</strong>很多公司同时使用两者，Hive 负责离线批处理，Spark SQL 负责即席查询。
          </Callout>

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Hive 作为大数据生态的重要组件，与多个知识点紧密相关：
          </p>

          <ul className="space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
            <li>📌 <strong>Hadoop 生态系统</strong>：Hive 建立在 Hadoop 之上，依赖 HDFS 存储和 YARN 资源调度</li>
            <li>📌 <strong>Elasticsearch</strong>：Hive 适合离线批处理，ES 适合实时检索，两者常结合使用</li>
            <li>📌 <strong>Spark 分布式计算</strong>：Hive on Spark 提升查询性能，Spark SQL 可与 Hive 共享元数据</li>
            <li>📌 <strong>实时数仓架构设计</strong>：Hive 是 Lambda 架构的批处理层核心组件</li>
            <li>📌 <strong>SQL 优化</strong>：HQL 优化技巧与关系型数据库 SQL 优化有共通之处</li>
          </ul>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，禁止用 <aside> 包裹！组件自行管理桌面/移动端显隐 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
