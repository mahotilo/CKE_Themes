<?php
defined('is_running') or die('Not an entry point...');

class CKE_Themes_Admin{

  public static $config;
  public static $components;
  public static $debug = true;

  public static function Settings(){
    global $page, $addonRelativeCode, $langmessage;

    if( isset($_POST['save']) ){
      msg(self::SaveConfig()); 
    }
    self::LoadConfig();
    self::GetComponents();
    
    $admin_url = \gp\tool::GetUrl('Admin_CKE_Themes');

    echo  '<h2 class="hqmargin">CKEditor Themes &raquo; Settings</h2>';

    echo  '<form id="cketconfig_form" data-values-changed="0" action="' . $admin_url . '" method="post">';
    echo      '<table class="bordered" style="width:100%;">';

    echo        '<tr>';
    echo          '<th style="width:40%;">' . $langmessage['Settings'] . '</th>';
    echo          '<th style="width:60%;">' . $langmessage['Current_Value'] . '</th>';
    echo        '</tr>';

    $value = self::$config['theme'];
    echo        '<tr>';
    echo          '<td>Theme</td>';
    echo          '<td>';
    echo            '<select class="gpselect" name="cketconfig[theme]">';
    echo              '<option value="System default">System default</option>';
    foreach( self::$components['themes'] as $theme ){
      $label =  $theme['dir'];
      $dir =    $theme['dir'];
      $selected = $dir == $value ? ' selected="selected" ' : '';
      echo            '<option value="' . $dir . '" ' . $selected . '>' . $label . '</option>';
    }
    echo            '</select>';
    echo          '</td>';
    echo        '</tr>';

    echo    '</table>';

    // SAVE / CANCEL
    echo    '<br/>';
    echo    '<input type="submit" id="cketconfig_submit" name="save" value="' . $langmessage['save'] . '" class="gpsubmit" /> ';
    echo    '<input type="button" onClick="location.href=\'' .$admin_url . '\'" value="' . $langmessage['cancel'] . '" class="gpcancel" />';
    echo  '</form>';
  }



  public static function GetComponents(){
    global $page, $addonPathCode;
    self::$components = array( 
      'themes' => array(),
    );
    $dirs = \gp\tool\Files::ReadDir($addonPathCode . '/themes/', 1);
	foreach( $dirs as $dir ){
		self::$components['themes'][] = array( 
		  'dir' =>    $dir,
		);
	}
  }



  public static function LoadConfig(){
    global $addonPathCode, $addonPathData;
    $config_file = $addonPathData . '/config.php';
    if( file_exists($config_file) ){
      include $config_file;
    }else{
		$config = array (
		  'theme' => 'System default',
		);
    }
    self::$config = $config;
  }



  public static function SaveConfig(){
    global $addonPathData, $langmessage;
    $config = array (
      'theme' => 'System default',
    );
    foreach ($_POST['cketconfig'] as $key => $value) {
      switch($key){
        case 'theme':
          $config['theme'] = basename(trim($value)); 
          break;
        default:
      }
    }
    $config_file = $addonPathData . '/config.php';
    if( \gp\tool\Files::SaveData($config_file, 'config', $config) ){
      msg($langmessage['SAVED']);
    }else{
      msg($langmessage['OOPS']);
    }
  }

}
