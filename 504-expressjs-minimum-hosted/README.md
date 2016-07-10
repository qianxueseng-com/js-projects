# 结构清晰，并能快速部署到leancloud的nodejs应用

- 基于Express 4 的 Node.js 应用。
- 可以运行在 LeanEngine Node.js 运行时环境。
- 前学僧把代码整理了下，把清道夫的代码拆出来，方便理解。
- 不依赖其他平台的代码，server-minimum.js -> app.js
- 依赖于leancloud的代码，server.js -> app.js

## 不依赖于任何平台的运行
```
npm install
node server-minimum.js
```

## 依赖于leancloud在本地运行

首先确认本机已经安装 [Node.js](http://nodejs.org/) 运行环境和 [LeanCloud 命令行工具](https://www.leancloud.cn/docs/leanengine_cli.html)，然后执行下列指令：
```
npm install
```

## 关联应用：

```
lean app add 504-expressjs <appId>
```

这里的 appId 填上你在 LeanCloud 上创建的某一应用的 appId 即可。origin 则有点像 Git 里的 remote 名称。

## 启动项目：

```
lean up
```

应用即可启动运行：[localhost:3000](http://localhost:3000)

## 部署到云端：
```
lean deploy
```

## 指定域名：
```
云引擎 -> 设置 -> Web 主机域名 (例如qxs-test1) -> 保存
```
即可访问[http://qxs-test1.leanapp.cn/](http://qxs-test1.leanapp.cn/)

## 相关文档

* [LeanEngine 指南](https://leancloud.cn/docs/leanengine_guide-node.html)
