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
  { id: 'propagation', text: '事务传播机制', level: 3 },
  { id: 'isolation', text: '事务隔离级别', level: 3 },
  { id: 'rollback', text: '回滚规则', level: 3 },
  { id: 'failure-scenarios', text: '事务失效场景', level: 3 },
  { id: 'playground', text: '代码实验场', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比分析', level: 2 },
]

export default function SpringTransaction({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              <strong>Spring 事务管理</strong>是基于 AOP 实现的声明式事务机制，通过 <code className="font-mono text-sm">@Transactional</code> 
              注解或 XML 配置，将事务的开启、提交、回滚等操作从业务代码中解耦，
              支持<strong>7种传播行为</strong>和<strong>4种隔离级别</strong>，是保证数据一致性的核心工具。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么 Spring 事务如此重要？">
            事务是企业级应用的核心需求，手动管理事务（如 JDBC 的 commit/rollback）代码冗余且容易出错。
            Spring 通过 AOP 实现了声明式事务，开发者只需关注业务逻辑，事务管理由 Spring 自动处理，
            大大提升了开发效率和代码质量。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            整体架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 事务管理的核心是 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">PlatformTransactionManager</code> 
            接口，它提供了统一的事务管理抽象，支持不同的底层技术（JDBC、JPA、Hibernate 等）。
          </p>

          <DiagramBlock title="Spring 事务管理架构">
            {`
┌─────────────────────────────────────────────┐
│         @Transactional (声明式事务)          │
└──────────────────┬──────────────────────────┘
                   │ AOP 代理
                   ▼
┌─────────────────────────────────────────────┐
│   TransactionInterceptor (事务拦截器)        │
│   - 开启事务                                 │
│   - 执行业务方法                             │
│   - 提交/回滚事务                            │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│   PlatformTransactionManager (事务管理器)    │
│   - DataSourceTransactionManager (JDBC)     │
│   - JpaTransactionManager (JPA)             │
│   - HibernateTransactionManager             │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│         底层数据源 (DataSource)               │
│   - MySQL / PostgreSQL / Oracle             │
└─────────────────────────────────────────────┘
            `}
          </DiagramBlock>

          <SideNote>
            <p className="text-sm text-ink-muted">
              <strong>关键点：</strong>@Transactional 默认只对 <code className="font-mono text-xs">RuntimeException</code> 
              回滚，对检查型异常（Checked Exception）不回滚。可以通过 <code className="font-mono text-xs">rollbackFor</code> 
              属性自定义回滚规则。
            </p>
          </SideNote>

          <h2 id="core" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            核心原理
          </h2>

          <h3 id="propagation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            事务传播机制
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 定义了 <strong>7 种事务传播行为</strong>，决定了方法之间事务如何传播：
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-border border border-border rounded-paper-md">
              <thead className="bg-parchment-deep">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">传播行为</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">说明</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">使用场景</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                <tr><td className="px-4 py-3 font-mono text-sm">REQUIRED</td><td className="px-4 py-3 text-sm">如果当前有事务则加入，否则新建（默认）</td><td className="px-4 py-3 text-sm">大多数场景</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">REQUIRES_NEW</td><td className="px-4 py-3 text-sm">挂起当前事务，新建独立事务</td><td className="px-4 py-3 text-sm">日志记录、审计</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">SUPPORTS</td><td className="px-4 py-3 text-sm">如果有事务则加入，否则非事务执行</td><td className="px-4 py-3 text-sm">查询操作</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">NOT_SUPPORTED</td><td className="px-4 py-3 text-sm">挂起当前事务，非事务执行</td><td className="px-4 py-3 text-sm">批量操作</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">MANDATORY</td><td className="px-4 py-3 text-sm">必须在事务中执行，否则抛异常</td><td className="px-4 py-3 text-sm">强制事务场景</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">NEVER</td><td className="px-4 py-3 text-sm">不能在事务中执行，否则抛异常</td><td className="px-4 py-3 text-sm">特殊场景</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">NESTED</td><td className="px-4 py-3 text-sm">嵌套事务，保存点机制</td><td className="px-4 py-3 text-sm">部分回滚</td></tr>
              </tbody>
            </table>
          </div>

          <Playground
            code={`@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepo;
    
    @Autowired
    private InventoryService inventoryService;
    
    // REQUIRED（默认）：如果调用方有事务则加入，否则新建
    @Transactional
    public void createOrder(Order order) {
        orderRepo.save(order);
        // 调用其他服务，传播到同一事务
        inventoryService.deductStock(order.getProductId(), order.getQuantity());
    }
}

@Service
public class InventoryService {
    
    @Autowired
    private InventoryRepository inventoryRepo;
    
    // REQUIRES_NEW：无论调用方是否有事务，都新建独立事务
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void deductStock(Long productId, int quantity) {
        // 即使外层事务回滚，这里的库存扣减也会提交
        inventoryRepo.deductStock(productId, quantity);
    }
}`}
            language="java"
            description="事务传播机制示例"
          />

          <h3 id="isolation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            事务隔离级别
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 支持 <strong>4 种事务隔离级别</strong>，用于解决并发事务带来的问题（脏读、不可重复读、幻读）：
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-border border border-border rounded-paper-md">
              <thead className="bg-parchment-deep">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">隔离级别</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">脏读</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">不可重复读</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">幻读</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">性能</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                <tr><td className="px-4 py-3 font-mono text-sm">READ_UNCOMMITTED</td><td className="px-4 py-3 text-sm text-red-600">✅</td><td className="px-4 py-3 text-sm text-red-600">✅</td><td className="px-4 py-3 text-sm text-red-600">✅</td><td className="px-4 py-3 text-sm">⚡ 最快</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">READ_COMMITTED</td><td className="px-4 py-3 text-sm text-green-600">❌</td><td className="px-4 py-3 text-sm text-red-600">✅</td><td className="px-4 py-3 text-sm text-red-600">✅</td><td className="px-4 py-3 text-sm">⚡ 快</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">REPEATABLE_READ</td><td className="px-4 py-3 text-sm text-green-600">❌</td><td className="px-4 py-3 text-sm text-green-600">❌</td><td className="px-4 py-3 text-sm text-red-600">✅</td><td className="px-4 py-3 text-sm">🐢 中等</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">SERIALIZABLE</td><td className="px-4 py-3 text-sm text-green-600">❌</td><td className="px-4 py-3 text-sm text-green-600">❌</td><td className="px-4 py-3 text-sm text-green-600">❌</td><td className="px-4 py-3 text-sm">🐢 最慢</td></tr>
              </tbody>
            </table>
          </div>

          <Callout type="warning" title="⚠️ 隔离级别的选择">
            <p className="text-sm">
              大多数数据库（如 MySQL InnoDB）默认隔离级别是 <code className="font-mono text-xs">REPEATABLE_READ</code>，
              并通过 MVCC + Next-Key Lock 解决了幻读问题。一般情况下无需修改默认隔离级别，
              除非有特殊需求（如需要更高的并发性能）。
            </p>
          </Callout>

          <h3 id="rollback" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            回滚规则
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 事务的回滚规则非常重要，理解这些规则可以避免很多生产事故：
          </p>

          <Playground
            code={`@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepo;
    
    // ✅ 默认：只回滚 RuntimeException 及其子类
    @Transactional
    public void createUser(User user) throws Exception {
        userRepo.save(user);
        if (user.getName() == null) {
            throw new RuntimeException("用户名不能为空");  // 会回滚
        }
    }
    
    // ❌ 检查型异常不会回滚
    @Transactional
    public void updateUser(User user) throws IOException {
        userRepo.save(user);
        throw new IOException("IO错误");  // 不会回滚！
    }
    
    // ✅ 指定回滚所有异常
    @Transactional(rollbackFor = Exception.class)
    public void deleteUser(Long id) throws Exception {
        userRepo.deleteById(id);
        throw new Exception("删除失败");  // 会回滚
    }
    
    // ✅ 指定不回滚某些异常
    @Transactional(noRollbackFor = IllegalArgumentException.class)
    public void validateUser(User user) {
        userRepo.save(user);
        throw new IllegalArgumentException("参数错误");  // 不会回滚
    }
}`}
            language="java"
            description="事务回滚规则示例"
          />

          <h3 id="failure-scenarios" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            事务失效场景
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 事务在某些场景下会失效，这是面试和生产环境中的高频问题：
          </p>

          <Callout type="danger" title="失效场景 1：同类方法自调用">
            <p className="text-sm mb-2">
              ❌ 错误做法：
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm text-sm font-mono">
{`@Service
public class OrderService {
    public void createOrder() {
        // 直接调用，不经过代理，事务失效！
        this.saveOrder();
    }
    
    @Transactional
    public void saveOrder() {
        // 事务不会生效
    }
}`}
            </pre>
            <p className="text-sm mt-2">
              ✅ 解决方案：注入自身代理对象，或将方法移到另一个 Service
            </p>
          </Callout>

          <Callout type="danger" title="失效场景 2：方法不是 public">
            <p className="text-sm">
              @Transactional 只能应用于 <code className="font-mono text-xs">public</code> 方法。
              protected、private、default 修饰的方法事务不会生效。
            </p>
          </Callout>

          <Callout type="danger" title="失效场景 3：异常被捕获未抛出">
            <p className="text-sm mb-2">
              ❌ 错误做法：
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm text-sm font-mono">
{`@Transactional
public void createUser() {
    try {
        userRepo.save(user);
        throw new RuntimeException("错误");
    } catch (Exception e) {
        // 异常被捕获，事务不会回滚！
        log.error("错误", e);
    }
}`}
            </pre>
            <p className="text-sm mt-2">
              ✅ 解决方案：捕获后手动回滚 <code className="font-mono text-xs">TransactionAspectSupport.currentTransactionStatus().setRollbackOnly()</code>
            </p>
          </Callout>

          <Callout type="danger" title="失效场景 4：数据库引擎不支持事务">
            <p className="text-sm">
              MySQL 的 MyISAM 引擎不支持事务，必须使用 InnoDB 引擎。
              检查表引擎：<code className="font-mono text-xs">SHOW TABLE STATUS LIKE 'table_name'</code>
            </p>
          </Callout>

          <h2 id="playground" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            代码实验场
          </h2>
          <Playground
            code={`@Service
public class TransferService {
    
    @Autowired
    private AccountRepository accountRepo;
    
    /**
     * 转账操作：从账户A扣款，向账户B加款
     * 必须保证原子性：要么都成功，要么都失败
     */
    @Transactional(
        propagation = Propagation.REQUIRED,
        isolation = Isolation.READ_COMMITTED,
        rollbackFor = Exception.class,
        timeout = 30  // 超时时间30秒
    )
    public void transfer(Long fromAccountId, Long toAccountId, BigDecimal amount) {
        // 1. 检查余额
        Account fromAccount = accountRepo.findById(fromAccountId)
            .orElseThrow(() -> new RuntimeException("转出账户不存在"));
        
        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("余额不足");
        }
        
        // 2. 扣款
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        accountRepo.save(fromAccount);
        
        // 模拟网络延迟
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // 3. 加款
        Account toAccount = accountRepo.findById(toAccountId)
            .orElseThrow(() -> new RuntimeException("转入账户不存在"));
        toAccount.setBalance(toAccount.getBalance().add(amount));
        accountRepo.save(toAccount);
        
        System.out.println("转账成功：" + fromAccountId + " -> " + toAccountId + ", 金额：" + amount);
    }
}`}
            language="java"
            description="转账事务示例"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            常见误区
          </h2>

          <Callout type="danger" title="误区 1：认为 @Transactional 可以跨类传播">
            <p className="text-sm mb-2">
              ❌ 错误认知：A 类调用 B 类的方法，B 类的事务会独立生效
            </p>
            <p className="text-sm">
              ✅ 正确理解：事务传播是基于<strong>调用链</strong>的。如果 A 和 B 都在同一个事务上下文中，
              它们共享同一个事务。只有使用 <code className="font-mono text-xs">REQUIRES_NEW</code> 才会创建独立事务。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：认为事务越大越好">
            <p className="text-sm mb-2">
              ❌ 错误做法：在事务中执行耗时操作（HTTP 请求、文件 IO 等）
            </p>
            <p className="text-sm">
              ✅ 正确做法：事务应该<strong>尽量小</strong>，只包含必要的数据库操作。
              耗时操作应放在事务外，避免长时间持有数据库锁，影响并发性能。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：忽略事务超时设置">
            <p className="text-sm mb-2">
              ❌ 危险做法：不设置超时时间，事务可能无限期持有锁
            </p>
            <p className="text-sm">
              ✅ 正确做法：为长事务设置合理的超时时间，如 
              <code className="font-mono text-xs"> @Transactional(timeout = 30)</code>，
              防止死锁或长时间阻塞。
            </p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            面试真题
          </h2>
          <InterviewSection
            questions={[
              {
                question: '@Transactional 的工作原理是什么？',
                answer: `@Transactional 基于 Spring AOP 实现：

1. 代理机制：
   - Spring 在启动时扫描 @Transactional 注解
   - 为目标 Bean 创建代理对象（JDK 动态代理或 CGLIB）
   - 代理对象包裹了 TransactionInterceptor

2. 执行流程：
   a. 调用目标方法前，TransactionInterceptor 拦截
   b. 根据传播行为决定是新建事务还是加入现有事务
   c. 获取数据库连接，设置自动提交为 false
   d. 执行业务方法
   e. 如果正常结束，提交事务；如果抛出异常，回滚事务
   f. 释放数据库连接

3. 关键点：
   - 只有通过代理调用的方法，事务才生效
   - 同类方法自调用不会经过代理，事务失效
   - 默认只对 RuntimeException 回滚`
              },
              {
                question: 'Spring 事务的传播机制有哪些？分别适用于什么场景？',
                answer: `Spring 定义了 7 种传播行为：

1. REQUIRED（默认）：
   - 如果当前有事务则加入，否则新建
   - 适用：大多数场景，保证操作的原子性

2. REQUIRES_NEW：
   - 挂起当前事务，新建独立事务
   - 适用：日志记录、审计等需要独立提交的场景

3. SUPPORTS：
   - 如果有事务则加入，否则非事务执行
   - 适用：查询操作，不影响性能

4. NOT_SUPPORTED：
   - 挂起当前事务，非事务执行
   - 适用：批量操作、报表生成等不需要事务的场景

5. MANDATORY：
   - 必须在事务中执行，否则抛异常
   - 适用：强制要求事务的场景

6. NEVER：
   - 不能在事务中执行，否则抛异常
   - 适用：特殊场景

7. NESTED：
   - 嵌套事务，使用保存点机制
   - 适用：需要部分回滚的场景

最常用的：REQUIRED（90%场景）、REQUIRES_NEW（日志/审计）`
              },
              {
                question: 'Spring 事务在哪些场景下会失效？',
                answer: `常见的事务失效场景：

1. 同类方法自调用：
   - 原因：直接调用 this.method() 不经过代理
   - 解决：注入自身代理对象，或拆分到不同 Service

2. 方法不是 public：
   - 原因：Spring AOP 只能代理 public 方法
   - 解决：改为 public

3. 异常被捕获未抛出：
   - 原因：事务拦截器无法感知异常
   - 解决：捕获后手动回滚或重新抛出

4. 数据库引擎不支持事务：
   - 原因：MyISAM 不支持事务
   - 解决：使用 InnoDB 引擎

5. 未被 Spring 管理：
   - 原因：Bean 不是 Spring 容器管理的
   - 解决：确保类上有 @Service/@Component 等注解

6. 多线程调用：
   - 原因：每个线程有独立的数据库连接
   - 解决：使用编程式事务或确保在同一线程

7. 方法内部捕获异常并返回：
   - 原因：没有异常抛出，事务认为执行成功
   - 解决：手动设置回滚标志`
              },
              {
                question: 'REQUIRED 和 REQUIRES_NEW 的区别是什么？',
                answer: `核心区别：

1. 事务独立性：
   - REQUIRED：加入现有事务，与调用方共享同一事务
   - REQUIRES_NEW：挂起现有事务，创建全新的独立事务

2. 回滚影响：
   - REQUIRED：内层方法异常会导致整个事务回滚
   - REQUIRES_NEW：内层事务独立提交/回滚，不影响外层

3. 锁持有时间：
   - REQUIRED：锁在整个调用链执行期间持有
   - REQUIRES_NEW：内层事务完成后立即释放锁

4. 使用场景：
   - REQUIRED：订单创建（订单+库存+积分需原子性）
   - REQUIRES_NEW：日志记录（即使主业务失败，日志也要保存）

示例：
@Transactional  // REQUIRED
public void createOrder() {
    saveOrder();       // 加入同一事务
    saveLog();         // REQUIRES_NEW，独立事务，即使订单回滚，日志也提交
}

@Transactional(propagation = REQUIRES_NEW)
public void saveLog() {
    // 独立事务
}`
              },
              {
                question: '如何保证分布式系统中的事务一致性？',
                answer: `分布式事务的解决方案：

1. 两阶段提交（2PC）：
   - 准备阶段：协调者询问参与者是否可以提交
   - 提交阶段：协调者通知所有参与者提交或回滚
   - 缺点：阻塞、单点故障、性能差

2. TCC（Try-Confirm-Cancel）：
   - Try：预留资源
   - Confirm：确认执行
   - Cancel：取消预留
   - 优点：性能好；缺点：业务侵入性强

3. 可靠消息最终一致性：
   - 本地事务 + 消息队列
   - 发送消息后，消费者重试直到成功
   - 优点：解耦、性能好；缺点：延迟

4. Saga 模式：
   - 长事务拆分为多个短事务
   - 每个步骤有对应的补偿操作
   - 优点：适合长事务；缺点：补偿逻辑复杂

5. Seata 框架：
   - 阿里开源的分布式事务解决方案
   - 支持 AT、TCC、Saga、XA 多种模式
   - 推荐：微服务架构首选

选择原则：
- 强一致性：2PC、XA
- 最终一致性：可靠消息、TCC、Saga
- 性能优先：可靠消息、TCC
- 易用性：Seata`
              },
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            对比分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            声明式事务 vs 编程式事务的对比：
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-border border border-border rounded-paper-md">
              <thead className="bg-parchment-deep">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">特性</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">声明式事务</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">编程式事务</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                <tr><td className="px-4 py-3 font-medium text-sm">使用方式</td><td className="px-4 py-3 text-sm">@Transactional 注解</td><td className="px-4 py-3 text-sm">TransactionTemplate</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">代码侵入性</td><td className="px-4 py-3 text-sm text-green-600">低</td><td className="px-4 py-3 text-sm text-red-600">高</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">灵活性</td><td className="px-4 py-3 text-sm text-red-600">低</td><td className="px-4 py-3 text-sm text-green-600">高</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">适用场景</td><td className="px-4 py-3 text-sm">大多数场景</td><td className="px-4 py-3 text-sm">细粒度控制</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">维护成本</td><td className="px-4 py-3 text-sm text-green-600">低</td><td className="px-4 py-3 text-sm text-red-600">高</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">推荐程度</td><td className="px-4 py-3 text-sm text-green-600">⭐⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">⭐⭐⭐</td></tr>
              </tbody>
            </table>
          </div>

          <section id="related" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
              关联知识
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-paper-md hover:border-accent transition-colors">
                <h4 className="font-semibold text-sm mb-2">→ Spring AOP切面编程</h4>
                <p className="text-xs text-ink-muted">理解事务的底层实现原理</p>
              </div>
              <div className="p-4 border border-border rounded-paper-md hover:border-accent transition-colors">
                <h4 className="font-semibold text-sm mb-2">→ 分布式事务</h4>
                <p className="text-xs text-ink-muted">学习微服务架构下的事务解决方案</p>
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
