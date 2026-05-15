import{j as e,g as n}from"./index-hyqxTCwJ.js";import{C as r,A as a,S as l}from"./ArticleNav-DhfiS38Y.js";import{P as i}from"./Playground-C6lk-t6G.js";import{S as d}from"./SideNote-BKvanovA.js";import{D as s}from"./DiagramBlock-CLaKE9_7.js";import{I as o}from"./InterviewSection-BBNdwyyN.js";import{C as x}from"./ContextSwitcher-Cjd-h5IL.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"为什么需要检索优化",level:2},{id:"hybrid-search",text:"混合搜索（Hybrid Search）",level:2},{id:"bm25-vector",text:"BM25 + 向量检索的结合",level:3},{id:"reciprocal-rank-fusion",text:"RRF 融合算法",level:3},{id:"re-ranking",text:"重排序（Re-ranking）",level:2},{id:"cross-encoder",text:"Cross-Encoder 原理",level:3},{id:"reranker-models",text:"常用重排序模型",level:3},{id:"query-expansion",text:"查询扩展（Query Expansion）",level:2},{id:"multi-query",text:"多查询生成",level:3},{id:"hypothetical-doc",text:"假设性文档嵌入（HyDE）",level:3},{id:"workflow",text:"完整工作流程",level:2},{id:"code-example",text:"代码实战",level:2},{id:"context-switch",text:"上下文切换",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"与基础检索对比",level:2},{id:"related",text:"关联知识点",level:2}];function k({meta:t}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20",children:e.jsxs("div",{className:"knowledge-layout","data-meta":JSON.stringify(t),children:[e.jsx("section",{id:"definition",className:"mb-8",children:e.jsx("blockquote",{className:"border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 pl-4 py-3 rounded-r-lg",children:e.jsxs("p",{className:"text-[15px] sm:text-base leading-relaxed text-ink font-medium",children:["语义检索优化是通过",e.jsx("strong",{children:"混合搜索、重排序、查询扩展"}),"等策略，提升 RAG 系统召回相关性和准确率的系统性方法，解决单一向量检索在精确匹配、长尾查询、领域术语等方面的局限性。"]})})}),e.jsxs("section",{id:"overview",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"为什么需要检索优化"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"基础的向量检索（Vector Search）虽然能捕捉语义相似性，但在实际生产环境中存在以下问题："}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"精确匹配缺失："}),"向量检索擅长语义相似，但对专有名词、产品型号、版本号等精确匹配效果差"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"长尾查询困难："}),"用户输入复杂查询时，单一向量可能无法覆盖所有意图"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"领域术语偏差："}),"通用 Embedding 模型在垂直领域的专业术语上表现不佳"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"召回率与精确率矛盾："}),"提高召回率会降低精确率，反之亦然"]})]}),e.jsx(s,{title:"检索优化的三层架构",children:`graph TD
    A[用户查询] --> B[查询扩展层<br/>Query Expansion]
    B --> C[召回层<br/>Retrieval]
    C --> D[向量检索 Vector]
    C --> E[关键词检索 BM25]
    D --> F[融合层<br/>RRF / Weighted Sum]
    E --> F
    F --> G[重排序层<br/>Re-ranking]
    G --> H[Top-K 结果]
    
    style A fill:#e1f5ff
    style H fill:#d4edda
    style G fill:#fff3cd`}),e.jsxs(d,{label:"核心思想",children:["检索优化不是单一技术，而是",e.jsx("strong",{children:"多层级、多策略组合"}),"的系统工程，每一层都针对特定问题进行优化。"]})]}),e.jsxs("section",{id:"hybrid-search",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"混合搜索（Hybrid Search）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["混合搜索的核心思想是",e.jsx("strong",{children:"结合向量检索和关键词检索的优势"}),"，通过融合算法得到更全面的召回结果。"]}),e.jsx("h3",{id:"bm25-vector",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"BM25 + 向量检索的结合"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"BM25（Best Matching 25）"}),"是基于词频的传统检索算法，擅长精确匹配；",e.jsx("strong",{children:"向量检索"}),"基于语义相似度，擅长理解意图。两者互补："]}),e.jsxs("table",{className:"w-full border-collapse border border-gray-300 dark:border-gray-700 mb-4 text-[14px] sm:text-[15px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-100 dark:bg-gray-800",children:[e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left",children:"特性"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left",children:"BM25"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left",children:"向量检索"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"匹配方式"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"词频统计"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"语义相似度"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"优势"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"精确匹配、专有名词"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"语义理解、同义词"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"劣势"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"无法理解语义"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"精确匹配弱"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"适用场景"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"产品型号、版本号"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"自然语言查询"})]})]})]}),e.jsx("h3",{id:"reciprocal-rank-fusion",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"RRF 融合算法"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"Reciprocal Rank Fusion（RRF）"}),"是一种无需调参的融合算法，通过倒数排名加权合并多个检索结果："]}),e.jsxs(r,{type:"info",title:"RRF 公式",children:[e.jsx("p",{className:"font-mono text-[13px] bg-parchment-deep px-2 py-1 rounded",children:"RRF_score(d) = Σ (1 / (k + rank_i(d)))"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-2",children:"其中 k 是常数（通常取 60），rank_i(d) 是文档 d 在第 i 个检索结果中的排名。"})]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["RRF 的优势在于",e.jsx("strong",{children:"不需要归一化分数"}),"，直接基于排名进行融合，避免了不同检索器分数尺度不一致的问题。"]})]}),e.jsxs("section",{id:"re-ranking",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"重排序（Re-ranking）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"重排序是在初步召回后，使用更精细的模型对候选文档重新打分排序，提升最终结果的准确性。"}),e.jsx("h3",{id:"cross-encoder",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Cross-Encoder 原理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"Cross-Encoder"}),"将查询和文档拼接后输入模型，通过注意力机制深度交互，计算相关性分数："]}),e.jsx(s,{title:"Bi-Encoder vs Cross-Encoder",children:`graph LR
    subgraph Bi-Encoder [双编码器 - 召回阶段]
      A[Query] --> B[Embedding Model]
      C[Doc] --> D[Embedding Model]
      B --> E[Cosine Similarity]
      D --> E
    end
    
    subgraph Cross-Encoder [交叉编码器 - 重排序阶段]
      F[Query + Doc] --> G[Transformer]
      G --> H[Relevance Score]
    end
    
    style Bi-Encoder fill:#e1f5ff
    style Cross-Encoder fill:#fff3cd`}),e.jsx(d,{label:"性能权衡",children:"Cross-Encoder 精度高但速度慢（需对每对 query-doc 计算），因此只用于重排序 Top-100 候选，而非全量检索。"}),e.jsx("h3",{id:"reranker-models",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"常用重排序模型"}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"BGE-Reranker："}),"智源研究院开源，支持中英文，性能优异"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cohere Rerank："}),"商业 API，开箱即用，支持多语言"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Jina Reranker："}),"Jina AI 提供，免费额度充足"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Voyage Rerank："}),"Voyage AI 出品，专注企业级应用"]})]})]}),e.jsxs("section",{id:"query-expansion",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"查询扩展（Query Expansion）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"查询扩展通过生成多个相关查询或假设性文档，扩大检索覆盖范围，提升召回率。"}),e.jsx("h3",{id:"multi-query",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"多查询生成"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"使用 LLM 从原始查询生成多个变体，分别检索后去重合并："}),e.jsx(i,{language:"python",description:"多查询生成示例",code:`from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

# 多查询生成器
QUERY_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "你是 AI 助手，负责为给定用户问题生成 3 个不同版本的查询。"),
    ("human", "{original_query}\\n\\n生成 3 个不同版本的查询：")
])

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
chain = QUERY_PROMPT | llm

original_query = "如何优化 RAG 系统的检索性能？"
response = chain.invoke({"original_query": original_query})
print(response.content)
# 输出：
# 1. RAG 系统检索优化的最佳实践有哪些？
# 2. 提升 RAG 召回率和准确率的方法
# 3. RAG 检索层性能调优技巧`}),e.jsx("h3",{id:"hypothetical-doc",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"假设性文档嵌入（HyDE）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"Hypothetical Document Embeddings（HyDE）"}),"让 LLM 先生成一个假设性的答案文档，然后对该文档进行 embedding 并检索，利用答案空间的相似性找到真实文档："]}),e.jsx(s,{title:"HyDE 工作流程",children:`graph LR
    A[用户查询] --> B[LLM 生成假设答案]
    B --> C[对假设答案 Embedding]
    C --> D[向量检索]
    D --> E[返回真实文档]
    E --> F[LLM 生成最终答案]
    
    style A fill:#e1f5ff
    style F fill:#d4edda
    style B fill:#fff3cd`}),e.jsx(r,{type:"warning",title:"HyDE 的注意事项",children:"HyDE 适合开放性问题，但对于事实性查询可能引入幻觉，需谨慎使用。"})]}),e.jsxs("section",{id:"workflow",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"完整工作流程"}),e.jsx(s,{title:"优化后的 RAG 检索流程",children:`graph TD
    A[用户查询] --> B[查询扩展<br/>Multi-Query / HyDE]
    B --> C[并行检索]
    C --> D[向量检索<br/>Top-50]
    C --> E[BM25 检索<br/>Top-50]
    D --> F[RRF 融合]
    E --> F
    F --> G[Top-100 候选]
    G --> H[Cross-Encoder 重排序]
    H --> I[Top-5 最终结果]
    I --> J[LLM 生成答案]
    
    style A fill:#e1f5ff
    style J fill:#d4edda
    style H fill:#fff3cd`}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"这个流程结合了多种优化策略，在实际生产中可将 MRR（Mean Reciprocal Rank）提升 30%-50%。"})]}),e.jsxs("section",{id:"code-example",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"代码实战"}),e.jsx(i,{language:"python",description:"LangChain 实现混合搜索 + 重排序",code:`from langchain_community.retrievers import BM25Retriever, EnsembleRetriever
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_cohere import CohereRerank
from langchain_core.documents import Document

# 1. 准备文档
docs = [
    Document(page_content="Python 是一种广泛使用的高级编程语言", metadata={"source": "doc1"}),
    Document(page_content="Java 是企业级应用开发的主流语言", metadata={"source": "doc2"}),
    Document(page_content="JavaScript 主要用于 Web 前端开发", metadata={"source": "doc3"}),
]

# 2. 创建向量检索器
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(docs, embeddings)
vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

# 3. 创建 BM25 检索器
bm25_retriever = BM25Retriever.from_documents(docs)
bm25_retriever.k = 5

# 4. 创建混合检索器（EnsembleRetriever 内部使用 RRF）
ensemble_retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, vector_retriever],
    weights=[0.5, 0.5]  # BM25 和向量检索的权重
)

# 5. 执行混合检索
query = "Python 编程语言的特点"
initial_results = ensemble_retriever.invoke(query)
print(f"混合检索返回 {len(initial_results)} 个文档")

# 6. 重排序
reranker = CohereRerank(model="rerank-multilingual-v3.0", top_n=3)
reranked_results = reranker.compress_documents(
    documents=initial_results,
    query=query
)

print("\\n重排序后的结果：")
for i, doc in enumerate(reranked_results, 1):
    print(f"{i}. [{doc.metadata['source']}] {doc.page_content[:50]}...")
# 输出：
# 混合检索返回 6 个文档
# 
# 重排序后的结果：
# 1. [doc1] Python 是一种广泛使用的高级编程语言...
# 2. [doc3] JavaScript 主要用于 Web 前端开发...
# 3. [doc2] Java 是企业级应用开发的主流语言...`}),e.jsxs(d,{label:"关键参数",children:[e.jsx("strong",{children:"weights："}),"调整 BM25 和向量检索的权重，根据业务场景调优。",e.jsx("br",{}),e.jsx("strong",{children:"top_n："}),"重排序后保留的文档数量，通常取 3-5。"]})]}),e.jsxs("section",{id:"context-switch",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"上下文切换"}),e.jsx(x,{simpleContent:e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4",children:[e.jsxs("p",{className:"text-[14px] leading-[1.8] text-ink-muted mb-3",children:[e.jsx("strong",{children:"电商客服场景："}),"用户查询包含产品型号和症状描述"]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] leading-[1.8] text-ink-muted space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"策略："}),"混合搜索：BM25 匹配产品型号 + 向量检索理解症状"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"示例："}),'"iPhone 15 Pro 发热严重怎么办？"']}),e.jsxs("li",{children:[e.jsx("strong",{children:"收益："}),"精确匹配型号 + 语义理解问题"]})]})]}),hardcoreContent:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"法律文档检索"}),e.jsxs("p",{className:"text-[14px] leading-[1.8] text-ink-muted mb-2",children:[e.jsx("strong",{children:"场景："}),"需要查找特定法条和案例",e.jsx("br",{}),e.jsx("strong",{children:"策略："}),"重排序：使用法律领域专用的 Cross-Encoder",e.jsx("br",{}),e.jsx("strong",{children:"示例："}),'"劳动合同解除的经济补偿标准"',e.jsx("br",{}),e.jsx("strong",{children:"收益："}),"提升法律术语的相关性判断精度"]})]}),e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"技术咨询问答"}),e.jsxs("p",{className:"text-[14px] leading-[1.8] text-ink-muted mb-2",children:[e.jsx("strong",{children:"场景："}),"用户问题表述模糊或不完整",e.jsx("br",{}),e.jsx("strong",{children:"策略："}),"查询扩展：多查询生成覆盖不同意图",e.jsx("br",{}),e.jsx("strong",{children:"示例："}),'"Spring Boot 启动慢"',e.jsx("br",{}),e.jsx("strong",{children:"收益："}),"覆盖自动配置、依赖注入、JVM 参数等多个角度"]})]})]})})]}),e.jsxs("section",{id:"misconceptions",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"常见误区"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{type:"danger",title:"误区 1：只用向量检索就够了",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsx("strong",{children:"错误认知："}),"向量检索能理解语义，不需要 BM25。",e.jsx("br",{}),e.jsx("strong",{children:"事实："}),"对于专有名词、产品型号、版本号等，BM25 的精确匹配能力不可替代。混合搜索在生产环境中召回率可提升 20%-30%。"]})}),e.jsx(r,{type:"danger",title:"误区 2：重排序越准越好，应该重排全部文档",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsx("strong",{children:"错误认知："}),"Cross-Encoder 精度高，应该对所有文档重排序。",e.jsx("br",{}),e.jsx("strong",{children:"事实："}),"Cross-Encoder 计算成本高（需 O(n) 次推理），只应对 Top-100 候选重排序。全量重排序会导致延迟从 100ms 增加到 10s+。"]})}),e.jsx(r,{type:"danger",title:"误区 3：查询扩展总是有益的",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsx("strong",{children:"错误认知："}),"生成更多查询就能召回更多内容。",e.jsx("br",{}),e.jsx("strong",{children:"事实："}),'过度扩展会引入噪声，降低精确率。对于简单查询（如"Python 是什么"），单查询即可；对于复杂查询才需要扩展。应根据查询复杂度动态决定是否扩展。']})}),e.jsx(r,{type:"warning",title:"误区 4：RRF 的 k 值可以随意设置",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsx("strong",{children:"建议："}),"RRF 的 k 值通常取 60，这是论文推荐的默认值。过小会导致排名靠前的文档权重过高，过大会削弱排名差异。除非有特殊需求，否则不建议调整。"]})})]})]}),e.jsxs("section",{id:"interview",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"面试真题"}),e.jsx(o,{questions:[{question:"什么是混合搜索？为什么需要混合搜索？",answer:"混合搜索是结合向量检索和关键词检索（如 BM25）的检索策略。需要混合搜索的原因是：向量检索擅长语义理解但对精确匹配弱，BM25 擅长精确匹配但无法理解语义。两者互补可提升召回率和精确率。常用 RRF 算法融合两个检索结果。"},{question:"解释 RRF（Reciprocal Rank Fusion）算法的原理和优势。",answer:"RRF 通过倒数排名加权融合多个检索结果：RRF_score(d) = Σ(1/(k + rank_i(d)))，k 通常取 60。优势是：① 无需归一化分数，避免不同检索器分数尺度不一致问题；② 无需调参，k=60 是经验值；③ 简单易实现，效果好。"},{question:"Cross-Encoder 和 Bi-Encoder 的区别是什么？各自的应用场景？",answer:"Bi-Encoder 分别编码 query 和 doc，计算余弦相似度，速度快适合召回阶段；Cross-Encoder 将 query 和 doc 拼接后输入模型，通过注意力机制深度交互，精度高但速度慢，适合重排序阶段。典型架构：Bi-Encoder 召回 Top-100，Cross-Encoder 重排序到 Top-5。"},{question:"什么是 HyDE（Hypothetical Document Embeddings）？它的优缺点？",answer:"HyDE 让 LLM 先生成假设性答案，对答案 embedding 后检索真实文档。优点是利用答案空间相似性，适合开放性问题；缺点是可能引入幻觉，不适合事实性查询。适用于用户问题表述不清或需要推理的场景。"},{question:"如何评估检索系统的性能？常用指标有哪些？",answer:"常用指标：① Recall@K：前 K 个结果中相关文档的比例，衡量召回率；② Precision@K：前 K 个结果中相关文档的比例，衡量精确率；③ MRR（Mean Reciprocal Rank）：第一个相关文档排名的倒数均值；④ NDCG（Normalized Discounted Cumulative Gain）：考虑排名位置的增益指标。生产环境通常综合使用多个指标。"},{question:"在多租户 SaaS 场景中，如何实现隔离的检索优化？",answer:"方案：① 数据隔离：每个租户使用独立的向量索引或添加 tenant_id 过滤；② 模型隔离：大租户可使用专用重排序模型，小租户共享；③ 策略隔离：允许租户自定义混合搜索权重、重排序阈值等参数；④ 资源隔离：通过队列限流保证公平性。Chroma、Pinecone 等支持 metadata 过滤实现数据隔离。"}]})]}),e.jsxs("section",{id:"comparison",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"与基础检索对比"}),e.jsxs("table",{className:"w-full border-collapse border border-gray-300 dark:border-gray-700 mb-4 text-[14px] sm:text-[15px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-100 dark:bg-gray-800",children:[e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left",children:"维度"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left",children:"基础向量检索"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left",children:"优化后检索"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"召回率"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"中等"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"高（+20%-30%）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"精确率"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"中等"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"高（重排序提升）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"延迟"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"低（~100ms）"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"中（~300-500ms）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"复杂度"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"低"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"高（需维护多组件）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"适用场景"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"原型验证、简单场景"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"生产环境、复杂查询"})]})]})]})]}),e.jsxs("section",{id:"related",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"关联知识点"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"📊 向量数据库"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"Chroma、Pinecone、Milvus 等向量存储和检索引擎"})]}),e.jsxs("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🔍 RAG 基础概念"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"检索增强生成的整体架构和工作流程"})]}),e.jsxs("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🧬 嵌入模型"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"BGE、text-embedding-ada-002 等 Embedding 模型选型"})]}),e.jsxs("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"⚙️ 检索优化策略"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"前置的检索优化理论基础"})]})]})]}),e.jsx(a,{...n(t.category,t.id)})]})}),e.jsx(l,{items:c})]})}export{k as default};
