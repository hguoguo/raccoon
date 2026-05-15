import{j as e,g as x,r as h}from"./index-hyqxTCwJ.js";import{K as g}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as c}from"./SideNote-BKvanovA.js";import{C as o}from"./ContextSwitcher-Cjd-h5IL.js";import{C as r,A as f,S as u}from"./ArticleNav-DhfiS38Y.js";import{I as b}from"./InteractiveFlow-GAP1pk49.js";import{I as j}from"./InterviewSection-BBNdwyyN.js";import{D as i}from"./DiagramBlock-CLaKE9_7.js";const y=[{id:"definition",text:"一句话定义",level:2},{id:"sdk-modules",text:"SDK 核心模块",level:2},{id:"sdk-comparison",text:"版本对比",level:2},{id:"core-api",text:"核心 API 详解",level:2},{id:"chat-api",text:"5.1 Chat API(对话接口)",level:3},{id:"responses-api",text:"5.2 Responses API(新响应 API)",level:3},{id:"api-comparison",text:"Chat API vs Responses API 对比",level:3},{id:"reasoning",text:"5.7 Reasoning API(深度思考)",level:3},{id:"streaming",text:"5.3 Streaming(流式响应)",level:3},{id:"function-calling",text:"5.4 Function Calling(函数调用)",level:3},{id:"embedding-api",text:"5.5 Embedding API(向量化接口)",level:3},{id:"structured-output",text:"5.6 Structured Output(结构化输出)",level:3},{id:"param-explorer",text:"参数交互式探索",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"related",text:"知识关联",level:2}];function N(){const[a,n]=h.useState(.7),p=s=>s<=.3?"精确/事实性":s<=.8?"平衡/通用":s<=1.3?"创意/多样性":"随机/不可预测",d={"0.0":{prompt:"解释什么是装饰器",output:"装饰器是 Python 中一种语法糖，用于在不修改原函数代码的情况下扩展其功能。它本质上是一个接受函数作为参数并返回新函数的高阶函数。常见用法：@decorator_def 跟随函数定义。"},"0.7":{prompt:"解释什么是装饰器",output:'装饰器就像是给函数穿上一件"外套"，在不改动函数本身的情况下，给函数增加新功能。比如你有一个打招呼的函数，加个 @timer 装饰器就能自动计时，非常方便！'},"1.5":{prompt:"解释什么是装饰器",output:"想象装饰器是一个魔法贴纸！你把它贴在任何函数上，砰！那个函数就突然有了超能力——可能变得更快、更聪明、或者能记住自己做过的所有事情。最酷的是，原函数完全没变！"}},m=Object.keys(d).reduce((s,l)=>Math.abs(parseFloat(l)-a)<Math.abs(parseFloat(s)-a)?l:s);return e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-5 my-5 shadow-paper",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{className:"font-sans font-semibold text-[10px] sm:text-xs text-ink-faded uppercase tracking-[0.06em]",children:"交互式探索"}),e.jsx("span",{className:"font-sans text-[13px] sm:text-sm font-medium text-ink",children:"Temperature 参数效果"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsxs("span",{className:"text-[12px] sm:text-[13px] text-ink-muted font-sans",children:["temperature = ",e.jsx("strong",{className:"text-accent font-mono",children:a.toFixed(1)})]}),e.jsx("span",{className:"px-2 py-0.5 rounded-[3px] text-[11px] font-medium font-sans bg-accent-soft text-accent",children:p(a)})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:a,onChange:s=>n(parseFloat(s.target.value)),className:"w-full h-2 bg-parchment-deep rounded-full appearance-none cursor-pointer accent-[var(--accent)]"}),e.jsxs("div",{className:"flex justify-between text-[10px] text-ink-ghost font-mono mt-1",children:[e.jsx("span",{children:"0.0 精确"}),e.jsx("span",{children:"1.0 平衡"}),e.jsx("span",{children:"2.0 随机"})]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-3",children:Object.entries(d).map(([s,l])=>e.jsxs("div",{className:`p-3 rounded-paper-md border transition-all duration-200 ${m===s?"border-accent/40 bg-accent-soft/30 shadow-[0_0_8px_rgba(181,101,29,0.15)]":"border-border bg-parchment-light"}`,children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsxs("span",{className:`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-[3px] ${m===s?"bg-accent text-white":"bg-parchment-deep text-ink-muted"}`,children:["T=",s]}),e.jsx("span",{className:"text-[11px] text-ink-muted font-sans",children:p(parseFloat(s))})]}),e.jsxs("div",{className:"text-[11px] sm:text-[12px] text-ink-muted font-sans leading-[1.7]",children:[e.jsx("span",{className:"text-ink-ghost",children:"Prompt: "}),l.prompt,e.jsxs("div",{className:"mt-1.5 pt-1.5 border-t border-border-light/50",children:[e.jsx("span",{className:"text-ink-ghost",children:"输出: "}),l.output]})]})]},s))})]})}function S({meta:a}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(g,{meta:a,children:[e.jsxs("section",{className:"mb-8",children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"OpenAI SDK 是官方提供的 Python/JavaScript 客户端库，封装了 OpenAI API 的 HTTP 调用细节，提供类型安全、自动重试、流式响应等高级功能，简化 LLM 应用开发。"})]}),e.jsxs("section",{className:"mb-8",children:[e.jsx("h2",{id:"sdk-modules",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"SDK 核心模块"}),e.jsx(i,{title:"OpenAI SDK 架构图",children:`graph TD
    Client["🔑 openai.Client<br/>主客户端 — 连接/认证/重试"]
    Chat["💬 chat.completions<br/>对话接口 GPT-4/3.5"]
    Emb["📐 embeddings<br/>向量化接口"]
    Resp["🧪 responses<br/>新响应 API（实验性）"]
    Async["⚡ AsyncClient<br/>异步客户端"]
    Pyd["✅ pydantic integration<br/>结构化输出支持"]
    Reason["🧠 o1/o3 Reasoning<br/>深度思考"]

    Client --> Chat
    Client --> Emb
    Client --> Resp
    Client --> Async
    Client --> Pyd
    Client --> Reason
    Async --> Chat
    Async --> Emb
    Pyd -.-> Chat`}),e.jsxs(c,{label:"版本说明",children:["本文基于 OpenAI Python SDK v1.x（2023 年重构后的新版本）。旧版 v0.x 使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"openai.ChatCompletion.create()"}),"，新版改为 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"client.chat.completions.create()"}),"。"]})]}),e.jsxs("section",{className:"mb-8",children:[e.jsx("h2",{id:"sdk-comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"版本对比"}),e.jsx("div",{className:"overflow-x-auto my-4",children:e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink bg-parchment-soft rounded-tl-paper-md",children:"对比维度"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-rose bg-parchment-soft",children:"v0.x（旧版）"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-teal bg-parchment-soft rounded-tr-paper-md",children:"v1.x（新版）"})]})}),e.jsxs("tbody",{className:"text-ink-muted",children:[e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"调用方式"}),e.jsx("td",{className:"py-2.5 px-4",children:e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"openai.ChatCompletion.create()"})}),e.jsx("td",{className:"py-2.5 px-4",children:e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"client.chat.completions.create()"})})]}),e.jsxs("tr",{className:"border-b border-border-light bg-parchment-soft/30",children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"类型安全"}),e.jsx("td",{className:"py-2.5 px-4",children:"❌ 无类型提示"}),e.jsx("td",{className:"py-2.5 px-4",children:"✅ 完整类型标注"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"异步支持"}),e.jsx("td",{className:"py-2.5 px-4",children:"⚠️ 需要手动封装"}),e.jsx("td",{className:"py-2.5 px-4",children:"✅ 原生 AsyncClient"})]}),e.jsxs("tr",{className:"border-b border-border-light bg-parchment-soft/30",children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"流式 API"}),e.jsx("td",{className:"py-2.5 px-4",children:"⚠️ 生成器模式"}),e.jsx("td",{className:"py-2.5 px-4",children:"✅ 迭代器模式"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"错误处理"}),e.jsx("td",{className:"py-2.5 px-4",children:"⚠️ 简单异常"}),e.jsx("td",{className:"py-2.5 px-4",children:"✅ 异常层次结构"})]}),e.jsxs("tr",{className:"border-b border-border-light bg-parchment-soft/30",children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"自动重试"}),e.jsx("td",{className:"py-2.5 px-4",children:"❌ 需手动实现"}),e.jsx("td",{className:"py-2.5 px-4",children:"✅ 内置指数退避"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"模块化"}),e.jsx("td",{className:"py-2.5 px-4",children:"❌ 扁平结构"}),e.jsx("td",{className:"py-2.5 px-4",children:"✅ 按功能拆分模块"})]})]})]})})]}),e.jsxs("section",{className:"mb-8",children:[e.jsx("h2",{id:"core-api",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"核心 API 详解"}),e.jsx("h3",{id:"chat-api",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.1 Chat API（对话接口）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Chat Completions API 是最常用的接口，用于与 GPT 模型进行多轮对话。支持 system/user/assistant 三种角色消息，实现上下文连贯的交互。"}),e.jsx(o,{simpleContent:e.jsx("div",{children:e.jsx(t,{code:`from openai import OpenAI

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
print(f"Tokens used: {response.usage.total_tokens}")`,language:"python",filename:"chat_api_basic.py",description:"基础的 Chat API 调用"})}),hardcoreContent:e.jsx("div",{children:e.jsx(t,{code:`from openai import OpenAI
import httpx
import logging

# 配置日志和超时
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 初始化客户端 — 生产环境最佳实践
client = OpenAI(
    api_key="sk-...",
    max_retries=3,           # 自动重试次数
    timeout=httpx.Timeout(   # 精细超时控制
        connect=5.0,         # 连接超时
        read=60.0,           # 读取超时
        write=10.0,          # 写入超时
        pool=5.0             # 连接池超时
    ),
    http_client=httpx.Client(  # 自定义 HTTP 客户端
        limits=httpx.Limits(
            max_connections=100,
            max_keepalive_connections=20
        )
    )
)

# 完整的 Chat API 调用 — 带错误处理
try:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "你是专业的 Python 导师"},
            {"role": "user", "content": "解释一下装饰器"}
        ],
        temperature=0.7,
        max_tokens=500,
        top_p=0.9,                     # 核采样
        frequency_penalty=0.3,          # 频率惩罚（减少重复）
        presence_penalty=0.2,           # 存在惩罚（鼓励新话题）
        seed=42,                        # 可复现输出
        response_format={"type": "text"},  # 响应格式
        n=1,                            # 生成候选数
    )

    choice = response.choices[0]
    logger.info(f"模型: {response.model}")
    logger.info(f"完成原因: {choice.finish_reason}")
    logger.info(f"Token: prompt={response.usage.prompt_tokens}, "
                f"completion={response.usage.completion_tokens}, "
                f"total={response.usage.total_tokens}")

    print(choice.message.content)

except OpenAI.APIConnectionError as e:
    logger.error(f"连接失败: {e}")
except OpenAI.RateLimitError as e:
    logger.error(f"限流: {e}")
except OpenAI.APIStatusError as e:
    logger.error(f"API 错误 {e.status_code}: {e.message}")`,language:"python",filename:"chat_api_production.py",description:"生产环境的 Chat API 完整调用"})})}),e.jsx(r,{type:"tip",title:"关键参数",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2 text-[14px] sm:text-[15px] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"model"}),"：模型名称（gpt-4, gpt-3.5-turbo, gpt-4-turbo）"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"messages"}),"：消息列表，必须包含 role 和 content"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"temperature"}),"：随机性控制（0-2，默认 1）"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"max_tokens"}),"：最大输出长度"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"top_p"}),"：核采样参数（0-1）"]})]})}),e.jsx(o,{simpleContent:e.jsx("div",{children:e.jsx(t,{code:`from openai import OpenAI

client = OpenAI()

# system 消息放在最前面，作为全局指令
messages = [
    {"role": "system", "content": "你是友好的编程助手，用简洁的语言回答问题"}
]

# 第1轮对话
messages.append({"role": "user", "content": "Python 中如何实现单例模式？"})
response1 = client.chat.completions.create(
    model="gpt-4",
    messages=messages
)
assistant_reply1 = response1.choices[0].message.content
print("助手:", assistant_reply1)

# 将助手回复加入历史（保持时间顺序）
messages.append({"role": "assistant", "content": assistant_reply1})

# 第2轮对话（基于上下文）
messages.append({"role": "user", "content": "那线程安全的单例呢？"})
response2 = client.chat.completions.create(
    model="gpt-4",
    messages=messages
)
assistant_reply2 = response2.choices[0].message.content
print("助手:", assistant_reply2)
messages.append({"role": "assistant", "content": assistant_reply2})`,language:"python",filename:"multi_turn_simple.py",description:"多轮对话：基础版"})}),hardcoreContent:e.jsx("div",{children:e.jsx(t,{code:`from openai import OpenAI

client = OpenAI()

# system 消息放在最前面，作为全局指令
messages = [
    {"role": "system", "content": "你是友好的编程助手，用简洁的语言回答问题"}
]

# 第1轮对话
messages.append({"role": "user", "content": "Python 中如何实现单例模式？"})
response1 = client.chat.completions.create(
    model="gpt-4",
    messages=messages  # 按时间顺序：system → user
)
assistant_reply1 = response1.choices[0].message.content
print("助手:", assistant_reply1)

# 将助手回复加入历史（保持时间顺序）
messages.append({"role": "assistant", "content": assistant_reply1})

# 第2轮对话（基于上下文）
messages.append({"role": "user", "content": "那线程安全的单例呢？"})
response2 = client.chat.completions.create(
    model="gpt-4",
    messages=messages  # 按时间顺序：system → user1 → assistant1 → user2
)
assistant_reply2 = response2.choices[0].message.content
print("助手:", assistant_reply2)
messages.append({"role": "assistant", "content": assistant_reply2})

# 检查 Token 使用量
print(f"\\n当前对话轮数: {(len(messages) - 1) // 2}")
print(f"总 Token 数: {response2.usage.total_tokens}")

# 当对话过长时，删除早期消息控制上下文长度
MAX_TURNS = 5  # 最多保留5轮对话
if len(messages) > MAX_TURNS * 2 + 1:  # +1 是 system 消息
    # 保留 system + 最近 N 轮
    messages = [messages[0]] + messages[-(MAX_TURNS * 2):]
    print(f"已截断对话历史，保留最近 {MAX_TURNS} 轮")`,language:"python",filename:"multi_turn_conversation.py",description:"多轮对话：完整版（含截断策略）"})})}),e.jsxs(c,{label:"多轮对话要点",children:[e.jsx("strong",{children:"核心原则："}),"每次调用 API 时，都要传入完整的消息历史（包括之前所有的 user 和 assistant 消息）。",e.jsx("br",{}),e.jsx("strong",{children:"四大注意事项："}),e.jsx("br",{}),e.jsx("span",{className:"text-sky font-semibold",children:"① 消息顺序"}),"：必须严格按时间顺序排列（system → user1 → assistant1 → user2 → ...）",e.jsx("br",{}),e.jsx("span",{className:"text-amber font-semibold",children:"② Token 监控"}),"：通过 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"response.usage.total_tokens"})," 实时监控，接近模型上限时触发截断",e.jsx("br",{}),e.jsx("span",{className:"text-rose font-semibold",children:"③ System 位置"}),"：始终保持在 messages[0]，作为全局指令贯穿整个对话",e.jsx("br",{}),e.jsx("span",{className:"text-emerald font-semibold",children:"④ 动态截断"}),"：采用滑动窗口策略，保留 system + 最近 N 轮对话，删除早期消息控制长度"]}),e.jsx(i,{title:"工具调用流程（时序图）",children:`sequenceDiagram
    participant U as 👤 User
    participant C as 💻 Client
    participant L as 🤖 LLM
    participant T as 🔧 Tool

    U->>C: "北京天气如何？"
    C->>L: messages + tools 定义
    Note over L: 分析用户意图<br/>决定调用工具
    L-->>C: tool_calls[{get_current_weather, {location:"北京"}}]
    Note over C: 第1轮结束<br/>finish_reason="tool_calls"
    C->>T: 执行 get_current_weather("北京")
    T-->>C: {temp: 25°C, condition: "晴"}
    Note over C: 追加 role="tool" 消息
    C->>L: messages + tool result
    Note over L: 基于工具结果<br/>生成自然语言
    L-->>C: "北京今天晴，气温25°C"
    C->>U: 最终回答`}),e.jsx("h3",{id:"responses-api",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.2 Responses API（新响应 API）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Responses API 是 OpenAI 推出的新一代接口（2025 年），统一了文本生成、工具调用、搜索等功能。相比 Chat API，它提供更简洁的接口和更好的工具集成体验。"}),e.jsx(t,{code:`from openai import OpenAI

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
    print(f"参数: {tool_call.arguments}")`,language:"python",filename:"responses_api.py",description:"使用新的 Responses API"}),e.jsx("h3",{id:"api-comparison",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Chat API vs Responses API 对比"}),e.jsx("div",{className:"overflow-x-auto my-4",children:e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink bg-parchment-soft rounded-tl-paper-md",children:"对比维度"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-sky bg-parchment-soft",children:"Chat API"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-indigo bg-parchment-soft rounded-tr-paper-md",children:"Responses API"})]})}),e.jsxs("tbody",{className:"text-ink-muted",children:[e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"稳定性"}),e.jsx("td",{className:"py-2.5 px-4",children:"✅ 生产就绪"}),e.jsx("td",{className:"py-2.5 px-4",children:"🧪 实验性"})]}),e.jsxs("tr",{className:"border-b border-border-light bg-parchment-soft/30",children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"接口风格"}),e.jsx("td",{className:"py-2.5 px-4",children:"messages 数组"}),e.jsx("td",{className:"py-2.5 px-4",children:"简化 input 字符串"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"工具集成"}),e.jsx("td",{className:"py-2.5 px-4",children:"⚠️ 需手动处理"}),e.jsx("td",{className:"py-2.5 px-4",children:"✅ 原生支持"})]}),e.jsxs("tr",{className:"border-b border-border-light bg-parchment-soft/30",children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"社区资源"}),e.jsx("td",{className:"py-2.5 px-4",children:"✅ 丰富"}),e.jsx("td",{className:"py-2.5 px-4",children:"⚠️ 较少"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"搜索功能"}),e.jsx("td",{className:"py-2.5 px-4",children:"❌ 不支持"}),e.jsx("td",{className:"py-2.5 px-4",children:"✅ 原生 web_search"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2.5 px-4 font-medium text-ink",children:"推荐场景"}),e.jsx("td",{className:"py-2.5 px-4",children:"生产环境"}),e.jsx("td",{className:"py-2.5 px-4",children:"新项目试用"})]})]})]})}),e.jsx(c,{label:"API 选择建议",children:"Chat API 成熟稳定，社区资源丰富，适合生产环境。Responses API 有更现代的接口设计，原生支持工具和搜索，但目前仍在演进中。建议新项目可以试用，但生产环境仍推荐 Chat API。"}),e.jsx("h3",{id:"streaming",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.3 Streaming（流式响应）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"流式响应允许逐块接收模型输出，显著提升用户体验（无需等待完整响应）。适用于聊天机器人、实时翻译等场景。"}),e.jsx(o,{simpleContent:e.jsxs("div",{children:[e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:e.jsx("strong",{children:"同步流式："})}),e.jsx(t,{code:`from openai import OpenAI

client = OpenAI()

stream = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "写一首短诗"}],
    stream=True  # 启用流式
)

# 逐块接收
for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`,language:"python",filename:"sync_streaming.py"})]}),hardcoreContent:e.jsxs("div",{children:[e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:e.jsx("strong",{children:"异步流式（高性能）："})}),e.jsx(t,{code:`import asyncio
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
asyncio.run(stream_response())`,language:"python",filename:"async_streaming.py"})]})}),e.jsx(i,{title:"流式响应工作原理",children:`sequenceDiagram
    participant C as 💻 Client
    participant S as 🌐 API Server
    participant U as 👤 User

    C->>S: POST /chat/completions (stream=true)
    S-->>C: chunk 1: "在"
    Note over U: ⏱ TTFT ~200ms
    U->>U: 显示 "在"
    S-->>C: chunk 2: "一个"
    U->>U: 显示 "在一个"
    S-->>C: chunk 3: "遥远"
    U->>U: 显示 "在一个遥远"
    Note over S: ...持续生成...
    S-->>C: chunk N: [DONE]
    Note over U: ✅ 完整响应已显示`}),e.jsx(r,{type:"info",title:"流式响应优势",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2 text-[14px] sm:text-[15px] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"降低延迟："}),"首字显示时间（TTFT）从几秒降到几百毫秒"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"改善体验："}),"用户可以看到实时生成的内容"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"节省内存："}),"无需在内存中缓存完整响应"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"支持中断："}),"用户可以随时停止生成"]})]})}),e.jsx("h3",{id:"function-calling",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.4 Function Calling（函数调用）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["SDK 原生支持 Function Calling，通过 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"tools"})," 参数声明可用工具，模型会自动决定何时调用并提取参数。"]}),e.jsx(o,{simpleContent:e.jsx("div",{children:e.jsx(t,{code:`from openai import OpenAI
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
    
    print(final_response.choices[0].message.content)`,language:"python",filename:"function_calling_sdk.py",description:"完整的 Function Calling 流程"})}),hardcoreContent:e.jsx("div",{children:e.jsx(t,{code:`from openai import OpenAI
import json
from typing import List

client = OpenAI()

# 多工具定义 — 一次声明多个可用工具
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "获取指定城市的当前天气",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "城市名称"},
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
                },
                "required": ["location"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_forecast",
            "description": "获取未来几天的天气预报",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string"},
                    "days": {"type": "integer", "description": "预报天数"}
                },
                "required": ["location", "days"]
            }
        }
    }
]

# 强制调用特定工具
messages = [{"role": "user", "content": "北京天气如何？"}]
response = client.chat.completions.create(
    model="gpt-4",
    messages=messages,
    tools=tools,
    tool_choice={"type": "function", "function": {"name": "get_current_weather"}}
    # tool_choice="auto"   → 模型自动决定
    # tool_choice="none"   → 禁止调用工具
    # tool_choice={...}    → 强制调用指定工具
)

# 处理多个并行工具调用
if response.choices[0].finish_reason == "tool_calls":
    tool_calls = response.choices[0].message.tool_calls
    messages.append(response.choices[0].message)
    
    # 并行执行所有工具
    for tool_call in tool_calls:
        args = json.loads(tool_call.function.arguments)
        func_name = tool_call.function.name
        result = globals()[func_name](**args)  # 动态调用
        
        messages.append({
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": json.dumps(result)
        })
    
    # 汇总所有结果
    final = client.chat.completions.create(
        model="gpt-4",
        messages=messages
    )
    print(final.choices[0].message.content)`,language:"python",filename:"function_calling_advanced.py",description:"高级 Function Calling：多工具 + 强制调用 + 并行执行"})})}),e.jsx(b,{title:"Function Calling 执行流程",orientation:"vertical",steps:[{label:"发送请求",description:"User 发送消息 + tools 定义给 LLM。模型收到可选工具列表和用户问题。",icon:"📤"},{label:"模型决策",description:'LLM 判断需要调用 get_current_weather，返回 tool_calls（包含函数名和参数 {location: "北京"}）。',icon:"🧠"},{label:"客户端执行",description:'解析 tool_calls 中的 arguments，调用实际函数获取天气数据 {temp: 25°C, condition: "晴"}。',icon:"⚡"},{label:"返回结果",description:'将工具结果以 role="tool" 追加到 messages，再次调用 API。',icon:"🔄"},{label:"生成回答",description:'LLM 基于工具结果生成自然语言："北京今天晴，气温25°C"',icon:"✅"}]}),e.jsx(i,{title:"Function Calling 时序图",children:`sequenceDiagram
    participant U as 👤 User
    participant C as 💻 Client
    participant L as 🤖 LLM
    participant T as 🔧 Tool

    U->>C: "北京天气如何？"
    C->>L: messages + tools 定义
    Note over L: 分析用户意图<br/>决定调用工具
    L-->>C: tool_calls[{get_current_weather, {location:"北京"}}]
    Note over C: 第1轮结束<br/>finish_reason="tool_calls"
    C->>T: 执行 get_current_weather("北京")
    T-->>C: {temp: 25°C, condition: "晴"}
    Note over C: 追加 role="tool" 消息
    C->>L: messages + tool result
    Note over L: 基于工具结果<br/>生成自然语言
    L-->>C: "北京今天晴，气温25°C"
    C->>U: 最终回答`}),e.jsx("h3",{id:"embedding-api",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.5 Embedding API（向量化接口）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Embedding API 将文本转换为向量表示，用于语义搜索、相似度计算、聚类等任务。SDK 提供了简洁的接口来处理批量文本。"}),e.jsx(t,{code:`from openai import OpenAI
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
print(f"Python 和 Java 的相似度: {similarity:.4f}")  # 应该较高`,language:"python",filename:"embedding_api.py",description:"使用 Embedding API 计算文本相似度"}),e.jsx("div",{className:"overflow-x-auto my-4",children:e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink bg-parchment-soft rounded-tl-paper-md",children:"模型"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink bg-parchment-soft",children:"维度"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink bg-parchment-soft",children:"性能"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink bg-parchment-soft",children:"价格"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink bg-parchment-soft rounded-tr-paper-md",children:"推荐"})]})}),e.jsxs("tbody",{className:"text-ink-muted",children:[e.jsxs("tr",{className:"border-b border-border-light bg-accent-soft/10",children:[e.jsx("td",{className:"py-2.5 px-4 font-mono text-[12px] font-medium text-ink",children:"text-embedding-3-small"}),e.jsx("td",{className:"py-2.5 px-4",children:"1536"}),e.jsx("td",{className:"py-2.5 px-4",children:"⭐⭐⭐⭐"}),e.jsx("td",{className:"py-2.5 px-4",children:"💰 低"}),e.jsx("td",{className:"py-2.5 px-4",children:e.jsx("span",{className:"px-2 py-0.5 bg-teal-soft text-teal rounded-[3px] text-[11px] font-semibold",children:"首选"})})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-4 font-mono text-[12px] font-medium text-ink",children:"text-embedding-3-large"}),e.jsx("td",{className:"py-2.5 px-4",children:"3072"}),e.jsx("td",{className:"py-2.5 px-4",children:"⭐⭐⭐⭐⭐"}),e.jsx("td",{className:"py-2.5 px-4",children:"💰💰 中"}),e.jsx("td",{className:"py-2.5 px-4",children:e.jsx("span",{className:"px-2 py-0.5 bg-sky-soft text-sky rounded-[3px] text-[11px] font-semibold",children:"高精度"})})]}),e.jsxs("tr",{className:"border-b border-border-light bg-parchment-soft/30",children:[e.jsx("td",{className:"py-2.5 px-4 font-mono text-[12px] font-medium text-ink-muted",children:"text-embedding-ada-002"}),e.jsx("td",{className:"py-2.5 px-4",children:"1536"}),e.jsx("td",{className:"py-2.5 px-4",children:"⭐⭐⭐"}),e.jsx("td",{className:"py-2.5 px-4",children:"💰 低"}),e.jsx("td",{className:"py-2.5 px-4",children:e.jsx("span",{className:"px-2 py-0.5 bg-parchment-deep text-ink-muted rounded-[3px] text-[11px] font-semibold",children:"已过时"})})]})]})]})}),e.jsx(i,{title:"Embedding 相似度可视化",children:`graph LR
    A["'Python 是编程语言'"] -->|"0.92 高相似度"| B["'Java 也是编程语言'"]
    A -->|"0.35 低相似度"| C["'今天天气真好'"]
    B -->|"0.31 低相似度"| C

    style A fill:#e8f4f8,stroke:#0ea5e9
    style B fill:#e8f4f8,stroke:#0ea5e9
    style C fill:#fef3c7,stroke:#f59e0b`}),e.jsx("h3",{id:"structured-output",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.6 Structured Output（结构化输出）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["OpenAI SDK v1.5+ 原生支持 Pydantic 结构化输出，通过 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"beta.chat.completions.parse()"})," 方法直接返回 Pydantic 对象，无需手动解析 JSON。"]}),e.jsx(o,{simpleContent:e.jsx("div",{children:e.jsx(t,{code:`from openai import OpenAI
from pydantic import BaseModel
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
    response_format=CalendarEvent
)

# 直接获取 Pydantic 对象
event = completion.choices[0].message.parsed
print(f"事件: {event.name}")
print(f"日期: {event.date}")
print(f"参与者: {', '.join(event.participants)}")`,language:"python",filename:"structured_output_simple.py",description:"简单模型的结构化输出"})}),hardcoreContent:e.jsx("div",{children:e.jsx(t,{code:`from openai import OpenAI
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

client = OpenAI()

# 复杂嵌套模型
class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Participant(BaseModel):
    name: str = Field(description="参与者姓名")
    role: str = Field(description="角色: organizer/attendee/optional")
    email: Optional[str] = Field(default=None, description="邮箱")

class CalendarEvent(BaseModel):
    name: str = Field(description="事件名称")
    date: str = Field(description="日期，ISO 8601 格式")
    time: str = Field(description="时间，HH:MM 格式")
    priority: Priority = Field(description="优先级")
    participants: List[Participant] = Field(description="参与者列表")
    location: Optional[str] = Field(default=None, description="地点")
    notes: Optional[str] = Field(default=None, description="备注")

completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "system", "content": "从文本中提取事件信息，尽量填充所有字段"},
        {"role": "user", "content": "张三和李四明天下午3点在3号会议室开会讨论项目上线，这个很重要，王五可选参加"}
    ],
    response_format=CalendarEvent
)

event = completion.choices[0].message.parsed
# Pydantic 自动验证：枚举值、必填字段、嵌套结构
print(event.model_dump_json(indent=2))
# 输出完全符合 CalendarEvent schema 的 JSON`,language:"python",filename:"structured_output_advanced.py",description:"嵌套模型 + 枚举 + 验证的结构化输出"})})}),e.jsx(i,{title:"结构化输出：传统方式 vs 新方式",children:`graph LR
    A1["Prompt 要求 JSON"] --> A2["json.loads()"]
    A2 --> A3["手动校验"]
    A3 --> A4["错误处理"]
    A4 --> A5["提取字段"]
    
    B1["定义 Pydantic Model"] --> B2["parse() 调用"]
    B2 --> B3["直接获得对象 ✅"]
    
    style A1 fill:#fef2f2,stroke:#ef4444
    style A2 fill:#fef2f2,stroke:#ef4444
    style A3 fill:#fef2f2,stroke:#ef4444
    style A4 fill:#fef2f2,stroke:#ef4444
    style A5 fill:#fef2f2,stroke:#ef4444
    style B1 fill:#f0fdf4,stroke:#22c55e
    style B2 fill:#f0fdf4,stroke:#22c55e
    style B3 fill:#f0fdf4,stroke:#22c55e`}),e.jsx("h3",{id:"reasoning",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.7 Reasoning API（深度思考）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:['Reasoning API 是 OpenAI o1/o3 系列模型的核心特性，允许模型在生成最终答案前进行"深度思考"。通过 ',e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"reasoning_effort"})," 参数控制思考深度，适用于复杂推理、数学证明、代码调试等场景。"]}),e.jsx(t,{code:`from openai import OpenAI

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
    print("思考过程:", response.choices[0].message.reasoning_content)`,language:"python",filename:"reasoning_api.py",description:"使用 Reasoning API 进行深度思考"}),e.jsx("div",{className:"overflow-x-auto my-4",children:e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink bg-parchment-soft rounded-tl-paper-md",children:"级别"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink bg-parchment-soft",children:"速度"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink bg-parchment-soft",children:"准确率"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink bg-parchment-soft",children:"成本"}),e.jsx("th",{className:"text-left py-3 px-4 font-semibold text-ink bg-parchment-soft rounded-tr-paper-md",children:"适用场景"})]})}),e.jsxs("tbody",{className:"text-ink-muted",children:[e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-4",children:e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"low"})}),e.jsx("td",{className:"py-2.5 px-4",children:"⚡ 快"}),e.jsx("td",{className:"py-2.5 px-4",children:"⭐⭐⭐"}),e.jsx("td",{className:"py-2.5 px-4",children:"💰"}),e.jsx("td",{className:"py-2.5 px-4",children:"简单问答、事实查询"})]}),e.jsxs("tr",{className:"border-b border-border-light bg-parchment-soft/30",children:[e.jsx("td",{className:"py-2.5 px-4",children:e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"medium"})}),e.jsx("td",{className:"py-2.5 px-4",children:"🏃 中等"}),e.jsx("td",{className:"py-2.5 px-4",children:"⭐⭐⭐⭐"}),e.jsx("td",{className:"py-2.5 px-4",children:"💰💰"}),e.jsx("td",{className:"py-2.5 px-4",children:"一般推理、代码分析"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2.5 px-4",children:e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"high"})}),e.jsx("td",{className:"py-2.5 px-4",children:"🐢 慢"}),e.jsx("td",{className:"py-2.5 px-4",children:"⭐⭐⭐⭐⭐"}),e.jsx("td",{className:"py-2.5 px-4",children:"💰💰💰"}),e.jsx("td",{className:"py-2.5 px-4",children:"数学证明、复杂调试"})]})]})]})}),e.jsx(r,{type:"tip",title:"适用场景",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2 text-[14px] sm:text-[15px] text-ink-muted",children:[e.jsx("li",{children:"复杂数学问题和逻辑推理"}),e.jsx("li",{children:"多步骤代码调试和优化"}),e.jsx("li",{children:"科学计算和数据分析"}),e.jsx("li",{children:"需要逐步推导的决策问题"})]})})]}),e.jsxs("section",{className:"mb-8",children:[e.jsx("h2",{id:"param-explorer",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"参数交互式探索"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["拖动滑块感受 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"temperature"})," 参数对模型输出的影响。低 temperature 倾向于精确、事实性的回答；高 temperature 则产生更有创意、更多样的输出。"]}),e.jsx(N,{})]}),e.jsxs("section",{className:"mb-8",children:[e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"常见误区"}),e.jsx(r,{type:"danger",title:"误区 1：不设置超时和重试",children:e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2",children:"网络请求可能失败（超时、限流、服务器错误）。SDK 内置了自动重试机制，但应配置合理的超时时间和最大重试次数，避免无限等待。"})}),e.jsx(o,{simpleContent:e.jsx(t,{code:`# ❌ 错误：默认超时，无重试配置
client = OpenAI()  # 可能无限等待`,language:"python",filename:"wrong_timeout.py"}),hardcoreContent:e.jsx(t,{code:`# ✅ 正确：配置合理的超时和重试
import httpx

client = OpenAI(
    max_retries=3,
    timeout=httpx.Timeout(
        connect=5.0,   # 连接超时 5s
        read=60.0,     # 读取超时 60s
        write=10.0,    # 写入超时 10s
        pool=5.0       # 连接池超时 5s
    )
)`,language:"python",filename:"right_timeout.py"})}),e.jsx(r,{type:"danger",title:"误区 2：忽略 Token 用量监控",children:e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2",children:"每次响应都包含 usage 信息（prompt_tokens、completion_tokens、total_tokens）。应在生产环境中记录这些数据，以便成本控制和性能优化。"})}),e.jsx(o,{simpleContent:e.jsx(t,{code:`# ❌ 错误：不检查 usage
response = client.chat.completions.create(...)
print(response.choices[0].message.content)  # 只取结果，不管成本`,language:"python",filename:"wrong_usage.py"}),hardcoreContent:e.jsx(t,{code:`# ✅ 正确：记录并监控 Token 用量
import logging

response = client.chat.completions.create(...)
logger.info(
    f"Model: {response.model}, "
    f"Prompt: {response.usage.prompt_tokens}, "
    f"Completion: {response.usage.completion_tokens}, "
    f"Total: {response.usage.total_tokens}"
)

# 设置告警阈值
if response.usage.total_tokens > 4000:
    logger.warning(f"Token 用量偏高: {response.usage.total_tokens}")`,language:"python",filename:"right_usage.py"})}),e.jsx(r,{type:"danger",title:"误区 3：在循环中创建 Client 实例",children:e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2",children:"Client 应该作为全局单例复用，而不是每次调用都创建新实例。重复创建会导致连接池失效、性能下降。推荐在应用启动时创建一次，全局共享。"})}),e.jsx(o,{simpleContent:e.jsx(t,{code:`# ❌ 错误：每次调用创建新 Client
for query in queries:
    client = OpenAI()  # 每次都创建新实例！
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": query}]
    )`,language:"python",filename:"wrong_client.py"}),hardcoreContent:e.jsx(t,{code:`# ✅ 正确：全局单例复用
client = OpenAI()  # 应用启动时创建一次

def chat(query: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": query}]
    )
    return response.choices[0].message.content

for query in queries:
    result = chat(query)  # 复用同一 Client`,language:"python",filename:"right_client.py"})}),e.jsx(r,{type:"danger",title:"误区 4：滥用深度思考功能",children:e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2",children:"Reasoning API 虽然强大，但并非所有场景都需要。对于简单问答、事实查询等任务，使用标准模型更经济高效。应根据任务复杂度选择合适的模型和思考级别，避免不必要的成本和延迟。"})}),e.jsx(o,{simpleContent:e.jsx(t,{code:`# ❌ 错误：所有问题都用 o1 + high
response = client.chat.completions.create(
    model="o1-preview",
    reasoning_effort="high",  # 简单问题用 deep thinking 太浪费
    messages=[{"role": "user", "content": "1+1等于几？"}]
)`,language:"python",filename:"wrong_reasoning.py"}),hardcoreContent:e.jsx(t,{code:`# ✅ 正确：按任务复杂度选择模型和级别
def smart_chat(query: str) -> str:
    # 简单问题 → 标准 GPT-4
    if is_simple_query(query):
        return client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": query}]
        ).choices[0].message.content
    
    # 中等复杂度 → o1 + low
    if is_medium_query(query):
        return client.chat.completions.create(
            model="o1-preview",
            reasoning_effort="low",
            messages=[{"role": "user", "content": query}]
        ).choices[0].message.content
    
    # 高复杂度 → o1 + high
    return client.chat.completions.create(
        model="o1-preview",
        reasoning_effort="high",
        messages=[{"role": "user", "content": query}]
    ).choices[0].message.content`,language:"python",filename:"right_reasoning.py"})})]}),e.jsx("section",{id:"interview",className:"mb-8",children:e.jsx(j,{questions:[{question:"OpenAI SDK v1.x 和 v0.x 的主要区别是什么？",answer:"主要区别：① 客户端模式：v1.x 使用 client.chat.completions.create()，v0.x 使用 openai.ChatCompletion.create()；② 类型安全：v1.x 完全重写，提供更好的类型提示；③ 异步支持：v1.x 原生支持 AsyncClient；④ 流式 API：v1.x 改进为迭代器模式；⑤ 错误处理：v1.x 使用异常层次结构；⑥ 模块化：v1.x 按功能拆分模块。迁移时需更新导入路径和方法调用方式。"},{question:"如何实现流式响应的错误处理？",answer:'流式响应的错误处理策略：① 包装整个流式循环在 try-except 中捕获 APIError；② 检查每个 chunk 的 finish_reason 字段；③ 处理不完整响应（用户中断或错误）；④ 记录部分响应内容用于调试；⑤ 实现优雅降级（如显示"生成中断，请重试"）；⑥ 对于异步流式，使用 async with 确保资源正确释放。关键点是在流式过程中保持状态一致性。'},{question:"Function Calling 的两轮对话机制是如何工作的？",answer:'工作流程：① 第一轮：发送用户请求 + 工具定义，模型返回 tool_calls（包含工具名和参数）；② 客户端解析 tool_calls，执行实际函数获取结果；③ 第二轮：将工具调用结果以 role="tool" 的消息追加到对话历史，再次调用 API；④ 模型基于工具结果生成最终回答。关键是要维护完整的消息历史，包括 user、assistant、tool 三种角色的消息。'},{question:"如何优化 Embedding API 的性能和成本？",answer:"优化策略：① 批量处理：一次性发送多个文本（最多 2048 个），减少 API 调用次数；② 缓存：对相同文本缓存 embedding 结果；③ 降维：使用 PCA 等技术降低向量维度；④ 模型选择：text-embedding-3-small 性价比最高；⑤ 截断：过长文本先截断再嵌入；⑥ 异步并发：使用 AsyncClient 并行处理；⑦ 本地模型：高频场景考虑使用 sentence-transformers 等开源方案。"},{question:"Structured Output 相比手动解析 JSON 有什么优势？",answer:"优势：① 类型安全：IDE 自动补全和类型检查；② 自动验证：Pydantic 内置数据校验；③ 减少样板代码：无需手动 json.loads() 和字段提取；④ 错误处理清晰：ValidationError 提供详细错误信息；⑤ 嵌套结构支持：复杂对象自动解析；⑥ 默认值处理：可选字段自动填充默认值；⑦ 序列化便捷：model_dump() 一键转 JSON。缺点是依赖较新的模型版本（gpt-4o 系列）。"},{question:"Reasoning API 的优缺点是什么？如何选择合适的思考级别？",answer:"优点：① 显著提升复杂问题的准确率；② 展示推理过程，便于调试和验证；③ 适合数学、编程、科学等需要多步推理的任务。缺点：① 响应时间长（high 级别可能需要数十秒）；② Token 消耗大幅增加（思考过程也计费）；③ 成本高昂（o1 模型价格是 gpt-4 的数倍）；④ 不适合实时交互场景。选择策略：简单任务用 standard 模型 + low effort；中等复杂度用 medium；只有真正复杂的推理任务才用 high。建议先从小规模测试开始，评估性价比后再大规模应用。"},{question:"如何在生产环境中管理长对话的上下文长度？",answer:'策略包括：① 滑动窗口：只保留最近 N 轮对话；② 摘要压缩：定期用 LLM 总结早期对话内容；③ 重要性筛选：保留关键信息，删除冗余内容；④ 分层存储：近期对话存内存，远期对话存数据库；⑤ Token 监控：实时统计 token 使用量，接近限制时触发压缩；⑥ 用户主动清理：提供"清空对话"功能。实际应用中常组合使用多种策略，平衡上下文完整性和成本。'}]})}),e.jsxs("section",{className:"mb-8",children:[e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"知识关联"}),e.jsx(i,{title:"知识图谱",children:`graph TD
    SDK["OpenAI SDK"] --> FC["Function Calling"]
    SDK --> Emb["Embedding"]
    SDK --> SO["Structured Output"]
    SDK --> Reason["Reasoning API"]
    
    FC --> Agent["AI Agent"]
    FC --> LangChain["LangChain"]
    
    Emb --> RAG["RAG 检索增强"]
    Emb --> VecDB["向量数据库"]
    
    SO --> Pydantic["Pydantic"]
    SO --> DataExt["数据提取"]
    
    Reason --> Math["数学推理"]
    Reason --> CodeDebug["代码调试"]
    
    LangChain --> Agent
    RAG --> VecDB

    style SDK fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style FC fill:#e8f4f8,stroke:#0ea5e9
    style Emb fill:#e8f4f8,stroke:#0ea5e9
    style SO fill:#e8f4f8,stroke:#0ea5e9
    style Reason fill:#e8f4f8,stroke:#0ea5e9`}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5",children:[e.jsxs("div",{className:"group p-5 bg-parchment-soft rounded-paper-md border border-border hover:border-accent/40 hover:shadow-[0_0_12px_rgba(181,101,29,0.1)] transition-all duration-200 cursor-pointer",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx("span",{className:"text-[11px] px-2 py-0.5 bg-sky-soft text-sky rounded-[3px] font-semibold",children:"前置知识"}),e.jsx("h4",{className:"font-semibold text-ink",children:"← Function Calling"})]}),e.jsx("p",{className:"text-[13px] text-ink-muted leading-[1.7]",children:"深入了解 Function Calling 的原理、tool_choice 策略和多工具并行调用的实现"}),e.jsx("div",{className:"mt-3 flex flex-wrap gap-1.5",children:["tool_calls","tool_choice","并行调用"].map(n=>e.jsx("span",{className:"px-2 py-0.5 bg-parchment-deep text-ink-muted rounded-full text-[11px]",children:n},n))})]}),e.jsxs("div",{className:"group p-5 bg-parchment-soft rounded-paper-md border border-border hover:border-accent/40 hover:shadow-[0_0_12px_rgba(181,101,29,0.1)] transition-all duration-200 cursor-pointer",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx("span",{className:"text-[11px] px-2 py-0.5 bg-teal-soft text-teal rounded-[3px] font-semibold",children:"进阶方向"}),e.jsx("h4",{className:"font-semibold text-ink",children:"→ LangChain / LlamaIndex"})]}),e.jsx("p",{className:"text-[13px] text-ink-muted leading-[1.7]",children:"学习高级框架如何封装 OpenAI SDK，实现 Agent、RAG、链式调用等复杂场景"}),e.jsx("div",{className:"mt-3 flex flex-wrap gap-1.5",children:["Agent","RAG","Chain","Memory"].map(n=>e.jsx("span",{className:"px-2 py-0.5 bg-parchment-deep text-ink-muted rounded-full text-[11px]",children:n},n))})]}),e.jsxs("div",{className:"group p-5 bg-parchment-soft rounded-paper-md border border-border hover:border-accent/40 hover:shadow-[0_0_12px_rgba(181,101,29,0.1)] transition-all duration-200 cursor-pointer",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx("span",{className:"text-[11px] px-2 py-0.5 bg-indigo-soft text-indigo rounded-[3px] font-semibold",children:"延伸阅读"}),e.jsx("h4",{className:"font-semibold text-ink",children:"→ 向量数据库"})]}),e.jsx("p",{className:"text-[13px] text-ink-muted leading-[1.7]",children:"Embedding 结果的存储和检索，Pinecone / Milvus / Weaviate 等向量数据库对比"}),e.jsx("div",{className:"mt-3 flex flex-wrap gap-1.5",children:["Pinecone","Milvus","相似度搜索"].map(n=>e.jsx("span",{className:"px-2 py-0.5 bg-parchment-deep text-ink-muted rounded-full text-[11px]",children:n},n))})]}),e.jsxs("div",{className:"group p-5 bg-parchment-soft rounded-paper-md border border-border hover:border-accent/40 hover:shadow-[0_0_12px_rgba(181,101,29,0.1)] transition-all duration-200 cursor-pointer",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx("span",{className:"text-[11px] px-2 py-0.5 bg-rose-soft text-rose rounded-[3px] font-semibold",children:"实战应用"}),e.jsx("h4",{className:"font-semibold text-ink",children:"→ Pydantic 数据校验"})]}),e.jsx("p",{className:"text-[13px] text-ink-muted leading-[1.7]",children:"Pydantic 的核心机制、嵌套模型、自定义验证器，是 Structured Output 的基础"}),e.jsx("div",{className:"mt-3 flex flex-wrap gap-1.5",children:["BaseModel","Field","Validator"].map(n=>e.jsx("span",{className:"px-2 py-0.5 bg-parchment-deep text-ink-muted rounded-full text-[11px]",children:n},n))})]})]})]}),e.jsx(f,{...x(a.category,a.id)})]})}),e.jsx(u,{items:y})]})}export{S as default};
