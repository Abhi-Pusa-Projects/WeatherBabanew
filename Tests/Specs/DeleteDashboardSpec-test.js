var React = require('react');
var DeleteDashboard = require('../../public/components/Chart/DeleteDashboard.js');
var ReactTestUtils = require('react-addons-test-utils');
var expect = require('expect');

describe('DeleteDashboard', function(){

    it('should render', function(){
    
      var renderer = ReactTestUtils.createRenderer();
      renderer.render(<DeleteDashboard/>);
      var result = renderer.getRenderOutput();
      expect(result.type).toBe('i');
      expect(result.props.className).toEqual("fa fa-minus fa-fw ");
    });

});
