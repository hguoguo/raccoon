import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'workflow', text: 'Function Calling 工作流', level: 2 },
  { id: 'core-tech', text: '核心技术详解', level: 2 },
  { id: 'tool-calling', text: '4.1 Tool Calling（工具调用）', level: 3 },
  { id: 'json-schema', text: '4.2 JSON Schema（工具描述）', level: 3 },
  { id: 'tool-definition', text: '4.3 工具定义（Tool Definition）', level: 3 },
  { id: 'param-validation', text: '4.4 参数校验（Parameter Validation）', level: 3 },
  { id: 'tool-routing', text: '4.5 工具路由（Tool Routing）', level: 3 },
  { id: 'error-handling', text: '4.6 工具异常处理（Error Handling）', level: 3 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function FunctionCalling({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      {/* Main Article */}
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>
      {/* 一句话定义 */}
      <section className="mb-8">
        <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          一句话定义
        </h2>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Function Calling（函数调用）是 LLM 与外部系统交互的标准化协议，允许模型根据用户意图选择并调用预定义的工具（函数），获取实时数据或执行操作，从而扩展模型的能力边界。
        </p>
      </section>

      {/* 架构图 */}
      <section className="mb-8">
        <h2 id="workflow" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          Function Calling 工作流
        </h2>
        <DiagramBlock title="完整的函数调用流程">
          <div className="text-[13px] sm:text-[14px] font-mono text-ink-muted leading-relaxed text-left space-y-2">
            <div><span className="text-rose font-semibold">① 定义工具</span> → JSON Schema 描述函数签名</div>
            <div><span className="text-teal font-semibold">② 用户请求</span> → "查询北京今天的天气"</div>
            <div><span className="text-sky font-semibold">③ LLM 决策</span> → 选择工具 + 提取参数</div>
            <div><span className="text-indigo font-semibold">④ 执行工具</span> → 调用 get_weather(city="北京")</div>
            <div><span className="text-amber font-semibold">⑤ 返回结果</span> → {"{temp: 25, condition: '晴'}"}</div>
            <div><span className="text-emerald font-semibold">⑥ 生成回答</span> → LLM 结合结果生成自然语言回复</div>
          </div>
        </DiagramBlock>
        <SideNote label="技术演进">
          Function Calling 由 OpenAI 在 2023 年 6 月首次提出，随后 Anthropic、Google 等厂商纷纷跟进。它解决了 LLM 无法访问实时数据和执行外部操作的局限性。
        </SideNote>
      </section>

      {/* 核心原理 */}
      <section className="mb-8">
        <h2 id="core-tech" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          核心技术详解
        </h2>

        <h3 id="tool-calling" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          4.1 Tool Calling（工具调用）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          Tool Calling 是 Function Calling 的通用术语。模型接收一组可用工具的声明，当用户请求需要外部数据时，模型输出工具调用指令而非直接回答。这是一个{' '}
          <span className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">two-step process</span>：
          第一步模型决定调用哪个工具，第二步基于工具返回结果生成最终答案。
        </p>
        <Playground
          code={`import openai

# 定义可用工具
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的当前天气",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "城市名称"}
                },
                "required": ["city"]
            }
        }
    }
]

# 第一轮：模型决定调用工具
messages = [{"role": "user", "content": "北京今天天气怎么样？"}]
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=messages,
    tools=tools,
    tool_choice="auto"  # 让模型自动决定是否调用
)

# 检查是否有工具调用
if response.choices[0].finish_reason == "tool_calls":
    tool_call = response.choices[0].message.tool_calls[0]
    print(f"调用工具: {tool_call.function.name}")
    print(f"参数: {tool_call.function.arguments}")`}
          language="python"
          filename="tool_calling_basic.py"
          description="基础的 Tool Calling 流程"
        />

        <h3 id="json-schema" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          4.2 JSON Schema（工具描述）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          JSON Schema 用于精确描述工具的输入参数结构，包括字段类型、必填项、取值范围、枚举值等。良好的 Schema 设计能显著提升模型调用的准确性。
        </p>
        <Playground
          code={`# 复杂的工具 Schema 示例
weather_tool_schema = {
    "type": "function",
    "function": {
        "name": "get_weather_forecast",
        "description": "获取城市未来多天的天气预报",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "城市名称，如 '北京'、'Shanghai'"
                },
                "days": {
                    "type": "integer",
                    "description": "预报天数",
                    "minimum": 1,
                    "maximum": 7,
                    "default": 3
                },
                "unit": {
                    "type": "string",
                    "description": "温度单位",
                    "enum": ["celsius", "fahrenheit"],
                    "default": "celsius"
                },
                "include_hourly": {
                    "type": "boolean",
                    "description": "是否包含小时级预报",
                    "default": False
                }
            },
            "required": ["city"],
            "additionalProperties": False  # 禁止额外字段
        }
    }
}`}
          language="python"
          filename="complex_schema.py"
          description="详细的 JSON Schema 定义"
        />
        <Callout type="tip" title="Schema 设计最佳实践">
          <ul className="list-disc list-inside space-y-1 mt-2 text-[14px] sm:text-[15px] text-ink-muted">
            <li><strong>清晰的 description：</strong>每个字段都要有明确的用途说明</li>
            <li><strong>合理的默认值：</strong>减少模型必须填写的字段数量</li>
            <li><strong>严格的约束：</strong>使用 enum、minimum/maximum 限制取值范围</li>
            <li><strong>避免歧义：</strong>字段名使用英文，避免缩写</li>
            <li><strong>分层设计：</strong>复杂对象嵌套不要超过 3 层</li>
          </ul>
        </Callout>

        <h3 id="tool-definition" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          4.3 工具定义（Tool Definition）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          在实际工程中，通常将工具封装为类或装饰器，统一管理元数据和执行逻辑。这样便于维护和扩展。
        </p>
        <Playground
          code={`from typing import Dict, Any
from dataclasses import dataclass
import json

@dataclass
class ToolDefinition:
    """工具定义"""
    name: str
    description: str
    parameters: Dict[str, Any]
    
    def to_openai_format(self) -> Dict:
        """转换为 OpenAI API 格式"""
        return {
            "type": "function",
            "function": {
                "name": self.name,
                "description": self.description,
                "parameters": self.parameters
            }
        }

# 定义工具
search_tool = ToolDefinition(
    name="web_search",
    description="搜索互联网获取最新信息",
    parameters={
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "搜索关键词"},
            "num_results": {
                "type": "integer",
                "description": "返回结果数量",
                "minimum": 1,
                "maximum": 10,
                "default": 5
            }
        },
        "required": ["query"]
    }
)

# 批量转换
tools = [search_tool.to_openai_format()]
print(json.dumps(tools, indent=2, ensure_ascii=False))`}
          language="python"
          filename="tool_definition.py"
          description="封装工具定义类"
        />

        <h3 id="param-validation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          4.4 参数校验（Parameter Validation）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          模型生成的参数可能存在错误（类型不匹配、缺少必填字段、超出范围等）。必须在执行工具前进行严格校验，避免运行时异常。
        </p>
        <ContextSwitcher
          simpleContent={
            <div>
              <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                <strong>基础校验：</strong>使用 Pydantic
              </p>
              <Playground
                code={`from pydantic import BaseModel, Field, validator
from typing import Optional

class WeatherParams(BaseModel):
    city: str = Field(..., min_length=1, max_length=100)
    days: int = Field(default=3, ge=1, le=7)
    unit: str = Field(default="celsius", pattern="^(celsius|fahrenheit)$")
    
    @validator('city')
    def validate_city(cls, v):
        # 去除首尾空格
        v = v.strip()
        if not v:
            raise ValueError('City name cannot be empty')
        return v

# 解析模型生成的参数
model_output = '{"city": " 北京 ", "days": 10}'
try:
    params = WeatherParams.parse_raw(model_output)
    print(f"✓ 校验通过: city={params.city}, days={params.days}")
except Exception as e:
    print(f"✗ 校验失败: {e}")`}
                language="python"
                filename="simple_validation.py"
              />
            </div>
          }
          hardcoreContent={
            <div>
              <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                <strong>高级校验：</strong>自定义验证器 + 业务规则
              </p>
              <Playground
                code={`from pydantic import BaseModel, Field, root_validator
from datetime import datetime, timedelta

class BookingParams(BaseModel):
    hotel_id: str
    check_in: datetime
    check_out: datetime
    guests: int = Field(ge=1, le=10)
    
    @root_validator
    def validate_dates(cls, values):
        check_in = values.get('check_in')
        check_out = values.get('check_out')
        
        if check_in and check_out:
            if check_out <= check_in:
                raise ValueError('Check-out must be after check-in')
            
            duration = (check_out - check_in).days
            if duration > 30:
                raise ValueError('Maximum stay is 30 days')
            
            if check_in < datetime.now():
                raise ValueError('Cannot book in the past')
        
        return values
    
    @root_validator
    def validate_hotel_exists(cls, values):
        hotel_id = values.get('hotel_id')
        # 模拟数据库查询
        valid_hotels = {"H001", "H002", "H003"}
        if hotel_id not in valid_hotels:
            raise ValueError(f'Hotel {hotel_id} not found')
        return values

# 测试
try:
    params = BookingParams(
        hotel_id="H001",
        check_in=datetime.now() + timedelta(days=1),
        check_out=datetime.now() + timedelta(days=3),
        guests=2
    )
    print("✓ 所有校验通过")
except Exception as e:
    print(f"✗ 校验失败: {e}")`}
                language="python"
                filename="advanced_validation.py"
              />
            </div>
          }
        />

        <h3 id="tool-routing" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          4.5 工具路由（Tool Routing）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          当有多个可用工具时，模型需要根据用户意图选择最合适的工具。这就是工具路由。可以通过工具名称、描述和参数设计来引导模型做出正确选择。
        </p>
        <Playground
          code={`# 多个工具的注册和管理
class ToolRegistry:
    """工具注册中心"""
    
    def __init__(self):
        self.tools = {}
    
    def register(self, tool_def: ToolDefinition):
        """注册工具"""
        self.tools[tool_def.name] = tool_def
    
    def get_all_tools(self) -> list:
        """获取所有工具的 OpenAI 格式"""
        return [t.to_openai_format() for t in self.tools.values()]
    
    def execute(self, tool_name: str, arguments: dict) -> Any:
        """执行指定工具"""
        if tool_name not in self.tools:
            raise ValueError(f"Unknown tool: {tool_name}")
        
        # 这里可以根据工具名分发到不同的处理函数
        if tool_name == "get_weather":
            return self._get_weather(arguments)
        elif tool_name == "web_search":
            return self._web_search(arguments)
        else:
            raise NotImplementedError(f"Tool {tool_name} not implemented")
    
    def _get_weather(self, args: dict) -> dict:
        # 实际调用天气 API
        return {"temperature": 25, "condition": "Sunny"}
    
    def _web_search(self, args: dict) -> list:
        # 实际调用搜索引擎
        return [{"title": "Result 1", "url": "..."}]

# 使用
registry = ToolRegistry()
registry.register(search_tool)
registry.register(weather_tool)

# 传递给 LLM
tools = registry.get_all_tools()`}
          language="python"
          filename="tool_routing.py"
          description="工具注册和路由管理"
        />
        <DiagramBlock title="工具路由决策流程">
          <div className="text-[13px] sm:text-[14px] font-mono text-ink-muted leading-relaxed text-left space-y-2">
            <div><span className="text-indigo font-semibold">用户输入</span> → "帮我查一下明天的航班"</div>
            <div><span className="text-teal font-semibold">意图识别 (LLM)</span> → 旅行相关 → 可能需要航班信息</div>
            <div><span className="text-sky font-semibold">工具匹配 (LLM)</span> → search_flights vs get_weather vs web_search</div>
            <div><span className="text-amber font-semibold">参数提取 (LLM)</span> → {"{from: '北京', to: '上海', date: '2024-01-01'}"}</div>
            <div><span className="text-emerald font-semibold">执行工具</span> → 调用 search_flights()</div>
          </div>
        </DiagramBlock>

        <h3 id="error-handling" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
          4.6 工具异常处理（Error Handling）
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
          工具调用可能失败（API 超时、参数错误、服务不可用等）。完善的异常处理机制能保证系统稳定性，并向用户提供友好的错误提示。
        </p>
        <Playground
          code={`import tenacity
from typing import Optional

class ToolExecutionError(Exception):
    """工具执行异常"""
    def __init__(self, tool_name: str, message: str, retryable: bool = True):
        self.tool_name = tool_name
        self.message = message
        self.retryable = retryable
        super().__init__(f"Tool '{tool_name}' failed: {message}")

def execute_tool_with_retry(
    registry: ToolRegistry,
    tool_name: str,
    arguments: dict,
    max_retries: int = 3
) -> Optional[Any]:
    """带重试机制的工具执行"""
    
    @tenacity.retry(
        stop=tenacity.stop_after_attempt(max_retries),
        wait=tenacity.wait_exponential(multiplier=1, min=2, max=10),
        retry=lambda e: isinstance(e, ToolExecutionError) and e.retryable
    )
    def _execute():
        try:
            result = registry.execute(tool_name, arguments)
            return result
        except TimeoutError as e:
            raise ToolExecutionError(
                tool_name, 
                f"Timeout: {str(e)}", 
                retryable=True
            )
        except ValueError as e:
            # 参数错误，不应重试
            raise ToolExecutionError(
                tool_name, 
                f"Invalid parameters: {str(e)}", 
                retryable=False
            )
        except Exception as e:
            raise ToolExecutionError(
                tool_name, 
                f"Unexpected error: {str(e)}", 
                retryable=True
            )
    
    try:
        return _execute()
    except ToolExecutionError as e:
        print(f"工具调用最终失败 [{e.tool_name}]: {e.message}")
        return None
    except tenacity.RetryError:
        print(f"工具调用重试 {max_retries} 次后仍失败")
        return None

# 使用
result = execute_tool_with_retry(registry, "get_weather", {"city": "北京"})
if result:
    print(f"天气信息: {result}")
else:
    print("无法获取天气信息，请稍后重试")`}
          language="python"
          filename="error_handling.py"
          description="健壮的工具异常处理机制"
        />
        <Callout type="warning" title="异常处理策略">
          <ul className="list-disc list-inside space-y-1 mt-2 text-[14px] sm:text-[15px] text-ink-muted">
            <li><strong>可重试错误：</strong>网络超时、临时服务不可用 → 指数退避重试</li>
            <li><strong>不可重试错误：</strong>参数验证失败、权限不足 → 立即返回，提示用户修正</li>
            <li><strong>Fallback 机制：</strong>主工具失败时切换到备用方案（如缓存数据）</li>
            <li><strong>优雅降级：</strong>部分功能不可用时，提供简化版回答</li>
            <li><strong>日志记录：</strong>详细记录错误上下文，便于排查问题</li>
          </ul>
        </Callout>
      </section>

      {/* 常见误区 */}
      <section className="mb-8">
        <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          常见误区
        </h2>
        <Callout type="danger" title="误区 1：工具越多越好">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            过多的工具会增加模型的决策复杂度，降低准确率。应该根据场景精选 5-10 个核心工具，而不是注册几十个工具。可以使用工具分组或分层路由来管理大量工具。
          </p>
        </Callout>
        <Callout type="danger" title="误区 2：Schema 描述越详细越好">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            过长的 description 会占用上下文窗口，增加 Token 成本。应该简洁明了地描述字段用途，关键约束通过类型和范围表达，而非冗长的文字说明。
          </p>
        </Callout>
        <Callout type="danger" title="误区 3：不需要参数校验">
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2">
            模型生成的参数可能完全错误（如日期格式不对、数值超出范围）。必须在执行工具前进行严格校验，否则会导致运行时异常或产生错误结果。校验是保障系统稳定性的关键。
          </p>
        </Callout>
      </section>

      {/* 面试真题 */}
      <section id="interview" className="mb-8">
        <InterviewSection
          questions={[
            {
              question: 'Function Calling 的工作原理是什么？模型是如何决定调用哪个工具的？',
              answer: 'Function Calling 本质上是特殊的结构化输出任务。工作流程：① 开发者定义工具列表（JSON Schema 格式）；② 将工具和用户请求一起发送给 LLM；③ 模型分析用户意图，判断是否需要调用工具；④ 如需调用，模型输出工具名称和参数（符合 Schema）；⑤ 客户端解析调用指令，执行实际函数；⑥ 将结果返回给模型；⑦ 模型基于结果生成最终回答。模型通过对比用户请求和工具描述（name + description）来决定调用哪个工具。',
            },
            {
              question: '如何设计一个健壮的 Function Calling 系统？',
              answer: '关键设计要点：① 工具定义清晰（准确的 name 和 description）；② Schema 严格约束（类型、范围、必填项）；③ 参数校验完善（Pydantic validator）；④ 异常处理健壮（重试、fallback、降级）；⑤ 日志监控齐全（记录每次调用详情）；⑥ 限流保护（防止滥用）；⑦ 安全审查（敏感操作需确认）；⑧ 性能优化（缓存常用结果）。',
            },
            {
              question: 'Tool Calling 和 ReAct 有什么区别？',
              answer: 'Tool Calling 是单轮决策：模型一次性选择工具并提取参数，执行后再生成回答；ReAct 是多轮迭代：模型交替进行思考（Thought）、行动（Action）、观察（Observation），可以连续调用多个工具。Tool Calling 适合简单明确的任务，ReAct 适合复杂需要多步推理的场景。两者可以结合使用。',
            },
            {
              question: '如何处理工具调用失败的情况？',
              answer: '完整策略：① 分类错误类型（可重试 vs 不可重试）；② 指数退避重试（针对临时故障）；③ Fallback 机制（备用工具或缓存数据）；④ 优雅降级（返回部分信息或提示用户）；⑤ 详细日志记录（便于后续分析）；⑥ 告警通知（严重错误及时通知开发团队）；⑦ 用户友好提示（避免暴露技术细节）。',
            },
            {
              question: 'Function Calling 的安全性考虑有哪些？',
              answer: '安全风险和防护：① 注入攻击（恶意参数）→ 严格校验和 sanitization；② 越权操作（调用未授权工具）→ 权限控制和审计；③ 敏感数据泄露（工具返回包含隐私）→ 结果过滤和脱敏；④ 资源滥用（频繁调用消耗配额）→ 限流和配额管理；⑤ 恶意工具执行（如删除文件）→ 沙箱环境和白名单机制；⑥ Prompt 注入（绕过工具限制）→ 输入隔离和安全层。',
            },
          ]}
        />
      </section>

      {/* 知识关联 */}
      <section className="mb-8">
        <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
          知识关联
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-parchment-soft rounded-paper-md border border-border">
            <h4 className="font-semibold text-ink mb-2">← Structured Output</h4>
            <p className="text-[13px] text-ink-muted">Function Calling 依赖结构化输出传递参数</p>
          </div>
          <div className="p-4 bg-parchment-soft rounded-paper-md border border-border">
            <h4 className="font-semibold text-ink mb-2">→ Agent Architecture</h4>
            <p className="text-[13px] text-ink-muted">学习如何组合多个工具构建智能代理</p>
          </div>
        </div>
      </section>

      <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* Sidebar TOC */}
      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
