import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'architecture', text: '一、Hibernate架构', level: 2 },
  { id: 'session', text: '二、Session核心概念', level: 2 },
  { id: 'entity-lifecycle', text: '三、实体生命周期', level: 2 },
  { id: 'caching', text: '四、缓存机制', level: 2 },
  { id: 'lazy-loading', text: '五、延迟加载原理', level: 2 },
  { id: 'hql', text: '六、HQL查询语言', level: 2 },
  { id: 'transaction', text: '七、事务管理', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function Hibernate({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Hibernate是Java平台的<strong className="text-accent">对象关系映射（ORM）框架</strong>，通过注解或XML配置将Java对象自动映射到数据库表，提供透明的持久化能力，屏蔽JDBC底层细节，支持一级/二级缓存、延迟加载和复杂查询，大幅提升开发效率。
            </p>
          </blockquote>

          <Callout type="tip" title="ORM的核心价值">
            ORM解决了"对象-关系阻抗失配"问题：面向对象的语言使用对象模型，而关系型数据库使用表格模型。Hibernate在两者之间建立映射桥梁，让开发者用面向对象的方式操作数据库。
          </Callout>

          <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            一、Hibernate架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Hibernate采用分层架构设计，核心组件包括SessionFactory、Session、Transaction和Query，形成了完整的持久化层解决方案。
          </p>

          <DiagramBlock title="Hibernate架构图">
            {`graph TD
              APP["Application Layer<br/>Business Logic / Service"] --> |使用 Session API| HC["Hibernate Core"]
              HC --> SESSION["Session<br/>Unit of Work"]
              HC --> TXM["Transaction<br/>Management"]
              SESSION --> SF["SessionFactory<br/>Connection Pool + Config"]
              SF --> |JDBC API| DB["Database<br/>MySQL / PostgreSQL / Oracle"]
            `}
          </DiagramBlock>

          <SideNote label="SessionFactory vs Session">
            <strong>SessionFactory</strong>：创建成本高，应全局唯一，线程安全<br/>
            <strong>Session</strong>：创建成本低，每次请求创建新实例，非线程安全<br/>
            典型模式：一个SessionFactory对应一个数据库，每个HTTP请求创建一个Session
          </SideNote>

          <h2 id="session" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            二、Session核心概念
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Session是Hibernate的核心接口，代表应用程序与数据库之间的单次会话，负责实体的CRUD操作和状态管理。
          </p>

          <Playground
            code={`import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.Transaction;

public class SessionExample {
    private static SessionFactory sessionFactory;
    
    static {
        // 创建SessionFactory（应用启动时执行一次）
        sessionFactory = new Configuration()
            .configure("hibernate.cfg.xml")
            .addAnnotatedClass(User.class)
            .buildSessionFactory();
    }
    
    public static void main(String[] args) {
        // 获取Session（每次请求创建新实例）
        Session session = sessionFactory.openSession();
        Transaction transaction = null;
        
        try {
            transaction = session.beginTransaction();
            
            // 1. 保存实体
            User user = new User();
            user.setName("张三");
            user.setEmail("zhangsan@example.com");
            session.save(user);
            
            // 2. 查询实体
            User loadedUser = session.get(User.class, user.getId());
            System.out.println("Name: " + loadedUser.getName());
            
            // 3. 更新实体
            loadedUser.setEmail("newemail@example.com");
            session.update(loadedUser);
            
            // 4. 删除实体
            session.delete(loadedUser);
            
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close(); // 关闭Session
        }
    }
}`}
            language="java"
            highlights={[10, 11, 12, 13, 18, 22, 27, 32, 36, 40, 44, 48]}
            filename="SessionExample.java"
            description="Session基本操作示例"
          />

          <Callout type="warning" title="Session线程安全问题">
            Session不是线程安全的，不能在多线程间共享。每个线程（或HTTP请求）应创建独立的Session实例，使用完毕后立即关闭。推荐模式：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">try-finally</code> 确保关闭。
          </Callout>

          <h2 id="entity-lifecycle" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            三、实体生命周期
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Hibernate实体有四种状态，理解状态转换对正确使用ORM至关重要：
          </p>

          <DiagramBlock title="实体状态转换图">
            {`graph TD
              TRANS["Transient 瞬时态<br/>new创建,未与Session关联"] --> |save/persist| PERS["Persistent 持久态<br/>与Session关联,修改自动同步DB"]
              PERS --> |evict/close| DETACH["Detached 游离态<br/>Session已关闭,修改不同步"]
              DETACH --> |merge| PERS
              PERS --> |flush| DB["Database 数据库"]
              PERS --> |delete| REMOVED["Removed 已删除"]
            `}
          </DiagramBlock>

          <Playground
            code={`// 实体状态演示
public class EntityLifecycleDemo {
    public static void main(String[] args) {
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        
        // 1. Transient（瞬时态）：刚创建的对象
        User user = new User();
        user.setName("李四");
        System.out.println(session.contains(user)); // false
        
        // 2. Persistent（持久态）：调用save后
        session.save(user);
        System.out.println(session.contains(user)); // true
        user.setName("李四修改"); // 修改会自动同步到DB
        
        tx.commit();
        session.close();
        
        // 3. Detached（游离态）：Session关闭后
        System.out.println(user.getName()); // 仍可访问
        user.setName("再次修改"); // 但修改不会同步到DB
        
        // 4. 重新关联到新的Session
        Session newSession = sessionFactory.openSession();
        Transaction newTx = newSession.beginTransaction();
        
        // 方法1：update（要求DB中必须存在该记录）
        // newSession.update(user);
        
        // 方法2：merge（更灵活，返回新的持久态对象）
        User mergedUser = newSession.merge(user);
        System.out.println(newSession.contains(mergedUser)); // true
        
        newTx.commit();
        newSession.close();
    }
}`}
            language="java"
            highlights={[8, 9, 10, 13, 14, 15, 22, 23, 27, 28, 32, 33, 35]}
            filename="EntityLifecycleDemo.java"
            description="实体生命周期状态转换"
          />

          <h2 id="caching" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            四、缓存机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Hibernate提供两级缓存机制，显著减少数据库查询次数，提升性能：
          </p>

          <ContextSwitcher
            simpleContent={
              <div>
                <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">一级缓存（Session Cache）</h3>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
                  内置于Session中，默认启用，无法禁用。同一Session内多次查询同一实体时，直接从缓存返回，不访问数据库。
                </p>
                <Playground
                  code={`Session session = sessionFactory.openSession();

// 第一次查询：执行SQL
User user1 = session.get(User.class, 1L);
System.out.println(user1.getName());

// 第二次查询：从一级缓存获取，不执行SQL
User user2 = session.get(User.class, 1L);
System.out.println(user2.getName());

// 验证是同一个对象引用
System.out.println(user1 == user2); // true

session.close();`}
                  language="java"
                  highlights={[3, 4, 7, 8, 11]}
                  filename="FirstLevelCache.java"
                  description="一级缓存示例"
                />
              </div>
            }
            hardcoreContent={
              <div>
                <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">二级缓存（SessionFactory Cache）</h3>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
                  跨Session共享，需手动配置。适合读取频繁、修改较少的数据（如字典表、配置项）。
                </p>
                <Playground
                  code={`// hibernate.cfg.xml 配置
/*
<property name="hibernate.cache.use_second_level_cache">true</property>
<property name="hibernate.cache.region.factory_class">
    org.hibernate.cache.ehcache.EhCacheRegionFactory
</property>
*/

// 实体类启用二级缓存
@Entity
@Cacheable
@org.hibernate.annotations.Cache(
    usage = CacheConcurrencyStrategy.READ_WRITE
)
public class Category {
    @Id
    private Long id;
    private String name;
}

// 使用二级缓存
Session session1 = sessionFactory.openSession();
Category cat1 = session1.get(Category.class, 1L); // 查询DB并缓存
session1.close();

Session session2 = sessionFactory.openSession();
Category cat2 = session2.get(Category.class, 1L); // 从二级缓存获取
session2.close();

System.out.println(cat1 == cat2); // false（不同对象）
System.out.println(cat1.getId().equals(cat2.getId())); // true（相同数据）`}
                  language="java"
                  highlights={[2, 3, 4, 5, 6, 10, 11, 12, 13, 22, 23, 26, 27]}
                  filename="SecondLevelCache.java"
                  description="二级缓存配置与使用"
                />
                <Callout type="info" title="缓存并发策略">
                  <strong>READ_ONLY</strong>：只读，性能最高，适合永不修改的数据<br/>
                  <strong>READ_WRITE</strong>：读写，使用软锁，适合偶尔修改的数据<br/>
                  <strong>NONSTRICT_READ_WRITE</strong>：非严格读写，不保证一致性<br/>
                  <strong>TRANSACTIONAL</strong>：事务性，需要JTA支持
                </Callout>
              </div>
            }
          />

          <h2 id="lazy-loading" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            五、延迟加载原理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            延迟加载（Lazy Loading）是Hibernate的性能优化策略，仅在真正访问关联对象时才执行查询，避免一次性加载大量无用数据。
          </p>

          <Playground
            code={`// 实体关系配置
@Entity
public class Department {
    @Id
    private Long id;
    private String name;
    
    // 延迟加载：获取Department时不会立即加载employees
    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    private List<Employee> employees;
}

@Entity
public class Employee {
    @Id
    private Long id;
    private String name;
    
    // 多对一默认就是LAZY
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dept_id")
    private Department department;
}

// 使用示例
public class LazyLoadingDemo {
    public static void main(String[] args) {
        Session session = sessionFactory.openSession();
        
        // 1. 只查询Department，不加载employees
        Department dept = session.get(Department.class, 1L);
        System.out.println(dept.getName()); // 正常输出
        
        // 2. 首次访问employees时触发查询
        // 如果Session已关闭，会抛出LazyInitializationException
        try {
            System.out.println(dept.getEmployees().size()); // 执行SELECT查询
        } catch (LazyInitializationException e) {
            System.err.println("Session已关闭，无法懒加载");
        }
        
        session.close();
        
        // 3. 正确做法：在Session开启时访问
        Session newSession = sessionFactory.openSession();
        Department dept2 = newSession.get(Department.class, 1L);
        
        // 强制初始化（触发查询）
        Hibernate.initialize(dept2.getEmployees());
        
        // 或者使用JOIN FETCH一次性加载
        String hql = "FROM Department d LEFT JOIN FETCH d.employees WHERE d.id = :id";
        Department dept3 = newSession.createQuery(hql, Department.class)
            .setParameter("id", 1L)
            .getSingleResult();
        
        System.out.println(dept3.getEmployees().size()); // 不再查询
        
        newSession.close();
    }
}`}
            language="java"
            highlights={[9, 10, 20, 21, 31, 32, 37, 38, 44, 47, 48, 51, 52, 53, 54]}
            filename="LazyLoadingDemo.java"
            description="延迟加载机制与N+1问题"
          />

          <Callout type="danger" title="N+1查询问题">
            <p className="mb-2"><strong>问题描述</strong>：查询1个父对象后，遍历其N个子对象时会额外执行N次查询。</p>
            <p className="mb-2"><strong>示例</strong>：查询10个部门，每个部门的员工列表懒加载 → 共执行1+10=11次查询</p>
            <p><strong>解决方案</strong>：① 使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">JOIN FETCH</code> 一次性加载；② 使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">@BatchSize</code> 批量加载；③ 启用二级缓存。</p>
          </Callout>

          <h2 id="hql" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            六、HQL查询语言
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HQL（Hibernate Query Language）是面向对象的查询语言，语法类似SQL但操作的是实体和属性而非表和列。
          </p>

          <Playground
            code={`Session session = sessionFactory.openSession();

// 1. 基本查询
List<User> users = session.createQuery("FROM User WHERE age > :age", User.class)
    .setParameter("age", 18)
    .getResultList();

// 2. 投影查询（只查询部分字段）
List<Object[]> results = session.createQuery(
    "SELECT u.name, u.email FROM User u WHERE u.age > :age"
).setParameter("age", 18)
.getResultList();

for (Object[] row : results) {
    System.out.println(row[0] + ", " + row[1]);
}

// 3. 关联查询
String hql = "FROM Order o JOIN FETCH o.customer WHERE o.totalAmount > :amount";
List<Order> orders = session.createQuery(hql, Order.class)
    .setParameter("amount", 100.0)
    .getResultList();

// 4. 聚合查询
Long count = session.createQuery("SELECT COUNT(u) FROM User u", Long.class)
    .getSingleResult();

Double avgAge = session.createQuery("SELECT AVG(u.age) FROM User u", Double.class)
    .getSingleResult();

// 5. Criteria API（类型安全查询）
CriteriaBuilder cb = session.getCriteriaBuilder();
CriteriaQuery<User> query = cb.createQuery(User.class);
Root<User> root = query.from(User.class);

query.select(root)
    .where(cb.greaterThan(root.get("age"), 18))
    .orderBy(cb.desc(root.get("createTime")));

List<User> criteriaUsers = session.createQuery(query).getResultList();

session.close();`}
            language="java"
            highlights={[4, 5, 6, 9, 10, 11, 12, 19, 20, 21, 22, 25, 26, 28, 29, 32, 33, 34, 36, 37, 38, 39, 40]}
            filename="HQLExamples.java"
            description="HQL查询示例"
          />

          <h2 id="transaction" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            七、事务管理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Hibernate的事务管理与JDBC事务紧密集成，通过Transaction接口提供统一的事务控制API。
          </p>

          <Playground
            code={`public class TransactionDemo {
    public static void transferMoney(Session session, Long fromAccountId, 
                                    Long toAccountId, BigDecimal amount) {
        Transaction transaction = null;
        
        try {
            transaction = session.beginTransaction();
            
            // 扣款
            Account fromAccount = session.get(Account.class, fromAccountId);
            fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
            
            // 收款
            Account toAccount = session.get(Account.class, toAccountId);
            toAccount.setBalance(toAccount.getBalance().add(amount));
            
            // 验证余额
            if (fromAccount.getBalance().compareTo(BigDecimal.ZERO) < 0) {
                throw new IllegalStateException("余额不足");
            }
            
            // 提交事务（自动flush所有变更到DB）
            transaction.commit();
            System.out.println("转账成功");
            
        } catch (Exception e) {
            // 回滚事务
            if (transaction != null && transaction.isActive()) {
                transaction.rollback();
            }
            System.out.println("转账失败: " + e.getMessage());
            throw e;
        }
    }
    
    // Spring声明式事务（推荐）
    @Transactional
    public void springManagedTransfer(Long fromId, Long toId, BigDecimal amount) {
        // Spring自动管理事务边界
        Account from = entityManager.find(Account.class, fromId);
        Account to = entityManager.find(Account.class, toId);
        
        from.setBalance(from.getBalance().subtract(amount));
        to.setBalance(to.getBalance().add(amount));
        
        // 无需手动commit/rollback，Spring根据异常自动处理
    }
}`}
            language="java"
            highlights={[7, 10, 11, 14, 15, 18, 19, 23, 28, 29, 30, 37, 38, 40, 41, 43, 44]}
            filename="TransactionDemo.java"
            description="Hibernate事务管理"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区1：Hibernate比JDBC慢所以不应该用">
            <p className="mb-2"><strong>错误认知</strong>：ORM框架性能差，应该直接用JDBC</p>
            <p><strong>事实</strong>：合理使用缓存、批量操作和JOIN FETCH后，Hibernate性能接近手写JDBC。对于CRUD密集型应用，开发效率提升远大于微小的性能损失。只有在极端高性能场景（如高频交易）才需要考虑绕过ORM。</p>
          </Callout>

          <Callout type="danger" title="误区2：所有关联都应该EAGER加载">
            <p className="mb-2"><strong>错误认知</strong>：设置fetch=EAGER可以避免LazyInitializationException</p>
            <p><strong>事实</strong>：EAGER加载会导致严重的N+1问题和内存浪费。应保持默认的LAZY策略，通过JOIN FETCH或@BatchSize在需要时显式加载。LazyInitializationException的根本原因是Session生命周期管理不当，而非懒加载本身的问题。</p>
          </Callout>

          <Callout type="danger" title="误区3：Session可以长期持有">
            <p className="mb-2"><strong>错误认知</strong>：创建一个Session全局复用，避免频繁创建开销</p>
            <p><strong>事实</strong>：Session不是线程安全的，且会持续积累持久态对象导致内存泄漏。应采用"Open Session in View"或"Session per Request"模式，每个请求创建新Session，使用后立即关闭。</p>
          </Callout>

          <Callout type="danger" title="误区4：二级缓存总能提升性能">
            <p className="mb-2"><strong>错误认知</strong>：启用二级缓存就能加速所有查询</p>
            <p><strong>事实</strong>：二级缓存适合读多写少的数据。对于频繁修改的表，缓存失效和同步开销可能超过收益。应根据业务场景选择性启用，并监控缓存命中率。错误的缓存策略甚至会导致数据不一致。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            九、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "Hibernate的一级缓存和二级缓存有什么区别？",
                answer: "一级缓存：内置于Session，默认启用，事务级别，Session关闭即失效，存储持久态对象引用。二级缓存：SessionFactory级别，需手动配置，应用级别，跨Session共享，存储对象序列化数据。一级缓存解决同一事务内的重复查询，二级缓存解决跨事务的重复查询。"
              },
              {
                question: "什么是N+1查询问题？如何解决？",
                answer: "N+1问题：查询1个父对象后，访问其N个子对象时触发N次额外查询。例如查询10个部门，遍历每个部门的员工列表时执行10次SELECT。解决方案：① 使用JOIN FETCH一次性加载关联数据；② 使用@BatchSize(size=10)批量加载；③ 启用二级缓存；④ 使用@EntityGraph定义加载计划。"
              },
              {
                question: "Hibernate中get()和load()的区别？",
                answer: "get()：立即执行SQL查询，返回null如果记录不存在，返回真实对象。load()：返回代理对象（懒加载），仅在访问属性时执行SQL，记录不存在时抛出ObjectNotFoundException。实际开发中推荐使用get()，因为load()的懒加载特性容易导致LazyInitializationException。"
              },
              {
                question: "Hibernate的实体有哪几种状态？如何转换？",
                answer: "四种状态：Transient（瞬时态，new创建）、Persistent（持久态，与Session关联）、Detached（游离态，Session已关闭）、Removed（删除态）。转换方式：save()/persist()→Transient到Persistent；close()/evict()→Persistent到Detached；merge()→Detached到Persistent；delete()→Persistent到Removed。"
              },
              {
                question: "Hibernate如何处理乐观锁？",
                answer: "通过在实体中添加@Version注解的版本字段实现。更新时Hibernate检查版本号是否与数据库中一致，一致则更新并递增版本号，不一致则抛出OptimisticLockException。适用于并发冲突较少的场景，相比悲观锁（SELECT FOR UPDATE）性能更好，不会阻塞其他事务。"
              },
              {
                question: "Hibernate和MyBatis如何选择？",
                answer: "Hibernate优势：全自动ORM，开发效率高，适合CRUD密集型应用，缓存机制完善，跨数据库移植性好。MyBatis优势：半自动ORM，SQL可控性强，适合复杂查询和报表，学习曲线低，性能调优直观。选择建议：企业级应用、领域驱动设计选Hibernate；互联网高并发、复杂SQL优化选MyBatis。"
              },
              {
                question: "Hibernate的flush()什么时候执行？",
                answer: "flush时机：① 事务提交前自动flush；② 执行查询前（确保查询结果反映最新状态）；③ 手动调用session.flush()。flush将Session中的变更同步到数据库，但不提交事务。可通过FlushMode手动控制：AUTO（默认）、COMMIT（仅在提交时）、MANUAL（仅手动）。"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            十、知识关联
          </h2>
          <div className="bg-ink-soft/20 border border-border-light rounded-paper-md p-5 my-5">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">相关知识点</h3>
            <ul className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
              <li>• <strong>JDBC底层原理</strong>：Hibernate基于JDBC构建，理解Connection和Statement有助于排查底层问题</li>
              <li>• <strong>数据库连接池</strong>：Hibernate通常配合HikariCP或Druid使用，需协调两者的超时和验证策略</li>
              <li>• <strong>Spring事务管理</strong>：Spring通过@Transactional简化Hibernate事务管理，需注意传播机制和隔离级别</li>
              <li>• <strong>SQL优化与索引</strong>：虽然Hibernate自动生成SQL，但仍需通过show_sql和EXPLAIN分析执行计划，优化查询性能</li>
            </ul>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />

        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
