$(document).ready(function () {
    var styleSheets = document.styleSheets;
    console.log('styleSheets', styleSheets);

    let width = $('#width').val();
    let height = $('#height').val();

    $('#range').change(function () {
        $('.div1').css({
            'border-radius': $(this).val() + 'px'
        });
    });

    $('.ctrl-change-num').change(function () {
        let dProperty = $(this).attr('d-property');
        let dValue = $(this).attr('d-value');
        let thisVal = $(this).val();
        $('.div1').css(dProperty, thisVal + 'px');
    });

    $('.dy-range').change(function () {
        let dProperty = $(this).attr('d-property');
        let thisVal = $(this).val();
        $('.div1').css(dProperty, thisVal + 'px');
        let min = thisVal - 50;
        let max = thisVal + 50;
        $(this).attr('min', min);
        $(this).attr('max', max);
    });

    // function getCssRulesById(elementId) {
    //     var rules = [];
    //     var styleSheets = document.styleSheets;

    //     for (var i = 0; i < styleSheets.length; i++) {
    //         var styleSheet = styleSheets[i];

    //         if (styleSheet.cssRules) {
    //             var cssRules = styleSheet.cssRules;

    //             for (var j = 0; j < cssRules.length; j++) {
    //                 var cssRule = cssRules[j];

    //                 if (cssRule.type === CSSRule.STYLE_RULE && cssRule.selectorText === '#' + elementId) {
    //                     rules.push(cssRule);
    //                 }
    //             }
    //         }
    //     }

    //     return rules;
    // }

    // let a = getCssRulesById('div1');
    // console.log(a);

});