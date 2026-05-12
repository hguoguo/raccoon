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

const meta: KnowledgeNode = {
  id: 'python-basics',
  title: 'Python基础语法',
  level: 'Junior',
  tags: ['Python', '基础语法', '变量', '数据类型', '函数', '类'],
  difficulty: 1,
  category: '01-python-basics',
  prerequisites: [],
  relatedPatterns: ['python-oop', 'python-modules'],
  readingTime: 45,
}

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'variables', text: '一、变量与赋值', level: 2 },
  { id: 'strings', text: '二、字符串操作', level: 2 },
  { id: 'lists', text: '三、列表（list）', level: 2 },
  { id: 'dicts', text: '四、字典（dict）', level: 2 },
  { id: 'sets', text: '五、集合（set）', level: 2 },
  { id: 'conditionals', text: '六、条件判断（if）', level: 2 },
  { id: 'loops', text: '七、循环（for / while）', level: 2 },
  { id: 'functions', text: '八、函数定义', level: 2 },
  { id: 'classes', text: '九、类与对象', level: 2 },
  { id: 'imports', text: '十、模块导入', level: 2 },
  { id: 'json', text: '十一、JSON处理', level: 2 },
  { id: 'typing', text: '十二、类型标注', level: 2 },
  { id: 'exceptions', text: '十三、异常处理', level: 2 },
  { id: 'misconceptions', text: '十四、常见误区', level: 2 },
  { id: 'interview', text: '十五、面试真题', level: 2 },
  { id: 'related', text: '十六、知识关联', level: 2 },
]

export default function PythonBasics() {
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
              Python 是一种<strong className="text-accent">高级、解释型、动态类型</strong>的编程语言，以简洁优雅的语法著称，
              强调代码可读性，支持多种编程范式（面向对象、函数式、过程式），广泛应用于Web开发、数据分析、人工智能等领域。
            </p>
          </blockquote>

          <Callout type="tip" title="核心特点">
            Python 采用缩进表示代码块，无需分号结尾；变量无需声明类型，运行时自动推断；拥有丰富的标准库和第三方生态。
          </Callout>

          {/* ========== 一、变量与赋值 ========== */}
          <h2 id="variables" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、变量与赋值
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Python 中的变量是对象的引用，不需要显式声明类型。赋值使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">=</code> 运算符。
          </p>

          <Playground
            code={`# 基本赋值
name = "Alice"
age = 25
height = 1.75
is_student = True

# 多重赋值
x, y, z = 1, 2, 3

# 链式赋值
a = b = c = 10

# 查看变量类型
print(type(name))    # <class 'str'>
print(type(age))     # <class 'int'>
print(type(height))  # <class 'float'>`}
            language="python"
            highlights={[2, 5, 8]}
            filename="variables.py"
            description="Python 变量赋值示例"
          />

          <SideNote label="命名规范">
            Python 变量名只能包含字母、数字和下划线，不能以数字开头。推荐使用小写字母加下划线的命名风格（snake_case），如 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">user_name</code>。
          </SideNote>

          {/* ========== 二、字符串操作 ========== */}
          <h2 id="strings" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、字符串操作
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Python 字符串是不可变的序列，支持单引号、双引号和三引号。提供丰富的内置方法进行操作。
          </p>

          <Playground
            code={`# 字符串定义
single = 'Hello'
double = "World"
triple = """多行
字符串"""

# 字符串拼接
greeting = single + " " + double

# f-string 格式化（推荐）
name = "Alice"
age = 25
message = f"My name is {name}, I'm {age} years old"

# 常用方法
text = "  Hello World  "
print(text.strip())        # "Hello World"
print(text.lower())        # "  hello world  "
print(text.upper())        # "  HELLO WORLD  "
print(text.replace("World", "Python"))  # "  Hello Python  "
print(text.split())        # ['Hello', 'World']

# 字符串切片
s = "Python"
print(s[0])      # "P"
print(s[-1])     # "n"
print(s[0:3])    # "Pyt"
print(s[::-1])   # "nohtyP"（反转）`}
            language="python"
            highlights={[11, 17, 24]}
            filename="strings.py"
            description="Python 字符串常用操作"
          />

          <Callout type="info" title="f-string 优势">
            f-string（Python 3.6+）是最推荐的字符串格式化方式，性能优于 <code className="font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]">.format()</code> 和 <code className="font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]">%</code> 格式化，且更直观易读。
          </Callout>

          {/* ========== 三、列表（list） ========== */}
          <h2 id="lists" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、列表（list）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            列表是 Python 中最常用的可变有序序列，可以存储任意类型的元素。
          </p>

          <Playground
            code={`# 创建列表
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# 访问元素
print(fruits[0])      # "apple"
print(fruits[-1])     # "cherry"

# 修改元素
fruits[1] = "orange"

# 添加元素
fruits.append("grape")           # 末尾添加
fruits.insert(0, "melon")        # 指定位置插入
fruits.extend(["kiwi", "mango"]) # 合并列表

# 删除元素
fruits.remove("banana")  # 按值删除
del fruits[0]            # 按索引删除
last = fruits.pop()      # 弹出末尾元素

# 列表推导式（重要！）
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]

# 常用操作
print(len(fruits))       # 长度
print("apple" in fruits) # 成员检查
print(sorted(numbers))   # 排序（返回新列表）
numbers.sort()           # 原地排序
numbers.reverse()        # 反转`}
            language="python"
            highlights={[13, 19, 23]}
            filename="lists.py"
            description="Python 列表操作大全"
          />

          <SideNote label="性能提示">
            列表查找元素的时间复杂度为 O(n)，如果需要频繁查找，建议使用集合（set）或字典（dict），它们的查找复杂度为 O(1)。
          </SideNote>

          {/* ========== 四、字典（dict） ========== */}
          <h2 id="dicts" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、字典（dict）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            字典是键值对（key-value）的无序集合，基于哈希表实现，提供快速的查找、插入和删除操作。
          </p>

          <Playground
            code={`# 创建字典
student = {
    "name": "Alice",
    "age": 25,
    "major": "Computer Science"
}

# 访问值
print(student["name"])        # "Alice"
print(student.get("age"))     # 25
print(student.get("grade", "N/A"))  # "N/A"（默认值）

# 修改和添加
student["age"] = 26
student["grade"] = "A"

# 删除
del student["major"]
age = student.pop("age")

# 遍历字典
for key, value in student.items():
    print(f"{key}: {value}")

# 字典推导式
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 常用方法
print(student.keys())    # 所有键
print(student.values())  # 所有值
print(len(student))      # 键值对数量`}
            language="python"
            highlights={[11, 18, 23]}
            filename="dicts.py"
            description="Python 字典操作示例"
          />

          <Callout type="warning" title="注意事项">
            字典的键必须是不可变类型（如字符串、数字、元组），不能使用列表或字典作为键。访问不存在的键会抛出 KeyError，建议使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">.get()</code> 方法提供默认值。
          </Callout>

          {/* ========== 五、集合（set） ========== */}
          <h2 id="sets" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、集合（set）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            集合是无序且不重复的元素集合，基于哈希表实现，常用于去重和集合运算。
          </p>

          <Playground
            code={`# 创建集合
fruits = {"apple", "banana", "cherry"}
numbers = set([1, 2, 3, 4, 5])

# 去重示例
duplicates = [1, 2, 2, 3, 3, 3]
unique = list(set(duplicates))  # [1, 2, 3]

# 添加和删除
fruits.add("orange")
fruits.remove("banana")  # 不存在会报错
fruits.discard("grape")  # 不存在不会报错

# 集合运算
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)   # 并集: {1, 2, 3, 4, 5, 6}
print(a & b)   # 交集: {3, 4}
print(a - b)   # 差集: {1, 2}
print(a ^ b)   # 对称差集: {1, 2, 5, 6}

# 成员检查（O(1)）
print(1 in a)   # True
print(10 in a)  # False`}
            language="python"
            highlights={[7, 18, 21]}
            filename="sets.py"
            description="Python 集合操作与运算"
          />

          {/* ========== 六、条件判断（if） ========== */}
          <h2 id="conditionals" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、条件判断（if）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Python 使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">if-elif-else</code> 结构进行条件判断，通过缩进表示代码块。
          </p>

          <Playground
            code={`# 基本 if-else
age = 20
if age >= 18:
    print("成年人")
else:
    print("未成年人")

# if-elif-else
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "D"

# 三元表达式（条件表达式）
status = "成年" if age >= 18 else "未成年"

# 逻辑运算符
x = 10
if x > 0 and x < 100:
    print("在范围内")

if not x == 0:
    print("非零")

# 成员运算符
fruits = ["apple", "banana"]
if "apple" in fruits:
    print("有苹果")

# 身份运算符
a = [1, 2, 3]
b = a
if a is b:
    print("同一对象")`}
            language="python"
            highlights={[10, 20, 27]}
            filename="conditionals.py"
            description="Python 条件判断示例"
          />

          <SideNote label="Pythonic 写法">
            Python 中可以使用链式比较，如 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">0 {'<'} x {'<'} 100</code>，比 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">x {'>'} 0 and x {'<'} 100</code> 更简洁优雅。
          </SideNote>

          {/* ========== 七、循环（for / while） ========== */}
          <h2 id="loops" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、循环（for / while）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Python 提供 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">for</code> 和 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">while</code> 两种循环结构，<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">for</code> 通常用于遍历序列。
          </p>

          <Playground
            code={`# for 循环遍历列表
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# 带索引的遍历
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# range() 生成序列
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 2): # 2, 4, 6, 8
    print(i)

# while 循环
count = 0
while count < 5:
    print(count)
    count += 1

# break 和 continue
for i in range(10):
    if i == 3:
        continue  # 跳过本次循环
    if i == 7:
        break     # 退出循环
    print(i)

# 列表推导式（替代简单 for 循环）
squares = [x**2 for x in range(10)]

# 字典推导式
square_dict = {x: x**2 for x in range(5)}`}
            language="python"
            highlights={[7, 11, 24]}
            filename="loops.py"
            description="Python 循环结构示例"
          />

          <Callout type="tip" title="enumerate() 的优势">
            使用 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">enumerate()</code> 可以同时获取索引和值，避免了手动维护计数器，代码更 Pythonic。
          </Callout>

          {/* ========== 八、函数定义 ========== */}
          <h2 id="functions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、函数定义
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            函数使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">def</code> 关键字定义，支持默认参数、可变参数和关键字参数。
          </p>

          <Playground
            code={`# 基本函数
def greet(name):
    """打招呼函数"""
    return f"Hello, {name}!"

print(greet("Alice"))  # "Hello, Alice!"

# 默认参数
def power(base, exponent=2):
    return base ** exponent

print(power(3))      # 9
print(power(3, 3))   # 27

# 可变参数 *args
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3, 4))  # 10

# 关键字参数 **kwargs
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25)

# Lambda 匿名函数
square = lambda x: x ** 2
print(square(5))  # 25

# 高阶函数
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))`}
            language="python"
            highlights={[9, 16, 23]}
            filename="functions.py"
            description="Python 函数定义与使用"
          />

          <SideNote label="文档字符串">
            函数开头的字符串称为 docstring，用于说明函数功能。可以通过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">function.__doc__</code> 或 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">help(function)</code> 查看。
          </SideNote>

          {/* ========== 九、类与对象 ========== */}
          <h2 id="classes" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、类与对象
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Python 支持面向对象编程，使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">class</code> 关键字定义类，<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">__init__</code> 是构造方法。
          </p>

          <Playground
            code={`class Student:
    """学生类"""
    
    # 类属性
    school = "XYZ University"
    
    def __init__(self, name, age, major):
        # 实例属性
        self.name = name
        self.age = age
        self.major = major
    
    def introduce(self):
        """自我介绍"""
        return f"I'm {self.name}, {self.age} years old, majoring in {self.major}"
    
    @staticmethod
    def is_adult(age):
        """静态方法：判断是否成年"""
        return age >= 18
    
    @classmethod
    def get_school(cls):
        """类方法：获取学校名称"""
        return cls.school

# 创建对象
student = Student("Alice", 20, "Computer Science")
print(student.introduce())
print(Student.is_adult(20))
print(Student.get_school())

# 继承
class GraduateStudent(Student):
    def __init__(self, name, age, major, thesis):
        super().__init__(name, age, major)
        self.thesis = thesis
    
    def introduce(self):
        base = super().introduce()
        return f"{base}. Thesis: {self.thesis}"

grad = GraduateStudent("Bob", 25, "AI", "Deep Learning")
print(grad.introduce())`}
            language="python"
            highlights={[7, 18, 23]}
            filename="classes.py"
            description="Python 类与面向对象"
          />

          <Callout type="info" title="self 的作用">
            <code className="font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]">self</code> 代表实例本身，必须作为方法的第一个参数。它类似于 Java 中的 <code className="font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]">this</code>，但需要显式声明。
          </Callout>

          {/* ========== 十、模块导入 ========== */}
          <h2 id="imports" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、模块导入
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Python 使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">import</code> 语句导入模块，支持多种导入方式。
          </p>

          <Playground
            code={`# 导入整个模块
import math
print(math.sqrt(16))  # 4.0

# 导入特定函数
from math import sqrt, pi
print(sqrt(16))       # 4.0
print(pi)             # 3.14159...

# 导入并重命名
import numpy as np
import pandas as pd

# 导入所有（不推荐）
from os import *

# 自定义模块导入
# 假设有文件 mymodule.py
# from mymodule import my_function

# 条件导入
try:
    import ujson as json
except ImportError:
    import json`}
            language="python"
            highlights={[2, 6, 11]}
            filename="imports.py"
            description="Python 模块导入方式"
          />

          <SideNote label="PEP 8 规范">
            根据 PEP 8 规范，导入语句应按以下顺序分组：标准库、第三方库、本地应用库。每组之间空一行。避免使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">from module import *</code>，会导致命名空间污染。
          </SideNote>

          {/* ========== 十一、JSON处理 ========== */}
          <h2 id="json" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、JSON处理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Python 内置 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">json</code> 模块，用于 JSON 数据的序列化和反序列化。
          </p>

          <Playground
            code={`import json

# Python 对象 -> JSON 字符串（序列化）
data = {
    "name": "Alice",
    "age": 25,
    "courses": ["Math", "Science"],
    "address": {
        "city": "Beijing",
        "zipcode": "100000"
    }
}

json_str = json.dumps(data, indent=2, ensure_ascii=False)
print(json_str)

# JSON 字符串 -> Python 对象（反序列化）
json_input = '{"name": "Bob", "age": 30}'
parsed = json.loads(json_input)
print(parsed["name"])  # "Bob"

# 读写 JSON 文件
# 写入文件
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# 读取文件
with open("data.json", "r", encoding="utf-8") as f:
    loaded_data = json.load(f)
    print(loaded_data)`}
            language="python"
            highlights={[14, 19, 25]}
            filename="json_handling.py"
            description="Python JSON 处理示例"
          />

          <Callout type="warning" title="中文编码问题">
            使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">json.dumps()</code> 时，务必设置 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">ensure_ascii=False</code>，否则中文字符会被转义为 Unicode 编码。
          </Callout>

          {/* ========== 十二、类型标注 ========== */}
          <h2 id="typing" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、类型标注（Type Hints）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Python 3.5+ 引入类型标注，虽然不影响运行时行为，但能提高代码可读性并支持静态类型检查工具（如 mypy）。
          </p>

          <Playground
            code={`from typing import List, Dict, Optional, Union, Tuple

# 基本类型标注
def greet(name: str) -> str:
    return f"Hello, {name}!"

# 复杂类型
def process_items(items: List[int]) -> Dict[str, int]:
    return {"count": len(items), "sum": sum(items)}

# 可选类型
def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)

# 联合类型
def parse_value(value: Union[str, int]) -> str:
    return str(value)

# 元组类型
def get_coordinates() -> Tuple[float, float]:
    return (40.7128, -74.0060)

# 变量类型标注
age: int = 25
name: str = "Alice"
scores: List[float] = [95.5, 87.3, 92.1]

# 类类型标注
class Person:
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age

def create_person(name: str, age: int) -> Person:
    return Person(name, age)`}
            language="python"
            highlights={[4, 8, 12]}
            filename="type_hints.py"
            description="Python 类型标注示例"
          />

          <SideNote label="类型检查工具">
            安装 mypy 进行静态类型检查：<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">pip install mypy</code>，然后运行 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">mypy your_file.py</code> 检查类型错误。
          </SideNote>

          {/* ========== 十三、异常处理 ========== */}
          <h2 id="exceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十三、异常处理（try-except）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Python 使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">try-except</code> 结构捕获和处理异常，保证程序的健壮性。
          </p>

          <Playground
            code={`# 基本异常处理
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"错误: {e}")  # 错误: division by zero

# 多个 except
try:
    num = int(input("输入数字: "))
    result = 10 / num
except ValueError:
    print("无效的数字")
except ZeroDivisionError:
    print("不能除以零")

# else 和 finally
try:
    file = open("test.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("文件不存在")
else:
    print("读取成功")  # 无异常时执行
finally:
    print("清理工作")  # 总是执行
    # file.close()

# 主动抛出异常
def validate_age(age):
    if age < 0:
        raise ValueError("年龄不能为负数")
    if age > 150:
        raise ValueError("年龄不合理")
    return True

# 自定义异常
class MyException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

try:
    raise MyException("自定义错误")
except MyException as e:
    print(e.message)`}
            language="python"
            highlights={[4, 11, 23]}
            filename="exceptions.py"
            description="Python 异常处理机制"
          />

          <Callout type="danger" title="避免裸 except">
            不要使用空的 <code className="font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]">except:</code>，这会捕获所有异常（包括 KeyboardInterrupt），导致难以调试。应该明确指定要捕获的异常类型。
          </Callout>

          {/* ========== 十四、常见误区 ========== */}
          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十四、常见误区
          </h2>

          <Callout type="danger" title="误区1：可变默认参数">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] mb-2">
              <strong>错误做法：</strong>
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm mb-3 overflow-x-auto">
              <code className="text-[12px] sm:text-[13px] font-mono text-ink-muted">
{`def append_to(item, lst=[]):
    lst.append(item)
    return lst`}
              </code>
            </pre>
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <strong>问题：</strong>默认列表只在函数定义时创建一次，多次调用会共享同一个列表。<br/>
              <strong>正确做法：</strong>使用 <code className="font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]">None</code> 作为默认值。
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm overflow-x-auto">
              <code className="text-[12px] sm:text-[13px] font-mono text-ink-muted">
{`def append_to(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst`}
              </code>
            </pre>
          </Callout>

          <Callout type="danger" title="误区2：浅拷贝 vs 深拷贝">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] mb-2">
              <strong>问题：</strong><code className="font-mono text-[12px] bg-parchment-warm text-rose-deep px-[5px] py-[2px] rounded-[3px]">list2 = list1</code> 只是引用赋值，修改 list2 会影响 list1。
            </p>
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <strong>解决：</strong>使用 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">list2 = list1.copy()</code>（浅拷贝）或 <code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">import copy; list2 = copy.deepcopy(list1)</code>（深拷贝）。
            </p>
          </Callout>

          <Callout type="danger" title="误区3：在循环中修改列表">
            <p className="text-[13px] sm:text-[14px] leading-[1.7] mb-2">
              <strong>错误做法：</strong>
            </p>
            <pre className="bg-parchment-deep p-3 rounded-paper-sm mb-3 overflow-x-auto">
              <code className="text-[12px] sm:text-[13px] font-mono text-ink-muted">
{`numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # 会跳过某些元素`}
              </code>
            </pre>
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <strong>正确做法：</strong>使用列表推导式创建新列表：<code className="font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]">numbers = [n for n in numbers if n % 2 != 0]</code>
            </p>
          </Callout>

          <Callout type="warning" title="误区4：== 与 is 的区别">
            <p className="text-[13px] sm:text-[14px] leading-[1.7]">
              <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">==</code> 比较值是否相等，<code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">is</code> 比较是否是同一对象（内存地址）。对于小整数和短字符串，Python 会缓存对象，导致 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">is</code> 可能返回 True，但这不是可靠的行为。
            </p>
          </Callout>

          {/* ========== 十五、面试真题 ========== */}
          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十五、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "Python 中列表和元组的区别是什么？",
              answer: "列表（list）是可变的，可以修改、添加、删除元素；元组（tuple）是不可变的，一旦创建就不能修改。元组可以作为字典的键，而列表不行。元组通常用于存储异构数据（如坐标、记录），列表用于存储同构数据集合。元组的性能略优于列表。"
            },
            {
              question: "什么是 Python 的 GIL（全局解释器锁）？",
              answer: "GIL 是 CPython 解释器中的一个互斥锁，确保同一时刻只有一个线程执行 Python 字节码。这意味着即使在多核 CPU 上，Python 的多线程也无法真正实现并行计算。对于 CPU 密集型任务，应使用多进程（multiprocessing）而非多线程；对于 I/O 密集型任务，多线程仍然有效。"
            },
            {
              question: "Python 中的装饰器是什么？如何使用？",
              answer: "装饰器是一个接受函数作为参数并返回新函数的高阶函数，用于在不修改原函数代码的情况下增强其功能。使用 @ 语法糖应用装饰器。常见用途包括日志记录、权限验证、缓存、计时等。例如：@login_required、@cache、@timer。"
            },
            {
              question: "解释 Python 的垃圾回收机制。",
              answer: "Python 主要使用引用计数进行垃圾回收，当对象的引用计数降为 0 时立即释放内存。此外，还有标记-清除（mark-sweep）算法处理循环引用，以及分代回收（generational collection）优化性能，将对象分为三代（0、1、2），新生代对象更频繁地被检查。"
            },
            {
              question: "__init__ 和 __new__ 有什么区别？",
              answer: "__new__ 是静态方法，负责创建并返回实例对象，在 __init__ 之前调用；__init__ 是实例方法，负责初始化已创建的实例，无返回值。通常只需重写 __init__，只有在需要控制实例创建过程（如单例模式、不可变类型子类化）时才需要重写 __new__。"
            },
            {
              question: "Python 中的生成器（generator）是什么？有什么优势？",
              answer: "生成器是使用 yield 关键字的函数，返回一个迭代器对象，按需生成值而非一次性生成所有值。优势是节省内存（惰性求值），适合处理大数据流或无限序列。可以用生成器表达式创建，如 (x**2 for x in range(1000000))。"
            },
            {
              question: "如何实现 Python 的单例模式？",
              answer: "有多种实现方式：1) 使用模块（Python 模块天然单例）；2) 使用类变量和 __new__ 方法控制实例创建；3) 使用装饰器；4) 使用元类。最 Pythonic 的方式是使用模块或 Borg 模式（共享状态）。"
            }
          ]} />

          {/* ========== 十六、知识关联 ========== */}
          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十六、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            掌握 Python 基础语法后，建议继续学习以下内容：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
            <a href="/docs/python-advanced/python-oop" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">进阶</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">Python 面向对象高级</div>
              <div className="text-[13px] text-ink-muted mt-1">魔术方法、元类、描述符</div>
            </a>
            <a href="/docs/python-advanced/python-modules" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">进阶</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">Python 模块与包</div>
              <div className="text-[13px] text-ink-muted mt-1">包管理、虚拟环境、发布</div>
            </a>
            <a href="/docs/python-data/python-collections" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">数据结构</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">Python 高级数据结构</div>
              <div className="text-[13px] text-ink-muted mt-1">deque、Counter、defaultdict</div>
            </a>
            <a href="/docs/python-concurrent/python-async" className="block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group">
              <div className="text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1">并发</div>
              <div className="font-semibold text-[15px] text-ink group-hover:text-accent transition-colors">异步编程（asyncio）</div>
              <div className="text-[13px] text-ink-muted mt-1">协程、事件循环、异步IO</div>
            </a>
          </div>

        </KnowledgeLayout>
      </div>

      {/* TOC Sidebar */}
      <SmartTOC items={tocItems} />

      {/* Article Navigation */}
      <ArticleNav {...getArticleNav(meta.category, meta.id)} />
    </div>
  )
}
