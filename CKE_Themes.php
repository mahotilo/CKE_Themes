<?php 
defined('is_running') or die('Not an entry point...');

class CKE_Themes {
  public static $config;

  /* filter hook */
  static function CKEditorConfig($options){
		global $addonRelativeCode;
		self::LoadPluginConfig();
		if ( self::$config['theme'] !== 'System default') {
			$options['skin'] = self::$config['theme'].',' . $addonRelativeCode . '/themes/'.self::$config['theme'].'/';
		}
		return $options;
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
