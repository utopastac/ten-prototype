(function() {
	const searchFields = $(".search-field, .travel-search-field .segment");
	const pickers = $(".picker");
	searchFields.on("click", showHelper);
	var helperElement = null;

	function showHelper(event){
		pickers.hide();
		var elem = $(event.currentTarget);
		var helper = elem.data("helper");
		helperElement = $("#" + helper);
		var position = elem.offset();
		helperElement.show();
		var xt = position.left;// + (elem.width() / 2);
		var yt = position.top + elem.height() - 1;
		TweenMax.set(helperElement, {left: xt, top: yt});
		switch(helper){
			case "":
				break;
			case "":
				break;
			case "":
				break;
		}
		helperElement.on("click", hideHelper);
	}

	function hideHelper(event){
		pickers.hide();
	}
})();