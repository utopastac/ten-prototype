(function() {
	const navigationMenuButton = $("#main-menu-button");
	const navigationMenu = $("#main-menu-overlay");
	const navigationMenuClose = $("#main-menu-overlay .close");
	navigationMenuButton.click(openMainMenu);
	navigationMenuClose.click(closeMainMenu);

	function openMainMenu(){
		navigationMenu.slideToggle(240);
	}

	function closeMainMenu(){
		navigationMenu.slideToggle(300);
	}
})();