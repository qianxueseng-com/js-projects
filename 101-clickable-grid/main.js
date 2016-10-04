/**
 * Created by newraina on 2015/10/24 0024.
 */

var box = document.getElementsByClassName('box')[0];
var select = document.getElementById('select');
var item = document.getElementsByClassName('item');


// 事件绑定
window.addEventListener('load', function(){update(2)});
select.addEventListener('change', function(){update(this.value)});




function update(value) {

    // 清空所有小方块
    box.innerHTML = '';

    // 生成格子
    for (var i = 0; i < value; i++) {
        var newColumn = document.createElement('div');
        newColumn.setAttribute('class', 'column');
        box.appendChild(newColumn);
        for (var j = 0; j < value; j++) {
            var newItem = document.createElement('span');
            newItem.setAttribute('class', 'item');
            changeFontSize(newItem, value);
            var numNode = document.createTextNode((i * value + j + 1).toString());
            newItem.appendChild(numNode);
            newColumn.appendChild(newItem);
            //  点击每个格子的时候，用console.log打印出当前格子的数字
            newItem.addEventListener('click', function(){console.log(this.innerHTML)});
        }
    }


}

function changeFontSize(node, value) {
    // 根据方块个数调整字体大小
    node.style.fontSize = (200 / value).toString() + 'px';
}
