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
  { id: 'core-concepts', text: '一、核心概念', level: 2 },
  { id: 'build-script', text: '1.1 构建脚本', level: 3 },
  { id: 'dsl-comparison', text: '1.2 Groovy vs Kotlin DSL', level: 3 },
  { id: 'dependency-management', text: '二、依赖管理', level: 2 },
  { id: 'configurations', text: '2.1 配置（Configuration）', level: 3 },
  { id: 'dependency-types', text: '2.2 依赖类型', level: 3 },
  { id: 'build-lifecycle', text: '三、构建生命周期', level: 2 },
  { id: 'phases-tasks', text: '3.1 阶段与任务', level: 3 },
  { id: 'incremental-build', text: '3.2 增量构建', level: 3 },
  { id: 'plugins', text: '四、插件体系', level: 2 },
  { id: 'builtin-plugins', text: '4.1 内置插件', level: 3 },
  { id: 'custom-tasks', text: '4.2 自定义任务', level: 3 },
  { id: 'multi-project', text: '五、多项目构建', level: 2 },
  { id: 'project-structure', text: '5.1 项目结构', level: 3 },
  { id: 'inter-project-deps', text: '5.2 项目间依赖', level: 3 },
  { id: 'gradle-wrapper', text: '六、Gradle Wrapper', level: 2 },
  { id: 'wrapper-benefits', text: '6.1 优势与使用', level: 3 },
  { id: 'performance', text: '七、性能优化', level: 2 },
  { id: 'daemon-cache', text: '7.1 Daemon 与缓存', level: 3 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'comparison', text: '十、Gradle vs Maven', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function Gradle({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Gradle 是一个基于<strong className="text-accent">Groovy/Kotlin DSL</strong>的现代化构建工具，结合了 Maven 的依赖管理和 Ant 的灵活性，
              通过增量构建、构建缓存和守护进程等特性，提供快速、灵活且可扩展的构建体验，是 Android 开发和微服务架构的首选构建工具。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么选择 Gradle？">
            Gradle 解决了 Maven 的痛点：XML 冗长、构建逻辑不灵活、构建速度慢。通过 DSL 脚本语言，可以编写复杂的构建逻辑，同时保持声明式的简洁性。
          </Callout>

          <h2 id="core-concepts" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、核心概念
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Gradle 的核心是构建脚本（build.gradle），它使用 DSL（Domain Specific Language）描述项目的构建逻辑。理解 Gradle 的生命周期和任务模型是使用 Gradle 的基础。
          </p>

          <h3 id="build-script" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.1 构建脚本
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Gradle 支持两种 DSL：Groovy DSL（传统）和 Kotlin DSL（推荐）。Kotlin DSL 提供更好的 IDE 支持和类型安全。
          </p>

          <Playground
            code={`plugins {
    java
    application
}

group = "com.example"
version = "1.0.0-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web:3.2.0")
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
}

application {
    mainClass.set("com.example.Main")
}

tasks.test {
    useJUnitPlatform()
}`}
            language="kotlin"
            filename="build.gradle.kts"
            description="Kotlin DSL 构建脚本示例"
          />

          <SideNote>
            <strong>DSL 对比</strong>：Groovy DSL 更简洁但动态性强，Kotlin DSL 类型安全且 IDE 友好。新项目推荐使用 Kotlin DSL。
          </SideNote>

          <h3 id="dsl-comparison" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.2 Groovy vs Kotlin DSL
          </h3>

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">特性</th>
                <th className="text-left p-3 font-semibold text-ink">Groovy DSL</th>
                <th className="text-left p-3 font-semibold text-ink">Kotlin DSL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="p-3 font-semibold text-ink">语法</td>
                <td className="p-3 font-mono text-[12px]">implementation 'xxx'</td>
                <td className="p-3 font-mono text-[12px]">implementation("xxx")</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">类型安全</td>
                <td className="p-3 text-warning">△ 动态类型</td>
                <td className="p-3 text-success">✓ 静态类型</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">IDE 支持</td>
                <td className="p-3 text-warning">△ 一般</td>
                <td className="p-3 text-success">✓ 优秀（自动补全）</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">学习曲线</td>
                <td className="p-3 text-success">平缓</td>
                <td className="p-3 text-warning">需了解 Kotlin</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">适用场景</td>
                <td className="p-3 text-ink-muted"> legacy 项目</td>
                <td className="p-3 text-success">新项目（推荐）</td>
              </tr>
            </tbody>
          </table>

          <h2 id="dependency-management" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、依赖管理
          </h2>

          <h3 id="configurations" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 配置（Configuration）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Gradle 使用配置（Configuration）来组织依赖，每个配置代表一组具有相同用途的依赖。
          </p>

          <Playground
            code={`dependencies {
    // compileOnly：编译时需要，运行时不需要（如 Lombok）
    compileOnly("org.projectlombok:lombok:1.18.30")
    annotationProcessor("org.projectlombok:lombok:1.18.30")
    
    // implementation：编译和运行都需要，但不暴露给其他模块
    implementation("org.springframework.boot:spring-boot-starter-web:3.2.0")
    
    // api：编译和运行都需要，且暴露给其他模块（类似 Maven 的 compile）
    api("com.google.guava:guava:32.1.3-jre")
    
    // runtimeOnly：仅运行时需要（如 JDBC 驱动）
    runtimeOnly("com.mysql:mysql-connector-j:8.2.0")
    
    // testImplementation：仅测试需要
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}`}
            language="kotlin"
            filename="build.gradle.kts"
            description="依赖配置示例"
          />

          <DiagramBlock title="依赖配置关系">
            {`graph LR
    API[api] --> Implementation[implementation]
    Implementation --> CompileOnly[compileOnly]
    Implementation --> RuntimeOnly[runtimeOnly]
    
    TestAPI[testApi] --> TestImpl[testImplementation]
    TestImpl --> TestCompileOnly[testCompileOnly]
    
    style API fill:#ffe1e1
    style Implementation fill:#e1f5ff
    style CompileOnly fill:#fff4e1
    style RuntimeOnly fill:#e1ffe1`}
          </DiagramBlock>

          <h3 id="dependency-types" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 依赖类型
          </h3>

          <Playground
            code={`dependencies {
    // 模块依赖
    implementation(project(":module-common"))
    
    // 文件依赖
    implementation(files("libs/my-library.jar"))
    implementation(fileTree("libs") { include("*.jar") })
    
    // 平台依赖（BOM）
    implementation(platform("org.springframework.boot:spring-boot-dependencies:3.2.0"))
    implementation("org.springframework.boot:spring-boot-starter-web")
    
    // 排除传递依赖
    implementation("org.springframework.boot:spring-boot-starter-web") {
        exclude(group = "org.springframework.boot", module = "spring-boot-starter-tomcat")
    }
    
    // 强制版本
    implementation("com.google.guava:guava") {
        version {
            strictly("32.1.3-jre")
        }
    }
}`}
            language="kotlin"
            filename="build.gradle.kts"
            description="依赖类型与高级用法"
          />

          <Callout type="warning" title="依赖冲突解决">
            Gradle 默认选择<strong>最高版本</strong>。可通过 configurations.all 统一处理
          </Callout>

          <h2 id="build-lifecycle" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、构建生命周期
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Gradle 构建分为三个阶段：初始化（Initialization）、配置（Configuration）、执行（Execution）。理解生命周期对于编写自定义任务至关重要。
          </p>

          <h3 id="phases-tasks" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 阶段与任务
          </h3>

          <DiagramBlock title="Gradle 构建生命周期">
            {`graph TB
    subgraph Init["初始化阶段"]
        I1[settings.gradle] --> I2[识别项目]
    end
    
    subgraph Config["配置阶段"]
        C1[执行 build.gradle] --> C2[创建任务图]
    end
    
    subgraph Exec["执行阶段"]
        E1[按依赖顺序执行任务] --> E2[构建完成]
    end
    
    Init --> Config --> Exec
    
    style I1 fill:#ffe1e1
    style C1 fill:#e1f5ff
    style E1 fill:#e1ffe1`}
          </DiagramBlock>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，禁止用 <aside> 包裹！组件自行管理桌面/移动端显隐 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
