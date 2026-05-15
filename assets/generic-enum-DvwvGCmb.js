import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as d}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as n}from"./SideNote-BKvanovA.js";import{C as t,A as l,S as a}from"./ArticleNav-DhfiS38Y.js";import{C as o}from"./ContextSwitcher-Cjd-h5IL.js";import{D as c}from"./DiagramBlock-CLaKE9_7.js";import{I as x}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、整体架构",level:2},{id:"generic-basics",text:"二、泛型基础",level:2},{id:"generic-class-method",text:"三、泛型类 / 泛型方法",level:2},{id:"wildcard",text:"四、通配符",level:2},{id:"enum",text:"五、枚举 enum",level:2},{id:"type-erasure",text:"六、类型擦除原理",level:2},{id:"misconceptions",text:"七、常见误区",level:2},{id:"interview",text:"八、面试真题",level:2},{id:"comparison",text:"九、对比分析",level:2},{id:"related",text:"十、知识关联",level:2}];function N({meta:r}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(d,{meta:r,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:[e.jsx("strong",{className:"text-accent",children:"泛型"}),"是 Java 的类型参数化机制，在编译期进行类型检查并实现代码复用；",e.jsx("strong",{className:"text-accent",children:"枚举"}),"是特殊的类，用于定义固定常量的集合，提供类型安全和丰富的功能支持。"]})}),e.jsx(t,{type:"tip",title:"为什么需要泛型和枚举？",children:"泛型解决了集合框架中的类型安全问题（避免 ClassCastException），枚举解决了常量定义的规范性问题（避免魔法数字）。两者都是 Java 类型系统的重要组成部分。"}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、整体架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["泛型和枚举虽然功能不同，但都属于 Java 类型系统的增强特性。泛型关注",e.jsx("strong",{children:"类型参数的抽象"}),"，枚举关注",e.jsx("strong",{children:"常量的规范化"}),"。"]}),e.jsx(c,{title:"泛型与枚举全景图",children:`graph LR
              subgraph Generics["泛型 Generics"]
                direction TB
                A["泛型类/接口"]
                B["泛型方法"]
                C["通配符 ? extends/super"]
                D["类型擦除（运行时）"]
              end
              subgraph Enum["枚举 Enum"]
                direction TB
                E["常量定义"]
                F["构造器/字段/方法"]
                G["switch 支持"]
                H["EnumSet/EnumMap"]
              end
              style Generics fill:#e0f2fe,stroke:#0ea5e9,stroke-width:2px
              style Enum fill:#fce7f3,stroke:#ec4899,stroke-width:2px
              style A fill:#bae6fd,stroke:none
              style B fill:#bae6fd,stroke:none
              style C fill:#bae6fd,stroke:none
              style D fill:#fdba74,stroke:none
              style E fill:#fbcfe8,stroke:none
              style F fill:#fbcfe8,stroke:none
              style G fill:#fbcfe8,stroke:none
              style H fill:#a5f3fc,stroke:none
            `}),e.jsx("h2",{id:"generic-basics",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、泛型基础"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["泛型的本质是",e.jsx("strong",{children:"类型参数化"}),"，允许在定义类、接口或方法时使用类型占位符，在使用时指定具体类型。"]}),e.jsx(s,{code:`// 不使用泛型（JDK 1.5 之前）
List list = new ArrayList();
list.add("Hello");
list.add(123);  // 编译通过，但运行时会出错
String s = (String) list.get(1);  // ClassCastException!

// 使用泛型（JDK 1.5+）
List<String> stringList = new ArrayList<>();
stringList.add("Hello");
// stringList.add(123);  // 编译错误！类型安全
String s = stringList.get(0);  // 无需强制转换`,language:"java",highlights:[1,7],filename:"GenericBasics.java",description:"泛型 vs 非泛型对比"}),e.jsx(t,{type:"warning",title:"泛型的优势",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"类型安全"}),"：编译期检查，避免运行时 ClassCastException"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"消除强制转换"}),"：编译器自动插入类型转换代码"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"代码复用"}),"：一套代码适用于多种类型"]})]})}),e.jsx(n,{label:"历史演进",children:"泛型是 JDK 1.5（2004年）引入的重大特性，由 Gilad Bracha 等人设计。在此之前，Java 集合只能存储 Object，需要手动强制转换，极易出错。"}),e.jsx("h2",{id:"generic-class-method",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、泛型类 / 泛型方法"}),e.jsx("h3",{id:"generic-class",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 泛型类"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"泛型类在类名后声明类型参数，整个类中都可以使用该类型。"}),e.jsx(s,{code:`public class Box<T> {
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
Integer num = intBox.get();`,language:"java",highlights:[1,14,18],filename:"GenericClass.java",description:"泛型类示例"}),e.jsx("h3",{id:"generic-method",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 泛型方法"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"泛型方法的类型参数声明在返回类型之前，可以独立于类的类型参数。"}),e.jsx(s,{code:`public class Utils {
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
String maxName = Utils.findMax(names);  // Charlie`,language:"java",highlights:[3,10],filename:"GenericMethod.java",description:"泛型方法示例"}),e.jsxs(t,{type:"info",title:"泛型方法的类型推断",children:["调用泛型方法时，编译器可以根据参数类型自动推断类型参数，无需显式指定。例如 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Utils.swap(names, 0, 1)"})," 会自动推断 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"T = String"}),"。"]}),e.jsx("h2",{id:"wildcard",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、通配符"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["通配符 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"?"})," 用于表示未知类型，配合 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"extends"})," 和 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"super"})," 实现更灵活的类型约束。"]}),e.jsx(o,{simpleContent:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsx("strong",{children:"无界通配符"})," ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<?>"}),"：可以接受任何类型的 List，但只能读取为 Object，不能添加元素（除了 null）。"]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsx("strong",{children:"上界通配符"})," ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<? extends Number>"}),"：可以接受 Number 及其子类的 List，只能读取为 Number，不能添加元素。"]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsx("strong",{children:"下界通配符"})," ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<? super Integer>"}),"：可以接受 Integer 及其父类的 List，可以添加 Integer 及其子类，但读取时只能是 Object。"]})]}),hardcoreContent:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:[e.jsx("strong",{children:"PECS 原则"}),"（Producer Extends, Consumer Super）："]}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Producer（生产者）"}),"：如果只需要从集合中",e.jsx("strong",{children:"读取"}),"数据，使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"? extends T"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Consumer（消费者）"}),"：如果只需要向集合中",e.jsx("strong",{children:"写入"}),"数据，使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"? super T"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"既是 Producer 又是 Consumer"}),"：不使用通配符，直接使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"T"})]})]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-3",children:["示例：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Collections.copy(List<? super T> dest, List<? extends T> src)"})," — dest 是消费者（写入），src 是生产者（读取）。"]})]})}),e.jsx(s,{code:`import java.util.*;

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
}`,language:"java",highlights:[5,15],filename:"WildcardDemo.java",description:"通配符使用示例"}),e.jsx("h2",{id:"enum",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、枚举 enum"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"枚举是 Java 5 引入的特殊类，用于定义一组固定的常量。每个枚举常量都是该枚举类的实例。"}),e.jsx(s,{code:`public enum DayOfWeek {
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
}`,language:"java",highlights:[1,14,28],filename:"DayOfWeek.java",description:"枚举完整示例"}),e.jsx(t,{type:"tip",title:"枚举的优势",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"类型安全"}),"：编译期检查，不能使用未定义的常量"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"可读性强"}),"：语义清晰，避免魔法数字"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"功能丰富"}),"：可以包含字段、方法、构造器"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"单例保证"}),"：每个枚举常量都是单例"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"天然线程安全"}),"：枚举实例在类加载时创建"]})]})}),e.jsx(n,{label:"最佳实践",children:"枚举适合定义固定的常量集合，如状态码、星期、季节、订单状态等。如果常量数量不确定或需要动态扩展，应使用普通类。"}),e.jsx("h3",{id:"enumset-enummap",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"5.1 EnumSet 和 EnumMap"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Java 提供了专门针对枚举的集合类，性能优于普通集合。"}),e.jsx(s,{code:`import java.util.*;

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
}`,language:"java",highlights:[10,17],filename:"EnumCollectionDemo.java",description:"EnumSet 和 EnumMap 示例"}),e.jsx("h2",{id:"type-erasure",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、类型擦除原理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java 泛型采用",e.jsx("strong",{children:"类型擦除"}),"（Type Erasure）实现，编译后将泛型信息擦除，替换为上界类型（默认为 Object）。这意味着泛型只在编译期有效，运行时不存在。"]}),e.jsx(s,{code:`import java.lang.reflect.ParameterizedType;
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
// List intList = new ArrayList();`,language:"java",highlights:[7,11,13],filename:"TypeErasureDemo.java",description:"类型擦除演示"}),e.jsx(t,{type:"danger",title:"类型擦除的限制",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"不能创建泛型数组"}),"：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"new T[10]"})," 编译错误"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"不能实例化泛型类型"}),"：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"new T()"})," 编译错误"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"不能使用基本类型"}),"：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<int>"})," 编译错误，必须用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<Integer>"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"不能捕获泛型异常"}),"：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"catch (T e)"})," 编译错误"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"static 字段不能引用类型参数"}),"：因为 static 在类加载时初始化，早于泛型实例化"]})]})}),e.jsxs(n,{label:"桥接方法",children:["为了保证多态性，编译器会为泛型类生成桥接方法（Bridge Method）。例如 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Comparable<T>"})," 的 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"compareTo(T)"})," 方法，编译器会生成一个桥接方法 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"compareTo(Object)"})," 来保持二进制兼容性。"]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：泛型在运行时保留类型信息",children:[e.jsxs("p",{className:"mt-2",children:["❌ 错误：很多人认为 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<String>"})," 和 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<Integer>"})," 在运行时是不同的类型。"]}),e.jsxs("p",{className:"mt-2",children:["✅ 正确：由于类型擦除，它们在运行时都是 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"ArrayList"}),"，泛型信息只在编译期存在。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：通配符 <?> 和 <Object> 等价",children:[e.jsxs("p",{className:"mt-2",children:["❌ 错误：认为 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<?>"})," 和 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<Object>"})," 可以互换使用。"]}),e.jsxs("p",{className:"mt-2",children:["✅ 正确：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<Object>"})," 只能接受 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<Object>"}),"，而 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<?>"})," 可以接受任何类型的 List。且 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<?>"})," 不能添加元素（除了 null），而 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"List<Object>"})," 可以添加任何对象。"]})]}),e.jsxs(t,{type:"danger",title:"误区 3：枚举只是常量集合",children:[e.jsxs("p",{className:"mt-2",children:["❌ 错误：认为枚举和 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"public static final"})," 常量没有区别。"]}),e.jsxs("p",{className:"mt-2",children:["✅ 正确：枚举是完整的类，可以有构造器、字段、方法、实现接口，甚至可以实现单例模式（Effective Java 推荐的最佳实践）。枚举还提供 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"values()"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"valueOf()"})," 等内置方法。"]})]}),e.jsxs(t,{type:"warning",title:"误区 4：泛型可以提升性能",children:[e.jsx("p",{className:"mt-2",children:"❌ 错误：认为使用泛型会让代码运行更快。"}),e.jsx("p",{className:"mt-2",children:"✅ 正确：泛型的主要作用是类型安全和代码复用，对性能几乎没有影响。由于类型擦除，运行时还会额外插入强制转换代码（虽然 JIT 优化后会消除大部分开销）。"})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、面试真题"}),e.jsx(x,{questions:[{question:"Java 泛型是如何实现的？什么是类型擦除？",answer:"Java 泛型采用类型擦除（Type Erasure）实现。编译器在编译期检查泛型类型安全，然后将泛型信息擦除，替换为上界类型（默认为 Object）。这意味着泛型只在编译期有效，运行时不存在泛型类型信息。例如 List<String> 和 List<Integer> 在运行时都是 ArrayList 类型。类型擦除保证了向后兼容性，但也带来了一些限制，如不能创建泛型数组、不能实例化泛型类型等。"},{question:"什么是 PECS 原则？举例说明。",answer:`PECS 原则是 Producer Extends, Consumer Super 的缩写，指导如何正确使用通配符：

1. Producer（生产者）：如果只需要从集合中读取数据，使用 ? extends T。例如 Collections.max(Collection<? extends T>)，只读取不写入。

2. Consumer（消费者）：如果只需要向集合中写入数据，使用 ? super T。例如 Collections.addAll(Collection<? super T>, T...)，只写入不读取。

3. 既是 Producer 又是 Consumer：不使用通配符，直接使用 T。

示例：Collections.copy(List<? super T> dest, List<? extends T> src) — dest 是消费者（写入），src 是生产者（读取）。`},{question:"枚举可以实现接口吗？枚举可以是单例吗？",answer:`是的，枚举可以实现接口。每个枚举常量都会实现接口的方法（可以在枚举类中统一实现，也可以为每个常量单独实现）。

枚举是实现单例模式的最佳方式（Effective Java 第 3 条推荐）。因为：
1. 枚举实例在类加载时创建，天然线程安全
2. JVM 保证枚举常量不会被反射破坏
3. 序列化时 JVM 特殊处理，不会出现多个实例

示例：
public enum Singleton {
    INSTANCE;
    public void doSomething() { ... }
}`},{question:"为什么不能用基本类型作为泛型参数？如 List<int>。",answer:`因为泛型在运行时会擦除为 Object，而基本类型（int、double 等）不是对象，不能赋值给 Object。Java 提供了包装类（Integer、Double 等）来解决这个问题。

从 JDK 5 开始，自动装箱（Autoboxing）和自动拆箱（Auto-unboxing）机制使得基本类型和包装类可以自动转换，所以 List<Integer> 使用起来和 List<int> 几乎一样方便，只是会有轻微的性能开销（装箱/拆箱操作）。`},{question:"EnumSet 和 EnumMap 为什么比普通集合更快？",answer:`EnumSet 和 EnumMap 是针对枚举优化的专用集合类：

1. EnumSet 基于位向量（Bit Vector）实现。如果枚举有 n 个常量，EnumSet 内部用一个 long（或多个 long）的位来表示哪些常量被选中。添加、删除、查询都是 O(1) 操作，且内存占用极小。

2. EnumMap 基于数组实现。内部用一个 Object[] 数组，索引对应枚举常量的 ordinal() 值。所有操作都是 O(1)，比 HashMap 的哈希计算和链表/红黑树操作更快。

3. 两者都利用了枚举的特性：常量数量有限、已知、有序（ordinal），因此可以使用更简单的数据结构。`},{question:"泛型类和泛型方法有什么区别？什么时候使用泛型方法？",answer:`主要区别：

1. 泛型类的类型参数作用于整个类，所有实例方法都可以使用该类型。泛型方法的类型参数只作用于该方法。

2. 泛型方法的类型参数可以独立于类的类型参数，静态方法必须是泛型方法（因为静态方法不属于任何实例）。

3. 泛型方法支持类型推断，调用时可以省略类型参数。

使用场景：
- 如果只有某个方法需要泛型，而其他方法不需要，应该使用泛型方法而不是泛型类
- 静态工具方法通常使用泛型方法，如 Collections.sort(List<T>)
- 当需要根据参数类型推断返回值类型时，使用泛型方法`},{question:"如何在运行时获取泛型的实际类型？",answer:`由于类型擦除，直接通过 getClass() 无法获取泛型类型。但可以通过以下方式间接获取：

1. 通过反射获取字段或方法的泛型签名：
Field field = clazz.getDeclaredField("list");
Type genericType = field.getGenericType();
if (genericType instanceof ParameterizedType) {
    Type[] actualTypes = ((ParameterizedType) genericType).getActualTypeArguments();
}

2. 继承泛型类时保留类型信息：
public class StringList extends ArrayList<String> {}
Type superclass = StringList.class.getGenericSuperclass();

3. 使用 TypeToken（Gson 库）或 TypeReference（Jackson 库）等工具类。

注意：这些方法都需要在编译期就知道泛型类型，不能在运行时动态获取任意对象的泛型类型。`}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、对比分析"}),e.jsx("h3",{id:"compare-enum-constant",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"9.1 枚举 vs 常量类"}),e.jsx("div",{className:"overflow-x-auto my-5",children:e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"枚举 enum"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"常量类 public static final"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"类型安全"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"✅ 编译期检查"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"❌ 只是 int/String，无类型约束"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"可读性"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"✅ 语义清晰"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"⚠️ 需要注释说明含义"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"功能扩展"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"✅ 可包含字段、方法、构造器"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"❌ 只能是常量值"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"遍历支持"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"✅ values() 方法"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"❌ 需手动维护列表"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"switch 支持"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"✅ 原生支持"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"✅ 支持（int/String）"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"性能"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"✅ 略优（编译期优化）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"✅ 相当"})]})]})]})}),e.jsx("h3",{id:"compare-wildcard",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"9.2 三种通配符对比"}),e.jsx("div",{className:"overflow-x-auto my-5",children:e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"通配符"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"接受的类型"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"读取类型"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"写入能力"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-mono text-ink",children:"List<?>"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"任何类型"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"Object"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"只能 null"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-mono text-ink",children:"List<? extends Number>"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"Number 及子类"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"Number"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"不能写入"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-mono text-ink",children:"List<? super Integer>"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"Integer 及父类"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"Object"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"Integer 及子类"})]})]})]})}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 my-5",children:[e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("div",{className:"font-sans font-semibold text-[13px] text-ink-faded uppercase tracking-[0.06em] mb-2",children:"前置知识"}),e.jsx("h4",{className:"font-display font-semibold text-[15px] text-ink mb-2",children:"Java 基础语法"}),e.jsx("p",{className:"text-[13px] text-ink-muted leading-[1.7]",children:"理解类、接口、继承、多态等基本概念，是学习泛型和枚举的基础。"})]}),e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("div",{className:"font-sans font-semibold text-[13px] text-ink-faded uppercase tracking-[0.06em] mb-2",children:"延伸知识"}),e.jsx("h4",{className:"font-display font-semibold text-[15px] text-ink mb-2",children:"集合框架"}),e.jsx("p",{className:"text-[13px] text-ink-muted leading-[1.7]",children:"集合框架大量使用泛型，深入理解泛型有助于掌握 ArrayList、HashMap 等集合类的源码。"})]}),e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("div",{className:"font-sans font-semibold text-[13px] text-ink-faded uppercase tracking-[0.06em] mb-2",children:"相关技术"}),e.jsx("h4",{className:"font-display font-semibold text-[15px] text-ink mb-2",children:"反射 API"}),e.jsx("p",{className:"text-[13px] text-ink-muted leading-[1.7]",children:"通过反射可以获取泛型的签名信息（ParameterizedType），弥补类型擦除的限制。"})]}),e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("div",{className:"font-sans font-semibold text-[13px] text-ink-faded uppercase tracking-[0.06em] mb-2",children:"最佳实践"}),e.jsx("h4",{className:"font-display font-semibold text-[15px] text-ink mb-2",children:"Effective Java"}),e.jsx("p",{className:"text-[13px] text-ink-muted leading-[1.7]",children:"Joshua Bloch 的《Effective Java》详细讲解了泛型和枚举的最佳实践，强烈推荐阅读第 5 章（泛型）和第 6 章（枚举和注解）。"})]})]}),e.jsxs(t,{type:"info",title:"学习建议",children:["泛型和枚举是 Java 中级开发的必备技能。建议：",e.jsxs("ol",{className:"list-decimal list-inside space-y-1 mt-2",children:[e.jsx("li",{children:"先掌握泛型类和泛型方法的基本用法"}),e.jsx("li",{children:"深入理解通配符和 PECS 原则（这是难点）"}),e.jsx("li",{children:"理解类型擦除的原理和限制"}),e.jsx("li",{children:"熟练使用枚举定义常量，了解 EnumSet/EnumMap 的性能优势"}),e.jsx("li",{children:"阅读集合框架源码，观察泛型的实际应用"})]})]}),e.jsx(l,{...i(r.category,r.id)})]})}),e.jsx(a,{items:m})]})}export{N as default};
