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
    },

    shell: {
      npmInstall: {
        command: 'npm install'
      },
      bowerInstall: {
        command: 'bower install'
      }
    }
  });

  /////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('start', [
    'nodemon'
  ]);

  grunt.registerTask('install', [
    'shell:npmInstall',
    'shell:bowerInstall'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);
};
