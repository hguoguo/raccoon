import KnowledgeLayout from '../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../components/knowledge/Playground'
import SideNote from '../../../components/knowledge/SideNote'
import SmartTOC from '../../../components/knowledge/SmartTOC'
import Callout from '../../../components/ui/Callout'
import DiagramBlock from '../../../components/ui/DiagramBlock'
import InterviewSection from '../../../components/ui/InterviewSection'
import ArticleNav from '../../../components/article/ArticleNav'
import { getArticleNav } from '../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'gc-algorithms', text: '一、GC算法基础', level: 2 },
  { id: 'reference-types', text: '二、引用类型与可达性分析', level: 2 },
  { id: 'serial-gc', text: '三、Serial收集器', level: 2 },
  { id: 'parnew-gc', text: '四、ParNew收集器', level: 2 },
  { id: 'cms-gc', text: '五、CMS收集器', level: 2 },
  { id: 'g1-gc', text: '六、G1收集器（重点🔥）', level: 2 },
  { id: 'zgc', text: '七、ZGC收集器', level: 2 },
  { id: 'shenandoah', text: '八、Shenandoah收集器', level: 2 },
  { id: 'gc-selection', text: '九、GC选择策略', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function GarbageCollection({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              垃圾回收（Garbage Collection）是JVM自动管理内存的机制，通过<strong className="text-accent">识别并回收不再使用的对象</strong>，
              防止内存泄漏，开发者无需手动释放内存，但需要理解GC原理以优化性能。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要了解GC？">
            虽然Java自动管理内存，但不当的对象引用会导致内存泄漏，不合理的GC配置会导致频繁停顿（Stop-The-World）。理解GC有助于排查OOM、优化响应时间。
          </Callout>

          <h2 id="gc-algorithms" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、GC算法基础
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JVM采用多种GC算法来回收内存，每种算法有不同的优缺点：
          </p>

          <h3 id="mark-sweep" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            标记-清除算法（Mark-Sweep）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            最基础的GC算法，分为两个阶段：
          </p>
          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4">
            <li><strong>标记</strong>：从GC Roots出发，标记所有存活对象</li>
            <li><strong>清除</strong>：回收未标记的对象</li>
          </ol>

          <Callout type="warning" title="缺点">
            • 产生内存碎片<br/>
            • 标记和清除效率都不高<br/>
            • 需要暂停用户线程（STW）
          </Callout>

          <h3 id="copying" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            复制算法（Copying）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            将内存分为两块，每次只使用一块。GC时将存活对象复制到另一块，然后清空原区域。
          </p>

          <DiagramBlock title="复制算法流程">
            <pre className="text-[12px] sm:text-[13px] leading-relaxed text-left font-mono">{`Before GC:                After GC:
┌──────┬──────┐           ┌──────┬──────┐
│ Used │ Free │           │ Free │ Used │
│ A B  │      │  ----->   │      │ A B  │
│ C D  │      │           │      │ C D  │
└──────┴──────┘           └──────┴──────┘
  (清空)                     (存活对象复制)`}</pre>
          </DiagramBlock>

          <Callout type="info" title="优点与缺点">
            <strong>优点</strong>：无内存碎片、实现简单、效率高<br/>
            <strong>缺点</strong>：内存利用率只有50%<br/><br/>
            <strong>应用</strong>：新生代GC（因为大多数对象朝生夕死，复制成本低）
          </Callout>

          <h3 id="mark-compact" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            标记-整理算法（Mark-Compact）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            标记阶段与标记-清除相同，但后续让存活对象向一端移动，然后清理边界外的内存。
          </p>

          <DiagramBlock title="标记-整理算法">
            <pre className="text-[12px] sm:text-[13px] leading-relaxed text-left font-mono">{`Before:                   After:
┌───┬───┬───┬───┐         ┌───┬───┬───┬───┐
│ A │ X │ B │ X │         │ A │ B │   │   │
└───┴───┴───┴───┘         └───┴───┴───┴───┘
(X=垃圾)                    (整理后无碎片)`}</pre>
          </DiagramBlock>

          <Callout type="info" title="适用场景">
            老年代GC：对象存活率高，复制成本大，适合标记-整理。
          </Callout>

          <h3 id="generational" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            分代收集算法（Generational Collection）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            现代JVM采用的主流策略，基于<strong className="text-accent">弱分代假说</strong>：绝大多数对象朝生夕死。
          </p>

          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">区域</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">特点</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">GC算法</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">新生代</td>
                <td className="border border-border-light px-3 py-2">对象存活率低</td>
                <td className="border border-border-light px-3 py-2">复制算法</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">老年代</td>
                <td className="border border-border-light px-3 py-2">对象存活率高</td>
                <td className="border border-border-light px-3 py-2">标记-清除或标记-整理</td>
              </tr>
            </tbody>
          </table>

          <h2 id="reference-types" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、引用类型与可达性分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JVM通过<strong className="text-accent">可达性分析算法</strong>判断对象是否存活：从GC Roots出发，搜索引用链，无法到达的对象即为垃圾。
          </p>

          <h3 id="gc-roots" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            GC Roots包括
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4">
            <li>虚拟机栈中引用的对象</li>
            <li>方法区中类静态属性引用的对象</li>
            <li>方法区中常量引用的对象</li>
            <li>本地方法栈中JNI引用的对象</li>
          </ul>

          <h3 id="reference-levels" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            四种引用类型
          </h3>
          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">引用类型</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">GC时机</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">应用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">强引用</td>
                <td className="border border-border-light px-3 py-2">永不回收</td>
                <td className="border border-border-light px-3 py-2">普通对象引用</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">软引用</td>
                <td className="border border-border-light px-3 py-2">内存不足时</td>
                <td className="border border-border-light px-3 py-2">缓存</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">弱引用</td>
                <td className="border border-border-light px-3 py-2">下次GC时</td>
                <td className="border border-border-light px-3 py-2">WeakHashMap</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">虚引用</td>
                <td className="border border-border-light px-3 py-2">随时可能</td>
                <td className="border border-border-light px-3 py-2">对象回收跟踪</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`import java.lang.ref.SoftReference;
import java.lang.ref.WeakReference;

public class ReferenceExample {
    public static void main(String[] args) {
        // 强引用
        Object strongRef = new Object();
        
        // 软引用 - 内存不足时才回收
        SoftReference<Object> softRef = new SoftReference<>(new Object());
        
        // 弱引用 - 下次GC就回收
        WeakReference<Object> weakRef = new WeakReference<>(new Object());
        
        System.out.println("软引用: " + softRef.get());
        System.out.println("弱引用: " + weakRef.get());
        
        // 触发GC
        System.gc();
        
        System.out.println("GC后 - 软引用: " + softRef.get());
        System.out.println("GC后 - 弱引用: " + weakRef.get()); // null
    }
}`}
            language="java"
            description="演示不同引用类型的GC行为"
          />

          <h2 id="serial-gc" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Serial收集器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            最早的收集器，<strong className="text-accent">单线程</strong>执行，GC时必须暂停所有用户线程（Stop-The-World）。
          </p>

          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">特性</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">线程数</td>
                <td className="border border-border-light px-3 py-2">单线程</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">算法</td>
                <td className="border border-border-light px-3 py-2">复制算法（新生代）、标记-整理（老年代）</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">优点</td>
                <td className="border border-border-light px-3 py-2">简单高效，无线程切换开销</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">缺点</td>
                <td className="border border-border-light px-3 py-2">GC时应用完全停顿</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">适用场景</td>
                <td className="border border-border-light px-3 py-2">Client模式、单核CPU、小内存应用</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="启用方式">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">-XX:+UseSerialGC</code>
          </Callout>

          <h2 id="parnew-gc" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、ParNew收集器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Serial的多线程版本，其他行为与Serial完全相同。
          </p>

          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">特性</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">线程数</td>
                <td className="border border-border-light px-3 py-2">多线程（默认与CPU核数相同）</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">参数控制</td>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">-XX:ParallelGCThreads</code></td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">搭配</td>
                <td className="border border-border-light px-3 py-2">常与CMS配合使用</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="启用方式">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">-XX:+UseParNewGC</code>（JDK 8及以前）
          </Callout>

          <h2 id="cms-gc" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、CMS收集器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Concurrent Mark Sweep，第一款以<strong className="text-accent">获取最短回收停顿时间</strong>为目标的收集器。
          </p>

          <h3 id="cms-phases" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            CMS四个阶段
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4">
            <li><strong>初始标记（Initial Mark）</strong>：标记GC Roots直接关联的对象，STW，速度快</li>
            <li><strong>并发标记（Concurrent Mark）</strong>：从GC Roots开始遍历对象图，与用户线程并发执行</li>
            <li><strong>重新标记（Remark）</strong>：修正并发标记期间因用户程序继续运作而导致标记产生变动的那一部分对象的标记记录，STW</li>
            <li><strong>并发清除（Concurrent Sweep）</strong>：清理未标记的对象，与用户线程并发执行</li>
          </ol>

          <DiagramBlock title="CMS工作流程">
            <pre className="text-[12px] sm:text-[13px] leading-relaxed text-left font-mono">{`时间线 →
┌────────┬──────────┬──────────┬──────────┐
│初始标记│ 并发标记  │ 重新标记  │ 并发清除  │
│ (STW)  │(并发执行) │  (STW)   │(并发执行) │
└────────┴──────────┴──────────┴──────────┘
   短停顿     长时间      短停顿     长时间`}</pre>
          </DiagramBlock>

          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">优点</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">缺点</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2">并发收集、低停顿</td>
                <td className="border border-border-light px-3 py-2">对CPU敏感、产生浮动垃圾、内存碎片</td>
              </tr>
            </tbody>
          </table>

          <Callout type="warning" title="CMS问题">
            • <strong>CMS Old Generation OOM</strong>：并发清除时用户线程仍在运行，可能产生新垃圾导致空间不足<br/>
            • <strong>内存碎片</strong>：标记-清除算法导致，可通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">-XX:+UseCMSCompactAtFullCollection</code> 解决
          </Callout>

          <Callout type="info" title="启用方式">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">-XX:+UseConcMarkSweepGC</code>（JDK 9已废弃，JDK 14移除）
          </Callout>

          <h2 id="g1-gc" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、G1收集器（重点🔥）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Garbage-First，JDK 9默认的收集器，面向服务端应用，可预测停顿时间模型。
          </p>

          <h3 id="g1-features" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            G1核心特性
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4">
            <li><strong>并行与并发</strong>：充分利用多核CPU</li>
            <li><strong>分代收集</strong>：逻辑上分代，物理上不连续</li>
            <li><strong>空间整合</strong>：整体采用标记-整理，局部采用复制算法</li>
            <li><strong>可预测停顿</strong>：建立可预测的停顿时间模型</li>
          </ul>

          <h3 id="g1-region" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            Region分区
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            G1将堆划分为多个大小相等的独立区域（Region），每个Region可以是Eden、Survivor、Old或Humongous（大对象）。
          </p>

          <DiagramBlock title="G1 Region布局">
            <pre className="text-[12px] sm:text-[13px] leading-relaxed text-left font-mono">{`堆内存被划分为多个Region:
┌────┬────┬────┬────┬────┬────┬────┬────┐
│ E  │ E  │ S  │ S  │ O  │ O  │ H  │ O  │
├────┼────┼────┼────┼────┼────┼────┼────┤
│ E  │ O  │ O  │ S  │ E  │ O  │ O  │ E  │
└────┴────┴────┴────┴────┴────┴────┴────┘
E=Eden  S=Survivor  O=Old  H=Humongous`}</pre>
          </DiagramBlock>

          <h3 id="g1-phases" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            G1回收阶段
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4">
            <li><strong>Young Collection</strong>：新生代回收，STW，采用复制算法</li>
            <li><strong>Young Collection + CM</strong>：新生代回收同时并发标记</li>
            <li><strong>Mixed Collection</strong>：新生代+部分老年代Region回收</li>
            <li><strong>Full GC</strong>：单线程标记-清除-整理（应避免出现）</li>
          </ol>

          <Playground
            code={`// G1常用参数配置
// -Xms4g -Xmx4g                      # 堆大小
// -XX:+UseG1GC                        # 启用G1（JDK 9+默认）
// -XX:MaxGCPauseMillis=200            # 最大停顿时间目标
// -XX:G1HeapRegionSize=16m            # Region大小（1-32MB，2的幂）
// -XX:InitiatingHeapOccupancyPercent=45  # 触发并发标记的堆占用阈值
// -XX:ConcGCThreads=4                 # 并发标记线程数

public class G1ConfigExample {
    public static void main(String[] args) {
        System.out.println("G1收集器已启用");
        System.out.println("最大停顿时间目标: 200ms");
        
        // 监控G1状态
        String gcName = java.lang.management.ManagementFactory
            .getGarbageCollectorMXBeans()
            .get(0).getName();
        System.out.println("当前GC: " + gcName);
        // 输出: G1 Young Generation / G1 Old Generation
    }
}`}
            language="java"
            description="G1收集器配置示例"
          />

          <SideNote>
            <strong>G1调优建议：</strong><br/>
            • 优先调整 <code className="font-mono text-[12px]">-XX:MaxGCPauseMillis</code>，不要设置过小（{'<'}50ms会导致吞吐量下降）<br/>
            • 避免Full GC：如果出现，说明Mixed GC跟不上分配速度，需增大堆或调整IHOP<br/>
            • Humongous对象：超过Region 50%的对象直接分配到Humongous Region，容易引发提前GC
          </SideNote>

          <h2 id="zgc" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、ZGC收集器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Z Garbage Collector，JDK 11引入的实验性功能，JDK 15正式生产可用。<strong className="text-accent">停顿时间不超过10ms</strong>，支持TB级堆内存。
          </p>

          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">特性</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">停顿时间</td>
                <td className="border border-border-light px-3 py-2">&lt; 10ms（与堆大小无关）</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">堆大小支持</td>
                <td className="border border-border-light px-3 py-2">8MB - 16TB</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">核心技术</td>
                <td className="border border-border-light px-3 py-2">着色指针（Colored Pointers）、读屏障（Load Barriers）</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">适用场景</td>
                <td className="border border-border-light px-3 py-2">大内存、低延迟要求的应用</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="启用方式">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">-XX:+UseZGC</code>（JDK 15+生产可用）
          </Callout>

          <h2 id="shenandoah" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、Shenandoah收集器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Red Hat开发的低停顿GC，与ZGC类似，停顿时间与堆大小无关。
          </p>

          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">对比项</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">ZGC</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">Shenandoah</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">开发方</td>
                <td className="border border-border-light px-3 py-2">Oracle</td>
                <td className="border border-border-light px-3 py-2">Red Hat</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">核心技术</td>
                <td className="border border-border-light px-3 py-2">着色指针</td>
                <td className="border border-border-light px-3 py-2">读屏障+Brooks Pointer</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">JDK版本</td>
                <td className="border border-border-light px-3 py-2">JDK 11+</td>
                <td className="border border-border-light px-3 py-2">JDK 12+</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">停顿时间</td>
                <td className="border border-border-light px-3 py-2">&lt; 10ms</td>
                <td className="border border-border-light px-3 py-2">&lt; 10ms</td>
              </tr>
            </tbody>
          </table>

          <Callout type="info" title="启用方式">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">-XX:+UseShenandoahGC</code>
          </Callout>

          <h2 id="gc-selection" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、GC选择策略
          </h2>

          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">应用场景</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">推荐GC</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">理由</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2">小型应用、嵌入式</td>
                <td className="border border-border-light px-3 py-2 font-mono">Serial</td>
                <td className="border border-border-light px-3 py-2">简单高效</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">多核服务器、中等堆</td>
                <td className="border border-border-light px-3 py-2 font-mono">G1</td>
                <td className="border border-border-light px-3 py-2">平衡吞吐量和延迟</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">超大堆（&gt;6GB）、低延迟</td>
                <td className="border border-border-light px-3 py-2 font-mono">ZGC/Shenandoah</td>
                <td className="border border-border-light px-3 py-2">停顿时间与堆大小无关</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">JDK 8老系统</td>
                <td className="border border-border-light px-3 py-2 font-mono">ParNew + CMS</td>
                <td className="border border-border-light px-3 py-2">成熟稳定（但已废弃）</td>
              </tr>
            </tbody>
          </table>

          <SideNote>
            <strong>JDK版本建议：</strong><br/>
            • JDK 8：ParNew + CMS 或 Parallel Scavenge + Parallel Old<br/>
            • JDK 11：G1（默认）<br/>
            • JDK 17+：G1（默认）或 ZGC（实验性）<br/>
            • JDK 21+：ZGC已成为生产级别
          </SideNote>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="danger" title="误区1：System.gc()能立即回收内存">
            <strong>错误</strong>：认为调用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">System.gc()</code> 会立即触发GC。<br/><br/>
            <strong>正确</strong>：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">System.gc()</code> 只是建议JVM进行GC，具体何时执行由JVM决定。可通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">-XX:+DisableExplicitGC</code> 禁用。
          </Callout>

          <Callout type="danger" title="误区2：GC停顿时间越短越好">
            <strong>错误</strong>：认为停顿时间设置得越小性能越好。<br/><br/>
            <strong>正确</strong>：过短的停顿时间目标会导致GC频率增加，反而降低吞吐量。应根据业务需求平衡延迟和吞吐量。
          </Callout>

          <Callout type="danger" title="误区3：老年代对象永远不会被回收">
            <strong>错误</strong>：认为进入老年代的对象就不会被GC。<br/><br/>
            <strong>正确</strong>：老年代也会进行GC（Major GC / Full GC），只是频率较低。当老年代空间不足时会触发。
          </Callout>

          <Callout type="danger" title="误区4：G1不需要调优">
            <strong>错误</strong>：认为G1是自适应的，不需要任何调优。<br/><br/>
            <strong>正确</strong>：G1虽然智能化程度高，但仍需根据应用特点调整关键参数（如MaxGCPauseMillis、IHOP等），否则可能出现性能问题。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "常见的GC算法有哪些？各自的优缺点是什么？",
                answer: "1. 标记-清除：产生内存碎片，效率低\n2. 复制算法：无碎片，但内存利用率50%，适合新生代\n3. 标记-整理：无碎片，但需要移动对象，适合老年代\n4. 分代收集：结合以上算法，新生代用复制，老年代用标记-整理，是现代JVM的主流方案"
              },
              {
                question: "什么是Stop-The-World（STW）？为什么会产生？",
                answer: "STW是指GC过程中暂停所有用户线程的现象。产生原因：\n• GC需要保证对象引用关系的一致性\n• 如果用户线程继续运行，可能导致对象在标记过程中被修改\n• 除了并发GC的部分阶段，大部分GC操作都需要STW"
              },
              {
                question: "G1收集器的核心优势是什么？",
                answer: "1. 可预测停顿时间：通过建立停顿时间模型，尽量满足用户设定的停顿目标\n2. 并行与并发：充分利用多核CPU\n3. 空间整合：整体标记-整理，局部复制算法，无内存碎片\n4. Region分区：灵活管理内存，优先回收垃圾最多的Region（Garbage-First）"
              },
              {
                question: "CMS和G1有什么区别？",
                answer: "1. 算法：CMS使用标记-清除，G1整体标记-整理+局部复制\n2. 内存布局：CMS必须连续，G1采用Region分区\n3. 停顿时间：CMS停顿不可控，G1可预测\n4. 内存碎片：CMS会产生碎片，G1不会\n5. JDK支持：CMS在JDK 9废弃，G1是JDK 9+默认GC"
              },
              {
                question: "如何排查GC问题？",
                answer: "排查步骤：\n1. 监控：使用jstat -gc pid观察GC频率和耗时\n2. 日志：开启GC日志 -Xlog:gc*:file=gc.log\n3. 可视化：使用JVisualVM、GCViewer分析GC日志\n4. 调优：根据监控数据调整堆大小、GC算法、相关参数\n5. 代码层面：检查是否有内存泄漏、大对象频繁创建等问题"
              },
              {
                question: "什么是浮动垃圾？CMS如何处理？",
                answer: "浮动垃圾：CMS并发清除阶段，用户线程仍在运行，产生的新垃圾无法在本次GC中清理。\n\n处理方式：\n• CMS不能清理浮动垃圾，只能等到下次GC\n• 因此CMS需要预留一部分空间（-XX:CMSInitiatingOccupancyFraction）用于容纳浮动垃圾\n• 如果预留不足，可能导致Concurrent Mode Failure，退化为Serial Old GC"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <a href="/docs/04-jvm/jvm-memory-model" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ JVM内存结构</h4>
              <p className="text-sm text-ink-muted">了解GC管理的各个内存区域</p>
            </a>
            <a href="/docs/04-jvm/jvm-tuning" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ JVM调优实战</h4>
              <p className="text-sm text-ink-muted">学习GC参数调优和性能监控</p>
            </a>
            <a href="/docs/03-multithreading/multi-threading-basics" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ 多线程基础</h4>
              <p className="text-sm text-ink-muted">理解GC过程中的线程安全问题</p>
            </a>
            <a href="/docs/02-collections/concurrent-collections" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ 并发集合类</h4>
              <p className="text-sm text-ink-muted">了解WeakHashMap等与GC相关的集合</p>
            </a>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
