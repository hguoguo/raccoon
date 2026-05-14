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
  { id: 'concept', text: '一、核心概念辨析', level: 2 },
  { id: 'primitive-type', text: '二、基本类型传递', level: 2 },
  { id: 'reference-type', text: '三、引用类型传递', level: 2 },
  { id: 'string-immutable', text: '四、String 的特殊性', level: 2 },
  { id: 'memory-model', text: '五、内存模型视角', level: 2 },
  { id: 'misconceptions', text: '六、常见误区', level: 2 },
  { id: 'interview', text: '七、面试真题', level: 2 },
  { id: 'related', text: '八、知识关联', level: 2 },
]

export default function PassByValue({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Java <strong className="text-accent">只有值传递</strong>，不存在引用传递。无论是基本类型还是引用类型，方法参数传递的都是<strong className="text-accent">值的副本</strong>——基本类型传递的是数值本身，引用类型传递的是对象引用的副本（即地址值的拷贝）。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么会有&quot;引用传递&quot;的误解？">
            很多人看到修改对象属性后原对象也变了，就误以为是引用传递。实际上是因为传递了引用的副本，两个引用指向同一对象，所以通过任一引用都能修改对象内容。但这仍然是值传递（传递的是引用这个"值"的副本）。
          </Callout>

          <h2 id="concept" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、核心概念辨析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            理解值传递的关键在于区分<strong>"传递的是什么"</strong>和<strong>"能否修改原数据"</strong>两个问题。
          </p>

          <DiagramBlock title="值传递 vs 引用传递的本质区别">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────────────┐
│              值传递（Java 唯一方式）                  │
├─────────────────────────────────────────────────────┤
│  • 传递的是"值的副本"                                 │
│  • 基本类型：复制数值本身                              │
│  • 引用类型：复制引用（地址值）                        │
│  • 形参和实参是两个独立的变量                          │
│  • 修改形参不影响实参（但可通过引用修改对象内容）       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│           引用传递（Java 不支持）                     │
├─────────────────────────────────────────────────────┤
│  • 传递的是"变量的别名"                               │
│  • 形参和实参是同一个变量                             │
│  • 修改形参直接影响实参                               │
│  • C++ 中的 & 符号实现                                │
└─────────────────────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="关键理解">
            "能否修改对象内容" ≠ "是否是引用传递"。值传递也可以修改对象内容，因为传递的是引用的副本，两个引用指向堆中同一对象。真正的引用传递是指形参和实参是同一变量，修改形参会改变实参本身的值（如让实参指向新对象）。
          </SideNote>

          <h2 id="primitive-type" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、基本类型传递
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            基本类型（<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">int</code>、<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">double</code>、<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">boolean</code> 等）传递时，会在栈帧中创建一个新的局部变量，并复制实参的值。
          </p>

          <Playground
            code={`public class PrimitiveTypeDemo {
    
    public static void main(String[] args) {
        int a = 10;
        System.out.println("调用前: a = " + a);  // 输出: 10
        
        modifyPrimitive(a);
        
        System.out.println("调用后: a = " + a);  // 输出: 10（未改变）
    }
    
    public static void modifyPrimitive(int x) {
        System.out.println("方法内修改前: x = " + x);  // 输出: 10
        x = 100;  // 修改的是 x 的副本，不影响 a
        System.out.println("方法内修改后: x = " + x);  // 输出: 100
    }
}`}
            language="java"
            highlights={[4, 7, 13, 14]}
            filename="PrimitiveTypeDemo.java"
            description="基本类型值传递示例"
          />

          <DiagramBlock title="基本类型传递的内存变化">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
main 方法栈帧                    modifyPrimitive 方法栈帧
┌──────────┐                   ┌──────────┐
│ a = 10   │  ──复制值──▶      │ x = 10   │  （初始副本）
└──────────┘                   ├──────────┤
                               │ x = 100  │  （修改副本）
                               └──────────┘
                               
结果：a 仍为 10，x 变为 100，互不影响
            `}</pre>
          </DiagramBlock>

          <Callout type="info" title="基本类型传递特点">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>完全隔离</strong>：形参和实参是两个独立的变量，修改互不影响</li>
              <li><strong>性能高效</strong>：基本类型占用空间小（通常 1-8 字节），复制成本低</li>
              <li><strong>线程安全</strong>：每个线程有自己的栈帧，天然隔离</li>
            </ul>
          </Callout>

          <h2 id="reference-type" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、引用类型传递
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            引用类型（对象、数组等）传递时，复制的是<strong>引用的值</strong>（即对象在堆中的地址），而不是对象本身。因此形参和实参指向堆中同一对象。
          </p>

          <Playground
            code={`import java.util.ArrayList;
import java.util.List;

public class ReferenceTypeDemo {
    
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("原始数据");
        System.out.println("调用前: " + list);  // 输出: [原始数据]
        
        modifyReference(list);
        
        System.out.println("调用后: " + list);  // 输出: [原始数据, 新增数据]
    }
    
    public static void modifyReference(List<String> lst) {
        lst.add("新增数据");  // 通过引用副本修改堆中对象
        System.out.println("方法内: " + lst);  // 输出: [原始数据, 新增数据]
    }
}`}
            language="java"
            highlights={[7, 11, 16, 17]}
            filename="ReferenceTypeDemo.java"
            description="引用类型值传递示例"
          />

          <DiagramBlock title="引用类型传递的内存变化">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
main 方法栈帧                 堆内存                  modifyReference 栈帧
┌──────────────┐          ┌──────────────┐         ┌──────────────┐
│ list ────────┼──0x123──▶│ ArrayList    │         │ lst ─────────┼──0x123──▶
│ (引用值0x123)│          │ [原始数据]   │         │ (引用值0x123)│
└──────────────┘          └──────────────┘         └──────────────┘
                                                        │
                                                        ▼ 执行 lst.add()
                                                  ┌──────────────┐
                                                  │ ArrayList    │
                                                  │ [原始数据,   │
                                                  │  新增数据]   │
                                                  └──────────────┘

关键点：list 和 lst 是两个独立的引用变量，但指向同一对象
修改对象内容会影响所有引用该对象的变量
            `}</pre>
          </DiagramBlock>

          <Callout type="warning" title="重要：不能通过形参让实参指向新对象">
            <p className="mb-2">虽然可以通过引用副本修改对象内容，但<strong>无法</strong>让实参指向新对象：</p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm font-mono text-[12px] text-ink-muted">{`public static void tryReassign(List<String> lst) {
    lst = new ArrayList<>();  // ❌ 只是让形参指向新对象，不影响实参
    lst.add("新列表数据");
}

// 调用后，原 list 仍然指向旧对象，不受影响`}</pre>
            <p className="mt-2">这是因为传递的是引用的副本，重新赋值只会改变副本的指向，不会影响原引用。</p>
          </Callout>

          <h2 id="string-immutable" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、String 的特殊性
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            String 是不可变类（Immutable），这导致它在方法传递时表现出特殊的行为，常被误认为是"引用传递失效"。
          </p>

          <Playground
            code={`public class StringDemo {
    
    public static void main(String[] args) {
        String str = "Hello";
        System.out.println("调用前: str = " + str);  // 输出: Hello
        
        modifyString(str);
        
        System.out.println("调用后: str = " + str);  // 输出: Hello（未改变）
    }
    
    public static void modifyString(String s) {
        s = s + " World";  // 创建了新字符串对象，s 指向新对象
        System.out.println("方法内: s = " + s);  // 输出: Hello World
    }
}`}
            language="java"
            highlights={[4, 7, 12, 13]}
            filename="StringDemo.java"
            description="String 不可变性导致的误解"
          />

          <DiagramBlock title="String 拼接的内存变化">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
调用前：
main 栈帧              字符串常量池
┌──────────┐         ┌──────────┐
│ str ─────┼──▶      │ "Hello"  │
└──────────┘         └──────────┘

执行 s = s + " World" 后：
main 栈帧              字符串常量池/堆
┌──────────┐         ┌──────────┐
│ str ─────┼──▶      │ "Hello"  │  （str 仍指向原对象）
└──────────┘         └──────────┘
                     
modifyString 栈帧     堆内存
┌──────────┐         ┌──────────────┐
│ s ───────┼──▶      │ "Hello World"│  （s 指向新对象）
└──────────┘         └──────────────┘

结论：String 不可变，任何"修改"操作都会创建新对象
            `}</pre>
          </DiagramBlock>

          <SideNote label="StringBuilder 对比">
            如果需要修改字符串内容，应使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">StringBuilder</code>，它是可变的，可以通过引用副本修改内容：<br/>
            <code className="font-mono text-[11px] text-ink-muted">sb.append(" World")</code> 会直接修改堆中对象，调用方可见。
          </SideNote>

          <h2 id="memory-model" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、内存模型视角
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            从 JVM 内存模型角度理解值传递，可以更清晰地看到栈帧和堆的关系。
          </p>

          <DiagramBlock title="JVM 内存模型中的参数传递">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────────────┐
│                  JVM 运行时数据区                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  栈（Stack）                    堆（Heap）            │
│  ┌──────────────────┐          ┌──────────────┐     │
│  │ main 方法栈帧     │          │              │     │
│  │ ┌──────────────┐ │          │  Object A    │     │
│  │ │ int a = 10   │ │          │  (实例数据)   │     │
│  │ └──────────────┘ │          │              │     │
│  │ ┌──────────────┐ │          └──────▲───────┘     │
│  │ │ Obj ref=0x123│─┼──────────────────┘            │
│  │ └──────────────┘ │                                │
│  └──────────────────┘          ┌──────────────┐     │
│  ┌──────────────────┐          │              │     │
│  │ method 方法栈帧   │          │  Object B    │     │
│  │ ┌──────────────┐ │          │  (实例数据)   │     │
│  │ │ int x = 10   │ │          │              │     │
│  │ │ (a 的副本)    │ │          └──────────────┘     │
│  │ └──────────────┘ │                                │
│  │ ┌──────────────┐ │                                │
│  │ │ Obj ref=0x123│ │                                │
│  │ │ (ref 的副本)  │ │                                │
│  │ └──────────────┘ │                                │
│  └──────────────────┘                                │
│                                                      │
└─────────────────────────────────────────────────────┘

关键观察：
• 栈帧之间完全隔离，各自拥有独立的局部变量
• 堆中对象可以被多个引用同时访问
• 值传递 = 在目标栈帧中创建新的局部变量并复制值
            `}</pre>
          </DiagramBlock>

          <Callout type="tip" title="值传递的底层实现">
            在 JVM 字节码层面，参数传递通过以下指令完成：
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">iload</code>：加载 int 等基本类型值到操作数栈</li>
              <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">aload</code>：加载引用类型值（地址）到操作数栈</li>
              <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">invokestatic</code>：调用方法时，操作数栈中的值被复制到新栈帧的局部变量表</li>
            </ul>
            无论基本类型还是引用类型，都是<strong>复制值</strong>，没有例外。
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、常见误区
          </h2>

          <Callout type="danger" title="误区 1：修改对象内容 = 引用传递">
            <p className="mb-2"><strong>错误认知</strong>："我通过方法参数修改了对象属性，原对象也变了，所以这是引用传递。"</p>
            <p><strong>正确理解</strong>：这是值传递！传递的是引用的副本，两个引用指向同一对象。修改对象内容是正常的，因为堆中只有一个对象。真正的引用传递应该能让实参本身改变（如指向新对象），而 Java 做不到这一点。</p>
          </Callout>

          <Callout type="danger" title="误区 2：String 不能被修改 = 值传递，其他对象能被修改 = 引用传递">
            <p className="mb-2"><strong>错误认知</strong>："String 传进去改不了，所以是值传递；List 传进去能改，所以是引用传递。"</p>
            <p><strong>正确理解</strong>：两者都是值传递！String 的"不可修改"是因为它的不可变设计（每次操作创建新对象），而不是传递机制不同。List 能"修改"是因为通过引用副本访问了同一对象。如果用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">lst = new ArrayList&lt;&gt;()</code> 尝试让实参指向新对象，同样会失败。</p>
          </Callout>

          <Callout type="danger" title="误区 3：数组是引用类型，所以是引用传递">
            <p className="mb-2"><strong>错误认知</strong>："数组可以修改元素，所以数组是引用传递。"</p>
            <p><strong>正确理解</strong>：数组也是值传递！传递的是数组引用的副本。你可以修改数组元素（如 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">arr[0] = 100</code>），但不能让实参数组指向新数组（如 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">arr = new int[5]</code> 无效）。</p>
          </Callout>

          <Callout type="warning" title="误区 4：包装类 Integer 和基本类型 int 传递机制不同">
            <p className="mb-2"><strong>错误认知</strong>："int 是值传递，Integer 是引用传递。"</p>
            <p><strong>正确理解</strong>：两者都是值传递！Integer 是引用类型，传递的是引用的副本。由于 Integer 也是不可变类，你无法通过方法参数修改其值（类似 String）。如果尝试 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">num = 100</code>，只是让形参指向新的 Integer 对象，不影响实参。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Java 是值传递还是引用传递？请举例说明。",
              answer: "Java 只有值传递。① 基本类型传递数值副本，修改形参不影响实参；② 引用类型传递引用副本（地址值），形参和实参指向同一对象，可以通过形参修改对象内容，但无法让实参指向新对象。示例：传递 int 时修改形参不影响实参；传递 List 时可以添加元素（修改对象内容），但执行 lst = new ArrayList<>() 不会影响实参。"
            },
            {
              question: "为什么 String 作为参数传递时，方法内修改不影响原变量？",
              answer: "因为 String 是不可变类（Immutable）。当执行 s = s + \" World\" 时，实际上是创建了一个新的 String 对象，并让形参 s 指向新对象。原实参仍然指向原来的 String 对象。这不是传递机制的问题，而是 String 类的设计特性。如果使用 StringBuilder，就可以通过 append() 方法修改内容，调用方可见。"
            },
            {
              question: "如何通过方法交换两个变量的值？",
              answer: "Java 无法通过方法直接交换两个基本类型变量（因为是值传递）。解决方案：① 使用数组包装：swap(int[] arr, int i, int j)；② 使用原子类：AtomicInteger；③ 使用自定义包装类；④ 返回新值并由调用方赋值。对于引用类型，可以交换对象内部的字段值，但无法交换引用本身。"
            },
            {
              question: "下面代码的输出是什么？\n```java\npublic static void changeValue(Integer num) {\n    num = 100;\n}\nInteger a = 10;\nchangeValue(a);\nSystem.out.println(a);\n```",
              answer: "输出 10。Integer 是引用类型，传递的是引用的副本。执行 num = 100 时，由于 Integer 不可变，实际上是创建了新的 Integer(100) 对象并让形参 num 指向它，不影响实参 a。a 仍然指向 Integer(10)。这与 String 的行为一致。"
            },
            {
              question: "如何设计一个方法，让调用方能获取方法内创建的新对象？",
              answer: "方案：① 返回值方式（推荐）：public List<String> createList() { return new ArrayList<>(); }；② 容器包装：传入一个 Holder 对象，方法内设置 holder.value = newObj；③ 数组包装：Object[] wrapper = new Object[1]; wrapper[0] = newObj。核心思想：不能通过参数重新赋值来影响实参，必须通过返回值或可变容器间接传递。"
            },
            {
              question: "值传递和引用传递的性能差异是什么？",
              answer: "值传递需要复制数据，对于大对象会产生额外开销。但 Java 中传递的是引用副本（通常 4-8 字节），而非对象本身，因此性能开销很小。真正的性能瓶颈在于对象创建和 GC，而非参数传递。优化建议：避免在循环中频繁创建大对象；使用对象池复用对象；对于超大集合，考虑使用视图（如 subList）而非复制。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/01-java-core/jvm-memory-model" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">深入理解 →</div>
              <div className="font-semibold text-ink group-hover:text-teal">JVM 内存结构</div>
              <div className="text-[12px] text-ink-muted mt-1">栈帧、堆、方法区的协作</div>
            </a>
            <a href="/docs/01-java-core/string-deep-dive" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">相关知识点 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">String 深度剖析</div>
              <div className="text-[12px] text-ink-muted mt-1">不可变性、字符串常量池</div>
            </a>
            <a href="/docs/01-java-core/primitive-types" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">基础概念 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">基本数据类型与包装类</div>
              <div className="text-[12px] text-ink-muted mt-1">自动装箱、缓存机制</div>
            </a>
            <a href="/docs/03-multithreading/multi-threading-basics" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">扩展阅读 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">多线程基础</div>
              <div className="text-[12px] text-ink-muted mt-1">线程隔离、可见性</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            值传递是 Java 的基础概念，务必彻底理解。建议：① 动手编写代码验证各种场景；② 画出内存图加深理解；③ 区分"传递机制"和"对象可变性"两个独立概念；④ 面试时能够清晰解释为什么 Java 只有值传递。掌握这一点后，理解 JVM 内存模型和多线程会更容易。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
