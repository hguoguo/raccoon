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
import type { KnowledgeNode, TocItem } from '../../data/types'

const meta: KnowledgeNode = {
  id: 'hashmap',
  title: 'HashMap深度剖析',
  level: 'Senior',
  tags: ['HashMap', '红黑树', '扩容机制', '哈希冲突', 'JDK8'],
  difficulty: 4,
  category: '02-collections',
  prerequisites: ['map-framework'],
  relatedPatterns: ['concurrent-hashmap'],
  readingTime: 40,
}

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、整体架构概述', level: 2 },
  { id: 'structure', text: '二、底层数据结构', level: 2 },
  { id: 'bucket', text: '2.1 数组（桶数组）', level: 3 },
  { id: 'hash', text: '三、哈希计算与索引定位', level: 2 },
  { id: 'put-flow', text: '3.1 put 操作流程', level: 3 },
  { id: 'get-flow', text: '3.2 get 操作流程', level: 3 },
  { id: 'animation', text: '3.3 操作动画演示', level: 3 },
  { id: 'resize', text: '四、扩容机制', level: 2 },
  { id: 'treeify', text: '五、链表转红黑树', level: 2 },
  { id: 'comparison', text: '六、Map 实现对比', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function HashmapDeepDive() {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      {/* Main Article */}
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              HashMap 是基于<strong className="text-accent">哈希表</strong>实现的键值对存储结构，JDK 8 采用
              <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1">数组 + 链表 + 红黑树</code>
              的数据结构，提供 O(1) 平均时间复杂度的查找、插入和删除操作，是非线程安全的。
            </p>
          </blockquote>

          {/* ========== 一、整体架构概述 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、整体架构概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HashMap 是 Java 集合框架中最常用的数据结构之一。它通过哈希函数将 key 映射到数组下标，
            在理想情况下实现常数时间的增删查操作。当哈希冲突导致链表过长时，JDK 8 会将其转换为红黑树以保证最坏情况下的性能。
          </p>

          <Callout type="tip" title="核心要点">
            HashMap 允许 null 键和 null 值，是非线程安全的。在多线程环境下应使用 ConcurrentHashMap 替代。
            它不保证元素的迭代顺序，且顺序可能随时间变化。
          </Callout>

          {/* ========== 二、底层数据结构 ========== */}
          <h2 id="structure" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、底层数据结构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            JDK 8 中 HashMap 的底层数据结构由三部分组成：
          </p>

          {/* Diagram - 数据结构示意图 */}
          <DiagramBlock title="HashMap 数据结构示意图">
            <svg className="w-full max-w-[500px] mx-auto block" viewBox="0 0 500 200">
              <rect x="20" y="10" width="460" height="30" rx="4" fill="#ede4d1" stroke="#d4c5a9"/>
              <text x="40" y="30" fill="#6b5e4c" fontSize="10" fontFamily="monospace">table[]</text>
              <text x="120" y="30" fill="#a99d8e" fontSize="9" fontFamily="monospace">[0]</text>
              <text x="170" y="30" fill="#a99d8e" fontSize="9" fontFamily="monospace">[1]</text>
              <text x="220" y="30" fill="#a99d8e" fontSize="9" fontFamily="monospace">[2]</text>
              <text x="270" y="30" fill="#a99d8e" fontSize="9" fontFamily="monospace">[3]</text>
              <text x="320" y="30" fill="#a99d8e" fontSize="9" fontFamily="monospace">[4]</text>
              <text x="370" y="30" fill="#a99d8e" fontSize="9" fontFamily="monospace">[5]</text>
              <text x="420" y="30" fill="#a99d8e" fontSize="9" fontFamily="monospace">[...]</text>
              <rect x="150" y="52" width="80" height="26" rx="4" fill="rgba(181,101,29,0.10)" stroke="#b5651d"/>
              <text x="168" y="69" fill="#8b4c14" fontSize="9" fontFamily="monospace">key1 → val1</text>
              <line x1="190" y1="78" x2="190" y2="88" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="150" y="88" width="80" height="26" rx="4" fill="rgba(181,101,29,0.10)" stroke="#b5651d"/>
              <text x="168" y="105" fill="#8b4c14" fontSize="9" fontFamily="monospace">key2 → val2</text>
              <line x1="190" y1="114" x2="190" y2="124" stroke="#d4c5a9" strokeWidth="1.5"/>
              <rect x="150" y="124" width="80" height="26" rx="4" fill="rgba(181,101,29,0.10)" stroke="#b5651d"/>
              <text x="168" y="141" fill="#8b4c14" fontSize="9" fontFamily="monospace">key3 → val3</text>
              <circle cx="350" cy="70" r="15" fill="rgba(160,82,45,0.12)" stroke="#a0522d" strokeWidth="1.5"/>
              <text x="343" y="74" fill="#a0522d" fontSize="9" fontFamily="monospace">8</text>
              <circle cx="320" cy="112" r="15" fill="rgba(160,82,45,0.12)" stroke="#a0522d" strokeWidth="1.5"/>
              <text x="313" y="116" fill="#a0522d" fontSize="9" fontFamily="monospace">4</text>
              <circle cx="380" cy="112" r="15" fill="rgba(95,122,104,0.15)" stroke="#5f7a68" strokeWidth="1.5"/>
              <text x="373" y="116" fill="#5f7a68" fontSize="9" fontFamily="monospace">12</text>
              <line x1="343" y1="82" x2="328" y2="99" stroke="#d4c5a9"/>
              <line x1="357" y1="82" x2="372" y2="99" stroke="#d4c5a9"/>
              <text x="100" y="170" fill="#8a7d6b" fontSize="10" fontFamily="monospace">链表 (长度 &lt; 8)</text>
              <text x="310" y="170" fill="#8a7d6b" fontSize="10" fontFamily="monospace">红黑树 (长度 ≥ 8)</text>
            </svg>
          </DiagramBlock>

          {/* 2.1 数组 */}
          <h3 id="bucket" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 数组（桶数组）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HashMap 的主干是一个 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Node&lt;K,V&gt;[]</code> 数组，每个数组元素称为一个<strong className="text-ink-light font-semibold">桶（Bucket）</strong>。数组的默认初始容量为 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">16</code>，负载因子默认为 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">0.75f</code>。
          </p>

          <Playground
            language="Java"
            filename="HashMap.java"
            description="HashMap 核心字段定义"
            highlights={[1, 2, 5]}
            code={`transient Node<K,V>[] table;      // 桶数组
transient int size;                 // 键值对数量
transient int modCount;             // 修改次数（fail-fast）
int threshold;                      // 扩容阈值 = capacity * loadFactor
final float loadFactor;             // 负载因子

// Node 结构（链表节点）
static class Node<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
}

// TreeNode 结构（红黑树节点，继承自 Node）
static final class TreeNode<K,V> extends Node<K,V> {
    TreeNode<K,V> parent;
    TreeNode<K,V> left;
    TreeNode<K,V> right;
    boolean red;
}`}
          />

          <SideNote label="空间开销">
            TreeNode 占用空间是普通 Node 的约 2 倍（多了 parent/left/right/red 四个字段），
            这是为什么不会轻易转为红黑树的原因之一——空间换时间需要权衡。
          </SideNote>

          {/* ========== 三、哈希计算与索引定位 ========== */}
          <h2 id="hash" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、哈希计算与索引定位
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HashMap 的核心在于如何将 key 映射到数组索引。这个过程分为两步：
            <strong className="text-ink-light font-semibold">1) 计算 hash 值</strong> → <strong className="text-ink-light font-semibold">2) 定位桶索引</strong>。
          </p>

          <Callout type="warning" title="扰动函数的重要性">
            JDK 8 的 hash() 方法将高16位与低16位异或（h ^ (h &gt;&gt;&gt; 16)），目的是在数组长度较小时，
            也能让高位参与索引计算，减少哈希冲突。
          </Callout>

          {/* 3.1 put 操作流程 */}
          <h3 id="put-flow" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.1 put 操作流程
          </h3>
          <InteractiveFlow
            title="HashMap put 操作流程"
            steps={[
              { label: '计算hash', description: '调用 hash(key) 方法，对 hashCode 进行扰动处理，高16位与低16位异或', icon: '🔢' },
              { label: '定位桶', description: '通过 (n-1) & hash 计算桶索引，等价于取模但速度更快', icon: '📍' },
              { label: '检查冲突', description: '如果桶为空直接插入；否则遍历链表或红黑树查找相同 key', icon: '🔍' },
              { label: '插入/更新', description: '找到相同 key 则更新 value；未找到则在链表尾部追加（JDK8 尾插法）', icon: '✏️' },
              { label: '判断扩容', description: '如果 size > threshold 则触发 resize() 扩容操作', icon: '📏' },
            ]}
          />

          {/* ContextSwitcher - 简单 vs 深入 */}
          <ContextSwitcher
            simpleContent={
              <div className="p-3 sm:p-4 bg-parchment-warm rounded-paper-md text-[13px] sm:text-[14px] text-ink-muted font-sans leading-[1.8]">
                哈希计算就是把 key 转换成一个数组下标。Java 通过扰动函数让 hash 值分布更均匀，
                然后用位运算快速定位到桶的位置。如果多个 key 映射到同一个桶，就形成了哈希冲突。
              </div>
            }
            hardcoreContent={
              <div className="space-y-3">
                <Playground
                  language="Java"
                  highlights={[2, 5]}
                  code={`// JDK 8 hash 扰动函数
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

// 桶索引计算（等价于取模，但位运算更快）
// 前提：n 是 2 的幂次方
int index = (n - 1) & hash;`}
                />
                <SideNote label="性能分析">
                  扰动函数在 n 较小时效果显著。当 n=16 时，不做扰动只有低4位参与索引计算，
                  冲突概率高；做扰动后高16位也参与，冲突概率大幅降低。
                </SideNote>
              </div>
            }
          />

          {/* 3.2 get 操作流程 */}
          <h3 id="get-flow" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.2 get 操作流程
          </h3>
          <InteractiveFlow
            title="HashMap get 操作流程"
            steps={[
              { label: '计算hash', description: '与 put 相同，调用 hash(key) 计算扰动后的 hash 值', icon: '🔢' },
              { label: '定位桶', description: '通过 (n-1) & hash 找到桶位置，如果桶为空返回 null', icon: '📍' },
              { label: '首节点检查', description: '先检查桶的第一个节点是否匹配（快速路径，命中率高）', icon: '🎯' },
              { label: '遍历查找', description: '首节点不匹配则遍历：链表用 next 引用，红黑树用左/右子树查找', icon: '🔍' },
              { label: '返回结果', description: '找到匹配 key 的节点返回 value，否则返回 null', icon: '📤' },
            ]}
          />

          <Playground
            language="Java"
            filename="HashMap.java"
            description="get 方法源码"
            highlights={[3, 5, 8]}
            code={`public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
    // 1. 桶不为空 且 首节点存在
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) {
        // 2. 快速路径：首节点即目标
        if (first.hash == hash && ((k = first.key) == key || key.equals(k)))
            return first;
        // 3. 遍历：链表 or 红黑树
        if ((e = first.next) != null) {
            if (first instanceof TreeNode)
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);
            do {
                if (e.hash == hash && ((k = e.key) == key || key.equals(k)))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}`}
          />

          {/* 3.3 操作动画演示 */}
          <h3 id="animation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            3.3 操作动画演示
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            通过交互式动画直观理解 put / get / resize 的执行过程。点击步骤按钮逐步观看，或点击播放自动演示。
          </p>

          <HashMapAnimator />

          {/* ========== 四、扩容机制 ========== */}
          <h2 id="resize" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、扩容机制
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">size &gt; threshold</code>（即 size &gt; capacity × loadFactor）时，HashMap 会触发扩容。扩容的核心策略是<strong className="text-ink-light font-semibold">容量翻倍</strong>，并重新分配所有元素。
          </p>

          <InteractiveFlow
            title="resize 扩容流程"
            steps={[
              { label: '触发扩容', description: 'size > threshold 时触发，或链表长度≥8但数组长度<64时也会触发', icon: '🔥' },
              { label: '容量翻倍', description: 'newCap = oldCap << 1，新阈值也翻倍', icon: '📐' },
              { label: '创建新数组', description: '创建 newCap 大小的新 Node 数组', icon: '📦' },
              { label: '元素迁移', description: '遍历旧数组每个桶，将元素迁移到新数组', icon: '🔄' },
              { label: '高低位分流', description: '通过 (hash & oldCap) == 0 判断：0→原位置，1→原位置+旧容量', icon: '⚖️' },
            ]}
          />

          <Callout type="info" title="扩容优化">
            JDK 8 在扩容时不需要重新计算 hash，元素的新位置要么是原索引，要么是原索引 + 旧容量。
            只需判断 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">(hash &amp; oldCap) == 0</code> 即可。
            这种高低位分流方式避免了全量 rehash，效率更高。
          </Callout>

          <Playground
            language="Java"
            filename="HashMap.java"
            description="resize 核心逻辑（简化）"
            highlights={[6, 7, 12, 13]}
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

          {/* ========== 五、链表转红黑树 ========== */}
          <h2 id="treeify" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、链表转红黑树
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            当链表长度超过 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">TREEIFY_THRESHOLD(8)</code> 且数组长度达到 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">MIN_TREEIFY_CAPACITY(64)</code> 时，链表会转换为红黑树，将最坏情况下的查询时间复杂度从 O(n) 优化到 O(log n)。
          </p>

          <InteractiveFlow
            title="链表转红黑树流程"
            steps={[
              { label: '链表长度≥8', description: 'put 时发现链表长度达到 TREEIFY_THRESHOLD(8)', icon: '🔗' },
              { label: '检查数组长度', description: '如果数组长度 < MIN_TREEIFY_CAPACITY(64)，先扩容而非树化', icon: '📐' },
              { label: '树化', description: '数组长度≥64时，将链表转换为红黑树', icon: '🌳' },
              { label: '退化', description: '扩容后红黑树节点数≤UNTREEIFY_THRESHOLD(6)时，退化为链表', icon: '🔗' },
            ]}
          />

          <SideNote label="泊松分布">
            根据泊松分布模型，链表长度达到8的概率仅为 0.00000006，属于极端情况。
            同时，红黑树节点（TreeNode）占用空间是普通 Node 的 2 倍，8 是一个在时间和空间之间的平衡点。
          </SideNote>

          {/* ========== 六、Map 实现对比 ========== */}
          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、Map 实现对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java 集合框架提供了多种 Map 实现，各有侧重。以下是核心差异对比：
          </p>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">特性</th>
                  <th className="text-left py-2.5 px-3 text-accent font-semibold">HashMap</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">TreeMap</th>
                  <th className="text-left py-2.5 px-3 text-rose font-semibold">LinkedHashMap</th>
                  <th className="text-left py-2.5 px-3 text-indigo font-semibold">ConcurrentHashMap</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light">
                  <td className="py-2.5 px-3 font-medium text-ink">底层数据结构</td>
                  <td className="py-2.5 px-3">数组+链表+红黑树</td>
                  <td className="py-2.5 px-3">红黑树</td>
                  <td className="py-2.5 px-3">数组+链表+红黑树+双向链表</td>
                  <td className="py-2.5 px-3">数组+链表+红黑树</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2.5 px-3 font-medium text-ink">是否有序</td>
                  <td className="py-2.5 px-3">❌ 无序</td>
                  <td className="py-2.5 px-3">✅ 按 key 自然排序</td>
                  <td className="py-2.5 px-3">✅ 插入/访问顺序</td>
                  <td className="py-2.5 px-3">❌ 无序</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2.5 px-3 font-medium text-ink">null 键</td>
                  <td className="py-2.5 px-3">✅ 允许</td>
                  <td className="py-2.5 px-3">❌ 不允许</td>
                  <td className="py-2.5 px-3">✅ 允许</td>
                  <td className="py-2.5 px-3">❌ 不允许</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2.5 px-3 font-medium text-ink">线程安全</td>
                  <td className="py-2.5 px-3">❌ 否</td>
                  <td className="py-2.5 px-3">❌ 否</td>
                  <td className="py-2.5 px-3">❌ 否</td>
                  <td className="py-2.5 px-3">✅ 是（分段锁/CAS）</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2.5 px-3 font-medium text-ink">时间复杂度</td>
                  <td className="py-2.5 px-3">O(1) 平均</td>
                  <td className="py-2.5 px-3">O(log n)</td>
                  <td className="py-2.5 px-3">O(1) 平均</td>
                  <td className="py-2.5 px-3">O(1) 平均</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-ink">适用场景</td>
                  <td className="py-2.5 px-3">通用键值存储</td>
                  <td className="py-2.5 px-3">范围查询/排序遍历</td>
                  <td className="py-2.5 px-3">需要迭代顺序</td>
                  <td className="py-2.5 px-3">高并发读写</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="tip" title="选型建议">
            日常开发首选 HashMap；需要排序用 TreeMap；需要保持插入/访问顺序用 LinkedHashMap；
            多线程场景用 ConcurrentHashMap。不要用 HashTable（已过时）或 Collections.synchronizedMap()（性能差）。
          </Callout>

          {/* ========== 七、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区一：链表长度达到 8 就转红黑树">
            <span className="font-semibold text-ink-light">你以为的：</span>链表长度 ≥ 8 → 树化<br />
            <span className="font-semibold text-accent">实际：</span>链表长度 ≥ 8 <strong>且</strong> 数组长度 ≥ 64 时才树化。数组长度不足 64 时会<strong>先扩容</strong>而非树化。
            这一点经常被面试官考察。
          </Callout>

          <Callout type="danger" title="误区二：负载因子 0.75 是阈值">
            <span className="font-semibold text-ink-light">你以为的：</span>0.75 是某个阈值<br />
            <span className="font-semibold text-accent">实际：</span>0.75 是<strong>扩容触发比例</strong>，即 size / capacity 的比值。
            当 size &gt; capacity × 0.75 时触发扩容，0.75 本身不是阈值。threshold = capacity × loadFactor 才是阈值。
          </Callout>

          <Callout type="danger" title="误区三：HashMap 是线程安全的">
            <span className="font-semibold text-ink-light">你以为的：</span>日常使用没出问题，应该是安全的<br />
            <span className="font-semibold text-accent">实际：</span>JDK 7 多线程扩容会死循环（链表成环）；JDK 8 修复了成环但仍有数据覆盖风险——
            两个线程同时判断桶位置为 null，后写入的覆盖先写入的值。
          </Callout>

          <Callout type="danger" title="误区四：容量一定是传入的初始值">
            <span className="font-semibold text-ink-light">你以为的：</span>new HashMap{'<>'}(10) 容量就是 10<br />
            <span className="font-semibold text-accent">实际：</span>HashMap 会将传入的容量向上取整为 2 的幂次方。new HashMap{'<>'}(10) 实际容量为 16，
            new HashMap{'<>'}(17) 实际容量为 32。这是为了配合位运算计算索引。
          </Callout>

          {/* ========== 八、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'HashMap 的默认初始容量和负载因子是多少？为什么这样设计？',
                answer: '默认初始容量为 16，负载因子为 0.75。容量选择 2 的幂次方是为了配合位运算高效计算索引：index = (n-1) & hash，等价于取模但速度更快。负载因子 0.75 是时间和空间的折中——太大则哈希冲突多，太小则浪费空间。',
              },
              {
                question: 'HashMap 为什么线程不安全？会出现什么问题？',
                answer: 'JDK 7 中多线程并发扩容会导致链表成环（死循环）；JDK 8 修复了成环问题但仍有数据覆盖风险——两个线程同时判断 hash 冲突位置为 null，后写入的会覆盖先写入的值。',
              },
              {
                question: '为什么链表转红黑树的阈值是 8？退化阈值为什么是 6？',
                answer: '阈值 8：根据泊松分布，链表长度达到 8 的概率仅为 0.00000006，属于极端情况；TreeNode 占用空间是 Node 的 2 倍，8 是时间与空间的平衡点。退化阈值 6（而非 8）：避免频繁在链表和红黑树之间切换（中间有 7 的缓冲区），减少树化/退化的性能开销。',
              },
              {
                question: 'HashMap 的扩容机制是怎样的？JDK 8 做了哪些优化？',
                answer: '当 size 超过 threshold 时触发扩容，容量翻倍。JDK 8 的优化：1）不需要重新计算 hash，元素新位置要么是原索引，要么是原索引+旧容量，通过 (hash & oldCap) == 0 判断；2）使用尾插法替代头插法，避免了并发扩容时的链表成环问题；3）红黑树的 split 方法处理树的分裂。',
              },
              {
                question: 'HashMap 中 hash 方法的实现？为什么要用扰动函数？',
                answer: 'hash() 方法：(h = key.hashCode()) ^ (h >>> 16)。将高 16 位与低 16 位异或作为扰动。原因：数组长度较小时（如 16），只有低 4 位参与索引计算，高位特征被丢弃，冲突概率高。扰动后高位也参与计算，显著降低冲突率。',
              },
              {
                question: '为什么 HashMap 的容量必须是 2 的幂次方？',
                answer: '1）位运算替代取模：index = (n-1) & hash 等价于 hash % n，但位运算更快；2）n 为 2 的幂时，n-1 的二进制全是 1（如 15 = 1111），与 hash 做 & 运算能均匀分布；3）扩容时高低位分流依赖这个特性——(hash & oldCap) 只有两个结果（0 或 oldCap），元素要么留在原位，要么偏移 oldCap。',
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
                  <span className="text-sm">📋</span>
                  <span>Collection 接口体系</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans">
                  <span className="text-sm">🔢</span>
                  <span>hashCode() 与 equals() 契约</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans">
                  <span className="text-sm">🌳</span>
                  <span>红黑树基础原理</span>
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
                  <span className="text-sm">🔒</span>
                  <span>ConcurrentHashMap 源码分析</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans">
                  <span className="text-sm">🔗</span>
                  <span>LinkedHashMap 与 LRU 缓存</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans">
                  <span className="text-sm">🌳</span>
                  <span>TreeMap 与排序遍历</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Navigation */}
          <ArticleNav
            prevTitle="Collection接口体系"
            prevPath="/docs/02-collections/collection-framework"
            nextTitle="ConcurrentHashMap源码分析"
            nextPath="/docs/02-collections/concurrent-hashmap"
          />
        </KnowledgeLayout>
      </div>

      {/* TOC (Desktop sidebar + Mobile bottom sheet handled internally) */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
