import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、整体架构', level: 2 },
  { id: 'generic-basics', text: '二、泛型基础', level: 2 },
  { id: 'generic-class-method', text: '三、泛型类 / 泛型方法', level: 2 },
  { id: 'wildcard', text: '四、通配符', level: 2 },
  { id: 'enum', text: '五、枚举 enum', level: 2 },
  { id: 'type-erasure', text: '六、类型擦除原理', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'comparison', text: '九、对比分析', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function GenericEnum({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              <strong className="text-accent">泛型</strong>是 Java 的类型参数化机制，在编译期进行类型检查并实现代码复用；
              <strong className="text-accent">枚举</strong>是特殊的类，用于定义固定常量的集合，提供类型安全和丰富的功能支持。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要泛型和枚举？">
            泛型解决了集合框架中的类型安全问题（避免 ClassCastException），枚举解决了常量定义的规范性问题（避免魔法数字）。两者都是 Java 类型系统的重要组成部分。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、整体架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            泛型和枚举虽然功能不同，但都属于 Java 类型系统的增强特性。泛型关注<strong>类型参数的抽象</strong>，枚举关注<strong>常量的规范化</strong>。
          </p>

          <DiagramBlock title="泛型与枚举全景图">
            <svg viewBox="0 0 500 320" className="w-full h-auto">
              {/* 背景 */}
              <rect x="0" y="0" width="500" height="320" fill="#f8f9fa" rx="8"/>
              
              {/* 泛型区域 */}
              <rect x="20" y="20" width="220" height="280" fill="#e0f2fe" rx="8" stroke="#0ea5e9" strokeWidth="2"/>
              <text x="130" y="50" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0369a1">泛型 Generics</text>
              
              {/* 泛型内容 */}
              <rect x="35" y="70" width="190" height="40" fill="#bae6fd" rx="4"/>
              <text x="130" y="95" textAnchor="middle" fontSize="13" fill="#0c4a6e">泛型类/接口</text>
              
              <rect x="35" y="120" width="190" height="40" fill="#bae6fd" rx="4"/>
              <text x="130" y="145" textAnchor="middle" fontSize="13" fill="#0c4a6e">泛型方法</text>
              
              <rect x="35" y="170" width="190" height="40" fill="#bae6fd" rx="4"/>
              <text x="130" y="195" textAnchor="middle" fontSize="13" fill="#0c4a6e">通配符 ? extends/super</text>
              
              <rect x="35" y="220" width="190" height="40" fill="#fdba74" rx="4"/>
              <text x="130" y="245" textAnchor="middle" fontSize="13" fill="#9a3412">类型擦除（运行时）</text>
              
              {/* 枚举区域 */}
              <rect x="260" y="20" width="220" height="280" fill="#fce7f3" rx="8" stroke="#ec4899" strokeWidth="2"/>
              <text x="370" y="50" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#be185d">枚举 Enum</text>
              
              {/* 枚举内容 */}
              <rect x="275" y="70" width="190" height="40" fill="#fbcfe8" rx="4"/>
              <text x="370" y="95" textAnchor="middle" fontSize="13" fill="#831843">常量定义</text>
              
              <rect x="275" y="120" width="190" height="40" fill="#fbcfe8" rx="4"/>
              <text x="370" y="145" textAnchor="middle" fontSize="13" fill="#831843">构造器/字段/方法</text>
              
              <rect x="275" y="170" width="190" height="40" fill="#fbcfe8" rx="4"/>
              <text x="370" y="195" textAnchor="middle" fontSize="13" fill="#831843">switch 支持</text>
              
              <rect x="275" y="220" width="190" height="40" fill="#a5f3fc" rx="4"/>
              <text x="370" y="245" textAnchor="middle" fontSize="13" fill="#155e75">EnumSet/EnumMap</text>
            </svg>
          </DiagramBlock>

          <h2 id="generic-basics" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、泛型基础
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            泛型的本质是<strong>类型参数化</strong>，允许在定义类、接口或方法时使用类型占位符，在使用时指定具体类型。
          </p>

          <Playground
            code={`// 不使用泛型（JDK 1.5 之前）
List list = new ArrayList();
list.add("Hello");
list.add(123);  // 编译通过，但运行时会出错
String s = (String) list.get(1);  // ClassCastException!

// 使用泛型（JDK 1.5+）
List<String> stringList = new ArrayList<>();
stringList.add("Hello");
// stringList.add(123);  // 编译错误！类型安全
String s = stringList.get(0);  // 无需强制转换`}
            language="java"
            highlights={[1, 7]}
            filename="GenericBasics.java"
            description="泛型 vs 非泛型对比"
          />

          <Callout type="warning" title="泛型的优势">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>类型安全</strong>：编译期检查，避免运行时 ClassCastException</li>
              <li><strong>消除强制转换</strong>：编译器自动插入类型转换代码</li>
              <li><strong>代码复用</strong>：一套代码适用于多种类型</li>
            </ul>
          </Callout>

          <SideNote label="历史演进">
            泛型是 JDK 1.5（2004年）引入的重大特性，由 Gilad Bracha 等人设计。在此之前，Java 集合只能存储 Object，需要手动强制转换，极易出错。
          </SideNote>

          <h2 id="generic-class-method" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、泛型类 / 泛型方法
          </h2>
          
          <h3 id="generic-class" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 泛型类
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            泛型类在类名后声明类型参数，整个类中都可以使用该类型。
          </p>

          <Playground
            code={`public class Box<T> {
    private T content;
    
    public void set(T content) {
        this.content = content;
    }
    
    public T get() {
        return content;
    }
}

// 使用
Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String value = stringBox.get();  // 无需转换

Box<Integer> intBox = new Box<>();
intBox.set(42);
Integer num = intBox.get();`}
            language="java"
            highlights={[1, 14, 18]}
            filename="GenericClass.java"
            description="泛型类示例"
          />

          <h3 id="generic-method" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 泛型方法
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            泛型方法的类型参数声明在返回类型之前，可以独立于类的类型参数。
          </p>

          <Playground
            code={`public class Utils {
    // 泛型方法：交换数组中两个元素
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    // 泛型方法：查找最大值
    public static <T extends Comparable<T>> T findMax(T[] array) {
        if (array == null || array.length == 0) {
            throw new IllegalArgumentException("Array is empty");
        }
        T max = array[0];
        for (int i = 1; i < array.length; i++) {
            if (array[i].compareTo(max) > 0) {
                max = array[i];
            }
        }
        return max;
    }
}

// 使用
String[] names = {"Alice", "Bob", "Charlie"};
Utils.swap(names, 0, 1);
String maxName = Utils.findMax(names);  // Charlie`}
            language="java"
            highlights={[3, 10]}
            filename="GenericMethod.java"
            description="泛型方法示例"
          />

          <Callout type="info" title="泛型方法的类型推断">
            调用泛型方法时，编译器可以根据参数类型自动推断类型参数，无需显式指定。例如 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Utils.swap(names, 0, 1)</code> 会自动推断 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">T = String</code>。
          </Callout>

          <h2 id="wildcard" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、通配符
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            通配符 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">?</code> 用于表示未知类型，配合 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">extends</code> 和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">super</code> 实现更灵活的类型约束。
          </p>

          <ContextSwitcher
            simpleContent={
              <div className="space-y-3">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>无界通配符</strong> <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;?&gt;</code>：可以接受任何类型的 List，但只能读取为 Object，不能添加元素（除了 null）。
                </p>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>上界通配符</strong> <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;? extends Number&gt;</code>：可以接受 Number 及其子类的 List，只能读取为 Number，不能添加元素。
                </p>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>下界通配符</strong> <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;? super Integer&gt;</code>：可以接受 Integer 及其父类的 List，可以添加 Integer 及其子类，但读取时只能是 Object。
                </p>
              </div>
            }
            hardcoreContent={
              <div className="space-y-3">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                  <strong>PECS 原则</strong>（Producer Extends, Consumer Super）：
                </p>
                <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted ml-4">
                  <li><strong>Producer（生产者）</strong>：如果只需要从集合中<strong>读取</strong>数据，使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">? extends T</code></li>
                  <li><strong>Consumer（消费者）</strong>：如果只需要向集合中<strong>写入</strong>数据，使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">? super T</code></li>
                  <li><strong>既是 Producer 又是 Consumer</strong>：不使用通配符，直接使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">T</code></li>
                </ul>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-3">
                  示例：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Collections.copy(List&lt;? super T&gt; dest, List&lt;? extends T&gt; src)</code> — dest 是消费者（写入），src 是生产者（读取）。
                </p>
              </div>
            }
          />

          <Playground
            code={`import java.util.*;

public class WildcardDemo {
    // 上界通配符：只能读，不能写（除了 null）
    public static double sum(List<? extends Number> numbers) {
        double sum = 0;
        for (Number n : numbers) {
            sum += n.doubleValue();  // 可以读取为 Number
        }
        // numbers.add(1);  // 编译错误！不能添加元素
        return sum;
    }
    
    // 下界通配符：只能写，读出来是 Object
    public static void addNumbers(List<? super Integer> list) {
        list.add(1);   // 可以添加 Integer
        list.add(2L);  // 编译错误！Long 不是 Integer 的子类
        // Integer i = list.get(0);  // 编译错误！只能读取为 Object
        Object obj = list.get(0);  // 只能读取为 Object
    }
    
    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.1, 2.2, 3.3);
        
        System.out.println(sum(ints));     // 6.0
        System.out.println(sum(doubles));  // 6.6
        
        List<Number> numbers = new ArrayList<>();
        addNumbers(numbers);  // Number 是 Integer 的父类
    }
}`}
            language="java"
            highlights={[5, 15]}
            filename="WildcardDemo.java"
            description="通配符使用示例"
          />

          <h2 id="enum" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、枚举 enum
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            枚举是 Java 5 引入的特殊类，用于定义一组固定的常量。每个枚举常量都是该枚举类的实例。
          </p>

          <Playground
            code={`public enum DayOfWeek {
    MONDAY("星期一", 1),
    TUESDAY("星期二", 2),
    WEDNESDAY("星期三", 3),
    THURSDAY("星期四", 4),
    FRIDAY("星期五", 5),
    SATURDAY("星期六", 6),
    SUNDAY("星期日", 7);
    
    private final String chineseName;
    private final int value;
    
    // 枚举可以有构造器（必须是 private）
    DayOfWeek(String chineseName, int value) {
        this.chineseName = chineseName;
        this.value = value;
    }
    
    public String getChineseName() {
        return chineseName;
    }
    
    public int getValue() {
        return value;
    }
    
    // 静态方法：根据值查找枚举
    public static DayOfWeek fromValue(int value) {
        for (DayOfWeek day : values()) {
            if (day.value == value) {
                return day;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }
}

// 使用
DayOfWeek today = DayOfWeek.MONDAY;
System.out.println(today.getChineseName());  // 星期一
System.out.println(today.getValue());         // 1

// switch 支持
switch (today) {
    case MONDAY:
    case TUESDAY:
    case WEDNESDAY:
    case THURSDAY:
    case FRIDAY:
        System.out.println("工作日");
        break;
    case SATURDAY:
    case SUNDAY:
        System.out.println("周末");
        break;
}`}
            language="java"
            highlights={[1, 14, 28]}
            filename="DayOfWeek.java"
            description="枚举完整示例"
          />

          <Callout type="tip" title="枚举的优势">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>类型安全</strong>：编译期检查，不能使用未定义的常量</li>
              <li><strong>可读性强</strong>：语义清晰，避免魔法数字</li>
              <li><strong>功能丰富</strong>：可以包含字段、方法、构造器</li>
              <li><strong>单例保证</strong>：每个枚举常量都是单例</li>
              <li><strong>天然线程安全</strong>：枚举实例在类加载时创建</li>
            </ul>
          </Callout>

          <SideNote label="最佳实践">
            枚举适合定义固定的常量集合，如状态码、星期、季节、订单状态等。如果常量数量不确定或需要动态扩展，应使用普通类。
          </SideNote>

          <h3 id="enumset-enummap" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 EnumSet 和 EnumMap
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 提供了专门针对枚举的集合类，性能优于普通集合。
          </p>

          <Playground
            code={`import java.util.*;

public enum Color {
    RED, GREEN, BLUE, YELLOW, BLACK, WHITE
}

public class EnumCollectionDemo {
    public static void main(String[] args) {
        // EnumSet：基于位向量实现，极快
        EnumSet<Color> primaryColors = EnumSet.of(Color.RED, Color.GREEN, Color.BLUE);
        System.out.println(primaryColors);  // [RED, GREEN, BLUE]
        
        EnumSet<Color> allColors = EnumSet.allOf(Color.class);
        System.out.println(allColors);  // [RED, GREEN, BLUE, YELLOW, BLACK, WHITE]
        
        // EnumMap：基于数组实现，比 HashMap 更快
        EnumMap<Color, String> colorNames = new EnumMap<>(Color.class);
        colorNames.put(Color.RED, "红色");
        colorNames.put(Color.GREEN, "绿色");
        colorNames.put(Color.BLUE, "蓝色");
        
        System.out.println(colorNames.get(Color.RED));  // 红色
        System.out.println(colorNames.containsKey(Color.YELLOW));  // false
    }
}`}
            language="java"
            highlights={[10, 17]}
            filename="EnumCollectionDemo.java"
            description="EnumSet 和 EnumMap 示例"
          />

          <h2 id="type-erasure" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、类型擦除原理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 泛型采用<strong>类型擦除</strong>（Type Erasure）实现，编译后将泛型信息擦除，替换为上界类型（默认为 Object）。这意味着泛型只在编译期有效，运行时不存在。
          </p>

          <Playground
            code={`import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.*;

public class TypeErasureDemo {
    public static void main(String[] args) {
        List<String> stringList = new ArrayList<>();
        List<Integer> intList = new ArrayList<>();
        
        // 运行时类型相同！泛型信息已被擦除
        System.out.println(stringList.getClass());  // class java.util.ArrayList
        System.out.println(intList.getClass());     // class java.util.ArrayList
        System.out.println(stringList.getClass() == intList.getClass());  // true
        
        // 无法通过反射获取泛型类型
        // stringList.getClass().getGenericSuperclass() 返回的是 Type，需要特殊处理
    }
}

// 编译后的字节码等价于：
// List stringList = new ArrayList();
// List intList = new ArrayList();`}
            language="java"
            highlights={[7, 11, 13]}
            filename="TypeErasureDemo.java"
            description="类型擦除演示"
          />

          <Callout type="danger" title="类型擦除的限制">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>不能创建泛型数组</strong>：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">new T[10]</code> 编译错误</li>
              <li><strong>不能实例化泛型类型</strong>：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">new T()</code> 编译错误</li>
              <li><strong>不能使用基本类型</strong>：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;int&gt;</code> 编译错误，必须用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;Integer&gt;</code></li>
              <li><strong>不能捕获泛型异常</strong>：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">catch (T e)</code> 编译错误</li>
              <li><strong>static 字段不能引用类型参数</strong>：因为 static 在类加载时初始化，早于泛型实例化</li>
            </ul>
          </Callout>

          <SideNote label="桥接方法">
            为了保证多态性，编译器会为泛型类生成桥接方法（Bridge Method）。例如 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Comparable&lt;T&gt;</code> 的 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">compareTo(T)</code> 方法，编译器会生成一个桥接方法 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">compareTo(Object)</code> 来保持二进制兼容性。
          </SideNote>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区 1：泛型在运行时保留类型信息">
            <p className="mt-2">❌ 错误：很多人认为 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;String&gt;</code> 和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;Integer&gt;</code> 在运行时是不同的类型。</p>
            <p className="mt-2">✅ 正确：由于类型擦除，它们在运行时都是 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ArrayList</code>，泛型信息只在编译期存在。</p>
          </Callout>

          <Callout type="danger" title="误区 2：通配符 <?> 和 <Object> 等价">
            <p className="mt-2">❌ 错误：认为 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;?&gt;</code> 和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;Object&gt;</code> 可以互换使用。</p>
            <p className="mt-2">✅ 正确：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;Object&gt;</code> 只能接受 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;Object&gt;</code>，而 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;?&gt;</code> 可以接受任何类型的 List。且 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;?&gt;</code> 不能添加元素（除了 null），而 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">List&lt;Object&gt;</code> 可以添加任何对象。</p>
          </Callout>

          <Callout type="danger" title="误区 3：枚举只是常量集合">
            <p className="mt-2">❌ 错误：认为枚举和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">public static final</code> 常量没有区别。</p>
            <p className="mt-2">✅ 正确：枚举是完整的类，可以有构造器、字段、方法、实现接口，甚至可以实现单例模式（Effective Java 推荐的最佳实践）。枚举还提供 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">values()</code>、<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">valueOf()</code> 等内置方法。</p>
          </Callout>

          <Callout type="warning" title="误区 4：泛型可以提升性能">
            <p className="mt-2">❌ 错误：认为使用泛型会让代码运行更快。</p>
            <p className="mt-2">✅ 正确：泛型的主要作用是类型安全和代码复用，对性能几乎没有影响。由于类型擦除，运行时还会额外插入强制转换代码（虽然 JIT 优化后会消除大部分开销）。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: 'Java 泛型是如何实现的？什么是类型擦除？',
              answer: 'Java 泛型采用类型擦除（Type Erasure）实现。编译器在编译期检查泛型类型安全，然后将泛型信息擦除，替换为上界类型（默认为 Object）。这意味着泛型只在编译期有效，运行时不存在泛型类型信息。例如 List<String> 和 List<Integer> 在运行时都是 ArrayList 类型。类型擦除保证了向后兼容性，但也带来了一些限制，如不能创建泛型数组、不能实例化泛型类型等。'
            },
            {
              question: '什么是 PECS 原则？举例说明。',
              answer: 'PECS 原则是 Producer Extends, Consumer Super 的缩写，指导如何正确使用通配符：\n\n1. Producer（生产者）：如果只需要从集合中读取数据，使用 ? extends T。例如 Collections.max(Collection<? extends T>)，只读取不写入。\n\n2. Consumer（消费者）：如果只需要向集合中写入数据，使用 ? super T。例如 Collections.addAll(Collection<? super T>, T...)，只写入不读取。\n\n3. 既是 Producer 又是 Consumer：不使用通配符，直接使用 T。\n\n示例：Collections.copy(List<? super T> dest, List<? extends T> src) — dest 是消费者（写入），src 是生产者（读取）。'
            },
            {
              question: '枚举可以实现接口吗？枚举可以是单例吗？',
              answer: '是的，枚举可以实现接口。每个枚举常量都会实现接口的方法（可以在枚举类中统一实现，也可以为每个常量单独实现）。\n\n枚举是实现单例模式的最佳方式（Effective Java 第 3 条推荐）。因为：\n1. 枚举实例在类加载时创建，天然线程安全\n2. JVM 保证枚举常量不会被反射破坏\n3. 序列化时 JVM 特殊处理，不会出现多个实例\n\n示例：\npublic enum Singleton {\n    INSTANCE;\n    public void doSomething() { ... }\n}'
            },
            {
              question: '为什么不能用基本类型作为泛型参数？如 List<int>。',
              answer: '因为泛型在运行时会擦除为 Object，而基本类型（int、double 等）不是对象，不能赋值给 Object。Java 提供了包装类（Integer、Double 等）来解决这个问题。\n\n从 JDK 5 开始，自动装箱（Autoboxing）和自动拆箱（Auto-unboxing）机制使得基本类型和包装类可以自动转换，所以 List<Integer> 使用起来和 List<int> 几乎一样方便，只是会有轻微的性能开销（装箱/拆箱操作）。'
            },
            {
              question: 'EnumSet 和 EnumMap 为什么比普通集合更快？',
              answer: 'EnumSet 和 EnumMap 是针对枚举优化的专用集合类：\n\n1. EnumSet 基于位向量（Bit Vector）实现。如果枚举有 n 个常量，EnumSet 内部用一个 long（或多个 long）的位来表示哪些常量被选中。添加、删除、查询都是 O(1) 操作，且内存占用极小。\n\n2. EnumMap 基于数组实现。内部用一个 Object[] 数组，索引对应枚举常量的 ordinal() 值。所有操作都是 O(1)，比 HashMap 的哈希计算和链表/红黑树操作更快。\n\n3. 两者都利用了枚举的特性：常量数量有限、已知、有序（ordinal），因此可以使用更简单的数据结构。'
            },
            {
              question: '泛型类和泛型方法有什么区别？什么时候使用泛型方法？',
              answer: '主要区别：\n\n1. 泛型类的类型参数作用于整个类，所有实例方法都可以使用该类型。泛型方法的类型参数只作用于该方法。\n\n2. 泛型方法的类型参数可以独立于类的类型参数，静态方法必须是泛型方法（因为静态方法不属于任何实例）。\n\n3. 泛型方法支持类型推断，调用时可以省略类型参数。\n\n使用场景：\n- 如果只有某个方法需要泛型，而其他方法不需要，应该使用泛型方法而不是泛型类\n- 静态工具方法通常使用泛型方法，如 Collections.sort(List<T>)\n- 当需要根据参数类型推断返回值类型时，使用泛型方法'
            },
            {
              question: '如何在运行时获取泛型的实际类型？',
              answer: '由于类型擦除，直接通过 getClass() 无法获取泛型类型。但可以通过以下方式间接获取：\n\n1. 通过反射获取字段或方法的泛型签名：\nField field = clazz.getDeclaredField("list");\nType genericType = field.getGenericType();\nif (genericType instanceof ParameterizedType) {\n    Type[] actualTypes = ((ParameterizedType) genericType).getActualTypeArguments();\n}\n\n2. 继承泛型类时保留类型信息：\npublic class StringList extends ArrayList<String> {}\nType superclass = StringList.class.getGenericSuperclass();\n\n3. 使用 TypeToken（Gson 库）或 TypeReference（Jackson 库）等工具类。\n\n注意：这些方法都需要在编译期就知道泛型类型，不能在运行时动态获取任意对象的泛型类型。'
            }
          ]} />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、对比分析
          </h2>

          <h3 id="compare-enum-constant" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            9.1 枚举 vs 常量类
          </h3>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-[13px] sm:text-[14px] border-collapse">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">特性</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">枚举 enum</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">常量类 public static final</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">类型安全</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 编译期检查</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">❌ 只是 int/String，无类型约束</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 font-medium text-ink">可读性</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 语义清晰</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⚠️ 需要注释说明含义</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">功能扩展</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 可包含字段、方法、构造器</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">❌ 只能是常量值</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 font-medium text-ink">遍历支持</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ values() 方法</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">❌ 需手动维护列表</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">switch 支持</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 原生支持</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 支持（int/String）</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 font-medium text-ink">性能</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 略优（编译期优化）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 相当</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="compare-wildcard" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            9.2 三种通配符对比
          </h3>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-[13px] sm:text-[14px] border-collapse">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">通配符</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">接受的类型</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">读取类型</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">写入能力</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 font-mono text-ink">List&lt;?&gt;</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">任何类型</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">Object</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">只能 null</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 font-mono text-ink">List&lt;? extends Number&gt;</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">Number 及子类</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">Number</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">不能写入</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-mono text-ink">List&lt;? super Integer&gt;</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">Integer 及父类</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">Object</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">Integer 及子类</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
              <div className="font-sans font-semibold text-[13px] text-ink-faded uppercase tracking-[0.06em] mb-2">前置知识</div>
              <h4 className="font-display font-semibold text-[15px] text-ink mb-2">Java 基础语法</h4>
              <p className="text-[13px] text-ink-muted leading-[1.7]">理解类、接口、继承、多态等基本概念，是学习泛型和枚举的基础。</p>
            </div>
            
            <div className="bg-parchment-light border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
              <div className="font-sans font-semibold text-[13px] text-ink-faded uppercase tracking-[0.06em] mb-2">延伸知识</div>
              <h4 className="font-display font-semibold text-[15px] text-ink mb-2">集合框架</h4>
              <p className="text-[13px] text-ink-muted leading-[1.7]">集合框架大量使用泛型，深入理解泛型有助于掌握 ArrayList、HashMap 等集合类的源码。</p>
            </div>
            
            <div className="bg-parchment-light border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
              <div className="font-sans font-semibold text-[13px] text-ink-faded uppercase tracking-[0.06em] mb-2">相关技术</div>
              <h4 className="font-display font-semibold text-[15px] text-ink mb-2">反射 API</h4>
              <p className="text-[13px] text-ink-muted leading-[1.7]">通过反射可以获取泛型的签名信息（ParameterizedType），弥补类型擦除的限制。</p>
            </div>
            
            <div className="bg-parchment-light border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
              <div className="font-sans font-semibold text-[13px] text-ink-faded uppercase tracking-[0.06em] mb-2">最佳实践</div>
              <h4 className="font-display font-semibold text-[15px] text-ink mb-2">Effective Java</h4>
              <p className="text-[13px] text-ink-muted leading-[1.7]">Joshua Bloch 的《Effective Java》详细讲解了泛型和枚举的最佳实践，强烈推荐阅读第 5 章（泛型）和第 6 章（枚举和注解）。</p>
            </div>
          </div>

          <Callout type="info" title="学习建议">
            泛型和枚举是 Java 中级开发的必备技能。建议：
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>先掌握泛型类和泛型方法的基本用法</li>
              <li>深入理解通配符和 PECS 原则（这是难点）</li>
              <li>理解类型擦除的原理和限制</li>
              <li>熟练使用枚举定义常量，了解 EnumSet/EnumMap 的性能优势</li>
              <li>阅读集合框架源码，观察泛型的实际应用</li>
            </ol>
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
