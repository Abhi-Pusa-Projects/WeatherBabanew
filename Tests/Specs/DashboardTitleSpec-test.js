var React = require('react');
var DashboardTitle = require('../../public/components/Chart/DashboardTitle.js');
var ReactTestUtils = require('react-addons-test-utils');
var expect = require('expect');

describe('DashboardTitle', function(){

    it('should render', function(){
    
      var renderer = ReactTestUtils.createRenderer();
      renderer.render(<DashboardTitle/>);
      var result = renderer.getRenderOutput();
      expect(result.type).toBe('div');
      expect(result.props.className).toEqual("row");

    });

});
