import{j as e,g as a}from"./index-hyqxTCwJ.js";import{K as l}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as i}from"./SideNote-BKvanovA.js";import{C as t,A as d,S as o}from"./ArticleNav-DhfiS38Y.js";import{D as n}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const x=[{id:"definition",text:"一句话定义",level:2},{id:"rest-principles",text:"一、REST 核心原则",level:2},{id:"resource-design",text:"二、资源设计规范",level:2},{id:"http-methods",text:"三、HTTP 方法语义",level:2},{id:"status-codes",text:"四、状态码正确使用",level:2},{id:"versioning",text:"五、API 版本管理",level:2},{id:"pagination",text:"六、分页策略",level:2},{id:"filtering-sorting",text:"七、过滤与排序",level:2},{id:"hateoas",text:"八、HATEOAS",level:2},{id:"security",text:"九、安全最佳实践",level:2},{id:"misconceptions",text:"十、常见误区",level:2},{id:"interview",text:"十一、面试真题",level:2},{id:"related",text:"十二、知识关联",level:2}];function j({meta:r}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(l,{meta:r,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["RESTful API 是基于",e.jsx("strong",{className:"text-accent",children:"REST（Representational State Transfer）架构风格"}),"设计的 Web API，通过统一的资源标识（URI）、标准的 HTTP 方法和状态码，实现客户端与服务器的松耦合交互。"]})}),e.jsx(t,{type:"tip",title:"为什么选择 REST？",children:"RESTful API 具有无状态、可缓存、统一接口等优势，易于理解、开发和测试，已成为 Web API 的事实标准。相比 SOAP 等重量级协议，REST 更轻量、更适合移动端和微服务架构。"}),e.jsx("h2",{id:"rest-principles",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、REST 核心原则"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"REST 由 Roy Fielding 在 2000 年博士论文中提出，包含 6 个约束条件。"}),e.jsx(n,{title:"REST 六大约束",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌─────────────────────────────────────────────┐
│           REST 架构约束                      │
├─────────────────────────────────────────────┤
│ 1. 客户端-服务器分离                         │
│    - 关注点分离，独立演进                     │
│                                             │
│ 2. 无状态（Stateless）                       │
│    - 每个请求包含所有必要信息                 │
│    - 服务器不存储会话状态                     │
│                                             │
│ 3. 可缓存（Cacheable）                       │
│    - 响应必须明确是否可缓存                   │
│    - 减少交互次数，提升性能                   │
│                                             │
│ 4. 统一接口（Uniform Interface）             │
│    - 资源标识（URI）                          │
│    - 通过表示操作资源                         │
│    - 自描述消息                               │
│    - HATEOAS（超媒体即应用状态引擎）          │
│                                             │
│ 5. 分层系统（Layered System）                │
│    - 客户端无需知道是否直连服务器             │
│    - 可插入代理、网关、负载均衡器             │
│                                             │
│ 6. 按需代码（Code on Demand，可选）          │
│    - 服务器可下发可执行代码（如 JavaScript）  │
└─────────────────────────────────────────────┘
            `})}),e.jsxs(i,{label:"无状态的代价",children:["无状态意味着每次请求都需要携带认证信息（如 JWT Token），增加了请求大小。但换来的是",e.jsx("strong",{children:"水平扩展能力"}),"：任何服务器实例都可以处理任何请求，无需会话粘滞。"]}),e.jsx("h2",{id:"resource-design",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、资源设计规范"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:'REST 的核心是"资源"，每个资源通过 URI 唯一标识。良好的资源设计是 RESTful API 的基础。'}),e.jsx(s,{code:`# RESTful URI 设计规范

# ✅ 正确示例
GET    /users              # 获取用户列表
GET    /users/123          # 获取 ID 为 123 的用户
POST   /users              # 创建新用户
PUT    /users/123          # 更新用户 123（全量）
PATCH  /users/123          # 部分更新用户 123
DELETE /users/123          # 删除用户 123

# ❌ 错误示例（动词式 API）
GET    /getUsers
POST   /createUser
POST   /updateUser
POST   /deleteUser

# 子资源设计
GET    /users/123/orders           # 获取用户 123 的订单列表
GET    /users/123/orders/456       # 获取订单 456
POST   /users/123/orders           # 为用户 123 创建订单

# 复数形式 vs 单数形式
# 推荐：始终使用复数形式（/users 而非 /user）
# 原因：集合操作更自然（GET /users 返回列表）

# 避免深层嵌套（超过 3 层）
# ❌ 不好
GET /users/123/orders/456/items/789/reviews

# ✅ 更好（扁平化）
GET /reviews?order_id=456&item_id=789`,language:"python",highlights:[4,10,17,22,28,34],filename:"restful-uri.py",description:"RESTful URI 设计规范"}),e.jsx(t,{type:"info",title:"URI 命名最佳实践",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"使用名词"}),"，避免动词（资源是名词，HTTP 方法是动词）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"小写字母"}),"，使用连字符分隔单词（",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"/user-profiles"}),"）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"避免文件扩展名"}),"（",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"/users.json"})," 不如 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"/users"}),"）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"保持一致性"}),"：要么全部复数，要么全部单数"]})]})}),e.jsx("h2",{id:"http-methods",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、HTTP 方法语义"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HTTP 方法定义了操作的语义，正确使用方法是 RESTful 的关键。"}),e.jsx(n,{title:"HTTP 方法对比",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌──────────┬──────────┬──────────┬────────────────────────┐
│  方法    │  幂等性  │  安全性  │       用途              │
├──────────┼──────────┼──────────┼────────────────────────┤
│ GET      │   ✅     │   ✅     │ 获取资源                │
│ POST     │   ❌     │   ❌     │ 创建资源                │
│ PUT      │   ✅     │   ❌     │ 全量更新资源            │
│ PATCH    │   ❌*    │   ❌     │ 部分更新资源            │
│ DELETE   │   ✅     │   ❌     │ 删除资源                │
└──────────┴──────────┴──────────┴────────────────────────┘

* PATCH 理论上可以不幂等，但实践中通常设计为幂等

幂等性（Idempotent）：多次执行相同请求，结果一致
安全性（Safe）：不会修改服务器状态（只读）
            `})}),e.jsx(s,{code:`# HTTP 方法使用示例

# GET：获取资源（安全、幂等）
GET /users/123
Response: 200 OK
{
  "id": 123,
  "name": "张三",
  "email": "zhangsan@example.com"
}

# POST：创建资源（非安全、非幂等）
POST /users
Request Body:
{
  "name": "李四",
  "email": "lisi@example.com"
}
Response: 201 Created
Location: /users/124
{
  "id": 124,
  "name": "李四",
  "email": "lisi@example.com"
}

# PUT：全量更新（幂等）
PUT /users/123
Request Body:
{
  "name": "张三丰",
  "email": "zhangsanfeng@example.com"
}
Response: 200 OK

# PATCH：部分更新（通常幂等）
PATCH /users/123
Request Body:
{
  "email": "newemail@example.com"
}
Response: 200 OK

# DELETE：删除资源（幂等）
DELETE /users/123
Response: 204 No Content  # 或 200 OK

# 第二次 DELETE 同一资源
DELETE /users/123
Response: 404 Not Found  # 或 204 No Content（仍视为成功）`,language:"python",highlights:[3,13,26,36,44,51],filename:"http-methods.py",description:"HTTP 方法使用示例"}),e.jsxs(i,{label:"PUT vs PATCH",children:[e.jsx("strong",{children:"PUT"}),"：提供完整的资源表示，服务器用新数据完全替换旧数据。",e.jsx("br",{}),e.jsx("strong",{children:"PATCH"}),"：只提供需要更新的字段，服务器合并更新。PATCH 更高效，但实现复杂度更高。"]}),e.jsx("h2",{id:"status-codes",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、状态码正确使用"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HTTP 状态码传达操作结果，正确使用状态码能让客户端准确理解响应语义。"}),e.jsx(s,{code:`# RESTful API 常用状态码

# 成功响应
200 OK                    # GET/PUT/PATCH 成功
201 Created               # POST 创建成功（返回 Location 头）
204 No Content            # DELETE 成功（无返回内容）

# 客户端错误
400 Bad Request           # 请求参数错误
401 Unauthorized          # 未认证（需要登录）
403 Forbidden             # 已认证但无权限
404 Not Found             # 资源不存在
409 Conflict              # 资源冲突（如重复创建）
422 Unprocessable Entity  # 语义错误（如验证失败）
429 Too Many Requests     # 请求频率过高

# 服务器错误
500 Internal Server Error # 服务器内部错误
502 Bad Gateway           # 网关错误
503 Service Unavailable   # 服务不可用（维护/过载）

# 实际示例
POST /users
# 成功
Response: 201 Created
Location: /users/123

# 邮箱已存在
Response: 409 Conflict
{
  "error": "CONFLICT",
  "message": "Email already exists"
}

# 参数验证失败
Response: 422 Unprocessable Entity
{
  "error": "VALIDATION_ERROR",
  "details": [
    {"field": "email", "message": "Invalid email format"}
  ]
}`,language:"python",highlights:[4,10,17,22,27,34],filename:"status-codes.py",description:"RESTful API 状态码使用"}),e.jsxs(t,{type:"warning",title:"避免滥用 200 OK",children:["很多 API 无论成功失败都返回 200 OK，通过响应体中的 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:'{ "code": 0 }'})," 区分结果。这种做法违反了 HTTP 语义，导致客户端无法利用 HTTP 层的缓存、重试等机制。应正确使用状态码。"]}),e.jsx("h2",{id:"versioning",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、API 版本管理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"API 演进过程中需要保持向后兼容，版本管理策略决定了如何引入破坏性变更。"}),e.jsx(s,{code:`# API 版本管理策略

# 策略 1：URI 路径版本（最常用）
GET /api/v1/users
GET /api/v2/users

# 优点：简单直观，易于路由
# 缺点：URI 污染，版本升级需修改客户端代码

# 策略 2：查询参数版本
GET /api/users?version=1
GET /api/users?v=2

# 优点：URI 干净
# 缺点：容易被忽略，缓存困难

# 策略 3：自定义 Header
GET /api/users
Header: API-Version: 2

# 优点：URI 干净，符合 REST 精神
# 缺点：不易发现，调试困难

# 策略 4：Content Negotiation（推荐）
GET /api/users
Header: Accept: application/vnd.myapp.v2+json

# 优点：符合 HTTP 规范，支持内容协商
# 缺点：实现复杂

# 最佳实践
# 1. 优先保持向后兼容（添加字段而非删除）
# 2. 废弃旧版本前提供迁移指南
# 3. 设置版本过期时间（如 v1 在 v2 发布后保留 6 个月）
# 4. 使用语义化版本（v1.0.0）而非日期版本（v2024-01-01）`,language:"python",highlights:[4,11,18,25,33],filename:"api-versioning.py",description:"API 版本管理策略"}),e.jsxs(i,{label:"向后兼容技巧",children:[e.jsx("strong",{children:"添加字段"}),"：新增可选字段不影响旧客户端。",e.jsx("br",{}),e.jsx("strong",{children:"不要删除字段"}),"：标记为 deprecated，等待客户端迁移后再删除。",e.jsx("br",{}),e.jsx("strong",{children:"不要改变字段类型"}),"：如 string → number 会破坏兼容性。",e.jsx("br",{}),e.jsx("strong",{children:"枚举值只增不减"}),"：新增枚举值，不删除旧值。"]}),e.jsx("h2",{id:"pagination",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、分页策略"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"大数据集需要分页返回，常见的分页策略有偏移量分页和游标分页。"}),e.jsx(s,{code:`# 分页策略对比

# 策略 1：偏移量分页（Offset-Based）
GET /users?page=2&limit=20
# 或
GET /users?offset=20&limit=20

Response:
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 100,
    "total_pages": 5
  }
}

# 优点：简单易用，支持跳转到任意页
# 缺点：深度分页性能差（OFFSET 10000 LIMIT 20 需扫描 10020 条记录）

# 策略 2：游标分页（Cursor-Based，推荐）
GET /users?limit=20&cursor=eyJpZCI6MTIzfQ==

Response:
{
  "data": [...],
  "pagination": {
    "limit": 20,
    "next_cursor": "eyJpZCI6MTQzfQ==",
    "has_more": true
  }
}

# 优点：性能稳定，适合大数据集和实时数据
# 缺点：不支持随机跳转，实现复杂

# 策略 3：基于 ID 的范围分页
GET /users?limit=20&after_id=123

# 适用场景：ID 连续且有序的场景

# 最佳实践
# - 默认限制每页数量（如 limit=20，max=100）
# - 返回总记录数（偏移量分页）或 next_cursor（游标分页）
# - 提供上一页/下一页链接（HATEOAS）
# - 对于实时数据（如动态流），优先使用游标分页`,language:"python",highlights:[4,10,23,29,40],filename:"pagination.py",description:"分页策略对比"}),e.jsx(t,{type:"tip",title:"何时使用哪种分页？",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"偏移量分页"}),"：数据量小（<10万）、需要页码导航的场景（如电商商品列表）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"游标分页"}),"：数据量大、实时数据、无限滚动场景（如社交媒体动态、日志流）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"范围分页"}),"：ID 连续有序、需要高性能的场景"]})]})}),e.jsx("h2",{id:"filtering-sorting",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、过滤与排序"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"查询参数用于过滤、排序和字段选择，让客户端灵活获取所需数据。"}),e.jsx(s,{code:`# 过滤、排序和字段选择

# 1. 简单过滤
GET /users?status=active&role=admin

# 2. 多值过滤
GET /users?status=active,inactive
GET /users?tags=java,spring

# 3. 范围过滤
GET /users?created_at_gte=2024-01-01&created_at_lte=2024-12-31
GET /products?price_min=100&price_max=500

# 4. 模糊搜索
GET /users?name_like=张
GET /articles?q=spring+boot

# 5. 排序
GET /users?sort=created_at&order=desc
GET /products?sort=price,-rating  # 多字段排序

# 6. 字段选择（Field Selection）
GET /users?fields=id,name,email
Response:
[
  {"id": 1, "name": "张三", "email": "zhang@example.com"},
  ...
]

# 7. 展开关联资源
GET /users/123?expand=orders,profile

# 最佳实践
# - 使用一致的参数命名（snake_case 或 camelCase）
# - 支持组合过滤（AND 逻辑）
# - 对于复杂查询，考虑提供 GraphQL 或专用搜索端点
# - 记录查询参数的最大限制（防止滥用）`,language:"python",highlights:[3,7,11,15,19,23,30,35],filename:"filtering-sorting.py",description:"过滤与排序示例"}),e.jsx("h2",{id:"hateoas",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、HATEOAS"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"HATEOAS（Hypermedia As The Engine Of Application State）是 REST 的最高成熟度级别，响应中包含相关链接，客户端通过链接发现可用操作。"}),e.jsx(s,{code:`# HATEOAS 示例

# 获取用户详情
GET /users/123

Response:
{
  "id": 123,
  "name": "张三",
  "email": "zhang@example.com",
  "_links": {
    "self": {
      "href": "/users/123",
      "method": "GET"
    },
    "update": {
      "href": "/users/123",
      "method": "PUT"
    },
    "delete": {
      "href": "/users/123",
      "method": "DELETE"
    },
    "orders": {
      "href": "/users/123/orders",
      "method": "GET"
    }
  }
}

# 客户端无需硬编码 URI，通过 _links 发现可用操作
# 服务器可以自由更改 URI 结构，不影响客户端

# HAL（Hypertext Application Language）格式
# 业界常用的 HATEOAS 实现标准

# 现实情况
# 大多数 REST API 未达到 HATEOAS 级别
# 原因：实现复杂，客户端支持有限
# 建议：至少提供文档化的 URI 模板`,language:"python",highlights:[7,21,32,37],filename:"hateoas.py",description:"HATEOAS 示例"}),e.jsxs(t,{type:"info",title:" Richardson 成熟度模型",children:[e.jsx("strong",{children:"Level 0"}),"：使用 HTTP 作为传输协议（SOAP over HTTP）",e.jsx("br",{}),e.jsx("strong",{children:"Level 1"}),"：使用资源（URI 标识资源）",e.jsx("br",{}),e.jsx("strong",{children:"Level 2"}),"：使用 HTTP 方法（GET/POST/PUT/DELETE）",e.jsx("br",{}),e.jsx("strong",{children:"Level 3"}),"：使用 HATEOAS（超媒体驱动）",e.jsx("br",{}),"大多数生产 API 处于 Level 2，Level 3 在实践中较少见。"]}),e.jsx("h2",{id:"security",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、安全最佳实践"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"API 安全涉及认证、授权、加密、限流等多个层面。"}),e.jsx(s,{code:`# API 安全措施

# 1. 认证（Authentication）
# - JWT（JSON Web Token）：无状态，适合分布式系统
# - OAuth 2.0 / OIDC：第三方授权
# - API Key：简单场景，服务器间调用

# JWT 示例
Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 2. 授权（Authorization）
# - RBAC（基于角色的访问控制）
# - ABAC（基于属性的访问控制）
# - Scope-based（OAuth 2.0 作用域）

# 3. HTTPS 强制
# - 所有 API 端点必须使用 HTTPS
# - 启用 HSTS（HTTP Strict Transport Security）

# 4. 输入验证
# - 验证所有输入参数（类型、长度、格式）
# - 防止 SQL 注入、XSS、命令注入
# - 使用白名单而非黑名单

# 5. 速率限制（Rate Limiting）
Header: X-RateLimit-Limit: 100
Header: X-RateLimit-Remaining: 95
Header: X-RateLimit-Reset: 1620000000

# 429 Too Many Requests 当超出限制时

# 6. CORS 配置
# - 明确指定允许的源（Access-Control-Allow-Origin）
# - 避免使用 *（通配符）

# 7. 敏感数据保护
# - 不在 URI 中传递敏感信息（如密码）
# - 不在日志中记录敏感数据
# - 使用字段脱敏（如手机号：138****1234）

# 8. 审计日志
# - 记录所有写操作（POST/PUT/PATCH/DELETE）
# - 记录操作者、时间、IP、请求内容`,language:"python",highlights:[9,17,21,26,33,37,41,45],filename:"api-security.py",description:"API 安全最佳实践"}),e.jsxs(i,{label:"JWT vs Session",children:[e.jsx("strong",{children:"JWT"}),"：无状态，适合微服务和移动端，但无法立即失效（需配合黑名单）。",e.jsx("br",{}),e.jsx("strong",{children:"Session"}),"：服务端存储状态，支持立即失效，但需要会话粘滞或共享存储（Redis）。"]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：REST 就是 CRUD",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 RESTful API 只是对数据库表的 CRUD 操作。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),'：REST 是架构风格，强调资源建模和统一接口。资源不一定是数据库表，可以是业务概念（如"订单"、"支付"）。操作也不限于 CRUD，可以包含业务逻辑（如"审核订单"、"取消支付"）。']})]}),e.jsxs(t,{type:"danger",title:"误区 2：必须严格遵守 REST 约束",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为不符合所有 REST 约束的 API 就不是 RESTful。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：REST 是一个光谱，大多数生产 API 处于 Level 2（使用资源和 HTTP 方法），未达到 HATEOAS 级别。 pragmatic REST（实用主义 REST）比纯理论更重要。关键是保持一致性和可预测性。"]})]}),e.jsxs(t,{type:"danger",title:"误区 3：GET 请求不能有请求体",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 HTTP 规范禁止 GET 请求携带 Body。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：HTTP 规范没有明确禁止 GET 带 Body，但许多服务器、代理和缓存会忽略 GET 的 Body。最佳实践是使用查询参数传递 GET 的参数，避免兼容性问题。"]})]}),e.jsxs(t,{type:"warning",title:"误区 4：版本必须在 URI 中",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 URI 路径版本是唯一正确的版本管理方式。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：URI 版本最简单直观，但不是唯一选择。Accept Header 版本更符合 HTTP 规范，但实现复杂。选择哪种策略取决于团队偏好和客户端需求。关键是保持一致性并文档化。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、面试真题"}),e.jsx(m,{questions:[{question:"RESTful API 的核心原则是什么？",answer:"① 客户端-服务器分离；② 无状态（每个请求独立）；③ 可缓存；④ 统一接口（资源标识、通过表示操作、自描述消息、HATEOAS）；⑤ 分层系统；⑥ 按需代码（可选）。最重要的是无状态和统一接口。"},{question:"PUT 和 PATCH 的区别？",answer:"PUT 是全量更新，客户端提供完整的资源表示，服务器用新数据完全替换旧数据。PATCH 是部分更新，客户端只提供需要更新的字段，服务器合并更新。PUT 是幂等的，PATCH 理论上可以不幂等但实践中通常设计为幂等。"},{question:"如何设计一个分页 API？",answer:"两种主流方案：① 偏移量分页（page/limit 或 offset/limit），简单易用但深度分页性能差；② 游标分页（cursor/limit），性能稳定但不支持随机跳转。大数据集和实时数据优先使用游标分页。响应中应包含分页元数据（total、next_cursor 等）。"},{question:"RESTful API 如何保证安全性？",answer:"① 使用 HTTPS 加密传输；② JWT 或 OAuth 2.0 认证；③ RBAC 或 ABAC 授权；④ 输入验证防止注入攻击；⑤ 速率限制防止滥用；⑥ CORS 配置限制跨域访问；⑦ 敏感数据脱敏；⑧ 审计日志记录操作。多层防护，纵深防御。"},{question:"什么是 HATEOAS？为什么很少见到？",answer:"HATEOAS（Hypermedia As The Engine Of Application State）是 REST 的最高成熟度级别，响应中包含相关链接，客户端通过链接发现可用操作而非硬编码 URI。实践中很少见的原因：① 实现复杂；② 客户端支持有限；③ 文档化 URI 模板已能满足大部分需求；④ 增加响应体积。"},{question:"如何设计 API 的版本管理？",answer:"四种策略：① URI 路径版本（/api/v1/users），最常用；② 查询参数版本（?v=1）；③ 自定义 Header（API-Version: 1）；④ Content Negotiation（Accept: application/vnd.api.v1+json），最符合 HTTP 规范。优先保持向后兼容，添加字段而非删除，设置版本过期时间。"},{question:"GET 请求可以缓存吗？如何控制缓存？",answer:"GET 请求是可缓存的（安全方法）。通过 Cache-Control 头部控制：max-age 设置缓存时长，no-cache 要求每次验证，no-store 禁止缓存，private 仅浏览器缓存，public 允许 CDN 缓存。ETag 和 Last-Modified 用于协商缓存。POST/PUT/DELETE 默认不可缓存。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十二、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/10-network-protocol/http-protocol",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"HTTP/HTTPS 协议"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"HTTP 方法、状态码"})]}),e.jsxs("a",{href:"/docs/06-spring-framework/spring-mvc",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-accent mb-1",children:"框架实现 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-accent",children:"Spring MVC"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"@RestController、@RequestMapping"})]}),e.jsxs("a",{href:"/docs/08-microservices/api-gateway",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"高级主题 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"API 网关"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"限流、鉴权、路由"})]}),e.jsxs("a",{href:"/docs/06-spring-framework/spring-security",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"安全实践 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"Spring Security"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"认证、授权、OAuth 2.0"})]})]}),e.jsx(t,{type:"info",title:"学习建议",children:"RESTful API 设计是一门艺术，建议通过以下方式深入学习：① 阅读《RESTful Web APIs》和《Build APIs You Won't Hate》；② 研究 GitHub API、Stripe API 等优秀实践；③ 使用 OpenAPI/Swagger 文档化 API；④ 实践 Postman 测试和 Mock 服务器；⑤ 了解 GraphQL 作为 REST 的替代方案。"}),e.jsx(d,{...a(r.category,r.id)})]})}),e.jsx(o,{items:x})]})}export{j as default};
