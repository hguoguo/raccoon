import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '为什么需要检索优化', level: 2 },
  { id: 'hybrid-search', text: '混合搜索（Hybrid Search）', level: 2 },
  { id: 'bm25-vector', text: 'BM25 + 向量检索的结合', level: 3 },
  { id: 'reciprocal-rank-fusion', text: 'RRF 融合算法', level: 3 },
  { id: 're-ranking', text: '重排序（Re-ranking）', level: 2 },
  { id: 'cross-encoder', text: 'Cross-Encoder 原理', level: 3 },
  { id: 'reranker-models', text: '常用重排序模型', level: 3 },
  { id: 'query-expansion', text: '查询扩展（Query Expansion）', level: 2 },
  { id: 'multi-query', text: '多查询生成', level: 3 },
  { id: 'hypothetical-doc', text: '假设性文档嵌入（HyDE）', level: 3 },
  { id: 'workflow', text: '完整工作流程', level: 2 },
  { id: 'code-example', text: '代码实战', level: 2 },
  { id: 'context-switch', text: '上下文切换', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '与基础检索对比', level: 2 },
  { id: 'related', text: '关联知识点', level: 2 },
]

export default function SemanticSearchOptimization({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <div className="knowledge-layout" data-meta={JSON.stringify(meta)}>
          {/* 一句话定义 */}
          <section id="definition" className="mb-8">
            <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 pl-4 py-3 rounded-r-lg">
              <p className="text-[15px] sm:text-base leading-relaxed text-ink font-medium">
                语义检索优化是通过<strong>混合搜索、重排序、查询扩展</strong>等策略，提升 RAG 系统召回相关性和准确率的系统性方法，解决单一向量检索在精确匹配、长尾查询、领域术语等方面的局限性。
              </p>
            </blockquote>
          </section>

          {/* 为什么需要检索优化 */}
          <section id="overview" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              为什么需要检索优化
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              基础的向量检索（Vector Search）虽然能捕捉语义相似性，但在实际生产环境中存在以下问题：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
              <li><strong>精确匹配缺失：</strong>向量检索擅长语义相似，但对专有名词、产品型号、版本号等精确匹配效果差</li>
              <li><strong>长尾查询困难：</strong>用户输入复杂查询时，单一向量可能无法覆盖所有意图</li>
              <li><strong>领域术语偏差：</strong>通用 Embedding 模型在垂直领域的专业术语上表现不佳</li>
              <li><strong>召回率与精确率矛盾：</strong>提高召回率会降低精确率，反之亦然</li>
            </ul>
            <DiagramBlock title="检索优化的三层架构">
              {`graph TD
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
    style G fill:#fff3cd`}
            </DiagramBlock>
            <SideNote label="核心思想">
              检索优化不是单一技术，而是<strong>多层级、多策略组合</strong>的系统工程，每一层都针对特定问题进行优化。
            </SideNote>
          </section>

          {/* 混合搜索 */}
          <section id="hybrid-search" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              混合搜索（Hybrid Search）
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              混合搜索的核心思想是<strong>结合向量检索和关键词检索的优势</strong>，通过融合算法得到更全面的召回结果。
            </p>

            <h3 id="bm25-vector" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              BM25 + 向量检索的结合
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong>BM25（Best Matching 25）</strong>是基于词频的传统检索算法，擅长精确匹配；<strong>向量检索</strong>基于语义相似度，擅长理解意图。两者互补：
            </p>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mb-4 text-[14px] sm:text-[15px]">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">特性</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">BM25</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">向量检索</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">匹配方式</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">词频统计</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">语义相似度</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">优势</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">精确匹配、专有名词</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">语义理解、同义词</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">劣势</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">无法理解语义</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">精确匹配弱</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">适用场景</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">产品型号、版本号</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">自然语言查询</td>
                </tr>
              </tbody>
            </table>

            <h3 id="reciprocal-rank-fusion" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              RRF 融合算法
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong>Reciprocal Rank Fusion（RRF）</strong>是一种无需调参的融合算法，通过倒数排名加权合并多个检索结果：
            </p>
            <Callout type="info" title="RRF 公式">
              <p className="font-mono text-[13px] bg-parchment-deep px-2 py-1 rounded">
                RRF_score(d) = Σ (1 / (k + rank_i(d)))
              </p>
              <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-2">
                其中 k 是常数（通常取 60），rank_i(d) 是文档 d 在第 i 个检索结果中的排名。
              </p>
            </Callout>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              RRF 的优势在于<strong>不需要归一化分数</strong>，直接基于排名进行融合，避免了不同检索器分数尺度不一致的问题。
            </p>
          </section>

          {/* 重排序 */}
          <section id="re-ranking" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              重排序（Re-ranking）
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              重排序是在初步召回后，使用更精细的模型对候选文档重新打分排序，提升最终结果的准确性。
            </p>

            <h3 id="cross-encoder" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              Cross-Encoder 原理
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong>Cross-Encoder</strong>将查询和文档拼接后输入模型，通过注意力机制深度交互，计算相关性分数：
            </p>
            <DiagramBlock title="Bi-Encoder vs Cross-Encoder">
              {`graph LR
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
    style Cross-Encoder fill:#fff3cd`}
            </DiagramBlock>
            <SideNote label="性能权衡">
              Cross-Encoder 精度高但速度慢（需对每对 query-doc 计算），因此只用于重排序 Top-100 候选，而非全量检索。
            </SideNote>

            <h3 id="reranker-models" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              常用重排序模型
            </h3>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
              <li><strong>BGE-Reranker：</strong>智源研究院开源，支持中英文，性能优异</li>
              <li><strong>Cohere Rerank：</strong>商业 API，开箱即用，支持多语言</li>
              <li><strong>Jina Reranker：</strong>Jina AI 提供，免费额度充足</li>
              <li><strong>Voyage Rerank：</strong>Voyage AI 出品，专注企业级应用</li>
            </ul>
          </section>

          {/* 查询扩展 */}
          <section id="query-expansion" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              查询扩展（Query Expansion）
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              查询扩展通过生成多个相关查询或假设性文档，扩大检索覆盖范围，提升召回率。
            </p>

            <h3 id="multi-query" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              多查询生成
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              使用 LLM 从原始查询生成多个变体，分别检索后去重合并：
            </p>
            <Playground
              language="python"
              description="多查询生成示例"
              code={`from langchain_core.prompts import ChatPromptTemplate
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
# 3. RAG 检索层性能调优技巧`}
            />

            <h3 id="hypothetical-doc" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              假设性文档嵌入（HyDE）
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong>Hypothetical Document Embeddings（HyDE）</strong>让 LLM 先生成一个假设性的答案文档，然后对该文档进行 embedding 并检索，利用答案空间的相似性找到真实文档：
            </p>
            <DiagramBlock title="HyDE 工作流程">
              {`graph LR
    A[用户查询] --> B[LLM 生成假设答案]
    B --> C[对假设答案 Embedding]
    C --> D[向量检索]
    D --> E[返回真实文档]
    E --> F[LLM 生成最终答案]
    
    style A fill:#e1f5ff
    style F fill:#d4edda
    style B fill:#fff3cd`}
            </DiagramBlock>
            <Callout type="warning" title="HyDE 的注意事项">
              HyDE 适合开放性问题，但对于事实性查询可能引入幻觉，需谨慎使用。
            </Callout>
          </section>

          {/* 完整工作流程 */}
          <section id="workflow" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              完整工作流程
            </h2>
            <DiagramBlock title="优化后的 RAG 检索流程">
              {`graph TD
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
    style H fill:#fff3cd`}
            </DiagramBlock>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              这个流程结合了多种优化策略，在实际生产中可将 MRR（Mean Reciprocal Rank）提升 30%-50%。
            </p>
          </section>

          {/* 代码实战 */}
          <section id="code-example" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              代码实战
            </h2>
            <Playground
              language="python"
              description="LangChain 实现混合搜索 + 重排序"
              code={`from langchain_community.retrievers import BM25Retriever, EnsembleRetriever
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
# 3. [doc2] Java 是企业级应用开发的主流语言...`}
            />
            <SideNote label="关键参数">
              <strong>weights：</strong>调整 BM25 和向量检索的权重，根据业务场景调优。<br/>
              <strong>top_n：</strong>重排序后保留的文档数量，通常取 3-5。
            </SideNote>
          </section>

          {/* 上下文切换 */}
          <section id="context-switch" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              上下文切换
            </h2>
            <ContextSwitcher
              simpleContent={
                <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                  <p className="text-[14px] leading-[1.8] text-ink-muted mb-3">
                    <strong>电商客服场景：</strong>用户查询包含产品型号和症状描述
                  </p>
                  <ul className="list-disc list-inside text-[14px] leading-[1.8] text-ink-muted space-y-2">
                    <li><strong>策略：</strong>混合搜索：BM25 匹配产品型号 + 向量检索理解症状</li>
                    <li><strong>示例：</strong>"iPhone 15 Pro 发热严重怎么办？"</li>
                    <li><strong>收益：</strong>精确匹配型号 + 语义理解问题</li>
                  </ul>
                </div>
              }
              hardcoreContent={
                <div className="space-y-4">
                  <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                    <h4 className="font-semibold text-ink mb-2">法律文档检索</h4>
                    <p className="text-[14px] leading-[1.8] text-ink-muted mb-2">
                      <strong>场景：</strong>需要查找特定法条和案例<br/>
                      <strong>策略：</strong>重排序：使用法律领域专用的 Cross-Encoder<br/>
                      <strong>示例：</strong>"劳动合同解除的经济补偿标准"<br/>
                      <strong>收益：</strong>提升法律术语的相关性判断精度
                    </p>
                  </div>
                  <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                    <h4 className="font-semibold text-ink mb-2">技术咨询问答</h4>
                    <p className="text-[14px] leading-[1.8] text-ink-muted mb-2">
                      <strong>场景：</strong>用户问题表述模糊或不完整<br/>
                      <strong>策略：</strong>查询扩展：多查询生成覆盖不同意图<br/>
                      <strong>示例：</strong>"Spring Boot 启动慢"<br/>
                      <strong>收益：</strong>覆盖自动配置、依赖注入、JVM 参数等多个角度
                    </p>
                  </div>
                </div>
              }
            />
          </section>

          {/* 常见误区 */}
          <section id="misconceptions" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              常见误区
            </h2>
            <div className="space-y-4">
              <Callout type="danger" title="误区 1：只用向量检索就够了">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>错误认知：</strong>向量检索能理解语义，不需要 BM25。<br/>
                  <strong>事实：</strong>对于专有名词、产品型号、版本号等，BM25 的精确匹配能力不可替代。混合搜索在生产环境中召回率可提升 20%-30%。
                </p>
              </Callout>

              <Callout type="danger" title="误区 2：重排序越准越好，应该重排全部文档">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>错误认知：</strong>Cross-Encoder 精度高，应该对所有文档重排序。<br/>
                  <strong>事实：</strong>Cross-Encoder 计算成本高（需 O(n) 次推理），只应对 Top-100 候选重排序。全量重排序会导致延迟从 100ms 增加到 10s+。
                </p>
              </Callout>

              <Callout type="danger" title="误区 3：查询扩展总是有益的">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>错误认知：</strong>生成更多查询就能召回更多内容。<br/>
                  <strong>事实：</strong>过度扩展会引入噪声，降低精确率。对于简单查询（如"Python 是什么"），单查询即可；对于复杂查询才需要扩展。应根据查询复杂度动态决定是否扩展。
                </p>
              </Callout>

              <Callout type="warning" title="误区 4：RRF 的 k 值可以随意设置">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>建议：</strong>RRF 的 k 值通常取 60，这是论文推荐的默认值。过小会导致排名靠前的文档权重过高，过大会削弱排名差异。除非有特殊需求，否则不建议调整。
                </p>
              </Callout>
            </div>
          </section>

          {/* 面试真题 */}
          <section id="interview" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              面试真题
            </h2>
            <InterviewSection
              questions={[
                {
                  question: "什么是混合搜索？为什么需要混合搜索？",
                  answer: "混合搜索是结合向量检索和关键词检索（如 BM25）的检索策略。需要混合搜索的原因是：向量检索擅长语义理解但对精确匹配弱，BM25 擅长精确匹配但无法理解语义。两者互补可提升召回率和精确率。常用 RRF 算法融合两个检索结果。"
                },
                {
                  question: "解释 RRF（Reciprocal Rank Fusion）算法的原理和优势。",
                  answer: "RRF 通过倒数排名加权融合多个检索结果：RRF_score(d) = Σ(1/(k + rank_i(d)))，k 通常取 60。优势是：① 无需归一化分数，避免不同检索器分数尺度不一致问题；② 无需调参，k=60 是经验值；③ 简单易实现，效果好。"
                },
                {
                  question: "Cross-Encoder 和 Bi-Encoder 的区别是什么？各自的应用场景？",
                  answer: "Bi-Encoder 分别编码 query 和 doc，计算余弦相似度，速度快适合召回阶段；Cross-Encoder 将 query 和 doc 拼接后输入模型，通过注意力机制深度交互，精度高但速度慢，适合重排序阶段。典型架构：Bi-Encoder 召回 Top-100，Cross-Encoder 重排序到 Top-5。"
                },
                {
                  question: "什么是 HyDE（Hypothetical Document Embeddings）？它的优缺点？",
                  answer: "HyDE 让 LLM 先生成假设性答案，对答案 embedding 后检索真实文档。优点是利用答案空间相似性，适合开放性问题；缺点是可能引入幻觉，不适合事实性查询。适用于用户问题表述不清或需要推理的场景。"
                },
                {
                  question: "如何评估检索系统的性能？常用指标有哪些？",
                  answer: "常用指标：① Recall@K：前 K 个结果中相关文档的比例，衡量召回率；② Precision@K：前 K 个结果中相关文档的比例，衡量精确率；③ MRR（Mean Reciprocal Rank）：第一个相关文档排名的倒数均值；④ NDCG（Normalized Discounted Cumulative Gain）：考虑排名位置的增益指标。生产环境通常综合使用多个指标。"
                },
                {
                  question: "在多租户 SaaS 场景中，如何实现隔离的检索优化？",
                  answer: "方案：① 数据隔离：每个租户使用独立的向量索引或添加 tenant_id 过滤；② 模型隔离：大租户可使用专用重排序模型，小租户共享；③ 策略隔离：允许租户自定义混合搜索权重、重排序阈值等参数；④ 资源隔离：通过队列限流保证公平性。Chroma、Pinecone 等支持 metadata 过滤实现数据隔离。"
                }
              ]}
            />
          </section>

          {/* 与基础检索对比 */}
          <section id="comparison" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              与基础检索对比
            </h2>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mb-4 text-[14px] sm:text-[15px]">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">维度</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">基础向量检索</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">优化后检索</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">召回率</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">中等</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">高（+20%-30%）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">精确率</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">中等</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">高（重排序提升）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">延迟</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">低（~100ms）</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">中（~300-500ms）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">复杂度</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">低</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">高（需维护多组件）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">适用场景</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">原型验证、简单场景</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">生产环境、复杂查询</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 关联知识点 */}
          <section id="related" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              关联知识点
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold text-ink mb-2">📊 向量数据库</h3>
                <p className="text-[14px] text-ink-muted">Chroma、Pinecone、Milvus 等向量存储和检索引擎</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🔍 RAG 基础概念</h3>
                <p className="text-[14px] text-ink-muted">检索增强生成的整体架构和工作流程</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🧬 嵌入模型</h3>
                <p className="text-[14px] text-ink-muted">BGE、text-embedding-ada-002 等 Embedding 模型选型</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold text-ink mb-2">⚙️ 检索优化策略</h3>
                <p className="text-[14px] text-ink-muted">前置的检索优化理论基础</p>
              </div>
            </div>
          </section>

          {/* ⚠️ ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </div>
      </div>
      
      {/* ⚠️ SmartTOC 直接渲染，不要用 <aside> 包裹！ */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
