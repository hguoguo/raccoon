import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as r}from"./SideNote-BKvanovA.js";import{C as i,A as d,S as o}from"./ArticleNav-DhfiS38Y.js";import{D as l}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"syntax-basics",text:"一、Java语法基础",level:2},{id:"variables-types",text:"1.1 变量与数据类型",level:3},{id:"operators",text:"1.2 运算符",level:3},{id:"control-flow",text:"1.3 流程控制",level:3},{id:"arrays-strings",text:"1.4 数组与字符串",level:3},{id:"oop-core",text:"二、面向对象（核心）",level:2},{id:"class-object",text:"2.1 类与对象",level:3},{id:"encapsulation",text:"2.2 封装",level:3},{id:"inheritance",text:"2.3 继承",level:3},{id:"polymorphism",text:"2.4 多态",level:3},{id:"interface-abstract",text:"2.5 接口 vs 抽象类",level:3},{id:"overload-override",text:"2.6 重载 vs 重写",level:3},{id:"common-apis",text:"三、常用基础API",level:2},{id:"string-builder",text:"3.1 String / StringBuilder",level:3},{id:"date-time",text:"3.2 Date / LocalDateTime",level:3},{id:"math-random",text:"3.3 Math / Random",level:3},{id:"bigdecimal",text:"3.4 BigDecimal（金融必备）",level:3},{id:"misconceptions",text:"四、常见误区",level:2},{id:"interview",text:"五、面试真题",level:2},{id:"comparison",text:"六、对比总结",level:2},{id:"related",text:"七、知识关联",level:2}];function y({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(a,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Java 是一门",e.jsx("strong",{className:"text-accent",children:"强类型、面向对象、跨平台"}),'的编程语言，通过 JVM（Java虚拟机）实现"一次编写，到处运行"， 以严谨的类型系统、完善的内存管理和丰富的标准库著称，是企业级应用开发的主流选择。']})}),e.jsx(i,{type:"tip",title:"为什么 Java 必须打牢基础？",children:"Java 的面向对象思想和严格的类型系统是理解后续集合框架、并发编程、设计模式的基础。基础不牢会导致代码质量差、难以维护，甚至引发严重的生产事故（如精度丢失、内存泄漏）。"}),e.jsx("h2",{id:"syntax-basics",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、Java语法基础"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Java 语法借鉴了 C/C++，但去除了指针、多重继承等复杂特性，更加简洁安全。掌握基础语法是编写规范 Java 程序的第一步。"}),e.jsx("h3",{id:"variables-types",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.1 变量与数据类型"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java 是",e.jsx("strong",{children:"强类型语言"}),"，所有变量必须先声明类型再使用。数据类型分为基本类型和引用类型两大类。"]}),e.jsx(t,{code:`// 基本数据类型（8种）
int age = 25;                    // 整数（4字节）
long population = 7_800_000_000L; // 长整数（8字节）
double price = 99.99;            // 双精度浮点（8字节）
float temperature = 36.5f;       // 单精度浮点（4字节）
char grade = 'A';                // 字符（2字节，Unicode）
boolean isPassed = true;         // 布尔值
byte status = 1;                 // 字节（1字节）
short year = 2024;               // 短整数（2字节）

// 引用数据类型
String name = "张三";             // 字符串
int[] scores = {90, 85, 92};     // 数组
Object obj = new Object();       // 对象`,language:"java",highlights:[2,3,4,11,12],filename:"VariablesDemo.java",description:"Java 变量与数据类型示例"}),e.jsxs(r,{label:"命名规范",children:["Java 遵循驼峰命名法：变量名首字母小写（",e.jsx("code",{children:"userName"}),"），类名首字母大写（",e.jsx("code",{children:"UserAccount"}),"），常量全大写加下划线（",e.jsx("code",{children:"MAX_SIZE"}),"）。"]}),e.jsxs(i,{type:"warning",title:"浮点数精度陷阱",children:[e.jsx("code",{children:"float"})," 和 ",e.jsx("code",{children:"double"})," 采用 IEEE 754 标准，存在精度丢失问题。",e.jsx("strong",{children:"金融计算严禁使用浮点数"}),"，必须用 ",e.jsx("code",{children:"BigDecimal"}),"（后文详解）。"]}),e.jsx("h3",{id:"operators",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.2 运算符"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Java 支持算术运算符、关系运算符、逻辑运算符、位运算符等。重点掌握自增/自减的前缀和后缀区别。"}),e.jsx(t,{code:`int a = 10, b = 3;

// 算术运算符
System.out.println(a + b);   // 13
System.out.println(a - b);   // 7
System.out.println(a * b);   // 30
System.out.println(a / b);   // 3（整数除法，舍去小数）
System.out.println(a % b);   // 1（取余）

// 自增/自减
int x = 5;
System.out.println(x++);  // 5（先使用后+1）
System.out.println(x);    // 6
System.out.println(++x);  // 7（先+1后使用）

// 三元运算符
int max = (a > b) ? a : b;  // 10`,language:"java",highlights:[7,12,13,14],filename:"OperatorsDemo.java",description:"运算符优先级与执行顺序"}),e.jsx("h3",{id:"control-flow",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.3 流程控制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"流程控制决定程序执行路径，包括条件分支（if/switch）和循环（for/while/do-while）。"}),e.jsx(t,{code:`// if-else 分支
int score = 85;
if (score >= 90) {
    System.out.println("优秀");
} else if (score >= 80) {
    System.out.println("良好");  // 输出此句
} else {
    System.out.println("一般");
}

// switch 分支（JDK 14+ 支持新语法）
String day = "MONDAY";
switch (day) {
    case "MONDAY", "TUESDAY" -> System.out.println("工作日");
    case "SATURDAY", "SUNDAY" -> System.out.println("周末");
    default -> System.out.println("未知");
}

// for 循环
for (int i = 0; i < 5; i++) {
    System.out.print(i + " ");  // 0 1 2 3 4
}

// while 循环
int count = 0;
while (count < 3) {
    System.out.print(count + " ");  // 0 1 2
    count++;
}

// 增强for循环（foreach）
int[] nums = {1, 2, 3};
for (int num : nums) {
    System.out.print(num + " ");  // 1 2 3
}`,language:"java",highlights:[13,21,28,35],filename:"ControlFlowDemo.java",description:"流程控制的多种写法"}),e.jsx(r,{label:"JDK 版本差异",children:"JDK 14 引入了 switch 表达式（箭头语法），比传统 switch-case 更简洁且避免 fall-through 错误。JDK 17 LTS 已稳定支持。"}),e.jsx("h3",{id:"arrays-strings",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1.4 数组与字符串"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"数组是固定长度的同类型元素集合，String 是不可变的字符序列。两者都是 Java 中最常用的数据结构。"}),e.jsx(t,{code:`// 数组声明与初始化
int[] arr1 = new int[5];           // 默认值为0
int[] arr2 = {1, 2, 3, 4, 5};      // 静态初始化
String[] names = new String[]{"Alice", "Bob"};

// 数组访问
System.out.println(arr2[0]);       // 1
System.out.println(arr2.length);   // 5（长度属性，非方法）

// 二维数组
int[][] matrix = {{1, 2}, {3, 4}};
System.out.println(matrix[1][0]);  // 3

// String 不可变性
String s1 = "Hello";
String s2 = s1 + " World";         // 创建新对象
System.out.println(s1);            // Hello（s1未改变）
System.out.println(s1 == s2);      // false（不同对象）

// 常用字符串方法
String text = "  Java Programming  ";
System.out.println(text.trim());           // "Java Programming"
System.out.println(text.toLowerCase());    // "  java programming  "
System.out.println(text.contains("Java")); // true
System.out.println(text.substring(2, 6));  // "Java"`,language:"java",highlights:[2,11,17,23],filename:"ArrayStringDemo.java",description:"数组与字符串的核心操作"}),e.jsxs(i,{type:"danger",title:"数组越界异常",children:["Java 数组访问不做边界检查编译期拦截，运行时越界会抛出 ",e.jsx("code",{children:"ArrayIndexOutOfBoundsException"}),"。务必在循环中确保索引合法。"]}),e.jsx("h2",{id:"oop-core",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、面向对象（核心）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["面向对象（OOP）是 Java 的灵魂，三大特性：",e.jsx("strong",{children:"封装、继承、多态"}),"。理解 OOP 思想才能写出可维护、可扩展的代码。"]}),e.jsx(l,{title:"面向对象三大特性关系图",children:`graph TD
    OOP["OOP"] --- 封装["封装
隐藏细节
保护数据"]
    OOP --- 继承["继承
代码复用
扩展功能"]
    OOP --- 多态["多态
同一接口
不同实现"]

    style OOP fill:#F59E0B,stroke:#F59E0B,color:#92400E
    style 封装 fill:#10B981,stroke:#10B981,color:#065F46
    style 继承 fill:#3B82F6,stroke:#3B82F6,color:#1E40AF
    style 多态 fill:#8B5CF6,stroke:#8B5CF6,color:#5B21B6`}),e.jsx("h3",{id:"class-object",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.1 类与对象"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"类（Class）"}),"是模板，",e.jsx("strong",{children:"对象（Object）"}),"是实例。类定义属性和行为，对象是具体的实体。"]}),e.jsx(t,{code:`// 类的定义
public class Student {
    // 成员变量（属性）
    private String name;
    private int age;
    
    // 构造方法
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // 成员方法（行为）
    public void study() {
        System.out.println(name + "正在学习");
    }
    
    public String getInfo() {
        return name + ", " + age + "岁";
    }
}

// 创建对象
Student stu = new Student("张三", 20);
stu.study();              // 张三正在学习
System.out.println(stu.getInfo());  // 张三, 20岁`,language:"java",highlights:[4,8,14,24,25],filename:"Student.java",description:"类与对象的基本结构"}),e.jsxs(r,{label:"构造方法",children:["构造方法名与类名相同，无返回值。若未显式定义，编译器会自动生成无参构造。一旦定义了有参构造，无参构造需手动添加（否则无法 ",e.jsx("code",{children:"new Student()"}),"）。"]}),e.jsx("h3",{id:"encapsulation",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.2 封装"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"封装是隐藏内部实现细节，仅暴露必要接口。通过访问修饰符控制可见性，保护数据安全。"}),e.jsx(t,{code:`public class BankAccount {
    private double balance;  // 私有属性，外部不可直接访问
    
    // 公共方法提供受控访问
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        } else {
            throw new IllegalArgumentException("存款金额必须大于0");
        }
    }
    
    public double getBalance() {
        return balance;  // 只读，不提供setter
    }
}

BankAccount account = new BankAccount();
account.deposit(1000);
System.out.println(account.getBalance());  // 1000.0
// account.balance = -100;  // ❌ 编译错误：balance是private`,language:"java",highlights:[2,5,13,21],filename:"BankAccount.java",description:"封装保护数据完整性"}),e.jsx(i,{type:"tip",title:"封装的好处",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsx("li",{children:"防止非法数据（如负数余额）"}),e.jsx("li",{children:"内部实现可修改而不影响调用方"}),e.jsx("li",{children:"便于添加日志、验证等横切逻辑"})]})}),e.jsx("h3",{id:"inheritance",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.3 继承"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:'继承允许子类复用父类的属性和方法，建立"is-a"关系。Java 支持单继承（一个类只能有一个直接父类），但可通过接口实现多重继承效果。'}),e.jsx(t,{code:`// 父类
public class Animal {
    protected String name;
    
    public void eat() {
        System.out.println(name + "正在吃东西");
    }
}

// 子类
public class Dog extends Animal {
    public void bark() {
        System.out.println(name + "汪汪叫");
    }
}

Dog dog = new Dog();
dog.name = "旺财";
dog.eat();   // 旺财正在吃东西（继承自Animal）
dog.bark();  // 旺财汪汪叫（自有方法）`,language:"java",highlights:[2,11,18,19],filename:"InheritanceDemo.java",description:"继承实现代码复用"}),e.jsxs(r,{label:"super关键字",children:[e.jsx("code",{children:"super"})," 用于调用父类构造方法或被子类重写的方法。例如 ",e.jsx("code",{children:"super()"})," 调用父类无参构造，必须在子类构造第一行。"]}),e.jsx("h3",{id:"polymorphism",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.4 多态"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["多态指同一行为在不同对象上有不同表现。实现条件：",e.jsx("strong",{children:"继承 + 方法重写 + 父类引用指向子类对象"}),"。"]}),e.jsx(t,{code:`public class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println(name + "吃鱼");
    }
}

// 多态体现
Animal animal1 = new Dog();
Animal animal2 = new Cat();

animal1.name = "旺财";
animal2.name = "咪咪";

animal1.eat();  // 旺财正在吃东西（实际调用Dog继承的方法）
animal2.eat();  // 咪咪吃鱼（实际调用Cat重写的方法）

// 编译时类型是Animal，运行时根据实际对象决定调用哪个方法`,language:"java",highlights:[2,9,10,15,16],filename:"PolymorphismDemo.java",description:"多态实现运行时动态绑定"}),e.jsxs(i,{type:"warning",title:"多态的限制",children:["父类引用只能调用父类中声明的方法。若想调用子类特有方法，需强制类型转换：",e.jsx("code",{children:"((Dog) animal1).bark()"}),"，但需注意 ",e.jsx("code",{children:"ClassCastException"})," 风险。"]}),e.jsx("h3",{id:"interface-abstract",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.5 接口 vs 抽象类"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["接口和抽象类都用于定义抽象，但设计理念不同：",e.jsx("strong",{children:'接口定义"能做什么"（能力），抽象类定义"是什么"（身份）'}),"。"]}),e.jsx(t,{code:`// 接口：定义能力
public interface Flyable {
    void fly();  // 抽象方法（JDK8前只能是抽象方法）
    
    default void land() {  // JDK8+ 默认方法
        System.out.println("着陆");
    }
}

// 抽象类：定义共同特征
public abstract class Bird {
    protected String name;
    
    public abstract void sing();  // 抽象方法
    
    public void breathe() {  // 具体方法
        System.out.println(name + "呼吸");
    }
}

// 实现
public class Eagle extends Bird implements Flyable {
    public Eagle(String name) {
        this.name = name;
    }
    
    @Override
    public void sing() {
        System.out.println(name + "鸣叫");
    }
    
    @Override
    public void fly() {
        System.out.println(name + "翱翔天空");
    }
}

Eagle eagle = new Eagle("金雕");
eagle.sing();    // 金雕鸣叫
eagle.fly();     // 金雕翱翔天空
eagle.land();    // 着陆
eagle.breathe(); // 金雕呼吸`,language:"java",highlights:[2,11,22,28,33],filename:"InterfaceAbstractDemo.java",description:"接口与抽象类的综合应用"}),e.jsx(l,{title:"接口 vs 抽象类选择决策树",children:`graph TD
    Q["需要定义什么？"] -->|"能力/行为"| I["使用接口"]
    Q -->|"共同特征"| A["使用抽象类"]

    style Q fill:#F59E0B,stroke:#F59E0B,color:#92400E
    style I fill:#10B981,stroke:#10B981,color:#065F46
    style A fill:#3B82F6,stroke:#3B82F6,color:#1E40AF`}),e.jsx("h3",{id:"overload-override",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.6 重载 vs 重写"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"重载（Overload）和重写（Override）都是多态的体现，但发生场景和规则完全不同。"}),e.jsx(t,{code:`public class Calculator {
    // 重载：同名方法，参数列表不同（编译时多态）
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
}

public class Parent {
    public void greet() {
        System.out.println("Parent says hello");
    }
}

public class Child extends Parent {
    // 重写：子类覆盖父类方法（运行时多态）
    @Override
    public void greet() {
        System.out.println("Child says hi");
    }
}

Calculator calc = new Calculator();
System.out.println(calc.add(1, 2));       // 3（调用int版本）
System.out.println(calc.add(1.5, 2.5));   // 4.0（调用double版本）

Parent obj = new Child();
obj.greet();  // Child says hi（运行时调用Child的重写方法）`,language:"java",highlights:[3,7,11,24,31,32,35],filename:"OverloadOverrideDemo.java",description:"重载与重写的对比演示"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"对比项"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"重载（Overload）"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"重写（Override）"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"发生范围"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"同一个类"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"父子类之间"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"方法签名"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"方法名相同，参数列表不同"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"方法名、参数列表完全相同"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"返回类型"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"可以不同"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"必须相同或是其子类"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"访问修饰符"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"可以不同"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"不能更严格（可以更宽松）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"多态类型"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"编译时多态"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"运行时多态"})]})]})]}),e.jsx("h2",{id:"common-apis",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、常用基础API"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Java 标准库提供了丰富的工具类，熟练掌握这些 API 能大幅提升开发效率。"}),e.jsx("h3",{id:"string-builder",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 String / StringBuilder"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{children:"String"})," 是不可变对象，每次拼接都会创建新对象；",e.jsx("code",{children:"StringBuilder"})," 是可变的，适合频繁拼接场景。"]}),e.jsx(t,{code:`// String 不可变性导致的性能问题
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;  // ❌ 每次循环创建新String对象，共1000个对象
}

// StringBuilder 高效拼接
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);  // ✅ 在同一个对象上追加，无额外对象创建
}
String result2 = sb.toString();

// 常用方法对比
String str = "Hello World";
System.out.println(str.length());           // 11
System.out.println(str.charAt(0));          // H
System.out.println(str.indexOf("World"));   // 6
System.out.println(str.replace("World", "Java"));  // Hello Java

StringBuilder sb2 = new StringBuilder("Hello");
sb2.append(" World");
sb2.insert(5, ",");
sb2.reverse();
System.out.println(sb2);  // dlroW ,olleH`,language:"java",highlights:[3,9,12,22],filename:"StringVsBuilder.java",description:"String 与 StringBuilder 性能对比"}),e.jsxs(i,{type:"danger",title:"字符串拼接陷阱",children:["在循环中拼接字符串",e.jsxs("strong",{children:["严禁使用 ",e.jsx("code",{children:"+"})]}),"，应使用 ",e.jsx("code",{children:"StringBuilder"}),"。对于少量拼接（如3次以内），编译器会自动优化为 ",e.jsx("code",{children:"StringBuilder"}),"，无需担心。"]}),e.jsx("h3",{id:"date-time",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 Date / LocalDateTime"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["JDK 8 引入的 ",e.jsx("code",{children:"java.time"})," 包取代了旧的 ",e.jsx("code",{children:"Date"})," 和 ",e.jsx("code",{children:"Calendar"}),"，提供了线程安全、易用的日期时间 API。"]}),e.jsx(t,{code:`import java.time.*;
import java.time.format.DateTimeFormatter;

// 旧API（不推荐）
Date oldDate = new Date();  // ❌ 可变、线程不安全

// 新API（推荐）
LocalDateTime now = LocalDateTime.now();
System.out.println(now);  // 2024-01-15T10:30:45.123

LocalDate today = LocalDate.now();
System.out.println(today);  // 2024-01-15

LocalTime currentTime = LocalTime.now();
System.out.println(currentTime);  // 10:30:45.123

// 格式化
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formatted = now.format(formatter);
System.out.println(formatted);  // 2024-01-15 10:30:45

// 解析
LocalDateTime parsed = LocalDateTime.parse("2024-01-15 10:30:45", formatter);

// 日期计算
LocalDateTime tomorrow = now.plusDays(1);
LocalDateTime lastWeek = now.minusWeeks(1);
Period period = Period.between(LocalDate.now(), LocalDate.of(2025, 1, 1));
System.out.println(period.getDays() + "天");`,language:"java",highlights:[5,8,11,18,26,27],filename:"DateTimeDemo.java",description:"新旧日期API对比"}),e.jsxs(r,{label:"为什么废弃 Date？",children:[e.jsx("code",{children:"Date"})," 类设计缺陷多：月份从0开始、年份从1900开始、线程不安全、时区处理混乱。JDK 8 的 ",e.jsx("code",{children:"java.time"})," 包参考了 Joda-Time，是不可变、线程安全的现代化设计。"]}),e.jsx("h3",{id:"math-random",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.3 Math / Random"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{children:"Math"})," 提供数学运算工具，",e.jsx("code",{children:"Random"})," 生成伪随机数。JDK 17 还引入了 ",e.jsx("code",{children:"RandomGenerator"})," 新接口。"]}),e.jsx(t,{code:`// Math 常用方法
System.out.println(Math.abs(-10));        // 10
System.out.println(Math.max(5, 8));       // 8
System.out.println(Math.min(5, 8));       // 5
System.out.println(Math.pow(2, 10));      // 1024.0
System.out.println(Math.sqrt(16));        // 4.0
System.out.println(Math.round(3.6));      // 4
System.out.println(Math.ceil(3.2));       // 4.0
System.out.println(Math.floor(3.8));      // 3.0

// Random 生成随机数
import java.util.Random;
Random random = new Random();
System.out.println(random.nextInt(100));    // 0-99的随机整数
System.out.println(random.nextDouble());    // 0.0-1.0的随机小数
System.out.println(random.nextBoolean());   // true或false

// 指定范围的随机数
int min = 10, max = 50;
int randomNum = random.nextInt(max - min + 1) + min;  // 10-50

// ThreadLocalRandom（高并发场景推荐）
import java.util.concurrent.ThreadLocalRandom;
int concurrentRandom = ThreadLocalRandom.current().nextInt(100);`,language:"java",highlights:[2,13,20,23],filename:"MathRandomDemo.java",description:"数学运算与随机数生成"}),e.jsx("h3",{id:"bigdecimal",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.4 BigDecimal（金融必备）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{children:"BigDecimal"})," 提供任意精度的十进制运算，",e.jsx("strong",{children:"金融、风控等对精度要求极高的场景必须使用"}),"，严禁使用 ",e.jsx("code",{children:"float/double"}),"。"]}),e.jsx(t,{code:`import java.math.BigDecimal;
import java.math.RoundingMode;

// ❌ 浮点数精度丢失
double d1 = 0.1 + 0.2;
System.out.println(d1);  // 0.30000000000000004（错误！）

// ✅ BigDecimal 精确计算
BigDecimal bd1 = new BigDecimal("0.1");
BigDecimal bd2 = new BigDecimal("0.2");
BigDecimal result = bd1.add(bd2);
System.out.println(result);  // 0.3（正确）

// 必须用String构造，不能用double
BigDecimal wrong = new BigDecimal(0.1);  // ❌ 仍有精度问题
BigDecimal right = new BigDecimal("0.1"); // ✅ 精确

// 常用运算
BigDecimal price = new BigDecimal("99.99");
BigDecimal quantity = new BigDecimal("3");
BigDecimal total = price.multiply(quantity);
System.out.println(total);  // 299.97

// 除法需指定精度和舍入模式
BigDecimal division = new BigDecimal("10").divide(
    new BigDecimal("3"), 
    2,  // 保留2位小数
    RoundingMode.HALF_UP  // 四舍五入
);
System.out.println(division);  // 3.33

// 比较大小
BigDecimal a = new BigDecimal("1.00");
BigDecimal b = new BigDecimal("1.0");
System.out.println(a.compareTo(b));  // 0（相等）
System.out.println(a.equals(b));     // false（精度不同）`,language:"java",highlights:[5,9,15,16,21,25,34,35],filename:"BigDecimalDemo.java",description:"BigDecimal 精确计算示例"}),e.jsx(i,{type:"danger",title:"BigDecimal 构造陷阱",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"必须用 String 构造"}),"：",e.jsx("code",{children:'new BigDecimal("0.1")'})," ✅，",e.jsx("code",{children:"new BigDecimal(0.1)"})," ❌"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"除法必须指定精度"}),"：否则可能抛出 ",e.jsx("code",{children:"ArithmeticException"}),"（无限循环小数）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"比较用 compareTo"}),"：",e.jsx("code",{children:"equals"})," 会比较精度（",e.jsx("code",{children:"1.00 ≠ 1.0"}),"）"]})]})}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、常见误区"}),e.jsxs(i,{type:"danger",title:"误区1：== 比较字符串内容",children:[e.jsx("p",{className:"mt-2",children:e.jsx("code",{children:'String s1 = "hello"; String s2 = new String("hello");'})}),e.jsxs("p",{children:[e.jsx("code",{children:"s1 == s2"})," 返回 ",e.jsx("code",{children:"false"}),"，因为 ",e.jsx("code",{children:"=="})," 比较的是对象引用地址，而非内容。应使用 ",e.jsx("code",{children:"s1.equals(s2)"}),"。"]}),e.jsxs("p",{className:"mt-2 text-sm text-ink-faded",children:["例外：字符串常量池中的字面量（如 ",e.jsx("code",{children:'"hello" == "hello"'}),"）可能返回 true，但这不可靠。"]})]}),e.jsxs(i,{type:"danger",title:"误区2：认为 float/double 能精确表示小数",children:[e.jsxs("p",{className:"mt-2",children:["IEEE 754 浮点数无法精确表示 0.1、0.2 等十进制小数，导致 ",e.jsx("code",{children:"0.1 + 0.2 != 0.3"}),"。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"金融计算必须用 BigDecimal"}),"，科学计算可用 ",e.jsx("code",{children:"double"})," 但需注意误差累积。"]})]}),e.jsxs(i,{type:"danger",title:"误区3：混淆重载和重写",children:[e.jsxs("p",{className:"mt-2",children:["重载发生在",e.jsx("strong",{children:"编译期"}),"（根据参数类型决定调用哪个方法），重写发生在",e.jsx("strong",{children:"运行期"}),"（根据实际对象类型决定）。"]}),e.jsx("p",{children:"重载看参数列表，重写看方法签名（方法名+参数）是否完全一致。"})]}),e.jsxs(i,{type:"danger",title:"误区4：认为接口不能有方法实现",children:[e.jsxs("p",{className:"mt-2",children:["JDK 8 起接口可以有 ",e.jsx("code",{children:"default"})," 方法和 ",e.jsx("code",{children:"static"})," 方法，JDK 9 还可以有 ",e.jsx("code",{children:"private"})," 方法。"]}),e.jsxs("p",{children:["但接口仍不能有实例字段（只能有 ",e.jsx("code",{children:"public static final"})," 常量）和构造方法。"]})]}),e.jsxs(i,{type:"danger",title:"误区5：忽视 String 不可变性带来的性能问题",children:[e.jsxs("p",{className:"mt-2",children:["在循环中用 ",e.jsx("code",{children:"+"})," 拼接字符串会创建大量临时对象，导致 GC 压力。"]}),e.jsxs("p",{children:["应使用 ",e.jsx("code",{children:"StringBuilder"}),"（单线程）或 ",e.jsx("code",{children:"StringBuffer"}),"（多线程）。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、面试真题"}),e.jsx(m,{questions:[{question:"Java 中 == 和 equals 的区别是什么？",answer:"== 比较的是对象引用地址（基本类型比较值），equals 比较的是对象内容。String 类重写了 equals 方法比较字符序列，但默认 Object.equals 也是用 == 比较地址。自定义类应根据业务需求重写 equals（通常同时重写 hashCode）。"},{question:"为什么 String 要设计成不可变的？",answer:"① 安全性：防止字符串内容被篡改（如数据库连接URL、文件路径）；② 线程安全：不可变对象天然线程安全；③ 缓存哈希码：String 频繁用作 HashMap 键，不可变性保证 hashCode 不变；④ 字符串常量池：不可变才能实现共享，节省内存。"},{question:"接口和抽象类有什么区别？如何选择？",answer:"区别：① 抽象类可以有构造方法、实例字段、具体方法，接口只能有常量、抽象方法、default/static方法；② 类只能单继承抽象类，但可实现多个接口；③ 抽象类定义 is-a 关系（是什么），接口定义 can-do 关系（能做什么）。选择：若多个类有共同状态和行为，用抽象类；若只需定义能力契约，用接口。"},{question:"重载和重写的区别？",answer:"重载：同类中方法名相同、参数列表不同，编译时多态，返回类型可以不同。重写：父子类中方法签名完全相同，运行时多态，返回类型必须相同或是其子类，访问修饰符不能更严格。重载看参数，重写看继承。"},{question:"为什么金融计算要用 BigDecimal 而不用 double？",answer:"double 采用 IEEE 754 浮点数标准，无法精确表示某些十进制小数（如0.1），导致精度丢失（0.1+0.2=0.30000000000000004）。BigDecimal 基于十进制运算，可精确表示任意精度的小数，适合金融场景。注意：必须用 String 构造 BigDecimal，用 double 构造仍有精度问题。"},{question:"String、StringBuilder、StringBuffer 的区别？",answer:"String：不可变，每次修改创建新对象，线程安全但性能差。StringBuilder：可变，非线程安全，性能最好，适合单线程频繁拼接。StringBuffer：可变，线程安全（方法加 synchronized），性能略低于 StringBuilder，适合多线程场景。大部分场景用 StringBuilder 即可。"},{question:"JDK 8 的 LocalDateTime 相比 Date 有什么优势？",answer:"① 不可变且线程安全（Date 可变且线程不安全）；② API 设计清晰（LocalDate、LocalTime、LocalDateTime 分离）；③ 时区处理完善（ZonedDateTime）；④ 日期计算方便（plusDays、minusWeeks等）；⑤ 格式化/解析统一用 DateTimeFormatter（SimpleDateFormat 线程不安全）。"}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、对比总结"}),e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse my-5",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"知识点"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"核心要点"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"注意事项"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"数据类型"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"8种基本类型 + 引用类型"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"浮点数精度问题，金融用 BigDecimal"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"封装"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"private 字段 + getter/setter"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"防止非法数据，保护内部状态"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"继承"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"extends 单继承，代码复用"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"避免过深继承层次（≤3层）"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"多态"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"父类引用指向子类对象"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"编译时类型 vs 运行时类型"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"接口 vs 抽象类"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"接口=能力，抽象类=身份"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"优先用接口，需要共享状态用抽象类"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"String vs StringBuilder"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"不可变 vs 可变"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"循环拼接用 StringBuilder"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"Date vs LocalDateTime"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"旧API vs 新API"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"新项目一律用 java.time 包"})]})]})]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 my-5",children:[e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-5",children:[e.jsx("div",{className:"font-sans font-semibold text-xs text-ink-faded uppercase tracking-[0.06em] mb-2",children:"前置知识"}),e.jsx("p",{className:"text-[14px] text-ink-muted",children:"无（这是 Java 入门第一篇）"})]}),e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-5",children:[e.jsx("div",{className:"font-sans font-semibold text-xs text-ink-faded uppercase tracking-[0.06em] mb-2",children:"延伸学习"}),e.jsxs("ul",{className:"text-[14px] text-ink-muted space-y-1",children:[e.jsx("li",{children:"• Java 集合框架（ArrayList、HashMap）"}),e.jsx("li",{children:"• Java 并发编程（Thread、锁机制）"}),e.jsx("li",{children:"• JVM 内存模型与垃圾回收"}),e.jsx("li",{children:"• 设计模式（单例、工厂、观察者）"})]})]})]}),e.jsxs(i,{type:"tip",title:"下一步学习建议",children:["掌握 Java 基础后，建议按以下顺序深入学习：",e.jsxs("ol",{className:"list-decimal list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"集合框架"}),"：ArrayList、HashMap、ConcurrentHashMap 源码分析"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"并发编程"}),"：线程、锁、线程池、JUC 包"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"JVM"}),"：内存模型、GC 算法、性能调优"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"框架"}),"：Spring Boot、MyBatis 等企业级框架"]})]})]}),e.jsx(d,{...n(s.category,s.id)})]})}),e.jsx(o,{items:c})]})}export{y as default};
