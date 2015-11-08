var box = document.getElementById('box');
var value = document.getElementById('inputVal').value;
var btn = document.getElementsByTagName('button')[0];
// 生成格子
function createGrid(value) {
    box.innerHTML = '';
    for (var i = 0; i < value; i++) {
        // 创建行
        var columnDiv = document.createElement('div');
        columnDiv.setAttribute('class', 'columnDiv');
        box.appendChild(columnDiv);
        for (var j = 0; j < value; j++) {
            // 创建格子
            var item = document.createElement('div');
            item.setAttribute('class', 'item');
            var num = i * value + j + 1;
            var numNode = document.createTextNode(num);
            item.appendChild(numNode);
            columnDiv.appendChild(item);
            changeFontSize(item, value);
            item.addEventListener('click', function(){
                console.log(this.innerHTML);
            });
        }
    }
}
function changeFontSize(element, value) {
    element.style.fontSize = (200 / value).toString() + 'px';
}
window.onload = function () {
    createGrid(3);
};
// 事件委托
var container = document.getElementById('container');
container.addEventListener('click',function(event) {
    var tar = event.target.className;
    switch(tar) {
        case 'btn':
            var value = document.getElementById('inputVal').value;
            createGrid(value);
            break;
    }
}, false);
