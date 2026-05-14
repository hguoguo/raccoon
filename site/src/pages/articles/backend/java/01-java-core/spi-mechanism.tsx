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
  { id: 'overview', text: '一、SPI 机制概述', level: 2 },
  { id: 'core-concepts', text: '二、核心概念与规范', level: 2 },
  { id: 'jdk-spi', text: '三、JDK SPI 实现', level: 2 },
  { id: 'source-analysis', text: '3.1 ServiceLoader 源码分析', level: 3 },
  { id: 'usage-example', text: '3.2 使用示例', level: 3 },
  { id: 'dubbo-spi', text: '四、Dubbo SPI 增强', level: 2 },
  { id: 'comparison', text: '五、SPI vs API vs 依赖注入', level: 2 },
  { id: 'misconceptions', text: '六、常见误区', level: 2 },
  { id: 'interview', text: '七、面试真题', level: 2 },
  { id: 'related', text: '八、知识关联', level: 2 },
]

export default function SpiMechanism({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          {/* 1. 一句话定义 */}
          <section id="definition">
            <blockquote className="border-l-[3px] border-l-accent pl-4 py-2 my-6 bg-accent-glow rounded-r-paper-md">
              <p className="text-[15px] sm:text-base font-medium text-ink leading-[1.7]">
                SPI（Service Provider Interface）是 Java 提供的<strong className="text-accent">服务发现机制</strong>，允许框架在运行时动态加载接口实现类，
                实现"面向接口编程 + 插件化扩展"，是 JDBC、SLF4J、Dubbo 等框架解耦的核心设计模式。
              </p>
            </blockquote>
          </section>

          <Callout type="tip" title="为什么需要 SPI？">
            传统 API 由调用方控制实现（如 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">new ArrayList()</code>），而 SPI 反转了控制权：
            框架定义接口，第三方提供实现，框架通过配置文件自动发现并加载实现类，实现<strong className="text-accent">开闭原则</strong>（对扩展开放，对修改关闭）。
          </Callout>

          {/* 2. SPI 机制概述 */}
          <section id="overview">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              一、SPI 机制概述
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              SPI 的核心思想是<strong className="text-ink">接口与实现分离</strong>。框架定义标准接口，具体实现由第三方提供商（Provider）提供，
              通过约定好的配置文件位置，框架在运行时自动发现并实例化所有可用的实现类。
            </p>

            <DiagramBlock title="SPI 工作流程">
              <svg viewBox="0 0 700 280" className="w-full h-auto">
                {/* 框架层 */}
                <rect x="50" y="30" width="120" height="60" rx="8" fill="#3B82F6" opacity="0.9"/>
                <text x="110" y="55" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">框架层</text>
                <text x="110" y="72" textAnchor="middle" fill="white" fontSize="10">定义接口</text>
                
                {/* 箭头 */}
                <line x1="170" y1="60" x2="250" y2="60" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                {/* 配置文件 */}
                <rect x="250" y="30" width="140" height="60" rx="8" fill="#F59E0B" opacity="0.9"/>
                <text x="320" y="50" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">META-INF/services</text>
                <text x="320" y="68" textAnchor="middle" fill="white" fontSize="10">com.example.Driver</text>
                <text x="320" y="80" textAnchor="middle" fill="white" fontSize="9">→ MySQLDriver</text>
                
                {/* 箭头 */}
                <line x1="390" y1="60" x2="470" y2="60" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                {/* ServiceLoader */}
                <rect x="470" y="30" width="120" height="60" rx="8" fill="#8B5CF6" opacity="0.9"/>
                <text x="530" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ServiceLoader</text>
                <text x="530" y="72" textAnchor="middle" fill="white" fontSize="10">加载实现类</text>
                
                {/* 箭头向下 */}
                <line x1="530" y1="90" x2="530" y2="150" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                {/* 实现类 */}
                <rect x="470" y="150" width="120" height="50" rx="8" fill="#10B981" opacity="0.9"/>
                <text x="530" y="170" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">MySQLDriver</text>
                <text x="530" y="187" textAnchor="middle" fill="white" fontSize="10">(第三方实现)</text>
                
                {/* 箭头向左 */}
                <line x1="470" y1="175" x2="170" y2="175" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                {/* 应用层 */}
                <rect x="50" y="150" width="120" height="50" rx="8" fill="#EC4899" opacity="0.9"/>
                <text x="110" y="170" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">应用层</text>
                <text x="110" y="187" textAnchor="middle" fill="white" fontSize="10">使用接口</text>
                
                {/* 箭头标记 */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#64748B"/>
                  </marker>
                </defs>
              </svg>
            </DiagramBlock>

            <SideNote label="典型应用场景">
              <ul className="list-disc list-inside space-y-1 text-[12px] text-ink-muted">
                <li><strong className="text-ink">JDBC：</strong>不同数据库厂商提供 Driver 实现</li>
                <li><strong className="text-ink">SLF4J：</strong>日志框架绑定（Logback、Log4j2）</li>
                <li><strong className="text-ink">Dubbo：</strong>协议扩展、负载均衡策略</li>
                <li><strong className="text-ink">Spring Boot：</strong>自动配置 Starter</li>
              </ul>
            </SideNote>
          </section>

          {/* 3. 核心概念与规范 */}
          <section id="core-concepts">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              二、核心概念与规范
            </h2>

            <Playground
              code={`// 1. 定义服务接口（框架层）
package com.example;

public interface DatabaseDriver {
    void connect(String url);
    void execute(String sql);
}

// 2. 提供方实现接口（第三方 jar 包）
package com.mysql;

public class MySQLDriver implements DatabaseDriver {
    @Override
    public void connect(String url) {
        System.out.println("Connecting to MySQL: " + url);
    }
    
    @Override
    public void execute(String sql) {
        System.out.println("Executing SQL: " + sql);
    }
}

// 3. 配置文件（关键！）
// 路径：META-INF/services/com.example.DatabaseDriver
// 内容：com.mysql.MySQLDriver

// 4. 框架加载实现
ServiceLoader<DatabaseDriver> loader = 
    ServiceLoader.load(DatabaseDriver.class);

for (DatabaseDriver driver : loader) {
    driver.connect("jdbc:mysql://localhost:3306/test");
}`}
              language="java"
              highlights={[21, 22, 28]}
              filename="SPI_Structure.java"
              description="SPI 四大要素：接口定义、实现类、配置文件、ServiceLoader 加载"
            />

            <Callout type="warning" title="配置文件命名规范">
              配置文件必须放在 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">META-INF/services/</code> 目录下，
              文件名必须是<strong className="text-ink">接口的全限定名</strong>（如 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">com.example.DatabaseDriver</code>），
              文件内容为实现类的全限定名（每行一个，支持多个实现）。
            </Callout>
          </section>

          {/* 4. JDK SPI 实现 */}
          <section id="jdk-spi">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              三、JDK SPI 实现
            </h2>

            <h3 id="source-analysis" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              3.1 ServiceLoader 源码分析
            </h3>

            <Playground
              code={`// ServiceLoader 核心逻辑（简化版）
public final class ServiceLoader<S> implements Iterable<S> {
    private static final String PREFIX = "META-INF/services/";
    private final Class<S> service; // 服务接口
    private final ClassLoader loader; // 类加载器
    private LinkedHashMap<String, S> providers = new LinkedHashMap<>();
    private LazyIterator lookupIterator;
    
    // 加载入口
    public static <S> ServiceLoader<S> load(Class<S> service) {
        ClassLoader cl = Thread.currentThread().getContextClassLoader();
        return new ServiceLoader<>(service, cl);
    }
    
    private ServiceLoader(Class<S> svc, ClassLoader cl) {
        service = Objects.requireNonNull(svc, "Service interface cannot be null");
        loader = (cl == null) ? ClassLoader.getSystemClassLoader() : cl;
        reload(); // 触发加载
    }
    
    public void reload() {
        providers.clear();
        lookupIterator = new LazyIterator(service, loader);
    }
    
    // 懒加载迭代器
    private class LazyIterator implements Iterator<S> {
        private Enumeration<URL> configs = null;
        private Iterator<String> pending = null;
        private String nextName = null;
        
        public boolean hasNext() {
            if (pending == null || !pending.hasNext()) {
                if (configs == null) {
                    // 读取配置文件
                    String fullName = PREFIX + service.getName();
                    configs = loader.getResources(fullName);
                }
                while (pending == null || !pending.hasNext()) {
                    if (!configs.hasMoreElements()) {
                        return false;
                    }
                    pending = parse(configs.nextElement()); // 解析文件内容
                }
            }
            nextName = pending.next();
            return true;
        }
        
        public S next() {
            Class<?> c = Class.forName(nextName, false, loader);
            S provider = service.cast(c.newInstance()); // 反射实例化
            providers.put(nextName, provider);
            return provider;
        }
    }
    
    @Override
    public Iterator<S> iterator() {
        return new Iterator<S>() {
            private final Iterator<Map.Entry<String,S>> knownProviders = 
                providers.entrySet().iterator();
            
            public boolean hasNext() {
                return knownProviders.hasNext() || lookupIterator.hasNext();
            }
            
            public S next() {
                return knownProviders.hasNext() ? 
                    knownProviders.next().getValue() : lookupIterator.next();
            }
        };
    }
}`}
              language="java"
              highlights={[10, 19, 34, 37, 47, 51, 53]}
              filename="ServiceLoader_Source.java"
              description="ServiceLoader 通过读取 META-INF/services 配置文件，反射实例化实现类"
            />

            <SideNote label="关键设计点">
              <div className="text-[12px] text-ink-muted">
                <strong className="text-ink">懒加载：</strong>只有在遍历 iterator 时才真正加载类，避免不必要的资源消耗。<br/>
                <strong className="text-ink">缓存机制：</strong>已加载的实现类缓存在 providers Map 中，避免重复实例化。<br/>
                <strong className="text-ink">类加载器：</strong>默认使用线程上下文类加载器（TCCL），确保能加载到第三方 jar 包中的实现。
              </div>
            </SideNote>

            <h3 id="usage-example" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              3.2 使用示例
            </h3>

            <Playground
              code={`// 完整示例：JDBC Driver 加载
// 1. 定义接口（java.sql.Driver，JDK 内置）
public interface Driver {
    Connection connect(String url, Properties info) throws SQLException;
}

// 2. MySQL 实现（mysql-connector-java.jar）
// 文件：META-INF/services/java.sql.Driver
// 内容：com.mysql.cj.jdbc.Driver

// 3. PostgreSQL 实现（postgresql.jar）
// 文件：META-INF/services/java.sql.Driver
// 内容：org.postgresql.Driver

// 4. 应用代码
public class JdbcExample {
    public static void main(String[] args) throws Exception {
        // 传统方式：显式加载驱动（JDK 6 之前必需）
        Class.forName("com.mysql.cj.jdbc.Driver");
        
        // JDK 6+：ServiceLoader 自动发现（无需手动加载）
        ServiceLoader<Driver> loader = ServiceLoader.load(Driver.class);
        
        for (Driver driver : loader) {
            System.out.println("Found driver: " + driver.getClass().getName());
            // 输出：
            // Found driver: com.mysql.cj.jdbc.Driver
            // Found driver: org.postgresql.Driver
        }
        
        // DriverManager 内部也使用了 ServiceLoader
        Connection conn = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/test", "root", "password"
        );
    }
}`}
              language="java"
              highlights={[20, 23, 26, 32]}
              filename="JDBC_SPI_Example.java"
              description="JDBC 通过 SPI 机制自动发现并加载数据库驱动"
            />

            <Callout type="danger" title="JDK SPI 的局限性">
              <ul className="list-disc list-inside space-y-1 mt-2 text-[13px] text-ink-muted">
                <li><strong className="text-ink-light">全量加载：</strong>遍历所有实现类并实例化，无法按需加载</li>
                <li><strong className="text-ink-light">无缓存优化：</strong>每次迭代都重新解析配置文件</li>
                <li><strong className="text-ink-light">缺少扩展点：</strong>不支持自适应扩展、Wrapper 包装等高级特性</li>
                <li><strong className="text-ink-light">线程不安全：</strong>LazyIterator 非线程安全</li>
              </ul>
              <p className="mt-2 text-[13px] text-ink-muted">因此 Dubbo 等框架实现了自己的 SPI 机制来弥补这些缺陷。</p>
            </Callout>
          </section>

          {/* 5. Dubbo SPI 增强 */}
          <section id="dubbo-spi">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              四、Dubbo SPI 增强
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Dubbo 在 JDK SPI 基础上进行了深度增强，提供了更强大的扩展能力：
            </p>

            <Playground
              code={`// Dubbo SPI 配置文件格式（支持键值对）
// 路径：META-INF/dubbo/org.apache.dubbo.rpc.Protocol
// 内容：
dubbo=org.apache.dubbo.rpc.protocol.dubbo.DubboProtocol
http=org.apache.dubbo.rpc.protocol.http.HttpProtocol
thrift=org.apache.dubbo.rpc.protocol.thrift.ThriftProtocol

// 使用示例
@SPI("dubbo") // 指定默认实现
public interface Protocol {
    @Adaptive // 自适应扩展点
    <T> Exporter<T> export(Invoker<T> invoker) throws RpcException;
    
    @Adaptive
    <T> Invoker<T> refer(Class<T> type, URL url) throws RpcException;
}

// 获取扩展实现
Protocol protocol = ExtensionLoader.getExtensionLoader(Protocol.class)
    .getExtension("dubbo"); // 按需加载指定实现

// 自适应扩展：根据 URL 参数动态选择实现
Protocol adaptiveProtocol = ExtensionLoader.getExtensionLoader(Protocol.class)
    .getAdaptiveExtension(); // 生成代理类，运行时根据 URL 决定调用哪个实现`}
              language="java"
              highlights={[2, 9, 11, 19, 24]}
              filename="Dubbo_SPI_Example.java"
              description="Dubbo SPI 支持键值对配置、自适应扩展、按需加载"
            />

            <div className="overflow-x-auto my-5">
              <table className="w-full text-[12px] sm:text-[13px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 font-semibold text-ink">特性</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">JDK SPI</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">Dubbo SPI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">配置格式</td>
                    <td className="py-2 px-3 text-ink">纯类名列表</td>
                    <td className="py-2 px-3 text-ink">key=value 键值对</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">加载方式</td>
                    <td className="py-2 px-3 text-ink">全量加载</td>
                    <td className="py-2 px-3 text-ink">按需加载（getExtension）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">缓存</td>
                    <td className="py-2 px-3 text-ink">简单缓存</td>
                    <td className="py-2 px-3 text-ink">多级缓存（实例/类/适配器）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">自适应</td>
                    <td className="py-2 px-3 text-ink">不支持</td>
                    <td className="py-2 px-3 text-ink">@Adaptive 动态代理</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">Wrapper</td>
                    <td className="py-2 px-3 text-ink">不支持</td>
                    <td className="py-2 px-3 text-ink">支持 AOP 包装链</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. SPI vs API vs 依赖注入 */}
          <section id="comparison">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              五、SPI vs API vs 依赖注入
            </h2>

            <div className="overflow-x-auto my-5">
              <table className="w-full text-[12px] sm:text-[13px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 font-semibold text-ink">维度</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">API</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">SPI</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">依赖注入</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">控制权</td>
                    <td className="py-2 px-3 text-ink">调用方控制实现</td>
                    <td className="py-2 px-3 text-ink">框架控制实现</td>
                    <td className="py-2 px-3 text-ink">容器管理生命周期</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">耦合度</td>
                    <td className="py-2 px-3 text-ink">高耦合（硬编码）</td>
                    <td className="py-2 px-3 text-ink">低耦合（配置驱动）</td>
                    <td className="py-2 px-3 text-ink">最低（自动装配）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">扩展性</td>
                    <td className="py-2 px-3 text-ink">需修改代码</td>
                    <td className="py-2 px-3 text-ink">只需添加 jar 包</td>
                    <td className="py-2 px-3 text-ink">自动发现 Bean</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">典型场景</td>
                    <td className="py-2 px-3 text-ink">业务逻辑调用</td>
                    <td className="py-2 px-3 text-ink">框架插件系统</td>
                    <td className="py-2 px-3 text-ink">Spring IoC 容器</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. 常见误区 */}
          <section id="misconceptions">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              六、常见误区
            </h2>

            <Callout type="danger" title="误区一：SPI 配置文件可以放在任意位置">
              <span className="font-semibold text-ink-light">你以为的：</span>配置文件可以放在 resources 下的任意目录。<br/>
              <span className="font-semibold text-accent">实际：</span>JDK SPI 严格要求配置文件必须在 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">META-INF/services/</code> 目录下，且文件名必须是接口全限定名。Dubbo SPI 则使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">META-INF/dubbo/</code> 或 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">META-INF/dubbo/internal/</code>。
            </Callout>

            <Callout type="danger" title="误区二：SPI 实现类必须有默认构造函数">
              <span className="font-semibold text-ink-light">你以为的：</span>实现类可以通过依赖注入获取参数。<br/>
              <span className="font-semibold text-accent">实际：</span>ServiceLoader 通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Class.newInstance()</code> 反射创建实例，要求实现类必须有<strong className="text-rose">公共无参构造函数</strong>。复杂初始化逻辑应在构造函数或静态块中完成。
            </Callout>

            <Callout type="danger" title="误区三：SPI 适合高频调用的场景">
              <span className="font-semibold text-ink-light">你以为的：</span>SPI 性能很好，可以频繁使用。<br/>
              <span className="font-semibold text-accent">实际：</span>ServiceLoader 每次迭代都会解析配置文件并反射创建实例（除非手动缓存），性能较差。应在应用启动时一次性加载并缓存，避免在热点路径中使用。Dubbo SPI 通过多级缓存优化了这一问题。
            </Callout>
          </section>

          {/* 8. 面试真题 */}
          <section id="interview">
            <InterviewSection questions={[
              {
                question: "什么是 SPI？它的应用场景有哪些？",
                answer: "SPI（Service Provider Interface）是 Java 的服务发现机制，允许框架在运行时动态加载接口实现类。应用场景：① JDBC 驱动加载；② SLF4J 日志框架绑定；③ Dubbo 协议扩展；④ Spring Boot Starter 自动配置。核心价值是实现框架与实现的解耦，符合开闭原则。"
              },
              {
                question: "JDK SPI 的工作原理是什么？",
                answer: "① 框架定义接口；② 第三方在 META-INF/services/ 目录下创建以接口全限定名为文件名的配置文件；③ 文件内容为实现类全限定名；④ 框架通过 ServiceLoader.load() 读取配置文件；⑤ 反射实例化所有实现类；⑥ 返回迭代器供调用方使用。"
              },
              {
                question: "JDK SPI 有什么缺点？Dubbo SPI 做了哪些改进？",
                answer: "JDK SPI 缺点：① 全量加载，无法按需加载；② 无缓存优化；③ 不支持自适应扩展；④ 线程不安全。Dubbo SPI 改进：① 支持 key=value 配置，可按名称获取指定实现；② 多级缓存（实例/类/适配器）；③ @Adaptive 注解实现运行时动态代理；④ 支持 Wrapper 包装链（类似 AOP）；⑤ 线程安全。"
              },
              {
                question: "SPI 和 API 有什么区别？",
                answer: "API（Application Programming Interface）由调用方控制实现（如 new ArrayList()），耦合度高；SPI（Service Provider Interface）由框架控制实现，第三方提供实现并通过配置文件注册，耦合度低。简单说：API 是'我调用你'，SPI 是'你实现我'。"
              },
              {
                question: "如何在项目中自定义 SPI 扩展？",
                answer: "步骤：① 定义接口（如 com.example.Plugin）；② 创建实现类（如 com.example.impl.MyPlugin）；③ 在 resources/META-INF/services/ 下创建文件 com.example.Plugin；④ 文件内容写入实现类全限定名 com.example.impl.MyPlugin；⑤ 使用 ServiceLoader.load(Plugin.class) 加载；⑥ 遍历迭代器获取所有实现。注意实现类必须有公共无参构造函数。"
              },
              {
                question: "ServiceLoader 是线程安全的吗？如何正确使用？",
                answer: "ServiceLoader 本身不是线程安全的，其内部的 LazyIterator 在并发遍历时可能出现问题。正确做法：① 在单线程环境中使用；② 或在应用启动时一次性加载并缓存到 ConcurrentHashMap 中；③ 或使用同步包装器 Collections.synchronizedList()。Dubbo 的 ExtensionLoader 通过内部锁机制保证了线程安全。"
              }
            ]} />
          </section>

          {/* 9. 知识关联 */}
          <section id="related">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              八、知识关联
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-parchment-light border border-border rounded-paper-md">
                <div className="text-[10px] font-mono text-ink-ghost mb-1">前置知识</div>
                <div className="text-[13px] font-medium text-ink">反射机制（reflection）</div>
              </div>
              <div className="p-4 bg-accent-glow border border-accent/20 rounded-paper-md">
                <div className="text-[10px] font-mono text-accent mb-1">延伸知识</div>
                <div className="text-[13px] font-medium text-ink">设计模式、Spring Boot 自动配置</div>
              </div>
            </div>
          </section>

          {/* 文章导航，必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，不要用 <aside> 包裹！ */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
