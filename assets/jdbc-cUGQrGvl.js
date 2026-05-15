import{j as t,g as a}from"./index-hyqxTCwJ.js";import{K as i}from"./KnowledgeLayout-CwkOMHwC.js";import{P as e}from"./Playground-C6lk-t6G.js";import{S as r}from"./SideNote-BKvanovA.js";import{C as n,A as m,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as o}from"./DiagramBlock-CLaKE9_7.js";import{I as c}from"./InterviewSection-BBNdwyyN.js";import{C as d}from"./ContextSwitcher-Cjd-h5IL.js";const x=[{id:"definition",text:"一句话定义",level:2},{id:"architecture",text:"整体架构",level:2},{id:"drivermanager",text:"二、DriverManager详解",level:2},{id:"connection",text:"三、Connection连接管理",level:2},{id:"statement",text:"四、Statement执行机制",level:2},{id:"preparedstatement",text:"五、PreparedStatement优化",level:2},{id:"resultset",text:"六、ResultSet结果集",level:2},{id:"transaction",text:"七、事务处理机制",level:2},{id:"misconceptions",text:"八、常见误区",level:2},{id:"interview",text:"九、面试真题",level:2},{id:"related",text:"十、知识关联",level:2}];function y({meta:s}){return t.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[t.jsx("div",{className:"flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20",children:t.jsxs(i,{meta:s,children:[t.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"一句话定义"}),t.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:t.jsx("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:"JDBC（Java Database Connectivity）是Java平台提供的标准API，它定义了一套访问数据库的统一接口，允许Java程序与各种数据库进行通信，而无需关心底层数据库的具体实现细节。"})}),t.jsx(n,{type:"info",title:"JDBC的作用",children:"JDBC是Java应用程序与数据库之间的桥梁，它屏蔽了不同数据库厂商实现的差异，为开发者提供了统一的数据库访问接口。"}),t.jsx("h2",{id:"architecture",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"整体架构"}),t.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"JDBC架构包含四个核心组件，形成了应用程序与数据库之间的抽象层："}),t.jsx(o,{title:"JDBC架构图",children:`graph LR
              APP["Java App<br/>DriverManager<br/>Statement<br/>ResultSet"] --> API["JDBC API<br/>Connection<br/>PreparedStatement<br/>CallableStatement<br/>SQLException"]
              API --> DRIVER["Driver<br/>Oracle JDBC<br/>MySQL JDBC<br/>PostgreSQL"]
              DRIVER --> DB["Database<br/>Oracle<br/>MySQL<br/>PostgreSQL"]
            `}),t.jsx("h2",{id:"drivermanager",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"二、DriverManager详解"}),t.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"DriverManager是JDBC的核心类，负责管理一组数据库驱动程序。它通过遍历已注册的驱动程序，尝试建立与指定URL的连接。"}),t.jsx(e,{code:`import java.sql.*;

public class JDBCDriverManagerExample {
    public static void main(String[] args) {
        // 注册驱动（JDBC 4.0+会自动注册）
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // 建立连接
            String url = "jdbc:mysql://localhost:3306/test";
            String username = "root";
            String password = "password";
            
            Connection conn = DriverManager.getConnection(url, username, password);
            System.out.println("数据库连接成功: " + conn);
            
            // 关闭连接
            conn.close();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
}`,language:"java",highlights:[5,8,9,10,12,17],filename:"JDBCDriverManagerExample.java",description:"DriverManager基本使用示例"}),t.jsx(r,{label:"驱动自动加载",children:"从JDBC 4.0开始，驱动程序会在类路径中自动注册，无需显式调用Class.forName()，但仍建议保留以确保兼容性。"}),t.jsx("h2",{id:"connection",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"三、Connection连接管理"}),t.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Connection代表与特定数据库的会话，提供创建Statement、PreparedStatement、CallableStatement和DatabaseMetaData的方法。"}),t.jsx(e,{code:`import java.sql.*;

public class ConnectionManagement {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/test";
        String username = "root";
        String password = "password";
        
        try (Connection conn = DriverManager.getConnection(url, username, password)) {
            // 设置事务隔离级别
            conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
            
            // 检查连接状态
            if (conn.isValid(5)) {
                System.out.println("连接有效");
                
                // 获取数据库元数据
                DatabaseMetaData metaData = conn.getMetaData();
                System.out.println("数据库产品: " + metaData.getDatabaseProductName());
                System.out.println("数据库版本: " + metaData.getDatabaseProductVersion());
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}`,language:"java",highlights:[10,12,15,17,18,19],filename:"ConnectionManagement.java",description:"Connection管理示例"}),t.jsx("h2",{id:"statement",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"四、Statement执行机制"}),t.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Statement用于执行静态SQL语句并返回结果。每次执行都会发送完整的SQL语句到数据库。"}),t.jsx(e,{code:`import java.sql.*;

public class StatementExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/test";
        String username = "root";
        String password = "password";
        
        try (Connection conn = DriverManager.getConnection(url, username, password)) {
            Statement stmt = conn.createStatement();
            
            // 执行查询
            String sql = "SELECT id, name FROM users WHERE age > 18";
            ResultSet rs = stmt.executeQuery(sql);
            
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                System.out.println("ID: " + id + ", Name: " + name);
            }
            
            // 执行更新
            String updateSql = "UPDATE users SET age = 25 WHERE id = 1";
            int rowsAffected = stmt.executeUpdate(updateSql);
            System.out.println("更新了 " + rowsAffected + " 行");
            
            rs.close();
            stmt.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}`,language:"java",highlights:[10,13,15,16,18,22,23,24,25,28],filename:"StatementExample.java",description:"Statement基本操作示例"}),t.jsx("h2",{id:"preparedstatement",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"五、PreparedStatement优化"}),t.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"PreparedStatement预编译SQL语句，防止SQL注入，提高执行效率（特别是重复执行相同SQL时）。"}),t.jsx(e,{code:`import java.sql.*;

public class PreparedStatementExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/test";
        String username = "root";
        String password = "password";
        
        try (Connection conn = DriverManager.getConnection(url, username, password)) {
            // 预编译SQL
            String sql = "SELECT * FROM users WHERE age > ? AND city = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            
            // 设置参数
            pstmt.setInt(1, 18);      // 第一个问号
            pstmt.setString(2, "Beijing");  // 第二个问号
            
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id") + 
                                 ", Name: " + rs.getString("name"));
            }
            
            // 批量插入
            String insertSql = "INSERT INTO users(name, age, city) VALUES(?, ?, ?)";
            PreparedStatement insertStmt = conn.prepareStatement(insertSql);
            
            for (int i = 0; i < 3; i++) {
                insertStmt.setString(1, "User" + i);
                insertStmt.setInt(2, 20 + i);
                insertStmt.setString(3, "City" + i);
                insertStmt.addBatch();  // 添加到批处理
            }
            
            int[] results = insertStmt.executeBatch();  // 执行批处理
            System.out.println("批量插入影响行数: " + results.length);
            
            rs.close();
            pstmt.close();
            insertStmt.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}`,language:"java",highlights:[10,11,14,15,16,18,22,26,27,28,29,30],filename:"PreparedStatementExample.java",description:"PreparedStatement使用示例"}),t.jsx("h2",{id:"resultset",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"六、ResultSet结果集"}),t.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"ResultSet表示执行查询语句的结果表，提供了遍历和访问数据的方法。"}),t.jsx(d,{simpleContent:t.jsxs("div",{children:[t.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"默认的ResultSet类型，只能向前移动游标。"}),t.jsx(e,{code:`// Forward-Only ResultSet (默认)
Statement stmt = conn.createStatement(
    ResultSet.TYPE_FORWARD_ONLY,  // 只能向前移动
    ResultSet.CONCUR_READ_ONLY    // 只读
);

ResultSet rs = stmt.executeQuery("SELECT * FROM users");

while (rs.next()) {  // 只能向前移动
    System.out.println(rs.getString("name"));
}
// rs.previous();  // 错误！不允许向后移动`,language:"java",highlights:[1,2,3,7,8,9,10,12],filename:"ForwardOnlyResultSet.java",description:"Forward-Only ResultSet示例"})]}),hardcoreContent:t.jsxs("div",{children:[t.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"可滚动且对数据库变化敏感的ResultSet。"}),t.jsx(e,{code:`// Scroll-Sensitive ResultSet
Statement stmt = conn.createStatement(
    ResultSet.TYPE_SCROLL_SENSITIVE,  // 可滚动
    ResultSet.CONCUR_READ_ONLY        // 只读
);

ResultSet rs = stmt.executeQuery("SELECT * FROM users");

// 可以在结果集中自由移动
rs.last();                    // 移到最后一条记录
System.out.println("总记录数: " + rs.getRow());

rs.first();                   // 移到第一条记录
rs.absolute(3);               // 移到第3条记录
rs.relative(-1);              // 相对于当前位置向前移动1条`,language:"java",highlights:[1,2,3,4,8,10,11,12,13],filename:"ScrollSensitiveResultSet.java",description:"Scroll-Sensitive ResultSet示例"})]})}),t.jsx("h2",{id:"transaction",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"七、事务处理机制"}),t.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"JDBC支持事务处理，通过设置autoCommit属性和使用commit/rollback方法来管理事务边界。"}),t.jsx(e,{code:`import java.sql.*;

public class TransactionExample {
    public static void transferMoney(Connection conn, int fromAccount, int toAccount, double amount) throws SQLException {
        // 关闭自动提交以开启事务
        boolean originalAutoCommit = conn.getAutoCommit();
        conn.setAutoCommit(false);
        
        try {
            // 从源账户扣款
            PreparedStatement debitStmt = conn.prepareStatement(
                "UPDATE accounts SET balance = balance - ? WHERE id = ?");
            debitStmt.setDouble(1, amount);
            debitStmt.setInt(2, fromAccount);
            debitStmt.executeUpdate();
            
            // 向目标账户存款
            PreparedStatement creditStmt = conn.prepareStatement(
                "UPDATE accounts SET balance = balance + ? WHERE id = ?");
            creditStmt.setDouble(1, amount);
            creditStmt.setInt(2, toAccount);
            creditStmt.executeUpdate();
            
            // 验证余额（防止负数）
            PreparedStatement checkStmt = conn.prepareStatement(
                "SELECT balance FROM accounts WHERE id = ?");
            checkStmt.setInt(1, fromAccount);
            ResultSet rs = checkStmt.executeQuery();
            
            if (rs.next() && rs.getDouble("balance") < 0) {
                throw new SQLException("转账后余额不足");
            }
            
            // 提交事务
            conn.commit();
            System.out.println("转账成功");
            
        } catch (SQLException e) {
            // 回滚事务
            conn.rollback();
            System.out.println("转账失败，已回滚: " + e.getMessage());
            throw e;
        } finally {
            // 恢复原始自动提交设置
            conn.setAutoCommit(originalAutoCommit);
        }
    }
}`,language:"java",highlights:[6,10,15,20,24,31,34,38,40],filename:"TransactionExample.java",description:"JDBC事务处理示例"}),t.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"八、常见误区"}),t.jsxs("div",{className:"space-y-4",children:[t.jsxs(n,{type:"danger",title:"误区1：JDBC连接线程安全",children:[t.jsx("strong",{children:"JDBC连接不是线程安全的："}),"Connection对象不能在多个线程间共享，每个线程应使用自己的连接或从连接池获取连接。"]}),t.jsxs(n,{type:"danger",title:"误区2：Statement资源泄露",children:[t.jsx("strong",{children:"Statement资源泄露："}),"忘记关闭Statement和ResultSet会导致数据库资源泄露，应始终在finally块或try-with-resources中关闭。"]}),t.jsxs(n,{type:"danger",title:"误区3：SQL注入风险",children:[t.jsx("strong",{children:"SQL注入风险："}),"使用Statement而非PreparedStatement拼接SQL字符串容易导致SQL注入攻击。"]}),t.jsxs(n,{type:"danger",title:"误区4：事务边界混乱",children:[t.jsx("strong",{children:"事务边界混乱："}),"在事务中混合使用自动提交和手动提交可能导致数据不一致。"]})]}),t.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"九、面试真题"}),t.jsx(c,{questions:[{question:"JDBC中Statement、PreparedStatement和CallableStatement的区别是什么？",answer:"Statement用于执行静态SQL；PreparedStatement预编译SQL，防SQL注入，支持参数化查询；CallableStatement用于调用存储过程。PreparedStatement性能更好，安全性更高。"},{question:"如何防止JDBC中的SQL注入？",answer:"使用PreparedStatement代替Statement，因为PreparedStatement会对参数进行预处理和转义，防止恶意SQL代码注入。"},{question:"JDBC事务的ACID特性是如何保证的？",answer:"通过conn.setAutoCommit(false)开启事务，conn.commit()提交，conn.rollback()回滚来保证原子性；数据库引擎确保一致性；隔离级别控制并发访问；持久化保证一旦提交就永久保存。"},{question:"JDBC连接池的作用是什么？",answer:"连接池预先创建并维护一定数量的数据库连接，避免频繁创建和销毁连接的开销，提高应用性能和响应速度。"},{question:"ResultSet的类型有哪些，分别适用于什么场景？",answer:"TYPE_FORWARD_ONLY（默认）：只能向前遍历，内存占用小；TYPE_SCROLL_INSENSITIVE：可滚动但看不到其他事务的修改；TYPE_SCROLL_SENSITIVE：可滚动且能看到其他事务的修改。"}]}),t.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"十、知识关联"}),t.jsxs("div",{className:"bg-ink-soft/20 border border-border-light rounded-paper-md p-5 my-5",children:[t.jsx("h3",{className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"相关知识点"}),t.jsxs("ul",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2",children:[t.jsxs("li",{children:["• ",t.jsx("strong",{children:"数据库连接池"}),"：JDBC连接池（如HikariCP、Druid）优化连接管理"]}),t.jsxs("li",{children:["• ",t.jsx("strong",{children:"Hibernate ORM"}),"：基于JDBC的高级对象关系映射框架"]}),t.jsxs("li",{children:["• ",t.jsx("strong",{children:"Spring JDBC"}),"：Spring框架对JDBC的封装，简化开发"]}),t.jsxs("li",{children:["• ",t.jsx("strong",{children:"事务管理"}),"：Spring事务管理与JDBC原生事务的集成"]})]})]}),t.jsx(m,{...a(s.category,s.id)})]})}),t.jsx(l,{items:x})]})}export{y as default};
