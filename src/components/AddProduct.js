'use strict';

var React = require('react/addons');
var Text = require('./Text');
var TextArea = require('./TextArea');
var Radio = require('./Radio');



var AddProduct = React.createClass({
  closeModal: function() {
    this.props.closeModal();
  },
  generateId: function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  },


  saveChange: function() {
    /*
     * TODO: validation
     */
    var product = (this.props.product ? this.props.product : {});
    if(this.props.addProduct) {
      product._id = this.generateId();
    }


    var schema = this.props.schema;
    for(var i in schema) {
      var field = schema[i];
      //TODO do it react way instead of jquery
      if(field.type == 'radio') {
        product[i] = $('form.form-horizontal [name="'+ i +'"]:checked').val();
      } else {
        product[i] = $('form.form-horizontal [name="'+ i +'"]').val();
      }
    }

    this.props.saveChanges(product);
  },

  render: function() {
    var schema = this.props.schema;
    var formElements = [];

    var product = (this.props.product ? this.props.product : (function() {
      var defaultProduct = {};
      for(var i in schema) {
        var field = schema[i];
        defaultProduct[i] = (field.defaultVal !== undefined ? field.defaultVal : "");
      }
      return defaultProduct;

    })());

    for(var i in schema) {
      var field = schema[i];

      switch(field.type) {
        case "radio":
          formElements.push(<Radio field={field} product={product} name={i} />);
          break;
        case "textarea":
          formElements.push(<Text field={field} product={product} name={i} />);
          break;
        default:
          formElements.push(<Text field={field} product={product} name={i} />);

      }
    }

    if(!this.props.showModal) {
      return false;
    }

    var productTitle = product.name;
    var action = (this.props.addProduct ? "Add" : "Edit");
    return (
      <div className="modal" id="product-actions">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" onClick={this.closeModal} className="close"><span >&times;</span></button>
              <h4 className="modal-title">{action} {productTitle}</h4>
            </div>
            <div className="modal-body">

            <form className="form-horizontal">
              {formElements}
            </form>

            </div>
            <div className="modal-footer">
              <button type="button" onClick={this.closeModal} className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" onClick={this.saveChange.bind(null)} className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AddProduct;
