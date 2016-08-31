var React = require('react');
var Navbar = require('../../public/components/menu/Navbar.js');
var ReactTestUtils = require('react-addons-test-utils');
var expect = require('expect');

describe('Navbar', function(){

    it('should render', function(){
    
      var renderer = ReactTestUtils.createRenderer();
      renderer.render(<Navbar/>);
      var result = renderer.getRenderOutput();
      expect(result.type).toBe('nav');
      expect(result.props.className).toEqual("navbar navbar-default navbar-static-top");

    });

});
