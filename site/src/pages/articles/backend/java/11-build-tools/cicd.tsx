import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import InteractiveFlow from '../../../../../components/knowledge/InteractiveFlow'
import SideNote from '../../../../../components/knowledge/SideNote'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、CI/CD 概述', level: 2 },
  { id: 'ci-vs-cd', text: '1.1 CI vs CD 区别', level: 3 },
  { id: 'core-concepts', text: '1.2 核心概念', level: 3 },
  { id: 'pipeline-stages', text: '二、流水线阶段详解', level: 2 },
  { id: 'build-stage', text: '2.1 构建阶段', level: 3 },
  { id: 'test-stage', text: '2.2 测试阶段', level: 3 },
  { id: 'deploy-stage', text: '2.3 部署阶段', level: 3 },
  { id: 'tools-comparison', text: '三、主流工具对比', level: 2 },
  { id: 'jenkins', text: '3.1 Jenkins', level: 3 },
  { id: 'gitlab-ci', text: '3.2 GitLab CI', level: 3 },
  { id: 'github-actions', text: '3.3 GitHub Actions', level: 3 },
  { id: 'docker-integration', text: '四、Docker 集成实践', level: 2 },
  { id: 'dockerfile-optimization', text: '4.1 Dockerfile 优化', level: 3 },
  { id: 'multi-stage-build', text: '4.2 多阶段构建', level: 3 },
  { id: 'deployment-strategies', text: '五、部署策略', level: 2 },
  { id: 'blue-green', text: '5.1 蓝绿部署', level: 3 },
  { id: 'canary', text: '5.2 金丝雀发布', level: 3 },
  { id: 'rolling-update', text: '5.3 滚动更新', level: 3 },
  { id: 'best-practices', text: '六、最佳实践', level: 2 },
  { id: 'security', text: '6.1 安全考虑', level: 3 },
  { id: 'monitoring', text: '6.2 监控与告警', level: 3 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function Cicd({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              CI/CD（持续集成/持续交付）是通过<strong className="text-accent">自动化流水线</strong>将代码从提交到部署的完整流程，实现快速、可靠、可重复的软件交付，减少人工干预，提高交付效率和质量。
            </p>
          </blockquote>

          {/* ========== 一、CI/CD 概述 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、CI/CD 概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            CI/CD 是现代软件工程的核心理念，它将传统的瀑布式开发转变为敏捷的迭代式交付。通过自动化工具链，开发者可以频繁地将代码变更集成到主干，并自动部署到生产环境，大幅缩短反馈周期。
          </p>

          <DiagramBlock title="CI/CD 完整流程图">
            {`graph LR
              CODE["代码提交"] --> BUILD["构建"]
              BUILD --> TEST["测试"]
              TEST --> DEPLOY_STAGING["部署到预发"]
              DEPLOY_STAGING --> VERIFY["验证"]
              VERIFY --> DEPLOY_PROD["部署到生产"]
              DEPLOY_PROD --> MONITOR["监控"]
              
              style CODE fill:#b5651d25,stroke:#b5651d
              style BUILD fill:#5f7a6825,stroke:#5f7a68
              style TEST fill:#8b451320,stroke:#8b4513
              style DEPLOY_STAGING fill:#4682b425,stroke:#4682b4
              style VERIFY fill:#daa52025,stroke:#daa520
              style DEPLOY_PROD fill:#dc143c25,stroke:#dc143c
              style MONITOR fill:#9370db25,stroke:#9370db
            `}
          </DiagramBlock>

          <Callout type="tip" title="核心价值">
            CI/CD 的核心价值在于：<strong>快速反馈</strong>（尽早发现问题）、<strong>降低风险</strong>（小步快跑）、<strong>提高效率</strong>（自动化替代手工）、<strong>提升质量</strong>（标准化流程）。
          </Callout>

          <h3 id="ci-vs-cd" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.1 CI vs CD 区别
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            CI（持续集成）和 CD（持续交付/持续部署）虽然经常一起提及，但侧重点不同：
          </p>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">维度</th>
                  <th className="text-left py-2.5 px-3 text-orange font-semibold">持续集成 (CI)</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">持续交付 (CD)</th>
                  <th className="text-left py-2.5 px-3 text-indigo font-semibold">持续部署 (CD)</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">目标</td><td className="py-2.5 px-3">快速发现集成错误</td><td className="py-2.5 px-3">随时可发布</td><td className="py-2.5 px-3">自动发布到生产</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">触发条件</td><td className="py-2.5 px-3">代码提交</td><td className="py-2.5 px-3">CI 通过</td><td className="py-2.5 px-3">CD 通过</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">关键活动</td><td className="py-2.5 px-3">编译、单元测试</td><td className="py-2.5 px-3">集成测试、验收测试</td><td className="py-2.5 px-3">自动部署</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">人工干预</td><td className="py-2.5 px-3">无</td><td className="py-2.5 px-3">需要审批</td><td className="py-2.5 px-3">无</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">频率</td><td className="py-2.5 px-3">每天多次</td><td className="py-2.5 px-3">每天/每周</td><td className="py-2.5 px-3">实时</td></tr>
              </tbody>
            </table>
          </div>

          <h3 id="core-concepts" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.2 核心概念
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">🔄 流水线 (Pipeline)</div>
              <p className="text-[13px] text-ink-muted font-sans leading-[1.7]">
                一系列自动化步骤的集合，包括构建、测试、部署等。每个步骤称为一个 Stage，Stage 内包含多个 Job。
              </p>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">📦 制品 (Artifact)</div>
              <p className="text-[13px] text-ink-muted font-sans leading-[1.7]">
                构建过程中产生的输出物，如 JAR/WAR 包、Docker 镜像、静态文件等。制品应在各阶段间传递，避免重复构建。
              </p>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-rose font-sans mb-3">🧪 测试金字塔</div>
              <p className="text-[13px] text-ink-muted font-sans leading-[1.7]">
                单元测试（底层，数量最多）→ 集成测试（中层）→ E2E 测试（顶层，数量最少）。越底层执行越快，反馈越早。
              </p>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-indigo font-sans mb-3">🔐 密钥管理</div>
              <p className="text-[13px] text-ink-muted font-sans leading-[1.7]">
                敏感信息（密码、Token、证书）不应硬编码在代码中，应通过环境变量或密钥管理服务注入。
              </p>
            </div>
          </div>

          {/* ========== 二、流水线阶段详解 ========== */}
          <h2 id="pipeline-stages" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、流水线阶段详解
          </h2>

          <h3 id="build-stage" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 构建阶段
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            构建是 CI/CD 的第一步，将源代码编译为可执行的二进制文件或包。对于 Java 项目，通常使用 Maven 或 Gradle。
          </p>

          <Playground language="yaml" filename=".gitlab-ci.yml" description="Maven 构建示例" highlights={[5, 8, 12]}
            code={`stages:
  - build
  - test
  - deploy

build-job:
  stage: build
  image: maven:3.8-openjdk-11
  script:
    - mvn clean compile package -DskipTests
  artifacts:
    paths:
      - target/*.jar
    expire_in: 1 week
  cache:
    key: "$CI_COMMIT_REF_SLUG"
    paths:
      - .m2/repository`}
          />

          <SideNote label="构建缓存优化">
            Maven/Gradle 依赖下载非常耗时，应配置缓存机制。GitLab CI 使用 cache 关键字，GitHub Actions 使用 actions/cache，Jenkins 使用 Workspace Cleanup Plugin。缓存命中率可从 30% 提升到 90%+。
          </SideNote>

          <h3 id="test-stage" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 测试阶段
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            测试阶段确保代码质量，包括单元测试、集成测试、代码覆盖率检查等。测试失败应立即终止流水线，避免无效部署。
          </p>

          <InteractiveFlow title="测试阶段流程" steps={[
            { label: '单元测试', description: '运行 @Test 方法，验证单个类/方法的逻辑正确性', icon: '🧪' },
            { label: '代码覆盖率', description: '使用 JaCoCo 统计行覆盖率和分支覆盖率，要求 ≥ 80%', icon: '📊' },
            { label: '集成测试', description: '启动 Spring Context，测试数据库、Redis 等外部依赖交互', icon: '🔗' },
            { label: '静态代码分析', description: 'SonarQube 扫描代码异味、安全漏洞、复杂度', icon: '🔍' },
            { label: '性能测试', description: 'JMeter/Gatling 压测接口，验证 TPS 和响应时间', icon: '⚡' },
          ]} />

          <Playground language="xml" filename="pom.xml" description="JaCoCo 代码覆盖率配置" highlights={[5, 10, 15]}
            code={`<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.8</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
        <execution>
            <id>check</id>
            <goals>
                <goal>check</goal>
            </goals>
            <configuration>
                <rules>
                    <rule>
                        <element>BUNDLE</element>
                        <limits>
                            <limit>
                                <counter>LINE</counter>
                                <value>COVEREDRATIO</value>
                                <minimum>0.80</minimum>
                            </limit>
                        </limits>
                    </rule>
                </rules>
            </configuration>
        </execution>
    </executions>
</plugin>`}
          />

          <h3 id="deploy-stage" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.3 部署阶段
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            部署阶段将构建好的制品发布到目标环境。现代部署通常结合 Docker 和 Kubernetes，实现容器化编排。
          </p>

          <Playground language="yaml" filename="docker-compose.yml" description="Docker Compose 部署示例" highlights={[5, 10, 15]}
            code={`version: '3.8'
services:
  app:
    image: myapp:latest
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_HOST=mysql
      - REDIS_HOST=redis
    depends_on:
      - mysql
      - redis
    restart: unless-stopped
    
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: myapp
      
  redis:
    image: redis:7-alpine`}
          />

          <Callout type="warning" title="环境变量管理">
            生产环境的敏感配置（数据库密码、API Key）不应写在 docker-compose.yml 中，应使用 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">.env</code> 文件并通过 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">.gitignore</code> 排除，或使用 Vault 等密钥管理服务。
          </Callout>

          {/* ========== 三、主流工具对比 ========== */}
          <h2 id="tools-comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、主流工具对比
          </h2>

          <h3 id="jenkins" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 Jenkins
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Jenkins 是最早流行的开源 CI/CD 工具，拥有丰富的插件生态（1500+），但配置复杂，维护成本高。
          </p>

          <Playground language="groovy" filename="Jenkinsfile" description="声明式 Pipeline 示例" highlights={[5, 10, 15, 20]}
            code={`pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }
        
        stage('Test') {
            steps {
                sh 'mvn test'
                junit 'target/surefire-reports/*.xml'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker build -t myapp:$BUILD_NUMBER .'
                sh 'docker push registry.example.com/myapp:$BUILD_NUMBER'
                sh 'kubectl set image deployment/myapp myapp=registry.example.com/myapp:$BUILD_NUMBER'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            emailext subject: "Build Failed", body: "Check console output"
        }
    }
}`}
          />

          <h3 id="gitlab-ci" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 GitLab CI
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            GitLab CI 与代码仓库深度集成，配置简单（只需 .gitlab-ci.yml），内置 Runner 管理，适合中小团队。
          </p>

          <Playground language="yaml" filename=".gitlab-ci.yml" description="GitLab CI 完整示例" highlights={[5, 10, 15, 20, 25]}
            code={`stages:
  - build
  - test
  - deploy

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"

cache:
  key: "$CI_COMMIT_REF_SLUG"
  paths:
    - .m2/repository

build:
  stage: build
  image: maven:3.8-openjdk-11
  script:
    - mvn clean package -DskipTests
  artifacts:
    paths:
      - target/*.jar

test:
  stage: test
  image: maven:3.8-openjdk-11
  script:
    - mvn test
  coverage: '/Total.*?([0-9]{1,3})%/'

deploy-staging:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context staging
    - kubectl apply -f k8s/
  only:
    - develop

deploy-production:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context production
    - kubectl apply -f k8s/
  only:
    - main
  when: manual`}
          />

          <h3 id="github-actions" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.3 GitHub Actions
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            GitHub Actions 是 GitHub 原生集成的 CI/CD 服务， marketplace 提供大量预制 Action，适合开源项目。
          </p>

          <Playground language="yaml" filename=".github/workflows/ci.yml" description="GitHub Actions 示例" highlights={[8, 15, 22, 30]}
            code={`name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 11
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'
        cache: maven
    
    - name: Build with Maven
      run: mvn clean package -DskipTests
    
    - name: Run tests
      run: mvn test
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        files: ./target/site/jacoco/jacoco.xml
        
  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      env:
        KUBE_CONFIG: \${{ secrets.KUBE_CONFIG }}
      run: |
        echo "$KUBE_CONFIG" > kubeconfig
        kubectl --kubeconfig=kubeconfig apply -f k8s/`}
          />

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">特性</th>
                  <th className="text-left py-2.5 px-3 text-orange font-semibold">Jenkins</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">GitLab CI</th>
                  <th className="text-left py-2.5 px-3 text-indigo font-semibold">GitHub Actions</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">开源/商业</td><td className="py-2.5 px-3">开源免费</td><td className="py-2.5 px-3">社区版免费</td><td className="py-2.5 px-3">公有仓库免费</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">配置方式</td><td className="py-2.5 px-3">Jenkinsfile/GUI</td><td className="py-2.5 px-3">.gitlab-ci.yml</td><td className="py-2.5 px-3">.github/workflows/*.yml</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">插件生态</td><td className="py-2.5 px-3">1500+ 插件</td><td className="py-2.5 px-3">内置功能丰富</td><td className="py-2.5 px-3">Marketplace Action</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">维护成本</td><td className="py-2.5 px-3">高（需自建服务器）</td><td className="py-2.5 px-3">低（SaaS/自托管）</td><td className="py-2.5 px-3">最低（完全 SaaS）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">适用场景</td><td className="py-2.5 px-3">大型企业</td><td className="py-2.5 px-3">中小团队</td><td className="py-2.5 px-3">开源项目</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">学习曲线</td><td className="py-2.5 px-3">陡峭</td><td className="py-2.5 px-3">平缓</td><td className="py-2.5 px-3">平缓</td></tr>
              </tbody>
            </table>
          </div>

          {/* ========== 四、Docker 集成实践 ========== */}
          <h2 id="docker-integration" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Docker 集成实践
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Docker 是 CI/CD 的核心技术，它保证了环境一致性，实现了"一次构建，到处运行"。
          </p>

          <h3 id="dockerfile-optimization" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 Dockerfile 优化
          </h3>

          <Playground language="dockerfile" filename="Dockerfile" description="优化的 Java 应用 Dockerfile" highlights={[5, 10, 15, 20, 25]}
            code={`# 多阶段构建：第一阶段构建
FROM maven:3.8-openjdk-11 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# 第二阶段：运行
FROM openjdk:11-jre-slim
WORKDIR /app

# 创建非 root 用户
RUN groupadd -r appuser && useradd -r -g appuser appuser

# 复制构建产物
COPY --from=builder /app/target/*.jar app.jar

# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 切换到非 root 用户
USER appuser

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# 启动应用
ENTRYPOINT ["java", "-jar", "app.jar"]`}
          />

          <SideNote label="镜像大小优化">
            使用 jre-slim 基础镜像（~200MB）而非 jdk 镜像（~600MB）；采用多阶段构建，最终镜像只包含运行时需要的文件；清理 apt 缓存和临时文件。优化后可将镜像从 800MB 降至 150MB。
          </SideNote>

          <h3 id="multi-stage-build" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 多阶段构建
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            多阶段构建允许在一个 Dockerfile 中使用多个 FROM 指令，前一个阶段的产物可以被后续阶段引用，但最终镜像只包含最后一个阶段的内容，显著减小镜像体积。
          </p>

          <ContextSwitcher
            simpleContent={
              <div className="p-3 sm:p-4 bg-parchment-warm rounded-paper-md text-[13px] sm:text-[14px] text-ink-muted font-sans leading-[1.8]">
                多阶段构建就像"先在大厨房做菜，再把成品装到小盒子里带走"。构建阶段需要编译器、依赖库等大工具，运行阶段只需要 JRE 和 jar 包。分开后镜像更小，传输更快，启动更快。
              </div>
            }
            hardcoreContent={
              <div className="space-y-3">
                <Playground language="dockerfile" filename="Dockerfile.multi-stage" description="前端项目多阶段构建" highlights={[3, 8, 12]}
                  code={`# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
                />
                <SideNote label="优势总结">
                  1）镜像体积减小 60-80%；2）安全性提升（不包含源码和构建工具）；3）构建缓存复用（每层独立缓存）；4）符合单一职责原则。
                </SideNote>
              </div>
            }
          />

          {/* ========== 五、部署策略 ========== */}
          <h2 id="deployment-strategies" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、部署策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            不同的部署策略适用于不同的业务场景，选择合适的策略可以平衡风险和用户体验。
          </p>

          <h3 id="blue-green" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 蓝绿部署
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            蓝绿部署维护两套相同的生产环境（蓝色和绿色），一套对外提供服务，另一套部署新版本。切换流量后，旧版本作为备份保留，出现问题可秒级回滚。
          </p>

          <DiagramBlock title="蓝绿部署流程">
            {`graph LR
              LB["负载均衡器"] --> BLUE["蓝色环境 v1.0"]
              LB -.-> GREEN["绿色环境 v2.0"]
              
              BLUE --> USERS["用户流量"]
              
              style LB fill:#4682b4,stroke:#2c5282,color:white
              style BLUE fill:#b5651d25,stroke:#b5651d
              style GREEN fill:#5f7a6825,stroke:#5f7a68
              style USERS fill:#d4c5a9,stroke:#b5651d
            `}
          </DiagramBlock>

          <Callout type="tip" title="优点">
            ✅ 零停机部署<br />
            ✅ 秒级回滚<br />
            ✅ 新版本可在上线前充分测试
          </Callout>

          <Callout type="danger" title="缺点">
            ❌ 资源成本高（需要双倍服务器）<br />
            ❌ 数据库迁移复杂（需要向后兼容）<br />
            ❌ 会话保持问题（需要共享 Session）
          </Callout>

          <h3 id="canary" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 金丝雀发布
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            金丝雀发布逐步将流量从旧版本迁移到新版本，先切 5% → 20% → 50% → 100%，每一步都监控指标，发现问题立即回滚。名称来源于矿工用金丝雀检测瓦斯泄漏的做法。
          </p>

          <InteractiveFlow title="金丝雀发布流程" steps={[
            { label: '部署新版本', description: '在生产环境部署 v2.0，但不接收流量', icon: '📦' },
            { label: '切 5% 流量', description: '将 5% 的用户请求路由到 v2.0，监控错误率和延迟', icon: '🔀' },
            { label: '逐步增加', description: '如果指标正常，逐步增加到 20% → 50% → 100%', icon: '📈' },
            { label: '全量切换', description: '所有流量切换到 v2.0，下线 v1.0', icon: '✅' },
            { label: '异常回滚', description: '任何阶段发现异常，立即切回 v1.0', icon: '↩️' },
          ]} />

          <Playground language="yaml" filename="istio-canary.yaml" description="Istio 金丝雀配置" highlights={[8, 15, 20]}
            code={`apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: myapp-vs
spec:
  hosts:
  - myapp.example.com
  http:
  - route:
    - destination:
        host: myapp
        subset: v1
      weight: 90
    - destination:
        host: myapp
        subset: v2
      weight: 10
        
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: myapp-dr
spec:
  host: myapp
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2`}
          />

          <h3 id="rolling-update" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.3 滚动更新
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            滚动更新逐个替换实例，始终保持部分实例可用。Kubernetes Deployment 默认使用此策略，适合大多数场景。
          </p>

          <Playground language="yaml" filename="k8s-deployment.yaml" description="Kubernetes 滚动更新配置" highlights={[10, 15, 20]}
            code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # 最多额外创建 1 个 Pod
      maxUnavailable: 0  # 不允许有 Pod 不可用
  template:
    metadata:
      labels:
        app: myapp
        version: v2.0
    spec:
      containers:
      - name: myapp
        image: myapp:2.0
        ports:
        - containerPort: 8080
        readinessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5`}
          />

          <SideNote label="maxSurge vs maxUnavailable">
            maxSurge 控制升级时最多可以超出期望副本数的 Pod 数量；maxUnavailable 控制升级时最多可以有多少 Pod 不可用。两者不能同时为 0。例如 replicas=3，maxSurge=1，maxUnavailable=0，则升级过程是：3→4→3→4→3，始终保证 3 个可用。
          </SideNote>

          {/* ========== 六、最佳实践 ========== */}
          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、最佳实践
          </h2>

          <h3 id="security" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.1 安全考虑
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-green-700 font-sans mb-3">✅ 推荐做法</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>使用最小权限原则配置 Service Account</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>敏感信息通过 Secret/Vault 管理</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>镜像签名验证（Cosign/Notary）</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>定期扫描镜像漏洞（Trivy/Clair）</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>网络策略限制 Pod 间通信</span></li>
              </ul>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-red-700 font-sans mb-3">❌ 避免做法</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要在代码中硬编码密码/API Key</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要以 root 用户运行容器</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要使用 latest 标签（不可追溯）</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要跳过安全扫描直接部署</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要开放不必要的端口</span></li>
              </ul>
            </div>
          </div>

          <h3 id="monitoring" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.2 监控与告警
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            部署后的监控至关重要，应及时发现异常并告警。典型的监控栈包括 Prometheus（指标采集）、Grafana（可视化）、AlertManager（告警）。
          </p>

          <Playground language="yaml" filename="prometheus-alert.yml" description="Prometheus 告警规则" highlights={[8, 15, 22]}
            code={`groups:
- name: application-alerts
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "高错误率: {{ $labels.instance }}"
      description: "5xx 错误率超过 5%"
      
  - alert: HighLatency
    expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: "高延迟: {{ $labels.instance }}"
      description: "P95 延迟超过 1 秒"
      
  - alert: PodCrashLooping
    expr: rate(kube_pod_container_status_restarts_total[15m]) * 60 * 15 > 0
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Pod 频繁重启: {{ $labels.pod }}"`}
          />

          {/* ========== 七、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区一：CI/CD 就是自动部署">
            <span className="font-semibold text-ink-light">你以为的：</span>配置好流水线就万事大吉<br />
            <span className="font-semibold text-accent">实际：</span>CI/CD 的核心是<strong>文化</strong>而非工具。如果没有测试文化、代码审查文化、快速反馈文化，再先进的工具也无法发挥作用。自动化只是手段，质量意识和协作精神才是根本。
          </Callout>

          <Callout type="danger" title="误区二：测试越多越好">
            <span className="font-semibold text-ink-light">你以为的：</span>把所有测试都放进流水线<br />
            <span className="font-semibold text-accent">实际：</span>流水线应该<strong>快速反馈</strong>。单元测试应在几分钟内完成，E2E 测试可以异步运行。遵循测试金字塔：70% 单元测试 + 20% 集成测试 + 10% E2E 测试。过多的 E2E 测试会让流水线变慢，降低开发效率。
          </Callout>

          <Callout type="danger" title="误区三：Docker 镜像越大越全越好">
            <span className="font-semibold text-ink-light">你以为的：</span>在镜像里安装所有可能用到的工具<br />
            <span className="font-semibold text-accent">实际：</span>大镜像导致传输慢、启动慢、漏洞多。应使用<strong>多阶段构建</strong>和<strong>精简基础镜像</strong>（如 alpine、slim）。生产镜像只包含运行时必需的文件，删除构建工具和源码。理想大小：Java 应用 &lt; 200MB，Node.js 应用 &lt; 100MB。
          </Callout>

          <Callout type="danger" title="误区四：金丝雀发布不需要监控">
            <span className="font-semibold text-ink-light">你以为的：</span>切了流量就等着看结果<br />
            <span className="font-semibold text-accent">实际：</span>金丝雀发布的核心是<strong>基于指标的决策</strong>。必须实时监控错误率、延迟、CPU、内存等指标，并设置自动回滚阈值。没有监控的金丝雀发布等同于盲飞，风险极高。
          </Callout>

          <Callout type="danger" title="误区五：数据库迁移可以最后做">
            <span className="font-semibold text-ink-light">你以为的：</span>先部署代码，再手动执行 SQL<br />
            <span className="font-semibold text-accent">实际：</span>数据库迁移应<strong>纳入流水线</strong>，使用 Flyway/Liquibase 等工具自动化。迁移脚本应具备<strong>幂等性</strong>（可重复执行）和<strong>向后兼容性</strong>（新旧代码都能工作）。蓝绿部署时，数据库 schema 变更必须先于代码部署。
          </Callout>

          {/* ========== 八、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            { question: 'CI/CD 的核心价值是什么？', answer: 'CI/CD 的核心价值包括：1）快速反馈：代码提交后几分钟内就能知道是否破坏构建；2）降低风险：小步快跑，每次变更很小，出问题容易定位和回滚；3）提高效率：自动化替代手工操作，减少人为错误；4）提升质量：强制代码审查、自动化测试、静态分析；5）加速交付：从想法到上线的时间从几周缩短到几小时。' },
            { question: '蓝绿部署和金丝雀发布有什么区别？如何选择？', answer: '蓝绿部署：维护两套完整环境，切换是瞬间完成的，优点是零停机、秒级回滚，缺点是资源成本高（双倍服务器）。金丝雀发布：逐步增加新版本流量比例（5%→20%→50%→100%），优点是资源成本低、风险可控，缺点是切换时间长、需要精细的流量控制。选择建议：资源充足且要求快速切换用蓝绿；资源有限或想渐进式验证用金丝雀；一般业务用滚动更新即可。' },
            { question: '如何优化 Docker 镜像大小？', answer: '优化策略：1）使用精简基础镜像（alpine/slim 而非完整版）；2）多阶段构建，最终镜像只包含运行时文件；3）合并 RUN 指令，减少层数；4）清理缓存和临时文件（apt-get clean、rm -rf /tmp/*）；5）使用 .dockerignore 排除不必要文件；6）选择合适的基础镜像版本（jre-slim 而非 jdk）；7）压缩应用文件。优化效果：Java 应用可从 800MB 降至 150MB，Node.js 应用可从 1GB 降至 80MB。' },
            { question: 'Jenkins、GitLab CI、GitHub Actions 如何选择？', answer: '选择依据：1）Jenkins：适合大型企业，需要高度定制化，有专门运维团队，预算充足；2）GitLab CI：适合中小团队，代码托管在 GitLab，希望一体化解决方案；3）GitHub Actions：适合开源项目或个人项目，代码在 GitHub，希望零配置成本。趋势：越来越多团队从 Jenkins 迁移到云原生 CI/CD（GitLab CI/GitHub Actions），因为维护成本低、上手快。' },
            { question: '如何实现零停机部署？', answer: '零停机部署方案：1）蓝绿部署：同时运行新旧版本，通过负载均衡器切换流量；2）滚动更新：逐个替换实例，始终保持部分实例可用（Kubernetes 默认策略）；3）金丝雀发布：逐步增加新版本流量，配合监控自动回滚。关键技术：健康检查（readiness probe）、优雅停机（SIGTERM 信号处理）、会话保持（Redis 共享 Session）、数据库向后兼容。' },
            { question: 'CI/CD 流水线中如何处理敏感信息？', answer: '敏感信息管理方案：1）环境变量：通过 CI/CD 平台的 Secrets 功能注入（如 GitHub Secrets、GitLab Variables）；2）密钥管理服务：HashiCorp Vault、AWS Secrets Manager、Azure Key Vault；3）Kubernetes Secret：Base64 编码存储，配合 RBAC 控制访问；4）加密文件：使用 git-crypt 或 SOPS 加密配置文件；5）禁止事项：绝不硬编码在代码中、不提交到 Git、不在日志中打印。最佳实践：开发环境用明文，测试/生产环境用密钥管理服务。' },
            { question: '什么是 GitOps？与传统 CI/CD 有什么区别？', answer: 'GitOps 是以 Git 为唯一事实来源的运维范式，核心原则：1）声明式：用 YAML 描述期望状态；2）版本化：所有变更通过 Git 提交；3）自动化：Operator 持续对比实际状态与期望状态；4）自愈：检测到漂移自动修复。与传统 CI/CD 区别：传统 CI/CD 是推送式（push-based），CI 服务器主动部署；GitOps 是拉取式（pull-based），集群内的 Agent（如 ArgoCD）主动从 Git 拉取配置并应用。优势：审计追踪清晰、回滚简单（git revert）、权限管理统一（Git PR）。' },
            { question: '如何设计一个健壮的 CI/CD 流水线？', answer: '健壮流水线设计要点：1）快速反馈：单元测试应在 5 分钟内完成；2）并行执行：独立任务并行运行（如前端/后端分别构建）；3）缓存优化：依赖缓存、Docker 层缓存、构建产物缓存；4）失败重试：网络波动导致的失败自动重试 2-3 次；5）超时控制：每个阶段设置合理超时，避免卡死；6）通知机制：成功/失败通过 Slack/邮件通知；7）幂等性：流水线可重复执行，不会产生副作用；8）环境隔离：dev/staging/prod 严格隔离；9）回滚策略：支持一键回滚到上一个稳定版本；10）监控集成：部署后自动验证健康状态。' },
          ]} />

          {/* ========== 九、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">← 前置知识</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">📋</span><span>Maven 构建工具</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🐳</span><span>Docker 容器化</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">☸️</span><span>Kubernetes 基础</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔧</span><span>Linux 命令行</span></div>
              </div>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">延伸知识 →</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🌐</span><span>微服务架构</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">📊</span><span>可观测性体系</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔐</span><span>DevSecOps 安全实践</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔄</span><span>GitOps 工作流</span></div>
              </div>
            </div>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      <SmartTOC items={tocItems} />
    </div>
  )
}
