import React from 'react'
import type { Chapter, KnowledgeNode, Domain, SubCategory, LearningGoal } from './types';

// 通过 Vite import.meta.glob 自动发现所有文章组件，无需手动维护映射
const articleModules = import.meta.glob<{ default: React.ComponentType<{ meta: KnowledgeNode }> }>(
  '../pages/articles/**/*.tsx'
);

export function getArticleComponent(slug: string) {
  const modulePath = Object.keys(articleModules).find(path =>
    path.endsWith(`/${slug}.tsx`)
  );
  const importFn = modulePath ? articleModules[modulePath] : undefined;
  return importFn ? React.lazy(importFn) : undefined;
}

// ===== 领域分组数据（唯一数据源） =====
// 章节定义内联到 domains → subCategories.chapters 中
// 下方 chapters 由 domains 派生导出，保证单一数据源
// 
// 四层结构：Domain(领域) → SubCategory(子类别) → Chapter(章节) → Article(文章/知识点)
// 示例1：backend(后端开发) → java → 01-java-core(Java核心基础) → java-basics(Java基础语法)
// 示例2：infra(基础设施) → oltp(OLTP关系型数据库) → sql-optimization(SQL优化与索引) → sql-optimization(SQL优化与索引)
// 示例3：infra(基础设施) → nosql(NoSQL数据库) → redis(Redis) → redis-cache(Redis缓存实战)

export const domains: Domain[] = [
  {
    id: 'backend',
    title: '后端开发',
    icon: '⚙️',
    color: 'orange',
    subCategories: [
      {
        id: 'java',
        title: 'Java',
        icon: '☕',
        domainId: 'backend',
        description: '从语法基础到框架应用，打牢 Java 编程根基',
        chapters: [
          {
            id: '01-java-core',
            title: 'Java 核心基础',
            icon: '☕',
            description: '从语法基础到面向对象思想，打牢 Java 编程根基',
            difficulty: 2,
            color: 'orange',
            articles: [
              { slug: 'java-basics', title: 'Java基础（必须打牢）', meta: { id: 'java-basics', title: 'Java基础（必须打牢）', level: 'Expert', tags: ['Java', '基础语法', '面向对象', '封装', '继承', '多态', '接口', '抽象类', 'String', 'BigDecimal'], difficulty: 3, category: '01-java-core', prerequisites: [], relatedPatterns: ['java-collections', 'java-concurrency'], readingTime: 60 } },
              { slug: 'primitive-types', title: '基本数据类型与包装类', meta: { id: 'primitive-types', title: '基本数据类型与包装类', level: 'Junior', tags: ['基本类型', '包装类', '自动装箱', '自动拆箱', 'Integer缓存', '类型转换'], difficulty: 2, category: '01-java-core', prerequisites: ['java-basics'], relatedPatterns: ['string-deep-dive'], readingTime: 40 } },
              { slug: 'generic-enum', title: '泛型与枚举', meta: { id: 'generic-enum', title: '泛型与枚举', level: 'Senior', tags: ['泛型', 'Generic', '枚举', 'Enum', '类型擦除', '通配符', 'PECS', 'EnumSet', 'EnumMap'], difficulty: 3, category: '01-java-core', prerequisites: ['java-basics'], relatedPatterns: ['collection-framework'], readingTime: 50 } },
              { slug: 'java-exception-mechanism', title: '异常机制', meta: { id: 'java-exception-mechanism', title: '异常机制', level: 'Junior', tags: ['Exception', 'Throwable', 'try-catch-finally', 'throw', 'throws', '自定义异常', '检查型异常', '非检查型异常', '异常链'], difficulty: 2, category: '01-java-core', prerequisites: ['java-basics'], relatedPatterns: ['io-stream', 'concurrency'], readingTime: 45 } },
              { slug: 'reflection', title: '反射机制', meta: { id: 'reflection', title: '反射机制', level: 'Senior', tags: ['Reflection', 'Class', 'Method', 'Field', 'Annotation', '动态代理', 'Spring IOC'], difficulty: 4, category: '01-java-core', prerequisites: ['java-basics', 'annotation'], relatedPatterns: ['spring-framework', 'aop'], readingTime: 55 } },
              { slug: 'proxy-pattern', title: '代理模式详解', meta: { id: 'proxy-pattern', title: '代理模式详解', level: 'Senior', tags: ['代理模式', 'JDK动态代理', 'CGLIB', '静态代理', 'AOP基础', 'InvocationHandler'], difficulty: 4, category: '01-java-core', prerequisites: ['reflection'], relatedPatterns: ['spring-aop', 'structural-patterns'], readingTime: 50 } },
              { slug: 'annotation', title: '注解详解', meta: { id: 'annotation', title: '注解详解', level: 'Senior', tags: ['Annotation', '@Override', '@Deprecated', '@SuppressWarnings', '元注解', '自定义注解', '处理注解'], difficulty: 3, category: '01-java-core', prerequisites: ['java-basics'], relatedPatterns: ['reflection', 'spring-framework'], readingTime: 40 } },
              { slug: 'unsafe-class', title: 'Unsafe魔法类底层操作（未实现）', meta: { id: 'unsafe-class', title: 'Unsafe魔法类底层操作', level: 'Expert', tags: ['Unsafe', 'CAS', '内存操作', '直接内存', '原子操作', '锁机制'], difficulty: 5, category: '01-java-core', prerequisites: ['reflection'], relatedPatterns: ['atomic-operations', 'jvm-memory-model'], readingTime: 55 } },
              { slug: 'spi-mechanism', title: 'SPI服务发现机制（未实现）', meta: { id: 'spi-mechanism', title: 'SPI服务发现机制', level: 'Senior', tags: ['SPI', 'ServiceLoader', '服务发现', '插件化', '扩展点', 'Dubbo SPI'], difficulty: 3, category: '01-java-core', prerequisites: ['reflection'], relatedPatterns: ['design-pattern-intro', 'spring-boot'], readingTime: 40 } },
              { slug: 'syntax-sugar', title: 'Java语法糖揭秘（未实现）', meta: { id: 'syntax-sugar', title: 'Java语法糖揭秘', level: 'Senior', tags: ['语法糖', '反编译', '自动装箱', '增强for循环', 'switch字符串', 'try-with-resources'], difficulty: 3, category: '01-java-core', prerequisites: ['java-basics'], relatedPatterns: ['generic-enum', 'lambda-expressions'], readingTime: 45 } },
              { slug: 'pass-by-value', title: '值传递vs引用传递辨析（未实现）', meta: { id: 'pass-by-value', title: '值传递vs引用传递辨析', level: 'Junior', tags: ['值传递', '引用传递', '参数传递', '对象引用', '内存模型'], difficulty: 2, category: '01-java-core', prerequisites: ['java-basics'], relatedPatterns: ['jvm-memory-model'], readingTime: 35 } },
              { slug: 'io-stream', title: 'IO流系统', meta: { id: 'io-stream', title: 'IO流系统', level: 'Senior', tags: ['IO', 'InputStream', 'OutputStream', 'Reader', 'Writer', '字节流', '字符流', 'NIO', '缓冲区'], difficulty: 4, category: '01-java-core', prerequisites: ['java-basics'], relatedPatterns: ['nio', 'file-operation'], readingTime: 60 } },
              { slug: 'nio', title: 'NIO与网络编程', meta: { id: 'nio', title: 'NIO与网络编程', level: 'Senior', tags: ['NIO', 'Buffer', 'Channel', 'Selector', '零拷贝', 'SocketChannel', 'ServerSocketChannel', '非阻塞IO'], difficulty: 5, category: '01-java-core', prerequisites: ['io-stream'], relatedPatterns: ['netty', 'concurrency'], readingTime: 65 } },
              { slug: 'datetime-api', title: '日期时间API', meta: { id: 'datetime-api', title: '日期时间API', level: 'Junior', tags: ['LocalDateTime', 'ZonedDateTime', 'Instant', 'Duration', 'Period', 'ZoneId', '时间戳'], difficulty: 2, category: '01-java-core', prerequisites: ['java-basics'], relatedPatterns: ['formatting', 'timezone'], readingTime: 35 } },
              { slug: 'string-deep-dive', title: 'String深度剖析（重点🔥）', meta: { id: 'string-deep-dive', title: 'String深度剖析（重点🔥）', level: 'Expert', tags: ['String', '字符串常量池', 'intern', 'StringBuilder', 'StringBuffer', 'compact-strings', '不可变', 'JDK9'], difficulty: 4, category: '01-java-core', prerequisites: ['java-basics'], relatedPatterns: ['collection-framework', 'hashmap-deep-dive'], readingTime: 50 } },
              { slug: 'serialization', title: '序列化与反序列化', meta: { id: 'serialization', title: '序列化与反序列化', level: 'Senior', tags: ['Serializable', 'Externalizable', 'serialVersionUID', 'ObjectOutputStream', 'ObjectInputStream', '序列化安全', 'JSON序列化'], difficulty: 3, category: '01-java-core', prerequisites: ['java-basics', 'io-stream'], relatedPatterns: ['io-stream', 'rpc'], readingTime: 40 } },
              { slug: 'java-new-features', title: 'Java新特性（8~21）', meta: { id: 'java-new-features', title: 'Java新特性（8~21）', level: 'Senior', tags: ['var', 'record', 'sealed-class', 'text-block', 'switch表达式', 'pattern-matching', 'virtual-threads', 'ZGC', '模块化'], difficulty: 4, category: '01-java-core', prerequisites: ['java-basics', 'lambda-expressions'], relatedPatterns: ['functional-programming', 'concurrency'], readingTime: 55 } },
            ],
          },
          {
            id: '02-collections',
            title: '集合框架深度解析',
            icon: '📦',
            description: 'ArrayList、HashMap、ConcurrentHashMap等源码级别的深度分析',
            difficulty: 3,
            color: 'teal',
            articles: [
              { slug: 'collection-framework', title: 'Collection体系架构', meta: { id: 'collection-framework', title: 'Collection体系架构', level: 'Expert', tags: ['Collection', 'List', 'Set', 'Queue', 'Map', '集合框架', '接口层次'], difficulty: 3, category: '02-collections', prerequisites: [], relatedPatterns: ['list-deep-dive', 'set-deep-dive', 'map-framework'], readingTime: 45 } },
              { slug: 'list-deep-dive', title: 'List深度解析（ArrayList/LinkedList）', meta: { id: 'list-deep-dive', title: 'List深度解析（ArrayList/LinkedList）', level: 'Expert', tags: ['List', 'ArrayList', 'LinkedList', '动态数组', '双向链表', '扩容机制'], difficulty: 4, category: '02-collections', prerequisites: ['collection-framework'], relatedPatterns: ['set-deep-dive', 'map-framework'], readingTime: 50 } },
              { slug: 'set-deep-dive', title: 'Set深度解析（HashSet/TreeSet）', meta: { id: 'set-deep-dive', title: 'Set深度解析（HashSet/TreeSet）', level: 'Expert', tags: ['Set', 'HashSet', 'TreeSet', '去重', '红黑树', 'hashCode'], difficulty: 4, category: '02-collections', prerequisites: ['collection-framework'], relatedPatterns: ['map-framework', 'hashmap-deep-dive'], readingTime: 45 } },
              { slug: 'map-framework', title: 'Map框架（HashMap/TreeMap）', meta: { id: 'map-framework', title: 'Map框架（HashMap/TreeMap）', level: 'Expert', tags: ['Map', 'HashMap', 'TreeMap', '键值对', '红黑树', '哈希表'], difficulty: 4, category: '02-collections', prerequisites: ['collection-framework'], relatedPatterns: ['hashmap-deep-dive', 'set-deep-dive'], readingTime: 50 } },
              { slug: 'hashmap-deep-dive', title: 'HashMap深度剖析（重点🔥）', meta: { id: 'hashmap-deep-dive', title: 'HashMap深度剖析（重点🔥）', level: 'Expert', tags: ['HashMap', '扰动函数', '高低位分流', '扩容', '线程安全', '死循环', '红黑树', 'JDK7 vs JDK8'], difficulty: 5, category: '02-collections', prerequisites: ['map-framework'], relatedPatterns: ['concurrent-hashmap'], readingTime: 60 } },
              { slug: 'concurrent-collections', title: '并发集合类', meta: { id: 'concurrent-collections', title: '并发集合类', level: 'Expert', tags: ['ConcurrentHashMap', 'CopyOnWriteArrayList', 'BlockingQueue', 'ConcurrentLinkedQueue', '线程安全', 'CAS'], difficulty: 5, category: '02-collections', prerequisites: ['hashmap-deep-dive', 'multithreading'], relatedPatterns: ['concurrency'], readingTime: 55 } },
            ],
          },
          {
            id: '03-multithreading',
            title: '并发编程与多线程',
            icon: '🧵',
            description: '线程创建、生命周期管理、线程安全等并发编程知识体系',
            difficulty: 4,
            color: 'indigo',
            articles: [
              { slug: 'multi-threading-basics', title: '多线程基础（线程创建/生命周期/线程安全）', meta: { id: 'multi-threading-basics', title: '多线程基础（线程创建/生命周期/线程安全）', level: 'Expert', tags: ['Thread', 'Runnable', 'Callable', '线程状态', '线程安全', '原子性', '可见性', '有序性', 'volatile', 'synchronized'], difficulty: 3, category: '03-multithreading', prerequisites: ['java-basics'], relatedPatterns: ['concurrent-programming', 'thread-pool'], readingTime: 55 } },
              { slug: 'jmm-deep-dive', title: 'Java内存模型（JMM）深度解析', meta: { id: 'jmm-deep-dive', title: 'Java内存模型（JMM）深度解析', level: 'Expert', tags: ['JMM', 'happens-before', '内存屏障', '重排序', '工作内存', '主内存', 'volatile语义'], difficulty: 5, category: '03-multithreading', prerequisites: ['multi-threading-basics'], relatedPatterns: ['jvm-memory-model', 'atomic-operations'], readingTime: 65 } },
              { slug: 'synchronization', title: '同步机制详解', meta: { id: 'synchronization', title: '同步机制详解', level: 'Expert', tags: ['synchronized', 'ReentrantLock', 'Condition', '读写锁', '信号量', '管程'], difficulty: 4, category: '03-multithreading', prerequisites: ['multi-threading-basics'], relatedPatterns: ['atomic-operations', 'concurrent-utils'], readingTime: 50 } },
              { slug: 'lock-mechanism', title: 'Java锁机制深入剖析', meta: { id: 'lock-mechanism', title: 'Java锁机制深入剖析', level: 'Expert', tags: ['偏向锁', '轻量级锁', '重量级锁', '锁升级', '自旋锁', '适应性自旋', '锁消除', '锁粗化'], difficulty: 5, category: '03-multithreading', prerequisites: ['synchronization'], relatedPatterns: ['jmm-deep-dive', 'aqs-principle'], readingTime: 70 } },
              { slug: 'atomic-operations', title: 'CAS与原子类深度解析', meta: { id: 'atomic-operations', title: 'CAS与原子类深度解析', level: 'Expert', tags: ['AtomicInteger', 'AtomicReference', 'Unsafe', 'CAS', 'ABA问题', 'LongAdder', '原子数组'], difficulty: 4, category: '03-multithreading', prerequisites: ['multi-threading-basics'], relatedPatterns: ['synchronization', 'lock-free'], readingTime: 45 } },
              { slug: 'aqs-principle', title: 'AQS原理剖析', meta: { id: 'aqs-principle', title: 'AQS原理剖析', level: 'Expert', tags: ['AQS', 'AbstractQueuedSynchronizer', 'CLH队列', '独占模式', '共享模式', 'ReentrantLock实现'], difficulty: 5, category: '03-multithreading', prerequisites: ['lock-mechanism'], relatedPatterns: ['concurrent-utils', 'thread-pool'], readingTime: 70 } },
              { slug: 'thread-pool', title: '线程池最佳实践', meta: { id: 'thread-pool', title: '线程池最佳实践', level: 'Expert', tags: ['ThreadPoolExecutor', 'Executors', '队列策略', '拒绝策略', '核心线程数', '最大线程数', '保活时间', '监控'], difficulty: 5, category: '03-multithreading', prerequisites: ['multi-threading-basics'], relatedPatterns: ['fork-join', 'concurrent-utils'], readingTime: 60 } },
              { slug: 'threadlocal', title: 'ThreadLocal详解', meta: { id: 'threadlocal', title: 'ThreadLocal详解', level: 'Senior', tags: ['ThreadLocal', '线程隔离', '内存泄漏', '弱引用', 'InheritableThreadLocal', 'TransmittableThreadLocal'], difficulty: 4, category: '03-multithreading', prerequisites: ['multi-threading-basics'], relatedPatterns: ['jmm-deep-dive', 'spring-transaction'], readingTime: 50 } },
              { slug: 'completable-future', title: 'CompletableFuture异步编程', meta: { id: 'completable-future', title: 'CompletableFuture异步编程', level: 'Senior', tags: ['CompletableFuture', '异步编程', 'thenApply', 'thenCompose', 'allOf', 'anyOf', '异常处理'], difficulty: 4, category: '03-multithreading', prerequisites: ['lambda-expressions'], relatedPatterns: ['thread-pool', 'reactive-programming'], readingTime: 55 } },
              { slug: 'concurrent-utils', title: '并发工具类', meta: { id: 'concurrent-utils', title: '并发工具类', level: 'Expert', tags: ['CountDownLatch', 'CyclicBarrier', 'Semaphore', 'Phaser', 'Exchanger'], difficulty: 4, category: '03-multithreading', prerequisites: ['multi-threading-basics'], relatedPatterns: ['thread-pool', 'synchronization'], readingTime: 45 } },
              { slug: 'fork-join', title: 'Fork/Join框架', meta: { id: 'fork-join', title: 'Fork/Join框架', level: 'Expert', tags: ['ForkJoinPool', 'Work-Stealing', '分治算法', '并行计算'], difficulty: 5, category: '03-multithreading', prerequisites: ['thread-pool'], relatedPatterns: ['parallel-processing', 'recursive-task'], readingTime: 50 } },
            ],
          },
          {
            id: '04-jvm',
            title: 'JVM性能优化',
            icon: '⚙️',
            description: '内存模型、垃圾回收、类加载机制等JVM核心原理',
            difficulty: 5,
            color: 'rose',
            articles: [
              { slug: 'jvm-memory-model', title: 'JVM内存结构', meta: { id: 'jvm-memory-model', title: 'JVM内存结构', level: 'Expert', tags: ['堆', '方法区', '栈', '程序计数器', '本地方法栈', '元空间', '直接内存'], difficulty: 4, category: '04-jvm', prerequisites: ['java-basics'], relatedPatterns: ['gc', 'class-loading'], readingTime: 50 } },
              { slug: 'garbage-collection', title: '垃圾收集器详解', meta: { id: 'garbage-collection', title: '垃圾收集器详解', level: 'Expert', tags: ['GC算法', 'Serial', 'ParNew', 'CMS', 'G1', 'ZGC', 'Shenandoah', 'GC调优'], difficulty: 5, category: '04-jvm', prerequisites: ['jvm-memory-model'], relatedPatterns: ['jvm-tuning', 'memory-management'], readingTime: 65 } },
              { slug: 'class-loading', title: '类加载机制', meta: { id: 'class-loading', title: '类加载机制', level: 'Expert', tags: ['ClassLoader', '双亲委派', '自定义类加载器', '热部署', '模块系统'], difficulty: 4, category: '04-jvm', prerequisites: ['java-basics'], relatedPatterns: ['reflection', 'osgi'], readingTime: 45 } },
              { slug: 'jvm-tuning', title: 'JVM调优实战', meta: { id: 'jvm-tuning', title: 'JVM调优实战', level: 'Expert', tags: ['JVM参数', '性能监控', 'MAT', 'JConsole', 'JVisualVM', '火焰图'], difficulty: 5, category: '04-jvm', prerequisites: ['garbage-collection', 'jvm-memory-model'], relatedPatterns: ['performance-optimization', 'troubleshooting'], readingTime: 60 } },
            ],
          },
          {
            id: '05-functional-programming',
            title: '函数式编程',
            icon: '⚡',
            description: 'Stream API、Lambda表达式、Optional等现代Java特性',
            difficulty: 3,
            color: 'teal',
            articles: [
              { slug: 'lambda-expressions', title: 'Lambda表达式详解', meta: { id: 'lambda-expressions', title: 'Lambda表达式详解', level: 'Senior', tags: ['Lambda', '函数式接口', '方法引用', '构造器引用', 'FunctionalInterface'], difficulty: 3, category: '05-functional-programming', prerequisites: ['java-basics'], relatedPatterns: ['stream-api', 'method-reference'], readingTime: 40 } },
              { slug: 'stream-api', title: 'Stream API深度解析', meta: { id: 'stream-api', title: 'Stream API深度解析', level: 'Senior', tags: ['Stream', '中间操作', '终端操作', '并行流', 'Collector', '规约'], difficulty: 4, category: '05-functional-programming', prerequisites: ['lambda-expressions'], relatedPatterns: ['functional-programming', 'optional'], readingTime: 50 } },
              { slug: 'optional', title: 'Optional优雅处理空值', meta: { id: 'optional', title: 'Optional优雅处理空值', level: 'Senior', tags: ['Optional', '空指针', 'orElse', 'flatMap', 'filter', 'map'], difficulty: 3, category: '05-functional-programming', prerequisites: ['lambda-expressions'], relatedPatterns: ['null-safety', 'functional-programming'], readingTime: 35 } },
            ],
          },
          {
            id: '06-spring-framework',
            title: 'Spring框架全家桶',
            icon: '🌱',
            description: 'Spring Core、AOP、事务管理、Spring Boot等企业级开发必备技术',
            difficulty: 4,
            color: 'indigo',
            articles: [
              { slug: 'spring-core', title: 'Spring核心IoC容器', meta: { id: 'spring-core', title: 'Spring核心IoC容器', level: 'Expert', tags: ['IoC', 'DI', 'Bean生命周期', 'ApplicationContext', 'BeanFactory', '依赖注入'], difficulty: 4, category: '06-spring-framework', prerequisites: ['java-basics', 'reflection'], relatedPatterns: ['spring-aop', 'spring-context'], readingTime: 60 } },
              { slug: 'spring-aop', title: 'Spring AOP切面编程', meta: { id: 'spring-aop', title: 'Spring AOP切面编程', level: 'Expert', tags: ['AOP', '代理模式', 'JDK Proxy', 'CGLIB', 'Pointcut', 'Advice', 'Aspect'], difficulty: 5, category: '06-spring-framework', prerequisites: ['spring-core', 'reflection'], relatedPatterns: ['transaction-management', 'logging'], readingTime: 65 } },
              { slug: 'spring-boot', title: 'Spring Boot自动化配置', meta: { id: 'spring-boot', title: 'Spring Boot自动化配置', level: 'Expert', tags: ['AutoConfiguration', 'Starter', '条件装配', '外部化配置', '启动原理'], difficulty: 4, category: '06-spring-framework', prerequisites: ['spring-core'], relatedPatterns: ['spring-cloud', 'microservices'], readingTime: 55 } },
              { slug: 'spring-data-jpa', title: 'Spring Data JPA', meta: { id: 'spring-data-jpa', title: 'Spring Data JPA', level: 'Senior', tags: ['JPA', 'Repository', '实体关系', '查询方法', 'JPQL', 'Criteria'], difficulty: 4, category: '06-spring-framework', prerequisites: ['spring-core', 'jdbc'], relatedPatterns: ['hibernate', 'mybatis'], readingTime: 50 } },
              { slug: 'spring-security', title: 'Spring Security安全框架', meta: { id: 'spring-security', title: 'Spring Security安全框架', level: 'Expert', tags: ['认证', '授权', 'Filter', 'OAuth2', 'JWT', '密码加密'], difficulty: 5, category: '06-spring-framework', prerequisites: ['spring-core', 'web'], relatedPatterns: ['oauth2', 'jwt'], readingTime: 60 } },
              { slug: 'spring-mvc', title: 'Spring MVC架构模式', meta: { id: 'spring-mvc', title: 'Spring MVC架构模式', level: 'Senior', tags: ['DispatcherServlet', 'Controller', 'RequestMapping', '数据绑定', '拦截器', '异常处理'], difficulty: 4, category: '06-spring-framework', prerequisites: ['spring-core', 'servlet'], relatedPatterns: ['restful-api', 'web-development'], readingTime: 50 } },
              { slug: 'spring-transaction', title: 'Spring事务管理（重点🔥）', meta: { id: 'spring-transaction', title: 'Spring事务管理（重点🔥）', level: 'Expert', tags: ['@Transactional', '传播机制', '隔离级别', '事务失效', '嵌套事务', '声明式事务', '编程式事务', '回滚策略'], difficulty: 5, category: '06-spring-framework', prerequisites: ['spring-core', 'spring-aop', 'jdbc'], relatedPatterns: ['distributed-transaction', 'database'], readingTime: 60 } },
              { slug: 'spring-event', title: 'Spring事件机制', meta: { id: 'spring-event', title: 'Spring事件机制', level: 'Senior', tags: ['ApplicationEvent', 'EventListener', '事件驱动', '异步事件', 'ApplicationEventPublisher', '解耦'], difficulty: 3, category: '06-spring-framework', prerequisites: ['spring-core'], relatedPatterns: ['observer-pattern', 'message-queue'], readingTime: 35 } },
            ],
          },
          {
            id: '07-database',
            title: '数据库访问技术',
            icon: '🗄️',
            description: 'JDBC、连接池、ORM框架等数据库访问相关技术',
            difficulty: 3,
            color: 'teal',
            articles: [
              { slug: 'jdbc', title: 'JDBC底层原理', meta: { id: 'jdbc', title: 'JDBC底层原理', level: 'Senior', tags: ['DriverManager', 'Connection', 'Statement', 'PreparedStatement', 'ResultSet', '事务'], difficulty: 3, category: '07-database', prerequisites: ['java-basics'], relatedPatterns: ['connection-pool', 'orm'], readingTime: 45 } },
              { slug: 'connection-pool', title: '数据库连接池', meta: { id: 'connection-pool', title: '数据库连接池', level: 'Senior', tags: ['HikariCP', 'Druid', 'C3P0', '连接泄漏', '性能调优'], difficulty: 4, category: '07-database', prerequisites: ['jdbc'], relatedPatterns: ['spring-datasource', 'performance'], readingTime: 40 } },
              { slug: 'hibernate', title: 'Hibernate ORM框架', meta: { id: 'hibernate', title: 'Hibernate ORM框架', level: 'Expert', tags: ['Session', 'HQL', '缓存', '延迟加载', '事务管理', '一级缓存', '二级缓存'], difficulty: 5, category: '07-database', prerequisites: ['jdbc'], relatedPatterns: ['jpa', 'spring-data-jpa'], readingTime: 60 } },
              { slug: 'mybatis', title: 'MyBatis SQL映射', meta: { id: 'mybatis', title: 'MyBatis SQL映射', level: 'Senior', tags: ['SqlSessionFactory', 'Mapper', '动态SQL', '插件机制', '缓存机制'], difficulty: 4, category: '07-database', prerequisites: ['jdbc'], relatedPatterns: ['mybatis-plus', 'spring-mybatis'], readingTime: 50 } },
              { slug: 'mybatis-plus', title: 'MyBatis-Plus增强工具', meta: { id: 'mybatis-plus', title: 'MyBatis-Plus增强工具', level: 'Senior', tags: ['MyBatis-Plus', 'BaseMapper', 'Service层', '条件构造器', '代码生成器', '分页插件', '逻辑删除', '乐观锁'], difficulty: 3, category: '07-database', prerequisites: ['mybatis'], relatedPatterns: ['mybatis', 'spring-boot'], readingTime: 45 } },
            ],
          },
          {
            id: '08-microservices',
            title: '微服务架构',
            icon: '🌐',
            description: 'Spring Cloud、服务治理、分布式事务等微服务核心技术',
            difficulty: 5,
            color: 'rose',
            articles: [
              { slug: 'spring-cloud-core', title: 'Spring Cloud核心组件', meta: { id: 'spring-cloud-core', title: 'Spring Cloud核心组件', level: 'Expert', tags: ['Eureka', 'Consul', 'Nacos', '服务注册', '服务发现', '负载均衡'], difficulty: 5, category: '08-microservices', prerequisites: ['spring-boot'], relatedPatterns: ['service-mesh', 'api-gateway'], readingTime: 65 } },
              { slug: 'api-gateway', title: 'API网关设计', meta: { id: 'api-gateway', title: 'API网关设计', level: 'Expert', tags: ['Gateway', 'Zuul', '限流', '熔断', '鉴权', '路由'], difficulty: 5, category: '08-microservices', prerequisites: ['spring-cloud-core'], relatedPatterns: ['spring-cloud-gateway', 'nginx'], readingTime: 60 } },
              { slug: 'distributed-transaction', title: '分布式事务', meta: { id: 'distributed-transaction', title: '分布式事务', level: 'Expert', tags: ['2PC', 'TCC', 'Saga', '可靠消息最终一致性', 'Seata', 'XA事务'], difficulty: 5, category: '08-microservices', prerequisites: ['spring-boot', 'database'], relatedPatterns: ['eventual-consistency', 'compensating-transaction'], readingTime: 70 } },
              { slug: 'configuration-management', title: '配置中心（未实现）', meta: { id: 'configuration-management', title: '配置中心', level: 'Expert', tags: ['Spring Cloud Config', 'Nacos配置', 'Apollo', '配置刷新', '灰度发布'], difficulty: 4, category: '08-microservices', prerequisites: ['spring-boot'], relatedPatterns: ['dynamic-config', 'environment-management'], readingTime: 50 } },
              { slug: 'service-resilience', title: '服务限流降级（未实现）', meta: { id: 'service-resilience', title: '服务限流降级', level: 'Expert', tags: ['Sentinel', 'Resilience4j', '限流', '熔断', '降级', '滑动窗口', '令牌桶', '漏桶'], difficulty: 5, category: '08-microservices', prerequisites: ['spring-cloud-core'], relatedPatterns: ['api-gateway', 'circuit-breaker'], readingTime: 55 } },
              { slug: 'distributed-tracing', title: '分布式链路追踪（未实现）', meta: { id: 'distributed-tracing', title: '分布式链路追踪', level: 'Expert', tags: ['SkyWalking', 'Zipkin', 'Jaeger', 'TraceId', 'Span', '采样率', '可观测性'], difficulty: 4, category: '08-microservices', prerequisites: ['spring-cloud-core'], relatedPatterns: ['service-resilience', 'logging'], readingTime: 50 } },
              { slug: 'message-queue', title: '消息队列（未实现）', meta: { id: 'message-queue', title: '消息队列', level: 'Expert', tags: ['Kafka', 'RocketMQ', 'RabbitMQ', '发布订阅', '消息可靠投递', '幂等性', '顺序消息', '死信队列'], difficulty: 5, category: '08-microservices', prerequisites: ['spring-boot', 'multi-threading-basics'], relatedPatterns: ['distributed-transaction', 'event-driven'], readingTime: 65 } },
            ],
          },
          {
            id: '09-design-patterns',
            title: '设计模式',
            icon: '🏗️',
            description: '23种经典设计模式的Java实现，提升代码架构能力',
            difficulty: 3,
            color: 'purple',
            articles: [
              { slug: 'design-pattern-intro', title: '设计模式概述与原则', meta: { id: 'design-pattern-intro', title: '设计模式概述与原则', level: 'Senior', tags: ['SOLID', '开闭原则', '单一职责', '依赖倒置', '设计模式分类', 'UML'], difficulty: 2, category: '09-design-patterns', prerequisites: ['java-basics'], relatedPatterns: ['creational-patterns', 'structural-patterns'], readingTime: 35 } },
              { slug: 'creational-patterns', title: '创建型模式（单例/工厂/建造者）', meta: { id: 'creational-patterns', title: '创建型模式（单例/工厂/建造者）', level: 'Expert', tags: ['单例模式', '工厂方法', '抽象工厂', '建造者模式', '原型模式', '枚举单例', 'DCL'], difficulty: 4, category: '09-design-patterns', prerequisites: ['design-pattern-intro'], relatedPatterns: ['structural-patterns', 'spring-core'], readingTime: 55 } },
              { slug: 'structural-patterns', title: '结构型模式（代理/装饰器/适配器）', meta: { id: 'structural-patterns', title: '结构型模式（代理/装饰器/适配器）', level: 'Expert', tags: ['代理模式', '装饰器模式', '适配器模式', '外观模式', '桥接模式', '组合模式', '享元模式'], difficulty: 4, category: '09-design-patterns', prerequisites: ['design-pattern-intro'], relatedPatterns: ['spring-aop', 'creational-patterns'], readingTime: 55 } },
              { slug: 'behavioral-patterns', title: '行为型模式（策略/观察者/模板方法）', meta: { id: 'behavioral-patterns', title: '行为型模式（策略/观察者/模板方法）', level: 'Expert', tags: ['策略模式', '观察者模式', '模板方法', '责任链', '状态模式', '命令模式', '迭代器', '中介者'], difficulty: 4, category: '09-design-patterns', prerequisites: ['design-pattern-intro'], relatedPatterns: ['spring-event', 'stream-api'], readingTime: 60 } },
            ],
          },
          {
            id: '10-network-protocol',
            title: '网络编程与协议',
            icon: '🌐',
            description: 'HTTP协议、TCP/IP、Socket编程、RESTful设计等网络核心知识',
            difficulty: 3,
            color: 'blue',
            articles: [
              { slug: 'tcp-ip-basics', title: 'TCP/IP协议栈（未实现）', meta: { id: 'tcp-ip-basics', title: 'TCP/IP协议栈', level: 'Senior', tags: ['TCP', 'IP', 'UDP', '三次握手', '四次挥手', '滑动窗口', '拥塞控制', 'TIME_WAIT'], difficulty: 3, category: '10-network-protocol', prerequisites: ['java-basics'], relatedPatterns: ['http-protocol', 'nio'], readingTime: 50 } },
              { slug: 'http-protocol', title: 'HTTP/HTTPS协议详解（未实现）', meta: { id: 'http-protocol', title: 'HTTP/HTTPS协议详解', level: 'Expert', tags: ['HTTP', 'HTTPS', 'HTTP2', 'HTTP3', '状态码', 'Cookie', 'Session', 'TLS', '证书', '缓存策略'], difficulty: 4, category: '10-network-protocol', prerequisites: ['tcp-ip-basics'], relatedPatterns: ['restful-api', 'spring-mvc'], readingTime: 55 } },
              { slug: 'restful-api', title: 'RESTful API设计（未实现）', meta: { id: 'restful-api', title: 'RESTful API设计', level: 'Senior', tags: ['REST', 'API设计', '资源命名', '版本管理', '分页', 'HATEOAS', 'Swagger', 'OpenAPI'], difficulty: 3, category: '10-network-protocol', prerequisites: ['http-protocol'], relatedPatterns: ['spring-mvc', 'api-gateway'], readingTime: 45 } },
              { slug: 'socket-programming', title: 'Socket编程（未实现）', meta: { id: 'socket-programming', title: 'Socket编程', level: 'Senior', tags: ['Socket', 'ServerSocket', 'TCP编程', 'UDP编程', 'Netty', 'Reactor模式'], difficulty: 4, category: '10-network-protocol', prerequisites: ['tcp-ip-basics', 'io-stream'], relatedPatterns: ['nio', 'concurrency'], readingTime: 50 } },
            ],
          },
          {
            id: '11-build-tools',
            title: '构建工具与工程化',
            icon: '🔧',
            description: 'Maven、Gradle构建工具、项目结构规范与CI/CD工程化实践',
            difficulty: 2,
            color: 'teal',
            articles: [
              { slug: 'maven', title: 'Maven构建工具（未实现）', meta: { id: 'maven', title: 'Maven构建工具', level: 'Senior', tags: ['Maven', 'POM', '依赖管理', '生命周期', '插件', '多模块', '私服', 'BOM'], difficulty: 3, category: '11-build-tools', prerequisites: ['java-basics'], relatedPatterns: ['gradle', 'project-structure'], readingTime: 50 } },
              { slug: 'gradle', title: 'Gradle构建工具（未实现）', meta: { id: 'gradle', title: 'Gradle构建工具', level: 'Senior', tags: ['Gradle', 'Groovy', 'Kotlin DSL', '构建脚本', '依赖管理', '多项目构建', 'Gradle Wrapper'], difficulty: 3, category: '11-build-tools', prerequisites: ['java-basics'], relatedPatterns: ['maven', 'project-structure'], readingTime: 45 } },
              { slug: 'project-structure', title: '项目结构与规范（未实现）', meta: { id: 'project-structure', title: '项目结构与规范', level: 'Junior', tags: ['分层架构', '包结构', '命名规范', '编码规范', '代码审查', 'Git规范'], difficulty: 2, category: '11-build-tools', prerequisites: ['java-basics'], relatedPatterns: ['maven', 'spring-boot'], readingTime: 35 } },
              { slug: 'cicd', title: 'CI/CD持续集成部署', meta: { id: 'cicd', title: 'CI/CD持续集成部署', level: 'Senior', tags: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Docker', 'Kubernetes', '流水线', '自动化测试', '蓝绿部署'], difficulty: 4, category: '11-build-tools', prerequisites: ['maven', 'project-structure'], relatedPatterns: ['docker', 'microservices'], readingTime: 50 } },
            ],
          },
          {
            id: '12-java-security',
            title: 'Java安全',
            icon: '🔐',
            description: '加密解密、数字签名、SSL/TLS、OWASP常见漏洞防护',
            difficulty: 4,
            color: 'rose',
            articles: [
              { slug: 'cryptography', title: '加密与解密（未实现）', meta: { id: 'cryptography', title: '加密与解密', level: 'Expert', tags: ['AES', 'RSA', 'DES', '对称加密', '非对称加密', '消息摘要', 'MAC', 'HMAC'], difficulty: 4, category: '12-java-security', prerequisites: ['java-basics'], relatedPatterns: ['digital-signature', 'spring-security'], readingTime: 50 } },
              { slug: 'digital-signature', title: '数字签名与证书（未实现）', meta: { id: 'digital-signature', title: '数字签名与证书', level: 'Expert', tags: ['数字签名', 'CA', 'X.509', 'SSL', 'TLS', 'KeyStore', 'TrustStore', 'HTTPS'], difficulty: 4, category: '12-java-security', prerequisites: ['cryptography'], relatedPatterns: ['http-protocol', 'spring-security'], readingTime: 45 } },
              { slug: 'owasp-security', title: 'OWASP常见漏洞防护（未实现）', meta: { id: 'owasp-security', title: 'OWASP常见漏洞防护', level: 'Expert', tags: ['OWASP', 'SQL注入', 'XSS', 'CSRF', '越权', '文件上传', '反序列化漏洞', '安全编码'], difficulty: 4, category: '12-java-security', prerequisites: ['java-basics', 'spring-security'], relatedPatterns: ['spring-security', 'serialization'], readingTime: 55 } },
            ],
          },
        ],
      },
      {
        id: 'python',
        title: 'Python',
        icon: '🐍',
        domainId: 'backend',
        description: '从基础语法到工程化实践，完整覆盖 Python 技术栈',
        chapters: [
          {
            id: '01-python-basics',
            title: 'Python 基础',
            icon: '🐍',
            description: '从基础语法到工程化实践，完整覆盖 AI/LLM 应用开发所需的 Python 技术栈',
            difficulty: 2,
            color: 'orange',
            articles: [
              { slug: 'python-basics', title: 'Python基础语法', meta: { id: 'python-basics', title: 'Python基础语法', level: 'Junior', tags: ['Python', '基础语法', '变量', '数据类型', '函数', '类'], difficulty: 1, category: '01-python-basics', prerequisites: [], relatedPatterns: ['python-oop', 'python-modules'], readingTime: 45 } },
              { slug: 'pydantic', title: 'Pydantic 数据验证', meta: { id: 'pydantic', title: 'Pydantic 数据验证', level: 'Senior', tags: ['Pydantic', 'BaseModel', '数据验证', 'JSON Schema', '序列化'], difficulty: 3, category: '01-python-basics', prerequisites: ['python-basics', 'python-typing'], relatedPatterns: ['fastapi', 'data-validation'], readingTime: 40 } },
              { slug: 'python-async', title: 'Python 异步编程', meta: { id: 'python-async', title: 'Python 异步编程', level: 'Senior', tags: ['async', 'await', 'asyncio', '协程', '并发', 'aiohttp', 'httpx'], difficulty: 4, category: '01-python-basics', prerequisites: ['python-basics', 'python-functions'], relatedPatterns: ['fastapi', 'concurrent-programming'], readingTime: 50 } },
              { slug: 'fastapi', title: 'FastAPI 框架深度解析', meta: { id: 'fastapi', title: 'FastAPI 框架深度解析', level: 'Senior', tags: ['FastAPI', '路由', '请求参数', '响应', '文件上传', '中间件', 'OpenAPI', 'Streaming', 'SSE', 'WebSocket'], difficulty: 4, category: '01-python-basics', prerequisites: ['python-async', 'pydantic'], relatedPatterns: ['uvicorn', 'starlette', 'sqlmodel'], readingTime: 55 } },
              { slug: 'python-engineering', title: 'Python 工程化实践', meta: { id: 'python-engineering', title: 'Python 工程化实践', level: 'Senior', tags: ['pip', 'uv', '虚拟环境', '日志', 'dotenv', 'yaml', 'pytest', '工程化'], difficulty: 3, category: '01-python-basics', prerequisites: ['python-basics', 'python-modules'], relatedPatterns: ['fastapi', 'project-structure', 'ci-cd'], readingTime: 50 } },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ai',
    title: '大模型应用',
    icon: '🤖',
    color: 'indigo',
    subCategories: [
      {
        id: 'ai-application',
        title: '大模型应用',
        icon: '🤖',
        domainId: 'ai',
        description: '从理论基础到生产部署，完整覆盖大模型应用技术栈',
        chapters: [
          {
            id: '06-ai-theory',
            title: '理论基础',
            icon: '📚',
            description: 'LLM 基础概念、Prompt 工程、结构化输出等 AI 核心技术',
            difficulty: 2,
            color: 'indigo',
            articles: [
              { slug: 'llm-basics', title: '大模型基础概念', meta: { id: 'llm-basics', title: '大模型基础概念', level: 'Junior', tags: ['LLM', 'Token', 'Context Window', 'Temperature', 'Top P', 'Embedding'], difficulty: 2, category: '06-ai-theory', prerequisites: [], relatedPatterns: ['prompt-engineering', 'structured-output'], readingTime: 40 } },
              { slug: 'prompt-engineering', title: 'Prompt 工程', meta: { id: 'prompt-engineering', title: 'Prompt 工程', level: 'Junior', tags: ['Prompt', 'System Prompt', 'Few-shot', 'Chain of Thought', 'ReAct', 'Prompt Template'], difficulty: 2, category: '06-ai-theory', prerequisites: ['llm-basics'], relatedPatterns: ['structured-output', 'llm-basics'], readingTime: 45 } },
              { slug: 'structured-output', title: '结构化输出', meta: { id: 'structured-output', title: '结构化输出', level: 'Senior', tags: ['JSON', 'Schema', 'Pydantic', 'Output Parser', 'Validation', 'Structured Data'], difficulty: 3, category: '06-ai-theory', prerequisites: ['llm-basics', 'prompt-engineering'], relatedPatterns: ['pydantic', 'fastapi'], readingTime: 50 } },
              { slug: 'function-calling', title: 'Function Calling', meta: { id: 'function-calling', title: 'Function Calling', level: 'Senior', tags: ['Function Calling', 'Tool Calling', 'JSON Schema', 'Tool Definition', 'Parameter Validation', 'Error Handling'], difficulty: 4, category: '06-ai-theory', prerequisites: ['llm-basics', 'prompt-engineering', 'structured-output'], relatedPatterns: ['structured-output', 'react-agent'], readingTime: 55 } },
              { slug: 'openai-sdk', title: 'OpenAI SDK', meta: { id: 'openai-sdk', title: 'OpenAI SDK', level: 'Senior', tags: ['OpenAI', 'Chat API', 'Streaming', 'Function Calling', 'Embedding', 'Structured Output', 'Python SDK'], difficulty: 3, category: '06-ai-theory', prerequisites: ['llm-basics', 'prompt-engineering', 'structured-output'], relatedPatterns: ['function-calling', 'fastapi'], readingTime: 50 } },
            ],
          },
          {
            id: '07-ai-frameworks',
            title: '开发框架',
            icon: '⛓️',
            description: 'LangChain、LlamaIndex 等大模型应用开发框架',
            difficulty: 4,
            color: 'indigo',
            articles: [
              { slug: 'langchain-basics', title: 'LangChain 基础核心', meta: { id: 'langchain-basics', title: 'LangChain 基础核心', level: 'Senior', tags: ['LangChain', 'PromptTemplate', 'ChatModel', 'Runnable', 'OutputParser', 'Tool', 'Memory'], difficulty: 3, category: '07-ai-frameworks', prerequisites: ['llm-basics', 'prompt-engineering', 'python-async'], relatedPatterns: ['langchain-advanced', 'langgraph-core', 'agent-patterns'], readingTime: 50 } },
              { slug: 'langchain-advanced', title: 'LangChain 进阶技巧', meta: { id: 'langchain-advanced', title: 'LangChain 进阶技巧', level: 'Senior', tags: ['LangChain', 'LCEL', 'RunnableParallel', 'RunnableLambda', 'RunnableBranch', '动态Prompt', 'Tool Binding'], difficulty: 4, category: '07-ai-frameworks', prerequisites: ['langchain-basics'], relatedPatterns: ['langgraph-core', 'agent-patterns', 'workflow-design'], readingTime: 55 } },
              { slug: 'langgraph-core', title: 'LangGraph 核心架构', meta: { id: 'langgraph-core', title: 'LangGraph 核心架构', level: 'Senior', tags: ['LangGraph', 'StateGraph', 'Node', 'Edge', 'Conditional Edge', 'Checkpoint', 'Interrupt', 'Human-in-the-loop'], difficulty: 4, category: '07-ai-frameworks', prerequisites: ['langchain-basics', 'langchain-advanced'], relatedPatterns: ['agent-patterns', 'workflow-design'], readingTime: 60 } },
              { slug: 'agent-patterns', title: 'Agent 设计模式', meta: { id: 'agent-patterns', title: 'Agent 设计模式', level: 'Senior', tags: ['Agent', 'ReAct', 'Planner', 'Executor', 'Router', 'Reflection', 'Tool Agent'], difficulty: 4, category: '07-ai-frameworks', prerequisites: ['langchain-basics', 'langgraph-core'], relatedPatterns: ['workflow-design', 'function-calling'], readingTime: 55 } },
              { slug: 'workflow-design', title: 'Workflow 工作流设计', meta: { id: 'workflow-design', title: 'Workflow 工作流设计', level: 'Expert', tags: ['Workflow', 'DAG', '状态机', 'Retry', 'Timeout', '并发执行', '持久化'], difficulty: 5, category: '07-ai-frameworks', prerequisites: ['langgraph-core', 'agent-patterns'], relatedPatterns: ['langchain-advanced'], readingTime: 50 } },
            ],
          },
          {
            id: '08-ai-applications',
            title: '应用实践',
            icon: '🚀',
            description: 'RAG、Agent、多模态等大模型实际应用案例',
            difficulty: 4,
            color: 'purple',
            articles: [
              { slug: 'rag-introduction', title: 'RAG 基础概念', meta: { id: 'rag-introduction', title: 'RAG 基础概念', level: 'Senior', tags: ['RAG', 'Retrieval', 'Augmented Generation', 'Vector Database', 'Embedding', 'Similarity Search'], difficulty: 3, category: '08-ai-applications', prerequisites: ['llm-basics', 'structured-output'], relatedPatterns: ['vector-database', 'embedding-models'], readingTime: 45 } },
              { slug: 'vector-database', title: '向量数据库', meta: { id: 'vector-database', title: '向量数据库', level: 'Senior', tags: ['Vector DB', 'Chroma', 'Pinecone', 'Milvus', 'FAISS', '索引优化', '相似度计算'], difficulty: 4, category: '08-ai-applications', prerequisites: ['rag-introduction'], relatedPatterns: ['embedding-models', 'search-algorithms'], readingTime: 50 } },
              { slug: 'embedding-models', title: '嵌入模型', meta: { id: 'embedding-models', title: '嵌入模型', level: 'Senior', tags: ['Embedding', 'Sentence Transformers', 'BGE', 'Text Embedding', '相似度匹配', '语义搜索'], difficulty: 4, category: '08-ai-applications', prerequisites: ['rag-introduction'], relatedPatterns: ['vector-database', 'llm-basics'], readingTime: 40 } },
              { slug: 'document-processing', title: '文档处理与切分', meta: { id: 'document-processing', title: '文档处理与切分', level: 'Senior', tags: ['Document Loader', 'Text Splitter', 'Chunking Strategy', 'Metadata', 'PDF Processing', 'OCR'], difficulty: 4, category: '08-ai-applications', prerequisites: ['rag-introduction'], relatedPatterns: ['vector-database', 'data-pipeline'], readingTime: 45 } },
              { slug: 'retrieval-optimization', title: '检索优化策略', meta: { id: 'retrieval-optimization', title: '检索优化策略', level: 'Expert', tags: ['Hybrid Search', 'Re-ranking', 'Query Expansion', 'Multi-query', 'Self-query', '检索调优'], difficulty: 5, category: '08-ai-applications', prerequisites: ['vector-database', 'embedding-models'], relatedPatterns: ['rag-evaluation', 'performance-tuning'], readingTime: 55 } },
              { slug: 'agent-architecture', title: 'Agent 架构设计', meta: { id: 'agent-architecture', title: 'Agent 架构设计', level: 'Expert', tags: ['Agent Architecture', 'Planning', 'Memory', 'Tools', 'Reflection', 'Multi-Agent'], difficulty: 5, category: '08-ai-applications', prerequisites: ['agent-patterns', 'langgraph-core'], relatedPatterns: ['workflow-design', 'tool-integration'], readingTime: 60 } },
              { slug: 'tool-integration', title: '工具集成与调用', meta: { id: 'tool-integration', title: '工具集成与调用', level: 'Senior', tags: ['Tool Integration', 'API Calling', 'Custom Tools', 'Tool Selection', 'Error Handling', 'Rate Limiting'], difficulty: 4, category: '08-ai-applications', prerequisites: ['function-calling', 'agent-patterns'], relatedPatterns: ['agent-architecture', 'api-design'], readingTime: 50 } },
              { slug: 'memory-management', title: '记忆管理', meta: { id: 'memory-management', title: '记忆管理', level: 'Senior', tags: ['Short-term Memory', 'Long-term Memory', 'Conversation History', 'Knowledge Graph', 'Vector Store Memory'], difficulty: 4, category: '08-ai-applications', prerequisites: ['agent-patterns'], relatedPatterns: ['agent-architecture', 'state-management'], readingTime: 45 } },
              { slug: 'multi-agent-systems', title: '多智能体系统', meta: { id: 'multi-agent-systems', title: '多智能体系统', level: 'Expert', tags: ['Multi-Agent', 'Agent Collaboration', 'Task Decomposition', 'Coordination', 'Communication Protocol'], difficulty: 5, category: '08-ai-applications', prerequisites: ['agent-architecture'], relatedPatterns: ['distributed-systems', 'workflow-design'], readingTime: 65 } },
            ],
          },
          {
            id: '09-ai-engineering',
            title: 'AI工程化进阶',
            icon: '⚙️',
            description: '模型微调、AI Coding、灰度发布、监控告警等工程化实践',
            difficulty: 5,
            color: 'rose',
            articles: [
              { slug: 'model-finetuning', title: '模型微调与训练', meta: { id: 'model-finetuning', title: '模型微调与训练', level: 'Expert', tags: ['Fine-tuning', 'LoRA', 'QLoRA', 'PEFT', '指令微调', 'RLHF', 'DPO', '训练数据'], difficulty: 5, category: '09-ai-engineering', prerequisites: ['llm-basics', 'python-async'], relatedPatterns: ['llm-quantization-deployment', 'pytorch'], readingTime: 70 } },
              { slug: 'ai-coding-workflow', title: 'AI Coding实践与工作流', meta: { id: 'ai-coding-workflow', title: 'AI Coding实践与工作流', level: 'Senior', tags: ['AI Coding', 'Cursor', 'Copilot', '代码生成', '代码审查', '自动化测试', '工作流'], difficulty: 4, category: '09-ai-engineering', prerequisites: ['python-async'], relatedPatterns: ['cursor-ai-editor', 'github-copilot', 'claude-code'], readingTime: 55 } },
              { slug: 'canary-deployment', title: '金丝雀灰度发布策略', meta: { id: 'canary-deployment', title: '金丝雀灰度发布策略', level: 'Expert', tags: ['Canary', '灰度发布', 'A/B测试', '流量分割', '回滚策略', 'Kubernetes', 'Istio'], difficulty: 5, category: '09-ai-engineering', prerequisites: ['cicd'], relatedPatterns: ['microservices', 'observability-monitoring'], readingTime: 60 } },
              { slug: 'observability-monitoring', title: '全链路监控告警体系', meta: { id: 'observability-monitoring', title: '全链路监控告警体系', level: 'Expert', tags: ['Prometheus', 'Grafana', 'AlertManager', '日志聚合', '指标监控', '链路追踪', '可观测性'], difficulty: 5, category: '09-ai-engineering', prerequisites: ['distributed-tracing'], relatedPatterns: ['logging', 'performance-tuning'], readingTime: 65 } },
            ],
          },
          {
            id: '10-llm-advanced',
            title: 'LLM高级应用',
            icon: '🔥',
            description: 'LlamaIndex、多智能体、量化部署、文档处理等高级应用场景',
            difficulty: 5,
            color: 'indigo',
            articles: [
              { slug: 'llamaindex-framework', title: 'LlamaIndex框架深度解析', meta: { id: 'llamaindex-framework', title: 'LlamaIndex框架深度解析', level: 'Senior', tags: ['LlamaIndex', 'Data Connector', 'Index', 'Query Engine', 'Retriever', 'Node Parser'], difficulty: 4, category: '10-llm-advanced', prerequisites: ['langchain-basics', 'rag-introduction'], relatedPatterns: ['vector-database', 'document-processing'], readingTime: 60 } },
              { slug: 'multi-agent-collaboration', title: 'Multi-Agent多智能体协作架构', meta: { id: 'multi-agent-collaboration', title: 'Multi-Agent多智能体协作架构', level: 'Expert', tags: ['Multi-Agent', '协作架构', '任务分解', '智能体通信', '协调机制', '分布式决策'], difficulty: 5, category: '10-llm-advanced', prerequisites: ['multi-agent-systems', 'agent-architecture'], relatedPatterns: ['autogen-framework', 'crewai-framework'], readingTime: 65 } },
              { slug: 'api-plugin-development', title: 'API插件开发与设计模式', meta: { id: 'api-plugin-development', title: 'API插件开发与设计模式', level: 'Senior', tags: ['API插件', 'Plugin', 'OpenAPI', '函数调用', '设计模式', '接口规范'], difficulty: 4, category: '10-llm-advanced', prerequisites: ['function-calling', 'restful-api'], relatedPatterns: ['tool-integration', 'api-design'], readingTime: 50 } },
              { slug: 'llm-quantization-deployment', title: '大模型轻量化部署与量化推理', meta: { id: 'llm-quantization-deployment', title: '大模型轻量化部署与量化推理', level: 'Expert', tags: ['量化', 'INT8', 'INT4', 'GGUF', 'AWQ', 'vLLM', 'TensorRT', '推理优化'], difficulty: 5, category: '10-llm-advanced', prerequisites: ['llm-basics'], relatedPatterns: ['model-finetuning', 'performance-tuning'], readingTime: 70 } },
              { slug: 'document-structure-extraction', title: '文档结构化处理与布局分析', meta: { id: 'document-structure-extraction', title: '文档结构化处理与布局分析', level: 'Senior', tags: ['文档解析', '布局分析', '表格提取', '版面识别', 'Unstructured', 'LayoutLM'], difficulty: 4, category: '10-llm-advanced', prerequisites: ['document-processing'], relatedPatterns: ['ocr-ai-integration', 'content-extraction'], readingTime: 55 } },
              { slug: 'ocr-ai-integration', title: 'OCR+AI智能文档识别', meta: { id: 'ocr-ai-integration', title: 'OCR+AI智能文档识别', level: 'Senior', tags: ['OCR', 'PaddleOCR', 'Tesseract', '文本识别', '图像预处理', '后处理'], difficulty: 4, category: '10-llm-advanced', prerequisites: ['document-processing'], relatedPatterns: ['document-structure-extraction', 'content-extraction'], readingTime: 50 } },
              { slug: 'semantic-search-optimization', title: '语义检索优化策略', meta: { id: 'semantic-search-optimization', title: '语义检索优化策略', level: 'Expert', tags: ['语义检索', '混合搜索', '重排序', '查询扩展', 'BM25', '向量检索'], difficulty: 5, category: '10-llm-advanced', prerequisites: ['retrieval-optimization', 'embedding-models'], relatedPatterns: ['vector-database', 'rag-introduction'], readingTime: 60 } },
              { slug: 'content-extraction', title: '内容抽取与信息提取', meta: { id: 'content-extraction', title: '内容抽取与信息提取', level: 'Senior', tags: ['信息抽取', 'NER', '关系抽取', '事件抽取', '知识图谱', 'IE'], difficulty: 4, category: '10-llm-advanced', prerequisites: ['structured-output'], relatedPatterns: ['document-structure-extraction', 'knowledge-graph'], readingTime: 50 } },
              { slug: 'dify-platform', title: 'Dify低代码AI应用平台', meta: { id: 'dify-platform', title: 'Dify低代码AI应用平台', level: 'Senior', tags: ['Dify', '低代码', '可视化编排', '工作流', '应用部署', 'LLMOps'], difficulty: 3, category: '10-llm-advanced', prerequisites: ['langchain-basics'], relatedPatterns: ['workflow-design', 'agent-patterns'], readingTime: 45 } },
              { slug: 'mcp-protocol', title: 'MCP协议与上下文管理', meta: { id: 'mcp-protocol', title: 'MCP协议与上下文管理', level: 'Expert', tags: ['MCP', 'Model Context Protocol', '上下文管理', '资源访问', '工具协议', '标准化'], difficulty: 5, category: '10-llm-advanced', prerequisites: ['agent-architecture'], relatedPatterns: ['mcp-server-development', 'tool-integration'], readingTime: 55 } },
              { slug: 'mcp-server-development', title: 'MCP Server开发与集成', meta: { id: 'mcp-server-development', title: 'MCP Server开发与集成', level: 'Expert', tags: ['MCP Server', '服务器开发', '协议实现', 'SDK', '集成测试', '最佳实践'], difficulty: 5, category: '10-llm-advanced', prerequisites: ['mcp-protocol'], relatedPatterns: ['api-plugin-development', 'tool-integration'], readingTime: 60 } },
              { slug: 'multimodal-agent', title: '多模态Agent架构设计', meta: { id: 'multimodal-agent', title: '多模态Agent架构设计', level: 'Expert', tags: ['多模态', '视觉理解', '语音交互', '图像处理', 'GPT-4V', 'CLIP'], difficulty: 5, category: '10-llm-advanced', prerequisites: ['agent-architecture'], relatedPatterns: ['ocr-ai-integration', 'multi-agent-systems'], readingTime: 65 } },
            ],
          },
          {
            id: '11-ai-agent-frameworks',
            title: 'AI多智能体框架扩展',
            icon: '🤖',
            description: 'AutoGen、CrewAI、NL2SQL等多智能体框架与应用',
            difficulty: 5,
            color: 'purple',
            articles: [
              { slug: 'autogen-framework', title: 'AutoGen多智能体框架', meta: { id: 'autogen-framework', title: 'AutoGen多智能体框架', level: 'Expert', tags: ['AutoGen', 'Microsoft', 'ConversableAgent', 'GroupChat', '多轮对话', '协作模式'], difficulty: 5, category: '11-ai-agent-frameworks', prerequisites: ['multi-agent-systems', 'agent-patterns'], relatedPatterns: ['crewai-framework', 'langgraph-core'], readingTime: 65 } },
              { slug: 'crewai-framework', title: 'CrewAI协作框架', meta: { id: 'crewai-framework', title: 'CrewAI协作框架', level: 'Senior', tags: ['CrewAI', 'Role-playing', 'Task', 'Process', 'Sequential', 'Hierarchical'], difficulty: 4, category: '11-ai-agent-frameworks', prerequisites: ['agent-patterns'], relatedPatterns: ['autogen-framework', 'workflow-design'], readingTime: 55 } },
              { slug: 'nl2sql', title: 'NL2SQL自然语言转SQL', meta: { id: 'nl2sql', title: 'NL2SQL自然语言转SQL', level: 'Senior', tags: ['NL2SQL', 'Text-to-SQL', 'Schema Linking', 'SQL生成', '数据库查询', '语义解析'], difficulty: 4, category: '11-ai-agent-frameworks', prerequisites: ['structured-output', 'sql-optimization'], relatedPatterns: ['rag-introduction', 'function-calling'], readingTime: 50 } },
            ],
          },
          {
            id: '12-ai-coding-tools',
            title: 'AI Coding工具与实践',
            icon: '💻',
            description: 'Cursor、GitHub Copilot、Claude Code等AI编程工具实战',
            difficulty: 3,
            color: 'teal',
            articles: [
              { slug: 'cursor-ai-editor', title: 'Cursor AI代码编辑器', meta: { id: 'cursor-ai-editor', title: 'Cursor AI代码编辑器', level: 'Junior', tags: ['Cursor', 'AI编辑器', '代码补全', '代码生成', 'Chat', 'Composer', '快捷键'], difficulty: 2, category: '12-ai-coding-tools', prerequisites: [], relatedPatterns: ['github-copilot', 'ai-coding-workflow'], readingTime: 40 } },
              { slug: 'github-copilot', title: 'GitHub Copilot编程助手', meta: { id: 'github-copilot', title: 'GitHub Copilot编程助手', level: 'Junior', tags: ['GitHub Copilot', '代码建议', '自动补全', 'IDE集成', 'VSCode', 'JetBrains'], difficulty: 2, category: '12-ai-coding-tools', prerequisites: [], relatedPatterns: ['cursor-ai-editor', 'ai-coding-workflow'], readingTime: 35 } },
              { slug: 'claude-code', title: 'Claude Code智能编程', meta: { id: 'claude-code', title: 'Claude Code智能编程', level: 'Senior', tags: ['Claude Code', 'Anthropic', '代码理解', '重构建议', 'Bug修复', '代码解释'], difficulty: 3, category: '12-ai-coding-tools', prerequisites: [], relatedPatterns: ['cursor-ai-editor', 'github-copilot'], readingTime: 45 } },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'frontend',
    title: '前端开发',
    icon: '🎨',
    color: 'teal',
    subCategories: [],
  },
  {
    id: 'infra',
    title: '基础设施',
    icon: '🏗️',
    color: 'rose',
    subCategories: [
      {
        id: 'oltp',
        title: 'OLTP关系型数据库',
        icon: '🗃️',
        domainId: 'infra',
        description: 'MySQL、PostgreSQL等关系型数据库的优化与最佳实践',
        chapters: [
          {
            id: 'mysql',
            title: 'MySQL数据库',
            icon: '🐬',
            description: 'MySQL核心原理、性能优化、高可用架构',
            difficulty: 4,
            color: 'blue',
            articles: [
              { slug: 'mysql-architecture', title: 'MySQL架构与存储引擎（未实现）', meta: { id: 'mysql-architecture', title: 'MySQL架构与存储引擎', level: 'Expert', tags: ['MySQL', 'InnoDB', 'MyISAM', '架构设计', '缓冲池', '日志系统', 'MVCC'], difficulty: 4, category: 'mysql', prerequisites: ['sql-optimization'], relatedPatterns: ['postgresql', 'database-internals'], readingTime: 60 } },
              { slug: 'mysql-index-optimization', title: 'MySQL索引优化实战（未实现）', meta: { id: 'mysql-index-optimization', title: 'MySQL索引优化实战', level: 'Expert', tags: ['B+树', '聚簇索引', '覆盖索引', '最左前缀', '索引下推', 'ICP'], difficulty: 5, category: 'mysql', prerequisites: ['sql-optimization'], relatedPatterns: ['query-optimization', 'performance-tuning'], readingTime: 65 } },
              { slug: 'mysql-transaction-lock', title: 'MySQL事务与锁机制（未实现）', meta: { id: 'mysql-transaction-lock', title: 'MySQL事务与锁机制', level: 'Expert', tags: ['ACID', '隔离级别', '行锁', '表锁', '间隙锁', '死锁', 'MVCC', 'Undo Log'], difficulty: 5, category: 'mysql', prerequisites: ['mysql-architecture'], relatedPatterns: ['concurrency-control', 'distributed-transaction'], readingTime: 70 } },
              { slug: 'mysql-replication-ha', title: 'MySQL主从复制与高可用（未实现）', meta: { id: 'mysql-replication-ha', title: 'MySQL主从复制与高可用', level: 'Expert', tags: ['主从复制', 'Binlog', 'GTID', 'MHA', 'Orchestrator', '读写分离', '分库分表'], difficulty: 5, category: 'mysql', prerequisites: ['mysql-architecture'], relatedPatterns: ['high-availability', 'sharding'], readingTime: 65 } },
              { slug: 'mysql-performance-tuning', title: 'MySQL性能调优（未实现）', meta: { id: 'mysql-performance-tuning', title: 'MySQL性能调优', level: 'Expert', tags: ['慢查询', '执行计划', '参数调优', '连接池', '缓冲池配置', '监控工具'], difficulty: 5, category: 'mysql', prerequisites: ['mysql-index-optimization'], relatedPatterns: ['sql-optimization', 'observability-monitoring'], readingTime: 60 } },
            ],
          },
          {
            id: 'postgresql',
            title: 'PostgreSQL数据库',
            icon: '🐘',
            description: 'PostgreSQL高级特性、JSONB、扩展生态',
            difficulty: 4,
            color: 'blue',
            articles: [
              { slug: 'postgresql-core', title: 'PostgreSQL核心原理（未实现）', meta: { id: 'postgresql-core', title: 'PostgreSQL核心原理', level: 'Expert', tags: ['PostgreSQL', 'MVCC', 'WAL', 'VACUUM', 'TOAST', '多版本并发控制'], difficulty: 4, category: 'postgresql', prerequisites: ['sql-optimization'], relatedPatterns: ['mysql-architecture', 'database-internals'], readingTime: 60 } },
              { slug: 'postgresql-jsonb', title: 'PostgreSQL JSONB与NoSQL能力（未实现）', meta: { id: 'postgresql-jsonb', title: 'PostgreSQL JSONB与NoSQL能力', level: 'Senior', tags: ['JSONB', 'GIN索引', '文档存储', '半结构化数据', '查询优化'], difficulty: 4, category: 'postgresql', prerequisites: ['postgresql-core'], relatedPatterns: ['nosql', 'elasticsearch'], readingTime: 50 } },
              { slug: 'postgresql-extensions', title: 'PostgreSQL扩展生态（未实现）', meta: { id: 'postgresql-extensions', title: 'PostgreSQL扩展生态', level: 'Senior', tags: ['PostGIS', 'pgvector', 'TimescaleDB', 'Citus', '插件开发', 'FDW'], difficulty: 4, category: 'postgresql', prerequisites: ['postgresql-core'], relatedPatterns: ['gis', 'vector-database', 'time-series'], readingTime: 55 } },
              { slug: 'postgresql-replication', title: 'PostgreSQL高可用与复制（未实现）', meta: { id: 'postgresql-replication', title: 'PostgreSQL高可用与复制', level: 'Expert', tags: ['流复制', '逻辑复制', 'Patroni', 'Pgpool-II', '负载均衡', '故障切换'], difficulty: 5, category: 'postgresql', prerequisites: ['postgresql-core'], relatedPatterns: ['high-availability', 'mysql-replication-ha'], readingTime: 60 } },
            ],
          },
          {
            id: 'clickhouse',
            title: 'ClickHouse OLAP',
            icon: '⚡',
            description: 'ClickHouse列式存储、实时分析、海量数据处理',
            difficulty: 5,
            color: 'orange',
            articles: [
              { slug: 'clickhouse-architecture', title: 'ClickHouse架构与原理（未实现）', meta: { id: 'clickhouse-architecture', title: 'ClickHouse架构与原理', level: 'Expert', tags: ['列式存储', '向量化执行', '稀疏索引', '数据压缩', 'MergeTree', 'LSM-Tree'], difficulty: 5, category: 'clickhouse', prerequisites: [], relatedPatterns: ['olap', 'bigdata-ecosystem'], readingTime: 65 } },
              { slug: 'clickhouse-performance', title: 'ClickHouse性能优化（未实现）', meta: { id: 'clickhouse-performance', title: 'ClickHouse性能优化', level: 'Expert', tags: ['分区键', '排序键', '采样', '物化视图', '预聚合', '查询优化'], difficulty: 5, category: 'clickhouse', prerequisites: ['clickhouse-architecture'], relatedPatterns: ['performance-tuning', 'realtime-data-warehouse'], readingTime: 60 } },
              { slug: 'clickhouse-distributed', title: 'ClickHouse分布式集群（未实现）', meta: { id: 'clickhouse-distributed', title: 'ClickHouse分布式集群', level: 'Expert', tags: ['分片', '副本', 'ZooKeeper', '分布式表', '全局字典', '负载均衡'], difficulty: 5, category: 'clickhouse', prerequisites: ['clickhouse-architecture'], relatedPatterns: ['distributed-systems', 'high-availability'], readingTime: 65 } },
            ],
          },
        ],
      },
      {
        id: 'nosql',
        title: 'NoSQL数据库',
        icon: '📦',
        domainId: 'infra',
        description: 'Redis、MongoDB等非关系型数据库',
        chapters: [
          {
            id: 'redis',
            title: 'Redis',
            icon: '⚡',
            description: '高性能内存数据库，支持缓存、消息队列、分布式锁等场景',
            difficulty: 4,
            color: 'rose',
            articles: [
              { slug: 'redis-cache', title: 'Redis缓存实战（JD要求🔥）', meta: { id: 'redis-cache', title: 'Redis缓存实战（JD要求🔥）', level: 'Expert', tags: ['Redis', '缓存策略', '数据结构', '持久化', '集群', '哨兵', '穿透', '雪崩', '击穿', '分布式锁'], difficulty: 5, category: 'redis', prerequisites: [], relatedPatterns: ['spring-data-jpa', 'distributed-transaction'], readingTime: 65 } },
            ],
          },
        ],
      },
      {
        id: 'bigdata',
        title: '大数据生态',
        icon: '📊',
        domainId: 'infra',
        description: 'Flink、Spark、Hadoop等大数据处理框架与生态系统',
        chapters: [
          {
            id: '13-bigdata-ecosystem',
            title: '大数据生态',
            icon: '📊',
            description: 'Flink实时计算、Spark分布式计算、Hadoop生态系统等',
            difficulty: 5,
            color: 'blue',
            articles: [
              { slug: 'flink-streaming', title: 'Flink实时计算框架（未实现）', meta: { id: 'flink-streaming', title: 'Flink实时计算框架', level: 'Expert', tags: ['Flink', '流处理', 'DataStream API', 'Checkpoint', '状态管理', '窗口', 'Watermark'], difficulty: 5, category: '13-bigdata-ecosystem', prerequisites: ['java-basics', 'multi-threading-basics'], relatedPatterns: ['spark-computing', 'kafka'], readingTime: 70 } },
              { slug: 'spark-computing', title: 'Spark分布式计算（未实现）', meta: { id: 'spark-computing', title: 'Spark分布式计算', level: 'Expert', tags: ['Spark', 'RDD', 'DataFrame', 'Spark SQL', 'MLlib', 'GraphX', '分布式计算'], difficulty: 5, category: '13-bigdata-ecosystem', prerequisites: ['java-basics', 'python-basics'], relatedPatterns: ['flink-streaming', 'hadoop-ecosystem'], readingTime: 65 } },
              { slug: 'hadoop-ecosystem', title: 'Hadoop生态系统（未实现）', meta: { id: 'hadoop-ecosystem', title: 'Hadoop生态系统', level: 'Senior', tags: ['Hadoop', 'MapReduce', 'YARN', 'HDFS', '生态圈', '大数据平台'], difficulty: 4, category: '13-bigdata-ecosystem', prerequisites: ['java-basics'], relatedPatterns: ['hdfs', 'hive-data-warehouse'], readingTime: 60 } },
              { slug: 'hive-data-warehouse', title: 'Hive数据仓库（未实现）', meta: { id: 'hive-data-warehouse', title: 'Hive数据仓库', level: 'Senior', tags: ['Hive', 'HQL', '数据仓库', '分区表', '分桶表', 'UDF', '优化'], difficulty: 4, category: '13-bigdata-ecosystem', prerequisites: ['sql-optimization'], relatedPatterns: ['hadoop-ecosystem', 'elasticsearch'], readingTime: 55 } },
              { slug: 'elasticsearch', title: 'Elasticsearch搜索引擎（未实现）', meta: { id: 'elasticsearch', title: 'Elasticsearch搜索引擎', level: 'Senior', tags: ['Elasticsearch', '全文检索', '倒排索引', 'Lucene', '聚合查询', 'ELK'], difficulty: 4, category: '13-bigdata-ecosystem', prerequisites: [], relatedPatterns: ['vector-database', 'semantic-search-optimization'], readingTime: 60 } },
              { slug: 'hdfs', title: 'HDFS分布式文件系统（未实现）', meta: { id: 'hdfs', title: 'HDFS分布式文件系统', level: 'Senior', tags: ['HDFS', 'NameNode', 'DataNode', '副本机制', '块存储', '高可用'], difficulty: 4, category: '13-bigdata-ecosystem', prerequisites: ['hadoop-ecosystem'], relatedPatterns: ['distributed-systems', 'storage'], readingTime: 50 } },
              { slug: 'realtime-data-warehouse', title: '实时数仓架构设计（未实现）', meta: { id: 'realtime-data-warehouse', title: '实时数仓架构设计', level: 'Expert', tags: ['实时数仓', 'Lambda架构', 'Kappa架构', '流批一体', '数据湖', 'Iceberg'], difficulty: 5, category: '13-bigdata-ecosystem', prerequisites: ['flink-streaming', 'hive-data-warehouse'], relatedPatterns: ['stream-batch-unified', 'data-lake'], readingTime: 70 } },
              { slug: 'stream-batch-unified', title: '流批一体处理（未实现）', meta: { id: 'stream-batch-unified', title: '流批一体处理', level: 'Expert', tags: ['流批一体', '统一API', 'Flink SQL', '数据一致性', 'Exactly-Once'], difficulty: 5, category: '13-bigdata-ecosystem', prerequisites: ['flink-streaming', 'spark-computing'], relatedPatterns: ['realtime-data-warehouse', 'data-pipeline'], readingTime: 65 } },
            ],
          },
        ],
      },
      {
        id: 'messaging',
        title: '消息队列',
        icon: '📨',
        domainId: 'infra',
        description: 'Kafka、RocketMQ、RabbitMQ等消息中间件',
        chapters: [
          {
            id: 'kafka',
            title: 'Kafka消息队列',
            icon: '🔥',
            description: 'Kafka高吞吐、分布式消息系统核心原理与实战',
            difficulty: 5,
            color: 'rose',
            articles: [
              { slug: 'kafka-architecture', title: 'Kafka架构与核心概念（未实现）', meta: { id: 'kafka-architecture', title: 'Kafka架构与核心概念', level: 'Expert', tags: ['Kafka', 'Broker', 'Topic', 'Partition', 'Consumer Group', 'ZooKeeper', 'KRaft'], difficulty: 4, category: 'kafka', prerequisites: [], relatedPatterns: ['distributed-systems', 'message-queue'], readingTime: 60 } },
              { slug: 'kafka-producer-consumer', title: 'Kafka生产者与消费者（未实现）', meta: { id: 'kafka-producer-consumer', title: 'Kafka生产者与消费者', level: 'Expert', tags: ['Producer', 'Consumer', '序列化', '分区策略', '位移提交', '重平衡'], difficulty: 4, category: 'kafka', prerequisites: ['kafka-architecture'], relatedPatterns: ['message-reliability', 'performance-tuning'], readingTime: 65 } },
              { slug: 'kafka-reliability', title: 'Kafka消息可靠性保证（未实现）', meta: { id: 'kafka-reliability', title: 'Kafka消息可靠性保证', level: 'Expert', tags: ['ACK机制', 'ISR', '副本同步', '事务', '幂等性', 'Exactly-Once', '消息丢失'], difficulty: 5, category: 'kafka', prerequisites: ['kafka-architecture'], relatedPatterns: ['distributed-transaction', 'message-queue'], readingTime: 70 } },
              { slug: 'kafka-streams', title: 'Kafka Streams流处理（未实现）', meta: { id: 'kafka-streams', title: 'Kafka Streams流处理', level: 'Expert', tags: ['Kafka Streams', 'Stream Processing', 'KTable', 'Window', 'Join', '状态存储'], difficulty: 5, category: 'kafka', prerequisites: ['kafka-architecture'], relatedPatterns: ['flink-streaming', 'stream-batch-unified'], readingTime: 65 } },
              { slug: 'kafka-performance-tuning', title: 'Kafka性能调优（未实现）', meta: { id: 'kafka-performance-tuning', title: 'Kafka性能调优', level: 'Expert', tags: ['批量发送', '压缩算法', '零拷贝', '页缓存', '顺序写', '参数调优'], difficulty: 5, category: 'kafka', prerequisites: ['kafka-architecture'], relatedPatterns: ['performance-tuning', 'high-throughput'], readingTime: 60 } },
            ],
          },
          {
            id: 'rocketmq',
            title: 'RocketMQ消息队列',
            icon: '🚀',
            description: 'RocketMQ事务消息、顺序消息、延迟消息等企业级特性',
            difficulty: 4,
            color: 'indigo',
            articles: [
              { slug: 'rocketmq-architecture', title: 'RocketMQ架构设计（未实现）', meta: { id: 'rocketmq-architecture', title: 'RocketMQ架构设计', level: 'Expert', tags: ['RocketMQ', 'NameServer', 'Broker', 'Producer', 'Consumer', 'CommitLog', 'ConsumeQueue'], difficulty: 4, category: 'rocketmq', prerequisites: [], relatedPatterns: ['kafka-architecture', 'distributed-systems'], readingTime: 60 } },
              { slug: 'rocketmq-transaction', title: 'RocketMQ事务消息（未实现）', meta: { id: 'rocketmq-transaction', title: 'RocketMQ事务消息', level: 'Expert', tags: ['事务消息', '半消息', '回查机制', '最终一致性', '分布式事务'], difficulty: 5, category: 'rocketmq', prerequisites: ['rocketmq-architecture'], relatedPatterns: ['distributed-transaction', 'message-reliability'], readingTime: 65 } },
              { slug: 'rocketmq-advanced', title: 'RocketMQ高级特性（未实现）', meta: { id: 'rocketmq-advanced', title: 'RocketMQ高级特性', level: 'Expert', tags: ['顺序消息', '延迟消息', '批量消息', '消息过滤', '重试机制', '死信队列'], difficulty: 4, category: 'rocketmq', prerequisites: ['rocketmq-architecture'], relatedPatterns: ['message-patterns', 'error-handling'], readingTime: 55 } },
              { slug: 'rocketmq-ha', title: 'RocketMQ高可用与容灾（未实现）', meta: { id: 'rocketmq-ha', title: 'RocketMQ高可用与容灾', level: 'Expert', tags: ['主从同步', 'DLedger', '多副本', '故障切换', '数据恢复', '双主双从'], difficulty: 5, category: 'rocketmq', prerequisites: ['rocketmq-architecture'], relatedPatterns: ['high-availability', 'disaster-recovery'], readingTime: 60 } },
            ],
          },
          {
            id: 'rabbitmq',
            title: 'RabbitMQ消息队列',
            icon: '🐰',
            description: 'RabbitMQ AMQP协议、路由模式、集群部署',
            difficulty: 4,
            color: 'teal',
            articles: [
              { slug: 'rabbitmq-core', title: 'RabbitMQ核心概念（未实现）', meta: { id: 'rabbitmq-core', title: 'RabbitMQ核心概念', level: 'Senior', tags: ['RabbitMQ', 'AMQP', 'Exchange', 'Queue', 'Binding', 'Routing Key', 'Virtual Host'], difficulty: 3, category: 'rabbitmq', prerequisites: [], relatedPatterns: ['message-queue', 'protocol-design'], readingTime: 50 } },
              { slug: 'rabbitmq-routing', title: 'RabbitMQ路由模式（未实现）', meta: { id: 'rabbitmq-routing', title: 'RabbitMQ路由模式', level: 'Senior', tags: ['Direct', 'Fanout', 'Topic', 'Headers', '路由策略', '消息分发'], difficulty: 4, category: 'rabbitmq', prerequisites: ['rabbitmq-core'], relatedPatterns: ['message-patterns', 'event-driven'], readingTime: 55 } },
              { slug: 'rabbitmq-reliability', title: 'RabbitMQ消息可靠性（未实现）', meta: { id: 'rabbitmq-reliability', title: 'RabbitMQ消息可靠性', level: 'Expert', tags: ['持久化', 'ACK机制', '镜像队列', '事务', 'Confirm模式', '消息确认'], difficulty: 5, category: 'rabbitmq', prerequisites: ['rabbitmq-core'], relatedPatterns: ['message-reliability', 'high-availability'], readingTime: 60 } },
              { slug: 'rabbitmq-cluster', title: 'RabbitMQ集群与高可用（未实现）', meta: { id: 'rabbitmq-cluster', title: 'RabbitMQ集群与高可用', level: 'Expert', tags: ['集群模式', '镜像队列', 'HaProxy', '负载均衡', '故障转移', '联邦队列'], difficulty: 5, category: 'rabbitmq', prerequisites: ['rabbitmq-core'], relatedPatterns: ['high-availability', 'load-balancing'], readingTime: 65 } },
            ],
          },
        ],
      },
    ],
  },
];

// ===== 章节数据（由 domains 派生，单一数据源） =====

export const chapters: Chapter[] = domains.flatMap(d => d.subCategories.flatMap(sc => sc.chapters));

// ===== 学习目标路线 =====

export const learningGoals: LearningGoal[] = [
  {
    id: 'backend-engineer',
    title: '后端工程师',
    icon: '⚙️',
    description: '掌握 Java 生态核心技术栈，成为合格的后端开发工程师',
    stages: [
      {
        title: '语言基础',
        estimatedHours: 40,
        nodes: [
          { chapterId: '01-java-core', title: 'Java 基础', icon: '☕', readingTime: 465, difficulty: 2 },
          { chapterId: '05-functional-programming', title: '函数式编程', icon: '⚡', readingTime: 125, difficulty: 3 },
        ],
      },
      {
        title: '数据结构与集合',
        estimatedHours: 30,
        nodes: [
          { chapterId: '02-collections', title: '集合框架', icon: '📦', readingTime: 305, difficulty: 3 },
        ],
      },
      {
        title: '并发编程',
        estimatedHours: 25,
        nodes: [
          { chapterId: '03-multithreading', title: '并发编程与多线程', icon: '🧵', readingTime: 315, difficulty: 4 },
        ],
      },
      {
        title: 'JVM性能优化',
        estimatedHours: 20,
        nodes: [
          { chapterId: '04-jvm', title: 'JVM性能优化', icon: '⚙️', readingTime: 225, difficulty: 5 },
        ],
      },
      {
        title: '企业级框架',
        estimatedHours: 35,
        nodes: [
          { chapterId: '06-spring-framework', title: 'Spring框架全家桶', icon: '🌱', readingTime: 450, difficulty: 4 },
        ],
      },
      {
        title: '数据访问技术',
        estimatedHours: 25,
        nodes: [
          { chapterId: '07-database', title: '数据库访问技术', icon: '🗄️', readingTime: 300, difficulty: 3 },
        ],
      },
      {
        title: '微服务架构',
        estimatedHours: 30,
        nodes: [
          { chapterId: '08-microservices', title: '微服务架构', icon: '🌐', readingTime: 295, difficulty: 5 },
        ],
      },
      {
        title: '设计模式与架构',
        estimatedHours: 20,
        nodes: [
          { chapterId: '09-design-patterns', title: '设计模式', icon: '🏗️', readingTime: 205, difficulty: 3 },
        ],
      },
      {
        title: '网络与安全',
        estimatedHours: 25,
        nodes: [
          { chapterId: '10-network-protocol', title: '网络编程与协议', icon: '🌐', readingTime: 200, difficulty: 3 },
          { chapterId: '12-java-security', title: 'Java安全', icon: '🔐', readingTime: 150, difficulty: 4 },
        ],
      },
      {
        title: '工程化实践',
        estimatedHours: 15,
        nodes: [
          { chapterId: '11-build-tools', title: '构建工具与工程化', icon: '🔧', readingTime: 180, difficulty: 2 },
        ],
      },
    ],
  },
  {
    id: 'fullstack-engineer',
    title: '全栈工程师',
    icon: '🔄',
    description: '前后端通吃，独立完成全链路开发',
    stages: [
      {
        title: '后端基础',
        estimatedHours: 40,
        nodes: [
          { chapterId: '01-java-core', title: 'Java 基础', icon: '☕', readingTime: 60, difficulty: 2 },
          { chapterId: '01-python-basics', title: 'Python 基础', icon: '🐍', readingTime: 240, difficulty: 2 },
        ],
      },
      {
        title: 'AI 赋能',
        estimatedHours: 60,
        nodes: [
          { chapterId: '06-ai-theory', title: '理论基础', icon: '📚', readingTime: 230, difficulty: 2 },
          { chapterId: '07-ai-frameworks', title: '开发框架', icon: '⛓️', readingTime: 270, difficulty: 4 },
          { chapterId: '08-ai-applications', title: '应用实践', icon: '🚀', readingTime: 510, difficulty: 4 },
        ],
      },
      {
        title: 'AI 工程化',
        estimatedHours: 40,
        nodes: [
          { chapterId: '09-ai-engineering', title: 'AI工程化进阶', icon: '⚙️', readingTime: 250, difficulty: 5 },
          { chapterId: '12-ai-coding-tools', title: 'AI Coding工具', icon: '💻', readingTime: 120, difficulty: 3 },
        ],
      },
    ],
  },
  {
    id: 'ai-engineer',
    title: 'AI 工程师',
    icon: '🤖',
    description: '掌握 AI 应用开发全栈能力，从模型调用到 Agent 编排',
    stages: [
      {
        title: 'Python 基础',
        estimatedHours: 40,
        nodes: [
          { chapterId: '01-python-basics', title: 'Python 基础', icon: '🐍', readingTime: 240, difficulty: 2 },
        ],
      },
      {
        title: 'AI 核心',
        estimatedHours: 50,
        nodes: [
          { chapterId: '06-ai-theory', title: '理论基础', icon: '📚', readingTime: 230, difficulty: 2 },
          { chapterId: '07-ai-frameworks', title: '开发框架', icon: '⛓️', readingTime: 270, difficulty: 4 },
        ],
      },
      {
        title: 'AI 应用',
        estimatedHours: 60,
        nodes: [
          { chapterId: '08-ai-applications', title: '应用实践', icon: '🚀', readingTime: 510, difficulty: 4 },
          { chapterId: '10-llm-advanced', title: 'LLM高级应用', icon: '🔥', readingTime: 680, difficulty: 5 },
        ],
      },
      {
        title: '多智能体与工具',
        estimatedHours: 40,
        nodes: [
          { chapterId: '11-ai-agent-frameworks', title: 'AI多智能体框架', icon: '🤖', readingTime: 170, difficulty: 5 },
          { chapterId: '12-ai-coding-tools', title: 'AI Coding工具', icon: '💻', readingTime: 120, difficulty: 3 },
        ],
      },
      {
        title: 'AI 工程化',
        estimatedHours: 30,
        nodes: [
          { chapterId: '09-ai-engineering', title: 'AI工程化进阶', icon: '⚙️', readingTime: 250, difficulty: 5 },
        ],
      },
    ],
  },
  {
    id: 'bigdata-engineer',
    title: '大数据工程师',
    icon: '📊',
    description: '掌握大数据生态系统，具备实时计算与离线分析能力',
    stages: [
      {
        title: '编程基础',
        estimatedHours: 40,
        nodes: [
          { chapterId: '01-java-core', title: 'Java 基础', icon: '☕', readingTime: 465, difficulty: 2 },
          { chapterId: '01-python-basics', title: 'Python 基础', icon: '🐍', readingTime: 240, difficulty: 2 },
        ],
      },
      {
        title: '数据库基础',
        estimatedHours: 50,
        nodes: [
          { chapterId: 'mysql', title: 'MySQL数据库', icon: '🐬', readingTime: 320, difficulty: 4 },
          { chapterId: 'postgresql', title: 'PostgreSQL数据库', icon: '🐘', readingTime: 235, difficulty: 4 },
          { chapterId: 'redis', title: 'Redis', icon: '⚡', readingTime: 65, difficulty: 4 },
        ],
      },
      {
        title: 'OLAP与分析',
        estimatedHours: 30,
        nodes: [
          { chapterId: 'clickhouse', title: 'ClickHouse OLAP', icon: '⚡', readingTime: 190, difficulty: 5 },
          { chapterId: 'elasticsearch', title: 'Elasticsearch', icon: '🔍', readingTime: 60, difficulty: 4 },
        ],
      },
      {
        title: '消息队列',
        estimatedHours: 40,
        nodes: [
          { chapterId: 'kafka', title: 'Kafka', icon: '🔥', readingTime: 320, difficulty: 5 },
          { chapterId: 'rocketmq', title: 'RocketMQ', icon: '🚀', readingTime: 240, difficulty: 4 },
          { chapterId: 'rabbitmq', title: 'RabbitMQ', icon: '🐰', readingTime: 230, difficulty: 4 },
        ],
      },
      {
        title: '大数据生态',
        estimatedHours: 80,
        nodes: [
          { chapterId: '13-bigdata-ecosystem', title: '大数据生态', icon: '📊', readingTime: 505, difficulty: 5 },
        ],
      },
      {
        title: '分布式系统',
        estimatedHours: 40,
        nodes: [
          { chapterId: '08-microservices', title: '微服务架构', icon: '🌐', readingTime: 295, difficulty: 5 },
        ],
      },
    ],
  },
];

// ===== 数据完整性校验 =====

export function validateDataIntegrity(): string[] {
  const errors: string[] = [];
  const chapterIds = new Set(chapters.map(c => c.id));

  // 检查 learningGoals 中的 chapterId 是否都存在于 chapters 中
  for (const goal of learningGoals) {
    for (const stage of goal.stages) {
      for (const node of stage.nodes) {
        if (!chapterIds.has(node.chapterId)) {
          errors.push(`learningGoals: chapterId "${node.chapterId}" in goal "${goal.id}" does not exist in chapters`);
        }
      }
    }
  }

  // 检查文章的 prerequisites 和 relatedPatterns 中的引用是否有效
  const articleSlugs = new Set(chapters.flatMap(c => c.articles.map(a => a.slug)));
  for (const chapter of chapters) {
    for (const article of chapter.articles) {
      for (const prereq of article.meta.prerequisites) {
        if (!articleSlugs.has(prereq)) {
          errors.push(`prerequisites: article "${article.slug}" references non-existent prereq "${prereq}"`);
        }
      }
    }
  }

  // 检查 domains 中的 subCategory.domainId 是否与父 domain.id 一致
  for (const domain of domains) {
    for (const sub of domain.subCategories) {
      if (sub.domainId !== domain.id) {
        errors.push(`domains: subCategory "${sub.id}" has domainId "${sub.domainId}" but is under domain "${domain.id}"`);
      }
    }
  }

  return errors;
}

// 开发模式下自动校验
if (import.meta.env.DEV) {
  const errors = validateDataIntegrity();
  if (errors.length > 0) {
    console.warn('[Data Integrity] 以下数据不一致：', errors);
  }
}

// ===== 查询函数 =====

export function getChapterById(id: string): Chapter | undefined {
  return chapters.find(c => c.id === id);
}

export function getTotalArticles(): number {
  return chapters.reduce((sum, ch) => sum + ch.articles.length, 0);
}

export function getArticlePath(chapterId: string, slug: string): string {
  return `/docs/${chapterId}/${slug}`;
}

export function getDomainById(id: string): Domain | undefined {
  return domains.find(d => d.id === id);
}

export function getSubCategoryById(id: string): SubCategory | undefined {
  for (const domain of domains) {
    const found = domain.subCategories.find(sc => sc.id === id);
    if (found) return found;
  }
  return undefined;
}

export function getSubCategoryForChapter(chapterId: string): SubCategory | undefined {
  for (const domain of domains) {
    const found = domain.subCategories.find(sc =>
      sc.chapters.some(ch => ch.id === chapterId)
    );
    if (found) return found;
  }
  return undefined;
}

export interface ArticleNavItem {
  prevTitle?: string;
  prevPath?: string;
  nextTitle?: string;
  nextPath?: string;
}

export function getArticleNav(chapterId: string, slug: string): ArticleNavItem {
  const flatList = chapters.flatMap(ch =>
    ch.articles.map(a => ({ chapterId: ch.id, slug: a.slug, title: a.title }))
  );
  const index = flatList.findIndex(a => a.chapterId === chapterId && a.slug === slug);
  if (index === -1) return {};

  const prev = index > 0 ? flatList[index - 1] : undefined;
  const next = index < flatList.length - 1 ? flatList[index + 1] : undefined;

  return {
    prevTitle: prev?.title,
    prevPath: prev ? getArticlePath(prev.chapterId, prev.slug) : undefined,
    nextTitle: next?.title,
    nextPath: next ? getArticlePath(next.chapterId, next.slug) : undefined,
  };
}

export function getArticleMeta(chapterId: string, slug: string) {
  const chapter = chapters.find(c => c.id === chapterId);
  if (!chapter) return undefined;
  
  const article = chapter.articles.find(a => a.slug === slug);
  return article?.meta;
}
