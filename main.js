(function () {
  var po = document.createElement('script');
  po.type = 'text/javascript';
  po.async = true;
  po.src = 'https://apis.google.com/js/plusone.js?onload=onLoadCallback';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(po, s);
})();

$(document).ready(function () {

  //single page application href setting
  $(function () {
    $('a[href*=#]:not([href=#])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }

    });
  });

  $('.tlt').textillate({
    // enable looping
    loop: true,

    // in animation settings
    in : {
      // set the effect name
      effect: 'fadeInLeftBig'
    },

    // out animation settings.
    out: {
      // set the effect name
      effect: 'fadeOutLeftBig'
    }
  });


  //Hamburger menu toggle
  $(".navbar-nav li a").click(function (event) {
    // check if window is small enough so dropdown is created
    var toggle = $(".navbar-toggle").is(":visible");
    if (toggle) {
      $(".navbar-collapse").collapse('hide');
    }
  });

  $('.container.inner').css('min-height', (window.screen.height - 120));

});