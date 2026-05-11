# 使用 Nginx 提供静态文件服务
FROM nginx:alpine

# 复制自定义 Nginx 配置
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# 复制已构建的静态文件到 Nginx 的 HTML 目录
COPY site/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 5300

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]