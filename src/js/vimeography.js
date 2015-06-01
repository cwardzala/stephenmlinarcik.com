;(function ($, Mustache) {
    var themesDir = '/themes',
        themesData = null,
        version = '0.1.0';

    var loadTemplate = function (template) {
            var tmpl = '';
            return $.ajax({
                url: template,
                type: 'get',
                dataType: 'text'
            });
        },

        loadPartials = function (theme, partials) {
            var parts = {},
                partialsDir = themesDir + '/vimeography-' + theme + '/partials/',
                def = $.Deferred();

            var value = partials.videos;
            loadTemplate(partialsDir + value).done(function (data) {
                parts.videos = data;
                def.resolve(parts);
            });
            return def;
        },

        loadVideos = function (channel) {
            var vids = [],
                def = $.Deferred();
            $.ajax({
                url: 'http://vimeo.com/api/v2/channel/' + channel + '/videos.json',
                type: 'get',
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
                def.resolve(vids);
            });
            return def;
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

            loadTemplate(themeDir + '/' + theme + '.mustache').done(function (mainTmpl) {
                loadPartials(theme, themesData[theme].partials).done(function (partData) {
                    partials = partData;
                    loadVideos(channel).done(function (videos) {
                        var html = Mustache.render(mainTmpl, {
                            gallery_id: i,
                            version: version,
                            videos: videos
                        }, partials);
                        $_this.html(html);
                    });
                });
            });
        });
    });

})(window.jQuery, window.Mustache);
