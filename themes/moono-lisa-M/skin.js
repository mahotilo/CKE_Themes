CKEDITOR.on( 'dialogDefinition', function( ev ) {
  var dialogName = ev.data.name;
  var dialogDefinition = ev.data.definition;
  var dialog = dialogDefinition.dialog;


  if ( dialogName == 'find' ) {
    dialogDefinition.height = 215;
  };


  if ( dialogName == 'link' ) {
    dialogDefinition.height = 315;
  };


  if( dialogName == 'image' ){
    dialogDefinition.height = 465;
 
// make Image preview box more scalable
	dialogDefinition.onLoad = function () {
		var dialog = CKEDITOR.dialog.getCurrent(); 

		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutationRecord) {
				var scale;
				var img = $('.cke_dialog .ImagePreviewBox img').get(0);
				var box = $('.cke_dialog .ImagePreviewBox').get(0);
				var boxstyle = window.getComputedStyle(box, null);
				var boxW = box.clientWidth - parseFloat(boxstyle.paddingLeft) - parseFloat(boxstyle.paddingRight);
				var boxH = box.clientHeight - parseFloat(boxstyle.paddingTop) - parseFloat(boxstyle.paddingBottom);
				var inpW = dialog.getValueOf( 'info', 'txtWidth' );
				var inpH = dialog.getValueOf( 'info', 'txtHeight' )

				//workaround for ckEditor wrong % and empty sizes processing
				if ( inpW.indexOf('%') >= 0){
					imgW = Math.round(parseFloat(inpW)/100*boxW);
					$('.cke_dialog .ImagePreviewBox img').css({
						'width': imgW
					});
				}else{	
					imgW = img.offsetWidth;
					if ( inpW == '' ) {
						$('.cke_dialog .ImagePreviewBox img').css({
							'width': 'auto'
						})
					};
				};
				if ( inpH.indexOf('%') >= 0){
					imgH = Math.round(parseFloat(inpH)/100*boxH);
					$('.cke_dialog .ImagePreviewBox img').css({
						'height': imgH
					});
				}else{	
					imgH = img.offsetHeight;
					if ( inpH == '' ) {
						$('.cke_dialog .ImagePreviewBox img').css({
							'height': 'auto'
						})
					};			
				};

				//adjust preview box scale to imitate real image alignment
				if (imgW != 0) {
					scale = Math.min( boxW/(imgW*1.1), boxH/(imgH*1.1), 1 );
					tableW = Math.max( Math.round(1.1*imgW), boxW );
					$('.cke_dialog .ImagePreviewBox table').css({
						'transform-origin': 'top left',
						'transform': 'scale(' + scale + ')',
						'width': tableW
					});
				}else{
					$('.cke_dialog .ImagePreviewBox table').css({
						'transform': 'scale(1)',
						'width': 'auto'
					});
				}
			});    
		});
		var target = $('.cke_dialog .ImagePreviewBox img').get(0);
		observer.observe(target, { attributes : true, attributeFilter : ['style'] });		
      };
  };
  

  if( dialogName == 'flash' ){
    dialogDefinition.height = 340;
  };


  if( dialogName == 'table' ){
    dialogDefinition.height = 415;
  };  
});