(function ($) {
	$(function () {
		var $imgScroller = $('.img-scroller'),
			$track = $imgScroller.find('.img-scroller-track'),
			$images = $imgScroller.find('img'),
			width = 0;

		$images.each(function () {
			width = width + ($(this).outerWidth(true) + 2);
		});
		var openClosePanel = function (index) {
			$('.audio-section.open').removeClass('open');
			$('.audio-section').eq(index).addClass('open');
		};
		$('.audio-nav ul li a').each(function (i,node) {
			$(this).click(function (event) {
				event.preventDefault();
				openClosePanel(i);
			})
		});
		$track.width(width);
		$imgScroller.jScrollPane();
	});
})(jQuery)
