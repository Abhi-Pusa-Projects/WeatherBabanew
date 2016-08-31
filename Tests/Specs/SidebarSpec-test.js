var React = require('react');
var SideBar = require('../../public/components/menu/SideBar.js');
var ReactTestUtils = require('react-addons-test-utils');
var expect = require('expect');

describe('Sidebar', function(){

    it('should render', function(){
    
      var renderer = ReactTestUtils.createRenderer();
      renderer.render(<SideBar/>);
      var result = renderer.getRenderOutput();
      expect(result.type).toBe('div');
      expect(result.props.className).toEqual("navbar-default sidebar");
    });

});
