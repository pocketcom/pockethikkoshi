(function ($) {
  'use strict';

  // PC/SP判定
  // スクロールイベント
  // リサイズイベント
  // スムーズスクロール


  var deviceFlag = 0; // 0 : PC ,  1 : SP
  deviceFlag = $('body').css('position') === 'relative' ? 1 : 0;
  var befDeviceFlag = deviceFlag;


  // pagetop
  var $pageTop = $('#pagetop');
  $pageTop.hide();

  // スクロールイベント
  $(window).on('scroll touchmove', function() {

    // スクロール中か判定
    if (timer !== false) {
      clearTimeout(timer);
    }

    // 200ms後にフェードイン
    timer = setTimeout(function() {
      if ($(this).scrollTop() > 100) {
        $('#pagetop').fadeIn('normal');
      } else {
        $pageTop.fadeOut();
      }
    }, 200);

    var scrollHeight = $(document).height(); 
    var scrollPosition = $(window).height() + $(window).scrollTop(); 
    var footHeight = parseInt($('#footer').innerHeight() + $('#copyright').innerHeight() - 60);

    if ( deviceFlag === 0 ) { // → PC
      if ( scrollHeight - scrollPosition  <= footHeight ) {
      // 現在の下から位置が、フッターの高さの位置にはいったら
        $pageTop.css({
          'position':'absolute',
          'bottom': footHeight
        });
      }
    } else { // → SP
      $pageTop.css({
        'position':'fixed',
        'bottom': '20px'
      });
    }

  });


  // リサイズイベント
  var timer = false;
  $(window).on('resize', function() {
    deviceFlag = $('body').css('position') === 'relative' ? 1 : 0;

    // → PC
    if ( befDeviceFlag !== 0 && deviceFlag === 0 ) {
    }
    // → SP
    if ( befDeviceFlag !== 1 && deviceFlag === 1 ) {
    }
    
    befDeviceFlag = deviceFlag;
  });


  // スムーズスクロール
  // #で始まるアンカーをクリックした場合にスムーススクロール
  $('a[href^="#"]').on('click', function() {
    var speed = 500;
    // アンカーの値取得
    var href= $(this).attr('href');
    // 移動先を取得
    var target = $(href == '#' || href == '' ? 'html' : href);
    // 移動先を数値で取得
    var position = target.offset().top;
    
    // スムーススクロール
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
  
  

})(jQuery);