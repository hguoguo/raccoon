---
name: remote-deploy
description: 自动化远程部署工作流：提交并推送代码到 Git 仓库，SSH 连接到远程服务器，克隆或拉取代码，使用 npm 构建前端应用，通过 Dockerfile 将静态文件打包成 Docker 镜像，并运行容器。当需要部署应用到远程服务器，或用户提到部署、发布、推送到生产环境时使用。
---

# 远程部署

应用的自动化远程部署工作流。

## 工作流概述

此技能处理完整的部署流程：
1. 提交并推送本地更改到 Git 仓库
2. SSH 连接到 xb-nas 服务器
3. 在服务器上克隆或更新仓库
4. 构建前端应用
5. 构建 Docker 镜像
6. 运行/更新 Docker 容器

## 前置条件

- 已在 `~/.ssh/config` 中配置好到 `xb-nas` 的 SSH 连接
- 仓库地址：`https://gitee.com/huaguoguo/raccoon-edu.git`
- 服务器部署路径：`/vol1/1000/java`
- 服务器上已安装 Docker
- 服务器上可用 Node.js 和 npm

## 部署步骤

### 步骤 1：提交并推送本地更改

```bash
# Check git status
git status

# Add all changes
git add .

# Commit with meaningful message
git commit -m "Deploy: [describe changes]"

# Push to remote repository
git push
```

**验证推送成功：**
```bash
git log -1 --oneline
```

### 步骤 2：SSH 连接服务器并部署

连接到 xb-nas 并执行部署：

```bash
ssh xb-nas << 'EOF'
set -e

# Navigate to deployment directory
cd /vol1/1000/java

# Clone or pull repository
if [ -d "raccoon-edu" ]; then
    echo "Repository exists, pulling latest changes..."
    cd raccoon-edu
    git pull
else
    echo "Cloning repository..."
    git clone https://gitee.com/huaguoguo/raccoon-edu.git
    cd raccoon-edu
fi

# Install dependencies and build frontend
echo "Building frontend application..."
cd site
npm install
npm run build

# Return to project root
cd ..

# Build Docker image
echo "Building Docker image..."
docker build -t raccoon-edu -f docker/Dockerfile .

# Stop and remove existing container if running
echo "Stopping existing container..."
docker stop raccoon-edu || true
docker rm raccoon-edu || true

# Run new container
echo "Starting new container..."
docker run -d \
  --name raccoon-edu \
  -p 5300:5300 \
  --restart unless-stopped \
  raccoon-edu

echo "Deployment completed successfully!"
echo "Application is running at http://<server-ip>:5300"
EOF
```

### 步骤 3：验证部署

部署完成后，验证应用是否正常运行：

```bash
# Check container status
ssh xb-nas "docker ps | grep raccoon-edu"

# Test health endpoint
ssh xb-nas "curl -s http://localhost:5300/health"

# View container logs (if needed)
ssh xb-nas "docker logs raccoon-edu --tail 50"
```

## 快速部署命令

为方便起见，提交更改后可以使用这个一行命令：

```bash
git push && ssh xb-nas 'cd /vol1/1000/java && if [ -d raccoon-edu ]; then cd raccoon-edu && git pull; else git clone https://gitee.com/huaguoguo/raccoon-edu.git && cd raccoon-edu; fi && cd site && npm install && npm run build && cd .. && docker build -t raccoon-edu -f docker/Dockerfile . && docker stop raccoon-edu || true && docker rm raccoon-edu || true && docker run -d --name raccoon-edu -p 5300:5300 --restart unless-stopped raccoon-edu'
```

## 故障排查

### Git 拉取冲突

如果在服务器上遇到合并冲突：

```bash
ssh xb-nas << 'EOF'
cd /vol1/1000/java/raccoon-edu
git stash
git pull
git stash drop
EOF
```

### Docker 构建失败

检查是否有缺失的依赖或构建错误：

```bash
# View detailed build logs
ssh xb-nas "cd /vol1/1000/java/raccoon-edu && docker build -t raccoon-edu -f docker/Dockerfile ."

# Check if site/dist exists
ssh xb-nas "ls -la /vol1/1000/java/raccoon-edu/site/dist"
```

### 容器无法启动

检查容器日志和端口可用性：

```bash
# Check logs
ssh xb-nas "docker logs raccoon-edu"

# Check if port 5300 is in use
ssh xb-nas "lsof -i :5300"

# Check container status
ssh xb-nas "docker ps -a | grep raccoon-edu"
```

### NPM 安装问题

如果服务器上的 npm install 失败：

```bash
ssh xb-nas << 'EOF'
cd /vol1/1000/java/raccoon-edu/site
rm -rf node_modules package-lock.json
npm install
npm run build
EOF
```

## 重要说明

1. **始终先提交并推送**：确保所有本地更改在部署前已提交
2. **服务器路径**：部署始终在 `/vol1/1000/java/raccoon-edu` 进行
3. **端口**：应用在端口 5300 上运行（主机和容器）
4. **容器名称**：始终为 `raccoon-edu`
5. **自动重启**：容器配置了 `--restart unless-stopped`
6. **幂等性**：可以安全地多次运行 - 会更新现有部署

## 替代方案：使用部署脚本

为了更可靠的方法，在服务器上创建部署脚本：

```bash
# Create deployment script on server
ssh xb-nas << 'SCRIPT'
cat > /vol1/1000/java/deploy.sh << 'EOF'
#!/bin/bash
set -e

PROJECT_DIR="/vol1/1000/java/raccoon-edu"

echo "=== Starting Deployment ==="

# Update code
if [ -d "$PROJECT_DIR" ]; then
    cd $PROJECT_DIR
    git pull
else
    cd /vol1/1000/java
    git clone https://gitee.com/huaguoguo/raccoon-edu.git
    cd raccoon-edu
fi

# Build frontend
echo "Building frontend..."
cd site
npm install
npm run build
cd ..

# Build Docker image
echo "Building Docker image..."
docker build -t raccoon-edu -f docker/Dockerfile .

# Restart container
echo "Restarting container..."
docker stop raccoon-edu || true
docker rm raccoon-edu || true
docker run -d --name raccoon-edu -p 5300:5300 --restart unless-stopped raccoon-edu

echo "=== Deployment Complete ==="
echo "Access: http://<server-ip>:5300"
EOF

chmod +x /vol1/1000/java/deploy.sh
SCRIPT

# Then deploy with simple command:
git push && ssh xb-nas "/vol1/1000/java/deploy.sh"
```

## 安全注意事项

- 应配置基于 SSH 密钥的身份验证
- 永远不要将敏感数据（API 密钥、密码）提交到仓库
- 使用 `.env` 文件存储环境特定的配置
- 确保服务器上的 Docker socket 权限配置正确
