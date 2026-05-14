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
  { id: 'overview', text: '一、高级特性概览', level: 2 },
  { id: 'ordered-message', text: '二、顺序消息', level: 2 },
  { id: 'ordered-send', text: '2.1 发送顺序性', level: 3 },
  { id: 'ordered-consume', text: '2.2 消费顺序性', level: 3 },
  { id: 'delayed-message', text: '三、延迟消息', level: 2 },
  { id: 'delay-levels', text: '3.1 延迟级别', level: 3 },
  { id: 'delay-impl', text: '3.2 实现原理', level: 3 },
  { id: 'batch-message', text: '四、批量消息', level: 2 },
  { id: 'batch-limit', text: '4.1 批量限制', level: 3 },
  { id: 'batch-optimization', text: '4.2 批量优化', level: 3 },
  { id: 'message-filter', text: '五、消息过滤', level: 2 },
  { id: 'tag-filter', text: '5.1 Tag 过滤', level: 3 },
  { id: 'sql-filter', text: '5.2 SQL 过滤', level: 3 },
  { id: 'retry-mechanism', text: '六、重试机制', level: 2 },
  { id: 'retry-strategy', text: '6.1 重试策略', level: 3 },
  { id: 'dlq', text: '6.2 死信队列', level: 3 },
  { id: 'best-practices', text: '七、最佳实践', level: 2 },
  { id: 'performance', text: '7.1 性能优化', level: 3 },
  { id: 'troubleshooting', text: '7.2 故障排查', level: 3 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function RocketmqAdvanced({ meta }: { meta: KnowledgeNode }) {
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
              RocketMQ 高级特性是指在基础消息传递功能之上，提供的一系列企业级功能，包括<strong className="text-accent">顺序消息</strong>、<strong className="text-accent">延迟消息</strong>、<strong className="text-accent">批量消息</strong>、<strong className="text-accent">消息过滤</strong>和<strong className="text-accent">重试机制</strong>等，满足复杂业务场景下的多样化需求。
            </p>
          </blockquote>

          {/* ========== 一、高级特性概览 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、高级特性概览
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 除了基础的消息发布订阅功能外，还提供了多种高级特性来满足企业级应用的需求：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-surface border border-border-light rounded-paper-sm p-4">
              <h3 className="font-semibold text-ink mb-2">顺序消息</h3>
              <p className="text-[13px] sm:text-[14px] text-ink-muted">保证消息在发送和消费时的严格顺序性</p>
            </div>
            <div className="bg-surface border border-border-light rounded-paper-sm p-4">
              <h3 className="font-semibold text-ink mb-2">延迟消息</h3>
              <p className="text-[13px] sm:text-[14px] text-ink-muted">支持在指定延迟时间后投递消息</p>
            </div>
            <div className="bg-surface border border-border-light rounded-paper-sm p-4">
              <h3 className="font-semibold text-ink mb-2">批量消息</h3>
              <p className="text-[13px] sm:text-[14px] text-ink-muted">批量发送消息以提升吞吐量</p>
            </div>
            <div className="bg-surface border border-border-light rounded-paper-sm p-4">
              <h3 className="font-semibold text-ink mb-2">消息过滤</h3>
              <p className="text-[13px] sm:text-[14px] text-ink-muted">支持按标签和 SQL 表达式过滤消息</p>
            </div>
          </div>

          <Callout type="info" title="企业级特性的重要性">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              这些高级特性使得 RocketMQ 不仅仅是一个简单的消息中间件，而是能够应对复杂业务场景的企业级解决方案。在电商、金融等对消息可靠性、顺序性有严格要求的场景中，这些特性发挥着重要作用。
            </p>
          </Callout>

          {/* ========== 二、顺序消息 ========== */}
          <h2 id="ordered-message" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、顺序消息
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            顺序消息是指消息的生产和消费按照一定的顺序来执行。RocketMQ 可以严格保证消息的顺序性，分为全局顺序和分区顺序两种模式。
          </p>

          <h3 id="ordered-send" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 发送顺序性
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            发送顺序性是指生产者发送的消息必须按照发送的先后顺序到达 Broker。RocketMQ 通过以下机制保证发送顺序性：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>选择固定队列</strong>：通过 MessageQueueSelector 指定消息发送到特定队列</li>
            <li><strong>串行发送</strong>：对需要保持顺序的消息，串行发送到同一个队列</li>
            <li><strong>队列独占</strong>：同一业务标识的消息发送到同一个队列，避免跨队列乱序</li>
          </ul>

          <DiagramBlock title="顺序消息发送流程">
            {`graph TD
              A[Producer] --> B[选择Queue<br/>根据Key或Hash]
              B --> C[Queue 0]
              B --> D[Queue 1]
              B --> E[Queue 2]
              C --> F[Broker]
              D --> F
              E --> F
              
              subgraph "顺序保证"
                G[Order-1] --> H[Order-2] --> I[Order-3]
              end
              
              G --> C
              H --> C
              I --> C`}
          </DiagramBlock>

          <h3 id="ordered-consume" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 消费顺序性
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            消费顺序性是指消费者消费消息时，严格按照消息发送的顺序进行处理。RocketMQ 通过以下方式保证消费顺序性：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>队列锁定</strong>：Consumer 在消费某个队列的消息时，会锁定该队列防止并发</li>
            <li><strong>单线程消费</strong>：同一队列的消息使用单线程顺序消费</li>
            <li><strong>消费位点管理</strong>：只有当前消息消费成功后，才提交下一个消息的消费位点</li>
          </ul>

          <SideNote label="性能考虑">
            <p className="text-[13px] leading-[1.7]">
              顺序消息虽然保证了严格的顺序性，但也牺牲了部分并发性能。因为同一队列只能被一个线程消费，所以顺序消息的吞吐量通常低于普通消息。
            </p>
          </SideNote>

          {/* ========== 三、延迟消息 ========== */}
          <h2 id="delayed-message" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、延迟消息
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            延迟消息是指消息发送后，并不立即投递给消费者，而是等待一段时间后才投递。RocketMQ 支持预设的延迟级别，不支持任意时间的延迟。
          </p>

          <h3 id="delay-levels" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 延迟级别
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 预设了 18 个延迟级别，可以通过修改 broker 配置文件设置：
          </p>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold text-ink">级别</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold text-ink">延迟时间</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold text-ink">典型场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-medium text-ink">1</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">1s</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">超时检测</td>
              </tr>
              <tr className="bg-surface">
                <td className="border border-border-light px-3 py-2 font-medium text-ink">2</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">5s</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">重试间隔</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-medium text-ink">3</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">10s</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">短时延时</td>
              </tr>
              <tr className="bg-surface">
                <td className="border border-border-light px-3 py-2 font-medium text-ink">4</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">30s</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">稍长延时</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-medium text-ink">5</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">1m</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">分钟级延时</td>
              </tr>
              <tr className="bg-surface">
                <td className="border border-border-light px-3 py-2 font-medium text-ink">6</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">2m</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">订单超时</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-medium text-ink">7</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">3m</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">...</td>
              </tr>
              <tr className="bg-surface">
                <td className="border border-border-light px-3 py-2 font-medium text-ink">18</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">2h</td>
                <td className="border border-border-light px-3 py-2 text-ink-muted">最长延时</td>
              </tr>
            </tbody>
          </table>

          <h3 id="delay-impl" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 实现原理
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            延迟消息的实现原理如下：
          </p>

          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>存储临时主题</strong>：发送延迟消息时，Broker 将消息存储到特殊的延迟主题 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">SCHEDULE_TOPIC_XXXX</code></li>
            <li><strong>定时调度</strong>：Broker 内部有一个定时任务，定期检查延迟消息是否到期</li>
            <li><strong>转移消息</strong>：到期的延迟消息从临时主题转移到原目标主题</li>
            <li><strong>正常投递</strong>：转移后的消息按普通消息流程投递给消费者</li>
          </ol>

          <Callout type="warning" title="延迟时间精度">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              延迟消息的实际投递时间可能会比设定的延迟时间稍晚几秒，这是因为延迟消息的调度是以固定频率进行的，存在一定的延迟误差。
            </p>
          </Callout>

          {/* ========== 四、批量消息 ========== */}
          <h2 id="batch-message" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、批量消息
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            批量消息是指将多条消息合并成一个批次进行发送，可以显著提升消息发送的吞吐量，减少网络开销。
          </p>

          <h3 id="batch-limit" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 批量限制
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            批量消息有一些限制需要注意：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>大小限制</strong>：批量消息总大小不能超过 4MB（可通过配置调整）</li>
            <li><strong>队列限制</strong>：批量消息必须发送到同一个 Topic 的同一个 Queue</li>
            <li><strong>顺序限制</strong>：批量消息内部保持发送顺序，但不能跨越不同队列</li>
            <li><strong>事务限制</strong>：批量消息不支持事务消息</li>
          </ul>

          <h3 id="batch-optimization" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 批量优化
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            批量消息的优化策略：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>合理分批</strong>：根据消息大小和网络情况确定合适的批量大小</li>
            <li><strong>异步发送</strong>：使用异步发送方式进一步提升性能</li>
            <li><strong>批量积攒</strong>：在生产者端积攒一定数量的消息后再批量发送</li>
            <li><strong>压缩优化</strong>：启用消息压缩减少网络传输量</li>
          </ul>

          {/* ========== 五、消息过滤 ========== */}
          <h2 id="message-filter" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、消息过滤
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            消息过滤允许消费者只订阅感兴趣的消息子集，减少不必要的网络传输和消费处理，提高系统效率。
          </p>

          <h3 id="tag-filter" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 Tag 过滤
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Tag 过滤是最常用的消息过滤方式，通过在发送消息时设置 Tag，消费者可以按 Tag 订阅特定消息。
          </p>

          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-[12px] mb-4 overflow-x-auto">
            {`// 发送带Tag的消息
Message message = new Message("TopicTest", "TagA", "OrderID188", "Hello Tags".getBytes(RemotingHelper.DEFAULT_CHARSET));

// 消费者按Tag订阅
consumer.subscribe("TopicTest", "TagA || TagB"); // 订阅TagA或TagB的消息
consumer.subscribe("TopicTest", "*"); // 订阅所有Tag的消息`}
          </pre>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>服务端过滤</strong>：Tag 过滤在 Broker 端完成，不匹配的消息不会传输给消费者</li>
            <li><strong>高效匹配</strong>：基于 Tag 的快速匹配算法</li>
            <li><strong>灵活组合</strong>：支持使用 "||" 操作符组合多个 Tag</li>
            <li><strong>通配符</strong>："*" 表示订阅所有 Tag 的消息</li>
          </ul>

          <h3 id="sql-filter" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 SQL 过滤
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            SQL 过滤是基于消息属性进行过滤的高级功能，支持使用 SQL92 语法进行复杂的过滤条件设置。
          </p>

          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-[12px] mb-4 overflow-x-auto">
            {`// 发送带属性的消息
Message msg = new Message("TopicTest", "Hello Tags".getBytes());
msg.putUserProperty("Sequence", "100");
msg.putUserProperty("Customer", "Bob");

// 消费者使用SQL过滤
consumer.subscribe("TopicTest", MessageSelector.bySql("Sequence BETWEEN 0 AND 3"));`}
          </pre>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>表达式过滤</strong>：支持算术运算、比较运算、逻辑运算等</li>
            <li><strong>属性丰富</strong>：可以基于任意用户属性进行过滤</li>
            <li><strong>性能考虑</strong>：SQL 过滤会消耗更多 Broker 资源</li>
            <li><strong>兼容性</strong>：需要 Broker 开启 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">enablePropertyFilter=true</code></li>
          </ul>

          {/* ========== 六、重试机制 ========== */}
          <h2 id="retry-mechanism" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、重试机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            重试机制是 RocketMQ 保证消息可靠消费的重要特性，当消费者消费消息失败时，RocketMQ 会自动进行重试。
          </p>

          <h3 id="retry-strategy" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.1 重试策略
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 的重试策略如下：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>次数限制</strong>：顺序消息最多重试 16 次，无序消息最多重试 16 次（可配置）</li>
            <li><strong>间隔增长</strong>：重试间隔呈指数增长（1s、5s、10s...2h）</li>
            <li><strong>并行重试</strong>：对于无序消息，可以在不同实例间并行重试</li>
            <li><strong>顺序重试</strong>：对于顺序消息，按顺序进行重试</li>
          </ul>

          <DiagramBlock title="重试机制流程">
            {`graph TD
              A[消费失败] --> B{重试次数<16?}
              B -->|是| C[延迟重试]
              C --> D[重新投递]
              D --> E[再次消费]
              E --> F{成功?}
              F -->|否| B
              F -->|是| G[消费成功]
              B -->|否| H[进入死信队列]
              
              style G fill:#e8f5e8,stroke:#4caf50
              style H fill:#ffebee,stroke:#f44336`}
          </DiagramBlock>

          <h3 id="dlq" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.2 死信队列
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当消息重试达到最大次数仍未成功消费时，消息会被投递到死信队列（DLQ，Dead Letter Queue）。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>自动转移</strong>：超过重试次数的消息自动转移到死信队列</li>
            <li><strong>特殊主题</strong>：死信消息存储在特殊主题中，格式为 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">%DLQ%ConsumerGroup</code></li>
            <li><strong>人工处理</strong>：需要专门的消费者或管理员处理死信消息</li>
            <li><strong>监控告警</strong>：建议对死信队列设置监控告警</li>
          </ul>

          <Callout type="tip" title="重试最佳实践">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              1. 消费端应做好幂等处理，防止重试导致重复消费；2. 对于业务异常（如库存不足），应直接返回 CONSUME_SUCCESS 而不是 CONSUME_LATER；3. 设置合理的重试间隔，避免无效重试占用资源。
            </p>
          </Callout>

          {/* ========== 七、最佳实践 ========== */}
          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、最佳实践
          </h2>

          <h3 id="performance" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            7.1 性能优化
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 性能优化的关键点：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>批量发送</strong>：使用批量 API 提高发送吞吐量</li>
            <li><strong>异步发送</strong>：对实时性要求不高的场景使用异步发送</li>
            <li><strong>压缩传输</strong>：启用消息压缩减少网络开销</li>
            <li><strong>合理分区</strong>：根据并发度合理设置 Topic 分区数</li>
            <li><strong>过滤前置</strong>：使用服务端过滤减少不必要的网络传输</li>
          </ul>

          <h3 id="troubleshooting" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            7.2 故障排查
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            常见问题及解决方案：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>消息堆积</strong>：增加消费者实例或优化消费逻辑</li>
            <li><strong>重复消费</strong>：确保消费端幂等性处理</li>
            <li><strong>顺序性破坏</strong>：检查队列分配和消费逻辑</li>
            <li><strong>延迟增大</strong>：检查网络状况和 Broker 性能</li>
            <li><strong>连接失败</strong>：检查网络连通性和防火墙设置</li>
          </ul>

          {/* ========== 八、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <div className="space-y-4 mb-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-red-700">误区 1：</strong>批量消息可以无限大
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">正解：</strong>批量消息总大小不能超过 4MB，否则会发送失败。需要根据实际消息大小合理分批。
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-red-700">误区 2：</strong>延迟消息可以设置任意时间
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">正解：</strong>RocketMQ 只支持预设的 18 个延迟级别，不支持任意时间的延迟。如需更灵活的延迟，需结合业务逻辑实现。
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-red-700">误区 3：</strong>顺序消息不会影响性能
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">正解：</strong>顺序消息会牺牲并发性能，因为同一队列只能由单线程消费。在对性能要求极高的场景下需谨慎使用。
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-red-700">误区 4：</strong>重试可以解决所有消费失败问题
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">正解：</strong>重试只适用于临时性故障，对于永久性业务错误（如账户余额不足），重试无意义，应直接处理或进入死信队列。
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
                question: 'RocketMQ 如何保证顺序消息的顺序性？',
                answer: 'RocketMQ 通过两方面保证顺序性：1) 发送端：通过 MessageQueueSelector 将同一业务标识的消息发送到同一个队列；2) 消费端：Consumer 在消费某个队列时会锁定该队列，使用单线程顺序消费，只有当前消息消费成功后才消费下一条。'
              },
              {
                question: 'RocketMQ 延迟消息的实现原理是什么？',
                answer: '延迟消息的实现原理：1) 发送时：消息被存储到特殊主题 SCHEDULE_TOPIC_XXXX；2) 调度：Broker 内部定时任务检查消息是否到期；3) 转移：到期消息从临时主题转移到原目标主题；4) 投递：按普通消息流程投递给消费者。'
              },
              {
                question: '批量消息有哪些限制？',
                answer: '批量消息的主要限制：1) 大小限制：总大小不超过 4MB；2) 队列限制：必须发送到同一 Topic 的同一 Queue；3) 顺序限制：不能跨越不同队列；4) 事务限制：不支持事务消息。'
              },
              {
                question: 'RocketMQ 的重试机制是怎样的？',
                answer: '重试机制包括：1) 次数限制：最多重试 16 次；2) 时间间隔：呈指数增长（1s、5s、10s...2h）；3) 死信队列：超过重试次数的消息进入 %DLQ%ConsumerGroup 主题；4) 幂等处理：消费端需保证幂等性。'
              },
              {
                question: '如何优化 RocketMQ 的性能？',
                answer: '性能优化方法：1) 批量发送：使用批量 API 提高吞吐量；2) 异步发送：降低 RT；3) 消息压缩：减少网络开销；4) 合理分区：根据并发度设置 Topic 分区数；5) 服务端过滤：减少不必要的网络传输；6) 连接复用：减少连接建立开销。'
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
              <p className="text-[13px] text-ink-muted">了解分布式事务的实现机制，以及半消息和回查的原理</p>
            </div>
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light hover:border-accent transition-colors">
              <h4 className="font-semibold text-ink mb-2">📌 RocketMQ 架构设计</h4>
              <p className="text-[13px] text-ink-muted">深入理解 RocketMQ 的整体架构，为高级特性提供基础</p>
            </div>
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light hover:border-accent transition-colors">
              <h4 className="font-semibold text-ink mb-2">📌 消息中间件选型</h4>
              <p className="text-[13px] text-ink-muted">对比不同消息中间件的高级特性，选择最适合的技术方案</p>
            </div>
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light hover:border-accent transition-colors">
              <h4 className="font-semibold text-ink mb-2">📌 分布式系统设计</h4>
              <p className="text-[13px] text-ink-muted">理解分布式系统中的消息传递、一致性等问题</p>
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