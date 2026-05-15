import{j as e,g as d}from"./index-hyqxTCwJ.js";import{K as i}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as o}from"./SideNote-BKvanovA.js";import{C as t,A as a,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as n}from"./DiagramBlock-CLaKE9_7.js";import{I as c}from"./InterviewSection-BBNdwyyN.js";const x=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"core",text:"核心原理",level:2},{id:"workflow",text:"工作流程",level:2},{id:"implementation",text:"实现示例",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比分析",level:2},{id:"related",text:"知识关联",level:2}];function y({meta:r}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(i,{meta:r,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["文档处理与切分（Document Processing & Chunking）是将",e.jsx("strong",{className:"text-accent",children:"非结构化文档"}),"（PDF、Word、网页等）转换为",e.jsx("strong",{className:"text-accent",children:"适合向量检索的文本片段"}),"的过程，包括加载、清洗、切分、元数据提取等步骤。"]})}),e.jsx(t,{type:"tip",title:"为什么需要文档处理？",children:"原始文档格式复杂、包含噪声，直接嵌入效果差。通过专业的加载器和切分策略，可以保留语义完整性，提升 RAG 系统的检索质量。"}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"整体架构"}),e.jsx(n,{title:"文档处理 Pipeline",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ 文档加载  │───▶│ 文本清洗  │───▶│ 文本切分  │───▶│ 元数据提取│───▶│ 向量化    │
│ (Loader) │    │(Cleaning)│    │(Splitter)│    │(Metadata)│    │(Embed)   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
     │                                                        │
     ▼                                                        ▼
  PDF/Word/HTML                                          Vector DB
  图片/音频等
            `})}),e.jsxs(o,{label:"关键挑战",children:["文档处理的难点：",e.jsx("strong",{children:"① 格式多样性"}),"（PDF、PPT、Markdown）；",e.jsx("strong",{children:"② 布局理解"}),"（表格、图表、页眉页脚）；",e.jsx("strong",{children:"③ 语义边界"}),"（在哪里切分不破坏上下文）。"]}),e.jsx("h2",{id:"core",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"核心原理"}),e.jsx("h3",{id:"document-loaders",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1. 文档加载器（Document Loaders）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"不同格式的文档需要专用加载器解析："}),e.jsx(s,{code:`from langchain_community.document_loaders import (
    PyPDFLoader, 
    Docx2txtLoader, 
    UnstructuredHTMLLoader,
    TextLoader
)

# PDF 加载
pdf_loader = PyPDFLoader("document.pdf")
pdf_docs = pdf_loader.load()

# Word 加载
docx_loader = Docx2txtLoader("document.docx")
docx_docs = docx_loader.load()

# HTML 加载
html_loader = UnstructuredHTMLLoader("page.html")
html_docs = html_loader.load()

# 纯文本加载
txt_loader = TextLoader("document.txt")
txt_docs = txt_loader.load()

print(f"PDF 页数: {len(pdf_docs)}")
print(f"第一页内容: {pdf_docs[0].page_content[:200]}")`,language:"python",highlights:[6,10,14,18,22],filename:"document_loaders.py",description:"使用 LangChain 加载不同格式文档"}),e.jsx("h3",{id:"chunking-strategies",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2. 文本切分策略"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"常见的切分策略包括："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 mb-4 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"固定大小切分"}),"：按字符/token 数切分，简单但可能切断语义"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"递归字符切分"}),"：优先在段落、句子边界切分，保持语义完整"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"语义切分"}),"：基于主题变化检测切分点，效果最好但计算成本高"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"重叠切分"}),"：相邻 chunk 保留部分重叠，避免信息丢失"]})]}),e.jsx(s,{code:`from langchain_text_splitters import (
    RecursiveCharacterTextSplitter,
    CharacterTextSplitter,
    TokenTextSplitter
)

# 方案 1: 递归字符切分（推荐）
recursive_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\\n\\n", "\\n", "。", "！", "？", " ", ""]
)

# 方案 2: 固定字符切分
char_splitter = CharacterTextSplitter(
    separator="\\n",
    chunk_size=500,
    chunk_overlap=50
)

# 方案 3: Token 切分（更精确）
token_splitter = TokenTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

# 测试切分效果
text = "这是第一段内容。\\n\\n这是第二段内容。\\n\\n这是第三段。"
chunks = recursive_splitter.split_text(text)

for i, chunk in enumerate(chunks):
    print(f"Chunk {i+1}: {chunk[:50]}...")`,language:"python",highlights:[7,15,22,29,34],filename:"chunking_strategies.py",description:"不同文本切分策略对比"}),e.jsx("h2",{id:"workflow",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"工作流程"}),e.jsx(n,{title:"完整文档处理流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
原始文档 (PDF/Word/HTML)
         │
         ▼
┌─────────────────┐
│  文档加载        │ ← PyPDFLoader / DocxLoader / etc.
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  文本提取        │ ← 去除页眉页脚、注释等
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  文本清洗        │ ← 去除多余空白、特殊字符
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  文本切分        │ ← RecursiveCharacterTextSplitter
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  元数据标注      │ ← 添加来源、页码、章节等信息
└────────┬────────┘
         │
         ▼
    Chunks + Metadata
         │
         ▼
    Embedding → Vector DB
            `})}),e.jsx("h2",{id:"implementation",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"实现示例"}),e.jsx(s,{code:`from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# 1. 加载 PDF 文档
loader = PyPDFLoader("knowledge_base.pdf")
documents = loader.load()

print(f"加载了 {len(documents)} 页")

# 2. 文本清洗和切分
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    length_function=len,
)

chunks = text_splitter.split_documents(documents)
print(f"切分为 {len(chunks)} 个 chunk")

# 3. 添加元数据
for i, chunk in enumerate(chunks):
    chunk.metadata["chunk_id"] = i
    chunk.metadata["source_page"] = chunk.metadata.get("page", 0)

# 4. 向量化并存储
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

# 5. 验证效果
query = "什么是 RAG?"
results = vectorstore.similarity_search(query, k=3)

for doc in results:
    print(f"内容: {doc.page_content[:100]}...")
    print(f"来源: 第 {doc.metadata['source_page']} 页")
    print("---")`,language:"python",highlights:[7,13,20,24,29,33,37],filename:"complete_pipeline.py",description:"完整的文档处理 Pipeline"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：Chunk Size 越大越好",children:[e.jsx("strong",{children:"错误认知"}),"：把整个文档作为一个 chunk，保留完整上下文。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：过大的 chunk 会稀释关键信息，降低检索精度；过小则丢失上下文。通常 200-800 tokens 是合理范围，需根据具体场景调优。"]}),e.jsxs(t,{type:"danger",title:"误区 2：无需重叠切分",children:[e.jsx("strong",{children:"错误认知"}),"：直接按固定大小切分即可。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：无重叠切分可能在边界处切断语义。设置 10-20% 的重叠率（如 chunk_size=500, overlap=50）能显著提升检索效果。"]}),e.jsxs(t,{type:"danger",title:"误区 3：忽略元数据",children:[e.jsx("strong",{children:"错误认知"}),"：只关注文本内容，不重视元数据。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：元数据（来源、页码、章节、时间戳）支持过滤和溯源，是生产系统的关键功能。务必在切分时保留和标注元数据。"]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"面试真题"}),e.jsx(c,{questions:[{question:"如何选择文本切分策略？",answer:"选择依据：<strong>① 文档类型</strong>：结构化文档（代码、表格）用专门切分器，非结构化用递归字符切分；<strong>② 应用场景</strong>：问答用较小 chunk（200-500），摘要用较大 chunk（500-1000）；<strong>③ 实验验证</strong>：在测试集上评估不同策略的 Recall@K 和生成质量；<strong>④ 默认推荐</strong>：RecursiveCharacterTextSplitter 是通用最佳选择。"},{question:"如何处理 PDF 中的表格和图片？",answer:"处理方案：<strong>① 表格</strong>：使用 UnstructuredLoader 或 PyMuPDF 提取为结构化数据，转换为 Markdown 或 JSON 格式；<strong>② 图片</strong>：使用 OCR（Tesseract、PaddleOCR）提取文字，或使用多模态模型（CLIP）生成描述；<strong>③ 混合策略</strong>：将表格/图片单独存储，通过元数据关联到主文本。"},{question:"文档处理的性能优化方法有哪些？",answer:"优化策略：<strong>① 并行处理</strong>：多进程/多线程加载和切分文档；<strong>② 缓存机制</strong>：缓存已处理的文档 embedding；<strong>③ 增量更新</strong>：仅处理新增/修改的文档；<strong>④ 异步处理</strong>：使用 asyncio 异步加载；<strong>⑤ 批量操作</strong>：批量调用 Embedding API 减少网络开销。"},{question:"如何评估文档切分的质量？",answer:"评估指标：<strong>① 语义完整性</strong>：人工检查 chunk 是否包含完整语义；<strong>② 检索效果</strong>：通过 RAG 系统的 Recall@K 间接评估；<strong>③ 重叠率分析</strong>：统计相邻 chunk 的信息冗余度；<strong>④ 长度分布</strong>：检查 chunk 长度是否均匀；<strong>⑤ A/B 测试</strong>：对比不同策略的用户满意度。"},{question:"如何处理超长文档（如书籍、论文）？",answer:"处理方案：<strong>① 层次化切分</strong>：先按章节切分，再在章节内切分；<strong>② 滑动窗口</strong>：使用较大重叠率的滑动窗口；<strong>③ 摘要增强</strong>：为每个 chunk 生成摘要作为额外索引；<strong>④ 分层检索</strong>：先检索相关章节，再在章节内精细检索；<strong>⑤ Map-Reduce</strong>：分布式处理大规模文档集。"}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"对比分析"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"切分策略"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"优点"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"缺点"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"适用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"固定字符切分"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"简单快速"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"可能切断语义"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"快速原型"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"递归字符切分"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"保持语义完整"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"计算稍慢"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"通用场景（推荐）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"Token 切分"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"精确控制长度"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"依赖 tokenizer"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"LLM 输入限制严格时"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"语义切分"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"语义边界准确"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"计算成本高"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"高质量要求场景"})]})]})]})}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"前置知识"}),e.jsx("ul",{className:"space-y-2",children:e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/rag-introduction",className:"text-primary hover:underline",children:"📖 RAG 基础概念"})})})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"延伸阅读"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/embedding-models",className:"text-primary hover:underline",children:"🔗 嵌入模型"})}),e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/vector-database",className:"text-primary hover:underline",children:"🔗 向量数据库"})})]})]})]}),e.jsx(a,{...d(r.category,r.id)})]})}),e.jsx(l,{items:x})]})}export{y as default};
