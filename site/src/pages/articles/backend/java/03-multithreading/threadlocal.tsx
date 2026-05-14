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
  { id: 'overview', text: '整体架构', level: 2 },
  { id: 'core', text: '核心原理', level: 2 },
  { id: 'internal-structure', text: '内部结构', level: 3 },
  { id: 'hash-conflict', text: '哈希冲突解决', level: 3 },
  { id: 'memory-leak', text: '内存泄漏问题', level: 3 },
  { id: 'inheritable', text: 'InheritableThreadLocal', level: 3 },
  { id: 'playground', text: '代码实验场', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比分析', level: 2 },
]

export default function ThreadLocalPage({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              <strong>ThreadLocal</strong> 是 Java 提供的线程隔离机制，为每个线程维护独立的变量副本，
              实现<strong>线程封闭</strong>（Thread Confinement），避免多线程共享数据时的同步开销，
              常用于存储用户会话、数据库连接、事务上下文等线程私有数据。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 ThreadLocal？">
            在多线程环境中，如果多个线程需要访问同一个变量，通常需要使用 synchronized 等同步机制保证线程安全，
            但这会带来性能开销。ThreadLocal 通过为每个线程提供独立的变量副本，从根本上避免了共享，
            既保证了线程安全，又无需同步，是一种"以空间换时间"的策略。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            整体架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ThreadLocal 的核心思想是：<strong>每个 Thread 对象内部维护一个 ThreadLocalMap</strong>，
            该 Map 的 key 是 ThreadLocal 实例本身，value 是线程私有的变量值。
          </p>

          <DiagramBlock title="ThreadLocal 数据结构">
            {`
┌─────────────────────────────────────────────┐
│              Thread 1                        │
│  ┌───────────────────────────────────────┐  │
│  │         threadLocals (ThreadLocalMap) │  │
│  │  ┌──────────┬──────────────────┐     │  │
│  │  │ ThreadLocal₁ │ Value A      │     │  │
│  │  ├──────────┼──────────────────┤     │  │
│  │  │ ThreadLocal₂ │ Value B      │     │  │
│  │  └──────────┴──────────────────┘     │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│              Thread 2                        │
│  ┌───────────────────────────────────────┐  │
│  │         threadLocals (ThreadLocalMap) │  │
│  │  ┌──────────┬──────────────────┐     │  │
│  │  │ ThreadLocal₁ │ Value C      │     │  │
│  │  ├──────────┼──────────────────┤     │  │
│  │  │ ThreadLocal₂ │ Value D      │     │  │
│  │  └──────────┴──────────────────┘     │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘

注意：不同线程的 ThreadLocalMap 中，key 可以是同一个 ThreadLocal 实例，
但 value 是各自独立的副本，互不影响。
            `}
          </DiagramBlock>

          <SideNote>
            <p className="text-sm text-ink-muted">
              <strong>关键点：</strong>ThreadLocalMap 是 ThreadLocal 的静态内部类，不是 java.util.HashMap。
              它使用开放地址法解决哈希冲突，Entry 的 key 使用<strong>弱引用</strong>（WeakReference）。
            </p>
          </SideNote>

          <h2 id="core" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            核心原理
          </h2>

          <h3 id="internal-structure" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            内部结构
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ThreadLocal 的核心方法包括 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">set()</code>、
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">get()</code>、
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">remove()</code>，
            它们都操作当前线程的 ThreadLocalMap。
          </p>

          <Playground
            code={`public class ThreadLocalDemo {
    // 创建 ThreadLocal 实例
    private static final ThreadLocal<String> userContext = new ThreadLocal<>();
    
    public static void main(String[] args) {
        // 主线程设置值
        userContext.set("Main User");
        System.out.println("Main: " + userContext.get());
        
        // 子线程设置不同的值
        Thread t1 = new Thread(() -> {
            userContext.set("Thread-1 User");
            System.out.println("T1: " + userContext.get());
        });
        
        Thread t2 = new Thread(() -> {
            userContext.set("Thread-2 User");
            System.out.println("T2: " + userContext.get());
        });
        
        t1.start();
        t2.start();
        
        // 每个线程读取到的都是自己的值，互不干扰
        // Main: Main User
        // T1: Thread-1 User
        // T2: Thread-2 User
    }
}`}
            language="java"
            description="ThreadLocal 基本用法"
          />

          <h3 id="hash-conflict" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            哈希冲突解决
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ThreadLocalMap 使用<strong>开放地址法</strong>（线性探测）解决哈希冲突，而不是 HashMap 的链表法。
            每个 ThreadLocal 实例都有一个唯一的 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">threadLocalHashCode</code>，
            通过魔数 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">0x61c88647</code> 生成，确保哈希值均匀分布。
          </p>

          <Playground
            code={`// ThreadLocal 的 hashCode 生成
private final int threadLocalHashCode = nextHashCode();

private static int nextHashCode() {
    return nextHashCode.getAndAdd(HASH_INCREMENT);
}

private static AtomicInteger nextHashCode = new AtomicInteger();
private static final int HASH_INCREMENT = 0x61c88647;  // 魔数

// 这个魔数的特点是：连续生成的 hash code 能均匀分布在 2 的幂次方大小的数组中
// 例如：0x61c88647, 0xc3910c8e, 0x255992d5, ...`}
            language="java"
            description="ThreadLocal 的哈希码生成"
          />

          <h3 id="memory-leak" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            内存泄漏问题
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ThreadLocalMap 的 Entry 继承自 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">WeakReference&lt;ThreadLocal&lt;?&gt;&gt;</code>，
            key 使用弱引用是为了防止内存泄漏。但如果忘记调用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">remove()</code>，
            在线程池场景下仍可能导致内存泄漏。
          </p>

          <Callout type="danger" title="⚠️ 内存泄漏风险">
            <p className="text-sm mb-2">
              <strong>泄漏场景：</strong>
            </p>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>线程池中的线程长期存活</li>
              <li>ThreadLocal 使用完后未调用 remove()</li>
              <li>Entry 的 key（弱引用）被 GC 回收，变为 null</li>
              <li>但 value（强引用）仍然存在于 ThreadLocalMap 中</li>
              <li>导致 value 无法被回收，造成内存泄漏</li>
            </ol>
            <p className="text-sm mt-2">
              <strong>解决方案：</strong>始终在 finally 块中调用 <code className="font-mono text-xs">threadLocal.remove()</code>
            </p>
          </Callout>

          <Playground
            code={`// ❌ 错误用法：可能导致内存泄漏
public class BadThreadLocalUsage {
    private static final ThreadLocal<User> userHolder = new ThreadLocal<>();
    
    public void setUser(User user) {
        userHolder.set(user);
    }
    
    public User getUser() {
        return userHolder.get();
    }
    // 忘记调用 remove()！
}

// ✅ 正确用法：及时清理
public class GoodThreadLocalUsage {
    private static final ThreadLocal<User> userHolder = new ThreadLocal<>();
    
    public void setUser(User user) {
        userHolder.set(user);
    }
    
    public User getUser() {
        return userHolder.get();
    }
    
    public void clear() {
        userHolder.remove();  // 使用后清理
    }
}

// 在 Filter 或 Interceptor 中使用
public class UserContextFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) 
            throws IOException, ServletException {
        try {
            User user = extractUser(req);
            UserContext.setUser(user);
            chain.doFilter(req, resp);
        } finally {
            UserContext.clear();  // 确保清理
        }
    }
}`}
            language="java"
            description="ThreadLocal 的正确使用方式"
          />

          <h3 id="inheritable" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            InheritableThreadLocal
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">InheritableThreadLocal</code> 
            是 ThreadLocal 的子类，允许子线程继承父线程的 ThreadLocal 变量。
            它在创建子线程时，将父线程的 inheritableThreadLocals 复制到子线程。
          </p>

          <Playground
            code={`public class InheritableThreadLocalDemo {
    private static final InheritableThreadLocal<String> context = 
        new InheritableThreadLocal<>();
    
    public static void main(String[] args) {
        // 父线程设置值
        context.set("Parent Value");
        System.out.println("Parent: " + context.get());
        
        // 子线程可以继承父线程的值
        Thread child = new Thread(() -> {
            System.out.println("Child: " + context.get());  // Parent Value
            context.set("Child Value");
            System.out.println("Child after set: " + context.get());  // Child Value
        });
        
        child.start();
        
        // 父线程的值不受影响
        System.out.println("Parent after child: " + context.get());  // Parent Value
    }
}`}
            language="java"
            description="InheritableThreadLocal 的使用"
          />

          <Callout type="warning" title="⚠️ 线程池中的陷阱">
            <p className="text-sm">
              在线程池场景下，InheritableThreadLocal 可能失效，因为线程是复用的，不会每次都从父线程复制值。
              此时应使用阿里开源的 <code className="font-mono text-xs">TransmittableThreadLocal</code>（TTL），
              它解决了线程池场景下的上下文传递问题。
            </p>
          </Callout>

          <h2 id="playground" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            代码实验场
          </h2>
          <Playground
            code={`import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * ThreadLocal 典型应用场景：线程安全的日期格式化
 */
public class ThreadLocalDateFormat {
    // 使用 ThreadLocal 为每个线程维护独立的 SimpleDateFormat 实例
    private static final ThreadLocal<SimpleDateFormat> dateFormatHolder = 
        ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
    
    public static String format(Date date) {
        return dateFormatHolder.get().format(date);
    }
    
    public static Date parse(String dateString) throws Exception {
        return dateFormatHolder.get().parse(dateString);
    }
    
    public static void main(String[] args) throws Exception {
        // 多线程测试
        for (int i = 0; i < 5; i++) {
            new Thread(() -> {
                try {
                    Date now = new Date();
                    String formatted = format(now);
                    Date parsed = parse(formatted);
                    System.out.println(Thread.currentThread().getName() + 
                                     ": " + formatted);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
}`}
            language="java"
            description="ThreadLocal 实现线程安全的日期格式化"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            常见误区
          </h2>

          <Callout type="danger" title="误区 1：认为 ThreadLocal 是解决线程安全问题的银弹">
            <p className="text-sm mb-2">
              ❌ 错误认知：所有共享变量都可以用 ThreadLocal 替代 synchronized
            </p>
            <p className="text-sm">
              ✅ 正确理解：ThreadLocal 适用于<strong>线程隔离</strong>场景，每个线程需要独立的变量副本。
              如果需要线程间共享数据并同步修改，仍需使用 synchronized、Lock 或并发容器。
              ThreadLocal 是"以空间换时间"，会占用更多内存。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：忽略 remove() 导致内存泄漏">
            <p className="text-sm mb-2">
              ❌ 危险做法：只调用 set() 和 get()，不调用 remove()
            </p>
            <p className="text-sm">
              ✅ 正确做法：在 finally 块中调用 <code className="font-mono text-xs">remove()</code>，
              特别是在线程池、Web 应用（Filter/Interceptor）等场景中，必须确保清理。
              否则长期运行的线程会导致内存泄漏。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：认为 InheritableThreadLocal 在线程池中也能正常工作">
            <p className="text-sm mb-2">
              ❌ 错误认知：InheritableThreadLocal 可以完美解决父子线程上下文传递
            </p>
            <p className="text-sm">
              ✅ 正确理解：InheritableThreadLocal 只在<strong>创建子线程时</strong>复制父线程的值。
              在线程池场景下，线程是复用的，不会每次都复制。应使用 TransmittableThreadLocal（TTL）
              或在任务提交时手动传递上下文。
            </p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            面试真题
          </h2>
          <InterviewSection
            questions={[
              {
                question: 'ThreadLocal 的原理是什么？底层数据结构是怎样的？',
                answer: `ThreadLocal 的原理：

1. 核心思想：
   - 每个 Thread 对象内部维护一个 ThreadLocalMap
   - Map 的 key 是 ThreadLocal 实例，value 是线程私有的变量值
   - 不同线程的 ThreadLocalMap 相互独立，实现线程隔离

2. 底层数据结构：
   - ThreadLocalMap 是 ThreadLocal 的静态内部类
   - 使用数组存储 Entry，采用开放地址法解决哈希冲突
   - Entry 继承自 WeakReference<ThreadLocal<?>>，key 使用弱引用
   - 哈希码通过魔数 0x61c88647 生成，确保均匀分布

3. 关键方法：
   - set()：获取当前线程的 ThreadLocalMap，设置 key-value
   - get()：获取当前线程的 ThreadLocalMap，查找对应的 value
   - remove()：删除当前线程的 ThreadLocalMap 中的 entry
   - initialValue()：首次 get 时调用，返回初始值

4. 内存管理：
   - key 使用弱引用，GC 时可以回收不再使用的 ThreadLocal
   - 但 value 是强引用，需要手动调用 remove() 清理，否则可能泄漏`
              },
              {
                question: 'ThreadLocal 为什么会内存泄漏？如何避免？',
                answer: `内存泄漏的原因：

1. Entry 的结构：
   - key：WeakReference<ThreadLocal<?>>，弱引用
   - value：Object，强引用

2. 泄漏过程：
   a. ThreadLocal 对象不再被外部引用
   b. GC 发生时，key（弱引用）被回收，Entry.key 变为 null
   c. 但 value 仍然是强引用，且 ThreadLocalMap 还持有它
   d. 如果线程长期存活（如线程池），value 无法被回收
   e. 导致内存泄漏

3. JVM 的清理机制：
   - ThreadLocalMap 在 set/get/remove 时会清理 key 为 null 的 Entry
   - 但如果不再调用这些方法，泄漏的 Entry 会一直存在

4. 避免方法：
   - 始终在 finally 块中调用 threadLocal.remove()
   - 特别是在线程池、Filter、Interceptor 等场景
   - 使用 try-finally 确保清理：
     try {
         threadLocal.set(value);
         // 业务逻辑
     } finally {
         threadLocal.remove();
     }`
              },
              {
                question: 'ThreadLocal 和 synchronized 的区别是什么？如何选择？',
                answer: `区别对比：

1. 实现方式：
   - ThreadLocal：为每个线程维护独立副本，避免共享
   - synchronized：通过锁机制控制对共享资源的访问

2. 适用场景：
   - ThreadLocal：线程隔离场景，每个线程需要独立的数据
     （如用户会话、数据库连接、事务上下文）
   - synchronized：线程协作场景，需要共享和同步修改数据
     （如计数器、共享缓存）

3. 性能特点：
   - ThreadLocal：无锁竞争，性能好，但占用更多内存（空间换时间）
   - synchronized：有锁竞争，可能阻塞，但节省内存

4. 线程安全：
   - ThreadLocal：天然线程安全，因为数据不共享
   - synchronized：通过互斥访问保证线程安全

选择原则：
- 如果每个线程需要独立的数据 → ThreadLocal
- 如果线程间需要共享数据 → synchronized / Lock / 并发容器
- 优先考虑 ThreadLocal（无锁），只有在必须共享时才用锁`
              },
              {
                question: 'InheritableThreadLocal 有什么局限性？如何解决？',
                answer: `InheritableThreadLocal 的局限性：

1. 工作原理：
   - 在创建子线程时，将父线程的 inheritableThreadLocals 复制到子线程
   - 子线程获得的是父线程值的副本

2. 局限性：
   a. 只在线程创建时复制一次
   b. 线程池场景下失效：线程复用，不会每次都从父线程复制
   c. 子线程修改值不会影响父线程（副本隔离）
   d. 无法处理异步任务（Runnable/Callable）的上下文传递

3. 线程池问题示例：
   - 线程 A 设置 ThreadLocal 值
   - 提交任务到线程池，由线程 B 执行
   - 线程 B 无法获取线程 A 的 ThreadLocal 值（因为是复用的旧线程）

4. 解决方案：
   a. 使用 TransmittableThreadLocal（TTL，阿里开源）
      - 在任务提交时捕获上下文
      - 在任务执行前恢复上下文
      - 完美支持线程池场景
   
   b. 手动传递：
      - 在提交任务前获取 ThreadLocal 值
      - 作为参数传递给任务
      - 在任务中设置到新的 ThreadLocal
   
   c. 使用 CompletableFuture 的 supplyAsync 带 Executor 版本
      - 在主线程获取值，传递给异步任务

推荐：在线程池场景下优先使用 TTL。`
              },
              {
                question: 'ThreadLocal 的典型应用场景有哪些？',
                answer: `ThreadLocal 的典型应用场景：

1. 用户会话管理：
   - 在 Web 应用中存储当前登录用户信息
   - 通过 Filter 设置，Controller/Service 层直接获取
   - 避免在每个方法中传递 User 参数

2. 数据库连接管理：
   - 为每个线程维护独立的数据库连接
   - 保证同一个事务中使用相同的连接
   - Spring 的事务管理底层就使用了 ThreadLocal

3. 事务上下文：
   - 存储事务状态、隔离级别等信息
   - 确保整个调用链使用相同的事务上下文

4. 线程安全的日期格式化：
   - SimpleDateFormat 不是线程安全的
   - 使用 ThreadLocal 为每个线程维护独立的实例

5. 日志追踪 ID：
   - 为每个请求生成唯一的 traceId
   - 在整个调用链中传递，便于日志关联

6. 权限上下文：
   - 存储当前用户的权限信息
   - 在拦截器或切面中进行权限校验

7. RPC 框架中的上下文传递：
   - Dubbo 等框架使用 ThreadLocal 传递 RpcContext
   - 包含超时时间、attachments 等信息

最佳实践：
- 始终在 finally 块中调用 remove()
- 避免在 ThreadLocal 中存储大对象（占用内存）
- 优先使用 withInitial() 提供初始值`
              },
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            对比分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ThreadLocal 与其他线程安全方案的对比：
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">特性</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ThreadLocal</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">synchronized</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ConcurrentHashMap</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr><td className="px-4 py-3 font-medium text-sm">线程安全方式</td><td className="px-4 py-3 text-sm">线程隔离</td><td className="px-4 py-3 text-sm">互斥访问</td><td className="px-4 py-3 text-sm">分段锁/CAS</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">数据共享</td><td className="px-4 py-3 text-sm text-red-600">❌ 不共享</td><td className="px-4 py-3 text-sm text-green-600">✅ 共享</td><td className="px-4 py-3 text-sm text-green-600">✅ 共享</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">性能</td><td className="px-4 py-3 text-sm">⚡ 高（无锁）</td><td className="px-4 py-3 text-sm">🐢 中（有锁）</td><td className="px-4 py-3 text-sm">⚡ 高（细粒度锁）</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">内存占用</td><td className="px-4 py-3 text-sm text-red-600">高（多副本）</td><td className="px-4 py-3 text-sm text-green-600">低</td><td className="px-4 py-3 text-sm text-green-600">低</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">适用场景</td><td className="px-4 py-3 text-sm">线程私有数据</td><td className="px-4 py-3 text-sm">共享数据同步</td><td className="px-4 py-3 text-sm">并发读写 Map</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">复杂度</td><td className="px-4 py-3 text-sm">简单</td><td className="px-4 py-3 text-sm">中等</td><td className="px-4 py-3 text-sm">较复杂</td></tr>
              </tbody>
            </table>
          </div>

          <section id="related" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
              关联知识
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                <h4 className="font-semibold text-sm mb-2">→ Java内存模型（JMM）深度解析</h4>
                <p className="text-xs text-ink-muted">理解线程可见性和内存屏障</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                <h4 className="font-semibold text-sm mb-2">→ Spring事务管理</h4>
                <p className="text-xs text-ink-muted">学习 ThreadLocal 在事务中的应用</p>
              </div>
            </div>
          </section>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
