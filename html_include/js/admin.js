// 관리자 메뉴 : 기본 기능만 작업

var conApp = conApp || {}
var appEvent = appEvent || {
	CLICK : "click"
}

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

/* LNB */
conApp.lnbEvent = function (){
	conApp.$menuWrap = conApp.$wrap.find(".menuWrap");
	conApp.$gnbMenu = conApp.$menuWrap.find(".gnbMenu");
	conApp.$gnbMenuList = conApp.$gnbMenu.find(">li");
	conApp.$subMenu = conApp.$gnbMenu.find(".subMenu");
	
	conApp.$gnbMenuEvent = function(e){
		var $this = $(this);
		var $current = $this.parents("li");
		conApp.$gnbMenuList.removeClass("active");
		$current.addClass("active");
	}

	conApp.$subMenuEvent = function(e){
		var $this = $(this);
		conApp.$subMenu.find("li a").removeClass("active");
		$this.addClass("active");
	}

	conApp.$gnbMenu.on(appEvent.CLICK, "h2 a", conApp.$gnbMenuEvent);
	conApp.$subMenu.on(appEvent.CLICK, "li a", conApp.$subMenuEvent);
}


/* 캘린더 button 이벤트 */
conApp.calendarArea = function(){
	conApp.btnInputForm = conApp.$wrap.find(".btnFormArea");

	conApp.btnEvent = function(){
		var $this = $(this);
		conApp.btnInputForm.find("button").removeClass("active");
		$this.addClass("active");
	}

	conApp.btnInputForm.on(appEvent.CLICK, "button", conApp.btnEvent);
};


$(function(){
	conApp.$wrap = $("#wrap");
	if (hasJqObject(conApp.$wrap.find(".menuWrap"))){ conApp.lnbEvent();} //LNB
	if (hasJqObject(conApp.$wrap.find(".searchWrap"))){ conApp.calendarArea();} 
});
