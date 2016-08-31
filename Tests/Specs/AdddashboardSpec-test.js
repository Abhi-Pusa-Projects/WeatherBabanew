var React = require('react');
var AddDashboard = require('../../public/components/chart/AddDashboard.js');
var ReactTestUtils = require('react-addons-test-utils');
var expect = require('expect');

describe('AddDashboard', function(){

    it('should render', function(){

      var renderer = ReactTestUtils.createRenderer();
      renderer.render(<AddDashboard/>);
      var result = renderer.getRenderOutput();
      expect(result.type).toBe('i');
      expect(result.props.className).toEqual("fa fa-plus fa-fw ");

    });

});
