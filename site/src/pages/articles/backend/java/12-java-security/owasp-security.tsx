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
  { id: 'overview', text: 'OWASP Top 10概览', level: 2 },
  { id: 'injection', text: 'A01 - 注入攻击', level: 2 },
  { id: 'sql-injection', text: 'SQL注入详解', level: 3 },
  { id: 'xss', text: 'A02 - XSS跨站脚本', level: 2 },
  { id: 'stored-xss', text: '存储型XSS', level: 3 },
  { id: 'reflected-xss', text: '反射型XSS', level: 3 },
  { id: 'broken-auth', text: 'A07 - 身份认证失效', level: 2 },
  { id: 'csrf', text: 'A08 - CSRF跨站请求伪造', level: 2 },
  { id: 'security-misconfig', text: 'A05 - 安全配置错误', level: 2 },
  { id: 'sensitive-data', text: 'A04 - 敏感数据泄露', level: 2 },
  { id: 'playground', text: '代码实验场', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比分析', level: 2 },
]

export default function OwaspSecurity({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              <strong>OWASP Top 10</strong>是开放Web应用安全项目发布的十大Web应用安全风险榜单，
              包括<strong>注入攻击</strong>、<strong>XSS</strong>、<strong>身份认证失效</strong>等常见漏洞，
              是Web开发人员必须掌握的安全知识体系。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么OWASP如此重要？">
            OWASP（Open Web Application Security Project）是全球最权威的Web安全组织：
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>行业标准</strong>：被全球企业和政府机构广泛采用</li>
              <li><strong>实战导向</strong>：基于真实漏洞数据统计</li>
              <li><strong>免费开源</strong>：所有资源公开可用</li>
              <li><strong>持续更新</strong>：每3-4年更新一次，反映最新威胁</li>
            </ul>
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            OWASP Top 10概览
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            OWASP Top 10 2021版本列出了最关键的Web应用安全风险：
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-border border border-border rounded-paper-md">
              <thead className="bg-parchment-deep">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">排名</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">风险名称</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">危害程度</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">发生频率</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                <tr><td className="px-4 py-3 font-mono text-sm">A01</td><td className="px-4 py-3 text-sm font-medium">注入攻击（Injection）</td><td className="px-4 py-3 text-sm text-red-600">⭐⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">非常普遍</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">A02</td><td className="px-4 py-3 text-sm font-medium">加密失败（Cryptographic Failures）</td><td className="px-4 py-3 text-sm text-red-600">⭐⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">常见</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">A03</td><td className="px-4 py-3 text-sm font-medium">注入攻击（Injection）</td><td className="px-4 py-3 text-sm text-red-600">⭐⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">非常普遍</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">A04</td><td className="px-4 py-3 text-sm font-medium">不安全设计（Insecure Design）</td><td className="px-4 py-3 text-sm text-orange-600">⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">新兴威胁</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">A05</td><td className="px-4 py-3 text-sm font-medium">安全配置错误（Security Misconfiguration）</td><td className="px-4 py-3 text-sm text-orange-600">⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">非常普遍</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">A06</td><td className="px-4 py-3 text-sm font-medium">脆弱组件（Vulnerable Components）</td><td className="px-4 py-3 text-sm text-orange-600">⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">非常普遍</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">A07</td><td className="px-4 py-3 text-sm font-medium">身份认证失效（Authentication Failures）</td><td className="px-4 py-3 text-sm text-red-600">⭐⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">常见</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">A08</td><td className="px-4 py-3 text-sm font-medium">软件和数据完整性失效</td><td className="px-4 py-3 text-sm text-orange-600">⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">新兴威胁</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">A09</td><td className="px-4 py-3 text-sm font-medium">安全日志和监控失效</td><td className="px-4 py-3 text-sm text-yellow-600">⭐⭐⭐</td><td className="px-4 py-3 text-sm">常见</td></tr>
                <tr><td className="px-4 py-3 font-mono text-sm">A10</td><td className="px-4 py-3 text-sm font-medium">服务端请求伪造（SSRF）</td><td className="px-4 py-3 text-sm text-orange-600">⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">不常见但严重</td></tr>
              </tbody>
            </table>
          </div>

          <SideNote>
            <p className="text-sm text-ink-muted">
              <strong>注意：</strong>本文重点讲解最常见的几种漏洞类型及其防护方法。
              完整内容请参考<a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">OWASP官网</a>。
            </p>
          </SideNote>

          <h2 id="injection" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            A01 - 注入攻击
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>注入攻击</strong>是最危险的Web安全漏洞之一。攻击者通过输入恶意数据，
            欺骗解释器执行非预期的命令。常见类型包括SQL注入、命令注入、LDAP注入等。
          </p>

          <h3 id="sql-injection" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            SQL注入详解
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>SQL注入</strong>是最经典的注入攻击，攻击者通过在输入字段中插入SQL代码，
            操纵数据库查询。
          </p>

          <DiagramBlock title="SQL注入攻击流程">
            {`
攻击者                         Web应用                      数据库
   |                               |                           |
   |  1. 输入恶意数据               |                           |
   |     username: admin'--        |                           |
   |  ──────────────────────────►  |                           |
   |                               |                           |
   |                          2. 拼接SQL语句
   |                             query = "SELECT * FROM users
   |                                      WHERE username='" +
   |                                      username + "'"
   |                           |
   |                          3. 执行SQL
   |                          ──────────────────────────►
   |                                                       |
   |                                                  SELECT * FROM users
   |                                                  WHERE username='admin'--'
   |                                                  （注释掉密码验证）
   |                                                       |
   |                          4. 返回结果                   |
   |                          ◄──────────────────────────  |
   |                          （绕过登录验证！）             |
   |                               |
   |                          ✗ 安全漏洞 exploited
            `}
          </DiagramBlock>

          <Callout type="danger" title="❌ 错误做法：字符串拼接SQL">
            <pre className="bg-parchment-deep p-3 rounded-paper-sm text-sm font-mono mb-2">
{`// 绝对不要这样做！
String sql = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery(sql);`}
            </pre>
            <p className="text-sm">
              攻击者输入：<code className="font-mono text-xs">admin' OR '1'='1</code><br/>
              生成的SQL：<code className="font-mono text-xs">SELECT * FROM users WHERE username='admin' OR '1'='1' AND password='xxx'</code><br/>
              结果：绕过密码验证，直接登录！
            </p>
          </Callout>

          <Callout type="tip" title="✅ 正确做法：使用预编译语句">
            <pre className="bg-parchment-deep p-3 rounded-paper-sm text-sm font-mono mb-2">
{`// 使用PreparedStatement防止SQL注入
String sql = "SELECT * FROM users WHERE username=? AND password=?";
PreparedStatement pstmt = connection.prepareStatement(sql);
pstmt.setString(1, username);
pstmt.setString(2, password);
ResultSet rs = pstmt.executeQuery();`}
            </pre>
            <p className="text-sm">
              预编译语句将数据和SQL分离，即使输入包含特殊字符，也只会被当作数据处理，不会改变SQL结构。
            </p>
          </Callout>

          <h2 id="xss" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            A02 - XSS跨站脚本
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>XSS（Cross-Site Scripting）</strong>是攻击者在网页中注入恶意脚本，
            当其他用户浏览该页面时，脚本会在其浏览器中执行。主要危害包括窃取Cookie、会话劫持、钓鱼攻击等。
          </p>

          <h3 id="stored-xss" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            存储型XSS
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>存储型XSS</strong>：恶意脚本被永久存储在服务器（如数据库），
            每次用户访问相关页面都会执行。危害最大。
          </p>

          <Playground
            code={`// ❌ 危险做法：直接输出用户输入
@RequestMapping("/comment")
public String addComment(@RequestParam String content) {
    // 直接保存到数据库，未做任何过滤
    commentRepository.save(new Comment(content));
    return "redirect:/comments";
}

@GetMapping("/comments")
public String viewComments(Model model) {
    List<Comment> comments = commentRepository.findAll();
    model.addAttribute("comments", comments);
    return "comments";  // Thymeleaf模板直接输出
}

// comments.html
// <div th:each="comment : $\{comments\}">
//     <p th:utext="$\{comment.content\}"></p>  {'<!-- uText不转义，危险！ -->'}
// </div>`}
            language="java"
            description="存储型XSS漏洞示例"
          />

          <Callout type="tip" title="✅ 防护方法：输出编码">
            <pre className="bg-parchment-deep p-3 rounded-paper-sm text-sm font-mono mb-2">
{`// Spring Boot自动转义（Thymeleaf默认行为）
<p th:text="$\{comment.content\}"></p>  // text会自动转义HTML

// 或使用ESAPI库进行编码
import org.owasp.esapi.ESAPI;
String safeContent = ESAPI.encoder().encodeForHTML(comment.getContent());`}
            </pre>
            <p className="text-sm">
              输出编码将特殊字符转换为HTML实体：<br/>
              <code className="font-mono text-xs">&lt;</code> → <code className="font-mono text-xs">&amp;lt;</code><br/>
              <code className="font-mono text-xs">&gt;</code> → <code className="font-mono text-xs">&amp;gt;</code><br/>
              <code className="font-mono text-xs">"</code> → <code className="font-mono text-xs">&amp;quot;</code>
            </p>
          </Callout>

          <h3 id="reflected-xss" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            反射型XSS
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>反射型XSS</strong>：恶意脚本通过URL参数传递，服务器将其反射回响应中。
            需要诱导用户点击恶意链接。
          </p>

          <Playground
            code={`// ❌ 危险做法：直接输出URL参数
@GetMapping("/search")
public String search(@RequestParam String keyword, Model model) {
    List<Product> results = productRepository.search(keyword);
    model.addAttribute("keyword", keyword);  // 未转义
    model.addAttribute("results", results);
    return "search";
}

// search.html
// <p>搜索结果：<span th:utext="$\{keyword\}"></span></p>  {'<!-- 危险！ -->'}

// 攻击者构造恶意链接：
// https://example.com/search?keyword=<script>alert('XSS')</script>`}
            language="java"
            description="反射型XSS漏洞示例"
          />

          <Callout type="info" title="XSS防护最佳实践">
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li><strong>输出编码</strong>：对所有用户输入进行HTML编码</li>
              <li><strong>Content Security Policy（CSP）</strong>：限制脚本来源</li>
              <li><strong>HttpOnly Cookie</strong>：防止JavaScript访问Cookie</li>
              <li><strong>输入验证</strong>：白名单验证输入格式</li>
              <li><strong>使用安全框架</strong>：Spring Security提供XSS防护</li>
            </ol>
          </Callout>

          <h2 id="broken-auth" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            A07 - 身份认证失效
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            身份认证失效包括弱密码策略、会话管理不当、凭证泄露等问题，导致攻击者可以冒充合法用户。
          </p>

          <Callout type="danger" title="常见身份认证漏洞">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>弱密码策略</strong>：允许简单密码，无复杂度要求</li>
              <li><strong>明文存储密码</strong>：数据库中直接存储明文密码</li>
              <li><strong>会话固定攻击</strong>：登录后不更换Session ID</li>
              <li><strong>缺少多因素认证</strong>：仅依赖密码</li>
              <li><strong>暴力破解</strong>：无限次尝试登录</li>
            </ul>
          </Callout>

          <Playground
            code={`// ✅ 正确的身份认证实现（Spring Security）
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/register").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/home")
                .failureUrl("/login?error")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/login?logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
            )
            .sessionManagement(session -> session
                .maximumSessions(1)  // 限制单用户登录
                .maxSessionsPreventsLogin(true)  // 阻止新登录
            )
            .csrf(csrf -> csrf.disable());  // 根据需求启用CSRF
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        // 使用BCrypt加密密码
        return new BCryptPasswordEncoder();
    }
}

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public void registerUser(String username, String rawPassword) {
        // 密码强度验证
        if (!isValidPassword(rawPassword)) {
            throw new IllegalArgumentException("密码强度不足");
        }
        
        // 检查用户名是否已存在
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("用户名已存在");
        }
        
        // BCrypt加密后存储
        String encodedPassword = passwordEncoder.encode(rawPassword);
        User user = new User(username, encodedPassword);
        userRepository.save(user);
    }
    
    private boolean isValidPassword(String password) {
        // 至少8位，包含大小写字母、数字、特殊字符
        return password != null && 
               password.length() >= 8 &&
               password.matches(".*[A-Z].*") &&
               password.matches(".*[a-z].*") &&
               password.matches(".*[0-9].*") &&
               password.matches(".*[^a-zA-Z0-9].*");
    }
}`}
            language="java"
            description="安全的身份认证实现"
          />

          <h2 id="csrf" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            A08 - CSRF跨站请求伪造
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>CSRF（Cross-Site Request Forgery）</strong>是攻击者诱导已登录用户在不知情的情况下执行非预期操作。
          </p>

          <DiagramBlock title="CSRF攻击流程">
            {`
用户（已登录银行网站）           银行网站                 恶意网站
       |                           |                       |
       |  1. 登录银行网站           |                       |
       |  ──────────────────────►  |                       |
       |                           |                       |
       |  2. 获得Session Cookie    |                       |
       |  ◄──────────────────────  |                       |
       |                           |                       |
       |  3. 访问恶意网站           |                       |
       |  ──────────────────────────────────────────────►  |
       |                                                   |
       |                                              4. 返回恶意页面
       |                                              包含隐藏表单：
       |                                              <form action="bank.com/transfer"
       |                                                    method="POST">
       |                                                <input name="amount" 
       |                                                       value="10000">
       |                                                <input name="to" 
       |                                                       value="attacker">
       |                                              </form>
       |                                              <script>
       |                                                document.forms[0].submit();
       |                                              </script>
       |                                              </body></html>
       |  ◄──────────────────────────────────────────────  |
       |                                                   |
       |  5. 浏览器自动携带Cookie发送请求                   |
       |  ──────────────────────►  |                       |
       |                           |                       |
       |                          6. 银行验证Cookie有效     |
       |                          执行转账（用户不知情！）   |
       |                           |
       |                          ✗ CSRF攻击成功
            `}
          </DiagramBlock>

          <Callout type="tip" title="✅ CSRF防护：使用Token">
            <pre className="bg-parchment-deep p-3 rounded-paper-sm text-sm font-mono mb-2">
{`// Spring Security自动处理CSRF
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.enable());  // 启用CSRF保护（默认启用）
        return http.build();
    }
}

// Thymeleaf模板自动添加CSRF Token
<form th:action="@\{/transfer\}" method="post">
    <input type="hidden" th:name="$\{_csrf.parameterName\}" 
                          th:value="$\{_csrf.token\}"/>
    <input type="text" name="amount"/>
    <button type="submit">转账</button>
</form>`}
            </pre>
            <p className="text-sm">
              CSRF Token机制：服务器生成随机Token，嵌入表单，提交时验证Token匹配。
              恶意网站无法获取Token，因此无法伪造请求。
            </p>
          </Callout>

          <h2 id="security-misconfig" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            A05 - 安全配置错误
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            安全配置错误是最常见的漏洞之一，包括默认密码、调试信息泄露、不必要的服务开启等。
          </p>

          <Callout type="warning" title="常见配置错误">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>默认账户</strong>：admin/admin、root/root等默认密码未修改</li>
              <li><strong>详细错误信息</strong>：生产环境显示堆栈跟踪</li>
              <li><strong>目录列表</strong>：Web服务器允许浏览目录</li>
              <li><strong>过时组件</strong>：使用有已知漏洞的旧版本库</li>
              <li><strong>不必要的HTTP方法</strong>：PUT、DELETE等方法未禁用</li>
              <li><strong>CORS配置过宽</strong>：Allow-Origin设置为*</li>
            </ul>
          </Callout>

          <Playground
            code={`# application.properties（生产环境配置）

# ❌ 错误配置
# debug=true  # 显示详细调试信息
# server.error.include-stacktrace=always  # 暴露堆栈跟踪
# management.endpoints.web.exposure.include=*  # 暴露所有Actuator端点

# ✅ 正确配置
debug=false
server.error.include-stacktrace=never
server.error.include-message=never
management.endpoints.web.exposure.include=health,info
management.endpoint.health.show-details=when-authorized

# 禁用不必要的HTTP方法
server.tomcat.allow-unidentified-http-method=false

# 设置安全Header
server.servlet.session.cookie.http-only=true
server.servlet.session.cookie.secure=true  # HTTPS环境
server.servlet.session.cookie.same-site=strict

# CORS配置（限制来源）
spring.mvc.cors.allowed-origins=https://example.com
spring.mvc.cors.allowed-methods=GET,POST
spring.mvc.cors.allow-credentials=true`}
            language="properties"
            description="Spring Boot安全配置示例"
          />

          <h2 id="sensitive-data" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            A04 - 敏感数据泄露
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            敏感数据泄露包括密码、信用卡号、个人身份信息（PII）等未加密存储或传输，导致数据被窃取。
          </p>

          <Callout type="danger" title="敏感数据保护要点">
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li><strong>传输加密</strong>：强制使用HTTPS（TLS 1.2+）</li>
              <li><strong>存储加密</strong>：敏感数据加密后存储（如AES）</li>
              <li><strong>密码哈希</strong>：使用BCrypt/SCrypt/Argon2</li>
              <li><strong>最小化收集</strong>：只收集必要的个人信息</li>
              <li><strong>定期清理</strong>：删除不再需要的敏感数据</li>
              <li><strong>访问控制</strong>：严格限制敏感数据的访问权限</li>
            </ol>
          </Callout>

          <h2 id="playground" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            代码实验场
          </h2>
          <Playground
            code={`import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import javax.sql.DataSource;
import java.sql.*;

/**
 * OWASP安全防护综合示例
 * 演示如何防护常见Web安全漏洞
 */
public class SecurityBestPractices {
    
    private final PasswordEncoder passwordEncoder;
    private final DataSource dataSource;
    
    public SecurityBestPractices(DataSource dataSource) {
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.dataSource = dataSource;
    }
    
    /**
     * 1. 防止SQL注入：使用预编译语句
     */
    public User loginUser(String username, String password) throws SQLException {
        // ✅ 使用PreparedStatement
        String sql = "SELECT * FROM users WHERE username = ?";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, username);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    String storedPassword = rs.getString("password");
                    
                    // ✅ 使用BCrypt验证密码
                    if (passwordEncoder.matches(password, storedPassword)) {
                        return new User(
                            rs.getInt("id"),
                            rs.getString("username"),
                            rs.getString("email")
                        );
                    }
                }
            }
        }
        
        return null;  // 登录失败
    }
    
    /**
     * 2. 防止XSS：输出编码
     */
    public String sanitizeForHTML(String input) {
        if (input == null) {
            return "";
        }
        
        return input
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\"", "&quot;")
            .replace("'", "&#x27;")
            .replace("/", "&#x2F;");
    }
    
    /**
     * 3. 防止CSRF：生成和验证Token
     */
    public String generateCsrfToken() {
        byte[] randomBytes = new byte[32];
        new java.security.SecureRandom().nextBytes(randomBytes);
        return java.util.Base64.getEncoder().encodeToString(randomBytes);
    }
    
    public boolean validateCsrfToken(String sessionToken, String requestToken) {
        return sessionToken != null && sessionToken.equals(requestToken);
    }
    
    /**
     * 4. 密码强度验证
     */
    public boolean isPasswordStrong(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }
        
        boolean hasUpper = false;
        boolean hasLower = false;
        boolean hasDigit = false;
        boolean hasSpecial = false;
        
        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) hasUpper = true;
            else if (Character.isLowerCase(c)) hasLower = true;
            else if (Character.isDigit(c)) hasDigit = true;
            else hasSpecial = true;
        }
        
        return hasUpper && hasLower && hasDigit && hasSpecial;
    }
    
    /**
     * 5. 防止暴力破解：登录尝试限制
     */
    private java.util.Map<String, LoginAttempt> loginAttempts = new java.util.HashMap<>();
    
    public boolean canAttemptLogin(String username) {
        LoginAttempt attempt = loginAttempts.get(username);
        
        if (attempt == null) {
            return true;
        }
        
        // 如果5分钟内失败超过5次，锁定账户
        long fiveMinutesAgo = System.currentTimeMillis() - 5 * 60 * 1000;
        if (attempt.timestamp > fiveMinutesAgo && attempt.count >= 5) {
            return false;  // 账户已锁定
        }
        
        return true;
    }
    
    public void recordLoginAttempt(String username, boolean success) {
        LoginAttempt attempt = loginAttempts.getOrDefault(username, new LoginAttempt());
        
        if (success) {
            loginAttempts.remove(username);  // 登录成功，清除记录
        } else {
            attempt.count++;
            attempt.timestamp = System.currentTimeMillis();
            loginAttempts.put(username, attempt);
        }
    }
    
    private static class LoginAttempt {
        int count = 0;
        long timestamp = 0;
    }
    
    public static void main(String[] args) throws Exception {
        System.out.println("=== OWASP安全防护示例 ===\n");
        
        // 测试密码强度
        SecurityBestPractices security = new SecurityBestPractices(null);
        
        String[] testPasswords = {"123456", "Password", "P@ssw0rd!", "MyStr0ng#Pass"};
        for (String pwd : testPasswords) {
            System.out.printf("密码: %-15s 强度: %s%n", 
                pwd, security.isPasswordStrong(pwd) ? "✓ 强" : "✗ 弱");
        }
        
        // 测试XSS防护
        String maliciousInput = "<script>alert('XSS')</script>";
        String sanitized = security.sanitizeForHTML(maliciousInput);
        System.out.println("\n原始输入: " + maliciousInput);
        System.out.println("编码后: " + sanitized);
        
        // 测试CSRF Token
        String token = security.generateCsrfToken();
        System.out.println("\nCSRF Token: " + token.substring(0, 20) + "...");
        System.out.println("Token长度: " + token.length() + " 字符");
    }
}`}
            language="java"
            description="OWASP安全防护综合示例"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            常见误区
          </h2>

          <Callout type="danger" title="误区 1：认为HTTPS就足够安全">
            <p className="text-sm mb-2">
              ❌ 错误认知：使用了HTTPS，应用就安全了
            </p>
            <p className="text-sm">
              ✅ 正确理解：HTTPS只保护<strong>传输层</strong>的安全，防止中间人窃听。
              但SQL注入、XSS、CSRF等应用层漏洞仍然存在。HTTPS是必要条件，但不是充分条件。
            </p>
          </Callout>

          <Callout type="danger" title="误区 2：依赖前端验证保证安全">
            <p className="text-sm mb-2">
              ❌ 危险做法：只在JavaScript中验证输入
            </p>
            <p className="text-sm">
              ✅ 正确做法：前端验证只是为了提升用户体验，<strong>后端必须重新验证</strong>所有输入。
              攻击者可以绕过前端验证（如使用curl、Postman直接发送请求）。
            </p>
          </Callout>

          <Callout type="danger" title="误区 3：认为内部系统不需要安全">
            <p className="text-sm mb-2">
              ❌ 错误认知：内网系统不会被攻击
            </p>
            <p className="text-sm">
              ✅ 正确理解：据统计，超过60%的数据泄露来自内部威胁或已被攻陷的内网。
              <strong>所有系统都应该遵循安全最佳实践</strong>，无论是否对外公开。
            </p>
          </Callout>

          <Callout type="danger" title="误区 4：忽略第三方组件的安全">
            <p className="text-sm mb-2">
              ❌ 危险做法：直接使用Maven中央仓库的最新版本
            </p>
            <p className="text-sm">
              ✅ 正确做法：定期扫描依赖漏洞（使用OWASP Dependency-Check），
              及时更新有已知漏洞的组件。<strong>Log4j2漏洞</strong>就是一个惨痛教训。
            </p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            面试真题
          </h2>
          <InterviewSection
            questions={[
              {
                question: '什么是SQL注入？如何防止？',
                answer: `SQL注入是最危险的Web漏洞之一（OWASP A03）。

原理：
攻击者通过在输入字段中插入SQL代码，操纵数据库查询。

示例：
// 危险代码
String sql = "SELECT * FROM users WHERE username='" + username + "'";

// 攻击者输入：admin' OR '1'='1
// 生成SQL：SELECT * FROM users WHERE username='admin' OR '1'='1'
// 结果：绕过验证，查询所有用户

防护方法：

1. 预编译语句（首选）：
   PreparedStatement pstmt = conn.prepareStatement(
       "SELECT * FROM users WHERE username=?"
   );
   pstmt.setString(1, username);

2. ORM框架：
   JPA/Hibernate自动使用预编译

3. 输入验证：
   白名单验证输入格式（如只允许字母数字）

4. 最小权限原则：
   数据库账户只授予必要的权限

5. 存储过程：
   使用存储过程封装SQL逻辑

关键原则：永远不要拼接用户输入到SQL中！`
              },
              {
                question: 'XSS有哪几种类型？如何防护？',
                answer: `XSS（跨站脚本攻击）分为三种类型：

1. 存储型XSS（Stored XSS）：
   - 恶意脚本存储在服务器（数据库）
   - 所有访问该页面的用户都会受影响
   - 危害最大
   - 示例：论坛帖子、评论区

2. 反射型XSS（Reflected XSS）：
   - 恶意脚本通过URL参数传递
   - 需要诱导用户点击恶意链接
   - 示例：搜索功能、错误页面

3. DOM型XSS（DOM-based XSS）：
   - 恶意脚本在客户端JavaScript中执行
   - 不经过服务器
   - 示例：document.location.hash

防护措施：

1. 输出编码（最重要）：
   - HTML编码：< → &lt;
   - JavaScript编码
   - URL编码
   - Spring MVC自动编码（Thymeleaf默认）

2. Content Security Policy（CSP）：
   Content-Security-Policy: script-src 'self'

3. HttpOnly Cookie：
   防止JavaScript访问Cookie

4. 输入验证：
   白名单验证输入格式

5. 使用安全框架：
   Spring Security、OWASP Java Encoder

最佳实践：对所有用户输入进行编码后再输出！`
              },
              {
                question: 'CSRF攻击的原理是什么？如何防护？',
                answer: `CSRF（跨站请求伪造）原理：

攻击场景：
1. 用户登录银行网站（获得Session Cookie）
2. 用户访问恶意网站
3. 恶意网站自动向银行网站发送请求
4. 浏览器自动携带Cookie
5. 银行网站验证Cookie有效，执行操作
6. 用户在不知情的情况下完成转账

关键点：
- 利用浏览器的Cookie自动携带机制
- 用户已登录且Cookie有效
- 攻击者无法读取响应（同源策略保护）

防护方法：

1. CSRF Token（推荐）：
   - 服务器生成随机Token
   - 嵌入表单或Header
   - 提交时验证Token
   - Spring Security默认启用

2. SameSite Cookie：
   Set-Cookie: sessionId=abc; SameSite=Strict
   - Strict：完全禁止跨站
   - Lax：允许GET请求
   - None：允许所有（需Secure）

3. 验证Referer/Header：
   检查请求来源域名

4. 二次确认：
   敏感操作需要再次输入密码

5. CAPTCHA验证码：
   防止自动化攻击

Spring Security配置：
http.csrf(csrf -> csrf.enable());  // 默认启用

最佳实践：所有状态改变的请求（POST/PUT/DELETE）都必须防护CSRF！`
              },
              {
                question: '如何安全地存储密码？',
                answer: `密码存储的黄金法则：永远不要明文存储！

错误的做法：
❌ 明文存储
❌ MD5/SHA1哈希（可被彩虹表破解）
❌ 加盐MD5（仍然不够安全）

正确的做法：

1. 使用专用密码哈希算法：
   - BCrypt（推荐，Java常用）
   - SCrypt（内存密集型）
   - Argon2（最新推荐，2015年获奖）

2. BCrypt示例（Spring Security）：
   PasswordEncoder encoder = new BCryptPasswordEncoder();
   String hashed = encoder.encode(rawPassword);
   boolean matches = encoder.matches(inputPassword, hashed);

3. BCrypt的优势：
   - 自适应：可调整计算成本（work factor）
   - 内置盐值：每个密码使用不同盐值
   - 慢哈希：增加暴力破解成本
   - 广泛使用：经过充分测试

4. 密码策略：
   - 最小长度：8-12位
   - 复杂度：大小写+数字+特殊字符
   - 禁止常见密码：123456、password等
   - 定期更换：90天（可选）

5. 额外保护：
   - 登录失败限制：5次失败后锁定
   - 多因素认证（MFA）
   - 密码泄露检测：Have I Been Pwned API

关键原则：
- 使用BCrypt等慢哈希算法
- 每个密码独立盐值
- 不要在日志中记录密码
- 传输时使用HTTPS`
              },
              {
                question: '什么是安全开发生命周期（SDL）？',
                answer: `安全开发生命周期（Security Development Lifecycle）是将安全融入软件开发全过程的方法论。

传统开发 vs SDL：

传统开发：
需求 → 设计 → 编码 → 测试 → 部署
                              ↓
                         安全测试（太晚！）

SDL：
安全需求 → 安全设计 → 安全编码 → 安全测试 → 安全部署
    ↑           ↑           ↑           ↑           ↑
  全程贯穿安全意识

SDL的关键阶段：

1. 培训（Training）：
   - 开发人员接受安全培训
   - 了解OWASP Top 10
   - 学习安全编码规范

2. 需求（Requirements）：
   - 识别安全需求
   - 定义安全目标
   - 合规性要求（GDPR、PCI DSS）

3. 设计（Design）：
   - 威胁建模（Threat Modeling）
   - 安全架构评审
   - 最小权限原则

4. 实现（Implementation）：
   - 安全编码规范
   - 代码审查（Code Review）
   - 静态分析（SAST）

5. 验证（Verification）：
   - 动态分析（DAST）
   - 渗透测试
   - 依赖扫描（SCA）

6. 发布（Release）：
   - 安全配置检查
   - 应急响应计划
   - 安全文档

7. 响应（Response）：
   - 漏洞披露政策
   - 补丁管理
   - 事后分析

工具支持：
- SAST：SonarQube、Fortify
- DAST：OWASP ZAP、Burp Suite
- SCA：OWASP Dependency-Check、Snyk
- 容器扫描：Trivy、Clair

最佳实践：
- 安全左移（Shift Left）：尽早发现安全问题
- 自动化：CI/CD集成安全检查
- 持续改进：从事故中学习

总结：SDL不是额外的步骤，而是将安全思维融入每个开发环节。`
              },
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            对比分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            常见Web漏洞的对比：
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-border border border-border rounded-paper-md">
              <thead className="bg-parchment-deep">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">漏洞类型</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">危害程度</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">发生频率</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">防护难度</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">主要防护手段</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                <tr><td className="px-4 py-3 font-medium text-sm">SQL注入</td><td className="px-4 py-3 text-sm text-red-600">⭐⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">非常普遍</td><td className="px-4 py-3 text-sm text-green-600">容易</td><td className="px-4 py-3 text-sm">预编译语句</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">XSS</td><td className="px-4 py-3 text-sm text-red-600">⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">非常普遍</td><td className="px-4 py-3 text-sm text-green-600">容易</td><td className="px-4 py-3 text-sm">输出编码+CSP</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">CSRF</td><td className="px-4 py-3 text-sm text-orange-600">⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">常见</td><td className="px-4 py-3 text-sm text-green-600">容易</td><td className="px-4 py-3 text-sm">CSRF Token</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">身份认证失效</td><td className="px-4 py-3 text-sm text-red-600">⭐⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">常见</td><td className="px-4 py-3 text-sm text-yellow-600">中等</td><td className="px-4 py-3 text-sm">BCrypt+MFA</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">敏感数据泄露</td><td className="px-4 py-3 text-sm text-red-600">⭐⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">常见</td><td className="px-4 py-3 text-sm text-yellow-600">中等</td><td className="px-4 py-3 text-sm">加密+HTTPS</td></tr>
                <tr><td className="px-4 py-3 font-medium text-sm">安全配置错误</td><td className="px-4 py-3 text-sm text-orange-600">⭐⭐⭐⭐</td><td className="px-4 py-3 text-sm">非常普遍</td><td className="px-4 py-3 text-sm text-green-600">容易</td><td className="px-4 py-3 text-sm">安全基线检查</td></tr>
              </tbody>
            </table>
          </div>

          <section id="related" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
              关联知识
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-paper-md hover:border-accent transition-colors">
                <h4 className="font-semibold text-sm mb-2">→ 加密与解密</h4>
                <p className="text-xs text-ink-muted">学习数据加密和哈希技术</p>
              </div>
              <div className="p-4 border border-border rounded-paper-md hover:border-accent transition-colors">
                <h4 className="font-semibold text-sm mb-2">→ Spring Security安全框架</h4>
                <p className="text-xs text-ink-muted">学习如何在Spring应用中实现安全防护</p>
              </div>
            </div>
          </section>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
