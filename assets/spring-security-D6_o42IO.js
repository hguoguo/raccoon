import{j as e,g as a}from"./index-hyqxTCwJ.js";import{K as o}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as s}from"./SideNote-BKvanovA.js";import{C as t,A as l,S as c}from"./ArticleNav-DhfiS38Y.js";import{D as i}from"./DiagramBlock-CLaKE9_7.js";import{I as d}from"./InterviewSection-BBNdwyyN.js";const u=[{id:"definition",text:"一句话定义",level:2},{id:"core-concept",text:"一、核心概念",level:2},{id:"architecture",text:"二、架构设计（重点🔥）",level:2},{id:"authentication",text:"三、认证流程",level:2},{id:"authorization",text:"四、授权机制",level:2},{id:"filter-chain",text:"五、Filter 链机制",level:2},{id:"oauth2-jwt",text:"六、OAuth2 与 JWT",level:2},{id:"source-code",text:"七、源码分析",level:2},{id:"best-practices",text:"八、最佳实践",level:2},{id:"misconceptions",text:"九、常见误区",level:2},{id:"interview",text:"十、面试真题",level:2},{id:"related",text:"十一、知识关联",level:2}];function y({meta:n}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(o,{meta:n,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Spring Security 是基于",e.jsx("strong",{className:"text-accent",children:"Servlet Filter"}),"的安全框架，提供",e.jsx("strong",{children:"认证（Authentication）"}),"和",e.jsx("strong",{children:"授权（Authorization）"}),"两大核心功能， 通过可插拔的 Filter 链实现请求拦截、身份验证、权限控制、会话管理等安全能力。"]})}),e.jsx(t,{type:"tip",title:"为什么需要 Spring Security？",children:"Web 应用面临多种安全威胁：未授权访问、SQL 注入、XSS 攻击、CSRF 攻击等。Spring Security 提供了一套完整的安全解决方案，从认证、授权到防护各种攻击，让开发者专注于业务逻辑而非安全细节。"}),e.jsx("h2",{id:"core-concept",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、核心概念"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spring Security 的核心概念包括："}),e.jsx(r,{code:`// 1. Authentication（认证）：验证用户身份
public interface Authentication extends Principal, Serializable {
    Collection<? extends GrantedAuthority> getAuthorities();  // 权限列表
    Object getCredentials();                                   // 凭证（密码）
    Object getDetails();                                       // 详细信息
    Object getPrincipal();                                     // 主体（用户名）
    boolean isAuthenticated();                                 // 是否已认证
}

// 2. Authorization（授权）：验证用户是否有权限访问资源
public interface AccessDecisionManager {
    void decide(Authentication authentication, 
                Object object, 
                Collection<ConfigAttribute> configAttributes)
        throws AccessDeniedException;
}

// 3. UserDetails：用户详情接口
public interface UserDetails extends Serializable {
    Collection<? extends GrantedAuthority> getAuthorities();
    String getPassword();
    String getUsername();
    boolean isAccountNonExpired();
    boolean isAccountNonLocked();
    boolean isCredentialsNonExpired();
    boolean isEnabled();
}`,language:"java",highlights:[2,10,17],filename:"Core Interfaces.java",description:"Spring Security 核心接口"}),e.jsx(i,{title:"Spring Security 核心组件",children:`\`\`\`mermaid
graph TD
    A[客户端请求] --> B[DelegatingFilterProxy]
    B --> C[FilterChainProxy]
    C --> D[Security Filter Chain]
    D --> E[AuthenticationManager]
    E --> F[AuthenticationProvider]
    F --> G[UserDetailsService]
    G --> H[数据库/LDAP]
    
    D --> I[AccessDecisionManager]
    I --> J[访问资源]
\`\`\``}),e.jsxs(s,{label:"认证 vs 授权",children:[e.jsx("strong",{children:"认证（Authentication）"}),'：确认"你是谁"，验证用户的身份信息（用户名/密码、Token、证书等）。',e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"授权（Authorization）"}),'：确认"你能做什么"，验证用户是否有权限访问特定资源或执行特定操作。']}),e.jsx("h2",{id:"architecture",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、架构设计（重点🔥）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Spring Security 的架构基于",e.jsx("strong",{children:"责任链模式"}),"，通过一系列 Filter 处理请求："]}),e.jsx(i,{title:"Spring Security 架构分层",children:`\`\`\`mermaid
graph TB
    subgraph "Web 层"
        A[HTTP Request] --> B[DelegatingFilterProxy]
    end
    
    subgraph "Security 层"
        B --> C[FilterChainProxy]
        C --> D[UsernamePasswordAuthenticationFilter]
        D --> E[BasicAuthenticationFilter]
        E --> F[BearerTokenAuthenticationFilter]
        F --> G[ExceptionTranslationFilter]
        G --> H[FilterSecurityInterceptor]
    end
    
    subgraph "Service 层"
        D --> I[AuthenticationManager]
        I --> J[DaoAuthenticationProvider]
        J --> K[UserDetailsService]
        K --> L[Database]
        
        H --> M[AccessDecisionManager]
        M --> N[MethodSecurityInterceptor]
    end
\`\`\``}),e.jsx(r,{code:`// 默认 Filter 链顺序（部分）
1. ChannelProcessingFilter          // HTTPS 重定向
2. CsrfFilter                       // CSRF 防护
3. LogoutFilter                     // 登出处理
4. UsernamePasswordAuthenticationFilter  // 表单登录
5. BasicAuthenticationFilter        // Basic 认证
6. BearerTokenAuthenticationFilter  // JWT/OAuth2 Token
7. RequestCacheAwareFilter          // 请求缓存
8. SecurityContextHolderAwareRequestFilter
9. AnonymousAuthenticationFilter    // 匿名访问
10. SessionManagementFilter         // 会话管理
11. ExceptionTranslationFilter      // 异常转换
12. FilterSecurityInterceptor       // 授权检查`,language:"java",highlights:[4,6,12],filename:"Filter Chain Order.java",description:"Spring Security Filter 链顺序"}),e.jsxs(t,{type:"info",title:"DelegatingFilterProxy 的作用",children:["DelegatingFilterProxy 是 Spring Security 的入口 Filter，它将请求委托给 Spring 容器中的 ",e.jsx("code",{children:"FilterChainProxy"})," Bean。这样可以将 Servlet Filter 生命周期与 Spring Bean 生命周期整合，享受 Spring 的依赖注入和配置管理优势。"]}),e.jsx("h2",{id:"authentication",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、认证流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"以表单登录为例，认证流程如下："}),e.jsx(i,{title:"表单登录认证流程",children:`\`\`\`mermaid
sequenceDiagram
    participant U as 用户
    participant F as UsernamePasswordAuthenticationFilter
    participant M as AuthenticationManager
    participant P as DaoAuthenticationProvider
    participant S as UserDetailsService
    participant D as Database
    
    U->>F: POST /login (username, password)
    F->>M: authenticate(authentication)
    M->>P: authenticate(authentication)
    P->>S: loadUserByUsername(username)
    S->>D: 查询用户信息
    D-->>S: 返回 UserDetails
    S-->>P: 返回 UserDetails
    P->>P: 验证密码
    P-->>M: 返回 Authentication
    M-->>F: 返回 Authentication
    F->>F: 将 Authentication 存入 SecurityContext
    F-->>U: 登录成功，返回 302 重定向
\`\`\``}),e.jsx(r,{code:`// 自定义 UserDetailsService
@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) 
            throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("用户不存在: " + username);
        }
        
        // 转换为 Spring Security 的 UserDetails
        return org.springframework.security.core.userdetails.User
            .withUsername(user.getUsername())
            .password(user.getPassword())
            .roles(user.getRoles().toArray(new String[0]))
            .build();
    }
}

// 配置认证管理器
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()  // 公开接口
                .requestMatchers("/admin/**").hasRole("ADMIN")  // 管理员
                .anyRequest().authenticated()  // 其他需要认证
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/home")
                .failureUrl("/login?error")
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout")
            );
        
        return http.build();
    }
}`,language:"java",highlights:[3,10,25,31],filename:"Authentication Config.java",description:"自定义认证配置"}),e.jsx("h2",{id:"authorization",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、授权机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spring Security 支持多种授权方式："}),e.jsx(r,{code:`// 1. URL 级别授权（基于角色）
http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/admin/**").hasRole("ADMIN")
    .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
    .requestMatchers("/public/**").permitAll()
    .anyRequest().authenticated()
);

// 2. 方法级别授权（基于注解）
@PreAuthorize("hasRole('ADMIN')")
@PostMapping("/users")
public User createUser(@RequestBody User user) { ... }

@PreAuthorize("hasPermission(#id, 'DELETE')")
@DeleteMapping("/users/{id}")
public void deleteUser(@PathVariable Long id) { ... }

@Secured("ROLE_ADMIN")
@GetMapping("/admin/dashboard")
public Dashboard getDashboard() { ... }

// 3. 自定义权限表达式
@Component("customPermissionEvaluator")
public class CustomPermissionEvaluator implements PermissionEvaluator {
    @Override
    public boolean hasPermission(Authentication auth, 
                                 Object targetDomainObject, 
                                 Object permission) {
        // 自定义权限判断逻辑
        return true;
    }
}`,language:"java",highlights:[2,10,14,18,24],filename:"Authorization Examples.java",description:"授权配置示例"}),e.jsxs(s,{label:"@PreAuthorize vs @Secured",children:[e.jsx("strong",{children:"@Secured"}),"：Spring Security 原生注解，仅支持角色检查，如 ",e.jsx("code",{children:'@Secured("ROLE_ADMIN")'}),"。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"@PreAuthorize"}),"：Spring EL 表达式，功能更强大，支持复杂权限逻辑，如 ",e.jsx("code",{children:`@PreAuthorize("hasRole('ADMIN') and #user.id == authentication.principal.id")`}),"。推荐使用 @PreAuthorize。"]}),e.jsx("h2",{id:"filter-chain",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、Filter 链机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"自定义 Filter 是扩展 Spring Security 功能的常用方式："}),e.jsx(r,{code:`// 自定义 JWT 认证 Filter
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) 
            throws ServletException, IOException {
        
        try {
            // 1. 从请求头提取 JWT Token
            String token = resolveToken(request);
            
            if (token != null && tokenProvider.validateToken(token)) {
                // 2. 解析 Token 获取用户名
                String username = tokenProvider.getUsernameFromToken(token);
                
                // 3. 加载用户信息
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                
                // 4. 创建 Authentication 对象
                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(
                        userDetails, 
                        null, 
                        userDetails.getAuthorities()
                    );
                
                // 5. 设置到 SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e.getMessage());
        }
        
        // 6. 继续执行后续 Filter
        filterChain.doFilter(request, response);
    }
    
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}`,language:"java",highlights:[3,12,19,26,33,40],filename:"JWT Filter.java",description:"自定义 JWT 认证 Filter"}),e.jsx(t,{type:"warning",title:"OncePerRequestFilter 的作用",children:"OncePerRequestFilter 确保每个请求只执行一次 Filter，即使请求被 forward 或 include。这是编写自定义 Security Filter 的最佳实践，避免重复执行导致性能问题或逻辑错误。"}),e.jsx("h2",{id:"oauth2-jwt",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、OAuth2 与 JWT"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"现代微服务架构中，OAuth2 + JWT 是主流的认证授权方案："}),e.jsx(i,{title:"OAuth2 授权码流程",children:`\`\`\`mermaid
sequenceDiagram
    participant C as 客户端
    participant U as 用户
    participant AS as 授权服务器
    participant RS as 资源服务器
    
    C->>U: 重定向到授权页面
    U->>AS: 登录并授权
    AS->>C: 返回授权码 (Authorization Code)
    C->>AS: 用授权码换取 Access Token
    AS->>C: 返回 Access Token + ID Token (JWT)
    C->>RS: 携带 Access Token 请求资源
    RS->>RS: 验证 JWT Token
    RS->>C: 返回受保护资源
\`\`\``}),e.jsx(r,{code:`// JWT Token 生成与验证
@Component
public class JwtTokenProvider {
    
    @Value("\${jwt.secret}")
    private String secretKey;
    
    @Value("\${jwt.expiration}")
    private long validityInMilliseconds;
    
    // 生成 JWT Token
    public String createToken(String username, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("roles", roles);
        
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);
        
        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(validity)
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
    }
    
    // 验证 JWT Token
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    
    // 从 Token 中获取用户名
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
            .setSigningKey(secretKey)
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
}`,language:"java",highlights:[12,28,40],filename:"JWT Provider.java",description:"JWT Token 工具类"}),e.jsxs(t,{type:"danger",title:"JWT 的安全性注意事项",children:["① ",e.jsx("strong",{children:"密钥保管"}),"：secretKey 必须妥善保管，建议使用环境变量或密钥管理服务；② ",e.jsx("strong",{children:"过期时间"}),"：Access Token 有效期不宜过长（建议 15-30 分钟），配合 Refresh Token 使用；③ ",e.jsx("strong",{children:"HTTPS"}),"：JWT 通过网络传输时必须使用 HTTPS，防止中间人攻击；④ ",e.jsx("strong",{children:"注销问题"}),"：JWT 无状态特性导致无法主动注销，需结合黑名单或短有效期解决。"]}),e.jsx("h2",{id:"source-code",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、源码分析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"深入理解 Spring Security 的核心源码："}),e.jsx(r,{code:`// 1. AuthenticationManager 的实现：ProviderManager
public class ProviderManager implements AuthenticationManager {
    
    private List<AuthenticationProvider> providers;
    
    @Override
    public Authentication authenticate(Authentication authentication) 
            throws AuthenticationException {
        
        for (AuthenticationProvider provider : providers) {
            // 检查是否支持该认证类型
            if (!provider.supports(authentication.getClass())) {
                continue;
            }
            
            try {
                // 执行认证
                Authentication result = provider.authenticate(authentication);
                if (result != null) {
                    copyDetails(authentication, result);
                    return result;
                }
            } catch (AccountStatusException | InternalAuthenticationServiceException e) {
                throw e;
            }
        }
        
        throw new ProviderNotFoundException("No AuthenticationProvider found");
    }
}

// 2. DaoAuthenticationProvider 的密码验证
public class DaoAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {
    
    private PasswordEncoder passwordEncoder;
    private UserDetailsService userDetailsService;
    
    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails,
            UsernamePasswordAuthenticationToken authentication) 
            throws AuthenticationException {
        
        String presentedPassword = authentication.getCredentials().toString();
        
        // 使用 PasswordEncoder 验证密码
        if (!passwordEncoder.matches(presentedPassword, userDetails.getPassword())) {
            throw new BadCredentialsException("Bad credentials");
        }
    }
}

// 3. SecurityContextHolder 存储认证信息
public class SecurityContextHolder {
    
    // 默认使用 ThreadLocal 存储
    private static Strategy strategy = new ThreadLocalSecurityContextHolderStrategy();
    
    public static SecurityContext getContext() {
        return strategy.getContext();
    }
    
    public static void setContext(SecurityContext context) {
        strategy.setContext(context);
    }
}`,language:"java",highlights:[2,10,33,43,53],filename:"Source Code Analysis.java",description:"Spring Security 核心源码"}),e.jsx(i,{title:"认证流程源码调用链",children:`\`\`\`mermaid
graph TD
    A[UsernamePasswordAuthenticationFilter] --> B[attemptAuthentication]
    B --> C[AuthenticationManager.authenticate]
    C --> D[ProviderManager.authenticate]
    D --> E[DaoAuthenticationProvider.authenticate]
    E --> F[retrieveUser - 加载用户]
    F --> G[UserDetailsService.loadUserByUsername]
    E --> H[additionalAuthenticationChecks - 验证密码]
    H --> I[PasswordEncoder.matches]
    I --> J[返回 Authentication]
    J --> K[SecurityContextHolder.setContext]
\`\`\``}),e.jsx("h2",{id:"best-practices",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、最佳实践"}),e.jsxs(t,{type:"tip",title:"推荐做法",children:[e.jsx("strong",{children:"1. 密码加密"}),"：始终使用 BCryptPasswordEncoder，不要明文存储密码。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"2. CSRF 防护"}),"：前后端分离项目可禁用 CSRF（使用 JWT），传统表单提交必须启用。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"3. 最小权限原则"}),"：默认拒绝所有请求，显式开放需要的接口。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"4. HTTPS 强制"}),"：生产环境必须使用 HTTPS，配置 HSTS 头部。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"5. 会话管理"}),"：配置会话超时时间，防止会话固定攻击（Session Fixation）。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"6. 日志记录"}),"：记录认证失败、授权拒绝等安全事件，便于审计和监控。"]}),e.jsx(r,{code:`// 完整的 Security 配置示例
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 禁用 CSRF（JWT 场景）
            .csrf(csrf -> csrf.disable())
            
            // 配置 CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // 会话管理
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            // 授权规则
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
            )
            
            // 添加 JWT Filter
            .addFilterBefore(jwtAuthenticationFilter(), 
                UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);  // strength=12
    }
}`,language:"java",highlights:[9,14,18,23,31,37],filename:"Complete Security Config.java",description:"完整的 Spring Security 配置"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：认为 SecurityContext 是线程安全的",children:[e.jsx("strong",{children:"错误认知"}),"：可以在多线程间共享 SecurityContext。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"真相"}),"：SecurityContextHolder 默认使用 ThreadLocal 存储，每个线程有独立的 SecurityContext。如果在子线程中访问认证信息，会抛出 NullPointerException。解决方案：① 使用 InheritableThreadLocal 策略；② 在子线程中手动传递 Authentication 对象。"]}),e.jsxs(t,{type:"danger",title:"误区 2：忽略密码编码器的强度参数",children:[e.jsx("strong",{children:"错误认知"}),"：BCryptPasswordEncoder 的 strength 参数无所谓。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"真相"}),"：strength 参数（4-31）决定哈希计算次数，值越大越安全但性能越差。默认值是 10，建议生产环境使用 12。过低容易被暴力破解，过高影响系统性能。可以通过 ",e.jsx("code",{children:"new BCryptPasswordEncoder(12)"})," 设置。"]}),e.jsxs(t,{type:"danger",title:"误区 3：认为 JWT 可以完全替代 Session",children:[e.jsx("strong",{children:"错误认知"}),"：使用 JWT 后就不需要任何服务端状态管理。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"真相"}),"：JWT 的无状态特性导致无法主动注销、无法修改权限。实际项目中通常需要结合 Redis 维护 Token 黑名单或白名单，实现注销、踢人下线等功能。纯无状态 JWT 仅适用于简单场景。"]}),e.jsxs(t,{type:"danger",title:"误区 4：混淆 hasRole 和 hasAuthority",children:[e.jsx("strong",{children:"错误认知"}),'：hasRole("ADMIN") 和 hasAuthority("ADMIN") 是一样的。',e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"真相"}),'：hasRole 会自动添加 "ROLE_" 前缀，hasRole("ADMIN") 等价于 hasAuthority("ROLE_ADMIN")。如果数据库中存储的是 "ADMIN"，使用 hasRole 会匹配失败。建议统一使用 hasAuthority，或在存储角色时加上 "ROLE_" 前缀。']}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、面试真题"}),e.jsx(d,{questions:[{question:"Spring Security 的认证流程是怎样的？",answer:"以表单登录为例：① UsernamePasswordAuthenticationFilter 拦截 /login 请求；② 创建 UsernamePasswordAuthenticationToken；③ 调用 AuthenticationManager.authenticate()；④ ProviderManager 遍历 AuthenticationProvider；⑤ DaoAuthenticationProvider 调用 UserDetailsService 加载用户；⑥ 使用 PasswordEncoder 验证密码；⑦ 验证成功后创建 Authentication 并存入 SecurityContext；⑧ 返回认证成功。"},{question:"Spring Security 如何实现权限控制？",answer:"Spring Security 提供三种权限控制方式：① URL 级别：通过 HttpSecurity.authorizeHttpRequests() 配置 Ant 路径匹配规则，如 hasRole、hasAuthority、permitAll；② 方法级别：使用 @PreAuthorize、@PostAuthorize、@Secured 等注解，基于 Spring EL 表达式；③ 领域对象级别：实现 PermissionEvaluator 接口，细粒度控制对具体对象的访问权限。底层通过 AccessDecisionManager 进行投票决策。"},{question:"JWT Token 如何集成到 Spring Security 中？",answer:"集成步骤：① 创建 JwtAuthenticationFilter 继承 OncePerRequestFilter；② 在 doFilterInternal 中从请求头提取 JWT Token；③ 验证 Token 有效性并解析用户名；④ 调用 UserDetailsService 加载用户信息；⑤ 创建 UsernamePasswordAuthenticationToken 并存入 SecurityContext；⑥ 在 SecurityConfig 中通过 addFilterBefore 将 JWT Filter 添加到 UsernamePasswordAuthenticationFilter 之前；⑦ 配置 SecurityContext 策略为 STATELESS。"},{question:"Spring Security 的 Filter 链是如何工作的？",answer:"Spring Security 的 Filter 链由 DelegatingFilterProxy 委托给 FilterChainProxy，FilterChainProxy 内部维护多个 SecurityFilterChain。每个 SecurityFilterChain 包含一组有序的 Filter，按固定顺序执行：ChannelProcessingFilter → CsrfFilter → LogoutFilter → UsernamePasswordAuthenticationFilter → BasicAuthenticationFilter → BearerTokenAuthenticationFilter → ExceptionTranslationFilter → FilterSecurityInterceptor。可以通过 addFilterBefore/After 自定义 Filter 插入到指定位置。"},{question:"如何实现自定义的 UserDetailsService？",answer:"实现步骤：① 创建类实现 UserDetailsService 接口；② 重写 loadUserByUsername 方法，根据用户名从数据库查询用户；③ 将实体用户转换为 Spring Security 的 UserDetails 对象，可以使用 User.withUsername().password().roles().build() 构建；④ 处理用户不存在的情况，抛出 UsernameNotFoundException；⑤ 将该类注册为 Spring Bean（添加 @Service 注解）；⑥ Spring Security 会自动检测并使用自定义的 UserDetailsService。"},{question:"Spring Security 如何处理 CSRF 攻击？",answer:"CSRF（跨站请求伪造）攻击是指攻击者诱导用户在已登录状态下执行非预期操作。Spring Security 的防护机制：① 默认启用 CsrfFilter，为每个会话生成唯一的 CSRF Token；② 将 Token 存储在 HttpSession 或 Cookie 中；③ 表单提交时自动携带 Token（Thymeleaf 模板自动注入）；④ 后端验证请求中的 Token 是否与会话中的 Token 一致；⑤ 前后端分离项目通常禁用 CSRF，改用 JWT + CORS 防护。"},{question:"@PreAuthorize 和 @Secured 有什么区别？",answer:"主要区别：① @Secured 是 Spring Security 原生注解，仅支持角色检查，如 @Secured('ROLE_ADMIN')；② @PreAuthorize 基于 Spring EL 表达式，功能更强大，支持复杂逻辑，如 @PreAuthorize('hasRole('ADMIN') and #user.id == authentication.principal.id')；③ @PreAuthorize 在方法执行前校验，@PostAuthorize 在方法执行后校验返回值；④ 使用 @PreAuthorize 需要启用 @EnableMethodSecurity(prePostEnabled=true)。推荐使用 @PreAuthorize，灵活性更高。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6",children:[e.jsxs("a",{href:"/docs/06-spring-framework/spring-core",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"前置知识 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"Spring 核心 IoC 容器"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"理解 Spring Bean 管理"})]}),e.jsxs("a",{href:"/docs/12-java-security/cryptography",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"相关技术 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"加密与解密"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"密码学基础"})]}),e.jsxs("a",{href:"/docs/10-network-protocol/http-protocol",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"协议基础 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"HTTP/HTTPS 协议详解"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"理解 HTTP 安全机制"})]}),e.jsxs("a",{href:"/docs/08-microservices/api-gateway",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"进阶应用 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"API 网关设计"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"微服务安全网关"})]})]}),e.jsx(t,{type:"info",title:"学习建议",children:"Spring Security 是 Java Web 开发必备的安全框架，建议重点掌握：① 认证流程和 Filter 链机制；② 授权方式和权限表达式；③ JWT 集成和 OAuth2 流程；④ 常见安全攻击防护（CSRF、XSS、SQL 注入）。可以通过阅读 Spring Security 源码深入理解其设计思想，重点关注 AuthenticationManager、ProviderManager、FilterChainProxy 等核心类。"}),e.jsx(l,{...a(n.category,n.id)})]})}),e.jsx(c,{items:u})]})}export{y as default};
