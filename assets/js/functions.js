
$( document ).ready(function() {

  var isMobile = false; //initiate as false
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
      isMobile = true;
  }
  if ( isMobile ) {
    var viewportHeight = $('.l-viewport').outerHeight();
    $('.l-viewport').css({ height: window.innerHeight });
  }
  
  var canScroll = true,
      scrollController = null,
      
      isHome = Boolean(window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.href.indexOf("#navigated") > -1),
      isServices = Boolean(window.location.pathname === '/services/' || window.location.href.indexOf("#serviceId") > -1);
  
  

  if(window.location.href.indexOf("#navigated") > -1) {
    var url = window.location.href;
        str = url.substring(url.lastIndexOf('#')+1, );
        curPos =str.substring(10,11), 
        nextPos =str.substring(12,13),
        lastItem =str.substring(14,15);
    updateNavs(nextPos);
    updateContent(curPos, nextPos, lastItem);
  }
  
  if(window.location.href.indexOf("#serviceId") > -1) {
    var url = window.location.href;
        str = url.substring(url.lastIndexOf('#')+1, );
        curPos =str.substring(10,11), 
        nextPos =str.substring(12,13),
        lastItem =str.substring(14,15);
    updateNavs(nextPos);
    updateContent(curPos, nextPos, lastItem);
  }



  if (isHome || isServices) { 
    $('.l-viewport').css('height', '100vh');
    $(this).on('mousewheel DOMMouseScroll', function(e){
      if (!($('.outer-nav').hasClass('is-vis'))) {
        e.preventDefault();
        var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;
        if (delta > 50 && canScroll) {
          canScroll = false;
          clearTimeout(scrollController);
          scrollController = setTimeout(function(){
            canScroll = true;
          }, 800);
          updateHelper(1);
        }
        else if (delta < -50 && canScroll) {
          canScroll = false;
          clearTimeout(scrollController);
          scrollController = setTimeout(function(){
            canScroll = true;
          }, 800);
          updateHelper(-1);
        }
      }
    });

  } else {
    $('.l-viewport').css({'height':'auto', 'overflow-y': 'scroll', 'touch-action':'pan-y !important'});
  }


  $('.side-nav li, .outer-nav li').click(function(){

    if (!($(this).hasClass('is-active'))) {

      var $this = $(this),
          curActive = $this.parent().find('.is-active'),
          curPos = $this.parent().children().index(curActive),
          nextPos = $this.parent().children().index($this),
          lastItem = $(this).parent().children().length - 1;

      if ( window.location.pathname == '/' || window.location.pathname == '/index.html'){ 
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      } else {
        document.location.href="/#navigated/" + curPos + "/" + nextPos + "/" + lastItem;
      }

    }

  });


  $('.cta').click(function(){

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = lastItem;

   
    if ( window.location.pathname == '/' || window.location.pathname == '/index.html'){ 
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    } else {
      document.location.href="/#navigated/" + curPos + "/" + nextPos + "/" + lastItem;
    }

  });



  var targetElement = document.getElementById('viewport');  
  if (isHome || isServices) {
  // swipe support for touch devices
    var mc = new Hammer(targetElement);
   
    mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  
    mc.on('swipeup swipedown', function(e) {
      
      updateHelper(e);
    
    });
  }

  
  $(document).keyup(function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }

  });

  // determine scroll, swipe, and arrow key direction
  function updateHelper(param) {

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
      if (curPos !== lastItem) {
        nextPos = curPos + 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
    else if (param.type === "swipedown" || param.keyCode === 38 || param < 0){
      if (curPos !== 0){
        nextPos = curPos - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        nextPos = lastItem;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }

  }

  // sync side and outer navigations
  function updateNavs(nextPos) {
    //console.log("in updateNavs, nextPos: " + nextPos);
    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');

  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {
    
    
    if(isHome) {
      document.location.hash="navigated/" + curPos + "/" + nextPos + "/" + lastItem;  
    }
    
    

    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }

  }

  function outerNav() {

    $('.header--nav-toggle').click(function(){

      $('.perspective').addClass('perspective--modalview');
      setTimeout(function(){
        $('.perspective').addClass('effect-rotate-left--animate');
      }, 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

    });

    $('.outer-nav--return, .outer-nav li').click(function(){

      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(function(){
        $('.perspective').removeClass('perspective--modalview');
      }, 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

    });

  }

  function workSlider() {

    $('.slider--prev, .slider--next').click(function() {

      var $this = $(this),
          curLeft = $('.slider').find('.slider--item-left'),
          curLeftPos = $('.slider').children().index(curLeft),
          curCenter = $('.slider').find('.slider--item-center'),
          curCenterPos = $('.slider').children().index(curCenter),
          curRight = $('.slider').find('.slider--item-right'),
          curRightPos = $('.slider').children().index(curRight),
          totalWorks = $('.slider').children().length,
          $left = $('.slider--item-left'),
          $center = $('.slider--item-center'),
          $right = $('.slider--item-right'),
          $item = $('.slider--item');

      $('.slider').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('slider--next')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('slider--item-left').next().addClass('slider--item-left');
          $center.removeClass('slider--item-center').next().addClass('slider--item-center');
          $right.removeClass('slider--item-right').next().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('slider--item-left').first().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $item.removeClass('slider--item-center').first().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $item.removeClass('slider--item-right').first().addClass('slider--item-right');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
          $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
          $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('slider--item-left').last().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $item.removeClass('slider--item-center').last().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $item.removeClass('slider--item-right').last().addClass('slider--item-right');
          }
        }
      }

    }, 400);

    $('.slider').animate({ opacity : 1 }, 400);

    });

  }

  function transitionLabels() {

    $('.work-request--information input').focusout(function(){

      var textVal = $(this).val();

      if (textVal === "") {
        $(this).removeClass('has-value');
      }
      else {
        $(this).addClass('has-value');
      }

      // correct mobile device window position
      window.scrollTo(0, 0);

    });

  }

  function servSlider() {

    $('.servslider--prev, .servslider--next').click(function() {

      var $this = $(this),
          curLeft = $('.servslider').find('.servslider--item-left'),
          curLeftPos = $('.servslider').children().index(curLeft),
          curCenter = $('.servslider').find('.servslider--item-center'),
          curCenterPos = $('.servslider').children().index(curCenter),
          curRight = $('.servslider').find('.servslider--item-right'),
          curRightPos = $('.servslider').children().index(curRight),
          totalServs = $('.servslider').children().length,
          $left = $('.servslider--item-left'),
          $center = $('.servslider--item-center'),
          $right = $('.servslider--item-right'),
          $item = $('.servslider--item');

      $('.servslider').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('servslider--next')) {
        if (curLeftPos < totalServs - 1 && curCenterPos < totalServs - 1 && curRightPos < totalServs - 1) {
          $left.removeClass('servslider--item-left').next().addClass('servslider--item-left');
          $center.removeClass('servslider--item-center').next().addClass('servslider--item-center');
          $right.removeClass('servslider--item-right').next().addClass('servslider--item-right');
        }
        else {
          if (curLeftPos === totalServs - 1) {
            $item.removeClass('servslider--item-left').first().addClass('servslider--item-left');
            $center.removeClass('servslider--item-center').next().addClass('servslider--item-center');
            $right.removeClass('servslider--item-right').next().addClass('servslider--item-right');
          }
          else if (curCenterPos === totalServs - 1) {
            $left.removeClass('servslider--item-left').next().addClass('servslider--item-left');
            $item.removeClass('servslider--item-center').first().addClass('servslider--item-center');
            $right.removeClass('servslider--item-right').next().addClass('servslider--item-right');
          }
          else {
            $left.removeClass('servslider--item-left').next().addClass('servslider--item-left');
            $center.removeClass('servslider--item-center').next().addClass('servslider--item-center');
            $item.removeClass('servslider--item-right').first().addClass('servslider--item-right');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('servslider--item-left').prev().addClass('servslider--item-left');
          $center.removeClass('servslider--item-center').prev().addClass('servslider--item-center');
          $right.removeClass('servslider--item-right').prev().addClass('servslider--item-right');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('servslider--item-left').last().addClass('servslider--item-left');
            $center.removeClass('servslider--item-center').prev().addClass('servslider--item-center');
            $right.removeClass('servslider--item-right').prev().addClass('servslider--item-right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('servslider--item-left').prev().addClass('servslider--item-left');
            $item.removeClass('servslider--item-center').last().addClass('servslider--item-center');
            $right.removeClass('servslider--item-right').prev().addClass('servslider--item-right');
          }
          else {
            $left.removeClass('servslider--item-left').prev().addClass('servslider--item-left');
            $center.removeClass('servslider--item-center').prev().addClass('servslider--item-center');
            $item.removeClass('servslider--item-right').last().addClass('servslider--item-right');
          }
        }
      }

    }, 400);

    $('.servslider').animate({ opacity : 1 }, 400);

    });

  }

  function servtransitionLabels() {

    $('.serv-request--information input').focusout(function(){

      var textVal = $(this).val();

      if (textVal === "") {
        $(this).removeClass('has-value');
      }
      else {
        $(this).addClass('has-value');
      }

      // correct mobile device window position
      window.scrollTo(0, 0);

    });

  }  

  outerNav();
  workSlider();
  transitionLabels();
  servSlider();
  servtransitionLabels();






});


  

document.body.onload = function(){
  setTimeout(function() {
    var preloader = document.getElementById('loader');
    if(!preloader.classList.contains('done'))
    {
      preloader.classList.add('done')
    }
  }, 1200)
}
