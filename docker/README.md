# Docker 配置

此目录包含 Raccoon Edu 项目的 Docker 相关配置文件。

## 文件说明

- **Dockerfile**: 使用 Nginx 提供静态文件服务（需要预先构建前端应用）
- **nginx.conf**: Nginx 服务器配置，支持 React Router 和静态资源优化
- **docker-compose.yml**: Docker Compose 配置，简化容器管理
- **.dockerignore**: Docker 构建时忽略的文件列表
- **build.sh**: 自动化构建和部署脚本

## 快速开始

### 使用构建脚本（推荐）

```bash
# 从项目根目录运行
chmod +x docker/build.sh
./docker/build.sh build
```

这将自动：
1. 构建前端应用（`npm run build`）
2. 构建 Docker 镜像
3. 启动容器

### 其他命令

```bash
./docker/build.sh stop      # 停止容器
./docker/build.sh restart   # 重启容器
./docker/build.sh clean     # 清理构建产物和容器
./docker/build.sh logs      # 查看日志
./docker/build.sh help      # 查看帮助
```

## 手动部署

### 1. 构建前端应用

```bash
cd site
npm install
npm run build
```

### 2. 构建 Docker 镜像

```bash
cd ..
docker build -t raccoon-edu -f docker/Dockerfile .
```

### 3. 运行容器

```bash
cd docker
docker-compose up -d
```

## 访问应用

构建并运行后，访问 http://localhost:5300

## 健康检查

```bash
curl http://localhost:5300/health
```
