window.requestAnimatedFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,1e3/60)}}();var m4thUtil={};m4thUtil.IndexManager=new function(){var n=this;n.all=[],n.hashMap={},n.add=function(t){function e(n,t,e){var i=t,a=0,u=e;return{getIndex:function(n){return void 0===n?a:(a+=n,u?a>=i?a=0:0>a&&(a=i-1):a>=i?a=i:0>a&&(a=0),a)},setIndex:function(n){return a=n},isLimited:function(){return a>=i?!0:0>=a?!0:!1},setLength:function(n){i=n},getLength:function(){return i},reset:function(){a=0}}}var i=new e(t.id,t.len,t.isNext);return n.hashMap[t.id]=i,n.all.push(i),n},n.find=function(t){return n.hashMap[t]},n.remove=function(t){n.all.splice(n.all.indexOf(n.hashMap[t]),1),n.hashMap[t]=null}},m4thUtil.TimerManager=new function(){function n(){if(t.count+=1,t.count>=t.fps){var e=-1,i=t.all.length;for(t.count=0;++e<i;)t.all[e].call()}requestAnimatedFrame(n)}var t=this;t.all=[],t.hashMap={},t.count=0,t.isStop=!1,t.fps=60,t.isStartup=!1,t.add=function(e){function i(n,t,e,i){var a=0,u=t,r=e,o=i;return{id:function(){return n},call:function(){o?++a>=u&&(r(),a=0):a=0},auto:function(){return arguments.length?(o=arguments[0],void(a=0)):o},reset:function(){a=0}}}var a=new i(e.id,e.end,e.success,e.isAutoPlay);return t.hashMap[e.id]=a,t.all.push(a),t.isStartup||(requestAnimatedFrame(n),t.isStartup=!0),t},t.find=function(n){return t.hashMap[n]},t.remove=function(n){t.all.splice(t.all.indexOf(t.hashMap[n]),1),t.hashMap[n]=null}};

function trace(){ try{ var args = [].join.call(arguments, ' '); console.log( "ui: "+args );}catch(e){ }  }

var Utils = {
	getMediaQuery: function(type){
		return {
			pc: window.matchMedia("(min-width:1025px)"),
			tablet: window.matchMedia("(min-width:812px) and (max-width:1024px)"),
			mobile: window.matchMedia("all and (max-width:811px)")
		}[type];
	}
}


var conApp = conApp || {},
	gnbApp = gnbApp || {},
	lnbApp = lnbApp || {},
	mainApp = mainApp || {},
	introApp = introApp || {};

/* 해당 엘리먼트 체크 여부 */
function hasJqObject( elem ){
	var bool= false;  
	try{
		bool=  elem.length > 0 
	}catch(e){
		bool=  false 
	}; 
	return bool;	
}

/* mobile check */
function MobileCheck(){	
	var filter = "win16|win32|win64|mac";
	var isMo;
	
	if(navigator.platform){
		if(0 > filter.indexOf(navigator.platform.toLowerCase())){
			isMo = true;
		}else{
			isMo = false;
		}
	}
	return {
		check : isMo
	};
};

//메인 인트로
introApp.event = function(){
	conApp.$wrap.css("overflow","hidden");
	conApp.$wrap.find(".main").css("opacity","0");
	var introPosList = [
		{ top: 0, left: 0, y : 500, x : -50, scale :.7},
		{ top: 269, left: 212, y : 90, x : 190, scale :.5},
		{ top: 807, left: 0, y : 310, x : 270, scale :.5},
		{ top: 537, left: 212, y : 530, x : 300, scale :.5},
		{ top: 0, left: 639, y : 210, x : 550, scale :.5},
		{ top: 536, left: 1492, y : 0, x : 990, scale :.7},
		{ top: 806, left: 639, y : 600, x : 800, scale :.5},
		{ top: 0, left: 1279, y : 780, x : 1080, scale :.5},
		{ top: 269, left: 1279, y : 410, x : 1100, scale :.5},
		{ top: 805, left: 1279, y : 160, x : 1410, scale :.5}
	];
	introApp.$intro = $(".intro");
	introApp.$shadow = introApp.$intro.find(".shadow");
	introApp.$rect = introApp.$intro.find(".rect");
	introApp.$bg = introApp.$intro.find(".list_back_bg>div");
	introApp.$shadow.css("opacity", 0 );
	introApp.$txt = introApp.$intro.find(".txt img");
	TweenMax.set( introApp.$rect , { scaleX :.2, scaleY :.2, x : 1920/2, opacity : 0,  y : 1075/2, transformOrgin : "50% 50%", force3D : true  });
	
	introApp.$rect.each( function(idx){
		TweenMax.to( $(this),.8, { opacity :1, delay : 0.2+(idx *.05), scaleX : 1, scaleY : 1, x : introPosList[idx].left, y : introPosList[idx].top, opacity : 1, ease : Quint.easeOut } )
	});
	TweenMax.to( introApp.$shadow ,1, { delay : 1.7, opacity : 1 });
	$(".list_back_bg").css("opacity", 1 );
	introApp.$bg.each( function(idx){
		var _i = idx%3;
		if( _i === 0 )  TweenMax.set( $(this), { scaleX : 0 , transformOrigin : "0 100%"});
		else if( _i === 1 ) TweenMax.set( $(this), { scaleY : 0, transformOrigin : "0 0%" });
		else if( _i === 2 ) TweenMax.set( $(this), { scaleX : 0, transformOrigin : "100% 100%" });
		TweenMax.to( $(this), 1, { delay : .8, scaleX : 1, scaleY : 1, opacity : 1, ease : Quint.easeInOut });
	});

	TweenMax.set( introApp.$txt, { y : 114 });
	introApp.$txt.each( function(idx){
		TweenMax.to( $(this), .8,{ delay :2+.1*idx, y : 0, ease : Expo.easeOut });
	});

	// main
	TweenMax.delayedCall( 4.5, function(){
		TweenMax.to( $(".intro") , 1, { scaleX : 0, scaleY : 0, opacity : 0,  transformOrigin : "50% 50%", ease : Quint.easeInOut, force3D : true  });
		mainApp.event();
	});
}

// 메인 모션
mainApp.event = function(){
	mainApp.$main = conApp.$wrap.find(".main");
	mainApp.$main.css("opacity","1");
	
	mainApp.$mainVs = mainApp.$main.find(".visualWrap .view .img li");
	mainApp.$sector = mainApp.$main.find(".sector");
	mainApp.$sectorList = mainApp.$sector.find(">li");
	/* mainApp.$sectorListTxt = mainApp.$sectorList.find(">div"); */
	mainApp.$sectorListTxt = mainApp.$sectorList.find(".ko,.en");
	mainApp.$news = mainApp.$main.find(".news").find(">li");
	mainApp.$pointer = mainApp.$main.find(".pointer");
	mainApp.$pointerList = mainApp.$pointer.find(">li");
	mainApp.$txtImg = mainApp.$main.find(".visualWrap .txt .motion");
	mainApp.$txtBodyImg = mainApp.$main.find(".visualWrap .txt .default");
	mainApp.$btn = mainApp.$main.find(".rollingControl button");
	mainApp.$info = mainApp.$main.find(".visualWrap .view .info");
	mainApp.$shortcut = mainApp.$info.find(".shortcut");
	mainApp.isAnimated;
	var device = new MobileCheck();
	
	conApp.$wrap.find(".intro").hide();
	mainApp.setupEvent = function(e){
		//TweenMax.to ( mainApp.$sectorList.eq(0).find(">img"), .7, {opacity : 0});
		TweenMax.set( mainApp.$news , { y : -300, opacity : 0} );
		TweenMax.set( mainApp.$sectorList, { y : -300, opacity : 0 });
		TweenMax.set( mainApp.$pointerList, { x: 20, opacity : 0 });
		TweenMax.set( mainApp.$txtImg.eq(0), { y : 103, opacity : 0, force3D : true  });
		TweenMax.set( mainApp.$txtBodyImg , { y : 100 , opacity : 0 });
		TweenMax.set( mainApp.$btn , { x : 20 , opacity : 0 });
		TweenMax.set( mainApp.$info , { opacity : 0 });
		TweenMax.set( mainApp.$shortcut , { x : 20, opacity : 0 });
		
		mainApp.$txtImg.each(function(){
			var $this = $(this),
				$img = $this.find("img"),
				imgSrc = $img.attr("src"),
				_heightTop = $this.find(".top").height(),
				_bottomTop = $this.find(".bottom").height();
				
			$img.hide();
			$this.find(".top").css("background-image","url("+imgSrc+")").attr("data-height",_heightTop);
			$this.find(".bottom").css({
				"background-image" : "url("+imgSrc+")",
				"background-position" :"0 " + ( -_heightTop)+"px"
			}).attr("data-height",_bottomTop);
		});
	};
	
	mainApp.startupEvent = function(e){
		mainApp.$news.each( function(i){
			TweenMax.to( $(this),1.3, { delay :.2*i, opacity : 1, y : 0, ease : Quint.easeInOut });
		});
		
		mainApp.$sectorList.each( function(i){
			TweenMax.to( $(this),1.3, { delay :.2*i+1, opacity : 1, y : 0, ease : Quint.easeInOut });
			TweenMax.to( mainApp.$sectorListTxt.eq(i),1.3, { delay :.2*i+1, opacity : 1, y : 0, ease : Quint.easeInOut });
		});
		
		/*
		mainApp.$txtImg.each( function(i){
			if( i === 0 ) TweenMax.to( $(this).find("img"),.8, { delay :1.5, y : 0, opacity : 1, ease : Quint.easeOut });
		});*/
		TweenMax.to( mainApp.$txtImg.eq(0),.8, { delay :1.5, y : 0, opacity : 1, ease : Quint.easeOut });

		TweenMax.to( mainApp.$txtBodyImg,.8, { delay :1.8, y : 0, opacity : 1, ease : Quint.easeOut });
		mainApp.$pointerList.each( function(i){
			TweenMax.to( $(this),.7, { delay :.15*i+1.9, opacity : 1, x : 0, ease : Quint.easeOut });
		});
		
		TweenMax.to( mainApp.$info, .7, { delay :1.9, opacity : 1 });
		TweenMax.to( mainApp.$btn,.7, { delay :2.6, opacity : 1, x : 0, ease : Quint.easeOut });
		TweenMax.to( mainApp.$shortcut, .7, { delay :2.7, opacity : 1, x:0 , onComplete:function(){
			mainApp.timerLoadEvent();
		}});
	};
	
	mainApp.setupEvent();
	mainApp.startupEvent();
	
    
	mainApp.controlEvent = function(e){
		//if(mainApp.isAnimated) return; /* 2016-11-03 : 클릭 시 바로 이벤트 진행 */
		//mainApp.isAnimated = true; /* 2016-11-03 : 클릭 시 바로 이벤트 진행 */
		
		if(arguments[0].type === undefined){ 
			var $this = e;
		}else{
			var $this = $(this);
			TweenMax.killTweensOf(mainApp.timerControlEvent);
			mainApp.timerControl.text("재생").attr("class","play");
			
			var back = new mainApp.timerLoadEvent();
			back.comback();
		}
		
		var idx = mainApp.$sectorList.index($this);
		var prevIdx = mainApp.$sectorList.filter(".on").index();
		if(idx == prevIdx) return false;
		
		var $current = mainApp.$sectorList.filter(".on");
		var $currentImg = $current.find(">img");
		var $sectorTxt = $this.find(">div");
		
		mainApp.setEvent = (function(e){
			TweenMax.to( $currentImg,.7, { opacity : 1});
			TweenMax.to( $this.find(">img"),.7, { opacity : 0});
			$current.removeClass("on");
			$this.addClass("on");
			
			$sectorTxt.each(function(e){
				TweenMax.to( $(this),.7, { delay :.25*e, backgroundPositionY : -$(this).height()+"px", 
					onComplete : function(){

						$sectorTxt.eq(e).removeAttr("style");
					}
				});
			})
		}());
        
		mainApp.visualEvent = (function(e){
			//var $current = mainApp.$mainVs.filter(".on"); /* 2016-11-03 : 현재 활성메뉴 지정변수 수정 */
			var $current = mainApp.$mainVs.eq(prevIdx); /* 2016-11-03 : 현재 활성메뉴 지정변수 수정 */
			
			/* fade Ver */
			function visualEventPc(){
				mainApp.$mainVs.eq(prevIdx).css( { "z-index":2  });
				mainApp.$mainVs.eq(idx).addClass("on").css({"opacity":0, "z-index":3});
				TweenMax.to( mainApp.$mainVs.eq(idx), 2, { "opacity":1, onComplete : function(){
					mainApp.$mainVs.eq(prevIdx).css( { "z-index":1 }  );
					$current.removeClass("on").css({ "opacity":0 });
					//mainApp.isAnimated = false;
                    
				}});
			}
			
			function visualEventMo(){
				mainApp.$mainVs.css({"z-index":1 });
				mainApp.$mainVs.eq(idx).addClass("on").css({"z-index":3 });
				TweenMax.to( mainApp.$mainVs.eq(idx), 1, { onComplete : function(){
					mainApp.$mainVs.eq(prevIdx).css( { "z-index":1 }  );
					$current.removeClass("on");
					//mainApp.isAnimated = false;
				}});
			}

			if(device.check){
                TweenMax.killAll();/* 2016-11-03 : 애니메이션 중첩 방지 */
				visualEventMo();
			}else{
                TweenMax.killAll();/* 2016-11-03 : 애니메이션 중첩 방지 */
				visualEventPc();
			}
		})();
		
		mainApp.pointerEvent = (function(e){
			mainApp.$pointerList.filter(".on").removeClass("on");
			mainApp.$pointerList.eq(idx).addClass("on");
		})();
		
		mainApp.visualTxtEvent = (function(e){
			//TweenMax.set(mainApp.$txtImg.eq(idx), { y : 0});
			// TweenMax.set(mainApp.$txtImg.eq(idx).find("img"), { y : 103, opacity : 1});
			// TweenMax.to( mainApp.$txtImg.eq(idx).find("img"), 1 , {  delay :.5, y : 0,  ease : Expo.easeInOut });
			// TweenMax.to( mainApp.$txtImg.eq(prevIdx).find("img"), 1, {  delay :.5, y : -200, ease : Expo.easeInOut, onComplete:function(){mainApp.$txtImg.eq(prevIdx).removeClass("on")} });
			
			var $thisTop = mainApp.$txtImg.eq(idx).find(".top"),
				$prevTop = mainApp.$txtImg.eq(prevIdx).find(".top"),
				$thisBottom = mainApp.$txtImg.eq(idx).find(".bottom"),
				$prevBottom = mainApp.$txtImg.eq(prevIdx).find(".bottom");

			if(device.check){
				// flip Mobile
				TweenMax.to( $prevTop, .5 , {  opacity:0, y:0, force3D:true, ease : Expo.easeInOut});
				TweenMax.to( $prevBottom, .5 , {  opacity:0, y:0, force3D:true,  ease : Expo.easeInOut,
					onComplete:function(){
						mainApp.$txtImg.eq(prevIdx).removeClass("on");
					}
				});

				mainApp.$txtImg.eq(idx).addClass("on");
				mainApp.$txtImg.eq(idx).find(".bottom").css({"background-position" :  "0 " + (-$thisTop.attr("data-height")+"px")});

				TweenMax.set(mainApp.$txtImg.eq(idx).find(".top"), { opacity:0, y:0, force3D:true });
				TweenMax.set(mainApp.$txtImg.eq(idx).find(".bottom"), { opacity:0, y:0, force3D:true });
				TweenMax.to( mainApp.$txtImg.eq(idx).find(".top"), .7 , {  delay:.5, opacity:1, y:0});
				TweenMax.to( mainApp.$txtImg.eq(idx).find(".bottom"), .7 , { delay:.5, opacity:1, y:0});

			}else{
				// flip PC
				TweenMax.to( $prevTop, .5 , {  height : 0});
				TweenMax.to( $prevBottom, .5 , {  height: 0, 
					onComplete:function(){
						mainApp.$txtImg.eq(prevIdx).removeClass("on");
					}
				});

				mainApp.$txtImg.eq(idx).addClass("on");
				mainApp.$txtImg.eq(idx).find(".bottom").css({"background-position" :  "0 " + (-$thisTop.attr("data-height")+"px")});

				TweenMax.set(mainApp.$txtImg.eq(idx).find(".top"), { height : 0});
				TweenMax.set(mainApp.$txtImg.eq(idx).find(".bottom"), { height: 0});
				TweenMax.to( mainApp.$txtImg.eq(idx).find(".top"), .7 , {  delay:.6, height:$thisTop.attr("data-height"), ease : Expo.easeOut});
				TweenMax.to( mainApp.$txtImg.eq(idx).find(".bottom"), .7 , { delay:.6, height:$thisBottom.attr("data-height"),ease : Expo.easeOut});
			}
			
			//fade Ver.1
			mainApp.$txtBodyImg.find("div").each(function(idx){
                $(this).css("opacity","1"); /* 2016-11-03 : 박스메뉴 클릭시 텍스트 투명도 초기화 */
				TweenMax.to($(this), .5, { delay:idx*.15+.9, opacity:.3, yoyo:true, repeat:1 });
			});
		})();
		
		mainApp.shortcutEvent = (function(e){
			mainApp.$shortcut.find("li.on").removeClass("on");
			mainApp.$shortcut.find("li").eq(idx).addClass("on");
		})();
	};
    
	mainApp.timerEvent = (function(e){
        
		mainApp.timerPlay = true; //autoPlay
		mainApp.timerControl = mainApp.$main.find(".rollingControl button");
		mainApp.sectorLineT = mainApp.$sectorList.find(".line_01");
		mainApp.sectorLineB = mainApp.$sectorList.find(".line_02");
		
		var timerIdx = mainApp.$sectorList.filter(".on").index()+1;
		
		mainApp.timerControlEvent = function(){
			timerIdx = mainApp.$sectorList.filter(".on").index()+1;
			
			if(timerIdx == mainApp.$sectorList.length){
				timerIdx = 0;
			}
			
			mainApp.controlEvent(mainApp.$sectorList.eq(timerIdx));
			mainApp.timerLoadEvent(timerIdx);
			TweenMax.delayedCall(6, mainApp.timerControlEvent);
		};
		
		
		
		if(mainApp.timerPlay){
			TweenMax.delayedCall(9.3, mainApp.timerControlEvent);
		}else{
			mainApp.timerControl.attr("class","play").text("재생");
		}
		
		function timerControl(){			
			var $this = $(this);
			var cls = $this.attr("class");
			
			switch (cls){
				case "play" :
                    
					$this.attr("class","stop").text("멈춤");
					TweenMax.delayedCall(6, mainApp.timerControlEvent);
					timerIdx = mainApp.$sectorList.filter(".on").index();
					mainApp.timerLoadEvent(timerIdx);
					mainApp.timerPlay = true;
				break;
				case "stop" :
					var back = new mainApp.timerLoadEvent();
					back.comback();
					
					$this.attr("class","play").text("재생");
					TweenMax.killTweensOf(mainApp.timerControlEvent);
					mainApp.timerPlay = false;
				break;
			}
		}
		
		mainApp.timerControl.on("click",timerControl);
	}());
	
	// sector LoadBar
	mainApp.timerLoadEvent = function(idx){        
        
		if(!idx) idx = 0;
		var lineT = mainApp.$sectorList.eq(idx).find(".line_01");
		var lineB = mainApp.$sectorList.eq(idx).find(".line_02");
		var lineTall = mainApp.$sectorList.find(".line_01");/* 2016-11-03 : 전체라인 변수 지정 */
        var lineBall = mainApp.$sectorList.find(".line_02");/* 2016-11-03 : 전체라인 변수 지정 */
        
        lineTall.css({"display":"none","width":"0","height":"0"});/* 2016-11-03 : 타이머 시작 라인 초기화 */
        lineBall.css({"display":"none","width":"0","height":"0"});/* 2016-11-03 : 타이머 시작 라인 초기화 */
        
		lineT.css("display","block");
		TweenMax.to( lineT, 1.5, { width: 100+"%" });
		TweenMax.to( lineT, 1.5, { delay:1.5, height: 100+"%", onComplete:function(){
			lineB.css("display","block");
		}});
		TweenMax.to( lineB, 1.5, { delay:3, width: 100+"%"});
		TweenMax.to( lineB, 1.5, { delay:4.5, height: 100+"%",
			onComplete:function(){                
                
				lineT.css({"display":"none","width":"0","height":"0"});
				lineB.css({"display":"none","width":"0","height":"0"});
			}
		});

		return {
			comback : function(){
				TweenMax.killTweensOf(mainApp.$sectorList.find(".line_01,.line_02"));
				mainApp.$sectorList.find(".line_01,.line_02").css({"display":"none","width":"0","height":"0"});
			}
		}
	};
	
	mainApp.overEvent = function(e){
		var $this = $(this),
			$over = $this.find(".over");
		if($this.hasClass("on")) return;
		
		var cls = $this.attr("class");
		$over.show();
		
		if(cls.indexOf("construction") > -1){
			TweenMax.set($over,{x : 100+"%"});
			TweenMax.to($over,.5,{x : 0+"%"});
		}else if(cls.indexOf("trading") > -1){
			TweenMax.set($over,{x : -100+"%"});
			TweenMax.to($over,.5,{x : 0+"%"});
		}else if(cls.indexOf("fashion") > -1){
			TweenMax.set($over,{y : 100+"%"});
			TweenMax.to($over,.5,{y : 0+"%"});
		}else if(cls.indexOf("resort") > -1){
			TweenMax.set($over,{y : -100+"%"});
			TweenMax.to($over,.5,{y : 0+"%"});
		}
	}
	mainApp.outEvent = function(e){
		var $this = $(this),
			$over = $this.find(".over");
		if($this.hasClass("on")) return;
		
		var cls = $this.attr("class");
		
		if(cls.indexOf("construction") > -1){
			TweenMax.to($over,.5,{x : 100+"%"});
		}else if(cls.indexOf("trading") > -1){
			TweenMax.to($over,.5,{x : -100+"%"});
		}else if(cls.indexOf("fashion") > -1){
			TweenMax.to($over,.5,{y : 100+"%"});
		}else if(cls.indexOf("resort") > -1){
			TweenMax.to($over,.5,{y : -100+"%"});
		}
		
	};
	
	
	mainApp.resizeEvent = function(e){
		var $window = $(window),
			_windowWIDTH = $window.width();
		
		if(_windowWIDTH >= 768){
			mainApp.$txtImg.find(".top").attr("data-height","46");
			mainApp.$txtImg.find(".top").css("height","46px");
			mainApp.$txtImg.find(".bottom").attr("data-height","45");
			mainApp.$txtImg.find(".bottom").css("height","45px");
		}else{
			mainApp.$txtImg.find(".top").attr("data-height","22");
			mainApp.$txtImg.find(".top").css("height","22px");
			mainApp.$txtImg.find(".bottom").attr("data-height","21");
			mainApp.$txtImg.find(".bottom").css("height","21px");
		}
	}
	
	$(window).on("resize",mainApp.resizeEvent);
	mainApp.$sectorList.on("click",mainApp.controlEvent);
    
    
    if(!device.check){/* 2016-11-03 : ios 마우스오버클릭이벤트 중첩오류로 마우스오버이벤트는 웹에서만 처리 */
        mainApp.$sectorList.on("mouseenter",mainApp.overEvent);
	    mainApp.$sectorList.on("mouseleave",mainApp.outEvent);
    }
}

// 메뉴
gnbApp.event = function (){

	gnbApp.$header = conApp.$wrap.find(".header");
	gnbApp.$megaMenu = conApp.$wrap.find(".megaMenu");
	gnbApp.$megaMenuContainer = gnbApp.$megaMenu.find(".container");
	
	gnbApp.$megaMenuShowBtn = conApp.$wrap.find(".btnMenuView");
	gnbApp.$megaMenuHideBtn = gnbApp.$megaMenu.find(".btnMenuClose");
	gnbApp.$megaMenuDepth = $(".depth01 > li");
	gnbApp.$megaMenuDepth02 = $(".depth02 > li");

	gnbApp.$utility = conApp.$wrap.find(".utility");

	gnbApp.debounce = null;

	gnbApp.$megaMenuShowEvent = function(e){
		$("body").css("overflow-y","hidden");
		gnbApp.$megaMenu.addClass("active");
		gnbApp.$megaMenuDepth.eq(0).addClass("active");
		TweenMax.set( gnbApp.$megaMenuContainer,{x:gnbApp.$megaMenuContainer.width(),force3D:true});
		TweenMax.to( gnbApp.$megaMenuContainer, .5, { x:0, ease:Power1.easeOut });
		
	}
	
	gnbApp.$megaMenuHideEvent = function(e){
		TweenMax.to( gnbApp.$megaMenuContainer, .5, { 
			x:gnbApp.$megaMenuContainer.width(),
			onComplete:function(){
				gnbApp.$megaMenuContainer.removeAttr("style");
				gnbApp.$megaMenu.removeClass("active");
				gnbApp.$megaMenu.find(".depth01>li.active").removeClass("active");
				$("body").css("overflow","auto");
			}
		})
		
		gnbApp.$megaMenu.removeClass("mobile");
	}

	gnbApp.$megaMenuClickEvent01 = function(e){
		if(!$(this).hasClass("active")){
			$(this).addClass("active").siblings().removeClass("active").find(".depth02 li").removeClass("active");
		} else {
			$(this).removeClass("active").find(".depth02 li").removeClass("active");
		}
	}

	gnbApp.$megaMenuClickEvent02 = function(e){
		if(!$(this).hasClass("active")){
			$(this).addClass("active").siblings().removeClass("active")
		} else {
			$(this).removeClass("active");
		}
		e.stopPropagation();		
	}

	gnbApp.$megaMenuOverEvent01 = function(e){
		gnbApp.$megaMenu.addClass("active");
		$(this).addClass("active").siblings().removeClass("active").find(".depth02 li").removeClass("active")
	}
	// gnbApp.$megaMenuOverEvent02 = function(e){
	// 	$(this).addClass("active").siblings().removeClass("active");
	// 	e.stopPropagation();	
	// }

	gnbApp.$headerMouseLeaveHideEvent = function(){
		gnbApp.$megaMenu.removeClass("active").find("li").removeClass("active");
	}
		
	gnbApp.scrollEventHandler = function(){
		
		var $that = $(this);

		if(gnbApp.debounce) {
			clearTimeout(gnbApp.debounce)
		}



			var sTop = $that.scrollTop();

			var headerHeight = $("header").outerHeight(true);

			if(sTop >= headerHeight) {
				TweenMax.to(gnbApp.$header, .35, { y: - headerHeight, ease:Power1.easeOut})			
			} else {
				TweenMax.to(gnbApp.$header, .35, { y: 0, ease:Power1.easeOut, onComplete:function(){
					gnbApp.$header.removeAttr("style");
				}})
			}
	}

	gnbApp.headerFixedScrollEventHandler = function(){
		gnbApp.$header.trigger("mouseleave");

		var sTop = $(this).scrollTop();

		var $searchWrap = conApp.$wrap.find(".searchWrap"),
			$pcMenuWrap = conApp.$wrap.find(".pcMenuWrap");


		//console.log('scrollTop: '+ sTop, 'offsetTop: '+ $pcMenuWrap.prop('offsetTop'), 'offset.top: '+ $pcMenuWrap.offset().top)

		if( sTop >= 1) {
			$searchWrap.addClass("fixed")
		} else {
			$searchWrap.removeClass("fixed")
		}
		if( sTop > ($(".contentsTop").outerHeight(true) - $(".searchWrap").outerHeight(true)) ) {
			$pcMenuWrap.addClass("fixed")
		} else {
			$pcMenuWrap.removeClass("fixed");
		}
		if($(".wrap").hasClass("main")) {
			if (sTop > ($(".mainVisual").outerHeight(true) - $(".searchWrap").outerHeight(true))) {
				$searchWrap.addClass("fixed")
			} else {
				$searchWrap.removeClass("fixed")
			}
		}
		

	}

	/* @mediaQuery
	 *
	 * PC: window.matchMedia("(min-width:1024px) and all")
	 * TABLET: window.matchMedia("(min-width:812px) and (max-width:1023px)")
	 * 
	 */
	
	var pcMQ = Utils.getMediaQuery('pc'),
		tabletMQ = Utils.getMediaQuery('tablet');

	function init(){

		// default Click Event
		gnbApp.$megaMenuDepth02.on("click", gnbApp.$megaMenuClickEvent02);

		if(pcMQ.matches) { // PC 해상도 일 때
			matchedIsPC();
		} else { // PC 해상도가 아닐 때
			tabletMQ.matches ? matchedIsTablet() : matchedIsMobile();
		}

		pcMQ.addListener(function(mql){
			mql.matches && matchedIsPC();
		})

		tabletMQ.addListener(function(mql){
			mql.matches ? matchedIsTablet() : pcMQ.matches ? matchedIsPC() : matchedIsMobile();
		})

	}

	init();

	function matchedIsPC(){
		console.log('is PC')

		$(".contents").removeAttr("style")
		gnbApp.$megaMenuShowBtn.off("click");
		gnbApp.$megaMenuHideBtn.off("click");
		gnbApp.$megaMenuDepth.off("click");

		gnbApp.$megaMenuDepth.off("mouseenter").on("mouseenter", gnbApp.$megaMenuOverEvent01);
		gnbApp.$header.off("mouseleave").on("mouseleave", gnbApp.$headerMouseLeaveHideEvent);

		gnbApp.$header.trigger("mouseleave")

		gnbApp.$megaMenuDepth.off("focusin").on("focusin", function(){
			$(this).trigger("mouseenter")
		})

		gnbApp.$utility.find("li").eq(0).off("focusin").on("focusin", function(){
			gnbApp.$header.trigger("mouseleave");
		})

		gnbApp.$utility.find("li").off("keydown").on("keydown", function(e){
			if(e.shiftKey && e.keyCode === 9){
				gnbApp.$megaMenuDepth.trigger("mouseenter");
				gnbApp.$megaMenuDepth02.trigger("mouseenter");
			}
		})

		$(window).off("scroll").on("scroll", gnbApp.headerFixedScrollEventHandler);
		conApp.$body.removeAttr("style");
	};

	function matchedIsTablet(){
		console.log('is Tablet')

		$(window).off("scroll resize.gnb");
		$(".searchWrap").removeClass("fixed");
		$(".pcMenuWrap").removeClass("fixed");
		gnbApp.$header.off("mouseleave")
		
		gnbApp.$megaMenuDepth.off("mouseenter focusin");
		gnbApp.$utility.find("li").eq(0).off("focusin")
		

		gnbApp.$megaMenuShowBtn.off("click").on("click",gnbApp.$megaMenuShowEvent);
		gnbApp.$megaMenuHideBtn.off("click").on("click",gnbApp.$megaMenuHideEvent);
		gnbApp.$megaMenuDepth.off("click").on("click", gnbApp.$megaMenuClickEvent01);


		TweenMax.delayedCall(.35, function(){
			gnbApp.$header.removeAttr("style");
			$(".contents").removeAttr("style");
		})

	}
	
	function matchedIsMobile(){
		console.log('is Mobile')

		gnbApp.$megaMenuShowBtn.off("click").on("click",gnbApp.$megaMenuShowEvent);
		gnbApp.$megaMenuHideBtn.off("click").on("click",gnbApp.$megaMenuHideEvent);
		gnbApp.$megaMenuDepth.off("click").on("click", gnbApp.$megaMenuClickEvent01);

		// var vh = Math.round(((gnbApp.$header.outerHeight(true)) * 100) / $(window).outerHeight(true));
		// var gap = Math.round((14 * 100) / $(window).outerHeight(true));
		// TweenMax.set($(".contents"), { paddingTop: (vh - gap) + 'vh' })

		$(window).off("scroll").on("scroll", gnbApp.scrollEventHandler);


		// 리사이즈 이벤트 후처리
		$(window).on("resize.gnb", function(){
			if(this.resizeTO) {
				clearTimeout(this.resizeTO);
			}

			this.resizeTO = setTimeout(function() {
				$(this).trigger('resizeEnd');
			}, 300);
		})

		$(window).on('resizeEnd', function() {
			// var vh = Math.round(((gnbApp.$header.outerHeight(true)) * 100) / $(window).outerHeight(true));
			// var gap = Math.round((14 * 100) / $(window).outerHeight(true));
			// TweenMax.set($(".contents"), { paddingTop: (vh - gap) + 'vh' })

			var $moTop = $(".moMenuWrap"),
				$moTopH = $moTop.outerHeight(true);

			$(".contents").css("padding-top", $moTopH + 30);
		});

		//아이폰 대응 setTimeout 추가
		setTimeout(function() {
			var $moTop = $(".moMenuWrap"),
			$moTopH = $moTop.outerHeight(true);

			$(".contents").css("padding-top", $moTopH + 30);
		}, 300);
		
	}

	
}


// 왼쪽메뉴
lnbApp.event = function(){
	lnbApp.$pcLnbWrap = $(".pcMenuWrap");
	lnbApp.$pcLnbDepth = lnbApp.$pcLnbWrap.find(".dropdown");
	
	// lnbApp.$moLnbWrap = $(".moLnbWrap");
	// lnbApp.$moLnbDiv = lnbApp.$moLnbWrap.find(".flexContainer>div");
	// lnbApp.$moLnbSelect = lnbApp.$moLnbWrap.find(".select");
	
	lnbApp.$pcLnbListEvent = function(e){
		
		var $this = $(this);
	
		if($this.hasClass("active")){
			$this.toggleClass("active");


			
			return;
		}
		$this.siblings().removeClass("active")
		$this.addClass("active");

		//PC 드롭다운 영역 블러처리
		lnbApp.$pcLnbDepth.on("mouseleave", function(){
			$(this).removeClass("active");
		});
		
	}
	
	// lnbApp.$moLnbListEvent = function(e){
	// 	var $this = $(this);
	// 	if($this.closest("div").hasClass("active")){
	// 		$this.closest("div").toggleClass("active")
	// 		return;
	// 	}
	// 	lnbApp.$moLnbDiv.filter(".active").removeClass("active");
		
	// 	// conApp.openSelectHide
	// 	setTimeout(function(){
	// 		$this.closest("div").addClass("active");
	// 	},10);
		
	// }
	
	
	lnbApp.$pcLnbDepth.on("click",lnbApp.$pcLnbListEvent);
	//lnbApp.$moLnbSelect.on("click",lnbApp.$moLnbListEvent);
	
	//setTimeout(lnbApp.$moLnbListEvent(),10));
	
}


//윤리경영 : 2017-04-07 추가 start
conApp.ethicManage = function(){
	conApp.btnEthic = $(".btnEthic");
	conApp.ethicArea = $(".ethic-manage");
	
	conApp.$ethicAreaEvent = function(e){
		conApp.ethicArea.toggleClass("active");
	}
	
	conApp.btnEthic.on("click",conApp.$ethicAreaEvent);
}


//패밀리맵
conApp.familySite = function(){
	conApp.$btnFamily = $(".btnFamily");
	conApp.$familyArea = $(".familyWrap");
	
	conApp.$familyAreaEvent = function(e){
		conApp.$familyArea.toggleClass("active");
	}
	
	conApp.$btnFamily.on("click",conApp.$familyAreaEvent);
}


//default 탭 : complete
conApp.defaultTabEvent = function(){
	var $defaultTab = conApp.$body.find(".defaultTab");
	var $defaultTabList = $defaultTab.find(".tabCtrlWrap > a");
	var $defaultTabActive = $defaultTabList.filter(".current");
	var defaultTabActiveIdx = $defaultTabList.index($defaultTabActive);
	var $defaultTabCon = conApp.$body.find(".defaultTabCon");
	var $defaultTabConList = $defaultTabCon.find("article");
	var $defaultTabBtn = $defaultTab.find(".select button");
	
	var currentIdx;
	
	$defaultTabConList.eq(defaultTabActiveIdx).show();
	$defaultTabBtn.text($defaultTabList.eq(defaultTabActiveIdx).text());
	
	function defaultTab(){
		var $this = $(this);
		
		if($this.hasClass("current")){
			
			$defaultTab.removeClass("current");
			return;
		}
		
		currentIdx = $defaultTabList.index($this);
		//$defaultTabActive = $defaultTabList.filter(".active");
		//defaultTabActiveIdx = $defaultTabList.index($defaultTabActive);
		
		$this.addClass("current");
		console.log( $defaultTabActive );
		
		console.log( defaultTabActiveIdx );
		$this.siblings().removeClass("current");
		
		$defaultTabConList.hide();
		$defaultTabConList.eq(currentIdx).show();
		
		
		$defaultTabBtn.text($this.text());
		
		
	}
	
	function defaultTabMo(){
		if($defaultTab.hasClass("active")){
			$defaultTab.toggleClass("active");
			return;
		}
		
		setTimeout(function(){
			$defaultTab.addClass("active");
		},10)
	}
	
	$defaultTabList.on("click",defaultTab);
	$defaultTabBtn.on("click",defaultTabMo);
}

//select 탭
conApp.selectTabEvent = function(){
	var $selectTab = conApp.$body.find(".selectTab");
	var $selectTabBtn = $selectTab.find(".select button");
	
	var $selectTabList = $selectTab.find("li");
	var $selectTabActive = $selectTabList.filter(".active");
	var selectTabActiveIdx = $selectTabList.index($selectTabActive);
	
	var $selectTabCon = conApp.$body.find(".selectTabCon");
	var $selectTabConList = $selectTabCon.find("article");

	// 027화면 문의하기 내 selectbox 별도 처리
	var $selectTabD = conApp.$body.find(".selectTab.direct");
	var $selectTabBtnD = $selectTabD.find(".select button");
	var $selectTabListD = $selectTabD.find("li");
	var $selectTabActiveD = $selectTabListD.filter(".active");
	var selectTabActiveIdxD = $selectTabListD.index($selectTabActiveD);
	
	//$selectTabBtn.text($selectTabActive.text())
	$selectTabBtn.text($selectTabList.eq(selectTabActiveIdx).text());
	$selectTabBtnD.text($selectTabListD.eq(selectTabActiveIdxD).text());  // 027화면 문의하기 내 selectbox 별도 처리
	$selectTabConList.eq(selectTabActiveIdx).show();
	
	
	$selectTab.each(function(idx){
		$(this).attr("data-idx", idx).find("li").each(function(){
			TweenMax.set($(this), { attr: { 'data-owner-idx': idx } })
		})
	})


	function selectTab(){
		var $this = $(this);
		if($this.parents(".selectTab").hasClass("active")){
			$this.parents(".selectTab").removeClass("active");
			return;
		}
		
		/* why */
		setTimeout(function(){
			$this.parents(".selectTab").addClass("active");
		},10);
	}
	
	function selectTabListClick(){
		var $this = $(this);

		if($this.parent().hasClass("active")){
			$selectTab.removeClass("active");
			return;
		}
		
		var thisIdx =  $selectTabList.index($this.parent());
		var ownerIdx = $(this).parent("li").data("owner-idx");
		var thisTxt = $this.text();
			$selectTabActive = $selectTabList.filter(".active");
			selectTabActiveIdx = $selectTabList.index($selectTabActive);

		$selectTabActive.removeClass("active");
		$this.parent().addClass("active");
		
		$selectTab.filter("[data-idx="+ownerIdx+"]").find($selectTabBtn).text(thisTxt);
		
		$selectTabActive.removeClass("active");
		
		$selectTabConList.eq(thisIdx).show();
		$selectTabConList.eq(selectTabActiveIdx).hide();
		
		$selectTab.removeClass("active");
	}
	
	$selectTabBtn.on("click",selectTab);
	$selectTabList.on("click","a",selectTabListClick);
}

//아코디언
conApp.accordionEvent = function(){
	
	var acc = $(".accordion");
    var i;
 
    for (i = 0; i < acc.length; i++) {
 
        // 첫번째 아코디언 open
        if (acc.eq(i).hasClass("active")) {
            var panelOpen = $(".accordion.active").next();
            panelOpen.css({"max-height" : panelOpen.prop("scrollHeight") + "px"}); //열기
        }
 
        acc.eq(i).on("click", function() {
            $(this).toggleClass("active");
            var panel = $(this).next();
            if ( $(this).hasClass("active") ){
                panel.css({"max-height" : panel.prop("scrollHeight") + "px"}); //열기
            } else { 
                panel.css({"max-height" : 0}); //닫기
            } 
        });
    }

	

	
}

// 열려있는 select닫아주기
conApp.openSelectHide = function(){
	
	
	var openTarget = [
		{ selector : conApp.$wrap.find(".flexContainer>div")},
		{ selector : conApp.$body.find(".defaultTab") },
		{ selector : conApp.$body.find(".selectTab") }
	];
	
	function openTargetHideEvent(){
		for (var key in openTarget){
			openTarget[key].selector.removeClass("active");
		}
	}
	
	$("body").on("click",openTargetHideEvent);
	
};

//formToggle & Focus
conApp.formToggle = function(){
	$(".btnDefaultForm").on("click",function(){
		$(".grayWrap").toggle();
		$(".grayWrap").find("input:first").focus();
	});
};

//btnSearchView
conApp.btnSearchView = function(){
	var $searchWrap = conApp.$body.find(".searchWrap");
	var $btnSearchView = $searchWrap.find(".btnSearchView");
	var $btnSearchClose = $searchWrap.find(".btnSearchClose");
	var $searchArea = $searchWrap.find(".searchArea");
	var searchAreaHeight = $searchArea.height();
	var btnSearchView;
	
	
	
	function searchAreaView(){
		if(!$searchArea.hasClass("active")){
			$searchArea.addClass("active");
			TweenMax.set($searchArea,{height:0,display:"block"});
			TweenMax.to($searchArea,.35,{height:searchAreaHeight});
		}else{
			searchAreaViewClose();
		}
	}
	
	function searchAreaViewClose(){
		TweenMax.to($searchArea,.35,{height:0,
			onComplete:function(){
				$searchArea.removeClass("active");
			}
		});
	}
	
	$btnSearchView.on("click",searchAreaView);
	$btnSearchClose.on("click",searchAreaViewClose);
}

//layerPopup
conApp.layerEvent = function(){
    
    var device = new MobileCheck();   
    var layerOpen = false;
    var listLast = false;
    //open
    $(".layerBtn").click(function() {
        
        var $layerTit = $(this).parent().find('.contTit').text();
        var $layerImg = $(this).parent().find('.imgWrap').children().clone();
        var $layerProf01 = $(this).parent().find('.dashList01').children().clone();
        var $layerProf02 = $(this).parent().find('.dashList02').children().clone();
        var $layerLoc = $(this).parent().offset();
        var $padding = $("#popupWrap").css('padding-left');
        var $listLen = $(this).parent().find('.dashList02 li').length;  
        $("#popup").slideDown(0);
        $("#popupWrap").css({            
            'left':$layerLoc.left - parseInt($padding)
        });
        
        if(device.check){
            $("#popupWrap").css('top',$layerLoc.top-65);
        }else{
            $("#popupWrap").css('top',$layerLoc.top-154);
        }

        if($(this).parent().index()==$(this).parent().parent().find('section').length-1){
            $(this).parent().css('padding-bottom',"300px");
            listLast = true;            
        }
        
        $("#popup").find('h3').text($layerTit);
        $("#popup").find('.imgArea').html($layerImg);
        $("#popup").find('.profList01').empty().append($layerProf01);
        $("#popup").find('.profList02').empty().append($layerProf02);
        
        layerOpen = true;
    });
    //close
    $("#bg, .btn-close").click(function(){
        
        $("#popup").slideUp(0);
        $("#popupWrap").css('margin','0');
        
        $("#popupWrap").css('position','relative');
        if(listLast){
            $('section:last-child').css('padding-bottom','41px')
        }
        
        
        layerOpen = false;
    });    
    
    onResize = function(e){
        if(layerOpen){
            $("#popupWrap").css({
                'left':'auto',
                'margin':'0 auto'
            });            
        }
    }        
    $(window).on("resize",onResize);
    
}

conApp.imgTabEvent = function(){
	var wrapperClass = '.dirListBox',
		imgClass = '.dirListImg',
		anchorClass = '.dirListName',
		activeClass = 'active',
		offClass = 'off',
		directCon = '.directCon',
		contents = '.layerList',
		contentsWidth,
		directConW = function() {
			contentsWidth = $(contents).width();
			$(directCon).css({width : contentsWidth});
		};

	var handler = function(){
		if($(this).parent(wrapperClass).toggleClass(activeClass).hasClass(activeClass)) {
			$(this).parent(wrapperClass).removeClass(offClass).siblings().removeClass(activeClass).addClass(offClass);
		} else {
			$(this).parent(wrapperClass).siblings().removeClass(offClass);
		}		
		directConW();
	}	
	
	$(window).on('resize.imgTabEvent', directConW)
	$(anchorClass).on("click", handler)
	$(imgClass).on("click", handler)


}

//서브 비주얼 영역
conApp.swiper = function(){

	var swiper = new Swiper('.swiper-container', {
		wrapperClass: "swiper-wrapper",
		slideClass: "swiper-slide",
		pagination: ".swiper-pagination",
		paginationClickable: true,
		autoplayDisableOnInteraction: false,
		autoplay: 3000,
		loop: true,
		speed: 1000, // 2018-07-02 옵션 추가
		effect: 'fade',  // 화면전환 변경
		onInit: function (swiper) {
			console.log(swiper.slides);
			var len = swiper.slides.length-2; // total
			var counter = $('.swiper-counter');
			var count = $('<span class="count">1</span><span class="total"> / '+ len +'</span>');
			counter.append(count);
		},
		onSlideChangeStart: function (swiper) {
			var index = swiper.realIndex+1 ; // 현재 활성화 idx
			$('.count').text(index);
		}
	});

}


$(function() {
	conApp.$body = $("body");
	conApp.$wrap = $(".wrap");
	conApp.width = $(window).outerWidth();
	
	
	if(conApp.width > 1024){
		if (hasJqObject(conApp.$wrap.find(".intro"))){ introApp.event();}
	}else{
		if (hasJqObject(conApp.$wrap.find(".main"))){ mainApp.event();}
	}
	/* if (hasJqObject(conApp.$wrap.find(".main"))){ mainApp.event();} */
	if (hasJqObject(conApp.$wrap.find(".megaMenu"))){ gnbApp.event();} //gnb
	if (hasJqObject(conApp.$wrap.find(".pcMenuWrap"))){ lnbApp.event();} //lnb
    if (hasJqObject(conApp.$wrap.find(".btnEthic"))){ conApp.ethicManage();} //Ethic : 2017-04-07 추가
	if (hasJqObject(conApp.$wrap.find(".btnFamily"))){ conApp.familySite();} //family
	if (hasJqObject(conApp.$body.find(".defaultTab"))){ conApp.defaultTabEvent();} //defaulTab
	if (hasJqObject(conApp.$body.find(".selectTab"))){ conApp.selectTabEvent();} //selectTab
	if (hasJqObject(conApp.$body.find(".accordion"))){ conApp.accordionEvent();} //accordion
	if (hasJqObject(conApp.$body.find(".btnDefaultForm"))){ conApp.formToggle();} //formToggle
	if (hasJqObject(conApp.$body.find(".btnSearchView"))){ conApp.btnSearchView();} //formToggle
	if (hasJqObject(conApp.$body.find(".layerList"))){ conApp.layerEvent();} //layerPopup
	if (hasJqObject(conApp.$body.find(".directorList"))){ conApp.imgTabEvent(); } // 위원회 image Tab Toggle
	if (hasJqObject(conApp.$body.find(".swiper-container"))){ conApp.swiper(); } //서브 비주얼 영역

	conApp.openSelectHide();
	
	
});



	
	
