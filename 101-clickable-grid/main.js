/**
 * Created by newraina on 2015/10/24 0024.
 */

box = document.getElementsByClassName('box')[0];

function update(value) {

    while (box.childElementCount) {
        box.removeChild(box.children[0]);
    }

    for (var i = 0; i < value; i++) {
        var new_column = document.createElement('div');
        new_column.setAttribute('class', 'column');
        box.appendChild(new_column);
        for (var j = 0; j < value; j++) {
            var new_item = document.createElement('span');
            new_item.setAttribute('class', 'item');
            changeFontSize(new_item, value);
            var numnode = document.createTextNode((i * value + j + 1).toString());
            new_item.appendChild(numnode);
            new_column.appendChild(new_item);
        }
    }
}

function changeFontSize(node, value) {
    switch (value) {
        case '1':
            node.style.fontSize = '200px';
            break;
        case '2':
            node.style.fontSize = '100px';
            break;
        case '3':
            node.style.fontSize = '80px';
            break;
        case '4':
            node.style.fontSize = '50px';
            break;
        case '5':
            node.style.fontSize = '35px';
            break;
        case '6':
            node.style.fontSize = '30px';
            break;
        case '7':
            node.style.fontSize = '25px';
            break;
        case '8':
            node.style.fontSize = '20px';
            break;
        case '9':
            node.style.fontSize = '17px';
            break;
        default :
            break;
    }
}