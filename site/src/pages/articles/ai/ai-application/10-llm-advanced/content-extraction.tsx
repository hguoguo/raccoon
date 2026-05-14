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
  { id: 'overview', text: '信息抽取概述', level: 2 },
  { id: 'ner', text: '命名实体识别（NER）', level: 2 },
  { id: 'ner-models', text: '常用 NER 模型', level: 3 },
  { id: 'ner-evaluation', text: '评估指标', level: 3 },
  { id: 'relation-extraction', text: '关系抽取', level: 2 },
  { id: 'relation-methods', text: '抽取方法', level: 3 },
  { id: 'event-extraction', text: '事件抽取', level: 2 },
  { id: 'event-components', text: '事件要素', level: 3 },
  { id: 'knowledge-graph', text: '知识图谱构建', level: 2 },
  { id: 'kg-pipeline', text: '构建流程', level: 3 },
  { id: 'workflow', text: '完整工作流程', level: 2 },
  { id: 'code-example', text: '代码实战', level: 2 },
  { id: 'context-switch', text: '上下文切换', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '与传统 NLP 对比', level: 2 },
  { id: 'related', text: '关联知识点', level: 2 },
]

export default function ContentExtraction({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <div className="knowledge-layout" data-meta={JSON.stringify(meta)}>
          {/* 一句话定义 */}
          <section id="definition" className="mb-8">
            <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 pl-4 py-3 rounded-r-lg">
              <p className="text-[15px] sm:text-base leading-relaxed text-ink font-medium">
                信息抽取（Information Extraction, IE）是从非结构化文本中自动提取<strong>实体、关系、事件</strong>等结构化信息的技术，是构建知识图谱、智能问答系统的基础。
              </p>
            </blockquote>
          </section>

          {/* 信息抽取概述 */}
          <section id="overview" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              信息抽取概述
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              信息抽取是自然语言处理（NLP）的核心任务之一，目标是将非结构化文本转化为结构化数据。主要包含三个子任务：
            </p>
            <DiagramBlock title="信息抽取三大核心任务">
              {`graph TD
    A[非结构化文本] --> B[命名实体识别 NER]
    A --> C[关系抽取 RE]
    A --> D[事件抽取 EE]
    
    B --> E[实体: 人名/地名/机构名]
    C --> F[关系: 工作于/位于/属于]
    D --> G[事件: 时间/地点/参与者]
    
    E --> H[知识图谱]
    F --> H
    G --> H
    
    style A fill:#e1f5ff
    style H fill:#d4edda`}
            </DiagramBlock>
            <SideNote label="应用场景">
              信息抽取广泛应用于<strong>搜索引擎、智能客服、金融风控、医疗诊断、法律文档分析</strong>等领域。
            </SideNote>
          </section>

          {/* 命名实体识别 */}
          <section id="ner" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              命名实体识别（NER）
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              NER 的目标是识别文本中的<strong>专有名词</strong>并分类，如人名（PER）、地名（LOC）、机构名（ORG）等。
            </p>

            <h3 id="ner-models" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              常用 NER 模型
            </h3>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
              <li><strong>BiLSTM-CRF：</strong>经典序列标注模型，CRF 层解决标签依赖问题</li>
              <li><strong>BERT-BiLSTM-CRF：</strong>预训练模型 + 序列标注，效果显著提升</li>
              <li><strong>Span-based NER：</strong>基于跨度的方法，解决嵌套实体问题</li>
              <li><strong>LLM-based NER：</strong>使用大模型进行零样本或少样本抽取</li>
            </ul>
            <Playground
              language="python"
              description="使用 spaCy 进行 NER"
              code={`import spacy

# 加载中文模型
nlp = spacy.load("zh_core_web_sm")

text = "马云创立了阿里巴巴集团，总部位于杭州。"
doc = nlp(text)

# 提取实体
for ent in doc.ents:
    print(f"{ent.text:10} -> {ent.label_}")

# 输出：
# 马云         -> PERSON
# 阿里巴巴集团   -> ORG
# 杭州         -> GPE`}
            />

            <h3 id="ner-evaluation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              评估指标
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              NER 通常使用<strong>精确率（Precision）、召回率（Recall）、F1 值</strong>进行评估，采用严格的匹配标准（实体边界和类型都必须正确）。
            </p>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mb-4 text-[14px] sm:text-[15px]">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">指标</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">公式</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">精确率</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">TP / (TP + FP)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">预测正确的实体占比</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">召回率</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">TP / (TP + FN)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">真实实体被找出的占比</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">F1 值</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">2 * P * R / (P + R)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">精确率和召回率的调和平均</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 关系抽取 */}
          <section id="relation-extraction" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              关系抽取
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              关系抽取的目标是识别实体之间的<strong>语义关系</strong>，如"马云 - 创立 - 阿里巴巴"、"北京 - 位于 - 中国"。
            </p>

            <h3 id="relation-methods" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              抽取方法
            </h3>
            <div className="space-y-4">
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">1. 监督学习</h4>
                <p className="text-[14px] text-ink-muted">
                  需要大量标注数据，训练分类模型判断实体对之间的关系类型。常用模型：CNN、RNN、Transformer。
                </p>
              </div>
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">2. 远程监督</h4>
                <p className="text-[14px] text-ink-muted">
                  利用知识库（如 Freebase）自动标注训练数据，解决标注数据稀缺问题，但会引入噪声。
                </p>
              </div>
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">3. LLM 零样本抽取</h4>
                <p className="text-[14px] text-ink-muted">
                  使用大模型通过 Prompt 直接抽取关系，无需训练数据，适合少样本场景。
                </p>
              </div>
            </div>
            <Playground
              language="python"
              description="使用 LLM 进行关系抽取"
              code={`from openai import OpenAI

client = OpenAI()

prompt = """从以下文本中抽取实体关系三元组（主体，关系，客体）：

文本：马云在1999年创立了阿里巴巴集团，总部位于杭州。

格式：[(主体, 关系, 客体), ...]
"""

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}]
)

print(response.choices[0].message.content)
# 输出：
# [("马云", "创立", "阿里巴巴集团"),
#  ("阿里巴巴集团", "总部位于", "杭州"),
#  ("马云", "出生于", "1999年")]`}
            />
          </section>

          {/* 事件抽取 */}
          <section id="event-extraction" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              事件抽取
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              事件抽取是从文本中识别<strong>特定类型的事件</strong>及其要素（时间、地点、参与者、结果等）。
            </p>

            <h3 id="event-components" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              事件要素
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              以"公司并购"事件为例，需要抽取的要素包括：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
              <li><strong>触发词：</strong>并购、收购、合并</li>
              <li><strong>收购方：</strong>发起收购的公司</li>
              <li><strong>被收购方：</strong>被收购的公司</li>
              <li><strong>交易金额：</strong>收购价格</li>
              <li><strong>时间：</strong>事件发生时间</li>
            </ul>
            <DiagramBlock title="事件抽取流程">
              {`graph LR
    A[原始文本] --> B[事件检测<br/>Event Detection]
    B --> C[事件分类<br/>Event Classification]
    C --> D[论元抽取<br/>Argument Extraction]
    D --> E[结构化事件]
    
    style A fill:#e1f5ff
    style E fill:#d4edda`}
            </DiagramBlock>
          </section>

          {/* 知识图谱构建 */}
          <section id="knowledge-graph" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              知识图谱构建
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              知识图谱是以<strong>图结构</strong>存储知识的数据库，节点表示实体，边表示关系。信息抽取是构建知识图谱的核心技术。
            </p>

            <h3 id="kg-pipeline" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              构建流程
            </h3>
            <DiagramBlock title="知识图谱构建流水线">
              {`graph TD
    A[多源数据<br/>文本/表格/API] --> B[信息抽取]
    B --> C[NER 实体识别]
    B --> D[关系抽取]
    B --> E[事件抽取]
    C --> F[实体链接<br/>Entity Linking]
    D --> F
    E --> F
    F --> G[知识融合<br/>去重/对齐]
    G --> H[知识存储<br/>Neo4j/RDF]
    H --> I[知识图谱]
    
    style A fill:#e1f5ff
    style I fill:#d4edda`}
            </DiagramBlock>
            <SideNote label="关键技术">
              <strong>实体链接：</strong>将抽取的实体映射到知识库中的标准实体（如"阿里" → "阿里巴巴集团"）。<br/>
              <strong>知识融合：</strong>解决不同来源的冲突和冗余，保证知识一致性。
            </SideNote>
          </section>

          {/* 完整工作流程 */}
          <section id="workflow" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              完整工作流程
            </h2>
            <DiagramBlock title="端到端信息抽取流程">
              {`graph TD
    A[原始文本] --> B[预处理<br/>分句/分词]
    B --> C[NER 实体识别]
    C --> D[关系抽取]
    D --> E[事件抽取]
    E --> F[实体链接]
    F --> G[知识融合]
    G --> H[存储到知识图谱]
    H --> I[应用层<br/>问答/推荐/搜索]
    
    style A fill:#e1f5ff
    style I fill:#d4edda`}
            </DiagramBlock>
          </section>

          {/* 代码实战 */}
          <section id="code-example" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              代码实战
            </h2>
            <Playground
              language="python"
              description="使用 HanLP 进行中文信息抽取"
              code={`import hanlp

# 加载多任务模型
HanLP = hanlp.load(hanlp.pretrained.mtl.CLOSE_TOK_POS_NER_SRL_DEP_SDP_CON_ELECTRA_SMALL_ZH)

text = "2023年，苹果公司发布了iPhone 15，售价799美元起。"

# 执行多任务抽取
result = HanLP(text)

# 1. 命名实体识别
print("=== 命名实体识别 ===")
for entity in result['ner/msra']:
    word, start, end, label = entity
    print(f"{word} ({label})")

# 2. 依存句法分析（可用于关系抽取）
print("\\n=== 依存句法 ===")
for dep in result['dep']:
    head, rel, child = dep
    print(f"{head} --{rel}--> {child}")

# 输出：
# === 命名实体识别 ===
# 2023年 (DATE)
# 苹果公司 (ORG)
# iPhone 15 (PRODUCT)
# 799美元 (MONEY)
#
# === 依存句法 ===
# 发布 --主谓--> 公司
# 发布 --动宾--> iPhone
# 发布 --时间--> 2023年`}
            />
            <Playground
              language="python"
              description="使用 LangChain + LLM 进行信息抽取"
              code={`from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
from typing import List

# 定义抽取结构
class Entity(BaseModel):
    text: str = Field(..., description="实体文本")
    type: str = Field(..., description="实体类型：PERSON/ORG/LOC/PRODUCT")

class Relation(BaseModel):
    subject: str = Field(..., description="主体")
    relation: str = Field(..., description="关系类型")
    object: str = Field(..., description="客体")

class ExtractionResult(BaseModel):
    entities: List[Entity] = Field(..., description="实体列表")
    relations: List[Relation] = Field(..., description="关系列表")

# 创建抽取链
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是信息抽取专家，从文本中提取实体和关系。"),
    ("human", "文本：{text}\\n\\n请以 JSON 格式返回结果。")
])

llm = ChatOpenAI(model="gpt-4", temperature=0)
structured_llm = llm.with_structured_output(ExtractionResult)
chain = prompt | structured_llm

# 执行抽取
text = "马云创立了阿里巴巴，总部位于杭州。"
result = chain.invoke({"text": text})

print("实体：")
for entity in result.entities:
    print(f"  {entity.text} ({entity.type})")

print("\\n关系：")
for rel in result.relations:
    print(f"  {rel.subject} --{rel.relation}--> {rel.object}")`}
            />
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
                    <strong>简单场景：</strong>使用现成的 NLP 工具库
                  </p>
                  <ul className="list-disc list-inside text-[14px] leading-[1.8] text-ink-muted space-y-2">
                    <li><strong>spaCy：</strong>英文 NER 效果好，开箱即用</li>
                    <li><strong>HanLP：</strong>中文 NLP 全栈工具，支持 NER/分词/句法</li>
                    <li><strong>LTP：</strong>哈工大出品，中文信息抽取能力强</li>
                  </ul>
                </div>
              }
              hardcoreContent={
                <div className="space-y-4">
                  <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                    <h4 className="font-semibold text-ink mb-2">垂直领域定制</h4>
                    <p className="text-[14px] leading-[1.8] text-ink-muted mb-2">
                      <strong>医疗领域：</strong>需要识别疾病、药物、症状等专有实体，需微调 BERT-BiLSTM-CRF 模型。<br/>
                      <strong>金融领域：</strong>抽取公司、人物、投资事件，需构建领域词典和规则。<br/>
                      <strong>法律领域：</strong>识别法条、案例、判决结果，需结合法律知识图谱。
                    </p>
                  </div>
                  <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                    <h4 className="font-semibold text-ink mb-2">大规模生产部署</h4>
                    <p className="text-[14px] leading-[1.8] text-ink-muted mb-2">
                      <strong>性能优化：</strong>使用 ONNX/TensorRT 加速推理，QPS 可提升 5-10 倍。<br/>
                      <strong>分布式处理：</strong>使用 Kafka + Spark Streaming 处理海量文本流。<br/>
                      <strong>增量更新：</strong>新数据到来时增量更新知识图谱，避免全量重建。
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
              <Callout type="danger" title="误区 1：NER 只需要识别实体，不需要考虑边界">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>错误认知：</strong>只要识别出实体类型即可，边界不重要。<br/>
                  <strong>事实：</strong>实体边界错误会导致后续关系抽取失败。例如"北京大学"应作为一个整体识别为 ORG，而非拆分为"北京"（LOC）+ "大学"。评估时必须严格匹配边界。
                </p>
              </Callout>

              <Callout type="danger" title="误区 2：关系抽取可以独立于 NER 进行">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>错误认知：</strong>先做 NER，再做关系抽取，两者互不影响。<br/>
                  <strong>事实：</strong>NER 的错误会传播到关系抽取阶段（Error Propagation）。端到端联合抽取模型（Joint Extraction）可同时优化两个任务，效果更好但复杂度更高。
                </p>
              </Callout>

              <Callout type="danger" title="误区 3：LLM 可以完全替代传统 NER 模型">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>错误认知：</strong>用 GPT-4 做 NER 就够了，不需要训练专用模型。<br/>
                  <strong>事实：</strong>LLM 在零样本场景下表现好，但成本高（$0.03/1K tokens）、延迟大（~1s）。生产环境中，微调的 BERT-NER 模型成本低（~$0.001/1K tokens）、速度快（~10ms），更适合高并发场景。
                </p>
              </Callout>

              <Callout type="warning" title="误区 4：知识图谱越大越好">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>建议：</strong>知识图谱的质量比规模更重要。大量低质量或冲突的知识会降低推理准确性。应注重<strong>知识融合、去重、一致性校验</strong>，而非盲目扩大规模。
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
                  question: "什么是 NER？常用的 NER 模型有哪些？",
                  answer: "NER（命名实体识别）是从文本中识别专有名词并分类的任务。常用模型：① BiLSTM-CRF（经典序列标注）；② BERT-BiLSTM-CRF（预训练 + 序列标注）；③ Span-based NER（解决嵌套实体）；④ LLM-based NER（零样本抽取）。评估指标使用精确率、召回率、F1 值。"
                },
                {
                  question: "关系抽取有哪些方法？各自的优缺点？",
                  answer: "方法：① 监督学习：需要大量标注数据，效果好但标注成本高；② 远程监督：利用知识库自动标注，解决数据稀缺但引入噪声；③ LLM 零样本：无需训练数据，灵活但成本高、速度慢。生产环境常结合多种方法，先用远程监督预训练，再人工标注少量数据微调。"
                },
                {
                  question: "事件抽取和关系抽取的区别是什么？",
                  answer: "关系抽取关注实体之间的静态关系（如'马云 - 创立 - 阿里巴巴'），事件抽取关注动态发生的事情及其要素（如'2023年苹果发布 iPhone 15'包含时间、地点、参与者、产品等）。事件抽取更复杂，需要先检测事件触发词，再抽取论元角色。"
                },
                {
                  question: "如何解决 NER 中的嵌套实体问题？",
                  answer: "嵌套实体指一个实体包含另一个实体，如'[北京大学 [医院]]'。解决方案：① Span-based 方法：枚举所有可能的跨度并分类，天然支持嵌套；② 多层标注：为每个 token 分配多个标签；③ 序列生成：将 NER 转化为序列生成任务，使用 Seq2Seq 模型。Span-based 是当前主流方法。"
                },
                {
                  question: "知识图谱构建中的实体链接是什么？为什么重要？",
                  answer: "实体链接（Entity Linking）是将文本中提到的实体映射到知识库中的标准实体（如'阿里' → '阿里巴巴集团'）。重要性：① 消除歧义（'苹果'可能是公司或水果）；② 统一表述（'阿里'、'阿里巴巴'、'Alibaba'指向同一实体）；③ 支持知识推理和查询。常用方法：基于相似度匹配、基于上下文的深度学习模型。"
                },
                {
                  question: "在金融风控场景中，如何设计信息抽取系统？",
                  answer: "方案：① 实体识别：抽取公司名、人名、职位、金额、时间等；② 关系抽取：识别'任职于'、'持股'、'担保'等关系；③ 事件抽取：监测'高管变更'、'股权变更'、'诉讼'等风险事件；④ 知识图谱：构建企业关系网络，发现隐藏的风险传导路径；⑤ 实时更新：监控新闻、公告，及时更新图谱。技术选型：BERT-BiLSTM-CRF + 远程监督 + Neo4j 存储。"
                }
              ]}
            />
          </section>

          {/* 与传统 NLP 对比 */}
          <section id="comparison" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              与传统 NLP 对比
            </h2>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mb-4 text-[14px] sm:text-[15px]">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">维度</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">传统 NLP Pipeline</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">LLM-based IE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">准确率</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">高（领域适配后）</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">中高（零样本）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">成本</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">低（一次性训练）</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">高（按 token 计费）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">延迟</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">低（~10ms）</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">高（~1s）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">灵活性</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">低（需重新训练）</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">高（改 Prompt 即可）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">适用场景</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">高并发、低成本</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">少样本、快速原型</td>
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
                <h3 className="font-semibold text-ink mb-2">📄 文档结构化处理</h3>
                <p className="text-[14px] text-ink-muted">从 PDF、Word 等文档中提取结构化内容的前置步骤</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🧠 知识图谱</h3>
                <p className="text-[14px] text-ink-muted">信息抽取的最终产物，用于知识存储和推理</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🎯 结构化输出</h3>
                <p className="text-[14px] text-ink-muted">让 LLM 输出符合 schema 的结构化数据</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🔍 OCR+AI 智能文档识别</h3>
                <p className="text-[14px] text-ink-muted">从扫描文档中提取文本后再进行信息抽取</p>
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
