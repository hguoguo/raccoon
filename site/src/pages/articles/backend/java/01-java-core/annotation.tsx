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
  { id: 'overview', text: '一、注解概述', level: 2 },
  { id: 'built-in-annotations', text: '二、内置注解', level: 2 },
  { id: 'meta-annotations', text: '三、元注解详解', level: 2 },
  { id: 'retention-policy', text: '3.1 @Retention策略', level: 3 },
  { id: 'target-type', text: '3.2 @Target类型', level: 3 },
  { id: 'custom-annotation', text: '四、自定义注解', level: 2 },
  { id: 'annotation-processing', text: '五、注解处理机制', level: 2 },
  { id: 'runtime-processing', text: '5.1 运行时处理（反射）', level: 3 },
  { id: 'compile-processing', text: '5.2 编译时处理（APT）', level: 3 },
  { id: 'use-cases', text: '六、典型应用场景', level: 2 },
  { id: 'best-practices', text: '七、最佳实践', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function Annotation({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              注解是 Java 的<strong className="text-accent">元数据</strong>机制，通过 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@</code> 符号为代码添加标记信息，本身不直接影响程序逻辑，需要配合反射或注解处理器在运行时或编译时读取并执行相应操作。
            </p>
          </blockquote>

          {/* ========== 一、注解概述 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、注解概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            注解（Annotation）是 JDK 5 引入的特性，它为代码提供了一种结构化的注释方式。与注释不同，注解可以被编译器、开发工具或运行时环境读取和处理，从而实现声明式编程、代码生成、配置管理等功能。
          </p>

          <DiagramBlock title="注解的生命周期">
{`graph LR
    A["源码阶段\n@Override"] -->|SOURCE| B["编译阶段\n.class文件"]
    B -->|CLASS| C["运行阶段\nJVM内存"]
    C -->|RUNTIME| D["反射读取注解"]

    style A fill:#ede4d1,stroke:#b5651d,color:#6b5e4c
    style B fill:#f5f0e8,stroke:#b5651d,color:#6b5e4c
    style C fill:#f5f0e8,stroke:#b5651d,color:#8b4c14
    style D fill:#f5f0e8,stroke:#a0522d,color:#a0522d`}
          </DiagramBlock>

          <Callout type="tip" title="核心要点">
            注解本身只是<strong className="text-ink-light font-semibold">标记</strong>，不会改变代码行为。它需要配合<strong className="text-ink-light font-semibold">注解处理器</strong>（编译时）或<strong className="text-ink-light font-semibold">反射</strong>（运行时）才能真正发挥作用。
            这是实现声明式编程和框架扩展性的关键机制。
          </Callout>

          {/* ========== 二、内置注解 ========== */}
          <h2 id="built-in-annotations" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、内置注解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 提供了多个内置注解，用于向编译器提供提示或抑制警告。以下是常用的内置注解：
          </p>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">注解</th>
                  <th className="text-left py-2.5 px-3 text-accent font-semibold">作用</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">保留策略</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">@Override</td><td className="py-2.5 px-3">标记重写父类方法，编译器检查方法签名是否匹配</td><td className="py-2.5 px-3 font-mono text-[11px]">SOURCE</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">@Deprecated</td><td className="py-2.5 px-3">标记已过时的API，使用时编译器发出警告</td><td className="py-2.5 px-3 font-mono text-[11px]">RUNTIME</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">@SuppressWarnings</td><td className="py-2.5 px-3">抑制编译器警告（如unchecked、deprecation）</td><td className="py-2.5 px-3 font-mono text-[11px]">SOURCE</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">@SafeVarargs</td><td className="py-2.5 px-3">标记可变参数方法是类型安全的（JDK 7+）</td><td className="py-2.5 px-3 font-mono text-[11px]">RUNTIME</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">@FunctionalInterface</td><td className="py-2.5 px-3">标记函数式接口，编译器检查是否只有一个抽象方法</td><td className="py-2.5 px-3 font-mono text-[11px]">SOURCE</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-[11px]">@RecordComponent</td><td className="py-2.5 px-3">标记Record组件（JDK 16+）</td><td className="py-2.5 px-3 font-mono text-[11px]">RUNTIME</td></tr>
              </tbody>
            </table>
          </div>

          <Playground language="java" filename="BuiltInAnnotations.java" description="内置注解使用示例" highlights={[3, 7, 11, 15]}
            code={`public class AnnotationExamples {
    
    @Override // 编译器检查是否正确重写了toString
    public String toString() {
        return "AnnotationExamples";
    }
    
    @Deprecated // 标记该方法已废弃，调用时会警告
    public void oldMethod() {
        System.out.println("This is deprecated");
    }
    
    @SuppressWarnings("unchecked") // 抑制未检查转换警告
    public void suppressWarning() {
        List rawList = new ArrayList();
        List<String> stringList = (List<String>) rawList;
    }
    
    @FunctionalInterface // 确保接口只有一个抽象方法
    interface Calculator {
        int calculate(int a, int b);
    }
}`}
          />

          <SideNote label="@Override的重要性">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@Override</code> 不仅是一种文档说明，更重要的是它能让编译器检查方法签名是否正确。如果拼写错误或参数类型不匹配，编译器会报错，避免运行时才发现 bug。
          </SideNote>

          {/* ========== 三、元注解详解 ========== */}
          <h2 id="meta-annotations" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、元注解详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            元注解是<strong className="text-ink-light font-semibold">用于修饰注解的注解</strong>，Java 提供了 4 个核心元注解：<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@Retention</code>、<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@Target</code>、<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@Documented</code>、<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@Inherited</code>。它们决定了注解的行为和作用范围。
          </p>

          <h3 id="retention-policy" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 @Retention策略
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@Retention</code> 定义了注解的生命周期，有三个可选值：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange font-sans mb-3">SOURCE</div>
              <p className="text-[13px] text-ink-muted font-sans mb-2">仅在源码中可见，编译后丢弃</p>
              <p className="text-[11px] text-ink-muted font-mono">适用场景：@Override、代码检查</p>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">CLASS</div>
              <p className="text-[13px] text-ink-muted font-sans mb-2">保留在.class文件中，但运行时不可见</p>
              <p className="text-[11px] text-ink-muted font-mono">适用场景：字节码增强、APT处理</p>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">RUNTIME</div>
              <p className="text-[13px] text-ink-muted font-sans mb-2">保留在.class文件中，运行时可通过反射读取</p>
              <p className="text-[11px] text-ink-muted font-mono">适用场景：Spring、JUnit、框架开发</p>
            </div>
          </div>

          <Playground language="java" filename="RetentionExample.java" description="Retention策略示例" highlights={[2, 6, 10]}
            code={`@Retention(RetentionPolicy.SOURCE) // 仅源码可见
@interface SourceLevel {}

@Retention(RetentionPolicy.CLASS) // 保留在class文件，运行时不可见
@interface ClassLevel {}

@Retention(RetentionPolicy.RUNTIME) // 运行时可通过反射读取
@interface RuntimeLevel {}

// 只有RUNTIME级别的注解才能通过反射访问
Class<?> clazz = MyClass.class;
RuntimeLevel annotation = clazz.getAnnotation(RuntimeLevel.class); // ✅
SourceLevel sourceAnn = clazz.getAnnotation(SourceLevel.class); // ❌ null`}
          />

          <h3 id="target-type" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 @Target类型
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@Target</code> 限制了注解可以应用的程序元素类型。如果不指定，默认可以应用于任何元素。
          </p>

          <Playground language="java" filename="TargetExample.java" description="Target类型示例" highlights={[2, 6, 10, 14]}
            code={`@Target(ElementType.METHOD) // 只能用于方法
@interface MethodOnly {}

@Target({ElementType.FIELD, ElementType.METHOD}) // 可用于字段和方法
@interface FieldOrMethod {}

@Target(ElementType.TYPE) // 只能用于类、接口、枚举
@interface TypeOnly {}

@Target(ElementType.PARAMETER) // 只能用于参数
@interface ParameterOnly {}

@Target({}) // 不能用于任何地方（特殊用途）
@interface Nowhere {}

// 正确使用
public class Example {
    @FieldOrMethod // ✅ 字段允许
    private String name;
    
    @MethodOnly // ✅ 方法允许
    @FieldOrMethod // ✅ 方法也允许
    public void doSomething() {}
    
    @ParameterOnly // ❌ 编译错误：不能用于类
    public class Inner {}
}`}
          />

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">ElementType</th>
                  <th className="text-left py-2.5 px-3 text-accent font-semibold">适用位置</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">TYPE</td><td className="py-2.5 px-3">类、接口、枚举、注解</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">FIELD</td><td className="py-2.5 px-3">字段（包括枚举常量）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">METHOD</td><td className="py-2.5 px-3">方法</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">PARAMETER</td><td className="py-2.5 px-3">方法参数</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">CONSTRUCTOR</td><td className="py-2.5 px-3">构造器</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">LOCAL_VARIABLE</td><td className="py-2.5 px-3">局部变量</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">ANNOTATION_TYPE</td><td className="py-2.5 px-3">注解类型（元注解）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-mono text-[11px]">PACKAGE</td><td className="py-2.5 px-3">包（需配合package-info.java）</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-[11px]">TYPE_PARAMETER / TYPE_USE</td><td className="py-2.5 px-3">泛型参数 / 类型使用（JDK 8+）</td></tr>
              </tbody>
            </table>
          </div>

          <Callout type="info" title="@Documented和@Inherited">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@Documented</code>：标记该注解应包含在 Javadoc 中。<br/>
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@Inherited</code>：标记该注解可被子类继承（仅对类级别注解有效，方法和字段不会继承）。<br/>
            这两个元注解使用频率较低，但在特定场景下很有用。
          </Callout>

          {/* ========== 四、自定义注解 ========== */}
          <h2 id="custom-annotation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、自定义注解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            自定义注解使用 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@interface</code> 关键字定义，可以包含属性（方法声明）。属性可以有默认值，也可以在使用时指定。
          </p>

          <Playground language="java" filename="CustomAnnotation.java" description="自定义注解定义与使用" highlights={[3, 5, 9, 14, 19]}
            code={`@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface MyTest {
    String value() default ""; // 属性（方法声明）
    int timeout() default 0;   // 带默认值的属性
}

public class TestService {
    @MyTest("测试用例1") // 简写：等价于 @MyTest(value = "测试用例1")
    public void testCase1() {
        System.out.println("执行测试1");
    }
    
    @MyTest(value = "测试用例2", timeout = 5000) // 完整写法
    public void testCase2() {
        System.out.println("执行测试2");
    }
    
    @MyTest // 使用默认值
    public void testCase3() {
        System.out.println("执行测试3");
    }
}`}
          />

          <SideNote label="注解属性的限制">
            注解属性只能是以下类型：<strong className="text-ink-light font-semibold">基本类型</strong>（int、boolean等）、<strong className="text-ink-light font-semibold">String</strong>、<strong className="text-ink-light font-semibold">Class</strong>、<strong className="text-ink-light font-semibold">枚举</strong>、<strong className="text-ink-light font-semibold">其他注解</strong>，以及这些类型的<strong className="text-ink-light font-semibold">数组</strong>。不能是对象、集合或复杂类型。
          </SideNote>

          <Playground language="java" filename="ComplexAnnotation.java" description="复杂注解示例" highlights={[4, 8, 12]}
            code={`@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface ApiEndpoint {
    String path();           // 必填属性（无默认值）
    HttpMethod method() default HttpMethod.GET; // 枚举类型
    String[] produces() default {"application/json"}; // 数组类型
    Class<? extends Serializer> serializer() default JsonSerializer.class; // Class类型
    Auth auth() default @Auth(required = false); // 嵌套注解
}

enum HttpMethod { GET, POST, PUT, DELETE }

@interface Auth {
    boolean required();
    String[] roles() default {};
}

@ApiEndpoint(
    path = "/users",
    method = HttpMethod.POST,
    produces = {"application/json", "application/xml"},
    auth = @Auth(required = true, roles = {"ADMIN"})
)
public class UserController {
    // ...
}`}
          />

          {/* ========== 五、注解处理机制 ========== */}
          <h2 id="annotation-processing" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、注解处理机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            注解的处理有两种主要方式：<strong className="text-ink-light font-semibold">运行时处理</strong>（通过反射）和<strong className="text-ink-light font-semibold">编译时处理</strong>（通过注解处理器 APT）。两者各有优劣，适用于不同场景。
          </p>

          <h3 id="runtime-processing" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 运行时处理（反射）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            运行时处理通过反射 API 读取注解信息，然后执行相应逻辑。这种方式灵活但性能较低，适合框架初始化阶段（如 Spring 启动时扫描 Bean）。
          </p>

          <Playground language="java" filename="RuntimeProcessing.java" description="运行时注解处理示例" highlights={[8, 12, 16]}
            code={`@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface Retry {
    int maxAttempts() default 3;
}

public class RetryProcessor {
    public static void process(Object obj) throws Exception {
        Class<?> clazz = obj.getClass();
        
        for (Method method : clazz.getDeclaredMethods()) {
            if (method.isAnnotationPresent(Retry.class)) {
                Retry retry = method.getAnnotation(Retry.class);
                int maxAttempts = retry.maxAttempts();
                
                // 执行重试逻辑
                for (int i = 0; i < maxAttempts; i++) {
                    try {
                        method.invoke(obj);
                        break; // 成功则跳出
                    } catch (Exception e) {
                        if (i == maxAttempts - 1) throw e;
                        System.out.println("重试第" + (i + 1) + "次");
                    }
                }
            }
        }
    }
}`}
          />

          <h3 id="compile-processing" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 编译时处理（APT）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            编译时处理通过<strong className="text-ink-light font-semibold">注解处理器（Annotation Processing Tool, APT）</strong>在编译阶段读取注解并生成代码。这种方式零运行时开销，适合代码生成场景（如 Lombok、Dagger）。
          </p>

          <Playground language="java" filename="CompileTimeProcessor.java" description="编译时注解处理器示例" highlights={[5, 10, 15]}
            code={`// 1. 定义注解（CLASS级别）
@Retention(RetentionPolicy.CLASS)
@Target(ElementType.TYPE)
public @interface GenerateBuilder {}

// 2. 编写注解处理器
@SupportedAnnotationTypes("GenerateBuilder")
@SupportedSourceVersion(SourceVersion.RELEASE_8)
public class BuilderProcessor extends AbstractProcessor {
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (Element element : roundEnv.getElementsAnnotatedWith(GenerateBuilder.class)) {
            // 生成Builder类的Java代码
            String className = element.getSimpleName().toString();
            String builderCode = generateBuilderCode(className);
            
            // 写入文件
            try {
                JavaFileObject file = processingEnv.getFiler()
                    .createSourceFile(className + "Builder");
                file.openWriter().write(builderCode).close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return true;
    }
}

// 3. 使用注解
@GenerateBuilder
public class User {
    private String name;
    private int age;
}
// 编译后自动生成 UserBuilder.java`}
          />

          <Callout type="tip" title="APT vs 反射的选择">
            <strong className="text-ink-light font-semibold">APT（编译时）</strong>：零运行时开销，适合代码生成；但实现复杂，调试困难。<br/>
            <strong className="text-ink-light font-semibold">反射（运行时）</strong>：实现简单，灵活度高；但有性能开销，适合低频调用场景。<br/>
            现代框架通常结合使用：Lombok 用 APT 生成代码，Spring 用反射读取配置。
          </Callout>

          {/* ========== 六、典型应用场景 ========== */}
          <h2 id="use-cases" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、典型应用场景
          </h2>

          <ContextSwitcher
            simpleContent={
              <div className="space-y-3">
                <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                  <div className="text-[13px] font-semibold text-accent mb-2">🍃 Spring Framework</div>
                  <p className="text-[13px] text-ink-muted">@Component、@Autowired、@Transactional 等注解实现依赖注入和事务管理。</p>
                </div>
                <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                  <div className="text-[13px] font-semibold text-teal mb-2">🧪 JUnit 测试</div>
                  <p className="text-[13px] text-ink-muted">@Test、@Before、@After 等注解标记测试方法和生命周期钩子。</p>
                </div>
                <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                  <div className="text-[13px] font-semibold text-rose mb-2">📝 Lombok</div>
                  <p className="text-[13px] text-ink-muted">@Data、@Builder、@Slf4j 等注解在编译时生成样板代码。</p>
                </div>
                <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                  <div className="text-[13px] font-semibold text-indigo mb-2">🗄️ JPA/Hibernate</div>
                  <p className="text-[13px] text-ink-muted">@Entity、@Table、@Column 等注解映射数据库表结构。</p>
                </div>
              </div>
            }
            hardcoreContent={
              <div className="space-y-4">
                <Playground language="java" filename="SpringAnnotationExample.java" description="Spring注解驱动开发" highlights={[3, 7, 11, 15]}
                  code={`@Component // 标记为Spring Bean
public class UserService {
    
    @Autowired // 自动注入依赖
    private UserRepository userRepository;
    
    @Transactional // 声明式事务
    public void createUser(User user) {
        userRepository.save(user);
    }
    
    @PostMapping("/users") // MVC路由映射
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.ok(userService.create(user));
    }
    
    @Validated // 参数校验
    public void validateUser(@NotNull String name, @Email String email) {
        // ...
    }
}`}
                />
                <Playground language="java" filename="LombokExample.java" description="Lombok编译时代码生成" highlights={[2, 6, 10]}
                  code={`@Data // 生成getter/setter/toString/equals/hashCode
@Builder // 生成Builder模式
@NoArgsConstructor // 生成无参构造器
@AllArgsConstructor // 生成全参构造器
public class User {
    private Long id;
    private String name;
    private String email;
    
    @Slf4j // 生成logger字段
    public class Service {
        public void doSomething() {
            log.info("Doing something"); // 直接使用log
        }
    }
}

// 编译后自动生成：
// - getter/setter方法
// - toString/equals/hashCode方法
// - UserBuilder内部类
// - Logger log = LoggerFactory.getLogger(Service.class);`}
                />
              </div>
            }
          />

          {/* ========== 七、最佳实践 ========== */}
          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、最佳实践
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-green-700 font-sans mb-3">✅ 推荐做法</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>优先使用内置注解（@Override等）</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>为注解属性提供合理的默认值</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>使用@Target限制注解适用范围</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>运行时注解才用RUNTIME，否则用CLASS</span></li>
              </ul>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-red-700 font-sans mb-3">❌ 避免做法</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要过度使用自定义注解</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>避免在高频路径中使用运行时注解</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要让注解承担过多业务逻辑</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>避免滥用@Inherited（容易混淆）</span></li>
              </ul>
            </div>
          </div>

          <Callout type="tip" title="注解设计原则">
            1️⃣ <strong className="text-ink-light">单一职责</strong>：一个注解只做一件事<br/>
            2️⃣ <strong className="text-ink-light">最小权限</strong>：用@Target精确限制适用范围<br/>
            3️⃣ <strong className="text-ink-light">合理默认值</strong>：为常用场景提供默认值，减少使用者负担<br/>
            4️⃣ <strong className="text-ink-light">清晰命名</strong>：注解名称应直观表达意图（如 @Retry、@Cacheable）
          </Callout>

          {/* ========== 八、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区一：注解可以直接执行代码">
            <span className="font-semibold text-ink-light">你以为的：</span>注解可以像方法一样执行逻辑<br/>
            <span className="font-semibold text-accent">实际：</span>注解本身只是<strong className="text-ink-light font-semibold">元数据标记</strong>，不包含任何逻辑。它需要配合<strong className="text-ink-light font-semibold">注解处理器</strong>（编译时）或<strong className="text-ink-light font-semibold">反射</strong>（运行时）才能发挥作用。例如，@Transactional 本身不做任何事情，是 Spring 的 AOP 代理在运行时读取该注解并开启事务。
          </Callout>

          <Callout type="danger" title="误区二：所有注解都能在运行时通过反射读取">
            <span className="font-semibold text-ink-light">你以为的：</span>只要有注解，就能用反射获取<br/>
            <span className="font-semibold text-accent">实际：</span>只有标注了 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@Retention(RetentionPolicy.RUNTIME)</code> 的注解才能在运行时通过反射读取。SOURCE 和 CLASS 级别的注解在编译后就被丢弃或仅保留在 class 文件中，无法通过反射访问。
          </Callout>

          <Callout type="danger" title="误区三：@Inherited可以让子类继承父类的所有注解">
            <span className="font-semibold text-ink-light">你以为的：</span>加了@Inherited，子类就有父类的注解<br/>
            <span className="font-semibold text-accent">实际：</span><code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">@Inherited</code> 只对<strong className="text-ink-light font-semibold">类级别的注解</strong>有效，且只能从父类继承到子类。<strong className="text-ink-light font-semibold">方法、字段、参数的注解不会被继承</strong>。此外，接口上的注解也不会被实现类继承。这个特性很容易让人误解，应谨慎使用。
          </Callout>

          <Callout type="danger" title="误区四：注解属性可以是任意类型">
            <span className="font-semibold text-ink-light">你以为的：</span>注解属性可以像普通方法参数一样定义<br/>
            <span className="font-semibold text-accent">实际：</span>注解属性只能是以下类型：<strong className="text-ink-light font-semibold">基本类型</strong>、<strong className="text-ink-light font-semibold">String</strong>、<strong className="text-ink-light font-semibold">Class</strong>、<strong className="text-ink-light font-semibold">枚举</strong>、<strong className="text-ink-light font-semibold">其他注解</strong>，以及这些类型的<strong className="text-ink-light font-semibold">数组</strong>。不能是 Object、List、Map 等复杂类型。这是因为注解需要在编译时确定值，必须是可以序列化的常量。
          </Callout>

          <Callout type="danger" title="误区五：APT和反射可以互相替代">
            <span className="font-semibold text-ink-light">你以为的：</span>两种方式都能处理注解，随便选一个<br/>
            <span className="font-semibold text-accent">实际：</span>APT（编译时）和反射（运行时）有本质区别：<strong className="text-ink-light font-semibold">APT零运行时开销</strong>，适合代码生成（如 Lombok）；<strong className="text-ink-light font-semibold">反射灵活但性能低</strong>，适合框架初始化（如 Spring）。两者不是替代关系，而是互补关系。现代框架通常结合使用：Lombok 用 APT 生成代码，Spring 用反射读取配置。
          </Callout>

          {/* ========== 九、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection questions={[
            { question: '什么是Java注解？它有什么作用？', answer: '注解是Java的元数据机制，通过@符号为代码添加标记信息。注解本身不直接影响程序逻辑，需要配合注解处理器（编译时）或反射（运行时）读取并执行相应操作。主要作用：1）编译器检查（@Override）；2）代码生成（Lombok）；3）框架配置（Spring @Component）；4）声明式编程（@Transactional）。注解是实现解耦和灵活性的关键技术。' },
            { question: '@Retention的三个策略有什么区别？', answer: 'SOURCE：仅在源码中可见，编译后丢弃，适用于编译器检查（如@Override）；CLASS：保留在.class文件中，但运行时不可见，适用于字节码增强和APT处理；RUNTIME：保留在.class文件中，运行时可通过反射读取，适用于框架开发（如Spring、JUnit）。只有RUNTIME级别的注解才能通过反射访问。' },
            { question: '@Target有哪些常用的ElementType？', answer: '常用类型：TYPE（类/接口/枚举）、FIELD（字段）、METHOD（方法）、PARAMETER（参数）、CONSTRUCTOR（构造器）、LOCAL_VARIABLE（局部变量）、ANNOTATION_TYPE（注解类型）、PACKAGE（包）。JDK 8新增了TYPE_PARAMETER（泛型参数）和TYPE_USE（类型使用）。如果不指定@Target，默认可以应用于任何元素。' },
            { question: '如何自定义一个注解？', answer: '步骤：1）使用@interface关键字定义；2）用@Retention指定保留策略；3）用@Target限制适用范围；4）定义属性（方法声明），可以提供默认值；5）使用时通过@注解名应用。例如：@Retention(RUNTIME) @Target(METHOD) public @interface MyTest { String value() default ""; }。注意属性只能是基本类型、String、Class、枚举、其他注解及其数组。' },
            { question: '运行时注解处理和编译时注解处理有什么区别？', answer: '运行时处理：通过反射API读取注解，灵活但性能低，适合框架初始化（如Spring扫描Bean）；编译时处理：通过APT（Annotation Processing Tool）在编译阶段读取注解并生成代码，零运行时开销，适合代码生成（如Lombok）。选择依据：如果需要生成代码用APT，如果需要动态行为用反射。现代框架通常结合使用。' },
            { question: '@Override注解的作用是什么？为什么推荐使用？', answer: '@Override标记方法重写了父类或接口的方法。它的作用：1）文档说明，提高代码可读性；2）编译器检查，如果方法签名不匹配（如拼写错误、参数类型错误），编译器会报错，避免运行时才发现bug。强烈建议在重写方法时始终使用@Override，它是防御性编程的重要手段。' },
            { question: 'Spring中的注解是如何工作的？', answer: 'Spring大量使用注解实现声明式编程：1）@Component/@Service/@Repository标记Bean，Spring启动时通过反射扫描并注册到IOC容器；2）@Autowired通过反射注入依赖；3）@Transactional通过AOP代理读取注解，在方法执行前后开启/提交事务；4）@RequestMapping通过反射映射URL到处理方法。Spring在启动阶段通过反射读取注解信息，构建元数据模型，运行时根据元数据执行相应逻辑。' },
            { question: 'Lombok是如何通过注解生成代码的？', answer: 'Lombok使用编译时注解处理（APT）：1）定义注解（如@Data、@Builder）；2）编写注解处理器，在编译阶段读取注解；3）通过AST（抽象语法树）分析代码结构；4）生成对应的Java代码（getter/setter/toString等）；5）将生成的代码插入到编译过程中。Lombok的优势是零运行时开销，生成的代码在编译后就存在，运行时直接执行，没有反射性能损失。' },
          ]} />

          {/* ========== 十、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">← 前置知识</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">☕</span><span>Java基础语法</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔄</span><span>反射机制</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🏛️</span><span>面向对象思想</span></div>
              </div>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">延伸知识 →</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🍃</span><span>Spring注解驱动开发</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔧</span><span>Lombok原理与实践</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔄</span><span>AOP与动态代理</span></div>
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
