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
  { id: 'principles', text: '一、SOLID 设计原则', level: 2 },
  { id: 'srp', text: '二、单一职责原则 (SRP)', level: 3 },
  { id: 'ocp', text: '三、开闭原则 (OCP)', level: 3 },
  { id: 'lsp', text: '四、里氏替换原则 (LSP)', level: 3 },
  { id: 'isp', text: '五、接口隔离原则 (ISP)', level: 3 },
  { id: 'dip', text: '六、依赖倒置原则 (DIP)', level: 3 },
  { id: 'classification', text: '七、设计模式分类', level: 2 },
  { id: 'when-to-use', text: '八、何时使用设计模式', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function DesignPatternIntro({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              设计模式是软件开发中<strong className="text-accent">可复用的解决方案模板</strong>，针对常见的设计问题提供经过验证的最佳实践，
              提升代码的可读性、可维护性和可扩展性。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么学习设计模式？">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>沟通效率</strong>：团队使用统一的术语（如"这里用单例"）</li>
              <li><strong>避免重复造轮子</strong>：前人已经解决过的问题无需重新思考</li>
              <li><strong>代码质量</strong>：遵循成熟的设计原则，减少 Bug</li>
              <li><strong>架构思维</strong>：从局部代码上升到系统设计层面</li>
            </ul>
          </Callout>

          <h2 id="principles" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、SOLID 设计原则
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            SOLID 是面向对象设计的五大基本原则，由 Robert C. Martin 提出，是所有设计模式的理论基础。
          </p>

          <DiagramBlock title="SOLID 原则关系图">
            {`graph TD
              SRP["SRP 单一职责：一个类只做一件事"] --> OCP["OCP 开闭原则：对扩展开放，对修改关闭"]
              OCP --> LSP["LSP 里氏替换"]
              OCP --> ISP["ISP 接口隔离"]
              OCP --> DIP["DIP 依赖倒置"]
            `}
          </DiagramBlock>

          <h3 id="srp" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            二、单一职责原则 (SRP)
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：一个类应该只有一个引起它变化的原因。如果一个类承担的职责过多，会导致耦合度高、难以维护。
          </p>

          <Playground
            code={`// ❌ 违反 SRP：用户类同时负责数据存储和业务逻辑
class UserService {
    public void saveUser(User user) {
        // 数据库操作
        Connection conn = DriverManager.getConnection(...);
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO users...");
        stmt.executeUpdate();
        
        // 发送欢迎邮件
        EmailService emailService = new EmailService();
        emailService.sendWelcomeEmail(user.getEmail());
        
        // 记录日志
        Logger.log("User created: " + user.getName());
    }
}

// ✅ 遵循 SRP：职责分离
class UserRepository {
    public void save(User user) {
        // 只负责数据持久化
    }
}

class EmailNotifier {
    public void sendWelcomeEmail(String email) {
        // 只负责发送邮件
    }
}

class UserLogger {
    public void logUserCreation(String userName) {
        // 只负责日志记录
    }
}

class UserService {
    private UserRepository repository;
    private EmailNotifier notifier;
    private UserLogger logger;
    
    public void createUser(User user) {
        repository.save(user);
        notifier.sendWelcomeEmail(user.getEmail());
        logger.logUserCreation(user.getName());
    }
}`}
            language="java"
            highlights={[2, 20, 26, 32, 38]}
            filename="srp-example.java"
            description="单一职责原则对比"
          />

          <SideNote label="SRP 的好处">
            当需求变化时（如更换数据库或邮件服务），只需修改对应的类，不会影响到其他职责的代码。这降低了修改的风险和测试的复杂度。
          </SideNote>

          <h3 id="ocp" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            三、开闭原则 (OCP)
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：软件实体应对扩展开放，对修改关闭。即新增功能时应通过添加新代码实现，而非修改已有代码。
          </p>

          <Playground
            code={`// ❌ 违反 OCP：每次新增支付方式都要修改现有代码
class PaymentProcessor {
    public void processPayment(String type, double amount) {
        if ("alipay".equals(type)) {
            // 支付宝支付逻辑
        } else if ("wechat".equals(type)) {
            // 微信支付逻辑
        } else if ("credit_card".equals(type)) {
            // 信用卡支付逻辑
        }
        // 新增银联支付？必须修改这个类！
    }
}

// ✅ 遵循 OCP：通过多态扩展
interface PaymentStrategy {
    void pay(double amount);
}

class AlipayStrategy implements PaymentStrategy {
    public void pay(double amount) {
        // 支付宝支付逻辑
    }
}

class WechatPayStrategy implements PaymentStrategy {
    public void pay(double amount) {
        // 微信支付逻辑
    }
}

class PaymentProcessor {
    public void processPayment(PaymentStrategy strategy, double amount) {
        strategy.pay(amount);  // 无需修改，直接扩展
    }
}

// 新增银联支付：只需新增类，无需修改已有代码
class UnionPayStrategy implements PaymentStrategy {
    public void pay(double amount) {
        // 银联支付逻辑
    }
}`}
            language="java"
            highlights={[2, 15, 28, 34, 42]}
            filename="ocp-example.java"
            description="开闭原则对比"
          />

          <h3 id="lsp" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            四、里氏替换原则 (LSP)
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：子类对象应能替换父类对象而不影响程序正确性。即继承关系中，子类不能削弱父类的功能约定。
          </p>

          <Playground
            code={`// ❌ 违反 LSP：正方形不是长方形的合适子类
class Rectangle {
    protected int width;
    protected int height;
    
    public void setWidth(int width) { this.width = width; }
    public void setHeight(int height) { this.height = height; }
    public int getArea() { return width * height; }
}

class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width;  // 破坏父类行为
    }
    
    @Override
    public void setHeight(int height) {
        this.width = height;  // 破坏父类行为
        this.height = height;
    }
}

// 调用方期望长方形行为，但传入正方形会出错
public void testRectangle(Rectangle rect) {
    rect.setWidth(5);
    rect.setHeight(10);
    System.out.println(rect.getArea());  // 期望 50，但 Square 返回 100
}

// ✅ 遵循 LSP：使用共同接口而非继承
interface Shape {
    int getArea();
}

class Rectangle implements Shape {
    private int width;
    private int height;
    
    public void setWidth(int width) { this.width = width; }
    public void setHeight(int height) { this.height = height; }
    public int getArea() { return width * height; }
}

class Square implements Shape {
    private int side;
    
    public void setSide(int side) { this.side = side; }
    public int getArea() { return side * side; }
}`}
            language="java"
            highlights={[2, 11, 28, 35, 43]}
            filename="lsp-example.java"
            description="里氏替换原则对比"
          />

          <Callout type="warning" title="LSP 的关键点">
            如果子类重写了父类方法并改变了原有语义（如抛出异常、返回不同结果），就违反了 LSP。设计时应优先使用组合而非继承。
          </Callout>

          <h3 id="isp" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            五、接口隔离原则 (ISP)
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：客户端不应被迫依赖于它不使用的方法。应将臃肿的接口拆分为更小、更具体的接口。
          </p>

          <Playground
            code={`// ❌ 违反 ISP：多功能打印机接口
interface MultiFunctionPrinter {
    void print();
    void scan();
    void fax();
    void copy();
}

// 简单打印机被迫实现不需要的方法
class SimplePrinter implements MultiFunctionPrinter {
    public void print() { /* 支持 */ }
    public void scan() { throw new UnsupportedOperationException(); }  // 不支持
    public void fax() { throw new UnsupportedOperationException(); }   // 不支持
    public void copy() { throw new UnsupportedOperationException(); }  // 不支持
}

// ✅ 遵循 ISP：拆分接口
interface Printable {
    void print();
}

interface Scannable {
    void scan();
}

interface Faxable {
    void fax();
}

interface Copyable {
    void copy();
}

class SimplePrinter implements Printable {
    public void print() { /* 只实现需要的功能 */ }
}

class AllInOnePrinter implements Printable, Scannable, Faxable, Copyable {
    public void print() { /* ... */ }
    public void scan() { /* ... */ }
    public void fax() { /* ... */ }
    public void copy() { /* ... */ }
}`}
            language="java"
            highlights={[2, 10, 20, 34, 38]}
            filename="isp-example.java"
            description="接口隔离原则对比"
          />

          <h3 id="dip" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            六、依赖倒置原则 (DIP)
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：高层模块不应依赖低层模块，二者都应依赖抽象；抽象不应依赖细节，细节应依赖抽象。
          </p>

          <Playground
            code={`// ❌ 违反 DIP：高层直接依赖低层实现
class MySQLDatabase {
    public void connect() { System.out.println("Connecting to MySQL"); }
    public void query(String sql) { System.out.println("Querying MySQL"); }
}

class OrderService {
    private MySQLDatabase database = new MySQLDatabase();  // 硬编码依赖
    
    public void createOrder(Order order) {
        database.connect();
        database.query("INSERT INTO orders...");
    }
}
// 想换成 PostgreSQL？必须修改 OrderService！

// ✅ 遵循 DIP：依赖抽象接口
interface Database {
    void connect();
    void query(String sql);
}

class MySQLDatabase implements Database {
    public void connect() { System.out.println("Connecting to MySQL"); }
    public void query(String sql) { System.out.println("Querying MySQL"); }
}

class PostgreSQLDatabase implements Database {
    public void connect() { System.out.println("Connecting to PostgreSQL"); }
    public void query(String sql) { System.out.println("Querying PostgreSQL"); }
}

class OrderService {
    private Database database;  // 依赖抽象
    
    public OrderService(Database database) {
        this.database = database;  // 通过构造器注入
    }
    
    public void createOrder(Order order) {
        database.connect();
        database.query("INSERT INTO orders...");
    }
}

// 使用时可以灵活切换
OrderService service1 = new OrderService(new MySQLDatabase());
OrderService service2 = new OrderService(new PostgreSQLDatabase());`}
            language="java"
            highlights={[2, 7, 18, 32, 38]}
            filename="dip-example.java"
            description="依赖倒置原则对比"
          />

          <SideNote label="DIP 与 Spring IOC">
            Spring 框架的核心就是 DIP 的实践。通过 @Autowired 注入接口而非具体实现，实现了控制反转（IoC）和依赖注入（DI）。
          </SideNote>

          <h2 id="classification" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、设计模式分类
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            GoF（Gang of Four）在《设计模式：可复用面向对象软件的基础》一书中定义了 23 种经典设计模式，分为三大类：
          </p>

          <DiagramBlock title="设计模式分类图谱">
            {`graph TD
              DP["设计模式 23种"]
              DP --> CRE["创建型 Creational<br/>关注对象的创建方式"]
              DP --> STR["结构型 Structural<br/>关注类和对象的组合"]
              DP --> BEH["行为型 Behavioral<br/>关注对象间的通信和职责分配"]
              CRE --> S1["单例模式 Singleton"]
              CRE --> S2["工厂方法 Factory Method"]
              CRE --> S3["抽象工厂 Abstract Factory"]
              CRE --> S4["建造者模式 Builder"]
              CRE --> S5["原型模式 Prototype"]
              STR --> T1["代理模式 Proxy"]
              STR --> T2["装饰器模式 Decorator"]
              STR --> T3["适配器模式 Adapter"]
              STR --> T4["外观模式 Facade"]
              STR --> T5["桥接模式 Bridge"]
              STR --> T6["组合模式 Composite"]
              STR --> T7["享元模式 Flyweight"]
              BEH --> B1["策略模式 Strategy"]
              BEH --> B2["观察者模式 Observer"]
              BEH --> B3["模板方法 Template Method"]
              BEH --> B4["责任链模式 Chain of Responsibility"]
              BEH --> B5["状态模式 State"]
              BEH --> B6["命令模式 Command"]
              BEH --> B7["迭代器模式 Iterator"]
              BEH --> B8["中介者模式 Mediator"]
              BEH --> B9["备忘录模式 Memento"]
              BEH --> B10["访问者模式 Visitor"]
              BEH --> B11["解释器模式 Interpreter"]
            `}
          </DiagramBlock>

          <Callout type="info" title="各类模式的核心目标">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>创建型</strong>：解耦对象的创建和使用，提高灵活性</li>
              <li><strong>结构型</strong>：通过组合简化复杂系统的结构，提高可维护性</li>
              <li><strong>行为型</strong>：优化对象间的交互方式，提高扩展性</li>
            </ul>
          </Callout>

          <h2 id="when-to-use" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、何时使用设计模式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            设计模式不是银弹，过度使用会导致代码复杂度上升。以下是适用的场景判断标准：
          </p>

          <table className="w-full border-collapse my-5 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep border-b border-border">
                <th className="text-left py-2 px-3 font-semibold text-ink">场景</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">推荐做法</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="py-2 px-3 text-ink-muted">代码重复出现相似结构</td>
                <td className="py-2 px-3 text-ink">考虑提取为模式（如工厂、策略）</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-ink-muted">频繁修改同一类</td>
                <td className="py-2 px-3 text-ink">应用开闭原则，使用策略或模板方法</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-ink-muted">对象创建逻辑复杂</td>
                <td className="py-2 px-3 text-ink">使用工厂或建造者模式</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-ink-muted">需要全局唯一实例</td>
                <td className="py-2 px-3 text-ink">使用单例模式（注意线程安全）</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-ink-muted">对象间耦合度过高</td>
                <td className="py-2 px-3 text-ink">使用观察者、中介者或命令模式解耦</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-ink-muted">简单的 CRUD 操作</td>
                <td className="py-2 px-3 text-ink text-red-600">❌ 不要强行套用模式</td>
              </tr>
            </tbody>
          </table>

          <Callout type="warning" title="避免过度设计">
            <p className="mb-2"><strong>反模式</strong>：为了使用模式而使用模式，导致简单问题复杂化。</p>
            <p><strong>正确做法</strong>：先写出清晰的代码，当发现重复模式或扩展困难时，再考虑重构引入设计模式。</p>
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1：设计模式越多越好">
            <p className="mb-2"><strong>错误认知</strong>：认为代码中使用的设计模式数量代表技术水平。</p>
            <p><strong>正确理解</strong>：设计模式的目标是简化问题而非增加复杂度。优秀的代码往往是"无模式胜有模式"——自然流畅地解决问题，而非生硬套用模板。</p>
          </Callout>

          <Callout type="danger" title="误区 2：所有项目都需要设计模式">
            <p className="mb-2"><strong>错误认知</strong>：即使是小型项目也要严格遵循所有设计原则。</p>
            <p><strong>正确理解</strong>：设计模式适用于中大型项目或长期维护的系统。对于一次性脚本或原型项目，快速实现比完美架构更重要。</p>
          </Callout>

          <Callout type="danger" title="误区 3：死记硬背 UML 图">
            <p className="mb-2"><strong>错误认知</strong>：认为记住每个模式的 UML 类图就能掌握设计模式。</p>
            <p><strong>正确理解</strong>：UML 只是表达工具，关键是理解模式解决的问题场景和权衡取舍。应通过实际代码练习来内化模式思想。</p>
          </Callout>

          <Callout type="warning" title="误区 4：忽略语言特性">
            <p className="mb-2"><strong>错误认知</strong>：将 Java 的设计模式直接套用到 Python 或 JavaScript。</p>
            <p><strong>正确理解</strong>：不同语言有不同的惯用法。例如 Python 的 decorator 语法糖天然支持装饰器模式，无需像 Java 那样编写大量样板代码。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "请解释 SOLID 原则中的每一个字母代表的含义",
              answer: "S - Single Responsibility Principle（单一职责）：一个类只负责一项职责。O - Open/Closed Principle（开闭原则）：对扩展开放，对修改关闭。L - Liskov Substitution Principle（里氏替换）：子类可以替换父类。I - Interface Segregation Principle（接口隔离）：接口应尽量小而专一。D - Dependency Inversion Principle（依赖倒置）：依赖抽象而非具体实现。"
            },
            {
              question: "开闭原则和依赖倒置原则有什么区别？",
              answer: "开闭原则强调通过扩展而非修改来增加新功能，侧重于行为的扩展性；依赖倒置原则强调高层和低层模块都依赖抽象，侧重于降低耦合度。两者相辅相成：DIP 是实现 OCP 的重要手段之一。"
            },
            {
              question: "什么情况下不应该使用设计模式？",
              answer: "① 问题很简单，直接实现即可；② 团队不熟悉该模式，强行使用会增加维护成本；③ 性能敏感场景，某些模式（如装饰器）可能引入额外开销；④ 原型开发阶段，优先考虑快速迭代而非架构完美。"
            },
            {
              question: "如何在实际项目中识别需要应用设计模式的时机？",
              answer: "① 发现代码重复（DRY 原则被违反）；② 某个类频繁修改（违反 OCP）；③ 条件分支过多（if-else 嵌套超过 3 层）；④ 对象创建逻辑复杂且分散；⑤ 模块间耦合度过高，牵一发而动全身。这些信号表明可以考虑引入相应的设计模式进行重构。"
            },
            {
              question: "Spring 框架中使用了哪些设计模式？举例说明",
              answer: "① 单例模式：Spring Bean 默认是单例；② 工厂模式：BeanFactory 创建 Bean；③ 代理模式：AOP 使用 JDK 动态代理或 CGLIB；④ 模板方法：JdbcTemplate 封装 JDBC 操作流程；⑤ 观察者模式：ApplicationEvent 事件机制；⑥ 适配器模式：HandlerAdapter 适配不同类型的 Controller。"
            },
            {
              question: "里氏替换原则在实际开发中如何保证？",
              answer: "① 子类不应重写父类的非抽象方法；② 子类可以增加新方法，但不能改变父方法的语义；③ 子类方法的 Preconditions 不能比父类更严格；④ 子类方法的 Postconditions 不能比父类更宽松；⑤ 优先使用组合而非继承。可以通过单元测试验证子类是否能完全替代父类。"
            },
            {
              question: "接口隔离原则和单一职责原则的区别是什么？",
              answer: "SRP 关注的是类的职责划分，强调一个类只做一件事；ISP 关注的是接口的粒度，强调接口应尽可能小且专一。SRP 是类级别的设计原则，ISP 是接口级别的设计原则。两者都旨在降低耦合度，但作用层面不同。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/09-design-patterns/creational-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">下一篇 →</div>
              <div className="font-semibold text-ink group-hover:text-teal">创建型模式</div>
              <div className="text-[12px] text-ink-muted mt-1">单例、工厂、建造者等</div>
            </a>
            <a href="/docs/09-design-patterns/structural-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">后续学习 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">结构型模式</div>
              <div className="text-[12px] text-ink-muted mt-1">代理、装饰器、适配器等</div>
            </a>
            <a href="/docs/09-design-patterns/behavioral-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">后续学习 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">行为型模式</div>
              <div className="text-[12px] text-ink-muted mt-1">策略、观察者、模板方法等</div>
            </a>
            <a href="/docs/01-java-core/reflection" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-orange mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-orange">反射机制</div>
              <div className="text-[12px] text-ink-muted mt-1">动态代理的实现基础</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            设计模式的学习路径建议：① 先理解 SOLID 原则（本文）；② 逐个学习 23 种模式，重点掌握常用的 10 种左右；③ 阅读开源框架源码（如 Spring、JDK），观察模式的实际应用；④ 在自己的项目中尝试重构，将模式内化为编程直觉。切忌死记硬背，重在理解思想。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
