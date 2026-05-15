import{j as e,g as d}from"./index-hyqxTCwJ.js";import{K as i}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as n}from"./SideNote-BKvanovA.js";import{C as a}from"./ContextSwitcher-Cjd-h5IL.js";import{C as t,A as l,S as p}from"./ArticleNav-DhfiS38Y.js";import{D as o}from"./DiagramBlock-CLaKE9_7.js";import{I as x}from"./InterviewSection-BBNdwyyN.js";const c=[{id:"definition",text:"一句话定义",level:2},{id:"core-principle",text:"一、核心原理与架构",level:2},{id:"dispatcher-servlet",text:"二、DispatcherServlet 核心",level:2},{id:"controller-mapping",text:"三、Controller 请求映射",level:2},{id:"data-binding",text:"四、数据绑定机制",level:2},{id:"interceptor",text:"五、拦截器机制",level:2},{id:"exception-handling",text:"六、异常处理",level:2},{id:"request-flow",text:"七、请求处理流程",level:2},{id:"comparison",text:"八、技术对比",level:2},{id:"misconceptions",text:"九、常见误区",level:2},{id:"interview",text:"十、面试真题",level:2},{id:"related",text:"十一、知识关联",level:2}];function N({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(i,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Spring MVC 是基于",e.jsx("strong",{className:"text-accent",children:"Model-View-Controller 设计模式"}),"的 Web 框架， 通过 DispatcherServlet 作为前端控制器统一分发请求，实现请求处理、数据绑定、视图渲染的解耦， 是 Spring Framework 中构建 RESTful API 和传统 Web 应用的核心模块。"]})}),e.jsx(t,{type:"tip",title:"为什么选择 Spring MVC？",children:"Spring MVC 提供了声明式的请求映射、自动的数据绑定、灵活的拦截器链和统一的异常处理机制，相比原生 Servlet 开发效率提升 10 倍以上，同时保持高性能和可扩展性。"}),e.jsx("h2",{id:"core-principle",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、核心原理与架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Spring MVC 采用",e.jsx("strong",{children:"前端控制器模式（Front Controller Pattern）"}),"，所有 HTTP 请求首先到达 DispatcherServlet， 再由它根据配置将请求分发给对应的 Controller 处理。这种集中式控制简化了 URL 映射、权限验证、日志记录等横切关注点的实现。"]}),e.jsx(o,{title:"Spring MVC 三层架构",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
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
            `})}),e.jsxs(n,{label:"MVC 职责划分",children:[e.jsx("strong",{children:"Model"}),"：业务数据和业务逻辑（Service + DAO）；",e.jsx("strong",{children:"View"}),"：数据展示（JSP/Thymeleaf/JSON）；",e.jsx("strong",{children:"Controller"}),"：接收请求、调用 Service、返回响应。三者解耦，便于测试和维护。"]}),e.jsx("h2",{id:"dispatcher-servlet",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、DispatcherServlet 核心"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"DispatcherServlet 是 Spring MVC 的核心类，继承自 HttpServlet，负责协调整个请求处理流程。它在 web.xml 或 Spring Boot 自动配置中注册，拦截所有匹配的 URL 请求。"}),e.jsx(r,{code:`// Spring Boot 自动配置（无需手动配置）
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
*/`,language:"java",highlights:[2,7],filename:"Application.java",description:"DispatcherServlet 配置方式对比"}),e.jsx(a,{simpleContent:e.jsx("div",{className:"bg-parchment-light p-4 rounded-paper-md border border-border",children:e.jsxs("p",{className:"text-[14px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"简明理解："}),'DispatcherServlet 就像酒店的"前台接待"，所有客人（HTTP 请求）都先到前台， 前台根据客人的需求（URL 路径）将其引导到对应的服务员（Controller）那里处理。']})}),hardcoreContent:e.jsxs("div",{className:"bg-parchment-deep p-4 rounded-paper-md border border-border",children:[e.jsxs("p",{className:"text-[14px] leading-[1.8] text-ink-muted mb-3",children:[e.jsx("strong",{children:"源码分析："}),"DispatcherServlet.doDispatch() 方法的处理流程："]}),e.jsxs("ol",{className:"list-decimal list-inside space-y-2 text-[13px] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"getHandler()"}),"：遍历 HandlerMapping 找到匹配的 Controller 方法"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"getHandlerAdapter()"}),"：获取适配器执行 Controller"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"applyPreHandle()"}),"：执行拦截器前置处理"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"handle()"}),"：调用 Controller 方法获取 ModelAndView"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"applyPostHandle()"}),"：执行拦截器后置处理"]}),e.jsxs("li",{children:[e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"processDispatchResult()"}),"：渲染视图或返回 JSON"]})]})]})}),e.jsx("h2",{id:"controller-mapping",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、Controller 请求映射"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Controller 是处理 HTTP 请求的核心组件，通过 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@RequestMapping"})," 及其衍生注解定义 URL 映射规则。"]}),e.jsx(r,{code:`@RestController
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
}`,language:"java",highlights:[2,8,15,22,29,37],filename:"UserController.java",description:"RESTful Controller 完整示例"}),e.jsxs(t,{type:"info",title:"@RestController vs @Controller",children:[e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]",children:"@RestController"})," = ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]",children:"@Controller"})," + ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]",children:"@ResponseBody"}),"。前者直接返回 JSON/XML 数据（适合 API），后者返回视图名称（适合传统 Web 页面）。"]}),e.jsx("h2",{id:"data-binding",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、数据绑定机制"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Spring MVC 提供强大的数据绑定能力，自动将 HTTP 请求参数转换为 Java 对象。常用注解包括 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@RequestParam"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@PathVariable"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@RequestBody"})," 等。"]}),e.jsx(r,{code:`@RestController
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
}`,language:"java",highlights:[8,18,26,34,45],filename:"DataBindingController.java",description:"Spring MVC 数据绑定全场景示例"}),e.jsxs(n,{label:"数据验证",children:["使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"@Valid"})," 或 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"@Validated"})," 触发 Bean Validation（JSR-303），配合 Hibernate Validator 实现自动参数校验。校验失败会抛出 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]",children:"MethodArgumentNotValidException"}),"。"]}),e.jsx("h2",{id:"interceptor",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、拦截器机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"拦截器（Interceptor）在请求到达 Controller 前后执行，用于实现日志记录、权限验证、性能监控等横切关注点。与 Filter 不同，拦截器可以访问 Spring 容器中的 Bean。"}),e.jsx(r,{code:`// 1. 自定义拦截器
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
}`,language:"java",highlights:[8,28,41,56],filename:"AuthInterceptor.java",description:"拦截器实现认证与日志"}),e.jsxs(t,{type:"warning",title:"拦截器执行顺序",children:["多个拦截器按注册顺序形成链条：",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"preHandle"})," 按正序执行，",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"postHandle"})," 和 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"afterCompletion"})," 按倒序执行。如果某个拦截器的 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]",children:"preHandle"})," 返回 false，后续拦截器和 Controller 都不会执行。"]}),e.jsx("h2",{id:"exception-handling",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、异常处理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Spring MVC 提供多种异常处理方式，推荐使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@ControllerAdvice"})," + ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"@ExceptionHandler"})," 实现全局统一异常处理。"]}),e.jsx(r,{code:`// 1. 局部异常处理（仅当前 Controller）
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
}`,language:"java",highlights:[11,25,31,41,54],filename:"GlobalExceptionHandler.java",description:"全局异常处理最佳实践"}),e.jsx(n,{label:"HTTP 状态码规范",children:"2xx：成功（200 OK、201 Created、204 No Content）；4xx：客户端错误（400 Bad Request、401 Unauthorized、404 Not Found）；5xx：服务器错误（500 Internal Server Error）。遵循 RESTful 规范能提升 API 的可预测性。"}),e.jsx("h2",{id:"request-flow",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、请求处理流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"理解完整的请求处理流程对于排查问题和性能优化至关重要。以下是 Spring MVC 处理一个 HTTP 请求的完整生命周期。"}),e.jsx(o,{title:"Spring MVC 请求处理流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
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
            `})}),e.jsx(t,{type:"tip",title:"性能优化建议",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"减少拦截器数量"}),"：每个拦截器都会增加处理延迟"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"异步处理"}),"：使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]",children:"CompletableFuture"})," 或 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]",children:"@Async"})," 处理耗时操作"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"缓存静态资源"}),"：配置 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]",children:"Cache-Control"})," 头"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"启用 GZIP 压缩"}),"：在 application.properties 中设置 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]",children:"server.compression.enabled=true"})]})]})}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、技术对比"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Spring MVC、WebFlux 和原生 Servlet 代表了 Java Web 开发的三种不同范式，各有适用场景。"}),e.jsx("div",{className:"overflow-x-auto my-5",children:e.jsxs("table",{className:"w-full text-[13px] border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"Spring MVC"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"Spring WebFlux"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"原生 Servlet"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"编程模型"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"同步阻塞"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"异步非阻塞"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"同步阻塞"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"线程模型"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"每请求一线程"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"事件循环（少量线程）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"每请求一线程"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"并发能力"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"中等（受线程池限制）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"高（适合 I/O 密集型）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"低（需手动管理线程）"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"学习曲线"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"平缓（主流框架）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"陡峭（响应式编程）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"中等（底层 API）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"生态成熟度"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"⭐⭐⭐⭐⭐（最成熟）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"⭐⭐⭐（发展中）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"⭐⭐⭐⭐（标准规范）"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"典型场景"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"企业级应用、REST API"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"高并发网关、实时推送"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"轻量级服务、嵌入式场景"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"依赖注入"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"✅ 完整支持"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"✅ 完整支持"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"❌ 需自行实现"})]}),e.jsxs("tr",{className:"bg-parchment-light/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"性能（QPS）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"~5000（常规场景）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"~20000（高并发场景）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"~3000（无框架开销）"})]})]})]})}),e.jsx(t,{type:"info",title:"选型建议",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"优先选择 Spring MVC"}),"：90% 的企业应用场景，生态完善、开发效率高"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"考虑 WebFlux"}),"：需要处理海量并发连接（如聊天室、实时通知）、I/O 密集型微服务"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"避免原生 Servlet"}),"：除非对性能有极致要求且愿意牺牲开发效率"]})]})}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：@RequestBody 可以接收表单数据",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]",children:"@RequestBody"})," 可以同时处理 JSON 和 form-data。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]",children:"@RequestBody"})," 只能处理 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]",children:"Content-Type: application/json"})," 的请求体。表单数据应使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]",children:"@RequestParam"})," 或直接绑定 POJO（无需注解）。混合使用会导致 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]",children:"415 Unsupported Media Type"})," 错误。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：拦截器可以替代过滤器",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为拦截器功能更强大，可以完全取代 Filter。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：Filter 在 Servlet 容器层面执行，早于 DispatcherServlet，适合处理字符编码、CORS、安全头等通用需求；拦截器在 Spring 上下文执行，可以访问 Bean 和请求上下文，适合业务相关的权限验证、日志记录。两者应该",e.jsx("strong",{children:"配合使用"}),"而非互相替代。"]})]}),e.jsxs(t,{type:"danger",title:"误区 3：@Transactional 在 Controller 层有效",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为在 Controller 方法上添加 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]",children:"@Transactional"})," 可以管理事务。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：虽然技术上可行，但违反了分层架构原则。事务应该在 Service 层管理，Controller 只负责请求转发和响应组装。在 Controller 层使用事务会导致：",e.jsx("br",{}),"① 事务范围过大（包含视图渲染时间）；② 数据库连接占用时间过长；③ 难以单元测试。正确做法是在 Service 方法上标注 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]",children:"@Transactional"}),"。"]})]}),e.jsxs(t,{type:"warning",title:"误区 4：PathVariable 和 RequestParam 可以互换",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为路径变量和查询参数没有本质区别。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"@PathVariable"})," 用于 RESTful 风格的资源标识（如 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"/users/123"}),"），",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"@RequestParam"})," 用于可选的过滤条件（如 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"/users?role=admin"}),"）。混用会导致 API 语义不清晰，违反 RESTful 设计规范。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、面试真题"}),e.jsx(x,{questions:[{question:"Spring MVC 的执行流程是什么？",answer:"① 用户发送请求至 DispatcherServlet；② DispatcherServlet 调用 HandlerMapping 找到对应的 Controller；③ DispatcherServlet 通过 HandlerAdapter 调用 Controller 方法；④ Controller 执行业务逻辑后返回 ModelAndView；⑤ DispatcherServlet 将 ModelAndView 传给 ViewResolver 解析视图；⑥ View 渲染后返回给用户。如果是 REST API，则跳过视图解析步骤，直接通过 HttpMessageConverter 序列化 JSON。"},{question:"@Controller 和 @RestController 的区别？",answer:'@Controller 用于传统 Web 应用，方法返回视图名称（如 "home"），需要配合 @ResponseBody 才能返回 JSON；@RestController = @Controller + @ResponseBody，方法直接返回数据对象，自动序列化为 JSON/XML。RESTful API 推荐使用 @RestController，传统 Web 页面使用 @Controller。'},{question:"如何实现全局异常处理？",answer:"使用 @ControllerAdvice 或 @RestControllerAdvice 定义全局异常处理类，在方法上使用 @ExceptionHandler 指定要处理的异常类型。例如：@ExceptionHandler(Exception.class) 处理所有异常，@ExceptionHandler(MethodArgumentNotValidException.class) 处理参数校验异常。返回统一的 ErrorResponse 对象，包含状态码、错误消息和时间戳。"},{question:"拦截器（Interceptor）和过滤器（Filter）的区别？",answer:"① 执行顺序：Filter 在 Servlet 容器层执行，早于 Interceptor；② 依赖关系：Filter 无法访问 Spring 容器中的 Bean，Interceptor 可以；③ 适用范围：Filter 对所有请求生效（包括静态资源），Interceptor 只对 DispatcherServlet 处理的请求生效；④ 使用场景：Filter 适合字符编码、CORS、安全头，Interceptor 适合权限验证、日志记录、性能监控。"},{question:"Spring MVC 如何实现参数绑定？",answer:"Spring MVC 使用 HandlerMethodArgumentResolver 接口实现参数解析。常见解析器包括：① RequestParamMethodArgumentResolver 处理 @RequestParam；② PathVariableMethodArgumentResolver 处理 @PathVariable；③ RequestResponseBodyMethodProcessor 处理 @RequestBody（使用 HttpMessageConverter 反序列化 JSON）；④ ServletModelAttributeMethodProcessor 处理表单数据绑定到 POJO。开发者可以自定义 ArgumentResolver 扩展绑定逻辑。"},{question:"什么是 HandlerMapping 和 HandlerAdapter？",answer:"HandlerMapping 负责根据请求 URL 找到对应的 Controller 方法（如 RequestMappingHandlerMapping 解析 @RequestMapping 注解）；HandlerAdapter 负责适配不同类型的 Controller 并执行方法（如 RequestMappingHandlerAdapter 执行标注了 @RequestMapping 的方法）。这种设计符合开闭原则，允许扩展新的 Controller 类型而无需修改 DispatcherServlet。"},{question:"Spring MVC 和 Spring WebFlux 如何选择？",answer:"Spring MVC 基于 Servlet 规范，采用同步阻塞模型，适合大多数企业应用场景，生态成熟、开发效率高；Spring WebFlux 基于 Reactor，采用异步非阻塞模型，适合高并发 I/O 密集型场景（如网关、实时推送），但对开发者要求较高（需掌握响应式编程）。一般建议优先使用 Spring MVC，只有在需要处理数万并发连接时才考虑 WebFlux。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/06-spring-framework/spring-core",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"Spring Core IoC"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"依赖注入、Bean 生命周期"})]}),e.jsxs("a",{href:"/docs/06-spring-framework/spring-boot",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"上层框架 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"Spring Boot"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"自动化配置、Starter 机制"})]}),e.jsxs("a",{href:"/docs/10-network-protocol/restful-api",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-accent mb-1",children:"相关技术 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-accent",children:"RESTful API 设计"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"资源命名、版本管理、HATEOAS"})]}),e.jsxs("a",{href:"/docs/06-spring-framework/spring-security",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-rose mb-1",children:"安全增强 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-rose",children:"Spring Security"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"认证授权、OAuth2、JWT"})]})]}),e.jsx(t,{type:"info",title:"学习建议",children:"Spring MVC 是 Spring 生态的基石，建议按照以下顺序深入学习：① 掌握基本请求映射和数据绑定；② 理解拦截器和异常处理机制；③ 学习 RESTful API 设计规范；④ 结合 Spring Boot 实战项目；⑤ 阅读 DispatcherServlet 源码理解底层原理。官方文档提供了丰富的示例代码和最佳实践。"}),e.jsx(l,{...d(s.category,s.id)})]})}),e.jsx(p,{items:c})]})}export{N as default};
