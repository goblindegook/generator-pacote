'use strict';
var yeoman = require('yeoman-generator');
var assign = require('lodash/assign');
var camelCase = require('lodash/camelCase');
var kebabCase = require('lodash/kebabCase');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  /**
   * Constructor.
   */
  constructor: function () {
    yeoman.Base.apply(this, arguments);
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
        message: 'What do you want to call your module?',
        default: kebabCase(this.appname),
        filter: function (name) {
          return kebabCase(name);
        }
      }, {
        type: 'input',
        name: 'description',
        message: 'How would you describe your module in a few words?'
      }, {
        type: 'input',
        name: 'authorName',
        message: 'What is your name?'
      }, {
        type: 'input',
        name: 'email',
        message: 'What is your email?'
      }, {
        type: 'input',
        name: 'authorUrl',
        message: 'What is your website\'s URL?'
      }, {
        type: 'input',
        name: 'githubUsername',
        store: true,
        message: 'What is your Github username?'
      }
    ];

    return this.prompt(prompts)
      .then(function (props) {
        this.props = props;
        done();
      }.bind(this));
  },

  /**
   * Writing files.
   */
  writing: function () {
    var props = assign(Object.create(this.props), {
      camelCaseName: camelCase(this.props.name)
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
