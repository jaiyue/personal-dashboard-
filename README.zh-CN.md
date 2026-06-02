# Personal Hub

[English Version](README.md)

一个个人知识管理与作品集平台，旨在将职业发展、项目文档、旅行规划以及个人收藏整合到同一个系统中。

## 项目概述

Personal Hub 是一个综合性平台，结合了作品集网站、简历管理系统、旅行规划工具和数字化收藏数据库的功能。项目目标是减少信息分散问题，提供一个结构化环境，用于存储、整理、搜索、复用个人成就、项目经验、旅行记录和收藏内容。

该平台既面向长期个人使用，也可作为全栈软件工程、数据库设计和 AI 辅助信息管理能力的实践展示。

## 技术栈

- 前端：`Next.js`
- 后端：`Python (FastAPI)`
- 数据库：`SQLite`
- UI：`Tailwind CSS` + `shadcn/ui`

## 初始架构

```text
Personal Hub
│
├── Dashboard
│
├── CV Manager
│   ├── Education
│   ├── Experience
│   ├── Projects
│   └── Skills
│
├── Portfolio
│   ├── AI Quiz Show
│   ├── LFA Analysis
│   └── Energy Trading
│
├── Travel Planner
│   ├── Countries
│   ├── Trips
│   └── AI Generator
│
├── Postcard Collection
│   ├── Images
│   ├── Maps
│   └── Tags
│
└── AI Assistant
    ├── Generate CV
    ├── Generate Cover Letter
    ├── Generate Travel Plan
    └── Summarise Projects
```

## 项目目标

- 维护教育背景、技能、项目与经历的结构化数据库
- 基于已有记录生成定制化简历和求职材料
- 通过个人作品集展示项目和成果
- 管理旅行计划、行程安排和目的地研究
- 整理和归档如明信片等个人收藏
- 探索 AI 辅助内容生成与知识检索能力

## 核心功能

### 简历与职业管理

可存储与组织：

- 教育经历
- 工作经历
- 研究项目
- 技术技能
- 证书认证
- 奖项与成就

支持能力：

- 搜索和筛选经历
- 生成特定岗位简历
- 导出职业信息
- 维护职业记录的单一真实来源

### 作品集管理

维护详细项目记录，包括：

- 项目描述
- 使用技术
- 截图和媒体资料
- GitHub 仓库
- 演示链接
- 开发时间线

支持能力：

- 精选项目展示
- 基于技术的筛选
- 自动项目摘要
- 作品集展示页面

### 旅行规划

存储旅行相关信息：

- 已访问国家和城市
- 未来旅行计划
- 预算与支出
- 景点与活动
- 住宿记录

支持能力：

- AI 生成行程安排
- 目的地推荐
- 旅行历史追踪
- 旅行笔记管理

### 明信片收藏数据库

对明信片收藏进行数字化归档，包括：

- 图片
- 来源国家
- 城市
- 获取日期
- 分类标签
- 个人备注

支持能力：

- 搜索和浏览收藏
- 地理维度组织
- 收藏统计
- 可视化画廊展示

### AI Assistant

平台集成的 AI 功能包括：

- 简历生成
- 项目描述生成
- 求职信草拟
- 旅行行程生成
- 知识内容总结

## 系统架构

前端：

- Next.js
- Tailwind CSS
- shadcn/ui

后端：

- FastAPI

数据库：

- SQLite（初始版本）
- PostgreSQL（后续扩展）

AI 服务：

- OpenAI API
- 本地 LLM 支持（未来）

## 数据库模块

### Career Database

- Education
- Experience
- Skills
- Certifications

### Project Database

- Projects
- Technologies
- Media Assets

### Travel Database

- Trips
- Destinations
- Travel Notes

### Collection Database

- Postcards
- Categories
- Locations

## 后续开发

计划功能：

- 身份认证与用户账户
- 交互式旅行地图
- AI 语义搜索
- 自动化简历优化
- 项目分析仪表盘
- 移动端友好界面
- 云端同步
- 多语言支持

## 项目动机

个人信息通常分散在文档、表格、笔记应用、云存储和作品集网站中。这个项目的目标是构建一个统一的个人生态系统，使信息只需存储一次，便可在多个场景中复用。

该平台也可作为数据库设计、全栈开发、API 集成以及 AI 辅助生产力工具实践的展示。
