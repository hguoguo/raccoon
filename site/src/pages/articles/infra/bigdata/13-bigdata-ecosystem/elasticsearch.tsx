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
  { id: 'architecture', text: '1.1 ES架构', level: 3 },
  { id: 'inverted-index', text: '1.2 倒排索引', level: 3 },
  { id: 'crud', text: '二、基本操作', level: 2 },
  { id: 'document-ops', text: '2.1 文档操作', level: 3 },
  { id: 'search-api', text: '2.2 搜索API', level: 3 },
  { id: 'advanced-search', text: '三、高级查询', level: 2 },
  { id: 'bool-query', text: '3.1 布尔查询', level: 3 },
  { id: 'aggregation', text: '3.2 聚合查询', level: 3 },
  { id: 'cluster', text: '四、集群管理', level: 2 },
  { id: 'shard-replica', text: '4.1 分片与副本', level: 3 },
  { id: 'cluster-health', text: '4.2 集群健康', level: 3 },
  { id: 'optimization', text: '五、性能优化', level: 2 },
  { id: 'index-design', text: '5.1 索引设计', level: 3 },
  { id: 'query-optimize', text: '5.2 查询优化', level: 3 },
  { id: 'misconceptions', text: '六、常见误区', level: 2 },
  { id: 'interview', text: '七、面试真题', level: 2 },
  { id: 'comparison', text: '八、ES vs 传统数据库', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function Elasticsearch({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Elasticsearch 是一个基于 Lucene 的<strong className="text-accent">分布式搜索引擎</strong>，提供 RESTful API，
              支持实时全文检索、结构化搜索、聚合分析，是 ELK 技术栈的核心组件。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么选择 Elasticsearch？">
            传统数据库在全文检索场景下性能较差，ES 通过倒排索引实现毫秒级检索，支持水平扩展、高可用，适合日志分析、商品搜索、推荐系统等场景。
          </Callout>

          <h2 id="core-concepts" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、核心概念
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Elasticsearch 采用分布式架构，将数据分散到多个节点存储和检索。理解其核心概念是使用 ES 的基础。
          </p>

          <h3 id="architecture" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.1 ES架构
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ES 集群由多个节点组成，每个节点可以承担不同角色：Master Node（主节点）、Data Node（数据节点）、Coordinating Node（协调节点）。
          </p>

          <DiagramBlock title="Elasticsearch 集群架构">
            {`graph TB
    Client[Client] --> CN[Coordinating Node]
    
    CN --> DN1[Data Node 1<br/>Shard 0, Shard 1]
    CN --> DN2[Data Node 2<br/>Shard 2, Shard 3]
    CN --> DN3[Data Node 3<br/>Shard 4, Shard 5]
    
    MN[Master Node] -.-> DN1
    MN -.-> DN2
    MN -.-> DN3
    
    style Client fill:#e1f5ff
    style CN fill:#fff4e6
    style MN fill:#f3e5f5`}
          </DiagramBlock>

          <SideNote label="节点角色">
            <ul className="space-y-2 text-sm">
              <li><strong>Master Node：</strong>管理集群状态、索引创建删除、节点加入退出</li>
              <li><strong>Data Node：</strong>存储数据、执行 CRUD、搜索、聚合操作</li>
              <li><strong>Coordinating Node：</strong>接收客户端请求，分发到相关节点，合并结果返回</li>
              <li><strong>Ingest Node：</strong>预处理文档（可选）</li>
            </ul>
          </SideNote>

          <h3 id="inverted-index" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.2 倒排索引
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            倒排索引是 ES 的核心数据结构，它将文档内容拆分为词条（Term），建立词条到文档 ID 的映射关系，实现快速全文检索。
          </p>

          <DiagramBlock title="倒排索引原理">
            {`graph LR
    subgraph 文档
      D1[Doc1: Hello World]
      D2[Doc2: Hello ES]
      D3[Doc3: World ES]
    end
    
    subgraph 倒排索引
      T1[Term: hello] --> DocList1[DocIDs: 1, 2]
      T2[Term: world] --> DocList2[DocIDs: 1, 3]
      T3[Term: es] --> DocList3[DocIDs: 2, 3]
    end
    
    style D1 fill:#e1f5ff
    style D2 fill:#e1f5ff
    style D3 fill:#e1f5ff`}
          </DiagramBlock>

          <Callout type="info" title="倒排索引 vs 正排索引">
            <strong>正排索引：</strong>文档 ID → 文档内容（如关系型数据库的主键索引）<br/>
            <strong>倒排索引：</strong>词条 → 文档 ID 列表（适合全文检索）<br/>
            ES 同时维护两种索引，倒排索引用于搜索，正排索引用于获取文档内容。
          </Callout>

          <h2 id="crud" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、基本操作
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ES 提供 RESTful API，使用 HTTP 方法（GET、POST、PUT、DELETE）对文档进行 CRUD 操作。
          </p>

          <h3 id="document-ops" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 文档操作
          </h3>

          <Playground
            code={`# 创建索引
PUT /products
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "name": { "type": "text", "analyzer": "ik_max_word" },
      "price": { "type": "float" },
      "category": { "type": "keyword" },
      "created_at": { "type": "date" }
    }
  }
}

# 插入文档
POST /products/_doc/1
{
  "name": "iPhone 15 Pro",
  "price": 7999.00,
  "category": "手机",
  "created_at": "2024-01-15"
}

# 批量插入
POST /products/_bulk
{"index":{"_id":"2"}}
{"name":"MacBook Pro","price":14999,"category":"电脑"}
{"index":{"_id":"3"}}
{"name":"AirPods Pro","price":1999,"category":"耳机"}

# 查询文档
GET /products/_doc/1

# 更新文档
PUT /products/_doc/1
{
  "name": "iPhone 15 Pro Max",
  "price": 8999.00,
  "category": "手机",
  "created_at": "2024-01-15"
}

# 删除文档
DELETE /products/_doc/1`}
            language="json"
            description="文档 CRUD 操作示例"
          />

          <SideNote label="索引 vs 类型 vs 文档">
            <ul className="space-y-2 text-sm">
              <li><strong>Index（索引）：</strong>相当于关系型数据库的 Database</li>
              <li><strong>Type（类型）：</strong>ES 7.x 已废弃，相当于 Table</li>
              <li><strong>Document（文档）：</strong>相当于 Row，JSON 格式存储</li>
            </ul>
          </SideNote>

          <h3 id="search-api" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 搜索API
          </h3>

          <Playground
            code={`# 简单查询字符串搜索
GET /products/_search?q=name:iPhone

# DSL 查询（推荐）
GET /products/_search
{
  "query": {
    "match": {
      "name": "iPhone"
    }
  },
  "from": 0,
  "size": 10,
  "_source": ["name", "price"]
}

# 精确匹配
GET /products/_search
{
  "query": {
    "term": {
      "category": "手机"
    }
  }
}

# 范围查询
GET /products/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 1000,
        "lte": 10000
      }
    }
  }
}

# 多字段匹配
GET /products/_search
{
  "query": {
    "multi_match": {
      "query": "苹果手机",
      "fields": ["name", "category"]
    }
  }
}`}
            language="json"
            description="搜索 API 示例"
          />

          <h2 id="advanced-search" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、高级查询
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ES 支持复杂的查询组合，包括布尔查询、聚合查询、地理位置查询等。
          </p>

          <h3 id="bool-query" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 布尔查询
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            布尔查询允许组合多个查询条件，支持 must（必须匹配）、should（应该匹配）、must_not（必须不匹配）、filter（过滤，不影响评分）。
          </p>

          <Playground
            code={`GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "手机" } }
      ],
      "filter": [
        { "range": { "price": { "gte": 2000, "lte": 8000 } } },
        { "term": { "category": "手机" } }
      ],
      "should": [
        { "match": { "name": "华为" } }
      ],
      "must_not": [
        { "term": { "category": "二手" } }
      ],
      "minimum_should_match": 1
    }
  },
  "sort": [
    { "price": { "order": "asc" } }
  ]
}`}
            language="json"
            description="布尔查询示例"
          />

          <Callout type="tip" title="filter vs query">
            <strong>filter：</strong>只过滤文档，不计算相关性评分，可缓存，性能更好。<br/>
            <strong>query：</strong>既过滤又计算评分，影响排序结果。<br/>
            <strong>最佳实践：</strong>不需要评分的条件尽量放在 filter 中。
          </Callout>

          <h3 id="aggregation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 聚合查询
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            聚合查询用于数据分析，支持指标聚合（平均值、最大值等）和桶聚合（分组统计）。
          </p>

          <Playground
            code={`# 按分类统计数量和平均价格
GET /products/_search
{
  "size": 0,
  "aggs": {
    "categories": {
      "terms": {
        "field": "category",
        "size": 10
      },
      "aggs": {
        "avg_price": {
          "avg": { "field": "price" }
        },
        "price_range": {
          "stats": { "field": "price" }
        }
      }
    }
  }
}

# 价格区间分布
GET /products/_search
{
  "size": 0,
  "aggs": {
    "price_ranges": {
      "range": {
        "field": "price",
        "ranges": [
          { "to": 1000 },
          { "from": 1000, "to": 5000 },
          { "from": 5000, "to": 10000 },
          { "from": 10000 }
        ]
      }
    }
  }
}

# 日期直方图（按月统计销量）
GET /orders/_search
{
  "size": 0,
  "aggs": {
    "sales_over_time": {
      "date_histogram": {
        "field": "created_at",
        "calendar_interval": "month"
      },
      "aggs": {
        "total_sales": {
          "sum": { "field": "amount" }
        }
      }
    }
  }
}`}
            language="json"
            description="聚合查询示例"
          />

          <h2 id="cluster" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、集群管理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ES 集群通过分片和副本机制实现水平扩展和高可用。
          </p>

          <h3 id="shard-replica" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 分片与副本
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            索引被划分为多个分片（Shard），每个分片可以有多个副本（Replica）。主分片负责写入，副本分片提供读取和高可用。
          </p>

          <DiagramBlock title="分片与副本分布">
            {`graph TB
    subgraph Node1
      P0[P0: Primary Shard 0]
      R1[R1: Replica Shard 1]
    end
    
    subgraph Node2
      P1[P1: Primary Shard 1]
      R2[R2: Replica Shard 2]
    end
    
    subgraph Node3
      P2[P2: Primary Shard 2]
      R0[R0: Replica Shard 0]
    end
    
    P0 -.-> R0
    P1 -.-> R1
    P2 -.-> R2
    
    style P0 fill:#e1f5ff
    style P1 fill:#e1f5ff
    style P2 fill:#e1f5ff
    style R0 fill:#fff4e6
    style R1 fill:#fff4e6
    style R2 fill:#fff4e6`}
          </DiagramBlock>

          <SideNote label="分片规则">
            <ul className="space-y-2 text-sm">
              <li>副本分片不能与主分片在同一节点</li>
              <li>分片数量创建后不可修改（除非 Reindex）</li>
              <li>建议单个分片大小 10-50GB</li>
              <li>副本数量可以动态调整</li>
            </ul>
          </SideNote>

          <h3 id="cluster-health" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 集群健康
          </h3>

          <Playground
            code={`# 查看集群健康状态
GET /_cluster/health

# 响应示例
{
  "cluster_name": "my-cluster",
  "status": "green",
  "timed_out": false,
  "number_of_nodes": 3,
  "number_of_data_nodes": 3,
  "active_primary_shards": 10,
  "active_shards": 20,
  "relocating_shards": 0,
  "initializing_shards": 0,
  "unassigned_shards": 0
}

# 查看节点信息
GET /_cat/nodes?v

# 查看索引状态
GET /_cat/indices?v

# 查看分片分配
GET /_cat/shards?v`}
            language="json"
            description="集群监控 API"
          />

          <table className="w-full border-collapse my-4 text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left">状态</th>
                <th className="border border-border-light px-3 py-2 text-left">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold text-green-600">green</td>
                <td className="border border-border-light px-3 py-2">所有主分片和副本分片都正常</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold text-yellow-600">yellow</td>
                <td className="border border-border-light px-3 py-2">所有主分片正常，但部分副本分片未分配</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold text-red-600">red</td>
                <td className="border border-border-light px-3 py-2">部分主分片未分配，数据不完整</td>
              </tr>
            </tbody>
          </table>

          <h2 id="optimization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、性能优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ES 性能优化涉及索引设计、查询优化、硬件配置等多个方面。
          </p>

          <h3 id="index-design" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 索引设计
          </h3>

          <table className="w-full border-collapse my-4 text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left">优化策略</th>
                <th className="border border-border-light px-3 py-2 text-left">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">合理设置分片数</td>
                <td className="border border-border-light px-3 py-2">根据数据量预估，单个分片 10-50GB</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">使用合适的字段类型</td>
                <td className="border border-border-light px-3 py-2">不需要分词的字段用 keyword，数值用 integer/float</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">禁用 _all 字段</td>
                <td className="border border-border-light px-3 py-2">ES 6.x+ 已默认禁用，减少存储开销</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">使用 Index Lifecycle Management</td>
                <td className="border border-border-light px-3 py-2">自动管理冷热数据，过期数据自动删除</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">批量写入</td>
                <td className="border border-border-light px-3 py-2">使用 Bulk API，每批 1000-5000 条</td>
              </tr>
            </tbody>
          </table>

          <h3 id="query-optimize" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 查询优化
          </h3>

          <Playground
            code={`# 优化前：扫描所有字段
GET /products/_search
{
  "query": {
    "match_all": {}
  }
}

# 优化后：指定需要的字段
GET /products/_search
{
  "_source": ["name", "price"],
  "query": {
    "match": {
      "name": "手机"
    }
  },
  "size": 10
}

# 使用 filter 缓存
GET /products/_search
{
  "query": {
    "bool": {
      "filter": [
        { "term": { "category": "手机" } },
        { "range": { "price": { "gte": 1000 } } }
      ]
    }
  }
}

# 避免深度分页
GET /products/_search
{
  "query": { "match_all": {} },
  "size": 10,
  "search_after": [1234567890, "doc_id"]
}`}
            language="json"
            description="查询优化示例"
          />

          <Callout type="warning" title="深度分页问题">
            <strong>问题：</strong>使用 from + size 进行深度分页（如 from=10000, size=10）会导致性能急剧下降。<br/>
            <strong>解决方案：</strong>
            <ul className="mt-2 space-y-1 ml-4">
              <li>使用 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">search_after</code> 游标分页</li>
              <li>限制最大分页深度（<code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">index.max_result_window</code>）</li>
              <li>使用 Scroll API 处理全量数据导出</li>
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
                <td className="border border-border-light px-3 py-2">ES 可以替代数据库</td>
                <td className="border border-border-light px-3 py-2">ES 不适合事务操作和数据强一致性场景，应与数据库配合使用</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">分片越多越好</td>
                <td className="border border-border-light px-3 py-2">过多分片会增加集群负担，影响性能，应根据数据量合理规划</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">所有字段都启用分词</td>
                <td className="border border-border-light px-3 py-2">ID、枚举值等精确匹配字段应使用 keyword 类型，不分词</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">ES 查询总是很快</td>
                <td className="border border-border-light px-3 py-2">糟糕的查询设计（如通配符前缀、深度分页）会导致性能问题</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">副本越多越安全</td>
                <td className="border border-border-light px-3 py-2">副本增加存储成本和写入压力，通常 1-2 个副本即可</td>
              </tr>
            </tbody>
          </table>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "Elasticsearch 的倒排索引是什么？如何实现全文检索？",
                answer: "倒排索引将文档内容拆分为词条（Term），建立词条到文档 ID 列表的映射。搜索时，先对查询词分词，然后在倒排索引中查找匹配的词条，获取文档 ID 列表，最后合并结果并计算相关性评分。相比正排索引（文档 ID → 内容），倒排索引更适合全文检索场景。"
              },
              {
                question: "ES 集群的分片和副本机制是怎样的？",
                answer: "索引被划分为多个主分片（Primary Shard），每个主分片可以有多个副本分片（Replica Shard）。写入时数据先写入主分片，然后异步复制到副本分片。读取时可以负载均衡到副本分片。副本分片不能与主分片在同一节点，确保高可用。分片数量创建后不可修改，副本数量可以动态调整。"
              },
              {
                question: "ES 中的 term 和 match 查询有什么区别？",
                answer: "term 查询用于精确匹配，不会对查询词分词，适合 keyword、数值、日期等字段；match 查询会对查询词分词，然后匹配文档，适合 text 类型字段。例如搜索 '苹果手机'，term 会精确匹配整个字符串，match 会分词为 '苹果' 和 '手机' 分别匹配。"
              },
              {
                question: "如何优化 Elasticsearch 的写入性能？",
                answer: "① 使用 Bulk API 批量写入，每批 1000-5000 条；② 适当增加 refresh_interval（默认 1s，可调整为 30s）；③ 减少副本数量（写入时可设为 0，完成后恢复）；④ 使用 SSD 磁盘；⑤ 调整 JVM Heap 大小（不超过 32GB）；⑥ 禁用 _all 字段和不必要的字段存储。"
              },
              {
                question: "ES 的深度分页问题如何解决？",
                answer: "使用 from + size 进行深度分页会导致性能问题，因为每个分片都要返回 from + size 条数据，协调节点再合并排序。解决方案：① 使用 search_after 游标分页（推荐）；② 限制最大分页深度；③ 使用 Scroll API 处理全量数据导出；④ 业务上限制用户只能查看前 N 页。"
              },
              {
                question: "ES 集群健康状态 green、yellow、red 分别代表什么？",
                answer: "green：所有主分片和副本分片都正常；yellow：所有主分片正常，但部分副本分片未分配（如单节点集群）；red：部分主分片未分配，数据不完整。yellow 状态不影响读写，但失去高可用；red 状态会导致部分数据不可用，需要立即处理。"
              },
              {
                question: "ES 和传统关系型数据库的区别是什么？",
                answer: "ES 是分布式搜索引擎，擅长全文检索、聚合分析、水平扩展，但不支持事务、JOIN、复杂更新；RDBMS 支持 ACID 事务、复杂查询、数据强一致性，但全文检索性能差、水平扩展困难。两者应配合使用：RDBMS 存储核心业务数据，ES 用于搜索和分析。"
              }
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、ES vs 传统数据库
          </h2>

          <table className="w-full border-collapse my-4 text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left">维度</th>
                <th className="border border-border-light px-3 py-2 text-left">Elasticsearch</th>
                <th className="border border-border-light px-3 py-2 text-left">关系型数据库</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">数据模型</td>
                <td className="border border-border-light px-3 py-2">文档（JSON）</td>
                <td className="border border-border-light px-3 py-2">表（行/列）</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">查询能力</td>
                <td className="border border-border-light px-3 py-2">全文检索、模糊匹配、聚合分析</td>
                <td className="border border-border-light px-3 py-2">精确查询、JOIN、事务</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">扩展性</td>
                <td className="border border-border-light px-3 py-2">天然分布式，水平扩展</td>
                <td className="border border-border-light px-3 py-2">垂直扩展为主，分库分表复杂</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">事务支持</td>
                <td className="border border-border-light px-3 py-2">不支持 ACID</td>
                <td className="border border-border-light px-3 py-2">完整 ACID 支持</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">适用场景</td>
                <td className="border border-border-light px-3 py-2">日志分析、商品搜索、推荐系统</td>
                <td className="border border-border-light px-3 py-2">订单管理、用户信息、金融交易</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="选型建议">
            <strong>使用 ES：</strong>全文检索、日志分析、实时监控、推荐系统、需要水平扩展的场景。<br/>
            <strong>使用 RDBMS：</strong>事务处理、复杂 JOIN、数据强一致性、结构化数据存储。<br/>
            <strong>混合架构：</strong>大多数系统同时使用两者，RDBMS 存储核心数据，ES 提供搜索和分析能力，通过 Canal/Logstash 同步数据。
          </Callout>

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Elasticsearch 作为大数据生态的重要组件，与多个知识点紧密相关：
          </p>

          <ul className="space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
            <li>📌 <strong>Hive 数据仓库</strong>：Hive 适合离线批处理，ES 适合实时检索，两者常结合使用</li>
            <li>📌 <strong>向量数据库</strong>：ES 8.x+ 支持向量搜索，可与专用向量数据库对比学习</li>
            <li>📌 <strong>语义搜索优化</strong>：ES 结合向量嵌入可实现语义搜索，提升搜索体验</li>
            <li>📌 <strong>Kafka</strong>：日志数据通常通过 Kafka → Logstash → ES 流程处理</li>
            <li>📌 <strong>分布式系统</strong>：ES 的分布式架构、一致性协议值得深入学习</li>
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
