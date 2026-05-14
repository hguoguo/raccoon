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
  { id: 'sdk-modules', text: 'SDK 核心模块', level: 2 },
  { id: 'core-api', text: '核心 API 详解', level: 2 },
  { id: 'chat-api', text: '5.1 Chat API(对话接口)', level: 3 },
  { id: 'responses-api', text: '5.2 Responses API(新响应 API)', level: 3 },
  { id: 'reasoning', text: '5.7 Reasoning API(深度思考)', level: 3 },
  { id: 'streaming', text: '5.3 Streaming(流式响应)', level: 3 },
  { id: 'function-calling', text: '5.4 Function Calling(函数调用)', level: 3 },
  { id: 'embedding-api', text: '5.5 Embedding API(向量化接口)', level: 3 },
  { id: 'structured-output', text: '5.6 Structured Output(结构化输出)', level: 3 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function OpenAISDK({ meta }: { meta: KnowledgeNode }) {
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
          OpenAI SDK 是官方提供的 Python/JavaScript 客户端库，封装了 OpenAI API 的 HTTP 调用细节，提供类型安全、自动重试、流式响应等高级功能，简化 LLM 应用开发。
        </p>
      </section>

      {/* 架构图 */}
      <section className="mb-8">
        <h2 id="sdk-modules" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          SDK 核心模块
        </h2>
        <DiagramBlock title="OpenAI SDK 架构">
          <div className="text-[13px] sm:text-[14px] font-mono text-ink-muted leading-relaxed text-left space-y-2">
            <div><span className="text-rose font-semibold">openai.Client</span> → 主客户端（管理连接、认证）</div>
            <div><span className="text-teal font-semibold">chat.completions</span> → 对话接口（GPT-4/3.5）</div>
            <div><span className="text-sky font-semibold">embeddings</span> → 向量化接口</div>
            <div><span className="text-indigo font-semibold">responses</span> → 新响应 API（实验性）</div>
            <div><span className="text-amber font-semibold">AsyncClient</span> → 异步客户端</div>
            <div><span className="text-emerald font-semibold">pydantic integration</span> → 结构化输出支持</div>
          </div>
        </DiagramBlock>
        <SideNote label="版本说明">
          本文基于 OpenAI Python SDK v1.x（2023 年重构后的新版本）。旧版 v0.x 使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">openai.ChatCompletion.create()</code>，新版改为 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">client.chat.completions.create()</code>。
        </SideNote>
      </section>

      {/* 核心原理 */}
      <section className="mb-8">
        <h2 id="core-api" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          核心 API 详解
        </h2>

        <h3 id="chat-api" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          5.1 Chat API（对话接口）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Chat Completions API 是最常用的接口，用于与 GPT 模型进行多轮对话。支持 system/user/assistant 三种角色消息，实现上下文连贯的交互。
        </p>
        <Playground
          code={`from openai import OpenAI

# 初始化客户端
client = OpenAI(api_key="sk-...")  # 或从环境变量 OPENAI_API_KEY 读取

# 基础对话
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "你是专业的 Python 导师"},
        {"role": "user", "content": "解释一下装饰器"}
    ],
    temperature=0.7,
    max_tokens=500
)

# 提取回答
answer = response.choices[0].message.content
print(answer)

# 查看用量信息
print(f"Tokens used: {response.usage.total_tokens}")`}
          language="python"
          filename="chat_api_basic.py"
          description="基础的 Chat API 调用"
        />
        <Callout type="tip" title="关键参数">
          <ul className="list-disc list-inside space-y-1 mt-2 text-[14px] sm:text-[15px] text-ink-muted">
            <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">model</code>：模型名称（gpt-4, gpt-3.5-turbo, gpt-4-turbo）</li>
            <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">messages</code>：消息列表，必须包含 role 和 content</li>
            <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">temperature</code>：随机性控制（0-2，默认 1）</li>
            <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">max_tokens</code>：最大输出长度</li>
            <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">top_p</code>：核采样参数（0-1）</li>
          </ul>
        </Callout>
        <Playground
          code={`from openai import OpenAI

client = OpenAI()

# 多轮对话：维护完整的消息历史
messages = [
    {"role": "system", "content": "你是友好的编程助手"}
]

# 第一轮对话
messages.append({"role": "user", "content": "Python 中如何实现单例模式？"})
response1 = client.chat.completions.create(
    model="gpt-4",
    messages=messages
)
assistant_reply1 = response1.choices[0].message.content
print("助手:", assistant_reply1)

# 将助手回复加入历史
messages.append({"role": "assistant", "content": assistant_reply1})

# 第二轮对话（基于上下文）
messages.append({"role": "user", "content": "那线程安全的单例呢？"})
response2 = client.chat.completions.create(
    model="gpt-4",
    messages=messages  # 包含之前的完整对话历史
)
assistant_reply2 = response2.choices[0].message.content
print("助手:", assistant_reply2)

# 查看完整对话历史
print(f"\n对话轮数: {(len(messages) - 1) // 2}")
print(f"总 Token 数: {response2.usage.total_tokens}")`}
          language="python"
          filename="multi_turn_conversation.py"
          description="多轮对话：维护消息历史实现上下文连贯"
        />
        <SideNote label="多轮对话要点">
          <strong>核心原则：</strong>每次调用 API 时，都要传入完整的消息历史（包括之前所有的 user 和 assistant 消息）。<br />
          <strong>注意事项：</strong><br />
          ① 消息顺序很重要，必须按时间顺序排列<br />
          ② 注意 Token 限制，过长的历史需要截断或总结<br />
          ③ system 消息通常放在最前面，作为全局指令<br />
          ④ 可以通过删除早期消息来控制上下文长度
        </SideNote>

        <h3 id="responses-api" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          5.2 Responses API（新响应 API）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Responses API 是 OpenAI 推出的新一代接口（2025 年），统一了文本生成、工具调用、搜索等功能。相比 Chat API，它提供更简洁的接口和更好的工具集成体验。
        </p>
        <Playground
          code={`from openai import OpenAI

client = OpenAI()

# 使用新的 Responses API
response = client.responses.create(
    model="gpt-4",
    input="今天的天气怎么样？",
    tools=[
        {
            "type": "function",
            "name": "get_weather",
            "description": "获取天气信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string"}
                }
            }
        }
    ]
)

# 处理响应
if response.output[0].type == "function_call":
    tool_call = response.output[0]
    print(f"调用工具: {tool_call.name}")
    print(f"参数: {tool_call.arguments}")`}
          language="python"
          filename="responses_api.py"
          description="使用新的 Responses API"
        />
        <SideNote label="API 对比">
          <strong>Chat API vs Responses API：</strong><br />
          Chat API：成熟稳定，社区资源丰富，适合生产环境。<br />
          Responses API：更现代的接口设计，原生支持工具和搜索，但目前仍在演进中。建议新项目可以试用，但生产环境仍推荐 Chat API。
        </SideNote>

        <h3 id="streaming" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          5.3 Streaming（流式响应）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          流式响应允许逐块接收模型输出，显著提升用户体验（无需等待完整响应）。适用于聊天机器人、实时翻译等场景。
        </p>
        <ContextSwitcher
          simpleContent={
            <div>
              <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                <strong>同步流式：</strong>
              </p>
              <Playground
                code={`from openai import OpenAI

client = OpenAI()

stream = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "写一首短诗"}],
    stream=True  # 启用流式
)

# 逐块接收
for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`}
                language="python"
                filename="sync_streaming.py"
              />
            </div>
          }
          hardcoreContent={
            <div>
              <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                <strong>异步流式（高性能）：</strong>
              </p>
              <Playground
                code={`import asyncio
from openai import AsyncOpenAI

client = AsyncOpenAI()

async def stream_response():
    stream = await client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": "解释量子计算"}],
        stream=True
    )
    
    async for chunk in stream:
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="", flush=True)

# 运行
asyncio.run(stream_response())`}
                language="python"
                filename="async_streaming.py"
              />
            </div>
          }
        />
        <Callout type="info" title="流式响应优势">
          <ul className="list-disc list-inside space-y-1 mt-2 text-[14px] sm:text-[15px] text-ink-muted">
            <li><strong>降低延迟：</strong>首字显示时间（TTFT）从几秒降到几百毫秒</li>
            <li><strong>改善体验：</strong>用户可以看到实时生成的内容</li>
            <li><strong>节省内存：</strong>无需在内存中缓存完整响应</li>
            <li><strong>支持中断：</strong>用户可以随时停止生成</li>
          </ul>
        </Callout>

        <h3 id="function-calling" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          5.4 Function Calling（函数调用）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          SDK 原生支持 Function Calling，通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">tools</code> 参数声明可用工具，模型会自动决定何时调用并提取参数。
        </p>
        <Playground
          code={`from openai import OpenAI
import json

client = OpenAI()

# 定义工具
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "获取指定城市的当前天气",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "城市名称，如 '北京'"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"]
                    }
                },
                "required": ["location"]
            }
        }
    }
]

# 第一轮：模型决定是否调用工具
messages = [{"role": "user", "content": "北京今天天气如何？"}]
response = client.chat.completions.create(
    model="gpt-4",
    messages=messages,
    tools=tools,
    tool_choice="auto"
)

# 检查是否有工具调用
if response.choices[0].finish_reason == "tool_calls":
    tool_call = response.choices[0].message.tool_calls[0]
    
    # 执行工具
    args = json.loads(tool_call.function.arguments)
    weather_data = get_current_weather(**args)  # 你的函数
    
    # 第二轮：将结果返回给模型
    messages.append(response.choices[0].message)
    messages.append({
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content": json.dumps(weather_data)
    })
    
    final_response = client.chat.completions.create(
        model="gpt-4",
        messages=messages
    )
    
    print(final_response.choices[0].message.content)`}
          language="python"
          filename="function_calling_sdk.py"
          description="完整的 Function Calling 流程"
        />

        <h3 id="embedding-api" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          5.5 Embedding API（向量化接口）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Embedding API 将文本转换为向量表示，用于语义搜索、相似度计算、聚类等任务。SDK 提供了简洁的接口来处理批量文本。
        </p>
        <Playground
          code={`from openai import OpenAI
import numpy as np

client = OpenAI()

# 单个文本嵌入
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="人工智能是未来的发展方向"
)

embedding = response.data[0].embedding
print(f"向量维度: {len(embedding)}")  # 1536 维

# 批量嵌入（更高效）
texts = [
    "Python 是一种编程语言",
    "Java 也是一种编程语言",
    "今天天气真好"
]

response = client.embeddings.create(
    model="text-embedding-3-small",
    input=texts
)

embeddings = [item.embedding for item in response.data]

# 计算相似度
def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

similarity = cosine_similarity(embeddings[0], embeddings[1])
print(f"Python 和 Java 的相似度: {similarity:.4f}")  # 应该较高`}
          language="python"
          filename="embedding_api.py"
          description="使用 Embedding API 计算文本相似度"
        />
        <Callout type="tip" title="Embedding 模型选择">
          <ul className="list-disc list-inside space-y-1 mt-2 text-[14px] sm:text-[15px] text-ink-muted">
            <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">text-embedding-3-small</code>：1536 维，性价比高</li>
            <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">text-embedding-3-large</code>：3072 维，精度更高</li>
            <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">text-embedding-ada-002</code>：旧版模型，1536 维（逐渐淘汰）</li>
          </ul>
        </Callout>

        <h3 id="structured-output" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          5.6 Structured Output（结构化输出）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          OpenAI SDK v1.5+ 原生支持 Pydantic 结构化输出，通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">beta.chat.completions.parse()</code> 方法直接返回 Pydantic 对象，无需手动解析 JSON。
        </p>
        <Playground
          code={`from openai import OpenAI
from pydantic import BaseModel, Field
from typing import List

client = OpenAI()

# 定义输出模型
class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: List[str]

# 使用 parse 方法
completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "system", "content": "从文本中提取事件信息"},
        {"role": "user", "content": "张三和李四明天下午3点开会讨论项目"}
    ],
    response_format=CalendarEvent  # 直接传入 Pydantic 类
)

# 直接获取 Pydantic 对象
event = completion.choices[0].message.parsed
print(f"事件: {event.name}")
print(f"日期: {event.date}")
print(f"参与者: {', '.join(event.participants)}`}
          language="python"
          filename="structured_output_sdk.py"
          description="使用 SDK 原生支持的结构化输出"
        />
        <SideNote label="与传统方式对比">
          <strong>传统方式：</strong>Prompt 要求 JSON → 解析字符串 → 手动校验 → 错误处理<br />
          <strong>新方式：</strong>定义 Pydantic Model → 调用 parse() → 直接获得对象<br />
          新方式减少了 80% 的样板代码,且类型安全、IDE 友好。
        </SideNote>

        <h3 id="reasoning" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          5.7 Reasoning API(深度思考)
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Reasoning API 是 OpenAI o1/o3 系列模型的核心特性,允许模型在生成最终答案前进行"深度思考"。通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">reasoning_effort</code> 参数控制思考深度,适用于复杂推理、数学证明、代码调试等场景。
        </p>
        <Playground
          code={`from openai import OpenAI

client = OpenAI()

# 基础用法:启用深度思考
response = client.chat.completions.create(
    model="o1-preview",
    messages=[
        {"role": "user", "content": "解决这个复杂的数学问题..."}
    ],
    reasoning_effort="high"  # low | medium | high
)

print(response.choices[0].message.content)

# 查看思考过程(如果支持)
if hasattr(response.choices[0].message, 'reasoning_content'):
    print("思考过程:", response.choices[0].message.reasoning_content)`}
          language="python"
          filename="reasoning_api.py"
          description="使用 Reasoning API 进行深度思考"
        />
        <Callout type="info" title="Reasoning Effort 级别">
          <ul className="list-disc list-inside space-y-1 mt-2 text-[14px] sm:text-[15px] text-ink-muted">
            <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">low</code>:快速响应,适合简单问题</li>
            <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">medium</code>:平衡速度与准确性(默认)</li>
            <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">high</code>:深度推理,适合复杂任务,但耗时更长</li>
          </ul>
        </Callout>
        <Callout type="tip" title="适用场景">
          <ul className="list-disc list-inside space-y-1 mt-2 text-[14px] sm:text-[15px] text-ink-muted">
            <li>复杂数学问题和逻辑推理</li>
            <li>多步骤代码调试和优化</li>
            <li>科学计算和数据分析</li>
            <li>需要逐步推导的决策问题</li>
          </ul>
        </Callout>
      </section>

      {/* 常见误区 */}
      <section className="mb-8">
        <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          常见误区
        </h2>
        <Callout type="danger" title="误区 1:不设置超时和重试">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            网络请求可能失败(超时、限流、服务器错误)。SDK 内置了自动重试机制,但应配置合理的超时时间和最大重试次数,避免无限等待。
          </p>
        </Callout>
        <Callout type="danger" title="误区 2:忽略 Token 用量监控">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            每次响应都包含 usage 信息(prompt_tokens、completion_tokens、total_tokens)。应在生产环境中记录这些数据,以便成本控制和性能优化。
          </p>
        </Callout>
        <Callout type="danger" title="误区 3:在循环中创建 Client 实例">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            Client 应该作为全局单例复用,而不是每次调用都创建新实例。重复创建会导致连接池失效、性能下降。推荐在应用启动时创建一次,全局共享。
          </p>
        </Callout>
        <Callout type="danger" title="误区 4:滥用深度思考功能">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            Reasoning API 虽然强大,但并非所有场景都需要。对于简单问答、事实查询等任务,使用标准模型更经济高效。应根据任务复杂度选择合适的模型和思考级别,避免不必要的成本和延迟。
          </p>
        </Callout>
      </section>

      {/* 面试真题 */}
      <section id="interview" className="mb-8">
        <InterviewSection
          questions={[
            {
              question: 'OpenAI SDK v1.x 和 v0.x 的主要区别是什么？',
              answer: '主要区别：① 客户端模式：v1.x 使用 client.chat.completions.create()，v0.x 使用 openai.ChatCompletion.create()；② 类型安全：v1.x 完全重写，提供更好的类型提示；③ 异步支持：v1.x 原生支持 AsyncClient；④ 流式 API：v1.x 改进为迭代器模式；⑤ 错误处理：v1.x 使用异常层次结构；⑥ 模块化：v1.x 按功能拆分模块。迁移时需更新导入路径和方法调用方式。',
            },
            {
              question: '如何实现流式响应的错误处理？',
              answer: '流式响应的错误处理策略：① 包装整个流式循环在 try-except 中捕获 APIError；② 检查每个 chunk 的 finish_reason 字段；③ 处理不完整响应（用户中断或错误）；④ 记录部分响应内容用于调试；⑤ 实现优雅降级（如显示"生成中断，请重试"）；⑥ 对于异步流式，使用 async with 确保资源正确释放。关键点是在流式过程中保持状态一致性。',
            },
            {
              question: 'Function Calling 的两轮对话机制是如何工作的？',
              answer: '工作流程：① 第一轮：发送用户请求 + 工具定义，模型返回 tool_calls（包含工具名和参数）；② 客户端解析 tool_calls，执行实际函数获取结果；③ 第二轮：将工具调用结果以 role="tool" 的消息追加到对话历史，再次调用 API；④ 模型基于工具结果生成最终回答。关键是要维护完整的消息历史，包括 user、assistant、tool 三种角色的消息。',
            },
            {
              question: '如何优化 Embedding API 的性能和成本？',
              answer: '优化策略：① 批量处理：一次性发送多个文本（最多 2048 个），减少 API 调用次数；② 缓存：对相同文本缓存 embedding 结果；③ 降维：使用 PCA 等技术降低向量维度；④ 模型选择：text-embedding-3-small 性价比最高；⑤ 截断：过长文本先截断再嵌入；⑥ 异步并发：使用 AsyncClient 并行处理；⑦ 本地模型：高频场景考虑使用 sentence-transformers 等开源方案。',
            },
            {
              question: 'Structured Output 相比手动解析 JSON 有什么优势?',
              answer: '优势:① 类型安全:IDE 自动补全和类型检查;② 自动验证:Pydantic 内置数据校验;③ 减少样板代码:无需手动 json.loads() 和字段提取;④ 错误处理清晰:ValidationError 提供详细错误信息;⑤ 嵌套结构支持:复杂对象自动解析;⑥ 默认值处理:可选字段自动填充默认值;⑦ 序列化便捷:model_dump() 一键转 JSON。缺点是依赖较新的模型版本(gpt-4o 系列)。',
            },
            {
              question: 'Reasoning API 的优缺点是什么?如何选择合适的思考级别?',
              answer: '优点:① 显著提升复杂问题的准确率;② 展示推理过程,便于调试和验证;③ 适合数学、编程、科学等需要多步推理的任务。缺点:① 响应时间长(high 级别可能需要数十秒);② Token 消耗大幅增加(思考过程也计费);③ 成本高昂(o1 模型价格是 gpt-4 的数倍);④ 不适合实时交互场景。选择策略:简单任务用 standard 模型 + low effort;中等复杂度用 medium;只有真正复杂的推理任务才用 high。建议先从小规模测试开始,评估性价比后再大规模应用。',
            },
            {
              question: '如何在生产环境中管理长对话的上下文长度?',
              answer: '策略包括：① 滑动窗口：只保留最近 N 轮对话；② 摘要压缩：定期用 LLM 总结早期对话内容；③ 重要性筛选：保留关键信息，删除冗余内容；④ 分层存储：近期对话存内存，远期对话存数据库；⑤ Token 监控：实时统计 token 使用量，接近限制时触发压缩；⑥ 用户主动清理：提供"清空对话"功能。实际应用中常组合使用多种策略，平衡上下文完整性和成本。',
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
            <h4 className="font-semibold text-ink mb-2">← Function Calling</h4>
            <p className="text-[13px] text-ink-muted">深入了解 Function Calling 的原理和实现</p>
          </div>
          <div className="p-4 bg-parchment-soft rounded-paper-md border border-border">
            <h4 className="font-semibold text-ink mb-2">→ LangChain / LlamaIndex</h4>
            <p className="text-[13px] text-ink-muted">学习高级框架如何封装 OpenAI SDK</p>
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
