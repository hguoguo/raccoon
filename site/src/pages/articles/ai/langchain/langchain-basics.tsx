import KnowledgeLayout from '../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../components/knowledge/Playground'
import SideNote from '../../../components/knowledge/SideNote'
import SmartTOC from '../../../components/knowledge/SmartTOC'
import Callout from '../../../components/ui/Callout'
import DiagramBlock from '../../../components/ui/DiagramBlock'
import InterviewSection from '../../../components/ui/InterviewSection'
import ArticleNav from '../../../components/article/ArticleNav'
import { getArticleNav } from '../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'architecture', text: '一、架构概览', level: 2 },
  { id: 'prompt-template', text: '二、PromptTemplate', level: 2 },
  { id: 'fewshot-examples', text: '高级特性：Few-shot 示例', level: 3 },
  { id: 'chat-model', text: '三、ChatModel', level: 2 },
  { id: 'multi-model', text: '多模型切换', level: 3 },
  { id: 'runnable', text: '四、Runnable 接口', level: 2 },
  { id: 'runnable-composition', text: 'Runnable 组合模式', level: 3 },
  { id: 'output-parser', text: '五、OutputParser', level: 2 },
  { id: 'custom-parser', text: '自定义解析器', level: 3 },
  { id: 'tool', text: '六、Tool 工具', level: 2 },
  { id: 'built-in-tools', text: '内置工具集', level: 3 },
  { id: 'memory', text: '七、Memory 记忆', level: 2 },
  { id: 'persistent-memory', text: '持久化记忆', level: 3 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function LangChainBasics({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      {/* Main Article */}
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              LangChain 是一个用于构建<strong className="text-accent">LLM 驱动应用</strong>的开源框架，提供标准化的组件抽象（Prompts、Models、Tools、Memory），
              通过链式组合（Chains）和编排能力简化复杂 AI 应用的开发流程。
            </p>
          </blockquote>

          <Callout type="tip" title="核心价值">
            LangChain 将 LLM 应用的通用模式抽象为可复用组件，开发者无需重复造轮子，专注于业务逻辑而非底层集成细节。
          </Callout>

          {/* ========== 一、架构概览 ========== */}
          <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、架构概览
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            LangChain 的核心架构由六大模块组成，每个模块负责不同的职责：
          </p>

          <DiagramBlock title="LangChain 核心架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────┐
│           LangChain Application             │
├──────────┬──────────┬──────────┬───────────┤
│ Prompts  │ Models   │ Chains   │ Memory    │
├──────────┼──────────┼──────────┼───────────┤
│ Template │ Chat     │ Runnable │ Buffer    │
│ Few-shot │ LLM      │ Parallel │ Summary   │
│ Dynamic  │ Embedding│ Sequence │ Vector    │
├──────────┴──────────┴──────────┴───────────┤
│              Tools & Agents                │
└─────────────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="设计理念">
            LangChain 遵循"组合优于继承"原则，所有组件实现统一的 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">Runnable</code> 接口，支持灵活的链式组合。
          </SideNote>

          {/* ========== 二、PromptTemplate ========== */}
          <h2 id="prompt-template" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、PromptTemplate
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">PromptTemplate</code> 是动态生成 Prompt 的模板引擎，支持变量替换、条件渲染和少样本示例注入。
          </p>

          <Playground
            code={`from langchain.prompts import PromptTemplate, ChatPromptTemplate

# 基础模板
template = """
你是一个{role}专家。请回答以下问题：

问题：{question}
"""

prompt = PromptTemplate(
    input_variables=["role", "question"],
    template=template
)

# 格式化输出
formatted = prompt.format(role="Python", question="什么是装饰器？")
print(formatted)

# ChatPromptTemplate（支持消息角色）
chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个{role}助手"),
    ("human", "{question}"),
])

messages = chat_prompt.format_messages(role="技术", question="解释闭包")`}
            language="python"
            highlights={[5, 10, 17]}
            filename="prompt_template.py"
            description="PromptTemplate 基础用法"
          />

          <Callout type="info" title="两种模板类型">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>PromptTemplate</strong>：生成纯文本 Prompt，适用于传统 LLM</li>
              <li><strong>ChatPromptTemplate</strong>：生成带角色的消息列表（system/human/assistant），专用于 Chat Model</li>
            </ul>
          </Callout>

          <h3 id="fewshot-examples" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">高级特性：Few-shot 示例</h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">FewShotPromptTemplate</code> 注入示例，提升模型理解能力：
          </p>

          <Playground
            code={`from langchain.prompts import FewShotPromptTemplate, PromptTemplate

# 示例数据
examples = [
    {"input": "高兴", "output": "😄"},
    {"input": "悲伤", "output": "😢"},
    {"input": "愤怒", "output": "😠"},
]

# 示例模板
example_template = "情绪: {input}\n表情: {output}"

# Few-shot 模板
few_shot_prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=PromptTemplate(
        input_variables=["input", "output"],
        template=example_template
    ),
    prefix="请将情绪转换为表情符号：",
    suffix="情绪: {input}\\n表情:",
    input_variables=["input"],
    example_separator="\\n\\n"
)

print(few_shot_prompt.format(input="惊讶"))`}
            language="python"
            highlights={[13, 18]}
            filename="few_shot.py"
            description="Few-shot 示例注入"
          />

          <SideNote label="最佳实践">
            Few-shot 示例应覆盖多样化的场景，避免偏见。示例数量通常控制在 3-5 个，过多会占用 Context Window。
          </SideNote>

          {/* ========== 三、ChatModel ========== */}
          <h2 id="chat-model" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、ChatModel
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ChatModel</code> 是对话模型的统一抽象，支持多种提供商（OpenAI、Anthropic、Azure 等），提供一致的 API 接口。
          </p>

          <Playground
            code={`from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

# 初始化模型
model = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.7,
    max_tokens=1000,
    api_key="your-api-key"  # 或使用环境变量 OPENAI_API_KEY
)

# 同步调用
response = model.invoke([
    SystemMessage(content="你是一个 Python 专家"),
    HumanMessage(content="解释列表推导式")
])
print(response.content)

# 流式输出
for chunk in model.stream([
    HumanMessage(content="写一个快速排序算法")
]):
    print(chunk.content, end="", flush=True)`}
            language="python"
            highlights={[5, 13, 20]}
            filename="chat_model.py"
            description="ChatModel 基础调用"
          />

          <Callout type="warning" title="关键参数说明">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>temperature</strong>：控制随机性（0=确定性，1=高创造性）</li>
              <li><strong>max_tokens</strong>：限制输出长度，避免超额费用</li>
              <li><strong>streaming</strong>：启用流式输出，提升用户体验</li>
            </ul>
          </Callout>

          <h3 id="multi-model" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">多模型切换</h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            LangChain 支持无缝切换不同提供商的模型，代码结构保持一致：
          </p>

          <Playground
            code={`# OpenAI
from langchain_openai import ChatOpenAI
model = ChatOpenAI(model="gpt-4o")

# Anthropic Claude
from langchain_anthropic import ChatAnthropic
model = ChatAnthropic(model="claude-3-sonnet-20240229")

# Azure OpenAI
from langchain_openai import AzureChatOpenAI
model = AzureChatOpenAI(
    azure_endpoint="https://xxx.openai.azure.com/",
    azure_deployment="gpt-4",
    api_version="2024-02-01"
)

# 本地模型（Ollama）
from langchain_ollama import ChatOllama
model = ChatOllama(model="llama3:8b")`}
            language="python"
            highlights={[3, 7, 11, 18]}
            filename="model_providers.py"
            description="多模型提供商适配"
          />

          <SideNote label="成本优化">
            开发阶段使用低成本模型（如 gpt-4o-mini），生产环境根据需求升级到高性能模型。通过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">{"model.with_config({'tags': ['dev']})"}</code> 标记环境便于追踪费用。
          </SideNote>

          {/* ========== 四、Runnable 接口 ========== */}
          <h2 id="runnable" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Runnable 接口
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Runnable</code> 是 LangChain 的核心抽象，所有组件（Prompts、Models、Parsers、Tools）都实现此接口，支持统一的调用方式和链式组合。
          </p>

          <DiagramBlock title="Runnable 标准方法">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌──────────────────────────────────────┐
│         Runnable Interface           │
├──────────────────────────────────────┤
│ invoke(input) → output               │
│ batch(inputs) → outputs              │
│ stream(input) → Iterator[output]     │
│ ainvoke(input) → output (async)      │
│ abatch(inputs) → outputs (async)     │
│ astream(input) → AsyncIterator       │
└──────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`from langchain_core.runnables import RunnableLambda

# 任何函数都可以包装为 Runnable
def uppercase(text: str) -> str:
    return text.upper()

runnable = RunnableLambda(uppercase)

# 统一调用方式
result = runnable.invoke("hello")
print(result)  # HELLO

# 链式组合
from langchain_core.runnables import RunnablePassthrough

chain = (
    RunnablePassthrough()  # 透传输入
    | RunnableLambda(lambda x: x + " world")
    | RunnableLambda(uppercase)
)

print(chain.invoke("hello"))  # HELLO WORLD`}
            language="python"
            highlights={[7, 15, 18]}
            filename="runnable_basic.py"
            description="Runnable 基础用法"
          />

          <Callout type="tip" title="管道操作符 |">
            LangChain 重载了 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">|</code> 运算符，使组件组合像 Unix 管道一样直观：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">prompt | model | parser</code>。
          </Callout>

          <h3 id="runnable-composition" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">Runnable 组合模式</h3>
          
          <Playground
            code={`from langchain_core.runnables import RunnableParallel, RunnableSequence

# 并行执行（多个分支同时运行）
parallel = RunnableParallel({
    "summary": summary_chain,
    "keywords": keyword_chain,
    "sentiment": sentiment_chain,
})
result = parallel.invoke({"text": "文章内容..."})
# {'summary': '...', 'keywords': [...], 'sentiment': 'positive'}

# 串行执行（顺序处理）
sequence = RunnableSequence([
    prompt_template,
    chat_model,
    output_parser,
])
result = sequence.invoke({"question": "什么是 Python?"})

# 混合使用
complex_chain = (
    RunnableParallel({
        "context": retriever,
        "question": RunnablePassthrough(),
    })
    | prompt_template
    | chat_model
    | output_parser
)`}
            language="python"
            highlights={[4, 12, 21]}
            filename="runnable_composition.py"
            description="Runnable 组合模式"
          />

          <SideNote label="性能优势">
            <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">RunnableParallel</code> 会自动并发执行独立分支，相比手动串行调用可显著降低延迟。
          </SideNote>

          {/* ========== 五、OutputParser ========== */}
          <h2 id="output-parser" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、OutputParser
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">OutputParser</code> 将 LLM 的原始文本输出解析为结构化数据（JSON、列表、Pydantic 对象等），确保下游代码能可靠处理结果。
          </p>

          <Playground
            code={`from langchain.output_parsers import JsonOutputParser, PydanticOutputParser
from pydantic import BaseModel, Field
from typing import List

# JSON 解析器
json_parser = JsonOutputParser()

# Pydantic 解析器（强类型验证）
class BookReview(BaseModel):
    title: str = Field(description="书名")
    author: str = Field(description="作者")
    rating: float = Field(description="评分 (1-5)")
    pros: List[str] = Field(description="优点列表")
    cons: List[str] = Field(description="缺点列表")

pydantic_parser = PydanticOutputParser(pydantic_object=BookReview)

# 使用解析器
from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="gpt-4o-mini", temperature=0)
chain = model | pydantic_parser

result = chain.invoke("评析《Python编程：从入门到实践》")
print(result.title)    # Python编程：从入门到实践
print(result.rating)   # 4.5
print(type(result))    # <class '__main__.BookReview'>`}
            language="python"
            highlights={[6, 10, 17, 23]}
            filename="output_parser.py"
            description="OutputParser 结构化解析"
          />

          <Callout type="danger" title="解析失败处理">
            LLM 可能输出不符合格式的文本，导致解析异常。建议使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">with_retry()</code> 或 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">RetryWithErrorOutputParser</code> 自动重试。
          </Callout>

          <h3 id="custom-parser" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">自定义解析器</h3>
          
          <Playground
            code={`from langchain_core.output_parsers import BaseOutputParser

class CommaSeparatedListOutputParser(BaseOutputParser[List[str]]):
    """解析逗号分隔的字符串为列表"""
    
    def parse(self, text: str) -> List[str]:
        """解析输出文本"""
        return [item.strip() for item in text.split(",")]
    
    @property
    def _type(self) -> str:
        return "comma_separated_list"

# 使用自定义解析器
parser = CommaSeparatedListOutputParser()
result = parser.parse("Python, Java, Go, Rust")
print(result)  # ['Python', 'Java', 'Go', 'Rust']`}
            language="python"
            highlights={[3, 7, 15]}
            filename="custom_parser.py"
            description="自定义 OutputParser"
          />

          {/* ========== 六、Tool 工具 ========== */}
          <h2 id="tool" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、Tool 工具
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Tool</code> 封装外部功能（API 调用、数据库查询、文件操作等），使 LLM 能够与真实世界交互，突破纯文本生成的局限。
          </p>

          <Playground
            code={`from langchain.tools import tool
import requests

# 方式 1：使用 @tool 装饰器
@tool
def get_weather(city: str) -> str:
    """查询指定城市的天气情况
    
    Args:
        city: 城市名称，如 "北京"、"Shanghai"
    """
    response = requests.get(f"https://api.weather.com/{city}")
    return response.json()["description"]

# 方式 2：使用 StructuredTool（更灵活）
from langchain.tools import StructuredTool

def search_wikipedia(query: str, max_results: int = 3) -> str:
    """搜索维基百科并返回摘要"""
    import wikipedia
    results = wikipedia.search(query, results=max_results)
    return "\\n".join([wikipedia.summary(r, sentences=2) for r in results])

wiki_tool = StructuredTool.from_function(
    func=search_wikipedia,
    name="wikipedia_search",
    description="Search Wikipedia for information"
)

# 查看工具的 JSON Schema（用于 Function Calling）
print(wiki_tool.args_schema.schema())`}
            language="python"
            highlights={[5, 18, 24]}
            filename="tools.py"
            description="Tool 定义方式"
          />

          <Callout type="info" title="Tool 的核心要素">
            每个 Tool 必须包含三个要素：<strong>name</strong>（唯一标识）、<strong>description</strong>（告诉 LLM 何时使用该工具）、<strong>args_schema</strong>（参数类型定义，用于验证）。
          </Callout>

          <h3 id="built-in-tools" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">内置工具集</h3>
          
          <Playground
            code={`# LangChain 提供的常用工具
from langchain.agents import load_tools

# 加载预定义工具
tools = load_tools([
    "serpapi",      # Google 搜索
    "llm-math",     # 数学计算
    "wikipedia",    # 维基百科查询
    "arxiv",        # 学术论文搜索
    "python_repl",  # Python 代码执行沙箱
])

# 自定义工具集合
from langchain.tools import BaseTool

class CalculatorTool(BaseTool):
    name = "calculator"
    description = "执行数学表达式计算"
    
    def _run(self, expression: str) -> str:
        return str(eval(expression))  # 注意：生产环境需做安全校验
    
    async def _arun(self, expression: str) -> str:
        return self._run(expression)`}
            language="python"
            highlights={[5, 16]}
            filename="builtin_tools.py"
            description="内置工具加载"
          />

          <SideNote label="安全警告">
            允许 LLM 执行代码（如 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">python_repl</code>）存在安全风险，必须在沙箱环境中运行，并对输入做严格校验。
          </SideNote>

          {/* ========== 七、Memory 记忆 ========== */}
          <h2 id="memory" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、Memory 记忆
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Memory</code> 管理对话历史，使 LLM 能够记住上下文信息，实现多轮对话的连贯性。
          </p>

          <DiagramBlock title="Memory 类型对比">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌──────────────────────────────────────────┐
│         Memory Types                     │
├────────────┬──────────────┬─────────────┤
│ Buffer     │ Summary      │ Vector      │
├────────────┼──────────────┼─────────────┤
│ 保存全部   │ 压缩摘要     │ 语义检索    │
│ 历史记录   │ 节省 Token   │ 长程记忆    │
│ 简单直接   │ 可能丢失细节 │ 需要 Embed  │
└────────────┴──────────────┴─────────────┘
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`from langchain.memory import ConversationBufferMemory, ConversationSummaryMemory
from langchain.chains import ConversationChain
from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

# 1. Buffer Memory（保存完整历史）
buffer_memory = ConversationBufferMemory()
buffer_chain = ConversationChain(
    llm=model,
    memory=buffer_memory,
    verbose=True
)

buffer_chain.invoke("我叫小明，今年25岁")
buffer_chain.invoke("我的职业是什么？")  # LLM 不知道，因为没说过

# 2. Summary Memory（自动总结历史）
summary_memory = ConversationSummaryMemory(llm=model)
summary_chain = ConversationChain(
    llm=model,
    memory=summary_memory,
    verbose=True
)

summary_chain.invoke("我喜欢编程和旅行")
summary_chain.invoke("我刚才说了什么爱好？")  # LLM 能回答：编程和旅行

# 3. 手动管理记忆
from langchain.memory import ConversationBufferWindowMemory

window_memory = ConversationBufferWindowMemory(k=5)  # 只保留最近 5 轮
window_chain = ConversationChain(llm=model, memory=window_memory)`}
            language="python"
            highlights={[8, 19, 32]}
            filename="memory_types.py"
            description="Memory 类型演示"
          />

          <Callout type="warning" title="Token 成本控制">
            Buffer Memory 会累积所有历史消息，可能导致超出 Context Window 限制或产生高额费用。长对话场景推荐使用 <strong>Summary Memory</strong> 或 <strong>Vector Memory</strong>。
          </Callout>

          <h3 id="persistent-memory" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">持久化记忆</h3>
          
          <Playground
            code={`from langchain.memory import ConversationBufferMemory
import json

# 保存到文件
memory = ConversationBufferMemory()
memory.save_context(
    {"input": "你好"},
    {"output": "你好！有什么可以帮助你的吗？"}
)

# 导出记忆
memory_data = memory.load_memory_variables({})
with open("memory.json", "w") as f:
    json.dump(memory_data, f, ensure_ascii=False, indent=2)

# 从文件恢复
with open("memory.json", "r") as f:
    loaded_data = json.load(f)

# Redis 持久化（生产环境推荐）
from langchain.memory.chat_message_histories import RedisChatMessageHistory

redis_history = RedisChatMessageHistory(
    session_id="user_123",
    url="redis://localhost:6379"
)
memory = ConversationBufferMemory(chat_memory=redis_history)`}
            language="python"
            highlights={[6, 13, 22]}
            filename="memory_persistence.py"
            description="记忆持久化方案"
          />

          <SideNote label="会话隔离">
            多用户场景下，使用唯一的 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">session_id</code> 隔离不同用户的记忆，避免数据混淆。
          </SideNote>

          {/* ========== 八、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区 1：PromptTemplate 只是字符串拼接">
            <p className="mb-2"><strong>错误认知</strong>：认为 PromptTemplate 等同于 f-string 格式化。</p>
            <p><strong>正确理解</strong>：PromptTemplate 支持验证输入变量、条件渲染、少样本示例管理、与 Chat Model 的消息格式转换等高级功能，是完整的模板引擎。</p>
          </Callout>

          <Callout type="danger" title="误区 2：所有 LLM 都适合 streaming">
            <p className="mb-2"><strong>错误认知</strong>：认为流式输出总是更好。</p>
            <p><strong>正确理解</strong>：Streaming 适合交互式场景（如聊天机器人），但批量处理任务（如文档分类）使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">batch()</code> 更高效，可减少网络往返开销。</p>
          </Callout>

          <Callout type="danger" title="误区 3：Memory 会自动优化 Token 使用">
            <p className="mb-2"><strong>错误认知</strong>：认为添加 Memory 后无需担心 Context Window。</p>
            <p><strong>正确理解</strong>：只有 Summary Memory 和 Vector Memory 会主动压缩或检索历史，Buffer Memory 会无限制累积消息，必须手动设置窗口大小或切换到其他 Memory 类型。</p>
          </Callout>

          <Callout type="warning" title="误区 4：Tool 越多越好">
            <p className="mb-2"><strong>错误认知</strong>：给 Agent 绑定大量工具能提升能力。</p>
            <p><strong>正确理解</strong>：过多工具会增加 LLM 的选择难度，导致调用错误或延迟增加。应根据场景精选 3-5 个最相关的工具，并通过清晰的 description 帮助 LLM 理解使用时机。</p>
          </Callout>

          {/* ========== 九、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "LangChain 中 PromptTemplate 和 ChatPromptTemplate 的区别是什么？",
              answer: "PromptTemplate 生成纯文本字符串，适用于传统 Completion Model；ChatPromptTemplate 生成带角色的消息列表（SystemMessage、HumanMessage、AIMessage），专用于 Chat Model。ChatPromptTemplate 更符合现代 LLM 的对话格式，支持多轮对话上下文的精确控制。"
            },
            {
              question: "Runnable 接口的核心价值是什么？",
              answer: "Runnable 提供了统一的调用规范（invoke/batch/stream）和组合能力（通过 | 运算符链式连接）。所有 LangChain 组件都实现此接口，使得 Prompts、Models、Parsers、Tools 可以像乐高积木一样灵活组合，大幅降低系统集成复杂度。"
            },
            {
              question: "如何选择适合的 Memory 类型？",
              answer: "短对话（<10 轮）使用 ConversationBufferMemory；中长对话使用 ConversationSummaryMemory 自动压缩历史；超长对话或需要跨会话检索时使用 VectorStoreMemory。关键考量因素是 Token 成本和上下文相关性。"
            },
            {
              question: "OutputParser 解析失败时如何处理？",
              answer: "有三种策略：① 使用 RetryWithErrorOutputParser 自动重试并附带错误提示；② 在 Prompt 中强化格式要求并提供示例；③ 使用 PydanticOutputParser 利用类型约束引导 LLM 输出合规格式。生产环境建议结合重试机制和降级策略。"
            },
            {
              question: "Tool 的 description 为什么重要？",
              answer: "Description 是 LLM 判断何时调用该工具的唯一依据。模糊的描述会导致工具误用或漏用。优秀的 description 应包含：使用场景、参数含义、返回值格式、注意事项。例如：'查询实时天气，参数 city 为城市中文名或拼音，返回当前温度和天气状况'。"
            },
            {
              question: "LangChain 如何实现模型的负载均衡或故障转移？",
              answer: "使用 RunnableParallel 并行调用多个模型实例，或通过自定义 Router 根据负载情况分发请求。故障转移可通过 try-except 捕获异常后切换到备用模型，或使用 LangSmith 监控模型健康状态并动态路由。"
            },
            {
              question: "如何优化 LangChain 应用的延迟？",
              answer: "① 使用 Streaming 减少首字等待时间；② RunnableParallel 并发执行独立任务；③ 缓存频繁调用的结果（如 Embedding）；④ 精简 Prompt 长度；⑤ 选择低延迟模型（如 gpt-4o-mini vs gpt-4）；⑥ 异步调用（ainvoke）避免阻塞。"
            }
          ]} />

          {/* ========== 十、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/07-langchain-framework/langchain-advanced" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">进阶学习 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">LangChain 进阶</div>
              <div className="text-[12px] text-ink-muted mt-1">LCEL、RunnableParallel、动态 Prompt</div>
            </a>
            <a href="/docs/07-langchain-framework/langgraph-core" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">核心框架 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">LangGraph 核心</div>
              <div className="text-[12px] text-ink-muted mt-1">StateGraph、Agent 工作流编排</div>
            </a>
            <a href="/docs/06-ai-fundamentals/prompt-engineering" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">Prompt 工程</div>
              <div className="text-[12px] text-ink-muted mt-1">Prompt 设计原则与技巧</div>
            </a>
            <a href="/docs/07-langchain-framework/agent-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">应用场景 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">Agent 模式</div>
              <div className="text-[12px] text-ink-muted mt-1">ReAct、Planner、Router Agent</div>
            </a>
          </div>

          <Callout type="info" title="学习路径建议">
            掌握本文基础后，建议按以下顺序深入学习：
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li><strong>LangChain 进阶</strong>：学习 LCEL 表达式语言和高级组合技巧</li>
              <li><strong>LangGraph 核心</strong>：掌握有状态工作流编排和 Agent 调度</li>
              <li><strong>Agent 模式</strong>：实践 ReAct、Reflection 等经典 Agent 架构</li>
              <li><strong>Workflow 设计</strong>：构建生产级容错工作流系统</li>
            </ol>
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* Sidebar TOC */}
      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
