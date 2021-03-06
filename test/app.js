'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var test = require('yeoman-test');

describe('generator-pacote:app', function () {
  before(function (done) {
    test.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'rainbow-maker'})
      .withPrompts({description: 'Rainbow maker.'})
      .withPrompts({authorName: 'unicorn'})
      .withPrompts({email: 'unicorn@rainbo.ws'})
      .withPrompts({authorUrl: 'http://rainbo.ws'})
      .withPrompts({githubUsername: 'unicorn'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.babelrc',
      '.editorconfig',
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
