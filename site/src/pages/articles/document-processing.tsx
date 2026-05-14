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
  { id: 'overview', text: '整体架构', level: 2 },
  { id: 'core', text: '核心原理', level: 2 },
  { id: 'workflow', text: '工作流程', level: 2 },
  { id: 'implementation', text: '实现示例', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比分析', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function DocumentProcessing({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              文档处理与切分（Document Processing & Chunking）是将<strong className="text-accent">非结构化文档</strong>（PDF、Word、网页等）转换为<strong className="text-accent">适合向量检索的文本片段</strong>的过程，包括加载、清洗、切分、元数据提取等步骤。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要文档处理？">
            原始文档格式复杂、包含噪声，直接嵌入效果差。通过专业的加载器和切分策略，可以保留语义完整性，提升 RAG 系统的检索质量。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            整体架构
          </h2>

          <DiagramBlock title="文档处理 Pipeline">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ 文档加载  │───▶│ 文本清洗  │───▶│ 文本切分  │───▶│ 元数据提取│───▶│ 向量化    │
│ (Loader) │    │(Cleaning)│    │(Splitter)│    │(Metadata)│    │(Embed)   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
     │                                                        │
     ▼                                                        ▼
  PDF/Word/HTML                                          Vector DB
  图片/音频等
            `}</pre>
          </DiagramBlock>

          <SideNote label="关键挑战">
            文档处理的难点：<strong>① 格式多样性</strong>（PDF、PPT、Markdown）；<strong>② 布局理解</strong>（表格、图表、页眉页脚）；<strong>③ 语义边界</strong>（在哪里切分不破坏上下文）。
          </SideNote>

          <h2 id="core" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            核心原理
          </h2>

          <h3 id="document-loaders" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1. 文档加载器（Document Loaders）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            不同格式的文档需要专用加载器解析：
          </p>

          <Playground
            code={`from langchain_community.document_loaders import (
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
print(f"第一页内容: {pdf_docs[0].page_content[:200]}")`}
            language="python"
            highlights={[6, 10, 14, 18, 22]}
            filename="document_loaders.py"
            description="使用 LangChain 加载不同格式文档"
          />

          <h3 id="chunking-strategies" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2. 文本切分策略
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            常见的切分策略包括：
          </p>

          <ul className="list-disc list-inside space-y-2 mb-4 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
            <li><strong>固定大小切分</strong>：按字符/token 数切分，简单但可能切断语义</li>
            <li><strong>递归字符切分</strong>：优先在段落、句子边界切分，保持语义完整</li>
            <li><strong>语义切分</strong>：基于主题变化检测切分点，效果最好但计算成本高</li>
            <li><strong>重叠切分</strong>：相邻 chunk 保留部分重叠，避免信息丢失</li>
          </ul>

          <Playground
            code={`from langchain_text_splitters import (
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
    print(f"Chunk {i+1}: {chunk[:50]}...")`}
            language="python"
            highlights={[7, 15, 22, 29, 34]}
            filename="chunking_strategies.py"
            description="不同文本切分策略对比"
          />

          <h2 id="workflow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            工作流程
          </h2>

          <DiagramBlock title="完整文档处理流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
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
            `}</pre>
          </DiagramBlock>

          <h2 id="implementation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            实现示例
          </h2>

          <Playground
            code={`from langchain_community.document_loaders import PyPDFLoader
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
    print("---")`}
            language="python"
            highlights={[7, 13, 20, 24, 29, 33, 37]}
            filename="complete_pipeline.py"
            description="完整的文档处理 Pipeline"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            常见误区
          </h2>

          <Callout type="danger" title="误区 1：Chunk Size 越大越好">
            <strong>错误认知</strong>：把整个文档作为一个 chunk，保留完整上下文。<br/><br/>
            <strong>实际情况</strong>：过大的 chunk 会稀释关键信息，降低检索精度；过小则丢失上下文。通常 200-800 tokens 是合理范围，需根据具体场景调优。
          </Callout>

          <Callout type="danger" title="误区 2：无需重叠切分">
            <strong>错误认知</strong>：直接按固定大小切分即可。<br/><br/>
            <strong>实际情况</strong>：无重叠切分可能在边界处切断语义。设置 10-20% 的重叠率（如 chunk_size=500, overlap=50）能显著提升检索效果。
          </Callout>

          <Callout type="danger" title="误区 3：忽略元数据">
            <strong>错误认知</strong>：只关注文本内容，不重视元数据。<br/><br/>
            <strong>实际情况</strong>：元数据（来源、页码、章节、时间戳）支持过滤和溯源，是生产系统的关键功能。务必在切分时保留和标注元数据。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "如何选择文本切分策略？",
                answer: "选择依据：<strong>① 文档类型</strong>：结构化文档（代码、表格）用专门切分器，非结构化用递归字符切分；<strong>② 应用场景</strong>：问答用较小 chunk（200-500），摘要用较大 chunk（500-1000）；<strong>③ 实验验证</strong>：在测试集上评估不同策略的 Recall@K 和生成质量；<strong>④ 默认推荐</strong>：RecursiveCharacterTextSplitter 是通用最佳选择。"
              },
              {
                question: "如何处理 PDF 中的表格和图片？",
                answer: "处理方案：<strong>① 表格</strong>：使用 UnstructuredLoader 或 PyMuPDF 提取为结构化数据，转换为 Markdown 或 JSON 格式；<strong>② 图片</strong>：使用 OCR（Tesseract、PaddleOCR）提取文字，或使用多模态模型（CLIP）生成描述；<strong>③ 混合策略</strong>：将表格/图片单独存储，通过元数据关联到主文本。"
              },
              {
                question: "文档处理的性能优化方法有哪些？",
                answer: "优化策略：<strong>① 并行处理</strong>：多进程/多线程加载和切分文档；<strong>② 缓存机制</strong>：缓存已处理的文档 embedding；<strong>③ 增量更新</strong>：仅处理新增/修改的文档；<strong>④ 异步处理</strong>：使用 asyncio 异步加载；<strong>⑤ 批量操作</strong>：批量调用 Embedding API 减少网络开销。"
              },
              {
                question: "如何评估文档切分的质量？",
                answer: "评估指标：<strong>① 语义完整性</strong>：人工检查 chunk 是否包含完整语义；<strong>② 检索效果</strong>：通过 RAG 系统的 Recall@K 间接评估；<strong>③ 重叠率分析</strong>：统计相邻 chunk 的信息冗余度；<strong>④ 长度分布</strong>：检查 chunk 长度是否均匀；<strong>⑤ A/B 测试</strong>：对比不同策略的用户满意度。"
              },
              {
                question: "如何处理超长文档（如书籍、论文）？",
                answer: "处理方案：<strong>① 层次化切分</strong>：先按章节切分，再在章节内切分；<strong>② 滑动窗口</strong>：使用较大重叠率的滑动窗口；<strong>③ 摘要增强</strong>：为每个 chunk 生成摘要作为额外索引；<strong>④ 分层检索</strong>：先检索相关章节，再在章节内精细检索；<strong>⑤ Map-Reduce</strong>：分布式处理大规模文档集。"
              }
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            对比分析
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-gray-300 px-4 py-2 text-left">切分策略</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">优点</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">缺点</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">适用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">固定字符切分</td>
                  <td className="border border-gray-300 px-4 py-2">简单快速</td>
                  <td className="border border-gray-300 px-4 py-2">可能切断语义</td>
                  <td className="border border-gray-300 px-4 py-2">快速原型</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">递归字符切分</td>
                  <td className="border border-gray-300 px-4 py-2">保持语义完整</td>
                  <td className="border border-gray-300 px-4 py-2">计算稍慢</td>
                  <td className="border border-gray-300 px-4 py-2">通用场景（推荐）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Token 切分</td>
                  <td className="border border-gray-300 px-4 py-2">精确控制长度</td>
                  <td className="border border-gray-300 px-4 py-2">依赖 tokenizer</td>
                  <td className="border border-gray-300 px-4 py-2">LLM 输入限制严格时</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">语义切分</td>
                  <td className="border border-gray-300 px-4 py-2">语义边界准确</td>
                  <td className="border border-gray-300 px-4 py-2">计算成本高</td>
                  <td className="border border-gray-300 px-4 py-2">高质量要求场景</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <h3 className="font-semibold text-ink mb-2">前置知识</h3>
              <ul className="space-y-2">
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/08-ai-applications/rag-introduction" className="text-primary hover:underline">
                    📖 RAG 基础概念
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <h3 className="font-semibold text-ink mb-2">延伸阅读</h3>
              <ul className="space-y-2">
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/08-ai-applications/embedding-models" className="text-primary hover:underline">
                    🔗 嵌入模型
                  </a>
                </li>
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/08-ai-applications/vector-database" className="text-primary hover:underline">
                    🔗 向量数据库
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
