# 企业网站前端

这是基于React和Ant Design构建的企业网站前端项目。

## 功能特点

- 响应式设计，适配各种设备尺寸
- 案例展示页面
- 团队介绍页面
- 公司简介页面
- 需求提交功能
- 文件上传功能

## 技术栈

- React
- TypeScript
- Ant Design
- Vite
- Axios

## 环境要求

- Node.js (v16+)
- npm或yarn或pnpm包管理器

## 安装与配置

1. 安装依赖包

```bash
pnpm install
```

2. 配置环境变量
   - 将`.env.example`复制为`.env.local`
   - 根据实际情况修改API地址

```bash
cp .env.example .env.local
```

## 启动服务

### 开发环境

```bash
pnpm dev
```

### 生产环境构建

```bash
pnpm build
```

构建后的文件将生成在`dist`目录，可以部署到任何静态文件服务器。

## 文件结构

```
src/
  ├── assets/       # 静态资源文件
  ├── components/   # 可复用的组件
  ├── hooks/        # 自定义钩子函数
  ├── layouts/      # 布局组件
  ├── pages/        # 页面组件
  ├── services/     # API服务
  ├── styles/       # 全局样式
  ├── types/        # TypeScript类型定义
  ├── utils/        # 工具函数
  ├── App.tsx       # 应用入口组件
  └── main.tsx      # 应用入口点
```

## 需求提交功能

网站包含一个需求提交页面，用户可以在此上传需求文档并提供联系信息。该功能需要后端API支持：

1. 下载模板：`GET /templates/:filename`
2. 提交需求：`POST /requirements`

## 开发与扩展

- 遵循组件化设计原则
- 使用TypeScript确保类型安全
- 使用Ant Design组件库提高开发效率
- 使用Axios处理API请求
