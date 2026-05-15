import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'http-evolution', text: '一、HTTP 协议演进', level: 2 },
  { id: 'http1.1', text: '二、HTTP/1.1 核心特性', level: 2 },
  { id: 'http2', text: '三、HTTP/2 性能优化', level: 2 },
  { id: 'http3', text: '四、HTTP/3 与 QUIC', level: 2 },
  { id: 'https', text: '五、HTTPS 安全机制', level: 2 },
  { id: 'status-codes', text: '六、HTTP 状态码详解', level: 2 },
  { id: 'cache', text: '七、缓存策略', level: 2 },
  { id: 'cookies-session', text: '八、Cookie 与 Session', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function HttpProtocol({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              HTTP（HyperText Transfer Protocol）是<strong className="text-accent">应用层协议</strong>，用于客户端与服务器之间的超文本传输；HTTPS 是其安全版本，通过 TLS/SSL 加密通信，保障数据传输的机密性和完整性。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 HTTPS？">
            HTTP 明文传输存在窃听、篡改和身份伪造风险。HTTPS 通过 TLS 加密通道解决这些问题，已成为现代 Web 的标准配置。
          </Callout>

          <h2 id="http-evolution" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、HTTP 协议演进
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HTTP 协议经历了从 0.9 到 3.0 的演进，每次升级都带来了显著的性能提升和功能增强。
          </p>

          <DiagramBlock title="HTTP 协议演进时间线">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌──────────┬────────────┬─────────────────────────────┐
│  版本    │   年份     │         核心特性             │
├──────────┼────────────┼─────────────────────────────┤
│ HTTP/0.9 │   1991     │ 仅支持 GET，无 Header       │
│ HTTP/1.0 │   1996     │ 多方法、Header、状态码      │
│ HTTP/1.1 │   1997     │ 持久连接、管道化、缓存      │
│ HTTP/2   │   2015     │ 二进制分帧、多路复用、HPACK │
│ HTTP/3   │   2022     │ QUIC、0-RTT、抗队头阻塞     │
└──────────┴────────────┴─────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="关键里程碑">
            HTTP/1.1 是目前使用最广泛的版本，占全球流量的 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">~70%</code>。HTTP/2 和 HTTP/3 正在快速普及，尤其在 CDN 和大型网站中。
          </SideNote>

          <h2 id="http1.1" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、HTTP/1.1 核心特性
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HTTP/1.1 引入了持久连接、管道化等关键特性，奠定了现代 HTTP 的基础。
          </p>

          <Playground
            code={`# HTTP/1.1 请求示例
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml
Accept-Language: en-US,en;q=0.5
Connection: keep-alive  # 持久连接

# HTTP/1.1 响应示例
HTTP/1.1 200 OK
Date: Mon, 15 May 2026 10:00:00 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 1234
Cache-Control: max-age=3600
Connection: keep-alive

<!DOCTYPE html>...`}
            language="http"
            highlights={[6, 13]}
            filename="http1.1-example.txt"
            description="HTTP/1.1 请求响应示例"
          />

          <Callout type="info" title="持久连接（Keep-Alive）">
            HTTP/1.0 每次请求都需要建立新的 TCP 连接（三次握手 + 慢启动），而 HTTP/1.1 默认启用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">Connection: keep-alive</code>，允许在同一个 TCP 连接上发送多个请求，减少延迟。
          </Callout>

          <h2 id="http2" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、HTTP/2 性能优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HTTP/2 通过二进制分帧、多路复用、头部压缩等技术，大幅提升了传输效率。
          </p>

          <DiagramBlock title="HTTP/2 多路复用 vs HTTP/1.1 串行">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
HTTP/1.1（串行）：
Request 1 ──────────────▶ Response 1
Request 2 ────────────────────────▶ Response 2  # 等待 R1 完成
Request 3 ─────────────────────────────────────▶ Response 3

HTTP/2（多路复用）：
Stream 1: ──F1──F2──F3──▶  # 帧交错传输
Stream 2: ──F1──F2──────▶
Stream 3: ──F1──────────▶
所有流共享同一连接，无队头阻塞
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# HTTP/2 核心特性对比

# 1. 二进制分帧（Binary Framing）
# HTTP/1.1: 文本格式，解析复杂
# HTTP/2: 二进制格式，高效解析

# 2. 多路复用（Multiplexing）
# 多个请求/响应在同一连接上并发传输
# 解决了 HTTP/1.1 的队头阻塞问题

# 3. 头部压缩（HPACK）
# 使用 Huffman 编码 + 静态/动态表
# 减少重复头部字段的传输开销

# 4. 服务器推送（Server Push）
# 服务器可以主动推送资源给客户端
# 例如：HTML 页面加载时推送 CSS/JS

# 5. 优先级（Stream Priority）
# 客户端可以为不同流设置优先级
# 浏览器优先加载关键资源（CSS > JS > 图片）`}
            language="python"
            highlights={[5, 10, 14, 19, 23]}
            filename="http2-features.py"
            description="HTTP/2 核心特性总结"
          />

          <SideNote label="HPACK 压缩">
            HTTP/2 使用 HPACK 算法压缩头部，通过维护静态表（预定义常用字段）和动态表（运行时学习），可以将常见的头部字段（如 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">content-type</code>）压缩为单个字节。
          </SideNote>

          <h2 id="http3" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、HTTP/3 与 QUIC
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HTTP/3 基于 QUIC 协议（Quick UDP Internet Connections），解决了 TCP 层面的队头阻塞问题。
          </p>

          <Playground
            code={`# HTTP/3 vs HTTP/2 关键差异

# 传输层协议
# HTTP/2: TCP + TLS
# HTTP/3: QUIC (UDP + TLS 1.3)

# 连接建立
# HTTP/2: TCP 三次握手 + TLS 握手 = 2-3 RTT
# HTTP/3: 0-RTT 或 1-RTT（首次连接）

# 队头阻塞
# HTTP/2: 存在 TCP 层面的队头阻塞
# HTTP/3: 完全消除（每个 Stream 独立）

# 连接迁移
# HTTP/2: IP 变化需重新建立连接
# HTTP/3: 支持连接迁移（基于 Connection ID）

# 拥塞控制
# HTTP/2: 依赖 TCP 拥塞控制
# HTTP/3: QUIC 自定义拥塞控制算法`}
            language="python"
            highlights={[4, 8, 12, 16, 20]}
            filename="http3-vs-http2.py"
            description="HTTP/3 与 HTTP/2 对比"
          />

          <Callout type="warning" title="HTTP/3 的挑战">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>UDP 防火墙限制</strong>：部分企业网络可能阻止 UDP 流量</li>
              <li><strong>CPU 开销</strong>：QUIC 的用户态实现比内核态 TCP 消耗更多 CPU</li>
              <li><strong>生态成熟度</strong>：工具链和监控支持仍在完善中</li>
              <li><strong>兼容性</strong>：老旧客户端不支持 HTTP/3</li>
            </ul>
          </Callout>

          <h2 id="https" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、HTTPS 安全机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HTTPS = HTTP + TLS/SSL，通过加密、认证和完整性校验保障通信安全。
          </p>

          <DiagramBlock title="TLS 握手流程（简化版）">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
客户端                          服务器
  │                               │
  │── ClientHello ──────────────▶│  # 支持的 TLS 版本、加密套件
  │◀── ServerHello ──────────────│  # 选择的加密套件、证书
  │◀── Certificate ──────────────│  # 服务器证书
  │                               │
  │── Key Exchange ─────────────▶│  # 密钥交换（ECDHE/RSA）
  │── Finished ─────────────────▶│  # 验证握手完整性
  │◀── Finished ─────────────────│
  │                               │
  │══ 加密通信 ══════════════════│  # 使用会话密钥加密数据
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# HTTPS 三大安全保障

# 1. 机密性（Confidentiality）
# - 对称加密（AES-256-GCM）加密数据传输
# - 非对称加密（RSA/ECDHE）交换会话密钥

# 2. 完整性（Integrity）
# - HMAC 或 AEAD 模式防止数据篡改
# - 消息摘要（SHA-256）验证数据一致性

# 3. 身份认证（Authentication）
# - X.509 证书验证服务器身份
# - CA（证书颁发机构）信任链验证
# - 可选的双向认证（mTLS）

# TLS 1.3 优化
# - 减少握手往返次数（1-RTT）
# - 移除不安全算法（RC4、MD5、SHA-1）
# - 强制前向保密（PFS）`}
            language="python"
            highlights={[4, 9, 14, 19]}
            filename="https-security.py"
            description="HTTPS 安全机制详解"
          />

          <SideNote label="证书类型">
            <strong>DV（域名验证）</strong>：仅验证域名所有权，适合个人网站。<br/>
            <strong>OV（组织验证）</strong>：验证企业信息，适合企业官网。<br/>
            <strong>EV（扩展验证）</strong>：严格验证，浏览器显示绿色地址栏（已弃用）。
          </SideNote>

          <h2 id="status-codes" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、HTTP 状态码详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HTTP 状态码分为 5 类，每类代表不同的响应语义。
          </p>

          <DiagramBlock title="HTTP 状态码分类">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌────────┬──────────────────────────────────────┐
│  范围  │           含义                       │
├────────┼──────────────────────────────────────┤
│ 1xx    │ 信息性响应（继续处理）                │
│ 2xx    │ 成功（200 OK, 201 Created）          │
│ 3xx    │ 重定向（301 Moved, 302 Found）       │
│ 4xx    │ 客户端错误（404 Not Found）          │
│ 5xx    │ 服务器错误（500 Internal Error）     │
└────────┴──────────────────────────────────────┘

常见状态码：
• 200 OK - 请求成功
• 201 Created - 资源创建成功
• 204 No Content - 成功但无返回内容
• 301 Moved Permanently - 永久重定向
• 302 Found - 临时重定向
• 304 Not Modified - 资源未修改（缓存命中）
• 400 Bad Request - 请求语法错误
• 401 Unauthorized - 未认证
• 403 Forbidden - 无权限
• 404 Not Found - 资源不存在
• 429 Too Many Requests - 请求频率过高
• 500 Internal Server Error - 服务器内部错误
• 502 Bad Gateway - 网关错误
• 503 Service Unavailable - 服务不可用
• 504 Gateway Timeout - 网关超时
            `}</pre>
          </DiagramBlock>

          <Callout type="tip" title="301 vs 302">
            <strong>301（永久重定向）</strong>：搜索引擎会更新索引，浏览器会缓存重定向规则。<br/>
            <strong>302（临时重定向）</strong>：搜索引擎保留原 URL，每次请求都会检查重定向目标。
          </Callout>

          <h2 id="cache" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、缓存策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HTTP 缓存通过减少重复请求，显著提升页面加载速度和降低服务器负载。
          </p>

          <Playground
            code={`# HTTP 缓存控制头部

# 1. Cache-Control（优先级最高）
Cache-Control: max-age=3600              # 缓存 1 小时
Cache-Control: no-cache                  # 每次都向服务器验证
Cache-Control: no-store                  # 禁止缓存
Cache-Control: private                   # 仅浏览器缓存（CDN 不缓存）
Cache-Control: public                    # 允许 CDN 缓存

# 2. ETag / If-None-Match（协商缓存）
# 服务器返回资源的哈希值
ETag: "abc123"
# 客户端下次请求时携带
If-None-Match: "abc123"
# 如果资源未变化，返回 304 Not Modified

# 3. Last-Modified / If-Modified-Since
Last-Modified: Wed, 15 May 2026 10:00:00 GMT
If-Modified-Since: Wed, 15 May 2026 10:00:00 GMT

# 4. Expires（HTTP/1.0，已被 Cache-Control 取代）
Expires: Wed, 15 May 2026 11:00:00 GMT

# 最佳实践
# - 静态资源（JS/CSS/图片）：max-age=31536000（1年）+ 文件名 hash
# - HTML 页面：no-cache（每次验证）
# - API 响应：根据业务需求设置 max-age`}
            language="python"
            highlights={[4, 7, 11, 18, 23, 27]}
            filename="http-cache.py"
            description="HTTP 缓存策略详解"
          />

          <DiagramBlock title="缓存决策流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
客户端发起请求
       │
       ▼
是否有缓存？ ──否──▶ 直接请求服务器
       │
      是
       │
       ▼
Cache-Control 检查
       │
       ├── max-age 未过期 ──▶ 直接使用缓存（强缓存）
       │
       └── max-age 已过期 ──▶ 向服务器验证
                                    │
                                    ├── ETag 匹配 ──▶ 304 Not Modified（使用缓存）
                                    │
                                    └── ETag 不匹配 ──▶ 200 OK（返回新资源）
            `}</pre>
          </DiagramBlock>

          <h2 id="cookies-session" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、Cookie 与 Session
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Cookie 和 Session 是实现状态管理的两种机制，常用于用户登录、购物车等场景。
          </p>

          <Playground
            code={`# Cookie 示例
# 服务器设置 Cookie
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure; SameSite=Strict

# 客户端自动携带 Cookie
Cookie: sessionId=abc123

# Cookie 属性说明
# - Path: Cookie 生效路径
# - Domain: Cookie 生效域名
# - Expires/Max-Age: 过期时间
# - HttpOnly: 禁止 JavaScript 访问（防 XSS）
# - Secure: 仅通过 HTTPS 传输
# - SameSite: 防止 CSRF 攻击（Strict/Lax/None）

# Session 工作原理
# 1. 用户登录成功后，服务器生成 sessionId
# 2. 服务器将 sessionId 存储在 Redis/数据库中
# 3. 服务器通过 Set-Cookie 将 sessionId 发送给客户端
# 4. 客户端后续请求自动携带 sessionId
# 5. 服务器通过 sessionId 查找用户信息

# JWT vs Session
# Session: 服务端存储状态，支持立即失效，适合敏感操作
# JWT: 客户端存储令牌，无状态，适合分布式系统`}
            language="python"
            highlights={[2, 6, 14, 21]}
            filename="cookie-session.py"
            description="Cookie 与 Session 机制"
          />

          <Callout type="danger" title="Cookie 安全风险">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>XSS 攻击</strong>：恶意脚本窃取 Cookie → 使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">HttpOnly</code> 标志</li>
              <li><strong>CSRF 攻击</strong>：跨站请求伪造 → 使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">SameSite</code> 标志</li>
              <li><strong>中间人攻击</strong>：窃听 Cookie → 使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">Secure</code> 标志（仅 HTTPS）</li>
            </ul>
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1：HTTPS 很慢">
            <p className="mb-2"><strong>错误认知</strong>：认为 HTTPS 因为加密解密会导致性能下降。</p>
            <p><strong>正确理解</strong>：现代硬件和 TLS 1.3 优化使得 HTTPS 性能损耗可忽略不计（&lt;1%）。HTTP/2 和 HTTP/3 的多路复用反而能提升性能。Google 已将 HTTPS 作为搜索排名因素。</p>
          </Callout>

          <Callout type="danger" title="误区 2：HTTP/2 必须使用 HTTPS">
            <p className="mb-2"><strong>错误认知</strong>：认为 HTTP/2 协议要求必须加密。</p>
            <p><strong>正确理解</strong>：HTTP/2 规范本身不强制要求 HTTPS，但所有主流浏览器（Chrome、Firefox、Safari）仅在 HTTPS 下启用 HTTP/2。这是出于安全和推广 HTTPS 的考虑，而非协议限制。</p>
          </Callout>

          <Callout type="danger" title="误区 3：Cache-Control: no-cache 表示不缓存">
            <p className="mb-2"><strong>错误认知</strong>：认为 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">no-cache</code> 会禁用缓存。</p>
            <p><strong>正确理解</strong>：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">no-cache</code> 表示"使用前必须向服务器验证"，仍然会缓存资源。真正禁用缓存的是 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">no-store</code>。</p>
          </Callout>

          <Callout type="warning" title="误区 4：Cookie 可以存储大量数据">
            <p className="mb-2"><strong>错误认知</strong>：认为 Cookie 适合存储用户偏好、购物车等大数据。</p>
            <p><strong>正确理解</strong>：Cookie 有大小限制（通常 4KB），且每次请求都会携带，增加带宽开销。大数据应存储在 localStorage/sessionStorage 或服务端 Session 中，Cookie 仅用于存储标识符（如 sessionId）。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "HTTP/1.1、HTTP/2、HTTP/3 的主要区别是什么？",
              answer: "① HTTP/1.1：文本协议、持久连接、队头阻塞；② HTTP/2：二进制分帧、多路复用、头部压缩、服务器推送；③ HTTP/3：基于 QUIC（UDP）、0-RTT 连接、完全消除队头阻塞、支持连接迁移。性能提升：HTTP/2 比 1.1 快 20-50%，HTTP/3 在高丢包网络下比 HTTP/2 快 10-30%。"
            },
            {
              question: "HTTPS 的 TLS 握手过程是怎样的？",
              answer: "① ClientHello：客户端发送支持的 TLS 版本、加密套件列表；② ServerHello：服务器选择加密套件，返回证书；③ 密钥交换：客户端验证证书，生成预主密钥并用服务器公钥加密（RSA）或通过 ECDHE 协商；④ 双方计算会话密钥；⑤ Finished：验证握手完整性；⑥ 使用会话密钥进行对称加密通信。TLS 1.3 简化为 1-RTT。"
            },
            {
              question: "强缓存和协商缓存的区别？",
              answer: "强缓存：浏览器直接使用本地缓存，不向服务器发送请求（Cache-Control: max-age）。协商缓存：浏览器向服务器发送请求，携带 ETag 或 Last-Modified，服务器判断资源是否变化，返回 304（使用缓存）或 200（返回新资源）。强缓存优先级高于协商缓存。"
            },
            {
              question: "什么是 HTTP 队头阻塞？如何解决？",
              answer: "HTTP/1.1 队头阻塞：同一 TCP 连接上的请求必须按顺序处理，前一个请求阻塞会影响后续请求。HTTP/2 多路复用解决了应用层队头阻塞，但 TCP 层面的丢包重传仍会导致阻塞。HTTP/3 基于 QUIC（UDP），每个 Stream 独立传输，彻底消除队头阻塞。"
            },
            {
              question: "Cookie 的 SameSite 属性有什么作用？",
              answer: "SameSite 防止 CSRF 攻击。Strict：跨站请求不携带 Cookie；Lax：顶级导航（如点击链接）携带 Cookie，其他跨站请求不携带；None：任何情况都携带 Cookie（需配合 Secure）。默认值为 Lax（Chrome 80+）。"
            },
            {
              question: "如何设计一个高效的静态资源缓存策略？",
              answer: "① 文件名添加 hash（如 app.a1b2c3.js），设置 Cache-Control: max-age=31536000（1年）；② HTML 文件设置 no-cache，每次验证；③ 使用 CDN 缓存静态资源；④ 启用 Gzip/Brotli 压缩；⑤ 使用 HTTP/2 多路复用并行加载资源；⑥ 对于频繁更新的资源，使用版本号或查询参数（?v=1.2.3）。"
            },
            {
              question: "HTTP/2 的服务器推送（Server Push）有什么优缺点？",
              answer: "优点：服务器可以主动推送关键资源（CSS/JS），减少往返次数。缺点：① 浏览器可能已经缓存了资源，造成浪费；② 推送过多资源会占用带宽；③ 无法精确知道客户端需要什么资源。现代最佳实践是使用 <code className=\"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]\"><link rel=\"preload\"></code> 替代 Server Push。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/10-network-protocol/tcp-ip-basics" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">TCP/IP 协议栈</div>
              <div className="text-[12px] text-ink-muted mt-1">三次握手、滑动窗口</div>
            </a>
            <a href="/docs/10-network-protocol/restful-api" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">应用场景 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">RESTful API 设计</div>
              <div className="text-[12px] text-ink-muted mt-1">资源命名、状态码使用</div>
            </a>
            <a href="/docs/06-spring-framework/spring-mvc" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">框架集成 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">Spring MVC</div>
              <div className="text-[12px] text-ink-muted mt-1">Controller、拦截器</div>
            </a>
            <a href="/docs/08-microservices/api-gateway" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">高级主题 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">API 网关</div>
              <div className="text-[12px] text-ink-muted mt-1">限流、鉴权、路由</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            HTTP/HTTPS 是 Web 开发的基石，建议通过以下方式深入学习：① 使用 Chrome DevTools Network 面板观察实际请求；② 使用 Wireshark 抓包分析 TCP/TLS 握手；③ 阅读 RFC 文档（RFC 7230-7235 for HTTP/1.1，RFC 7540 for HTTP/2，RFC 9114 for HTTP/3）；④ 实践配置 Nginx 的 HTTPS 和缓存策略。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
