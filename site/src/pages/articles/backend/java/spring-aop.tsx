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
  { id: 'aop-concepts', text: '一、AOP 核心概念', level: 2 },
  { id: 'proxy-mechanism', text: '二、代理机制详解', level: 2 },
  { id: 'advice-types', text: '三、通知类型', level: 2 },
  { id: 'pointcut-expression', text: '四、切点表达式', level: 2 },
  { id: 'implementation', text: '五、AOP 实现方式', level: 2 },
  { id: 'use-cases', text: '六、典型应用场景', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function SpringAop({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Spring AOP（Aspect-Oriented Programming）是<strong className="text-accent">面向切面编程</strong>的实现，通过将横切关注点（如日志、事务、安全）从业务逻辑中分离，
              实现代码解耦和复用，基于动态代理技术在运行时织入增强逻辑。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 AOP？">
            传统 OOP 难以处理跨多个对象的横切关注点（如日志记录），导致代码重复和耦合。AOP 将这些关注点模块化，通过声明式方式应用，提升代码可维护性。
          </Callout>

          <h2 id="aop-concepts" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、AOP 核心概念
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            理解 AOP 需要掌握以下核心术语：
          </p>

          <DiagramBlock title="AOP 核心术语关系图">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────┐
│           Aspect（切面）                 │
│  ┌──────────────┐  ┌────────────────┐  │
│  │ Pointcut     │  │ Advice         │  │
│  │ (切点)       │+ │ (通知)         │  │
│  │ WHERE?       │  │ WHEN & WHAT?   │  │
│  └──────────────┘  └────────────────┘  │
│         │                    │          │
│         ▼                    ▼          │
│  ┌────────────────────────────────┐    │
│  │   JoinPoint（连接点）           │    │
│  │   - 方法执行点                  │    │
│  │   - 异常抛出点                  │    │
│  └────────────────────────────────┘    │
│         │                               │
│         ▼                               │
│  ┌────────────────────────────────┐    │
│  │   Target（目标对象）            │    │
│  │   - 被代理的原始对象             │    │
│  └────────────────────────────────┘    │
│         │                               │
│         ▼                               │
│  ┌────────────────────────────────┐    │
│  │   Proxy（代理对象）             │    │
│  │   - 包含增强逻辑的代理           │    │
│  └────────────────────────────────┘    │
└─────────────────────────────────────────┘

Weaving（织入）：将 Aspect 应用到 Target 的过程
            `}</pre>
          </DiagramBlock>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">术语</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">说明</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2"><strong>Aspect</strong></td>
                <td className="border border-border-light px-3 py-2">切面，横切关注点的模块化</td>
                <td className="border border-border-light px-3 py-2">@Transactional</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2"><strong>JoinPoint</strong></td>
                <td className="border border-border-light px-3 py-2">连接点，程序执行的某个点</td>
                <td className="border border-border-light px-3 py-2">方法调用、异常抛出</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2"><strong>Advice</strong></td>
                <td className="border border-border-light px-3 py-2">通知，在特定连接点执行的动作</td>
                <td className="border border-border-light px-3 py-2">@Before、@After</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2"><strong>Pointcut</strong></td>
                <td className="border border-border-light px-3 py-2">切点，匹配连接点的表达式</td>
                <td className="border border-border-light px-3 py-2">execution(* com.example.*.*(..))</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2"><strong>Target</strong></td>
                <td className="border border-border-light px-3 py-2">目标对象，被代理的原始对象</td>
                <td className="border border-border-light px-3 py-2">UserService 实例</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2"><strong>Proxy</strong></td>
                <td className="border border-border-light px-3 py-2">代理对象，包含增强逻辑</td>
                <td className="border border-border-light px-3 py-2">JDK/CGLIB 代理</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2"><strong>Weaving</strong></td>
                <td className="border border-border-light px-3 py-2">织入，将切面应用到目标对象</td>
                <td className="border border-border-light px-3 py-2">编译期/运行时</td>
              </tr>
            </tbody>
          </table>

          <SideNote label="Spring AOP vs AspectJ">
            Spring AOP 基于动态代理，仅支持方法级别的连接点；AspectJ 是完整的 AOP 框架，支持字段、构造器等更细粒度的连接点，但需要特殊编译器。
          </SideNote>

          <h2 id="proxy-mechanism" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、代理机制详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring AOP 使用两种代理机制：<strong>JDK 动态代理</strong>和<strong>CGLIB 代理</strong>。
          </p>

          <Playground
            code={`// ===== JDK 动态代理（基于接口）=====
import java.lang.reflect.Proxy;
import java.lang.reflect.InvocationHandler;

public class JdkProxyExample {
    
    interface UserService {
        void saveUser(String user);
    }
    
    static class UserServiceImpl implements UserService {
        public void saveUser(String user) {
            System.out.println("保存用户: " + user);
        }
    }
    
    static class LoggingHandler implements InvocationHandler {
        private final Object target;
        
        public LoggingHandler(Object target) {
            this.target = target;
        }
        
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            System.out.println("[日志] 方法开始: " + method.getName());
            Object result = method.invoke(target, args);
            System.out.println("[日志] 方法结束: " + method.getName());
            return result;
        }
    }
    
    public static void main(String[] args) {
        UserService target = new UserServiceImpl();
        UserService proxy = (UserService) Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            target.getClass().getInterfaces(),
            new LoggingHandler(target)
        );
        proxy.saveUser("张三");
    }
}

// 预期输出：
// [日志] 方法开始: saveUser
// 保存用户: 张三
// [日志] 方法结束: saveUser


// ===== CGLIB 代理（基于继承）=====
import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

public class CglibProxyExample {
    
    static class UserService {  // 无需实现接口
        public void saveUser(String user) {
            System.out.println("保存用户: " + user);
        }
    }
    
    static class LoggingInterceptor implements MethodInterceptor {
        @Override
        public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
            System.out.println("[日志] 方法开始: " + method.getName());
            Object result = proxy.invokeSuper(obj, args);
            System.out.println("[日志] 方法结束: " + method.getName());
            return result;
        }
    }
    
    public static void main(String[] args) {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(UserService.class);
        enhancer.setCallback(new LoggingInterceptor());
        UserService proxy = (UserService) enhancer.create();
        proxy.saveUser("李四");
    }
}`}
            language="java"
            highlights={[17, 28, 55, 65]}
            filename="ProxyMechanism.java"
            description="JDK 动态代理与 CGLIB 代理对比"
          />

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">特性</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">JDK 动态代理</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">CGLIB 代理</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2">实现方式</td>
                <td className="border border-border-light px-3 py-2">基于接口</td>
                <td className="border border-border-light px-3 py-2">基于继承</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2">目标类要求</td>
                <td className="border border-border-light px-3 py-2">必须实现接口</td>
                <td className="border border-border-light px-3 py-2">不能是 final 类</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">性能</td>
                <td className="border border-border-light px-3 py-2">JDK 8+ 优化后较快</td>
                <td className="border border-border-light px-3 py-2">创建慢，调用快</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2">Spring 默认策略</td>
                <td className="border border-border-light px-3 py-2">有接口时使用</td>
                <td className="border border-border-light px-3 py-2">无接口时使用</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2">强制使用</td>
                <td className="border border-border-light px-3 py-2">-</td>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">proxyTargetClass=true</code></td>
              </tr>
            </tbody>
          </table>

          <Callout type="warning" title="Spring Boot 2.x+ 的变化">
            Spring Boot 2.x 默认使用 CGLIB 代理（<code className="font-mono text-[12px]">spring.aop.proxy-target-class=true</code>），即使目标类实现了接口。这可以避免一些因代理类型不一致导致的问题。
          </Callout>

          <h2 id="advice-types" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、通知类型
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring AOP 提供五种通知类型，控制在何时执行增强逻辑。
          </p>

          <Playground
            code={`import org.aspectj.lang.annotation.*;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {
    
    // 1. @Before：前置通知（方法执行前）
    @Before("execution(* com.example.service.*.*(..))")
    public void beforeAdvice() {
        System.out.println("【前置】方法执行前");
    }
    
    // 2. @After：后置通知（方法执行后，无论是否异常）
    @After("execution(* com.example.service.*.*(..))")
    public void afterAdvice() {
        System.out.println("【后置】方法执行后");
    }
    
    // 3. @AfterReturning：返回通知（方法成功返回后）
    @AfterReturning(pointcut = "execution(* com.example.service.*.*(..))", returning = "result")
    public void afterReturningAdvice(Object result) {
        System.out.println("【返回】方法返回值: " + result);
    }
    
    // 4. @AfterThrowing：异常通知（方法抛出异常时）
    @AfterThrowing(pointcut = "execution(* com.example.service.*.*(..))", throwing = "ex")
    public void afterThrowingAdvice(Exception ex) {
        System.out.println("【异常】捕获异常: " + ex.getMessage());
    }
    
    // 5. @Around：环绕通知（最强大，可控制方法执行）
    @Around("execution(* com.example.service.*.*(..))")
    public Object aroundAdvice(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("【环绕】方法执行前");
        try {
            Object result = joinPoint.proceed();  // 执行目标方法
            System.out.println("【环绕】方法执行后，返回值: " + result);
            return result;
        } catch (Throwable e) {
            System.out.println("【环绕】捕获异常: " + e.getMessage());
            throw e;
        }
    }
}`}
            language="java"
            highlights={[10, 16, 22, 28, 34]}
            filename="AdviceTypes.java"
            description="五种通知类型示例"
          />

          <DiagramBlock title="通知执行顺序">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
正常执行流程：
@Before → 目标方法 → @AfterReturning → @After

异常执行流程：
@Before → 目标方法(异常) → @AfterThrowing → @After

@Around 包裹整个流程：
@Around(前) → @Before → 目标方法 → @AfterReturning/@AfterThrowing → @After → @Around(后)
            `}</pre>
          </DiagramBlock>

          <SideNote label="@Around 的威力">
            @Around 是最强大的通知类型，可以完全控制方法执行（包括是否执行、修改参数、修改返回值、捕获异常）。其他通知类型都可以用 @Around 实现。
          </SideNote>

          <h2 id="pointcut-expression" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、切点表达式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            切点表达式用于精确匹配需要增强的方法，Spring AOP 使用 AspectJ 切点表达式语言。
          </p>

          <Playground
            code={`// 切点表达式语法：
// execution(<修饰符>? <返回类型> <方法名>(<参数>) <异常>?)

@Aspect
@Component
public class PointcutExamples {
    
    // 1. 匹配所有 public 方法
    @Pointcut("execution(public * *(..))")
    public void allPublicMethods() {}
    
    // 2. 匹配指定包下的所有方法
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceLayerMethods() {}
    
    // 3. 匹配指定类的所有方法
    @Pointcut("execution(* com.example.service.UserService.*(..))")
    public void userServiceMethods() {}
    
    // 4. 匹配指定方法（带参数）
    @Pointcut("execution(* com.example.service.UserService.saveUser(String))")
    public void saveUserMethod() {}
    
    // 5. 匹配带有特定注解的方法
    @Pointcut("@annotation(org.springframework.transaction.annotation.Transactional)")
    public void transactionalMethods() {}
    
    // 6. 组合表达式（AND、OR、NOT）
    @Pointcut("serviceLayerMethods() AND !saveUserMethod()")
    public void serviceExceptSave() {}
    
    // 7. 匹配指定包及其子包
    @Pointcut("execution(* com.example.service..*.*(..))")
    public void serviceLayerAndSubpackages() {}
    
    // 使用示例
    @Before("serviceLayerMethods()")
    public void logServiceCalls() {
        System.out.println("调用服务层方法");
    }
}`}
            language="java"
            highlights={[9, 13, 17, 21, 25, 29, 33]}
            filename="PointcutExpressions.java"
            description="常用切点表达式示例"
          />

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-3 py-2 text-left font-semibold">通配符</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">说明</th>
                <th className="border border-border-light px-3 py-2 text-left font-semibold">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">*</code></td>
                <td className="border border-border-light px-3 py-2">匹配任意字符（不包括包分隔符 .）</td>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">*Service</code> 匹配 UserService、OrderService</td>
              </tr>
              <tr className="bg-parchment-light/30">
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">..</code></td>
                <td className="border border-border-light px-3 py-2">匹配任意子包或任意参数</td>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">com.example..*</code> 匹配 com.example 及其子包</td>
              </tr>
              <tr>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">+</code></td>
                <td className="border border-border-light px-3 py-2">匹配指定类及其子类</td>
                <td className="border border-border-light px-3 py-2"><code className="font-mono text-[12px]">com.example.BaseService+</code></td>
              </tr>
            </tbody>
          </table>

          <h2 id="implementation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、AOP 实现方式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring 提供两种 AOP 配置方式：<strong>注解驱动</strong>和<strong>XML 配置</strong>。
          </p>

          <Playground
            code={`// ===== 方式 1：注解驱动（推荐）=====
@Aspect
@Component
public class TransactionAspect {
    
    @Around("@annotation(transactional)")
    public Object manageTransaction(ProceedingJoinPoint joinPoint, 
                                     Transactional transactional) throws Throwable {
        System.out.println("开启事务");
        try {
            Object result = joinPoint.proceed();
            System.out.println("提交事务");
            return result;
        } catch (Exception e) {
            System.out.println("回滚事务");
            throw e;
        }
    }
}

// 启用注解支持
@Configuration
@EnableAspectJAutoProxy
public class AopConfig {
}


// ===== 方式 2：XML 配置（遗留系统）=====
/*
<aop:config>
    <aop:aspect ref="loggingAspect">
        <aop:pointcut id="serviceMethods" 
                      expression="execution(* com.example.service.*.*(..))"/>
        <aop:before method="logBefore" pointcut-ref="serviceMethods"/>
        <aop:after-returning method="logAfter" 
                             pointcut-ref="serviceMethods" 
                             returning="result"/>
    </aop:aspect>
</aop:config>

<bean id="loggingAspect" class="com.example.LoggingAspect"/>
*/`}
            language="java"
            highlights={[2, 6, 23]}
            filename="AopImplementation.java"
            description="AOP 两种实现方式"
          />

          <Callout type="tip" title="现代 Spring 最佳实践">
            <ul className="list-disc list-inside space-y-1 text-[13px] sm:text-[14px]">
              <li>优先使用注解驱动方式，代码更简洁</li>
              <li>使用 <code className="font-mono text-[12px]">@EnableAspectJAutoProxy</code> 启用 AOP 支持</li>
              <li>将切面定义为 <code className="font-mono text-[12px]">@Component</code>，让 Spring 自动管理</li>
              <li>使用 <code className="font-mono text-[12px]">@Pointcut</code> 定义 reusable 切点表达式</li>
            </ul>
          </Callout>

          <h2 id="use-cases" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、典型应用场景
          </h2>

          <Playground
            code={`import org.aspectj.lang.annotation.*;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// 场景 1：日志记录
@Aspect
@Component
public class LoggingAspect {
    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);
    
    @Around("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public Object logControllerExecution(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        String methodName = joinPoint.getSignature().toShortString();
        
        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - start;
            log.info("{} 执行成功，耗时: {}ms", methodName, duration);
            return result;
        } catch (Exception e) {
            log.error("{} 执行失败: {}", methodName, e.getMessage());
            throw e;
        }
    }
}

// 场景 2：权限检查
@Aspect
@Component
public class SecurityAspect {
    
    @Before("@annotation(requireRole)")
    public void checkPermission(JoinPoint joinPoint, RequireRole requireRole) {
        String requiredRole = requireRole.value();
        String currentUserRole = getCurrentUserRole();
        
        if (!currentUserRole.equals(requiredRole)) {
            throw new AccessDeniedException("无权访问");
        }
    }
    
    private String getCurrentUserRole() {
        // 从 SecurityContext 获取当前用户角色
        return "ADMIN";
    }
}

// 场景 3：性能监控
@Aspect
@Component
public class PerformanceAspect {
    
    @Around("@annotation(MonitorPerformance)")
    public Object monitorPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.nanoTime();
        try {
            return joinPoint.proceed();
        } finally {
            long duration = System.nanoTime() - start;
            if (duration > 1_000_000_000L) {  // 超过 1 秒
                System.err.println("慢方法警告: " + joinPoint.getSignature() + 
                                   " 耗时: " + (duration / 1_000_000) + "ms");
            }
        }
    }
}`}
            language="java"
            highlights={[13, 34, 52]}
            filename="AopUseCases.java"
            description="AOP 典型应用场景"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区 1：AOP 可以拦截所有方法调用">
            <p className="text-[13px] sm:text-[14px] leading-relaxed">
              <strong>错误认知：</strong>AOP 可以拦截类内部的方法调用。<br/>
              <strong>真相：</strong>Spring AOP 基于代理，只能拦截外部调用。如果类内部方法 A 调用方法 B，方法 B 上的 AOP 不会生效。解决方案：自注入或使用 AspectJ。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：final 方法可以被 AOP 增强">
            <p className="text-[13px] sm:text-[14px] leading-relaxed">
              <strong>错误认知：</strong>final 方法可以正常被 AOP 拦截。<br/>
              <strong>真相：</strong>CGLIB 基于继承实现代理，final 方法无法被子类重写，因此无法被 CGLIB 代理增强。JDK 动态代理不受此限制（基于接口）。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：@Transactional 一定生效">
            <p className="text-[13px] sm:text-[14px] leading-relaxed">
              <strong>错误认知：</strong>标注 @Transactional 的方法一定会开启事务。<br/>
              <strong>真相：</strong>以下情况事务不生效：① 方法不是 public；② 同类内部调用；③ 异常被捕获未抛出；④ 数据库引擎不支持事务（如 MyISAM）；⑤ 未配置事务管理器。
            </p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "Spring AOP 的实现原理是什么？",
                answer: "Spring AOP 基于动态代理实现：① 如果目标类实现了接口，使用 JDK 动态代理（java.lang.reflect.Proxy）；② 如果目标类没有实现接口，使用 CGLIB 代理（通过继承生成子类）。Spring Boot 2.x+ 默认使用 CGLIB。代理对象在方法调用前后织入增强逻辑（Advice）。"
              },
              {
                question: "JDK 动态代理和 CGLIB 的区别？",
                answer: "主要区别：① JDK 动态代理基于接口，CGLIB 基于继承；② JDK 要求目标类实现接口，CGLIB 要求目标类不能是 final；③ JDK 8+ 优化后性能接近 CGLIB；④ CGLIB 创建代理慢但调用快，JDK 相反；⑤ Spring Boot 2.x+ 默认使用 CGLIB。"
              },
              {
                question: "什么是 AOP 的五大通知类型？",
                answer: "五大通知类型：① @Before（前置通知）：方法执行前；② @After（后置通知）：方法执行后，无论是否异常；③ @AfterReturning（返回通知）：方法成功返回后；④ @AfterThrowing（异常通知）：方法抛出异常时；⑤ @Around（环绕通知）：包裹整个方法执行，最强大，可控制方法执行、修改返回值、捕获异常。"
              },
              {
                question: "为什么类内部方法调用会导致 AOP 失效？",
                answer: "Spring AOP 基于代理模式，只有外部调用代理对象时才会触发增强逻辑。当类内部方法 A 调用方法 B 时，调用的是 this.B()，绕过了代理对象，直接调用目标对象的方法，因此 AOP 不生效。解决方案：① 自注入（@Autowired self）；② 通过 AopContext.currentProxy() 获取代理；③ 重构代码，将方法 B 移到另一个类；④ 使用 AspectJ 替代 Spring AOP。"
              },
              {
                question: "@Transactional 在什么情况下会失效？",
                answer: "事务失效场景：① 方法不是 public；② 同类内部方法调用（AOP 失效）；③ 异常被 try-catch 捕获未抛出；④ 数据库引擎不支持事务（如 MySQL MyISAM）；⑤ 未配置或未启用事务管理器；⑥  propagation 设置错误；⑦  rollbackFor 配置不当。"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring AOP 是 Spring 框架的核心技术之一，广泛应用于事务管理、日志记录等场景：
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><strong className="text-ink">前置知识：</strong><a href="/docs/01-java-core/reflection" className="text-accent hover:underline ml-1">反射机制</a>、<a href="/docs/06-spring-framework/spring-core" className="text-accent hover:underline ml-1">Spring IoC</a></li>
            <li><strong className="text-ink">后续学习：</strong><a href="/docs/06-spring-framework/spring-transaction" className="text-accent hover:underline ml-1">Spring 事务管理</a>、<a href="/docs/09-design-patterns/structural-patterns" className="text-accent hover:underline ml-1">代理模式</a></li>
            <li><strong className="text-ink">相关技术：</strong>AspectJ、Java 动态代理、CGLIB</li>
          </ul>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
