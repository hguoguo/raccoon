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
  { id: 'overview', text: '一、OCR 技术概述', level: 2 },
  { id: 'paddleocr-architecture', text: '二、PaddleOCR 架构', level: 2 },
  { id: 'detection-algorithm', text: '三、文本检测算法', level: 3 },
  { id: 'recognition-algorithm', text: '四、文本识别算法', level: 3 },
  { id: 'tesseract-comparison', text: '五、Tesseract 对比', level: 2 },
  { id: 'image-preprocessing', text: '六、图像预处理', level: 2 },
  { id: 'postprocessing-strategies', text: '七、后处理策略', level: 2 },
  { id: 'production-deployment', text: '八、生产部署', level: 2 },
  { id: 'accuracy-optimization', text: '九、准确率优化', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function OcrAiIntegration({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              OCR（Optical Character Recognition，光学字符识别）是将图片中的文字转换为可编辑文本的技术，
              结合 AI 模型实现<strong className="text-accent">高精度文本检测</strong>和<strong className="text-accent">多语言识别</strong>，是文档数字化的核心技术。
            </p>
          </blockquote>

          <Callout type="tip" title="OCR + AI 的演进">
            传统 OCR 基于规则和模板匹配，对字体、版式敏感。现代 OCR 使用深度学习（CNN + RNN + Attention），能处理复杂场景（倾斜、模糊、艺术字），准确率从 80% 提升到 95%+。
          </Callout>

          <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、OCR 技术概述
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            OCR 系统通常包含两个核心模块：
          </p>

          <DiagramBlock title="OCR 两阶段流程">
{`┌─────────────────┐         ┌─────────────────┐
│  文本检测        │         │  文本识别        │
│  (Detection)     │         │  (Recognition)   │
│                  │         │                  │
│  输入: 原始图片   │         │  输入: 文本区域   │
│  输出: 文本框坐标 │         │  输出: 识别文本   │
│                  │         │                  │
│  ┏━━━━━━━━━━━┓  │         │  ┏━━━━━━━━━━━┓  │
│  ┃ Hello     ┃  │  ──▶    │  ┃ "Hello"   ┃  │
│  ┃ World     ┃  │         │  ┃ "World"   ┃  │
│  ┗━━━━━━━━━━━┛  │         │  ┗━━━━━━━━━━━┛  │
└─────────────────┘         └─────────────────┘

可选模块:
  • 方向分类（纠正倾斜）
  • 版面分析（区分标题/正文/表格）
  • 语言模型（后处理纠错）`}
          </DiagramBlock>

          <table className="w-full text-sm border-collapse mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left">场景</th>
                <th className="border border-border-light px-4 py-2 text-left">挑战</th>
                <th className="border border-border-light px-4 py-2 text-left">典型应用</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2">印刷体</td>
                <td className="border border-border-light px-4 py-2">字体多样、版式复杂</td>
                <td className="border border-border-light px-4 py-2">文档数字化</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">手写体</td>
                <td className="border border-border-light px-4 py-2">笔迹差异大、连笔</td>
                <td className="border border-border-light px-4 py-2">表单识别</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">自然场景</td>
                <td className="border border-border-light px-4 py-2">光照、遮挡、变形</td>
                <td className="border border-border-light px-4 py-2">车牌识别、路牌翻译</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">屏幕截图</td>
                <td className="border border-border-light px-4 py-2">UI 元素干扰</td>
                <td className="border border-border-light px-4 py-2">自动化测试</td>
              </tr>
            </tbody>
          </table>

          <h2 id="paddleocr-architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、PaddleOCR 架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            PaddleOCR 是百度开源的超轻量 OCR 系统，采用 PP-OCR 系列策略：
          </p>

          <DiagramBlock title="PP-OCR v4 架构">
{`输入图片
    │
    ▼
┌──────────────────┐
│  方向分类器       │  ← MobileNetV3 + FC
│  (Direction      │     判断 0°/90°/180°/270°
│   Classifier)    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  文本检测器       │  ← DBNet++ (Differentiable Binarization)
│  (Text Detector) │     输出文本框坐标
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  文本识别器       │  ← SVTR (Scene Text Vision Transformer)
│  (Text Recognizer)│    CTC/Attention 解码
└────────┬─────────┘
         │
         ▼
    识别结果

性能指标 (PP-OCR v4):
  • 检测 mAP: 87.5%
  • 识别准确率: 95.2% (中文)
  • 推理速度: 35ms/张 (CPU)
  • 模型大小: 14MB (超轻量)`}
          </DiagramBlock>

          <Playground
            code={`# 安装 PaddleOCR
pip install paddlepaddle-gpu  # GPU 版本
# 或 pip install paddlepaddle  # CPU 版本
pip install paddleocr

# 基础使用
from paddleocr import PaddleOCR

# 初始化（自动下载模型）
ocr = PaddleOCR(
    use_angle_cls=True,    # 启用方向分类
    lang='ch',             # 中文识别
    use_gpu=True,          # 使用 GPU
    det_model_dir='./models/det',  # 自定义检测模型
    rec_model_dir='./models/rec',  # 自定义识别模型
)

# 识别单张图片
result = ocr.ocr("document.jpg", cls=True)

# 解析结果
for line in result[0]:
    box, (text, confidence) = line
    print(f"[{confidence:.2f}] {text}")
    print(f"  位置: {box}")  # [[x1,y1], [x2,y2], [x3,y3], [x4,y4]]

# 批量处理
import os
from glob import glob

image_files = glob("images/*.jpg")
for img_path in image_files:
    result = ocr.ocr(img_path, cls=True)
    save_result(result, f"output/{os.path.basename(img_path)}.txt")`}
            language="python"
            highlights={[9, 10, 11, 12, 13, 17, 22]}
            filename="paddleocr_basic.py"
            description="PaddleOCR 基础使用"
          />

          <SideNote label="PP-OCR 策略">
            PP-OCR 通过蒸馏、量化、剪枝等技术，在保持精度的同时将模型压缩到 14MB，适合移动端和边缘设备部署。
          </SideNote>

          <h3 id="detection-algorithm" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            三、文本检测算法
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            文本检测的目标是定位图片中的所有文本区域，主流算法包括：
          </p>

          <table className="w-full text-sm border-collapse mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left">算法</th>
                <th className="border border-border-light px-4 py-2 text-left">类型</th>
                <th className="border border-border-light px-4 py-2 text-left">特点</th>
                <th className="border border-border-light px-4 py-2 text-left">速度</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">DBNet</td>
                <td className="border border-border-light px-4 py-2">分割-based</td>
                <td className="border border-border-light px-4 py-2">可微二值化，实时</td>
                <td className="border border-border-light px-4 py-2">快</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">DBNet++</td>
                <td className="border border-border-light px-4 py-2">分割-based</td>
                <td className="border border-border-light px-4 py-2">⭐ PP-OCR v4 使用</td>
                <td className="border border-border-light px-4 py-2">快</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">CT-DETR</td>
                <td className="border border-border-light px-4 py-2">Detection Transformer</td>
                <td className="border border-border-light px-4 py-2">端到端，无需 NMS</td>
                <td className="border border-border-light px-4 py-2">中</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2 font-mono">YOLOv8-OCR</td>
                <td className="border border-border-light px-4 py-2">Anchor-free</td>
                <td className="border border-border-light px-4 py-2">通用目标检测适配</td>
                <td className="border border-border-light px-4 py-2">最快</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`# DBNet 文本检测原理
import cv2
import numpy as np
from paddleocr import PaddleOCR

# DBNet 输出概率图
ocr = PaddleOCR(use_angle_cls=False, lang='ch')

# 获取检测结果
result = ocr.ocr("document.jpg", cls=False)

# 可视化检测框
image = cv2.imread("document.jpg")
for line in result[0]:
    box = np.array(line[0]).astype(np.int32)
    # 绘制四边形框
    cv2.polylines(image, [box], True, (0, 255, 0), 2)
    
    # 标注置信度
    center = box.mean(axis=0).astype(int)
    cv2.putText(image, f"{line[1][1]:.2f}", tuple(center),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)

cv2.imwrite("detection_result.jpg", image)

# DBNet 关键优势:
# 1. 可微二值化：将分割概率图转为二值图的过程可导
# 2. 自适应阈值：不同区域使用不同阈值
# 3. 快速后处理：无需复杂的 NMS`}
            language="python"
            highlights={[9, 14, 17, 20, 29, 30, 31]}
            filename="dbnet_detection.py"
            description="DBNet 文本检测可视化"
          />

          <h3 id="recognition-algorithm" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            四、文本识别算法
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            文本识别将裁剪的文本区域转换为字符串，主流方法包括：
          </p>

          <Playground
            code={`# SVTR 文本识别（PP-OCR v4 使用）
from paddleocr import PaddleOCR

ocr = PaddleOCR(lang='en', rec_algorithm='SVTR_LCNet')

# 识别单个文本区域
result = ocr.ocr("text_region.jpg", cls=False)

for line in result[0]:
    box, (text, confidence) = line
    print(f"识别结果: {text}")
    print(f"置信度: {confidence:.4f}")

# 支持的识别算法:
# • CRNN: CNN + BiLSTM + CTC（经典方案）
# • SRN: Sequence-to-Sequence with Attention
# • ViTSTR: Vision Transformer for STR
# • SVTR: Scene Text Vision Transformer（⭐ 最新）

# SVTR 优势:
# 1. 纯 Transformer 架构，无 CNN/RNN
# 2. 全局上下文建模能力强
# 3. 对长文本、弯曲文本效果好
# 4. 支持多语言混合识别`}
            language="python"
            highlights={[4, 7, 11, 12, 16, 17, 18, 19]}
            filename="svtr_recognition.py"
            description="SVTR 文本识别"
          />

          <DiagramBlock title="CRNN 识别流程">
{`输入: 文本区域图片 (H×W×3)
    │
    ▼
┌──────────────────┐
│  CNN Backbone     │  ← ResNet/MobileNet 提取特征
│  (Feature Extract)│     输出: Feature Map (C×H'×W')
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Sequence Modeling│  ← BiLSTM 建模时序依赖
│  (BiLSTM)        │     输出: Sequence Features
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  CTC Decoder     │  ← Connectionist Temporal Classification
│  (CTC Loss)      │     对齐预测序列与真实标签
└────────┬─────────┘
         │
         ▼
输出: "Hello World"

CTC 关键思想:
  • 引入 blank 符号处理不定长对齐
  • 合并重复字符（HHeelllloo → Hello）
  • 无需逐字符标注，只需最终文本`}
          </DiagramBlock>

          <h2 id="tesseract-comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Tesseract 对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Tesseract 是老牌开源 OCR 引擎，与 PaddleOCR 对比：
          </p>

          <table className="w-full text-sm border-collapse mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left">维度</th>
                <th className="border border-border-light px-4 py-2 text-left">Tesseract</th>
                <th className="border border-border-light px-4 py-2 text-left">PaddleOCR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2">开发方</td>
                <td className="border border-border-light px-4 py-2">HP / Google</td>
                <td className="border border-border-light px-4 py-2">百度</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">核心技术</td>
                <td className="border border-border-light px-4 py-2">LSTM + 规则</td>
                <td className="border border-border-light px-4 py-2">DBNet + SVTR</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">中文支持</td>
                <td className="border border-border-light px-4 py-2">一般（需额外训练）</td>
                <td className="border border-border-light px-4 py-2">⭐ 优秀（原生支持）</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">准确率</td>
                <td className="border border-border-light px-4 py-2">85-90%</td>
                <td className="border border-border-light px-4 py-2">95%+</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">速度</td>
                <td className="border border-border-light px-4 py-2">慢</td>
                <td className="border border-border-light px-4 py-2">快（35ms/张）</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">易用性</td>
                <td className="border border-border-light px-4 py-2">命令行工具</td>
                <td className="border border-border-light px-4 py-2">Python API</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">适用场景</td>
                <td className="border border-border-light px-4 py-2">简单印刷体</td>
                <td className="border border-border-light px-4 py-2">复杂场景</td>
              </tr>
            </tbody>
          </table>

          <Playground
            code={`# Tesseract 使用示例
import pytesseract
from PIL import Image

# 安装: sudo apt-get install tesseract-ocr
#      pip install pytesseract

# 基础识别
image = Image.open("document.jpg")
text = pytesseract.image_to_string(image, lang='chi_sim')
print(text)

# 指定配置
custom_config = r'--oem 3 --psm 6'  # LSTM + 统一块
text = pytesseract.image_to_string(image, lang='eng', config=custom_config)

# 获取详细数据（包含边界框）
data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
for i in range(len(data['text'])):
    if int(data['conf'][i]) > 60:  # 过滤低置信度
        print(f"{data['text'][i]} (conf: {data['conf'][i]})")

# PaddleOCR vs Tesseract 对比测试
from paddleocr import PaddleOCR
import time

ocr_paddle = PaddleOCR(lang='ch', use_gpu=False)

start = time.time()
result_paddle = ocr_paddle.ocr("test.jpg", cls=False)
time_paddle = time.time() - start

start = time.time()
text_tesseract = pytesseract.image_to_string(
    Image.open("test.jpg"), lang='chi_sim'
)
time_tesseract = time.time() - start

print(f"PaddleOCR: {time_paddle:.2f}s")
print(f"Tesseract: {time_tesseract:.2f}s")
print(f"加速比: {time_tesseract / time_paddle:.2f}x")`}
            language="python"
            highlights={[10, 15, 19, 23, 29, 33, 38, 43, 47]}
            filename="tesseract_comparison.py"
            description="Tesseract 与 PaddleOCR 对比"
          />

          <h2 id="image-preprocessing" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、图像预处理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            预处理能显著提升 OCR 准确率，常见操作包括：
          </p>

          <Playground
            code={`import cv2
import numpy as np
from PIL import Image

def preprocess_image(image_path):
    """OCR 图像预处理流水线"""
    img = cv2.imread(image_path)
    
    # 1. 转灰度
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # 2. 去噪（高斯模糊）
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # 3. 二值化（自适应阈值）
    binary = cv2.adaptiveThreshold(
        blurred, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11, 2
    )
    
    # 4. 形态学操作（去除小噪点）
    kernel = np.ones((2, 2), np.uint8)
    cleaned = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
    
    # 5. 倾斜校正
    angle = detect_skew_angle(cleaned)
    if abs(angle) > 1:
        cleaned = rotate_image(cleaned, angle)
    
    # 6. 对比度增强
    enhanced = cv2.convertScaleAbs(cleaned, alpha=1.5, beta=0)
    
    return enhanced

def detect_skew_angle(image):
    """检测文本倾斜角度"""
    coords = np.column_stack(np.where(image > 0))
    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle
    return angle

def rotate_image(image, angle):
    """旋转图像"""
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(image, M, (w, h),
                             flags=cv2.INTER_CUBIC,
                             borderMode=cv2.BORDER_REPLICATE)
    return rotated

# 使用
processed = preprocess_image("noisy_document.jpg")
cv2.imwrite("preprocessed.jpg", processed)

# 对比效果
from paddleocr import PaddleOCR
ocr = PaddleOCR(lang='ch')

# 原始图片
result_orig = ocr.ocr("original.jpg", cls=False)
print(f"原始准确率: {avg_confidence(result_orig):.2f}")

# 预处理后
result_proc = ocr.ocr("preprocessed.jpg", cls=False)
print(f"预处理后: {avg_confidence(result_proc):.2f}")`}
            language="python"
            highlights={[10, 13, 16, 24, 28, 33, 37, 47, 57, 63, 67]}
            filename="image_preprocessing.py"
            description="OCR 图像预处理流水线"
          />

          <SideNote label="预处理效果">
            对于低质量扫描文档，预处理可将 OCR 准确率从 75% 提升到 90%+，尤其是二值化和去噪步骤效果显著。
          </SideNote>

          <h2 id="postprocessing-strategies" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、后处理策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            OCR 识别结果常包含错误，后处理可进一步提升质量：
          </p>

          <Playground
            code={`# 基于语言模型的 OCR 后处理
import jieba
from pypinyin import pinyin

def ocr_postprocess(text, context=None):
    """OCR 结果后处理"""
    
    # 1. 去除多余空格和特殊字符
    text = clean_text(text)
    
    # 2. 中文分词纠错
    if is_chinese(text):
        text = chinese_correction(text)
    
    # 3. 英文拼写检查
    else:
        text = english_spellcheck(text)
    
    # 4. 上下文一致性校验
    if context:
        text = context_aware_correction(text, context)
    
    return text

def clean_text(text):
    """清理文本"""
    import re
    # 去除多余空格
    text = re.sub(r'\s+', ' ', text)
    # 去除不可见字符
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', text)
    return text.strip()

def chinese_correction(text):
    """中文纠错（基于词典）"""
    words = jieba.lcut(text)
    corrected = []
    
    for word in words:
        # 检查是否在词典中
        if word in jieba.dt.FREQ:
            corrected.append(word)
        else:
            # 尝试拼音相似度匹配
            similar = find_similar_by_pinyin(word)
            corrected.append(similar if similar else word)
    
    return ''.join(corrected)

def english_spellcheck(text):
    """英文拼写检查"""
    from spellchecker import SpellChecker
    
    spell = SpellChecker()
    words = text.split()
    corrected = []
    
    for word in words:
        if word not in spell:
            # 获取最可能的正确拼写
            correction = spell.correction(word)
            corrected.append(correction if correction else word)
        else:
            corrected.append(word)
    
    return ' '.join(corrected)

# 使用
raw_ocr = "Helo Wrld! Ths is a tst."
corrected = ocr_postprocess(raw_ocr)
print(f"原始: {raw_ocr}")
print(f"修正: {corrected}")  # "Hello World! This is a test."`}
            language="python"
            highlights={[9, 13, 17, 21, 27, 35, 42, 52, 57, 65]}
            filename="ocr_postprocessing.py"
            description="OCR 后处理策略"
          />

          <h2 id="production-deployment" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、生产部署
          </h2>

          <Playground
            code={`# FastAPI OCR 服务
from fastapi import FastAPI, File, UploadFile
from paddleocr import PaddleOCR
import uvicorn
import base64
import numpy as np
from PIL import Image
import io

app = FastAPI(title="OCR Service")

# 全局 OCR 实例（避免重复加载）
ocr = PaddleOCR(use_angle_cls=True, lang='ch', use_gpu=True)

@app.post("/ocr")
async def recognize(file: UploadFile = File(...)):
    """OCR 识别接口"""
    # 读取图片
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert('RGB')
    
    # 转为 numpy 数组
    img_array = np.array(image)
    
    # OCR 识别
    result = ocr.ocr(img_array, cls=True)
    
    # 格式化输出
    output = []
    for line in result[0]:
        box, (text, confidence) = line
        output.append({
            "text": text,
            "confidence": round(confidence, 4),
            "bbox": box.tolist()
        })
    
    return {
        "status": "success",
        "data": output,
        "total_lines": len(output)
    }

@app.post("/ocr/batch")
async def batch_recognize(files: list[UploadFile] = File(...)):
    """批量 OCR 识别"""
    results = []
    for file in files:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        img_array = np.array(image)
        
        result = ocr.ocr(img_array, cls=True)
        results.append({
            "filename": file.filename,
            "result": result[0]
        })
    
    return {"status": "success", "data": results}

# 启动服务
# uvicorn ocr_service:app --host 0.0.0.0 --port 8000 --workers 4`}
            language="python"
            highlights={[13, 16, 20, 23, 26, 31, 45, 51, 55]}
            filename="ocr_api_service.py"
            description="FastAPI OCR 服务"
          />

          <Callout type="info" title="部署优化建议">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>模型预热</strong>：服务启动时先推理一次，避免冷启动延迟</li>
              <li><strong>批处理</strong>：合并多个请求为批量推理，提升 GPU 利用率</li>
              <li><strong>缓存</strong>：对相同图片哈希值缓存结果</li>
              <li><strong>异步队列</strong>：使用 Celery 处理大批量任务</li>
              <li><strong>监控</strong>：记录 QPS、延迟、准确率等指标</li>
            </ul>
          </Callout>

          <h2 id="accuracy-optimization" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、准确率优化
          </h2>

          <table className="w-full text-sm border-collapse mb-6">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border-light px-4 py-2 text-left">优化手段</th>
                <th className="border border-border-light px-4 py-2 text-left">提升幅度</th>
                <th className="border border-border-light px-4 py-2 text-left">成本</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-light px-4 py-2">图像预处理</td>
                <td className="border border-border-light px-4 py-2">+5-10%</td>
                <td className="border border-border-light px-4 py-2">低</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">领域微调</td>
                <td className="border border-border-light px-4 py-2">+3-8%</td>
                <td className="border border-border-light px-4 py-2">中（需标注数据）</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">语言模型后处理</td>
                <td className="border border-border-light px-4 py-2">+2-5%</td>
                <td className="border border-border-light px-4 py-2">低</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">多模型投票</td>
                <td className="border border-border-light px-4 py-2">+1-3%</td>
                <td className="border border-border-light px-4 py-2">高（推理成本×N）</td>
              </tr>
              <tr>
                <td className="border border-border-light px-4 py-2">人工校验闭环</td>
                <td className="border border-border-light px-4 py-2">持续优化</td>
                <td className="border border-border-light px-4 py-2">中（人力成本）</td>
              </tr>
            </tbody>
          </table>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="danger" title="误区 1：OCR 准确率能达到 100%">
            <p className="mb-2"><strong>事实</strong>：即使在理想条件下，OCR 也存在固有误差（模糊、遮挡、罕见字体）。工业级系统通常接受 95-98% 的准确率，通过后处理和人工校验弥补。</p>
            <p>追求 100% 准确率的成本呈指数增长，性价比极低。</p>
          </Callout>

          <Callout type="danger" title="误区 2：GPU 总是比 CPU 快">
            <p className="mb-2"><strong>事实</strong>：对于单张图片推理，CPU 可能更快（避免数据传输开销）。GPU 的优势在于批量处理（batch size &gt; 10）。</p>
            <p>小规模场景可使用 CPU 降低成本，大规模并发才需要 GPU。</p>
          </Callout>

          <Callout type="danger" title="误区 3：多语言模型支持所有语言">
            <p className="mb-2"><strong>事实</strong>：多语言模型在常见语言（中英日韩）上表现好，但小语种（阿拉伯语、泰语）需要专门训练。</p>
            <p>垂直领域应使用针对性优化的模型。</p>
          </Callout>

          <Callout type="warning" title="误区 4：高分辨率图片一定更好">
            <p className="mb-2"><strong>事实</strong>：过高的分辨率会增加推理时间，且超出模型感受野后无益。PaddleOCR 推荐输入高度为 960 像素。</p>
            <p>应根据实际场景选择合适分辨率，平衡速度与精度。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: "OCR 系统的两个核心模块是什么？各自的作用？",
                answer: "① 文本检测（Detection）：定位图片中所有文本区域，输出边界框坐标。常用算法：DBNet、CT-DETR。② 文本识别（Recognition）：将裁剪的文本区域转换为字符串。常用算法：CRNN、SVTR。两者串联工作，检测为识别提供输入。"
              },
              {
                question: "PaddleOCR 相比 Tesseract 的优势在哪里？",
                answer: "① 中文支持更好（原生优化）；② 准确率更高（95%+ vs 85-90%）；③ 速度更快（35ms/张）；④ 模型更小（14MB 超轻量）；⑤ Python API 更易用；⑥ 支持版面分析和表格识别。Tesseract 优势在于生态成熟、多语言覆盖广。"
              },
              {
                question: "解释 DBNet 的可微二值化技术。",
                answer: "DBNet 通过近似阶跃函数将分割概率图转为二值图，整个过程可导，能端到端训练。传统方法需要固定阈值和后处理（如 NMS），DBNet 学习自适应阈值，简化流程并提升速度，达到实时性能（&gt;30 FPS）。"
              },
              {
                question: "如何处理倾斜或扭曲的文本图片？",
                answer: "① 方向分类器：检测 0°/90°/180°/270° 旋转并纠正；② STN（Spatial Transformer Network）：学习几何变换参数；③ TPS（Thin-Plate Spline）：处理非刚性形变；④ 数据增强：训练时加入随机旋转、扭曲样本。PaddleOCR 默认集成方向分类器。"
              },
              {
                question: "OCR 后处理的常见策略有哪些？",
                answer: "① 语言模型纠错（拼写检查、拼音相似度）；② 词典匹配（专有名词、术语）；③ 上下文一致性（前后文逻辑）；④ 规则过滤（日期、电话、邮箱格式）；⑤ 多模型投票。后处理可提升 2-5% 准确率，成本低效果好。"
              },
              {
                question: "如何评估 OCR 系统的性能？",
                answer: "常用指标：① 检测 mAP（Mean Average Precision）；② 识别准确率（Character Accuracy / Word Accuracy）；③ 端到端 F1 Score；④ 推理速度（FPS 或 ms/张）；⑤ 模型大小。业务层面关注：人工校验通过率、下游任务（如搜索）效果提升。"
              },
              {
                question: "OCR 在生产环境的主要瓶颈是什么？如何优化？",
                answer: "瓶颈：① GPU 显存限制 batch size；② 预处理和后处理占用 CPU；③ I/O 等待（读取图片）。优化：① 模型量化（INT8）减少显存；② 异步流水线并行处理；③ 缓存高频图片结果；④ 使用 TensorRT 加速推理；⑤ 负载均衡分散请求。可实现 100+ QPS。"
              }
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            OCR 技术与以下知识点密切相关：
          </p>
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6">
            <li><a href="/docs/10-llm-advanced/document-structure-extraction" className="text-accent hover:underline">文档结构化处理</a> — OCR 是结构化的前置步骤</li>
            <li><a href="/docs/10-llm-advanced/content-extraction" className="text-accent hover:underline">内容抽取与信息提取</a> — 从 OCR 结果中提取实体</li>
            <li><a href="/docs/10-llm-advanced/multimodal-agent" className="text-accent hover:underline">多模态Agent</a> — 视觉理解的基础能力</li>
          </ul>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      
      <SmartTOC items={tocItems} />
    </div>
  )
}
