import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'architecture', text: '核心架构', level: 2 },
  { id: 'principles', text: '核心原理详解', level: 2 },
  { id: 'llm', text: '1.1 LLM（大语言模型）', level: 3 },
  { id: 'token', text: '1.2 Token（词元）', level: 3 },
  { id: 'context-window', text: '1.3 Context Window（上下文窗口）', level: 3 },
  { id: 'temperature', text: '1.4 Temperature（温度参数）', level: 3 },
  { id: 'top-p', text: '1.5 Top P（核采样）', level: 3 },
  { id: 'embedding', text: '1.6 Embedding（向量化）', level: 3 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function LLMBasics({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      {/* Main Article */}
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>
      {/* 一句话定义 */}
      <section className="mb-8">
        <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          一句话定义
        </h2>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          LLM（Large Language Model，大语言模型）是基于海量文本数据训练的深度学习模型，能够理解和生成人类语言，通过统计概率预测下一个 Token 来完成各种自然语言处理任务。
        </p>
      </section>

      {/* 架构图 */}
      <section className="mb-8">
        <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          核心架构
        </h2>
        <DiagramBlock title="Transformer 架构概览">
          <div className="text-[13px] sm:text-[14px] font-mono text-ink-muted leading-relaxed">
            输入文本 → Tokenization → Embedding → Encoder/Decoder Layers → Output Probabilities → 采样策略 → 输出文本
          </div>
        </DiagramBlock>
        <SideNote label="技术演进">
          Transformer 架构由 Google 在 2017 年提出（论文《Attention Is All You Need》），取代了传统的 RNN/LSTM 序列模型，成为现代 LLM 的基础架构。
        </SideNote>
      </section>

      {/* 核心原理 */}
      <section className="mb-8">
        <h2 id="principles" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          核心原理详解
        </h2>

        <h3 id="llm" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          1.1 LLM（大语言模型）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          LLM 的核心是{' '}
          <span className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">
            next-token prediction
          </span>{' '}
          （下一个词元预测）。给定一段文本，模型计算词汇表中每个词作为下一个词的概率分布，然后根据采样策略选择输出。
        </p>
        <Playground
          code={`# 简化的 LLM 推理流程
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("gpt2")
tokenizer = AutoTokenizer.from_pretrained("gpt2")

input_text = "Hello, how are"
inputs = tokenizer(input_text, return_tensors="pt")

# 模型输出 logits（未归一化的概率）
with torch.no_grad():
    outputs = model(**inputs)
    logits = outputs.logits[:, -1, :]  # 最后一个 token 的 logits

# 转换为概率分布
probabilities = torch.softmax(logits, dim=-1)
top_5_tokens = torch.topk(probabilities, 5)

print("Top 5 predictions:")
for token_id, prob in zip(top_5_tokens.indices[0], top_5_tokens.values[0]):
    token = tokenizer.decode(token_id)
    print(f"  {token}: {prob.item():.4f}")`}
          language="python"
          highlights={[10, 14, 17]}
          filename="llm_inference.py"
          description="LLM 推理过程：输入文本 → 获取 logits → 概率分布 → 采样输出"
        />

        <h3 id="token" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          1.2 Token（词元）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Token 是 LLM 处理文本的基本单位。不同于单词，Token 可以是完整的词、子词或单个字符。常见的分词算法包括 BPE（Byte-Pair Encoding）、WordPiece 和 SentencePiece。
        </p>
        <Playground
          code={`from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Tokenization 示例
texts = [
    "Hello",
    "Hello world",
    "Hello world!",
    "你好世界",
    "Unbelievable"
]

for text in texts:
    tokens = tokenizer.encode(text)
    decoded = [tokenizer.decode([t]) for t in tokens]
    print(f"'{text}' → {len(tokens)} tokens: {decoded}")`}
          language="python"
          filename="tokenization_demo.py"
          description="不同文本的 Token 化结果对比"
        />
        <Callout type="tip" title="关键认知">
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>英文通常 1 个单词 ≈ 1.3 个 Token</li>
            <li>中文通常 1 个汉字 ≈ 1-2 个 Token</li>
            <li>Token 数量直接影响 API 费用和推理速度</li>
          </ul>
        </Callout>

        <h3 id="context-window" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          1.3 Context Window（上下文窗口）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Context Window 是模型一次能处理的最大 Token 数量，包括输入 prompt 和输出 response。超过窗口长度的文本会被截断或使用特殊技术（如滑动窗口、摘要压缩）。
        </p>
        <div className="overflow-x-auto my-5">
          <table className="w-full border-collapse text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment border-b-2 border-border">
                <th className="text-left py-2 px-3 font-semibold text-ink">模型</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">上下文窗口</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">等效文本量</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 font-mono text-ink-muted">GPT-3.5</td>
                <td className="py-2 px-3">16K tokens</td>
                <td className="py-2 px-3 text-ink-muted">~12,000 单词</td>
              </tr>
              <tr className="bg-parchment-soft border-b border-border-light">
                <td className="py-2 px-3 font-mono text-ink-muted">GPT-4</td>
                <td className="py-2 px-3">128K tokens</td>
                <td className="py-2 px-3 text-ink-muted">~96,000 单词</td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="py-2 px-3 font-mono text-ink-muted">Claude 3</td>
                <td className="py-2 px-3">200K tokens</td>
                <td className="py-2 px-3 text-ink-muted">~150,000 单词</td>
              </tr>
              <tr className="bg-parchment-soft">
                <td className="py-2 px-3 font-mono text-ink-muted">Gemini 1.5 Pro</td>
                <td className="py-2 px-3">1M+ tokens</td>
                <td className="py-2 px-3 text-ink-muted">~750,000 单词</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 id="temperature" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          1.4 Temperature（温度参数）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Temperature 控制输出随机性。值越高，概率分布越平坦，输出越多样但可能不准确；值越低，分布越尖锐，输出越确定但可能重复。
        </p>
        <ContextSwitcher
          simpleContent={
            <div>
              <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                <strong>直观理解：</strong>Temperature 就像"创意旋钮"
              </p>
              <ul className="list-disc list-inside space-y-1 text-[14px] sm:text-[15px] text-ink-muted">
                <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">temperature=0</code>：总是选概率最高的词，输出 deterministic</li>
                <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">temperature=0.7</code>：平衡创造性和准确性（推荐默认值）</li>
                <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">temperature=1.5</code>：高度随机，适合创意写作</li>
              </ul>
            </div>
          }
          hardcoreContent={
            <div>
              <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                <strong>数学原理：</strong>Temperature 作用于 softmax 前的 logits
              </p>
              <Playground
                code={`import numpy as np

def softmax_with_temperature(logits, temperature):
    """带温度的 softmax"""
    scaled_logits = logits / temperature
    exp_values = np.exp(scaled_logits - np.max(scaled_logits))  # 数值稳定
    probabilities = exp_values / np.sum(exp_values)
    return probabilities

# 示例：原始 logits
logits = np.array([2.0, 1.0, 0.5])

print("Original logits:", logits)
print("\nTemperature = 0.1 (deterministic):")
print(softmax_with_temperature(logits, 0.1))
print("\nTemperature = 1.0 (balanced):")
print(softmax_with_temperature(logits, 1.0))
print("\nTemperature = 5.0 (random):")
print(softmax_with_temperature(logits, 5.0))`}
                language="python"
                filename="temperature_math.py"
                description="Temperature 对概率分布的影响"
              />
            </div>
          }
        />

        <h3 id="top-p" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          1.5 Top P（核采样）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Top P（Nucleus Sampling）从累积概率达到阈值 P 的最小词集合中采样。相比 Temperature，Top P 动态调整候选集大小，避免低质量输出。
        </p>
        <Playground
          code={`import numpy as np

def top_p_sampling(probabilities, top_p=0.9):
    """Top P 采样"""
    sorted_indices = np.argsort(probabilities)[::-1]
    sorted_probs = probabilities[sorted_indices]
    
    cumulative_probs = np.cumsum(sorted_probs)
    
    # 找到累积概率首次超过 top_p 的位置
    cutoff_index = np.searchsorted(cumulative_probs, top_p) + 1
    
    # 只保留前 cutoff_index 个词
    valid_indices = sorted_indices[:cutoff_index]
    valid_probs = probabilities[valid_indices]
    
    # 重新归一化
    normalized_probs = valid_probs / np.sum(valid_probs)
    
    # 从候选集中采样
    chosen_index = np.random.choice(len(valid_indices), p=normalized_probs)
    return valid_indices[chosen_index]

# 示例
probs = np.array([0.4, 0.3, 0.15, 0.1, 0.05])
print("Original probabilities:", probs)
print("Top P=0.9 selected index:", top_p_sampling(probs, 0.9))`}
          language="python"
          filename="top_p_sampling.py"
          description="Top P 采样算法实现"
        />
        <Callout type="warning" title="Temperature vs Top P">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            两者可以同时使用！推荐配置：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">temperature=0.7, top_p=0.9</code>。Temperature 控制整体随机性，Top P 过滤极端低概率词。
          </p>
        </Callout>

        <h3 id="embedding" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          1.6 Embedding（向量化）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Embedding 将离散符号（Token）映射为连续向量空间中的点，使得语义相似的词在向量空间中距离更近。这是 LLM 理解语义的基础。
        </p>
        <DiagramBlock title="Embedding 可视化">
          <div className="text-[13px] sm:text-[14px] font-mono text-ink-muted leading-relaxed text-left">
            <div>"king"  → [0.85, -0.32, 0.67, ...]  (768维向量)</div>
            <div>"queen" → [0.82, -0.30, 0.65, ...]  (相似向量)</div>
            <div>"apple" → [-0.45, 0.78, -0.23, ...] (远离上述向量)</div>
          </div>
        </DiagramBlock>
        <Playground
          code={`from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

sentences = [
    "The cat sat on the mat",
    "A feline rested on a rug",
    "Python is a programming language"
]

embeddings = model.encode(sentences)

# 计算相似度
similarity_1_2 = np.dot(embeddings[0], embeddings[1]) / (
    np.linalg.norm(embeddings[0]) * np.linalg.norm(embeddings[1])
)
similarity_1_3 = np.dot(embeddings[0], embeddings[2]) / (
    np.linalg.norm(embeddings[0]) * np.linalg.norm(embeddings[2])
)

print(f"Semantic similarity (cat vs feline): {similarity_1_2:.4f}")
print(f"Semantic similarity (cat vs python): {similarity_1_3:.4f}")`}
          language="python"
          filename="embedding_similarity.py"
          description="使用 Embedding 计算句子语义相似度"
        />
      </section>

      {/* 常见误区 */}
      <section className="mb-8">
        <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          常见误区
        </h2>
        <Callout type="danger" title="误区 1：Token 就是单词">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            Token 不等于单词。例如 "Unbelievable" 可能被拆分为 ["Un", "believ", "able"] 三个 Token。中文更是如此，一个汉字可能是 1-2 个 Token。
          </p>
        </Callout>
        <Callout type="danger" title="误区 2：Temperature=0 完全没有随机性">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            即使 Temperature=0，如果多个 Token 概率相同，仍可能随机选择。真正的确定性需要配合 greedy decoding（贪婪解码）。
          </p>
        </Callout>
        <Callout type="danger" title="误区 3：上下文窗口越大越好">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            大上下文窗口带来更高成本和更慢推理速度。更重要的是"有效上下文"——模型在长文本中可能出现"中间丢失"现象，关键信息应放在开头或结尾。
          </p>
        </Callout>
      </section>

      {/* 面试真题 */}
      <section id="interview" className="mb-8">
        <InterviewSection
          questions={[
            {
              question: '什么是 LLM 的核心工作原理？',
              answer: 'LLM 基于 Transformer 架构，通过自注意力机制（Self-Attention）捕捉序列中长距离依赖关系。训练阶段使用 next-token prediction 任务，在海量语料上最小化交叉熵损失。推理时，给定输入序列，模型输出词汇表上的概率分布，通过采样策略（如 greedy、beam search、top-k/top-p）生成下一个 Token，循环直到生成结束标记。',
            },
            {
              question: 'Token 和 Word 有什么区别？为什么 LLM 使用 Token 而不是 Word？',
              answer: 'Token 是亚词级别（subword）单元，通过 BPE/WordPiece 等算法生成。优势：① 解决 OOV（Out-of-Vocabulary）问题，新词可拆分为已知子词；② 平衡词汇表大小和序列长度；③ 多语言友好，共享子词单元。Word-level 会导致词汇表爆炸且无法处理未登录词。',
            },
            {
              question: 'Temperature 和 Top P 的作用机制有何不同？如何配合使用？',
              answer: 'Temperature 缩放 logits 后应用 softmax，全局调整概率分布平滑度；Top P 从累积概率达阈值的候选集中采样，动态裁剪尾部低概率词。配合使用时，先用 Temperature 调整分布，再用 Top P 过滤，最后从剩余候选集采样。推荐配置：temperature=0.7, top_p=0.9，平衡创造性和准确性。',
            },
            {
              question: 'Embedding 向量为什么能捕捉语义相似性？',
              answer: 'Embedding 通过训练目标（如 MLM、NSP）学习分布式表示。语义相近的词在训练数据中上下文相似，梯度更新使它们的向量在空间中靠近。这基于分布假说（Distributional Hypothesis）："词语的意义由其上下文决定"。余弦相似度衡量向量夹角，反映语义相关程度。',
            },
            {
              question: '上下文窗口的限制对实际应用有什么影响？如何优化？',
              answer: '影响：① 长文档需分段处理，失去全局连贯性；② 多轮对话历史过长时需截断；③ RAG 场景中检索内容受限于窗口。优化策略：① 摘要压缩（用 LLM 总结历史）；② 滑动窗口（保留最近 N 轮）；③ 向量检索（只召回相关内容）；④ 分层处理（先粗筛再精读）；⑤ 使用支持更大窗口的模型。',
            },
          ]}
        />
      </section>

      {/* 知识关联 */}
      <section className="mb-8">
        <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          知识关联
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-parchment-soft rounded-paper-md border border-border">
            <h4 className="font-semibold text-ink mb-2">→ Prompt Engineering</h4>
            <p className="text-[13px] text-ink-muted">掌握基础概念后，学习如何设计高效 Prompt</p>
          </div>
          <div className="p-4 bg-parchment-soft rounded-paper-md border border-border">
            <h4 className="font-semibold text-ink mb-2">→ Structured Output</h4>
            <p className="text-[13px] text-ink-muted">理解如何让 LLM 输出结构化数据</p>
          </div>
        </div>
      </section>

      <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* Sidebar TOC */}
      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
