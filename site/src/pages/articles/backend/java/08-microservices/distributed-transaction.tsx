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
  { id: 'acid-cap', text: '一、ACID 与 CAP 理论', level: 2 },
  { id: '2pc', text: '二、两阶段提交(2PC)', level: 2 },
  { id: '3pc', text: '三、三阶段提交(3PC)', level: 2 },
  { id: 'tcc', text: '四、TCC 补偿事务', level: 2 },
  { id: 'saga', text: '五、Saga 模式', level: 2 },
  { id: 'local-message', text: '六、本地消息表', level: 2 },
  { id: 'seata', text: '七、Seata 实战', level: 2 },
  { id: 'comparison', text: '八、方案对比', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function DistributedTransaction({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              分布式事务是跨越多个<strong className="text-accent">独立数据库或服务</strong>的事务管理机制,确保在微服务架构中,跨服务的多个操作要么全部成功,要么全部失败,保持数据最终一致性。
            </p>
          </blockquote>

          <Callout type="warning" title="分布式事务的代价">
            分布式事务会显著降低系统性能(网络往返、锁竞争)和可用性(协调者单点故障)。能不用尽量不用,优先考虑业务层面的最终一致性方案。
          </Callout>

          <h2 id="acid-cap" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、ACID 与 CAP 理论
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            理解分布式事务前,需要掌握两个基础理论:
          </p>

          <h3 id="acid" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            ACID - 单机事务特性
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>Atomicity(原子性):</strong> 事务中的操作要么全部成功,要么全部失败回滚</li>
            <li><strong>Consistency(一致性):</strong> 事务执行前后,数据库从一个一致状态转换到另一个一致状态</li>
            <li><strong>Isolation(隔离性):</strong> 并发事务之间互不干扰</li>
            <li><strong>Durability(持久性):</strong> 事务一旦提交,对数据的修改是永久的</li>
          </ul>

          <h3 id="cap" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            CAP - 分布式系统权衡
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-4">
            <li><strong>Consistency(一致性):</strong> 所有节点在同一时间看到相同的数据</li>
            <li><strong>Availability(可用性):</strong> 每个请求都能在合理时间内收到响应</li>
            <li><strong>Partition Tolerance(分区容错性):</strong> 系统在部分节点故障时仍能正常运行</li>
          </ul>

          <Callout type="info" title="CAP 不可能三角">
            分布式系统最多只能同时满足 CAP 中的两个:<br/>
            • <strong>CP(强一致性):</strong> ZooKeeper、HBase - 保证一致性,牺牲可用性<br/>
            • <strong>AP(高可用):</strong> Eureka、Cassandra - 保证可用性,牺牲强一致性<br/>
            • <strong>CA:</strong> 理论上存在,但实际分布式系统必须有 P,所以 CA 不存在
          </Callout>

          <SideNote label="BASE 理论">
            BASE 是对 CAP 中 AP 的扩展:<br/>
            • <strong>Basically Available(基本可用):</strong> 允许损失部分可用性<br/>
            • <strong>Soft State(软状态):</strong> 允许中间状态存在<br/>
            • <strong>Eventually Consistent(最终一致性):</strong> 经过一段时间后达到一致
          </SideNote>

          <h2 id="2pc" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、两阶段提交(2PC)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            2PC 是最经典的分布式事务协议,通过协调者(Coordinator)和参与者(Participant)的两轮交互实现事务提交。
          </p>

          <DiagramBlock title="2PC 工作流程">
{`graph TB
    subgraph "第一阶段:准备阶段"
        C[协调者] -->|1.发送准备请求| P1[参与者 A]
        C -->|1.发送准备请求| P2[参与者 B]
        P1 -->|2.执行事务并返回 Yes/No| C
        P2 -->|2.执行事务并返回 Yes/No| C
    end
    
    subgraph "第二阶段:提交阶段"
        C -->|3a.全部 Yes:发送 Commit| P1
        C -->|3a.全部 Yes:发送 Commit| P2
        C -->|3b.有 No:发送 Rollback| P1
        C -->|3b.有 No:发送 Rollback| P2
        P1 -->|4.执行并提交/回滚| DB1[(数据库 A)]
        P2 -->|4.执行并提交/回滚| DB2[(数据库 B)]
    end`}
          </DiagramBlock>

          <Playground
            code={`// Spring + JTA 实现 2PC
@Configuration
public class JtaConfig {
    
    @Bean
    public PlatformTransactionManager transactionManager() {
        JtaTransactionManager jtaTxManager = new JtaTransactionManager();
        jtaTxManager.setTransactionManager(new AtomikosTransactionManager());
        return jtaTxManager;
    }
}

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private InventoryService inventoryService;
    
    @Transactional  // JTA 自动管理分布式事务
    public void createOrder(Order order) {
        // 1. 创建订单(本地事务)
        orderRepository.save(order);
        
        // 2. 扣减库存(RPC 调用,参与全局事务)
        inventoryService.deductStock(order.getProductId(), order.getQuantity());
        
        // 如果任何一步失败,整个事务回滚
    }
}`}
            language="java"
            highlights={[16, 23]}
            filename="OrderService.java"
            description="基于 JTA 的 2PC 实现"
          />

          <Callout type="danger" title="2PC 的问题">
            • <strong>同步阻塞:</strong> 参与者在等待协调者指令期间锁定资源,其他事务无法访问<br/>
            • <strong>单点故障:</strong> 协调者宕机导致参与者长期持有锁<br/>
            • <strong>数据不一致:</strong> 第二阶段网络异常可能导致部分节点提交、部分回滚<br/>
            • <strong>性能差:</strong> 两次网络往返,不适合高并发场景
          </Callout>

          <h2 id="3pc" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、三阶段提交(3PC)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            3PC 在 2PC 基础上增加了超时机制和预提交阶段,减少阻塞时间,但仍无法完全解决数据一致性问题。
          </p>

          <DiagramBlock title="3PC 三个阶段">
{`graph LR
    CanCommit[CanCommit<br/>询问是否可以提交] --> PreCommit[PreCommit<br/>预提交]
    PreCommit --> DoCommit[DoCommit<br/>正式提交]
    
    subgraph "改进点"
        I1[✅ 增加超时机制]
        I2[✅ 减少阻塞时间]
        I3[❌ 仍存在不一致风险]
    end`}
          </DiagramBlock>

          <SideNote label="为什么 3PC 不常用?">
            3PC 虽然解决了 2PC 的部分问题,但引入了更多网络往返,复杂度更高,且仍无法彻底解决数据不一致。现代分布式系统更倾向于使用 TCC、Saga 等最终一致性方案。
          </SideNote>

          <h2 id="tcc" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、TCC 补偿事务
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TCC(Try-Confirm-Cancel)将业务逻辑拆分为三个阶段,由应用层控制事务,避免长时间锁定资源。
          </p>

          <DiagramBlock title="TCC 工作流程">
{`graph TB
    subgraph "Try 阶段:检查并预留资源"
        T1[订单服务:冻结库存]
        T2[支付服务:冻结余额]
    end
    
    subgraph "Confirm 阶段:真正执行业务"
        C1[订单服务:创建订单]
        C2[支付服务:扣款]
    end
    
    subgraph "Cancel 阶段:释放预留资源"
        X1[订单服务:解冻库存]
        X2[支付服务:解冻余额]
    end
    
    Try[Try] -->|全部成功| Confirm[Confirm]
    Try -->|任一失败| Cancel[Cancel]`}
          </DiagramBlock>

          <Playground
            code={`@Service
public class OrderTccService {
    
    // Try 阶段:预留资源
    @TccTransaction(confirmMethod = "confirm", cancelMethod = "cancel")
    public void tryCreateOrder(Order order) {
        // 1. 检查库存是否充足
        Integer stock = inventoryService.getStock(order.getProductId());
        if (stock < order.getQuantity()) {
            throw new RuntimeException("库存不足");
        }
        
        // 2. 冻结库存(不真正扣减)
        inventoryService.freezeStock(order.getProductId(), order.getQuantity());
        
        // 3. 创建待确认订单
        order.setStatus("PENDING");
        orderRepository.save(order);
    }
    
    // Confirm 阶段:真正执行业务
    public void confirm(Order order) {
        // 1. 真正扣减库存
        inventoryService.deductStock(order.getProductId(), order.getQuantity());
        
        // 2. 更新订单状态为已确认
        order.setStatus("CONFIRMED");
        orderRepository.save(order);
    }
    
    // Cancel 阶段:回滚预留资源
    public void cancel(Order order) {
        // 1. 解冻库存
        inventoryService.unfreezeStock(order.getProductId(), order.getQuantity());
        
        // 2. 删除或标记订单为已取消
        order.setStatus("CANCELLED");
        orderRepository.save(order);
    }
}`}
            language="java"
            highlights={[5, 14, 23, 32]}
            filename="OrderTccService.java"
            description="TCC 三段式事务实现"
          />

          <Callout type="warning" title="TCC 的挑战">
            • <strong>代码侵入性强:</strong> 需要为每个操作编写 Try/Confirm/Cancel 三个方法<br/>
            • <strong>幂等性要求:</strong> Confirm/Cancel 可能被重复调用,必须保证幂等<br/>
            • <strong>空回滚:</strong> Try 未执行就收到 Cancel,需特殊处理<br/>
            • <strong>悬挂:</strong> Cancel 先于 Try 到达,需防止 Try 后执行
          </Callout>

          <h2 id="saga" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Saga 模式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Saga 将长事务拆分为多个短事务,每个短事务都有对应的补偿操作。如果某步失败,则逆向执行之前步骤的补偿操作。
          </p>

          <DiagramBlock title="Saga 正向执行与补偿">
{`graph LR
    subgraph "正向执行"
        S1[Step 1: 创建订单] --> S2[Step 2: 扣减库存]
        S2 --> S3[Step 3: 扣款]
        S3 --> Success[成功]
    end
    
    subgraph "失败补偿"
        F1[Step 2 失败] --> C2[补偿 Step 1: 取消订单]
        C2 --> Rollback[回滚完成]
    end`}
          </DiagramBlock>

          <Playground
            code={`@SagaStart
@Service
public class OrderSagaService {
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private InventoryService inventoryService;
    
    @Autowired
    private PaymentService paymentService;
    
    @Transactional
    public void createOrderWithSaga(Order order) {
        try {
            // Step 1: 创建订单
            Long orderId = orderService.createOrder(order);
            
            // Step 2: 扣减库存
            inventoryService.deductStock(order.getProductId(), order.getQuantity());
            
            // Step 3: 扣款
            paymentService.charge(order.getUserId(), order.getAmount());
            
        } catch (Exception e) {
            // 补偿操作(按相反顺序)
            compensate(order);
            throw e;
        }
    }
    
    private void compensate(Order order) {
        try {
            // 补偿 Step 3: 退款
            paymentService.refund(order.getUserId(), order.getAmount());
        } catch (Exception e) {
            log.error("退款失败,需人工介入", e);
        }
        
        try {
            // 补偿 Step 2: 恢复库存
            inventoryService.restoreStock(order.getProductId(), order.getQuantity());
        } catch (Exception e) {
            log.error("库存恢复失败,需人工介入", e);
        }
        
        try {
            // 补偿 Step 1: 取消订单
            orderService.cancelOrder(order.getId());
        } catch (Exception e) {
            log.error("订单取消失败,需人工介入", e);
        }
    }
}`}
            language="java"
            highlights={[15, 29, 34]}
            filename="OrderSagaService.java"
            description="Saga 模式实现示例"
          />

          <SideNote label="Saga vs TCC">
            • <strong>Saga:</strong> 每个子事务直接提交,通过补偿回滚,适合长事务<br/>
            • <strong>TCC:</strong> 预留资源,确认后才真正提交,适合短事务<br/>
            • <strong>选择建议:</strong> 业务逻辑简单用 Saga,对一致性要求高用 TCC
          </SideNote>

          <h2 id="local-message" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、本地消息表
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            本地消息表利用本地事务保证消息可靠投递,通过消息队列实现最终一致性,是互联网大厂常用的方案。
          </p>

          <DiagramBlock title="本地消息表流程">
{`graph TB
    subgraph "生产者侧"
        DB[(业务数据库)] -->|1.业务操作+插入消息| Tx[本地事务]
        Tx --> MQ[消息队列]
    end
    
    subgraph "消费者侧"
        MQ -->|2.消费消息| Consumer[消费者服务]
        Consumer -->|3.执行业务| DB2[(消费者数据库)]
        Consumer -->|4.ack| MQ
    end
    
    subgraph "重试机制"
        Fail[消费失败] -->|重试| MQ
        MQ -->|最大重试次数| DeadLetter[死信队列]
        DeadLetter -->|人工处理| Admin[管理员]
    end`}
          </DiagramBlock>

          <Playground
            code={`@Service
public class OrderMessageProducer {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    @Transactional
    public void createOrder(Order order) {
        // 1. 创建订单(本地事务)
        orderRepository.save(order);
        
        // 2. 插入消息记录(同一事务)
        Message message = new Message();
        message.setBusinessKey(order.getId().toString());
        message.setPayload(JsonUtils.toJson(order));
        message.setStatus("PENDING");
        messageRepository.save(message);
        
        // 3. 发送消息到 MQ
        rabbitTemplate.convertAndSend("order.exchange", "order.created", order);
        
        // 4. 更新消息状态为已发送
        message.setStatus("SENT");
        messageRepository.save(message);
    }
}

// 定时任务:重试失败的消息
@Component
public class MessageRetryTask {
    
    @Scheduled(fixedDelay = 5000)  // 每 5 秒执行一次
    public void retryFailedMessages() {
        List<Message> pendingMessages = messageRepository.findByStatus("PENDING");
        for (Message message : pendingMessages) {
            try {
                rabbitTemplate.convertAndSend("order.exchange", "order.created", message.getPayload());
                message.setStatus("SENT");
                messageRepository.save(message);
            } catch (Exception e) {
                log.error("消息重试失败", e);
                message.setRetryCount(message.getRetryCount() + 1);
                if (message.getRetryCount() >= 10) {
                    message.setStatus("FAILED");  // 超过最大重试次数,转入死信队列
                }
                messageRepository.save(message);
            }
        }
    }
}`}
            language="java"
            highlights={[14, 38, 42]}
            filename="LocalMessageTable.java"
            description="本地消息表实现可靠消息投递"
          />

          <h2 id="seata" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、Seata 实战
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Seata 是阿里巴巴开源的分布式事务解决方案,支持 AT、TCC、Saga、XA 四种模式,其中 AT 模式最常用。
          </p>

          <Playground
            code={`# application.yml
seata:
  enabled: true
  application-id: order-service
  tx-service-group: my_test_tx_group
  config:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      namespace: ""
      group: SEATA_GROUP
  registry:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      namespace: ""
      group: SEATA_GROUP
  service:
    vgroup-mapping:
      my_test_tx_group: default  # 事务分组映射
    grouplist:
      default: 127.0.0.1:8091  # Seata Server 地址`}
            language="yaml"
            highlights={[4, 7, 13, 20, 22]}
            filename="seata-config.yml"
            description="Seata 客户端配置"
          />

          <Playground
            code={`@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private InventoryFeignClient inventoryFeignClient;
    
    // 使用 Seata AT 模式
    @GlobalTransactional(name = "create-order-tx", rollbackFor = Exception.class)
    public void createOrder(Order order) {
        // 1. 创建订单(本地事务)
        orderRepository.save(order);
        
        // 2. 远程调用扣减库存(自动加入全局事务)
        inventoryFeignClient.deductStock(order.getProductId(), order.getQuantity());
        
        // 如果任何一步失败,Seata 自动回滚所有分支事务
    }
}

// Feign 客户端
@FeignClient(name = "inventory-service")
public interface InventoryFeignClient {
    
    @PostMapping("/inventory/deduct")
    void deductStock(@RequestParam Long productId, @RequestParam Integer quantity);
}`}
            language="java"
            highlights={[11, 17]}
            filename="SeataExample.java"
            description="Seata AT 模式示例"
          />

          <SideNote label="Seata AT 模式原理">
            AT 模式基于两阶段提交:<br/>
            • <strong>一阶段:</strong> 业务数据和回滚日志(Undo Log)在同一个本地事务中提交<br/>
            • <strong>二阶段:</strong> 全局提交则异步删除 Undo Log,全局回滚则根据 Undo Log 反向补偿
          </SideNote>

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、方案对比
          </h2>

          <table className="w-full border-collapse my-6 text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left font-semibold">方案</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">一致性</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">性能</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">侵入性</th>
                <th className="border border-border-light px-4 py-2 text-left font-semibold">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2 font-semibold">2PC/XA</td>
                <td className="border border-border-light px-4 py-2">强一致性</td>
                <td className="border border-border-light px-4 py-2">⭐⭐ 差</td>
                <td className="border border-border-light px-4 py-2">低</td>
                <td className="border border-border-light px-4 py-2">传统企业系统</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-semibold">TCC</td>
                <td className="border border-border-light px-4 py-2">最终一致性</td>
                <td className="border border-border-light px-4 py-2">⭐⭐⭐ 中</td>
                <td className="border border-border-light px-4 py-2">高(需写三个方法)</td>
                <td className="border border-border-light px-4 py-2">对一致性要求高的核心业务</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-semibold">Saga</td>
                <td className="border border-border-light px-4 py-2">最终一致性</td>
                <td className="border border-border-light px-4 py-2">⭐⭐⭐⭐ 好</td>
                <td className="border border-border-light px-4 py-2">中(需写补偿逻辑)</td>
                <td className="border border-border-light px-4 py-2">长事务、业务流程复杂</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-semibold">本地消息表</td>
                <td className="border border-border-light px-4 py-2">最终一致性</td>
                <td className="border border-border-light px-4 py-2">⭐⭐⭐⭐ 好</td>
                <td className="border border-border-light px-4 py-2">中(需维护消息表)</td>
                <td className="border border-border-light px-4 py-2">异步解耦场景</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-semibold">Seata AT</td>
                <td className="border border-border-light px-4 py-2">最终一致性</td>
                <td className="border border-border-light px-4 py-2">⭐⭐⭐ 中</td>
                <td className="border border-border-light px-4 py-2">低(@GlobalTransactional)</td>
                <td className="border border-border-light px-4 py-2">快速接入,通用场景</td>
              </tr>
            </tbody>
          </table>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1:分布式事务能保证强一致性">
            除了 2PC/XA 外,大多数分布式事务方案(TCC、Saga、本地消息表)都只能保证最终一致性,存在短暂的中间状态。强一致性会严重牺牲性能和可用性。
          </Callout>

          <Callout type="danger" title="误区 2:所有跨服务调用都需要分布式事务">
            很多场景可以通过业务设计避免分布式事务,如:(1)将相关数据放在同一服务;(2)使用异步消息最终一致性;(3)允许短暂不一致,通过定时任务对账修复。
          </Callout>

          <Callout type="danger" title="误区 3:TCC 的 Confirm/Cancel 不需要幂等">
            由于网络抖动,Confirm/Cancel 可能被重复调用。必须通过唯一键、状态机等方式保证幂等性,否则会导致数据错误(如重复扣款)。
          </Callout>

          <Callout type="danger" title="误区 4:Seata 可以无脑使用">
            Seata AT 模式会在业务表中添加 undo_log,影响查询性能。高并发场景建议使用 TCC 或本地消息表。此外,Seata Server 本身也需要高可用部署。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "什么是分布式事务?为什么需要它?",
              answer: "分布式事务是跨越多个独立数据库或服务的事务管理机制。在微服务架构中,一个业务操作可能涉及多个服务,每个服务有自己的数据库。分布式事务确保这些跨服务的操作要么全部成功,要么全部失败,保持数据一致性。"
            },
            {
              question: "2PC 和 3PC 的区别是什么?",
              answer: "2PC 有两个阶段:准备阶段和提交阶段,存在同步阻塞和单点故障问题。3PC 在 2PC 基础上增加了预提交阶段和超时机制,减少阻塞时间,但仍无法完全解决数据不一致,且引入更多网络往返,实际使用较少。"
            },
            {
              question: "TCC 的三个阶段分别做什么?",
              answer: "Try 阶段:检查业务活动所需的资源并预留(如冻结库存);Confirm 阶段:真正执行业务操作(如扣减库存);Cancel 阶段:释放 Try 阶段预留的资源(如解冻库存)。如果 Try 失败或 Confirm 失败,则执行 Cancel 回滚。"
            },
            {
              question: "Saga 模式和 TCC 有什么区别?",
              answer: "Saga 的每个子事务直接提交,通过补偿操作回滚,适合长事务;TCC 先预留资源,Confirm 时才真正提交,适合短事务。Saga 侵入性较低,TCC 对一致性保障更强但代码复杂度高。"
            },
            {
              question: "如何实现最终一致性?",
              answer: "常见方案:(1)本地消息表+MQ:利用本地事务保证消息可靠投递,消费者幂等处理;(2)定时对账:定期比对不同系统的数据,发现不一致后修复;(3)事件溯源:记录所有状态变更事件,可重放重建状态;(4)补偿事务:失败时执行逆向操作。"
            },
            {
              question: "Seata 的 AT 模式原理是什么?",
              answer: "AT 模式基于一阶段本地提交+二阶段异步清理:(1)一阶段:业务 SQL 和 Undo Log 在同一本地事务中提交,Undo Log 记录数据修改前后的镜像;(2)二阶段:全局提交则异步删除 Undo Log,全局回滚则根据 Undo Log 生成反向 SQL 执行补偿。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            学习完分布式事务后,建议继续深入学习:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><a href="/docs/08-microservices/spring-cloud-core" className="text-accent hover:underline">Spring Cloud 核心组件</a> - 理解微服务间的通信机制</li>
            <li><a href="/docs/08-microservices/message-queue" className="text-accent hover:underline">消息队列</a> - 实现异步解耦和最终一致性</li>
            <li><a href="/docs/06-spring-framework/spring-transaction" className="text-accent hover:underline">Spring 事务管理</a> - 深入理解单机事务原理</li>
            <li><a href="/docs/07-database/sql-optimization" className="text-accent hover:underline">SQL 优化与索引</a> - 优化事务中的数据库操作</li>
          </ul>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
