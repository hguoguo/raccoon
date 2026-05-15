import{j as e,g as o}from"./index-hyqxTCwJ.js";import{K as i}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{I as a}from"./InteractiveFlow-GAP1pk49.js";import{S as r}from"./SideNote-BKvanovA.js";import{C as l}from"./ContextSwitcher-Cjd-h5IL.js";import{C as t,A as x,S as d}from"./ArticleNav-DhfiS38Y.js";import{D as p}from"./DiagramBlock-CLaKE9_7.js";import{I as c}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、Collection 体系全景图",level:2},{id:"hierarchy",text:"二、核心接口层次结构",level:2},{id:"collection",text:"2.1 Collection 根接口",level:3},{id:"list-interface",text:"2.2 List 接口",level:3},{id:"set-interface",text:"2.3 Set 接口",level:3},{id:"queue-interface",text:"2.4 Queue 接口",level:3},{id:"map-separate",text:"三、Map 体系的独立性",level:2},{id:"design-patterns",text:"四、设计模式应用",level:2},{id:"iterator-pattern",text:"4.1 迭代器模式",level:3},{id:"adapter-pattern",text:"4.2 适配器模式",level:3},{id:"performance",text:"五、性能特征对比",level:2},{id:"thread-safety",text:"六、线程安全策略",level:2},{id:"misconceptions",text:"七、常见误区",level:2},{id:"interview",text:"八、面试真题",level:2},{id:"related",text:"九、知识关联",level:2}];function L({meta:n}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(i,{meta:n,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Java Collection Framework 是一套统一的",e.jsx("strong",{className:"text-accent",children:"数据结构抽象体系"}),"，通过接口与实现分离的设计， 提供 List、Set、Queue 三大集合类型及 Map 键值对存储，内置丰富的算法工具类，是 Java 数据操作的核心基础设施。"]})}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、Collection 体系全景图"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java 集合框架自 JDK 1.2 引入，由 Joshua Bloch 主导设计。它采用",e.jsx("strong",{className:"text-ink-light font-semibold",children:"接口驱动"}),"的架构， 将数据结构的抽象行为（接口）与具体实现（实现类）彻底解耦，使得开发者可以面向接口编程，轻松替换底层实现而不影响业务逻辑。"]}),e.jsxs(t,{type:"tip",title:"核心价值",children:["Collection Framework 的价值不仅在于提供了现成的数据结构，更在于建立了一套",e.jsx("strong",{children:"统一的操作规范"}),"： 所有集合都支持迭代、查找、排序等通用操作，配合 Collections 工具类，实现了代码的高度复用和一致性。"]}),e.jsx(p,{title:"Java Collection Framework 体系架构图",children:`graph TD
    Collection["«interface» Collection"] --> List["«interface» List"]
    Collection --> Set["«interface» Set"]
    Collection --> Queue["«interface» Queue"]

    List --> ArrayList
    List --> LinkedList

    Set --> HashSet
    Set --> TreeSet

    Queue --> PriorityQueue

    Map["«interface» Map 🟢"] --> HashMap
    Map --> TreeMap

    style Collection fill:#b5651d,stroke:#8b4c14,color:#fff
    style List fill:#ede4d1,stroke:#b5651d,color:#8b4c14
    style Set fill:#ede4d1,stroke:#b5651d,color:#8b4c14
    style Queue fill:#ede4d1,stroke:#b5651d,color:#8b4c14
    style Map fill:#5f7a68,stroke:#4a5f52,color:#fff
    style ArrayList fill:#f5f0e8,stroke:#a99d8e,color:#6b5e4c
    style LinkedList fill:#f5f0e8,stroke:#a99d8e,color:#6b5e4c
    style HashSet fill:#f5f0e8,stroke:#a99d8e,color:#6b5e4c
    style TreeSet fill:#f5f0e8,stroke:#a99d8e,color:#6b5e4c
    style PriorityQueue fill:#f5f0e8,stroke:#a99d8e,color:#6b5e4c
    style HashMap fill:#f5f0e8,stroke:#a99d8e,color:#6b5e4c
    style TreeMap fill:#f5f0e8,stroke:#a99d8e,color:#6b5e4c`}),e.jsx(r,{label:"历史背景",children:"Collection Framework 由 Joshua Bloch（《Effective Java》作者）在 JDK 1.2 中设计引入， 替代了早期的 Vector、Hashtable、Enumeration 等老旧 API，成为 Java 标准库中最成功的设计之一。"}),e.jsx("h2",{id:"hierarchy",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、核心接口层次结构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Collection Framework 的核心是三个基础接口：",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"List"}),"、",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Set"}),"、",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Queue"}),"，它们都继承自",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Collection"})," 根接口。 每个接口定义了不同的语义约束和行为特征。"]}),e.jsx("h3",{id:"collection",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.1 Collection 根接口"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Collection<E>"})," 是所有单列集合的根接口，定义了集合的基本操作：增删改查、大小查询、批量操作等。 它继承了 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Iterable<E>"}),"，因此所有 Collection 都支持 foreach 遍历。"]}),e.jsx(s,{language:"java",filename:"Collection.java",description:"Collection 核心方法签名",highlights:[1,3,5,8],code:`public interface Collection<E> extends Iterable<E> {
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
}`}),e.jsxs(t,{type:"info",title:"Iterable 契约",children:["Collection 继承 Iterable 意味着所有集合都支持增强 for 循环（foreach），其本质是调用",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"iterator()"})," 方法获取迭代器进行遍历。"]}),e.jsx("h3",{id:"list-interface",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.2 List 接口"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"List<E>"})," 是",e.jsx("strong",{className:"text-ink-light font-semibold",children:"有序可重复"}),"的集合，支持基于索引的随机访问。 它扩展了 Collection，新增了位置相关的操作方法，如 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"get(int index)"}),"、",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"set(int index, E element)"})," 等。"]}),e.jsx(s,{language:"java",filename:"List.java",description:"List 接口特有方法",highlights:[2,4,6],code:`public interface List<E> extends Collection<E> {
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
}`}),e.jsxs(r,{label:"subList 陷阱",children:[e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"subList()"})," 返回的是原列表的",e.jsx("strong",{children:"视图"}),"而非拷贝， 对子列表的修改会反映到原列表，反之亦然。如果原列表在子列表使用期间被结构性修改，子列表会抛出",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"ConcurrentModificationException"}),"。"]}),e.jsx("h3",{id:"set-interface",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.3 Set 接口"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Set<E>"})," 是",e.jsx("strong",{className:"text-ink-light font-semibold",children:"无序不可重复"}),'的集合，数学上对应集合论中的"集合"概念。 它没有新增方法，完全继承自 Collection，但通过重写 ',e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"add()"})," 的语义来保证元素唯一性。"]}),e.jsxs(t,{type:"warning",title:"equals 与 hashCode 契约",children:["Set 依赖 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"equals()"})," 和 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"hashCode()"})," 判断元素是否重复。 自定义对象作为 Set 元素时，必须同时重写这两个方法，否则会导致无法正确去重或查找失败。"]}),e.jsx("h3",{id:"queue-interface",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"2.4 Queue 接口"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Queue<E>"})," 是",e.jsx("strong",{className:"text-ink-light font-semibold",children:"先进先出（FIFO）"}),"的队列接口，主要用于任务调度、消息传递等场景。 它提供了两套操作方法：一套在失败时抛出异常，另一套返回特殊值（null 或 false）。"]}),e.jsx(s,{language:"java",filename:"Queue.java",description:"Queue 双套操作 API",highlights:[2,5,8,11],code:`public interface Queue<E> extends Collection<E> {
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
}`}),e.jsxs(r,{label:"Deque 应用",children:[e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Deque"}),"（双端队列）是 Queue 的子接口，支持两端插入和删除。 LinkedList 和 ArrayDeque 都实现了 Deque，常被用作栈（Stack）的替代品——官方已不推荐使用古老的 Stack 类。"]}),e.jsx("h2",{id:"map-separate",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、Map 体系的独立性"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{className:"text-ink-light font-semibold",children:"Map 不属于 Collection 体系"}),"，它是一个独立的接口层次结构。",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Map<K,V>"})," 表示键值对映射， 与 Collection 的语义完全不同——Collection 存储单个元素，Map 存储键值对。"]}),e.jsxs(t,{type:"danger",title:"常见误解",children:["很多初学者误以为 Map 继承自 Collection，实际上两者是",e.jsx("strong",{children:"平行的接口体系"}),"。 Map 提供了 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"keySet()"}),"、",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"values()"}),"、",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"entrySet()"})," 三个视图方法，可以将 Map 转换为 Collection 进行操作。"]}),e.jsx(s,{language:"java",filename:"MapViews.java",description:"Map 的三个视图方法",highlights:[2,5,8],code:`Map<String, Integer> map = new HashMap<>();
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
map.forEach((key, value) -> System.out.println(key + ": " + value));`}),e.jsx("h2",{id:"design-patterns",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、设计模式应用"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Collection Framework 是设计模式的教科书级应用，其中最典型的是",e.jsx("strong",{className:"text-ink-light font-semibold",children:"迭代器模式"}),"和",e.jsx("strong",{className:"text-ink-light font-semibold",children:"适配器模式"}),"。"]}),e.jsx("h3",{id:"iterator-pattern",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 迭代器模式"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["迭代器模式将集合的遍历逻辑封装在独立的迭代器对象中，使得客户端无需关心底层数据结构即可统一访问元素。 Collection 继承 Iterable 接口，强制所有集合提供 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"iterator()"})," 方法。"]}),e.jsx(l,{simpleContent:e.jsxs("div",{className:"p-3 sm:p-4 bg-parchment-warm rounded-paper-md text-[13px] sm:text-[14px] text-ink-muted font-sans leading-[1.8]",children:['迭代器就像一个"游标"，帮你逐个访问集合中的元素。无论底层是数组还是链表，你都用同样的方式遍历：',e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1",children:"hasNext()"})," 判断是否还有下一个，",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1",children:"next()"})," 获取下一个元素。"]}),hardcoreContent:e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{language:"java",filename:"IteratorPattern.java",description:"迭代器模式源码分析",highlights:[3,7,11],code:`// Iterator 接口定义
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
}`}),e.jsxs(r,{label:"fail-fast 机制",children:["ArrayList 的迭代器在每次调用 next/remove 时都会检查",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"modCount == expectedModCount"}),"， 如果不相等说明集合被并发修改，立即抛出 ConcurrentModificationException，避免数据不一致。"]})]})}),e.jsx("h3",{id:"adapter-pattern",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.2 适配器模式"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Collections 工具类提供了大量静态方法来适配集合的行为，如创建不可变视图、同步包装器、空集合等。这些方法本质上是",e.jsx("strong",{className:"text-ink-light font-semibold",children:"适配器模式"}),"的应用——在不修改原集合的情况下，为其添加新的行为。"]}),e.jsx(s,{language:"java",filename:"CollectionsAdapters.java",description:"Collections 适配器方法",highlights:[2,5,8,11],code:`// 1. 不可变视图适配器（只读，修改原集合会反映到视图）
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
Set<Integer> singletonSet = Collections.singleton(42);`}),e.jsxs(t,{type:"tip",title:"JDK 9+ 工厂方法",children:["JDK 9 引入了更简洁的工厂方法：",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"List.of()"}),"、",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Set.of()"}),"、",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Map.of()"}),"，返回的也是不可变集合，且性能优于 Collections 适配器。"]}),e.jsx("h2",{id:"performance",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、性能特征对比"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"不同集合实现的时间复杂度差异显著，选择合适的实现对性能至关重要。以下是核心操作的时间复杂度对比："}),e.jsx("div",{className:"overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5",children:e.jsxs("table",{className:"w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-2.5 px-3 text-ink font-semibold",children:"操作"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-orange font-semibold",children:"ArrayList"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-teal font-semibold",children:"LinkedList"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-indigo font-semibold",children:"HashSet"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-rose font-semibold",children:"TreeSet"})]})}),e.jsxs("tbody",{className:"text-ink-muted",children:[e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"get(index)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-green-700",children:"O(1)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-red-700",children:"O(n)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-gray-500",children:"N/A"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-gray-500",children:"N/A"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"add(e)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-green-700",children:"O(1)*"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-green-700",children:"O(1)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-green-700",children:"O(1)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-yellow-700",children:"O(log n)"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"add(index, e)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-red-700",children:"O(n)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-green-700",children:"O(1)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-gray-500",children:"N/A"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-gray-500",children:"N/A"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"remove(e)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-red-700",children:"O(n)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-red-700",children:"O(n)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-green-700",children:"O(1)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-yellow-700",children:"O(log n)"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"contains(e)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-red-700",children:"O(n)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-red-700",children:"O(n)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-green-700",children:"O(1)"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-yellow-700",children:"O(log n)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"空间开销"}),e.jsx("td",{className:"py-2.5 px-3",children:"低（仅数组）"}),e.jsx("td",{className:"py-2.5 px-3",children:"高（前后指针）"}),e.jsx("td",{className:"py-2.5 px-3",children:"中（负载因子 0.75）"}),e.jsx("td",{className:"py-2.5 px-3",children:"高（红黑树节点）"})]})]})]})}),e.jsxs(r,{label:"* ArrayList add 均摊 O(1)",children:["ArrayList 的 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"add(e)"})," 在尾部追加时通常是 O(1)，但触发扩容时需要复制整个数组，最坏情况 O(n)。 由于扩容频率随容量增长而降低，均摊时间复杂度仍为 O(1)。"]}),e.jsx("h2",{id:"thread-safety",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、线程安全策略"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java 集合框架中的大多数实现都是",e.jsx("strong",{className:"text-ink-light font-semibold",children:"非线程安全"}),"的（如 ArrayList、HashMap、HashSet），这是为了追求极致性能。在多线程环境下，有以下几种线程安全策略："]}),e.jsx(a,{title:"线程安全方案演进",steps:[{label:"Vector/Hashtable",description:"JDK 1.0 遗留类，所有方法 synchronized，性能极差，已废弃",icon:"🚫"},{label:"Collections.synchronizedXxx",description:"包装器模式，每个方法加 synchronized 锁，粒度粗，并发度低",icon:"🔒"},{label:"CopyOnWriteArrayList",description:"写时复制，读无锁，适合读多写少场景，内存开销大",icon:"📋"},{label:"ConcurrentHashMap",description:"分段锁/CAS + synchronized，细粒度锁，高并发首选",icon:"⚡"},{label:"ConcurrentLinkedQueue",description:"CAS 无锁队列，高并发 FIFO 场景",icon:"🔄"}]}),e.jsx(t,{type:"warning",title:"不要使用 Vector 和 Hashtable",children:"这两个类是 JDK 1.0 的遗留产物，虽然线程安全但性能极差（每个方法都 synchronized）。 JDK 1.2 引入 Collection Framework 后已被标记为过时，应使用 ArrayList/HashMap + 同步策略替代。"}),e.jsx(s,{language:"java",filename:"ThreadSafeCollections.java",description:"线程安全集合示例",highlights:[3,7,11,15],code:`// 方案 1: 同步包装器（简单但性能一般）
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
String task = queue.take();  // 空时阻塞`}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、常见误区"}),e.jsxs(t,{type:"danger",title:"误区一：ArrayList 比 LinkedList 快",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"ArrayList 基于数组，应该比 LinkedList 快",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),e.jsx("strong",{children:"取决于操作类型"}),"。随机访问 ArrayList O(1) vs LinkedList O(n)； 但在头部/中间插入删除时，LinkedList O(1) vs ArrayList O(n)（需要移动元素）。此外，ArrayList 缓存友好（连续内存），实际性能往往优于 LinkedList。"]}),e.jsxs(t,{type:"danger",title:"误区二：HashSet 是无序的",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"HashSet 完全不保证顺序",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"HashSet 基于 HashMap 实现，虽然不保证插入顺序，但同一 JVM 运行中，相同元素的迭代顺序是",e.jsx("strong",{children:"稳定"}),"的（除非发生扩容）。 如果需要保持插入顺序，应使用 LinkedHashSet。"]}),e.jsxs(t,{type:"danger",title:"误区三：Map 属于 Collection",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"Map 是 Collection 的子接口",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"Map 是",e.jsx("strong",{children:"独立"}),"的接口体系，与 Collection 平行。Map 存储键值对，Collection 存储单个元素。 可以通过 keySet()/values()/entrySet() 将 Map 转换为 Collection 视图。"]}),e.jsxs(t,{type:"danger",title:"误区四：toArray() 返回的是副本",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"toArray() 返回新数组，修改不影响原集合",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"toArray()"})," 确实返回副本，但如果数组元素是引用类型， 修改数组中对象的属性",e.jsx("strong",{children:"会影响"}),"集合中的对象（因为指向同一内存地址）。只有重新赋值数组元素才不影响集合。"]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、面试真题"}),e.jsx(c,{questions:[{question:"Collection 和 Collections 有什么区别？",answer:"Collection 是集合体系的根接口（java.util.Collection），定义了集合的基本操作；Collections 是工具类（java.util.Collections），提供了大量静态方法来操作集合，如排序、查找、同步包装、不可变视图等。一个是接口，一个是工具类。"},{question:"ArrayList 和 LinkedList 的区别？如何选择？",answer:"ArrayList 基于动态数组，支持随机访问 O(1)，尾部插入 O(1) 均摊，中间插入 O(n)；LinkedList 基于双向链表，不支持随机访问 O(n)，插入删除 O(1)（已知位置时）。选择原则：频繁随机访问用 ArrayList；频繁头部/中间插入删除用 LinkedList。但实际场景中 ArrayList 因缓存友好通常性能更好，LinkedList 很少使用。"},{question:"为什么 HashMap 不属于 Collection 体系？",answer:"Collection 存储单个元素，Map 存储键值对，两者的语义和操作完全不同。Collection 关注元素的增删查改，Map 关注键值映射关系。它们是平行的接口体系，Map 提供了 keySet()/values()/entrySet() 三个视图方法来桥接到 Collection。"},{question:"fail-fast 和 fail-safe 迭代器的区别？",answer:"fail-fast：迭代过程中检测到集合被修改（modCount != expectedModCount）立即抛出 ConcurrentModificationException，如 ArrayList、HashMap 的迭代器。fail-safe：基于集合快照或并发数据结构，不会抛出异常，如 CopyOnWriteArrayList、ConcurrentHashMap 的迭代器。fail-safe 牺牲了一致性换取并发安全性。"},{question:"如何创建一个线程安全的 List？有哪些方案？",answer:"1）Collections.synchronizedList(new ArrayList<>())：同步包装器，每个方法 synchronized，性能一般；2）CopyOnWriteArrayList：写时复制，读无锁，适合读多写少；3）Vector：已过时，不推荐；4）自行使用 ReentrantLock 控制并发。高并发场景优先选择 CopyOnWriteArrayList（读多写少）或 ConcurrentHashMap（键值对场景）。"},{question:"subList() 返回的是什么？有什么陷阱？",answer:"subList() 返回原列表的视图（view）而非拷贝，对子列表的修改会反映到原列表，反之亦然。陷阱：1）如果原列表在子列表使用期间被结构性修改，子列表会抛出 ConcurrentModificationException；2）子列表持有原列表的引用，可能导致内存泄漏（原列表无法 GC）。如需独立副本，应使用 new ArrayList<>(list.subList(from, to))。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4",children:[e.jsx("div",{className:"text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3",children:"← 前置知识"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🎯"}),e.jsx("span",{children:"Java 基础语法与面向对象"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🔢"}),e.jsx("span",{children:"泛型（Generics）"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🎭"}),e.jsx("span",{children:"设计模式基础（迭代器、适配器）"})]})]})]}),e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4",children:[e.jsx("div",{className:"text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3",children:"延伸知识 →"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"📦"}),e.jsx("span",{children:"ArrayList / LinkedList 源码深度解析"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🔍"}),e.jsx("span",{children:"HashSet / TreeSet 底层原理"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🗺️"}),e.jsx("span",{children:"HashMap / TreeMap 源码剖析"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🔒"}),e.jsx("span",{children:"ConcurrentHashMap 并发机制"})]})]})]})]}),e.jsx(x,{...o(n.category,n.id)})]})}),e.jsx(d,{items:m})]})}export{L as default};
