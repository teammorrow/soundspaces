/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: [
          'public/stylesheets/style.less',
        ],
        tasks: ['less'],
        options: {
          spawn: false,
        }
      }
    },
    less: {
      development: {
        files: {
          "public/stylesheets/style.css": "public/stylesheets/style.less"
        }
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          env: {
            PORT: '3001'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['less', 'nodemon']);
  grunt.registerTask('serve', ['nodemon']);
};
