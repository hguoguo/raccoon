import{j as e,g as s}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as i}from"./SideNote-BKvanovA.js";import{C as t,A as l,S as d}from"./ArticleNav-DhfiS38Y.js";import{D as n}from"./DiagramBlock-CLaKE9_7.js";import{I as p}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"auto-configuration",text:"一、自动化配置原理",level:2},{id:"starter",text:"二、Starter 机制",level:2},{id:"conditional",text:"三、条件装配",level:2},{id:"externalized-config",text:"四、外部化配置",level:2},{id:"startup-process",text:"五、启动流程解析",level:2},{id:"embedded-server",text:"六、内嵌服务器",level:2},{id:"misconceptions",text:"七、常见误区",level:2},{id:"interview",text:"八、面试真题",level:2},{id:"related",text:"九、知识关联",level:2}];function f({meta:o}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(a,{meta:o,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Spring Boot 是 Spring 的",e.jsx("strong",{className:"text-accent",children:"快速开发框架"}),'，通过"约定优于配置"的理念，提供自动化配置、Starter 依赖和内嵌服务器， 简化 Spring 应用的初始搭建和开发过程，实现"开箱即用"的开发体验。']})}),e.jsx(t,{type:"tip",title:"Spring Boot 的核心价值",children:"Spring Boot 不是替代 Spring，而是对 Spring 的封装和增强。它解决了传统 Spring 应用配置复杂、依赖管理混乱、部署繁琐等问题，让开发者专注于业务逻辑。"}),e.jsx("h2",{id:"auto-configuration",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、自动化配置原理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"自动化配置是 Spring Boot 的核心机制，根据 classpath 中的依赖自动配置 Spring 应用上下文。"}),e.jsx(n,{title:"自动化配置工作流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
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
            `})}),e.jsx(r,{code:`// 自动化配置类示例（简化版）
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
}`,language:"java",highlights:[2,3,4,9,23],filename:"AutoConfiguration.java",description:"自动化配置类示例"}),e.jsxs(i,{label:"spring.factories",children:["Spring Boot 2.7+ 之前使用 ",e.jsx("code",{className:"font-mono text-[12px]",children:"META-INF/spring.factories"})," 文件注册自动配置类；2.7+ 推荐使用 ",e.jsx("code",{className:"font-mono text-[12px]",children:"META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports"})," 文件。"]}),e.jsx("h2",{id:"starter",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、Starter 机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Starter 是一组便捷的依赖描述符，将常用的依赖打包在一起，避免手动添加多个依赖。"}),e.jsxs("table",{className:"w-full border-collapse my-6 text-[13px] sm:text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"Starter"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"功能"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"包含的主要依赖"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"spring-boot-starter-web"})}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Web 开发"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Spring MVC、Tomcat、Jackson"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"spring-boot-starter-data-jpa"})}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"JPA 数据访问"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Hibernate、Spring Data JPA"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"spring-boot-starter-security"})}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"安全框架"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Spring Security"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"spring-boot-starter-test"})}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"测试支持"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"JUnit、Mockito、AssertJ"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"spring-boot-starter-actuator"})}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"生产监控"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Actuator 端点"})]})]})]}),e.jsx(r,{code:`<!-- pom.xml 示例 -->
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

<!-- 无需指定版本号，由 spring-boot-starter-parent 统一管理 -->`,language:"xml",highlights:[4,10,15],filename:"pom.xml",description:"Starter 依赖示例"}),e.jsx(t,{type:"tip",title:"Starter 命名规范",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-[13px] sm:text-[14px]",children:[e.jsxs("li",{children:["官方 Starter：",e.jsx("code",{className:"font-mono text-[12px]",children:"spring-boot-starter-xxx"})]}),e.jsxs("li",{children:["第三方 Starter：",e.jsx("code",{className:"font-mono text-[12px]",children:"xxx-spring-boot-starter"})]}),e.jsx("li",{children:"例如：mybatis-spring-boot-starter（MyBatis 官方提供）"})]})}),e.jsx("h2",{id:"conditional",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、条件装配"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["条件装配是自动化配置的核心，通过 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@Conditional"})," 注解根据特定条件决定是否注册 Bean。"]}),e.jsx(r,{code:`import org.springframework.boot.autoconfigure.condition.*;
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
}`,language:"java",highlights:[10,17,24,31,38,46,55],filename:"ConditionalAnnotations.java",description:"条件装配注解示例"}),e.jsxs("table",{className:"w-full border-collapse my-6 text-[13px] sm:text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"条件注解"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"@ConditionalOnClass"})}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"classpath 中存在指定类"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"@ConditionalOnMissingBean"})}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"容器中不存在指定 Bean"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"@ConditionalOnProperty"})}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"配置文件中有指定属性"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"@ConditionalOnWebApplication"})}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Web 应用环境"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"@ConditionalOnBean"})}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"容器中存在指定 Bean"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:e.jsx("code",{className:"font-mono text-[12px]",children:"@ConditionalOnMissingClass"})}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"classpath 中不存在指定类"})]})]})]}),e.jsx("h2",{id:"externalized-config",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、外部化配置"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spring Boot 支持多种外部化配置方式，按优先级从高到低排列。"}),e.jsx(r,{code:`# application.yml 示例
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
    @Value("{app.name{'}'}")
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
}`,language:"yaml",highlights:[2,7,19],filename:"application.yml",description:"外部化配置示例"}),e.jsxs("table",{className:"w-full border-collapse my-6 text-[13px] sm:text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"优先级"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"配置来源"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"1（最高）"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"命令行参数（--server.port=9090）"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"2"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"JAR 包外的 application-{profile}.yml"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"3"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"JAR 包内的 application-{profile}.yml"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"4"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"JAR 包外的 application.yml"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"5"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"JAR 包内的 application.yml"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"6（最低）"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"@PropertySource 注解指定的文件"})]})]})]}),e.jsxs(i,{label:"Profile 配置",children:["使用 ",e.jsx("code",{className:"font-mono text-[12px]",children:"spring.profiles.active"})," 激活特定环境的配置，如 ",e.jsx("code",{className:"font-mono text-[12px]",children:"application-dev.yml"}),"、",e.jsx("code",{className:"font-mono text-[12px]",children:"application-prod.yml"}),"。"]}),e.jsx("h2",{id:"startup-process",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、启动流程解析"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Spring Boot 启动流程分为多个阶段，核心是 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"SpringApplication.run()"})," 方法。"]}),e.jsx(n,{title:"Spring Boot 启动流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
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
            `})}),e.jsx(r,{code:`import org.springframework.boot.SpringApplication;
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
}`,language:"java",highlights:[6,11,21,25],filename:"SpringBootApplication.java",description:"Spring Boot 启动类示例"}),e.jsxs(t,{type:"tip",title:"@SpringBootApplication 的组成",children:[e.jsx("code",{className:"font-mono text-[12px]",children:"@SpringBootApplication"})," 是一个组合注解，等价于：",e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2 text-[13px] sm:text-[14px]",children:[e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[12px]",children:"@SpringBootConfiguration"}),"：标识配置类"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[12px]",children:"@EnableAutoConfiguration"}),"：启用自动化配置"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[12px]",children:"@ComponentScan"}),"：组件扫描（默认扫描主类所在包及其子包）"]})]})]}),e.jsx("h2",{id:"embedded-server",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、内嵌服务器"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spring Boot 内嵌了 Tomcat、Jetty 或 Undertow 服务器，无需单独部署 WAR 包。"}),e.jsx(r,{code:`# application.yml - 服务器配置
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
-->`,language:"yaml",highlights:[2,9,21],filename:"EmbeddedServerConfig.yml",description:"内嵌服务器配置"}),e.jsxs("table",{className:"w-full border-collapse my-6 text-[13px] sm:text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"服务器"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"特点"}),e.jsx("th",{className:"border border-border-light px-3 py-2 text-left font-semibold",children:"适用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Tomcat"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"默认服务器，成熟稳定"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"通用场景（推荐）"})]}),e.jsxs("tr",{className:"bg-parchment-light/30",children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Jetty"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"轻量级，适合长连接"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"WebSocket、长时间运行的应用"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-3 py-2",children:"Undertow"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"高性能，低内存占用"}),e.jsx("td",{className:"border border-border-light px-3 py-2",children:"高并发场景"})]})]})]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、常见误区"}),e.jsx(t,{type:"danger",title:"误区 1：Spring Boot 不需要理解 Spring",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-relaxed",children:[e.jsx("strong",{children:"错误认知："}),"使用 Spring Boot 可以跳过 Spring 基础知识。",e.jsx("br",{}),e.jsx("strong",{children:"真相："}),"Spring Boot 是 Spring 的封装，底层仍然是 Spring IoC、AOP 等核心概念。不理解 Spring 会导致问题排查困难，无法充分利用 Spring Boot 的能力。"]})}),e.jsx(t,{type:"danger",title:"误区 2：自动化配置是魔法",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-relaxed",children:[e.jsx("strong",{children:"错误认知："}),"自动化配置是神秘的魔法，无法控制。",e.jsx("br",{}),e.jsx("strong",{children:"真相："}),"自动化配置基于明确的条件注解和配置类，可以通过查看源码、调试、排除特定配置类等方式完全掌控。使用 ",e.jsx("code",{className:"font-mono text-[12px]",children:"--debug"})," 参数可以查看自动化配置报告。"]})}),e.jsx(t,{type:"danger",title:"误区 3：单体应用不应该用 Spring Boot",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-relaxed",children:[e.jsx("strong",{children:"错误认知："}),"Spring Boot 只适合微服务，单体应用应该用传统 Spring。",e.jsx("br",{}),e.jsx("strong",{children:"真相："}),"Spring Boot 适用于任何类型的 Spring 应用，包括单体应用。它简化了配置、依赖管理和部署，即使是单体应用也能从中受益。"]})}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、面试真题"}),e.jsx(p,{questions:[{question:"Spring Boot 的核心优势是什么？",answer:"核心优势：① 自动化配置：根据 classpath 自动配置 Spring 应用；② Starter 依赖：简化依赖管理；③ 内嵌服务器：无需部署 WAR 包，直接运行 JAR；④ 生产就绪：提供 Actuator 监控端点；⑤ 无代码生成和 XML 配置：纯 Java 配置，开发效率高。"},{question:"Spring Boot 自动化配置的原理？",answer:"自动化配置原理：① @SpringBootApplication 包含 @EnableAutoConfiguration；② @EnableAutoConfiguration 通过 @Import 导入 AutoConfigurationImportSelector；③ 该类读取 META-INF/spring.factories（或 .imports 文件）中的所有自动配置类；④ 根据 @Conditional 条件注解过滤，只注册符合条件的配置类；⑤ 配置类中定义 @Bean，完成自动配置。"},{question:"@SpringBootApplication 注解的组成？",answer:"@SpringBootApplication 是组合注解，包含：① @SpringBootConfiguration：标识这是一个配置类，等同于 @Configuration；② @EnableAutoConfiguration：启用自动化配置；③ @ComponentScan：组件扫描，默认扫描主类所在包及其子包。可以通过 exclude 属性排除特定的自动配置类。"},{question:"如何自定义 Starter？",answer:"自定义 Starter 步骤：① 创建 autoconfigure 模块，编写自动配置类（@Configuration + @Conditional）；② 创建 starter 模块，依赖 autoconfigure 模块和其他需要的库；③ 在 resources/META-INF/spring.factories（或 .imports）中注册自动配置类；④ 发布到 Maven 仓库；⑤ 使用者只需添加 starter 依赖即可。参考官方 Starter 的命名规范。"},{question:"Spring Boot 启动流程是怎样的？",answer:"启动流程：① 创建 SpringApplication 实例，推断应用类型；② 加载 ApplicationContextInitializer 和 ApplicationListener；③ 准备 Environment，加载配置文件；④ 创建 ApplicationContext（AnnotationConfigServletWebServerApplicationContext）；⑤ 刷新上下文，扫描 Bean、自动化配置、创建 Bean；⑥ 启动内嵌服务器（Tomcat）；⑦ 调用 ApplicationRunner 和 CommandLineRunner。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、知识关联"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spring Boot 是现代 Java 开发的基础，与多个技术栈紧密相关："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"前置知识："}),e.jsx("a",{href:"/docs/06-spring-framework/spring-core",className:"text-accent hover:underline ml-1",children:"Spring IoC"}),"、",e.jsx("a",{href:"/docs/06-spring-framework/spring-aop",className:"text-accent hover:underline ml-1",children:"Spring AOP"})]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"后续学习："}),e.jsx("a",{href:"/docs/08-microservices/spring-cloud-core",className:"text-accent hover:underline ml-1",children:"Spring Cloud"}),"、",e.jsx("a",{href:"/docs/06-spring-framework/spring-data-jpa",className:"text-accent hover:underline ml-1",children:"Spring Data JPA"})]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"相关技术："}),"Maven、Gradle、Docker、Kubernetes"]})]}),e.jsx(l,{...s(o.category,o.id)})]})}),e.jsx(d,{items:c})]})}export{f as default};
