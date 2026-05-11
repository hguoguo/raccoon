# Remote Deploy Skill

这是一个自动化远程部署技能，用于将应用部署到远程服务器。

## 📁 文件结构

```
remote-deploy/
├── SKILL.md          # 主要技能文件（Agent 使用）
├── README.md         # Skill 使用说明文档
├── QUICKREF.md       # 快速参考手册
├── EXAMPLES.md       # 使用示例和场景
└── scripts/
    └── deploy.sh     # 自动化部署脚本
```

## 🚀 快速开始

### 方法 1：使用自动化脚本（推荐）

```bash
# 赋予执行权限
chmod +x .lingma/skills/remote-deploy/scripts/deploy.sh

# 运行部署
./.lingma/skills/remote-deploy/scripts/deploy.sh
```

脚本会自动完成：
1. ✅ 检查 Git 状态并提示提交
2. ✅ 推送到远程仓库
3. ✅ SSH 连接到 xb-nas
4. ✅ 克隆或更新代码仓库
5. ✅ 安装依赖并构建前端
6. ✅ 构建 Docker 镜像
7. ✅ 停止旧容器并启动新容器
8. ✅ 验证部署状态

### 方法 2：手动部署

查看详细的手动部署步骤，请参考 [QUICKREF.md](QUICKREF.md)

### 方法 3：让 Agent 自动执行

当你提到以下关键词时，Agent 会自动使用此技能：
- "部署到 NAS"
- "发布到服务器"
- "推送到生产环境"
- "deploy to NAS"
- "push to production"

## 📖 文档说明

- **[SKILL.md](SKILL.md)** - 完整的部署流程和故障排查指南（Agent 主要读取此文件）
- **[QUICKREF.md](QUICKREF.md)** - 常用命令速查表
- **[EXAMPLES.md](EXAMPLES.md)** - 各种部署场景的实例

## 🔧 前置要求

1. **SSH 配置**：确保 `xb-nas` 已在 `~/.ssh/config` 中配置
2. **Git 仓库**：远程仓库地址为 `https://gitee.com/huaguoguo/raccoon-edu.git`
3. **服务器环境**：
   - Node.js 和 npm 已安装
   - Docker 已安装并运行
   - 部署目录 `/vol1/1000/java` 存在且有写入权限

## 🎯 使用场景

### 场景 1：日常开发部署
```bash
git add .
git commit -m "feat: add new feature"
git push
./.lingma/skills/remote-deploy/scripts/deploy.sh
```

### 场景 2：紧急修复
```bash
git add .
git commit -m "hotfix: critical bug"
git push
ssh xb-nas 'cd /vol1/1000/java/raccoon-edu && git pull && cd site && npm run build && cd .. && docker restart raccoon-edu'
```

### 场景 3：查看部署状态
```bash
ssh xb-nas "docker ps | grep raccoon-edu"
ssh xb-nas "docker logs raccoon-edu --tail 50"
ssh xb-nas "curl http://localhost:5300/health"
```

## 🌐 访问应用

部署完成后，应用将在以下地址运行：
- **URL**: `http://<xb-nas-ip>:5300`
- **健康检查**: `http://<xb-nas-ip>:5300/health`

## ⚠️ 注意事项

1. **端口占用**：确保服务器上的 5300 端口未被占用
2. **Docker 权限**：确保当前用户有 Docker 操作权限
3. **磁盘空间**：定期检查并清理旧的 Docker 镜像
4. **备份策略**：重要数据请定期备份

## 🐛 故障排查

常见问题及解决方案请参考 [SKILL.md](SKILL.md) 中的 "Troubleshooting" 章节。

## 📝 自定义配置

如需修改部署配置，编辑以下文件：

- **部署路径**: 修改 `scripts/deploy.sh` 中的 `DEPLOY_DIR` 变量
- **端口号**: 修改 `docker/docker-compose.yml` 和 `docker/nginx.conf` 中的端口配置
- **容器名称**: 修改 `scripts/deploy.sh` 中的容器名称

## 🤝 贡献

如需改进此部署流程，请：
1. 测试更改在本地和服务器上都能正常工作
2. 更新相关文档
3. 提交 Pull Request

## 📞 支持

如有问题，请查看：
- [QUICKREF.md](QUICKREF.md) - 快速参考
- [EXAMPLES.md](EXAMPLES.md) - 使用示例
- [SKILL.md](SKILL.md) - 完整文档
