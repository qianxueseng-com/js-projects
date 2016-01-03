// 导入应用数据
import data from './data';
// 导入模型
import Card from './model';
// 导入视图
import View from './view';
// 导入加载动画函数
import {addLoadAnimation} from './loadAnimation';

let app = new (Backbone.Router.extend({
    routes: {
        ''         : 'showStart',
        'show/:id' : 'showCard',
        'end'      : 'showEnd',
        'interrupt': 'showInterrupt'
    },

    initialize () {
        const cardLists = [data.startCard, data.questionCards, data.endCard, data.interruptCard];
        let cards       = new Backbone.Collection(cardLists, {model: Card});

        this.view = new View({collection: cards});
        this.view.preLoadImages();
    },

    // 起始页
    showStart () {
        this.view.render('start');
    },

    // 问答页
    showCard (id) {
        this.view.render('question', id);
    },

    // 结束页
    showEnd () {
        this.view.render('end');
    },

    // 退出游戏或者点击‘才不想呢’等消极选项进入此页
    showInterrupt () {
        this.view.render('interrupt');
    },

    start () {
        Backbone.history.start();
        // 显示加载动画
        addLoadAnimation();
    }
}));

export default app;
