
var APP = APP || {};
APP.GLOBAL = {
	isOLDIE: false,
	isSP: false,
	isTABLET: false,
	isPC: false,
	isSP_VIEW: false,
	SCRL_TOP: 0,
	TIME: null,
	VIEW_PORT: null,
	UA: navigator.userAgent,

	init : function(){
		var A = this;
		
		// isOLDIE
		if(A.UA.search(/msie [6.]|msie [7.]|msie [8.]/i) !=-1){
			A.isOLDIE = true;
			$('body').addClass('is-oldie');
		}

		// 各種デバイス判定 & meta viewport書き込み
		//////////////////////
		if(A.UA.search(/iphone/i) !=-1 || A.UA.search(/ipod/i) !=-1 || ( A.UA.search(/android/i) !=-1 && A.UA.search(/mobile/i) !=-1)){
		// スマホ判定
			A.isSP = true;
			$('body').addClass('is-sp');

		}else if(A.UA.search(/ipad/i) !=-1 || A.UA.search(/android/i) !=-1){
		// タブレット判定
			A.isTABLET = true;
			$('meta[name="viewport"]').remove();
			$('head').append('<meta name="viewport" content="width=1000">');
			$('body').addClass('is-tb');
		}else{
		// PC判定
			A.isPC = true;
			$('body').addClass('is-pc');
		}
		

		// output_VIEW_PORT
		var output_VIEW_PORT = function(){
			$(window).resize(function(){
				if(A.isOLDIE){
					A.VIEW_PORT = document.body.clientWidth;// IE8以下用
				}else{
					A.VIEW_PORT = window.innerWidth;// その他ブラウザ用
				}
			}).trigger('resize');
		};
		output_VIEW_PORT();


		// output_SCRL_TOP
		var output_SCRL_TOP = function() {
			$(document).scroll(function() {
				A.SCRL_TOP = ($('body').scrollTop() || $('html').scrollTop());
			}).trigger('scroll');
		};
		output_SCRL_TOP();


		// output_isSP_VIEW
		var output_isSP_VIEW = function(){
			var BREAK_POINT = 750;

			$(window).on('resize', function(){
				if( !A.isOLDIE && A.VIEW_PORT <= BREAK_POINT ){
					A.isSP_VIEW = true;
				}else{
					A.isSP_VIEW = false;
				}

			}).trigger('resize');
		};
		output_isSP_VIEW();


		var pagetop = function(){
			// ページ内スクロール
			$('#tpl-pagetop a').on('click',function(){
				
				$('html,body').stop().animate({ scrollTop: 0 },500,'easeOutExpo');
				return false;
			});
		};
		pagetop();

	}
};


// 特定classで発火するお役立ち系
////////////////////////
APP.CLASS_UTIL = {
	init: function(){

		// hover_opacity
		if( !APP.GLOBAL.isOLDIE ){
			var hover_opacity = function(){
				$(".hover-opacity").hover(function(){
					$(this)	.css("opacity","0.75");
				},function(){
					$(this)	.css("opacity","1.00");
				});
			};
			hover_opacity();
		}

	}
};


$(function(){
	APP.GLOBAL.init();
	APP.CLASS_UTIL.init();
});