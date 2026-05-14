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
  { id: 'overview', text: '一、Spring Cloud 核心组件概览', level: 2 },
  { id: 'service-discovery', text: '二、服务注册与发现', level: 2 },
  { id: 'load-balancing', text: '三、负载均衡', level: 2 },
  { id: 'circuit-breaker', text: '四、熔断器', level: 2 },
  { id: 'config-center', text: '五、配置中心', level: 2 },
  { id: 'gateway', text: '六、API 网关', level: 2 },
  { id: 'feign', text: '七、声明式 HTTP 客户端', level: 2 },
  { id: 'stream', text: '八、消息驱动', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function SpringCloudCore({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Spring Cloud 是基于 Spring Boot 的<strong className="text-accent">微服务架构解决方案</strong>,提供了一套完整的分布式系统开发工具集,包括服务注册发现、配置管理、负载均衡、熔断降级、API 网关等核心功能。
            </p>
          </blockquote>

          <Callout type="tip" title="Spring Cloud vs Spring Boot">
            Spring Boot 简化了单个 Spring 应用的配置和部署,而 Spring Cloud 解决了多个 Spring Boot 应用之间的协作问题(服务通信、容错、配置共享等)。两者配合使用,构建完整的微服务体系。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Spring Cloud 核心组件概览
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring Cloud 包含多个子项目,每个解决微服务架构中的特定问题:
          </p>

          <DiagramBlock title="Spring Cloud 核心组件架构图">
{`graph TB
    Client[客户端] --> Gateway[API Gateway<br/>Spring Cloud Gateway]
    
    subgraph "服务治理层"
        Gateway --> ServiceA[Service A]
        Gateway --> ServiceB[Service B]
        Gateway --> ServiceC[Service C]
        
        ServiceA --> Registry[(服务注册中心<br/>Nacos/Eureka)]
        ServiceB --> Registry
        ServiceC --> Registry
        
        ServiceA -.->|调用| ServiceB
        ServiceB -.->|调用| ServiceC
    end
    
    subgraph "基础设施层"
        ConfigServer[配置中心<br/>Nacos Config]
        MessageBroker[消息中间件<br/>RabbitMQ/Kafka]
    end
    
    ServiceA --- ConfigServer
    ServiceB --- ConfigServer
    ServiceC --- ConfigServer
    
    ServiceA --- MessageBroker
    ServiceB --- MessageBroker`}
          </DiagramBlock>

          <table className="w-full border-collapse my-6 text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left font-semibold">组件</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">功能</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">主流实现</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">服务注册发现</td>
                <td className="border border-border-light px-4 py-2">服务自动注册与发现</td>
                <td className="border border-border-light px-4 py-2">Nacos, Eureka, Consul</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">负载均衡</td>
                <td className="border border-border-light px-4 py-2">客户端负载均衡</td>
                <td className="border border-border-light px-4 py-2">Spring Cloud LoadBalancer</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">熔断器</td>
                <td className="border border-border-light px-4 py-2">服务容错与降级</td>
                <td className="border border-border-light px-4 py-2">Resilience4j, Sentinel</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">配置中心</td>
                <td className="border border-border-light px-4 py-2">集中化配置管理</td>
                <td className="border border-border-light px-4 py-2">Nacos Config, Spring Cloud Config</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">API 网关</td>
                <td className="border border-border-light px-4 py-2">路由转发、鉴权、限流</td>
                <td className="border border-border-light px-4 py-2">Spring Cloud Gateway</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">声明式 HTTP</td>
                <td className="border border-border-light px-4 py-2">服务间 HTTP 调用</td>
                <td className="border border-border-light px-4 py-2">OpenFeign</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono text-[13px]">消息驱动</td>
                <td className="border border-border-light px-4 py-2">异步消息通信</td>
                <td className="border border-border-light px-4 py-2">Spring Cloud Stream</td>
              </tr>
            </tbody>
          </table>

          <h2 id="service-discovery" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、服务注册与发现
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            服务注册发现是微服务架构的基础,解决"服务在哪里"的问题。服务启动时向注册中心注册自己的地址,其他服务通过注册中心查找目标服务的实例列表。
          </p>

          <SideNote label="为什么需要服务发现?">
            在单体应用中,服务调用是本地方法调用。但在微服务中,服务分布在不同的机器上,IP 和端口可能动态变化(容器化部署),硬编码地址不可行,需要动态发现机制。
          </SideNote>

          <h3 id="nacos-registration" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            Nacos 服务注册示例
          </h3>

          <Playground
            code={`# application.yml
spring:
  application:
    name: order-service  # 服务名称
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848  # Nacos 服务器地址
        namespace: dev  # 命名空间
        group: DEFAULT_GROUP  # 分组`}
            language="yaml"
            highlights={[3, 7]}
            filename="application.yml"
            description="Nacos 服务注册配置"
          />

          <h3 id="eureka-vs-nacos" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            Eureka vs Nacos 对比
          </h3>

          <table className="w-full border-collapse my-6 text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left font-semibold">特性</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">Eureka</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">Nacos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2">CAP 理论</td>
                <td className="border border-border-light px-4 py-2">AP(可用性优先)</td>
                <td className="border border-border-light px-4 py-2">CP + AP 可切换</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">健康检查</td>
                <td className="border border-border-light px-4 py-2">客户端心跳</td>
                <td className="border border-border-light px-4 py-2">客户端心跳 + TCP/HTTP</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">配置中心</td>
                <td className="border border-border-light px-4 py-2">❌ 不支持</td>
                <td className="border border-border-light px-4 py-2">✅ 内置支持</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">多数据中心</td>
                <td className="border border-border-light px-4 py-2">❌ 不支持</td>
                <td className="border border-border-light px-4 py-2">✅ 支持</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">社区活跃度</td>
                <td className="border border-border-light px-4 py-2">维护模式(Spring Cloud Netflix 已停止更新)</td>
                <td className="border border-border-light px-4 py-2">活跃(阿里巴巴开源)</td>
              </tr>
            </tbody>
          </table>

          <h2 id="load-balancing" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、负载均衡
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            负载均衡将请求分发到多个服务实例,避免单点过载。Spring Cloud 提供客户端负载均衡(LoadBalancer)和服务端负载均衡(Gateway)。
          </p>

          <Playground
            code={`@Service
public class OrderService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    // 使用服务名而非具体 IP
    public Order createOrder(Long userId) {
        // Ribbon/LoadBalancer 自动从注册中心获取 user-service 实例列表
        // 并根据负载均衡策略选择一个实例
        String url = "http://user-service/users/" + userId;
        User user = restTemplate.getForObject(url, User.class);
        
        // 创建订单逻辑...
        return new Order();
    }
}

@Configuration
public class RestTemplateConfig {
    
    @Bean
    @LoadBalanced  // 启用负载均衡
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}`}
            language="java"
            highlights={[12, 22]}
            filename="OrderService.java"
            description="@LoadBalanced 实现客户端负载均衡"
          />

          <Callout type="warning" title="Ribbon 已停止维护">
            Spring Cloud Netflix Ribbon 已进入维护模式,推荐使用 Spring Cloud LoadBalancer 作为替代。新版本中只需添加 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">spring-cloud-starter-loadbalancer</code> 依赖即可。
          </Callout>

          <h2 id="circuit-breaker" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、熔断器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            熔断器防止级联故障。当某个服务调用失败率达到阈值时,快速失败而不等待超时,给下游服务恢复时间。
          </p>

          <DiagramBlock title="熔断器状态机">
{`graph LR
    Closed[关闭状态<br/>正常调用] -->|失败率超过阈值| Open[打开状态<br/>快速失败]
    Open -->|等待时间到达| HalfOpen[半开状态<br/>试探性调用]
    HalfOpen -->|成功| Closed
    HalfOpen -->|失败| Open`}
          </DiagramBlock>

          <Playground
            code={`@Service
public class ProductService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    // 使用 Resilience4j 实现熔断
    @CircuitBreaker(name = "inventoryService", fallbackMethod = "fallbackGetStock")
    @Retry(name = "inventoryService", fallbackMethod = "fallbackGetStock")
    public Integer getStock(Long productId) {
        String url = "http://inventory-service/stock/" + productId;
        return restTemplate.getForObject(url, Integer.class);
    }
    
    // 降级方法:返回默认值或缓存数据
    public Integer fallbackGetStock(Long productId, Throwable t) {
        log.warn("库存服务调用失败,使用降级策略", t);
        return 0; // 返回默认库存为 0
    }
}`}
            language="java"
            highlights={[8, 9, 17]}
            filename="ProductService.java"
            description="Resilience4j 熔断器示例"
          />

          <h2 id="config-center" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、配置中心
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            配置中心集中管理所有微服务的配置,支持动态刷新、版本管理和环境隔离,避免配置散落在各个应用中。
          </p>

          <Playground
            code={`# bootstrap.yml (优先级高于 application.yml)
spring:
  application:
    name: order-service
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yaml
        shared-configs:
          - data-id: common-config.yaml  # 共享配置
            refresh: true  # 支持动态刷新`}
            language="yaml"
            highlights={[7, 12]}
            filename="bootstrap.yml"
            description="Nacos 配置中心集成"
          />

          <SideNote label="bootstrap.yml vs application.yml">
            bootstrap.yml 在应用启动的引导阶段加载,优先级高于 application.yml。配置中心的地址通常放在 bootstrap.yml 中,确保在读取远程配置之前就能连接到配置中心。
          </SideNote>

          <h2 id="gateway" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、API 网关
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            API 网关作为系统的统一入口,负责路由转发、鉴权、限流、日志等功能,隐藏后端微服务的复杂性。
          </p>

          <Playground
            code={`# application.yml
spring:
  cloud:
    gateway:
      routes:
        - id: order-service
          uri: lb://order-service  # lb 表示使用负载均衡
          predicates:
            - Path=/api/orders/**
          filters:
            - StripPrefix=1  # 去掉 /api 前缀
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10  # 每秒允许 10 个请求
                redis-rate-limiter.burstCapacity: 20  # 桶容量 20
        
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=1`}
            language="yaml"
            highlights={[7, 9, 12]}
            filename="gateway-config.yml"
            description="Spring Cloud Gateway 路由配置"
          />

          <h2 id="feign" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、声明式 HTTP 客户端
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            OpenFeign 提供声明式的 HTTP 客户端,通过接口注解定义服务调用,无需手动编写 HTTP 请求代码。
          </p>

          <Playground
            code={`@FeignClient(name = "user-service", fallback = UserServiceFallback.class)
public interface UserServiceClient {
    
    @GetMapping("/users/{id}")
    User getUserById(@PathVariable("id") Long id);
    
    @PostMapping("/users")
    User createUser(@RequestBody User user);
}

// 降级处理
@Component
public class UserServiceFallback implements UserServiceClient {
    
    @Override
    public User getUserById(Long id) {
        log.warn("用户服务调用失败,返回空用户");
        return new User(); // 返回默认对象
    }
    
    @Override
    public User createUser(User user) {
        throw new RuntimeException("用户服务不可用");
    }
}

// 使用
@Service
public class OrderService {
    
    @Autowired
    private UserServiceClient userServiceClient;
    
    public Order createOrder(Long userId) {
        // 像调用本地方法一样调用远程服务
        User user = userServiceClient.getUserById(userId);
        // ...
    }
}`}
            language="java"
            highlights={[1, 13, 33]}
            filename="UserServiceClient.java"
            description="OpenFeign 声明式服务调用"
          />

          <h2 id="stream" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、消息驱动
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring Cloud Stream 基于发布-订阅模型,屏蔽底层消息中间件(RabbitMQ/Kafka)的差异,提供统一的编程模型。
          </p>

          <Playground
            code={`# application.yml
spring:
  cloud:
    stream:
      bindings:
        orderOutput-out-0:  # 输出通道
          destination: orders  # Topic/Queue 名称
        orderInput-in-0:  # 输入通道
          destination: orders
          group: order-service-group  # 消费者组
      
      binders:
        defaultBinder:
          type: kafka  # 使用 Kafka`}
            language="yaml"
            highlights={[6, 8, 13]}
            filename="stream-config.yml"
            description="Spring Cloud Stream 配置"
          />

          <Playground
            code={`@EnableBinding(OrderChannels.class)
public class OrderMessageProducer {
    
    @Autowired
    private OrderChannels orderChannels;
    
    // 发送消息
    public void sendOrder(Order order) {
        orderChannels.orderOutput().send(MessageBuilder.withPayload(order).build());
    }
}

public interface OrderChannels {
    
    @Output("orderOutput-out-0")
    MessageChannel orderOutput();
    
    @Input("orderInput-in-0")
    SubscribableChannel orderInput();
}

// 消费消息
@Component
public class OrderMessageConsumer {
    
    @StreamListener("orderInput-in-0")
    public void handleOrder(Order order) {
        log.info("收到订单消息: {}", order);
        // 处理订单逻辑
    }
}`}
            language="java"
            highlights={[1, 24, 26]}
            filename="OrderMessageHandler.java"
            description="Spring Cloud Stream 消息收发"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1:微服务越多越好">
            过度拆分微服务会导致系统复杂度激增,网络调用开销增大,事务一致性难以保证。<strong>建议:</strong>按业务边界合理拆分,初期可采用模块化设计,待业务成熟后再考虑微服务化。
          </Callout>

          <Callout type="danger" title="误区 2:所有服务都必须注册到注册中心">
            对于内部工具类服务或定时任务服务,如果不需要被其他服务调用,可以不注册到注册中心,减少注册中心压力。
          </Callout>

          <Callout type="danger" title="误区 3:熔断器开启后就万事大吉">
            熔断器只是临时保护措施,根本问题是下游服务不稳定。需要配合监控告警、容量规划、性能优化等手段,从根本上提升系统稳定性。
          </Callout>

          <Callout type="danger" title="误区 4:配置中心可以存储敏感信息">
            配置中心不应明文存储密码、密钥等敏感信息。应使用加密配置(如 Jasypt)或专门的密钥管理服务(如 HashiCorp Vault)。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Spring Cloud 和 Dubbo 的区别是什么?",
              answer: "Spring Cloud 基于 HTTP RESTful,生态完整但性能略低;Dubbo 基于 RPC(TCP),性能更高但生态相对单一。Spring Cloud 适合异构系统集成,Dubbo 适合高性能 Java 内部调用。现代架构常采用 Spring Cloud Gateway + Dubbo 的组合方案。"
            },
            {
              question: "服务雪崩是如何产生的?如何预防?",
              answer: "服务雪崩是指一个服务故障导致调用链上游多个服务相继故障的现象。预防措施:(1)熔断器快速失败;(2)限流保护;(3)超时控制;(4)线程池隔离;(5)降级策略返回默认值。"
            },
            {
              question: "Nacos 作为注册中心,Eureka 作为注册中心,有什么区别?",
              answer: "(1)CAP:Nacos 支持 CP/AP 切换,Eureka 仅支持 AP;(2)功能:Nacos 内置配置中心,Eureka 需要额外集成 Spring Cloud Config;(3)健康检查:Nacos 支持 TCP/HTTP 检查,Eureka 仅客户端心跳;(4)社区:Eureka 已停止更新,Nacos 活跃维护。"
            },
            {
              question: "什么是服务穿透?如何解决?",
              answer: "服务穿透指绕过网关直接访问后端服务。解决方案:(1)后端服务不暴露公网 IP;(2)网关层做鉴权和签名验证;(3)服务间调用使用内部网络;(4)配置防火墙规则限制访问来源。"
            },
            {
              question: "如何实现灰度发布?",
              answer: "通过网关路由规则实现:(1)根据请求头/参数标识灰度用户;(2)网关将灰度流量路由到新版本服务;(3)普通流量路由到稳定版本;(4)监控灰度服务指标,逐步扩大灰度比例。可使用 Spring Cloud Gateway + Nacos 权重路由实现。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            学习完 Spring Cloud 核心组件后,建议继续深入学习:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><a href="/docs/08-microservices/api-gateway" className="text-accent hover:underline">API 网关设计</a> - 深入理解网关的路由、限流、鉴权机制</li>
            <li><a href="/docs/08-microservices/distributed-transaction" className="text-accent hover:underline">分布式事务</a> - 解决微服务间的数据一致性问题</li>
            <li><a href="/docs/08-microservices/service-resilience" className="text-accent hover:underline">服务限流降级</a> - 细粒度的流量控制和容错策略</li>
            <li><a href="/docs/06-spring-framework/spring-boot" className="text-accent hover:underline">Spring Boot 自动化配置</a> - 理解 Spring Cloud 的底层基础</li>
          </ul>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
