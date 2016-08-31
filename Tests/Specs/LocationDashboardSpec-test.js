var React = require('react');
var LocationDashboard = require('../../public/components/Chart/LocationDashboard.js');
var ReactTestUtils = require('react-addons-test-utils');
var expect = require('expect');

describe('LocationDashboard', function(){

    it('should render', function(){
    
      var renderer = ReactTestUtils.createRenderer();
      renderer.render(<LocationDashboard/>);
      var result = renderer.getRenderOutput();
      expect(result.type).toBe('i');
      expect(result.props.className).toEqual("fa fa-dot-circle-o fa-fw ");

    });

});
