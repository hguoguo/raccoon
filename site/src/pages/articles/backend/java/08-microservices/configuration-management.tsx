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
  { id: 'why-config-center', text: '一、为什么需要配置中心?', level: 2 },
  { id: 'core-concepts', text: '二、核心概念', level: 2 },
  { id: 'nacos-config', text: '三、Nacos Config 实战', level: 2 },
  { id: 'spring-cloud-config', text: '四、Spring Cloud Config', level: 2 },
  { id: 'apollo', text: '五、Apollo 配置中心', level: 2 },
  { id: 'dynamic-refresh', text: '六、配置动态刷新机制', level: 2 },
  { id: 'gray-release', text: '七、灰度发布与配置版本管理', level: 2 },
  { id: 'security', text: '八、配置安全管理', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function ConfigurationManagement({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              配置中心是微服务架构中的<strong className="text-accent">集中化配置管理平台</strong>,提供配置的存储、分发、动态刷新、版本管理和环境隔离能力,解决配置分散、修改困难、重启生效等问题。
            </p>
          </blockquote>

          <Callout type="tip" title="配置管理的演进">
            从硬编码 → properties/yaml 文件 → 环境变量 → 配置中心,配置管理经历了从分散到集中、从静态到动态的演进过程。配置中心是现代微服务架构的基础设施之一。
          </Callout>

          <h2 id="why-config-center" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、为什么需要配置中心?
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            在单体应用中,配置文件通常放在项目内部,修改后重启即可。但在微服务架构中,这种方式的弊端暴露无遗:
          </p>

          <table className="w-full border-collapse my-6 text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left font-semibold">问题</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">传统方式</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">配置中心方案</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2">配置分散</td>
                <td className="border border-border-light px-4 py-2">散落在各个服务的 jar 包中</td>
                <td className="border border-border-light px-4 py-2">集中存储在配置中心</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">修改困难</td>
                <td className="border border-border-light px-4 py-2">需要重新打包部署</td>
                <td className="border border-border-light px-4 py-2">在线修改,实时生效</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">环境隔离</td>
                <td className="border border-border-light px-4 py-2">多套配置文件,容易混淆</td>
                <td className="border border-border-light px-4 py-2">通过命名空间/Profile 隔离</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">版本管理</td>
                <td className="border border-border-light px-4 py-2">依赖 Git 提交记录</td>
                <td className="border border-border-light px-4 py-2">内置版本历史和回滚</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">权限控制</td>
                <td className="border border-border-light px-4 py-2">文件系统权限</td>
                <td className="border border-border-light px-4 py-2">细粒度的 RBAC 权限管理</td>
              </tr>
            </tbody>
          </table>

          <SideNote label="配置 vs 代码">
            配置应该是可变的、环境相关的参数(如数据库地址、线程池大小),而代码逻辑不应该放在配置中。过度配置会导致系统行为不可预测,难以调试。
          </SideNote>

          <h2 id="core-concepts" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、核心概念
          </h2>

          <DiagramBlock title="配置中心核心概念模型">
{`graph TB
    subgraph "配置维度"
        Namespace[命名空间<br/>隔离不同环境/租户]
        Group[分组<br/>逻辑分组配置]
        DataId[Data ID<br/>配置唯一标识]
    end
    
    subgraph "配置内容"
        ConfigContent[配置内容<br/>YAML/Properties/JSON]
        Version[版本号<br/>历史版本管理]
        Metadata[元数据<br/>描述信息]
    end
    
    subgraph "功能特性"
        DynamicRefresh[动态刷新<br/>@RefreshScope]
        GrayRelease[灰度发布<br/>按规则推送]
        Encryption[加密存储<br/>敏感信息保护]
        AuditLog[审计日志<br/>变更记录]
    end
    
    Namespace --> Group
    Group --> DataId
    DataId --> ConfigContent
    ConfigContent --> Version
    ConfigContent --> Metadata
    
    ConfigContent -.-> DynamicRefresh
    ConfigContent -.-> GrayRelease
    ConfigContent -.-> Encryption
    ConfigContent -.-> AuditLog`}
          </DiagramBlock>

          <h3 id="namespace-group-dataid" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            命名空间(Namespace)、分组(Group)、Data ID
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            这是 Nacos 配置中心的三层隔离模型:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><strong>Namespace</strong>: 最高级别隔离,用于区分不同环境(dev/test/prod)或不同租户</li>
            <li><strong>Group</strong>: 次级隔离,用于逻辑分组(如 DEFAULT_GROUP、ORDER_GROUP)</li>
            <li><strong>Data ID</strong>: 配置的唯一标识,通常为 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">{`{application}-{profile}.yaml`}</code></li>
          </ul>

          <h2 id="nacos-config" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Nacos Config 实战
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Nacos 是目前最流行的配置中心实现之一,集成了服务发现和配置管理功能。
          </p>

          <Playground
            code={`# pom.xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
    <version>2022.0.0.0</version>
</dependency>`}
            language="xml"
            highlights={[4]}
            filename="pom.xml"
            description="引入 Nacos Config 依赖"
          />

          <Playground
            code={`# bootstrap.yml (优先级高于 application.yml)
spring:
  application:
    name: order-service
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848  # Nacos 服务器地址
        namespace: dev  # 命名空间 ID
        group: DEFAULT_GROUP  # 分组
        file-extension: yaml  # 配置文件格式
        shared-configs:
          - data-id: common-config.yaml  # 共享配置
            refresh: true  # 支持动态刷新
        extension-configs:
          - data-id: redis-config.yaml  # 扩展配置
            group: REDIS_GROUP
            refresh: true`}
            language="yaml"
            highlights={[7, 9, 13, 16]}
            filename="bootstrap.yml"
            description="Nacos Config 基础配置"
          />

          <Callout type="warning" title="bootstrap.yml vs application.yml">
            Spring Cloud 2020.0.0+ 版本默认不再加载 bootstrap.yml,需要添加 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">spring-cloud-starter-bootstrap</code> 依赖才能启用。或者将配置直接写在 application.yml 中。
          </Callout>

          <h3 id="refresh-scope" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            @RefreshScope 动态刷新
          </h3>

          <Playground
            code={`@RestController
@RefreshScope  // 标记为可刷新的 Bean
public class ConfigController {
    
    @Value("\${app.config.timeout:30}")  // 注入配置值,默认 30 秒
    private Integer timeout;
    
    @Value("\${app.config.max-retry:3}")
    private Integer maxRetry;
    
    @GetMapping("/config")
    public Map<String, Object> getConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put("timeout", timeout);
        config.put("maxRetry", maxRetry);
        return config;
    }
}

// 使用 @ConfigurationProperties 的方式(推荐)
@Component
@ConfigurationProperties(prefix = "app.config")
@Data
public class AppConfig {
    private Integer timeout = 30;
    private Integer maxRetry = 3;
}`}
            language="java"
            highlights={[2, 5, 21]}
            filename="ConfigController.java"
            description="@RefreshScope 实现配置动态刷新"
          />

          <SideNote label="@RefreshScope 原理">
            @RefreshScope 基于 Spring Cloud Context 实现,当配置变更时,会销毁并重新创建被标记的 Bean,从而获取最新的配置值。注意:这种方式有性能开销,频繁变更的配置不建议使用。
          </SideNote>

          <h2 id="spring-cloud-config" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Spring Cloud Config
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring Cloud Config 是 Spring 官方提供的配置中心解决方案,后端存储支持 Git、SVN、本地文件系统。
          </p>

          <Playground
            code={`# Config Server 配置
server:
  port: 8888

spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/myorg/config-repo.git  # Git 仓库地址
          username: \${GIT_USERNAME}
          password: \${GIT_PASSWORD}
          search-paths:
            - '{application}'  # 按应用名搜索目录
          default-label: main  # 默认分支`}
            language="yaml"
            highlights={[9, 14]}
            filename="config-server.yml"
            description="Spring Cloud Config Server 配置"
          />

          <Playground
            code={`# Config Client 配置
spring:
  cloud:
    config:
      uri: http://localhost:8888  # Config Server 地址
      name: order-service  # 应用名称
      profile: dev  # 环境标识
      label: main  # Git 分支
      
      # 失败重试配置
      retry:
        initial-interval: 1000  # 初始间隔 1 秒
        max-attempts: 6  # 最大重试次数
        multiplier: 1.1  # 间隔倍增系数`}
            language="yaml"
            highlights={[5, 7, 11]}
            filename="config-client.yml"
            description="Spring Cloud Config Client 配置"
          />

          <Callout type="info" title="Git 作为配置存储的优势">
            (1) 版本控制:天然支持配置的历史版本和回滚;(2) 协作方便:多人通过 Git 协作修改配置;(3) 备份可靠:Git 仓库本身就是分布式备份。但缺点是实时性不如 Nacos/Apollo。
          </Callout>

          <h2 id="apollo" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Apollo 配置中心
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Apollo(阿波罗)是携程开源的配置管理中心,支持配置修改实时生效、版本管理、灰度发布等功能。
          </p>

          <DiagramBlock title="Apollo 架构设计">
{`graph TB
    subgraph "Portal 管理界面"
        Portal[Apollo Portal<br/>Web 管理界面]
    end
    
    subgraph "Config Service 配置服务"
        CS1[Config Service 1]
        CS2[Config Service 2]
    end
    
    subgraph "Admin Service 管理服务"
        AS1[Admin Service 1]
        AS2[Admin Service 2]
    end
    
    subgraph "数据存储"
        DB[(MySQL<br/>配置数据)]
    end
    
    subgraph "Client 客户端"
        App1[Application 1]
        App2[Application 2]
        App3[Application 3]
    end
    
    Portal --> AS1
    Portal --> AS2
    AS1 --> DB
    AS2 --> DB
    CS1 --> DB
    CS2 --> DB
    App1 --> CS1
    App2 --> CS2
    App3 --> CS1`}
          </DiagramBlock>

          <Playground
            code={`# app.properties (Apollo 客户端配置)
app.id=order-service
apollo.meta=http://localhost:8080
apollo.bootstrap.enabled=true
apollo.bootstrap.namespaces=application,redis-config,database-config`}
            language="properties"
            highlights={[1, 4]}
            filename="app.properties"
            description="Apollo 客户端配置"
          />

          <table className="w-full border-collapse my-6 text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left font-semibold">特性</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">Nacos</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">Spring Cloud Config</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">Apollo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2">实时推送</td>
                <td className="border border-border-light px-4 py-2">✅ HTTP Long Polling</td>
                <td className="border border-border-light px-4 py-2">❌ 需手动刷新/Webhook</td>
                <td className="border border-border-light px-4 py-2">✅ HTTP Long Polling</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">灰度发布</td>
                <td className="border border-border-light px-4 py-2">✅ 支持</td>
                <td className="border border-border-light px-4 py-2">❌ 不支持</td>
                <td className="border border-border-light px-4 py-2">✅ 完善支持</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">权限管理</td>
                <td className="border border-border-light px-4 py-2">简单</td>
                <td className="border border-border-light px-4 py-2">依赖 Git</td>
                <td className="border border-border-light px-4 py-2">完善的 RBAC</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">配置格式</td>
                <td className="border border-border-light px-4 py-2">YAML/Properties</td>
                <td className="border border-border-light px-4 py-2">YAML/Properties</td>
                <td className="border border-border-light px-4 py-2">Properties</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">社区活跃度</td>
                <td className="border border-border-light px-4 py-2">⭐⭐⭐⭐⭐</td>
                <td className="border border-border-light px-4 py-2">⭐⭐⭐⭐</td>
                <td className="border border-border-light px-4 py-2">⭐⭐⭐</td>
              </tr>
            </tbody>
          </table>

          <h2 id="dynamic-refresh" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、配置动态刷新机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            配置动态刷新是配置中心的核心能力,主流实现方式有两种:
          </p>

          <h3 id="long-polling" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            HTTP Long Polling(长轮询)
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Nacos 和 Apollo 采用的方式。客户端发起 HTTP 请求,服务端hold住连接直到配置变更或超时(默认 30 秒)。相比短轮询,减少了无效请求;相比 WebSocket,实现更简单。
          </p>

          <DiagramBlock title="Long Polling 工作流程">
{`sequenceDiagram
    participant C as Client
    participant S as Server
    
    C->>S: HTTP GET /configs (timeout=30s)
    Note over S: 检查配置是否变更
    alt 配置变更
        S->>C: 立即返回新配置
    else 超时(30s)
        S->>C: 返回 304 Not Modified
    end
    C->>C: 更新本地配置
    C->>C: 触发 @RefreshScope Bean 重建
    C->>S: 立即发起下一轮 Long Polling`}
          </DiagramBlock>

          <h3 id="message-queue-push" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            消息队列推送
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            某些场景下,可以通过消息队列(RocketMQ/Kafka)推送配置变更事件,客户端订阅相关 Topic 实现实时更新。这种方式适合大规模集群,避免 Long Polling 带来的连接数压力。
          </p>

          <h2 id="gray-release" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、灰度发布与配置版本管理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            灰度发布允许部分实例先使用新配置,验证无误后再全量推送,降低配置变更风险。
          </p>

          <Playground
            code={`# Nacos 灰度配置示例
# 在 Nacos 控制台创建灰度规则
gray-rule:
  name: "order-service-timeout-gray"
  condition: "headers['x-gray-tag'] == 'true'"  # 根据请求头判断
  items:
    - ip: "192.168.1.100"  # 指定 IP
      app.config.timeout: 60  # 灰度配置值
    - ip: "192.168.1.101"
      app.config.timeout: 60
  default:
    app.config.timeout: 30  # 默认配置值`}
            language="yaml"
            highlights={[5, 7, 12]}
            filename="gray-config.yaml"
            description="Nacos 灰度配置规则"
          />

          <Callout type="tip" title="灰度发布最佳实践">
            (1) 先灰度 1-2 台实例,观察监控指标(错误率、响应时间);(2) 逐步扩大灰度范围(10% → 50% → 100%);(3) 设置自动回滚策略,当错误率超过阈值时自动恢复旧配置;(4) 灰度期间保持人工值守。
          </Callout>

          <h2 id="security" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、配置安全管理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            配置中可能包含数据库密码、API 密钥等敏感信息,必须采取安全措施:
          </p>

          <h3 id="encryption" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            配置加密
          </h3>

          <Playground
            code={`# 使用 Jasypt 加密配置
# 1. 添加依赖
<dependency>
    <groupId>com.github.ulisesbocchio</groupId>
    <artifactId>jasypt-spring-boot-starter</artifactId>
    <version>3.0.5</version>
</dependency>

# 2. 生成密文
java -cp jasypt-1.9.3.jar org.jasypt.intf.cli.JasyptPBEStringEncryptionCLI \
  input="db.password123" password="my-secret-key" algorithm=PBEWithMD5AndDES

# 输出: ENC(xxx...)

# 3. 在配置中使用密文
spring:
  datasource:
    password: ENC(xxx...)  # 加密后的密码

# 4. 启动时传入解密密钥
java -jar app.jar --jasypt.encryptor.password=my-secret-key`}
            language="yaml"
            highlights={[14, 21]}
            filename="encrypted-config.yml"
            description="Jasypt 配置加密"
          />

          <Callout type="danger" title="密钥管理注意事项">
            解密密钥不应硬编码在代码或配置文件中!应通过以下方式传递:(1) 环境变量;(2) KMS(密钥管理服务);(3) HashiCorp Vault;(4) 启动参数(注意进程列表可见性)。
          </Callout>

          <h3 id="access-control" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            访问控制
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><strong>认证</strong>: 配置中心应要求客户端提供凭证(Token/API Key)</li>
            <li><strong>授权</strong>: 基于角色的访问控制(RBAC),区分读写权限</li>
            <li><strong>审计</strong>: 记录所有配置的修改操作(谁、何时、改了什么)</li>
            <li><strong>网络隔离</strong>: 配置中心仅在内网访问,禁止暴露公网</li>
          </ul>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1:把所有配置都放到配置中心">
            配置中心应该只管理<strong>环境相关</strong>和<strong>可能动态变更</strong>的配置。不变的配置(如类名、算法选择)应保留在代码中。过度配置会导致系统行为不可预测。
          </Callout>

          <Callout type="danger" title="误区 2:配置变更后立即全量推送">
            配置变更存在风险,应采用灰度发布策略,先在少量实例上验证,确认无误后再全量推送。紧急情况下也要保留快速回滚能力。
          </Callout>

          <Callout type="danger" title="误区 3:忽略配置变更的性能影响">
            @RefreshScope 会销毁并重建 Bean,如果 Bean 持有大量资源(如线程池、连接池),频繁刷新会导致性能抖动。对于这类配置,建议重启应用而非动态刷新。
          </Callout>

          <Callout type="danger" title="误区 4:配置中心高可用不重要">
            配置中心故障会导致所有服务无法启动或获取最新配置,必须保证高可用。Nacos 应部署集群模式,Apollo 应部署多个 Config Service 实例。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "配置中心和注册中心的区别是什么?",
              answer: "注册中心管理服务实例的地址和健康状态,解决'服务在哪里'的问题;配置中心管理应用的配置参数,解决'配置怎么管理'的问题。两者可以独立部署,也可以集成(如 Nacos 同时提供服务发现和配置管理)。"
            },
            {
              question: "如何实现配置的动态刷新?",
              answer: "(1) @RefreshScope: 标记 Bean,配置变更时销毁重建;(2) EnvironmentChangeEvent: 监听配置变更事件,手动处理;(3) @ConfigurationProperties + @RefreshScope: 推荐方式,类型安全且自动绑定。底层通过 Long Polling 或消息推送感知配置变更。"
            },
            {
              question: "Nacos 配置中心的 Long Polling 机制是如何实现的?",
              answer: "客户端发起 HTTP 请求,服务端通过 DataChangeListener 监听配置变更。如果配置未变更,服务端 hold 住连接最多 30 秒;如果配置变更,立即返回新配置 MD5 值。客户端对比 MD5,不一致则拉取最新配置。这种方式既保证了实时性,又避免了频繁轮询的性能开销。"
            },
            {
              question: "配置中心如何保证高可用?",
              answer: "(1) 集群部署: 至少 3 个节点,避免单点故障;(2) 数据复制: 配置数据在多节点间同步(如 Nacos 使用 Raft 协议);(3) 客户端缓存: 客户端本地缓存配置,配置中心不可用时使用缓存;(4) 负载均衡: 客户端通过 VIP 或 DNS 轮询访问多个节点。"
            },
            {
              question: "如何处理配置变更导致的服务异常?",
              answer: "(1) 灰度发布: 先在少量实例验证;(2) 监控告警: 配置变更后密切监控错误率、响应时间等指标;(3) 快速回滚: 配置中心支持版本回滚,一键恢复旧配置;(4) 降级策略: 配置解析失败时使用默认值,避免服务崩溃;(5) 自动化测试: 配置变更前在测试环境验证。"
            },
            {
              question: "Spring Cloud Config 和 Nacos Config 如何选择?",
              answer: "如果技术栈以 Spring 为主且已有 Git 基础设施,选择 Spring Cloud Config;如果需要服务发现+配置管理一体化、实时性要求高、需要灰度发布,选择 Nacos Config。现代微服务架构更倾向于 Nacos,因为功能更全面、社区更活跃。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            学习完配置中心后,建议继续深入学习:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><a href="/docs/08-microservices/spring-cloud-core" className="text-accent hover:underline">Spring Cloud 核心组件</a> - 了解配置中心在微服务架构中的位置</li>
            <li><a href="/docs/08-microservices/service-resilience" className="text-accent hover:underline">服务限流降级</a> - 配置中心常用于动态调整限流阈值</li>
            <li><a href="/docs/08-microservices/distributed-tracing" className="text-accent hover:underline">分布式链路追踪</a> - 追踪配置变更对系统的影响</li>
            <li><a href="/docs/06-spring-framework/spring-boot" className="text-accent hover:underline">Spring Boot 自动化配置</a> - 理解 Spring Boot 的配置加载机制</li>
          </ul>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
