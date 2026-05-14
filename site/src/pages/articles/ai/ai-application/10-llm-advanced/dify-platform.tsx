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
  { id: 'overview', text: 'Dify 平台架构', level: 2 },
  { id: 'core-features', text: '核心功能模块', level: 2 },
  { id: 'visual-workflow', text: '可视化工作流编排', level: 3 },
  { id: 'app-types', text: '应用类型', level: 3 },
  { id: 'model-management', text: '模型管理', level: 3 },
  { id: 'deployment', text: '应用部署与 LLMOps', level: 3 },
  { id: 'workflow', text: '典型工作流程', level: 2 },
  { id: 'code-example', text: '代码实战', level: 2 },
  { id: 'context-switch', text: '上下文切换', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '与传统开发对比', level: 2 },
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
                Dify 是一个开源的<strong>LLM 应用开发平台</strong>,提供可视化工作流编排、模型管理、应用部署和 LLMOps 全链路能力,让开发者通过低代码方式快速构建生产级 AI 应用。
              </p>
            </blockquote>
          </section>

          {/* Dify 平台架构 */}
          <section id="overview" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              Dify 平台架构
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify 采用模块化架构设计,将 AI 应用开发的各个环节解耦,提供从原型到生产的完整工具链:
            </p>
            <DiagramBlock title="Dify 平台整体架构">
              {`graph TB
    A[用户界面<br/>Web UI / API] --> B[应用层]
    B --> C[工作流引擎]
    B --> D[Agent 引擎]
    B --> E[RAG 引擎]
    
    C --> F[节点编排]
    D --> G[工具调用]
    E --> H[向量检索]
    
    F --> I[模型管理层]
    G --> I
    H --> I
    
    I --> J[LLM Providers<br/>OpenAI/Azure/本地模型]
    I --> K[向量数据库<br/>Chroma/Milvus/Qdrant]
    I --> L[知识库管理]
    
    style A fill:#e1f5ff
    style J fill:#d4edda
    style K fill:#fff3cd`}
            </DiagramBlock>
            <SideNote label="核心价值">
              Dify 的最大优势是<strong>降低 AI 应用开发门槛</strong>,通过可视化界面替代大量手写代码,同时保持足够的灵活性支持复杂场景。
            </SideNote>
          </section>

          {/* 核心功能模块 */}
          <section id="core-features" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              核心功能模块
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-6">
              Dify 提供四大核心功能模块,覆盖 AI 应用开发的完整生命周期:
            </p>

            <h3 id="visual-workflow" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              可视化工作流编排
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify 提供拖拽式工作流编辑器,支持多种节点类型:
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong>开始/结束节点</strong>:定义工作流入口和出口</li>
              <li><strong>LLM 节点</strong>:调用大模型生成内容</li>
              <li><strong>知识检索节点</strong>:从知识库中检索相关信息</li>
              <li><strong>代码节点</strong>:执行自定义 Python/JavaScript 代码</li>
              <li><strong>条件分支节点</strong>:根据条件路由到不同分支</li>
              <li><strong>迭代节点</strong>:循环处理列表数据</li>
              <li><strong>变量赋值节点</strong>:管理和转换变量</li>
            </ul>
            <Playground
              language="python"
              description="Dify 工作流 JSON 配置示例"
              code={`{
  "workflow": {
    "nodes": [
      {
        "id": "start",
        "type": "start",
        "data": {
          "title": "开始",
          "variables": [
            {"key": "query", "type": "string", "required": true}
          ]
        }
      },
      {
        "id": "llm_node",
        "type": "llm",
        "data": {
          "title": "LLM 回答",
          "model": "gpt-4",
          "prompt": "请回答用户问题: {{query}}",
          "temperature": 0.7
        }
      },
      {
        "id": "end",
        "type": "end",
        "data": {
          "title": "结束",
          "outputs": [
            {"key": "answer", "value": "{{llm_node.output}}"}
          ]
        }
      }
    ],
    "edges": [
      {"source": "start", "target": "llm_node"},
      {"source": "llm_node", "target": "end"}
    ]
  }
}`}
            />

            <h3 id="app-types" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              应用类型
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify 支持三种主要应用类型,满足不同场景需求:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-[14px]">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">应用类型</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">适用场景</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">特点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>聊天助手</strong></td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">客服机器人、智能问答</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">支持多轮对话、记忆管理</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>文本生成</strong></td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">文章写作、代码生成</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">单次输入输出、结构化模板</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>工作流应用</strong></td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">复杂业务逻辑、多步骤任务</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">可视化编排、灵活定制</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 id="model-management" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              模型管理
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify 支持多种 LLM 提供商,统一管理模型配置:
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong>云端模型</strong>:OpenAI GPT、Azure OpenAI、Anthropic Claude、Google Gemini</li>
              <li><strong>本地模型</strong>:Llama 2/3、Qwen、ChatGLM(通过 Ollama、vLLM 部署)</li>
              <li><strong>Embedding 模型</strong>:text-embedding-ada-002、bge-m3、text2vec</li>
              <li><strong>模型参数配置</strong>:temperature、top_p、max_tokens、presence_penalty</li>
            </ul>
            <Playground
              language="python"
              description="配置多个 LLM 提供商"
              code={`# Dify 支持同时配置多个模型提供商
# 在管理后台添加以下配置:

# 1. OpenAI
{
  "provider": "openai",
  "api_key": "sk-xxx",
  "models": ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo"]
}

# 2. Azure OpenAI
{
  "provider": "azure_openai",
  "api_key": "xxx",
  "api_base": "https://xxx.openai.azure.com/",
  "api_version": "2024-02-15-preview"
}

# 3. 本地 Ollama
{
  "provider": "ollama",
  "base_url": "http://localhost:11434",
  "models": ["llama3:8b", "qwen:7b"]
}

# 应用时可动态切换模型
response = llm.generate(
    prompt=user_input,
    model="gpt-4",  # 或 "llama3:8b"
    temperature=0.7
)`}
            />

            <h3 id="deployment" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              应用部署与 LLMOps
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify 提供完整的应用部署和运维能力:
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong>API 发布</strong>:自动生成 RESTful API,支持 Webhook 回调</li>
              <li><strong>嵌入代码</strong>:提供 JavaScript SDK,一键嵌入网站</li>
              <li><strong>监控面板</strong>:实时监控 Token 消耗、响应时间、错误率</li>
              <li><strong>日志追踪</strong>:完整记录每次请求的输入输出、耗时、成本</li>
              <li><strong>A/B 测试</strong>:对比不同模型或 Prompt 的效果</li>
              <li><strong>版本管理</strong>:支持应用版本回滚和历史对比</li>
            </ul>
          </section>

          {/* 典型工作流程 */}
          <section id="workflow" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              典型工作流程
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              使用 Dify 构建 AI 应用的标准流程:
            </p>
            <DiagramBlock title="Dify 应用开发流程">
              {`sequenceDiagram
    participant Dev as 开发者
    participant Dify as Dify 平台
    participant Model as LLM Provider
    participant User as 最终用户
    
    Note over Dev,Dify: 阶段一:应用创建
    Dev->>Dify: 1. 创建应用(选择类型)
    Dev->>Dify: 2. 配置模型和 Prompt
    Dev->>Dify: 3. 编排工作流(可选)
    Dev->>Dify: 4. 上传知识库(可选)
    
    Note over Dev,Dify: 阶段二:测试调试
    Dev->>Dify: 5. 在线测试应用
    Dify->>Model: 6. 调用 LLM
    Model-->>Dify: 7. 返回结果
    Dify-->>Dev: 8. 展示响应
    Dev->>Dev: 9. 调整参数/Prompt
    
    Note over Dev,User: 阶段三:部署上线
    Dev->>Dify: 10. 发布应用
    Dify->>Dify: 11. 生成 API Key
    User->>Dify: 12. 调用 API
    Dify->>Model: 13. 转发请求
    Model-->>Dify: 14. 返回答案
    Dify-->>User: 15. 返回结果
    
    Note over Dev,Dify: 阶段四:监控优化
    Dify->>Dev: 16. 推送监控数据
    Dev->>Dev: 17. 分析日志和优化`}
            </DiagramBlock>
            <Callout type="tip" title="快速上手建议">
              首次使用 Dify 时,建议从<strong>聊天助手</strong>类型开始,熟悉基础配置后再尝试工作流编排。Dify 提供丰富的模板库,可直接复用最佳实践。
            </Callout>
          </section>

          {/* 代码实战 */}
          <section id="code-example" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              代码实战:调用 Dify API
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify 应用发布后,可通过 RESTful API 调用。以下是 Python 和 JavaScript 示例:
            </p>
            <Playground
              language="python"
              description="Python 调用 Dify Chat API"
              code={`import requests
import json

# Dify API 配置
API_BASE_URL = "https://api.dify.ai/v1"
API_KEY = "your-api-key-here"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# 发送聊天消息
def send_message(query, conversation_id=None):
    payload = {
        "inputs": {},
        "query": query,
        "response_mode": "streaming",  # 或 "blocking"
        "conversation_id": conversation_id,
        "user": "user-123"
    }
    
    response = requests.post(
        f"{API_BASE_URL}/chat-messages",
        headers=headers,
        json=payload,
        stream=True
    )
    
    # 处理流式响应
    for line in response.iter_lines():
        if line:
            data = json.loads(line.decode('utf-8').replace('data: ', ''))
            if data.get('answer'):
                print(data['answer'], end='', flush=True)
    
    return data.get('conversation_id')

# 使用示例
conv_id = send_message("你好,请介绍一下 Dify")
send_message("它有哪些核心功能?", conv_id)`}
            />
            <Playground
              language="javascript"
              description="JavaScript 嵌入 Dify 聊天窗口"
              code={`// 在 HTML 中嵌入 Dify 聊天窗口
<script>
window.difyChatbotConfig = {
  token: 'your-app-token',
  baseUrl: 'https://udify.app',
  inputs: {
    // 预填充变量
    username: '访客'
  },
  theme: {
    textColor: '#ffffff',
    primaryColor: '#155EEF'
  }
}
</script>
<script
  src="https://udify.app/embed.min.js"
  id="dify-chatbot"
  defer
></script>

// 或通过 API 调用
async function chatWithDify(query) {
  const response = await fetch('https://api.dify.ai/v1/chat-messages', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your-api-key',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: {},
      query: query,
      response_mode: 'blocking',
      user: 'user-123'
    })
  });
  
  const data = await response.json();
  return data.answer;
}

// 使用
chatWithDify('什么是 RAG?').then(console.log);`}
            />
          </section>

          {/* 上下文切换 */}
          <section id="context-switch" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              上下文切换:不同开发模式对比
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              根据项目需求选择合适的开发模式:
            </p>
            
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-ink mb-2 flex items-center gap-2">
                  <span className="text-accent">🌱</span> 低代码模式(推荐新手)
                </h3>
                <Playground
                  language="python"
                  description="通过 Dify Web UI 零代码构建应用"
                  code={`# 无需编写代码,通过以下步骤完成:

# 1. 登录 Dify 管理后台
# 2. 点击"创建应用" → 选择"聊天助手"
# 3. 在"提示词编排"页面:
#    - 设置系统提示词: "你是一个专业的技术顾问"
#    - 选择模型: gpt-4
#    - 调整参数: temperature=0.7
# 4. 点击"预览"测试效果
# 5. 点击"发布"获取 API Key

# 优势:
# - 无需编程基础
# - 可视化配置,即时反馈
# - 内置最佳实践模板
# - 适合快速原型验证

# 劣势:
# - 复杂逻辑实现受限
# - 自定义能力有限`}
                />
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-ink mb-2 flex items-center gap-2">
                  <span className="text-indigo-500">⚙️</span> 工作流模式(中等复杂度)
                </h3>
                <Playground
                  language="python"
                  description="通过可视化工作流实现复杂逻辑"
                  code={`# 创建工作流应用的典型场景:

# 场景:智能文档审核系统
# 工作流节点:
# 1. 开始节点:接收文档内容
# 2. LLM 节点:提取关键信息
# 3. 代码节点:验证格式合规性
# 4. 条件分支:判断是否通过
#    - 是 → 5a. LLM 节点:生成通过报告
#    - 否 → 5b. LLM 节点:生成修改建议
# 6. 结束节点:返回审核结果

# 优势:
# - 可视化编排,逻辑清晰
# - 支持条件分支和循环
# - 可嵌入自定义代码
# - 适合中等复杂度业务

# 劣势:
# - 学习曲线较陡
# - 调试相对困难`}
                />
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-ink mb-2 flex items-center gap-2">
                  <span className="text-purple-500">🔧</span> API 集成模式(高度定制)
                </h3>
                <Playground
                  language="python"
                  description="通过 API 深度集成到现有系统"
                  code={`from fastapi import FastAPI, HTTPException
from dify_client import DifyClient

app = FastAPI()
dify = DifyClient(api_key="your-api-key")

@app.post("/api/ask")
async def ask_question(question: str, user_id: str):
    """集成 Dify 到自有后端"""
    try:
        # 调用 Dify Chat API
        response = dify.chat(
            query=question,
            user=user_id,
            response_mode="blocking"
        )
        
        # 记录日志
        log_interaction(user_id, question, response['answer'])
        
        return {
            "answer": response['answer'],
            "sources": response.get('retriever_resources', []),
            "tokens_used": response['metadata']['usage']['total_tokens']
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 优势:
# - 完全控制业务逻辑
# - 可与现有系统无缝集成
# - 支持自定义认证、限流
# - 适合生产环境

# 劣势:
# - 需要后端开发能力
# - 需自行处理错误和重试`}
                />
              </div>
            </div>
          </section>

          {/* 常见误区 */}
          <section id="misconceptions" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              常见误区
            </h2>
            
            <Callout type="danger" title="误区 1:Dify 只能用于简单场景">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                <strong>事实</strong>:Dify 的工作流引擎支持复杂业务逻辑,包括条件分支、循环、变量转换、代码执行等。许多企业用它构建生产级应用,如智能客服、文档审核、数据分析等。对于极端复杂场景,可通过 API 集成到自定义后端。
              </p>
            </Callout>

            <Callout type="danger" title="误区 2:低代码意味着性能差">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                <strong>事实</strong>:Dify 底层仍是标准代码执行,低代码只是交互方式。性能瓶颈通常在 LLM 调用而非平台本身。Dify 提供异步处理、缓存、批量请求等优化手段,合理配置可达到与手写代码相当的性能。
              </p>
            </Callout>

            <Callout type="danger" title="误区 3:锁定 Dify 无法迁移">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                <strong>事实</strong>:Dify 是开源项目,工作流配置以 JSON 格式存储,可导出备份。API 调用遵循标准 RESTful 规范,切换平台只需修改 endpoint。核心 Prompt 和业务逻辑与平台无关,迁移成本较低。
              </p>
            </Callout>

            <Callout type="warning" title="误区 4:忽略成本和配额管理">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                <strong>事实</strong>:Dify 本身不收取费用,但调用的 LLM 服务(如 OpenAI)按 Token 计费。务必在 Dify 监控面板关注 Token 消耗,设置预算告警。对于高频调用场景,建议使用本地模型或缓存策略降低成本。
              </p>
            </Callout>
          </section>

          {/* 面试真题 */}
          <section id="interview" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              面试真题
            </h2>
            <InterviewSection
              questions={[
                {
                  question: "Dify 的核心优势是什么?适合哪些场景?",
                  answer: "Dify 的核心优势:(1)低代码开发:可视化工作流编排,降低 AI 应用开发门槛;(2)全链路能力:覆盖从原型到生产的完整流程,包括模型管理、应用部署、监控运维;(3)灵活性:支持多种应用类型(聊天、文本生成、工作流),可集成自定义代码;(4)开源生态:社区活跃,插件丰富。适合场景:快速原型验证、中小型企业 AI 应用、内部工具开发、教育演示等。不适合极端高性能或高度定制化场景。"
                },
                {
                  question: "Dify 的工作流引擎如何实现条件分支和循环?",
                  answer: "Dify 工作流引擎通过专用节点实现控制流:(1)条件分支节点:根据表达式(如 '{{variable}} > 10')路由到不同分支,支持 if-else 逻辑;(2)迭代节点:对列表类型变量进行循环处理,每次迭代执行子工作流,类似 for 循环;(3)变量赋值节点:在运行时动态修改变量值,实现状态管理。这些节点组合可实现复杂业务逻辑,如多轮审批、数据清洗流水线等。关键在于理解变量的作用域和数据流转。"
                },
                {
                  question: "如何在 Dify 中集成自定义工具或 API?",
                  answer: "Dify 支持三种集成方式:(1)内置工具:平台预置了网页搜索、代码执行、图像生成等工具,直接拖拽使用;(2)自定义工具:通过 OpenAPI 规范定义外部 API,在'工具'页面导入 Swagger/YAML 文件,配置认证信息后即可在工作流中调用;(3)代码节点:在 Python/JavaScript 代码节点中直接编写 HTTP 请求,调用任意 API。推荐优先使用自定义工具方式,便于管理和复用。"
                },
                {
                  question: "Dify 的 RAG 功能与 LangChain/LlamaIndex 有何区别?",
                  answer: "区别在于抽象层级和使用方式:(1)Dify:提供开箱即用的 RAG 功能,通过 Web UI 上传文档、配置检索策略,无需编写代码。适合快速搭建知识库问答。(2)LlamaIndex:专注数据处理和检索,提供细粒度的索引构建和查询优化 API,需要编写 Python 代码。适合需要精细控制检索逻辑的场景。(3)LangChain:通用框架,RAG 只是其中一种 Chain 类型,可与其他组件(如 Agent)组合。适合构建复杂的多步推理应用。三者可配合使用,如在 Dify 中调用 LlamaIndex 作为自定义工具。"
                },
                {
                  question: "如何优化 Dify 应用的性能和成本?",
                  answer: "优化策略包括:(1)模型选择:根据场景选择性价比高的模型,如用 gpt-3.5-turbo 替代 gpt-4;(2)Prompt 优化:精简 Prompt,减少不必要的上下文;(3)缓存机制:对常见问题启用答案缓存,避免重复调用 LLM;(4)流式响应:使用 streaming 模式提升用户体验,减少等待焦虑;(5)批量处理:合并多个请求为一次调用;(6)监控分析:定期查看 Dify 监控面板,识别高消耗接口并优化;(7)本地模型:对非敏感数据使用本地部署的 Llama/Qwen 模型,降低 API 成本。"
                },
                {
                  question: "Dify 支持哪些部署方式?如何选择?",
                  answer: "Dify 支持三种部署方式:(1)SaaS 版(dify.ai):官方托管,无需运维,适合个人和小团队快速上手;(2)自托管 Docker:通过 docker-compose 部署到自有服务器,数据可控,适合企业对数据安全有要求的场景;(3)Kubernetes:支持大规模集群部署,适合高并发生产环境。选择建议:原型阶段用 SaaS,验证可行性后迁移到自托管;中小企业用 Docker 单机部署;大型企业用 K8s 集群。注意自托管需自行负责备份、监控和安全加固。"
                }
              ]}
            />
          </section>

          {/* 对比表格 */}
          <section id="comparison" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              与传统开发对比
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dify 低代码平台与传统手写代码开发方式的对比:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-[14px]">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">维度</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Dify 低代码</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">传统手写代码</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">开发速度</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">快(小时级)</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">慢(天/周级)</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">学习曲线</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">平缓,可视化操作</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">陡峭,需掌握框架</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">灵活性</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">中等,受平台限制</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">高,完全可控</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">维护成本</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">低,平台自动升级</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">高,需自行维护</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">性能优化</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">有限,依赖平台能力</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">充分,可深度调优</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">适用团队</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">产品/运营/初级开发</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">资深开发工程师</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">典型场景</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">原型验证、内部工具、客服机器人</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">核心业务系统、高并发应用</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Callout type="info" title="选择建议">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                <strong>优先使用 Dify</strong>:快速验证想法、构建 MVP、内部工具、非核心业务。<strong>优先手写代码</strong>:高性能要求、复杂定制、核心交易系统、已有技术栈深度集成。实际项目中可混合使用,用 Dify 快速原型,验证后用代码重构核心部分。
              </p>
            </Callout>
          </section>

          {/* 关联知识点 */}
          <section id="related" className="mb-10">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              关联知识点
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🔗 LangChain 基础核心</h3>
                <p className="text-[14px] text-ink-muted">学习通用 LLM 应用开发框架,对比低代码与代码方式</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors">
                <h3 className="font-semibold text-ink mb-2">📊 Workflow 工作流设计</h3>
                <p className="text-[14px] text-ink-muted">深入理解 DAG、状态机、重试机制等工作流核心概念</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors">
                <h3 className="font-semibold text-ink mb-2">🤖 Agent 设计模式</h3>
                <p className="text-[14px] text-ink-muted">学习 ReAct、Planner-Executor 等高级 Agent 架构</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors">
                <h3 className="font-semibold text-ink mb-2">📚 RAG 基础概念</h3>
                <p className="text-[14px] text-ink-muted">了解检索增强生成的原理,优化 Dify 知识库配置</p>
              </div>
            </div>
          </section>

          {/* ⚠️ ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </div>
      </div>
      
      {/* ⚠️ SmartTOC 直接渲染,不要用 <aside> 包裹! */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
