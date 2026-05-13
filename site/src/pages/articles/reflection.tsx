import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import InteractiveFlow from '../../components/knowledge/InteractiveFlow'
import SideNote from '../../components/knowledge/SideNote'
import ContextSwitcher from '../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../components/knowledge/SmartTOC'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、反射机制概述', level: 2 },
  { id: 'core-classes', text: '二、核心类与API', level: 2 },
  { id: 'class-object', text: '2.1 Class对象获取', level: 3 },
  { id: 'reflection-api', text: '2.2 常用反射API', level: 3 },
  { id: 'field-access', text: '三、字段访问', level: 2 },
  { id: 'method-invoke', text: '四、方法调用', level: 2 },
  { id: 'constructor-create', text: '五、构造器与对象创建', level: 2 },
  { id: 'annotation-reflection', text: '六、注解与反射', level: 2 },
  { id: 'dynamic-proxy', text: '七、动态代理', level: 2 },
  { id: 'performance', text: '八、性能分析与优化', level: 2 },
  { id: 'security', text: '九、安全性与访问控制', level: 2 },
  { id: 'use-cases', text: '十、典型应用场景', level: 2 },
  { id: 'misconceptions', text: '十一、常见误区', level: 2 },
  { id: 'interview', text: '十二、面试真题', level: 2 },
  { id: 'related', text: '十三、知识关联', level: 2 },
]

export default function Reflection({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              反射是 Java 在<strong className="text-accent">运行时</strong>动态获取类的信息（字段、方法、构造器、注解等）并操作对象的能力，它打破了编译时类型检查的限制，是 Spring IOC、MyBatis、JUnit 等框架的核心技术基础。
            </p>
          </blockquote>

          {/* ========== 一、反射机制概述 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、反射机制概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 反射机制允许程序在运行期间检查和操作任意类，包括私有成员。这种能力使得框架可以在不知道具体类型的情况下创建对象、调用方法、读取字段，实现了高度的灵活性和解耦。
          </p>

          <DiagramBlock title="反射机制工作原理">
            <svg className="w-full max-w-[500px] mx-auto block" viewBox="0 0 500 280">
              <rect x="20" y="10" width="120" height="50" rx="6" fill="#ede4d1" stroke="#b5651d" strokeWidth="2"/>
              <text x="80" y="40" fill="#6b5e4c" fontSize="11" fontFamily="monospace" textAnchor="middle">源代码.java</text>
              
              <line x1="140" y1="35" x2="170" y2="35" stroke="#a99d8e" strokeWidth="2"/>
              <polygon points="170,30 180,35 170,40" fill="#a99d8e"/>
              
              <rect x="180" y="10" width="120" height="50" rx="6" fill="#ede4d1" stroke="#b5651d" strokeWidth="2"/>
              <text x="240" y="40" fill="#6b5e4c" fontSize="11" fontFamily="monospace" textAnchor="middle">编译</text>
              
              <line x1="300" y1="35" x2="330" y2="35" stroke="#a99d8e" strokeWidth="2"/>
              <polygon points="330,30 340,35 330,40" fill="#a99d8e"/>
              
              <rect x="340" y="10" width="120" height="50" rx="6" fill="#f5f0e8" stroke="#b5651d" strokeWidth="2"/>
              <text x="400" y="40" fill="#6b5e4c" fontSize="11" fontFamily="monospace" textAnchor="middle">字节码.class</text>
              
              <rect x="20" y="100" width="120" height="50" rx="6" fill="rgba(181,101,29,0.15)" stroke="#b5651d" strokeWidth="2"/>
              <text x="80" y="130" fill="#8b4c14" fontSize="11" fontFamily="monospace" textAnchor="middle">JVM加载</text>
              
              <line x1="400" y1="60" x2="400" y2="90" stroke="#a99d8e" strokeWidth="2"/>
              <polygon points="395,90 400,100 405,90" fill="#a99d8e"/>
              
              <rect x="340" y="100" width="120" height="50" rx="6" fill="rgba(181,101,29,0.15)" stroke="#b5651d" strokeWidth="2"/>
              <text x="400" y="130" fill="#8b4c14" fontSize="11" fontFamily="monospace" textAnchor="middle">Class对象</text>
              
              <line x1="340" y1="150" x2="200" y2="190" stroke="#b5651d" strokeWidth="2"/>
              <line x1="400" y1="150" x2="400" y2="190" stroke="#b5651d" strokeWidth="2"/>
              <line x1="460" y1="150" x2="340" y2="190" stroke="#b5651d" strokeWidth="2"/>
              
              <rect x="140" y="190" width="80" height="40" rx="4" fill="rgba(160,82,45,0.12)" stroke="#a0522d"/>
              <text x="180" y="215" fill="#a0522d" fontSize="10" fontFamily="monospace" textAnchor="middle">Field</text>
              
              <rect x="360" y="190" width="80" height="40" rx="4" fill="rgba(160,82,45,0.12)" stroke="#a0522d"/>
              <text x="400" y="215" fill="#a0522d" fontSize="10" fontFamily="monospace" textAnchor="middle">Method</text>
              
              <rect x="250" y="230" width="80" height="40" rx="4" fill="rgba(160,82,45,0.12)" stroke="#a0522d"/>
              <text x="290" y="255" fill="#a0522d" fontSize="10" fontFamily="monospace" textAnchor="middle">Constructor</text>
              
              <text x="250" y="280" fill="#8a7d6b" fontSize="9" fontFamily="monospace" textAnchor="middle">运行时通过Class对象访问类的所有成员</text>
            </svg>
          </DiagramBlock>

          <Callout type="tip" title="核心要点">
            反射的本质是<strong className="text-ink-light font-semibold">将类的元数据封装为对象</strong>（Class、Field、Method、Constructor），
            使得程序可以在运行时动态地检查和操作这些元数据。这是 Java "一次编译，到处运行"特性的基础。
          </Callout>

          {/* ========== 二、核心类与API ========== */}
          <h2 id="core-classes" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、核心类与API
          </h2>

          <h3 id="class-object" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 Class对象获取
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            每个类在 JVM 中都有且仅有一个对应的 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Class&lt;T&gt;</code> 对象，它是反射的入口。获取 Class 对象有三种方式：
          </p>

          <Playground language="java" filename="GetClassExample.java" description="获取Class对象的三种方式" highlights={[3, 7, 11]}
            code={`// 方式1：通过类名.class（编译时已知类型，最常用）
Class<String> clazz1 = String.class;

// 方式2：通过对象.getClass()（运行时动态获取）
String str = "hello";
Class<? extends String> clazz2 = str.getClass();

// 方式3：通过Class.forName()（根据完整类名加载，支持动态加载）
Class<?> clazz3 = Class.forName("java.lang.String");

// 验证：三种方式获取的是同一个Class对象
System.out.println(clazz1 == clazz2); // true
System.out.println(clazz2 == clazz3); // true`}
          />

          <SideNote label="ClassLoader的作用">
            Class.forName() 内部会调用类加载器（ClassLoader）来加载类。如果类尚未加载，会触发类的初始化（执行静态代码块）。而 .class 和 .getClass() 不会触发初始化。
          </SideNote>

          <h3 id="reflection-api" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 常用反射API
          </h3>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">方法</th>
                  <th className="text-left py-2.5 px-3 text-accent font-semibold">功能</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">返回值</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">getDeclaredFields()</td><td className="py-2.5 px-3">获取所有声明的字段（含私有）</td><td className="py-2.5 px-3 font-mono text-[11px]">Field[]</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">getFields()</td><td className="py-2.5 px-3">获取所有公共字段（含继承）</td><td className="py-2.5 px-3 font-mono text-[11px]">Field[]</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">getDeclaredMethods()</td><td className="py-2.5 px-3">获取所有声明的方法（含私有）</td><td className="py-2.5 px-3 font-mono text-[11px]">Method[]</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">getMethods()</td><td className="py-2.5 px-3">获取所有公共方法（含继承）</td><td className="py-2.5 px-3 font-mono text-[11px]">Method[]</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">getDeclaredConstructors()</td><td className="py-2.5 px-3">获取所有声明的构造器</td><td className="py-2.5 px-3 font-mono text-[11px]">Constructor&lt;?&gt;[]</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">newInstance()</td><td className="py-2.5 px-3">创建对象实例（已废弃）</td><td className="py-2.5 px-3 font-mono text-[11px]">T</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-[11px]">getConstructor().newInstance()</td><td className="py-2.5 px-3">通过构造器创建对象（推荐）</td><td className="py-2.5 px-3 font-mono text-[11px]">T</td></tr>
              </tbody>
            </table>
          </div>

          <Callout type="warning" title="getDeclaredXxx vs getXxx">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">getDeclaredXxx()</code> 返回当前类<strong className="text-ink-light font-semibold">声明</strong>的所有成员（包括 private），但不包含继承的成员；
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">getXxx()</code> 返回所有<strong className="text-ink-light font-semibold">public</strong>成员（包括从父类和接口继承的），但不包含 private 成员。
          </Callout>

          {/* ========== 三、字段访问 ========== */}
          <h2 id="field-access" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、字段访问
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            通过反射可以读取和修改对象的字段值，即使是私有字段。这需要先获取 Field 对象，然后调用 get/set 方法。
          </p>

          <Playground language="java" filename="FieldAccessExample.java" description="反射访问字段" highlights={[8, 12, 16, 20]}
            code={`public class Person {
    private String name;
    public int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// 使用反射访问字段
Person person = new Person("张三", 25);
Class<?> clazz = person.getClass();

// 访问公有字段（无需设置访问权限）
Field ageField = clazz.getField("age");
System.out.println(ageField.get(person)); // 25
ageField.set(person, 26);

// 访问私有字段（需要设置可访问）
Field nameField = clazz.getDeclaredField("name");
nameField.setAccessible(true); // 突破访问控制
System.out.println(nameField.get(person)); // 张三
nameField.set(person, "李四");`}
          />

          <SideNote label="setAccessible(true)">
            默认情况下，反射无法访问私有成员。调用 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">setAccessible(true)</code> 可以绕过 Java 的访问控制检查，但这会破坏封装性，应谨慎使用。
            JDK 9+ 引入了模块系统，对反射访问进行了更严格的限制。
          </SideNote>

          {/* ========== 四、方法调用 ========== */}
          <h2 id="method-invoke" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、方法调用
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            反射调用方法需要先获取 Method 对象，然后通过 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">invoke()</code> 方法执行。对于重载方法，需要指定参数类型来区分。
          </p>

          <Playground language="java" filename="MethodInvokeExample.java" description="反射调用方法" highlights={[10, 14, 18, 22]}
            code={`public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public String greet(String name) {
        return "Hello, " + name;
    }
    
    private void secret() {
        System.out.println("这是私有方法");
    }
}

Calculator calc = new Calculator();
Class<?> clazz = calc.getClass();

// 调用公有方法
Method addMethod = clazz.getMethod("add", int.class, int.class);
Object result = addMethod.invoke(calc, 3, 5); // 8

// 调用带参数的方法
Method greetMethod = clazz.getMethod("greet", String.class);
String greeting = (String) greetMethod.invoke(calc, "World"); // "Hello, World"

// 调用私有方法
Method secretMethod = clazz.getDeclaredMethod("secret");
secretMethod.setAccessible(true);
secretMethod.invoke(calc); // "这是私有方法"`}
          />

          <Callout type="danger" title="性能开销">
            反射调用方法比直接调用慢约<strong className="text-red-700">10-50倍</strong>，因为需要进行安全检查、参数验证和方法查找。频繁调用的场景应缓存 Method 对象，或使用 MethodHandle（JDK 7+）提升性能。
          </Callout>

          {/* ========== 五、构造器与对象创建 ========== */}
          <h2 id="constructor-create" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、构造器与对象创建
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            反射可以动态创建对象实例，即使构造函数是私有的。这在依赖注入框架（如 Spring）中被广泛使用。
          </p>

          <Playground language="java" filename="ConstructorExample.java" description="通过反射创建对象" highlights={[7, 11, 15]}
            code={`public class UserService {
    private String config;
    
    private UserService(String config) {
        this.config = config;
    }
}

// 方式1：无参构造（已废弃，不推荐）
Class<?> clazz = Class.forName("UserService");
UserService service1 = (UserService) clazz.newInstance(); // Deprecated

// 方式2：通过Constructor创建（推荐）
Constructor<?> constructor = clazz.getDeclaredConstructor(String.class);
constructor.setAccessible(true); // 访问私有构造器
UserService service2 = (UserService) constructor.newInstance("production");`}
          />

          <SideNote label="为什么clazz.newInstance()被废弃？">
            JDK 9 废弃了 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Class.newInstance()</code>，因为它只能调用无参构造器，且会将构造器抛出的异常包装为 InvocationTargetException，掩盖了真实异常。推荐使用 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Constructor.newInstance()</code>。
          </SideNote>

          {/* ========== 六、注解与反射 ========== */}
          <h2 id="annotation-reflection" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、注解与反射
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            注解本身没有逻辑，需要通过反射在运行时读取注解信息并执行相应操作。这是 Spring、JUnit 等框架实现声明式编程的基础。
          </p>

          <Playground language="java" filename="AnnotationReflectionExample.java" description="通过反射读取注解" highlights={[5, 10, 15, 20]}
            code={`@Retention(RetentionPolicy.RUNTIME) // 必须在运行时可见
@Target(ElementType.METHOD)
@interface MyTest {
    String value() default "";
}

public class TestService {
    @MyTest("测试用例1")
    public void testCase1() {
        System.out.println("执行测试1");
    }
    
    @MyTest("测试用例2")
    public void testCase2() {
        System.out.println("执行测试2");
    }
}

// 通过反射读取注解并执行
Class<?> clazz = TestService.class;
for (Method method : clazz.getDeclaredMethods()) {
    if (method.isAnnotationPresent(MyTest.class)) {
        MyTest annotation = method.getAnnotation(MyTest.class);
        System.out.println("执行: " + annotation.value());
        method.invoke(clazz.getDeclaredConstructor().newInstance());
    }
}`}
          />

          <Callout type="tip" title="注解保留策略">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@Retention(RetentionPolicy.RUNTIME)</code> 表示注解在运行时可通过反射读取；
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">CLASS</code> 表示注解保留在 class 文件中但运行时不可见；
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">SOURCE</code> 表示注解仅在源码阶段有效。只有 RUNTIME 级别的注解才能通过反射读取。
          </Callout>

          {/* ========== 七、动态代理 ========== */}
          <h2 id="dynamic-proxy" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、动态代理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            动态代理是反射的重要应用场景，它允许在运行时创建接口的代理对象，拦截方法调用并添加额外逻辑（如日志、事务、权限检查）。Spring AOP 就是基于动态代理实现的。
          </p>

          <Playground language="java" filename="DynamicProxyExample.java" description="JDK动态代理示例" highlights={[12, 16, 20, 25]}
            code={`import java.lang.reflect.*;

interface UserService {
    void saveUser(String name);
    void deleteUser(int id);
}

class UserServiceImpl implements UserService {
    public void saveUser(String name) {
        System.out.println("保存用户: " + name);
    }
    public void deleteUser(int id) {
        System.out.println("删除用户: " + id);
    }
}

// 创建代理对象
UserService target = new UserServiceImpl();
UserService proxy = (UserService) Proxy.newProxyInstance(
    target.getClass().getClassLoader(),
    target.getClass().getInterfaces(),
    new InvocationHandler() {
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            System.out.println("[前置处理] 调用方法: " + method.getName());
            Object result = method.invoke(target, args); // 调用目标方法
            System.out.println("[后置处理] 方法执行完成");
            return result;
        }
    }
);

proxy.saveUser("张三");
// 输出:
// [前置处理] 调用方法: saveUser
// 保存用户: 张三
// [后置处理] 方法执行完成`}
          />

          <SideNote label="JDK动态代理 vs CGLIB">
            JDK 动态代理只能代理<strong className="text-ink-light font-semibold">接口</strong>，底层使用反射；CGLIB 可以代理<strong className="text-ink-light font-semibold">类</strong>，通过生成子类实现，性能更高但无法代理 final 类或方法。Spring 会根据目标对象是否实现接口自动选择代理方式。
          </SideNote>

          {/* ========== 八、性能分析与优化 ========== */}
          <h2 id="performance" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、性能分析与优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            反射的性能开销主要来自三个方面：<strong className="text-ink-light font-semibold">安全检查</strong>、<strong className="text-ink-light font-semibold">方法查找</strong>和<strong className="text-ink-light font-semibold">参数装箱/拆箱</strong>。以下是常见的优化策略：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-green-700 font-sans mb-3">✅ 优化策略</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>缓存 Class/Method/Field 对象</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>使用 setAccessible(true) 跳过访问检查</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>使用 MethodHandle（JDK 7+）替代反射</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>避免在循环中重复获取反射对象</span></li>
              </ul>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-red-700 font-sans mb-3">❌ 性能陷阱</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要在高频调用路径中使用反射</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>避免每次都调用 getMethod/getField</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要忽略 SecurityManager 的影响</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>慎用可变参数导致的数组创建</span></li>
              </ul>
            </div>
          </div>

          <Playground language="java" filename="PerformanceOptimization.java" description="反射性能优化示例" highlights={[5, 10, 15]}
            code={`// ❌ 低效写法：每次循环都获取Method对象
for (int i = 0; i < 10000; i++) {
    Method method = obj.getClass().getMethod("doSomething");
    method.invoke(obj);
}

// ✅ 高效写法：缓存Method对象
Method cachedMethod = obj.getClass().getMethod("doSomething");
cachedMethod.setAccessible(true); // 跳过访问检查
for (int i = 0; i < 10000; i++) {
    cachedMethod.invoke(obj);
}

// ✅ 更高效：使用MethodHandle（JDK 7+）
MethodHandles.Lookup lookup = MethodHandles.lookup();
MethodHandle handle = lookup.findVirtual(obj.getClass(), "doSomething", 
    MethodType.methodType(void.class));
for (int i = 0; i < 10000; i++) {
    handle.invokeExact(obj); // 接近直接调用的性能
}`}
          />

          <Callout type="info" title="性能对比数据">
            根据基准测试，直接调用耗时约 <strong className="text-ink-light">1ns</strong>，反射调用约 <strong className="text-orange">50ns</strong>，
            使用 setAccessible(true) 后约 <strong className="text-teal">30ns</strong>，MethodHandle 约 <strong className="text-green-700">5ns</strong>。
            虽然反射较慢，但在大多数业务场景中影响微乎其微，只有在极高并发场景才需要优化。
          </Callout>

          {/* ========== 九、安全性与访问控制 ========== */}
          <h2 id="security" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、安全性与访问控制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            反射可以绕过 Java 的访问控制机制，访问私有成员，这在某些场景下可能带来安全风险。JDK 9 引入的模块系统对此进行了限制。
          </p>

          <Callout type="warning" title="反射的安全风险">
            1️⃣ <strong className="text-ink-light">破坏封装性</strong>：可以访问和修改私有字段，绕过业务逻辑验证<br/>
            2️⃣ <strong className="text-ink-light">序列化漏洞</strong>：反序列化时通过反射创建对象，可能绕过构造函数的安全检查<br/>
            3️⃣ <strong className="text-ink-light">安全管理器绕过</strong>：在某些配置下，反射可以绕过 SecurityManager 的限制<br/>
            4️⃣ <strong className="text-ink-light">模块系统限制</strong>：JDK 9+ 中，未导出的模块包无法通过反射访问
          </Callout>

          <Playground language="java" filename="SecurityExample.java" description="JDK 9+模块系统对反射的限制"
            code={`// JDK 9+ 中，尝试访问未导出模块的内部类会抛出异常
try {
    Class<?> clazz = Class.forName("sun.misc.Unsafe");
    // Exception in thread "main" java.lang.ClassNotFoundException
    // 或 InaccessibleObjectException（如果能找到类但无法访问）
} catch (ClassNotFoundException e) {
    System.err.println("无法访问内部API: " + e.getMessage());
}

// 解决方案：在启动时添加 --add-opens 参数
// java --add-opens java.base/sun.misc=ALL-UNNAMED MyApp`}
          />

          {/* ========== 十、典型应用场景 ========== */}
          <h2 id="use-cases" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、典型应用场景
          </h2>

          <ContextSwitcher
            simpleContent={
              <div className="space-y-3">
                <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                  <div className="text-[13px] font-semibold text-accent mb-2">🔧 Spring IOC 容器</div>
                  <p className="text-[13px] text-ink-muted">Spring 通过反射读取 XML/注解配置，动态创建 Bean 实例并注入依赖。</p>
                </div>
                <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                  <div className="text-[13px] font-semibold text-teal mb-2">🧪 JUnit 测试框架</div>
                  <p className="text-[13px] text-ink-muted">JUnit 扫描带有 @Test 注解的方法，通过反射调用执行测试用例。</p>
                </div>
                <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                  <div className="text-[13px] font-semibold text-rose mb-2">🗄️ ORM 框架（MyBatis/Hibernate）</div>
                  <p className="text-[13px] text-ink-muted">ORM 框架通过反射将数据库查询结果映射到 Java 对象字段。</p>
                </div>
              </div>
            }
            hardcoreContent={
              <div className="space-y-4">
                <Playground language="java" filename="SpringIOCExample.java" description="简化版Spring IOC实现" highlights={[8, 12, 16]}
                  code={`// 模拟Spring通过反射创建Bean
public class SimpleIOCContainer {
    private Map<String, Object> beans = new HashMap<>();
    
    public void registerBean(String name, Class<?> clazz) {
        try {
            // 1. 通过反射创建实例
            Constructor<?> constructor = clazz.getDeclaredConstructor();
            constructor.setAccessible(true);
            Object instance = constructor.newInstance();
            
            // 2. 依赖注入（通过setter或字段注入）
            for (Field field : clazz.getDeclaredFields()) {
                if (field.isAnnotationPresent(Autowired.class)) {
                    field.setAccessible(true);
                    field.set(instance, beans.get(field.getType().getName()));
                }
            }
            
            beans.put(name, instance);
        } catch (Exception e) {
            throw new RuntimeException("创建Bean失败", e);
        }
    }
}`}
                />
                <Playground language="java" filename="JUnitExample.java" description="简化版JUnit测试执行器" highlights={[5, 9, 13]}
                  code={`// 模拟JUnit执行测试
public class SimpleTestRunner {
    public void runTests(Class<?> testClass) {
        try {
            Object testInstance = testClass.getDeclaredConstructor().newInstance();
            
            for (Method method : testClass.getDeclaredMethods()) {
                if (method.isAnnotationPresent(Test.class)) {
                    System.out.println("执行测试: " + method.getName());
                    try {
                        method.invoke(testInstance);
                        System.out.println("✅ 通过");
                    } catch (InvocationTargetException e) {
                        System.err.println("❌ 失败: " + e.getCause().getMessage());
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`}
                />
              </div>
            }
          />

          {/* ========== 十一、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、常见误区
          </h2>

          <Callout type="danger" title="误区一：反射很慢，应该避免使用">
            <span className="font-semibold text-ink-light">你以为的：</span>反射性能差，能不用就不用<br/>
            <span className="font-semibold text-accent">实际：</span>反射确实比直接调用慢 10-50 倍，但在大多数业务场景中（非高频调用），这个差异可以忽略不计。Spring、MyBatis 等主流框架大量使用反射，并未造成性能问题。<strong className="text-ink-light font-semibold">关键是合理使用和缓存优化</strong>。
          </Callout>

          <Callout type="danger" title="误区二：setAccessible(true)只是让私有成员可见">
            <span className="font-semibold text-ink-light">你以为的：</span>setAccessible(true)只是改变可见性<br/>
            <span className="font-semibold text-accent">实际：</span>它还会<strong className="text-ink-light font-semibold">跳过访问控制检查</strong>，显著提升反射性能（约 30% 提升）。但它破坏了封装性，可能导致安全问题，应谨慎使用。JDK 9+ 的模块系统对此进行了限制。
          </Callout>

          <Callout type="danger" title="误区三：Class.forName()和.class是一样的">
            <span className="font-semibold text-ink-light">你以为的：</span>两种方式都能获取Class对象，没区别<br/>
            <span className="font-semibold text-accent">实际：</span><code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Class.forName()</code> 会触发类的<strong className="text-ink-light font-semibold">初始化</strong>（执行静态代码块），而 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">.class</code> 只触发<strong className="text-ink-light font-semibold">加载</strong>，不初始化。如果需要延迟初始化，应使用 .class。
          </Callout>

          <Callout type="danger" title="误区四：反射可以访问任何类的私有成员">
            <span className="font-semibold text-ink-light">你以为的：</span>只要有Class对象，就能访问所有成员<br/>
            <span className="font-semibold text-accent">实际：</span>JDK 9+ 引入了模块系统，未导出的模块包（如 sun.misc.Unsafe）无法通过反射访问，除非在启动时添加 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">--add-opens</code> 参数。此外，SecurityManager 也可以限制反射访问。
          </Callout>

          <Callout type="danger" title="误区五：动态代理只能用于接口">
            <span className="font-semibold text-ink-light">你以为的：</span>动态代理就是JDK的Proxy.newProxyInstance<br/>
            <span className="font-semibold text-accent">实际：</span>JDK 动态代理确实只能代理接口，但还有<strong className="text-ink-light font-semibold">CGLIB</strong>可以通过生成子类来代理类（不能代理 final 类）。Spring AOP 会根据目标对象是否实现接口自动选择代理方式：有接口用 JDK 代理，否则用 CGLIB。
          </Callout>

          {/* ========== 十二、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、面试真题
          </h2>

          <InterviewSection questions={[
            { question: '什么是Java反射？它有什么作用？', answer: '反射是Java在运行时动态获取类的信息（字段、方法、构造器、注解等）并操作对象的能力。主要作用：1）框架开发（Spring IOC、MyBatis等）；2）动态代理（AOP）；3）通用工具类（JSON序列化、ORM映射）；4）测试框架（JUnit扫描@Test注解）。反射打破了编译时类型检查，提供了极高的灵活性。' },
            { question: '获取Class对象有哪几种方式？有什么区别？', answer: '三种方式：1）类名.class（编译时已知类型，最常用，不触发初始化）；2）对象.getClass()（运行时动态获取，不触发初始化）；3）Class.forName()（根据完整类名加载，会触发类初始化，执行静态代码块）。前两种不会触发类的初始化，第三种会。' },
            { question: 'getDeclaredFields()和getFields()有什么区别？', answer: 'getDeclaredFields()返回当前类声明的所有字段（包括private、protected、default），但不包含继承的字段；getFields()返回所有public字段（包括从父类和接口继承的），但不包含private、protected字段。简单记忆：带Declared的是"自己声明的"，不带的是"公开可见的"。' },
            { question: '如何通过反射调用私有方法？', answer: '步骤：1）获取Class对象；2）调用getDeclaredMethod()获取Method对象（注意不是getMethod）；3）调用method.setAccessible(true)绕过访问控制；4）调用method.invoke(obj, args)执行方法。关键点是必须使用getDeclaredMethod而非getMethod，并且要设置setAccessible(true)。' },
            { question: '反射的性能如何？有哪些优化手段？', answer: '反射调用比直接调用慢10-50倍，主要开销来自安全检查、方法查找和参数装箱/拆箱。优化手段：1）缓存Class/Method/Field对象，避免重复获取；2）使用setAccessible(true)跳过访问检查；3）使用MethodHandle（JDK 7+）替代反射，性能接近直接调用；4）避免在循环中重复获取反射对象。' },
            { question: 'JDK动态代理和CGLIB有什么区别？', answer: 'JDK动态代理：1）只能代理接口；2）底层使用反射；3）JDK原生支持，无需额外依赖；4）性能相对较低。CGLIB：1）可以代理类（通过生成子类）；2）底层使用字节码技术；3）需要引入cglib或spring-core依赖；4）性能更高；5）无法代理final类或final方法。Spring AOP会根据目标对象是否实现接口自动选择：有接口用JDK代理，否则用CGLIB。' },
            { question: '反射在Spring框架中有哪些应用？', answer: 'Spring大量使用反射：1）IOC容器通过反射读取XML/注解配置，动态创建Bean实例；2）依赖注入通过反射调用setter方法或直接设置字段；3）AOP通过动态代理（JDK/CGLIB）拦截方法调用；4）事务管理通过反射读取@Transactional注解；5）MVC控制器通过反射调用处理方法。反射是Spring实现解耦和灵活性的核心技术。' },
            { question: 'JDK 9的模块系统对反射有什么影响？', answer: 'JDK 9引入模块系统后，未导出的模块包无法通过反射访问。例如，尝试访问sun.misc.Unsafe会抛出InaccessibleObjectException。解决方案是在启动时添加--add-opens参数，如：java --add-opens java.base/sun.misc=ALL-UNNAMED MyApp。这使得反射的安全性得到提升，但也增加了一些兼容性成本。' },
          ]} />

          {/* ========== 十三、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十三、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">← 前置知识</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">☕</span><span>Java基础语法</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">📦</span><span>面向对象思想</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🏷️</span><span>注解详解</span></div>
              </div>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">延伸知识 →</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🍃</span><span>Spring IOC原理</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔄</span><span>AOP与动态代理</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🗄️</span><span>MyBatis ORM映射</span></div>
              </div>
            </div>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      <SmartTOC items={tocItems} />
    </div>
  )
}
