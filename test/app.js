'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-pacote:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'rainbow-maker'})
      .withPrompts({description: 'Rainbow maker.'})
      .withPrompts({authorName: 'unicorn'})
      .withPrompts({authorEmail: 'unicorn@rainbo.ws'})
      .withPrompts({authorUrl: 'http://rainbo.ws'})
      .withPrompts({githubUser: 'unicorn'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.babelrc',
      '.editorconfig',
      '.eslintrc',
      '.gitignore',
      '.npmignore',
      '.travis.yml',
      'esdoc.json',
      'LICENSE',
      'package.json',
      'README.md',
      'src/index.js',
      'test/index.js'
    ]);
  });
});

