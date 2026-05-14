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
  { id: 'overview', text: 'Dify 平台概述', level: 2 },
  { id: 'architecture', text: '平台架构', level: 2 },
  { id: 'core-modules', text: '核心模块', level: 3 },
  { id: 'workflow-design', text: '可视化工作流编排', level: 2 },
  { id: 'workflow-components', text: '工作流组件', level: 3 },
  { id: 'workflow-example', text: '工作流示例', level: 3 },
  { id: 'app-deployment', text: '应用部署', level: 2 },
  { id: 'app-types', text: '应用类型', level: 3 },
  { id: 'deployment-options', text: '部署方式', level: 3 },
  { id: 'llmops', text: 'LLMOps 实践', level: 2 },
  { id: 'monitoring', text: '监控与日志', level: 3 },
  { id: 'version-control', text: '版本管理', level: 3 },
  { id: 'code-example', text: '代码实战', level: 2 },
  { id: 'context-switch', text: '上下文切换', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '与 LangChain/LangGraph 对比', level: 2 },
  { id: 'related', text: '关联知识点', level: 2 },
]

export default function DifyPlatform({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <div className="knowledge-layout" data-meta={JSON.stringify(meta)}>
          {/* 一句话定义 */}
          <section id="definition" className="mb-8">
            <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 pl-4 py-3 rounded-r-lg">
              <p className="text-[15px] sm:text-base leading-relaxed text-ink font-medium">
                Dify 是一个开源的<strong>LLM 应用开发平台</strong>，提供可视化工作流编排、应用部署、LLMOps 等一站式能力，让开发者无需编写代码即可快速构建和部署 AI 应用。
              </p>
            </blockquote>
          </section>

          {/* Dify 平台概述 */}
          <section id="overview" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              Dify 平台概述
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify（Do It For You）旨在降低 LLM 应用开发门槛，通过<strong>低代码/无代码</strong>的方式实现从原型到生产的全流程。核心特点包括：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
              <li><strong>可视化编排：</strong>拖拽式工作流设计器，直观构建复杂逻辑</li>
              <li><strong>多模型支持：</strong>兼容 OpenAI、Anthropic、本地模型等多种 LLM</li>
              <li><strong>RAG 内置：</strong>集成向量数据库、文档处理、检索增强生成</li>
              <li><strong>LLMOps：</strong>提供监控、日志、版本管理、A/B 测试等运维能力</li>
              <li><strong>开源免费：</strong>MIT 许可证，可自托管或云端使用</li>
            </ul>
            <DiagramBlock title="Dify 核心价值主张">
              {`graph TD
    A[传统开发方式] --> B[编写代码<br/>LangChain/LangGraph]
    B --> C[配置环境<br/>向量数据库/模型API]
    C --> D[部署运维<br/>监控/日志/扩展]
    
    E[Dify 平台] --> F[可视化编排<br/>拖拽组件]
    F --> G[一键部署<br/>自动扩缩容]
    G --> H[内置 LLMOps<br/>监控/版本/A-B测试]
    
    style A fill:#ffebee
    style E fill:#d4edda`}
            </DiagramBlock>
            <SideNote label="适用人群">
              Dify 适合<strong>产品经理、业务分析师、全栈开发者</strong>快速构建 AI 应用，也适合专业开发者作为原型验证工具。
            </SideNote>
          </section>

          {/* 平台架构 */}
          <section id="architecture" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              平台架构
            </h2>

            <h3 id="core-modules" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              核心模块
            </h3>
            <DiagramBlock title="Dify 技术架构">
              {`graph TB
    subgraph Frontend [前端层]
      A[Web UI<br/>React]
      B[Workflow Editor<br/>可视化编排器]
    end
    
    subgraph Backend [后端层]
      C[API Server<br/>Flask/FastAPI]
      D[Worker<br/>Celery 任务队列]
      E[App Engine<br/>应用运行时]
    end
    
    subgraph Storage [存储层]
      F[PostgreSQL<br/>应用配置/用户数据]
      G[Redis<br/>缓存/队列]
      H[Vector DB<br/>Chroma/Milvus]
      I[Object Storage<br/>MinIO/S3]
    end
    
    subgraph Integration [集成层]
      J[Model Providers<br/>OpenAI/Anthropic/本地]
      K[Tools<br/>Web Search/API/Code]
      L[Plugins<br/>自定义扩展]
    end
    
    A --> C
    B --> C
    C --> D
    C --> E
    D --> F
    D --> G
    E --> F
    E --> H
    E --> I
    E --> J
    E --> K
    E --> L
    
    style Frontend fill:#e1f5ff
    style Backend fill:#fff3cd
    style Storage fill:#d4edda
    style Integration fill:#f8d7da`}
            </DiagramBlock>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify 采用微服务架构，前后端分离，支持水平扩展。Worker 使用 Celery 异步处理耗时任务（如文档索引、批量推理）。
            </p>
          </section>

          {/* 可视化工作流编排 */}
          <section id="workflow-design" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              可视化工作流编排
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify 的核心功能是<strong>可视化工作流编辑器</strong>，通过拖拽组件构建复杂的 AI 应用逻辑，无需编写代码。
            </p>

            <h3 id="workflow-components" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              工作流组件
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">🎯 Start</h4>
                <p className="text-[14px] text-ink-muted">工作流入口，定义输入变量</p>
              </div>
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">💬 LLM</h4>
                <p className="text-[14px] text-ink-muted">调用大模型，支持 Prompt 模板、参数配置</p>
              </div>
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">🔍 Knowledge Retrieval</h4>
                <p className="text-[14px] text-ink-muted">从知识库检索相关文档（RAG）</p>
              </div>
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">🔀 Condition</h4>
                <p className="text-[14px] text-ink-muted">条件分支，根据变量值选择不同路径</p>
              </div>
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">🔄 Iteration</h4>
                <p className="text-[14px] text-ink-muted">循环处理列表数据</p>
              </div>
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">🛠️ Tool</h4>
                <p className="text-[14px] text-ink-muted">调用外部工具（搜索、API、代码执行）</p>
              </div>
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">📝 Code</h4>
                <p className="text-[14px] text-ink-muted">执行自定义 Python/JavaScript 代码</p>
              </div>
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">✅ End</h4>
                <p className="text-[14px] text-ink-muted">工作流出口，定义输出结果</p>
              </div>
            </div>

            <h3 id="workflow-example" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              工作流示例
            </h3>
            <DiagramBlock title="智能客服工作流">
              {`graph TD
    A[Start<br/>用户问题] --> B[Knowledge Retrieval<br/>检索产品文档]
    B --> C{置信度 > 0.8?}
    C -->|是| D[LLM<br/>基于文档回答]
    C -->|否| E[LLM<br/>通用回答]
    D --> F[End<br/>返回答案]
    E --> F
    
    style A fill:#e1f5ff
    style F fill:#d4edda
    style C fill:#fff3cd`}
            </DiagramBlock>
            <SideNote label="优势">
              可视化编排让<strong>非技术人员</strong>也能构建复杂 AI 应用，同时支持导出为代码供开发者进一步优化。
            </SideNote>
          </section>

          {/* 应用部署 */}
          <section id="app-deployment" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              应用部署
            </h2>

            <h3 id="app-types" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              应用类型
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify 支持多种应用形态，满足不同场景需求：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
              <li><strong>聊天应用（Chat App）：</strong>对话式 AI，支持多轮对话、上下文记忆</li>
              <li><strong>文本生成应用（Text Generator）：</strong>单次输入输出，如文章摘要、翻译</li>
              <li><strong>Agent 应用：</strong>自主调用工具完成任务，如数据分析、代码生成</li>
              <li><strong>工作流应用（Workflow）：</strong>复杂业务流程自动化，如客服工单处理</li>
            </ul>

            <h3 id="deployment-options" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              部署方式
            </h3>
            <div className="space-y-4">
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">1. 云端托管（SaaS）</h4>
                <p className="text-[14px] text-ink-muted">
                  直接使用 Dify 官方云服务，无需运维，按用量付费。适合快速原型和小规模应用。
                </p>
              </div>
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">2. 自托管（Self-hosted）</h4>
                <p className="text-[14px] text-ink-muted">
                  使用 Docker Compose 或 Kubernetes 部署到自己的服务器，数据完全可控。适合企业级应用和对数据安全有要求的场景。
                </p>
                <Playground
                  language="bash"
                  description="Docker Compose 快速部署"
                  code={`# 克隆仓库
git clone https://github.com/langgenius/dify.git
cd dify/docker

# 配置环境变量
cp .env.example .env
# 编辑 .env 设置 API Key、数据库密码等

# 启动服务
docker compose up -d

# 访问 http://localhost:8080`}
                />
              </div>
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <h4 className="font-semibold text-ink mb-2">3. API 集成</h4>
                <p className="text-[14px] text-ink-muted">
                  通过 RESTful API 将 Dify 应用嵌入到自己的系统中，支持 Webhook 回调和流式响应。
                </p>
              </div>
            </div>
          </section>

          {/* LLMOps 实践 */}
          <section id="llmops" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              LLMOps 实践
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify 内置了完整的 LLMOps 能力，帮助团队管理 AI 应用的生命周期。
            </p>

            <h3 id="monitoring" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              监控与日志
            </h3>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
              <li><strong>请求日志：</strong>记录每次调用的输入、输出、耗时、Token 消耗</li>
              <li><strong>性能指标：</strong>QPS、延迟分布、错误率、成功率</li>
              <li><strong>成本分析：</strong>按应用、用户、模型维度统计 Token 使用和费用</li>
              <li><strong>用户反馈：</strong>收集点赞/点踩数据，用于优化 Prompt 和模型</li>
            </ul>

            <h3 id="version-control" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              版本管理
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify 支持应用的版本控制，可以回滚到历史版本，并进行 A/B 测试：
            </p>
            <DiagramBlock title="版本管理与 A/B 测试">
              {`graph LR
    A[v1.0<br/>生产版本] --> B{流量分配}
    C[v2.0<br/>实验版本] --> B
    B --> D[50% 用户]
    B --> E[50% 用户]
    D --> F[监控指标]
    E --> F
    F --> G{效果对比}
    G -->|v2.0 更好| H[全量发布 v2.0]
    G -->|v1.0 更好| I[回滚 v2.0]
    
    style A fill:#d4edda
    style C fill:#fff3cd
    style H fill:#d4edda
    style I fill:#ffebee`}
            </DiagramBlock>
            <SideNote label="最佳实践">
              每次修改 Prompt 或模型参数时创建新版本，通过 A/B 测试验证效果后再全量发布，避免直接修改生产环境。
            </SideNote>
          </section>

          {/* 代码实战 */}
          <section id="code-example" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              代码实战
            </h2>
            <Playground
              language="python"
              description="使用 Dify API 调用应用"
              code={`import requests

# Dify API 配置
API_KEY = "your-api-key"
BASE_URL = "https://api.dify.ai/v1"

# 调用聊天应用
def chat_with_dify(user_message: str):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "inputs": {},
        "query": user_message,
        "response_mode": "streaming",  # 流式响应
        "conversation_id": "",  # 空字符串表示新对话
        "user": "user-123"
    }
    
    response = requests.post(
        f"{BASE_URL}/chat-messages",
        headers=headers,
        json=payload,
        stream=True
    )
    
    # 处理流式响应
    for line in response.iter_lines():
        if line:
            # 解析 SSE 格式数据
            data = line.decode('utf-8').replace("data: ", "")
            print(data, end="", flush=True)

# 使用示例
chat_with_dify("如何优化 RAG 系统的性能？")`}
            />
            <Playground
              language="python"
              description="上传文档到知识库"
              code={`import requests

API_KEY = "your-api-key"
BASE_URL = "https://api.dify.ai/v1"

# 1. 创建数据集
def create_dataset(name: str):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "name": name,
        "description": "产品文档知识库"
    }
    
    response = requests.post(
        f"{BASE_URL}/datasets",
        headers=headers,
        json=payload
    )
    
    return response.json()["id"]

# 2. 上传文档
def upload_document(dataset_id: str, file_path: str):
    headers = {
        "Authorization": f"Bearer {API_KEY}"
    }
    
    with open(file_path, "rb") as f:
        files = {"file": f}
        data = {"dataset_id": dataset_id}
        
        response = requests.post(
            f"{BASE_URL}/datasets/{dataset_id}/documents",
            headers=headers,
            files=files,
            data=data
        )
    
    return response.json()

# 使用示例
dataset_id = create_dataset("Product Docs")
upload_document(dataset_id, "product_manual.pdf")
print("文档上传成功，开始索引...")`}
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
                    <strong>简单场景：</strong>快速构建原型应用
                  </p>
                  <ul className="list-disc list-inside text-[14px] leading-[1.8] text-ink-muted space-y-2">
                    <li><strong>步骤：</strong>注册 Dify 账号 → 选择应用模板 → 配置 Prompt → 点击发布</li>
                    <li><strong>时间：</strong>5-10 分钟即可完成一个可用的 AI 应用</li>
                    <li><strong>适用：</strong>产品演示、内部工具、个人项目</li>
                  </ul>
                </div>
              }
              hardcoreContent={
                <div className="space-y-4">
                  <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                    <h4 className="font-semibold text-ink mb-2">企业级生产部署</h4>
                    <p className="text-[14px] leading-[1.8] text-ink-muted mb-2">
                      <strong>架构设计：</strong>Kubernetes 集群 + 自动扩缩容 + 负载均衡。<br/>
                      <strong>高可用：</strong>多副本部署 + 故障自动转移 + 数据备份。<br/>
                      <strong>安全加固：</strong>VPC 隔离 + WAF 防火墙 + API 鉴权 + 审计日志。<br/>
                      <strong>性能优化：</strong>Redis 缓存热点数据 + CDN 加速静态资源 + 数据库读写分离。
                    </p>
                  </div>
                  <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                    <h4 className="font-semibold text-ink mb-2">自定义插件开发</h4>
                    <p className="text-[14px] leading-[1.8] text-ink-muted mb-2">
                      <strong>场景：</strong>Dify 内置工具无法满足需求时，开发自定义插件。<br/>
                      <strong>步骤：</strong>① 编写 Python/JavaScript 代码；② 定义输入输出 schema；③ 注册为 Tool 组件；④ 在工作流中调用。<br/>
                      <strong>示例：</strong>连接企业内部 CRM 系统、调用专有算法模型、集成第三方 API。
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
              <Callout type="danger" title="误区 1：Dify 只能做简单应用，无法构建复杂系统">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>错误认知：</strong>Dify 只适合简单的问答机器人，复杂逻辑必须写代码。<br/>
                  <strong>事实：</strong>Dify 的工作流引擎支持条件分支、循环、并行执行、自定义代码节点，可以构建非常复杂的应用。许多企业用它构建客服系统、数据分析平台、内容生成流水线等复杂业务。
                </p>
              </Callout>

              <Callout type="danger" title="误区 2：自托管 Dify 比云端更便宜">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>错误认知：</strong>自己部署可以省掉 SaaS 费用。<br/>
                  <strong>事实：</strong>自托管需要承担服务器成本、运维人力、监控告警、安全防护等隐性成本。对于小规模应用，云端 SaaS 通常更经济；只有当用量达到一定规模或对数据主权有要求时，自托管才划算。需综合评估 TCO（总拥有成本）。
                </p>
              </Callout>

              <Callout type="danger" title="误区 3：可视化编排会限制灵活性">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>错误认知：</strong>拖拽式界面不如写代码灵活。<br/>
                  <strong>事实：</strong>Dify 提供"Code"节点，可以执行任意 Python/JavaScript 代码，理论上可以实现任何逻辑。此外，工作流可以导出为 YAML/JSON，开发者可以在此基础上二次开发。可视化 + 代码的组合兼顾了易用性和灵活性。
                </p>
              </Callout>

              <Callout type="warning" title="误区 4：不需要关注 LLMOps，应用上线就完了">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>建议：</strong>LLM 应用需要持续优化。通过监控日志发现 bad case，收集用户反馈改进 Prompt，A/B 测试验证新版本效果。Dify 内置的 LLMOps 工具能大幅降低运维复杂度，但仍需建立定期 review 机制。
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
                  question: "Dify 是什么？它的核心功能有哪些？",
                  answer: "Dify 是开源的 LLM 应用开发平台，核心功能：① 可视化工作流编排（拖拽式构建应用逻辑）；② 多模型支持（OpenAI、Anthropic、本地模型等）；③ RAG 内置（向量数据库、文档处理）；④ LLMOps（监控、日志、版本管理、A/B 测试）；⑤ 应用部署（聊天应用、文本生成、Agent、工作流）。目标是降低 AI 应用开发门槛。"
                },
                {
                  question: "Dify 与 LangChain/LangGraph 的区别是什么？如何选择？",
                  answer: "区别：① Dify 是完整平台（UI + Backend + LLMOps），LangChain 是代码库；② Dify 低代码/无代码，LangChain 需要编程；③ Dify 内置可视化工具，LangChain 需自行搭建。选择：快速原型/非技术人员用 Dify；需要高度定制/已有技术栈用 LangChain。两者也可结合使用（Dify 调用 LangChain 代码节点）。"
                },
                {
                  question: "如何在 Dify 中实现 RAG 应用？",
                  answer: "步骤：① 创建知识库（Dataset），上传文档（PDF/Word/TXT）；② 配置文档处理策略（分段、清洗、Embedding 模型）；③ 在工作流中添加 Knowledge Retrieval 节点，设置检索参数（Top-K、相似度阈值）；④ 将检索结果传递给 LLM 节点，构建 Prompt 模板；⑤ 发布应用并测试效果。Dify 自动处理向量索引和检索优化。"
                },
                {
                  question: "Dify 的 LLMOps 包含哪些能力？为什么重要？",
                  answer: "能力：① 请求日志（记录输入输出、耗时、Token 消耗）；② 性能监控（QPS、延迟、错误率）；③ 成本分析（按应用/用户/模型统计费用）；④ 版本管理（回滚、A/B 测试）；⑤ 用户反馈收集（点赞/点踩）。重要性：LLM 应用需要持续优化，通过数据驱动改进 Prompt、模型选型、检索策略，提升效果和降低成本。"
                },
                {
                  question: "在 Dify 中如何实现多轮对话的上下文管理？",
                  answer: "Dify 的聊天应用自动管理对话历史。原理：① 每次请求携带 conversation_id；② 后端从数据库加载该会话的历史消息；③ 将历史记录拼接到 Prompt 中（注意控制长度，避免超出上下文窗口）；④ 可选配置：最大历史轮数、摘要压缩、关键信息提取。开发者可通过 API 清除历史或手动注入上下文。"
                },
                {
                  question: "如何将 Dify 应用集成到现有系统中？",
                  answer: "方案：① RESTful API：通过 HTTP 请求调用 Dify 应用，支持同步/流式响应；② Webhook：配置回调地址接收异步结果；③ SDK：使用官方提供的 Python/JavaScript SDK；④ iframe 嵌入：将 Dify 聊天窗口嵌入网页；⑤ 自定义前端：调用 API 自行实现 UI。推荐方式：后端通过 API 调用 Dify，前端与自己的后端交互，保持架构清晰。"
                }
              ]}
            />
          </section>

          {/* 与 LangChain/LangGraph 对比 */}
          <section id="comparison" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              与 LangChain/LangGraph 对比
            </h2>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mb-4 text-[14px] sm:text-[15px]">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">维度</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Dify</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">LangChain/LangGraph</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">开发方式</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">低代码/无代码</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">代码优先</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">学习曲线</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">低（拖拽式）</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">高（需编程）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">灵活性</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">中（支持代码节点）</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">高（完全可编程）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">LLMOps</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">内置（开箱即用）</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">需自行搭建</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">部署运维</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">一键部署</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">需自行配置</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">适用人群</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">产品经理、业务人员、全栈开发者</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">专业开发者、AI 工程师</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">社区生态</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">快速增长中</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">成熟庞大</td>
                </tr>
              </tbody>
            </table>
            <Callout type="info" title="选择建议">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                <strong>使用 Dify：</strong>快速原型、非技术人员参与、需要内置 LLMOps、中小规模应用。<br/>
                <strong>使用 LangChain：</strong>高度定制、已有技术栈、大规模分布式系统、需要精细控制。<br/>
                <strong>混合使用：</strong>用 Dify 快速验证想法，确认可行后用 LangChain 重构为生产级代码。
              </p>
            </Callout>
          </section>

          {/* 关联知识点 */}
          <section id="related" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              关联知识点
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold text-ink mb-2">⛓️ LangChain 基础核心</h3>
                <p className="text-[14px] text-ink-muted">代码级别的 LLM 应用开发框架</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🕸️ LangGraph 核心架构</h3>
                <p className="text-[14px] text-ink-muted">基于图的状态机工作流引擎</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🎨 Agent 设计模式</h3>
                <p className="text-[14px] text-ink-muted">ReAct、Planner、Router 等 Agent 架构</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🔄 Workflow 工作流设计</h3>
                <p className="text-[14px] text-ink-muted">DAG、状态机、并发执行等工作流概念</p>
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
