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
  { id: 'tuning-goals', text: '一、JVM调优目标', level: 2 },
  { id: 'monitoring-tools', text: '二、监控工具', level: 2 },
  { id: 'gc-logs', text: '三、GC日志分析', level: 2 },
  { id: 'heap-tuning', text: '四、堆内存调优', level: 2 },
  { id: 'gc-selection-tuning', text: '五、GC选择与调优', level: 2 },
  { id: 'thread-tuning', text: '六、线程调优', level: 2 },
  { id: 'classloader-tuning', text: '七、类加载调优', level: 2 },
  { id: 'common-problems', text: '八、常见问题排查', level: 2 },
  { id: 'case-study', text: '九、实战案例', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function JvmTuning({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              JVM调优是通过<strong className="text-accent">调整JVM参数和监控运行时状态</strong>，优化应用的吞吐量、延迟、内存使用等指标，
              解决OOM、频繁GC、CPU过高等性能问题的过程。
            </p>
          </blockquote>

          <Callout type="tip" title="调优原则">
            <strong>没有银弹</strong>：不存在适用于所有场景的最优配置。<br/>
            <strong>数据驱动</strong>：基于监控数据和业务需求调优，而非经验猜测。<br/>
            <strong>逐步迭代</strong>：每次只调整一个参数，观察效果后再继续。
          </Callout>

          <h2 id="tuning-goals" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、JVM调优目标
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JVM调优通常围绕以下三个核心指标展开（三者不可兼得，需权衡）：
          </p>

          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">指标</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">说明</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">优化方向</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">吞吐量（Throughput）</td>
                <td className="border border-border-light px-3 py-2">用户代码运行时间 / (用户代码运行时间 + GC时间)</td>
                <td className="border border-border-light px-3 py-2">减少GC频率，增大堆</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">延迟（Latency）</td>
                <td className="border border-border-light px-3 py-2">单次请求的响应时间</td>
                <td className="border border-border-light px-3 py-2">减少STW时间，选择低停顿GC</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">内存占用（Footprint）</td>
                <td className="border border-border-light px-3 py-2">应用占用的内存大小</td>
                <td className="border border-border-light px-3 py-2">减小堆，优化对象生命周期</td>
              </tr>
            </tbody>
          </table>

          <SideNote>
            <strong>典型场景：</strong><br/>
            • 批处理系统：优先吞吐量<br/>
            • Web服务：优先延迟<br/>
            • 嵌入式系统：优先内存占用
          </SideNote>

          <h2 id="monitoring-tools" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、监控工具
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JVM提供了丰富的监控工具，从命令行到图形界面，从本地到远程：
          </p>

          <h3 id="cli-tools" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            命令行工具
          </h3>
          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">工具</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">用途</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">jps</td>
                <td className="border border-border-light px-3 py-2">查看Java进程</td>
                <td className="border border-border-light px-3 py-2 font-mono">jps -l</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">jstat</td>
                <td className="border border-border-light px-3 py-2">监控GC统计信息</td>
                <td className="border border-border-light px-3 py-2 font-mono">jstat -gc pid 1000 10</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">jmap</td>
                <td className="border border-border-light px-3 py-2">生成堆转储快照</td>
                <td className="border border-border-light px-3 py-2 font-mono">jmap -dump:live,format=b,file=heap.hprof pid</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">jstack</td>
                <td className="border border-border-light px-3 py-2">打印线程栈</td>
                <td className="border border-border-light px-3 py-2 font-mono">jstack pid</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">jinfo</td>
                <td className="border border-border-light px-3 py-2">查看/修改JVM参数</td>
                <td className="border border-border-light px-3 py-2 font-mono">jinfo -flags pid</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`# 实时监控GC情况（每秒刷新，共10次）
jstat -gc 12345 1000 10

# 输出示例：
 S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC     MU    CCSC   CCSU   YGC     YGCT    FGC    FGCT     GCT   
1024.0 1024.0  0.0   512.0   8192.0   4096.0   20480.0    10240.0   5120.0 4800.0 640.0  580.0     15    0.120    2    0.080    0.200

# 列说明：
# S0C/S1U: Survivor区容量/使用量
# EC/EU: Eden区容量/使用量
# OC/OU: Old区容量/使用量
# MC/MU: Metaspace容量/使用量
# YGC/YGCT: Young GC次数/耗时
# FGC/FGCT: Full GC次数/耗时
# GCT: 总GC时间`}
            language="bash"
            description="使用jstat监控GC"
          />

          <h3 id="gui-tools" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            图形化工具
          </h3>
          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">工具</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">特点</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">JVisualVM</td>
                <td className="border border-border-light px-3 py-2">JDK自带，功能全面（监控、dump、CPU/内存分析）</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">JConsole</td>
                <td className="border border-border-light px-3 py-2">JDK自带，轻量级监控</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">MAT (Memory Analyzer Tool)</td>
                <td className="border border-border-light px-3 py-2">Eclipse出品，专业的堆内存分析工具</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">Arthas</td>
                <td className="border border-border-light px-3 py-2">阿里开源，强大的在线诊断工具</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">GCViewer</td>
                <td className="border border-border-light px-3 py-2">分析GC日志文件</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="推荐工具组合">
            <strong>日常监控</strong>：jstat + JVisualVM<br/>
            <strong>问题排查</strong>：jstack + jmap + MAT<br/>
            <strong>生产环境</strong>：Arthas（无需重启，动态诊断）
          </Callout>

          <h2 id="gc-logs" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、GC日志分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            GC日志是JVM调优最重要的数据来源，记录了每次GC的详细信息。
          </p>

          <h3 id="enable-gc-logs" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            启用GC日志
          </h3>
          <Playground
            code={`# JDK 8及以前
-XX:+PrintGCDetails 
-XX:+PrintGCDateStamps 
-Xloggc:/path/to/gc.log 
-XX:+UseGCLogFileRotation 
-XX:NumberOfGCLogFiles=5 
-XX:GCLogFileSize=10M

# JDK 9+ (统一日志框架)
-Xlog:gc*:file=/path/to/gc.log:time,uptime,level,tags:filecount=5,filesize=10M

# 常用标签：
# gc - GC基本事件
# heap - 堆信息
# safepoint - 安全点
# class - 类加载`}
            language="bash"
            description="启用GC日志"
          />

          <h3 id="parse-gc-logs" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            解读GC日志
          </h3>
          <Playground
            code={`# G1 Young GC日志示例
[2024-01-15T10:30:45.123+0800] 1234.567: [GC pause (G1 Evacuation Pause) (young), 0.0123456 secs]
   [Parallel Time: 10.5 ms, GC Workers: 8]
      [GC Worker Start (ms): Min: 1234567.8, Avg: 1234567.9, Max: 1234568.0, Diff: 0.2]
      [Ext Root Scanning (ms): Min: 1.2, Avg: 1.5, Max: 2.1, Diff: 0.9, Sum: 12.0]
      [Update RS (ms): Min: 0.5, Avg: 0.8, Max: 1.2, Diff: 0.7, Sum: 6.4]
      [Scan RS (ms): Min: 0.3, Avg: 0.5, Max: 0.8, Diff: 0.5, Sum: 4.0]
      [Code Root Scanning (ms): Min: 0.1, Avg: 0.2, Max: 0.3, Diff: 0.2, Sum: 1.6]
      [Object Copy (ms): Min: 5.0, Avg: 6.5, Max: 8.0, Diff: 3.0, Sum: 52.0]
      [Termination (ms): Min: 0.1, Avg: 0.2, Max: 0.3, Diff: 0.2, Sum: 1.6]
      [GC Worker Other (ms): Min: 0.1, Avg: 0.2, Max: 0.3, Diff: 0.2, Sum: 1.6]
      [GC Worker Total (ms): Min: 9.8, Avg: 10.2, Max: 10.5, Diff: 0.7, Sum: 81.6]
      [GC Worker End (ms): Min: 1234578.3, Avg: 1234578.4, Max: 1234578.5, Diff: 0.2]
   [Code Root Fixup: 0.1 ms]
   [Code Root Purge: 0.0 ms]
   [Clear CT: 0.2 ms]
   [Other: 1.6 ms]
      [Choose CSet: 0.0 ms]
      [Ref Proc: 0.5 ms]
      [Ref Enq: 0.1 ms]
      [Redirty Cards: 0.3 ms]
      [Humongous Register: 0.1 ms]
      [Humongous Reclaim: 0.2 ms]
      [Free CSet: 0.4 ms]
   [Eden: 512.0M(512.0M)->0.0B(512.0M) Survivors: 64.0M->64.0M Heap: 2048.0M(4096.0M)->1536.0M(4096.0M)]
 [Times: user=0.08 sys=0.00, real=0.01 secs]

# 关键信息：
# 1. GC类型: G1 Evacuation Pause (young) - 新生代回收
# 2. 停顿时间: 0.0123456 secs = 12.3ms
# 3. 并行时间: 10.5ms，使用了8个GC线程
# 4. 内存变化: Eden区从512MB降到0，堆从2048MB降到1536MB`}
            language="text"
            description="G1 GC日志解析"
          />

          <Callout type="warning" title="需要关注的指标">
            • <strong>GC频率</strong>：Young GC过于频繁（{'<'}1分钟）可能说明新生代太小<br/>
            • <strong>GC耗时</strong>：单次GC超过设定目标（如MaxGCPauseMillis）需要调优<br/>
            • <strong>Full GC</strong>：出现Full GC说明有问题，需立即排查<br/>
            • <strong>晋升失败</strong>：Promotion Failed说明老年代空间不足
          </Callout>

          <h2 id="heap-tuning" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、堆内存调优
          </h2>

          <h3 id="heap-size" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            堆大小设置
          </h3>
          <Playground
            code={`# 基础堆配置
-Xms4g                    # 初始堆大小
-Xmx4g                    # 最大堆大小（建议与-Xms相同，避免抖动）

# 新生代配置
-Xmn1g                    # 新生代大小
-XX:NewRatio=2            # 老年代/新生代 = 2:1

# Survivor区配置
-XX:SurvivorRatio=8       # Eden/Survivor = 8:1

# 对象年龄
-XX:MaxTenuringThreshold=15  # 对象在新生代存活的最大次数

# 大对象阈值
-XX:PretenureSizeThreshold=1m  # 超过此大小的对象直接分配到老年代`}
            language="bash"
            description="堆内存参数配置"
          />

          <SideNote>
            <strong>堆大小建议：</strong><br/>
            • 小型应用：512MB - 2GB<br/>
            • 中型应用：2GB - 8GB<br/>
            • 大型应用：8GB - 32GB<br/>
            • 超大型应用：考虑ZGC/Shenandoah + {'>'}32GB<br/><br/>
            <strong>注意</strong>：堆不是越大越好，过大会导致GC停顿时间变长。
          </SideNote>

          <h3 id="oom-debugging" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            OOM问题排查
          </h3>
          <Playground
            code={`# 1. 自动dump（发生OOM时）
-XX:+HeapDumpOnOutOfMemoryError 
-XX:HeapDumpPath=/path/to/dumps/

# 2. 手动dump
jmap -dump:live,format=b,file=heap.hprof <pid>

# 3. 使用MAT分析
# - 打开MAT，导入heap.hprof
# - 查看Dominator Tree（支配树）
# - 找出占用内存最多的对象
# - 分析GC Roots引用链
# - 定位代码中的内存泄漏点

# 4. 常见内存泄漏场景
# - 静态集合持续增长（如HashMap缓存未清理）
# - 未关闭的资源（Connection、Stream、Socket）
# - ThreadLocal未清理
# - 监听器/回调未移除
# - 内部类持有外部类引用`}
            language="bash"
            description="OOM排查流程"
          />

          <h2 id="gc-selection-tuning" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、GC选择与调优
          </h2>

          <h3 id="g1-tuning" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            G1调优参数
          </h3>
          <Playground
            code={`# G1核心参数
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200           # 最大停顿时间目标（不要设太小）
-XX:G1HeapRegionSize=16m           # Region大小（1-32MB，2的幂）
-XX:InitiatingHeapOccupancyPercent=45  # 触发并发标记的堆占比
-XX:ConcGCThreads=4                # 并发标记线程数
-XX:ParallelGCThreads=8            # 并行GC线程数
-XX:G1ReservePercent=10            # 保留空间比例（防止晋升失败）
-XX:MaxGCLiveMillisPercent=70      # Mixed GC中存活对象占比上限

# 监控G1状态
jstat -gcutil <pid> 1000

# 输出示例：
#  S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT   
#  0.00  50.00  75.00  60.00  90.00 85.00    100    1.234     2    0.456    1.690

# 如果FGC > 0，说明Mixed GC跟不上，需要：
# 1. 增大堆 (-Xmx)
# 2. 降低IHOP (-XX:InitiatingHeapOccupancyPercent)
# 3. 增加并发线程 (-XX:ConcGCThreads)`}
            language="bash"
            description="G1调优参数"
          />

          <h3 id="zgc-tuning" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            ZGC调优参数
          </h3>
          <Playground
            code={`# ZGC核心参数（JDK 15+）
-XX:+UseZGC
-XX:+ZGenerational                  # 启用分代ZGC（JDK 21+）
-XX:MaxHeapSize=16g                 # 最大堆大小
-XX:ConcGCThreads=4                 # 并发线程数

# ZGC优势：
# - 停顿时间 < 10ms，与堆大小无关
# - 支持超大堆（TB级别）
# - 适合低延迟要求的场景

# 监控ZGC
jstat -gc <pid> 1000
# 或使用JFR (Java Flight Recorder)
jcmd <pid> JFR.start name=profile duration=60s filename=recording.jfr`}
            language="bash"
            description="ZGC调优参数"
          />

          <h2 id="thread-tuning" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、线程调优
          </h2>

          <h3 id="thread-stack" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            线程栈大小
          </h3>
          <Playground
            code={`# 线程栈大小配置
-Xss256k    # 每个线程的栈大小（默认1MB）

# 计算最大线程数：
# 最大线程数 ≈ (可用内存 - 堆大小 - 其他) / Xss
# 例如：8GB内存，堆4GB，Xss 256k
# 最大线程数 ≈ (8GB - 4GB) / 256KB ≈ 16000个线程

# 线程过多会导致：
# 1. 内存消耗大
# 2. CPU上下文切换开销大
# 3. 调度效率低

# 排查线程问题
jstack <pid> > thread.dump
# 分析thread.dump：
# - 查找死锁
# - 查看BLOCKED状态的线程
# - 检查线程池是否耗尽`}
            language="bash"
            description="线程栈调优"
          />

          <h3 id="thread-pool-tuning" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            线程池调优
          </h3>
          <Playground
            code={`import java.util.concurrent.*;

public class ThreadPoolTuning {
    public static void main(String[] args) {
        // 线程池参数调优
        int corePoolSize = Runtime.getRuntime().availableProcessors(); // CPU核数
        int maximumPoolSize = corePoolSize * 2;
        long keepAliveTime = 60L;
        
        ThreadPoolExecutor executor = new ThreadPoolExecutor(
            corePoolSize,
            maximumPoolSize,
            keepAliveTime,
            TimeUnit.SECONDS,
            new LinkedBlockingQueue<>(1000),  // 有界队列
            new ThreadPoolExecutor.CallerRunsPolicy()  // 拒绝策略
        );
        
        // 监控线程池状态
        ScheduledExecutorService monitor = Executors.newScheduledThreadPool(1);
        monitor.scheduleAtFixedRate(() -> {
            System.out.println("活跃线程: " + executor.getActiveCount());
            System.out.println("队列大小: " + executor.getQueue().size());
            System.out.println("完成任务: " + executor.getCompletedTaskCount());
        }, 0, 5, TimeUnit.SECONDS);
    }
}

// 线程池调优公式：
// CPU密集型：核心线程数 = CPU核数 + 1
// IO密集型：核心线程数 = CPU核数 * 2
// 混合型：根据实际压测确定`}
            language="java"
            description="线程池调优实践"
          />

          <h2 id="classloader-tuning" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、类加载调优
          </h2>

          <h3 id="metaspace-tuning" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            元空间调优
          </h3>
          <Playground
            code={`# 元空间参数
-XX:MetaspaceSize=128m          # 初始元空间大小
-XX:MaxMetaspaceSize=512m       # 最大元空间大小（必须设置！）
-XX:CompressedClassSpaceSize=64m # 压缩类指针空间

# 监控元空间
jstat -gc <pid> 1000
# 关注MC（Metaspace Capacity）和MU（Metaspace Used）

# 元空间OOM原因：
# 1. 大量动态代理（Spring AOP、MyBatis）
# 2. 热部署框架（OSGi、JBoss Modules）
# 3. Groovy等动态语言
# 4. 类加载器泄漏

# 排查类加载问题
jmap -clstats <pid>  # 查看类加载统计
jcmd <pid> GC.class_histogram  # 查看类实例直方图`}
            language="bash"
            description="元空间调优"
          />

          <h2 id="common-problems" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见问题排查
          </h2>

          <h3 id="cpu-high" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            CPU使用率过高
          </h3>
          <Playground
            code={`# 排查步骤：
# 1. 找到CPU高的Java进程
top -c

# 2. 找到进程中CPU高的线程
top -Hp <pid>

# 3. 将线程ID转换为16进制
printf "%x\n" <tid>

# 4. 导出线程栈
jstack <pid> | grep <0xtid> -A 50

# 5. 分析栈信息
# - 是否在循环？
# - 是否在进行复杂计算？
# - 是否GC线程占用高？（GC overhead）

# 常见原因：
# - 死循环
# - 频繁GC
# - 正则表达式回溯
# - 序列化/反序列化
# - 加密/解密运算`}
            language="bash"
            description="CPU过高排查"
          />

          <h3 id="deadlock" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            死锁检测
          </h3>
          <Playground
            code={`# 方法1：jstack自动检测
jstack <pid>
# 输出会明确标注："Found one Java-level deadlock"

# 方法2：jcmd
jcmd <pid> Thread.print

# 方法3：JMX编程检测
ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();
long[] deadlockedThreads = threadMXBean.findDeadlockedThreads();
if (deadlockedThreads != null) {
    System.out.println("发现死锁！");
    ThreadInfo[] threadInfos = threadMXBean.getThreadInfo(deadlockedThreads);
    for (ThreadInfo info : threadInfos) {
        System.out.println(info.getThreadName());
    }
}

# 预防死锁：
# 1. 固定锁获取顺序
# 2. 使用tryLock带超时
# 3. 减少锁粒度
# 4. 使用并发工具类（ConcurrentHashMap等）`}
            language="java"
            description="死锁检测与预防"
          />

          <h2 id="case-study" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、实战案例
          </h2>

          <h3 id="case-frequent-gc" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            案例1：频繁Young GC导致响应慢
          </h3>
          <Callout type="warning" title="问题现象">
            • 应用响应时间从50ms增加到500ms<br/>
            • jstat显示每10秒一次Young GC<br/>
            • 堆使用率持续在80%以上
          </Callout>

          <Playground
            code={`# 原始配置
-Xms2g -Xmx2g -Xmn512m

# 问题分析：
# 1. 新生代太小（512MB），对象快速填满
# 2. 大量短生命周期对象频繁创建

# 优化方案：
-Xms4g -Xmx4g -Xmn1g  # 增大堆和新生代
-XX:MaxGCPauseMillis=200  # 设置合理的停顿目标

# 优化结果：
# - Young GC频率从10秒/次降低到30秒/次
# - 响应时间恢复到50ms
# - 吞吐量提升20%`}
            language="bash"
            description="频繁GC优化案例"
          />

          <h3 id="case-memory-leak" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            案例2：内存泄漏导致OOM
          </h3>
          <Callout type="danger" title="问题现象">
            • 应用运行3天后抛出OutOfMemoryError<br/>
            • 堆内存持续增长，GC无法回收<br/>
            • Full GC频率越来越高
          </Callout>

          <Playground
            code={`# 排查步骤：
# 1. 开启OOM自动dump
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/dumps/

# 2. 使用MAT分析dump文件
# - 打开Leak Suspects报告
# - 发现HashMap占用80%内存
# - 追踪到StaticCache类的staticMap字段

# 3. 定位代码问题
public class StaticCache {
    private static Map<String, Object> cache = new HashMap<>();
    
    public void put(String key, Object value) {
        cache.put(key, value);  // ❌ 只增不减，无限增长
    }
}

# 4. 修复方案
// 方案1：使用LRU缓存
private static Map<String, Object> cache = new LinkedHashMap<>(1000, 0.75f, true) {
    @Override
    protected boolean removeEldestEntry(Map.Entry eldest) {
        return size() > 1000;  // 最多1000个条目
    }
};

// 方案2：使用Guava Cache
private static Cache<String, Object> cache = CacheBuilder.newBuilder()
    .maximumSize(1000)
    .expireAfterWrite(10, TimeUnit.MINUTES)
    .build();

// 方案3：定期清理
ScheduledExecutorService cleaner = Executors.newScheduledThreadPool(1);
cleaner.scheduleAtFixedRate(() -> cache.clear(), 0, 1, TimeUnit.HOURS);`}
            language="java"
            description="内存泄漏修复案例"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="danger" title="误区1：堆越大越好">
            <strong>错误</strong>：认为增大堆就能解决所有性能问题。<br/><br/>
            <strong>正确</strong>：堆过大会导致GC停顿时间变长。应该根据应用实际需求设置合理大小，并选择合适的GC算法。
          </Callout>

          <Callout type="danger" title="误区2：禁用System.gc()能提升性能">
            <strong>错误</strong>：认为禁用显式GC就能避免停顿。<br/><br/>
            <strong>正确</strong>：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">-XX:+DisableExplicitGC</code> 确实能避免RMI等触发的Full GC，但如果代码依赖System.gc()进行资源清理，可能导致内存泄漏。
          </Callout>

          <Callout type="danger" title="误区3：G1不需要调优">
            <strong>错误</strong>：认为G1是自适应的，不需要任何调优。<br/><br/>
            <strong>正确</strong>：G1虽然智能化程度高，但仍需根据应用特点调整关键参数（如MaxGCPauseMillis、IHOP等）。不合理的配置可能导致性能反而不如Parallel GC。
          </Callout>

          <Callout type="danger" title="误区4：监控工具会影响性能">
            <strong>错误</strong>：认为在生产环境使用jstat、jmap等工具会严重影响性能。<br/><br/>
            <strong>正确</strong>：jstat、jinfo等轻量工具对性能影响很小（{'<'}1%）。jmap dump大堆时会暂停应用，应避免在高峰期使用。Arthas等工具设计时就考虑了生产环境，影响可控。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "如何排查CPU使用率过高的问题？",
                answer: "排查步骤：\n1. top找到CPU高的Java进程\n2. top -Hp <pid>找到CPU高的线程\n3. printf \"%x\\n\" <tid>转换线程ID为16进制\n4. jstack <pid> | grep <0xtid>导出线程栈\n5. 分析栈信息，定位问题代码\n\n常见原因：死循环、频繁GC、复杂计算、正则回溯"
              },
              {
                question: "如何排查内存泄漏？",
                answer: "排查步骤：\n1. 监控：jstat观察堆使用趋势，持续增长说明可能有泄漏\n2. Dump：jmap -dump生成堆快照\n3. 分析：使用MAT分析dump文件，查看Dominator Tree\n4. 定位：找到占用内存最多的对象，分析GC Roots引用链\n5. 修复：检查静态集合、未关闭资源、ThreadLocal等问题\n\n预防：使用弱引用、限制缓存大小、定期清理"
              },
              {
                question: "G1收集器的关键参数有哪些？如何调优？",
                answer: "关键参数：\n1. -XX:MaxGCPauseMillis：停顿时间目标（默认200ms，不要设太小）\n2. -XX:InitiatingHeapOccupancyPercent：触发并发标记的堆占比（默认45%）\n3. -XX:G1HeapRegionSize：Region大小（1-32MB）\n4. -XX:ConcGCThreads：并发标记线程数\n\n调优思路：\n• 如果出现Full GC，降低IHOP或增大堆\n• 如果停顿时间超标，减小MaxGCPauseMillis或增加并发线程\n• 如果吞吐量低，增大堆或放宽停顿目标"
              },
              {
                question: "什么情况下会发生Full GC？",
                answer: "触发Full GC的情况：\n1. 老年代空间不足\n2. 元空间不足\n3. System.gc()显式调用（可通过-XX:+DisableExplicitGC禁用）\n4. CMS/G1并发模式失败（Concurrent Mode Failure）\n5. RMI定时触发（JDK默认每小时一次）\n6. 堆内存分配担保失败\n\n优化：尽量避免Full GC，通过调优让Minor GC/Mixed GC能够及时回收内存"
              },
              {
                question: "如何选择合适的GC收集器？",
                answer: "选择策略：\n1. 小型应用/嵌入式：Serial GC（简单高效）\n2. 多核服务器/中等堆：G1 GC（平衡吞吐量和延迟，JDK 9+默认）\n3. 超大堆（>6GB）/低延迟：ZGC或Shenandoah（停顿时间<10ms）\n4. JDK 8老系统：ParNew + CMS（已废弃，不推荐新项目使用）\n5. 批处理/吞吐量优先：Parallel Scavenge + Parallel Old\n\n原则：先监控，再调优，基于数据做决策，不要盲目选择"
              },
              {
                question: "JVM调优的一般流程是什么？",
                answer: "调优流程：\n1. 设定目标：明确要优化的指标（吞吐量、延迟、内存）\n2. 基准测试：记录当前性能数据\n3. 监控分析：使用jstat、GC日志等工具收集数据\n4. 假设验证：提出优化假设，调整参数\n5. 对比测试：验证优化效果\n6. 迭代优化：重复3-5步，直到达到目标\n\n注意事项：\n• 每次只调整一个参数\n• 充分压测验证\n• 考虑业务场景特点\n• 记录每次调整的 effect"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <a href="/docs/04-jvm/jvm-memory-model" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ JVM内存结构</h4>
              <p className="text-sm text-ink-muted">了解各内存区域的特性和调优重点</p>
            </a>
            <a href="/docs/04-jvm/garbage-collection" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ 垃圾收集器详解</h4>
              <p className="text-sm text-ink-muted">深入理解各种GC算法和收集器特性</p>
            </a>
            <a href="/docs/03-multithreading/thread-pool" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ 线程池深入解析</h4>
              <p className="text-sm text-ink-muted">线程池配置与JVM线程模型的关系</p>
            </a>
            <a href="/docs/07-database/sql-optimization" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ SQL优化与索引</h4>
              <p className="text-sm text-ink-muted">数据库性能优化与JVM调优的配合</p>
            </a>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
