import{j as e,g as n}from"./index-hyqxTCwJ.js";import{C as r,A as d,S as l}from"./ArticleNav-DhfiS38Y.js";import{P as i}from"./Playground-C6lk-t6G.js";import{S as s}from"./SideNote-BKvanovA.js";import{D as a}from"./DiagramBlock-CLaKE9_7.js";import{I as o}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"core-concepts",text:"核心概念",level:2},{id:"plugin-architecture",text:"插件架构设计",level:3},{id:"openapi-spec",text:"OpenAPI 规范",level:3},{id:"function-calling",text:"函数调用机制",level:3},{id:"design-patterns",text:"设计模式应用",level:3},{id:"workflow",text:"插件工作流程",level:2},{id:"code-example",text:"代码实战",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"与传统 API 对比",level:2},{id:"related",text:"关联知识点",level:2}];function y({meta:t}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20",children:e.jsxs("div",{className:"knowledge-layout","data-meta":JSON.stringify(t),children:[e.jsx("section",{id:"definition",className:"mb-8",children:e.jsx("blockquote",{className:"border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 pl-4 py-3 rounded-r-lg",children:e.jsxs("p",{className:"text-[15px] sm:text-base leading-relaxed text-ink font-medium",children:["API 插件是为 LLM 设计的",e.jsx("strong",{children:"可扩展接口模块"}),"，通过标准化的",e.jsx("strong",{children:"函数描述、参数规范、执行协议"}),"，让大模型能够安全、可靠地调用外部工具和服务，扩展其能力边界。"]})})}),e.jsxs("section",{id:"overview",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"整体架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["API 插件系统由三个核心层组成：",e.jsx("strong",{children:"描述层"}),"（告诉 LLM 有哪些工具可用）、",e.jsx("strong",{children:"调度层"}),"（LLM 决定调用哪个工具）、",e.jsx("strong",{children:"执行层"}),"（实际执行工具调用）："]}),e.jsx(a,{title:"API 插件系统架构",children:`graph TB
    subgraph Description_Layer[描述层]
        D1[Function Schema<br/>函数描述]
        D2[Parameter Spec<br/>参数规范]
        D3[Return Type<br/>返回类型]
    end
    
    subgraph Scheduling_Layer[调度层]
        LLM[LLM Engine]
        Router[Tool Router<br/>工具路由]
    end
    
    subgraph Execution_Layer[执行层]
        E1[API Client<br/>API 客户端]
        E2[Auth Manager<br/>认证管理]
        E3[Rate Limiter<br/>限流控制]
        E4[Error Handler<br/>错误处理]
    end
    
    subgraph External_Services[外部服务]
        S1[Weather API]
        S2[Database]
        S3[Search Engine]
        S4[Payment Gateway]
    end
    
    D1 --> LLM
    D2 --> LLM
    D3 --> LLM
    
    LLM --> Router
    Router --> E1
    Router --> E2
    Router --> E3
    Router --> E4
    
    E1 --> S1
    E1 --> S2
    E1 --> S3
    E1 --> S4
    
    S1 --> E1
    S2 --> E1
    S3 --> E1
    S4 --> E1
    
    E1 --> LLM
    
    style Description_Layer fill:#e1f5ff
    style Scheduling_Layer fill:#fff3cd
    style Execution_Layer fill:#d4edda
    style External_Services fill:#f8d7da`}),e.jsx(s,{label:"核心价值",children:'API 插件让 LLM 从"纯文本生成器"进化为"全能助手"，可以查询实时数据、操作数据库、调用第三方服务，真正实现与物理世界的交互。'})]}),e.jsxs("section",{id:"core-concepts",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"核心概念"}),e.jsx("h3",{id:"plugin-architecture",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"插件架构设计"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"一个完整的 API 插件包含以下组件："}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Function Schema"}),"：函数的元数据描述，包括名称、描述、参数列表、返回类型"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Implementation"}),"：函数的具体实现逻辑，负责调用外部 API 或执行本地操作"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Validator"}),"：参数验证器，确保输入符合规范，防止注入攻击"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Executor"}),"：执行引擎，处理异步调用、超时控制、重试机制"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Registry"}),"：插件注册表，管理所有可用插件的元数据和实例"]})]}),e.jsx("h3",{id:"openapi-spec",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"OpenAPI 规范"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"OpenAPI（原 Swagger）是 RESTful API 的标准描述格式，LLM 可以通过解析 OpenAPI 规范自动生成函数调用："}),e.jsx(i,{language:"yaml",description:"OpenAPI 规范示例（天气查询 API）",code:`openapi: 3.0.0
info:
  title: Weather API
  version: 1.0.0
  description: Get current weather and forecast

paths:
  /current:
    get:
      summary: Get current weather
      operationId: getCurrentWeather
      parameters:
        - name: location
          in: query
          required: true
          schema:
            type: string
          description: City name or zip code
        - name: unit
          in: query
          required: false
          schema:
            type: string
            enum: [celsius, fahrenheit]
          description: Temperature unit
      
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  temperature:
                    type: number
                  condition:
                    type: string
                  humidity:
                    type: integer`}),e.jsx(s,{label:"LLM 集成",children:"LangChain 和 LlamaIndex 都支持直接加载 OpenAPI 规范，自动转换为 LLM 可调用的工具。无需手动编写函数描述，大幅降低开发成本。"}),e.jsx("h3",{id:"function-calling",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"函数调用机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"LLM 的函数调用（Function Calling）流程如下："}),e.jsx(a,{title:"函数调用流程",children:`sequenceDiagram
    participant User as 用户
    participant LLM as LLM
    participant Router as Tool Router
    participant Plugin as API Plugin
    participant API as External API
    
    User->>LLM: 1. 提问："北京今天天气如何？"
    LLM->>LLM: 2. 分析意图，匹配可用工具
    LLM->>Router: 3. 返回函数调用请求<br/>{name: "getCurrentWeather",<br/>args: {location: "北京"}}
    Router->>Plugin: 4. 查找对应插件
    Plugin->>Plugin: 5. 验证参数
    Plugin->>API: 6. 调用外部 API
    API-->>Plugin: 7. 返回结果<br/>{temperature: 25, condition: "晴"}
    Plugin-->>Router: 8. 返回执行结果
    Router->>LLM: 9. 传递结果
    LLM->>LLM: 10. 生成最终回答
    LLM-->>User: 11. "北京今天天气晴朗，气温 25°C"`}),e.jsx("h3",{id:"design-patterns",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"设计模式应用"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"API 插件开发中常用的设计模式："}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{type:"info",title:"策略模式（Strategy Pattern）",children:e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"不同的 API 提供商（如 OpenWeather、WeatherAPI）实现统一的接口，运行时动态选择。便于切换供应商而不修改调用代码。"})}),e.jsx(r,{type:"info",title:"适配器模式（Adapter Pattern）",children:e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"将不同 API 的响应格式统一为标准格式，屏蔽底层差异。例如，将多个地图服务的坐标系统一为 WGS84。"})}),e.jsx(r,{type:"info",title:"责任链模式（Chain of Responsibility）",children:e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"插件执行前经过多层处理：参数验证 → 权限检查 → 限流控制 → 缓存查询 → 实际调用。每层可独立配置和跳过。"})}),e.jsx(r,{type:"info",title:"工厂模式（Factory Pattern）",children:e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"根据配置动态创建插件实例，支持热插拔。新增插件只需注册到工厂，无需修改现有代码。"})})]})]}),e.jsxs("section",{id:"workflow",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"插件工作流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"从开发到部署的完整流程："}),e.jsx(a,{title:"API 插件开发生命周期",children:`graph LR
    A[需求分析<br/>确定功能] --> B[接口设计<br/>定义 Schema]
    B --> C[实现开发<br/>编写代码]
    C --> D[单元测试<br/>验证逻辑]
    D --> E[集成测试<br/>联调 API]
    E --> F[文档编写<br/>使用说明]
    F --> G[注册发布<br/>加入 Registry]
    G --> H[监控运维<br/>日志告警]
    
    style A fill:#e1f5ff
    style H fill:#d4edda`})]}),e.jsxs("section",{id:"code-example",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"代码实战：构建自定义 API 插件"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"以下示例展示如何使用 LangChain 创建一个天气查询插件："}),e.jsx(i,{language:"python",description:"基于 LangChain 的 API 插件实现",code:`from langchain.tools import BaseTool
from langchain.pydantic_v1 import BaseModel, Field
from typing import Optional
import requests

# 1. 定义参数模型（用于类型检查和文档生成）
class WeatherInput(BaseModel):
    location: str = Field(description="城市名称或邮政编码")
    unit: Optional[str] = Field(
        default="celsius",
        description="温度单位：celsius 或 fahrenheit"
    )

# 2. 实现插件类
class WeatherTool(BaseTool):
    name = "get_current_weather"
    description = "获取指定城市的当前天气信息"
    args_schema = WeatherInput
    
    def _run(self, location: str, unit: str = "celsius") -> dict:
        """执行天气查询"""
        # 参数验证
        if not location or len(location) > 100:
            raise ValueError("Invalid location parameter")
        
        # 调用外部 API
        api_key = "your_api_key"
        base_url = "https://api.openweathermap.org/data/2.5/weather"
        
        params = {
            "q": location,
            "appid": api_key,
            "units": "metric" if unit == "celsius" else "imperial"
        }
        
        try:
            response = requests.get(base_url, params=params, timeout=5)
            response.raise_for_status()
            data = response.json()
            
            # 格式化结果
            result = {
                "location": location,
                "temperature": data["main"]["temp"],
                "condition": data["weather"][0]["description"],
                "humidity": data["main"]["humidity"],
                "wind_speed": data["wind"]["speed"]
            }
            return result
            
        except requests.exceptions.Timeout:
            return {"error": "Request timeout"}
        except requests.exceptions.HTTPError as e:
            return {"error": f"API error: {str(e)}"}
    
    async def _arun(self, location: str, unit: str = "celsius") -> dict:
        """异步版本（可选）"""
        # 实现异步逻辑
        pass

# 3. 注册到 LLM
from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent, AgentType

llm = ChatOpenAI(model="gpt-4", temperature=0)
tools = [WeatherTool()]

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# 4. 使用插件
result = agent.run("北京今天天气怎么样？")
print(result)`}),e.jsx(s,{label:"安全性提示",children:"生产环境中必须添加：(1) API Key 管理（使用环境变量或密钥管理服务）；(2) 速率限制（防止滥用）；(3) 输入 sanitization（防止注入攻击）；(4) 审计日志（记录所有调用）。"})]}),e.jsxs("section",{id:"misconceptions",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"常见误区"}),e.jsx(r,{type:"danger",title:"误区 1：函数描述越详细越好",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：过长的描述会消耗大量 token，增加延迟和成本。最佳实践是",e.jsx("strong",{children:"简洁明确"}),"：用 1-2 句话说明功能，参数名自解释，只在必要时添加注释。实测表明，精简描述的准确率反而更高（LLM 更容易抓住重点）。"]})}),e.jsx(r,{type:"danger",title:"误区 2：忽略错误处理",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：外部 API 可能超时、返回错误、数据结构变更。必须在插件中实现",e.jsx("strong",{children:"完善的错误处理"}),"：超时重试、降级策略、友好错误消息。否则 LLM 会收到原始异常，无法生成合理回答。"]})}),e.jsx(r,{type:"danger",title:"误区 3：所有功能都做成插件",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：插件调用有开销（网络延迟、token 消耗）。对于简单计算、字符串处理等轻量操作，应让 LLM 直接完成，而非调用插件。原则：",e.jsx("strong",{children:"只有需要外部数据或复杂计算时才用插件"}),"。"]})}),e.jsx(r,{type:"warning",title:"误区 4：不验证用户输入",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：LLM 可能被 prompt injection 攻击，生成恶意的插件调用参数。必须在插件入口处进行",e.jsx("strong",{children:"严格的参数验证"}),"：类型检查、范围限制、白名单过滤。永远不要信任 LLM 生成的参数。"]})})]}),e.jsxs("section",{id:"interview",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"面试真题"}),e.jsx(o,{questions:[{question:"什么是 API 插件？它在 LLM 应用中的作用是什么？",answer:"API 插件是为 LLM 设计的可扩展接口模块，通过标准化的函数描述、参数规范、执行协议，让大模型能够安全、可靠地调用外部工具和服务。作用：(1) 扩展能力边界：让 LLM 能查询实时数据、操作数据库、调用第三方服务；(2) 提高准确性：通过权威数据源减少幻觉；(3) 增强实用性：实现真正的业务价值，如订单查询、支付处理；(4) 保证安全性：通过权限控制和参数验证防止滥用。"},{question:"如何设计一个高质量的函数描述（Function Schema）？",answer:"高质量函数描述的要点：(1) 名称清晰：使用动词+名词格式，如 get_current_weather、search_database；(2) 描述简洁：1-2 句话说明功能和适用场景；(3) 参数命名自解释：避免缩写，如用 location 而非 loc；(4) 参数类型精确：使用具体类型（string、integer、enum）而非泛型；(5) 必填/可选明确：标注 required 字段；(6) 提供示例：在描述中包含典型调用示例；(7) 枚举值完整：列出所有合法取值。避免冗长描述，保持 token 效率。"},{question:"API 插件的安全性考虑有哪些？",answer:"安全性考虑包括：(1) 身份认证：使用 API Key、OAuth、JWT 等机制验证调用者身份；(2) 权限控制：基于角色或范围的访问控制（RBAC/ABAC）；(3) 参数验证：防止 SQL 注入、XSS、命令注入等攻击；(4) 速率限制：防止滥用和 DDoS 攻击；(5) 数据脱敏：敏感信息（如密码、身份证号）不记录日志；(6) 审计日志：记录所有调用，便于追溯；(7) 超时控制：防止长时间阻塞；(8) 错误处理：不泄露内部实现细节。"},{question:"如何处理插件调用失败的情况？",answer:"失败处理策略：(1) 重试机制：对临时性错误（如网络超时）进行指数退避重试；(2) 降级策略：主 API 失败时切换到备用 API 或返回缓存数据；(3) 友好错误消息：向 LLM 返回结构化错误信息（错误码、原因、建议），而非原始异常；(4) 部分成功：多步骤操作中，已成功的步骤保留结果；(5) 人工介入：关键操作失败时通知人工处理；(6) 监控告警：记录失败率，超过阈值时告警。目标是让 LLM 能够理解失败原因并采取补救措施。"},{question:"OpenAPI 规范如何与 LLM 集成？",answer:"集成方式：(1) 自动解析：LangChain、LlamaIndex 等框架可直接加载 OpenAPI YAML/JSON 文件，自动生成函数描述；(2) 工具注册：将解析后的函数注册到 LLM 的工具列表中；(3) 动态调用：LLM 根据用户问题选择合适的方法，框架自动构造 HTTP 请求；(4) 响应处理：将 API 返回的 JSON 转换为 LLM 可读的格式。优势：无需手动编写函数描述，减少开发工作量，保证描述与实际 API 一致。注意：复杂的 API 可能需要手动优化描述，提升 LLM 理解准确度。"},{question:"插件的性能优化有哪些手段？",answer:"优化手段：(1) 缓存：对相同参数的调用结果进行缓存（Redis、内存缓存），减少重复请求；(2) 批量处理：合并多个相似请求为一次调用；(3) 异步执行：非依赖的插件调用并行执行；(4) 懒加载：只在首次调用时初始化重型资源；(5) 连接池：复用 HTTP 连接，减少握手开销；(6) 压缩传输：启用 gzip 压缩减少数据传输量；(7) CDN 加速：静态资源使用 CDN；(8) 预取策略：预测用户可能的下一步操作，提前调用相关插件。目标是在保证准确性的前提下最小化延迟。"}]})]}),e.jsxs("section",{id:"comparison",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"与传统 API 对比"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"API 插件与传统 RESTful API 在设计和使用上有显著差异："}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-100 dark:bg-gray-800",children:[e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"维度"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"传统 API"}),e.jsx("th",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold",children:"API 插件"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"调用者"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"人类开发者（编写代码）"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"LLM（自然语言理解）"})]}),e.jsxs("tr",{className:"bg-gray-50 dark:bg-gray-900/50",children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"接口描述"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"技术文档、Swagger UI"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"Function Schema（LLM 可读）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"参数传递"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"HTTP 请求体、查询参数"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"JSON 对象（由 LLM 生成）"})]}),e.jsxs("tr",{className:"bg-gray-50 dark:bg-gray-900/50",children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"错误处理"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"HTTP 状态码 + 错误消息"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"结构化错误（LLM 可理解）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"安全性"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"API Key、OAuth、IP 白名单"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"同上 + 参数验证、Prompt Injection 防护"})]}),e.jsxs("tr",{className:"bg-gray-50 dark:bg-gray-900/50",children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"性能要求"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"毫秒级响应"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"秒级可接受（LLM 推理本身较慢）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold",children:"开发重点"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"接口稳定性、向后兼容"}),e.jsx("td",{className:"border border-gray-300 dark:border-gray-700 px-4 py-2",children:"描述清晰度、LLM 理解度"})]})]})]})}),e.jsx(r,{type:"info",title:"融合趋势",children:e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:'现代 API 设计正在融合两者优势：使用 OpenAPI 规范同时服务人类开发者和 LLM，一套描述多方受益。未来可能出现"LLM-first API"，优先优化机器理解，再生成人类友好文档。'})})]}),e.jsxs("section",{id:"related",className:"mb-10",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"关联知识点"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🔧 函数调用机制"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"深入学习 LLM 如何选择和调用外部工具"})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🌐 RESTful API 设计"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"掌握传统 API 的设计原则和最佳实践"})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🔗 MCP 协议"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"了解 Model Context Protocol 标准化方案"})]}),e.jsxs("div",{className:"p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 transition-colors",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🛡️ API 安全防护"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"学习认证、授权、防攻击等安全技术"})]})]})]}),e.jsx(d,{...n(t.category,t.id)})]})}),e.jsx(l,{items:c})]})}export{y as default};
