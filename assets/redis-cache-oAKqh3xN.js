import{j as e,g as n}from"./index-hyqxTCwJ.js";import{K as x}from"./KnowledgeLayout-CwkOMHwC.js";import{C as i,A as a,S as c}from"./ArticleNav-DhfiS38Y.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as d}from"./SideNote-BKvanovA.js";import{C as m}from"./ContextSwitcher-Cjd-h5IL.js";import{I as o}from"./InterviewSection-BBNdwyyN.js";import{D as r}from"./DiagramBlock-CLaKE9_7.js";const p=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"core",text:"核心原理",level:2},{id:"data-structures",text:"数据结构详解",level:3},{id:"persistence",text:"持久化机制",level:3},{id:"source-code",text:"源码分析",level:2},{id:"cache-strategies",text:"缓存策略",level:2},{id:"cache-problems",text:"缓存三大问题",level:3},{id:"distributed-lock",text:"分布式锁实现",level:3},{id:"cluster",text:"集群与高可用",level:2},{id:"sentinel",text:"哨兵模式",level:3},{id:"cluster-mode",text:"Cluster 分片集群",level:3},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比其他缓存方案",level:2},{id:"related",text:"知识关联",level:2}];function f({meta:t}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(x,{meta:t,children:[e.jsxs("div",{className:"mb-8 pb-6 border-b border-border-light",children:[e.jsx("h1",{className:"font-display font-bold text-3xl sm:text-4xl mb-3 text-ink",children:t.title}),e.jsxs("div",{className:"flex flex-wrap gap-2 items-center text-sm text-ink-muted",children:[e.jsx("span",{className:"px-2 py-1 bg-accent-soft text-accent rounded-md font-medium",children:t.level}),e.jsx("span",{children:"难度 ⭐⭐⭐⭐⭐"}),e.jsxs("span",{children:["预计阅读 ",t.readingTime," 分钟"]})]}),e.jsx("div",{className:"mt-3 flex flex-wrap gap-2",children:t.tags.map(l=>e.jsx("span",{className:"px-2.5 py-0.5 bg-parchment-deep text-ink-muted rounded-full text-xs",children:l},l))})]}),e.jsxs("section",{id:"definition",className:"mb-8",children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"pl-4 border-l-4 border-accent bg-accent-soft/40 py-3 pr-4 rounded-r-paper-md italic text-ink-light",children:"Redis（Remote Dictionary Server）是一个基于内存的高性能键值对存储数据库，支持字符串、哈希、列表、集合、有序集合等多种数据结构，并提供持久化、主从复制、集群等特性，广泛应用于缓存、会话管理、消息队列等场景。"}),e.jsx(d,{label:"为什么叫 Redis？",children:'Redis 最初由 Salvatore Sanfilippo 开发，名称来源于 "REmote DIctionary Server"。它的设计理念是"简单即美"，通过单线程模型和高效的数据结构实现极高的性能。'})]}),e.jsxs("section",{id:"overview",className:"mb-8",children:[e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"整体架构"}),e.jsx(r,{title:"Redis 架构概览",children:`graph TD
                CLIENT["Client"] --> TCP["TCP连接"]
                TCP --> EL["网络层 Event Loop"]
                EL --> CMD["命令解析器"]
                CMD --> MEM["内存数据库 - 数据结构"]
                MEM --> PERS["持久化模块 RDB/AOF"]
                PERS --> DISK["磁盘存储"]
                MEM --> REPL["复制模块 Master-Slave"]
                REPL --> SLAVE["从节点"]
              `}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Redis 采用单线程事件驱动模型，所有命令都在一个线程中串行执行，避免了多线程上下文切换和锁竞争带来的开销。其核心组件包括："}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"网络层"}),"：基于 epoll/kqueue 的 I/O 多路复用，支持高并发连接"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"命令解析器"}),"：将客户端请求解析为内部命令并执行"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"内存数据库"}),"：使用多种高效数据结构存储数据"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"持久化模块"}),"：RDB 快照和 AOF 日志两种持久化方式"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"复制模块"}),"：主从复制实现读写分离和高可用"]})]})]}),e.jsxs("section",{id:"core",className:"mb-8",children:[e.jsx("h2",{id:"core",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"核心原理"}),e.jsx("h3",{id:"data-structures",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"数据结构详解"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Redis 支持 5 种基础数据结构和 3 种高级数据结构，每种结构都有特定的应用场景："}),e.jsx(m,{simpleContent:e.jsxs("div",{children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:["Redis 支持 5 种基础数据结构：",e.jsx("strong",{children:"String"}),"（字符串）、",e.jsx("strong",{children:"Hash"}),"（哈希）、",e.jsx("strong",{children:"List"}),"（列表）、",e.jsx("strong",{children:"Set"}),"（集合）、",e.jsx("strong",{children:"ZSet"}),"（有序集合）。"]}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted",children:"每种结构都有特定的应用场景，如 String 适合缓存、Hash 适合存储对象、List 适合消息队列、Set 适合标签系统、ZSet 适合排行榜。"})]}),hardcoreContent:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"String（字符串）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:"最基本的类型，可以存储字符串、整数或浮点数。支持原子操作如 INCR、DECR。"}),e.jsx(s,{code:`# String 基本操作
SET user:1001 "张三"
GET user:1001
# 输出: "张三"

INCR counter
# 输出: 1
INCR counter
# 输出: 2

SETEX session:abc123 3600 "user_data"
# 设置带过期时间的键`,language:"bash",description:"String 是最常用的数据类型，适合缓存、计数器等场景"})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"Hash（哈希）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:"适合存储对象，每个字段都是字符串。比多个 String 更节省内存。"}),e.jsx(s,{code:`# Hash 基本操作
HSET user:1001 name "张三" age 25 city "北京"
HGET user:1001 name
# 输出: "张三"

HGETALL user:1001
# 输出: ["name", "张三", "age", "25", "city", "北京"]

HINCRBY user:1001 age 1
# 输出: 26`,language:"bash",description:"Hash 适合存储用户信息、商品详情等结构化数据"})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"List（列表）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:"双向链表实现，支持从两端插入和弹出。适合消息队列、最新 N 条记录等场景。"}),e.jsx(s,{code:`# List 基本操作
LPUSH messages "消息1"
LPUSH messages "消息2"
LRANGE messages 0 -1
# 输出: ["消息2", "消息1"]

RPOP messages
# 输出: "消息1"

LLEN messages
# 输出: 1`,language:"bash",description:"List 适合实现消息队列、时间线等功能"})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"Set（集合）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:"无序且不重复的元素集合。支持交集、并集、差集运算。"}),e.jsx(s,{code:`# Set 基本操作
SADD tags:article:1 "Java" "Spring" "Redis"
SADD tags:article:2 "Python" "Django" "Redis"

SINTER tags:article:1 tags:article:2
# 输出: ["Redis"] （共同标签）

SUNION tags:article:1 tags:article:2
# 输出: ["Java", "Spring", "Redis", "Python", "Django"]

SCARD tags:article:1
# 输出: 3`,language:"bash",description:"Set 适合标签系统、共同好友、抽奖等场景"})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"ZSet（有序集合）"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3",children:"每个元素关联一个分数（score），按分数排序。适合排行榜、优先级队列等。"}),e.jsx(s,{code:`# ZSet 基本操作
ZADD leaderboard 100 "玩家A" 200 "玩家B" 150 "玩家C"

ZRANGE leaderboard 0 -1 WITHSCORES
# 输出: ["玩家A", "100", "玩家C", "150", "玩家B", "200"]

ZREVRANGE leaderboard 0 2 WITHSCORES
# 输出: ["玩家B", "200", "玩家C", "150", "玩家A", "100"] （降序前3名）

ZRANK leaderboard "玩家C"
# 输出: 1 （排名，从0开始）`,language:"bash",description:"ZSet 适合排行榜、延迟队列、滑动窗口限流等场景"})]})]})}),e.jsx("h3",{id:"persistence",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"持久化机制"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Redis 提供两种持久化方式，可以单独使用或组合使用："}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-6",children:[e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-white shadow-sm",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"RDB（Redis Database）"}),e.jsxs("ul",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-1",children:[e.jsx("li",{children:"• 定期生成数据快照"}),e.jsx("li",{children:"• 文件紧凑，适合备份"}),e.jsx("li",{children:"• 恢复速度快"}),e.jsx("li",{children:"• 可能丢失最后一次快照后的数据"})]})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 bg-white shadow-sm",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"AOF（Append Only File）"}),e.jsxs("ul",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-1",children:[e.jsx("li",{children:"• 记录每次写操作命令"}),e.jsx("li",{children:"• 数据安全性更高"}),e.jsx("li",{children:"• 文件体积较大"}),e.jsx("li",{children:"• 恢复速度较慢"})]})]})]}),e.jsx(s,{code:`# RDB 配置
save 900 1      # 900秒内至少1个key变化则保存
save 300 10     # 300秒内至少10个key变化则保存
save 60 10000   # 60秒内至少10000个key变化则保存

# AOF 配置
appendonly yes
appendfsync everysec  # 每秒同步一次到磁盘（推荐）
# appendfsync always  # 每次写操作都同步（最安全但最慢）
# appendfsync no      # 由操作系统决定何时同步（最快但不安全）

# 混合持久化（Redis 4.0+）
aof-use-rdb-preamble yes  # AOF重写时使用RDB格式`,language:"conf",description:"生产环境建议同时开启 RDB 和 AOF，兼顾性能和数据安全"})]}),e.jsxs("section",{id:"source-code",className:"mb-8",children:[e.jsx("h2",{id:"source-code",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"源码分析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Redis 的核心数据结构在底层使用 C 语言实现，以下是 String 类型的简化实现逻辑："}),e.jsx(s,{code:`// Redis String 底层实现（简化版）
typedef struct sdshdr {
    int len;        // 字符串长度
    int free;       // 剩余空间
    char buf[];     // 柔性数组，存储实际内容
} sdshdr;

// SET 命令处理流程
void setCommand(client *c) {
    // 1. 解析参数
    robj *key = c->argv[1];
    robj *val = c->argv[2];
    
    // 2. 查找 key 是否存在
    robj *o = lookupKeyWrite(c->db, key);
    
    // 3. 如果存在且设置了 NX 选项，返回错误
    if (o != NULL && nx) {
        addReply(c, shared.null[c->resp]);
        return;
    }
    
    // 4. 设置 key-value
    setKey(c, c->db, key, val);
    
    // 5. 设置过期时间（如果有 EX/PX 选项）
    if (expire) {
        setExpire(c, c->db, key, mstime() + ttl);
    }
    
    // 6. 发送响应
    addReply(c, shared.ok);
    
    // 7. 触发持久化（如果开启 AOF）
    signalModifiedKey(c, c->db, key);
}`,language:"c",description:"Redis 命令处理的核心流程：解析 → 查找 → 执行 → 响应 → 持久化"}),e.jsx(d,{label:"为什么 Redis 这么快？",children:e.jsxs("ol",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"纯内存操作"}),"：数据全部存储在内存中，读写速度极快"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"单线程模型"}),"：避免多线程上下文切换和锁竞争"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"I/O 多路复用"}),"：使用 epoll/kqueue 处理高并发连接"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"高效数据结构"}),"：SDS、跳表、压缩列表等优化设计"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"避免复杂计算"}),"：不支持 SQL 查询、事务等复杂操作"]})]})})]}),e.jsxs("section",{id:"cache-strategies",className:"mb-8",children:[e.jsx("h2",{id:"cache-strategies",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"缓存策略"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Redis 作为缓存使用时，需要合理选择缓存策略以平衡性能和数据一致性："}),e.jsx("h3",{id:"cache-problems",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"缓存三大问题"}),e.jsxs("div",{className:"space-y-4 mb-6",children:[e.jsxs(i,{type:"danger",title:"缓存穿透",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"问题"}),"：查询不存在的数据，请求直接打到数据库。"]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2",children:[e.jsx("strong",{children:"解决方案"}),"："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4",children:[e.jsx("li",{children:"布隆过滤器拦截非法请求"}),e.jsx("li",{children:"缓存空值（设置较短过期时间）"}),e.jsx("li",{children:"参数校验，过滤异常请求"})]})]}),e.jsxs(i,{type:"warning",title:"缓存击穿",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"问题"}),"：热点 key 过期瞬间，大量请求同时访问数据库。"]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2",children:[e.jsx("strong",{children:"解决方案"}),"："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4",children:[e.jsx("li",{children:"互斥锁（只允许一个线程查询数据库）"}),e.jsx("li",{children:"逻辑过期（不设置物理过期时间，后台异步更新）"}),e.jsx("li",{children:"热点 key 永不过期"})]})]}),e.jsxs(i,{type:"info",title:"缓存雪崩",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"问题"}),"：大量 key 同时过期，导致数据库压力骤增。"]}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2",children:[e.jsx("strong",{children:"解决方案"}),"："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4",children:[e.jsx("li",{children:"过期时间添加随机值，避免集中过期"}),e.jsx("li",{children:"多级缓存（本地缓存 + Redis）"}),e.jsx("li",{children:"熔断降级，保护数据库"})]})]})]}),e.jsx("h3",{id:"distributed-lock",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"分布式锁实现"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Redis 可以实现分布式锁，用于在分布式系统中保证同一时刻只有一个客户端执行特定操作："}),e.jsx(s,{code:`# 使用 SETNX + EXPIRE 实现分布式锁（不推荐，非原子操作）
SETNX lock:key unique_value
EXPIRE lock:key 10

# 使用 SET 命令原子性设置（推荐）
SET lock:key unique_value NX EX 10

# 释放锁（Lua 脚本保证原子性）
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end

# Redlock 算法（多节点提高可靠性）
# 1. 获取当前时间
# 2. 依次向 N 个 Redis 实例请求锁
# 3. 如果大多数节点成功，且总耗时小于有效期，则认为加锁成功
# 4. 锁的有效时间 = 初始有效期 - 获取锁耗时`,language:"bash",description:"分布式锁需要注意死锁、可重入性、锁续期等问题"}),e.jsx(d,{label:"Redlock 争议",children:"Martin Kleppmann 和 Antirez（Redis 作者）曾就 Redlock 的安全性展开激烈辩论。主要争议点在于时钟漂移可能导致锁失效。在实际生产中，建议使用成熟的客户端库如 Redisson。"})]}),e.jsxs("section",{id:"cluster",className:"mb-8",children:[e.jsx("h2",{id:"cluster",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"集群与高可用"}),e.jsx("h3",{id:"sentinel",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"哨兵模式"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Sentinel（哨兵）是 Redis 的高可用解决方案，负责监控主从节点并在主节点故障时自动进行故障转移："}),e.jsx(r,{title:"Sentinel 工作原理",children:`graph TD
                SENT["Sentinel 集群 3个节点"] --> |监控| MASTER["Redis Master"]
                MASTER --> |复制| SLAVE1["Slave 1"]
                MASTER --> |复制| SLAVE2["Slave 2"]
                MASTER -.-> SENT
                SENT --> |故障转移| FAILOVER["1.主观下线 → 2.客观下线 → 3.选举Leader → 4.故障转移 → 5.通知客户端"]
              `}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"故障转移流程"}),"："]}),e.jsxs("ol",{className:"list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"主观下线"}),"：单个 Sentinel 认为 Master 不可用"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"客观下线"}),"：多数 Sentinel 同意 Master 不可用"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"选举 Leader"}),"：Raft 算法选出一个 Sentinel 作为领导者"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"故障转移"}),"：Leader 选择一个 Slave 提升为新的 Master"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"通知客户端"}),"：更新配置，客户端连接到新 Master"]})]}),e.jsx("h3",{id:"cluster-mode",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"Cluster 分片集群"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Redis Cluster 是官方提供的分布式解决方案，通过数据分片实现水平扩展："}),e.jsx(s,{code:`# Cluster 配置
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000

# 创建集群（6个节点：3主3从）
redis-cli --cluster create \\
  127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \\
  127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \\
  --cluster-replicas 1

# 查看集群状态
redis-cli --cluster check 127.0.0.1:7000

# 数据分片原理
# CRC16(key) % 16384 = slot（槽位）
# 16384 个槽位分配到不同节点`,language:"bash",description:"Cluster 通过哈希槽实现数据分片，支持自动故障转移"}),e.jsx(d,{label:"Cluster vs Sentinel",children:e.jsxs("ul",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Sentinel"}),"：主从复制 + 自动故障转移，适合读多写少场景"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cluster"}),"：数据分片 + 高可用，适合大数据量和高并发场景"]}),e.jsx("li",{children:"生产环境通常两者结合使用，或者直接使用云服务（如阿里云 Redis 集群版）"})]})})]}),e.jsxs("section",{id:"misconceptions",className:"mb-8",children:[e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"常见误区"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{type:"danger",title:"误区 1：Redis 是线程安全的",children:e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：Redis 是单线程模型，命令串行执行，天然线程安全。但需要注意 Lua 脚本的原子性和事务的非隔离性。"]})}),e.jsxs(i,{type:"danger",title:"误区 2：大 key 不影响性能",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：大 key（如包含百万元素的 Hash）会导致："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4",children:[e.jsx("li",{children:"阻塞 Redis 单线程，影响其他命令执行"}),e.jsx("li",{children:"网络传输开销大"}),e.jsx("li",{children:"删除时可能导致长时间阻塞（使用 UNLINK 异步删除）"})]})]}),e.jsxs(i,{type:"warning",title:"误区 3：缓存一定能提升性能",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：不当的缓存策略可能导致："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4",children:[e.jsx("li",{children:"缓存穿透/击穿/雪崩反而拖垮数据库"}),e.jsx("li",{children:"缓存不一致导致业务逻辑错误"}),e.jsx("li",{children:"过度缓存浪费内存资源"})]})]}),e.jsxs(i,{type:"info",title:"误区 4：Redis 只能做缓存",children:[e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:[e.jsx("strong",{children:"事实"}),"：Redis 还可以用于："]}),e.jsxs("ul",{className:"list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4",children:[e.jsx("li",{children:"分布式锁（SETNX + Lua）"}),e.jsx("li",{children:"消息队列（List/Stream）"}),e.jsx("li",{children:"排行榜（ZSet）"}),e.jsx("li",{children:"计数器（INCR）"}),e.jsx("li",{children:"会话管理（Session）"}),e.jsx("li",{children:"限流（滑动窗口）"})]})]})]})]}),e.jsxs("section",{id:"interview",className:"mb-8",children:[e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"面试真题"}),e.jsx(o,{questions:[{question:"Redis 为什么这么快？",answer:`主要原因有 5 点：
1. 纯内存操作，避免磁盘 I/O 开销
2. 单线程模型，避免多线程上下文切换和锁竞争
3. I/O 多路复用（epoll/kqueue），支持高并发连接
4. 高效的数据结构（SDS、跳表、压缩列表等）
5. 避免复杂计算，不支持 SQL 查询等重量级操作

性能参考：单机 QPS 可达 10w+，读写延迟通常在 1ms 以内。`},{question:"Redis 的持久化方式有哪些？如何选择？",answer:`Redis 提供两种持久化方式：

1. RDB（Redis Database）：
   - 定期生成数据快照
   - 优点：文件紧凑、恢复速度快、适合备份
   - 缺点：可能丢失最后一次快照后的数据

2. AOF（Append Only File）：
   - 记录每次写操作命令
   - 优点：数据安全性高，最多丢失 1 秒数据（everysec 策略）
   - 缺点：文件体积大、恢复速度慢

生产环境建议：同时开启 RDB 和 AOF，兼顾性能和数据安全。Redis 4.0+ 支持混合持久化，AOF 重写时使用 RDB 格式。`},{question:"如何解决缓存穿透、击穿、雪崩问题？",answer:`1. 缓存穿透（查询不存在的数据）：
   - 布隆过滤器拦截非法请求
   - 缓存空值（设置较短过期时间）
   - 参数校验，过滤异常请求

2. 缓存击穿（热点 key 过期）：
   - 互斥锁（只允许一个线程查询数据库）
   - 逻辑过期（不设置物理过期时间，后台异步更新）
   - 热点 key 永不过期

3. 缓存雪崩（大量 key 同时过期）：
   - 过期时间添加随机值，避免集中过期
   - 多级缓存（本地缓存 + Redis）
   - 熔断降级，保护数据库`},{question:"Redis 如何实现分布式锁？有什么注意事项？",answer:`实现方式：
1. 基础实现：SET key value NX EX seconds（原子性设置）
2. 释放锁：Lua 脚本保证原子性（先判断再删除）
3. 进阶方案：Redlock 算法（多节点提高可靠性）

注意事项：
- 死锁问题：必须设置过期时间
- 可重入性：需要使用 ThreadLocal 记录锁持有者
- 锁续期：看门狗机制定期延长锁的有效期
- 时钟漂移：Redlock 存在争议，建议使用 Redisson 等成熟客户端`},{question:"Redis Cluster 的数据分片原理是什么？",answer:`Redis Cluster 使用哈希槽（hash slot）实现数据分片：

1. 总共 16384 个槽位（0-16383）
2. 计算 key 的槽位：CRC16(key) % 16384
3. 每个节点负责一部分槽位
4. 客户端根据槽位路由到对应节点

特点：
- 支持在线扩容/缩容（迁移槽位）
- 自动故障转移（类似 Sentinel）
- 不支持跨节点事务和多 key 操作（除非使用 hash tag）
- 客户端需要支持集群协议（或使用代理如 Codis）`},{question:"Redis 和 Memcached 有什么区别？如何选择？",answer:`主要区别：

1. 数据结构：
   - Redis：支持 String、Hash、List、Set、ZSet 等丰富类型
   - Memcached：仅支持简单的 key-value

2. 持久化：
   - Redis：支持 RDB 和 AOF
   - Memcached：不支持持久化

3. 高可用：
   - Redis：原生支持主从复制、哨兵、集群
   - Memcached：需要第三方工具

4. 性能：
   - 单 key 操作：Memcached 略快（多线程）
   - 复杂操作：Redis 更优（丰富数据结构）

选择建议：
- 需要复杂数据结构、持久化、高可用 → Redis
- 仅需简单缓存、追求极致性能 → Memcached
- 现代项目推荐使用 Redis（功能更全面）`}]})]}),e.jsxs("section",{id:"comparison",className:"mb-8",children:[e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"对比其他缓存方案"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"min-w-full border-collapse border border-border text-[14px] sm:text-[15px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"特性"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"Redis"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"Memcached"}),e.jsx("th",{className:"border border-border px-4 py-2 text-left font-semibold text-ink",children:"Ehcache"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"类型"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"远程缓存"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"远程缓存"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"本地缓存"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"数据结构"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"丰富（5+ 种）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"简单（key-value）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"简单（key-value）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"持久化"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✅ 支持"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"❌ 不支持"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"⚠️ 可选"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"高可用"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"✅ 原生支持"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"❌ 需第三方"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"❌ 不支持"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"性能（QPS）"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"~10w+"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"~12w+"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"~100w+（本地）"})]}),e.jsxs("tr",{className:"bg-parchment-deep/50",children:[e.jsx("td",{className:"border border-border px-4 py-2 font-medium text-ink",children:"适用场景"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"通用缓存、分布式锁、消息队列"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"简单缓存、高并发读取"}),e.jsx("td",{className:"border border-border px-4 py-2 text-ink-muted",children:"本地缓存、减少网络开销"})]})]})]})}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-4",children:[e.jsx("strong",{children:"选型建议"}),"：现代项目推荐使用 Redis 作为主要缓存方案，配合本地缓存（如 Caffeine）构建多级缓存体系，兼顾性能和可用性。"]})]}),e.jsxs("section",{id:"related",className:"mb-8",children:[e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"知识关联"}),e.jsxs("div",{className:"grid sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"📊 Spring Data JPA"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"学习如何将 Redis 与 Spring Data JPA 集成，实现二级缓存"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🔄 分布式事务"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"了解在分布式系统中如何保证缓存与数据库的一致性"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🗄️ SQL优化与索引"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"缓存是数据库优化的重要手段，配合索引优化效果更佳"})]}),e.jsxs("div",{className:"border border-border rounded-paper-md p-4 hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-ink mb-2",children:"🧵 多线程基础"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted",children:"理解 Redis 单线程模型的优势和局限性"})]})]})]}),e.jsx(a,{...n(t.category,t.id)})]})}),e.jsx(c,{items:p})]})}export{f as default};
