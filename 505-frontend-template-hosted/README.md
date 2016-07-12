# 给前端项目用的能快速部署到leancloud的模板

- 只利用leancloud作为静态服务器
- 没有任何其他功能

## 依赖于leancloud在本地运行
首先确认本机已经安装 [Node.js](http://nodejs.org/) 运行环境和 [LeanCloud 命令行工具](https://www.leancloud.cn/docs/leanengine_cli.html)，然后执行下列指令：
```
npm install
```

## 关联应用：

```
lean app add 505-expressjs <appId>
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
