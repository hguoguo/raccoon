# 知识点创建待办任务清单

## 概述
本清单基于 `chapters.ts` 文件第99-219行定义的章节和文章信息，列出需要创建的知识点页面任务。

## 待创建知识点列表

### 1. 函数式编程 (05-functional-programming)
- [x] Lambda表达式详解 (`lambda-expressions`) ✅ 已创建并部署
- [x] Stream API深度解析 (`stream-api`) ✅ 已创建并部署
- [x] Optional优雅处理空值 (`optional`) ✅ 已创建并部署

### 2. Spring框架全家桶 (06-spring-framework)
- [x] Spring核心IoC容器 (`spring-core`) ✅ 已创建并部署
- [x] Spring AOP切面编程 (`spring-aop`) ✅ 已创建并部署
- [x] Spring Boot自动化配置 (`spring-boot`) ✅ 已创建并部署
- [x] Spring Data JPA (`spring-data-jpa`) ✅ 已创建并部署
- [x] Spring Security安全框架 (`spring-security`) ✅ 已创建并部署
- [x] Spring MVC架构模式 (`spring-mvc`) ✅ 已创建并部署
- [x] Spring事务管理（重点🔥）(`spring-transaction`) ✅ 已创建并部署
- [x] Spring事件机制 (`spring-event`) ✅ 已创建并部署

### 3. 数据库访问技术 (07-database)
- [ ] JDBC底层原理 (`jdbc`)
- [ ] 数据库连接池 (`connection-pool`)
- [ ] Hibernate ORM框架 (`hibernate`)
- [x] MyBatis SQL映射 (`mybatis`) ✅ 已创建并部署
- [x] MyBatis-Plus增强工具 (`mybatis-plus`) ✅ 已创建并部署
- [x] SQL优化与索引（重点🔥）(`sql-optimization`) ✅ 已创建并部署
- [x] Redis缓存实战（JD要求🔥）(`redis-cache`) ✅ 已创建并部署

### 4. 微服务架构 (08-microservices)
- [x] Spring Cloud核心组件 (`spring-cloud-core`) ✅ 已创建并部署
- [x] API网关设计 (`api-gateway`) ✅ 已创建并部署
- [x] 分布式事务 (`distributed-transaction`) ✅ 已创建并部署
- [ ] 配置中心 (`configuration-management`)
- [ ] 服务限流降级 (`service-resilience`)
- [ ] 分布式链路追踪 (`distributed-tracing`)
- [ ] 消息队列 (`message-queue`)

### 5. 设计模式 (09-design-patterns)
- [ ] 设计模式概述与原则 (`design-pattern-intro`)
- [ ] 创建型模式（单例/工厂/建造者）(`creational-patterns`)
- [ ] 结构型模式（代理/装饰器/适配器）(`structural-patterns`)
- [ ] 行为型模式（策略/观察者/模板方法）(`behavioral-patterns`)

### 6. 网络编程与协议 (10-network-protocol)
- [ ] TCP/IP协议栈 (`tcp-ip-basics`)
- [ ] HTTP/HTTPS协议详解 (`http-protocol`)
- [ ] RESTful API设计 (`restful-api`)
- [ ] Socket编程 (`socket-programming`)

### 7. 构建工具与工程化 (11-build-tools)
- [ ] Maven构建工具 (`maven`)
- [ ] Gradle构建工具 (`gradle`)
- [ ] 项目结构与规范 (`project-structure`)
- [ ] CI/CD持续集成部署 (`cicd`)

### 8. Java安全 (12-java-security)
- [ ] 加密与解密 (`cryptography`)
- [ ] 数字签名与证书 (`digital-signature`)
- [ ] OWASP常见漏洞防护 (`owasp-security`)

### 9. AI工程化进阶（JD加分项🔥）
- [ ] 模型微调与训练 (`model-finetuning`)
- [ ] AI Coding实践与工作流 (`ai-coding-workflow`)
- [ ] 金丝雀灰度发布策略 (`canary-deployment`)
- [ ] 全链路监控告警体系 (`observability-monitoring`)

### 10. LLM高级应用（新增章节🔥）
- [ ] LlamaIndex框架深度解析 (`llamaindex-framework`)
- [ ] Multi-Agent多智能体协作架构 (`multi-agent-collaboration`)
- [ ] API插件开发与设计模式 (`api-plugin-development`)
- [ ] 大模型轻量化部署与量化推理 (`llm-quantization-deployment`)
- [ ] 文档结构化处理与布局分析 (`document-structure-extraction`)
- [ ] OCR+AI智能文档识别 (`ocr-ai-integration`)
- [ ] 语义检索优化策略 (`semantic-search-optimization`)
- [ ] 内容抽取与信息提取 (`content-extraction`)
- [ ] Dify低代码AI应用平台 (`dify-platform`)
- [ ] MCP协议与上下文管理 (`mcp-protocol`)
- [ ] MCP Server开发与集成 (`mcp-server-development`)
- [ ] 多模态Agent架构设计 (`multimodal-agent`)

### 11. 大数据生态（新增章节🔥）
- [ ] Flink实时计算框架 (`flink-streaming`)
- [ ] Spark分布式计算 (`spark-computing`)
- [ ] Hadoop生态系统 (`hadoop-ecosystem`)
- [ ] Hive数据仓库 (`hive-data-warehouse`)
- [ ] Elasticsearch搜索引擎 (`elasticsearch`)
- [ ] HDFS分布式文件系统 (`hdfs`)
- [ ] 实时数仓架构设计 (`realtime-data-warehouse`)
- [ ] 流批一体处理 (`stream-batch-unified`)

### 12. AI多智能体框架扩展（新增章节🔥）
- [ ] AutoGen多智能体框架 (`autogen-framework`)
- [ ] CrewAI协作框架 (`crewai-framework`)
- [ ] NL2SQL自然语言转SQL (`nl2sql`)

### 13. AI Coding工具与实践（新增章节🔥）
- [ ] Cursor AI代码编辑器 (`cursor-ai-editor`)
- [ ] GitHub Copilot编程助手 (`github-copilot`)
- [ ] Claude Code智能编程 (`claude-code`)

## 创建要求

对于每个知识点页面，需要：
1. 在 `site/src/pages/articles/` 目录下创建对应的 `.tsx` 文件
2. 确保文件名与 `slug` 字段一致
3. 实现符合项目规范的 React 组件
4. 包含适当的元数据信息（标题、标签、难度等）
5. 添加必要的导入语句和类型定义
6. 遵循项目的代码风格和组件使用规范

## 注意事项

- 优先处理标记为"重点🔥"的知识点
- 按照章节顺序逐步完成
- 确保新创建的页面与现有页面风格保持一致
- 验证所有前置知识(prerequisites)和相关模式(relatedPatterns)链接的有效性