import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import SideNote from '../../components/knowledge/SideNote'
import ContextSwitcher from '../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../components/knowledge/SmartTOC'
import Callout from '../../components/ui/Callout'
import InterviewSection from '../../components/ui/InterviewSection'
import DiagramBlock from '../../components/ui/DiagramBlock'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'workflow', text: '结构化输出工作流', level: 2 },
  { id: 'core-tech', text: '核心技术详解', level: 2 },
  { id: 'json-output', text: '3.1 JSON 输出', level: 3 },
  { id: 'schema-output', text: '3.2 Schema 输出（JSON Schema）', level: 3 },
  { id: 'pydantic-output', text: '3.3 Pydantic 输出（重点）', level: 3 },
  { id: 'output-parser', text: '3.4 Output Parser（输出解析器）', level: 3 },
  { id: 'validation', text: '3.5 输出校验（Validation）', level: 3 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function StructuredOutput({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      {/* Main Article */}
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>
      {/* 一句话定义 */}
      <section className="mb-8">
        <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          一句话定义
        </h2>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          结构化输出是通过约束 LLM 生成符合预定义格式（如 JSON、XML）的数据，并使用解析器和校验器确保数据质量，使模型输出可直接被程序处理的技术。
        </p>
      </section>

      {/* 架构图 */}
      <section className="mb-8">
        <h2 id="workflow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          结构化输出工作流
        </h2>
        <DiagramBlock title="从自然语言到结构化数据">
          <div className="text-[13px] sm:text-[14px] font-mono text-ink-muted leading-relaxed text-left space-y-2">
            <div><span className="text-rose font-semibold">① 定义 Schema</span> → Pydantic Model / JSON Schema</div>
            <div><span className="text-teal font-semibold">② 构建 Prompt</span> → 注入 Schema + 示例</div>
            <div><span className="text-sky font-semibold">③ LLM 生成</span> → 原始文本输出</div>
            <div><span className="text-indigo font-semibold">④ 解析提取</span> → Output Parser</div>
            <div><span className="text-amber font-semibold">⑤ 数据校验</span> → Validation</div>
            <div><span className="text-emerald font-semibold">⑥ 错误处理</span> → Retry / Fallback</div>
          </div>
        </DiagramBlock>
      </section>

      {/* 核心原理 */}
      <section className="mb-8">
        <h2 id="core-tech" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          核心技术详解
        </h2>

        <h3 id="json-output" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          3.1 JSON 输出
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          最基础的结构化输出方式，通过在 Prompt 中明确要求 JSON 格式，并指定字段结构。适用于简单的键值对或嵌套对象。
        </p>
        <Playground
          code={`import openai
import json

# 构建 Prompt
prompt = """分析以下产品评论，提取关键信息并以 JSON 格式返回：

评论："这款手机拍照效果很好，电池续航也不错，但价格有点贵。"

要求返回以下字段：
- sentiment: 情感倾向（positive/negative/neutral）
- pros: 优点列表
- cons: 缺点列表
- rating: 评分（1-5）

只返回 JSON，不要其他文字。"""

# 调用 LLM
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}],
    temperature=0
)

# 解析 JSON
result = json.loads(response.choices[0].message.content)
print(json.dumps(result, indent=2, ensure_ascii=False))`}
          language="python"
          filename="json_output.py"
          description="基础的 JSON 输出示例"
        />
        <Callout type="warning" title="常见问题">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            LLM 生成的 JSON 可能包含语法错误（缺少逗号、引号不匹配）。解决方案：① 使用容错性强的解析器（如 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">json5</code>）；② 添加重试机制；③ 使用专门的 Output Parser。
          </p>
        </Callout>

        <h3 id="schema-output" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          3.2 Schema 输出（JSON Schema）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          JSON Schema 是描述 JSON 数据结构的标准格式，可以定义字段类型、必填项、取值范围等约束。相比纯文本描述，Schema 更精确且可机器验证。
        </p>
        <Playground
          code={`# 定义 JSON Schema
schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "age": {"type": "integer", "minimum": 0, "maximum": 150},
        "email": {"type": "string", "format": "email"},
        "skills": {
            "type": "array",
            "items": {"type": "string"},
            "minItems": 1
        },
        "level": {
            "type": "string",
            "enum": ["junior", "mid", "senior"]
        }
    },
    "required": ["name", "age", "email"]
}

# 将 Schema 注入 Prompt
prompt = f"""从简历中提取候选人信息，严格遵循以下 JSON Schema：

{json.dumps(schema, indent=2)}

简历内容：
张三，28岁，邮箱 zhangsan@example.com
技能：Python, Java, Docker
级别：senior

返回符合 Schema 的 JSON。"""`}
          language="python"
          filename="json_schema.py"
          description="使用 JSON Schema 约束输出格式"
        />
        <SideNote label="工具推荐">
          可以使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">jsonschema</code> 库在 Python 中验证 JSON 是否符合 Schema：<br />
          <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">jsonschema.validate(data, schema)</code>
        </SideNote>

        <h3 id="pydantic-output" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          3.3 Pydantic 输出（重点）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Pydantic 是 Python 中最流行的数据验证库，通过定义 Model 类来约束数据结构。结合 LangChain 或 Instructor 等库，可以直接让 LLM 输出 Pydantic 对象。
        </p>
        <Playground
          code={`from pydantic import BaseModel, Field, validator
from typing import List, Optional
import instructor
from openai import OpenAI

# 启用 Pydantic 模式
client = instructor.patch(OpenAI())

# 定义输出模型
class ProductReview(BaseModel):
    product_name: str = Field(..., description="产品名称")
    sentiment: str = Field(..., description="情感倾向")
    pros: List[str] = Field(..., description="优点列表")
    cons: List[str] = Field(..., description="缺点列表")
    rating: int = Field(..., ge=1, le=5, description="评分 1-5")
    
    @validator('sentiment')
    def validate_sentiment(cls, v):
        if v not in ['positive', 'negative', 'neutral']:
            raise ValueError('Invalid sentiment')
        return v

# 直接获取 Pydantic 对象
review = client.chat.completions.create(
    model="gpt-4",
    messages=[{
        "role": "user",
        "content": "分析这个评论：iPhone 15 拍照很棒，但电池一般"
    }],
    response_model=ProductReview  # 关键参数
)

# 直接使用对象属性
print(f"产品: {review.product_name}")
print(f"评分: {review.rating}/5")
print(f"优点: {', '.join(review.pros)}`}
          language="python"
          filename="pydantic_output.py"
          description="使用 Instructor + Pydantic 实现结构化输出"
        />
        <Callout type="tip" title="为什么选择 Pydantic？">
          <ul className="list-disc list-inside space-y-1 mt-2 text-[14px] sm:text-[15px] text-ink-muted">
            <li><strong>类型安全：</strong>IDE 自动补全和类型检查</li>
            <li><strong>自动验证：</strong>内置数据类型、范围、正则校验</li>
            <li><strong>自定义逻辑：</strong>支持 validator 装饰器编写复杂规则</li>
            <li><strong>序列化友好：</strong>一键转换为 JSON/Dict</li>
            <li><strong>生态完善：</strong>FastAPI、LangChain 等主流框架原生支持</li>
          </ul>
        </Callout>

        <h3 id="output-parser" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          3.4 Output Parser（输出解析器）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Output Parser 是从 LLM 原始文本中提取结构化数据的工具。LangChain 提供了多种解析器，处理边界情况和格式错误。
        </p>
        <ContextSwitcher
          simpleContent={
            <div>
              <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                <strong>简单场景：</strong>使用内置解析器
              </p>
              <Playground
                code={`from langchain.output_parsers import JsonOutputParser

parser = JsonOutputParser()

# LLM 输出可能包含 markdown 代码块标记
raw_output = """\`\`\`json
{"name": "张三", "age": 25}
\`\`\`"""

# 自动清理并解析
parsed = parser.parse(raw_output)
print(parsed)  # {'name': '张三', 'age': 25}`}
                language="python"
                filename="simple_parser.py"
              />
            </div>
          }
          hardcoreContent={
            <div>
              <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                <strong>复杂场景：</strong>自定义解析器 + 重试机制
              </p>
              <Playground
                code={`from langchain.output_parsers import PydanticOutputParser
from langchain.schema import OutputParserException
from pydantic import BaseModel
import tenacity

class UserProfile(BaseModel):
    name: str
    age: int
    email: str

# 创建解析器
parser = PydanticOutputParser(pydantic_object=UserProfile)

# 带重试的解析函数
@tenacity.retry(
    stop=tenacity.stop_after_attempt(3),
    wait=tenacity.wait_fixed(1),
    retry=lambda e: isinstance(e, OutputParserException)
)
def parse_with_retry(llm_output: str) -> UserProfile:
    try:
        return parser.parse(llm_output)
    except OutputParserException as e:
        print(f"解析失败: {e}")
        # 可以请求 LLM 重新格式化
        fix_prompt = f"修复以下 JSON 格式错误:\n{llm_output}"
        llm_output = llm.invoke(fix_prompt)
        raise  # 触发重试

# 使用
profile = parse_with_retry(raw_llm_output)`}
                language="python"
                filename="advanced_parser.py"
              />
            </div>
          }
        />

        <h3 id="validation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          3.5 输出校验（Validation）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          校验是确保输出数据质量的最后一道防线。包括语法校验（JSON 格式）、语义校验（业务逻辑）、以及外部验证（数据库查询）。
        </p>
        <Playground
          code={`from pydantic import BaseModel, Field, validator, root_validator
from typing import List
from datetime import datetime

class TaskAssignment(BaseModel):
    task_id: str
    assignee: str
    deadline: datetime
    priority: int = Field(..., ge=1, le=5)
    dependencies: List[str] = []
    
    # 字段级校验
    @validator('assignee')
    def validate_assignee(cls, v):
        if not v.isalpha():
            raise ValueError('Assignee must be alphabetic')
        return v.title()
    
    # 跨字段校验
    @root_validator
    def validate_deadline(cls, values):
        deadline = values.get('deadline')
        if deadline < datetime.now():
            raise ValueError('Deadline cannot be in the past')
        return values
    
    # 自定义业务逻辑校验
    def validate_dependencies_exist(self, available_tasks: set):
        missing = set(self.dependencies) - available_tasks
        if missing:
            raise ValueError(f'Dependencies not found: {missing}')

# 使用示例
try:
    task = TaskAssignment(
        task_id="TASK-001",
        assignee="john",
        deadline=datetime(2024, 12, 31),
        priority=3,
        dependencies=["TASK-000"]
    )
    task.validate_dependencies_exist({"TASK-000", "TASK-002"})
    print("✓ 校验通过")
except ValueError as e:
    print(f"✗ 校验失败: {e}")`}
          language="python"
          filename="validation_example.py"
          description="多层次数据校验策略"
        />
        <DiagramBlock title="校验层级">
          <div className="text-[13px] sm:text-[14px] font-mono text-ink-muted leading-relaxed text-left space-y-2">
            <div><span className="text-rose font-semibold">Level 1:</span> 语法校验（JSON 格式、括号匹配）</div>
            <div><span className="text-orange font-semibold">Level 2:</span> 类型校验（字符串、数字、日期）</div>
            <div><span className="text-amber font-semibold">Level 3:</span> 范围校验（数值区间、枚举值）</div>
            <div><span className="text-teal font-semibold">Level 4:</span> 业务校验（依赖关系、权限检查）</div>
            <div><span className="text-indigo font-semibold">Level 5:</span> 外部校验（数据库存在性、API 调用）</div>
          </div>
        </DiagramBlock>
      </section>

      {/* 常见误区 */}
      <section className="mb-8">
        <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          常见误区
        </h2>
        <Callout type="danger" title="误区 1：LLM 总是能生成正确的 JSON">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            LLM 是概率模型，即使 Temperature=0 也可能产生格式错误。必须假设输出可能出错，始终添加解析错误处理和重试机制。
          </p>
        </Callout>
        <Callout type="danger" title="误区 2：Schema 越复杂越好">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            过于复杂的 Schema 会增加 LLM 理解难度，降低成功率。应该分步骤提取，先获取核心字段，再逐步补充细节。保持 Schema 简洁明了。
          </p>
        </Callout>
        <Callout type="danger" title="误区 3：校验只在客户端进行">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            应该在 Prompt 中就明确约束（前置校验），解析时再次验证（中间校验），最后业务层做最终确认（后置校验）。三层校验缺一不可。
          </p>
        </Callout>
      </section>

      {/* 面试真题 */}
      <section id="interview" className="mb-8">
        <InterviewSection
          questions={[
            {
              question: '如何确保 LLM 输出的 JSON 格式正确？',
              answer: '多层保障策略：① Prompt 中明确要求 JSON 格式并提供示例；② 设置 Temperature=0 提高确定性；③ 使用容错解析器（json5、demjson）；④ 添加重试机制，解析失败时请求 LLM 修复；⑤ 使用专门工具如 Instructor、LangChain OutputParser；⑥ 最终 fallback 是人工审核或默认值。',
            },
            {
              question: 'Pydantic 相比原生 dict 有什么优势？',
              answer: 'Pydantic 提供：① 类型注解和 IDE 支持（自动补全、类型检查）；② 自动数据转换（字符串转日期、整数）；③ 内置验证器（范围、正则、枚举）；④ 自定义 validator 处理复杂逻辑；⑤ 序列化/反序列化便捷（model_dump、model_validate）；⑥ 与 FastAPI 等框架无缝集成。原生 dict 缺乏这些保障，容易出错。',
            },
            {
              question: '什么是 Output Parser？为什么需要它？',
              answer: 'Output Parser 是从 LLM 原始文本中提取结构化数据的工具。需要它的原因：① LLM 输出可能包含多余文字（"以下是 JSON..."）；② Markdown 代码块标记（```json）；③ 格式轻微错误（缺少逗号）；④ 编码问题。Parser 负责清洗、解析、验证，将不可靠的文本转换为可靠的数据结构。',
            },
            {
              question: '如何处理 LLM 结构化输出的校验失败？',
              answer: '错误处理策略：① 立即重试（相同 Prompt，可能随机性导致）；② 修复重试（将错误信息反馈给 LLM，请求修正）；③ 降级策略（使用默认值或部分字段）；④ 人工介入（记录日志，后续人工处理）；⑤ 熔断机制（连续失败 N 次后停止尝试）。关键是记录失败案例用于优化 Prompt。',
            },
            {
              question: '设计一个电商订单的结构化输出系统，你会怎么做？',
              answer: '完整方案：① 定义 Pydantic Model（订单号、商品列表、金额、地址等）；② 构建 Prompt（角色设定 + Schema + 示例）；③ 使用 Instructor 调用 LLM；④ Pydantic 自动校验（类型、范围、必填项）；⑤ 业务校验（库存检查、价格验证）；⑥ 异常处理（解析失败重试 3 次）；⑦ 持久化存储；⑧ 监控告警（记录失败率、平均耗时）。',
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
            <h4 className="font-semibold text-ink mb-2">← Prompt Engineering</h4>
            <p className="text-[13px] text-ink-muted">学习如何在 Prompt 中描述 Schema 和格式要求</p>
          </div>
          <div className="p-4 bg-parchment-soft rounded-paper-md border border-border">
            <h4 className="font-semibold text-ink mb-2">→ Pydantic Deep Dive</h4>
            <p className="text-[13px] text-ink-muted">深入了解 Pydantic 的高级特性</p>
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
