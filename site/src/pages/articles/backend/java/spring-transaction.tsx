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
  { id: 'core-concept', text: '一、核心概念', level: 2 },
  { id: 'propagation', text: '二、事务传播机制（重点🔥）', level: 2 },
  { id: 'isolation', text: '三、事务隔离级别', level: 2 },
  { id: 'implementation', text: '四、实现原理：AOP + 动态代理', level: 2 },
  { id: 'source-code', text: '五、源码分析', level: 2 },
  { id: 'failure-scenarios', text: '六、事务失效场景（高频误区）', level: 2 },
  { id: 'best-practices', text: '七、最佳实践', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function SpringTransaction({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Spring 事务管理是基于<strong className="text-accent">声明式 AOP</strong>的数据库操作封装，通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">@Transactional</code> 注解自动管理事务的开启、提交和回滚，
              保证数据操作的原子性、一致性、隔离性和持久性（ACID）。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 Spring 事务？">
            手动管理事务需要编写大量样板代码（try-catch-finally），容易遗漏回滚逻辑。Spring 通过 AOP 将事务管理从业务代码中解耦，开发者只需关注业务逻辑，事务控制由框架自动处理。
          </Callout>

          <h2 id="core-concept" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、核心概念
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 事务管理的核心是 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">PlatformTransactionManager</code> 接口，它定义了事务的基本操作：
          </p>

          <Playground
            code={`// PlatformTransactionManager 接口
public interface PlatformTransactionManager {
    // 获取事务状态
    TransactionStatus getTransaction(TransactionDefinition definition) 
        throws TransactionException;
    
    // 提交事务
    void commit(TransactionStatus status) throws TransactionException;
    
    // 回滚事务
    void rollback(TransactionStatus status) throws TransactionException;
}

// 常用实现类
DataSourceTransactionManager  // JDBC 事务
JpaTransactionManager         // JPA 事务
HibernateTransactionManager   // Hibernate 事务`}
            language="java"
            highlights={[2, 6, 10, 14, 15, 16]}
            filename="PlatformTransactionManager.java"
            description="Spring 事务管理器接口"
          />

          <DiagramBlock title="Spring 事务工作流程">
            {`\`\`\`mermaid
graph TD
    A[调用 @Transactional 方法] --> B[AOP 拦截器捕获]
    B --> C{检查是否已有事务?}
    C -->|有| D[根据传播机制处理]
    C -->|无| E[创建新事务]
    D --> F[执行业务逻辑]
    E --> F
    F --> G{是否异常?}
    G -->|是| H[回滚事务]
    G -->|否| I[提交事务]
    H --> J[抛出异常]
    I --> K[返回结果]
\`\`\``}
          </DiagramBlock>

          <SideNote label="编程式 vs 声明式">
            <strong>编程式事务</strong>：通过 <code>TransactionTemplate</code> 或 <code>PlatformTransactionManager</code> 手动控制，灵活性高但代码侵入性强。<br/><br/>
            <strong>声明式事务</strong>：通过 <code>@Transactional</code> 注解配置，基于 AOP 实现，代码简洁，推荐使用。
          </SideNote>

          <h2 id="propagation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、事务传播机制（重点🔥）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            事务传播机制定义了<strong className="text-accent">多个事务方法相互调用时</strong>，事务应该如何传播。Spring 提供了 7 种传播行为：
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">传播行为</th>
                <th className="text-left p-3 font-semibold text-ink">说明</th>
                <th className="text-left p-3 font-semibold text-ink">使用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">REQUIRED</td>
                <td className="p-3">如果当前有事务则加入，否则新建事务（默认）</td>
                <td className="p-3">大多数场景</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">REQUIRES_NEW</td>
                <td className="p-3">挂起当前事务，创建新事务</td>
                <td className="p-3">日志记录、独立业务</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">SUPPORTS</td>
                <td className="p-3">支持当前事务，没有则以非事务方式执行</td>
                <td className="p-3">查询操作</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">NOT_SUPPORTED</td>
                <td className="p-3">以非事务方式执行，如果当前有事务则挂起</td>
                <td className="p-3">批量处理</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">MANDATORY</td>
                <td className="p-3">必须在事务中执行，否则抛异常</td>
                <td className="p-3">强制事务约束</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">NEVER</td>
                <td className="p-3">以非事务方式执行，如果当前有事务则抛异常</td>
                <td className="p-3">禁止事务场景</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">NESTED</td>
                <td className="p-3">嵌套事务，保存点机制</td>
                <td className="p-3">部分回滚</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepo;
    
    @Autowired
    private InventoryService inventoryService;
    
    // 场景1：REQUIRED（默认）- 加入现有事务或创建新事务
    @Transactional(propagation = Propagation.REQUIRED)
    public void createOrder(Order order) {
        orderRepo.save(order);
        // 调用另一个事务方法
        inventoryService.deductStock(order.getProductId(), order.getQuantity());
        // 如果 deductStock 异常，整个事务回滚
    }
    
    // 场景2：REQUIRES_NEW - 总是创建新事务，独立提交/回滚
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveOrderLog(String log) {
        // 即使外层事务回滚，日志也会提交
        orderLogRepo.save(new OrderLog(log));
    }
    
    // 场景3：NESTED - 嵌套事务，可以部分回滚
    @Transactional(propagation = Propagation.NESTED)
    public void processSubTask(SubTask task) {
        // 如果此方法异常，只回滚到保存点，不影响外层事务
        subTaskRepo.save(task);
    }
}`}
            language="java"
            highlights={[11, 18, 27, 34]}
            filename="PropagationExample.java"
            description="事务传播机制示例"
          />

          <Callout type="warning" title="REQUIRED vs REQUIRES_NEW 的区别">
            <strong>REQUIRED</strong>：内层方法加入外层事务，任一方异常都会导致整个事务回滚。<br/>
            <strong>REQUIRES_NEW</strong>：内层方法创建独立事务，外层回滚不影响内层提交（常用于日志记录）。
          </Callout>

          <h2 id="isolation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、事务隔离级别
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            事务隔离级别定义了<strong className="text-accent">多个事务并发执行时</strong>的数据可见性规则，用于解决脏读、不可重复读和幻读问题。
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">隔离级别</th>
                <th className="text-left p-3 font-semibold text-ink">脏读</th>
                <th className="text-left p-3 font-semibold text-ink">不可重复读</th>
                <th className="text-left p-3 font-semibold text-ink">幻读</th>
                <th className="text-left p-3 font-semibold text-ink">性能</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">READ_UNCOMMITTED</td>
                <td className="p-3 text-rose">❌</td>
                <td className="p-3 text-rose">❌</td>
                <td className="p-3 text-rose">❌</td>
                <td className="p-3 text-green">最高</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">READ_COMMITTED</td>
                <td className="p-3 text-green">✅</td>
                <td className="p-3 text-rose">❌</td>
                <td className="p-3 text-rose">❌</td>
                <td className="p-3 text-green">高</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent bg-yellow-100">REPEATABLE_READ</td>
                <td className="p-3 text-green">✅</td>
                <td className="p-3 text-green">✅</td>
                <td className="p-3 text-rose">❌</td>
                <td className="p-3 text-yellow">中</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">SERIALIZABLE</td>
                <td className="p-3 text-green">✅</td>
                <td className="p-3 text-green">✅</td>
                <td className="p-3 text-green">✅</td>
                <td className="p-3 text-rose">最低</td>
              </tr>
            </tbody>
          </table>

          <SideNote label="MySQL 默认隔离级别">
            MySQL InnoDB 引擎默认使用 <code>REPEATABLE_READ</code>，并通过 <strong>MVCC（多版本并发控制）</strong>和 <strong>Next-Key Lock</strong> 解决了大部分幻读问题。Oracle 默认使用 <code>READ_COMMITTED</code>。
          </SideNote>

          <Playground
            code={`@Service
public class AccountService {
    
    @Autowired
    private AccountRepository accountRepo;
    
    // 设置隔离级别为 READ_COMMITTED
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void transfer(Long fromId, Long toId, BigDecimal amount) {
        Account from = accountRepo.findById(fromId).orElseThrow();
        Account to = accountRepo.findById(toId).orElseThrow();
        
        from.setBalance(from.getBalance().subtract(amount));
        to.setBalance(to.getBalance().add(amount));
        
        accountRepo.save(from);
        accountRepo.save(to);
    }
    
    // 设置超时时间和只读优化
    @Transactional(timeout = 5, readOnly = true)
    public Account getAccount(Long id) {
        return accountRepo.findById(id).orElseThrow();
    }
}`}
            language="java"
            highlights={[8, 21]}
            filename="IsolationExample.java"
            description="事务隔离级别配置"
          />

          <h2 id="implementation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、实现原理：AOP + 动态代理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 事务基于 <strong className="text-accent">AOP（面向切面编程）</strong>实现，通过动态代理在目标方法前后插入事务管理逻辑。
          </p>

          <DiagramBlock title="AOP 事务代理流程">
            {`\`\`\`mermaid
graph LR
    A[客户端调用] --> B[代理对象]
    B --> C[before: 开启事务]
    C --> D[目标方法执行]
    D --> E{是否异常?}
    E -->|是| F[afterThrowing: 回滚]
    E -->|否| G[afterReturning: 提交]
    F --> H[抛出异常]
    G --> I[返回结果]
\`\`\``}
          </DiagramBlock>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 会根据目标类是否实现接口选择代理方式：
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">代理方式</th>
                <th className="text-left p-3 font-semibold text-ink">条件</th>
                <th className="text-left p-3 font-semibold text-ink">特点</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">JDK 动态代理</td>
                <td className="p-3">目标类实现了接口</td>
                <td className="p-3">基于反射，只能代理接口方法</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">CGLIB 代理</td>
                <td className="p-3">目标类未实现接口</td>
                <td className="p-3">基于字节码生成，可代理类方法</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="Spring Boot 2.x 变化">
            Spring Boot 2.x 默认使用 <strong>CGLIB 代理</strong>（<code>spring.aop.proxy-target-class=true</code>），即使类实现了接口也使用 CGLIB，避免类型转换问题。
          </Callout>

          <h2 id="source-code" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、源码分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            核心入口是 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">TransactionInterceptor</code>，它是 AOP 的方法拦截器：
          </p>

          <Playground
            code={`// TransactionInterceptor 核心逻辑
public class TransactionInterceptor implements MethodInterceptor {
    
    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        // 1. 获取目标类和方法
        Class<?> targetClass = invocation.getThis().getClass();
        Method method = invocation.getMethod();
        
        // 2. 获取事务属性（@Transactional 配置）
        TransactionAttribute txAttr = getTransactionAttributeSource()
            .getTransactionAttribute(method, targetClass);
        
        // 3. 获取事务管理器
        PlatformTransactionManager tm = determineTransactionManager(txAttr);
        
        // 4. 创建事务（根据传播机制）
        TransactionInfo txInfo = createTransactionIfNecessary(tm, txAttr, method);
        
        Object result = null;
        try {
            // 5. 执行目标方法
            result = invocation.proceed();
        } catch (Throwable ex) {
            // 6. 异常时回滚
            completeTransactionAfterThrowing(txInfo, ex);
            throw ex;
        } finally {
            // 7. 清理事务信息
            cleanupTransactionInfo(txInfo);
        }
        
        // 8. 提交事务
        commitTransactionAfterReturning(txInfo);
        return result;
    }
}`}
            language="java"
            highlights={[12, 16, 20, 24, 28, 32, 36]}
            filename="TransactionInterceptor.java"
            description="事务拦截器核心逻辑"
          />

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>关键步骤解析：</strong>
          </p>
          <ol className="list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-6 space-y-2">
            <li><code>getTransactionAttribute</code>：解析 <code>@Transactional</code> 注解，提取传播机制、隔离级别等配置</li>
            <li><code>createTransactionIfNecessary</code>：根据传播机制决定是否创建新事务（核心逻辑在 <code>AbstractPlatformTransactionManager</code>）</li>
            <li><code>invocation.proceed()</code>：执行目标方法（业务逻辑）</li>
            <li><code>completeTransactionAfterThrowing</code>：判断异常类型是否触发回滚（默认 RuntimeException）</li>
            <li><code>commitTransactionAfterReturning</code>：提交事务，清理资源</li>
          </ol>

          <SideNote label="事务同步管理器">
            <code>TransactionSynchronizationManager</code> 使用 <code>ThreadLocal</code> 存储事务上下文，保证同一线程内的数据库操作共享同一个事务。这也是为什么事务不能跨线程传播的原因。
          </SideNote>

          <h2 id="failure-scenarios" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、事务失效场景（高频误区）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            以下是 <strong className="text-rose">最常见的 6 种事务失效场景</strong>，面试和实战中都经常遇到：
          </p>

          <Callout type="danger" title="场景1：同类内部方法调用">
            <pre className="mt-2 text-[12px] sm:text-[13px] overflow-x-auto">
{`@Service
public class UserService {
    
    @Transactional
    public void createUser(User user) {
        // ❌ 直接调用，绕过代理，事务失效！
        saveUserLog(user);
    }
    
    @Transactional
    public void saveUserLog(User user) {
        // 日志保存逻辑
    }
}`}
            </pre>
            <p className="mt-2"><strong>原因</strong>：同类内部调用使用的是 <code>this</code>，不经过代理对象，AOP 无法拦截。</p>
            <p className="mt-2"><strong>解决方案</strong>：① 注入自身代理对象；② 提取到另一个 Service；③ 使用 <code>AopContext.currentProxy()</code></p>
          </Callout>

          <Callout type="danger" title="场景2：方法不是 public">
            <pre className="mt-2 text-[12px] sm:text-[13px] overflow-x-auto">
{`@Service
public class UserService {
    
    // ❌ private/protected/default 方法，事务失效！
    @Transactional
    private void createUser(User user) {
        // ...
    }
}`}
            </pre>
            <p className="mt-2"><strong>原因</strong>：Spring 默认只代理 public 方法。</p>
            <p className="mt-2"><strong>解决方案</strong>：将方法改为 public。</p>
          </Callout>

          <Callout type="danger" title="场景3：异常被捕获未抛出">
            <pre className="mt-2 text-[12px] sm:text-[13px] overflow-x-auto">
{`@Service
public class UserService {
    
    @Transactional
    public void createUser(User user) {
        try {
            userRepository.save(user);
            // 模拟异常
            int i = 1 / 0;
        } catch (Exception e) {
            // ❌ 捕获异常但未抛出，事务不会回滚！
            log.error("错误", e);
        }
    }
}`}
            </pre>
            <p className="mt-2"><strong>原因</strong>：AOP 拦截器捕获不到异常，认为方法正常执行。</p>
            <p className="mt-2"><strong>解决方案</strong>：catch 块中手动回滚 <code>TransactionAspectSupport.currentTransactionStatus().setRollbackOnly()</code>，或重新抛出异常。</p>
          </Callout>

          <Callout type="danger" title="场景4：异常类型不匹配">
            <pre className="mt-2 text-[12px] sm:text-[13px] overflow-x-auto">
{`@Service
public class UserService {
    
    // ❌ 默认只回滚 RuntimeException，Checked Exception 不回滚！
    @Transactional
    public void createUser(User user) throws Exception {
        userRepository.save(user);
        throw new Exception("检查型异常");
    }
    
    // ✅ 指定回滚所有异常
    @Transactional(rollbackFor = Exception.class)
    public void createUser2(User user) throws Exception {
        userRepository.save(user);
        throw new Exception("检查型异常");
    }
}`}
            </pre>
            <p className="mt-2"><strong>原因</strong>：Spring 默认只回滚 <code>RuntimeException</code> 和 <code>Error</code>。</p>
            <p className="mt-2"><strong>解决方案</strong>：使用 <code>@Transactional(rollbackFor = Exception.class)</code>。</p>
          </Callout>

          <Callout type="danger" title="场景5：数据库引擎不支持事务">
            <p>MySQL MyISAM 引擎不支持事务，必须使用 InnoDB 引擎。</p>
          </Callout>

          <Callout type="danger" title="场景6：方法被 final/static 修饰">
            <p>CGLIB 代理无法代理 final 或 static 方法，导致事务失效。</p>
          </Callout>

          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、最佳实践
          </h2>

          <ol className="list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-6 space-y-3">
            <li>
              <strong>事务粒度要小</strong>：只在必要的方法上加 <code>@Transactional</code>，避免大事务占用连接过久。
            </li>
            <li>
              <strong>明确指定 rollbackFor</strong>：始终使用 <code>@Transactional(rollbackFor = Exception.class)</code>，避免遗漏 Checked Exception。
            </li>
            <li>
              <strong>避免事务中 RPC 调用</strong>：HTTP/RPC 调用耗时长，会导致事务持有数据库连接过久，影响并发性能。
            </li>
            <li>
              <strong>读写分离优化</strong>：查询方法使用 <code>@Transactional(readOnly = true)</code>，提升性能。
            </li>
            <li>
              <strong>注意传播机制</strong>：日志记录等独立业务使用 <code>REQUIRES_NEW</code>，避免外层回滚影响。
            </li>
            <li>
              <strong>超时时间设置</strong>：长事务设置 <code>timeout</code> 防止死锁或长时间占用资源。
            </li>
          </ol>

          <Playground
            code={`@Service
public class BestPracticeService {
    
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private LogService logService;
    
    // ✅ 最佳实践示例
    @Transactional(
        propagation = Propagation.REQUIRED,
        isolation = Isolation.READ_COMMITTED,
        rollbackFor = Exception.class,
        timeout = 10,
        readOnly = false
    )
    public User createUser(UserDTO dto) {
        // 1. 参数校验（在事务外完成更好）
        validateUser(dto);
        
        // 2. 业务逻辑
        User user = convertToEntity(dto);
        userRepo.save(user);
        
        // 3. 独立日志（不受主事务影响）
        logService.saveLog("用户创建: " + user.getId());
        
        return user;
    }
    
    // ✅ 查询优化
    @Transactional(readOnly = true)
    public User getUser(Long id) {
        return userRepo.findById(id).orElseThrow();
    }
}`}
            language="java"
            highlights={[11, 18, 34]}
            filename="BestPractice.java"
            description="事务最佳实践示例"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
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
                <td className="p-3"><code>@Transactional</code> 可以加在任何方法上</td>
                <td className="p-3">必须是 public 方法，且通过代理调用</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">事务可以跨线程传播</td>
                <td className="p-3">事务基于 ThreadLocal，不能跨线程</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3"><code>@Transactional</code> 会回滚所有异常</td>
                <td className="p-3">默认只回滚 RuntimeException，需显式配置 rollbackFor</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">事务越大越安全</td>
                <td className="p-3">大事务会降低并发性能，应缩小事务粒度</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">REQUIRES_NEW 一定创建新事务</td>
                <td className="p-3">如果底层数据库不支持嵌套事务，可能退化</td>
              </tr>
            </tbody>
          </table>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'Spring 事务的传播机制有哪些？REQUIRED 和 REQUIRES_NEW 的区别？',
                answer: 'Spring 有 7 种传播机制：REQUIRED、REQUIRES_NEW、SUPPORTS、NOT_SUPPORTED、MANDATORY、NEVER、NESTED。\n\nREQUIRED（默认）：如果当前有事务则加入，否则创建新事务。内层方法异常会导致整个事务回滚。\n\nREQUIRES_NEW：无论当前是否有事务，都创建新事务。内层事务独立提交/回滚，外层回滚不影响内层。常用于日志记录等独立业务。'
              },
              {
                question: 'Spring 事务的隔离级别有哪些？MySQL 默认是什么？',
                answer: 'Spring 支持 4 种隔离级别：\n1. READ_UNCOMMITTED：读未提交，存在脏读、不可重复读、幻读\n2. READ_COMMITTED：读已提交，解决脏读（Oracle 默认）\n3. REPEATABLE_READ：可重复读，解决脏读和不可重复读（MySQL 默认）\n4. SERIALIZABLE：串行化，解决所有并发问题，性能最低\n\nMySQL InnoDB 通过 MVCC 和 Next-Key Lock 在 REPEATABLE_READ 级别下解决了大部分幻读问题。'
              },
              {
                question: 'Spring 事务失效的场景有哪些？',
                answer: '常见失效场景：\n1. 同类内部方法调用（this 调用绕过代理）\n2. 方法不是 public\n3. 异常被捕获未抛出\n4. 异常类型不匹配（默认不回滚 Checked Exception）\n5. 数据库引擎不支持事务（如 MyISAM）\n6. 方法被 final/static 修饰（CGLIB 无法代理）\n\n解决方案：提取到其他 Service、改为 public、手动回滚、配置 rollbackFor、使用 InnoDB、避免 final/static。'
              },
              {
                question: 'Spring 事务的实现原理是什么？',
                answer: 'Spring 事务基于 AOP 和动态代理实现：\n1. 通过 TransactionInterceptor 拦截 @Transactional 方法\n2. 根据目标类是否实现接口选择 JDK 动态代理或 CGLIB 代理\n3. 在方法执行前开启事务，执行后根据是否异常决定提交或回滚\n4. 使用 TransactionSynchronizationManager（ThreadLocal）管理事务上下文\n\n核心类：PlatformTransactionManager、TransactionInterceptor、AbstractPlatformTransactionManager。'
              },
              {
                question: '什么是嵌套事务（NESTED）？和 REQUIRES_NEW 有什么区别？',
                answer: 'NESTED 使用数据库的保存点（Savepoint）机制实现嵌套事务：\n- 外层事务回滚，内层也回滚\n- 内层事务回滚，只回滚到保存点，不影响外层\n- 依赖数据库支持（MySQL InnoDB 支持）\n\nREQUIRES_NEW 是完全独立的新事务：\n- 内外层事务完全独立，互不影响\n- 不依赖数据库保存点，兼容性更好\n- 性能开销更大（需要挂起外层事务）'
              },
              {
                question: '@Transactional 加在类上和方法上有什么区别？',
                answer: '加在类上：该类所有 public 方法都应用相同的事务配置。\n\n加在方法上：只有该方法应用事务配置，优先级高于类级别。\n\n最佳实践：优先在方法级别配置，更精确控制。如果类中大部分方法事务配置相同，可以在类级别配置默认值，个别方法覆盖。'
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <a href="/docs/06-spring-framework/spring-aop" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">前置知识 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Spring AOP</div>
              <div className="text-[12px] text-ink-muted mt-1">事务实现的底层技术</div>
            </a>
            <a href="/docs/07-database/sql-optimization" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">SQL 优化与索引</div>
              <div className="text-[12px] text-ink-muted mt-1">事务与索引配合优化性能</div>
            </a>
            <a href="/docs/08-microservices/distributed-transaction" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">进阶知识 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">分布式事务</div>
              <div className="text-[12px] text-ink-muted mt-1">跨服务事务解决方案</div>
            </a>
            <a href="/docs/03-multithreading/multi-threading-basics" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">相关概念 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">多线程基础</div>
              <div className="text-[12px] text-ink-muted mt-1">事务与并发控制</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            Spring 事务是面试高频考点，建议重点掌握：① 7 种传播机制的使用场景；② 4 种隔离级别解决的问题；③ 6 种事务失效场景及解决方案；④ AOP 实现原理。可以通过阅读 Spring 源码加深理解，重点关注 TransactionInterceptor 和 AbstractPlatformTransactionManager。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
