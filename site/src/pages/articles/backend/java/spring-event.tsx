import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import SideNote from '../../components/knowledge/SideNote'
import SmartTOC from '../../components/knowledge/SmartTOC'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'core-concept', text: '一、核心概念', level: 2 },
  { id: 'implementation', text: '二、实现方式', level: 2 },
  { id: 'async-event', text: '三、异步事件（重点🔥）', level: 2 },
  { id: 'source-code', text: '四、源码分析', level: 2 },
  { id: 'best-practices', text: '五、最佳实践', level: 2 },
  { id: 'misconceptions', text: '六、常见误区', level: 2 },
  { id: 'interview', text: '七、面试真题', level: 2 },
  { id: 'related', text: '八、知识关联', level: 2 },
]

export default function SpringEvent({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Spring 事件机制是基于<strong className="text-accent">观察者模式</strong>的组件间通信方案，通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ApplicationEvent</code> 和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">@EventListener</code> 实现松耦合的事件驱动架构，
              支持同步和异步事件处理，广泛应用于解耦业务逻辑、审计日志、通知推送等场景。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要事件机制？">
            传统的服务调用是同步且紧耦合的（A 直接调用 B）。事件机制通过发布-订阅模式解耦生产者和消费者，发布者无需知道谁订阅了事件，便于扩展和维护。例如：用户注册后发送欢迎邮件、订单创建后更新库存等。
          </Callout>

          <h2 id="core-concept" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、核心概念
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 事件机制包含三个核心角色：
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">角色</th>
                <th className="text-left p-3 font-semibold text-ink">说明</th>
                <th className="text-left p-3 font-semibold text-ink">关键类/注解</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">事件（Event）</td>
                <td className="p-3">携带数据的消息对象</td>
                <td className="p-3"><code>ApplicationEvent</code></td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">发布者（Publisher）</td>
                <td className="p-3">触发事件的组件</td>
                <td className="p-3"><code>ApplicationEventPublisher</code></td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">监听者（Listener）</td>
                <td className="p-3">处理事件的组件</td>
                <td className="p-3"><code>@EventListener</code>、<code>ApplicationListener</code></td>
              </tr>
            </tbody>
          </table>

          <DiagramBlock title="Spring 事件机制工作流程">
            {`\`\`\`mermaid
graph LR
    A[发布者] -->|publishEvent| B[ApplicationContext]
    B --> C{查找监听者}
    C -->|同步| D[监听者1]
    C -->|同步| E[监听者2]
    C -->|异步| F[线程池]
    F --> G[监听者3]
    D --> H[执行业务逻辑]
    E --> H
    G --> H
\`\`\``}
          </DiagramBlock>

          <SideNote label="观察者模式">
            Spring 事件机制是<strong>观察者模式</strong>的典型应用：发布者是被观察对象，监听者是观察者。当状态改变时，发布者通知所有注册的观察者。这与 Java 标准库的 <code>java.util.Observer</code> 类似，但 Spring 提供了更强大的功能（如异步、事务绑定等）。
          </SideNote>

          <h2 id="implementation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、实现方式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 提供了两种定义监听者的方式：
          </p>

          <h3 id="annotation-based" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            方式1：基于注解（推荐）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">@EventListener</code> 注解，简洁直观：
          </p>

          <Playground
            code={`// 1. 定义事件
public class UserRegisteredEvent extends ApplicationEvent {
    private final Long userId;
    private final String email;
    
    public UserRegisteredEvent(Object source, Long userId, String email) {
        super(source);
        this.userId = userId;
        this.email = email;
    }
    
    public Long getUserId() { return userId; }
    public String getEmail() { return email; }
}

// 2. 发布事件
@Service
public class UserService {
    
    @Autowired
    private ApplicationEventPublisher eventPublisher;
    
    public void registerUser(String username, String email) {
        // 业务逻辑：保存用户
        Long userId = saveUser(username, email);
        
        // 发布事件
        eventPublisher.publishEvent(new UserRegisteredEvent(this, userId, email));
    }
}

// 3. 监听事件
@Component
public class EmailService {
    
    @EventListener
    public void handleUserRegistered(UserRegisteredEvent event) {
        System.out.println("发送欢迎邮件到: " + event.getEmail());
        // 发送邮件逻辑...
    }
}`}
            language="java"
            highlights={[1, 22, 32, 37]}
            filename="AnnotationBasedEvent.java"
            description="基于注解的事件实现"
          />

          <h3 id="interface-based" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            方式2：基于接口
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            实现 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ApplicationListener</code> 接口，适合需要动态注册监听者的场景：
          </p>

          <Playground
            code={`@Component
public class AuditListener implements ApplicationListener<UserRegisteredEvent> {
    
    @Override
    public void onApplicationEvent(UserRegisteredEvent event) {
        System.out.println("审计日志: 用户注册 - ID: " + event.getUserId());
        // 记录审计日志...
    }
}`}
            language="java"
            highlights={[1, 4]}
            filename="InterfaceBasedListener.java"
            description="基于接口的监听器"
          />

          <Callout type="info" title="两种方式对比">
            <strong>@EventListener</strong>：代码简洁，支持 SpEL 条件过滤，推荐使用。<br/>
            <strong>ApplicationListener</strong>：类型安全，支持泛型，适合动态注册场景。
          </Callout>

          <h2 id="async-event" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、异步事件（重点🔥）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            默认情况下，事件监听是<strong className="text-rose">同步执行</strong>的，即发布者会等待所有监听者执行完毕。对于耗时操作（如发送邮件、生成报表），应使用异步事件提升性能。
          </p>

          <Playground
            code={`// 1. 启用异步支持
@Configuration
@EnableAsync
public class AsyncConfig {
    
    @Bean(name = "applicationEventMulticaster")
    public ApplicationEventMulticaster applicationEventMulticaster() {
        SimpleApplicationEventMulticaster multicaster = new SimpleApplicationEventMulticaster();
        // 配置线程池
        multicaster.setTaskExecutor(Executors.newFixedThreadPool(5));
        return multicaster;
    }
}

// 2. 异步监听器
@Component
public class NotificationService {
    
    @Async
    @EventListener
    public void handleUserRegistered(UserRegisteredEvent event) {
        // 在独立线程中执行，不阻塞主流程
        System.out.println("异步发送通知: " + event.getEmail());
        // 模拟耗时操作
        Thread.sleep(2000);
        sendNotification(event.getEmail());
    }
    
    private void sendNotification(String email) {
        // 发送通知逻辑...
    }
}`}
            language="java"
            highlights={[2, 7, 17, 19]}
            filename="AsyncEventListener.java"
            description="异步事件监听器"
          />

          <DiagramBlock title="同步 vs 异步事件执行流程">
            {`\`\`\`mermaid
graph TB
    subgraph 同步事件
        A1[发布事件] --> B1[监听者1执行]
        B1 --> C1[监听者2执行]
        C1 --> D1[返回结果]
    end
    
    subgraph 异步事件
        A2[发布事件] --> B2[立即返回]
        A2 --> C2[线程池执行监听者1]
        A2 --> D2[线程池执行监听者2]
    end
\`\`\``}
          </DiagramBlock>

          <Callout type="warning" title="异步事件注意事项">
            ① 必须启用 <code>@EnableAsync</code> 并配置线程池；<br/>
            ② 监听器方法需添加 <code>@Async</code> 注解；<br/>
            ③ 异步监听器无法参与发布者的事务（因为不在同一线程）；<br/>
            ④ 异常不会传播到发布者，需在监听器内部处理。
          </Callout>

          <h2 id="source-code" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、源码分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            核心入口是 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">AbstractApplicationContext.publishEvent()</code>：
          </p>

          <Playground
            code={`// AbstractApplicationContext 核心逻辑
protected void publishEvent(Object event, @Nullable ResolvableType eventType) {
    // 1. 封装为 ApplicationEvent
    ApplicationEvent applicationEvent = 
        (event instanceof ApplicationEvent) ? 
        (ApplicationEvent) event : new PayloadApplicationEvent<>(this, event);
    
    // 2. 获取事件广播器
    ApplicationEventMulticaster multicaster = getApplicationEventMulticaster();
    
    // 3. 广播事件（遍历所有监听者）
    multicaster.multicastEvent(applicationEvent, eventType);
}

// SimpleApplicationEventMulticaster 广播逻辑
public void multicastEvent(ApplicationEvent event, @Nullable ResolvableType eventType) {
    for (ApplicationListener<?> listener : getApplicationListeners(event, type)) {
        Executor executor = getTaskExecutor();
        
        if (executor != null) {
            // 异步执行
            executor.execute(() -> invokeListener(listener, event));
        } else {
            // 同步执行
            invokeListener(listener, event);
        }
    }
}`}
            language="java"
            highlights={[3, 9, 12, 17, 21, 24]}
            filename="EventPublishing.java"
            description="事件发布源码"
          />

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>关键步骤解析：</strong>
          </p>
          <ol className="list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-6 space-y-2">
            <li><code>publishEvent</code>：将任意对象封装为 <code>ApplicationEvent</code>（Spring 4.2+ 支持 POJO 事件）</li>
            <li><code>getApplicationEventMulticaster</code>：获取事件广播器（默认 <code>SimpleApplicationEventMulticaster</code>）</li>
            <li><code>multicastEvent</code>：遍历匹配的监听者，根据是否配置线程池决定同步或异步执行</li>
            <li><code>invokeListener</code>：通过反射调用监听器方法，处理异常</li>
          </ol>

          <SideNote label="事件匹配规则">
            Spring 通过<strong>事件类型</strong>匹配监听者：<code>@EventListener(UserRegisteredEvent.class)</code> 只接收该类型及其子类的事件。如果监听父类事件（如 <code>ApplicationEvent</code>），会收到所有事件。
          </SideNote>

          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、最佳实践
          </h2>

          <ol className="list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-6 space-y-3">
            <li>
              <strong>事件命名规范</strong>：使用过去分词命名，如 <code>UserCreatedEvent</code>、<code>OrderPaidEvent</code>，清晰表达"已发生"的语义。
            </li>
            <li>
              <strong>避免在事件中传递大量数据</strong>：事件应轻量，只包含必要信息（如 ID），监听者按需查询数据库。
            </li>
            <li>
              <strong>耗时操作使用异步</strong>：邮件发送、短信通知、文件生成等操作应异步执行，避免阻塞主流程。
            </li>
            <li>
              <strong>异常处理</strong>：异步监听器的异常不会传播，必须在方法内部捕获并记录日志。
            </li>
            <li>
              <strong>事务绑定</strong>：使用 <code>@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)</code> 确保事务提交后再执行监听器，避免数据不一致。
            </li>
            <li>
              <strong>条件过滤</strong>：使用 SpEL 表达式过滤事件，如 <code>@EventListener(condition = "#event.status == 'PAID'")</code>。
            </li>
          </ol>

          <Playground
            code={`@Component
public class OrderEventListener {
    
    // ✅ 事务提交后才执行，避免读到未提交数据
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleOrderPaid(OrderPaidEvent event) {
        // 此时订单数据已持久化，可以安全查询
        Order order = orderRepository.findById(event.getOrderId());
        sendReceipt(order);
    }
    
    // ✅ 条件过滤：只处理 VIP 用户
    @EventListener(condition = "#event.userLevel == 'VIP'")
    public void handleVipOrder(VipOrderEvent event) {
        sendGift(event.getUserId());
    }
    
    // ✅ 异步 + 异常处理
    @Async
    @EventListener
    public void handleOrderShipped(OrderShippedEvent event) {
        try {
            sendSms(event.getPhone());
        } catch (Exception e) {
            log.error("发送短信失败", e);
        }
    }
}`}
            language="java"
            highlights={[5, 13, 20, 23]}
            filename="BestPractice.java"
            description="事件机制最佳实践"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、常见误区
          </h2>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">误区</th>
                <th className="text-left p-3 font-semibold text-ink">真相</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">事件监听一定是异步的</td>
                <td className="p-3">默认是同步的，需显式配置 <code>@Async</code> 和线程池</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">异步监听器可以参与发布者事务</td>
                <td className="p-3">异步监听器在独立线程执行，无法共享事务</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">事件可以跨应用传播</td>
                <td className="p-3">Spring 事件仅限于单个 ApplicationContext 内</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">监听器执行顺序可控</td>
                <td className="p-3">默认无序，需实现 <code>Ordered</code> 接口或使用 <code>@Order</code></td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">事件机制可以替代消息队列</td>
                <td className="p-3">事件机制仅限单机，分布式场景需用 Kafka/RabbitMQ</td>
              </tr>
            </tbody>
          </table>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'Spring 事件机制的实现原理是什么？',
                answer: 'Spring 事件机制基于观察者模式实现：\n1. 发布者通过 ApplicationEventPublisher 发布事件\n2. ApplicationContext 中的 ApplicationEventMulticaster 负责广播事件\n3. 遍历所有匹配的 ApplicationListener，同步或异步调用其 onApplicationEvent 方法\n4. Spring 4.2+ 支持基于注解的 @EventListener，底层通过 EventListenerMethodProcessor 扫描并注册监听器\n\n核心类：ApplicationEvent、ApplicationListener、ApplicationEventMulticaster、AbstractApplicationContext。'
              },
              {
                question: '如何实现异步事件监听？',
                answer: '实现异步事件监听的步骤：\n1. 配置类添加 @EnableAsync 注解\n2. 定义 ApplicationEventMulticaster Bean，配置线程池\n3. 监听器方法添加 @Async 注解\n4. 确保监听器类和调用方不在同一个类中（避免自调用问题）\n\n注意：异步监听器无法参与发布者的事务，异常也不会传播到发布者。'
              },
              {
                question: '@EventListener 和 ApplicationListener 有什么区别？',
                answer: '@EventListener：\n- 基于注解，代码简洁\n- 支持 SpEL 条件过滤\n- 支持 @TransactionalEventListener 绑定事务阶段\n- 推荐在大多数场景使用\n\nApplicationListener：\n- 基于接口，类型安全\n- 支持泛型，编译期检查\n- 适合动态注册/注销监听器\n- 适合需要继承复用的场景'
              },
              {
                question: '如何保证事件监听器在事务提交后执行？',
                answer: '使用 @TransactionalEventListener 注解，指定 phase 参数：\n- BEFORE_COMMIT：事务提交前执行（默认）\n- AFTER_COMMIT：事务提交后执行（最常用）\n- AFTER_ROLLBACK：事务回滚后执行\n- AFTER_COMPLETION：事务完成后执行（无论提交或回滚）\n\n示例：\n@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)\npublic void handleOrderPaid(OrderPaidEvent event) { ... }\n\n这样可以避免监听器读取到未提交的数据。'
              },
              {
                question: 'Spring 事件机制和消息队列有什么区别？',
                answer: 'Spring 事件机制：\n- 限于单个 JVM/ApplicationContext 内\n- 同步或异步（线程池）\n- 无持久化，应用重启事件丢失\n- 轻量级，适合单机解耦\n\n消息队列（Kafka/RabbitMQ）：\n- 支持分布式系统间通信\n- 消息持久化，保证可靠性\n- 支持削峰填谷、延迟消息等高级特性\n- 重量级，需要额外基础设施\n\n选择建议：单机解耦用事件机制，分布式通信用消息队列。'
              },
              {
                question: '如何控制多个监听器的执行顺序？',
                answer: '有三种方式控制执行顺序：\n1. 实现 Ordered 接口，重写 getOrder() 方法\n2. 使用 @Order 注解：@Order(1)、@Order(2)\n3. 使用 @EventListener 的 order 属性（Spring 5.2+）\n\n数值越小优先级越高。注意：只有同步监听器的顺序可控，异步监听器由于在线程池中执行，顺序不确定。'
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、知识关联
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <a href="/docs/06-spring-framework/spring-core" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">前置知识 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Spring Core IoC</div>
              <div className="text-[12px] text-ink-muted mt-1">ApplicationContext 与 Bean 管理</div>
            </a>
            <a href="/docs/09-design-patterns/behavioral-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">设计模式 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">观察者模式</div>
              <div className="text-[12px] text-ink-muted mt-1">事件机制的设计模式基础</div>
            </a>
            <a href="/docs/08-microservices/message-queue" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">进阶对比 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">消息队列</div>
              <div className="text-[12px] text-ink-muted mt-1">分布式事件解决方案</div>
            </a>
            <a href="/docs/03-multithreading/thread-pool" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">线程池</div>
              <div className="text-[12px] text-ink-muted mt-1">异步事件的底层支撑</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            Spring 事件机制是解耦业务逻辑的重要工具，建议重点掌握：① 同步 vs 异步的使用场景；② @TransactionalEventListener 的事务绑定；③ 与消息队列的区别和选型。可以通过实际项目练习，如实现用户注册后的邮件通知、订单状态变更后的库存更新等场景。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
