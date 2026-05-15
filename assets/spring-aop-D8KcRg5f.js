import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as n}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as o}from"./SideNote-BKvanovA.js";import{C as r,A as c,S as d}from"./ArticleNav-DhfiS38Y.js";import{D as a}from"./DiagramBlock-CLaKE9_7.js";import{I as l}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"core",text:"核心原理",level:2},{id:"proxy-mechanism",text:"代理机制",level:3},{id:"advice-types",text:"通知类型",level:3},{id:"pointcut-expression",text:"切点表达式",level:3},{id:"playground",text:"代码实验场",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比分析",level:2}];function f({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(n,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:[e.jsx("strong",{children:"Spring AOP（面向切面编程）"}),"是一种通过动态代理技术，将横切关注点（如日志、事务、安全） 从业务逻辑中分离出来的编程范式，通过",e.jsx("strong",{children:"Advice（通知）"}),"、",e.jsx("strong",{children:"Pointcut（切点）"}),"、",e.jsx("strong",{children:"Aspect（切面）"}),"三大核心概念， 实现代码解耦和复用。"]})}),e.jsx(r,{type:"tip",title:"为什么需要 AOP？",children:"在传统 OOP 中，日志、事务、权限校验等横切关注点会分散在各个业务方法中，导致代码重复和耦合。 AOP 将这些关注点抽取出来，集中管理，业务代码只需关注核心逻辑，大大提升了代码的可维护性和可测试性。"}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"整体架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Spring AOP 的核心是通过",e.jsx("strong",{children:"动态代理"}),"在运行时为目标对象创建代理， 在方法调用前后插入额外的逻辑（通知）。"]}),e.jsx(a,{title:"Spring AOP 工作流程",children:`
┌─────────────────────────────────────────────┐
│              Client Code                     │
│         调用目标方法                          │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│         Proxy Object (代理对象)               │
│   ┌─────────────────────────────────────┐   │
│   │  Before Advice (前置通知)            │   │
│   ├─────────────────────────────────────┤   │
│   │  Target Method (目标方法)            │   │
│   ├─────────────────────────────────────┤   │
│   │  After Returning (后置通知)          │   │
│   │  After Throwing (异常通知)           │   │
│   │  After (最终通知)                    │   │
│   └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│         Target Object (目标对象)              │
│         实际业务逻辑                          │
└─────────────────────────────────────────────┘

注意：Spring AOP 默认使用 JDK 动态代理（接口），如果目标类没有实现接口，
则使用 CGLIB 代理（子类继承）。
            `}),e.jsx(o,{children:e.jsxs("p",{className:"text-sm text-ink-muted",children:[e.jsx("strong",{children:"关键点："}),"Spring AOP 只能拦截 ",e.jsx("code",{className:"font-mono text-xs",children:"public"}),"方法，且只有通过代理调用的方法才会被拦截。同类方法自调用不会经过代理，AOP 失效。"]})}),e.jsx("h2",{id:"core",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"核心原理"}),e.jsx("h3",{id:"proxy-mechanism",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"代理机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spring AOP 支持两种代理方式："}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"特性"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"JDK 动态代理"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"CGLIB"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"原理"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"基于接口，生成接口的实现类"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"基于继承，生成目标类的子类"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"要求"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"目标类必须实现接口"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"目标类不能是 final"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"性能"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"JDK 8+ 性能接近 CGLIB"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"早期版本性能更好"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"默认策略"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"Spring Boot 2.x+ 默认"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"需手动配置"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"适用场景"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"面向接口编程"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"无接口的类"})]})]})]})}),e.jsx(t,{code:`// JDK 动态代理示例
public class JdkProxyExample {
    
    interface UserService {
        void createUser(String name);
    }
    
    static class UserServiceImpl implements UserService {
        @Override
        public void createUser(String name) {
            System.out.println("创建用户: " + name);
        }
    }
    
    public static void main(String[] args) {
        UserService target = new UserServiceImpl();
        
        // 创建代理
        UserService proxy = (UserService) Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            target.getClass().getInterfaces(),
            (proxyObj, method, methodArgs) -> {
                System.out.println("Before: " + method.getName());
                Object result = method.invoke(target, methodArgs);
                System.out.println("After: " + method.getName());
                return result;
            }
        );
        
        // 调用代理方法
        proxy.createUser("张三");
        // 输出：
        // Before: createUser
        // 创建用户: 张三
        // After: createUser
    }
}`,language:"java",description:"JDK 动态代理示例"}),e.jsx("h3",{id:"advice-types",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"通知类型"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Spring AOP 提供了 ",e.jsx("strong",{children:"5 种通知类型"}),"："]}),e.jsx(t,{code:`@Aspect
@Component
public class LoggingAspect {
    
    // 1. Before Advice - 前置通知（方法执行前）
    @Before("execution(* com.example.service.*.*(..))")
    public void beforeAdvice(JoinPoint joinPoint) {
        System.out.println("Before: " + joinPoint.getSignature().getName());
    }
    
    // 2. After Returning - 后置通知（方法正常返回后）
    @AfterReturning(pointcut = "execution(* com.example.service.*.*(..))", returning = "result")
    public void afterReturningAdvice(JoinPoint joinPoint, Object result) {
        System.out.println("After Returning: " + result);
    }
    
    // 3. After Throwing - 异常通知（方法抛出异常后）
    @AfterThrowing(pointcut = "execution(* com.example.service.*.*(..))", throwing = "ex")
    public void afterThrowingAdvice(JoinPoint joinPoint, Throwable ex) {
        System.out.println("After Throwing: " + ex.getMessage());
    }
    
    // 4. After (Finally) - 最终通知（无论是否异常都执行）
    @After("execution(* com.example.service.*.*(..))")
    public void afterAdvice(JoinPoint joinPoint) {
        System.out.println("After (Finally): cleanup resources");
    }
    
    // 5. Around - 环绕通知（最强大，可以控制方法执行）
    @Around("execution(* com.example.service.*.*(..))")
    public Object aroundAdvice(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("Around: Before");
        try {
            Object result = joinPoint.proceed();  // 执行目标方法
            System.out.println("Around: After Returning");
            return result;
        } catch (Throwable ex) {
            System.out.println("Around: After Throwing");
            throw ex;
        } finally {
            System.out.println("Around: After Finally");
        }
    }
}`,language:"java",description:"5种通知类型示例"}),e.jsx("h3",{id:"pointcut-expression",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"切点表达式"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"切点表达式用于定义哪些方法需要被拦截，Spring 使用 AspectJ 的切点表达式语言："}),e.jsx(t,{code:`// 切点表达式语法：
// execution(modifiers-pattern? ret-type-pattern declaring-type-pattern? name-pattern(param-pattern) throws-pattern?)

// 示例：
@Pointcut("execution(public * com.example.service.*.*(..))")
//     ↓       ↓    ↓                      ↓     ↓    ↓
//   修饰符  返回值  包名.类名             方法名  参数  异常

// 常用表达式：
// 1. 拦截所有 public 方法
@Pointcut("execution(public * *(..))")

// 2. 拦截指定包下所有类的所有方法
@Pointcut("execution(* com.example.service.*.*(..))")

// 3. 拦截指定类的所有方法
@Pointcut("execution(* com.example.service.UserService.*(..))")

// 4. 拦截指定方法
@Pointcut("execution(* com.example.service.UserService.createUser(..))")

// 5. 拦截带特定注解的方法
@Pointcut("@annotation(org.springframework.transaction.annotation.Transactional)")

// 6. 组合表达式
@Pointcut("execution(* com.example.service.*.*(..)) && !execution(* *.toString(..))")`,language:"java",description:"切点表达式语法"}),e.jsx("h2",{id:"playground",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"代码实验场"}),e.jsx(t,{code:`@Aspect
@Component
@Slf4j
public class PerformanceAspect {
    
    /**
     * 性能监控切面：记录方法执行时间
     */
    @Around("@annotation(com.example.annotation.MonitorPerformance)")
    public Object monitorPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        
        try {
            // 执行目标方法
            Object result = joinPoint.proceed();
            
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            
            log.info("Method: {}, Duration: {}ms", 
                joinPoint.getSignature().toShortString(), duration);
            
            // 如果执行时间超过阈值，记录警告
            if (duration > 1000) {
                log.warn("Slow method detected: {} took {}ms", 
                    joinPoint.getSignature().toShortString(), duration);
            }
            
            return result;
        } catch (Throwable ex) {
            long endTime = System.currentTimeMillis();
            log.error("Method failed after {}ms: {}", 
                endTime - startTime, joinPoint.getSignature().toShortString(), ex);
            throw ex;
        }
    }
}

// 使用示例
@Service
public class OrderService {
    
    @MonitorPerformance  // 添加注解即可启用性能监控
    public Order createOrder(OrderRequest request) {
        // 业务逻辑...
        return order;
    }
}`,language:"java",description:"性能监控切面示例"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"常见误区"}),e.jsxs(r,{type:"danger",title:"误区 1：认为 AOP 可以拦截所有方法",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 错误认知：AOP 可以拦截 private、protected 方法"}),e.jsxs("p",{className:"text-sm",children:["✅ 正确理解：Spring AOP ",e.jsx("strong",{children:"只能拦截 public 方法"}),"。private、protected、default 修饰的方法无法被代理拦截。如果需要拦截非 public 方法，应使用 AspectJ（编译时织入）。"]})]}),e.jsxs(r,{type:"danger",title:"误区 2：忽略自调用问题",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 危险做法："}),e.jsx("pre",{className:"bg-parchment-deep p-3 rounded-paper-sm text-sm font-mono",children:`@Service
public class UserService {
    public void createUser() {
        this.validateUser();  // 自调用，AOP 失效！
    }
    
    @Transactional
    public void validateUser() {
        // 事务不会生效
    }
}`}),e.jsxs("p",{className:"text-sm mt-2",children:["✅ 解决方案：注入自身代理对象 ",e.jsx("code",{className:"font-mono text-xs",children:"@Autowired private UserService self;"}),"然后调用 ",e.jsx("code",{className:"font-mono text-xs",children:"self.validateUser()"})]})]}),e.jsxs(r,{type:"danger",title:"误区 3：认为 Around 通知可以省略 proceed()",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 危险做法："}),e.jsx("pre",{className:"bg-parchment-deep p-3 rounded-paper-sm text-sm font-mono",children:`@Around("execution(* *.*(..))")
public Object aroundAdvice(ProceedingJoinPoint pjp) {
    System.out.println("Before");
    // 忘记调用 pjp.proceed()，目标方法不会执行！
    System.out.println("After");
    return null;
}`}),e.jsxs("p",{className:"text-sm mt-2",children:["✅ 正确做法：必须调用 ",e.jsx("code",{className:"font-mono text-xs",children:"pjp.proceed()"})," 执行目标方法， 除非你故意要阻止方法执行（如权限校验失败）。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"面试真题"}),e.jsx(l,{questions:[{question:"Spring AOP 的实现原理是什么？",answer:`Spring AOP 基于动态代理实现：

1. 代理方式：
   - JDK 动态代理：基于接口，生成接口的实现类
   - CGLIB：基于继承，生成目标类的子类
   
2. 选择策略：
   - 如果目标类实现了接口 → 默认使用 JDK 动态代理
   - 如果目标类没有接口 → 使用 CGLIB
   - Spring Boot 2.x+ 可以通过配置强制使用 CGLIB

3. 工作流程：
   a. Spring 启动时扫描 @Aspect 注解的切面类
   b. 解析切点表达式，确定哪些 Bean 需要被代理
   c. 为符合条件的 Bean 创建代理对象
   d. 代理对象包裹了目标对象和通知逻辑
   e. 调用代理方法时，先执行通知，再执行目标方法

4. 底层技术：
   - JDK 动态代理：java.lang.reflect.Proxy + InvocationHandler
   - CGLIB：net.sf.cglib.proxy.Enhancer + MethodInterceptor

5. 局限性：
   - 只能拦截 public 方法
   - 只能拦截通过代理调用的方法（自调用失效）
   - 无法拦截 final 方法（CGLIB）`},{question:"JDK 动态代理和 CGLIB 的区别是什么？如何选择？",answer:`主要区别：

1. 实现原理：
   - JDK 动态代理：基于接口，生成接口的实现类
   - CGLIB：基于继承，生成目标类的子类

2. 使用条件：
   - JDK：目标类必须实现接口
   - CGLIB：目标类不能是 final，方法不能是 final

3. 性能：
   - JDK 8+：两者性能接近，JDK 略优
   - JDK 7 及以前：CGLIB 性能更好

4. 功能：
   - JDK：只能代理接口方法
   - CGLIB：可以代理类的所有非 final 方法

5. 依赖：
   - JDK：无需额外依赖
   - CGLIB：需要 cglib 库（Spring 已内置）

选择原则：
- Spring Boot 2.x+：默认使用 JDK 动态代理
- 如果需要代理没有接口的类：使用 CGLIB
- 配置方式：spring.aop.proxy-target-class=true 强制使用 CGLIB

最佳实践：
- 优先面向接口编程，使用 JDK 动态代理
- 只有在必要时才使用 CGLIB`},{question:"Spring AOP 和 AspectJ 的区别是什么？",answer:`核心区别：

1. 织入时机：
   - Spring AOP：运行时织入（动态代理）
   - AspectJ：编译时织入或加载时织入

2. 功能范围：
   - Spring AOP：只能拦截方法调用
   - AspectJ：可以拦截字段访问、构造器调用、静态方法等

3. 性能：
   - Spring AOP：有代理开销，但影响不大
   - AspectJ：无运行时开销，性能更好

4. 复杂度：
   - Spring AOP：简单易用，与 Spring 集成好
   - AspectJ：学习曲线陡峭，配置复杂

5. 适用场景：
   - Spring AOP：大多数企业应用（日志、事务、安全）
   - AspectJ：需要更细粒度控制的场景

6. 依赖：
   - Spring AOP：只需 spring-aop
   - AspectJ：需要 aspectjweaver、aspectjrt

推荐：
- 90% 的场景使用 Spring AOP 就足够了
- 只有在 Spring AOP 无法满足需求时才考虑 AspectJ`},{question:"什么是 AOP 中的 JoinPoint、Pointcut、Advice、Aspect？",answer:`AOP 核心概念：

1. JoinPoint（连接点）：
   - 程序执行过程中的某个点（方法调用、异常抛出等）
   - Spring AOP 只支持方法级别的连接点
   - 通过 JoinPoint 对象可以获取方法签名、参数等信息

2. Pointcut（切点）：
   - 一组 JoinPoint 的集合，定义了哪些方法需要被拦截
   - 使用切点表达式定义，如 execution(* com.example.service.*.*(..))
   - 一个切面可以有多个切点

3. Advice（通知）：
   - 在切点处执行的额外逻辑
   - 5 种类型：Before、After Returning、After Throwing、After、Around
   - Around 最强大，可以控制方法是否执行

4. Aspect（切面）：
   - Pointcut + Advice 的组合
   - 使用 @Aspect 注解标记的类
   - 一个切面可以包含多个切点和通知

关系：
Aspect = Pointcut（在哪里）+ Advice（做什么）

示例：
@Aspect
@Component
public class LoggingAspect {  // Aspect
    
    @Before("execution(* com.example.service.*.*(..))")  // Pointcut
    public void logBefore(JoinPoint jp) {  // Advice
        System.out.println("Before: " + jp.getSignature());
    }
}`},{question:"Spring AOP 有哪些典型应用场景？",answer:`Spring AOP 的典型应用场景：

1. 日志记录：
   - 记录方法调用、参数、返回值、执行时间
   - 统一日志格式，便于排查问题

2. 事务管理：
   - @Transactional 就是基于 AOP 实现
   - 自动开启、提交、回滚事务

3. 权限校验：
   - 在方法执行前检查用户权限
   - 无权限时抛出异常，阻止方法执行

4. 性能监控：
   - 记录方法执行时间
   - 检测慢方法，优化性能

5. 缓存：
   - @Cacheable、@CacheEvict 等注解
   - 方法执行前检查缓存，执行后更新缓存

6. 异常处理：
   - 统一捕获和处理异常
   - 转换为友好的错误信息

7. 审计：
   - 记录关键操作（如删除、修改）
   - 满足合规要求

8. 重试机制：
   - @Retryable 注解
   - 方法失败时自动重试

最佳实践：
- 避免在切面中编写复杂业务逻辑
- 切面应该轻量、无状态
- 注意切面的执行顺序（@Order）`}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"对比分析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"AOP vs OOP 的对比："}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"维度"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"OOP（面向对象）"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"AOP（面向切面）"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"关注点"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"纵向业务逻辑"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"横向横切关注点"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"模块化"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"类、对象"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"切面"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"解决的问题"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"代码复用、封装"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"代码解耦、分离关注点"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"典型应用"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"业务实体、服务"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"日志、事务、安全"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"关系"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"互补，不是替代"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"补充 OOP 的不足"})]})]})]})}),e.jsxs("section",{id:"related",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"关联知识"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 border border-border rounded-paper-md hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-sm mb-2",children:"→ Spring事务管理"}),e.jsx("p",{className:"text-xs text-ink-muted",children:"学习 AOP 在事务中的应用"})]}),e.jsxs("div",{className:"p-4 border border-border rounded-paper-md hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-sm mb-2",children:"→ 代理模式详解"}),e.jsx("p",{className:"text-xs text-ink-muted",children:"深入理解 JDK 动态代理和 CGLIB"})]})]})]}),e.jsx(c,{...i(s.category,s.id)})]})}),e.jsx(d,{items:m})]})}export{f as default};
