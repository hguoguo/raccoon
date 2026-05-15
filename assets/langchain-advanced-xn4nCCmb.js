import{j as e,g as o}from"./index-hyqxTCwJ.js";import{K as l}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as r}from"./SideNote-BKvanovA.js";import{C as n,A as i,S as s}from"./ArticleNav-DhfiS38Y.js";import{D as m}from"./DiagramBlock-CLaKE9_7.js";import{I as d}from"./InterviewSection-BBNdwyyN.js";const p=[{id:"definition",text:"一句话定义",level:2},{id:"lcel",text:"一、LCEL 表达式语言",level:2},{id:"debug-intermediate",text:"中间结果调试",level:3},{id:"runnable-parallel",text:"二、RunnableParallel",level:2},{id:"rag-parallel",text:"RAG 中的并行检索",level:3},{id:"runnable-lambda",text:"三、RunnableLambda",level:2},{id:"runnable-branch",text:"四、RunnableBranch",level:2},{id:"conditional-routing",text:"条件路由示例",level:3},{id:"dynamic-prompt",text:"五、动态 Prompt",level:2},{id:"fewshot-dynamic",text:"Few-shot 动态选择",level:3},{id:"tool-binding",text:"六、Tool Binding",level:2},{id:"tool-execution",text:"工具执行流程",level:3},{id:"misconceptions",text:"七、常见误区",level:2},{id:"interview",text:"八、面试真题",level:2},{id:"related",text:"九、知识关联",level:2}];function _({meta:a}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(l,{meta:a,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["LangChain 进阶技巧涵盖",e.jsx("strong",{className:"text-accent",children:"LCEL 表达式语言"}),"、高级 Runnable 组合模式、动态 Prompt 生成和 Tool 绑定策略， 帮助开发者构建更灵活、高效、可维护的 LLM 应用架构。"]})}),e.jsxs(n,{type:"tip",title:"学习前提",children:["本文假设你已掌握 LangChain 基础（PromptTemplate、ChatModel、Runnable 接口）。如未阅读，建议先学习",e.jsx("a",{href:"/docs/07-langchain-framework/langchain-basics",className:"text-accent hover:underline",children:"LangChain 基础核心"}),"。"]}),e.jsx("h2",{id:"lcel",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、LCEL 表达式语言"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"LCEL (LangChain Expression Language)"})," 是 LangChain 0.1+ 引入的声明式语法，通过管道操作符 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"|"})," 组合组件，替代传统的 Chain API。"]}),e.jsx(m,{title:"LCEL vs 传统 Chain",children:`graph LR
              subgraph 传统ChainAPI已废弃
                direction TB
                OLD["LLMChain(llm=model, prompt=template, output_parser=parser)"]
                OLDRUN["chain.run(question)"]
                OLD --> OLDRUN
              end
              subgraph LCEL表达式语言推荐
                direction TB
                NEW["template | model | parser"]
                NEWRUN["chain.invoke(question)"]
                NEW --> NEWRUN
              end
            `}),e.jsx(t,{code:`from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 传统方式（不推荐）
from langchain.chains import LLMChain
old_chain = LLMChain(llm=model, prompt=prompt)
result = old_chain.run({"question": "什么是 Python?"})

# LCEL 方式（推荐）
model = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个{role}助手"),
    ("human", "{question}")
])
parser = StrOutputParser()

# 使用管道操作符组合
chain = prompt | model | parser
result = chain.invoke({"role": "技术", "question": "解释装饰器"})

# 优势：
# 1. 代码更简洁直观
# 2. 自动支持 streaming/batching
# 3. 易于调试和中间结果观察`,language:"python",highlights:[18,19],filename:"lcel_basic.py",description:"LCEL 基础语法对比"}),e.jsx(n,{type:"info",title:"LCEL 的核心优势",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"声明式"}),'：关注"做什么"而非"怎么做"，代码更易读']}),e.jsxs("li",{children:[e.jsx("strong",{children:"流式支持"}),"：所有 LCEL 链自动支持 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:".stream()"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"异步友好"}),"：天然支持 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:".ainvoke()"})," 和 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:".astream()"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"类型安全"}),"：更好的 IDE 提示和静态检查支持"]})]})}),e.jsx("h3",{id:"debug-intermediate",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"中间结果调试"}),e.jsx(t,{code:`from langchain_core.runnables import RunnablePassthrough

# 在链中插入调试节点
debug_chain = (
    {"question": RunnablePassthrough()}  # 透传输入
    | (lambda x: print(f"Input: {x}") or x)  # 打印中间结果
    | prompt
    | (lambda x: print(f"Prompt: {x}") or x)
    | model
    | (lambda x: print(f"Raw output: {x.content[:50]}...") or x)
    | parser
)

result = debug_chain.invoke({"question": "什么是闭包？"})`,language:"python",highlights:[5,6,8,10],filename:"lcel_debug.py",description:"LCEL 中间结果调试"}),e.jsxs(r,{label:"调试技巧",children:["生产环境建议使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"logging"})," 模块替代 print，并通过环境变量控制日志级别。"]}),e.jsx("h2",{id:"runnable-parallel",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、RunnableParallel"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"RunnableParallel"})," 并行执行多个独立分支，显著降低延迟，适用于需要同时调用多个模型或工具的场景。"]}),e.jsx(t,{code:`from langchain_core.runnables import RunnableParallel, RunnablePassthrough
from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="gpt-4o-mini")

# 场景：同时生成摘要、关键词和情感分析
parallel_chain = RunnableParallel({
    "summary": (
        ChatPromptTemplate.from_template("总结以下内容：\\n{text}")
        | model
    ),
    "keywords": (
        ChatPromptTemplate.from_template("提取关键词（逗号分隔）：\\n{text}")
        | model
    ),
    "sentiment": (
        ChatPromptTemplate.from_template("分析情感倾向（正面/负面/中性）：\\n{text}")
        | model
    ),
    "original": RunnablePassthrough()  # 保留原文
})

result = parallel_chain.invoke({
    "text": "Python 是一门优雅且强大的编程语言..."
})

print(result["summary"].content)
print(result["keywords"].content)
print(result["sentiment"].content)

# 性能对比：
# 串行执行：3次 API 调用，总耗时 = t1 + t2 + t3 ≈ 3秒
# 并行执行：3次 API 并发，总耗时 = max(t1, t2, t3) ≈ 1秒`,language:"python",highlights:[7,22],filename:"runnable_parallel.py",description:"RunnableParallel 并行执行"}),e.jsxs(n,{type:"warning",title:"并发限制",children:["虽然 RunnableParallel 会并发执行，但需注意 API 提供商的速率限制（Rate Limit）。可使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"AsyncioSemaphore"})," 控制并发数，或配置重试策略。"]}),e.jsx("h3",{id:"rag-parallel",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"RAG 中的并行检索"}),e.jsx(t,{code:`# RAG 场景：从多个数据源并行检索
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

# 假设有多个向量库
vectorstore_docs = FAISS.load_local("docs_index")
vectorstore_code = FAISS.load_local("code_index")
vectorstore_api = FAISS.load_local("api_index")

rag_chain = RunnableParallel({
    "docs_context": vectorstore_docs.as_retriever(),
    "code_context": vectorstore_code.as_retriever(),
    "api_context": vectorstore_api.as_retriever(),
    "question": RunnablePassthrough()
}) | (
    lambda x: {
        "context": f"文档:\\n{x['docs_context']}\\n\\n代码:\\n{x['code_context']}\\n\\nAPI:\\n{x['api_context']}",
        "question": x["question"]
    }
) | prompt | model | parser

answer = rag_chain.invoke({"question": "如何使用 FastAPI 上传文件？"})`,language:"python",highlights:[12,18],filename:"rag_parallel.py",description:"RAG 并行检索增强"}),e.jsx("h2",{id:"runnable-lambda",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、RunnableLambda"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"RunnableLambda"})," 将普通 Python 函数包装为 Runnable，使其能无缝接入 LCEL 链，用于数据转换、条件判断、自定义逻辑等。"]}),e.jsx(t,{code:`from langchain_core.runnables import RunnableLambda

# 简单转换
uppercase = RunnableLambda(lambda x: x.upper())
result = uppercase.invoke("hello")  # HELLO

# 复杂逻辑封装
def format_for_llm(data: dict) -> str:
    """将结构化数据格式化为自然语言"""
    return f"姓名：{data['name']}，年龄：{data['age']}，职业：{data['job']}"

formatter = RunnableLambda(format_for_llm)

# 在链中使用
chain = (
    {"raw_data": RunnablePassthrough()}
    | RunnableLambda(lambda x: format_for_llm(x["raw_data"]))
    | prompt
    | model
)

# 异步支持
async def async_transform(x: str) -> str:
    import asyncio
    await asyncio.sleep(0.1)  # 模拟异步操作
    return x.strip()

async_chain = RunnableLambda(async_transform)`,language:"python",highlights:[4,8,16,24],filename:"runnable_lambda.py",description:"RunnableLambda 用法"}),e.jsx(n,{type:"tip",title:"最佳实践",children:"RunnableLambda 适合轻量级转换逻辑。如果函数复杂度较高，建议定义为独立函数后再包装，便于单元测试和维护。"}),e.jsx("h3",{id:"conditional-routing",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"条件路由示例"}),e.jsx(t,{code:`from langchain_core.runnables import RunnableLambda

def route_by_language(x: dict) -> dict:
    """根据问题语言选择不同 Prompt"""
    question = x["question"]
    
    # 简单判断：包含中文字符
    if any('\\u4e00' <= char <= '\\u9fff' for char in question):
        x["language"] = "chinese"
    else:
        x["language"] = "english"
    
    return x

router = RunnableLambda(route_by_language)

chain = (
    router
    | (lambda x: chinese_prompt if x["language"] == "chinese" else english_prompt)
    | model
    | parser
)

result = chain.invoke({"question": "什么是 Python？"})`,language:"python",highlights:[3,18,19],filename:"conditional_routing.py",description:"基于 RunnableLambda 的条件路由"}),e.jsx("h2",{id:"runnable-branch",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、RunnableBranch"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"RunnableBranch"})," 提供多分支条件选择，类似 switch-case 语句，根据输入动态选择不同的执行路径。"]}),e.jsx(t,{code:`from langchain_core.runnables import RunnableBranch, RunnableLambda
from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="gpt-4o-mini")

# 定义不同领域的专家 Prompt
math_prompt = ChatPromptTemplate.from_template("作为数学专家，解答：{question}")
coding_prompt = ChatPromptTemplate.from_template("作为编程专家，解答：{question}")
general_prompt = ChatPromptTemplate.from_template("作为通用助手，解答：{question}")

# 分类函数
def classify_question(x: dict) -> str:
    question = x["question"].lower()
    if any(word in question for word in ["计算", "公式", "方程"]):
        return "math"
    elif any(word in question for word in ["代码", "函数", "算法"]):
        return "coding"
    else:
        return "general"

# 分支路由
branch = RunnableBranch(
    (lambda x: classify_question(x) == "math", math_prompt | model),
    (lambda x: classify_question(x) == "coding", coding_prompt | model),
    general_prompt | model  # 默认分支
)

chain = branch | StrOutputParser()

# 测试
print(chain.invoke({"question": "计算 x^2 + 2x + 1 = 0 的根"}))
print(chain.invoke({"question": "如何用 Python 实现快速排序？"}))
print(chain.invoke({"question": "今天天气怎么样？"}))`,language:"python",highlights:[22,23,24,25],filename:"runnable_branch.py",description:"RunnableBranch 多分支路由"}),e.jsx(n,{type:"danger",title:"注意事项",children:"RunnableBranch 按顺序评估条件，第一个匹配的条件会被执行。确保条件的优先级正确，并提供默认分支处理未匹配的情况。"}),e.jsx("h2",{id:"dynamic-prompt",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、动态 Prompt"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"动态 Prompt 根据上下文、用户画像或历史交互实时调整 Prompt 内容，提升个性化和准确性。"}),e.jsx(t,{code:`from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import SystemMessage, HumanMessage

# 场景 1：根据用户水平调整解释深度
def get_expertise_level(user_id: str) -> str:
    # 从数据库查询用户水平
    return "beginner"  # 或 "intermediate", "advanced"

def build_dynamic_prompt(user_id: str, question: str):
    level = get_expertise_level(user_id)
    
    level_instructions = {
        "beginner": "用通俗易懂的语言解释，避免专业术语",
        "intermediate": "适当使用专业术语，提供代码示例",
        "advanced": "深入底层原理，讨论性能优化和最佳实践"
    }
    
    prompt = ChatPromptTemplate.from_messages([
        SystemMessage(content=f"你是一个技术专家。{level_instructions[level]}"),
        HumanMessage(content=question)
    ])
    
    return prompt

# 场景 2：注入检索到的上下文
from langchain_core.documents import Document

def build_rag_prompt(question: str, contexts: list[Document]):
    context_text = "\\n".join([doc.page_content for doc in contexts])
    
    prompt = ChatPromptTemplate.from_messages([
        SystemMessage(content="基于以下上下文回答问题，如果上下文中没有相关信息，请明确说明"),
        HumanMessage(content=f"上下文：\\n{context_text}\\n\\n问题：{question}")
    ])
    
    return prompt`,language:"python",highlights:[9,27],filename:"dynamic_prompt.py",description:"动态 Prompt 构建策略"}),e.jsx(r,{label:"个性化推荐",children:"结合用户行为数据（点击、停留时间、反馈评分），使用机器学习模型预测用户偏好，动态调整 Prompt 的语气、长度和内容结构。"}),e.jsx("h3",{id:"fewshot-dynamic",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Few-shot 动态选择"}),e.jsx(t,{code:`from langchain.prompts import FewShotPromptTemplate, PromptTemplate
from langchain_core.example_selectors import SemanticSimilarityExampleSelector
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

# 大量示例库
examples = [
    {"input": "高兴", "output": "😄"},
    {"input": "悲伤", "output": "😢"},
    {"input": "惊讶", "output": "😲"},
    # ... 数百个示例
]

# 基于语义相似度动态选择最相关的 3 个示例
example_selector = SemanticSimilarityExampleSelector.from_examples(
    examples=examples,
    embeddings=OpenAIEmbeddings(),
    vectorstore_cls=FAISS,
    k=3  # 每次选择 3 个最相关示例
)

# 动态 Few-shot Prompt
dynamic_few_shot = FewShotPromptTemplate(
    example_selector=example_selector,
    example_prompt=PromptTemplate(
        input_variables=["input", "output"],
        template="情绪: {input}\\n表情: {output}"
    ),
    prefix="将情绪转换为表情：",
    suffix="情绪: {input}\\n表情:",
    input_variables=["input"]
)

# 根据输入动态选择示例
print(dynamic_few_shot.format(input="兴奋"))
# 会自动选择与"兴奋"语义最接近的示例（如"高兴"、"激动"等）`,language:"python",highlights:[15,23],filename:"dynamic_fewshot.py",description:"基于相似度的动态 Few-shot"}),e.jsx("h2",{id:"tool-binding",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、Tool Binding"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Tool Binding 将工具绑定到 LLM，使模型能够主动调用外部功能。LangChain 支持多种绑定方式，包括 Function Calling 和 ReAct 模式。"}),e.jsx(t,{code:`from langchain_openai import ChatOpenAI
from langchain.tools import tool

# 定义工具
@tool
def get_weather(city: str) -> str:
    """查询城市天气"""
    return f"{city} 今天晴天，25°C"

@tool
def search_news(keyword: str) -> str:
    """搜索新闻"""
    return f"关于 {keyword} 的最新新闻..."

# 方式 1：bind_tools（推荐，支持 Function Calling）
model = ChatOpenAI(model="gpt-4o-mini")
model_with_tools = model.bind_tools([get_weather, search_news])

# 方式 2：手动指定 tools 参数
response = model_with_tools.invoke([
    ("human", "北京天气怎么样？")
])

# 检查是否调用了工具
if response.tool_calls:
    for tool_call in response.tool_calls:
        print(f"调用工具: {tool_call['name']}")
        print(f"参数: {tool_call['args']}")
        
        # 执行工具
        if tool_call['name'] == 'get_weather':
            result = get_weather.invoke(tool_call['args'])
            print(f"结果: {result}")`,language:"python",highlights:[16,17,25],filename:"tool_binding.py",description:"Tool Binding 方式"}),e.jsx(n,{type:"info",title:"Function Calling vs ReAct",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Function Calling"}),"：LLM 直接输出 JSON 格式的工具调用，由框架执行（更高效，需模型支持）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ReAct"}),"：LLM 生成 Thought-Action-Observation 循环，自主推理和调用工具（更灵活，适用于复杂任务）"]})]})}),e.jsx("h3",{id:"tool-execution",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"工具执行流程"}),e.jsx(t,{code:`from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain.prompts import ChatPromptTemplate

# 完整 Agent 流程
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个有用的助手，可以使用工具获取信息"),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),  # 存储工具调用历史
])

agent = create_tool_calling_agent(model, [get_weather, search_news], prompt)
agent_executor = AgentExecutor(agent=agent, tools=[get_weather, search_news], verbose=True)

# 执行
result = agent_executor.invoke({
    "input": "北京天气如何？有什么相关新闻？"
})

print(result["output"])
# 输出：
# > Entering new AgentExecutor chain...
# Invoking: get_weather with {'city': '北京'}
# 北京 今天晴天，25°C
# Invoking: search_news with {'keyword': '北京'}
# 关于 北京 的最新新闻...
# 北京今天晴天，气温25°C。最新新闻包括...`,language:"python",highlights:[11,12,15],filename:"agent_execution.py",description:"Agent 工具执行流程"}),e.jsxs(r,{label:"工具描述优化",children:["工具的 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"description"})," 直接影响 LLM 的调用准确率。应清晰说明使用场景、参数含义和返回值格式，必要时提供示例。"]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、常见误区"}),e.jsxs(n,{type:"danger",title:"误区 1：LCEL 只是语法糖",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 LCEL 与传统 Chain 功能相同，只是写法不同。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：LCEL 不仅简化语法，还提供了自动流式支持、异步执行、批量处理和更好的类型推断。传统 Chain API 已被标记为 deprecated，新项目应全面采用 LCEL。"]})]}),e.jsxs(n,{type:"danger",title:"误区 2：RunnableParallel 总是更快",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为所有场景都应使用并行执行。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：RunnableParallel 仅在分支间无依赖关系时有效。如果后续步骤需要前一步的结果，强行并行反而会增加复杂度。此外，API 速率限制可能抵消并发优势。"]})]}),e.jsxs(n,{type:"danger",title:"误区 3：动态 Prompt 越复杂越好",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为添加越多动态逻辑，效果越好。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),'：过度复杂的动态 Prompt 会导致难以调试和维护。应遵循"最小必要原则"，只在关键节点（如用户水平、领域分类）做动态调整，并保持 Prompt 模板的可读性。']})]}),e.jsxs(n,{type:"warning",title:"误区 4：Tool Binding 后无需验证",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 LLM 会正确使用绑定的工具。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：LLM 可能错误调用工具（参数错误、时机不当）。必须在工具执行层做参数校验、异常处理和降级策略，不能完全信任模型的判断。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、面试真题"}),e.jsx(d,{questions:[{question:"LCEL 相比传统 Chain API 有哪些优势？",answer:"① 声明式语法更简洁直观；② 自动支持 streaming/batching/async；③ 更好的类型安全和 IDE 提示；④ 易于组合和复用；⑤ 社区标准，长期维护保障。传统 Chain API 已在 LangChain 0.1+ 中被标记为 deprecated。"},{question:"RunnableParallel 和 RunnableSequence 的区别是什么？",answer:"RunnableParallel 并行执行多个独立分支，返回字典形式的结果；RunnableSequence 串行执行，前一步的输出作为下一步的输入。Parallel 适合无依赖的多任务（如同时生成摘要和关键词），Sequence 适合有先后顺序的处理流程（如 prompt → model → parser）。"},{question:"如何实现动态 Few-shot 示例选择？",answer:"使用 SemanticSimilarityExampleSelector，基于 Embedding 计算输入与示例的语义相似度，动态选择最相关的 k 个示例注入 Prompt。这比固定示例更能适应多样化场景，提升模型理解能力。"},{question:"RunnableBranch 的执行逻辑是什么？",answer:"RunnableBranch 按顺序评估每个分支的条件函数，第一个返回 True 的分支会被执行。如果所有条件都不满足，则执行最后一个默认分支。注意条件是短路评估的，一旦匹配即停止后续判断。"},{question:"Tool Binding 中 Function Calling 和 ReAct 如何选择？",answer:"Function Calling 适合简单工具调用场景，效率高但需要模型原生支持（如 GPT-4、Claude）；ReAct 适合复杂推理任务，模型可以多次迭代思考和调用工具，灵活性更高但延迟较大。生产环境通常优先使用 Function Calling，失败时降级到 ReAct。"},{question:"如何优化 LCEL 链的性能？",answer:"① 使用 RunnableParallel 并发无依赖任务；② 启用 streaming 减少首字延迟；③ 缓存频繁调用的 Embedding 或 LLM 结果；④ 精简 Prompt 长度；⑤ 选择合适模型（gpt-4o-mini vs gpt-4）；⑥ 异步调用避免阻塞主线程。"},{question:"动态 Prompt 的最佳实践有哪些？",answer:"① 保持模板可读性，避免过度嵌套；② 使用配置文件管理 Prompt 变体；③ 对动态逻辑做单元测试；④ 记录每次生成的 Prompt 便于调试；⑤ A/B 测试不同 Prompt 策略的效果；⑥ 设置 fallback 机制应对异常情况。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/07-langchain-framework/langchain-basics",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"LangChain 基础"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"PromptTemplate、ChatModel、Runnable"})]}),e.jsxs("a",{href:"/docs/07-langchain-framework/langgraph-core",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-accent mb-1",children:"核心框架 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-accent",children:"LangGraph 核心"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"StateGraph、工作流编排"})]}),e.jsxs("a",{href:"/docs/07-langchain-framework/agent-patterns",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"应用场景 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"Agent 模式"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"ReAct、Planner、Router Agent"})]}),e.jsxs("a",{href:"/docs/07-langchain-framework/workflow-design",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"高级主题 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"Workflow 设计"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"DAG、容错、持久化"})]})]}),e.jsxs(n,{type:"info",title:"下一步学习",children:["掌握进阶技巧后，建议深入学习 ",e.jsx("strong",{children:"LangGraph"}),"，它提供了更强大的状态管理和工作流编排能力，是构建复杂 Agent 系统的首选框架。"]}),e.jsx(i,{...o(a.category,a.id)})]})}),e.jsx(s,{items:p})]})}export{_ as default};
