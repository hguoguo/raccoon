import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as l}from"./SideNote-BKvanovA.js";import{C as c}from"./ContextSwitcher-Cjd-h5IL.js";import{C as t,A as o,S as d}from"./ArticleNav-DhfiS38Y.js";import{D as r}from"./DiagramBlock-CLaKE9_7.js";import{I as x}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、代理模式概述",level:2},{id:"static-proxy",text:"二、静态代理",level:2},{id:"jdk-dynamic-proxy",text:"三、JDK 动态代理（重点🔥）",level:2},{id:"proxy-principle",text:"3.1 底层原理",level:3},{id:"proxy-source",text:"3.2 源码解析",level:3},{id:"cglib-proxy",text:"四、CGLIB 动态代理（重点🔥）",level:2},{id:"cglib-principle",text:"4.1 底层原理",level:3},{id:"comparison",text:"五、JDK vs CGLIB 对比",level:2},{id:"spring-aop",text:"六、Spring AOP 中的代理选择",level:2},{id:"use-cases",text:"七、实际应用场景",level:2},{id:"misconceptions",text:"八、常见误区",level:2},{id:"interview",text:"九、面试真题",level:2},{id:"related",text:"十、知识关联",level:2}];function f({meta:i}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20",children:e.jsxs(a,{meta:i,children:[e.jsx("section",{id:"definition",children:e.jsx("blockquote",{className:"border-l-[3px] border-l-accent pl-4 py-2 my-6 bg-accent-glow rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base font-medium text-ink leading-[1.7]",children:["代理模式是一种",e.jsx("strong",{className:"text-accent",children:"结构型设计模式"}),",通过引入代理对象来控制对目标对象的访问,在方法调用前后添加额外逻辑(如日志、事务、权限校验),实现",e.jsx("strong",{className:"text-accent",children:"解耦"}),"和",e.jsx("strong",{className:"text-accent",children:"增强"}),"。Spring AOP 的核心就是基于 JDK 动态代理或 CGLIB 实现的。"]})})}),e.jsxs("section",{id:"overview",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"一、代理模式概述"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:'代理模式的核心思想是"间接访问",客户端不直接调用目标对象,而是通过代理对象进行访问。代理对象可以在调用目标方法前后执行额外操作,如日志记录、性能监控、权限检查等,而无需修改目标对象的代码。'}),e.jsx(r,{title:"代理模式 UML 类图",children:`classDiagram
    class Subject {
        &lt;&lt;interface&gt;&gt;
        +request()
    }
    class RealSubject {
        +request() 真实业务逻辑
    }
    class Proxy {
        -target: Subject
        +request()
    }
    class Client

    Subject <|.. RealSubject : 实现
    Subject <|.. Proxy : 实现
    Proxy --> RealSubject : 持有引用
    Client --> Proxy : 使用

    style Subject fill:#f5f0e8,stroke:#d4c5a9,color:#6b5e4c
    style RealSubject fill:#f5f0e8,stroke:#d4c5a9,color:#6b4a1e
    style Proxy fill:#f5f0e8,stroke:#b5651d,color:#8b4c14
    style Client fill:#f5f0e8,stroke:#d4c5a9,color:#6b5e4c`}),e.jsx(t,{type:"info",title:"代理模式的三大角色",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-[13px] sm:text-[14px] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Subject（抽象主题）："}),"定义业务接口,RealSubject 和 Proxy 都实现此接口"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"RealSubject（真实主题）："}),"执行业务逻辑的核心对象"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Proxy（代理）："}),"持有 RealSubject 引用,控制访问并添加额外逻辑"]})]})})]}),e.jsxs("section",{id:"static-proxy",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"二、静态代理"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"静态代理在编译期就确定了代理类和目标类的关系,需要手动编写代理类。虽然简单直观,但每个目标类都需要一个对应的代理类,导致代码冗余。"}),e.jsx(s,{code:`// 1. 定义业务接口
public interface UserService {
    void saveUser(String username);
    void deleteUser(int id);
}

// 2. 真实业务类
public class UserServiceImpl implements UserService {
    @Override
    public void saveUser(String username) {
        System.out.println("保存用户: " + username);
    }

    @Override
    public void deleteUser(int id) {
        System.out.println("删除用户: " + id);
    }
}

// 3. 静态代理类
public class UserServiceProxy implements UserService {
    private UserService target; // 持有目标对象引用

    public UserServiceProxy(UserService target) {
        this.target = target;
    }

    @Override
    public void saveUser(String username) {
        System.out.println("[日志] 开始保存用户");  // 前置增强
        target.saveUser(username);                  // 调用目标方法
        System.out.println("[日志] 保存用户成功");   // 后置增强
    }

    @Override
    public void deleteUser(int id) {
        System.out.println("[日志] 开始删除用户");
        target.deleteUser(id);
        System.out.println("[日志] 删除用户成功");
    }
}

// 4. 客户端使用
public class Client {
    public static void main(String[] args) {
        UserService target = new UserServiceImpl();
        UserService proxy = new UserServiceProxy(target);
        proxy.saveUser("张三");  // 输出: [日志] 开始保存用户 → 保存用户: 张三 → [日志] 保存用户成功
    }
}`,language:"java",highlights:[24,25,26,32,33,34],filename:"StaticProxy.java",description:"静态代理示例:手动编写代理类"}),e.jsx(t,{type:"warning",title:"静态代理的缺点",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-[13px] sm:text-[14px] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"代码冗余："}),"每个目标类都需要编写对应的代理类"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"维护困难："}),"接口增加方法时,代理类也需要同步修改"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"不够灵活："}),"无法在运行时动态决定代理逻辑"]})]})})]}),e.jsxs("section",{id:"jdk-dynamic-proxy",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"三、JDK 动态代理（重点🔥）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["JDK 动态代理在",e.jsx("strong",{className:"text-accent",children:"运行时"}),"动态生成代理类,无需手动编写代理代码。它基于 Java 反射机制,要求目标类必须",e.jsx("strong",{className:"text-accent",children:"实现接口"}),"。这是 Spring AOP 默认使用的代理方式。"]}),e.jsx("h3",{id:"proxy-principle",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 底层原理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["JDK 动态代理的核心是 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"java.lang.reflect.Proxy"})," 类和 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"InvocationHandler"})," 接口:"]}),e.jsx(r,{title:"JDK 动态代理工作流程",children:`graph TD
    A["1. 定义接口
UserService"] --> B["2. 实现接口
UserServiceImpl"]
    B --> C["3. 创建 InvocationHandler
(定义增强逻辑)"]
    C --> D["4. Proxy.newProxyInstance()
动态生成 $Proxy0 类"]
    D --> E["5. 客户端调用代理方法
proxy.saveUser() → invoke()"]

    style A fill:#f5f0e8,stroke:#b5651d,color:#6b4a1e
    style B fill:#f5f0e8,stroke:#b5651d,color:#6b4a1e
    style C fill:#ede4d1,stroke:#b5651d,color:#6b4a1e
    style D fill:#ede4d1,stroke:#b5651d,color:#8b4c14,stroke-width:3px
    style E fill:#f5f0e8,stroke:#d4c5a9,color:#6b5e4c`}),e.jsx("h3",{id:"proxy-source",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.2 源码解析"}),e.jsx(s,{code:`import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

// 1. 定义业务接口
interface UserService {
    void saveUser(String username);
}

// 2. 真实业务类
class UserServiceImpl implements UserService {
    @Override
    public void saveUser(String username) {
        System.out.println("保存用户: " + username);
    }
}

// 3. 自定义 InvocationHandler
class LogInvocationHandler implements InvocationHandler {
    private Object target; // 目标对象

    public LogInvocationHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("[日志] 方法开始: " + method.getName());  // 前置增强
        
        Object result = method.invoke(target, args);  // 调用目标方法
        
        System.out.println("[日志] 方法结束: " + method.getName());   // 后置增强
        return result;
    }
}

// 4. 客户端使用
public class JdkProxyDemo {
    public static void main(String[] args) {
        UserService target = new UserServiceImpl();
        
        // 动态创建代理对象
        UserService proxy = (UserService) Proxy.newProxyInstance(
            target.getClass().getClassLoader(),           // 类加载器
            target.getClass().getInterfaces(),            // 实现的接口
            new LogInvocationHandler(target)              // InvocationHandler
        );
        
        proxy.saveUser("张三");
        // 输出:
        // [日志] 方法开始: saveUser
        // 保存用户: 张三
        // [日志] 方法结束: saveUser
    }
}`,language:"java",highlights:[26,28,30,40,41,42,43],filename:"JdkDynamicProxy.java",description:"JDK 动态代理完整示例"}),e.jsxs(l,{label:"🔍 生成的代理类",children:["JVM 会在运行时动态生成名为 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded",children:"$Proxy0"})," 的代理类,该类继承 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded",children:"Proxy"})," 并实现目标接口。可通过系统属性查看生成的类:",e.jsx("br",{}),e.jsx("code",{className:"block mt-2 p-2 bg-parchment-warm rounded text-[12px] font-mono",children:'System.setProperty("sun.misc.ProxyGenerator.saveGeneratedFiles", "true");'})]})]}),e.jsxs("section",{id:"cglib-proxy",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"四、CGLIB 动态代理（重点🔥）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["CGLIB（Code Generation Library）是一个强大的字节码生成库,可以在运行时动态生成目标类的",e.jsx("strong",{className:"text-accent",children:"子类"}),"来实现代理。与 JDK 动态代理不同,CGLIB ",e.jsx("strong",{className:"text-accent",children:"不需要目标类实现接口"}),",但不能代理 final 类或 final 方法。"]}),e.jsx("h3",{id:"cglib-principle",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 底层原理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["CGLIB 基于 ASM 字节码框架,通过继承目标类并重写方法来生成代理对象。核心类是 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Enhancer"})," 和 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"MethodInterceptor"}),"。"]}),e.jsx(s,{code:`import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

// 1. 目标类(无需实现接口)
class UserService {
    public void saveUser(String username) {
        System.out.println("保存用户: " + username);
    }
}

// 2. 自定义 MethodInterceptor
class LogMethodInterceptor implements MethodInterceptor {
    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.println("[日志] 方法开始: " + method.getName());  // 前置增强
        
        Object result = proxy.invokeSuper(obj, args);  // 调用父类(目标)方法
        
        System.out.println("[日志] 方法结束: " + method.getName());   // 后置增强
        return result;
    }
}

// 3. 客户端使用
public class CglibProxyDemo {
    public static void main(String[] args) {
        // 创建 Enhancer
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(UserService.class);           // 设置父类
        enhancer.setCallback(new LogMethodInterceptor());    // 设置回调
        
        // 动态创建代理对象
        UserService proxy = (UserService) enhancer.create();
        
        proxy.saveUser("张三");
        // 输出:
        // [日志] 方法开始: saveUser
        // 保存用户: 张三
        // [日志] 方法结束: saveUser
    }
}`,language:"java",highlights:[15,17,19,29,30,31,34],filename:"CglibProxy.java",description:"CGLIB 动态代理示例"}),e.jsx(t,{type:"warning",title:"CGLIB 的限制",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-[13px] sm:text-[14px] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"不能代理 final 类："}),"因为 CGLIB 通过继承实现,final 类无法被继承"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"不能代理 final 方法："}),"final 方法不能被重写"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"不能代理 private 方法："}),"子类无法访问父类的私有方法"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"需要额外依赖："}),"需引入 cglib 或 spring-core(已包含 cglib)"]})]})})]}),e.jsxs("section",{id:"comparison",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"五、JDK vs CGLIB 对比"}),e.jsx("div",{className:"overflow-x-auto my-5",children:e.jsxs("table",{className:"w-full text-[12px] sm:text-[13px] border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"维度"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"JDK 动态代理"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"CGLIB"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 text-ink-muted font-semibold",children:"实现机制"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"基于接口,实现 InvocationHandler"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"基于继承,生成子类"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 text-ink-muted font-semibold",children:"是否需要接口"}),e.jsx("td",{className:"py-2 px-3 text-accent font-semibold",children:"✅ 必须有接口"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"❌ 不需要接口"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 text-ink-muted font-semibold",children:"能否代理 final"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"✅ 可以(基于接口)"}),e.jsx("td",{className:"py-2 px-3 text-red-600 font-semibold",children:"❌ 不可以"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 text-ink-muted font-semibold",children:"性能(JDK 8+)"}),e.jsx("td",{className:"py-2 px-3 text-accent font-semibold",children:"较快(优化后接近 CGLIB)"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"略快(但差距缩小)"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 text-ink-muted font-semibold",children:"Spring 默认选择"}),e.jsx("td",{className:"py-2 px-3 text-accent font-semibold",children:"有接口时用 JDK"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"无接口时用 CGLIB"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 text-ink-muted font-semibold",children:"依赖"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"JDK 自带,无需额外依赖"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"需引入 cglib 或 spring-core"})]})]})]})}),e.jsx(c,{simpleContent:e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-[14px] text-ink-muted",children:e.jsx("strong",{className:"text-ink",children:"简单记忆:"})}),e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-[14px] text-ink-muted",children:[e.jsxs("li",{children:["目标类",e.jsx("strong",{className:"text-accent",children:"有接口"})," → 用 JDK 动态代理"]}),e.jsxs("li",{children:["目标类",e.jsx("strong",{className:"text-accent",children:"没接口"})," → 用 CGLIB"]}),e.jsxs("li",{children:["Spring Boot 2.x 后可以强制使用 CGLIB: ",e.jsx("code",{className:"font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded",children:"spring.aop.proxy-target-class=true"})]})]})]}),hardcoreContent:e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-[14px] text-ink-muted",children:e.jsx("strong",{className:"text-ink",children:"深入底层:"})}),e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-[14px] text-ink-muted",children:[e.jsxs("li",{children:["JDK 代理生成的 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded",children:"$Proxy0"})," 类持有了 InvocationHandler 引用,每次方法调用都通过反射执行 handler.invoke()"]}),e.jsx("li",{children:"CGLIB 生成的子类重写了所有非 final 方法,通过 FastClass 机制避免反射,性能略优"}),e.jsx("li",{children:"JDK 8 之后,反射性能大幅提升,JDK 代理与 CGLIB 的性能差距已不明显"}),e.jsxs("li",{children:["Spring 5.x 默认策略:优先 JDK 代理,可通过 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded",children:"@EnableAspectJAutoProxy(proxyTargetClass = true)"})," 强制 CGLIB"]})]})]})})]}),e.jsxs("section",{id:"spring-aop",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"六、Spring AOP 中的代理选择"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spring AOP 自动根据目标类是否实现接口来选择代理方式,理解这一机制对于排查 AOP 失效问题至关重要。"}),e.jsx(s,{code:`// Spring AOP 代理选择规则:
// 1. 如果目标类实现了接口 → 默认使用 JDK 动态代理
// 2. 如果目标类没有实现接口 → 使用 CGLIB
// 3. 可以通过配置强制使用 CGLIB

@Configuration
@EnableAspectJAutoProxy  // 默认: proxyTargetClass = false
public class AppConfig {
    // 此时 Spring 会根据目标类是否有接口自动选择
}

// 强制使用 CGLIB
@Configuration
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class AppConfig2 {
    // 无论是否有接口,都使用 CGLIB
}

// ⚠️ 常见陷阱:同类内部调用不会触发 AOP
@Service
public class UserService {
    @Transactional
    public void saveUser(String username) {
        // ...
    }
    
    public void batchSave(List<String> usernames) {
        for (String username : usernames) {
            this.saveUser(username);  // ❌ 不会触发事务! 因为是 this 调用,绕过了代理
        }
    }
}

// ✅ 解决方案:注入自身代理
@Service
public class UserService2 {
    @Autowired
    private UserService2 self;  // 注入代理对象
    
    @Transactional
    public void saveUser(String username) {
        // ...
    }
    
    public void batchSave(List<String> usernames) {
        for (String username : usernames) {
            self.saveUser(username);  // ✅ 会触发事务! 通过代理调用
        }
    }
}`,language:"java",highlights:[14,28,38,39,48],filename:"SpringAopProxy.java",description:"Spring AOP 代理选择与陷阱"}),e.jsx(t,{type:"danger",title:"Spring AOP 经典陷阱",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:[e.jsx("strong",{className:"text-ink",children:"同类内部调用不触发 AOP:"}),"当在一个方法中调用同一个类的另一个带有 @Transactional 或 @Cacheable 的方法时,AOP 不会生效。原因是 Spring AOP 基于代理,只有通过代理对象调用才会触发增强逻辑,而 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded",children:"this.method()"})," 是直接调用目标对象。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{className:"text-accent",children:"解决方案:"}),"① 注入自身代理对象;② 将方法拆分到不同的类;③ 使用 AspectJ 编译期织入(而非 Spring AOP 运行时代理)"]})})]}),e.jsxs("section",{id:"use-cases",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"七、实际应用场景"}),e.jsx("h3",{className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"场景 1:日志记录"}),e.jsx(s,{code:`@Aspect
@Component
public class LoggingAspect {
    @Around("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        
        String methodName = joinPoint.getSignature().getName();
        System.out.println("开始执行: " + methodName);
        
        Object result = joinPoint.proceed();  // 执行目标方法
        
        long elapsed = System.currentTimeMillis() - start;
        System.out.println("执行完成: " + methodName + ", 耗时: " + elapsed + "ms");
        
        return result;
    }
}`,language:"java",highlights:[5,11,13],filename:"LoggingAspect.java",description:"使用 AOP 记录方法执行时间"}),e.jsx("h3",{className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"场景 2:事务管理"}),e.jsx(s,{code:`@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepo;
    
    @Autowired
    private InventoryService inventoryService;
    
    @Transactional  // Spring 自动生成代理,管理事务
    public void createOrder(Order order) {
        orderRepo.save(order);              // 数据库操作 1
        inventoryService.deductStock(order); // 数据库操作 2
        // 任何异常都会回滚两个操作
    }
}`,language:"java",highlights:[9],filename:"TransactionProxy.java",description:"@Transactional 基于代理实现"}),e.jsx("h3",{className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"场景 3:权限校验"}),e.jsx(s,{code:`@Aspect
@Component
public class SecurityAspect {
    @Before("@annotation(RequiresRole)")
    public void checkPermission(JoinPoint joinPoint) {
        RequiresRole annotation = getAnnotation(joinPoint);
        String requiredRole = annotation.value();
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (!auth.getAuthorities().contains(new SimpleGrantedAuthority(requiredRole))) {
            throw new AccessDeniedException("权限不足");
        }
    }
}`,language:"java",highlights:[5,10],filename:"SecurityAspect.java",description:"使用 AOP 实现权限校验"})]}),e.jsxs("section",{id:"misconceptions",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"八、常见误区"}),e.jsxs(t,{type:"danger",title:"误区一：JDK 动态代理比 CGLIB 慢",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"CGLIB 基于字节码,应该比 JDK 反射快很多",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"JDK 8 之后反射性能大幅提升,两者差距已不明显。Spring 5.x 基准测试显示,JDK 代理在某些场景下甚至略快于 CGLIB。"]}),e.jsxs(t,{type:"danger",title:"误区二：Spring AOP 可以拦截所有方法调用",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"加了 @Transactional 就万事大吉",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"Spring AOP 基于代理,只有",e.jsx("strong",{className:"text-accent",children:"通过代理对象调用"}),"才会触发增强。同类内部的 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded",children:"this.method()"})," 调用会绕过代理,导致事务失效。"]}),e.jsxs(t,{type:"danger",title:"误区三：CGLIB 可以代理任何类",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"CGLIB 功能强大,应该能代理所有类",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"CGLIB 基于继承,无法代理 final 类、final 方法和 private 方法。这些限制在设计领域驱动模型时需要特别注意。"]}),e.jsxs(t,{type:"danger",title:"误区四：代理对象和目标对象是同一个实例",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),e.jsx("code",{className:"font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded",children:"proxy == target"})," 应该返回 true",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"代理对象是新生成的实例(JDK 代理是 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded",children:"$Proxy0"}),",CGLIB 代理是子类),与目标对象不是同一个实例。这会导致 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded",children:"=="})," 比较失败,应使用 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded",children:"equals()"}),"。"]})]}),e.jsx("section",{id:"interview",children:e.jsx(x,{questions:[{question:"JDK 动态代理和 CGLIB 的区别是什么？Spring 如何选择？",answer:"JDK 动态代理基于接口实现,要求目标类必须实现接口;CGLIB 基于继承实现,通过生成子类来代理,无需接口但不能代理 final 类/方法。Spring AOP 默认策略:目标类有接口时用 JDK 代理,无接口时用 CGLIB。可通过 spring.aop.proxy-target-class=true 强制使用 CGLIB。"},{question:"为什么同类内部调用不会触发 Spring AOP？如何解决？",answer:"Spring AOP 基于代理机制,只有通过代理对象调用才会触发增强逻辑。同类内部的 this.method() 是直接调用目标对象,绕过了代理。解决方案:① 注入自身代理对象(@Autowired private SelfType self);② 将方法拆分到不同类;③ 使用 AspectJ 编译期织入。"},{question:"JDK 动态代理的底层原理是什么？",answer:"JDK 动态代理基于 java.lang.reflect.Proxy 类和 InvocationHandler 接口。Proxy.newProxyInstance() 在运行时动态生成代理类(名为 $Proxy0),该类继承 Proxy 并实现目标接口。代理类的所有方法调用都会转发到 InvocationHandler.invoke() 方法,在其中可以添加增强逻辑并通过 method.invoke(target, args) 调用目标方法。"},{question:"CGLIB 为什么不能代理 final 方法？",answer:"CGLIB 通过继承目标类并重写方法来实现代理。final 方法不能被重写,因此 CGLIB 无法为 final 方法生成增强逻辑。同理,final 类也不能被继承,所以 CGLIB 无法代理 final 类。private 方法由于子类不可见,也无法被代理。"},{question:"@Transactional 注解失效的常见原因有哪些？",answer:"① 同类内部调用(this.method())绕过代理;② 方法不是 public(Spring AOP 只能代理 public 方法);③ 异常被 try-catch 捕获未抛出;④ 数据库引擎不支持事务(如 MyISAM);⑤ 未被 Spring 容器管理(缺少 @Service/@Component);⑥ 传播行为配置错误。"},{question:"如何查看 JDK 动态代理生成的代理类？",answer:'通过系统属性 sun.misc.ProxyGenerator.saveGeneratedFiles=true 可以让 JVM 将生成的代理类保存到磁盘。代码:System.setProperty("sun.misc.ProxyGenerator.saveGeneratedFiles", "true"); 生成的类文件位于项目根目录下的 com/sun/proxy/$Proxy0.class。'},{question:"静态代理和动态代理各有什么优缺点？",answer:"静态代理优点:简单直观,编译期确定,性能好;缺点:代码冗余,每个目标类都需要编写代理类,维护困难。动态代理优点:灵活,无需手动编写代理类,可在运行时动态决定代理逻辑;缺点:基于反射,性能略低(但 JDK 8 后差距缩小),调试困难。"}]})}),e.jsxs("section",{id:"related",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"十、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 bg-parchment-light border border-border rounded-paper-md",children:[e.jsx("div",{className:"text-[10px] font-mono text-ink-ghost mb-1",children:"前置知识"}),e.jsx("div",{className:"text-[13px] font-medium text-ink",children:"Java基础、反射机制"})]}),e.jsxs("div",{className:"p-4 bg-accent-glow border border-accent/20 rounded-paper-md",children:[e.jsx("div",{className:"text-[10px] font-mono text-accent mb-1",children:"延伸知识"}),e.jsx("div",{className:"text-[13px] font-medium text-ink",children:"Spring AOP、结构型设计模式"})]})]})]}),e.jsx(o,{...n(i.category,i.id)})]})}),e.jsx(d,{items:m})]})}export{f as default};
