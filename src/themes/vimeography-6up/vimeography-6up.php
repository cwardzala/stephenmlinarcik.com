<?php
/*
Plugin Name: Vimeography Theme: 6up
Plugin URI: http://www.vimeography.com/themes
Theme Name: 6up
Theme URI: vimeography.com/themes/6up
Version: 1.0.3
Description: displays the 6 latest video thumbnails, which can be clicked for navigation.
Author: Dave Kiss
Author URI: http://www.vimeography.com/
Copyright: Dave Kiss
*/

if (! class_exists('Vimeography_Themes_6up'))
{
  class Vimeography_Themes_6up
  {
    /**
     * The current version of this theme
     *
     * @var string
     */
    public $version = '1.0.3';

    /**
     * Include this theme in the Vimeography theme loader.
     */
    public function __construct()
    {
      add_action('plugins_loaded', array($this, 'load_theme'));
    }

    /**
     * Set any values sent to the theme.
     * @param [type] $name  [description]
     * @param [type] $value [description]
     */
    public function __set($name, $value)
    {
      $this->$name = $value;
    }

    /**
     * Has to be public so the wp actions can reach it.
     * @return [type] [description]
     */
    public function load_theme()
    {
      do_action('vimeography/load-theme', __FILE__);
    }

    public static function load_scripts()
    {
      // Register our common scripts
      wp_register_script('froogaloop', 'http://a.vimeocdn.com/js/froogaloop2.min.js');
      wp_register_script('flexslider', VIMEOGRAPHY_ASSETS_URL.'js/plugins/jquery.flexslider.js', array('jquery'));
      wp_register_script('fitvids', VIMEOGRAPHY_ASSETS_URL.'js/plugins/jquery.fitvids.js', array('jquery'));

      // Register our custom scripts
      wp_register_style('6up', plugins_url('media/6up.css', __FILE__));

      wp_enqueue_script('froogaloop');
      wp_enqueue_script('flexslider');
      wp_enqueue_script('fitvids');

      wp_enqueue_style('6up');
    }

    public function videos()
    {
      // optional helpers
      require_once(VIMEOGRAPHY_PATH .'lib/helpers.php');
      $helpers = new Vimeography_Helpers;

      // for this theme, we want to trim the incoming array to only
      // show the first 6 videos, always, forever, until the end of time.
      $items = array();
      $i = 1;

      foreach($this->data as $item)
      {
        if ($i <= 6)
        {
          if ($item->duration AND ! strpos($item->duration, ':'))
            $item->duration = $helpers->seconds_to_minutes($item->duration);

          $item = $helpers->format_video_thumbnails($item);

          // Ugly fix for 6up only.
          $item->id = str_replace('/', '', strrchr($item->link, '/'));
          $item->short_description = $helpers->truncate($item->description, 80);

          $items[] = $item;
        }
        $i++;
      }

      return $items;
    }
  }

  new Vimeography_Themes_6up;
}