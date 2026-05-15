import{j as e,g as i}from"./index-hyqxTCwJ.js";import{K as o}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as n}from"./SideNote-BKvanovA.js";import{C as t,A as r,S as p}from"./ArticleNav-DhfiS38Y.js";import{I as c}from"./InterviewSection-BBNdwyyN.js";const d=[{id:"definition",text:"一句话定义",level:2},{id:"async-await",text:"一、async/await 基础",level:2},{id:"asyncio",text:"二、asyncio 事件循环",level:2},{id:"coroutines",text:"三、协程深入理解",level:2},{id:"concurrent-tasks",text:"四、并发任务管理",level:2},{id:"aiohttp",text:"五、aiohttp HTTP 客户端",level:2},{id:"httpx",text:"六、httpx 现代 HTTP 库",level:2},{id:"misconceptions",text:"七、常见误区",level:2},{id:"interview",text:"八、面试真题",level:2},{id:"related",text:"九、知识关联",level:2}];function g({meta:a}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(o,{meta:a,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["Python 异步编程是基于",e.jsx("strong",{className:"text-accent",children:"协程（coroutine）"}),"和",e.jsx("strong",{className:"text-accent",children:"事件循环（event loop）"}),"的并发模型， 通过 async/await 语法实现非阻塞 I/O 操作，在单线程中高效处理大量并发任务， 特别适用于网络请求、文件 I/O、数据库操作等 I/O 密集型场景。"]})}),e.jsx(t,{type:"tip",title:"核心优势",children:"异步编程不是让代码跑得更快，而是让程序在等待 I/O 时不阻塞，可以处理其他任务。 对于 Web 服务器、爬虫、实时应用等场景，可以用更少的资源支撑更高的并发量。"}),e.jsx("h2",{id:"async-await",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、async/await 基础"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"async"})," 定义协程函数，",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"await"})," 等待异步操作完成。 这是 Python 3.5+ 引入的现代异步语法。"]}),e.jsx(s,{code:`import asyncio
import time

# 定义协程函数
async def say_hello(name: str, delay: float):
    """异步打招呼函数"""
    print(f"[{time.strftime('%H:%M:%S')}] {name} 开始等待...")
    await asyncio.sleep(delay)  # 非阻塞等待
    print(f"[{time.strftime('%H:%M:%S')}] {name} 说：你好！")
    return f"Hello from {name}"

# 运行单个协程
async def main():
    result = await say_hello("Alice", 2)
    print(result)

# 方式1：使用 asyncio.run()（推荐，Python 3.7+）
asyncio.run(main())

# 并发执行多个协程
async def concurrent_example():
    print("\\n=== 并发执行 ===")
    start = time.time()
    
    # 同时启动三个任务
    task1 = say_hello("Alice", 2)
    task2 = say_hello("Bob", 1)
    task3 = say_hello("Charlie", 3)
    
    # 等待所有任务完成
    results = await asyncio.gather(task1, task2, task3)
    
    end = time.time()
    print(f"\\n总耗时: {end - start:.2f}秒")  # 约3秒，而非6秒
    print(f"结果: {results}")

asyncio.run(concurrent_example())`,language:"python",highlights:[5,15,27],filename:"async_await_basics.py",description:"async/await 基础用法"}),e.jsxs(n,{label:"asyncio.sleep vs time.sleep",children:[e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"asyncio.sleep()"})," 是非阻塞的，会让出控制权给事件循环； 而 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"time.sleep()"})," 会阻塞整个线程，导致其他协程无法执行。 在异步代码中永远使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"asyncio.sleep()"}),"。"]}),e.jsxs(t,{type:"info",title:"asyncio.gather 的优势",children:[e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-sky-deep px-[5px] py-[2px] rounded-[3px]",children:"asyncio.gather()"})," 会并发执行所有协程，总耗时取决于最慢的任务， 而非所有任务耗时之和。这是异步编程提升性能的关键。"]}),e.jsx("h2",{id:"asyncio",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、asyncio 事件循环"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"事件循环是异步编程的核心，它负责调度和执行协程、处理 I/O 事件、管理定时器等。 理解事件循环的工作原理对编写高效的异步代码至关重要。"}),e.jsx(s,{code:`import asyncio
import time

# 模拟 I/O 密集型任务
async def fetch_data(source: str, delay: float):
    """模拟从数据源获取数据"""
    print(f"开始从 {source} 获取数据...")
    await asyncio.sleep(delay)
    print(f"从 {source} 获取数据完成")
    return {"source": source, "data": f"data_from_{source}"}

async def event_loop_demo():
    print("=== 事件循环演示 ===\\n")
    
    # 1. 创建任务（Task）
    task1 = asyncio.create_task(fetch_data("API-1", 2))
    task2 = asyncio.create_task(fetch_data("API-2", 1))
    task3 = asyncio.create_task(fetch_data("API-3", 3))
    
    print("所有任务已启动，等待完成...\\n")
    
    # 2. 等待任务完成
    results = await asyncio.gather(task1, task2, task3)
    
    print(f"\\n获取到 {len(results)} 个结果")
    
    # 3. 超时控制
    print("\\n=== 超时控制 ===")
    try:
        await asyncio.wait_for(fetch_data("slow-api", 10), timeout=2)
    except asyncio.TimeoutError:
        print("请求超时！")

asyncio.run(event_loop_demo())`,language:"python",highlights:[14,17,27],filename:"event_loop.py",description:"asyncio 事件循环高级用法"}),e.jsxs(t,{type:"warning",title:"避免阻塞事件循环",children:["在协程中执行 CPU 密集型任务或同步 I/O 操作会阻塞整个事件循环。应使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"run_in_executor()"})," 将同步代码放到线程池或进程池中执行。"]}),e.jsx("h2",{id:"coroutines",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、协程深入理解"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"协程是可以暂停和恢复的特殊函数。与线程不同，协程由程序员显式控制切换时机， 避免了线程上下文切换的开销和竞态条件问题。"}),e.jsx(s,{code:`import asyncio

# 协程的状态机本质
async def producer_consumer():
    """生产者-消费者模式"""
    queue = asyncio.Queue(maxsize=5)
    
    async def producer(name: str):
        for i in range(5):
            item = f"{name}-item-{i}"
            await queue.put(item)
            print(f"[生产者] {name} 生产: {item}")
            await asyncio.sleep(0.5)
    
    async def consumer(name: str):
        while True:
            item = await queue.get()
            print(f"[消费者] {name} 消费: {item}")
            await asyncio.sleep(1)
            queue.task_done()
            if queue.empty():
                break
    
    prod1 = asyncio.create_task(producer("P1"))
    cons1 = asyncio.create_task(consumer("C1"))
    
    await prod1
    await cons1
    print("生产者-消费者模式完成")

asyncio.run(producer_consumer())`,language:"python",highlights:[5,9,17],filename:"coroutines_deep.py",description:"协程高级模式和生命周期"}),e.jsxs(t,{type:"info",title:"协程 vs 线程 vs 进程",children:[e.jsx("strong",{children:"协程："}),"用户态调度，轻量级（数千个协程只需少量内存），无锁竞争，适合 I/O 密集型。",e.jsx("br",{}),e.jsx("strong",{children:"线程："}),"内核态调度，中等开销，需要锁机制，适合混合 I/O 和 CPU 任务。",e.jsx("br",{}),e.jsx("strong",{children:"进程："}),"独立内存空间，重量级，完全隔离，适合 CPU 密集型并行计算。"]}),e.jsx("h2",{id:"concurrent-tasks",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、并发任务管理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["asyncio 提供多种工具来管理并发任务：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"gather"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"wait"}),"、",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"Semaphore"})," 等。"]}),e.jsx(s,{code:`import asyncio
import random

async def download_file(file_id: int, delay: float):
    """模拟下载文件"""
    print(f"开始下载文件 {file_id}...")
    await asyncio.sleep(delay)
    print(f"文件 {file_id} 下载完成")
    return f"file-{file_id}.zip"

# 1. asyncio.gather - 等待所有任务
async def gather_example():
    tasks = [download_file(i, random.uniform(0.5, 2)) for i in range(5)]
    results = await asyncio.gather(*tasks)
    print(f"下载了 {len(results)} 个文件")

# 2. Semaphore - 限制并发数
async def semaphore_example():
    semaphore = asyncio.Semaphore(3)  # 最多3个并发
    
    async def limited_download(file_id: int):
        async with semaphore:
            print(f"下载文件 {file_id}")
            await asyncio.sleep(random.uniform(0.5, 2))
    
    tasks = [limited_download(i) for i in range(10)]
    await asyncio.gather(*tasks)

# 3. 超时和重试
async def timeout_retry_example():
    async def unreliable_api(call_id: int):
        await asyncio.sleep(random.uniform(0.5, 3))
        if random.random() < 0.5:
            raise ConnectionError("连接失败")
        return f"response-{call_id}"
    
    max_retries = 3
    for attempt in range(max_retries):
        try:
            result = await asyncio.wait_for(
                unreliable_api(attempt), 
                timeout=2
            )
            print(f"成功: {result}")
            break
        except (asyncio.TimeoutError, ConnectionError) as e:
            print(f"尝试 {attempt + 1} 失败: {e}")

async def main():
    await gather_example()
    await semaphore_example()
    await timeout_retry_example()

asyncio.run(main())`,language:"python",highlights:[12,18,30],filename:"task_management.py",description:"并发任务管理完整示例"}),e.jsxs(n,{label:"选择正确的并发工具",children:[e.jsx("strong",{children:"gather："}),"简单场景，等待所有任务完成。",e.jsx("br",{}),e.jsx("strong",{children:"wait："}),"需要精细控制（如 FIRST_COMPLETED、timeout）。",e.jsx("br",{}),e.jsx("strong",{children:"Semaphore："}),"限制并发数量，避免资源耗尽。"]}),e.jsx("h2",{id:"aiohttp",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、aiohttp HTTP 客户端"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["aiohttp 是最流行的异步 HTTP 客户端/服务器框架，支持异步请求、WebSocket、流式响应等。 安装：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"pip install aiohttp"})]}),e.jsx(s,{code:`import aiohttp
import asyncio

# 基本 GET 请求
async def basic_get():
    async with aiohttp.ClientSession() as session:
        async with session.get('https://jsonplaceholder.typicode.com/posts/1') as response:
            print(f"状态码: {response.status}")
            data = await response.json()
            print(f"标题: {data['title']}")

# POST 请求
async def post_request():
    async with aiohttp.ClientSession() as session:
        payload = {'title': 'foo', 'body': 'bar', 'userId': 1}
        async with session.post(
            'https://jsonplaceholder.typicode.com/posts',
            json=payload
        ) as response:
            result = await response.json()
            print(f"创建成功, ID: {result['id']}")

# 并发请求
async def fetch_url(session: aiohttp.ClientSession, url: str):
    async with session.get(url) as response:
        return await response.json()

async def concurrent_requests():
    urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
    ]
    
    async with aiohttp.ClientSession() as session:
        tasks = []
        for url in urls:
            task = asyncio.create_task(fetch_url(session, url))
            tasks.append(task)
        
        results = await asyncio.gather(*tasks)
        for i, result in enumerate(results, 1):
            print(f"帖子 {i}: {result['title'][:30]}...")

async def main():
    await basic_get()
    await post_request()
    await concurrent_requests()

asyncio.run(main())`,language:"python",highlights:[5,13,28],filename:"aiohttp_client.py",description:"aiohttp 客户端完整示例"}),e.jsxs(t,{type:"tip",title:"ClientSession 复用",children:["应该复用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]",children:"ClientSession"})," 而非为每个请求创建新会话。 Session 内部维护连接池，复用 TCP 连接可显著提升性能。将其作为上下文管理器使用确保正确关闭。"]}),e.jsx("h2",{id:"httpx",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、httpx 现代 HTTP 库"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["httpx 是新一代 HTTP 客户端库，API 设计与 requests 兼容，同时原生支持异步。 安装：",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"pip install httpx"})]}),e.jsx(s,{code:`import httpx
import asyncio

# 异步用法
async def async_example():
    async with httpx.AsyncClient() as client:
        response = await client.get('https://jsonplaceholder.typicode.com/posts/1')
        print(f"状态码: {response.status_code}")
        print(f"标题: {response.json()['title']}")

# 并发请求
async def concurrent_httpx():
    urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
    ]
    
    async with httpx.AsyncClient() as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)
        
        for i, response in enumerate(responses, 1):
            data = response.json()
            print(f"帖子 {i}: {data['title'][:30]}...")

# POST 请求
async def post_with_httpx():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            'https://jsonplaceholder.typicode.com/posts',
            json={'title': 'foo', 'body': 'bar', 'userId': 1}
        )
        print(f"创建成功: {response.json()['id']}")

# 运行示例
if __name__ == "__main__":
    asyncio.run(async_example())
    asyncio.run(concurrent_httpx())
    asyncio.run(post_with_httpx())`,language:"python",highlights:[5,12,28],filename:"httpx_client.py",description:"httpx 同步和异步用法"}),e.jsxs(n,{label:"aiohttp vs httpx",children:[e.jsx("strong",{children:"aiohttp："}),"功能丰富，成熟稳定，支持 WebSocket 和服务器端，但 API 较复杂。",e.jsx("br",{}),e.jsx("strong",{children:"httpx："}),"API 简洁，与 requests 兼容，支持 HTTP/2，学习成本低，适合快速开发。",e.jsx("br",{}),"选择建议：需要 WebSocket 或构建异步服务器用 aiohttp；简单 HTTP 客户端用 httpx。"]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、常见误区"}),e.jsxs(t,{type:"danger",title:"误区1：忘记 await",children:[e.jsx("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] mb-2",children:e.jsx("strong",{children:"错误做法："})}),e.jsx("pre",{className:"bg-parchment-deep p-3 rounded-paper-sm mb-3 overflow-x-auto",children:e.jsx("code",{className:"text-[12px] sm:text-[13px] font-mono text-ink-muted",children:`async def main():
    result = some_async_function()  # ❌ 返回 coroutine 对象，未执行
    print(result)  # <coroutine object ...>`})}),e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7]",children:[e.jsx("strong",{children:"正确做法："}),"必须使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]",children:"await"}),"。"]}),e.jsx("pre",{className:"bg-parchment-deep p-3 rounded-paper-sm overflow-x-auto",children:e.jsx("code",{className:"text-[12px] sm:text-[13px] font-mono text-ink-muted",children:`async def main():
    result = await some_async_function()  # ✅ 等待执行完成
    print(result)  # 实际结果`})})]}),e.jsxs(t,{type:"danger",title:"误区2：在异步代码中使用同步阻塞调用",children:[e.jsx("p",{className:"text-[13px] sm:text-[14px] leading-[1.7] mb-2",children:e.jsx("strong",{children:"错误做法："})}),e.jsx("pre",{className:"bg-parchment-deep p-3 rounded-paper-sm mb-3 overflow-x-auto",children:e.jsx("code",{className:"text-[12px] sm:text-[13px] font-mono text-ink-muted",children:`async def fetch_data():
    time.sleep(5)  # ❌ 阻塞整个事件循环
    return data`})}),e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7]",children:[e.jsx("strong",{children:"正确做法："}),"使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-teal-deep px-[5px] py-[2px] rounded-[3px]",children:"asyncio.sleep()"})," 或将同步代码放入线程池。"]}),e.jsx("pre",{className:"bg-parchment-deep p-3 rounded-paper-sm overflow-x-auto",children:e.jsx("code",{className:"text-[12px] sm:text-[13px] font-mono text-ink-muted",children:`async def fetch_data():
    await asyncio.sleep(5)  # ✅ 非阻塞
    return data`})})]}),e.jsx(t,{type:"warning",title:"误区3：混淆并发和并行",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7]",children:["异步并发≠并行执行。异步是在单线程中交替执行多个任务，适合 I/O 密集型； 并行是多核同时执行，适合 CPU 密集型。不要期望异步能加速 CPU 计算。 对于 CPU 密集型任务，应使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"multiprocessing"}),"。"]})}),e.jsx(t,{type:"warning",title:"误区4：不处理任务异常",children:e.jsxs("p",{className:"text-[13px] sm:text-[14px] leading-[1.7]",children:["使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"asyncio.create_task()"})," 创建的任务如果未 await， 异常会被静默吞掉。应使用 ",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"return_exceptions=True"})," 或在任务完成后检查异常。"]})}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、面试真题"}),e.jsx(c,{questions:[{question:"Python 异步编程的本质是什么？与多线程有什么区别？",answer:"异步编程的本质是协作式多任务：协程主动让出控制权（await），由事件循环调度下一个任务。与多线程的区别：1) 异步是单线程，无线程切换开销；2) 无需锁机制，无竞态条件；3) 可轻松创建数千个协程，而线程受系统限制；4) 异步适合 I/O 密集型，多线程适合混合场景。但异步不能利用多核，CPU 密集型仍需用多进程。"},{question:"什么是事件循环？它在 asyncio 中的作用是什么？",answer:"事件循环是异步编程的核心调度器，负责：1) 维护和执行协程任务队列；2) 监听 I/O 事件（socket、文件等）；3) 管理定时器（sleep、timeout）；4) 处理信号和回调。事件循环不断检查是否有就绪的任务或事件，有则执行，无则进入休眠等待。Python 中通过 asyncio.run() 自动创建和管理事件循环。"},{question:"asyncio.gather 和 asyncio.wait 有什么区别？",answer:"主要区别：1) gather 返回结果列表，wait 返回 (done, pending) 集合；2) gather 默认等待所有任务完成，wait 可通过 return_when 参数控制（FIRST_COMPLETED、FIRST_EXCEPTION、ALL_COMPLETED）；3) gather 遇到异常默认抛出，可通过 return_exceptions=True 捕获；wait 需手动检查任务异常；4) gather API 更简洁，适合大多数场景；wait 更灵活，适合精细控制。"},{question:"如何在异步代码中执行 CPU 密集型任务而不阻塞事件循环？",answer:"有三种方法：1) 使用 loop.run_in_executor(None, func, *args) 将同步函数放入默认线程池；2) 使用 ProcessPoolExecutor 放入进程池（真正并行）；3) 使用 asyncio.to_thread()（Python 3.9+）简化线程池调用。关键原则：CPU 密集型任务不应直接在协程中执行，必须委托给线程池或进程池。"},{question:"aiohttp 和 httpx 各有什么优势和适用场景？",answer:"aiohttp 优势：1) 功能全面，支持 WebSocket、服务器端；2) 成熟稳定，社区广泛；3) 细粒度控制连接池和超时。适用：构建异步 Web 服务、WebSocket 应用。httpx 优势：1) API 简洁，与 requests 兼容；2) 原生支持 HTTP/2；3) 学习成本低。适用：HTTP 客户端、微服务通信、快速原型开发。选择：需要 WebSocket 或服务器用 aiohttp；纯 HTTP 客户端用 httpx。"},{question:"什么是结构化并发？Python 3.11 的 TaskGroup 如何使用？",answer:"结构化并发是一种编程范式，确保所有子任务在父作用域结束前完成或被取消，避免孤儿任务和资源泄漏。TaskGroup 是 Python 3.11 引入的结构化并发工具：async with asyncio.TaskGroup() as tg: task1 = tg.create_task(coro1()); task2 = tg.create_task(coro2())。如果任何任务失败，所有任务自动取消；作用域结束时等待所有任务完成。这比手动管理任务更安全、更清晰。"},{question:"如何调试异步代码中的性能瓶颈？",answer:"调试方法：1) 使用 asyncio.debug=True 启用调试模式，检测长时间运行的回调；2) 使用 aiojobs 或 async-timeout 监控任务执行时间；3) 使用 py-spy 或 cProfile 分析 CPU 使用；4) 使用 asyncio.Task.all_tasks() 检查pending 任务；5) 添加日志记录关键操作的耗时；6) 使用 asyncio.slow_callback_duration 设置慢回调阈值。常见问题：忘记 await、同步阻塞调用、过度并发导致资源竞争。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、知识关联"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"掌握 Python 异步编程后，建议继续学习以下内容："}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4",children:[e.jsxs("a",{href:"/docs/04-fastapi/fastapi",className:"block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group",children:[e.jsx("div",{className:"text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1",children:"Web 框架"}),e.jsx("div",{className:"font-semibold text-[15px] text-ink group-hover:text-accent transition-colors",children:"FastAPI 深度解析"}),e.jsx("div",{className:"text-[13px] text-ink-muted mt-1",children:"异步 Web 框架、依赖注入"})]}),e.jsxs("a",{href:"/docs/03-python-advanced/python-concurrent",className:"block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group",children:[e.jsx("div",{className:"text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1",children:"并发编程"}),e.jsx("div",{className:"font-semibold text-[15px] text-ink group-hover:text-accent transition-colors",children:"Python 并发编程全览"}),e.jsx("div",{className:"text-[13px] text-ink-muted mt-1",children:"threading、multiprocessing、concurrent.futures"})]}),e.jsxs("a",{href:"/docs/03-python-advanced/python-generators",className:"block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group",children:[e.jsx("div",{className:"text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1",children:"基础"}),e.jsx("div",{className:"font-semibold text-[15px] text-ink group-hover:text-accent transition-colors",children:"生成器与迭代器"}),e.jsx("div",{className:"text-[13px] text-ink-muted mt-1",children:"yield、惰性求值、无限序列"})]}),e.jsxs("a",{href:"/docs/03-python-advanced/websockets",className:"block p-4 bg-paper rounded-paper-md border border-border hover:border-accent transition-colors group",children:[e.jsx("div",{className:"text-[11px] font-mono text-ink-ghost uppercase tracking-wide mb-1",children:"实时通信"}),e.jsx("div",{className:"font-semibold text-[15px] text-ink group-hover:text-accent transition-colors",children:"WebSocket 编程"}),e.jsx("div",{className:"text-[13px] text-ink-muted mt-1",children:"实时双向通信、聊天应用"})]})]}),e.jsx(r,{...i(a.category,a.id)})]})}),e.jsx(p,{items:d})]})}export{g as default};
