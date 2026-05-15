import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as n}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as d}from"./SideNote-BKvanovA.js";import{C as l,A as a,S as x}from"./ArticleNav-DhfiS38Y.js";import{D as r}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const o=[{id:"definition",text:"一句话定义",level:2},{id:"standard-structure",text:"一、标准项目结构",level:2},{id:"maven-structure",text:"1.1 Maven 标准结构",level:3},{id:"gradle-structure",text:"1.2 Gradle 项目结构",level:3},{id:"layered-architecture",text:"二、分层架构设计",level:2},{id:"package-organization",text:"2.1 包组织方式",level:3},{id:"component-boundaries",text:"2.2 组件边界划分",level:3},{id:"naming-conventions",text:"三、命名规范",level:2},{id:"package-naming",text:"3.1 包名规范",level:3},{id:"class-naming",text:"3.2 类命名规范",level:3},{id:"coding-standards",text:"四、编码规范",level:2},{id:"style-guide",text:"4.1 代码风格指南",level:3},{id:"documentation",text:"4.2 文档规范",level:3},{id:"git-conventions",text:"五、Git 规范",level:2},{id:"branch-strategy",text:"5.1 分支策略",level:3},{id:"commit-message",text:"5.2 提交信息规范",level:3},{id:"code-review",text:"六、代码审查",level:2},{id:"review-process",text:"6.1 审查流程",level:3},{id:"quality-metrics",text:"6.2 质量指标",level:3},{id:"best-practices",text:"七、最佳实践",level:2},{id:"tools-integration",text:"7.1 工具集成",level:3},{id:"misconceptions",text:"八、常见误区",level:2},{id:"interview",text:"九、面试真题",level:2},{id:"related",text:"十、知识关联",level:2}];function N({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(n,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsx("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:"项目结构与规范是一套标准化的项目组织方式和开发约束，通过合理的目录结构、命名约定、编码风格和协作流程， 确保团队成员能够高效协作、代码易于维护、项目具备良好的可扩展性，是软件工程化开发的基础保障。"})}),e.jsx(l,{type:"tip",title:"为什么重视项目结构与规范？",children:"良好的项目结构与规范是软件项目的基石，直接影响开发效率、代码质量、维护成本和团队协作效果。规范先行，事半功倍。"}),e.jsx("h2",{id:"standard-structure",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、标准项目结构"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"标准化的项目结构是项目可维护性的基础，不同的构建工具有各自的标准结构。"}),e.jsx("h3",{id:"maven-structure",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.1 Maven 标准结构"}),e.jsx(r,{title:"Maven 标准目录结构",children:`graph TD
    ROOT["项目根目录"]
    ROOT --> SRC["src/"]
    ROOT --> TARGET["target/ (构建产物)"]
    ROOT --> POM["pom.xml"]
    
    SRC --> MAIN["main/"]
    SRC --> TEST["test/"]
    
    MAIN --> JAVA["java/ (源代码)"]
    MAIN --> RESOURCES["resources/ (配置文件)"]
    
    TEST --> TEST_JAVA["java/ (测试代码)"]
    TEST --> TEST_RESOURCES["resources/ (测试资源)"]
    
    JAVA --> COM["com/"]
    COM --> COMPANY["company/"]
    COMPANY --> PROJECT["project/"]
    
    style ROOT fill:#ffe1e1
    style JAVA fill:#e1f5ff
    style RESOURCES fill:#e1ffe1
    style TEST_JAVA fill:#fff4e1`}),e.jsx(t,{code:`my-project/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── myproject/
│   │   │               ├── controller/
│   │   │               │   ├── UserController.java
│   │   │               │   └── ProductController.java
│   │   │               ├── service/
│   │   │               │   ├── UserService.java
│   │   │               │   └── ProductService.java
│   │   │               ├── repository/
│   │   │               │   ├── UserRepository.java
│   │   │               │   └── ProductRepository.java
│   │   │               ├── dto/
│   │   │               │   ├── UserDTO.java
│   │   │               │   └── ProductDTO.java
│   │   │               ├── entity/
│   │   │               │   ├── UserEntity.java
│   │   │               │   └── ProductEntity.java
│   │   │               └── config/
│   │   │                   └── DatabaseConfig.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       ├── static/
│   │       │   ├── css/
│   │       │   ├── js/
│   │       │   └── images/
│   │       └── templates/
│   │           └── index.html
│   └── test/
│       ├── java/
│       │   └── com/
│       │       └── example/
│       │           └── myproject/
│       │               ├── service/
│       │               │   ├── UserServiceTest.java
│       │               │   └── ProductServiceTest.java
│       │               └── controller/
│       │                   └── UserControllerTest.java
│       └── resources/
│           └── test-data.sql`,language:"text",filename:"项目目录结构",description:"Maven 标准项目结构示例"}),e.jsx("h3",{id:"gradle-structure",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.2 Gradle 项目结构"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Gradle 项目结构与 Maven 基本相同，但构建脚本不同（build.gradle vs pom.xml）。"}),e.jsx(t,{code:`my-project/
├── build.gradle.kts
├── settings.gradle.kts
├── gradle.properties
├── gradlew
├── gradlew.bat
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── src/
│   ├── main/
│   │   ├── kotlin/ (或 java/)
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── myproject/
│   │   │               └── ... (与 Maven 相同的包结构)
│   │   └── resources/
│   │       └── ... (与 Maven 相同的资源结构)
│   └── test/
│       ├── kotlin/ (或 java/)
│       │   └── ... (与 Maven 相同的测试结构)
│       └── resources/
│           └── ... (与 Maven 相同的测试资源结构)
└── .gradle/ (Gradle 缓存) `,language:"text",filename:"项目目录结构",description:"Gradle 标准项目结构示例"}),e.jsxs(d,{children:[e.jsx("strong",{children:"Android 项目"}),"使用 Gradle 构建，结构略有不同，包含 app/、lib/ 等模块目录。"]}),e.jsx("h2",{id:"layered-architecture",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、分层架构设计"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"合理的分层架构有助于解耦、维护和扩展。常见的分层包括表现层、业务层、持久层等。"}),e.jsx("h3",{id:"package-organization",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.1 包组织方式"}),e.jsx(r,{title:"按功能分层的包结构",children:`graph TD
    ROOT["com.example.myproject"]
    ROOT --> CONTROLLER["controller/"]
    ROOT --> SERVICE["service/"]
    ROOT --> REPOSITORY["repository/"]
    ROOT --> DTO["dto/"]
    ROOT --> ENTITY["entity/"]
    ROOT --> CONFIG["config/"]
    ROOT --> UTIL["util/"]
    
    CONTROLLER --> UC["UserController"]
    CONTROLLER --> PC["ProductController"]
    
    SERVICE --> US["UserService"]
    SERVICE --> PS["ProductService"]
    
    REPOSITORY --> UR["UserRepository"]
    REPOSITORY --> PR["ProductRepository"]
    
    style ROOT fill:#ffe1e1
    style CONTROLLER fill:#e1f5ff
    style SERVICE fill:#e1ffe1
    style REPOSITORY fill:#fff4e1`}),e.jsx("h3",{id:"component-boundaries",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.2 组件边界划分"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep border-b-2 border-border",children:[e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"层"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"职责"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"访问规则"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"示例"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"Controller"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"处理HTTP请求响应"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"仅调用Service层"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"UserController"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"Service"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"业务逻辑处理"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"可调用Repository/外部服务"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"UserService"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"Repository"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"数据访问接口"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"仅访问数据库"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"UserRepository"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"Entity/DTO"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"数据传输对象"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"仅包含数据"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"UserEntity"})]})]})]}),e.jsx("h2",{id:"naming-conventions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、命名规范"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"一致的命名规范提高代码可读性，减少沟通成本。"}),e.jsx("h3",{id:"package-naming",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 包名规范"}),e.jsx(t,{code:`// 推荐：反向域名 + 项目名 + 层名
com.example.myproject.controller
com.example.myproject.service
com.example.myproject.repository
com.example.myproject.dto
com.example.myproject.entity
com.example.myproject.config
com.example.myproject.util

// 模块化项目
com.example.user-service.controller
com.example.product-service.controller
com.example.common.util`,language:"java",filename:"包命名示例",description:"Java 包命名规范"}),e.jsx("h3",{id:"class-naming",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 类命名规范"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep border-b-2 border-border",children:[e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"类型"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"命名规则"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"示例"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"类名"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"UpperCamelCase（大驼峰）"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"UserService, ProductController"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"方法名"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"lowerCamelCase（小驼峰）"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"getUserById(), saveUser()"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"常量名"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"UPPER_SNAKE_CASE（大蛇形）"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"MAX_CONNECTIONS, DEFAULT_TIMEOUT"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"变量名"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"lowerCamelCase（小驼峰）"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"userName, orderTotal"})]})]})]}),e.jsx("h2",{id:"coding-standards",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、编码规范"}),e.jsx("h3",{id:"style-guide",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 代码风格指南"}),e.jsx(t,{code:`public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    /**
     * 根据ID获取用户信息
     * 
     * @param userId 用户ID，不能为空
     * @return 用户实体，如果不存在返回null
     * @throws IllegalArgumentException 当userId为空时抛出
     */
    public UserEntity getUserById(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("用户ID不能为空");
        }
        
        return userRepository.findById(userId);
    }
    
    /**
     * 保存用户信息
     * 
     * @param user 用户实体，不能为空
     * @return 保存后的用户实体
     */
    public UserEntity saveUser(UserDTO user) {
        if (user == null) {
            throw new IllegalArgumentException("用户信息不能为空");
        }
        
        UserEntity entity = new UserEntity();
        entity.setName(user.getName());
        entity.setEmail(user.getEmail());
        entity.setPassword(passwordEncoder.encode(user.getPassword()));
        entity.setCreatedAt(LocalDateTime.now());
        
        return userRepository.save(entity);
    }
}`,language:"java",filename:"UserService.java",description:"符合规范的代码示例"}),e.jsx("h3",{id:"documentation",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.2 文档规范"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"良好的文档是代码可维护性的保障，包括类、方法、参数的详细说明。"}),e.jsxs(l,{type:"info",title:"文档标准",children:[e.jsx("strong",{children:"JavaDoc"}),"：使用标准 JavaDoc 注释格式，包含 @param、@return、@throws 等标签。",e.jsx("br",{}),e.jsx("strong",{children:"API 文档"}),"：使用 Swagger/OpenAPI 规范描述 REST API 接口。",e.jsx("br",{}),e.jsx("strong",{children:"项目文档"}),"：提供 README、架构设计、部署说明等。"]}),e.jsx("h2",{id:"git-conventions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、Git 规范"}),e.jsx("h3",{id:"branch-strategy",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.1 分支策略"}),e.jsx(r,{title:"Git Flow 分支模型",children:`graph LR
    MASTER["master/main (生产)"]
    DEVELOP["develop (开发)"]
    FEATURE["feature/* (功能)"]
    HOTFIX["hotfix/* (热修复)"]
    RELEASE["release/* (发布)"]
    
    MASTER --> RELEASE
    MASTER --> HOTFIX
    DEVELOP --> FEATURE
    FEATURE --> DEVELOP
    DEVELOP --> MASTER
    
    style MASTER fill:#ffe1e1
    style DEVELOP fill:#e1f5ff
    style FEATURE fill:#e1ffe1`}),e.jsx("h3",{id:"commit-message",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.2 提交信息规范"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep border-b-2 border-border",children:[e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"类型"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"含义"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"示例"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"feat"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"新功能"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"feat: 添加用户登录功能"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"fix"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"修复bug"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"fix: 修复登录页面空指针异常"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"docs"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"文档更新"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"docs: 更新API文档"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"style"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"代码格式调整"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"style: 调整代码缩进"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"refactor"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"重构代码"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"refactor: 优化用户服务层代码"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"test"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"测试相关"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"test: 添加用户服务单元测试"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"chore"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"构建过程或辅助工具变动"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"chore: 更新依赖版本"})]})]})]}),e.jsx("h2",{id:"code-review",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、代码审查"}),e.jsx("h3",{id:"review-process",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"6.1 审查流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"代码审查是保证代码质量和知识共享的重要环节。"}),e.jsx(t,{code:`// PR 模板示例
## 修改内容
- 添加用户登录功能
- 修复密码加密问题
- 优化数据库查询性能

## 测试情况
- [x] 单元测试通过
- [x] 集成测试通过
- [x] 手动测试验证

## 影响范围
- 登录页面
- 用户认证模块
- 数据库用户表

## 注意事项
- 需要在生产环境中更新密码字段长度
- 需要重新部署配置文件`,language:"markdown",filename:"PULL_REQUEST_TEMPLATE.md",description:"Pull Request 模板示例"}),e.jsx("h3",{id:"quality-metrics",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"6.2 质量指标"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep border-b-2 border-border",children:[e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"指标"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"说明"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"目标"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"代码覆盖率"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"测试覆盖的代码比例"}),e.jsx("td",{className:"p-3 text-success",children:">80%"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"圈复杂度"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"代码逻辑复杂度"}),e.jsx("td",{className:"p-3 text-success",children:"<10"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"重复率"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"重复代码比例"}),e.jsx("td",{className:"p-3 text-success",children:"<5%"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"PR 大小"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"单次提交代码量"}),e.jsx("td",{className:"p-3 text-success",children:"<500 行"})]})]})]}),e.jsx("h2",{id:"best-practices",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、最佳实践"}),e.jsx("h3",{id:"tools-integration",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"7.1 工具集成"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-5 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"IDE 配置"}),"：统一代码格式化规则（如 EditorConfig、Checkstyle）"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"CI/CD 集成"}),"：自动化代码质量检查（SonarQube、SpotBugs）"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"依赖管理"}),"：定期更新依赖版本，使用 BOM 统一管理版本"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"文档生成"}),"：自动生成 API 文档（Swagger）、代码文档（Javadoc）"]})]}),e.jsx(l,{type:"tip",title:"项目初始化脚本",children:"创建项目模板或脚本，一键生成标准目录结构、配置文件和基础代码，确保新项目符合规范。"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、常见误区"}),e.jsxs("div",{className:"space-y-4 my-5",children:[e.jsx("div",{className:"border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] text-ink leading-[1.8]",children:[e.jsx("strong",{className:"text-warning",children:"❌ 误区1："}),"项目结构可以随意调整",e.jsx("br",{}),e.jsx("strong",{className:"text-success",children:"✅ 事实："}),"频繁调整项目结构会增加团队协作成本和维护难度，应在项目初期就确定标准结构。"]})}),e.jsx("div",{className:"border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] text-ink leading-[1.8]",children:[e.jsx("strong",{className:"text-warning",children:"❌ 误区2："}),"命名规范不重要",e.jsx("br",{}),e.jsx("strong",{className:"text-success",children:"✅ 事实："}),"一致的命名规范是代码可读性的基础，能显著提升团队协作效率。"]})}),e.jsx("div",{className:"border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] text-ink leading-[1.8]",children:[e.jsx("strong",{className:"text-warning",children:"❌ 误区3："}),"代码审查是浪费时间",e.jsx("br",{}),e.jsx("strong",{className:"text-success",children:"✅ 事实："}),"代码审查能及早发现潜在问题，分享知识，提升代码质量，长期来看节省时间。"]})}),e.jsx("div",{className:"border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] text-ink leading-[1.8]",children:[e.jsx("strong",{className:"text-warning",children:"❌ 误区4："}),"文档可以后期补充",e.jsx("br",{}),e.jsx("strong",{className:"text-success",children:"✅ 事实："}),"文档应及时更新，后期补充容易遗漏细节，影响项目维护。"]})})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、面试真题"}),e.jsx(m,{questions:[{question:"为什么需要标准化的项目结构？",answer:"标准化的项目结构有以下好处：① 提高可读性，新成员能快速理解项目；② 便于工具集成，IDE、构建工具能更好地识别项目；③ 降低维护成本，结构清晰易懂；④ 促进团队协作，统一认知。"},{question:"Maven 和 Gradle 的标准目录结构有什么异同？",answer:"相同点：都是 src/main/java、src/test/java、src/main/resources 等结构。不同点：构建脚本不同（pom.xml vs build.gradle），Gradle 还有 settings.gradle、gradlew 等。"},{question:"什么是按功能分层的包结构？与按技术分层有何区别？",answer:"按功能分层：每个功能模块包含 controller、service、repository 等，如 user/controller、user/service；按技术分层：按技术角色组织，如所有 controller、所有 service。前者更利于模块化开发，后者更清晰。"},{question:"Java 项目中常用的命名规范有哪些？",answer:"类名：UpperCamelCase（大驼峰）；方法名/变量名：lowerCamelCase（小驼峰）；常量名：UPPER_SNAKE_CASE（大蛇形）；包名：全部小写，反向域名。"},{question:"Git 提交信息为什么要规范化？",answer:"规范化的提交信息：① 便于自动化工具解析；② 生成变更日志；③ 提高代码历史可读性；④ 便于团队协作。常见规范如 Conventional Commits。"},{question:"代码审查的主要目的是什么？如何有效进行？",answer:"主要目的：① 提高代码质量；② 发现潜在问题；③ 分享知识；④ 统一编码规范。有效审查：设定明确标准、关注重点问题、及时反馈、建设性沟通。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、知识关联"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"项目结构与规范与以下知识点密切相关："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-5 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Maven"}),"：提供了标准的项目结构和构建规范"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Gradle"}),"：更灵活的构建工具，同样遵循标准结构"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"CI/CD"}),"：自动化流程依赖于标准化的项目结构"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Spring Boot"}),"：遵循约定优于配置的原则，与标准结构兼容"]})]}),e.jsx(a,{...i(s.category,s.id)})]})}),e.jsx(x,{items:o})]})}export{N as default};
