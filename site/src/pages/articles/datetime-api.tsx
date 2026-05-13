import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import InteractiveFlow from '../../components/knowledge/InteractiveFlow'
import SideNote from '../../components/knowledge/SideNote'
import ContextSwitcher from '../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../components/knowledge/SmartTOC'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'legacy-api', text: '一、传统日期 API 的问题', level: 2 },
  { id: 'new-api-overview', text: '二、新日期 API 概览', level: 2 },
  { id: 'localdatetime', text: '2.1 LocalDateTime（本地日期时间）', level: 3 },
  { id: 'zoneddatetime', text: '2.2 ZonedDateTime（带时区日期时间）', level: 3 },
  { id: 'instant', text: '2.3 Instant（时间戳）', level: 3 },
  { id: 'duration-period', text: '三、Duration 与 Period', level: 2 },
  { id: 'formatting', text: '四、日期格式化', level: 2 },
  { id: 'timezone', text: '五、时区处理', level: 2 },
  { id: 'comparison', text: '六、新旧 API 对比', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function DatetimeApi({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Java 8 引入的新日期时间 API（java.time 包）基于
              <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1">LocalDateTime</code>、
              <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1">ZonedDateTime</code>、
              <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light mx-1">Instant</code>
              等不可变类，提供了线程安全、清晰易用的日期时间处理能力，彻底解决了传统 Date/Calendar API 的设计缺陷。
            </p>
          </blockquote>

          <h2 id="legacy-api" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、传统日期 API 的问题
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            在 Java 8 之前，开发者主要使用 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">java.util.Date</code> 和 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">java.util.Calendar</code> 处理日期时间，但它们存在诸多设计缺陷：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-red-700 font-sans mb-3">❌ Date/Calendar 问题</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>可变性：Date 和 Calendar 是可变对象，线程不安全</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>月份从 0 开始：1 月是 0，12 月是 11，容易混淆</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>年份偏移：Calendar.YEAR 需要 +1900</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>API 混乱：Date 和 Calendar 职责不清</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✗</span><span>时区处理复杂：需要手动转换</span></li>
              </ul>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-green-700 font-sans mb-3">✅ java.time 优势</div>
              <ul className="space-y-2 text-[13px] text-ink-muted font-sans">
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>不可变性：所有类都是不可变的，线程安全</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>清晰的语义：LocalDateTime、ZonedDateTime 等</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>月份从 1 开始：符合人类直觉</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>丰富的 API：链式调用，简洁易用</span></li>
                <li className="flex items-start gap-2"><span className="text-sm">✓</span><span>内置时区支持：ZoneId、ZoneOffset</span></li>
              </ul>
            </div>
          </div>

          <Callout type="danger" title="经典陷阱：Date 的可变性">
            <span className="font-semibold text-ink-light">问题代码：</span><br/>
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light block my-2">
              Date date = new Date();<br/>
              sharedMethod(date); // 可能被修改<br/>
              System.out.println(date); // 值已改变！
            </code>
            <span className="font-semibold text-accent">解决：</span>Java 8 的 LocalDateTime 等类都是<strong>不可变的</strong>，每次操作都返回新对象，天然线程安全。
          </Callout>

          <h2 id="new-api-overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、新日期 API 概览
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            java.time 包提供了丰富的日期时间类，以下是核心类的分类：
          </p>

          <DiagramBlock title="java.time 核心类层次结构">
            <svg className="w-full max-w-[600px] mx-auto block" viewBox="0 0 600 280">
              <rect x="20" y="20" width="560" height="40" rx="6" fill="#f5f0e8" stroke="#d4c5a9" strokeWidth="2"/>
              <text x="300" y="45" fill="#6b5e4c" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">java.time 核心类</text>
              
              <rect x="20" y="80" width="130" height="50" rx="4" fill="rgba(181,101,29,0.15)" stroke="#b5651d"/>
              <text x="85" y="100" fill="#8b4c14" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">LocalDate</text>
              <text x="85" y="118" fill="#8b4c14" fontSize="8" fontFamily="sans-serif" textAnchor="middle">日期（无时间）</text>
              
              <rect x="170" y="80" width="130" height="50" rx="4" fill="rgba(95,122,104,0.15)" stroke="#5f7a68"/>
              <text x="235" y="100" fill="#3d5245" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">LocalTime</text>
              <text x="235" y="118" fill="#3d5245" fontSize="8" fontFamily="sans-serif" textAnchor="middle">时间（无日期）</text>
              
              <rect x="320" y="80" width="130" height="50" rx="4" fill="rgba(160,82,45,0.15)" stroke="#a0522d"/>
              <text x="385" y="100" fill="#8a4a1a" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">LocalDateTime</text>
              <text x="385" y="118" fill="#8a4a1a" fontSize="8" fontFamily="sans-serif" textAnchor="middle">日期+时间</text>
              
              <rect x="470" y="80" width="110" height="50" rx="4" fill="rgba(106,90,205,0.15)" stroke="#6a5acd"/>
              <text x="525" y="100" fill="#5a4a9d" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Instant</text>
              <text x="525" y="118" fill="#5a4a9d" fontSize="8" fontFamily="sans-serif" textAnchor="middle">时间戳</text>
              
              <rect x="120" y="160" width="150" height="50" rx="4" fill="rgba(220,20,60,0.12)" stroke="#dc143c"/>
              <text x="195" y="180" fill="#b01030" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ZonedDateTime</text>
              <text x="195" y="198" fill="#b01030" fontSize="8" fontFamily="sans-serif" textAnchor="middle">带时区的日期时间</text>
              
              <rect x="330" y="160" width="140" height="50" rx="4" fill="rgba(0,128,128,0.12)" stroke="#008080"/>
              <text x="400" y="180" fill="#006666" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Duration</text>
              <text x="400" y="198" fill="#006666" fontSize="8" fontFamily="sans-serif" textAnchor="middle">时间段（秒/纳秒）</text>
              
              <rect x="220" y="230" width="160" height="40" rx="4" fill="rgba(255,140,0,0.12)" stroke="#ff8c00"/>
              <text x="300" y="255" fill="#cc7000" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Period</text>
              <text x="300" y="268" fill="#cc7000" fontSize="8" fontFamily="sans-serif" textAnchor="middle">时间段（年/月/日）</text>
            </svg>
          </DiagramBlock>

          <h3 id="localdatetime" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.1 LocalDateTime（本地日期时间）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            LocalDateTime 表示不带时区的日期和时间，是最常用的日期时间类：
          </p>

          <Playground language="java" filename="LocalDateTimeExample.java" description="LocalDateTime 基本用法" highlights={[3, 7, 11, 15]}
            code={`// 1. 创建实例
LocalDateTime now = LocalDateTime.now(); // 当前时间
LocalDateTime specific = LocalDateTime.of(2024, 1, 15, 10, 30, 0);

// 2. 获取字段
int year = now.getYear();           // 2024
int month = now.getMonthValue();    // 1-12（不是 0-11！）
int day = now.getDayOfMonth();      // 1-31

// 3. 日期计算（返回新对象，原对象不变）
LocalDateTime tomorrow = now.plusDays(1);
LocalDateTime nextWeek = now.plusWeeks(1);
LocalDateTime lastMonth = now.minusMonths(1);

// 4. 比较
boolean isAfter = now.isAfter(specific);
boolean isBefore = now.isBefore(specific);

// 5. 转换为字符串
String formatted = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));`}
          />

          <SideNote label="不可变性示例">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">now.plusDays(1)</code> 不会修改 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">now</code>，而是返回一个新的 LocalDateTime 对象。这是函数式编程的思想，保证了线程安全。
          </SideNote>

          <h3 id="zoneddatetime" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.2 ZonedDateTime（带时区日期时间）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ZonedDateTime 表示带时区的日期和时间，适用于跨时区场景：
          </p>

          <Playground language="java" filename="ZonedDateTimeExample.java" description="ZonedDateTime 时区处理" highlights={[3, 7, 11]}
            code={`// 1. 创建带时区的日期时间
ZonedDateTime beijingTime = ZonedDateTime.now(ZoneId.of("Asia/Shanghai"));
ZonedDateTime newYorkTime = ZonedDateTime.now(ZoneId.of("America/New_York"));

// 2. 时区转换
ZonedDateTime converted = beijingTime.withZoneSameInstant(ZoneId.of("America/New_York"));

// 3. 获取时区信息
ZoneId zone = beijingTime.getZone(); // Asia/Shanghai
ZoneOffset offset = beijingTime.getOffset(); // +08:00

// 4. LocalDateTime 转 ZonedDateTime
LocalDateTime local = LocalDateTime.now();
ZonedDateTime zoned = local.atZone(ZoneId.of("Asia/Shanghai"));`}
          />

          <h3 id="instant" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            2.3 Instant（时间戳）
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Instant 表示 UTC 时间轴上的一个瞬间（时间戳），精度为纳秒，适用于时间戳记录和性能测量：
          </p>

          <Playground language="java" filename="InstantExample.java" description="Instant 时间戳用法" highlights={[3, 7, 11]}
            code={`// 1. 获取当前时间戳
Instant now = Instant.now();

// 2. 转换为毫秒（兼容旧 API）
long millis = now.toEpochMilli();

// 3. 从毫秒创建
Instant fromMillis = Instant.ofEpochMilli(millis);

// 4. 时间差计算
Instant start = Instant.now();
// ... 执行某些操作 ...
Instant end = Instant.now();
Duration duration = Duration.between(start, end);
System.out.println("耗时: " + duration.toMillis() + "ms");`}
          />

          <h2 id="duration-period" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Duration 与 Period
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Duration 和 Period 用于表示时间段，但适用场景不同：
          </p>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">特性</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">Duration</th>
                  <th className="text-left py-2.5 px-3 text-orange font-semibold">Period</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">适用对象</td><td className="py-2.5 px-3">Instant、LocalTime、LocalDateTime</td><td className="py-2.5 px-3">LocalDate</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">时间单位</td><td className="py-2.5 px-3">秒、纳秒、毫秒</td><td className="py-2.5 px-3">年、月、日</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">典型场景</td><td className="py-2.5 px-3">性能测量、倒计时</td><td className="py-2.5 px-3">年龄计算、日期加减</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">示例</td><td className="py-2.5 px-3 font-mono">PT1H30M（1小时30分钟）</td><td className="py-2.5 px-3 font-mono">P1Y2M3D（1年2个月3天）</td></tr>
              </tbody>
            </table>
          </div>

          <Playground language="java" filename="DurationPeriodExample.java" description="Duration 和 Period 使用示例" highlights={[4, 8, 12, 16]}
            code={`// Duration：基于时间的量度
LocalTime start = LocalTime.of(9, 0);
LocalTime end = LocalTime.of(17, 30);
Duration workHours = Duration.between(start, end);
System.out.println("工作时长: " + workHours.toHours() + "小时"); // 8小时

// Period：基于日期的量度
LocalDate birthday = LocalDate.of(1990, 5, 15);
LocalDate today = LocalDate.now();
Period age = Period.between(birthday, today);
System.out.println("年龄: " + age.getYears() + "岁");

// 日期加减
LocalDate nextMonth = today.plus(Period.ofMonths(1));
LocalDate lastYear = today.minus(Period.ofYears(1));

// Duration 加减
LocalDateTime now = LocalDateTime.now();
LocalDateTime later = now.plus(Duration.ofHours(2).plusMinutes(30));`}
          />

          <h2 id="formatting" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、日期格式化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            DateTimeFormatter 替代了旧的 SimpleDateFormat，它是<strong>线程安全</strong>且不可变的：
          </p>

          <Playground language="java" filename="DateTimeFormatterExample.java" description="DateTimeFormatter 格式化示例" highlights={[4, 8, 12]}
            code={`// 1. 预定义格式
LocalDateTime now = LocalDateTime.now();
String iso = now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
// 输出: 2024-01-15T10:30:00

// 2. 自定义格式
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss");
String chinese = now.format(formatter);
// 输出: 2024年01月15日 10:30:00

// 3. 解析字符串
String dateStr = "2024-01-15 10:30:00";
LocalDateTime parsed = LocalDateTime.parse(dateStr, 
    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

// 4. 线程安全（可直接共享）
public class DateUtils {
    private static final DateTimeFormatter FORMATTER = 
        DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
    public static String format(LocalDate date) {
        return date.format(FORMATTER); // 线程安全
    }
}`}
          />

          <Callout type="tip" title="常用格式符号">
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">yyyy</code> - 四位年份 | 
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">MM</code> - 月份（01-12） | 
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">dd</code> - 日期（01-31） | 
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">HH</code> - 小时（00-23） | 
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">mm</code> - 分钟（00-59） | 
            <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">ss</code> - 秒（00-59）
          </Callout>

          <h2 id="timezone" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、时区处理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            新 API 提供了完善的时区支持，ZoneId 和 ZoneOffset 是核心类：
          </p>

          <Playground language="java" filename="TimezoneExample.java" description="时区处理示例" highlights={[4, 8, 12]}
            code={`// 1. 获取所有时区 ID
Set<String> zoneIds = ZoneId.getAvailableZoneIds();

// 2. 创建时区
ZoneId beijing = ZoneId.of("Asia/Shanghai");
ZoneId newYork = ZoneId.of("America/New_York");
ZoneId utc = ZoneId.of("UTC");

// 3. 时区转换
ZonedDateTime beijingTime = ZonedDateTime.now(beijing);
ZonedDateTime nyTime = beijingTime.withZoneSameInstant(newYork);

// 4. 固定偏移量（不推荐，无法处理夏令时）
ZoneOffset offset = ZoneOffset.of("+08:00");
OffsetDateTime offsetTime = OffsetDateTime.now(offset);

// 5. 最佳实践：始终使用 ZoneId 而非 ZoneOffset
ZonedDateTime correct = ZonedDateTime.now(ZoneId.of("Asia/Shanghai"));`}
          />

          <SideNote label="夏令时处理">
            ZoneId 会自动处理夏令时（DST）。例如美国东部时间在夏季是 EDT（UTC-4），冬季是 EST（UTC-5）。使用 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">ZoneId.of("America/New_York")</code> 会自动调整，而 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">ZoneOffset.of("-05:00")</code> 不会。
          </SideNote>

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、新旧 API 对比
          </h2>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 my-5">
            <table className="w-full text-[12px] sm:text-[13px] border-collapse font-sans min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-3 text-ink font-semibold">功能</th>
                  <th className="text-left py-2.5 px-3 text-orange font-semibold">旧 API（Date/Calendar）</th>
                  <th className="text-left py-2.5 px-3 text-teal font-semibold">新 API（java.time）</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">获取当前时间</td><td className="py-2.5 px-3 font-mono">new Date()</td><td className="py-2.5 px-3 font-mono">LocalDateTime.now()</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">指定日期</td><td className="py-2.5 px-3 font-mono">new Calendar.Builder()...</td><td className="py-2.5 px-3 font-mono">LocalDate.of(2024, 1, 15)</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">日期加减</td><td className="py-2.5 px-3 font-mono">calendar.add(...)</td><td className="py-2.5 px-3 font-mono">date.plusDays(1)</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">格式化</td><td className="py-2.5 px-3 font-mono">SimpleDateFormat（非线程安全）</td><td className="py-2.5 px-3 font-mono">DateTimeFormatter（线程安全）</td></tr>
                <tr className="border-b border-border-light"><td className="py-2.5 px-3 font-medium text-ink">时区处理</td><td className="py-2.5 px-3 font-mono">TimeZone + Calendar</td><td className="py-2.5 px-3 font-mono">ZonedDateTime + ZoneId</td></tr>
                <tr><td className="py-2.5 px-3 font-medium text-ink">线程安全</td><td className="py-2.5 px-3 font-mono text-red-700">❌ 否</td><td className="py-2.5 px-3 font-mono text-green-700">✅ 是（不可变）</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区一：LocalDateTime 可以处理时区">
            <span className="font-semibold text-ink-light">你以为的：</span>LocalDateTime 能表示不同时区的时间<br/>
            <span className="font-semibold text-accent">实际：</span>LocalDateTime <strong>不包含时区信息</strong>，它只是"墙上时钟"时间。如果需要时区，必须使用 ZonedDateTime 或 OffsetDateTime。例如："2024-01-15 10:30" 在北京和纽约代表不同的时刻，但 LocalDateTime 无法区分。
          </Callout>

          <Callout type="danger" title="误区二：Instant 和 LocalDateTime 可以直接转换">
            <span className="font-semibold text-ink-light">你以为的：</span>Instant 可以直接转为 LocalDateTime<br/>
            <span className="font-semibold text-accent">实际：</span>Instant 是 UTC 时间戳，转换为 LocalDateTime 需要指定时区：<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">instant.atZone(ZoneId.of("Asia/Shanghai")).toLocalDateTime()</code>。忽略时区会导致时间错误。
          </Callout>

          <Callout type="danger" title="误区三：Period 可以精确计算天数">
            <span className="font-semibold text-ink-light">你以为的：</span>Period.between() 能准确计算两个日期之间的天数<br/>
            <span className="font-semibold text-accent">实际：</span>Period 只计算年、月、日的差异，不考虑具体天数。例如 2024-01-31 到 2024-02-28，Period 返回 P28D（28天），但实际相差 28 天。如果需要精确天数，应使用 <code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">ChronoUnit.DAYS.between()</code>。
          </Callout>

          <Callout type="danger" title="误区四：DateTimeFormatter 需要每次创建">
            <span className="font-semibold text-ink-light">你以为的：</span>每次格式化都要 new DateTimeFormatter<br/>
            <span className="font-semibold text-accent">实际：</span>DateTimeFormatter 是<strong>不可变且线程安全</strong>的，应该定义为静态常量复用：<code className="font-mono text-[12px] sm:text-[13px] bg-parchment-warm text-accent-deep px-[5px] sm:px-[7px] py-[2px] rounded-[3px] border border-border-light">private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");</code>。这与 SimpleDateFormat 形成鲜明对比（后者非线程安全）。
          </Callout>

          <Callout type="danger" title="误区五：ZoneOffset 和 ZoneId 可以互换">
            <span className="font-semibold text-ink-light">你以为的：</span>ZoneOffset.of("+08:00") 和 ZoneId.of("Asia/Shanghai") 等价<br/>
            <span className="font-semibold text-accent">实际：</span>ZoneOffset 只是固定的偏移量，<strong>不处理夏令时</strong>。ZoneId 包含完整的时区规则，会自动调整夏令时。例如美国东部时间夏季是 UTC-4，冬季是 UTC-5，使用 ZoneOffset 会出错。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            { question: 'Java 8 为什么要引入新的日期时间 API？', answer: '旧 API（Date/Calendar）存在诸多设计缺陷：1）可变性导致线程不安全；2）月份从 0 开始，容易混淆；3）API 混乱，Date 和 Calendar 职责不清；4）时区处理复杂；5）SimpleDateFormat 非线程安全。新 API 基于不可变类，线程安全，语义清晰，API 简洁易用，内置时区支持。' },
            { question: 'LocalDateTime 和 ZonedDateTime 的区别是什么？', answer: 'LocalDateTime 表示不带时区的日期时间（"墙上时钟"时间），适用于本地场景；ZonedDateTime 表示带时区的日期时间，适用于跨时区场景。例如："2024-01-15 10:30" 是 LocalDateTime，但无法确定是哪个时区的时间；"2024-01-15 10:30+08:00[Asia/Shanghai]" 是 ZonedDateTime，明确表示北京时间。' },
            { question: 'Instant 的作用是什么？与 LocalDateTime 如何转换？', answer: 'Instant 表示 UTC 时间轴上的一个瞬间（时间戳），精度为纳秒，适用于时间戳记录和性能测量。转换为 LocalDateTime 需要指定时区：instant.atZone(ZoneId.of("Asia/Shanghai")).toLocalDateTime()。反过来：localDateTime.atZone(ZoneId.of("Asia/Shanghai")).toInstant()。' },
            { question: 'Duration 和 Period 的区别及使用场景？', answer: 'Duration 基于时间（秒、纳秒），适用于 Instant、LocalTime、LocalDateTime，典型场景是性能测量、倒计时；Period 基于日期（年、月、日），适用于 LocalDate，典型场景是年龄计算、日期加减。例如：计算工作时长用 Duration，计算年龄用 Period。' },
            { question: 'DateTimeFormatter 为什么线程安全？', answer: 'DateTimeFormatter 是<strong>不可变类</strong>，所有字段都是 final 的，创建后状态不会改变。因此可以在多线程环境中安全共享，无需同步。这与 SimpleDateFormat 形成鲜明对比（后者内部维护可变状态，非线程安全）。最佳实践是将 DateTimeFormatter 定义为静态常量复用。' },
            { question: '如何处理夏令时（DST）？', answer: '使用 ZoneId 而非 ZoneOffset。ZoneId 包含完整的时区规则，会自动处理夏令时。例如：ZoneId.of("America/New_York") 会在夏季自动使用 EDT（UTC-4），冬季使用 EST（UTC-5）。而 ZoneOffset.of("-05:00") 是固定偏移量，不会自动调整，会导致时间错误。' },
            { question: '如何将旧 API（Date/Calendar）转换为新 API？', answer: 'Date 转 Instant：date.toInstant()；Instant 转 Date：Date.from(instant)。Calendar 转 ZonedDateTime：calendar.toZonedDateTime()；ZonedDateTime 转 Calendar：GregorianCalendar.from(zonedDateTime)。建议使用 Instant 作为中间桥梁，避免直接操作 Date。' },
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal font-sans mb-3">← 前置知识</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">📋</span><span>Java 基础语法</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🧵</span><span>线程安全与不可变性</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🌐</span><span>时区与 UTC 概念</span></div>
              </div>
            </div>
            <div className="bg-parchment-light border border-border rounded-paper-md p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent font-sans mb-3">延伸知识 →</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">⚡</span><span>Java 8 新特性（Lambda、Stream）</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🔒</span><span>函数式编程与不可变对象</span></div>
                <div className="flex items-center gap-2 text-[13px] text-ink-muted font-sans"><span className="text-sm">🚀</span><span>分布式系统中的时间同步</span></div>
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
