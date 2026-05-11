# 部署快速参考

## 一键部署（推荐）

```bash
./.lingma/skills/deploy-to-nas/scripts/deploy.sh
```

## 手动部署步骤

### 1. 提交并推送代码

```bash
git add .
git commit -m "Deploy: your changes"
git push
```

### 2. SSH 到服务器并部署

```bash
ssh xb-nas
cd /vol1/1000/java

# 首次部署
git clone https://gitee.com/huaguoguo/raccoon-edu.git
cd raccoon-edu

# 或更新已有部署
cd raccoon-edu
git pull

# 构建和部署
cd site && npm install && npm run build
cd ..
docker build -t raccoon-edu -f docker/Dockerfile .
docker stop raccoon-edu || true
docker rm raccoon-edu || true
docker run -d --name raccoon-edu -p 5300:5300 --restart unless-stopped raccoon-edu
```

## 常用命令

### 查看容器状态
```bash
ssh xb-nas "docker ps | grep raccoon-edu"
```

### 查看日志
```bash
ssh xb-nas "docker logs raccoon-edu -f"
```

### 重启容器
```bash
ssh xb-nas "docker restart raccoon-edu"
```

### 健康检查
```bash
ssh xb-nas "curl http://localhost:5300/health"
```

### 停止应用
```bash
ssh xb-nas "docker stop raccoon-edu"
```

### 删除应用
```bash
ssh xb-nas "docker stop raccoon-edu && docker rm raccoon-edu"
```

## 故障排查

### 端口被占用
```bash
ssh xb-nas "lsof -i :5300"
ssh xb-nas "kill -9 <PID>"
```

### 重新构建镜像
```bash
ssh xb-nas "cd /vol1/1000/java/raccoon-edu && docker build -t raccoon-edu -f docker/Dockerfile ."
```

### 清理 Docker 空间
```bash
ssh xb-nas "docker system prune -a"
```
