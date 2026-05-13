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
  { id: 'java8-features', text: '一、Java 8 核心特性', level: 2 },
  { id: 'java9-11-features', text: '二、Java 9-11 重要更新', level: 2 },
  { id: 'java14-17-features', text: '三、Java 14-17 现代特性', level: 2 },
  { id: 'java18-21-features', text: '四、Java 18-21 最新进展', level: 2 },
  { id: 'virtual-threads', text: '五、虚拟线程详解', level: 2 },
  { id: 'zgc-shenandoah', text: '六、ZGC 与 Shenandoah', level: 2 },
  { id: 'migration-guide', text: '七、版本迁移指南', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function JavaNewFeatures({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Java 8~21 引入了函数式编程、模块化系统、记录类、密封类、虚拟线程等革命性特性，
              使 Java 从传统的面向对象语言演变为支持现代编程范式的多范式语言，显著提升了开发效率和运行时性能。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么关注新特性？">
            Java 每 6 个月发布一个新版本（自 Java 9 起），快速迭代带来了大量现代化特性。掌握这些特性可以编写更简洁、安全、高效的代码，同时充分利用硬件资源（如多核 CPU）。
          </Callout>

          <h2 id="java8-features" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Java 8 核心特性
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 8 是里程碑版本，引入了 Lambda 表达式、Stream API、Optional 等函数式编程特性，彻底改变了 Java 的编程风格。
          </p>

          <Playground
            code={`import java.util.*;
import java.util.stream.*;

public class Java8Features {
    
    // 1. Lambda 表达式
    public static void lambdaDemo() {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        
        // 传统方式
        Collections.sort(names, new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return a.compareTo(b);
            }
        });
        
        // Lambda 方式
        names.sort((a, b) -> a.compareTo(b));
        
        // 方法引用
        names.forEach(System.out::println);
    }
    
    // 2. Stream API
    public static void streamDemo() {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // 过滤偶数、平方、求和
        int sum = numbers.stream()
                        .filter(n -> n % 2 == 0)
                        .map(n -> n * n)
                        .reduce(0, Integer::sum);
        
        System.out.println("偶数平方和: " + sum); // 输出: 220
        
        // 并行流
        long count = numbers.parallelStream()
                           .filter(n -> n > 5)
                           .count();
        System.out.println("大于5的数: " + count); // 输出: 5
    }
    
    // 3. Optional
    public static void optionalDemo() {
        Optional<String> name = Optional.ofNullable(getName());
        
        // 避免空指针
        String result = name.orElse("Unknown");
        System.out.println("姓名: " + result);
        
        // 链式操作
        name.filter(n -> n.length() > 3)
            .map(String::toUpperCase)
            .ifPresent(System.out::println);
    }
    
    private static String getName() {
        return null; // 模拟可能返回 null
    }
    
    public static void main(String[] args) {
        lambdaDemo();
        streamDemo();
        optionalDemo();
    }
}`}
            language="java"
            highlights={[13, 21, 28, 40]}
            filename="Java8Features.java"
            description="Java 8 核心特性演示"
          />

          <DiagramBlock title="Java 8 Stream 操作流程">
            ```
            数据源 → 中间操作（filter/map/sorted） → 终端操作（collect/reduce/forEach）
                   ↓
            惰性求值：中间操作不会立即执行，直到终端操作触发
                   ↓
            并行流：自动利用多核 CPU 并行处理大数据集
            ```
          </DiagramBlock>

          <SideNote label="LTS 版本">
            Java 8 是长期支持（LTS）版本，至今仍被广泛使用。Oracle 提供付费支持到 2030 年，OpenJDK 社区也持续维护。
          </SideNote>

          <h2 id="java9-11-features" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Java 9-11 重要更新
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 9 引入了模块化系统（Project Jigsaw），Java 10 带来局部变量类型推断，Java 11 成为新的 LTS 版本并增强了 HTTP Client。
          </p>

          <Playground
            code={`// Java 9: 模块化系统
// module-info.java
module com.example.myapp {
    requires java.sql;
    requires com.fasterxml.jackson.databind;
    
    exports com.example.myapp.api;
    opens com.example.myapp.internal to com.fasterxml.jackson.databind;
}

// Java 10: 局部变量类型推断
var list = new ArrayList<String>();  // 编译器推断为 ArrayList<String>
var map = Map.of("key1", "value1", "key2", "value2");  // 不可变 Map
var stream = list.stream().filter(s -> s.length() > 3);

// Java 11: HTTP Client（标准 API）
import java.net.http.*;
import java.net.URI;

public class HttpClientDemo {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/data"))
            .header("Accept", "application/json")
            .GET()
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        System.out.println("状态码: " + response.statusCode());
        System.out.println("响应体: " + response.body());
        
        // 异步请求
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
              .thenApply(HttpResponse::body)
              .thenAccept(System.out::println)
              .join();
    }
}

// Java 11: 字符串新方法
String text = "  Hello World  ";
text.isBlank();        // true if empty or only whitespace
text.strip();          // "Hello World" (Unicode-aware trim)
text.repeat(3);        // "  Hello World    Hello World    Hello World  "
text.lines();          // Stream of lines`}
            language="java"
            highlights={[3, 12, 21, 43]}
            filename="Java9to11Features.java"
            description="Java 9-11 重要新特性"
          />

          <Callout type="warning" title="模块化系统的挑战">
            模块化虽然提供了更好的封装性和依赖管理，但也增加了项目配置的复杂度。许多第三方库尚未完全适配模块系统，可能需要使用 --add-opens 等命令行参数解决兼容性问题。
          </Callout>

          <h2 id="java14-17-features" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Java 14-17 现代特性
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 14 引入记录类（Records）和 instanceof 模式匹配，Java 15 引入密封类（Sealed Classes），Java 17 作为 LTS 版本整合了这些特性。
          </p>

          <Playground
            code={`// Java 14+: 记录类（Records）- 不可变数据载体
public record Point(int x, int y) {
    // 自动生成的构造函数、getter、equals、hashCode、toString
    
    // 自定义构造器（用于验证）
    public Point {
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException("坐标不能为负数");
        }
    }
    
    // 自定义方法
    public double distanceTo(Point other) {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + 
                        Math.pow(this.y - other.y, 2));
    }
}

// 使用记录类
Point p1 = new Point(3, 4);
Point p2 = new Point(6, 8);
System.out.println(p1.distanceTo(p2)); // 输出: 5.0
System.out.println(p1.x()); // 输出: 3（注意是 x() 不是 getX()）

// Java 14+: instanceof 模式匹配
Object obj = "Hello";
if (obj instanceof String str) {
    System.out.println(str.toUpperCase()); // 直接使用该变量
}

// Java 16+: switch 表达式
String grade = switch (score) {
    case 90, 100 -> "A";
    case 80, 89 -> "B";
    case 70, 79 -> "C";
    case 60, 69 -> "D";
    default -> "F";
};

// Java 17: 密封类（Sealed Classes）
public sealed class Shape 
    permits Circle, Rectangle, Triangle {
    // 只有 permit 中声明的子类才能继承
}

final class Circle extends Shape {
    private final double radius;
    public Circle(double radius) { this.radius = radius; }
}

final class Rectangle extends Shape {
    private final double width, height;
    public Rectangle(double w, double h) { 
        this.width = w; 
        this.height = h; 
    }
}

non-sealed class Triangle extends Shape {
    // non-sealed 允许其他类继续继承
}

// 配合 pattern matching 使用
public double area(Shape shape) {
    return switch (shape) {
        case Circle c -> Math.PI * c.radius * c.radius;
        case Rectangle r -> r.width * r.height;
        case Triangle t -> 0.5 * base(t) * height(t);
    };
}`}
            language="java"
            highlights={[2, 21, 27, 35, 45]}
            filename="Java14to17Features.java"
            description="Java 14-17 现代特性"
          />

          <DiagramBlock title="密封类的继承层次">
            ```
            sealed class Shape (permits Circle, Rectangle, Triangle)
            ├── final class Circle         ← 不允许再被继承
            ├── final class Rectangle      ← 不允许再被继承
            └── non-sealed class Triangle  ← 允许其他类继承
            
            优势：编译器可穷尽检查，switch 无需 default 分支
            ```
          </DiagramBlock>

          <SideNote label="Records vs Lombok">
            Records 提供了 Lombok @Data 的部分功能，但它是语言级别的特性，无需额外依赖。Records 专注于不可变数据载体，不支持 setter 方法，更适合 DTO 和值对象场景。
          </SideNote>

          <h2 id="java18-21-features" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Java 18-21 最新进展
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 18 简化了 UTF-8 作为默认编码，Java 19-21 引入了虚拟线程（Project Loom）、结构化并发和作用域值等并发编程革新。
          </p>

          <Playground
            code={`// Java 21: 虚拟线程（Virtual Threads）
import java.util.concurrent.*;

public class VirtualThreadDemo {
    
    // 传统平台线程
    public static void platformThreadDemo() throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(100);
        
        for (int i = 0; i < 10000; i++) {
            executor.submit(() -> {
                try {
                    Thread.sleep(1000); // 模拟 I/O 等待
                    System.out.println("任务完成");
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }
        
        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.MINUTES);
    }
    
    // 虚拟线程（轻量级，可创建百万级）
    public static void virtualThreadDemo() throws Exception {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 1_000_000; i++) {
                executor.submit(() -> {
                    try {
                        Thread.sleep(1000); // 阻塞但不占用平台线程
                        System.out.println("虚拟线程任务完成");
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                });
            }
        } // 自动关闭，等待所有任务完成
    }
    
    // Java 21: 结构化并发（预览特性）
    public static void structuredConcurrencyDemo() throws Exception {
        try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
            Future<String> user = scope.fork(() -> fetchUser());
            Future<Integer> order = scope.fork(() -> fetchOrderCount());
            
            scope.join();          // 等待所有子任务
            scope.throwIfFailed(); // 如果任一任务失败则抛出异常
            
            System.out.println(user.resultNow() + ", 订单数: " + order.resultNow());
        }
    }
    
    private static String fetchUser() {
        return "张三";
    }
    
    private static int fetchOrderCount() {
        return 42;
    }
    
    public static void main(String[] args) throws Exception {
        virtualThreadDemo();
        structuredConcurrencyDemo();
    }
}

// Java 19+: 文本块（Text Blocks）- 正式成为标准
String html = """
    <html>
        <body>
            <p>Hello, World!</p>
        </body>
    </html>
    """;

String json = """
    {
        "name": "张三",
        "age": 25,
        "city": "北京"
    }
    """;`}
            language="java"
            highlights={[27, 44, 67]}
            filename="Java18to21Features.java"
            description="Java 18-21 最新特性"
          />

          <Callout type="tip" title="虚拟线程的优势">
            虚拟线程由 JVM 调度而非操作系统，内存占用仅几 KB（平台线程约 1 MB），可以轻松创建数百万个虚拟线程。特别适合 I/O 密集型应用（如 Web 服务器、数据库连接池）。
          </Callout>

          <h2 id="virtual-threads" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、虚拟线程详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            虚拟线程（Virtual Threads，Project Loom）是 Java 21 的核心特性，实现了用户态线程，彻底改变了 Java 的并发模型。
          </p>

          <DiagramBlock title="平台线程 vs 虚拟线程">
            | 特性 | 平台线程 | 虚拟线程 |
            |------|---------|---------|
            | 调度者 | 操作系统 | JVM |
            | 栈大小 | ~1 MB | ~几 KB |
            | 最大数量 | 数千 | 数百万 |
            | 上下文切换 | 昂贵（系统调用） | 廉价（用户态） |
            | 阻塞行为 | 阻塞平台线程 | 挂载/卸载，不阻塞平台线程 |
            | 适用场景 | CPU 密集型 | I/O 密集型 |
            | 调试难度 | 成熟工具 | 较新，工具链完善中 |
          </DiagramBlock>

          <Playground
            code={`import java.util.concurrent.*;

public class VirtualThreadDeepDive {
    
    // 对比测试：平台线程 vs 虚拟线程
    public static void comparisonTest() throws Exception {
        int taskCount = 100_000;
        
        // 平台线程
        long start = System.currentTimeMillis();
        try (var executor = Executors.newFixedThreadPool(100)) {
            for (int i = 0; i < taskCount; i++) {
                executor.submit(() -> {
                    simulateIoOperation();
                    return null;
                });
            }
        }
        long platformTime = System.currentTimeMillis() - start;
        
        // 虚拟线程
        start = System.currentTimeMillis();
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < taskCount; i++) {
                executor.submit(() -> {
                    simulateIoOperation();
                    return null;
                });
            }
        }
        long virtualTime = System.currentTimeMillis() - start;
        
        System.out.println("平台线程耗时: " + platformTime + "ms");
        System.out.println("虚拟线程耗时: " + virtualTime + "ms");
        System.out.println("性能提升: " + (platformTime / (double) virtualTime) + "x");
    }
    
    private static void simulateIoOperation() {
        try {
            Thread.sleep(10); // 模拟网络/数据库 I/O
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    // 虚拟线程的最佳实践
    public static void bestPractices() {
        // ✅ 推荐：每个任务一个虚拟线程
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            executor.submit(() -> handleRequest());
        }
        
        // ❌ 避免：在虚拟线程中使用线程池
        // 虚拟线程已经足够轻量，无需再池化
        
        // ✅ 推荐：使用信号量限制并发度
        Semaphore semaphore = new Semaphore(100);
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 10000; i++) {
                executor.submit(() -> {
                    try {
                        semaphore.acquire();
                        processTask();
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    } finally {
                        semaphore.release();
                    }
                });
            }
        }
    }
    
    private static void handleRequest() {
        // 处理 HTTP 请求等
    }
    
    private static void processTask() {
        // 处理具体任务
    }
    
    public static void main(String[] args) throws Exception {
        comparisonTest();
        bestPractices();
    }
}`}
            language="java"
            highlights={[25, 47, 59]}
            filename="VirtualThreadDeepDive.java"
            description="虚拟线程深度解析"
          />

          <SideNote label="迁移建议">
            对于现有的 ExecutorService 代码，只需将 newFixedThreadPool() 替换为 newVirtualThreadPerTaskExecutor() 即可享受虚拟线程带来的性能提升，无需重构业务逻辑。
          </SideNote>

          <h2 id="zgc-shenandoah" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、ZGC 与 Shenandoah
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ZGC（Z Garbage Collector）和 Shenandoah 是新一代低延迟垃圾收集器，目标是将 GC 停顿时间控制在 10ms 以内，适用于大内存（TB 级）和低延迟要求的场景。
          </p>

          <DiagramBlock title="GC 演进历程">
            {`
            Java 8:  Parallel GC / CMS（停顿时间：数百 ms ~ 数秒）
            Java 11: G1 GC（停顿时间：数十 ~ 数百 ms）
            Java 15: ZGC（实验性，停顿时间：< 10ms）
            Java 21: ZGC（生产就绪，停顿时间：< 1ms）
                     Shenandoah（Red Hat 主导，类似 ZGC）
            
            关键技术：读屏障（Read Barrier）、染色指针（Colored Pointers）、并发整理
            `}
          </DiagramBlock>

          <Playground
            code={`// ZGC 启用方式（JVM 参数）
// -XX:+UseZGC -Xmx16g -Xms16g

// 监控 ZGC 性能
// -Xlog:gc*:file=zgc.log:time,uptime:filecount=5,filesize=10M

// 对比不同 GC 的性能特征
public class GCComparison {
    
    /*
     * G1 GC（Java 11 默认）
     * 优点：平衡吞吐量和延迟，适合大多数应用
     * 缺点：大堆（>32GB）时停顿时间仍较长
     * 适用：通用场景
     */
    
    /*
     * ZGC（Java 21 生产就绪）
     * 优点：停顿时间 < 1ms，不受堆大小影响
     * 缺点：CPU 开销略高（约 15%）
     * 适用：低延迟要求、大内存应用
     * 
     * 启用命令：
     * java -XX:+UseZGC -Xmx64g MyApp
     */
    
    /*
     * Shenandoah（OpenJDK 12+）
     * 优点：类似 ZGC 的低延迟，由 Red Hat 主导
     * 缺点：生态支持略少于 ZGC
     * 适用：Red Hat OpenJDK 用户
     * 
     * 启用命令：
     * java -XX:+UseShenandoahGC -Xmx64g MyApp
     */
    
    public static void main(String[] args) {
        System.out.println("选择合适的 GC 取决于应用场景：");
        System.out.println("- 吞吐量优先：Parallel GC");
        System.out.println("- 平衡型：G1 GC");
        System.out.println("- 低延迟：ZGC / Shenandoah");
    }
}

// ZGC 的关键技术原理
/*
 * 1. 染色指针（Colored Pointers）
 *    - 使用 64 位指针的高位存储标记信息
 *    - 无需额外的标记位数组
 * 
 * 2. 读屏障（Load Barriers）
 *    - 每次读取对象引用时检查是否需要转发
 *    - 确保并发整理时的对象一致性
 * 
 * 3. 并发整理（Concurrent Compaction）
 *    - GC 线程与应用线程并发执行
 *    - 移动对象时更新所有引用
 * 
 * 4. 分层收集（Generational ZGC - Java 21）
 *    - 年轻代和老年代分别收集
 *    - 进一步提升吞吐量
 */`}
            language="java"
            highlights={[2, 31, 42]}
            filename="GCComparison.java"
            description="现代垃圾收集器对比"
          />

          <Callout type="info" title="ZGC 性能数据">
            根据 Oracle 官方基准测试，ZGC 在 4TB 堆大小下，P99 停顿时间为 1.3ms，平均停顿时间低于 0.5ms。相比 G1 GC，停顿时间降低了 90% 以上。
          </Callout>

          <h2 id="migration-guide" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、版本迁移指南
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            从旧版本 Java 迁移到新版本需要考虑兼容性、依赖升级和性能调优。以下是迁移的关键步骤和注意事项。
          </p>

          <Playground
            code={`// 迁移检查清单

// 1. 编译器和运行时兼容性
// Java 8 → Java 11/17/21
// - 移除的 API：javax.xml.bind（JAXB）、javax.annotation
// - 替代方案：添加独立依赖或使用 Jakarta EE

// Maven 依赖示例（Java 11+）
/*
<dependencies>
    <!-- JAXB（Java 11+ 需要显式添加） -->
    <dependency>
        <groupId>jakarta.xml.bind</groupId>
        <artifactId>jakarta.xml.bind-api</artifactId>
        <version>4.0.0</version>
    </dependency>
    <dependency>
        <groupId>org.glassfish.jaxb</groupId>
        <artifactId>jaxb-runtime</artifactId>
        <version>4.0.0</version>
    </dependency>
    
    <!-- Annotation API -->
    <dependency>
        <groupId>jakarta.annotation</groupId>
        <artifactId>jakarta.annotation-api</artifactId>
        <version>2.1.1</version>
    </dependency>
</dependencies>
*/

// 2. 模块化迁移（可选）
// 如果不使用模块化，添加以下 JVM 参数以开放内部 API
/*
--add-opens java.base/java.lang=ALL-UNNAMED
--add-opens java.base/java.util=ALL-UNNAMED
--add-opens java.desktop/java.awt=ALL-UNNAMED
*/

// 3. 废弃 API 检查
// 运行应用时使用：
// java -Xlint:deprecation -jar app.jar

// 4. 性能基准测试
// 对比新旧版本的性能和内存使用情况
/*
# 使用 JMH 进行微基准测试
@Benchmark
public void testOldWay() {
    // 旧版本实现
}

@Benchmark
public void testNewWay() {
    // 新版本实现（如虚拟线程）
}
*/

// 5. 渐进式迁移策略
/*
阶段 1：升级到最新的 LTS 版本（Java 17 或 21）
阶段 2：启用新特性（如 var、Records、Pattern Matching）
阶段 3：采用高级特性（如虚拟线程、ZGC）
阶段 4：考虑模块化（如果需要强封装）
*/

public class MigrationGuide {
    public static void main(String[] args) {
        System.out.println("Java 版本选择建议：");
        System.out.println("- 新项目：直接使用 Java 21（最新 LTS）");
        System.out.println("- 现有项目：逐步升级到 Java 17/21");
        System.out.println("- 关键系统：先在测试环境验证 3-6 个月");
    }
}`}
            language="java"
            highlights={[12, 38, 57]}
            filename="MigrationGuide.java"
            description="Java 版本迁移指南"
          />

          <SideNote label="LTS 版本选择">
            企业应用建议选择 LTS（长期支持）版本：Java 8、11、17、21。非 LTS 版本（如 12、13、14、15、16、18、19、20）仅提供 6 个月支持，适合尝鲜新特性但不适合生产环境。
          </SideNote>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区 1：新版本一定更快">
            Java 新版本的性能优化主要针对特定场景（如虚拟线程对 I/O 密集型应用）。对于 CPU 密集型任务，Java 8 和新版本的差异可能不明显。应通过基准测试验证实际效果，而非盲目升级。
          </Callout>

          <Callout type="danger" title="误区 2：必须使用模块化">
            模块化系统是可选的，许多项目仍然使用类路径（Classpath）模式。除非有强烈的封装需求或构建大型应用，否则不必强制迁移到模块化。使用 --add-opens 参数可以解决大部分兼容性问题。
          </Callout>

          <Callout type="danger" title="误区 3：虚拟线程万能">
            虚拟线程适合 I/O 密集型场景，但对于 CPU 密集型任务，过多的虚拟线程会导致频繁的上下文切换，反而降低性能。应根据工作负载类型选择合适的并发模型。
          </Callout>

          <Callout type="warning" title="误区 4：Records 可以完全替代 Lombok">
            Records 仅适用于不可变数据载体，不支持可变字段、builder 模式、自定义 equals/hashCode 等 Lombok 的高级功能。两者可以共存，根据场景选择使用。
          </Callout>

          <Callout type="warning" title="误区 5：ZGC 总是优于 G1">
            {"ZGC 的 CPU 开销比 G1 高约 15%，对于小堆（< 4GB）或对吞吐量敏感的应用，G1 可能是更好的选择。ZGC 的优势在于大堆和低延迟场景。"}
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Java 8 的 Lambda 表达式和匿名内部类有什么区别？",
              answer: "1) Lambda 是函数式接口的实例，匿名内部类是类的实例；2) Lambda 中的 this 指向外部类，匿名内部类的 this 指向自身；3) Lambda 编译后使用 invokedynamic 指令，匿名内部类生成独立的 .class 文件；4) Lambda 只能访问 effectively final 变量，匿名内部类要求显式 final。"
            },
            {
              question: "什么是虚拟线程？它与传统线程的区别是什么？",
              answer: "虚拟线程是 JVM 调度的轻量级线程，内存占用仅几 KB，可创建数百万个。传统线程由操作系统调度，栈大小约 1 MB，最多创建数千个。虚拟线程在 I/O 阻塞时会卸载，释放平台线程给其他任务，从而大幅提升并发能力。"
            },
            {
              question: "Records 和普通类有什么区别？适用场景是什么？",
              answer: "Records 是不可变的数据载体，自动生成构造函数、getter、equals、hashCode、toString。不支持 setter 方法和继承。适用于 DTO、值对象、配置类等不需要可变状态的场景。普通类适合需要封装复杂行为和状态的领域模型。"
            },
            {
              question: "ZGC 如何实现低延迟？它的核心技术是什么？",
              answer: "ZGC 通过三项核心技术实现低延迟：1) 染色指针：在对象引用中嵌入标记信息；2) 读屏障：读取对象时检查是否需要转发；3) 并发整理：GC 线程与应用线程并发执行，移动对象时更新所有引用。这些技术使得 GC 停顿时间与堆大小无关，始终保持在毫秒级。"
            },
            {
              question: "Java 模块化系统的目的是什么？有哪些优缺点？",
              answer: "目的：1) 强封装：控制哪些包对外可见；2) 可靠配置：显式声明依赖关系；3) 减少启动时间：只加载需要的模块。优点：更好的封装性和依赖管理。缺点：配置复杂、第三方库兼容性差、学习曲线陡峭。对于小型项目，类路径模式可能更合适。"
            },
            {
              question: "Stream API 的并行流什么时候使用？有什么陷阱？",
              answer: "适用场景：大数据集（>10000 元素）、CPU 密集型计算、元素间无共享状态。陷阱：1) 小数据集并行开销大于收益；2) I/O 密集型任务不适合并行；3) 非线程安全的操作会导致竞态条件；4) 并行流使用 ForkJoinPool.commonPool()，可能影响其他并行任务。应通过基准测试验证并行是否真的提升性能。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-paper-md bg-surface border border-border-light hover:border-accent transition-colors">
              <h3 className="font-semibold text-ink mb-2">前置知识</h3>
              <ul className="space-y-1 text-sm text-ink-muted">
                <li><a href="/docs/01-java-core/java-basics" className="text-accent hover:underline">Java 基础语法</a></li>
                <li><a href="/docs/05-functional-programming/lambda-expressions" className="text-accent hover:underline">Lambda 表达式</a></li>
              </ul>
            </div>
            <div className="p-4 rounded-paper-md bg-surface border border-border-light hover:border-accent transition-colors">
              <h3 className="font-semibold text-ink mb-2">延伸学习</h3>
              <ul className="space-y-1 text-sm text-ink-muted">
                <li><a href="/docs/03-multithreading/multi-threading-basics" className="text-accent hover:underline">多线程基础</a></li>
                <li><a href="/docs/04-jvm/garbage-collection" className="text-accent hover:underline">垃圾收集器详解</a></li>
              </ul>
            </div>
          </div>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      {/* SmartTOC 直接渲染，不用 aside 包裹 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
