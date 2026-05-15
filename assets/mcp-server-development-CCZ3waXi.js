import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as i}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as r}from"./SideNote-BKvanovA.js";import{C as t,A as a,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as p}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"mcp-overview",text:"一、MCP 协议概述",level:2},{id:"architecture",text:"二、MCP 架构设计",level:2},{id:"transport",text:"三、传输层实现",level:2},{id:"resources",text:"四、Resources 资源管理",level:2},{id:"tools",text:"五、Tools 工具调用",level:2},{id:"prompts",text:"六、Prompts 提示模板",level:2},{id:"server-implementation",text:"七、Server 开发实战",level:2},{id:"client-integration",text:"八、Client 集成示例",level:2},{id:"security",text:"九、安全与权限控制",level:2},{id:"misconceptions",text:"十、常见误区",level:2},{id:"interview",text:"十一、面试真题",level:2},{id:"related",text:"十二、知识关联",level:2}];function y({meta:o}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(i,{meta:o,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["MCP（Model Context Protocol）是 Anthropic 提出的",e.jsx("strong",{className:"text-accent",children:"开放协议"}),"，用于标准化 LLM 应用与外部数据源、工具的交互方式，通过 Resources、Tools、Prompts 三大核心概念，实现上下文管理的解耦和复用。"]})}),e.jsx(t,{type:"tip",title:"为什么需要 MCP？",children:"当前 LLM 应用中，每个应用都需要单独实现数据连接、工具调用和提示管理，导致重复开发和碎片化。MCP 通过标准化协议，让开发者可以构建可复用的 MCP Server，多个 Client（如 Claude Desktop、Cursor）可以共享这些能力。"}),e.jsx("h2",{id:"mcp-overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、MCP 协议概述"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"MCP 由 Anthropic 在 2024 年发布，旨在解决 LLM 应用中的上下文管理问题，类似于 USB-C 统一接口标准。"}),e.jsx(p,{title:"MCP 生态系统",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   MCP Host   │◀───────▶│  MCP Server  │◀───────▶│ Data Sources │
│  (Claude)    │  JSON-RPC│  (Custom)    │  API    │ (DB, Files,  │
│              │         │              │         │  APIs, etc.) │
└──────────────┘         └──────────────┘         └──────────────┘
       ▲                         ▲
       │                         │
       │                   ┌─────┴─────┐
       │                   │ MCP SDKs  │
       │                   │ Python/TS │
       └───────────────────┘           │
                                 ┌─────┴─────┐
                                 │  Clients  │
                                 │ (Multiple)│
                                 └───────────┘

MCP Server 提供三大能力：
• Resources：结构化数据访问（文件、数据库、API）
• Tools：可执行操作（搜索、计算、外部 API 调用）
• Prompts：预定义提示模板（代码审查、文档生成）
            `})}),e.jsxs(r,{label:"类比理解",children:["MCP Server 类似于",e.jsx("strong",{children:"浏览器扩展"}),"：为 LLM 提供额外能力，但通过标准化协议而非私有 API。就像多个网站可以使用同一个浏览器插件，多个 LLM 应用可以共享同一个 MCP Server。"]}),e.jsx("h2",{id:"architecture",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、MCP 架构设计"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"MCP 采用客户端-服务器架构，基于 JSON-RPC 2.0 协议进行通信。"}),e.jsx(s,{code:`# MCP 核心组件

# 1. MCP Host（宿主应用）
# - Claude Desktop、Cursor、 Windsurf 等
# - 负责加载和管理 MCP Servers
# - 提供用户界面和 LLM 能力

# 2. MCP Server（服务器）
# - 开发者自定义的服务
# - 暴露 Resources、Tools、Prompts
# - 可以是本地进程或远程服务

# 3. MCP Client（客户端库）
# - Python/TypeScript SDK
# - 处理 JSON-RPC 通信
# - 自动发现和管理 Server 能力

# 4. Transport Layer（传输层）
# - stdio：本地进程通信（最常用）
# - SSE：Server-Sent Events（远程服务）
# - HTTP：未来可能支持

# 通信流程
# 1. Host 启动 Server（stdio）或连接远程 Server（SSE）
# 2. Server 声明能力（capabilities）
# 3. Client 订阅感兴趣的能力
# 4. 按需调用 Resources/Tools/Prompts`,language:"python",highlights:[5,11,17,23,30],filename:"mcp-architecture.py",description:"MCP 架构组件"}),e.jsxs(t,{type:"info",title:"JSON-RPC 2.0",children:["MCP 使用 JSON-RPC 2.0 作为通信协议，这是一种轻量级的远程过程调用协议。消息格式：",e.jsx("pre",{className:"mt-2 p-3 bg-parchment-deep rounded-paper-sm font-mono text-[12px]",children:'{"jsonrpc": "2.0", "method": "tools/call", "params": {...}, "id": 1}'}),"支持请求-响应模式和通知（无响应的单向消息）。"]}),e.jsx("h2",{id:"transport",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、传输层实现"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"MCP 支持多种传输方式，最常用的是 stdio（本地）和 SSE（远程）。"}),e.jsx(s,{code:`# 传输方式对比

# 1. stdio（标准输入输出）
# 适用场景：本地进程，如 Claude Desktop 加载本地 Server
# 优点：简单、低延迟、无需网络配置
# 缺点：仅限本地，无法跨机器通信

# Server 端示例（Python）
import asyncio
from mcp.server import Server
from mcp.server.stdio import stdio_server

app = Server("my-server")

async def main():
    async with stdio_server() as streams:
        await app.run(
            streams[0],  # stdin
            streams[1],  # stdout
            app.create_initialization_options()
        )

# 2. SSE（Server-Sent Events）
# 适用场景：远程服务，如云端 MCP Server
# 优点：支持远程访问，易于部署
# 缺点：需要 HTTP 服务器，延迟较高

# Server 端示例（Python + FastAPI）
from mcp.server.sse import SseServerTransport
from starlette.applications import Starlette

sse = SseServerTransport("/messages/")

async def handle_sse(request):
    async with sse.connect_sse(
        request.scope, request.receive, request._send
    ) as streams:
        await app.run(streams[0], streams[1], options)

# 3. 配置示例（Claude Desktop）
# claude_desktop_config.json
{
  "mcpServers": {
    "local-server": {
      "command": "python",
      "args": ["-m", "my_mcp_server"]
    },
    "remote-server": {
      "url": "https://example.com/mcp",
      "headers": {
        "Authorization": "Bearer token123"
      }
    }
  }
}`,language:"python",highlights:[10,25,35,47],filename:"mcp-transport.py",description:"MCP 传输层实现"}),e.jsxs(r,{label:"选择传输方式",children:[e.jsx("strong",{children:"本地开发"}),"：优先使用 stdio，简单高效。",e.jsx("br",{}),e.jsx("strong",{children:"生产环境"}),"：如果需要多用户共享或远程访问，使用 SSE + HTTPS。",e.jsx("br",{}),e.jsx("strong",{children:"混合模式"}),"：可以同时支持 stdio 和 SSE，根据部署场景自动选择。"]}),e.jsx("h2",{id:"resources",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、Resources 资源管理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Resources 提供对结构化数据的只读访问，如文件、数据库记录、API 响应等。"}),e.jsx(s,{code:`# Resources 实现示例

from mcp.server import Server
from mcp.types import Resource

app = Server("file-reader")

# 定义资源列表
@app.list_resources()
async def list_resources() -> list[Resource]:
    return [
        Resource(
            uri="file:///home/user/documents/readme.md",
            name="README",
            description="项目说明文档",
            mimeType="text/markdown"
        ),
        Resource(
            uri="db://users/123",
            name="User Profile",
            description="用户个人信息",
            mimeType="application/json"
        )
    ]

# 读取资源内容
@app.read_resource()
async def read_resource(uri: str) -> str:
    if uri.startswith("file://"):
        path = uri.replace("file://", "")
        with open(path, "r") as f:
            return f.read()
    
    elif uri.startswith("db://"):
        # 从数据库读取
        user_id = uri.split("/")[-1]
        user = db.query_user(user_id)
        return json.dumps(user)
    
    else:
        raise ValueError(f"Unsupported URI: {uri}")

# LLM 可以通过以下方式访问资源
# "请读取 file:///home/user/documents/readme.md 并总结内容"
# "查询 db://users/123 的用户信息"

# 动态资源（支持通配符）
@app.list_resources()
async def list_dynamic_resources() -> list[Resource]:
    # 列出某个目录下的所有文件
    files = os.listdir("/home/user/documents")
    return [
        Resource(
            uri=f"file:///home/user/documents/{f}",
            name=f,
            mimeType="text/plain"
        )
        for f in files
    ]`,language:"python",highlights:[9,25,38,51],filename:"mcp-resources.py",description:"MCP Resources 实现"}),e.jsx(t,{type:"tip",title:"Resources 最佳实践",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"URI 规范"}),"：使用标准 URI scheme（file://、db://、http://）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"懒加载"}),"：list_resources 返回元数据，read_resource 才加载内容"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"缓存策略"}),"：对于频繁访问的资源，实现缓存机制"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"权限控制"}),"：敏感资源需要验证用户身份"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"错误处理"}),"：资源不存在时返回清晰的错误信息"]})]})}),e.jsx("h2",{id:"tools",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、Tools 工具调用"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Tools 允许 LLM 执行操作，如搜索、计算、调用外部 API 等，是 MCP 的核心价值所在。"}),e.jsx(s,{code:`# Tools 实现示例

from mcp.server import Server
from mcp.types import Tool, TextContent

app = Server("calculator")

# 定义工具
@app.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="calculate",
            description="执行数学计算",
            inputSchema={
                "type": "object",
                "properties": {
                    "expression": {
                        "type": "string",
                        "description": "数学表达式，如 '2 + 3 * 4'"
                    }
                },
                "required": ["expression"]
            }
        ),
        Tool(
            name="search_web",
            description="搜索网络信息",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "搜索关键词"
                    },
                    "limit": {
                        "type": "integer",
                        "description": "返回结果数量",
                        "default": 5
                    }
                },
                "required": ["query"]
            }
        )
    ]

# 调用工具
@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "calculate":
        expression = arguments["expression"]
        try:
            # 注意：生产环境应使用安全的表达式解析器
            result = eval(expression)
            return [TextContent(type="text", text=str(result))]
        except Exception as e:
            return [TextContent(type="text", text=f"Error: {str(e)}")]
    
    elif name == "search_web":
        query = arguments["query"]
        limit = arguments.get("limit", 5)
        
        # 调用搜索引擎 API
        results = search_engine.search(query, limit=limit)
        
        # 格式化结果
        formatted = "\\n".join([
            f"{i+1}. {r['title']}\\n   {r['snippet']}"
            for i, r in enumerate(results)
        ])
        
        return [TextContent(type="text", text=formatted)]
    
    else:
        raise ValueError(f"Unknown tool: {name}")

# LLM 使用示例
# 用户："计算 2 + 3 * 4 的结果"
# LLM 调用：call_tool("calculate", {"expression": "2 + 3 * 4"})
# 返回："14"`,language:"python",highlights:[10,33,49,60],filename:"mcp-tools.py",description:"MCP Tools 实现"}),e.jsx(r,{label:"Tool Schema 设计",children:"inputSchema 遵循 JSON Schema 规范，LLM 会根据 schema 自动生成参数。良好的 schema 设计包括：清晰的字段描述、合理的默认值、严格的类型约束。这直接影响 LLM 调用的准确性。"}),e.jsx("h2",{id:"prompts",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、Prompts 提示模板"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Prompts 提供预定义的提示模板，帮助 LLM 完成特定任务，如代码审查、文档生成等。"}),e.jsx(s,{code:`# Prompts 实现示例

from mcp.server import Server
from mcp.types import Prompt, PromptMessage, TextContent

app = Server("code-reviewer")

# 定义提示模板
@app.list_prompts()
async def list_prompts() -> list[Prompt]:
    return [
        Prompt(
            name="code_review",
            description="代码审查助手",
            arguments=[
                {
                    "name": "language",
                    "description": "编程语言",
                    "required": True
                },
                {
                    "name": "code",
                    "description": "待审查的代码",
                    "required": True
                }
            ]
        ),
        Prompt(
            name="generate_docs",
            description="生成文档注释",
            arguments=[
                {
                    "name": "function_name",
                    "description": "函数名称",
                    "required": True
                },
                {
                    "name": "doc_style",
                    "description": "文档风格（google/sphinx/numpy）",
                    "required": False,
                    "default": "google"
                }
            ]
        )
    ]

# 获取提示内容
@app.get_prompt()
async def get_prompt(name: str, arguments: dict) -> list[PromptMessage]:
    if name == "code_review":
        language = arguments["language"]
        code = arguments["code"]
        
        system_prompt = f"""你是一个专业的 {language} 代码审查专家。
请从以下角度审查代码：
1. 代码规范和最佳实践
2. 潜在的性能问题
3. 安全隐患
4. 可维护性建议

请用中文回复，先给出总体评价，再列出具体问题和建议。"""
        
        return [
            PromptMessage(
                role="system",
                content=TextContent(type="text", text=system_prompt)
            ),
            PromptMessage(
                role="user",
                content=TextContent(type="text", text=f"请审查以下代码：\\n\\n{code}")
            )
        ]
    
    elif name == "generate_docs":
        function_name = arguments["function_name"]
        doc_style = arguments.get("doc_style", "google")
        
        templates = {
            "google": f'"""\\n简短描述。\\n\\nArgs:\\n    param: 参数说明\\n\\nReturns:\\n    返回值说明\\n"""',
            "sphinx": f':param param: 参数说明\\n:return: 返回值说明',
            "numpy": f'Parameters\\n----------\\nparam : type\\n    参数说明\\n\\nReturns\\n-------\\ntype\\n    返回值说明'
        }
        
        return [
            PromptMessage(
                role="user",
                content=TextContent(
                    type="text",
                    text=f"为函数 {function_name} 生成 {doc_style} 风格的文档注释。\\n模板：{templates[doc_style]}"
                )
            )
        ]
    
    else:
        raise ValueError(f"Unknown prompt: {name}")

# LLM 使用示例
# 用户："使用 code_review 模板审查这段 Python 代码"
# LLM 调用：get_prompt("code_review", {"language": "python", "code": "..."})
# 返回：包含 system prompt 和用户代码的完整对话`,language:"python",highlights:[10,42,56,75],filename:"mcp-prompts.py",description:"MCP Prompts 实现"}),e.jsxs(t,{type:"info",title:"Prompts vs Tools",children:[e.jsx("strong",{children:"Prompts"}),"：提供静态的提示模板，LLM 填充参数后直接使用。适合固定流程的任务（如代码审查、文档生成）。",e.jsx("br",{}),e.jsx("strong",{children:"Tools"}),"：执行动态操作，返回实时数据。适合需要外部交互的场景（如搜索、计算、API 调用）。",e.jsx("br",{}),"两者可以结合使用：先用 Prompt 生成计划，再用 Tools 执行具体操作。"]}),e.jsx("h2",{id:"server-implementation",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、Server 开发实战"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"完整的 MCP Server 通常同时提供 Resources、Tools 和 Prompts。"}),e.jsx(s,{code:`# 完整的 MCP Server 示例：GitHub 助手

from mcp.server import Server
from mcp.types import Resource, Tool, Prompt, TextContent
import requests

app = Server("github-helper")

GITHUB_TOKEN = "your_token_here"
HEADERS = {"Authorization": f"token {GITHUB_TOKEN}"}

# === Resources ===
@app.list_resources()
async def list_resources() -> list[Resource]:
    return [
        Resource(
            uri="github://repos/{owner}/{repo}/issues",
            name="Repository Issues",
            description="GitHub 仓库的 Issue 列表"
        )
    ]

@app.read_resource()
async def read_resource(uri: str) -> str:
    if uri.startswith("github://repos/"):
        parts = uri.replace("github://repos/", "").split("/")
        owner, repo, resource_type = parts[0], parts[1], parts[2]
        
        if resource_type == "issues":
            response = requests.get(
                f"https://api.github.com/repos/{owner}/{repo}/issues",
                headers=HEADERS
            )
            return response.text
    
    raise ValueError(f"Unsupported URI: {uri}")

# === Tools ===
@app.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="search_repositories",
            description="搜索 GitHub 仓库",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "搜索关键词"},
                    "language": {"type": "string", "description": "编程语言过滤"}
                },
                "required": ["query"]
            }
        ),
        Tool(
            name="create_issue",
            description="创建 GitHub Issue",
            inputSchema={
                "type": "object",
                "properties": {
                    "owner": {"type": "string"},
                    "repo": {"type": "string"},
                    "title": {"type": "string"},
                    "body": {"type": "string"}
                },
                "required": ["owner", "repo", "title"]
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "search_repositories":
        query = arguments["query"]
        language = arguments.get("language", "")
        
        params = {"q": query}
        if language:
            params["q"] += f" language:{language}"
        
        response = requests.get(
            "https://api.github.com/search/repositories",
            params=params,
            headers=HEADERS
        )
        
        repos = response.json()["items"][:5]
        result = "\\n".join([
            f"- {r['full_name']}: {r['description'] or 'No description'}"
            for r in repos
        ])
        
        return [TextContent(type="text", text=result)]
    
    elif name == "create_issue":
        owner = arguments["owner"]
        repo = arguments["repo"]
        title = arguments["title"]
        body = arguments.get("body", "")
        
        response = requests.post(
            f"https://api.github.com/repos/{owner}/{repo}/issues",
            json={"title": title, "body": body},
            headers=HEADERS
        )
        
        if response.status_code == 201:
            issue_url = response.json()["html_url"]
            return [TextContent(type="text", text=f"Issue created: {issue_url}")]
        else:
            return [TextContent(type="text", text=f"Error: {response.text}")]
    
    raise ValueError(f"Unknown tool: {name}")

# === Prompts ===
@app.list_prompts()
async def list_prompts() -> list[Prompt]:
    return [
        Prompt(
            name="review_pr",
            description="Pull Request 审查助手",
            arguments=[
                {"name": "repo", "description": "仓库名称", "required": True},
                {"name": "pr_number", "description": "PR 编号", "required": True}
            ]
        )
    ]

@app.get_prompt()
async def get_prompt(name: str, arguments: dict) -> list[PromptMessage]:
    if name == "review_pr":
        repo = arguments["repo"]
        pr_number = arguments["pr_number"]
        
        # 获取 PR 详情
        response = requests.get(
            f"https://api.github.com/repos/{repo}/pulls/{pr_number}",
            headers=HEADERS
        )
        pr_data = response.json()
        
        system_prompt = """你是一个资深的代码审查专家。
请从以下角度审查 Pull Request：
1. 代码质量和规范性
2. 潜在的 Bug 和边界情况
3. 性能优化建议
4. 安全性检查

请用中文回复，语气友好且专业。"""
        
        return [
            PromptMessage(
                role="system",
                content=TextContent(type="text", text=system_prompt)
            ),
            PromptMessage(
                role="user",
                content=TextContent(
                    type="text",
                    text=f"PR 标题：{pr_data['title']}\\n\\n描述：{pr_data['body']}\\n\\n请审查这个 PR。"
                )
            )
        ]
    
    raise ValueError(f"Unknown prompt: {name}")

# === 启动服务器 ===
if __name__ == "__main__":
    import asyncio
    from mcp.server.stdio import stdio_server
    
    async def main():
        async with stdio_server() as streams:
            await app.run(
                streams[0],
                streams[1],
                app.create_initialization_options()
            )
    
    asyncio.run(main())`,language:"python",highlights:[13,40,63,107,137,177],filename:"mcp-github-server.py",description:"完整的 MCP Server 示例"}),e.jsxs(r,{label:"开发调试技巧",children:["① 使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"mcp dev"})," 命令本地测试 Server；② 启用详细日志记录 JSON-RPC 消息；③ 使用 Postman 或 curl 测试 SSE 端点；④ 参考官方 SDK 示例代码。"]}),e.jsx("h2",{id:"client-integration",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、Client 集成示例"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"MCP Client 可以嵌入到任何 LLM 应用中，实现标准化的上下文管理。"}),e.jsx(s,{code:`# MCP Client 集成示例（Python）

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

# 配置 Server 参数
server_params = StdioServerParameters(
    command="python",
    args=["-m", "my_mcp_server"],
    env={"PATH": "/usr/bin"}
)

# 连接到 Server
async with stdio_client(server_params) as (read, write):
    async with ClientSession(read, write) as session:
        # 初始化
        await session.initialize()
        
        # 列出可用资源
        resources = await session.list_resources()
        print(f"Available resources: {[r.name for r in resources]}")
        
        # 读取资源
        content = await session.read_resource("file:///path/to/file.txt")
        print(f"File content: {content}")
        
        # 列出可用工具
        tools = await session.list_tools()
        print(f"Available tools: {[t.name for t in tools]}")
        
        # 调用工具
        result = await session.call_tool(
            "calculate",
            {"expression": "2 + 3 * 4"}
        )
        print(f"Calculation result: {result}")
        
        # 列出提示模板
        prompts = await session.list_prompts()
        print(f"Available prompts: {[p.name for p in prompts]}")
        
        # 获取提示内容
        messages = await session.get_prompt(
            "code_review",
            {"language": "python", "code": "print('hello')"}
        )
        print(f"Prompt messages: {messages}")

# 与 LLM 集成
# 1. 将 Resources/Tools/Prompts 注册到 LLM 的工具列表中
# 2. LLM 根据需要调用 MCP 能力
# 3. 将结果注入到对话上下文中

# Claude API 集成示例
from anthropic import Anthropic

client = Anthropic()

# 将 MCP 工具转换为 Claude 工具格式
claude_tools = [
    {
        "name": tool.name,
        "description": tool.description,
        "input_schema": tool.inputSchema
    }
    for tool in tools
]

# 调用 Claude
response = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1000,
    tools=claude_tools,
    messages=[{"role": "user", "content": "帮我计算 2+3*4"}]
)

# 如果 Claude 选择调用工具
if response.stop_reason == "tool_use":
    tool_call = response.content[0]
    result = await session.call_tool(tool_call.name, tool_call.input)
    
    # 将工具结果返回给 Claude
    final_response = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=1000,
        tools=claude_tools,
        messages=[
            {"role": "user", "content": "帮我计算 2+3*4"},
            {"role": "assistant", "content": response.content},
            {"role": "user", "content": [{"type": "tool_result", "tool_use_id": tool_call.id, "content": result}]}
        ]
    )
    print(final_response.content[0].text)`,language:"python",highlights:[7,15,20,24,28,32,38,43,55,70],filename:"mcp-client.py",description:"MCP Client 集成示例"}),e.jsx(t,{type:"tip",title:"Client 开发建议",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"错误处理"}),"：Server 可能不可用或返回错误，需要优雅降级"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"超时控制"}),"：设置合理的超时时间，避免长时间等待"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"缓存结果"}),"：对于不变的 Resources，可以缓存减少调用次数"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"用户确认"}),"：对于写操作（如创建 Issue），要求用户确认"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"日志记录"}),"：记录所有 MCP 调用，便于调试和审计"]})]})}),e.jsx("h2",{id:"security",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、安全与权限控制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"MCP Server 可能访问敏感数据或执行危险操作，必须实施严格的安全措施。"}),e.jsx(s,{code:`# MCP 安全措施

# 1. 认证与授权
# - stdio：依赖文件系统权限（仅本地用户可访问）
# - SSE：使用 API Key、JWT 或 OAuth 2.0

# SSE 认证示例
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer

app = FastAPI()
security = HTTPBearer()

def verify_token(credentials: HTTPBearer = Depends(security)):
    if credentials.credentials != "expected_token":
        raise HTTPException(status_code=401, detail="Invalid token")
    return credentials

@app.get("/sse")
async def sse_endpoint(token: dict = Depends(verify_token)):
    # ... SSE 连接逻辑
    pass

# 2. 输入验证
# - 验证所有工具参数的类型、范围、格式
# - 防止注入攻击（SQL、命令、路径遍历）

@app.call_tool()
async def safe_call_tool(name: str, arguments: dict):
    if name == "execute_command":
        command = arguments["command"]
        
        # ❌ 危险：直接执行用户输入
        # os.system(command)
        
        # ✅ 安全：白名单验证
        allowed_commands = ["ls", "pwd", "whoami"]
        if command not in allowed_commands:
            raise ValueError(f"Command not allowed: {command}")
        
        result = subprocess.run(
            command,
            shell=False,  # 禁用 shell 解释
            capture_output=True,
            text=True,
            timeout=5  # 超时保护
        )
        return result.stdout

# 3. 资源访问控制
# - 限制可访问的文件路径（沙箱）
# - 数据库查询使用只读账户
# - API 调用使用最小权限 Token

@app.read_resource()
async def safe_read_resource(uri: str):
    if uri.startswith("file://"):
        path = uri.replace("file://", "")
        
        # 防止路径遍历攻击
        base_dir = "/safe/directory"
        real_path = os.path.realpath(path)
        if not real_path.startswith(base_dir):
            raise PermissionError(f"Access denied: {path}")
        
        with open(real_path, "r") as f:
            return f.read()

# 4. 速率限制
# - 限制单个用户的调用频率
# - 防止滥用和 DoS 攻击

from collections import defaultdict
import time

rate_limits = defaultdict(list)

def check_rate_limit(user_id: str, max_calls: int = 100, window: int = 60):
    now = time.time()
    calls = rate_limits[user_id]
    
    # 清理过期记录
    calls[:] = [t for t in calls if now - t < window]
    
    if len(calls) >= max_calls:
        raise RateLimitExceeded("Too many requests")
    
    calls.append(now)

# 5. 审计日志
# - 记录所有工具和资源访问
# - 包含用户 ID、时间戳、操作内容

import logging

logger = logging.getLogger("mcp.audit")

@app.call_tool()
async def audited_call_tool(name: str, arguments: dict):
    logger.info(f"Tool called: {name}, args: {arguments}, user: {current_user}")
    # ... 执行逻辑
    logger.info(f"Tool completed: {name}, result: {result}")`,language:"python",highlights:[14,28,46,60,76,93],filename:"mcp-security.py",description:"MCP 安全最佳实践"}),e.jsxs(r,{label:"安全原则",children:[e.jsx("strong",{children:"最小权限"}),"：Server 只拥有完成任务所需的最小权限。",e.jsx("br",{}),e.jsx("strong",{children:"纵深防御"}),"：多层安全检查（认证、授权、输入验证、审计）。",e.jsx("br",{}),e.jsx("strong",{children:"默认拒绝"}),"：未明确允许的访问一律拒绝。",e.jsx("br",{}),e.jsx("strong",{children:"故障安全"}),"：出错时进入安全状态（如断开连接而非继续执行）。"]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：MCP 只是另一个 API 标准",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 MCP 与 OpenAPI、gRPC 没有本质区别。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：MCP 专为 LLM 交互设计，强调语义化和自描述。OpenAPI 描述 REST API 的结构，而 MCP 描述 LLM 如何理解和使用能力（Resources/Tools/Prompts）。MCP 的目标是让 LLM 自主发现和调用能力，而非人类开发者硬编码调用逻辑。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：MCP Server 必须是独立进程",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 MCP Server 只能作为独立进程运行。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：MCP Server 可以是独立进程（stdio）、HTTP 服务（SSE），甚至嵌入到现有应用中。关键是实现 MCP 协议接口，部署方式灵活多样。例如，可以将 MCP 能力集成到现有的 FastAPI 应用中，通过不同路由提供 REST API 和 MCP 服务。"]})]}),e.jsxs(t,{type:"danger",title:"误区 3：Resources 只能读取文件",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 Resources 仅限于文件系统访问。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：Resources 可以是任何结构化数据源：数据库记录、API 响应、内存缓存、实时传感器数据等。URI scheme 是抽象的，开发者可以自由定义（如 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"db://"}),"、",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"api://"}),"、",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"sensor://"}),"）。"]})]}),e.jsxs(t,{type:"warning",title:"误区 4：MCP 会取代 Function Calling",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 MCP 出现后就不再需要 OpenAI Function Calling 或 Anthropic Tool Use。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：MCP 和 Function Calling 是互补的。Function Calling 是 LLM API 层面的能力，而 MCP 是应用层面的协议。MCP Server 内部可以使用 Function Calling 实现 Tools，Client 也可以将 MCP Tools 转换为 Function Calling 格式传给 LLM。MCP 的价值在于标准化和复用，而非替代底层技术。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、面试真题"}),e.jsx(m,{questions:[{question:"MCP 协议的三大核心概念是什么？",answer:"① Resources：结构化数据的只读访问（文件、数据库、API），通过 URI 标识；② Tools：可执行操作（搜索、计算、外部 API 调用），LLM 可以主动调用；③ Prompts：预定义的提示模板，帮助 LLM 完成特定任务（代码审查、文档生成）。三者共同构成 LLM 的上下文管理能力。"},{question:"MCP 使用什么通信协议？有哪些传输方式？",answer:"MCP 基于 JSON-RPC 2.0 协议。传输方式包括：① stdio（标准输入输出）：本地进程通信，简单高效，Claude Desktop 默认使用；② SSE（Server-Sent Events）：HTTP 长连接，支持远程访问；③ 未来可能支持 WebSocket 或 gRPC。stdio 适合本地开发，SSE 适合生产环境的远程服务。"},{question:"如何保证 MCP Server 的安全性？",answer:"① 认证授权：stdio 依赖文件系统权限，SSE 使用 API Key/JWT/OAuth；② 输入验证：严格验证工具参数，防止注入攻击；③ 资源访问控制：沙箱限制文件路径，数据库使用只读账户；④ 速率限制：防止滥用和 DoS；⑤ 审计日志：记录所有操作；⑥ 最小权限原则：Server 只拥有必要权限。多层防护，纵深防御。"},{question:"MCP 与 OpenAPI/Swagger 的区别？",answer:"OpenAPI 描述 REST API 的结构（端点、参数、响应），面向人类开发者阅读和生成客户端代码。MCP 描述 LLM 如何理解和使用能力，强调语义化和自描述，面向 LLM 自主发现和调用。OpenAPI 是 API 文档标准，MCP 是 LLM 上下文管理协议。两者可以结合：MCP Server 内部调用 OpenAPI 描述的 REST API。"},{question:"何时使用 Resources，何时使用 Tools？",answer:"Resources 用于只读数据访问，LLM 被动读取（如读取文件、查询数据库）。Tools 用于执行操作，LLM 主动调用（如搜索、计算、创建资源）。判断标准：是否需要修改状态或产生副作用？如果是，用 Tools；如果只是查询，用 Resources。Prompts 用于固定流程的任务，提供结构化提示。"},{question:"MCP 的优势和挑战是什么？",answer:"优势：① 标准化：统一 LLM 上下文管理接口；② 复用性：一个 Server 可被多个 Client 使用；③ 解耦：LLM 应用与数据源/工具解耦；④ 生态：促进 MCP Server 社区发展。挑战：① 成熟度：协议仍在早期阶段；② 安全性：暴露能力带来安全风险；③ 性能：额外抽象层可能增加延迟；④ 兼容性：不同 Client 实现可能有差异。"},{question:"如何设计一个高质量的 MCP Tool？",answer:"① 清晰的命名和描述：让 LLM 准确理解用途；② 完善的 inputSchema：遵循 JSON Schema，提供详细的字段描述和默认值；③ 明确的返回值格式：使用 TextContent 或结构化数据；④ 错误处理：返回清晰的错误信息；⑤ 幂等性：多次调用结果一致；⑥ 权限控制：敏感操作需要确认；⑦ 日志记录：便于调试和审计。关键是站在 LLM 的角度思考：它能否根据描述准确调用？"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十二、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/10-llm-advanced/mcp-protocol",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"MCP 协议与上下文管理"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"协议规范、核心概念"})]}),e.jsxs("a",{href:"/docs/10-llm-advanced/api-plugin-development",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-accent mb-1",children:"相关技术 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-accent",children:"API 插件开发"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"OpenAPI、函数调用"})]}),e.jsxs("a",{href:"/docs/06-ai-theory/function-calling",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"底层技术 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"Function Calling"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"工具调用机制"})]}),e.jsxs("a",{href:"/docs/08-ai-applications/tool-integration",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"应用场景 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"工具集成与调用"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"Agent 工具链"})]})]}),e.jsx(t,{type:"info",title:"学习建议",children:"MCP 是新兴技术，建议通过以下方式深入学习：① 阅读官方文档和协议规范（modelcontextprotocol.io）；② 研究官方 SDK 示例代码（GitHub: modelcontextprotocol/python-sdk）；③ 尝试构建简单的 MCP Server（如文件阅读器、计算器）；④ 在 Claude Desktop 中测试自己的 Server；⑤ 关注社区动态和最佳实践。MCP 生态正在快速发展，保持学习至关重要。"}),e.jsx(a,{...n(o.category,o.id)})]})}),e.jsx(l,{items:c})]})}export{y as default};
