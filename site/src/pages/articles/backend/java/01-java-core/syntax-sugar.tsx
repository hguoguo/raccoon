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
  { id: 'overview', text: '一、什么是语法糖？', level: 2 },
  { id: 'autoboxing', text: '二、自动装箱与拆箱', level: 2 },
  { id: 'enhanced-for', text: '三、增强 for 循环', level: 2 },
  { id: 'switch-string', text: '四、Switch 支持字符串', level: 2 },
  { id: 'try-resources', text: '五、Try-with-resources', level: 2 },
  { id: 'varargs', text: '六、可变参数与方法重载', level: 2 },
  { id: 'diamond-operator', text: '七、菱形操作符与类型推断', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function SyntaxSugar({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          {/* 1. 一句话定义 */}
          <section id="definition">
            <blockquote className="border-l-[3px] border-l-accent pl-4 py-2 my-6 bg-accent-glow rounded-r-paper-md">
              <p className="text-[15px] sm:text-base font-medium text-ink leading-[1.7]">
                Java 语法糖是编译器提供的<strong className="text-accent">语法简化特性</strong>，在编译期转换为等价的基础语法，
                不改变 JVM 字节码语义，旨在提升代码可读性和开发效率，如自动装箱、增强 for 循环、try-with-resources 等。
              </p>
            </blockquote>
          </section>

          <Callout type="tip" title="语法糖的本质">
            语法糖（Syntactic Sugar）由英国计算机科学家 Peter J. Landin 提出，指在不增加语言功能的前提下，
            通过更简洁的语法表达相同的语义。<strong className="text-accent">所有语法糖都在编译期被"脱糖"</strong>（Desugaring），
            生成的字节码与手动编写的基础语法完全一致，运行时没有任何性能差异。
          </Callout>

          {/* 2. 什么是语法糖？ */}
          <section id="overview">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              一、什么是语法糖？
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Java 从 JDK 5 开始引入大量语法糖特性，后续版本持续增强。理解语法糖的关键是掌握其<strong className="text-ink">编译期转换规则</strong>，
              避免写出看似正确但实际有坑的代码。
            </p>

            <DiagramBlock title="Java 语法糖演进时间线">
              <svg viewBox="0 0 700 200" className="w-full h-auto">
                {/* JDK 5 */}
                <rect x="30" y="80" width="100" height="40" rx="6" fill="#3B82F6" opacity="0.9"/>
                <text x="80" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">JDK 5</text>
                <text x="80" y="115" textAnchor="middle" fill="white" fontSize="9">自动装箱/泛型</text>
                
                {/* 箭头 */}
                <line x1="130" y1="100" x2="170" y2="100" stroke="#64748B" strokeWidth="2"/>
                
                {/* JDK 7 */}
                <rect x="170" y="80" width="100" height="40" rx="6" fill="#8B5CF6" opacity="0.9"/>
                <text x="220" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">JDK 7</text>
                <text x="220" y="115" textAnchor="middle" fill="white" fontSize="9">Switch字符串</text>
                
                {/* 箭头 */}
                <line x1="270" y1="100" x2="310" y2="100" stroke="#64748B" strokeWidth="2"/>
                
                {/* JDK 8 */}
                <rect x="310" y="80" width="100" height="40" rx="6" fill="#10B981" opacity="0.9"/>
                <text x="360" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">JDK 8</text>
                <text x="360" y="115" textAnchor="middle" fill="white" fontSize="9">Lambda/Stream</text>
                
                {/* 箭头 */}
                <line x1="410" y1="100" x2="450" y2="100" stroke="#64748B" strokeWidth="2"/>
                
                {/* JDK 10 */}
                <rect x="450" y="80" width="100" height="40" rx="6" fill="#F59E0B" opacity="0.9"/>
                <text x="500" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">JDK 10</text>
                <text x="500" y="115" textAnchor="middle" fill="white" fontSize="9">局部变量类型推断</text>
                
                {/* 箭头 */}
                <line x1="550" y1="100" x2="590" y2="100" stroke="#64748B" strokeWidth="2"/>
                
                {/* JDK 14+ */}
                <rect x="590" y="80" width="100" height="40" rx="6" fill="#EC4899" opacity="0.9"/>
                <text x="640" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">JDK 14+</text>
                <text x="640" y="115" textAnchor="middle" fill="white" fontSize="9">Switch表达式</text>
                
                {/* 标题 */}
                <text x="350" y="40" textAnchor="middle" fill="#1E293B" fontSize="16" fontWeight="bold">Java 语法糖演进历程</text>
              </svg>
            </DiagramBlock>

            <SideNote label="如何查看脱糖后的代码？">
              <div className="text-[12px] text-ink-muted">
                使用 <code className="font-mono text-[11px]">javap -c</code> 命令反编译 class 文件，或在 IDE 中安装 
                <code className="font-mono text-[11px]">Bytecode Viewer</code> 插件，可查看编译器生成的真实字节码。
              </div>
            </SideNote>
          </section>

          {/* 3. 自动装箱与拆箱 */}
          <section id="autoboxing">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              二、自动装箱与拆箱
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              自动装箱（Autoboxing）将基本类型自动转换为包装类，拆箱（Unboxing）则相反。这是最常用的语法糖之一，但也隐藏着性能陷阱。
            </p>

            <Playground
              code={`// 语法糖写法
Integer a = 10;        // 自动装箱：Integer.valueOf(10)
int b = a;             // 自动拆箱：a.intValue()

// 编译器脱糖后的真实代码
Integer a = Integer.valueOf(10);  // 调用缓存方法
int b = a.intValue();             // 拆箱为基本类型

// ⚠️ 性能陷阱：循环中的自动装箱
Long sum = 0L;  // Long 对象
for (long i = 0; i < Integer.MAX_VALUE; i++) {
    sum += i;   // 每次迭代：拆箱→加法→装箱（创建新 Long 对象）
}
// 修复：使用基本类型
long sum = 0L;
for (long i = 0; i < Integer.MAX_VALUE; i++) {
    sum += i;   // 纯基本类型运算，无对象创建
}

// ⚠️ NullPointerException 陷阱
Integer nullable = null;
int value = nullable;  // 运行时抛出 NullPointerException！
// 因为 null.intValue() 非法`}
              language="java"
              highlights={[2, 3, 7, 8, 12, 13, 20, 24]}
              filename="Autoboxing_Pitfalls.java"
              description="自动装箱/拆箱的编译期转换及常见陷阱"
            />

            <Callout type="danger" title="Integer 缓存机制（高频面试题）">
              <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Integer.valueOf()</code> 对 -128~127 范围内的值做了缓存：
              <pre className="bg-parchment-deep p-3 rounded mt-2 text-[12px] overflow-x-auto">
{`Integer a = 100;
Integer b = 100;
System.out.println(a == b);  // true（缓存命中）

Integer c = 200;
Integer d = 200;
System.out.println(c == d);  // false（超出缓存范围，创建新对象）`}
              </pre>
              <p className="mt-2 text-[13px] text-ink-muted"><strong className="text-ink">结论：</strong>比较 Integer 值时应使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">equals()</code>，而非 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">==</code>。</p>
            </Callout>
          </section>

          {/* 4. 增强 for 循环 */}
          <section id="enhanced-for">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              三、增强 for 循环
            </h2>

            <Playground
              code={`// 语法糖写法
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
for (String name : names) {
    System.out.println(name);
}

// 编译器脱糖后的真实代码（集合）
Iterator<String> iterator = names.iterator();
while (iterator.hasNext()) {
    String name = iterator.next();
    System.out.println(name);
}

// 数组的增强 for 循环
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num);
}

// 脱糖后（数组使用索引遍历）
for (int i = 0; i < numbers.length; i++) {
    int num = numbers[i];
    System.out.println(num);
}

// ⚠️ 陷阱：增强 for 循环中不能删除元素
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
for (String item : list) {
    if ("B".equals(item)) {
        list.remove(item);  // ConcurrentModificationException!
    }
}
// 修复：使用 Iterator 或 removeIf
list.removeIf(item -> "B".equals(item));`}
              language="java"
              highlights={[3, 8, 16, 21, 28, 30]}
              filename="EnhancedForLoop.java"
              description="增强 for 循环的两种脱糖方式：集合用 Iterator，数组用索引"
            />

            <SideNote label="为什么数组不用 Iterator？">
              <div className="text-[12px] text-ink-muted">
                数组没有 <code className="font-mono text-[11px]">iterator()</code> 方法，编译器直接生成基于索引的 for 循环，
                避免了 Iterator 对象的创建开销，性能略优于集合的增强 for 循环。
              </div>
            </SideNote>
          </section>

          {/* 5. Switch 支持字符串 */}
          <section id="switch-string">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              四、Switch 支持字符串
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              JDK 7 之前 switch 只支持 byte/short/int/char 和 enum，JDK 7 新增 String 支持，底层通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">hashCode()</code> 优化。
            </p>

            <Playground
              code={`// 语法糖写法
String day = "MONDAY";
switch (day) {
    case "MONDAY":
        System.out.println("周一");
        break;
    case "TUESDAY":
        System.out.println("周二");
        break;
    default:
        System.out.println("其他");
}

// 编译器脱糖后的伪代码（简化）
String s = day;
int hash = s.hashCode();
switch (hash) {
    case 72637102:  // "MONDAY".hashCode()
        if (s.equals("MONDAY")) {
            System.out.println("周一");
        }
        break;
    case -1017420908:  // "TUESDAY".hashCode()
        if (s.equals("TUESDAY")) {
            System.out.println("周二");
        }
        break;
    default:
        System.out.println("其他");
}

// ⚠️ 注意：switch 字符串可能哈希冲突
// "FB" 和 "Ea" 的 hashCode 相同，编译器会生成额外的 equals 判断`}
              language="java"
              highlights={[3, 15, 16, 17, 20, 25]}
              filename="SwitchString.java"
              description="Switch 字符串通过 hashCode + equals 双重校验实现"
            />

            <Callout type="warning" title="Switch 字符串的性能考虑">
              虽然 switch 字符串比 if-else 链更清晰，但在分支较多时，<strong className="text-ink">enum + switch</strong> 性能更优（编译期生成 tableswitch 指令，O(1) 复杂度），
              而字符串 switch 需要计算 hashCode 并逐个 equals 比较（最坏 O(n)）。
            </Callout>
          </section>

          {/* 6. Try-with-resources */}
          <section id="try-resources">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              五、Try-with-resources
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              JDK 7 引入的 try-with-resources 语法糖，自动关闭实现了 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">AutoCloseable</code> 接口的资源，
              避免忘记关闭导致的资源泄漏。
            </p>

            <Playground
              code={`// 语法糖写法（JDK 7+）
try (FileInputStream fis = new FileInputStream("test.txt");
     BufferedReader br = new BufferedReader(new InputStreamReader(fis))) {
    String line = br.readLine();
    System.out.println(line);
}  // 自动调用 br.close() 和 fis.close()

// 编译器脱糖后的真实代码
FileInputStream fis = null;
BufferedReader br = null;
try {
    fis = new FileInputStream("test.txt");
    br = new BufferedReader(new InputStreamReader(fis));
    String line = br.readLine();
    System.out.println(line);
} catch (Throwable t) {
    // 异常处理逻辑
} finally {
    // 逆序关闭资源（后声明的先关闭）
    if (br != null) {
        try {
            br.close();
        } catch (Throwable closeEx) {
            // 抑制异常（Suppressed Exception）
        }
    }
    if (fis != null) {
        try {
            fis.close();
        } catch (Throwable closeEx) {
            // 抑制异常
        }
    }
}

// JDK 9+ 增强：可使用已存在的 final 变量
FileInputStream fis = new FileInputStream("test.txt");
try (fis) {  // 无需重新赋值
    // 使用 fis
}`}
              language="java"
              highlights={[2, 3, 10, 11, 20, 28]}
              filename="TryWithResources.java"
              description="Try-with-resources 自动生成 finally 块并逆序关闭资源"
            />

            <SideNote label="抑制异常（Suppressed Exception）">
              <div className="text-[12px] text-ink-muted">
                如果 try 块和 close() 都抛出异常，close() 的异常会被添加到主异常的 suppressed 列表中，
                可通过 <code className="font-mono text-[11px]">exception.getSuppressed()</code> 获取。这避免了 close() 异常覆盖原始异常。
              </div>
            </SideNote>
          </section>

          {/* 7. 可变参数与方法重载 */}
          <section id="varargs">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              六、可变参数与方法重载
            </h2>

            <Playground
              code={`// 语法糖写法
public void printNumbers(int... numbers) {
    for (int num : numbers) {
        System.out.println(num);
    }
}

// 调用方式
printNumbers(1, 2, 3);           // 传入多个参数
printNumbers(new int[]{1, 2, 3}); // 传入数组（等价）

// 编译器脱糖后的真实代码
public void printNumbers(int[] numbers) {
    for (int num : numbers) {
        System.out.println(num);
    }
}

// ⚠️ 陷阱：可变参数与重载的歧义
public void process(String... args) { }
public void process(String arg1, String arg2) { }

process("a", "b");  // 编译错误！ambiguous method call
// 编译器无法确定调用哪个方法

// ⚠ 陷阱：可变参数必须放在最后
public void wrongOrder(int... nums, String name) { }  // 编译错误
public void correctOrder(String name, int... nums) { } // 正确`}
              language="java"
              highlights={[2, 9, 10, 13, 20, 21, 27, 28]}
              filename="Varargs.java"
              description="可变参数本质是数组语法糖，需注意重载歧义和参数顺序"
            />

            <Callout type="danger" title="可变参数的性能陷阱">
              每次调用可变参数方法都会创建一个数组对象，在高频调用场景下会产生大量临时对象，增加 GC 压力。
              对于性能敏感的方法，应提供固定参数的重载版本（如 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Logger.info(String)</code> 和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Logger.info(String, Object...)</code>）。
            </Callout>
          </section>

          {/* 8. 菱形操作符与类型推断 */}
          <section id="diamond-operator">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              七、菱形操作符与类型推断
            </h2>

            <Playground
              code={`// JDK 7 之前：重复声明泛型类型
Map<String, List<Integer>> map = new HashMap<String, List<Integer>>();

// JDK 7+：菱形操作符（Diamond Operator）
Map<String, List<Integer>> map = new HashMap<>();

// JDK 10+：局部变量类型推断（var）
var list = new ArrayList<String>();  // 编译器推断为 ArrayList<String>
var map2 = Map.of("key", "value");   // 推断为 Map<String, String>

// ⚠️ var 的限制
var x = null;           // 编译错误！无法推断类型
var y;                  // 编译错误！必须初始化
var z = () -> {};       // 编译错误！Lambda 需要目标类型
int[] arr = {1, 2, 3};
var arr2 = arr;         // 正确，推断为 int[]

// ⚠️ var 不适用于字段和方法参数
class Example {
    var field = 10;              // 编译错误！
    public void method(var param) {}  // 编译错误！
}`}
              language="java"
              highlights={[5, 8, 9, 12, 13, 14, 20, 21]}
              filename="TypeInference.java"
              description="菱形操作符和 var 关键字的类型推断规则与限制"
            />

            <SideNote label="var 的本质">
              <div className="text-[12px] text-ink-muted">
                <code className="font-mono text-[11px]">var</code> 不是关键字而是<strong className="text-ink">保留类型名</strong>，
                编译器在编译期根据右侧表达式推断具体类型，生成的字节码与显式声明类型完全一致，无反射或动态特性。
              </div>
            </SideNote>
          </section>

          {/* 9. 常见误区 */}
          <section id="misconceptions">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              八、常见误区
            </h2>

            <Callout type="danger" title="误区一：自动装箱没有性能开销">
              <span className="font-semibold text-ink-light">你以为的：</span>自动装箱只是语法简化，不影响性能。<br/>
              <span className="font-semibold text-accent">实际：</span>每次装箱都会创建新的包装类对象（除缓存范围外），在循环或高频调用场景中会产生大量临时对象，增加 GC 压力。应优先使用基本类型，仅在必要时（如集合存储）才使用包装类。
            </Callout>

            <Callout type="danger" title="误区二：增强 for 循环可以安全删除元素">
              <span className="font-semibold text-ink-light">你以为的：</span>增强 for 循环和普通 for 循环一样，可以修改集合。<br/>
              <span className="font-semibold text-accent">实际：</span>增强 for 循环底层使用 Iterator，在遍历时直接调用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">list.remove()</code> 会导致 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ConcurrentModificationException</code>。应使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">iterator.remove()</code> 或 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">removeIf()</code>。
            </Callout>

            <Callout type="danger" title="误区三：var 是动态类型">
              <span className="font-semibold text-ink-light">你以为的：</span>var 类似 JavaScript 的 var，可以在运行时改变类型。<br/>
              <span className="font-semibold text-accent">实际：</span>var 是<strong className="text-ink">编译期类型推断</strong>，一旦推断完成就是静态类型，与显式声明无异。<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">var x = 10;</code> 等价于 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">int x = 10;</code>，后续不能赋值为 String。
            </Callout>
          </section>

          {/* 10. 面试真题 */}
          <section id="interview">
            <InterviewSection questions={[
              {
                question: "什么是语法糖？Java 中有哪些常见的语法糖？",
                answer: "语法糖是编译器提供的语法简化特性，在编译期转换为等价的基础语法，不改变 JVM 字节码语义。常见语法糖：① 自动装箱/拆箱；② 增强 for 循环；③ Switch 支持字符串；④ Try-with-resources；⑤ 可变参数；⑥ 菱形操作符；⑦ Lambda 表达式；⑧ 方法引用；⑨ var 类型推断；⑩ Switch 表达式（JDK 14+）。"
              },
              {
                question: "自动装箱和拆箱的原理是什么？有什么陷阱？",
                answer: "原理：编译器在编译期插入 Integer.valueOf() 和 intValue() 调用。陷阱：① Integer 缓存（-128~127），超出范围创建新对象，应用 equals 比较；② 循环中频繁装箱产生大量对象，应使用基本类型；③ null 拆箱抛出 NullPointerException；④ 混合运算时先拆箱再计算，可能导致精度丢失。"
              },
              {
                question: "增强 for 循环的底层实现是什么？能否在遍历中删除元素？",
                answer: "底层实现：集合使用 Iterator 迭代器，数组使用索引 for 循环。不能在增强 for 循环中直接调用 list.remove()，会抛出 ConcurrentModificationException。正确做法：① 使用 iterator.remove()；② 使用 removeIf() 方法；③ 收集待删除元素后批量删除；④ 使用 CopyOnWriteArrayList（并发场景）。"
              },
              {
                question: "Switch 支持字符串的原理是什么？性能如何？",
                answer: "原理：编译器将字符串 switch 转换为基于 hashCode 的整数 switch，并在每个 case 中添加 equals 校验以处理哈希冲突。性能：比 if-else 链清晰但略慢，因为需要计算 hashCode 并逐个比较。分支较多时建议使用 enum + switch（编译期生成 tableswitch，O(1) 复杂度）。"
              },
              {
                question: "Try-with-resources 的工作原理是什么？如何处理多个异常？",
                answer: "工作原理：编译器自动生成 finally 块，逆序关闭所有实现了 AutoCloseable 接口的资源。异常处理：如果 try 块和 close() 都抛出异常，close() 的异常会被添加到主异常的 suppressed 列表中，可通过 getSuppressed() 获取。这避免了 close() 异常覆盖原始异常，保证异常信息的完整性。"
              },
              {
                question: "var 关键字的使用限制有哪些？它和动态类型有什么区别？",
                answer: "限制：① 只能用于局部变量，不能用于字段、方法参数、返回值；② 必须初始化，不能声明为 null；③ 不支持 Lambda 和方法引用（需要目标类型）；④ 不能用于数组初始化器。区别：var 是编译期类型推断，推断完成后就是静态类型，与显式声明无异；动态类型（如 JavaScript var）在运行时才确定类型，可随意改变。"
              },
              {
                question: "可变参数的本质是什么？使用时需要注意什么？",
                answer: "本质：可变参数在编译期转换为数组，<code className=\"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]\">void method(int... nums)</code> 等价于 <code className=\"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]\">void method(int[] nums)</code>。注意事项：① 可变参数必须放在参数列表最后；② 与固定参数重载时可能产生歧义；③ 每次调用都会创建数组对象，高频调用应考虑提供固定参数版本；④ 可以传入 null，需在方法内判空。"
              }
            ]} />
          </section>

          {/* 11. 知识关联 */}
          <section id="related">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              十、知识关联
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-parchment-light border border-border rounded-paper-md">
                <div className="text-[10px] font-mono text-ink-ghost mb-1">前置知识</div>
                <div className="text-[13px] font-medium text-ink">Java 基础语法（java-basics）</div>
              </div>
              <div className="p-4 bg-accent-glow border border-accent/20 rounded-paper-md">
                <div className="text-[10px] font-mono text-accent mb-1">延伸知识</div>
                <div className="text-[13px] font-medium text-ink">泛型与枚举、Lambda 表达式</div>
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
