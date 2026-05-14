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
  { id: 'why-gateway', text: '一、为什么需要 API 网关?', level: 2 },
  { id: 'core-functions', text: '二、核心功能', level: 2 },
  { id: 'spring-cloud-gateway', text: '三、Spring Cloud Gateway', level: 2 },
  { id: 'route-config', text: '四、路由配置详解', level: 2 },
  { id: 'filters', text: '五、过滤器机制', level: 2 },
  { id: 'rate-limiting', text: '六、限流策略', level: 2 },
  { id: 'auth', text: '七、统一鉴权', level: 2 },
  { id: 'zuul-vs-gateway', text: '八、Zuul vs Gateway 对比', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function ApiGateway({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              API 网关是微服务架构的<strong className="text-accent">统一入口</strong>,作为反向代理服务器处理所有客户端请求,提供路由转发、负载均衡、鉴权认证、限流熔断、日志监控等横切关注点,屏蔽后端微服务的复杂性。
            </p>
          </blockquote>

          <Callout type="tip" title="API 网关的核心价值">
            API 网关将跨服务的通用逻辑(鉴权、限流、日志)从各个微服务中抽离出来,实现<strong>关注点分离</strong>,避免代码重复,降低维护成本。
          </Callout>

          <h2 id="why-gateway" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、为什么需要 API 网关?
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            在没有网关的微服务架构中,客户端需要直接调用多个微服务,存在以下问题:
          </p>

          <DiagramBlock title="无网关架构的问题">
{`graph LR
    Client[客户端] --> ServiceA[Service A]
    Client --> ServiceB[Service B]
    Client --> ServiceC[Service C]
    
    subgraph "问题"
        P1[❌ 客户端需知道所有服务地址]
        P2[❌ 每个服务都要实现鉴权]
        P3[❌ CORS 跨域配置复杂]
        P4[❌ 难以统一限流和监控]
    end`}
          </DiagramBlock>

          <DiagramBlock title="引入 API 网关后的优势">
{`graph TB
    Client[客户端] --> Gateway[API Gateway]
    
    subgraph "网关职责"
        G1[✅ 统一入口]
        G2[✅ 集中鉴权]
        G3[✅ 统一限流]
        G4[✅ 日志聚合]
        G5[✅ SSL 终止]
    end
    
    Gateway --> ServiceA[Service A]
    Gateway --> ServiceB[Service B]
    Gateway --> ServiceC[Service C]`}
          </DiagramBlock>

          <h2 id="core-functions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、核心功能
          </h2>

          <table className="w-full border-collapse my-6 text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left font-semibold">功能</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">说明</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">示例场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2 font-semibold">路由转发</td>
                <td className="border border-border-light px-4 py-2">根据请求路径将流量分发到对应微服务</td>
                <td className="border border-border-light px-4 py-2">/api/orders → order-service</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-semibold">负载均衡</td>
                <td className="border border-border-light px-4 py-2">将请求均匀分发到多个服务实例</td>
                <td className="border border-border-light px-4 py-2">轮询、权重、最少连接数</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-semibold">鉴权认证</td>
                <td className="border border-border-light px-4 py-2">验证用户身份和权限</td>
                <td className="border border-border-light px-4 py-2">JWT Token 校验、OAuth2</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-semibold">限流降级</td>
                <td className="border border-border-light px-4 py-2">控制请求速率,防止过载</td>
                <td className="border border-border-light px-4 py-2">每秒最多 100 次请求</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-semibold">日志监控</td>
                <td className="border border-border-light px-4 py-2">记录请求日志,收集指标数据</td>
                <td className="border border-border-light px-4 py-2">响应时间、错误率、QPS</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-semibold">缓存加速</td>
                <td className="border border-border-light px-4 py-2">缓存热点数据,减少后端压力</td>
                <td className="border border-border-light px-4 py-2">商品详情、配置信息</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-semibold">协议转换</td>
                <td className="border border-border-light px-4 py-2">HTTP/WebSocket/gRPC 互转</td>
                <td className="border border-border-light px-4 py-2">前端 HTTP → 后端 gRPC</td>
              </tr>
            </tbody>
          </table>

          <h2 id="spring-cloud-gateway" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Spring Cloud Gateway
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring Cloud Gateway 是 Spring 官方推出的基于 Reactor 模型的响应式 API 网关,性能优于传统的 Zuul 1.x,支持异步非阻塞处理。
          </p>

          <SideNote label="技术选型建议">
            新项目推荐使用 Spring Cloud Gateway(基于 WebFlux),老项目如果使用 Zuul 1.x 建议迁移。Zuul 2.x 虽然支持异步但社区活跃度不如 Spring Cloud Gateway。
          </SideNote>

          <Playground
            code={`# pom.xml
<dependencies>
    <!-- Spring Cloud Gateway -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-gateway</artifactId>
    </dependency>
    
    <!-- Nacos 服务发现(可选) -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
    
    <!-- Redis 限流(可选) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis-reactive</artifactId>
    </dependency>
</dependencies>`}
            language="xml"
            highlights={[5, 11, 17]}
            filename="pom.xml"
            description="Spring Cloud Gateway 依赖配置"
          />

          <h2 id="route-config" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、路由配置详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            路由是网关的核心概念,由 ID、目标 URI、断言(Predicate)和过滤器(Filter)组成。
          </p>

          <Playground
            code={`spring:
  cloud:
    gateway:
      routes:
        # 路由 1: 订单服务
        - id: order-service
          uri: lb://order-service  # lb 表示使用负载均衡
          predicates:
            - Path=/api/orders/**  # 路径匹配
            - Method=GET,POST  # 方法匹配
            - Header=X-Request-Id, \\d+  # 请求头匹配(正则)
          filters:
            - StripPrefix=1  # 去掉 /api 前缀
            - AddRequestHeader=X-Gateway-Timestamp, $\{T}  # 添加请求头
            - name: RequestRateLimiter  # 限流过滤器
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20
        
        # 路由 2: 用户服务
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=1
            - RewritePath=/api/users/(?<segment>.*), /users/$\\{segment}  # 路径重写
        
        # 路由 3: 外部 API 代理
        - id: external-api
          uri: https://api.example.com
          predicates:
            - Path=/external/**
          filters:
            - StripPrefix=1
            - AddRequestHeader=Authorization, Bearer xxx  # 添加固定 Token`}
            language="yaml"
            highlights={[7, 9, 13, 15, 28]}
            filename="application.yml"
            description="Spring Cloud Gateway 路由配置示例"
          />

          <Callout type="info" title="Predicate 断言类型">
            Spring Cloud Gateway 内置多种断言工厂:<br/>
            • <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Path</code> - 路径匹配<br/>
            • <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Method</code> - HTTP 方法匹配<br/>
            • <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Header</code> - 请求头匹配<br/>
            • <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Query</code> - 查询参数匹配<br/>
            • <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Cookie</code> - Cookie 匹配<br/>
            • <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">After/Before/Between</code> - 时间匹配<br/>
            • <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">RemoteAddr</code> - IP 地址匹配
          </Callout>

          <h2 id="filters" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、过滤器机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            过滤器在请求被路由前后执行,分为 Pre Filter(路由前)和 Post Filter(路由后)。可以修改请求/响应、添加日志、鉴权等。
          </p>

          <DiagramBlock title="过滤器执行流程">
{`graph LR
    Request[客户端请求] --> PreFilter1[Pre Filter 1]
    PreFilter1 --> PreFilter2[Pre Filter 2]
    PreFilter2 --> Routing[路由转发]
    Routing --> PostFilter1[Post Filter 1]
    PostFilter1 --> PostFilter2[Post Filter 2]
    PostFilter2 --> Response[返回响应]`}
          </DiagramBlock>

          <Playground
            code={`@Component
public class AuthFilter implements GlobalFilter, Ordered {
    
    private static final String AUTH_HEADER = "Authorization";
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();
        
        // 白名单路径直接放行
        if (path.startsWith("/api/public/")) {
            return chain.filter(exchange);
        }
        
        // 检查 Token
        String token = request.getHeaders().getFirst(AUTH_HEADER);
        if (token == null || !token.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        
        // 验证 Token(可调用认证服务或本地解析 JWT)
        try {
            JwtUtils.validateToken(token.substring(7));
            // 将用户信息添加到请求头,传递给下游服务
            ServerHttpRequest modifiedRequest = request.mutate()
                .header("X-User-Id", JwtUtils.getUserId(token))
                .build();
            return chain.filter(exchange.mutate().request(modifiedRequest).build());
        } catch (Exception e) {
            exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
            return exchange.getResponse().setComplete();
        }
    }
    
    @Override
    public int getOrder() {
        return -1; // 优先级越高越先执行
    }
}`}
            language="java"
            highlights={[7, 12, 17, 26]}
            filename="AuthFilter.java"
            description="全局鉴权过滤器"
          />

          <h2 id="rate-limiting" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、限流策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            限流保护后端服务不被突发流量击垮。Spring Cloud Gateway 基于 Redis 实现令牌桶算法限流。
          </p>

          <Playground
            code={`spring:
  cloud:
    gateway:
      routes:
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
          filters:
            - name: RequestRateLimiter
              args:
                # 令牌填充速率(每秒允许的请求数)
                redis-rate-limiter.replenishRate: 10
                # 令牌桶容量(允许的最大突发请求数)
                redis-rate-limiter.burstCapacity: 20
                # 每次请求消耗的令牌数
                redis-rate-limiter.requestedTokens: 1
                # 限流键解析器 Bean 名称
                key-resolver: "#{@ipKeyResolver}"
  
  redis:
    host: localhost
    port: 6379

# 自定义限流键(按 IP 限流)
@Configuration
public class RateLimiterConfig {
    
    @Bean
    public KeyResolver ipKeyResolver() {
        return exchange -> Mono.just(
            exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()
        );
    }
    
    // 按用户 ID 限流
    @Bean
    public KeyResolver userKeyResolver() {
        return exchange -> Mono.just(
            exchange.getRequest().getHeaders().getFirst("X-User-Id")
        );
    }
}`}
            language="yaml"
            highlights={[13, 15, 19, 29, 37]}
            filename="rate-limiter-config.yml"
            description="基于 Redis 的限流配置"
          />

          <SideNote label="限流算法对比">
            • <strong>固定窗口:</strong> 简单但存在临界问题<br/>
            • <strong>滑动窗口:</strong> 更平滑但实现复杂<br/>
            • <strong>令牌桶:</strong> 允许突发流量,适合大多数场景<br/>
            • <strong>漏桶:</strong> 强制匀速,适合需要严格控速的场景
          </SideNote>

          <h2 id="auth" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、统一鉴权
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            网关层集中处理鉴权,下游服务无需重复验证,只需从请求头获取用户信息即可。
          </p>

          <Playground
            code={`@Component
public class JwtAuthFilter implements GlobalFilter {
    
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        
        // 1. 检查 Token 是否存在
        if (token == null || !token.startsWith("Bearer ")) {
            return unauthorized(exchange);
        }
        
        String jwt = token.substring(7);
        
        // 2. 验证 Token 是否过期(从 Redis 黑名单检查)
        Boolean isBlacklisted = redisTemplate.hasKey("blacklist:" + jwt);
        if (Boolean.TRUE.equals(isBlacklisted)) {
            return forbidden(exchange, "Token 已失效");
        }
        
        // 3. 解析 JWT 获取用户信息
        try {
            Claims claims = Jwts.parser()
                .setSigningKey("your-secret-key")
                .parseClaimsJws(jwt)
                .getBody();
            
            String userId = claims.getSubject();
            String role = claims.get("role", String.class);
            
            // 4. 将用户信息传递给下游服务
            ServerHttpRequest request = exchange.getRequest().mutate()
                .header("X-User-Id", userId)
                .header("X-User-Role", role)
                .build();
            
            return chain.filter(exchange.mutate().request(request).build());
        } catch (JwtException e) {
            return forbidden(exchange, "Token 无效");
        }
    }
    
    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }
    
    private Mono<Void> forbidden(ServerWebExchange exchange, String message) {
        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
        DataBuffer buffer = exchange.getResponse().bufferFactory()
            .wrap(message.getBytes(StandardCharsets.UTF_8));
        return exchange.getResponse().writeWith(Mono.just(buffer));
    }
}`}
            language="java"
            highlights={[8, 19, 26, 35]}
            filename="JwtAuthFilter.java"
            description="JWT 统一鉴权过滤器"
          />

          <h2 id="zuul-vs-gateway" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、Zuul vs Gateway 对比
          </h2>

          <table className="w-full border-collapse my-6 text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left font-semibold">特性</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">Zuul 1.x</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">Spring Cloud Gateway</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2">编程模型</td>
                <td className="border border-border-light px-4 py-2">Servlet(同步阻塞)</td>
                <td className="border border-border-light px-4 py-2">WebFlux(异步非阻塞)</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">性能</td>
                <td className="border border-border-light px-4 py-2">较低(线程池限制)</td>
                <td className="border border-border-light px-4 py-2">高(事件驱动)</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">长连接支持</td>
                <td className="border border-border-light px-4 py-2">❌ 不支持 WebSocket</td>
                <td className="border border-border-light px-4 py-2">✅ 支持 WebSocket</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">社区状态</td>
                <td className="border border-border-light px-4 py-2">维护模式(不再更新)</td>
                <td className="border border-border-light px-4 py-2">活跃开发(Spring 官方)</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">学习曲线</td>
                <td className="border border-border-light px-4 py-2">低(传统 Servlet)</td>
                <td className="border border-border-light px-4 py-2">中(需理解 Reactor)</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">推荐场景</td>
                <td className="border border-border-light px-4 py-2">遗留系统迁移</td>
                <td className="border border-border-light px-4 py-2">新项目首选</td>
              </tr>
            </tbody>
          </table>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1:网关应该处理所有业务逻辑">
            网关只应处理横切关注点(鉴权、限流、日志),业务逻辑应在下游微服务中实现。过度复杂的网关会成为性能瓶颈和单点故障。
          </Callout>

          <Callout type="danger" title="误区 2:限流值设置越大越好">
            限流阈值应根据后端服务的实际承载能力设置,而非随意填写。建议通过压测确定合理的 QPS 上限,并预留 20% 的安全余量。
          </Callout>

          <Callout type="danger" title="误区 3:网关不需要高可用部署">
            网关是所有流量的入口,必须集群部署并通过负载均衡器(如 Nginx)分发流量,避免单点故障导致整个系统不可用。
          </Callout>

          <Callout type="danger" title="误区 4:所有请求都经过网关">
            对于内部服务间调用(如 Order Service 调用 User Service),应直接通过注册中心发现服务,不经过网关,减少网络跳数,降低延迟。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "API 网关的作用是什么?",
              answer: "API 网关作为微服务架构的统一入口,提供路由转发、负载均衡、鉴权认证、限流熔断、日志监控、缓存加速、协议转换等功能,将横切关注点从各个微服务中抽离,实现关注点分离。"
            },
            {
              question: "Spring Cloud Gateway 和 Zuul 的区别?",
              answer: "(1)编程模型:Gateway 基于 WebFlux(异步非阻塞),Zuul 1.x 基于 Servlet(同步阻塞);(2)性能:Gateway 更高,支持 WebSocket;(3)社区:Gateway 是 Spring 官方维护,Zuul 1.x 已进入维护模式;(4)新项目推荐使用 Gateway。"
            },
            {
              question: "如何实现网关层的限流?",
              answer: "Spring Cloud Gateway 提供基于 Redis 的 RequestRateLimiter 过滤器,使用令牌桶算法。配置 replenishRate(令牌填充速率)和 burstCapacity(桶容量),通过 KeyResolver 定义限流维度(如 IP、用户 ID)。也可集成 Sentinel 实现更精细的限流规则。"
            },
            {
              question: "网关如何做统一鉴权?",
              answer: "实现 GlobalFilter 拦截所有请求:(1)检查 Authorization 头中的 JWT Token;(2)验证 Token 有效性(签名、过期时间、黑名单);(3)解析 Token 获取用户信息;(4)将用户信息添加到请求头传递给下游服务;(5)无效 Token 返回 401/403。"
            },
            {
              question: "网关的性能优化有哪些手段?",
              answer: "(1)使用异步非阻塞模型(WebFlux);(2)启用响应压缩(GZIP);(3)缓存热点数据(Redis);(4)合理设置超时时间;(5)集群部署+负载均衡;(6)过滤链优化(减少不必要的过滤器);(7)连接池调优;(8)监控告警及时发现性能瓶颈。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            学习完 API 网关设计后,建议继续深入学习:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><a href="/docs/08-microservices/spring-cloud-core" className="text-accent hover:underline">Spring Cloud 核心组件</a> - 理解网关在微服务架构中的位置</li>
            <li><a href="/docs/08-microservices/service-resilience" className="text-accent hover:underline">服务限流降级</a> - 细粒度的流量控制和容错策略</li>
            <li><a href="/docs/06-spring-framework/spring-security" className="text-accent hover:underline">Spring Security 安全框架</a> - 深入理解鉴权和授权机制</li>
            <li><a href="/docs/10-network-protocol/http-protocol" className="text-accent hover:underline">HTTP/HTTPS 协议详解</a> - 理解网关处理的底层协议</li>
          </ul>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
