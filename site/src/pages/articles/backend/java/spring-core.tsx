import KnowledgeLayout from '../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../components/knowledge/Playground'
import SideNote from '../../../components/knowledge/SideNote'
import SmartTOC from '../../../components/knowledge/SmartTOC'
import Callout from '../../../components/ui/Callout'
import DiagramBlock from '../../../components/ui/DiagramBlock'
import InterviewSection from '../../../components/ui/InterviewSection'
import ArticleNav from '../../../components/article/ArticleNav'
import { getArticleNav } from '../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'ioc-container', text: '一、IoC 容器核心概念', level: 2 },
  { id: 'bean-lifecycle', text: '二、Bean 生命周期', level: 2 },
  { id: 'dependency-injection', text: '三、依赖注入方式', level: 2 },
  { id: 'application-context', text: '四、ApplicationContext vs BeanFactory', level: 2 },
  { id: 'bean-scope', text: '五、Bean 作用域', level: 2 },
  { id: 'autowiring', text: '六、自动装配机制', level: 2 },
  { id: 'configuration', text: '七、配置方式演进', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function SpringCore({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Spring IoC（Inversion of Control）容器是 Spring 框架的<strong className="text-accent">核心引擎</strong>，负责管理对象的生命周期、创建和依赖关系，
              通过依赖注入（DI）实现组件解耦，将对象的控制权从应用程序代码转移到容器。
            </p>
          </blockquote>

          <Callout type="tip" title="控制反转的本质">
            IoC 不是技术，而是一种设计思想：传统编程中对象主动创建依赖（new），IoC 模式下由容器被动注入依赖，降低耦合度。
          </Callout>

          <h2 id="ioc-container" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、IoC 容器核心概念
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring IoC 容器包含两个核心接口：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">BeanFactory</code> 和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ApplicationContext</code>。
          </p>

          <DiagramBlock title="IoC 容器架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌──────────────────────────────────────┐
│       ApplicationContext             │
│  ┌────────────────────────────────┐  │
│  │   BeanFactory (核心)           │  │
│  │  ┌──────────────────────────┐  │  │
│  │  │  BeanDefinitionRegistry  │  │  │
│  │  │  - 存储 Bean 定义         │  │  │
│  │  │  - 管理 Bean 元数据       │  │  │
│  │  └──────────────────────────┘  │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │  附加功能                       │  │
│  │  - 事件发布                     │  │
│  │  - 国际化                       │  │
│  │  - 资源加载                     │  │
│  │  - AOP 集成                     │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="BeanDefinition">
            BeanDefinition 是 Bean 的元数据描述，包含类名、作用域、构造参数、属性值等信息，容器根据它创建和管理 Bean 实例。
          </SideNote>

          <h2 id="bean-lifecycle" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Bean 生命周期
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring Bean 的生命周期分为四个阶段：<strong>实例化 → 属性填充 → 初始化 → 销毁</strong>。
          </p>

          <Playground
            code={`import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Component
public class UserService {
    
    private String name;
    
    // 1. 构造方法（实例化）
    public UserService() {
        System.out.println("1. UserService 实例化");
    }
    
    // 2. Setter 注入（属性填充）
    public void setName(String name) {
        this.name = name;
        System.out.println("2. 注入 name: " + name);
    }
    
    // 3. @PostConstruct（初始化前）
    @PostConstruct
    public void init() {
        System.out.println("3. @PostConstruct 初始化");
    }
    
    // 4. InitializingBean.afterPropertiesSet()
    public void afterPropertiesSet() {
        System.out.println("4. afterPropertiesSet 初始化");
    }
    
    // 业务方法
    public void doSomething() {
        System.out.println("执行业务逻辑");
    }
    
    // 5. @PreDestroy（销毁前）
    @PreDestroy
    public void destroy() {
        System.out.println("5. @PreDestroy 销毁");
    }
}

// 预期输出：
// 1. UserService 实例化
// 2. 注入 name: John
// 3. @PostConstruct 初始化
// 4. afterPropertiesSet 初始化
// 执行业务逻辑
// 5. @PreDestroy 销毁`}
            language="java"
            highlights={[7, 13, 20, 26, 32, 38, 44]}
            filename="BeanLifecycle.java"
            description="Bean 完整生命周期演示"
          />

          <DiagramBlock title="Bean 生命周期流程图">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────┐
│ 实例化       │ ← InstantiationAwareBeanPostProcessor.postProcessBeforeInstantiation()
│ (Constructor)│
└──────┬──────┘
       ▼
┌─────────────┐
│ 属性填充     │ ← populateBean()
│ (DI)        │
└──────┬──────┘
       ▼
┌─────────────┐
│ 初始化前     │ ← BeanPostProcessor.postProcessBeforeInitialization()
└──────┬──────┘
       ▼
┌─────────────┐
│ 初始化       │ ← @PostConstruct / afterPropertiesSet() / init-method
└──────┬──────┘
       ▼
┌─────────────┐
│ 初始化后     │ ← BeanPostProcessor.postProcessAfterInitialization()
│ (AOP 代理)   │
└──────┬──────┘
       ▼
┌─────────────┐
│ 使用 Bean    │ ← 业务调用
└──────┬──────┘
       ▼
┌─────────────┐
│ 销毁         │ ← @PreDestroy / DisposableBean.destroy() / destroy-method
└─────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="BeanPostProcessor">
            BeanPostProcessor 是 Spring 提供的扩展点，允许在 Bean 初始化前后进行自定义处理，AOP 代理就是在此阶段创建的。
          </SideNote>

          <h2 id="dependency-injection" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、依赖注入方式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 支持三种依赖注入方式：<strong>构造器注入、Setter 注入、字段注入</strong>。
          </p>

          <Playground
            code={`import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    
    private final PaymentService paymentService;  // 构造器注入（推荐）
    private NotificationService notificationService;  // Setter 注入
    
    // ✅ 推荐：构造器注入（不可变、易测试）
    @Autowired
    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    
    // ⚠️ Setter 注入（可选依赖）
    @Autowired
    public void setNotificationService(NotificationService service) {
        this.notificationService = service;
    }
    
    // ❌ 不推荐：字段注入（隐藏依赖、难测试）
    @Autowired
    private Logger logger;
    
    public void createOrder() {
        paymentService.pay();
        notificationService.notify();
        logger.info("订单创建成功");
    }
}`}
            language="java"
            highlights={[7, 8, 12, 19, 24]}
            filename="DependencyInjection.java"
            description="三种依赖注入方式对比"
          />

          <Callout type="warning" title="字段注入的问题">
            <ul className="list-disc list-inside space-y-1 text-[13px] sm:text-[14px]">
              <li>无法声明 final 字段，破坏不可变性</li>
              <li>单元测试需要反射或 Spring 容器，增加复杂度</li>
              <li>隐藏依赖关系，违反单一职责原则</li>
              <li>容易导致循环依赖难以发现</li>
            </ul>
          </Callout>

          <h2 id="application-context" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、ApplicationContext vs BeanFactory
          </h2>
          
          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">特性</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">BeanFactory</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">ApplicationContext</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2">懒加载</td>
                <td className="border border-border-light px-3 py-2">✅ 默认懒加载</td>
                <td className="border border-border-light px-3 py-2">❌ 默认预加载</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2">事件发布</td>
                <td className="border border-border-light px-3 py-2">❌ 不支持</td>
                <td className="border border-border-light px-3 py-2">✅ ApplicationEvent</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">国际化</td>
                <td className="border border-border-light px-3 py-2">❌ 不支持</td>
                <td className="border border-border-light px-3 py-2">✅ MessageSource</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2">资源加载</td>
                <td className="border border-border-light px-3 py-2">基础支持</td>
                <td className="border border-border-light px-3 py-2">✅ ResourceLoader</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">AOP 集成</td>
                <td className="border border-border-light px-3 py-2">❌ 需手动配置</td>
                <td className="border border-border-light px-3 py-2">✅ 自动集成</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2">适用场景</td>
                <td className="border border-border-light px-3 py-2">内存受限环境</td>
                <td className="border border-border-light px-3 py-2">企业级应用（推荐）</td>
              </tr>
            </tbody>
          </table>

          <h2 id="bean-scope" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Bean 作用域
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 支持多种 Bean 作用域，控制 Bean 实例的生命周期和可见范围。
          </p>

          <Playground
            code={`import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.context.annotation.SessionScope;

// 1. Singleton（默认）：整个容器共享一个实例
@Component
@Scope("singleton")
public class SingletonService {
    // 线程不安全！需要额外同步措施
}

// 2. Prototype：每次获取都创建新实例
@Component
@Scope("prototype")
public class PrototypeService {
    // 适合有状态的对象
}

// 3. Request：每个 HTTP 请求一个实例（Web 环境）
@Component
@RequestScope
public class RequestScopedService {
    // 存储请求级别的数据
}

// 4. Session：每个 HTTP Session 一个实例（Web 环境）
@Component
@SessionScope
public class SessionScopedService {
    // 存储用户会话数据
}

// 5. Application：整个 ServletContext 共享一个实例
@Component
@org.springframework.web.context.annotation.ApplicationScope
public class ApplicationScopedService {
    // 类似 Singleton，但限于 Web 应用
}`}
            language="java"
            highlights={[8, 15, 22, 29, 36]}
            filename="BeanScopes.java"
            description="Bean 作用域示例"
          />

          <Callout type="danger" title="Singleton 线程安全问题">
            Singleton Bean 在多线程环境下共享实例，如果包含可变状态（如实例变量），会导致线程安全问题。解决方案：
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>使用 ThreadLocal 隔离线程状态</li>
              <li>将可变状态提取到 Prototype Bean</li>
              <li>使用同步机制（synchronized、ReentrantLock）</li>
              <li>设计为无状态 Bean（最佳实践）</li>
            </ul>
          </Callout>

          <h2 id="autowiring" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、自动装配机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 提供四种自动装配策略，解决依赖注入时的歧义问题。
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">策略</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">说明</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">优先级</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">@Primary</code></td>
                <td className="border border-border-light px-3 py-2">标记首选 Bean</td>
                <td className="border border-border-light px-3 py-2">⭐⭐⭐</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">@Qualifier</code></td>
                <td className="border border-border-light px-3 py-2">指定 Bean 名称</td>
                <td className="border border-border-light px-3 py-2">⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">按类型匹配</td>
                <td className="border border-border-light px-3 py-2">根据接口/类自动匹配</td>
                <td className="border border-border-light px-3 py-2">⭐⭐</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2">按名称匹配</td>
                <td className="border border-border-light px-3 py-2">字段名与 Bean 名称一致</td>
                <td className="border border-border-light px-3 py-2">⭐</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

interface PaymentService {
    void pay();
}

// 多个实现类导致歧义
@Service
@Primary  // ✅ 标记为首选
public class AlipayService implements PaymentService {
    public void pay() {
        System.out.println("支付宝支付");
    }
}

@Service
public class WechatPayService implements PaymentService {
    public void pay() {
        System.out.println("微信支付");
    }
}

@Service
public class OrderService {
    private final PaymentService paymentService;
    
    // 方式 1：使用 @Primary（自动注入 AlipayService）
    @Autowired
    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    
    // 方式 2：使用 @Qualifier 明确指定
    @Autowired
    public OrderService(@Qualifier("wechatPayService") PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}`}
            language="java"
            highlights={[11, 30, 37]}
            filename="Autowiring.java"
            description="自动装配歧义解决方案"
          />

          <h2 id="configuration" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、配置方式演进
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 配置经历了三个阶段：<strong>XML → 注解 → Java Config</strong>。
          </p>

          <Playground
            code={`// ===== 阶段 1：XML 配置（Spring 2.x）=====
<!-- applicationContext.xml -->
<bean id="userService" class="com.example.UserService">
    <property name="userRepository" ref="userRepository"/>
</bean>

<bean id="userRepository" class="com.example.UserRepository"/>


// ===== 阶段 2：注解配置（Spring 3.x）=====
@Component
public class UserService {
    @Autowired
    private UserRepository userRepository;
}

@Repository
public class UserRepository {
    // ...
}


// ===== 阶段 3：Java Config（Spring 4.x+，推荐）=====
@Configuration
public class AppConfig {
    
    @Bean
    public UserService userService(UserRepository userRepository) {
        return new UserService(userRepository);
    }
    
    @Bean
    public UserRepository userRepository() {
        return new UserRepository();
    }
}

// 启动容器
AnnotationConfigApplicationContext context = 
    new AnnotationConfigApplicationContext(AppConfig.class);
UserService userService = context.getBean(UserService.class);`}
            language="java"
            highlights={[3, 12, 25]}
            filename="ConfigurationEvolution.java"
            description="Spring 配置方式演进"
          />

          <Callout type="tip" title="现代 Spring 最佳实践">
            <ul className="list-disc list-inside space-y-1 text-[13px] sm:text-[14px]">
              <li>优先使用 <code className="font-mono text-[12px]">@Configuration</code> + <code className="font-mono text-[12px]">@Bean</code> 替代 XML</li>
              <li>使用构造器注入替代字段注入</li>
              <li>避免过度使用 <code className="font-mono text-[12px]">@ComponentScan</code>，显式声明 Bean</li>
              <li>利用 <code className="font-mono text-[12px]">@Profile</code> 管理多环境配置</li>
              <li>使用 <code className="font-mono text-[12px]">@Conditional</code> 实现条件装配</li>
            </ul>
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区 1：@Autowired 一定会注入">
            <p className="text-[13px] sm:text-[14px] leading-relaxed">
              <strong>错误认知：</strong>@Autowired 标注的字段一定会被注入。<br/>
              <strong>真相：</strong>如果容器中找不到匹配的 Bean，且未设置 <code className="font-mono text-[12px]">required=false</code>，会抛出 <code className="font-mono text-[12px]">NoSuchBeanDefinitionException</code>。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：Singleton Bean 是线程安全的">
            <p className="text-[13px] sm:text-[14px] leading-relaxed">
              <strong>错误认知：</strong>Singleton 模式的 Bean 自动线程安全。<br/>
              <strong>真相：</strong>Spring 不保证 Singleton Bean 的线程安全性。如果 Bean 包含可变状态（如实例变量），需要开发者自行处理并发问题。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：循环依赖可以通过 @Lazy 完全解决">
            <p className="text-[13px] sm:text-[14px] leading-relaxed">
              <strong>错误认知：</strong>@Lazy 可以解决所有循环依赖问题。<br/>
              <strong>真相：</strong>@Lazy 只能解决部分构造器循环依赖，对于复杂场景仍需重构代码。根本解决方案是重新设计模块边界，消除循环依赖。
            </p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "Spring IoC 和 DI 有什么区别？",
                answer: "IoC（控制反转）是一种设计思想，指将对象的控制权交给容器；DI（依赖注入）是 IoC 的具体实现方式，通过构造函数、Setter 或字段注入依赖。IoC 是目标，DI 是手段。"
              },
              {
                question: "Bean 的生命周期有哪些关键步骤？",
                answer: "Bean 生命周期包括：① 实例化（Constructor）→ ② 属性填充（populateBean）→ ③ 初始化前（BeanPostProcessor.postProcessBeforeInitialization）→ ④ 初始化（@PostConstruct/afterPropertiesSet/init-method）→ ⑤ 初始化后（BeanPostProcessor.postProcessAfterInitialization，创建 AOP 代理）→ ⑥ 使用 → ⑦ 销毁（@PreDestroy/destroy/destroy-method）。"
              },
              {
                question: "ApplicationContext 和 BeanFactory 的区别？",
                answer: "主要区别：① BeanFactory 是基础容器，ApplicationContext 是其子接口；② BeanFactory 默认懒加载，ApplicationContext 默认预加载；③ ApplicationContext 提供事件发布、国际化、资源加载等高级功能；④ 企业级应用推荐使用 ApplicationContext。"
              },
              {
                question: "如何解决循环依赖问题？",
                answer: "解决方案：① 使用 @Lazy 延迟加载打破循环；② 使用 Setter 注入替代构造器注入；③ 引入第三方类解耦；④ 使用 @DependsOn 明确依赖顺序；⑤ 重构代码，重新设计模块边界（最佳方案）。Spring 三级缓存只能解决单例模式下的 setter 循环依赖。"
              },
              {
                question: "Singleton Bean 如何保证线程安全？",
                answer: "Spring 不保证 Singleton Bean 的线程安全。解决方案：① 设计为无状态 Bean（推荐）；② 使用 ThreadLocal 隔离线程状态；③ 使用同步机制（synchronized、ReentrantLock）；④ 将可变状态提取到 Prototype Bean。"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring IoC 容器是整个 Spring 生态的基础，理解它有助于深入学习其他 Spring 技术：
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><strong className="text-ink">前置知识：</strong><a href="/docs/01-java-core/reflection" className="text-accent hover:underline ml-1">反射机制</a>、<a href="/docs/01-java-core/java-basics" className="text-accent hover:underline ml-1">Java 基础</a></li>
            <li><strong className="text-ink">后续学习：</strong><a href="/docs/06-spring-framework/spring-aop" className="text-accent hover:underline ml-1">Spring AOP</a>、<a href="/docs/06-spring-framework/spring-boot" className="text-accent hover:underline ml-1">Spring Boot</a></li>
            <li><strong className="text-ink">相关模式：</strong><a href="/docs/09-design-patterns/creational-patterns" className="text-accent hover:underline ml-1">工厂模式</a>、<a href="/docs/09-design-patterns/structural-patterns" className="text-accent hover:underline ml-1">代理模式</a></li>
          </ul>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
