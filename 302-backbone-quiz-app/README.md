# backbone quiz app

## 学习目标
- [ ]Backbone基本，包括view, model, collection

## 基本要求
- [ ]使用backbone来实现一个问答应用，类似[这个](http://80750.m.cntran.com/game/lyb/index.html)
- [ ]所有的初始数据都存在一个文件里面
```
var data = {
  cards: [
    {
      id: 1,
      title: 'title1',
      imageUrl: 'imageUrl1',
      question: 'question1',
      answerA: 'answerA1',
      answerB: 'answerB1'
    },
    {
      id: 2,
      title: 'title',
      imageUrl: 'imageUrl',
      question: 'question2',
      answerA: 'answerA2',
      answerB: 'answerB2'
    },
    {
      id: 3,
      title: 'title',
      imageUrl: 'imageUrl',
      question: 'question3',
      answerA: 'answerA3',
      answerB: 'answerB3'
    }
  ]
};

```
- [ ]至少三种View, StartView, CardView 和 EndView
- [ ]至少一个model
- [ ]至少一个collection来处理所有的card
- [ ]StartView有开始按钮和简单介绍
- [ ]EndView有重新开始和分享按钮
- [ ]CardView有一个图片，一个问题，两个答案

## 额外要求
- [ ]使用Backbone router
- [ ]部署到firebase
- [ ]和微信联通，能够实现分享

## 参考文献
- [backbone fundamentals](http://addyosmani.github.io/backbone-fundamentals/)
- [backbone todo mvc](https://github.com/tastejs/todomvc/tree/gh-pages/examples/backbone)
