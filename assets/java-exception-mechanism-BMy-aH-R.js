import{j as e,g as a}from"./index-hyqxTCwJ.js";import{C as s,A as i,S as c}from"./ArticleNav-DhfiS38Y.js";import{K as l}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as n}from"./SideNote-BKvanovA.js";import{I as o}from"./InterviewSection-BBNdwyyN.js";const d=[{id:"definition",text:"一句话定义",level:2},{id:"architecture",text:"异常体系结构",level:2},{id:"core-principle",text:"核心原理",level:2},{id:"try-catch-finally",text:"try-catch-finally 机制",level:3},{id:"throw-throws",text:"throw / throws 关键字",level:3},{id:"custom-exception",text:"自定义异常",level:3},{id:"source-analysis",text:"源码分析",level:2},{id:"flow-control",text:"异常处理流程",level:2},{id:"playground",text:"代码实验场",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比分析",level:2},{id:"related",text:"知识关联",level:2}];function g({meta:r}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(l,{meta:r,children:[e.jsxs("section",{id:"definition",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"一句话定义"}),e.jsxs("blockquote",{className:"border-l-4 border-accent bg-accent-soft/50 pl-4 py-3 rounded-r-lg italic text-[14px] sm:text-[15px] leading-relaxed text-ink-muted",children:["Java 异常机制是一种",e.jsx("strong",{children:"错误处理模型"}),"，通过 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Throwable"})," 类层次结构捕获和处理程序运行时出现的非正常情况，使程序能够从错误中恢复或优雅地终止。"]})]}),e.jsxs("section",{id:"architecture",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"异常体系结构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java 的异常体系以 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Throwable"})," 为根类，分为两大分支：",e.jsx("strong",{children:"Error"}),"（严重错误，不可恢复）和 ",e.jsx("strong",{children:"Exception"}),"（可处理的异常）。"]}),e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-7 my-5 text-center shadow-paper overflow-x-auto",children:[e.jsx("div",{className:"font-sans font-semibold text-xs text-ink-faded mb-4 uppercase tracking-[0.06em]",children:"Java 异常类层次结构"}),e.jsx("div",{className:"w-full max-w-[500px] mx-auto text-left",children:e.jsx("pre",{className:"text-[12px] sm:text-[13px] font-mono text-ink-muted whitespace-pre-wrap",children:`Throwable
├── Error
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── VirtualMachineError
└── Exception
    ├── RuntimeException (非检查型)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   ├── IllegalArgumentException
    │   └── ClassCastException
    └── IOException (检查型)
        ├── FileNotFoundException
        └── EOFException`})})]}),e.jsx(n,{label:"关键分类",children:e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[13px] sm:text-[14px] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"检查型异常（Checked Exception）"}),"：编译期强制要求处理，如 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1 py-0.5 rounded",children:"IOException"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"非检查型异常（Unchecked Exception）"}),"：继承自 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1 py-0.5 rounded",children:"RuntimeException"}),"，编译期不强制处理"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Error"}),"：JVM 级别的严重错误，应用程序不应尝试捕获"]})]})})]}),e.jsxs("section",{id:"core-principle",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"核心原理"}),e.jsx("h3",{id:"try-catch-finally",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"1. try-catch-finally 机制"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"try"})," 块包裹可能抛出异常的代码，",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"catch"})," 块捕获并处理特定类型的异常，",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"finally"})," 块无论是否发生异常都会执行（常用于资源释放）。"]}),e.jsx(t,{code:`public class TryCatchDemo {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;  // 触发 ArithmeticException
            System.out.println("结果: " + result);
        } catch (ArithmeticException e) {
            System.out.println("捕获到算术异常: " + e.getMessage());
        } finally {
            System.out.println("finally 块始终执行");
        }
        System.out.println("程序继续运行");
    }
}`,language:"java",highlights:[3,6,9],filename:"TryCatchDemo.java",description:"基本 try-catch-finally 示例"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:e.jsx("strong",{children:"输出："})}),e.jsx(t,{code:`捕获到算术异常: / by zero
finally 块始终执行
程序继续运行`,language:"text",filename:"控制台输出"}),e.jsx("h3",{id:"throw-throws",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2. throw / throws 关键字"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"throw"})," 用于在方法体内",e.jsx("strong",{children:"主动抛出"}),"异常对象；",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"throws"})," 用于在方法签名中",e.jsx("strong",{children:"声明"}),"该方法可能抛出的检查型异常。"]}),e.jsx(t,{code:`public class ThrowThrowsDemo {
    // throws 声明方法可能抛出的检查型异常
    public void readFile(String path) throws FileNotFoundException {
        if (path == null || path.isEmpty()) {
            // throw 主动抛出异常
            throw new IllegalArgumentException("文件路径不能为空");
        }
        File file = new File(path);
        if (!file.exists()) {
            throw new FileNotFoundException("文件不存在: " + path);
        }
        // 读取文件逻辑...
    }
    
    public static void main(String[] args) {
        ThrowThrowsDemo demo = new ThrowThrowsDemo();
        try {
            demo.readFile(null);
        } catch (IllegalArgumentException e) {
            System.out.println("参数异常: " + e.getMessage());
        } catch (FileNotFoundException e) {
            System.out.println("文件异常: " + e.getMessage());
        }
    }
}`,language:"java",highlights:[2,5,9],filename:"ThrowThrowsDemo.java",description:"throw 与 throws 的使用区别"}),e.jsx("h3",{id:"custom-exception",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3. 自定义异常"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["当 JDK 提供的异常类型无法准确描述业务错误时，可以创建自定义异常类。通常继承 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Exception"}),"（检查型）或 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"RuntimeException"}),"（非检查型）。"]}),e.jsx(t,{code:`// 自定义检查型异常
public class InsufficientBalanceException extends Exception {
    private final double currentBalance;
    private final double withdrawAmount;
    
    public InsufficientBalanceException(double balance, double amount) {
        super(String.format("余额不足: 当前余额 %.2f, 取款金额 %.2f", balance, amount));
        this.currentBalance = balance;
        this.withdrawAmount = amount;
    }
    
    public double getCurrentBalance() {
        return currentBalance;
    }
    
    public double getWithdrawAmount() {
        return withdrawAmount;
    }
}

// 使用自定义异常
public class BankAccount {
    private double balance;
    
    public void withdraw(double amount) throws InsufficientBalanceException {
        if (amount <= 0) {
            throw new IllegalArgumentException("取款金额必须大于0");
        }
        if (amount > balance) {
            throw new InsufficientBalanceException(balance, amount);
        }
        balance -= amount;
        System.out.println("成功取款: " + amount);
    }
}`,language:"java",highlights:[1,19],filename:"CustomException.java",description:"自定义异常类的设计与使用"})]}),e.jsxs("section",{id:"source-analysis",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"源码分析"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Throwable"})," 是所有异常和错误的超类，它保存了异常的详细信息，包括消息、原因异常和堆栈跟踪。"]}),e.jsx(t,{code:`public class Throwable implements Serializable {
    // 异常消息
    private String detailMessage;
    
    // 导致此异常的原因异常（异常链）
    private Throwable cause = this;
    
    // 堆栈跟踪信息
    private StackTraceElement[] stackTrace;
    
    // 构造方法
    public Throwable(String message) {
        fillInStackTrace();
        this.detailMessage = message;
    }
    
    public Throwable(String message, Throwable cause) {
        fillInStackTrace();
        this.detailMessage = message;
        this.cause = cause;
    }
    
    // 填充堆栈跟踪
    public synchronized Throwable fillInStackTrace() {
        // JVM  native 方法，记录当前线程的调用栈
        if (stackTrace != null || backtrace != null) {
            stackTrace = UNASSIGNED_STACK;
            setStackTrace(UNASSIGNED_STACK);
        }
        return this;
    }
    
    // 获取堆栈跟踪
    public StackTraceElement[] getStackTrace() {
        return getOurStackTrace().clone();
    }
    
    // 打印堆栈跟踪到标准错误流
    public void printStackTrace() {
        printStackTrace(System.err);
    }
}`,language:"java",highlights:[3,6,9,22,32,37],filename:"Throwable.java (简化版)",description:"Throwable 核心字段与方法"}),e.jsx(s,{type:"tip",title:"异常链的重要性",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-relaxed",children:["通过 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1 py-0.5 rounded",children:"cause"})," 字段可以实现异常链，保留原始异常信息。例如捕获底层异常后包装成业务异常抛出时，应将原异常作为 cause 传入，便于排查问题根源。"]})})]}),e.jsxs("section",{id:"flow-control",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"异常处理流程"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["当异常发生时，JVM 会沿着方法调用栈向上查找匹配的 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"catch"})," 块。如果找到则执行处理逻辑，否则终止线程并打印堆栈跟踪。"]}),e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-7 my-5 text-center shadow-paper overflow-x-auto",children:[e.jsx("div",{className:"font-sans font-semibold text-xs text-ink-faded mb-4 uppercase tracking-[0.06em]",children:"异常传播与处理流程"}),e.jsx("div",{className:"w-full max-w-[500px] mx-auto text-left",children:e.jsx("pre",{className:"text-[12px] sm:text-[13px] font-mono text-ink-muted whitespace-pre-wrap",children:`异常发生
  ↓
是否有 try-catch?
  ├─ 是 → catch 类型匹配?
  │         ├─ 是 → 执行 catch 块
  │         │         ↓
  │         │       是否有 finally?
  │         │         ├─ 是 → 执行 finally 块
  │         │         └─ 否 → 继续执行后续代码
  │         └─ 否 → 向上传播到调用者
  └─ 否 → 向上传播到调用者
            ↓
      到达 main 方法?
        ├─ 是 → JVM 打印堆栈跟踪并终止线程
        └─ 否 → 继续向上传播`})})]}),e.jsx(n,{label:"性能提示",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:["异常的创建和抛出涉及堆栈跟踪的生成，成本较高。",e.jsx("strong",{children:"不要将异常用于正常的控制流"}),"（如用异常替代 if-else 判断），仅在真正的错误场景下使用。"]})})]}),e.jsxs("section",{id:"playground",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"代码实验场"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"以下示例展示了多种异常处理场景的综合应用，包括多层嵌套 try-catch、异常链和资源管理。"}),e.jsx(t,{code:`import java.io.*;
import java.util.*;

public class ExceptionPlayground {
    
    // 模拟数据库操作
    static class DatabaseService {
        public User findById(int id) throws SQLException {
            if (id <= 0) {
                throw new SQLException("无效的用户ID: " + id);
            }
            // 模拟查询失败
            if (id == 999) {
                throw new SQLException("用户不存在: " + id);
            }
            return new User(id, "User" + id);
        }
    }
    
    // 业务层：捕获并转换异常
    static class UserService {
        private DatabaseService dbService = new DatabaseService();
        
        public User getUser(int id) {
            try {
                return dbService.findById(id);
            } catch (SQLException e) {
                // 将底层异常包装成业务异常，保留异常链
                throw new BusinessException("查询用户失败", e);
            }
        }
    }
    
    // 自定义业务异常
    static class BusinessException extends RuntimeException {
        public BusinessException(String message, Throwable cause) {
            super(message, cause);
        }
    }
    
    static class User {
        int id;
        String name;
        User(int id, String name) {
            this.id = id;
            this.name = name;
        }
        @Override
        public String toString() {
            return "User{id=" + id + ", name='" + name + "'}";
        }
    }
    
    public static void main(String[] args) {
        UserService userService = new UserService();
        
        // 测试1：正常查询
        try {
            User user = userService.getUser(1);
            System.out.println("查询成功: " + user);
        } catch (BusinessException e) {
            System.out.println("业务异常: " + e.getMessage());
            System.out.println("根本原因: " + e.getCause().getMessage());
        }
        
        // 测试2：异常查询
        try {
            User user = userService.getUser(999);
            System.out.println("查询成功: " + user);
        } catch (BusinessException e) {
            System.out.println("业务异常: " + e.getMessage());
            e.printStackTrace();  // 打印完整堆栈跟踪
        }
    }
}`,language:"java",highlights:[25,29,34,54,62],filename:"ExceptionPlayground.java",description:"综合异常处理示例：异常链与业务异常包装"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:e.jsx("strong",{children:"输出（测试2）："})}),e.jsx(t,{code:`业务异常: 查询用户失败
com.example.ExceptionPlayground$BusinessException: 查询用户失败
	at com.example.ExceptionPlayground$UserService.getUser(ExceptionPlayground.java:29)
	at com.example.ExceptionPlayground.main(ExceptionPlayground.java:62)
Caused by: java.sql.SQLException: 用户不存在: 999
	at com.example.ExceptionPlayground$DatabaseService.findById(ExceptionPlayground.java:14)
	at com.example.ExceptionPlayground$UserService.getUser(ExceptionPlayground.java:26)
	... 1 more`,language:"text",filename:"控制台输出（含异常链）"})]}),e.jsxs("section",{id:"misconceptions",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"常见误区"}),e.jsxs(s,{type:"danger",title:"误区1：catch (Exception e) 可以捕获所有异常",children:[e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-relaxed mb-2",children:[e.jsx("strong",{children:"错误理解"}),"：认为 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1 py-0.5 rounded",children:"catch (Exception e)"})," 能捕获一切异常。"]}),e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-relaxed",children:[e.jsx("strong",{children:"事实"}),"：",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1 py-0.5 rounded",children:"Error"})," 及其子类（如 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1 py-0.5 rounded",children:"OutOfMemoryError"}),"）不属于 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1 py-0.5 rounded",children:"Exception"}),"，不会被捕获。且过度宽泛的 catch 会隐藏真正的错误，应针对具体异常类型分别处理。"]})]}),e.jsxs(s,{type:"danger",title:"误区2：finally 块一定会执行",children:[e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-relaxed mb-2",children:[e.jsx("strong",{children:"错误理解"}),"：认为无论什么情况 finally 都会执行。"]}),e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-relaxed",children:[e.jsx("strong",{children:"事实"}),"：如果在 try 或 catch 块中调用了 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1 py-0.5 rounded",children:"System.exit()"}),"，或者 JVM 崩溃、线程被强制终止，finally 块",e.jsx("strong",{children:"不会执行"}),"。此外，finally 中的 return 会覆盖 try/catch 中的返回值，应避免在 finally 中使用 return。"]})]}),e.jsxs(s,{type:"warning",title:"误区3：捕获异常后不做任何处理（吞掉异常）",children:[e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-relaxed mb-2",children:[e.jsx("strong",{children:"错误做法"}),"："]}),e.jsx("pre",{className:"bg-parchment-deep p-3 rounded-paper-sm text-[12px] sm:text-[13px] font-mono overflow-x-auto mb-2",children:`try {
    doSomething();
} catch (Exception e) {
    // 什么都不做，吞掉异常
}`}),e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-relaxed",children:[e.jsx("strong",{children:"后果"}),"：异常被静默忽略，导致问题难以排查。至少应该记录日志（",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1 py-0.5 rounded",children:"logger.error()"}),"）或重新抛出。如果确实不需要处理，也应添加注释说明原因。"]})]}),e.jsxs(s,{type:"warning",title:"误区4：用异常控制正常业务流程",children:[e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-relaxed mb-2",children:[e.jsx("strong",{children:"错误做法"}),"："]}),e.jsx("pre",{className:"bg-parchment-deep p-3 rounded-paper-sm text-[12px] sm:text-[13px] font-mono overflow-x-auto mb-2",children:`try {
    int value = Integer.parseInt(input);
} catch (NumberFormatException e) {
    // 用异常判断输入是否合法
    value = 0;
}`}),e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-relaxed",children:[e.jsx("strong",{children:"正确做法"}),"：先用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1 py-0.5 rounded",children:"if"})," 判断输入合法性，仅在真正出错时使用异常。频繁抛出异常会影响性能，因为每次都要生成堆栈跟踪。"]})]})]}),e.jsxs("section",{id:"interview",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"面试真题"}),e.jsx(o,{questions:[{question:"Java 中 Error 和 Exception 有什么区别？",answer:"Error 表示 JVM 级别的严重错误（如 OutOfMemoryError、StackOverflowError），应用程序不应尝试捕获或恢复；Exception 表示程序运行时可能出现的问题，可以通过 try-catch 进行处理。Exception 又分为检查型异常（编译期强制处理）和非检查型异常（RuntimeException 及其子类）。"},{question:"final、finally、finalize 有什么区别？",answer:"final 是关键字，用于修饰类（不可继承）、方法（不可重写）、变量（不可修改）；finally 是异常处理的一部分，无论是否发生异常都会执行（除非 JVM 退出）；finalize 是 Object 类的方法，在垃圾回收前由 JVM 调用，但已被标记为 deprecated，不应依赖它进行资源清理，应使用 try-with-resources 或显式关闭。"},{question:"throw 和 throws 的区别是什么？",answer:"throw 用于方法体内主动抛出一个异常对象（如 throw new IllegalArgumentException()）；throws 用于方法签名中声明该方法可能抛出的检查型异常列表（如 public void read() throws IOException）。一个方法可以有多个 throws 声明，但每次只能 throw 一个异常对象。"},{question:"什么是异常链？如何使用？",answer:'异常链是通过 Throwable 的 cause 字段将多个异常关联起来，保留异常的因果关系。使用方式是在构造新异常时将原异常作为 cause 传入（如 new BusinessException("msg", originalException)）。这样在打印堆栈跟踪时会显示 "Caused by" 链路，便于追溯问题的根本原因。'},{question:"try-with-resources 的工作原理是什么？",answer:"try-with-resources 是 Java 7 引入的语法糖，用于自动管理实现了 AutoCloseable 接口的资源（如 InputStream、Connection）。在 try 块结束时（无论正常结束还是异常），JVM 会自动调用资源的 close() 方法。如果有多个资源，按声明的逆序关闭。即使 close() 抛出异常，也不会掩盖 try 块中的原始异常，而是作为 suppressed exception 附加。"},{question:"catch 多个异常时，子类和父类的顺序有什么要求？",answer:"catch 块必须按照从子类到父类的顺序排列。如果先 catch 父类异常（如 Exception），再 catch 子类异常（如 IOException），编译器会报错，因为子类异常永远不会被执行（已被父类捕获）。正确顺序是先 catch IOException，再 catch Exception。"}]})]}),e.jsxs("section",{id:"comparison",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"对比分析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"不同异常处理方式的选择取决于具体场景："}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"w-full text-[13px] sm:text-[14px] border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"try-catch-finally"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"try-with-resources"}),e.jsx("th",{className:"border border-border px-3 py-2 text-left font-semibold text-ink",children:"throws 声明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"适用场景"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"通用异常处理"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"资源管理（IO、数据库连接等）"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"传递检查型异常给调用者"})]}),e.jsxs("tr",{className:"bg-parchment/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"资源释放"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"需在 finally 中手动关闭"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"自动调用 close()"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"不涉及资源管理"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"代码简洁性"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"较冗长"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"简洁，推荐优先使用"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"简洁"})]}),e.jsxs("tr",{className:"bg-parchment/50",children:[e.jsx("td",{className:"border border-border px-3 py-2 font-medium text-ink",children:"异常抑制"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"finally 中的异常会掩盖 try 中的异常"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"close() 异常作为 suppressed 附加"}),e.jsx("td",{className:"border border-border px-3 py-2 text-ink-muted",children:"不适用"})]})]})]})}),e.jsx(s,{type:"info",title:"最佳实践建议",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-[13px] sm:text-[14px] text-ink-muted",children:[e.jsxs("li",{children:["资源管理优先使用 ",e.jsx("strong",{children:"try-with-resources"})]}),e.jsxs("li",{children:["避免捕获过于宽泛的异常（如 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-deep px-1 py-0.5 rounded",children:"Exception"}),"）"]}),e.jsx("li",{children:"不要在循环中使用 try-catch，应在循环外统一处理"}),e.jsx("li",{children:"自定义异常应提供有意义的构造方法和字段"})]})})]}),e.jsxs("section",{id:"related",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-parchment/50 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-[14px] sm:text-[15px] text-ink mb-2",children:"🔗 前置知识"}),e.jsxs("ul",{className:"space-y-1 text-[13px] sm:text-[14px] text-ink-muted",children:[e.jsxs("li",{children:["• ",e.jsx("a",{href:"/docs/01-java-core/java-basics",className:"text-accent hover:underline",children:"Java 基础语法"})," — 理解类、方法、继承"]}),e.jsxs("li",{children:["• ",e.jsx("a",{href:"/docs/01-java-core/java-oop",className:"text-accent hover:underline",children:"面向对象编程"})," — 理解继承与多态"]})]})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-parchment/50 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-[14px] sm:text-[15px] text-ink mb-2",children:"🚀 延伸学习"}),e.jsxs("ul",{className:"space-y-1 text-[13px] sm:text-[14px] text-ink-muted",children:[e.jsxs("li",{children:["• ",e.jsx("a",{href:"/docs/01-java-core/io-stream",className:"text-accent hover:underline",children:"IO 流"})," — 异常在资源管理中的应用"]}),e.jsxs("li",{children:["• ",e.jsx("a",{href:"/docs/01-java-core/concurrency",className:"text-accent hover:underline",children:"并发编程"})," — 多线程环境下的异常处理"]}),e.jsxs("li",{children:["• ",e.jsx("a",{href:"/docs/01-java-core/jvm-memory",className:"text-accent hover:underline",children:"JVM 内存模型"})," — 理解 OutOfMemoryError"]})]})]})]})]}),e.jsx(i,{...a(r.category,r.id)})]})}),e.jsx(c,{items:d})]})}export{g as default};
