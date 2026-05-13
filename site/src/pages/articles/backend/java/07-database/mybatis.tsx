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
  { id: 'architecture', text: '二、整体架构', level: 2 },
  { id: 'workflow', text: '三、工作流程', level: 2 },
  { id: 'dynamic-sql', text: '四、动态 SQL（重点🔥）', level: 2 },
  { id: 'cache-mechanism', text: '五、缓存机制', level: 2 },
  { id: 'plugin-mechanism', text: '六、插件机制', level: 2 },
  { id: 'source-code', text: '七、源码分析', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function Mybatis({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              MyBatis 是一个<strong className="text-accent">半自动 ORM 框架</strong>，通过 XML 或注解将 Java 对象与 SQL 语句映射，
              开发者可以完全控制 SQL，同时享受 ORM 的便利（自动参数绑定、结果集映射）。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么选择 MyBatis？">
            相比 Hibernate 的全自动 ORM，MyBatis 提供了更灵活的 SQL 控制能力，适合复杂查询和性能敏感场景。它不隐藏 SQL，而是让 SQL 成为一等公民，便于优化和调试。
          </Callout>

          <h2 id="core-concept" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、核心概念
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            MyBatis 的核心组件包括：
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">组件</th>
                <th className="text-left p-3 font-semibold text-ink">作用</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">SqlSessionFactory</td>
                <td className="p-3">工厂类，用于创建 SqlSession（单例模式）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">SqlSession</td>
                <td className="p-3">会话对象，执行 SQL 的核心 API（非线程安全）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">Mapper 接口</td>
                <td className="p-3">DAO 层接口，定义数据操作方法</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">XML Mapper</td>
                <td className="p-3">SQL 映射文件，包含 SQL 语句和映射规则</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">Configuration</td>
                <td className="p-3">全局配置对象，存储所有配置信息</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`// 1. 创建 SqlSessionFactory（应用启动时创建一次）
String resource = "mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

// 2. 获取 SqlSession（每次数据库操作创建新的）
try (SqlSession session = sqlSessionFactory.openSession()) {
    // 3. 获取 Mapper 代理对象
    UserMapper mapper = session.getMapper(UserMapper.class);
    
    // 4. 执行查询
    User user = mapper.selectUserById(1L);
    
    // 5. 提交事务（如果是写操作）
    session.commit();
}

// Mapper 接口定义
public interface UserMapper {
    User selectUserById(Long id);
    List<User> selectAllUsers();
    void insertUser(User user);
    void updateUser(User user);
    void deleteUser(Long id);
}`}
            language="java"
            highlights={[4, 7, 9, 12, 15]}
            filename="MyBatisUsage.java"
            description="MyBatis 基本使用流程"
          />

          <SideNote label="SqlSession 线程安全">
            <code>SqlSession</code> 不是线程安全的，因此不能共享。最佳实践是每个线程创建自己的 <code>SqlSession</code>，或使用 Spring 管理的 <code>SqlSessionTemplate</code>（线程安全）。
          </SideNote>

          <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、整体架构
          </h2>

          <DiagramBlock title="MyBatis 架构分层">
            {`\`\`\`mermaid
graph TB
    A[API 接口层] --> B[数据处理层]
    B --> C[基础支撑层]
    
    subgraph "API 接口层"
        A1[SqlSession]
        A2[Mapper 接口]
    end
    
    subgraph "数据处理层"
        B1[配置解析]
        B2[SQL 解析]
        B3[参数映射]
        B4[结果集映射]
    end
    
    subgraph "基础支撑层"
        C1[连接管理]
        C2[事务管理]
        C3[缓存管理]
        C4[日志管理]
    end
    
    A1 --> B1
    A2 --> B2
    B3 --> C1
    B4 --> C3
\`\`\``}
          </DiagramBlock>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>三层架构说明：</strong>
          </p>
          <ol className="list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-6 space-y-2">
            <li><strong>API 接口层</strong>：提供 <code>SqlSession</code> 和 Mapper 接口，是开发者直接使用的 API</li>
            <li><strong>数据处理层</strong>：负责 SQL 解析、参数映射、结果集映射等核心逻辑</li>
            <li><strong>基础支撑层</strong>：提供连接池、事务管理、缓存、日志等基础设施</li>
          </ol>

          <h2 id="workflow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、工作流程
          </h2>

          <DiagramBlock title="MyBatis 执行流程">
            {`\`\`\`mermaid
sequenceDiagram
    participant App as 应用程序
    participant Session as SqlSession
    participant Mapper as Mapper 代理
    participant Executor as Executor
    participant DB as 数据库
    
    App->>Session: 获取 Mapper
    Session->>Mapper: 创建代理对象
    App->>Mapper: 调用方法
    Mapper->>Executor: 执行 SQL
    Executor->>DB: 发送 SQL
    DB-->>Executor: 返回结果
    Executor-->>Mapper: 映射结果集
    Mapper-->>App: 返回 Java 对象
\`\`\``}
          </DiagramBlock>

          <Playground
            code={`<!-- UserMapper.xml -->
<mapper namespace="com.example.mapper.UserMapper">
    
    <!-- 结果映射 -->
    <resultMap id="UserResultMap" type="User">
        <id property="id" column="user_id"/>
        <result property="name" column="user_name"/>
        <result property="email" column="user_email"/>
    </resultMap>
    
    <!-- 查询语句 -->
    <select id="selectUserById" resultMap="UserResultMap">
        SELECT user_id, user_name, user_email 
        FROM users 
        WHERE user_id = #{id}
    </select>
    
    <!-- 插入语句 -->
    <insert id="insertUser" parameterType="User">
        INSERT INTO users (user_name, user_email) 
        VALUES (#{name}, #{email})
    </insert>
    
    <!-- 更新语句 -->
    <update id="updateUser" parameterType="User">
        UPDATE users 
        SET user_name = #{name}, user_email = #{email}
        WHERE user_id = #{id}
    </update>
    
    <!-- 删除语句 -->
    <delete id="deleteUser">
        DELETE FROM users WHERE user_id = #{id}
    </delete>
    
</mapper>`}
            language="xml"
            highlights={[5, 12, 19, 25, 32]}
            filename="UserMapper.xml"
            description="Mapper XML 配置示例"
          />

          <SideNote label="#{} vs ${}">
            <strong><code>#{}</code></strong>：预编译参数（PreparedStatement），防止 SQL 注入，推荐使用。<br/><br/>
            <strong><code>${}</code></strong>：字符串替换，直接拼接 SQL，存在注入风险，仅用于动态表名/列名等场景。
          </SideNote>

          <h2 id="dynamic-sql" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、动态 SQL（重点🔥）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            MyBatis 最强大的特性之一是<strong className="text-accent">动态 SQL</strong>，可以根据条件动态生成 SQL 语句。主要标签包括：
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">标签</th>
                <th className="text-left p-3 font-semibold text-ink">用途</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">&lt;if&gt;</td>
                <td className="p-3">条件判断</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">&lt;choose&gt;&lt;when&gt;&lt;otherwise&gt;</td>
                <td className="p-3">多选一（类似 switch-case）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">&lt;where&gt;</td>
                <td className="p-3">智能处理 WHERE 子句（自动去除多余 AND/OR）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">&lt;set&gt;</td>
                <td className="p-3">智能处理 SET 子句（自动去除多余逗号）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">&lt;foreach&gt;</td>
                <td className="p-3">遍历集合（IN 查询、批量插入）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">&lt;trim&gt;</td>
                <td className="p-3">自定义前后缀处理</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`<!-- 动态查询示例 -->
<select id="selectUsersByCondition" resultMap="UserResultMap">
    SELECT * FROM users
    <where>
        <if test="name != null and name != ''">
            AND user_name LIKE CONCAT('%', #{name}, '%')
        </if>
        <if test="email != null and email != ''">
            AND user_email = #{email}
        </if>
        <if test="minAge != null">
            AND age &gt;= #{minAge}
        </if>
        <if test="maxAge != null">
            AND age &lt;= #{maxAge}
        </if>
    </where>
    ORDER BY create_time DESC
</select>

<!-- 批量插入示例 -->
<insert id="batchInsertUsers">
    INSERT INTO users (user_name, user_email, age) VALUES
    <foreach collection="users" item="user" separator=",">
        (#{user.name}, #{user.email}, #{user.age})
    </foreach>
</insert>

<!-- IN 查询示例 -->
<select id="selectUsersByIds" resultMap="UserResultMap">
    SELECT * FROM users
    WHERE user_id IN
    <foreach collection="ids" item="id" open="(" separator="," close=")">
        #{id}
    </foreach>
</select>

<!-- 动态更新示例 -->
<update id="updateUserSelective">
    UPDATE users
    <set>
        <if test="name != null">user_name = #{name},</if>
        <if test="email != null">user_email = #{email},</if>
        <if test="age != null">age = #{age},</if>
    </set>
    WHERE user_id = #{id}
</update>`}
            language="xml"
            highlights={[4, 22, 30, 40]}
            filename="DynamicSQL.xml"
            description="动态 SQL 实战示例"
          />

          <Callout type="warning" title="<where> 标签的优势">
            使用 <code>&lt;where&gt;</code> 标签可以自动处理以下问题：<br/>
            1. 如果没有任何条件成立，自动省略 WHERE 关键字<br/>
            2. 如果第一个条件是 AND 或 OR，自动去除<br/>
            3. 避免手动拼接 SQL 时的语法错误
          </Callout>

          <h2 id="cache-mechanism" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、缓存机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            MyBatis 提供两级缓存机制，用于提升查询性能：
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-light border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">缓存级别</th>
                <th className="text-left p-3 font-semibold text-ink">作用域</th>
                <th className="text-left p-3 font-semibold text-ink">默认开启</th>
                <th className="text-left p-3 font-semibold text-ink">特点</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">一级缓存</td>
                <td className="p-3">SqlSession 级别</td>
                <td className="p-3 text-green">✅ 是</td>
                <td className="p-3">基于 HashMap，同一会话内共享</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3 font-mono text-accent">二级缓存</td>
                <td className="p-3">Mapper Namespace 级别</td>
                <td className="p-3 text-rose">❌ 否</td>
                <td className="p-3">跨会话共享，需手动配置</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`<!-- 开启二级缓存（在 Mapper XML 中） -->
<mapper namespace="com.example.mapper.UserMapper">
    
    <!-- 启用二级缓存 -->
    <cache 
        eviction="LRU"           <!-- 回收策略：LRU/FIFO/SOFT/WEAK -->
        flushInterval="60000"    <!-- 刷新间隔（毫秒） -->
        size="512"               <!-- 缓存最大条目数 -->
        readOnly="true"          <!-- 是否只读 -->
    />
    
    <!-- 单个语句禁用缓存 -->
    <select id="selectUserById" useCache="false">
        SELECT * FROM users WHERE user_id = #{id}
    </select>
    
    <!-- 清除缓存 -->
    <insert id="insertUser" flushCache="true">
        INSERT INTO users ...
    </insert>
    
</mapper>

<!-- 全局配置（mybatis-config.xml） -->
<settings>
    <!-- 开启二级缓存 -->
    <setting name="cacheEnabled" value="true"/>
</settings>`}
            language="xml"
            highlights={[5, 13, 18, 26]}
            filename="CacheConfig.xml"
            description="MyBatis 缓存配置"
          />

          <Callout type="danger" title="缓存注意事项">
            <strong>一级缓存失效场景</strong>：<br/>
            1. 不同的 SqlSession<br/>
            2. 相同的 SqlSession 但执行了增删改操作<br/>
            3. 手动调用 <code>session.clearCache()</code><br/><br/>
            <strong>二级缓存注意事项</strong>：<br/>
            1. 实体类必须实现 <code>Serializable</code> 接口<br/>
            2. 分布式环境下慎用（可能导致数据不一致）<br/>
            3. 建议使用 Redis 等外部缓存替代
          </Callout>

          <h2 id="plugin-mechanism" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、插件机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            MyBatis 允许通过插件拦截核心方法的执行，常用于：<strong className="text-accent">分页、性能监控、SQL 审计</strong>等场景。
          </p>

          <Playground
            code={`// 自定义插件示例：SQL 执行时间监控
@Intercepts({
    @Signature(
        type = StatementHandler.class,
        method = "query",
        args = {Statement.class, ResultHandler.class}
    )
})
public class SqlPerformancePlugin implements Interceptor {
    
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        long startTime = System.currentTimeMillis();
        
        // 执行目标方法
        Object result = invocation.proceed();
        
        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        
        if (duration > 1000) {
            System.out.println("慢 SQL 警告：执行耗时 " + duration + "ms");
        }
        
        return result;
    }
    
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
    
    @Override
    public void setProperties(Properties properties) {
        // 读取配置属性
    }
}

// 注册插件（mybatis-config.xml）
<plugins>
    <plugin interceptor="com.example.plugin.SqlPerformancePlugin"/>
</plugins>`}
            language="java"
            highlights={[2, 12, 16, 21, 38]}
            filename="SqlPerformancePlugin.java"
            description="MyBatis 插件开发示例"
          />

          <SideNote label="可拦截的对象">
            MyBatis 允许拦截以下四个核心对象：<br/>
            1. <code>Executor</code>：执行器（update、query、flushStatements 等）<br/>
            2. <code>ParameterHandler</code>：参数处理器<br/>
            3. <code>ResultSetHandler</code>：结果集处理器<br/>
            4. <code>StatementHandler</code>：语句处理器（prepare、parameterize 等）
          </SideNote>

          <h2 id="source-code" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、源码分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            MyBatis 的核心入口是 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">SqlSessionFactory</code>，让我们看看它是如何创建的：
          </p>

          <Playground
            code={`// SqlSessionFactoryBuilder 核心逻辑
public class SqlSessionFactoryBuilder {
    
    public SqlSessionFactory build(InputStream inputStream) {
        return build(inputStream, null, null);
    }
    
    public SqlSessionFactory build(InputStream inputStream, 
                                   String environment, 
                                   Properties properties) {
        try {
            // 1. 解析配置文件
            XMLConfigBuilder parser = new XMLConfigBuilder(inputStream, environment, properties);
            
            // 2. 构建 Configuration 对象
            Configuration config = parser.parse();
            
            // 3. 创建 DefaultSqlSessionFactory
            return new DefaultSqlSessionFactory(config);
        } catch (Exception e) {
            throw new RuntimeException("Error building SqlSession.", e);
        }
    }
}

// Configuration.parse() 关键步骤
public Configuration parse() {
    if (parsed) {
        throw new BuilderException("Each XMLConfigBuilder can only be used once.");
    }
    parsed = true;
    
    // 解析根节点 <configuration>
    parseConfiguration(parser.evalNode("/configuration"));
    return configuration;
}

private void parseConfiguration(XNode root) {
    try {
        // 解析各个配置节
        propertiesElement(root.evalNode("properties"));
        settingsElement(root.evalNode("settings"));
        typeAliasesElement(root.evalNode("typeAliases"));
        pluginsElement(root.evalNode("plugins"));
        objectFactoryElement(root.evalNode("objectFactory"));
        environmentsElement(root.evalNode("environments"));
        databaseIdProviderElement(root.evalNode("databaseIdProvider"));
        typeHandlersElement(root.evalNode("typeHandlers"));
        mapperElement(root.evalNode("mappers"));  // 解析 Mapper
    } catch (Exception e) {
        throw new BuilderException("Error parsing SQL Mapper Configuration.", e);
    }
}`}
            language="java"
            highlights={[13, 16, 19, 34, 40]}
            filename="SqlSessionFactoryBuilder.java"
            description="SqlSessionFactory 创建流程"
          />

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>Mapper 代理对象的创建过程：</strong>
          </p>

          <Playground
            code={`// MapperProxyFactory 创建代理对象
public class MapperProxyFactory<T> {
    
    private final Class<T> mapperInterface;
    
    public T newInstance(SqlSession sqlSession) {
        // 创建 MapperProxy（实现了 InvocationHandler）
        final MapperProxy<T> mapperProxy = new MapperProxy<>(sqlSession, mapperInterface);
        
        // 使用 JDK 动态代理创建代理对象
        return (T) Proxy.newProxyInstance(
            mapperInterface.getClassLoader(),
            new Class[]{mapperInterface},
            mapperProxy
        );
    }
}

// MapperProxy 拦截方法调用
public class MapperProxy<T> implements InvocationHandler {
    
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 如果是 Object 的方法，直接调用
        if (Object.class.equals(method.getDeclaringClass())) {
            return method.invoke(this, args);
        }
        
        // 获取 MapperMethod（缓存起来，避免重复创建）
        final MapperMethod mapperMethod = cachedMapperMethod(method);
        
        // 执行 SQL
        return mapperMethod.execute(sqlSession, args);
    }
    
    private MapperMethod cachedMapperMethod(Method method) {
        MapperMethod mapperMethod = methodCache.get(method);
        if (mapperMethod == null) {
            mapperMethod = new MapperMethod(mapperInterface, method, sqlSession.getConfiguration());
            methodCache.put(method, mapperMethod);
        }
        return mapperMethod;
    }
}`}
            language="java"
            highlights={[7, 11, 23, 30, 33]}
            filename="MapperProxy.java"
            description="Mapper 代理对象创建与调用"
          />

          <Callout type="info" title="Mapper 方法执行流程">
            1. 调用 Mapper 接口方法 → 2. MapperProxy 拦截 → 3. 根据方法签名找到对应的 MappedStatement → 4. Executor 执行 SQL → 5. ResultSetHandler 映射结果 → 6. 返回 Java 对象
          </Callout>

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
                <td className="p-3">MyBatis 是全自动 ORM</td>
                <td className="p-3">MyBatis 是半自动 ORM，需要手动编写 SQL</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">SqlSession 可以共享</td>
                <td className="p-3">SqlSession 非线程安全，每个线程应创建独立的 SqlSession</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">二级缓存默认开启</td>
                <td className="p-3">二级缓存需要手动配置，且实体类必须实现 Serializable</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">${} 和 #{} 可以互换</td>
                <td className="p-3">${} 存在 SQL 注入风险，应优先使用 #{}（预编译）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-light/50">
                <td className="p-3">动态 SQL 只能在 XML 中使用</td>
                <td className="p-3">也可以使用注解 + ScriptRunner，但 XML 更灵活</td>
              </tr>
            </tbody>
          </table>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'MyBatis 和 Hibernate 的区别？',
                answer: 'MyBatis 是半自动 ORM，需要手动编写 SQL，灵活性高，适合复杂查询；Hibernate 是全自动 ORM，自动生成 SQL，开发效率高，但性能调优困难。\n\n选择建议：简单 CRUD 用 Hibernate，复杂查询和性能敏感场景用 MyBatis。'
              },
              {
                question: 'MyBatis 的一级缓存和二级缓存有什么区别？',
                answer: '一级缓存：SqlSession 级别，默认开启，基于 HashMap，同一会话内共享。失效场景：不同 SqlSession、执行增删改、手动清除。\n\n二级缓存：Mapper Namespace 级别，需手动配置，跨会话共享。要求：实体类实现 Serializable，分布式环境慎用。'
              },
              {
                question: '#{} 和 ${} 的区别？',
                answer: '#{}：预编译参数（PreparedStatement），防止 SQL 注入，推荐使用。\n\n${}：字符串替换，直接拼接 SQL，存在注入风险，仅用于动态表名/列名等场景。\n\n示例：SELECT * FROM users WHERE id = #{id}（安全）vs SELECT * FROM ${tableName}（危险）。'
              },
              {
                question: 'MyBatis 的动态 SQL 有哪些标签？',
                answer: '常用标签：<if>（条件判断）、<choose><when><otherwise>（多选一）、<where>（智能 WHERE）、<set>（智能 SET）、<foreach>（遍历集合）、<trim>（自定义前后缀）。\n\n<where> 标签优势：自动省略 WHERE 关键字、去除多余 AND/OR，避免手动拼接 SQL 的语法错误。'
              },
              {
                question: 'MyBatis 的插件机制是如何实现的？',
                answer: 'MyBatis 插件基于责任链模式和动态代理实现。可以拦截四个核心对象：Executor、ParameterHandler、ResultSetHandler、StatementHandler。\n\n实现步骤：① 实现 Interceptor 接口；② 使用 @Intercepts 和 @Signature 注解声明拦截点；③ 在配置文件中注册插件。\n\n应用场景：分页插件（PageHelper）、性能监控、SQL 审计。'
              },
              {
                question: 'MyBatis 中 Mapper 接口的工作原理？',
                answer: 'Mapper 接口通过 JDK 动态代理实现：\n1. MapperProxyFactory 创建代理对象（Proxy.newProxyInstance）\n2. MapperProxy 实现 InvocationHandler，拦截方法调用\n3. 根据方法签名找到对应的 MappedStatement\n4. Executor 执行 SQL，ResultSetHandler 映射结果\n5. 返回 Java 对象\n\n关键点：Mapper 接口不需要实现类，MyBatis 自动生成代理对象。'
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <a href="/docs/07-database/jdbc" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">前置知识 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">JDBC 底层原理</div>
              <div className="text-[12px] text-ink-muted mt-1">MyBatis 基于 JDBC 封装</div>
            </a>
            <a href="/docs/07-database/mybatis-plus" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">进阶工具 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">MyBatis-Plus</div>
              <div className="text-[12px] text-ink-muted mt-1">MyBatis 增强工具</div>
            </a>
            <a href="/docs/06-spring-framework/spring-data-jpa" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">对比技术 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Spring Data JPA</div>
              <div className="text-[12px] text-ink-muted mt-1">全自动 ORM 方案</div>
            </a>
            <a href="/docs/07-database/sql-optimization" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">SQL 优化与索引</div>
              <div className="text-[12px] text-ink-muted mt-1">MyBatis SQL 性能优化</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            MyBatis 是 Java 生态中最流行的持久层框架之一，建议重点掌握：① 动态 SQL 的使用；② 缓存机制的原理和适用场景；③ 插件机制的扩展能力；④ 与 Spring 的集成方式。可以通过阅读 PageHelper 分页插件源码深入学习插件机制。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
