import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import SideNote from '../../components/knowledge/SideNote'
import SmartTOC from '../../components/knowledge/SmartTOC'
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'proxy', text: '一、代理模式 (Proxy)', level: 2 },
  { id: 'decorator', text: '二、装饰器模式 (Decorator)', level: 2 },
  { id: 'adapter', text: '三、适配器模式 (Adapter)', level: 2 },
  { id: 'facade', text: '四、外观模式 (Facade)', level: 2 },
  { id: 'bridge', text: '五、桥接模式 (Bridge)', level: 2 },
  { id: 'composite', text: '六、组合模式 (Composite)', level: 2 },
  { id: 'flyweight', text: '七、享元模式 (Flyweight)', level: 2 },
  { id: 'comparison', text: '八、结构型模式对比', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function StructuralPatterns({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              结构型模式关注<strong className="text-accent">类和对象的组合方式</strong>，通过继承或组合形成更大的结构，简化系统设计并提高灵活性。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要结构型模式？">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>解耦</strong>：降低类之间的依赖关系</li>
              <li><strong>扩展</strong>：在不修改现有代码的情况下增加新功能</li>
              <li><strong>复用</strong>：通过组合而非继承实现代码复用</li>
              <li><strong>简化</strong>：隐藏复杂系统的内部结构，提供简洁接口</li>
            </ul>
          </Callout>

          <h2 id="proxy" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、代理模式 (Proxy)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：为其他对象提供一种代理以控制对这个对象的访问。适用于远程代理、虚拟代理、保护代理等场景。
          </p>

          <Playground
            code={`// 主题接口
interface Image {
    void display();
}

// 真实主题
class RealImage implements Image {
    private String filename;
    
    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();
    }
    
    private void loadFromDisk() {
        System.out.println("Loading " + filename);
    }
    
    public void display() {
        System.out.println("Displaying " + filename);
    }
}

// 代理：懒加载
class ProxyImage implements Image {
    private String filename;
    private RealImage realImage;
    
    public ProxyImage(String filename) {
        this.filename = filename;
    }
    
    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename);  // 首次使用时才加载
        }
        realImage.display();
    }
}

// 使用
Image image = new ProxyImage("test.jpg");
image.display();  // Loading test.jpg → Displaying test.jpg
image.display();  // Displaying test.jpg（不再加载）`}
            language="java"
            highlights={[20, 31]}
            filename="proxy.java"
            description="代理模式 - 虚拟代理"
          />

          <SideNote label="Spring AOP 与代理">
            Spring AOP 基于代理模式实现。默认使用 JDK 动态代理（基于接口），如果目标类没有实现接口则使用 CGLIB（基于子类）。@Transactional、@Cacheable 等注解都是通过代理实现的。
          </SideNote>

          <h2 id="decorator" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、装饰器模式 (Decorator)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：动态地给对象添加额外的职责，而不改变其结构。比继承更灵活，支持运行时组合。
          </p>

          <Playground
            code={`// 组件接口
interface Coffee {
    double cost();
    String description();
}

// 具体组件
class SimpleCoffee implements Coffee {
    public double cost() { return 10.0; }
    public String description() { return "Simple Coffee"; }
}

// 装饰器基类
abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;
    
    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }
    
    public double cost() {
        return decoratedCoffee.cost();
    }
    
    public String description() {
        return decoratedCoffee.description();
    }
}

// 具体装饰器
class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }
    
    public double cost() {
        return super.cost() + 2.0;
    }
    
    public String description() {
        return super.description() + ", Milk";
    }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }
    
    public double cost() {
        return super.cost() + 1.0;
    }
    
    public String description() {
        return super.description() + ", Sugar";
    }
}

// 使用：链式装饰
Coffee coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
System.out.println(coffee.description());  // Simple Coffee, Milk, Sugar
System.out.println(coffee.cost());         // 13.0`}
            language="java"
            highlights={[14, 37, 51, 67]}
            filename="decorator.java"
            description="装饰器模式"
          />

          <DiagramBlock title="装饰器 UML 图">
            {`classDiagram
              class Coffee {
                <<interface>>
                +cost()
                +description()
              }
              class SimpleCoffee {
                +cost()
                +description()
              }
              class CoffeeDecorator {
                <<abstract>>
                +cost()
                +description()
              }
              class MilkDecorator {
                +cost()
                +description()
              }
              class SugarDecorator {
                +cost()
                +description()
              }
              Coffee <|.. SimpleCoffee
              Coffee <|.. CoffeeDecorator
              CoffeeDecorator <|-- MilkDecorator
              CoffeeDecorator <|-- SugarDecorator
              CoffeeDecorator o-- Coffee
            `}
          </DiagramBlock>

          <h2 id="adapter" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、适配器模式 (Adapter)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：将一个类的接口转换成客户希望的另一个接口，使原本不兼容的类可以一起工作。
          </p>

          <Playground
            code={`// 目标接口
interface MediaPlayer {
    void play(String audioType, String fileName);
}

// 被适配者：高级播放器
interface AdvancedMediaPlayer {
    void playVlc(String fileName);
    void playMp4(String fileName);
}

class VlcPlayer implements AdvancedMediaPlayer {
    public void playVlc(String fileName) {
        System.out.println("Playing vlc file: " + fileName);
    }
    public void playMp4(String fileName) { /* do nothing */ }
}

class Mp4Player implements AdvancedMediaPlayer {
    public void playVlc(String fileName) { /* do nothing */ }
    public void playMp4(String fileName) {
        System.out.println("Playing mp4 file: " + fileName);
    }
}

// 适配器
class MediaAdapter implements MediaPlayer {
    private AdvancedMediaPlayer advancedPlayer;
    
    public MediaAdapter(String audioType) {
        if ("vlc".equalsIgnoreCase(audioType)) {
            advancedPlayer = new VlcPlayer();
        } else if ("mp4".equalsIgnoreCase(audioType)) {
            advancedPlayer = new Mp4Player();
        }
    }
    
    public void play(String audioType, String fileName) {
        if ("vlc".equalsIgnoreCase(audioType)) {
            advancedPlayer.playVlc(fileName);
        } else if ("mp4".equalsIgnoreCase(audioType)) {
            advancedPlayer.playMp4(fileName);
        }
    }
}

// 目标实现
class AudioPlayer implements MediaPlayer {
    public void play(String audioType, String fileName) {
        if ("mp3".equalsIgnoreCase(audioType)) {
            System.out.println("Playing mp3 file: " + fileName);
        } else if ("vlc".equalsIgnoreCase(audioType) || 
                   "mp4".equalsIgnoreCase(audioType)) {
            MediaAdapter adapter = new MediaAdapter(audioType);
            adapter.play(audioType, fileName);
        } else {
            System.out.println("Invalid media type: " + audioType);
        }
    }
}

// 使用
AudioPlayer player = new AudioPlayer();
player.play("mp3", "song.mp3");   // Playing mp3 file: song.mp3
player.play("vlc", "movie.vlc");  // Playing vlc file: movie.vlc
player.play("mp4", "video.mp4");  // Playing mp4 file: video.mp4`}
            language="java"
            highlights={[29, 49, 61]}
            filename="adapter.java"
            description="适配器模式"
          />

          <Callout type="info" title="对象适配器 vs 类适配器">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>对象适配器</strong>：通过组合持有被适配者实例（Java 常用）</li>
              <li><strong>类适配器</strong>：通过多重继承实现（Java 不支持，C++ 可用）</li>
              <li>对象适配器更灵活，可以适配多个不同的类</li>
            </ul>
          </Callout>

          <h2 id="facade" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、外观模式 (Facade)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：为子系统中的一组接口提供一个统一的界面，简化客户端的使用。
          </p>

          <Playground
            code={`// 子系统类
class CPU {
    public void freeze() { System.out.println("CPU freeze"); }
    public void jump(long position) { System.out.println("CPU jump to " + position); }
    public void execute() { System.out.println("CPU execute"); }
}

class Memory {
    public void load(long position, byte[] data) {
        System.out.println("Memory load at " + position);
    }
}

class HardDrive {
    public byte[] read(long lba, int size) {
        System.out.println("HardDrive read from " + lba);
        return new byte[size];
    }
}

// 外观类
class ComputerFacade {
    private CPU cpu;
    private Memory memory;
    private HardDrive hardDrive;
    
    public ComputerFacade() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }
    
    public void start() {
        cpu.freeze();
        memory.load(0, hardDrive.read(0, 1024));
        cpu.jump(0);
        cpu.execute();
    }
}

// 使用：简化为一行调用
ComputerFacade computer = new ComputerFacade();
computer.start();
// CPU freeze
// HardDrive read from 0
// Memory load at 0
// CPU jump to 0
// CPU execute`}
            language="java"
            highlights={[22, 35]}
            filename="facade.java"
            description="外观模式"
          />

          <SideNote label="Facade vs Adapter">
            Facade 是简化复杂系统的接口，提供新的统一接口；Adapter 是转换已有接口，使其符合目标接口。Facade 面向的是整个子系统，Adapter 面向的是单个类。
          </SideNote>

          <h2 id="bridge" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、桥接模式 (Bridge)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：将抽象部分与实现部分分离，使它们可以独立变化。通过组合替代继承，避免类爆炸。
          </p>

          <Playground
            code={`// 实现接口
interface Color {
    void applyColor();
}

class Red implements Color {
    public void applyColor() { System.out.print("Red"); }
}

class Blue implements Color {
    public void applyColor() { System.out.print("Blue"); }
}

// 抽象类
abstract class Shape {
    protected Color color;
    
    public Shape(Color color) {
        this.color = color;
    }
    
    public abstract void draw();
}

// 扩展抽象
class Circle extends Shape {
    public Circle(Color color) {
        super(color);
    }
    
    public void draw() {
        System.out.print("Circle ");
        color.applyColor();
        System.out.println();
    }
}

class Square extends Shape {
    public Square(Color color) {
        super(color);
    }
    
    public void draw() {
        System.out.print("Square ");
        color.applyColor();
        System.out.println();
    }
}

// 使用：任意组合
Shape redCircle = new Circle(new Red());
Shape blueSquare = new Square(new Blue());
redCircle.draw();   // Circle Red
blueSquare.draw();  // Square Blue`}
            language="java"
            highlights={[15, 26, 38, 51]}
            filename="bridge.java"
            description="桥接模式"
          />

          <Callout type="warning" title="桥接 vs 适配器">
            桥接模式在设计初期就考虑了抽象和实现的分离，是主动的设计决策；适配器模式是在设计后期为了解决接口不兼容问题，是被动的补救措施。
          </Callout>

          <h2 id="composite" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、组合模式 (Composite)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：将对象组合成树形结构以表示"部分-整体"的层次结构，使客户端对单个对象和组合对象的使用具有一致性。
          </p>

          <Playground
            code={`// 组件接口
interface FileSystemComponent {
    void showInfo();
    long getSize();
}

// 叶子节点
class File implements FileSystemComponent {
    private String name;
    private long size;
    
    public File(String name, long size) {
        this.name = name;
        this.size = size;
    }
    
    public void showInfo() {
        System.out.println("File: " + name + " (" + size + " bytes)");
    }
    
    public long getSize() {
        return size;
    }
}

// 容器节点
class Directory implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> children = new ArrayList<>();
    
    public Directory(String name) {
        this.name = name;
    }
    
    public void add(FileSystemComponent component) {
        children.add(component);
    }
    
    public void remove(FileSystemComponent component) {
        children.remove(component);
    }
    
    public void showInfo() {
        System.out.println("Directory: " + name);
        for (FileSystemComponent child : children) {
            System.out.print("  ");
            child.showInfo();
        }
    }
    
    public long getSize() {
        return children.stream().mapToLong(FileSystemComponent::getSize).sum();
    }
}

// 使用：统一处理
Directory root = new Directory("root");
Directory docs = new Directory("docs");
docs.add(new File("readme.txt", 1024));
docs.add(new File("notes.md", 2048));
root.add(docs);
root.add(new File("config.yaml", 512));

root.showInfo();
// Directory: root
//   Directory: docs
//     File: readme.txt (1024 bytes)
//     File: notes.md (2048 bytes)
//   File: config.yaml (512 bytes)

System.out.println("Total size: " + root.getSize() + " bytes");  // 3584`}
            language="java"
            highlights={[2, 8, 27, 57]}
            filename="composite.java"
            description="组合模式"
          />

          <h2 id="flyweight" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、享元模式 (Flyweight)
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <strong>核心思想</strong>：通过共享技术有效地支持大量细粒度对象，减少内存占用。区分内部状态（可共享）和外部状态（不可共享）。
          </p>

          <Playground
            code={`// 享元接口
interface Character {
    void display(int x, int y);
}

// 具体享元
class ConcreteCharacter implements Character {
    private char value;  // 内部状态（可共享）
    
    public ConcreteCharacter(char value) {
        this.value = value;
    }
    
    public void display(int x, int y) {  // 外部状态（每次不同）
        System.out.println("Char '" + value + "' at (" + x + ", " + y + ")");
    }
}

// 享元工厂
class CharacterFactory {
    private Map<Character, ConcreteCharacter> pool = new HashMap<>();
    
    public Character getCharacter(char value) {
        if (!pool.containsKey(value)) {
            pool.put(value, new ConcreteCharacter(value));
        }
        return pool.get(value);
    }
    
    public int getPoolSize() {
        return pool.size();
    }
}

// 使用
CharacterFactory factory = new CharacterFactory();

// 文档中有 1000 个 'a'，但只创建一个对象
for (int i = 0; i < 1000; i++) {
    Character c = factory.getCharacter('a');
    c.display(i % 100, i / 100);
}

System.out.println("Pool size: " + factory.getPoolSize());  // 1（只有一个 'a' 对象）`}
            language="java"
            highlights={[2, 7, 21, 37]}
            filename="flyweight.java"
            description="享元模式"
          />

          <SideNote label="String 常量池">
            Java 的 String 常量池是享元模式的经典应用。<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">String s1 = "hello"</code> 和 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">String s2 = "hello"</code> 指向同一对象，节省内存。
          </SideNote>

          <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、结构型模式对比
          </h2>

          <table className="w-full border-collapse my-5 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep border-b border-border">
                <th className="text-left py-2 px-3 font-semibold text-ink">模式</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">核心目的</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">关键特征</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="py-2 px-3 font-medium text-ink">代理</td>
                <td className="py-2 px-3 text-ink-muted">控制访问</td>
                <td className="py-2 px-3 text-ink-muted">间接层，延迟加载/权限控制</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-ink">装饰器</td>
                <td className="py-2 px-3 text-ink-muted">动态增强功能</td>
                <td className="py-2 px-3 text-ink-muted">包装对象，递归组合</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-ink">适配器</td>
                <td className="py-2 px-3 text-ink-muted">接口转换</td>
                <td className="py-2 px-3 text-ink-muted">包装不兼容的接口</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-ink">外观</td>
                <td className="py-2 px-3 text-ink-muted">简化接口</td>
                <td className="py-2 px-3 text-ink-muted">统一入口，隐藏复杂性</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-ink">桥接</td>
                <td className="py-2 px-3 text-ink-muted">抽象与实现分离</td>
                <td className="py-2 px-3 text-ink-muted">组合替代继承</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-ink">组合</td>
                <td className="py-2 px-3 text-ink-muted">树形结构</td>
                <td className="py-2 px-3 text-ink-muted">统一处理单个和组合对象</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-ink">享元</td>
                <td className="py-2 px-3 text-ink-muted">共享对象</td>
                <td className="py-2 px-3 text-ink-muted">缓存 + 内外状态分离</td>
              </tr>
            </tbody>
          </table>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1：代理模式和装饰器模式一样">
            <p className="mb-2"><strong>错误认知</strong>：认为两者都是包装对象，所以没有区别。</p>
            <p><strong>正确理解</strong>：代理模式控制对原对象的访问（如权限检查、懒加载），不改变原对象的行为；装饰器模式增强原对象的功能（如添加日志、加密），会改变行为。代理通常由框架自动创建，装饰器由开发者手动组合。</p>
          </Callout>

          <Callout type="danger" title="误区 2：适配器只是改个方法名">
            <p className="mb-2"><strong>错误认知</strong>：认为适配器只是简单的方法转发。</p>
            <p><strong>正确理解</strong>：适配器可能需要进行数据格式转换、参数重组、异常处理等复杂逻辑。例如将 XML 接口适配为 JSON 接口，不仅仅是方法名的映射。</p>
          </Callout>

          <Callout type="danger" title="误区 3：外观模式违反开闭原则">
            <p className="mb-2"><strong>错误认知</strong>：认为外观类封装了子系统，新增功能必须修改外观类。</p>
            <p><strong>正确理解</strong>：外观只提供常用功能的简化接口，客户端仍可直接访问子系统。如果需要新功能，可以创建新的外观类或扩展现有外观，而不是修改原有代码。</p>
          </Callout>

          <Callout type="warning" title="误区 4：组合模式只能用于文件系统">
            <p className="mb-2"><strong>错误认知</strong>：认为组合模式只适用于树形结构的文件/目录。</p>
            <p><strong>正确理解</strong>：任何"部分-整体"层次结构都适用，如 GUI 组件（窗口包含按钮、文本框）、组织架构（部门包含员工）、菜单系统等。关键是客户端能统一处理单个对象和组合对象。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Spring AOP 使用的是哪种代理？JDK 动态代理和 CGLIB 有什么区别？",
              answer: "Spring AOP 优先使用 JDK 动态代理（基于接口），如果目标类没有实现接口则使用 CGLIB（基于子类）。JDK 动态代理要求目标类实现接口，通过反射生成代理类；CGLIB 通过字节码技术生成目标类的子类，可以代理没有接口的类，但不能代理 final 类和方法。Spring Boot 2.x 后默认启用 CGLIB（proxyTargetClass=true）。"
            },
            {
              question: "装饰器模式和继承的区别是什么？",
              answer: "继承是编译时静态绑定，所有子类都会获得父类的功能，无法灵活组合；装饰器是运行时动态绑定，可以根据需要组合多个装饰器，遵循开闭原则。例如 Java IO 流中，BufferedInputStream 装饰 FileInputStream，可以嵌套多层装饰（缓冲 + 数据转换），而继承无法实现这种灵活性。"
            },
            {
              question: "适配器模式和代理模式的区别？",
              answer: "适配器改变接口以匹配客户需求，解决接口不兼容问题；代理不改变接口，只是控制对原对象的访问。适配器的目标是让两个不相关的类协同工作，代理的目标是增强或控制已有对象。适配器通常在开发初期设计，代理通常在运行时动态创建。"
            },
            {
              question: "什么时候使用桥接模式？举例说明",
              answer: "当系统有多个维度的变化时使用桥接模式。例如图形绘制系统有两个维度：形状（圆形、方形）和颜色（红色、蓝色）。如果用继承，需要 CircleRed、CircleBlue、SquareRed、SquareBlue 四个类；用桥接模式，只需 Shape 和 Color 两个维度，通过组合实现任意搭配，避免类爆炸。"
            },
            {
              question: "享元模式和单例模式的区别？",
              answer: "单例保证全局只有一个实例，享元可以有多个实例但会共享相同状态的实例。单例关注唯一性，享元关注内存优化。例如 String 常量池中可以有多个不同的字符串对象（不是单例），但相同的字符串只创建一个对象（享元）。"
            },
            {
              question: "组合模式中透明方式和安全方式的区别？",
              answer: "透明方式：在 Component 接口中声明所有管理子节点的方法（add/remove/getChild），叶子节点和容器节点都实现这些方法，叶子节点的方法抛出异常或返回空。安全方式：只在 Composite 中声明管理子节点的方法，Client 需要先判断类型再调用。透明方式更符合组合模式的思想，但不够安全；安全方式类型安全，但失去了透明性。"
            },
            {
              question: "MyBatis 中使用了哪些结构型模式？",
              answer: "① 代理模式：Mapper 接口通过 JDK 动态代理生成实现类；② 适配器模式：Log 接口适配不同的日志框架（SLF4J、Log4j）；③ 装饰器模式：Cache 接口的多层装饰（LruCache、LoggingCache）；④ 组合模式：SqlNode 树形结构构建动态 SQL。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/09-design-patterns/design-pattern-intro" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">设计模式概述</div>
              <div className="text-[12px] text-ink-muted mt-1">SOLID 原则与设计模式分类</div>
            </a>
            <a href="/docs/09-design-patterns/creational-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">上一篇 ←</div>
              <div className="font-semibold text-ink group-hover:text-indigo">创建型模式</div>
              <div className="text-[12px] text-ink-muted mt-1">单例、工厂、建造者等</div>
            </a>
            <a href="/docs/09-design-patterns/behavioral-patterns" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">下一篇 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">行为型模式</div>
              <div className="text-[12px] text-ink-muted mt-1">策略、观察者、模板方法等</div>
            </a>
            <a href="/docs/06-spring-framework/spring-aop" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-orange mb-1">实际应用 →</div>
              <div className="font-semibold text-ink group-hover:text-orange">Spring AOP</div>
              <div className="text-[12px] text-ink-muted mt-1">代理模式的典型应用</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            结构型模式中，代理、装饰器、适配器是最常用的三种，建议重点掌握。阅读 Spring、MyBatis 等框架源码时，注意观察这些模式的实际应用。桥接和组合在实际项目中较少直接使用，但理解其思想有助于设计更好的架构。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
