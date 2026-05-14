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
  { id: 'overview', text: '扩展生态概览', level: 2 },
  { id: 'postgis', text: 'PostGIS地理信息系统', level: 3 },
  { id: 'pgvector', text: 'pgvector向量数据库', level: 3 },
  { id: 'timescaledb', text: 'TimescaleDB时序数据库', level: 3 },
  { id: 'citus', text: 'Citus分布式数据库', level: 3 },
  { id: 'fdw', text: '外部数据包装器(FDW)', level: 3 },
  { id: 'plugin-development', text: '插件开发基础', level: 2 },
  { id: 'source-code', text: '源码分析', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比其他方案', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function PostgreSqlExtensions({ meta }: { meta: KnowledgeNode }) {
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
              PostgreSQL 扩展生态是一个丰富的插件系统，通过 PostGIS、pgvector、TimescaleDB、Citus 等扩展，使 PostgreSQL 具备地理信息系统、向量数据库、时序数据处理和分布式计算等高级能力，成为真正的多模态数据库平台。
            </blockquote>
            <SideNote label="为什么 PostgreSQL 扩展如此强大？">
              PostgreSQL 的扩展机制基于其模块化架构设计，允许开发者在不修改核心代码的情况下添加新功能。这种设计理念使得 PostgreSQL 能够适应各种垂直领域的需求，从 GIS 到 AI，从 IoT 到大数据分析。
            </SideNote>
          </section>

          {/* 扩展生态概览 */}
          <section id="overview" className="mb-8">
            <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              扩展生态概览
            </h2>
            <DiagramBlock title="PostgreSQL 扩展生态系统">
              {`graph TD
                PG["PostgreSQL Core"] --> EXT["Extension Framework"]
                EXT --> POSTGIS["PostGIS<br/>地理信息系统"]
                EXT --> PGVECTOR["pgvector<br/>向量数据库"]
                EXT --> TIMESCALE["TimescaleDB<br/>时序数据库"]
                EXT --> CITUS["Citus<br/>分布式数据库"]
                EXT --> FDW["FDW<br/>外部数据包装器"]
                EXT --> OTHER["其他扩展<br/>ltree, hstore, uuid-ossp..."]
                
                POSTGIS --> APPS1["地图应用<br/>位置服务<br/>空间分析"]
                PGVECTOR --> APPS2["AI向量搜索<br/>语义检索<br/>推荐系统"]
                TIMESCALE --> APPS3["IoT监控<br/>金融时序<br/>日志分析"]
                CITUS --> APPS4["水平扩展<br/>实时分析<br/>多租户"]
                FDW --> APPS5["跨库查询<br/>数据联邦<br/>ETL集成"]
              `}
            </DiagramBlock>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              PostgreSQL 的扩展生态包含以下主要类别：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong className="text-ink">地理信息扩展</strong>：PostGIS 提供完整的 GIS 功能</li>
              <li><strong className="text-ink">向量数据库扩展</strong>：pgvector 支持 AI 向量存储和检索</li>
              <li><strong className="text-ink">时序数据扩展</strong>：TimescaleDB 优化时间序列数据处理</li>
              <li><strong className="text-ink">分布式扩展</strong>：Citus 实现水平扩展和分布式查询</li>
              <li><strong className="text-ink">数据集成扩展</strong>：FDW 支持跨数据库查询</li>
              <li><strong className="text-ink">实用工具扩展</strong>：提供各种辅助功能</li>
            </ul>
          </section>

          {/* 核心扩展详解 */}
          <section id="core-extensions" className="mb-8">
            <h2 id="core-extensions" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              核心扩展详解
            </h2>

            <h3 id="postgis" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              PostGIS地理信息系统
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              PostGIS 是 PostgreSQL 最知名的扩展，为数据库添加了地理空间数据处理能力：
            </p>

            <ContextSwitcher
              simpleContent={
                <div>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                    <strong>PostGIS 基本功能</strong>：存储空间数据（点、线、面），执行空间查询（距离、相交、包含等），进行空间分析（缓冲区、叠加分析等）。
                  </p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                    <strong>应用场景</strong>：地图服务、位置推荐、物流路径规划、城市规划、环境监测等。
                  </p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                    <strong>优势</strong>：符合 OGC 标准，支持多种坐标系，性能优异，社区活跃。
                  </p>
                </div>
              }
              hardcoreContent={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-ink mb-2">PostGIS 核心数据类型</h4>
                    <Playground
                      code={`-- 安装 PostGIS 扩展
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;  -- 拓扑支持
CREATE EXTENSION postgis_raster;    -- 栅格数据支持

-- 空间数据类型
POINT: 点坐标 (lon, lat)
LINESTRING: 线串 (多个点连接)
POLYGON: 多边形 (闭合区域)
MULTIPOINT, MULTILINESTRING, MULTIPOLYGON: 集合类型
GEOMETRYCOLLECTION: 几何集合

-- 创建空间表
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    geom GEOMETRY(Point, 4326)  -- WGS84 坐标系
);

-- 插入空间数据
INSERT INTO cities (name, geom) VALUES 
('Beijing', ST_GeomFromText('POINT(116.4074 39.9042)', 4326)),
('Shanghai', ST_GeomFromText('POINT(121.4737 31.2304)', 4326));

-- 空间查询：查找距离北京 500km 内的城市
SELECT name, ST_Distance(geom, 
    ST_GeomFromText('POINT(116.4074 39.9042)', 4326)::geography) as distance_km
FROM cities
WHERE ST_DWithin(geom::geography, 
    ST_GeomFromText('POINT(116.4074 39.9042)', 4326)::geography, 
    500000);  -- 500km = 500000m`}
                      language="sql"
                      description="PostGIS 空间数据类型和基本操作"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink mb-2">空间索引与优化</h4>
                    <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                      <strong>GIST 索引</strong>：PostGIS 使用 GiST（Generalized Search Tree）索引加速空间查询。
                    </p>
                    <Playground
                      code={`-- 创建空间索引
CREATE INDEX idx_cities_geom ON cities USING GIST (geom);

-- 复杂空间查询示例
-- 查找与指定区域相交的所有建筑物
SELECT b.name, b.area
FROM buildings b
JOIN zones z ON ST_Intersects(b.geom, z.geom)
WHERE z.name = 'Commercial Zone';

-- 空间聚合：计算每个区域的总面积
SELECT z.name, SUM(ST_Area(b.geom)) as total_area
FROM buildings b
JOIN zones z ON ST_Within(b.geom, z.geom)
GROUP BY z.name;

-- 性能优化提示
-- 1. 使用 bounding box 预过滤
-- 2. 适当简化几何体（ST_Simplify）
-- 3. 分区大表（按地理区域）
-- 4. 缓存常用查询结果`}
                      language="sql"
                      description="PostGIS 空间索引和查询优化"
                    />
                  </div>
                </div>
              }
            />

            <h3 id="pgvector" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              pgvector向量数据库
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              pgvector 是 PostgreSQL 的向量相似度搜索扩展，为 AI 应用提供向量存储和检索能力：
            </p>

            <Playground
              code={`-- 安装 pgvector 扩展
CREATE EXTENSION vector;

-- 创建向量表
CREATE TABLE embeddings (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding vector(1536)  -- OpenAI embedding 维度
);

-- 插入向量数据
INSERT INTO embeddings (content, embedding) VALUES 
('PostgreSQL is a powerful database', '[0.1, 0.2, ..., 0.9]'),
('Machine learning models need data', '[0.3, 0.4, ..., 0.8]');

-- 向量相似度搜索（余弦相似度）
SELECT content, 1 - (embedding <=> '[0.1, 0.2, ..., 0.9]') as similarity
FROM embeddings
ORDER BY embedding <=> '[0.1, 0.2, ..., 0.9]'
LIMIT 5;

-- 创建向量索引（IVFFlat 或 HNSW）
CREATE INDEX ON embeddings USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- 或者使用 HNSW 索引（更准确但占用更多内存）
CREATE INDEX ON embeddings USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);`}
              language="sql"
              description="pgvector 向量存储和相似度搜索"
            />

            <h3 id="timescaledb" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              TimescaleDB时序数据库
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              TimescaleDB 是专为时间序列数据优化的 PostgreSQL 扩展，适用于 IoT、监控、金融等场景：
            </p>

            <Playground
              code={`-- 安装 TimescaleDB 扩展
CREATE EXTENSION timescaledb;

-- 创建超表（Hypertable）
CREATE TABLE sensor_data (
    time TIMESTAMPTZ NOT NULL,
    sensor_id INTEGER NOT NULL,
    temperature DOUBLE PRECISION,
    humidity DOUBLE PRECISION
);

-- 转换为超表（自动分区）
SELECT create_hypertable('sensor_data', 'time', 
    chunk_time_interval => INTERVAL '1 day');

-- 插入时序数据
INSERT INTO sensor_data (time, sensor_id, temperature, humidity) VALUES 
(NOW(), 1, 23.5, 45.2),
(NOW(), 2, 24.1, 43.8);

-- 时序查询：过去24小时的平均温度
SELECT time_bucket('1 hour', time) AS bucket,
       AVG(temperature) as avg_temp,
       MAX(temperature) as max_temp,
       MIN(temperature) as min_temp
FROM sensor_data
WHERE time > NOW() - INTERVAL '24 hours'
GROUP BY bucket
ORDER BY bucket;

-- 连续聚合（自动维护聚合结果）
CREATE MATERIALIZED VIEW hourly_temp_stats
WITH (timescaledb.continuous) AS
SELECT time_bucket('1 hour', time) AS bucket,
       sensor_id,
       AVG(temperature) as avg_temp,
       COUNT(*) as readings
FROM sensor_data
GROUP BY bucket, sensor_id;`}
              language="sql"
              description="TimescaleDB 时序数据存储和查询"
            />

            <h3 id="citus" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              Citus分布式数据库
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Citus 将 PostgreSQL 转换为分布式数据库，支持水平扩展和大规模数据处理：
            </p>

            <Playground
              code={`-- 安装 Citus 扩展
CREATE EXTENSION citus;

-- 创建分布式表
CREATE TABLE events (
    event_id BIGSERIAL,
    user_id INTEGER,
    event_type VARCHAR(50),
    event_time TIMESTAMPTZ,
    data JSONB
);

-- 按 user_id 分片
SELECT create_distributed_table('events', 'user_id');

-- 创建参考表（复制到所有节点）
CREATE TABLE countries (
    country_code CHAR(2) PRIMARY KEY,
    country_name VARCHAR(100)
);
SELECT create_reference_table('countries');

-- 分布式查询（透明执行）
SELECT u.name, COUNT(e.event_id) as event_count
FROM users u
JOIN events e ON u.user_id = e.user_id
WHERE e.event_time > NOW() - INTERVAL '7 days'
GROUP BY u.name
ORDER BY event_count DESC;

-- 查看分片分布
SELECT shardid, shardstate, shardlength, nodename, nodeport
FROM pg_dist_shard_placement
ORDER BY shardid;`}
              language="sql"
              description="Citus 分布式表和查询"
            />

            <h3 id="fdw" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              外部数据包装器(FDW)
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              FDW（Foreign Data Wrapper）允许 PostgreSQL 访问外部数据源，实现数据联邦：
            </p>

            <Playground
              code={`-- 安装 postgres_fdw（访问其他 PostgreSQL 数据库）
CREATE EXTENSION postgres_fdw;

-- 创建外部服务器
CREATE SERVER remote_server
FOREIGN DATA WRAPPER postgres_fdw
OPTIONS (host 'remote-host', port '5432', dbname 'remote_db');

-- 创建用户映射
CREATE USER MAPPING FOR current_user
SERVER remote_server
OPTIONS (user 'remote_user', password 'secret');

-- 创建外部表
CREATE FOREIGN TABLE remote_users (
    user_id INTEGER,
    username VARCHAR(100),
    email VARCHAR(255)
) SERVER remote_server
OPTIONS (schema_name 'public', table_name 'users');

-- 查询外部表（像本地表一样）
SELECT * FROM remote_users WHERE user_id > 100;

-- 其他常用 FDW
-- mysql_fdw: 访问 MySQL
-- oracle_fdw: 访问 Oracle
-- file_fdw: 访问 CSV/JSON 文件
-- redis_fdw: 访问 Redis
-- mongo_fdw: 访问 MongoDB`}
              language="sql"
              description="FDW 外部数据访问"
            />
          </section>

          {/* 插件开发基础 */}
          <section id="plugin-development" className="mb-8">
            <h2 id="plugin-development" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              插件开发基础
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              PostgreSQL 扩展开发基于 C 语言，需要理解其内部 API 和数据结构：
            </p>

            <Playground
              code={`/* PostgreSQL 扩展基本结构
 * 
 * my_extension/
 * ├── my_extension.control      # 扩展控制文件
 * ├── my_extension--1.0.sql     # SQL 安装脚本
 * ├── my_extension.c            # C 源代码
 * └── Makefile                  # 编译配置
 */

// my_extension.control 文件
comment = 'My custom extension'
default_version = '1.0'
module_pathname = '$libdir/my_extension'
relocatable = true

// my_extension.c - 简单函数示例
#include "postgres.h"
#include "fmgr.h"

PG_MODULE_MAGIC;

// 声明函数
PG_FUNCTION_INFO_V1(my_add);

Datum
my_add(PG_FUNCTION_ARGS)
{
    int32 arg1 = PG_GETARG_INT32(0);
    int32 arg2 = PG_GETARG_INT32(1);
    
    PG_RETURN_INT32(arg1 + arg2);
}

// my_extension--1.0.sql - SQL 接口
CREATE OR REPLACE FUNCTION my_add(integer, integer)
RETURNS integer
AS 'MODULE_PATHNAME', 'my_add'
LANGUAGE C STRICT;

// Makefile
MODULES = my_extension
EXTENSION = my_extension
DATA = my_extension--1.0.sql

PG_CONFIG = pg_config
PGXS := $(shell $(PG_CONFIG) --pgxs)
include $(PGXS)`}
              language="c"
              description="PostgreSQL 扩展开发基本结构"
            />

            <SideNote label="扩展开发最佳实践">
              <ol className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2">
                <li><strong>版本管理</strong>：使用语义化版本号，提供升级脚本</li>
                <li><strong>错误处理</strong>：使用 ereport() 报告错误，避免崩溃</li>
                <li><strong>内存管理</strong>：使用 palloc()/pfree()，避免内存泄漏</li>
                <li><strong>文档完善</strong>：提供详细的 README 和使用示例</li>
                <li><strong>测试覆盖</strong>：编写回归测试，确保稳定性</li>
              </ol>
            </SideNote>
          </section>

          {/* 源码分析 */}
          <section id="source-code" className="mb-8">
            <h2 id="source-code" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              源码分析
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              PostgreSQL 扩展机制的核心在于其模块加载和函数注册系统：
            </p>

            <Playground
              code={`/* PostgreSQL 扩展加载机制（src/backend/utils/fmgr/dfmgr.c）
 * 
 * 扩展加载流程：
 * 1. CREATE EXTENSION 命令触发
 * 2. 读取 .control 文件获取扩展信息
 * 3. 执行 SQL 脚本创建对象
 * 4. 动态加载共享库（.so 文件）
 * 5. 注册函数到系统目录
 */

// 扩展控制结构（src/include/utils/relcache.h）
typedef struct ExtensionControlFile
{
    char       *name;           /* 扩展名称 */
    char       *directory;      /* 扩展文件目录 */
    char       *default_version; /* 默认版本 */
    char       *module_pathname; /* 模块路径 */
    char       *comment;        /* 注释 */
    char       *schema;         /* 目标 schema */
    bool        relocatable;    /* 是否可重定位 */
    bool        superuser;      /* 是否需要超级用户权限 */
    List       *requires;       /* 依赖的扩展列表 */
} ExtensionControlFile;

// 扩展加载函数（简化版）
void
CreateExtension(CreateExtensionStmt *stmt)
{
    ExtensionControlFile *pcontrol;
    
    // 1. 验证扩展名称
    pcontrol = get_extension_control_file(stmt->extname);
    
    // 2. 检查权限
    if (pcontrol->superuser && !superuser())
        ereport(ERROR,
                (errcode(ERRCODE_INSUFFICIENT_PRIVILEGE),
                 errmsg("must be superuser to create extension \"%s\"",
                        stmt->extname)));
    
    // 3. 检查依赖
    check_extension_dependencies(pcontrol);
    
    // 4. 执行 SQL 脚本
    execute_extension_script(pcontrol, stmt);
    
    // 5. 更新系统目录
    record_extension_creation(pcontrol);
}

// 动态函数加载（src/backend/utils/fmgr/dfmgr.c）
PGFunction
load_external_function(const char *filename, const char *funcname,
                       bool signalNotFound, void **filehandle)
{
    void       *handle;
    PGFunction  retval;
    
    // 加载共享库
    handle = dlopen(filename, RTLD_NOW | RTLD_GLOBAL);
    if (handle == NULL)
        ereport(ERROR,
                (errmsg("could not load library \"%s\": %s",
                        filename, dlerror())));
    
    // 查找函数符号
    retval = (PGFunction) dlsym(handle, funcname);
    if (retval == NULL && signalNotFound)
        ereport(ERROR,
                (errmsg("could not find function \"%s\" in library \"%s\"",
                        funcname, filename)));
    
    if (filehandle)
        *filehandle = handle;
    
    return retval;
}`}
              language="c"
              description="PostgreSQL 扩展加载和函数注册机制"
            />
          </section>

          {/* 常见误区 */}
          <section id="misconceptions" className="mb-8">
            <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              常见误区
            </h2>

            <div className="space-y-4">
              <Callout type="danger" title="误区 1：扩展越多越好">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：每个扩展都会增加数据库的复杂性和维护成本。只安装真正需要的扩展，避免不必要的性能开销和安全风险。定期审查已安装的扩展，移除不再使用的。
                </p>
              </Callout>

              <Callout type="danger" title="误区 2：pgvector 可以替代专用向量数据库">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：pgvector 适合中小规模的向量检索场景。对于亿级向量、高并发查询或需要高级功能（如混合搜索、多向量类型）的场景，专用向量数据库（如 Milvus、Pinecone）可能更合适。
                </p>
              </Callout>

              <Callout type="warning" title="误区 3：TimescaleDB 只是普通 PostgreSQL 表">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：TimescaleDB 使用超表（Hypertable）和自动分区技术，针对时序数据进行了深度优化。它提供了连续聚合、数据保留策略、压缩等专用功能，与普通表有本质区别。
                </p>
              </Callout>

              <Callout type="info" title="误区 4：Citus 适合所有分布式场景">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：Citus 最适合读多写少、可按键分片的场景。对于需要频繁跨分片 JOIN、强一致性事务或复杂分布式锁的场景，可能需要重新设计数据模型或考虑其他方案。
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
                  question: 'PostGIS 的空间索引是如何工作的？与普通 B-tree 索引有什么区别？',
                  answer: `PostGIS 使用 GiST（Generalized Search Tree）索引：
1. GiST 是一种平衡树结构，支持自定义操作符类
2. 使用 R-tree 变体组织空间数据，基于边界框（bounding box）
3. 查询时先通过边界框快速过滤，再精确计算空间关系

与 B-tree 的区别：
- B-tree：适用于一维有序数据，支持 =、<、>、BETWEEN
- GiST：适用于多维数据，支持空间操作符（&&、@>、<@等）
- GiST 索引更大，构建更慢，但空间查询更快
- GiST 支持损失性索引（lossy index），需要二次过滤`,
                },
                {
                  question: 'pgvector 的 IVFFlat 和 HNSW 索引有什么区别？如何选择？',
                  answer: `IVFFlat vs HNSW 索引对比：

IVFFlat（Inverted File with Flat quantization）：
- 基于聚类的索引，将向量空间划分为多个簇
- 构建速度快，内存占用少
- 查询时需要扫描多个簇，精度较低
- 适合：数据集较小、对精度要求不高、内存受限

HNSW（Hierarchical Navigable Small World）：
- 基于图的索引，构建多层导航结构
- 查询速度快，精度高
- 构建速度慢，内存占用大
- 适合：大规模数据集、高精度要求、充足内存

选择建议：
- 小规模（<100万向量）：IVFFlat
- 大规模（>100万向量）：HNSW
- 实时插入频繁：IVFFlat（HNSW 更新成本高）
- 离线批量查询：HNSW`,
                },
                {
                  question: 'TimescaleDB 的连续聚合（Continuous Aggregates）是如何实现的？',
                  answer: `连续聚合实现原理：
1. 基于物化视图，自动维护聚合结果
2. 使用时序分区（chunk）作为增量计算单元
3. 当新数据写入或旧数据修改时，只重新计算受影响的分区
4. 后台进程定期刷新聚合结果

关键特性：
- 增量更新：只计算变化的部分，避免全量重算
- 实时性：可配置刷新间隔，平衡实时性和性能
- 透明查询：查询时自动使用聚合结果，无需修改 SQL
- 数据保留：可设置不同粒度的数据保留策略

性能优势：
- 查询速度提升 10-100 倍
- 减少 CPU 和 I/O 开销
- 适合仪表盘、报表等场景`,
                },
                {
                  question: 'Citus 的分片策略有哪些？如何选择合适的分片键？',
                  answer: `Citus 分片策略：

1. 哈希分片（Hash Distribution）：
   - 默认策略，基于分片键的哈希值分布数据
   - 适合：均匀分布、点查询、JOIN 操作
   - 示例：user_id、tenant_id

2. 范围分片（Range Distribution）：
   - 基于值的范围分布数据
   - 适合：范围查询、时间序列数据
   - 示例：created_at、date

3. 附加分片（Append Distribution）：
   - 数据按插入顺序追加到分片
   - 适合：日志数据、不可变数据
   - 较少使用

选择分片键的原则：
- 高基数：避免数据倾斜
- 查询模式：常用 JOIN 和过滤字段
- 业务逻辑：自然的数据分组（如租户 ID）
- 避免热点：不要选择单调递增字段
- 考虑未来：预留扩展空间`,
                },
                {
                  question: 'FDW 的性能瓶颈在哪里？如何优化跨库查询？',
                  answer: `FDW 性能瓶颈：
1. 网络延迟：每次查询都需要网络往返
2. 数据传输：大量数据通过网络传输
3. 无法下推：某些操作无法在远程端执行
4. 连接开销：建立和维护连接的消耗

优化策略：
1. 谓词下推：确保过滤条件能在远程端执行
2. 限制返回列：只选择需要的列，避免 SELECT *
3. 批量操作：使用批量插入/更新减少网络往返
4. 缓存结果：对不常变化的数据使用物化视图
5. 连接池：复用数据库连接
6. 异步查询：并行执行多个 FDW 查询
7. 本地复制：对频繁访问的数据建立本地副本

监控工具：
- EXPLAIN ANALYZE 查看执行计划
- pg_stat_activity 监控活跃连接
- 网络监控工具分析延迟`,
                },
              ]}
            />
          </section>

          {/* 对比其他方案 */}
          <section id="comparison" className="mb-8">
            <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              对比其他方案
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-border text-[14px] sm:text-[15px]">
                <thead>
                  <tr className="bg-parchment-deep">
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">功能</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">PostgreSQL + 扩展</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">专用数据库</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">云服务商方案</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">GIS 功能</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（PostGIS）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐（GeoServer + DB）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐（AWS Location Service）</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">向量检索</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐（pgvector）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（Milvus/Pinecone）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐（Azure Cognitive Search）</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">时序数据</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（TimescaleDB）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐（InfluxDB）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐（AWS Timestream）</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">分布式扩展</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐（Citus）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（CockroachDB）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（Cloud Spanner）</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">运维复杂度</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐（中等，需管理多个扩展）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐（较高，多系统维护）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（低，托管服务）</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">成本</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（开源免费）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐（部分开源，企业版收费）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐（按用量付费，较贵）</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">数据一致性</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（ACID 保证）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐（取决于具体产品）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（强一致性）</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">适用场景</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">中小规模、多模态需求、成本控制</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">超大规模、专业场景、高性能要求</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">快速启动、免运维、弹性扩展</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-4">
              <strong>选型建议</strong>：PostgreSQL + 扩展适合大多数中小规模应用，提供统一的数据平台和良好的性价比；专用数据库适合超大规模或特殊场景；云服务适合快速启动和免运维需求。
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
                <h4 className="font-semibold text-ink mb-2">🗺️ PostgreSQL JSONB与NoSQL能力</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  了解 JSONB 数据类型和 NoSQL 特性
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🌐 PostgreSQL高可用与复制</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  学习流复制、逻辑复制、Patroni 等高可用方案
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🔍 Elasticsearch搜索引擎</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  对比全文检索和向量搜索的实现差异
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
