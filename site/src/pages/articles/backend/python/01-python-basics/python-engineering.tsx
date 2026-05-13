import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'pip', text: '一、pip 包管理', level: 2 },
  { id: 'uv', text: '二、uv 现代工具', level: 2 },
  { id: 'venv', text: '三、虚拟环境', level: 2 },
  { id: 'logging', text: '四、日志系统', level: 2 },
  { id: 'dotenv', text: '五、dotenv 配置', level: 2 },
  { id: 'yaml', text: '六、YAML 配置', level: 2 },
  { id: 'pytest', text: '七、pytest 单元测试', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function PythonEngineering({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      {/* Main Article */}
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Python 工程化是指通过<strong className="text-accent">标准化的依赖管理、环境隔离、配置管理、测试框架和日志系统</strong>，
              构建可维护、可扩展、可部署的生产级 Python 项目的最佳实践集合。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要工程化？">
            小型脚本可以随意编写，但大型项目必须考虑依赖版本锁定、环境隔离、配置分离、自动化测试等工程化要素，否则会导致"在我机器上能运行"的困境。
          </Callout>

          {/* ========== 一、pip 包管理 ========== */}
          <h2 id="pip" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、pip 包管理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            pip 是 Python 官方推荐的包管理工具，用于安装、升级和管理第三方库。它从 PyPI（Python Package Index）下载包。
          </p>

          <Playground
            code={`# 安装包
pip install requests
pip install numpy==1.24.3  # 指定版本
pip install "flask>=2.0,<3.0"  # 版本范围

# 查看已安装的包
pip list
pip show requests

# 导出依赖清单
pip freeze > requirements.txt

# 从文件安装依赖
pip install -r requirements.txt

# 卸载包
pip uninstall requests

# 升级 pip 自身
pip install --upgrade pip`}
            language="bash"
            highlights={[2, 9, 13]}
            filename="terminal"
            description="pip 常用命令"
          />

          <SideNote label="requirements.txt 格式">
            requirements.txt 是传统的依赖声明文件，每行一个包，可以指定版本号。但它无法表达复杂的依赖关系（如可选依赖、开发依赖），因此现代项目更倾向于使用 pyproject.toml。
          </SideNote>

          <Callout type="warning" title="pip 的局限性">
            pip 只能管理包的安装，不能解决依赖冲突、锁定传递依赖的版本、管理 Python 版本等问题。这些问题由 Poetry、Pipenv、uv 等现代工具更好地解决。
          </Callout>

          {/* ========== 二、uv 现代工具 ========== */}
          <h2 id="uv" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、uv — 极速 Python 包管理器
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            uv 是由 Astral 开发的新一代 Python 包管理器和项目管理工具，用 Rust 编写，速度比 pip 快 10-100 倍。它集成了包安装、虚拟环境管理、项目初始化等功能。
          </p>

          <Playground
            code={`# 安装 uv（推荐方式）
curl -LsSf https://astral.sh/uv/install.sh | sh

# 初始化新项目
uv init my-project
cd my-project

# 添加依赖（自动创建虚拟环境）
uv add requests flask
uv add pytest --dev  # 开发依赖

# 运行脚本（自动激活虚拟环境）
uv run python main.py

# 同步依赖（根据 pyproject.toml 安装）
uv sync

# 查看依赖树
uv tree

# 锁定依赖版本（生成 uv.lock）
uv lock

# 更新依赖
uv update requests`}
            language="bash"
            highlights={[6, 10, 14, 21]}
            filename="terminal"
            description="uv 工作流示例"
          />

          <ContextSwitcher
            simpleContent={
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <p className="text-[14px] leading-[1.8] text-ink-muted mb-3">
                  <strong>uv vs pip 对比：</strong>
                </p>
                <ul className="list-disc list-inside text-[14px] leading-[1.8] text-ink-muted space-y-2">
                  <li>速度：uv 快 10-100 倍（Rust 实现 + 全局缓存）</li>
                  <li>功能：uv 集成项目管理，pip 只管安装包</li>
                  <li>锁文件：uv 自动生成 uv.lock，pip 需手动 freeze</li>
                  <li>兼容性：uv 完全兼容 pip，可替代 pip 使用</li>
                </ul>
              </div>
            }
            hardcoreContent={
              <div className="bg-parchment-light border border-border rounded-paper-md p-4">
                <p className="text-[14px] leading-[1.8] text-ink-muted mb-3">
                  <strong>uv 技术细节：</strong>
                </p>
                <ul className="list-disc list-inside text-[14px] leading-[1.8] text-ink-muted space-y-2">
                  <li>使用 HTTP range requests 并行下载 wheel 文件</li>
                  <li>全局包缓存（~/.cache/uv），避免重复下载</li>
                  <li>硬链接或 reflink 复制包到虚拟环境，节省磁盘空间</li>
                  <li>支持 PEP 508 依赖说明符和 PEP 621 pyproject.toml</li>
                  <li>内置依赖解析器，解决版本冲突</li>
                </ul>
              </div>
            }
          />

          <SideNote label="pyproject.toml">
            现代 Python 项目使用 pyproject.toml 作为统一的项目配置文件（PEP 621），取代 setup.py 和 requirements.txt。它声明项目元数据、依赖、构建后端等信息。
          </SideNote>

          {/* ========== 三、虚拟环境 ========== */}
          <h2 id="venv" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、虚拟环境（Virtual Environment）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            虚拟环境为每个项目创建隔离的 Python 环境，避免不同项目的依赖版本冲突。Python 3.3+ 内置 venv 模块，也可使用 virtualenv、conda 或 uv。
          </p>

          <Playground
            code={`# 使用 venv 创建虚拟环境
python -m venv .venv

# 激活虚拟环境
# macOS/Linux
source .venv/bin/activate
# Windows
.venv\\Scripts\\activate

# 退出虚拟环境
deactivate

# 在虚拟环境中安装包
pip install requests

# 查看当前环境的包
pip list

# 使用 virtualenv（功能更丰富）
pip install virtualenv
virtualenv myenv

# 使用 conda（适合数据科学）
conda create -n myenv python=3.11
conda activate myenv

# 使用 uv（最快）
uv venv .venv
uv sync  # 根据 pyproject.toml 安装依赖`}
            language="bash"
            highlights={[2, 6, 11, 25]}
            filename="terminal"
            description="虚拟环境管理命令"
          />

          <Callout type="danger" title="不要污染全局环境">
            永远不要在全局 Python 环境中安装包（除非是工具类包如 black、flake8）。每个项目都应该有独立的虚拟环境，否则会出现依赖版本冲突，导致"在我机器上能运行"的问题。
          </Callout>

          <DiagramBlock title="虚拟环境隔离原理">
            <pre className="text-left text-[12px] sm:text-[13px] font-mono text-ink-muted leading-[1.6] whitespace-pre">
{`全局 Python
├── /usr/bin/python3 (系统 Python)
└── ~/.local/lib/python3.11/site-packages (全局包)

项目 A (.venv)
├── bin/python → 指向系统 Python
└── lib/python3.11/site-packages (项目 A 专属包)
    ├── requests==2.31.0
    └── flask==3.0.0

项目 B (.venv)
├── bin/python → 指向系统 Python
└── lib/python3.11/site-packages (项目 B 专属包)
    ├── requests==2.28.0  ← 不同版本！
    └── django==4.2.0`}
            </pre>
          </DiagramBlock>

          {/* ========== 四、日志系统 ========== */}
          <h2 id="logging" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、日志系统（logging）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Python 内置 logging 模块提供灵活的日志记录功能，支持多级别、多输出目标、格式化、过滤等。生产环境应使用 logging 而非 print。
          </p>

          <Playground
            code={`import logging
import sys

# 基础配置
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    handlers=[
        logging.StreamHandler(sys.stdout),  # 控制台输出
        logging.FileHandler('app.log')       # 文件输出
    ]
)

# 创建 logger
logger = logging.getLogger(__name__)

# 不同级别的日志
logger.debug("调试信息")
logger.info("一般信息")
logger.warning("警告信息")
logger.error("错误信息")
logger.critical("严重错误")

# 高级配置（推荐）
def setup_logger(name: str, log_file: str, level=logging.INFO):
    """配置结构化 logger"""
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    # 文件处理器
    file_handler = logging.FileHandler(log_file)
    file_handler.setLevel(level)
    
    # 控制台处理器
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.WARNING)  # 控制台只输出警告以上
    
    # 格式化器
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s'
    )
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)
    
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    
    return logger

# 使用
logger = setup_logger('my_app', 'app.log')
logger.info("应用启动")`}
            language="python"
            highlights={[5, 20, 27]}
            filename="logging_example.py"
            description="Python logging 配置示例"
          />

          <SideNote label="日志级别">
            日志级别从低到高：DEBUG {'<'} INFO {'<'} WARNING {'<'} ERROR {'<'} CRITICAL。生产环境通常设置为 INFO 或 WARNING，开发环境使用 DEBUG。
          </SideNote>

          <Callout type="info" title="结构化日志">
            现代应用推荐使用结构化日志（JSON 格式），便于日志聚合和分析。可以使用 <code className="font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]">python-json-logger</code> 库将日志输出为 JSON 格式。
          </Callout>

          {/* ========== 五、dotenv 配置 ========== */}
          <h2 id="dotenv" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、dotenv 配置管理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            dotenv 用于管理环境变量，将敏感配置（API Key、数据库密码等）从代码中分离出来，存储在 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">.env</code> 文件中。
          </p>

          <Playground
            code={`# .env 文件（不要提交到 Git！）
DATABASE_URL=postgresql://user:pass@localhost/mydb
SECRET_KEY=my-secret-key-12345
API_KEY=sk-xxxxxxxxxxxxx
DEBUG=true
PORT=8000

# .env.example（提交到 Git，作为模板）
DATABASE_URL=postgresql://user:pass@localhost/mydb
SECRET_KEY=your-secret-key-here
API_KEY=your-api-key-here
DEBUG=false
PORT=8000

# Python 代码读取 .env
from dotenv import load_dotenv
import os

# 加载 .env 文件
load_dotenv()

# 读取环境变量
database_url = os.getenv("DATABASE_URL")
secret_key = os.getenv("SECRET_KEY")
debug = os.getenv("DEBUG", "false").lower() == "true"
port = int(os.getenv("PORT", "8000"))

# 带默认值和类型转换
def get_config(key: str, default: str = None, cast_type: type = str):
    value = os.getenv(key, default)
    if value is None:
        return default
    return cast_type(value)

# 使用
db_url = get_config("DATABASE_URL", cast_type=str)
port = get_config("PORT", default="8000", cast_type=int)`}
            language="python"
            highlights={[1, 16, 22, 29]}
            filename="config_example.py"
            description="dotenv 配置管理示例"
          />

          <Callout type="danger" title="安全警告">
            <strong>.env 文件绝对不能提交到 Git！</strong>应该在 <code className="font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]">.gitignore</code> 中添加 <code className="font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]">.env</code>。同时提供 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">.env.example</code> 作为模板，不包含真实密钥。
          </Callout>

          <SideNote label="安装 python-dotenv">
            安装命令：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">pip install python-dotenv</code> 或 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">uv add python-dotenv</code>
          </SideNote>

          {/* ========== 六、YAML 配置 ========== */}
          <h2 id="yaml" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、YAML 配置文件
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            YAML 是一种人类可读的数据序列化格式，常用于配置文件（如 Docker Compose、Kubernetes、CI/CD）。相比 JSON，YAML 更简洁且支持注释。
          </p>

          <Playground
            code={`# config.yaml 示例
app:
  name: "My Application"
  version: "1.0.0"
  debug: false

server:
  host: "0.0.0.0"
  port: 8000
  workers: 4

database:
  driver: "postgresql"
  host: "localhost"
  port: 5432
  name: "mydb"
  credentials:
    username: "admin"
    password: "${'{DB_PASSWORD}'}"  # 从环境变量读取

logging:
  level: "INFO"
  handlers:
    - type: "console"
      format: "%(asctime)s - %(levelname)s - %(message)s"
    - type: "file"
      filename: "app.log"
      max_size: "10MB"
      backup_count: 5

features:
  enable_cache: true
  cache_ttl: 3600
  allowed_origins:
    - "http://localhost:3000"
    - "https://example.com"`}
            language="yaml"
            highlights={[1, 12, 21]}
            filename="config.yaml"
            description="YAML 配置文件示例"
          />

          <Playground
            code={`import yaml
import os

def load_config(config_path: str = "config.yaml") -> dict:
    """加载 YAML 配置文件"""
    with open(config_path, 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)  # 使用 safe_load 避免安全风险
    
    # 替换环境变量占位符
    def replace_env_vars(obj):
        if isinstance(obj, str):
            if obj.startswith("${") and obj.endswith("}"):
                env_var = obj[2:-1]
                return os.getenv(env_var, obj)
            return obj
        elif isinstance(obj, dict):
            return {k: replace_env_vars(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [replace_env_vars(item) for item in obj]
        return obj
    
    return replace_env_vars(config)

# 使用
config = load_config()
print(config["app"]["name"])  # "My Application"
print(config["server"]["port"])  # 8000
print(config["database"]["credentials"]["password"])  # 从环境变量读取

# 访问嵌套配置（使用点号路径）
def get_nested(config: dict, path: str, default=None):
    keys = path.split(".")
    value = config
    for key in keys:
        if isinstance(value, dict):
            value = value.get(key, default)
        else:
            return default
    return value

db_host = get_nested(config, "database.host")
cache_ttl = get_nested(config, "features.cache_ttl", default=300)`}
            language="python"
            highlights={[4, 7, 26, 33]}
            filename="yaml_loader.py"
            description="YAML 配置加载器"
          />

          <Callout type="warning" title="安全提示">
            始终使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">yaml.safe_load()</code> 而非 <code className="font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]">yaml.load()</code>，后者可能执行任意 Python 代码，存在安全风险。
          </Callout>

          <SideNote label="安装 PyYAML">
            安装命令：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">pip install pyyaml</code> 或 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">uv add pyyaml</code>
          </SideNote>

          {/* ========== 七、pytest 单元测试 ========== */}
          <h2 id="pytest" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、pytest 单元测试
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            pytest 是 Python 最流行的测试框架，比内置 unittest 更简洁、功能更强大。支持 fixture、参数化测试、插件生态等高级特性。
          </p>

          <Playground
            code={`# tests/test_calculator.py
import pytest

# 被测函数
def add(a: float, b: float) -> float:
    return a + b

def divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# 基本测试
def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0

# 参数化测试（重要！）
@pytest.mark.parametrize("a, b, expected", [
    (2, 3, 5),
    (-1, 1, 0),
    (0, 0, 0),
    (1.5, 2.5, 4.0),
])
def test_add_parametrized(a, b, expected):
    assert add(a, b) == expected

# 异常测试
def test_divide_by_zero():
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)

# Fixture（测试夹具）
@pytest.fixture
def sample_data():
    return {"users": ["Alice", "Bob", "Charlie"]}

def test_sample_data(sample_data):
    assert len(sample_data["users"]) == 3
    assert "Alice" in sample_data["users"]

# Fixture 的作用域
@pytest.fixture(scope="module")
def db_connection():
    """整个模块共享一个数据库连接"""
    conn = create_database_connection()
    yield conn
    conn.close()  # 清理资源

# 跳过测试
@pytest.mark.skip(reason="暂未实现")
def test_future_feature():
    pass

# 条件跳过
@pytest.mark.skipif(pytest.__version__ < "7.0", reason="需要 pytest 7.0+")
def test_new_feature():
    pass`}
            language="python"
            highlights={[14, 20, 30, 36]}
            filename="test_calculator.py"
            description="pytest 测试示例"
          />

          <Playground
            code={`# conftest.py（pytest 自动发现的配置文件）
import pytest

# 全局 Fixture
@pytest.fixture
def temp_dir(tmp_path):
    """创建临时目录"""
    return tmp_path

# 命令行参数
def pytest_addoption(parser):
    parser.addoption(
        "--slow", action="store_true", default=False, help="运行慢速测试"
    )

def pytest_configure(config):
    config.addinivalue_line("markers", "slow: 标记为慢速测试")

# 测试覆盖率配置（pyproject.toml）
# [tool.pytest.ini_options]
# addopts = "-v --cov=src --cov-report=html"
# testpaths = ["tests"]
# python_files = ["test_*.py"]
# python_classes = ["Test*"]
# python_functions = ["test_*"]`}
            language="python"
            highlights={[2, 11, 20]}
            filename="conftest.py"
            description="pytest 配置文件"
          />

          <Playground
            code={`# 运行测试的命令
# 运行所有测试
pytest

#  verbose 模式（显示详细信息）
pytest -v

# 运行特定测试文件
pytest tests/test_calculator.py

# 运行特定测试函数
pytest tests/test_calculator.py::test_add

# 显示打印输出
pytest -s

# 停止在第一个失败
pytest -x

# 显示最慢的 10 个测试
pytest --durations=10

# 生成覆盖率报告
pytest --cov=src --cov-report=html

# 并行执行测试（需要 pytest-xdist）
pytest -n auto

# 只运行标记的测试
pytest -m "not slow"

# 重新运行失败的测试（需要 pytest-rerunfailures）
pytest --reruns 3 --reruns-delay 1`}
            language="bash"
            highlights={[2, 6, 10, 20]}
            filename="terminal"
            description="pytest 运行命令"
          />

          <Callout type="tip" title="pytest 优势">
            <ul className="list-disc list-inside text-[13px] leading-[1.7] space-y-1">
              <li>无需继承类，直接写函数即可</li>
              <li>assert 语句即可断言，无需 self.assertEqual</li>
              <li>fixture 机制灵活，支持依赖注入</li>
              <li>丰富的插件生态（coverage、mock、asyncio 等）</li>
              <li>自动发现测试文件，无需手动注册</li>
            </ul>
          </Callout>

          <SideNote label="安装 pytest">
            安装命令：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">pip install pytest pytest-cov</code> 或 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">uv add pytest pytest-cov --dev</code>
          </SideNote>

          {/* ========== 八、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区1：在生产环境使用 print 调试">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] mb-2">
              <strong>错误做法：</strong>
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm mb-3 overflow-x-auto">
              <code className="text-[12px] sm:text-[13px] font-mono text-ink-muted">
{`print("Debug:", data)
print("Error occurred!")`}
              </code>
            </pre>
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <strong>问题：</strong>print 无法控制输出级别、格式、目标，生产环境难以管理。<br/>
              <strong>正确做法：</strong>使用 logging 模块，配置不同级别和输出目标。
            </p>
          </Callout>

          <Callout type="danger" title="误区2：将 .env 文件提交到 Git">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] mb-2">
              <strong>风险：</strong>.env 文件包含敏感信息（API Key、数据库密码），提交到 Git 会泄露密钥。
            </p>
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <strong>正确做法：</strong>在 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">.gitignore</code> 中添加 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">.env</code>，提供 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">.env.example</code> 作为模板。使用密钥管理服务（如 AWS Secrets Manager、HashiCorp Vault）管理生产环境密钥。
            </p>
          </Callout>

          <Callout type="danger" title="误区3：不使用虚拟环境">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] mb-2">
              <strong>错误做法：</strong>在全局 Python 环境中安装所有项目的依赖。
            </p>
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <strong>问题：</strong>不同项目可能需要同一库的不同版本，导致冲突。<br/>
              <strong>正确做法：</strong>每个项目使用独立的虚拟环境（.venv），通过 pyproject.toml 或 requirements.txt 锁定依赖版本。
            </p>
          </Callout>

          <Callout type="warning" title="误区4：测试覆盖率为 100% 就是好代码">
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              高覆盖率不代表测试质量好。应该关注测试是否覆盖了边界条件、异常路径、业务逻辑，而不是盲目追求数字。80% 的有效覆盖率通常比 100% 的无效覆盖率更有价值。
            </p>
          </Callout>

          {/* ========== 九、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "pip 和 pipenv、poetry、uv 有什么区别？",
              answer: "pip 是基础的包安装工具，只能安装包；pipenv 结合了 pip 和 virtualenv，提供 Pipfile 和 Pipfile.lock；Poetry 是完整的项目管理和打包工具，使用 pyproject.toml；uv 是新一代极速工具，用 Rust 编写，兼容 pip 并集成项目管理功能。推荐新项目使用 uv 或 Poetry。"
            },
            {
              question: "什么是虚拟环境？为什么需要它？",
              answer: "虚拟环境是为每个项目创建的隔离 Python 环境，包含独立的 Python 解释器和 site-packages 目录。它可以避免不同项目的依赖版本冲突，确保项目在任何机器上都能复现相同的环境。常用工具包括 venv、virtualenv、conda、uv。"
            },
            {
              question: "Python logging 模块的级别有哪些？如何配置？",
              answer: "日志级别从低到高：DEBUG < INFO < WARNING < ERROR < CRITICAL。配置时使用 logging.basicConfig() 或创建 Logger、Handler、Formatter 对象。可以为不同 Handler 设置不同级别（如文件记录 DEBUG，控制台只显示 WARNING 以上）。生产环境建议使用 JSON 格式的结构化日志。"
            },
            {
              question: "如何管理 Python 项目的敏感配置（如 API Key）？",
              answer: "使用环境变量和 .env 文件管理敏感配置。步骤：1) 安装 python-dotenv；2) 创建 .env 文件存储密钥；3) 在 .gitignore 中排除 .env；4) 提供 .env.example 作为模板；5) 代码中使用 os.getenv() 读取。生产环境应使用密钥管理服务（AWS Secrets Manager、HashiCorp Vault）。"
            },
            {
              question: "pytest 相比 unittest 有什么优势？",
              answer: "pytest 优势：1) 语法简洁，无需继承类，直接写函数；2) 使用 assert 断言，失败时显示详细差异；3) fixture 机制灵活，支持依赖注入和作用域控制；4) 丰富的插件生态（coverage、mock、asyncio、xdist 等）；5) 自动发现测试文件；6) 支持参数化测试、标记、跳过等高级功能。"
            },
            {
              question: "什么是 fixture？如何在 pytest 中使用？",
              answer: "fixture 是 pytest 的测试夹具，用于准备测试前置条件和清理后置资源。使用 @pytest.fixture 装饰器定义，通过函数参数注入。支持作用域（function、class、module、session）、yield 清理、参数化等。例如：@pytest.fixture def db_connection(): conn = connect(); yield conn; conn.close()"
            },
            {
              question: "如何实现 Python 项目的依赖锁定？",
              answer: "依赖锁定确保在不同环境中安装完全相同的依赖版本。方法：1) pip freeze > requirements.txt（简单但不精确）；2) Poetry 的 poetry.lock；3) Pipenv 的 Pipfile.lock；4) uv 的 uv.lock。锁定文件记录了所有直接和间接依赖的精确版本、哈希值，确保可复现性。"
            }
          ]} />

          {/* ========== 十、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            掌握 Python 工程化后，建议继续学习以下内容：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
            <a href="/docs/04-fastapi/fastapi" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">Web 框架</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">FastAPI 深度解析</div>
              <div className="text-[13px] text-ink-muted mt-1">路由、依赖注入、异步</div>
            </a>
            <a href="/docs/python-ci-cd/github-actions" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">CI/CD</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">GitHub Actions</div>
              <div className="text-[13px] text-ink-muted mt-1">自动化测试、构建、部署</div>
            </a>
            <a href="/docs/python-docker/docker-basics" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">容器化</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">Docker 基础</div>
              <div className="text-[13px] text-ink-muted mt-1">镜像、容器、Dockerfile</div>
            </a>
            <a href="/docs/python-monitoring/prometheus" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">监控</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">Prometheus 监控</div>
              <div className="text-[13px] text-ink-muted mt-1">指标采集、告警、可视化</div>
            </a>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC Sidebar */}
      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
