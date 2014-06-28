<?php
	function isActive($route) {
        if ($_SERVER["REQUEST_URI"] == $route) {
            return 'current_page_item';
        }
    }
?>
