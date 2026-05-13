import KnowledgeLayout from '../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../components/knowledge/Playground'
import InteractiveFlow from '../../../components/knowledge/InteractiveFlow'
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
  { id: 'overview', text: '一、Map 接口核心特性', level: 2 },
  { id: 'hierarchy', text: '二、Map 接口层次结构', level: 2 },
  { id: 'hashmap-brief', text: '三、HashMap 简要回顾', level: 2 },
  { id: 'treemap', text: '四、TreeMap 深度剖析', level: 2 },
  { id: 'structure', text: '4.1 红黑树实现', level: 3 },
  { id: 'operations', text: '4.2 核心操作分析', level: 3 },
  { id: 'comparison', text: '五、HashMap vs TreeMap 对比', level: 2 },
  { id: 'other-implementations', text: '六、其他 Map 实现', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function MapFramework({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Map 是 Java Collection Framework 中<strong className="text-accent">独立于 Collection</strong>的键值对映射接口，
              提供 key-value 存储和检索功能，主要实现包括 HashMap（哈希表）和 TreeMap（红黑树）。
            </p>
          </blockquote>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、Map 接口核心特性
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Map 接口<strong className="text-ink-light font-semibold">不属于 Collection 体系</strong>，它是一个独立的接口层次。Map 存储键值对（key-value pairs），每个 key 最多映射到一个 value。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">✅ 核心特性</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">🔑</span><span><strong className="text-ink-light">键唯一性</strong>：每个 key 最多映射一个 value</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">🔄</span><span><strong className="text-ink-light">值可重复</strong>：不同 key 可以映射相同 value</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">❓</span><span><strong className="text-ink-light">无序性</strong>：不保证迭代顺序（HashMap）</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">⚡</span><span><strong className="text-ink-light">高效查找</strong>：get(key) 平均 O(1)（HashMap）</span></li>
              </ul>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">📋 主要实现类</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">📦</span><span><strong className="text-ink-light">HashMap</strong>：基于哈希表，无序，O(1) 操作</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">🌳</span><span><strong className="text-ink-light">TreeMap</strong>：基于红黑树，有序，O(log n) 操作</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">🔗</span><span><strong className="text-ink-light">LinkedHashMap</strong>：保持插入/访问顺序</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">⚡</span><span><strong className="text-ink-light">ConcurrentHashMap</strong>：线程安全，高并发</span></li>
              </ul>
            </div>
          </div>

          <Callout type="tip" title="Map 与 Collection 的关系">
            Map 是独立的接口体系，但提供了三个视图方法将其转换为 Collection：<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">keySet()</code>、
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">values()</code>、
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">entrySet()</code>，方便统一处理。
          </Callout>

          <h2 id="hierarchy" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Map 接口层次结构
          </h2>

          <DiagramBlock title="Map 接口层次结构">
            <svg className="w-full max-w-[500px] mx-auto block" viewBox="0 0 500 220">
              <rect x="180" y="10" width="140" height="30" rx="4" fill="#5f7a68" stroke="#4a5f52"/>
              <text x="250" y="30" fill="white" fontSize="11" fontFamily="monospace" textAnchor="middle">«interface» Map</text>
              
              <line x1="250" y1="40" x2="150" y2="80" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="80" y="80" width="140" height="28" rx="4" fill="#ede4d1" stroke="#b5651d"/>
              <text x="150" y="98" fill="#8b4c14" fontSize="10" fontFamily="monospace" textAnchor="middle">«interface» SortedMap</text>
              
              <line x1="250" y1="40" x2="350" y2="80" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="280" y="80" width="140" height="28" rx="4" fill="#ede4d1" stroke="#b5651d"/>
              <text x="350" y="98" fill="#8b4c14" fontSize="10" fontFamily="monospace" textAnchor="middle">«interface» NavigableMap</text>
              
              <line x1="150" y1="108" x2="120" y2="140" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="60" y="140" width="120" height="26" rx="4" fill="#f5f0e8" stroke="#a99d8e"/>
              <text x="120" y="157" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">TreeMap</text>
              
              <line x1="350" y1="108" x2="350" y2="140" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="290" y="140" width="120" height="26" rx="4" fill="#f5f0e8" stroke="#a99d8e"/>
              <text x="350" y="157" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">TreeMap</text>
              
              <line x1="250" y1="40" x2="250" y2="140" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="190" y="140" width="120" height="26" rx="4" fill="#f5f0e8" stroke="#a99d8e"/>
              <text x="250" y="157" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">HashMap</text>
              
              <rect x="190" y="180" width="120" height="26" rx="4" fill="#f5f0e8" stroke="#a99d8e"/>
              <text x="250" y="197" fill="#6b5e4c" fontSize="9" fontFamily="monospace" textAnchor="middle">LinkedHashMap</text>
              <line x1="250" y1="166" x2="250" y2="180" stroke="#d4c5a9" strokeWidth="1.5"/>
              
              <text x="20" y="215" fill="#8a7d6b" fontSize="9" fontFamily="monospace">绿色: Map 根接口</text>
              <text x="250" y="215" fill="#8a7d6b" fontSize="9" fontFamily="monospace">橙色: 子接口</text>
            </svg>
          </DiagramBlock>

          <Playground language="java" filename="Map.java" description="Map 核心方法签名" highlights={[2, 4, 6, 9]}
            code={`public interface Map<K,V> {
    // 基本操作
    V put(K key, V value);           // 插入或更新键值对
    V get(Object key);               // 根据 key 获取 value
    V remove(Object key);            // 删除键值对
    boolean containsKey(Object key); // 判断是否包含 key
    boolean containsValue(Object value); // 判断是否包含 value
    
    // 批量操作
    void putAll(Map<? extends K, ? extends V> m);
    void clear();
    
    // 视图操作
    Set<K> keySet();                 // 所有 key 的 Set 视图
    Collection<V> values();          // 所有 value 的 Collection 视图
    Set<Map.Entry<K,V>> entrySet();  // 所有键值对的 Set 视图
    
    // JDK 8+ 默认方法
    default V getOrDefault(Object key, V defaultValue) { ... }
    default void forEach(BiConsumer<? super K, ? super V> action) { ... }
    default V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction) { ... }
}`}
          />

          <h2 id="hashmap-brief" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、HashMap 简要回顾
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HashMap 是 Map 接口最常用的实现，基于<strong className="text-ink-light font-semibold">哈希表</strong>（数组 + 链表 + 红黑树）实现。详细内容请参考专门的 
            <a href="/docs/02-collections/hashmap" className="text-accent hover:underline ml-1">HashMap 深度剖析</a> 文章。
          </p>

          <Callout type="info" title="HashMap 核心特征">
            <ul className="space-y-1 text-[13px] text-ink-muted font-sans mt-2">
              <li>• 无序：不保证迭代顺序</li>
              <li>• 允许 null 键和 null 值</li>
              <li>• 非线程安全</li>
              <li>• 操作时间复杂度：O(1) 平均</li>
              <li>• 底层结构：JDK 8+ 采用数组 + 链表 + 红黑树</li>
            </ul>
          </Callout>

          <h2 id="treemap" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、TreeMap 深度剖析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TreeMap 实现了 <strong className="text-ink-light font-semibold">SortedMap</strong> 和 <strong className="text-ink-light font-semibold">NavigableMap</strong> 接口，内部基于<strong className="text-ink-light font-semibold">红黑树</strong>实现。它保证元素按 key 的自然排序或自定义 Comparator 排序，所有操作时间复杂度 O(log n)。
          </p>

          <h3 id="structure" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 红黑树实现
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TreeMap 内部维护一棵红黑树，每个节点存储 key-value 对。红黑树通过颜色标记和旋转操作维持平衡，保证最坏情况下查询、插入、删除均为 O(log n)。
          </p>

          <DiagramBlock title="TreeMap 红黑树结构">
            <svg className="w-full max-w-[500px] mx-auto block" viewBox="0 0 500 200">
              <circle cx="250" cy="30" r="20" fill="rgba(160,82,45,0.15)" stroke="#a0522d" strokeWidth="2"/>
              <text x="250" y="27" fill="#a0522d" fontSize="9" fontFamily="monospace" textAnchor="middle">k:8</text>
              <text x="250" y="38" fill="#a0522d" fontSize="8" fontFamily="monospace" textAnchor="middle">v:V8</text>
              
              <line x1="235" y1="48" x2="180" y2="80" stroke="#d4c5a9" strokeWidth="1.5"/>
              <line x1="265" y1="48" x2="320" y2="80" stroke="#d4c5a9" strokeWidth="1.5"/>
              
              <circle cx="150" cy="100" r="20" fill="rgba(95,122,104,0.15)" stroke="#5f7a68" strokeWidth="2"/>
              <text x="150" y="97" fill="#5f7a68" fontSize="9" fontFamily="monospace" textAnchor="middle">k:4</text>
              <text x="150" y="108" fill="#5f7a68" fontSize="8" fontFamily="monospace" textAnchor="middle">v:V4</text>
              
              <circle cx="350" cy="100" r="20" fill="rgba(95,122,104,0.15)" stroke="#5f7a68" strokeWidth="2"/>
              <text x="350" y="97" fill="#5f7a68" fontSize="9" fontFamily="monospace" textAnchor="middle">k:12</text>
              <text x="350" y="108" fill="#5f7a68" fontSize="8" fontFamily="monospace" textAnchor="middle">v:V12</text>
              
              <line x1="135" y1="118" x2="100" y2="150" stroke="#d4c5a9" strokeWidth="1.5"/>
              <line x1="165" y1="118" x2="200" y2="150" stroke="#d4c5a9" strokeWidth="1.5"/>
              
              <circle cx="80" cy="170" r="20" fill="rgba(160,82,45,0.15)" stroke="#a0522d" strokeWidth="2"/>
              <text x="80" y="167" fill="#a0522d" fontSize="9" fontFamily="monospace" textAnchor="middle">k:2</text>
              <text x="80" y="178" fill="#a0522d" fontSize="8" fontFamily="monospace" textAnchor="middle">v:V2</text>
              
              <circle cx="220" cy="170" r="20" fill="rgba(160,82,45,0.15)" stroke="#a0522d" strokeWidth="2"/>
              <text x="220" y="167" fill="#a0522d" fontSize="9" fontFamily="monospace" textAnchor="middle">k:6</text>
              <text x="220" y="178" fill="#a0522d" fontSize="8" fontFamily="monospace" textAnchor="middle">v:V6</text>
              
              <text x="20" y="195" fill="#8a7d6b" fontSize="9" fontFamily="monospace">棕色: 黑色节点</text>
              <text x="250" y="195" fill="#8a7d6b" fontSize="9" fontFamily="monospace">绿色: 红色节点</text>
            </svg>
          </DiagramBlock>

          <Playground language="java" filename="TreeMap.java" description="TreeMap 核心字段" highlights={[3, 5, 7]}
            code={`public class TreeMap<K,V> extends AbstractMap<K,V> implements NavigableMap<K,V>, Cloneable, java.io.Serializable {
    // 比较器（自然排序或自定义）
    private final Comparator<? super K> comparator;
    
    // 红黑树根节点
    private transient Entry<K,V> root;
    
    // 元素数量
    private transient int size = 0;
    
    // 修改次数（fail-fast）
    private transient int modCount = 0;
    
    // 红黑树节点
    static final class Entry<K,V> implements Map.Entry<K,V> {
        K key;
        V value;
        Entry<K,V> left;
        Entry<K,V> right;
        Entry<K,V> parent;
        boolean color = BLACK;
    }
}`}
          />

          <h3 id="operations" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 核心操作分析
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TreeMap 的所有操作都基于红黑树的查找、插入、删除算法，时间复杂度均为 O(log n)。
          </p>

          <InteractiveFlow title="TreeMap put 操作流程" steps={[
            { label: '检查 key', description: '如果 key 为 null 且没有自定义 Comparator，抛出 NullPointerException', icon: '🔍' },
            { label: '查找位置', description: '从根节点开始，根据 Comparator 比较 key，决定向左或向右遍历', icon: '📍' },
            { label: '插入节点', description: '找到合适位置后插入新节点，初始颜色为红色', icon: '➕' },
            { label: '修复平衡', description: '如果违反红黑树性质，通过变色和旋转操作恢复平衡', icon: '🔄' },
            { label: '返回旧值', description: '如果 key 已存在则更新 value 并返回旧值，否则返回 null', icon: '✅' },
          ]} />

          <Playground language="java" filename="TreeMap.java" description="TreeMap get 方法（简化）" highlights={[3, 6, 9]}
            code={`public V get(Object key) {
    Entry<K,V> p = getEntry(key);
    return (p == null ? null : p.value);
}

final Entry<K,V> getEntry(Object key) {
    Entry<K,V> p = root;
    while (p != null) {
        int cmp = compare(key, p.key);
        if (cmp < 0)
            p = p.left;       // key 小于当前节点，向左
        else if (cmp > 0)
            p = p.right;      // key 大于当前节点，向右
        else
            return p;         // 找到匹配 key
    }
    return null;  // 未找到
}

// 比较逻辑（支持自然排序和自定义 Comparator）
final int compare(Object k1, Object k2) {
    return comparator == null ? ((Comparable<? super K>)k1).compareTo((K)k2)
        : comparator.compare((K)k1, (K)k2);
}`}
          />

          <Callout type="warning" title="TreeMap 不允许 null 键">
            TreeMap 基于比较操作，null 无法参与比较。如果使用自然排序（comparator 为 null），调用
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">put(null, value)</code> 会抛出 NullPointerException。
            如果提供了自定义 Comparator 且能处理 null，则可以存储 null 键。
          </Callout>

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、HashMap vs TreeMap 对比
          </h2>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">特性</th>
                  <th className="text-left py-2.5 px-3 text-orange font-semibold">HashMap</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">TreeMap</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">底层结构</td><td className="py-2.5 px-3">数组 + 链表 + 红黑树</td><td className="py-2.5 px-3">红黑树</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">是否有序</td><td className="py-2.5 px-3">❌ 无序</td><td className="py-2.5 px-3">✅ 按 key 排序</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">null 键</td><td className="py-2.5 px-3">✅ 允许</td><td className="py-2.5 px-3">❌ 不允许（默认）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">get/put/remove</td><td className="py-2.5 px-3 font-mono text-green-700">O(1) 平均</td><td className="py-2.5 px-3 font-mono text-yellow-700">O(log n)</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">空间开销</td><td className="py-2.5 px-3">中（负载因子 0.75）</td><td className="py-2.5 px-3">高（红黑树节点）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">范围查询</td><td className="py-2.5 px-3">❌ 不支持</td><td className="py-2.5 px-3">✅ lower/floor/ceiling/higher</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">适用场景</td><td className="py-2.5 px-3">通用键值存储</td><td className="py-2.5 px-3">需要排序或范围查询</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="other-implementations" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、其他 Map 实现
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">LinkedHashMap</div>
              <p className="text-[13px] text-ink-muted font-sans leading-[1.7]">继承自 HashMap，额外维护双向链表记录插入顺序或访问顺序。适用于需要保持顺序的场景，如 LRU 缓存。</p>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-indigo font-sans mb-3">ConcurrentHashMap</div>
              <p className="text-[13px] text-ink-muted font-sans leading-[1.7]">线程安全的 HashMap，JDK 8 采用 CAS + synchronized 细粒度锁，高并发场景首选。不允许 null 键和 null 值。</p>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-rose font-sans mb-3">WeakHashMap</div>
              <p className="text-[13px] text-ink-muted font-sans leading-[1.7]">key 使用弱引用，当 key 没有被外部强引用时会被 GC 回收。适用于缓存场景，避免内存泄漏。</p>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-purple font-sans mb-3">IdentityHashMap</div>
              <p className="text-[13px] text-ink-muted font-sans leading-[1.7]">使用 <code className="font-mono text-[11px] bg-parchment-warm px-1 rounded">==</code> 而非 equals() 判断 key 相等性，使用 System.identityHashCode() 计算 hash。适用于需要区分对象引用的场景。</p>
            </div>
          </div>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区一：Map 属于 Collection">
            <span className="font-semibold text-ink-light">你以为的：</span>Map 是 Collection 的子接口<br />
            <span className="font-semibold text-accent">实际：</span>Map 是<strong>独立</strong>的接口体系，与 Collection 平行。Map 存储键值对，Collection 存储单个元素。可以通过 keySet()/values()/entrySet() 将 Map 转换为 Collection 视图。
          </Callout>

          <Callout type="danger" title="误区二：TreeMap 可以存储 null 键">
            <span className="font-semibold text-ink-light">你以为的：</span>TreeMap 和 HashMap 一样可以存 null 键<br />
            <span className="font-semibold text-accent">实际：</span>TreeMap 基于红黑树，需要进行比较操作。如果使用自然排序（comparator 为 null），null 无法参与比较，会抛出 NullPointerException。只有提供能处理 null 的自定义 Comparator 时才能存储 null 键。
          </Callout>

          <Callout type="danger" title="误区三：HashMap 的迭代顺序是稳定的">
            <span className="font-semibold text-ink-light">你以为的：</span>HashMap 每次遍历顺序都一样<br />
            <span className="font-semibold text-accent">实际：</span>HashMap 不保证迭代顺序，且顺序可能随时间变化（如扩容后）。如果需要稳定顺序，应使用 LinkedHashMap（保持插入顺序）或 TreeMap（按 key 排序）。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            { question: 'HashMap 和 TreeMap 的区别？如何选择？', answer: 'HashMap 基于哈希表，无序，操作 O(1)，允许 null 键；TreeMap 基于红黑树，按 key 排序，操作 O(log n)，不允许 null 键（默认）。选择原则：通用键值存储用 HashMap；需要排序或范围查询（如 lower/floor/ceiling/higher）用 TreeMap。绝大多数场景 HashMap 性能更好。' },
            { question: '为什么 Map 不属于 Collection 体系？', answer: 'Collection 存储单个元素，Map 存储键值对，两者的语义和操作完全不同。Collection 关注元素的增删查改，Map 关注键值映射关系。它们是平行的接口体系，Map 提供了 keySet()/values()/entrySet() 三个视图方法来桥接到 Collection。' },
            { question: 'TreeMap 如何实现排序？', answer: 'TreeMap 基于红黑树实现，插入元素时根据 key 的比较结果决定在树中的位置。比较方式有两种：1）自然排序：key 实现 Comparable 接口，调用 compareTo() 方法；2）定制排序：构造时传入 Comparator，调用 compare() 方法。遍历时按中序遍历红黑树，自然得到有序序列。' },
            { question: 'LinkedHashMap 如何实现 LRU 缓存？', answer: 'LinkedHashMap 构造函数有一个 accessOrder 参数，设为 true 时按访问顺序排序（最近访问的移到尾部）。重写 removeEldestEntry() 方法，当 map 大小超过阈值时返回 true，自动删除最久未使用的元素（头部）。配合固定容量即可实现 LRU 缓存。' },
            { question: 'ConcurrentHashMap 为什么比 Hashtable 性能好？', answer: 'Hashtable 所有方法都用 synchronized 修饰，整个表一把锁，并发度低。ConcurrentHashMap JDK 7 采用分段锁（Segment），JDK 8 采用 CAS + synchronized 细粒度锁（只锁住桶的头节点），并发度高。此外，ConcurrentHashMap 读操作无锁，性能更优。' },
            { question: '如何遍历 Map？哪种方式最高效？', answer: '1）entrySet() + foreach：推荐，直接获取键值对，避免重复查找；2）keySet() + get()：不推荐，每次 get 都要重新查找；3）forEach 方法：JDK 8+，简洁；4）Iterator：可在遍历时安全删除。最高效的是 entrySet() 遍历，因为一次性获取 key 和 value，无需二次查找。' },
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">← 前置知识</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">📋</span><span>Collection 体系架构</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🗺️</span><span>HashMap 底层原理</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🌳</span><span>红黑树基础</span></div>
              </div>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">延伸知识 →</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔒</span><span>ConcurrentHashMap 并发机制</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔗</span><span>LinkedHashMap 与 LRU 缓存</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">💾</span><span>WeakHashMap 与弱引用</span></div>
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
