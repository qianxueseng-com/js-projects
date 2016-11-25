// 预加载图片
// 预备实现的功能：
// 支持进度
// 支持单个图片加载完成的回调和全部加载完成的回调

function preLoadImg(opt) {
    var option = {
        imgList: opt.imgList || [],
        imgReady: opt.imgReady || function() {},
        allReady: opt.allReady || function() {}
    };
    var len = option.imgList.length;

    list.forEach(function(value) {
        var img = new Image();
        img.src = value;
        if (img.complete) {
            option.imgReady();
            len--;
            if (len <= 0) {
                option.allReady();
            }
        } else {
            img.onload = function() {
                option.imgReady();
                len--;
                if (len <= 0) {
                    option.allReady();
                }
            }
        }
    })
}

export default preLoadImg;
