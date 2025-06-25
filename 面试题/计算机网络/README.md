## 1.正向代理和反向代理的区别？应用场景？

| **特性**       | **正向代理**                     | **反向代理**                 |
| -------------- | -------------------------------- | ---------------------------- |
| **代理对象**   | 代理客户端                       | 代理服务器                   |
| **客户端感知** | 客户端需主动配置代理             | 客户端无感知                 |
| **隐藏对象**   | 隐藏客户端 IP                    | 隐藏服务器 IP                |
| **应用场景**   | 突破访问限制、匿名访问、缓存加速 | 负载均衡、安全防护、动静分离 |
| **配置位置**   | 客户端侧                         | 服务器侧                     |

简单示例: 
```nginx
# 正向代理
# nginx.conf
server {
    listen 80;
    resolver 8.8.8.8;  # 必须指定DNS解析器

    location / {
        proxy_pass http://$http_host$request_uri;  # 透传原始请求
        proxy_set_header Host $http_host;
    }
}
```
```nginx
# 基础反向代理
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend_servers;  # 转发到后端服务器组
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# 定义后端服务器组（负载均衡）
upstream backend_servers {
    server 192.168.1.101:8080 weight=3;  # 权重负载
    server 192.168.1.102:8080;
    server backup.example.com:8080 backup;  # 备用服务器
}

```