var React = require('react');
var Chart = require('../../public/components/chart/Chart.js');
var ReactTestUtils = require('react-addons-test-utils');
var expect = require('expect');

describe('Chart', function(){

    it('should render', function(){
    
      var renderer = ReactTestUtils.createRenderer();
      renderer.render(<Chart/>);
      var result = renderer.getRenderOutput();
      expect(result.type).toBe('div');
      expect(result.props.className).toEqual("row");

    });

});
