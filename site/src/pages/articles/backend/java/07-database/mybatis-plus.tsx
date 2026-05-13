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
  { id: 'core-features', text: '一、核心特性', level: 2 },
  { id: 'quick-start', text: '二、快速开始', level: 2 },
  { id: 'crud-operations', text: '三、CRUD 操作（重点🔥）', level: 2 },
  { id: 'condition-builder', text: '四、条件构造器', level: 2 },
  { id: 'plugins', text: '五、常用插件', level: 2 },
  { id: 'code-generator', text: '六、代码生成器', level: 2 },
  { id: 'best-practices', text: '七、最佳实践', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function MybatisPlus({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              MyBatis-Plus 是一个<strong className="text-accent">MyBatis 增强工具</strong>，在 MyBatis 基础上只做增强不做改变，
              提供通用 CRUD、分页插件、代码生成器等开箱即用的功能，简化开发效率。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 MyBatis-Plus？">
            原生 MyBatis 需要为每个表编写大量重复的 CRUD SQL，MyBatis-Plus 通过 BaseMapper 提供通用 CRUD 方法，无需编写 XML 即可完成单表操作，复杂查询仍可使用原生 MyBatis，两者完美兼容。
          </Callout>

          <h2 id="core-features" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、核心特性
          </h2>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">特性</th>
                <th className="text-left p-3 font-semibold text-ink">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">无侵入</td>
                <td className="p-3">只做增强不做改变，引入 MP 不影响原有 MyBatis 功能</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">通用 CRUD</td>
                <td className="p-3">BaseMapper 提供单表 CRUD，无需编写 XML</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">条件构造器</td>
                <td className="p-3">LambdaQueryWrapper 等链式 API，类型安全</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">分页插件</td>
                <td className="p-3">物理分页，支持多种数据库</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">代码生成器</td>
                <td className="p-3">自动生成 Entity、Mapper、Service、Controller</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">乐观锁</td>
                <td className="p-3">@Version 注解实现乐观锁</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">逻辑删除</td>
                <td className="p-3">@TableLogic 注解实现逻辑删除</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">自动填充</td>
                <td className="p-3">@TableField(fill) 自动填充创建时间、更新时间</td>
              </tr>
            </tbody>
          </table>

          <SideNote label="设计理念">
            MyBatis-Plus 遵循「约定优于配置」原则，默认行为覆盖 80% 的场景，特殊需求可通过配置或自定义实现。它的目标是让开发者专注于业务逻辑，而非重复的 CRUD 代码。
          </SideNote>

          <h2 id="quick-start" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、快速开始
          </h2>

          <Playground
            code={`// 1. 添加依赖（Maven）
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.5</version>
</dependency>

// 2. 配置数据源（application.yml）
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb?useSSL=false
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver

// 3. 创建实体类
@Data
@TableName("users")  // 指定表名
public class User {
    @TableId(type = IdType.AUTO)  // 主键自增
    private Long id;
    
    private String name;
    private String email;
    private Integer age;
    
    @TableField(fill = FieldFill.INSERT)  // 插入时自动填充
    private LocalDateTime createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)  // 插入和更新时自动填充
    private LocalDateTime updateTime;
}

// 4. 创建 Mapper 接口
@Mapper
public interface UserMapper extends BaseMapper<User> {
    // BaseMapper 已提供通用 CRUD 方法，无需额外编写
    // 如需自定义查询，可在此添加方法并在 XML 中实现
}

// 5. 使用（Service 层）
@Service
public class UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    public List<User> getAllUsers() {
        return userMapper.selectList(null);  // 查询所有
    }
}`}
            language="java"
            highlights={[4, 19, 27, 37, 46]}
            filename="QuickStart.java"
            description="MyBatis-Plus 快速开始"
          />

          <Callout type="info" title="BaseMapper 提供的通用方法">
            BaseMapper&lt;T&gt; 提供了以下方法：<br/>
            - 插入：insert(T entity)<br/>
            - 删除：deleteById(Serializable id)、deleteByMap(Map)、delete(Wrapper)<br/>
            - 更新：updateById(T entity)、update(T entity, Wrapper)<br/>
            - 查询：selectById、selectBatchIds、selectByMap、selectOne、selectCount、selectList、selectPage
          </Callout>

          <h2 id="crud-operations" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、CRUD 操作（重点🔥）
          </h2>

          <Playground
            code={`@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    // ========== 插入操作 ==========
    public void createUser(User user) {
        // 简单插入
        userMapper.insert(user);
        
        // 批量插入
        List<User> users = Arrays.asList(user1, user2, user3);
        users.forEach(userMapper::insert);  // 循环插入
        // 或使用 IService 的 saveBatch(users) 方法（更高效）
    }
    
    // ========== 删除操作 ==========
    public void deleteUser(Long id) {
        // 根据 ID 删除
        userMapper.deleteById(id);
        
        // 根据条件删除
        userMapper.delete(new LambdaQueryWrapper<User>()
            .eq(User::getAge, 18));
    }
    
    // ========== 更新操作 ==========
    public void updateUser(User user) {
        // 根据 ID 更新（只更新非 null 字段）
        userMapper.updateById(user);
        
        // 根据条件更新
        userMapper.update(null, new LambdaUpdateWrapper<User>()
            .set(User::getName, "新名字")
            .eq(User::getId, 1L));
    }
    
    // ========== 查询操作 ==========
    public User getUserById(Long id) {
        return userMapper.selectById(id);
    }
    
    public List<User> getUsersByAge(Integer age) {
        return userMapper.selectList(new LambdaQueryWrapper<User>()
            .eq(User::getAge, age));
    }
    
    public Page<User> getUsersByPage(int current, int size) {
        Page<User> page = new Page<>(current, size);
        return userMapper.selectPage(page, null);
    }
}`}
            language="java"
            highlights={[9, 18, 27, 36, 45, 51, 57]}
            filename="CRUDOperations.java"
            description="MyBatis-Plus CRUD 操作示例"
          />

          <SideNote label="批量插入优化">
            循环调用 <code>insert()</code> 会产生 N 条 SQL，性能较差。推荐使用 <code>IService.saveBatch()</code> 方法，它会将多条 INSERT 合并为一条批量插入语句，大幅提升性能。
          </SideNote>

          <h2 id="condition-builder" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、条件构造器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            MyBatis-Plus 提供三种条件构造器，用于构建复杂的查询条件：
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">构造器</th>
                <th className="text-left p-3 font-semibold text-ink">特点</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">QueryWrapper</td>
                <td className="p-3">字符串形式，灵活性高但易出错</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent bg-yellow-100">LambdaQueryWrapper</td>
                <td className="p-3">Lambda 表达式，类型安全，推荐</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">LambdaQueryChainWrapper</td>
                <td className="p-3">链式调用，更简洁</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`// 示例1：基本查询条件
LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
wrapper.eq(User::getName, "张三")           // name = '张三'
       .like(User::getEmail, "@qq.com")     // email LIKE '%@qq.com%'
       .ge(User::getAge, 18)                // age >= 18
       .orderByDesc(User::getCreateTime);   // ORDER BY create_time DESC

List<User> users = userMapper.selectList(wrapper);

// 示例2：动态条件（根据参数是否为空决定是否添加条件）
public List<User> searchUsers(String name, Integer minAge, Integer maxAge) {
    LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
    
    // 只有当参数不为 null 时才添加条件
    wrapper.like(name != null, User::getName, name)
           .ge(minAge != null, User::getAge, minAge)
           .le(maxAge != null, User::getAge, maxAge);
    
    return userMapper.selectList(wrapper);
}

// 示例3：OR 条件
LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
wrapper.eq(User::getName, "张三")
       .or()
       .eq(User::getEmail, "zhangsan@example.com");
// SQL: WHERE name = '张三' OR email = 'zhangsan@example.com'

// 示例4：嵌套条件
LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
wrapper.and(w -> w.eq(User::getName, "张三")
                  .or()
                  .eq(User::getName, "李四"))
       .ge(User::getAge, 18);
// SQL: WHERE (name = '张三' OR name = '李四') AND age >= 18

// 示例5：IN 查询
List<Long> ids = Arrays.asList(1L, 2L, 3L);
LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
wrapper.in(User::getId, ids);
// SQL: WHERE id IN (1, 2, 3)

// 示例6：子查询
LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
wrapper.inSql(User::getId, "SELECT user_id FROM orders WHERE amount > 100");
// SQL: WHERE id IN (SELECT user_id FROM orders WHERE amount > 100)`}
            language="java"
            highlights={[2, 11, 23, 31, 39, 45]}
            filename="ConditionBuilder.java"
            description="条件构造器实战示例"
          />

          <Callout type="warning" title="常用条件方法">
            <strong>比较运算</strong>：eq（等于）、ne（不等于）、gt（大于）、ge（大于等于）、lt（小于）、le（小于等于）<br/><br/>
            <strong>模糊查询</strong>：like（LIKE '%值%'）、likeLeft（LIKE '%值'）、likeRight（LIKE '值%'）<br/><br/>
            <strong>范围查询</strong>：in（IN）、notIn（NOT IN）、between（BETWEEN）、notBetween<br/><br/>
            <strong>空值判断</strong>：isNull（IS NULL）、isNotNull（IS NOT NULL）<br/><br/>
            <strong>分组排序</strong>：groupBy、orderByAsc、orderByDesc
          </Callout>

          <h2 id="plugins" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、常用插件
          </h2>

          <h3 id="pagination-plugin" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1. 分页插件
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            MyBatis-Plus 内置分页插件，支持物理分页（LIMIT/OFFSET），性能优于内存分页。
          </p>

          <Playground
            code={`// 1. 配置分页插件（Spring Boot）
@Configuration
public class MyBatisPlusConfig {
    
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        
        // 添加分页插件
        PaginationInnerInterceptor paginationInterceptor = new PaginationInnerInterceptor(DbType.MYSQL);
        paginationInterceptor.setMaxLimit(500L);  // 限制最大单页数量
        interceptor.addInnerInterceptor(paginationInterceptor);
        
        return interceptor;
    }
}

// 2. 使用分页查询
public Page<User> getUsersByPage(int current, int size) {
    // 创建分页对象（当前页，每页数量）
    Page<User> page = new Page<>(current, size);
    
    // 执行分页查询
    Page<User> result = userMapper.selectPage(page, new LambdaQueryWrapper<User>()
        .ge(User::getAge, 18)
        .orderByDesc(User::getCreateTime));
    
    // 获取结果
    List<User> records = result.getRecords();  // 数据列表
    long total = result.getTotal();             // 总记录数
    long pages = result.getPages();             // 总页数
    
    return result;
}`}
            language="java"
            highlights={[6, 10, 19, 24]}
            filename="PaginationPlugin.java"
            description="分页插件配置与使用"
          />

          <h3 id="optimistic-lock" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2. 乐观锁插件
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            乐观锁适用于读多写少的场景，通过版本号机制避免并发更新冲突。
          </p>

          <Playground
            code={`// 1. 实体类添加 @Version 字段
@Data
@TableName("products")
public class Product {
    @TableId
    private Long id;
    
    private String name;
    private BigDecimal price;
    
    @Version  // 乐观锁版本号
    private Integer version;
}

// 2. 配置乐观锁插件
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
    interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
    return interceptor;
}

// 3. 使用乐观锁
public void updateProductPrice(Long id, BigDecimal newPrice) {
    Product product = productMapper.selectById(id);
    
    // 修改价格
    product.setPrice(newPrice);
    
    // 更新时会自动检查版本号
    // UPDATE products SET price=?, version=version+1 
    // WHERE id=? AND version=?
    productMapper.updateById(product);
    
    // 如果版本号不匹配，更新失败（返回 0）
}`}
            language="java"
            highlights={[11, 17, 24, 32]}
            filename="OptimisticLock.java"
            description="乐观锁插件使用"
          />

          <h3 id="logical-delete" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3. 逻辑删除插件
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            逻辑删除不会真正删除数据，而是标记为删除状态，便于数据恢复和审计。
          </p>

          <Playground
            code={`// 1. 实体类添加 @TableLogic 字段
@Data
@TableName("users")
public class User {
    @TableId
    private Long id;
    
    private String name;
    
    @TableLogic  // 逻辑删除字段
    private Integer deleted;  // 0-未删除，1-已删除
}

// 2. 配置逻辑删除（application.yml）
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: deleted      # 全局逻辑删除字段名
      logic-delete-value: 1            # 已删除值
      logic-not-delete-value: 0        # 未删除值

// 3. 使用逻辑删除
public void deleteUser(Long id) {
    // 调用 deleteById 会执行 UPDATE 而非 DELETE
    // UPDATE users SET deleted=1 WHERE id=?
    userMapper.deleteById(id);
}

public List<User> getAllUsers() {
    // 查询时自动添加 deleted=0 条件
    // SELECT * FROM users WHERE deleted=0
    return userMapper.selectList(null);
}`}
            language="java"
            highlights={[10, 15, 23, 30]}
            filename="LogicalDelete.java"
            description="逻辑删除插件使用"
          />

          <h3 id="auto-fill" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4. 自动填充插件
          </h3>

          <Playground
            code={`// 1. 实体类添加自动填充字段
@Data
@TableName("articles")
public class Article {
    @TableId
    private Long id;
    
    private String title;
    private String content;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    
    @TableField(fill = FieldFill.INSERT)
    private String createdBy;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private String updatedBy;
}

// 2. 实现 MetaObjectHandler
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    
    @Override
    public void insertFill(MetaObject metaObject) {
        this.strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now());
        this.strictInsertFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
        this.strictInsertFill(metaObject, "createdBy", String.class, getCurrentUser());
        this.strictInsertFill(metaObject, "updatedBy", String.class, getCurrentUser());
    }
    
    @Override
    public void updateFill(MetaObject metaObject) {
        this.strictUpdateFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
        this.strictUpdateFill(metaObject, "updatedBy", String.class, getCurrentUser());
    }
    
    private String getCurrentUser() {
        // 从 SecurityContext 或 Session 获取当前用户
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}`}
            language="java"
            highlights={[11, 14, 25, 29, 36]}
            filename="AutoFill.java"
            description="自动填充插件实现"
          />

          <h2 id="code-generator" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、代码生成器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            MyBatis-Plus 提供强大的代码生成器，可以根据数据库表自动生成 Entity、Mapper、Service、Controller 等代码。
          </p>

          <Playground
            code={`// 代码生成器示例
public class CodeGenerator {
    
    public static void main(String[] args) {
        // 1. 配置数据源
        DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder(
            "jdbc:mysql://localhost:3306/mydb",
            "root",
            "123456"
        ).build();
        
        // 2. 全局配置
        GlobalConfig globalConfig = new GlobalConfig.Builder()
            .outputDir(System.getProperty("user.dir") + "/src/main/java")  // 输出目录
            .author("Your Name")                                             // 作者
            .openDir(false)                                                  // 不打开输出目录
            .fileOverride()                                                  // 覆盖已有文件
            .build();
        
        // 3. 包配置
        PackageConfig packageConfig = new PackageConfig.Builder()
            .parent("com.example")                                           // 父包名
            .moduleName("system")                                            // 模块名
            .entity("entity")                                                // Entity 包名
            .mapper("mapper")                                                // Mapper 包名
            .service("service")                                              // Service 包名
            .controller("controller")                                        // Controller 包名
            .build();
        
        // 4. 策略配置
        StrategyConfig strategyConfig = new StrategyConfig.Builder()
            .addInclude("users", "roles", "permissions")                     // 需要生成的表
            .entityBuilder()
                .enableLombok()                                              // 使用 Lombok
                .enableTableFieldAnnotation()                                // 生成字段注解
                .logicDeleteColumnName("deleted")                            // 逻辑删除字段
                .addTableFills(                                              // 自动填充字段
                    new Column("create_time", FieldFill.INSERT),
                    new Column("update_time", FieldFill.INSERT_UPDATE)
                )
                .build()
            .mapperBuilder()
                .enableBaseResultMap()                                       // 生成 ResultMap
                .enableBaseColumnList()                                      // 生成 Base_Column_List
                .build()
            .build();
        
        // 5. 模板引擎配置（使用 Freemarker）
        TemplateConfig templateConfig = new TemplateConfig.Builder()
            .disable(TemplateType.ENTITY)                                    // 禁用默认模板
            .entity("/templates/entity.java")                                // 自定义 Entity 模板
            .build();
        
        // 6. 执行生成
        AutoGenerator generator = new AutoGenerator(dataSourceConfig);
        generator.global(globalConfig);
        generator.packageInfo(packageConfig);
        generator.strategy(strategyConfig);
        generator.template(templateConfig);
        generator.execute();
    }
}`}
            language="java"
            highlights={[6, 13, 21, 31, 47, 54]}
            filename="CodeGenerator.java"
            description="代码生成器配置示例"
          />

          <Callout type="tip" title="代码生成器优势">
            代码生成器可以节省大量重复劳动，特别是在项目初期需要创建数十个表的 CRUD 代码时。生成的代码符合规范，减少人为错误。建议将生成器配置保存为模板，后续新增表时只需修改表名即可快速生成。
          </Callout>

          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、最佳实践
          </h2>

          <ol className="list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-6 space-y-3">
            <li>
              <strong>优先使用 LambdaQueryWrapper</strong>：类型安全，编译期检查，避免字符串拼写错误。
            </li>
            <li>
              <strong>批量操作使用 IService</strong>：<code>saveBatch()</code>、<code>updateBatchById()</code> 比循环调用 Mapper 方法性能更好。
            </li>
            <li>
              <strong>分页查询限制最大页数</strong>：防止恶意请求导致数据库压力过大，设置 <code>setMaxLimit(500)</code>。
            </li>
            <li>
              <strong>合理使用缓存</strong>：频繁查询且变化少的数据可使用 Redis 缓存，避免每次都查数据库。
            </li>
            <li>
              <strong>逻辑删除 vs 物理删除</strong>：重要业务数据使用逻辑删除，便于数据恢复和审计；临时数据可物理删除。
            </li>
            <li>
              <strong>避免 N+1 查询问题</strong>：关联查询时使用 JOIN 或多次查询后在内存中组装，避免循环查询数据库。
            </li>
          </ol>

          <Playground
            code={`// ✅ 最佳实践示例
@Service
public class BestPracticeService {
    
    @Autowired
    private UserMapper userMapper;
    
    // 1. 使用 LambdaQueryWrapper（类型安全）
    public List<User> searchUsers(String name, Integer minAge) {
        return userMapper.selectList(new LambdaQueryWrapper<User>()
            .like(name != null, User::getName, name)
            .ge(minAge != null, User::getAge, minAge)
            .orderByDesc(User::getCreateTime));
    }
    
    // 2. 批量插入（高性能）
    public void batchCreateUsers(List<User> users) {
        // IService.saveBatch() 会分批插入，每批 1000 条
        userService.saveBatch(users, 1000);
    }
    
    // 3. 分页查询（限制最大页数）
    public Page<User> getUsersByPage(int current, int size) {
        // 限制每页最多 100 条
        if (size > 100) {
            size = 100;
        }
        Page<User> page = new Page<>(current, size);
        return userMapper.selectPage(page, null);
    }
    
    // 4. 避免 N+1 查询
    public List<UserWithOrderVO> getUsersWithOrders() {
        // ❌ 错误做法：N+1 查询
        // List<User> users = userMapper.selectList(null);
        // users.forEach(user -> {
        //     List<Order> orders = orderMapper.selectByUserId(user.getId());
        // });
        
        // ✅ 正确做法：一次查询 + 内存组装
        List<User> users = userMapper.selectList(null);
        List<Long> userIds = users.stream().map(User::getId).collect(Collectors.toList());
        List<Order> orders = orderMapper.selectList(new LambdaQueryWrapper<Order>()
            .in(Order::getUserId, userIds));
        
        // 在内存中组装
        Map<Long, List<Order>> orderMap = orders.stream()
            .collect(Collectors.groupingBy(Order::getUserId));
        
        return users.stream().map(user -> {
            UserWithOrderVO vo = new UserWithOrderVO();
            vo.setUser(user);
            vo.setOrders(orderMap.getOrDefault(user.getId(), Collections.emptyList()));
            return vo;
        }).collect(Collectors.toList());
    }
}`}
            language="java"
            highlights={[9, 17, 23, 33]}
            filename="BestPractices.java"
            description="MyBatis-Plus 最佳实践"
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
                <td className="p-3">MyBatis-Plus 取代了 MyBatis</td>
                <td className="p-3">MyBatis-Plus 是 MyBatis 的增强工具，完全兼容 MyBatis</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">BaseMapper 可以处理所有查询</td>
                <td className="p-3">BaseMapper 只适合单表 CRUD，复杂查询仍需手写 SQL</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">循环调用 insert() 性能没问题</td>
                <td className="p-3">应使用 saveBatch() 批量插入，避免 N 次数据库交互</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">乐观锁适用于所有场景</td>
                <td className="p-3">乐观锁适合读多写少，写多场景应用悲观锁（SELECT FOR UPDATE）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">逻辑删除字段可以是任意类型</td>
                <td className="p-3">建议使用 Integer 或 Boolean，避免使用 String（性能差）</td>
              </tr>
            </tbody>
          </table>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'MyBatis-Plus 和 MyBatis 的区别？',
                answer: 'MyBatis-Plus 是 MyBatis 的增强工具，在 MyBatis 基础上只做增强不做改变。\n\n主要区别：\n1. MyBatis-Plus 提供 BaseMapper，内置通用 CRUD 方法，无需编写 XML\n2. 提供条件构造器（LambdaQueryWrapper），链式 API 更简洁\n3. 内置分页插件、乐观锁、逻辑删除、自动填充等功能\n4. 提供代码生成器，自动生成 Entity、Mapper、Service、Controller\n\n兼容性：MyBatis-Plus 完全兼容 MyBatis，原有的 XML 和自定义方法仍可正常使用。'
              },
              {
                question: 'MyBatis-Plus 的分页原理是什么？',
                answer: 'MyBatis-Plus 分页基于拦截器实现：\n1. PaginationInnerInterceptor 拦截 SQL 执行\n2. 解析原始 SQL，自动添加 LIMIT/OFFSET（MySQL）或 ROWNUM（Oracle）\n3. 同时执行 COUNT 查询获取总记录数\n4. 封装结果为 Page 对象，包含 records（数据列表）、total（总数）、pages（总页数）\n\n优势：物理分页（数据库层面分页），性能优于内存分页。支持多种数据库，自动适配方言。'
              },
              {
                question: '什么是乐观锁？MyBatis-Plus 如何实现？',
                answer: '乐观锁是一种并发控制机制，假设冲突很少发生，只在提交时检查版本。\n\nMyBatis-Plus 实现步骤：\n1. 实体类添加 @Version 注解的 version 字段\n2. 配置 OptimisticLockerInnerInterceptor 插件\n3. 更新时自动检查版本号：UPDATE table SET ..., version=version+1 WHERE id=? AND version=?\n4. 如果版本号不匹配，更新失败（返回 0）\n\n适用场景：读多写少。写多场景应使用悲观锁（SELECT FOR UPDATE）。'
              },
              {
                question: '逻辑删除和物理删除的区别？',
                answer: '物理删除：执行 DELETE 语句，数据从数据库中永久删除，不可恢复。\n\n逻辑删除：执行 UPDATE 语句，将 deleted 字段标记为 1，数据仍在数据库中，可恢复。\n\n选择建议：\n- 重要业务数据（订单、用户信息）使用逻辑删除，便于数据恢复和审计\n- 临时数据（日志、缓存）使用物理删除，节省存储空间\n\nMyBatis-Plus 通过 @TableLogic 注解实现逻辑删除，查询时自动添加 deleted=0 条件。'
              },
              {
                question: 'MyBatis-Plus 的条件构造器有哪些？如何选择？',
                answer: '三种条件构造器：\n1. QueryWrapper：字符串形式，如 .eq("name", "张三")，灵活性高但易出错\n2. LambdaQueryWrapper：Lambda 表达式，如 .eq(User::getName, "张三")，类型安全，推荐\n3. LambdaQueryChainWrapper：链式调用，更简洁\n\n选择建议：优先使用 LambdaQueryWrapper，编译期检查字段名，避免拼写错误。只有在动态字段名等特殊场景才使用 QueryWrapper。'
              },
              {
                question: '如何优化 MyBatis-Plus 的批量插入性能？',
                answer: '优化方法：\n1. 使用 IService.saveBatch() 而非循环调用 insert()，它会将多条 INSERT 合并为批量插入\n2. 设置合理的批次大小（默认 1000），避免单次插入过多数据\n3. 关闭自动提交，手动控制事务：transactionTemplate.execute(() -> { saveBatch(users); })\n4. 禁用不必要的插件（如自动填充、乐观锁），减少开销\n5. 使用 JDBC 批处理：rewriteBatchedStatements=true（MySQL）\n\n性能对比：循环插入 10000 条数据约需 10 秒，saveBatch 约需 1 秒。'
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <a href="/docs/07-database/mybatis" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">前置知识 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">MyBatis SQL映射</div>
              <div className="text-[12px] text-ink-muted mt-1">MyBatis-Plus 的基础</div>
            </a>
            <a href="/docs/06-spring-framework/spring-boot" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">集成框架 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Spring Boot</div>
              <div className="text-[12px] text-ink-muted mt-1">MyBatis-Plus 通常与 Spring Boot 配合使用</div>
            </a>
            <a href="/docs/06-spring-framework/spring-data-jpa" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">对比技术 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Spring Data JPA</div>
              <div className="text-[12px] text-ink-muted mt-1">另一种 ORM 方案</div>
            </a>
            <a href="/docs/07-database/sql-optimization" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">SQL 优化与索引</div>
              <div className="text-[12px] text-ink-muted mt-1">提升 MyBatis-Plus 查询性能</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            MyBatis-Plus 是提升开发效率的利器，建议重点掌握：① BaseMapper 的通用 CRUD 方法；② LambdaQueryWrapper 条件构造器；③ 分页、乐观锁、逻辑删除等插件的使用；④ 代码生成器的配置。对于复杂查询，仍需要结合原生 MyBatis 的 XML 映射能力。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
