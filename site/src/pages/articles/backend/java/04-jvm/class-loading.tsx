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
  { id: 'lifecycle', text: '一、类的生命周期', level: 2 },
  { id: 'loading', text: '二、加载（Loading）', level: 2 },
  { id: 'verification', text: '三、验证（Verification）', level: 2 },
  { id: 'preparation', text: '四、准备（Preparation）', level: 2 },
  { id: 'resolution', text: '五、解析（Resolution）', level: 2 },
  { id: 'initialization', text: '六、初始化（Initialization）', level: 2 },
  { id: 'classloader', text: '七、类加载器', level: 2 },
  { id: 'parent-delegation', text: '八、双亲委派模型（重点🔥）', level: 2 },
  { id: 'break-delegation', text: '九、打破双亲委派', level: 2 },
  { id: 'custom-loader', text: '十、自定义类加载器', level: 2 },
  { id: 'misconceptions', text: '十一、常见误区', level: 2 },
  { id: 'interview', text: '十二、面试真题', level: 2 },
  { id: 'related', text: '十三、知识关联', level: 2 },
]

export default function ClassLoading({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              类加载机制是JVM将<strong className="text-accent">.class文件从磁盘加载到内存</strong>，并进行验证、准备、解析和初始化的过程，
              最终形成可被Java程序直接使用的Class对象。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要了解类加载？">
            理解类加载机制有助于解决ClassNotFoundException、NoClassDefFoundError等问题，掌握热部署、模块化、SPI等高级特性的实现原理。
          </Callout>

          <h2 id="lifecycle" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、类的生命周期
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            类从被加载到JVM中开始，到卸载出内存为止，整个生命周期包括7个阶段：
          </p>

          <DiagramBlock title="类的生命周期">
            <pre className="text-[12px] sm:text-[13px] leading-relaxed text-left font-mono">{`┌────────┐   ┌──────┐   ┌──────┐   ┌──────┐   ┌────────┐
│ Loading │→│Verify│→│Prepare│→│Resolve│→│Initialize│
└────────┘   └──────┘   └──────┘   └──────┘   └────────┘
     ↑                                          ↓
     │                                    ┌──────────┐
     └────────────────────────────────────│  Using   │
                                          └──────────┘
                                               ↓
                                          ┌──────────┐
                                          │ Unloading │
                                          └──────────┘

加载、验证、准备、初始化、卸载顺序确定
解析可能在初始化之后再开始`}</pre>
          </DiagramBlock>

          <SideNote>
            <strong>加载、验证、准备、初始化和卸载</strong>这5个阶段的顺序是确定的。<br/>
            <strong>解析</strong>阶段则可能在初始化之后再开始，这是为了支持Java的动态绑定特性。
          </SideNote>

          <h2 id="loading" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、加载（Loading）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            加载阶段需要完成3件事：
          </p>

          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4">
            <li>通过类的全限定名获取定义此类的<strong className="text-accent">二进制字节流</strong></li>
            <li>将字节流所代表的静态存储结构转化为方法区的<strong className="text-accent">运行时数据结构</strong></li>
            <li>在内存中生成一个代表这个类的 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">java.lang.Class</code> 对象</li>
          </ol>

          <h3 id="loading-sources" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            字节流来源
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4">
            <li>从ZIP包读取（JAR、EAR、WAR等）</li>
            <li>从网络获取（Applet、Web应用）</li>
            <li>运行时计算生成（动态代理、ASM、CGLIB）</li>
            <li>由其他文件生成（JSP编译成Class）</li>
            <li>从数据库中读取</li>
            <li>从加密文件中获取</li>
          </ul>

          <Playground
            code={`// 查看类加载信息
public class ClassLoadingInfo {
    public static void main(String[] args) {
        Class<String> stringClass = String.class;
        
        // 获取类加载器
        ClassLoader classLoader = stringClass.getClassLoader();
        System.out.println("String的类加载器: " + classLoader);
        // 输出: null (Bootstrap ClassLoader)
        
        // 获取当前类的类加载器
        ClassLoader currentLoader = ClassLoadingInfo.class.getClassLoader();
        System.out.println("当前类的类加载器: " + currentLoader);
        // 输出: jdk.internal.loader.ClassLoaders$AppClassLoader
        
        // 获取类加载器的层级关系
        System.out.println("父加载器: " + currentLoader.getParent());
        // 输出: jdk.internal.loader.ClassLoaders$PlatformClassLoader
        System.out.println("祖父加载器: " + currentLoader.getParent().getParent());
        // 输出: null (Bootstrap ClassLoader)
    }
}`}
            language="java"
            description="查看类加载器层级关系"
          />

          <h2 id="verification" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、验证（Verification）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            验证是连接阶段的第一步，确保Class文件的字节流中包含的信息符合当前虚拟机的要求。
          </p>

          <h3 id="verification-steps" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            验证的四个阶段
          </h3>
          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">阶段</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">检查内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">文件格式验证</td>
                <td className="border border-border-light px-3 py-2">魔数、版本号、常量池类型等</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">元数据验证</td>
                <td className="border border-border-light px-3 py-2">继承关系、final类、抽象方法实现等</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">字节码验证</td>
                <td className="border border-border-light px-3 py-2">操作数栈与局部变量表匹配、类型转换合法等</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">符号引用验证</td>
                <td className="border border-border-light px-3 py-2">符号引用能否找到对应的直接引用</td>
              </tr>
            </tbody>
          </table>

          <Callout type="warning" title="性能影响">
            验证阶段非常复杂，可能占用大量时间。可通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">-Xverify:none</code> 关闭部分验证，缩短加载时间（不推荐生产环境使用）。
          </Callout>

          <h2 id="preparation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、准备（Preparation）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            准备阶段是正式为<strong className="text-accent">类变量（static变量）分配内存并设置初始值</strong>的阶段。
          </p>

          <Playground
            code={`public class PreparationExample {
    public static int value = 123;      // 准备阶段: value = 0
    public static final int CONST = 456; // 准备阶段: CONST = 456
    
    public static void main(String[] args) {
        System.out.println("value: " + value);   // 123 (初始化后)
        System.out.println("CONST: " + CONST);   // 456
    }
}

// 注意：
// 1. 准备阶段只分配类变量的内存，实例变量在对象实例化时分配
// 2. 准备阶段设置的是数据类型的零值（0、null、false等）
// 3. final修饰的类变量在准备阶段就直接赋值为指定的值`}
            language="java"
            description="准备阶段vs初始化阶段的区别"
          />

          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">数据类型</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">零值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">int</td>
                <td className="border border-border-light px-3 py-2">0</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">long</td>
                <td className="border border-border-light px-3 py-2">0L</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">float</td>
                <td className="border border-border-light px-3 py-2">0.0f</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">double</td>
                <td className="border border-border-light px-3 py-2">0.0d</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">boolean</td>
                <td className="border border-border-light px-3 py-2">false</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-mono">reference</td>
                <td className="border border-border-light px-3 py-2">null</td>
              </tr>
            </tbody>
          </table>

          <h2 id="resolution" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、解析（Resolution）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            解析阶段是虚拟机将常量池内的<strong className="text-accent">符号引用替换为直接引用</strong>的过程。
          </p>

          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4">
            <li><strong>符号引用</strong>：以一组符号来描述所引用的目标，可以是任何形式的字面量</li>
            <li><strong>直接引用</strong>：直接指向目标的指针、相对偏移量或是一个能间接定位到目标的句柄</li>
          </ul>

          <SideNote>
            解析动作主要针对类或接口、字段、类方法、接口方法、方法类型、方法句柄和调用点限定符7类符号引用进行。
          </SideNote>

          <h2 id="initialization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、初始化（Initialization）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            初始化是类加载的最后一步，执行类构造器 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">&lt;clinit&gt;()</code> 方法的过程。
          </p>

          <h3 id="clinit-method" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            &lt;clinit&gt;() 方法
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">&lt;clinit&gt;()</code> 是由编译器自动收集类中的所有类变量的赋值动作和静态语句块（static {}）中的语句合并产生的。
          </p>

          <Playground
            code={`public class InitializationExample {
    public static int A = 1;
    
    static {
        A = 2;
        System.out.println("静态代码块执行");
    }
    
    public static int B = A + 1; // B = 3
    
    public static void main(String[] args) {
        System.out.println("A = " + A); // 2
        System.out.println("B = " + B); // 3
    }
}

// 执行顺序：
// 1. 准备阶段: A=0, B=0
// 2. 初始化阶段: 
//    - A=1
//    - 执行static块: A=2, 打印"静态代码块执行"
//    - B=A+1=3`}
            language="java"
            description="演示初始化阶段的执行顺序"
          />

          <h3 id="initialization-triggers" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            触发初始化的场景
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4">
            <li>遇到 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">new</code>、<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">getstatic</code>、<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">putstatic</code>、<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">invokestatic</code> 字节码指令</li>
            <li>使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">java.lang.reflect</code> 包的方法对类进行反射调用</li>
            <li>初始化子类时，发现父类还没有初始化</li>
            <li>虚拟机启动时，用户需要指定一个要执行的主类（包含main()方法的类）</li>
            <li>JDK 7的动态语言支持：java.lang.invoke.MethodHandle实例最后的解析结果</li>
          </ol>

          <Callout type="info" title="不会触发初始化的场景">
            • 通过子类引用父类的静态字段，只会触发父类的初始化<br/>
            • 通过数组定义类引用，不会触发该类的初始化<br/>
            • 引用常量不会触发初始化（常量在编译阶段就存入调用类的常量池）
          </Callout>

          <h2 id="classloader" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、类加载器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            类加载器虽然只用于实现类的加载动作，但它在Java程序中起到的作用却远超类加载阶段。
          </p>

          <h3 id="builtin-loaders" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            JVM内置的类加载器
          </h3>
          <table className="w-full border-collapse my-4 text-[13px] sm:text-sm">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">加载器</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">负责加载</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">实现语言</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">Bootstrap ClassLoader</td>
                <td className="border border-border-light px-3 py-2">&lt;JAVA_HOME&gt;/lib下的核心类库</td>
                <td className="border border-border-light px-3 py-2">C++</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">Extension ClassLoader</td>
                <td className="border border-border-light px-3 py-2">&lt;JAVA_HOME&gt;/lib/ext目录下的类库</td>
                <td className="border border-border-light px-3 py-2">Java</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2 font-semibold">Application ClassLoader</td>
                <td className="border border-border-light px-3 py-2">用户类路径（classpath）上的类库</td>
                <td className="border border-border-light px-3 py-2">Java</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`public class ClassLoaderHierarchy {
    public static void main(String[] args) {
        // 获取系统类加载器
        ClassLoader appClassLoader = ClassLoader.getSystemClassLoader();
        System.out.println("应用类加载器: " + appClassLoader);
        
        // 获取扩展类加载器
        ClassLoader extClassLoader = appClassLoader.getParent();
        System.out.println("扩展类加载器: " + extClassLoader);
        
        // 获取启动类加载器
        ClassLoader bootstrapClassLoader = extClassLoader.getParent();
        System.out.println("启动类加载器: " + bootstrapClassLoader); // null
        
        // 查看每个加载器加载的类
        System.out.println("\nString由谁加载: " + String.class.getClassLoader()); // null
        System.out.println("ArrayList由谁加载: " + java.util.ArrayList.class.getClassLoader()); // null
        System.out.println("当前类由谁加载: " + ClassLoaderHierarchy.class.getClassLoader()); // AppClassLoader
    }
}`}
            language="java"
            description="查看类加载器层级"
          />

          <h2 id="parent-delegation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、双亲委派模型（重点🔥）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            双亲委派模型要求除了顶层的启动类加载器外，其余的类加载器都应当有自己的父类加载器。
          </p>

          <DiagramBlock title="双亲委派模型">
            <pre className="text-[12px] sm:text-[13px] leading-relaxed text-left font-mono">{`          ┌─────────────────────┐
          │ Bootstrap Loader    │ ← C++实现，顶级加载器
          └──────────┬──────────┘
                     │ 委派
          ┌──────────▼──────────┐
          │ Extension Loader    │ ← 加载ext目录
          └──────────┬──────────┘
                     │ 委派
          ┌──────────▼──────────┐
          │ Application Loader  │ ← 加载classpath
          └──────────┬──────────┘
                     │ 委派
          ┌──────────▼──────────┐
          │  Custom Loader      │ ← 用户自定义
          └─────────────────────┘

工作流程：
1. 收到类加载请求 → 先委托给父加载器
2. 父加载器无法完成 → 子加载器尝试加载
3. 保证核心API不被篡改`}</pre>
          </DiagramBlock>

          <h3 id="delegation-advantages" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            双亲委派的优势
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 ml-4">
            <li><strong>安全性</strong>：防止核心API被篡改（如自定义java.lang.String）</li>
            <li><strong>唯一性</strong>：避免类的重复加载，保证类的唯一性</li>
            <li><strong>层次性</strong>：类加载具有优先层级关系</li>
          </ul>

          <Playground
            code={`// 双亲委派的实现逻辑（简化版）
protected Class<?> loadClass(String name, boolean resolve)
    throws ClassNotFoundException {
    
    // 1. 检查是否已经加载过
    Class<?> c = findLoadedClass(name);
    if (c == null) {
        try {
            // 2. 委托给父加载器
            if (parent != null) {
                c = parent.loadClass(name, false);
            } else {
                // 3. 父加载器为null，委托给Bootstrap
                c = findBootstrapClassOrNull(name);
            }
        } catch (ClassNotFoundException e) {
            // 父加载器无法加载
        }
        
        // 4. 父加载器无法加载，自己尝试加载
        if (c == null) {
            c = findClass(name);
        }
    }
    
    if (resolve) {
        resolveClass(c);
    }
    return c;
}`}
            language="java"
            description="双亲委派的实现逻辑"
          />

          <h2 id="break-delegation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、打破双亲委派
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            双亲委派模型并不是强制性的约束，历史上出现过3次大规模"破坏"双亲委派的情况：
          </p>

          <h3 id="break-1-jndi" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            第一次：JNDI服务
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JNDI的代码由Bootstrap ClassLoader加载，但需要调用由Application ClassLoader加载的SPI接口实现。解决方案是引入<strong className="text-accent">线程上下文类加载器（Thread Context ClassLoader）</strong>。
          </p>

          <Playground
            code={`// SPI机制示例
public class SPIDemo {
    public static void main(String[] args) {
        // 获取线程上下文类加载器
        ClassLoader contextClassLoader = Thread.currentThread().getContextClassLoader();
        System.out.println("上下文类加载器: " + contextClassLoader);
        
        // ServiceLoader使用上下文类加载器加载SPI实现
        java.util.ServiceLoader<java.sql.Driver> drivers = 
            java.util.ServiceLoader.load(java.sql.Driver.class);
        
        for (java.sql.Driver driver : drivers) {
            System.out.println("加载的驱动: " + driver.getClass().getName());
        }
    }
}`}
            language="java"
            description="SPI机制使用上下文类加载器"
          />

          <h3 id="break-2-osgi" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            第二次：OSGi模块化
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            OSGi实现了模块化热部署，每个Bundle都有自己的类加载器，形成了网状结构，突破了双亲委派的树状结构。
          </p>

          <h3 id="break-3-hotswap" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            第三次：热替换、模块热部署
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            为了实现代码热替换，需要自定义类加载器来加载不同版本的类，突破双亲委派的限制。
          </p>

          <h2 id="custom-loader" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、自定义类加载器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            用户可以通过继承 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">java.lang.ClassLoader</code> 类的方式来实现自定义的类加载器。
          </p>

          <Playground
            code={`import java.io.*;

public class CustomClassLoader extends ClassLoader {
    private String classPath;
    
    public CustomClassLoader(String classPath) {
        this.classPath = classPath;
    }
    
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] data = loadClassData(name);
        if (data == null) {
            throw new ClassNotFoundException();
        }
        return defineClass(name, data, 0, data.length);
    }
    
    private byte[] loadClassData(String className) {
        String fileName = classPath + File.separatorChar + 
            className.replace('.', File.separatorChar) + ".class";
        
        try (InputStream ins = new FileInputStream(fileName);
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            
            byte[] buffer = new byte[1024];
            int length;
            while ((length = ins.read(buffer)) != -1) {
                baos.write(buffer, 0, length);
            }
            return baos.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public static void main(String[] args) throws Exception {
        CustomClassLoader loader = new CustomClassLoader("/path/to/classes");
        Class<?> clazz = loader.loadClass("com.example.MyClass");
        Object instance = clazz.newInstance();
        System.out.println("类加载器: " + instance.getClass().getClassLoader());
    }
}`}
            language="java"
            description="自定义类加载器实现"
          />

          <Callout type="warning" title="注意事项">
            • 不要重写 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">loadClass()</code> 方法，除非你想打破双亲委派<br/>
            • 应该重写 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">findClass()</code> 方法<br/>
            • 自定义类加载器可以实现加密、版本控制、热部署等功能
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、常见误区
          </h2>

          <Callout type="danger" title="误区1：所有类都由双亲委派加载">
            <strong>错误</strong>：认为所有类都遵循双亲委派模型。<br/><br/>
            <strong>正确</strong>：SPI机制、OSGi、热部署等场景会打破双亲委派，使用线程上下文类加载器或自定义类加载器。
          </Callout>

          <Callout type="danger" title="误区2：类加载只发生一次">
            <strong>错误</strong>：认为类加载后就不会再次加载。<br/><br/>
            <strong>正确</strong>：不同的类加载器可以加载同一个类，产生多个Class对象。自定义类加载器可以实现类的热替换。
          </Callout>

          <Callout type="danger" title="误区3：ClassNotFoundException和NoClassDefFoundError是一样的">
            <strong>错误</strong>：认为这两个异常没有区别。<br/><br/>
            <strong>正确</strong>：<br/>
            • <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ClassNotFoundException</code>：运行时主动加载类失败（如Class.forName）<br/>
            • <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">NoClassDefFoundError</code>：编译时存在，运行时找不到类定义（通常是依赖缺失）
          </Callout>

          <Callout type="danger" title="误区4：static代码块在类加载时就执行">
            <strong>错误</strong>：认为类加载时就会执行static代码块。<br/><br/>
            <strong>正确</strong>：static代码块在<strong className="text-accent">初始化阶段</strong>执行，而初始化只在首次主动使用时触发。被动引用（如通过子类访问父类静态字段）不会触发子类初始化。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "什么是双亲委派模型？有什么好处？",
                answer: "双亲委派模型：当一个类加载器收到类加载请求时，首先不会自己去尝试加载这个类，而是把这个请求委派给父类加载器去完成，每一层的类加载器都是如此，因此所有的加载请求最终都应该传送到顶层的启动类加载器中。\n\n好处：\n1. 安全性：防止核心API被篡改\n2. 唯一性：避免类的重复加载\n3. 层次性：类加载具有优先层级关系"
              },
              {
                question: "如何打破双亲委派模型？",
                answer: "打破方式：\n1. 重写loadClass()方法（不推荐）\n2. 使用线程上下文类加载器（SPI机制）\n3. 使用自定义类加载器（OSGi、热部署）\n\n典型场景：\n• JDBC驱动加载：ServiceLoader使用Thread.getContextClassLoader()\n• Tomcat：每个Web应用有独立的类加载器\n• OSGi：模块化热部署"
              },
              {
                question: "类的初始化时机有哪些？",
                answer: "触发初始化的5种情况：\n1. 遇到new、getstatic、putstatic、invokestatic字节码指令\n2. 使用java.lang.reflect包的方法对类进行反射调用\n3. 初始化子类时，父类还未初始化\n4. 虚拟机启动时，指定包含main()方法的主类\n5. JDK 7的动态语言支持：MethodHandle解析结果\n\n不触发的情况：\n• 通过子类引用父类静态字段\n• 通过数组定义类引用\n• 引用常量"
              },
              {
                question: "ClassNotFoundException和NoClassDefFoundError有什么区别？",
                answer: "ClassNotFoundException：\n• 受检异常，必须捕获\n• 运行时主动加载类失败\n• 常见于Class.forName()、ClassLoader.loadClass()\n\nNoClassDefFoundError：\n• 错误，非异常\n• 编译时存在，运行时找不到类定义\n• 常见于依赖jar包缺失、类初始化失败"
              },
              {
                question: "什么是SPI机制？为什么要打破双亲委派？",
                answer: "SPI（Service Provider Interface）：Java提供的一套用来被第三方实现或者扩展的API。\n\n打破原因：\nSPI接口由Bootstrap ClassLoader加载（rt.jar），但实现类由Application ClassLoader加载。如果遵循双亲委派，Bootstrap无法加载Application的类。\n\n解决方案：\n使用线程上下文类加载器（Thread.currentThread().getContextClassLoader()），让父类加载器请求子类加载器去完成类加载。"
              },
              {
                question: "自定义类加载器的应用场景有哪些？",
                answer: "应用场景：\n1. 加密：Class文件加密，自定义加载器解密后加载\n2. 热部署：Tomcat等容器实现应用隔离和热更新\n3. 隔离：不同模块使用不同类加载器，避免冲突\n4. 扩展：从非标准来源加载类（数据库、网络）\n5. 测试：加载不同版本的类进行测试"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十三、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <a href="/docs/04-jvm/jvm-memory-model" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ JVM内存结构</h4>
              <p className="text-sm text-ink-muted">了解方法区/元空间如何存储类信息</p>
            </a>
            <a href="/docs/01-java-core/reflection" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ 反射机制</h4>
              <p className="text-sm text-ink-muted">反射需要在运行时获取Class对象</p>
            </a>
            <a href="/docs/01-java-core/annotation" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ 注解详解</h4>
              <p className="text-sm text-ink-muted">注解处理涉及类加载和反射</p>
            </a>
            <a href="/docs/06-spring-framework/spring-core" className="block p-4 border border-border-light rounded-paper-md hover:border-accent hover:bg-accent-soft/30 transition-colors">
              <h4 className="font-semibold text-ink mb-2">→ Spring IoC容器</h4>
              <p className="text-sm text-ink-muted">Spring Bean的生命周期与类加载密切相关</p>
            </a>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
