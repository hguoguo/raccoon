import{j as e,g as o}from"./index-hyqxTCwJ.js";import{K as a}from"./KnowledgeLayout-CwkOMHwC.js";import{P as r}from"./Playground-C6lk-t6G.js";import{S as n}from"./SideNote-BKvanovA.js";import{C as t,A as d,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as i}from"./DiagramBlock-CLaKE9_7.js";import{I as m}from"./InterviewSection-BBNdwyyN.js";const p=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、微调技术全景",level:2},{id:"peft",text:"二、PEFT 参数高效微调",level:2},{id:"lora",text:"三、LoRA 核心原理",level:2},{id:"qlora",text:"四、QLoRA 量化优化",level:2},{id:"instruction-tuning",text:"五、指令微调（Instruction Tuning）",level:2},{id:"rlhf",text:"六、RLHF 人类反馈强化学习",level:2},{id:"dpo",text:"七、DPO 直接偏好优化",level:2},{id:"training-data",text:"八、训练数据工程",level:2},{id:"misconceptions",text:"九、常见误区",level:2},{id:"interview",text:"十、面试真题",level:2},{id:"related",text:"十一、知识关联",level:2}];function _({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(a,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["模型微调是在预训练大语言模型基础上，使用",e.jsx("strong",{className:"text-accent",children:"领域特定数据"}),"进行进一步训练的技术，通过调整部分或全部模型参数，使模型适应特定任务或场景，显著提升垂直领域的表现。"]})}),e.jsx(t,{type:"tip",title:"为什么需要微调？",children:"预训练模型虽然通用能力强，但在专业领域（如医疗、法律、金融）或特定任务（如代码生成、客服对话）上表现有限。微调可以用较小的成本获得显著的性能提升，比从头训练节省 90%+ 的计算资源。"}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、微调技术全景"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"微调技术根据参数更新范围和训练方式可分为多个层次，从轻量级的提示工程到全参数微调形成完整谱系。"}),e.jsx(i,{title:"微调技术演进路线",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
┌─────────────────────────────────────────────────────┐
│              模型适配技术谱系                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Prompt Engineering  ← 零样本/少样本提示             │
│       ↓                                             │
│  Prefix/P-Tuning   ← 添加可训练前缀                  │
│       ↓                                             │
│  Adapter           ← 插入小型适配层                  │
│       ↓                                             │
│  LoRA/QLoRA        ← 低秩分解 + 量化（主流）         │
│       ↓                                             │
│  Full Fine-tuning  ← 全参数更新（成本高）            │
│       ↓                                             │
│  RLHF/DPO          ← 人类反馈对齐（高级）            │
│                                                     │
└─────────────────────────────────────────────────────┘

参数量占比: 0.01% → 0.1% → 1% → 5% → 100%
计算成本:   极低  → 低  → 中  → 高  → 极高
`})}),e.jsxs(n,{label:"技术选择原则",children:["对于大多数应用场景，",e.jsx("code",{className:"font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]",children:"LoRA/QLoRA"})," 是性价比最高的选择，在保持 95%+ 性能的同时，显存需求降低 70%+。"]}),e.jsx("h2",{id:"peft",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、PEFT 参数高效微调"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["PEFT（Parameter-Efficient Fine-Tuning）是一类只更新少量参数的微调方法，核心思想是",e.jsx("strong",{children:"冻结预训练权重，仅训练新增的小型模块"}),"。"]}),e.jsx(r,{code:`from peft import LoraConfig, get_peft_model, TaskType
from transformers import AutoModelForCausalLM, AutoTokenizer

# 加载预训练模型
model_name = "meta-llama/Llama-2-7b-hf"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# 配置 LoRA
lora_config = LoraConfig(
    r=16,                          # 低秩矩阵的秩
    lora_alpha=32,                 # 缩放因子
    target_modules=["q_proj", "v_proj"],  # 目标模块
    lora_dropout=0.05,             # Dropout 率
    bias="none",                   # 不训练 bias
    task_type=TaskType.CAUSAL_LM   # 任务类型
)

# 应用 PEFT
peft_model = get_peft_model(model, lora_config)

# 查看可训练参数
trainable_params = sum(p.numel() for p in peft_model.parameters() if p.requires_grad)
total_params = sum(p.numel() for p in peft_model.parameters())
print(f"可训练参数: {trainable_params:,}")
print(f"总参数: {total_params:,}")
print(f"占比: {trainable_params / total_params * 100:.2f}%")

# 输出示例:
# 可训练参数: 4,194,304
# 总参数: 6,738,415,616
# 占比: 0.06%`,language:"python",highlights:[10,11,12,13,20],filename:"peft_lora.py",description:"PEFT + LoRA 配置示例"}),e.jsx(t,{type:"info",title:"PEFT 主要方法对比",children:e.jsxs("table",{className:"w-full text-[13px] border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border p-2 text-left",children:"方法"}),e.jsx("th",{className:"border border-border p-2 text-left",children:"参数量"}),e.jsx("th",{className:"border border-border p-2 text-left",children:"显存占用"}),e.jsx("th",{className:"border border-border p-2 text-left",children:"适用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("code",{children:"Prompt Tuning"})}),e.jsx("td",{className:"border border-border p-2",children:"~0.01%"}),e.jsx("td",{className:"border border-border p-2",children:"极低"}),e.jsx("td",{className:"border border-border p-2",children:"简单分类任务"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("code",{children:"Adapter"})}),e.jsx("td",{className:"border border-border p-2",children:"~1-3%"}),e.jsx("td",{className:"border border-border p-2",children:"低"}),e.jsx("td",{className:"border border-border p-2",children:"多任务学习"})]}),e.jsxs("tr",{className:"bg-accent-soft/20",children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("code",{children:"LoRA"})}),e.jsx("td",{className:"border border-border p-2",children:"~0.1-1%"}),e.jsx("td",{className:"border border-border p-2",children:"中低"}),e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"通用首选"})})]}),e.jsxs("tr",{className:"bg-accent-soft/30",children:[e.jsx("td",{className:"border border-border p-2",children:e.jsx("code",{children:"QLoRA"})}),e.jsx("td",{className:"border border-border p-2",children:"~0.1-1%"}),e.jsx("td",{className:"border border-border p-2",children:e.jsx("strong",{children:"最低"})}),e.jsx("td",{className:"border border-border p-2",children:"消费级 GPU"})]})]})]})}),e.jsx("h2",{id:"lora",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、LoRA 核心原理"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["LoRA（Low-Rank Adaptation）基于一个关键假设：",e.jsx("strong",{children:"模型适应新任务时的参数变化具有低秩特性"}),"。它用两个低秩矩阵的乘积近似完整的参数更新。"]}),e.jsx(i,{title:"LoRA 数学原理",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
传统全参数微调:
  W_new = W_pretrained + ΔW    (ΔW 维度: d×d, 参数量巨大)

LoRA 低秩分解:
  ΔW ≈ B × A                   (A: d×r, B: r×d, r << d)
  
  其中:
  - r = rank (通常 8-64)
  - d = 原始维度 (可能数千)
  - 参数量减少: d² → 2dr (当 r=16, d=4096 时减少 99%)

前向传播:
  h = W_pretrained · x + BA · x
      = (W_pretrained + BA) · x
      
推理时合并:
  W_merged = W_pretrained + BA  (无额外延迟)`})}),e.jsx(r,{code:`import torch
import torch.nn as nn

class LoRALayer(nn.Module):
    """LoRA 层的简化实现"""
    
    def __init__(self, in_features, out_features, rank=16, alpha=32):
        super().__init__()
        self.rank = rank
        self.alpha = alpha
        
        # 低秩矩阵 A (in_features × rank)
        self.lora_A = nn.Linear(in_features, rank, bias=False)
        # 低秩矩阵 B (rank × out_features)
        self.lora_B = nn.Linear(rank, out_features, bias=False)
        
        # 缩放因子
        self.scaling = alpha / rank
        
        # 初始化
        nn.init.kaiming_uniform_(self.lora_A.weight, a=math.sqrt(5))
        nn.init.zeros_(self.lora_B.weight)
    
    def forward(self, x):
        # 原始线性变换（冻结）
        original_out = self.original_linear(x)
        
        # LoRA 增量
        lora_out = self.lora_B(self.lora_A(x)) * self.scaling
        
        return original_out + lora_out

# 实际使用时无需手动实现，PEFT 库已封装
# from peft import LoraConfig, get_peft_model`,language:"python",highlights:[14,16,21,27,30,32],filename:"lora_implementation.py",description:"LoRA 核心实现逻辑"}),e.jsx(n,{label:"Rank 选择策略",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-[13px]",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"r=8-16"}),"：简单任务（分类、情感分析）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"r=32-64"}),"：复杂任务（代码生成、对话）"]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["r",">","64"]}),"：极少需要,收益递减"]})]})}),e.jsx("h2",{id:"qlora",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、QLoRA 量化优化"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["QLoRA（Quantized LoRA）在 LoRA 基础上引入",e.jsx("strong",{children:"4-bit 量化"}),"，将基础模型压缩到极低精度，同时保持 LoRA 适配器为 16-bit，实现在消费级 GPU 上微调 70B+ 模型。"]}),e.jsx(r,{code:`from peft import LoraConfig, prepare_model_for_kbit_training
from transformers import BitsAndBytesConfig, AutoModelForCausalLM

# 4-bit 量化配置
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,                    # 启用 4-bit 加载
    bnb_4bit_quant_type="nf4",           # NF4 量化类型（最优）
    bnb_4bit_compute_dtype=torch.bfloat16,  # 计算 dtype
    bnb_4bit_use_double_quant=True        # 双重量化（进一步节省）
)

# 加载量化模型
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-70b-hf",
    quantization_config=bnb_config,
    device_map="auto"                     # 自动分配设备
)

# 准备模型用于 k-bit 训练
model = prepare_model_for_kbit_training(model)

# 配置 LoRA（与标准 LoRA 相同）
lora_config = LoraConfig(
    r=64,
    lora_alpha=128,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# 显存对比（Llama-2-70B）:
# 全精度 (FP16): ~140 GB
# 4-bit 量化:    ~35 GB
# + LoRA 适配器: ~0.5 GB
# 总计:          ~35.5 GB (可在单卡 A100 80GB 上运行)`,language:"python",highlights:[6,7,8,9,14,20],filename:"qlora_setup.py",description:"QLoRA 4-bit 量化配置"}),e.jsxs(t,{type:"warning",title:"NF4 vs FP4 量化类型",children:[e.jsx("strong",{children:"NF4（Normal Float 4-bit）"})," 是专为神经网络权重设计的量化格式，假设权重服从正态分布，比标准 FP4 提供更好的精度保留。实验表明 NF4 在相同比特数下性能优于 FP4 和 INT4。"]}),e.jsx("h2",{id:"instruction-tuning",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、指令微调（Instruction Tuning）"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:['指令微调是让模型学会遵循人类指令的关键技术，通过将任务转化为"',e.jsx("strong",{children:"指令 + 输入 → 期望输出"}),'"的格式进行训练，显著提升模型的泛化能力和指令遵循度。']}),e.jsx(r,{code:`# 指令微调数据格式示例
training_data = [
    {
        "instruction": "将以下中文翻译成英文",
        "input": "人工智能正在改变世界",
        "output": "Artificial intelligence is changing the world."
    },
    {
        "instruction": "解释什么是量子计算",
        "input": "",  # 无额外输入
        "output": "量子计算是一种利用量子力学现象（如叠加和纠缠）进行计算的新型计算范式..."
    },
    {
        "instruction": "编写一个 Python 函数计算斐波那契数列",
        "input": "使用前向迭代方法",
        "output": """def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib"""
    }
]

# 使用 HuggingFace Trainer 进行指令微调
from transformers import TrainingArguments, Trainer

training_args = TrainingArguments(
    output_dir="./lora-finetuned",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    fp16=True,
    logging_steps=10,
    save_strategy="epoch"
)

trainer = Trainer(
    model=peft_model,
    args=training_args,
    train_tokenized_dataset,
    data_collator=data_collator
)

trainer.train()`,language:"python",highlights:[3,9,14,33,34,35,36,37],filename:"instruction_tuning.py",description:"指令微调数据格式与训练"}),e.jsx(i,{title:"指令微调效果对比",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
未经指令微调的模型:
  用户: "写一首关于春天的诗"
  模型: "春天是一个季节..." (继续解释而非创作)

经过指令微调的模型:
  用户: "写一首关于春天的诗"
  模型: "春风拂面柳丝长，
        花开满园香气扬。
        燕归巢中呢喃语，
        万物复苏生机盎。" ✓

关键改进:
- 理解任务意图（创作 vs 解释）
- 遵循格式要求（诗歌结构）
- 控制输出风格（文学性语言）`})}),e.jsx("h2",{id:"rlhf",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、RLHF 人类反馈强化学习"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"RLHF（Reinforcement Learning from Human Feedback）通过人类偏好数据训练奖励模型，再用强化学习优化语言模型，使输出更符合人类价值观和偏好。ChatGPT 的核心技术之一。"}),e.jsx(i,{title:"RLHF 三阶段流程",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
阶段 1: 监督微调 (SFT)
┌──────────┐     ┌──────────────┐
│ 指令数据  │────▶│  SFT 模型    │
└──────────┘     └──────────────┘

阶段 2: 奖励模型训练 (RM)
┌──────────────┐     ┌──────────────┐
│ 人类偏好标注  │────▶│ 奖励模型 (RM) │
│ A vs B 选择  │     └──────────────┘
└──────────────┘           │
                           ▼
                  评分: Response → Score

阶段 3: PPO 强化学习优化
┌──────────┐     ┌──────────┐     ┌──────────┐
│ SFT 模型  │────▶│ PPO 训练  │◀────│ 奖励模型  │
└──────────┘     └──────────┘     └──────────┘
                      │
                      ▼
              ┌──────────────┐
              │ RLHF 对齐模型 │
              └──────────────┘`})}),e.jsx(r,{code:`from trl import PPOTrainer, PPOConfig, AutoModelForCausalLMWithValueHead
from transformers import AutoTokenizer

# 加载 SFT 模型
model = AutoModelForCausalLMWithValueHead.from_pretrained("./sft-model")
tokenizer = AutoTokenizer.from_pretrained("./sft-model")

# PPO 配置
ppo_config = PPOConfig(
    batch_size=128,
    mini_batch_size=16,
    learning_rate=1.41e-5,
    ppo_epochs=4,
    cliprange=0.2,
    vf_coef=0.1
)

# 奖励模型（单独训练）
reward_model = AutoModelForSequenceClassification.from_pretrained("./reward-model")

# PPO 训练器
ppo_trainer = PPOTrainer(ppo_config, model, tokenizer)

# 训练循环
for batch in dataset:
    # 生成响应
    query_tensors = batch["input_ids"]
    response_tensors = ppo_trainer.generate(query_tensors)
    
    # 获取奖励分数
    rewards = reward_model(response_tensors).logits
    
    # PPO 更新
    stats = ppo_trainer.step(query_tensors, response_tensors, rewards)
    
    print(f"Reward mean: {rewards.mean():.3f}")

# 关键优势:
# - 学习人类偏好（而非仅模仿数据）
# - 减少有害/偏见输出
# - 提升对话质量和安全性`,language:"python",highlights:[10,11,12,13,14,23,27,30,33],filename:"rlhf_ppo.py",description:"RLHF PPO 训练流程"}),e.jsx(t,{type:"danger",title:"RLHF 的挑战",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"成本高昂"}),"：需要大量人工标注（数万小时）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"奖励黑客"}),'：模型可能学会"欺骗"奖励模型而非真正改进']}),e.jsxs("li",{children:[e.jsx("strong",{children:"过度优化"}),"：追求高分导致输出单一化、失去多样性"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"价值观偏差"}),"：标注者的主观偏好会传递给模型"]})]})}),e.jsx("h2",{id:"dpo",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、DPO 直接偏好优化"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["DPO（Direct Preference Optimization）是 RLHF 的简化替代方案，",e.jsx("strong",{children:"无需单独的奖励模型和 PPO 训练"}),"，直接在偏好数据上优化策略，实现更稳定、高效的对齐。"]}),e.jsx(r,{code:`from trl import DPOTrainer, DPOConfig
from transformers import AutoModelForCausalLM, AutoTokenizer

# 加载参考模型（通常是 SFT 模型）
model = AutoModelForCausalLM.from_pretrained("./sft-model")
ref_model = AutoModelForCausalLM.from_pretrained("./sft-model")  # 固定作为参考
tokenizer = AutoTokenizer.from_pretrained("./sft-model")

# DPO 配置（比 PPO 简单得多）
dpo_config = DPOConfig(
    beta=0.1,                    # 温度参数，控制偏离参考模型的程度
    max_length=512,
    max_prompt_length=128,
    learning_rate=5e-7,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4
)

# 偏好数据格式
# 每条数据包含: prompt + chosen_response + rejected_response
preference_data = [
    {
        "prompt": "如何学习编程？",
        "chosen": "建议从 Python 开始，它语法简洁且应用广泛...",
        "rejected": "编程很难，你可能学不会。"
    },
    # ... 更多偏好对
]

# DPO 训练器（无需奖励模型！）
dpo_trainer = DPOTrainer(
    model=model,
    ref_model=ref_model,
    args=dpo_config,
    train_dataset=preference_data,
    tokenizer=tokenizer
)

dpo_trainer.train()

# DPO vs RLHF 对比:
# RLHF: SFT → 训练 RM → PPO 优化 (3 阶段，复杂)
# DPO:  SFT → DPO 优化 (2 阶段，简单)
# 
# 实验结果: DPO 在多数基准上与 RLHF 相当甚至更好
# 且训练更稳定、超参数更少、实现更简单`,language:"python",highlights:[11,21,22,23,24,31,32,33],filename:"dpo_training.py",description:"DPO 直接偏好优化"}),e.jsx(i,{title:"DPO 核心思想",children:e.jsx("pre",{className:"font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre",children:`
DPO 损失函数（简化版）:

L_DPO = -log σ(β · log[π(y_w|x)/π_ref(y_w|x)] 
                - β · log[π(y_l|x)/π_ref(y_l|x)])

其中:
- y_w = chosen response (优选回答)
- y_l = rejected response (拒绝回答)
- π = 当前策略模型
- π_ref = 参考模型（固定）
- β = 温度参数

直观理解:
最大化 (chosen 的概率 / 参考概率) 
相对于 
(rejected 的概率 / 参考概率)

即: 让模型更倾向于生成人类偏好的回答，
同时避免偏离参考模型太远（防止崩溃）`})}),e.jsx(n,{label:"DPO 的优势",children:"① 无需训练奖励模型（节省时间和算力）；② 避免 PPO 的不稳定性；③ 超参数更少（主要是 β）；④ 开源实现成熟（TRL 库支持）。目前已成为对齐任务的主流选择。"}),e.jsx("h2",{id:"training-data",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、训练数据工程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"数据质量决定微调上限。高质量训练数据需要精心构建，包括数据收集、清洗、去重、平衡和质量评估等环节。"}),e.jsx(r,{code:`# 训练数据处理流水线
import json
import re
from datasets import Dataset

# 1. 数据收集（多源融合）
def collect_data():
    sources = [
        load_from_json("domain_qa.json"),      # 领域问答
        load_from_csv("customer_service.csv"),  # 客服对话
        scrape_web("technical_docs"),           # 技术文档
        generate_synthetic(prompt_templates)    # 合成数据
    ]
    return merge_sources(sources)

# 2. 数据清洗
def clean_text(text):
    """去除噪声、标准化格式"""
    # 去除 HTML 标签
    text = re.sub(r'<[^>]+>', '', text)
    # 去除多余空白
    text = re.sub(r's+', ' ', text).strip()
    # 统一标点
    text = text.replace('「', '"').replace('」', '"')
    return text

# 3. 去重（MinHash + LSH）
from datasketch import MinHash, MinHashLSH

def deduplicate(data, threshold=0.85):
    """语义去重，保留多样性"""
    lsh = MinHashLSH(threshold=threshold)
    unique_data = []
    
    for item in data:
        minhash = MinHash(num_perm=128)
        for word in tokenize(item["text"]):
            minhash.update(word.encode('utf8'))
        
        if not lsh.query(minhash):  # 无相似项
            lsh.insert(len(unique_data), minhash)
            unique_data.append(item)
    
    return unique_data

# 4. 质量过滤
def filter_quality(data):
    """基于规则 + 模型的质量评分"""
    filtered = []
    for item in data:
        score = quality_scorer(item)  # 自定义评分函数
        
        # 过滤条件
        if (score > 0.7 and 
            len(item["text"]) > 50 and 
            has_valid_structure(item)):
            filtered.append(item)
    
    return filtered

# 5. 数据平衡（类别/难度分布）
def balance_data(data, target_distribution):
    """确保各类别数据比例合理"""
    balanced = resample_by_category(data, target_distribution)
    return balanced

# 最终数据集统计
final_dataset = Dataset.from_list(processed_data)
print(f"训练样本数: {len(final_dataset):,}")
print(f"平均长度: {final_dataset['length'].mean():.0f} tokens")
print(f"类别分布: {final_dataset['category'].value_counts()}")

# 理想数据集特征:
# ✓ 10K-100K 高质量样本（LoRA 场景）
# ✓ 覆盖多种任务类型和难度级别
# ✓ 无明显偏见和错误信息
# ✓ 与目标任务分布一致`,language:"python",highlights:[8,18,29,40,55,63,69],filename:"data_engineering.py",description:"训练数据处理全流程"}),e.jsxs(t,{type:"tip",title:"数据质量黄金法则",children:[e.jsxs("strong",{children:["10K 高质量数据 ",">"," 1M 低质量数据"]}),"。优先保证：① 准确性（无事实错误）；② 多样性（覆盖边缘情况）；③ 一致性（格式统一）；④ 相关性（与目标任务匹配）。宁缺毋滥。"]}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：数据越多越好",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为收集百万级数据必然带来更好的微调效果。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：对于 LoRA/QLoRA，10K-50K 高质量样本通常已达到性能饱和点。过多低质量数据反而会导致过拟合或性能下降。关键在于",e.jsx("strong",{children:"数据质量而非数量"}),"，应投入 70% 精力在数据清洗和标注上。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：Rank 越大效果越好",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为增加 LoRA rank 能持续提升性能。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：实验表明，当 rank 从 8 增加到 64 时有明显提升，但超过 64 后收益急剧递减，甚至因过拟合而下降。应根据任务复杂度选择：简单任务 r=8-16，复杂任务 r=32-64，极少需要 r",">","128。"]})]}),e.jsxs(t,{type:"danger",title:"误区 3：微调可以修复所有问题",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为通过微调可以让模型掌握它完全不知道的知识。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：微调擅长",e.jsx("strong",{children:"风格迁移、格式适配、领域术语学习"}),"，但难以注入全新的事实知识。如果基座模型缺乏某领域的基础知识，应先考虑 RAG（检索增强生成）或选择更强的基座模型，而非依赖微调。"]})]}),e.jsxs(t,{type:"warning",title:"误区 4：QLoRA 总是比 LoRA 差",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为 4-bit 量化必然导致性能损失。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：多项研究（包括 QLoRA 原论文）表明，QLoRA 在大多数任务上与标准 LoRA 性能相当（差异 ","<","1%），因为量化仅应用于冻结的基础模型，LoRA 适配器仍保持 16-bit。QLoRA 的主要优势是显存效率，而非牺牲精度。"]})]}),e.jsxs(t,{type:"warning",title:"误区 5：RLHF 是对齐的唯一方案",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"错误认知"}),"：认为必须使用 RLHF 才能让模型符合人类偏好。"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"正确理解"}),"：DPO、IPO（Identity Preference Optimization）、KTO（Kahneman-Tversky Optimization）等新技术提供了更简单的替代方案。对于大多数应用场景，DPO 已足够，仅在极端安全要求场景才需要完整的 RLHF 流程。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、面试真题"}),e.jsx(m,{questions:[{question:"LoRA 为什么能大幅减少训练参数量？其数学原理是什么？",answer:"LoRA 基于低秩假设：模型适应新任务时的参数变化 ΔW 具有低秩特性。它将 ΔW 分解为两个低秩矩阵的乘积：ΔW ≈ B×A，其中 A∈R^(d×r)，B∈R^(r×d)，r<<d。当 d=4096、r=16 时，参数量从 d²=16,777,216 降至 2dr=131,072，减少 99.2%。推理时可合并为 W+W'=W+BA，无额外延迟。"},{question:"QLoRA 相比 LoRA 的核心改进是什么？为什么能在消费级 GPU 上微调大模型？",answer:"QLoRA 引入 4-bit NormalFloat (NF4) 量化，将基础模型权重从 16-bit 压缩到 4-bit，显存占用降低 75%。同时使用双重量化和分页优化器进一步节省内存。由于 LoRA 适配器保持 16-bit 且参数量极小（<1%），量化误差对最终性能影响微乎其微（<1%）。这使得 70B 模型可在单卡 A100 80GB 上微调，7B 模型可在 RTX 3090 24GB 上运行。"},{question:"指令微调（Instruction Tuning）与普通微调有什么区别？为什么它能提升泛化能力？",answer:"普通微调使用 (input, output) 对，模型学习特定任务的映射；指令微调使用 (instruction, input, output) 三元组，模型学习任务描述与执行的关联。关键区别：① 指令微调暴露于多样化任务格式，学会理解任务意图而非死记硬背；② 通过多任务联合训练，模型学习到跨任务的通用模式；③ 指令作为元信息，帮助模型在新任务上进行零样本或少样本推理。实验表明，指令微调后的模型在未见任务上的表现提升 20-40%。"},{question:"RLHF 的三个阶段分别是什么？每个阶段的作用是什么？",answer:"① SFT（Supervised Fine-Tuning）：使用指令数据微调基座模型，使其学会遵循指令格式；② RM（Reward Model）训练：收集人类对多个模型输出的偏好标注（A vs B），训练奖励模型预测人类偏好分数；③ PPO（Proximal Policy Optimization）：以 SFT 模型为初始策略，奖励模型提供奖励信号，通过强化学习优化策略，使输出更符合人类偏好。三阶段逐步从模仿学习过渡到偏好对齐。"},{question:"DPO 相比 RLHF 有哪些优势？为什么它越来越流行？",answer:"DPO 的核心优势：① 无需训练独立的奖励模型（节省算力和时间）；② 避免 PPO 的训练不稳定性（PPO 对超参数敏感，易崩溃）；③ 超参数更少（主要是 β，而 PPO 需要调整 clip range、value coefficient 等多个参数）；④ 实现更简单、开源支持成熟。理论推导表明，DPO 直接优化偏好损失的闭式解等价于 RLHF 的最优策略，因此在多数基准上性能相当甚至更好。对于资源有限的团队，DPO 是更实用的选择。"},{question:"如何判断微调是否过拟合？有哪些防止过拟合的策略？",answer:"过拟合迹象：① 训练集 loss 持续下降但验证集 loss 上升；② 模型在训练数据上表现完美但在测试数据上大幅下降；③ 生成的内容过于模板化、缺乏多样性。防止策略：① 早停（Early Stopping）：监控验证集 loss，连续 N 个 epoch 未改善则停止；② 正则化：增加 LoRA dropout（0.05-0.1）、减小 learning rate；③ 数据增强：扩充训练数据多样性；④ 减小 rank 或 alpha；⑤ 使用更多训练数据；⑥ 交叉验证选择最佳 checkpoint。"},{question:"微调数据的质量标准有哪些？如何构建高质量数据集？",answer:"质量标准：① 准确性：无事实错误、逻辑矛盾；② 多样性：覆盖不同场景、难度、风格；③ 一致性：格式统一、标注规范；④ 相关性：与目标任务高度匹配；⑤ 平衡性：各类别/难度比例合理。构建流程：多源收集 → 自动化清洗（去 HTML、标准化） → 语义去重（MinHash） → 质量过滤（规则+模型评分） → 人工抽检 → 数据平衡 → 划分训练/验证/测试集。关键原则：10K 高质量 > 1M 低质量，70% 精力投入数据工程。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、知识关联"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 my-5",children:[e.jsxs("a",{href:"/docs/06-ai-fundamentals/llm-basics",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"LLM 基础原理"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"Transformer、注意力机制"})]}),e.jsxs("a",{href:"/docs/08-python/python-async",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-teal mb-1",children:"前置知识 ←"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-teal",children:"Python 异步编程"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"异步数据加载与处理"})]}),e.jsxs("a",{href:"/docs/06-ai-fundamentals/llm-quantization-deployment",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-accent mb-1",children:"相关技术 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-accent",children:"模型量化与部署"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"INT8/INT4 量化、推理优化"})]}),e.jsxs("a",{href:"/docs/06-ai-fundamentals/pytorch",className:"block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group",children:[e.jsx("div",{className:"text-[11px] font-mono text-indigo mb-1",children:"底层框架 →"}),e.jsx("div",{className:"font-semibold text-ink group-hover:text-indigo",children:"PyTorch 深度学习"}),e.jsx("div",{className:"text-[12px] text-ink-muted mt-1",children:"张量运算、自动微分"})]})]}),e.jsx(t,{type:"info",title:"学习路径建议",children:"初学者建议按此顺序学习：① 理解 LoRA 数学原理（低秩分解）；② 实践 PEFT 库的基本用法；③ 尝试 QLoRA 在消费级 GPU 上微调 7B 模型；④ 构建自己的指令微调数据集；⑤ 进阶学习 DPO/RLHF 对齐技术。推荐工具链：HuggingFace Transformers + PEFT + TRL + Accelerate。"}),e.jsx(d,{...o(s.category,s.id)})]})}),e.jsx(l,{items:p})]})}export{_ as default};
