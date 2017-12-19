(function() {
	const overlay = $("#overlay");
	const overlayBg = $("#overlay-bg");
	const overlayContent = $("#overlay-content");
	const body = $("body");
	const overlayLaunchers = $(".overlay-launcher");
	const close = $("#overlay .close");
	overlayLaunchers.click(openOverlay);
	close.click(closeOverlay);
	overlayBg.click(closeOverlay);

	function openOverlay(event){
		var elem = $(event.currentTarget);
		var content = $(".overlay-content", elem).clone();
		overlayContent.html(content);
		overlay.show();
		body.addClass("fixed");
	}

	function closeOverlay(event){
		overlay.hide();
		body.removeClass("fixed");
	}
})();