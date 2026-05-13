          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区一：ConcurrentHashMap 允许 null 键值">
            <span className="font-semibold text-ink-light">你以为的：</span>ConcurrentHashMap 和 HashMap 一样允许 null<br />
            <span className="font-semibold text-accent">实际：</span>ConcurrentHashMap <strong>不允许</strong> null 键和 null 值，put(null, value) 或 put(key, null) 会抛出 NullPointerException。这是为了避免歧义：get 返回 null 时无法区分是 key 不存在还是 value 为 null。
          </Callout>

          <Callout type="danger" title="误区二：CopyOnWriteArrayList 适合所有场景">
            <span className="font-semibold text-ink-light">你以为的：</span>CopyOnWriteArrayList 线程安全，可以随便用<br />
            <span className="font-semibold text-accent">实际：</span>CopyOnWriteArrayList 每次写操作都要复制整个数组，时间复杂度 O(n)，空间复杂度 O(n)。如果数组长度为 100 万，每次 add 都要复制 100 万元素，性能极差且容易触发 GC。<strong>仅适用于读多写少（读占比 &gt; 90%）且数据量小的场景。</strong>
          </Callout>

          <Callout type="danger" title="误区三：BlockingQueue 都是无界的">
            <span className="font-semibold text-ink-light">你以为的：</span>队列应该不会满吧<br />
            <span className="font-semibold text-accent">实际：</span>ArrayBlockingQueue 必须在构造时指定容量，是有界队列；LinkedBlockingQueue 默认容量为 Integer.MAX_VALUE，接近无界但仍有上限。<strong>生产环境必须设置合理容量</strong>，否则可能导致 OOM。
          </Callout>

          <Callout type="danger" title="误区四：ConcurrentLinkedQueue 支持阻塞操作">
            <span className="font-semibold text-ink-light">你以为的：</span>既然是队列，应该有 put/take 吧<br />
            <span className="font-semibold text-accent">实际：</span>ConcurrentLinkedQueue <strong>不支持阻塞操作</strong>，只有 offer/poll。如果需要阻塞功能，应该使用 LinkedBlockingQueue 或 ArrayBlockingQueue。ConcurrentLinkedQueue 的优势是无锁高并发，劣势是不支持阻塞。
          </Callout>

          <Callout type="danger" title="误区五：size() 方法是精确的">
            <span className="font-semibold text-ink-light">你以为的：</span>size() 返回的就是当前元素数量<br />
            <span className="font-semibold text-accent">实际：</span>ConcurrentHashMap 的 size() 方法在高并发环境下返回的是<strong>近似值</strong>，因为统计过程中可能有其他线程在修改。JDK 8 使用 LongAdder 优化了性能，但仍不保证绝对精确。如果需要精确计数，应使用外部同步或 AtomicLong。
          </Callout>

          {/* ========== 九、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection questions={[
            { question: 'ConcurrentHashMap JDK 7 和 JDK 8 有什么区别？', answer: 'JDK 7 采用分段锁（Segment），将 Map 分为 16 个 Segment，每个 Segment 独立加锁，最多支持 16 个线程并发。JDK 8 取消 Segment，改为在桶级别使用 CAS + synchronized 加锁，并发度理论上无限。此外，JDK 8 引入红黑树优化长链表性能，链表长度 ≥ 8 且数组长度 ≥ 64 时转为红黑树。' },
            { question: 'ConcurrentHashMap 为什么不允许 null 键值？', answer: '为了避免歧义：get 返回 null 时无法区分是 key 不存在还是 value 为 null。在多线程环境下，这种歧义会导致逻辑错误。HashMap 允许 null 是因为它是非线程安全的，单线程环境下可以通过 containsKey 区分。' },
            { question: 'CopyOnWriteArrayList 的原理是什么？适用什么场景？', answer: '原理：写时复制（Copy-On-Write）。每次修改操作（add/set/remove）都先复制一份底层数组，在副本上修改，完成后原子替换原数组引用。读取操作无需加锁，直接访问当前数组。适用场景：读多写少（读占比 > 90%）、数据量小、容忍短暂不一致的场景，如事件监听器列表、配置项缓存。' },
            { question: 'ArrayBlockingQueue 和 LinkedBlockingQueue 有什么区别？', answer: '1) 数据结构：ArrayBlockingQueue 基于数组，LinkedBlockingQueue 基于链表；2) 锁机制：ArrayBlockingQueue 使用单一 ReentrantLock，LinkedBlockingQueue 使用两把独立的锁（takeLock/putLock）实现读写分离；3) 是否有界：ArrayBlockingQueue 必须有界，LinkedBlockingQueue 可选有界（默认 Integer.MAX_VALUE）；4) 性能：高并发场景下 LinkedBlockingQueue 吞吐量更高，因为读写可以并发执行。' },
            { question: 'ConcurrentLinkedQueue 是如何保证线程安全的？', answer: 'ConcurrentLinkedQueue 基于 CAS（Compare-And-Swap）算法实现，没有任何锁机制，完全依赖原子操作保证线程安全。它使用 Michael & Scott 的非阻塞队列算法，通过 CAS 原子操作更新头尾指针。offer() 和 poll() 都是无锁的，通过循环 CAS 直到成功。CAS 存在 ABA 问题，ConcurrentLinkedQueue 通过哨兵节点和双重检查规避此问题。' },
            { question: 'ConcurrentHashMap 的 size() 方法在高并发下是否准确？', answer: '不准确。ConcurrentHashMap 的 size() 方法在高并发环境下返回的是近似值，因为统计过程中可能有其他线程在修改。JDK 7 先尝试不加锁统计，如果期间有修改则重新统计，最多重试 3 次，仍不准确则对所有 Segment 加锁后统计。JDK 8 使用 LongAdder 维护 baseCount 和 counterCells，类似分段累加器，统计时只需累加这些值，无需加锁，性能极高但仍不保证绝对精确。' },
            { question: '如何实现生产者-消费者模式？', answer: '使用 BlockingQueue 是最简单的方式。生产者调用 put() 放入数据，队列满时阻塞；消费者调用 take() 取出数据，队列空时阻塞。示例代码：BlockingQueue<String> queue = new ArrayBlockingQueue<>(10); 生产者：queue.put(message); 消费者：String message = queue.take(); 也可以使用 wait/notify 或 Condition 手动实现，但 BlockingQueue 更简洁、更安全。' },
            { question: 'ConcurrentHashMap 的扩容机制是怎样的？', answer: '当 size 超过 threshold 时触发扩容，容量翻倍。JDK 8 的优化：1) 不需要重新计算 hash，元素新位置要么是原索引，要么是原索引+旧容量，通过 (hash & oldCap) == 0 判断（高低位分流）；2) 多线程可以协助扩容，检测到 MOVED 状态时会调用 helpTransfer 协助迁移；3) 红黑树的 split 方法处理树的分裂。扩容过程中，其他线程可以继续读写，不会阻塞。' },
          ]} />

          {/* ========== 十、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border-l-4 border-indigo rounded-r-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-indigo font-sans mb-2">前置知识</div>
              <ul className="space-y-1.5 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">→</span><a href="/docs/02-collections/hashmap-deep-dive" className="text-indigo hover:underline">HashMap 深度剖析</a></li>
                <li className="flex items-start gap-2"><span className="text-sm">→</span><a href="/docs/03-multithreading/multi-threading-basics" className="text-indigo hover:underline">多线程基础</a></li>
              </ul>
            </div>
            <div className="bg-parchment-light border-l-4 border-teal rounded-r-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-2">延伸学习</div>
              <ul className="space-y-1.5 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">→</span><a href="/docs/03-multithreading/synchronization" className="text-teal hover:underline">同步机制详解</a></li>
                <li className="flex items-start gap-2"><span className="text-sm">→</span><a href="/docs/03-multithreading/thread-pool" className="text-teal hover:underline">线程池深入解析</a></li>
              </ul>
            </div>
          </div>

          <Callout type="info" title="学习路径建议">
            1️⃣ 先掌握 <a href="/docs/02-collections/hashmap-deep-dive" className="text-indigo hover:underline font-semibold">HashMap</a> 的底层原理<br />
            2️⃣ 再学习 <a href="/docs/03-multithreading/multi-threading-basics" className="text-indigo hover:underline font-semibold">多线程基础</a>，理解线程安全问题<br />
            3️⃣ 然后深入学习 <a href="/docs/03-multithreading/synchronization" className="text-teal hover:underline font-semibold">同步机制</a>（synchronized、ReentrantLock、CAS）<br />
            4️⃣ 最后结合实践，掌握并发集合类的选型和使用技巧
          </Callout>

          {/* ========== 文章导航 ========== */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      {/* SmartTOC 直接渲染，不用 aside 包裹 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
