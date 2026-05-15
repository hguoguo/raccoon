import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as i}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as m}from"./SideNote-BKvanovA.js";import{C as t,A as a,S as d}from"./ArticleNav-DhfiS38Y.js";import{D as o}from"./DiagramBlock-CLaKE9_7.js";import{I as l}from"./InterviewSection-BBNdwyyN.js";const x=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"core",text:"核心原理",level:2},{id:"workflow",text:"工作流程",level:2},{id:"implementation",text:"实现示例",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比分析",level:2},{id:"related",text:"知识关联",level:2}];function f({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(i,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["记忆管理（Memory Management）是 Agent 系统中",e.jsx("strong",{className:"text-accent",children:"存储、检索和更新历史信息"}),"的机制，使 AI 能够记住对话上下文、用户偏好和过往经验，实现连续、个性化的交互体验。"]})}),e.jsx(t,{type:"tip",title:"为什么需要记忆管理？",children:'LLM 本身是无状态的，每次调用都是独立的。记忆系统让 Agent 具备"记忆力"，能够理解上下文、保持对话连贯性、学习用户偏好，是实现智能助手的关键组件。'}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"整体架构"}),e.jsx(o,{title:"记忆系统分层架构",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌─────────────────────────────────────┐
│       应用层记忆                      │
│  (用户画像、长期偏好、历史记录)        │
└──────────────┬──────────────────────┘
               │
┌──────────────┴──────────────────────┐
│       会话层记忆                      │
│  (对话历史、当前任务状态)              │
└──────────────┬──────────────────────┘
               │
┌──────────────┴──────────────────────┐
│       工作记忆                        │
│  (短期缓存、中间变量、临时数据)        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│       存储层                          │
│  (Vector DB / Redis / SQL)          │
└─────────────────────────────────────┘
            `})}),e.jsxs(m,{label:"人类记忆类比",children:["Agent 记忆系统设计借鉴了人类记忆模型：",e.jsx("strong",{children:"工作记忆"}),"类似短期记忆，容量小但访问快；",e.jsx("strong",{children:"会话记忆"}),"类似情景记忆，记录特定场景的经历；",e.jsx("strong",{children:"长期记忆"}),"类似语义记忆，存储持久化的知识和事实。"]}),e.jsx("h2",{id:"core",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"核心原理"}),e.jsx("h3",{id:"short-term-memory",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1. 短期记忆（Short-term Memory）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"短期记忆通常指当前会话的对话历史，保存在内存中，会话结束后消失。"}),e.jsx(r,{code:`from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain_openai import ChatOpenAI

# 1. 创建短期记忆
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# 2. 创建对话链
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True
)

# 3. 多轮对话
response1 = conversation.predict(input="我叫小明，今年25岁")
print(response1)
# AI: 你好小明！很高兴认识你。

response2 = conversation.predict(input="我刚才说了我叫什么？")
print(response2)
# AI: 你刚才说你叫小明。

# 4. 查看记忆内容
print(memory.chat_memory.messages)
# 包含完整的对话历史`,language:"python",highlights:[5,11,18,22,26,31],filename:"short_term_memory.py",description:"基于缓冲区的短期记忆实现"}),e.jsx("h3",{id:"long-term-memory",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2. 长期记忆（Long-term Memory）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"长期记忆持久化存储在数据库中，跨会话保留，支持语义检索。"}),e.jsx(r,{code:`from langchain.memory import VectorStoreRetrieverMemory
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

# 1. 创建向量存储作为长期记忆
embeddings = OpenAIEmbeddings()
vectorstore = Chroma(embedding_function=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
memory = VectorStoreRetrieverMemory(retriever=retriever)

# 2. 保存信息到长期记忆
memory.save_context(
    {"input": "用户喜欢 Python 编程"},
    {"output": "已记录用户偏好"}
)

memory.save_context(
    {"input": "用户在使用 Macbook Pro"},
    {"output": "已记录设备信息"}
)

# 3. 检索相关记忆
relevant = memory.load_memory_variables(
    {"prompt": "用户用什么编程语言？"}
)
print(relevant)
# 返回: {'history': '用户喜欢 Python 编程'}

# 4. 在对话中使用
context = relevant['history']
prompt = f"""基于以下记忆回答问题：
记忆: {context}
问题: 用户擅长什么编程语言？"""`,language:"python",highlights:[7,12,19,26,31,36],filename:"long_term_memory.py",description:"基于向量数据库的长期记忆"}),e.jsx("h3",{id:"conversation-summary",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3. 对话摘要记忆"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"对于长对话，保存完整历史会超出上下文窗口，需要生成摘要压缩信息。"}),e.jsx(r,{code:`from langchain.memory import ConversationSummaryMemory
from langchain_openai import ChatOpenAI

# 创建摘要记忆
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
memory = ConversationSummaryMemory.from_llm(
    llm=llm,
    memory_key="chat_history"
)

# 添加对话
memory.save_context(
    {"input": "我想学习 Python"},
    {"output": "很好的选择！Python 易学且功能强大。"}
)

memory.save_context(
    {"input": "应该从哪里开始？"},
    {"output": "建议从基础语法开始，然后学习常用库。"}
)

# 获取摘要（而非完整历史）
summary = memory.load_memory_variables({})
print(summary)
# 输出: 
# {'chat_history': '用户想学习 Python，AI 建议从基础语法开始学习。'}

# 优势：无论对话多长，摘要始终保持简洁
# 适合：长周期对话、上下文窗口有限的场景`,language:"python",highlights:[6,12,18,24,28],filename:"summary_memory.py",description:"对话摘要记忆，压缩历史信息"}),e.jsx("h2",{id:"workflow",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"工作流程"}),e.jsx(o,{title:"记忆管理流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
用户输入: "我还记得我之前说过我喜欢什么吗？"
         │
         ▼
┌──────────────────┐
│ 读取短期记忆      │ ← 从内存获取最近对话
│ (Conversation    │
│  Buffer)         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 检索长期记忆      │ ← 向量相似度搜索
│ (Vector Store)   │
│ 查询: "用户喜好"  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 合并记忆上下文    │ ← 短期 + 长期记忆
│                  │
│ 短期: 最近3轮对话 │
│ 长期: 用户喜欢    │
│       Python     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ LLM 生成响应      │
│ "是的，你说过你   │
│  喜欢 Python"     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 更新记忆          │ ← 保存新对话到记忆
└──────────────────┘
            `})}),e.jsx("h2",{id:"implementation",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"实现示例"}),e.jsx(r,{code:`from langchain.memory import (
    ConversationBufferWindowMemory,
    ConversationTokenBufferMemory,
    CombinedMemory
)
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain

# 方案 1: 窗口记忆（只保留最近 N 轮）
window_memory = ConversationBufferWindowMemory(
    k=5,  # 保留最近 5 轮对话
    memory_key="chat_history",
    return_messages=True
)

# 方案 2: Token 限制记忆（控制 Token 数量）
token_memory = ConversationTokenBufferMemory(
    llm=ChatOpenAI(),
    max_token_limit=1000,  # 最多 1000 tokens
    memory_key="chat_history"
)

# 方案 3: 组合记忆（短期 + 长期）
buffer_memory = ConversationBufferMemory(
    memory_key="recent_chat",
    return_messages=True
)

vector_retriever = Chroma(...).as_retriever()
vector_memory = VectorStoreRetrieverMemory(
    retriever=vector_retriever,
    memory_key="long_term_chat"
)

combined = CombinedMemory(
    memories=[buffer_memory, vector_memory]
)

# 使用组合记忆
conversation = ConversationChain(
    llm=ChatOpenAI(),
    memory=combined
)`,language:"python",highlights:[10,17,25,32,38,44],filename:"memory_strategies.py",description:"多种记忆策略的实现"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"常见误区"}),e.jsx(t,{type:"danger",title:"误区 1：记忆越多越好",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted",children:[e.jsx("strong",{children:"错误认知"}),"：保存所有对话历史能提供更好的服务。",e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：过多记忆增加上下文长度，导致延迟增加、成本上升，还可能引入噪声。应",e.jsx("strong",{children:"选择性记忆"}),"，只保存有价值的信息，并定期清理过期数据。"]})}),e.jsx(t,{type:"danger",title:"误区 2：不需要记忆清理机制",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted",children:[e.jsx("strong",{children:"错误认知"}),"：记忆可以无限累积。",e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：必须实现记忆淘汰策略：",e.jsx("strong",{children:"TTL（生存时间）"}),"自动删除过期记忆；",e.jsx("strong",{children:"重要性评分"}),"优先保留高价值记忆；",e.jsx("strong",{children:"容量限制"}),"超过阈值时删除最旧的记忆。否则会导致存储膨胀和检索效率下降。"]})}),e.jsx(t,{type:"danger",title:"误区 3：忽略隐私和安全",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted",children:[e.jsx("strong",{children:"错误认知"}),"：可以随意存储用户数据。",e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：记忆系统必须符合隐私法规（GDPR、个人信息保护法）。需要：",e.jsx("strong",{children:"① 用户同意"}),"明确告知数据收集；",e.jsx("strong",{children:"② 数据加密"}),"敏感信息加密存储；",e.jsx("strong",{children:"③ 删除权"}),"允许用户删除记忆；",e.jsx("strong",{children:"④ 脱敏处理"}),"去除个人身份信息。"]})}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"面试真题"}),e.jsx(l,{questions:[{question:"如何设计一个高效的记忆检索系统？",answer:"关键设计：<strong>① 分层索引</strong>：短期记忆用哈希表 O(1) 查找，长期记忆用向量索引近似搜索；<strong>② 元数据过滤</strong>：先按时间、类型等元数据预过滤，再向量检索；<strong>③ 缓存热点</strong>：频繁访问的记忆缓存在 Redis；<strong>④ 批量检索</strong>：一次查询同时检索多个记忆类型；<strong>⑤ 异步加载</strong>：非关键记忆异步加载不阻塞响应。"},{question:"如何处理记忆冲突（如用户改变了偏好）？",answer:"冲突解决策略：<strong>① 时间戳优先</strong>：最新的记忆覆盖旧的；<strong>② 置信度评分</strong>：根据来源可靠性加权；<strong>③ 显式更新</strong>：用户明确表示改变时强制更新；<strong>④ 版本管理</strong>：保留历史版本可追溯；<strong>⑤ 主动确认</strong>：检测到冲突时询问用户哪个正确。关键是建立记忆的时效性和可信度机制。"},{question:"记忆系统的性能优化有哪些方法？",answer:"优化手段：<strong>① 向量化预处理</strong>：提前计算 embedding 避免实时计算；<strong>② 索引优化</strong>：使用 HNSW 等高效索引结构；<strong>③ 分区存储</strong>：按用户 ID 分片减少搜索范围；<strong>④ 懒加载</strong>：按需加载记忆而非全量加载；<strong>⑤ 压缩技术</strong>：对话摘要、向量量化减少存储；<strong>⑥ CDN 缓存</strong>：静态记忆内容边缘缓存。目标是将记忆检索延迟控制在 50ms 以内。"},{question:"如何实现跨设备的记忆同步？",answer:"同步方案：<strong>① 云端集中存储</strong>：所有记忆存储在中央数据库，设备通过 API 访问；<strong>② 增量同步</strong>：只同步变化的部分，减少带宽；<strong>③ 冲突解决</strong>：使用向量时钟或最后写入胜出策略；<strong>④ 离线支持</strong>：本地缓存常用记忆，联网后同步；<strong>⑤ 端到端加密</strong>：保护传输中的隐私数据。挑战在于平衡一致性和性能。"},{question:"记忆系统如何评估效果？",answer:"评估指标：<strong>① 召回率</strong>：相关记忆被正确检索的比例；<strong>② 准确率</strong>：检索到的记忆确实相关的比例；<strong>③ 响应质量</strong>：使用记忆后回答质量的提升（人工评估或 A/B 测试）；<strong>④ 用户满意度</strong>：用户对个性化服务的评分；<strong>⑤ 系统指标</strong>：检索延迟、存储成本、缓存命中率。综合这些指标持续优化记忆策略。"}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"对比分析"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"记忆类型"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"存储位置"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"生命周期"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"适用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"Buffer Memory"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"内存"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"单次会话"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"短对话、简单问答"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"Window Memory"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"内存"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"最近 N 轮"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"控制上下文长度"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"Summary Memory"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"内存/磁盘"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"会话级别"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"长对话压缩"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"Vector Memory"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"向量数据库"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"持久化"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"跨会话长期记忆"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"Entity Memory"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"图数据库"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"持久化"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"知识图谱、关系网络"})]})]})]})}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"前置知识"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/07-langchain-framework/agent-patterns",className:"text-primary hover:underline",children:"📖 Agent 模式"})}),e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/vector-database",className:"text-primary hover:underline",children:"📖 向量数据库"})})]})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"延伸阅读"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/agent-architecture",className:"text-primary hover:underline",children:"🔗 Agent 架构设计"})}),e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/multi-agent-systems",className:"text-primary hover:underline",children:"🔗 多智能体系统"})})]})]})]}),e.jsx(a,{...n(s.category,s.id)})]})}),e.jsx(d,{items:x})]})}export{f as default};
