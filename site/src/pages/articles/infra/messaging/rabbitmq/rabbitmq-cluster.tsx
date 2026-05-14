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
  { id: 'overview', text: '一、集群架构概述', level: 2 },
  { id: 'cluster-types', text: '二、集群模式对比', level: 2 },
  { id: 'ordinary-cluster', text: '2.1 普通集群', level: 3 },
  { id: 'mirror-cluster', text: '2.2 镜像队列集群', level: 3 },
  { id: 'quorum-queues', text: '2.3 Quorum Queues 集群', level: 3 },
  { id: 'federation', text: '三、联邦集群（Federation）', level: 2 },
  { id: 'shovel', text: '四、Shovel 插件', level: 2 },
  { id: 'ha-proxy', text: '五、负载均衡与高可用', level: 2 },
  { id: 'haproxy-config', text: '5.1 HAProxy 配置', level: 3 },
  { id: 'keepalived', text: '5.2 Keepalived 故障转移', level: 3 },
  { id: 'failure-scenarios', text: '六、故障场景与恢复', level: 2 },
  { id: 'comparison', text: '七、集群方案对比', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function RabbitmqCluster({ meta }: { meta: KnowledgeNode }) {
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
              RabbitMQ 集群通过<strong className="text-accent">多节点部署</strong>实现水平扩展和高可用，支持<strong className="text-accent">普通集群</strong>（元数据共享）、<strong className="text-accent">镜像队列</strong>（主从复制）和<strong className="text-accent">Quorum Queues</strong>（Raft 共识）三种模式，结合 HAProxy 负载均衡和 Keepalived 故障转移，构建企业级高可用消息中间件平台。
            </p>
          </blockquote>

          {/* ========== 一、集群架构概述 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、集群架构概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RabbitMQ 集群是由多个 Broker 节点组成的分布式系统，节点之间通过 Erlang 分布式机制通信，共享元数据（Exchange、Queue、Binding 等），但<strong>消息本身默认只在单个节点存储</strong>。
          </p>

          <DiagramBlock title="RabbitMQ 集群架构">
            {`graph TB
              subgraph "Client Layer"
                P["Producer"]
                C["Consumer"]
              end
              
              subgraph "Load Balancer"
                LB["HAProxy / LVS"]
              end
              
              subgraph "RabbitMQ Cluster"
                N1["Node 1<br/>Queue A (Master)"]
                N2["Node 2<br/>Queue B (Master)"]
                N3["Node 3<br/>Queue C (Master)"]
                
                N1 ---|"Erlang Distribution"| N2
                N2 ---|"Erlang Distribution"| N3
                N3 ---|"Erlang Distribution"| N1
              end
              
              P --> LB
              LB --> N1
              LB --> N2
              LB --> N3
              N1 --> C
              N2 --> C
              N3 --> C
              
              style N1 fill:#e1f5ff
              style N2 fill:#e1f5ff
              style N3 fill:#e1f5ff`}
          </DiagramBlock>

          <Callout type="info" title="集群核心特性">
            <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]">
              <li><strong>元数据同步</strong>：所有节点共享 Exchange、Queue、Binding 等元数据</li>
              <li><strong>消息分布</strong>：普通集群中，消息只存储在声明该队列的节点上</li>
              <li><strong>客户端透明</strong>：客户端可以连接任意节点访问整个集群</li>
              <li><strong>故障转移</strong>：节点故障时，需要配合镜像队列或 Quorum Queues 实现高可用</li>
            </ul>
          </Callout>

          {/* ========== 二、集群模式对比 ========== */}
          <h2 id="cluster-types" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、集群模式对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RabbitMQ 提供三种集群模式，适用于不同的业务场景。
          </p>

          {/* 2.1 普通集群 */}
          <h3 id="ordinary-cluster" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 普通集群（Ordinary Cluster）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            普通集群是最基础的集群模式，仅同步元数据，消息本身不复制。如果队列所在节点故障，队列将不可用。
          </p>

          <DiagramBlock title="普通集群工作原理">
            {`graph LR
              subgraph "Node 1"
                Q1["Queue A<br/>Message 1, 2, 3"]
              end
              
              subgraph "Node 2"
                Q2["Queue B<br/>Message 4, 5, 6"]
              end
              
              subgraph "Node 3"
                Q3["Queue C<br/>Message 7, 8, 9"]
              end
              
              P["Producer"] -->|"路由"| Q1
              P -->|"路由"| Q2
              P -->|"路由"| Q3
              
              style Q1 fill:#e1f5ff
              style Q2 fill:#fff4e6
              style Q3 fill:#f0e6ff`}
          </DiagramBlock>

          <SideNote label="普通集群特点">
            <ul className="space-y-2 text-[13px] leading-[1.7]">
              <li>✅ 性能最优（无复制开销）</li>
              <li>✅ 适合对可用性要求不高的场景</li>
              <li>❌ 单点故障风险（节点宕机队列不可用）</li>
              <li>❌ 不适合关键业务</li>
            </ul>
          </SideNote>

          {/* 2.2 镜像队列集群 */}
          <h3 id="mirror-cluster" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 镜像队列集群（Mirror Queue Cluster）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            镜像队列将队列复制到集群中的多个节点，Master 节点处理读写，Slave 节点同步数据。Master 故障时，Slave 自动晋升为新的 Master。
          </p>

          <DiagramBlock title="镜像队列集群架构">
            {`graph TB
              subgraph "Node 1"
                M1["Queue A (Master)"]
              end
              
              subgraph "Node 2"
                S1["Queue A (Mirror)"]
              end
              
              subgraph "Node 3"
                S2["Queue A (Mirror)"]
              end
              
              P["Producer"] --> M1
              M1 -->|"同步"| S1
              M1 -->|"同步"| S2
              M1 --> C["Consumer"]
              
              style M1 fill:#d4edda
              style S1 fill:#fff4e6
              style S2 fill:#fff4e6`}
          </DiagramBlock>

          <Playground 
            code={`# 通过策略配置镜像队列
rabbitmqctl set_policy ha-all "^ha\." '{"ha-mode":"all","ha-sync-mode":"automatic"}'

# ha-mode 可选值：
# - all: 镜像到所有节点
# - exactly: 镜像到指定数量的节点
# - nodes: 镜像到指定的节点列表

# ha-sync-mode 可选值：
# - automatic: 新加入的镜像节点自动同步历史消息
# - manual: 需要手动触发同步`}
            language="bash"
            description="配置镜像队列策略"
          />

          <Callout type="warning" title="镜像队列性能问题">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              镜像队列会显著增加网络带宽和存储开销（每个副本都保存完整消息）。在高吞吐场景下，建议限制镜像节点数量（如 exactly=2），或使用 Quorum Queues 替代。
            </p>
          </Callout>

          {/* 2.3 Quorum Queues 集群 */}
          <h3 id="quorum-queues" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.3 Quorum Queues 集群（推荐）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Quorum Queues 是 RabbitMQ 3.8+ 引入的新特性，基于 <strong>Raft 共识算法</strong>实现，提供更强的数据一致性和更高的性能，是官方推荐的新一代高可用方案。
          </p>

          <ContextSwitcher
            simpleContent={
              <div className="p-4 bg-parchment-light rounded-paper-md">
                <h4 className="font-semibold text-ink mb-2">Quorum Queues 优势</h4>
                <ul className="space-y-2 text-[14px] text-ink-muted">
                  <li>• ✅ 基于 Raft 共识算法，更强的一致性保证</li>
                  <li>• ✅ 自动故障转移，无需手动干预</li>
                  <li>• ✅ 性能优于镜像队列（尤其是写操作）</li>
                  <li>• ✅ 支持流式复制，减少网络开销</li>
                </ul>
              </div>
            }
            hardcoreContent={
              <div className="p-4 bg-parchment-light rounded-paper-md">
                <h4 className="font-semibold text-ink mb-2">Raft 共识原理</h4>
                <pre className="text-[13px] text-ink-muted leading-[1.7] overflow-x-auto">
{`Raft 算法核心概念：
1. Leader Election: 选举一个 Leader 节点
2. Log Replication: Leader 接收写请求，复制到 Follower
3. Safety: 多数派写入成功即确认（N/2+1）
4. Commit: Leader 通知 Follower 提交日志

Quorum Queues 使用 Raft 确保：
- 消息在多数派节点持久化后才确认
- Leader 故障时自动选举新 Leader
- 不会出现脑裂和数据丢失`}
                </pre>
              </div>
            }
          />

          <Playground 
            code={`// Java - 声明 Quorum Queue
Map<String, Object> args = new HashMap<>();
args.put("x-queue-type", "quorum"); // 关键参数
args.put("x-quorum-initial-group-size", 3); // 初始副本数

channel.queueDeclare("quorum-queue", true, false, false, args);
channel.basicPublish("exchange", "routingKey", null, 
    "Quorum Message".getBytes());

// 命令行创建
rabbitmqctl add_queue quorum-queue --type quorum`}
            language="java"
            description="Java - 声明 Quorum Queue"
          />

          <Callout type="tip" title="Quorum Queues vs 镜像队列">
            <table className="w-full border-collapse text-[13px] sm:text-[14px] mt-3">
              <thead>
                <tr className="bg-parchment border-b-2 border-border">
                  <th className="text-left p-2 font-semibold text-ink">特性</th>
                  <th className="text-left p-2 font-semibold text-ink">Quorum Queues</th>
                  <th className="text-left p-2 font-semibold text-ink">镜像队列</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-light">
                  <td className="p-2 font-medium text-ink">一致性</td>
                  <td className="p-2 text-ink-muted">强一致性（Raft）</td>
                  <td className="p-2 text-ink-muted">最终一致性</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="p-2 font-medium text-ink">性能</td>
                  <td className="p-2 text-ink-muted">高（流式复制）</td>
                  <td className="p-2 text-ink-muted">低（全量复制）</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="p-2 font-medium text-ink">故障转移</td>
                  <td className="p-2 text-ink-muted">自动（秒级）</td>
                  <td className="p-2 text-ink-muted">手动/自动（分钟级）</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="p-2 font-medium text-ink">版本要求</td>
                  <td className="p-2 text-ink-muted">RabbitMQ 3.8+</td>
                  <td className="p-2 text-ink-muted">所有版本</td>
                </tr>
              </tbody>
            </table>
          </Callout>

          {/* ========== 三、联邦集群（Federation） ========== */}
          <h2 id="federation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、联邦集群（Federation）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Federation 插件用于跨数据中心或广域网的消息转发，适合地理分布的集群场景。与镜像队列不同，Federation 是<strong>异步转发</strong>，不保证强一致性。
          </p>

          <DiagramBlock title="Federation 架构">
            {`graph LR
              subgraph "Data Center 1"
                Q1["Queue A"]
              end
              
              subgraph "Data Center 2"
                Q2["Queue A (Federated)"]
              end
              
              subgraph "Data Center 3"
                Q3["Queue A (Federated)"]
              end
              
              Q1 -->|"Federation Link"| Q2
              Q1 -->|"Federation Link"| Q3
              
              style Q1 fill:#d4edda
              style Q2 fill:#fff4e6
              style Q3 fill:#fff4e6`}
          </DiagramBlock>

          <Playground 
            code={`# 启用 Federation 插件
rabbitmq-plugins enable rabbitmq_federation
rabbitmq-plugins enable rabbitmq_federation_management

# 配置 Federation Upstream（上游）
rabbitmqctl set_parameter federation-upstream dc2-upstream \
  '{"uri":"amqp://user:pass@dc2.example.com","expires":3600000}'

# 配置 Federation Policy（策略）
rabbitmqctl set_policy federate "^fed\." \
  '{"federation-upstream-set":"all"}'`}
            language="bash"
            description="配置 Federation 插件"
          />

          <SideNote label="Federation 适用场景">
            <ul className="space-y-2 text-[13px] leading-[1.7]">
              <li>• 跨数据中心消息同步</li>
              <li>• 灾备容灾场景</li>
              <li>• 网络延迟较高的广域网环境</li>
              <li>• 不需要强一致性的业务</li>
            </ul>
          </SideNote>

          {/* ========== 四、Shovel 插件 ========== */}
          <h2 id="shovel" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Shovel 插件
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Shovel 插件与 Federation 类似，也是用于跨集群消息转发，但更加轻量级。Federation 是在队列级别配置，而 Shovel 是在<strong>Exchange 或 Queue 级别</strong>直接绑定。
          </p>

          <Playground 
            code={`# 启用 Shovel 插件
rabbitmq-plugins enable rabbitmq_shovel
rabbitmq-plugins enable rabbitmq_shovel_management

# 配置 Shovel
rabbitmqctl set_parameter shovel dc1-to-dc2 \
  '{"src-uri":"amqp://dc1.example.com",
    "src-queue":"source-queue",
    "dest-uri":"amqp://dc2.example.com",
    "dest-queue":"dest-queue",
    "ack-mode":"on-confirm"}'`}
            language="bash"
            description="配置 Shovel 插件"
          />

          <Callout type="info" title="Federation vs Shovel">
            <table className="w-full border-collapse text-[13px] sm:text-[14px] mt-3">
              <thead>
                <tr className="bg-parchment border-b-2 border-border">
                  <th className="text-left p-2 font-semibold text-ink">特性</th>
                  <th className="text-left p-2 font-semibold text-ink">Federation</th>
                  <th className="text-left p-2 font-semibold text-ink">Shovel</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-light">
                  <td className="p-2 font-medium text-ink">配置级别</td>
                  <td className="p-2 text-ink-muted">队列级别（动态）</td>
                  <td className="p-2 text-ink-muted">Exchange/Queue 级别（静态）</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="p-2 font-medium text-ink">灵活性</td>
                  <td className="p-2 text-ink-muted">高（可动态调整）</td>
                  <td className="p-2 text-ink-muted">低（需重启）</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="p-2 font-medium text-ink">性能</td>
                  <td className="p-2 text-ink-muted">略低（额外抽象层）</td>
                  <td className="p-2 text-ink-muted">略高（直接转发）</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="p-2 font-medium text-ink">适用场景</td>
                  <td className="p-2 text-ink-muted">复杂拓扑</td>
                  <td className="p-2 text-ink-muted">简单点对点</td>
                </tr>
              </tbody>
            </table>
          </Callout>

          {/* ========== 五、负载均衡与高可用 ========== */}
          <h2 id="ha-proxy" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、负载均衡与高可用
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            生产环境通常使用 <strong>HAProxy</strong> 或 <strong>LVS</strong> 作为负载均衡器，配合 <strong>Keepalived</strong> 实现 VIP 故障转移，构建高可用接入层。
          </p>

          {/* 5.1 HAProxy 配置 */}
          <h3 id="haproxy-config" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 HAProxy 配置
          </h3>

          <Playground 
            code={`# /etc/haproxy/haproxy.cfg

global
    log 127.0.0.1 local0
    maxconn 4096

defaults
    log     global
    mode    tcp
    option  tcplog
    timeout connect 5s
    timeout client  30s
    timeout server  30s

# RabbitMQ AMQP 端口（5672）
frontend rabbitmq_amqp
    bind *:5672
    default_backend rabbitmq_nodes

backend rabbitmq_nodes
    balance roundrobin
    option tcp-check
    tcp-check send-binary 30313031303130313031303130313031  # AMQP header
    tcp-check expect binary 414d5150                       # AMQP response
    server node1 192.168.1.101:5672 check inter 5s fall 3 rise 2
    server node2 192.168.1.102:5672 check inter 5s fall 3 rise 2
    server node3 192.168.1.103:5672 check inter 5s fall 3 rise 2

# RabbitMQ Management UI（15672）
frontend rabbitmq_mgmt
    bind *:15672
    default_backend rabbitmq_mgmt_nodes

backend rabbitmq_mgmt_nodes
    balance roundrobin
    server node1 192.168.1.101:15672 check
    server node2 192.168.1.102:15672 check
    server node3 192.168.1.103:15672 check`}
            language="bash"
            filename="haproxy.cfg"
            description="HAProxy 配置示例"
          />

          {/* 5.2 Keepalived 故障转移 */}
          <h3 id="keepalived" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 Keepalived 故障转移
          </h3>

          <Playground 
            code={`# /etc/keepalived/keepalived.conf

vrrp_script chk_haproxy {
    script "killall -0 haproxy"
    interval 2
    weight 2
}

vrrp_instance VI_1 {
    state MASTER
    interface eth0
    virtual_router_id 51
    priority 100
    advert_int 1
    
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    
    virtual_ipaddress {
        192.168.1.100/24 dev eth0  # VIP
    }
    
    track_script {
        chk_haproxy
    }
}

# Backup 节点配置（priority 改为 90）`}
            language="bash"
            filename="keepalived.conf"
            description="Keepalived 配置示例"
          />

          <DiagramBlock title="高可用架构全景">
            {`graph TB
              subgraph "Client"
                APP["Application"]
              end
              
              subgraph "VIP Layer"
                VIP["Virtual IP<br/>192.168.1.100"]
              end
              
              subgraph "Load Balancer"
                H1["HAProxy Master<br/>192.168.1.101"]
                H2["HAProxy Backup<br/>192.168.1.102"]
              end
              
              subgraph "RabbitMQ Cluster"
                R1["Node 1<br/>192.168.1.201"]
                R2["Node 2<br/>192.168.1.202"]
                R3["Node 3<br/>192.168.1.203"]
              end
              
              APP --> VIP
              VIP --> H1
              H1 -.->|"Keepalived"| H2
              H1 --> R1
              H1 --> R2
              H1 --> R3
              
              style VIP fill:#d4edda
              style H1 fill:#e1f5ff
              style H2 fill:#fff4e6`}
          </DiagramBlock>

          {/* ========== 六、故障场景与恢复 ========== */}
          <h2 id="failure-scenarios" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、故障场景与恢复
          </h2>

          <InteractiveFlow
            title="节点故障恢复流程"
            steps={[
              {
                label: "节点宕机",
                description: "Node 2 因硬件故障宕机\n• 心跳检测失败\n• 标记节点为 down 状态",
                icon: "❌",
              },
              {
                label: "故障检测",
                description: "集群检测到 Node 2 不可用\n• Erlang 分布式机制发现断连\n• 触发故障转移流程",
                icon: "🔍",
              },
              {
                label: "Master 选举",
                description: "镜像队列 Slave 晋升为 Master\n• Quorum Queues 选举新 Leader\n• 更新元数据",
                icon: "👑",
              },
              {
                label: "流量切换",
                description: "HAProxy 移除故障节点\n• 客户端重连到新 Master\n• 继续处理消息",
                icon: "🔄",
              },
              {
                label: "节点恢复",
                description: "Node 2 修复后重新加入集群\n• 同步缺失数据\n• 恢复为 Slave/Mirror",
                icon: "✅",
              },
            ]}
          />

          <Callout type="warning" title="脑裂问题（Split-Brain）">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              当网络分区导致集群分裂时，可能出现<strong>脑裂</strong>：两个子集群各自认为自己是主集群，导致数据不一致。解决方案：
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] mt-2">
              <li>使用 <strong>Quorum Queues</strong>（基于 Raft，天然避免脑裂）</li>
              <li>配置 <strong>network_partition_handling = pause_minority</strong>（少数派暂停服务）</li>
              <li>使用 <strong>fence 机制</strong>（如 STONITH）隔离故障节点</li>
            </ul>
          </Callout>

          {/* ========== 七、集群方案对比 ========== */}
          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、集群方案对比
          </h2>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">方案</th>
                <th className="text-left p-3 font-semibold text-ink">可用性</th>
                <th className="text-left p-3 font-semibold text-ink">性能</th>
                <th className="text-left p-3 font-semibold text-ink">复杂度</th>
                <th className="text-left p-3 font-semibold text-ink">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-deep/30">
                <td className="p-3 font-medium text-ink">普通集群</td>
                <td className="p-3 text-ink-muted">低</td>
                <td className="p-3 text-ink-muted">最高</td>
                <td className="p-3 text-ink-muted">低</td>
                <td className="p-3 text-ink-muted">开发测试、非关键业务</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-deep/30">
                <td className="p-3 font-medium text-ink">镜像队列</td>
                <td className="p-3 text-ink-muted">高</td>
                <td className="p-3 text-ink-muted">中</td>
                <td className="p-3 text-ink-muted">中</td>
                <td className="p-3 text-ink-muted">传统高可用场景</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-deep/30">
                <td className="p-3 font-medium text-ink">Quorum Queues</td>
                <td className="p-3 text-ink-muted">最高</td>
                <td className="p-3 text-ink-muted">高</td>
                <td className="p-3 text-ink-muted">中</td>
                <td className="p-3 text-ink-muted">新项目首选（推荐）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-deep/30">
                <td className="p-3 font-medium text-ink">Federation</td>
                <td className="p-3 text-ink-muted">中</td>
                <td className="p-3 text-ink-muted">中</td>
                <td className="p-3 text-ink-muted">高</td>
                <td className="p-3 text-ink-muted">跨数据中心同步</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-deep/30">
                <td className="p-3 font-medium text-ink">HAProxy + Keepalived</td>
                <td className="p-3 text-ink-muted">最高</td>
                <td className="p-3 text-ink-muted">高</td>
                <td className="p-3 text-ink-muted">高</td>
                <td className="p-3 text-ink-muted">生产环境标配</td>
              </tr>
            </tbody>
          </table>

          {/* ========== 八、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区 1：集群自动实现高可用">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>错误认知</strong>：只要搭建了集群，就自然具备高可用能力。<br/>
              <strong>正确做法</strong>：普通集群仅共享元数据，消息不复制。必须配置<strong>镜像队列</strong>或<strong>Quorum Queues</strong>才能实现高可用。同时需要 HAProxy + Keepalived 实现接入层高可用。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：镜像队列越多越好">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>错误认知</strong>：镜像副本越多，可靠性越高。<br/>
              <strong>正确做法</strong>：镜像队列会显著增加网络和存储开销。通常 <strong>2-3 个副本</strong>即可满足需求。Quorum Queues 基于 Raft，建议使用奇数节点（3 或 5）。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：Federation 适合局域网集群">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>错误认知</strong>：Federation 可以用于同一机房内的集群扩展。<br/>
              <strong>正确做法</strong>：Federation 是异步转发，适合<strong>跨数据中心</strong>或<strong>广域网</strong>场景。同一机房内应使用普通集群 + 镜像队列/Quorum Queues，性能更好。
            </p>
          </Callout>

          <Callout type="danger" title="误区 4：节点重启后数据自动恢复">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>错误认知</strong>：节点重启后，所有数据会自动恢复。<br/>
              <strong>正确做法</strong>：只有<strong>持久化消息</strong>且配置了<strong>镜像队列/Quorum Queues</strong>才能在节点故障后恢复。普通集群中，节点宕机会导致该节点上的非持久化消息永久丢失。
            </p>
          </Callout>

          {/* ========== 九、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "RabbitMQ 集群有哪几种模式？有什么区别？",
                answer: `三种主要模式：
1. 普通集群：仅共享元数据，消息不复制，性能最高但无高可用
2. 镜像队列集群：Master-Slave 复制，高可用但性能较低
3. Quorum Queues：基于 Raft 共识，强一致性+高性能，官方推荐

选择建议：新项目优先使用 Quorum Queues，旧项目可继续使用镜像队列。`,
              },
              {
                question: "什么是脑裂？如何避免？",
                answer: `脑裂（Split-Brain）：网络分区导致集群分裂，多个子集群各自认为自己是主集群，导致数据不一致。

避免方案：
1. 使用 Quorum Queues（基于 Raft，天然避免脑裂）
2. 配置 network_partition_handling = pause_minority（少数派暂停服务）
3. 使用 fence 机制（如 STONITH）隔离故障节点
4. 优化网络架构，减少网络分区风险`,
              },
              {
                question: "HAProxy 和 Keepalived 的作用分别是什么？",
                answer: `HAProxy：
• 四层/七层负载均衡器
• 分发客户端请求到后端 RabbitMQ 节点
• 健康检查，自动剔除故障节点
• 支持 TCP 和 HTTP 协议

Keepalived：
• 基于 VRRP 协议实现 VIP 故障转移
• 监控 HAProxy 进程存活
• HAProxy 主节点故障时，VIP 漂移到备用节点
• 实现接入层高可用

两者配合：Keepalived 保证 HAProxy 高可用，HAProxy 保证 RabbitMQ 负载均衡。`,
              },
              {
                question: "Federation 和 Shovel 有什么区别？如何选择？",
                answer: `区别：
• Federation：队列级别配置，动态灵活，适合复杂拓扑
• Shovel：Exchange/Queue 级别绑定，静态配置，性能略高

选择：
• 需要动态调整转发规则 → Federation
• 简单的点对点转发 → Shovel
• 跨数据中心同步 → 两者均可，Federation 更常用
• 同一机房内 → 不使用两者，直接用集群+镜像队列`,
              },
              {
                question: "Quorum Queues 相比镜像队列有哪些优势？",
                answer: `Quorum Queues 优势：
1. 一致性：基于 Raft 共识算法，强一致性保证
2. 性能：流式复制，减少网络开销，写性能更高
3. 故障转移：自动选举，秒级恢复，无需手动干预
4. 安全性：不会出现脑裂和数据丢失
5. 维护性：配置简单，运维成本低

镜像队列劣势：
• 全量复制，网络开销大
• 故障转移慢（分钟级）
• 可能出现数据不一致
• 配置复杂

建议：RabbitMQ 3.8+ 新项目优先使用 Quorum Queues。`,
              },
              {
                question: "如何监控 RabbitMQ 集群健康状态？",
                answer: `监控指标：
1. 节点状态：rabbitmqctl cluster_status
2. 队列长度：management API / Prometheus exporter
3. 消息速率：publish/consume rate
4. 连接数：channel/connection count
5. 磁盘空间：disk free limit
6. 内存使用：memory usage
7. 网络分区：network_partitions

监控工具：
• RabbitMQ Management Plugin（内置）
• Prometheus + Grafana（推荐）
• ELK Stack（日志分析）
• 自定义脚本 + 告警（钉钉/企业微信）`,
              },
            ]}
          />

          {/* ========== 十、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-parchment-deep/40 rounded-paper-md border border-border-light">
              <h4 className="font-semibold text-ink mb-2">🔗 前置知识</h4>
              <ul className="space-y-1 text-[14px] text-ink-muted">
                <li>• <a href="/docs/rabbitmq/rabbitmq-core" className="text-accent hover:underline">RabbitMQ 核心概念</a></li>
                <li>• <a href="/docs/rabbitmq/rabbitmq-reliability" className="text-accent hover:underline">RabbitMQ 消息可靠性</a></li>
              </ul>
            </div>

            <div className="p-4 bg-parchment-deep/40 rounded-paper-md border border-border-light">
              <h4 className="font-semibold text-ink mb-2">🔗 延伸阅读</h4>
              <ul className="space-y-1 text-[14px] text-ink-muted">
                <li>• <a href="/docs/kafka/kafka-architecture" className="text-accent hover:underline">Kafka 架构与核心概念</a></li>
                <li>• <a href="/docs/rocketmq/rocketmq-ha" className="text-accent hover:underline">RocketMQ 高可用与容灾</a></li>
                <li>• <a href="/docs/infra/load-balancing" className="text-accent hover:underline">负载均衡技术详解</a></li>
              </ul>
            </div>
          </div>

          <Callout type="info" title="设计模式关联">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              集群高可用涉及多个设计模式：<strong>High Availability Pattern</strong>（高可用模式）、<strong>Leader Election Pattern</strong>（领导者选举）、<strong>Load Balancing Pattern</strong>（负载均衡模式）、<strong>Circuit Breaker Pattern</strong>（熔断器模式，用于故障隔离）。
            </p>
          </Callout>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，禁止用 <aside> 包裹！组件自行管理桌面/移动端显隐 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
