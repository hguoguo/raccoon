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
  { id: 'overview', text: '一、RocketMQ 核心定位', level: 2 },
  { id: 'architecture', text: '二、整体架构设计', level: 2 },
  { id: 'core-components', text: '三、核心组件详解', level: 2 },
  { id: 'nameserver', text: '3.1 NameServer', level: 3 },
  { id: 'broker', text: '3.2 Broker', level: 3 },
  { id: 'producer-consumer', text: '3.3 Producer & Consumer', level: 3 },
  { id: 'message-storage', text: '四、消息存储机制', level: 2 },
  { id: 'commitlog', text: '4.1 CommitLog', level: 3 },
  { id: 'consumequeue', text: '4.2 ConsumeQueue', level: 3 },
  { id: 'indexfile', text: '4.3 IndexFile', level: 3 },
  { id: 'message-flow', text: '五、消息流转过程', level: 2 },
  { id: 'send-flow', text: '5.1 发送流程', level: 3 },
  { id: 'store-flow', text: '5.2 存储流程', level: 3 },
  { id: 'consume-flow', text: '5.3 消费流程', level: 3 },
  { id: 'high-availability', text: '六、高可用设计', level: 2 },
  { id: 'master-slave', text: '6.1 主从同步', level: 3 },
  { id: 'dledger', text: '6.2 DLedger 模式', level: 3 },
  { id: 'comparison', text: '七、与其他 MQ 对比', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function RocketmqArchitecture({ meta }: { meta: KnowledgeNode }) {
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
              RocketMQ 是阿里巴巴开源的<strong className="text-accent">分布式消息中间件</strong>，采用 NameServer + Broker 架构，支持事务消息、顺序消息、延迟消息等企业级特性，具备<strong className="text-accent">亿级消息堆积能力</strong>和<strong className="text-accent">金融级可靠性</strong>，广泛应用于电商交易、支付结算、物流追踪等场景。
            </p>
          </blockquote>

          {/* ========== 一、RocketMQ 核心定位 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、RocketMQ 核心定位
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 最初由阿里巴巴开发，用于解决双十一期间海量消息处理问题，后捐赠给 Apache 基金会成为顶级项目。它是一款<strong>企业级分布式消息中间件</strong>，具备以下核心特点：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>金融级可靠性</strong>：支持事务消息，保证消息不丢失、不重复</li>
            <li><strong>海量消息堆积</strong>：单集群可支撑亿级消息堆积，不影响性能</li>
            <li><strong>丰富的消息类型</strong>：支持普通消息、顺序消息、事务消息、延迟消息</li>
            <li><strong>低延迟高吞吐</strong>：毫秒级延迟，百万级 TPS</li>
            <li><strong>灵活扩展</strong>：支持水平扩展，Broker 可动态增减</li>
          </ul>

          <Callout type="info" title="RocketMQ vs Kafka">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              Kafka 强调<strong>高吞吐和流处理</strong>，适合日志收集、实时数据分析；RocketMQ 强调<strong>可靠性和事务支持</strong>，适合交易订单、支付通知等业务场景。Kafka 不支持事务消息和延迟消息，而 RocketMQ 原生支持这些企业级特性。
            </p>
          </Callout>

          {/* ========== 二、整体架构设计 ========== */}
          <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、整体架构设计
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 采用经典的<strong>NameServer + Broker</strong>架构，Producer 和 Consumer 通过 NameServer 发现 Broker 地址，然后直接与 Broker 通信。这种设计解耦了服务发现和消息传输，提高了系统的可扩展性。
          </p>

          <DiagramBlock title="RocketMQ 整体架构图">
            {`graph TB
              subgraph "Producer 端"
                P1["Producer 1"]
                P2["Producer 2"]
              end

              subgraph "NameServer Cluster"
                NS1["NameServer 1"]
                NS2["NameServer 2"]
                NS3["NameServer 3"]
              end

              subgraph "Broker Cluster - Master-Slave"
                subgraph "Broker Group A"
                  BM1["Broker-Master A"]
                  BS1["Broker-Slave A"]
                  BM1 ---|"Sync"| BS1
                end
                
                subgraph "Broker Group B"
                  BM2["Broker-Master B"]
                  BS2["Broker-Slave B"]
                  BM2 ---|"Sync"| BS2
                end
              end

              subgraph "Consumer 端"
                CG["Consumer Group"]
                C1["Consumer 1"]
                C2["Consumer 2"]
              end

              P1 -->|"Register"| NS1
              P2 -->|"Register"| NS2
              
              P1 -->|"Send Message"| BM1
              P2 -->|"Send Message"| BM2
              
              BM1 -->|"Consume"| C1
              BM2 -->|"Consume"| C2

              NS1 -.->|"Route Info"| P1
              NS2 -.->|"Route Info"| P2`}
          </DiagramBlock>

          <SideNote label="关键设计">
            <p className="text-[13px] leading-[1.7]">
              NameServer 之间无状态、不通信，每个 NameServer 保存完整的路由信息。Producer/Consumer 随机连接一个 NameServer 获取路由，实现了高可用和负载均衡。
            </p>
          </SideNote>

          {/* ========== 三、核心组件详解 ========== */}
          <h2 id="core-components" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、核心组件详解
          </h2>

          <h3 id="nameserver" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 NameServer
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>NameServer</strong> 是一个轻量级的服务注册与发现中心，负责管理 Broker 的路由信息。它的设计非常简单，没有持久化存储，所有数据都在内存中。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>路由管理</strong>：维护 Topic 到 Broker 的映射关系</li>
            <li><strong>服务注册</strong>：Broker 启动时向所有 NameServer 注册自己</li>
            <li><strong>心跳检测</strong>：Broker 每 30 秒发送心跳，NameServer 120 秒未收到心跳则剔除该 Broker</li>
            <li><strong>无状态设计</strong>：NameServer 之间不通信，各自独立提供服务</li>
          </ul>

          <Callout type="tip" title="为什么不用 ZooKeeper？">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              RocketMQ 早期版本使用 ZooKeeper，但后来改用自研的 NameServer。原因是 ZooKeeper 在大规模集群下性能瓶颈明显，且运维复杂。NameServer 采用简单的 KV 存储，性能更高，部署更简单。
            </p>
          </Callout>

          <h3 id="broker" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 Broker
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>Broker</strong> 是 RocketMQ 的核心组件，负责消息的存储、转发和查询。Broker 采用主从架构，支持同步双写和异步复制两种模式。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>消息存储</strong>：将消息持久化到磁盘（CommitLog）</li>
            <li><strong>消息索引</strong>：构建 ConsumeQueue 和 IndexFile，加速消息检索</li>
            <li><strong>高可用</strong>：支持主从同步，Master 故障时 Slave 可提供读服务</li>
            <li><strong>负载均衡</strong>：多个 Broker 组成集群，均匀分布消息</li>
          </ul>

          <DiagramBlock title="Broker 主从架构">
            {`graph LR
              subgraph "Broker Group"
                Master["Broker Master<br/>可读可写"]
                Slave["Broker Slave<br/>只读"]
              end

              Producer -->|"Write"| Master
              Consumer -->|"Read"| Master
              Consumer -->|"Read"| Slave

              Master -->|"Sync/Async Replication"| Slave

              style Master fill:#f9f,stroke:#333,stroke-width:2px
              style Slave fill:#bbf,stroke:#333,stroke-width:2px`}
          </DiagramBlock>

          <h3 id="producer-consumer" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.3 Producer & Consumer
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>Producer</strong> 负责发送消息，<strong>Consumer</strong> 负责消费消息。它们都是客户端，通过 NameServer 获取 Broker 路由信息后，直接与 Broker 通信。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Producer</strong>：支持同步发送、异步发送、单向发送三种模式</li>
            <li><strong>Consumer</strong>：支持 Push 和 Pull 两种消费模式</li>
            <li><strong>Consumer Group</strong>：同一 Group 内的 Consumer 共同消费一个 Topic，实现负载均衡</li>
            <li><strong>重试机制</strong>：消费失败后可自动重试，最多 16 次</li>
          </ul>

          {/* ========== 四、消息存储机制 ========== */}
          <h2 id="message-storage" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、消息存储机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 采用独特的混合存储架构，将消息数据和索引数据分离存储，兼顾写入性能和查询效率。
          </p>

          <h3 id="commitlog" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 CommitLog
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>CommitLog</strong> 是消息的物理存储文件，所有消息都顺序写入 CommitLog。这种设计充分利用了磁盘的顺序写性能，实现了高吞吐。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>顺序写入</strong>：所有消息追加写入，避免随机 I/O</li>
            <li><strong>单个文件</strong>：默认每个 CommitLog 文件大小为 1GB</li>
            <li><strong>混合存储</strong>：不同 Topic 的消息混合存储在同一个 CommitLog 中</li>
            <li><strong>MappedFile</strong>：使用内存映射文件（mmap）提高读写性能</li>
          </ul>

          <h3 id="consumequeue" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 ConsumeQueue
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>ConsumeQueue</strong> 是消息的逻辑队列，相当于 Topic 的索引文件。每个 Topic 的每个 Queue 都有一个对应的 ConsumeQueue 文件。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>固定长度</strong>：每条记录固定 20 字节（8 字节 offset + 4 字节 size + 8 字节 tag hashCode）</li>
            <li><strong>指向 CommitLog</strong>：ConsumeQueue 存储的是消息在 CommitLog 中的物理偏移量</li>
            <li><strong>按 Queue 组织</strong>：每个 Queue 独立维护自己的 ConsumeQueue</li>
            <li><strong>快速检索</strong>：Consumer 通过 ConsumeQueue 快速定位消息位置</li>
          </ul>

          <DiagramBlock title="CommitLog 与 ConsumeQueue 关系">
            {`graph TB
              subgraph "CommitLog"
                CL["CommitLog File<br/>Message1 | Message2 | Message3 | ..."]
              end

              subgraph "ConsumeQueue - Topic A - Queue 0"
                CQ1["Offset: 100, Size: 256, TagHash: xxx"]
                CQ2["Offset: 356, Size: 128, TagHash: yyy"]
                CQ3["Offset: 484, Size: 512, TagHash: zzz"]
              end

              subgraph "ConsumeQueue - Topic A - Queue 1"
                CQ4["Offset: 996, Size: 256, TagHash: aaa"]
                CQ5["Offset: 1252, Size: 128, TagHash: bbb"]
              end

              CQ1 -->|"Points to"| CL
              CQ2 -->|"Points to"| CL
              CQ3 -->|"Points to"| CL
              CQ4 -->|"Points to"| CL
              CQ5 -->|"Points to"| CL`}
          </DiagramBlock>

          <h3 id="indexfile" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.3 IndexFile
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>IndexFile</strong> 提供基于消息 Key 和时间戳的索引功能，支持根据业务 Key 快速查询消息。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Hash 索引</strong>：使用 Hash 表结构，根据 Key 的 hashCode 定位索引槽</li>
            <li><strong>时间索引</strong>：支持按时间范围查询消息</li>
            <li><strong>独立文件</strong>：每个 IndexFile 默认大小为 400MB</li>
            <li><strong>可选功能</strong>：如果不使用 Key 查询，可以关闭 IndexFile 以提高性能</li>
          </ul>

          {/* ========== 五、消息流转过程 ========== */}
          <h2 id="message-flow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、消息流转过程
          </h2>

          <h3 id="send-flow" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 发送流程
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Producer 发送消息的完整流程如下：
          </p>

          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>获取路由</strong>：从 NameServer 获取 Topic 的路由信息（包含哪些 Broker）</li>
            <li><strong>选择 Queue</strong>：根据消息队列选择算法（轮询、哈希等）选择一个 MessageQueue</li>
            <li><strong>发送消息</strong>：将消息发送到选定的 Broker</li>
            <li><strong>Broker 处理</strong>：Broker 将消息写入 CommitLog，并异步构建 ConsumeQueue</li>
            <li><strong>返回结果</strong>：Broker 返回发送结果给 Producer</li>
          </ol>

          <h3 id="store-flow" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 存储流程
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Broker 接收到消息后的存储流程：
          </p>

          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>写入 CommitLog</strong>：消息追加写入 CommitLog 文件（顺序写）</li>
            <li><strong>刷盘策略</strong>：根据配置同步刷盘或异步刷盘</li>
            <li><strong>构建索引</strong>：异步线程读取 CommitLog，解析消息并构建 ConsumeQueue</li>
            <li><strong>构建 IndexFile</strong>：如果消息有 Key，同时构建 IndexFile 索引</li>
            <li><strong>主从同步</strong>：如果是 Master，将消息同步或异步复制到 Slave</li>
          </ol>

          <h3 id="consume-flow" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.3 消费流程
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Consumer 消费消息的流程：
          </p>

          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>获取路由</strong>：从 NameServer 获取订阅的 Topic 路由信息</li>
            <li><strong>拉取消息</strong>：从 Broker 拉取消息（Pull 模式）或接收推送（Push 模式）</li>
            <li><strong>读取 ConsumeQueue</strong>：根据消费位点读取 ConsumeQueue，获取消息在 CommitLog 中的位置</li>
            <li><strong>读取消息</strong>：根据偏移量从 CommitLog 中读取实际消息内容</li>
            <li><strong>业务处理</strong>：执行消费逻辑</li>
            <li><strong>提交位点</strong>：消费成功后，向 Broker 提交消费位点（Offset）</li>
          </ol>

          {/* ========== 六、高可用设计 ========== */}
          <h2 id="high-availability" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、高可用设计
          </h2>

          <h3 id="master-slave" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.1 主从同步
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 采用主从架构实现高可用，支持两种同步模式：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>同步双写</strong>：消息写入 Master 后，同步等待 Slave 也写入成功才返回。可靠性高，但性能较低</li>
            <li><strong>异步复制</strong>：消息写入 Master 后立即返回，后台异步复制到 Slave。性能高，但可能丢失少量数据</li>
          </ul>

          <Callout type="warning" title="主从切换限制">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              RocketMQ 传统主从模式<strong>不支持自动主从切换</strong>。Master 故障后，需要人工干预才能将 Slave 提升为 Master。这是 RocketMQ 的一个局限性，后续版本通过 DLedger 解决了这个问题。
            </p>
          </Callout>

          <h3 id="dledger" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.2 DLedger 模式
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>DLedger</strong> 是 RocketMQ 4.5+ 引入的高可用方案，基于 Raft 共识算法实现自动主从切换。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>Raft 算法</strong>：采用 Raft 共识算法选举 Leader</li>
            <li><strong>自动切换</strong>：Leader 故障后，自动选举新的 Leader，无需人工干预</li>
            <li><strong>多数派确认</strong>：消息写入多数派节点后即认为成功</li>
            <li><strong>强一致性</strong>：保证数据的强一致性，不会丢失已确认的消息</li>
          </ul>

          {/* ========== 七、与其他 MQ 对比 ========== */}
          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、与其他 MQ 对比
          </h2>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold text-ink">特性</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold text-ink">RocketMQ</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold text-ink">Kafka</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold text-ink">RabbitMQ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-medium text-ink">吞吐量</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">十万级 TPS</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">百万级 TPS</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">万级 TPS</td>
              </tr>
              <tr className="bg-surface">
                <td className="border border-border-light px-3 py-2 font-medium text-ink">延迟</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">毫秒级</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">毫秒级</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">微秒级</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-medium text-ink">事务消息</td>
                <td className="border border-border-light px-3 py-2 text-green-600 font-medium">✅ 支持</td>
                <td className="border border-border-light px-3 py-2 text-red-600">❌ 不支持</td>
                <td className="border border-border-light px-3 py-2 text-red-600">❌ 不支持</td>
              </tr>
              <tr className="bg-surface">
                <td className="border border-border-light px-3 py-2 font-medium text-ink">延迟消息</td>
                <td className="border border-border-light px-3 py-2 text-green-600 font-medium">✅ 支持</td>
                <td className="border border-border-light px-3 py-2 text-red-600">❌ 不支持</td>
                <td className="border border-border-light px-3 py-2 text-yellow-600">⚠️ 插件支持</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-medium text-ink">顺序消息</td>
                <td className="border border-border-light px-3 py-2 text-green-600 font-medium">✅ 支持</td>
                <td className="border border-border-light px-3 py-2 text-green-600 font-medium">✅ 支持</td>
                <td className="border border-border-light px-3 py-2 text-yellow-600">⚠️ 部分支持</td>
              </tr>
              <tr className="bg-surface">
                <td className="border border-border-light px-3 py-2 font-medium text-ink">消息堆积</td>
                <td className="border border-border-light px-3 py-2 text-green-600 font-medium">✅ 亿级</td>
                <td className="border border-border-light px-3 py-2 text-green-600 font-medium">✅ 亿级</td>
                <td className="border border-border-light px-3 py-2 text-red-600">❌ 千级</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-medium text-ink">适用场景</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">交易、支付、订单</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">日志、大数据</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">即时通讯、路由</td>
              </tr>
            </tbody>
          </table>

          {/* ========== 八、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <div className="space-y-4 mb-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-red-700">误区 1：</strong>RocketMQ 必须依赖 ZooKeeper
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">正解：</strong>RocketMQ 4.x+ 使用自研的 NameServer，不再依赖 ZooKeeper。只有在使用 DLedger 模式时才需要额外的协调组件。
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-red-700">误区 2：</strong>Slave 可以自动接管 Master
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">正解：</strong>传统主从模式不支持自动切换，需要人工干预。只有 DLedger 模式才支持基于 Raft 的自动主从切换。
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-red-700">误区 3：</strong>CommitLog 按 Topic 分开存储
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">正解：</strong>所有 Topic 的消息都混合存储在同一个 CommitLog 中，通过 ConsumeQueue 实现逻辑隔离。这种设计保证了顺序写的高性能。
              </p>
            </div>
          </div>

          {/* ========== 九、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'RocketMQ 的 NameServer 和 ZooKeeper 有什么区别？',
                answer: 'NameServer 是轻量级的 KV 存储，无状态、不通信，Broker 定期上报路由信息。ZooKeeper 是分布式协调服务，基于 ZAB 协议，支持选举、分布式锁等复杂功能。NameServer 性能更高、部署更简单，但功能相对单一。'
              },
              {
                question: 'RocketMQ 如何保证消息不丢失？',
                answer: '从三个层面保证：1) Producer 端：同步发送并检查返回结果；2) Broker 端：使用同步刷盘 + 同步双写，确保消息持久化到磁盘并复制到 Slave；3) Consumer 端：消费成功后再提交 Offset，避免消息丢失。'
              },
              {
                question: 'RocketMQ 的存储架构有什么优势？',
                answer: '采用 CommitLog + ConsumeQueue 的混合存储架构。CommitLog 顺序写入，充分利用磁盘顺序写性能；ConsumeQueue 作为索引，固定长度便于快速检索。这种设计兼顾了写入性能和查询效率。'
              },
              {
                question: 'RocketMQ 如何实现高可用？',
                answer: '传统模式采用主从架构，支持同步双写和异步复制，但不支持自动切换。DLedger 模式基于 Raft 算法，支持自动主从切换和强一致性保证。生产环境建议使用 DLedger 模式。'
              },
              {
                question: 'RocketMQ 和 Kafka 的主要区别是什么？',
                answer: '1) 定位不同：Kafka 是流处理平台，RocketMQ 是消息中间件；2) 功能差异：RocketMQ 支持事务消息、延迟消息，Kafka 不支持；3) 存储架构：Kafka 按 Partition 存储，RocketMQ 采用 CommitLog + ConsumeQueue；4) 适用场景：Kafka 适合大数据场景，RocketMQ 适合交易场景。'
              }
            ]}
          />

          {/* ========== 十、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light hover:border-accent transition-colors">
              <h4 className="font-semibold text-ink mb-2">📌 RocketMQ 事务消息</h4>
              <p className="text-[13px] text-ink-muted">深入理解 RocketMQ 如何通过半消息和回查机制实现分布式事务</p>
            </div>
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light hover:border-accent transition-colors">
              <h4 className="font-semibold text-ink mb-2">📌 RocketMQ 高级特性</h4>
              <p className="text-[13px] text-ink-muted">学习顺序消息、延迟消息、批量消息等企业级特性的实现原理</p>
            </div>
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light hover:border-accent transition-colors">
              <h4 className="font-semibold text-ink mb-2">📌 Kafka 架构设计</h4>
              <p className="text-[13px] text-ink-muted">对比学习 Kafka 的架构设计，理解不同 MQ 的设计取舍</p>
            </div>
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light hover:border-accent transition-colors">
              <h4 className="font-semibold text-ink mb-2">📌 分布式事务</h4>
              <p className="text-[13px] text-ink-muted">了解分布式事务的各种解决方案，包括 TCC、Saga、可靠消息最终一致性等</p>
            </div>
          </div>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，禁止用 <aside> 包裹！组件自行管理桌面/移动端显隐 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
