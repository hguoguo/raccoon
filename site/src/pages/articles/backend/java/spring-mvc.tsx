import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import SideNote from '../../components/knowledge/SideNote'
import ContextSwitcher from '../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../components/knowledge/SmartTOC'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'core-principle', text: '一、核心原理与架构', level: 2 },
  { id: 'dispatcher-servlet', text: '二、DispatcherServlet 核心', level: 2 },
  { id: 'controller-mapping', text: '三、Controller 请求映射', level: 2 },
  { id: 'data-binding', text: '四、数据绑定机制', level: 2 },
  { id: 'interceptor', text: '五、拦截器机制', level: 2 },
  { id: 'exception-handling', text: '六、异常处理', level: 2 },
  { id: 'request-flow', text: '七、请求处理流程', level: 2 },
  { id: 'comparison', text: '八、技术对比', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function SpringMvc({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Spring MVC 是基于<strong className="text-accent">Model-View-Controller 设计模式</strong>的 Web 框架，
              通过 DispatcherServlet 作为前端控制器统一分发请求，实现请求处理、数据绑定、视图渲染的解耦，
              是 Spring Framework 中构建 RESTful API 和传统 Web 应用的核心模块。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么选择 Spring MVC？">
            Spring MVC 提供了声明式的请求映射、自动的数据绑定、灵活的拦截器链和统一的异常处理机制，相比原生 Servlet 开发效率提升 10 倍以上，同时保持高性能和可扩展性。
          </Callout>

          <h2 id="core-principle" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、核心原理与架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring MVC 采用<strong>前端控制器模式（Front Controller Pattern）</strong>，所有 HTTP 请求首先到达 DispatcherServlet，
            再由它根据配置将请求分发给对应的 Controller 处理。这种集中式控制简化了 URL 映射、权限验证、日志记录等横切关注点的实现。
          </p>

          <DiagramBlock title="Spring MVC 三层架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────┐
│         View Layer (视图层)          │
│   JSP / Thymeleaf / JSON Response   │
└──────────────┬──────────────────────┘
               │ Model Data
┌──────────────▼──────────────────────┐
│     Controller Layer (控制层)        │
│   @Controller / @RestController     │
│   业务逻辑编排 + 数据绑定            │
└──────────────┬──────────────────────┘
               │ Request/Response
┌──────────────▼──────────────────────┐
│   DispatcherServlet (前端控制器)     │
│   HandlerMapping + HandlerAdapter   │
│   ViewResolver + Interceptors       │
└─────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="MVC 职责划分">
            <strong>Model</strong>：业务数据和业务逻辑（Service + DAO）；<strong>View</strong>：数据展示（JSP/Thymeleaf/JSON）；<strong>Controller</strong>：接收请求、调用 Service、返回响应。三者解耦，便于测试和维护。
          </SideNote>

          <h2 id="dispatcher-servlet" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、DispatcherServlet 核心
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            DispatcherServlet 是 Spring MVC 的核心类，继承自 HttpServlet，负责协调整个请求处理流程。它在 web.xml 或 Spring Boot 自动配置中注册，拦截所有匹配的 URL 请求。
          </p>

          <Playground
            code={`// Spring Boot 自动配置（无需手动配置）
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 传统 Spring MVC 需要 web.xml 配置
/*
<servlet>
    <servlet-name>dispatcher</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/spring-mvc.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>dispatcher</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
*/`}
            language="java"
            highlights={[2, 7]}
            filename="Application.java"
            description="DispatcherServlet 配置方式对比"
          />

          <ContextSwitcher
            simpleContent={
              <div className="bg-parchment-light p-4 rounded-paper-md border border-border">
                <p className="text-[14px] leading-[1.8] text-ink-muted">
                  <strong>简明理解：</strong>DispatcherServlet 就像酒店的"前台接待"，所有客人（HTTP 请求）都先到前台，
                  前台根据客人的需求（URL 路径）将其引导到对应的服务员（Controller）那里处理。
                </p>
              </div>
            }
            hardcoreContent={
              <div className="bg-parchment-deep p-4 rounded-paper-md border border-border">
                <p className="text-[14px] leading-[1.8] text-ink-muted mb-3">
                  <strong>源码分析：</strong>DispatcherServlet.doDispatch() 方法的处理流程：
                </p>
                <ol className="list-decimal list-inside space-y-2 text-[13px] text-ink-muted">
                  <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">getHandler()</code>：遍历 HandlerMapping 找到匹配的 Controller 方法</li>
                  <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">getHandlerAdapter()</code>：获取适配器执行 Controller</li>
                  <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">applyPreHandle()</code>：执行拦截器前置处理</li>
                  <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">handle()</code>：调用 Controller 方法获取 ModelAndView</li>
                  <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">applyPostHandle()</code>：执行拦截器后置处理</li>
                  <li><code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">processDispatchResult()</code>：渲染视图或返回 JSON</li>
                </ol>
              </div>
            }
          />

          <h2 id="controller-mapping" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Controller 请求映射
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Controller 是处理 HTTP 请求的核心组件，通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">@RequestMapping</code> 及其衍生注解定义 URL 映射规则。
          </p>

          <Playground
            code={`@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET /api/users - 查询所有用户
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    // GET /api/users/{id} - 查询单个用户
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }

    // POST /api/users - 创建用户
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserDTO userDTO) {
        User user = userService.create(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    // PUT /api/users/{id} - 更新用户
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody UserDTO userDTO) {
        User user = userService.update(id, userDTO);
        return ResponseEntity.ok(user);
    }

    // DELETE /api/users/{id} - 删除用户
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}`}
            language="java"
            highlights={[2, 8, 15, 22, 29, 37]}
            filename="UserController.java"
            description="RESTful Controller 完整示例"
          />

          <Callout type="info" title="@RestController vs @Controller">
            <code className="font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]">@RestController</code> = <code className="font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]">@Controller</code> + <code className="font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]">@ResponseBody</code>。前者直接返回 JSON/XML 数据（适合 API），后者返回视图名称（适合传统 Web 页面）。
          </Callout>

          <h2 id="data-binding" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、数据绑定机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring MVC 提供强大的数据绑定能力，自动将 HTTP 请求参数转换为 Java 对象。常用注解包括 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">@RequestParam</code>、<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">@PathVariable</code>、<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">@RequestBody</code> 等。
          </p>

          <Playground
            code={`@RestController
@RequestMapping("/api/products")
public class ProductController {

    // 1. @RequestParam：查询参数绑定
    // GET /api/products?category=electronics&page=1&size=10
    @GetMapping
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(required = false, defaultValue = "all") String category,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<Product> products = productService.findByCategory(category, page, size);
        return ResponseEntity.ok(products);
    }

    // 2. @PathVariable：路径变量绑定
    // GET /api/products/123
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Product product = productService.findById(id);
        return ResponseEntity.ok(product);
    }

    // 3. @RequestBody：请求体绑定（JSON → Object）
    // POST /api/products with JSON body
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody @Valid ProductDTO productDTO) {
        Product product = productService.create(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }

    // 4. @RequestHeader：请求头绑定
    @GetMapping("/debug")
    public ResponseEntity<Map<String, String>> getHeaders(
            @RequestHeader("User-Agent") String userAgent,
            @RequestHeader(value = "X-Custom-Header", required = false) String customHeader) {
        Map<String, String> headers = new HashMap<>();
        headers.put("User-Agent", userAgent);
        headers.put("Custom-Header", customHeader);
        return ResponseEntity.ok(headers);
    }

    // 5. 复杂对象绑定（自动嵌套）
    // POST /api/orders with JSON: {"userId": 1, "items": [{"productId": 10, "quantity": 2}]}
    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody @Valid OrderRequest orderRequest) {
        Order order = orderService.create(orderRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }
}

// DTO 示例
@Data
public class ProductDTO {
    @NotBlank(message = "产品名称不能为空")
    private String name;
    
    @DecimalMin(value = "0.01", message = "价格必须大于0")
    private BigDecimal price;
    
    @Min(value = 0, message = "库存不能为负数")
    private Integer stock;
}`}
            language="java"
            highlights={[8, 18, 26, 34, 45]}
            filename="DataBindingController.java"
            description="Spring MVC 数据绑定全场景示例"
          />

          <SideNote label="数据验证">
            使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">@Valid</code> 或 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">@Validated</code> 触发 Bean Validation（JSR-303），配合 Hibernate Validator 实现自动参数校验。校验失败会抛出 <code className="font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]">MethodArgumentNotValidException</code>。
          </SideNote>

          <h2 id="interceptor" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、拦截器机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            拦截器（Interceptor）在请求到达 Controller 前后执行，用于实现日志记录、权限验证、性能监控等横切关注点。与 Filter 不同，拦截器可以访问 Spring 容器中的 Bean。
          </p>

          <Playground
            code={`// 1. 自定义拦截器
@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private TokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest request, 
                             HttpServletResponse response, 
                             Object handler) throws Exception {
        // 从请求头获取 Token
        String token = request.getHeader("Authorization");
        
        if (token == null || !tokenService.validate(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid token");
            return false; // 中断请求
        }
        
        // 将用户信息存入请求属性，供 Controller 使用
        UserInfo userInfo = tokenService.getUserInfo(token);
        request.setAttribute("currentUser", userInfo);
        
        return true; // 继续处理
    }

    @Override
    public void postHandle(HttpServletRequest request, 
                          HttpServletResponse response, 
                          Object handler, 
                          ModelAndView modelAndView) throws Exception {
        // Controller 执行后，视图渲染前
        long startTime = (Long) request.getAttribute("startTime");
        long duration = System.currentTimeMillis() - startTime;
        System.out.println("Request duration: " + duration + "ms");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, 
                               HttpServletResponse response, 
                               Object handler, 
                               Exception ex) throws Exception {
        // 整个请求完成后（包括视图渲染）
        if (ex != null) {
            System.err.println("Request failed: " + ex.getMessage());
        }
    }
}

// 2. 注册拦截器
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private AuthInterceptor authInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/api/**")           // 拦截所有 API 请求
                .excludePathPatterns(                 // 排除公开接口
                    "/api/auth/login",
                    "/api/auth/register",
                    "/api/public/**"
                );
    }
}`}
            language="java"
            highlights={[8, 28, 41, 56]}
            filename="AuthInterceptor.java"
            description="拦截器实现认证与日志"
          />

          <Callout type="warning" title="拦截器执行顺序">
            多个拦截器按注册顺序形成链条：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">preHandle</code> 按正序执行，<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">postHandle</code> 和 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">afterCompletion</code> 按倒序执行。如果某个拦截器的 <code className="font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]">preHandle</code> 返回 false，后续拦截器和 Controller 都不会执行。
          </Callout>

          <h2 id="exception-handling" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、异常处理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring MVC 提供多种异常处理方式，推荐使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">@ControllerAdvice</code> + <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">@ExceptionHandler</code> 实现全局统一异常处理。
          </p>

          <Playground
            code={`// 1. 局部异常处理（仅当前 Controller）
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        // 业务逻辑...
    }

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleOrderNotFound(OrderNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}

// 2. 全局异常处理（推荐）
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // 处理业务异常
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException ex) {
        log.warn("Business exception: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse(
            ex.getCode(),
            ex.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.status(ex.getCode()).body(error);
    }

    // 处理参数校验异常
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex) {
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        List<String> errors = fieldErrors.stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.toList());
        
        ValidationErrorResponse response = new ValidationErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            "参数校验失败",
            errors,
            LocalDateTime.now()
        );
        return ResponseEntity.badRequest().body(response);
    }

    // 处理未知异常
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        log.error("Unexpected exception", ex);
        ErrorResponse error = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "服务器内部错误",
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

// 3. 统一错误响应格式
@Data
@AllArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private LocalDateTime timestamp;
}

@Data
@AllArgsConstructor
public class ValidationErrorResponse extends ErrorResponse {
    private List<String> errors;
}`}
            language="java"
            highlights={[11, 25, 31, 41, 54]}
            filename="GlobalExceptionHandler.java"
            description="全局异常处理最佳实践"
          />

          <SideNote label="HTTP 状态码规范">
            2xx：成功（200 OK、201 Created、204 No Content）；4xx：客户端错误（400 Bad Request、401 Unauthorized、404 Not Found）；5xx：服务器错误（500 Internal Server Error）。遵循 RESTful 规范能提升 API 的可预测性。
          </SideNote>

          <h2 id="request-flow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、请求处理流程
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            理解完整的请求处理流程对于排查问题和性能优化至关重要。以下是 Spring MVC 处理一个 HTTP 请求的完整生命周期。
          </p>

          <DiagramBlock title="Spring MVC 请求处理流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
HTTP Request
     │
     ▼
┌─────────────────────────┐
│   DispatcherServlet     │ ◄── 前端控制器入口
│   doDispatch()          │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   HandlerMapping        │ ◄── 查找匹配的 Controller
│   getHandler()          │     方法和拦截器链
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Interceptor           │ ◄── preHandle() 前置处理
│   preHandle()           │     （可中断请求）
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   HandlerAdapter        │ ◄── 适配并执行 Controller
│   handle()              │     方法，返回 ModelAndView
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Interceptor           │ ◄── postHandle() 后置处理
│   postHandle()          │     （视图渲染前）
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   ViewResolver          │ ◄── 解析视图名称
│   resolveViewName()     │     （REST API 跳过此步）
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   View Rendering        │ ◄── 渲染视图或序列化 JSON
│   render()              │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Interceptor           │ ◄── afterCompletion()
│   afterCompletion()     │     （最终清理）
└───────────┬─────────────┘
            │
            ▼
HTTP Response
            `}</pre>
          </DiagramBlock>

          <Callout type="tip" title="性能优化建议">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>减少拦截器数量</strong>：每个拦截器都会增加处理延迟</li>
              <li><strong>异步处理</strong>：使用 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">CompletableFuture</code> 或 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">@Async</code> 处理耗时操作</li>
              <li><strong>缓存静态资源</strong>：配置 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">Cache-Control</code> 头</li>
              <li><strong>启用 GZIP 压缩</strong>：在 application.properties 中设置 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">server.compression.enabled=true</code></li>
            </ul>
          </Callout>

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、技术对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Spring MVC、WebFlux 和原生 Servlet 代表了 Java Web 开发的三种不同范式，各有适用场景。
          </p>

          <div className="overflow-x-auto my-5">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">特性</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Spring MVC</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Spring WebFlux</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">原生 Servlet</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">编程模型</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">同步阻塞</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">异步非阻塞</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">同步阻塞</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 font-medium text-ink">线程模型</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">每请求一线程</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">事件循环（少量线程）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">每请求一线程</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">并发能力</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">中等（受线程池限制）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">高（适合 I/O 密集型）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">低（需手动管理线程）</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 font-medium text-ink">学习曲线</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">平缓（主流框架）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">陡峭（响应式编程）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">中等（底层 API）</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">生态成熟度</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐⭐⭐（最成熟）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐（发展中）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐⭐（标准规范）</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 font-medium text-ink">典型场景</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">企业级应用、REST API</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">高并发网关、实时推送</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">轻量级服务、嵌入式场景</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">依赖注入</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 完整支持</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 完整支持</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">❌ 需自行实现</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 font-medium text-ink">性能（QPS）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">~5000（常规场景）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">~20000（高并发场景）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">~3000（无框架开销）</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="info" title="选型建议">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>优先选择 Spring MVC</strong>：90% 的企业应用场景，生态完善、开发效率高</li>
              <li><strong>考虑 WebFlux</strong>：需要处理海量并发连接（如聊天室、实时通知）、I/O 密集型微服务</li>
              <li><strong>避免原生 Servlet</strong>：除非对性能有极致要求且愿意牺牲开发效率</li>
            </ul>
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1：@RequestBody 可以接收表单数据">
            <p className="mb-2"><strong>错误认知</strong>：认为 <code className="font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]">@RequestBody</code> 可以同时处理 JSON 和 form-data。</p>
            <p><strong>正确理解</strong>：<code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">@RequestBody</code> 只能处理 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">Content-Type: application/json</code> 的请求体。表单数据应使用 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">@RequestParam</code> 或直接绑定 POJO（无需注解）。混合使用会导致 <code className="font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]">415 Unsupported Media Type</code> 错误。</p>
          </Callout>

          <Callout type="danger" title="误区 2：拦截器可以替代过滤器">
            <p className="mb-2"><strong>错误认知</strong>：认为拦截器功能更强大，可以完全取代 Filter。</p>
            <p><strong>正确理解</strong>：Filter 在 Servlet 容器层面执行，早于 DispatcherServlet，适合处理字符编码、CORS、安全头等通用需求；拦截器在 Spring 上下文执行，可以访问 Bean 和请求上下文，适合业务相关的权限验证、日志记录。两者应该<strong>配合使用</strong>而非互相替代。</p>
          </Callout>

          <Callout type="danger" title="误区 3：@Transactional 在 Controller 层有效">
            <p className="mb-2"><strong>错误认知</strong>：认为在 Controller 方法上添加 <code className="font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]">@Transactional</code> 可以管理事务。</p>
            <p><strong>正确理解</strong>：虽然技术上可行，但违反了分层架构原则。事务应该在 Service 层管理，Controller 只负责请求转发和响应组装。在 Controller 层使用事务会导致：<br/>① 事务范围过大（包含视图渲染时间）；② 数据库连接占用时间过长；③ 难以单元测试。正确做法是在 Service 方法上标注 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">@Transactional</code>。</p>
          </Callout>

          <Callout type="warning" title="误区 4：PathVariable 和 RequestParam 可以互换">
            <p className="mb-2"><strong>错误认知</strong>：认为路径变量和查询参数没有本质区别。</p>
            <p><strong>正确理解</strong>：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">@PathVariable</code> 用于 RESTful 风格的资源标识（如 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">/users/123</code>），<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">@RequestParam</code> 用于可选的过滤条件（如 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">/users?role=admin</code>）。混用会导致 API 语义不清晰，违反 RESTful 设计规范。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Spring MVC 的执行流程是什么？",
              answer: "① 用户发送请求至 DispatcherServlet；② DispatcherServlet 调用 HandlerMapping 找到对应的 Controller；③ DispatcherServlet 通过 HandlerAdapter 调用 Controller 方法；④ Controller 执行业务逻辑后返回 ModelAndView；⑤ DispatcherServlet 将 ModelAndView 传给 ViewResolver 解析视图；⑥ View 渲染后返回给用户。如果是 REST API，则跳过视图解析步骤，直接通过 HttpMessageConverter 序列化 JSON。"
            },
            {
              question: "@Controller 和 @RestController 的区别？",
              answer: "@Controller 用于传统 Web 应用，方法返回视图名称（如 \"home\"），需要配合 @ResponseBody 才能返回 JSON；@RestController = @Controller + @ResponseBody，方法直接返回数据对象，自动序列化为 JSON/XML。RESTful API 推荐使用 @RestController，传统 Web 页面使用 @Controller。"
            },
            {
              question: "如何实现全局异常处理？",
              answer: "使用 @ControllerAdvice 或 @RestControllerAdvice 定义全局异常处理类，在方法上使用 @ExceptionHandler 指定要处理的异常类型。例如：@ExceptionHandler(Exception.class) 处理所有异常，@ExceptionHandler(MethodArgumentNotValidException.class) 处理参数校验异常。返回统一的 ErrorResponse 对象，包含状态码、错误消息和时间戳。"
            },
            {
              question: "拦截器（Interceptor）和过滤器（Filter）的区别？",
              answer: "① 执行顺序：Filter 在 Servlet 容器层执行，早于 Interceptor；② 依赖关系：Filter 无法访问 Spring 容器中的 Bean，Interceptor 可以；③ 适用范围：Filter 对所有请求生效（包括静态资源），Interceptor 只对 DispatcherServlet 处理的请求生效；④ 使用场景：Filter 适合字符编码、CORS、安全头，Interceptor 适合权限验证、日志记录、性能监控。"
            },
            {
              question: "Spring MVC 如何实现参数绑定？",
              answer: "Spring MVC 使用 HandlerMethodArgumentResolver 接口实现参数解析。常见解析器包括：① RequestParamMethodArgumentResolver 处理 @RequestParam；② PathVariableMethodArgumentResolver 处理 @PathVariable；③ RequestResponseBodyMethodProcessor 处理 @RequestBody（使用 HttpMessageConverter 反序列化 JSON）；④ ServletModelAttributeMethodProcessor 处理表单数据绑定到 POJO。开发者可以自定义 ArgumentResolver 扩展绑定逻辑。"
            },
            {
              question: "什么是 HandlerMapping 和 HandlerAdapter？",
              answer: "HandlerMapping 负责根据请求 URL 找到对应的 Controller 方法（如 RequestMappingHandlerMapping 解析 @RequestMapping 注解）；HandlerAdapter 负责适配不同类型的 Controller 并执行方法（如 RequestMappingHandlerAdapter 执行标注了 @RequestMapping 的方法）。这种设计符合开闭原则，允许扩展新的 Controller 类型而无需修改 DispatcherServlet。"
            },
            {
              question: "Spring MVC 和 Spring WebFlux 如何选择？",
              answer: "Spring MVC 基于 Servlet 规范，采用同步阻塞模型，适合大多数企业应用场景，生态成熟、开发效率高；Spring WebFlux 基于 Reactor，采用异步非阻塞模型，适合高并发 I/O 密集型场景（如网关、实时推送），但对开发者要求较高（需掌握响应式编程）。一般建议优先使用 Spring MVC，只有在需要处理数万并发连接时才考虑 WebFlux。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/06-spring-framework/spring-core" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">Spring Core IoC</div>
              <div className="text-[12px] text-ink-muted mt-1">依赖注入、Bean 生命周期</div>
            </a>
            <a href="/docs/06-spring-framework/spring-boot" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">上层框架 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">Spring Boot</div>
              <div className="text-[12px] text-ink-muted mt-1">自动化配置、Starter 机制</div>
            </a>
            <a href="/docs/10-network-protocol/restful-api" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">RESTful API 设计</div>
              <div className="text-[12px] text-ink-muted mt-1">资源命名、版本管理、HATEOAS</div>
            </a>
            <a href="/docs/06-spring-framework/spring-security" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">安全增强 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Spring Security</div>
              <div className="text-[12px] text-ink-muted mt-1">认证授权、OAuth2、JWT</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            Spring MVC 是 Spring 生态的基石，建议按照以下顺序深入学习：① 掌握基本请求映射和数据绑定；② 理解拦截器和异常处理机制；③ 学习 RESTful API 设计规范；④ 结合 Spring Boot 实战项目；⑤ 阅读 DispatcherServlet 源码理解底层原理。官方文档提供了丰富的示例代码和最佳实践。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}