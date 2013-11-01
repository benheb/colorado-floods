module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      my_target: {
        files: {
          'js/application.min.js': ['js/app.js', 'js/donut.js', 'js/effects.js', 'js/map.js']
        }
      }
    },
    imagemin: {                          // Task
      dist: {                            // Target
        options: {                       // Target options
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
        },
        files: {                         // Dictionary of files
          'img/goes-wv-loop.gif': 'dev/images/goes-wv-loop.gif'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');


  //image optimization
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
