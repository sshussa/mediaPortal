(function($) {
	// Scripts to be loaded
	var script_queue = [];
	// Have we been initialized?
	var init_done = false;
	// Are we waiting for a something to load?
	var waiting = false;
	// The timeout for style urls
	var style_timeout = false;
	// The last script we loaded
	var $last_style = null;
	
	function queueScript(script) {
		script_queue.push(script);
		
//		if (script_queue.length == 1 && init_done && !waiting)
			processScripts();
	}
	
	function processScripts() {
		while (init_done && !waiting && script_queue.length > 0) {
			var script = script_queue.shift();

			if (script.id) {
				var $existing = $('[wd_script_id="'+script.id+'"]');
				if ($existing.length > 0) {
					continue;
				}
			}

			switch(script.type) {
				case "script_url":
					loadScriptURL(script);
					break;
				case "script":
					loadScript(script);
					break;
				case "style_url":
					loadStyleURL(script);
					break;
				case "style":
					loadStyle(script);
					break;
				case "callback":
					if (script.use_jquery)
						webDriver.push_jQuery();
					script.callback();
					if (script.use_jquery)
						webDriver.pop_jQuery();
					break;
			}
		}
	}
		
	function loadScriptURL(script) {
		// There is still a chance that this script may not get executed before the next script that requires it.
		// If that becomes an issue, we can write a little JSONP wrapper to load and evaluate the script contents directly.
		var $script = $("<script>")
			.attr("type", "text/javascript")
			.on("load", function() {scriptLoaded(true);})
			.attr("src", script.url)
		;
		
		if (script.id)
			$script.attr("wd_script_id", script.id);
		
		waiting = true;

		webDriver.push_jQuery();
		// load event doesn't fire if script appended using jQuery
		//$script.appendTo($("head"));
		document.getElementsByTagName("head")[0].appendChild($script[0]);
	}
	
	function scriptLoaded(pop) {
		waiting = false;
		if (pop)
			webDriver.pop_jQuery();
		if (style_timeout) {
			clearTimeout(style_timeout);
			style_timeout = false;
			$last_style.off("load");
		}
		processScripts();
	}
	
	function loadScript(script) {
		var $script = $("<script>")
			.attr("type", "text/javascript")
		;
		
		if (script.id)
			$script.attr("wd_script_id", script.id);
		
		$script.text(script.code);
		
		webDriver.push_jQuery();
		$script.appendTo($("head"));
		webDriver.push_jQuery();
	}

	function loadStyleURL(script) {
		$link = $("<link>")
			.attr("href", script.url)
			.attr("type", "text/css")
			.attr("rel", "stylesheet")
			.on("load", function() {scriptLoaded(false);})
		;
		
		if (script.id)
			$link.attr("wd_script_id", script.id);
		
		$link.insertAfter($last_style);
		waiting = true;
		$last_style = $link;

		style_timeout = setTimeout(function () {scriptLoaded(false);}, 2000);
	}
	
	function loadStyle(script) {
		$style = $("<style>")
			.attr("type", "text/css")
		;
		
		if (script.id)
			$style.attr("wd_script_id", script.id);
		
		$style.text(script.style);

		$style.insertAfter($last_style);
		$last_style = $style;
	}
	
	webDriver.loadScripts = function(scripts) {
		for (var i = 0; i < scripts.length; ++i) {
			queueScript(scripts[i]);
		}
	};
	
	webDriver.queueCallback = function(callback) {
		queueScript({type:"callback",callback:callback});
	}
	
	$(function() {
		var $styles = $("style[wd_script_id], link[wd_script_id]");
		$last_style = $styles.last();
		init_done = true;
		processScripts();
	});
})(webDriver.jQuery);