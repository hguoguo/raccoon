import{j as e,g as s}from"./index-hyqxTCwJ.js";import{K as d}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as n}from"./SideNote-BKvanovA.js";import{C as t,A as l,S as m}from"./ArticleNav-DhfiS38Y.js";import{D as i}from"./DiagramBlock-CLaKE9_7.js";import{I as o}from"./InterviewSection-BBNdwyyN.js";const p=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、整体架构",level:2},{id:"functional-interface",text:"二、函数式接口",level:2},{id:"syntax",text:"三、Lambda 语法",level:2},{id:"method-reference",text:"四、方法引用",level:2},{id:"constructor-reference",text:"五、构造器引用",level:2},{id:"variable-capture",text:"六、变量捕获",level:2},{id:"core-principles",text:"七、核心原理",level:2},{id:"common-apis",text:"八、常用 API",level:2},{id:"misconceptions",text:"九、常见误区",level:2},{id:"interview",text:"十、面试真题",level:2},{id:"comparison",text:"十一、对比分析",level:2},{id:"related",text:"十二、知识关联",level:2}];function j({meta:a}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(d,{meta:a,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Lambda 表达式是 Java 8 引入的",e.jsx("strong",{className:"text-accent",children:"匿名函数"}),"，允许将行为作为参数传递，实现更简洁的代码和函数式编程风格。"]})}),e.jsx(t,{type:"tip",title:"为什么需要 Lambda？",children:'在 Java 8 之前，传递行为需要使用匿名内部类，代码冗长且难以阅读。Lambda 表达式通过简化语法，让开发者能够以更自然的方式表达"做什么"而非"怎么做"。'}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、整体架构"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Lambda 表达式依赖于函数式接口（Functional Interface），编译器将其转换为接口的实例。整个体系包括：函数式接口、Lambda 语法、方法引用三大核心组件。"}),e.jsx(i,{title:"Lambda 表达式架构",children:`┌─────────────────────────────────────┐
│         函数式编程范式              │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────┐    ┌──────────────┐  │
│  │ Lambda   │───▶│ 函数式接口   │  │
│  │ 表达式   │    │ (SAM)        │  │
│  └──────────┘    └──────────────┘  │
│       ▲                  │          │
│       │                  ▼          │
│  ┌──────────┐    ┌──────────────┐  │
│  │ 方法引用 │    │ 目标类型     │  │
│  │ (::)     │    │ 推断         │  │
│  └──────────┘    └──────────────┘  │
│                                     │
└─────────────────────────────────────┘`}),e.jsx(n,{children:"SAM = Single Abstract Method，即只有一个抽象方法的接口。Java 8 引入了 @FunctionalInterface 注解来标记这类接口。"}),e.jsx("h2",{id:"functional-interface",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、函数式接口"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["函数式接口是 Lambda 表达式的目标类型。Java 提供了四大核心函数式接口，位于 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"java.util.function"})," 包中。"]}),e.jsx(r,{code:`import java.util.function.*;

// 1. Consumer<T> - 消费型接口（有入参，无返回值）
Consumer<String> printer = s -> System.out.println(s);
printer.accept("Hello Lambda"); // 输出: Hello Lambda

// 2. Supplier<T> - 供给型接口（无入参，有返回值）
Supplier<Double> random = () -> Math.random();
System.out.println(random.get()); // 输出: 0.xxxx

// 3. Function<T,R> - 函数型接口（有入参，有返回值）
Function<String, Integer> length = s -> s.length();
System.out.println(length.apply("Lambda")); // 输出: 7

// 4. Predicate<T> - 断言型接口（有入参，返回 boolean）
Predicate<Integer> isEven = n -> n % 2 == 0;
System.out.println(isEven.test(10)); // 输出: true
System.out.println(isEven.test(7));  // 输出: false`,language:"java",highlights:[4,8,12,16],filename:"FunctionalInterfaces.java",description:"四大核心函数式接口"}),e.jsx(t,{type:"info",title:"@FunctionalInterface 注解",children:"该注解用于编译期检查接口是否符合函数式接口规范。如果接口有多个抽象方法，编译器会报错。注意：默认方法（default）和静态方法不算抽象方法。"}),e.jsx("h2",{id:"syntax",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、Lambda 语法"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Lambda 表达式的基本语法为：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"(parameters) -> expression"})," 或 ",e.jsxs("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:["(parameters) -> ","{"," statements ","}"]}),"。"]}),e.jsx(r,{code:`import java.util.Arrays;
import java.util.List;

List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

// 1. 无参数，单行表达式
Runnable r = () -> System.out.println("Running");
r.run(); // 输出: Running

// 2. 单参数，可省略括号
Consumer<String> print = name -> System.out.println(name);
names.forEach(print); // 输出: Alice Bob Charlie David

// 3. 多参数，需要括号
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
System.out.println(add.apply(3, 5)); // 输出: 8

// 4. 多语句，需要花括号和 return
Comparator<String> byLength = (s1, s2) -> {
    int len1 = s1.length();
    int len2 = s2.length();
    return Integer.compare(len1, len2);
};
names.sort(byLength);
System.out.println(names); // 输出: [Bob, Alice, David, Charlie]

// 5. 类型推断（编译器自动推断参数类型）
BinaryOperator<Integer> multiply = (x, y) -> x * y;
System.out.println(multiply.apply(4, 5)); // 输出: 20`,language:"java",highlights:[7,11,15,19,27],filename:"LambdaSyntax.java",description:"Lambda 语法示例"}),e.jsx(n,{children:"Lambda 表达式可以访问 final 或 effectively final（实际上不可变）的局部变量。这是 Java 闭包的实现方式。"}),e.jsx("h2",{id:"method-reference",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、方法引用"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["方法引用是 Lambda 的简化写法，当 Lambda 体只是调用一个已有方法时，可以使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"::"})," 运算符。"]}),e.jsx(r,{code:`import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// 1. 静态方法引用：ClassName::staticMethod
Function<String, Integer> parseInt = Integer::parseInt;
System.out.println(parseInt.apply("123")); // 输出: 123

// 2. 实例方法引用：instance::instanceMethod
Consumer<String> printer = System.out::println;
names.forEach(printer); // 输出: Alice Bob Charlie

// 3. 特定类型的任意对象的方法引用：ClassName::instanceMethod
Function<String, String> upperCase = String::toUpperCase;
System.out.println(upperCase.apply("hello")); // 输出: HELLO

// 4. 构造器引用：ClassName::new（见下一节）

// Lambda vs 方法引用对比
Consumer<String> lambda = s -> System.out.println(s);
Consumer<String> methodRef = System.out::println;
// 两者等价，但方法引用更简洁`,language:"java",highlights:[10,14,18,24,25],filename:"MethodReference.java",description:"方法引用的四种形式"}),e.jsx("h2",{id:"constructor-reference",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、构造器引用"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["构造器引用使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"ClassName::new"})," 语法，根据函数式接口的签名自动匹配对应的构造器。"]}),e.jsx(r,{code:`import java.util.function.Function;
import java.util.function.Supplier;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

class Person {
    private String name;
    private int age;
    
    public Person() {
        this.name = "Unknown";
        this.age = 0;
    }
    
    public Person(String name) {
        this.name = name;
        this.age = 0;
    }
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

// 1. 无参构造器：Supplier<T>
Supplier<Person> personSupplier = Person::new;
Person p1 = personSupplier.get();
System.out.println(p1); // 输出: Person{name='Unknown', age=0}

// 2. 单参构造器：Function<T, R>
Function<String, Person> nameConstructor = Person::new;
Person p2 = nameConstructor.apply("Alice");
System.out.println(p2); // 输出: Person{name='Alice', age=0}

// 3. 双参构造器：BiFunction<T, U, R>
BiFunction<String, Integer, Person> fullConstructor = Person::new;
Person p3 = fullConstructor.apply("Bob", 25);
System.out.println(p3); // 输出: Person{name='Bob', age=25}

// 4. 数组构造器：int[]::new
Function<Integer, int[]> arrayCreator = int[]::new;
int[] arr = arrayCreator.apply(5);
System.out.println(arr.length); // 输出: 5`,language:"java",highlights:[33,38,43,48],filename:"ConstructorReference.java",description:"构造器引用示例"}),e.jsx("h2",{id:"variable-capture",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、变量捕获"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Lambda 表达式可以捕获外部变量，但必须是 final 或 effectively final（赋值后不再修改）。这是因为 Lambda 可能在异步线程中执行，捕获的是变量的副本。"}),e.jsx(r,{code:`import java.util.function.Supplier;

public class VariableCapture {
    public static void main(String[] args) {
        int multiplier = 10; // effectively final
        
        // ✅ 正确：捕获 effectively final 变量
        Supplier<Integer> calc = () -> 5 * multiplier;
        System.out.println(calc.get()); // 输出: 50
        
        // ❌ 错误：尝试修改被捕获的变量
        // multiplier = 20; // 编译错误！
        
        // ✅ 正确：使用原子类实现可变状态
        java.util.concurrent.atomic.AtomicInteger counter = new java.util.concurrent.atomic.AtomicInteger(0);
        Runnable increment = () -> counter.incrementAndGet();
        increment.run();
        System.out.println(counter.get()); // 输出: 1
        
        // 实例变量和静态变量不受限制
        VariableCapture obj = new VariableCapture();
        obj.instanceVar = 100;
        Supplier<Integer> getInstanceVar = () -> obj.instanceVar;
        System.out.println(getInstanceVar.get()); // 输出: 100
    }
    
    int instanceVar = 0; // 实例变量可以自由访问
    static int staticVar = 0; // 静态变量也可以自由访问
}`,language:"java",highlights:[5,8,15,21,26,27],filename:"VariableCapture.java",description:"变量捕获规则"}),e.jsx(t,{type:"warning",title:"变量捕获的限制",children:"Lambda 捕获的是变量的值副本，而非引用。因此，如果需要在 Lambda 中修改变量，必须使用原子类（AtomicInteger、AtomicReference 等）或数组包装。"}),e.jsx("h2",{id:"core-principles",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、核心原理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Lambda 表达式在编译时被转换为 invokedynamic 指令，运行时通过 LambdaMetafactory 动态生成实现类。这种机制避免了为每个 Lambda 创建独立的类文件，提升了性能。"}),e.jsx(i,{title:"Lambda 编译与执行流程",children:`源代码                    编译阶段                 运行阶段
┌──────────────┐
│ (x, y) ->    │
│   x + y      │
└──────┬───────┘
       │ javac 编译
       ▼
┌──────────────┐
│ invokedynamic│ ──────────────┐
│ 指令         │               │
└──────────────┘               │
                               │ Bootstrap Method
                               ▼
                      ┌────────────────┐
                      │ LambdaMeta     │
                      │ factory        │
                      └───────┬────────┘
                              │ 动态生成
                              ▼
                      ┌────────────────┐
                      │ 实现类实例     │
                      │ (匿名内部类)   │
                      └────────────────┘`}),e.jsx(n,{children:"与匿名内部类不同，Lambda 不会创建独立的 .class 文件。JVM 在运行时动态生成实现类，减少了类加载开销和内存占用。"}),e.jsx("h2",{id:"common-apis",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、常用 API"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Java 8 在集合框架中新增了大量支持 Lambda 的方法，如 forEach、removeIf、replaceAll 等。这些方法让集合操作更加简洁高效。"}),e.jsx(r,{code:`import java.util.*;
import java.util.stream.Collectors;

List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve");

// 1. forEach - 遍历
names.forEach(name -> System.out.println(name));
// 输出: Alice Bob Charlie David Eve

// 2. removeIf - 条件删除
names.removeIf(name -> name.startsWith("A"));
System.out.println(names); // 输出: [Bob, Charlie, David, Eve]

// 3. replaceAll - 批量替换
names.replaceAll(String::toUpperCase);
System.out.println(names); // 输出: [BOB, CHARLIE, DAVID, EVE]

// 4. sort - 自定义排序
names.sort((a, b) -> a.length() - b.length());
System.out.println(names); // 输出: [BOB, EVE, DAVID, CHARLIE]

// 5. computeIfAbsent - Map 操作
Map<String, Integer> map = new HashMap<>();
map.computeIfAbsent("key", k -> k.length());
System.out.println(map.get("key")); // 输出: 3

// 6. Optional - 空值处理
Optional<String> opt = Optional.ofNullable(null);
String result = opt.orElse("default");
System.out.println(result); // 输出: default`,language:"java",highlights:[7,11,15,19,23,28],filename:"CommonAPIs.java",description:"集合框架中的 Lambda API"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：Lambda 就是匿名内部类的语法糖",children:[e.jsx("strong",{children:"错误理解："}),"Lambda 只是匿名内部类的简化写法，两者完全等价。",e.jsx("br",{}),e.jsx("strong",{children:"正确理解："}),"Lambda 使用 invokedynamic 指令，运行时动态生成实现类；匿名内部类在编译时生成独立的 .class 文件。Lambda 性能更好，内存占用更少。此外，this 关键字在 Lambda 中指代外部类实例，而在匿名内部类中指代内部类实例。"]}),e.jsxs(t,{type:"danger",title:"误区 2：Lambda 可以修改外部变量",children:[e.jsx("strong",{children:"错误理解："}),"Lambda 可以像普通方法一样修改外部局部变量。",e.jsx("br",{}),e.jsx("strong",{children:"正确理解："}),"Lambda 只能捕获 final 或 effectively final 的局部变量。如果需要可变状态，应使用原子类（AtomicInteger、AtomicReference）或数组包装。这是因为 Lambda 可能在异步线程中执行，捕获的是变量副本。"]}),e.jsxs(t,{type:"danger",title:"误区 3：所有接口都可以用 Lambda 实现",children:[e.jsx("strong",{children:"错误理解："}),"任何接口都可以用 Lambda 表达式实现。",e.jsx("br",{}),e.jsx("strong",{children:"正确理解："}),"只有函数式接口（只有一个抽象方法）才能用 Lambda 实现。如果接口有多个抽象方法，必须使用匿名内部类或具体实现类。可以使用 @FunctionalInterface 注解进行编译期检查。"]}),e.jsxs(t,{type:"danger",title:"误区 4：Lambda 总是比传统循环快",children:[e.jsx("strong",{children:"错误理解："}),"Lambda 表达式性能一定优于传统 for 循环。",e.jsx("br",{}),e.jsx("strong",{children:"正确理解："}),"Lambda 的性能取决于具体场景。简单的 forEach 可能略慢于传统 for 循环（因为涉及方法调用开销），但在并行流、复杂过滤等场景下，Lambda + Stream 可以利用多核优势，性能显著提升。应基于实际测试选择最优方案。"]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、面试真题"}),e.jsx(o,{questions:[{question:"Lambda 表达式和匿名内部类有什么区别？",answer:`主要区别有四点：
1. **编译方式**：Lambda 使用 invokedynamic 指令，运行时动态生成实现类；匿名内部类在编译时生成独立的 .class 文件。
2. **this 关键字**：Lambda 中的 this 指代外部类实例；匿名内部类中的 this 指代内部类实例。
3. **变量捕获**：Lambda 只能捕获 final 或 effectively final 变量；匿名内部类同样有此限制，但语义略有不同。
4. **性能**：Lambda 通常性能更好，内存占用更少，因为不需要为每个 Lambda 创建独立的类文件。`},{question:"什么是函数式接口？Java 8 提供了哪些核心函数式接口？",answer:`函数式接口是只有一个抽象方法的接口（可以有多个默认方法或静态方法）。Java 8 在 java.util.function 包中提供了四大核心函数式接口：
1. **Consumer<T>**：消费型接口，接受一个参数，无返回值（void）。
2. **Supplier<T>**：供给型接口，无参数，返回一个值。
3. **Function<T, R>**：函数型接口，接受一个参数，返回一个值。
4. **Predicate<T>**：断言型接口，接受一个参数，返回 boolean。

此外还有 BiFunction、UnaryOperator、BinaryOperator 等扩展接口。`},{question:"Lambda 表达式可以捕获哪些变量？有什么限制？",answer:`Lambda 可以捕获：
1. **final 局部变量**：显式声明为 final 的变量。
2. **effectively final 局部变量**：赋值后不再修改的变量（编译器自动推断）。
3. **实例变量和静态变量**：不受限制，可以自由访问和修改。

限制原因：Lambda 可能在异步线程中执行，捕获的是变量的副本而非引用。如果需要可变状态，应使用原子类（AtomicInteger、AtomicReference）或数组包装。`},{question:"方法引用有哪几种形式？请举例说明。",answer:`方法引用有四种形式：
1. **静态方法引用**：ClassName::staticMethod，如 Integer::parseInt。
2. **实例方法引用**：instance::instanceMethod，如 System.out::println。
3. **特定类型的任意对象的方法引用**：ClassName::instanceMethod，如 String::toUpperCase。
4. **构造器引用**：ClassName::new，如 ArrayList::new。

方法引用是 Lambda 的简化写法，当 Lambda 体只是调用一个已有方法时使用。`},{question:"Lambda 表达式的底层实现原理是什么？",answer:`Lambda 表达式在编译时被转换为 invokedynamic 指令，而不是像匿名内部类那样生成独立的 .class 文件。运行时，JVM 通过 LambdaMetafactory 的 bootstrap 方法动态生成实现类。这种机制的优势是：
1. **延迟绑定**：实现类在首次使用时才生成，减少启动时间。
2. **内存优化**：不需要为每个 Lambda 创建独立的类文件。
3. **性能提升**：invokedynamic 指令经过 JVM 优化，执行效率更高。

可以通过系统属性 -Djdk.internal.lambda.dumpProxyClasses 查看生成的代理类。`},{question:"如何在 Lambda 中实现可变状态？",answer:`由于 Lambda 只能捕获 final 或 effectively final 变量，实现可变状态的方法有：
1. **使用原子类**：如 AtomicInteger、AtomicReference，它们的值是原子的，可以在 Lambda 中安全修改。
2. **使用数组包装**：如 final int[] counter = {0};，然后 counter[0]++。
3. **使用容器类**：如 final List<Integer> list = new ArrayList<>();，然后 list.add(value)。
4. **使用成员变量或静态变量**：这些变量不受 Lambda 捕获限制。

推荐优先使用原子类，因为它们线程安全且语义清晰。`}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、对比分析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Lambda 表达式与匿名内部类、传统循环在语法、性能和适用场景上有明显差异。以下是详细对比："}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full border-collapse border border-border text-[13px] sm:text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"Lambda 表达式"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"匿名内部类"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"传统循环"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"语法简洁度"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐ 非常简洁"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"⭐⭐ 冗长"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"⭐⭐⭐ 中等"})]}),e.jsxs("tr",{className:"bg-parchment-soft/30",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"编译产物"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"invokedynamic 指令"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"独立 .class 文件"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"字节码内联"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"this 指向"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"外部类实例"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"内部类实例"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"当前类实例"})]}),e.jsxs("tr",{className:"bg-parchment-soft/30",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"性能"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"高（动态生成）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"中（类加载开销）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"高（直接执行）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"适用场景"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"函数式接口、Stream"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"多方法接口、复杂逻辑"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"简单遍历、索引操作"})]}),e.jsxs("tr",{className:"bg-parchment-soft/30",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"并行支持"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"✅ 天然支持（parallelStream）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"❌ 需手动实现"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"❌ 需手动实现"})]})]})]})}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十二、知识关联"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Lambda 表达式是 Java 函数式编程的基础，与以下知识点密切相关："}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6",children:[e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-parchment-soft/30",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🔗 Stream API"}),e.jsx("p",{className:"text-[13px] text-ink-muted",children:"Lambda 是 Stream 操作的核心，filter、map、reduce 等方法都依赖 Lambda 表达式传递行为。"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-parchment-soft/30",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🔗 方法引用"}),e.jsx("p",{className:"text-[13px] text-ink-muted",children:"方法引用是 Lambda 的简化形式，进一步简化代码，提高可读性。"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-parchment-soft/30",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🔗 Optional"}),e.jsx("p",{className:"text-[13px] text-ink-muted",children:"Optional 的 map、flatMap、filter 等方法使用 Lambda 处理空值，避免 NullPointerException。"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-parchment-soft/30",children:[e.jsx("h3",{className:"font-semibold text-ink mb-2",children:"🔗 CompletableFuture"}),e.jsx("p",{className:"text-[13px] text-ink-muted",children:"异步编程中大量使用 Lambda 表达回调逻辑，实现非阻塞的异步任务链。"})]})]}),e.jsx(t,{type:"tip",title:"学习建议",children:"掌握 Lambda 表达式后，建议深入学习 Stream API，它是 Lambda 最重要的应用场景。同时，理解方法引用可以让你的代码更加简洁优雅。在实际项目中，优先使用方法引用，其次使用 Lambda，最后考虑匿名内部类。"}),e.jsx(l,{...s(a.category,a.id)})]})}),e.jsx(m,{items:p})]})}export{j as default};
