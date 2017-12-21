/*

TouchSlide plugin

*/

//reference outside of plugin - $('.classname').data('plugin-touch-slide').functionName(arguments);

/*
----------------- HTML STRUCTURE -----------------

<div class = "holder">
	<div data-touch-slide = "{}">
		<div class = "slide">
	    </div>
		<div class = "slide">
	    </div>
	</div>
</div>

--------------------------------------------------
*/

/*

Requires: TweenMax

*/

;(function( $ ) {
	
	var name = "plugin-touch-slide";

	function TouchSlideController(element, settings){

		this.element = $(element);
		
		this.defaults = {
			speedThreshold: 500,
			firstTouchThreshold: 0,
			speed: 0.35,
			resistance: 0.5,
			selector: ".slide",
			drag: false,
			touch: true,
			navSelector: "",
			prevArrowSelector: "",
			nextArrowSelector: "",
      useKeyboard: true,
			autoplay: false,
			autoplayDuration: 4,
			pauseOnClick: true,
			vertical: false,
			mouseWheel: false,
      scrollThreshold: 1,
      pageRatio: 1,
      rotateOnDrag: 1,
      createNavigation: {create: false, wrapper:{open:"", close:""}, navigationItem:"", navSelector:""}
		};

		var meta = this.element.data('touch-slide');
		this.options = $.extend({}, this.defaults, settings, meta);
		this.element.data(name, this);

		
		this.pagePanel = this.element;
		this.innerPageSize = 100;
		this.settingUp = true;
		this.animating = false;
		this.currentIndex = 0;
		this.pages = $(this.options.selector, this.element);
		this.totalPages = this.pages.length - 1;
		this.stepTouch = {first:true, second:true};	
		this.pageSize = 0;//this.element.parent().outerWidth();
		this.points = [];
		this.paused = false;
		this.autoTween = null;
		this.moveValue = 1;
        this.wrapperElement = this.element.parent();

        this.element.imagesLoaded(jQuery.proxy(this, "init"));

		
	}
	
    TouchSlideController.prototype = {
		
        init:function(args){

            $(window).resize(jQuery.proxy(this, "resized"));
            this.resized();

            
            if(this.options.touch) this.initTouch();
            if(this.options.drag) this.initDrag();
            if(this.options.navSelector.length > 1) this.addNavigation();
            if(this.options.mouseWheel) this.addMouseWheel();
            //if(this.options.autoplay) this.setUpAutoplay();
            if(this.options.createNavigation.create) this.createNavigation();
            
            if(this.options.useKeyboard) $(document).keyup(jQuery.proxy(this, "keyboardUp"));


            this.addArrowNavigation();
            
            this.addActiveClasses(this.currentIndex);
        
        },
		
		resized: function(){
			
			if(this.options.vertical){
				
				this.pageSize = this.wrapperElement.outerHeight();
				
				this.element.css({height: this.pageSize * (this.totalPages + 1)});
				this.pages.css({height: this.pageSize});
				this.pages.each(jQuery.proxy(this, "alignPages"));
			
			} else {
				
				this.pageSize = this.wrapperElement.outerWidth();
				this.innerPageSize = this.wrapperElement.outerWidth() * this.options.pageRatio;
				this.pageSizeOffset = (this.pageSize - this.innerPageSize) / 2;
				
				this.element.css({width: this.innerPageSize * (this.totalPages + 1)});
				this.pages.css({width: this.innerPageSize});
				this.pages.each(jQuery.proxy(this, "alignPages"));
				
			}
			
			if(!this.animating) this.resetToPosition(true);
			
		},
	
		alignPages: function(index){
			
			if(this.options.vertical){
				this.pages.eq(index).css({top: this.innerPageSize * index});
			} else {
				this.pages.eq(index).css({left: this.pageSizeOffset + (this.innerPageSize * index)});
			}

			var event = jQuery.Event( "alignPages" );
			event.currentIndex = this.currentIndex;
			this.element.trigger(event);
			
		},
		
		addNavigation: function(){
			this.nav = $(this.options.navSelector);
			this.nav.on("tap", jQuery.proxy(this, "navClicked"));
		},
        
    createNavigation: function(){
			var content = this.options.createNavigation.wrapper.open;
            for(var i = 0; i<this.pages.length; i++){
                content+=this.options.createNavigation.navigationItem;   
            }
            content += this.options.createNavigation.wrapper.close;
            this.wrapperElement.append(content);
            this.nav = $(this.options.createNavigation.navSelector);
			this.nav.click(jQuery.proxy(this, "navClicked"));
		},
        
    addArrowNavigation: function(){
          if(this.options.nextArrowSelector.length > 1){
			this.nextArrow = $(this.options.nextArrowSelector).on("tap", jQuery.proxy(this, "nextArrowClicked"));
		}
         if(this.options.prevArrowSelector.length > 1){
            this.prevArrow = $(this.options.prevArrowSelector).on("tap", jQuery.proxy(this, "prevArrowClicked"));
         }   
      },
      
      keyboardUp: function(event) {
          var key = event.keyCode;
          switch(key){
              case 39: // 'RIGHT'
                  if(!this.options.vertical) this.moveDirection(1);
                  break;
              case 37: // 'LEFT'
                  if(!this.options.vertical) this.moveDirection(-1);
                  break;
              case 38: // 'UP'
                  if(this.options.vertical) this.moveDirection(-1);
                  break;
              case 40: // 'DOWN'
                  if(this.options.vertical) this.moveDirection(1);
                  break;
          }
          
      },
		
		addMouseWheel: function(){
			$.window.on("wheel mousewheel", jQuery.proxy(this, "mouseWheeled"));
		},
		
		mouseWheeled: function(event){
            if(this.animating) return;
            var delta = event.originalEvent.wheelDeltaY||-event.originalEvent.deltaY;
            /*if (delta > this.options.scrollThreshold){
                this.moveDirection(1);
            } else if (delta < this.options.scrollThreshold){
                this.moveDirection(-1);
            }*/
            0 > delta ? this.moveDirection(1) : delta > 0 && this.moveDirection(-1);
            
		},
		
		/*-------------
		
		ALL TOUCH CONTROLS
		
		---------------*/
		
		initTouch:function(){
			
			this.setupMoving();
			this.pagePanel.bind('touchstart', jQuery.proxy(this, "firstTouch"));
			
		},
		
		/* ---------  */
		firstTouch:function(event){
			TweenLite.killTweensOf(this.element);
			this.stopAnimating();
			if(this.animating){
				return;
			} else {
				this.resetMoveObject(event.originalEvent.changedTouches[0]);
				this.pagePanel.bind('touchmove', jQuery.proxy(this, "touchMoved"));
				this.pagePanel.bind('touchend', jQuery.proxy(this, "touchEnded"));
			}
			
		},
		
		/* ---------  */
		touchMoved:function(event){
			
			this.updateMoveObject(event.originalEvent.changedTouches[0]);
			if(this.checkThreshold()){
				this.getMoving(event);
			} else {
				return true;
			}
			
		},
		
		/* ---------  */
		touchEnded:function(event){
			
			this.pagePanel.unbind('touchmove', jQuery.proxy(this, "touchMoved"));
			this.checkEnd(event.originalEvent.changedTouches[0]);
			this.pagePanel.unbind('touchend', jQuery.proxy(this, "touchEnded"));
			
		},
		
		/*-------------
		
		ALL DRAG CONTROLS
		
		---------------*/
		
		initDrag:function(){
			
			this.setupMoving();
			this.pagePanel.bind('mousedown', jQuery.proxy(this, "firstDrag"));
			
		},
		
		/* ---------  */
		firstDrag:function(event){
			
			if(this.animating){
				return;
			}else{
				this.resetMoveObject(event);
				this.pagePanel.bind('mousemove', jQuery.proxy(this, "dragMoved"));
				$.window.bind('mouseup', jQuery.proxy(this, "dragEnded"));
				
			}
			
		},
		
		/* ---------  */
		dragMoved:function(event){
			
			this.updateMoveObject(event);
			if(this.checkThreshold()){
				this.getMoving(event);
			} else {
				return true;
			}
			
		},
		
		/* ---------  */
		dragEnded:function(event){
			
			this.pagePanel.unbind('mousemove', jQuery.proxy(this, "dragMoved"));
			this.checkEnd(event);
			$.window.unbind('mouseup', jQuery.proxy(this, "dragEnded"));
			
		},	
		
		/* ---------  */
		setupMoving: function(){
			/* setup moving object */
			
			this.moveObject = {
				start: {x: 0, y: 0},
				current: {x: 0, y: 0},
				end: {x: 0, y: 0},
				change: 0
			}
		},
		
		/* ---------  */
		savePoint: function(){
			
			var newTime = new Date();
			var point = {x:this.moveObject.current.x, y:this.moveObject.current.y, time:newTime.getTime()}
			this.points.push(point);
			if(this.points.length > 20) this.points.shift();
			
		},
		
		/* ---------  */
		resetMoveObject: function(obj){

			this.stepTouch = {first:true, second:true};
			this.moveObject.originalPosition = this.element.position();
				
			this.moveObject.start.x = obj.pageX;
			this.moveObject.start.y = obj.pageY;
			
			this.updateMoveObject(obj);
				
			this.time = 0;
			
			this.time = new Date();
			this.points = [];
			
		},
		
		/* ---------  */
		updateMoveObject: function(obj){
			
			if(this.options.vertical){
				this.moveObject.change = obj.pageY - this.moveObject.start.y;
			} else {
				this.moveObject.change = obj.pageX - this.moveObject.start.x;
			}
			this.moveObject.current.x = obj.pageX
			this.moveObject.current.y = obj.pageY;
			this.savePoint();
			
		},
		
		/* ---------  */
		checkThreshold: function(){
			// after second movement, threshold is established
			if(!this.stepTouch.second) return true;
			// ignore first movement, often misinterpreted
			if(this.stepTouch.first){
				this.stepTouch.first = false;
				return false;
			}
			
			// FOR HORIZONTAL SCROLLING		
			// is x change bigger than y change? If not then scrolling vertically
			if((Math.abs(this.moveObject.start.x - this.moveObject.current.x) < Math.abs(this.moveObject.start.y - this.moveObject.current.y)) && !this.options.vertical){
				this.unBindEvents();
				return false;
			}
			
			// FOR VERTICAL SCROLLING	
			// is y change bigger than x change? If not then scrolling horizontally
			if((Math.abs(this.moveObject.start.y - this.moveObject.current.y) < Math.abs(this.moveObject.start.x - this.moveObject.current.x)) && this.options.vertical){
				this.unBindEvents();
				return false;
			}
			
			// is there enough movement to justify intent - (first touch ignored)?
			if(Math.abs(this.moveObject.change) < this.options.firstTouchThreshold && this.stepTouch.second){
				this.unBindEvents();
				return false;
			}
			
			this.stepTouch.second = false;
			return true;
		},
		
		unBindEvents: function(){
			this.pagePanel.unbind('touchmove', jQuery.proxy(this, "touchMoved"));
			this.pagePanel.unbind('touchend', jQuery.proxy(this, "touchEnded"));
			this.pagePanel.unbind('mousemove', jQuery.proxy(this, "dragMoved"));
			$.window.unbind('mouseup', jQuery.proxy(this, "dragEnded"));
		},
		
		/* ---------  */
		getMoving: function(event){
			
			if(this.options.vertical){
				var distance = this.moveObject.current.y - this.moveObject.start.y;
			} else {
				var distance = this.moveObject.current.x - this.moveObject.start.x;
			}
			
			if((this.currentIndex == 0 && distance > 0) || (this.currentIndex == this.totalPages && distance < 0)){
				this.moveObject.change *= this.options.resistance;
			}
			
			var targetProperty = this.options.vertical ? this.moveObject.originalPosition.top : this.moveObject.originalPosition.left;
			var value = targetProperty + this.moveObject.change;
			
			event.preventDefault();
			this.moveScrolled(value);		
			this.time++;
			
		},
		
		/* ---------  */
		checkEnd: function(obj){
			
			this.savePoint();
					
			this.element.removeClass("stopSelection");
			
			var secondLastPoint = this.points[Math.max(0, this.points.length-3)];
			var lastPoint = this.points[this.points.length-1];
			var firstPoint = this.points[0];
			
			this.moveObject.end.x = obj.pageX;
			this.moveObject.end.y = obj.pageY;
			
			if(this.options.vertical){
				var distance = this.moveObject.end.y - this.moveObject.start.y;
				var lastDistance = Math.abs(lastPoint.y - firstPoint.y);
				var distanceMetric = Math.abs(lastPoint.y - secondLastPoint.y) > 0 ? (lastPoint.y - secondLastPoint.y) : distance;
			} else {
				var distance = this.moveObject.end.x - this.moveObject.start.x;
				var lastDistance = Math.abs(lastPoint.x - firstPoint.x);
				var distanceMetric = Math.abs(lastPoint.x - secondLastPoint.x) > 0 ? (lastPoint.x - secondLastPoint.x) : distance;
			}
			var direction = distanceMetric >= 0 ? -1 : 1;
			
			//seconds
			var lastTime = (lastPoint.time - firstPoint.time) / 1000;
			
			//var speed = Math.abs(Math.min(1, distance)) / this.time;
			var speed = Math.max(1, Math.floor(lastDistance / lastTime));
			
			/*
			speed is (roughly) the current speed in pixels per second. Roughly. As in not quite current, but averaged over last few points.
			*/
			
			//trace(lastDistance + " :ld " + speed + " :speed " + direction + " :direction " + lastTime + " :seconds");
			
			// First or Last
			if((this.currentIndex == 0 && distance > 0) || (this.currentIndex == this.totalPages && distance < 0)){
				
				this.resetToPosition();
				
			} else {
				
				if(Math.abs(distance) >= (this.innerPageSize / 2) || speed >= this.options.speedThreshold){
					this.startAnimating();
					//todo - work out how far the screen has to travel to the edge, then divide by speed
					var animationSpeed = Math.max(0.15, Math.min(0.35, 500 / speed));
					this.moveTouchDirection(direction, animationSpeed);
				} else {
					this.resetToPosition();
				}
				
			}
			
		},
		
		/* ---------  */
		moveScrolled:function(value){
			this.moveValue = value;
			this.animateElement(this.element, value, 0, function(){}, Linear.easeNone);
			
		},
		
		/* ---------  */
		resetToPosition:function(jump){
			
			this.startAnimating();
			var speed = jump ? 0 : this.options.speed + 0.05;
			
			this.animateElement(this.element, (this.innerPageSize * -this.currentIndex), speed, jQuery.proxy(this, "stopAnimating"), Power2.easeOut);
			
		},
		
		/* ---------  */
		moveTouchDirection:function(direction, speed){
			
			var target = Math.max(0, Math.min(this.currentIndex + direction, this.totalPages));
			this.movingAdmin(target, speed);
			
		},
		
		/* ---------  */
		stopAnimating: function(){
			
			this.animating = false;

			if(this.settingUp){
				this.settingUp = false;
				this.element.trigger("setupComplete");
			}
			
		},
		
		/* ---------  */
		startAnimating: function(){
			
			this.animating = true;
			
		},
		
		/* ---------  */
		moveToPage:function(target, speed){
			
			if(target == this.currentIndex) return;
			this.movingAdmin(target, speed);
			
		},
		
		/* ---------  */
		movingAdmin:function(target, speed){
			
			this.startAnimating();
			
			this.currentIndex = target;
			
			this.addActiveClasses(target);
			
			var targetSpeed = speed ? speed : this.options.speed;
			this.animateElement(this.element, this.innerPageSize * -target, targetSpeed, jQuery.proxy(this, "pageArrived"));
	
			
			
			this.element.trigger("startMove", this.currentIndex);

			var event = jQuery.Event( "onTheMove");
			event.currentIndex = this.currentIndex;
			this.element.trigger(event);
			
		},
		
		addActiveClasses:function(target){
			this.pages.removeClass("active");
			this.pages.eq(target).addClass("active");
			
			if(this.nav){
				this.nav.removeClass("active");
				this.nav.eq(target).addClass("active");
			}
			
			if(this.prevArrow){
				this.prevArrow.removeClass("active");
				this.nextArrow.removeClass("active");
				if(target == 0) this.prevArrow.addClass("active");
				if(target == this.totalPages) this.nextArrow.addClass("active");
			}	
			
			/***************** REFACTOR TO MAKE UNIVERSAL *****************/
			if(this.options.autoplay){
				if(this.autoTween != null) this.autoTween.kill();
				$("span", this.nav).css({width: 0});
				var item = $("span", this.nav.eq(this.currentIndex));
				
				this.autoTween = TweenMax.to(item, this.options.autoplayDuration, {css:{width: "100%"}, onComplete:jQuery.proxy(this, "autoNext"), ease:Linear.easeNone});
				if(this.paused) this.autoTween.pause();
			}
		},
		
		/* ---------  */
		pageArrived:function(){
			this.stopAnimating();
			this.element.trigger("pageInPlace", this.currentIndex);
		},
		
		/* ---------  */
		autoNext:function(){
			var target = (this.currentIndex + 1) > this.totalPages ? 0 : this.currentIndex + 1;
			this.moveToPage(target);
		},
		
		/* ---------  */
		navClicked:function(event){
			var index = Utils.getElementIndex($(event.currentTarget));
			this.gotoPage(index);
		},
		
		/* ---------  */
		prevArrowClicked:function(event){
			this.moveDirection(-1);
		},
		
		/* ---------  */
		nextArrowClicked:function(event){
			this.moveDirection(1);
		},
		
		/* ---------  */
		gotoPage:function(target){
			if(this.options.pauseOnClick) this.paused = true;
			this.moveToPage(target);			
		},
		
		/* ---------  */
		moveDirection: function(direction){
			
			if(this.options.pauseOnClick) this.paused = true;
			var target = Math.max(0, Math.min(this.currentIndex + direction, this.totalPages));
			this.moveToPage(target);
			
		},
		
		/* ---------  */
		animateElement: function(item, target, duration, callback, ease){
			
			var easing = ease ? ease : Power2.easeOut;			
			var animateObject = $.useCssAnim ? {x:target} : {left:target};
			if(this.options.vertical) animateObject = $.useCssAnim ? {y:target} : {top:target};

			TweenMax.to(item, duration, {css:animateObject, onComplete:callback, ease:easing, onUpdate: jQuery.proxy(this, "elementAnimating")});
			
		},

		elementAnimating: function(){
			var event = jQuery.Event( "animating");
			event.currentIndex = this.currentIndex;
			event.moveValue = this.moveValue;
			event.innerPageSize = this.innerPageSize;
			event.pageSizeOffset = this.pageSizeOffset;
			this.element.trigger(event);
		}
		
	}
	
	
	/* plugin initialisation */
	$.fn.touchSlide = function(settings) {

		return this.each(function() {
      		var tabs = new TouchSlideController(this, settings);
    	});

	};
	
})( jQuery );// JavaScript Document

$(function() {
	$("[data-touch-slide]").touchSlide();
});
