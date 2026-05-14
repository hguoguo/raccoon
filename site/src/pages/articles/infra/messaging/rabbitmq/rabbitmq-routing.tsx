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
  { id: 'overview', text: '一、路由模式概览', level: 2 },
  { id: 'direct-mode', text: '二、Direct 直连模式', level: 2 },
  { id: 'direct-scenario', text: '2.1 应用场景', level: 3 },
  { id: 'direct-example', text: '2.2 实战示例', level: 3 },
  { id: 'fanout-mode', text: '三、Fanout 广播模式', level: 2 },
  { id: 'fanout-scenario', text: '3.1 应用场景', level: 3 },
  { id: 'fanout-example', text: '3.2 实战示例', level: 3 },
  { id: 'topic-mode', text: '四、Topic 主题模式', level: 2 },
  { id: 'wildcard-rules', text: '4.1 通配符规则', level: 3 },
  { id: 'topic-scenario', text: '4.2 应用场景', level: 3 },
  { id: 'topic-example', text: '4.3 实战示例', level: 3 },
  { id: 'headers-mode', text: '五、Headers 头部模式', level: 2 },
  { id: 'headers-match', text: '5.1 匹配规则', level: 3 },
  { id: 'headers-example', text: '5.2 实战示例', level: 3 },
  { id: 'comparison', text: '六、四种模式对比', level: 2 },
  { id: 'best-practices', text: '七、最佳实践', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function RabbitmqRouting({ meta }: { meta: KnowledgeNode }) {
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
              RabbitMQ 提供<strong className="text-accent">四种路由模式</strong>（Direct、Fanout、Topic、Headers），通过不同的匹配策略将消息从 Exchange 路由到 Queue，实现点对点、广播、模糊匹配和基于属性的灵活消息分发。
            </p>
          </blockquote>

          {/* ========== 一、路由模式概览 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、路由模式概览
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RabbitMQ 的四种 Exchange 类型对应四种路由模式，每种模式有不同的适用场景：
          </p>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-surface-raised border-b-2 border-border">
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">模式</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">匹配规则</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">特点</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">典型场景</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="p-2 sm:p-3 font-medium text-ink">Direct</td>
                <td className="p-2 sm:p-3 text-ink-muted">精确匹配</td>
                <td className="p-2 sm:p-3 text-ink-muted">Routing Key = Binding Key</td>
                <td className="p-2 sm:p-3 text-ink-muted">点对点、日志级别路由</td>
              </tr>
              <tr>
                <td className="p-2 sm:p-3 font-medium text-ink">Fanout</td>
                <td className="p-2 sm:p-3 text-ink-muted">忽略 Routing Key</td>
                <td className="p-2 sm:p-3 text-ink-muted">广播到所有绑定队列</td>
                <td className="p-2 sm:p-3 text-ink-muted">发布-订阅、事件通知</td>
              </tr>
              <tr>
                <td className="p-2 sm:p-3 font-medium text-ink">Topic</td>
                <td className="p-2 sm:p-3 text-ink-muted">通配符匹配</td>
                <td className="p-2 sm:p-3 text-ink-muted">* 匹配一个词，# 匹配零或多个词</td>
                <td className="p-2 sm:p-3 text-ink-muted">复杂路由、多条件过滤</td>
              </tr>
              <tr>
                <td className="p-2 sm:p-3 font-medium text-ink">Headers</td>
                <td className="p-2 sm:p-3 text-ink-muted">消息头属性匹配</td>
                <td className="p-2 sm:p-3 text-ink-muted">支持 all/any 匹配模式</td>
                <td className="p-2 sm:p-3 text-ink-muted">多维度过滤、优先级路由</td>
              </tr>
            </tbody>
          </table>

          <DiagramBlock title="四种路由模式对比图">
            {`graph TB
              subgraph "Direct - 精确匹配"
                P1["Producer<br/>RK: error"] --> E1["Direct Exchange"]
                E1 -->|"BK: error"| Q1["Queue: error.log"]
                E1 -.->|"BK: info"| Q2["Queue: info.log"]
              end

              subgraph "Fanout - 广播"
                P2["Producer<br/>RK: ignored"] --> E2["Fanout Exchange"]
                E2 --> Q3["Queue: email"]
                E2 --> Q4["Queue: sms"]
                E2 --> Q5["Queue: push"]
              end

              subgraph "Topic - 通配符"
                P3["Producer<br/>RK: order.created"] --> E3["Topic Exchange"]
                E3 -->|"BK: order.*"| Q6["Queue: order.processor"]
                E3 -->|"BK: order.#"| Q7["Queue: order.logger"]
              end

              style E1 fill:#f9f,stroke:#333,stroke-width:2px
              style E2 fill:#ff9,stroke:#333,stroke-width:2px
              style E3 fill:#9cf,stroke:#333,stroke-width:2px`}
          </DiagramBlock>

          {/* ========== 二、Direct 直连模式 ========== */}
          <h2 id="direct-mode" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Direct 直连模式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Direct Exchange 是最简单的路由模式，采用<strong>精确匹配</strong>策略：只有当消息的 Routing Key 与 Binding Key 完全一致时，消息才会被路由到对应的 Queue。
          </p>

          <Callout type="info" title="核心特性">
            <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]">
              <li><strong>一对一映射</strong>：一个 Routing Key 对应一个或多个 Queue</li>
              <li><strong>高性能</strong>：精确匹配算法简单，路由速度快</li>
              <li><strong>确定性</strong>：路由结果可预测，便于调试和维护</li>
            </ul>
          </Callout>

          {/* 2.1 应用场景 */}
          <h3 id="direct-scenario" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 应用场景
          </h3>
          
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>日志级别路由</strong>：根据日志级别（INFO、WARN、ERROR）路由到不同的处理服务</li>
            <li><strong>任务分发</strong>：不同类型的任务（邮件发送、短信通知、数据同步）路由到专门的消费者</li>
            <li><strong>订单状态流转</strong>：订单创建、支付、发货等状态变更路由到对应的处理逻辑</li>
          </ul>

          {/* 2.2 实战示例 */}
          <h3 id="direct-example" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 实战示例
          </h3>

          <DiagramBlock title="日志级别路由示例">
            {`graph LR
              P["Logger<br/>应用"] -->|"RK: info"| E["Direct Exchange<br/>log.exchange"]
              P -->|"RK: warn"| E
              P -->|"RK: error"| E
              
              E -->|"BK: info"| Q1["Queue<br/>info.log"]
              E -->|"BK: warn"| Q2["Queue<br/>warn.log"]
              E -->|"BK: error"| Q3["Queue<br/>error.log"]
              
              Q1 --> C1["Consumer<br/>存储到文件"]
              Q2 --> C2["Consumer<br/>发送告警"]
              Q3 --> C3["Consumer<br/>紧急通知"]
              
              style E fill:#f9f,stroke:#333,stroke-width:3px`}
          </DiagramBlock>

          <Playground 
            language="java"
            filename="DirectExchangeExample.java"
            description="Direct Exchange 日志路由实现"
            code={`// 声明 Direct Exchange
channel.exchangeDeclare("log.exchange", BuiltinExchangeType.DIRECT, true);

// 声明三个队列
channel.queueDeclare("info.log", true, false, false, null);
channel.queueDeclare("warn.log", true, false, false, null);
channel.queueDeclare("error.log", true, false, false, null);

// 绑定队列，Binding Key 为日志级别
channel.queueBind("info.log", "log.exchange", "info");
channel.queueBind("warn.log", "log.exchange", "warn");
channel.queueBind("error.log", "log.exchange", "error");

// Producer 发送不同级别的日志
channel.basicPublish("log.exchange", "error", null, errorMsg.getBytes());
channel.basicPublish("log.exchange", "info", null, infoMsg.getBytes());

// Consumer 只接收特定级别的日志
channel.basicConsume("error.log", false, consumer); // 只消费 ERROR 日志`}
          />

          <SideNote label="多绑定场景">
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              一个 Queue 可以绑定多个 Routing Key。例如，可以将 "warn" 和 "error" 都绑定到同一个告警队列，实现合并处理。
            </p>
          </SideNote>

          {/* ========== 三、Fanout 广播模式 ========== */}
          <h2 id="fanout-mode" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Fanout 广播模式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Fanout Exchange 采用<strong>广播</strong>策略：忽略 Routing Key，将消息复制到所有绑定的 Queue。这是最快的路由模式，因为不需要进行任何匹配计算。
          </p>

          <Callout type="tip" title="性能优势">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              Fanout Exchange 是四种模式中<strong>性能最高</strong>的，因为它不需要解析 Routing Key 或执行匹配算法，直接将消息复制到所有绑定队列。在需要广播的场景下，优先选择 Fanout。
            </p>
          </Callout>

          {/* 3.1 应用场景 */}
          <h3 id="fanout-scenario" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 应用场景
          </h3>
          
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>事件通知</strong>：用户注册成功后，同时发送欢迎邮件、短信、推送通知</li>
            <li><strong>数据同步</strong>：数据库变更后，同步更新缓存、搜索引擎、数据仓库</li>
            <li><strong>审计日志</strong>：关键操作同时记录到多个日志系统（文件、数据库、监控平台）</li>
            <li><strong>发布-订阅</strong>：新闻发布后，推送到 Web、App、小程序等多个终端</li>
          </ul>

          {/* 3.2 实战示例 */}
          <h3 id="fanout-example" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 实战示例
          </h3>

          <DiagramBlock title="用户注册事件广播">
            {`graph LR
              P["User Service<br/>用户注册"] -->|"RK: ignored"| E["Fanout Exchange<br/>user.registered"]
              
              E --> Q1["Queue<br/>email.service"]
              E --> Q2["Queue<br/>sms.service"]
              E --> Q3["Queue<br/>push.service"]
              E --> Q4["Queue<br/>analytics.service"]
              
              Q1 --> C1["Email Worker<br/>发送欢迎邮件"]
              Q2 --> C2["SMS Worker<br/>发送验证短信"]
              Q3 --> C3["Push Worker<br/>发送推送"]
              Q4 --> C4["Analytics<br/>记录统计数据"]
              
              style E fill:#ff9,stroke:#333,stroke-width:3px`}
          </DiagramBlock>

          <Playground 
            language="java"
            filename="FanoutExchangeExample.java"
            description="Fanout Exchange 用户注册广播"
            code={`// 声明 Fanout Exchange
channel.exchangeDeclare("user.registered", BuiltinExchangeType.FANOUT, true);

// 声明多个服务队列
channel.queueDeclare("email.service", true, false, false, null);
channel.queueDeclare("sms.service", true, false, false, null);
channel.queueDeclare("push.service", true, false, false, null);
channel.queueDeclare("analytics.service", true, false, false, null);

// 绑定队列（Routing Key 被忽略，传空字符串即可）
channel.queueBind("email.service", "user.registered", "");
channel.queueBind("sms.service", "user.registered", "");
channel.queueBind("push.service", "user.registered", "");
channel.queueBind("analytics.service", "user.registered", "");

// Producer 发送用户注册事件（Routing Key 任意）
String message = "{\"userId\": 123, \"username\": \"john\"}";
channel.basicPublish("user.registered", "", null, message.getBytes());
// 所有四个队列都会收到这条消息`}
          />

          {/* ========== 四、Topic 主题模式 ========== */}
          <h2 id="topic-mode" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Topic 主题模式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Topic Exchange 是<strong>最灵活</strong>的路由模式，支持通配符匹配。Routing Key 是由点号分隔的单词列表（如 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">order.created.success</code>），Binding Key 可以使用通配符进行模式匹配。
          </p>

          {/* 4.1 通配符规则 */}
          <h3 id="wildcard-rules" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 通配符规则
          </h3>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-surface-raised border-b-2 border-border">
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">通配符</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">含义</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">示例</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="p-2 sm:p-3 font-mono text-accent">*</td>
                <td className="p-2 sm:p-3 text-ink-muted">匹配恰好一个单词</td>
                <td className="p-2 sm:p-3 text-ink-muted"><code className="font-mono text-[12px]">order.*</code> 匹配 <code className="font-mono text-[12px]">order.created</code>，但不匹配 <code className="font-mono text-[12px]">order.created.success</code></td>
              </tr>
              <tr>
                <td className="p-2 sm:p-3 font-mono text-accent">#</td>
                <td className="p-2 sm:p-3 text-ink-muted">匹配零个或多个单词</td>
                <td className="p-2 sm:p-3 text-ink-muted"><code className="font-mono text-[12px]">order.#</code> 匹配 <code className="font-mono text-[12px]">order.created</code>、<code className="font-mono text-[12px]">order.created.success</code> 等</td>
              </tr>
            </tbody>
          </table>

          <Callout type="warning" title="注意事项">
            <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]">
              <li>单词之间必须用点号（<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">.</code>）分隔</li>
              <li>Routing Key 最多 255 个字节</li>
              <li><code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">#</code> 可以匹配零个单词，所以 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">order.#</code> 也能匹配 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">order</code></li>
            </ul>
          </Callout>

          {/* 4.2 应用场景 */}
          <h3 id="topic-scenario" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 应用场景
          </h3>
          
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>多级分类路由</strong>：按地域.业务.操作三级分类路由消息</li>
            <li><strong>灵活订阅</strong>：消费者可以订阅特定类别或整个分类树</li>
            <li><strong>微服务事件总线</strong>：服务名.事件类型.状态的多维度路由</li>
            <li><strong>IoT 设备消息</strong>：设备类型.位置.传感器类型的层次化路由</li>
          </ul>

          {/* 4.3 实战示例 */}
          <h3 id="topic-example" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.3 实战示例
          </h3>

          <DiagramBlock title="电商订单事件路由">
            {`graph LR
              P["Order Service"] -->|"RK: order.created"| E["Topic Exchange<br/>order.events"]
              P -->|"RK: order.paid"| E
              P -->|"RK: order.shipped"| E
              
              E -->|"BK: order.*"| Q1["Queue<br/>order.processor"]
              E -->|"BK: order.#"| Q2["Queue<br/>order.logger"]
              E -->|"BK: *.paid"| Q3["Queue<br/>payment.notifier"]
              E -->|"BK: order.*.success"| Q4["Queue<br/>success.handler"]
              
              style E fill:#9cf,stroke:#333,stroke-width:3px`}
          </DiagramBlock>

          <Playground 
            language="java"
            filename="TopicExchangeExample.java"
            description="Topic Exchange 订单事件路由"
            code={`// 声明 Topic Exchange
channel.exchangeDeclare("order.events", BuiltinExchangeType.TOPIC, true);

// 声明队列
channel.queueDeclare("order.processor", true, false, false, null);
channel.queueDeclare("order.logger", true, false, false, null);
channel.queueDeclare("payment.notifier", true, false, false, null);

// 绑定队列，使用通配符
channel.queueBind("order.processor", "order.events", "order.*");       // 匹配所有订单事件
channel.queueBind("order.logger", "order.events", "order.#");           // 匹配所有订单相关
channel.queueBind("payment.notifier", "order.events", "*.paid");        // 匹配所有支付事件

// Producer 发送不同事件
channel.basicPublish("order.events", "order.created", null, msg1.getBytes());
channel.basicPublish("order.events", "order.paid", null, msg2.getBytes());
channel.basicPublish("order.events", "order.shipped", null, msg3.getBytes());

// 路由结果：
// order.created -> order.processor, order.logger
// order.paid -> order.processor, order.logger, payment.notifier
// order.shipped -> order.processor, order.logger`}
          />

          <SideNote label="通配符组合技巧">
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              可以组合使用多个通配符，如 <code className="font-mono text-[12px]">*.order.*</code> 匹配第二个单词为 "order" 的所有 Routing Key。合理设计 Routing Key 的层次结构，可以实现非常灵活的路由策略。
            </p>
          </SideNote>

          {/* ========== 五、Headers 头部模式 ========== */}
          <h2 id="headers-mode" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Headers 头部模式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Headers Exchange 根据消息的<strong>头部属性</strong>（headers）进行路由，完全忽略 Routing Key。支持两种匹配模式：<strong>全匹配</strong>（all）和<strong>任意匹配</strong>（any）。
          </p>

          {/* 5.1 匹配规则 */}
          <h3 id="headers-match" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 匹配规则
          </h3>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-surface-raised border-b-2 border-border">
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">匹配模式</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">说明</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">示例</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="p-2 sm:p-3 font-medium text-ink">x-match=all</td>
                <td className="p-2 sm:p-3 text-ink-muted">所有 header 都必须匹配</td>
                <td className="p-2 sm:p-3 text-ink-muted">Binding: {`{format: json, priority: high}`}，消息必须有这两个 header</td>
              </tr>
              <tr>
                <td className="p-2 sm:p-3 font-medium text-ink">x-match=any</td>
                <td className="p-2 sm:p-3 text-ink-muted">任意一个 header 匹配即可</td>
                <td className="p-2 sm:p-3 text-ink-muted">Binding: {`{format: json, priority: high}`}，消息有其中一个 header 即可</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="适用场景">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              Headers Exchange 适用于<strong>多维度过滤</strong>场景，如根据消息格式、优先级、来源系统等多个属性进行路由。但由于需要解析和比较多个 header，性能低于其他三种模式。
            </p>
          </Callout>

          {/* 5.2 实战示例 */}
          <h3 id="headers-example" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 实战示例
          </h3>

          <Playground 
            language="java"
            filename="HeadersExchangeExample.java"
            description="Headers Exchange 多维度路由"
            code={`// 声明 Headers Exchange
channel.exchangeDeclare("headers.exchange", BuiltinExchangeType.HEADERS, true);

// 声明队列
channel.queueDeclare("high.priority.json", true, false, false, null);
channel.queueDeclare("any.xml", true, false, false, null);

// 绑定队列：全匹配模式（所有 header 都要匹配）
Map<String, Object> allHeaders = new HashMap<>();
allHeaders.put("x-match", "all");
allHeaders.put("format", "json");
allHeaders.put("priority", "high");
channel.queueBind("high.priority.json", "headers.exchange", "", allHeaders);

// 绑定队列：任意匹配模式（任一 header 匹配即可）
Map<String, Object> anyHeaders = new HashMap<>();
anyHeaders.put("x-match", "any");
anyHeaders.put("format", "xml");
anyHeaders.put("source", "legacy-system");
channel.queueBind("any.xml", "headers.exchange", "", anyHeaders);

// Producer 发送消息，设置 headers
AMQP.BasicProperties props1 = new AMQP.BasicProperties.Builder()
    .headers(Map.of("format", "json", "priority", "high"))
    .build();
channel.basicPublish("headers.exchange", "", props1, message.getBytes());
// 匹配 high.priority.json 队列（全匹配）

AMQP.BasicProperties props2 = new AMQP.BasicProperties.Builder()
    .headers(Map.of("format", "xml", "version", "1.0"))
    .build();
channel.basicPublish("headers.exchange", "", props2, message.getBytes());
// 匹配 any.xml 队列（任意匹配，format=xml 命中）`}
          />

          {/* ========== 六、四种模式对比 ========== */}
          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、四种模式对比
          </h2>

          <table className="w-full border-collapse text-[13px] sm:text-[14px] mb-6">
            <thead>
              <tr className="bg-surface-raised border-b-2 border-border">
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">维度</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">Direct</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">Fanout</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">Topic</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-ink">Headers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="p-2 sm:p-3 font-medium text-ink">匹配方式</td>
                <td className="p-2 sm:p-3 text-ink-muted">精确匹配</td>
                <td className="p-2 sm:p-3 text-ink-muted">无匹配（广播）</td>
                <td className="p-2 sm:p-3 text-ink-muted">通配符匹配</td>
                <td className="p-2 sm:p-3 text-ink-muted">Header 属性匹配</td>
              </tr>
              <tr>
                <td className="p-2 sm:p-3 font-medium text-ink">性能</td>
                <td className="p-2 sm:p-3 text-ink-muted">⭐⭐⭐⭐</td>
                <td className="p-2 sm:p-3 text-ink-muted">⭐⭐⭐⭐⭐</td>
                <td className="p-2 sm:p-3 text-ink-muted">⭐⭐⭐</td>
                <td className="p-2 sm:p-3 text-ink-muted">⭐⭐</td>
              </tr>
              <tr>
                <td className="p-2 sm:p-3 font-medium text-ink">灵活性</td>
                <td className="p-2 sm:p-3 text-ink-muted">⭐⭐</td>
                <td className="p-2 sm:p-3 text-ink-muted">⭐</td>
                <td className="p-2 sm:p-3 text-ink-muted">⭐⭐⭐⭐⭐</td>
                <td className="p-2 sm:p-3 text-ink-muted">⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td className="p-2 sm:p-3 font-medium text-ink">复杂度</td>
                <td className="p-2 sm:p-3 text-ink-muted">低</td>
                <td className="p-2 sm:p-3 text-ink-muted">最低</td>
                <td className="p-2 sm:p-3 text-ink-muted">中</td>
                <td className="p-2 sm:p-3 text-ink-muted">高</td>
              </tr>
              <tr>
                <td className="p-2 sm:p-3 font-medium text-ink">使用频率</td>
                <td className="p-2 sm:p-3 text-ink-muted">高</td>
                <td className="p-2 sm:p-3 text-ink-muted">中</td>
                <td className="p-2 sm:p-3 text-ink-muted">最高</td>
                <td className="p-2 sm:p-3 text-ink-muted">低</td>
              </tr>
            </tbody>
          </table>

          <Callout type="tip" title="选型建议">
            <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8]">
              <li><strong>简单点对点</strong> → Direct</li>
              <li><strong>广播通知</strong> → Fanout</li>
              <li><strong>复杂路由</strong> → Topic（最常用）</li>
              <li><strong>多维度过滤</strong> → Headers</li>
            </ul>
          </Callout>

          {/* ========== 七、最佳实践 ========== */}
          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、最佳实践
          </h2>

          <div className="space-y-4 mb-6">
            <Callout type="tip" title="1. 合理设计 Routing Key">
              <p className="text-[14px] sm:text-[15px] leading-[1.8]">
                使用有意义的层次结构，如 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">服务名.事件类型.状态</code>。避免过长的 Routing Key（建议不超过 3-4 层），保持简洁清晰。
              </p>
            </Callout>

            <Callout type="tip" title="2. 优先使用 Topic Exchange">
              <p className="text-[14px] sm:text-[15px] leading-[1.8]">
                Topic Exchange 兼具灵活性和性能，可以满足大部分场景。即使当前只需要精确匹配，也可以使用 Topic（将 Binding Key 设置为完整的 Routing Key），为未来扩展留有余地。
              </p>
            </Callout>

            <Callout type="tip" title="3. 避免过度使用 Headers Exchange">
              <p className="text-[14px] sm:text-[15px] leading-[1.8]">
                Headers Exchange 性能较低，且配置复杂。除非确实需要基于多个属性进行路由，否则优先使用 Topic Exchange。可以通过在 Routing Key 中编码多个维度来替代 Headers。
              </p>
            </Callout>

            <Callout type="tip" title="4. 使用备用交换机（Alternate Exchange）">
              <p className="text-[14px] sm:text-[15px] leading-[1.8]">
                为主 Exchange 配置备用交换机，捕获未路由的消息，避免消息丢失。这对于调试和生产环境的容错非常重要。
              </p>
            </Callout>
          </div>

          <Playground 
            language="java"
            filename="AlternateExchange.java"
            description="配置备用交换机"
            code={`// 声明备用 Exchange（通常是 Fanout）
channel.exchangeDeclare("ae.exchange", BuiltinExchangeType.FANOUT, true);
channel.queueDeclare("unrouted.queue", true, false, false, null);
channel.queueBind("unrouted.queue", "ae.exchange", "");

// 声明主 Exchange，指定备用交换机
Map<String, Object> args = new HashMap<>();
args.put("alternate-exchange", "ae.exchange");
channel.exchangeDeclare("main.exchange", BuiltinExchangeType.DIRECT, true, false, args);

// 正常绑定
channel.queueBind("normal.queue", "main.exchange", "normal");

// 发送无法路由的消息
channel.basicPublish("main.exchange", "unknown.key", null, message.getBytes());
// 消息会被路由到 ae.exchange，最终进入 unrouted.queue`}
          />

          {/* ========== 八、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <div className="space-y-4 mb-6">
            <Callout type="danger" title="误区 1：Topic Exchange 的 # 可以匹配任意字符">
              <p className="text-[14px] sm:text-[15px] leading-[1.8]">
                <strong>错误认知</strong>：认为 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">#</code> 可以匹配包含点号的任意字符串。<br/>
                <strong>正确理解</strong>：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">#</code> 只能匹配零个或多个<strong>单词</strong>，单词之间必须用点号分隔。例如 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">order.#</code> 匹配 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">order.created</code>，但不匹配 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">orders.created</code>。
              </p>
            </Callout>

            <Callout type="danger" title="误区 2：Fanout Exchange 不需要绑定队列">
              <p className="text-[14px] sm:text-[15px] leading-[1.8]">
                <strong>错误认知</strong>：认为声明了 Fanout Exchange 就可以直接发送消息。<br/>
                <strong>正确理解</strong>：Fanout Exchange 仍然需要通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">queueBind</code> 绑定队列，否则消息会被丢弃。绑定时的 Routing Key 参数可以传空字符串，但不能省略。
              </p>
            </Callout>

            <Callout type="danger" title="误区 3：一个消息只能路由到一个队列">
              <p className="text-[14px] sm:text-[15px] leading-[1.8]">
                <strong>错误认知</strong>：认为一条消息只能被一个 Queue 接收。<br/>
                <strong>正确理解</strong>：如果多个 Queue 的 Binding Key 都匹配消息的 Routing Key，消息会被<strong>复制</strong>到所有匹配的 Queue。例如，Topic Exchange 中 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">order.*</code> 和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">order.#</code> 都可能匹配同一条消息。
              </p>
            </Callout>
          </div>

          {/* ========== 九、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "RabbitMQ 的四种 Exchange 类型有什么区别？如何选择？",
              answer: "**Direct**：精确匹配，适用于点对点、日志级别路由等简单场景。\n\n**Fanout**：广播模式，忽略 Routing Key，适用于事件通知、数据同步等发布-订阅场景。性能最高。\n\n**Topic**：通配符匹配，支持 * 和 #，适用于复杂路由、多级分类。最灵活，使用最广泛。\n\n**Headers**：基于消息头属性匹配，支持 all/any 模式，适用于多维度过滤。性能最低，使用较少。\n\n**选择建议**：优先使用 Topic，简单场景用 Direct，广播用 Fanout，特殊需求用 Headers。"
            },
            {
              question: "Topic Exchange 中 * 和 # 的区别是什么？",
              answer: "**\\***（星号）：匹配恰好一个单词。例如 `order.*` 匹配 `order.created`，但不匹配 `order.created.success`。\n\n**#**（井号）：匹配零个或多个单词。例如 `order.#` 匹配 `order`、`order.created`、`order.created.success` 等所有以 `order.` 开头的 Routing Key。\n\n**注意**：单词之间必须用点号分隔，`#` 可以匹配零个单词，所以 `order.#` 也能匹配 `order`。"
            },
            {
              question: "如何实现消息的优先级路由？",
              answer: "有两种方式：\n\n1. **使用 Topic Exchange**：在 Routing Key 中包含优先级信息，如 `order.high.created`、`order.low.created`，然后分别绑定到不同队列。\n\n2. **使用 Headers Exchange**：设置消息 header `priority: high`，绑定时使用 `x-match=all` 和 `priority: high` 进行匹配。\n\n推荐使用 Topic Exchange，性能更好且更灵活。"
            },
            {
              question: "如果消息无法路由到任何队列，会发生什么？",
              answer: "默认情况下，消息会被<strong>丢弃</strong>。可以通过以下方式避免：\n\n1. **备用交换机（Alternate Exchange）**：在主 Exchange 声明时指定 `alternate-exchange` 参数，未路由的消息会被转发到备用 Exchange。\n\n2. **mandatory 标志**：发送消息时设置 `mandatory=true`，如果消息无法路由，Broker 会返回 `basic.return` 给 Producer。\n\n3. **监听 Unroutable 消息**：在 Producer 端添加 `ReturnListener`，处理无法路由的消息。\n\n生产环境强烈建议配置备用交换机。"
            },
            {
              question: "Fanout Exchange 的性能为什么最高？",
              answer: "Fanout Exchange 不需要进行任何匹配计算，它直接将消息<strong>复制</strong>到所有绑定的队列。相比之下：\n\n- Direct 需要字符串比较\n- Topic 需要通配符匹配算法\n- Headers 需要遍历和比较多个 header 属性\n\nFanout 的路由时间复杂度是 O(1)（仅取决于绑定队列数量），而其他模式需要额外的匹配计算。因此在需要广播的场景下，Fanout 是最佳选择。"
            }
          ]} />

          {/* ========== 十、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <a href="/docs/rabbitmq/rabbitmq-core" className="block p-4 bg-surface-raised hover:bg-surface-hover rounded-paper-md transition-colors border border-border-light">
              <h4 className="font-semibold text-ink mb-2">← RabbitMQ 核心概念</h4>
              <p className="text-[13px] sm:text-[14px] text-ink-muted">回顾 Exchange、Queue、Binding 等基础概念</p>
            </a>
            <a href="/docs/rabbitmq/rabbitmq-reliability" className="block p-4 bg-surface-raised hover:bg-surface-hover rounded-paper-md transition-colors border border-border-light">
              <h4 className="font-semibold text-ink mb-2">→ RabbitMQ 消息可靠性</h4>
              <p className="text-[13px] sm:text-[14px] text-ink-muted">掌握持久化、ACK 机制、镜像队列等可靠性保障方案</p>
            </a>
            <a href="/docs/rabbitmq/rabbitmq-cluster" className="block p-4 bg-surface-raised hover:bg-surface-hover rounded-paper-md transition-colors border border-border-light">
              <h4 className="font-semibold text-ink mb-2">→ RabbitMQ 集群与高可用</h4>
              <p className="text-[13px] sm:text-[14px] text-ink-muted">了解集群部署、负载均衡、故障转移等高可用方案</p>
            </a>
            <a href="/docs/kafka/kafka-architecture" className="block p-4 bg-surface-raised hover:bg-surface-hover rounded-paper-md transition-colors border border-border-light">
              <h4 className="font-semibold text-ink mb-2">→ Kafka 架构与核心概念</h4>
              <p className="text-[13px] sm:text-[14px] text-ink-muted">对比学习 Kafka 的 Topic 和 Partition 模型</p>
            </a>
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
