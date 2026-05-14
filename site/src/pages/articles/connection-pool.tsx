import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import SideNote from '../../components/knowledge/SideNote'
import SmartTOC from '../../components/knowledge/SmartTOC'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'why-pool', text: '一、为什么需要连接池', level: 2 },
  { id: 'core-concepts', text: '二、核心概念', level: 2 },
  { id: 'hikaricp', text: '三、HikariCP详解', level: 2 },
  { id: 'druid', text: '四、Druid连接池', level: 2 },
  { id: 'configuration', text: '五、关键配置参数', level: 2 },
  { id: 'leak-detection', text: '六、连接泄漏检测', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function ConnectionPool({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              数据库连接池是<strong className="text-accent">预先创建并管理数据库连接的资源池</strong>，通过复用连接避免频繁创建和销毁的开销，提供连接监控、超时控制和泄漏检测等能力，显著提升应用性能和稳定性。
            </p>
          </blockquote>

          <Callout type="tip" title="核心价值">
            连接池将数据库连接的创建成本分摊到多次使用中，典型场景下可减少90%以上的连接建立时间，同时防止连接泄漏导致的资源耗尽问题。
          </Callout>

          <h2 id="why-pool" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            一、为什么需要连接池
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            每次创建数据库连接都需要经历TCP三次握手、身份验证、会话初始化等步骤，耗时通常在<strong>10-100ms</strong>之间。在高并发场景下，这种开销会成为性能瓶颈。
          </p>

          <DiagramBlock title="有无连接池的性能对比">
            {`graph LR
              subgraph 无连接池
                R1["请求1"] --> C1["创建连接50ms → SQL5ms → 关闭10ms = 65ms"]
                R2["请求2"] --> C2["创建连接50ms → SQL5ms → 关闭10ms = 65ms"]
                R3["请求3"] --> C3["创建连接50ms → SQL5ms → 关闭10ms = 65ms"]
              end
              subgraph 有连接池
                R4["请求1"] --> C4["获取1ms → SQL5ms → 归还0.1ms = 6.1ms"]
                R5["请求2"] --> C5["获取1ms → SQL5ms → 归还0.1ms = 6.1ms"]
                R6["请求3"] --> C6["获取1ms → SQL5ms → 归还0.1ms = 6.1ms"]
              end
            `}
          </DiagramBlock>

          <SideNote label="连接创建的开销">
            建立数据库连接的开销包括：<br/>
            • TCP三次握手（~1-10ms）<br/>
            • SSL/TLS握手（如启用，~5-20ms）<br/>
            • 数据库身份验证（~5-30ms）<br/>
            • 会话参数初始化（~1-5ms）<br/>
            • 驱动内部对象创建（~1-10ms）
          </SideNote>

          <h2 id="core-concepts" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            二、核心概念
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            连接池的核心机制围绕连接的生命周期管理展开，包含以下关键概念：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-parchment-warm rounded-paper-md border border-border-light">
              <h4 className="font-semibold text-ink mb-2">📦 最小空闲连接（minimumIdle）</h4>
              <p className="text-[13px] text-ink-muted">池中保持的最小连接数，即使没有请求也会维持这些连接，确保快速响应突发流量。</p>
            </div>
            <div className="p-4 bg-parchment-warm rounded-paper-md border border-border-light">
              <h4 className="font-semibold text-ink mb-2">📈 最大连接数（maximumPoolSize）</h4>
              <p className="text-[13px] text-ink-muted">池中允许的最大连接数，超过此数量的请求会被阻塞或拒绝，防止数据库过载。</p>
            </div>
            <div className="p-4 bg-parchment-warm rounded-paper-md border border-border-light">
              <h4 className="font-semibold text-ink mb-2">⏱️ 连接超时（connectionTimeout）</h4>
              <p className="text-[13px] text-ink-muted">从池中获取连接的最大等待时间，超时后抛出异常，避免无限期等待。</p>
            </div>
            <div className="p-4 bg-parchment-warm rounded-paper-md border border-border-light">
              <h4 className="font-semibold text-ink mb-2">🔄 空闲超时（idleTimeout）</h4>
              <p className="text-[13px] text-ink-muted">连接在池中空闲超过此时间后会被回收，释放资源，但不低于minimumIdle。</p>
            </div>
            <div className="p-4 bg-parchment-warm rounded-paper-md border border-border-light">
              <h4 className="font-semibold text-ink mb-2">❤️ 心跳检测（keepaliveTime）</h4>
              <p className="text-[13px] text-ink-muted">定期发送轻量查询验证连接有效性，防止因网络中断或数据库重启导致的死连接。</p>
            </div>
            <div className="p-4 bg-parchment-warm rounded-paper-md border border-border-light">
              <h4 className="font-semibold text-ink mb-2">⚠️ 泄漏检测（leakDetectionThreshold）</h4>
              <p className="text-[13px] text-ink-muted">连接被借出超过此时间未归还会触发警告，帮助发现代码中忘记关闭连接的问题。</p>
            </div>
          </div>

          <h2 id="hikaricp" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            三、HikariCP详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">HikariCP</code> 是目前性能最优的Java连接池，Spring Boot 2.0+的默认选择。它以"零开销"为设计理念，通过字节码优化和无锁数据结构实现极致性能。
          </p>

          <Playground
            code={`import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class HikariCPExample {
    public static void main(String[] args) {
        // 配置连接池
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:mysql://localhost:3306/testdb");
        config.setUsername("root");
        config.setPassword("password");
        
        // 核心参数配置
        config.setMaximumPoolSize(10);           // 最大连接数
        config.setMinimumIdle(5);                // 最小空闲连接
        config.setConnectionTimeout(30000);      // 获取连接超时30秒
        config.setIdleTimeout(600000);           // 空闲连接存活10分钟
        config.setMaxLifetime(1800000);          // 连接最大生命周期30分钟
        config.setKeepaliveTime(30000);          // 每30秒心跳检测
        config.setLeakDetectionThreshold(60000); // 泄漏检测阈值60秒
        
        // 连接测试查询
        config.setConnectionTestQuery("SELECT 1");
        
        // 创建数据源
        HikariDataSource dataSource = new HikariDataSource(config);
        
        // 使用连接
        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(
                 "SELECT id, name FROM users WHERE age > ?")) {
            
            pstmt.setInt(1, 18);
            ResultSet rs = pstmt.executeQuery();
            
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id") + 
                                 ", Name: " + rs.getString("name"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dataSource.close(); // 关闭连接池
        }
    }
}`}
            language="java"
            highlights={[12, 13, 14, 15, 16, 17, 18, 19]}
            filename="HikariCPExample.java"
            description="HikariCP基本配置与使用"
          />

          <Callout type="warning" title="maxLifetime配置陷阱">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">maxLifetime</code> 必须小于数据库的连接超时时间（如MySQL的 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">wait_timeout</code>），否则会导致使用已失效的连接。建议设置为数据库超时的70-80%。
          </Callout>

          <h2 id="druid" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            四、Druid连接池
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Druid</code> 是阿里巴巴开源的连接池，以强大的监控功能著称，提供SQL统计、防火墙、慢查询检测等企业级特性。
          </p>

          <Playground
            code={`import com.alibaba.druid.pool.DruidDataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DruidExample {
    public static void main(String[] args) throws Exception {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setUrl("jdbc:mysql://localhost:3306/testdb");
        dataSource.setUsername("root");
        dataSource.setPassword("password");
        
        // 连接池配置
        dataSource.setInitialSize(5);              // 初始连接数
        dataSource.setMaxActive(20);               // 最大活跃连接
        dataSource.setMinIdle(5);                  // 最小空闲连接
        dataSource.setMaxWait(60000);              // 获取连接最大等待时间
        
        // 监控配置
        dataSource.setFilters("stat,wall,log4j");  // 启用统计、防火墙、日志
        dataSource.setTimeBetweenEvictionRunsMillis(60000); // 检测间隔
        dataSource.setMinEvictableIdleTimeMillis(300000);   // 最小空闲时间
        dataSource.setMaxEvictableIdleTimeMillis(900000);   // 最大空闲时间
        
        // SQL防火墙配置
        dataSource.setValidationQuery("SELECT 1");
        dataSource.setTestWhileIdle(true);
        dataSource.setTestOnBorrow(false);
        dataSource.setTestOnReturn(false);
        
        dataSource.init(); // 初始化
        
        // 使用连接
        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(
                 "SELECT * FROM users WHERE id = ?")) {
            
            pstmt.setInt(1, 1);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                System.out.println("Name: " + rs.getString("name"));
            }
        }
        
        // 输出监控信息
        System.out.println("活跃连接数: " + dataSource.getActiveCount());
        System.out.println("总创建连接数: " + dataSource.getCreateCount());
        System.out.println("总关闭连接数: " + dataSource.getDestroyCount());
        
        dataSource.close();
    }
}`}
            language="java"
            highlights={[14, 15, 16, 17, 20, 21, 22, 23, 26, 27, 28, 29]}
            filename="DruidExample.java"
            description="Druid连接池配置与监控"
          />

          <SideNote label="Druid vs HikariCP">
            <strong>HikariCP</strong>：性能最优，适合追求极致吞吐的场景<br/>
            <strong>Druid</strong>：监控强大，适合需要详细SQL分析和安全防护的企业应用<br/>
            选择建议：中小型项目用HikariCP，大型系统需要审计和监控时用Druid
          </SideNote>

          <h2 id="configuration" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            五、关键配置参数
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            合理配置连接池参数对性能和稳定性至关重要。以下是经过生产环境验证的最佳实践：
          </p>

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border p-2 text-left font-semibold text-ink">参数</th>
                <th className="border border-border p-2 text-left font-semibold text-ink">推荐值</th>
                <th className="border border-border p-2 text-left font-semibold text-ink">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2 font-mono text-ink-muted">maximumPoolSize</td>
                <td className="border border-border p-2 text-ink-muted">CPU核数×2+1</td>
                <td className="border border-border p-2 text-ink-muted">根据数据库承载能力和应用并发量调整</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-mono text-ink-muted">minimumIdle</td>
                <td className="border border-border p-2 text-ink-muted">与maximumPoolSize相同</td>
                <td className="border border-border p-2 text-ink-muted">HikariCP官方建议固定大小池，避免动态扩缩容开销</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-mono text-ink-muted">connectionTimeout</td>
                <td className="border border-border p-2 text-ink-muted">30000ms (30秒)</td>
                <td className="border border-border p-2 text-ink-muted">获取连接超时时间，过长会导致请求堆积</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-mono text-ink-muted">maxLifetime</td>
                <td className="border border-border p-2 text-ink-muted">1800000ms (30分钟)</td>
                <td className="border border-border p-2 text-ink-muted">必须 &lt; 数据库wait_timeout，防止使用过期连接</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-mono text-ink-muted">idleTimeout</td>
                <td className="border border-border p-2 text-ink-muted">600000ms (10分钟)</td>
                <td className="border border-border p-2 text-ink-muted">仅当minimumIdle &lt; maximumPoolSize时生效</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-mono text-ink-muted">leakDetectionThreshold</td>
                <td className="border border-border p-2 text-ink-muted">60000ms (60秒)</td>
                <td className="border border-border p-2 text-ink-muted">开发环境启用，生产环境谨慎使用（有性能开销）</td>
              </tr>
            </tbody>
          </table>

          <Callout type="danger" title="连接池大小计算公式">
            <p className="mb-2"><strong>经验公式</strong>：连接数 = CPU核数 × 2 + 硬盘 spindle 数</p>
            <p className="mb-2">对于SSD硬盘，简化为：<strong>连接数 = CPU核数 × 2 + 1</strong></p>
            <p>例如：8核CPU + SSD → 最佳连接数 = 8 × 2 + 1 = 17</p>
            <p className="mt-2 text-[12px] text-ink-muted">注意：这是理论最优值，实际应根据压测结果调整。如果数据库成为瓶颈，应优先优化SQL而非增加连接数。</p>
          </Callout>

          <h2 id="leak-detection" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            六、连接泄漏检测
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            连接泄漏是指从池中获取连接后未正确关闭，导致连接无法归还到池中。长期泄漏会耗尽连接池，引发应用不可用。
          </p>

          <Playground
            code={`// ❌ 错误示例：忘记关闭连接（连接泄漏）
public void leakExample() throws SQLException {
    DataSource dataSource = getDataSource();
    Connection conn = dataSource.getConnection();
    PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM users");
    ResultSet rs = pstmt.executeQuery();
    
    // 处理结果...
    
    // 忘记关闭！连接永远无法归还到池中
    // rs.close();
    // pstmt.close();
    // conn.close();
}

// ✅ 正确示例：使用try-with-resources自动关闭
public void safeExample() throws SQLException {
    DataSource dataSource = getDataSource();
    
    try (Connection conn = dataSource.getConnection();
         PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM users");
         ResultSet rs = pstmt.executeQuery()) {
        
        // 处理结果...
        while (rs.next()) {
            System.out.println(rs.getString("name"));
        }
    } // 自动关闭rs、pstmt、conn
}

// ✅ 正确示例：手动关闭（Java 7之前）
public void manualCloseExample() throws SQLException {
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    
    try {
        conn = dataSource.getConnection();
        pstmt = conn.prepareStatement("SELECT * FROM users");
        rs = pstmt.executeQuery();
        
        // 处理结果...
    } finally {
        // 按相反顺序关闭
        if (rs != null) rs.close();
        if (pstmt != null) pstmt.close();
        if (conn != null) conn.close();
    }
}`}
            language="java"
            highlights={[1, 4, 5, 6, 12, 13, 14, 18, 20, 21, 22, 27, 33, 34, 35, 36, 37, 38, 39, 40]}
            filename="LeakDetection.java"
            description="连接泄漏示例与修复"
          />

          <Callout type="warning" title="泄漏检测的性能影响">
            HikariCP的泄漏检测通过包装Connection对象并记录借用时间实现，每次获取/归还连接都会产生额外开销。建议仅在开发和测试环境启用，生产环境通过代码审查和压力测试预防泄漏。
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区1：连接池越大越好">
            <p className="mb-2"><strong>错误认知</strong>：设置很大的maximumPoolSize可以支持更多并发</p>
            <p><strong>事实</strong>：过多的连接会导致数据库上下文切换开销增加，反而降低吞吐量。每个连接消耗约1-10MB内存，100个连接可能占用1GB内存。应根据压测结果找到最优值，通常10-50个连接足够大多数应用。</p>
          </Callout>

          <Callout type="danger" title="误区2：minimumIdle应该设得很小">
            <p className="mb-2"><strong>错误认知</strong>：设置较小的minimumIdle可以节省资源</p>
            <p><strong>事实</strong>：HikariCP作者强烈建议将minimumIdle设置为与maximumPoolSize相同，形成"固定大小池"。动态扩缩容会在流量突增时引入延迟，且增加代码复杂度。</p>
          </Callout>

          <Callout type="danger" title="误区3：不需要设置maxLifetime">
            <p className="mb-2"><strong>错误认知</strong>：让连接永久存在可以减少创建开销</p>
            <p><strong>事实</strong>：数据库和网络设备通常会主动关闭长时间空闲的连接（如MySQL的wait_timeout=8小时）。如果不设置maxLifetime，应用可能持有已失效的连接，导致随机出现的"Connection closed"异常。</p>
          </Callout>

          <Callout type="danger" title="误区4：连接池可以解决慢查询问题">
            <p className="mb-2"><strong>错误认知</strong>：增加连接池大小可以提升慢查询场景下的吞吐量</p>
            <p><strong>事实</strong>：慢查询的根本解决方案是优化SQL和索引。增加连接数只是掩盖问题，会导致数据库负载过高，甚至拖垮整个数据库集群。应先通过EXPLAIN分析执行计划，优化查询效率。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            八、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "为什么需要数据库连接池？直接创建连接有什么问题？",
                answer: "① 性能：创建连接需要TCP握手、身份验证等，耗时10-100ms，连接池复用连接可将开销降至1ms以内；② 资源控制：限制最大连接数，防止数据库过载；③ 连接管理：统一处理超时、泄漏检测、心跳保活等；④ 监控：提供连接使用情况、SQL统计等可观测性数据。"
              },
              {
                question: "HikariCP为什么比其它连接池快？",
                answer: "① 字节码优化：使用Javassist生成FastList替代ArrayList，减少边界检查；② 无锁设计：使用ConcurrentBag和ThreadLocal减少竞争；③ 智能检测：通过代理拦截方法调用，只在必要时执行验证；④ 精简代码：去除冗余功能，专注核心性能。实测比Tomcat JDBC Pool快10倍以上。"
              },
              {
                question: "如何确定连接池的最佳大小？",
                answer: "① 理论公式：连接数 = CPU核数 × 2 + 磁盘spindle数（SSD为1）；② 压测验证：通过JMeter/Gatling模拟真实负载，观察TPS、响应时间、CPU/IO利用率；③ 监控调整：根据生产环境的连接使用率、等待队列长度动态调整；④ 经验法则：Web应用通常10-50个连接，批处理任务可适当增加。关键是找到数据库饱和点前的最大值。"
              },
              {
                question: "连接泄漏如何检测和预防？",
                answer: "检测：① 启用leakDetectionThreshold记录超时未归还的连接；② 监控连接池的activeCount是否持续增长；③ 使用Arthas等工具追踪getConnection调用栈。预防：① 始终使用try-with-resources自动关闭；② 代码审查重点检查异常分支是否正确关闭；③ 集成测试模拟高并发场景验证连接回收；④ 使用SonarQube等静态分析工具检测潜在泄漏。"
              },
              {
                question: "Druid和HikariCP如何选择？",
                answer: "HikariCP优势：性能最优（零开销设计）、Spring Boot默认、社区活跃、维护简单。Druid优势：强大的SQL监控和统计、内置防火墙防SQL注入、支持扩展插件、阿里大规模生产验证。选择建议：中小型项目、微服务架构选HikariCP；大型企业应用、需要详细审计和安全防护选Druid。两者都成熟可靠，差异主要在功能和性能取舍。"
              },
              {
                question: "连接池中的连接为什么会失效？如何处理？",
                answer: "失效原因：① 数据库重启或网络中断；② 超过数据库的wait_timeout；③ 防火墙/NAT设备主动断开长连接；④ 数据库主动kill空闲会话。处理方式：① 设置maxLifetime小于数据库超时时间；② 启用keepaliveTime定期发送SELECT 1心跳；③ 配置testOnBorrow/testWhileIdle在使用前验证连接；④ 捕获SQLException并重试获取新连接。"
              },
              {
                question: "什么是连接池的'雪崩效应'？如何避免？",
                answer: "雪崩效应：当数据库短暂不可用时，所有请求阻塞等待连接，恢复瞬间大量请求同时涌入，再次压垮数据库，形成恶性循环。避免方法：① 设置合理的connectionTimeout，快速失败而非无限等待；② 使用熔断器（如Resilience4j）在数据库故障时降级；③ 实施限流保护数据库；④ 优雅降级策略，如返回缓存数据；⑤ 监控告警，及时发现和处理异常。"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
            九、知识关联
          </h2>
          <div className="bg-ink-soft/20 border border-border-light rounded-paper-md p-5 my-5">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">相关知识点</h3>
            <ul className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2">
              <li>• <strong>JDBC底层原理</strong>：连接池基于JDBC API构建，理解Connection生命周期有助于优化池配置</li>
              <li>• <strong>Hibernate ORM</strong>：Hibernate可配置使用外部连接池，需协调两者的超时和验证策略</li>
              <li>• <strong>Spring事务管理</strong>：Spring通过DataSourceTransactionManager管理连接池中的事务，需注意传播机制对连接持有的影响</li>
              <li>• <strong>SQL优化与索引</strong>：连接池不能替代SQL优化，慢查询应优先通过索引和执行计划调优解决</li>
            </ul>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />

        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
