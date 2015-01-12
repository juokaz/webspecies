function carousel1_initCallback(carousel) {
 $('.dots a').bind('click', function() {
  carousel.scroll(jQuery.jcarousel.intval($(this).attr('id').replace('top_dot_', '')));
  $('.dots a').removeClass('active');
  $(this).addClass('active');
  return false;
 });

    jQuery('#service-prev').bind('click', function() {
        carousel.prev();
        return false;
    });

    jQuery('#service-next').bind('click', function() {
        carousel.next();
        return false;
    });
}

function carousel1_itemLoadCallback(carousel, state){
  $('.dots a').removeClass('active');
  $('.dots #top_dot_'+carousel.first).addClass('active');
  $("#services-slider .control").removeClass('inactive');
  if (carousel.first == 1){
	  $("#service-prev").addClass('inactive');
  }
  if (carousel.first == $("#carousel1 li").length){
	  $("#service-next").addClass('inactive');
  }
}

function carousel2_initCallback(carousel) {
    $('#courses-list a').bind('click', function() {
        carousel.scroll(jQuery.jcarousel.intval($(this).attr('id').replace('course_link_', '')));
        $('#courses-list a').removeClass('active');
        $(this).addClass('active');
        return false;
    });

    jQuery('#service2-prev').bind('click', function() {
     carousel.prev();
     return false;
    });

    jQuery('#service2-next').bind('click', function() {
        carousel.next();
        return false;
    });
}
function carousel2_itemLoadCallback(carousel, state){
  $("#courses-list a").removeClass('active');
  $("#course_link_"+carousel.first).addClass('active');

  $("#courses-slider .control").removeClass('inactive');
  if (carousel.first == 1){
	  $("#service2-prev").addClass('inactive');
  }
  if (carousel.first == $("#carousele2 li").length){
	  $("#service2-next").addClass('inactive');
  }
}

function carousel3_initCallback(carousel) {
    jQuery('#service3-prev').bind('click', function() {
        carousel.prev();
        return false;
    });

    jQuery('#service3-next').bind('click', function() {
        carousel.next();
        return false;
    });
}
function carousel3_itemLoadCallback(carousel, state){
  $("#news-slider .control").removeClass('inactive');
  if (carousel.first == 1){
	  $("#service3-prev").addClass('inactive');
  }
  if (carousel.first == $("#carousele3 li").length){
	  $("#service3-next").addClass('inactive');
  }
}

function carousel4_initCallback(carousel) {
    jQuery('#products-prev').bind('click', function() {
        carousel.prev();
        return false;
    });

    jQuery('#products-next').bind('click', function() {
        carousel.next();
        return false;
    });
}
function carousel4_itemLoadCallback(carousel, state){
  $("#products-slider .control").removeClass('inactive');
  if (carousel.first == 1){
	  $("#products-prev").addClass('inactive');
  }
  if (carousel.first == $("#carousele4 li").length){
	  $("#products-next").addClass('inactive');
  }
}

function hoverAnim() {
    $("#main-menu li a").each(function(i) {
        // make the iteration object a jquery object
        var a = $(this);
        var animating = false;
        // grab the text and width
        var title = a.html();
        var w = a.outerWidth();
        // append a span with the content in, to mask over the link
        a.append("<span class='mask' style='width: 0px; display: none'>"+title+"</span>");
        // do the hover funcs
        a.hover(function(){
            // stop the flicker!
    	    a.find("span").stop(true,true);
    	    //
            a.find("span").show();
            a.find("span").animate({
              width: w+'px'
            }, 200, function(){
                animating = false;
            });
    	}, function() {
            a.find("span").animate({
              width: '0px'
            }, 400, function(){
                a.find("span").hide();
                animating = false;
            });
    	});
    });
}

function addHistory(title, url, section) {
    if (section) {
        title = title + " - " + section;
    }

    if (title) {
        title = title + " - Web Species";
    } else {
        title = "Web Species";
    }

    History.pushState(null,title,url);

    // Inform Google Analytics of the change
    if ( typeof window._gaq !== 'undefined' ) {
        window._gaq.push(['_trackEvent', 'Menu', 'Click', title]);
    }
}

function fixExternalLinks() {
    $('a[href^="http://"]').attr({
        target: "_blank",
        title: "Opens in a new window"
      });
}

function fixParameters (){
    fixExternalLinks();

    if ( $(window).width() < 1190) {
	    $(".slide-inner").css('margin-left', 220 + "px");
    } else {
	    $(".slide-inner").css('margin-left', 'auto');
    };

    $(".slide").each(function(){
	    if($(this).outerHeight() < $(window).height()){
		    var itemMargin = ($(window).height() - $(this).outerHeight()) /2;
		    $(this).css('margin-top', itemMargin+'px');
		    $(this).css('margin-bottom', itemMargin-1+'px');
	    }
    });

    var navPadding = ($(window).height() - $(".side-navigation").height())/2;
    $(".side-navigation").css("padding-top", navPadding + "px");

    $("#header").width($(window).width());
};

function handleNews(url) {
    url = url.replace(/^\//, '');

    if (url.search('news/') == 0) {
        if (!$('.newsitem').length) {
            $('.news').parent().append('<div class="slide newsitem" style="display: none;" />');
        }
        $('.newsitem').load('/' + url + ' .slide-inner', function() {
            $('.newsitem').show();
            $('.news').hide();
            fixParameters();
        });
    } else if (url.search('news') == 0) {
        $('.news').show();
        $('.newsitem').hide();
        $("#carousele3").jcarousel({
                initCallback: carousel3_initCallback,
                scroll:1,
                itemLoadCallback: carousel3_itemLoadCallback,
                buttonNextHTML: null,
                buttonPrevHTML: null
            });
        fixParameters();
    }
}

function handleTraining(url) {
    url = url.replace(/^\//, '');

    if (url.search('training/') == 0) {
        if (!$('.popup').length) {
            $('body').append('<div class="popup" />');
        }
        $('.popup').load('/' + url + ' .slide-inner', function() {
            $('.popup').append('<div class="close" />');
            $('.popup').lightbox_me({
                centered: true,
                overlaySpeed: 0,
                lightboxSpeed: 0,
                destroyOnClose: true,
                onClose: function() {
                    $('#main-menu a[href="training.html"]').click();
                },
                overlayCSS:	{background: 'black', opacity: .8}
            });
            $(document.body).css('overflow', 'hidden');
        });
    } else if (url.search('training') == 0) {
        $('.popup').trigger('close');
        $(document.body).css('overflow', 'visible');
    }
}

function handleSections(topUrl, relativeUrl) {
    if (topUrl == 'news') {
        handleNews(relativeUrl);
    } else if (topUrl == 'training') {
        handleTraining(relativeUrl);
    }
}

function gotoActiveSlide() {
    fixParameters();

    if ($(".static").length == 0) {
        var topUrl = History.getState().url.replace(History.getRootUrl(),'').split('/')[0].replace('.html', '');

        if (topUrl !== "") {
            topUrl = topUrl.replace('.html', '');
            var offset = $("a[name="+topUrl+"]").parent().offset().top;
            $('html, body').scrollTo(offset, 0, {easing:'swing', duration:0});
        }
    }
}

$(function(){

    var	dynamic = $(".static").length == 0,
        History = window.History,
	    rootUrl = History.getRootUrl(),
        url = History.getPageUrl();

	fixParameters();

	if (dynamic) {
	    // check if homepage
	    if (rootUrl.replace(url, '') != rootUrl) {
	        var relativeUrl = 'services';
        } else {
            var relativeUrl = url.replace(/\/$/, '').replace(rootUrl,'');
        }

        var topUrl = relativeUrl.split('/')[0];

        if (relativeUrl !== "" && $("#main-menu a[href='/"+topUrl.replace('.html', '')+"']").length){
            $("#main-menu a").removeClass('active');
            $("#main-menu a[href='/"+topUrl+"']").addClass('active');
        }

        // load all content
        $('.content-slides').load('slides.html', function() {
            gotoActiveSlide();

            //top carousel
            var top_list_elements_count = $("#carousel1 li").length;
            var i=1;
            for (i=1; i<=top_list_elements_count; i++){
                $("#services-slider .dots").append("<a href=\"#\" id=\"top_dot_"+i+"\"><br /></a>");
            }
            $("#services-slider .dots a:first").addClass("active");
            $("#carousel1").jcarousel({
                initCallback: carousel1_initCallback,
                scroll:1,
                itemLoadCallback: carousel1_itemLoadCallback,
                buttonNextHTML: null,
                buttonPrevHTML: null
            });

            $("#carousele2").jcarousel({
                initCallback:carousel2_initCallback,
                scroll:1,
                buttonNextHTML: null,
                itemLoadCallback: carousel2_itemLoadCallback,
                buttonPrevHTML: null
            });

            $("#carousele3").jcarousel({
                initCallback: carousel3_initCallback,
                scroll:1,
                itemLoadCallback: carousel3_itemLoadCallback,
                buttonNextHTML: null,
                buttonPrevHTML: null
            });

            $("#carousele4").jcarousel({
                initCallback: carousel4_initCallback,
                scroll:1,
                itemLoadCallback: carousel4_itemLoadCallback,
                buttonNextHTML: null,
                buttonPrevHTML: null
            });

            var m = 'info';
            m += '@';
            $('.type-mail a').append(m + 'WebSpecies.co.uk').attr('href', 'mailto:' + m + 'webspecies.co.uk');

            handleSections(topUrl, relativeUrl);
        });

        var scroll_to_active_content = function(href) {
	        addHistory($("#main-menu a[href='"+href+"']").attr('title'),href);
        };

        $("#main-menu a, #slide-top, .menu-link").live('click', function(event){
	        // Continue as normal for cmd clicks etc
	        if ( event.which == 2 || event.metaKey ) { return true; }

            scroll_to_active_content($(this).attr('href'));

	        event.preventDefault();
            return false;
        });

        $('.news p a, .newsitem a.control:not(.inactive)').live('click', function(event) {
  	        // Continue as normal for cmd clicks etc
	        if ( event.which == 2 || event.metaKey ) { return true; }

	        addHistory($(this).attr('title'),$(this).attr('href'), $('#main-menu a[href="news.html"]').attr('title'));

	        event.preventDefault();
            return false;
        });

        $('a.inactive').live('click', function() {
            return false;
        });

        $('.training .button-2').live('click', function(event) {
	        // Continue as normal for cmd clicks etc
	        if ( event.which == 2 || event.metaKey ) { return true; }

	        addHistory($(this).attr('title'),$(this).attr('href'), $('#main-menu a[href="training.html"]').attr('title'));

	        event.preventDefault();
            return false;
        });

        // Hook into State Changes
        History.Adapter.bind(window,'statechange',function(){
	        var relativeUrl = History.getState().url.replace(rootUrl,''),
                topUrl = relativeUrl.split('/')[0].replace('.html', '');

            handleSections(topUrl, relativeUrl);

            $("#main-menu a").removeClass('active');
            $("#main-menu a[href='"+topUrl+".html']").addClass('active');

            if ($("#main-menu a.active").size() > 0) {
                topUrl = topUrl.replace('.html', '');
                if (topUrl == '') {
                    topUrl = 'services';
                }
                var offset = $("a[name="+topUrl+"]").parent().offset().top;
            } else {
                var offset = 0;
            }
            $('html, body').scrollTo(offset, 0, {easing:'swing', duration:400});

        }); // end onStateChange

        if (History.enabled) {
            $('.info').show();
            $(document).keydown(function(event) {
                var $curr_mm_item = $("#main-menu a.active");
                var active_id = $curr_mm_item.attr('href').replace('/', '').replace('.html', '');
                if (active_id == "") {
                    active_id = 'services';
                }
                switch (event.keyCode){
                case 37:
                if ($("."+active_id + " .slide-inner").length > 0){
                  $('.'+active_id+ " .prev").trigger('click');
                 }
                 event.preventDefault();
                break;
                case 39:
                 if ($("."+active_id + " .slide-inner").length > 0){
                  $('.'+active_id + " .next").trigger('click');
                 }
                 event.preventDefault();
                break;
                case 38:
                 if (($(":animated").length === 0) && ($curr_mm_item.parent().prev().length === 1)){
                  scroll_to_active_content($curr_mm_item.parent().prev().children('a').attr('href'));
                 }
                 event.preventDefault();
                break;
                case 40:
                 if (($(":animated").length === 0) && ($curr_mm_item.parent().next().length === 1)){
                  scroll_to_active_content($curr_mm_item.parent().next().children('a').attr('href'));
                 }
                 event.preventDefault();
                break;
                default:
                }
           });
        }
    }

    hoverAnim();

    $(window).resize(fixParameters);
    $(window).load(gotoActiveSlide);

    $("input.text, textarea").focus(function () {
	    $(this).addClass("focus");
    });
    $("input.text, textarea").focusout(function () {
	    $(this).removeClass("focus");
    });

    $('#toggle-tweet').toggle(function(){$("#tweet").toggle(200);}, function(){ $("#tweet").toggle(200);});

    $("#tweet").tweet({
        avatar_size: 32,
        count: 1,
        fetch: 10,
        filter: function(t){ return ! /^@\w+/.test(t["tweet_raw_text"]); },
        template: '<p class="tweet">{text}</p><p class="time">--- {time}</p>',
        username: "webspecies",
      });

    $('#contacts-form').live('submit', function() {
        $('.submit').val('SEND');
        var data = { Field4: $('#name').val(), Field12: $('#mail').val(), Field7: $('#message').val(), idstamp: "99V5cGfFEep/G4A5fmTnGFFQwEbHrPfR0JcolM72yYg=" };
        $.post("/contact-process", data)
            .complete(function(XMLHttpRequest) {
                if (XMLHttpRequest.status == 302) {
                    $('#name').val('');
                    $('#mail').val('');
                    $('#message').val('');
                    $('.submit').val('SENT!');
                }
            });
        return false;
    });
});
