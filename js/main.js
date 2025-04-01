jQuery(document).ready(function ($) {

  // Accesibilidad del teclado para el menú móvil
  $('#mobile-nav-toggle').on('click keydown', function (e) {
    if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $('body').toggleClass('mobile-nav-active');
      $(this).find('i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();

      // Gestionar el atributo aria-expanded
      var isExpanded = $(this).attr('aria-expanded') === 'true';
      $(this).attr('aria-expanded', !isExpanded);
    }
  });

  // Mejorar la navegación con teclado en submenús
  $('.menu-has-children > a').on('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).parent().toggleClass('sfHover');
      $(this).attr('aria-expanded', function (i, attr) {
        return attr === 'true' ? 'false' : 'true';
      });
    }
  });

  // Cerrar menú móvil al hacer click fuera
  $(document).on('click', function (e) {
    var container = $("#mobile-nav, #mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('#mobile-nav-toggle').find('i').toggleClass('fa-times fa-bars');
        $('#mobile-body-overly').fadeOut();
      }
    }
  });

  // Navegación suave mejorada
  $('a[href*="#"]:not([href="#"])').on('click keydown', function (e) {
    if (e.type === 'click' || e.key === 'Enter') {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        e.preventDefault();
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

        if (target.length) {
          var top_space = 0;

          if ($('#header').length) {
            top_space = $('#header').outerHeight();

            if (!$('#header').hasClass('header-fixed')) {
              top_space = top_space - 20;
            }
          }

          $('html, body').animate({
            scrollTop: target.offset().top - top_space
          }, 1500, 'easeInOutExpo', function () {
            target.attr('tabindex', '-1').focus();
          });

          if ($(this).parents('.nav-menu').length) {
            $('.nav-menu .menu-active').removeClass('menu-active');
            $(this).closest('li').addClass('menu-active');
          }

          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeOut();
          }

          return false;
        }
      }
    }
  });

  // Header fijo y botón "volver arriba"
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });

  $('.back-to-top').on('click keydown', function (e) {
    if (e.type === 'click' || e.key === 'Enter') {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 1500, 'easeInOutExpo');
      return false;
    }
  });

  // Inicializar WOW.js con opciones accesibles
  new WOW({
    callback: function (box) {
      $(box).attr('aria-hidden', 'false');
    }
  }).init();

  // Inicializar Superfish con opciones accesibles
  $('.nav-menu').superfish({
    animation: { opacity: 'show' },
    speed: 400,
    cssArrows: false,
    onShow: function (ul) {
      $(ul).attr('aria-hidden', 'false');
    },
    onHide: function (ul) {
      $(ul).attr('aria-hidden', 'true');
    }
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav' });
    $mobile_nav.find('> ul').attr({ 'class': '', 'id': '' });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // custom code (Removed z-index hack and duplicate smooth scroll)

});
