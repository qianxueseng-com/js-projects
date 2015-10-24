/**
 * Created by newraina on 2015/10/24 0024.
 */

function addLoadEvent(func) {
    // 绑定func函数到window.onload事件处理函数
    // 如果已经绑定过函数，则把新函数追加到现有指令末尾
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}