import{j as e,g as a}from"./index-hyqxTCwJ.js";import{K as i}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as n}from"./SideNote-BKvanovA.js";import{C as t,A as o,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as c}from"./DiagramBlock-CLaKE9_7.js";import{I as d}from"./InterviewSection-BBNdwyyN.js";const x=[{id:"definition",text:"一句话定义",level:2},{id:"core-concepts",text:"一、CrewAI 核心概念",level:2},{id:"agent-role",text:"二、Agent 与 Role-playing",level:2},{id:"task-design",text:"三、Task 任务设计",level:2},{id:"process-modes",text:"四、Process 执行模式",level:2},{id:"crew-orchestration",text:"五、Crew 编排",level:2},{id:"tools-integration",text:"六、Tools 集成",level:2},{id:"misconceptions",text:"七、常见误区",level:2},{id:"interview",text:"八、面试真题",level:2},{id:"related",text:"九、知识关联",level:2}];function j({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(i,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["CrewAI 是一个",e.jsx("strong",{className:"text-accent",children:"基于角色扮演的多智能体协作框架"}),"，通过定义 Agent 的角色、目标和专业领域， 将复杂任务分解为多个 Task，按 Sequential（顺序）或 Hierarchical（层级）模式执行，实现结构化的团队协作。"]})}),e.jsxs(t,{type:"tip",title:"CrewAI vs AutoGen",children:["CrewAI 强调",e.jsx("strong",{children:"结构化任务分解"}),"和",e.jsx("strong",{children:"明确的角色分工"}),"，适合需要清晰工作流程的场景；AutoGen 更注重自由对话和代码执行，适合开放式探索任务。"]}),e.jsx("h2",{id:"core-concepts",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、CrewAI 核心概念"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["CrewAI 由四个核心组件构成：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Agent"}),"（智能体）、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Task"}),"（任务）、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Process"}),"（流程）和",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Crew"}),"（团队）。"]}),e.jsx(c,{title:"CrewAI 四层架构",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌─────────────────────────────────────┐
│              Crew                    │
│     (团队编排 + 执行管理)             │
└──────────────┬──────────────────────┘
               │ 包含
┌──────────────▼──────────────────────┐
│           Process                     │
│   (Sequential / Hierarchical)         │
└──────────────┬──────────────────────┘
               │ 协调
     ┌─────────┴─────────┐
     ▼                   ▼
┌─────────┐       ┌──────────┐
│  Task 1 │       │  Task 2  │
│ (研究)  │──────▶│ (写作)   │
└────┬────┘       └────┬─────┘
     │                 │
     ▼                 ▼
┌─────────┐       ┌──────────┐
│ Agent A │       │ Agent B  │
│(研究员) │       │ (作家)   │
└─────────┘       └──────────┘
  Role: Researcher   Role: Writer
            `})}),e.jsxs(n,{label:"设计理念",children:["CrewAI 采用",e.jsx("strong",{children:'"角色扮演 + 任务驱动"'}),"的设计哲学，每个 Agent 都有明确的角色定位和专业领域，通过结构化的任务分配实现高效协作。"]}),e.jsx("h2",{id:"agent-role",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、Agent 与 Role-playing"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Agent 是 CrewAI 的执行单元，每个 Agent 通过 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"role"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"goal"})," 和 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"backstory"})," 定义其专业身份。"]}),e.jsx(r,{code:`from crewai import Agent
from langchain_openai import ChatOpenAI

# 配置 LLM
llm = ChatOpenAI(model="gpt-4o", temperature=0.7)

# 创建研究员 Agent
researcher = Agent(
    role='高级市场研究员',
    goal='深入分析 {topic} 的市场趋势、竞争格局和用户痛点',
    backstory="""你是一位拥有 10 年经验的市场研究专家，
擅长从海量数据中提炼关键洞察，
能够识别行业趋势和潜在机会。
你的分析报告以数据驱动、逻辑清晰著称。""",
    verbose=True,  # 输出详细日志
    allow_delegation=False,  # 是否允许委派任务
    llm=llm,
    max_iter=3  # 最大迭代次数
)

# 创建内容创作者 Agent
writer = Agent(
    role='资深内容创作者',
    goal='根据研究报告撰写引人入胜的 {topic} 深度文章',
    backstory="""你是一位获奖的科技专栏作家，
擅长将复杂的技术概念转化为通俗易懂的内容，
文风生动有趣，结构清晰。
你的文章经常被主流科技媒体转载。""",
    verbose=True,
    allow_delegation=True,  # 可以委托研究任务
    llm=llm
)

# 创建编辑 Agent
editor = Agent(
    role='专业编辑',
    goal='审核并优化文章内容，确保质量和准确性',
    backstory="""你是一位经验丰富的主编，
对内容质量有极高的标准，
擅长发现逻辑漏洞、事实错误和表达不清的地方。
你的审稿意见能帮助作者提升文章质量。""",
    verbose=True,
    llm=llm
)`,language:"python",highlights:[8,21,35],filename:"agent_role.py",description:"Agent 角色定义示例"}),e.jsx(t,{type:"info",title:"Agent 关键参数",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"role"}),"：角色名称，决定 Agent 的专业领域"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"goal"}),"：目标描述，支持 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"{variable}"})," 占位符"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"backstory"}),"：背景故事，塑造 Agent 的性格和专业性"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"allow_delegation"}),"：是否可以将任务委派给其他 Agent"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"max_iter"}),"：最大执行迭代次数，防止无限循环"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"tools"}),"：可调用的工具列表（如搜索、计算器等）"]})]})}),e.jsx("h2",{id:"task-design",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、Task 任务设计"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Task 定义了具体的工作内容，包括描述、预期输出和负责的 Agent。Task 可以依赖其他 Task 的输出。"}),e.jsx(r,{code:`from crewai import Task

# 任务 1：市场研究
research_task = Task(
    description="""全面研究 {topic} 的市场情况：
1. 分析当前市场规模和增长趋势
2. 识别主要竞争对手及其优势劣势
3. 调研目标用户群体的痛点和需求
4. 总结市场机会和挑战""",
    expected_output="""一份详细的市场研究报告，包含：
- 市场规模数据（含来源）
- 竞争格局分析表格
- 用户画像和痛点列表
- SWOT 分析""",
    agent=researcher,  # 指定负责的 Agent
    output_file="reports/market_research.md"  # 可选：保存结果到文件
)

# 任务 2：内容创作（依赖研究任务）
writing_task = Task(
    description="""基于市场研究报告，撰写一篇深度文章：
1. 用引人入胜的开头吸引读者
2. 清晰阐述市场现状和趋势
3. 分析竞争格局和用户痛点
4. 提供实用的建议和展望
5. 保持专业但易懂的文风""",
    expected_output="""一篇 2000-3000 字的深度文章，包含：
- 吸引人的标题和开头
- 清晰的结构（小标题）
- 数据支撑的观点
-  actionable 的建议
- 有力的结尾""",
    agent=writer,
    context=[research_task],  # 依赖研究任务的输出
    output_file="articles/deep_dive.md"
)

# 任务 3：内容审核
editing_task = Task(
    description="""审核并优化文章：
1. 检查事实准确性和数据引用
2. 优化语言表达和逻辑流畅度
3. 确保结构清晰、层次分明
4. 添加必要的过渡和连接词
5. 提出改进建议""",
    expected_output="""审核后的最终版本文章，包含：
- 修正的事实错误
- 优化的段落和句子
- 改进建议列表（如有重大问题）""",
    agent=editor,
    context=[writing_task]  # 依赖写作任务的输出
)`,language:"python",highlights:[5,20,35,50],filename:"task_design.py",description:"Task 任务设计与依赖关系"}),e.jsxs(n,{label:"Task 依赖",children:["使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"context=[other_task]"})," 可以让 Task 访问其他任务的输出，实现工作流的数据传递。"]}),e.jsx("h2",{id:"process-modes",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、Process 执行模式"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["CrewAI 支持两种任务执行模式：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Sequential"}),"（顺序执行）和",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Hierarchical"}),"（层级执行）。"]}),e.jsx(r,{code:`from crewai import Crew, Process

# 模式 1：Sequential（顺序执行）
# 任务按定义顺序依次执行，每个任务完成后传递给下一个
sequential_crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, writing_task, editing_task],
    process=Process.sequential,  # 顺序模式
    verbose=True
)

# 执行
result = sequential_crew.kickoff(inputs={"topic": "人工智能教育市场"})
print(result)

# 模式 2：Hierarchical（层级执行）
# 需要一个 Manager Agent 来协调和分配任务
manager = Agent(
    role='项目经理',
    goal='协调团队完成 {topic} 的研究和报告撰写',
    backstory="""你是一位经验丰富的项目经理，
擅长协调跨职能团队，确保项目按时高质量交付。
你能够合理分配任务并监控进度。""",
    llm=llm
)

hierarchical_crew = Crew(
    agents=[manager, researcher, writer, editor],
    tasks=[research_task, writing_task, editing_task],
    process=Process.hierarchical,  # 层级模式
    manager_llm=llm,  # Manager 使用的 LLM
    verbose=True
)

# 执行
result = hierarchical_crew.kickoff(inputs={"topic": "人工智能教育市场"})`,language:"python",highlights:[9,26,34],filename:"process_modes.py",description:"Sequential vs Hierarchical 模式"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep border-b border-border",children:[e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"Sequential"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"Hierarchical"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 text-ink",children:e.jsx("strong",{children:"执行方式"})}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"按顺序依次执行"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"Manager 动态分配"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 text-ink",children:e.jsx("strong",{children:"适用场景"})}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"线性工作流"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"复杂协作"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 text-ink",children:e.jsx("strong",{children:"灵活性"})}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"低（固定顺序）"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"高（动态调整）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 text-ink",children:e.jsx("strong",{children:"复杂度"})}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"简单"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"需要 Manager"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 text-ink",children:e.jsx("strong",{children:"成本"})}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"较低"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"较高（Manager 额外开销）"})]})]})]}),e.jsx("h2",{id:"crew-orchestration",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、Crew 编排"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Crew"})," 是最高层的编排单元，负责整合 Agent、Task 和 Process，并提供执行控制。"]}),e.jsx(r,{code:`from crewai import Crew
from crewai.project import CrewBase, agent, task, crew

# 方式 1：传统 API
crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, writing_task, editing_task],
    process=Process.sequential,
    verbose=True,
    memory=True,  # 启用记忆功能
    cache=True,  # 启用缓存
    max_rpm=100,  # 每分钟最大请求数
    share_crew=True  # 允许 Agent 共享上下文
)

# 执行并获取结果
result = crew.kickoff(inputs={"topic": "AI 教育市场"})
print(f"最终输出：{result}")

# 查看详细执行日志
print(f"Token 使用量：{crew.usage_metrics}")
print(f"任务执行历史：{crew.tasks_output}")

# 方式 2：装饰器 API（推荐用于大型项目）
@CrewBase
class ContentCreationCrew:
    """内容创作团队"""
    
    @agent
    def researcher(self) -> Agent:
        return Agent(
            role='高级市场研究员',
            goal='深入研究 {topic}',
            backstory='你是经验丰富的市场研究专家',
            llm=llm
        )
    
    @agent
    def writer(self) -> Agent:
        return Agent(
            role='资深内容创作者',
            goal='撰写关于 {topic} 的深度文章',
            backstory='你是获奖的科技专栏作家',
            llm=llm
        )
    
    @task
    def research_task(self) -> Task:
        return Task(
            description='研究 {topic} 的市场情况',
            expected_output='详细的市场研究报告',
            agent=self.researcher()
        )
    
    @task
    def writing_task(self) -> Task:
        return Task(
            description='基于研究报告撰写文章',
            expected_output='2000-3000 字的深度文章',
            agent=self.writer(),
            context=[self.research_task()]
        )
    
    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True
        )

# 执行
content_crew = ContentCreationCrew()
result = content_crew.crew().kickoff(inputs={"topic": "AI 教育市场"})`,language:"python",highlights:[5,27,41,52,61],filename:"crew_orchestration.py",description:"Crew 编排两种方式"}),e.jsx(t,{type:"tip",title:"Crew 高级配置",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"memory=True"}),"：启用长期记忆，Agent 可以记住之前的交互"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"cache=True"}),"：缓存 LLM 响应，减少重复调用的成本"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"max_rpm"}),"：限制 API 调用频率，避免超出配额"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"share_crew"}),"：允许 Agent 共享彼此的上下文信息"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"output_log_file"}),"：保存执行日志到文件"]})]})}),e.jsx("h2",{id:"tools-integration",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、Tools 集成"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Tools 扩展了 Agent 的能力，使其能够执行搜索、计算、文件操作等外部动作。CrewAI 兼容 LangChain 的工具生态。"}),e.jsx(r,{code:`from crewai import Agent, Task
from langchain_community.tools import DuckDuckGoSearchRun, WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper
from langchain.tools import Tool

# 工具 1：网络搜索
search_tool = DuckDuckGoSearchRun()

# 工具 2：维基百科查询
wikipedia = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper())

# 工具 3：自定义工具
def calculate_market_size(revenue: float, growth_rate: float, years: int) -> str:
    """计算未来市场规模"""
    future_size = revenue * ((1 + growth_rate) ** years)
    return f"{years} 年后预计市场规模：{future_size:.2f} 亿元"

custom_tool = Tool(
    name="MarketSizeCalculator",
    func=calculate_market_size,
    description="根据当前营收、增长率和年数计算未来市场规模"
)

# 将工具绑定到 Agent
researcher_with_tools = Agent(
    role='高级市场研究员',
    goal='深入研究 {topic} 并提供数据支撑的分析',
    backstory='你是经验丰富的市场研究专家，善于利用各种数据源',
    tools=[search_tool, wikipedia, custom_tool],  # 绑定工具
    llm=llm,
    verbose=True
)

# 任务中使用工具
research_task_with_tools = Task(
    description="""研究 {topic} 并提供数据支撑：
1. 使用搜索引擎查找最新市场数据
2. 查询维基百科了解行业背景
3. 使用计算器预测未来市场规模
4. 综合所有信息生成报告""",
    expected_output='包含数据和引用的市场研究报告',
    agent=researcher_with_tools
)

# 执行
crew = Crew(
    agents=[researcher_with_tools],
    tasks=[research_task_with_tools],
    process=Process.sequential
)

result = crew.kickoff(inputs={"topic": "在线教育市场"})`,language:"python",highlights:[7,10,14,27,38],filename:"tools_integration.py",description:"Tools 集成与使用"}),e.jsxs(n,{label:"工具选择策略",children:["Agent 会根据任务描述自动判断是否需要调用工具以及调用哪个工具。清晰的工具 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"description"})," 能帮助 Agent 做出正确的选择。"]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：Role 定义越详细越好",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为给 Agent 编写长篇大论的 backstory 能提升表现。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：过长的角色描述会消耗大量 Token 且可能引入噪声。应聚焦于",e.jsx("strong",{children:"核心专业能力"}),"和",e.jsx("strong",{children:"关键行为准则"}),"，通常 2-3 句话即可。重点在于清晰的目标和期望输出。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：Hierarchical 模式总是更好",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 Hierarchical 模式更智能，应该优先使用。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：Hierarchical 模式引入了 Manager Agent 的额外开销，对于简单的线性任务反而增加成本和延迟。只有当任务需要动态协调、并行处理或复杂决策时才使用 Hierarchical。"]})]}),e.jsxs(t,{type:"danger",title:"误区 3：忽略 Task 依赖关系",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为只要按顺序定义 Task，就会自动传递数据。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：必须显式使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"context=[previous_task]"})," 声明依赖关系，否则后续 Task 无法访问前面 Task 的输出。这是最常见的错误之一。"]})]}),e.jsxs(t,{type:"warning",title:"误区 4：不设置 max_iter 和超时控制",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 Agent 会智能地在适当时机停止。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：如果不设置 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"max_iter"}),"，Agent 可能在复杂任务上陷入无限循环。务必为每个 Agent 设置合理的迭代上限（如 3-5 次），并在 Crew 级别设置超时时间。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、面试真题"}),e.jsx(d,{questions:[{question:"CrewAI 的核心设计理念是什么？",answer:"CrewAI 采用'角色扮演 + 任务驱动'的设计理念，通过定义 Agent 的角色（role）、目标（goal）和背景（backstory）塑造专业身份，将复杂工作分解为结构化的 Task，按 Sequential 或 Hierarchical 模式执行，实现明确的分工协作。"},{question:"Sequential 和 Hierarchical 模式的区别是什么？",answer:"Sequential 模式按任务定义的顺序依次执行，适合线性工作流，简单高效；Hierarchical 模式由 Manager Agent 动态协调任务执行顺序，适合复杂协作场景，灵活性强但成本高。选择依据：任务是否有明确的先后顺序，是否需要动态决策。"},{question:"如何实现 Task 之间的数据传递？",answer:"使用 Task 的 <code className='font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]'>context</code> 参数声明依赖关系，如 <code className='font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]'>context=[previous_task]</code>。这样当前 Task 可以访问依赖 Task 的输出结果。也可以在 Agent 之间通过 shared memory 共享信息。"},{question:"CrewAI 的 Agent 与 AutoGen 的 ConversableAgent 有何不同？",answer:"CrewAI Agent 强调固定的角色定位和结构化任务执行，通过 role/goal/backstory 定义专业身份；AutoGen ConversableAgent 更注重自由对话和代码执行能力，支持动态的多轮交互。CrewAI 适合明确的工作流，AutoGen 适合开放式探索。"},{question:"如何优化 CrewAI 的性能和成本？",answer:"① 启用缓存（cache=True）避免重复 LLM 调用；② 设置合理的 max_iter 限制迭代次数；③ 使用 max_rpm 控制 API 频率；④ 精简 Agent 数量和 Task 粒度；⑤ 优先使用 Sequential 模式（除非必要不用 Hierarchical）；⑥ 复用 Agent 实例而非每次创建新对象。"},{question:"CrewAI 如何处理任务失败和重试？",answer:"CrewAI 本身没有内置的重试机制，需要在 Task 层面处理：① 在 expected_output 中明确成功标准；② Agent 根据输出质量自我评估；③ 如需重试，可在应用层捕获异常并重新 kickoff；④ 使用 callback 函数监控任务状态；⑤ 对于关键任务，设置多个备选 Agent。"},{question:"何时应该使用 CrewAI 而非 LangGraph？",answer:"当任务具有明确的角色分工和线性/层级工作流时，使用 CrewAI（如内容创作流水线、研究报告生成）；当需要复杂的状态管理、条件分支、人工干预或循环控制时，使用 LangGraph（如多轮对话系统、ReAct Agent）。CrewAI 更偏向任务编排，LangGraph 更偏向状态机。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/11-ai-agent-frameworks/autogen-framework",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"同类框架 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"AutoGen 多智能体框架"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"ConversableAgent、GroupChat"})]}),e.jsxs("a",{href:"/docs/07-ai-frameworks/langgraph-core",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"对比学习 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"LangGraph 核心"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"StateGraph、Checkpoint"})]}),e.jsxs("a",{href:"/docs/07-ai-frameworks/workflow-design",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-purple mb-1",children:"设计模式 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-purple",children:"Workflow 设计"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"DAG、容错、持久化"})]}),e.jsxs("a",{href:"/docs/06-ai-theory/function-calling",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"Function Calling"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"工具调用基础"})]})]}),e.jsx(t,{type:"info",title:"学习建议",children:"CrewAI 的学习曲线相对平缓，建议从简单的 Sequential 模式开始，掌握 Agent 和 Task 的基本用法后，再探索 Hierarchical 模式和 Tools 集成。官方文档提供了丰富的示例项目，如市场调研、内容创作、代码审查等。"}),e.jsx(o,{...a(s.category,s.id)})]})}),e.jsx(l,{items:x})]})}export{j as default};
