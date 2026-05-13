import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import InteractiveFlow from '../../../../../components/knowledge/InteractiveFlow'
import SideNote from '../../../../../components/knowledge/SideNote'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、Collection 体系全景图', level: 2 },
  { id: 'hierarchy', text: '二、核心接口层次结构', level: 2 },
  { id: 'collection', text: '2.1 Collection 根接口', level: 3 },
  { id: 'list-interface', text: '2.2 List 接口', level: 3 },
  { id: 'set-interface', text: '2.3 Set 接口', level: 3 },
  { id: 'queue-interface', text: '2.4 Queue 接口', level: 3 },
  { id: 'map-separate', text: '三、Map 体系的独立性', level: 2 },
  { id: 'design-patterns', text: '四、设计模式应用', level: 2 },
  { id: 'iterator-pattern', text: '4.1 迭代器模式', level: 3 },
  { id: 'adapter-pattern', text: '4.2 适配器模式', level: 3 },
  { id: 'performance', text: '五、性能特征对比', level: 2 },
  { id: 'thread-safety', text: '六、线程安全策略', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function CollectionFramework({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      {/* Main Article */}
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Java Collection Framework 是一套统一的<strong className="text-accent">数据结构抽象体系</strong>，通过接口与实现分离的设计，
              提供 List、Set、Queue 三大集合类型及 Map 键值对存储，内置丰富的算法工具类，是 Java 数据操作的核心基础设施。
            </p>
          </blockquote>

          {/* ========== 一、Collection 体系全景图 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Collection 体系全景图
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 集合框架自 JDK 1.2 引入，由 Joshua Bloch 主导设计。它采用<strong className="text-ink-light font-semibold">接口驱动</strong>的架构，
            将数据结构的抽象行为（接口）与具体实现（实现类）彻底解耦，使得开发者可以面向接口编程，轻松替换底层实现而不影响业务逻辑。
          </p>

          <Callout type="tip" title="核心价值">
            Collection Framework 的价值不仅在于提供了现成的数据结构，更在于建立了一套<strong>统一的操作规范</strong>：
            所有集合都支持迭代、查找、排序等通用操作，配合 Collections 工具类，实现了代码的高度复用和一致性。
          </Callout>

          {/* Diagram - Collection 体系架构图 */}
          <DiagramBlock title="Java Collection Framework 体系架构图">
            <svg className="w-full max-w-[500px] mx-auto block" viewBox="0 0 500 280">
              {/* Collection 根接口 */}
              <rect x="180" y="10" width="140" height="30" rx="4" fill="#b5651d" stroke="#8b4c14"/>
              <text x="250" y="30" fill="white" fontSize="11" fontFamily="monospace" textAnchor="middle">«interface» Collection</text>
              
              {/* List */}
              <line x1="250" y1="40" x2="120" y2="70" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="60" y="70" width="120" height="28" rx="4" fill="#ede4d1" stroke="#b5651d"/>
              <text x="120" y="88" fill="#8b4c14" fontSize="10" fontFamily="monospace" textAnchor="middle">«interface» List</text>
              
              {/* Set */}
              <line x1="250" y1="40" x2="250" y2="70" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="190" y="70" width="120" height="28" rx="4" fill="#ede4d1" stroke="#b5651d"/>
              <text x="250" y="88" fill="#8b4c14" fontSize="10" fontFamily="monospace" textAnchor="middle">«interface» Set</text>
              
              {/* Queue */}
              <line x1="250" y1="40" x2="380" y2="70" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="320" y="70" width="120" height="28" rx="4" fill="#ede4d1" stroke="#b5651d"/>
              <text x="380" y="88" fill="#8b4c14" fontSize="10" fontFamily="monospace" textAnchor="middle">«interface» Queue</text>
              
              {/* ArrayList */}
              <line x1="120" y1="98" x2="80" y2="130" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="20" y="130" width="120" height="26" rx="4" fill="#f5f0e8" stroke="#a99d8e"/>
              <text x="80" y="147" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">ArrayList</text>
              
              {/* LinkedList */}
              <line x1="120" y1="98" x2="160" y2="130" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="100" y="130" width="120" height="26" rx="4" fill="#f5f0e8" stroke="#a99d8e"/>
              <text x="160" y="147" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">LinkedList</text>
              
              {/* HashSet */}
              <line x1="250" y1="98" x2="220" y2="130" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="160" y="130" width="120" height="26" rx="4" fill="#f5f0e8" stroke="#a99d8e"/>
              <text x="220" y="147" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">HashSet</text>
              
              {/* TreeSet */}
              <line x1="250" y1="98" x2="280" y2="130" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="220" y="130" width="120" height="26" rx="4" fill="#f5f0e8" stroke="#a99d8e"/>
              <text x="280" y="147" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">TreeSet</text>
              
              {/* PriorityQueue */}
              <line x1="380" y1="98" x2="380" y2="130" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="320" y="130" width="120" height="26" rx="4" fill="#f5f0e8" stroke="#a99d8e"/>
              <text x="380" y="147" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">PriorityQueue</text>
              
              {/* Map (独立) */}
              <rect x="180" y="180" width="140" height="30" rx="4" fill="#5f7a68" stroke="#4a5f52"/>
              <text x="250" y="200" fill="white" fontSize="11" fontFamily="monospace" textAnchor="middle">«interface» Map</text>
              
              {/* HashMap */}
              <line x1="250" y1="210" x2="200" y2="240" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="140" y="240" width="120" height="26" rx="4" fill="#f5f0e8" stroke="#a99d8e"/>
              <text x="200" y="257" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">HashMap</text>
              
              {/* TreeMap */}
              <line x1="250" y1="210" x2="300" y2="240" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="240" y="240" width="120" height="26" rx="4" fill="#f5f0e8" stroke="#a99d8e"/>
              <text x="300" y="257" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">TreeMap</text>
              
              {/* 标注 */}
              <text x="10" y="270" fill="#8a7d6b" fontSize="9" fontFamily="monospace">橙色: Collection 子接口</text>
              <text x="250" y="270" fill="#8a7d6b" fontSize="9" fontFamily="monospace">绿色: Map (独立体系)</text>
            </svg>
          </DiagramBlock>

          <SideNote label="历史背景">
            Collection Framework 由 Joshua Bloch（《Effective Java》作者）在 JDK 1.2 中设计引入，
            替代了早期的 Vector、Hashtable、Enumeration 等老旧 API，成为 Java 标准库中最成功的设计之一。
          </SideNote>

          {/* ========== 二、核心接口层次结构 ========== */}
          <h2 id="hierarchy" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、核心接口层次结构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Collection Framework 的核心是三个基础接口：<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">List</code>、
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Set</code>、
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Queue</code>，它们都继承自
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Collection</code> 根接口。
            每个接口定义了不同的语义约束和行为特征。
          </p>

          {/* 2.1 Collection 根接口 */}
          <h3 id="collection" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 Collection 根接口
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Collection&lt;E&gt;</code> 是所有单列集合的根接口，定义了集合的基本操作：增删改查、大小查询、批量操作等。
            它继承了 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Iterable&lt;E&gt;</code>，因此所有 Collection 都支持 foreach 遍历。
          </p>

          <Playground
            language="java"
            filename="Collection.java"
            description="Collection 核心方法签名"
            highlights={[1, 3, 5, 8]}
            code={`public interface Collection<E> extends Iterable<E> {
    // 基本操作
    boolean add(E e);                    // 添加元素
    boolean remove(Object o);            // 删除元素
    boolean contains(Object o);          // 判断是否包含
    int size();                          // 元素数量
    boolean isEmpty();                   // 是否为空
    
    // 批量操作
    boolean addAll(Collection<? extends E> c);
    boolean removeAll(Collection<?> c);
    boolean retainAll(Collection<?> c);  // 保留交集
    void clear();                        // 清空
    
    // 视图操作
    Iterator<E> iterator();              // 获取迭代器
    Object[] toArray();                  // 转为数组
    <T> T[] toArray(T[] a);             // 泛型数组转换
    
    // JDK 8+ 默认方法
    default boolean removeIf(Predicate<? super E> filter) { ... }
    default Stream<E> stream() { ... }
}`}
          />

          <Callout type="info" title="Iterable 契约">
            Collection 继承 Iterable 意味着所有集合都支持增强 for 循环（foreach），其本质是调用
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">iterator()</code> 方法获取迭代器进行遍历。
          </Callout>

          {/* 2.2 List 接口 */}
          <h3 id="list-interface" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 List 接口
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">List&lt;E&gt;</code> 是<strong className="text-ink-light font-semibold">有序可重复</strong>的集合，支持基于索引的随机访问。
            它扩展了 Collection，新增了位置相关的操作方法，如 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">get(int index)</code>、
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">set(int index, E element)</code> 等。
          </p>

          <Playground
            language="java"
            filename="List.java"
            description="List 接口特有方法"
            highlights={[2, 4, 6]}
            code={`public interface List<E> extends Collection<E> {
    // 位置访问
    E get(int index);                      // 获取指定位置元素
    E set(int index, E element);           // 替换指定位置元素
    void add(int index, E element);        // 插入到指定位置
    E remove(int index);                   // 删除指定位置元素
    
    // 搜索
    int indexOf(Object o);                 // 首次出现的位置
    int lastIndexOf(Object o);             // 最后出现的位置
    
    // 子列表视图（非拷贝，修改会影响原列表）
    List<E> subList(int fromIndex, int toIndex);
    
    // 迭代器（支持双向遍历和修改）
    ListIterator<E> listIterator();
    ListIterator<E> listIterator(int index);
}`}
          />

          <SideNote label="subList 陷阱">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">subList()</code> 返回的是原列表的<strong>视图</strong>而非拷贝，
            对子列表的修改会反映到原列表，反之亦然。如果原列表在子列表使用期间被结构性修改，子列表会抛出
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">ConcurrentModificationException</code>。
          </SideNote>

          {/* 2.3 Set 接口 */}
          <h3 id="set-interface" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.3 Set 接口
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Set&lt;E&gt;</code> 是<strong className="text-ink-light font-semibold">无序不可重复</strong>的集合，数学上对应集合论中的"集合"概念。
            它没有新增方法，完全继承自 Collection，但通过重写 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">add()</code> 的语义来保证元素唯一性。
          </p>

          <Callout type="warning" title="equals 与 hashCode 契约">
            Set 依赖 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">equals()</code> 和 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">hashCode()</code> 判断元素是否重复。
            自定义对象作为 Set 元素时，必须同时重写这两个方法，否则会导致无法正确去重或查找失败。
          </Callout>

          {/* 2.4 Queue 接口 */}
          <h3 id="queue-interface" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.4 Queue 接口
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Queue&lt;E&gt;</code> 是<strong className="text-ink-light font-semibold">先进先出（FIFO）</strong>的队列接口，主要用于任务调度、消息传递等场景。
            它提供了两套操作方法：一套在失败时抛出异常，另一套返回特殊值（null 或 false）。
          </p>

          <Playground
            language="java"
            filename="Queue.java"
            description="Queue 双套操作 API"
            highlights={[2, 5, 8, 11]}
            code={`public interface Queue<E> extends Collection<E> {
    // 第一套：失败时抛出异常
    boolean add(E e);        // 入队，满时抛 IllegalStateException
    E remove();              // 出队，空时抛 NoSuchElementException
    E element();             // 查看队首，空时抛 NoSuchElementException
    
    // 第二套：失败时返回特殊值（推荐）
    boolean offer(E e);      // 入队，满时返回 false
    E poll();                // 出队，空时返回 null
    E peek();                // 查看队首，空时返回 null
}

// Deque 双端队列（扩展 Queue）
public interface Deque<E> extends Queue<E> {
    void addFirst(E e);      // 头部插入
    void addLast(E e);       // 尾部插入
    E removeFirst();         // 头部删除
    E removeLast();          // 尾部删除
    // ... 对应的 offer/poll/peek 变体
}`}
          />

          <SideNote label="Deque 应用">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Deque</code>（双端队列）是 Queue 的子接口，支持两端插入和删除。
            LinkedList 和 ArrayDeque 都实现了 Deque，常被用作栈（Stack）的替代品——官方已不推荐使用古老的 Stack 类。
          </SideNote>

          {/* ========== 三、Map 体系的独立性 ========== */}
          <h2 id="map-separate" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Map 体系的独立性
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong className="text-ink-light font-semibold">Map 不属于 Collection 体系</strong>，它是一个独立的接口层次结构。<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Map&lt;K,V&gt;</code> 表示键值对映射，
            与 Collection 的语义完全不同——Collection 存储单个元素，Map 存储键值对。
          </p>

          <Callout type="danger" title="常见误解">
            很多初学者误以为 Map 继承自 Collection，实际上两者是<strong>平行的接口体系</strong>。
            Map 提供了 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">keySet()</code>、
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">values()</code>、
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">entrySet()</code> 三个视图方法，可以将 Map 转换为 Collection 进行操作。
          </Callout>

          <Playground
            language="java"
            filename="MapViews.java"
            description="Map 的三个视图方法"
            highlights={[2, 5, 8]}
            code={`Map<String, Integer> map = new HashMap<>();
map.put("Alice", 25);
map.put("Bob", 30);

// 1. keySet() - 所有键的 Set 视图
Set<String> keys = map.keySet();  // ["Alice", "Bob"]

// 2. values() - 所有值的 Collection 视图
Collection<Integer> values = map.values();  // [25, 30]

// 3. entrySet() - 所有键值对的 Set 视图（最常用）
Set<Map.Entry<String, Integer>> entries = map.entrySet();
for (Map.Entry<String, Integer> entry : entries) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}

// 遍历 Map 的最佳实践
map.forEach((key, value) -> System.out.println(key + ": " + value));`}
          />

          {/* ========== 四、设计模式应用 ========== */}
          <h2 id="design-patterns" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、设计模式应用
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Collection Framework 是设计模式的教科书级应用，其中最典型的是<strong className="text-ink-light font-semibold">迭代器模式</strong>和<strong className="text-ink-light font-semibold">适配器模式</strong>。
          </p>

          {/* 4.1 迭代器模式 */}
          <h3 id="iterator-pattern" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 迭代器模式
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            迭代器模式将集合的遍历逻辑封装在独立的迭代器对象中，使得客户端无需关心底层数据结构即可统一访问元素。
            Collection 继承 Iterable 接口，强制所有集合提供 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">iterator()</code> 方法。
          </p>

          <ContextSwitcher
            simpleContent={
              <div className="p-3 sm:p-4 bg-parchment-warm rounded-paper-md text-[13px] sm:text-[14px] text-ink-muted font-sans leading-[1.8]">
                迭代器就像一个"游标"，帮你逐个访问集合中的元素。无论底层是数组还是链表，你都用同样的方式遍历：
                <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1">hasNext()</code> 判断是否还有下一个，
                <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1">next()</code> 获取下一个元素。
              </div>
            }
            hardcoreContent={
              <div className="space-y-3">
                <Playground
                  language="java"
                  filename="IteratorPattern.java"
                  description="迭代器模式源码分析"
                  highlights={[3, 7, 11]}
                  code={`// Iterator 接口定义
public interface Iterator<E> {
    boolean hasNext();     // 是否还有下一个元素
    E next();              // 返回下一个元素
    default void remove() { throw new UnsupportedOperationException(); }
}

// ArrayList 的内部迭代器实现（简化）
private class Itr implements Iterator<E> {
    int cursor = 0;        // 当前游标位置
    int lastRet = -1;      // 上一次返回的元素索引
    
    public boolean hasNext() {
        return cursor != size;
    }
    
    public E next() {
        checkForComodification();  // fail-fast 检查
        int i = cursor;
        if (i >= size) throw new NoSuchElementException();
        lastRet = i;
        cursor = i + 1;
        return elementData[i];
    }
    
    public void remove() {
        if (lastRet < 0) throw new IllegalStateException();
        checkForComodification();
        ArrayList.this.remove(lastRet);  // 委托给外部类
        cursor = lastRet;
        lastRet = -1;
        expectedModCount = modCount;
    }
}`}
                />
                <SideNote label="fail-fast 机制">
                  ArrayList 的迭代器在每次调用 next/remove 时都会检查
                  <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">modCount == expectedModCount</code>，
                  如果不相等说明集合被并发修改，立即抛出 ConcurrentModificationException，避免数据不一致。
                </SideNote>
              </div>
            }
          />

          {/* 4.2 适配器模式 */}
          <h3 id="adapter-pattern" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 适配器模式
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Collections 工具类提供了大量静态方法来适配集合的行为，如创建不可变视图、同步包装器、空集合等。这些方法本质上是<strong className="text-ink-light font-semibold">适配器模式</strong>的应用——在不修改原集合的情况下，为其添加新的行为。
          </p>

          <Playground
            language="java"
            filename="CollectionsAdapters.java"
            description="Collections 适配器方法"
            highlights={[2, 5, 8, 11]}
            code={`// 1. 不可变视图适配器（只读，修改原集合会反映到视图）
List<String> mutable = new ArrayList<>(Arrays.asList("A", "B"));
List<String> unmodifiable = Collections.unmodifiableList(mutable);
// unmodifiable.add("C");  // 抛出 UnsupportedOperationException

// 2. 同步包装器适配器（线程安全）
List<String> syncList = Collections.synchronizedList(new ArrayList<>());
// 遍历时仍需手动同步：synchronized (syncList) { for (...) {...} }

// 3. 空集合适配器（节省内存的单例）
List<String> emptyList = Collections.emptyList();
Set<String> emptySet = Collections.emptySet();
Map<String, Integer> emptyMap = Collections.emptyMap();

// 4. 单元素集合适配器
List<String> singletonList = Collections.singletonList("only");
Set<Integer> singletonSet = Collections.singleton(42);`}
          />

          <Callout type="tip" title="JDK 9+ 工厂方法">
            JDK 9 引入了更简洁的工厂方法：<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">List.of()</code>、
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Set.of()</code>、
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Map.of()</code>，返回的也是不可变集合，且性能优于 Collections 适配器。
          </Callout>

          {/* ========== 五、性能特征对比 ========== */}
          <h2 id="performance" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、性能特征对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            不同集合实现的时间复杂度差异显著，选择合适的实现对性能至关重要。以下是核心操作的时间复杂度对比：
          </p>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">操作</th>
                  <th className="text-left py-2.5 px-3 text-orange font-semibold">ArrayList</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">LinkedList</th>
                  <th className="text-left py-2.5 px-3 text-indigo font-semibold">HashSet</th>
                  <th className="text-left py-2.5 px-3 text-rose font-semibold">TreeSet</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light">
                  <td className="py-2.5 px-3 font-medium text-ink">get(index)</td>
                  <td className="py-2.5 px-3 font-mono text-green-700">O(1)</td>
                  <td className="py-2.5 px-3 font-mono text-red-700">O(n)</td>
                  <td className="py-2.5 px-3 font-mono text-gray-500">N/A</td>
                  <td className="py-2.5 px-3 font-mono text-gray-500">N/A</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2.5 px-3 font-medium text-ink">add(e)</td>
                  <td className="py-2.5 px-3 font-mono text-green-700">O(1)*</td>
                  <td className="py-2.5 px-3 font-mono text-green-700">O(1)</td>
                  <td className="py-2.5 px-3 font-mono text-green-700">O(1)</td>
                  <td className="py-2.5 px-3 font-mono text-yellow-700">O(log n)</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2.5 px-3 font-medium text-ink">add(index, e)</td>
                  <td className="py-2.5 px-3 font-mono text-red-700">O(n)</td>
                  <td className="py-2.5 px-3 font-mono text-green-700">O(1)</td>
                  <td className="py-2.5 px-3 font-mono text-gray-500">N/A</td>
                  <td className="py-2.5 px-3 font-mono text-gray-500">N/A</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2.5 px-3 font-medium text-ink">remove(e)</td>
                  <td className="py-2.5 px-3 font-mono text-red-700">O(n)</td>
                  <td className="py-2.5 px-3 font-mono text-red-700">O(n)</td>
                  <td className="py-2.5 px-3 font-mono text-green-700">O(1)</td>
                  <td className="py-2.5 px-3 font-mono text-yellow-700">O(log n)</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2.5 px-3 font-medium text-ink">contains(e)</td>
                  <td className="py-2.5 px-3 font-mono text-red-700">O(n)</td>
                  <td className="py-2.5 px-3 font-mono text-red-700">O(n)</td>
                  <td className="py-2.5 px-3 font-mono text-green-700">O(1)</td>
                  <td className="py-2.5 px-3 font-mono text-yellow-700">O(log n)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-ink">空间开销</td>
                  <td className="py-2.5 px-3">低（仅数组）</td>
                  <td className="py-2.5 px-3">高（前后指针）</td>
                  <td className="py-2.5 px-3">中（负载因子 0.75）</td>
                  <td className="py-2.5 px-3">高（红黑树节点）</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SideNote label="* ArrayList add 均摊 O(1)">
            ArrayList 的 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">add(e)</code> 在尾部追加时通常是 O(1)，但触发扩容时需要复制整个数组，最坏情况 O(n)。
            由于扩容频率随容量增长而降低，均摊时间复杂度仍为 O(1)。
          </SideNote>

          {/* ========== 六、线程安全策略 ========== */}
          <h2 id="thread-safety" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、线程安全策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 集合框架中的大多数实现都是<strong className="text-ink-light font-semibold">非线程安全</strong>的（如 ArrayList、HashMap、HashSet），这是为了追求极致性能。在多线程环境下，有以下几种线程安全策略：
          </p>

          <InteractiveFlow
            title="线程安全方案演进"
            steps={[
              { label: 'Vector/Hashtable', description: 'JDK 1.0 遗留类，所有方法 synchronized，性能极差，已废弃', icon: '🚫' },
              { label: 'Collections.synchronizedXxx', description: '包装器模式，每个方法加 synchronized 锁，粒度粗，并发度低', icon: '🔒' },
              { label: 'CopyOnWriteArrayList', description: '写时复制，读无锁，适合读多写少场景，内存开销大', icon: '📋' },
              { label: 'ConcurrentHashMap', description: '分段锁/CAS + synchronized，细粒度锁，高并发首选', icon: '⚡' },
              { label: 'ConcurrentLinkedQueue', description: 'CAS 无锁队列，高并发 FIFO 场景', icon: '🔄' },
            ]}
          />

          <Callout type="warning" title="不要使用 Vector 和 Hashtable">
            这两个类是 JDK 1.0 的遗留产物，虽然线程安全但性能极差（每个方法都 synchronized）。
            JDK 1.2 引入 Collection Framework 后已被标记为过时，应使用 ArrayList/HashMap + 同步策略替代。
          </Callout>

          <Playground
            language="java"
            filename="ThreadSafeCollections.java"
            description="线程安全集合示例"
            highlights={[3, 7, 11, 15]}
            code={`// 方案 1: 同步包装器（简单但性能一般）
List<String> syncList = Collections.synchronizedList(new ArrayList<>());
// 遍历时必须手动同步
synchronized (syncList) {
    for (String s : syncList) { System.out.println(s); }
}

// 方案 2: CopyOnWriteArrayList（读多写少）
CopyOnWriteArrayList<String> cowList = new CopyOnWriteArrayList<>();
cowList.add("A");  // 每次写入都复制整个数组
// 读取无锁，性能极高；写入成本高，适合配置项等场景

// 方案 3: ConcurrentHashMap（高并发 Map）
ConcurrentHashMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();
concurrentMap.putIfAbsent("key", 1);  // CAS 原子操作
concurrentMap.computeIfAbsent("key", k -> expensiveCompute(k));

// 方案 4: BlockingQueue（生产者-消费者）
BlockingQueue<String> queue = new LinkedBlockingQueue<>(100);
queue.put("task");   // 满时阻塞
String task = queue.take();  // 空时阻塞`}
          />

          {/* ========== 七、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区一：ArrayList 比 LinkedList 快">
            <span className="font-semibold text-ink-light">你以为的：</span>ArrayList 基于数组，应该比 LinkedList 快<br />
            <span className="font-semibold text-accent">实际：</span><strong>取决于操作类型</strong>。随机访问 ArrayList O(1) vs LinkedList O(n)；
            但在头部/中间插入删除时，LinkedList O(1) vs ArrayList O(n)（需要移动元素）。此外，ArrayList 缓存友好（连续内存），实际性能往往优于 LinkedList。
          </Callout>

          <Callout type="danger" title="误区二：HashSet 是无序的">
            <span className="font-semibold text-ink-light">你以为的：</span>HashSet 完全不保证顺序<br />
            <span className="font-semibold text-accent">实际：</span>HashSet 基于 HashMap 实现，虽然不保证插入顺序，但同一 JVM 运行中，相同元素的迭代顺序是<strong>稳定</strong>的（除非发生扩容）。
            如果需要保持插入顺序，应使用 LinkedHashSet。
          </Callout>

          <Callout type="danger" title="误区三：Map 属于 Collection">
            <span className="font-semibold text-ink-light">你以为的：</span>Map 是 Collection 的子接口<br />
            <span className="font-semibold text-accent">实际：</span>Map 是<strong>独立</strong>的接口体系，与 Collection 平行。Map 存储键值对，Collection 存储单个元素。
            可以通过 keySet()/values()/entrySet() 将 Map 转换为 Collection 视图。
          </Callout>

          <Callout type="danger" title="误区四：toArray() 返回的是副本">
            <span className="font-semibold text-ink-light">你以为的：</span>toArray() 返回新数组，修改不影响原集合<br />
            <span className="font-semibold text-accent">实际：</span><code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">toArray()</code> 确实返回副本，但如果数组元素是引用类型，
            修改数组中对象的属性<strong>会影响</strong>集合中的对象（因为指向同一内存地址）。只有重新赋值数组元素才不影响集合。
          </Callout>

          {/* ========== 八、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'Collection 和 Collections 有什么区别？',
                answer: 'Collection 是集合体系的根接口（java.util.Collection），定义了集合的基本操作；Collections 是工具类（java.util.Collections），提供了大量静态方法来操作集合，如排序、查找、同步包装、不可变视图等。一个是接口，一个是工具类。',
              },
              {
                question: 'ArrayList 和 LinkedList 的区别？如何选择？',
                answer: 'ArrayList 基于动态数组，支持随机访问 O(1)，尾部插入 O(1) 均摊，中间插入 O(n)；LinkedList 基于双向链表，不支持随机访问 O(n)，插入删除 O(1)（已知位置时）。选择原则：频繁随机访问用 ArrayList；频繁头部/中间插入删除用 LinkedList。但实际场景中 ArrayList 因缓存友好通常性能更好，LinkedList 很少使用。',
              },
              {
                question: '为什么 HashMap 不属于 Collection 体系？',
                answer: 'Collection 存储单个元素，Map 存储键值对，两者的语义和操作完全不同。Collection 关注元素的增删查改，Map 关注键值映射关系。它们是平行的接口体系，Map 提供了 keySet()/values()/entrySet() 三个视图方法来桥接到 Collection。',
              },
              {
                question: 'fail-fast 和 fail-safe 迭代器的区别？',
                answer: 'fail-fast：迭代过程中检测到集合被修改（modCount != expectedModCount）立即抛出 ConcurrentModificationException，如 ArrayList、HashMap 的迭代器。fail-safe：基于集合快照或并发数据结构，不会抛出异常，如 CopyOnWriteArrayList、ConcurrentHashMap 的迭代器。fail-safe 牺牲了一致性换取并发安全性。',
              },
              {
                question: '如何创建一个线程安全的 List？有哪些方案？',
                answer: '1）Collections.synchronizedList(new ArrayList<>())：同步包装器，每个方法 synchronized，性能一般；2）CopyOnWriteArrayList：写时复制，读无锁，适合读多写少；3）Vector：已过时，不推荐；4）自行使用 ReentrantLock 控制并发。高并发场景优先选择 CopyOnWriteArrayList（读多写少）或 ConcurrentHashMap（键值对场景）。',
              },
              {
                question: 'subList() 返回的是什么？有什么陷阱？',
                answer: 'subList() 返回原列表的视图（view）而非拷贝，对子列表的修改会反映到原列表，反之亦然。陷阱：1）如果原列表在子列表使用期间被结构性修改，子列表会抛出 ConcurrentModificationException；2）子列表持有原列表的引用，可能导致内存泄漏（原列表无法 GC）。如需独立副本，应使用 new ArrayList<>(list.subList(from, to))。',
              },
            ]}
          />

          {/* ========== 九、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            {/* 前置知识 */}
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">
                ← 前置知识
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans">
                  <span className="text-sm">🎯</span>
                  <span>Java 基础语法与面向对象</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans">
                  <span className="text-sm">🔢</span>
                  <span>泛型（Generics）</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans">
                  <span className="text-sm">🎭</span>
                  <span>设计模式基础（迭代器、适配器）</span>
                </div>
              </div>
            </div>

            {/* 延伸知识 */}
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">
                延伸知识 →
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans">
                  <span className="text-sm">📦</span>
                  <span>ArrayList / LinkedList 源码深度解析</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans">
                  <span className="text-sm">🔍</span>
                  <span>HashSet / TreeSet 底层原理</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans">
                  <span className="text-sm">🗺️</span>
                  <span>HashMap / TreeMap 源码剖析</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans">
                  <span className="text-sm">🔒</span>
                  <span>ConcurrentHashMap 并发机制</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Navigation */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC (Desktop sidebar + Mobile bottom sheet handled internally) */}
      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
