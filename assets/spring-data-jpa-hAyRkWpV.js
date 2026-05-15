import{j as e,g as s}from"./index-hyqxTCwJ.js";import{K as o}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as a}from"./SideNote-BKvanovA.js";import{C as t,A as d,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as n}from"./DiagramBlock-CLaKE9_7.js";import{I as p}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"core-concept",text:"一、核心概念",level:2},{id:"repository",text:"二、Repository 接口体系",level:2},{id:"query-methods",text:"三、查询方法（重点🔥）",level:2},{id:"jpql",text:"四、JPQL 与原生 SQL",level:2},{id:"entity-relationship",text:"五、实体关系映射",level:2},{id:"source-code",text:"六、源码分析",level:2},{id:"best-practices",text:"七、最佳实践",level:2},{id:"misconceptions",text:"八、常见误区",level:2},{id:"interview",text:"九、面试真题",level:2},{id:"related",text:"十、知识关联",level:2}];function j({meta:i}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(o,{meta:i,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Spring Data JPA 是基于",e.jsx("strong",{className:"text-accent",children:"JPA 规范"}),"的数据访问抽象层，通过 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Repository"})," 接口自动生成 CRUD 实现， 支持方法名解析、JPQL、Specification 等多种查询方式，大幅简化数据库操作代码。"]})}),e.jsx(t,{type:"tip",title:"为什么需要 Spring Data JPA？",children:"传统 JDBC 需要手动编写 SQL、处理 ResultSet、管理事务，代码冗长且易出错。Spring Data JPA 通过约定优于配置的理念，让开发者只需定义接口即可自动获得完整的 CRUD 功能，将开发效率提升数倍。"}),e.jsx("h2",{id:"core-concept",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、核心概念"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Spring Data JPA 的核心是 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Repository"})," 接口体系，它提供了统一的数据访问抽象："]}),e.jsx(r,{code:`// Repository 接口层次结构
public interface Repository<T, ID> {}  // 标记接口

public interface CrudRepository<T, ID> extends Repository<T, ID> {
    <S extends T> S save(S entity);           // 保存
    Optional<T> findById(ID id);              // 根据 ID 查询
    Iterable<T> findAll();                    // 查询所有
    void delete(T entity);                    // 删除
    long count();                             // 统计数量
}

public interface PagingAndSortingRepository<T, ID> extends CrudRepository<T, ID> {
    Iterable<T> findAll(Sort sort);           // 排序查询
    Page<T> findAll(Pageable pageable);       // 分页查询
}

public interface JpaRepository<T, ID> extends PagingAndSortingRepository<T, ID> {
    List<T> findAll();                        // 返回 List
    void flush();                             // 强制刷新
    <S extends T> S saveAndFlush(S entity);   // 保存并刷新
}`,language:"java",highlights:[2,4,7,10,13,16],filename:"Repository Hierarchy.java",description:"Spring Data JPA Repository 接口层次"}),e.jsx(n,{title:"Spring Data JPA 架构",children:`\`\`\`mermaid
graph TD
    A[应用层] --> B[Repository 接口]
    B --> C[SimpleJpaRepository 实现]
    C --> D[EntityManager]
    D --> E[JPA Provider<br/>Hibernate/EclipseLink]
    E --> F[Database]
    
    G[@Query JPQL] --> C
    H[方法名解析] --> C
    I[Specification] --> C
\`\`\``}),e.jsxs(a,{label:"JPA vs Hibernate",children:[e.jsx("strong",{children:"JPA"})," 是 Java EE 的 ORM 规范标准，定义了接口和注解。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"Hibernate"})," 是 JPA 的一种实现，Spring Data JPA 默认使用 Hibernate 作为底层实现。你也可以替换为 EclipseLink 等其他 JPA 实现。"]}),e.jsx("h2",{id:"repository",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、Repository 接口体系"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["实际开发中，我们通常继承 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"JpaRepository"})," 或 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"CrudRepository"}),"："]}),e.jsx(r,{code:`@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    private String email;
    private Integer age;
    
    // getters and setters
}

// 自定义 Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 继承后自动拥有：save, findById, findAll, delete, count 等方法
}`,language:"java",highlights:[1,4,8,17],filename:"UserRepository.java",description:"定义 Repository 接口"}),e.jsxs(t,{type:"info",title:"Spring Boot 自动配置",children:["在 Spring Boot 项目中，只需添加 ",e.jsx("code",{children:"spring-boot-starter-data-jpa"})," 依赖，并在配置文件中设置数据源，Spring 会自动扫描 ",e.jsx("code",{children:"@Repository"})," 接口并生成代理实现类，无需额外配置。"]}),e.jsx("h2",{id:"query-methods",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、查询方法（重点🔥）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Spring Data JPA 最强大的特性是",e.jsx("strong",{children:"方法名解析"}),"，通过方法名自动生成查询语句："]}),e.jsx(r,{code:`public interface UserRepository extends JpaRepository<User, Long> {
    // 根据用户名查询
    User findByUsername(String username);
    
    // 根据邮箱和年龄范围查询
    List<User> findByEmailAndAgeBetween(String email, int minAge, int maxAge);
    
    // 模糊查询
    List<User> findByUsernameContaining(String keyword);
    
    // 排序查询
    List<User> findByAgeGreaterThanOrderByUsernameAsc(int age);
    
    // 分页查询
    Page<User> findByAgeGreaterThan(int age, Pageable pageable);
    
    // 限制结果数量
    List<User> findTop10ByOrderByCreatedAtDesc();
    
    // 统计查询
    long countByUsernameContaining(String keyword);
    
    // 删除查询
    void deleteByUsername(String username);
}`,language:"java",highlights:[3,6,9,12,15,18,21,24],filename:"Query Methods.java",description:"方法名解析查询示例"}),e.jsx(n,{title:"方法名解析规则",children:`\`\`\`mermaid
graph LR
    A[findBy] --> B[属性名]
    B --> C[条件关键字]
    C --> D[连接词 And/Or]
    D --> B
    
    E[条件关键字] --> F[Equal/GreaterThan/LessThan]
    E --> G[Containing/StartingWith/EndingWith]
    E --> H[Between/In/IsNull]
    E --> I[OrderBy + 排序规则]
\`\`\``}),e.jsxs(t,{type:"warning",title:"方法名过长怎么办？",children:["当查询条件复杂时，方法名会变得很长（如 ",e.jsx("code",{children:"findByUsernameContainingAndAgeBetweenOrderByCreatedAtDesc"}),"）。此时应改用 ",e.jsx("code",{children:"@Query"})," 注解或 ",e.jsx("code",{children:"Specification"}),"，提高可读性。"]}),e.jsx("h2",{id:"jpql",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、JPQL 与原生 SQL"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["对于复杂查询，可以使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@Query"})," 注解编写 JPQL 或原生 SQL："]}),e.jsx(r,{code:`public interface UserRepository extends JpaRepository<User, Long> {
    
    // JPQL 查询（面向对象，基于实体属性）
    @Query("SELECT u FROM User u WHERE u.age > :age AND u.email LIKE %:domain%")
    List<User> findUsersByAgeAndDomain(@Param("age") int age, 
                                       @Param("domain") String domain);
    
    // JPQL 更新查询
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.email = :email WHERE u.username = :username")
    int updateEmailByUsername(@Param("email") String email, 
                              @Param("username") String username);
    
    // 原生 SQL 查询（基于数据库表）
    @Query(value = "SELECT * FROM users WHERE age > ?1", nativeQuery = true)
    List<User> findUsersOlderThan(int age);
    
    // 分页查询
    @Query("SELECT u FROM User u WHERE u.age > :age")
    Page<User> findUsersByAge(@Param("age") int age, Pageable pageable);
}`,language:"java",highlights:[4,9,16,20],filename:"JPQL Queries.java",description:"JPQL 与原生 SQL 查询"}),e.jsxs(a,{label:"JPQL vs SQL",children:[e.jsx("strong",{children:"JPQL"}),"：面向对象的查询语言，操作的是实体类和属性，与数据库表解耦，可移植性好。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"原生 SQL"}),"：直接操作数据库表和字段，性能更优，但失去可移植性，仅在 JPQL 无法满足时使用。"]}),e.jsx("h2",{id:"entity-relationship",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、实体关系映射"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["JPA 支持多种实体关系映射，常见的有：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@OneToOne"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@OneToMany"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@ManyToOne"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@ManyToMany"}),"。"]}),e.jsx(r,{code:`// 一对多关系：一个部门有多个员工
@Entity
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Employee> employees;
}

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
}`,language:"java",highlights:[10,22],filename:"Entity Relationship.java",description:"一对多关系映射"}),e.jsxs(t,{type:"danger",title:"N+1 问题",children:["使用 ",e.jsx("code",{children:"fetch = FetchType.LAZY"})," 时，访问关联对象会触发额外的 SQL 查询，导致 N+1 问题。解决方案：① 使用 ",e.jsx("code",{children:"@EntityGraph"})," 指定加载策略；② 使用 JPQL 的 ",e.jsx("code",{children:"JOIN FETCH"}),"；③ 使用 ",e.jsx("code",{children:"BatchSize"})," 批量加载。"]}),e.jsx("h2",{id:"source-code",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、源码分析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spring Data JPA 通过动态代理生成 Repository 实现类，核心流程如下："}),e.jsx(r,{code:`// 1. Spring 启动时扫描 Repository 接口
@EnableJpaRepositories(basePackages = "com.example.repository")

// 2. 为每个 Repository 接口创建代理对象
// SimpleJpaRepository 是默认实现类
public class SimpleJpaRepository<T, ID> implements JpaRepositoryImplementation<T, ID> {
    
    private final EntityManager em;
    private final JpaEntityInformation<T, ?> entityInformation;
    
    public SimpleJpaRepository(JpaEntityInformation<T, ?> entityInformation, 
                               EntityManager em) {
        this.entityInformation = entityInformation;
        this.em = em;
    }
    
    @Override
    public <S extends T> S save(S entity) {
        if (entityInformation.isNew(entity)) {
            em.persist(entity);  // 插入新记录
            return entity;
        } else {
            return em.merge(entity);  // 更新已有记录
        }
    }
    
    @Override
    public Optional<T> findById(ID id) {
        Assert.notNull(id, ID_MUST_NOT_BE_NULL);
        Class<T> domainType = getDomainClass();
        return Optional.ofNullable(em.find(domainType, id));
    }
}

// 3. 方法名解析器
public class PartTreeJpaQuery extends AbstractJpaQuery {
    private final PartTree tree;  // 解析方法名生成的查询树
    
    public PartTreeJpaQuery(JpaQueryMethod method, EntityManager em) {
        super(method, em);
        this.tree = new PartTree(method.getName(), method.getEntityMetadata());
    }
    
    @Override
    protected Query createQuery(Object[] values) {
        // 根据 PartTree 生成 JPQL
        String jpql = tree.toJpql();
        return em.createQuery(jpql);
    }
}`,language:"java",highlights:[6,18,27,36,43],filename:"Source Code Analysis.java",description:"Spring Data JPA 核心源码"}),e.jsx(n,{title:"Repository 代理生成流程",children:`\`\`\`mermaid
graph TD
    A[@EnableJpaRepositories] --> B[扫描 Repository 接口]
    B --> C[解析方法名生成 PartTree]
    C --> D[创建 SimpleJpaRepository 实例]
    D --> E[生成 JDK 动态代理]
    E --> F[注入到 Spring 容器]
    F --> G[@Autowired 自动装配]
\`\`\``}),e.jsx("h2",{id:"best-practices",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、最佳实践"}),e.jsxs(t,{type:"tip",title:"推荐做法",children:[e.jsx("strong",{children:"1. 合理选择 Fetch 策略"}),"：多数场景使用 ",e.jsx("code",{children:"FetchType.LAZY"}),"，避免不必要的关联加载。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"2. 使用 DTO 投影"}),"：查询部分字段时，使用接口投影或构造函数表达式，减少数据传输。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"3. 分页查询"}),"：大数据量查询必须使用分页，避免 OOM。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"4. 事务控制"}),"：写操作必须加 ",e.jsx("code",{children:"@Transactional"}),"，读操作可使用 ",e.jsx("code",{children:"@Transactional(readOnly = true)"})," 优化性能。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"5. 异常处理"}),"：捕获 ",e.jsx("code",{children:"DataAccessException"})," 或其子类，而非通用 Exception。"]}),e.jsx(r,{code:`// DTO 投影示例
public interface UserSummary {
    String getUsername();
    String getEmail();
}

public interface UserRepository extends JpaRepository<User, Long> {
    // 返回 DTO 投影，只查询需要的字段
    List<UserSummary> findByAgeGreaterThan(int age);
}

// 构造函数表达式
@Query("SELECT NEW com.example.dto.UserDTO(u.username, u.email) FROM User u WHERE u.age > :age")
List<UserDTO> findUserDTOsByAge(@Param("age") int age);`,language:"java",highlights:[2,9,13],filename:"Best Practices.java",description:"DTO 投影优化查询"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：认为 save() 总是执行 INSERT",children:[e.jsx("strong",{children:"错误认知"}),"：调用 ",e.jsx("code",{children:"save()"})," 一定会插入新记录。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"真相"}),"：",e.jsx("code",{children:"save()"})," 会根据实体是否为新对象决定执行 INSERT 还是 UPDATE。判断依据：① ID 是否为 null；② 是否实现了 ",e.jsx("code",{children:"Persistable"})," 接口的 ",e.jsx("code",{children:"isNew()"})," 方法。如果 ID 已存在，会执行 ",e.jsx("code",{children:"merge()"})," 更新操作。"]}),e.jsxs(t,{type:"danger",title:"误区 2：忽略延迟加载导致的 LazyInitializationException",children:[e.jsx("strong",{children:"错误认知"}),"：在 Service 层访问关联对象没问题。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"真相"}),"：",e.jsx("code",{children:"FetchType.LAZY"})," 的关联对象在 Session 关闭后访问会抛出 ",e.jsx("code",{children:"LazyInitializationException"}),"。解决方案：① 在事务内访问；② 使用 ",e.jsx("code",{children:"@Transactional"})," 保持 Session 开启；③ 使用 ",e.jsx("code",{children:"JOIN FETCH"})," 提前加载。"]}),e.jsxs(t,{type:"danger",title:"误区 3：认为 @Query 一定比方法名解析性能好",children:[e.jsx("strong",{children:"错误认知"}),"：手写 JPQL 一定比方法名解析快。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"真相"}),"：两者最终都生成相同的 JPQL，性能无差异。方法名解析的优势是可读性更好，维护更方便。仅在复杂查询时才需要使用 ",e.jsx("code",{children:"@Query"}),"。"]}),e.jsxs(t,{type:"danger",title:"误区 4：忽略缓存导致数据不一致",children:[e.jsx("strong",{children:"错误认知"}),"：修改数据库后，查询一定能看到最新数据。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"真相"}),"：JPA 有一级缓存（EntityManager）和二级缓存（可选）。同一 EntityManager 内多次查询相同 ID 的对象，只会查一次数据库。解决方案：① 调用 ",e.jsx("code",{children:"em.clear()"})," 清空缓存；② 使用 ",e.jsx("code",{children:"@Modifying(clearAutomatically = true)"})," 自动清空。"]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、面试真题"}),e.jsx(p,{questions:[{question:"Spring Data JPA 的方法名解析机制是如何工作的？",answer:"Spring Data JPA 通过解析 Repository 接口的方法名，提取属性名和条件关键字，生成 PartTree（查询树），然后转换为 JPQL 语句。例如 findByUsernameAndAgeGreaterThan 会被解析为：WHERE username = ?1 AND age > ?2。解析过程由 PartTreeJpaQuery 完成，支持 Equal、GreaterThan、LessThan、Between、In、Like 等 20+ 种条件关键字。"},{question:"JPA 的一级缓存和二级缓存有什么区别？",answer:"一级缓存是 EntityManager 级别的缓存，生命周期与 EntityManager 一致，默认开启，无法关闭。二级缓存是 SessionFactory 级别的缓存，跨 EntityManager 共享，需要手动配置（如使用 Ehcache、Redis）。一级缓存存储的是实体对象，二级缓存存储的是对象的状态。查询优先级：一级缓存 → 二级缓存 → 数据库。"},{question:"如何解决 JPA 的 N+1 问题？",answer:"N+1 问题是指查询 1 条主记录后，访问其关联对象时触发 N 次额外查询。解决方案：① 使用 JOIN FETCH：@Query('SELECT d FROM Department d JOIN FETCH d.employees')；② 使用 @EntityGraph 指定加载策略；③ 使用 @BatchSize 批量加载关联对象；④ 将 FetchType 改为 EAGER（不推荐，影响性能）。"},{question:"JpaRepository 和 CrudRepository 的区别是什么？",answer:"CrudRepository 提供基本的 CRUD 操作（save、findById、findAll、delete 等）。JpaRepository 继承自 PagingAndSortingRepository（又继承自 CrudRepository），额外提供：① 返回 List 而非 Iterable；② flush() 强制同步到数据库；③ saveAndFlush() 保存并立即刷新；④ deleteInBatch() 批量删除。实际开发中推荐使用 JpaRepository。"},{question:"@Transactional 在 Spring Data JPA 中的作用是什么？",answer:"@Transactional 确保一组数据库操作在同一事务中执行，保证 ACID 特性。在 JPA 中，事务的作用包括：① 管理 EntityManager 的生命周期；② 控制 flush 时机（事务提交时自动 flush）；③ 支持回滚（异常时 rollback）；④ 优化性能（readOnly=true 时跳过 dirty checking）。写操作必须加 @Transactional，否则不会持久化到数据库。"},{question:"什么是 JPA 的脏检查（Dirty Checking）机制？",answer:"脏检查是 JPA 自动检测实体状态变化的机制。当事务提交时，EntityManager 会比较持久化上下文中的实体与数据库中的原始状态，如果发现属性变化，自动生成 UPDATE 语句。优点：无需手动调用 update()，简化开发。缺点：大量实体时性能开销大。可以通过 @Transactional(readOnly=true) 禁用脏检查优化性能。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6",children:[e.jsxs("a",{href:"/docs/07-database/jdbc",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"前置知识 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"JDBC 底层原理"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"理解底层数据库访问"})]}),e.jsxs("a",{href:"/docs/07-database/hibernate",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"底层实现 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"Hibernate ORM 框架"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"JPA 的具体实现"})]}),e.jsxs("a",{href:"/docs/06-spring-framework/spring-transaction",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"相关概念 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"Spring 事务管理"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"事务控制最佳实践"})]}),e.jsxs("a",{href:"/docs/07-database/mybatis",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"对比学习 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"MyBatis SQL 映射"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"另一种 ORM 方案"})]})]}),e.jsx(t,{type:"info",title:"学习建议",children:"Spring Data JPA 是 Spring 生态中最常用的数据访问技术，建议重点掌握：① Repository 接口体系和方法名解析规则；② JPQL 与原生 SQL 的使用场景；③ 实体关系映射和 N+1 问题；④ 缓存机制和性能优化。可以通过阅读 Spring Data JPA 源码深入理解代理生成和查询解析机制。"}),e.jsx(d,{...s(i.category,i.id)})]})}),e.jsx(l,{items:c})]})}export{j as default};
