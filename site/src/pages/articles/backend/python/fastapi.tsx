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
  { id: 'routing', text: '一、路由系统', level: 2 },
  { id: 'request-params', text: '二、请求参数处理', level: 2 },
  { id: 'response', text: '三、响应对象', level: 2 },
  { id: 'file-upload', text: '四、文件上传', level: 2 },
  { id: 'middleware', text: '五、中间件', level: 2 },
  { id: 'openapi', text: '六、接口文档（OpenAPI）', level: 2 },
  { id: 'streaming', text: '七、流式输出（Streaming）', level: 2 },
  { id: 'sse', text: '八、SSE（Server-Sent Events）', level: 2 },
  { id: 'websocket', text: '九、WebSocket', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function FastAPIDeepDive({ meta }: { meta: KnowledgeNode }) {
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
              FastAPI 是一个现代、高性能的 Python Web 框架，基于<strong className="text-accent">Starlette</strong>和<strong className="text-accent">Pydantic</strong>构建，
              通过类型标注实现自动数据验证、序列化和 API 文档生成，性能媲美 NodeJS 和 Go，
              是构建 RESTful API、微服务和实时应用的理想选择。
            </p>
          </blockquote>

          <Callout type="tip" title="核心特性">
            FastAPI 的核心优势：1) 极速开发（减少 40% 人为错误）；2) 自动生成 OpenAPI/Swagger 文档；3) 基于标准 Python 类型提示；
            4) 异步支持（async/await）；5) 依赖注入系统；6) 100% 测试覆盖率。 benchmarks 显示其性能与 Go 相当。
          </Callout>

          {/* ========== 一、路由系统 ========== */}
          <h2 id="routing" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、路由系统
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            FastAPI 使用装饰器定义路由，支持所有 HTTP 方法。路由路径可以包含路径参数，支持正则表达式匹配。
          </p>

          <Playground
            code={`from fastapi import FastAPI
from typing import Optional

app = FastAPI(title="My API", version="1.0.0")

# 基本路由
@app.get("/")
def read_root():
    return {"message": "Hello World"}

# 路径参数
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

# 可选路径参数
@app.get("/users/{user_id}")
def read_user(user_id: int, q: Optional[str] = None):
    return {"user_id": user_id, "q": q}

# 多个路径参数
@app.get("/users/{user_id}/items/{item_id}")
def read_user_item(user_id: int, item_id: str):
    return {"user_id": user_id, "item_id": item_id}

# 路径参数验证
@app.get("/items/{item_id}")
def read_item_validated(item_id: int):
    if item_id <= 0:
        return {"error": "ID must be positive"}
    return {"item_id": item_id}

# 固定路径优先于动态路径
@app.get("/users/me")
def read_users_me():
    return {"user": "current user"}

@app.get("/users/{user_id}")
def read_user(user_id: str):
    return {"user_id": user_id}

# HTTP 方法
@app.post("/items/")
def create_item():
    return {"message": "Item created"}

@app.put("/items/{item_id}")
def update_item(item_id: int):
    return {"message": f"Item {item_id} updated"}

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    return {"message": f"Item {item_id} deleted"}

# 路由前缀和标签
from fastapi import APIRouter

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/")
def list_products():
    return [{"id": 1, "name": "Product A"}]

@router.get("/{product_id}")
def get_product(product_id: int):
    return {"id": product_id, "name": "Product A"}

app.include_router(router)`}
            language="python"
            highlights={[7, 12, 37]}
            filename="routing.py"
            description="FastAPI 路由系统完整示例"
          />

          <SideNote label="路径参数顺序">
            FastAPI 按定义顺序匹配路由。应将具体路径（如 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">/users/me</code>）放在动态路径（如 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">/users/{'{'}user_id{'}'}</code>）之前，
            否则动态路径会先匹配。
          </SideNote>

          <Callout type="info" title="APIRouter 的优势">
            使用 <code className="font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]">APIRouter</code> 可以将路由模块化，便于大型项目组织代码。
            每个 router 可以有独立的 prefix、tags、dependencies，最后通过 <code className="font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]">app.include_router()</code> 注册到主应用。
          </Callout>

          {/* ========== 二、请求参数处理 ========== */}
          <h2 id="request-params" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、请求参数处理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            FastAPI 支持多种参数来源：路径参数、查询参数、请求体、Header、Cookie、表单数据等，全部通过类型标注自动解析和验证。
          </p>

          <Playground
            code={`from fastapi import FastAPI, Query, Path, Body, Header, Cookie
from pydantic import BaseModel, Field
from typing import Optional, List

app = FastAPI()

# Pydantic 模型定义
class Item(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="商品名称")
    price: float = Field(..., gt=0, description="价格必须大于0")
    description: Optional[str] = Field(None, max_length=300)
    tags: List[str] = []

# 1. 查询参数
@app.get("/items/")
def read_items(
    skip: int = Query(0, ge=0, description="跳过的记录数"),
    limit: int = Query(10, ge=1, le=100, description="返回的记录数"),
    q: Optional[str] = Query(None, min_length=1, max_length=50)
):
    return {"skip": skip, "limit": limit, "q": q}

# 2. 路径参数 + 查询参数
@app.get("/items/{item_id}")
def read_item(
    item_id: int = Path(..., gt=0, description="商品ID"),
    q: Optional[str] = None
):
    return {"item_id": item_id, "q": q}

# 3. 请求体（JSON）
@app.post("/items/")
def create_item(item: Item):
    return {"item": item}

# 4. 多个请求体参数
@app.post("/items/multiple/")
def create_multiple_items(
    item: Item,
    quantity: int = Body(..., gt=0),
    discount: float = Body(0, ge=0, le=1)
):
    total_price = item.price * quantity * (1 - discount)
    return {"item": item, "quantity": quantity, "total_price": total_price}

# 5. Header 参数
@app.get("/headers/")
def read_headers(
    user_agent: Optional[str] = Header(None),
    x_token: Optional[str] = Header(None)
):
    return {"user_agent": user_agent, "x_token": x_token}

# 6. Cookie 参数
@app.get("/cookies/")
def read_cookies(
    session_id: Optional[str] = Cookie(None)
):
    return {"session_id": session_id}

# 7. 表单数据（需要安装 python-multipart）
from fastapi import Form

@app.post("/login/")
def login(
    username: str = Form(...),
    password: str = Form(...)
):
    return {"username": username}`}
            language="python"
            highlights={[16, 26, 34]}
            filename="request_params.py"
            description="FastAPI 请求参数处理大全"
          />

          <Callout type="warning" title="Query 和 Path 的作用">
            虽然可以不使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">Query()</code> 和 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">Path()</code>，但使用它们可以：
            1) 添加验证规则（ge、le、min_length 等）；2) 提供默认值；3) 在 API 文档中显示描述信息。建议始终使用。
          </Callout>

          {/* ========== 三、响应对象 ========== */}
          <h2 id="response" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、响应对象
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            FastAPI 可以通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">response_model</code> 控制响应格式，过滤敏感字段，设置状态码和 Headers。
          </p>

          <Playground
            code={`from fastapi import FastAPI, status
from pydantic import BaseModel, EmailStr
from typing import Optional, List

app = FastAPI()

# 完整用户模型
class User(BaseModel):
    id: int
    username: str
    email: EmailStr
    full_name: Optional[str] = None
    password: str  # 敏感字段
    is_active: bool = True

# 公开用户模型（不包含密码）
class UserPublic(BaseModel):
    id: int
    username: str
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True

# 1. 使用 response_model 过滤字段
@app.get("/users/{user_id}", response_model=UserPublic)
def get_user(user_id: int):
    # 即使返回完整的 User 对象，响应中也不会包含 password
    return User(
        id=user_id,
        username="john",
        email="john@example.com",
        full_name="John Doe",
        password="secret123",  # 不会出现在响应中
        is_active=True
    )

# 2. 设置状态码
@app.post("/users/", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def create_user(user: User):
    return user

# 3. 自定义 Headers
from fastapi.responses import JSONResponse

@app.get("/custom-response/")
def custom_response():
    return JSONResponse(
        content={"message": "Hello"},
        headers={"X-Custom-Header": "CustomValue"}
    )

# 4. 列表响应
@app.get("/users/", response_model=List[UserPublic])
def list_users():
    return [
        User(id=1, username="alice", email="alice@example.com", password="pwd1"),
        User(id=2, username="bob", email="bob@example.com", password="pwd2")
    ]

# 5. 嵌套响应模型
class Post(BaseModel):
    id: int
    title: str
    content: str

class PostWithAuthor(BaseModel):
    post: Post
    author: UserPublic

@app.get("/posts/{post_id}", response_model=PostWithAuthor)
def get_post_with_author(post_id: int):
    return PostWithAuthor(
        post=Post(id=post_id, title="Hello", content="World"),
        author=UserPublic(id=1, username="alice", email="alice@example.com", is_active=True)
    )

# 6. 排除 None 值
@app.get("/optional-fields/", response_model=UserPublic, response_model_exclude_none=True)
def get_user_optional():
    return UserPublic(
        id=1,
        username="john",
        email="john@example.com",
        full_name=None  # 不会出现在响应中
    )`}
            language="python"
            highlights={[26, 39, 52]}
            filename="response_models.py"
            description="FastAPI 响应模型示例"
          />

          <SideNote label="response_model vs 直接返回">
            使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">response_model</code> 不仅过滤字段，还会：
            1) 将返回值转换为指定模型（确保类型一致）；2) 在 OpenAPI 文档中显示响应结构；3) 提供 IDE 自动补全。
            即使函数返回字典，FastAPI 也会根据 response_model 进行转换和验证。
          </SideNote>

          {/* ========== 四、文件上传 ========== */}
          <h2 id="file-upload" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、文件上传
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            FastAPI 支持单文件、多文件上传，可以限制文件大小、类型，并与其他表单字段一起接收。
            需要安装：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">pip install python-multipart</code>
          </p>

          <Playground
            code={`from fastapi import FastAPI, File, UploadFile, Form
from typing import List
import shutil

app = FastAPI()

# 1. 单文件上传
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    """
    UploadFile 包含：
    - filename: 文件名
    - content_type: MIME 类型
    - file: SpooledTemporaryFile 对象
    """
    return {
        "filename": file.filename,
        "content_type": file.content_type
    }

# 2. 保存上传的文件
@app.post("/upload-and-save/")
async def upload_and_save(file: UploadFile = File(...)):
    file_path = f"uploads/{file.filename}"
    
    # 异步写入文件
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"filename": file.filename, "path": file_path}

# 3. 多文件上传
@app.post("/upload-multiple/")
async def upload_multiple(files: List[UploadFile] = File(...)):
    return [{"filename": file.filename} for file in files]

# 4. 文件 + 表单字段
@app.post("/upload-with-data/")
async def upload_with_data(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(None)
):
    return {
        "title": title,
        "description": description,
        "filename": file.filename
    }

# 5. 文件验证
from fastapi import HTTPException

@app.post("/upload-validated/")
async def upload_validated(file: UploadFile = File(...)):
    # 检查文件类型
    allowed_types = ["image/jpeg", "image/png", "application/pdf"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {allowed_types}"
        )
    
    # 读取部分内容进行检查
    contents = await file.read(1024)  # 读取前 1KB
    await file.seek(0)  # 重置文件指针
    
    return {"filename": file.filename, "size": len(contents)}

# 6. 大文件流式处理
@app.post("/upload-large/")
async def upload_large_file(file: UploadFile = File(...)):
    """处理大文件而不一次性加载到内存"""
    chunk_size = 1024 * 1024  # 1MB
    total_size = 0
    
    while chunk := await file.read(chunk_size):
        total_size += len(chunk)
        # 这里可以写入文件或进行处理
        if total_size > 100 * 1024 * 1024:  # 限制 100MB
            raise HTTPException(status_code=413, detail="File too large")
    
    return {"filename": file.filename, "total_size": total_size}`}
            language="python"
            highlights={[8, 22, 33]}
            filename="file_upload.py"
            description="FastAPI 文件上传完整示例"
          />

          <Callout type="danger" title="文件上传安全">
            生产环境中必须：1) 验证文件类型（不要仅依赖扩展名）；2) 限制文件大小；3) 使用随机文件名避免覆盖；
            4) 存储到安全的目录（不在 Web 根目录）；5) 扫描病毒（对于用户上传的文件）。永远不要信任用户上传的文件名和内容。
          </Callout>

          {/* ========== 五、中间件 ========== */}
          <h2 id="middleware" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、中间件
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            中间件在每个请求前后执行，可用于日志记录、认证、CORS、限流等。FastAPI 基于 Starlette，兼容其所有中间件。
          </p>

          <Playground
            code={`from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware
import time

app = FastAPI()

# 1. 自定义中间件
class TimingMiddleware(BaseHTTPMiddleware):
    """计算请求处理时间"""
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        response = await call_next(request)
        
        process_time = time.time() - start_time
        response.headers["X-Process-Time"] = str(process_time)
        
        print(f"{request.method} {request.url.path} - {process_time:.4f}s")
        return response

app.add_middleware(TimingMiddleware)

# 2. CORS 中间件
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境应指定具体域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. GZip 压缩中间件
from fastapi.middleware.gzip import GZipMiddleware

app.add_middleware(GZipMiddleware, minimum_size=1000)

# 4. HTTPS 重定向中间件
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

# app.add_middleware(HTTPSRedirectMiddleware)

# 5. 认证中间件
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """验证 Bearer Token"""
    token = credentials.credentials
    if token != "secret-token":
        raise HTTPException(status_code=401, detail="Invalid token")
    return token

@app.get("/protected/")
def protected_route(token: str = Depends(verify_token)):
    return {"message": "Protected content", "token": token}

# 6. 全局异常处理
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "error": "Validation failed",
            "details": exc.errors()
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error"}
    )`}
            language="python"
            highlights={[8, 25, 44]}
            filename="middleware.py"
            description="FastAPI 中间件和异常处理"
          />

          <SideNote label="中间件执行顺序">
            中间件按添加顺序执行（类似洋葱模型）：请求从外到内经过中间件，响应从内到外返回。
            最后一个添加的中间件最先处理请求。CORS 中间件应该最先添加（最外层），以便在所有其他中间件之前处理预检请求。
          </SideNote>

          {/* ========== 六、接口文档（OpenAPI） ========== */}
          <h2 id="openapi" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、接口文档（OpenAPI）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            FastAPI 自动生成 OpenAPI 文档，提供 Swagger UI 和 ReDoc 两种界面。通过类型标注和 Pydantic 模型，
            无需额外配置即可生成交互式 API 文档。
          </p>

          <Playground
            code={`from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Optional, List

# 自定义 API 文档配置
app = FastAPI(
    title="My Awesome API",
    description="""
    这是一个示例 API，展示 FastAPI 的文档功能。
    
    ## 功能特性
    * 自动文档生成
    * 交互式测试
    * 类型安全
    """,
    version="1.0.0",
    docs_url="/docs",      # Swagger UI 路径
    redoc_url="/redoc",    # ReDoc 路径
    openapi_url="/openapi.json"  # OpenAPI schema 路径
)

# 带详细文档的路由
@app.get(
    "/items/",
    summary="获取商品列表",
    description="返回所有商品的列表，支持分页",
    response_description="商品列表",
    tags=["items"],
    responses={
        200: {"description": "成功返回商品列表"},
        400: {"description": "请求参数错误"},
        500: {"description": "服务器内部错误"}
    }
)
def list_items(
    skip: int = Field(0, description="跳过的记录数"),
    limit: int = Field(10, description="返回的记录数，最大100")
):
    """
    获取商品列表
    
    - **skip**: 跳过的记录数
    - **limit**: 每页返回的记录数
    """
    return [{"id": i, "name": f"Item {i}"} for i in range(skip, skip + limit)]

# Pydantic 模型文档
class ItemCreate(BaseModel):
    """创建商品的请求模型"""
    name: str = Field(..., description="商品名称", example="iPhone 15")
    price: float = Field(..., gt=0, description="商品价格", example=7999.0)
    description: Optional[str] = Field(
        None, 
        description="商品描述",
        example="最新的 iPhone 手机"
    )
    tags: List[str] = Field(
        default_factory=list,
        description="商品标签",
        example=["electronics", "phone"]
    )
    
    class Config:
        schema_extra = {
            "example": {
                "name": "iPhone 15",
                "price": 7999.0,
                "description": "最新的 iPhone 手机",
                "tags": ["electronics", "phone"]
            }
        }

class ItemResponse(BaseModel):
    """商品响应模型"""
    id: int = Field(..., description="商品ID")
    name: str = Field(..., description="商品名称")
    price: float = Field(..., description="商品价格")

@app.post(
    "/items/",
    summary="创建新商品",
    description="创建一个新商品并返回其信息",
    response_model=ItemResponse,
    tags=["items"],
    status_code=201
)
def create_item(item: ItemCreate):
    """创建新商品"""
    return {"id": 1, **item.dict()}

# 访问文档：
# - Swagger UI: http://localhost:8000/docs
# - ReDoc: http://localhost:8000/redoc
# - OpenAPI JSON: http://localhost:8000/openapi.json`}
            language="python"
            highlights={[6, 23, 50]}
            filename="openapi_docs.py"
            description="FastAPI OpenAPI 文档配置"
          />

          <Callout type="tip" title="文档定制技巧">
            1) 使用 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">summary</code> 和 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">description</code> 提供清晰的接口说明；
            2) 在 Pydantic 模型中使用 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">Field(example=...)</code> 提供示例值；
            3) 使用 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">tags</code> 对接口分组；4) 生产环境可禁用文档：<code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">docs_url=None</code>。
          </Callout>

          {/* ========== 七、流式输出（Streaming） ========== */}
          <h2 id="streaming" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、流式输出（Streaming）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            流式输出允许逐步发送响应数据，适用于大数据集、实时日志、AI 模型生成等场景。
            使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">StreamingResponse</code> 实现。
          </p>

          <Playground
            code={`from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio
import json

app = FastAPI()

# 1. 基本流式响应
async def generate_numbers():
    """生成数字流"""
    for i in range(10):
        yield f"Number: {i}\\n"
        await asyncio.sleep(0.5)

@app.get("/stream/numbers/")
def stream_numbers():
    return StreamingResponse(
        generate_numbers(),
        media_type="text/plain"
    )

# 2. JSON 流式响应（NDJSON 格式）
async def generate_json_stream():
    """生成 JSON 流（每行一个 JSON 对象）"""
    for i in range(5):
        data = {"id": i, "message": f"Message {i}"}
        yield json.dumps(data) + "\\n"
        await asyncio.sleep(0.3)

@app.get("/stream/json/")
def stream_json():
    return StreamingResponse(
        generate_json_stream(),
        media_type="application/x-ndjson"
    )

# 3. 大数据集流式处理
from typing import List

def large_dataset_generator():
    """模拟大数据集，逐条返回而非一次性加载"""
    for i in range(1000000):
        yield f"Record {i}\\n"

@app.get("/stream/large-dataset/")
def stream_large_dataset():
    return StreamingResponse(
        large_dataset_generator(),
        media_type="text/plain"
    )

# 4. AI 模型文本生成流
async def llm_generate(prompt: str):
    """模拟 LLM 逐字生成文本"""
    response_text = f"这是关于 '{prompt}' 的详细回答..."
    for char in response_text:
        yield char
        await asyncio.sleep(0.05)

@app.get("/stream/llm/")
def stream_llm_response(prompt: str = "Python"):
    return StreamingResponse(
        llm_generate(prompt),
        media_type="text/plain"
    )

# 5. 文件流式下载
from pathlib import Path

def file_iterator(file_path: str, chunk_size: int = 1024 * 1024):
    """分块读取文件"""
    with open(file_path, "rb") as f:
        while chunk := f.read(chunk_size):
            yield chunk

@app.get("/download/{filename}")
def download_file(filename: str):
    file_path = f"files/{filename}"
    if not Path(file_path).exists():
        return {"error": "File not found"}
    
    return StreamingResponse(
        file_iterator(file_path),
        media_type="application/octet-stream",
        headers={
            "Content-Disposition": f"attachment; filename={filename}"
        }
    )`}
            language="python"
            highlights={[15, 30, 45]}
            filename="streaming.py"
            description="FastAPI 流式输出示例"
          />

          <SideNote label="Streaming vs SSE">
            <strong>Streaming：</strong>单向流，服务器推送数据后连接关闭。适合文件下载、大数据导出。<br/>
            <strong>SSE：</strong>持久连接，服务器可持续推送事件。适合实时通知、股票行情。<br/>
            两者都使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">StreamingResponse</code>，但 SSE 有特定格式和更长的超时时间。
          </SideNote>

          {/* ========== 八、SSE（Server-Sent Events） ========== */}
          <h2 id="sse" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、SSE（Server-Sent Events）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            SSE 允许服务器向客户端持续推送事件，基于 HTTP 长连接。适用于实时通知、监控数据、聊天消息等场景。
          </p>

          <Playground
            code={`from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio
import json

app = FastAPI()

# SSE 格式：event: event_name\ndata: data\n\n
async def sse_event_generator():
    """生成 SSE 事件流"""
    try:
        for i in range(10):
            # SSE 格式要求
            event_data = {
                "id": i,
                "event": "message",
                "data": json.dumps({"count": i, "message": f"Event {i}"})
            }
            yield f"event: {event_data['event']}\\n"
            yield f"id: {event_data['id']}\\n"
            yield f"data: {event_data['data']}\\n\\n"
            
            await asyncio.sleep(1)
    except asyncio.CancelledError:
        # 客户端断开连接
        print("Client disconnected")

@app.get("/sse/events/")
def sse_endpoint():
    return StreamingResponse(
        sse_event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*"
        }
    )

# 实际应用场景：实时通知
notification_queue = asyncio.Queue()

async def notification_generator(user_id: str):
    """监听通知队列并推送"""
    try:
        while True:
            notification = await notification_queue.get()
            if notification["user_id"] == user_id:
                event = {
                    "event": "notification",
                    "data": json.dumps(notification)
                }
                yield f"event: {event['event']}\\n"
                yield f"data: {event['data']}\\n\\n"
    except asyncio.CancelledError:
        pass

@app.get("/sse/notifications/{user_id}")
def sse_notifications(user_id: str):
    return StreamingResponse(
        notification_generator(user_id),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        }
    )

# 发送通知的接口
@app.post("/notify/{user_id}")
async def send_notification(user_id: str, message: str):
    await notification_queue.put({
        "user_id": user_id,
        "message": message,
        "timestamp": asyncio.get_event_loop().time()
    })
    return {"status": "Notification sent"}

# 前端 JavaScript 示例：
# const eventSource = new EventSource('/sse/events/');
# eventSource.onmessage = (event) => {
#   console.log('Received:', JSON.parse(event.data));
# };
# eventSource.onerror = (error) => {
#   console.error('SSE Error:', error);
# };`}
            language="python"
            highlights={[28, 42, 58]}
            filename="sse.py"
            description="FastAPI SSE 实现示例"
          />

          <Callout type="info" title="SSE 优势">
            SSE 相比 WebSocket 的优势：1) 基于 HTTP，无需特殊协议；2) 自动重连；3) 简单易用；4) 浏览器原生支持（EventSource API）。
            缺点：只支持单向通信（服务器→客户端），如果需要双向通信应使用 WebSocket。
          </Callout>

          {/* ========== 九、WebSocket ========== */}
          <h2 id="websocket" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、WebSocket
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            WebSocket 提供全双工通信通道，适合实时聊天、在线游戏、协同编辑等需要双向实时通信的场景。
          </p>

          <Playground
            code={`from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import Dict, List
import json

app = FastAPI()

# 1. 基本 WebSocket
@app.websocket("/ws/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"You said: {data}")
    except WebSocketDisconnect:
        print("Client disconnected")

# 2. 聊天室（广播消息）
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
    
    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket
    
    def disconnect(self, client_id: str):
        if client_id in self.active_connections:
            del self.active_connections[client_id]
    
    async def send_personal_message(self, message: str, client_id: str):
        if client_id in self.active_connections:
            await self.active_connections[client_id].send_text(message)
    
    async def broadcast(self, message: str):
        for connection in self.active_connections.values():
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/chat/{client_id}")
async def chat_websocket(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    try:
        # 发送欢迎消息
        await manager.send_personal_message(
            f"Welcome {client_id}!", 
            client_id
        )
        
        # 广播加入消息
        await manager.broadcast(f"{client_id} joined the chat")
        
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # 广播消息给所有人
            await manager.broadcast(
                json.dumps({
                    "sender": client_id,
                    "message": message["text"],
                    "type": "chat"
                })
            )
    except WebSocketDisconnect:
        manager.disconnect(client_id)
        await manager.broadcast(f"{client_id} left the chat")

# 3. JSON 消息处理
@app.websocket("/ws/json/")
async def websocket_json(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # 直接接收 JSON
            data = await websocket.receive_json()
            
            # 处理消息
            response = {
                "type": "response",
                "received": data,
                "timestamp": "2024-01-01T00:00:00"
            }
            
            # 发送 JSON
            await websocket.send_json(response)
    except WebSocketDisconnect:
        print("Client disconnected")

# 4. 二进制数据
@app.websocket("/ws/binary/")
async def websocket_binary(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # 接收二进制数据
            data = await websocket.receive_bytes()
            
            # 处理数据（例如图像处理）
            processed_data = data  # 这里可以进行实际处理
            
            # 发送二进制数据
            await websocket.send_bytes(processed_data)
    except WebSocketDisconnect:
        print("Client disconnected")

# 前端 JavaScript 示例：
# const ws = new WebSocket('ws://localhost:8000/ws/chat/user1');
# ws.onopen = () => {
#   console.log('Connected');
#   ws.send(JSON.stringify({text: 'Hello!'}));
# };
# ws.onmessage = (event) => {
#   console.log('Received:', event.data);
# };
# ws.onclose = () => {
#   console.log('Disconnected');
# };`}
            language="python"
            highlights={[8, 41, 68]}
            filename="websocket.py"
            description="FastAPI WebSocket 完整示例"
          />

          <SideNote label="WebSocket 部署注意">
            生产环境部署 WebSocket 需要：1) 使用 ASGI 服务器（Uvicorn、Hypercorn）；2) 配置负载均衡器的 WebSocket 支持；
            3) 设置合适的超时时间；4) 考虑使用 Redis Pub/Sub 实现多实例间的消息广播。Nginx 需要特殊配置才能代理 WebSocket。
          </SideNote>

          {/* ========== 十、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="danger" title="误区1：同步和异步混用导致性能问题">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] mb-2">
              <strong>错误做法：</strong>
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm mb-3 overflow-x-auto">
              <code className="text-[12px] sm:text-[13px] font-mono text-ink-muted">
{`@app.get("/slow/")
def slow_endpoint():  # ❌ 同步函数阻塞事件循环
    time.sleep(5)
    return {"message": "Done"}`}
              </code>
            </pre>
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <strong>正确做法：</strong>使用异步函数或线程池。
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm overflow-x-auto">
              <code className="text-[12px] sm:text-[13px] font-mono text-ink-muted">
{`@app.get("/fast/")
async def fast_endpoint():  # ✅ 异步不阻塞
    await asyncio.sleep(5)
    return {"message": "Done"}`}
              </code>
            </pre>
          </Callout>

          <Callout type="danger" title="误区2：忘记 await 数据库操作">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] mb-2">
              使用异步 ORM（如 SQLAlchemy 2.0+、Tortoise ORM）时，所有数据库操作都必须 await。
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm mb-3 overflow-x-auto">
              <code className="text-[12px] sm:text-[13px] font-mono text-ink-muted">
{`@app.get("/users/")
async def get_users():
    users = db.query(User).all()  # ❌ 返回 coroutine，未执行
    return users`}
              </code>
            </pre>
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <strong>正确做法：</strong>
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm overflow-x-auto">
              <code className="text-[12px] sm:text-[13px] font-mono text-ink-muted">
{`@app.get("/users/")
async def get_users():
    users = await db.execute(select(User))  # ✅ 正确 await
    return users.scalars().all()`}
              </code>
            </pre>
          </Callout>

          <Callout type="warning" title="误区3：response_model 不影响返回值">
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">response_model</code> 不仅用于文档，还会实际转换和过滤返回值。
              如果返回的数据不符合 response_model，FastAPI 会进行验证和转换。不要认为它只是"注释"。
            </p>
          </Callout>

          <Callout type="warning" title="误区4：忽略依赖注入的作用域">
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              FastAPI 依赖注入默认每次请求创建新实例。如果需要共享资源（如数据库连接池），应使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">yield</code> 或在依赖函数外部创建单例。
              错误的依赖管理会导致资源泄漏或性能问题。
            </p>
          </Callout>

          {/* ========== 十一、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "FastAPI 为什么性能这么高？它的架构是怎样的？",
              answer: "FastAPI 高性能的原因：1) 基于 Starlette（高性能 ASGI 框架）；2) 使用 Pydantic 进行数据验证（V2 使用 Rust 核心）；3) 原生异步支持，无阻塞 I/O；4) 利用 Python 类型提示进行优化。架构分层：FastAPI → Starlette（路由、中间件）→ Pydantic（验证、序列化）→ Uvicorn（ASGI 服务器）。基准测试显示其性能与 Go、Node.js 相当。"
            },
            {
              question: "FastAPI 的依赖注入系统是如何工作的？有哪些应用场景？",
              answer: "依赖注入通过 Depends() 声明依赖，FastAPI 自动解析和执行。工作流程：1) 路由函数声明依赖参数；2) FastAPI 调用依赖函数；3) 将结果注入路由函数。应用场景：1) 数据库会话管理（get_db）；2) 用户认证（get_current_user）；3) 权限检查（require_admin）；4) 分页参数；5) 通用查询参数。依赖可以嵌套，形成依赖树，支持 yield 实现资源清理。"
            },
            {
              question: "如何处理 FastAPI 中的大规模文件上传？需要注意哪些安全问题？",
              answer: "处理方法：1) 使用 UploadFile 而非直接读取到内存；2) 流式处理大文件（分块读取）；3) 限制文件大小（通过中间件或手动检查）；4) 使用临时文件存储。安全措施：1) 验证文件类型（MIME type + 文件头）；2) 限制文件大小；3) 使用随机文件名；4) 存储到非 Web 目录；5) 扫描病毒；6) 设置上传速率限制。避免直接使用用户提供的文件名。"
            },
            {
              question: "FastAPI 如何实现实时通信？WebSocket 和 SSE 如何选择？",
              answer: "FastAPI 通过 @app.websocket() 装饰器支持 WebSocket，通过 StreamingResponse 实现 SSE。选择原则：WebSocket 适合双向实时通信（聊天、游戏、协同编辑），需要处理心跳、重连、消息确认；SSE 适合单向推送（通知、行情、日志），实现简单，浏览器原生支持，自动重连。如果需要双向通信选 WebSocket，只需服务器推送选 SSE。"
            },
            {
              question: "FastAPI 的中间件和执行顺序是怎样的？如何编写自定义中间件？",
              answer: "中间件按添加顺序形成洋葱模型：请求从外到内，响应从内到外。最后一个添加的中间件最先处理请求。编写自定义中间件：继承 BaseHTTPMiddleware，实现 dispatch 方法，在 call_next 前后添加逻辑。常用中间件：CORS、GZip、HTTPSRedirect、Timing、Authentication。注意：中间件应为轻量级操作，耗时操作应在路由中处理。"
            },
            {
              question: "如何在 FastAPI 中实现版本控制和向后兼容？",
              answer: "版本控制策略：1) URL 版本：/api/v1/items、/api/v2/items（推荐）；2) Header 版本：Accept: application/vnd.api.v1+json；3) 查询参数：/items?version=1。实现方式：使用 APIRouter 分组不同版本的路由，include_router 时指定 prefix。向后兼容：1) 不删除字段，标记为 deprecated；2) 新增可选字段；3) 使用 Union 类型支持多种格式；4) 提供迁移指南。"
            },
            {
              question: "FastAPI 生产环境部署需要注意什么？如何优化性能？",
              answer: "部署要点：1) 使用 Uvicorn + Gunicorn（多 worker）；2) 配置合适的 worker 数量（CPU * 2 + 1）；3) 启用 GZip 压缩；4) 配置反向代理（Nginx）；5) 使用环境变量管理配置；6) 禁用文档（docs_url=None）；7) 配置日志和监控。性能优化：1) 使用异步数据库驱动；2) 缓存频繁查询（Redis）；3) 使用 CDN 静态资源；4) 数据库连接池；5) 异步任务队列（Celery）；6) 响应压缩。"
            }
          ]} />

          {/* ========== 十二、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            掌握 FastAPI 后，建议继续学习以下内容：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
            <a href="/docs/03-python-advanced/python-async" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">基础</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">Python 异步编程</div>
              <div className="text-[13px] text-ink-muted mt-1">async/await、asyncio、协程</div>
            </a>
            <a href="/docs/03-python-advanced/pydantic" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">核心依赖</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">Pydantic 数据验证</div>
              <div className="text-[13px] text-ink-muted mt-1">BaseModel、字段校验、序列化</div>
            </a>
            <a href="/docs/04-fastapi/sqlmodel" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">ORM</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">SQLModel 数据库</div>
              <div className="text-[13px] text-ink-muted mt-1">类型安全的 SQL ORM</div>
            </a>
            <a href="/docs/04-fastapi/deployment" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">部署</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">FastAPI 生产部署</div>
              <div className="text-[13px] text-ink-muted mt-1">Uvicorn、Gunicorn、Docker、Nginx</div>
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
