# Raccoon

> 🎯 一个全面且深入的编程学习库，目前包含Java，Python，AI开发的知识点

## 🦝 命名由来

**Raccoon**（小浣熊）象征着对技术的热爱与执着：

- 🔍 **爱钻研**: 像小浣熊探索食物一样，深入挖掘技术底层原理
- 🛠️ **爱折腾**: 不断尝试、实验、验证，追求最佳实践

小浣熊的好奇心和探索精神，正是我们学习技术、准备面试时最需要的品质！

## 📚 知识体系

本仓库系统性地整理了xxx技术栈的核心知识点，覆盖从基础到高级的各个层次，帮助开发者学习新知识

## 🐳 Docker 部署

### 使用构建脚本（推荐）

```bash
# 赋予执行权限
chmod +x docker/build.sh

# 一键构建并运行（会自动构建前端应用和 Docker 镜像）
./docker/build.sh build

# 其他命令
./docker/build.sh stop      # 停止容器
./docker/build.sh restart   # 重启容器
./docker/build.sh clean     # 清理
./docker/build.sh logs      # 查看日志
./docker/build.sh help      # 查看帮助
```

### 手动构建

#### 1. 构建前端应用

```bash
cd site
npm install
npm run build
```

#### 2. 构建 Docker 镜像

```bash
cd ..
docker build -t raccoon-edu -f docker/Dockerfile .
```

#### 3. 运行容器

```bash
cd docker
docker-compose up -d
```

### 访问应用

打开浏览器访问 [http://localhost:5300](http://localhost:5300)

### 健康检查

```bash
curl http://localhost:5300/health
```
