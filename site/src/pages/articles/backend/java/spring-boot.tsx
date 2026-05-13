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
  { id: 'auto-configuration', text: '一、自动化配置原理', level: 2 },
  { id: 'starter', text: '二、Starter 机制', level: 2 },
  { id: 'conditional', text: '三、条件装配', level: 2 },
  { id: 'externalized-config', text: '四、外部化配置', level: 2 },
  { id: 'startup-process', text: '五、启动流程解析', level: 2 },
  { id: 'embedded-server', text: '六、内嵌服务器', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function SpringBoot({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Spring Boot 是 Spring 的<strong className="text-accent">快速开发框架</strong>，通过"约定优于配置"的理念，提供自动化配置、Starter 依赖和内嵌服务器，
              简化 Spring 应用的初始搭建和开发过程，实现"开箱即用"的开发体验。
            </p>
          </blockquote>

          <Callout type="tip" title="Spring Boot 的核心价值">
            Spring Boot 不是替代 Spring，而是对 Spring 的封装和增强。它解决了传统 Spring 应用配置复杂、依赖管理混乱、部署繁琐等问题，让开发者专注于业务逻辑。
          </Callout>

          <h2 id="auto-configuration" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、自动化配置原理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            自动化配置是 Spring Boot 的核心机制，根据 classpath 中的依赖自动配置 Spring 应用上下文。
          </p>

          <DiagramBlock title="自动化配置工作流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────┐
│  @SpringBootApplication                 │
│  ┌───────────────────────────────────┐  │
│  │  @EnableAutoConfiguration         │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  @Import(AutoConfiguration  │  │  │
│  │  │   ImportSelector.class)     │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  AutoConfigurationImportSelector        │
│  - 读取 META-INF/spring.factories       │
│  - 加载所有自动配置类                    │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  条件过滤 (@Conditional)                 │
│  - @ConditionalOnClass                  │
│  - @ConditionalOnMissingBean            │
│  - @ConditionalOnProperty               │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  注册符合条件的 Bean                     │
│  - DataSource                           │
│  - JdbcTemplate                         │
│  - TransactionManager                   │
└─────────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`// 自动化配置类示例（简化版）
@Configuration
@ConditionalOnClass({ DataSource.class, JdbcTemplate.class })
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration {
    
    @Bean
    @ConditionalOnMissingBean
    public DataSource dataSource(DataSourceProperties properties) {
        // 创建 HikariCP 数据源
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(properties.getUrl());
        dataSource.setUsername(properties.getUsername());
        dataSource.setPassword(properties.getPassword());
        dataSource.setDriverClassName(properties.getDriverClassName());
        return dataSource;
    }
}

// 配置属性类
@ConfigurationProperties(prefix = "spring.datasource")
public class DataSourceProperties {
    private String url;
    private String username;
    private String password;
    private String driverClassName;
    
    // getters and setters...
}`}
            language="java"
            highlights={[2, 3, 4, 9, 23]}
            filename="AutoConfiguration.java"
            description="自动化配置类示例"
          />

          <SideNote label="spring.factories">
            Spring Boot 2.7+ 之前使用 <code className="font-mono text-[12px]">META-INF/spring.factories</code> 文件注册自动配置类；2.7+ 推荐使用 <code className="font-mono text-[12px]">META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports</code> 文件。
          </SideNote>

          <h2 id="starter" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Starter 机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Starter 是一组便捷的依赖描述符，将常用的依赖打包在一起，避免手动添加多个依赖。
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">Starter</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">功能</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">包含的主要依赖</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">spring-boot-starter-web</code></td>
                <td className="border border-border-light px-3 py-2">Web 开发</td>
                <td className="border border-border-light px-3 py-2">Spring MVC、Tomcat、Jackson</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">spring-boot-starter-data-jpa</code></td>
                <td className="border border-border-light px-3 py-2">JPA 数据访问</td>
                <td className="border border-border-light px-3 py-2">Hibernate、Spring Data JPA</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">spring-boot-starter-security</code></td>
                <td className="border border-border-light px-3 py-2">安全框架</td>
                <td className="border border-border-light px-3 py-2">Spring Security</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">spring-boot-starter-test</code></td>
                <td className="border border-border-light px-3 py-2">测试支持</td>
                <td className="border border-border-light px-3 py-2">JUnit、Mockito、AssertJ</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">spring-boot-starter-actuator</code></td>
                <td className="border border-border-light px-3 py-2">生产监控</td>
                <td className="border border-border-light px-3 py-2">Actuator 端点</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`<!-- pom.xml 示例 -->
<dependencies>
    <!-- 只需添加一个 starter，自动引入所有相关依赖 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- 数据库相关 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>

<!-- 无需指定版本号，由 spring-boot-starter-parent 统一管理 -->`}
            language="xml"
            highlights={[4, 10, 15]}
            filename="pom.xml"
            description="Starter 依赖示例"
          />

          <Callout type="tip" title="Starter 命名规范">
            <ul className="list-disc list-inside space-y-1 text-[13px] sm:text-[14px]">
              <li>官方 Starter：<code className="font-mono text-[12px]">spring-boot-starter-xxx</code></li>
              <li>第三方 Starter：<code className="font-mono text-[12px]">xxx-spring-boot-starter</code></li>
              <li>例如：mybatis-spring-boot-starter（MyBatis 官方提供）</li>
            </ul>
          </Callout>

          <h2 id="conditional" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、条件装配
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            条件装配是自动化配置的核心，通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">@Conditional</code> 注解根据特定条件决定是否注册 Bean。
          </p>

          <Playground
            code={`import org.springframework.boot.autoconfigure.condition.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConditionalExamples {
    
    // 1. 当 classpath 中存在指定类时才创建 Bean
    @Bean
    @ConditionalOnClass(name = "com.mysql.cj.jdbc.Driver")
    public DataSource mysqlDataSource() {
        return new MysqlDataSource();
    }
    
    // 2. 当容器中不存在指定 Bean 时才创建
    @Bean
    @ConditionalOnMissingBean(DataSource.class)
    public DataSource defaultDataSource() {
        return new H2DataSource();
    }
    
    // 3. 当配置文件中存在指定属性时才创建
    @Bean
    @ConditionalOnProperty(name = "app.cache.enabled", havingValue = "true")
    public CacheManager cacheManager() {
        return new RedisCacheManager();
    }
    
    // 4. 当 Web 应用环境时才创建
    @Bean
    @ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
    public FilterRegistrationBean loggingFilter() {
        return new FilterRegistrationBean(new LoggingFilter());
    }
    
    // 5. 组合条件（AND）
    @Bean
    @ConditionalOnClass(name = "org.springframework.data.jpa.repository.JpaRepository")
    @ConditionalOnMissingBean(JpaRepository.class)
    public JpaRepository jpaRepository() {
        return new JpaRepositoryImpl();
    }
    
    // 6. 自定义条件
    @Bean
    @Conditional(CustomCondition.class)
    public CustomService customService() {
        return new CustomService();
    }
}

// 自定义条件实现
public class CustomCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        // 自定义判断逻辑
        return context.getEnvironment().containsProperty("custom.feature.enabled");
    }
}`}
            language="java"
            highlights={[10, 17, 24, 31, 38, 46, 55]}
            filename="ConditionalAnnotations.java"
            description="条件装配注解示例"
          />

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">条件注解</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">@ConditionalOnClass</code></td>
                <td className="border border-border-light px-3 py-2">classpath 中存在指定类</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">@ConditionalOnMissingBean</code></td>
                <td className="border border-border-light px-3 py-2">容器中不存在指定 Bean</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">@ConditionalOnProperty</code></td>
                <td className="border border-border-light px-3 py-2">配置文件中有指定属性</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">@ConditionalOnWebApplication</code></td>
                <td className="border border-border-light px-3 py-2">Web 应用环境</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">@ConditionalOnBean</code></td>
                <td className="border border-border-light px-3 py-2">容器中存在指定 Bean</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">@ConditionalOnMissingClass</code></td>
                <td className="border border-border-light px-3 py-2">classpath 中不存在指定类</td>
              </tr>
            </tbody>
          </table>

          <h2 id="externalized-config" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、外部化配置
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring Boot 支持多种外部化配置方式，按优先级从高到低排列。
          </p>

          <Playground
            code={`# application.yml 示例
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: secret
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

# 自定义配置
app:
  name: My Application
  version: 1.0.0
  features:
    cache-enabled: true
    max-retry-count: 3


// 读取配置值
@RestController
public class ConfigController {
    
    // 方式 1：@Value 注入单个值
    @Value("${'{'}app.name{'}'}")
    private String appName;
    
    // 方式 2：@ConfigurationProperties 批量注入
    @Component
    @ConfigurationProperties(prefix = "app.features")
    public class AppFeatures {
        private boolean cacheEnabled;
        private int maxRetryCount;
        
        // getters and setters...
    }
    
    @GetMapping("/config")
    public Map<String, Object> getConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put("appName", appName);
        return config;
    }
}`}
            language="yaml"
            highlights={[2, 7, 19]}
            filename="application.yml"
            description="外部化配置示例"
          />

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">优先级</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">配置来源</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2">1（最高）</td>
                <td className="border border-border-light px-3 py-2">命令行参数（--server.port=9090）</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2">2</td>
                <td className="border border-border-light px-3 py-2">JAR 包外的 application-&#123;profile&#125;.yml</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">3</td>
                <td className="border border-border-light px-3 py-2">JAR 包内的 application-&#123;profile&#125;.yml</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2">4</td>
                <td className="border border-border-light px-3 py-2">JAR 包外的 application.yml</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">5</td>
                <td className="border border-border-light px-3 py-2">JAR 包内的 application.yml</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2">6（最低）</td>
                <td className="border border-border-light px-3 py-2">@PropertySource 注解指定的文件</td>
              </tr>
            </tbody>
          </table>

          <SideNote label="Profile 配置">
            使用 <code className="font-mono text-[12px]">spring.profiles.active</code> 激活特定环境的配置，如 <code className="font-mono text-[12px]">application-dev.yml</code>、<code className="font-mono text-[12px]">application-prod.yml</code>。
          </SideNote>

          <h2 id="startup-process" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、启动流程解析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring Boot 启动流程分为多个阶段，核心是 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">SpringApplication.run()</code> 方法。
          </p>

          <DiagramBlock title="Spring Boot 启动流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────┐
│  SpringApplication.run()                │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  1. 创建 SpringApplication 实例         │
│     - 推断应用类型（WEB/REACTIVE/NONE） │
│     - 加载 ApplicationContextInitializer│
│     - 加载 ApplicationListener          │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  2. 运行 Runners                        │
│     - ApplicationRunner                 │
│     - CommandLineRunner                 │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  3. 准备 Environment                    │
│     - 加载配置文件                       │
│     - 设置 Profile                      │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  4. 创建 ApplicationContext             │
│     - AnnotationConfigServletWebServer  │
│       ApplicationContext                │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  5. 刷新上下文（Spring IOC 初始化）      │
│     - 扫描 Bean 定义                    │
│     - 自动化配置                        │
│     - 创建 Bean 实例                    │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  6. 启动内嵌服务器（Tomcat/Jetty）       │
│     - 创建 ServletWebServerFactory      │
│     - 启动服务器并监听端口               │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  7. 调用 Runner                         │
│     - ApplicationRunner.run()           │
│     - CommandLineRunner.run()           │
└─────────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class MyApplication {
    
    public static void main(String[] args) {
        // 标准启动方式
        SpringApplication.run(MyApplication.class, args);
        
        // 自定义启动配置
        // SpringApplication app = new SpringApplication(MyApplication.class);
        // app.setBannerMode(Banner.Mode.OFF);  // 关闭 Banner
        // app.run(args);
    }
}

// 应用启动后执行的逻辑
@Component
public class MyCommandLineRunner implements CommandLineRunner {
    
    @Override
    public void run(String... args) throws Exception {
        System.out.println("应用启动完成！");
        System.out.println("传入参数: " + String.join(", ", args));
    }
}`}
            language="java"
            highlights={[6, 11, 21, 25]}
            filename="SpringBootApplication.java"
            description="Spring Boot 启动类示例"
          />

          <Callout type="tip" title="@SpringBootApplication 的组成">
            <code className="font-mono text-[12px]">@SpringBootApplication</code> 是一个组合注解，等价于：
            <ul className="list-disc list-inside space-y-1 mt-2 text-[13px] sm:text-[14px]">
              <li><code className="font-mono text-[12px]">@SpringBootConfiguration</code>：标识配置类</li>
              <li><code className="font-mono text-[12px]">@EnableAutoConfiguration</code>：启用自动化配置</li>
              <li><code className="font-mono text-[12px]">@ComponentScan</code>：组件扫描（默认扫描主类所在包及其子包）</li>
            </ul>
          </Callout>

          <h2 id="embedded-server" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、内嵌服务器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring Boot 内嵌了 Tomcat、Jetty 或 Undertow 服务器，无需单独部署 WAR 包。
          </p>

          <Playground
            code={`# application.yml - 服务器配置
server:
  port: 8080                          # 端口号
  servlet:
    context-path: /api                # 上下文路径
    encoding:
      charset: UTF-8
      enabled: true
  tomcat:
    threads:
      max: 200                        # 最大线程数
      min-spare: 10                   # 最小空闲线程
    max-connections: 8192             # 最大连接数
    accept-count: 100                 # 等待队列长度
  compression:
    enabled: true                     # 启用压缩
    mime-types: text/html,application/json


// 切换内嵌服务器（pom.xml）
<!-- 默认使用 Tomcat -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- 切换到 Jetty -->
<!--
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
-->`}
            language="yaml"
            highlights={[2, 9, 21]}
            filename="EmbeddedServerConfig.yml"
            description="内嵌服务器配置"
          />

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">服务器</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">特点</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2">Tomcat</td>
                <td className="border border-border-light px-3 py-2">默认服务器，成熟稳定</td>
                <td className="border border-border-light px-3 py-2">通用场景（推荐）</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2">Jetty</td>
                <td className="border border-border-light px-3 py-2">轻量级，适合长连接</td>
                <td className="border border-border-light px-3 py-2">WebSocket、长时间运行的应用</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">Undertow</td>
                <td className="border border-border-light px-3 py-2">高性能，低内存占用</td>
                <td className="border border-border-light px-3 py-2">高并发场景</td>
              </tr>
            </tbody>
          </table>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区 1：Spring Boot 不需要理解 Spring">
            <p className="text-[13px] sm:text-[14px] leading-relaxed">
              <strong>错误认知：</strong>使用 Spring Boot 可以跳过 Spring 基础知识。<br/>
              <strong>真相：</strong>Spring Boot 是 Spring 的封装，底层仍然是 Spring IoC、AOP 等核心概念。不理解 Spring 会导致问题排查困难，无法充分利用 Spring Boot 的能力。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：自动化配置是魔法">
            <p className="text-[13px] sm:text-[14px] leading-relaxed">
              <strong>错误认知：</strong>自动化配置是神秘的魔法，无法控制。<br/>
              <strong>真相：</strong>自动化配置基于明确的条件注解和配置类，可以通过查看源码、调试、排除特定配置类等方式完全掌控。使用 <code className="font-mono text-[12px]">--debug</code> 参数可以查看自动化配置报告。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：单体应用不应该用 Spring Boot">
            <p className="text-[13px] sm:text-[14px] leading-relaxed">
              <strong>错误认知：</strong>Spring Boot 只适合微服务，单体应用应该用传统 Spring。<br/>
              <strong>真相：</strong>Spring Boot 适用于任何类型的 Spring 应用，包括单体应用。它简化了配置、依赖管理和部署，即使是单体应用也能从中受益。
            </p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "Spring Boot 的核心优势是什么？",
                answer: "核心优势：① 自动化配置：根据 classpath 自动配置 Spring 应用；② Starter 依赖：简化依赖管理；③ 内嵌服务器：无需部署 WAR 包，直接运行 JAR；④ 生产就绪：提供 Actuator 监控端点；⑤ 无代码生成和 XML 配置：纯 Java 配置，开发效率高。"
              },
              {
                question: "Spring Boot 自动化配置的原理？",
                answer: "自动化配置原理：① @SpringBootApplication 包含 @EnableAutoConfiguration；② @EnableAutoConfiguration 通过 @Import 导入 AutoConfigurationImportSelector；③ 该类读取 META-INF/spring.factories（或 .imports 文件）中的所有自动配置类；④ 根据 @Conditional 条件注解过滤，只注册符合条件的配置类；⑤ 配置类中定义 @Bean，完成自动配置。"
              },
              {
                question: "@SpringBootApplication 注解的组成？",
                answer: "@SpringBootApplication 是组合注解，包含：① @SpringBootConfiguration：标识这是一个配置类，等同于 @Configuration；② @EnableAutoConfiguration：启用自动化配置；③ @ComponentScan：组件扫描，默认扫描主类所在包及其子包。可以通过 exclude 属性排除特定的自动配置类。"
              },
              {
                question: "如何自定义 Starter？",
                answer: "自定义 Starter 步骤：① 创建 autoconfigure 模块，编写自动配置类（@Configuration + @Conditional）；② 创建 starter 模块，依赖 autoconfigure 模块和其他需要的库；③ 在 resources/META-INF/spring.factories（或 .imports）中注册自动配置类；④ 发布到 Maven 仓库；⑤ 使用者只需添加 starter 依赖即可。参考官方 Starter 的命名规范。"
              },
              {
                question: "Spring Boot 启动流程是怎样的？",
                answer: "启动流程：① 创建 SpringApplication 实例，推断应用类型；② 加载 ApplicationContextInitializer 和 ApplicationListener；③ 准备 Environment，加载配置文件；④ 创建 ApplicationContext（AnnotationConfigServletWebServerApplicationContext）；⑤ 刷新上下文，扫描 Bean、自动化配置、创建 Bean；⑥ 启动内嵌服务器（Tomcat）；⑦ 调用 ApplicationRunner 和 CommandLineRunner。"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring Boot 是现代 Java 开发的基础，与多个技术栈紧密相关：
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><strong className="text-ink">前置知识：</strong><a href="/docs/06-spring-framework/spring-core" className="text-accent hover:underline ml-1">Spring IoC</a>、<a href="/docs/06-spring-framework/spring-aop" className="text-accent hover:underline ml-1">Spring AOP</a></li>
            <li><strong className="text-ink">后续学习：</strong><a href="/docs/08-microservices/spring-cloud-core" className="text-accent hover:underline ml-1">Spring Cloud</a>、<a href="/docs/06-spring-framework/spring-data-jpa" className="text-accent hover:underline ml-1">Spring Data JPA</a></li>
            <li><strong className="text-ink">相关技术：</strong>Maven、Gradle、Docker、Kubernetes</li>
          </ul>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
