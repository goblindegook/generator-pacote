'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  /**
   * Constructor.
   */
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
  },

  /**
   * User prompts.
   */
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-pacote') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your module name',
        default: _.kebabCase(this.appname)
      }, {
        type: 'input',
        name: 'description',
        message: 'Your module\'s description'
      }, {
        type: 'input',
        name: 'authorName',
        message: 'Your name'
      }, {
        type: 'input',
        name: 'authorEmail',
        message: 'Your email'
      }, {
        type: 'input',
        name: 'authorUrl',
        message: 'Your website URL'
      }, {
        type: 'input',
        name: 'githubUser',
        message: 'Your Github username'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  /**
   * Writing files.
   */
  writing: function () {
    var props = _.extend(Object.create(this.props), {
      camelCaseName: _.camelCase(this.props.name)
    });

    var dest = {
      '_babelrc': '.babelrc',
      '_editorconfig': '.editorconfig',
      '_eslintrc': '.eslintrc',
      '_gitignore': '.gitignore',
      '_npmignore': '.npmignore',
      '_travis.yml': '.travis.yml',
      'esdoc.json': 'esdoc.json'
    };

    var destTpl = {
      'LICENSE': 'LICENSE',
      'package.json': 'package.json',
      'README.md': 'README.md',
      'src/index.js': 'src/index.js',
      'test/index.js': 'test/index.js'
    };

    Object.keys(dest).forEach(function (src) {
      this.fs.copy(
        this.templatePath(src),
        this.destinationPath(dest[src])
      );
    }.bind(this));

    Object.keys(destTpl).forEach(function (src) {
      this.fs.copyTpl(
        this.templatePath(src),
        this.destinationPath(destTpl[src]),
        props
      );
    }.bind(this));
  },

  /**
   * Install.
   */
  install: function () {
    this.npmInstall();
  }
});
