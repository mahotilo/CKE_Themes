const css_to_delete = [
	['#gp_admin_html a *','color','text-decoration'],
	['#gp_admin_html *','line-height'],

	['#ckeditor_area a, #ckeditor_area a:hover, #ckeditor_area a:focus','color'],
	['#ckeditor_area .cke_chrome',''],
	['#ckeditor_area .cke_inner',''],
	['#ckeditor_area .tools',''],
	['#ckeditor_area .cke_top',''],
	['#ckeditor_area .cke_toolbar',''],
	['#ckeditor_area .cke_toolgroup',''],
	['#ckeditor_area .cke_toolgroup a.cke_button:last-child:after',''],
	['#ckeditor_area a.cke_combo_button',''],
	['#ckeditor_area .cke_combo_open',''],
	['#ckeditor_area .cke_combo',''],
	['#ckeditor_area .cke_combo .cke_combo_text',''],
	['#ckeditor_area .cke_combo_arrow',''],
	['#ckeditor_area .cke_combo:after',''],
	['#ckeditor_area .cke_button',''],
	['#ckeditor_area a.cke_button_off:hover, #ckeditor_area a.cke_button_off:focus #ckeditor_area a.cke_button_off:active',''],
	['#ckeditor_area .cke_toolbar_start, #ckeditor_area .cke_toolbar_end','']
];


$(function(){
	//$(document).on('editor:loaded', function(evt, data){} data == source section
	$(document).on('editor:loaded', function(){
		if (typeof CKEDITOR !== 'undefined') {
			for (var j=0; j<document.styleSheets.length; j++) {
				sheet = document.styleSheets[j];
				if (sheet.cssRules) { // all browsers, except IE before version 9
					for (var i=0; i<sheet.cssRules.length; i++) {
						for (var k=0; k<css_to_delete.length; k++) {
							if (css_to_delete[k][0] == sheet.cssRules[i].selectorText) {
								if ( css_to_delete[k][1] == '' ) {
									sheet.deleteRule(i);
									i--;
								} else {
									for (var l=1; l<css_to_delete[k].length; l++) {
										sheet.cssRules[i].style.removeProperty(css_to_delete[k][l]);
									}	
								}
							}
						}	
					}
				}
			}
		}
	});
});