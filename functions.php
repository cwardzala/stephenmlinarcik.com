<?php
	function isActive($route) {
        if ($_SERVER["REQUEST_URI"] == $route) {
            return 'current_page_item';
        }
    }

    function getFiles($directory,$exempt = array('.','..','.ds_store','.svn'),&$files = array()) {
        $handle = opendir($directory);
        while(false !== ($resource = readdir($handle))) {
            if(!in_array(strtolower($resource),$exempt)) {
                if(is_dir($directory.$resource.'/'))
                    array_merge($files,
                        self::getFiles($directory.$resource.'/',$exempt,$files));
                else
                    $files[] = $directory.$resource;
            }
        }
        closedir($handle);
        return $files;
    }
?>
