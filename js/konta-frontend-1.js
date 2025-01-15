;(function($) {
    'use strict';
    $(window).on( 'elementor/frontend/init', function() {


        
        
        var GlobalSlider = function() {

            $('.th-carousel').each(function () {
                var thSlide = $(this);
            
                // Collect Data 
                function d(data) {
                  return thSlide.data(data);
                }
            
                // Custom Arrow Button
                var prevButton = '<button type="button" class="slick-prev"><i class="' + d('prev-arrow') + '"></i></button>',
                  nextButton = '<button type="button" class="slick-next"><i class="' + d('next-arrow') + '"></i></button>';
            
                // Function For Custom Arrow Btn 
                $('[data-slick-next]').each(function () {
                  $(this).on('click', function (e) {
                    e.preventDefault()
                    $($(this).data('slick-next')).slick('slickNext');
                  })
                })
            
                $('[data-slick-prev]').each(function () {
                  $(this).on('click', function (e) {
                    e.preventDefault()
                    $($(this).data('slick-prev')).slick('slickPrev');
                  })
                })
            
                // Check for arrow wrapper
                if (d('arrows') == true) {
                  if (!thSlide.closest('.arrow-wrap').length) {
                    thSlide.closest('.container').parent().addClass('arrow-wrap')
                  }
                }
                if ($("[data-bg-src]").length > 0) {
                    $("[data-bg-src]").each(function () {
                        var src = $(this).attr("data-bg-src");
                        $(this).css("background-image", "url(" + src + ")");
                        $(this).removeAttr("data-bg-src").addClass("background-image");
                    });
                }

            
            
                thSlide.not('.slick-initialized').slick({
                  dots: (d('dots') ? true : false),
                  fade: (d('fade') ? true : false),
                  arrows: (d('arrows') ? true : false),
                  speed: (d('speed') ? d('speed') : 1000),
                  asNavFor: (d('asnavfor') ? d('asnavfor') : false),
                  autoplay: ((d('autoplay') == false) ? false : true),
                  infinite: ((d('infinite') == false) ? false : true),
                  slidesToShow: (d('slide-show') ? d('slide-show') : 1),
                  adaptiveHeight: (d('adaptive-height') ? true : false),
                  centerMode: (d('center-mode') ? true : false),
                  autoplaySpeed: (d('autoplay-speed') ? d('autoplay-speed') : 8000),
                  centerPadding: (d('center-padding') ? d('center-padding') : '0'),
                  focusOnSelect: ((d('focuson-select') == false) ? false : true),
                  pauseOnFocus: (d('pauseon-focus') ? true : false),
                  pauseOnHover: (d('pauseon-hover') ? true : false),
                  variableWidth: (d('variable-width') ? true : false),
                  vertical: (d('vertical') ? true : false),
                  verticalSwiping: (d('vertical') ? true : false),
                  prevArrow: (d('prev-arrow') ? prevButton : '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>'),
                  nextArrow: (d('next-arrow') ? nextButton : '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>'),
                  rtl: ($('html').attr('dir') == 'rtl') ? true : false,
                  responsive: [{
                      breakpoint: 1600,
                      settings: {
                        arrows: (d('xl-arrows') ? true : false),
                        dots: (d('xl-dots') ? true : false),
                        slidesToShow: (d('xl-slide-show') ? d('xl-slide-show') : d('slide-show')),
                        centerMode: (d('xl-center-mode') ? true : false),
                        centerPadding: 0
                      }
                    }, {
                      breakpoint: 1400,
                      settings: {
                        arrows: (d('ml-arrows') ? true : false),
                        dots: (d('ml-dots') ? true : false),
                        slidesToShow: (d('ml-slide-show') ? d('ml-slide-show') : d('slide-show')),
                        centerMode: (d('ml-center-mode') ? true : false),
                        centerPadding: 0
                      }
                    }, {
                      breakpoint: 1200,
                      settings: {
                        arrows: (d('lg-arrows') ? true : false),
                        dots: (d('lg-dots') ? true : false),
                        slidesToShow: (d('lg-slide-show') ? d('lg-slide-show') : d('slide-show')),
                        centerMode: (d('lg-center-mode') ? d('lg-center-mode') : false),
                        centerPadding: 0
                      }
                    }, {
                      breakpoint: 992,
                      settings: {
                        arrows: (d('md-arrows') ? true : false),
                        dots: (d('md-dots') ? true : false),
                        slidesToShow: (d('md-slide-show') ? d('md-slide-show') : 1),
                        centerMode: (d('md-center-mode') ? d('md-center-mode') : false),
                        centerPadding: 0
                      }
                    }, {
                      breakpoint: 768,
                      settings: {
                        arrows: (d('sm-arrows') ? true : false),
                        dots: (d('sm-dots') ? true : false),
                        slidesToShow: (d('sm-slide-show') ? d('sm-slide-show') : 1),
                        centerMode: (d('sm-center-mode') ? d('sm-center-mode') : false),
                        centerPadding: 0
                      }
                    }, {
                      breakpoint: 576,
                      settings: {
                        arrows: (d('xs-arrows') ? true : false),
                        dots: (d('xs-dots') ? true : false),
                        slidesToShow: (d('xs-slide-show') ? d('xs-slide-show') : 1),
                        centerMode: (d('xs-center-mode') ? d('xs-center-mode') : false),
                        centerPadding: 0
                      }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                  ]
                });
            
            });


          

            $.fn.shapeMockup = function () {
                var $shape = $(this);
                $shape.each(function() {
                  var $currentShape = $(this),
                  shapeTop = $currentShape.data('top'),
                  shapeRight = $currentShape.data('right'),
                  shapeBottom = $currentShape.data('bottom'),
                  shapeLeft = $currentShape.data('left');
                  $currentShape.css({
                    top: shapeTop,
                    right: shapeRight,
                    bottom: shapeBottom,
                    left: shapeLeft,
                  }).removeAttr('data-top')
                  .removeAttr('data-right')
                  .removeAttr('data-bottom')
                  .removeAttr('data-left')
                  // .closest('.elementor-widget , .elementor-widget-wrap, .elementor-widget-container').css('position', 'static')
                  .closest('section').addClass('shape-mockup-wrap');
                });
            };

            if ($('.shape-mockup')) {
                $('.shape-mockup').shapeMockup();
            }
        
            /*----------- 08. Custom Animaiton For Slider ----------*/
            $('[data-ani-duration]').each(function () {
                var durationTime = $(this).data('ani-duration');
                $(this).css('animation-duration', durationTime);
            });
            
            $('[data-ani-delay]').each(function () {
                var delayTime = $(this).data('ani-delay');
                $(this).css('animation-delay', delayTime);
            });
            
            $('[data-ani]').each(function () {
                var animaionName = $(this).data('ani');
                $(this).addClass(animaionName);
                $('.slick-current [data-ani]').addClass('th-animated');
            });
            
            $('.th-carousel').on('afterChange', function (event, slick, currentSlide, nextSlide) {
                $(slick.$slides).find('[data-ani]').removeClass('th-animated');
                $(slick.$slides[currentSlide]).find('[data-ani]').addClass('th-animated');
            });


            /*---------- 17. AS Tab ----------*/
            $.fn.thTab = function (options) {
                var opt = $.extend(
                    {
                        sliderTab: false,
                        tabButton: "button",
                    },
                    options
                );
        
                $(this).each(function () {
                    var $menu = $(this);
                    var $button = $menu.find(opt.tabButton);
        
                    // Append indicator
                    $menu.append('<span class="indicator"></span>');
                    var $line = $menu.find(".indicator");
        
                    // On Click Button Class Remove and indecator postion set
                    $button.on("click", function (e) {
                        e.preventDefault();
                        var cBtn = $(this);
                        cBtn.addClass("active").siblings().removeClass("active");
                        if (opt.sliderTab) {
                            $(slider).slick("slickGoTo", cBtn.data("slide-go-to"));
                        } else {
                            linePos();
                        }
                    });
        
                    // Work With slider
                    if (opt.sliderTab) {
                        var slider = $menu.data("themenavfor"); // select slider
        
                        // Select All button and set attribute
                        var i = 0;
                        $button.each(function () {
                            var slideBtn = $(this);
                            slideBtn.attr("data-slide-go-to", i);
                            i++;
        
                            // Active Slide On load > Actived Button
                            if (slideBtn.hasClass("active")) {
                                $(slider).slick(
                                    "slickGoTo",
                                    slideBtn.data("slide-go-to")
                                );
                            }
        
                            // Change Indicator On slide Change
                            $(slider).on(
                                "beforeChange",
                                function (event, slick, currentSlide, nextSlide) {
                                    $menu
                                        .find(
                                            opt.tabButton +
                                                '[data-slide-go-to="' +
                                                nextSlide +
                                                '"]'
                                        )
                                        .addClass("active")
                                        .siblings()
                                        .removeClass("active");
                                    linePos();
                                }
                            );
                        });
                    }
        
                    // Indicator Position
                    function linePos() {
                        var $btnActive = $menu.find(opt.tabButton + ".active"),
                            $height = $btnActive.css("height"),
                            $width = $btnActive.css("width"),
                            $top = $btnActive.position().top + "px",
                            $left = $btnActive.position().left + "px";
        
                        $line.get(0).style.setProperty("--height-set", $height);
                        $line.get(0).style.setProperty("--width-set", $width);
                        $line.get(0).style.setProperty("--pos-y", $top);
                        $line.get(0).style.setProperty("--pos-x", $left);
        
                        if (
                            $($button).first().position().left ==
                            $btnActive.position().left
                        ) {
                            $line
                                .addClass("start")
                                .removeClass("center")
                                .removeClass("end");
                        } else if (
                            $($button).last().position().left ==
                            $btnActive.position().left
                        ) {
                            $line
                                .addClass("end")
                                .removeClass("center")
                                .removeClass("start");
                        } else {
                            $line
                                .addClass("center")
                                .removeClass("start")
                                .removeClass("end");
                        }
                    }
                    linePos();
                });
            };
        
            
        
        
        };

        elementorFrontend.hooks.addAction('frontend/element_ready/global', GlobalSlider);


        // Banner Widget --
        elementorFrontend.hooks.addAction('frontend/element_ready/kontabanner.default',function($scope) {

            
        });


        // image Widget --
        elementorFrontend.hooks.addAction('frontend/element_ready/kontagroupimage.default',function($scope) {
           $("#slider").on("input change", (e)=>{
              const sliderPos = e.target.value;
              // Update the width of the foreground image
              $('.foreground-img').css('width', `${sliderPos}%`)    
              // Update the position of the slider button
              $('.slider-button').css('left', `calc(${sliderPos}% - 18px)`) 
            });
            if ($("[data-bg-src]").length > 0) {
                $("[data-bg-src]").each(function () {
                    var src = $(this).attr("data-bg-src");
                    $(this).css("background-image", "url(" + src + ")");
                    $(this).removeAttr("data-bg-src").addClass("background-image");
                });
            }


        });

        elementorFrontend.hooks.addAction('frontend/element_ready/kontacounterup.default',function($scope) {
            $(".counter-number").counterUp({
                delay: 10,
                time: 1000,
            });


        });

        elementorFrontend.hooks.addAction('frontend/element_ready/kontafeature.default',function($scope) {
            // window.addEventListener("mousemove", touches);
            // window.addEventListener("touchstart", touches);
            // window.addEventListener("touchmove", touches);

            $(document).on('mouseover','.feature-card',function() {
                $(this).addClass('feature-card-active');
                $('.feature-card').removeClass('feature-card-active');
                $(this).addClass('feature-card-active');
            });


        });

        elementorFrontend.hooks.addAction('frontend/element_ready/kontateam.default',function($scope) {
            $('.team-tab-wrap li:first-child').addClass('active');
            $('.team-tab-content').hide();
            $('.team-tab-content:first').show();

            // Click function
            $('.team-tab-wrap li').mouseenter(function(){
            $('.team-tab-wrap li').removeClass('active');
            // $(this).addClass('active');
            $('.team-tab-content').hide();
            
            var activeTab = $(this).find('.team-tab-item').attr('data-bs-target');
            $(activeTab).fadeIn();
            return false;
            });
        });

        elementorFrontend.hooks.addAction('frontend/element_ready/appkuproject.default',function($scope) {
            $('#portfolio-grid,.blog-masonry').imagesLoaded(function() {

                /* Filter menu */
                $('.mix-item-menu').on('click', 'button', function() {
                    var filterValue = $(this).attr('data-filter');
                    $grid.isotope({
                        filter: filterValue
                    });
                });

                /* filter menu active class  */
                $('.mix-item-menu button').on('click', function(event) {
                    $(this).siblings('.active').removeClass('active');
                    $(this).addClass('active');
                    event.preventDefault();
                });

                /* Filter active */
                var $grid = $('#portfolio-grid').isotope({
                    itemSelector: '.pf-item',
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.pf-item',
                    }
                });

                /* Filter active */
                $('.blog-masonry').isotope({
                    itemSelector: '.blog-item',
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.blog-item',
                    }
                });

            });

        });
        















        elementorFrontend.hooks.addAction('frontend/element_ready/drillerservice.default',function($scope) {
            let $slickcarousels = $scope.find('.service_slider_1');
            $slickcarousels.not('.slick-initialized').slick({
                dots: $slickcarousels.data('dots'),
                infinite: true,
                arrows: $slickcarousels.data('arrows'),
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 4,
                        arrows: false,
                        dots: $slickcarousels.data('dots'),
                    }
                },{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                        dots: $slickcarousels.data('dots'),
                    }
                },{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                        dots: $slickcarousels.data('dots'),
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: $slickcarousels.data('dots'),
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: false,
                    }
                }
                ]
            });
            

            let $services_lickcarousels_2 = $scope.find('.def_custom-carousel_1');
            $services_lickcarousels_2.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                vertical: true,
                slidesToShow: 1,
                asNavFor: '#serviceSlideThumb',
                slidesToScroll: 1,
            });
            let $services_lickcarousels_3 = $scope.find('.def_custom-carousel');
            $services_lickcarousels_3.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                vertical: true,
                slidesToShow: 3,
                asNavFor: '#serviceGridSlider',
                slidesToScroll: 1,
            });
            
            if ($('[data-bg-src]').length > 0) {
                $('[data-bg-src]').each(function () {
                  var src = $(this).attr('data-bg-src');
                  $(this).css('background-image', 'url(' + src + ')');
                  $(this).removeAttr('data-bg-src').addClass('background-image');
                });
            }; 
            $("[data-slick-next]").each(function () {
                $(this).on("click", function (e) {
                    e.preventDefault();
                    $($(this).data("slick-next")).slick("slickNext");
                });
            });

            $("[data-slick-prev]").each(function () {
                $(this).on("click", function (e) {
                    e.preventDefault();
                    $($(this).data("slick-prev")).slick("slickPrev");
                });
            });
            
        });
        
        elementorFrontend.hooks.addAction('frontend/element_ready/drillermission.default',function($scope) {
            $('.filter-active-1').imagesLoaded(function () {
                var $filter = '.filter-active-1',
                $filterItem = '.filter-item',
                $filterMenu = '.filter-menu-active';

                if ($($filter).length > 0) {
                    var $grid = $($filter).isotope({
                        itemSelector: $filterItem,
                        filter: '.1',
                        masonry: {
                        // use outer width of grid-sizer for columnWidth
                        columnWidth: 1
                        }
                    });

                    // filter items on button click
                    $($filterMenu).on('click', 'button', function () {
                        var filterValue = $(this).attr('data-filter');
                        $grid.isotope({
                        filter: filterValue
                        });
                    });

                    // Menu Active Class 
                    $($filterMenu).on('click', 'button', function (event) {
                        event.preventDefault();
                        $(this).addClass('active');
                        $(this).siblings('.active').removeClass('active');
                    });
                };
            });
            
        });
        
        elementorFrontend.hooks.addAction('frontend/element_ready/drilleriamgetab.default',function($scope) {
            $('.filter-active-1').imagesLoaded(function () {
                var $filter = '.filter-active-1',
                $filterItem = '.filter-item',
                $filterMenu = '.filter-menu-active';

                if ($($filter).length > 0) {
                    var $grid = $($filter).isotope({
                        itemSelector: $filterItem,
                        filter: '.1',
                        masonry: {
                        // use outer width of grid-sizer for columnWidth
                        columnWidth: 1
                        }
                    });

                    // filter items on button click
                    $($filterMenu).on('click', 'button', function () {
                        var filterValue = $(this).attr('data-filter');
                        $grid.isotope({
                        filter: filterValue
                        });
                    });

                    // Menu Active Class 
                    $($filterMenu).on('click', 'button', function (event) {
                        event.preventDefault();
                        $(this).addClass('active');
                        $(this).siblings('.active').removeClass('active');
                    });
                };
            });
            /*----------- 15. Indicator ----------*/
            // Indicator
            $.fn.indicator = function () {
                var $menu = $(this),
                    $linkBtn = $menu.find("a"),
                    $btn = $menu.find("button");
                // Append indicator
                $menu.append('<span class="indicator"></span>');
                var $line = $menu.find(".indicator");
                // Check which type button is Available
                if ($linkBtn.length) {
                    var $currentBtn = $linkBtn;
                } else if ($btn.length) {
                    var $currentBtn = $btn;
                }
                // On Click Button Class Remove
                $currentBtn.on("click", function (e) {
                    e.preventDefault();
                    $(this).addClass("active");
                    $(this).siblings(".active").removeClass("active");
                    linePos();
                });
                // Indicator Position
                function linePos() {
                    var $btnActive = $menu.find(".active"),
                        $height = $btnActive.css("height"),
                        $width = $btnActive.css("width"),
                        $top = $btnActive.position().top + "px",
                        $left = $btnActive.position().left + "px";
                    $line.css({
                        top: $top,
                        left: $left,
                        width: $width,
                        height: $height,
                    });
                }

                // if ($menu.hasClass('as-slider-tab')) {
                //   var linkslide = $menu.data('asnavfor');
                //   $(linkslide).on('afterChange', function (event, slick, currentSlide, nextSlide) {
                //     setTimeout(linePos, 10)
                //   });
                // }
                linePos();
            };

            // Call On Load
            if ($(".tab-menu3").length) {
                $(".tab-menu3").indicator();
            }
            
        });

        elementorFrontend.hooks.addAction('frontend/element_ready/drillervdothumb.default',function($scope) {
            if ($('[data-bg-src]').length > 0) {
                $('[data-bg-src]').each(function () {
                  var src = $(this).attr('data-bg-src');
                  $(this).css('background-image', 'url(' + src + ')');
                  $(this).removeAttr('data-bg-src').addClass('background-image');
                });
            };
            
        });
        elementorFrontend.hooks.addAction('frontend/element_ready/drillercounterup.default',function($scope) {
            $(".counter-number").counterUp({
                delay: 10,
                time: 1000,
            });
        });

        elementorFrontend.hooks.addAction('frontend/element_ready/drillertestimonialslider.default',function($scope) {
            let $projectcarousels = $scope.find('#testiSlide2');
                $projectcarousels.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: false,
                    }
                }
                ]
            });
            let $projectcarousels2 = $scope.find('.testi-carousel');
                $projectcarousels2.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: false,
                    }
                }
                ]
            });

                  let $projectcarousels3 = $scope.find('.testi-carousel2');
                $projectcarousels3.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: false,
                    }
                }
                ]
            });

            
        });

         elementorFrontend.hooks.addAction('frontend/element_ready/drillerfeature.default',function($scope) {
            let $featurecarousels = $scope.find('.feature-slide');
                $featurecarousels.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: false,
                    }
                }
                ]
            });

        });

        elementorFrontend.hooks.addAction('frontend/element_ready/drillerproject.default',function($scope) {
            // Project Slider 3 ------------------------
            $('#projectSlide3').slick({
                centerMode: true,
                centerPadding: '330px',
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                autoplay: true,
                speed: 1000,
                autoplaySpeed: 6000,
                focusOnSelect: true,
                responsive: [
                  {
                    breakpoint: 1670,
                    settings: {
                      centerPadding: '100px',
                      slidesToShow: 3
                    }
                  },
                  {
                    breakpoint: 1199,
                    settings: {
                      centerPadding: '300px',
                      slidesToShow: 1
                    }
                  },
                  {
                    breakpoint: 992,
                    settings: {
                      centerPadding: '200px',
                      slidesToShow: 1
                    }
                  },
                  {
                    breakpoint: 767,
                    settings: {
                      centerPadding: '50px',
                      slidesToShow: 1
                    }
                  },
                  {
                    breakpoint: 440,
                    settings: {
                      centerPadding: '0',
                      slidesToShow: 1
                    }
                  }
                ]
            });

            $('.projectSlideThumb').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                autoplay: true,
                speed: 1000,
                autoplaySpeed: 6000,
                vertical: true,
                focusOnSelect: true,
                asNavFor: '#projectSlide2',
                responsive: [
                    {
                      breakpoint: 992,
                      settings: {
                        vertical: false,
                        slidesToShow: 2
                      }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        vertical: false,
                        slidesToShow: 2
                      }
                    },
                    {
                      breakpoint: 440,
                      settings: {
                        vertical: false,
                        slidesToShow: 2
                      }
                    }
                ]
            });

            $('#projectSlide2').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                autoplay: true,
                fade: true,
                speed: 1000,
                autoplaySpeed: 6000,
                asNavFor: '.projectSlideThumb',
            });

            let $projectcarousels = $scope.find('.project-carousel');
                $projectcarousels.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                        dots: false,
                    }
                },{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: false,
                    }
                }
                ]
            });

            $(".filter-active").imagesLoaded(function () {
                var $filter = ".filter-active",
                    $filterItem = ".filter-item",
                    $filterMenu = ".filter-menu-active";

                if ($($filter).length > 0) {
                    var $grid = $($filter).isotope({
                        itemSelector: $filterItem,
                        filter: "*",
                        // masonry: {
                        //     // use outer width of grid-sizer for columnWidth
                        //     columnWidth: 1,
                        // },
                    });

                    // filter items on button click
                    $($filterMenu).on("click", "button", function () {
                        var filterValue = $(this).attr("data-filter");
                        $grid.isotope({
                            filter: filterValue,
                        });
                    });

                    // Menu Active Class
                    $($filterMenu).on("click", "button", function (event) {
                        event.preventDefault();
                        $(this).addClass("active");
                        $(this).siblings(".active").removeClass("active");
                    });
                }
            });    

             let $projectcarousels5 = $scope.find('.project-carousel5');
                $projectcarousels5.not('.slick-initialized').slick({
                //  centerMode: true,
                // centerPadding: '230px',
                dots: false,
                infinite: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                        dots: false,
                    }
                },{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: false,
                    }
                }
                ]
            });

            $("[data-slick-next]").each(function () {
                $(this).on("click", function (e) {
                    e.preventDefault();
                    $($(this).data("slick-next")).slick("slickNext");
                });
            });


        });
        
        elementorFrontend.hooks.addAction('frontend/element_ready/drillerteam.default',function($scope) {
            let $team_slider = $scope.find('.team_slider_1');
            $team_slider.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    }
                },{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    }
                }
                ]
            });

            let $team_slider2 = $scope.find('.team_slider_2');
            $team_slider2.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 4,
                        arrows: false,
                    }
                },{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    }
                },{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    }
                }
                ]
            });   

            let $team_slider3 = $scope.find('.team_slider_3');
            $team_slider3.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 4,
                        arrows: false,
                    }
                },{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    }
                },{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    }
                }
                ]
            });  


        });

        elementorFrontend.hooks.addAction('frontend/element_ready/drillerclientlogo.default',function($scope) {
            let $logocarousels1 = $scope.find('.partner_logo_slider');
            $logocarousels1.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 6,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    }
                }
                ]
            });   
        });
         elementorFrontend.hooks.addAction('frontend/element_ready/drillerblogpost.default',function($scope) {
            let $blogcarousels1 = $scope.find('.blog_slider1');
            $blogcarousels1.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1356,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    }
                }
                ]
            });   
        });

        elementorFrontend.hooks.addAction('frontend/element_ready/drillercontactus.default',function($scope) {
            if ($('[data-bg-src]').length > 0) {
                $('[data-bg-src]').each(function () {
                  var src = $(this).attr('data-bg-src');
                  $(this).css('background-image', 'url(' + src + ')');
                  $(this).removeAttr('data-bg-src').addClass('background-image');
                });
            };  
        });


    });
}(jQuery));
