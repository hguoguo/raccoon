import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as r}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as a}from"./SideNote-BKvanovA.js";import{C as d}from"./ContextSwitcher-Cjd-h5IL.js";import{C as s,A as x,S as c}from"./ArticleNav-DhfiS38Y.js";import{D as l}from"./DiagramBlock-CLaKE9_7.js";import{I as o}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、基本数据类型概览",level:2},{id:"wrapper-class",text:"二、包装类体系",level:2},{id:"autoboxing",text:"三、自动装箱与拆箱",level:2},{id:"integer-cache",text:"四、Integer 缓存机制（重点🔥）",level:2},{id:"type-conversion",text:"五、类型转换规则",level:2},{id:"common-mistakes",text:"六、常见陷阱与误区",level:2},{id:"performance",text:"七、性能对比分析",level:2},{id:"misconceptions",text:"八、常见误区",level:2},{id:"interview",text:"九、面试真题",level:2},{id:"related",text:"十、知识关联",level:2}];function y({meta:n}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20",children:e.jsxs(r,{meta:n,children:[e.jsx("section",{id:"definition",children:e.jsx("blockquote",{className:"border-l-[3px] border-l-accent pl-4 py-2 my-6 bg-accent-glow rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base font-medium text-ink leading-[1.7]",children:["Java 的基本数据类型是",e.jsx("strong",{className:"text-accent",children:"值类型"}),"，存储在栈内存中；包装类是",e.jsx("strong",{className:"text-accent",children:"引用类型"}),"，存储在堆内存中。JDK 5 引入的自动装箱/拆箱机制让两者可以无缝转换，但 Integer 等包装类的缓存机制和 == 比较陷阱是高频考点。"]})})}),e.jsxs("section",{id:"overview",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"一、基本数据类型概览"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Java 提供了 8 种基本数据类型，分为整数、浮点数、字符和布尔四类。它们直接存储值，不涉及对象开销，因此性能更高、内存占用更少。"}),e.jsx(l,{title:"Java 基本数据类型全景图",children:`graph LR
                subgraph 整数类型
                  BYTE["byte (1字节)<br/>-128 ~ 127"]
                  SHORT["short (2字节)<br/>-32768 ~ 32767"]
                  INT["int (4字节) ⭐<br/>-2³¹ ~ 2³¹-1"]
                  LONG["long (8字节)<br/>-2⁶³ ~ 2⁶³-1"]
                end
                subgraph 浮点类型
                  FLOAT["float (4字节)<br/>单精度 6-7位"]
                  DOUBLE["double (8字节) ⭐<br/>双精度 15-16位"]
                end
                subgraph 字符类型
                  CHAR["char (2字节)<br/>'A' '\\u0000'"]
                end
                subgraph 布尔类型
                  BOOL["boolean<br/>true / false"]
                end
                style 整数类型 fill:#f5f0e8,stroke:#d4c5a9,stroke-width:2px
                style 浮点类型 fill:#f5f0e8,stroke:#d4c5a9,stroke-width:2px
                style 字符类型 fill:#f5f0e8,stroke:#d4c5a9,stroke-width:2px
                style 布尔类型 fill:#f5f0e8,stroke:#d4c5a9,stroke-width:2px
                style BYTE fill:#b5651d25,stroke:#b5651d
                style SHORT fill:#b5651d25,stroke:#b5651d
                style INT fill:#b5651d33,stroke:#b5651d,stroke-width:2px
                style LONG fill:#b5651d25,stroke:#b5651d
                style FLOAT fill:#a0522d25,stroke:#a0522d
                style DOUBLE fill:#a0522d33,stroke:#a0522d,stroke-width:2px
                style CHAR fill:#5f7a6825,stroke:#5f7a68
                style BOOL fill:#6a5acd25,stroke:#6a5acd
              `}),e.jsx("div",{className:"overflow-x-auto my-5",children:e.jsxs("table",{className:"w-full text-[12px] sm:text-[13px] border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"类型"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"字节数"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"取值范围"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"默认值"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"使用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 font-mono text-accent",children:"byte"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"1"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"-128 ~ 127"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"0"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"网络传输、文件IO"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 font-mono text-accent",children:"short"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"2"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"-32768 ~ 32767"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"0"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"较少使用"})]}),e.jsxs("tr",{className:"border-b border-border-light bg-accent-glow/30",children:[e.jsx("td",{className:"py-2 px-3 font-mono text-accent font-semibold",children:"int"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"4"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"-2³¹ ~ 2³¹-1"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"0"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted font-semibold",children:"最常用整数类型"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 font-mono text-accent",children:"long"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"8"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"-2⁶³ ~ 2⁶³-1"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"0L"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"时间戳、大整数"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 font-mono text-accent",children:"float"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"4"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"±3.4E38"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"0.0f"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"图形处理、游戏"})]}),e.jsxs("tr",{className:"border-b border-border-light bg-accent-glow/30",children:[e.jsx("td",{className:"py-2 px-3 font-mono text-accent font-semibold",children:"double"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"8"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"±1.7E308"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"0.0d"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted font-semibold",children:"科学计算、金融"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 font-mono text-accent",children:"char"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"2"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"'\\u0000' ~ '\\uffff'"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"'\\u0000'"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"字符处理"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 font-mono text-accent",children:"boolean"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"1位(实现相关)"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"true / false"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"false"}),e.jsx("td",{className:"py-2 px-3 text-ink-muted",children:"条件判断"})]})]})]})}),e.jsx(a,{label:"💡 JVM 规范",children:"JVM 规范并未规定 boolean 的具体存储空间，不同虚拟机实现可能不同。大多数 JVM 将 boolean 数组中的元素存储为 byte，单个 boolean 变量可能占用 4 字节（对齐到 int）。"})]}),e.jsxs("section",{id:"wrapper-class",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"二、包装类体系"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["每个基本类型都有对应的包装类，它们位于 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"java.lang"})," 包下。包装类提供了丰富的工具方法，如字符串转换、进制转换、数值比较等。"]}),e.jsx(l,{title:"基本类型与包装类对应关系",children:`graph LR
                subgraph 基本类型["基本类型 Primitive"]
                  direction TB
                  PB["byte"]
                  PS["short"]
                  PI["int"]
                  PL["long"]
                  PF["float"]
                  PD["double"]
                end
                subgraph 包装类["包装类 Wrapper"]
                  direction TB
                  WB["Byte"]
                  WS["Short"]
                  WI["Integer"]
                  WL["Long"]
                  WF["Float"]
                  WD["Double"]
                end
                PB --> WB
                PS --> WS
                PI --> WI
                PL --> WL
                PF --> WF
                PD --> WD
                style 基本类型 fill:#f5f0e8,stroke:#d4c5a9,stroke-width:2px
                style 包装类 fill:#f5f0e8,stroke:#d4c5a9,stroke-width:2px
              `}),e.jsx(s,{type:"info",title:"包装类的核心价值",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-[13px] sm:text-[14px] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"泛型支持："}),"集合框架（如 ArrayList<Integer>）只能存储对象，不能存储基本类型"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"工具方法："}),"提供 parseXxx()、valueOf()、toString() 等实用方法"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"null 值表示："}),"包装类可以为 null，适合数据库字段映射等场景"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"常量定义："}),"如 Integer.MAX_VALUE、Double.MIN_VALUE 等"]})]})})]}),e.jsxs("section",{id:"autoboxing",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"三、自动装箱与拆箱"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"JDK 5 引入的自动装箱（Autoboxing）和自动拆箱（Unboxing）让基本类型与包装类之间的转换变得透明，编译器会自动插入相应的转换代码。"}),e.jsx("h3",{className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"3.1 装箱与拆箱原理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{className:"text-ink",children:"装箱："}),"基本类型 → 包装类，编译器调用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"valueOf()"})," 方法",e.jsx("br",{}),e.jsx("strong",{className:"text-ink",children:"拆箱："}),"包装类 → 基本类型，编译器调用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"xxxValue()"})," 方法"]}),e.jsx(t,{code:`// 自动装箱：int → Integer
Integer a = 100;  // 编译后: Integer a = Integer.valueOf(100);

// 自动拆箱：Integer → int
int b = a;        // 编译后: int b = a.intValue();

// 混合运算时自动拆箱
Integer c = 200;
int result = c + 50;  // 编译后: int result = c.intValue() + 50;`,language:"java",highlights:[2,5,9],filename:"AutoBoxingDemo.java",description:"编译器自动插入装箱/拆箱代码"}),e.jsxs(a,{label:"⚠️ 性能陷阱",children:["在循环中频繁进行装箱/拆箱会产生大量临时对象，导致 GC 压力。例如：",e.jsx("br",{}),e.jsxs("code",{className:"block mt-2 p-2 bg-parchment-warm rounded text-[12px] font-mono",children:["Integer sum = 0;",e.jsx("br",{}),"for (int i = 0; i < 10000; i++) {",e.jsx("br",{}),"  sum += i;  // 每次循环都装箱+拆箱",e.jsx("br",{}),"}"]}),"应改为：",e.jsx("code",{className:"block mt-2 p-2 bg-parchment-warm rounded text-[12px] font-mono",children:"int sum = 0;"})]})]}),e.jsxs("section",{id:"integer-cache",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"四、Integer 缓存机制（重点🔥）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["这是面试最高频的考点之一！Integer 内部维护了一个缓存池，默认缓存 -128 到 127 之间的整数。通过 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"valueOf()"})," 创建的对象会复用缓存，而 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"new Integer()"})," 总是创建新对象。"]}),e.jsx(t,{code:`// ✅ 使用 valueOf() - 会命中缓存
Integer a = Integer.valueOf(100);
Integer b = Integer.valueOf(100);
System.out.println(a == b);  // true (同一个对象)

// ✅ 自动装箱也使用 valueOf()
Integer c = 100;
Integer d = 100;
System.out.println(c == d);  // true (同一个对象)

// ❌ 超出缓存范围
Integer e = 200;
Integer f = 200;
System.out.println(e == f);  // false (不同对象)

// ❌ 使用 new 关键字 - 永远创建新对象
Integer g = new Integer(100);
Integer h = new Integer(100);
System.out.println(g == h);  // false (不同对象)

// ✅ 正确比较方式：使用 equals()
System.out.println(g.equals(h));  // true`,language:"java",highlights:[4,9,14,19,23],filename:"IntegerCacheTest.java",description:"Integer 缓存机制演示"}),e.jsx("h3",{className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"4.1 缓存源码解析"}),e.jsx(t,{code:`// Integer.valueOf() 源码 (JDK 8)
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}

// IntegerCache 内部类
private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];

    static {
        // high 可通过 -XX:AutoBoxCacheMax=<size> 调整
        int h = 127;
        String integerCacheHighPropValue =
            sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            try {
                h = Math.max(parseInt(integerCacheHighPropValue), 127);
                h = Math.min(h, Integer.MAX_VALUE - (-low) -1);
            } catch (NumberFormatException nfe) {
            }
        }
        high = h;
        cache = new Integer[(high - low) + 1];
        int j = low;
        for(int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);
    }
}`,language:"java",highlights:[3,10,11,17,28],filename:"Integer.java",description:"Integer 缓存池实现源码"}),e.jsx(s,{type:"warning",title:"其他包装类的缓存策略",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-[13px] sm:text-[14px] text-ink-muted",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Byte、Short、Long："}),"缓存 -128 ~ 127（固定不可调）"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Character："}),"缓存 0 ~ 127"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Boolean："}),"缓存 TRUE 和 FALSE 两个对象"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-ink",children:"Float、Double："}),"无缓存（浮点数太多）"]})]})}),e.jsx(d,{simpleContent:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("p",{className:"text-[14px] text-ink-muted",children:[e.jsx("strong",{className:"text-ink",children:"简单理解："}),'Integer 有个"小仓库"，存了 -128 到 127 这些常用数字。当你用 ',e.jsx("code",{className:"font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded",children:"Integer.valueOf(100)"})," 或 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded",children:"Integer a = 100"})," 时，如果数字在仓库里，就直接给你现成的；如果不在，就现场造一个新的。"]}),e.jsxs("p",{className:"text-[14px] text-ink-muted",children:[e.jsx("strong",{className:"text-accent",children:"记住两点："}),e.jsx("br",{}),"1. 用 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded",children:"=="})," 比较 Integer 很危险，可能真也可能假",e.jsx("br",{}),"2. 永远用 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded",children:"equals()"})," 比较值是否相等"]})]}),hardcoreContent:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("p",{className:"text-[14px] text-ink-muted",children:[e.jsx("strong",{className:"text-ink",children:"深入底层："}),"IntegerCache 在类加载时静态初始化，通过 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded",children:"-XX:AutoBoxCacheMax"})," JVM 参数可调整上限（但不能低于 127）。缓存数组在堆内存中，索引计算为 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-deep px-1 py-0.5 rounded",children:"cache[i - low]"}),"。"]}),e.jsxs("p",{className:"text-[14px] text-ink-muted",children:[e.jsx("strong",{className:"text-ink",children:"性能影响："}),"缓存避免了频繁创建小整数对象，减少 GC 压力。对于高并发场景，建议预热缓存或使用基本类型。"]}),e.jsxs("p",{className:"text-[14px] text-ink-muted",children:[e.jsx("strong",{className:"text-accent",children:"JVM 优化："}),"JIT 编译器可能对频繁装箱的代码做逃逸分析，直接在栈上分配对象甚至标量替换，进一步优化性能。"]})]})})]}),e.jsxs("section",{id:"type-conversion",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"五、类型转换规则"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:'Java 的类型转换分为自动转换（隐式）和强制转换（显式）。遵循"小转大自动，大转小强制"的原则。'}),e.jsx(l,{title:"数据类型转换优先级",children:`graph LR
                BYTE2["byte"] --> SHORT2["short"]
                SHORT2 --> INT2["int"]
                CHAR2["char"] --> INT2
                INT2 --> LONG2["long"]
                LONG2 --> FLOAT2["float"]
                FLOAT2 --> DOUBLE2["double"]
                style BYTE2 fill:#d4c5a940,stroke:#d4c5a9
                style SHORT2 fill:#d4c5a940,stroke:#d4c5a9
                style INT2 fill:#d4c5a960,stroke:#8b4c14
                style LONG2 fill:#d4c5a960,stroke:#8b4c14
                style FLOAT2 fill:#d4c5a960,stroke:#8b4c14
                style DOUBLE2 fill:#8b4c1440,stroke:#8b4c14,stroke-width:2px
                style CHAR2 fill:#d4c5a940,stroke:#d4c5a9
              `}),e.jsx(t,{code:`// ✅ 自动转换（隐式）
int a = 100;
long b = a;       // int → long，自动转换
float c = a;      // int → float，自动转换
double d = b;     // long → double，自动转换

// ❌ 强制转换（显式）- 可能丢失精度
long e = 100000L;
int f = (int) e;  // 需要显式转换

double g = 3.14;
int h = (int) g;  // h = 3，小数部分被截断

// ⚠️ 特殊情况：byte/short/char 运算提升为 int
byte x = 10;
byte y = 20;
// byte z = x + y;  // ❌ 编译错误！x+y 结果是 int
int z = x + y;      // ✅ 正确`,language:"java",highlights:[3,4,5,9,12,17],filename:"TypeConversion.java",description:"类型转换示例"}),e.jsx(s,{type:"danger",title:"精度丢失陷阱",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] text-ink-muted",children:[e.jsx("strong",{className:"text-ink",children:"long → float/double 可能丢失精度："}),e.jsx("br",{}),e.jsxs("code",{className:"block mt-2 p-2 bg-parchment-warm rounded text-[12px] font-mono",children:["long big = 999999999999999999L;",e.jsx("br",{}),"float f = big;",e.jsx("br",{}),"System.out.println((long)f == big);  // false! 精度丢失"]}),"原因：float 只有 23 位尾数，无法精确表示所有 long 值。"]})})]}),e.jsxs("section",{id:"common-mistakes",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"六、常见陷阱与误区"}),e.jsx("h3",{className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"陷阱 1：NullPointerException"}),e.jsx(t,{code:`Integer num = null;
// int value = num;  // ❌ NullPointerException! 自动拆箱时 num.intValue()

// ✅ 安全做法
int value = (num != null) ? num : 0;
// 或使用 Optional
int safeValue = Optional.ofNullable(num).orElse(0);`,language:"java",highlights:[2,5],filename:"NullPointerTrap.java",description:"包装类为 null 时拆箱导致 NPE"}),e.jsx("h3",{className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"陷阱 2：== 比较陷阱"}),e.jsx(t,{code:`Integer a = 1000;
Integer b = 1000;
System.out.println(a == b);        // false (超出缓存范围)
System.out.println(a.equals(b));   // true (正确比较方式)

// 更隐蔽的情况
Integer c = new Integer(100);
Integer d = 100;
System.out.println(c == d);        // false (new 创建新对象)`,language:"java",highlights:[3,4,9],filename:"EqualsTrap.java",description:"== 与 equals 的区别"}),e.jsx("h3",{className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"陷阱 3：BigDecimal 构造"}),e.jsx(t,{code:`// ❌ 错误：使用 double 构造 BigDecimal
BigDecimal bd1 = new BigDecimal(0.1);
System.out.println(bd1);  // 0.1000000000000000055511151231257827021181583404541015625

// ✅ 正确：使用 String 构造
BigDecimal bd2 = new BigDecimal("0.1");
System.out.println(bd2);  // 0.1

// ✅ 推荐：使用 valueOf()
BigDecimal bd3 = BigDecimal.valueOf(0.1);
System.out.println(bd3);  // 0.1`,language:"java",highlights:[2,6,10],filename:"BigDecimalTrap.java",description:"BigDecimal 构造陷阱"})]}),e.jsxs("section",{id:"performance",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"七、性能对比分析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"基本类型 vs 包装类的性能差异主要体现在内存占用、GC 压力和运算速度三个方面。"}),e.jsx("div",{className:"overflow-x-auto my-5",children:e.jsxs("table",{className:"w-full text-[12px] sm:text-[13px] border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"维度"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"基本类型"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"包装类"}),e.jsx("th",{className:"text-left py-2 px-3 font-semibold text-ink",children:"性能差距"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 text-ink-muted font-semibold",children:"内存占用"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"4 字节 (int)"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"16 字节 (对象头+值)"}),e.jsx("td",{className:"py-2 px-3 text-accent font-semibold",children:"4 倍"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 text-ink-muted font-semibold",children:"GC 压力"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"无（栈上分配）"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"有（堆上对象）"}),e.jsx("td",{className:"py-2 px-3 text-accent font-semibold",children:"显著"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 text-ink-muted font-semibold",children:"运算速度"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"CPU 寄存器直接运算"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"需拆箱后运算"}),e.jsx("td",{className:"py-2 px-3 text-accent font-semibold",children:"~20%"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2 px-3 text-ink-muted font-semibold",children:"缓存友好"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"✅ 连续内存"}),e.jsx("td",{className:"py-2 px-3 text-ink",children:"❌ 分散指针"}),e.jsx("td",{className:"py-2 px-3 text-accent font-semibold",children:"明显"})]})]})]})}),e.jsx(t,{code:`// 性能测试：基本类型 vs 包装类
public class PerformanceTest {
    public static void main(String[] args) {
        int count = 100_000_000;
        
        // 测试 int
        long start = System.nanoTime();
        int sum1 = 0;
        for (int i = 0; i < count; i++) {
            sum1 += i;
        }
        long time1 = System.nanoTime() - start;
        
        // 测试 Integer
        start = System.nanoTime();
        Integer sum2 = 0;
        for (int i = 0; i < count; i++) {
            sum2 += i;  // 每次循环装箱+拆箱
        }
        long time2 = System.nanoTime() - start;
        
        System.out.println("int:    " + time1 / 1_000_000 + " ms");
        System.out.println("Integer: " + time2 / 1_000_000 + " ms");
        System.out.println("差距:    " + (time2 * 100 / time1 - 100) + "%");
    }
}

// 典型输出：
// int:    28 ms
// Integer: 156 ms
// 差距:    457%`,language:"java",highlights:[9,17,23,24,25],filename:"PerformanceTest.java",description:"性能对比测试结果"})]}),e.jsxs("section",{id:"misconceptions",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"八、常见误区"}),e.jsxs(s,{type:"danger",title:"误区一：== 可以比较包装类的值",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),e.jsx("code",{className:"font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded",children:"Integer a = 100; Integer b = 100; a == b"})," 应该返回 true",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"只有在 -128~127 范围内才返回 true，超出范围返回 false。",e.jsx("strong",{className:"text-accent",children:"永远用 equals() 比较值！"})]}),e.jsxs(s,{type:"danger",title:"误区二：包装类和基本类型性能差不多",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"自动装箱/拆箱是透明的，性能应该没差别",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"包装类内存占用是基本类型的 4 倍，且在循环中会产生大量临时对象，导致 GC 压力剧增。高性能场景必须用基本类型。"]}),e.jsxs(s,{type:"danger",title:"误区三：Float 和 Double 也有缓存",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"既然 Integer 有缓存，Float/Double 应该也有",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"浮点数范围太大且稀疏，缓存没有意义。Float 和 Double 的 valueOf() 总是创建新对象。"]}),e.jsxs(s,{type:"danger",title:"误区四：自动装箱不会抛出异常",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"装箱是安全的操作",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"当包装类为 null 时，自动拆箱会抛出 ",e.jsx("code",{className:"font-mono text-xs bg-parchment-warm px-1 py-0.5 rounded",children:"NullPointerException"}),"。这是生产环境最常见的 NPE 来源之一。"]})]}),e.jsx("section",{id:"interview",children:e.jsx(o,{questions:[{question:"Integer a = 100; Integer b = 100; a == b 的结果是什么？为什么？",answer:"返回 true。因为 100 在 Integer 缓存范围（-128~127）内，valueOf() 会返回缓存中的同一个对象，所以 == 比较的是引用地址，结果相同。"},{question:"Integer a = 200; Integer b = 200; a == b 的结果是什么？如何正确比较？",answer:"返回 false。因为 200 超出缓存范围，valueOf() 会创建新的 Integer 对象。正确比较方式是使用 a.equals(b)，它会比较实际的整数值。"},{question:"自动装箱和自动拆箱的原理是什么？有哪些性能陷阱？",answer:"装箱调用 valueOf()，拆箱调用 xxxValue()。性能陷阱包括：① 循环中频繁装箱产生大量临时对象；② 包装类为 null 时拆箱抛出 NPE；③ 内存占用是基本类型的 4 倍。"},{question:"为什么 Float 和 Double 没有缓存机制？",answer:"因为浮点数的取值范围太大（±1.7E308）且分布稀疏，缓存命中率极低，反而会浪费大量内存。而整数在 -128~127 范围内使用频率极高，缓存收益明显。"},{question:"int 和 Integer 有什么区别？各自的使用场景是什么？",answer:"int 是基本类型，存储在栈上，性能好但不能为 null；Integer 是包装类，存储在堆上，支持 null 和泛型。场景：① 集合框架必须用 Integer；② 数据库字段映射可用 Integer 表示 null；③ 高性能计算用 int；④ 需要对象特性时用 Integer。"},{question:"什么是 IntegerCache？如何调整其大小？",answer:"IntegerCache 是 Integer 内部的静态内部类，缓存 -128~127 的 Integer 对象。可通过 JVM 参数 -XX:AutoBoxCacheMax=<size> 调整上限（但不能低于 127），下限固定为 -128。"},{question:"byte + byte 的结果是什么类型？为什么？",answer:"结果是 int 类型。因为 Java 规定 byte、short、char 在运算时会先提升为 int，避免溢出问题。所以 byte a = 1; byte b = 2; byte c = a + b; 会编译失败，必须强制转换或声明为 int。"}]})}),e.jsxs("section",{id:"related",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink",children:"十、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 bg-parchment-light border border-border rounded-paper-md",children:[e.jsx("div",{className:"text-[10px] font-mono text-ink-ghost mb-1",children:"前置知识"}),e.jsx("div",{className:"text-[13px] font-medium text-ink",children:"Java基础语法"})]}),e.jsxs("div",{className:"p-4 bg-accent-glow border border-accent/20 rounded-paper-md",children:[e.jsx("div",{className:"text-[10px] font-mono text-accent mb-1",children:"延伸知识"}),e.jsx("div",{className:"text-[13px] font-medium text-ink",children:"String深度剖析、BigDecimal"})]})]})]}),e.jsx(x,{...i(n.category,n.id)})]})}),e.jsx(c,{items:m})]})}export{y as default};
