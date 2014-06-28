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
                    <?php if ($handle = opendir('../images/gallery')): ?>
                        <?php while (false !== ($entry = readdir($handle))): ?>
                            <?php if ($entry != "." && $entry != ".." && $entry != '.DS_Store'): ?>
                                <img src="/images/gallery/<?php echo $entry ?>">
                            <?php endif; ?>
                        <?php endwhile; ?>
                        <?php closedir($handle); ?>
                    <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        <?php include('../footer.php') ?>
    </body>
</html>
