!function(){function e(e){r.hide();var c=$(e.currentTarget),i=c.data("helper");a=$("#"+i);var n=c.offset();a.show();var l=n.left,f=n.top+c.height()-1;TweenMax.set(a,{left:l,top:f}),a.click(t)}function t(){r.hide()}const c=$(".search-field, .travel-search-field .segment"),r=$(".picker");c.click(e);var a=null}();