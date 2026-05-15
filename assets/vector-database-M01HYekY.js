import{j as e,g as d}from"./index-hyqxTCwJ.js";import{K as n}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as o}from"./SideNote-BKvanovA.js";import{C as r,A as a,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as i}from"./DiagramBlock-CLaKE9_7.js";import{I as c}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"core",text:"核心原理",level:2},{id:"workflow",text:"工作流程",level:2},{id:"implementation",text:"实现示例",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比分析",level:2},{id:"related",text:"知识关联",level:2}];function N({meta:t}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(n,{meta:t,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["向量数据库（Vector Database）是专门用于存储和检索",e.jsx("strong",{className:"text-accent",children:"高维向量数据"}),"的数据库系统，通过近似最近邻搜索（ANN）算法实现高效的相似度匹配，是 RAG 系统的核心基础设施。"]})}),e.jsx(r,{type:"tip",title:"为什么需要向量数据库？",children:"传统数据库无法高效处理向量相似度搜索。向量数据库通过专用索引结构（如 HNSW、IVF）将搜索复杂度从 O(n) 降低到 O(log n)，支持亿级向量的毫秒级检索。"}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"整体架构"}),e.jsx(i,{title:"向量数据库核心组件",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌─────────────────────────────────────────────┐
│           向量数据库架构                      │
├──────────┬──────────┬──────────┬────────────┤
│ 向量索引  │ 元数据存储 │ 查询引擎  │ 持久化层   │
│ (HNSW/   │(Metadata) │ (ANN     │ (Disk/     │
│  IVF)    │          │ Search)  │  Memory)    │
└──────────┴──────────┴──────────┴────────────┘
         ▲          ▲          ▲
         │          │          │
    ┌────┴────┐ ┌───┴────┐ ┌──┴──────┐
    │Embedding│ │Filter  │ │Distance │
    │ Models  │ │Conditions│ │Metrics  │
    └─────────┘ └────────┘ └─────────┘
            `})}),e.jsxs(o,{label:"主流产品",children:["常见向量数据库包括：",e.jsx("strong",{children:"Chroma"}),"（轻量级）、",e.jsx("strong",{children:"Pinecone"}),"（云端托管）、",e.jsx("strong",{children:"Milvus"}),"（大规模分布式）、",e.jsx("strong",{children:"FAISS"}),"（Facebook 开源库）。"]}),e.jsx("h2",{id:"core",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"核心原理"}),e.jsx("h3",{id:"indexing-algorithms",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1. 索引算法"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"向量数据库的核心是近似最近邻（ANN）索引算法，常见的有："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 mb-4 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"HNSW（Hierarchical Navigable Small World）"}),"：分层图结构，精度高，适合中等规模数据集"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"IVF（Inverted File Index）"}),"：倒排索引 + K-Means 聚类，适合大规模数据集"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"PQ（Product Quantization）"}),"：向量量化压缩，减少内存占用"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"LSH（Locality-Sensitive Hashing）"}),"：局部敏感哈希，速度快但精度较低"]})]}),e.jsx(s,{code:`import faiss
import numpy as np

# 创建 HNSW 索引
dimension = 768  # 向量维度
index = faiss.IndexHNSWFlat(dimension, 32)  # M=32

# 生成随机向量数据
num_vectors = 10000
vectors = np.random.random((num_vectors, dimension)).astype('float32')

# 添加向量到索引
index.add(vectors)

# 搜索 Top-K 相似向量
query_vector = np.random.random((1, dimension)).astype('float32')
k = 5
distances, indices = index.search(query_vector, k)

print("Top-5 相似向量索引:", indices[0])
print("距离:", distances[0])`,language:"python",highlights:[5,10,14,18,21],filename:"hnsw_index.py",description:"使用 FAISS 创建 HNSW 索引并搜索"}),e.jsx("h3",{id:"distance-metrics",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2. 距离度量"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"向量相似度通过距离度量计算，常用方法包括："}),e.jsx(s,{code:`import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances

vec1 = np.array([[0.1, 0.3, 0.5, 0.2]])
vec2 = np.array([[0.15, 0.28, 0.48, 0.22]])

# 余弦相似度（推荐用于文本 Embedding）
cosine_sim = cosine_similarity(vec1, vec2)[0][0]
print(f"余弦相似度: {cosine_sim:.4f}")
# 输出: 余弦相似度: 0.9987

# 欧氏距离
euclidean_dist = euclidean_distances(vec1, vec2)[0][0]
print(f"欧氏距离: {euclidean_dist:.4f}")
# 输出: 欧氏距离: 0.0374

# 内积（点积）
dot_product = np.dot(vec1[0], vec2[0])
print(f"内积: {dot_product:.4f}")
# 输出: 内积: 0.3960`,language:"python",highlights:[8,13,18],filename:"distance_metrics.py",description:"不同距离度量的对比"}),e.jsx("h2",{id:"workflow",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"工作流程"}),e.jsx(i,{title:"向量数据库操作流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
写入流程:
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ 原始文本  │───▶│ Embedding│───▶│ 构建索引  │───▶│ 持久化存储│
└──────────┘    └──────────┘    └──────────┘    └──────────┘

查询流程:
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ 查询文本  │───▶│ Embedding│───▶│ ANN 搜索  │───▶│ 返回结果  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                          │
                                    ┌─────┴─────┐
                                    │ 过滤条件   │
                                    │ (Metadata)│
                                    └───────────┘
            `})}),e.jsx("h2",{id:"implementation",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"实现示例"}),e.jsx(s,{code:`from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document

# 1. 准备文档
documents = [
    Document(page_content="Python 是一种高级编程语言", metadata={"source": "wiki"}),
    Document(page_content="Java 是面向对象的编程语言", metadata={"source": "wiki"}),
    Document(page_content="Rust 注重内存安全", metadata={"source": "blog"}),
]

# 2. 创建 Embedding
embeddings = OpenAIEmbeddings()

# 3. 创建向量数据库
vectorstore = Chroma.from_documents(documents, embeddings)

# 4. 相似度搜索
query = "什么是 Python?"
results = vectorstore.similarity_search(query, k=2)

for doc in results:
    print(f"内容: {doc.page_content}")
    print(f"元数据: {doc.metadata}")
    print("---")

# 5. 带过滤条件的搜索
results_filtered = vectorstore.similarity_search(
    query, 
    k=2,
    filter={"source": "wiki"}
)`,language:"python",highlights:[7,13,16,20,23,29],filename:"chroma_example.py",description:"使用 Chroma 向量数据库"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"常见误区"}),e.jsxs(r,{type:"danger",title:"误区 1：向量数据库就是传统数据库加向量字段",children:[e.jsx("strong",{children:"错误认知"}),"：在 MySQL/PostgreSQL 中添加一个向量字段就能实现向量搜索。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：传统数据库的向量搜索是线性扫描 O(n)，性能极差。向量数据库使用专用索引结构（HNSW、IVF）实现 O(log n) 的高效搜索，两者有本质区别。"]}),e.jsxs(r,{type:"danger",title:"误区 2：索引参数无需调优",children:[e.jsx("strong",{children:"错误认知"}),"：使用默认索引参数即可。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：HNSW 的 M 参数、efConstruction、efSearch 等对性能和精度影响巨大。需要根据数据规模和业务需求调优，通常通过 Recall@K 指标评估。"]}),e.jsxs(r,{type:"danger",title:"误区 3：向量维度越高越好",children:[e.jsx("strong",{children:"错误认知"}),"：使用更高维度的 Embedding 能提升效果。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),'：高维度带来"维度灾难"，增加计算成本和内存占用，且可能引入噪声。768-1536 维通常是性价比最高的选择。']}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"面试真题"}),e.jsx(c,{questions:[{question:"HNSW 索引的工作原理是什么？",answer:"HNSW（Hierarchical Navigable Small World）基于多层图结构：① <strong>分层设计</strong>：顶层节点少、底层节点多；② <strong>贪心搜索</strong>：从顶层开始逐层向下搜索；③ <strong>邻居连接</strong>：每个节点维护 M 个最近邻居。优势是搜索效率高（O(log n)），支持动态插入删除。缺点是内存占用较大。"},{question:"如何选择向量数据库？",answer:"选型考虑因素：<strong>① 数据规模</strong>：百万级用 Chroma/FAISS，亿级用 Milvus/Pinecone；<strong>② 部署方式</strong>：云端托管选 Pinecone，自托管选 Milvus/Chroma；<strong>③ 功能需求</strong>：是否需要混合检索、权限控制、多租户；<strong>④ 生态集成</strong>：与 LangChain、LlamaIndex 等的兼容性；<strong>⑤ 成本</strong>：开源免费 vs 云端付费。"},{question:"向量数据库如何支持过滤条件？",answer:"两种方案：<strong>① 预过滤（Pre-filtering）</strong>：先根据元数据过滤候选集，再向量搜索，适合过滤后数据量小的场景；<strong>② 后过滤（Post-filtering）</strong>：先向量搜索 Top-K，再过滤，可能导致结果不足。Milvus、Pinecone 支持高效的预过滤，通过标量索引加速。"},{question:"如何优化向量搜索性能？",answer:"优化策略：<strong>① 索引调优</strong>：调整 HNSW 的 M、efConstruction 参数；<strong>② 量化压缩</strong>：使用 PQ（Product Quantization）减少内存；<strong>③ 缓存机制</strong>：缓存热点查询结果；<strong>④ 分片并行</strong>：大数据集分片后并行搜索；<strong>⑤ GPU 加速</strong>：使用 GPU 进行向量计算。"},{question:"向量数据库与传统搜索引擎（如 Elasticsearch）的区别？",answer:'核心区别：<strong>① 搜索方式</strong>：ES 基于关键词倒排索引，向量库基于相似度；<strong>② 语义理解</strong>：向量库能理解语义相似性（"猫"≈"猫咪"），ES 只能精确/模糊匹配；<strong>③ 适用场景</strong>：ES 适合结构化搜索、全文检索，向量库适合语义搜索、推荐系统。现代方案常采用<strong>混合检索</strong>结合两者优势。'}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"对比分析"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"特性"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"Chroma"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"Pinecone"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"Milvus"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"FAISS"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"类型"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"开源"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"云端 SaaS"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"开源"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"库（非数据库）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"数据规模"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"百万级"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"十亿级"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"十亿级"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"内存限制"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"部署方式"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"本地/嵌入式"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"云端托管"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"自托管/云原生"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"本地库"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"分布式"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"❌"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"✅"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"✅"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"❌"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"学习曲线"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"低"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"低"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"中"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"高"})]})]})]})}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"前置知识"}),e.jsx("ul",{className:"space-y-2",children:e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/rag-introduction",className:"text-primary hover:underline",children:"📖 RAG 基础概念"})})})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"延伸阅读"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/embedding-models",className:"text-primary hover:underline",children:"🔗 嵌入模型"})}),e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/retrieval-optimization",className:"text-primary hover:underline",children:"🔗 检索优化策略"})})]})]})]}),e.jsx(a,{...d(t.category,t.id)})]})}),e.jsx(l,{items:m})]})}export{N as default};
