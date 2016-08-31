var React = require('react');
var ChartCanvas = require('../../public/components/Chart/ChartCanvas.js');
var ReactTestUtils = require('react-addons-test-utils');
var expect = require('expect');

describe('ChartCanvas', function(){

    it('should render', function(){
    
      var renderer = ReactTestUtils.createRenderer();
      renderer.render(<ChartCanvas/>);
      var result = renderer.getRenderOutput();
      expect(result.type).toBe('div');

    });

});
