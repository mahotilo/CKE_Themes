<?php 
defined('is_running') or die('Not an entry point...');

class CKE_Themes {
	public static $config;

  /* hook */
	public static function CKEditorConfig($options){
		global $addonRelativeCode;
		self::LoadPluginConfig();

		if ( self::$config['theme'] !== 'System default' ) {
			$options['skin'] = self::$config['theme'].',' . $addonRelativeCode . '/themes/'.self::$config['theme'].'/';
		}

		return $options;
	}


	public static function InlineEdit_Scripts($scripts, $type){
		self::LoadPluginConfig();
		
		if ( self::$config['bottom_bar'] == '1' && $type === 'text' ) {
			$scripts[]=array('code' => 'gp_ckconfig.sharedSpaces = {top: "ckeditor_top", bottom: "ckeditor_bottom"};
										gp_ckconfig.removePlugins = "floatingspace,maximize,resize";');
		}
		return $scripts;
	}



	public static function GetHead(){
		global $page, $addonRelativeCode, $addonPathCode;
		self::LoadPluginConfig();

		if( \gp\tool::LoggedIn() ){
			if ( self::$config['theme'] !== 'System default') {
				$page->head_js[]  = $addonRelativeCode . '/CKE_Themes.js';

				\gp\tool\Plugins::css('CKE_Themes.css', false);

				$css_aux = '/themes/'.self::$config['theme'].'.css';
				if ( file_exists($addonPathCode . $css_aux)) {
					\gp\tool\Plugins::css($css_aux, false);
				}	
			}
		}
	}


	public static function LoadPluginConfig(){
		global $addonPathCode, $addonPathData;
		$config_file = $addonPathData . '/config.php';
		if( file_exists($config_file) ){
		  include $config_file ;
		}else{
			$config = array (
			  'theme' => 'System default',
			);
		}
		self::$config = $config;
	}

}
