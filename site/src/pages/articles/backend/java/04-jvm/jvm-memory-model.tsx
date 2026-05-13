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
  { id: 'overview', text: '一、JVM内存结构总览', level: 2 },
  { id: 'heap', text: '二、堆（Heap）', level: 2 },
  { id: 'stack', text: '三、虚拟机栈（Stack）', level: 2 },
  { id: 'method-area', text: '四、方法区（Method Area）', level: 2 },
  { id: 'pc-register', text: '五、程序计数器', level: 2 },
  { id: 'native-method-stack', text: '六、本地方法栈', level: 2 },
  { id: 'direct-memory', text: '七、直接内存', level: 2 },
  { id: 'memory-leak', text: '八、内存泄漏与溢出', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function JvmMemoryModel({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              JVM内存结构是Java虚拟机运行时数据区的组织方式，包含<strong className="text-accent">堆、栈、方法区、程序计数器和本地方法栈</strong>五个核心区域，
              每个区域承担不同的职责，共同支撑Java程序的执行和对象管理。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要了解JVM内存结构？">
            理解内存结构是性能调优、排查OOM错误、避免内存泄漏的基础。不同的内存区域有不同的生命周期和管理策略，直接影响应用的稳定性和性能。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、JVM内存结构总览
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JVM将运行时数据区划分为多个部分，每个部分有明确的职责和生命周期：
          </p>

          <DiagramBlock title="JVM运行时数据区">
            <pre className="text-[12px] sm:text-[13px] leading-relaxed text-left font-mono">{`┌─────────────────────────────────────────┐
│         线程共享区域                     │
│  ┌──────────────┐  ┌────────────────┐   │
│  │    堆(Heap)   │  │  方法区(Method  │   │
│  │              │  │     Area)       │   │
│  │ - 对象实例    │  │                │   │
│  │ - 数组        │  │ - 类元数据      │   │
│  │ - GC主要区域   │  │ - 常量池        │   │
│  └──────────────┘  │ - 静态变量      │   │
│                    └────────────────┘   │
├─────────────────────────────────────────┤
│         线程私有区域                     │
│  ┌──────────────┐  ┌────────────────┐   │
│  │ 虚拟机栈(Stack)│  │  程序计数器(PC) │   │
│  │              │  │                │   │
│  │ - 局部变量表   │  │ - 当前行号      │   │
│  │ - 操作数栈     │  │ - 字节码地址    │   │
│  │ - 动态链接     │  │                │   │
│  │ - 方法出口     │  │                │   │
│  └──────────────┘  └────────────────┘   │
│  ┌──────────────┐                       │
│  │ 本地方法栈     │                       │
│  │              │                       │
│  │ - Native方法  │                       │
│  └──────────────┘                       │
└─────────────────────────────────────────┘`}</pre>
          </DiagramBlock>

          <SideNote>
            <strong>线程共享</strong>：堆和方法区被所有线程共享，需要考虑线程安全问题。<br/>
            <strong>线程私有</strong>：栈、程序计数器和本地方法栈是线程私有的，不存在线程安全问题。
          </SideNote>

          <h2 id="heap" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、堆（Heap）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            堆是JVM中最大的内存区域，用于存储<strong className="text-accent">对象实例和数组</strong>，是垃圾收集器管理的主要区域。
          </p>

          <h3 id="heap-structure" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            堆的分区结构
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            现代JVM（如HotSpot）将堆分为新生代和老年代：
          </p>

          <Playground
            code={`// 查看堆内存配置
public class HeapInfo {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        
        System.out.println("最大堆内存: " + 
            runtime.maxMemory() / 1024 / 1024 + " MB");
        System.out.println("已分配堆内存: " + 
            runtime.totalMemory() / 1024 / 1024 + " MB");
        System.out.println("空闲堆内存: " + 
            runtime.freeMemory() / 1024 / 1024 + " MB");
        System.out.println("已使用堆内存: " + 
            (runtime.totalMemory() - runtime.freeMemory()) / 1024 / 1024 + " MB");
    }
}

// 输出示例：
// 最大堆内存: 4096 MB
// 已分配堆内存: 512 MB
// 空闲堆内存: 480 MB
// 已使用堆内存: 32 MB`}
            language="java"
            description="获取堆内存使用情况"
          />

          <Callout type="info" title="新生代与老年代">
            <strong>新生代（Young Generation）</strong>：存放新创建的对象，分为 Eden 区和两个 Survivor 区（S0、S1）。大多数对象在新生代就被回收。<br/><br/>
            <strong>老年代（Old Generation）</strong>：存放长期存活的对象。当对象在新生代经过多次GC仍存活，会被晋升到老年代。
          </Callout>

          <h3 id="heap-parameters" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            常用堆参数
          </h3>
          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">参数</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">说明</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">-Xms</td>
                <td className="border border-border-light px-3 py-2">初始堆大小</td>
                <td className="border border-border-light px-3 py-2 font-mono">-Xms512m</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">-Xmx</td>
                <td className="border border-border-light px-3 py-2">最大堆大小</td>
                <td className="border border-border-light px-3 py-2 font-mono">-Xmx4g</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">-Xmn</td>
                <td className="border border-border-light px-3 py-2">新生代大小</td>
                <td className="border border-border-light px-3 py-2 font-mono">-Xmn1g</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">-XX:NewRatio</td>
                <td className="border border-border-light px-3 py-2">老年代/新生代比例</td>
                <td className="border border-border-light px-3 py-2 font-mono">-XX:NewRatio=2</td>
              </tr>
            </tbody>
          </table>

          <h2 id="stack" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、虚拟机栈（Stack）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            虚拟机栈是<strong className="text-accent">线程私有</strong>的内存区域，描述Java方法执行的内存模型。每个方法执行时会创建一个栈帧（Stack Frame）。
          </p>

          <h3 id="stack-frame" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            栈帧结构
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            每个栈帧包含以下部分：
          </p>

          <DiagramBlock title="栈帧结构">
            <pre className="text-[12px] sm:text-[13px] leading-relaxed text-left font-mono">{`┌─────────────────────────┐
│      栈帧 (Stack Frame)  │
├─────────────────────────┤
│  局部变量表              │
│  - 方法参数              │
│  - 局部变量              │
│  - this引用              │
├─────────────────────────┤
│  操作数栈                │
│  - 临时计算结果           │
│  - 方法调用参数           │
├─────────────────────────┤
│  动态链接                 │
│  - 指向运行时常量池       │
├─────────────────────────┤
│  方法返回地址             │
│  - PC寄存器恢复位置       │
└─────────────────────────┘`}</pre>
          </DiagramBlock>

          <Playground
            code={`public class StackExample {
    private static int count = 0;
    
    // 递归调用演示栈溢出
    public static void recursiveCall() {
        count++;
        System.out.println("调用深度: " + count);
        recursiveCall(); // 无限递归
    }
    
    public static void main(String[] args) {
        try {
            recursiveCall();
        } catch (StackOverflowError e) {
            System.out.println("栈溢出！最大调用深度: " + count);
            // 输出：调用深度: 10000+（取决于-Xss参数）
            //       栈溢出！最大调用深度: 10xxx
        }
    }
}`}
            language="java"
            description="演示栈溢出（StackOverflowError）"
          />

          <Callout type="danger" title="栈溢出风险">
            <strong>StackOverflowError</strong>：当线程请求的栈深度超过虚拟机允许的最大深度时抛出。常见于无限递归或过深的递归调用。<br/><br/>
            <strong>OutOfMemoryError</strong>：如果栈扩展时无法申请到足够内存，也会抛出OOM（较少见）。
          </Callout>

          <h3 id="stack-parameters" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            栈相关参数
          </h3>
          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">参数</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">说明</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">默认值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">-Xss</td>
                <td className="border border-border-light px-3 py-2">每个线程的栈大小</td>
                <td className="border border-border-light px-3 py-2">1MB（64位JVM）</td>
              </tr>
            </tbody>
          </table>

          <SideNote>
            <strong>-Xss设置建议：</strong><br/>
            • 线程多且栈帧小：减小-Xss（如256k），节省内存<br/>
            • 递归深度大或局部变量多：增大-Xss（如2MB），避免栈溢出<br/>
            • 生产环境需根据实际场景压测确定
          </SideNote>

          <h2 id="method-area" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、方法区（Method Area）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            方法区是<strong className="text-accent">线程共享</strong>的内存区域，用于存储已被虚拟机加载的类信息、常量、静态变量等。
          </p>

          <h3 id="method-area-evolution" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            方法区的演进
          </h3>
          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">JDK版本</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">实现</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">特点</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2">JDK 7及以前</td>
                <td className="border border-border-light px-3 py-2">永久代（PermGen）</td>
                <td className="border border-border-light px-3 py-2">属于堆的一部分，容易OOM</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">JDK 8及以后</td>
                <td className="border border-border-light px-3 py-2">元空间（Metaspace）</td>
                <td className="border border-border-light px-3 py-2">使用本地内存，默认无上限</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`// 查看方法区（元空间）使用情况
public class MetaspaceInfo {
    public static void main(String[] args) {
        java.lang.management.MemoryMXBean memoryBean = 
            java.lang.management.ManagementFactory.getMemoryMXBean();
        
        for (java.lang.management.MemoryPoolMXBean pool : 
             memoryBean.getMemoryPoolMXBeans()) {
            if (pool.getName().contains("Metaspace")) {
                System.out.println("名称: " + pool.getName());
                System.out.println("已使用: " + 
                    pool.getUsage().getUsed() / 1024 / 1024 + " MB");
                System.out.println("最大值: " + 
                    pool.getUsage().getMax() / 1024 / 1024 + " MB");
            }
        }
    }
}

// 输出示例：
// 名称: Metaspace
// 已使用: 25 MB
// 最大值: -1 MB（-1表示无限制）`}
            language="java"
            description="监控元空间使用情况"
          />

          <h3 id="metaspace-parameters" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            元空间参数
          </h3>
          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">参数</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">说明</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">-XX:MetaspaceSize</td>
                <td className="border border-border-light px-3 py-2">初始元空间大小</td>
                <td className="border border-border-light px-3 py-2 font-mono">-XX:MetaspaceSize=128m</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">-XX:MaxMetaspaceSize</td>
                <td className="border border-border-light px-3 py-2">最大元空间大小</td>
                <td className="border border-border-light px-3 py-2 font-mono">-XX:MaxMetaspaceSize=512m</td>
              </tr>
            </tbody>
          </table>

          <Callout type="warning" title="元空间OOM风险">
            虽然元空间默认无上限，但如果加载大量类（如动态代理、OSGi、热部署），可能导致本地内存耗尽。生产环境建议设置 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">-XX:MaxMetaspaceSize</code> 限制。
          </Callout>

          <h2 id="pc-register" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、程序计数器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            程序计数器（Program Counter Register）是<strong className="text-accent">一块较小的内存空间</strong>，可以看作是当前线程所执行的字节码的行号指示器。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4">
            <li><strong>线程私有</strong>：每条线程都有一个独立的程序计数器</li>
            <li><strong>生命周期</strong>：与线程相同</li>
            <li><strong>作用</strong>：记录当前线程执行的字节码指令地址</li>
            <li><strong>唯一不会OOM的区域</strong>：因为只存储很小的行号信息</li>
          </ul>

          <SideNote>
            如果线程正在执行的是Java方法，程序计数器记录的是正在执行的虚拟机字节码指令的地址；如果是Native方法，则计数器值为空（Undefined）。
          </SideNote>

          <h2 id="native-method-stack" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、本地方法栈
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            本地方法栈（Native Method Stack）与虚拟机栈类似，区别在于：
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4">
            <li>虚拟机栈为执行<strong className="text-accent">Java方法</strong>服务</li>
            <li>本地方法栈为执行<strong className="text-accent">Native方法</strong>服务</li>
          </ul>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HotSpot虚拟机将本地方法栈和虚拟机栈合二为一，因此不需要单独区分。
          </p>

          <Playground
            code={`public class NativeMethodExample {
    // 声明native方法
    public native void nativePrint();
    
    static {
        // 加载本地库
        System.loadLibrary("native-lib");
    }
    
    public static void main(String[] args) {
        new NativeMethodExample().nativePrint();
        // 调用C/C++实现的本地方法
        // 本地方法栈会为该调用分配内存
    }
}`}
            language="java"
            description="Native方法调用示例"
          />

          <h2 id="direct-memory" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、直接内存
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            直接内存（Direct Memory）不是JVM运行时数据区的一部分，但频繁被使用。通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ByteBuffer.allocateDirect()</code> 分配。
          </p>

          <Playground
            code={`import java.nio.ByteBuffer;

public class DirectMemoryExample {
    public static void main(String[] args) {
        // 分配直接内存（不在堆中）
        ByteBuffer directBuffer = ByteBuffer.allocateDirect(1024 * 1024); // 1MB
        
        System.out.println("直接内存分配成功");
        System.out.println("容量: " + directBuffer.capacity() + " bytes");
        
        // 直接内存的优势：
        // 1. 避免Java堆和本地堆之间的数据拷贝
        // 2. I/O操作性能更高（零拷贝）
        
        // 注意：直接内存不受GC直接管理，需要手动释放或使用GC间接回收
    }
}`}
            language="java"
            description="直接内存分配与使用"
          />

          <Callout type="info" title="直接内存的应用场景">
            <strong>NIO零拷贝</strong>：网络传输、文件I/O时避免数据在用户态和内核态之间复制。<br/><br/>
            <strong>注意事项</strong>：直接内存分配和回收成本较高，适合大缓冲区、长生命周期的场景。
          </Callout>

          <h2 id="memory-leak" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、内存泄漏与溢出
          </h2>

          <h3 id="oom-types" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            常见的OOM类型
          </h3>
          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">异常类型</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">原因</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">解决方案</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">OutOfMemoryError:<br/>Java heap space</td>
                <td className="border border-border-light px-3 py-2">堆内存不足</td>
                <td className="border border-border-light px-3 py-2">增大-Xmx、优化代码、排查内存泄漏</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">OutOfMemoryError:<br/>GC overhead limit exceeded</td>
                <td className="border border-border-light px-3 py-2">GC时间占比超过98%</td>
                <td className="border border-border-light px-3 py-2">检查是否有内存泄漏、优化GC策略</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">OutOfMemoryError:<br/>Metaspace</td>
                <td className="border border-border-light px-3 py-2">元空间不足</td>
                <td className="border border-border-light px-3 py-2">增大MaxMetaspaceSize、减少动态类生成</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">StackOverflowError</td>
                <td className="border border-border-light px-3 py-2">栈深度超限</td>
                <td className="border border-border-light px-3 py-2">增大-Xss、优化递归逻辑</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`import java.util.ArrayList;
import java.util.List;

public class MemoryLeakDemo {
    private static List<byte[]> leakList = new ArrayList<>();
    
    public static void simulateLeak() {
        // 模拟内存泄漏：不断添加对象但不释放
        while (true) {
            leakList.add(new byte[1024 * 1024]); // 每次添加1MB
            System.out.println("已分配: " + 
                leakList.size() + " MB");
            
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    
    public static void main(String[] args) {
        // 运行参数：-Xmx100m
        // 约100次循环后抛出：OutOfMemoryError: Java heap space
        simulateLeak();
    }
}`}
            language="java"
            description="模拟堆内存泄漏"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区1：栈内存泄漏会导致OOM">
            <strong>错误</strong>：认为栈会发生内存泄漏。<br/><br/>
            <strong>正确</strong>：栈是线程私有的，方法执行完毕后栈帧自动弹出，不会泄漏。栈只会因递归过深导致StackOverflowError。
          </Callout>

          <Callout type="danger" title="误区2：方法区就是永久代">
            <strong>错误</strong>：认为方法区和永久代是同一个概念。<br/><br/>
            <strong>正确</strong>：方法区是JVM规范中的概念，永久代是HotSpot JDK 7及以前的实现。JDK 8之后用元空间替代永久代，但方法区的概念依然存在。
          </Callout>

          <Callout type="danger" title="误区3：堆越大越好">
            <strong>错误</strong>：认为堆内存设置越大性能越好。<br/><br/>
            <strong>正确</strong>：堆过大会导致GC停顿时间变长。应根据应用实际需求设置合理的堆大小，并选择合适的GC算法。一般建议设置为物理内存的50%-75%。
          </Callout>

          <Callout type="danger" title="误区4：程序计数器会OOM">
            <strong>错误</strong>：认为程序计数器可能抛出OutOfMemoryError。<br/><br/>
            <strong>正确</strong>：程序计数器是JVM规范中唯一没有规定任何OutOfMemoryError情况的区域，因为它只存储很小的行号信息。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "JVM内存结构有哪些区域？哪些是线程共享的，哪些是线程私有的？",
                answer: "JVM内存结构包括：堆（Heap）、方法区（Method Area）、虚拟机栈（Stack）、程序计数器（PC Register）、本地方法栈（Native Method Stack）。\n\n线程共享：堆、方法区\n线程私有：虚拟机栈、程序计数器、本地方法栈"
              },
              {
                question: "堆为什么要分新生代和老年代？",
                answer: "基于弱分代假说：绝大多数对象朝生夕死。分代后可以采用不同的GC策略：\n• 新生代：使用复制算法，效率高\n• 老年代：使用标记-清除或标记-整理算法\n这样能提升GC效率，减少停顿时间。"
              },
              {
                question: "JDK 8为什么用元空间替换永久代？",
                answer: "主要原因：\n1. 永久代大小难以确定：设置太小易OOM，太大浪费内存\n2. 元空间使用本地内存，默认无上限，更灵活\n3. 简化Full GC：永久代回收效率低，元空间不受JVM GC直接管理\n4. 与JRockit统一：Oracle收购BEA后，希望两个JVM实现保持一致"
              },
              {
                question: "什么情况下会发生StackOverflowError？如何解决？",
                answer: "发生场景：\n• 无限递归调用\n• 递归深度过大\n• 方法局部变量过多\n\n解决方案：\n• 优化递归逻辑，改为迭代\n• 增大-Xss参数（如从1MB增加到2MB）\n• 减少方法局部变量数量"
              },
              {
                question: "如何排查内存泄漏问题？",
                answer: "排查步骤：\n1. 监控：使用jstat、JVisualVM监控堆内存使用趋势\n2. dump：使用jmap -dump生成堆转储文件\n3. 分析：使用MAT（Memory Analyzer Tool）分析dump文件\n4. 定位：查找支配树（Dominator Tree），找到占用内存最多的对象\n5. 修复：检查代码中是否有未释放的资源、静态集合持续增长等问题"
              },
              {
                question: "直接内存和堆内存有什么区别？",
                answer: "区别：\n1. 分配位置：直接内存在本地内存（堆外），堆内存在Java堆\n2. GC管理：直接内存不受GC直接管理，堆内存由GC管理\n3. 性能：直接内存I/O性能更高（零拷贝），但分配/回收成本高\n4. 适用场景：直接内存适合大缓冲区、长时间使用的NIO操作；堆内存适合普通对象存储"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <a href="/docs/04-jvm/garbage-collection" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ 垃圾收集器详解</h4>
              <p className="text-sm text-ink-muted">了解不同内存区域的GC算法和收集器选择</p>
            </a>
            <a href="/docs/04-jvm/jvm-tuning" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ JVM调优实战</h4>
              <p className="text-sm text-ink-muted">学习如何根据内存结构进行JVM参数调优</p>
            </a>
            <a href="/docs/04-jvm/class-loading" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ 类加载机制</h4>
              <p className="text-sm text-ink-muted">了解类信息如何存储在方法区/元空间</p>
            </a>
            <a href="/docs/03-multithreading/multi-threading-basics" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ 多线程基础</h4>
              <p className="text-sm text-ink-muted">理解线程私有内存区域的线程安全特性</p>
            </a>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
