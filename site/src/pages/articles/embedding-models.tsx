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

export default function EmbeddingModels({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              嵌入模型（Embedding Model）是将<strong className="text-accent">文本、图像等非结构化数据</strong>转换为<strong className="text-accent">固定维度向量</strong>的机器学习模型，捕获语义信息，使计算机能够计算和理解内容之间的相似性。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 Embedding？">
            计算机无法直接理解文本的语义。Embedding 将文本映射到向量空间，语义相似的文本在空间中距离更近，从而实现语义搜索、聚类、分类等任务。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            整体架构
          </h2>

          <DiagramBlock title="Embedding 模型工作流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌──────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────┐
│ 输入文本  │────▶│ Tokenization │────▶│ Transformer │────▶│ 输出向量  │
│ "猫喜欢   │     │ (分词)       │     │ Encoder     │     │ [0.1,    │
│  鱼"]     │     │              │     │             │     │  0.3,    │
└──────────┘     └──────────────┘     └─────────────┘     │  ...]    │
                                                          └──────────┘
                                                                │
                                                                ▼
                                                         ┌──────────────┐
                                                         │ 向量空间      │
                                                         │ 语义相似度    │
                                                         └──────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="主流模型">
            常见 Embedding 模型：<strong>Sentence Transformers</strong>（开源）、<strong>BGE</strong>（阿里出品）、<strong>OpenAI Ada-002</strong>（商业 API）、<strong>Cohere Embed</strong>。
          </SideNote>

          <h2 id="core" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            核心原理
          </h2>

          <h3 id="transformer-encoder" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1. Transformer Encoder 架构
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            现代 Embedding 模型多基于 Transformer Encoder（如 BERT），通过自注意力机制捕获上下文语义：
          </p>

          <Playground
            code={`from transformers import AutoTokenizer, AutoModel
import torch

# 加载预训练模型
model_name = "sentence-transformers/all-MiniLM-L6-v2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

# 编码文本
texts = ["猫喜欢鱼", "狗喜欢骨头", "Python 是编程语言"]
inputs = tokenizer(texts, padding=True, truncation=True, return_tensors="pt")

# 获取 embeddings
with torch.no_grad():
    outputs = model(**inputs)
    # 使用 [CLS] token 的表示作为句子 embedding
    embeddings = outputs.last_hidden_state[:, 0, :]

print(f"Embedding 维度: {embeddings.shape}")
# 输出: Embedding 维度: torch.Size([3, 384])`}
            language="python"
            highlights={[5, 9, 13, 17, 21]}
            filename="embedding_basic.py"
            description="使用 Sentence Transformers 生成 Embedding"
          />

          <h3 id="similarity-calculation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2. 相似度计算
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            通过向量之间的距离或夹角衡量语义相似度：
          </p>

          <Playground
            code={`import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# 模拟两个句子的 embedding
emb1 = np.array([[0.1, 0.3, 0.5, 0.2, 0.4]])  # "猫喜欢鱼"
emb2 = np.array([[0.15, 0.28, 0.48, 0.22, 0.38]])  # "猫咪爱吃鱼"
emb3 = np.array([[0.8, 0.1, 0.2, 0.3, 0.1]])  # "今天天气好"

# 余弦相似度
sim_12 = cosine_similarity(emb1, emb2)[0][0]
sim_13 = cosine_similarity(emb1, emb3)[0][0]

print(f"\"猫喜欢鱼\" vs \"猫咪爱吃鱼\": {sim_12:.4f}")
# 输出: "猫喜欢鱼" vs "猫咪爱吃鱼": 0.9876

print(f"\"猫喜欢鱼\" vs \"今天天气好\": {sim_13:.4f}")
# 输出: "猫喜欢鱼" vs "今天天气好": 0.4523

# 结论：语义相似的句子得分更高`}
            language="python"
            highlights={[9, 10, 13, 16]}
            filename="similarity_demo.py"
            description="余弦相似度计算示例"
          />

          <h2 id="workflow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            工作流程
          </h2>

          <DiagramBlock title="Embedding 应用场景">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
语义搜索:
Query → Embedding → 向量数据库检索 → 返回相似文档

文本聚类:
文档集 → Embedding → K-Means 聚类 → 分组结果

情感分类:
文本 → Embedding → 分类器 → 正面/负面

推荐系统:
用户行为 → Embedding → 相似度匹配 → 推荐内容
            `}</pre>
          </DiagramBlock>

          <h2 id="implementation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            实现示例
          </h2>

          <Playground
            code={`from langchain_community.embeddings import HuggingFaceEmbeddings, OpenAIEmbeddings

# 方案 1: 使用开源模型（本地运行）
hf_embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-zh-v1.5",
    model_kwargs={'device': 'cpu'},  # 或 'cuda'
    encode_kwargs={'normalize_embeddings': True}
)

# 方案 2: 使用 OpenAI API（云端服务）
openai_embeddings = OpenAIEmbeddings(
    model="text-embedding-ada-002",
    openai_api_key="your-api-key"
)

# 生成 embedding
texts = ["Python 是编程语言", "Java 也是编程语言"]
embeddings_hf = hf_embeddings.embed_documents(texts)
embeddings_openai = openai_embeddings.embed_documents(texts)

print(f"HF Embedding 维度: {len(embeddings_hf[0])}")
# 输出: HF Embedding 维度: 512

print(f"OpenAI Embedding 维度: {len(embeddings_openai[0])}")
# 输出: OpenAI Embedding 维度: 1536`}
            language="python"
            highlights={[4, 11, 18, 21, 24, 27]}
            filename="embedding_comparison.py"
            description="对比开源与商业 Embedding 模型"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            常见误区
          </h2>

          <Callout type="danger" title="误区 1：所有 Embedding 模型效果一样">
            <strong>错误认知</strong>：随便选一个 Embedding 模型就行。<br/><br/>
            <strong>实际情况</strong>：不同模型在特定领域表现差异巨大。通用场景用 OpenAI Ada-002，中文场景用 BGE，代码场景用 CodeBERT。需根据业务场景选择并通过 MTEB 榜单评估。
          </Callout>

          <Callout type="danger" title="误区 2：向量维度越高越好">
            <strong>错误认知</strong>：1536 维一定比 384 维效果好。<br/><br/>
            <strong>实际情况</strong>：高维度带来更高的存储和计算成本，但未必提升效果。小规模数据集用低维模型（384-768 维）性价比更高。
          </Callout>

          <Callout type="danger" title="误区 3：Embedding 是一次性工作">
            <strong>错误认知</strong>：生成一次 embedding 就够用了。<br/><br/>
            <strong>实际情况</strong>：当知识库更新、模型升级或业务需求变化时，需要重新生成 embedding。建议建立自动化 pipeline 定期更新。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "Embedding 模型的工作原理是什么？",
                answer: "核心流程：<strong>① Tokenization</strong>：将文本切分为 token；<strong>② Embedding Layer</strong>：token 转为向量；<strong>③ Transformer Encoder</strong>：通过自注意力机制捕获上下文；<strong>④ Pooling</strong>：聚合 token 向量为句子向量（常用 [CLS] 或 mean pooling）；<strong>⑤ Normalization</strong>：L2 归一化便于计算余弦相似度。"
              },
              {
                question: "如何选择 Embedding 模型？",
                answer: "选型考虑：<strong>① 语言</strong>：中文选 BGE/m3e，英文选 OpenAI/Sentence-BERT；<strong>② 性能</strong>：参考 MTEB 榜单；<strong>③ 成本</strong>：开源免费但需算力，API 付费但便捷；<strong>④ 维度</strong>：根据存储和精度需求平衡；<strong>⑤ 延迟</strong>：实时场景需低延迟模型。建议在小规模测试集上 A/B 测试。"
              },
              {
                question: "Embedding 模型的局限性有哪些？",
                answer: "主要局限：<strong>① 长文本</strong>：超过最大长度（通常 512 tokens）需切分，丢失全局信息；<strong>② 细粒度差异</strong>：难以区分细微语义差别；<strong>③ 多义词</strong>：同一词在不同语境下可能映射到相似向量；<strong>④ 领域适配</strong>：通用模型在专业领域表现不佳，需微调。"
              },
              {
                question: "如何优化 Embedding 的效果？",
                answer: "优化策略：<strong>① 模型微调</strong>：在领域数据上 fine-tune；<strong>② Prompt Engineering</strong>：添加指令前缀（如 \"Represent this sentence for searching...\"）；<strong>③ 混合 Embedding</strong>：结合多个模型的结果；<strong>④ 后处理</strong>：PCA 降维、白化变换；<strong>⑤ 数据增强</strong>：扩充训练数据多样性。"
              },
              {
                question: "Embedding 与传统 TF-IDF 的区别？",
                answer: "核心区别：<strong>① 语义理解</strong>：Embedding 捕获语义（\"猫\"≈\"猫咪\"），TF-IDF 仅统计词频；<strong>② 稀疏性</strong>：Embedding 是稠密向量，TF-IDF 是稀疏向量；<strong>③ 维度</strong>：Embedding 固定维度（384-1536），TF-IDF 维度等于词表大小；<strong>④ 适用场景</strong>：Embedding 适合语义搜索，TF-IDF 适合关键词匹配。现代系统常结合两者。"
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
                  <th className="border border-gray-300 px-4 py-2 text-left">特性</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">OpenAI Ada-002</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">BGE</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Sentence-BERT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">类型</td>
                  <td className="border border-gray-300 px-4 py-2">商业 API</td>
                  <td className="border border-gray-300 px-4 py-2">开源</td>
                  <td className="border border-gray-300 px-4 py-2">开源</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">维度</td>
                  <td className="border border-gray-300 px-4 py-2">1536</td>
                  <td className="border border-gray-300 px-4 py-2">512-1024</td>
                  <td className="border border-gray-300 px-4 py-2">384-768</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">中文支持</td>
                  <td className="border border-gray-300 px-4 py-2">一般</td>
                  <td className="border border-gray-300 px-4 py-2">优秀</td>
                  <td className="border border-gray-300 px-4 py-2">需微调</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">成本</td>
                  <td className="border border-gray-300 px-4 py-2">$0.0001/1K tokens</td>
                  <td className="border border-gray-300 px-4 py-2">免费（需算力）</td>
                  <td className="border border-gray-300 px-4 py-2">免费（需算力）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">MTEB 排名</td>
                  <td className="border border-gray-300 px-4 py-2">Top 10</td>
                  <td className="border border-gray-300 px-4 py-2">Top 5</td>
                  <td className="border border-gray-300 px-4 py-2">Top 20</td>
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
                  <a href="/docs/08-ai-applications/vector-database" className="text-primary hover:underline">
                    🔗 向量数据库
                  </a>
                </li>
                <li className="text-[13px] sm:text-[14px] text-ink-muted">
                  <a href="/docs/08-ai-applications/document-processing" className="text-primary hover:underline">
                    🔗 文档处理与切分
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
