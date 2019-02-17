/* HOVER INTENT */
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:200};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

/* CAROUSEL LITE */
(function($){$.fn.jCarouselLite=function(o){o=$.extend({btnPrev:null,btnNext:null,btnGo:null,mouseWheel:false,auto:null,speed:300,easing:null,vertical:false,circular:true,visible:1,start:0,scroll:1,beforeStart:null,afterEnd:null},o||{});return this.each(function(){var b=false,animCss=o.vertical?"top":"left",sizeCss=o.vertical?"height":"width";var c=$(this),ul=$("ul",c),tLi=$("li",ul),tl=tLi.size(),v=o.visible;var f=$("li",ul),itemLength=f.size(),curr=o.start;c.css("visibility","visible");f.css({overflow:"hidden",float:o.vertical?"none":"left"});ul.css({margin:"0",padding:"0",position:"relative","list-style-type":"none","z-index":"1"});c.css({overflow:"hidden",position:"relative","z-index":"2",left:"0px"});var g=o.vertical?height(f):width(f);var h=g*itemLength;var j=g*v;f.css({width:f.width(),height:f.height()});ul.css(sizeCss,h+"px").css(animCss,-(curr*g));c.css(sizeCss,j+"px");if(o.btnPrev)$(o.btnPrev).click(function(){return go(curr-o.scroll)});if(o.btnNext)$(o.btnNext).click(function(){return go(curr+o.scroll)});if(o.btnGo)$.each(o.btnGo,function(i,a){$(a).click(function(){return go(o.circular?o.visible+i:i)})});if(o.mouseWheel&&c.mousewheel)c.mousewheel(function(e,d){return d>0?go(curr-o.scroll):go(curr+o.scroll)});if(o.auto)setInterval(function(){go(curr+o.scroll)},o.auto+o.speed);function vis(){return f.slice(curr).slice(0,v)};function go(a){if(!b){if(o.beforeStart)o.beforeStart.call(this,vis());if(o.circular){if(a<=o.start-v-1){ul.css(animCss,-((itemLength-(v*2))*g)+"px");curr=a==o.start-v-1?itemLength-(v*2)-1:itemLength-(v*2)-o.scroll}else if(a>=itemLength-v+1){ul.css(animCss,-((v)*g)+"px");curr=a==itemLength-v+1?v+1:v+o.scroll}else curr=a}else{if(a<0||a>itemLength-v)return;else curr=a}b=true;ul.animate(animCss=="left"?{left:-(curr*g)}:{top:-(curr*g)},o.speed,o.easing,function(){if(o.afterEnd)o.afterEnd.call(this,vis());b=false});if(!o.circular){$(o.btnPrev+","+o.btnNext).removeClass("disabled");$((curr-o.scroll<0&&o.btnPrev)||(curr+o.scroll>itemLength-v&&o.btnNext)||[]).addClass("disabled")}}return false}})};function css(a,b){return parseInt($.css(a[0],b))||0};function width(a){return a[0].offsetWidth+css(a,'marginLeft')+css(a,'marginRight')};function height(a){return a[0].offsetHeight+css(a,'marginTop')+css(a,'marginBottom')}})(jQuery);


$(function() {

	$('a[href^=http]').click( function() {
		window.open(this.href);
		return false;
	});
	
});


$(document).ready(function(){

	$("#nav li.top").hoverIntent(function() {
		$(this).addClass('hover');
		$(this).children('ul').slideDown(200);
			}, function() {
		$(this).removeClass('hover');
		$(this).children('ul').slideUp(200);
		Cufon.replace('#nav li a.top', { fontFamily: "Gotham Bold", letterSpacing: "3", hover: "true" });
	});

	$("#logo-image").fadeIn(500);
	$("#slice-image").fadeIn(800);
	$("#content").fadeIn(800);

	$("#copyright").hover(function() {
		$(".copyright-tip").fadeIn(200);
	}, function() {
		$(".copyright-tip").fadeOut(200);
	});

	$(".carousel").jCarouselLite({
    	btnNext: ".next",
    	btnPrev: ".prev",
    	circular: false,
    	scroll: 1
	});

});


jQuery(function ($) {
	var contact = {
		message: null,
		defaults: {
			name: 'Name*',
			email: 'Email*'
		},
		init: function () {
			$('#contact input[type="text"], #contact textarea').each(function () {
				$.data(this, 'default', this.value);
				$(this).focusin(function () {
					$(this).addClass('focus');
					if (this.value === $.data(this, 'default')) {
						this.value = '';
					}
				}).focusout(function () {
					$(this).removeClass('focus');
					if (!this.value) {
						this.value = $.data(this, 'default');
					}
					
				});
			});
			$('#contact').submit(function (e) {
				e.preventDefault();

				var form = $(this);
				if (contact.validate(form)) {
					form.fadeOut(200);
					$.ajax({
						url: form[0].action,
						data: form.serialize() + '&action=inline',
						type: 'post',
						cache: false,
						dataType: 'html',
						success: function (data) {
							$('#contact-form .success').html(data).fadeIn();
						},
						error: contact.error
					});
				}
				else {
					$('#contact-form .error').html(contact.message).fadeIn(200);
				}
			});
		},
		error: function (xhr) {
			alert(xhr.statusText);
		},
		validate: function (form) {
			$('#contact-form .error').hide();

			contact.message = '';
			$('.required', form[0]).removeClass('required-error').each(function () {
				if (this.value == contact.defaults[this.name] || !this.value) {
					contact.message = 'Required fields missing';
					$(this).addClass('required-error');
				}
			});

			if (contact.message.length > 0) {
				return false;
			}
			else {
				return true;
			}
		}
	};

	contact.init();
});