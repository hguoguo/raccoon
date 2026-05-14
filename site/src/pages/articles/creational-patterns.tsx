import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import SideNote from '../../components/knowledge/SideNote'
import SmartTOC from '../../components/knowledge/SmartTOC'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'singleton', text: '一、单例模式 (Singleton)', level: 2 },
  { id: 'factory-method', text: '二、工厂方法 (Factory Method)', level: 2 },
  { id: 'abstract-factory', text: '三、抽象工厂 (Abstract Factory)', level: 2 },
  { id: 'builder', text: '四、建造者模式 (Builder)', level: 2 },
  { id: 'prototype', text: '五、原型模式 (Prototype)', level: 2 },
  { id: 'comparison', text: '六、创建型模式对比', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function CreationalPatterns({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              创建型模式关注<strong className="text-accent">对象的创建方式</strong>，通过解耦对象的实例化过程与使用过程，提高系统的灵活性和可复用性。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要创建型模式？">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>解耦</strong>：客户端代码不依赖具体类，只依赖接口或抽象类</li>
              <li><strong>灵活性</strong>：运行时动态决定创建哪种对象</li>
              <li><strong>控制</strong>：统一管理对象的生命周期（如单例、池化）</li>
              <li><strong>简化</strong>：隐藏复杂对象的构建细节</li>
            </ul>
          </Callout>

          <h2 id="singleton" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、单例模式 (Singleton)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：保证一个类只有一个实例，并提供全局访问点。适用于资源共享、配置管理等场景。
          </p>

          <Playground
            code={`// ❌ 线程不安全的懒汉式
public class Singleton {
    private static Singleton instance;
    
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();  // 多线程可能创建多个实例
        }
        return instance;
    }
}

// ✅ 双重检查锁定 (DCL) - 推荐
public class Singleton {
    private static volatile Singleton instance;
    
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}

// ✅ 枚举单例 - 最安全（防止反射和序列化破坏）
public enum SingletonEnum {
    INSTANCE;
    
    public void doSomething() {
        System.out.println("执行操作");
    }
}`}
            language="java"
            highlights={[2, 13, 26]}
            filename="singleton.java"
            description="单例模式实现对比"
          />

          <SideNote label="volatile 的作用">
            在 DCL 中，<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">volatile</code> 禁止指令重排序，确保 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">instance = new Singleton()</code> 的三步操作（分配内存、初始化、引用赋值）不会被重排，避免其他线程拿到未完全初始化的对象。
          </SideNote>

          <h2 id="factory-method" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、工厂方法 (Factory Method)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：定义创建对象的接口，但由子类决定实例化哪个类。将对象的创建延迟到子类。
          </p>

          <Playground
            code={`// 产品接口
interface Logger {
    void log(String message);
}

// 具体产品
class FileLogger implements Logger {
    public void log(String message) {
        System.out.println("[File] " + message);
    }
}

class DatabaseLogger implements Logger {
    public void log(String message) {
        System.out.println("[Database] " + message);
    }
}

// 抽象工厂
abstract class LoggerFactory {
    public abstract Logger createLogger();
    
    public void logMessage(String message) {
        Logger logger = createLogger();
        logger.log(message);
    }
}

// 具体工厂
class FileLoggerFactory extends LoggerFactory {
    public Logger createLogger() {
        return new FileLogger();
    }
}

class DatabaseLoggerFactory extends LoggerFactory {
    public Logger createLogger() {
        return new DatabaseLogger();
    }
}

// 使用
LoggerFactory factory = new FileLoggerFactory();
factory.logMessage("用户登录");  // [File] 用户登录`}
            language="java"
            highlights={[20, 31, 37, 43]}
            filename="factory-method.java"
            description="工厂方法模式"
          />

          <DiagramBlock title="工厂方法 UML 图">
            {`classDiagram
              class LoggerFactory {
                <<abstract>>
                +createLogger()
              }
              class Logger {
                <<interface>>
                +log()
              }
              class FileLoggerFactory {
                +createLogger()
              }
              class DatabaseFactory {
                +createLogger()
              }
              class FileLogger {
                +log()
              }
              class DatabaseLogger {
                +log()
              }
              LoggerFactory <|-- FileLoggerFactory
              LoggerFactory <|-- DatabaseFactory
              Logger <|.. FileLogger
              Logger <|.. DatabaseLogger
              FileLoggerFactory ..> FileLogger
              DatabaseFactory ..> DatabaseLogger
            `}
          </DiagramBlock>

          <h2 id="abstract-factory" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、抽象工厂 (Abstract Factory)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：提供创建一系列相关或依赖对象的接口，而无需指定它们的具体类。适用于产品族的概念。
          </p>

          <Playground
            code={`// 产品族 A：UI 组件
interface Button {
    void render();
}

interface Checkbox {
    void render();
}

// 产品族 B：Windows 风格
class WindowsButton implements Button {
    public void render() { System.out.println("Windows 按钮"); }
}

class WindowsCheckbox implements Checkbox {
    public void render() { System.out.println("Windows 复选框"); }
}

// 产品族 C：Mac 风格
class MacButton implements Button {
    public void render() { System.out.println("Mac 按钮"); }
}

class MacCheckbox implements Checkbox {
    public void render() { System.out.println("Mac 复选框"); }
}

// 抽象工厂
interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// 具体工厂
class WindowsFactory implements GUIFactory {
    public Button createButton() { return new WindowsButton(); }
    public Checkbox createCheckbox() { return new WindowsCheckbox(); }
}

class MacFactory implements GUIFactory {
    public Button createButton() { return new MacButton(); }
    public Checkbox createCheckbox() { return new MacCheckbox(); }
}

// 使用
GUIFactory factory = new MacFactory();
Button button = factory.createButton();
Checkbox checkbox = factory.createCheckbox();
button.render();    // Mac 按钮
checkbox.render();  // Mac 复选框`}
            language="java"
            highlights={[29, 35, 41, 47]}
            filename="abstract-factory.java"
            description="抽象工厂模式"
          />

          <Callout type="info" title="工厂方法 vs 抽象工厂">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>工厂方法</strong>：创建一个产品，通过继承实现</li>
              <li><strong>抽象工厂</strong>：创建一族相关产品，通过组合实现</li>
              <li>抽象工厂可以用工厂方法来实现其创建方法</li>
            </ul>
          </Callout>

          <h2 id="builder" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、建造者模式 (Builder)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：将复杂对象的构建与表示分离，使同样的构建过程可以创建不同的表示。适用于参数多、可选参数多的对象。
          </p>

          <Playground
            code={`// 复杂对象
public class Computer {
    private String cpu;
    private String ram;
    private String storage;
    private String gpu;
    private boolean hasWifi;
    
    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.ram = builder.ram;
        this.storage = builder.storage;
        this.gpu = builder.gpu;
        this.hasWifi = builder.hasWifi;
    }
    
    // Getter 方法...
    
    // 建造者
    public static class Builder {
        private String cpu;
        private String ram;
        private String storage;
        private String gpu;
        private boolean hasWifi = false;
        
        public Builder setCPU(String cpu) {
            this.cpu = cpu;
            return this;
        }
        
        public Builder setRAM(String ram) {
            this.ram = ram;
            return this;
        }
        
        public Builder setStorage(String storage) {
            this.storage = storage;
            return this;
        }
        
        public Builder setGPU(String gpu) {
            this.gpu = gpu;
            return this;
        }
        
        public Builder setWifi(boolean hasWifi) {
            this.hasWifi = hasWifi;
            return this;
        }
        
        public Computer build() {
            // 验证必填字段
            if (cpu == null || ram == null) {
                throw new IllegalStateException("CPU and RAM are required");
            }
            return new Computer(this);
        }
    }
}

// 使用：链式调用，清晰易读
Computer gamingPC = new Computer.Builder()
    .setCPU("Intel i9")
    .setRAM("32GB")
    .setStorage("1TB SSD")
    .setGPU("RTX 4090")
    .setWifi(true)
    .build();`}
            language="java"
            highlights={[19, 62]}
            filename="builder.java"
            description="建造者模式"
          />

          <SideNote label="Lombok @Builder">
            实际项目中可使用 Lombok 的 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">@Builder</code> 注解自动生成建造者代码，减少样板代码。
          </SideNote>

          <h2 id="prototype" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、原型模式 (Prototype)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：通过复制现有对象来创建新对象，避免重复初始化。适用于对象创建成本高或需要深拷贝的场景。
          </p>

          <Playground
            code={`// 原型接口
interface Prototype extends Cloneable {
    Prototype clone();
}

// 具体原型
class Document implements Prototype {
    private String title;
    private String content;
    private List<String> comments;
    
    public Document(String title, String content) {
        this.title = title;
        this.content = content;
        this.comments = new ArrayList<>();
    }
    
    // 深拷贝
    @Override
    public Document clone() {
        try {
            Document cloned = (Document) super.clone();
            // 深拷贝可变字段
            cloned.comments = new ArrayList<>(this.comments);
            return cloned;
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException(e);
        }
    }
    
    public void addComment(String comment) {
        comments.add(comment);
    }
}

// 使用
Document original = new Document("设计模式", "内容...");
original.addComment("注释1");

Document copy = original.clone();
copy.addComment("注释2");

System.out.println(original.getComments().size());  // 1
System.out.println(copy.getComments().size());      // 1`}
            language="java"
            highlights={[2, 7, 20, 37]}
            filename="prototype.java"
            description="原型模式"
          />

          <Callout type="warning" title="浅拷贝 vs 深拷贝">
            <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">Object.clone()</code> 默认是浅拷贝，对于引用类型字段，克隆对象和原对象共享同一引用。必须手动深拷贝可变对象（如 List、Map），否则修改克隆对象会影响原对象。
          </Callout>

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、创建型模式对比
          </h2>

          <table className="w-full border-collapse my-5 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep border-b border-border">
                <th className="text-left py-2 px-3 font-semibold text-ink">模式</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">适用场景</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">关键特征</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="py-2 px-3 font-medium text-ink">单例</td>
                <td className="py-2 px-3 text-ink-muted">全局唯一实例</td>
                <td className="py-2 px-3 text-ink-muted">私有构造器 + 静态方法</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-ink">工厂方法</td>
                <td className="py-2 px-3 text-ink-muted">创建单一产品，子类决定类型</td>
                <td className="py-2 px-3 text-ink-muted">继承 + 多态</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-ink">抽象工厂</td>
                <td className="py-2 px-3 text-ink-muted">创建一族相关产品</td>
                <td className="py-2 px-3 text-ink-muted">接口 + 产品族</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-ink">建造者</td>
                <td className="py-2 px-3 text-ink-muted">复杂对象，参数多且可选</td>
                <td className="py-2 px-3 text-ink-muted">链式调用 + 分步构建</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-ink">原型</td>
                <td className="py-2 px-3 text-ink-muted">对象创建成本高，需复制</td>
                <td className="py-2 px-3 text-ink-muted">Cloneable + 深拷贝</td>
              </tr>
            </tbody>
          </table>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区 1：单例等于全局变量">
            <p className="mb-2"><strong>错误认知</strong>：认为单例就是 public static 字段。</p>
            <p><strong>正确理解</strong>：单例通过私有构造器和受控访问点保证唯一性，支持懒加载和线程安全；全局变量无法控制实例化时机，且容易被意外修改。</p>
          </Callout>

          <Callout type="danger" title="误区 2：工厂模式一定比 new 好">
            <p className="mb-2"><strong>错误认知</strong>：认为所有对象创建都应该用工厂模式。</p>
            <p><strong>正确理解</strong>：简单的对象直接用 new 更清晰。工厂模式适用于：① 创建逻辑复杂；② 需要根据条件选择具体类；③ 需要统一管理对象生命周期。过度使用会增加代码复杂度。</p>
          </Callout>

          <Callout type="danger" title="误区 3：建造者模式只用于参数多的对象">
            <p className="mb-2"><strong>错误认知</strong>：认为只有构造函数参数超过 5 个才需要建造者。</p>
            <p><strong>正确理解</strong>：即使参数不多，如果对象构建过程有复杂的验证逻辑、默认值处理或步骤依赖，建造者模式也能提升可读性和安全性。</p>
          </Callout>

          <Callout type="warning" title="误区 4：原型模式只是 clone() 方法">
            <p className="mb-2"><strong>错误认知</strong>：认为实现 Cloneable 接口就是原型模式。</p>
            <p><strong>正确理解</strong>：原型模式的核心是深拷贝的正确实现。如果只是浅拷贝，可能导致克隆对象和原对象共享状态，引发 Bug。必须根据业务需求判断哪些字段需要深拷贝。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "单例模式的 DCL 为什么要加 volatile？",
              answer: "volatile 禁止指令重排序。new Singleton() 分为三步：① 分配内存；② 初始化对象；③ 将引用指向内存地址。如果没有 volatile，步骤 2 和 3 可能重排，导致其他线程在步骤 3 完成后但步骤 2 未完成时拿到未完全初始化的对象，访问其字段会出错。"
            },
            {
              question: "枚举单例为什么能防止反射和序列化破坏？",
              answer: "① 反射：Java 规范禁止通过反射创建枚举实例，Constructor.newInstance() 会抛出异常；② 序列化：枚举的序列化由 JVM 特殊处理，反序列化时直接返回已有的枚举常量，不会创建新实例。这是 Effective Java 推荐的最佳实践。"
            },
            {
              question: "工厂方法和抽象工厂的区别是什么？",
              answer: "工厂方法针对单一产品等级结构，通过继承实现，由子类决定创建哪个具体类；抽象工厂针对多个产品等级结构（产品族），通过组合实现，提供创建一系列相关对象的接口。抽象工厂内部可以使用工厂方法来实现各个产品的创建。"
            },
            {
              question: "建造者模式和工厂模式的区别？",
              answer: "建造者模式关注复杂对象的构建过程，允许分步构建、设置可选参数、进行验证，最终通过 build() 生成不可变对象；工厂模式关注根据条件选择合适的类进行实例化，一次性完成创建。建造者适合参数多且可选的对象，工厂适合需要根据上下文选择具体类型的场景。"
            },
            {
              question: "Spring 中哪些地方用到了创建型模式？",
              answer: "① 单例：Spring Bean 默认作用域是 singleton；② 工厂方法：BeanFactory 和 FactoryBean 接口；③ 抽象工厂：ApplicationContext 作为高级工厂；④ 建造者：UriComponentsBuilder、ResponseEntity.Builder 等；⑤ 原型：Prototype 作用域的 Bean 每次获取都创建新实例。"
            },
            {
              question: "如何实现线程安全的单例？有哪些方案？",
              answer: "① 饿汉式：static 字段直接初始化，线程安全但无法懒加载；② DCL：双重检查锁定 + volatile，线程安全且懒加载；③ 静态内部类：利用类加载机制保证线程安全，懒加载；④ 枚举：最安全，防止反射和序列化破坏；⑤ CAS：使用 AtomicReference 实现无锁单例（高性能场景）。推荐使用枚举或静态内部类。"
            },
            {
              question: "原型模式中深拷贝和浅拷贝的区别？如何选择？",
              answer: "浅拷贝只复制对象本身，引用类型字段仍指向原对象；深拷贝递归复制所有引用对象，形成独立的副本。选择原则：如果字段是不可变对象（String、Integer）或不需要独立修改，浅拷贝即可；如果字段是可变对象（List、Map、自定义对象）且需要独立修改，必须深拷贝。可通过序列化/反序列化实现通用深拷贝。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/09-design-patterns/design-pattern-intro" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">设计模式概述</div>
              <div className="text-[12px] text-ink-muted mt-1">SOLID 原则与设计模式分类</div>
            </a>
            <a href="/docs/09-design-patterns/structural-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">下一篇 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">结构型模式</div>
              <div className="text-[12px] text-ink-muted mt-1">代理、装饰器、适配器等</div>
            </a>
            <a href="/docs/09-design-patterns/behavioral-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">后续学习 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">行为型模式</div>
              <div className="text-[12px] text-ink-muted mt-1">策略、观察者、模板方法等</div>
            </a>
            <a href="/docs/01-java-core/reflection" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-orange mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-orange">反射机制</div>
              <div className="text-[12px] text-ink-muted mt-1">动态创建对象的基础</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            创建型模式是设计模式中最基础也最常用的一类。建议重点掌握单例（线程安全实现）、工厂方法（Spring 中的应用）和建造者（复杂对象构建）。阅读 Spring 源码时，注意观察这些模式的实际应用，加深理解。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
