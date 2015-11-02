# github pages，用github来做个人主页

## 主要目的
- 了解webpack
- 建立个人主页来展示将来的项目

## 使用方法
- 如下
```
cd 102-github-pages
npm install
npm start
# 然后访问http://localhost:8080/
```
要创建gh-pages的时候
```
npm run build
git checkout -b gh-pages
rm .gitignore
git add .
git commit
git push origin gh-pages
```

## 基本要求
- 创建一个repo名字叫username.github.io，[github page官方文档](https://pages.github.com/)
- 写很多html，一些css，一些js。主要将来用这个页面来展示你的项目和教育状况。从上到下分为，github名字，教育状况，项目。在项目部分，用类似于101的格子来展示你的个人项目。例如[这样](http://www.nancygarciafashion.com/)
- 创建一个gh-pages的branch，这个branch下所有的东西都能在username.github.io被访问[参考但不要完全照搬详细的步骤](https://help.github.com/articles/creating-project-pages-manually/)
- 使用webpack来生成文件
- 使用SCSS来生成css
- 使用CommonJs来把javascript拆成多个文件

## 额外要求
- 配置webpack让其支持图片
- 使用bootstrap作为css框架
- 研究一个更复杂的webpack boilerplate repo
- 了解`npm start`和`npm run build`的工作方式，加入一个自己的`npm run abc`命令
- 买个域名并指向这个网站

## 提交办法
- 把网站链接作为pull request提交到`js-projects/README.md`

## 参考链接
- http://www.jonathan-petitcolas.com/2015/05/15/howto-setup-webpack-on-es6-react-application-with-sass.html
- https://github.com/webpack/webpack/issues/1548
- https://github.com/ampedandwired/html-webpack-plugin
- https://github.com/nihey/webpack-single-page-boilerplate
