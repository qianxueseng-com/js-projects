function addLoadAnimation() {
    let bodyWidth  = document.documentElement.clientWidth;
    let bodyHeight = Math.max(document.documentElement.clientHeight, document.body.scrollHeight);
    let background = document.createElement("div");

    // 遮罩层
    background.setAttribute('id', 'load_animaiton');
    background.style.position   = "absolute";
    background.style.top        = "0";
    background.style.background = "#eee";
    background.style.left       = "0";
    background.style.width      = bodyWidth + "px";
    background.style.height     = bodyHeight + "px";
    background.style.zIndex = "10000";

    document.body.appendChild(background);

    // 加载动画
    // spin库：http://spin.js.org/
    let opts    = {
        lines      : 13
        , length   : 28
        , width    : 14
        , radius   : 42
        , scale    : 1
        , corners  : 1
        , color    : '#000'
        , opacity  : 0.25
        , rotate   : 0
        , direction: 1
        , speed    : 1
        , trail    : 60
        , fps      : 20
        , zIndex   : 2e9
        , className: 'spinner'
        , top      : '50%'
        , left     : '50%'
        , shadow   : true
        , hwaccel  : true
        , position : 'absolute'
    };
    let target  = document.body;
    let spinner = new Spinner(opts).spin(target);
}

function removeLoadAnimation() {
    $('#load_animaiton').remove();
    $('.spinner').remove();
}

export {addLoadAnimation, removeLoadAnimation};
