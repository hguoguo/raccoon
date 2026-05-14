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
  { id: 'overview', text: '一、灰度发布策略对比', level: 2 },
  { id: 'canary-basics', text: '二、金丝雀发布基础', level: 2 },
  { id: 'traffic-splitting', text: '三、流量分割技术', level: 2 },
  { id: 'metrics-monitoring', text: '四、关键指标监控', level: 2 },
  { id: 'rollback-strategy', text: '五、自动回滚策略', level: 2 },
  { id: 'kubernetes-istio', text: '六、Kubernetes + Istio 实现', level: 2 },
  { id: 'ab-testing', text: '七、A/B 测试集成', level: 2 },
  { id: 'best-practices', text: '八、最佳实践', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function CanaryDeployment({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              金丝雀发布（Canary Deployment）是一种<strong className="text-accent">渐进式部署策略</strong>，通过先将新版本推送给少量用户（如 5% 流量），监控关键指标（错误率、延迟、资源使用），确认无问题后逐步扩大流量比例，最终完成全量发布，显著降低生产环境风险。
            </p>
          </blockquote>

          <Callout type="tip" title={'为什么叫"金丝雀"？'}>
            名称来源于煤矿工人携带金丝雀检测有毒气体的做法：如果金丝雀出现异常，说明环境危险，需要立即撤离。在软件发布中，"金丝雀实例"作为早期预警系统，一旦发现问题就快速回滚，避免影响全部用户。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、灰度发布策略对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            灰度发布有多种实现方式，从简单的蓝绿部署到复杂的金丝雀发布，各有适用场景。
          </p>

          <DiagramBlock title="发布策略演进">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
传统部署（高风险）
┌──────────┐     ┌──────────┐
│ 停止 v1   │────▶│ 启动 v2   │
└──────────┘     └──────────┘
停机时间: 分钟级
风险: 高（全量切换）

蓝绿部署（Blue-Green）
┌──────────┐     ┌──────────┐
│ Blue: v1  │     │ Green: v2 │
└──────────┘     └──────────┘
       │                │
       └──── 切换流量 ──┘
停机时间: 秒级（DNS/负载均衡切换）
风险: 中（切换后发现问题需回切）

金丝雀发布（Canary）⭐推荐
┌────────┐  5%  ┌────────┐
│  v1    │─────▶│ Canary  │
│  95%   │      │  v2     │
└────────┘      └────────┘
       │ 逐步增加比例 │
       ▼            ▼
  ┌────────┐  50%  ┌────────┐
  │  v1    │◀─────▶│  v2     │
  │  50%   │       │         │
  └────────┘       └────────┘
       │            │
       └── 100% ───┘
停机时间: 零停机
风险: 低（小范围验证，快速回滚）

滚动更新（Rolling Update）
┌───┐ ┌───┐ ┌───┐ ┌───┐
│v1 │→│v2 │→│v2 │→│v2 │ 逐个替换
└───┘ └───┘ └───┘ └───┘
停机时间: 零停机
风险: 中低（但无法快速回滚）`}</pre>
          </DiagramBlock>

          <Callout type="info" title="策略选择指南">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border p-2 text-left">场景</th>
                  <th className="border border-border p-2 text-left">推荐策略</th>
                  <th className="border border-border p-2 text-left">原因</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">小型应用、非关键业务</td>
                  <td className="border border-border p-2">蓝绿部署</td>
                  <td className="border border-border p-2">简单快速，回滚容易</td>
                </tr>
                <tr className="bg-accent-soft/20">
                  <td className="border border-border p-2"><strong>大型应用、核心业务</strong></td>
                  <td className="border border-border p-2"><strong>金丝雀发布</strong></td>
                  <td className="border border-border p-2"><strong>风险最低，可观测性强</strong></td>
                </tr>
                <tr>
                  <td className="border border-border p-2">容器化环境（K8s）</td>
                  <td className="border border-border p-2">滚动更新 + 金丝雀</td>
                  <td className="border border-border p-2">K8s 原生支持，结合 Istio 增强</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">A/B 测试需求</td>
                  <td className="border border-border p-2">金丝雀 + A/B 测试</td>
                  <td className="border border-border p-2">基于用户特征分流，收集业务数据</td>
                </tr>
              </tbody>
            </table>
          </Callout>

          <h2 id="canary-basics" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、金丝雀发布基础
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            金丝雀发布的核心理念是<strong>小步快跑、快速反馈</strong>，通过渐进式流量切换将风险控制在最小范围。
          </p>

          <DiagramBlock title="金丝雀发布流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
阶段 1: 部署金丝雀实例
┌─────────────┐
│ 部署 v2     │ ← 仅 1-2 个实例，不接收流量或极少流量
│ (Canary)    │
└─────────────┘

阶段 2: 注入少量流量 (1-5%)
┌──────────┐    5%   ┌──────────┐
│  v1      │────────▶│  v2      │
│  95%     │         │ (Canary) │
└──────────┘         └──────────┘
       │                    │
       │              监控指标:
       │              - 错误率
       │              - P95/P99 延迟
       │              - CPU/Memory
       │              - 业务指标（转化率等）

阶段 3: 逐步增加流量
  5% → 10% → 25% → 50% → 75% → 100%
  每步间隔: 5-30 分钟（根据监控结果决定）
  
  如果任何阶段指标异常 → 立即回滚到 v1

阶段 4: 全量发布
┌──────────┐
│  v2      │ ← 100% 流量
│  (Stable)│
└──────────┘
       ↓
清理 v1 实例

总耗时: 30 分钟 - 数小时（取决于谨慎程度）`}</pre>
          </DiagramBlock>

          <Playground
            code={`# 金丝雀发布的关键决策点

# 1. 初始流量比例
INITIAL_CANARY_TRAFFIC = 0.05  # 5%
# 理由: 足够发现明显问题，又不会造成大规模影响

# 2. 流量增长策略
TRAFFIC_STEPS = [0.05, 0.10, 0.25, 0.50, 0.75, 1.0]
STEP_INTERVAL_MINUTES = 10
# 理由: 前期谨慎（小步），后期加速（大步）

# 3. 健康检查指标
HEALTH_METRICS = {
    "error_rate": {"threshold": 0.01, "window": "5m"},      # 错误率 < 1%
    "p95_latency": {"threshold": 500, "window": "5m"},      # P95 延迟 < 500ms
    "cpu_usage": {"threshold": 0.80, "window": "5m"},       # CPU < 80%
    "memory_usage": {"threshold": 0.85, "window": "5m"},    # 内存 < 85%
}

# 4. 自动回滚条件
def should_rollback(metrics):
    """判断是否应该回滚"""
    if metrics["error_rate"] > HEALTH_METRICS["error_rate"]["threshold"]:
        return True, f"错误率过高: {metrics['error_rate']:.2%}"
    
    if metrics["p95_latency"] > HEALTH_METRICS["p95_latency"]["threshold"]:
        return True, f"P95 延迟过高: {metrics['p95_latency']}ms"
    
    if metrics["cpu_usage"] > HEALTH_METRICS["cpu_usage"]["threshold"]:
        return True, f"CPU 使用率过高: {metrics['cpu_usage']:.2%}"
    
    return False, "所有指标正常"

# 5. 发布成功标准
SUCCESS_CRITERIA = {
    "min_duration_minutes": 30,           # 最少运行 30 分钟
    "max_error_rate": 0.005,              # 最大错误率 0.5%
    "latency_degradation_max": 0.10,      # 延迟退化不超过 10%
    "business_metrics_stable": True,      # 业务指标稳定（如转化率）
}

# 实际案例：电商网站发布新结账流程
# - 初始 5% 流量观察 10 分钟
# - 发现错误率 0.8%（略高于阈值 0.5%）
# - 自动暂停，发送告警给开发团队
# - 定位问题：数据库连接池配置错误
# - 修复后重新发布，后续步骤顺利
# - 总发布时间: 2 小时（含故障排查）`}
            language="python"
            highlights={[4, 8, 9, 14, 25, 36, 52]}
            filename="canary_basics.py"
            description="金丝雀发布核心参数配置"
          />

          <SideNote label="流量比例经验值">
            业界常用流量阶梯：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">1% → 5% → 10% → 25% → 50% → 100%</code>。对于极关键业务（如支付），可增加更多中间步骤（如 2%、3%、5%）。每步观察时间根据业务复杂度调整，通常 5-30 分钟。
          </SideNote>

          <h2 id="traffic-splitting" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、流量分割技术
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            实现精确的流量分割是金丝雀发布的核心技术挑战，需要在负载均衡层或服务网格层进行智能路由。
          </p>

          <Playground
            code={`# 流量分割实现方案

# 方案 1: Nginx 加权轮询（简单场景）
"""
upstream backend {
    server v1_backend weight=95;  # 95% 流量
    server v2_backend weight=5;   # 5% 流量
}

server {
    location / {
        proxy_pass http://backend;
    }
}

优点: 配置简单，性能高
缺点: 无法基于请求内容路由，粒度粗
"""

# 方案 2: Kubernetes Service + Label（中等复杂度）
"""
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app
  ports:
    - port: 80
---
# v1 部署（95 个副本）
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-v1
spec:
  replicas: 95
  selector:
    matchLabels:
      app: my-app
      version: v1
---
# v2 金丝雀部署（5 个副本）
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-v2-canary
spec:
  replicas: 5
  selector:
    matchLabels:
      app: my-app
      version: v2

优点: K8s 原生支持，自动负载均衡
缺点: 基于副本数控制流量，不够精确
"""

# 方案 3: Istio VirtualService（推荐，精细控制）
"""
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: my-app-vs
spec:
  hosts:
    - my-app.example.com
  http:
    - route:
        - destination:
            host: my-app
            subset: v1
          weight: 95
        - destination:
            host: my-app
            subset: v2
          weight: 5
---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: my-app-dr
spec:
  host: my-app
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2

优点: 
- 精确的百分比控制
- 支持基于 Header/Cookie 的路由
- 内置熔断、重试、超时控制
缺点: 学习曲线陡峭，需要 Istio 基础设施
"""

# 方案 4: 应用层路由（最灵活）
"""
@app.before_request
def canary_routing():
    user_id = request.cookies.get('user_id')
    
    # 基于用户 ID 哈希分流
    if hash(user_id) % 100 < 5:  # 5% 用户
        request.environ['CANARY_VERSION'] = 'v2'
    else:
        request.environ['CANARY_VERSION'] = 'v1'

# 在视图函数中根据版本返回不同逻辑
@app.route('/checkout')
def checkout():
    version = request.environ.get('CANARY_VERSION', 'v1')
    
    if version == 'v2':
        return new_checkout_flow()
    else:
        return old_checkout_flow()

优点: 完全自定义路由逻辑
缺点: 侵入业务代码，维护成本高
"""

# 方案对比总结
COMPARISON = {
    "Nginx": {"precision": "低", "complexity": "低", "flexibility": "低"},
    "K8s": {"precision": "中", "complexity": "中", "flexibility": "中"},
    "Istio": {"precision": "高", "complexity": "高", "flexibility": "高"},
    "App-level": {"precision": "高", "complexity": "高", "flexibility": "最高"},
}`}
            language="python"
            highlights={[5, 22, 51, 90, 135, 163]}
            filename="traffic_splitting.py"
            description="流量分割技术方案对比"
          />

          <Callout type="warning" title="粘性会话（Session Affinity）的重要性">
            在金丝雀发布期间，必须确保同一用户的请求始终路由到同一版本，否则会导致用户体验不一致（如购物车数据丢失）。解决方案：① 基于 Cookie/User ID 哈希路由；② 启用负载均衡器的 Session Affinity；③ 使用 Istio 的 consistentHash 策略。
          </Callout>

          <h2 id="metrics-monitoring" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、关键指标监控
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            有效的监控是金丝雀发布成功的保障，需要建立多维度的指标体系，实时对比新旧版本的差异。
          </p>

          <DiagramBlock title="监控指标金字塔">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
        ┌─────────────────────┐
        │   业务指标           │ ← 最高优先级
        │  (转化率、收入)      │   直接反映用户价值
        └─────────────────────┘
                 ▲
        ┌─────────────────────┐
        │   应用指标           │ ← 核心关注
        │  (错误率、延迟)      │   反映服务质量
        └─────────────────────┘
                 ▲
        ┌─────────────────────┐
        │   系统指标           │ ← 基础保障
        │  (CPU、内存、网络)   │   反映资源健康度
        └─────────────────────┘

每层都需要:
1. 实时监控（秒级更新）
2. 新旧版本对比（Diff 视图）
3. 自动告警（超过阈值立即通知）
4. 历史基线（与过去 7 天平均值对比）`}</pre>
          </DiagramBlock>

          <Playground
            code={`# 监控指标配置示例（Prometheus + Grafana）

# 1. 错误率监控
"""
# Prometheus Query
sum(rate(http_requests_total{version="v2", status=~"5.."}[5m])) 
/ 
sum(rate(http_requests_total{version="v2"}[5m]))

# Grafana Alert Rule
IF error_rate_v2 > 0.01 FOR 5m
THEN critical "v2 错误率超过 1%"

# 对比查询（v2 vs v1）
(error_rate_v2 - error_rate_v1) / error_rate_v1 * 100
# 显示错误率变化百分比
"""

# 2. 延迟监控（P50/P95/P99）
"""
# P95 延迟
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket{version="v2"}[5m])) 
  by (le)
)

# 告警：P95 延迟超过 500ms
IF p95_latency_v2 > 0.5 FOR 5m
THEN warning "v2 P95 延迟过高"

# 延迟回归分析
(p95_latency_v2 - p95_latency_v1) / p95_latency_v1
# 如果 > 0.1（退化 10%），发出警告
"""

# 3. 资源使用监控
"""
# CPU 使用率
avg(rate(container_cpu_usage_seconds_total{pod=~"my-app-v2.*"}[5m])) 
* 100

# 内存使用率
avg(container_memory_usage_bytes{pod=~"my-app-v2.*"}) 
/ 
avg(container_spec_memory_limit_bytes{pod=~"my-app-v2.*"}) 
* 100

# 告警
IF cpu_v2 > 80 OR memory_v2 > 85
THEN warning "v2 资源使用率过高"
"""

# 4. 业务指标监控（最关键）
"""
# 转化率（电商示例）
sum(rate(checkout_completed_total{version="v2"}[15m])) 
/ 
sum(rate(checkout_started_total{version="v2"}[15m]))

# 平均每单收入
sum(rate(revenue_total{version="v2"}[15m])) 
/ 
sum(rate(orders_total{version="v2"}[15m]))

# 告警：转化率下降超过 5%
IF (conversion_rate_v1 - conversion_rate_v2) / conversion_rate_v1 > 0.05
THEN critical "v2 转化率显著下降"

注意：业务指标需要更长的观察窗口（15-30 分钟）
以消除短期波动的影响
"""

# 5. 自动化监控脚本
import requests
from prometheus_api_client import PrometheusConnect

class CanaryMonitor:
    def __init__(self):
        self.prom = PrometheusConnect(url="http://prometheus:9090")
    
    def check_canary_health(self):
        """检查金丝雀版本健康状态"""
        metrics = {
            "error_rate": self._get_error_rate("v2"),
            "p95_latency": self._get_p95_latency("v2"),
            "cpu_usage": self._get_cpu_usage("v2"),
            "conversion_rate": self._get_conversion_rate("v2"),
        }
        
        # 与 v1 对比
        baseline = {
            "error_rate": self._get_error_rate("v1"),
            "p95_latency": self._get_p95_latency("v1"),
            "conversion_rate": self._get_conversion_rate("v1"),
        }
        
        # 判断是否健康
        issues = []
        if metrics["error_rate"] > 0.01:
            issues.append(f"错误率过高: {metrics['error_rate']:.2%}")
        
        if metrics["p95_latency"] > 0.5:
            issues.append(f"P95 延迟过高: {metrics['p95_latency']*1000:.0f}ms")
        
        # 业务指标退化检查
        conversion_degradation = (
            (baseline["conversion_rate"] - metrics["conversion_rate"]) 
            / baseline["conversion_rate"]
        )
        if conversion_degradation > 0.05:
            issues.append(f"转化率下降: {conversion_degradation:.2%}")
        
        return {
            "healthy": len(issues) == 0,
            "metrics": metrics,
            "issues": issues
        }
    
    def _get_error_rate(self, version):
        query = f'''
        sum(rate(http_requests_total{{version="{version}", status=~"5.."}}[5m]))
        /
        sum(rate(http_requests_total{{version="{version}"}}[5m]))
        '''
        result = self.prom.custom_query(query=query)
        return float(result[0]['value'][1]) if result else 0
    
    # ... 其他指标获取方法

# 使用示例
monitor = CanaryMonitor()
health = monitor.check_canary_health()

if not health["healthy"]:
    print("❌ 金丝雀版本不健康:")
    for issue in health["issues"]:
        print(f"  - {issue}")
    # 触发自动回滚
    rollback_canary()
else:
    print("✅ 金丝雀版本健康，可以继续增加流量")`}
            language="python"
            highlights={[5, 21, 33, 50, 67, 85, 110, 121, 145, 163, 181]}
            filename="canary_monitoring.py"
            description="金丝雀发布监控体系"
          />

          <SideNote label="Golden Signals">
            Google SRE 提出的四大黄金信号：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">延迟（Latency）、流量（Traffic）、错误（Errors）、饱和度（Saturation）</code>。这是监控系统的基础，任何金丝雀发布都必须监控这四项指标。
          </SideNote>

          <h2 id="rollback-strategy" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、自动回滚策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            快速回滚能力是金丝雀发布的安全网，必须在问题发生时能在秒级内恢复到稳定版本。
          </p>

          <Playground
            code={`# 自动回滚实现

# 1. 回滚触发条件
ROLLBACK_TRIGGERS = {
    "critical": {
        "error_rate": 0.02,        # 错误率 > 2%
        "p99_latency": 2.0,        # P99 延迟 > 2s
        "conversion_drop": 0.10,   # 转化率下降 > 10%
    },
    "warning": {
        "error_rate": 0.01,        # 错误率 > 1%
        "p95_latency": 0.5,        # P95 延迟 > 500ms
        "cpu_usage": 0.85,         # CPU > 85%
    }
}

# 2. 回滚决策引擎
class RollbackDecisionEngine:
    def __init__(self):
        self.monitor = CanaryMonitor()
        self.alert_manager = AlertManager()
    
    def evaluate(self):
        """评估是否需要回滚"""
        health = self.monitor.check_canary_health()
        
        # 检查严重问题
        if health["metrics"]["error_rate"] > ROLLBACK_TRIGGERS["critical"]["error_rate"]:
            self._trigger_rollback("CRITICAL", "错误率超过阈值")
            return
        
        # 检查警告级别问题（连续 3 次则回滚）
        warning_count = self._get_consecutive_warnings()
        if warning_count >= 3:
            self._trigger_rollback("WARNING", "连续警告未恢复")
            return
        
        # 记录健康状态
        self._log_health_status(health)
    
    def _trigger_rollback(self, severity, reason):
        """触发回滚"""
        print(f"🚨 {severity}: {reason}，开始回滚...")
        
        # 1. 发送告警
        self.alert_manager.send_alert(
            level=severity,
            message=f"金丝雀发布失败: {reason}",
            channel=["slack", "pagerduty"]
        )
        
        # 2. 执行回滚
        self._execute_rollback()
        
        # 3. 记录事件
        self._log_rollback_event(severity, reason)
    
    def _execute_rollback(self):
        """执行回滚操作"""
        # Kubernetes + Istio 回滚
        import subprocess
        
        # 方法 1: 修改 VirtualService，将流量切回 v1
        subprocess.run([
            "kubectl", "apply", "-f", "virtualservice-v1-only.yaml"
        ])
        
        # 方法 2: 删除金丝雀部署
        subprocess.run([
            "kubectl", "delete", "deployment", "my-app-v2-canary"
        ])
        
        print("✅ 回滚完成，流量已切回 v1")
        
        # 4. 验证回滚成功
        self._verify_rollback()
    
    def _verify_rollback(self):
        """验证回滚是否成功"""
        import time
        time.sleep(10)  # 等待流量稳定
        
        # 检查 v1 的健康状态
        v1_health = self.monitor.check_version_health("v1")
        
        if v1_health["healthy"]:
            print("✅ 回滚验证成功，v1 运行正常")
        else:
            print("❌ 警告: v1 也存在问题，需要人工介入!")
            self.alert_manager.send_critical_alert("回滚后 v1 仍不健康")

# 3. 渐进式回滚（可选策略）
"""
如果问题不严重，可以采用渐进式回滚而非立即全量回切：

100% v2 → 50% v2 + 50% v1 → 10% v2 + 90% v1 → 100% v1

优势: 
- 避免突然的流量冲击
- 给开发团队更多诊断时间
- 适用于性能退化等非致命问题

劣势:
- 延长问题解决时间
- 增加系统复杂性
"""

# 4. 回滚后处理
def post_rollback_actions():
    """回滚后的标准操作流程"""
    actions = [
        "1. 保留金丝雀实例 30 分钟用于问题诊断",
        "2. 导出监控数据和日志",
        "3. 创建事故报告（Post-mortem）",
        "4. 通知相关团队（开发、测试、产品）",
        "5. 安排根本原因分析会议",
        "6. 更新发布检查清单",
    ]
    
    for action in actions:
        print(action)
    
    # 自动创建 Jira ticket
    create_jira_ticket(
        summary="金丝雀发布失败 - 需要根因分析",
        description="详细记录回滚原因和监控数据",
        assignee="development-team"
    )

# 5. 回滚成功率指标
"""
关键指标追踪:
- 平均回滚时间（目标: < 2 分钟）
- 回滚成功率（目标: > 99%）
- 误回滚率（目标: < 5%，避免过度敏感）
- 回滚后问题复发率（目标: 0%）

持续优化回滚策略，平衡安全性与效率
"""`}
            language="python"
            highlights={[5, 21, 27, 36, 44, 58, 73, 86, 97, 110, 127]}
            filename="rollback_strategy.py"
            description="自动回滚策略实现"
          />

          <Callout type="danger" title="回滚的黄金法则">
            <strong>速度优先于完美</strong>。回滚的目标是最快恢复服务，而非彻底解决问题。先回滚保证业务连续性，再离线分析问题根因。理想情况下，从检测到问题到完成回滚应在 <strong>2 分钟内</strong>完成。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
