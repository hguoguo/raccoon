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
  { id: 'overview', text: '一、消息可靠性挑战', level: 2 },
  { id: 'producer-reliability', text: '二、生产者可靠性保证', level: 2 },
  { id: 'confirm-mode', text: '2.1 Confirm 确认模式', level: 3 },
  { id: 'transaction-mode', text: '2.2 事务模式', level: 3 },
  { id: 'broker-reliability', text: '三、Broker 可靠性保证', level: 2 },
  { id: 'persistence', text: '3.1 消息持久化', level: 3 },
  { id: 'mirror-queue', text: '3.2 镜像队列', level: 3 },
  { id: 'consumer-reliability', text: '四、消费者可靠性保证', level: 2 },
  { id: 'ack-mechanism', text: '4.1 ACK 确认机制', level: 3 },
  { id: 'retry-dead-letter', text: '4.2 重试与死信队列', level: 3 },
  { id: 'reliability-patterns', text: '五、端到端可靠性方案', level: 2 },
  { id: 'comparison', text: '六、可靠性方案对比', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function RabbitmqReliability({ meta }: { meta: KnowledgeNode }) {
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
              RabbitMQ 消息可靠性通过<strong className="text-accent">生产者 Confirm 确认、Broker 持久化与镜像队列、消费者 ACK 机制</strong>三层保障，确保消息从发送到消费的完整链路中不丢失、不重复，实现<strong className="text-accent">至少一次（At-Least-Once）</strong>或<strong className="text-accent">精确一次（Exactly-Once）</strong>的语义保证。
            </p>
          </blockquote>

          {/* ========== 一、消息可靠性挑战 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、消息可靠性挑战
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            在分布式消息系统中，消息可能在以下环节丢失：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>生产者发送失败</strong>：网络异常、Broker 宕机导致消息未到达</li>
            <li><strong>Broker 存储丢失</strong>：节点故障、磁盘损坏导致已接收的消息丢失</li>
            <li><strong>消费者处理失败</strong>：消费异常、ACK 丢失导致消息未被正确处理</li>
          </ul>

          <DiagramBlock title="消息丢失场景分析">
            {`graph LR
              P["Producer"] -->|"① 发送失败"| N["Network"]
              N -->|"② 到达 Broker"| B["Broker"]
              B -->|"③ 存储失败"| D["Disk"]
              B -->|"④ 推送 Consumer"| C["Consumer"]
              C -->|"⑤ 处理失败"| E["Error"]
              
              style P fill:#e1f5ff
              style B fill:#fff4e6
              style C fill:#f0e6ff
              style D fill:#ffe6e6
              style E fill:#ffe6e6`}
          </DiagramBlock>

          <Callout type="warning" title="可靠性 vs 性能权衡">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              消息可靠性越强，性能开销越大。持久化、Confirm 确认、镜像队列都会增加延迟和降低吞吐。需要根据业务场景选择合适的可靠性级别：<strong>金融交易需要 Exactly-Once，日志收集可以接受 At-Most-Once</strong>。
            </p>
          </Callout>

          {/* ========== 二、生产者可靠性保证 ========== */}
          <h2 id="producer-reliability" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、生产者可靠性保证
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RabbitMQ 提供两种机制确保生产者消息可靠送达 Broker：<strong>Confirm 确认模式</strong>和<strong>事务模式</strong>。
          </p>

          {/* 2.1 Confirm 确认模式 */}
          <h3 id="confirm-mode" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 Confirm 确认模式
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Confirm 模式是 RabbitMQ 推荐的轻量级可靠性方案。生产者发送消息后，Broker 会异步返回 ack（成功）或 nack（失败）确认。
          </p>

          <SideNote label="Confirm 模式特点">
            <ul className="space-y-2 text-[13px] leading-[1.7]">
              <li>✅ 异步非阻塞,性能高</li>
              <li>✅ 支持批量确认</li>
              <li>⚠️ 需要客户端维护未确认消息列表</li>
              <li>⚠️ 不保证精确一次(可能重复)</li>
            </ul>
          </SideNote>

          <Playground 
            code={`// 启用 Confirm 模式
channel.confirmSelect();

// 发送消息
String message = "Hello RabbitMQ";
channel.basicPublish("exchange", "routingKey", 
    MessageProperties.PERSISTENT_TEXT_PLAIN,
    message.getBytes());

// 等待确认(同步方式,生产环境建议异步)
if (channel.waitForConfirms()) {
    System.out.println("消息发送成功");
} else {
    System.out.println("消息发送失败,需要重试");
}

// 异步 Confirm 监听器(推荐)
channel.addConfirmListener(new ConfirmListener() {
    @Override
    public void handleAck(long deliveryTag, boolean multiple) {
        System.out.println("消息确认成功: " + deliveryTag);
        // 从未确认列表中移除
    }

    @Override
    public void handleNack(long deliveryTag, boolean multiple) {
        System.out.println("消息确认失败: " + deliveryTag);
        // 重发消息或记录日志
    }
});`}
            language="java"
            description="Java - Confirm 模式示例"
          />

          <Callout type="info" title="Confirm 模式工作流程">
            <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]">
              <li>生产者调用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">channel.confirmSelect()</code> 启用 Confirm 模式</li>
              <li>每条消息分配唯一的 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">deliveryTag</code>（从 1 开始递增）</li>
              <li>Broker 持久化消息后，返回 ack/nack 确认</li>
              <li>生产者根据确认结果决定是否需要重发</li>
            </ol>
          </Callout>

          {/* 2.2 事务模式 */}
          <h3 id="transaction-mode" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 事务模式
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            事务模式提供强一致性保证，但性能较差（比 Confirm 模式慢 10 倍以上），适用于对可靠性要求极高的场景。
          </p>

          <Playground 
            code={`try {
    // 开启事务
    channel.txSelect();
    
    // 发送消息
    channel.basicPublish("exchange", "routingKey", 
        MessageProperties.PERSISTENT_TEXT_PLAIN,
        "重要消息".getBytes());
    
    // 提交事务
    channel.txCommit();
    System.out.println("消息发送成功");
    
} catch (Exception e) {
    // 回滚事务
    channel.txRollback();
    System.out.println("消息发送失败,已回滚");
    // 重试逻辑
}`}
            language="java"
            description="Java - 事务模式示例"
          />

          <Callout type="warning" title="事务模式性能问题">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              事务模式是同步阻塞的，每条消息都需要等待 Broker 返回确认才能继续发送下一条。在高吞吐场景下会导致严重的性能瓶颈，<strong>推荐使用 Confirm 模式替代</strong>。
            </p>
          </Callout>

          {/* ========== 三、Broker 可靠性保证 ========== */}
          <h2 id="broker-reliability" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Broker 可靠性保证
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Broker 层面的可靠性主要通过<strong>消息持久化</strong>和<strong>镜像队列</strong>实现，防止节点故障导致消息丢失。
          </p>

          {/* 3.1 消息持久化 */}
          <h3 id="persistence" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 消息持久化
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            消息持久化需要将 Exchange、Queue、Message 三者都设置为持久化，缺一不可。
          </p>

          <DiagramBlock title="消息持久化三要素">
            {`graph TB
              subgraph "持久化三要素"
                E["Exchange 持久化<br/>durable=true"]
                Q["Queue 持久化<br/>durable=true"]
                M["Message 持久化<br/>deliveryMode=2"]
              end
              
              E -->|"绑定"| Q
              Q -->|"存储"| M
              M -->|"写入磁盘"| D[("Disk")]
              
              style E fill:#e1f5ff
              style Q fill:#e1f5ff
              style M fill:#fff4e6
              style D fill:#d4edda`}
          </DiagramBlock>

          <Playground 
            code={`// 1. 声明持久化 Exchange
channel.exchangeDeclare("myExchange", "direct", true); // durable=true

// 2. 声明持久化 Queue
Map<String, Object> args = new HashMap<>();
channel.queueDeclare("myQueue", true, false, false, args); // durable=true

// 3. 绑定 Exchange 和 Queue
channel.queueBind("myQueue", "myExchange", "routingKey");

// 4. 发送持久化消息
AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
    .deliveryMode(2) // 2=持久化, 1=非持久化
    .contentType("text/plain")
    .build();
    
channel.basicPublish("myExchange", "routingKey", props, 
    "持久化消息".getBytes());`}
            language="java"
            description="Java - 持久化配置示例"
          />

          <SideNote label="持久化性能影响">
            <p className="text-[13px] leading-[1.7] mb-2">
              持久化会将消息写入磁盘,增加 I/O 开销。RabbitMQ 采用以下优化策略:
            </p>
            <ul className="space-y-1 text-[13px] leading-[1.7]">
              <li>• 批量写入磁盘(减少 I/O 次数)</li>
              <li>• 延迟刷盘(积累一定量后再写入)</li>
              <li>• 使用 Page Cache 缓存热点数据</li>
            </ul>
          </SideNote>

          {/* 3.2 镜像队列 */}
          <h3 id="mirror-queue" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 镜像队列
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            镜像队列（Mirror Queue）将队列复制到集群中的多个节点，当主节点故障时，从节点自动接管，实现高可用。
          </p>

          <DiagramBlock title="镜像队列架构">
            {`graph TB
              subgraph "RabbitMQ Cluster"
                subgraph "Node 1 (Master)"
                  Q1["Queue (Master)"]
                end
                
                subgraph "Node 2 (Slave)"
                  Q2["Queue (Mirror)"]
                end
                
                subgraph "Node 3 (Slave)"
                  Q3["Queue (Mirror)"]
                end
              end
              
              P["Producer"] --> Q1
              Q1 -->|"同步"| Q2
              Q1 -->|"同步"| Q3
              Q1 --> C["Consumer"]
              
              style Q1 fill:#d4edda
              style Q2 fill:#fff4e6
              style Q3 fill:#fff4e6`}
          </DiagramBlock>

          <Playground 
            code={`// 通过策略配置镜像队列(推荐)
Map<String, Object> policy = new HashMap<>();
policy.put("ha-mode", "all"); // all: 所有节点, exactly: 指定数量, nodes: 指定节点
policy.put("ha-sync-mode", "automatic"); // automatic: 自动同步, manual: 手动同步

channel.exchangeDeclare("ha-exchange", "direct", true);
channel.queueDeclare("ha-queue", true, false, false, null);
channel.queueBind("ha-queue", "ha-exchange", "routingKey");

// 应用策略
Map<String, Object> arguments = new HashMap<>();
arguments.put("x-ha-policy", "all");
channel.queueDeclare("ha-queue-v2", true, false, false, arguments);`}
            language="java"
            description="Java - 配置镜像队列"
          />

          <Callout type="info" title="镜像队列注意事项">
            <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]">
              <li>镜像队列会增加网络带宽和存储开销（每个副本都保存完整消息）</li>
              <li>同步模式选择：<strong>automatic</strong> 适合新队列，<strong>manual</strong> 适合已有大量消息的队列</li>
              <li>RabbitMQ 3.8+ 推荐使用 <strong>Quorum Queues</strong>（基于 Raft 共识算法）替代镜像队列</li>
            </ul>
          </Callout>

          {/* ========== 四、消费者可靠性保证 ========== */}
          <h2 id="consumer-reliability" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、消费者可靠性保证
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            消费者可靠性通过 <strong>ACK 确认机制</strong>和<strong>重试/死信队列</strong>保证消息被正确处理。
          </p>

          {/* 4.1 ACK 确认机制 */}
          <h3 id="ack-mechanism" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 ACK 确认机制
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RabbitMQ 支持自动 ACK 和手动 ACK 两种模式。<strong>生产环境必须使用手动 ACK</strong>，确保消息处理成功后才确认。
          </p>

          <Playground 
            code={`// 禁用自动 ACK(autoAck=false)
channel.basicConsume("myQueue", false, new DefaultConsumer(channel) {
    @Override
    public void handleDelivery(String consumerTag, Envelope envelope, 
                                AMQP.BasicProperties properties, byte[] body) {
        try {
            String message = new String(body, "UTF-8");
            System.out.println("收到消息: " + message);
            
            // 处理业务逻辑
            processMessage(message);
            
            // 处理成功,发送 ACK
            channel.basicAck(envelope.getDeliveryTag(), false);
            System.out.println("消息处理成功,已确认");
            
        } catch (Exception e) {
            System.err.println("消息处理失败: " + e.getMessage());
            
            // 处理失败,拒绝消息并重新入队
            // requeue=true: 重新入队, false: 进入死信队列
            channel.basicNack(envelope.getDeliveryTag(), false, true);
        }
    }
});`}
            language="java"
            description="Java - 手动 ACK 示例"
          />

          <ContextSwitcher
            simpleContent={
              <div className="p-4 bg-parchment-light rounded-paper-md">
                <h4 className="font-semibold text-ink mb-2">自动 ACK</h4>
                <pre className="text-[13px] text-ink-muted leading-[1.7] overflow-x-auto">
{`// autoAck=true(不推荐)
channel.basicConsume("queue", true, consumer);

优点:简单,无需手动确认
缺点:消息一旦投递立即删除,处理失败无法恢复
适用场景:对可靠性要求低的场景(如日志收集)`}
                </pre>
              </div>
            }
            hardcoreContent={
              <div className="p-4 bg-parchment-light rounded-paper-md">
                <h4 className="font-semibold text-ink mb-2">手动 ACK</h4>
                <pre className="text-[13px] text-ink-muted leading-[1.7] overflow-x-auto">
{`// autoAck=false(推荐)
channel.basicConsume("queue", false, consumer);
// 处理成功后手动确认
channel.basicAck(deliveryTag, false);

优点:确保消息处理成功后才删除
缺点:需要手动管理 ACK,忘记 ACK 会导致消息堆积
适用场景:金融交易、订单处理等关键业务`}
                </pre>
              </div>
            }
          />

          <Callout type="warning" title="忘记 ACK 的后果">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              如果消费者忘记发送 ACK，消息会一直处于 <strong>Unacked</strong> 状态，不会被重新投递，也不会被删除，导致消息堆积。可以使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">basicReject</code> 或 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">basicNack</code> 明确拒绝消息。
            </p>
          </Callout>

          {/* 4.2 重试与死信队列 */}
          <h3 id="retry-dead-letter" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 重试与死信队列
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当消息处理失败时，可以通过<strong>重试机制</strong>重新处理，超过重试次数后转入<strong>死信队列（DLQ）</strong>进行人工干预。
          </p>

          <DiagramBlock title="死信队列流程">
            {`graph LR
              MQ["主队列"] -->|"处理失败"| R["重试计数器"]
              R -->|"未超限"| MQ
              R -->|"超限"| DLX["死信交换机"]
              DLX --> DLQ["死信队列"]
              DLQ --> Alert["告警/人工处理"]
              
              style MQ fill:#e1f5ff
              style DLX fill:#fff4e6
              style DLQ fill:#ffe6e6
              style Alert fill:#ffe6e6`}
          </DiagramBlock>

          <Playground 
            code={`// 1. 声明死信交换机和死信队列
channel.exchangeDeclare("dlx.exchange", "direct", true);
channel.queueDeclare("dlq.queue", true, false, false, null);
channel.queueBind("dlq.queue", "dlx.exchange", "dl.routingKey");

// 2. 声明主队列,配置死信参数
Map<String, Object> args = new HashMap<>();
args.put("x-dead-letter-exchange", "dlx.exchange"); // 死信交换机
args.put("x-dead-letter-routing-key", "dl.routingKey"); // 死信路由键
args.put("x-message-ttl", 60000); // 消息 TTL(可选)
args.put("x-max-length", 10000); // 队列最大长度(可选)

channel.exchangeDeclare("main.exchange", "direct", true);
channel.queueDeclare("main.queue", true, false, false, args);
channel.queueBind("main.queue", "main.exchange", "routingKey");

// 3. 消费失败时拒绝消息,进入死信队列
channel.basicNack(deliveryTag, false, false); // requeue=false`}
            language="java"
            description="Java - 配置死信队列"
          />

          {/* ========== 五、端到端可靠性方案 ========== */}
          <h2 id="reliability-patterns" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、端到端可靠性方案
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            完整的消息可靠性需要<strong>生产者 + Broker + 消费者</strong>三层协同，结合<strong>幂等性</strong>和<strong>事务补偿</strong>实现最终一致性。
          </p>

          <InteractiveFlow
            title="端到端可靠性保障流程"
            steps={[
              {
                label: "生产者发送",
                description: "启用 Confirm 模式,发送持久化消息\n• channel.confirmSelect()\n• deliveryMode=2\n• 维护未确认消息列表",
                icon: "📤",
              },
              {
                label: "Broker 存储",
                description: "持久化到磁盘,同步到镜像节点\n• Exchange/Queue/Message 持久化\n• 镜像队列同步\n• 返回 ack 确认",
                icon: "💾",
              },
              {
                label: "消费者处理",
                description: "手动 ACK,失败重试或进入死信队列\n• autoAck=false\n• 处理成功 basicAck\n• 处理失败 basicNack\n• 超限进入 DLQ",
                icon: "✅",
              },
              {
                label: "幂等性保证",
                description: "消费者实现幂等处理,防止重复消费\n• 唯一消息 ID\n• 数据库唯一索引\n• Redis 去重\n• 状态机控制",
                icon: "🔄",
              },
            ]}
          />

          <Callout type="info" title="精确一次（Exactly-Once）实现方案">
            <p className="text-[14px] sm:text-[15px] leading-[1.8] mb-3">
              RabbitMQ 本身只提供<strong>至少一次（At-Least-Once）</strong>语义，要实现精确一次需要结合以下方案：
            </p>
            <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]">
              <li><strong>生产者幂等</strong>：使用唯一消息 ID，Broker 去重（需插件支持）</li>
              <li><strong>消费者幂等</strong>：基于业务主键或消息 ID 去重</li>
              <li><strong>事务补偿</strong>：记录消息处理状态，失败时回滚或重试</li>
              <li><strong>本地消息表</strong>：将消息发送与业务操作放在同一事务中</li>
            </ol>
          </Callout>

          {/* ========== 六、可靠性方案对比 ========== */}
          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、可靠性方案对比
          </h2>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-ink">方案</th>
                <th className="text-left p-3 font-semibold text-ink">可靠性</th>
                <th className="text-left p-3 font-semibold text-ink">性能影响</th>
                <th className="text-left p-3 font-semibold text-ink">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-parchment-deep/30">
                <td className="p-3 font-medium text-ink">Confirm 模式</td>
                <td className="p-3 text-ink-muted">高</td>
                <td className="p-3 text-ink-muted">低（异步）</td>
                <td className="p-3 text-ink-muted">通用场景（推荐）</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-deep/30">
                <td className="p-3 font-medium text-ink">事务模式</td>
                <td className="p-3 text-ink-muted">最高</td>
                <td className="p-3 text-ink-muted">极高（同步阻塞）</td>
                <td className="p-3 text-ink-muted">金融交易等极端场景</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-deep/30">
                <td className="p-3 font-medium text-ink">消息持久化</td>
                <td className="p-3 text-ink-muted">高</td>
                <td className="p-3 text-ink-muted">中（磁盘 I/O）</td>
                <td className="p-3 text-ink-muted">关键业务消息</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-deep/30">
                <td className="p-3 font-medium text-ink">镜像队列</td>
                <td className="p-3 text-ink-muted">最高</td>
                <td className="p-3 text-ink-muted">高（网络+存储）</td>
                <td className="p-3 text-ink-muted">高可用要求场景</td>
              </tr>
              <tr className="border-b border-border-light hover:bg-parchment-deep/30">
                <td className="p-3 font-medium text-ink">手动 ACK</td>
                <td className="p-3 text-ink-muted">高</td>
                <td className="p-3 text-ink-muted">无</td>
                <td className="p-3 text-ink-muted">所有生产环境</td>
              </tr>
            </tbody>
          </table>

          {/* ========== 七、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区 1：只设置消息持久化就够了">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>错误认知</strong>：只要设置 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">deliveryMode=2</code> 就能保证消息不丢失。<br/>
              <strong>正确做法</strong>：必须同时设置 Exchange、Queue、Message 三者都持久化，缺一不可。如果 Queue 不是持久化的，Broker 重启后 Queue 会消失，消息也会丢失。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：自动 ACK 更简单所以更好">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>错误认知</strong>：自动 ACK 无需手动管理，代码更简洁。<br/>
              <strong>正确做法</strong>：自动 ACK 在消息投递给消费者后立即删除，如果消费者处理失败，消息无法恢复。<strong>生产环境必须使用手动 ACK</strong>，确保业务逻辑执行成功后再确认。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：Confirm 模式能保证精确一次">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>错误认知</strong>：Confirm 模式返回 ack 后，消息就一定只会被消费一次。<br/>
              <strong>正确做法</strong>：Confirm 模式只保证消息到达 Broker，如果消费者处理失败并重试，可能导致重复消费。<strong>需要在消费者端实现幂等性</strong>（如唯一索引、Redis 去重）。
            </p>
          </Callout>

          <Callout type="danger" title="误区 4：镜像队列越多越好">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              <strong>错误认知</strong>：镜像副本越多，可靠性越高。<br/>
              <strong>正确做法</strong>：镜像队列会显著增加网络带宽和存储开销。通常 2-3 个副本即可满足高可用需求。RabbitMQ 3.8+ 推荐使用 <strong>Quorum Queues</strong>（基于 Raft），性能和可靠性更优。
            </p>
          </Callout>

          {/* ========== 八、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "RabbitMQ 如何保证消息不丢失？",
                answer: `从三个层面保证：
1. 生产者：启用 Confirm 模式或事务模式，确保消息到达 Broker
2. Broker：Exchange、Queue、Message 都设置为持久化，配置镜像队列或 Quorum Queues
3. 消费者：使用手动 ACK，处理成功后再确认；配置死信队列处理失败消息

此外还需要在消费者端实现幂等性，防止重复消费。`,
              },
              {
                question: "Confirm 模式和事务模式有什么区别？如何选择？",
                answer: `区别：
• Confirm 模式：异步非阻塞，性能高，支持批量确认
• 事务模式：同步阻塞，性能差（慢 10 倍以上），强一致性

选择：
• 绝大多数场景使用 Confirm 模式（推荐）
• 仅在极端可靠性要求且吞吐要求低的场景使用事务模式（如金融核心交易）`,
              },
              {
                question: "什么是死信队列？如何使用？",
                answer: `死信队列（DLQ）用于存储无法被正常消费的消息，触发条件：
1. 消息被拒绝（basicReject/basicNack）且 requeue=false
2. 消息过期（TTL）
3. 队列达到最大长度

使用步骤：
1. 声明死信交换机和死信队列
2. 在主队列配置 x-dead-letter-exchange 和 x-dead-letter-routing-key
3. 消费失败时调用 basicNack(deliveryTag, false, false) 进入死信队列
4. 监控死信队列，人工干预或自动重试`,
              },
              {
                question: "如何实现消息的精确一次（Exactly-Once）消费？",
                answer: `RabbitMQ 本身只提供至少一次语义，实现精确一次需要：
1. 生产者幂等：使用唯一消息 ID（可选，需插件支持）
2. 消费者幂等：基于业务主键或消息 ID 去重
   - 数据库唯一索引
   - Redis SETNX 去重
   - 状态机控制（检查消息是否已处理）
3. 事务补偿：记录消息处理状态，失败时回滚
4. 本地消息表：将消息发送与业务操作放在同一事务中

核心思想：允许消息重复投递，但业务处理保证幂等。`,
              },
              {
                question: "镜像队列和 Quorum Queues 有什么区别？",
                answer: `镜像队列（Mirror Queue）：
• 基于主从复制，Master 处理读写，Slave 同步数据
• 同步策略：all/exactly/nodes
• 故障切换需要选举，可能有短暂不可用
• RabbitMQ 3.8 之前的高可用方案

Quorum Queues：
• 基于 Raft 共识算法，多数派写入成功即确认
• 自动故障转移，更强的一致性保证
• 性能优于镜像队列（尤其是写操作）
• RabbitMQ 3.8+ 推荐的高可用方案

建议：新项目优先使用 Quorum Queues。`,
              },
              {
                question: "消费者忘记发送 ACK 会发生什么？如何解决？",
                answer: `后果：
• 消息处于 Unacked 状态，不会重新投递，也不会被删除
• 消费者重启后，消息会重新投递
• 长期不 ACK 会导致消息堆积，占用内存

解决方案：
1. 使用超时机制：设置 prefetchCount 限制未确认消息数量
2. 捕获异常：在 catch 块中调用 basicNack 拒绝消息
3. 监控告警：监控 Unacked 消息数量，超过阈值告警
4. 消费者心跳：配置 heartbeat 检测消费者存活状态`,
              },
            ]}
          />

          {/* ========== 九、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-parchment-deep/40 rounded-paper-md border border-border-light">
              <h4 className="font-semibold text-ink mb-2">🔗 前置知识</h4>
              <ul className="space-y-1 text-[14px] text-ink-muted">
                <li>• <a href="/docs/rabbitmq/rabbitmq-core" className="text-accent hover:underline">RabbitMQ 核心概念</a></li>
                <li>• <a href="/docs/rabbitmq/rabbitmq-routing" className="text-accent hover:underline">RabbitMQ 路由模式</a></li>
              </ul>
            </div>

            <div className="p-4 bg-parchment-deep/40 rounded-paper-md border border-border-light">
              <h4 className="font-semibold text-ink mb-2">🔗 延伸阅读</h4>
              <ul className="space-y-1 text-[14px] text-ink-muted">
                <li>• <a href="/docs/rabbitmq/rabbitmq-cluster" className="text-accent hover:underline">RabbitMQ 集群与高可用</a></li>
                <li>• <a href="/docs/kafka/kafka-reliability" className="text-accent hover:underline">Kafka 消息可靠性保证</a></li>
                <li>• <a href="/docs/rocketmq/rocketmq-transaction" className="text-accent hover:underline">RocketMQ 事务消息</a></li>
              </ul>
            </div>
          </div>

          <Callout type="info" title="设计模式关联">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              消息可靠性涉及多个设计模式：<strong>Message Reliability Pattern</strong>（消息可靠性模式）、<strong>High Availability Pattern</strong>（高可用模式）、<strong>Idempotency Pattern</strong>（幂等性模式）、<strong>Circuit Breaker Pattern</strong>（熔断器模式，用于重试控制）。
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
