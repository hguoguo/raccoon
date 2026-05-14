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
  { id: 'overview', text: '一、量化技术概述', level: 2 },
  { id: 'quantization-types', text: '二、量化类型详解', level: 2 },
  { id: 'int8-quantization', text: '三、INT8 量化原理', level: 3 },
  { id: 'int4-quantization', text: '四、INT4 量化原理', level: 3 },
  { id: 'gguf-format', text: '五、GGUF 格式解析', level: 2 },
  { id: 'awq-algorithm', text: '六、AWQ 算法', level: 2 },
  { id: 'vllm-inference', text: '七、vLLM 推理引擎', level: 2 },
  { id: 'tensorrt-optimization', text: '八、TensorRT 优化', level: 2 },
  { id: 'deployment-practice', text: '九、部署实践', level: 2 },
  { id: 'performance-comparison', text: '十、性能对比', level: 2 },
  { id: 'misconceptions', text: '十一、常见误区', level: 2 },
  { id: 'interview', text: '十二、面试真题', level: 2 },
  { id: 'related', text: '十三、知识关联', level: 2 },
]

export default function LlmQuantizationDeployment({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              大模型量化是将 FP16/BF16 精度的模型权重转换为 INT8/INT4 等低精度格式的技术，在保持可接受精度的前提下，
              显著降低内存占用和推理延迟，实现<strong className="text-accent">边缘设备部署</strong>和<strong className="text-accent">高并发服务</strong>。
            </p>
          </blockquote>

          <Callout type="tip" title="量化的核心价值">
            7B 参数模型从 FP16（14GB）量化到 INT4（3.5GB），内存占用减少 75%，推理速度提升 2-4 倍，使消费级 GPU 也能运行大模型。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、量化技术概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            量化（Quantization）是模型压缩的核心技术之一，通过降低数值精度来减少存储和计算开销。在大模型场景下，量化主要解决三个问题：
          </p>

          <DiagramBlock title="量化前后对比">
{`┌─────────────────────┐         ┌─────────────────────┐
│   FP16 原始模型      │         │   INT4 量化模型      │
│                     │         │                     │
│  • 16-bit 精度       │         │  • 4-bit 精度        │
│  • 14 GB (7B 参数)   │ 量化 →  │  • 3.5 GB (7B 参数)  │
│  • 高精度计算        │         │  • 低精度计算        │
│  • 需要 A100/H100    │         │  • RTX 3090 可运行   │
└─────────────────────┘         └─────────────────────┘

精度损失: ~1-2% PPL (Perplexity)
内存节省: 75%
推理加速: 2-4x`}
          </DiagramBlock>

          <SideNote label="量化 vs 剪枝 vs 蒸馏">
            <ul className="space-y-2 text-sm">
              <li><strong>量化</strong>：降低数值精度（FP16 → INT4）</li>
              <li><strong>剪枝</strong>：移除冗余参数（稀疏化）</li>
              <li><strong>蒸馏</strong>：小模型学习大模型行为</li>
              <li>三者可组合使用，达到最佳压缩效果</li>
            </ul>
          </SideNote>

          <h2 id="quantization-types" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、量化类型详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            根据量化时机和粒度，可分为多种类型：
          </p>

          <table className="w-full text-sm border-collapse mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left">类型</th>
                <th className="border border-border-light px-4 py-2 text-left">说明</th>
                <th className="border border-border-light px-4 py-2 text-left">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">PTQ</td>
                <td className="border border-border-light px-4 py-2">Post-Training Quantization，训练后量化</td>
                <td className="border border-border-light px-4 py-2">快速部署，无需重新训练</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">QAT</td>
                <td className="border border-border-light px-4 py-2">Quantization-Aware Training，量化感知训练</td>
                <td className="border border-border-light px-4 py-2">追求最高精度</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">Per-Tensor</td>
                <td className="border border-border-light px-4 py-2">整个张量共享一组缩放因子</td>
                <td className="border border-border-light px-4 py-2">简单高效</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">Per-Channel</td>
                <td className="border border-border-light px-4 py-2">每个通道独立缩放因子</td>
                <td className="border border-border-light px-4 py-2">精度更高</td>
              </tr>
            </tbody>
          </table>

          <h3 id="int8-quantization" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            三、INT8 量化原理
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            INT8 量化将浮点数映射到 [-128, 127] 的整数范围，核心公式为：
          </p>

          <Playground
            code={`# INT8 量化公式
def quantize_fp16_to_int8(weight_fp16):
    """
    对称量化：将 FP16 权重转换为 INT8
    
    公式: 
      scale = max(|weight|) / 127
      weight_int8 = round(weight_fp16 / scale)
    """
    # 1. 计算缩放因子
    scale = torch.max(torch.abs(weight_fp16)) / 127.0
    
    # 2. 量化
    weight_int8 = torch.round(weight_fp16 / scale).clamp(-128, 127).to(torch.int8)
    
    # 3. 反量化验证
    weight_dequant = weight_int8.float() * scale
    
    # 4. 计算误差
    error = torch.mean(torch.abs(weight_fp16 - weight_dequant))
    print(f"量化误差: {error.item():.6f}")
    
    return weight_int8, scale

# 示例
weight = torch.randn(1024, 1024, dtype=torch.float16)
weight_int8, scale = quantize_fp16_to_int8(weight)
print(f"原始大小: {weight.element_size() * weight.numel()} bytes")
print(f"量化后大小: {weight_int8.element_size() * weight_int8.numel()} bytes")
print(f"压缩比: {weight.element_size() / weight_int8.element_size()}x")`}
            language="python"
            highlights={[10, 13, 16, 23]}
            filename="int8_quantization.py"
            description="INT8 对称量化实现"
          />

          <Callout type="warning" title="INT8 量化的局限性">
            INT8 对激活值分布敏感的层（如 LayerNorm、Softmax）效果较差，通常需要保持这些层为 FP16（混合精度量化）。
          </Callout>

          <h3 id="int4-quantization" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            四、INT4 量化原理
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            INT4 进一步将精度降低到 4-bit，但无法直接用硬件表示，需要通过打包实现：
          </p>

          <Playground
            code={`# INT4 量化实现（使用 bitsandbytes 库）
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

# 配置 INT4 量化
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,              # 启用 4-bit 加载
    bnb_4bit_quant_type="nf4",      # 归一化浮点 4-bit（优于纯 INT4）
    bnb_4bit_compute_dtype=torch.float16,  # 计算时转为 FP16
    bnb_4bit_use_double_quant=True, # 双重量化（进一步压缩）
)

# 加载量化模型
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=bnb_config,
    device_map="auto"
)

# 检查内存占用
print(f"模型参数量: {sum(p.numel() for p in model.parameters()):,}")
print(f"显存占用: {torch.cuda.memory_allocated() / 1e9:.2f} GB")

# 推理
from transformers import pipeline
pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)
result = pipe("Hello, how are you?", max_length=50)
print(result[0]['generated_text'])`}
            language="python"
            highlights={[7, 8, 9, 10, 16]}
            filename="int4_quantization.py"
            description="使用 bitsandbytes 进行 INT4 量化"
          />

          <SideNote label="NF4 vs INT4">
            NF4（Normal Float 4-bit）是一种针对正态分布权重优化的 4-bit 格式，比标准 INT4 精度更高，是目前 LLM 量化的主流选择。
          </SideNote>

          <h2 id="gguf-format" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、GGUF 格式解析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            GGUF（GGML Universal File）是 llama.cpp 项目推出的模型格式，专为 CPU/GPU 推理优化设计：
          </p>

          <DiagramBlock title="GGUF 文件结构">
{`┌──────────────────────────────────────┐
│         GGUF Header                   │
│  • Magic Number ("GGUF")              │
│  • Version (3)                        │
│  • Tensor Count                       │
│  • Key-Value Pair Count               │
├──────────────────────────────────────┤
│         KV Metadata                   │
│  • model.architecture = "llama"       │
│  • model.name = "Llama-2-7B"          │
│  • tokenizer.ggml.model = "llama"     │
│  • general.quantization_version = 2   │
├──────────────────────────────────────┤
│         Tensor Info + Data            │
│  • tensor_0: name, shape, type, offset│
│  • tensor_0_data: [binary data]       │
│  • tensor_1: name, shape, type, offset│
│  • tensor_1_data: [binary data]       │
│  ...                                  │
├──────────────────────────────────────┤
│         Alignment Padding             │
└──────────────────────────────────────┘

支持的量化类型:
  Q4_0, Q4_1, Q5_0, Q5_1, Q8_0 (4/5/8-bit)
  F16, F32 (全精度)`}
          </DiagramBlock>

          <Playground
            code={`# 使用 llama.cpp 转换和量化模型
# 1. 安装 llama.cpp
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make

# 2. 转换 HuggingFace 模型为 GGUF
python convert_hf_to_gguf.py ../models/llama-2-7b --outfile llama-2-7b-f16.gguf

# 3. 量化为 Q4_K_M（推荐平衡点）
./quantize llama-2-7b-f16.gguf llama-2-7b-q4_k_m.gguf Q4_K_M

# 4. 运行推理
./main -m llama-2-7b-q4_k_m.gguf -p "Hello, how are you?" -n 128 -t 8

# 5. 启动 API 服务器
./server -m llama-2-7b-q4_k_m.gguf -c 2048 --port 8080`}
            language="bash"
            highlights={[9, 12, 15, 18]}
            filename="gguf_quantization.sh"
            description="GGUF 量化工作流"
          />

          <table className="w-full text-sm border-collapse mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left">量化类型</th>
                <th className="border border-border-light px-4 py-2 text-left">大小 (7B)</th>
                <th className="border border-border-light px-4 py-2 text-left">PPL 损失</th>
                <th className="border border-border-light px-4 py-2 text-left">推荐场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">Q4_0</td>
                <td className="border border-border-light px-4 py-2">3.5 GB</td>
                <td className="border border-border-light px-4 py-2">+0.8</td>
                <td className="border border-border-light px-4 py-2">CPU 推理</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">Q4_K_M</td>
                <td className="border border-border-light px-4 py-2">3.8 GB</td>
                <td className="border border-border-light px-4 py-2">+0.5</td>
                <td className="border border-border-light px-4 py-2">⭐ 最佳平衡</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">Q5_K_M</td>
                <td className="border border-border-light px-4 py-2">4.3 GB</td>
                <td className="border border-border-light px-4 py-2">+0.3</td>
                <td className="border border-border-light px-4 py-2">高质量需求</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">Q8_0</td>
                <td className="border border-border-light px-4 py-2">6.7 GB</td>
                <td className="border border-border-light px-4 py-2">+0.1</td>
                <td className="border border-border-light px-4 py-2">接近全精度</td>
              </tr>
            </tbody>
          </table>

          <h2 id="awq-algorithm" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、AWQ 算法
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            AWQ（Activation-aware Weight Quantization）是一种先进的 PTQ 方法，通过保护重要权重来减少量化误差：
          </p>

          <DiagramBlock title="AWQ 核心思想">
{`传统量化:
  所有权重统一缩放 → 重要权重可能失真
  
AWQ 量化:
  1. 识别重要权重（基于激活值幅度）
  2. 对重要权重使用更精细的缩放
  3. 对非重要权重使用粗粒度量化
  
关键洞察:
  "不是所有权重都同等重要"
  只有 ~1% 的权重对输出影响最大
  
优势:
  ✓ 无需校准数据集
  ✓ 支持 W4A16（4-bit 权重 + 16-bit 激活）
  ✓ 精度接近 QAT，速度接近 PTQ`}
          </DiagramBlock>

          <Playground
            code={`# 使用 AutoAWQ 进行量化
from awq import AutoAWQForCausalLM
from transformers import AutoTokenizer

# 1. 加载模型
model_path = "meta-llama/Llama-2-7b-hf"
model = AutoAWQForCausalLM.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(model_path)

# 2. 量化（自动识别重要权重）
quant_config = {
    "zero_point": True,
    "q_group_size": 128,      # 分组大小
    "w_bit": 4,               # 4-bit 量化
    "version": "GEMM"         # 使用 GEMM 内核
}

model.quantize(tokenizer, quant_config=quant_config)

# 3. 保存量化模型
model.save_quantized("llama-2-7b-awq-w4-g128")
tokenizer.save_pretrained("llama-2-7b-awq-w4-g128")

# 4. 加载量化模型进行推理
from awq import AutoAWQForCausalLM
model = AutoAWQForCausalLM.from_quantized(
    "llama-2-7b-awq-w4-g128",
    fuse_layers=True,         # 融合层以加速
    max_new_tokens=128,
    temperature=0.7
)

# 5. 生成文本
prompt = "Explain quantum computing in simple terms"
output = model.generate(prompt, max_new_tokens=100)
print(output)`}
            language="python"
            highlights={[12, 13, 14, 15, 24, 29]}
            filename="awq_quantization.py"
            description="AWQ 量化实现"
          />

          <Callout type="info" title="AWQ 性能数据">
            在 LLaMA-2-7B 上，AWQ W4A16 相比 FP16：内存减少 75%，推理速度提升 3.2 倍，PPL 仅增加 0.3。
          </Callout>

          <h2 id="vllm-inference" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、vLLM 推理引擎
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            vLLM 是高性能 LLM 推理引擎，通过 PagedAttention 技术实现高吞吐量：
          </p>

          <Playground
            code={`# 安装 vLLM
pip install vllm

# 启动 API 服务器（支持量化模型）
python -m vllm.entrypoints.api_server \\
    --model meta-llama/Llama-2-7b-hf \\
    --quantization awq \\
    --dtype half \\
    --max-model-len 4096 \\
    --gpu-memory-utilization 0.9 \\
    --port 8000

# 客户端调用
import requests

response = requests.post(
    "http://localhost:8000/generate",
    json={
        "prompt": "What is machine learning?",
        "max_tokens": 100,
        "temperature": 0.7
    }
)
print(response.json()["text"])

# Python API 直接调用
from vllm import LLM, SamplingParams

llm = LLM(
    model="meta-llama/Llama-2-7b-hf",
    quantization="awq",
    dtype="half"
)

sampling_params = SamplingParams(
    temperature=0.7,
    max_tokens=100
)

prompts = ["Hello, my name is", "The capital of France is"]
outputs = llm.generate(prompts, sampling_params)

for output in outputs:
    print(f"Prompt: {output.prompt}")
    print(f"Generated: {output.outputs[0].text}\n")`}
            language="python"
            highlights={[5, 7, 18, 30, 31, 37]}
            filename="vllm_inference.py"
            description="vLLM 推理引擎使用"
          />

          <SideNote label="PagedAttention 技术">
            vLLM 的核心创新是 PagedAttention，将 KV Cache 像操作系统分页一样管理，消除内存碎片，吞吐量比 HuggingFace Transformers 高 24 倍。
          </SideNote>

          <h2 id="tensorrt-optimization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、TensorRT 优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            NVIDIA TensorRT 是生产级推理优化器，支持 INT8/FP16 混合精度：
          </p>

          <Playground
            code={`# 使用 TensorRT-LLM 构建优化引擎
import tensorrt_llm
from tensorrt_llm import LLMEngine, BuildConfig

# 1. 配置构建参数
build_config = BuildConfig(
    max_input_len=2048,
    max_output_len=512,
    max_batch_size=32,
    precision="fp16",           # 或 "int8"
    use_gpt_attention_plugin=True,
    use_gemm_plugin=True,
)

# 2. 构建引擎
engine = LLMEngine.from_pretrained(
    model_dir="llama-2-7b",
    build_config=build_config
)

# 3. 序列化保存
engine.save("llama-2-7b-trt.engine")

# 4. 加载并推理
from tensorrt_llm.runtime import ModelRunner

runner = ModelRunner.from_engine("llama-2-7b-trt.engine")

input_ids = tokenizer.encode("Hello, how are you?")
output_ids = runner.generate(input_ids, max_output_len=100)
output_text = tokenizer.decode(output_ids[0])
print(output_text)`}
            language="python"
            highlights={[7, 8, 9, 10, 17, 27]}
            filename="tensorrt_optimization.py"
            description="TensorRT-LLM 优化流程"
          />

          <h2 id="deployment-practice" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、部署实践
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            完整的量化部署流程：
          </p>

          <Playground
            code={`# Docker 部署量化模型
# Dockerfile
FROM nvidia/cuda:12.1-devel-ubuntu22.04

RUN apt-get update && apt-get install -y python3-pip git
RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
RUN pip install transformers accelerate bitsandbytes autoawq vllm

COPY app.py /app/app.py
WORKDIR /app

EXPOSE 8000
CMD ["python", "app.py"]

# app.py - FastAPI 服务
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

# 加载量化模型
pipe = pipeline(
    "text-generation",
    model="llama-2-7b-awq-w4-g128",
    device_map="auto"
)

class GenerationRequest(BaseModel):
    prompt: str
    max_tokens: int = 100
    temperature: float = 0.7

@app.post("/generate")
async def generate(req: GenerationRequest):
    result = pipe(
        req.prompt,
        max_length=req.max_tokens,
        temperature=req.temperature
    )
    return {"text": result[0]['generated_text']}

# 构建并运行
docker build -t llm-quantized .
docker run --gpus all -p 8000:8000 llm-quantized`}
            language="python"
            highlights={[21, 24, 25, 35, 43, 44]}
            filename="deployment_practice.py"
            description="Docker 部署量化模型"
          />

          <h2 id="performance-comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、性能对比
          </h2>

          <table className="w-full text-sm border-collapse mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left">方案</th>
                <th className="border border-border-light px-4 py-2 text-left">显存 (7B)</th>
                <th className="border border-border-light px-4 py-2 text-left">吞吐 (tok/s)</th>
                <th className="border border-border-light px-4 py-2 text-left">PPL</th>
                <th className="border border-border-light px-4 py-2 text-left">适用硬件</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">FP16</td>
                <td className="border border-border-light px-4 py-2">14 GB</td>
                <td className="border border-border-light px-4 py-2">50</td>
                <td className="border border-border-light px-4 py-2">基准</td>
                <td className="border border-border-light px-4 py-2">A100 80GB</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">INT8 (PTQ)</td>
                <td className="border border-border-light px-4 py-2">7 GB</td>
                <td className="border border-border-light px-4 py-2">120</td>
                <td className="border border-border-light px-4 py-2">+1.2</td>
                <td className="border border-border-light px-4 py-2">RTX 3090</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">INT4 (AWQ)</td>
                <td className="border border-border-light px-4 py-2">3.5 GB</td>
                <td className="border border-border-light px-4 py-2">200</td>
                <td className="border border-border-light px-4 py-2">+0.3</td>
                <td className="border border-border-light px-4 py-2">RTX 3060</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">Q4_K_M (GGUF)</td>
                <td className="border border-border-light px-4 py-2">3.8 GB</td>
                <td className="border border-border-light px-4 py-2">80 (CPU)</td>
                <td className="border border-border-light px-4 py-2">+0.5</td>
                <td className="border border-border-light px-4 py-2">Mac M2</td>
              </tr>
            </tbody>
          </table>

          <Callout type="tip" title="选型建议">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>追求极致精度</strong>：FP16 + vLLM</li>
              <li><strong>平衡性能与精度</strong>：INT4 AWQ + vLLM</li>
              <li><strong>CPU/边缘部署</strong>：Q4_K_M GGUF + llama.cpp</li>
              <li><strong>NVIDIA 生产环境</strong>：TensorRT-LLM INT8</li>
            </ul>
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、常见误区
          </h2>

          <Callout type="danger" title="误区 1：量化必然导致精度大幅下降">
            <p className="mb-2"><strong>事实</strong>：现代量化技术（AWQ、GPTQ）在 INT4 下 PPL 损失仅 0.3-0.5，对大多数应用可忽略。</p>
            <p>关键是选择合适的量化方法和粒度，而非盲目追求低比特。</p>
          </Callout>

          <Callout type="danger" title="误区 2：INT4 比 INT8 快一倍">
            <p className="mb-2"><strong>事实</strong>：实际加速取决于硬件支持。当前 GPU 对 INT4 的原生支持有限，很多框架内部仍转为 INT8 计算。</p>
            <p>INT4 的主要优势是<strong>内存节省</strong>，而非速度提升。</p>
          </Callout>

          <Callout type="danger" title="误区 3：量化后无需微调">
            <p className="mb-2"><strong>事实</strong>：对于特定领域任务，量化后微调（QAT 或 LoRA）可恢复 50-80% 的精度损失。</p>
            <p>通用任务可直接使用 PTQ，垂直领域建议 QAT。</p>
          </Callout>

          <Callout type="warning" title="误区 4：所有层都适合量化">
            <p className="mb-2"><strong>事实</strong>：Embedding、LayerNorm、LM Head 等层对精度敏感，通常保持 FP16。</p>
            <p>混合精度策略（W4A16）比全 INT4 效果更好。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "解释 INT8 量化的基本原理和公式。",
                answer: "INT8 量化通过线性映射将 FP16 权重转换为 [-128, 127] 的整数：scale = max(|w|) / 127，w_int8 = round(w_fp16 / scale)。反量化时 w_fp16 ≈ w_int8 × scale。对称量化使用零点为 0，非对称量化会引入零点偏移。"
              },
              {
                question: "AWQ 与传统 PTQ 的区别是什么？",
                answer: "AWQ 基于激活值幅度识别重要权重（约 1%），对这些权重使用更精细的缩放因子，其他权重使用粗粒度量化。传统 PTQ 对所有权重统一处理。AWQ 在 W4A16 下精度接近 QAT，但无需重新训练。"
              },
              {
                question: "GGUF 格式的优势有哪些？",
                answer: "① 自包含元数据（架构、分词器、量化信息）；② 支持多种量化类型（Q4_0 到 Q8_0）；③ CPU/GPU 友好，llama.cpp 原生支持；④ 内存映射加载，启动速度快；⑤ 跨平台兼容（Linux/macOS/Windows）。"
              },
              {
                question: "vLLM 的 PagedAttention 如何提升吞吐量？",
                answer: "PagedAttention 将 KV Cache 划分为固定大小的块（类似 OS 分页），动态分配给不同请求，消除内存碎片。传统方法预分配连续内存导致浪费。vLLM 因此可实现 24 倍吞吐量提升和 90% 显存利用率。"
              },
              {
                question: "什么时候应该使用 QAT 而不是 PTQ？",
                answer: "QAT 适用于：① 垂直领域任务（医疗、法律等）；② 对精度要求极高（PPL 损失 < 0.1）；③ 有充足训练数据和算力。PTQ 适用于：① 通用任务；② 快速部署；③ 资源受限场景。QAT 精度高但成本高，PTQ 性价比高。"
              },
              {
                question: "解释 Per-Tensor 和 Per-Channel 量化的区别。",
                answer: "Per-Tensor：整个张量共享一个 scale 和 zero_point，计算简单但精度低。Per-Channel：每个输出通道独立 scale，能更好地适应权重分布不均的情况，精度更高但存储开销略大。LLM 中推荐使用 Per-Channel。"
              },
              {
                question: "量化对哪些层效果最差？为什么？",
                answer: "① Embedding 层：词汇表大，分布不均匀；② LayerNorm：对数值敏感，影响后续层；③ LM Head：输出概率分布，微小误差放大；④ Attention 输出：影响全局上下文。这些层通常保持 FP16（混合精度）。"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十三、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            量化技术与以下知识点密切相关：
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><a href="/docs/10-llm-advanced/model-finetuning" className="text-accent hover:underline">模型微调</a> — QAT 需要微调流程</li>
            <li><a href="/docs/10-llm-advanced/performance-tuning" className="text-accent hover:underline">性能调优</a> — 量化是核心优化手段</li>
            <li><a href="/docs/09-rag/retrieval-optimization" className="text-accent hover:underline">检索优化</a> — 量化 Embedding 模型加速向量检索</li>
          </ul>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
