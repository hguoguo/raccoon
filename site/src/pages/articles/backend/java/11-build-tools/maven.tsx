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
  { id: 'pom-structure', text: '1.1 POM文件结构', level: 3 },
  { id: 'dependency-management', text: '1.2 依赖管理', level: 3 },
  { id: 'lifecycle', text: '二、生命周期与阶段', level: 2 },
  { id: 'phases', text: '2.1 三大生命周期', level: 3 },
  { id: 'common-phases', text: '2.2 常用阶段详解', level: 3 },
  { id: 'plugins', text: '三、插件体系', level: 2 },
  { id: 'builtin-plugins', text: '3.1 内置插件', level: 3 },
  { id: 'custom-plugins', text: '3.2 自定义配置', level: 3 },
  { id: 'multi-module', text: '四、多模块项目', level: 2 },
  { id: 'module-structure', text: '4.1 模块结构', level: 3 },
  { id: 'dependency-inheritance', text: '4.2 依赖继承与聚合', level: 3 },
  { id: 'repository', text: '五、仓库管理', level: 2 },
  { id: 'repo-types', text: '5.1 仓库类型', level: 3 },
  { id: 'nexus-setup', text: '5.2 Nexus私服搭建', level: 3 },
  { id: 'bom', text: '六、BOM依赖管理', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'comparison', text: '九、Maven vs Gradle', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function Maven({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Maven 是一个基于<strong className="text-accent">POM（Project Object Model）</strong>的项目管理和构建自动化工具，通过约定优于配置的理念，
              提供标准化的项目结构、依赖管理和构建生命周期，是 Java 生态中最主流的构建工具。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么选择 Maven？">
            Maven 解决了传统 Ant 构建脚本的痛点：依赖冲突、构建过程不标准、项目结构混乱。通过中央仓库和传递性依赖，大幅简化了第三方库的管理。
          </Callout>

          <h2 id="core-concepts" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、核心概念
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Maven 的核心是 POM 文件，它描述了项目的元数据、依赖关系、构建配置等信息。理解 POM 结构是使用 Maven 的基础。
          </p>

          <h3 id="pom-structure" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.1 POM文件结构
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            POM（pom.xml）是 Maven 项目的核心配置文件，采用 XML 格式定义项目的所有信息。
          </p>

          <Playground
            code={`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    
    <!-- 模型版本 -->
    <modelVersion>4.0.0</modelVersion>
    
    <!-- 项目坐标（GAV） -->
    <groupId>com.example</groupId>
    <artifactId>my-project</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    
    <!-- 项目信息 -->
    <name>My Project</name>
    <description>A sample Maven project</description>
    
    <!-- 属性定义 -->
    <properties>
        <java.version>17</java.version>
        <spring-boot.version>3.2.0</spring-boot.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    
    <!-- 依赖管理 -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>$\{spring-boot.version}</version>
        </dependency>
        
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.0</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <!-- 构建配置 -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>$\{java.version}</source>
                    <target>$\{java.version}</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`}
            language="xml"
            filename="pom.xml"
            description="POM 文件基本结构"
          />

          <SideNote>
            <strong>GAV 坐标</strong>：groupId（组织标识）、artifactId（项目名称）、version（版本号）三者唯一确定一个 Maven 构件。SNAPSHOT 表示开发中的快照版本。
          </SideNote>

          <h3 id="dependency-management" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.2 依赖管理
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Maven 的依赖管理是其最强大的特性之一，支持传递性依赖、作用域控制和依赖排除。
          </p>

          <DiagramBlock title="依赖传递机制">
            {`graph LR
    A[项目A] -->|依赖| B[项目B 1.0]
    B -->|传递依赖| C[项目C 2.0]
    A -->|直接依赖| D[项目D 3.0]
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#ffe1e1
    style D fill:#e1ffe1`}
          </DiagramBlock>

          <Playground
            code={`<!-- 依赖作用域示例 -->
<dependencies>
    <!-- compile：默认作用域，编译、测试、运行都可用 -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>6.1.0</version>
        <scope>compile</scope>
    </dependency>
    
    <!-- provided：编译时需要，运行时由容器提供（如Servlet API） -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>
    
    <!-- runtime：运行时需要，编译时不需要（如JDBC驱动） -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
        <scope>runtime</scope>
    </dependency>
    
    <!-- test：仅测试阶段使用 -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>

<!-- 依赖排除：解决版本冲突 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>`}
            language="xml"
            filename="pom.xml"
            description="依赖作用域与排除示例"
          />

          <Callout type="warning" title="依赖冲突解决策略">
            <strong>就近原则</strong>：依赖路径短的优先；<strong>声明顺序原则</strong>：路径相同时，先声明的优先。建议使用 <code>&lt;dependencyManagement&gt;</code> 统一管理版本。
          </Callout>

          <h2 id="lifecycle" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、生命周期与阶段
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Maven 定义了标准化的构建生命周期，每个生命周期包含多个阶段（Phase），阶段按顺序执行。
          </p>

          <h3 id="phases" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 三大生命周期
          </h3>

          <DiagramBlock title="Maven 三大生命周期">
            {`graph TB
    subgraph clean["clean 生命周期"]
        C1[pre-clean] --> C2[clean] --> C3[post-clean]
    end
    
    subgraph default["default/build 生命周期"]
        D1[validate] --> D2[compile] --> D3[test] --> D4[package] --> D5[verify] --> D6[install] --> D7[deploy]
    end
    
    subgraph site["site 生命周期"]
        S1[pre-site] --> S2[site] --> S3[post-site] --> S4[site-deploy]
    end
    
    style C2 fill:#ffe1e1
    style D4 fill:#e1f5ff
    style D6 fill:#e1ffe1
    style S2 fill:#fff4e1`}
          </DiagramBlock>

          <h3 id="common-phases" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 常用阶段详解
          </h3>

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">阶段</th>
                <th className="text-left p-3 font-semibold text-ink">说明</th>
                <th className="text-left p-3 font-semibold text-ink">常用命令</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="p-3 font-mono text-accent">validate</td>
                <td className="p-3 text-ink-muted">验证项目结构和必要信息</td>
                <td className="p-3 font-mono text-[12px]">mvn validate</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-accent">compile</td>
                <td className="p-3 text-ink-muted">编译源代码</td>
                <td className="p-3 font-mono text-[12px]">mvn compile</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-accent">test</td>
                <td className="p-3 text-ink-muted">运行单元测试</td>
                <td className="p-3 font-mono text-[12px]">mvn test</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-accent">package</td>
                <td className="p-3 text-ink-muted">打包（JAR/WAR）</td>
                <td className="p-3 font-mono text-[12px]">mvn package</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-accent">verify</td>
                <td className="p-3 text-ink-muted">运行集成测试和质量检查</td>
                <td className="p-3 font-mono text-[12px]">mvn verify</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-accent">install</td>
                <td className="p-3 text-ink-muted">安装到本地仓库</td>
                <td className="p-3 font-mono text-[12px]">mvn install</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-accent">deploy</td>
                <td className="p-3 text-ink-muted">部署到远程仓库</td>
                <td className="p-3 font-mono text-[12px]">mvn deploy</td>
              </tr>
            </tbody>
          </table>

          <SideNote>
            执行某个阶段时，Maven 会自动执行该阶段之前的所有阶段。例如 <code>mvn package</code> 会依次执行 validate → compile → test → package。
          </SideNote>

          <h2 id="plugins" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、插件体系
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Maven 的核心功能通过插件实现，每个阶段绑定了一个或多个插件目标（Goal）。
          </p>

          <h3 id="builtin-plugins" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 内置插件
          </h3>

          <Playground
            code={`<!-- 常用插件配置 -->
<build>
    <plugins>
        <!-- 编译器插件 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.11.0</version>
            <configuration>
                <source>17</source>
                <target>17</target>
                <encoding>UTF-8</encoding>
            </configuration>
        </plugin>
        
        <!-- 打包插件 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <version>3.3.0</version>
            <configuration>
                <archive>
                    <manifest>
                        <mainClass>com.example.Main</mainClass>
                    </manifest>
                </archive>
            </configuration>
        </plugin>
        
        <!-- 源码插件 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-source-plugin</artifactId>
            <version>3.3.0</version>
            <executions>
                <execution>
                    <id>attach-sources</id>
                    <goals>
                        <goal>jar-no-fork</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
        
        <!-- Surefire 测试插件 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.2.2</version>
            <configuration>
                <skipTests>false</skipTests>
                <includes>
                    <include>**/*Test.java</include>
                </includes>
            </configuration>
        </plugin>
    </plugins>
</build>`}
            language="xml"
            filename="pom.xml"
            description="常用插件配置"
          />

          <h3 id="custom-plugins" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 自定义配置
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            可以通过 <code>&lt;executions&gt;</code> 将插件目标绑定到特定阶段，或自定义执行顺序。
          </p>

          <h2 id="multi-module" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、多模块项目
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            大型项目通常拆分为多个模块，Maven 通过聚合（Aggregation）和继承（Inheritance）管理多模块项目。
          </p>

          <h3 id="module-structure" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 模块结构
          </h3>

          <DiagramBlock title="多模块项目结构">
            {`graph TB
    Parent["parent (pom)"] --> Module1["module-common (jar)"]
    Parent --> Module2["module-service (jar)"]
    Parent --> Module3["module-web (war)"]
    
    Module1 --> Module2
    Module2 --> Module3
    
    style Parent fill:#ffe1e1
    style Module1 fill:#e1f5ff
    style Module2 fill:#e1ffe1
    style Module3 fill:#fff4e1`}
          </DiagramBlock>

          <Playground
            code={`<!-- 父 POM（packaging=pom） -->
<project>
    <groupId>com.example</groupId>
    <artifactId>parent-project</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>
    
    <!-- 子模块声明 -->
    <modules>
        <module>module-common</module>
        <module>module-service</module>
        <module>module-web</module>
    </modules>
    
    <!-- 统一版本管理 -->
    <properties>
        <spring.version>6.1.0</spring.version>
    </properties>
    
    <!-- 依赖管理（子模块可选择性使用） -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-core</artifactId>
                <version>$\{spring.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>

<!-- 子模块 POM -->
<project>
    <parent>
        <groupId>com.example</groupId>
        <artifactId>parent-project</artifactId>
        <version>1.0.0</version>
    </parent>
    
    <artifactId>module-service</artifactId>
    <packaging>jar</packaging>
    
    <dependencies>
        <!-- 继承父模块，无需指定版本 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
        </dependency>
        
        <!-- 依赖兄弟模块 -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>module-common</artifactId>
            <version>$\{project.version}</version>
        </dependency>
    </dependencies>
</project>`}
            language="xml"
            filename="pom.xml"
            description="多模块项目 POM 配置"
          />

          <h3 id="dependency-inheritance" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 依赖继承与聚合
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>继承</strong>：子模块继承父模块的配置（dependencies、plugins、properties）；<strong>聚合</strong>：父模块通过 <code>&lt;modules&gt;</code> 一次性构建所有子模块。
          </p>

          <h2 id="repository" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、仓库管理
          </h2>

          <h3 id="repo-types" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 仓库类型
          </h3>

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">仓库类型</th>
                <th className="text-left p-3 font-semibold text-ink">位置</th>
                <th className="text-left p-3 font-semibold text-ink">用途</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="p-3 font-semibold text-ink">本地仓库</td>
                <td className="p-3 font-mono text-[12px]">~/.m2/repository</td>
                <td className="p-3 text-ink-muted">存储已下载的依赖和构建产物</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">中央仓库</td>
                <td className="p-3 font-mono text-[12px]">https://repo.maven.apache.org</td>
                <td className="p-3 text-ink-muted">官方公共仓库，包含大部分开源库</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">远程仓库</td>
                <td className="p-3 font-mono text-[12px]">自定义 URL</td>
                <td className="p-3 text-ink-muted">企业私有仓库或镜像仓库</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">私服</td>
                <td className="p-3 font-mono text-[12px]">Nexus/Artifactory</td>
                <td className="p-3 text-ink-muted">企业内部代理和缓存，加速下载</td>
              </tr>
            </tbody>
          </table>

          <h3 id="nexus-setup" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 Nexus私服搭建
          </h3>

          <Playground
            code={`<!-- settings.xml 配置私服 -->
<settings>
    <mirrors>
        <mirror>
            <id>nexus</id>
            <mirrorOf>*</mirrorOf>
            <url>http://localhost:8081/repository/maven-public/</url>
        </mirror>
    </mirrors>
    
    <servers>
        <server>
            <id>nexus-releases</id>
            <username>admin</username>
            <password>admin123</password>
        </server>
        <server>
            <id>nexus-snapshots</id>
            <username>admin</username>
            <password>admin123</password>
        </server>
    </servers>
</settings>

<!-- pom.xml 配置发布地址 -->
<distributionManagement>
    <repository>
        <id>nexus-releases</id>
        <url>http://localhost:8081/repository/maven-releases/</url>
    </repository>
    <snapshotRepository>
        <id>nexus-snapshots</id>
        <url>http://localhost:8081/repository/maven-snapshots/</url>
    </snapshotRepository>
</distributionManagement>`}
            language="xml"
            filename="settings.xml / pom.xml"
            description="Nexus 私服配置"
          />

          <h2 id="bom" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、BOM依赖管理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            BOM（Bill of Materials）是一种特殊的 POM 文件，用于统一管理一组相关依赖的版本，避免版本冲突。
          </p>

          <Playground
            code={`<!-- Spring Boot BOM 示例 -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>3.2.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<!-- 引入依赖时无需指定版本 -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- 版本由 BOM 管理 -->
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
        <!-- 版本由 BOM 管理 -->
    </dependency>
</dependencies>`}
            language="xml"
            filename="pom.xml"
            description="BOM 依赖管理示例"
          />

          <Callout type="tip" title="常用 BOM">
            Spring Boot Dependencies、Spring Cloud Dependencies、Jackson BOM、JUnit BOM 等。使用 BOM 可以确保相关依赖版本兼容。
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <div className="space-y-4 my-5">
            <div className="border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md">
              <p className="text-[14px] sm:text-[15px] text-ink leading-[1.8]">
                <strong className="text-warning">❌ 误区1：</strong>Maven 只能管理 Java 项目<br/>
                <strong className="text-success">✅ 事实：</strong>Maven 通过插件可以构建任何语言的项目（如前端、Python），只是 Java 生态最完善。
              </p>
            </div>

            <div className="border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md">
              <p className="text-[14px] sm:text-[15px] text-ink leading-[1.8]">
                <strong className="text-warning">❌ 误区2：</strong>所有依赖都应该放在 <code>&lt;dependencies&gt;</code> 中<br/>
                <strong className="text-success">✅ 事实：</strong>应该在父 POM 的 <code>&lt;dependencyManagement&gt;</code> 中统一管理版本，子模块只声明需要的依赖。
              </p>
            </div>

            <div className="border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md">
              <p className="text-[14px] sm:text-[15px] text-ink leading-[1.8]">
                <strong className="text-warning">❌ 误区3：</strong><code>mvn clean install</code> 是最优构建命令<br/>
                <strong className="text-success">✅ 事实：</strong>CI/CD 环境应使用 <code>mvn clean verify</code> 或 <code>mvn clean package</code>，避免不必要的 install 到本地仓库。
              </p>
            </div>

            <div className="border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md">
              <p className="text-[14px] sm:text-[15px] text-ink leading-[1.8]">
                <strong className="text-warning">❌ 误区4：</strong>SNAPSHOT 版本可以正式发布<br/>
                <strong className="text-success">✅ 事实：</strong>SNAPSHOT 是开发中的不稳定版本，发布时应使用正式版本号（如 1.0.0），SNAPSHOT 仅用于内部开发测试。
              </p>
            </div>
          </div>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'Maven 的依赖传递机制是什么？如何解决依赖冲突？',
                answer: 'Maven 会自动解析传递性依赖，形成依赖树。解决冲突的策略：① 就近原则（依赖路径短的优先）；② 声明顺序原则（路径相同时，先声明的优先）；③ 使用 <exclusions> 排除冲突依赖；④ 在 <dependencyManagement> 中统一管理版本。推荐使用 mvn dependency:tree 查看依赖树。'
              },
              {
                question: 'Maven 的生命周期有哪些？执行 mvn package 时会经历哪些阶段？',
                answer: 'Maven 有三大生命周期：clean、default（build）、site。执行 mvn package 会依次执行：validate → compile → test → package。如果前面某个阶段失败，后续阶段不会执行。'
              },
              {
                question: '<dependencies> 和 <dependencyManagement> 的区别是什么？',
                answer: '<dependencies> 中声明的依赖会被实际引入项目；<dependencyManagement> 只是声明版本，不会实际引入依赖，子模块需要显式声明才能使用。最佳实践是在父 POM 的 <dependencyManagement> 中统一管理版本，子模块只声明 groupId 和 artifactId。'
              },
              {
                question: 'Maven 的作用域（scope）有哪些？分别什么场景使用？',
                answer: 'compile（默认，编译测试运行都需要）、provided（编译时需要，运行时由容器提供，如 Servlet API）、runtime（运行时需要，编译时不需要，如 JDBC 驱动）、test（仅测试需要）、system（本地系统路径，不推荐）。正确设置 scope 可以减小最终包的体积。'
              },
              {
                question: '什么是 Maven 的多模块项目？如何实现模块间的依赖？',
                answer: '多模块项目通过父 POM 的 <modules> 声明子模块，父 POM packaging 为 pom。模块间依赖通过在子模块的 <dependencies> 中引用其他模块的 GAV 坐标实现。Maven Reactor 会根据依赖关系确定构建顺序。使用 $\{project.version} 引用同版本的其他模块。'
              },
              {
                question: 'Maven 私服的作用是什么？如何配置？',
                answer: '私服（如 Nexus）的作用：① 代理中央仓库，加速依赖下载；② 缓存已下载的依赖；③ 发布内部私有构件；④ 提高构建稳定性。配置方式：在 settings.xml 中配置 <mirrors> 指向私服地址，在 pom.xml 的 <distributionManagement> 中配置发布地址。'
              }
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、Maven vs Gradle
          </h2>

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">对比项</th>
                <th className="text-left p-3 font-semibold text-ink">Maven</th>
                <th className="text-left p-3 font-semibold text-ink">Gradle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="p-3 font-semibold text-ink">配置文件</td>
                <td className="p-3 text-ink-muted">XML（pom.xml）</td>
                <td className="p-3 text-ink-muted">Groovy/Kotlin DSL（build.gradle）</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">约定优于配置</td>
                <td className="p-3 text-success">✓ 严格遵循</td>
                <td className="p-3 text-warning">△ 灵活但需配置</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">构建速度</td>
                <td className="p-3 text-ink-muted">较慢（每次重新执行）</td>
                <td className="p-3 text-success">快（增量构建、守护进程）</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">学习曲线</td>
                <td className="p-3 text-success">平缓（标准化）</td>
                <td className="p-3 text-warning">陡峭（灵活性高）</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">社区生态</td>
                <td className="p-3 text-success">成熟稳定</td>
                <td className="p-3 text-success">快速增长</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">适用场景</td>
                <td className="p-3 text-ink-muted">传统企业项目、标准化要求高</td>
                <td className="p-3 text-ink-muted">Android、微服务、需要定制构建逻辑</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="如何选择？">
            新项目建议根据团队熟悉度选择：Java 传统项目选 Maven，Android 或需要高度定制的项目选 Gradle。两者可以共存，不必强制统一。
          </Callout>

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Maven 作为构建工具，与以下知识点密切相关：
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-5 ml-2">
            <li><strong className="text-ink">Gradle</strong>：另一种主流构建工具，更灵活但学习曲线较陡</li>
            <li><strong className="text-ink">项目结构与规范</strong>：Maven 定义了标准的项目目录结构</li>
            <li><strong className="text-ink">CI/CD</strong>：Maven 是持续集成流水线中的关键工具</li>
            <li><strong className="text-ink">Spring Boot</strong>：Spring Boot 项目通常使用 Maven 或 Gradle 构建</li>
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
