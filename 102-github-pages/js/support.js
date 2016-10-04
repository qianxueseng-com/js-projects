exports.addLoadEvent = function(func) {
    // 绑定函数到onload事件上
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func()
        }
    }
}

exports.removeClass = function(element, value) {
    // 去掉指定的类名
    var old_class_name = element.className;
    element.className = old_class_name.replace(value, "").replace(/(^\s*)|(\s*$)/g, "");
}

exports.removeAnimationForMobile = function() {
    // 在手机访问时去掉鼠标悬停动画
    if (document.body.scrollWidth <= 800) {
        var socials = document.getElementById('social-link').getElementsByTagName('*');
        var projects = document.getElementById('project-link').getElementsByTagName('*');
        for (var i = 0; i < socials.length; i++) {
            if (socials[i].className.indexOf('hover-animation') != -1) {
                removeClass(socials[i], 'hover-animation');
            }
        }
        for (var j = 0; j < projects.length; j++) {
            if (projects[j].className.indexOf('hover-animation') != -1) {
                removeClass(projects[j], 'hover-animation');
            }
        }

    }
}
