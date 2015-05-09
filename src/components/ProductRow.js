'use strict';

var React = require('react/addons');
var Search = require("./Search.js");

var ProductRow = React.createClass({
  editProduct: function() {
    this.props.editProduct(this.props.index);
  },
  deleteProduct:function() {
    this.props.deleteProduct(this.props.index);
  },
  render: function() {

    var product = this.props.product, view="item  col-xs-4 col-lg-4";
    if(this.props.view) {
      view = "item col-xs-4 col-lg-4 list-group-item";
    }
      return (
        <div className={view}>
            <div className="thumbnail">
                <img className="group list-group-image" src={product.picture} alt="" />
                <div className="caption">
                    <h4 className="group inner list-group-item-heading">{product.name}</h4>
                    <p className="group inner list-group-item-text">{product.desc}</p>
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <p className="lead"> {product.price}</p>
                        </div>
                        <div className="col-xs-12 col-md-6 actions">
                            <a className="btn btn-success" onClick={this.editProduct}>edit</a>
                            <a className="btn btn-success" onClick={this.deleteProduct}>delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  }
});

module.exports = ProductRow;
