import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as l}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{I as n}from"./InteractiveFlow-GAP1pk49.js";import{S as a}from"./SideNote-BKvanovA.js";import{C as t,A as d,S as x}from"./ArticleNav-DhfiS38Y.js";import{D as m}from"./DiagramBlock-CLaKE9_7.js";import{I as o}from"./InterviewSection-BBNdwyyN.js";const p=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、IO流体系概述",level:2},{id:"byte-vs-char",text:"二、字节流 vs 字符流",level:2},{id:"input-output",text:"三、InputStream与OutputStream",level:2},{id:"reader-writer",text:"四、Reader与Writer",level:2},{id:"buffered-io",text:"五、缓冲流优化",level:2},{id:"file-io",text:"六、文件IO操作",level:2},{id:"io-decorator",text:"七、装饰器模式应用",level:2},{id:"try-with-resources",text:"八、资源管理与异常处理",level:2},{id:"nio-intro",text:"九、NIO简介",level:2},{id:"performance",text:"十、性能优化技巧",level:2},{id:"misconceptions",text:"十一、常见误区",level:2},{id:"interview",text:"十二、面试真题",level:2},{id:"related",text:"十三、知识关联",level:2}];function N({meta:r}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(l,{meta:r,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Java IO 是基于",e.jsx("strong",{className:"text-accent",children:"流（Stream）"}),"的输入输出机制，通过字节流（InputStream/OutputStream）和字符流（Reader/Writer）两大体系，提供统一的抽象接口来处理文件、网络、内存等数据源的读写操作。"]})}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、IO流体系概述"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java IO 包（java.io）提供了丰富的类来处理各种输入输出场景。核心思想是",e.jsx("strong",{className:"text-ink-light font-semibold",children:"将数据源抽象为流"}),"，无论是文件、网络套接字还是内存缓冲区，都可以通过统一的 API 进行读写。"]}),e.jsx(m,{title:"Java IO 类层次结构",children:`graph TD
              subgraph 字节流
                direction TB
                IS["InputStream"] --> FIS["FileInputStream"]
                IS --> BIS["BufferedInputStream"]
                IS --> OIS["ObjectInputStream"]
                OS["OutputStream"] --> FOS["FileOutputStream"]
                OS --> BOS["BufferedOutputStream"]
                OS --> OOS["ObjectOutputStream"]
              end
              subgraph 字符流
                direction TB
                R["Reader"] --> FR["FileReader"]
                R --> BR["BufferedReader"]
                W["Writer"] --> FW["FileWriter"]
              end
              style IS fill:#ede4d1,stroke:#b5651d,stroke-width:2px
              style OS fill:#ede4d1,stroke:#b5651d,stroke-width:2px
              style R fill:#ede4d1,stroke:#b5651d,stroke-width:2px
              style W fill:#ede4d1,stroke:#b5651d,stroke-width:2px
              style FIS fill:#f5f0e8,stroke:#b5651d
              style BIS fill:#f5f0e8,stroke:#b5651d
              style OIS fill:#f5f0e8,stroke:#b5651d
              style FOS fill:#f5f0e8,stroke:#b5651d
              style BOS fill:#f5f0e8,stroke:#b5651d
              style OOS fill:#f5f0e8,stroke:#b5651d
              style FR fill:#f5f0e8,stroke:#b5651d
              style BR fill:#f5f0e8,stroke:#b5651d
              style FW fill:#f5f0e8,stroke:#b5651d
            `}),e.jsxs(t,{type:"tip",title:"核心要点",children:["Java IO 采用",e.jsx("strong",{className:"text-ink-light font-semibold",children:"装饰器模式"}),"设计，通过组合不同的流类实现功能扩展。例如，FileInputStream 负责读取文件，BufferedInputStream 为其添加缓冲功能，两者可以灵活组合使用。"]}),e.jsx("h2",{id:"byte-vs-char",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、字节流 vs 字符流"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java IO 分为字节流和字符流两大体系，选择哪种取决于数据类型：",e.jsx("strong",{className:"text-ink-light font-semibold",children:"字节流处理二进制数据"}),"（图片、音频、视频），",e.jsx("strong",{className:"text-ink-light font-semibold",children:"字符流处理文本数据"}),"（字符串、配置文件）。"]}),e.jsx("div",{className:"overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5",children:e.jsxs("table",{className:"w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-2.5 px-3 text-ink font-semibold",children:"特性"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-accent font-semibold",children:"字节流"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-teal font-semibold",children:"字符流"})]})}),e.jsxs("tbody",{className:"text-ink-muted",children:[e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"基类"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-[11px]",children:"InputStream / OutputStream"}),e.jsx("td",{className:"py-2.5 px-3 font-mono text-[11px]",children:"Reader / Writer"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"处理单位"}),e.jsx("td",{className:"py-2.5 px-3",children:"字节（8位）"}),e.jsx("td",{className:"py-2.5 px-3",children:"字符（16位 Unicode）"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"编码转换"}),e.jsx("td",{className:"py-2.5 px-3",children:"❌ 不处理编码"}),e.jsx("td",{className:"py-2.5 px-3",children:"✅ 自动处理字符编码"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"适用场景"}),e.jsx("td",{className:"py-2.5 px-3",children:"二进制文件（图片、音频）"}),e.jsx("td",{className:"py-2.5 px-3",children:"文本文件（txt、xml、json）"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"缓冲区"}),e.jsx("td",{className:"py-2.5 px-3",children:"需要手动添加 BufferedXxx"}),e.jsx("td",{className:"py-2.5 px-3",children:"部分自带缓冲（如 BufferedReader）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"性能"}),e.jsx("td",{className:"py-2.5 px-3",children:"略高（无编码转换开销）"}),e.jsx("td",{className:"py-2.5 px-3",children:"略低（需编码/解码）"})]})]})]})}),e.jsx(s,{language:"java",filename:"ByteVsCharStream.java",description:"字节流与字符流对比示例",highlights:[5,9,13,17],code:`// 字节流：适合二进制数据
try (InputStream in = new FileInputStream("image.jpg");
     OutputStream out = new FileOutputStream("copy.jpg")) {
    byte[] buffer = new byte[1024];
    int bytesRead;
    while ((bytesRead = in.read(buffer)) != -1) {
        out.write(buffer, 0, bytesRead);
    }
}

// 字符流：适合文本数据
try (Reader reader = new FileReader("config.txt");
     Writer writer = new FileWriter("config_copy.txt")) {
    char[] buffer = new char[1024];
    int charsRead;
    while ((charsRead = reader.read(buffer)) != -1) {
        writer.write(buffer, 0, charsRead);
    }
}`}),e.jsxs(a,{label:"为什么文本要用字符流？",children:["字符流内部会自动处理",e.jsx("strong",{className:"text-ink-light font-semibold",children:"字符编码转换"}),"。如果使用字节流读取 UTF-8 编码的中文文本，可能会因为一个中文字符占用 3 个字节而导致乱码。字符流会根据指定的编码（默认平台编码）正确地将字节序列转换为字符。"]}),e.jsx("h2",{id:"input-output",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、InputStream与OutputStream"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"InputStream 和 OutputStream 是所有字节流的抽象基类，定义了基本的读写方法。常用子类包括 FileInputStream、ByteArrayInputStream、BufferedInputStream 等。"}),e.jsx(s,{language:"java",filename:"InputStreamExample.java",description:"InputStream常用方法",highlights:[5,9,13],code:`InputStream in = new FileInputStream("data.bin");

// 方法1：读取单个字节（效率低，不推荐）
int byteData = in.read(); // 返回 0-255，-1表示EOF

// 方法2：读取到字节数组（推荐）
byte[] buffer = new byte[1024];
int bytesRead = in.read(buffer); // 返回实际读取的字节数

// 方法3：跳过指定字节数
long skipped = in.skip(100);

// 方法4：检查可读字节数
int available = in.available();

in.close();`}),e.jsx(s,{language:"java",filename:"OutputStreamExample.java",description:"OutputStream常用方法",highlights:[4,8,12],code:`OutputStream out = new FileOutputStream("output.bin");

// 方法1：写入单个字节
out.write(65); // 写入 'A'

// 方法2：写入字节数组
byte[] data = "Hello".getBytes();
out.write(data);

// 方法3：写入字节数组的一部分
out.write(data, 0, 3); // 只写入 "Hel"

// 方法4：刷新缓冲区（对缓冲流有效）
out.flush();

out.close();`}),e.jsxs(t,{type:"warning",title:"read()返回值的陷阱",children:[e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"read()"})," 返回的是 ",e.jsx("strong",{className:"text-ink-light font-semibold",children:"int 类型"}),"而非 byte，这是为了能够返回 -1 表示 EOF。如果强制转换为 byte，-1 会变成 255，导致无法正确判断文件结束。"]}),e.jsx("h2",{id:"reader-writer",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、Reader与Writer"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Reader 和 Writer 是字符流的抽象基类，专门用于处理文本数据。它们内部会处理字符编码转换，支持按行读取等便捷操作。"}),e.jsx(s,{language:"java",filename:"ReaderWriterExample.java",description:"Reader和Writer使用示例",highlights:[5,9,13,17],code:`// 读取文本文件
try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"))) {
    String line;
    // 按行读取（最常用）
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
    
    // 读取单个字符
    int charData = reader.read(); // 返回 Unicode 码点
    
    // 读取到字符数组
    char[] buffer = new char[1024];
    int charsRead = reader.read(buffer);
}

// 写入文本文件
try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
    writer.write("Hello, World!");
    writer.newLine(); // 写入换行符（跨平台兼容）
    writer.write("第二行文本");
    writer.flush(); // 确保数据写入磁盘
}`}),e.jsxs(a,{label:"BufferedReader的优势",children:[e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"BufferedReader"})," 不仅提供缓冲功能提升性能，还提供了 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"readLine()"})," 方法，可以按行读取文本，这在处理日志文件、配置文件时非常有用。"]}),e.jsx("h2",{id:"buffered-io",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、缓冲流优化"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"缓冲流通过在内存中维护缓冲区，减少系统调用次数，显著提升 IO 性能。每次读写操作先在缓冲区中进行，只有当缓冲区满或显式调用 flush 时才真正访问底层设备。"}),e.jsx(n,{title:"缓冲流工作原理",steps:[{label:"应用程序写入",description:"调用 write() 方法，数据先写入内存缓冲区",icon:"📝"},{label:"缓冲区未满",description:"数据暂存在缓冲区，不立即写入磁盘",icon:"💾"},{label:"缓冲区已满",description:"触发 flush，将缓冲区数据批量写入磁盘",icon:"💽"},{label:"显式flush/close",description:"调用 flush() 或 close() 强制写入剩余数据",icon:"✅"}]}),e.jsx(s,{language:"java",filename:"BufferedStreamExample.java",description:"缓冲流性能对比",highlights:[4,8,12],code:`// ❌ 无缓冲：每次read/write都触发系统调用，性能差
try (InputStream in = new FileInputStream("largefile.bin");
     OutputStream out = new FileOutputStream("copy.bin")) {
    int byteData;
    while ((byteData = in.read()) != -1) { // 逐字节读取
        out.write(byteData); // 逐字节写入
    }
}

// ✅ 有缓冲：减少系统调用次数，性能提升10-100倍
try (BufferedInputStream in = new BufferedInputStream(new FileInputStream("largefile.bin"));
     BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream("copy.bin"))) {
    byte[] buffer = new byte[8192]; // 8KB缓冲区
    int bytesRead;
    while ((bytesRead = in.read(buffer)) != -1) {
        out.write(buffer, 0, bytesRead);
    }
    out.flush(); // 确保所有数据写入磁盘
}`}),e.jsxs(t,{type:"info",title:"缓冲区大小选择",children:["默认缓冲区大小为 ",e.jsx("strong",{className:"text-ink-light",children:"8KB"}),"（8192字节）。对于大文件传输，可以适当增大缓冲区（如 64KB），但不宜过大，否则会占用过多内存。一般建议设置为磁盘块大小的整数倍（通常 4KB 或 8KB）。"]}),e.jsx("h2",{id:"file-io",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、文件IO操作"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["文件 IO 是最常见的应用场景。除了传统的 FileInputStream/FileOutputStream，JDK 7 引入的 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Files"})," 工具类提供了更简洁的 API。"]}),e.jsx(s,{language:"java",filename:"FileIOExample.java",description:"传统方式 vs Files工具类",highlights:[5,10,15,20],code:`// 方式1：传统FileInputStream（JDK 1.0+）
try (InputStream in = new FileInputStream("input.txt");
     OutputStream out = new FileOutputStream("output.txt")) {
    byte[] buffer = new byte[1024];
    int bytesRead;
    while ((bytesRead = in.read(buffer)) != -1) {
        out.write(buffer, 0, bytesRead);
    }
}

// 方式2：Files工具类（JDK 7+，推荐）
Path source = Paths.get("input.txt");
Path target = Paths.get("output.txt");
Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);

// 方式3：读取整个文件为字符串（小文件适用）
String content = Files.readString(Paths.get("config.txt"), StandardCharsets.UTF_8);

// 方式4：写入字符串到文件
Files.writeString(Paths.get("output.txt"), "Hello, World!", StandardCharsets.UTF_8);

// 方式5：逐行读取（大文件适用）
try (Stream<String> lines = Files.lines(Paths.get("large.log"))) {
    lines.filter(line -> line.contains("ERROR"))
         .forEach(System.out::println);
}`}),e.jsxs(a,{label:"Files工具类的优势",children:[e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Files"})," 类提供了大量静态方法，简化了文件操作：",e.jsx("br",{}),"• ",e.jsx("code",{className:"font-mono text-[11px]",children:"Files.copy()"}),"：复制文件",e.jsx("br",{}),"• ",e.jsx("code",{className:"font-mono text-[11px]",children:"Files.move()"}),"：移动/重命名文件",e.jsx("br",{}),"• ",e.jsx("code",{className:"font-mono text-[11px]",children:"Files.delete()"}),"：删除文件",e.jsx("br",{}),"• ",e.jsx("code",{className:"font-mono text-[11px]",children:"Files.exists()"}),"：检查文件是否存在",e.jsx("br",{}),"• ",e.jsx("code",{className:"font-mono text-[11px]",children:"Files.size()"}),"：获取文件大小",e.jsx("br",{}),"这些方法内部已经处理了资源管理和异常，代码更简洁安全。"]}),e.jsx("h2",{id:"io-decorator",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、装饰器模式应用"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java IO 是",e.jsx("strong",{className:"text-ink-light font-semibold",children:"装饰器模式"}),"的经典应用。通过将基础流对象包装在装饰器流中，可以动态地添加功能（如缓冲、加密、压缩），而无需修改原有代码。"]}),e.jsx(s,{language:"java",filename:"DecoratorPatternExample.java",description:"IO装饰器模式示例",highlights:[5,9,13],code:`// 基础流：从文件读取
InputStream fileStream = new FileInputStream("data.txt");

// 第一层装饰：添加缓冲功能
InputStream bufferedStream = new BufferedInputStream(fileStream);

// 第二层装饰：添加数据解析功能
DataInputStream dataStream = new DataInputStream(bufferedStream);

// 第三层装饰：添加解压功能（如果是压缩文件）
GZIPInputStream gzipStream = new GZIPInputStream(dataStream);

// 使用最终装饰后的流
int value = dataStream.readInt();
String text = dataStream.readUTF();

// 关闭时只需关闭最外层，内部流会自动关闭
gzipStream.close();`}),e.jsxs(t,{type:"tip",title:"装饰器链的关闭顺序",children:["关闭装饰器链时，只需关闭",e.jsx("strong",{className:"text-ink-light font-semibold",children:"最外层"}),"的流，它会依次调用内部流的 close() 方法。但推荐使用 try-with-resources 自动管理资源，避免遗漏。"]}),e.jsx("h2",{id:"try-with-resources",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、资源管理与异常处理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["IO 操作涉及外部资源（文件句柄、网络连接），必须确保正确关闭，否则会导致资源泄漏。JDK 7 引入的 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"try-with-resources"})," 语法可以自动关闭实现了 AutoCloseable 接口的资源。"]}),e.jsx(s,{language:"java",filename:"ResourceManagement.java",description:"资源管理最佳实践",highlights:[3,8,13],code:`// ❌ 旧写法：手动关闭，容易遗漏
InputStream in = null;
try {
    in = new FileInputStream("data.txt");
    // 处理数据...
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (in != null) {
        try { in.close(); } catch (IOException e) { e.printStackTrace(); }
    }
}

// ✅ 新写法：try-with-resources（JDK 7+，推荐）
try (InputStream in = new FileInputStream("data.txt");
     OutputStream out = new FileOutputStream("output.txt")) {
    // 处理数据...
    byte[] buffer = new byte[1024];
    int bytesRead;
    while ((bytesRead = in.read(buffer)) != -1) {
        out.write(buffer, 0, bytesRead);
    }
} // 自动关闭 in 和 out，即使发生异常

// ✅ JDK 9+：可以在try之前声明资源
InputStream in = new FileInputStream("data.txt");
try (in) {
    // 处理数据...
}`}),e.jsxs(t,{type:"danger",title:"资源泄漏的危害",children:["未关闭的 IO 流会导致：",e.jsx("br",{}),"1️⃣ ",e.jsx("strong",{className:"text-ink-light",children:"文件句柄泄漏"}),"：操作系统有文件句柄数量限制，耗尽后无法打开新文件",e.jsx("br",{}),"2️⃣ ",e.jsx("strong",{className:"text-ink-light",children:"数据丢失"}),"：缓冲区中的数据可能未写入磁盘",e.jsx("br",{}),"3️⃣ ",e.jsx("strong",{className:"text-ink-light",children:"内存泄漏"}),"：流对象占用的内存无法释放",e.jsx("br",{}),"务必使用 try-with-resources 或 finally 块确保资源关闭。"]}),e.jsx("h2",{id:"nio-intro",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、NIO简介"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["NIO（New IO，JDK 1.4 引入）是对传统 IO 的补充，提供了",e.jsx("strong",{className:"text-ink-light font-semibold",children:"非阻塞 IO"}),"、",e.jsx("strong",{className:"text-ink-light font-semibold",children:"内存映射文件"}),"、",e.jsx("strong",{className:"text-ink-light font-semibold",children:"通道（Channel）"}),"和",e.jsx("strong",{className:"text-ink-light font-semibold",children:"缓冲区（Buffer）"}),"等新特性，适合高性能网络编程和大文件处理。详细内容见《NIO与网络编程》章节。"]}),e.jsx("div",{className:"overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5",children:e.jsxs("table",{className:"w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-border",children:[e.jsx("th",{className:"text-left py-2.5 px-3 text-ink font-semibold",children:"特性"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-accent font-semibold",children:"传统IO"}),e.jsx("th",{className:"text-left py-2.5 px-3 text-teal font-semibold",children:"NIO"})]})}),e.jsxs("tbody",{className:"text-ink-muted",children:[e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"IO模型"}),e.jsx("td",{className:"py-2.5 px-3",children:"阻塞IO"}),e.jsx("td",{className:"py-2.5 px-3",children:"非阻塞IO / 多路复用"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"数据单元"}),e.jsx("td",{className:"py-2.5 px-3",children:"流（Stream）"}),e.jsx("td",{className:"py-2.5 px-3",children:"缓冲区（Buffer）"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"数据传输"}),e.jsx("td",{className:"py-2.5 px-3",children:"单向（读或写）"}),e.jsx("td",{className:"py-2.5 px-3",children:"双向（Channel可读写）"})]}),e.jsxs("tr",{className:"border-b border-border-light",children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"适用场景"}),e.jsx("td",{className:"py-2.5 px-3",children:"简单文件读写"}),e.jsx("td",{className:"py-2.5 px-3",children:"高并发网络、大文件"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2.5 px-3 font-medium text-ink",children:"复杂度"}),e.jsx("td",{className:"py-2.5 px-3",children:"低，易用"}),e.jsx("td",{className:"py-2.5 px-3",children:"高，学习曲线陡峭"})]})]})]})}),e.jsxs(t,{type:"tip",title:"何时使用NIO？",children:["• 需要处理",e.jsx("strong",{className:"text-ink-light font-semibold",children:"高并发网络连接"}),"（如聊天服务器、游戏服务器）",e.jsx("br",{}),"• 需要",e.jsx("strong",{className:"text-ink-light font-semibold",children:"内存映射大文件"}),"（GB级别）",e.jsx("br",{}),"• 需要",e.jsx("strong",{className:"text-ink-light font-semibold",children:"零拷贝"}),"传输（如文件服务器）",e.jsx("br",{}),"对于简单的文件读写，传统 IO 足够且更易用。"]}),e.jsx("h2",{id:"performance",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、性能优化技巧"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4",children:[e.jsx("div",{className:"text-[11px] font-semibold uppercase tracking-[0.08em] text-green-700 font-sans mb-3",children:"✅ 推荐做法"}),e.jsxs("ul",{className:"space-y-2 text-[13px] text-ink-muted font-sans",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"text-sm",children:"✓"}),e.jsx("span",{children:"始终使用缓冲流（BufferedXxx）"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"text-sm",children:"✓"}),e.jsx("span",{children:"选择合适的缓冲区大小（8KB-64KB）"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"text-sm",children:"✓"}),e.jsx("span",{children:"使用 try-with-resources 管理资源"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"text-sm",children:"✓"}),e.jsx("span",{children:"小文件用 Files.readAllBytes/readString"})]})]})]}),e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4",children:[e.jsx("div",{className:"text-[11px] font-semibold uppercase tracking-[0.08em] text-red-700 font-sans mb-3",children:"❌ 避免做法"}),e.jsxs("ul",{className:"space-y-2 text-[13px] text-ink-muted font-sans",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"text-sm",children:"✗"}),e.jsx("span",{children:"不要逐字节读写（性能极差）"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"text-sm",children:"✗"}),e.jsx("span",{children:"不要忘记关闭流（资源泄漏）"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"text-sm",children:"✗"}),e.jsx("span",{children:"不要用字符流处理二进制数据"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"text-sm",children:"✗"}),e.jsx("span",{children:"不要在大文件上使用 readAllBytes"})]})]})]})]}),e.jsx(s,{language:"java",filename:"PerformanceTips.java",description:"IO性能优化示例",highlights:[5,10,15],code:`// 优化1：使用合适的缓冲区大小
byte[] buffer = new byte[8192]; // 8KB，平衡内存和性能

// 优化2：批量读写而非逐字节
while ((bytesRead = in.read(buffer)) != -1) {
    out.write(buffer, 0, bytesRead);
}

// 优化3：减少不必要的flush调用
// ❌ 每次write后都flush，性能差
out.write(data);
out.flush(); // 频繁flush降低性能

// ✅ 只在必要时flush
out.write(largeData);
out.flush(); // 最后一次性flush

// 优化4：大文件使用内存映射（NIO）
MappedByteBuffer mappedBuffer = FileChannel.open(path)
    .map(FileChannel.MapMode.READ_ONLY, 0, fileSize);`}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、常见误区"}),e.jsxs(t,{type:"danger",title:"误区一：read()返回值可以直接赋值给byte",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"byte b = (byte) in.read();"}),e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"read()"})," 返回 ",e.jsx("strong",{className:"text-ink-light font-semibold",children:"int 类型"}),"（0-255 或 -1），强制转换为 byte 后，-1 会变成 255，导致无法正确判断 EOF。应该用 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"int byteData = in.read();"})," 接收返回值。"]}),e.jsxs(t,{type:"danger",title:"误区二：close()只需要调用一次",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"关闭最外层的流就够了",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"虽然关闭装饰器链的最外层会自动关闭内部流，但如果中间某层流的 close() 抛出异常，内部流可能未被正确关闭。",e.jsx("strong",{className:"text-ink-light font-semibold",children:"推荐使用 try-with-resources"}),"，它会确保所有资源都被正确关闭，即使发生异常。"]}),e.jsxs(t,{type:"danger",title:"误区三：字符流和字节流可以混用",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"先用字节流读一部分，再用字符流读剩下的",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"字符流内部有缓冲区，会预读数据。如果先用字节流读取，再用字符流读取同一个文件，字符流的缓冲区可能已经读取了部分数据，导致字节流和数据不一致。",e.jsx("strong",{className:"text-ink-light font-semibold",children:"同一数据源只能使用一种流类型"}),"。"]}),e.jsxs(t,{type:"danger",title:"误区四：flush()和close()是一样的",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"close()会自动flush，所以不需要手动flush",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),"虽然 close() 确实会调用 flush()，但在某些场景下需要",e.jsx("strong",{className:"text-ink-light font-semibold",children:"中途flush"}),"以确保数据写入磁盘（如日志系统、实时数据处理）。此外，如果程序在 close() 之前崩溃，未flush的数据会丢失。关键数据应及时flush。"]}),e.jsxs(t,{type:"danger",title:"误区五：FileInputStream可以读取目录",children:[e.jsx("span",{className:"font-semibold text-ink-light",children:"你以为的："}),"传入目录路径也能读取",e.jsx("br",{}),e.jsx("span",{className:"font-semibold text-accent",children:"实际："}),e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"FileInputStream"})," 只能读取",e.jsx("strong",{className:"text-ink-light font-semibold",children:"文件"}),"，传入目录路径会抛出 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"FileNotFoundException"}),"。如果需要遍历目录，应使用 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"File.listFiles()"})," 或 ",e.jsx("code",{className:"font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light",children:"Files.list()"}),"。"]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十二、面试真题"}),e.jsx(o,{questions:[{question:"Java IO中字节流和字符流有什么区别？如何选择？",answer:"字节流（InputStream/OutputStream）以字节为单位处理数据，不关心编码，适合二进制文件（图片、音频、视频）；字符流（Reader/Writer）以字符为单位，自动处理字符编码转换，适合文本文件（txt、xml、json）。选择依据：处理二进制数据用字节流，处理文本数据用字符流。如果不确定，优先使用字节流，因为它更通用。"},{question:"什么是缓冲流？为什么能提升性能？",answer:"缓冲流（BufferedInputStream/BufferedOutputStream等）在内存中维护一个缓冲区（默认8KB），读写操作先在缓冲区中进行，只有当缓冲区满或显式调用flush时才真正访问底层设备。这样可以减少系统调用次数，将多次小IO合并为一次大IO，性能提升10-100倍。适用于频繁读写的场景。"},{question:"try-with-resources的工作原理是什么？",answer:"try-with-resources是JDK 7引入的语法糖，用于自动管理实现了AutoCloseable接口的资源。在try块执行完毕（正常或异常）后，会自动调用资源的close()方法。多个资源可以用分号分隔声明。JDK 9增强了该特性，允许在try之前声明资源。相比传统的finally块手动关闭，try-with-resources更简洁、更安全，避免了资源泄漏。"},{question:"Java IO中的装饰器模式是如何体现的？",answer:'Java IO是装饰器模式的经典应用。基础流（如FileInputStream）提供核心功能，装饰器流（如BufferedInputStream、DataInputStream）在其基础上添加额外功能（缓冲、数据解析等）。通过层层包装，可以动态组合不同功能，而无需修改原有代码。例如：new DataInputStream(new BufferedInputStream(new FileInputStream("file")))。这种设计提高了代码的灵活性和可扩展性。'},{question:"read()方法返回-1表示什么？为什么返回int而不是byte？",answer:"read()返回-1表示已到达流末尾（EOF）。返回int而非byte的原因是：byte的取值范围是-128到127，无法区分有效数据-1和EOF标志-1。int的取值范围更大，可以用0-255表示有效字节数据，用-1表示EOF。如果强制将返回值转换为byte，-1会变成255，导致无法正确判断文件结束。"},{question:"FileInputStream和FileReader有什么区别？",answer:"FileInputStream是字节流，以字节为单位读取数据，不处理字符编码，适合读取二进制文件；FileReader是字符流，以字符为单位读取，内部会根据平台默认编码（或指定编码）将字节转换为字符，适合读取文本文件。如果读取UTF-8编码的中文文本，使用FileReader可以避免乱码问题，而FileInputStream需要手动处理编码转换。"},{question:"什么是NIO？与传统IO有什么区别？",answer:"NIO（New IO）是JDK 1.4引入的新IO API，主要特性：1）非阻塞IO：线程可以在等待IO时执行其他任务；2）通道（Channel）：双向数据传输，支持读写；3）缓冲区（Buffer）：基于块的IO操作；4）选择器（Selector）：单线程管理多个通道，适合高并发场景。传统IO是阻塞的、基于流的、单向的。NIO适合高并发网络编程和大文件处理，传统IO适合简单文件读写。"},{question:"如何高效地复制一个大文件？",answer:"高效复制大文件的步骤：1）使用缓冲流减少系统调用：new BufferedInputStream(new FileInputStream(source))；2）选择合适的缓冲区大小（8KB-64KB）；3）批量读写：while ((bytesRead = in.read(buffer)) != -1) { out.write(buffer, 0, bytesRead); }；4）使用try-with-resources确保资源关闭；5）对于超大文件（GB级别），可以考虑使用NIO的FileChannel.transferTo()实现零拷贝，性能更高。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十三、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4",children:[e.jsx("div",{className:"text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3",children:"← 前置知识"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"☕"}),e.jsx("span",{children:"Java基础语法"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🏛️"}),e.jsx("span",{children:"异常处理机制"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🎨"}),e.jsx("span",{children:"设计模式（装饰器）"})]})]})]}),e.jsxs("div",{className:"bg-parchment-light border border-border rounded-paper-md p-4",children:[e.jsx("div",{className:"text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3",children:"延伸知识 →"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"⚡"}),e.jsx("span",{children:"NIO与网络编程"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🔒"}),e.jsx("span",{children:"序列化与反序列化"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[13px] text-ink-muted font-sans",children:[e.jsx("span",{className:"text-sm",children:"🗄️"}),e.jsx("span",{children:"文件操作与路径管理"})]})]})]})]}),e.jsx(d,{...i(r.category,r.id)})]})}),e.jsx(x,{items:p})]})}export{N as default};
