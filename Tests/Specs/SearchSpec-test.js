var React = require('react');
var Search = require('../../public/components/menu/Search.js');
var ReactTestUtils = require('react-addons-test-utils');
var expect = require('expect');

describe('Search', function(){

    it('should render', function(){
    
      var renderer = ReactTestUtils.createRenderer();
      renderer.render(<Search/>);
      var result = renderer.getRenderOutput();
      expect(result.type).toBe('div');
      expect(result.props.children).toEqual([
        <input type="text" id="txtautocomplete" className="form-control" placeholder="Search..."/>,
        <span className="input-group-btn" />
      ]);

    });

});
