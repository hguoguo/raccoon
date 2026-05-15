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
  { id: 'multimodal-overview', text: '一、多模态概述', level: 2 },
  { id: 'vision-understanding', text: '二、视觉理解能力', level: 2 },
  { id: 'audio-processing', text: '三、音频处理能力', level: 2 },
  { id: 'architecture-patterns', text: '四、架构设计模式', level: 2 },
  { id: 'fusion-strategies', text: '五、模态融合策略', level: 2 },
  { id: 'gpt4v-analysis', text: '六、GPT-4V 实战分析', level: 2 },
  { id: 'clip-applications', text: '七、CLIP 模型应用', level: 2 },
  { id: 'agent-design', text: '八、多模态 Agent 设计', level: 2 },
  { id: 'challenges', text: '九、技术挑战与优化', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function MultimodalAgent({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              多模态 Agent 是能够同时理解和处理<strong className="text-accent">多种模态数据</strong>（文本、图像、音频、视频等）的智能系统，通过跨模态融合和推理，实现比单模态更强大的感知和决策能力。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要多模态？">
            人类通过视觉、听觉、触觉等多种感官感知世界，单一模态的信息往往不完整或有歧义。多模态 AI 模仿人类的感知方式，例如：结合图像和文本理解 meme 梗图，结合语音和唇语提升识别准确率，结合视频和音频理解复杂场景。
          </Callout>

          <h2 id="multimodal-overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、多模态概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            多模态学习（Multimodal Learning）研究如何让机器理解和生成多种类型的数据，是 AI 从 Narrow AI 迈向 General AI 的关键一步。
          </p>

          <DiagramBlock title="多模态数据类型">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────┐
│           多模态数据分类                     │
├──────────┬──────────────────────────────────┤
│  文本    │ 自然语言、代码、标记语言          │
│  图像    │ 照片、图表、截图、手绘            │
│  音频    │ 语音、音乐、环境音                │
│  视频    │ 电影、直播、监控录像              │
│  3D      │ 点云、网格、体素                  │
│  传感器  │ 温度、加速度、GPS                 │
└──────────┴──────────────────────────────────┘

典型应用场景：
• 图文检索：输入文字搜索相关图片
• 图像描述：为图片生成文字说明
• 视觉问答：根据图片回答问题
• 视频理解：分析视频内容和情感
• 多模态对话：结合图像进行聊天
• 自动驾驶：融合摄像头、雷达、地图
            `}</pre>
          </DiagramBlock>

          <SideNote label="模态对齐">
            多模态的核心挑战是<strong>模态对齐（Modality Alignment）</strong>：如何将不同模态的数据映射到统一的语义空间，使得"猫的图片"和"cat"这个词在向量空间中距离相近。CLIP、ALIGN 等模型通过对比学习实现了这一目标。
          </SideNote>

          <h2 id="vision-understanding" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、视觉理解能力
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            视觉是多模态中最成熟的模态，现代 VLM（Vision-Language Model）可以理解复杂的图像内容。
          </p>

          <Playground
            code={`# 视觉理解能力层次

# Level 1: 图像分类
# 输入：图片
# 输出：类别标签
# 示例：这是一只猫

# Level 2: 物体检测
# 输入：图片
# 输出：边界框 + 类别
# 示例：[猫: (100, 200, 150, 250), 狗: (300, 180, 380, 270)]

# Level 3: 图像分割
# 输入：图片
# 输出：像素级掩码
# 示例：每个像素的类别标注

# Level 4: 图像描述（Image Captioning）
# 输入：图片
# 输出：自然语言描述
# 示例："一只橘猫坐在窗台上，阳光透过窗户洒在它身上"

# Level 5: 视觉问答（VQA）
# 输入：图片 + 问题
# 输出：答案
# 示例：Q: "猫是什么颜色？" A: "橘色"

# Level 6: 复杂推理
# 输入：图片 + 复杂问题
# 输出：推理过程和答案
# 示例：Q: "为什么猫看起来很舒服？" 
#       A: "因为阳光温暖，窗台柔软，环境安静，这些都是猫喜欢的条件"

# GPT-4V 支持的视觉任务
# - OCR：读取图片中的文字
# - 图表理解：分析折线图、柱状图、饼图
# - 数学题求解：识别手写公式并解答
# - 代码截图转代码：OCR + 语法纠正
# - UI 设计稿转代码：识别布局生成 HTML/CSS
# - 科学图表：理解显微镜图像、卫星图、医学影像`}
            language="python"
            highlights={[4, 9, 14, 19, 24, 29, 36]}
            filename="vision-levels.py"
            description="视觉理解能力层次"
          />

          <Callout type="info" title="VLM 工作原理">
            现代 VLM（如 GPT-4V、LLaVA）通常采用以下架构：① 视觉编码器（ViT）将图像转换为视觉 token；② 投影层将视觉 token 映射到语言模型的嵌入空间；③ LLM 同时处理文本 token 和视觉 token，进行统一推理。关键在于视觉-语言的对齐训练。
          </Callout>

          <h2 id="audio-processing" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、音频处理能力
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            音频处理包括语音识别（ASR）、语音合成（TTS）、声音事件检测等任务。
          </p>

          <Playground
            code={`# 音频处理任务

# 1. 语音识别（ASR - Automatic Speech Recognition）
# 输入：音频波形
# 输出：文本转录
# 模型：Whisper、Wav2Vec 2.0、Conformer

import whisper

model = whisper.load_model("large")
result = model.transcribe("audio.mp3")
print(result["text"])  # "你好，世界"

# 2. 语音合成（TTS - Text-to-Speech）
# 输入：文本
# 输出：音频波形
# 模型：Tacotron 2、VITS、Bark

from TTS.api import TTS

tts = TTS(model_name="tts_models/zh-CN/baker/tacotron2-DDC")
tts.tts_to_file(text="你好，世界", file_path="output.wav")

# 3. 说话人识别（Speaker Recognition）
# 输入：音频
# 输出：说话人身份
# 应用：声纹锁、会议记录分角色

# 4. 情感识别（Speech Emotion Recognition）
# 输入：音频
# 输出：情感标签（高兴、悲伤、愤怒等）
# 应用：客服质量监控、心理健康评估

# 5. 声音事件检测（Sound Event Detection）
# 输入：音频
# 输出：事件类型和时间戳
# 示例：检测到"玻璃破碎"在 00:03:15

# 6. 音乐理解
# - 音乐分类：流派、情绪、节奏
# - 乐器识别：钢琴、吉他、鼓
# - 音乐生成：根据描述创作音乐

# 7. 多模态音频-文本对齐
# Whisper 可以同时输出时间戳对齐的转录
# 用于字幕生成、视频剪辑

segments = result["segments"]
for segment in segments:
    print(f"[{segment['start']:.2f} - {segment['end']:.2f}] {segment['text']}`}
            language="python"
            highlights={[9, 20, 28, 35, 42, 49]}
            filename="audio-processing.py"
            description="音频处理任务"
          />

          <SideNote label="Whisper 模型">
            OpenAI 的 Whisper 是目前最强的开源 ASR 模型，支持 99 种语言，具有强大的噪声鲁棒性和零样本迁移能力。large-v3 版本在多数基准上接近人类水平。
          </SideNote>

          <h2 id="architecture-patterns" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、架构设计模式
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            多模态 Agent 的架构设计决定了如何融合和处理不同模态的信息。
          </p>

          <DiagramBlock title="多模态架构模式">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
模式 1: Early Fusion（早期融合）
┌────────┐    ┌────────┐
│ Image  │───▶│        │
│ Encoder│    │        │
└────────┘    │ Fusion │──▶ Joint Representation ──▶ Task Head
┌────────┐    │ Layer  │
│ Text   │───▶│        │
│ Encoder│    │        │
└────────┘    └────────┘
特点：在特征层面融合，适合模态间强相关的任务

模式 2: Late Fusion（晚期融合）
┌────────┐                 ┌────────┐
│ Image  │──▶ Image Model ─▶│        │
│ Input  │                 │ Fusion │──▶ Final Decision
┌────────┐                 │ Layer  │
│ Text   │──▶ Text Model ──▶│        │
│ Input  │                 └────────┘
特点：各模态独立处理，最后融合决策，适合模态独立性强的任务

模式 3: Hybrid Fusion（混合融合）
┌────────┐    ┌────────┐    ┌────────┐
│ Image  │───▶│        │    │        │
│ Encoder│    │ Early  │───▶│        │
└────────┘    │ Fusion │    │ Late   │──▶ Output
┌────────┐    │        │    │ Fusion │
│ Text   │───▶│        │───▶│        │
│ Encoder│    └────────┘    └────────┘
┌────────┐                       ▲
│ Audio  │───────────────────────┘
│ Encoder│
└────────┘
特点：多层次融合，灵活性最高，性能通常最好

主流模型架构：
• CLIP：Early Fusion（对比学习）
• Flamingo：Late Fusion（交叉注意力）
• GPT-4V：Hybrid（多层融合）
• LLaVA：Early Fusion（线性投影）
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# 多模态融合代码示例

import torch
import torch.nn as nn
from transformers import CLIPModel, CLIPProcessor

# Early Fusion 示例
class EarlyFusionModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.clip = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
        
        # 冻结 CLIP 参数
        for param in self.clip.parameters():
            param.requires_grad = False
        
        # 融合层
        self.fusion = nn.Sequential(
            nn.Linear(512 * 2, 512),  # 图像 + 文本 embedding
            nn.ReLU(),
            nn.Linear(512, 256),
            nn.ReLU()
        )
        
        # 分类头
        self.classifier = nn.Linear(256, 10)
    
    def forward(self, image, text):
        # 提取特征
        image_features = self.clip.get_image_features(image)
        text_features = self.clip.get_text_features(text)
        
        # 拼接融合
        combined = torch.cat([image_features, text_features], dim=1)
        fused = self.fusion(combined)
        
        # 分类
        output = self.classifier(fused)
        return output

# Late Fusion 示例
class LateFusionModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.image_model = torchvision.models.resnet50(pretrained=True)
        self.text_model = BertModel.from_pretrained('bert-base-uncased')
        
        # 独立的全连接层
        self.image_fc = nn.Linear(2048, 256)
        self.text_fc = nn.Linear(768, 256)
        
        # 决策融合
        self.decision_fusion = nn.Linear(256 * 2, 10)
    
    def forward(self, image, text):
        # 独立处理
        image_feat = self.image_model(image)
        image_emb = self.image_fc(image_feat)
        
        text_outputs = self.text_model(**text)
        text_emb = self.text_fc(text_outputs.last_hidden_state.mean(dim=1))
        
        # 融合决策
        combined = torch.cat([image_emb, text_emb], dim=1)
        output = self.decision_fusion(combined)
        return output

# Cross-Attention Fusion（最强大）
class CrossAttentionFusion(nn.Module):
    def __init__(self, d_model=512, nhead=8):
        super().__init__()
        self.cross_attn = nn.MultiheadAttention(d_model, nhead)
        self.norm = nn.LayerNorm(d_model)
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_model * 4),
            nn.GELU(),
            nn.Linear(d_model * 4, d_model)
        )
    
    def forward(self, query, key_value):
        # query: 文本 embedding [seq_len, batch, d_model]
        # key_value: 图像 embedding [num_patches, batch, d_model]
        
        # 交叉注意力：文本关注图像
        attn_output, _ = self.cross_attn(query, key_value, key_value)
        
        # 残差连接 + 归一化
        out = self.norm(query + attn_output)
        
        # FFN
        out = out + self.ffn(out)
        
        return out`}
            language="python"
            highlights={[9, 35, 52, 77]}
            filename="fusion-architectures.py"
            description="多模态融合架构"
          />

          <Callout type="tip" title="如何选择融合策略？">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>Early Fusion</strong>：模态间高度相关（如图文匹配），计算效率高</li>
              <li><strong>Late Fusion</strong>：模态相对独立（如图像分类 + 文本分类），灵活性好</li>
              <li><strong>Cross-Attention</strong>：需要细粒度交互（如 VQA、图像描述），性能最佳但计算成本高</li>
              <li><strong>Hybrid</strong>：复杂任务（如视频理解），结合多种策略</li>
            </ul>
          </Callout>

          <h2 id="fusion-strategies" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、模态融合策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            除了架构层面的融合，还有多种算法级别的融合策略。
          </p>

          <Playground
            code={`# 模态融合策略

# 1. Concatenation（拼接）
# 最简单的方式，直接拼接特征向量
combined = torch.cat([image_feat, text_feat], dim=-1)

# 2. Element-wise Addition（逐元素相加）
# 要求维度相同，假设模态在同一语义空间
combined = image_feat + text_feat

# 3. Element-wise Multiplication（逐元素相乘）
# 强调共同激活的特征
combined = image_feat * text_feat

# 4. Bilinear Pooling（双线性池化）
# 捕捉特征间的二阶交互
class BilinearPooling(nn.Module):
    def __init__(self, dim1, dim2, output_dim):
        super().__init__()
        self.W = nn.Parameter(torch.randn(dim1, dim2, output_dim))
    
    def forward(self, x1, x2):
        # x1: [batch, dim1], x2: [batch, dim2]
        interaction = torch.einsum('bd,bD,bdD->bD', x1, x2, self.W)
        return interaction

# 5. Attention-based Fusion（注意力融合）
# 动态加权不同模态的重要性
class AttentionFusion(nn.Module):
    def __init__(self, dim):
        super().__init__()
        self.attention = nn.Sequential(
            nn.Linear(dim * 2, dim),
            nn.Tanh(),
            nn.Linear(dim, 2),
            nn.Softmax(dim=-1)
        )
    
    def forward(self, feat1, feat2):
        combined = torch.cat([feat1, feat2], dim=-1)
        weights = self.attention(combined)  # [batch, 2]
        
        weighted = weights[:, 0:1] * feat1 + weights[:, 1:2] * feat2
        return weighted

# 6. Tensor Fusion（张量融合）
# 外积捕捉所有高阶交互
outer_product = torch.einsum('bi,bj->bij', feat1, feat2)

# 7. Contrastive Learning（对比学习）
# 拉近正样本对，推远负样本对
# CLIP 使用这种方式训练
def contrastive_loss(image_emb, text_emb, temperature=0.07):
    # 计算相似度矩阵
    logits = torch.matmul(image_emb, text_emb.t()) / temperature
    
    # 对角线为正样本
    labels = torch.arange(len(image_emb)).to(image_emb.device)
    
    loss_i = F.cross_entropy(logits, labels)
    loss_t = F.cross_entropy(logits.t(), labels)
    
    return (loss_i + loss_t) / 2

# 实际应用建议
# - 简单任务：Concatenation 或 Addition
# - 中等复杂度：Attention-based Fusion
# - 高性能需求：Cross-Attention 或 Bilinear Pooling
# - 预训练模型：Contrastive Learning（CLIP 风格）`}
            language="python"
            highlights={[4, 9, 14, 19, 31, 47, 57]}
            filename="fusion-strategies.py"
            description="模态融合策略"
          />

          <SideNote label="注意力机制的优势">
            Attention-based Fusion 可以<strong>动态调整</strong>不同模态的权重。例如：对于"这张图片是什么颜色？"，视觉模态权重更高；对于"图片中的人叫什么名字？"，文本模态（如果有名字标签）权重更高。这种自适应能力显著提升了模型性能。
          </SideNote>

          <h2 id="gpt4v-analysis" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、GPT-4V 实战分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            GPT-4V（GPT-4 with Vision）是目前最强的通用多模态模型之一，支持复杂的视觉推理任务。
          </p>

          <Playground
            code={`# GPT-4V 使用示例

from openai import OpenAI

client = OpenAI(api_key="your-api-key")

# 示例 1: 图像描述
response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "描述这张图片"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://example.com/image.jpg"
                    }
                }
            ]
        }
    ],
    max_tokens=300
)

print(response.choices[0].message.content)
# 输出："这是一张日落时分的海滩照片，天空呈现出橙色和紫色的渐变..."

# 示例 2: 视觉问答
response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "图中有几只猫？它们分别在做什么？"},
                {
                    "type": "image_url",
                    "image_url": {"url": "https://example.com/cats.jpg"}
                }
            ]
        }
    ]
)

# 示例 3: OCR + 理解
response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "读取这张截图中的错误信息，并解释原因"},
                {
                    "type": "image_url",
                    "image_url": {"url": "https://example.com/error.png"}
                }
            ]
        }
    ]
)

# 示例 4: 图表分析
response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "分析这个销售趋势图，指出关键洞察"},
                {
                    "type": "image_url",
                    "image_url": {"url": "https://example.com/chart.png"}
                }
            ]
        }
    ]
)

# 示例 5: 多图像对比
response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "比较这两张产品图片的差异"},
                {
                    "type": "image_url",
                    "image_url": {"url": "https://example.com/product1.jpg"}
                },
                {
                    "type": "image_url",
                    "image_url": {"url": "https://example.com/product2.jpg"}
                }
            ]
        }
    ]
)

# 示例 6: 代码截图转代码
response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "将这个代码截图转换为可运行的 Python 代码"},
                {
                    "type": "image_url",
                    "image_url": {"url": "https://example.com/code.png"}
                }
            ]
        }
    ]
)

# 最佳实践
# 1. 图像分辨率：支持最高 2048x2048，建议使用高清图片
# 2. 提示词工程：明确任务类型（描述/问答/分析）
# 3. 多轮对话：可以基于之前的图像继续提问
# 4. Base64 编码：本地图片需要转换为 base64
# 5. 成本控制：每次调用消耗较多 token，注意预算`}
            language="python"
            highlights={[8, 31, 50, 69, 88, 110, 132]}
            filename="gpt4v-examples.py"
            description="GPT-4V 实战示例"
          />

          <Callout type="warning" title="GPT-4V 的局限性">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>小文字识别</strong>：对于图片中的小字体文字，OCR 准确率下降</li>
              <li><strong>复杂图表</strong>：需要清晰标注的图表才能准确解读</li>
              <li><strong>实时性</strong>：无法处理视频流或实时摄像头输入</li>
              <li><strong>幻觉问题</strong>：可能编造图片中不存在的细节</li>
              <li><strong>成本高昂</strong>：相比纯文本 API，费用高出 5-10 倍</li>
            </ul>
          </Callout>

          <h2 id="clip-applications" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、CLIP 模型应用
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            CLIP（Contrastive Language-Image Pre-training）是 OpenAI 提出的图文对比学习模型，开启了多模态学习的新时代。
          </p>

          <Playground
            code={`# CLIP 应用示例

import torch
from PIL import Image
import clip

# 加载模型
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# 示例 1: 零样本图像分类
image = preprocess(Image.open("cat.jpg")).unsqueeze(0).to(device)
text = clip.tokenize(["a photo of a cat", "a photo of a dog"]).to(device)

with torch.no_grad():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)
    
    # 计算相似度
    logits_per_image, logits_per_text = model(image, text)
    probs = logits_per_image.softmax(dim=-1).cpu().numpy()

print(f"Cat probability: {probs[0][0]:.2%}")
print(f"Dog probability: {probs[0][1]:.2%}")

# 示例 2: 图文检索
# 构建图像数据库
image_database = []
for img_path in image_paths:
    image = preprocess(Image.open(img_path)).unsqueeze(0).to(device)
    with torch.no_grad():
        image_feat = model.encode_image(image)
    image_database.append((img_path, image_feat))

# 搜索查询
query_text = clip.tokenize(["a sunset over the ocean"]).to(device)
with torch.no_grad():
    query_feat = model.encode_text(query_text)

# 计算相似度并排序
similarities = []
for img_path, img_feat in image_database:
    sim = torch.cosine_similarity(query_feat, img_feat)
    similarities.append((img_path, sim.item()))

similarities.sort(key=lambda x: x[1], reverse=True)
print(f"Most similar image: {similarities[0][0]}")

# 示例 3: 异常检测
# 正常样本的 CLIP embedding 聚集在一起
# 异常样本偏离集群
normal_embeddings = [encode_image(img) for img in normal_samples]
center = torch.stack(normal_embeddings).mean(dim=0)

test_embedding = encode_image(test_image)
distance = torch.norm(test_embedding - center)

if distance > threshold:
    print("Anomaly detected!")

# 示例 4: 数据标注辅助
# 为无标签图像生成伪标签
candidates = ["indoor", "outdoor", "day", "night", "people", "animals"]
text_tokens = clip.tokenize(candidates).to(device)

with torch.no_grad():
    image_feat = model.encode_image(preprocess(image).unsqueeze(0).to(device))
    text_feats = model.encode_text(text_tokens)
    
    sims = torch.cosine_similarity(image_feat, text_feats)
    top_labels = torch.topk(sims, k=3).indices

print(f"Auto-labels: {[candidates[i] for i in top_labels]}")

# CLIP 的优势
# ✅ 零样本迁移：无需微调即可用于新任务
# ✅ 强大的泛化能力：在多种数据集上表现优异
# ✅ 开源可用：Hugging Face 提供多种变体
# ❌ 细粒度识别较弱：难以区分相似物种
# ❌ 空间关系理解有限：不理解"左边"、"上面"等`}
            language="python"
            highlights={[12, 27, 41, 56, 68]}
            filename="clip-applications.py"
            description="CLIP 模型应用"
          />

          <SideNote label="CLIP 变体">
            <strong>CLIP</strong>：原始版本，ViT-B/32 到 ViT-L/14。<br/>
            <strong>OpenCLIP</strong>：开源实现，支持更大规模训练。<br/>
            <strong>ALIGN</strong>：Google 提出，使用更大数据集。<br/>
            <strong>BLIP</strong>：结合生成式任务，性能更强。<br/>
            <strong>Chinese-CLIP</strong>：针对中文优化的版本。
          </SideNote>

          <h2 id="agent-design" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、多模态 Agent 设计
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            多模态 Agent 结合视觉、听觉等感知能力与 LLM 的推理能力，实现更智能的自主决策。
          </p>

          <DiagramBlock title="多模态 Agent 架构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────┐
│          多模态 Agent 工作流                  │
├─────────────────────────────────────────────┤
│                                             │
│  1. 感知层（Perception）                     │
│     ├── 视觉编码器（ViT/ResNet）             │
│     ├── 音频编码器（Whisper/Wav2Vec）        │
│     └── 其他传感器                          │
│           │                                 │
│           ▼                                 │
│  2. 融合层（Fusion）                         │
│     ├── Cross-Attention                     │
│     ├── 模态对齐                            │
│     └── 联合表示学习                        │
│           │                                 │
│           ▼                                 │
│  3. 认知层（Cognition）                      │
│     ├── LLM 推理                            │
│     ├── 记忆管理                            │
│     └── 规划模块                            │
│           │                                 │
│           ▼                                 │
│  4. 行动层（Action）                         │
│     ├── 工具调用（搜索/API/计算）            │
│     ├── 内容生成（文本/图像/代码）           │
│     └── 反馈循环                            │
│                                             │
└─────────────────────────────────────────────┘

典型应用场景：
• 智能助手：看到屏幕 + 听到语音 → 执行操作
• 机器人：视觉导航 + 语音指令 → 完成任务
• 内容审核：图像 + 文本 + 音频 → 综合判断
• 教育辅导：题目图片 + 学生提问 → 个性化解答
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# 多模态 Agent 实现框架

from langchain.agents import AgentExecutor
from langchain.tools import Tool
from transformers import CLIPProcessor, CLIPModel
import whisper

class MultimodalAgent:
    def __init__(self):
        # 初始化多模态组件
        self.clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
        self.clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
        self.whisper_model = whisper.load_model("base")
        self.llm = ChatOpenAI(model="gpt-4")
        
        # 定义工具
        self.tools = [
            Tool(
                name="analyze_image",
                func=self.analyze_image,
                description="分析图片内容，返回描述"
            ),
            Tool(
                name="transcribe_audio",
                func=self.transcribe_audio,
                description="将音频转换为文本"
            ),
            Tool(
                name="search_web",
                func=self.search_web,
                description="搜索网络信息"
            )
        ]
        
        # 创建 Agent
        self.agent = initialize_agent(
            tools=self.tools,
            llm=self.llm,
            agent_type="zero-shot-react-description"
        )
    
    def analyze_image(self, image_path: str) -> str:
        """使用 CLIP 分析图像"""
        image = Image.open(image_path)
        inputs = self.clip_processor(images=image, return_tensors="pt")
        
        with torch.no_grad():
            features = self.clip_model.get_image_features(**inputs)
        
        # 可以结合文本提示进行分类或描述
        # 这里简化为返回特征向量摘要
        return f"Image features extracted: {features.shape}"
    
    def transcribe_audio(self, audio_path: str) -> str:
        """使用 Whisper 转录音频"""
        result = self.whisper_model.transcribe(audio_path)
        return result["text"]
    
    def search_web(self, query: str) -> str:
        """搜索网络"""
        # 实现搜索逻辑
        pass
    
    def run(self, user_input: dict) -> str:
        """
        运行多模态 Agent
        
        Args:
            user_input: {
                "text": "用户文本输入",
                "image": "图片路径（可选）",
                "audio": "音频路径（可选）"
            }
        """
        # 处理多模态输入
        context = user_input.get("text", "")
        
        if "image" in user_input:
            image_desc = self.analyze_image(user_input["image"])
            context += f"\\n[Image Analysis]: {image_desc}"
        
        if "audio" in user_input:
            transcript = self.transcribe_audio(user_input["audio"])
            context += f"\\n[Audio Transcript]: {transcript}"
        
        # 调用 LLM Agent
        response = self.agent.run(context)
        return response

# 使用示例
agent = MultimodalAgent()

# 场景 1: 图文问答
result = agent.run({
    "text": "这张图片里有什么？",
    "image": "photo.jpg"
})

# 场景 2: 语音 + 图像
result = agent.run({
    "text": "帮我查找这个产品的信息",
    "image": "product.jpg",
    "audio": "question.wav"
})

# 场景 3: 纯文本（向后兼容）
result = agent.run({
    "text": "今天天气怎么样？"
})`}
            language="python"
            highlights={[9, 39, 51, 60, 67, 82]}
            filename="multimodal-agent.py"
            description="多模态 Agent 实现"
          />

          <Callout type="tip" title="多模态 Agent 设计原则">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>模态互补</strong>：利用不同模态的优势（视觉的空间信息、音频的时间信息）</li>
              <li><strong>容错机制</strong>：某个模态失败时，其他模态仍能工作</li>
              <li><strong>异步处理</strong>：耗时模态（如视频处理）应异步执行</li>
              <li><strong>缓存策略</strong>：重复的图像/音频不必重新编码</li>
              <li><strong>用户确认</strong>：敏感操作（如删除文件）需用户确认</li>
            </ul>
          </Callout>

          <h2 id="challenges" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、技术挑战与优化
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            多模态系统面临诸多技术挑战，需要针对性的优化策略。
          </p>

          <Playground
            code={`# 多模态技术挑战与解决方案

# 挑战 1: 计算资源需求大
# 问题：多个编码器 + LLM = 高显存占用
# 解决方案：
# - 模型量化（INT8/INT4）
# - 知识蒸馏（大模型 → 小模型）
# - 模态选择性激活（按需加载编码器）
# - 云端推理 + 边缘缓存

# 挑战 2: 模态不对齐
# 问题：图像和文本在语义空间不一致
# 解决方案：
# - 对比学习预训练（CLIP 风格）
# - 跨模态注意力微调
# - 引入中间表示（场景图、知识图谱）

# 挑战 3: 数据稀缺
# 问题：高质量多模态标注数据少
# 解决方案：
# - 弱监督学习（利用网络图文对）
# - 自监督学习（掩码建模、对比学习）
# - 数据增强（回译、图像变换）
# - 合成数据生成（Stable Diffusion + GPT）

# 挑战 4: 实时性要求
# 问题：多模态推理延迟高
# 解决方案：
# - 模型并行（不同模态在不同 GPU）
# - 流水线并行（重叠编码和推理）
# - 近似最近邻搜索（FAISS 加速检索）
# - 结果缓存（相同输入直接返回）

# 挑战 5: 鲁棒性不足
# 问题：对抗攻击、噪声干扰
# 解决方案：
# - 对抗训练
# - 多模态一致性检查（图像和文本是否矛盾）
# - 不确定性估计（低置信度时拒绝回答）
# - 人工审核回路（高风险场景）

# 挑战 6: 隐私与安全
# 问题：图像/音频包含敏感信息
# 解决方案：
# - 本地推理（不上传云端）
# - 差分隐私（添加噪声保护个体）
# - 联邦学习（数据不出设备）
# - 自动脱敏（人脸模糊、语音变声）

# 性能优化技巧
# 1. 批处理：同时处理多个请求
# 2. 懒加载：按需加载模型权重
# 3. 混合精度：FP16/BF16 加速推理
# 4. 算子融合：减少内存拷贝
# 5. 异步 I/O：非阻塞数据加载`}
            language="python"
            highlights={[6, 14, 22, 30, 38, 46]}
            filename="challenges-solutions.py"
            description="技术挑战与解决方案"
          />

          <SideNote label="边缘部署">
            对于隐私敏感或低延迟场景，可以考虑在<strong>边缘设备</strong>（手机、IoT 设备）上部署轻量级多模态模型。MobileCLIP、TinyLLaVA 等模型专为移动端优化，在保持合理性能的同时大幅降低资源需求。
          </SideNote>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="danger" title="误区 1：多模态就是多个单模态模型的组合">
            <p className="mb-2"><strong>错误认知</strong>：认为多模态系统只是分别运行图像模型和文本模型，然后拼接结果。</p>
            <p><strong>正确理解</strong>：真正的多模态需要在<strong>特征层面或决策层面深度融合</strong>，让模型学习到模态间的交互关系。简单的后融合（Late Fusion）无法捕捉跨模态的细粒度关联，性能远低于端到端训练的多模态模型。</p>
          </Callout>

          <Callout type="danger" title="误区 2：更多模态一定更好">
            <p className="mb-2"><strong>错误认知</strong>：认为加入的模态越多，系统性能越强。</p>
            <p><strong>正确理解</strong>：增加模态会带来<strong>维度灾难</strong>和<strong>噪声累积</strong>。如果新增模态与任务无关或质量差，反而会降低性能。应根据任务需求选择最相关的模态，并确保各模态质量均衡。有时单模态（如纯文本）已足够解决问题。</p>
          </Callout>

          <Callout type="danger" title="误区 3：CLIP 可以替代所有视觉任务">
            <p className="mb-2"><strong>错误认知</strong>：认为 CLIP 的零样本能力可以取代专门的视觉模型。</p>
            <p><strong>正确理解</strong>：CLIP 在粗粒度分类和检索上表现出色，但在<strong>细粒度识别</strong>（如区分鸟的种类）、<strong>空间关系理解</strong>（如"左边的猫"）、<strong>密集预测</strong>（如分割、检测）上仍不如专用模型。最佳实践是 CLIP + 专用模型的组合。</p>
          </Callout>

          <Callout type="warning" title="误区 4：多模态模型不需要大量数据">
            <p className="mb-2"><strong>错误认知</strong>：认为预训练好的多模态模型可以直接应用于任何任务。</p>
            <p><strong>正确理解</strong>：虽然 CLIP 等模型具有零样本能力，但在特定领域（如医疗影像、工业质检）仍需<strong>领域适配</strong>。可以通过少量标注数据微调（Few-shot Fine-tuning）或提示工程（Prompt Engineering）提升性能。完全零样本在专业领域往往不够用。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "什么是多模态学习？为什么需要多模态？",
              answer: "多模态学习研究如何让机器理解和处理多种类型的数据（文本、图像、音频等）。需要多模态的原因：① 现实世界本质是多模态的，单一模态信息不完整；② 模态间可以互补和校验，提升鲁棒性；③ 某些任务必须依赖多模态（如视频理解需要视觉+音频）；④ 模仿人类的多感官感知方式，向通用 AI 迈进。"
            },
            {
              question: "CLIP 模型的工作原理是什么？",
              answer: "CLIP 通过对比学习训练图像编码器和文本编码器。训练时，将 N 个图像-文本对组成批次，计算所有图像与所有文本的相似度矩阵，对角线为正样本对。损失函数鼓励正样本对相似度最大化，负样本对相似度最小化。训练完成后，可以将任意图像和文本映射到同一语义空间，实现零样本分类和检索。"
            },
            {
              question: "Early Fusion 和 Late Fusion 的区别？",
              answer: "Early Fusion 在特征层面融合：各模态编码后拼接或通过融合层合并，再输入任务头。优点是能捕捉模态间细粒度交互，缺点是计算成本高。Late Fusion 在决策层面融合：各模态独立处理后，融合最终决策（如投票、加权平均）。优点是灵活、可并行，缺点是无法捕捉跨模态交互。选择取决于任务需求和资源限制。"
            },
            {
              question: "GPT-4V 的技术架构是怎样的？",
              answer: "GPT-4V 的具体架构未公开，但推测基于以下设计：① 视觉编码器（可能是自定义 ViT）将图像转换为视觉 token；② 投影层将视觉 token 映射到 GPT-4 的嵌入空间；③ GPT-4 同时处理文本 token 和视觉 token，通过自注意力机制进行跨模态推理；④ 可能在多层进行融合，而非简单的早期或晚期融合。关键是大规模的图文对齐预训练。"
            },
            {
              question: "如何解决多模态数据稀缺问题？",
              answer: "① 弱监督学习：利用网络爬取的图文对（如 ALT、LAION 数据集），虽噪声大但规模巨大；② 自监督学习：掩码建模（MAE）、对比学习（SimCLR）、生成式预训练；③ 数据增强：图像变换（裁剪、旋转）、文本回译、跨模态翻译；④ 合成数据：使用 Stable Diffusion 生成图像，GPT 生成描述；⑤ 迁移学习：在大规模通用数据预训练，小规模领域数据微调。"
            },
            {
              question: "多模态 Agent 与单模态 Agent 的优势对比？",
              answer: "多模态 Agent 优势：① 更丰富的感知能力（能看到、听到）；② 更强的上下文理解（结合视觉线索）；③ 更广的应用场景（图像处理、视频分析）；④ 更自然的交互（语音+手势+图像）。劣势：① 计算资源需求大；② 系统复杂度高；③ 数据收集和标注困难；④ 调试和优化更具挑战。应根据实际需求权衡。"
            },
            {
              question: "如何评估多模态模型的性能？",
              answer: "常用指标：① 图文检索：Recall@K（前 K 个结果中命中比例）；② 图像描述：BLEU、ROUGE、CIDEr、SPICE；③ 视觉问答：Accuracy；④ 零样本分类：Top-1/Top-5 Accuracy；⑤ 跨模态推理：NLVR2、SNLI-VE 等基准。此外还需评估：计算效率（FPS、延迟）、鲁棒性（对抗攻击）、公平性（偏见检测）。综合多个维度的评估更全面。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/10-llm-advanced/ocr-ai-integration" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">OCR+AI 智能文档识别</div>
              <div className="text-[12px] text-ink-muted mt-1">PaddleOCR、文本识别</div>
            </a>
            <a href="/docs/08-ai-applications/agent-architecture" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">核心概念 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">Agent 架构设计</div>
              <div className="text-[12px] text-ink-muted mt-1">Planning、Memory、Tools</div>
            </a>
            <a href="/docs/10-llm-advanced/document-structure-extraction" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">文档结构化处理</div>
              <div className="text-[12px] text-ink-muted mt-1">布局分析、版面识别</div>
            </a>
            <a href="/docs/08-ai-applications/multi-agent-systems" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">高级主题 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">多智能体系统</div>
              <div className="text-[12px] text-ink-muted mt-1">协作、通信、协调</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            多模态 AI 发展迅速，建议通过以下方式深入学习：① 阅读经典论文（CLIP、Flamingo、BLIP、LLaVA）；② 实践 Hugging Face Transformers 库的多模态模型；③ 尝试 GPT-4V API 开发实际应用；④ 参与 Kaggle 多模态竞赛；⑤ 关注最新进展（ICLR、CVPR、ACL 会议）。多模态是 AI 的未来方向，值得投入精力掌握。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
