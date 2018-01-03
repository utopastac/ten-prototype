(function() {
	const travelSearchButtons = $("#travel-search-buttons li");
	const travelSearchButton = $("#travel-search-container > .button");
	travelSearchButtons.click(toggleTravelSearchField);

	function toggleTravelSearchField(event){
		var elem = $(event.currentTarget);
		var target = elem.data("target");
		elem.toggleClass("active");
		$("#" + target).slideToggle();
		elem.hasClass("active") ? $(".button", elem).html("Selected") : $(".button", elem).html("Select");
		if(travelSearchButtons.hasClass("active")){
			travelSearchButton.attr("href", elem.data("url"))
			travelSearchButton.show();
		} else {
			travelSearchButton.hide();
		}
	}
})();