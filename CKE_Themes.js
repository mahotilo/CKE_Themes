const styles_to_delete = [
	'#gp_admin_html a *',

	'#ckeditor_area a, #ckeditor_area a:hover, #ckeditor_area a:focus',
	'#ckeditor_bottom',
	'#ckeditor_area .cke_chrome',
	'#ckeditor_area .cke_inner',
	'#ckeditor_area .tools',
	'#ckeditor_area .cke_top',
	'#ckeditor_area .cke_toolbar',
	'#ckeditor_area .cke_toolgroup a.cke_button:last-child:after',
	'#ckeditor_area a.cke_combo_button',
	'#ckeditor_area .cke_combo_open',
	'#ckeditor_area .cke_combo',
	'#ckeditor_area .cke_combo .cke_combo_text',
	'#ckeditor_area .cke_combo_arrow',
	'#ckeditor_area .cke_combo:after',
	'#ckeditor_area .cke_button',
	'#ckeditor_area a.cke_button_off:hover, #ckeditor_area a.cke_button_off:focus #ckeditor_area a.cke_button_off:active',
	'#ckeditor_area .cke_toolbar_start, #ckeditor_area .cke_toolbar_end'	
];

$(function(){
	$(document).on('editor_area:loaded', function(){
		CKEDITOR.on("instanceReady", function(event) {
			for (var j=0; j<document.styleSheets.length; j++) {
				sheet = document.styleSheets[j];
				if (sheet.cssRules) { // all browsers, except IE before version 9
					for (var i=0; i<sheet.cssRules.length; i++) {
						if (styles_to_delete.includes(sheet.cssRules[i].selectorText)) {
							sheet.deleteRule(i);
							i--;
						}
					}
				}	
			}			
		});	
	});
});