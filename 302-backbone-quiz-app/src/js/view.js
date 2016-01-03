// 导入应用数据
import data from './data';
// 导入常用选择器
import elements from './elements';
// 导入加载动画函数
import {removeLoadAnimation} from './loadAnimation';
// 导入预加载图片函数
import preLoadImg from './preLoadImg';

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
        let images = [];

        // 遍历data中的所有imageURL
        (function traverse(obj) {
            if (!(obj instanceof Object)) return;
            for (let v of Object.keys(obj)) {
                let temp = obj[v];
                if (temp instanceof Array) {
                    for (let tempV of temp) {
                        traverse(tempV);
                    }
                } else if (temp instanceof Object) {
                    traverse(temp);
                } else if (v === 'imageURL') {
                    images.push(temp);
                }
            }
        })(data);
        preLoadImg({
            imgList : images,
            allReady: function () {
                removeLoadAnimation();
            }
        });
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

export default View;
