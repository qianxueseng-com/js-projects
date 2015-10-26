/**
 * Created by xuliang on 15/10/25.
 */
(function ($) {
    var $geneBtn = $("#generate-btn"),
        $gridMain = $("#grid-main");
    $geneBtn.on('click', function () {
        $gridMain.empty();//清除原有内容
        var i, j
        len = $(":text").val();//获取基数
        /*生成六行六列*/
        for (i = 0; i < len; i++) {
            var $gridItem = "";
            for (j = 0; j < len; j++) {
                var num = len * i + j + 1;
                $gridItem = $gridItem + '<li>' + num + '</li>';
            }
            var $gridList = '<ul class="grid-list">' + $gridItem + '</ul>';
            $gridMain.append($gridList);
        }
        /*设置字体大小*/
        var fontSize = ($(".grid-list li").width()) * 0.2;
        $gridMain.css("fontSize", fontSize);
    });
    /*为每一个方格添加事件代理*/
    $gridMain.on('click', 'li', function () {
        console.log($(this).text());
    });
})(jQuery);

