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
  { id: 'overview', text: '一、事务消息概述', level: 2 },
  { id: 'scenarios', text: '二、应用场景', level: 2 },
  { id: 'architecture', text: '三、整体架构设计', level: 2 },
  { id: 'half-message', text: '3.1 半消息机制', level: 3 },
  { id: 'callback-mechanism', text: '3.2 本地事务回调', level: 3 },
  { id: 'check-mechanism', text: '3.3 事务回查机制', level: 3 },
  { id: 'workflow', text: '四、完整工作流程', level: 2 },
  { id: 'send-phase', text: '4.1 发送阶段', level: 3 },
  { id: 'execute-phase', text: '4.2 执行阶段', level: 3 },
  { id: 'commit-phase', text: '4.3 提交阶段', level: 3 },
  { id: 'check-phase', text: '4.4 回查阶段', level: 3 },
  { id: 'implementation', text: '五、代码实现示例', level: 2 },
  { id: 'producer-code', text: '5.1 Producer 端代码', level: 3 },
  { id: 'listener-code', text: '5.2 事务监听器代码', level: 3 },
  { id: 'consumer-code', text: '5.3 Consumer 端代码', level: 3 },
  { id: 'reliability', text: '六、可靠性保证', level: 2 },
  { id: 'idempotency', text: '6.1 幂等性保证', level: 3 },
  { id: 'consistency', text: '6.2 最终一致性', level: 3 },
  { id: 'pitfalls', text: '七、常见陷阱与最佳实践', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function RocketmqTransaction({ meta }: { meta: KnowledgeNode }) {
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
              RocketMQ 事务消息通过<strong className="text-accent">半消息（Half Message）</strong>和<strong className="text-accent">事务回查机制</strong>，实现分布式场景下的最终一致性，确保本地事务执行与消息发送的原子性，广泛应用于订单创建、支付通知、库存扣减等需要强一致性的业务场景。
            </p>
          </blockquote>

          {/* ========== 一、事务消息概述 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、事务消息概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            在分布式系统中，经常需要保证多个操作要么全部成功，要么全部失败。例如：用户下单时，需要同时完成<strong>创建订单</strong>和<strong>扣减库存</strong>两个操作。如果订单创建成功但库存扣减失败，就会导致数据不一致。
          </p>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 事务消息提供了一种<strong>最终一致性</strong>的解决方案，通过两阶段提交和事务回查机制，确保本地事务和消息发送的原子性。
          </p>

          <Callout type="info" title="事务消息 vs 分布式事务">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              事务消息提供的是<strong>最终一致性</strong>，不是强一致性。它允许短暂的数据不一致，但最终会达到一致状态。相比 2PC、TCC 等分布式事务方案，事务消息性能更高、实现更简单，适合对实时一致性要求不高的场景。
            </p>
          </Callout>

          {/* ========== 二、应用场景 ========== */}
          <h2 id="scenarios" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、应用场景
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light">
              <h4 className="font-semibold text-ink mb-2">🛒 电商订单</h4>
              <p className="text-[13px] text-ink-muted">创建订单后，发送消息通知库存系统扣减库存、积分系统增加积分、物流系统准备发货</p>
            </div>
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light">
              <h4 className="font-semibold text-ink mb-2">💳 支付通知</h4>
              <p className="text-[13px] text-ink-muted">支付成功后，发送消息通知订单系统更新状态、用户系统增加余额、风控系统记录日志</p>
            </div>
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light">
              <h4 className="font-semibold text-ink mb-2">📦 物流追踪</h4>
              <p className="text-[13px] text-ink-muted">包裹状态更新后，发送消息通知用户系统推送通知、数据分析系统记录轨迹</p>
            </div>
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light">
              <h4 className="font-semibold text-ink mb-2">👤 用户注册</h4>
              <p className="text-[13px] text-ink-muted">用户注册成功后，发送消息通知积分系统赠送积分、营销系统发放优惠券</p>
            </div>
          </div>

          {/* ========== 三、整体架构设计 ========== */}
          <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、整体架构设计
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            RocketMQ 事务消息的核心设计包括三个关键组件：<strong>半消息</strong>、<strong>本地事务监听器</strong>和<strong>事务回查机制</strong>。
          </p>

          <h3 id="half-message" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 半消息机制
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>半消息（Half Message）</strong>是一种特殊类型的消息，发送后对 Consumer 不可见，只有当事务提交后才会变为可见状态。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>暂存状态</strong>：半消息存储在 Broker 的特殊 Topic（RMQ_SYS_TRANS_HALF_TOPIC）中</li>
            <li><strong>对外不可见</strong>：Consumer 无法消费半消息，避免执行未完成的事务</li>
            <li><strong>事务标识</strong>：每条半消息都有唯一的事务 ID，用于后续回查</li>
            <li><strong>状态转换</strong>：事务提交后，半消息转换为正常消息，对 Consumer 可见</li>
          </ul>

          <DiagramBlock title="半消息状态流转">
            {`graph LR
              A["Producer<br/>发送半消息"] -->|"1. Send Half"| B["Broker<br/>存储到 HALF_TOPIC"]
              B -->|"2. Return OK"| A
              A -->|"3. Execute Local Tx"| C["本地数据库<br/>执行事务"]
              C -->|"4a. Commit"| D["Producer<br/>提交事务"]
              C -->|"4b. Rollback"| E["Producer<br/>回滚事务"]
              D -->|"5. Commit Msg"| F["Broker<br/>转为正常消息"]
              E -->|"6. Rollback Msg"| G["Broker<br/>删除半消息"]
              F -->|"7. Visible"| H["Consumer<br/>可以消费"]

              style B fill:#ff9,stroke:#333,stroke-width:2px
              style F fill:#9f9,stroke:#333,stroke-width:2px
              style G fill:#f99,stroke:#333,stroke-width:2px`}
          </DiagramBlock>

          <h3 id="callback-mechanism" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 本地事务回调
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Producer 需要实现一个<strong>本地事务监听器</strong>，用于执行本地事务并返回执行结果。监听器有三种返回状态：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>COMMIT_MESSAGE</strong>：本地事务执行成功，提交事务消息</li>
            <li><strong>ROLLBACK_MESSAGE</strong>：本地事务执行失败，回滚事务消息</li>
            <li><strong>UNKNOW</strong>：本地事务执行状态未知，等待 Broker 回查</li>
          </ul>

          <SideNote label="关键点">
            <p className="text-[13px] leading-[1.7]">
              返回 UNKNOW 状态时，Broker 会定期回查事务状态，直到得到明确的结果（COMMIT 或 ROLLBACK）。这是处理网络超时等异常情况的关键机制。
            </p>
          </SideNote>

          <h3 id="check-mechanism" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.3 事务回查机制
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当 Producer 返回 UNKNOW 状态或网络超时时，Broker 会启动<strong>事务回查机制</strong>，定期询问 Producer 本地事务的执行状态。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>回查间隔</strong>：默认 60 秒后开始回查，每隔 60 秒回查一次</li>
            <li><strong>最大回查次数</strong>：默认最多回查 15 次，超过后强制回滚</li>
            <li><strong>回查逻辑</strong>：Producer 需要根据事务 ID 查询本地事务状态</li>
            <li><strong>最终处理</strong>：回查成功后提交或回滚，超过次数则强制回滚</li>
          </ul>

          <Callout type="warning" title="回查机制的重要性">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              回查机制是事务消息可靠性的关键保障。即使 Producer 在发送半消息后宕机，Broker 也能通过回查机制确保事务的最终状态，避免消息丢失或重复消费。
            </p>
          </Callout>

          {/* ========== 四、完整工作流程 ========== */}
          <h2 id="workflow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、完整工作流程
          </h2>

          <h3 id="send-phase" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 发送阶段
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li>Producer 向 Broker 发送<strong>半消息</strong>（Half Message）</li>
            <li>Broker 将半消息存储到特殊 Topic（RMQ_SYS_TRANS_HALF_TOPIC）</li>
            <li>Broker 返回发送成功响应给 Producer</li>
            <li>此时消息对 Consumer <strong>不可见</strong></li>
          </ol>

          <h3 id="execute-phase" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 执行阶段
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li>Producer 接收到半消息发送成功的响应</li>
            <li>Producer 执行<strong>本地事务</strong>（如数据库操作）</li>
            <li>根据本地事务执行结果，返回三种状态之一：
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>COMMIT_MESSAGE：事务成功</li>
                <li>ROLLBACK_MESSAGE：事务失败</li>
                <li>UNKNOW：状态未知</li>
              </ul>
            </li>
          </ol>

          <h3 id="commit-phase" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.3 提交阶段
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li>如果返回 COMMIT_MESSAGE：
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Producer 向 Broker 发送提交请求</li>
                <li>Broker 将半消息转换为正常消息</li>
                <li>消息对 Consumer 可见，可以消费</li>
              </ul>
            </li>
            <li>如果返回 ROLLBACK_MESSAGE：
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Producer 向 Broker 发送回滚请求</li>
                <li>Broker 删除半消息</li>
                <li>消息不会被消费</li>
              </ul>
            </li>
          </ol>

          <h3 id="check-phase" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.4 回查阶段
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li>如果返回 UNKNOW 或网络超时，进入回查流程</li>
            <li>Broker 等待 60 秒后，向 Producer 发起回查请求</li>
            <li>Producer 根据事务 ID 查询本地事务状态</li>
            <li>Producer 返回 COMMIT 或 ROLLBACK 状态</li>
            <li>Broker 根据回查结果提交或回滚消息</li>
            <li>如果超过最大回查次数（默认 15 次），强制回滚</li>
          </ol>

          <DiagramBlock title="事务消息完整流程">
            {`sequenceDiagram
              participant P as Producer
              participant B as Broker
              participant DB as 本地数据库
              participant C as Consumer

              P->>B: 1. 发送半消息
              B->>B: 2. 存储到 HALF_TOPIC
              B-->>P: 3. 返回发送成功
              
              P->>DB: 4. 执行本地事务
              alt 事务成功
                DB-->>P: 5a. 返回成功
                P->>B: 6a. 提交事务消息
                B->>B: 7a. 转为正常消息
                B-->>C: 8a. 消息可见，可以消费
              else 事务失败
                DB-->>P: 5b. 返回失败
                P->>B: 6b. 回滚事务消息
                B->>B: 7b. 删除半消息
              else 状态未知
                DB-->>P: 5c. 状态未知
                P->>B: 6c. 返回 UNKNOW
                loop 回查机制
                  B->>P: 7c. 回查事务状态
                  P->>DB: 8c. 查询本地事务
                  DB-->>P: 9c. 返回事务状态
                  P->>B: 10c. 返回 COMMIT/ROLLBACK
                end
              end`}
          </DiagramBlock>

          {/* ========== 五、代码实现示例 ========== */}
          <h2 id="implementation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、代码实现示例
          </h2>

          <h3 id="producer-code" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 Producer 端代码
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            以下是使用 Java SDK 发送事务消息的示例代码：
          </p>

          <pre className="bg-parchment-deep p-4 rounded-paper-sm overflow-x-auto text-[13px] leading-[1.6] mb-6">
{`// 创建事务消息 Producer
TransactionMQProducer producer = new TransactionMQProducer("order_transaction_group");
producer.setNamesrvAddr("127.0.0.1:9876");

// 设置事务监听器
producer.setTransactionListener(new TransactionListener() {
    @Override
    public LocalTransactionState executeLocalTransaction(Message msg, Object arg) {
        // 执行本地事务
        try {
            // 1. 创建订单
            Order order = (Order) arg;
            orderService.createOrder(order);
            
            // 2. 扣减库存
            inventoryService.deductStock(order.getProductId(), order.getQuantity());
            
            // 3. 返回提交状态
            return LocalTransactionState.COMMIT_MESSAGE;
        } catch (Exception e) {
            log.error("本地事务执行失败", e);
            return LocalTransactionState.ROLLBACK_MESSAGE;
        }
    }
    
    @Override
    public LocalTransactionState checkLocalTransaction(MessageExt msg) {
        // 回查本地事务状态
        String transactionId = msg.getTransactionId();
        
        // 根据事务 ID 查询本地事务状态
        TransactionStatus status = transactionService.queryStatus(transactionId);
        
        if (status == TransactionStatus.COMMITTED) {
            return LocalTransactionState.COMMIT_MESSAGE;
        } else if (status == TransactionStatus.ROLLED_BACK) {
            return LocalTransactionState.ROLLBACK_MESSAGE;
        } else {
            return LocalTransactionState.UNKNOW;
        }
    }
});

producer.start();

// 发送事务消息
Message message = new Message("OrderTopic", "create", 
    JSON.toJSONString(order).getBytes());
SendResult sendResult = producer.sendMessageInTransaction(message, order);`}
          </pre>

          <h3 id="listener-code" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 事务监听器代码
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            事务监听器的两个核心方法：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>executeLocalTransaction</strong>：执行本地事务，返回事务状态</li>
            <li><strong>checkLocalTransaction</strong>：回查本地事务状态，用于 Broker 回查时调用</li>
          </ul>

          <Callout type="tip" title="事务表设计建议">
            <p className="text-[14px] sm:text-[15px] leading-[1.8]">
              建议在本地数据库中维护一张<strong>事务状态表</strong>，记录每个事务 ID 的执行状态。回查时直接查询该表，避免重复执行业务逻辑。事务表应包含：transaction_id、status、create_time、update_time 等字段。
            </p>
          </Callout>

          <h3 id="consumer-code" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.3 Consumer 端代码
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Consumer 端的代码与普通消息消费相同，无需特殊处理：
          </p>

          <pre className="bg-parchment-deep p-4 rounded-paper-sm overflow-x-auto text-[13px] leading-[1.6] mb-6">
{`// 创建 Consumer
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("inventory_consumer_group");
consumer.setNamesrvAddr("127.0.0.1:9876");
consumer.subscribe("OrderTopic", "create");

consumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, 
                                                     ConsumeConcurrentlyContext context) {
        for (MessageExt msg : msgs) {
            try {
                String body = new String(msg.getBody(), "UTF-8");
                Order order = JSON.parseObject(body, Order.class);
                
                // 处理订单创建逻辑
                inventoryService.deductStock(order.getProductId(), order.getQuantity());
                
                log.info("订单处理成功: {}", order.getOrderId());
            } catch (Exception e) {
                log.error("订单处理失败", e);
                // 返回重试状态
                return ConsumeConcurrentlyStatus.RECONSUME_LATER;
            }
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});

consumer.start();`}
          </pre>

          {/* ========== 六、可靠性保证 ========== */}
          <h2 id="reliability" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、可靠性保证
          </h2>

          <h3 id="idempotency" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.1 幂等性保证
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            由于网络重试、回查机制等原因，消息可能会被重复投递。Consumer 必须实现<strong>幂等性</strong>，确保重复消费不会产生副作用。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>唯一索引</strong>：在数据库中使用唯一索引防止重复插入</li>
            <li><strong>去重表</strong>：维护消息 ID 去重表，消费前检查是否已处理</li>
            <li><strong>状态机</strong>：使用状态机控制业务流程，避免重复执行</li>
            <li><strong>乐观锁</strong>：使用版本号或时间戳实现乐观锁</li>
          </ul>

          <h3 id="consistency" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.2 最终一致性
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            事务消息保证的是<strong>最终一致性</strong>，不是强一致性。在事务执行过程中，可能存在短暂的数据不一致窗口。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6 ml-2">
            <li><strong>一致性窗口</strong>：从发送半消息到事务提交的这段时间</li>
            <li><strong>补偿机制</strong>：对于极端情况（如回查失败），需要人工介入或对账补偿</li>
            <li><strong>监控告警</strong>：监控长时间未提交的事务，及时发现问题</li>
          </ul>

          {/* ========== 七、常见陷阱与最佳实践 ========== */}
          <h2 id="pitfalls" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见陷阱与最佳实践
          </h2>

          <div className="space-y-4 mb-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-yellow-700">陷阱 1：</strong>本地事务中包含远程调用
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">建议：</strong>本地事务应该只包含数据库操作，避免远程调用。远程调用应该通过消息异步完成，否则会降低事务性能并增加失败概率。
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-yellow-700">陷阱 2：</strong>回查逻辑中重新执行业务
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">建议：</strong>回查时应该查询事务状态表，而不是重新执行业务逻辑。重新执行可能导致数据错误或重复操作。
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-yellow-700">陷阱 3：</strong>忽略 Consumer 幂等性
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">建议：</strong>必须实现 Consumer 幂等性，因为消息可能被重复投递。可以使用唯一索引、去重表或状态机来保证幂等。
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-yellow-700">陷阱 4：</strong>事务超时时间设置不合理
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">建议：</strong>根据业务特点合理设置事务超时时间。太短会导致正常事务被回滚，太长会占用系统资源。一般设置为 1-5 分钟。
              </p>
            </div>
          </div>

          {/* ========== 八、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <div className="space-y-4 mb-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-red-700">误区 1：</strong>事务消息提供强一致性
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">正解：</strong>事务消息提供的是最终一致性，存在短暂的不一致窗口。如果需要强一致性，应该使用 2PC 或 TCC 等分布式事务方案。
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-red-700">误区 2：</strong>半消息对 Producer 也不可见
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">正解：</strong>半消息只对 Consumer 不可见，Producer 可以查询和管理自己发送的半消息。Broker 会将半消息存储在特殊的 Topic 中。
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink">
                <strong className="text-red-700">误区 3：</strong>回查机制会无限期执行
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ink-muted mt-2">
                <strong className="text-green-700">正解：</strong>回查有最大次数限制（默认 15 次），超过后会强制回滚事务。这样可以避免无限期占用系统资源。
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
                question: 'RocketMQ 事务消息的实现原理是什么？',
                answer: '通过半消息机制和本地事务监听器实现。首先发送半消息到 Broker（对 Consumer 不可见），然后执行本地事务，根据执行结果提交或回滚消息。如果状态未知，Broker 会定期回查事务状态，确保最终一致性。'
              },
              {
                question: '什么是半消息？为什么需要半消息？',
                answer: '半消息是一种临时状态的消息，存储在 Broker 的特殊 Topic 中，对 Consumer 不可见。只有当事务提交后，半消息才转换为正常消息。半消息确保了消息发送和本地事务的原子性，避免了消息提前被消费导致的数据不一致。'
              },
              {
                question: '事务回查机制的作用是什么？',
                answer: '回查机制用于处理网络超时或 Producer 宕机等异常情况。当 Producer 返回 UNKNOW 状态或超时时，Broker 会定期回查事务状态，直到得到明确的结果。这保证了即使在异常情况下，事务也能最终完成，不会遗留未决事务。'
              },
              {
                question: '如何保证事务消息的幂等性？',
                answer: '从两个层面保证：1) Producer 端：使用唯一事务 ID，避免重复发送；2) Consumer 端：实现幂等消费，使用唯一索引、去重表或状态机防止重复处理。因为网络重试等原因，消息可能被重复投递，Consumer 必须能够处理重复消息。'
              },
              {
                question: '事务消息和普通消息的性能差异有多大？',
                answer: '事务消息比普通消息性能低约 20%-30%，主要开销在于：1) 半消息的额外存储；2) 本地事务执行的同步等待；3) 可能的回查机制。但对于需要保证一致性的场景，这个性能损耗是可以接受的。'
              }
            ]}
          />

          {/* ========== 十、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light hover:border-accent transition-colors">
              <h4 className="font-semibold text-ink mb-2">📌 RocketMQ 架构设计</h4>
              <p className="text-[13px] text-ink-muted">深入理解 RocketMQ 的整体架构和核心组件</p>
            </div>
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light hover:border-accent transition-colors">
              <h4 className="font-semibold text-ink mb-2">📌 RocketMQ 高级特性</h4>
              <p className="text-[13px] text-ink-muted">学习顺序消息、延迟消息等其他企业级特性</p>
            </div>
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light hover:border-accent transition-colors">
              <h4 className="font-semibold text-ink mb-2">📌 分布式事务</h4>
              <p className="text-[13px] text-ink-muted">了解 2PC、TCC、Saga 等其他分布式事务解决方案</p>
            </div>
            <div className="bg-surface rounded-paper-sm p-4 border border-border-light hover:border-accent transition-colors">
              <h4 className="font-semibold text-ink mb-2">📌 Spring 事务管理</h4>
              <p className="text-[13px] text-ink-muted">学习本地事务的管理和优化技巧</p>
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
