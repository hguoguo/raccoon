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
  { id: 'overview', text: '整体架构', level: 2 },
  { id: 'core', text: '核心原理', level: 2 },
  { id: 'ioc-container', text: 'IoC 容器', level: 3 },
  { id: 'bean-lifecycle', text: 'Bean 生命周期', level: 3 },
  { id: 'dependency-injection', text: '依赖注入', level: 3 },
  { id: 'bean-scopes', text: 'Bean 作用域', level: 3 },
  { id: 'playground', text: '代码实验场', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比分析', level: 2 },
]

export default function SpringCore({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              <strong>Spring IoC（控制反转）容器</strong>是 Spring 框架的核心，负责管理对象的生命周期和依赖关系，
              通过<strong>依赖注入（DI）</strong>将对象的创建和装配从业务代码中解耦，
              实现<strong>松耦合</strong>、<strong>可测试</strong>、<strong>易维护</strong>的企业级应用架构。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 IoC？">
            在传统编程中，对象需要自己创建依赖的对象（如 new UserService()），导致代码高度耦合。
            IoC 将对象的创建权交给容器，开发者只需声明依赖，容器自动注入，大大降低了耦合度，
            提升了代码的可测试性和可维护性。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            整体架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring IoC 容器的核心接口是 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">BeanFactory</code> 
            和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ApplicationContext</code>，
            它们负责 Bean 的实例化、配置和组装。
          </p>

          <DiagramBlock title="Spring IoC 容器层次结构">
            {`
┌─────────────────────────────────────────────┐
│         ApplicationContext (应用上下文)       │
│   - ClassPathXmlApplicationContext           │
│   - AnnotationConfigApplicationContext      │
│   - WebApplicationContext                   │
└──────────────────┬──────────────────────────┘
                   │ 继承
                   ▼
┌─────────────────────────────────────────────┐
│         BeanFactory (Bean 工厂)              │
│   - DefaultListableBeanFactory               │
│   - XmlBeanFactory                           │
└──────────────────┬──────────────────────────┘
                   │ 管理
                   ▼
┌─────────────────────────────────────────────┐
│              Beans (Bean 对象)                │
│   - Singleton (默认)                         │
│   - Prototype                                │
│   - Request / Session / Application          │
└─────────────────────────────────────────────┘

注意：ApplicationContext 是 BeanFactory 的子接口，提供了更多企业级功能
（如国际化、事件发布、AOP 集成等），实际开发中优先使用 ApplicationContext。
            `}
          </DiagramBlock>

          <SideNote>
            <p className="text-sm text-ink-muted">
              <strong>关键点：</strong>BeanFactory 采用<strong>懒加载</strong>策略（首次使用时创建），
              ApplicationContext 采用<strong>预加载</strong>策略（启动时创建所有 singleton Bean）。
            </p>
          </SideNote>

          <h2 id="core" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            核心原理
          </h2>

          <h3 id="ioc-container" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            IoC 容器
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring IoC 容器的工作流程：
          </p>

          <Playground
            code={`// 1. 定义 Bean
@Component
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public User createUser(String name) {
        return userRepository.save(new User(name));
    }
}

// 2. 容器启动时扫描并注册 Bean
@Configuration
@ComponentScan("com.example")
public class AppConfig {}

// 3. 创建容器
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

// 4. 从容器获取 Bean
UserService userService = context.getBean(UserService.class);

// 5. 使用 Bean
User user = userService.createUser("张三");`}
            language="java"
            description="IoC 容器基本用法"
          />

          <h3 id="bean-lifecycle" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            Bean 生命周期
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring Bean 的生命周期包含多个阶段，理解这些阶段对于掌握 Spring 至关重要：
          </p>

          <DiagramBlock title="Bean 生命周期流程图">
            {`
1. 实例化 (Instantiation)
   ↓
2. 属性赋值 (Populate Bean)
   ↓
3. Aware 接口回调
   - BeanNameAware.setBeanName()
   - BeanFactoryAware.setBeanFactory()
   ↓
4. BeanPostProcessor.postProcessBeforeInitialization()
   ↓
5. 初始化 (Initialization)
   - @PostConstruct
   - InitializingBean.afterPropertiesSet()
   - init-method
   ↓
6. BeanPostProcessor.postProcessAfterInitialization()
   ↓
7. Bean 就绪，可以使用
   ↓
8. 容器关闭时
   - @PreDestroy
   - DisposableBean.destroy()
   - destroy-method
   ↓
9. Bean 销毁
            `}
          </DiagramBlock>

          <Playground
            code={`@Component
public class LifecycleBean implements InitializingBean, DisposableBean {
    
    private String name;
    
    // 1. 构造方法
    public LifecycleBean() {
        System.out.println("1. Constructor called");
    }
    
    // 2. 属性注入
    @Autowired
    public void setName(@Value("${'app.name'}") String name) {
        this.name = name;
        System.out.println("2. Property injected: " + name);
    }
    
    // 3. @PostConstruct
    @PostConstruct
    public void init() {
        System.out.println("3. @PostConstruct called");
    }
    
    // 4. InitializingBean
    @Override
    public void afterPropertiesSet() {
        System.out.println("4. afterPropertiesSet called");
    }
    
    // 5. 自定义 init-method（XML 配置）
    public void customInit() {
        System.out.println("5. custom init-method called");
    }
    
    // 6. 业务方法
    public void doSomething() {
        System.out.println("6. Business logic executed");
    }
    
    // 7. @PreDestroy
    @PreDestroy
    public void cleanup() {
        System.out.println("7. @PreDestroy called");
    }
    
    // 8. DisposableBean
    @Override
    public void destroy() {
        System.out.println("8. destroy called");
    }
}`}
            language="java"
            description="Bean 生命周期示例"
          />

          <h3 id="dependency-injection" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            依赖注入
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 支持 <strong>3 种依赖注入方式</strong>：
          </p>

          <Playground
            code={`@Service
public class OrderService {
    
    private final UserRepository userRepository;
    private PaymentService paymentService;
    
    // 1. 构造器注入（✅ 推荐）
    // 优点：不可变、强制依赖、易于测试
    @Autowired
    public OrderService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    // 2. Setter 注入
    // 优点：可选依赖、可以重新注入
    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    
    // 3. 字段注入（❌ 不推荐）
    // 缺点：无法设置为 final、难以测试、隐藏依赖
    @Autowired
    private OrderRepository orderRepository;
    
    public Order createOrder(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        // ...
        return order;
    }
}

// Spring Boot 2.x+ 支持构造器注入省略 @Autowired
@Service
@RequiredArgsConstructor  // Lombok
public class ProductService {
    private final ProductRepository productRepository;  // 自动注入
}`}
            language="java"
            description="3种依赖注入方式"
          />

          <Callout type="warning" title="⚠️ 循环依赖问题">
            <p className="text-sm">
              如果 A 依赖 B，B 又依赖 A，会形成循环依赖。Spring 通过<strong>三级缓存</strong>解决单例 Bean 的循环依赖，
              但构造器注入的循环依赖无法解决。解决方案：使用 <code className="font-mono text-xs">@Lazy</code> 
              延迟加载，或重构代码消除循环依赖。
            </p>
          </Callout>

          <h3 id="bean-scopes" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            Bean 作用域
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 定义了 <strong>5 种 Bean 作用域</strong>：
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作用域</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">适用场景</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr><td className="px-4 py-3 font-mono text-sm">singleton</td><td className="px-4 py-3 text-sm">单例（默认），整个容器只有一个实例</td><td className="px-4 py-3 text-sm">无状态服务（Service、DAO）</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">prototype</td><td className="px-4 py-3 text-sm">原型，每次获取都创建新实例</td><td className="px-4 py-3 text-sm">有状态对象</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">request</td><td className="px-4 py-3 text-sm">每个 HTTP 请求一个实例</td><td className="px-4 py-3 text-sm">Web 应用</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">session</td><td className="px-4 py-3 text-sm">每个 HTTP Session 一个实例</td><td className="px-4 py-3 text-sm">用户会话数据</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">application</td><td className="px-4 py-3 text-sm">每个 ServletContext 一个实例</td><td className="px-4 py-3 text-sm">全局共享数据</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="playground" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            代码实验场
          </h2>
          <Playground
            code={`@Configuration
@ComponentScan("com.example")
public class AppConfig {
    
    // 手动定义 Bean
    @Bean
    @Scope("prototype")  // 指定作用域
    public DataSource dataSource() {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl("jdbc:mysql://localhost:3306/test");
        ds.setUsername("root");
        ds.setPassword("password");
        return ds;
    }
    
    // 条件化 Bean
    @Bean
    @ConditionalOnProperty(name = "cache.enabled", havingValue = "true")
    public CacheManager cacheManager() {
        return new RedisCacheManager();
    }
}

// 使用 Bean
@Service
public class UserService {
    
    private final DataSource dataSource;
    
    @Autowired
    public UserService(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    
    public List<User> findAll() {
        // 使用 dataSource...
        return users;
    }
}`}
            language="java"
            description="Bean 配置和使用示例"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            常见误区
          </h2>

          <Callout type="danger" title="误区 1：认为 Singleton Bean 是线程安全的">
            <p className="text-sm mb-2">
              ❌ 错误认知：Singleton Bean 只有一个实例，所以是线程安全的
            </p>
            <p className="text-sm">
              ✅ 正确理解：Singleton 只保证容器中只有一个实例，<strong>不保证线程安全</strong>。
              如果 Bean 中有可变状态（成员变量），多线程访问时仍需要同步机制。
              最佳实践：Service、DAO 应该是<strong>无状态</strong>的，避免使用成员变量存储状态。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：过度使用字段注入">
            <p className="text-sm mb-2">
              ❌ 不良习惯：
            </p>
            <pre className="bg-gray-50 p-3 rounded text-sm font-mono">
{`@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;  // 字段注入
}`}
            </pre>
            <p className="text-sm mt-2">
              ✅ 推荐做法：使用<strong>构造器注入</strong>，可以设置为 final，保证不可变性，便于单元测试。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：忽略 Bean 的生命周期回调顺序">
            <p className="text-sm mb-2">
              ❌ 错误认知：@PostConstruct 和 afterPropertiesSet 的执行顺序无所谓
            </p>
            <p className="text-sm">
              ✅ 正确顺序：<code className="font-mono text-xs">@PostConstruct</code> → 
              <code className="font-mono text-xs">InitializingBean.afterPropertiesSet()</code> → 
              <code className="font-mono text-xs">init-method</code>。
              如果同时使用多种方式，需要注意执行顺序，避免逻辑冲突。
            </p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            面试真题
          </h2>
          <InterviewSection
            questions={[
              {
                question: '什么是 IoC 和 DI？它们有什么区别？',
                answer: `IoC（Inversion of Control，控制反转）：
- 设计思想：将对象的创建权和依赖关系的管理权从应用程序代码转移到容器
- 目的：降低耦合度，提升可测试性和可维护性

DI（Dependency Injection，依赖注入）：
- 实现方式：IoC 的具体实现手段
- 过程：容器在运行时动态地将依赖对象注入到目标对象中

区别：
- IoC 是思想/原则，DI 是实现方式
- IoC 强调"控制权转移"，DI 强调"依赖注入"
- 类比：IoC 是好莱坞原则（Don't call us, we'll call you），DI 是具体如何实现

示例：
// 传统方式（没有 IoC）
public class OrderService {
    private UserRepository userRepo = new UserRepository();  // 自己创建依赖
}

// IoC 方式
public class OrderService {
    private UserRepository userRepo;
    
    @Autowired  // 容器注入依赖
    public OrderService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }
}`
              },
              {
                question: 'BeanFactory 和 ApplicationContext 的区别是什么？',
                answer: `主要区别：

1. 继承关系：
   - ApplicationContext 继承自 BeanFactory
   - ApplicationContext 是 BeanFactory 的扩展

2. 加载策略：
   - BeanFactory：懒加载（首次使用时创建 Bean）
   - ApplicationContext：预加载（启动时创建所有 singleton Bean）

3. 功能：
   - BeanFactory：只提供基本的 IoC 功能
   - ApplicationContext：提供企业级功能
     * 国际化（MessageSource）
     * 事件发布（ApplicationEventPublisher）
     * AOP 集成
     * Web 应用支持
     * 资源加载

4. 性能：
   - BeanFactory：启动快，内存占用少
   - ApplicationContext：启动慢，但运行时性能好

5. 使用场景：
   - BeanFactory：资源受限的环境（如移动设备）
   - ApplicationContext：大多数企业应用

推荐：
- 99% 的场景使用 ApplicationContext
- 只有在资源极度受限时才考虑 BeanFactory`
              },
              {
                question: 'Spring Bean 的生命周期是怎样的？',
                answer: `Bean 生命周期分为 9 个阶段：

1. 实例化（Instantiation）：
   - 调用构造方法创建 Bean 实例

2. 属性赋值（Populate Bean）：
   - 注入依赖（@Autowired、@Value 等）

3. Aware 接口回调：
   - BeanNameAware.setBeanName()
   - BeanFactoryAware.setBeanFactory()
   - ApplicationContextAware.setApplicationContext()

4. BeanPostProcessor.postProcessBeforeInitialization()：
   - 前置处理

5. 初始化（Initialization）：
   - @PostConstruct 注解的方法
   - InitializingBean.afterPropertiesSet()
   - 自定义 init-method

6. BeanPostProcessor.postProcessAfterInitialization()：
   - 后置处理（AOP 代理在此阶段创建）

7. Bean 就绪：
   - 可以正常使用

8. 容器关闭时：
   - @PreDestroy 注解的方法
   - DisposableBean.destroy()
   - 自定义 destroy-method

9. Bean 销毁

关键点：
- BeanPostProcessor 在初始化前后执行，AOP 代理在此创建
- 初始化有多种方式，按固定顺序执行
- 只有 singleton Bean 会经历完整的生命周期`
              },
              {
                question: 'Spring 如何解决循环依赖？',
                answer: `循环依赖是指 A 依赖 B，B 又依赖 A。

Spring 通过三级缓存解决单例 Bean 的循环依赖：

1. 一级缓存（singletonObjects）：
   - 存放完全初始化好的 Bean

2. 二级缓存（earlySingletonObjects）：
   - 存放早期暴露的 Bean（已实例化但未初始化）

3. 三级缓存（singletonFactories）：
   - 存放 ObjectFactory，用于创建早期引用

解决流程：
a. A 实例化后，将 ObjectFactory 放入三级缓存
b. A 填充属性时发现需要 B，去获取 B
c. B 实例化后，填充属性时发现需要 A
d. 从三级缓存获取 A 的 ObjectFactory，调用 getObject() 得到早期 A
e. 将早期 A 放入二级缓存，从三级缓存移除
f. B 完成初始化，放入一级缓存
g. A 继续初始化，从一级缓存获取 B
h. A 完成初始化，从二级缓存移到一级缓存

注意：
- 只能解决单例 Bean 的 setter 注入循环依赖
- 构造器注入的循环依赖无法解决
- prototype Bean 的循环依赖无法解决

解决方案：
1. 使用 @Lazy 延迟加载
2. 重构代码，消除循环依赖
3. 使用 Setter 注入代替构造器注入`
              },
              {
                question: '@Autowired 和 @Resource 的区别是什么？',
                answer: `主要区别：

1. 来源：
   - @Autowired：Spring 注解
   - @Resource：JSR-250 标准注解（javax.annotation）

2. 注入方式：
   - @Autowired：默认按类型注入
   - @Resource：默认按名称注入

3.  required 属性：
   - @Autowired：required=false 允许为 null
   - @Resource：没有 required 属性

4. 匹配优先级：
   - @Autowired：
     a. 按类型匹配
     b. 如果有多个，按 @Qualifier 或字段名匹配
   - @Resource：
     a. 按名称匹配（name 属性）
     b. 如果没有指定 name，按类型匹配

5. 适用场景：
   - @Autowired：Spring 项目首选
   - @Resource：需要兼容 JSR-250 标准时使用

示例：
@Autowired  // 按类型注入
private UserRepository userRepo;

@Resource(name = "userRepo")  // 按名称注入
private UserRepository userRepo;

最佳实践：
- Spring 项目统一使用 @Autowired
- 如果需要按名称注入，配合 @Qualifier 使用`
              },
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            对比分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            不同依赖注入方式的对比：
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">特性</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">构造器注入</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setter 注入</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">字段注入</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr><td className="px-4 py-3 font-medium text-sm">不可变性</td><td className="px-4 py-3 text-sm text-green-600">✅ 可设为 final</td><td className="px-4 py-3 text-sm text-red-600">❌</td><td className="px-4 py-3 text-sm text-red-600">❌</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">强制依赖</td><td className="px-4 py-3 text-sm text-green-600">✅ 明确</td><td className="px-4 py-3 text-sm text-red-600">❌ 不明显</td><td className="px-4 py-3 text-sm text-red-600">❌ 隐藏</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">可测试性</td><td className="px-4 py-3 text-sm text-green-600">✅ 容易</td><td className="px-4 py-3 text-sm text-green-600">✅ 容易</td><td className="px-4 py-3 text-sm text-red-600">❌ 困难</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">循环依赖</td><td className="px-4 py-3 text-sm text-red-600">❌ 无法解决</td><td className="px-4 py-3 text-sm text-green-600">✅ 可解决</td><td className="px-4 py-3 text-sm text-green-600">✅ 可解决</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">推荐程度</td><td className="px-4 py-3 text-sm text-green-600">⭐⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">⭐⭐⭐</td><td className="px-4 py-3 text-sm text-red-600">⭐</td></tr>
              </tbody>
            </table>
          </div>

          <section id="related" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
              关联知识
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                <h4 className="font-semibold text-sm mb-2">→ Spring AOP切面编程</h4>
                <p className="text-xs text-ink-muted">学习 AOP 如何在 Bean 生命周期中创建代理</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                <h4 className="font-semibold text-sm mb-2">→ Spring Boot自动化配置</h4>
                <p className="text-xs text-ink-muted">了解 Spring Boot 如何简化 IoC 配置</p>
              </div>
            </div>
          </section>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
