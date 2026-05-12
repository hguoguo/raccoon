import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import SideNote from '../../components/knowledge/SideNote'
import SmartTOC from '../../components/knowledge/SmartTOC'
import Callout from '../../components/ui/Callout'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'basemodel', text: '一、BaseModel 核心概念', level: 2 },
  { id: 'field-definition', text: '二、字段定义', level: 2 },
  { id: 'validation', text: '三、字段校验', level: 2 },
  { id: 'json-schema', text: '四、JSON Schema 生成', level: 2 },
  { id: 'serialization', text: '五、数据序列化', level: 2 },
  { id: 'deserialization', text: '六、数据反序列化', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function PydanticDeepDive({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      {/* Main Article */}
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          {/* ========== 一句话定义 ========== */}
          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              Pydantic 是一个基于 Python 类型标注的<strong className="text-accent">数据验证和设置管理库</strong>，
              通过 BaseModel 类实现运行时数据校验、自动类型转换、JSON Schema 生成和序列化/反序列化功能，
              是 FastAPI 等现代 Python Web 框架的核心依赖。
            </p>
          </blockquote>

          <Callout type="tip" title="核心价值">
            Pydantic 将静态类型检查的优势延伸到运行时，确保外部输入数据符合预期结构，避免 "垃圾进、垃圾出" 的问题，
            同时提供清晰的错误提示，大幅提升开发效率和代码健壮性。
          </Callout>

          {/* ========== 一、BaseModel 核心概念 ========== */}
          <h2 id="basemodel" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、BaseModel 核心概念
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">BaseModel</code> 是 Pydantic 的核心类，所有数据模型都应继承自它。
            通过类型标注定义字段，Pydantic 会在实例化时自动验证和转换数据。
          </p>

          <Playground
            code={`from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# 定义数据模型
class User(BaseModel):
    id: int
    name: str
    email: str
    age: Optional[int] = None
    created_at: datetime = None
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# 自动验证和类型转换
user_data = {
    "id": "123",           # 字符串会自动转为 int
    "name": "Alice",
    "email": "alice@example.com",
    "age": "25",           # 字符串会自动转为 int
    "created_at": "2024-01-01T12:00:00"
}

user = User(**user_data)
print(user.id)             # 123 (int)
print(user.age)            # 25 (int)
print(user.created_at)     # datetime 对象
print(type(user.id))       # <class 'int'>

# 验证失败会抛出 ValidationError
try:
    invalid_user = User(id="abc", name="Bob", email="bob@example.com")
except Exception as e:
    print(f"验证错误: {e}")`}
            language="python"
            highlights={[6, 20, 30]}
            filename="basemodel_basic.py"
            description="BaseModel 基础用法示例"
          />

          <SideNote label="Pydantic V2 变化">
            Pydantic V2（2023年发布）使用 Rust 重写核心逻辑，性能提升 5-50 倍。V2 中 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">Config</code> 类改为使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">model_config</code>，配置方式更加灵活。
          </SideNote>

          <Callout type="info" title="自动类型转换规则">
            Pydantic 会尝试智能转换数据类型：字符串数字 → int/float、ISO 格式字符串 → datetime、列表 → set/tuple 等。
            如果转换失败则抛出 <code className="font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]">ValidationError</code>。
          </Callout>

          {/* ========== 二、字段定义 ========== */}
          <h2 id="field-definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、字段定义
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Pydantic 提供 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Field</code> 函数来自定义字段的默认值、校验规则、描述信息等。
          </p>

          <Playground
            code={`from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"
    GUEST = "guest"

class Product(BaseModel):
    # 必填字段，带描述
    name: str = Field(..., description="产品名称", min_length=1, max_length=100)
    
    # 可选字段，带默认值
    price: float = Field(0.0, ge=0, description="价格（必须 >= 0）")
    
    # 使用 gt/lt 指定范围
    stock: int = Field(ge=0, le=10000, description="库存数量")
    
    # 列表字段
    tags: List[str] = Field(default_factory=list, max_items=10)
    
    # 枚举字段
    role: UserRole = Field(UserRole.USER, description="用户角色")
    
    # 正则表达式校验
    sku: str = Field(..., pattern=r'^[A-Z]{3}-\d{4}$', description="SKU 编码")
    
    # 弃用字段
    old_field: Optional[str] = Field(None, deprecated=True)

# 创建实例
product = Product(
    name="iPhone 15",
    price=7999.0,
    stock=100,
    tags=["electronics", "phone"],
    sku="IPH-1234"
)

print(product.name)    # iPhone 15
print(product.role)    # UserRole.USER
print(product.tags)    # ['electronics', 'phone']

# 获取字段信息
print(Product.model_fields['name'].description)  # "产品名称"
print(Product.model_fields['price'].default)     # 0.0`}
            language="python"
            highlights={[12, 15, 18]}
            filename="field_definition.py"
            description="Field 高级用法示例"
          />

          <SideNote label="Field 参数速查">
            常用参数：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">default/default_factory</code>（默认值）、
            <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">ge/gt/le/lt</code>（数值范围）、
            <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">min_length/max_length</code>（字符串长度）、
            <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">pattern</code>（正则）、
            <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">description</code>（文档说明）。
          </SideNote>

          {/* ========== 三、字段校验 ========== */}
          <h2 id="validation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、字段校验
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Pydantic 支持多种校验方式：内置校验器、自定义校验器、模型级别校验器，以及字段间的关联校验。
          </p>

          <Playground
            code={`from pydantic import BaseModel, Field, field_validator, model_validator
from typing import Optional
from datetime import date

class Employee(BaseModel):
    name: str = Field(..., min_length=2)
    email: str
    age: int = Field(ge=18, le=120)
    hire_date: date
    salary: float = Field(ge=0)
    bonus: Optional[float] = None
    
    # 字段级别校验器（V2 新语法）
    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        if '@' not in v:
            raise ValueError('无效的邮箱地址')
        return v.lower()
    
    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        if not v.strip():
            raise ValueError('姓名不能为空')
        return v.strip().title()
    
    # 模型级别校验器（多字段关联校验）
    @model_validator(mode='after')
    def validate_salary_bonus(self):
        if self.bonus and self.bonus > self.salary * 0.5:
            raise ValueError('奖金不能超过工资的50%')
        if self.hire_date > date.today():
            raise ValueError('入职日期不能是未来')
        return self
    
    # 使用前校验器（V2 新语法）
    @field_validator('salary', mode='before')
    @classmethod
    def convert_salary(cls, v):
        if isinstance(v, str):
            return float(v.replace(',', ''))
        return v

# 测试校验
emp = Employee(
    name="alice johnson",
    email="ALICE@Example.COM",
    age=30,
    hire_date="2023-01-15",
    salary="15,000.50",  # 字符串自动转换
    bonus=5000.0
)

print(emp.name)      # "Alice Johnson"（自动格式化）
print(emp.email)     # "alice@example.com"（转小写）
print(emp.salary)    # 15000.5（字符串转换）

# 校验失败示例
try:
    invalid_emp = Employee(
        name="A",           # 太短
        email="invalid",    # 无效邮箱
        age=15,             # 未成年
        hire_date="2025-01-01",
        salary=-1000        # 负数
    )
except Exception as e:
    print(f"验证错误:\\n{e}")`}
            language="python"
            highlights={[14, 27, 35]}
            filename="validation.py"
            description="Pydantic 校验器完整示例"
          />

          <Callout type="warning" title="V1 vs V2 校验器语法">
            Pydantic V1 使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">@validator</code> 装饰器，V2 改为 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">@field_validator</code> 和 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">@model_validator</code>，
            并且必须声明为 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">@classmethod</code>。
          </Callout>

          {/* ========== 四、JSON Schema 生成 ========== */}
          <h2 id="json-schema" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、JSON Schema 生成
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Pydantic 可以自动生成 JSON Schema，用于 API 文档、前端表单验证、数据契约等场景。FastAPI 就是利用此特性自动生成 OpenAPI 文档。
          </p>

          <Playground
            code={`from pydantic import BaseModel, Field
from typing import List, Optional
import json

class Address(BaseModel):
    street: str = Field(..., description="街道地址")
    city: str = Field(..., description="城市")
    zipcode: str = Field(..., pattern=r'^\\d{6}$', description="邮政编码")

class Customer(BaseModel):
    """客户信息模型"""
    id: int = Field(..., description="客户ID", gt=0)
    name: str = Field(..., description="客户姓名", min_length=2, max_length=50)
    email: str = Field(..., description="电子邮箱")
    age: Optional[int] = Field(None, description="年龄", ge=0, le=150)
    addresses: List[Address] = Field(default_factory=list, description="地址列表")
    vip: bool = Field(False, description="是否为VIP客户")
    
    class Config:
        title = "Customer Model"
        description = "完整的客户信息模型"

# 生成 JSON Schema
schema = Customer.model_json_schema()
print(json.dumps(schema, indent=2, ensure_ascii=False))

# 输出示例：
# {
#   "title": "Customer Model",
#   "description": "完整的客户信息模型",
#   "type": "object",
#   "properties": {
#     "id": {
#       "title": "Id",
#       "description": "客户ID",
#       "type": "integer",
#       "exclusiveMinimum": 0
#     },
#     "name": {
#       "title": "Name",
#       "description": "客户姓名",
#       "type": "string",
#       "minLength": 2,
#       "maxLength": 50
#     },
#     ...
#   },
#   "required": ["id", "name", "email"]
# }

# 生成简化版 Schema（仅字段定义）
simple_schema = Customer.model_json_schema(mode='serialization')
print(json.dumps(simple_schema, indent=2))`}
            language="python"
            highlights={[24, 27]}
            filename="json_schema.py"
            description="JSON Schema 生成示例"
          />

          <SideNote label="Schema 应用场景">
            JSON Schema 可用于：1) FastAPI 自动生成 Swagger UI 文档；2) 前端动态表单生成；3) 数据契约验证；
            4) API Mock 数据生成；5) 数据库迁移脚本生成。
          </SideNote>

          {/* ========== 五、数据序列化 ========== */}
          <h2 id="serialization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、数据序列化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Pydantic 模型可以轻松转换为字典、JSON 字符串等格式，支持自定义序列化逻辑、排除字段、嵌套模型处理等。
          </p>

          <Playground
            code={`from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional
import json

class Comment(BaseModel):
    id: int
    content: str
    created_at: datetime

class Article(BaseModel):
    id: int
    title: str
    content: str
    author: str
    tags: List[str] = Field(default_factory=list)
    comments: List[Comment] = Field(default_factory=list)
    published: bool = False
    metadata: Optional[dict] = None
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.strftime('%Y-%m-%d %H:%M:%S')
        }

# 创建嵌套模型实例
article = Article(
    id=1,
    title="Pydantic 教程",
    content="这是一篇关于 Pydantic 的文章",
    author="Alice",
    tags=["python", "pydantic"],
    comments=[
        Comment(id=1, content="很好！", created_at=datetime.now()),
        Comment(id=2, content="学到了", created_at=datetime.now())
    ],
    published=True,
    metadata={"views": 1000, "likes": 50}
)

# 方法1：转换为字典
article_dict = article.model_dump()
print(article_dict['title'])        # "Pydantic 教程"
print(article_dict['comments'][0]['content'])  # "很好！"

# 方法2：转换为 JSON 字符串
article_json = article.model_dump_json(indent=2, ensure_ascii=False)
print(article_json)

# 方法3：排除特定字段
partial_dict = article.model_dump(exclude={'metadata', 'comments'})
print(partial_dict.keys())  # dict_keys(['id', 'title', 'content', ...])

# 方法4：只包含特定字段
summary_dict = article.model_dump(include={'id', 'title', 'author'})
print(summary_dict)  # {'id': 1, 'title': 'Pydantic 教程', 'author': 'Alice'}

# 方法5：排除默认值
minimal_dict = article.model_dump(exclude_defaults=True)
print(minimal_dict)

# 方法6：递归排除 None 值
clean_dict = article.model_dump(exclude_none=True)
print(clean_dict)`}
            language="python"
            highlights={[37, 44, 48]}
            filename="serialization.py"
            description="Pydantic 序列化方法大全"
          />

          <Callout type="tip" title="序列化性能优化">
            对于大规模数据序列化，使用 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">model_dump(mode='python')</code> 比默认的 'json' 模式快 2-3 倍，
            因为它跳过了 JSON 兼容性的检查。仅在需要直接输出 JSON 时使用 'json' 模式。
          </Callout>

          {/* ========== 六、数据反序列化 ========== */}
          <h2 id="deserialization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、数据反序列化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Pydantic 可以从字典、JSON 字符串等数据源创建模型实例，自动进行类型转换和校验，是处理 API 请求数据的理想工具。
          </p>

          <Playground
            code={`from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional
import json

class OrderItem(BaseModel):
    product_id: int
    product_name: str
    quantity: int = Field(ge=1)
    price: float = Field(ge=0)

class Order(BaseModel):
    order_id: str
    customer_name: str
    items: List[OrderItem]
    total_amount: float
    order_date: datetime
    status: str = Field(default="pending", pattern="^(pending|paid|shipped|delivered)$")

# 场景1：从字典创建（常见于 API 请求体）
order_data = {
    "order_id": "ORD-2024-001",
    "customer_name": "张三",
    "items": [
        {"product_id": 101, "product_name": "iPhone", "quantity": 1, "price": 7999.0},
        {"product_id": 102, "product_name": "AirPods", "quantity": 2, "price": 1299.0}
    ],
    "total_amount": 10597.0,
    "order_date": "2024-01-15T10:30:00",
    "status": "paid"
}

order = Order(**order_data)
print(order.order_id)           # "ORD-2024-001"
print(order.items[0].product_name)  # "iPhone"
print(order.status)             # "paid"

# 场景2：从 JSON 字符串创建
json_str = json.dumps(order_data, ensure_ascii=False)
order_from_json = Order.model_validate_json(json_str)
print(order_from_json.customer_name)  # "张三"

# 场景3：批量创建（处理列表数据）
orders_data = [order_data, order_data.copy()]
orders = [Order(**data) for data in orders_data]
print(f"创建了 {len(orders)} 个订单")

# 场景4：宽松模式（忽略额外字段）
extra_data = {
    **order_data,
    "extra_field": "会被忽略",
    "another_extra": 12345
}

# V2 默认会忽略未定义字段
order_lenient = Order(**extra_data)
print(order_lenient.order_id)  # 正常创建

# 场景5：严格模式（禁止额外字段）
from pydantic import ConfigDict

class StrictOrder(Order):
    model_config = ConfigDict(extra='forbid')

try:
    strict_order = StrictOrder(**extra_data)
except Exception as e:
    print(f"严格模式拒绝额外字段: {type(e).__name__}")

# 场景6：部分更新（合并已有数据）
existing_order = Order(**order_data)
update_data = {"status": "shipped"}
updated_order = existing_order.model_copy(update=update_data)
print(updated_order.status)  # "shipped"`}
            language="python"
            highlights={[33, 40, 52]}
            filename="deserialization.py"
            description="Pydantic 反序列化实战示例"
          />

          <SideNote label="model_validate vs 构造函数">
            Pydantic V2 推荐使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">model_validate()</code> 替代直接调用构造函数，
            因为它更明确地表达了"从外部数据创建模型"的意图，且支持更多选项（如 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">strict=True</code>）。
          </SideNote>

          {/* ========== 七、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区1：可变默认值的陷阱">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] mb-2">
              <strong>错误做法：</strong>
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm mb-3 overflow-x-auto">
              <code className="text-[12px] sm:text-[13px] font-mono text-ink-muted">
{`class Product(BaseModel):
    tags: List[str] = []  # ❌ 所有实例共享同一个列表`}
              </code>
            </pre>
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <strong>问题：</strong>与 Python 函数默认参数类似，可变对象在类定义时只创建一次。<br/>
              <strong>正确做法：</strong>使用 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">default_factory</code>。
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm overflow-x-auto">
              <code className="text-[12px] sm:text-[13px] font-mono text-ink-muted">
{`class Product(BaseModel):
    tags: List[str] = Field(default_factory=list)  # ✅ 每次创建新列表`}
              </code>
            </pre>
          </Callout>

          <Callout type="danger" title="误区2：忽略验证错误的详细信息的">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] mb-2">
              <strong>错误做法：</strong>
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm mb-3 overflow-x-auto">
              <code className="text-[12px] sm:text-[13px] font-mono text-ink-muted">
{`try:
    user = User(**data)
except Exception as e:
    print(str(e))  # ❌ 只打印简单错误信息`}
              </code>
            </pre>
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <strong>正确做法：</strong>捕获 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">ValidationError</code> 并解析详细信息。
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm overflow-x-auto">
              <code className="text-[12px] sm:text-[13px] font-mono text-ink-muted">
{`from pydantic import ValidationError

try:
    user = User(**data)
except ValidationError as e:
    for error in e.errors():
        print(f"字段: {error['loc']}")
        print(f"错误: {error['msg']}")
        print(f"类型: {error['type']}")`}
              </code>
            </pre>
          </Callout>

          <Callout type="warning" title="误区3：混淆 model_dump 和 dict()">
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">model.model_dump()</code> 是 Pydantic 方法，会递归处理嵌套模型、应用序列化配置；
              而 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">dict(model)</code> 只是浅层转换，可能丢失嵌套模型的序列化逻辑。始终使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">model_dump()</code>。
            </p>
          </Callout>

          <Callout type="warning" title="误区4：在模型中使用复杂计算作为默认值">
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              避免在字段默认值中执行耗时操作（如数据库查询、网络请求），这会在类定义时执行而非实例化时。应使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">model_validator</code> 或 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">computed_field</code>。
            </p>
          </Callout>

          {/* ========== 八、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Pydantic 的核心优势是什么？为什么 FastAPI 选择它作为数据验证库？",
              answer: "Pydantic 的核心优势：1) 基于 Python 类型标注，无需学习新的 DSL；2) 运行时自动验证和类型转换，保证数据质量；3) 自动生成 JSON Schema，便于 API 文档生成；4) 高性能（V2 使用 Rust 核心）；5) 丰富的校验器和自定义扩展能力。FastAPI 选择 Pydantic 是因为它能无缝集成类型系统，自动生成 OpenAPI 文档，并提供强大的请求/响应数据校验能力。"
            },
            {
              question: "Pydantic V1 和 V2 的主要区别有哪些？",
              answer: "主要区别：1) 性能：V2 使用 Rust 重写核心，性能提升 5-50 倍；2) API 变化：@validator 改为 @field_validator，必须声明为 @classmethod；3) 配置方式：Config 类改为 model_config = ConfigDict(...)；4) 新方法：model_dump/model_validate 替代 dict()/parse_obj()；5) 更严格的类型检查；6) 更好的错误消息。升级时需要调整装饰器语法和配置方式。"
            },
            {
              question: "如何实现 Pydantic 模型的自定义序列化逻辑？",
              answer: "有三种方式：1) 使用 Field 的 json_encoders 配置（V1）或 serialization_alias（V2）；2) 使用 @field_serializer 装饰器定义字段的自定义序列化函数；3) 使用 computed_field 创建虚拟字段，返回自定义格式的数据。例如：@field_serializer('created_at') def serialize_date(self, value): return value.strftime('%Y-%m-%d')。"
            },
            {
              question: "Pydantic 如何处理嵌套模型的验证和序列化？",
              answer: "Pydantic 自动递归处理嵌套模型：1) 验证时，会逐层验证所有嵌套模型，任何一层失败都会抛出 ValidationError，错误信息包含完整路径（如 'items.0.price'）；2) 序列化时，model_dump() 和 model_dump_json() 会递归转换所有嵌套模型；3) 可以使用 exclude/include 参数控制嵌套字段的输出；4) 嵌套模型可以是 List[SubModel]、Optional[SubModel] 等复杂结构。"
            },
            {
              question: "什么是 Pydantic 的 'extra' 配置？有哪些选项？",
              answer: "'extra' 配置控制模型如何处理未在字段定义中声明的额外数据。有三个选项：1) 'ignore'（默认）：忽略额外字段，不报错也不存储；2) 'forbid'：遇到额外字段时抛出 ValidationError；3) 'allow'：允许额外字段，可通过 model.extra_data 访问。在严格的数据校验场景中应使用 'forbid'，在灵活的配置管理中可使用 'allow'。"
            },
            {
              question: "如何使用 Pydantic 实现数据的部分更新（PATCH 请求）？",
              answer: "有两种方式：1) 使用 model_copy(update={...}) 方法，基于现有模型创建副本并更新指定字段；2) 创建专门的 UpdateModel，所有字段设为 Optional，然后使用 model_validate(data, partial=True) 或在验证后手动合并到原模型。FastAPI 中通常使用第二种方式处理 PATCH 请求，只验证提供的字段。"
            },
            {
              question: "Pydantic 的性能如何？有哪些优化技巧？",
              answer: "Pydantic V2 性能优异，基准测试显示比 V1 快 5-50 倍。优化技巧：1) 使用 model_dump(mode='python') 而非 'json' 模式；2) 避免在 validator 中执行耗时操作；3) 使用 __slots__ 减少内存占用；4) 对于超高性能需求，考虑使用 pydantic-core 直接调用；5) 缓存频繁使用的模型实例；6) 批量处理时使用列表推导式而非循环逐个创建。"
            }
          ]} />

          {/* ========== 九、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            掌握 Pydantic 后，建议继续学习以下相关内容：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
            <a href="/docs/04-fastapi/fastapi" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">Web 框架</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">FastAPI 深度解析</div>
              <div className="text-[13px] text-ink-muted mt-1">路由、依赖注入、中间件</div>
            </a>
            <a href="/docs/03-python-advanced/python-typing" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">基础</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">Python 类型系统</div>
              <div className="text-[13px] text-ink-muted mt-1">typing 模块、类型标注最佳实践</div>
            </a>
            <a href="/docs/03-python-advanced/dataclasses" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">对比</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">dataclasses vs Pydantic</div>
              <div className="text-[13px] text-ink-muted mt-1">选择合适的数据建模方案</div>
            </a>
            <a href="/docs/03-python-advanced/python-async" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">进阶</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">Python 异步编程</div>
              <div className="text-[13px] text-ink-muted mt-1">async/await、asyncio、并发编程</div>
            </a>
          </div>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC Sidebar */}
      <aside className="hidden xl:block w-[240px] shrink-0 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto pr-4">
        <SmartTOC items={tocItems} />
      </aside>
    </div>
  )
}
