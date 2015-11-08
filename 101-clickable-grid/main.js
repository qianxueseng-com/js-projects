// 生成格子
function createGrid(value, box, btn) {
    var box = document.getElementById('box');
    var value = parseInt(document.getElementById('inputVal').value, 10).toFixed(0);
    var btn = document.getElementsByTagName('button')[0];
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
        }
    }
}
var firstOpen = function() {
    var btn = document.getElementsByTagName('button')[0];
    createGrid('3', box, btn);
};
window.onload = firstOpen;
function changeFontSize(element, value) {
    element.style.fontSize = (200 / value).toString() + 'px';
}
var container = document.getElementById('container');
container.addEventListener('click',function(event) {
    var tar = event.target;
    var tarName = tar.className;
    switch(tarName) {
        case 'btn':
            var value = document.getElementById('inputVal').value;
            createGrid(value);
            break;
        case 'item':
            console.log(tar.innerHTML);
            break;
    }
}, false);
