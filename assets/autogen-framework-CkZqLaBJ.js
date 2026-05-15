import{j as e,g as o}from"./index-hyqxTCwJ.js";import{K as i}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as r}from"./SideNote-BKvanovA.js";import{C as t,A as l,S as d}from"./ArticleNav-DhfiS38Y.js";import{D as a}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"architecture",text:"一、AutoGen 架构概览",level:2},{id:"conversable-agent",text:"二、ConversableAgent 核心",level:2},{id:"group-chat",text:"三、GroupChat 多智能体协作",level:2},{id:"chat-modes",text:"四、对话模式对比",level:2},{id:"code-execution",text:"五、代码执行能力",level:2},{id:"human-in-loop",text:"六、Human-in-the-loop",level:2},{id:"misconceptions",text:"七、常见误区",level:2},{id:"interview",text:"八、面试真题",level:2},{id:"related",text:"九、知识关联",level:2}];function j({meta:n}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(i,{meta:n,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["AutoGen 是 Microsoft 开发的",e.jsx("strong",{className:"text-accent",children:"多智能体对话框架"}),"，通过 ConversableAgent 实现可定制的 LLM 代理， 支持 GroupChat 模式的多人协作对话、代码自动生成与执行，以及 Human-in-the-loop 的人工干预机制。"]})}),e.jsxs(t,{type:"tip",title:"为什么选择 AutoGen？",children:["AutoGen 专注于",e.jsx("strong",{children:"多轮对话驱动的任务完成"}),"，相比单 Agent 系统，它能通过多个专业 Agent 的协作解决复杂问题，特别适合需要代码生成、数据分析、多步骤推理的场景。"]}),e.jsx("h2",{id:"architecture",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、AutoGen 架构概览"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["AutoGen 的核心由三层组成：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"ConversableAgent"}),"（智能体）、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"GroupChat"}),"（群聊管理器）和",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"GroupChatManager"}),"（协调者）。"]}),e.jsx(a,{title:"AutoGen 三层架构",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌─────────────────────────────────────────────┐
│           GroupChatManager                   │
│         (协调者 / 管理员)                     │
└──────────────┬──────────────────────────────┘
               │ 管理对话流程
┌──────────────▼──────────────────────────────┐
│              GroupChat                        │
│     (消息路由 + 发言顺序控制)                  │
└──┬──────────┬──────────┬──────────┬──────────┘
   │          │          │          │
┌──▼──┐  ┌───▼───┐  ┌──▼──┐  ┌───▼────┐
│Agent│  │ Agent │  │Agent│  │ Human  │
│  A  │  │   B   │  │  C  │  │(可选)  │
└─────┘  └───────┘  └─────┘  └────────┘
  │         │          │
  └─────────┴──────────┘
       多轮对话交互
            `})}),e.jsxs(r,{label:"设计理念",children:["AutoGen 采用",e.jsx("strong",{children:'"对话即编程"'}),"的理念，Agent 之间通过自然语言消息传递任务和结果，无需显式的 API 调用编排。"]}),e.jsx("h2",{id:"conversable-agent",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、ConversableAgent 核心"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"ConversableAgent"})," 是 AutoGen 的基础单元，每个 Agent 可以配置不同的 LLM、系统提示、工具函数和终止条件。"]}),e.jsx(s,{code:`import autogen

# 配置 LLM
config_list = [
    {
        "model": "gpt-4o",
        "api_key": "sk-xxx",
        "base_url": "https://api.openai.com/v1"
    }
]

# 创建用户代理（模拟人类提问）
user_proxy = autogen.UserProxyAgent(
    name="UserProxy",
    human_input_mode="TERMINATE",  # 仅在需要时请求人工输入
    max_consecutive_auto_reply=10,  # 最大自动回复次数
    code_execution_config={
        "work_dir": "coding",  # 代码执行目录
        "use_docker": False  # 是否使用 Docker 沙箱
    }
)

# 创建助手代理（负责解决问题）
assistant = autogen.AssistantAgent(
    name="Assistant",
    llm_config={"config_list": config_list},
    system_message="""你是一个专业的 Python 工程师。
当收到任务时：
1. 分析问题需求
2. 编写完整的 Python 代码
3. 解释代码逻辑
4. 如果出错，根据错误信息修正代码"""
)

# 启动对话
user_proxy.initiate_chat(
    assistant,
    message="写一个 Python 函数，计算斐波那契数列的前 n 项"
)`,language:"python",highlights:[13,24,37],filename:"conversable_agent.py",description:"ConversableAgent 基础配置"}),e.jsx(t,{type:"info",title:"Agent 类型",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"UserProxyAgent"}),"：代表人类用户，可执行代码、请求人工输入"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"AssistantAgent"}),"：LLM 驱动的助手，负责生成回答和代码"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"自定义 Agent"}),"：继承 ConversableAgent，实现特定逻辑"]})]})}),e.jsx("h2",{id:"group-chat",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、GroupChat 多智能体协作"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"GroupChat 允许多个 Agent 参与同一对话，通过轮流发言或基于条件的动态选择来实现复杂任务的分解与协作。"}),e.jsx(s,{code:`import autogen

# 创建三个专业 Agent
coder = autogen.AssistantAgent(
    name="Coder",
    llm_config=llm_config,
    system_message="你是一名资深程序员，负责编写高质量代码。"
)

reviewer = autogen.AssistantAgent(
    name="Reviewer",
    llm_config=llm_config,
    system_message="你是代码审查专家，检查代码的质量、安全性和最佳实践。"
)

tester = autogen.AssistantAgent(
    name="Tester",
    llm_config=llm_config,
    system_message="你是测试工程师，编写单元测试并验证代码正确性。"
)

# 创建群聊
groupchat = autogen.GroupChat(
    agents=[coder, reviewer, tester],
    messages=[],
    max_round=10  # 最多 10 轮对话
)

# 创建群聊管理器
manager = autogen.GroupChatManager(
    groupchat=groupchat,
    llm_config=llm_config,
    system_message="你负责协调开发流程：先编码，再审查，最后测试。"
)

# 启动协作
user_proxy.initiate_chat(
    manager,
    message="实现一个线程安全的计数器类"
)`,language:"python",highlights:[24,32,39],filename:"group_chat.py",description:"GroupChat 多 Agent 协作"}),e.jsx(a,{title:"GroupChat 工作流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
User Request
    │
    ▼
┌──────────┐
│  Coder   │ ──→ 生成代码
└────┬─────┘
     │ 代码
     ▼
┌──────────┐
│Reviewer  │ ──→ 审查反馈
└────┬─────┘
     │ 修改建议
     ▼
┌──────────┐
│  Coder   │ ──→ 修正代码
└────┬─────┘
     │ 最终代码
     ▼
┌──────────┐
│ Tester   │ ──→ 运行测试
└────┬─────┘
     │ 测试结果
     ▼
  Task Done
            `})}),e.jsx("h2",{id:"chat-modes",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、对话模式对比"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"AutoGen 支持多种对话模式，适用于不同的协作场景。"}),e.jsx(s,{code:`# 模式 1：顺序对话（两个 Agent 直接对话）
user_proxy.initiate_chat(assistant, message="任务描述")

# 模式 2：群聊轮换（按顺序轮流发言）
groupchat = autogen.GroupChat(
    agents=[agent_a, agent_b, agent_c],
    speaker_selection_method="round_robin"  # 轮换制
)

# 模式 3：群聊自动选择（LLM 决定下一个发言人）
groupchat = autogen.GroupChat(
    agents=[agent_a, agent_b, agent_c],
    speaker_selection_method="auto"  # 自动选择
)

# 模式 4：手动控制（外部程序决定发言顺序）
groupchat = autogen.GroupChat(
    agents=[agent_a, agent_b, agent_c],
    speaker_selection_method="manual"
)

# 自定义选择逻辑
def custom_speaker_selector(last_speaker, groupchat):
    """根据上下文动态选择下一个发言人"""
    messages = groupchat.messages
    
    if not messages:
        return groupchat.agents[0]  # 第一个 Agent
    
    last_message = messages[-1]["content"]
    
    if "代码" in last_message:
        return reviewer  # 代码完成后交给审查者
    elif "测试" in last_message:
        return tester  # 审查后交给测试者
    else:
        return coder  # 默认交给编码器

groupchat = autogen.GroupChat(
    agents=[coder, reviewer, tester],
    speaker_selection_method=custom_speaker_selector
)`,language:"python",highlights:[6,12,18,24,31],filename:"chat_modes.py",description:"对话模式对比与自定义"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep border-b border-border",children:[e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"模式"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"适用场景"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"优点"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 text-ink",children:e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm px-1.5 py-0.5 rounded",children:"round_robin"})}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"固定流程任务"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"可预测、易调试"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 text-ink",children:e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm px-1.5 py-0.5 rounded",children:"auto"})}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"复杂决策场景"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"灵活、自适应"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 text-ink",children:e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm px-1.5 py-0.5 rounded",children:"manual"})}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"需要精确控制"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"完全可控"})]})]})]}),e.jsx("h2",{id:"code-execution",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、代码执行能力"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:'AutoGen 的亮点功能是自动执行生成的代码，并根据输出结果进行迭代修正，形成"生成 → 执行 → 反馈 → 修正"的闭环。'}),e.jsx(s,{code:`# 配置代码执行环境
user_proxy = autogen.UserProxyAgent(
    name="UserProxy",
    code_execution_config={
        "work_dir": "workspace",  # 工作目录
        "use_docker": True,  # 使用 Docker 沙箱（推荐）
        "docker_image": "python:3.11-slim",  # Docker 镜像
        "timeout": 60,  # 执行超时时间（秒）
        "last_n_messages": 3  # 最近 N 条消息中包含代码则执行
    }
)

# Assistant 生成代码
assistant = autogen.AssistantAgent(
    name="Assistant",
    llm_config=llm_config,
    system_message="""编写 Python 代码解决问题。
代码必须包含在 \`\`\`python 代码块中。
如果执行出错，根据错误信息修正代码。"""
)

# 示例：数据分析任务
user_proxy.initiate_chat(
    assistant,
    message="""分析以下数据并绘制图表：
import pandas as pd
import matplotlib.pyplot as plt

data = {'月份': ['1月', '2月', '3月', '4月'],
        '销售额': [100, 150, 130, 170]}

df = pd.DataFrame(data)
plt.bar(df['月份'], df['销售额'])
plt.title('月度销售额')
plt.show()"""
)

# 执行流程：
# 1. Assistant 生成代码
# 2. UserProxy 提取并执行代码
# 3. 将执行结果（输出/错误）返回给 Assistant
# 4. Assistant 根据结果调整代码或给出结论`,language:"python",highlights:[4,13,23],filename:"code_execution.py",description:"代码执行与自动修正"}),e.jsx(t,{type:"warning",title:"安全注意事项",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"始终使用 Docker 沙箱"}),"：避免恶意代码破坏主机系统"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"限制资源"}),"：设置 CPU、内存、磁盘配额"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"网络隔离"}),"：禁止容器访问外部网络（除非必要）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"超时控制"}),"：防止无限循环或长时间运行的代码"]})]})}),e.jsx("h2",{id:"human-in-loop",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、Human-in-the-loop"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"AutoGen 支持三种人工输入模式，允许在关键时刻介入对话流程。"}),e.jsx(s,{code:`# 模式 1：NEVER - 完全自动化（默认）
agent = autogen.AssistantAgent(
    name="Agent",
    human_input_mode="NEVER"
)

# 模式 2：TERMINATE - 仅在 Agent 请求终止时询问
agent = autogen.UserProxyAgent(
    name="UserProxy",
    human_input_mode="TERMINATE",
    max_consecutive_auto_reply=10  # 最多 10 次自动回复后请求人工输入
)

# 模式 3：ALWAYS - 每次回复前都请求人工输入
agent = autogen.UserProxyAgent(
    name="UserProxy",
    human_input_mode="ALWAYS"
)

# 自定义人工输入逻辑
def custom_human_input(messages):
    """根据消息内容决定是否请求人工输入"""
    last_message = messages[-1]["content"]
    
    # 如果包含敏感操作，请求确认
    if any(keyword in last_message for keyword in ["删除", "DROP", "rm -rf"]):
        return input("⚠️ 检测到危险操作，是否继续？(yes/no): ")
    
    # 如果需要澄清
    if "不确定" in last_message or "请确认" in last_message:
        return input("🤔 需要澄清：")
    
    # 否则自动继续
    return None

user_proxy = autogen.UserProxyAgent(
    name="UserProxy",
    human_input_mode="CUSTOM",
    custom_human_input_fn=custom_human_input
)`,language:"python",highlights:[4,10,17,23,41],filename:"human_in_loop.py",description:"Human-in-the-loop 三种模式"}),e.jsxs(r,{label:"实际应用场景",children:["在金融、医疗等高风险领域，建议使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"TERMINATE"})," 模式，让 AI 在完成关键步骤后等待人工确认，平衡效率与安全性。"]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：Agent 越多越好",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为增加更多专业 Agent 能提升任务完成质量。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：过多的 Agent 会导致对话轮次激增、成本上升和协调复杂度提高。应根据任务实际需求设计最小化的 Agent 集合，通常 2-4 个专业 Agent 即可覆盖大多数场景。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：代码执行总是安全的",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 AutoGen 的代码执行功能天然安全。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：如果不启用 Docker 沙箱，生成的代码可能在主机上直接执行，存在严重安全风险。生产环境",e.jsx("strong",{children:"必须"}),"启用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"use_docker=True"})," 并配置资源限制。"]})]}),e.jsxs(t,{type:"danger",title:"误区 3：GroupChat 会自动优化对话流程",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为使用 auto 模式的 GroupChat 能智能地选择最优发言顺序。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：auto 模式依赖 LLM 判断下一个发言人，可能产生不一致的结果。对于关键任务，建议使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"round_robin"})," 或自定义选择器确保流程可控。"]})]}),e.jsxs(t,{type:"warning",title:"误区 4：忽略 max_consecutive_auto_reply",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 Agent 会智能地在适当时机停止。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：如果不设置 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"max_consecutive_auto_reply"}),"，Agent 可能陷入无限对话循环，消耗大量 Token。务必设置合理的上限（如 10-20 次）。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、面试真题"}),e.jsx(m,{questions:[{question:"AutoGen 的核心设计理念是什么？",answer:"AutoGen 采用'对话即编程'的理念，通过 ConversableAgent 之间的自然语言消息传递来完成任务，而非传统的 API 调用编排。它强调多轮对话驱动的协作，支持代码自动生成与执行，以及 Human-in-the-loop 的人工干预机制。"},{question:"ConversableAgent 的关键配置参数有哪些？",answer:"① llm_config：LLM 模型配置；② system_message：系统提示词，定义 Agent 角色和行为；③ human_input_mode：人工输入模式（NEVER/TERMINATE/ALWAYS）；④ max_consecutive_auto_reply：最大连续自动回复次数；⑤ code_execution_config：代码执行配置（工作目录、Docker、超时等）。"},{question:"GroupChat 的 speaker_selection_method 有哪些模式？",answer:"① round_robin：按顺序轮流发言，适合固定流程；② auto：LLM 根据上下文自动选择下一个发言人，灵活但不可预测；③ manual：外部程序手动控制发言顺序；④ 自定义函数：根据消息内容动态决定下一个发言人。"},{question:"如何保证 AutoGen 代码执行的安全性？",answer:"① 启用 Docker 沙箱（use_docker=True）；② 使用受限的基础镜像（如 python:3.11-slim）；③ 设置资源限制（CPU、内存、磁盘）；④ 配置执行超时（timeout）；⑤ 网络隔离（禁止访问外网）；⑥ 定期清理工作目录。"},{question:"AutoGen 如何实现代码的自动修正？",answer:"流程：① Assistant 生成代码；② UserProxy 提取并执行代码；③ 将执行结果（stdout/stderr）作为消息返回给 Assistant；④ Assistant 分析错误信息，生成修正后的代码；⑤ 重复上述步骤直到成功或达到 max_consecutive_auto_reply 限制。"},{question:"AutoGen 与 LangGraph 的主要区别是什么？",answer:"AutoGen 专注于多轮对话驱动的多 Agent 协作，强调自然语言交互和代码执行；LangGraph 专注于有状态工作流编排，提供图结构的状态管理、Checkpoint 持久化和 Interrupt 中断机制。AutoGen 更适合开放式对话任务，LangGraph 更适合结构化工作流。"},{question:"如何调试 AutoGen 的多 Agent 对话？",answer:"① 打印 groupchat.messages 查看完整对话历史；② 使用 logging 模块记录每轮对话；③ 设置 max_round 限制对话轮次；④ 使用 register_reply 注册回调函数监控消息；⑤ 简化 Agent 数量逐步排查问题；⑥ 使用可视化工具（如 AutoGen Studio）观察对话流程。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/11-ai-agent-frameworks/crewai-framework",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"同类框架 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"CrewAI 协作框架"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"Role-playing、Task、Process"})]}),e.jsxs("a",{href:"/docs/07-ai-frameworks/langgraph-core",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"对比学习 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"LangGraph 核心"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"StateGraph、Checkpoint、Interrupt"})]}),e.jsxs("a",{href:"/docs/06-ai-theory/function-calling",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"Function Calling"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"工具调用与 Agent 集成"})]}),e.jsxs("a",{href:"/docs/07-ai-frameworks/agent-patterns",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-purple mb-1",children:"设计模式 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-purple",children:"Agent 设计模式"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"ReAct、Planner、Router"})]})]}),e.jsx(t,{type:"info",title:"学习建议",children:"AutoGen 适合从简单的双 Agent 对话开始，逐步探索 GroupChat 和代码执行功能。建议先阅读官方文档中的教程案例，然后尝试构建自己的多 Agent 应用，如代码审查助手、数据分析流水线等。"}),e.jsx(l,{...o(n.category,n.id)})]})}),e.jsx(d,{items:c})]})}export{j as default};
