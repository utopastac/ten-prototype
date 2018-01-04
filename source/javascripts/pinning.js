(function(){
	var controller = new ScrollMagic.Controller();

	var ht = ($("#hotel-grid").height() - window.innerHeight) + 48;
	var scene = new ScrollMagic.Scene({
				triggerElement: "#hotel-results",
        duration: ht,
        triggerHook: 0,
        reverse: true
    })
    .setPin("#hotel-map");

	var ht2 = ($("#details-main").height() - window.innerHeight) + $("#basket-summary").height();
  var scene2 = new ScrollMagic.Scene({
				triggerElement: "#basket-summary",
        duration: ht2,
        offset: -50,
        triggerHook: 0,
        reverse: true
    })
    .setPin("#basket-summary");

  controller.addScene([
	  scene,
	  scene2
	]);
}());