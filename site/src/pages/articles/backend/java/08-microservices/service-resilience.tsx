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
  { id: 'why-resilience', text: '一、为什么需要服务弹性?', level: 2 },
  { id: 'core-patterns', text: '二、核心容错模式', level: 2 },
  { id: 'circuit-breaker', text: '三、熔断器详解', level: 2 },
  { id: 'rate-limiting', text: '四、限流策略', level: 2 },
  { id: 'fallback', text: '五、降级策略', level: 2 },
  { id: 'resilience4j', text: '六、Resilience4j 实战', level: 2 },
  { id: 'sentinel', text: '七、Sentinel 实战', level: 2 },
  { id: 'bulkhead', text: '八、舱壁隔离', level: 2 },
  { id: 'retry', text: '九、重试机制', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function ServiceResilience({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              服务弹性(Service Resilience)是微服务架构中的<strong className="text-accent">容错保护机制</strong>,通过熔断、限流、降级、重试等策略,防止局部故障扩散为系统性崩溃,保障核心业务可用性。
            </p>
          </blockquote>

          <Callout type="tip" title="弹性的本质">
            弹性不是避免故障,而是<strong>优雅地处理故障</strong>。就像人体的免疫系统,无法完全阻止病毒入侵,但能快速识别并隔离感染,防止全身性感染。
          </Callout>

          <h2 id="why-resilience" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、为什么需要服务弹性?
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            在分布式系统中,故障是常态而非异常。网络抖动、服务宕机、资源耗尽等问题随时可能发生。如果没有弹性保护,单个服务的故障会通过调用链迅速传播,导致<strong>雪崩效应</strong>。
          </p>

          <DiagramBlock title="服务雪崩效应">
{`graph TB
    User[用户请求] --> Gateway[API Gateway]
    Gateway --> OrderService[订单服务]
    OrderService --> UserService[用户服务]
    OrderService --> ProductService[商品服务]
    OrderService --> InventoryService[库存服务]
    
    UserService -.->|超时| DB[(数据库)]
    ProductService -.->|正常| Cache[(缓存)]
    InventoryService -.->|正常| MQ[(消息队列)]
    
    style UserService fill:#ff6b6b
    style OrderService fill:#ffd93d
    style Gateway fill:#ff6b6b
    
    note1[用户服务响应慢<br/>线程池耗尽] -.-> OrderService
    note2[订单服务级联超时<br/>所有线程阻塞] -.-> Gateway
    note3[网关无可用线程<br/>拒绝所有请求] -.-> User`}
          </DiagramBlock>

          <SideNote label="雪崩效应的三个阶段">
            <strong>阶段 1:</strong> 某个下游服务(如用户服务)响应变慢或不可用;<br/>
            <strong>阶段 2:</strong> 上游服务(如订单服务)的调用线程被阻塞,线程池逐渐耗尽;<br/>
            <strong>阶段 3:</strong> 上游服务也无法响应新请求,故障沿调用链向上传播,最终导致整个系统瘫痪。
          </SideNote>

          <h2 id="core-patterns" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、核心容错模式
          </h2>

          <table className="w-full border-collapse my-6 text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left font-semibold">模式</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">作用</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">类比</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">熔断器<br/>(Circuit Breaker)</td>
                <td className="border border-border-light px-4 py-2">快速失败,防止级联故障</td>
                <td className="border border-border-light px-4 py-2">电路保险丝,过载时自动断开</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">限流<br/>(Rate Limiting)</td>
                <td className="border border-border-light px-4 py-2">控制流量,保护系统不被压垮</td>
                <td className="border border-border-light px-4 py-2">高速公路收费站,限制车流量</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">降级<br/>(Fallback)</td>
                <td className="border border-border-light px-4 py-2">返回默认值或简化逻辑,保证基本可用</td>
                <td className="border border-border-light px-4 py-2">飞机引擎故障时滑翔降落</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">舱壁隔离<br/>(Bulkhead)</td>
                <td className="border border-border-light px-4 py-2">隔离资源,防止故障扩散</td>
                <td className="border border-border-light px-4 py-2">船舱隔板,一个舱进水不影响其他舱</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">重试<br/>(Retry)</td>
                <td className="border border-border-light px-4 py-2">临时故障时自动重试</td>
                <td className="border border-border-light px-4 py-2">电话占线时重拨</td>
              </tr>
            </tbody>
          </table>

          <h2 id="circuit-breaker" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、熔断器详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            熔断器借鉴了电路保险丝的设计思想,当错误率达到阈值时自动"跳闸",阻止后续请求,给下游服务恢复时间。
          </p>

          <DiagramBlock title="熔断器状态机">
{`graph LR
    Closed[关闭状态<br/>Closed<br/>正常调用] -->|错误率 > 50%<br/>连续失败 10 次| Open[打开状态<br/>Open<br/>快速失败]
    Open -->|等待 30 秒| HalfOpen[半开状态<br/>Half-Open<br/>试探性调用]
    HalfOpen -->|成功| Closed
    HalfOpen -->|失败| Open
    
    style Closed fill:#4ade80
    style Open fill:#f87171
    style HalfOpen fill:#fbbf24`}
          </DiagramBlock>

          <h3 id="three-states" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            三种状态详解
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><strong>Closed(关闭)</strong>: 正常状态,请求正常转发。监控错误率,超过阈值后切换到 Open 状态。</li>
            <li><strong>Open(打开)</strong>: 熔断状态,所有请求直接失败(快速失败),不调用下游服务。等待一段时间后切换到 Half-Open 状态。</li>
            <li><strong>Half-Open(半开)</strong>: 试探状态,允许少量请求通过。如果成功,切换到 Closed;如果失败,回到 Open。</li>
          </ul>

          <h2 id="rate-limiting" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、限流策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            限流控制单位时间内的请求数量,防止系统被突发流量压垮。常见的限流算法有:
          </p>

          <h3 id="token-bucket" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            令牌桶算法(Token Bucket)
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            系统以固定速率生成令牌放入桶中,请求到来时需要获取令牌才能执行。如果桶中没有令牌,请求被拒绝或等待。
          </p>

          <DiagramBlock title="令牌桶算法">
{`graph LR
    Generator[令牌生成器<br/>10个/秒] -->|放入| Bucket[(令牌桶<br/>容量: 20)]
    Request1[请求 1] -->|获取令牌| Bucket
    Request2[请求 2] -->|获取令牌| Bucket
    Request3[请求 3] -.->|桶空,拒绝| Bucket
    
    Bucket -->|有令牌| Execute[执行业务逻辑]
    Bucket -.->|无令牌| Reject[拒绝请求]`}
          </DiagramBlock>

          <h3 id="sliding-window" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            滑动窗口算法(Sliding Window)
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            将时间划分为多个小窗口,统计最近 N 个窗口的请求总数。相比固定窗口,避免了临界点流量突增的问题。
          </p>

          <DiagramBlock title="滑动窗口 vs 固定窗口">
{`graph TB
    subgraph "固定窗口(问题:临界突增)"
        W1[窗口1: 0-1s<br/>请求数: 100] 
        W2[窗口2: 1-2s<br/>请求数: 100]
        Note1[0.9s-1.1s 之间<br/>实际请求数: 200!]
    end
    
    subgraph "滑动窗口(平滑统计)"
        SW1[窗口: 0.5-1.5s<br/>请求数: 150]
        SW2[窗口: 0.6-1.6s<br/>请求数: 145]
        Note2[任意 1 秒内<br/>请求数不超过阈值]
    end
    
    W1 --- W2
    SW1 --- SW2`}
          </DiagramBlock>

          <h3 id="leaky-bucket" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            漏桶算法(Leaky Bucket)
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            请求先进入队列(桶),系统以固定速率从队列中取出请求处理。无论输入流量多大,输出速率恒定,起到<strong>流量整形</strong>的作用。
          </p>

          <table className="w-full border-collapse my-6 text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left font-semibold">算法</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">特点</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">令牌桶</td>
                <td className="border border-border-light px-4 py-2">允许突发流量,灵活性强</td>
                <td className="border border-border-light px-4 py-2">大部分场景(Guava RateLimiter)</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">滑动窗口</td>
                <td className="border border-border-light px-4 py-2">统计精确,无临界问题</td>
                <td className="border border-border-light px-4 py-2">Sentinel、Prometheus</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">漏桶</td>
                <td className="border border-border-light px-4 py-2">强制匀速,平滑流量</td>
                <td className="border border-border-light px-4 py-2">MQ 消费速率控制</td>
              </tr>
            </tbody>
          </table>

          <h2 id="fallback" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、降级策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            降级是在服务不可用时提供的备选方案,保证核心功能可用。降级策略按优先级从高到低:
          </p>

          <ol className="list-decimal list-inside space-y-3 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><strong>返回缓存数据</strong>: 从本地缓存或 Redis 读取旧数据(可能过期,但比没有好)</li>
            <li><strong>返回默认值</strong>: 如推荐列表为空时返回热门商品</li>
            <li><strong>返回静态页面</strong>: 如详情页加载失败时显示简化版 HTML</li>
            <li><strong>功能开关</strong>: 关闭非核心功能(如评论、点赞),保留核心功能(如下单)</li>
            <li><strong>友好提示</strong>: 告知用户"系统繁忙,请稍后再试"</li>
          </ol>

          <Callout type="warning" title="降级不是逃避">
            降级是<strong>主动的容错策略</strong>,不是被动的失败。好的降级方案应该:<br/>
            (1) 提前设计: 在开发阶段就规划好降级路径;<br/>
            (2) 分级降级: 根据负载情况逐步降级,不是一刀切;<br/>
            (3) 自动恢复: 服务恢复正常后,自动切换回正常逻辑。
          </Callout>

          <h2 id="resilience4j" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、Resilience4j 实战
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Resilience4j 是 Spring Cloud 推荐的熔断器实现,替代了已停止维护的 Hystrix。它采用函数式编程风格,轻量且模块化。
          </p>

          <Playground
            code={`# pom.xml
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-spring-boot2</artifactId>
    <version>2.0.2</version>
</dependency>`}
            language="xml"
            highlights={[4]}
            filename="pom.xml"
            description="引入 Resilience4j 依赖"
          />

          <Playground
            code={`# application.yml
resilience4j:
  circuitbreaker:
    instances:
      inventoryService:
        sliding-window-size: 10  # 滑动窗口大小(最近 10 次调用)
        failure-rate-threshold: 50  # 错误率阈值 50%
        wait-duration-in-open-state: 30s  # Open 状态持续时间
        permitted-number-of-calls-in-half-open-state: 5  # Half-Open 允许调用次数
        
  timelimiter:
    instances:
      inventoryService:
        timeout-duration: 3s  # 超时时间 3 秒
        
  ratelimiter:
    instances:
      orderApi:
        limit-for-period: 100  # 每个周期允许 100 个请求
        limit-refresh-period: 1s  # 周期 1 秒
        timeout-duration: 0s  # 获取令牌超时时间(0=立即失败)`}
            language="yaml"
            highlights={[5, 13, 18]}
            filename="application.yml"
            description="Resilience4j 配置示例"
          />

          <Playground
            code={`@Service
public class OrderService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    // 熔断 + 超时 + 降级
    @CircuitBreaker(name = "inventoryService", fallbackMethod = "fallbackGetStock")
    @TimeLimiter(name = "inventoryService")
    @Retry(name = "inventoryService", fallbackMethod = "fallbackGetStock")
    public CompletableFuture<Integer> getStock(Long productId) {
        String url = "http://inventory-service/stock/" + productId;
        Integer stock = restTemplate.getForObject(url, Integer.class);
        return CompletableFuture.completedFuture(stock);
    }
    
    // 降级方法:返回默认值
    public CompletableFuture<Integer> fallbackGetStock(Long productId, Throwable t) {
        log.warn("库存服务调用失败,使用降级策略: {}", t.getMessage());
        return CompletableFuture.completedFuture(0);  // 返回库存为 0
    }
}`}
            language="java"
            highlights={[8, 9, 10, 18]}
            filename="OrderService.java"
            description="Resilience4j 注解使用"
          />

          <SideNote label="为什么需要 CompletableFuture?">
            @TimeLimiter 要求方法返回 CompletableFuture 或 CompletionStage,因为它需要在后台线程中执行超时控制。如果方法签名不匹配,会抛出异常。
          </SideNote>

          <h2 id="sentinel" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、Sentinel 实战
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Sentinel(哨兵)是阿里巴巴开源的流量防卫组件,提供限流、熔断、降级、系统保护等功能,支持实时监控和动态规则配置。
          </p>

          <Playground
            code={`# pom.xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    <version>2022.0.0.0</version>
</dependency>`}
            language="xml"
            highlights={[4]}
            filename="pom.xml"
            description="引入 Sentinel 依赖"
          />

          <Playground
            code={`# application.yml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080  # Sentinel Dashboard 地址
        port: 8719  # 与控制台通信端口
      
      datasource:
        ds1:
          nacos:
            server-addr: 127.0.0.1:8848
            data-id: \${spring.application.name}-sentinel-rules
            group-id: DEFAULT_GROUP
            rule-type: flow  # 流控规则`}
            language="yaml"
            highlights={[6, 11]}
            filename="application.yml"
            description="Sentinel 集成配置"
          />

          <Playground
            code={`@RestController
public class OrderController {
    
    @GetMapping("/orders/{id}")
    @SentinelResource(value = "getOrder", blockHandler = "handleBlock", fallback = "handleFallback")
    public Order getOrder(@PathVariable Long id) {
        // 正常业务逻辑
        return orderService.getOrderById(id);
    }
    
    // 限流/熔断时的处理(blockHandler)
    public Order handleBlock(Long id, BlockException ex) {
        log.warn("请求被限流或熔断: {}", ex.getClass().getSimpleName());
        Order order = new Order();
        order.setMessage("系统繁忙,请稍后再试");
        return order;
    }
    
    // 业务异常时的处理(fallback)
    public Order handleFallback(Long id, Throwable t) {
        log.error("业务异常: ", t);
        Order order = new Order();
        order.setMessage("订单查询失败");
        return order;
    }
}`}
            language="java"
            highlights={[5, 12, 20]}
            filename="OrderController.java"
            description="@SentinelResource 使用示例"
          />

          <Callout type="info" title="blockHandler vs fallback">
            <strong>blockHandler</strong>: 处理 Sentinel 抛出的 BlockException(限流、熔断、系统保护);<br/>
            <strong>fallback</strong>: 处理业务异常(如 NullPointerException、SQLException);<br/>
            两者可以同时配置,Sentinel 会根据异常类型自动选择对应的处理方法。
          </Callout>

          <h3 id="sentinel-dashboard" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            Sentinel Dashboard 实时监控
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Sentinel Dashboard 提供可视化的监控界面,可以实时查看 QPS、响应时间、异常数等指标,并动态调整限流/熔断规则。
          </p>

          <DiagramBlock title="Sentinel 核心功能">
{`graph TB
    subgraph "流量控制"
        QPS[QPS 限流]
        Thread[线程数限流]
        WarmUp[预热模式]
        RateLimit[排队等待]
    end
    
    subgraph "熔断降级"
        RT[平均响应时间]
        ExceptionRatio[异常比例]
        ExceptionCount[异常次数]
    end
    
    subgraph "系统保护"
        Load[Load 保护]
        CPU[CPU 使用率]
        AvgRT[全局平均 RT]
    end
    
    QPS --> Rules[规则管理]
    Thread --> Rules
    RT --> Rules
    ExceptionRatio --> Rules
    Load --> Rules`}
          </DiagramBlock>

          <h2 id="bulkhead" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、舱壁隔离
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            舱壁隔离(Bulkhead)借鉴了船舶的设计理念,将资源(线程池、连接池)划分为多个独立的舱室,一个舱室故障不会影响其他舱室。
          </p>

          <Playground
            code={`# Resilience4j 舱壁隔离配置
resilience4j:
  bulkhead:
    instances:
      userService:
        max-concurrent-calls: 50  # 最大并发调用数
        max-wait-duration: 10ms  # 等待获取许可的最大时间
      
      paymentService:
        max-concurrent-calls: 30  # 支付服务独立线程池
        max-wait-duration: 5ms`}
            language="yaml"
            highlights={[5, 9]}
            filename="bulkhead-config.yml"
            description="舱壁隔离配置"
          />

          <SideNote label="线程池隔离 vs 信号量隔离">
            <strong>线程池隔离</strong>: 为每个服务分配独立线程池,完全隔离但资源开销大(Hystrix 默认方式);<br/>
            <strong>信号量隔离</strong>: 通过计数器限制并发数,轻量但无法控制超时(Resilience4j 默认方式)。
          </SideNote>

          <h2 id="retry" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、重试机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            重试用于处理临时性故障(如网络抖动、服务短暂不可用),但必须谨慎使用,避免加重下游负载。
          </p>

          <Playground
            code={`# Resilience4j 重试配置
resilience4j:
  retry:
    instances:
      inventoryService:
        max-attempts: 3  # 最大重试次数
        wait-duration: 1s  # 初始等待时间
        multiplier: 2  # 退避倍数(指数退避)
        retry-exceptions:
          - java.io.IOException  # 仅重试 IO 异常
          - java.net.SocketTimeoutException
        ignore-exceptions:
          - java.lang.NullPointerException  # 不重试业务异常`}
            language="yaml"
            highlights={[6, 8, 9]}
            filename="retry-config.yml"
            description="指数退避重试配置"
          />

          <Callout type="danger" title="重试的注意事项">
            (1) <strong>仅重试幂等操作</strong>: GET 查询可以重试,POST 创建订单不能盲目重试(可能导致重复下单);<br/>
            (2) <strong>设置最大重试次数</strong>: 避免无限重试导致雪崩;<br/>
            (3) <strong>使用指数退避</strong>: 每次重试间隔递增(1s → 2s → 4s),给下游恢复时间;<br/>
            (4) <strong>区分异常类型</strong>: 只重试临时性异常(IO 异常、超时),不重试业务异常(参数校验失败)。
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="danger" title="误区 1:熔断器开启后就万事大吉">
            熔断器只是临时保护措施,根本问题是下游服务不稳定。需要配合监控告警、容量规划、性能优化等手段,从根本上提升系统稳定性。
          </Callout>

          <Callout type="danger" title="误区 2:限流阈值越大越好">
            限流阈值应根据系统实际承载能力设置,过高的阈值会导致系统过载。建议通过压测确定系统的最大 QPS,然后设置为最大值的 70%-80%,预留缓冲空间。
          </Callout>

          <Callout type="danger" title="误区 3:所有接口都需要熔断保护">
            对于内部工具类接口或非核心功能,可以不配置熔断器,减少复杂度。重点关注<strong>核心链路</strong>和<strong>外部依赖</strong>的容错保护。
          </Callout>

          <Callout type="danger" title="误区 4:重试可以解决所有问题">
            重试只能解决临时性故障,对于持续性故障(如数据库宕机、代码 Bug)无效,反而会加重系统负担。重试应作为最后手段,优先优化系统本身的稳定性。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Hystrix 和 Resilience4j 的区别是什么?",
              answer: "(1) 维护状态:Hystrix 已停止维护,Resilience4j 是 Spring Cloud 官方推荐;(2) 编程模型:Hystrix 基于命令模式,Resilience4j 基于函数式编程;(3) 依赖:Hystrix 依赖 RxJava,Resilience4j 更轻量;(4) 模块化:Resilience4j 按需引入模块,Hystrix 是全量引入。"
            },
            {
              question: "如何实现分布式限流?",
              answer: "单机限流使用 Guava RateLimiter 或 Sentinel,分布式限流需要借助中间件:(1) Redis + Lua 脚本:原子性计数,性能好;(2) Sentinel + Redis DataSource:集中管理规则;(3) API Gateway 层限流:在网关统一限流,如 Spring Cloud Gateway + RedisRateLimiter。"
            },
            {
              question: "熔断器和限流的区别是什么?",
              answer: "熔断器关注<strong>下游服务的健康状态</strong>,当下游故障时快速失败,保护上游服务;限流关注<strong>上游流量的大小</strong>,当请求过多时拒绝部分请求,保护自身不被压垮。两者通常配合使用:先限流保护自身,再熔断保护上游。"
            },
            {
              question: "Sentinel 的滑动窗口是如何实现的?",
              answer: "Sentinel 将 1 秒划分为多个小格子(默认 2 个,每格 500ms),每个格子记录该时间段内的请求数、异常数等指标。统计时累加最近 N 个格子的数据。这种方式既保证了统计精度,又避免了固定窗口的临界问题。"
            },
            {
              question: "如何设计一个高可用的降级方案?",
              answer: "(1) 多级降级:缓存 → 默认值 → 静态页面 → 友好提示;(2) 自动化:基于监控指标自动触发降级,无需人工干预;(3) 可配置:降级策略通过配置中心动态调整;(4) 可观测:记录降级日志和指标,便于分析;(5) 快速恢复:服务正常后自动切换回正常逻辑。"
            },
            {
              question: "舱壁隔离的资源应该如何划分?",
              answer: "按<strong>业务重要性</strong>和<strong>资源消耗</strong>划分:(1) 核心业务(如支付、下单)分配更多资源;(2) 非核心业务(如评论、推荐)分配较少资源;(3) 外部依赖(如第三方 API)独立隔离,避免影响内部服务;(4) 通过压测确定各服务的合理资源配额。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            学习完服务弹性后,建议继续深入学习:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><a href="/docs/08-microservices/spring-cloud-core" className="text-accent hover:underline">Spring Cloud 核心组件</a> - 了解熔断器在微服务架构中的位置</li>
            <li><a href="/docs/08-microservices/api-gateway" className="text-accent hover:underline">API 网关设计</a> - 在网关层实现统一限流和熔断</li>
            <li><a href="/docs/08-microservices/distributed-tracing" className="text-accent hover:underline">分布式链路追踪</a> - 追踪熔断/限流对系统的影响</li>
            <li><a href="/docs/08-microservices/configuration-management" className="text-accent hover:underline">配置中心</a> - 动态调整限流阈值和熔断参数</li>
          </ul>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
