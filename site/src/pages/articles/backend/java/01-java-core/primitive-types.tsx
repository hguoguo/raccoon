import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import InteractiveFlow from '../../../../../components/knowledge/InteractiveFlow'
import SideNote from '../../../../../components/knowledge/SideNote'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、基本数据类型概览', level: 2 },
  { id: 'wrapper-class', text: '二、包装类体系', level: 2 },
  { id: 'autoboxing', text: '三、自动装箱与拆箱', level: 2 },
  { id: 'integer-cache', text: '四、Integer 缓存机制（重点🔥）', level: 2 },
  { id: 'type-conversion', text: '五、类型转换规则', level: 2 },
  { id: 'common-mistakes', text: '六、常见陷阱与误区', level: 2 },
  { id: 'performance', text: '七、性能对比分析', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function PrimitiveTypes({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <section id="definition">
            <blockquote className="border-l-[3px] border-l-accent pl-4 py-2 my-6 bg-accent-glow rounded-r-paper-md">
              <p className="text-[15px] sm:text-base font-medium text-ink leading-[1.7]">
                Java 的基本数据类型是<strong className="text-accent">值类型</strong>，存储在栈内存中；包装类是<strong className="text-accent">引用类型</strong>，存储在堆内存中。JDK 5 引入的自动装箱/拆箱机制让两者可以无缝转换，但 Integer 等包装类的缓存机制和 == 比较陷阱是高频考点。
              </p>
            </blockquote>
          </section>

          {/* ========== 一、基本数据类型概览 ========== */}
          <section id="overview">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              一、基本数据类型概览
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Java 提供了 8 种基本数据类型，分为整数、浮点数、字符和布尔四类。它们直接存储值，不涉及对象开销，因此性能更高、内存占用更少。
            </p>

            <DiagramBlock title="Java 基本数据类型全景图">
              {`graph LR
                subgraph 整数类型
                  BYTE["byte (1字节)<br/>-128 ~ 127"]
                  SHORT["short (2字节)<br/>-32768 ~ 32767"]
                  INT["int (4字节) ⭐<br/>-2³¹ ~ 2³¹-1"]
                  LONG["long (8字节)<br/>-2⁶³ ~ 2⁶³-1"]
                end
                subgraph 浮点类型
                  FLOAT["float (4字节)<br/>单精度 6-7位"]
                  DOUBLE["double (8字节) ⭐<br/>双精度 15-16位"]
                end
                subgraph 字符类型
                  CHAR["char (2字节)<br/>'A' '\\u0000'"]
                end
                subgraph 布尔类型
                  BOOL["boolean<br/>true / false"]
                end
                style 整数类型 fill:#f5f0e8,stroke:#d4c5a9,stroke-width:2px
                style 浮点类型 fill:#f5f0e8,stroke:#d4c5a9,stroke-width:2px
                style 字符类型 fill:#f5f0e8,stroke:#d4c5a9,stroke-width:2px
                style 布尔类型 fill:#f5f0e8,stroke:#d4c5a9,stroke-width:2px
                style BYTE fill:#b5651d25,stroke:#b5651d
                style SHORT fill:#b5651d25,stroke:#b5651d
                style INT fill:#b5651d33,stroke:#b5651d,stroke-width:2px
                style LONG fill:#b5651d25,stroke:#b5651d
                style FLOAT fill:#a0522d25,stroke:#a0522d
                style DOUBLE fill:#a0522d33,stroke:#a0522d,stroke-width:2px
                style CHAR fill:#5f7a6825,stroke:#5f7a68
                style BOOL fill:#6a5acd25,stroke:#6a5acd
              `}
            </DiagramBlock>

            <div className="overflow-x-auto my-5">
              <table className="w-full text-[12px] sm:text-[13px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 font-semibold text-ink">类型</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">字节数</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">取值范围</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">默认值</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">使用场景</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 font-mono text-accent">byte</td>
                    <td className="py-2 px-3 text-ink-muted">1</td>
                    <td className="py-2 px-3 text-ink-muted">-128 ~ 127</td>
                    <td className="py-2 px-3 text-ink-muted">0</td>
                    <td className="py-2 px-3 text-ink-muted">网络传输、文件IO</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 font-mono text-accent">short</td>
                    <td className="py-2 px-3 text-ink-muted">2</td>
                    <td className="py-2 px-3 text-ink-muted">-32768 ~ 32767</td>
                    <td className="py-2 px-3 text-ink-muted">0</td>
                    <td className="py-2 px-3 text-ink-muted">较少使用</td>
                  </tr>
                  <tr className="border-b border-border-light bg-accent-glow/30">
                    <td className="py-2 px-3 font-mono text-accent font-semibold">int</td>
                    <td className="py-2 px-3 text-ink-muted">4</td>
                    <td className="py-2 px-3 text-ink-muted">-2³¹ ~ 2³¹-1</td>
                    <td className="py-2 px-3 text-ink-muted">0</td>
                    <td className="py-2 px-3 text-ink-muted font-semibold">最常用整数类型</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 font-mono text-accent">long</td>
                    <td className="py-2 px-3 text-ink-muted">8</td>
                    <td className="py-2 px-3 text-ink-muted">-2⁶³ ~ 2⁶³-1</td>
                    <td className="py-2 px-3 text-ink-muted">0L</td>
                    <td className="py-2 px-3 text-ink-muted">时间戳、大整数</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 font-mono text-accent">float</td>
                    <td className="py-2 px-3 text-ink-muted">4</td>
                    <td className="py-2 px-3 text-ink-muted">±3.4E38</td>
                    <td className="py-2 px-3 text-ink-muted">0.0f</td>
                    <td className="py-2 px-3 text-ink-muted">图形处理、游戏</td>
                  </tr>
                  <tr className="border-b border-border-light bg-accent-glow/30">
                    <td className="py-2 px-3 font-mono text-accent font-semibold">double</td>
                    <td className="py-2 px-3 text-ink-muted">8</td>
                    <td className="py-2 px-3 text-ink-muted">±1.7E308</td>
                    <td className="py-2 px-3 text-ink-muted">0.0d</td>
                    <td className="py-2 px-3 text-ink-muted font-semibold">科学计算、金融</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 font-mono text-accent">char</td>
                    <td className="py-2 px-3 text-ink-muted">2</td>
                    <td className="py-2 px-3 text-ink-muted">'\u0000' ~ '\uffff'</td>
                    <td className="py-2 px-3 text-ink-muted">'\u0000'</td>
                    <td className="py-2 px-3 text-ink-muted">字符处理</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 font-mono text-accent">boolean</td>
                    <td className="py-2 px-3 text-ink-muted">1位(实现相关)</td>
                    <td className="py-2 px-3 text-ink-muted">true / false</td>
                    <td className="py-2 px-3 text-ink-muted">false</td>
                    <td className="py-2 px-3 text-ink-muted">条件判断</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <SideNote label="💡 JVM 规范">
              JVM 规范并未规定 boolean 的具体存储空间，不同虚拟机实现可能不同。大多数 JVM 将 boolean 数组中的元素存储为 byte，单个 boolean 变量可能占用 4 字节（对齐到 int）。
            </SideNote>
          </section>

          {/* ========== 二、包装类体系 ========== */}
          <section id="wrapper-class">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              二、包装类体系
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              每个基本类型都有对应的包装类，它们位于 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">java.lang</code> 包下。包装类提供了丰富的工具方法，如字符串转换、进制转换、数值比较等。
            </p>

            <DiagramBlock title="基本类型与包装类对应关系">
              {`graph LR
                subgraph 基本类型["基本类型 Primitive"]
                  direction TB
                  PB["byte"]
                  PS["short"]
                  PI["int"]
                  PL["long"]
                  PF["float"]
                  PD["double"]
                end
                subgraph 包装类["包装类 Wrapper"]
                  direction TB
                  WB["Byte"]
                  WS["Short"]
                  WI["Integer"]
                  WL["Long"]
                  WF["Float"]
                  WD["Double"]
                end
                PB --> WB
                PS --> WS
                PI --> WI
                PL --> WL
                PF --> WF
                PD --> WD
                style 基本类型 fill:#f5f0e8,stroke:#d4c5a9,stroke-width:2px
                style 包装类 fill:#f5f0e8,stroke:#d4c5a9,stroke-width:2px
              `}
            </DiagramBlock>

            <Callout type="info" title="包装类的核心价值">
              <ul className="list-disc list-inside space-y-1 text-[13px] sm:text-[14px] text-ink-muted">
                <li><strong className="text-ink">泛型支持：</strong>集合框架（如 ArrayList&lt;Integer&gt;）只能存储对象，不能存储基本类型</li>
                <li><strong className="text-ink">工具方法：</strong>提供 parseXxx()、valueOf()、toString() 等实用方法</li>
                <li><strong className="text-ink">null 值表示：</strong>包装类可以为 null，适合数据库字段映射等场景</li>
                <li><strong className="text-ink">常量定义：</strong>如 Integer.MAX_VALUE、Double.MIN_VALUE 等</li>
              </ul>
            </Callout>
          </section>

          {/* ========== 三、自动装箱与拆箱 ========== */}
          <section id="autoboxing">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              三、自动装箱与拆箱
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              JDK 5 引入的自动装箱（Autoboxing）和自动拆箱（Unboxing）让基本类型与包装类之间的转换变得透明，编译器会自动插入相应的转换代码。
            </p>

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              3.1 装箱与拆箱原理
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong className="text-ink">装箱：</strong>基本类型 → 包装类，编译器调用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">valueOf()</code> 方法<br/>
              <strong className="text-ink">拆箱：</strong>包装类 → 基本类型，编译器调用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">xxxValue()</code> 方法
            </p>

            <Playground 
              code={`// 自动装箱：int → Integer
Integer a = 100;  // 编译后: Integer a = Integer.valueOf(100);

// 自动拆箱：Integer → int
int b = a;        // 编译后: int b = a.intValue();

// 混合运算时自动拆箱
Integer c = 200;
int result = c + 50;  // 编译后: int result = c.intValue() + 50;`}
              language="java"
              highlights={[2, 5, 9]}
              filename="AutoBoxingDemo.java"
              description="编译器自动插入装箱/拆箱代码"
            />

            <SideNote label="⚠️ 性能陷阱">
              在循环中频繁进行装箱/拆箱会产生大量临时对象，导致 GC 压力。例如：<br/>
              <code className="block mt-2 p-2 bg-parchment-warm rounded text-[12px] font-mono">
                Integer sum = 0;<br/>
                for (int i = 0; i &lt; 10000; i++) &#123;<br/>
                &nbsp;&nbsp;sum += i;  // 每次循环都装箱+拆箱<br/>
                &#125;
              </code>
              应改为：<code className="block mt-2 p-2 bg-parchment-warm rounded text-[12px] font-mono">int sum = 0;</code>
            </SideNote>
          </section>

          {/* ========== 四、Integer 缓存机制（重点🔥） ========== */}
          <section id="integer-cache">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              四、Integer 缓存机制（重点🔥）
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              这是面试最高频的考点之一！Integer 内部维护了一个缓存池，默认缓存 -128 到 127 之间的整数。通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">valueOf()</code> 创建的对象会复用缓存，而 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">new Integer()</code> 总是创建新对象。
            </p>

            <Playground 
              code={`// ✅ 使用 valueOf() - 会命中缓存
Integer a = Integer.valueOf(100);
Integer b = Integer.valueOf(100);
System.out.println(a == b);  // true (同一个对象)

// ✅ 自动装箱也使用 valueOf()
Integer c = 100;
Integer d = 100;
System.out.println(c == d);  // true (同一个对象)

// ❌ 超出缓存范围
Integer e = 200;
Integer f = 200;
System.out.println(e == f);  // false (不同对象)

// ❌ 使用 new 关键字 - 永远创建新对象
Integer g = new Integer(100);
Integer h = new Integer(100);
System.out.println(g == h);  // false (不同对象)

// ✅ 正确比较方式：使用 equals()
System.out.println(g.equals(h));  // true`}
              language="java"
              highlights={[4, 9, 14, 19, 23]}
              filename="IntegerCacheTest.java"
              description="Integer 缓存机制演示"
            />

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              4.1 缓存源码解析
            </h3>
            <Playground 
              code={`// Integer.valueOf() 源码 (JDK 8)
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}

// IntegerCache 内部类
private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];

    static {
        // high 可通过 -XX:AutoBoxCacheMax=<size> 调整
        int h = 127;
        String integerCacheHighPropValue =
            sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            try {
                h = Math.max(parseInt(integerCacheHighPropValue), 127);
                h = Math.min(h, Integer.MAX_VALUE - (-low) -1);
            } catch (NumberFormatException nfe) {
            }
        }
        high = h;
        cache = new Integer[(high - low) + 1];
        int j = low;
        for(int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);
    }
}`}
              language="java"
              highlights={[3, 10, 11, 17, 28]}
              filename="Integer.java"
              description="Integer 缓存池实现源码"
            />

            <Callout type="warning" title="其他包装类的缓存策略">
              <ul className="list-disc list-inside space-y-1 text-[13px] sm:text-[14px] text-ink-muted">
                <li><strong className="text-ink">Byte、Short、Long：</strong>缓存 -128 ~ 127（固定不可调）</li>
                <li><strong className="text-ink">Character：</strong>缓存 0 ~ 127</li>
                <li><strong className="text-ink">Boolean：</strong>缓存 TRUE 和 FALSE 两个对象</li>
                <li><strong className="text-ink">Float、Double：</strong>无缓存（浮点数太多）</li>
              </ul>
            </Callout>

            <ContextSwitcher 
              simpleContent={
                <div className="space-y-3">
                  <p className="text-[14px] text-ink-muted"><strong className="text-ink">简单理解：</strong>Integer 有个"小仓库"，存了 -128 到 127 这些常用数字。当你用 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">Integer.valueOf(100)</code> 或 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">Integer a = 100</code> 时，如果数字在仓库里，就直接给你现成的；如果不在，就现场造一个新的。</p>
                  <p className="text-[14px] text-ink-muted"><strong className="text-accent">记住两点：</strong><br/>1. 用 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">==</code> 比较 Integer 很危险，可能真也可能假<br/>2. 永远用 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">equals()</code> 比较值是否相等</p>
                </div>
              }
              hardcoreContent={
                <div className="space-y-3">
                  <p className="text-[14px] text-ink-muted"><strong className="text-ink">深入底层：</strong>IntegerCache 在类加载时静态初始化，通过 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">-XX:AutoBoxCacheMax</code> JVM 参数可调整上限（但不能低于 127）。缓存数组在堆内存中，索引计算为 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">cache[i - low]</code>。</p>
                  <p className="text-[14px] text-ink-muted"><strong className="text-ink">性能影响：</strong>缓存避免了频繁创建小整数对象，减少 GC 压力。对于高并发场景，建议预热缓存或使用基本类型。</p>
                  <p className="text-[14px] text-ink-muted"><strong className="text-accent">JVM 优化：</strong>JIT 编译器可能对频繁装箱的代码做逃逸分析，直接在栈上分配对象甚至标量替换，进一步优化性能。</p>
                </div>
              }
            />
          </section>

          {/* ========== 五、类型转换规则 ========== */}
          <section id="type-conversion">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              五、类型转换规则
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Java 的类型转换分为自动转换（隐式）和强制转换（显式）。遵循"小转大自动，大转小强制"的原则。
            </p>

            <DiagramBlock title="数据类型转换优先级">
              {`graph LR
                BYTE2["byte"] --> SHORT2["short"]
                SHORT2 --> INT2["int"]
                CHAR2["char"] --> INT2
                INT2 --> LONG2["long"]
                LONG2 --> FLOAT2["float"]
                FLOAT2 --> DOUBLE2["double"]
                style BYTE2 fill:#d4c5a940,stroke:#d4c5a9
                style SHORT2 fill:#d4c5a940,stroke:#d4c5a9
                style INT2 fill:#d4c5a960,stroke:#8b4c14
                style LONG2 fill:#d4c5a960,stroke:#8b4c14
                style FLOAT2 fill:#d4c5a960,stroke:#8b4c14
                style DOUBLE2 fill:#8b4c1440,stroke:#8b4c14,stroke-width:2px
                style CHAR2 fill:#d4c5a940,stroke:#d4c5a9
              `}
            </DiagramBlock>

            <Playground 
              code={`// ✅ 自动转换（隐式）
int a = 100;
long b = a;       // int → long，自动转换
float c = a;      // int → float，自动转换
double d = b;     // long → double，自动转换

// ❌ 强制转换（显式）- 可能丢失精度
long e = 100000L;
int f = (int) e;  // 需要显式转换

double g = 3.14;
int h = (int) g;  // h = 3，小数部分被截断

// ⚠️ 特殊情况：byte/short/char 运算提升为 int
byte x = 10;
byte y = 20;
// byte z = x + y;  // ❌ 编译错误！x+y 结果是 int
int z = x + y;      // ✅ 正确`}
              language="java"
              highlights={[3, 4, 5, 9, 12, 17]}
              filename="TypeConversion.java"
              description="类型转换示例"
            />

            <Callout type="danger" title="精度丢失陷阱">
              <p className="text-[13px] sm:text-[14px] text-ink-muted">
                <strong className="text-ink">long → float/double 可能丢失精度：</strong><br/>
                <code className="block mt-2 p-2 bg-parchment-warm rounded text-[12px] font-mono">
                  long big = 999999999999999999L;<br/>
                  float f = big;<br/>
                  System.out.println((long)f == big);  // false! 精度丢失
                </code>
                原因：float 只有 23 位尾数，无法精确表示所有 long 值。
              </p>
            </Callout>
          </section>

          {/* ========== 六、常见陷阱与误区 ========== */}
          <section id="common-mistakes">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              六、常见陷阱与误区
            </h2>

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              陷阱 1：NullPointerException
            </h3>
            <Playground 
              code={`Integer num = null;
// int value = num;  // ❌ NullPointerException! 自动拆箱时 num.intValue()

// ✅ 安全做法
int value = (num != null) ? num : 0;
// 或使用 Optional
int safeValue = Optional.ofNullable(num).orElse(0);`}
              language="java"
              highlights={[2, 5]}
              filename="NullPointerTrap.java"
              description="包装类为 null 时拆箱导致 NPE"
            />

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              陷阱 2：== 比较陷阱
            </h3>
            <Playground 
              code={`Integer a = 1000;
Integer b = 1000;
System.out.println(a == b);        // false (超出缓存范围)
System.out.println(a.equals(b));   // true (正确比较方式)

// 更隐蔽的情况
Integer c = new Integer(100);
Integer d = 100;
System.out.println(c == d);        // false (new 创建新对象)`}
              language="java"
              highlights={[3, 4, 9]}
              filename="EqualsTrap.java"
              description="== 与 equals 的区别"
            />

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              陷阱 3：BigDecimal 构造
            </h3>
            <Playground 
              code={`// ❌ 错误：使用 double 构造 BigDecimal
BigDecimal bd1 = new BigDecimal(0.1);
System.out.println(bd1);  // 0.1000000000000000055511151231257827021181583404541015625

// ✅ 正确：使用 String 构造
BigDecimal bd2 = new BigDecimal("0.1");
System.out.println(bd2);  // 0.1

// ✅ 推荐：使用 valueOf()
BigDecimal bd3 = BigDecimal.valueOf(0.1);
System.out.println(bd3);  // 0.1`}
              language="java"
              highlights={[2, 6, 10]}
              filename="BigDecimalTrap.java"
              description="BigDecimal 构造陷阱"
            />
          </section>

          {/* ========== 七、性能对比分析 ========== */}
          <section id="performance">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              七、性能对比分析
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              基本类型 vs 包装类的性能差异主要体现在内存占用、GC 压力和运算速度三个方面。
            </p>

            <div className="overflow-x-auto my-5">
              <table className="w-full text-[12px] sm:text-[13px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 font-semibold text-ink">维度</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">基本类型</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">包装类</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">性能差距</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted font-semibold">内存占用</td>
                    <td className="py-2 px-3 text-ink">4 字节 (int)</td>
                    <td className="py-2 px-3 text-ink">16 字节 (对象头+值)</td>
                    <td className="py-2 px-3 text-accent font-semibold">4 倍</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted font-semibold">GC 压力</td>
                    <td className="py-2 px-3 text-ink">无（栈上分配）</td>
                    <td className="py-2 px-3 text-ink">有（堆上对象）</td>
                    <td className="py-2 px-3 text-accent font-semibold">显著</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted font-semibold">运算速度</td>
                    <td className="py-2 px-3 text-ink">CPU 寄存器直接运算</td>
                    <td className="py-2 px-3 text-ink">需拆箱后运算</td>
                    <td className="py-2 px-3 text-accent font-semibold">~20%</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted font-semibold">缓存友好</td>
                    <td className="py-2 px-3 text-ink">✅ 连续内存</td>
                    <td className="py-2 px-3 text-ink">❌ 分散指针</td>
                    <td className="py-2 px-3 text-accent font-semibold">明显</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Playground 
              code={`// 性能测试：基本类型 vs 包装类
public class PerformanceTest {
    public static void main(String[] args) {
        int count = 100_000_000;
        
        // 测试 int
        long start = System.nanoTime();
        int sum1 = 0;
        for (int i = 0; i < count; i++) {
            sum1 += i;
        }
        long time1 = System.nanoTime() - start;
        
        // 测试 Integer
        start = System.nanoTime();
        Integer sum2 = 0;
        for (int i = 0; i < count; i++) {
            sum2 += i;  // 每次循环装箱+拆箱
        }
        long time2 = System.nanoTime() - start;
        
        System.out.println("int:    " + time1 / 1_000_000 + " ms");
        System.out.println("Integer: " + time2 / 1_000_000 + " ms");
        System.out.println("差距:    " + (time2 * 100 / time1 - 100) + "%");
    }
}

// 典型输出：
// int:    28 ms
// Integer: 156 ms
// 差距:    457%`}
              language="java"
              highlights={[9, 17, 23, 24, 25]}
              filename="PerformanceTest.java"
              description="性能对比测试结果"
            />
          </section>

          {/* ========== 八、常见误区 ========== */}
          <section id="misconceptions">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              八、常见误区
            </h2>

            <Callout type="danger" title="误区一：== 可以比较包装类的值">
              <span className="font-semibold text-ink-light">你以为的：</span><code className="font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded">Integer a = 100; Integer b = 100; a == b</code> 应该返回 true<br/>
              <span className="font-semibold text-accent">实际：</span>只有在 -128~127 范围内才返回 true，超出范围返回 false。<strong className="text-accent">永远用 equals() 比较值！</strong>
            </Callout>

            <Callout type="danger" title="误区二：包装类和基本类型性能差不多">
              <span className="font-semibold text-ink-light">你以为的：</span>自动装箱/拆箱是透明的，性能应该没差别<br/>
              <span className="font-semibold text-accent">实际：</span>包装类内存占用是基本类型的 4 倍，且在循环中会产生大量临时对象，导致 GC 压力剧增。高性能场景必须用基本类型。
            </Callout>

            <Callout type="danger" title="误区三：Float 和 Double 也有缓存">
              <span className="font-semibold text-ink-light">你以为的：</span>既然 Integer 有缓存，Float/Double 应该也有<br/>
              <span className="font-semibold text-accent">实际：</span>浮点数范围太大且稀疏，缓存没有意义。Float 和 Double 的 valueOf() 总是创建新对象。
            </Callout>

            <Callout type="danger" title="误区四：自动装箱不会抛出异常">
              <span className="font-semibold text-ink-light">你以为的：</span>装箱是安全的操作<br/>
              <span className="font-semibold text-accent">实际：</span>当包装类为 null 时，自动拆箱会抛出 <code className="font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded">NullPointerException</code>。这是生产环境最常见的 NPE 来源之一。
            </Callout>
          </section>

          {/* ========== 九、面试真题 ========== */}
          <section id="interview">
            <InterviewSection 
              questions={[
                {
                  question: "Integer a = 100; Integer b = 100; a == b 的结果是什么？为什么？",
                  answer: "返回 true。因为 100 在 Integer 缓存范围（-128~127）内，valueOf() 会返回缓存中的同一个对象，所以 == 比较的是引用地址，结果相同。"
                },
                {
                  question: "Integer a = 200; Integer b = 200; a == b 的结果是什么？如何正确比较？",
                  answer: "返回 false。因为 200 超出缓存范围，valueOf() 会创建新的 Integer 对象。正确比较方式是使用 a.equals(b)，它会比较实际的整数值。"
                },
                {
                  question: "自动装箱和自动拆箱的原理是什么？有哪些性能陷阱？",
                  answer: "装箱调用 valueOf()，拆箱调用 xxxValue()。性能陷阱包括：① 循环中频繁装箱产生大量临时对象；② 包装类为 null 时拆箱抛出 NPE；③ 内存占用是基本类型的 4 倍。"
                },
                {
                  question: "为什么 Float 和 Double 没有缓存机制？",
                  answer: "因为浮点数的取值范围太大（±1.7E308）且分布稀疏，缓存命中率极低，反而会浪费大量内存。而整数在 -128~127 范围内使用频率极高，缓存收益明显。"
                },
                {
                  question: "int 和 Integer 有什么区别？各自的使用场景是什么？",
                  answer: "int 是基本类型，存储在栈上，性能好但不能为 null；Integer 是包装类，存储在堆上，支持 null 和泛型。场景：① 集合框架必须用 Integer；② 数据库字段映射可用 Integer 表示 null；③ 高性能计算用 int；④ 需要对象特性时用 Integer。"
                },
                {
                  question: "什么是 IntegerCache？如何调整其大小？",
                  answer: "IntegerCache 是 Integer 内部的静态内部类，缓存 -128~127 的 Integer 对象。可通过 JVM 参数 -XX:AutoBoxCacheMax=<size> 调整上限（但不能低于 127），下限固定为 -128。"
                },
                {
                  question: "byte + byte 的结果是什么类型？为什么？",
                  answer: "结果是 int 类型。因为 Java 规定 byte、short、char 在运算时会先提升为 int，避免溢出问题。所以 byte a = 1; byte b = 2; byte c = a + b; 会编译失败，必须强制转换或声明为 int。"
                }
              ]}
            />
          </section>

          {/* ========== 十、知识关联 ========== */}
          <section id="related">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              十、知识关联
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-parchment-light border border-border rounded-paper-md">
                <div className="text-[10px] font-mono text-ink-ghost mb-1">前置知识</div>
                <div className="text-[13px] font-medium text-ink">Java基础语法</div>
              </div>
              <div className="p-4 bg-accent-glow border border-accent/20 rounded-paper-md">
                <div className="text-[10px] font-mono text-accent mb-1">延伸知识</div>
                <div className="text-[13px] font-medium text-ink">String深度剖析、BigDecimal</div>
              </div>
            </div>
          </section>

          {/* ⚠️ 文章导航（上一篇/下一篇），必须添加在 KnowledgeLayout 内部 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      {/* ⚠️ SmartTOC 直接渲染，不要用 <aside> 包裹！组件自行管理桌面端右侧栏和移动端右侧抽屉 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
