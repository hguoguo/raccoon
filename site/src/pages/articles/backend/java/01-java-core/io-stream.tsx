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
  { id: 'overview', text: '一、IO流体系概述', level: 2 },
  { id: 'byte-vs-char', text: '二、字节流 vs 字符流', level: 2 },
  { id: 'input-output', text: '三、InputStream与OutputStream', level: 2 },
  { id: 'reader-writer', text: '四、Reader与Writer', level: 2 },
  { id: 'buffered-io', text: '五、缓冲流优化', level: 2 },
  { id: 'file-io', text: '六、文件IO操作', level: 2 },
  { id: 'io-decorator', text: '七、装饰器模式应用', level: 2 },
  { id: 'try-with-resources', text: '八、资源管理与异常处理', level: 2 },
  { id: 'nio-intro', text: '九、NIO简介', level: 2 },
  { id: 'performance', text: '十、性能优化技巧', level: 2 },
  { id: 'misconceptions', text: '十一、常见误区', level: 2 },
  { id: 'interview', text: '十二、面试真题', level: 2 },
  { id: 'related', text: '十三、知识关联', level: 2 },
]

export default function IoStream({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Java IO 是基于<strong className="text-accent">流（Stream）</strong>的输入输出机制，通过字节流（InputStream/OutputStream）和字符流（Reader/Writer）两大体系，提供统一的抽象接口来处理文件、网络、内存等数据源的读写操作。
            </p>
          </blockquote>

          {/* ========== 一、IO流体系概述 ========== */}
          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、IO流体系概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java IO 包（java.io）提供了丰富的类来处理各种输入输出场景。核心思想是<strong className="text-ink-light font-semibold">将数据源抽象为流</strong>，无论是文件、网络套接字还是内存缓冲区，都可以通过统一的 API 进行读写。
          </p>

          <DiagramBlock title="Java IO 类层次结构">
            <svg className="w-full max-w-[500px] mx-auto block" viewBox="0 0 500 280">
              <rect x="20" y="10" width="100" height="40" rx="4" fill="#ede4d1" stroke="#b5651d" strokeWidth="2"/>
              <text x="70" y="35" fill="#6b5e4c" fontSize="10" fontFamily="monospace" textAnchor="middle">InputStream</text>
              
              <line x1="70" y1="50" x2="70" y2="70" stroke="#a99d8e" strokeWidth="2"/>
              
              <rect x="20" y="70" width="100" height="30" rx="4" fill="#f5f0e8" stroke="#b5651d"/>
              <text x="70" y="90" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">FileInputStream</text>
              
              <rect x="20" y="105" width="100" height="30" rx="4" fill="#f5f0e8" stroke="#b5651d"/>
              <text x="70" y="125" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">BufferedInputStream</text>
              
              <rect x="20" y="140" width="100" height="30" rx="4" fill="#f5f0e8" stroke="#b5651d"/>
              <text x="70" y="160" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">ObjectInputStream</text>
              
              <rect x="200" y="10" width="100" height="40" rx="4" fill="#ede4d1" stroke="#b5651d" strokeWidth="2"/>
              <text x="250" y="35" fill="#6b5e4c" fontSize="10" fontFamily="monospace" textAnchor="middle">OutputStream</text>
              
              <line x1="250" y1="50" x2="250" y2="70" stroke="#a99d8e" strokeWidth="2"/>
              
              <rect x="200" y="70" width="100" height="30" rx="4" fill="#f5f0e8" stroke="#b5651d"/>
              <text x="250" y="90" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">FileOutputStream</text>
              
              <rect x="200" y="105" width="100" height="30" rx="4" fill="#f5f0e8" stroke="#b5651d"/>
              <text x="250" y="125" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">BufferedOutputStream</text>
              
              <rect x="200" y="140" width="100" height="30" rx="4" fill="#f5f0e8" stroke="#b5651d"/>
              <text x="250" y="160" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">ObjectOutputStream</text>
              
              <rect x="380" y="10" width="100" height="40" rx="4" fill="#ede4d1" stroke="#b5651d" strokeWidth="2"/>
              <text x="430" y="35" fill="#6b5e4c" fontSize="10" fontFamily="monospace" textAnchor="middle">Reader</text>
              
              <line x1="430" y1="50" x2="430" y2="70" stroke="#a99d8e" strokeWidth="2"/>
              
              <rect x="380" y="70" width="100" height="30" rx="4" fill="#f5f0e8" stroke="#b5651d"/>
              <text x="430" y="90" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">FileReader</text>
              
              <rect x="380" y="105" width="100" height="30" rx="4" fill="#f5f0e8" stroke="#b5651d"/>
              <text x="430" y="125" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">BufferedReader</text>
              
              <rect x="20" y="200" width="100" height="40" rx="4" fill="#ede4d1" stroke="#b5651d" strokeWidth="2"/>
              <text x="70" y="225" fill="#6b5e4c" fontSize="10" fontFamily="monospace" textAnchor="middle">Writer</text>
              
              <line x1="70" y1="240" x2="70" y2="260" stroke="#a99d8e" strokeWidth="2"/>
              
              <rect x="20" y="260" width="100" height="30" rx="4" fill="#f5f0e8" stroke="#b5651d"/>
              <text x="70" y="280" fill="#8b4c14" fontSize="9" fontFamily="monospace" textAnchor="middle">FileWriter</text>
              
              <text x="250" y="200" fill="#8a7d6b" fontSize="9" fontFamily="monospace" textAnchor="middle">左侧：字节流 | 右侧：字符流</text>
            </svg>
          </DiagramBlock>

          <Callout type="tip" title="核心要点">
            Java IO 采用<strong className="text-ink-light font-semibold">装饰器模式</strong>设计，通过组合不同的流类实现功能扩展。例如，FileInputStream 负责读取文件，BufferedInputStream 为其添加缓冲功能，两者可以灵活组合使用。
          </Callout>

          {/* ========== 二、字节流 vs 字符流 ========== */}
          <h2 id="byte-vs-char" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、字节流 vs 字符流
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java IO 分为字节流和字符流两大体系，选择哪种取决于数据类型：<strong className="text-ink-light font-semibold">字节流处理二进制数据</strong>（图片、音频、视频），<strong className="text-ink-light font-semibold">字符流处理文本数据</strong>（字符串、配置文件）。
          </p>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">特性</th>
                  <th className="text-left py-2.5 px-3 text-accent font-semibold">字节流</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">字符流</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">基类</td><td className="py-2.5 px-3 font-mono text-[11px]">InputStream / OutputStream</td><td className="py-2.5 px-3 font-mono text-[11px]">Reader / Writer</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">处理单位</td><td className="py-2.5 px-3">字节（8位）</td><td className="py-2.5 px-3">字符（16位 Unicode）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">编码转换</td><td className="py-2.5 px-3">❌ 不处理编码</td><td className="py-2.5 px-3">✅ 自动处理字符编码</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">适用场景</td><td className="py-2.5 px-3">二进制文件（图片、音频）</td><td className="py-2.5 px-3">文本文件（txt、xml、json）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">缓冲区</td><td className="py-2.5 px-3">需要手动添加 BufferedXxx</td><td className="py-2.5 px-3">部分自带缓冲（如 BufferedReader）</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">性能</td><td className="py-2.5 px-3">略高（无编码转换开销）</td><td className="py-2.5 px-3">略低（需编码/解码）</td></tr>
              </tbody>
            </table>
          </div>

          <Playground language="java" filename="ByteVsCharStream.java" description="字节流与字符流对比示例" highlights={[5, 9, 13, 17]}
            code={`// 字节流：适合二进制数据
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
}`}
          />

          <SideNote label="为什么文本要用字符流？">
            字符流内部会自动处理<strong className="text-ink-light font-semibold">字符编码转换</strong>。如果使用字节流读取 UTF-8 编码的中文文本，可能会因为一个中文字符占用 3 个字节而导致乱码。字符流会根据指定的编码（默认平台编码）正确地将字节序列转换为字符。
          </SideNote>

          {/* ========== 三、InputStream与OutputStream ========== */}
          <h2 id="input-output" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、InputStream与OutputStream
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            InputStream 和 OutputStream 是所有字节流的抽象基类，定义了基本的读写方法。常用子类包括 FileInputStream、ByteArrayInputStream、BufferedInputStream 等。
          </p>

          <Playground language="java" filename="InputStreamExample.java" description="InputStream常用方法" highlights={[5, 9, 13]}
            code={`InputStream in = new FileInputStream("data.bin");

// 方法1：读取单个字节（效率低，不推荐）
int byteData = in.read(); // 返回 0-255，-1表示EOF

// 方法2：读取到字节数组（推荐）
byte[] buffer = new byte[1024];
int bytesRead = in.read(buffer); // 返回实际读取的字节数

// 方法3：跳过指定字节数
long skipped = in.skip(100);

// 方法4：检查可读字节数
int available = in.available();

in.close();`}
          />

          <Playground language="java" filename="OutputStreamExample.java" description="OutputStream常用方法" highlights={[4, 8, 12]}
            code={`OutputStream out = new FileOutputStream("output.bin");

// 方法1：写入单个字节
out.write(65); // 写入 'A'

// 方法2：写入字节数组
byte[] data = "Hello".getBytes();
out.write(data);

// 方法3：写入字节数组的一部分
out.write(data, 0, 3); // 只写入 "Hel"

// 方法4：刷新缓冲区（对缓冲流有效）
out.flush();

out.close();`}
          />

          <Callout type="warning" title="read()返回值的陷阱">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">read()</code> 返回的是 <strong className="text-ink-light font-semibold">int 类型</strong>而非 byte，这是为了能够返回 -1 表示 EOF。如果强制转换为 byte，-1 会变成 255，导致无法正确判断文件结束。
          </Callout>

          {/* ========== 四、Reader与Writer ========== */}
          <h2 id="reader-writer" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Reader与Writer
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Reader 和 Writer 是字符流的抽象基类，专门用于处理文本数据。它们内部会处理字符编码转换，支持按行读取等便捷操作。
          </p>

          <Playground language="java" filename="ReaderWriterExample.java" description="Reader和Writer使用示例" highlights={[5, 9, 13, 17]}
            code={`// 读取文本文件
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
}`}
          />

          <SideNote label="BufferedReader的优势">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">BufferedReader</code> 不仅提供缓冲功能提升性能，还提供了 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">readLine()</code> 方法，可以按行读取文本，这在处理日志文件、配置文件时非常有用。
          </SideNote>

          {/* ========== 五、缓冲流优化 ========== */}
          <h2 id="buffered-io" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、缓冲流优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            缓冲流通过在内存中维护缓冲区，减少系统调用次数，显著提升 IO 性能。每次读写操作先在缓冲区中进行，只有当缓冲区满或显式调用 flush 时才真正访问底层设备。
          </p>

          <InteractiveFlow title="缓冲流工作原理" steps={[
            { label: '应用程序写入', description: '调用 write() 方法，数据先写入内存缓冲区', icon: '📝' },
            { label: '缓冲区未满', description: '数据暂存在缓冲区，不立即写入磁盘', icon: '💾' },
            { label: '缓冲区已满', description: '触发 flush，将缓冲区数据批量写入磁盘', icon: '💽' },
            { label: '显式flush/close', description: '调用 flush() 或 close() 强制写入剩余数据', icon: '✅' },
          ]} />

          <Playground language="java" filename="BufferedStreamExample.java" description="缓冲流性能对比" highlights={[4, 8, 12]}
            code={`// ❌ 无缓冲：每次read/write都触发系统调用，性能差
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
}`}
          />

          <Callout type="info" title="缓冲区大小选择">
            默认缓冲区大小为 <strong className="text-ink-light">8KB</strong>（8192字节）。对于大文件传输，可以适当增大缓冲区（如 64KB），但不宜过大，否则会占用过多内存。一般建议设置为磁盘块大小的整数倍（通常 4KB 或 8KB）。
          </Callout>

          {/* ========== 六、文件IO操作 ========== */}
          <h2 id="file-io" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、文件IO操作
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            文件 IO 是最常见的应用场景。除了传统的 FileInputStream/FileOutputStream，JDK 7 引入的 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Files</code> 工具类提供了更简洁的 API。
          </p>

          <Playground language="java" filename="FileIOExample.java" description="传统方式 vs Files工具类" highlights={[5, 10, 15, 20]}
            code={`// 方式1：传统FileInputStream（JDK 1.0+）
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
}`}
          />

          <SideNote label="Files工具类的优势">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Files</code> 类提供了大量静态方法，简化了文件操作：<br/>
            • <code className="font-mono text-[11px]">Files.copy()</code>：复制文件<br/>
            • <code className="font-mono text-[11px]">Files.move()</code>：移动/重命名文件<br/>
            • <code className="font-mono text-[11px]">Files.delete()</code>：删除文件<br/>
            • <code className="font-mono text-[11px]">Files.exists()</code>：检查文件是否存在<br/>
            • <code className="font-mono text-[11px]">Files.size()</code>：获取文件大小<br/>
            这些方法内部已经处理了资源管理和异常，代码更简洁安全。
          </SideNote>

          {/* ========== 七、装饰器模式应用 ========== */}
          <h2 id="io-decorator" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、装饰器模式应用
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Java IO 是<strong className="text-ink-light font-semibold">装饰器模式</strong>的经典应用。通过将基础流对象包装在装饰器流中，可以动态地添加功能（如缓冲、加密、压缩），而无需修改原有代码。
          </p>

          <Playground language="java" filename="DecoratorPatternExample.java" description="IO装饰器模式示例" highlights={[5, 9, 13]}
            code={`// 基础流：从文件读取
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
gzipStream.close();`}
          />

          <Callout type="tip" title="装饰器链的关闭顺序">
            关闭装饰器链时，只需关闭<strong className="text-ink-light font-semibold">最外层</strong>的流，它会依次调用内部流的 close() 方法。但推荐使用 try-with-resources 自动管理资源，避免遗漏。
          </Callout>

          {/* ========== 八、资源管理与异常处理 ========== */}
          <h2 id="try-with-resources" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、资源管理与异常处理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            IO 操作涉及外部资源（文件句柄、网络连接），必须确保正确关闭，否则会导致资源泄漏。JDK 7 引入的 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">try-with-resources</code> 语法可以自动关闭实现了 AutoCloseable 接口的资源。
          </p>

          <Playground language="java" filename="ResourceManagement.java" description="资源管理最佳实践" highlights={[3, 8, 13]}
            code={`// ❌ 旧写法：手动关闭，容易遗漏
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
}`}
          />

          <Callout type="danger" title="资源泄漏的危害">
            未关闭的 IO 流会导致：<br/>
            1️⃣ <strong className="text-ink-light">文件句柄泄漏</strong>：操作系统有文件句柄数量限制，耗尽后无法打开新文件<br/>
            2️⃣ <strong className="text-ink-light">数据丢失</strong>：缓冲区中的数据可能未写入磁盘<br/>
            3️⃣ <strong className="text-ink-light">内存泄漏</strong>：流对象占用的内存无法释放<br/>
            务必使用 try-with-resources 或 finally 块确保资源关闭。
          </Callout>

          {/* ========== 九、NIO简介 ========== */}
          <h2 id="nio-intro" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、NIO简介
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            NIO（New IO，JDK 1.4 引入）是对传统 IO 的补充，提供了<strong className="text-ink-light font-semibold">非阻塞 IO</strong>、<strong className="text-ink-light font-semibold">内存映射文件</strong>、<strong className="text-ink-light font-semibold">通道（Channel）</strong>和<strong className="text-ink-light font-semibold">缓冲区（Buffer）</strong>等新特性，适合高性能网络编程和大文件处理。详细内容见《NIO与网络编程》章节。
          </p>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">特性</th>
                  <th className="text-left py-2.5 px-3 text-accent font-semibold">传统IO</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">NIO</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">IO模型</td><td className="py-2.5 px-3">阻塞IO</td><td className="py-2.5 px-3">非阻塞IO / 多路复用</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">数据单元</td><td className="py-2.5 px-3">流（Stream）</td><td className="py-2.5 px-3">缓冲区（Buffer）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">数据传输</td><td className="py-2.5 px-3">单向（读或写）</td><td className="py-2.5 px-3">双向（Channel可读写）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">适用场景</td><td className="py-2.5 px-3">简单文件读写</td><td className="py-2.5 px-3">高并发网络、大文件</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">复杂度</td><td className="py-2.5 px-3">低，易用</td><td className="py-2.5 px-3">高，学习曲线陡峭</td></tr>
              </tbody>
            </table>
          </div>

          <Callout type="tip" title="何时使用NIO？">
            • 需要处理<strong className="text-ink-light font-semibold">高并发网络连接</strong>（如聊天服务器、游戏服务器）<br/>
            • 需要<strong className="text-ink-light font-semibold">内存映射大文件</strong>（GB级别）<br/>
            • 需要<strong className="text-ink-light font-semibold">零拷贝</strong>传输（如文件服务器）<br/>
            对于简单的文件读写，传统 IO 足够且更易用。
          </Callout>

          {/* ========== 十、性能优化技巧 ========== */}
          <h2 id="performance" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、性能优化技巧
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-green-700 font-sans mb-3">✅ 推荐做法</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>始终使用缓冲流（BufferedXxx）</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>选择合适的缓冲区大小（8KB-64KB）</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>使用 try-with-resources 管理资源</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>小文件用 Files.readAllBytes/readString</span></li>
              </ul>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-red-700 font-sans mb-3">❌ 避免做法</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要逐字节读写（性能极差）</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要忘记关闭流（资源泄漏）</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要用字符流处理二进制数据</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>不要在大文件上使用 readAllBytes</span></li>
              </ul>
            </div>
          </div>

          <Playground language="java" filename="PerformanceTips.java" description="IO性能优化示例" highlights={[5, 10, 15]}
            code={`// 优化1：使用合适的缓冲区大小
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
    .map(FileChannel.MapMode.READ_ONLY, 0, fileSize);`}
          />

          {/* ========== 十一、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、常见误区
          </h2>

          <Callout type="danger" title="误区一：read()返回值可以直接赋值给byte">
            <span className="font-semibold text-ink-light">你以为的：</span><code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">byte b = (byte) in.read();</code><br/>
            <span className="font-semibold text-accent">实际：</span><code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">read()</code> 返回 <strong className="text-ink-light font-semibold">int 类型</strong>（0-255 或 -1），强制转换为 byte 后，-1 会变成 255，导致无法正确判断 EOF。应该用 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">int byteData = in.read();</code> 接收返回值。
          </Callout>

          <Callout type="danger" title="误区二：close()只需要调用一次">
            <span className="font-semibold text-ink-light">你以为的：</span>关闭最外层的流就够了<br/>
            <span className="font-semibold text-accent">实际：</span>虽然关闭装饰器链的最外层会自动关闭内部流，但如果中间某层流的 close() 抛出异常，内部流可能未被正确关闭。<strong className="text-ink-light font-semibold">推荐使用 try-with-resources</strong>，它会确保所有资源都被正确关闭，即使发生异常。
          </Callout>

          <Callout type="danger" title="误区三：字符流和字节流可以混用">
            <span className="font-semibold text-ink-light">你以为的：</span>先用字节流读一部分，再用字符流读剩下的<br/>
            <span className="font-semibold text-accent">实际：</span>字符流内部有缓冲区，会预读数据。如果先用字节流读取，再用字符流读取同一个文件，字符流的缓冲区可能已经读取了部分数据，导致字节流和数据不一致。<strong className="text-ink-light font-semibold">同一数据源只能使用一种流类型</strong>。
          </Callout>

          <Callout type="danger" title="误区四：flush()和close()是一样的">
            <span className="font-semibold text-ink-light">你以为的：</span>close()会自动flush，所以不需要手动flush<br/>
            <span className="font-semibold text-accent">实际：</span>虽然 close() 确实会调用 flush()，但在某些场景下需要<strong className="text-ink-light font-semibold">中途flush</strong>以确保数据写入磁盘（如日志系统、实时数据处理）。此外，如果程序在 close() 之前崩溃，未flush的数据会丢失。关键数据应及时flush。
          </Callout>

          <Callout type="danger" title="误区五：FileInputStream可以读取目录">
            <span className="font-semibold text-ink-light">你以为的：</span>传入目录路径也能读取<br/>
            <span className="font-semibold text-accent">实际：</span><code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">FileInputStream</code> 只能读取<strong className="text-ink-light font-semibold">文件</strong>，传入目录路径会抛出 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">FileNotFoundException</code>。如果需要遍历目录，应使用 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">File.listFiles()</code> 或 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">Files.list()</code>。
          </Callout>

          {/* ========== 十二、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、面试真题
          </h2>

          <InterviewSection questions={[
            { question: 'Java IO中字节流和字符流有什么区别？如何选择？', answer: '字节流（InputStream/OutputStream）以字节为单位处理数据，不关心编码，适合二进制文件（图片、音频、视频）；字符流（Reader/Writer）以字符为单位，自动处理字符编码转换，适合文本文件（txt、xml、json）。选择依据：处理二进制数据用字节流，处理文本数据用字符流。如果不确定，优先使用字节流，因为它更通用。' },
            { question: '什么是缓冲流？为什么能提升性能？', answer: '缓冲流（BufferedInputStream/BufferedOutputStream等）在内存中维护一个缓冲区（默认8KB），读写操作先在缓冲区中进行，只有当缓冲区满或显式调用flush时才真正访问底层设备。这样可以减少系统调用次数，将多次小IO合并为一次大IO，性能提升10-100倍。适用于频繁读写的场景。' },
            { question: 'try-with-resources的工作原理是什么？', answer: 'try-with-resources是JDK 7引入的语法糖，用于自动管理实现了AutoCloseable接口的资源。在try块执行完毕（正常或异常）后，会自动调用资源的close()方法。多个资源可以用分号分隔声明。JDK 9增强了该特性，允许在try之前声明资源。相比传统的finally块手动关闭，try-with-resources更简洁、更安全，避免了资源泄漏。' },
            { question: 'Java IO中的装饰器模式是如何体现的？', answer: 'Java IO是装饰器模式的经典应用。基础流（如FileInputStream）提供核心功能，装饰器流（如BufferedInputStream、DataInputStream）在其基础上添加额外功能（缓冲、数据解析等）。通过层层包装，可以动态组合不同功能，而无需修改原有代码。例如：new DataInputStream(new BufferedInputStream(new FileInputStream("file")))。这种设计提高了代码的灵活性和可扩展性。' },
            { question: 'read()方法返回-1表示什么？为什么返回int而不是byte？', answer: 'read()返回-1表示已到达流末尾（EOF）。返回int而非byte的原因是：byte的取值范围是-128到127，无法区分有效数据-1和EOF标志-1。int的取值范围更大，可以用0-255表示有效字节数据，用-1表示EOF。如果强制将返回值转换为byte，-1会变成255，导致无法正确判断文件结束。' },
            { question: 'FileInputStream和FileReader有什么区别？', answer: 'FileInputStream是字节流，以字节为单位读取数据，不处理字符编码，适合读取二进制文件；FileReader是字符流，以字符为单位读取，内部会根据平台默认编码（或指定编码）将字节转换为字符，适合读取文本文件。如果读取UTF-8编码的中文文本，使用FileReader可以避免乱码问题，而FileInputStream需要手动处理编码转换。' },
            { question: '什么是NIO？与传统IO有什么区别？', answer: 'NIO（New IO）是JDK 1.4引入的新IO API，主要特性：1）非阻塞IO：线程可以在等待IO时执行其他任务；2）通道（Channel）：双向数据传输，支持读写；3）缓冲区（Buffer）：基于块的IO操作；4）选择器（Selector）：单线程管理多个通道，适合高并发场景。传统IO是阻塞的、基于流的、单向的。NIO适合高并发网络编程和大文件处理，传统IO适合简单文件读写。' },
            { question: '如何高效地复制一个大文件？', answer: '高效复制大文件的步骤：1）使用缓冲流减少系统调用：new BufferedInputStream(new FileInputStream(source))；2）选择合适的缓冲区大小（8KB-64KB）；3）批量读写：while ((bytesRead = in.read(buffer)) != -1) { out.write(buffer, 0, bytesRead); }；4）使用try-with-resources确保资源关闭；5）对于超大文件（GB级别），可以考虑使用NIO的FileChannel.transferTo()实现零拷贝，性能更高。' },
          ]} />

          {/* ========== 十三、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十三、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">← 前置知识</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">☕</span><span>Java基础语法</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🏛️</span><span>异常处理机制</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🎨</span><span>设计模式（装饰器）</span></div>
              </div>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">延伸知识 →</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">⚡</span><span>NIO与网络编程</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔒</span><span>序列化与反序列化</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🗄️</span><span>文件操作与路径管理</span></div>
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
