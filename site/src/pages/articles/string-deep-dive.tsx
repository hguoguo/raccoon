import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import InteractiveFlow from '../../components/knowledge/InteractiveFlow'
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
  { id: 'immutability', text: '一、String 的不可变性', level: 2 },
  { id: 'string-pool', text: '二、字符串常量池', level: 2 },
  { id: 'intern', text: '2.1 intern() 方法详解', level: 3 },
  { id: 'jdk9-compact', text: '三、JDK 9 Compact Strings', level: 2 },
  { id: 'builders', text: '四、StringBuilder vs StringBuffer', level: 2 },
  { id: 'comparison', text: '五、性能对比与选型', level: 2 },
  { id: 'common-operations', text: '六、常用操作与陷阱', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function StringDeepDive({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              String 是 Java 中最常用的引用类型，基于
              <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1">不可变字符数组</code>
              实现，通过<strong className="text-accent">字符串常量池</strong>优化内存使用，JDK 9 引入
              <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1">Compact Strings</code>
              进一步节省空间，是理解 Java 内存管理和性能优化的关键知识点。
            </p>
          </blockquote>

          <h2 id="immutability" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、String 的不可变性
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            String 的不可变性是指一旦创建，其内容就不能被修改。这是通过以下机制实现的：
          </p>

          <Playground language="java" filename="StringImmutability.java" description="String 不可变性源码分析" highlights={[3, 7, 11]}
            code={`public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
    // JDK 8: char[] value（每个字符占 2 字节）
    // JDK 9+: byte[] value + coder（Latin-1 占 1 字节，UTF-16 占 2 字节）
    private final byte[] value;
    private final byte coder;
    
    // 缓存 hash code（避免重复计算）
    private int hash;
    
    // 构造函数：复制数组，防止外部修改
    public String(String original) {
        this.value = original.value;
        this.hash = original.hash;
        this.coder = original.coder;
    }
    
    // 所有"修改"操作都返回新对象
    public String substring(int beginIndex) {
        // 创建新的 String 对象，而非修改原对象
        return new String(value, beginIndex, subLen, coder);
    }
}`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-green-700 font-sans mb-3">✅ 不可变性优势</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>线程安全：无需同步</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>支持字符串常量池</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>hash code 可缓存</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>可作为 HashMap 键</span></li>
              </ul>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-red-700 font-sans mb-3">❌ 不可变性劣势</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>频繁拼接产生大量临时对象</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>GC 压力大</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>性能开销（需使用 StringBuilder）</span></li>
              </ul>
            </div>
          </div>

          <Callout type="tip" title="为什么 String 设计为不可变？">
            1）<strong>安全性</strong>：String 常用于存储敏感信息（密码、URL、数据库连接），不可变防止被恶意修改；<br/>
            2）<strong>线程安全</strong>：多线程共享时无需同步；<br/>
            3）<strong>常量池优化</strong>：相同字符串只需存储一份，节省内存；<br/>
            4）<strong>Hash 缓存</strong>：HashMap 中作为 key 时，hash code 只需计算一次。
          </Callout>

          <h2 id="string-pool" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、字符串常量池
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            字符串常量池（String Pool）是 JVM 在堆内存中维护的一个特殊区域，用于存储字符串字面量。它的核心思想是：<strong className="text-ink-light font-semibold">相同内容的字符串只存储一份</strong>。
          </p>

          <DiagramBlock title="字符串常量池工作原理">
            <svg className="w-full max-w-[600px] mx-auto block" viewBox="0 0 600 250">
              {/* 堆内存 */}
              <rect x="20" y="20" width="260" height="200" rx="6" fill="#f5f0e8" stroke="#d4c5a9" strokeWidth="2"/>
              <text x="150" y="40" fill="#6b5e4c" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Heap Memory</text>
              
              {/* 字符串常量池 */}
              <rect x="40" y="60" width="220" height="140" rx="4" fill="rgba(181,101,29,0.1)" stroke="#b5651d"/>
              <text x="150" y="80" fill="#8b4c14" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">String Pool</text>
              
              <rect x="60" y="95" width="180" height="30" rx="3" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="150" y="115" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">"Hello" @0x001</text>
              
              <rect x="60" y="135" width="180" height="30" rx="3" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="150" y="155" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">"World" @0x002</text>
              
              <rect x="60" y="175" width="180" height="30" rx="3" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="150" y="195" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">"Java" @0x003</text>
              
              {/* 栈内存 */}
              <rect x="320" y="20" width="260" height="200" rx="6" fill="#f0f5f3" stroke="#5f7a68" strokeWidth="2"/>
              <text x="450" y="40" fill="#3d5245" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Stack Memory</text>
              
              <rect x="340" y="70" width="220" height="40" rx="3" fill="rgba(95,122,104,0.1)" stroke="#5f7a68"/>
              <text x="450" y="90" fill="#3d5245" fontSize="9" fontFamily="monospace" textAnchor="middle">String s1 = "Hello"</text>
              <line x1="450" y1="110" x2="150" y2="110" stroke="#5f7a68" strokeWidth="2" strokeDasharray="5,3"/>
              <text x="300" y="105" fill="#5f7a68" fontSize="8" fontFamily="sans-serif">指向池</text>
              
              <rect x="340" y="125" width="220" height="40" rx="3" fill="rgba(95,122,104,0.1)" stroke="#5f7a68"/>
              <text x="450" y="145" fill="#3d5245" fontSize="9" fontFamily="monospace" textAnchor="middle">String s2 = "Hello"</text>
              <line x1="450" y1="165" x2="150" y2="110" stroke="#5f7a68" strokeWidth="2" strokeDasharray="5,3"/>
              <text x="300" y="160" fill="#5f7a68" fontSize="8" fontFamily="sans-serif">指向同一对象</text>
              
              <rect x="340" y="180" width="220" height="30" rx="3" fill="rgba(160,82,45,0.1)" stroke="#a0522d"/>
              <text x="450" y="200" fill="#8a4a1a" fontSize="9" fontFamily="monospace" textAnchor="middle">String s3 = new String("Hello")</text>
              <text x="450" y="225" fill="#8a4a1a" fontSize="7" fontFamily="sans-serif" textAnchor="middle">堆中创建新对象，但值指向池</text>
            </svg>
          </DiagramBlock>

          <Playground language="java" filename="StringPoolExample.java" description="字符串常量池示例" highlights={[3, 7, 11, 15]}
            code={`// 1. 字面量创建（从常量池获取）
String s1 = "Hello";
String s2 = "Hello";
System.out.println(s1 == s2); // true（同一对象）

// 2. new 创建（堆中新建对象）
String s3 = new String("Hello");
System.out.println(s1 == s3); // false（不同对象）
System.out.println(s1.equals(s3)); // true（内容相同）

// 3. 编译期优化
String s4 = "Hel" + "lo"; // 编译器优化为 "Hello"
System.out.println(s1 == s4); // true

// 4. 运行时拼接（不会进入常量池）
String s5 = "Hel";
String s6 = s5 + "lo"; // 运行时创建新对象
System.out.println(s1 == s6); // false`}
          />

          <SideNote label="JVM 参数控制">
            字符串常量池的大小可通过 JVM 参数调整：<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">-XX:StringTableSize=60013</code>（默认值，必须是质数）。如果应用中大量使用字符串，可适当增大此值以减少哈希冲突。
          </SideNote>

          <h3 id="intern" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 intern() 方法详解
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">intern()</code> 方法用于手动将字符串加入常量池：
          </p>

          <Playground language="java" filename="InternExample.java" description="intern() 方法使用示例" highlights={[5, 9, 13]}
            code={`// 1. new 创建的字符串不在常量池中
String s1 = new String("Hello");
String s2 = "Hello";
System.out.println(s1 == s2); // false

// 2. 调用 intern() 后加入常量池
String s3 = s1.intern();
System.out.println(s3 == s2); // true（s3 指向常量池中的 "Hello"）

// 3. JDK 6 vs JDK 7+ 的差异
// JDK 6：intern() 在永久代创建副本
// JDK 7+：intern() 仅在常量池中记录引用（不复制）
String s4 = new String("World");
String s5 = s4.intern();
String s6 = "World";
System.out.println(s5 == s6); // true（JDK 7+）`}
          />

          <Callout type="warning" title="intern() 的性能陷阱">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">intern()</code> 是同步方法，高并发场景下会成为性能瓶颈。此外，常量池位于堆内存（JDK 7+），过度使用会导致 OOM。建议仅在需要大量重复字符串且内存敏感的场景下使用（如字典、缓存键）。
          </Callout>

          <h2 id="jdk9-compact" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、JDK 9 Compact Strings
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JDK 9 引入了 Compact Strings 优化，将内部的 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">char[]</code> 改为 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">byte[] + coder</code>：
          </p>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">特性</th>
                  <th className="text-left py-2.5 px-3 text-orange font-semibold">JDK 8 及之前</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">JDK 9+</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">内部存储</td><td className="py-2.5 px-3 font-mono">char[]（每字符 2 字节）</td><td className="py-2.5 px-3 font-mono">byte[] + coder</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">Latin-1 字符</td><td className="py-2.5 px-3">占用 2 字节</td><td className="py-2.5 px-3">占用 1 字节（coder=0）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">UTF-16 字符</td><td className="py-2.5 px-3">占用 2 字节</td><td className="py-2.5 px-3">占用 2 字节（coder=1）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">内存节省</td><td className="py-2.5 px-3">-</td><td className="py-2.5 px-3">纯 ASCII 字符串节省 50%</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">兼容性</td><td className="py-2.5 px-3">-</td><td className="py-2.5 px-3">API 完全兼容，透明切换</td></tr>
              </tbody>
            </table>
          </div>

          <Playground language="java" filename="CompactStringsExample.java" description="Compact Strings 原理" highlights={[5, 9]}
            code={`// JDK 9+ String 内部结构
public final class String {
    // 存储字符数据
    private final byte[] value;
    
    // 编码标识：0=Latin-1（1字节/字符），1=UTF-16（2字节/字符）
    private final byte coder;
    
    // 判断是否为 Latin-1
    boolean isLatin1() {
        return coder == LATIN1; // 0
    }
    
    // 示例："Hello"（纯 ASCII）→ coder=0，value.length=5
    // 示例："你好"（中文）→ coder=1，value.length=4（2个字符×2字节）
}`}
          />

          <Callout type="tip" title="Compact Strings 的优势">
            大部分应用中的字符串都是纯 ASCII（英文、数字、符号），Compact Strings 可将这些字符串的内存占用减半。对于包含中文等非 Latin-1 字符的字符串，自动使用 UTF-16 编码（2 字节/字符），与 JDK 8 行为一致。这一优化对大型应用可节省数百 MB 甚至 GB 级内存。
          </Callout>

          <h2 id="builders" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、StringBuilder vs StringBuffer
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            由于 String 不可变，频繁拼接会产生大量临时对象。StringBuilder 和 StringBuffer 提供了可变的字符串构建能力：
          </p>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">特性</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">StringBuilder</th>
                  <th className="text-left py-2.5 px-3 text-indigo font-semibold">StringBuffer</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">线程安全</td><td className="py-2.5 px-3 font-mono text-red-700">❌ 否</td><td className="py-2.5 px-3 font-mono text-green-700">✅ 是（synchronized）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">性能</td><td className="py-2.5 px-3 font-mono text-green-700">快</td><td className="py-2.5 px-3 font-mono text-orange">较慢（同步开销）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">JDK 版本</td><td className="py-2.5 px-3">JDK 5+</td><td className="py-2.5 px-3">JDK 1.0</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">适用场景</td><td className="py-2.5 px-3">单线程拼接</td><td className="py-2.5 px-3">多线程拼接</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">推荐度</td><td className="py-2.5 px-3 font-mono text-green-700">⭐⭐⭐⭐⭐</td><td className="py-2.5 px-3 font-mono text-orange">⭐⭐</td></tr>
              </tbody>
            </table>
          </div>

          <Playground language="java" filename="BuilderComparison.java" description="StringBuilder vs StringBuffer 性能对比" highlights={[5, 10, 15]}
            code={`// 1. StringBuilder（推荐，单线程场景）
StringBuilder sb1 = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb1.append(i);
}
String result1 = sb1.toString();

// 2. StringBuffer（多线程场景）
StringBuffer sb2 = new StringBuffer();
for (int i = 0; i < 10000; i++) {
    sb2.append(i);
}
String result2 = sb2.toString();

// 3. String 拼接（不推荐，性能差）
String result3 = "";
for (int i = 0; i < 10000; i++) {
    result3 += i; // 每次创建新对象！
}`}
          />

          <SideNote label="扩容机制">
            StringBuilder/StringBuffer 内部维护一个 char[] 数组，初始容量为 16。当容量不足时，会扩容为 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">oldCapacity * 2 + 2</code>。如果预知最终长度，建议在构造时指定容量：<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">new StringBuilder(1000)</code>，避免多次扩容带来的性能开销。
          </SideNote>

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、性能对比与选型
          </h2>

          <InteractiveFlow title="字符串操作选型指南" steps={[
            { label: '单次赋值', description: '直接使用 String，如 String s = "Hello"', icon: '📝' },
            { label: '少量拼接（≤3次）', description: '使用 + 运算符，编译器会优化为 StringBuilder', icon: '➕' },
            { label: '循环拼接', description: '必须使用 StringBuilder，避免产生大量临时对象', icon: '🔄' },
            { label: '多线程拼接', description: '使用 StringBuffer 或 ThreadLocal<StringBuilder>', icon: '🧵' },
            { label: '大量重复字符串', description: '考虑使用 intern() 或 String.valueOf() 缓存', icon: '💾' },
          ]} />

          <Playground language="java" filename="PerformanceTest.java" description="性能测试对比" highlights={[7, 12, 17]}
            code={`// 测试 10 万次拼接的性能
long start, end;

// 1. String 拼接（最慢）
start = System.currentTimeMillis();
String s1 = "";
for (int i = 0; i < 100000; i++) {
    s1 += i;
}
end = System.currentTimeMillis();
System.out.println("String: " + (end - start) + "ms"); // ~5000ms

// 2. StringBuilder（最快）
start = System.currentTimeMillis();
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100000; i++) {
    sb.append(i);
}
String s2 = sb.toString();
end = System.currentTimeMillis();
System.out.println("StringBuilder: " + (end - start) + "ms"); // ~10ms

// 3. StringBuffer（略慢于 StringBuilder）
start = System.currentTimeMillis();
StringBuffer sbf = new StringBuffer();
for (int i = 0; i < 100000; i++) {
    sbf.append(i);
}
String s3 = sbf.toString();
end = System.currentTimeMillis();
System.out.println("StringBuffer: " + (end - start) + "ms"); // ~15ms`}
          />

          <Callout type="tip" title="编译器优化">
            对于少量的字符串拼接（如 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">String s = "Hello" + " " + "World"</code>），Javac 编译器会自动优化为 StringBuilder 操作。但对于循环中的拼接（如 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">for(...) { s += i; }</code>），编译器无法优化，必须手动使用 StringBuilder。
          </Callout>

          <h2 id="common-operations" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、常用操作与陷阱
          </h2>

          <Playground language="java" filename="CommonOperations.java" description="常用操作与陷阱" highlights={[5, 10, 15, 20]}
            code={`// 1. 空值检查（避免 NPE）
String s = null;
if (s != null && !s.isEmpty()) { ... }
// 推荐：使用 Objects.requireNonNullElse(s, "")

// 2. equals vs ==
String s1 = new String("Hello");
String s2 = "Hello";
System.out.println(s1 == s2);      // false（比较引用）
System.out.println(s1.equals(s2)); // true（比较内容）

// 3. trim() 的陷阱（只去除首尾空格，不去除中间空格）
String s3 = "  Hello World  ";
System.out.println(s3.trim()); // "Hello World"

// 4. split() 的特殊字符需要转义
String s4 = "a.b.c";
String[] parts = s4.split("\\."); // 注意转义
// 错误写法：s4.split(".") 会匹配任意字符

// 5. substring 内存泄漏（JDK 6）
// JDK 6：substring 共享原 String 的 char[]，可能导致内存泄漏
// JDK 7+：substring 创建新的 char[]，已修复`}
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区一：String s = new String("Hello") 创建了几个对象？">
            <span className="font-semibold text-ink-light">你以为的：</span>1 个对象<br/>
            <span className="font-semibold text-accent">实际：</span><strong>2 个对象</strong>（如果常量池中没有 "Hello"）。第一个对象是常量池中的 "Hello"（编译期创建），第二个对象是堆中的 new String("Hello")（运行期创建）。如果常量池中已有 "Hello"，则只创建 1 个堆对象。
          </Callout>

          <Callout type="danger" title="误区二：字符串拼接都用 + 运算符">
            <span className="font-semibold text-ink-light">你以为的：</span>+ 运算符简洁方便，应该优先使用<br/>
            <span className="font-semibold text-accent">实际：</span>少量拼接（≤3次）可以用 +，编译器会优化。但<strong>循环中的拼接必须用 StringBuilder</strong>，否则每次循环都会创建新的 String 对象，导致性能急剧下降和 GC 压力增大。
          </Callout>

          <Callout type="danger" title="误区三：intern() 可以随意使用">
            <span className="font-semibold text-ink-light">你以为的：</span>intern() 能节省内存，应该多用<br/>
            <span className="font-semibold text-accent">实际：</span>intern() 是同步方法，高并发下性能差。此外，常量池位于堆内存，过度使用会导致 OOM。建议仅在<strong>大量重复字符串且内存敏感</strong>的场景下使用（如字典、缓存键），普通业务代码不建议使用。
          </Callout>

          <Callout type="danger" title="误区四：String 是不可变的，所以线程安全">
            <span className="font-semibold text-ink-light">你以为的：</span>String 不可变，任何场景都线程安全<br/>
            <span className="font-semibold text-accent">实际：</span>String 对象本身确实线程安全，但<strong>引用 String 的变量不一定线程安全</strong>。例如：<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">private String name;</code> 在多线程环境下读写仍需要同步。不可变的是对象内容，不是引用的可见性。
          </Callout>

          <Callout type="danger" title="误区五：substring 会共享底层数组">
            <span className="font-semibold text-ink-light">你以为的：</span>substring 会共享原 String 的 char[]，节省内存<br/>
            <span className="font-semibold text-accent">实际：</span>JDK 6 确实如此，但这导致了内存泄漏问题（大字符串截取小片段后，大字符串的 char[] 无法回收）。<strong>JDK 7+ 已修复</strong>，substring 会创建新的 char[]，不再共享。不要依赖过时的行为。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            { question: 'String 为什么设计为不可变？', answer: '1）安全性：String 常用于存储敏感信息（密码、URL），不可变防止被恶意修改；2）线程安全：多线程共享时无需同步；3）常量池优化：相同字符串只需存储一份，节省内存；4）Hash 缓存：HashMap 中作为 key 时，hash code 只需计算一次，提升性能。' },
            { question: 'String s = new String("Hello") 创建了几个对象？', answer: '如果常量池中没有 "Hello"，则创建 2 个对象：1）常量池中的 "Hello"（编译期创建）；2）堆中的 new String("Hello")（运行期创建）。如果常量池中已有 "Hello"，则只创建 1 个堆对象。注意：常量池在 JDK 7+ 位于堆内存，JDK 6 位于永久代。' },
            { question: '字符串常量池的作用是什么？存放在哪里？', answer: '字符串常量池用于存储字符串字面量，相同内容的字符串只存储一份，节省内存。JDK 6 及之前，常量池位于永久代（PermGen）；JDK 7+，常量池移至堆内存（Heap）。常量池大小可通过 -XX:StringTableSize 参数调整（默认 60013，必须是质数）。' },
            { question: 'intern() 方法的作用及 JDK 6 与 JDK 7+ 的差异？', answer: 'intern() 用于手动将字符串加入常量池。JDK 6：在永久代创建字符串副本；JDK 7+：仅在常量池中记录引用（不复制），如果常量池中已存在则返回已有引用。JDK 7+ 的实现更节省内存，但 intern() 仍是同步方法，高并发下性能差。' },
            { question: 'JDK 9 Compact Strings 的原理和优势？', answer: 'JDK 9 将 String 内部的 char[] 改为 byte[] + coder。coder=0 表示 Latin-1 编码（1 字节/字符），coder=1 表示 UTF-16 编码（2 字节/字符）。优势：纯 ASCII 字符串内存占用减半（从 2 字节/字符降为 1 字节/字符），对大型应用可节省数百 MB 甚至 GB 级内存。API 完全兼容，透明切换。' },
            { question: 'StringBuilder 和 StringBuffer 的区别及选型建议？', answer: 'StringBuilder 非线程安全，性能更快；StringBuffer 线程安全（方法加 synchronized），性能略慢。选型建议：单线程场景用 StringBuilder（绝大多数情况）；多线程共享场景用 StringBuffer 或 ThreadLocal<StringBuilder>。日常开发中 99% 的场景应使用 StringBuilder。' },
            { question: 'String、StringBuilder、StringBuffer 的性能差异？', answer: '性能排序：StringBuilder > StringBuffer > String。测试 10 万次拼接：String 约 5000ms（每次创建新对象），StringBuilder 约 10ms（可变数组），StringBuffer 约 15ms（同步开销）。循环拼接必须用 StringBuilder，少量拼接（≤3次）可用 + 运算符（编译器优化）。' },
            { question: '如何避免 String 相关的内存泄漏？', answer: '1）JDK 6 中 substring 共享底层 char[]，大字符串截取小片段会导致内存泄漏，JDK 7+ 已修复；2）避免过度使用 intern()，常量池过大可能导致 OOM；3）大量字符串拼接使用 StringBuilder，避免产生大量临时对象；4）及时释放不再使用的 String 引用，让 GC 回收。' },
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">← 前置知识</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">📋</span><span>Java 基础语法</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🧵</span><span>线程安全与不可变性</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">💾</span><span>JVM 内存模型</span></div>
              </div>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">延伸知识 →</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">⚡</span><span>HashMap 深度剖析</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔒</span><span>Collection 框架体系</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🚀</span><span>JVM 垃圾回收机制</span></div>
              </div>
            </div>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      <SmartTOC items={tocItems} />
    </div>
  )
}
