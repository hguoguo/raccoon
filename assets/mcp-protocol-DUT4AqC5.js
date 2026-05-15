import{j as e,g as d}from"./index-hyqxTCwJ.js";import{C as s,A as n,S as i}from"./ArticleNav-DhfiS38Y.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as a}from"./SideNote-BKvanovA.js";import{D as o}from"./DiagramBlock-CLaKE9_7.js";import{I as l}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"MCP 协议概述",level:2},{id:"core-concepts",text:"核心概念",level:2},{id:"architecture",text:"架构设计",level:3},{id:"transport-layer",text:"传输层",level:3},{id:"message-format",text:"消息格式",level:3},{id:"resource-management",text:"资源管理",level:2},{id:"tool-protocol",text:"工具调用协议",level:2},{id:"context-management",text:"上下文管理",level:2},{id:"workflow",text:"典型工作流程",level:2},{id:"code-example",text:"代码实战",level:2},{id:"context-switch",text:"上下文切换",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"与其他协议对比",level:2},{id:"related",text:"关联知识点",level:2}];function y({meta:t}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20",children:e.jsxs("div",{className:"knowledge-layout","data-meta":JSON.stringify(t),children:[e.jsx("section",{id:"definition",className:"mb-8",children:e.jsx("blockquote",{className:"border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 pl-4 py-3 rounded-r-lg",children:e.jsxs("p",{className:"text-[15px] sm:text-base leading-relaxed text-ink font-medium",children:["MCP(Model Context Protocol)是一个",e.jsx("strong",{children:"开放标准协议"}),",定义了 AI 应用与外部资源(文件系统、数据库、API)之间的通信规范,实现安全的资源访问和工具调用,是构建可扩展 Agent 系统的基础设施。"]})})}),e.jsxs("section",{id:"overview",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"MCP 协议概述"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"MCP 由 Anthropic 提出,旨在解决 AI Agent 与外部系统交互的标准化问题。它提供了一套统一的接口,让不同厂商的 AI 应用能够以相同方式访问各种资源和服务:"}),e.jsx(o,{title:"MCP 协议在 AI 生态中的位置",children:`graph TB
    A[AI Applications<br/>Claude/Cursor/GPT] --> B[MCP Protocol]
    
    B --> C[MCP Servers]
    C --> D[File System]
    C --> E[Databases]
    C --> F[APIs]
    C --> G[Git Repositories]
    C --> H[Custom Tools]
    
    B --> I[Standardized Interface]
    I --> J[Resource Access]
    I --> K[Tool Invocation]
    I --> L[Context Management]
    
    style A fill:#e1f5ff
    style B fill:#fff3cd
    style C fill:#d4edda`}),e.jsxs(a,{label:"核心价值",children:["MCP 的核心价值在于",e.jsx("strong",{children:"解耦"}),":AI 应用无需为每个数据源编写专用集成代码,只需实现 MCP 客户端;资源提供方只需实现 MCP 服务器,即可被所有兼容应用使用。"]})]}),e.jsxs("section",{id:"core-concepts",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"核心概念"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-6",children:"MCP 协议围绕三个核心抽象展开:"}),e.jsx("h3",{id:"architecture",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"架构设计"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"MCP 采用客户端-服务器架构:"}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"MCP Client"}),":嵌入在 AI 应用中,负责发起资源请求和工具调用"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"MCP Server"}),":独立服务,暴露资源接口和工具实现,可访问本地或远程数据"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Transport Layer"}),":定义通信方式(STDIO、HTTP、WebSocket)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Message Protocol"}),":基于 JSON-RPC 2.0 的消息格式"]})]}),e.jsx(r,{language:"typescript",description:"MCP 客户端初始化示例",code:`import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

// 创建 MCP 客户端
const transport = new StdioClientTransport({
  command: 'npx',
  args: ['-y', '@modelcontextprotocol/server-filesystem', '/path/to/files']
})

const client = new Client({
  name: 'my-ai-app',
  version: '1.0.0'
}, {
  capabilities: {
    prompts: {},
    resources: {},
    tools: {}
  }
})

// 连接到 MCP 服务器
await client.connect(transport)

// 列出可用资源
const resources = await client.listResources()
console.log('Available resources:', resources)

// 列出可用工具
const tools = await client.listTools()
console.log('Available tools:', tools)`}),e.jsx("h3",{id:"transport-layer",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"传输层"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"MCP 支持多种传输方式,适应不同部署场景:"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-100 dark:bg-gray-800",children:[e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"传输方式"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"适用场景"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"特点"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:e.jsx("code",{className:"font-mono text-[13px]",children:"stdio"})}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"本地进程通信"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"通过标准输入输出,适合桌面应用"})]}),e.jsxs("tr",{className:"bg-gray-50 dark:bg-gray-900/50",children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:e.jsx("code",{className:"font-mono text-[13px]",children:"http"})}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"远程服务调用"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"RESTful API,适合云部署"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:e.jsx("code",{className:"font-mono text-[13px]",children:"websocket"})}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"实时双向通信"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"低延迟,适合流式响应"})]})]})]})}),e.jsx("h3",{id:"message-format",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"消息格式"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"MCP 基于 JSON-RPC 2.0 定义消息格式,主要消息类型包括:"}),e.jsx(r,{language:"json",description:"MCP 消息格式示例",code:`// 1. 请求消息(Request)
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "resources/list",
  "params": {}
}

// 2. 响应消息(Response)
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resources": [
      {
        "uri": "file:///home/user/document.txt",
        "name": "document.txt",
        "description": "A text file",
        "mimeType": "text/plain"
      }
    ]
  }
}

// 3. 通知消息(Notification)
{
  "jsonrpc": "2.0",
  "method": "notifications/resources/updated",
  "params": {
    "uri": "file:///home/user/document.txt"
  }
}

// 4. 错误消息(Error)
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32601,
    "message": "Method not found"
  }
}`})]}),e.jsxs("section",{id:"resource-management",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"资源管理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["MCP 将外部数据抽象为",e.jsx("strong",{children:"资源(Resource)"}),",提供统一的访问接口。资源可以是文件、数据库记录、API 端点等:"]}),e.jsx(r,{language:"typescript",description:"读取 MCP 资源内容",code:`// 列出所有可用资源
const resources = await client.listResources()
console.log(resources.resources)
// [
//   { uri: "file:///docs/readme.md", name: "readme.md" },
//   { uri: "postgres://db/users", name: "Users Table" }
// ]

// 读取特定资源
const resource = await client.readResource({
  uri: "file:///docs/readme.md"
})

console.log(resource.contents[0].text)
// "# Project README

This is a sample project..."

// 订阅资源变化(实时监听)
await client.subscribeToResource({
  uri: "file:///docs/readme.md"
})

client.onNotification("notifications/resources/updated", (params) => {
  console.log("Resource updated: " + params.uri)
  // 重新读取最新内容
  client.readResource({ uri: params.uri })
})`}),e.jsx(s,{type:"info",title:"资源 URI 规范",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:["MCP 使用 URI 唯一标识资源,遵循标准格式:",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"file:///path/to/file"}),"(本地文件)、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"postgres://host/db/table"}),"(数据库表)、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"https://api.example.com/endpoint"}),"(HTTP 资源)。这种统一表示让 AI 应用无需关心底层存储细节。"]})})]}),e.jsxs("section",{id:"tool-protocol",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"工具调用协议"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["MCP 的",e.jsx("strong",{children:"工具(Tool)"}),"抽象允许 AI 应用执行操作(如运行命令、发送请求、处理数据),类似 Function Calling 但更标准化:"]}),e.jsx(r,{language:"typescript",description:"调用 MCP 工具",code:`// 列出可用工具
const tools = await client.listTools()
console.log(tools.tools)
// [
//   {
//     name: "execute_sql",
//     description: "Execute a SQL query",
//     inputSchema: {
//       type: "object",
//       properties: {
//         query: { type: "string", description: "SQL query" }
//       },
//       required: ["query"]
//     }
//   }
// ]

// 调用工具
const result = await client.callTool({
  name: "execute_sql",
  arguments: {
    query: "SELECT COUNT(*) FROM users WHERE active = true"
  }
})

console.log(result.content)
// [{ type: "text", text: "1234" }]

// 工具可以返回多种类型的内容
// - text: 文本结果
// - image: 图片(base64)
// - resource: 引用其他资源`}),e.jsx(a,{label:"安全考虑",children:"工具调用涉及执行操作,必须在 MCP Server 层实现权限控制和参数验证,避免注入攻击或危险操作。建议对敏感工具要求用户确认后再执行。"})]}),e.jsxs("section",{id:"context-management",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"上下文管理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["MCP 提供",e.jsx("strong",{children:"Prompt"}),"机制管理对话上下文,支持模板化提示词和动态变量注入:"]}),e.jsx(r,{language:"typescript",description:"使用 MCP Prompt 模板",code:`// 列出可用 Prompt 模板
const prompts = await client.listPrompts()
console.log(prompts.prompts)
// [
//   {
//     name: "code_review",
//     description: "Review code for best practices",
//     arguments: [
//       { name: "language", description: "Programming language" },
//       { name: "code", description: "Code to review" }
//     ]
//   }
// ]

// 获取渲染后的 Prompt
const prompt = await client.getPrompt({
  name: "code_review",
  arguments: {
    language: "python",
    code: "def hello():
    print('world')"
  }
})

console.log(prompt.messages)
// [
//   {
//     role: "system",
//     content: "You are an expert Python code reviewer..."
//   },
//   {
//     role: "user",
//     content: "Please review this code:
def hello():
    print('world')"
//   }
// ]

// 将 Prompt 发送给 LLM
const response = await llm.chat(prompt.messages)`}),e.jsx(s,{type:"tip",title:"上下文管理最佳实践",children:e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"使用 Prompt 模板而非硬编码提示词,便于维护和复用。对于长对话,定期清理历史消息或使用摘要技术压缩上下文,避免超出 LLM 的 context window。"})})]}),e.jsxs("section",{id:"workflow",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"典型工作流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"AI 应用通过 MCP 与外部系统交互的完整流程:"}),e.jsx(o,{title:"MCP 协议工作流程",children:`sequenceDiagram
    participant User as 用户
    participant App as AI Application
    participant MCP as MCP Client
    participant Server as MCP Server
    participant Resource as External Resource
    
    Note over User,Resource: 阶段一:初始化
    App->>MCP: 1. 创建 MCP Client
    MCP->>Server: 2. 建立连接(stdio/http)
    Server-->>MCP: 3. 返回能力列表
    MCP-->>App: 4. 注册可用资源和工具
    
    Note over User,Resource: 阶段二:资源访问
    User->>App: 5. 提问:"读取 readme.md"
    App->>MCP: 6. 解析意图,选择资源
    MCP->>Server: 7. readResource(uri)
    Server->>Resource: 8. 读取文件
    Resource-->>Server: 9. 返回内容
    Server-->>MCP: 10. 返回资源数据
    MCP-->>App: 11. 传递内容
    App->>LLM: 12. 生成回答
    LLM-->>App: 13. 返回答案
    App-->>User: 14. 展示结果
    
    Note over User,Resource: 阶段三:工具调用
    User->>App: 15. 请求:"统计代码行数"
    App->>MCP: 16. 识别需要工具
    MCP->>Server: 17. callTool(count_lines)
    Server->>Resource: 18. 执行命令
    Resource-->>Server: 19. 返回结果
    Server-->>MCP: 20. 返回工具输出
    MCP-->>App: 21. 传递结果
    App->>LLM: 22. 整合答案
    LLM-->>App: 23. 最终回答
    App-->>User: 24. 展示结果`})]}),e.jsxs("section",{id:"code-example",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"代码实战:构建 MCP Server"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"以下是创建一个简单的文件系统 MCP Server 的完整示例:"}),e.jsx(r,{language:"typescript",description:"实现 MCP Server - 文件系统访问",code:`import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import fs from 'fs/promises'
import path from 'path'

// 创建 MCP Server
const server = new Server({
  name: 'filesystem-server',
  version: '1.0.0'
}, {
  capabilities: {
    resources: {},
    tools: {}
  }
})

// 注册资源列表处理器
server.setRequestHandler('resources/list', async () => {
  const files = await fs.readdir('/workspace')
  return {
    resources: files.map(file => ({
      uri: 'file:///workspace/' + file,
      name: file,
      mimeType: getMimeType(file)
    }))
  }
})

// 注册资源读取处理器
server.setRequestHandler('resources/read', async (request) => {
  const uri = request.params.uri
  const filePath = uri.replace('file:///workspace/', '')
  
  try {
    const content = await fs.readFile(
      path.join('/workspace', filePath),
      'utf-8'
    )
    return {
      contents: [{
        uri,
        mimeType: getMimeType(filePath),
        text: content
      }]
    }
  } catch (error) {
    throw new Error('Failed to read file: ' + error.message)
  }
})

// 注册工具 - 搜索文件
server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'search_files') {
    const { pattern } = request.params.arguments
    const files = await fs.readdir('/workspace')
    const matched = files.filter(f => f.includes(pattern))
    
    return {
      content: [{
        type: 'text',
        text: matched.join('
')
      }]
    }
  }
  
  throw new Error('Unknown tool: ' + request.params.name)
})

// 辅助函数:判断 MIME 类型
function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const mimeTypes: Record<string, string> = {
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.json': 'application/json',
    '.py': 'text/x-python',
    '.js': 'text/javascript'
  }
  return mimeTypes[ext] || 'application/octet-stream'
}

// 启动服务器
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('MCP Filesystem Server running on stdio')
}

main().catch(console.error)`}),e.jsx(r,{language:"bash",description:"运行 MCP Server",code:`# 1. 安装依赖
npm install @modelcontextprotocol/sdk

# 2. 启动服务器
node filesystem-server.js

# 3. 在 AI 应用中连接
# Claude Desktop / Cursor 会自动发现并连接 MCP Server
# 或通过命令行测试:
echo '{"jsonrpc":"2.0","id":1,"method":"resources/list","params":{}}' | node filesystem-server.js`})]}),e.jsxs("section",{id:"context-switch",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"上下文切换:不同集成模式"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"根据应用场景选择合适的 MCP 集成方式:"}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg",children:[e.jsxs("h3",{className:"font-semibold text-ink mb-2 flex items-center gap-2",children:[e.jsx("span",{className:"text-accent",children:"🌱"})," 本地开发模式"]}),e.jsx(r,{language:"typescript",description:"通过 stdio 连接本地 MCP Server",code:`// 适用场景:桌面应用、IDE 插件、本地 AI 助手

// Claude Desktop 配置示例 (~/.claude/mcp.json)
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/liujianhua/Documents"
      ]
    },
    "git": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-git",
        "/path/to/repo"
      ]
    }
  }
}

// 优势:
// - 零配置,开箱即用
// - 直接访问本地文件
// - 无网络延迟
// - 数据不出本地,安全性高

// 劣势:
// - 仅限单机使用
// - 无法共享给团队`})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg",children:[e.jsxs("h3",{className:"font-semibold text-ink mb-2 flex items-center gap-2",children:[e.jsx("span",{className:"text-indigo-500",children:"⚙️"})," 远程服务模式"]}),e.jsx(r,{language:"typescript",description:"通过 HTTP 连接远程 MCP Server",code:`// 适用场景:团队协作、云端 AI 应用、微服务架构

// 部署 MCP Server 到云服务器
const express = require('express')
const { SSEServerTransport } = require('@modelcontextprotocol/sdk/server/sse.js')

const app = express()
let transport: SSEServerTransport

app.get('/sse', async (req, res) => {
  transport = new SSEServerTransport('/messages', res)
  await server.connect(transport)
})

app.post('/messages', async (req, res) => {
  await transport.handlePostMessage(req, res)
})

app.listen(3000, () => {
  console.log('MCP Server running on http://localhost:3000')
})

// 客户端连接
const client = new Client(...)
const transport = new HttpClientTransport({
  url: 'http://example.com/sse'
})
await client.connect(transport)

// 优势:
// - 多客户端共享
// - 集中管理权限
// - 可扩展性强
// - 适合企业级应用

// 劣势:
// - 需要运维服务器
// - 网络延迟
// - 需处理认证和加密`})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg",children:[e.jsxs("h3",{className:"font-semibold text-ink mb-2 flex items-center gap-2",children:[e.jsx("span",{className:"text-purple-500",children:"🔧"})," 混合模式"]}),e.jsx(r,{language:"typescript",description:"同时使用本地和远程 MCP Server",code:`// 适用场景:复杂工作流,部分数据本地、部分云端

// 配置多个 MCP Server
const servers = [
  // 本地文件系统(快速访问)
  {
    name: 'local-files',
    transport: new StdioClientTransport({
      command: 'npx',
      args: ['@mcp/server-filesystem', '/local/docs']
    })
  },
  // 远程数据库(团队共享)
  {
    name: 'team-db',
    transport: new HttpClientTransport({
      url: 'https://api.company.com/mcp/database'
    })
  },
  // 云端 API(第三方服务)
  {
    name: 'github',
    transport: new HttpClientTransport({
      url: 'https://api.github.com/mcp'
    })
  }
]

// AI 应用可根据需求选择合适的数据源
async function answerQuestion(query: string) {
  // 优先从本地文件检索
  const localResults = await searchLocalFiles(query)
  
  if (localResults.length > 0) {
    return generateAnswer(localResults)
  }
  
  // 本地无结果,查询远程数据库
  const dbResults = await queryDatabase(query)
  return generateAnswer(dbResults)
}

// 优势:
// - 灵活性最高
// - 性能与安全平衡
// - 适应复杂场景

// 劣势:
// - 配置复杂
// - 需管理多个连接
// - 调试困难`})]})]})]}),e.jsxs("section",{id:"misconceptions",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"常见误区"}),e.jsx(s,{type:"danger",title:"误区 1:MCP 只是另一个 API 标准",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),":MCP 不仅是 API 规范,更是完整的",e.jsx("strong",{children:"交互协议"}),",包含资源管理、工具调用、上下文管理、订阅通知等多个维度。它定义了 AI 应用与外部系统的",e.jsx("strong",{children:"语义层"}),",而不仅仅是数据传输格式。相比 REST/GraphQL,MCP 更专注于 AI 场景的特殊需求(如流式响应、工具发现、Prompt 模板)。"]})}),e.jsx(s,{type:"danger",title:"误区 2:MCP 只能用于文件访问",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),":MCP 的资源抽象非常灵活,可以封装任何数据源:数据库(PostgreSQL、MongoDB)、API(GitHub、Slack)、云服务(AWS S3、Google Drive)、甚至自定义业务系统。官方已提供多个参考实现,社区也在快速扩展。关键在于 MCP Server 的实现,而非协议本身的限制。"]})}),e.jsx(s,{type:"danger",title:"误区 3:实现 MCP Server 很复杂",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),":MCP SDK 提供了高层抽象,简化了开发流程。一个简单的文件服务器只需实现 2-3 个 handler 函数,约 100 行代码。SDK 处理了消息序列化、错误处理、连接管理等底层细节。对于常见场景(文件系统、Git、数据库),可直接使用官方提供的现成 Server,无需自己实现。"]})}),e.jsx(s,{type:"warning",title:"误区 4:忽略安全性和权限控制",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),":MCP Server 暴露了系统资源和工具,必须实现严格的权限控制。建议:(1)限制访问路径(如只读指定目录);(2)对危险工具(如删除文件、执行命令)要求用户确认;(3)实现审计日志,记录所有操作;(4)使用沙箱环境隔离敏感操作;(5)定期审查工具实现,防止注入攻击。安全应是 MCP 集成的首要考虑。"]})})]}),e.jsxs("section",{id:"interview",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"面试真题"}),e.jsx(l,{questions:[{question:"MCP 协议解决了什么问题?为什么需要它?",answer:"MCP 解决了 AI Agent 与外部系统集成的标准化问题。在没有 MCP 之前,每个 AI 应用都需要为不同的数据源(文件、数据库、API)编写专用集成代码,导致:(1)重复开发,效率低下;(2)维护成本高,每次新增数据源都要修改应用代码;(3)生态碎片化,无法形成通用工具市场。MCP 通过定义统一协议,实现:(1)解耦:应用和数据源独立演进;(2)互操作性:任何兼容的 Client 可以使用任何兼容的 Server;(3)生态繁荣:开发者可以专注构建优质 MCP Server,被所有应用复用。这类似于 USB 标准统一了外设接口。"},{question:"MCP 的核心抽象有哪些?各自的作用是什么?",answer:"MCP 有三大核心抽象:(1)Resource(资源):表示可读数据,如文件、数据库记录、API 响应。通过 URI 唯一标识,支持读取和订阅更新。作用是为 AI 提供上下文信息。(2)Tool(工具):表示可执行操作,如运行命令、发送请求、处理数据。通过名称和参数 schema 定义,支持调用和返回结果。作用是让 AI 能够执行动作。(3)Prompt(提示词):表示模板化的对话上下文,支持变量注入和动态渲染。作用是管理复杂的提示词工程,提高复用性。这三个抽象覆盖了 AI 与应用交互的主要场景:读取数据、执行操作、管理对话。"},{question:"MCP 的传输层支持哪些方式?如何选择?",answer:"MCP 支持三种传输方式:(1)stdio(标准输入输出):通过进程间通信,适合本地桌面应用和 IDE 插件。优点是零配置、低延迟、数据安全;缺点是仅限单机。(2)HTTP(SSE):通过 Server-Sent Events 实现双向通信,适合远程服务和云端部署。优点是可跨网络、易于负载均衡;缺点是需要运维服务器、有网络延迟。(3)WebSocket:全双工通信,适合实时性要求高的场景。优点是低延迟、支持主动推送;缺点是实现复杂度较高。选择建议:本地应用用 stdio,团队协作和云服务用 HTTP,实时交互用 WebSocket。大多数场景 HTTP 是最佳平衡点。"},{question:"如何保证 MCP Server 的安全性?",answer:"MCP Server 安全措施包括:(1)路径限制:只暴露必要的目录或数据,避免全盘访问。如文件系统 Server 限定根目录为 /workspace。(2)权限控制:对读写操作区分权限,敏感操作(删除、执行)要求显式授权或用户确认。(3)参数验证:严格校验工具调用参数,防止注入攻击(SQL 注入、命令注入等)。(4)审计日志:记录所有资源访问和工具调用,便于追溯和安全分析。(5)沙箱隔离:在容器或虚拟机中运行 MCP Server,限制系统资源访问。(6)认证授权:远程 Server 应实现 API Key、OAuth 等认证机制,防止未授权访问。(7)速率限制:防止滥用和 DoS 攻击。安全设计应遵循最小权限原则,默认拒绝,按需授权。"},{question:"MCP 与 LangChain Tools 有什么区别?",answer:"主要区别在于抽象层级和标准化程度:(1)LangChain Tools 是 Python/JavaScript 库级别的抽象,紧密绑定 LangChain 框架,只能在 LangChain 生态中使用。(2)MCP 是协议级别的抽象,语言无关,任何实现 MCP 协议的应用都可以使用 MCP Server,不依赖特定框架。(3)LangChain Tools 侧重函数调用,而 MCP 还包含资源管理和上下文管理,覆盖更广。(4)MCP 强调互操作性,目标是形成跨平台的工具生态;LangChain Tools 更注重框架内的便利性。两者可以互补:LangChain 可以实现 MCP Client,从而使用丰富的 MCP Server 生态。"},{question:"如何调试和优化 MCP 应用的性能?",answer:"调试和优化策略:(1)启用日志:MCP SDK 支持详细日志,记录所有请求和响应,便于定位问题。设置环境变量 MCP_LOG_LEVEL=debug。(2)监控延迟:测量每个环节的耗时(Client→Server→Resource),识别瓶颈。通常瓶颈在资源访问而非协议本身。(3)缓存优化:对频繁访问的资源实现缓存,减少重复读取。MCP 支持资源订阅,可在数据变化时失效缓存。(4)批量操作:合并多个小请求为一次批量调用,减少往返次数。(5)异步处理:对耗时操作(如大文件读取)使用异步接口,避免阻塞主线程。(6)连接池:对远程 Server 复用连接,避免频繁建立 TCP 握手。(7)压缩传输:对大数据启用 gzip 压缩,减少网络传输量。(8)限流降级:在高负载时限制并发请求数,保护后端资源。"}]})]}),e.jsxs("section",{id:"comparison",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"与其他协议对比"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"MCP 与其他常见集成协议的对比:"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-100 dark:bg-gray-800",children:[e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"维度"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"MCP"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"REST API"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"GraphQL"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"设计目标"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"AI 应用集成"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"通用 Web API"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"灵活数据查询"})]}),e.jsxs("tr",{className:"bg-gray-50 dark:bg-gray-900/50",children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"核心抽象"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"Resource/Tool/Prompt"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"Endpoint/Resource"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"Type/Query/Mutation"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"工具发现"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"内置(listTools)"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"需额外文档(OpenAPI)"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"Schema 自省"})]}),e.jsxs("tr",{className:"bg-gray-50 dark:bg-gray-900/50",children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"流式响应"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"原生支持"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"需 SSE/WebSocket"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"需 Subscription"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"上下文管理"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"内置 Prompt 模板"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"无"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"无"})]}),e.jsxs("tr",{className:"bg-gray-50 dark:bg-gray-900/50",children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"学习曲线"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"中等,专为 AI 优化"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"低,广泛熟悉"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"高,概念复杂"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"适用场景"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"AI Agent、智能助手"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"Web/Mobile 应用"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"复杂数据关系"})]})]})]})}),e.jsx(s,{type:"info",title:"选择建议",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"选择 MCP"}),":构建 AI Agent、智能助手、需要工具发现和上下文管理的场景。",e.jsx("strong",{children:"选择 REST"}),":传统 Web 应用、简单 CRUD 操作、已有成熟 API。",e.jsx("strong",{children:"选择 GraphQL"}),":复杂数据关系、前端需要灵活查询、避免过度获取数据。三者可共存:MCP 用于 AI 集成,REST/GraphQL 用于传统应用。"]})})]}),e.jsxs("section",{id:"related",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"关联知识点"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🔌 MCP Server 开发与集成"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"深入学习如何实现自定义 MCP Server,扩展协议能力"})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🔗 API 插件开发与设计模式"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"了解如何将现有 API 封装为 MCP Tool,实现标准化集成"})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🤖 Agent 架构设计"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"学习如何利用 MCP 构建可扩展的 Agent 系统"})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🛠️ 工具集成与调用"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"掌握 Function Calling 和 Tool Use 的最佳实践"})]})]})]}),e.jsx(n,{...d(t.category,t.id)})]})}),e.jsx(i,{items:c})]})}export{y as default};
