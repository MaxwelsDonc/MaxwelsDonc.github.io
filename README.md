
## 个人学术主页（Jekyll + GitHub Pages）

这个仓库是基于 AcadHomepage 模板改造的个人学术主页，部署在：

- 自定义域名：https://zhouzenghui.site
- GitHub Pages：https://maxwelsdonc.github.io（如有变动以实际为准）

主要用于展示个人简介、教育经历、论文发表、项目、学术服务等信息。

---

## 功能概览

- 基于 Jekyll 的静态学术主页模板
- 支持自动更新谷歌学术引用统计（总引用与每篇论文引用）
- 响应式布局，适配电脑和手机
- 支持自定义域名（当前为 `zhouzenghui.site`）
- 使用 Docker 封装本地开发环境，方便调试

---

## 如何基于本模板制作自己的主页（从 0 到上线）

下面是从模板到个人主页的完整流程，假设你的 GitHub 用户名为 `USERNAME`。

1. 创建仓库
   - 在 GitHub 上 Fork 本仓库到自己的账号下
   - 将仓库命名为 `USERNAME.github.io`（推荐），这样可以直接作为 GitHub Pages 个人主页

2. 本地克隆与预览
   - 在本地克隆仓库：
     ```bash
     git clone git@github.com:USERNAME/USERNAME.github.io.git
     cd USERNAME.github.io
     ```
   - 启动本地预览：
     ```bash
     bash run_server.sh
     ```
   - 浏览器访问 http://127.0.0.1:4000，确认站点能正常打开

3. 修改站点基础信息
   - 编辑 `_config.yml`：
     - `title`：你的主页标题（例如你的姓名）
     - `description`：一句话简介
     - `author`：姓名、邮箱、所在机构、城市等信息
     - `repository`：`USERNAME/USERNAME.github.io`
     - 如需要，可配置 `google_analytics_id` 和 SEO 相关字段

4. 配置导航与模块顺序
   - 编辑 `_data/navigation.yml`：
     - 控制顶部导航栏的菜单名称与锚点顺序
     - 可以根据需要增删某些 section（例如不需要某些栏目）

5. 填充各模块内容（见下一节「内容文件修改指南」）

6. 配置谷歌学术引用自动更新（可选但推荐，见后文「谷歌学术引用自动更新」）

7. 配置域名与部署（见后文「部署与上线」）

8. 提交并推送改动
   - 确认本地预览正常后，提交更改：
     ```bash
     git add .
     git commit -m "Customize homepage content"
     git push origin main
     ```
   - 稍等片刻，GitHub Pages 会自动完成构建与部署

---

## 目录结构说明

- 根目录
  - `_config.yml`：Jekyll 与站点基础配置（站点信息、导航、插件等）
  - `CNAME`：GitHub Pages 自定义域名配置（当前为 `zhouzenghui.site`）
  - `Gemfile`：Ruby 依赖定义
  - `Dockerfile`：构建 Jekyll 运行环境的镜像定义
  - `docker-compose.yaml`：定义本地开发用的 `jekyll-site` 服务
  - `run_server.sh`：本地一键启动脚本（调用 `docker compose up --build`）

- 页面与内容
  - `_pages/about.md`：主页入口，按模块引入不同 section
  - `_pages/includes/intro.md`：个人简介 About me
  - `_pages/includes/education.md`：教育经历
  - `_pages/includes/news.md`：新闻与动态
  - `_pages/includes/pub.md`：论文列表
  - `_pages/includes/researchProject.md`：科研项目
  - `_pages/includes/honors.md`：荣誉奖励
  - `_pages/includes/academicService.md`：学术服务
  - `_pages/includes/skills.md`：技能列表

- 布局与组件
  - `_layouts/`：页面整体布局模版（如 `default.html`）
  - `_includes/`：可复用的页面片段（导航栏、侧边栏、页脚、统计脚本等）
  - `_data/navigation.yml`：导航栏配置（菜单文本与锚点顺序）

- 静态资源
  - `assets/css/`：站点主样式文件（入口为 `assets/css/main.scss`）
  - `assets/js/`：交互脚本（如滚动、弹出、导航等）
  - `assets/fonts/`：Font Awesome、Academicons 等字体文件
  - `images/profile.jpg`：个人头像
  - `images/favicon/`：网站图标（favicon、apple-touch-icon 等）

- 自动化与脚本
  - `google_scholar_crawler/`：谷歌学术数据爬虫脚本与依赖
  - `github_myprofile_updater/`：用于更新 GitHub 个人资料的脚本
  - `.github/workflows/`：GitHub Actions 配置（谷歌学术爬虫、个人主页更新等）

- 生成结果
  - `_site/`：Jekyll 生成的静态网站文件（自动生成，无需手动修改）

---

## 内容文件修改指南（逐文件）

这一节从“写内容”的角度介绍如何修改各个文件，配合上一节的目录结构更容易上手。

### 1. 主页入口与整体结构

- `_pages/about.md`
  - 控制首页整体结构，依次引入各个 section：
    - `intro`、`education`、`news`、`pub`、`researchProject`、`honors`、`academicService`、`skills`
  - 如果想隐藏某个模块，可以临时注释对应的 `{% include_relative ... %}` 行，或在导航中移除该 section。

### 2. 个人简介（Intro）

- 文件路径：`_pages/includes/intro.md`
- 修改内容：
  - 替换英文自我介绍为你自己的背景、研究方向、当前职位等
  - 可以自由使用 Markdown 与嵌入的 HTML（如链接、加粗、行内图标等）
- 关于引用总数展示：
  - 当前示例使用 shields.io 动态 badge，数据来自本仓库 `google-scholar-stats` 分支中的 `gs_data_shieldsio.json`
  - 如果你也使用本仓库自带的谷歌学术自动更新脚本，该 badge 会自动更新为最新总引用数
  - 如不需要该功能，可以直接删除整段 `<img ...>` 标记

### 3. 教育经历（Education）

- 文件路径：`_pages/includes/education.md`
- 修改方式：
  - 按时间倒序列出你的学位、学校、专业、导师等信息
  - 可以用 Markdown 列表或表格来组织内容

### 4. 新闻与动态（News）

- 文件路径：`_pages/includes/news.md`
- 修改方式：
  - 以时间为主线列出近期事件，例如：论文录用、开源项目发布、受邀报告等
  - 建议使用无序或有序列表，最新事件放在最上方

### 5. 论文列表与单篇引用数（Publications）

- 文件路径：`_pages/includes/pub.md`
- 基本内容：
  - 按类别（在投、期刊、会议等）组织论文列表
  - 推荐结构：期刊/会议名 + 论文标题 + 作者列表 + 链接
- 单篇论文引用数的实现方式：
  1. 在 `google_scholar_crawler` 自动生成的 `gs_data.json` 中，每篇论文使用 `author_pub_id` 作为键。
  2. 在 `pub.md` 中，为需要显示引用数的论文添加：
     ```html
     <span class='show_paper_citations' data='对应论文的 author_pub_id'></span>
     ```
  3. 页面加载时，`_includes/fetch_google_scholar_stats.html` 中的脚本会：
     - 通过 CDN 或 raw.githubusercontent.com 拉取 `google-scholar-stats/gs_data.json`
     - 遍历页面上所有 `class='show_paper_citations'` 的元素
     - 读取其 `data` 属性中的论文 ID，在 JSON 中找到对应论文的 `num_citations`
     - 将 `span` 的内容更新为 `| Citations: X`
  4. 这样，每篇论文的引用数在前端渲染时就会自动填充，无需手动维护。
- 如何找到 `author_pub_id`：
  - 在谷歌学术打开某篇论文，URL 中通常会包含形如 `citation_for_view=XXXX` 的字段，`XXXX` 即可作为 `data` 的取值。

### 6. 科研项目（Projects）

- 文件路径：`_pages/includes/researchProject.md`
- 修改方式：
  - 列出你主持或参与的项目
  - 可包含项目名称、时间、角色、简要说明等

### 7. 荣誉与获奖（Honors）

- 文件路径：`_pages/includes/honors.md`
- 修改方式：
  - 以列表方式列出各类奖项、荣誉称号

### 8. 学术服务（Academic Service）

- 文件路径：`_pages/includes/academicService.md`
- 修改方式：
  - 可列出期刊/会议审稿、PC 成员、组织活动等服务信息

### 9. 技能（Skills）

- 文件路径：`_pages/includes/skills.md`
- 修改方式：
  - 可按类别组织，例如：编程语言、框架与工具、研究能力、语言能力等

### 10. 头像与图标

- 头像：
  - 将你的照片保存为 `profile.jpg`，替换 `images/profile.jpg`
- 网站图标：
  - 使用在线 favicon 生成工具生成一套图标
  - 将生成文件覆盖 `images/favicon/` 目录下的现有文件

---

## 本地开发与调试（推荐：Docker / docker compose）

本仓库已经内置 Docker 环境，避免在本地安装 Ruby/Jekyll 依赖。默认调试流程如下。

### 前置条件

- 已安装 Docker（21+ 版本建议）
- 已安装 docker compose（或 Docker Desktop 内置的 compose）

### 一键启动本地调试

在仓库根目录执行：

```bash
bash run_server.sh
```

`run_server.sh` 实际上执行的是：

```bash
docker compose up --build
```

其中：

- `Dockerfile` 会使用 Ruby 2.7，并配置国内镜像源，加速依赖安装
- `docker-compose.yaml` 会启动名为 `jekyll-site` 的服务，命令为  
  `bundle exec jekyll serve --host 0.0.0.0 --livereload --incremental`
- 容器内部挂载当前目录（`.:/usr/src/app`），代码改动会实时生效

启动成功后，在浏览器访问：

- http://127.0.0.1:4000 或 http://localhost:4000

当你修改 `_pages/` / `_data/` / `assets/` 中的内容时，页面会自动重新构建并触发浏览器刷新（livereload）。

### 停止调试

在运行 docker 的终端窗口中按 `Ctrl + C` 即可停止服务。  
如遇容器残留，可执行：

```bash
docker compose down
```

---

## 谷歌学术引用自动更新

本仓库内置了一整套“后端抓取 + 前端展示”的机制，用于自动更新总引用数和每篇论文的引用数。

### 1. 后端抓取（GitHub Actions + 爬虫脚本）

1. 获取你的谷歌学术 ID：
   - 打开你的谷歌学术主页
   - 浏览器地址栏中找到形如 `user=SCHOLAR_ID` 的字段，其中 `SCHOLAR_ID` 即为你的 ID

2. 在 GitHub 仓库中配置 Secrets：
   - 进入仓库设置：`Settings -> Secrets and variables -> Actions`
   - 新建一个仓库级别的 Secret：
     - 名称：`GOOGLE_SCHOLAR_ID`
     - 值：上一步得到的 `SCHOLAR_ID`

3. 确认工作流已启用：
   - 文件路径：`.github/workflows/google_scholar_crawler.yaml`
   - 该工作流会在以下情况下运行：
     - GitHub Pages 触发 `page_build` 事件时
     - 每天 08:00 UTC 通过定时任务自动运行

4. 工作流执行的主要步骤：
   - 安装 Python 依赖
   - 进入 `google_scholar_crawler/` 目录
   - 安装 `requirements.txt` 中的依赖（包括 `scholarly` 等）
   - 运行 `main.py`：
     - 通过 `GOOGLE_SCHOLAR_ID` 从谷歌学术抓取作者信息、引用指标、论文列表
     - 生成 `results/gs_data.json`：包含作者信息和所有论文的详细引用数据
     - 生成 `results/gs_data_shieldsio.json`：仅包含总引用数，用于 shields.io 动态 badge
   - 将生成的 JSON 文件推送到当前仓库的 `google-scholar-stats` 分支

### 2. 前端展示（总引用数 + 单篇引用）

生成好的数据会通过两个方式在页面上使用：

1. 总引用数：
   - `results/gs_data_shieldsio.json` 会被上传到 `google-scholar-stats` 分支
   - 可以通过 jsDelivr 这样的 CDN 把它作为 shields.io 的数据源
   - 在 `_pages/includes/intro.md` 中的示例 badge 就是通过这种方式展示总引用数

2. 单篇引用数：
   - 站点构建后，`google-scholar-stats/gs_data.json` 会被前端脚本加载
   - 在 `_includes/fetch_google_scholar_stats.html` 中：
     - 根据配置决定使用 CDN 还是 raw.githubusercontent.com 加载 JSON
     - 遍历页面上所有 `class='show_paper_citations'` 的元素
     - 读取每个元素的 `data` 属性（即论文 `author_pub_id`）
     - 在 JSON 中查找对应论文的 `num_citations`
     - 将该元素的内容更新为 `| Citations: X`
   - 你只需要在论文列表中（`_pages/includes/pub.md`）为对应论文加上：
     ```html
     <span class='show_paper_citations' data='对应论文的 author_pub_id'></span>
     ```
     页面就会自动显示这篇论文的最新引用数。

这套机制的好处是：

- 所有引用数据都由 GitHub Actions 定期自动更新，无需手工维护
- 前端只负责展示，不需要再次访问谷歌学术，避免额外的网络问题

---

## 部署与上线

本仓库默认通过 GitHub Pages 部署：

- 推送到 `main` 分支后，GitHub Pages 会自动重新构建站点
- 自定义域名通过根目录的 `CNAME` 文件配置为 `zhouzenghui.site`

如果你需要修改域名，只需：

- 在仓库根目录更新 `CNAME` 内容为新的域名
- 在域名 DNS 处添加到 GitHub Pages 的 CNAME 解析记录

---

## 版权说明

- 本项目基于 [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io) 模板进行修改
- AcadHomepage 使用 MIT License 授权，相关依赖（如 Font Awesome、minimal-mistakes、academicpages 等）遵循各自的开源协议

如需在此基础上二次开发自己的主页，可以自由 Fork 和定制，但建议在 README 中保留对原项目的致谢。
