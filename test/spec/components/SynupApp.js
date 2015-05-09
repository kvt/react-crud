'use strict';

describe('SynupApp', function () {
  var React = require('react/addons');
  var SynupApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    SynupApp = require('components/SynupApp.js');
    component = React.createElement(SynupApp);
  });

  it('should create a new instance of SynupApp', function () {
    expect(component).toBeDefined();
  });
});
