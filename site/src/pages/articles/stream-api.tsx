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
  { id: 'overview', text: '一、整体架构', level: 2 },
  { id: 'stream-lifecycle', text: '二、Stream 生命周期', level: 2 },
  { id: 'intermediate-ops', text: '三、中间操作', level: 2 },
  { id: 'terminal-ops', text: '四、终端操作', level: 2 },
  { id: 'collector', text: '五、Collector 收集器', level: 2 },
  { id: 'parallel-stream', text: '六、并行流', level: 2 },
  { id: 'reduction', text: '七、规约操作', level: 2 },
  { id: 'performance', text: '八、性能优化', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'comparison', text: '十一、对比分析', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function StreamApi({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Stream API 是 Java 8 引入的<strong className="text-accent">声明式数据处理管道</strong>，支持对集合进行过滤、映射、排序、聚合等操作，以函数式风格替代传统的外部迭代。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 Stream？">
            传统集合操作需要使用 for 循环和临时变量，代码冗长且难以并行化。Stream API 通过声明式语法（描述"做什么"而非"怎么做"）和惰性求值机制，让数据处理更加简洁高效，并天然支持并行处理。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、整体架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Stream API 由三大核心组件构成：<strong>数据源</strong>（Source）、<strong>中间操作</strong>（Intermediate Operations）和<strong>终端操作</strong>（Terminal Operations）。整个流程采用惰性求值策略，只有在终端操作触发时才会真正执行计算。
          </p>

          <DiagramBlock title="Stream API 架构">
            {`┌─────────────────────────────────────────────┐
│           Stream 处理管道                  │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐                               │
│  │ 数据源   │ Collection / Array / IO       │
│  │ Source   │                               │
│  └────┬─────┘                               │
│       │                                     │
│       ▼                                     │
│  ┌──────────────────────────┐               │
│  │   中间操作（惰性）        │               │
│  │  filter / map / sorted   │ ◄── 可链式调用│
│  │  limit / skip / distinct │               │
│  └────┬─────────────────────┘               │
│       │                                     │
│       ▼                                     │
│  ┌──────────────────────────┐               │
│  │   终端操作（触发执行）    │               │
│  │  collect / reduce /      │               │
│  │  forEach / find / count  │               │
│  └──────────────────────────┘               │
│                                             │
└─────────────────────────────────────────────┘`}
          </DiagramBlock>

          <SideNote>
            Stream 不是数据结构，不存储数据，而是对数据源的计算视图。每次终端操作后，Stream 会被消耗，如需再次使用需重新创建。
          </SideNote>

          <h2 id="stream-lifecycle" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Stream 生命周期
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Stream 的生命周期分为三个阶段：创建、中间操作、终端操作。理解这一流程对于掌握 Stream 至关重要。
          </p>

          <Playground
            code={`import java.util.*;
import java.util.stream.*;

List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve");

// 1. 创建 Stream
Stream<String> stream = names.stream();

// 2. 中间操作（惰性求值，不会立即执行）
Stream<String> filtered = stream.filter(name -> name.length() > 3);
Stream<String> mapped = filtered.map(String::toUpperCase);
Stream<String> sorted = mapped.sorted();

// 3. 终端操作（触发实际计算）
List<String> result = sorted.collect(Collectors.toList());
System.out.println(result); // 输出: [ALICE, CHARLIE, DAVID]

// ⚠️ Stream 已被消耗，不能再次使用
// stream.forEach(System.out::println); // IllegalStateException!`}
            language="java"
            highlights={[7, 10, 11, 12, 15]}
            filename="StreamLifecycle.java"
            description="Stream 生命周期示例"
          />

          <Callout type="warning" title="Stream 只能使用一次">
            Stream 是一次性消费品，终端操作执行后 Stream 即被销毁。如果需要多次使用同一数据源，应重新创建 Stream 或使用 Supplier 封装创建逻辑。
          </Callout>

          <h2 id="intermediate-ops" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、中间操作
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            中间操作返回新的 Stream，可以链式调用。它们采用惰性求值策略，只有在终端操作触发时才会执行。常见的中间操作包括：
          </p>

          <Playground
            code={`import java.util.*;
import java.util.stream.*;

List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// 1. filter - 过滤
List<Integer> evens = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
System.out.println(evens); // 输出: [2, 4, 6, 8, 10]

// 2. map - 转换
List<String> squares = numbers.stream()
    .map(n -> n * n)
    .map(String::valueOf)
    .collect(Collectors.toList());
System.out.println(squares); // 输出: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

// 3. flatMap - 扁平化
List<List<String>> nested = Arrays.asList(
    Arrays.asList("a", "b"),
    Arrays.asList("c", "d")
);
List<String> flat = nested.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());
System.out.println(flat); // 输出: [a, b, c, d]

// 4. distinct - 去重
List<Integer> unique = Arrays.asList(1, 2, 2, 3, 3, 3).stream()
    .distinct()
    .collect(Collectors.toList());
System.out.println(unique); // 输出: [1, 2, 3]

// 5. sorted - 排序
List<Integer> sorted = numbers.stream()
    .sorted(Comparator.reverseOrder())
    .collect(Collectors.toList());
System.out.println(sorted); // 输出: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// 6. limit / skip - 截断
List<Integer> limited = numbers.stream()
    .skip(3)
    .limit(4)
    .collect(Collectors.toList());
System.out.println(limited); // 输出: [4, 5, 6, 7]`}
            language="java"
            highlights={[8, 14, 24, 30, 36, 42]}
            filename="IntermediateOperations.java"
            description="常用中间操作"
          />

          <SideNote>
            flatMap 用于将嵌套结构扁平化，常用于处理 List&lt;List&lt;T&gt;&gt; 或 Optional&lt;T&gt; 等场景。它是 map + flatten 的组合操作。
          </SideNote>

          <h2 id="terminal-ops" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、终端操作
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            终端操作触发 Stream 的实际计算，并产生最终结果。执行后 Stream 被消耗，不能再使用。终端操作分为三类：归约、收集和遍历。
          </p>

          <Playground
            code={`import java.util.*;
import java.util.stream.*;

List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// 1. collect - 收集到集合
List<Integer> evenList = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
System.out.println(evenList); // 输出: [2, 4, 6, 8, 10]

Set<Integer> evenSet = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toSet());
System.out.println(evenSet); // 输出: [2, 4, 6, 8, 10]

// 2. reduce - 归约
Optional<Integer> sum = numbers.stream().reduce(Integer::sum);
System.out.println(sum.orElse(0)); // 输出: 55

Integer product = numbers.stream().reduce(1, (a, b) -> a * b);
System.out.println(product); // 输出: 3628800

// 3. forEach - 遍历（无返回值）
numbers.stream().forEach(System.out::print);
// 输出: 12345678910

// 4. find - 查找
Optional<Integer> first = numbers.stream().findFirst();
System.out.println(first.orElse(-1)); // 输出: 1

Optional<Integer> any = numbers.parallelStream().findAny();
System.out.println(any.orElse(-1)); // 输出: 任意元素

// 5. match - 匹配
boolean allEven = numbers.stream().allMatch(n -> n > 0);
System.out.println(allEven); // 输出: true

boolean anyEven = numbers.stream().anyMatch(n -> n % 2 == 0);
System.out.println(anyEven); // 输出: true

boolean noneNegative = numbers.stream().noneMatch(n -> n < 0);
System.out.println(noneNegative); // 输出: true

// 6. count - 计数
long count = numbers.stream().count();
System.out.println(count); // 输出: 10`}
            language="java"
            highlights={[9, 14, 18, 21, 25, 29, 32, 36, 39, 42, 46]}
            filename="TerminalOperations.java"
            description="常用终端操作"
          />

          <h2 id="collector" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Collector 收集器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Collectors 工具类提供了丰富的收集器，用于将 Stream 元素聚合成各种数据结构。这是 Stream API 最强大的功能之一。
          </p>

          <Playground
            code={`import java.util.*;
import java.util.stream.*;

class Employee {
    String name;
    String department;
    double salary;
    
    Employee(String name, String department, double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }
    
    @Override
    public String toString() {
        return name + "(" + department + ", " + salary + ")";
    }
}

List<Employee> employees = Arrays.asList(
    new Employee("Alice", "Engineering", 8000),
    new Employee("Bob", "Marketing", 6000),
    new Employee("Charlie", "Engineering", 9000),
    new Employee("David", "Marketing", 7000),
    new Employee("Eve", "HR", 5500)
);

// 1. toList / toSet / toMap
List<String> names = employees.stream()
    .map(e -> e.name)
    .collect(Collectors.toList());
System.out.println(names); // 输出: [Alice, Bob, Charlie, David, Eve]

Map<String, Double> salaryMap = employees.stream()
    .collect(Collectors.toMap(e -> e.name, e -> e.salary));
System.out.println(salaryMap.get("Alice")); // 输出: 8000.0

// 2. groupingBy - 分组
Map<String, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(e -> e.department));
System.out.println(byDept.get("Engineering")); 
// 输出: [Alice(Engineering, 8000.0), Charlie(Engineering, 9000.0)]

// 3. partitioningBy - 分区
Map<Boolean, List<Employee>> bySalary = employees.stream()
    .collect(Collectors.partitioningBy(e -> e.salary > 7000));
System.out.println("高薪: " + bySalary.get(true).size());  // 输出: 高薪: 2
System.out.println("低薪: " + bySalary.get(false).size()); // 输出: 低薪: 3

// 4. summarizing - 统计摘要
DoubleSummaryStatistics stats = employees.stream()
    .collect(Collectors.summarizingDouble(e -> e.salary));
System.out.println("平均值: " + stats.getAverage()); // 输出: 平均值: 7100.0
System.out.println("最大值: " + stats.getMax());     // 输出: 最大值: 9000.0
System.out.println("最小值: " + stats.getMin());     // 输出: 最小值: 5500.0

// 5. joining - 字符串拼接
String allNames = employees.stream()
    .map(e -> e.name)
    .collect(Collectors.joining(", ", "[", "]"));
System.out.println(allNames); // 输出: [Alice, Bob, Charlie, David, Eve]`}
            language="java"
            highlights={[32, 36, 41, 47, 52, 58]}
            filename="Collectors.java"
            description="常用收集器"
          />

          <h2 id="parallel-stream" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、并行流
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            并行流利用 Fork/Join 框架自动将任务拆分到多个线程执行，适合 CPU 密集型的大数据处理。但需要注意线程安全和性能开销。
          </p>

          <Playground
            code={`import java.util.*;
import java.util.stream.*;

List<Integer> numbers = IntStream.rangeClosed(1, 1000000)
    .boxed()
    .collect(Collectors.toList());

// 1. 串行流
long start = System.nanoTime();
long sum1 = numbers.stream()
    .filter(n -> n % 2 == 0)
    .mapToLong(n -> n * n)
    .sum();
long time1 = System.nanoTime() - start;
System.out.println("串行耗时: " + time1 / 1_000_000 + "ms, 结果: " + sum1);

// 2. 并行流
start = System.nanoTime();
long sum2 = numbers.parallelStream()
    .filter(n -> n % 2 == 0)
    .mapToLong(n -> n * n)
    .sum();
long time2 = System.nanoTime() - start;
System.out.println("并行耗时: " + time2 / 1_000_000 + "ms, 结果: " + sum2);

// 3. 注意事项：避免共享可变状态
// ❌ 错误示例（线程不安全）
// List<Integer> results = new ArrayList<>();
// numbers.parallelStream().forEach(results::add);

// ✅ 正确示例（使用 collect）
List<Integer> safeResults = numbers.parallelStream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
System.out.println("安全结果数量: " + safeResults.size()); // 输出: 500000

// 4. 自定义线程池（高级用法）
ForkJoinPool customPool = new ForkJoinPool(4);
long sum3 = customPool.submit(() ->
    numbers.parallelStream()
        .filter(n -> n % 2 == 0)
        .mapToLong(n -> n * n)
        .sum()
).get();
System.out.println("自定义线程池结果: " + sum3);
customPool.shutdown();`}
            language="java"
            highlights={[10, 19, 32, 39]}
            filename="ParallelStream.java"
            description="并行流使用与注意事项"
          />

          <Callout type="danger" title="并行流的陷阱">
            并行流并非总是更快！以下情况应避免使用：
1. **数据量小**：线程调度开销超过并行收益。
2. **I/O 密集型**：阻塞操作会导致线程浪费。
3. **共享可变状态**：forEach 等非线程安全操作会导致数据竞争。
4. **有序依赖**：如 sorted 会抵消并行优势。

最佳实践：优先使用 collect 而非 forEach，确保操作无状态且无副作用。
          </Callout>

          <h2 id="reduction" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、规约操作
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            规约（Reduction）是将 Stream 元素聚合为单个值的操作，包括 sum、max、min、average 等。reduce 方法是最通用的规约操作。
          </p>

          <Playground
            code={`import java.util.*;
import java.util.stream.*;

List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// 1. 基本规约
Optional<Integer> sum = numbers.stream().reduce(Integer::sum);
System.out.println(sum.orElse(0)); // 输出: 55

Optional<Integer> max = numbers.stream().reduce(Integer::max);
System.out.println(max.orElse(0)); // 输出: 10

Optional<Integer> min = numbers.stream().reduce(Integer::min);
System.out.println(min.orElse(0)); // 输出: 1

// 2. 带初始值的规约
Integer product = numbers.stream().reduce(1, (a, b) -> a * b);
System.out.println(product); // 输出: 3628800

// 3. 并行友好的规约（三参数版本）
// identity: 初始值
// accumulator: 累加器（串行执行）
// combiner: 组合器（并行时合并结果）
Integer parallelSum = numbers.parallelStream().reduce(
    0,
    Integer::sum,
    Integer::sum
);
System.out.println(parallelSum); // 输出: 55

// 4. 自定义规约：字符串拼接
List<String> words = Arrays.asList("Hello", "World", "Java", "Stream");
String concatenated = words.stream()
    .reduce("", (a, b) -> a + " " + b)
    .trim();
System.out.println(concatenated); // 输出: Hello World Java Stream

// 5. 复杂对象规约
class Transaction {
    String type;
    double amount;
    
    Transaction(String type, double amount) {
        this.type = type;
        this.amount = amount;
    }
}

List<Transaction> transactions = Arrays.asList(
    new Transaction("income", 1000),
    new Transaction("expense", -300),
    new Transaction("income", 2000),
    new Transaction("expense", -500)
);

double balance = transactions.stream()
    .mapToDouble(t -> t.amount)
    .sum();
System.out.println("余额: " + balance); // 输出: 余额: 2200.0`}
            language="java"
            highlights={[7, 10, 13, 17, 23, 33, 53]}
            filename="Reduction.java"
            description="规约操作详解"
          />

          <h2 id="performance" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、性能优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Stream API 的性能取决于操作顺序、数据规模和并行策略。合理的优化可以显著提升执行效率。
          </p>

          <Playground
            code={`import java.util.*;
import java.util.stream.*;

List<Integer> numbers = IntStream.rangeClosed(1, 1000000)
    .boxed()
    .collect(Collectors.toList());

// ✅ 优化 1：先过滤再映射（减少不必要的计算）
long start = System.nanoTime();
long result1 = numbers.stream()
    .filter(n -> n % 2 == 0)      // 先过滤，减少后续操作的数据量
    .map(n -> n * n)              // 再映射
    .limit(100)                   // 短路操作
    .sum();
long time1 = System.nanoTime() - start;
System.out.println("优化后耗时: " + time1 / 1_000_000 + "ms");

// ❌ 反例：先映射再过滤（浪费计算资源）
start = System.nanoTime();
long result2 = numbers.stream()
    .map(n -> n * n)              // 对所有元素计算平方
    .filter(n -> n % 4 == 0)      // 再过滤
    .limit(100)
    .sum();
long time2 = System.nanoTime() - start;
System.out.println("未优化耗时: " + time2 / 1_000_000 + "ms");

// ✅ 优化 2：使用 primitive Stream（避免装箱拆箱）
int sum1 = IntStream.rangeClosed(1, 1000000).sum(); // 快
Integer sum2 = IntStream.rangeClosed(1, 1000000)
    .boxed()
    .reduce(0, Integer::sum); // 慢（装箱开销）

// ✅ 优化 3：合理选择并行阈值
// 数据量 < 1000：使用串行流
// 数据量 1000-10000：根据 CPU 核心数决定
// 数据量 > 10000：优先考虑并行流

// ✅ 优化 4：避免在 Stream 中执行 I/O 或阻塞操作
// ❌ 错误示例
// urls.stream().forEach(url -> download(url)); // 阻塞所有线程

// ✅ 正确示例：使用 CompletableFuture 异步处理
// urls.stream()
//     .map(url -> CompletableFuture.supplyAsync(() -> download(url)))
//     .forEach(CompletableFuture::join);`}
            language="java"
            highlights={[10, 20, 30, 31]}
            filename="PerformanceOptimization.java"
            description="Stream 性能优化技巧"
          />

          <SideNote>
            惰性求值是 Stream 性能优化的关键。中间操作不会立即执行，而是在终端操作触发时一次性完成整个管道的计算。这使得 JVM 可以进行短路优化和操作融合。
          </SideNote>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1：并行流总是比串行流快">
            <strong>错误理解：</strong>parallelStream() 一定比 stream() 快。<br/>
            <strong>正确理解：</strong>并行流的优势取决于数据规模、操作类型和 CPU 核心数。小数据量（&lt;1000）或 I/O 密集型操作中，线程调度开销可能超过并行收益。此外，非线程安全操作（如共享可变状态）会导致数据错误或性能下降。应根据实际场景测试选择。
          </Callout>

          <Callout type="danger" title="误区 2：Stream 可以重复使用">
            <strong>错误理解：</strong>Stream 像 Iterator 一样可以多次遍历。<br/>
            <strong>正确理解：</strong>Stream 是一次性消费品，终端操作执行后即被销毁。尝试再次使用会抛出 IllegalStateException。如需多次使用，应重新从数据源创建 Stream，或使用 Supplier 封装创建逻辑。
          </Callout>

          <Callout type="danger" title="误区 3：forEach 是终端操作的最佳选择">
            <strong>错误理解：</strong>forEach 是最常用的终端操作，应该优先使用。<br/>
            <strong>正确理解：</strong>forEach 是副作用操作，不适合函数式编程范式。在并行流中，forEach 的执行顺序不确定，可能导致数据竞争。应优先使用 collect、reduce 等无副作用的终端操作。如果只需遍历，传统 for 循环可能更清晰高效。
          </Callout>

          <Callout type="danger" title="误区 4：Stream 操作顺序不影响性能">
            <strong>错误理解：</strong>filter、map、sorted 等操作的顺序可以随意调整。<br/>
            <strong>正确理解：</strong>操作顺序对性能影响巨大。应将过滤操作放在前面，减少后续操作的数据量；短路操作（limit、findFirst）应尽早出现；排序操作应尽量靠后。例如：filter → map → limit 比 map → filter → limit 更高效。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "Stream API 的核心特点是什么？",
                answer: "Stream API 有四大核心特点：\n1. **声明式编程**：描述'做什么'而非'怎么做'，代码更简洁易读。\n2. **惰性求值**：中间操作不会立即执行，只有在终端操作触发时才计算，支持短路优化。\n3. **不可变性**：Stream 不修改数据源，而是生成新的 Stream，保证线程安全。\n4. **可并行化**：通过 parallelStream() 轻松实现并行处理，利用多核 CPU 提升性能。\n\n这些特点使 Stream 成为处理集合数据的理想选择。"
              },
              {
                question: "中间操作和终端操作有什么区别？",
                answer: "主要区别有三点：\n1. **返回值**：中间操作返回 Stream，可以继续链式调用；终端操作返回具体结果（如 List、Optional、void），Stream 被消耗。\n2. **执行时机**：中间操作采用惰性求值，不会立即执行；终端操作触发实际计算。\n3. **可调用次数**：中间操作可以多次调用；终端操作只能调用一次，之后 Stream 失效。\n\n常见的中间操作：filter、map、flatMap、sorted、limit、skip、distinct。\n常见的终端操作：collect、reduce、forEach、find、match、count、sum。"
              },
              {
                question: "什么是惰性求值？有什么好处？",
                answer: "惰性求值（Lazy Evaluation）是指中间操作不会立即执行，而是等到终端操作触发时才一次性完成整个管道的计算。\n\n好处包括：\n1. **性能优化**：可以融合多个操作，减少中间结果的创建。\n2. **短路优化**：如 limit、findFirst 等操作可以在满足条件后立即停止，无需处理全部数据。\n3. **无限流支持**：可以处理无限序列（如 IntStream.iterate(0, n -> n + 1)），因为只在需要时才计算。\n\n例如：stream.filter(...).map(...).limit(10) 只会处理前 10 个符合条件的元素，而不是全部元素。"
              },
              {
                question: "并行流的工作原理是什么？有什么注意事项？",
                answer: "并行流基于 Fork/Join 框架工作：\n1. **拆分**：将数据源拆分为多个子任务。\n2. **执行**：每个子任务在独立的线程中执行 Stream 管道。\n3. **合并**：将各子任务的结果合并为最终结果。\n\n注意事项：\n1. **线程安全**：避免共享可变状态，优先使用 collect 而非 forEach。\n2. **数据规模**：小数据量（&lt;1000）不建议使用并行流，线程调度开销可能超过收益。\n3. **操作类型**：CPU 密集型操作适合并行，I/O 密集型不适合。\n4. **有序性**：某些操作（如 sorted）会抵消并行优势。\n5. **自定义线程池**：默认使用 ForkJoinPool.commonPool()，可通过 submit 方法指定自定义线程池。"
              },
              {
                question: "Collectors 有哪些常用方法？请举例说明。",
                answer: "Collectors 提供了丰富的收集器：\n1. **toList/toSet/toMap**：收集到集合或映射。\n2. **groupingBy**：按条件分组，返回 Map<K, List<T>>。\n3. **partitioningBy**：按布尔条件分区，返回 Map<Boolean, List<T>>。\n4. **summarizingInt/Long/Double**：统计摘要，返回 SummaryStatistics。\n5. **joining**：字符串拼接，可指定分隔符、前缀、后缀。\n6. **reducing**：自定义规约操作。\n7. **mapping**：在收集前对元素进行映射转换。\n8. **filtering**：在收集前过滤元素（Java 9+）。\n\n示例：employees.stream().collect(groupingBy(Employee::getDepartment)) 按部门分组员工。"
              },
              {
                question: "如何优化 Stream 的性能？",
                answer: "性能优化策略包括：\n1. **操作顺序**：先过滤再映射，减少后续操作的数据量；短路操作（limit、findFirst）尽早出现。\n2. **使用 Primitive Stream**：IntStream、LongStream、DoubleStream 避免装箱拆箱开销。\n3. **合理选择并行**：大数据量（&gt;10000）且 CPU 密集型操作才使用并行流。\n4. **避免副作用**：优先使用 collect、reduce 等无副作用操作，避免 forEach 修改外部状态。\n5. **重用 Stream**：不要重复创建相同的 Stream，可缓存结果或使用 Supplier。\n6. **监控性能**：使用 JMH 基准测试工具测量实际性能，避免盲目优化。"
              }
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、对比分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Stream API 与传统循环、外部库（如 Guava）在语法、性能和功能上有明显差异。以下是详细对比：
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-border text-[13px] sm:text-sm">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">特性</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Stream API</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">传统循环</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Guava</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">语法风格</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐⭐⭐ 声明式</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐ 命令式</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐⭐ 函数式</td>
                </tr>
                <tr className="bg-parchment-soft/30">
                  <td className="border border-border px-3 py-2 font-medium text-ink">并行支持</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 内置（parallelStream）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">❌ 需手动实现</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⚠️ 部分支持</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">惰性求值</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 支持</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">❌ 不支持</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">❌ 不支持</td>
                </tr>
                <tr className="bg-parchment-soft/30">
                  <td className="border border-border px-3 py-2 font-medium text-ink">学习曲线</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">中等（需理解函数式）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">低（直观易懂）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">中等（需熟悉 API）</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">性能（小数据）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐ 略慢（开销）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐⭐⭐ 最快</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐ 中等</td>
                </tr>
                <tr className="bg-parchment-soft/30">
                  <td className="border border-border px-3 py-2 font-medium text-ink">性能（大数据+并行）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐⭐⭐ 最优</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐ 需手动优化</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐ 中等</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Stream API 是 Java 函数式编程的核心组件，与以下知识点密切相关：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="border border-border rounded-paper-md p-4 bg-parchment-soft/30">
              <h3 className="font-semibold text-ink mb-2">🔗 Lambda 表达式</h3>
              <p className="text-[13px] text-ink-muted">Stream 的所有操作都依赖 Lambda 传递行为，是函数式编程的基础。</p>
            </div>
            <div className="border border-border rounded-paper-md p-4 bg-parchment-soft/30">
              <h3 className="font-semibold text-ink mb-2">🔗 Optional</h3>
              <p className="text-[13px] text-ink-muted">Optional 提供类似的链式调用风格，与 Stream 配合处理空值和集合。</p>
            </div>
            <div className="border border-border rounded-paper-md p-4 bg-parchment-soft/30">
              <h3 className="font-semibold text-ink mb-2">🔗 Fork/Join 框架</h3>
              <p className="text-[13px] text-ink-muted">并行流底层使用 Fork/Join 实现任务拆分和合并，理解其原理有助于性能调优。</p>
            </div>
            <div className="border border-border rounded-paper-md p-4 bg-parchment-soft/30">
              <h3 className="font-semibold text-ink mb-2">🔗 CompletableFuture</h3>
              <p className="text-[13px] text-ink-muted">异步编程中的链式调用与 Stream 类似，都采用声明式风格处理异步任务。</p>
            </div>
          </div>

          <Callout type="tip" title="学习建议">
            掌握 Stream API 后，建议深入学习 Collector 的自定义实现和并行流的性能调优。在实际项目中，优先使用 Stream 处理集合数据，但要注意避免过度使用导致代码可读性下降。对于简单操作，传统循环可能更清晰。
          </Callout>

          {/* ⚠️ ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      {/* ⚠️ SmartTOC 直接渲染，不要用 <aside> 包裹！组件自行管理桌面端右侧栏和移动端右侧抽屉 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
