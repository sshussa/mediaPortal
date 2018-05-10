function wd_tab_select(set_id, tab_id) {
	// deactivate all tabs and content
	webDriver.jQuery("#"+set_id+" .wd_tabs_"+set_id+"_tab")
		.removeClass("wd_tab-active")
		.addClass("wd_tab-inactive")
		.attr("aria-selected", "false")
		.attr("tabindex", -1)
	;
	webDriver.jQuery("#"+set_id+" .wd_tabs_"+set_id+"_content")
		.removeClass("wd_tab_content-active")
		.addClass("wd_tab_content-inactive")
		.attr("aria-expanded", "false")
	;
	
	// activate the specified tab and its content
	// and fire an event for this content and active content in any nested tabs
	if (tab_id) {
		webDriver.jQuery("#"+tab_id+"_tab")
			.removeClass("wd_tab-inactive")
			.addClass("wd_tab-active")
			.attr("aria-selected", "true")
			.attr("tabindex", 0)
		;
		var $content = webDriver.jQuery("#"+tab_id+"_tab_content");
		$content
			.removeClass("wd_tab_content-inactive")
			.addClass("wd_tab_content-active")
			.attr("aria-expanded", "true")
		;
		webDriver.doResize($content);
	}
}