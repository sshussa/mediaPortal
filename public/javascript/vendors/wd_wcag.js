(function($) {
	// Handle keypress events for pseudo-buttons (divs, etc. that behave as buttons, checkboxes or radio buttons)
	webDriver.WCAG_Keypress = function(element, event) {
		var $element = $(element);
		var event = event || window.event;
		var key = event.key || event.keyCode || event.charCode || event.which;
		
		if (key == 13 || key == "Enter" || key == 32 || key == " ") {
			// enter or space => click
			event.preventDefault();
			$element.click();
			return;
		}
		
		var role = $element.attr("role");
		if (role == "radio" || role == "tab") {
			var focus = $([]);
			if (key == 40 || key == "ArrowDown" || key == 39 || key == "ArrowRight") {
				focus = $element.nextAll('[role="'+role+'"]');
			} else if (key == 38 || key == "ArrowUp" || key == 37 || key == "ArrowLeft") {
				focus = $element.prevAll('[role="'+role+'"]');
			}
			
			if (focus.length > 0)
				focus[0].focus();
		}
	}
})(webDriver.jQuery);   	