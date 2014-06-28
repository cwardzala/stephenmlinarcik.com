;(function ($, Mustache) {
    var themesDir = '/themes',
        themesData = null,
        version = '0.1.0';

    var loadTemplate = function (template) {
            var tmpl = '';
            $.ajax({
                url: template,
                type: 'get',
                async: false,
                dataType: 'text'
            }).done(function (data) {
                tmpl = data;
            });
            return tmpl;
        },

        loadPartials = function (theme, partials) {
            var parts = {},
                partialsDir = themesDir + '/vimeography-' + theme + '/partials/';
            $.each(partials, function (key, value) {
                parts[key] = loadTemplate(partialsDir + value);
            });
            return parts;
        },

        loadVideos = function (channel) {
            var vids = [];
            $.ajax({
                url: 'http://vimeo.com/api/v2/channel/' + channel + '/videos.json',
                type: 'get',
                async: false,
                dataType: 'json'
            }).done(function (data) {
                $.each(data, function (i, item) {
                    if (i < 6) {
                        vids.push({
                            id: item.id,
                            name: item.title,
                            thumbnail_medium: item.thumbnail_medium,
                            width: item.width,
                            height: item.height,
                            "short_description": $.trim(item.description.split('<br />')[0].substring(0, 73)) + '&hellip;'
                        });
                    }
                });
            });
            return vids;
        };

    // Get themes json
    $.getJSON(themesDir + '/themes.json').done(function (result) {
        themesData = result;

        $('.vimeography').each(function (i) {
            var $_this = $(this),
                channel = $_this.data('channel'),
                theme = $_this.data('theme'),
                themeDir = themesDir + '/vimeography-' + theme,
                mainTmpl,
                partials,
                videos;

            mainTmpl = loadTemplate(themeDir + '/' + theme + '.mustache');
            partials = loadPartials(theme, themesData[theme].partials);
            videos = loadVideos(channel);

            var html = Mustache.render(mainTmpl, {
                gallery_id: i,
                version: version,
                videos: videos
            }, partials);
            $_this.html(html);
        });
    });

})(window.jQuery, window.Mustache);
