import KnowledgeLayout from '../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../components/knowledge/Playground'
import SideNote from '../../../components/knowledge/SideNote'
import SmartTOC from '../../../components/knowledge/SmartTOC'
import Callout from '../../../components/ui/Callout'
import DiagramBlock from '../../../components/ui/DiagramBlock'
import InterviewSection from '../../../components/ui/InterviewSection'
import ArticleNav from '../../../components/article/ArticleNav'
import { getArticleNav } from '../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'serializable-interface', text: '一、Serializable 接口', level: 2 },
  { id: 'externalizable-interface', text: '二、Externalizable 接口', level: 2 },
  { id: 'serialversionuid', text: '三、serialVersionUID', level: 2 },
  { id: 'transient-keyword', text: '四、transient 关键字', level: 2 },
  { id: 'custom-serialization', text: '五、自定义序列化', level: 2 },
  { id: 'security-concerns', text: '六、序列化安全', level: 2 },
  { id: 'json-serialization', text: '七、JSON 序列化对比', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function Serialization({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Java 序列化是将对象状态转换为字节流以便存储或传输的过程，反序列化则是将字节流恢复为对象的过程，
              通过 Serializable 接口实现对象的持久化和网络传输。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要序列化？">
            在分布式系统、缓存存储、会话管理等场景中，需要将内存中的对象转换为可存储或可传输的格式。Java 原生序列化提供了一种标准化的方式来实现这一目标。
          </Callout>

          <h2 id="serializable-interface" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Serializable 接口
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Serializable 是一个标记接口（Marker Interface），没有任何方法声明。实现该接口的类表示其对象可以被序列化。
          </p>

          <Playground
            code={`import java.io.*;

public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String name;
    private int age;
    private transient String password; // 不会被序列化
    
    public User(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password;
    }
    
    @Override
    public String toString() {
        return "User{name='" + name + "', age=" + age + ", password='" + password + "'}";
    }
}

// 序列化示例
public class SerializationDemo {
    public static void main(String[] args) throws Exception {
        User user = new User("张三", 25, "secret123");
        
        // 序列化到文件
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("user.ser"))) {
            oos.writeObject(user);
            System.out.println("对象已序列化");
        }
        
        // 反序列化
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("user.ser"))) {
            User deserializedUser = (User) ois.readObject();
            System.out.println("反序列化结果: " + deserializedUser);
            // 输出: User{name='张三', age=25, password='null'}
        }
    }
}`}
            language="java"
            highlights={[4, 9, 27, 35]}
            filename="SerializationDemo.java"
            description="基本的序列化和反序列化操作"
          />

          <SideNote label="标记接口">
            Serializable 是典型的标记接口，仅用于标识类具有某种特性。类似的还有 Cloneable、RandomAccess 等。JVM 在运行时检查对象是否实现了该接口来决定是否允许序列化操作。
          </SideNote>

          <h2 id="externalizable-interface" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Externalizable 接口
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Externalizable 接口提供了更细粒度的控制，要求实现 writeExternal() 和 readExternal() 方法来自定义序列化逻辑。
          </p>

          <Playground
            code={`import java.io.*;

public class Employee implements Externalizable {
    private String name;
    private int age;
    private double salary;
    
    // 必须有无参构造函数
    public Employee() {}
    
    public Employee(String name, int age, double salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    
    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        // 只序列化需要的字段
        out.writeUTF(name);
        out.writeInt(age);
        // 故意不序列化 salary，演示选择性序列化
        System.out.println("写入: name=" + name + ", age=" + age);
    }
    
    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        // 按写入顺序读取
        this.name = in.readUTF();
        this.age = in.readInt();
        this.salary = 0.0; // 默认值
        System.out.println("读取: name=" + name + ", age=" + age);
    }
    
    @Override
    public String toString() {
        return "Employee{name='" + name + "', age=" + age + ", salary=" + salary + "}";
    }
}

// 测试代码
public class ExternalizableDemo {
    public static void main(String[] args) throws Exception {
        Employee emp = new Employee("李四", 30, 15000.0);
        
        // 序列化
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("employee.ser"))) {
            oos.writeObject(emp);
        }
        
        // 反序列化
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("employee.ser"))) {
            Employee deserializedEmp = (Employee) ois.readObject();
            System.out.println("结果: " + deserializedEmp);
            // 输出: Employee{name='李四', age=30, salary=0.0}
        }
    }
}`}
            language="java"
            highlights={[9, 18, 28, 37]}
            filename="ExternalizableDemo.java"
            description="使用 Externalizable 实现自定义序列化"
          />

          <DiagramBlock title="Serializable vs Externalizable 对比">
            | 特性 | Serializable | Externalizable |
            |------|-------------|----------------|
            | 接口类型 | 标记接口 | 功能性接口 |
            | 方法实现 | 无需实现 | 必须实现 writeExternal/readExternal |
            | 控制粒度 | 自动序列化所有非 transient 字段 | 完全手动控制 |
            | 性能 | 较慢（反射机制） | 较快（直接操作） |
            | 构造函数 | 不需要无参构造 | 必须有无参构造 |
            | 灵活性 | 低 | 高 |
          </DiagramBlock>

          <h2 id="serialversionuid" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、serialVersionUID
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            serialVersionUID 是序列化版本号，用于验证序列化和反序列化过程中类的兼容性。如果版本不匹配，会抛出 InvalidClassException。
          </p>

          <Playground
            code={`import java.io.*;

// 版本 1
public class ProductV1 implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String name;
    private double price;
    
    public ProductV1(String name, double price) {
        this.name = name;
        this.price = price;
    }
}

// 版本 2（添加了新字段）
public class ProductV2 implements Serializable {
    private static final long serialVersionUID = 2L; // 版本号改变
    
    private String name;
    private double price;
    private String category; // 新增字段
    
    public ProductV2(String name, double price, String category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

// 测试版本兼容性
public class VersionTest {
    public static void main(String[] args) throws Exception {
        // 用 V1 序列化
        ProductV1 v1 = new ProductV1("手机", 2999.0);
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("product.ser"))) {
            oos.writeObject(v1);
        }
        
        // 尝试用 V2 反序列化（会失败，因为 serialVersionUID 不同）
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("product.ser"))) {
            ProductV2 v2 = (ProductV2) ois.readObject();
            System.out.println("成功: " + v2);
        } catch (InvalidClassException e) {
            System.out.println("版本不兼容: " + e.getMessage());
            // 输出: local class incompatible: stream classdesc serialVersionUID = 1, 
            //       local class serialVersionUID = 2
        }
    }
}`}
            language="java"
            highlights={[5, 18, 37]}
            filename="SerialVersionUIDDemo.java"
            description="serialVersionUID 版本控制示例"
          />

          <Callout type="warning" title="最佳实践">
            始终显式声明 serialVersionUID，避免依赖 JVM 自动生成的版本 ID。当类结构发生不兼容变更时（如删除字段、改变字段类型），应手动更新版本号。
          </Callout>

          <h2 id="transient-keyword" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、transient 关键字
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            transient 关键字用于标记不需要序列化的字段。被标记的字段在序列化过程中会被忽略，反序列化后值为默认值（null、0、false 等）。
          </p>

          <Playground
            code={`import java.io.*;

public class Account implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String accountNumber;
    private String ownerName;
    private transient String password; // 敏感信息不序列化
    private transient double balance;  // 临时数据不序列化
    
    public Account(String accountNumber, String ownerName, 
                   String password, double balance) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.password = password;
        this.balance = balance;
    }
    
    @Override
    public String toString() {
        return "Account{number='" + accountNumber + 
               "', owner='" + ownerName + 
               "', password='" + password + 
               "', balance=" + balance + "}";
    }
}

// 测试 transient 效果
public class TransientDemo {
    public static void main(String[] args) throws Exception {
        Account account = new Account("123456789", "王五", "pwd123", 10000.0);
        System.out.println("序列化前: " + account);
        // 输出: Account{number='123456789', owner='王五', password='pwd123', balance=10000.0}
        
        // 序列化
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("account.ser"))) {
            oos.writeObject(account);
        }
        
        // 反序列化
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("account.ser"))) {
            Account deserializedAccount = (Account) ois.readObject();
            System.out.println("反序列化后: " + deserializedAccount);
            // 输出: Account{number='123456789', owner='王五', password='null', balance=0.0}
        }
    }
}`}
            language="java"
            highlights={[8, 9, 42]}
            filename="TransientDemo.java"
            description="transient 关键字的使用效果"
          />

          <SideNote label="适用场景">
            transient 常用于保护敏感信息（密码、密钥）、避免序列化临时计算结果、排除大型对象（如缓存、连接池）等场景。
          </SideNote>

          <h2 id="custom-serialization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、自定义序列化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            即使实现了 Serializable 接口，也可以通过 writeObject() 和 readObject() 方法来自定义序列化行为，例如加密敏感字段或处理复杂对象关系。
          </p>

          <Playground
            code={`import java.io.*;

public class SecureUser implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String username;
    private String encryptedPassword; // 存储加密后的密码
    
    public SecureUser(String username, String password) {
        this.username = username;
        this.encryptedPassword = encrypt(password); // 构造时加密
    }
    
    // 简单的加密示例（实际应使用更强的加密算法）
    private static String encrypt(String password) {
        return new StringBuilder(password).reverse().toString();
    }
    
    private static String decrypt(String encrypted) {
        return new StringBuilder(encrypted).reverse().toString();
    }
    
    // 自定义序列化：进一步加密
    private void writeObject(ObjectOutputStream oos) throws IOException {
        oos.defaultWriteObject(); // 先执行默认序列化
        // 对密码进行二次加密
        String doubleEncrypted = encrypt(encryptedPassword);
        oos.writeUTF(doubleEncrypted);
    }
    
    // 自定义反序列化：解密
    private void readObject(ObjectInputStream ois) 
            throws IOException, ClassNotFoundException {
        ois.defaultReadObject(); // 先执行默认反序列化
        // 解密二次加密的密码
        String doubleEncrypted = ois.readUTF();
        this.encryptedPassword = decrypt(doubleEncrypted);
    }
    
    public String getPassword() {
        return decrypt(encryptedPassword);
    }
    
    @Override
    public String toString() {
        return "SecureUser{username='" + username + 
               "', password='" + getPassword() + "'}";
    }
}

// 测试自定义序列化
public class CustomSerializationDemo {
    public static void main(String[] args) throws Exception {
        SecureUser user = new SecureUser("admin", "secret");
        System.out.println("原始: " + user);
        
        // 序列化
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("secure_user.ser"))) {
            oos.writeObject(user);
        }
        
        // 反序列化
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("secure_user.ser"))) {
            SecureUser deserializedUser = (SecureUser) ois.readObject();
            System.out.println("恢复: " + deserializedUser);
        }
    }
}`}
            language="java"
            highlights={[24, 33, 47]}
            filename="CustomSerializationDemo.java"
            description="自定义序列化逻辑示例"
          />

          <h2 id="security-concerns" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、序列化安全
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 原生序列化存在严重的安全风险，包括反序列化漏洞、恶意代码执行等。在生产环境中应谨慎使用，并采取适当的安全措施。
          </p>

          <Callout type="danger" title="反序列化漏洞风险">
            攻击者可以构造恶意的序列化数据，在反序列化过程中执行任意代码。著名的 Apache Commons Collections 反序列化漏洞就曾导致多个系统被入侵。
          </Callout>

          <Playground
            code={`import java.io.*;

// 安全的反序列化工具类
public class SafeDeserialization {
    
    // 白名单类加载器
    private static class WhiteListClassLoader extends ClassLoader {
        private final String[] allowedClasses;
        
        public WhiteListClassLoader(String[] allowedClasses) {
            this.allowedClasses = allowedClasses;
        }
        
        @Override
        protected Class<?> loadClass(String name, boolean resolve) 
                throws ClassNotFoundException {
            // 检查是否在白名单中
            for (String allowed : allowedClasses) {
                if (name.equals(allowed)) {
                    return super.loadClass(name, resolve);
                }
            }
            throw new SecurityException("不允许反序列化的类: " + name);
        }
    }
    
    // 安全的反序列化方法
    public static Object safeDeserialize(byte[] data, String[] allowedClasses) 
            throws IOException, ClassNotFoundException {
        try (ByteArrayInputStream bais = new ByteArrayInputStream(data);
             ObjectInputStream ois = new ObjectInputStream(bais) {
                 @Override
                 protected Class<?> resolveClass(ObjectStreamClass desc) 
                         throws IOException, ClassNotFoundException {
                     // 使用白名单验证
                     for (String allowed : allowedClasses) {
                         if (desc.getName().equals(allowed)) {
                             return super.resolveClass(desc);
                         }
                     }
                     throw new SecurityException("非法类: " + desc.getName());
                 }
             }) {
            return ois.readObject();
        }
    }
    
    // 测试
    public static void main(String[] args) throws Exception {
        // 正常对象
        String testStr = "Hello, World!";
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(baos)) {
            oos.writeObject(testStr);
        }
        
        // 安全反序列化
        String[] whitelist = {"java.lang.String"};
        Object result = safeDeserialize(baos.toByteArray(), whitelist);
        System.out.println("安全反序列化: " + result);
        
        // 尝试反序列化非法类（会抛出异常）
        // Object malicious = safeDeserialize(maliciousData, whitelist);
    }
}`}
            language="java"
            highlights={[15, 32, 47]}
            filename="SafeDeserialization.java"
            description="安全的反序列化实现"
          />

          <SideNote label="替代方案">
            对于现代应用，建议使用 JSON（Jackson、Gson）、Protocol Buffers、Avro 等更安全的序列化方案，它们不支持任意对象反序列化，从根本上避免了安全问题。
          </SideNote>

          <h2 id="json-serialization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、JSON 序列化对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            在现代开发中，JSON 序列化因其跨语言兼容性、可读性和安全性而成为主流选择。以下是 Java 原生序列化与 JSON 序列化的对比。
          </p>

          <DiagramBlock title="序列化方案对比">
            | 特性 | Java 原生序列化 | JSON (Jackson) | Protocol Buffers |
            |------|----------------|----------------|------------------|
            | 跨语言 | ❌ 仅 Java | ✅ 通用 | ✅ 通用 |
            | 可读性 | ❌ 二进制 | ✅ 文本 | ❌ 二进制 |
            | 性能 | ⚠️ 中等 | ⚠️ 中等 | ✅ 优秀 |
            | 大小 | ⚠️ 较大 | ⚠️ 较大 | ✅ 紧凑 |
            | 安全性 | ❌ 高风险 | ✅ 低风险 | ✅ 低风险 |
            | 版本兼容 | ⚠️ 困难 | ✅ 灵活 | ✅ 优秀 |
            | 生态支持 | ✅ Java 内置 | ✅ 广泛 | ✅ Google 支持 |
          </DiagramBlock>

          <Playground
            code={`import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.Serializable;

public class JsonSerializationDemo {
    
    public static class Person implements Serializable {
        private String name;
        private int age;
        private String email;
        
        // getter/setter 省略
        
        public Person() {} // Jackson 需要无参构造
        
        public Person(String name, int age, String email) {
            this.name = name;
            this.age = age;
            this.email = email;
        }
    }
    
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        
        Person person = new Person("张三", 25, "zhangsan@example.com");
        
        // JSON 序列化
        String json = mapper.writeValueAsString(person);
        System.out.println("JSON: " + json);
        // 输出: {"name":"张三","age":25,"email":"zhangsan@example.com"}
        
        // JSON 反序列化
        Person deserializedPerson = mapper.readValue(json, Person.class);
        System.out.println("对象: " + deserializedPerson.getName());
        
        // 优势：人类可读、跨语言、安全
    }
}`}
            language="java"
            highlights={[25, 29]}
            filename="JsonSerializationDemo.java"
            description="使用 Jackson 进行 JSON 序列化"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区 1：所有对象都能被序列化">
            只有实现了 Serializable 接口的类才能被序列化。如果对象图中包含未实现该接口的引用，会抛出 NotSerializableException。此外，静态字段和 transient 字段不会被序列化。
          </Callout>

          <Callout type="danger" title="误区 2：serialVersionUID 可以随意更改">
            serialVersionUID 用于版本控制，随意更改会导致旧版本的序列化数据无法被新版本反序列化。只有在确实需要打破兼容性时才应修改版本号。
          </Callout>

          <Callout type="danger" title="误区 3：序列化是线程安全的">
            ObjectOutputStream 和 ObjectInputStream 不是线程安全的。在多线程环境中使用时需要适当的同步机制，或者为每个线程创建独立的流实例。
          </Callout>

          <Callout type="warning" title="误区 4：序列化性能很好">
            Java 原生序列化使用反射机制，性能相对较差。对于高性能场景，应考虑使用 Kryo、Protobuf 或其他专门的序列化框架。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Serializable 和 Externalizable 有什么区别？",
              answer: "Serializable 是标记接口，由 JVM 自动处理序列化过程；Externalizable 需要手动实现 writeExternal 和 readExternal 方法，提供更细粒度的控制。Externalizable 性能更好但复杂度更高，适合需要优化序列化性能的场景。"
            },
            {
              question: "什么是 serialVersionUID？为什么需要它？",
              answer: "serialVersionUID 是序列化版本号，用于验证类和序列化数据的兼容性。如果反序列化时版本号不匹配，会抛出 InvalidClassException。显式声明可以避免因编译器自动生成不同 ID 导致的兼容性问题。"
            },
            {
              question: "transient 关键字的作用是什么？",
              answer: "transient 修饰的字段不会被序列化。常用于保护敏感信息（如密码）、排除临时数据或大型对象。反序列化后，transient 字段的值为默认值（null、0、false 等）。"
            },
            {
              question: "如何保证序列化的安全性？",
              answer: "1) 使用白名单机制限制可反序列化的类；2) 重写 readObject 方法进行输入验证；3) 使用 SecurityManager 限制危险操作；4) 优先考虑使用 JSON 等更安全的序列化方案；5) 避免反序列化来自不可信来源的数据。"
            },
            {
              question: "Java 序列化有哪些性能问题？如何优化？",
              answer: "性能问题包括：反射开销大、序列化数据体积大、GC 压力高。优化方案：1) 使用 Externalizable 替代 Serializable；2) 采用高效的序列化框架如 Kryo、Protobuf；3) 减少不必要的字段序列化；4) 使用压缩技术；5) 缓存序列化结果。"
            },
            {
              question: "单例模式在序列化后会破坏单例吗？如何解决？",
              answer: "是的，默认情况下反序列化会创建新实例，破坏单例。解决方案：1) 实现 readResolve() 方法返回单例实例；2) 使用枚举实现单例（天然支持序列化）；3) 在 readObject 中检查并返回已有实例。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-paper-md bg-surface border border-border-light hover:border-accent transition-colors">
              <h3 className="font-semibold text-ink mb-2">前置知识</h3>
              <ul className="space-y-1 text-sm text-ink-muted">
                <li><a href="/docs/01-java-core/java-basics" className="text-accent hover:underline">Java 基础语法</a></li>
                <li><a href="/docs/01-java-core/io-stream" className="text-accent hover:underline">IO 流系统</a></li>
              </ul>
            </div>
            <div className="p-4 rounded-paper-md bg-surface border border-border-light hover:border-accent transition-colors">
              <h3 className="font-semibold text-ink mb-2">延伸学习</h3>
              <ul className="space-y-1 text-sm text-ink-muted">
                <li><a href="/docs/12-java-security/owasp-security" className="text-accent hover:underline">OWASP 安全漏洞</a></li>
                <li><a href="/docs/08-microservices/message-queue" className="text-accent hover:underline">消息队列</a></li>
              </ul>
            </div>
          </div>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      {/* SmartTOC 直接渲染，不用 aside 包裹 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
