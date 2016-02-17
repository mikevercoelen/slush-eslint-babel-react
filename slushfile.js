var gulp = require('gulp');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var inquirer = require('inquirer');
var npmInstallPackage = require('npm-install-package');

gulp.task('default', function (done) {
  var prompts = [{
    type: 'confirm',
    name: 'editorConfig',
    message: 'Do you want to generate an .editorconfig file?',
    default: true
  }, {
    type: 'confirm',
    name: 'semiColons',
    message: 'Do you use semi colons?',
    default: false
  }, {
    type: 'confirm',
    name: 'webpack',
    message: 'Are you going to use webpack?',
    default: true
  }, {
    type: 'confirm',
    name: 'babel',
    message: 'Do want to generate a .babelrc file?',
    default: false
  }]

  inquirer.prompt(prompts, function (answers) {
    var editorConfig = answers.editorConfig;
    var semiColons = answers.semiColons;
    var webpack = answers.webpack;
    var babel = answers.babel;

    var semiColonsRule = (semiColons) ? 'always' : 'never';

    var templates = [
      __dirname + '/templates/**/**'
    ]

    if (babel) {
      templates.push(__dirname + '/babel-templates/**/**')
    }

    gulp
      .src(templates)
      .pipe(template({
        semiColonsRule: semiColonsRule
      }))
      .pipe(rename(function (file) {
        if (file.basename[0] === '@') {
          file.basename = '.' + file.basename.slice(1);
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .on('end', function () {
        var devDeps = [
          'eslint',
          'babel-eslint',
          'eslint-config-standard',
          'eslint-config-standard-react',
          'eslint-plugin-babel',
          'eslint-plugin-promise',
          'eslint-plugin-react',
          'eslint-plugin-standard'
        ]

        if (webpack) {
          devDeps.push('eslint-loader')
        }

        if (babel) {
          devDeps = devDeps.concat([
            'babel-cli',
            'babel-core',
            'babel-eslint',
            'babel-loader',
            'babel-plugin-react-transform',
            'babel-plugin-transform-runtime',
            'babel-preset-es2015',
            'babel-preset-react',
            'babel-preset-stage-0',
            'babel-register',
            'babel-runtime'
          ])
        }

        var installOptions = {
          saveDev: true,
          cache: true
        }

        npmInstallPackage(devDeps, installOptions, done);
      });
  });
});
