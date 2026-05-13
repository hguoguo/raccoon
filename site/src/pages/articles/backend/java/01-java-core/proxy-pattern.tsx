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
  { id: 'overview', text: '一、代理模式概述', level: 2 },
  { id: 'static-proxy', text: '二、静态代理', level: 2 },
  { id: 'jdk-dynamic-proxy', text: '三、JDK 动态代理（重点🔥）', level: 2 },
  { id: 'proxy-principle', text: '3.1 底层原理', level: 3 },
  { id: 'proxy-source', text: '3.2 源码解析', level: 3 },
  { id: 'cglib-proxy', text: '四、CGLIB 动态代理（重点🔥）', level: 2 },
  { id: 'cglib-principle', text: '4.1 底层原理', level: 3 },
  { id: 'comparison', text: '五、JDK vs CGLIB 对比', level: 2 },
  { id: 'spring-aop', text: '六、Spring AOP 中的代理选择', level: 2 },
  { id: 'use-cases', text: '七、实际应用场景', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function ProxyPattern({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <section id="definition">
            <blockquote className="border-l-[3px] border-l-accent pl-4 py-2 my-6 bg-accent-glow rounded-r-paper-md">
              <p className="text-[15px] sm:text-base font-medium text-ink leading-[1.7]">
                代理模式是一种<strong className="text-accent">结构型设计模式</strong>,通过引入代理对象来控制对目标对象的访问,在方法调用前后添加额外逻辑(如日志、事务、权限校验),实现<strong className="text-accent">解耦</strong>和<strong className="text-accent">增强</strong>。Spring AOP 的核心就是基于 JDK 动态代理或 CGLIB 实现的。
              </p>
            </blockquote>
          </section>

          {/* ========== 一、代理模式概述 ========== */}
          <section id="overview">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              一、代理模式概述
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              代理模式的核心思想是"间接访问",客户端不直接调用目标对象,而是通过代理对象进行访问。代理对象可以在调用目标方法前后执行额外操作,如日志记录、性能监控、权限检查等,而无需修改目标对象的代码。
            </p>

            <DiagramBlock title="代理模式 UML 类图">
              <svg className="w-full max-w-[500px] mx-auto block" viewBox="0 0 500 280">
                {/* Subject 接口 */}
                <rect x="180" y="20" width="140" height="50" rx="6" fill="#f5f0e8" stroke="#d4c5a9" strokeWidth="2"/>
                <text x="250" y="35" fill="#6b5e4c" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">&lt;&lt;interface&gt;&gt;</text>
                <text x="250" y="52" fill="#6b5e4c" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Subject</text>
                
                {/* RealSubject 类 */}
                <rect x="30" y="120" width="140" height="70" rx="6" fill="#f5f0e8" stroke="#d4c5a9" strokeWidth="2"/>
                <text x="100" y="140" fill="#6b4a1e" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RealSubject</text>
                <line x1="30" y1="150" x2="170" y2="150" stroke="#d4c5a9"/>
                <text x="100" y="165" fill="#8b7355" fontSize="9" textAnchor="middle" fontFamily="monospace">+ request()</text>
                <text x="100" y="180" fill="#8b7355" fontSize="9" textAnchor="middle" fontFamily="monospace">// 真实业务逻辑</text>
                
                {/* Proxy 类 */}
                <rect x="330" y="120" width="140" height="70" rx="6" fill="rgba(181,101,29,0.15)" stroke="#b5651d" strokeWidth="2"/>
                <text x="400" y="140" fill="#8b4c14" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Proxy</text>
                <line x1="330" y1="150" x2="470" y2="150" stroke="#b5651d"/>
                <text x="400" y="165" fill="#6b4a1e" fontSize="9" textAnchor="middle" fontFamily="monospace">- target: Subject</text>
                <text x="400" y="180" fill="#6b4a1e" fontSize="9" textAnchor="middle" fontFamily="monospace">+ request()</text>
                
                {/* Client */}
                <rect x="180" y="230" width="140" height="40" rx="6" fill="#f5f0e8" stroke="#d4c5a9" strokeWidth="2"/>
                <text x="250" y="255" fill="#6b5e4c" fontSize="12" textAnchor="middle" fontFamily="sans-serif">Client</text>
                
                {/* 继承关系箭头 */}
                <line x1="100" y1="120" x2="220" y2="70" stroke="#6b5e4c" strokeWidth="1.5" strokeDasharray="5,5"/>
                <polygon points="220,70 213,75 217,82" fill="#6b5e4c"/>
                
                <line x1="400" y1="120" x2="280" y2="70" stroke="#6b5e4c" strokeWidth="1.5" strokeDasharray="5,5"/>
                <polygon points="280,70 287,75 283,82" fill="#6b5e4c"/>
                
                {/* 组合关系箭头 */}
                <line x1="400" y1="190" x2="170" y2="190" stroke="#8b4c14" strokeWidth="1.5"/>
                <polygon points="170,190 180,185 180,195" fill="#8b4c14"/>
                <text x="285" y="185" fill="#8b4c14" fontSize="9" textAnchor="middle">持有引用</text>
                
                {/* 依赖关系箭头 */}
                <line x1="250" y1="230" x2="400" y2="190" stroke="#6b5e4c" strokeWidth="1.5"/>
                <polygon points="400,190 390,192 393,198" fill="#6b5e4c"/>
                <text x="340" y="215" fill="#6b5e4c" fontSize="9" textAnchor="middle">使用</text>
              </svg>
            </DiagramBlock>

            <Callout type="info" title="代理模式的三大角色">
              <ul className="list-disc list-inside space-y-1 text-[13px] sm:text-[14px] text-ink-muted">
                <li><strong className="text-ink">Subject（抽象主题）：</strong>定义业务接口,RealSubject 和 Proxy 都实现此接口</li>
                <li><strong className="text-ink">RealSubject（真实主题）：</strong>执行业务逻辑的核心对象</li>
                <li><strong className="text-ink">Proxy（代理）：</strong>持有 RealSubject 引用,控制访问并添加额外逻辑</li>
              </ul>
            </Callout>
          </section>

          {/* ========== 二、静态代理 ========== */}
          <section id="static-proxy">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              二、静态代理
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              静态代理在编译期就确定了代理类和目标类的关系,需要手动编写代理类。虽然简单直观,但每个目标类都需要一个对应的代理类,导致代码冗余。
            </p>

            <Playground 
              code={`// 1. 定义业务接口
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
}`}
              language="java"
              highlights={[24, 25, 26, 32, 33, 34]}
              filename="StaticProxy.java"
              description="静态代理示例:手动编写代理类"
            />

            <Callout type="warning" title="静态代理的缺点">
              <ul className="list-disc list-inside space-y-1 text-[13px] sm:text-[14px] text-ink-muted">
                <li><strong className="text-ink">代码冗余：</strong>每个目标类都需要编写对应的代理类</li>
                <li><strong className="text-ink">维护困难：</strong>接口增加方法时,代理类也需要同步修改</li>
                <li><strong className="text-ink">不够灵活：</strong>无法在运行时动态决定代理逻辑</li>
              </ul>
            </Callout>
          </section>

          {/* ========== 三、JDK 动态代理（重点🔥） ========== */}
          <section id="jdk-dynamic-proxy">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              三、JDK 动态代理（重点🔥）
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              JDK 动态代理在<strong className="text-accent">运行时</strong>动态生成代理类,无需手动编写代理代码。它基于 Java 反射机制,要求目标类必须<strong className="text-accent">实现接口</strong>。这是 Spring AOP 默认使用的代理方式。
            </p>

            <h3 id="proxy-principle" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              3.1 底层原理
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              JDK 动态代理的核心是 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">java.lang.reflect.Proxy</code> 类和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">InvocationHandler</code> 接口:
            </p>

            <DiagramBlock title="JDK 动态代理工作流程">
              <svg className="w-full max-w-[550px] mx-auto block" viewBox="0 0 550 240">
                {/* 步骤 1 */}
                <rect x="20" y="20" width="120" height="50" rx="6" fill="rgba(181,101,29,0.15)" stroke="#b5651d" strokeWidth="2"/>
                <text x="80" y="40" fill="#6b4a1e" fontSize="10" fontWeight="bold" textAnchor="middle">1. 定义接口</text>
                <text x="80" y="55" fill="#8b7355" fontSize="8" textAnchor="middle" fontFamily="monospace">UserService</text>
                
                {/* 箭头 */}
                <line x1="140" y1="45" x2="180" y2="45" stroke="#b5651d" strokeWidth="2"/>
                <polygon points="180,45 172,40 172,50" fill="#b5651d"/>
                
                {/* 步骤 2 */}
                <rect x="180" y="20" width="120" height="50" rx="6" fill="rgba(181,101,29,0.15)" stroke="#b5651d" strokeWidth="2"/>
                <text x="240" y="40" fill="#6b4a1e" fontSize="10" fontWeight="bold" textAnchor="middle">2. 实现接口</text>
                <text x="240" y="55" fill="#8b7355" fontSize="8" textAnchor="middle" fontFamily="monospace">UserServiceImpl</text>
                
                {/* 箭头 */}
                <line x1="300" y1="45" x2="340" y2="45" stroke="#b5651d" strokeWidth="2"/>
                <polygon points="340,45 332,40 332,50" fill="#b5651d"/>
                
                {/* 步骤 3 */}
                <rect x="340" y="20" width="190" height="50" rx="6" fill="rgba(181,101,29,0.2)" stroke="#b5651d" strokeWidth="2"/>
                <text x="435" y="35" fill="#6b4a1e" fontSize="10" fontWeight="bold" textAnchor="middle">3. 创建 InvocationHandler</text>
                <text x="435" y="50" fill="#8b7355" fontSize="8" textAnchor="middle" fontFamily="monospace">(定义增强逻辑)</text>
                
                {/* 步骤 4 */}
                <rect x="140" y="100" width="270" height="50" rx="6" fill="rgba(181,101,29,0.25)" stroke="#b5651d" strokeWidth="3"/>
                <text x="275" y="115" fill="#6b4a1e" fontSize="11" fontWeight="bold" textAnchor="middle">4. Proxy.newProxyInstance()</text>
                <text x="275" y="135" fill="#8b7355" fontSize="9" textAnchor="middle" fontFamily="monospace">动态生成 $Proxy0 类</text>
                
                {/* 箭头 */}
                <line x1="275" y1="70" x2="275" y2="100" stroke="#b5651d" strokeWidth="2"/>
                <polygon points="275,100 270,92 280,92" fill="#b5651d"/>
                
                {/* 步骤 5 */}
                <rect x="140" y="180" width="270" height="50" rx="6" fill="#f5f0e8" stroke="#d4c5a9" strokeWidth="2"/>
                <text x="275" y="195" fill="#6b5e4c" fontSize="11" fontWeight="bold" textAnchor="middle">5. 客户端调用代理方法</text>
                <text x="275" y="215" fill="#8b7355" fontSize="9" textAnchor="middle" fontFamily="monospace">proxy.saveUser() → invoke()</text>
                
                {/* 箭头 */}
                <line x1="275" y1="150" x2="275" y2="180" stroke="#6b5e4c" strokeWidth="2"/>
                <polygon points="275,180 270,172 280,172" fill="#6b5e4c"/>
                
                {/* 侧边说明 */}
                <rect x="430" y="100" width="110" height="130" rx="6" fill="rgba(95,122,104,0.1)" stroke="#5f7a68"/>
                <text x="485" y="120" fill="#4a5f52" fontSize="9" fontWeight="bold" textAnchor="middle">关键点</text>
                <text x="485" y="140" fill="#5f7a68" fontSize="8" textAnchor="middle">• 基于接口</text>
                <text x="485" y="155" fill="#5f7a68" fontSize="8" textAnchor="middle">• 反射机制</text>
                <text x="485" y="170" fill="#5f7a68" fontSize="8" textAnchor="middle">• 运行时生成</text>
                <text x="485" y="185" fill="#5f7a68" fontSize="8" textAnchor="middle">• 字节码技术</text>
                <text x="485" y="200" fill="#5f7a68" fontSize="8" textAnchor="middle">• 缓存复用</text>
              </svg>
            </DiagramBlock>

            <h3 id="proxy-source" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              3.2 源码解析
            </h3>
            <Playground 
              code={`import java.lang.reflect.InvocationHandler;
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
}`}
              language="java"
              highlights={[26, 28, 30, 40, 41, 42, 43]}
              filename="JdkDynamicProxy.java"
              description="JDK 动态代理完整示例"
            />

            <SideNote label="🔍 生成的代理类">
              JVM 会在运行时动态生成名为 <code className="font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded">$Proxy0</code> 的代理类,该类继承 <code className="font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded">Proxy</code> 并实现目标接口。可通过系统属性查看生成的类:<br/>
              <code className="block mt-2 p-2 bg-parchment-warm rounded text-[12px] font-mono">
                System.setProperty("sun.misc.ProxyGenerator.saveGeneratedFiles", "true");
              </code>
            </SideNote>
          </section>

          {/* ========== 四、CGLIB 动态代理（重点🔥） ========== */}
          <section id="cglib-proxy">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              四、CGLIB 动态代理（重点🔥）
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              CGLIB（Code Generation Library）是一个强大的字节码生成库,可以在运行时动态生成目标类的<strong className="text-accent">子类</strong>来实现代理。与 JDK 动态代理不同,CGLIB <strong className="text-accent">不需要目标类实现接口</strong>,但不能代理 final 类或 final 方法。
            </p>

            <h3 id="cglib-principle" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              4.1 底层原理
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              CGLIB 基于 ASM 字节码框架,通过继承目标类并重写方法来生成代理对象。核心类是 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Enhancer</code> 和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">MethodInterceptor</code>。
            </p>

            <Playground 
              code={`import net.sf.cglib.proxy.Enhancer;
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
}`}
              language="java"
              highlights={[15, 17, 19, 29, 30, 31, 34]}
              filename="CglibProxy.java"
              description="CGLIB 动态代理示例"
            />

            <Callout type="warning" title="CGLIB 的限制">
              <ul className="list-disc list-inside space-y-1 text-[13px] sm:text-[14px] text-ink-muted">
                <li><strong className="text-ink">不能代理 final 类：</strong>因为 CGLIB 通过继承实现,final 类无法被继承</li>
                <li><strong className="text-ink">不能代理 final 方法：</strong>final 方法不能被重写</li>
                <li><strong className="text-ink">不能代理 private 方法：</strong>子类无法访问父类的私有方法</li>
                <li><strong className="text-ink">需要额外依赖：</strong>需引入 cglib 或 spring-core(已包含 cglib)</li>
              </ul>
            </Callout>
          </section>

          {/* ========== 五、JDK vs CGLIB 对比 ========== */}
          <section id="comparison">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              五、JDK vs CGLIB 对比
            </h2>

            <div className="overflow-x-auto my-5">
              <table className="w-full text-[12px] sm:text-[13px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 font-semibold text-ink">维度</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">JDK 动态代理</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">CGLIB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted font-semibold">实现机制</td>
                    <td className="py-2 px-3 text-ink">基于接口,实现 InvocationHandler</td>
                    <td className="py-2 px-3 text-ink">基于继承,生成子类</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted font-semibold">是否需要接口</td>
                    <td className="py-2 px-3 text-accent font-semibold">✅ 必须有接口</td>
                    <td className="py-2 px-3 text-ink">❌ 不需要接口</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted font-semibold">能否代理 final</td>
                    <td className="py-2 px-3 text-ink">✅ 可以(基于接口)</td>
                    <td className="py-2 px-3 text-red-600 font-semibold">❌ 不可以</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted font-semibold">性能(JDK 8+)</td>
                    <td className="py-2 px-3 text-accent font-semibold">较快(优化后接近 CGLIB)</td>
                    <td className="py-2 px-3 text-ink">略快(但差距缩小)</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted font-semibold">Spring 默认选择</td>
                    <td className="py-2 px-3 text-accent font-semibold">有接口时用 JDK</td>
                    <td className="py-2 px-3 text-ink">无接口时用 CGLIB</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted font-semibold">依赖</td>
                    <td className="py-2 px-3 text-ink">JDK 自带,无需额外依赖</td>
                    <td className="py-2 px-3 text-ink">需引入 cglib 或 spring-core</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ContextSwitcher 
              simpleContent={
                <div className="space-y-3">
                  <p className="text-[14px] text-ink-muted"><strong className="text-ink">简单记忆:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-[14px] text-ink-muted">
                    <li>目标类<strong className="text-accent">有接口</strong> → 用 JDK 动态代理</li>
                    <li>目标类<strong className="text-accent">没接口</strong> → 用 CGLIB</li>
                    <li>Spring Boot 2.x 后可以强制使用 CGLIB: <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">spring.aop.proxy-target-class=true</code></li>
                  </ul>
                </div>
              }
              hardcoreContent={
                <div className="space-y-3">
                  <p className="text-[14px] text-ink-muted"><strong className="text-ink">深入底层:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-[14px] text-ink-muted">
                    <li>JDK 代理生成的 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">$Proxy0</code> 类持有了 InvocationHandler 引用,每次方法调用都通过反射执行 handler.invoke()</li>
                    <li>CGLIB 生成的子类重写了所有非 final 方法,通过 FastClass 机制避免反射,性能略优</li>
                    <li>JDK 8 之后,反射性能大幅提升,JDK 代理与 CGLIB 的性能差距已不明显</li>
                    <li>Spring 5.x 默认策略:优先 JDK 代理,可通过 <code className="font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded">@EnableAspectJAutoProxy(proxyTargetClass = true)</code> 强制 CGLIB</li>
                  </ul>
                </div>
              }
            />
          </section>

          {/* ========== 六、Spring AOP 中的代理选择 ========== */}
          <section id="spring-aop">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              六、Spring AOP 中的代理选择
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Spring AOP 自动根据目标类是否实现接口来选择代理方式,理解这一机制对于排查 AOP 失效问题至关重要。
            </p>

            <Playground 
              code={`// Spring AOP 代理选择规则:
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
}`}
              language="java"
              highlights={[14, 28, 38, 39, 48]}
              filename="SpringAopProxy.java"
              description="Spring AOP 代理选择与陷阱"
            />

            <Callout type="danger" title="Spring AOP 经典陷阱">
              <p className="text-[13px] sm:text-[14px] text-ink-muted">
                <strong className="text-ink">同类内部调用不触发 AOP:</strong>当在一个方法中调用同一个类的另一个带有 @Transactional 或 @Cacheable 的方法时,AOP 不会生效。原因是 Spring AOP 基于代理,只有通过代理对象调用才会触发增强逻辑,而 <code className="font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded">this.method()</code> 是直接调用目标对象。<br/><br/>
                <strong className="text-accent">解决方案:</strong>① 注入自身代理对象;② 将方法拆分到不同的类;③ 使用 AspectJ 编译期织入(而非 Spring AOP 运行时代理)
              </p>
            </Callout>
          </section>

          {/* ========== 七、实际应用场景 ========== */}
          <section id="use-cases">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              七、实际应用场景
            </h2>

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              场景 1:日志记录
            </h3>
            <Playground 
              code={`@Aspect
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
}`}
              language="java"
              highlights={[5, 11, 13]}
              filename="LoggingAspect.java"
              description="使用 AOP 记录方法执行时间"
            />

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              场景 2:事务管理
            </h3>
            <Playground 
              code={`@Service
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
}`}
              language="java"
              highlights={[9]}
              filename="TransactionProxy.java"
              description="@Transactional 基于代理实现"
            />

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              场景 3:权限校验
            </h3>
            <Playground 
              code={`@Aspect
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
}`}
              language="java"
              highlights={[5, 10]}
              filename="SecurityAspect.java"
              description="使用 AOP 实现权限校验"
            />
          </section>

          {/* ========== 八、常见误区 ========== */}
          <section id="misconceptions">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              八、常见误区
            </h2>

            <Callout type="danger" title="误区一：JDK 动态代理比 CGLIB 慢">
              <span className="font-semibold text-ink-light">你以为的：</span>CGLIB 基于字节码,应该比 JDK 反射快很多<br/>
              <span className="font-semibold text-accent">实际：</span>JDK 8 之后反射性能大幅提升,两者差距已不明显。Spring 5.x 基准测试显示,JDK 代理在某些场景下甚至略快于 CGLIB。
            </Callout>

            <Callout type="danger" title="误区二：Spring AOP 可以拦截所有方法调用">
              <span className="font-semibold text-ink-light">你以为的：</span>加了 @Transactional 就万事大吉<br/>
              <span className="font-semibold text-accent">实际：</span>Spring AOP 基于代理,只有<strong className="text-accent">通过代理对象调用</strong>才会触发增强。同类内部的 <code className="font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded">this.method()</code> 调用会绕过代理,导致事务失效。
            </Callout>

            <Callout type="danger" title="误区三：CGLIB 可以代理任何类">
              <span className="font-semibold text-ink-light">你以为的：</span>CGLIB 功能强大,应该能代理所有类<br/>
              <span className="font-semibold text-accent">实际：</span>CGLIB 基于继承,无法代理 final 类、final 方法和 private 方法。这些限制在设计领域驱动模型时需要特别注意。
            </Callout>

            <Callout type="danger" title="误区四：代理对象和目标对象是同一个实例">
              <span className="font-semibold text-ink-light">你以为的：</span><code className="font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded">proxy == target</code> 应该返回 true<br/>
              <span className="font-semibold text-accent">实际：</span>代理对象是新生成的实例(JDK 代理是 <code className="font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded">$Proxy0</code>,CGLIB 代理是子类),与目标对象不是同一个实例。这会导致 <code className="font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded">==</code> 比较失败,应使用 <code className="font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded">equals()</code>。
            </Callout>
          </section>

          {/* ========== 九、面试真题 ========== */}
          <section id="interview">
            <InterviewSection 
              questions={[
                {
                  question: "JDK 动态代理和 CGLIB 的区别是什么？Spring 如何选择？",
                  answer: "JDK 动态代理基于接口实现,要求目标类必须实现接口;CGLIB 基于继承实现,通过生成子类来代理,无需接口但不能代理 final 类/方法。Spring AOP 默认策略:目标类有接口时用 JDK 代理,无接口时用 CGLIB。可通过 spring.aop.proxy-target-class=true 强制使用 CGLIB。"
                },
                {
                  question: "为什么同类内部调用不会触发 Spring AOP？如何解决？",
                  answer: "Spring AOP 基于代理机制,只有通过代理对象调用才会触发增强逻辑。同类内部的 this.method() 是直接调用目标对象,绕过了代理。解决方案:① 注入自身代理对象(@Autowired private SelfType self);② 将方法拆分到不同类;③ 使用 AspectJ 编译期织入。"
                },
                {
                  question: "JDK 动态代理的底层原理是什么？",
                  answer: "JDK 动态代理基于 java.lang.reflect.Proxy 类和 InvocationHandler 接口。Proxy.newProxyInstance() 在运行时动态生成代理类(名为 $Proxy0),该类继承 Proxy 并实现目标接口。代理类的所有方法调用都会转发到 InvocationHandler.invoke() 方法,在其中可以添加增强逻辑并通过 method.invoke(target, args) 调用目标方法。"
                },
                {
                  question: "CGLIB 为什么不能代理 final 方法？",
                  answer: "CGLIB 通过继承目标类并重写方法来实现代理。final 方法不能被重写,因此 CGLIB 无法为 final 方法生成增强逻辑。同理,final 类也不能被继承,所以 CGLIB 无法代理 final 类。private 方法由于子类不可见,也无法被代理。"
                },
                {
                  question: "@Transactional 注解失效的常见原因有哪些？",
                  answer: "① 同类内部调用(this.method())绕过代理;② 方法不是 public(Spring AOP 只能代理 public 方法);③ 异常被 try-catch 捕获未抛出;④ 数据库引擎不支持事务(如 MyISAM);⑤ 未被 Spring 容器管理(缺少 @Service/@Component);⑥ 传播行为配置错误。"
                },
                {
                  question: "如何查看 JDK 动态代理生成的代理类？",
                  answer: "通过系统属性 sun.misc.ProxyGenerator.saveGeneratedFiles=true 可以让 JVM 将生成的代理类保存到磁盘。代码:System.setProperty(\"sun.misc.ProxyGenerator.saveGeneratedFiles\", \"true\"); 生成的类文件位于项目根目录下的 com/sun/proxy/$Proxy0.class。"
                },
                {
                  question: "静态代理和动态代理各有什么优缺点？",
                  answer: "静态代理优点:简单直观,编译期确定,性能好;缺点:代码冗余,每个目标类都需要编写代理类,维护困难。动态代理优点:灵活,无需手动编写代理类,可在运行时动态决定代理逻辑;缺点:基于反射,性能略低(但 JDK 8 后差距缩小),调试困难。"
                }
              ]}
            />
          </section>

          {/* ========== 十、知识关联 ========== */}
          <section id="related">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              十、知识关联
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-parchment-light border border-border rounded-paper-md">
                <div className="text-[10px] font-mono text-ink-ghost mb-1">前置知识</div>
                <div className="text-[13px] font-medium text-ink">Java基础、反射机制</div>
              </div>
              <div className="p-4 bg-accent-glow border border-accent/20 rounded-paper-md">
                <div className="text-[10px] font-mono text-accent mb-1">延伸知识</div>
                <div className="text-[13px] font-medium text-ink">Spring AOP、结构型设计模式</div>
              </div>
            </div>
          </section>

          {/* ⚠️ 文章导航（上一篇/下一篇），必须添加在 KnowledgeLayout 内部 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      {/* ⚠️ SmartTOC 直接渲染，不要用 <aside> 包裹！组件自行管理桌面端右侧栏和移动端右侧抽屉 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
