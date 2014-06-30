<?php date_default_timezone_set('America/New_York'); ?>
<footer class="site-footer">COPYRIGHT <?php echo date('Y'); ?> STEPHEN MLINARCIK | ALL RIGHTS RESERVED <img src="/images/balls.png"></footer>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="http://a.vimeocdn.com/js/froogaloop2.min.js"></script>
<script src="/js/jquery.flexslider-min.js"></script>
<script src="/js/jquery.mousewheel.js"></script>
<script src="/js/jquery.jscrollpane.min.js"></script>
<script src="/js/jquery.fitvids.js"></script>
<script src="/js/mustache.js"></script>
<script src="/js/vimeography.js"></script>
<script>
    $(function () {
        var $imgScroller = $('.img-scroller'),
            $track = $imgScroller.find('.img-scroller-track'),
            $images = $imgScroller.find('img'),
            width = 0,
            openClosePanel;

        openClosePanel = function (index) {
            $('.audio-section.open').removeClass('open');
            $('.audio-section').eq(index).addClass('open');
        };

        $images.each(function (i) {
            var $img = $(this),
                src = $img.data('src');
            $img.on('load', function () {
                width = width + ($(this).outerWidth(true) + 2);
                //console.debug([i, $images.length -1]);
                if (i === ($images.length - 1)) {
                    //console.debug('last');
                    $track.width(width);
                    $imgScroller.jScrollPane();
                }
            });
            $img.attr('src', src);
        });

        $('.audio-nav ul li a').each(function (i,node) {
            $(this).click(function (event) {
                event.preventDefault();
                openClosePanel(i);
            })
        });
    });
</script>
