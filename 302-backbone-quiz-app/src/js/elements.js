// 缓存常用选择器
const Elements = (() => {
    let $container    = $('.container');
    let $titleImg     = $container.find('.title-img');
    let $question     = $container.find('.question');
    let $selectAns    = $container.find('.seclect-answer');
    let $cardTemplate = $('#card_template');

    return {
        $container,
        $titleImg,
        $question,
        $selectAns,
        $cardTemplate
    }
})();

export default Elements;
