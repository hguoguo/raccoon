#!/bin/bash

# Raccoon Edu 自动化部署脚本
# 用途：提交代码、推送到远程、部署到 xb-nas 服务器

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Raccoon Edu 自动化部署${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
cd "$PROJECT_ROOT"

# 检查是否在正确的目录
if [ ! -f "site/package.json" ]; then
    echo -e "${RED}错误: 请在项目根目录运行此脚本${NC}"
    echo -e "${YELLOW}当前目录: $(pwd)${NC}"
    exit 1
fi

# 函数：显示步骤标题
step() {
    echo ""
    echo -e "${BLUE}>>> $1${NC}"
    echo ""
}

# 步骤 1: 检查 Git 状态
step "步骤 1: 检查 Git 状态"

git status

echo ""
read -p "是否有未提交的更改？(y/n): " has_changes

if [ "$has_changes" = "y" ] || [ "$has_changes" = "Y" ]; then
    echo ""
    read -p "输入提交信息: " commit_message
    
    if [ -z "$commit_message" ]; then
        commit_message="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    git add .
    git commit -m "$commit_message"
    echo -e "${GREEN}✓ 代码已提交${NC}"
else
    echo -e "${YELLOW}跳过提交（无更改或用户选择跳过）${NC}"
fi

# 步骤 2: 推送到远程仓库
step "步骤 2: 推送到远程仓库"

echo "推送代码到远程仓库..."
git push

echo -e "${GREEN}✓ 代码已推送到远程${NC}"

# 步骤 3: 部署到服务器
step "步骤 3: 部署到 xb-nas 服务器"

echo -e "${YELLOW}正在连接到 xb-nas 并执行部署...${NC}"
echo ""

ssh xb-nas << 'REMOTE_SCRIPT'
set -e

echo "======================================"
echo "  开始部署到服务器"
echo "======================================"
echo ""

DEPLOY_DIR="/vol1/1000/java"
REPO_NAME="raccoon-edu"
PROJECT_DIR="$DEPLOY_DIR/$REPO_NAME"

# 进入部署目录
cd $DEPLOY_DIR

# 克隆或更新仓库
if [ -d "$REPO_NAME" ]; then
    echo ">>> 仓库已存在，拉取最新代码..."
    cd $REPO_NAME
    git pull origin main || git pull origin master
    echo "✓ 代码已更新"
else
    echo ">>> 克隆仓库..."
    git clone https://gitee.com/huaguoguo/raccoon-edu.git
    cd $REPO_NAME
    echo "✓ 仓库已克隆"
fi

echo ""
echo ">>> 安装依赖并构建前端..."
cd site

# 检查 node_modules 是否存在
if [ -d "node_modules" ]; then
    echo "检测到 node_modules，跳过安装或更新依赖..."
    npm install
else
    echo "首次安装依赖..."
    npm install
fi

npm run build
echo "✓ 前端构建完成"

cd ..

echo ""
echo ">>> 构建 Docker 镜像..."
docker build -t raccoon-edu -f docker/Dockerfile .
echo "✓ Docker 镜像构建完成"

echo ""
echo ">>> 停止并删除旧容器..."
docker stop raccoon-edu 2>/dev/null || true
docker rm raccoon-edu 2>/dev/null || true
echo "✓ 旧容器已清理"

echo ""
echo ">>> 启动新容器..."
docker run -d \
  --name raccoon-edu \
  -p 5300:5300 \
  --restart unless-stopped \
  raccoon-edu

echo "✓ 容器已启动"

echo ""
echo "======================================"
echo "  部署完成！"
echo "======================================"
echo ""
echo "访问地址: http://<server-ip>:5300"
echo ""
echo "容器状态:"
docker ps | grep raccoon-edu
echo ""
echo "健康检查:"
curl -s http://localhost:5300/health || echo "等待容器启动..."

REMOTE_SCRIPT

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  ✓ 部署成功！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "应用运行在: http://<xb-nas-ip>:5300"
    echo ""
else
    echo ""
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}  ✗ 部署失败${NC}"
    echo -e "${RED}========================================${NC}"
    exit 1
fi
