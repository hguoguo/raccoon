---
name: hero-center-logo
overview: 将 HeroSection 知识星图中心枢纽节点的 🦝 emoji 替换为项目 logo 图片
todos:
  - id: replace-hub-emoji-with-logo
    content: 将中心枢纽节点 🦝 emoji 替换为 /logo.png 图片
    status: completed
---

将 HeroSection 知识星图中心枢纽节点的 🦝 emoji 替换为项目实际 logo 图片（`/logo.png`），提升品牌辨识度。

## 修改目标

文件：`site/src/components/home/HeroSection.tsx`，第 75 行

将：

```
<span className="text-2xl xl:text-[28px] select-none">🦝</span>
```

替换为：

```
<img src="/logo.png" alt="Raccoon Logo" className="w-8 h-8 object-contain" />
```

Logo 引用路径 `/logo.png` 与 Sidebar 组件中的用法一致（`public/logo.png`）。尺寸设为 `w-8 h-8`（32px），略大于 Sidebar 中的 `w-7 h-7`，以匹配中心节点的视觉权重。`object-contain` 确保 logo 在圆形容器内完整显示。