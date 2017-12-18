(function() {
	const travelSearchButtons = document.querySelectorAll("#travel-search-buttons li");
	for(var i=0; i<travelSearchButtons.length; i++){
		travelSearchButtons[i].addEventListener("click", toggleTravelSearchField);
	}
	function toggleTravelSearchField(event){
		var elem = event.currentTarget;
		var target = elem.dataset.target;
		elem.classList.toggle("active");
		document.getElementById(target).classList.toggle("active");
		elem.classList.contains("active") ? elem.querySelector(".button").innerHTML = "Selected" : elem.querySelector(".button").innerHTML = "Select";
	}
})();