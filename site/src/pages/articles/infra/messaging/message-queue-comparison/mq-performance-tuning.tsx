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
  { id: 'performance-overview', text: '一、性能优化概述', level: 2 },
  { id: 'kafka-tuning', text: '二、Kafka 性能调优', level: 2 },
  { id: 'rocketmq-tuning', text: '三、RocketMQ 性能调优', level: 2 },
  { id: 'rabbitmq-tuning', text: '四、RabbitMQ 性能调优', level: 2 },
  { id: 'producer-optimization', text: '五、生产者优化', level: 2 },
  { id: 'consumer-optimization', text: '六、消费者优化', level: 2 },
  { id: 'broker-optimization', text: '七、Broker 优化', level: 2 },
  { id: 'network-disk', text: '八、网络与磁盘优化', level: 2 },
  { id: 'monitoring-benchmark', text: '九、监控与基准测试', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function MqPerformanceTuning({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              消息队列性能调优是通过<strong className="text-accent">批量发送、压缩算法、零拷贝、页缓存、并行消费</strong>等技术手段，在保证可靠性的前提下，最大化吞吐量、最小化延迟、优化资源利用率。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要性能调优？">
            默认配置通常保守，无法满足高并发场景需求。通过针对性调优，可以将 Kafka 吞吐量从 10 MB/s 提升到 1 GB/s，将 RabbitMQ 延迟从 10ms 降低到 1ms。性能调优是平衡吞吐、延迟、可靠性三者关系的关键技能。
          </Callout>

          <h2 id="performance-overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、性能优化概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            消息队列性能涉及生产者、Broker、消费者三个环节，以及网络、磁盘等基础设施。
          </p>

          <DiagramBlock title="性能优化全景图">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────┐
│         消息队列性能优化维度                  │
├─────────────────────────────────────────────┤
│ 1. 吞吐量（Throughput）                      │
│    - 批量发送、压缩、零拷贝、并行度           │
│                                             │
│ 2. 延迟（Latency）                           │
│    - 减少往返、异步处理、本地缓存             │
│                                             │
│ 3. 资源利用（Resource）                      │
│    - CPU、内存、磁盘、网络                   │
│                                             │
│ 4. 可扩展性（Scalability）                   │
│    - 水平扩展、分区均衡、负载均衡             │
└─────────────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="性能指标">
            <strong>吞吐量</strong>：每秒处理的消息数（TPS）或数据量（MB/s）。<br/>
            <strong>延迟</strong>：消息从生产到消费的时间（P50/P95/P99）。<br/>
            <strong>资源利用率</strong>：CPU、内存、磁盘、网络的使用率。
          </SideNote>

          <h2 id="kafka-tuning" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Kafka 性能调优
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Kafka 的性能调优围绕批量发送、压缩、零拷贝等核心技术展开。
          </p>

          <Playground
            code={`# Kafka 关键配置

# 生产者
batch.size=65536          # 批量大小 64KB
linger.ms=20              # 等待时间 20ms
compression.type=lz4      # LZ4 压缩
acks=1                    # Leader 确认

# Broker
num.io.threads=8          # I/O 线程数
log.segment.bytes=1GB     # Segment 大小
default.replication.factor=3  # 3 副本

# 消费者
max.poll.records=500      # 每次拉取 500 条
fetch.min.bytes=1MB       # 最小拉取 1MB

# 性能提升：默认 ~10 MB/s → 优化后 ~100-500 MB/s`}
            language="python"
            highlights={[4, 5, 6, 7, 11, 12, 13, 17, 18]}
            filename="kafka-tuning.py"
            description="Kafka 性能调优配置"
          />

          <Callout type="info" title="Kafka 高性能的秘密">
            Kafka 的高吞吐源于四大技术：① <strong>顺序 I/O</strong>：日志追加写入；② <strong>零拷贝</strong>：sendfile 系统调用；③ <strong>页缓存</strong>：利用 OS Page Cache；④ <strong>批量发送</strong>：减少网络往返。
          </Callout>

          <h2 id="rocketmq-tuning" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、RocketMQ 性能调优
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 的调优重点在刷盘策略、主从同步和队列配置。
          </p>

          <Playground
            code={`# RocketMQ 关键配置

# Broker
flushDiskType=ASYNC_FLUSH  # 异步刷盘
brokerRole=ASYNC_MASTER    # 异步主从
serverWorkerThreads=8      # 工作线程数

# 生产者
批量发送：List<Message> messages
异步发送：sendAsync(msg, callback)

# 消费者
consumeThreadMin=20        # 最小线程数
consumeThreadMax=64        # 最大线程数
pullBatchSize=32           # 批量拉取

# 性能提升：默认 ~10-50 万 TPS → 优化后 ~50-100 万 TPS`}
            language="python"
            highlights={[4, 5, 6, 9, 10, 13, 14, 15]}
            filename="rocketmq-tuning.py"
            description="RocketMQ 性能调优配置"
          />

          <SideNote label="刷盘策略选择">
            <strong>异步刷盘</strong>：性能好，吞吐量提升 2-3 倍，但节点宕机可能丢失最近几秒的数据。<br/>
            <strong>同步刷盘</strong>：可靠性高，但吞吐量下降 50-80%。<br/>
            <strong>建议</strong>：非金融业务使用异步刷盘 + 多副本。
          </SideNote>

          <h2 id="rabbitmq-tuning" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、RabbitMQ 性能调优
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RabbitMQ 的调优重点在持久化、预取计数和集群配置。
          </p>

          <Playground
            code={`# RabbitMQ 关键配置

# Broker
vm_memory_high_watermark.relative=0.6  # 内存水位 60%
disk_free_limit.absolute=50MB          # 磁盘空闲限制

# 生产者
Confirm 模式：channel.confirm_delivery()
批量发布：每 100 条确认一次

# 消费者
prefetch_count=10-100  # 预取计数（关键）
手动 ACK：basic_ack(delivery_tag)
多消费者：启动 10+ 线程并行

# 性能提升：默认 ~1-5 万 TPS → 优化后 ~10-20 万 TPS
# 注意：RabbitMQ 不适合超高吞吐场景（>100 万 TPS）`}
            language="python"
            highlights={[4, 5, 8, 9, 12, 13, 14]}
            filename="rabbitmq-tuning.py"
            description="RabbitMQ 性能调优配置"
          />

          <Callout type="danger" title="镜像队列的性能陷阱">
            镜像队列提供高可用性，但性能代价巨大：<strong>吞吐量下降 50-80%，延迟增加 2-5 倍</strong>。如果追求高性能，应权衡可靠性需求。
          </Callout>

          <h2 id="producer-optimization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、生产者优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            生产者是消息的源头，优化生产者能显著提升整体性能。
          </p>

          <Playground
            code={`# 生产者优化最佳实践

# 1. 批量发送（最有效）
# 累积多条消息后一次性发送
# 效果：吞吐量提升 5-10 倍

# 2. 异步发送
# 不等待 Broker 确认，继续发送
# 效果：延迟降低 50-80%

# 3. 连接复用
# 避免频繁创建和销毁连接
# 效果：减少连接开销，提升稳定性

# 4. 消息序列化优化
# JSON → MessagePack → Protobuf
# 性能对比：1 : 2 : 3

# 5. 分区策略
# 合理分配消息到不同分区，避免热点

# 6. 背压控制
# 当 Broker 过载时，生产者应减速`}
            language="python"
            highlights={[4, 8, 12, 16, 20, 24]}
            filename="producer-optimization.py"
            description="生产者优化最佳实践"
          />

          <SideNote label="批量发送的权衡">
            批量发送提升吞吐但增加延迟。<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">linger.ms</code> 设置越大，批量越满，吞吐越高，但延迟也越高。应根据业务需求平衡。
          </SideNote>

          <h2 id="consumer-optimization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、消费者优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            消费者是性能瓶颈的常见位置，优化消费逻辑能显著提升整体吞吐。
          </p>

          <Playground
            code={`# 消费者优化最佳实践

# 1. 批量消费
# 一次性拉取多条消息，批量处理
# 效果：吞吐量提升 3-5 倍

# 2. 并发消费
# 多线程/多进程并行处理
# 注意：确保消费逻辑是线程安全的

# 3. 异步处理
# 将耗时操作异步化，快速 ACK
# 警告：可能导致消息丢失，需谨慎

# 4. 幂等优化
# 快速判断消息是否已处理（Redis 去重）
# 效果：避免重复处理的开销

# 5. 流控与背压
# 防止消费者过载，暂停拉取

# 6. 消费偏移量管理
# 批量提交（性能高）vs 每条提交（可靠性高）`}
            language="python"
            highlights={[4, 8, 12, 16, 20, 24]}
            filename="consumer-optimization.py"
            description="消费者优化最佳实践"
          />

          <Callout type="warning" title="并发消费的风险">
            并发消费提升吞吐但引入复杂性：① <strong>顺序问题</strong>：同一分区的消息可能乱序处理；② <strong>线程安全</strong>：共享资源需要同步；③ <strong>偏移量管理</strong>：部分消息失败时偏移量如何提交。
          </Callout>

          <h2 id="broker-optimization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、Broker 优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Broker 是消息队列的核心，优化 Broker 配置能显著提升整体性能。
          </p>

          <Playground
            code={`# Broker 优化要点

# 1. JVM 调优
-Xms6g -Xmx6g           # 堆内存 6GB
-XX:+UseG1GC            # G1 垃圾收集器
-XX:MaxGCPauseMillis=20 # 最大 GC 停顿 20ms

# 2. 操作系统调优
ulimit -n 100000        # 增加文件描述符限制
vm.swappiness=1         # 减少交换

# 3. 磁盘优化
使用 SSD                # NVMe SSD 性能最好
RAID 10                 # 性能 + 冗余
XFS 文件系统             # noatime,nodiratime

# 4. 分区均衡
确保每个 Broker 的分区数大致相等
避免热点 Broker

# 5. 日志清理
log.cleanup.policy=compact  # 日志压缩
log.retention.hours=168     # 保留 7 天`}
            language="python"
            highlights={[4, 5, 6, 9, 10, 13, 14, 15, 18, 22, 23]}
            filename="broker-optimization.py"
            description="Broker 优化要点"
          />

          <SideNote label="JVM 调优要点">
            Kafka 和 RocketMQ 都是 Java 应用，JVM 调优至关重要：<br/>
            ① <strong>堆大小</strong>：设置为物理内存的 50-70%；<br/>
            ② <strong>GC 策略</strong>：使用 G1 GC，控制停顿时间 &lt; 20ms；<br/>
            ③ <strong>监控 GC</strong>：定期检查 GC 日志。
          </SideNote>

          <h2 id="network-disk" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、网络与磁盘优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            网络和磁盘是消息队列的底层基础设施，直接影响性能上限。
          </p>

          <Playground
            code={`# 网络与磁盘优化

# 网络优化
# 1. 带宽规划：估算所需带宽
# 2. TCP 调优：调整缓冲区和 keepalive
# 3. 中断亲和性：绑定到特定 CPU 核心
# 4. 巨帧（Jumbo Frames）：MTU 从 1500 增加到 9000

# 磁盘优化
# 1. 磁盘类型：NVMe SSD > SATA SSD > HDD
# 2. RAID 配置：RAID 10（推荐）
# 3. 挂载选项：noatime,nodiratime,discard
# 4. I/O 调度器：noop（SSD 推荐）
# 5. 预读设置：增加预读大小

# 硬件选型建议
# - CPU：多核高频，8+ 核心
# - 内存：32-64 GB
# - 磁盘：NVMe SSD
# - 网络：10 Gbps 网卡
# - RAID：RAID 10 或单盘 + MQ 副本`}
            language="python"
            highlights={[4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21]}
            filename="network-disk-optimization.py"
            description="网络与磁盘优化"
          />

          <Callout type="tip" title="硬件选型建议">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>CPU</strong>：多核高频，Kafka 推荐 8+ 核心</li>
              <li><strong>内存</strong>：32-64 GB，预留 50% 给 Page Cache</li>
              <li><strong>磁盘</strong>：NVMe SSD，容量根据保留策略计算</li>
              <li><strong>网络</strong>：10 Gbps 网卡，低延迟交换机</li>
            </ul>
          </Callout>

          <h2 id="monitoring-benchmark" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、监控与基准测试
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            建立完善的监控体系，定期进行基准测试，持续优化性能。
          </p>

          <Playground
            code={`# 性能监控与基准测试

# 关键性能指标
# - 吞吐量：Produce Rate, Consume Rate
# - 延迟：P50/P95/P99 Latency
# - 资源：CPU, Memory, Disk I/O, Network I/O
# - 可靠性：Under Replicated Partitions, Consumer Lag

# 监控工具
# - Prometheus + Grafana
# - Kafka Exporter / RocketMQ Dashboard
# - RabbitMQ Management Plugin

# 基准测试流程
# 1. 建立基线：默认配置运行测试
# 2. 识别瓶颈：找到最慢的环节
# 3. 针对性优化：修改一个参数，重新测试
# 4. 迭代优化：重复直到达到目标
# 5. 压力测试：找到性能拐点

# 性能调优检查清单
# □ 生产者：批量发送、压缩、异步
# □ 消费者：批量消费、并发、流控
# □ Broker：JVM 调优、线程池、日志清理
# □ 网络：带宽、TCP 参数
# □ 磁盘：SSD、RAID、I/O 调度器
# □ 监控：Prometheus + Grafana
# □ 告警：设置合理的阈值`}
            language="python"
            highlights={[4, 5, 6, 7, 10, 11, 12, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 27, 28]}
            filename="monitoring-benchmark.py"
            description="监控与基准测试"
          />

          <SideNote label="持续优化">
            性能优化不是一次性工作，而是<strong>持续过程</strong>。应建立定期性能评估机制（如每季度一次基准测试），及时发现和解决性能退化问题。
          </SideNote>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="danger" title="误区 1：盲目追求高吞吐">
            <p className="mb-2"><strong>错误认知</strong>：认为吞吐量越高越好，不惜一切代价优化吞吐。</p>
            <p><strong>正确理解</strong>：性能优化需要<strong>权衡取舍</strong>。提高吞吐可能增加延迟，降低可靠性。应根据业务需求设定合理目标，而非盲目追求极致性能。</p>
          </Callout>

          <Callout type="danger" title="误区 2：忽略基准测试">
            <p className="mb-2"><strong>错误认知</strong>：认为凭经验调整参数就能优化性能。</p>
            <p><strong>正确理解</strong>：没有测量的优化是盲目的。必须<strong>先建立基线</strong>，然后逐项测试参数变更的效果。</p>
          </Callout>

          <Callout type="danger" title="误区 3：一次性调整多个参数">
            <p className="mb-2"><strong>错误认知</strong>：同时修改多个配置参数，期望性能大幅提升。</p>
            <p><strong>正确理解</strong>：应该<strong>每次只改一个参数</strong>，观察效果后再调整下一个。系统化、渐进式的调优方法更可靠。</p>
          </Callout>

          <Callout type="warning" title="误区 4：忽视硬件限制">
            <p className="mb-2"><strong>错误认知</strong>：认为通过软件调优可以突破硬件瓶颈。</p>
            <p><strong>正确理解</strong>：软件调优只能在<strong>硬件能力范围内</strong>优化。如果磁盘 I/O 已达上限，应先升级硬件，再进行软件调优。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Kafka 为什么吞吐量这么高？",
              answer: "四大核心技术：① 顺序 I/O：日志追加写入，利用磁盘顺序读写性能；② 零拷贝：使用 sendfile 系统调用，避免用户态和内核态切换；③ 页缓存：利用 OS Page Cache，热点数据无需重复读取磁盘；④ 批量发送：减少网络往返次数，提升有效载荷比例。"
            },
            {
              question: "如何优化消息队列的延迟？",
              answer: "① 生产者：减小批量大小和等待时间，使用异步发送；② Broker：使用异步刷盘，减少副本数；③ 消费者：减小预取计数，快速 ACK；④ 网络：降低网络延迟；⑤ 硬件：使用 SSD，增加内存。关键是找到延迟的主要来源，针对性优化。"
            },
            {
              question: "什么是零拷贝？为什么能提升性能？",
              answer: "零拷贝（Zero Copy）是一种避免数据在用户态和内核态之间多次拷贝的技术。传统 I/O 需要 4 次拷贝和 4 次上下文切换，零拷贝（sendfile）只需 2 次拷贝和 2 次上下文切换，减少了 CPU 开销和内存带宽占用。"
            },
            {
              question: "如何排查消息队列性能问题？",
              answer: "系统化排查步骤：① 监控指标：检查吞吐量、延迟、堆积量、资源使用率；② 定位瓶颈：找到最慢的环节；③ 日志分析：查看错误日志、GC 日志；④ 基准测试：模拟真实负载；⑤ 配置审查：检查关键配置参数；⑥ 硬件检查：CPU、内存、磁盘、网络是否正常。"
            },
            {
              question: "批量发送的优缺点是什么？",
              answer: "优点：① 减少网络往返次数，提升吞吐量（5-10 倍）；② 提高压缩率；③ 降低 Broker 负载。缺点：① 增加延迟；② 消息实时性下降；③ 单条消息失败影响整个批量。适用场景：对实时性要求不高、追求高吞吐的场景。"
            },
            {
              question: "如何选择压缩算法？",
              answer: "常见压缩算法对比：① Gzip：压缩率高，但速度慢；② Snappy：速度快，压缩率中等；③ LZ4：速度最快，压缩率中等，推荐用于 Kafka；④ Zstd：压缩率和速度的最佳平衡。选择建议：CPU 敏感选 Snappy/LZ4，带宽敏感选 Gzip/Zstd。"
            },
            {
              question: "消息队列性能调优的最佳实践是什么？",
              answer: "① 先测量后优化：建立基线，量化改进效果；② 瓶颈优先：找到最慢的环节；③ 渐进式优化：每次只改一个参数；④ 权衡取舍：平衡吞吐、延迟、可靠性；⑤ 硬件评估：确保硬件满足需求；⑥ 监控告警：建立完善的监控体系；⑦ 文档记录：记录所有配置变更和效果。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/infra/messaging/message-queue-comparison/mq-selection-guide" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">消息队列选型与对比</div>
              <div className="text-[12px] text-ink-muted mt-1">Kafka、RocketMQ、RabbitMQ</div>
            </a>
            <a href="/docs/infra/messaging/kafka/kafka-performance-tuning" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">深入学习 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">Kafka 性能调优</div>
              <div className="text-[12px] text-ink-muted mt-1">批量发送、零拷贝、页缓存</div>
            </a>
            <a href="/docs/infra/messaging/message-queue-comparison/mq-reliability-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">消息可靠性保障模式</div>
              <div className="text-[12px] text-ink-muted mt-1">ACK、幂等、事务</div>
            </a>
            <a href="/docs/09-ai-engineering/observability-monitoring" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">监控实践 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">全链路监控告警体系</div>
              <div className="text-[12px] text-ink-muted mt-1">Prometheus、Grafana</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            消息队列性能调优是理论与实践结合的技艺，建议通过以下方式深入学习：① 官方文档：阅读各 MQ 的性能调优指南；② 源码分析：研究核心模块的实现；③ 基准测试：搭建测试环境，进行系统性压测；④ 生产实践：参与实际项目的性能优化；⑤ 社区交流：关注技术会议。性能调优没有银弹，只有不断学习和实践。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
