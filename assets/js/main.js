/*
var interval = setInterval(function() {
    if(document.readyState === 'complete') {
        clearInterval(interval);
        alert("It is loaded!");
    }    
}, 100); 



*/



document.addEventListener('DOMContentLoaded', function() {
   
   if (location.pathname === "/" || location.pathname === "/work/" || location.pathname === "/contact/") {
        document.getElementsByTagName("body")[0].setAttribute("class", "scrollSnap");     
    } else {
        document.getElementsByTagName("body")[0].setAttribute("class", "noScrollSnap"); 
    }
    if (location.pathname === "/") {
        if (document.body.scrollTop === 0) {
            document.getElementById("opener").style.display = "none";
        } else {
            document.getElementById("opener").style.display = "flex";
        }
    }








var isHeaderOpen = false,
    isReadOpen = false,
    winH = window.innerHeight,
    bodyH = document.getElementById("body").scrollHeight,
    endPage = bodyH - 2*winH ,
    ii = document.getElementById("scroller"),
    scrollers = ii.getElementsByTagName('polyline'),
    candyOne = document.getElementById("candyOne"),
    clipper = document.getElementById("svgPath"),
    opener = document.getElementById("opener"),
    btnPath = document.getElementById("btnPath"),
    candyTl = new TimelineMax();
    
document.getElementById("candyOne").addEventListener("load", createTimelines(), false);

function createTimelines() {
  candyTl
    .set(candyOne, {x:10,y:50})
    .set(candyOne, {transformOrigin:"40% 50%"})
    .set(candyOne, {scale:2.5})
    .set(clipper, {x:10,y:-50})
    .set(clipper, {transformOrigin:"40% 50%"})
    .set(clipper, {scale:2.5})
    .staggerTo(scrollers, 1, {opacity: 0, ease: Power0.easeOut, repeat: -1, yoyo: true }, 0.3)
    .to(candyOne, 10, {rotation: 360, ease: Bounce.easeOut, repeat: -1, yoyo: true }, 0)
    .to(clipper, 10, {rotation: 360, ease: Bounce.easeOut, repeat: -1, yoyo: true }, 0)
    .to(opener, 1, {x: 5, ease: Bounce.easeOut, repeat: -1, yoyo: true }, 0)
    
    ;
    
    candyTl.play();

}

function readmore() {
    if(isReadOpen) {
        TweenMax.to(clipper, 0.3, {scale:2.5}, 0);
        TweenMax.to(candyOne, 0.3, {scale:2.5}, 0);
        TweenMax.to(opener, 0.5, {bottom:"100%", rotation: 0 }, "+=0.3");
        TweenMax.to(btnPath, 0.5, {stroke:"#ffffff"}, "+=0.3");
        isReadOpen = false;
    } else {
        TweenMax.to(clipper, 0.3, {scale:6}, 0);
        TweenMax.to(candyOne, 0.3, {scale:6}, 0);
        TweenMax.to(opener, 0.5, {bottom:"10%", rotation: -90 }, "+=0.3");
        TweenMax.to(btnPath, 0.5, {stroke:"#000000"}, "+=0.3");
        isReadOpen = true;     
    }
}

window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
    
    if (location.pathname === "/") {
        if (winH > currentScrollPos) {
            document.getElementById("opener").style.display = "none";
          } else {
           document.getElementById("opener").style.display = "flex";
          }
    } else {
        document.getElementById("opener").style.display = "flex";
    }    
    
  
  if (currentScrollPos > endPage) {
    TweenMax.to(scroller, 0.5, { rotation: 180 }, "+=0.3");
    //TweenMax.to(clipper, 1, {x:10,y:300}, 0);
    //TweenMax.to(candyOne, 1, {x:10,y:400}, 0);
        
  } else {
    TweenMax.to(scroller, 0.5, { rotation: 0 }, "+=0.3");
    //TweenMax.to(clipper, 1, {x:10,y:-50}, 0);
    //TweenMax.to(candyOne, 1, {x:10,y:50}, 0);
        
  }
};

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//createTimelines();

}, false);