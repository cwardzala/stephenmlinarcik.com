module.exports = function (grunt) {
    'use strict';
    var pkg_conf, paths;

    require('load-grunt-tasks')(grunt);

    pkg_conf = grunt.file.readJSON('package.json');

    paths = {
        src: {
            bower: 'src/bower_components',
            css: 'src/css',
            fonts: 'src/fonts',
            img: 'src/images',
            js: 'src/js',
            scss: 'src/scss',
            docs: 'src/docs'
        },
        dist: {
            css: 'dist/css',
            img: 'dist/images',
            js: 'dist/js',
            fonts: 'dist/fonts',
            docs: 'dist/docs'
        }
    };

    grunt.initConfig({
        pkg: pkg_conf,
        paths: paths,

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/**',
                        '!dist/.git*'
                    ]
                }]
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    dest: 'dist',
                    src: ['*.php']
                }]
            },

            images: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.src.img %>',
                    dest: '<%= paths.dist.img %>',
                    src: ['*.{png,jpg,gif,svg}']
                }]
            },

            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.src.fonts %>',
                    dest: '<%= paths.dist.fonts %>',
                    src: ['*.{eot,ttf,woff}']
                }]
            },

            extras: {
                files: [{
                    expand: true,
                    dot: false,
                    cwd: 'src/',
                    dest: 'dist',
                    src: ['.htaccess', 'favicon.ico', 'photo/*', 'audio/*', 'about/*', 'themes/*', 'js/*']
                }]
            }
        },

        hashres: {
            options: {
                fileNameFormat: '${hash}.${name}.${ext}',
                renameFiles: true
            },
            js: {
                src: 'dist/js/main-dist.js',
                dest: 'dist/index.html'
            },
            css: {
                src: 'dist/css/styles.css',
                dest: 'dist/index.html'
            }
        },

        jshint: {
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish')
            },
            js: ['<%= paths.src.js %>/**/*.js', '!<%= paths.src.js %>/vendor/*.js']
        },

        processhtml: {
            dist: {
                files: {
                    'dist/index.html': ['dist/index.html']
                }
            }
        },

        requirejs: {
            options: {
                baseUrl: '<%= paths.src.js %>',
                optimize: 'uglify',
                almond: true,
                mainConfigFile: '<%= paths.src.js %>/main.js',
                name: 'almond',
                include: ['main'],
                preserveLicenseComments: false,
                useStrict: true,
                wrap: true
            },
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    out: '<%= paths.dist.js %>/main-dist.js'
                }
            }
        },

        sass: {
            options: {
                loadPath: ['<%= paths.src.bower %>']
            },
            dev: {
                options: {
                    style: 'nested'
                },
                files: {
                    '<%= paths.src.css %>/styles.css': '<%= paths.src.scss %>/styles.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    '<%= paths.dist.css %>/styles.css': '<%= paths.src.scss %>/styles.scss'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['<%= paths.src.scss %>/{,*/}*.scss'],
                tasks: ['sass:dev']
            },
            js: {
                files: ['<%= paths.src.js %>/{,*/}*.js'],
                tasks: ['jshint']
            }
        }
    });

    grunt.task.registerTask('build', [
        'clean:dist',
        'copy',
        'sass:dist',
        'processhtml'
    ]);

};
