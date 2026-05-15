import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as s}from"./SideNote-BKvanovA.js";import{C as t,A as d,S as o}from"./ArticleNav-DhfiS38Y.js";import{D as l}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"strategy",text:"一、策略模式 (Strategy)",level:2},{id:"observer",text:"二、观察者模式 (Observer)",level:2},{id:"template-method",text:"三、模板方法 (Template Method)",level:2},{id:"chain-of-responsibility",text:"四、责任链模式 (Chain of Responsibility)",level:2},{id:"state",text:"五、状态模式 (State)",level:2},{id:"command",text:"六、命令模式 (Command)",level:2},{id:"iterator",text:"七、迭代器模式 (Iterator)",level:2},{id:"mediator",text:"八、中介者模式 (Mediator)",level:2},{id:"comparison",text:"九、行为型模式对比",level:2},{id:"misconceptions",text:"十、常见误区",level:2},{id:"interview",text:"十一、面试真题",level:2},{id:"related",text:"十二、知识关联",level:2}];function y({meta:i}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(a,{meta:i,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["行为型模式关注",e.jsx("strong",{className:"text-accent",children:"对象之间的通信和职责分配"}),"，优化对象间的交互方式，提高系统的灵活性和可维护性。"]})}),e.jsx(t,{type:"tip",title:"为什么需要行为型模式？",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"解耦"}),"：降低对象间的耦合度，提高独立性"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"扩展"}),"：新增行为时无需修改现有代码"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"复用"}),"：提取公共行为，避免代码重复"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"清晰"}),"：明确对象职责，提高代码可读性"]})]})}),e.jsx("h2",{id:"strategy",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、策略模式 (Strategy)"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"核心思想"}),"：定义一系列算法，将每个算法封装起来，并使它们可以相互替换。客户端可以根据需要选择不同的算法。"]}),e.jsx(r,{code:`// 策略接口
interface PaymentStrategy {
    void pay(double amount);
}

// 具体策略
class AlipayStrategy implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("使用支付宝支付: ¥" + amount);
    }
}

class WechatPayStrategy implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("使用微信支付: ¥" + amount);
    }
}

class CreditCardStrategy implements PaymentStrategy {
    private String cardNumber;
    
    public CreditCardStrategy(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    public void pay(double amount) {
        System.out.println("使用信用卡支付: ¥" + amount + ", 卡号: " + cardNumber);
    }
}

// 上下文
class ShoppingCart {
    private PaymentStrategy strategy;
    
    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void checkout(double amount) {
        if (strategy == null) {
            throw new IllegalStateException("请设置支付方式");
        }
        strategy.pay(amount);
    }
}

// 使用：运行时切换策略
ShoppingCart cart = new ShoppingCart();
cart.setPaymentStrategy(new AlipayStrategy());
cart.checkout(100.0);  // 使用支付宝支付: ¥100.0

cart.setPaymentStrategy(new WechatPayStrategy());
cart.checkout(200.0);  // 使用微信支付: ¥200.0`,language:"java",highlights:[2,7,13,20,34,51],filename:"strategy.java",description:"策略模式"}),e.jsx(s,{label:"Spring 中的策略模式",children:"Spring Security 中的 AuthenticationProvider、Spring MVC 中的 ViewResolver 都使用了策略模式。通过 @Autowired 注入 List<Strategy>，可以根据条件选择合适的策略实现。"}),e.jsx("h2",{id:"observer",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、观察者模式 (Observer)"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"核心思想"}),"：定义对象间的一对多依赖关系，当一个对象状态改变时，所有依赖它的对象都会收到通知并自动更新。"]}),e.jsx(r,{code:`import java.util.*;

// 观察者接口
interface Observer {
    void update(String event);
}

// 被观察者（主题）
class EventSource {
    private List<Observer> observers = new ArrayList<>();
    
    public void addObserver(Observer observer) {
        observers.add(observer);
    }
    
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }
    
    public void notifyObservers(String event) {
        for (Observer observer : observers) {
            observer.update(event);
        }
    }
    
    public void doSomething() {
        System.out.println("执行操作...");
        notifyObservers("操作完成");
    }
}

// 具体观察者
class EmailNotifier implements Observer {
    public void update(String event) {
        System.out.println("[邮件通知] " + event);
    }
}

class SmsNotifier implements Observer {
    public void update(String event) {
        System.out.println("[短信通知] " + event);
    }
}

// 使用
EventSource source = new EventSource();
source.addObserver(new EmailNotifier());
source.addObserver(new SmsNotifier());
source.doSomething();
// 执行操作...
// [邮件通知] 操作完成
// [短信通知] 操作完成`,language:"java",highlights:[4,9,34,40,47],filename:"observer.java",description:"观察者模式"}),e.jsx(l,{title:"观察者模式 UML 图",children:`classDiagram
              class Subject {
                <<interface>>
                +attach()
                +detach()
                +notify()
              }
              class Observer {
                <<interface>>
                +update()
              }
              class EventSource {
                +attach()
                +detach()
                +notify()
              }
              class EmailNotifier {
                +update()
              }
              class SmsNotifier {
                +update()
              }
              Subject <|.. EventSource
              Observer <|.. EmailNotifier
              Observer <|.. SmsNotifier
              EventSource o-- Observer
            `}),e.jsx("h2",{id:"template-method",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、模板方法 (Template Method)"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"核心思想"}),"：定义一个操作的算法骨架，将一些步骤延迟到子类中实现，使子类可以不改变算法结构即可重新定义某些步骤。"]}),e.jsx(r,{code:`// 抽象类：定义模板方法
abstract class DataProcessor {
    // 模板方法：定义算法骨架（final 防止子类修改）
    public final void process() {
        loadData();
        transformData();
        saveData();
    }
    
    // 具体方法：所有子类共用
    private void loadData() {
        System.out.println("加载数据...");
    }
    
    // 抽象方法：由子类实现
    protected abstract void transformData();
    
    // 钩子方法：子类可选覆盖
    protected void saveData() {
        System.out.println("保存数据到默认位置");
    }
}

// 具体实现：CSV 处理
class CsvProcessor extends DataProcessor {
    protected void transformData() {
        System.out.println("解析 CSV 格式");
    }
    
    protected void saveData() {
        System.out.println("保存到数据库");
    }
}

// 具体实现：JSON 处理
class JsonProcessor extends DataProcessor {
    protected void transformData() {
        System.out.println("解析 JSON 格式");
    }
    // 使用默认的 saveData
}

// 使用
DataProcessor csv = new CsvProcessor();
csv.process();
// 加载数据...
// 解析 CSV 格式
// 保存到数据库

DataProcessor json = new JsonProcessor();
json.process();
// 加载数据...
// 解析 JSON 格式
// 保存数据到默认位置`,language:"java",highlights:[2,4,16,20,26,35],filename:"template-method.java",description:"模板方法模式"}),e.jsx(t,{type:"info",title:"好莱坞原则",children:'模板方法遵循"不要调用我们，我们会调用你"的好莱坞原则。父类控制整体流程，在适当的时候调用子类的方法。这与策略模式不同：策略是客户端主动选择策略，模板方法是框架自动调用子类。'}),e.jsx("h2",{id:"chain-of-responsibility",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、责任链模式 (Chain of Responsibility)"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"核心思想"}),"：将请求沿着处理者链传递，直到有一个处理者处理它。解耦请求发送者和接收者。"]}),e.jsx(r,{code:`// 处理者接口
interface Handler {
    void setNext(Handler handler);
    void handleRequest(String request);
}

// 抽象处理者
abstract class AbstractHandler implements Handler {
    protected Handler nextHandler;
    
    public void setNext(Handler handler) {
        this.nextHandler = handler;
    }
    
    public void handleRequest(String request) {
        if (canHandle(request)) {
            process(request);
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        } else {
            System.out.println("无法处理: " + request);
        }
    }
    
    protected abstract boolean canHandle(String request);
    protected abstract void process(String request);
}

// 具体处理者
class AuthHandler extends AbstractHandler {
    protected boolean canHandle(String request) {
        return request.startsWith("AUTH:");
    }
    
    protected void process(String request) {
        System.out.println("身份验证: " + request);
    }
}

class ValidationHandler extends AbstractHandler {
    protected boolean canHandle(String request) {
        return request.startsWith("VALID:");
    }
    
    protected void process(String request) {
        System.out.println("数据校验: " + request);
    }
}

class BusinessHandler extends AbstractHandler {
    protected boolean canHandle(String request) {
        return request.startsWith("BUSINESS:");
    }
    
    protected void process(String request) {
        System.out.println("业务处理: " + request);
    }
}

// 使用：构建责任链
Handler auth = new AuthHandler();
Handler validation = new ValidationHandler();
Handler business = new BusinessHandler();

auth.setNext(validation);
validation.setNext(business);

// 请求会沿着链传递，直到找到能处理的节点
auth.handleRequest("AUTH:login");       // 身份验证: AUTH:login
auth.handleRequest("VALID:data");       // 数据校验: VALID:data
auth.handleRequest("BUSINESS:order");   // 业务处理: BUSINESS:order
auth.handleRequest("UNKNOWN:test");     // 无法处理: UNKNOWN:test`,language:"java",highlights:[2,8,31,39,47,58],filename:"chain-of-responsibility.java",description:"责任链模式"}),e.jsx(s,{label:"Spring Interceptor",children:"Spring MVC 的拦截器链就是责任链模式的典型应用。多个 HandlerInterceptor 按顺序执行，每个拦截器可以决定是否继续传递请求。Filter 链也是类似的机制。"}),e.jsx("h2",{id:"state",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、状态模式 (State)"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"核心思想"}),"：允许对象在内部状态改变时改变其行为，看起来像是改变了对象的类。将状态转换逻辑分散到各个状态类中。"]}),e.jsx(r,{code:`// 状态接口
interface OrderState {
    void pay(OrderContext context);
    void ship(OrderContext context);
    void deliver(OrderContext context);
    String getStateName();
}

// 上下文
class OrderContext {
    private OrderState state;
    
    public OrderContext() {
        this.state = new CreatedState();  // 初始状态
    }
    
    public void setState(OrderState state) {
        this.state = state;
        System.out.println("状态变更: " + state.getStateName());
    }
    
    public void pay() { state.pay(this); }
    public void ship() { state.ship(this); }
    public void deliver() { state.deliver(this); }
}

// 具体状态
class CreatedState implements OrderState {
    public void pay(OrderContext context) {
        System.out.println("支付成功");
        context.setState(new PaidState());
    }
    public void ship(OrderContext context) {
        System.out.println("订单未支付，无法发货");
    }
    public void deliver(OrderContext context) {
        System.out.println("订单未支付，无法配送");
    }
    public String getStateName() { return "已创建"; }
}

class PaidState implements OrderState {
    public void pay(OrderContext context) {
        System.out.println("订单已支付");
    }
    public void ship(OrderContext context) {
        System.out.println("发货成功");
        context.setState(new ShippedState());
    }
    public void deliver(OrderContext context) {
        System.out.println("订单未发货，无法配送");
    }
    public String getStateName() { return "已支付"; }
}

class ShippedState implements OrderState {
    public void pay(OrderContext context) {
        System.out.println("订单已支付");
    }
    public void ship(OrderContext context) {
        System.out.println("订单已发货");
    }
    public void deliver(OrderContext context) {
        System.out.println("配送成功");
        context.setState(new DeliveredState());
    }
    public String getStateName() { return "已发货"; }
}

class DeliveredState implements OrderState {
    public void pay(OrderContext context) { System.out.println("订单已完成"); }
    public void ship(OrderContext context) { System.out.println("订单已完成"); }
    public void deliver(OrderContext context) { System.out.println("订单已完成"); }
    public String getStateName() { return "已送达"; }
}

// 使用
OrderContext order = new OrderContext();
order.pay();     // 支付成功 → 状态变更: 已支付
order.ship();    // 发货成功 → 状态变更: 已发货
order.deliver(); // 配送成功 → 状态变更: 已送达
order.pay();     // 订单已完成`,language:"java",highlights:[2,10,28,42,54,66,73],filename:"state.java",description:"状态模式"}),e.jsx(t,{type:"warning",title:"状态模式 vs 策略模式",children:"两者结构相似但意图不同：策略模式中客户端主动选择策略，各策略之间无关联；状态模式中状态转换由上下文或状态自己控制，状态之间有明确的转换关系。状态模式强调状态的流转，策略模式强调算法的替换。"}),e.jsx("h2",{id:"command",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、命令模式 (Command)"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"核心思想"}),"：将请求封装为对象，从而支持参数化、队列化、日志化请求，以及撤销操作。"]}),e.jsx(r,{code:`// 命令接口
interface Command {
    void execute();
    void undo();
}

// 接收者
class Light {
    public void turnOn() { System.out.println("灯亮了"); }
    public void turnOff() { System.out.println("灯灭了"); }
}

class Fan {
    public void turnOn() { System.out.println("风扇转了"); }
    public void turnOff() { System.out.println("风扇停了"); }
}

// 具体命令
class LightOnCommand implements Command {
    private Light light;
    
    public LightOnCommand(Light light) {
        this.light = light;
    }
    
    public void execute() { light.turnOn(); }
    public void undo() { light.turnOff(); }
}

class FanOffCommand implements Command {
    private Fan fan;
    
    public FanOffCommand(Fan fan) {
        this.fan = fan;
    }
    
    public void execute() { fan.turnOff(); }
    public void undo() { fan.turnOn(); }
}

// 调用者
class RemoteControl {
    private List<Command> commandHistory = new ArrayList<>();
    
    public void pressButton(Command command) {
        command.execute();
        commandHistory.add(command);
    }
    
    public void pressUndo() {
        if (!commandHistory.isEmpty()) {
            Command lastCommand = commandHistory.remove(commandHistory.size() - 1);
            lastCommand.undo();
        }
    }
}

// 使用
Light light = new Light();
Fan fan = new Fan();
RemoteControl remote = new RemoteControl();

remote.pressButton(new LightOnCommand(light));  // 灯亮了
remote.pressButton(new FanOffCommand(fan));     // 风扇停了
remote.pressUndo();                              // 风扇转了（撤销）
remote.pressUndo();                              // 灯灭了（撤销）`,language:"java",highlights:[2,8,13,19,31,43,59],filename:"command.java",description:"命令模式"}),e.jsx(s,{label:"应用场景",children:"命令模式适用于：① 需要支持撤销/重做操作（如文本编辑器）；② 需要将操作排队或记录日志；③ 需要支持事务操作；④ 需要解耦请求发送者和接收者（如 GUI 按钮与业务逻辑）。"}),e.jsx("h2",{id:"iterator",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、迭代器模式 (Iterator)"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"核心思想"}),"：提供一种方法顺序访问聚合对象中的元素，而不暴露其内部表示。Java 集合框架广泛使用该模式。"]}),e.jsx(r,{code:`// 迭代器接口
interface Iterator<T> {
    boolean hasNext();
    T next();
}

// 聚合接口
interface Aggregate<T> {
    Iterator<T> iterator();
}

// 自定义容器
class MyList<T> implements Aggregate<T> {
    private Object[] elements = new Object[10];
    private int size = 0;
    
    public void add(T element) {
        elements[size++] = element;
    }
    
    public Iterator<T> iterator() {
        return new MyListIterator();
    }
    
    // 内部类实现迭代器
    private class MyListIterator implements Iterator<T> {
        private int currentIndex = 0;
        
        public boolean hasNext() {
            return currentIndex < size;
        }
        
        @SuppressWarnings("unchecked")
        public T next() {
            if (!hasNext()) throw new NoSuchElementException();
            return (T) elements[currentIndex++];
        }
    }
}

// 使用
MyList<String> list = new MyList<>();
list.add("Java");
list.add("Python");
list.add("Go");

Iterator<String> it = list.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}
// Java
// Python
// Go

// 或使用增强 for 循环（底层也是迭代器）
for (String item : list) {
    System.out.println(item);
}`,language:"java",highlights:[2,8,13,26,44],filename:"iterator.java",description:"迭代器模式"}),e.jsx(t,{type:"info",title:"Java 内置支持",children:"Java 提供了 Iterator 接口和 Iterable 接口，任何实现 Iterable 的类都可以使用增强 for 循环。ArrayList、HashSet、HashMap 等集合类都实现了迭代器模式。"}),e.jsx("h2",{id:"mediator",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、中介者模式 (Mediator)"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"核心思想"}),"：用一个中介对象封装一系列对象交互，使各对象不需要显式地相互引用，从而降低耦合度。"]}),e.jsx(r,{code:`// 中介者接口
interface ChatMediator {
    void sendMessage(String message, User user);
    void addUser(User user);
}

// 用户类
class User {
    private String name;
    private ChatMediator mediator;
    
    public User(String name, ChatMediator mediator) {
        this.name = name;
        this.mediator = mediator;
    }
    
    public void send(String message) {
        System.out.println(name + " 发送: " + message);
        mediator.sendMessage(message, this);
    }
    
    public void receive(String message) {
        System.out.println(name + " 接收: " + message);
    }
    
    public String getName() { return name; }
}

// 具体中介者
class ChatRoom implements ChatMediator {
    private List<User> users = new ArrayList<>();
    
    public void addUser(User user) {
        users.add(user);
    }
    
    public void sendMessage(String message, User sender) {
        for (User user : users) {
            if (user != sender) {  // 不发送给自已
                user.receive(message);
            }
        }
    }
}

// 使用
ChatMediator chatRoom = new ChatRoom();

User user1 = new User("张三", chatRoom);
User user2 = new User("李四", chatRoom);
User user3 = new User("王五", chatRoom);

chatRoom.addUser(user1);
chatRoom.addUser(user2);
chatRoom.addUser(user3);

user1.send("大家好！");
// 张三 发送: 大家好！
// 李四 接收: 大家好！
// 王五 接收: 大家好！`,language:"java",highlights:[2,8,30,48],filename:"mediator.java",description:"中介者模式"}),e.jsx(s,{label:"MVC 与中介者",children:"MVC 架构中的 Controller 就是中介者，它协调 Model 和 View 的交互，使 Model 和 View 不直接依赖对方。Spring MVC 的 DispatcherServlet 就是典型的中介者。"}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、行为型模式对比"}),e.jsxs("table",{className:"w-full border-collapse my-5 text-[13px] sm:text-[14px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep border-b border-border",children:[e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"模式"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"核心目的"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"关键特征"})]})}),e.jsxs("tbody",{className:"divide-y divide-border-light",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"策略"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"算法可替换"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"封装算法，运行时切换"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"观察者"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"事件通知"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"一对多依赖，自动通知"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"模板方法"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"固定算法骨架"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"继承 + 钩子方法"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"责任链"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"请求传递"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"链式处理，解耦发送者和接收者"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"状态"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"状态驱动行为"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"状态对象，自动转换"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"命令"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"请求封装"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"支持撤销、队列、日志"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"迭代器"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"遍历集合"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"统一遍历接口"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-3 font-medium text-ink",children:"中介者"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"集中协调"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"星型拓扑，降低耦合"})]})]})]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：策略模式和状态模式一样",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为两者都是封装行为，所以没有区别。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),'：策略模式中客户端主动选择策略，策略之间无关联；状态模式中状态转换由上下文或状态自己控制，状态之间有明确的转换顺序。策略关注"怎么做"，状态关注"何时做"。']})]}),e.jsxs(t,{type:"danger",title:"误区 2：观察者模式就是发布订阅",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为观察者和发布订阅是完全相同的模式。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：观察者模式中主题直接通知观察者，两者紧耦合；发布订阅通过消息代理（Broker）解耦发布者和订阅者。观察者适合单机事件处理，发布订阅适合分布式系统。"]})]}),e.jsxs(t,{type:"danger",title:"误区 3：模板方法违反开闭原则",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为新增行为需要修改抽象类。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：模板方法通过将可变部分抽象为抽象方法或钩子方法，使子类可以在不修改父类的情况下扩展行为。这正是开闭原则的体现：对扩展开放（新增子类），对修改关闭（不修改父类）。"]})]}),e.jsxs(t,{type:"warning",title:"误区 4：命令模式只用于撤销功能",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为命令模式的主要用途是实现撤销/重做。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：撤销只是命令模式的应用之一。命令模式的核心价值在于将请求封装为对象，支持参数化、队列化、日志化、事务等操作。例如线程池中的任务队列、宏命令、异步处理等都用到命令模式。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、面试真题"}),e.jsx(m,{questions:[{question:"策略模式和模板方法模式的区别？",answer:"① 实现方式：策略使用组合，模板方法使用继承；② 选择时机：策略在运行时由客户端选择，模板方法在编译时确定；③ 粒度：策略封装整个算法，模板方法只封装算法的部分步骤；④ 灵活性：策略更灵活，可以动态切换；模板方法更简单，适合算法骨架固定的场景。"},{question:"Spring 事件机制是如何实现的？",answer:"Spring 事件机制基于观察者模式实现。核心组件：① ApplicationEvent（事件）；② ApplicationListener（监听器/观察者）；③ ApplicationEventPublisher（发布者/主题）。当发布事件时，Spring 遍历所有匹配的监听器并调用其 onApplicationEvent 方法。Spring 4.2+ 支持 @EventListener 注解简化监听器注册。"},{question:"如何实现一个线程安全的观察者模式？",answer:"① 使用 CopyOnWriteArrayList 存储观察者列表，避免并发修改异常；② 通知时使用同步块或 ReentrantLock；③ 异步通知可以使用线程池或 CompletableFuture；④ 注意避免死锁：不要在观察者回调中同步调用其他观察者。Spring 的 ApplicationEventMulticaster 支持同步和异步两种通知方式。"},{question:"责任链模式中，如果没有任何处理者能处理请求怎么办？",answer:"有三种处理方式：① 在链末尾添加默认处理者，记录日志或返回错误信息；② 抛出异常，由上层捕获处理；③ 返回 null 或 Optional.empty()。实际项目中通常采用第一种方式，确保每个请求都有响应，避免请求丢失。"},{question:"状态模式和状态机有什么区别？",answer:"状态模式是状态机的面向对象实现。传统状态机用 switch-case 或表格实现，状态转换逻辑集中；状态模式将状态转换逻辑分散到各个状态类中，更符合开闭原则。对于复杂的状态机，状态模式更易维护和扩展；对于简单状态机，传统实现更简洁。"},{question:"命令模式如何实现事务？",answer:"将每个操作封装为命令对象，命令接口包含 execute() 和 undo() 方法。执行命令时将命令加入历史栈，如果后续命令失败，依次调用历史栈中命令的 undo() 方法回滚。关键是确保每个命令的 undo() 能正确撤销 execute() 的效果。这种方式适合简单的补偿事务，复杂场景应使用数据库事务或分布式事务框架。"},{question:"迭代器模式中，如何在遍历时安全删除元素？",answer:"使用迭代器的 remove() 方法而非集合的 remove() 方法。例如：Iterator it = list.iterator(); while (it.hasNext()) { if (shouldRemove(it.next())) { it.remove(); } }。直接使用 list.remove() 会导致 ConcurrentModificationException。Java 8+ 也可以使用 removeIf() 方法：list.removeIf(predicate)。"},{question:"中介者模式和观察者模式的区别？",answer:"观察者模式是一对多的依赖关系，主题和观察者直接交互；中介者模式是多对多的集中协调，对象之间不直接交互，通过中介者间接通信。观察者强调事件通知，中介者强调解耦复杂交互。观察者适合事件驱动场景，中介者适合多个对象频繁交互的场景（如聊天室、GUI 组件）。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十二、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/09-design-patterns/design-pattern-intro",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"设计模式概述"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"SOLID 原则与设计模式分类"})]}),e.jsxs("a",{href:"/docs/09-design-patterns/creational-patterns",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"上一篇 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"创建型模式"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"单例、工厂、建造者等"})]}),e.jsxs("a",{href:"/docs/09-design-patterns/structural-patterns",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-purple mb-1",children:"上一篇 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-purple",children:"结构型模式"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"代理、装饰器、适配器等"})]}),e.jsxs("a",{href:"/docs/06-spring-framework/spring-event",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-orange mb-1",children:"实际应用 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-orange",children:"Spring 事件机制"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"观察者模式的典型应用"})]})]}),e.jsx(t,{type:"info",title:"学习建议",children:"行为型模式是设计模式中最复杂的一类，建议重点掌握策略、观察者、模板方法这三种最常用的模式。阅读 Spring 源码时，重点关注事件机制（观察者）、拦截器链（责任链）、Bean 生命周期（模板方法）等实际应用。通过实际项目练习，将模式内化为编程直觉。"}),e.jsx(d,{...n(i.category,i.id)})]})}),e.jsx(o,{items:c})]})}export{y as default};
