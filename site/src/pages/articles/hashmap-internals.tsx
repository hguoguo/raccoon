import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import InteractiveFlow from '../../components/knowledge/InteractiveFlow'
import SideNote from '../../components/knowledge/SideNote'
import ContextSwitcher from '../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../components/knowledge/SmartTOC'
import HashMapAnimator from '../../components/knowledge/HashMapAnimator'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、HashMap 整体架构', level: 2 },
  { id: 'structure', text: '二、底层数据结构演进', level: 2 },
  { id: 'jdk7-vs-jdk8', text: '2.1 JDK 7 vs JDK 8', level: 3 },
  { id: 'hash-calculation', text: '三、哈希计算与索引定位', level: 2 },
  { id: 'disturb-function', text: '3.1 扰动函数详解', level: 3 },
  { id: 'index-calculation', text: '3.2 索引计算优化', level: 3 },
  { id: 'put-mechanism', text: '四、put 操作深度解析', level: 2 },
  { id: 'collision-handling', text: '4.1 哈希冲突处理', level: 3 },
  { id: 'treeify-threshold', text: '4.2 链表转红黑树', level: 3 },
  { id: 'resize-mechanism', text: '五、扩容机制深度剖析', level: 2 },
  { id: 'resize-trigger', text: '5.1 扩容触发条件', level: 3 },
  { id: 'high-low-split', text: '5.2 高低位分流算法', level: 3 },
  { id: 'thread-safety', text: '六、线程安全问题', level: 2 },
  { id: 'jdk7-dead-loop', text: '6.1 JDK 7 死循环问题', level: 3 },
  { id: 'jdk8-data-loss', text: '6.2 JDK 8 数据覆盖问题', level: 3 },
  { id: 'performance', text: '七、性能优化技巧', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function HashmapInternals({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              HashMap 是基于<strong className="text-accent">哈希表</strong>实现的键值对存储结构，JDK 8 采用
              <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1">数组 + 链表 + 红黑树</code>
              的混合数据结构，通过扰动函数、高低位分流等优化策略，提供 O(1) 平均时间复杂度的查找、插入和删除操作。
            </p>
          </blockquote>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、HashMap 整体架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HashMap 是 Java 集合框架中最常用的数据结构之一。它通过哈希函数将 key 映射到数组下标，在理想情况下实现常数时间的增删查操作。当哈希冲突导致链表过长时，JDK 8 会将其转换为红黑树以保证最坏情况下的性能。
          </p>

          <DiagramBlock title="HashMap 整体架构图">
            <svg className="w-full max-w-[500px] mx-auto block" viewBox="0 0 500 220">
              <rect x="20" y="10" width="460" height="30" rx="4" fill="#ede4d1" stroke="#d4c5a9"/>
              <text x="40" y="30" fill="#6b5e4c" fontSize="10" fontFamily="monospace">table[] (capacity=16)</text>
              
              <rect x="20" y="50" width="60" height="30" rx="4" fill="#f5f0e8" stroke="#d4c5a9"/>
              <text x="50" y="70" fill="#a99d8e" fontSize="9" fontFamily="monospace" textAnchor="middle">[0]</text>
              
              <rect x="80" y="50" width="60" height="30" rx="4" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="110" y="70" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">[1]</text>
              <line x1="110" y1="80" x2="110" y2="100" stroke="#b5651d" strokeWidth="1.5"/>
              <rect x="80" y="100" width="60" height="25" rx="4" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="110" y="117" fill="#8b4c14" fontSize="8" fontFamily="monospace" textAnchor="middle">Node1</text>
              <line x1="110" y1="125" x2="110" y2="140" stroke="#b5651d" strokeWidth="1.5"/>
              <rect x="80" y="140" width="60" height="25" rx="4" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="110" y="157" fill="#8b4c14" fontSize="8" fontFamily="monospace" textAnchor="middle">Node2</text>
              
              <rect x="140" y="50" width="60" height="30" rx="4" fill="#f5f0e8" stroke="#d4c5a9"/>
              <text x="170" y="70" fill="#a99d8e" fontSize="9" fontFamily="monospace" textAnchor="middle">[2]</text>
              
              <rect x="200" y="50" width="60" height="30" rx="4" fill="rgba(160,82,45,0.12)" stroke="#a0522d"/>
              <text x="230" y="70" fill="#a0522d" fontSize="9" fontFamily="monospace" textAnchor="middle">[3]</text>
              <circle cx="230" cy="100" r="12" fill="rgba(160,82,45,0.12)" stroke="#a0522d" strokeWidth="1.5"/>
              <text x="230" y="104" fill="#a0522d" fontSize="8" fontFamily="monospace" textAnchor="middle">8</text>
              <line x1="222" y1="110" x2="210" y2="125" stroke="#a0522d"/>
              <line x1="238" y1="110" x2="250" y2="125" stroke="#a0522d"/>
              <circle cx="200" cy="140" r="12" fill="rgba(95,122,104,0.15)" stroke="#5f7a68" strokeWidth="1.5"/>
              <text x="200" y="144" fill="#5f7a68" fontSize="8" fontFamily="monospace" textAnchor="middle">4</text>
              <circle cx="260" cy="140" r="12" fill="rgba(95,122,104,0.15)" stroke="#5f7a68" strokeWidth="1.5"/>
              <text x="260" y="144" fill="#5f7a68" fontSize="8" fontFamily="monospace" textAnchor="middle">12</text>
              <text x="230" y="170" fill="#a0522d" fontSize="8" fontFamily="monospace" textAnchor="middle">红黑树</text>
              
              <rect x="260" y="50" width="60" height="30" rx="4" fill="#f5f0e8" stroke="#d4c5a9"/>
              <text x="290" y="70" fill="#a99d8e" fontSize="9" fontFamily="monospace" textAnchor="middle">[4]</text>
              
              <rect x="320" y="50" width="60" height="30" rx="4" fill="#f5f0e8" stroke="#d4c5a9"/>
              <text x="350" y="70" fill="#a99d8e" fontSize="9" fontFamily="monospace" textAnchor="middle">[...]</text>
              
              <text x="20" y="200" fill="#8a7d6b" fontSize="9" fontFamily="monospace">橙色: 链表（长度 &lt; 8）</text>
              <text x="250" y="200" fill="#8a7d6b" fontSize="9" fontFamily="monospace">棕色: 红黑树（长度 ≥ 8）</text>
            </svg>
          </DiagramBlock>

          <Callout type="tip" title="核心要点">
            HashMap 允许 null 键和 null 值，是非线程安全的。在多线程环境下应使用 ConcurrentHashMap 替代。
            它不保证元素的迭代顺序，且顺序可能随时间变化。
          </Callout>

          <h2 id="structure" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、底层数据结构演进
          </h2>

          <h3 id="jdk7-vs-jdk8" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 JDK 7 vs JDK 8
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HashMap 的底层数据结构在 JDK 7 和 JDK 8 之间有重大改进：
          </p>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">特性</th>
                  <th className="text-left py-2.5 px-3 text-orange font-semibold">JDK 7</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">JDK 8+</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">数据结构</td><td className="py-2.5 px-3">数组 + 链表</td><td className="py-2.5 px-3">数组 + 链表 + 红黑树</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">插入方式</td><td className="py-2.5 px-3">头插法</td><td className="py-2.5 px-3">尾插法</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">扩容死循环</td><td className="py-2.5 px-3 font-mono text-red-700">存在</td><td className="py-2.5 px-3 font-mono text-green-700">已修复</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">最坏时间复杂度</td><td className="py-2.5 px-3 font-mono text-red-700">O(n)</td><td className="py-2.5 px-3 font-mono text-green-700">O(log n)</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">树化阈值</td><td className="py-2.5 px-3">无</td><td className="py-2.5 px-3">链表长度 ≥ 8 且数组长度 ≥ 64</td></tr>
              </tbody>
            </table>
          </div>

          <Playground language="java" filename="HashMap.java" description="HashMap 核心字段" highlights={[1, 3, 5, 8]}
            code={`public class HashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>, Cloneable, Serializable {
    // 桶数组（JDK 8 引入 transient 避免序列化整个数组）
    transient Node<K,V>[] table;
    
    // 实际元素数量
    transient int size;
    
    // 修改次数（fail-fast 迭代器）
    transient int modCount;
    
    // 扩容阈值 = capacity * loadFactor
    int threshold;
    
    // 负载因子（默认 0.75）
    final float loadFactor;
    
    // 常量定义
    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;  // 16
    static final int MAXIMUM_CAPACITY = 1 << 30;         // 2^30
    static final float DEFAULT_LOAD_FACTOR = 0.75f;
    static final int TREEIFY_THRESHOLD = 8;              // 树化阈值
    static final int UNTREEIFY_THRESHOLD = 6;            // 退化阈值
    static final int MIN_TREEIFY_CAPACITY = 64;          // 最小树化容量
}`}
          />

          <SideNote label="为什么选择 0.75 作为默认负载因子？">
            根据泊松分布模型，负载因子 0.75 时，链表长度达到 8 的概率仅为 0.00000006，属于极端情况。
            这个值在时间和空间之间取得了平衡：太大则哈希冲突多，查询性能下降；太小则浪费空间，频繁扩容。
          </SideNote>

          <h2 id="hash-calculation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、哈希计算与索引定位
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HashMap 的核心在于如何将 key 映射到数组索引。这个过程分为两步：
            <strong className="text-ink-light font-semibold">1) 计算 hash 值</strong> → <strong className="text-ink-light font-semibold">2) 定位桶索引</strong>。
          </p>

          <h3 id="disturb-function" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 扰动函数详解
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JDK 8 的 hash() 方法将高 16 位与低 16 位异或（h ^ (h &gt;&gt;&gt; 16)），目的是在数组长度较小时，也能让高位参与索引计算，减少哈希冲突。
          </p>

          <ContextSwitcher
            simpleContent={
              <div className="p-3 sm:p-4 bg-parchment-warm rounded-paper-md text-[13px] sm:text-[14px] text-ink-muted font-sans leading-[1.8]">
                扰动函数就是把 key 的 hashCode 的高位和低位混合一下，让 hash 值分布更均匀。如果不做扰动，当数组长度较小时（如 16），只有低 4 位参与索引计算，高位特征被丢弃，容易冲突。
              </div>
            }
            hardcoreContent={
              <div className="space-y-3">
                <Playground language="java" filename="HashMap.java" description="JDK 8 hash 扰动函数" highlights={[3]}
                  code={`static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

// 示例：假设 hashCode = 0x12345678
// 不做扰动：只用低 4 位（n=16 时），即 0x8
// 做扰动后：0x12345678 ^ 0x00001234 = 0x1234444C
// 再用低 4 位：0xC，分布更均匀`}
                />
                <SideNote label="性能分析">
                  扰动函数在 n 较小时效果显著。当 n=16 时，不做扰动只有低 4 位参与索引计算，冲突概率高；做扰动后高 16 位也参与，冲突概率大幅降低。当 n 较大时（如 1024），低 10 位已经足够分散，扰动效果减弱。
                </SideNote>
              </div>
            }
          />

          <h3 id="index-calculation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 索引计算优化
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            得到 hash 值后，需要计算桶索引。HashMap 使用位运算替代取模：<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">index = (n - 1) &amp; hash</code>，等价于 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">hash % n</code>，但位运算速度更快。
          </p>

          <Callout type="warning" title="为什么容量必须是 2 的幂次方？">
            只有当 n 是 2 的幂次方时，<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">(n - 1)</code> 的二进制才全是 1（如 15 = 1111），与 hash 做 &amp; 运算才能等价于取模。如果 n 不是 2 的幂，会导致某些位置永远无法被映射到，浪费空间。
          </Callout>

          <h2 id="put-mechanism" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、put 操作深度解析
          </h2>

          <InteractiveFlow title="HashMap put 完整流程" steps={[
            { label: '计算 hash', description: '调用 hash(key)，对 hashCode 进行扰动处理', icon: '🔢' },
            { label: '检查初始化', description: '如果 table 为 null 或长度为 0，调用 resize() 初始化', icon: '📦' },
            { label: '定位桶', description: '通过 (n-1) & hash 计算桶索引', icon: '📍' },
            { label: '检查首节点', description: '如果桶为空直接插入；否则检查首节点是否匹配', icon: '🎯' },
            { label: '遍历查找', description: '遍历链表或红黑树，查找相同 key', icon: '🔍' },
            { label: '插入或更新', description: '找到相同 key 则更新 value；未找到则在尾部追加', icon: '✏️' },
            { label: '判断树化', description: '如果链表长度 ≥ 8 且数组长度 ≥ 64，转为红黑树', icon: '🌳' },
            { label: '判断扩容', description: '如果 size > threshold，调用 resize() 扩容', icon: '📏' },
          ]} />

          <h3 id="collision-handling" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.1 哈希冲突处理
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当多个 key 映射到同一个桶时，发生哈希冲突。JDK 8 采用<strong className="text-ink-light font-semibold">链地址法</strong>解决冲突：将冲突的元素组织成链表或红黑树。
          </p>

          <Playground language="java" filename="HashMap.java" description="putVal 核心逻辑（简化）" highlights={[5, 10, 15, 20]}
            code={`final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    
    // 1. 初始化或扩容
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    
    // 2. 桶为空，直接插入
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    else {
        Node<K,V> e; K k;
        
        // 3. 首节点匹配，直接覆盖
        if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
        // 4. 红黑树节点，调用树插入
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        // 5. 链表遍历
        else {
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    // 尾部插入（JDK 8 尾插法）
                    p.next = newNode(hash, key, value, null);
                    // 判断是否树化
                    if (binCount >= TREEIFY_THRESHOLD - 1)
                        treeifyBin(tab, hash);
                    break;
                }
                // 找到相同 key，跳出循环
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                p = e;
            }
        }
        
        // 6. 更新已有 key 的 value
        if (e != null) {
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            afterNodeAccess(e);
            return oldValue;
        }
    }
    
    ++modCount;
    // 7. 判断是否需要扩容
    if (++size > threshold)
        resize();
    afterNodeInsertion(evict);
    return null;
}`}
          />

          <h3 id="treeify-threshold" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            4.2 链表转红黑树
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当链表长度超过 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">TREEIFY_THRESHOLD(8)</code> 且数组长度达到 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">MIN_TREEIFY_CAPACITY(64)</code> 时，链表会转换为红黑树，将最坏情况下的查询时间复杂度从 O(n) 优化到 O(log n)。
          </p>

          <InteractiveFlow title="链表转红黑树流程" steps={[
            { label: '链表长度≥8', description: 'put 时发现链表长度达到 TREEIFY_THRESHOLD(8)', icon: '🔗' },
            { label: '检查数组长度', description: '如果数组长度 < MIN_TREEIFY_CAPACITY(64)，先扩容而非树化', icon: '📐' },
            { label: '树化', description: '数组长度≥64时，将链表转换为红黑树', icon: '🌳' },
            { label: '退化', description: '扩容后红黑树节点数≤UNTREEIFY_THRESHOLD(6)时，退化为链表', icon: '🔗' },
          ]} />

          <SideNote label="为什么树化阈值是 8，退化阈值是 6？">
            根据泊松分布，链表长度达到 8 的概率仅为 0.00000006，属于极端情况。同时，红黑树节点（TreeNode）占用空间是普通 Node 的 2 倍，8 是一个在时间和空间之间的平衡点。退化阈值设为 6（而非 8）是为了避免频繁在链表和红黑树之间切换（中间有 7 的缓冲区），减少树化/退化的性能开销。
          </SideNote>

          <h2 id="resize-mechanism" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、扩容机制深度剖析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">size &gt; threshold</code>（即 size &gt; capacity × loadFactor）时，HashMap 会触发扩容。扩容的核心策略是<strong className="text-ink-light font-semibold">容量翻倍</strong>，并重新分配所有元素。
          </p>

          <h3 id="resize-trigger" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.1 扩容触发条件
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HashMap 在以下两种情况下会触发扩容：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">🔥 主要触发条件</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">1️⃣</span><span><strong className="text-ink-light">size &gt; threshold</strong>：元素数量超过扩容阈值</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">2️⃣</span><span><strong className="text-ink-light">初始化</strong>：首次 put 时 table 为 null</span></li>
              </ul>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">⚠️ 特殊触发条件</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">3️⃣</span><span><strong className="text-ink-light">链表长度≥8 但数组&lt;64</strong>：优先扩容而非树化</span></li>
              </ul>
            </div>
          </div>

          <h3 id="high-low-split" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            5.2 高低位分流算法
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JDK 8 在扩容时不需要重新计算 hash，元素的新位置要么是原索引，要么是原索引 + 旧容量。只需判断 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">(hash &amp; oldCap) == 0</code> 即可。这种<strong className="text-ink-light font-semibold">高低位分流</strong>方式避免了全量 rehash，效率更高。
          </p>

          <Playground language="java" filename="HashMap.java" description="resize 高低位分流核心逻辑" highlights={[8, 12, 16]}
            code={`final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;

    if (oldCap > 0) {
        newCap = oldCap << 1;          // 容量翻倍
        newThr = oldThr << 1;          // 阈值翻倍
    }
    // ... 省略初始化逻辑 ...

    Node<K,V>[] newTab = new Node[newCap];  // 新数组
    
    // 迁移每个桶
    for (int j = 0; j < oldCap; ++j) {
        Node<K,V> e;
        if ((e = oldTab[j]) != null) {
            oldTab[j] = null;
            if (e.next == null)
                // 单节点：直接放入新位置
                newTab[e.hash & (newCap - 1)] = e;
            else if (e instanceof TreeNode)
                // 红黑树：split 分裂
                ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
            else {
                // 链表：高低位分流
                Node<K,V> loHead = null, loTail = null;  // 低位链表
                Node<K,V> hiHead = null, hiTail = null;  // 高位链表
                do {
                    if ((e.hash & oldCap) == 0) {
                        // 低位：新位置 = 原索引
                        if (loTail == null) loHead = e; else loTail.next = e;
                        loTail = e;
                    } else {
                        // 高位：新位置 = 原索引 + oldCap
                        if (hiTail == null) hiHead = e; else hiTail.next = e;
                        hiTail = e;
                    }
                } while ((e = e.next) != null);
                if (loTail != null) { loTail.next = null; newTab[j] = loHead; }
                if (hiTail != null) { hiTail.next = null; newTab[j + oldCap] = hiHead; }
            }
        }
    }
    return newTab;
}`}
          />

          <Callout type="info" title="高低位分流原理">
            扩容后容量翻倍，新容量的二进制比旧容量多一位。例如 oldCap=16 (10000)，newCap=32 (100000)。对于任意 hash 值，<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">(hash &amp; oldCap)</code> 的结果只有两种：0 或 oldCap。如果为 0，说明新增的那一位是 0，元素留在原位置；如果为 oldCap，说明新增位是 1，元素移到原位置 + oldCap。
          </Callout>

          <h2 id="thread-safety" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、线程安全问题
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HashMap 是非线程安全的，在多线程环境下会出现严重问题。JDK 7 和 JDK 8 的问题表现不同：
          </p>

          <h3 id="jdk7-dead-loop" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.1 JDK 7 死循环问题
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JDK 7 采用<strong className="text-ink-light font-semibold">头插法</strong>插入链表，多线程并发扩容时可能导致链表成环，后续 get 操作进入死循环，CPU 飙升到 100%。
          </p>

          <Callout type="danger" title="JDK 7 死循环场景">
            线程 A 和 B 同时检测到需要扩容，各自创建新数组。线程 A 在处理某个桶时，将链表节点逐个头插到新数组；线程 B 也在处理同一个桶，由于头插法会反转链表顺序，两个线程的操作交织在一起，最终形成环形链表。后续任何线程调用 get() 遍历该链表时，都会陷入无限循环。
          </Callout>

          <h3 id="jdk8-data-loss" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            6.2 JDK 8 数据覆盖问题
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JDK 8 改为<strong className="text-ink-light font-semibold">尾插法</strong>，避免了死循环问题，但仍存在数据覆盖风险：两个线程同时判断桶位置为 null，后写入的会覆盖先写入的值，导致数据丢失。
          </p>

          <Playground language="java" filename="ConcurrentIssue.java" description="JDK 8 数据覆盖场景"
            code={`// 线程 A 和 B 同时执行 put("key", "valueA") 和 put("key", "valueB")

// 1. 两个线程同时计算 hash，得到相同的桶索引 i
int i = (n - 1) & hash;

// 2. 两个线程同时判断 tab[i] == null
if ((p = tab[i]) == null)
    tab[i] = newNode(hash, key, value, null);

// 3. 线程 A 先写入：tab[i] = nodeA
// 4. 线程 B 后写入：tab[i] = nodeB（覆盖了 nodeA）
// 结果：线程 A 的数据丢失！`}
          />

          <Callout type="tip" title="解决方案">
            多线程环境下应使用 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">ConcurrentHashMap</code> 替代 HashMap。ConcurrentHashMap JDK 8 采用 CAS + synchronized 细粒度锁，既保证了线程安全，又保持了高并发性能。
          </Callout>

          <h2 id="performance" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、性能优化技巧
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-green-700 font-sans mb-3">✅ 推荐做法</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>预知大小则指定 initialCapacity</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>自定义对象作为 key 时重写 hashCode 和 equals</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>遍历时用 entrySet() 而非 keySet() + get()</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>多线程用 ConcurrentHashMap</span></li>
              </ul>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-red-700 font-sans mb-3">❌ 避免做法</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要使用可变对象作为 key</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要在迭代时直接修改 HashMap</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要用 HashMap 存储敏感数据（非线程安全）</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要忽略 hashCode 分布不均的问题</span></li>
              </ul>
            </div>
          </div>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区一：链表长度达到 8 就转红黑树">
            <span className="font-semibold text-ink-light">你以为的：</span>链表长度 ≥ 8 → 树化<br />
            <span className="font-semibold text-accent">实际：</span>链表长度 ≥ 8 <strong>且</strong> 数组长度 ≥ 64 时才树化。数组长度不足 64 时会<strong>先扩容</strong>而非树化。这一点经常被面试官考察。
          </Callout>

          <Callout type="danger" title="误区二：HashMap 扩容是 2 倍">
            <span className="font-semibold text-ink-light">你以为的：</span>HashMap 每次扩容翻倍<br />
            <span className="font-semibold text-accent">实际：</span>HashMap 扩容确实是 2 倍（<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">newCap = oldCap &lt;&lt; 1</code>），但 ArrayList 扩容是 1.5 倍。不要混淆两者。
          </Callout>

          <Callout type="danger" title="误区三：HashMap 是线程安全的">
            <span className="font-semibold text-ink-light">你以为的：</span>日常使用没出问题，应该是安全的<br />
            <span className="font-semibold text-accent">实际：</span>JDK 7 多线程扩容会死循环（链表成环）；JDK 8 修复了成环但仍有数据覆盖风险——两个线程同时判断桶位置为 null，后写入的覆盖先写入的值。
          </Callout>

          <Callout type="danger" title="误区四：hashCode 相同 equals 一定相同">
            <span className="font-semibold text-ink-light">你以为的：</span>hashCode 相同的对象 equals 也相同<br />
            <span className="font-semibold text-accent">实际：</span>hashCode 相同只是 equals 相同的必要条件，而非充分条件。不同对象可能有相同 hashCode（哈希冲突），但 equals 返回 false。Java 规范规定：如果 equals 相等，hashCode 必须相同；但 hashCode 相同，equals 不一定相等。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection questions={[
            { question: 'HashMap 的默认初始容量和负载因子是多少？为什么这样设计？', answer: '默认初始容量为 16，负载因子为 0.75。容量选择 2 的幂次方是为了配合位运算高效计算索引：index = (n-1) & hash，等价于取模但速度更快。负载因子 0.75 是时间和空间的折中——太大则哈希冲突多，太小则浪费空间。根据泊松分布，0.75 时链表长度达到 8 的概率仅为 0.00000006。' },
            { question: 'HashMap 为什么线程不安全？会出现什么问题？', answer: 'JDK 7 中多线程并发扩容会导致链表成环（死循环），原因是头插法反转链表顺序，两个线程操作交织形成环；JDK 8 修复了成环问题（改用尾插法）但仍有数据覆盖风险——两个线程同时判断 hash 冲突位置为 null，后写入的会覆盖先写入的值。多线程环境应使用 ConcurrentHashMap。' },
            { question: '为什么链表转红黑树的阈值是 8？退化阈值为什么是 6？', answer: '阈值 8：根据泊松分布，链表长度达到 8 的概率仅为 0.00000006，属于极端情况；TreeNode 占用空间是 Node 的 2 倍，8 是时间与空间的平衡点。退化阈值 6（而非 8）：避免频繁在链表和红黑树之间切换（中间有 7 的缓冲区），减少树化/退化的性能开销。' },
            { question: 'HashMap 的扩容机制是怎样的？JDK 8 做了哪些优化？', answer: '当 size 超过 threshold 时触发扩容，容量翻倍。JDK 8 的优化：1）不需要重新计算 hash，元素新位置要么是原索引，要么是原索引+旧容量，通过 (hash & oldCap) == 0 判断（高低位分流）；2）使用尾插法替代头插法，避免了并发扩容时的链表成环问题；3）红黑树的 split 方法处理树的分裂。' },
            { question: 'HashMap 中 hash 方法的实现？为什么要用扰动函数？', answer: 'hash() 方法：(h = key.hashCode()) ^ (h >>> 16)。将高 16 位与低 16 位异或作为扰动。原因：数组长度较小时（如 16），只有低 4 位参与索引计算，高位特征被丢弃，冲突概率高。扰动后高位也参与计算，显著降低冲突率。当 n 较大时（如 1024），低 10 位已经足够分散，扰动效果减弱。' },
            { question: '为什么 HashMap 的容量必须是 2 的幂次方？', answer: '1）位运算替代取模：index = (n-1) & hash 等价于 hash % n，但位运算更快；2）n 为 2 的幂时，n-1 的二进制全是 1（如 15 = 1111），与 hash 做 & 运算能均匀分布；3）扩容时高低位分流依赖这个特性——(hash & oldCap) 只有两个结果（0 或 oldCap），元素要么留在原位，要么偏移 oldCap。如果 n 不是 2 的幂，会导致某些位置永远无法被映射到，浪费空间。' },
            { question: 'JDK 7 和 JDK 8 的 HashMap 有什么区别？', answer: '1）数据结构：JDK 7 是数组+链表，JDK 8 是数组+链表+红黑树；2）插入方式：JDK 7 头插法，JDK 8 尾插法；3）扩容死循环：JDK 7 存在，JDK 8 已修复；4）最坏时间复杂度：JDK 7 是 O(n)，JDK 8 是 O(log n)（树化后）；5）树化机制：JDK 8 引入，链表长度≥8 且数组长度≥64 时转为红黑树。' },
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">← 前置知识</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">📋</span><span>Collection 体系架构</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔢</span><span>hashCode 与 equals 契约</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🌳</span><span>红黑树基础原理</span></div>
              </div>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">延伸知识 →</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔒</span><span>ConcurrentHashMap 源码分析</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔗</span><span>LinkedHashMap 与 LRU 缓存</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🌳</span><span>TreeMap 与排序遍历</span></div>
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
