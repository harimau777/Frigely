module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    eslint: {
      target: [
        [
          'client/js/**/*.js'
        ]
      ]
    }
  });

  /////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('start', [
    'nodemon'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);
};
