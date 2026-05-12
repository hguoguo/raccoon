---
name: 按照原型重构所有页面
overview: 根据用户提供的原型文件 `raccoonjava_learning_dashboard_prototype.html`，完全重构项目所有页面。保持当前颜色方案不变，调整logo样式以匹配原型设计。
design:
  architecture:
    framework: react
  styleKeywords:
    - 温暖
    - 现代
    - 圆角
    - 毛玻璃
    - 渐变
    - 卡片式
    - 清晰层次
  fontSystem:
    fontFamily: Noto Serif SC, Source Sans 3, Playfair Display
    heading:
      size: 32px
      weight: 700
    subheading:
      size: 24px
      weight: 600
    body:
      size: 14px
      weight: 400
  colorSystem:
    primary:
      - "#b5651d"
      - "#c8782a"
      - "#8b4c14"
    background:
      - "#f7f2e8"
      - "#faf7f0"
      - "#f0e8d5"
      - "#fff5e7"
      - "#f5ede2"
    text:
      - "#2c2416"
      - "#3d3425"
      - "#6b5e4c"
      - "#8a7d6b"
    functional:
      - "#5f7a68"
      - "#a0522d"
      - "#5b5c7a"
      - "#4a7a8c"
todos:
  - id: update-config
    content: 更新 tailwind.config.ts（sidebar宽度280px）和 index.css（添加glass morphism支持）
    status: completed
  - id: refactor-sidebar
    content: 重构 Sidebar 组件：宽度280px、logo样式（rounded-2xl背景容器）、导航项选中状态
    status: completed
    dependencies:
      - update-config
  - id: refactor-topbar
    content: 重构 Topbar 组件：搜索框rounded-2xl样式、操作按钮、backdrop-blur效果
    status: completed
    dependencies:
      - update-config
  - id: refactor-homepage
    content: 重构主页所有组件：HeroSection渐变背景、ChapterGrid卡片、LearningPath、RecentUpdates样式
    status: completed
    dependencies:
      - refactor-sidebar
      - refactor-topbar
  - id: refactor-chapterpage
    content: 重构 ChapterPage 页面样式以匹配新设计语言
    status: completed
    dependencies:
      - refactor-homepage
  - id: update-footer-mobile
    content: 更新 Footer 和 MobileNav 组件样式以保持一致性
    status: completed
    dependencies:
      - refactor-homepage
  - id: test-verify
    content: 测试验证：检查所有页面显示、响应式布局、颜色方案一致性
    status: completed
    dependencies:
      - update-footer-mobile
---

## 产品概述

按照 `property/raccoonjava_learning_dashboard_prototype.html` 原型的设计风格，重构 Raccoon 学习平台的所有页面。保持当前项目的颜色方案（不使用原型的 `#f6f1e8`/`#b86b1f`，继续使用项目当前的 `#f7f2e8`/`#b5651d` 等颜色）。调整 `logo.png` 的样式以匹配原型设计。

## 核心功能

- 重构 Sidebar 组件：宽度从 260px 调整为 280px，更新 logo 样式（添加 `rounded-2xl` 背景容器），更新导航项选中状态样式
- 重构 Topbar 组件：搜索框样式更新为 `rounded-2xl`，操作按钮样式更新，添加 backdrop-blur 效果
- 重构主页 HeroSection：添加渐变背景（使用当前颜色变量），更新整体样式
- 重构主页 ChapterGrid、LearningPath、RecentUpdates 组件：更新卡片样式以匹配原型
- 重构 ChapterPage 页面：更新样式以匹配新设计语言
- 更新 Footer 和 MobileNav 组件：微调样式以保持一致性

## 技术栈选择

- **前端框架**：React + TypeScript（保持当前）
- **样式方案**：Tailwind CSS（保持当前）
- **字体**：保持当前项目字体配置（Noto Serif SC, Source Sans 3, Playfair Display）

## 实现方案

### 核心策略

基于现有组件结构，按照原型设计更新样式。保持当前的 CSS 变量和颜色方案，仅更新布局、圆角、阴影、背景等视觉元素。

### 关键修改点

1. **tailwind.config.ts**：

- 更新 sidebar 宽度从 260px 到 280px
- 确保支持 `rounded-2xl`（16px）和 `rounded-[32px]`

2. **index.css**：

- 添加 glass morphism 相关样式支持（`.glass` 类）
- 保持当前 CSS 变量不变

3. **Sidebar.tsx**：

- 宽度调整为 280px（更新 tailwind config 和组件类名）
- Logo 样式：添加容器 `rounded-2xl`，背景色 `bg-[#e8dcc8]`，使 `logo.png` 显示更美观
- 导航项选中状态：背景更新为 `bg-[#eadcc8] border border-[#e2cfb7]`

4. **Topbar.tsx**：

- 搜索框样式更新为 `rounded-2xl`
- 操作按钮样式更新（暗黑模式、设置、用户头像）
- 添加 backdrop-blur 效果

5. **HomePage 子组件**：

- HeroSection：添加渐变背景（使用当前颜色变量衍生色）
- ChapterGrid：卡片样式更新为白色背景、`rounded-[32px]`、阴影效果
- LearningPath：更新时间线和卡片样式
- RecentUpdates：样式更新

6. **ChapterPage.tsx**：

- 更新章节页面样式以匹配新设计语言

7. **Footer.tsx 和 MobileNav.tsx**：

- 样式微调以匹配新设计

### 实现注意事项

- **颜色方案**：严格使用当前项目的 CSS 变量，不引入原型的颜色值
- **响应式设计**：确保所有修改在移动端和桌面端都能正常显示
- **Logo 样式**：保持使用 `logo.png`，调整其容器样式以匹配原型的美观效果
- **向后兼容**：确保现有路由和功能正常工作

## 架构设计

保持当前项目的组件架构：

- `App.tsx`：主应用组件，管理全局状态
- `components/layout/`：布局组件（Sidebar, Topbar, Footer, MobileNav）
- `pages/`：页面组件（HomePage, ChapterPage）
- `components/home/`：主页子组件（HeroSection, ChapterGrid, LearningPath, RecentUpdates）
- `data/`：数据层（chapters.ts）

## 目录结构

```
site/src/
├── index.css                           # [MODIFY] 添加 glass morphism 支持
├── tailwind.config.ts                  # [MODIFY] 更新 sidebar 宽度为 280px
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx                # [MODIFY] 宽度、logo样式、导航项样式
│   │   ├── Topbar.tsx                 # [MODIFY] 搜索框、按钮、backdrop-blur
│   │   ├── Footer.tsx                 # [MODIFY] 样式微调
│   │   └── MobileNav.tsx              # [MODIFY] 样式微调
│   └── home/
│       ├── HeroSection.tsx             # [MODIFY] 渐变背景、整体样式
│       ├── ChapterGrid.tsx             # [MODIFY] 卡片样式
│       ├── LearningPath.tsx           # [MODIFY] 时间线和卡片样式
│       └── RecentUpdates.tsx           # [MODIFY] 列表样式
└── pages/
    ├── HomePage.tsx                   # [MODIFY] 可能需要调整结构
    └── ChapterPage.tsx                # [MODIFY] 更新样式
```

## 设计风格

采用温暖、现代的设计风格，基于原型设计语言但保持当前项目的暖色调。主要设计特点：

1. **圆角设计**：使用更大的圆角（`rounded-2xl` 16px，`rounded-[32px]`），营造柔和、现代的视觉感受
2. **Glass Morphism**：Stats 区域使用毛玻璃效果（背景半透明 + backdrop-blur），增加层次感
3. **渐变背景**：Hero Section 使用暖色渐变背景，引导用户注意力
4. **卡片设计**：白色卡片配合微妙阴影，清晰分隔内容区域
5. **视觉层次**：通过字号、字重、颜色的合理搭配，建立清晰的视觉层次

## 页面设计

### 1. 整体布局

- Sidebar（280px）+ Main Content 的经典布局
- Sidebar 固定左侧，Main Content 可滚动
- Topbar 固定在顶部，backdrop-blur 效果

### 2. Sidebar

- 宽度：280px
- 背景：`bg-[#f2ebdf]`（接近当前 `--parchment-warm`）
- Logo 区域：
- 容器：`w-10 h-10 rounded-2xl bg-[#e8dcc8] flex items-center justify-center`
- `logo.png` 适配容器内显示
- 导航项：
- 默认：hover 时 `bg-white transition`
- 选中：`bg-[#eadcc8] border border-[#e2cfb7] rounded-2xl`

### 3. Topbar

- 背景：`bg-[rgba(247,242,232,0.9)] backdrop-blur-[14px]`
- 搜索框：
- `rounded-2xl border border-[#e4d5c3] bg-white`
- 左图标（搜索图标）
- 右侧快捷键提示 `⌘K`
- 操作按钮：
- 暗黑模式按钮
- 设置按钮
- 用户头像按钮

### 4. 主页 Hero Section

- 容器：`rounded-[32px] overflow-hidden`
- 背景：渐变 `from-[#fff5e7] to-[#f5ede2]`（使用当前颜色变量的衍生色）
- 标题：大字号、粗体、强调色
- 描述：中等字号、柔和颜色
- 操作按钮：主要按钮 + 次要按钮

### 5. Stats 区域

- Glass Morphism 效果：
- `bg-[rgba(255,255,255,0.72)] backdrop-filter: blur(10px)`
- `rounded-3xl border border-[#eadfce]`
- 4 列网格布局
- 大数字 + 标签

### 6. 学习路线图

- 2x2 网格布局
- 白色卡片：`bg-white border border-[#eadfce] rounded-[32px] p-7`
- 卡片悬停效果：`hover:-translate-y-1 hover:shadow-lg transition`

### 7. ChapterPage

- 保持与主页一致的设计语言
- 章节标题区域：大图标 + 标题 + 元信息
- 文章列表：卡片式设计，清晰分隔

## 响应式设计

- 桌面端（>1024px）：完整布局，Sidebar 常显
- 平板端（768px-1024px）：Sidebar 可折叠
- 移动端（<768px）：Sidebar 隐藏，通过按钮唤出，单列布局