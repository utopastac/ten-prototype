(function() {
	const navigationMenuButton = $("#main-menu-button");
	const navigationMenu = $("#main-menu-overlay");
	const navigationMenuClose = $("#main-menu-overlay .close");
	navigationMenuButton.click(openMainMenu);
	navigationMenuClose.click(closeMainMenu);

	function openMainMenu(){
		navigationMenu.slideToggle();
	}

	function closeMainMenu(){
		navigationMenu.slideToggle();
	}
})();