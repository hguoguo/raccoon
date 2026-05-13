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
  { id: 'overview', text: '一、整体架构', level: 2 },
  { id: 'creation', text: '二、创建 Optional', level: 2 },
  { id: 'unwrap', text: '三、解包操作', level: 2 },
  { id: 'transform', text: '四、转换操作', level: 2 },
  { id: 'filter', text: '五、过滤与条件', level: 2 },
  { id: 'chaining', text: '六、链式调用', level: 2 },
  { id: 'best-practices', text: '七、最佳实践', level: 2 },
  { id: 'common-apis', text: '八、常用 API', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'comparison', text: '十一、对比分析', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function Optional({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Optional 是 Java 8 引入的<strong className="text-accent">容器类</strong>，用于优雅地表示可能为空的值，避免 NullPointerException，并通过函数式 API 简化空值处理逻辑。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 Optional？">
            传统空值检查需要使用 if (obj != null) 判断，代码冗长且容易遗漏。Optional 通过类型系统强制开发者显式处理空值情况，结合 map、flatMap、orElse 等方法，让空值处理更加简洁和安全。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、整体架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Optional 是一个泛型容器类，内部持有一个可能为 null 的值。它提供了丰富的方法来安全地访问、转换和处理这个值，而无需显式的 null 检查。
          </p>

          <DiagramBlock title="Optional 核心概念">
            {`┌─────────────────────────────────────┐
│         Optional<T> 容器           │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────┐    ┌──────────────┐  │
│  │ 有值     │    │ 空值         │  │
│  │ present  │    │ empty        │  │
│  │          │    │              │  │
│  │ value=T  │    │ value=null   │  │
│  └──────────┘    └──────────────┘  │
│       │                  │          │
│       ▼                  ▼          │
│  ┌──────────────────────────────┐  │
│  │   安全访问方法                │  │
│  │  - orElse / orElseGet        │  │
│  │  - orElseThrow              │  │
│  │  - ifPresent                 │  │
│  │  - map / flatMap             │  │
│  │  - filter                    │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘`}
          </DiagramBlock>

          <SideNote>
            Optional 不是用来替代所有 null 检查的工具，而是作为返回值类型，明确告知调用者该方法可能返回空值。不应将 Optional 用作字段类型或方法参数。
          </SideNote>

          <h2 id="creation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、创建 Optional
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Optional 提供了三种静态工厂方法来创建实例，分别适用于不同的场景。
          </p>

          <Playground
            code={`import java.util.Optional;

// 1. Optional.of() - 创建非空 Optional（值为 null 时抛 NPE）
String name = "Alice";
Optional<String> opt1 = Optional.of(name);
System.out.println(opt1.get()); // 输出: Alice

// Optional.of(null) 会抛出 NullPointerException！
// Optional<String> bad = Optional.of(null); // NPE!

// 2. Optional.ofNullable() - 创建可能为空的 Optional
String nullableName = null;
Optional<String> opt2 = Optional.ofNullable(nullableName);
System.out.println(opt2.isPresent()); // 输出: false

// 3. Optional.empty() - 创建空的 Optional
Optional<String> opt3 = Optional.empty();
System.out.println(opt3.isEmpty()); // 输出: true (Java 11+)

// 实际应用场景
public Optional<String> findUserById(Long id) {
    User user = database.findById(id);
    return Optional.ofNullable(user); // 推荐用法
}`}
            language="java"
            highlights={[5, 13, 18]}
            filename="CreatingOptional.java"
            description="创建 Optional 的三种方式"
          />

          <Callout type="warning" title="选择正确的创建方法">
            **of()**：仅在确定值不为 null 时使用，否则会在创建时抛出 NPE。<br/>
            **ofNullable()**：最常用，安全处理可能为 null 的值。<br/>
            **empty()**：用于明确表示无值的场景，如查询结果为空时。
          </Callout>

          <h2 id="unwrap" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、解包操作
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            解包是从 Optional 中提取实际值的操作。Optional 提供了多种安全的解包方式，避免直接调用 get() 导致的 NoSuchElementException。
          </p>

          <Playground
            code={`import java.util.Optional;

Optional<String> present = Optional.of("Hello");
Optional<String> empty = Optional.empty();

// 1. get() - 直接获取值（空时抛异常，不推荐单独使用）
// String value = empty.get(); // NoSuchElementException!

// 2. orElse() - 提供默认值
String result1 = empty.orElse("Default");
System.out.println(result1); // 输出: Default

String result2 = present.orElse("Default");
System.out.println(result2); // 输出: Hello

// 3. orElseGet() - 延迟计算默认值（性能更优）
String result3 = empty.orElseGet(() -> computeDefaultValue());
System.out.println(result3); // 输出: Computed Default

// 4. orElseThrow() - 空时抛出自定义异常
String result4 = empty.orElseThrow(() -> new IllegalStateException("Value not found"));
// 抛出: IllegalStateException: Value not found

// 5. ifPresent() - 值存在时执行操作
present.ifPresent(value -> System.out.println("Value: " + value));
// 输出: Value: Hello

// 6. ifPresentOrElse() - 值存在/不存在时分别执行（Java 9+）
empty.ifPresentOrElse(
    value -> System.out.println("Value: " + value),
    () -> System.out.println("No value")
);
// 输出: No value

private static String computeDefaultValue() {
    System.out.println("Computing..."); // 仅在实际需要时执行
    return "Computed Default";
}`}
            language="java"
            highlights={[10, 17, 21, 25, 29]}
            filename="UnwrappingOptional.java"
            description="安全解包 Optional"
          />

          <SideNote>
            orElseGet() 比 orElse() 性能更好，因为它的参数是 Supplier，只有在 Optional 为空时才会执行。如果默认值是复杂计算或方法调用，应优先使用 orElseGet()。
          </SideNote>

          <h2 id="transform" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、转换操作
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            map 和 flatMap 用于对 Optional 中的值进行转换，类似于 Stream API 的操作。它们会自动处理空值情况，无需显式检查。
          </p>

          <Playground
            code={`import java.util.Optional;

class Address {
    String city;
    Address(String city) { this.city = city; }
    String getCity() { return city; }
}

class User {
    String name;
    Address address;
    User(String name, Address address) {
        this.name = name;
        this.address = address;
    }
    Optional<Address> getAddress() { return Optional.ofNullable(address); }
}

// 模拟数据
User user = new User("Alice", new Address("Beijing"));
User userNoAddress = new User("Bob", null);

// 1. map() - 简单转换
Optional<String> cityName = Optional.ofNullable(user)
    .map(u -> u.getAddress())
    .flatMap(addr -> addr) // getAddress 返回 Optional<Address>
    .map(addr -> addr.getCity());
System.out.println(cityName.orElse("Unknown")); // 输出: Beijing

// 2. flatMap() - 扁平化嵌套 Optional
// 如果 getAddress() 返回 Optional<Address>，使用 flatMap 避免 Optional<Optional<Address>>
Optional<String> city2 = Optional.ofNullable(user)
    .flatMap(User::getAddress)
    .map(Address::getCity);
System.out.println(city2.orElse("Unknown")); // 输出: Beijing

// 3. 处理空值情况
Optional<String> city3 = Optional.ofNullable(userNoAddress)
    .flatMap(User::getAddress)
    .map(Address::getCity);
System.out.println(city3.orElse("No City")); // 输出: No City

// 4. 链式转换
Optional<Integer> length = Optional.of("Hello World")
    .map(String::toUpperCase)
    .map(s -> s.length());
System.out.println(length.orElse(0)); // 输出: 11`}
            language="java"
            highlights={[24, 32, 39, 45]}
            filename="TransformingOptional.java"
            description="使用 map 和 flatMap 转换"
          />

          <Callout type="info" title="map vs flatMap">
            **map()**：将函数应用于 Optional 中的值，返回新的 Optional。如果函数本身返回 Optional，会导致嵌套（Optional&lt;Optional&lt;T&gt;&gt;）。<br/>
            **flatMap()**：与 map 类似，但要求函数返回 Optional，并自动展平结果，避免嵌套。<br/>
            当方法返回 Optional 时（如 User.getAddress()），应使用 flatMap；否则使用 map。
          </Callout>

          <h2 id="filter" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、过滤与条件
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            filter 方法用于根据条件过滤 Optional 中的值。如果值不满足条件，返回空的 Optional。
          </p>

          <Playground
            code={`import java.util.Optional;

// 1. 基本过滤
Optional<String> name = Optional.of("Alice");
Optional<String> filtered = name.filter(n -> n.length() > 3);
System.out.println(filtered.orElse("Too short")); // 输出: Alice

Optional<String> shortName = Optional.of("Bo");
Optional<String> filtered2 = shortName.filter(n -> n.length() > 3);
System.out.println(filtered2.orElse("Too short")); // 输出: Too short

// 2. 组合过滤
Optional<Integer> age = Optional.of(25);
Optional<Integer> validAge = age
    .filter(a -> a >= 18)
    .filter(a -> a <= 120);
System.out.println(validAge.orElse(-1)); // 输出: 25

Optional<Integer> invalidAge = Optional.of(15);
Optional<Integer> validAge2 = invalidAge
    .filter(a -> a >= 18)
    .filter(a -> a <= 120);
System.out.println(validAge2.orElse(-1)); // 输出: -1

// 3. 实际应用场景
class Email {
    String address;
    boolean verified;
    Email(String address, boolean verified) {
        this.address = address;
        this.verified = verified;
    }
    String getAddress() { return address; }
    boolean isVerified() { return verified; }
}

Optional<Email> email = Optional.of(new Email("alice@example.com", true));
String validEmail = email
    .filter(e -> e.isVerified())
    .map(Email::getAddress)
    .filter(addr -> addr.endsWith("@example.com"))
    .orElse("Invalid Email");
System.out.println(validEmail); // 输出: alice@example.com`}
            language="java"
            highlights={[5, 14, 20, 44]}
            filename="FilteringOptional.java"
            description="使用 filter 进行条件过滤"
          />

          <h2 id="chaining" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、链式调用
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Optional 的最大优势是支持链式调用，将多个操作串联起来，形成清晰的空值处理管道。这种风格比嵌套的 if-else 更加简洁易读。
          </p>

          <Playground
            code={`import java.util.Optional;

class Order {
    String id;
    Customer customer;
    Order(String id, Customer customer) {
        this.id = id;
        this.customer = customer;
    }
    Optional<Customer> getCustomer() { return Optional.ofNullable(customer); }
}

class Customer {
    String name;
    Address address;
    Customer(String name, Address address) {
        this.name = name;
        this.address = address;
    }
    Optional<Address> getAddress() { return Optional.ofNullable(address); }
}

class Address {
    String city;
    String zipCode;
    Address(String city, String zipCode) {
        this.city = city;
        this.zipCode = zipCode;
    }
    String getCity() { return city; }
    String getZipCode() { return zipCode; }
}

// 传统方式：多层 null 检查
public String getCustomerCityTraditional(Order order) {
    if (order != null) {
        Customer customer = order.getCustomer();
        if (customer != null) {
            Address address = customer.getAddress();
            if (address != null) {
                return address.getCity();
            }
        }
    }
    return "Unknown";
}

// Optional 方式：链式调用
public String getCustomerCityOptional(Order order) {
    return Optional.ofNullable(order)
        .flatMap(Order::getCustomer)
        .flatMap(Customer::getAddress)
        .map(Address::getCity)
        .orElse("Unknown");
}

// 测试
Order order = new Order("001", 
    new Customer("Alice", new Address("Beijing", "100000")));
System.out.println(getCustomerCityOptional(order)); // 输出: Beijing

Order orderNoAddress = new Order("002", 
    new Customer("Bob", null));
System.out.println(getCustomerCityOptional(orderNoAddress)); // 输出: Unknown

Order nullOrder = null;
System.out.println(getCustomerCityOptional(nullOrder)); // 输出: Unknown`}
            language="java"
            highlights={[49, 55]}
            filename="ChainingOptional.java"
            description="Optional 链式调用示例"
          />

          <SideNote>
            链式调用的关键是每一步都返回 Optional，这样可以在任何环节出现空值时，后续操作都会返回空的 Optional，最终由 orElse 提供默认值。
          </SideNote>

          <h2 id="best-practices" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、最佳实践
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Optional 的正确使用需要遵循一些最佳实践，避免滥用导致代码复杂度增加。
          </p>

          <Playground
            code={`import java.util.*;
import java.util.stream.Collectors;

// ✅ 最佳实践 1：作为返回值类型
public Optional<User> findById(Long id) {
    User user = database.query(id);
    return Optional.ofNullable(user);
}

// ❌ 反例 1：不要用作字段类型
// public class User {
//     private Optional<String> email; // 错误！
// }

// ✅ 正确做法：字段使用普通类型，getter 返回 Optional
public class User {
    private String email;
    
    public Optional<String> getEmail() {
        return Optional.ofNullable(email);
    }
}

// ✅ 最佳实践 2：避免在集合中使用 Optional
// List<Optional<String>> list = ...; // 错误！

// ✅ 正确做法：过滤 null 值
List<String> names = users.stream()
    .map(User::getName)
    .filter(Objects::nonNull)
    .collect(Collectors.toList());

// ✅ 最佳实践 3：不要用作方法参数
// public void setUser(Optional<User> user) { } // 错误！

// ✅ 正确做法：使用方法重载
public void setUser(User user) { /* ... */ }
public void clearUser() { /* ... */ }

// ✅ 最佳实践 4：优先使用 orElseGet 而非 orElse
String defaultValue = expensiveComputation();
String result1 = opt.orElse(defaultValue); // 总是执行
String result2 = opt.orElseGet(() -> expensiveComputation()); // 按需执行

// ✅ 最佳实践 5：避免 isPresent + get 模式
// if (opt.isPresent()) { // 不推荐
//     value = opt.get();
// }

// ✅ 推荐做法：使用 ifPresent 或 orElse
opt.ifPresent(value -> process(value));
value = opt.orElse(defaultValue);`}
            language="java"
            highlights={[5, 16, 27, 37, 43, 50]}
            filename="BestPractices.java"
            description="Optional 最佳实践"
          />

          <Callout type="danger" title="常见错误用法">
            1. **将 Optional 用作字段类型**：增加序列化复杂度，违背设计初衷。<br/>
            2. **将 Optional 用作方法参数**：调用者仍需处理 Optional，不如使用方法重载。<br/>
            3. **在集合中存储 Optional**：应过滤 null 值而非包装为 Optional。<br/>
            4. **isPresent() + get() 模式**：失去了 Optional 的优势，不如直接使用 if-else。<br/>
            5. **过度嵌套 Optional**：如 Optional&lt;Optional&lt;T&gt;&gt;，应使用 flatMap 展平。
          </Callout>

          <h2 id="common-apis" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常用 API
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Optional 提供了丰富的 API，涵盖创建、检查、转换、解包等操作。以下是完整的 API 概览：
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-border text-[13px] sm:text-sm">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">方法</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">说明</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">示例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">of()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">创建非空 Optional</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">Optional.of("value")</td>
                </tr>
                <tr className="bg-parchment-soft/30">
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">ofNullable()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">创建可能为空的 Optional</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">Optional.ofNullable(obj)</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">empty()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">创建空 Optional</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">Optional.empty()</td>
                </tr>
                <tr className="bg-parchment-soft/30">
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">isPresent()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">检查是否有值</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">opt.isPresent()</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">isEmpty()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">检查是否为空（Java 11+）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">opt.isEmpty()</td>
                </tr>
                <tr className="bg-parchment-soft/30">
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">get()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">获取值（空时抛异常）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">opt.get()</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">orElse()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">提供默认值</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">opt.orElse("default")</td>
                </tr>
                <tr className="bg-parchment-soft/30">
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">orElseGet()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">延迟计算默认值</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">opt.orElseGet(() {'->'} compute())</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">orElseThrow()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">空时抛异常</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">opt.orElseThrow(() {'->'} new Ex())</td>
                </tr>
                <tr className="bg-parchment-soft/30">
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">ifPresent()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">值存在时执行</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">opt.ifPresent(v {'->'} print(v))</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">map()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">转换值</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">opt.map(String::length)</td>
                </tr>
                <tr className="bg-parchment-soft/30">
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">flatMap()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">扁平化转换</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">opt.flatMap(User::getAddress)</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-mono text-xs text-ink">filter()</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">条件过滤</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">opt.filter(s {'->'} s.length() &gt; 3)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1：Optional 可以完全替代 null">
            <strong>错误理解：</strong>使用 Optional 后就不需要再处理 null 了。<br/>
            <strong>正确理解：</strong>Optional 只是将 null 检查从运行时提前到编译时，并不能消除空值问题。它的主要作用是作为返回值类型，明确告知调用者该方法可能返回空值。对于字段和方法参数，仍应使用传统 null 检查或注解（如 @Nullable）。
          </Callout>

          <Callout type="danger" title="误区 2：Optional 应该用作字段类型">
            <strong>错误理解：</strong>将类的字段声明为 Optional 类型可以更好地处理空值。<br/>
            <strong>正确理解：</strong>Optional 不可序列化，会增加 JSON/XML 序列化的复杂度。此外，Optional 的设计初衷是作为返回值类型，而非数据存储。正确做法是字段使用普通类型（可为 null），getter 方法返回 Optional。
          </Callout>

          <Callout type="danger" title="误区 3：isPresent() + get() 是好习惯">
            <strong>错误理解：</strong>先检查 isPresent() 再调用 get() 是安全的做法。<br/>
            <strong>正确理解：</strong>这种模式失去了 Optional 的优势，代码与传统 if-else 无异，甚至更冗长。应优先使用 ifPresent()、orElse()、map() 等函数式方法。只有在确实需要分支逻辑时，才考虑使用 isPresent()。
          </Callout>

          <Callout type="danger" title="误区 4：Optional 性能优于 null 检查">
            <strong>错误理解：</strong>Optional 比传统 null 检查更快。<br/>
            <strong>正确理解：</strong>Optional 是对象包装，会额外的内存分配和方法调用开销。在高性能场景中，频繁的 Optional 创建可能导致 GC 压力。应仅在 API 边界（如返回值）使用 Optional，内部逻辑可使用传统 null 检查或 Objects.requireNonNull()。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "Optional 的设计目的是什么？",
                answer: "Optional 的设计目的有三点：\n1. **明确表达空值语义**：作为返回值类型，告知调用者该方法可能返回空值，避免文档缺失导致的误解。\n2. **强制空值处理**：通过类型系统强制开发者显式处理空值情况，减少 NullPointerException。\n3. **简化空值逻辑**：提供 map、flatMap、orElse 等函数式 API，让空值处理更加简洁优雅，避免嵌套的 if-else。\n\n注意：Optional 不是用来替代所有 null 检查的工具，而是作为 API 设计的一部分，提升代码可读性和安全性。"
              },
              {
                question: "orElse() 和 orElseGet() 有什么区别？",
                answer: "主要区别在于执行时机和性能：\n1. **orElse()**：参数是普通值或表达式，无论 Optional 是否为空，都会立即计算。如果默认值是复杂计算或方法调用，会造成不必要的开销。\n2. **orElseGet()**：参数是 Supplier，只有在 Optional 为空时才会执行，实现延迟计算，性能更优。\n\n示例：\n```java\nopt.orElse(expensiveComputation()); // 总是执行\nopt.orElseGet(() -> expensiveComputation()); // 按需执行\n```\n\n最佳实践：如果默认值是常量或简单表达式，使用 orElse()；如果是方法调用或复杂计算，使用 orElseGet()。"
              },
              {
                question: "map() 和 flatMap() 的区别是什么？",
                answer: "区别在于处理返回值的方式：\n1. **map()**：将函数应用于 Optional 中的值，返回新的 Optional。如果函数返回 Optional，会导致嵌套（Optional&lt;Optional&lt;T&gt;&gt;）。\n2. **flatMap()**：与 map 类似，但要求函数返回 Optional，并自动展平结果，避免嵌套。\n\n示例：\n```java\n// map 导致嵌套\nOptional<Optional<Address>> nested = optUser.map(User::getAddress);\n\n// flatMap 展平\nOptional<Address> flat = optUser.flatMap(User::getAddress);\n```\n\n最佳实践：当方法返回 Optional 时（如 getter 方法），使用 flatMap；否则使用 map。"
              },
              {
                question: "Optional 有哪些使用限制？",
                answer: "Optional 有以下使用限制：\n1. **不可序列化**：Optional 未实现 Serializable 接口，不能直接用于 JSON/XML 序列化。\n2. **不应作为字段类型**：增加序列化复杂度，违背设计初衷。应在 getter 中返回 Optional。\n3. **不应作为方法参数**：调用者仍需处理 Optional，不如使用方法重载。\n4. **不应在集合中使用**：如 List&lt;Optional&lt;T&gt;&gt;，应过滤 null 值而非包装。\n5. **性能开销**：Optional 是对象包装，频繁创建可能导致 GC 压力。\n\n这些限制表明 Optional 主要适合作为返回值类型，而非通用空值处理工具。"
              },
              {
                question: "如何将传统 null 检查重构为 Optional？",
                answer: "重构步骤如下：\n1. **识别返回值**：找到可能返回 null 的方法，将其返回类型改为 Optional&lt;T&gt;。\n2. **修改实现**：使用 Optional.ofNullable() 包装返回值。\n3. **更新调用方**：使用 map、flatMap、orElse 等方法处理 Optional，替代 if-else。\n4. **移除冗余检查**：删除调用方的 null 检查代码。\n\n示例：\n```java\n// 重构前\npublic User findById(Long id) {\n    return database.query(id); // 可能返回 null\n}\nUser user = findById(1);\nif (user != null) { /* ... */ }\n\n// 重构后\npublic Optional<User> findById(Long id) {\n    return Optional.ofNullable(database.query(id));\n}\nfindById(1).ifPresent(user -> { /* ... */ });\n```"
              },
              {
                question: "Optional 在 Java 9/10/11 中有哪些新特性？",
                answer: "Java 9/10/11 为 Optional 添加了以下方法：\n1. **stream()**（Java 9）：将 Optional 转换为 Stream，方便与 Stream API 集成。\n2. **ifPresentOrElse()**（Java 9）：值存在/不存在时分别执行不同操作。\n3. **or()**（Java 9）：提供备选的 Optional，类似 orElseGet 但返回 Optional。\n4. **isEmpty()**（Java 11）：检查 Optional 是否为空，与 isPresent() 相反。\n\n示例：\n```java\n// Java 9+\nopt.ifPresentOrElse(\n    value -> System.out.println(value),\n    () -> System.out.println(\"Empty\")\n);\n\n// Java 11+\nif (opt.isEmpty()) { /* ... */ }\n```"
              }
            ]}
          />

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、对比分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Optional 与传统 null 检查、其他语言的空值处理机制（如 Kotlin 的可空类型）在语法、安全性和性能上有明显差异。以下是详细对比：
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-border text-[13px] sm:text-sm">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">特性</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Optional</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">传统 null 检查</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Kotlin 可空类型</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">语法简洁度</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐⭐ 链式调用</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐ 冗长</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐⭐⭐ 最简洁</td>
                </tr>
                <tr className="bg-parchment-soft/30">
                  <td className="border border-border px-3 py-2 font-medium text-ink">编译期检查</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⚠️ 部分（需正确使用）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">❌ 无</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 完整支持</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">运行时开销</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐ 中等（对象包装）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐⭐⭐ 最低</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">⭐⭐⭐⭐ 低</td>
                </tr>
                <tr className="bg-parchment-soft/30">
                  <td className="border border-border px-3 py-2 font-medium text-ink">学习曲线</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">中等（需理解函数式）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">低（直观易懂）</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">低（语言内置）</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 font-medium text-ink">适用场景</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">API 返回值</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">内部逻辑、高性能场景</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">全场景</td>
                </tr>
                <tr className="bg-parchment-soft/30">
                  <td className="border border-border px-3 py-2 font-medium text-ink">生态系统支持</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ Java 8+</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ 所有版本</td>
                  <td className="border border-border px-3 py-2 text-ink-muted">✅ Kotlin 全版本</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Optional 是 Java 函数式编程的重要组件，与以下知识点密切相关：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="border border-border rounded-paper-md p-4 bg-parchment-soft/30">
              <h3 className="font-semibold text-ink mb-2">🔗 Lambda 表达式</h3>
              <p className="text-[13px] text-ink-muted">Optional 的 map、flatMap、filter 等方法依赖 Lambda 传递行为，是函数式编程的基础。</p>
            </div>
            <div className="border border-border rounded-paper-md p-4 bg-parchment-soft/30">
              <h3 className="font-semibold text-ink mb-2">🔗 Stream API</h3>
              <p className="text-[13px] text-ink-muted">Stream 也采用类似的链式调用风格，Optional 可以看作单元素 Stream 的特例。</p>
            </div>
            <div className="border border-border rounded-paper-md p-4 bg-parchment-soft/30">
              <h3 className="font-semibold text-ink mb-2">🔗 CompletableFuture</h3>
              <p className="text-[13px] text-ink-muted">异步编程中的 thenApply、thenCompose 等方法与 Optional 的 map、flatMap 类似。</p>
            </div>
            <div className="border border-border rounded-paper-md p-4 bg-parchment-soft/30">
              <h3 className="font-semibold text-ink mb-2">🔗 Null Safety 注解</h3>
              <p className="text-[13px] text-ink-muted">@Nullable、@NonNull 等注解在编译期提供空值检查，与 Optional 互补使用。</p>
            </div>
          </div>

          <Callout type="tip" title="学习建议">
            掌握 Optional 后，建议深入学习函数式编程范式，理解 map、flatMap 等操作的通用性。在实际项目中，优先在 API 边界使用 Optional，内部逻辑可根据性能需求选择传统 null 检查。同时，了解 Kotlin 的可空类型有助于理解现代语言的空值处理趋势。
          </Callout>

          {/* ⚠️ ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      {/* ⚠️ SmartTOC 直接渲染，不要用 <aside> 包裹！组件自行管理桌面端右侧栏和移动端右侧抽屉 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
