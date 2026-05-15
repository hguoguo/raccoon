import{j as e,g as r}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as d}from"./SideNote-BKvanovA.js";import{C as s,A as l,S as o}from"./ArticleNav-DhfiS38Y.js";import{D as i}from"./DiagramBlock-CLaKE9_7.js";import{I as c}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"core-concepts",text:"一、核心概念",level:2},{id:"pom-structure",text:"1.1 POM文件结构",level:3},{id:"dependency-management",text:"1.2 依赖管理",level:3},{id:"lifecycle",text:"二、生命周期与阶段",level:2},{id:"phases",text:"2.1 三大生命周期",level:3},{id:"common-phases",text:"2.2 常用阶段详解",level:3},{id:"plugins",text:"三、插件体系",level:2},{id:"builtin-plugins",text:"3.1 内置插件",level:3},{id:"custom-plugins",text:"3.2 自定义配置",level:3},{id:"multi-module",text:"四、多模块项目",level:2},{id:"module-structure",text:"4.1 模块结构",level:3},{id:"dependency-inheritance",text:"4.2 依赖继承与聚合",level:3},{id:"repository",text:"五、仓库管理",level:2},{id:"repo-types",text:"5.1 仓库类型",level:3},{id:"nexus-setup",text:"5.2 Nexus私服搭建",level:3},{id:"bom",text:"六、BOM依赖管理",level:2},{id:"misconceptions",text:"七、常见误区",level:2},{id:"interview",text:"八、面试真题",level:2},{id:"comparison",text:"九、Maven vs Gradle",level:2},{id:"related",text:"十、知识关联",level:2}];function b({meta:n}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(a,{meta:n,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Maven 是一个基于",e.jsx("strong",{className:"text-accent",children:"POM（Project Object Model）"}),"的项目管理和构建自动化工具，通过约定优于配置的理念， 提供标准化的项目结构、依赖管理和构建生命周期，是 Java 生态中最主流的构建工具。"]})}),e.jsx(s,{type:"tip",title:"为什么选择 Maven？",children:"Maven 解决了传统 Ant 构建脚本的痛点：依赖冲突、构建过程不标准、项目结构混乱。通过中央仓库和传递性依赖，大幅简化了第三方库的管理。"}),e.jsx("h2",{id:"core-concepts",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、核心概念"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Maven 的核心是 POM 文件，它描述了项目的元数据、依赖关系、构建配置等信息。理解 POM 结构是使用 Maven 的基础。"}),e.jsx("h3",{id:"pom-structure",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.1 POM文件结构"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"POM（pom.xml）是 Maven 项目的核心配置文件，采用 XML 格式定义项目的所有信息。"}),e.jsx(t,{code:`<?xml version="1.0" encoding="UTF-8"?>
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
            <version>\${spring-boot.version}</version>
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
                    <source>\${java.version}</source>
                    <target>\${java.version}</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`,language:"xml",filename:"pom.xml",description:"POM 文件基本结构"}),e.jsxs(d,{children:[e.jsx("strong",{children:"GAV 坐标"}),"：groupId（组织标识）、artifactId（项目名称）、version（版本号）三者唯一确定一个 Maven 构件。SNAPSHOT 表示开发中的快照版本。"]}),e.jsx("h3",{id:"dependency-management",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.2 依赖管理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Maven 的依赖管理是其最强大的特性之一，支持传递性依赖、作用域控制和依赖排除。"}),e.jsx(i,{title:"依赖传递机制",children:`graph LR
    A[项目A] -->|依赖| B[项目B 1.0]
    B -->|传递依赖| C[项目C 2.0]
    A -->|直接依赖| D[项目D 3.0]
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#ffe1e1
    style D fill:#e1ffe1`}),e.jsx(t,{code:`<!-- 依赖作用域示例 -->
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
</dependency>`,language:"xml",filename:"pom.xml",description:"依赖作用域与排除示例"}),e.jsxs(s,{type:"warning",title:"依赖冲突解决策略",children:[e.jsx("strong",{children:"就近原则"}),"：依赖路径短的优先；",e.jsx("strong",{children:"声明顺序原则"}),"：路径相同时，先声明的优先。建议使用 ",e.jsx("code",{children:"<dependencyManagement>"})," 统一管理版本。"]}),e.jsx("h2",{id:"lifecycle",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、生命周期与阶段"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Maven 定义了标准化的构建生命周期，每个生命周期包含多个阶段（Phase），阶段按顺序执行。"}),e.jsx("h3",{id:"phases",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.1 三大生命周期"}),e.jsx(i,{title:"Maven 三大生命周期",children:`graph TB
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
    style S2 fill:#fff4e1`}),e.jsx("h3",{id:"common-phases",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.2 常用阶段详解"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep border-b-2 border-border",children:[e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"阶段"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"说明"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"常用命令"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-mono text-accent",children:"validate"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"验证项目结构和必要信息"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"mvn validate"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-mono text-accent",children:"compile"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"编译源代码"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"mvn compile"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-mono text-accent",children:"test"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"运行单元测试"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"mvn test"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-mono text-accent",children:"package"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"打包（JAR/WAR）"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"mvn package"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-mono text-accent",children:"verify"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"运行集成测试和质量检查"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"mvn verify"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-mono text-accent",children:"install"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"安装到本地仓库"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"mvn install"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-mono text-accent",children:"deploy"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"部署到远程仓库"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"mvn deploy"})]})]})]}),e.jsxs(d,{children:["执行某个阶段时，Maven 会自动执行该阶段之前的所有阶段。例如 ",e.jsx("code",{children:"mvn package"})," 会依次执行 validate → compile → test → package。"]}),e.jsx("h2",{id:"plugins",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、插件体系"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Maven 的核心功能通过插件实现，每个阶段绑定了一个或多个插件目标（Goal）。"}),e.jsx("h3",{id:"builtin-plugins",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 内置插件"}),e.jsx(t,{code:`<!-- 常用插件配置 -->
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
</build>`,language:"xml",filename:"pom.xml",description:"常用插件配置"}),e.jsx("h3",{id:"custom-plugins",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 自定义配置"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["可以通过 ",e.jsx("code",{children:"<executions>"})," 将插件目标绑定到特定阶段，或自定义执行顺序。"]}),e.jsx("h2",{id:"multi-module",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、多模块项目"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"大型项目通常拆分为多个模块，Maven 通过聚合（Aggregation）和继承（Inheritance）管理多模块项目。"}),e.jsx("h3",{id:"module-structure",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 模块结构"}),e.jsx(i,{title:"多模块项目结构",children:`graph TB
    Parent["parent (pom)"] --> Module1["module-common (jar)"]
    Parent --> Module2["module-service (jar)"]
    Parent --> Module3["module-web (war)"]
    
    Module1 --> Module2
    Module2 --> Module3
    
    style Parent fill:#ffe1e1
    style Module1 fill:#e1f5ff
    style Module2 fill:#e1ffe1
    style Module3 fill:#fff4e1`}),e.jsx(t,{code:`<!-- 父 POM（packaging=pom） -->
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
                <version>\${spring.version}</version>
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
            <version>\${project.version}</version>
        </dependency>
    </dependencies>
</project>`,language:"xml",filename:"pom.xml",description:"多模块项目 POM 配置"}),e.jsx("h3",{id:"dependency-inheritance",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.2 依赖继承与聚合"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"继承"}),"：子模块继承父模块的配置（dependencies、plugins、properties）；",e.jsx("strong",{children:"聚合"}),"：父模块通过 ",e.jsx("code",{children:"<modules>"})," 一次性构建所有子模块。"]}),e.jsx("h2",{id:"repository",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、仓库管理"}),e.jsx("h3",{id:"repo-types",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.1 仓库类型"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep border-b-2 border-border",children:[e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"仓库类型"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"位置"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"用途"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"本地仓库"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"~/.m2/repository"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"存储已下载的依赖和构建产物"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"中央仓库"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"https://repo.maven.apache.org"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"官方公共仓库，包含大部分开源库"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"远程仓库"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"自定义 URL"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"企业私有仓库或镜像仓库"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"私服"}),e.jsx("td",{className:"p-3 font-mono text-[12px]",children:"Nexus/Artifactory"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"企业内部代理和缓存，加速下载"})]})]})]}),e.jsx("h3",{id:"nexus-setup",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.2 Nexus私服搭建"}),e.jsx(t,{code:`<!-- settings.xml 配置私服 -->
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
</distributionManagement>`,language:"xml",filename:"settings.xml / pom.xml",description:"Nexus 私服配置"}),e.jsx("h2",{id:"bom",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、BOM依赖管理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"BOM（Bill of Materials）是一种特殊的 POM 文件，用于统一管理一组相关依赖的版本，避免版本冲突。"}),e.jsx(t,{code:`<!-- Spring Boot BOM 示例 -->
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
</dependencies>`,language:"xml",filename:"pom.xml",description:"BOM 依赖管理示例"}),e.jsx(s,{type:"tip",title:"常用 BOM",children:"Spring Boot Dependencies、Spring Cloud Dependencies、Jackson BOM、JUnit BOM 等。使用 BOM 可以确保相关依赖版本兼容。"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、常见误区"}),e.jsxs("div",{className:"space-y-4 my-5",children:[e.jsx("div",{className:"border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] text-ink leading-[1.8]",children:[e.jsx("strong",{className:"text-warning",children:"❌ 误区1："}),"Maven 只能管理 Java 项目",e.jsx("br",{}),e.jsx("strong",{className:"text-success",children:"✅ 事实："}),"Maven 通过插件可以构建任何语言的项目（如前端、Python），只是 Java 生态最完善。"]})}),e.jsx("div",{className:"border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] text-ink leading-[1.8]",children:[e.jsx("strong",{className:"text-warning",children:"❌ 误区2："}),"所有依赖都应该放在 ",e.jsx("code",{children:"<dependencies>"})," 中",e.jsx("br",{}),e.jsx("strong",{className:"text-success",children:"✅ 事实："}),"应该在父 POM 的 ",e.jsx("code",{children:"<dependencyManagement>"})," 中统一管理版本，子模块只声明需要的依赖。"]})}),e.jsx("div",{className:"border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] text-ink leading-[1.8]",children:[e.jsx("strong",{className:"text-warning",children:"❌ 误区3："}),e.jsx("code",{children:"mvn clean install"})," 是最优构建命令",e.jsx("br",{}),e.jsx("strong",{className:"text-success",children:"✅ 事实："}),"CI/CD 环境应使用 ",e.jsx("code",{children:"mvn clean verify"})," 或 ",e.jsx("code",{children:"mvn clean package"}),"，避免不必要的 install 到本地仓库。"]})}),e.jsx("div",{className:"border-l-[3px] border-warning pl-4 py-2 bg-warning-soft/30 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] text-ink leading-[1.8]",children:[e.jsx("strong",{className:"text-warning",children:"❌ 误区4："}),"SNAPSHOT 版本可以正式发布",e.jsx("br",{}),e.jsx("strong",{className:"text-success",children:"✅ 事实："}),"SNAPSHOT 是开发中的不稳定版本，发布时应使用正式版本号（如 1.0.0），SNAPSHOT 仅用于内部开发测试。"]})})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、面试真题"}),e.jsx(c,{questions:[{question:"Maven 的依赖传递机制是什么？如何解决依赖冲突？",answer:"Maven 会自动解析传递性依赖，形成依赖树。解决冲突的策略：① 就近原则（依赖路径短的优先）；② 声明顺序原则（路径相同时，先声明的优先）；③ 使用 <exclusions> 排除冲突依赖；④ 在 <dependencyManagement> 中统一管理版本。推荐使用 mvn dependency:tree 查看依赖树。"},{question:"Maven 的生命周期有哪些？执行 mvn package 时会经历哪些阶段？",answer:"Maven 有三大生命周期：clean、default（build）、site。执行 mvn package 会依次执行：validate → compile → test → package。如果前面某个阶段失败，后续阶段不会执行。"},{question:"<dependencies> 和 <dependencyManagement> 的区别是什么？",answer:"<dependencies> 中声明的依赖会被实际引入项目；<dependencyManagement> 只是声明版本，不会实际引入依赖，子模块需要显式声明才能使用。最佳实践是在父 POM 的 <dependencyManagement> 中统一管理版本，子模块只声明 groupId 和 artifactId。"},{question:"Maven 的作用域（scope）有哪些？分别什么场景使用？",answer:"compile（默认，编译测试运行都需要）、provided（编译时需要，运行时由容器提供，如 Servlet API）、runtime（运行时需要，编译时不需要，如 JDBC 驱动）、test（仅测试需要）、system（本地系统路径，不推荐）。正确设置 scope 可以减小最终包的体积。"},{question:"什么是 Maven 的多模块项目？如何实现模块间的依赖？",answer:"多模块项目通过父 POM 的 <modules> 声明子模块，父 POM packaging 为 pom。模块间依赖通过在子模块的 <dependencies> 中引用其他模块的 GAV 坐标实现。Maven Reactor 会根据依赖关系确定构建顺序。使用 ${project.version} 引用同版本的其他模块。"},{question:"Maven 私服的作用是什么？如何配置？",answer:"私服（如 Nexus）的作用：① 代理中央仓库，加速依赖下载；② 缓存已下载的依赖；③ 发布内部私有构件；④ 提高构建稳定性。配置方式：在 settings.xml 中配置 <mirrors> 指向私服地址，在 pom.xml 的 <distributionManagement> 中配置发布地址。"}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、Maven vs Gradle"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep border-b-2 border-border",children:[e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"对比项"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"Maven"}),e.jsx("th",{className:"text-left p-3 font-semibold text-ink",children:"Gradle"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"配置文件"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"XML（pom.xml）"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"Groovy/Kotlin DSL（build.gradle）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"约定优于配置"}),e.jsx("td",{className:"p-3 text-success",children:"✓ 严格遵循"}),e.jsx("td",{className:"p-3 text-warning",children:"△ 灵活但需配置"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"构建速度"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"较慢（每次重新执行）"}),e.jsx("td",{className:"p-3 text-success",children:"快（增量构建、守护进程）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"学习曲线"}),e.jsx("td",{className:"p-3 text-success",children:"平缓（标准化）"}),e.jsx("td",{className:"p-3 text-warning",children:"陡峭（灵活性高）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"社区生态"}),e.jsx("td",{className:"p-3 text-success",children:"成熟稳定"}),e.jsx("td",{className:"p-3 text-success",children:"快速增长"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-3 font-semibold text-ink",children:"适用场景"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"传统企业项目、标准化要求高"}),e.jsx("td",{className:"p-3 text-ink-muted",children:"Android、微服务、需要定制构建逻辑"})]})]})]}),e.jsx(s,{type:"info",title:"如何选择？",children:"新项目建议根据团队熟悉度选择：Java 传统项目选 Maven，Android 或需要高度定制的项目选 Gradle。两者可以共存，不必强制统一。"}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、知识关联"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Maven 作为构建工具，与以下知识点密切相关："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-5 ml-2",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Gradle"}),"：另一种主流构建工具，更灵活但学习曲线较陡"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"项目结构与规范"}),"：Maven 定义了标准的项目目录结构"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"CI/CD"}),"：Maven 是持续集成流水线中的关键工具"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Spring Boot"}),"：Spring Boot 项目通常使用 Maven 或 Gradle 构建"]})]}),e.jsx(l,{...r(n.category,n.id)})]})}),e.jsx(o,{items:m})]})}export{b as default};
