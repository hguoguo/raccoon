#!/bin/bash

# Raccoon Edu Docker 构建和部署脚本

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DOCKER_DIR="$PROJECT_ROOT/docker"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Raccoon Edu Docker 构建脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查是否在项目根目录
if [ ! -f "$PROJECT_ROOT/site/package.json" ]; then
    echo -e "${RED}错误: 请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 函数：显示帮助信息
show_help() {
    echo "用法: $0 [命令]"
    echo ""
    echo "命令:"
    echo "  build       构建前端应用和 Docker 镜像"
    echo "  run         运行 Docker 容器"
    echo "  stop        停止 Docker 容器"
    echo "  restart     重启 Docker 容器"
    echo "  clean       清理构建产物和容器"
    echo "  logs        查看容器日志"
    echo "  help        显示此帮助信息"
    echo ""
}

# 函数：构建前端应用
build_frontend() {
    echo -e "${YELLOW}步骤 1: 构建前端应用...${NC}"
    cd "$PROJECT_ROOT/site"
    
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}安装依赖...${NC}"
        npm install
    fi
    
    npm run build
    echo -e "${GREEN}✓ 前端应用构建完成${NC}"
    echo ""
}

# 函数：构建 Docker 镜像
build_docker() {
    echo -e "${YELLOW}步骤 2: 构建 Docker 镜像...${NC}"
    cd "$PROJECT_ROOT"
    
    docker build -t raccoon-edu -f docker/Dockerfile .
    echo -e "${GREEN}✓ Docker 镜像构建完成${NC}"
    echo ""
}

# 函数：运行容器
run_container() {
    echo -e "${YELLOW}启动 Docker 容器...${NC}"
    cd "$DOCKER_DIR"
    
    # 检查容器是否已存在
    if docker ps -a --format '{{.Names}}' | grep -q '^raccoon-edu$'; then
        echo -e "${YELLOW}容器已存在，先停止并删除...${NC}"
        docker stop raccoon-edu || true
        docker rm raccoon-edu || true
    fi
    
    docker-compose up -d
    echo -e "${GREEN}✓ 容器启动成功${NC}"
    echo -e "${GREEN}访问地址: http://localhost:5300${NC}"
    echo ""
}

# 函数：停止容器
stop_container() {
    echo -e "${YELLOW}停止 Docker 容器...${NC}"
    cd "$DOCKER_DIR"
    docker-compose down
    echo -e "${GREEN}✓ 容器已停止${NC}"
    echo ""
}

# 函数：清理
clean() {
    echo -e "${YELLOW}清理构建产物和容器...${NC}"
    
    # 停止并删除容器
    cd "$DOCKER_DIR"
    docker-compose down || true
    
    # 删除前端构建产物
    cd "$PROJECT_ROOT/site"
    if [ -d "dist" ]; then
        rm -rf dist
        echo -e "${GREEN}✓ 已删除前端构建产物${NC}"
    fi
    
    # 删除 Docker 镜像
    cd "$PROJECT_ROOT"
    docker rmi raccoon-edu || true
    echo -e "${GREEN}✓ 已删除 Docker 镜像${NC}"
    echo ""
}

# 函数：查看日志
show_logs() {
    echo -e "${YELLOW}查看容器日志...${NC}"
    cd "$DOCKER_DIR"
    docker-compose logs -f
}

# 主逻辑
case "${1:-build}" in
    build)
        build_frontend
        build_docker
        run_container
        ;;
    run)
        run_container
        ;;
    stop)
        stop_container
        ;;
    restart)
        stop_container
        run_container
        ;;
    clean)
        clean
        ;;
    logs)
        show_logs
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}未知命令: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  操作完成！${NC}"
echo -e "${GREEN}========================================${NC}"
