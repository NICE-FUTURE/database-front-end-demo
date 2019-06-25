# database-front-end-demo
前端连接数据库（SQL Server）实现基本的增、删、改、查操作



## 运行

**前提**：

- 前往`Node.js`官网下载安装  [Node.js](<https://nodejs.org/en/>)
- 在 `SQL Server 配置管理器` 或 系统的`服务` 中启动数据库服务 `SQL Server`
- 修改 `server/database.js` 第 5 行的 `config` 内容，即：改成你的用户名、用户密码、数据库名称

**在项目根目录下：**

- `npm install` 安装所有项目依赖
- `node ./server/server.js` 启动后台服务
- 在浏览器打开 `http://127.0.0.1:3000/` 进入首页



## 功能

- 下拉框中包含数据库中所有的**表**以及**视图**
- 文本区域编写完整的 **`SQL` 语句**提交执行
- 点击 `insert`, `delete`, `update` 三个按钮显示预置的 `SQL` 语句模板



## 原理

- 网页内容、样式和动作基于 `HTML`，`CSS`，`JavaScript` 实现

- 网页通过 `JavaScript` 的 `Ajax` 向后台发送 `POST` 请求提交命令
- 后台通过 `Node.js` 的 `http` 模块监听 `http://127.0.0.1` 的 `3000` 端口
- 后台使用 `Node.js` 的 `mssql` 模块连接数据库，处理数据库操作
- `http` 模块分析网页请求，将数据库操作提交 `mssql` 模块执行，执行结果作为响应返回至网页
- 网页根据响应更新页面内容



## 效果

![https://raw.githubusercontent.com/NICE-FUTURE/NICE-FUTURE.github.io/master/images/demo.gif](https://raw.githubusercontent.com/NICE-FUTURE/NICE-FUTURE.github.io/master/images/demo.gif)

