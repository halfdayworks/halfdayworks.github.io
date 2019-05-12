






























$( document ).ready(function() {

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
  if (isHome) {
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
