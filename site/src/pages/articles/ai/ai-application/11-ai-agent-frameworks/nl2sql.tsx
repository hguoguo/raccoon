import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'architecture', text: '一、NL2SQL 技术架构', level: 2 },
  { id: 'schema-linking', text: '二、Schema Linking 模式链接', level: 2 },
  { id: 'prompt-design', text: '三、Prompt 设计策略', level: 2 },
  { id: 'sql-generation', text: '四、SQL 生成与优化', level: 2 },
  { id: 'validation', text: '五、结果验证与修正', level: 2 },
  { id: 'challenges', text: '六、核心挑战与解决方案', level: 2 },
  { id: 'misconceptions', text: '七、常见误区', level: 2 },
  { id: 'interview', text: '八、面试真题', level: 2 },
  { id: 'related', text: '九、知识关联', level: 2 },
]

export default function Nl2sql({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              NL2SQL（Natural Language to SQL）是<strong className="text-accent">将自然语言问题自动转换为可执行 SQL 查询</strong>的技术，
              通过语义解析、Schema Linking 和代码生成，让非技术人员能够用日常语言查询数据库，降低数据访问门槛。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要 NL2SQL？">
            传统数据分析需要业务人员学习 SQL 语法，或与数据团队反复沟通需求。NL2SQL 让业务人员直接用自然语言提问（如"上个月销售额最高的产品是什么"），系统自动生成并执行 SQL，大幅提升数据 democratization。
          </Callout>

          <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、NL2SQL 技术架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            NL2SQL 系统通常包含四个核心模块：<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">语义解析</code>、
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">Schema Linking</code>、
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">SQL 生成</code> 和 
            <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">验证修正</code>。
          </p>

          <DiagramBlock title="NL2SQL 完整流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
用户问题: "找出销售额超过 100 万的客户"
         │
         ▼
┌─────────────────────┐
│   语义解析           │
│ (理解意图和实体)     │
└──────────┬──────────┘
           │ 提取关键信息
           ▼
┌─────────────────────┐
│  Schema Linking     │
│ (映射到表/列名)      │
└──────────┬──────────┘
           │ 确定涉及的表和字段
           ▼
┌─────────────────────┐
│   SQL 生成           │
│ (LLM 生成 SQL)       │
└──────────┬──────────┘
           │ 生成候选 SQL
           ▼
┌─────────────────────┐
│   验证与修正         │
│ (语法检查 + 执行测试)│
└──────────┬──────────┘
           │ 最终 SQL
           ▼
SELECT customer_name, SUM(amount) as total_sales
FROM orders
GROUP BY customer_name
HAVING total_sales > 1000000;
            `}</pre>
          </DiagramBlock>

          <SideNote label="技术演进">
            早期 NL2SQL 基于规则模板或序列到序列模型（Seq2Seq），准确率低且泛化能力差。现代方案主要依赖 LLM（如 GPT-4、CodeLlama）结合 Few-shot Prompting，准确率显著提升。
          </SideNote>

          <h2 id="schema-linking" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、Schema Linking 模式链接
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Schema Linking 是 NL2SQL 的关键步骤，负责将自然语言中的实体（如"客户"、"销售额"）映射到数据库的具体表和列。
          </p>

          <Playground
            code={`# 数据库 Schema 示例
schema = """
Database Schema:
Table: customers
  - customer_id (INT, PRIMARY KEY)
  - customer_name (VARCHAR)
  - email (VARCHAR)
  - registration_date (DATE)

Table: orders
  - order_id (INT, PRIMARY KEY)
  - customer_id (INT, FOREIGN KEY → customers.customer_id)
  - order_date (DATE)
  - amount (DECIMAL)
  - status (VARCHAR: 'pending', 'completed', 'cancelled')

Table: products
  - product_id (INT, PRIMARY KEY)
  - product_name (VARCHAR)
  - category (VARCHAR)
  - price (DECIMAL)

Table: order_items
  - item_id (INT, PRIMARY KEY)
  - order_id (INT, FOREIGN KEY → orders.order_id)
  - product_id (INT, FOREIGN KEY → products.product_id)
  - quantity (INT)
"""

# 用户问题
question = "找出 2024 年购买过电子产品且订单金额超过 5000 元的客户姓名"

# Schema Linking 输出（手动标注或 LLM 自动识别）
linked_schema = """
涉及表: customers, orders, order_items, products
涉及列:
  - customers.customer_name (输出: 客户姓名)
  - orders.order_date (条件: 2024 年)
  - orders.amount (条件: > 5000)
  - products.category (条件: '电子产品')
  - order_items 用于连接 orders 和 products
外键关系:
  - orders.customer_id → customers.customer_id
  - order_items.order_id → orders.order_id
  - order_items.product_id → products.product_id
"""`}
            language="python"
            highlights={[2, 33, 37]}
            filename="schema_linking.py"
            description="Schema Linking 示例"
          />

          <Callout type="info" title="Schema Linking 策略">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>精确匹配</strong>：直接匹配列名（如"客户姓名" → customer_name）</li>
              <li><strong>语义相似度</strong>：使用 Embedding 计算问题词与列名的相似度</li>
              <li><strong>上下文推理</strong>：根据问题上下文推断隐含的表和列</li>
              <li><strong>外键追踪</strong>：通过外键关系自动发现需要 JOIN 的表</li>
            </ul>
          </Callout>

          <h2 id="prompt-design" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Prompt 设计策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Prompt 的质量直接影响 SQL 生成的准确性。优秀的 Prompt 应包含 Schema 信息、Few-shot 示例和明确的输出格式要求。
          </p>

          <Playground
            code={`from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate

llm = ChatOpenAI(model="gpt-4o", temperature=0)

# NL2SQL Prompt 模板
prompt_template = """你是一个专业的 SQL 专家。根据以下数据库 Schema 和用户问题，生成准确的 SQL 查询。

数据库 Schema:
{schema}

示例 1:
问题: "列出所有客户的姓名和邮箱"
SQL: SELECT customer_name, email FROM customers;

示例 2:
问题: "统计 2024 年的订单总数"
SQL: SELECT COUNT(*) as total_orders FROM orders WHERE YEAR(order_date) = 2024;

示例 3:
问题: "找出销售额最高的前 5 个产品"
SQL: SELECT p.product_name, SUM(oi.quantity * p.price) as total_sales
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
GROUP BY p.product_name
ORDER BY total_sales DESC
LIMIT 5;

现在请回答以下问题：
问题: {question}

要求:
1. 只输出 SQL 语句，不要包含解释
2. 使用标准 SQL 语法
3. 确保表名和列名与 Schema 完全一致
4. 如果需要 JOIN，明确指定 JOIN 条件
5. 对于聚合查询，正确使用 GROUP BY 和 HAVING

SQL:"""

prompt = PromptTemplate(
    input_variables=["schema", "question"],
    template=prompt_template
)

# 生成 SQL
def generate_sql(question: str, schema: str) -> str:
    formatted_prompt = prompt.format(schema=schema, question=question)
    response = llm.invoke(formatted_prompt)
    return response.content.strip()

# 使用示例
schema = "..."  # 数据库 Schema
question = "找出 2024 年购买过电子产品且订单金额超过 5000 元的客户姓名"
sql = generate_sql(question, schema)
print(sql)`}
            language="python"
            highlights={[8, 43, 51]}
            filename="prompt_design.py"
            description="NL2SQL Prompt 设计"
          />

          <SideNote label="Few-shot 示例选择">
            选择与当前问题相似的示例能显著提升准确率。可以使用 Embedding 相似度从示例库中动态检索最相关的 3-5 个示例，而非固定使用同一组示例。
          </SideNote>

          <h2 id="sql-generation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、SQL 生成与优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            LLM 生成的 SQL 可能存在语法错误、性能问题或逻辑偏差，需要进行后处理和优化。
          </p>

          <Playground
            code={`import sqlparse
from sqlglot import parse, transpile

# 原始生成的 SQL（可能有问题）
raw_sql = """
select c.customer_name, sum(o.amount) as total
from customers c, orders o, order_items oi, products p
where c.customer_id = o.customer_id
and o.order_id = oi.order_id
and oi.product_id = p.product_id
and p.category = '电子产品'
and o.order_date >= '2024-01-01' and o.order_date <= '2024-12-31'
group by c.customer_name
having sum(o.amount) > 5000
"""

# 步骤 1：格式化 SQL
formatted_sql = sqlparse.format(raw_sql, reindent=True, keyword_case='upper')
print("格式化后的 SQL:")
print(formatted_sql)

# 步骤 2：转换为标准 JOIN 语法（更易读）
try:
    parsed = parse(raw_sql)[0]
    # sqlglot 可以自动优化 JOIN 写法
    optimized_sql = transpile(raw_sql, read='mysql', write='mysql', pretty=True)[0]
    print("\\n优化后的 SQL:")
    print(optimized_sql)
except Exception as e:
    print(f"解析失败: {e}")

# 步骤 3：添加 LIMIT 防止大数据量查询
def add_limit(sql: str, limit: int = 1000) -> str:
    """为 SELECT 查询添加 LIMIT 子句"""
    if 'limit' not in sql.lower():
        return f"{sql.rstrip(';')}\\nLIMIT {limit};"
    return sql

safe_sql = add_limit(formatted_sql, limit=100)
print("\\n安全查询 SQL:")
print(safe_sql)

# 步骤 4：检测潜在的性能问题
def check_performance_issues(sql: str) -> list[str]:
    """检查 SQL 的性能隐患"""
    issues = []
    
    if 'select *' in sql.lower():
        issues.append("⚠️ 使用 SELECT * 可能导致大量数据传输")
    
    if 'like \'%' in sql.lower():
        issues.append("⚠️ LIKE 以 % 开头无法使用索引")
    
    if sql.lower().count('join') > 3:
        issues.append("⚠️ JOIN 表过多，考虑拆分查询或创建视图")
    
    if 'order by' in sql.lower() and 'limit' not in sql.lower():
        issues.append("⚠️ ORDER BY 无 LIMIT 可能导致全表排序")
    
    return issues

issues = check_performance_issues(raw_sql)
if issues:
    print("\\n性能警告:")
    for issue in issues:
        print(issue)`}
            language="python"
            highlights={[22, 30, 38, 47]}
            filename="sql_optimization.py"
            description="SQL 生成后处理与优化"
          />

          <Callout type="warning" title="SQL 安全检查清单">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>禁止危险操作</strong>：过滤 DROP、DELETE、UPDATE、INSERT 等写操作</li>
              <li><strong>限制返回行数</strong>：自动添加 LIMIT 防止大数据量传输</li>
              <li><strong>超时控制</strong>：设置查询执行超时时间（如 30 秒）</li>
              <li><strong>权限隔离</strong>：使用只读账号执行生成的 SQL</li>
              <li><strong>白名单验证</strong>：只允许访问指定的表和列</li>
            </ul>
          </Callout>

          <h2 id="validation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、结果验证与修正
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            生成的 SQL 可能语法正确但逻辑错误，需要通过执行测试和自我修正机制提高准确性。
          </p>

          <Playground
            code={`import sqlite3
from typing import Optional

class NL2SQLValidator:
    """NL2SQL 验证与修正器"""
    
    def __init__(self, db_path: str):
        self.conn = sqlite3.connect(db_path)
    
    def execute_sql(self, sql: str) -> Optional[list]:
        """执行 SQL 并返回结果"""
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql)
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            return {"columns": columns, "rows": rows}
        except Exception as e:
            return {"error": str(e)}
    
    def validate_and_fix(self, question: str, sql: str, max_retries: int = 3) -> dict:
        """验证 SQL 并在失败时自动修正"""
        
        for attempt in range(max_retries):
            result = self.execute_sql(sql)
            
            # 情况 1：执行成功
            if "error" not in result:
                return {
                    "status": "success",
                    "sql": sql,
                    "result": result,
                    "attempts": attempt + 1
                }
            
            # 情况 2：执行失败，请求 LLM 修正
            error_msg = result["error"]
            print(f"第 {attempt + 1} 次尝试失败: {error_msg}")
            
            # 构建修正 Prompt
            fix_prompt = f"""原始 SQL 执行失败，请根据错误信息修正。

问题: {question}
原始 SQL: {sql}
错误信息: {error_msg}

请生成修正后的 SQL（只输出 SQL 语句）："""
            
            # 调用 LLM 修正
            corrected_sql = llm.invoke(fix_prompt).content.strip()
            sql = corrected_sql
        
        # 达到最大重试次数
        return {
            "status": "failed",
            "sql": sql,
            "error": error_msg,
            "attempts": max_retries
        }

# 使用示例
validator = NL2SQLValidator("database.db")
question = "找出 2024 年购买过电子产品且订单金额超过 5000 元的客户姓名"
initial_sql = generate_sql(question, schema)

result = validator.validate_and_fix(question, initial_sql)

if result["status"] == "success":
    print(f"✅ 查询成功（尝试 {result['attempts']} 次）")
    print(f"SQL: {result['sql']}")
    print(f"结果: {result['result']}")
else:
    print(f"❌ 查询失败: {result['error']}"}`}
            language="python"
            highlights={[11, 23, 42, 58]}
            filename="validation_fix.py"
            description="SQL 验证与自动修正"
          />

          <DiagramBlock title="自我修正循环">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
生成 SQL
    │
    ▼
执行测试 ────→ 成功 ──→ 返回结果
    │
    │ 失败
    ▼
分析错误信息
    │
    ▼
LLM 修正 SQL
    │
    ▼
重试 (最多 N 次)
    │
    ├─ 成功 ──→ 返回结果
    └─ 仍失败 ─→ 报告错误
            `}</pre>
          </DiagramBlock>

          <h2 id="challenges" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、核心挑战与解决方案
          </h2>

          <table className="w-full text-[13px] sm:text-[14px] border-collapse my-5">
            <thead>
              <tr className="bg-parchment-deep border-b border-border">
                <th className="text-left py-2 px-3 font-semibold text-ink">挑战</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">原因</th>
                <th className="text-left py-2 px-3 font-semibold text-ink">解决方案</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr>
                <td className="py-2 px-3 text-ink"><strong>歧义问题</strong></td>
                <td className="py-2 px-3 text-ink-muted">"最近"指多久？"高价值"是多少？</td>
                <td className="py-2 px-3 text-ink-muted">提供默认值或反问澄清</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-ink"><strong>复杂 JOIN</strong></td>
                <td className="py-2 px-3 text-ink-muted">多表关联容易遗漏中间表</td>
                <td className="py-2 px-3 text-ink-muted">外键追踪 + 路径搜索算法</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-ink"><strong>嵌套查询</strong></td>
                <td className="py-2 px-3 text-ink-muted">子查询、CTE 难以生成</td>
                <td className="py-2 px-3 text-ink-muted">分解为多步 + Chain-of-Thought</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-ink"><strong>领域术语</strong></td>
                <td className="py-2 px-3 text-ink-muted">" churn rate" 对应哪列？</td>
                <td className="py-2 px-3 text-ink-muted">构建领域词典 + Embedding 映射</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-ink"><strong>SQL 方言差异</strong></td>
                <td className="py-2 px-3 text-ink-muted">MySQL vs PostgreSQL vs SQLite</td>
                <td className="py-2 px-3 text-ink-muted">明确目标方言 + sqlglot 转换</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`# 挑战 1：处理歧义 - 反问澄清机制
def handle_ambiguity(question: str) -> dict:
    """检测问题中的歧义并生成澄清问题"""
    
    ambiguous_terms = {
        "最近": "您指的'最近'是多长时间？（最近 7 天 / 30 天 / 90 天）",
        "高价值": "'高价值'的具体标准是什么？（订单金额 > 1000 / 5000 / 10000）",
        "活跃用户": "'活跃用户'的定义？（最近登录 / 有下单 / 有浏览）",
        "表现好": "'表现好'的衡量指标？（销售额 / 利润率 / 增长率）"
    }
    
    clarifications = []
    for term, clarification in ambiguous_terms.items():
        if term in question:
            clarifications.append(clarification)
    
    if clarifications:
        return {
            "needs_clarification": True,
            "questions": clarifications
        }
    
    return {"needs_clarification": False}

# 挑战 2：复杂 JOIN 的路径搜索
from collections import defaultdict

def find_join_path(schema: dict, source_table: str, target_table: str) -> list[str]:
    """使用 BFS 查找两个表之间的最短 JOIN 路径"""
    
    # 构建外键图
    foreign_keys = defaultdict(list)
    for table, cols in schema.items():
        for col in cols:
            if col.get('foreign_key'):
                ref_table = col['foreign_key'].split('.')[0]
                foreign_keys[table].append(ref_table)
                foreign_keys[ref_table].append(table)
    
    # BFS 搜索
    from collections import deque
    queue = deque([(source_table, [source_table])])
    visited = {source_table}
    
    while queue:
        current, path = queue.popleft()
        
        if current == target_table:
            return path
        
        for neighbor in foreign_keys[current]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return []  # 未找到路径

# 示例
schema_graph = {
    "customers": ["orders"],
    "orders": ["customers", "order_items"],
    "order_items": ["orders", "products"],
    "products": ["order_items"]
}

path = find_join_path(schema_graph, "customers", "products")
print(f"JOIN 路径: {' → '.join(path)}")
# 输出: customers → orders → order_items → products`}
            language="python"
            highlights={[4, 33, 61]}
            filename="challenge_solutions.py"
            description="核心挑战解决方案"
          />

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、常见误区
          </h2>

          <Callout type="danger" title="误区 1：LLM 生成的 SQL 总是正确的">
            <p className="mb-2"><strong>错误认知</strong>：认为 GPT-4 等强大 LLM 能 100% 准确生成 SQL。</p>
            <p><strong>正确理解</strong>：即使是 GPT-4，在复杂 Schema 或多表 JOIN 场景下也会出错。<strong>必须</strong>实施验证机制（语法检查、执行测试、结果合理性校验）。生产环境建议采用"生成 → 验证 → 修正"的闭环流程。</p>
          </Callout>

          <Callout type="danger" title="误区 2：直接在 Prompt 中放入完整 Schema">
            <p className="mb-2"><strong>错误认知</strong>：认为把整个数据库 Schema 都放进 Prompt 能让 LLM 更了解数据结构。</p>
            <p><strong>正确理解</strong>：大型数据库的 Schema 可能超出 Context Window，且噪声过多会降低准确率。应先通过 Schema Linking 筛选相关表和列，只传递必要信息。对于超大 Schema，可使用向量检索动态加载相关内容。</p>
          </Callout>

          <Callout type="danger" title="误区 3：忽略 SQL 注入风险">
            <p className="mb-2"><strong>错误认知</strong>：认为 LLM 生成的 SQL 天然安全。</p>
            <p><strong>正确理解</strong>：虽然 LLM 不太可能故意生成恶意 SQL，但仍需防范：<strong>①</strong> 使用参数化查询而非字符串拼接；<strong>②</strong> 用只读账号执行查询；<strong>③</strong> 白名单限制可访问的表；<strong>④</strong> 禁止执行写操作（DROP/DELETE/UPDATE）。</p>
          </Callout>

          <Callout type="warning" title="误区 4：不处理边界情况">
            <p className="mb-2"><strong>错误认知</strong>：认为用户问题总是清晰明确的。</p>
            <p><strong>正确理解</strong>：实际问题常含歧义、拼写错误或模糊表述。系统应具备：<strong>①</strong> 拼写纠错能力；<strong>②</strong> 歧义检测和澄清机制；<strong>③</strong> 无法理解时的优雅降级（如返回相关文档或转人工）。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "NL2SQL 的核心技术难点是什么？",
              answer: "① Schema Linking：将自然语言实体准确映射到数据库表和列；② 复杂查询生成：多表 JOIN、嵌套子查询、窗口函数等高级 SQL 特性；③ 歧义处理：用户问题的模糊性和上下文依赖；④ 领域适配：不同行业的术语和业务逻辑差异；⑤ 验证与修正：确保生成的 SQL 语法正确且逻辑符合预期。"
            },
            {
              question: "如何提高 Schema Linking 的准确率？",
              answer: "① 使用 Embedding 计算问题词与列名的语义相似度；② 构建领域词典，映射业务术语到技术字段；③ 利用外键关系自动推导关联表；④ Few-shot Prompting 提供相似问题的映射示例；⑤ 两阶段方法：先粗筛相关表，再精确定位列。"
            },
            {
              question: "NL2SQL 系统中如何防止 SQL 注入？",
              answer: "① 使用只读数据库账号执行生成的 SQL；② 白名单机制，只允许访问预定义的表和列；③ 过滤危险关键字（DROP、DELETE、UPDATE、INSERT 等）；④ 限制查询复杂度（如最大 JOIN 数、禁止子查询）；⑤ 设置执行超时和资源限制；⑥ 审计日志记录所有执行的 SQL。"
            },
            {
              question: "如何处理用户问题中的歧义？",
              answer: "① 歧义检测：识别模糊词汇（如'最近'、'高价值'）；② 反问澄清：向用户确认具体含义；③ 默认值策略：提供合理的默认解释（如'最近'默认为 30 天）；④ 上下文利用：参考历史对话消除歧义；⑤ 多候选方案：生成多个可能的 SQL 让用户选择。"
            },
            {
              question: "NL2SQL 与传统 BI 工具的区别是什么？",
              answer: "传统 BI 工具（如 Tableau、PowerBI）需要用户拖拽字段、配置图表，学习成本高但灵活性强；NL2SQL 允许自然语言提问，门槛低但受限于 LLM 的理解能力。两者可结合：NL2SQL 作为快速探索入口，复杂分析仍用 BI 工具。"
            },
            {
              question: "如何评估 NL2SQL 系统的性能？",
              answer: "① 执行准确率（Execution Accuracy）：生成的 SQL 能否正确执行并返回预期结果；② 匹配准确率（Match Accuracy）：生成的 SQL 与标准答案是否等价；③ 响应时间：从问题到结果的端到端延迟；④ 用户满意度：通过 A/B 测试或调研收集反馈；⑤ 覆盖率：能处理的问题类型占比。"
            },
            {
              question: "NL2SQL 在实际生产中的落地挑战有哪些？",
              answer: "① Schema 复杂性：真实数据库可能有数百张表和数千列；② 数据质量：脏数据、缺失值影响查询结果；③ 性能优化：生成的 SQL 可能效率低下；④ 安全性：防止敏感数据泄露；⑤ 用户期望管理：LLM 不是 100% 准确，需设置合理的用户预期；⑥ 持续迭代：根据用户反馈优化模型和 Prompt。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/06-ai-theory/structured-output" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">结构化输出</div>
              <div className="text-[12px] text-ink-muted mt-1">JSON Schema、Output Parser</div>
            </a>
            <a href="/docs/backend/java/09-database/sql-optimization" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">相关知识 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">SQL 优化与索引</div>
              <div className="text-[12px] text-ink-muted mt-1">查询性能调优</div>
            </a>
            <a href="/docs/06-ai-theory/function-calling" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Function Calling</div>
              <div className="text-[12px] text-ink-muted mt-1">工具调用与数据库集成</div>
            </a>
            <a href="/docs/08-ai-applications/rag-introduction" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-purple mb-1">对比学习 →</div>
              <div className="font-semibold text-ink group-hover:text-purple">RAG 基础</div>
              <div className="text-[12px] text-ink-muted mt-1">检索增强生成</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            NL2SQL 是一个跨学科领域，建议先掌握 SQL 基础和数据库设计原理，再学习 Prompt Engineering 和 LLM 应用开发。可以从简单的单表查询开始，逐步挑战多表 JOIN 和复杂聚合。推荐使用 Spider、BIRD 等公开数据集进行实验。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
