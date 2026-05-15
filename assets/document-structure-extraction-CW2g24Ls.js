import{j as e,g as d}from"./index-hyqxTCwJ.js";import{K as o}from"./KnowledgeLayout-CwkOMHwC.js";import{P as t}from"./Playground-C6lk-t6G.js";import{S as i}from"./SideNote-BKvanovA.js";import{C as r,A as n,S as a}from"./ArticleNav-DhfiS38Y.js";import{D as l}from"./DiagramBlock-CLaKE9_7.js";import{I as c}from"./InterviewSection-BBNdwyyN.js";const p=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"一、文档结构化概述",level:2},{id:"layout-analysis",text:"二、布局分析技术",level:2},{id:"table-extraction",text:"三、表格提取方法",level:2},{id:"unstructured-framework",text:"四、Unstructured 框架",level:2},{id:"layoutlm-model",text:"五、LayoutLM 模型",level:2},{id:"paddleocr-integration",text:"六、PaddleOCR 集成",level:2},{id:"pipeline-design",text:"七、完整处理流程",level:2},{id:"performance-optimization",text:"八、性能优化策略",level:2},{id:"misconceptions",text:"九、常见误区",level:2},{id:"interview",text:"十、面试真题",level:2},{id:"related",text:"十一、知识关联",level:2}];function j({meta:s}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(o,{meta:s,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:["文档结构化是将 PDF、图片等非结构化文档转换为带有语义标签的结构化数据（标题、段落、表格、图表）的技术， 通过",e.jsx("strong",{className:"text-accent",children:"布局分析"}),"和",e.jsx("strong",{className:"text-accent",children:"版面识别"}),"还原文档的逻辑结构，为 RAG 系统提供高质量的知识源。"]})}),e.jsx(r,{type:"tip",title:"为什么需要文档结构化？",children:"传统 OCR 只提取纯文本，丢失了标题层级、表格关系、图文对应等关键信息。结构化处理后，RAG 可以基于章节、表格独立检索，提升答案准确性。"}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一、文档结构化概述"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"文档结构化处理的完整流程包含多个阶段："}),e.jsx(l,{title:"文档结构化 Pipeline",children:`┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  文档输入     │────▶│  预处理       │────▶│  布局分析     │
│  PDF/Image   │     │  • 去噪       │     │  • 区域检测   │
│              │     │  • 二值化     │     │  • 分类       │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
┌──────────────┐     ┌──────────────┐            │
│  结构化输出   │◀────│  后处理       │◀───────────┘
│  JSON/XML    │     │  • 合并       │
│              │     │  • 排序       │
└──────────────┘     └──────┬───────┘
                            │
                     ┌──────▼───────┐
                     │  内容提取     │
                     │  • OCR       │
                     │  • 表格解析   │
                     │  • 公式识别   │
                     └──────────────┘`}),e.jsx(i,{label:"典型应用场景",children:e.jsxs("ul",{className:"space-y-2 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"学术论文"}),"：提取标题、作者、摘要、参考文献"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"财务报表"}),"：解析表格、指标、趋势图"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"法律合同"}),"：识别条款、签名、日期"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"技术手册"}),"：提取代码块、API 文档、流程图"]})]})}),e.jsx("h2",{id:"layout-analysis",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"二、布局分析技术"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"布局分析（Layout Analysis）的目标是检测并分类文档中的各个区域："}),e.jsxs("table",{className:"w-full text-sm border-collapse mb-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-4 py-2 text-left",children:"区域类型"}),e.jsx("th",{className:"border border-border-light px-4 py-2 text-left",children:"说明"}),e.jsx("th",{className:"border border-border-light px-4 py-2 text-left",children:"示例"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono",children:"Text"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"普通文本段落"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"正文、说明文字"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono",children:"Title"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"标题（H1-H6）"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"章节标题、小节标题"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono",children:"Table"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"表格区域"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"数据表、统计表"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono",children:"Figure"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"图片/图表"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"流程图、柱状图"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono",children:"List"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"列表项"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"项目符号、编号列表"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono",children:"Formula"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"数学公式"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"LaTeX 公式"})]})]})]}),e.jsx(t,{code:`# 使用 LayoutParser 进行布局分析
import layoutparser as lp
from PIL import Image

# 1. 加载模型（基于 Detectron2）
model = lp.Detectron2LayoutModel(
    config_path='lp://PubLayNet/faster_rcnn_R_50_FPN_3x/config',
    label_map={0: "Text", 1: "Title", 2: "List", 3: "Table", 4: "Figure"},
    extra_config=["MODEL.ROI_HEADS.SCORE_THRESH_TEST", 0.8]
)

# 2. 加载文档图片
image = Image.open("document_page.png")

# 3. 执行布局分析
layout = model.detect(image)

# 4. 可视化结果
layout.show(image)

# 5. 提取结构化数据
for block in layout:
    print(f"类型: {block.type}")
    print(f"坐标: {block.block}")
    print(f"置信度: {block.score:.2f}")
    
    # 裁剪区域
    x1, y1, x2, y2 = map(int, block.block)
    region = image.crop((x1, y1, x2, y2))
    region.save(f"{block.type}_{block.id}.png")`,language:"python",highlights:[5,13,16,22],filename:"layout_analysis.py",description:"使用 LayoutParser 进行布局分析"}),e.jsx("h2",{id:"table-extraction",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"三、表格提取方法"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"表格提取是文档结构化的难点，需要识别单元格边界和行列关系："}),e.jsx(l,{title:"表格提取流程",children:`原始图片                    检测表格区域                 识别单元格
┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│ Name  | Age │          │ ┏━━━━━━━━━┓ │          │ ┏━━━┳━━━┓   │
│ Alice | 25  │   ──▶    │ ┃ Name Age┃ │   ──▶    │ ┃N  ┃A  ┃   │
│ Bob   | 30  │          │ ┃ Alice 25┃ │          │ ┣━━━╋━━━┫   │
│ Carol | 28  │          │ ┃ Bob  30 ┃ │          │ ┃A  ┃2  ┃   │
└─────────────┘          │ ┃Carol 28 ┃ │          │ ┣━━━╋━━━┫   │
                         │ ┗━━━━━━━━━┛ │          │ ┃C  ┃2  ┃   │
                         └─────────────┘          │ ┗━━━┻━━━┛   │
                                                  └─────────────┘
                                                       │
                                                ┌──────▼──────┐
                                                │ 重建表格结构  │
                                                │             │
                                                │ Name | Age  │
                                                │------|------│
                                                │Alice |  25  │
                                                │ Bob  |  30  │
                                                │Carol |  28  │
                                                └─────────────┘`}),e.jsx(t,{code:`# 使用 PaddleOCR 提取表格
from paddleocr import PaddleOCR
import pandas as pd

# 1. 初始化 OCR（启用表格识别）
ocr = PaddleOCR(
    use_angle_cls=True,
    lang='ch',
    use_table_structure_recognition=True  # 启用表格识别
)

# 2. 识别文档
result = ocr.ocr("financial_report.pdf", cls=True)

# 3. 提取表格
tables = []
for line in result:
    for word_info in line:
        box, (text, confidence) = word_info
        
        # 检测是否为表格区域
        if is_table_region(box):
            # 解析表格结构
            table_data = parse_table_structure(text, box)
            tables.append(table_data)

# 4. 转换为 DataFrame
for i, table in enumerate(tables):
    df = pd.DataFrame(table['data'], columns=table['headers'])
    df.to_csv(f"table_{i}.csv", index=False)
    print(f"表格 {i}: {df.shape[0]} 行 × {df.shape[1]} 列")
    print(df.head())`,language:"python",highlights:[7,12,20,24,28],filename:"table_extraction.py",description:"使用 PaddleOCR 提取表格"}),e.jsx(i,{label:"表格识别挑战",children:"复杂表格（合并单元格、斜线表头、嵌套表格）的识别准确率仍较低，通常需要结合规则和后处理人工校验。"}),e.jsx("h2",{id:"unstructured-framework",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"四、Unstructured 框架"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"Unstructured 是开源的文档处理库，支持多种格式的统一接口："}),e.jsx(t,{code:`# 安装 Unstructured
pip install unstructured unstructured[pdf] unstructured[image]

# 处理 PDF 文档
from unstructured.partition.pdf import partition_pdf

elements = partition_pdf(
    filename="research_paper.pdf",
    strategy="hi_res",           # 高精度模式
    infer_table_structure=True,  # 推断表格结构
    extract_images_in_pdf=True,  # 提取图片
)

# 查看提取的元素
for elem in elements:
    print(f"类型: {elem.category}")
    print(f"内容: {elem.text[:100]}...")
    print(f"元数据: {elem.metadata}")
    print("---")

# 转换为 JSON
import json
output = [elem.to_dict() for elem in elements]
with open("structured.json", "w") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

# 支持的格式
# PDF, DOCX, PPTX, HTML, Markdown, Images, Emails`,language:"python",highlights:[7,9,10,11,16,24],filename:"unstructured_processing.py",description:"使用 Unstructured 处理 PDF"}),e.jsxs("table",{className:"w-full text-sm border-collapse mb-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-4 py-2 text-left",children:"策略"}),e.jsx("th",{className:"border border-border-light px-4 py-2 text-left",children:"速度"}),e.jsx("th",{className:"border border-border-light px-4 py-2 text-left",children:"精度"}),e.jsx("th",{className:"border border-border-light px-4 py-2 text-left",children:"适用场景"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono",children:"fast"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"快"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"中"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"简单文本 PDF"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono",children:"hi_res"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"慢"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"高"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"⭐ 复杂布局"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2 font-mono",children:"ocr_only"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"最慢"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"中"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"扫描版 PDF"})]})]})]}),e.jsx("h2",{id:"layoutlm-model",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"五、LayoutLM 模型"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"LayoutLM 系列是微软提出的多模态预训练模型，同时理解文本和布局信息："}),e.jsx(l,{title:"LayoutLM 架构",children:`输入层:
┌──────────────────────────────────────────┐
│  Token Embeddings  (文本)                 │
│  + Position Embeddings (2D 位置)         │
│  + Layout Embeddings  (边界框坐标)       │
└──────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────┐
│  Transformer Encoder (12/24 layers)      │
│  • Self-Attention 融合文本+布局信息       │
└──────────────────────────────────────────┘
                    │
                    ▼
输出层:
┌──────────────────────────────────────────┐
│  • Token Classification (NER)            │
│  • Sequence Classification (文档分类)     │
│  • Relation Extraction (实体关系)         │
└──────────────────────────────────────────┘

版本演进:
  LayoutLM v1: 单模态预训练
  LayoutLM v2: 加入图像特征
  LayoutLM v3: 简化架构，提升效率
  LayoutXLM: 多语言支持`}),e.jsx(t,{code:`# 使用 LayoutLM v3 进行文档理解
from transformers import AutoTokenizer, AutoModelForTokenClassification
from PIL import Image
import torch

# 1. 加载模型
tokenizer = AutoTokenizer.from_pretrained("microsoft/layoutlmv3-base")
model = AutoModelForTokenClassification.from_pretrained(
    "microsoft/layoutlmv3-base",
    num_labels=7  # Text, Title, List, Table, Figure, Formula, Other
)

# 2. 预处理文档
def preprocess_document(image_path):
    image = Image.open(image_path).convert("RGB")
    
    # OCR 提取文本和边界框
    from paddleocr import PaddleOCR
    ocr = PaddleOCR(lang='en')
    result = ocr.ocr(image_path, cls=False)
    
    words = []
    boxes = []
    for line in result[0]:
        box, (text, conf) = line
        words.append(text)
        boxes.append([int(b) for b in box])
    
    return image, words, boxes

# 3. 编码输入
image, words, boxes = preprocess_document("document.png")
encoding = tokenizer(
    words,
    boxes=boxes,
    return_tensors="pt",
    truncation=True,
    max_length=512
)

# 4. 推理
with torch.no_grad():
    outputs = model(**encoding)

predictions = torch.argmax(outputs.logits, dim=-1)[0]

# 5. 解码结果
label_map = {0: "Text", 1: "Title", 2: "List", 3: "Table", 4: "Figure", 5: "Formula", 6: "Other"}
for token, pred in zip(words, predictions):
    print(f"{token:20s} → {label_map[pred.item()]}")`,language:"python",highlights:[7,9,17,27,35,42,48],filename:"layoutlm_document_understanding.py",description:"使用 LayoutLM v3 进行文档理解"}),e.jsx(r,{type:"info",title:"LayoutLM vs 传统 OCR",children:'LayoutLM 的优势在于联合建模文本和空间信息，能理解"标题通常在顶部且字体较大"、"表格有规则的网格结构"等视觉线索，准确率比纯 OCR 提升 15-20%。'}),e.jsx("h2",{id:"paddleocr-integration",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"六、PaddleOCR 集成"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"PaddleOCR 是百度开源的高性能 OCR 引擎，支持多语言和版面分析："}),e.jsx(t,{code:`# 安装 PaddleOCR
pip install paddlepaddle-gpu  # GPU 版本
# 或 pip install paddlepaddle  # CPU 版本
pip install paddleocr

# 基础 OCR
from paddleocr import PaddleOCR

ocr = PaddleOCR(use_angle_cls=True, lang='ch')
result = ocr.ocr("document.jpg", cls=True)

for line in result[0]:
    box, (text, confidence) = line
    print(f"[{confidence:.2f}] {text}")
    print(f"  位置: {box}")

# 版面分析（PP-Structure）
from paddleocr import PPStructure

table_engine = PPStructure(show_log=True)
result = table_engine("financial_report.pdf")

for region in result:
    print(f"类型: {region['type']}")  # text/title/table/figure
    print(f" bbox: {region['bbox']}")
    
    if region['type'] == 'table':
        # 表格单独处理
        table_html = region['res']['html']
        print(f"表格 HTML:
{table_html}")

# 批量处理
import os
from glob import glob

pdf_files = glob("documents/*.pdf")
for pdf in pdf_files:
    result = table_engine(pdf)
    save_structure_result(result, f"output/{os.path.basename(pdf)}.json")`,language:"python",highlights:[9,11,19,22,27,33,38],filename:"paddleocr_integration.py",description:"PaddleOCR 版面分析集成"}),e.jsx("h2",{id:"pipeline-design",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"七、完整处理流程"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"生产环境的文档结构化 Pipeline："}),e.jsx(t,{code:`# 完整的文档结构化 Pipeline
import json
from typing import List, Dict
from dataclasses import dataclass, asdict

@dataclass
class DocumentElement:
    type: str  # title/text/table/figure/list
    content: str
    bbox: List[int]  # [x1, y1, x2, y2]
    page: int
    metadata: Dict = None

class DocumentProcessor:
    def __init__(self):
        self.ocr = PaddleOCR(lang='ch', use_angle_cls=True)
        self.table_engine = PPStructure()
    
    def process_pdf(self, pdf_path: str) -> List[DocumentElement]:
        """处理单个 PDF 文件"""
        # 1. PDF 转图片
        images = self.pdf_to_images(pdf_path)
        
        elements = []
        for page_num, image in enumerate(images):
            # 2. 版面分析
            regions = self.table_engine(image)
            
            # 3. 逐个区域处理
            for region in regions:
                elem = self.process_region(region, page_num)
                elements.append(elem)
        
        # 4. 后处理：合并、排序、去重
        elements = self.post_process(elements)
        
        return elements
    
    def process_region(self, region: Dict, page: int) -> DocumentElement:
        """处理单个区域"""
        region_type = region['type']
        bbox = region['bbox']
        
        if region_type == 'table':
            # 表格特殊处理
            html = region['res'].get('html', '')
            return DocumentElement(
                type='table',
                content=html,
                bbox=bbox,
                page=page,
                metadata={'format': 'html'}
            )
        elif region_type in ['title', 'text']:
            # OCR 提取文本
            ocr_result = self.ocr.ocr(region['img'])
            text = '
'.join([line[1][0] for line in ocr_result[0]])
            return DocumentElement(
                type=region_type,
                content=text,
                bbox=bbox,
                page=page
            )
        else:
            # 其他类型（图片、公式等）
            return DocumentElement(
                type=region_type,
                content='',
                bbox=bbox,
                page=page,
                metadata={'note': '未处理'}
            )
    
    def post_process(self, elements: List[DocumentElement]) -> List[DocumentElement]:
        """后处理：按阅读顺序排序"""
        # 按页码和 Y 坐标排序
        elements.sort(key=lambda e: (e.page, e.bbox[1]))
        return elements
    
    def to_json(self, elements: List[DocumentElement]) -> str:
        """导出为 JSON"""
        return json.dumps([asdict(e) for e in elements], 
                         ensure_ascii=False, indent=2)

# 使用
processor = DocumentProcessor()
elements = processor.process_pdf("research_paper.pdf")
print(processor.to_json(elements))`,language:"python",highlights:[17,18,22,27,32,36,42,53,65,75,81,87],filename:"complete_pipeline.py",description:"完整的文档结构化 Pipeline"}),e.jsx("h2",{id:"performance-optimization",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"八、性能优化策略"}),e.jsxs("table",{className:"w-full text-sm border-collapse mb-6",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-parchment-deep",children:[e.jsx("th",{className:"border border-border-light px-4 py-2 text-left",children:"优化手段"}),e.jsx("th",{className:"border border-border-light px-4 py-2 text-left",children:"效果"}),e.jsx("th",{className:"border border-border-light px-4 py-2 text-left",children:"实现难度"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2",children:"GPU 加速 OCR"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"3-5x 提速"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"低"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2",children:"批量处理"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"2-3x 吞吐提升"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"中"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2",children:"缓存中间结果"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"避免重复计算"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"低"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2",children:"异步处理队列"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"提高并发能力"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"高"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"border border-border-light px-4 py-2",children:"模型量化（INT8）"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"1.5-2x 提速"}),e.jsx("td",{className:"border border-border-light px-4 py-2",children:"中"})]})]})]}),e.jsx(r,{type:"warning",title:"性能瓶颈分析",children:e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"PDF 转图片"}),"：占时 10%，可用 PyMuPDF 优化"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"OCR 识别"}),"：占时 60%，GPU 加速最有效"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"版面分析"}),"：占时 20%，可并行处理"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"后处理"}),"：占时 10%，算法优化空间大"]})]})}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"九、常见误区"}),e.jsxs(r,{type:"danger",title:"误区 1：OCR 就能解决所有问题",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"事实"}),"：纯 OCR 只提取文本，丢失布局、表格结构、图文关系等关键信息。"]}),e.jsx("p",{children:"必须结合版面分析和结构化后处理，才能用于高质量 RAG。"})]}),e.jsxs(r,{type:"danger",title:"误区 2：表格可以直接转为 CSV",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"事实"}),"：复杂表格（合并单元格、跨页表格、嵌套表）无法直接转换，需要专门的后处理逻辑。"]}),e.jsx("p",{children:"建议保留 HTML 格式，由下游应用按需解析。"})]}),e.jsxs(r,{type:"danger",title:"误区 3：高精度模式总是更好",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"事实"}),"：hi_res 模式速度慢 5-10 倍，对于简单文档性价比低。"]}),e.jsx("p",{children:"应根据文档复杂度动态选择策略，或先用 fast 模式预判。"})]}),e.jsxs(r,{type:"warning",title:"误区 4：LayoutLM 可以替代 OCR",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"事实"}),"：LayoutLM 仍需 OCR 提供文本和边界框作为输入，它做的是理解而非识别。"]}),e.jsx("p",{children:"两者是互补关系，不是替代关系。"})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十、面试真题"}),e.jsx(c,{questions:[{question:"文档结构化的核心价值是什么？",answer:"① 保留语义结构（标题层级、表格关系）；② 提升 RAG 检索精度（可按章节/表格独立检索）；③ 支持细粒度引用（定位到具体段落/单元格）；④ 便于后续分析（统计、可视化）。相比纯文本，结构化数据的可用性提升 3-5 倍。"},{question:"LayoutLM 相比传统 OCR 的优势在哪里？",answer:"LayoutLM 联合建模文本内容和空间布局，通过 2D 位置编码和边界框嵌入，能理解'标题在顶部且字体大'、'表格有网格结构'等视觉规律。在 DocVQA、FUNSD 等基准上，LayoutLM v3 比纯 OCR + 规则方法准确率高 15-20%。"},{question:"如何处理跨页表格？",answer:"① 检测表格边界是否跨越页面；② 识别表头是否在后续页重复；③ 合并多个页面的表格片段；④ 标记合并边界。难点在于判断两个表格是否为同一表格的延续，可通过表头匹配、列数一致性、内容连续性等特征判断。"},{question:"Unstructured 的 hi_res 和 fast 策略有什么区别？",answer:"fast 使用简单的启发式规则，速度快但精度一般，适合纯文本 PDF。hi_res 使用深度学习模型（Detectron2）进行布局分析，能识别复杂结构（表格、图片、公式），速度慢 5-10 倍但精度高。生产环境可根据文档类型动态选择。"},{question:"文档结构化的主要性能瓶颈在哪里？如何优化？",answer:"瓶颈主要在 OCR（占时 60%）和版面分析（占时 20%）。优化方案：① GPU 加速 OCR（3-5x 提速）；② 批量处理提高吞吐；③ 缓存中间结果避免重复计算；④ 异步队列提高并发；⑤ 模型量化（INT8）进一步加速。综合优化后可实现 10 页/秒的处理速度。"},{question:"如何评估文档结构化的质量？",answer:"常用指标：① 布局检测 mAP（Mean Average Precision）；② 表格提取 TEDS（Tree Edit Distance-based Similarity）；③ OCR 准确率（CER/WER）；④ 端到端任务指标（如 RAG 问答准确率）。业务层面关注：人工校验通过率、下游任务效果提升幅度。"}]}),e.jsx("h2",{id:"related",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"十一、知识关联"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"文档结构化与以下知识点密切相关："}),e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-ink-muted mb-6",children:[e.jsxs("li",{children:[e.jsx("a",{href:"/docs/10-llm-advanced/ocr-ai-integration",className:"text-accent hover:underline",children:"OCR+AI智能文档识别"})," — OCR 是结构化的前置步骤"]}),e.jsxs("li",{children:[e.jsx("a",{href:"/docs/10-llm-advanced/content-extraction",className:"text-accent hover:underline",children:"内容抽取与信息提取"})," — 从结构化文档中提取实体和关系"]}),e.jsxs("li",{children:[e.jsx("a",{href:"/docs/09-rag/document-processing",className:"text-accent hover:underline",children:"文档处理"})," — RAG 系统的文档预处理环节"]})]}),e.jsx(n,{...d(s.category,s.id)})]})}),e.jsx(a,{items:p})]})}export{j as default};
