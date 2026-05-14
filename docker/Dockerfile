# 多阶段构建
# 第一阶段：构建前端应用
FROM node:20-alpine AS builder

WORKDIR /app

# 复制 package.json 和 lock 文件
COPY site/package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY site/ .

# 构建生产版本
RUN npm run build

# 第二阶段：使用 Nginx 提供静态文件服务
FROM nginx:alpine

# 复制自定义 Nginx 配置
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制已构建的静态文件到 Nginx 的 HTML 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 修复文件权限，确保 Nginx 可以读取
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

# 暴露端口
EXPOSE 5300

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]