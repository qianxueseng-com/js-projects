'use strict';

// 导入应用数据
import data from './data';
// 导入常用选择器
import elements from './elements';
// 导入加载动画函数
import {addLoadAnimation, removeLoadAnimation} from './loadAnimation';

let Card = Backbone.Model.extend({
    defaults: {
        imageURL: '',
        question: '',
        answerA : '',
        answerB : ''
    }
});

// 定义通用view
let View = Backbone.View.extend({
    el: elements.$container,

    initialize () {
        this.template  = _.template(elements.$cardTemplate.html());
        this.titleImg  = elements.$titleImg;
        this.question  = elements.$question;
        this.selectAns = elements.$selectAns;
    },

    // 预加载图片
    preLoadImages() {
        let images      = [];
        const imgLength = 6;
        let tempLength  = imgLength;

        for (let i = 0; i < imgLength; i++) {
            let img = images[i];

            img = new Image();
            if (i < 3) {
                // 问题页图片
                img.src = this.collection.models[i === 0 ? i : i + 1].toJSON().imageURL;
            } else {
                // start end interrupt页图片
                img.src = this.collection.models[1].toJSON()[i - 3].imageURL;
            }

            // 6张图片全部加载完成后移除加载动画
            img.onload = ()=> {
                tempLength--;
                if (tempLength === 0) {
                    removeLoadAnimation();
                }
            }

        }
    },

    render (title, id = '1') {
        let modelObj, hrefA, hrefB;
        const indexHref     = '#';
        const interruptHref = '#interrupt';
        const endHref       = '#end';
        const questionHref  = '#show/';

        switch (title) {
            case undefined:
            case 'start':
                modelObj = this.collection.models[0].toJSON();
                hrefA    = questionHref + id;
                hrefB    = interruptHref;
                break;
            case 'question':
                modelObj = this.collection.models[1].toJSON()[id - 1];
                hrefA    = id < 3 ? questionHref + (modelObj.id + 1) : endHref;
                hrefB    = interruptHref;
                break;
            case 'end':
                modelObj = this.collection.models[2].toJSON();
                hrefA    = indexHref;
                hrefB    = indexHref;
                break;
            case 'interrupt':
                modelObj = this.collection.models[3].toJSON();
                hrefA    = indexHref;
                hrefB    = indexHref;
                break;
        }
        this.titleImg.attr('src', modelObj.imageURL);
        this.question.text(modelObj.question);
        this.selectAns.html(this.template({answerA: modelObj.answerA, hrefA: hrefA, answerB: modelObj.answerB, hrefB: hrefB}));
    }
});

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

// 启动！
$(function () {app.start();});
