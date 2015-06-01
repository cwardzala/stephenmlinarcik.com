<?php

$settings = array(
  array(
    'type'       => 'colorpicker',
    'label'      => __('Inactive Thumbnail Border Color'),
    'id'         => 'inactive-thumbnail-border-color',
    'value'      => '#DDDDDD',
    'pro'        => FALSE,
    'namespace'  => TRUE,
    'properties' =>
      array(
        array('target' => '.vimeography-6up .vimeography-thumbnails img', 'attribute' => 'borderColor'),
      )
  ),
  array(
    'type'       => 'colorpicker',
    'label'      => __('Active Thumbnail Border Color'),
    'id'         => 'active-thumbnail-border-color',
    'value'      => '#0088CC',
    'pro'        => FALSE,
    'namespace'  => TRUE,
    'properties' =>
      array(
        array('target' => '.vimeography-6up .vimeography-thumbnails img.flex-active', 'attribute' => 'borderColor'),
      )
  ),
  array(
    'type'       => 'colorpicker',
    'label'      => __('Video Title Color'),
    'id'         => 'video-title-color',
    'value'      => '#000000',
    'pro'        => FALSE,
    'namespace'  => TRUE,
    'properties' =>
      array(
        array('target' => '.vimeography-6up .vimeography-main .vimeography-slides h1', 'attribute' => 'color'),
      )
  ),
  array(
    'type'       => 'colorpicker',
    'label'      => __('Video Description Color'),
    'id'         => 'video-description-color',
    'value'      => '#000000',
    'pro'        => FALSE,
    'namespace'  => TRUE,
    'properties' =>
      array(
        array('target' => '.vimeography-6up .vimeography-main .vimeography-slides p', 'attribute' => 'color'),
      )
  ),
);