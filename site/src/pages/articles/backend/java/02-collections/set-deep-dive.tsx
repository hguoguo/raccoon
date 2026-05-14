import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import InteractiveFlow from '../../../../../components/knowledge/InteractiveFlow'
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
  { id: 'overview', text: '一、Set 接口核心特性', level: 2 },
  { id: 'hashset', text: '二、HashSet 深度剖析', level: 2 },
  { id: 'structure', text: '2.1 基于 HashMap 实现', level: 3 },
  { id: 'operations', text: '2.2 核心操作分析', level: 3 },
  { id: 'treeset', text: '三、TreeSet 深度剖析', level: 2 },
  { id: 'red-black-tree', text: '3.1 红黑树基础', level: 3 },
  { id: 'comparison', text: '四、HashSet vs TreeSet 对比', level: 2 },
  { id: 'misconceptions', text: '五、常见误区', level: 2 },
  { id: 'interview', text: '六、面试真题', level: 2 },
  { id: 'related', text: '七、知识关联', level: 2 },
]

export default function SetDeepDive({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Set 是 Java Collection Framework 中<strong className="text-accent">无序不可重复</strong>的集合接口，数学上对应集合论中的"集合"概念，
              主要实现包括 HashSet（基于哈希表）和 TreeSet（基于红黑树）。
            </p>
          </blockquote>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Set 接口核心特性
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Set 接口扩展自 Collection，但没有新增方法，完全继承父接口。它的核心特征是<strong className="text-ink-light font-semibold">元素唯一性</strong>，通过 equals() 和 hashCode() 判断重复。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">✅ 核心特性</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">🚫</span><span><strong className="text-ink-light">不可重复</strong>：不允许相同元素（equals 返回 true）</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">❓</span><span><strong className="text-ink-light">无序性</strong>：不保证迭代顺序（HashSet）</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">🔢</span><span><strong className="text-ink-light">最多一个 null</strong>：允许存储 null 元素</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">⚡</span><span><strong className="text-ink-light">高效查找</strong>：contains() 平均 O(1)（HashSet）</span></li>
              </ul>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">📋 主要实现类</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">📦</span><span><strong className="text-ink-light">HashSet</strong>：基于 HashMap，无序，O(1) 操作</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">🌳</span><span><strong className="text-ink-light">TreeSet</strong>：基于 TreeMap，有序，O(log n) 操作</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">🔗</span><span><strong className="text-ink-light">LinkedHashSet</strong>：保持插入顺序</span></li>
              </ul>
            </div>
          </div>

          <Callout type="tip" title="equals 与 hashCode 契约">
            Set 依赖 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">equals()</code> 和 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">hashCode()</code> 判断元素是否重复。
            自定义对象作为 Set 元素时，必须同时重写这两个方法，否则会导致无法正确去重。
          </Callout>

          <h2 id="hashset" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、HashSet 深度剖析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HashSet 是 Set 接口最常用的实现，内部基于 <strong className="text-ink-light font-semibold">HashMap</strong> 实现。它将元素作为 HashMap 的 key 存储，value 统一为一个静态 Object 对象。
          </p>

          <h3 id="structure" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 基于 HashMap 实现
          </h3>

          <DiagramBlock title="HashSet 内部结构">
            {`graph TD
              HS["HashSet&lt;String&gt;"] --> HM["HashMap&lt;String, Object&gt;"]
              HM --> KA["key: A"]
              HM --> KB["key: B"]
              HM --> KC["key: C"]
              HM --> NOTE["value: 统一的 PRESENT 对象"]
              style HS fill:#ede4d1,stroke:#d4c5a9
              style HM fill:#b5651d25,stroke:#b5651d
              style KA fill:#f5f0e8,stroke:#a99d8e
              style KB fill:#f5f0e8,stroke:#a99d8e
              style KC fill:#f5f0e8,stroke:#a99d8e
            `}
          </DiagramBlock>

          <Playground language="java" filename="HashSet.java" description="HashSet 核心实现" highlights={[3, 5, 8]}
            code={`public class HashSet<E> extends AbstractSet<E> implements Set<E>, Cloneable, java.io.Serializable {
    private transient HashMap<E,Object> map;
    private static final Object PRESENT = new Object();
    
    public HashSet() {
        map = new HashMap<>();
    }
    
    public boolean add(E e) {
        return map.put(e, PRESENT) == null;
    }
    
    public boolean remove(Object o) {
        return map.remove(o) == PRESENT;
    }
    
    public boolean contains(Object o) {
        return map.containsKey(o);
    }
}`}
          />

          <SideNote label="PRESENT 对象">
            HashSet 使用静态常量 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">PRESENT</code> 作为所有 key 的 value，
            因为 Set 只关心 key 是否存在，value 无意义。使用同一对象引用可节省内存。
          </SideNote>

          <h3 id="operations" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 核心操作分析
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HashSet 的所有操作都委托给内部的 HashMap，因此性能特征与 HashMap 一致：add/remove/contains 平均 O(1)，最坏 O(n)。
          </p>

          <InteractiveFlow title="HashSet add 操作流程" steps={[
            { label: '计算 hash', description: '调用 key.hashCode() 并扰动处理', icon: '🔢' },
            { label: '定位桶', description: '通过 (n-1) & hash 找到桶位置', icon: '📍' },
            { label: '检查重复', description: '遍历链表/红黑树，用 equals() 判断是否已存在', icon: '🔍' },
            { label: '插入或拒绝', description: '不存在则插入，存在则返回 false', icon: '✅' },
          ]} />

          <h2 id="treeset" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、TreeSet 深度剖析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TreeSet 基于 <strong className="text-ink-light font-semibold">TreeMap</strong> 实现，内部维护一棵<strong className="text-ink-light font-semibold">红黑树</strong>。它保证元素按自然排序或自定义 Comparator 排序，所有操作时间复杂度 O(log n)。
          </p>

          <h3 id="red-black-tree" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 红黑树基础
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            红黑树是一种自平衡二叉搜索树，通过颜色标记（红/黑）和旋转操作维持平衡，保证最坏情况下查询、插入、删除均为 O(log n)。
          </p>

          <DiagramBlock title="红黑树示例">
            {`graph TD
              R8["8"] --> R4["4"]
              R8 --> R12["12"]
              R4 --> R2["2"]
              R4 --> R6["6"]
              style R8 fill:#a0522d20,stroke:#a0522d,stroke-width:2px
              style R4 fill:#5f7a6825,stroke:#5f7a68,stroke-width:2px
              style R12 fill:#5f7a6825,stroke:#5f7a68,stroke-width:2px
              style R2 fill:#a0522d20,stroke:#a0522d,stroke-width:2px
              style R6 fill:#a0522d20,stroke:#a0522d,stroke-width:2px
            `}
          </DiagramBlock>

          <Playground language="java" filename="TreeSet.java" description="TreeSet 核心实现" highlights={[3, 8, 12]}
            code={`public class TreeSet<E> extends AbstractSet<E> implements NavigableSet<E>, Cloneable, java.io.Serializable {
    private transient NavigableMap<E,Object> m;
    private static final Object PRESENT = new Object();
    
    TreeSet(NavigableMap<E,Object> m) {
        this.m = m;
    }
    
    public TreeSet() {
        this(new TreeMap<E,Object>());
    }
    
    public TreeSet(Comparator<? super E> comparator) {
        this(new TreeMap<>(comparator));
    }
    
    public boolean add(E e) {
        return m.put(e, PRESENT) == null;
    }
}`}
          />

          <Callout type="info" title="NavigableSet 接口">
            TreeSet 实现了 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">NavigableSet</code> 接口，提供了丰富的导航方法：
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">lower()</code>、
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">floor()</code>、
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">ceiling()</code>、
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">higher()</code>，用于查找前驱后继元素。
          </Callout>

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、HashSet vs TreeSet 对比
          </h2>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">特性</th>
                  <th className="text-left py-2.5 px-3 text-orange font-semibold">HashSet</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">TreeSet</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">底层结构</td><td className="py-2.5 px-3">HashMap（哈希表）</td><td className="py-2.5 px-3">TreeMap（红黑树）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">是否有序</td><td className="py-2.5 px-3">❌ 无序</td><td className="py-2.5 px-3">✅ 自然排序/定制排序</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">null 元素</td><td className="py-2.5 px-3">✅ 允许</td><td className="py-2.5 px-3">❌ 不允许</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">add/remove/contains</td><td className="py-2.5 px-3 font-mono text-green-700">O(1) 平均</td><td className="py-2.5 px-3 font-mono text-yellow-700">O(log n)</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">空间开销</td><td className="py-2.5 px-3">中（负载因子 0.75）</td><td className="py-2.5 px-3">高（红黑树节点）</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">适用场景</td><td className="py-2.5 px-3">通用去重、快速查找</td><td className="py-2.5 px-3">范围查询、排序遍历</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、常见误区
          </h2>

          <Callout type="danger" title="误区一：HashSet 完全不保证顺序">
            <span className="font-semibold text-ink-light">你以为的：</span>HashSet 每次遍历顺序都不同<br />
            <span className="font-semibold text-accent">实际：</span>同一 JVM 运行中，相同元素的迭代顺序是<strong>稳定</strong>的（除非发生扩容）。但不同 JVM 或不同运行次序可能不同，不应依赖此顺序。
          </Callout>

          <Callout type="danger" title="误区二：只重写 equals 不重写 hashCode">
            <span className="font-semibold text-ink-light">你以为的：</span>只要 equals 正确就能去重<br />
            <span className="font-semibold text-accent">实际：</span>HashSet 先通过 hashCode 定位桶，再通过 equals 判断重复。如果两个对象 equals 相等但 hashCode 不同，会被放入不同桶，导致 Set 中出现"重复"元素。
          </Callout>

          <Callout type="danger" title="误区三：TreeSet 可以存储 null">
            <span className="font-semibold text-ink-light">你以为的：</span>TreeSet 和 HashSet 一样可以存 null<br />
            <span className="font-semibold text-accent">实际：</span>TreeSet 基于红黑树，需要进行比较操作，null 无法参与比较，会抛出 NullPointerException。HashSet 基于 HashMap，允许 null 作为 key。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、面试真题
          </h2>

          <InterviewSection questions={[
            { question: 'HashSet 是如何保证元素不重复的？', answer: 'HashSet 内部基于 HashMap 实现，将元素作为 key 存储，value 为统一的 PRESENT 对象。添加元素时调用 map.put(e, PRESENT)，HashMap 会通过 hashCode 定位桶位置，再遍历链表/红黑树用 equals() 判断是否已存在相同 key。如果存在则覆盖旧值并返回旧 value（PRESENT），put 方法返回非 null，add 方法返回 false；如果不存在则插入新节点，put 返回 null，add 返回 true。' },
            { question: '为什么使用 HashSet 时必须同时重写 equals 和 hashCode？', answer: 'HashSet 依赖 hashCode 定位桶位置，依赖 equals 判断元素是否重复。如果只重写 equals 不重写 hashCode，两个逻辑相等的对象可能 hashCode 不同，被放入不同桶，导致 Set 中出现"重复"元素。反之，如果 hashCode 相同但 equals 不同，会在同一桶中形成链表，虽然不会出错但影响性能。Java 规范规定：如果两个对象 equals 相等，它们的 hashCode 必须相同。' },
            { question: 'HashSet 和 TreeSet 的区别？如何选择？', answer: 'HashSet 基于 HashMap，无序，操作 O(1)，允许 null；TreeSet 基于 TreeMap（红黑树），有序（自然排序或 Comparator），操作 O(log n)，不允许 null。选择原则：只需要去重用 HashSet；需要排序或范围查询（如 lower/floor/ceiling/higher）用 TreeSet。绝大多数场景 HashSet 性能更好。' },
            { question: 'LinkedHashSet 有什么特点？', answer: 'LinkedHashSet 继承自 HashSet，内部使用 LinkedHashMap 实现。它在 HashSet 的基础上维护了一个双向链表来记录元素插入顺序，因此迭代时会按照插入顺序返回元素。性能略低于 HashSet（多了链表维护开销），但高于 TreeSet。适用于需要保持插入顺序的去重场景。' },
            { question: '如何遍历 Set 并安全删除元素？', answer: '不能在 foreach 循环中直接调用 set.remove()，会抛出 ConcurrentModificationException。正确做法：1）使用 Iterator 迭代器，调用 iterator.remove()；2）JDK 8+ 使用 removeIf(Predicate) 方法；3）收集要删除的元素到临时集合，遍历结束后批量删除。推荐方式：set.removeIf(e -> condition)。' },
            { question: 'HashSet 的初始容量和负载因子是多少？', answer: 'HashSet 默认初始容量为 16，负载因子为 0.75，与 HashMap 一致。因为 HashSet 内部就是 HashMap。可以通过构造函数指定：new HashSet<>(initialCapacity, loadFactor)。如果预知元素数量，建议指定容量避免频繁扩容。' },
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">← 前置知识</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">📋</span><span>Collection 体系架构</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔢</span><span>hashCode 与 equals 契约</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🗺️</span><span>HashMap 底层原理</span></div>
              </div>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">延伸知识 →</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🗺️</span><span>Map 框架深度解析</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🌳</span><span>红黑树算法详解</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔒</span><span>ConcurrentHashMap 并发机制</span></div>
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
