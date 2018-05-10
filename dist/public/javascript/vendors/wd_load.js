(function($) {
	// Call specified onload method on elements from top down
	webDriver.doLoad = function(element, level) {
		var $element = $(element);
		level = level || "self";
		var $items = $([]);
		if (level == "container") {
			$items = $element.parent().closest("[wd_onload]");
			if ($items.length == 0)
				level = "self";
		}
		if (level == "self") {
			if ($element.attr("wd_onload"))
				$items = $element;
			else
				level = "children";
		}
		if (level == "children") {
			$items = $element.find("[wd_onload]");
		}
		$items.each(function() {
			var $this = $(this);
			var $parents = (level == "children") ? $this.parentsUntil($element, "[wd_onload]") : $([]);
			if ($parents.length == 0) {
				var method = $this.attr("wd_onload");
				var result = webDriver[method].call(this);
				if (result !== false)
					webDriver.doLoad(this, 'children');
			}
		});
	}
	
	$(function() {
		webDriver.doLoad(document);
	});
})(webDriver.jQuery);