'use strict';

var React = require('react/addons');
var Search = require("./Search.js"); 

var Actions = React.createClass({
  listView: function() {
    this.props.setListView();
  },
  gridView: function() {
    this.props.setGridView();
  },
  addNewProduct: function(e) {
    e.preventDefault();
    this.props.addProduct();
  },
  render: function() {

    return (

    <div className="well well-sm">
        <div className="btn-group">
            <a onClick={this.listView} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-th-list"> </span>List</a> 
            <a onClick={this.gridView} href="#" id="grid" className="btn btn-default btn-sm"><span className="glyphicon glyphicon-th"></span>Grid</a>
        </div>
        <div className="pull-right">
          <form className="form-inline">
            <Search onUserInput={this.props.search} />
            <button className="btn btn-primary btn-new-product" onClick={this.addNewProduct}>Add new product</button>
          </form>
        </div>
    </div>
    );
  }
});

module.exports = Actions;
