import{j as e,g as a}from"./index-hyqxTCwJ.js";import{C as s,A as n,S as o}from"./ArticleNav-DhfiS38Y.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as i}from"./SideNote-BKvanovA.js";import{D as d}from"./DiagramBlock-CLaKE9_7.js";import{I as l}from"./InterviewSection-BBNdwyyN.js";const x=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"core-components",text:"核心组件详解",level:2},{id:"data-connectors",text:"Data Connectors",level:3},{id:"node-parser",text:"Node Parser",level:3},{id:"index-strategies",text:"Index 策略",level:3},{id:"query-engine",text:"Query Engine & Retriever",level:3},{id:"workflow",text:"工作流程",level:2},{id:"code-example",text:"代码实战",level:2},{id:"context-switch",text:"上下文切换",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"与 LangChain 对比",level:2},{id:"related",text:"关联知识点",level:2}];function y({meta:t}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20",children:e.jsxs("div",{className:"knowledge-layout","data-meta":JSON.stringify(t),children:[e.jsx("section",{id:"definition",className:"mb-8",children:e.jsx("blockquote",{className:"border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 pl-4 py-3 rounded-r-lg",children:e.jsxs("p",{className:"text-[15px] sm:text-base leading-relaxed text-ink font-medium",children:["LlamaIndex 是一个专为大语言模型（LLM）构建的数据框架，提供",e.jsx("strong",{children:"数据摄入、索引构建、检索查询"}),"的完整链路，让开发者能够轻松将私有数据与 LLM 结合，实现 RAG（检索增强生成）应用。"]})})}),e.jsxs("section",{id:"overview",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"整体架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["LlamaIndex 的核心设计理念是",e.jsx("strong",{children:'"数据到答案"'}),"（Data to Answer），通过模块化组件实现从原始数据到智能问答的完整流程："]}),e.jsx(d,{title:"LlamaIndex 核心架构",children:`graph TD
    A[Data Sources<br/>PDF/Word/Web/API] --> B[Data Connectors]
    B --> C[Documents]
    C --> D[Node Parser]
    D --> E[Nodes<br/>Text/Image/Table]
    E --> F[Index Strategies]
    F --> G[Vector Store Index]
    F --> H[Tree Index]
    F --> I[List Index]
    F --> J[Keyword Table Index]
    G --> K[Retriever]
    H --> K
    I --> K
    J --> K
    K --> L[Query Engine]
    L --> M[Response Synthesizer]
    M --> N[Final Answer]
    
    style A fill:#e1f5ff
    style N fill:#d4edda
    style F fill:#fff3cd`}),e.jsxs(i,{label:"设计哲学",children:["LlamaIndex 强调",e.jsx("strong",{children:"数据为中心"}),'，与 LangChain 的"链式调用"不同，它更注重数据的结构化处理和高效检索。']})]}),e.jsxs("section",{id:"core-components",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"核心组件详解"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-6",children:"LlamaIndex 由五大核心组件构成，每个组件都承担特定职责，可独立替换和扩展："}),e.jsx("h3",{id:"data-connectors",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Data Connectors（数据连接器）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Data Connectors 负责从各种数据源读取内容并转换为 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Document"})," 对象。支持的数据源包括："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"本地文件"}),"：PDF、Word、Markdown、CSV、JSON"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"网络资源"}),"：网页抓取、API 接口、数据库查询"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"云服务"}),"：Notion、Google Docs、Slack、GitHub"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"自定义源"}),"：通过继承 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"BaseReader"})," 实现"]})]}),e.jsx(r,{language:"python",description:"从多种数据源加载文档",code:`from llama_index.core import SimpleDirectoryReader
from llama_index.readers.web import SimpleWebPageReader
from llama_index.readers.notion import NotionPageReader

# 1. 从本地目录加载
documents = SimpleDirectoryReader("./data").load_data()

# 2. 从网页抓取
web_documents = SimpleWebPageReader().load_data(
    urls=["https://example.com/article"]
)

# 3. 从 Notion 加载
notion_documents = NotionPageReader(
    integration_token="your_token"
).load_data(page_ids=["page_id_1", "page_id_2"])

print(f"Loaded {len(documents)} documents")`}),e.jsx("h3",{id:"node-parser",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Node Parser（节点解析器）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Node Parser 将 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Document"})," 切分为更小的 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Node"})," 单元，这是检索的基本粒度。关键配置包括："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"chunk_size"}),"：每个节点的文本长度（默认 1024 tokens）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"chunk_overlap"}),"：相邻节点的重叠部分（默认 20 tokens），避免信息割裂"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"separator"}),"：切分分隔符（默认按段落、句子层级切分）"]})]}),e.jsx(r,{language:"python",description:"自定义节点切分策略",code:`from llama_index.core.node_parser import SentenceSplitter

# 自定义切分器
parser = SentenceSplitter(
    chunk_size=512,        # 每块 512 tokens
    chunk_overlap=50,      # 重叠 50 tokens
    paragraph_separator="

"
)

nodes = parser.get_nodes_from_documents(documents)
print(f"Split into {len(nodes)} nodes")
print(f"First node length: {len(nodes[0].get_content())} chars")`}),e.jsx("h3",{id:"index-strategies",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Index 策略（索引类型）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Index 是 LlamaIndex 的核心抽象，定义了数据的组织方式和检索逻辑。主要类型包括："}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-100 dark:bg-gray-800",children:[e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"索引类型"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"适用场景"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"检索方式"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:e.jsx("code",{className:"font-mono text-[13px]",children:"VectorStoreIndex"})}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"语义搜索、相似度匹配"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"向量相似度（ cosine similarity ）"})]}),e.jsxs("tr",{className:"bg-gray-50 dark:bg-gray-900/50",children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:e.jsx("code",{className:"font-mono text-[13px]",children:"TreeIndex"})}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"层次化数据、摘要生成"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"自顶向下遍历树结构"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:e.jsx("code",{className:"font-mono text-[13px]",children:"ListIndex"})}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"顺序遍历、全量扫描"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"线性遍历所有节点"})]}),e.jsxs("tr",{className:"bg-gray-50 dark:bg-gray-900/50",children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:e.jsx("code",{className:"font-mono text-[13px]",children:"KeywordTableIndex"})}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"关键词匹配、精确查询"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"关键词倒排索引"})]})]})]})}),e.jsx(r,{language:"python",description:"构建向量索引并持久化",code:`from llama_index.core import VectorStoreIndex
from llama_index.vector_stores.chroma import ChromaVectorStore
import chromadb

# 1. 创建向量存储
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection("my_collection")
vector_store = ChromaVectorStore(chroma_collection=collection)

# 2. 构建索引
index = VectorStoreIndex.from_documents(
    documents,
    vector_store=vector_store,
    show_progress=True
)

# 3. 持久化
index.storage_context.persist(persist_dir="./storage")

print("Index built and persisted successfully")`}),e.jsx("h3",{id:"query-engine",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Query Engine & Retriever（查询引擎与检索器）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"Retriever"})," 负责从索引中召回相关节点，",e.jsx("strong",{children:"Query Engine"})," 则将检索结果与 LLM 结合生成最终答案。两者可独立配置："]}),e.jsx(r,{language:"python",description:"配置检索器和查询引擎",code:`from llama_index.core import VectorStoreIndex
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.postprocessor import SimilarityPostprocessor

# 1. 加载索引
index = VectorStoreIndex.from_vector_store(vector_store)

# 2. 配置检索器
retriever = VectorIndexRetriever(
    index=index,
    similarity_top_k=5,           # 返回最相关的 5 个节点
    vector_store_query_mode="default"
)

# 3. 配置后处理器（过滤低相似度结果）
postprocessor = SimilarityPostprocessor(similarity_cutoff=0.7)

# 4. 构建查询引擎
query_engine = RetrieverQueryEngine(
    retriever=retriever,
    node_postprocessors=[postprocessor],
    response_mode="compact"       # 紧凑模式，减少 token 消耗
)

# 5. 执行查询
response = query_engine.query("什么是 LlamaIndex 的核心优势？")
print(response)`})]}),e.jsxs("section",{id:"workflow",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"工作流程"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["LlamaIndex 的典型工作流程分为两个阶段：",e.jsx("strong",{children:"索引构建阶段"}),"和",e.jsx("strong",{children:"查询响应阶段"}),"："]}),e.jsx(d,{title:"LlamaIndex 双阶段工作流",children:`sequenceDiagram
    participant User as 用户
    participant App as 应用程序
    participant Index as Index
    participant Store as Vector Store
    participant LLM as LLM
    
    Note over User,LLM: 阶段一：索引构建
    App->>App: 1. 加载数据 (Data Connectors)
    App->>App: 2. 切分节点 (Node Parser)
    App->>Store: 3. 嵌入并向量化
    Store-->>App: 4. 存储向量
    App->>Index: 5. 构建索引结构
    
    Note over User,LLM: 阶段二：查询响应
    User->>App: 6. 发起查询
    App->>Index: 7. 检索相关节点
    Index->>Store: 8. 向量相似度搜索
    Store-->>Index: 9. 返回 Top-K 节点
    Index-->>App: 10. 召回结果
    App->>LLM: 11. 生成答案（Prompt + 上下文）
    LLM-->>App: 12. 返回答案
    App-->>User: 13. 展示结果`}),e.jsx(s,{type:"tip",title:"性能优化提示",children:"索引构建是一次性操作，可离线完成；查询响应是实时操作，需优化检索速度和 LLM 调用延迟。建议使用异步 API 和缓存机制提升响应速度。"})]}),e.jsxs("section",{id:"code-example",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"代码实战：构建 PDF 问答系统"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"以下示例展示如何从零构建一个基于 PDF 文档的智能问答系统："}),e.jsx(r,{language:"python",description:"从 PDF 加载到智能问答的端到端实现",code:`from llama_index.core import (
    SimpleDirectoryReader,
    VectorStoreIndex,
    Settings
)
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.query_engine import RetrieverQueryEngine

# 1. 配置全局设置
Settings.llm = OpenAI(model="gpt-4", temperature=0.1)
Settings.embed_model = OpenAIEmbedding(model="text-embedding-ada-002")

# 2. 加载 PDF 文档
documents = SimpleDirectoryReader(
    input_files=["./docs/research_paper.pdf"]
).load_data()

# 3. 自定义节点切分
parser = SentenceSplitter(
    chunk_size=512,
    chunk_overlap=50,
    paragraph_separator="

"
)
nodes = parser.get_nodes_from_documents(documents)

# 4. 构建向量索引
index = VectorStoreIndex(nodes, show_progress=True)

# 5. 配置检索器
retriever = index.as_retriever(
    similarity_top_k=5,
    similarity_cutoff=0.7
)

# 6. 构建查询引擎
query_engine = RetrieverQueryEngine.from_args(
    retriever=retriever,
    response_mode="compact"
)

# 7. 执行查询
questions = [
    "这篇论文的核心贡献是什么？",
    "实验部分使用了哪些数据集？",
    "作者提出的方法相比基线有何优势？"
]

for question in questions:
    response = query_engine.query(question)
    print(f"Q: {question}")
    print(f"A: {response}
")
    print(f"来源节点数: {len(response.source_nodes)}
")`})]}),e.jsxs("section",{id:"context-switch",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"上下文切换：不同场景的应用模式"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"LlamaIndex 支持多种应用场景，根据需求选择合适的模式："}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg",children:[e.jsxs("h3",{className:"font-semibold text-ink mb-2 flex items-center gap-2",children:[e.jsx("span",{className:"text-accent",children:"🌱"})," 简单问答模式"]}),e.jsx(r,{language:"python",description:"最简单的使用方式 - 直接查询",code:`from llama_index.core import VectorStoreIndex

index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query("你的问题")
print(response)

# 特点：
# - 快速上手，代码简洁
# - 适合原型验证和小规模数据
# - 默认使用 gpt-3.5-turbo 和 text-embedding-ada-002`})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg",children:[e.jsxs("h3",{className:"font-semibold text-ink mb-2 flex items-center gap-2",children:[e.jsx("span",{className:"text-indigo-500",children:"⚙️"})," 高级检索模式"]}),e.jsx(r,{language:"python",description:"精细化控制检索策略",code:`from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.postprocessor import (
    SimilarityPostprocessor,
    KeywordNodePostprocessor
)

# 多策略检索
retriever = VectorIndexRetriever(
    index=index,
    similarity_top_k=10,
    vector_store_query_mode="hybrid"  # 混合搜索
)

# 后处理过滤
postprocessors = [
    SimilarityPostprocessor(similarity_cutoff=0.7),
    KeywordNodePostprocessor(required_keywords=["关键术语"])
]

query_engine = RetrieverQueryEngine(
    retriever=retriever,
    node_postprocessors=postprocessors,
    response_mode="tree_summarize"  # 树形摘要模式
)

# 特点：
# - 精细控制检索策略
# - 支持混合搜索（向量 + 关键词）
# - 后处理过滤提升结果质量`})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg",children:[e.jsxs("h3",{className:"font-semibold text-ink mb-2 flex items-center gap-2",children:[e.jsx("span",{className:"text-purple-500",children:"🔍"})," 多文档对比模式"]}),e.jsx(r,{language:"python",description:"跨文档对比分析",code:`from llama_index.core import SummaryIndex
from concurrent.futures import ThreadPoolExecutor

# 为每个文档创建独立索引
indexes = {}
for doc_name, docs in documents_by_source.items():
    indexes[doc_name] = VectorStoreIndex.from_documents(docs)

# 并行查询多个文档
def query_index(index, question):
    return index.as_query_engine().query(question)

questions = ["各文档的核心观点是什么？"]
with ThreadPoolExecutor(max_workers=5) as executor:
    futures = {
        name: executor.submit(query_index, idx, questions[0])
        for name, idx in indexes.items()
    }
    
    for name, future in futures.items():
        print(f"{name}: {future.result()}")

# 特点：
# - 支持跨文档对比分析
# - 并行查询提升效率
# - 适合文献综述、竞品分析`})]})]})]}),e.jsxs("section",{id:"misconceptions",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"常见误区"}),e.jsx(s,{type:"danger",title:"误区 1：LlamaIndex 只是 LangChain 的替代品",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),'：LlamaIndex 和 LangChain 定位不同。LangChain 是通用的 LLM 应用开发框架，强调"链式编排"；LlamaIndex 专注于数据处理和检索，是 RAG 应用的专用工具。两者可以配合使用（LlamaIndex 可作为 LangChain 的检索组件）。']})}),e.jsx(s,{type:"danger",title:"误区 2：chunk_size 越大越好",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：过大的 chunk_size 会导致检索精度下降（噪声增多），过小则可能割裂语义。最佳实践是根据文档类型调整：技术文档 256-512 tokens，新闻报道 512-1024 tokens，学术论文 1024-2048 tokens。务必通过实验验证。"]})}),e.jsx(s,{type:"danger",title:"误区 3：VectorStoreIndex 是唯一选择",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：VectorStoreIndex 适合语义搜索，但并非万能。对于需要精确匹配的場景（如代码查询、数据库记录），KeywordTableIndex 更高效；对于层次化数据（如书籍目录），TreeIndex 更合适。应根据业务场景选择索引类型，甚至混合使用。"]})}),e.jsx(s,{type:"warning",title:"误区 4：忽略 embedding 模型的选择",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：embedding 模型直接影响检索质量。OpenAI 的 text-embedding-ada-002 是通用选择，但对于特定领域（如医疗、法律），应使用领域专用的 embedding 模型（如 BioBERT、Legal-BERT）。中文场景推荐使用 bge-m3、text2vec 等模型。"]})})]}),e.jsxs("section",{id:"interview",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"面试真题"}),e.jsx(l,{questions:[{question:"LlamaIndex 的核心组件有哪些？各自的作用是什么？",answer:"LlamaIndex 有五大核心组件：(1) Data Connectors：从各种数据源加载数据并转换为 Document；(2) Node Parser：将 Document 切分为 Node，是检索的基本单位；(3) Index：定义数据组织方式和检索逻辑，如 VectorStoreIndex、TreeIndex；(4) Retriever：从索引中召回相关节点；(5) Query Engine：整合检索结果和 LLM 生成最终答案。这些组件模块化设计，可独立替换和扩展。"},{question:"VectorStoreIndex 的工作原理是什么？",answer:"VectorStoreIndex 的工作流程：(1) 将文本节点通过 embedding 模型转换为向量；(2) 将向量存储到向量数据库（如 Chroma、Pinecone、FAISS）；(3) 查询时，将问题也转换为向量；(4) 计算问题向量与存储向量的相似度（通常用余弦相似度）；(5) 返回 Top-K 最相似的节点作为上下文；(6) 将上下文和问题一起发送给 LLM 生成答案。关键在于向量空间中的语义相似性匹配。"},{question:"如何优化 LlamaIndex 的检索性能？",answer:"优化策略包括：(1) 调整 chunk_size 和 chunk_overlap，平衡检索精度和上下文完整性；(2) 选择合适的 embedding 模型，必要时使用领域专用模型；(3) 配置 similarity_top_k 和 similarity_cutoff，过滤低质量结果；(4) 使用后处理器（Postprocessor）如 SimilarityPostprocessor、KeywordNodePostprocessor；(5) 使用混合检索（hybrid search）结合向量和关键词；(6) 缓存常用查询结果；(7) 异步处理批量查询。"},{question:"LlamaIndex 与 LangChain 的区别和联系是什么？",answer:"区别：(1) 定位不同：LangChain 是通用 LLM 应用框架，强调链式编排；LlamaIndex 专注数据处理和检索，是 RAG 专用工具。(2) 核心抽象不同：LangChain 以 Chain 为核心，LlamaIndex 以 Index 为核心。(3) 数据流不同：LangChain 侧重流程控制，LlamaIndex 侧重数据结构化。联系：(1) 两者可配合使用，LlamaIndex 可作为 LangChain 的检索组件。(2) 都支持多种 LLM 提供商和向量数据库。(3) 社区生态互补，很多项目同时使用两者。"},{question:"如何处理大规模文档的索引构建？",answer:"大规模文档处理策略：(1) 分批处理：将文档分成小批次，避免内存溢出；(2) 增量索引：只对新文档或变更文档进行索引，使用 index.insert() 而非重建；(3) 分布式构建：使用 Spark、Dask 等分布式框架并行处理；(4) 异步嵌入：使用异步 API 并发调用 embedding 模型；(5) 向量数据库优化：使用 HNSW、IVF 等高效索引算法；(6) 持久化存储：定期保存索引进度，支持断点续传；(7) 监控资源使用：设置超时和重试机制。"},{question:"什么是 Response Synthesizer？有哪些模式？",answer:"Response Synthesizer 负责将检索到的节点和原始问题组合成 Prompt，发送给 LLM 生成答案。主要模式：(1) compact：将所有节点压缩到一个 Prompt 中，适合少量节点；(2) tree_summarize：递归地对节点进行摘要，适合大量节点；(3) refine：迭代式优化，先生成初步答案，再用后续节点细化；(4) simple_summarize：简单拼接所有节点，快速但可能超出 token 限制；(5) no_text：只返回检索到的节点，不生成答案，适合需要人工审核的场景。选择模式需权衡准确性和速度。"}]})]}),e.jsxs("section",{id:"comparison",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"与 LangChain 对比"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"LlamaIndex 和 LangChain 都是流行的 LLM 开发框架，但侧重点不同："}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-100 dark:bg-gray-800",children:[e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"维度"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"LlamaIndex"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"LangChain"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"核心定位"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"数据处理与检索（RAG 专用）"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"通用 LLM 应用开发框架"})]}),e.jsxs("tr",{className:"bg-gray-50 dark:bg-gray-900/50",children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"核心抽象"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"Index（索引）"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"Chain（链）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"数据流"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"数据 → 索引 → 检索 → 答案"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"输入 → 组件链 → 输出"})]}),e.jsxs("tr",{className:"bg-gray-50 dark:bg-gray-900/50",children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"适用场景"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"知识库问答、文档检索、RAG 应用"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"Agent、多步推理、复杂工作流"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"学习曲线"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"较平缓，专注单一领域"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"较陡峭，概念较多"})]}),e.jsxs("tr",{className:"bg-gray-50 dark:bg-gray-900/50",children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"社区活跃度"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"快速增长中"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"非常活跃，生态丰富"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"集成能力"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"可作为 LangChain 的检索组件"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"可集成 LlamaIndex 作为 Retriever"})]})]})]})}),e.jsx(s,{type:"info",title:"选择建议",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:["如果主要需求是构建基于私有数据的问答系统，优先选择 ",e.jsx("strong",{children:"LlamaIndex"}),"；如果需要构建复杂的 Agent 或多步推理流程，优先选择 ",e.jsx("strong",{children:"LangChain"}),"。实际项目中，两者经常配合使用，发挥各自优势。"]})})]}),e.jsxs("section",{id:"related",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"关联知识点"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"📚 RAG 基础原理"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"了解检索增强生成的核心思想和工作流程"})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🗄️ 向量数据库"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"深入学习向量存储和相似度搜索技术"})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"📄 文档处理技术"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"掌握 PDF、Word 等格式的解析和清洗"})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🔗 LangChain 框架"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"对比学习通用 LLM 应用开发框架"})]})]})]}),e.jsx(n,{...a(t.category,t.id)})]})}),e.jsx(o,{items:x})]})}export{y as default};
