var Utils = {
	
	getHalf: function (element, e){
		var half = 1;
		var x = e.pageX - $(element).offset().left;
		if(x < $(element).width()/2) half = -1;
		return half;
	},

	maxscreen: function(imageHolder, image){
		var imageRatio = $(image).width() / $(image).height();
		var wt = $(window).width();
		var ht = wt / imageRatio;
	
		if(ht < $(window).height()){
			ht = $(window).height();
			wt = ht * imageRatio;
		}
		$(image).css({width: wt, height:ht});
	},
	
	maxscreenContainer: function(image, container, center){
		
		var imageRatio = image[0].naturalWidth / image[0].naturalHeight;
		
		var wt = Math.ceil($(container).width()) + 1;
		var ht = Math.ceil(wt / imageRatio);
	
		if(ht < $(container).height()){
			ht = Math.ceil($(container).height()) + 1;
			wt = Math.ceil(ht * imageRatio);
		}
		if(center){
			var xt = ($(container).width() - wt) / 2;
			var yt = ($(container).height() - ht) / 2;
			$(image).css({width: wt, height:ht, "margin-left":-Math.abs(xt), "margin-top":-Math.abs(yt)});
		} else {
			$(image).css({width: wt, height:ht});
		}
	},
	
	verticalCentre: function(element, horizontal){
		var parent = element.parent();
		element.css({"margin-top": parent.height()/2 - element.height()/2});
		if(horizontal){
			element.css({"margin-left": parent.width()/2 - element.width()/2});
		}
	},
	
	randRange: function (start, end) {
		return Math.floor(start+(Math.random()*(end-start)));
	},

	randomColour: function () {
		return "#" + Math.random().toString(16).slice(2, 8);
	},

	getAlpha: function(i, total, wT){
		return ((wT / total) * i) / 200;
	},
	
	stringEndsWith: function (str, substr) {
		return str.substr(0 - substr.length) == substr;
	},
	
	degreesToRadians: function (degrees){
		return degrees * Math.PI / 180;
	},
	
	distanceFromVisibleEdge: function(element) {
        var allHeight = $(window).height() + $(window).scrollTop();
        return allHeight - element.offset().top;
    },

    distanceFromPoint: function(element, point) {
    	var position = element.position();

    	var x = position.left;
    	var y = position.top;

    	var xDist = x - point.x;
    	var yDist = y - point.y;

    	var distance = Math.sqrt((xDist*xDist) + (yDist*yDist));
    	return distance;
    },
	
	putInRange: function(min, max, current, addition){
		var value = current + addition;
		if(value > max) value = min;
		if(value < min) value = max;
		return value;
	},
	
	getElementIndex: function(element){
		return element.parent().children().index(element);
	},

	getSpecificElementIndex: function(element, selector){
		return element.parent().children(selector).index(element);
	},
	
	endScroll: function(offset){
		return $(window).scrollTop() + $(window).height() >= $(document).height() - offset;
	},
    
    underView: function(element) {
		return (($(window).height()/2 + $(window).scrollTop()) <= element.offset().top);
    },
        
    aboveView: function(element) {
		return ($(window).scrollTop() >= element.offset().top + element.height());
    },
    
    inView: function(element) {
		return (Utils.aboveView(element)!=true && Utils.underView(element)!=true);
    },
	
	topView: function(element, offset) {
		return ($(window).scrollTop() + offset >= element.offset().top);
    },
	
	endOfPage: function(){
		return (window.innerHeight + window.scrollY) >= $(document).height();	
	},
	
	endOfElement: function(element){
		return (window.innerHeight + window.scrollY) >= ($(element).outerHeight() + $(element).offset().top);	
	},
	
	topOfPage: function(){
		return window.scrollY == 0;
	},
	
	removeClasses: function(element, classes){
		if(element.hasClass(classes)) element.removeClass(classes);
	},
    
    checkMobile: function(){
		/*var mobile = false
		if ($.ww < 500 ||
			navigator.userAgent.match(/Android/i) ||
	        navigator.userAgent.match(/webOS/i) ||
	        navigator.userAgent.match(/iPhone/i) ||
	        navigator.userAgent.match(/iPod/i) ||
	        navigator.userAgent.match(/BlackBerry/) || 
	        navigator.userAgent.match(/Windows Phone/i) || 
	        navigator.userAgent.match(/ZuneWP7/i)
	        ) mobile = true;
		return mobile;*/
        var check = false;
        if($.ww < 500) check = true;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
return check;
	},
	
	checkTablet: function(){
		var tablet = false
		if (navigator.userAgent.match(/iPad/i)) tablet = true;
		return tablet;
	},
	
	iOSversion: function() {
		if (/iP(hone|od|ad)/.test(navigator.platform)) {
			// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
			var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
		} else {
			return false;	
		}
	},
	
	drawGrid: function(ctx, cols, rows){
		
		ctx.clearRect (0, 0, $.ww, $.wh);
		ctx.canvas.width  = $.ww;
		ctx.canvas.height = $.wh;
		ctx.strokeStyle = "rgba(0, 255, 30, 1)";
		ctx.lineWidth = (1);
		ctx.beginPath();
		
		var i = 0;
		for(i = 0; i < cols; i++){
			var left = ($.ww / cols) * (i+1);
			ctx.moveTo(left, 0);
			ctx.lineTo(left, $.wh);
		}
		for(i = 0; i < rows; i++){
			var top = ($.wh / rows) * (i+1);
			ctx.moveTo(0, top);
			ctx.lineTo($.ww, top);
		}
		ctx.stroke();
		
	},
	
	getContext: function(element){
		var canvas = document.getElementById(element);
		return canvas.getContext("2d");
	}

}
