# WebStudio Pages

基于 WebStudio 的网页构建和部署项目。

## 项目说明

本项目使用 WebStudio 进行网页设计与开发，提供自动化构建流程。

## 环境变量

项目需要以下环境变量（可选但推荐配置）：

| 变量名 | 说明 |
|--------|------|
| `WEBSTUDIO_LINK` | WebStudio 项目链接 |
| `DOMAIN` | 网站域名 |
| `FAVICON` | favicon 文件名（默认：favicon.ico） |
| `F404PAGE` | 404 页面路径（默认：404/index.html） |

## 快速开始

### 1. 配置环境变量

在运行项目前，请确保已配置所需的环境变量。

### 2. 启动构建

```bash
npm start
```

该命令会执行以下步骤：
- 链接 WebStudio 项目（如果配置了 WEBSTUDIO_LINK）
- 同步 WebStudio 资源
- 构建 SSG（静态站点生成）项目
- 处理 favicon 和 404 页面
- 安装依赖并完成最终构建

## 项目结构

```
webstudio-pages/
├── public/          # 公共资源
│   └── assets/      # 资源文件
├── scripts/         # 脚本目录
│   └── start.js     # 启动脚本
├── LICENSE          # 许可证文件
└── package.json     # 项目配置
```

## 许可证

MIT License
