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
  { id: 'why-completablefuture', text: '一、为什么需要 CompletableFuture', level: 2 },
  { id: 'limitations', text: '1.1 Future 的局限性', level: 3 },
  { id: 'advantages', text: '1.2 CompletableFuture 的优势', level: 3 },
  { id: 'basic-usage', text: '二、基础用法', level: 2 },
  { id: 'create-async', text: '2.1 创建异步任务', level: 3 },
  { id: 'get-result', text: '2.2 获取结果', level: 3 },
  { id: 'transformation', text: '三、转换与组合', level: 2 },
  { id: 'thenapply', text: '3.1 thenApply - 转换结果', level: 3 },
  { id: 'thencompose', text: '3.2 thenCompose - 扁平化组合', level: 3 },
  { id: 'thencombine', text: '3.3 thenCombine - 合并两个结果', level: 3 },
  { id: 'parallel-execution', text: '四、并行执行', level: 2 },
  { id: 'allof', text: '4.1 allOf - 等待所有完成', level: 3 },
  { id: 'anyof', text: '4.2 anyOf - 等待任意一个完成', level: 3 },
  { id: 'exception-handling', text: '五、异常处理', level: 2 },
  { id: 'exceptionally', text: '5.1 exceptionally - 异常降级', level: 3 },
  { id: 'handle', text: '5.2 handle - 统一处理', level: 3 },
  { id: 'whencomplete', text: '5.3 whenComplete - 最终回调', level: 3 },
  { id: 'thread-pool', text: '六、线程池配置', level: 2 },
  { id: 'default-pool', text: '6.1 默认 ForkJoinPool', level: 3 },
  { id: 'custom-pool', text: '6.2 自定义线程池', level: 3 },
  { id: 'playground', text: '七、代码实验场', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'comparison', text: '十、对比分析', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function CompletableFuture({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              CompletableFuture 是 Java 8 引入的异步编程工具，通过<strong>链式调用</strong>和<strong>函数式编程</strong>实现非阻塞的异步任务编排，
              支持任务组合、异常处理、并行执行等高级特性，是构建响应式系统的核心组件。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么必须掌握 CompletableFuture？">
            现代应用越来越依赖异步编程来提升性能（如微服务调用、IO 操作、数据处理）。
            CompletableFuture 提供了优雅的异步编排能力，避免了回调地狱，是 Java 异步编程的事实标准。
            掌握它是编写高性能、高并发应用的必备技能。
          </Callout>

          <h2 id="why-completablefuture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、为什么需要 CompletableFuture
          </h2>

          <h3 id="limitations" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.1 Future 的局限性
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 5 引入的 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Future</code> 接口虽然支持异步计算，但存在诸多限制：
          </p>

          <div className="space-y-3 mb-6">
            <Callout type="warning" title="❌ 无法手动完成">
              <p className="text-sm">Future 只能由异步任务完成后自动设置结果，无法外部主动完成。</p>
            </Callout>

            <Callout type="warning" title="❌ 阻塞式获取">
              <p className="text-sm">get() 方法是阻塞的，无法注册回调函数在任务完成时自动执行。</p>
            </Callout>

            <Callout type="warning" title="❌ 无法组合">
              <p className="text-sm">多个 Future 之间无法方便地组合，如等待所有完成、串联执行等。</p>
            </Callout>

            <Callout type="warning" title="❌ 异常处理困难">
              <p className="text-sm">异常只能在 get() 时通过 ExecutionException 捕获，无法在链中优雅处理。</p>
            </Callout>
          </div>

          <Playground
            code={`// 传统 Future 的使用方式
ExecutorService executor = Executors.newFixedThreadPool(4);
Future<String> future = executor.submit(() -> {
    Thread.sleep(1000);
    return "Hello";
});

// 阻塞等待结果
String result = future.get(); // 阻塞！
System.out.println(result);`}
            language="java"
            description="传统 Future 的阻塞式用法"
          />

          <h3 id="advantages" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            1.2 CompletableFuture 的优势
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            CompletableFuture 实现了 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">CompletionStage</code> 接口，提供了丰富的异步编排能力：
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-border border border-border rounded-paper-md">
              <thead className="bg-parchment-deep">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">特性</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">Future</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">CompletableFuture</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 font-medium text-sm">异步回调</td>
                  <td className="px-4 py-3 text-sm">❌ 不支持</td>
                  <td className="px-4 py-3 text-sm">✅ thenApply/thenAccept</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-sm">任务组合</td>
                  <td className="px-4 py-3 text-sm">❌ 困难</td>
                  <td className="px-4 py-3 text-sm">✅ thenCombine/allOf/anyOf</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-sm">异常处理</td>
                  <td className="px-4 py-3 text-sm">⚠️ 笨拙</td>
                  <td className="px-4 py-3 text-sm">✅ exceptionally/handle</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-sm">手动完成</td>
                  <td className="px-4 py-3 text-sm">❌ 不支持</td>
                  <td className="px-4 py-3 text-sm">✅ complete()</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-sm">非阻塞</td>
                  <td className="px-4 py-3 text-sm">❌ get() 阻塞</td>
                  <td className="px-4 py-3 text-sm">✅ 全程非阻塞</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="basic-usage" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、基础用法
          </h2>

          <h3 id="create-async" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 创建异步任务
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            CompletableFuture 提供了多种静态工厂方法来创建异步任务：
          </p>

          <Playground
            code={`import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CreateAsyncDemo {
    public static void main(String[] args) {
        // 方式1：supplyAsync - 有返回值的异步任务
        CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
            System.out.println("执行异步任务 1");
            return "Result 1";
        });
        
        // 方式2：runAsync - 无返回值的异步任务
        CompletableFuture<Void> future2 = CompletableFuture.runAsync(() -> {
            System.out.println("执行异步任务 2");
        });
        
        // 方式3：使用自定义线程池
        ExecutorService executor = Executors.newFixedThreadPool(4);
        CompletableFuture<String> future3 = CompletableFuture.supplyAsync(() -> {
            return "Result 3";
        }, executor);
        
        // 方式4：手动完成（用于桥接异步 API）
        CompletableFuture<String> future4 = new CompletableFuture<>();
        new Thread(() -> {
            // 模拟异步操作
            future4.complete("Manual Result");
        }).start();
    }
}`}
            language="java"
            description="创建异步任务的多种方式"
          />

          <SideNote label="supplyAsync vs runAsync">
            <strong>supplyAsync：</strong>适用于有返回值的任务，返回 <code className="font-mono text-xs">CompletableFuture&lt;T&gt;</code>。<br/>
            <strong>runAsync：</strong>适用于无返回值的任务，返回 <code className="font-mono text-xs">CompletableFuture&lt;Void&gt;</code>。
          </SideNote>

          <h3 id="get-result" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 获取结果
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            虽然推荐使用回调方式处理结果，但 CompletableFuture 也提供了同步获取结果的方法：
          </p>

          <Playground
            code={`CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return "Hello";
});

// 方式1：阻塞等待（不推荐）
String result = future.get(); // 阻塞直到完成

// 方式2：带超时阻塞
String result2 = future.get(2, TimeUnit.SECONDS);

// 方式3：立即获取（未完成则抛异常）
String result3 = future.join(); // 类似 get()，但抛出 unchecked 异常

// 方式4：注册回调（推荐）
future.thenAccept(result -> {
    System.out.println("结果: " + result); // 非阻塞回调
});`}
            language="java"
            description="获取 CompletableFuture 结果的方式"
          />

          <Callout type="tip" title="推荐使用回调而非 get()">
            get() 和 join() 都是阻塞方法，会失去异步编程的优势。应该优先使用 thenApply、thenAccept 等回调方法，
            让任务完成后自动触发后续逻辑，实现真正的非阻塞异步编程。
          </Callout>

          <h2 id="transformation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、转换与组合
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            CompletableFuture 最强大的功能是链式调用，可以将多个异步任务组合成复杂的流水线。
          </p>

          <h3 id="thenapply" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 thenApply - 转换结果
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            thenApply 接收一个 Function，将上一个阶段的结果转换为新的结果，类似于 Stream 的 map 操作。
          </p>

          <Playground
            code={`CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return "Hello";
})
.thenApply(result -> result + " World")      // "Hello World"
.thenApply(result -> result.toUpperCase())   // "HELLO WORLD"
.thenApply(result -> result.length());       // 11

// 获取最终结果
Integer length = future.join();
System.out.println("长度: " + length);`}
            language="java"
            description="使用 thenApply 链式转换结果"
          />

          <DiagramBlock title="thenApply 执行流程">
            {`graph LR
    A[supplyAsync<br/>Hello] --> B[thenApply<br/>+ World]
    B --> C[thenApply<br/>toUpperCase]
    C --> D[thenApply<br/>length]
    D --> E[结果: 11]
    
    style A fill:#e1f5ff
    style E fill:#d4edda`}
          </DiagramBlock>

          <h3 id="thencompose" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 thenCompose - 扁平化组合
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            thenCompose 用于串联两个异步任务，避免嵌套的 CompletableFuture，类似于 Optional 的 flatMap。
          </p>

          <Playground
            code={`// 模拟异步查询用户
CompletableFuture<User> getUser(int id) {
    return CompletableFuture.supplyAsync(() -> {
        return new User(id, "User" + id);
    });
}

// 模拟异步查询订单
CompletableFuture<List<Order>> getOrders(User user) {
    return CompletableFuture.supplyAsync(() -> {
        return Arrays.asList(new Order("Order1"), new Order("Order2"));
    });
}

// ❌ 错误写法：嵌套 CompletableFuture
CompletableFuture<CompletableFuture<List<Order>>> nested = 
    getUser(1).thenApply(user -> getOrders(user));

// ✅ 正确写法：使用 thenCompose 扁平化
CompletableFuture<List<Order>> orders = 
    getUser(1).thenCompose(user -> getOrders(user));

orders.thenAccept(orderList -> {
    System.out.println("订单数: " + orderList.size());
});`}
            language="java"
            description="thenCompose 避免嵌套 CompletableFuture"
          />

          <SideNote label="thenApply vs thenCompose">
            <strong>thenApply：</strong>转换函数返回普通值 T，结果是 <code className="font-mono text-xs">CompletableFuture&lt;U&gt;</code>。<br/>
            <strong>thenCompose：</strong>转换函数返回 <code className="font-mono text-xs">CompletableFuture&lt;U&gt;</code>，结果展平为 <code className="font-mono text-xs">CompletableFuture&lt;U&gt;</code>。<br/>
            类比：thenApply 类似 map，thenCompose 类似 flatMap。
          </SideNote>

          <h3 id="thencombine" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.3 thenCombine - 合并两个结果
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            thenCombine 等待两个独立的 CompletableFuture 都完成后，将它们的结果合并。
          </p>

          <Playground
            code={`CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
    return "Hello";
});

CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
    return "World";
});

// 等待两个任务都完成，然后合并结果
CompletableFuture<String> combined = future1.thenCombine(future2, (result1, result2) -> {
    return result1 + " " + result2;
});

combined.thenAccept(result -> {
    System.out.println(result); // "Hello World"
});`}
            language="java"
            description="使用 thenCombine 合并两个异步任务的结果"
          />

          <h2 id="parallel-execution" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、并行执行
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当需要同时执行多个独立的异步任务时，可以使用 allOf 和 anyOf。
          </p>

          <h3 id="allof" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 allOf - 等待所有完成
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            allOf 等待所有提供的 CompletableFuture 都完成，常用于批量异步操作。
          </p>

          <Playground
            code={`// 模拟批量查询
List<CompletableFuture<String>> futures = IntStream.rangeClosed(1, 5)
    .mapToObj(id -> CompletableFuture.supplyAsync(() -> {
        System.out.println("查询 ID: " + id);
        return "Result-" + id;
    }))
    .collect(Collectors.toList());

// 等待所有任务完成
CompletableFuture<Void> allFutures = CompletableFuture.allOf(
    futures.toArray(new CompletableFuture[0])
);

// 所有任务完成后收集结果
allFutures.thenRun(() -> {
    List<String> results = futures.stream()
        .map(CompletableFuture::join)
        .collect(Collectors.toList());
    System.out.println("所有结果: " + results);
});`}
            language="java"
            description="使用 allOf 等待所有异步任务完成"
          />

          <Callout type="warning" title="⚠️ allOf 的返回值">
            allOf 返回的是 <code className="font-mono text-xs">CompletableFuture&lt;Void&gt;</code>，不包含各个任务的结果。
            需要在 thenRun/thenAccept 中通过原始 futures 列表调用 join() 获取结果。
          </Callout>

          <h3 id="anyof" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 anyOf - 等待任意一个完成
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            anyOf 在任意一个 CompletableFuture 完成时就返回，适用于冗余请求或最快响应场景。
          </p>

          <Playground
            code={`// 从多个数据源查询，取最快的结果
CompletableFuture<String> source1 = CompletableFuture.supplyAsync(() -> {
    sleep(3000); // 慢
    return "From Source 1";
});

CompletableFuture<String> source2 = CompletableFuture.supplyAsync(() -> {
    sleep(1000); // 快
    return "From Source 2";
});

CompletableFuture<String> source3 = CompletableFuture.supplyAsync(() -> {
    sleep(2000); // 中等
    return "From Source 3";
});

// 任意一个完成就返回
CompletableFuture<Object> fastest = CompletableFuture.anyOf(source1, source2, source3);

fastest.thenAccept(result -> {
    System.out.println("最快结果: " + result); // "From Source 2"
});`}
            language="java"
            description="使用 anyOf 获取最快的异步结果"
          />

          <h2 id="exception-handling" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、异常处理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            异步任务中的异常不会直接抛出，而是被封装在 CompletableFuture 中。需要通过特定方法处理。
          </p>

          <h3 id="exceptionally" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 exceptionally - 异常降级
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            exceptionally 在发生异常时提供降级值，类似于 try-catch 的 catch 块。
          </p>

          <Playground
            code={`CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    if (Math.random() > 0.5) {
        throw new RuntimeException("随机失败");
    }
    return "Success";
})
.exceptionally(ex -> {
    System.err.println("发生异常: " + ex.getMessage());
    return "Fallback Value"; // 降级值
});

future.thenAccept(result -> {
    System.out.println("结果: " + result);
});`}
            language="java"
            description="使用 exceptionally 处理异常"
          />

          <h3 id="handle" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 handle - 统一处理
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            handle 无论成功还是失败都会执行，可以同时处理正常结果和异常情况。
          </p>

          <Playground
            code={`CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    if (Math.random() > 0.5) {
        throw new RuntimeException("失败");
    }
    return "Success";
})
.handle((result, ex) -> {
    if (ex != null) {
        System.err.println("异常: " + ex.getMessage());
        return "Error Fallback";
    } else {
        return result.toUpperCase();
    }
});

future.thenAccept(System.out::println);`}
            language="java"
            description="使用 handle 统一处理结果和异常"
          />

          <h3 id="whencomplete" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.3 whenComplete - 最终回调
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            whenComplete 用于执行清理操作，不改变结果，类似于 finally 块。
          </p>

          <Playground
            code={`CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return "Result";
})
.whenComplete((result, ex) -> {
    if (ex != null) {
        System.err.println("发生异常");
    } else {
        System.out.println("正常完成: " + result);
    }
})
.thenApply(result -> result + " Modified"); // 不影响后续链

future.thenAccept(System.out::println); // "Result Modified"`}
            language="java"
            description="使用 whenComplete 执行最终回调"
          />

          <SideNote label="异常处理方法对比">
            <strong>exceptionally：</strong>仅在异常时执行，提供降级值。<br/>
            <strong>handle：</strong>无论成功失败都执行，可转换结果。<br/>
            <strong>whenComplete：</strong>无论成功失败都执行，但不改变结果。<br/>
            <strong>建议：</strong>优先使用 handle，灵活性最高。
          </SideNote>

          <h2 id="thread-pool" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、线程池配置
          </h2>

          <h3 id="default-pool" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.1 默认 ForkJoinPool
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            如果不指定线程池，CompletableFuture 使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ForkJoinPool.commonPool()</code>，
            线程数为 CPU 核心数 - 1。
          </p>

          <Callout type="warning" title="⚠️ 默认线程池的问题">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>线程数固定，不适合 IO 密集型任务</li>
              <li>所有 CompletableFuture 共享同一个线程池，可能相互影响</li>
              <li>无法监控和管理线程池状态</li>
            </ul>
            <p className="text-sm mt-2"><strong>建议：</strong>生产环境始终使用自定义线程池。</p>
          </Callout>

          <h3 id="custom-pool" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.2 自定义线程池
          </h3>

          <Playground
            code={`// 创建自定义线程池
ExecutorService customPool = new ThreadPoolExecutor(
    10,                          // 核心线程数
    20,                          // 最大线程数
    60L, TimeUnit.SECONDS,       // 空闲线程保活时间
    new LinkedBlockingQueue<>(100), // 任务队列
    new ThreadFactory() {
        private int count = 0;
        @Override
        public Thread newThread(Runnable r) {
            Thread thread = new Thread(r);
            thread.setName("cf-thread-" + (++count));
            thread.setDaemon(true);
            return thread;
        }
    },
    new ThreadPoolExecutor.CallerRunsPolicy() // 拒绝策略
);

// 使用自定义线程池
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return "Using custom pool";
}, customPool);

future.thenAccept(System.out::println);

// 应用关闭时记得 shutdown
// customPool.shutdown();`}
            language="java"
            description="使用自定义线程池执行 CompletableFuture"
          />

          <h2 id="playground" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、代码实验场
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            综合示例：模拟电商场景，并行查询用户信息、订单列表、推荐商品，然后组装返回。
          </p>

          <Playground
            code={`import java.util.concurrent.*;
import java.util.stream.*;

public class ECommerceDemo {
    private static final ExecutorService pool = Executors.newFixedThreadPool(10);
    
    // 模拟异步查询用户
    static CompletableFuture<User> queryUser(int userId) {
        return CompletableFuture.supplyAsync(() -> {
            sleep(500);
            return new User(userId, "张三");
        }, pool);
    }
    
    // 模拟异步查询订单
    static CompletableFuture<List<Order>> queryOrders(int userId) {
        return CompletableFuture.supplyAsync(() -> {
            sleep(800);
            return Arrays.asList(
                new Order(1, "iPhone", 7999),
                new Order(2, "MacBook", 12999)
            );
        }, pool);
    }
    
    // 模拟异步查询推荐商品
    static CompletableFuture<List<Product>> queryRecommendations(int userId) {
        return CompletableFuture.supplyAsync(() -> {
            sleep(600);
            return Arrays.asList(
                new Product("AirPods", 1299),
                new Product("iPad", 3999)
            );
        }, pool);
    }
    
    public static void main(String[] args) {
        int userId = 1;
        
        // 并行执行三个异步查询
        CompletableFuture<User> userFuture = queryUser(userId);
        CompletableFuture<List<Order>> ordersFuture = queryOrders(userId);
        CompletableFuture<List<Product>> recommendFuture = queryRecommendations(userId);
        
        // 组合所有结果
        CompletableFuture<Void> allDone = CompletableFuture.allOf(
            userFuture, ordersFuture, recommendFuture
        );
        
        allDone.thenRun(() -> {
            User user = userFuture.join();
            List<Order> orders = ordersFuture.join();
            List<Product> recommendations = recommendFuture.join();
            
            System.out.println("=== 用户详情 ===");
            System.out.println("用户: " + user.getName());
            System.out.println("订单数: " + orders.size());
            System.out.println("推荐商品数: " + recommendations.size());
            
            orders.forEach(order -> 
                System.out.println("  - " + order.getName() + ": ¥" + order.getPrice())
            );
        });
        
        // 等待完成
        allDone.join();
        pool.shutdown();
    }
}`}
            language="java"
            description="电商场景：并行查询并组合结果"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <div className="space-y-4 mb-6">
            <Callout type="warning" title="误区 1：忘记指定线程池">
              <p className="text-sm">
                <strong>事实：</strong>不指定线程池会使用 ForkJoinPool.commonPool()，线程数有限且共享，
                容易导致线程饥饿。生产环境应始终使用自定义线程池。
              </p>
            </Callout>

            <Callout type="warning" title="误区 2：在回调中调用 get()/join()">
              <p className="text-sm">
                <strong>事实：</strong>在 thenApply/thenAccept 等回调中调用 get() 会导致阻塞，失去异步优势。
                应该继续使用链式调用，让框架自动调度。
              </p>
            </Callout>

            <Callout type="warning" title="误区 3：忽略异常处理">
              <p className="text-sm">
                <strong>事实：</strong>异步任务中的异常不会直接抛出，如果不使用 exceptionally/handle 处理，
                异常会被静默吞掉，导致难以排查问题。
              </p>
            </Callout>

            <Callout type="warning" title="误区 4：混淆 thenApply 和 thenCompose">
              <p className="text-sm">
                <strong>事实：</strong>thenApply 用于同步转换，thenCompose 用于异步串联。
                如果转换函数返回 CompletableFuture，必须使用 thenCompose 避免嵌套。
              </p>
            </Callout>

            <Callout type="warning" title="误区 5：认为 allOf 返回结果列表">
              <p className="text-sm">
                <strong>事实：</strong>allOf 返回 <code className="font-mono text-xs">CompletableFuture&lt;Void&gt;</code>，
                不包含各个任务的结果。需要手动从原始 futures 列表中收集结果。
              </p>
            </Callout>
          </div>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "CompletableFuture 和 Future 的主要区别是什么？",
                answer: "Future 是阻塞式的，只能通过 get() 获取结果；CompletableFuture 支持非阻塞回调、任务组合、异常处理等高级特性。CompletableFuture 实现了 CompletionStage 接口，可以链式调用，而 Future 功能单一。"
              },
              {
                question: "thenApply 和 thenCompose 的区别？",
                answer: "thenApply 用于同步转换，函数返回普通值 T；thenCompose 用于异步串联，函数返回 CompletableFuture<T>。类比 Stream API：thenApply 类似 map，thenCompose 类似 flatMap。"
              },
              {
                question: "如何处理 CompletableFuture 中的异常？",
                answer: "有三种方式：1) exceptionally - 异常时提供降级值；2) handle - 统一处理结果和异常；3) whenComplete - 执行清理操作但不改变结果。推荐使用 handle，灵活性最高。"
              },
              {
                question: "allOf 和 anyOf 的使用场景？",
                answer: "allOf 等待所有 CompletableFuture 完成，适用于批量操作（如并行查询多个数据源）；anyOf 在任意一个完成时返回，适用于冗余请求或获取最快响应（如从多个 CDN 下载资源）。"
              },
              {
                question: "为什么建议使用自定义线程池？",
                answer: "默认的 ForkJoinPool.commonPool() 线程数固定（CPU 核心数 -1），适合 CPU 密集型任务，但不适合 IO 密集型。而且所有 CompletableFuture 共享同一线程池，可能相互影响。自定义线程池可以根据业务特点调整参数，并便于监控管理。"
              },
              {
                question: "CompletableFuture 如何实现非阻塞？",
                answer: "通过回调机制：任务完成后自动触发注册的回调函数（thenApply/thenAccept 等），而不是让调用线程阻塞等待。底层使用 Unsafe.park/unpark 或 LockSupport 实现线程的挂起和唤醒。"
              },
              {
                question: "如何串行执行多个异步任务？",
                answer: "使用 thenCompose 串联：task1.thenCompose(result1 -> task2(result1)).thenCompose(result2 -> task3(result2))。每个任务在上一个任务完成后自动执行，形成异步流水线。"
              }
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、对比分析
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-border border border-border rounded-paper-md">
              <thead className="bg-parchment-deep">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">特性</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">Future</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">CompletableFuture</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">Reactor/RxJava</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 font-medium text-sm">异步回调</td>
                  <td className="px-4 py-3 text-sm">❌</td>
                  <td className="px-4 py-3 text-sm">✅</td>
                  <td className="px-4 py-3 text-sm">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-sm">任务组合</td>
                  <td className="px-4 py-3 text-sm">❌</td>
                  <td className="px-4 py-3 text-sm">✅ 基础</td>
                  <td className="px-4 py-3 text-sm">✅ 强大</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-sm">背压支持</td>
                  <td className="px-4 py-3 text-sm">❌</td>
                  <td className="px-4 py-3 text-sm">❌</td>
                  <td className="px-4 py-3 text-sm">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-sm">学习曲线</td>
                  <td className="px-4 py-3 text-sm">简单</td>
                  <td className="px-4 py-3 text-sm">中等</td>
                  <td className="px-4 py-3 text-sm">陡峭</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-sm">适用场景</td>
                  <td className="px-4 py-3 text-sm">简单异步</td>
                  <td className="px-4 py-3 text-sm">中等复杂</td>
                  <td className="px-4 py-3 text-sm">响应式流</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            CompletableFuture 是异步编程的核心，与以下知识点密切相关：
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><strong>前置知识：</strong><a href="/docs/05-functional-programming/lambda-expressions" className="text-accent hover:underline">Lambda 表达式</a> — CompletableFuture 大量使用函数式接口</li>
            <li><strong>关联知识：</strong><a href="/docs/03-multithreading/thread-pool" className="text-accent hover:underline">线程池最佳实践</a> — 理解如何配置合适的线程池</li>
            <li><strong>延伸学习：</strong>响应式编程（Project Reactor / RxJava）— 更强大的异步流处理</li>
            <li><strong>延伸学习：</strong>虚拟线程（Java 21）— 新一代轻量级并发模型</li>
            <li><strong>实战应用：</strong>Spring WebFlux — 基于响应式编程的 Web 框架</li>
          </ul>

          <Callout type="info" title="下一步学习建议">
            掌握 CompletableFuture 后，建议深入学习：<strong>Project Reactor</strong>（Mono/Flux）、<strong>RxJava</strong>（Observable）、<strong>虚拟线程</strong>（Virtual Threads）以及<strong>响应式系统设计模式</strong>。
          </Callout>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      {/* SmartTOC 直接渲染，不用 aside 包裹 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
