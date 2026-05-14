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
  { id: 'standard-structure', text: '一、标准项目结构', level: 2 },
  { id: 'maven-structure', text: '1.1 Maven 标准结构', level: 3 },
  { id: 'gradle-structure', text: '1.2 Gradle 项目结构', level: 3 },
  { id: 'layered-architecture', text: '二、分层架构设计', level: 2 },
  { id: 'package-organization', text: '2.1 包组织方式', level: 3 },
  { id: 'component-boundaries', text: '2.2 组件边界划分', level: 3 },
  { id: 'naming-conventions', text: '三、命名规范', level: 2 },
  { id: 'package-naming', text: '3.1 包名规范', level: 3 },
  { id: 'class-naming', text: '3.2 类命名规范', level: 3 },
  { id: 'coding-standards', text: '四、编码规范', level: 2 },
  { id: 'style-guide', text: '4.1 代码风格指南', level: 3 },
  { id: 'documentation', text: '4.2 文档规范', level: 3 },
  { id: 'git-conventions', text: '五、Git 规范', level: 2 },
  { id: 'branch-strategy', text: '5.1 分支策略', level: 3 },
  { id: 'commit-message', text: '5.2 提交信息规范', level: 3 },
  { id: 'code-review', text: '六、代码审查', level: 2 },
  { id: 'review-process', text: '6.1 审查流程', level: 3 },
  { id: 'quality-metrics', text: '6.2 质量指标', level: 3 },
  { id: 'best-practices', text: '七、最佳实践', level: 2 },
  { id: 'tools-integration', text: '7.1 工具集成', level: 3 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function ProjectStructure({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              项目结构与规范是一套标准化的项目组织方式和开发约束，通过合理的目录结构、命名约定、编码风格和协作流程，
              确保团队成员能够高效协作、代码易于维护、项目具备良好的可扩展性，是软件工程化开发的基础保障。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么重视项目结构与规范？">
            良好的项目结构与规范是软件项目的基石，直接影响开发效率、代码质量、维护成本和团队协作效果。规范先行，事半功倍。
          </Callout>

          <h2 id="standard-structure" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、标准项目结构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            标准化的项目结构是项目可维护性的基础，不同的构建工具有各自的标准结构。
          </p>

          <h3 id="maven-structure" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.1 Maven 标准结构
          </h3>

          <DiagramBlock title="Maven 标准目录结构">
            {`graph TD
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
    style TEST_JAVA fill:#fff4e1`}
          </DiagramBlock>

          <Playground
            code={`my-project/
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
│           └── test-data.sql`}
            language="text"
            filename="项目目录结构"
            description="Maven 标准项目结构示例"
          />

          <h3 id="gradle-structure" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.2 Gradle 项目结构
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Gradle 项目结构与 Maven 基本相同，但构建脚本不同（build.gradle vs pom.xml）。
          </p>

          <Playground
            code={`my-project/
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
└── .gradle/ (Gradle 缓存) `}
            language="text"
            filename="项目目录结构"
            description="Gradle 标准项目结构示例"
          />

          <SideNote>
            <strong>Android 项目</strong>使用 Gradle 构建，结构略有不同，包含 app/、lib/ 等模块目录。
          </SideNote>

          <h2 id="layered-architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、分层架构设计
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            合理的分层架构有助于解耦、维护和扩展。常见的分层包括表现层、业务层、持久层等。
          </p>

          <h3 id="package-organization" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 包组织方式
          </h3>

          <DiagramBlock title="按功能分层的包结构">
            {`graph TD
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
    style REPOSITORY fill:#fff4e1`}
          </DiagramBlock>

          <h3 id="component-boundaries" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 组件边界划分
          </h3>

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">层</th>
                <th className="text-left p-3 font-semibold text-ink">职责</th>
                <th className="text-left p-3 font-semibold text-ink">访问规则</th>
                <th className="text-left p-3 font-semibold text-ink">示例</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="p-3 font-semibold text-ink">Controller</td>
                <td className="p-3 text-ink-muted">处理HTTP请求响应</td>
                <td className="p-3 text-ink-muted">仅调用Service层</td>
                <td className="p-3 font-mono text-[12px]">UserController</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">Service</td>
                <td className="p-3 text-ink-muted">业务逻辑处理</td>
                <td className="p-3 text-ink-muted">可调用Repository/外部服务</td>
                <td className="p-3 font-mono text-[12px]">UserService</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">Repository</td>
                <td className="p-3 text-ink-muted">数据访问接口</td>
                <td className="p-3 text-ink-muted">仅访问数据库</td>
                <td className="p-3 font-mono text-[12px]">UserRepository</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">Entity/DTO</td>
                <td className="p-3 text-ink-muted">数据传输对象</td>
                <td className="p-3 text-ink-muted">仅包含数据</td>
                <td className="p-3 font-mono text-[12px]">UserEntity</td>
              </tr>
            </tbody>
          </table>

          <h2 id="naming-conventions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、命名规范
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            一致的命名规范提高代码可读性，减少沟通成本。
          </p>

          <h3 id="package-naming" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 包名规范
          </h3>

          <Playground
            code={`// 推荐：反向域名 + 项目名 + 层名
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
com.example.common.util`}
            language="java"
            filename="包命名示例"
            description="Java 包命名规范"
          />

          <h3 id="class-naming" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 类命名规范
          </h3>

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">类型</th>
                <th className="text-left p-3 font-semibold text-ink">命名规则</th>
                <th className="text-left p-3 font-semibold text-ink">示例</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="p-3 font-semibold text-ink">类名</td>
                <td className="p-3 text-ink-muted">UpperCamelCase（大驼峰）</td>
                <td className="p-3 font-mono text-[12px]">UserService, ProductController</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">方法名</td>
                <td className="p-3 text-ink-muted">lowerCamelCase（小驼峰）</td>
                <td className="p-3 font-mono text-[12px]">getUserById(), saveUser()</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">常量名</td>
                <td className="p-3 text-ink-muted">UPPER_SNAKE_CASE（大蛇形）</td>
                <td className="p-3 font-mono text-[12px]">MAX_CONNECTIONS, DEFAULT_TIMEOUT</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">变量名</td>
                <td className="p-3 text-ink-muted">lowerCamelCase（小驼峰）</td>
                <td className="p-3 font-mono text-[12px]">userName, orderTotal</td>
              </tr>
            </tbody>
          </table>

          <h2 id="coding-standards" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、编码规范
          </h2>

          <h3 id="style-guide" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 代码风格指南
          </h3>

          <Playground
            code={`public class UserService {
    
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
}`}
            language="java"
            filename="UserService.java"
            description="符合规范的代码示例"
          />

          <h3 id="documentation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 文档规范
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            良好的文档是代码可维护性的保障，包括类、方法、参数的详细说明。
          </p>

          <Callout type="info" title="文档标准">
            <strong>JavaDoc</strong>：使用标准 JavaDoc 注释格式，包含 @param、@return、@throws 等标签。<br/>
            <strong>API 文档</strong>：使用 Swagger/OpenAPI 规范描述 REST API 接口。<br/>
            <strong>项目文档</strong>：提供 README、架构设计、部署说明等。
          </Callout>

          <h2 id="git-conventions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Git 规范
          </h2>

          <h3 id="branch-strategy" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 分支策略
          </h3>

          <DiagramBlock title="Git Flow 分支模型">
            {`graph LR
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
    style FEATURE fill:#e1ffe1`}
          </DiagramBlock>

          <h3 id="commit-message" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 提交信息规范
          </h3>

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">类型</th>
                <th className="text-left p-3 font-semibold text-ink">含义</th>
                <th className="text-left p-3 font-semibold text-ink">示例</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="p-3 font-semibold text-ink">feat</td>
                <td className="p-3 text-ink-muted">新功能</td>
                <td className="p-3 font-mono text-[12px]">feat: 添加用户登录功能</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">fix</td>
                <td className="p-3 text-ink-muted">修复bug</td>
                <td className="p-3 font-mono text-[12px]">fix: 修复登录页面空指针异常</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">docs</td>
                <td className="p-3 text-ink-muted">文档更新</td>
                <td className="p-3 font-mono text-[12px]">docs: 更新API文档</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">style</td>
                <td className="p-3 text-ink-muted">代码格式调整</td>
                <td className="p-3 font-mono text-[12px]">style: 调整代码缩进</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">refactor</td>
                <td className="p-3 text-ink-muted">重构代码</td>
                <td className="p-3 font-mono text-[12px]">refactor: 优化用户服务层代码</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">test</td>
                <td className="p-3 text-ink-muted">测试相关</td>
                <td className="p-3 font-mono text-[12px]">test: 添加用户服务单元测试</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">chore</td>
                <td className="p-3 text-ink-muted">构建过程或辅助工具变动</td>
                <td className="p-3 font-mono text-[12px]">chore: 更新依赖版本</td>
              </tr>
            </tbody>
          </table>

          <h2 id="code-review" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、代码审查
          </h2>

          <h3 id="review-process" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.1 审查流程
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            代码审查是保证代码质量和知识共享的重要环节。
          </p>

          <Playground
            code={`// PR 模板示例
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
- 需要重新部署配置文件`}
            language="markdown"
            filename="PULL_REQUEST_TEMPLATE.md"
            description="Pull Request 模板示例"
          />

          <h3 id="quality-metrics" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.2 质量指标
          </h3>

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">指标</th>
                <th className="text-left p-3 font-semibold text-ink">说明</th>
                <th className="text-left p-3 font-semibold text-ink">目标</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="p-3 font-semibold text-ink">代码覆盖率</td>
                <td className="p-3 text-ink-muted">测试覆盖的代码比例</td>
                <td className="p-3 text-success">&gt;80%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">圈复杂度</td>
                <td className="p-3 text-ink-muted">代码逻辑复杂度</td>
                <td className="p-3 text-success">&lt;10</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">重复率</td>
                <td className="p-3 text-ink-muted">重复代码比例</td>
                <td className="p-3 text-success">&lt;5%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">PR 大小</td>
                <td className="p-3 text-ink-muted">单次提交代码量</td>
                <td className="p-3 text-success">&lt;500 行</td>
              </tr>
            </tbody>
          </table>

          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、最佳实践
          </h2>

          <h3 id="tools-integration" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            7.1 工具集成
          </h3>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-5 ml-2">
            <li><strong className="text-ink">IDE 配置</strong>：统一代码格式化规则（如 EditorConfig、Checkstyle）</li>
            <li><strong className="text-ink">CI/CD 集成</strong>：自动化代码质量检查（SonarQube、SpotBugs）</li>
            <li><strong className="text-ink">依赖管理</strong>：定期更新依赖版本，使用 BOM 统一管理版本</li>
            <li><strong className="text-ink">文档生成</strong>：自动生成 API 文档（Swagger）、代码文档（Javadoc）</li>
          </ul>

          <Callout type="tip" title="项目初始化脚本">
            创建项目模板或脚本，一键生成标准目录结构、配置文件和基础代码，确保新项目符合规范。
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <div className="space-y-4 my-5">
            <div className="border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md">
              <p className="text-[14px] sm:text-[15px] text-ink leading-[1.8]">
                <strong className="text-warning">❌ 误区1：</strong>项目结构可以随意调整<br/>
                <strong className="text-success">✅ 事实：</strong>频繁调整项目结构会增加团队协作成本和维护难度，应在项目初期就确定标准结构。
              </p>
            </div>

            <div className="border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md">
              <p className="text-[14px] sm:text-[15px] text-ink leading-[1.8]">
                <strong className="text-warning">❌ 误区2：</strong>命名规范不重要<br/>
                <strong className="text-success">✅ 事实：</strong>一致的命名规范是代码可读性的基础，能显著提升团队协作效率。
              </p>
            </div>

            <div className="border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md">
              <p className="text-[14px] sm:text-[15px] text-ink leading-[1.8]">
                <strong className="text-warning">❌ 误区3：</strong>代码审查是浪费时间<br/>
                <strong className="text-success">✅ 事实：</strong>代码审查能及早发现潜在问题，分享知识，提升代码质量，长期来看节省时间。
              </p>
            </div>

            <div className="border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md">
              <p className="text-[14px] sm:text-[15px] text-ink leading-[1.8]">
                <strong className="text-warning">❌ 误区4：</strong>文档可以后期补充<br/>
                <strong className="text-success">✅ 事实：</strong>文档应及时更新，后期补充容易遗漏细节，影响项目维护。
              </p>
            </div>
          </div>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: '为什么需要标准化的项目结构？',
                answer: '标准化的项目结构有以下好处：① 提高可读性，新成员能快速理解项目；② 便于工具集成，IDE、构建工具能更好地识别项目；③ 降低维护成本，结构清晰易懂；④ 促进团队协作，统一认知。'
              },
              {
                question: 'Maven 和 Gradle 的标准目录结构有什么异同？',
                answer: '相同点：都是 src/main/java、src/test/java、src/main/resources 等结构。不同点：构建脚本不同（pom.xml vs build.gradle），Gradle 还有 settings.gradle、gradlew 等。'
              },
              {
                question: '什么是按功能分层的包结构？与按技术分层有何区别？',
                answer: '按功能分层：每个功能模块包含 controller、service、repository 等，如 user/controller、user/service；按技术分层：按技术角色组织，如所有 controller、所有 service。前者更利于模块化开发，后者更清晰。'
              },
              {
                question: 'Java 项目中常用的命名规范有哪些？',
                answer: '类名：UpperCamelCase（大驼峰）；方法名/变量名：lowerCamelCase（小驼峰）；常量名：UPPER_SNAKE_CASE（大蛇形）；包名：全部小写，反向域名。'
              },
              {
                question: 'Git 提交信息为什么要规范化？',
                answer: '规范化的提交信息：① 便于自动化工具解析；② 生成变更日志；③ 提高代码历史可读性；④ 便于团队协作。常见规范如 Conventional Commits。'
              },
              {
                question: '代码审查的主要目的是什么？如何有效进行？',
                answer: '主要目的：① 提高代码质量；② 发现潜在问题；③ 分享知识；④ 统一编码规范。有效审查：设定明确标准、关注重点问题、及时反馈、建设性沟通。'
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            项目结构与规范与以下知识点密切相关：
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-5 ml-2">
            <li><strong className="text-ink">Maven</strong>：提供了标准的项目结构和构建规范</li>
            <li><strong className="text-ink">Gradle</strong>：更灵活的构建工具，同样遵循标准结构</li>
            <li><strong className="text-ink">CI/CD</strong>：自动化流程依赖于标准化的项目结构</li>
            <li><strong className="text-ink">Spring Boot</strong>：遵循约定优于配置的原则，与标准结构兼容</li>
          </ul>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，禁止用 <aside> 包裹！组件自行管理桌面/移动端显隐 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}