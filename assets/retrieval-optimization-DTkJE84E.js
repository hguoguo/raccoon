import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as o}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as a}from"./SideNote-BKvanovA.js";import{C as t,A as d,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as n}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"core",text:"核心原理",level:2},{id:"workflow",text:"工作流程",level:2},{id:"implementation",text:"实现示例",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比分析",level:2},{id:"related",text:"知识关联",level:2}];function u({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(o,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["检索优化策略（Retrieval Optimization）是通过",e.jsx("strong",{className:"text-accent",children:"混合检索"}),"、",e.jsx("strong",{className:"text-accent",children:"重排序"}),"、",e.jsx("strong",{className:"text-accent",children:"查询扩展"}),"等技术提升 RAG 系统召回率和精度的方法论，解决单一向量检索的局限性。"]})}),e.jsx(t,{type:"tip",title:"为什么需要检索优化？",children:"纯向量检索在处理专有名词、精确匹配时效果不佳。通过多种优化策略组合，可以显著提升检索质量，从 Top-5 Recall@K=60% 提升到 85%+。"}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"整体架构"}),e.jsx(n,{title:"检索优化技术栈",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
用户查询
   │
   ├──▶ Query Expansion (查询扩展)
   │       ├── Multi-Query (多查询生成)
   │       └── Step-back Prompting (抽象化)
   │
   ├──▶ Hybrid Search (混合检索)
   │       ├── Vector Search (向量检索)
   │       └── Keyword Search (关键词检索 BM25)
   │
   ├──▶ Re-ranking (重排序)
   │       └── Cross-Encoder 精排
   │
   └──▶ Final Results (最终结果)
            `})}),e.jsxs(a,{label:"性能提升",children:["典型优化效果：",e.jsx("strong",{children:"混合检索"}),"提升 Recall@K 10-20%，",e.jsx("strong",{children:"重排序"}),"提升 Precision@K 15-30%，",e.jsx("strong",{children:"查询扩展"}),"提升复杂查询命中率 20-40%。"]}),e.jsx("h2",{id:"core",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"核心原理"}),e.jsx("h3",{id:"hybrid-search",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1. 混合检索（Hybrid Search）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"结合向量检索（语义相似）和关键词检索（精确匹配），通过加权融合两种结果："}),e.jsx(r,{code:`from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever
from langchain_community.vectorstores import Chroma

# 1. 准备文档
documents = [...]  # 文档列表

# 2. 创建 BM25 检索器（关键词）
bm25_retriever = BM25Retriever.from_documents(documents)
bm25_retriever.k = 5

# 3. 创建向量检索器（语义）
vectorstore = Chroma.from_documents(documents, embeddings)
vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

# 4. 创建混合检索器
ensemble_retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, vector_retriever],
    weights=[0.5, 0.5]  # 权重可调整
)

# 5. 执行检索
query = "Python 异步编程"
results = ensemble_retriever.invoke(query)

print(f"检索到 {len(results)} 个相关文档")`,language:"python",highlights:[9,14,19,23,29],filename:"hybrid_search.py",description:"使用 LangChain 实现混合检索"}),e.jsx("h3",{id:"re-ranking",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2. 重排序（Re-ranking）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"使用 Cross-Encoder 模型对初步检索结果进行精排，提升 Top-K 的准确性："}),e.jsx(r,{code:`from sentence_transformers import CrossEncoder

# 加载重排序模型
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

# 查询和候选文档
query = "什么是 Python 的 GIL?"
candidates = [
    "Python GIL 是全局解释器锁",
    "Java 有多线程机制",
    "GIL 限制 CPython 多线程并行",
]

# 计算相关性分数
pairs = [[query, doc] for doc in candidates]
scores = reranker.predict(pairs)

print("重排序得分:", scores)
# 输出: [0.85, 0.12, 0.92]

# 按得分排序
ranked = sorted(zip(candidates, scores), key=lambda x: x[1], reverse=True)
for doc, score in ranked:
    print(f"[{score:.2f}] {doc}")`,language:"python",highlights:[4,13,16,19,23],filename:"reranking.py",description:"使用 Cross-Encoder 重排序"}),e.jsx("h3",{id:"query-expansion",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3. 查询扩展（Query Expansion）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"通过 LLM 生成多个相关查询，扩大检索覆盖范围："}),e.jsx(r,{code:`from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

# 多查询生成器
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个查询扩展助手。为给定问题生成 3 个不同表述的变体。"),
    ("human", "原始问题: {question}\\n\\n生成的变体:")
])

chain = prompt | llm

# 生成多查询
original_query = "Python 如何处理并发?"
response = chain.invoke({"question": original_query})
generated_queries = response.content.split("\\n")

print("原始查询:", original_query)
print("生成查询:", generated_queries)
# 输出:
# - Python 并发编程最佳实践
# - Python 多线程和多进程区别
# - Python asyncio 异步编程`,language:"python",highlights:[8,16,20,23],filename:"query_expansion.py",description:"使用 LLM 进行查询扩展"}),e.jsx("h2",{id:"workflow",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"工作流程"}),e.jsx(n,{title:"完整检索优化流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
原始查询
   │
   ▼
┌─────────────┐
│ Query       │ ← 生成 3-5 个变体查询
│ Expansion   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Hybrid      │ ← 向量 + BM25 并行检索
│ Search      │
└──────┬──────┘
       │
       ▼ (Top-50 候选)
┌─────────────┐
│ Re-ranking  │ ← Cross-Encoder 精排
└──────┬──────┘
       │
       ▼ (Top-5 最终结果)
  返回给 LLM
            `})}),e.jsx("h2",{id:"implementation",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"实现示例"}),e.jsx(r,{code:`from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import CrossEncoderReranker
from langchain_community.cross_encoders import HuggingFaceCrossEncoder

# 1. 基础检索器（混合检索）
base_retriever = ensemble_retriever  # 前面定义的混合检索器

# 2. 重排序压缩器
compressor = CrossEncoderReranker(
    model=HuggingFaceCrossEncoder(model_name="cross-encoder/ms-marco-MiniLM-L-6-v2"),
    top_n=5
)

# 3. 创建压缩检索器
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=base_retriever
)

# 4. 执行优化检索
query = "Python GIL 的影响"
docs = compression_retriever.invoke(query)

print(f"优化后返回 {len(docs)} 个高质量文档")
for i, doc in enumerate(docs):
    print(f"{i+1}. {doc.page_content[:100]}...")`,language:"python",highlights:[6,10,16,22,26],filename:"optimized_retrieval.py",description:"完整的检索优化 Pipeline"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：只有一种检索方式就够了",children:[e.jsx("strong",{children:"错误认知"}),"：向量检索或关键词检索选一个就行。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：两者互补。向量擅长语义理解，关键词擅长精确匹配。混合检索在 MTEB 榜单上 consistently 优于单一检索方式。"]}),e.jsxs(t,{type:"danger",title:"误区 2：重排序总是必要的",children:[e.jsx("strong",{children:"错误认知"}),"：所有场景都应该加重排序。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：重排序增加延迟（50-200ms），小数据集（<1000 文档）收益不明显。建议仅在大规模知识库或对精度要求极高时使用。"]}),e.jsxs(t,{type:"danger",title:"误区 3：查询扩展越多越好",children:[e.jsx("strong",{children:"错误认知"}),"：生成 10+ 个查询能覆盖更多结果。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：过多查询引入噪声，降低精度且增加成本。通常 3-5 个高质量变体最佳，需控制多样性避免冗余。"]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"面试真题"}),e.jsx(m,{questions:[{question:"混合检索如何融合不同检索器的结果？",answer:"融合策略：<strong>① 加权求和</strong>：对每个文档的多个检索得分加权求和；<strong>② Reciprocal Rank Fusion (RRF)</strong>：基于排名位置融合，公式 RRF_score = Σ(1/(k+rank_i))；<strong>③ 归一化得分</strong>：将不同检索器的得分归一化到 [0,1] 后相加。RRF 是最常用且效果稳定的方法。"},{question:"如何选择重排序模型？",answer:"选型考虑：<strong>① 精度</strong>：Cross-Encoder 比 Bi-Encoder 精度高但速度慢；<strong>② 语言</strong>：中文选 bge-reranker，英文选 ms-marco 系列；<strong>③ 延迟</strong>：在线服务用轻量模型（MiniLM），离线批处理可用大模型；<strong>④ 成本</strong>：商业 API（Cohere Rerank）vs 开源模型。推荐先试 cohere-rerank-multilingual-v3。"},{question:"查询扩展有哪些潜在风险？",answer:"主要风险：<strong>① 语义漂移</strong>：扩展查询偏离原意；<strong>② 成本增加</strong>：多次检索增加 API 调用和延迟；<strong>③ 结果冗余</strong>：多个查询返回相似文档；<strong>④ 噪声引入</strong>：低质量扩展降低精度。缓解措施：限制扩展数量、过滤低置信度查询、去重合并结果。"},{question:"如何评估检索优化的效果？",answer:"评估指标：<strong>① Recall@K</strong>：前 K 个结果中相关文档的比例；<strong>② Precision@K</strong>：前 K 个结果的准确率；<strong>③ MRR (Mean Reciprocal Rank)</strong>：第一个相关文档的排名倒数均值；<strong>④ NDCG</strong>：考虑排名位置的增益；<strong>⑤ 端到端测试</strong>：RAG 系统的最终答案质量。推荐使用 RAGAS 框架自动化评估。"},{question:"检索优化的性能瓶颈在哪里？如何优化？",answer:"瓶颈与优化：<strong>① 重排序延迟</strong>：缓存热门查询结果、批量处理；<strong>② 查询扩展成本</strong>：限制 LLM 调用次数、使用小模型；<strong>③ 混合检索复杂度</strong>：预建 BM25 索引、并行执行；<strong>④ 网络开销</strong>：本地部署 Embedding/Reranker 模型；<strong>⑤ 内存占用</strong>：使用量化模型、分页加载。"}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"对比分析"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"优化策略"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"提升效果"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"额外延迟"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"实现难度"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"混合检索"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"Recall@K +10-20%"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"+10-30ms"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"低"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"重排序"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"Precision@K +15-30%"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"+50-200ms"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"中"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"查询扩展"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"复杂查询 +20-40%"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"+500-1500ms"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"中"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"Self-Query"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"结构化查询 +25-35%"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"+300-800ms"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"高"})]})]})]})}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"前置知识"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/vector-database",className:"text-primary hover:underline",children:"📖 向量数据库"})}),e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/embedding-models",className:"text-primary hover:underline",children:"📖 嵌入模型"})})]})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"延伸阅读"}),e.jsx("ul",{className:"space-y-2",children:e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/rag-introduction",className:"text-primary hover:underline",children:"🔗 RAG 基础概念"})})})]})]}),e.jsx(d,{...i(s.category,s.id)})]})}),e.jsx(l,{items:c})]})}export{u as default};
