// JavaScript Document
var sections = $('.section'),
    nav = $('.navbar-fixed-top,footer'),
    nav_height = nav.outerHeight();
console.log("XXX");
$(document).on('ready', function () {
    "use strict";

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });


    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    // Owl
    $('#team-carousel').owlCarousel({
        center: false,
        items: 3,
        autoWidth: true,
        loop: true,
        dots: false,
        margin: 20,
        responsive: {
            900: {
                items: 3,
                loop: true,
                margin: 20,

            }
        }
    });
    var owl = $('#team-carousel');
    owl.owlCarousel();
    // Go to the next item
    $('.customNextBtn').on('click', function () {
            owl.trigger('next.owl.carousel');
        })
        // Go to the previous item
    $('.customPrevBtn').on('click', function () {
        owl.trigger('prev.owl.carousel', [500]);
    })

    $('.owl-carousel.blog-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: false,
        autoplaySpeed: 500,
        autoplay: true,
        navText: ['<i class="ion-android-arrow-back"></i>', '<i class="ion-android-arrow-forward"></i>']
    })

    $('#testimonials-work').owlCarousel({
        items: 1,
        margin: 10,
        autoHeight: true,
        autoplay: true,
        loop: true
    });

    // flatpickr
    $("#time").flatpickr();
    $("#Time").flatpickr();


    // swiper slider
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,

        spaceBetween: 0,
        loop: true,
        autoplay: 7000,
        autoplayDisableOnInteraction: false,
        onSlideChangeStart: function (swiper) {
            setTimeout(function () {
                $('.slider-caption h2').removeClass('animated fadeInUp');
                $('.slider-caption p').removeClass('animated fadeInUp');
                $('.slider-caption .slider-btn-group').removeClass('animated fadeInUp');

                $('.swiper-slide-active').find('.slider-caption h2').addClass('animated fadeInUp');
                $('.swiper-slide-active').find('.slider-caption p').addClass('animated fadeInUp');
                $('.swiper-slide-active').find('.slider-caption .slider-btn-group').addClass('animated fadeInUp');
            }, 500);
        },

    });

    // isotope 
    // initialize Portfolio isotope
    var $container = $('.portfolio_container');
    $container.isotope({
        filter: '*',
    });

    $('.portfolio_filter a').on('click', function () {
        $('.portfolio_filter .active').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 500,
                animationEngine: "jquery"
            }
        });
        return false;
    });

    // Inline popups
    $('.inline-popups').magnificPopup({
        delegate: 'a',
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });

    // video popups
    $('#vimeo').magnificPopup({
        items: {
            src: 'https://vimeo.com/148198462'
        },
        type: 'iframe',

    });

    // Contact Form 	

    // validate contact form
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                time: {
                    required: true
                },
                type: {
                    required: false
                },
                phone: {
                    required: false
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                time: {
                    required: "This field is required"
                },
                type: {
                    required: "This field is required"
                },
                phone: {
                    required: "This field is required"
                },
                email: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process.php",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 0.15, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        $('#contact').fadeTo("slow", 0.15, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });
    });

});


$(window).on('load', function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });

});


$(window).on('scroll', function () {
    "use strict";
    var cur_pos = $(this).scrollTop();
    sections.each(function () {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            sections.removeClass('active');

            $(this).addClass('active');
            nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        }
    });

    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }

});