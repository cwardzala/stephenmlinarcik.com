<?php
    $dir = $_SERVER["DOCUMENT_ROOT"] . '/images/gallery';
    $handle = opendir($dir);
    $images = array();
    while ($entry = readdir($handle)) {
        if ($entry != "." && $entry != ".." && $entry != '.DS_Store') {
            $images[] = $entry;
        }
    }
    sort($images);
    closedir($handle);
?>
<!DOCTYPE html>
<html>
    <head>
        <?php $title = "smlinarcik » video"; include('../head.php'); ?>
    </head>
    <body>
        <div class="container">
            <?php include('../sidebar.php') ?>
            <div id="primary" class="post">
                <div class="img-scroller horizontal-only">
                    <div class="img-scroller-track">
                        <?php foreach($images as $image): ?>
                            <img data-src="/images/gallery/<?php echo $image ?>">
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
        <?php include('../footer.php') ?>
    </body>
</html>
