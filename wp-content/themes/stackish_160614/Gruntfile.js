module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      concat: {
        dist: {
          src: [
            //lib scripts where order matters
            'js/lib/rangy-core.js',
            'js/lib/rangy-cssclassapplier.js',

            //lib else
            'js/lib/*.js',
            
            //stackish
            'js/app/*.js'
          ],
          dest: 'js/build/production.js',
        }
      },

      uglify: {
        build: {
          src: 'js/build/production.js',
          dest: 'js/build/production.min.js'
        }
      },

      compass: {
        dist: {
          options: {
            sassDir: 'sass',
            cssDir: '',
            imagesDir: 'images',
            javascriptsDir: 'js',
            fontsDir: 'fonts',
            outputStyle: 'nested'
          }
        }
      },

      imagemin: {
        dynamic: {
          files: [{
            expand: true,
            cwd: 'images/',
            src: ['*.{png,jpg,gif}'],
            dest: 'images/build/'
          }]
        }
      },

      watch: {
        scripts: {
          files: ['js/lib/*.js', 'js/app/*.js'],
          tasks: ['concat', 'uglify'],
          options: {
              spawn: false,
          },
        },
        images: {
          files: ['images/*.{png,jpg,gif}'],
          tasks: ['imagemin'],
          options: {
              spawn: false,
          },
        },
        compass: {
          files: ['sass/**/*.{scss,sass}'],
          tasks: ['compass'],
          options: {
            spawn: false,
          }
        }
      }

    });

    // Depenencies
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tasks
    grunt.registerTask('default', ['concat', 'uglify', 'compass', 'imagemin', 'watch']);

};