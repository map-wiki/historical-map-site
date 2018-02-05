module.exports = function gruntTasks(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            js: {
                files: ['static/js/*.js'],
                tasks: ['webpack']
            }
        },
        webpack: {
            js: require('./webpack.config.js')({
                env: 'dev'
            })
        },
        nodemon: {
            server: require('./nodemon.json')
        },
        concurrent: {
            dev: {
                tasks: ['watch', 'nodemon'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        copy: {
            serverDistConfig: {
                expand: true,
                src: [
                    '*.js',
                    '*/*.js',
                    '**/*.js',
                    '**/*.json'
                ],
                cwd: 'server',
                dest: 'serverDist',
            }
        },

        clean: {
            build: ['dist', 'serverDist']
        }
    });

    // custom task can be put into grunt tasks
    // grunt.loadTasks('grunt/tasks');

    grunt.registerTask('dev', ['webpack', 'concurrent:dev']);
    grunt.registerTask('build', ['clean', 'copy']);
};
