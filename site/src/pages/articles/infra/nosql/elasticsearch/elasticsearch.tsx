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
  { id: 'overview', text: '整体架构', level: 2 },
  { id: 'core-concepts', text: '核心概念', level: 2 },
  { id: 'inverted-index', text: '倒排索引原理', level: 3 },
  { id: 'document-model', text: '文档模型', level: 3 },
  { id: 'source-code', text: '源码分析', level: 2 },
  { id: 'indexing-flow', text: '索引流程', level: 3 },
  { id: 'search-flow', text: '搜索流程', level: 3 },
  { id: 'query-dsl', text: '查询 DSL', level: 2 },
  { id: 'basic-query', text: '基础查询', level: 3 },
  { id: 'compound-query', text: '复合查询', level: 3 },
  { id: 'aggregation', text: '聚合分析', level: 3 },
  { id: 'cluster-architecture', text: '集群架构', level: 2 },
  { id: 'sharding', text: '分片机制', level: 3 },
  { id: 'replication', text: '副本机制', level: 3 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比其他搜索引擎', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function Elasticsearch({ meta }: { meta: KnowledgeNode }) {
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
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              一句话定义
            </h2>
            <blockquote className="pl-4 border-l-4 border-accent bg-accent-soft/40 py-3 pr-4 rounded-r-paper-md italic text-ink-light">
              Elasticsearch 是一个基于 Lucene 构建的分布式、RESTful 风格的搜索和数据分析引擎，能够处理结构化、非结构化和地理空间数据，支持实时全文检索、聚合分析和日志处理等场景。
            </blockquote>
            <SideNote label="为什么叫 Elasticsearch？">
              Elasticsearch 由 Shay Banon 于 2010 年发布，名称来源于其核心功能——弹性（Elastic）搜索。它建立在 Apache Lucene 之上，提供了分布式能力和 RESTful API，使得大规模数据处理变得简单高效。
            </SideNote>
          </section>

          {/* 整体架构 */}
          <section id="overview" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              整体架构
            </h2>
            <DiagramBlock title="Elasticsearch 架构概览">
              {`graph TD
                CLIENT["Client"] --> HTTP["HTTP/REST API"]
                HTTP --> NODE["Node 节点"]
                NODE --> CLUSTER["Cluster 集群"]
                CLUSTER --> SHARD["Primary Shard 主分片"]
                CLUSTER --> REPLICA["Replica Shard 副本分片"]
                SHARD --> LUCENE["Lucene Index"]
                REPLICA --> LUCENE
                LUCENE --> SEGMENT["Segment 段文件"]
                SEGMENT --> DISK["磁盘存储"]
              `}
            </DiagramBlock>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Elasticsearch 采用分布式架构，核心组件包括：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong className="text-ink">Cluster（集群）</strong>：一个或多个节点的集合，共享相同的 cluster.name</li>
              <li><strong className="text-ink">Node（节点）</strong>：单个 Elasticsearch 实例，存储数据并参与集群操作</li>
              <li><strong className="text-ink">Index（索引）</strong>：具有相同特征的文档集合，类似于关系数据库中的"数据库"</li>
              <li><strong className="text-ink">Shard（分片）</strong>：索引的水平分割单元，可以是主分片或副本分片</li>
              <li><strong className="text-ink">Document（文档）</strong>：可被索引的基础信息单元，以 JSON 格式表示</li>
              <li><strong className="text-ink">Lucene</strong>：底层搜索引擎库，负责实际的索引和搜索操作</li>
            </ul>
          </section>

          {/* 核心概念 */}
          <section id="core-concepts" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              核心概念
            </h2>

            <h3 id="inverted-index" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              倒排索引原理
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              倒排索引是 Elasticsearch 的核心数据结构，它将文档内容映射到文档 ID，而非传统的正排索引（文档 ID 映射到内容）：
            </p>

            <ContextSwitcher
              simpleContent={
                <div>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                    <strong>正排索引</strong>：文档 → 内容（如：Doc1 → "Hello World"）
                  </p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                    <strong>倒排索引</strong>：词项 → 文档列表（如："Hello" → [Doc1, Doc3]）
                  </p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                    倒排索引使得全文检索非常高效，因为可以直接定位包含特定词的文档，而无需扫描所有文档。
                  </p>
                </div>
              }
              hardcoreContent={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-ink mb-2">倒排索引结构</h4>
                    <Playground
                      code={`# 原始文档
Doc1: "The quick brown fox"
Doc2: "The lazy dog"
Doc3: "The quick rabbit"

# 倒排索引（Term Dictionary + Posting List）
Term       | Doc Frequency | Posting List
-----------|---------------|------------------
the        | 3             | [Doc1, Doc2, Doc3]
quick      | 2             | [Doc1, Doc3]
brown      | 1             | [Doc1]
fox        | 1             | [Doc1]
lazy       | 1             | [Doc2]
dog        | 1             | [Doc2]
rabbit     | 1             | [Doc3]`}
                      language="text"
                      description="倒排索引通过词项快速定位文档，支持高效的全文检索"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink mb-2">分词与 Tokenization</h4>
                    <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                      文本在建立倒排索引前需要经过分词处理：
                    </p>
                    <Playground
                      code={`# Standard Analyzer（标准分词器）
POST _analyze
{
  "analyzer": "standard",
  "text": "The Quick Brown Fox!"
}

# 输出
{
  "tokens": [
    {"token": "the", "position": 1},
    {"token": "quick", "position": 2},
    {"token": "brown", "position": 3},
    {"token": "fox", "position": 4}
  ]
}`}
                      language="json"
                      description="分词器将文本拆分为词项，不同语言需要不同的分词器"
                    />
                  </div>
                </div>
              }
            />

            <h3 id="document-model" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              文档模型
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Elasticsearch 使用 JSON 格式的文档作为基本数据单元，每个文档属于一个索引并具有唯一的 ID：
            </p>

            <Playground
              code={`# 创建文档
PUT /articles/_doc/1
{
  "title": "Elasticsearch 入门指南",
  "content": "Elasticsearch 是一个强大的搜索引擎...",
  "author": "张三",
  "tags": ["elasticsearch", "search", "tutorial"],
  "publish_date": "2024-01-15",
  "view_count": 1234,
  "is_published": true
}

# 获取文档
GET /articles/_doc/1

# 更新文档（部分更新）
POST /articles/_update/1
{
  "doc": {
    "view_count": 1235
  }
}

# 删除文档
DELETE /articles/_doc/1`}
              language="json"
              description="Elasticsearch 文档是扁平的 JSON 结构，不支持嵌套对象以外的复杂关系"
            />
          </section>

          {/* 源码分析 */}
          <section id="source-code" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              源码分析
            </h2>

            <h3 id="indexing-flow" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              索引流程
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              文档写入 Elasticsearch 的完整流程：
            </p>

            <DiagramBlock title="文档索引流程">
              {`sequenceDiagram
                participant Client as 客户端
                participant Coord as 协调节点
                participant Primary as 主分片
                participant Replica as 副本分片
                
                Client->>Coord: 写入请求
                Coord->>Coord: 路由计算<br/>确定主分片
                Coord->>Primary: 转发请求
                Primary->>Primary: 验证文档
                Primary->>Primary: 写入 Translog
                Primary->>Primary: 写入 Memory Buffer
                Primary->>Coord: 返回成功
                Coord->>Client: 返回响应
                Primary->>Replica: 异步复制
                Replica->>Replica: 写入 Translog
                Replica->>Replica: 写入 Memory Buffer
                Replica->>Primary: 确认完成`}
            </DiagramBlock>

            <Playground
              code={`// Elasticsearch 索引流程简化版（Java）
public IndexResponse index(IndexRequest request) {
    // 1. 解析请求，获取文档内容
    ParsedDocument parsedDoc = documentMapper.parse(request.source());
    
    // 2. 路由计算：确定文档应该存储在哪个分片
    int shardId = routingService.resolveRouting(
        request.index(), 
        request.id()
    );
    
    // 3. 获取主分片
    IndexShard primaryShard = indexService.getShard(shardId);
    
    // 4. 写入 Translog（预写日志，保证持久性）
    primaryShard.addTranslogOperation(new IndexTranslogOp(parsedDoc));
    
    // 5. 写入内存缓冲区（Memory Buffer）
    primaryShard.addToBuffer(parsedDoc);
    
    // 6. 刷新到文件系统缓存（默认 1 秒后）
    // refreshInterval 控制刷新频率
    
    // 7. 异步复制到副本分片
    replicationService.replicateToReplicas(primaryShard, parsedDoc);
    
    // 8. 返回响应
    return new IndexResponse(shardId, request.id(), true);
}`}
              language="java"
              description="索引流程确保数据的可靠性和一致性，通过 Translog 实现故障恢复"
            />

            <h3 id="search-flow" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              搜索流程
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Elasticsearch 搜索采用"查询然后取回"（Query Then Fetch）的两阶段策略：
            </p>

            <DiagramBlock title="搜索流程">
              {`sequenceDiagram
                participant Client as 客户端
                participant Coord as 协调节点
                participant Shard1 as 分片 1
                participant Shard2 as 分片 2
                participant Shard3 as 分片 3
                
                Client->>Coord: 搜索请求
                Note over Coord: Phase 1: Query
                Coord->>Shard1: 查询
                Coord->>Shard2: 查询
                Coord->>Shard3: 查询
                Shard1->>Coord: 返回文档 ID + 排序值
                Shard2->>Coord: 返回文档 ID + 排序值
                Shard3->>Coord: 返回文档 ID + 排序值
                Note over Coord: 全局排序，确定 Top N
                Note over Coord: Phase 2: Fetch
                Coord->>Shard1: 获取完整文档
                Coord->>Shard2: 获取完整文档
                Shard1->>Coord: 返回文档内容
                Shard2->>Coord: 返回文档内容
                Coord->>Client: 返回最终结果`}
            </DiagramBlock>

            <SideNote label="为什么分两阶段？">
              第一阶段只返回文档 ID 和排序值，减少网络传输；第二阶段只获取需要的文档内容，提高效率。对于深分页（from + size 很大），性能会显著下降，建议使用 search_after 替代。
            </SideNote>
          </section>

          {/* 查询 DSL */}
          <section id="query-dsl" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              查询 DSL
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Elasticsearch 使用基于 JSON 的领域特定语言（DSL）进行查询，支持丰富的查询类型：
            </p>

            <h3 id="basic-query" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              基础查询
            </h3>

            <Playground
              code={`# 1. Match Query（全文检索）
GET /articles/_search
{
  "query": {
    "match": {
      "content": "Elasticsearch 搜索引擎"
    }
  }
}

# 2. Term Query（精确匹配）
GET /articles/_search
{
  "query": {
    "term": {
      "author": {
        "value": "张三"
      }
    }
  }
}

# 3. Range Query（范围查询）
GET /articles/_search
{
  "query": {
    "range": {
      "view_count": {
        "gte": 100,
        "lte": 1000
      }
    }
  }
}

# 4. Wildcard Query（通配符查询）
GET /articles/_search
{
  "query": {
    "wildcard": {
      "title": {
        "value": "Elastic*"
      }
    }
  }
}`}
              language="json"
              description="基础查询适用于简单的单字段查询场景"
            />

            <h3 id="compound-query" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              复合查询
            </h3>

            <Playground
              code={`# Bool Query（布尔查询）
GET /articles/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "content": "Elasticsearch" } }
      ],
      "filter": [
        { "term": { "is_published": true } },
        { "range": { "publish_date": { "gte": "2024-01-01" } } }
      ],
      "should": [
        { "match": { "tags": "tutorial" } }
      ],
      "must_not": [
        { "term": { "author": "李四" } }
      ],
      "minimum_should_match": 1
    }
  },
  "sort": [
    { "view_count": { "order": "desc" } },
    { "_score": { "order": "desc" } }
  ],
  "from": 0,
  "size": 10
}`}
              language="json"
              description="Bool 查询组合多个条件，Function Score 实现自定义排序逻辑"
            />

            <h3 id="aggregation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              聚合分析
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              聚合用于数据统计和分析，支持指标聚合、桶聚合和管道聚合：
            </p>

            <Playground
              code={`# 聚合分析示例
GET /articles/_search
{
  "size": 0,
  "aggs": {
    "authors": {
      "terms": {
        "field": "author.keyword",
        "size": 10
      },
      "aggs": {
        "avg_views": {
          "avg": { "field": "view_count" }
        },
        "monthly_posts": {
          "date_histogram": {
            "field": "publish_date",
            "calendar_interval": "month"
          }
        }
      }
    },
    "total_views": {
      "sum": { "field": "view_count" }
    }
  }
}`}
              language="json"
              description="聚合分析支持多维度数据统计，类似 SQL 的 GROUP BY"
            />
          </section>

          {/* 集群架构 */}
          <section id="cluster-architecture" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              集群架构
            </h2>

            <h3 id="sharding" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              分片机制
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              分片是 Elasticsearch 实现水平扩展的核心机制：
            </p>

            <Playground
              code={`# 创建索引时指定分片数
PUT /articles
{
  "settings": {
    "number_of_shards": 5,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "content": { "type": "text" },
      "author": { "type": "keyword" },
      "publish_date": { "type": "date" },
      "view_count": { "type": "integer" }
    }
  }
}

# 查看分片分布
GET /_cat/shards/articles?v

# 分片路由公式
shard_num = hash(_routing) % number_of_primary_shards`}
              language="json"
              description="分片数在索引创建后不能修改，需要根据数据量合理设置"
            />

            <SideNote label="分片数如何选择？">
              <ul className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2">
                <li><strong>经验法则</strong>：每个分片大小控制在 10-50GB</li>
                <li><strong>计算公式</strong>：分片数 = 预期总数据量 / 30GB</li>
                <li><strong>最小值</strong>：至少 1 个主分片</li>
                <li><strong>最大值</strong>：避免过多分片（&gt;1000），会增加集群负担</li>
                <li><strong>调整策略</strong>：使用 Reindex API 重新索引来改变分片数</li>
              </ul>
            </SideNote>

            <h3 id="replication" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              副本机制
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              副本分片提供高可用性和读取性能提升：
            </p>

            <DiagramBlock title="主从复制架构">
              {`graph LR
                CLIENT["Client"] --> READ["读请求"]
                CLIENT --> WRITE["写请求"]
                WRITE --> PRIMARY["Primary Shard"]
                READ --> PRIMARY
                READ --> REPLICA1["Replica Shard 1"]
                READ --> REPLICA2["Replica Shard 2"]
                PRIMARY --> |同步| REPLICA1
                PRIMARY --> |同步| REPLICA2
                PRIMARY -.-> |故障转移| REPLICA1
                PRIMARY -.-> |故障转移| REPLICA2`}
            </DiagramBlock>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong>副本的作用</strong>：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong className="text-ink">高可用性</strong>：主分片故障时，副本可以提升为主分片</li>
              <li><strong className="text-ink">读取扩展</strong>：读请求可以分发到所有副本，提高吞吐量</li>
              <li><strong className="text-ink">数据安全</strong>：多副本防止数据丢失</li>
            </ul>

            <Playground
              code={`# 动态调整副本数
PUT /articles/_settings
{
  "index": {
    "number_of_replicas": 2
  }
}

# 查看集群健康状态
GET /_cluster/health

# 状态说明
# green: 所有主分片和副本分片都正常
# yellow: 所有主分片正常，但有副本未分配
# red: 有主分片未分配`}
              language="json"
              description="副本数可以动态调整，但主分片数创建后不可修改"
            />
          </section>

          {/* 常见误区 */}
          <section id="misconceptions" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              常见误区
            </h2>

            <div className="space-y-4">
              <Callout type="danger" title="误区 1：Elasticsearch 可以替代数据库">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：Elasticsearch 不是关系数据库，不支持事务、复杂的 JOIN 操作、强一致性保证。建议配合 MySQL/PostgreSQL 使用。
                </p>
              </Callout>

              <Callout type="danger" title="误区 2：分片越多越好">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：过多的分片会导致集群状态过大、资源浪费、恢复时间变长。建议单个分片大小控制在 10-50GB，避免超过 1000 个分片。
                </p>
              </Callout>

              <Callout type="warning" title="误区 3：深度分页性能没问题">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：from + size 深度分页会导致内存消耗线性增长，超过 10000 条默认会被拒绝。建议使用 search_after 或 scroll API 替代。
                </p>
              </Callout>

              <Callout type="info" title="误区 4：不需要关心 Mapping">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：错误的 Mapping 会导致：存储空间浪费、查询性能差、无法实现某些查询功能。应该在创建索引时就明确定义 Mapping。
                </p>
              </Callout>
            </div>
          </section>

          {/* 面试真题 */}
          <section id="interview" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              面试真题
            </h2>

            <InterviewSection
              questions={[
                {
                  question: 'Elasticsearch 的倒排索引是什么？工作原理是什么？',
                  answer: `倒排索引是 Elasticsearch 的核心数据结构，它将文档内容映射到文档 ID。

工作原理：
1. 分词：将文本拆分为词项（Token）
2. 建立词典：记录每个词项出现在哪些文档中
3. 存储位置信息：记录词项在文档中的位置和频率
4. 查询时直接定位包含特定词的文档

优势：
- 全文检索效率高，无需扫描所有文档
- 支持相关性评分（TF-IDF、BM25）
- 可以快速进行布尔运算（AND、OR、NOT）`,
                },
                {
                  question: 'Elasticsearch 写入数据的流程是什么？',
                  answer: `写入流程：
1. 客户端发送请求到任意节点（协调节点）
2. 协调节点根据路由公式计算文档所属的主分片
3. 转发请求到主分片所在节点
4. 主分片验证文档并写入 Translog（预写日志）
5. 写入内存缓冲区（Memory Buffer）
6. 返回成功响应给客户端
7. 异步复制到所有副本分片
8. 副本分片确认后，主分片提交事务

关键点：
- Translog 保证数据不丢失
- 默认 1 秒后刷新到文件系统缓存（可见）
- 定期 flush 到磁盘（持久化）`,
                },
                {
                  question: 'Elasticsearch 搜索的流程是什么？',
                  answer: `搜索采用"Query Then Fetch"两阶段策略：

Phase 1 - Query：
1. 协调节点广播查询到所有相关分片
2. 每个分片执行查询，返回文档 ID 和排序值
3. 协调节点合并结果，全局排序，确定 Top N

Phase 2 - Fetch：
1. 协调节点根据 Top N 的文档 ID，向对应分片请求完整文档
2. 分片返回文档内容
3. 协调节点组装最终结果返回给客户端

优化建议：
- 使用 filter 上下文缓存提高性能
- 避免深度分页，使用 search_after
- 合理设置 from 和 size`,
                },
                {
                  question: 'Elasticsearch 如何实现高可用？',
                  answer: `Elasticsearch 通过以下机制实现高可用：

1. 副本分片：
   - 每个主分片可以有多个副本
   - 副本分布在不同的节点上
   - 读请求可以分发到副本，提高吞吐量

2. 自动故障转移：
   - 主节点监控集群状态
   - 检测到节点故障后自动选举新主节点
   - 副本分片提升为主分片

3. 集群脑裂防护：
   - discovery.zen.minimum_master_nodes 配置
   - 防止网络分区导致多个主节点

4. 数据持久化：
   - Translog 预写日志
   - 定期 flush 到磁盘
   - 快照备份机制`,
                },
                {
                  question: 'Elasticsearch 和 MySQL 有什么区别？如何选择？',
                  answer: `主要区别：

1. 数据模型：
   - MySQL：结构化数据，支持复杂关系
   - ES：半结构化/非结构化数据，扁平文档

2. 查询能力：
   - MySQL：精确查询、JOIN、事务
   - ES：全文检索、模糊匹配、聚合分析

3. 性能特点：
   - MySQL：适合 OLTP（事务处理）
   - ES：适合搜索和分析场景

4. 扩展性：
   - MySQL：垂直扩展为主，分库分表复杂
   - ES：天然分布式，水平扩展容易

选型建议：
- 需要事务、强一致性 → MySQL
- 需要全文检索、实时分析 → ES
- 最佳实践：MySQL 存储源数据，ES 用于搜索（通过 Canal/MQ 同步）`,
                },
                {
                  question: '如何优化 Elasticsearch 的性能？',
                  answer: `优化策略：

1. 索引优化：
   - 合理设置分片数（10-50GB/分片）
   - 使用合适的 Mapping（keyword vs text）
   - 禁用不必要的 _all、_source 字段

2. 查询优化：
   - 优先使用 filter 上下文（可缓存）
   - 避免 wildcard、regexp 等慢查询
   - 使用 bool query 组合条件

3. 写入优化：
   - 批量写入（bulk API）
   - 调整 refresh_interval
   - 使用 SSD 磁盘

4. 硬件优化：
   - 增加内存（堆内存不超过 32GB）
   - 使用 SSD
   - 足够的 CPU 核心

5. 集群优化：
   - 合理分配主节点、数据节点、协调节点
   - 监控集群健康状态
   - 定期清理过期索引`,
                },
              ]}
            />
          </section>

          {/* 对比其他搜索引擎 */}
          <section id="comparison" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              对比其他搜索引擎
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-border text-[14px] sm:text-[15px]">
                <thead>
                  <tr className="bg-parchment-deep">
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">特性</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">Elasticsearch</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">Solr</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">Meilisearch</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">开发语言</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">Java</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">Java</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">Rust</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">分布式</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 原生支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⚠️ SolrCloud</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">❌ 不支持</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">实时性</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">近实时（1秒）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">需手动 commit</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">实时</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">适用场景</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">日志分析、大数据搜索</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">传统企业搜索</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">小型应用、即时搜索</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">生态系统</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">丰富（ELK Stack）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">成熟</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">较小</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">学习曲线</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">中等</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">较陡</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">简单</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-4">
              <strong>选型建议</strong>：现代项目推荐使用 Elasticsearch（功能全面、生态丰富），小型项目可以考虑 Meilisearch（简单易用），传统企业系统可能仍在使用 Solr。
            </p>
          </section>

          {/* 知识关联 */}
          <section id="related" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              知识关联
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🔍 向量数据库</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  了解向量数据库在 AI 搜索中的应用，与 Elasticsearch 的互补关系
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">📊 语义检索优化</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  学习如何结合传统全文检索和向量检索，提升搜索质量
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🐘 PostgreSQL JSONB</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  PostgreSQL 也支持 JSON 存储和全文检索，了解两者的适用场景
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🔄 RAG 基础概念</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  Elasticsearch 可以作为 RAG 系统的向量存储和文档检索引擎
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
