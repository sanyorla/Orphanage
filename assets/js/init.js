(function($) {
    
    "use strict";
    var win = $(window);
    $('.section-slider--carousel').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: false,
        autoplayTimeout: 6000,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    $('.gallery-item').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom', 
        gallery:{
            enabled:true
        },
        zoom: {
            enabled: true, 
            duration: 300,
            easing: 'ease-in-out'
        }
    });

    $('#circle').circleProgress({
        value: 0.75,
        size: 80,
        fill: {
          gradient: ["red", "orange"]
        }
      });


    var scrollOnce = false;

    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).on('resize scroll', function() {
        if ($('.section-projects__block').isInViewport() && scrollOnce == false) {
            $('#circle').circleProgress({
                value: 0.75,
                size: 170,
                emptyFill: "#f7941d",
                fill: "#ffffff",
                thickness: "10"
            }); 
            $('#circle2').circleProgress({
                value: 0.55,
                size: 170,
                emptyFill: "#f7941d",
                fill: "#ffffff",
                thickness: "10"
            });  
            $('#circle3').circleProgress({
                value: 0.45,
                size: 170,
                emptyFill: "#f7941d",
                fill: "#ffffff",
                thickness: "10"
            }); 
            scrollOnce = true;
        }
    });
    

    /* 1 contactForm */
    var $contactForm = $('#subscribeform1');
    $(".result-error").hide();
    $(".result-success").hide();
    /* adding rules for validation fields */
    $contactForm.validate({
        errorClass: 'ssection-becomepartner__form-field-error',
        rules: {
            form_name: {
                required: true
            },
            form_email: {
                required: true,
                email: true
            }
        },
        /* adding error message text for validation fields */
        messages: {
            form_name: {
                required: "This field is required"
            },
            form_email: {
                required: "This field is required"
            }
        },
        /* ajax request properties */
        submitHandler: function() {
            /* get values from form fields */
            var form_data = {
                'Name': $('#form_name').val(),
                'Email': $('#form_email').val()
            }
            for (var key in form_data) {
                var value = form_data[key];
                form_data[value.name] = value.value;
            }
            $.ajax({
                type: 'POST',
                url: '../../sendmail.php',
                data: form_data,
                dataType: "json",
            }).done(function(data) {
                if (data.type == "error") {
                    $(".result-error").show();
                    $(".result-error").html(data.text);
                }
                if (data.type == "done") {
                    $(".result-success").show();
                    $(".result-success").html(data.text);
                    $(".result-error").hide();
                }
            });
            $('.result-error').hide();
        }
    });
    // /* 2 contactForm */
    var $contactForm2 = $('#subscribeform2');
    $(".result-error2").hide();
    $(".result-success2").hide();
    /* adding rules for validation fields */
    $contactForm2.validate({
        errorClass: 'section-consultation__form-field-error',
        rules: {
            form_name2: {
                required: true
            },
            form_email2: {
                required: true,
                email: true
            },
            form_location2: {
                required: true
            }
        },
        /* adding error message text for validation fields */
        messages: {
            form_name2: {
                required: "This field is required"
            },
            form_email2: {
                required: "This field is required",
                email: "Please enter a valid email"
            },
            form_location2: {
                required: "This field is required"
            }
        },
        /* ajax request properties */
        submitHandler: function() {
            /* get values from form fields */
            var form_data = {
                'Name': $('#form_name2').val(),
                'Email': $('#form_email2').val(),
                'Location': $('#form_location2').val(),
                'Message': $('#form_message2').val()
                
            }
            for (var key in form_data) {
                var value = form_data[key];
                form_data[value.name] = value.value;
            }
            $.ajax({
                type: 'POST',
                url: '../../sendmail.php',
                data: form_data,
                dataType: "json",
            }).done(function(data) {
                if (data.type == "error") {
                    $(".result-error2").show();
                    $(".result-error2").html(data.text);
                }
                if (data.type == "done") {
                    $(".result-success2").show();
                    $(".result-success2").html(data.text);
                    $(".result-error2").hide();
                }
            });
            $('.result-error2').hide();
        }
    });
    
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('[class="anchor"]')
        .not('[href*="#v-tabs-item"]') // for bootstrap tabs
        .not('[href*="#collapse"]') // for bootstrap accordion
        .on('click' , function(event) {
            if ( location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname ) {
                var trigger = this;
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1200, function() {
                        window.location.href = trigger.href;
                    });
                }
            }
        });
    $('.to-top').on('click', function(e) {
        $('html,body').animate({
            scrollTop: 0
        }, 1100);
        e.preventDefault();
    });

    $('.section-video__btn[data-button=popup_video]').click(function(e) {
        e.preventDefault();
        $('.section_popup[data-name=popup_show]').fadeIn();
        $('body').css('overflow', 'hidden');
    });
    $('.section_popup__close').click(function() {
        $('body').css('overflow', 'visible');
        $('.section_popup[data-name=popup_show]').fadeOut();
    });
    /* MENU DROPDOWN */
    $('.navbar-nav .dropdown  > a').on('click hover', function(e) {
        if ((win.width() <= 1039) && (win.width() >= 768)) {
            e.preventDefault();
            window.location = this.href;
        }
    });
    $('.navbar-nav .dropdown  > a').on('click hover', function(e) {
        if ((win.width() > 1039)) {
            e.preventDefault();
            window.location = this.href;
        }
    });
    $('.navbar-nav .dropdown  > .dropdown-toggle').on('click hover', function(e) {
        if ((win.width() <= 767)) {
            e.preventDefault();
            $(this).parent().children('ul').toggleClass('show');
            if (!$(this).parent().children('ul').hasClass('show')) {
                window.location = this.href;
            }
        }
    });
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
     var win = $(window);

     win.scroll(function() {
        if (win.scrollTop() > 200) {
            $('.to-top').addClass('to-top-visible');
        } else {
            $('.to-top').removeClass('to-top-visible');
        }
    });
})(jQuery);