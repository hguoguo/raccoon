# 部署示例

## 场景 1：首次部署

```bash
# 1. 确保代码已提交
git add .
git commit -m "Initial deployment"
git push

# 2. 运行部署脚本
./.lingma/skills/deploy-to-nas/scripts/deploy.sh

# 脚本会自动：
# - 检测到服务器上没有仓库，执行 git clone
# - 安装依赖并构建前端
# - 构建 Docker 镜像
# - 启动容器
```

## 场景 2：日常更新部署

```bash
# 修改了一些代码...

# 1. 提交更改
git add .
git commit -m "Fix: update homepage styling"
git push

# 2. 一键部署
./.lingma/skills/deploy-to-nas/scripts/deploy.sh

# 脚本会自动：
# - 检测到仓库已存在，执行 git pull
# - 重新构建前端
# - 重建 Docker 镜像
# - 重启容器
```

## 场景 3：仅推送代码，稍后部署

```bash
# 1. 提交并推送
git add .
git commit -m "Feature: add new article"
git push

# 2. 稍后手动部署
ssh xb-nas << 'EOF'
cd /vol1/1000/java/raccoon-edu
git pull
cd site && npm run build
cd ..
docker build -t raccoon-edu -f docker/Dockerfile .
docker restart raccoon-edu
EOF
```

## 场景 4：回滚到之前的版本

```bash
# 1. 在本地回滚
git log --oneline  # 查看历史提交
git revert <commit-hash>
git push

# 2. 重新部署
./.lingma/skills/deploy-to-nas/scripts/deploy.sh
```

## 场景 5：紧急修复

```bash
# 快速修复并部署
git add .
git commit -m "Hotfix: critical bug fix"
git push

# 使用一行命令快速部署
ssh xb-nas 'cd /vol1/1000/java/raccoon-edu && git pull && cd site && npm run build && cd .. && docker build -t raccoon-edu -f docker/Dockerfile . && docker restart raccoon-edu'
```

## 场景 6：检查部署状态

```bash
# 检查容器运行状态
ssh xb-nas "docker ps | grep raccoon-edu"

# 查看最近日志
ssh xb-nas "docker logs raccoon-edu --tail 50"

# 健康检查
ssh xb-nas "curl http://localhost:5300/health"

# 查看资源使用
ssh xb-nas "docker stats raccoon-edu --no-stream"
```

## 场景 7：清理和重新开始

```bash
# 停止并删除容器
ssh xb-nas "docker stop raccoon-edu && docker rm raccoon-edu"

# 删除旧镜像
ssh xb-nas "docker rmi raccoon-edu"

# 重新部署
./.lingma/skills/deploy-to-nas/scripts/deploy.sh
```

## 场景 8：多环境部署（如果有多个服务器）

```bash
# 部署到测试环境
export DEPLOY_HOST=test-nas
ssh $DEPLOY_HOST 'cd /vol1/1000/java/raccoon-edu && git pull && cd site && npm run build && cd .. && docker build -t raccoon-edu -f docker/Dockerfile . && docker restart raccoon-edu'

# 部署到生产环境
export DEPLOY_HOST=prod-nas
ssh $DEPLOY_HOST 'cd /vol1/1000/java/raccoon-edu && git pull && cd site && npm run build && cd .. && docker build -t raccoon-edu -f docker/Dockerfile . && docker restart raccoon-edu'
```

## 监控和维护

### 设置日志轮转

```bash
# 在服务器上创建日志配置
ssh xb-nas << 'EOF'
cat > /etc/docker/daemon.json << 'DOCKER_EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
DOCKER_EOF

systemctl restart docker
EOF
```

### 定期清理

```bash
# 每周清理一次旧的 Docker 镜像
ssh xb-nas "docker image prune -f --filter until=168h"
```

### 备份数据

```bash
# 备份配置文件
ssh xb-nas "tar czf /backup/raccoon-edu-$(date +%Y%m%d).tar.gz /vol1/1000/java/raccoon-edu"
```
