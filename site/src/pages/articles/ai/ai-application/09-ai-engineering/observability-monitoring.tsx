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
  { id: 'three-pillars', text: '一、可观测性三大支柱', level: 2 },
  { id: 'metrics', text: '二、Metrics 指标监控', level: 2 },
  { id: 'logging', text: '三、Logging 日志聚合', level: 2 },
  { id: 'tracing', text: '四、Tracing 链路追踪', level: 2 },
  { id: 'prometheus-grafana', text: '五、Prometheus + Grafana 实践', level: 2 },
  { id: 'alertmanager', text: '六、AlertManager 告警管理', level: 2 },
  { id: 'best-practices', text: '七、最佳实践与误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function ObservabilityMonitoring({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              可观测性（Observability）是通过<strong className="text-accent">Metrics（指标）、Logs（日志）、Traces（链路）</strong>三大支柱数据，理解系统内部状态的能力，使团队能够快速定位问题根因、优化性能、保障稳定性。
            </p>
          </blockquote>

          <Callout type="tip" title="监控 vs 可观测性">
            <strong>监控</strong>回答"系统是否正常"（已知未知），<strong>可观测性</strong>回答"系统为什么异常"（未知未知）。监控是子集，可观测性是超集。
          </Callout>

          <h2 id="three-pillars" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、可观测性三大支柱
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            可观测性建立在三个核心数据类型之上，它们相互补充，形成完整的系统视图。
          </p>

          <DiagramBlock title="可观测性三大支柱">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────┐
│          可观测性（Observability）            │
├──────────┬──────────┬───────────────────────┤
│ Metrics  │  Logs    │  Traces               │
│ 指标     │  日志    │  链路                  │
├──────────┼──────────┼───────────────────────┤
│ What?    │ Why?     │ Where?                │
│ 发生了什么│ 为什么发生│ 在哪里发生             │
├──────────┼──────────┼───────────────────────┤
│ • CPU 使用率   │ • 错误堆栈    │ • 请求路径      │
│ • QPS         │ • 访问日志    │ • 服务依赖      │
│ • 错误率       │ • 审计日志    │ • 耗时分布      │
│ • 延迟百分位   │ • 业务日志    │ • 瓶颈定位      │
└──────────┴──────────┴───────────────────────┘

三者关系:
1. Metrics 发现异常（CPU 突然飙升）
   ↓
2. Traces 定位范围（哪个服务/接口慢）
   ↓
3. Logs 查明根因（具体哪行代码出错）`}</pre>
          </DiagramBlock>

          <h2 id="metrics" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Metrics 指标监控
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Metrics 是数值型的时间序列数据，用于监控系统健康度和性能趋势。
          </p>

          <Playground
            code={`# Prometheus Metrics 类型

# 1. Counter（计数器）：只增不减
http_requests_total{method="GET", status="200"} 12345

# 2. Gauge（仪表盘）：可增可减
memory_usage_bytes 536870912

# 3. Histogram（直方图）：分布统计
http_request_duration_seconds_bucket{le="0.1"} 1000
http_request_duration_seconds_bucket{le="0.5"} 1500

# PromQL 查询示例:
# QPS
rate(http_requests_total[5m])

# P95 延迟
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# 错误率
rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])`}
            language="python"
            highlights={[4, 8, 12, 17, 20, 23]}
            filename="prometheus_metrics.py"
            description="Prometheus Metrics 类型"
          />

          <SideNote label="RED 方法">
            Tom Wilkie 提出的 RED 方法：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">Rate（速率）、Errors（错误率）、Duration（持续时间）</code>，是监控微服务的黄金标准。
          </SideNote>

          <h2 id="logging" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Logging 日志聚合
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Logs 是离散的事件记录，提供详细的上下文信息，是问题诊断的核心数据来源。
          </p>

          <Playground
            code={`# 结构化日志示例（JSON 格式）

import logging
from pythonjsonlogger import jsonlogger

# 配置 JSON 日志
logger = logging.getLogger(__name__)
log_handler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
log_handler.setFormatter(formatter)
logger.addHandler(log_handler)

# 记录结构化日志
logger.info("Order processed", extra={
    "order_id": "ORD-12345",
    "user_id": "USR-789",
    "amount": 99.99,
    "duration_ms": 150
})

# 输出:
# {"asctime": "2024-01-15T10:30:45", "levelname": "INFO", 
#  "message": "Order processed", "order_id": "ORD-12345", 
#  "user_id": "USR-789", "amount": 99.99, "duration_ms": 150}

# 日志聚合架构:
# 应用 → Filebeat/Promtail → Kafka → Elasticsearch/Loki → Kibana/Grafana`}
            language="python"
            highlights={[11, 17, 27]}
            filename="structured_logging.py"
            description="结构化日志实践"
          />

          <h2 id="tracing" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Tracing 链路追踪
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Traces 记录请求在分布式系统中的完整路径，揭示服务间依赖关系和性能瓶颈。
          </p>

          <DiagramBlock title="分布式追踪流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
用户请求: GET /api/orders/12345

┌─────────┐     ┌─────────┐     ┌─────────┐
│  API GW  │────▶│ Order   │────▶│ Payment │
│  Span 1  │     │ Service │     │ Service │
│ 10ms     │     │ Span 2  │     │ Span 3  │
└─────────┘     └─────────┘     └─────────┘
                       │
                       ▼
                ┌─────────┐
                │ User    │
                │ Service │
                │ Span 4  │
                │ 25ms    │
                └─────────┘

Trace ID: abc123 （贯穿整个请求）
总延迟: 10 + 25 + ... = 60ms`}</pre>
          </DiagramBlock>

          <Playground
            code={`# OpenTelemetry 分布式追踪

from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.exporter.jaeger.thrift import JaegerExporter

# 初始化追踪
trace.set_tracer_provider(TracerProvider())
jaeger_exporter = JaegerExporter(agent_host_name="localhost")
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(jaeger_exporter)
)

tracer = trace.get_tracer(__name__)

# 创建 Span
@app.route('/api/orders/<order_id>')
def get_order(order_id):
    with tracer.start_as_current_span("get_order") as span:
        span.set_attribute("order.id", order_id)
        
        # 业务逻辑
        order = fetch_order_from_db(order_id)
        span.add_event("Order fetched")
        
        return jsonify(order)

# 跨服务传播
import requests
from opentelemetry.propagate import inject

def call_payment_service(order_id):
    headers = {}
    inject(headers)  # 注入 trace context
    
    response = requests.post(
        "http://payment-service/api/charge",
        json={"order_id": order_id},
        headers=headers
    )
    return response.json()`}
            language="python"
            highlights={[10, 18, 22, 25, 33, 36]}
            filename="distributed_tracing.py"
            description="OpenTelemetry 追踪实现"
          />

          <h2 id="prometheus-grafana" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Prometheus + Grafana 实践
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Prometheus 是最流行的开源监控系统，Grafana 提供强大的可视化能力。
          </p>

          <Playground
            code={`# Prometheus 配置示例

global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'app'
    static_configs:
      - targets: ['app:8000']

# Grafana Dashboard JSON 结构
{
  "dashboard": {
    "title": "Application Monitoring",
    "panels": [
      {
        "title": "QPS",
        "type": "graph",
        "targets": [{
          "expr": "sum(rate(http_requests_total[5m]))"
        }]
      },
      {
        "title": "P95 Latency",
        "type": "graph",
        "targets": [{
          "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
        }]
      }
    ]
  }
}

# 快速部署（Helm）
helm install prometheus prometheus-community/kube-prometheus-stack \\
  --namespace monitoring --create-namespace`}
            language="yaml"
            highlights={[4, 7, 13, 17, 23, 32]}
            filename="prometheus_grafana.py"
            description="Prometheus + Grafana 配置"
          />

          <h2 id="alertmanager" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、AlertManager 告警管理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            AlertManager 负责接收 Prometheus 告警，进行分组、抑制，并路由到通知渠道。
          </p>

          <Playground
            code={`# AlertManager 配置

route:
  group_by: ['alertname', 'service']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  
  routes:
    - match:
        severity: critical
      receiver: 'pagerduty'
    
    - match:
        severity: warning
      receiver: 'slack'

receivers:
  - name: 'pagerduty'
    pagerduty_configs:
      - service_key: 'your-key'
  
  - name: 'slack'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/XXX'
        channel: '#alerts'

# 告警规则
groups:
  - name: system_alerts
    rules:
      - alert: HighCPUUsage
        expr: cpu_usage > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU on {{ $labels.instance }}"`}
            language="yaml"
            highlights={[4, 10, 17, 22, 28, 34]}
            filename="alertmanager_config.py"
            description="AlertManager 告警配置"
          />

          <Callout type="danger" title="避免告警疲劳">
            当团队每天收到数百条告警时，会产生"告警疲劳"，逐渐忽视所有告警。解决方案：① 严格审查每条告警的必要性；② 提高告警阈值，减少噪音；③ 使用分组和抑制规则；④ 定期清理无效告警。目标是每天每人收到的告警不超过 10-20 条。
          </Callout>

          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、最佳实践与误区
          </h2>

          <Callout type="tip" title="✅ 最佳实践">
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>四大黄金信号</strong>：监控延迟、流量、错误、饱和度（Google SRE）</li>
              <li><strong>结构化日志</strong>：使用 JSON 格式，包含上下文字段</li>
              <li><strong>统一的 Trace ID</strong>：贯穿整个请求链路</li>
              <li><strong>Dashboard 即代码</strong>：版本控制，自动化部署</li>
              <li><strong>告警可行动</strong>：每条告警都有明确的响应流程</li>
            </ul>
          </Callout>

          <Callout type="danger" title="常见误区">
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>误区 1</strong>：指标越多越好 → 应遵循"少而精"原则，只采集 actionable 的指标</li>
              <li><strong>误区 2</strong>：告警覆盖所有异常 → 过度告警导致疲劳，只告警需要人工介入的问题</li>
              <li><strong>误区 3</strong>：有了监控就不需要日志和追踪 → 三大支柱缺一不可</li>
              <li><strong>误区 4</strong>：可观测性是运维的责任 → 应该是全团队的共同责任</li>
            </ul>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "可观测性的三大支柱是什么？它们各自的作用是什么？",
              answer: '三大支柱：① Metrics（指标）：数值型时间序列数据，回答"发生了什么"，用于趋势分析和告警；② Logs（日志）：离散事件记录，回答"为什么发生"，提供详细上下文用于问题诊断；③ Traces（链路）：分布式请求路径，回答"在哪里发生"，揭示服务依赖和性能瓶颈。相互关系：Metrics 发现异常 → Traces 定位范围 → Logs 查明根因。三者缺一不可，共同构成完整的可观测性体系。'
            },
            {
              question: "Prometheus 的四种 Metrics 类型有什么区别？",
              answer: "四种类型：① Counter（计数器）：只增不减，适用于累计值（请求总数），查询时使用 rate() 计算增长率；② Gauge（仪表盘）：可增可减，适用于瞬时值（CPU 使用率、内存占用）；③ Histogram（直方图）：记录分布，适用于延迟等需要百分位的场景，支持 histogram_quantile() 查询 P95/P99；④ Summary（摘要）：类似 Histogram，但百分位在客户端计算，精度高但无法跨实例聚合。选择原则：计数用 Counter，瞬时值用 Gauge，延迟分布用 Histogram（推荐）。"
            },
            {
              question: "如何避免告警疲劳？",
              answer: "避免告警疲劳策略：① 分级告警：Critical（电话/PagerDuty）、Warning（Slack/邮件）、Info（仅记录）；② 合理的阈值：基于历史数据，避免过于敏感；③ 设置 for 时长：指标持续异常 N 分钟才告警，避免瞬时抖动；④ 分组和抑制：同组告警合并发送，Critical 抑制 Warning；⑤ 静默机制：计划维护期间暂停告警；⑥ 定期审查：删除误报率高的规则。目标：有效告警比例 {'>'} 50%，每人每天告警数量 {'<'} 20 条。"
            },
            {
              question: "分布式追踪中的 Trace、Span、Context 分别是什么？",
              answer: "核心概念：① Trace：一次完整请求的追踪记录，由唯一的 trace_id 标识，包含该请求涉及的所有 Span；② Span：单个操作单元（如 HTTP 请求、数据库查询），包含 span_id、parent_span_id、操作名、开始/结束时间、标签、事件等；③ Context：追踪上下文，包含 trace_id 和 span_id，用于在服务间传播追踪信息。实现跨服务传播：通过 HTTP Header（如 W3C Trace Context 标准的 traceparent）或 gRPC Metadata 传递 context，下游服务提取并创建子 Span，形成完整的调用链。"
            },
            {
              question: "Prometheus 的拉取模型（Pull-based）相比推送模型（Push-based）有什么优势？",
              answer: "Pull 模型优势：① 服务端控制采集频率，避免客户端过载；② 客户端故障不影响其他服务（去中心化）；③ 易于服务发现（Kubernetes SD、Consul SD 等）；④ 便于测试和调试（直接访问 /metrics 端点）。Push 模型适用场景：① 短时任务（Batch Job）；② 防火墙限制（无法从 Prometheus 访问目标）；③ 高基数指标（避免 Prometheus TSDB 压力）。Prometheus 通过 Pushgateway 支持 Push 场景，但官方推荐优先使用 Pull 模型。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/05-distributed-systems/distributed-tracing" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">分布式链路追踪</div>
              <div className="text-[12px] text-ink-muted mt-1">追踪基础概念</div>
            </a>
            <a href="/docs/09-ai-engineering/canary-deployment" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">应用场景 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">金丝雀发布</div>
              <div className="text-[12px] text-ink-muted mt-1">监控在发布中的应用</div>
            </a>
            <a href="/docs/05-distributed-systems/logging" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">日志系统</div>
              <div className="text-[12px] text-ink-muted mt-1">ELK、Loki 日志方案</div>
            </a>
            <a href="/docs/05-distributed-systems/performance-tuning" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">性能优化 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">性能调优</div>
              <div className="text-[12px] text-ink-muted mt-1">基于监控的性能优化</div>
            </a>
          </div>

          <Callout type="info" title="学习路径建议">
            初学者建议：① 先部署 Prometheus + Grafana 监控基础指标；② 集成日志系统（Loki 或 ELK）；③ 引入分布式追踪（Jaeger）；④ 配置告警规则，建立 on-call 流程；⑤ 持续优化 Dashboard，清理无效告警。推荐工具栈：Prometheus + Grafana + Loki + Jaeger + AlertManager，全部开源且社区活跃。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
