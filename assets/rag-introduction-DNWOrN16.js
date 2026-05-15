import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as o}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as d}from"./SideNote-BKvanovA.js";import{C as r,A as a,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as i}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const x=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"core",text:"核心原理",level:2},{id:"workflow",text:"工作流程",level:2},{id:"implementation",text:"实现示例",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比分析",level:2},{id:"related",text:"知识关联",level:2}];function u({meta:t}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(o,{meta:t,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["RAG（Retrieval-Augmented Generation）是一种将",e.jsx("strong",{className:"text-accent",children:"外部知识库检索"}),"与",e.jsx("strong",{className:"text-accent",children:"大语言模型生成"}),"结合的架构模式，通过先检索相关文档再生成答案，显著提升回答的准确性和时效性。"]})}),e.jsxs(r,{type:"tip",title:"为什么需要 RAG？",children:["LLM 存在两个核心问题：",e.jsx("strong",{children:"知识截止"}),"（训练数据有限）和",e.jsx("strong",{children:"幻觉"}),"（编造事实）。RAG 通过引入外部知识库，让模型基于真实文档生成答案，有效解决这两个问题。"]}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"整体架构"}),e.jsx(i,{title:"RAG 系统架构图",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌──────────┐     ┌─────────────┐     ┌──────────────┐
│ 用户查询  │────▶│ Query       │────▶│ 向量数据库    │
└──────────┘     │ Embedding   │     │ 检索          │
                 └─────────────┘     └──────┬───────┘
                                            │
                                            ▼
                                   ┌────────────────┐
                                   │ 相关文档 Chunk  │
                                   └──────┬─────────┘
                                          │
                                          ▼
                                 ┌────────────────┐
                                 │ Prompt 组装     │
                                 │ (Query + Docs)  │
                                 └──────┬─────────┘
                                        │
                                        ▼
                                 ┌────────────────┐
                                 │ LLM 生成答案    │
                                 └──────┬─────────┘
                                        │
                                        ▼
                                 ┌────────────────┐
                                 │ 最终答案        │
                                 └────────────────┘
            `})}),e.jsxs(d,{label:"索引阶段",children:["知识库文档需要先经过切分（Chunking）、向量化（Embedding），然后存入向量数据库，这个过程称为",e.jsx("strong",{children:"离线索引"}),"。"]}),e.jsx("h2",{id:"core",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"核心原理"}),e.jsx("h3",{id:"retrieval-phase",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1. 检索阶段（Retrieval）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"将用户查询转换为向量（Embedding），在向量数据库中搜索最相似的文档片段。常用相似度算法包括余弦相似度、欧氏距离等。"}),e.jsx(s,{code:`import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# 查询向量
query_vector = np.array([[0.1, 0.3, 0.5, 0.2]])

# 文档向量库
doc_vectors = np.array([
    [0.1, 0.3, 0.5, 0.2],      # 高度相关
    [0.8, 0.1, 0.2, 0.3],      # 不相关
    [0.15, 0.28, 0.48, 0.22]   # 中度相关
])

# 计算相似度
similarities = cosine_similarity(query_vector, doc_vectors)
print("相似度得分:", similarities[0])
# 输出: [0.999, 0.412, 0.987]

# 返回 Top-K 结果
top_k = 2
top_indices = np.argsort(similarities[0])[::-1][:top_k]
print("Top-2 文档索引:", top_indices)
# 输出: [0, 2]`,language:"python",highlights:[10,18,22],filename:"similarity_search.py",description:"使用余弦相似度衡量查询与文档的相关性"}),e.jsx("h3",{id:"generation-phase",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2. 生成阶段（Generation）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"将检索到的文档片段与用户查询一起组装成 Prompt，输入 LLM 生成最终答案。Prompt 模板通常包含系统指令、上下文文档和用户问题三部分。"}),e.jsx(s,{code:`system_prompt = """你是一个智能助手，请根据提供的上下文回答问题。
如果上下文中没有相关信息，请明确说明。"""

context = """
文档1: Python 是一种高级编程语言，由 Guido van Rossum 于 1991 年发布。
文档2: Python 支持多种编程范式，包括面向对象、函数式和过程式编程。
"""

user_question = "Python 是谁创建的？"

prompt = f"""{system_prompt}

上下文:
{context}

问题: {user_question}

答案:"""

print(prompt)
# 输出完整的 Prompt，LLM 将基于此生成答案`,language:"python",highlights:[1,4,10,13],filename:"prompt_assembly.py",description:"典型的 RAG Prompt 结构"}),e.jsx("h2",{id:"workflow",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"工作流程"}),e.jsx(i,{title:"RAG 完整工作流",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
索引阶段（离线）:
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ 文档加载  │───▶│ 文本切分  │───▶│ 向量化    │───▶│ 向量存储  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘

查询阶段（在线）:
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ 查询输入  │───▶│ 相似检索  │───▶│ Prompt   │───▶│ LLM 生成  │
└──────────┘    └──────────┘    │ 组装     │    └──────────┘
                                └──────────┘
            `})}),e.jsx("h2",{id:"implementation",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"实现示例"}),e.jsx(s,{code:`from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

# 1. 加载文档
loader = TextLoader("knowledge_base.txt")
documents = loader.load()

# 2. 文本切分
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)
chunks = text_splitter.split_documents(documents)

# 3. 创建向量存储
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

# 4. 创建检索器
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# 5. 创建 LLM
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

# 6. 创建 RAG 链
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True
)

# 7. 查询
result = qa_chain.invoke({"query": "什么是 RAG?"})
print(result["result"])
print("来源文档:", result["source_documents"])`,language:"python",highlights:[9,13,20,24,28,32,38],filename:"rag_with_langchain.py",description:"使用 LangChain 构建简单 RAG 系统"}),e.jsxs(r,{type:"info",title:"生产环境优化",children:["上述示例是简化版本，生产环境需要考虑：",e.jsx("strong",{children:"混合检索"}),"（关键词 + 向量）、",e.jsx("strong",{children:"重排序"}),"（Re-ranking）、",e.jsx("strong",{children:"查询扩展"}),"（Query Expansion）、",e.jsx("strong",{children:"缓存机制"}),"等优化策略。"]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"常见误区"}),e.jsxs(r,{type:"danger",title:"误区 1：RAG 可以完全消除幻觉",children:[e.jsx("strong",{children:"错误认知"}),"：有了 RAG，LLM 就不会再产生幻觉。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：RAG 只能",e.jsx("strong",{children:"降低"}),"幻觉概率，无法完全消除。如果检索到的文档本身有误，或 LLM 误解了上下文，仍可能产生错误答案。需要结合答案验证、置信度评分等机制。"]}),e.jsxs(r,{type:"danger",title:"误区 2：Chunk 越大越好",children:[e.jsx("strong",{children:"错误认知"}),"：把整个文档作为一个 chunk，保留完整上下文。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：过大的 chunk 会稀释关键信息，降低检索精度；过小则丢失上下文。通常 200-800 tokens 是合理范围，需根据具体场景调优。"]}),e.jsxs(r,{type:"danger",title:"误区 3：向量检索就是全部",children:[e.jsx("strong",{children:"错误认知"}),"：只需要向量相似度检索就够了。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"实际情况"}),"：纯向量检索在处理专有名词、精确匹配时效果不佳。",e.jsx("strong",{children:"混合检索"}),"（Hybrid Search）结合关键词检索（BM25）和向量检索，能显著提升召回率。"]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"面试真题"}),e.jsx(m,{questions:[{question:"RAG 相比 Fine-tuning 有什么优势？",answer:"RAG 的优势包括：① <strong>无需重新训练</strong>，直接利用现有 LLM；② <strong>知识可实时更新</strong>，只需更新向量库；③ <strong>可追溯性</strong>，能明确指出答案来源；④ <strong>成本更低</strong>，避免昂贵的微调费用。Fine-tuning 适合改变模型行为风格，RAG 适合注入新知识。"},{question:"如何选择 Chunk Size？",answer:"选择 Chunk Size 需权衡：<strong>太小</strong>（&lt;200 tokens）会丢失上下文，<strong>太大</strong>（&gt;1000 tokens）会稀释关键信息。经验法则：① 问答场景用 200-500 tokens；② 摘要场景用 500-800 tokens；③ 重叠率设为 10-20%。最佳值需通过实验验证，评估指标包括检索精度和生成质量。"},{question:"RAG 系统中如何处理多轮对话？",answer:"多轮对话的 RAG 需要：<strong>① 对话历史管理</strong>：维护最近 N 轮对话作为上下文；<strong>② 查询重写</strong>：将当前问题结合历史转换为独立查询（如 '它是什么？' → 'Python 是什么？'）；<strong>③ 会话级向量存储</strong>：可选将会话状态也向量化存储。LangChain 的 ConversationalRetrievalChain 提供了现成实现。"},{question:"向量数据库选型的关键因素有哪些？",answer:"关键因素包括：<strong>① 规模</strong>：支持的数据量（百万/千万/亿级）；<strong>② 性能</strong>：查询延迟和吞吐量；<strong>③ 功能</strong>：是否支持混合检索、过滤、聚合；<strong>④ 部署</strong>：云端托管 vs 自托管；<strong>⑤ 生态</strong>：与现有框架的集成度。常见选择：Chroma（轻量）、Pinecone（云端）、Milvus（大规模）、FAISS（本地库）。"},{question:"如何评估 RAG 系统的效果？",answer:"评估维度包括：<strong>① 检索质量</strong>：Precision@K、Recall@K、MRR（平均倒数排名）；<strong>② 生成质量</strong>：人工评估、BLEU/ROUGE（参考标准答案时）；<strong>③ 端到端指标</strong>：用户满意度、任务完成率；<strong>④ 性能指标</strong>：延迟、吞吐量。推荐使用 RAGAS 框架进行自动化评估。"}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"对比分析"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"特性"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"RAG"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"Fine-tuning"}),e.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left",children:"Prompt Engineering"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"知识更新"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"✅ 实时更新"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"❌ 需重新训练"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"⚠️ 手动修改 Prompt"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"可解释性"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"✅ 可追溯来源"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"❌ 黑盒"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"⚠️ 部分可解释"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"成本"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"💰 中等（推理 + 检索）"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"💰💰💰 高（训练成本）"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"💰 低"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"适用场景"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"知识密集型任务"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"领域专业化"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"简单任务优化"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 px-4 py-2 font-medium",children:"延迟"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"⚠️ 较高（检索 + 生成）"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"✅ 低（仅推理）"}),e.jsx("td",{className:"border border-gray-300 px-4 py-2",children:"✅ 低"})]})]})]})}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"前置知识"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/07-langchain-framework/llm-basics",className:"text-primary hover:underline",children:"📖 LLM 基础概念"})}),e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/07-langchain-framework/structured-output",className:"text-primary hover:underline",children:"📖 结构化输出"})})]})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 bg-white",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"延伸阅读"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/vector-database",className:"text-primary hover:underline",children:"🔗 向量数据库"})}),e.jsx("li",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:e.jsx("a",{href:"/docs/08-ai-applications/embedding-models",className:"text-primary hover:underline",children:"🔗 嵌入模型"})})]})]})]}),e.jsx(a,{...n(t.category,t.id)})]})}),e.jsx(l,{items:x})]})}export{u as default};
