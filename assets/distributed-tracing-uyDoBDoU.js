import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as d}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as i}from"./SideNote-BKvanovA.js";import{C as t,A as l,S as o}from"./ArticleNav-DhfiS38Y.js";import{D as s}from"./DiagramBlock-CLaKE9_7.js";import{I as c}from"./InterviewSection-BBNdwyyN.js";const p=[{id:"definition",text:"一句话定义",level:2},{id:"why-tracing",text:"一、为什么需要分布式链路追踪?",level:2},{id:"core-concepts",text:"二、核心概念",level:2},{id:"trace-propagation",text:"三、Trace 上下文传播",level:2},{id:"skywalking",text:"四、SkyWalking 实战",level:2},{id:"zipkin",text:"五、Zipkin 实战",level:2},{id:"jaeger",text:"六、Jaeger 实战",level:2},{id:"sampling",text:"七、采样策略",level:2},{id:"custom-span",text:"八、自定义 Span",level:2},{id:"performance-analysis",text:"九、性能分析与优化",level:2},{id:"misconceptions",text:"十、常见误区",level:2},{id:"interview",text:"十一、面试真题",level:2},{id:"related",text:"十二、知识关联",level:2}];function u({meta:a}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(d,{meta:a,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["分布式链路追踪(Distributed Tracing)是微服务架构中的",e.jsx("strong",{className:"text-accent",children:"全链路监控技术"}),",通过唯一的 Trace ID 串联一次请求在所有服务间的调用路径,可视化展示请求的完整生命周期,帮助定位性能瓶颈和故障根因。"]})}),e.jsxs(t,{type:"tip",title:"可观测性三大支柱",children:["现代微服务监控体系由三大支柱组成:",e.jsx("br",{}),"(1) ",e.jsx("strong",{children:"Metrics(指标)"}),': 聚合数据(QPS、错误率、响应时间),回答"系统是否正常";',e.jsx("br",{}),"(2) ",e.jsx("strong",{children:"Logging(日志)"}),': 离散事件记录,回答"发生了什么";',e.jsx("br",{}),"(3) ",e.jsx("strong",{children:"Tracing(链路追踪)"}),': 请求级别的完整路径,回答"请求经历了什么"。']}),e.jsx("h2",{id:"why-tracing",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、为什么需要分布式链路追踪?"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"在单体应用中,一个请求的处理逻辑都在同一个进程中,通过日志即可定位问题。但在微服务架构中,一个用户请求可能经过多个服务的多次调用,传统的日志分散在各个服务中,难以还原完整的调用链路。"}),e.jsx(s,{title:"没有链路追踪的问题",children:`graph TB
    User[用户请求] --> Gateway[API Gateway]
    Gateway --> OrderService[订单服务]
    OrderService --> UserService[用户服务]
    OrderService --> ProductService[商品服务]
    OrderService --> InventoryService[库存服务]
    OrderService --> PaymentService[支付服务]
    
    Log1[Gateway 日志<br/>request_id=abc123]
    Log2[OrderService 日志<br/>trace_id=???]
    Log3[UserService 日志<br/>trace_id=???]
    
    style Log2 fill:#ff6b6b
    style Log3 fill:#ff6b6b
    
    note[问题:日志分散在 5 个服务中<br/>无法关联同一次请求的日志!] -.-> Log1`}),e.jsxs(i,{label:"链路追踪的价值",children:[e.jsx("strong",{children:"性能优化:"})," 找出响应最慢的服务和方法;",e.jsx("br",{}),e.jsx("strong",{children:"故障定位:"})," 快速定位是哪个服务导致请求失败;",e.jsx("br",{}),e.jsx("strong",{children:"依赖分析:"})," 可视化服务间的调用关系,发现循环依赖;",e.jsx("br",{}),e.jsx("strong",{children:"容量规划:"})," 基于真实流量数据评估系统负载。"]}),e.jsx("h2",{id:"core-concepts",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、核心概念"}),e.jsx(s,{title:"Trace、Span、Context 关系",children:`graph TB
    Trace[Trace<br/>完整调用链路<br/>Trace ID: abc123]
    
    subgraph "Span 树形结构"
        Span1[Span 1: API Gateway<br/>Span ID: span-001<br/>耗时: 150ms]
        Span2[Span 2: Order Service<br/>Span ID: span-002<br/>耗时: 120ms]
        Span3[Span 3: User Service<br/>Span ID: span-003<br/>耗时: 30ms]
        Span4[Span 4: Product Service<br/>Span ID: span-004<br/>耗时: 50ms]
        Span5[Span 5: DB Query<br/>Span ID: span-005<br/>耗时: 10ms]
    end
    
    Trace --> Span1
    Span1 --> Span2
    Span2 --> Span3
    Span2 --> Span4
    Span4 --> Span5
    
    Context[Trace Context<br/>包含: Trace ID + Parent Span ID<br/>通过 HTTP Header 传递] -.-> Span1
    Context -.-> Span2`}),e.jsx("h3",{id:"trace-span-context",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"三大核心概念"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Trace(追踪)"}),": 一次完整请求的调用链路,由唯一的 Trace ID 标识。Trace 是所有相关 Span 的集合。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Span(跨度)"}),": Trace 中的一个工作单元,代表某个服务的某次调用。Span 包含开始时间、结束时间、标签、日志等信息。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Context(上下文)"}),": 用于在服務间传递 Trace 信息的载体,通常通过 HTTP Header 传递,包含 Trace ID、Parent Span ID 等。"]})]}),e.jsxs("table",{className:"w-full border-collapse my-6 text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-4 py-2 text-left font-semibold",children:"字段"}),e.jsx("th",{className:"border border-border-light px-4 py-2 text-left font-semibold",children:"说明"}),e.jsx("th",{className:"border border-border-light px-4 py-2 text-left font-semibold",children:"示例"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono text-[13px]",children:"traceId"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"全局唯一的追踪 ID"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"abc123def456"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono text-[13px]",children:"spanId"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"当前 Span 的唯一 ID"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"span-001"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono text-[13px]",children:"parentSpanId"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"父 Span 的 ID(根节点为空)"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"span-000"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono text-[13px]",children:"operationName"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"操作名称(如 HTTP 方法 + 路径)"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"GET /api/orders"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono text-[13px]",children:"startTime"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"Span 开始时间(微秒级时间戳)"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"1678886400000000"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono text-[13px]",children:"duration"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"Span 持续时间(微秒)"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"150000 (150ms)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono text-[13px]",children:"tags"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"键值对标签(如 http.status_code)"}),e.jsxs("td",{className:"border border-border-light px-4 py-2",children:["{status: 200}"," "]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono text-[13px]",children:"logs"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"时间轴上的事件日志"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"[{event: 'error', message: '...'}]"})]})]})]}),e.jsx("h2",{id:"trace-propagation",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、Trace 上下文传播"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Trace 上下文需要在服务间传递,主流的实现标准有:"}),e.jsx("h3",{id:"w3c-trace-context",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"W3C Trace Context(推荐标准)"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"W3C 制定的开放标准,使用两个 HTTP Header 传递追踪信息:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6",children:[e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"traceparent"}),": 包含 Trace ID、Parent Span ID、Trace Flags"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"tracestate"}),": 供应商特定的追踪信息(可选)"]})]}),e.jsx(r,{code:`# HTTP 请求头示例
GET /api/orders/123 HTTP/1.1
Host: order-service.example.com
traceparent: 00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01
tracestate: vendor1=value1,vendor2=value2

# traceparent 格式解析:
# 00                          - 版本 (version)
# 0af7651916cd43dd8448eb211c80319c - Trace ID (32 字符十六进制)
# b7ad6b7169203331           - Parent Span ID (16 字符十六进制)
# 01                          - Trace Flags (01=采样, 00=不采样)`,language:"http",highlights:[4,8,9,10],filename:"trace-context-example.txt",description:"W3C Trace Context 格式"}),e.jsx("h3",{id:"b3-propagation",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"B3 Propagation(Zipkin 标准)"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Zipkin 提出的传播协议,使用多个独立的 Header:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6",children:[e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"X-B3-TraceId"}),": Trace ID"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"X-B3-SpanId"}),": 当前 Span ID"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"X-B3-ParentSpanId"}),": 父 Span ID"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"X-B3-Sampled"}),": 是否采样(1 或 0)"]})]}),e.jsxs(t,{type:"info",title:"如何选择传播协议?",children:["新项目推荐使用 ",e.jsx("strong",{children:"W3C Trace Context"}),",因为它是开放标准,得到广泛支持(OpenTelemetry、SkyWalking、Jaeger 等)。如果已有 Zipkin 基础设施,可以继续使用 B3 协议。大多数追踪库同时支持两种协议。"]}),e.jsx("h2",{id:"skywalking",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、SkyWalking 实战"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"SkyWalking 是 Apache 基金会孵化的 APM(应用性能管理)系统,由中国公司主导开发,在国内广泛应用。它支持自动字节码增强,无需修改代码即可实现链路追踪。"}),e.jsx(s,{title:"SkyWalking 架构",children:`graph TB
    subgraph "Agent 探针"
        Agent1[Java Agent<br/>order-service]
        Agent2[Java Agent<br/>user-service]
        Agent3[Python Agent<br/>ai-service]
    end
    
    subgraph "OAP 后端"
        OAP[OAP Server<br/>接收追踪数据<br/>存储到 ES/H2]
    end
    
    subgraph "UI 界面"
        UI[SkyWalking UI<br/>可视化查询]
    end
    
    subgraph "存储"
        ES[(Elasticsearch<br/>或 H2/MySQL)]
    end
    
    Agent1 -->|gRPC| OAP
    Agent2 -->|gRPC| OAP
    Agent3 -->|gRPC| OAP
    OAP --> ES
    UI --> OAP`}),e.jsx(r,{code:`# 1. 下载 SkyWalking Agent
wget https://archive.apache.org/dist/skywalking/9.0.0/apache-skywalking-java-agent-9.0.0.tgz
tar -xzf apache-skywalking-java-agent-9.0.0.tgz

# 2. 配置 agent.config
cat > agent.config << EOF
collector.backend_service=127.0.0.1:11800  # OAP 服务器地址
agent.service_name=order-service  # 服务名称
logging.level=INFO
EOF

# 3. 启动应用时附加 Agent
java -javaagent:/path/to/skywalking-agent.jar      -Dskywalking.agent.service_name=order-service      -Dskywalking.collector.backend_service=127.0.0.1:11800      -jar order-service.jar`,language:"bash",highlights:[6,7,13,14],filename:"skywalking-setup.sh",description:"SkyWalking Agent 配置"}),e.jsx(r,{code:`# Docker Compose 快速部署 SkyWalking
version: '3.8'
services:
  elasticsearch:
    image: elasticsearch:8.6.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
  
  oap:
    image: apache/skywalking-oap-server:9.0.0
    environment:
      SW_STORAGE: elasticsearch
      SW_STORAGE_ES_CLUSTER_NODES: elasticsearch:9200
    ports:
      - "11800:11800"  # gRPC 端口
      - "12800:12800"  # HTTP 端口
    depends_on:
      - elasticsearch
  
  ui:
    image: apache/skywalking-ui:9.0.0
    environment:
      SW_OAP_ADDRESS: http://oap:12800
    ports:
      - "8080:8080"
    depends_on:
      - oap`,language:"yaml",highlights:[13,24],filename:"docker-compose.yml",description:"SkyWalking Docker 部署"}),e.jsxs(i,{label:"SkyWalking vs Zipkin vs Jaeger",children:[e.jsx("strong",{children:"SkyWalking"}),": 功能最全,支持自动探针、拓扑图、告警、JVM 监控,适合 Java 生态;",e.jsx("br",{}),e.jsx("strong",{children:"Zipkin"}),": 轻量简单,社区成熟,适合小规模项目;",e.jsx("br",{}),e.jsx("strong",{children:"Jaeger"}),": CNCF 项目,Go 语言编写,性能优秀,适合云原生环境。"]}),e.jsx("h2",{id:"zipkin",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、Zipkin 实战"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Zipkin 是 Twitter 开源的分布式追踪系统,历史悠久,社区成熟。Spring Cloud Sleuth 默认集成 Zipkin。"}),e.jsx(r,{code:`# pom.xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-sleuth-zipkin</artifactId>
</dependency>`,language:"xml",highlights:[4,8],filename:"pom.xml",description:"引入 Spring Cloud Sleuth + Zipkin"}),e.jsx(r,{code:`# application.yml
spring:
  zipkin:
    base-url: http://localhost:9411  # Zipkin Server 地址
    sender:
      type: web  # 通过 HTTP 发送(也可选 kafka/rabbit)
  
  sleuth:
    sampler:
      probability: 1.0  # 采样率 100%(生产环境建议 0.1)
    propagation:
      type: W3C  # 使用 W3C Trace Context 标准`,language:"yaml",highlights:[4,10,12],filename:"application.yml",description:"Zipkin 客户端配置"}),e.jsx(r,{code:`# Docker 快速启动 Zipkin Server
docker run -d -p 9411:9411 openzipkin/zipkin

# 访问 http://localhost:9411 查看追踪数据`,language:"bash",highlights:[2],filename:"start-zipkin.sh",description:"启动 Zipkin Server"}),e.jsx("h2",{id:"jaeger",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、Jaeger 实战"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Jaeger 是 Uber 开源、CNCF 毕业的分布式追踪系统,采用 Go 语言编写,性能优秀,适合云原生环境。"}),e.jsx(r,{code:`# Docker Compose 部署 Jaeger
version: '3.8'
services:
  jaeger:
    image: jaegertracing/all-in-one:1.42
    environment:
      - COLLECTOR_ZIPKIN_HOST_PORT=:9411  # 兼容 Zipkin 协议
    ports:
      - "5775:5775/udp"   # Agent Thrift compact
      - "6831:6831/udp"   # Agent Thrift binary
      - "6832:6832/udp"   # Agent gRPC
      - "5778:5778"       # Agent HTTP
      - "16686:16686"     # UI
      - "14268:14268"     # Collector HTTP
      - "14250:14250"     # Collector gRPC
      - "9411:9411"       # Zipkin compatible`,language:"yaml",highlights:[5,13],filename:"docker-compose.yml",description:"Jaeger All-in-One 部署"}),e.jsx(r,{code:`# Python 应用集成 Jaeger
from jaeger_client import Config

def init_jaeger_tracer(service_name='python-service'):
    config = Config(
        config={
            'sampler': {
                'type': 'const',
                'param': 1,  # 100% 采样
            },
            'logging': True,
            'reporter_batch_size': 1,
        },
        service_name=service_name,
    )
    tracer = config.initialize_tracer()
    return tracer

tracer = init_jaeger_tracer()

# 创建 Span
with tracer.start_span('process_order') as span:
    span.set_tag('order_id', '12345')
    # 业务逻辑...
    with tracer.start_span('call_user_service', child_of=span):
        # 调用用户服务...
        pass`,language:"python",highlights:[19,22,25],filename:"jaeger_python.py",description:"Python 应用集成 Jaeger"}),e.jsx("h2",{id:"sampling",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、采样策略"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"在高并发场景下,100% 采样会产生海量追踪数据,占用大量存储和带宽。采样策略决定哪些请求被记录:"}),e.jsxs("table",{className:"w-full border-collapse my-6 text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-4 py-2 text-left font-semibold",children:"采样策略"}),e.jsx("th",{className:"border border-border-light px-4 py-2 text-left font-semibold",children:"说明"}),e.jsx("th",{className:"border border-border-light px-4 py-2 text-left font-semibold",children:"适用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono text-[13px]",children:"固定比例采样"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"按固定比例(如 10%)随机采样"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"大部分场景,简单高效"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono text-[13px]",children:"速率限制采样"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"每秒最多采样 N 个请求"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"流量波动大的场景"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono text-[13px]",children:"自适应采样"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"根据系统负载动态调整采样率"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"生产环境推荐"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono text-[13px]",children:"条件采样"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"仅采样特定条件(如错误请求、慢请求)"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"问题排查阶段"})]})]})]}),e.jsx(r,{code:`# SkyWalking 自适应采样配置
agent.sample_n_per_3_secs=300  # 每 3 秒最多采样 300 个请求

# Jaeger 概率采样
JAEGER_SAMPLER_TYPE=probabilistic
JAEGER_SAMPLER_PARAM=0.1  # 10% 采样率

# Zipkin 基于 URL 的条件采样
spring.sleuth.sampler.probability=0.1  # 默认 10%
# 对于关键接口,可以通过代码强制采样
@NewSpan("critical-operation")
public void criticalOperation() {
    // 这个 Span 一定会被记录
}`,language:"yaml",highlights:[2,6,9],filename:"sampling-config.yml",description:"采样策略配置示例"}),e.jsxs(t,{type:"warning",title:"采样率设置建议",children:[e.jsx("strong",{children:"开发环境:"})," 100% 采样,方便调试;",e.jsx("br",{}),e.jsx("strong",{children:"测试环境:"})," 50%-100% 采样,保证覆盖各种场景;",e.jsx("br",{}),e.jsx("strong",{children:"生产环境:"})," 1%-10% 采样,根据 QPS 调整。QPS < 1000 可用 10%,QPS > 10000 建议 1%。"]}),e.jsx("h2",{id:"custom-span",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、自定义 Span"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"自动探针只能追踪框架层(HTTP、数据库调用等),对于业务逻辑需要手动添加 Span。"}),e.jsx(r,{code:`// Spring Cloud Sleuth 手动创建 Span
@Service
public class OrderService {
    
    @Autowired
    private Tracer tracer;  // Sleuth 提供的 Tracer
    
    public Order createOrder(OrderRequest request) {
        // 创建自定义 Span
        Span span = tracer.nextSpan().name("validate-order").start();
        try (Tracer.SpanInScope ws = tracer.withSpan(span)) {
            span.tag("order.amount", String.valueOf(request.getAmount()));
            
            // 业务逻辑:验证订单
            validateOrder(request);
            
            span.event("validation-completed");
        } finally {
            span.end();  // 必须手动结束 Span
        }
        
        // 继续后续流程...
        return saveOrder(request);
    }
}`,language:"java",highlights:[10,12,19],filename:"OrderService.java",description:"手动创建自定义 Span"}),e.jsx(r,{code:`// OpenTelemetry Java SDK
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;

public class OrderProcessor {
    
    private final Tracer tracer;
    
    public OrderProcessor(Tracer tracer) {
        this.tracer = tracer;
    }
    
    public void processOrder(String orderId) {
        Span span = tracer.spanBuilder("process-order")
            .setAttribute("order.id", orderId)
            .startSpan();
        
        try (Scope scope = span.makeCurrent()) {
            // 业务逻辑
            validateOrder(orderId);
            calculatePrice(orderId);
            saveOrder(orderId);
            
            span.addEvent("order-processed");
        } catch (Exception e) {
            span.recordException(e);  // 记录异常
            span.setStatus(StatusCode.ERROR, e.getMessage());
            throw e;
        } finally {
            span.end();
        }
    }
}`,language:"java",highlights:[14,25,26],filename:"OrderProcessor.java",description:"OpenTelemetry 手动埋点"}),e.jsxs(i,{label:"什么时候需要手动埋点?",children:["(1) ",e.jsx("strong",{children:"关键业务逻辑"}),": 如订单创建、支付处理;",e.jsx("br",{}),"(2) ",e.jsx("strong",{children:"异步任务"}),": 线程池、消息队列消费;",e.jsx("br",{}),"(3) ",e.jsx("strong",{children:"外部调用"}),": 第三方 API、文件上传;",e.jsx("br",{}),"(4) ",e.jsx("strong",{children:"复杂计算"}),": 算法执行、数据处理。"]}),e.jsx("h2",{id:"performance-analysis",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、性能分析与优化"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"链路追踪的核心价值是性能分析。通过 Trace 可视化,可以快速定位性能瓶颈:"}),e.jsx(s,{title:"性能分析流程",children:`graph TB
    Start[用户反馈: 下单很慢] --> Query[查询慢请求 Trace]
    Query --> Analyze[分析 Span 耗时分布]
    
    Analyze --> Gateway[API Gateway: 5ms]
    Analyze --> Order[Order Service: 200ms]
    Analyze --> User[User Service: 30ms]
    Analyze --> Product[Product Service: 150ms]
    Analyze --> DB[(Database: 120ms)]
    
    Product --> DB_Query[SQL 查询: SELECT * FROM products]
    DB_Query --> Problem[发现问题: 缺少索引]
    
    Problem --> Fix[添加索引: idx_category_price]
    Fix --> Verify[验证: Product Service 降至 20ms]
    
    style DB fill:#ff6b6b
    style DB_Query fill:#ff6b6b
    style Problem fill:#ffd93d`}),e.jsx("h3",{id:"common-bottlenecks",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"常见性能瓶颈"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"数据库慢查询"}),": 缺少索引、N+1 查询、全表扫描"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"串行调用"}),": 多个独立的外部调用应该并行执行"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"同步阻塞"}),": 长时间持有锁、同步 IO 操作"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"缓存未命中"}),": 频繁查询数据库而非缓存"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"资源竞争"}),": 线程池耗尽、连接池不足"]})]}),e.jsx(r,{code:`// 优化前: 串行调用
public OrderDetail getOrderDetail(Long orderId) {
    Order order = orderRepository.findById(orderId);  // 50ms
    User user = userService.getUser(order.getUserId());  // 30ms
    List<Product> products = productService.getProducts(order.getProductIds());  // 80ms
    // 总耗时: 50 + 30 + 80 = 160ms
    return new OrderDetail(order, user, products);
}

// 优化后: 并行调用
public OrderDetail getOrderDetail(Long orderId) {
    Order order = orderRepository.findById(orderId);  // 50ms
    
    CompletableFuture<User> userFuture = CompletableFuture.supplyAsync(() -> 
        userService.getUser(order.getUserId())  // 30ms (并行)
    );
    
    CompletableFuture<List<Product>> productsFuture = CompletableFuture.supplyAsync(() -> 
        productService.getProducts(order.getProductIds())  // 80ms (并行)
    );
    
    User user = userFuture.get();
    List<Product> products = productsFuture.get();
    // 总耗时: 50 + max(30, 80) = 130ms
    
    return new OrderDetail(order, user, products);
}`,language:"java",highlights:[12,14,18],filename:"OrderOptimization.java",description:"串行调用优化为并行调用"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、常见误区"}),e.jsx(t,{type:"danger",title:"误区 1:链路追踪可以替代日志",children:"链路追踪和日志是互补关系,不是替代关系。Trace 适合宏观分析请求路径,日志适合微观调试具体问题。最佳实践是在 Span 中记录关键日志事件,两者结合使用。"}),e.jsxs(t,{type:"danger",title:"误区 2:采样率越低越好",children:["过低的采样率会导致遗漏重要信息,特别是偶发性故障。建议采用",e.jsx("strong",{children:"自适应采样"}),":正常时期低采样率,检测到异常时自动提高采样率。"]}),e.jsxs(t,{type:"danger",title:"误区 3:只关注平均响应时间",children:["平均值会掩盖长尾问题。应该关注 ",e.jsx("strong",{children:"P95/P99 响应时间"}),"(95%/99% 的请求在这个时间内完成)。例如:平均 100ms,P99 可能是 2s,说明有 1% 的请求非常慢。"]}),e.jsx(t,{type:"danger",title:"误区 4:忽略 Trace 数据存储成本",children:"高 QPS 系统的 Trace 数据量巨大,需要合理规划存储策略:(1) 热数据保留 7 天(ES/ClickHouse);(2) 冷数据归档到对象存储;(3) 定期清理过期数据;(4) 压缩存储(Span 数据可压缩 70%)。"}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、面试真题"}),e.jsx(c,{questions:[{question:"分布式链路追踪的原理是什么?",answer:"核心原理是 Trace ID 的传播:(1) 请求入口生成唯一的 Trace ID;(2) 每次跨服务调用时,将 Trace ID 和 Parent Span ID 放入 HTTP Header;(3) 下游服务从 Header 中提取 Trace 信息,创建子 Span;(4) 所有 Span 上报到追踪后端,组装成完整的 Trace 树。关键在于上下文传播协议的标准化(W3C Trace Context)。"},{question:"SkyWalking 的无侵入式追踪是如何实现的?",answer:"SkyWalking 使用 Java Agent + 字节码增强技术:(1) Java Agent 在 JVM 启动时加载,拦截类加载过程;(2) 使用 ByteBuddy 框架动态修改字节码,在关键方法(如 HTTP 调用、数据库查询)前后插入追踪代码;(3) 无需修改业务代码,重启应用即可生效。这种方式对开发者透明,但可能影响启动性能。"},{question:"如何处理异步调用的链路追踪?",answer:"异步调用(线程池、消息队列)会断开 Trace 上下文,需要特殊处理:(1) 线程池:使用 TraceContext 包装 Runnable/Callable,在子线程中恢复上下文;(2) 消息队列:在发送消息时将 Trace 信息放入 Message Header,消费时提取并创建新的 Span;(3) Spring Cloud Sleuth 提供了 TaskDecorator 自动处理线程池上下文传播。"},{question:"Trace ID 如何保证全局唯一性?",answer:"主流方案:(1) UUID v4: 128 位随机数,碰撞概率极低;(2) Snowflake 算法: 时间戳 + 机器 ID + 序列号,有序且唯一;(3) OpenTelemetry 使用 16 字节(128 位)随机数。实际应用中,UUID 已足够,无需过度设计。关键是确保 Trace ID 在整个调用链中正确传递,不被覆盖或丢失。"},{question:"链路追踪对性能的影响有多大?",answer:"影响主要来自三方面:(1) 上下文创建和传播: 约 1-5% CPU 开销;(2) Span 数据采集: 约 2-10% 内存开销;(3) 数据上报: 网络 IO 和序列化开销。优化措施:(1) 降低采样率;(2) 异步批量上报;(3) 减少自定义 Span 数量;(4) 使用高效的序列化协议(Protobuf)。合理配置下,性能损耗可控制在 5% 以内。"},{question:"如何设计一个跨语言的链路追踪系统?",answer:"关键点:(1) 统一的传播协议: 采用 W3C Trace Context 标准,确保不同语言都能解析;(2) 统一的 Span 数据模型: 遵循 OpenTelemetry 规范;(3) 多语言 SDK: 为每种语言提供官方 SDK,封装上下文传播和数据上报;(4) 统一的后端: 所有语言的 Span 数据上报到同一个后端(如 Jaeger、SkyWalking);(5) 兼容性: 支持多种传输协议(gRPC、HTTP、Kafka)。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十二、知识关联"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"学习完分布式链路追踪后,建议继续深入学习:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6",children:[e.jsxs("li",{children:[e.jsx("a",{href:"/docs/09-ai-engineering/observability-monitoring",className:"text-accent hover:underline",children:"全链路监控告警体系"})," - 结合 Metrics 和 Logging 构建完整的可观测性体系"]}),e.jsxs("li",{children:[e.jsx("a",{href:"/docs/08-microservices/service-resilience",className:"text-accent hover:underline",children:"服务限流降级"})," - 基于链路追踪数据制定熔断策略"]}),e.jsxs("li",{children:[e.jsx("a",{href:"/docs/08-microservices/configuration-management",className:"text-accent hover:underline",children:"配置中心"})," - 动态调整采样率和追踪配置"]}),e.jsxs("li",{children:[e.jsx("a",{href:"/docs/04-jvm/jvm-tuning",className:"text-accent hover:underline",children:"JVM 调优实战"})," - 结合链路追踪分析 JVM 性能问题"]})]}),e.jsx(l,{...n(a.category,a.id)})]})}),e.jsx(o,{items:p})]})}export{u as default};
