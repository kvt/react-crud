'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.CSSTransitionGroup;

/*
 * import components
 */


var Search = require("./Search");
var Actions = require("./Actions");
var AddProduct = require("./AddProduct");
var ProductRow = require("./ProductRow");

// CONSTANTS
// store schema information to make easier add or delete fields
var SCHEMA = {
  "name": {
    type: "text",
    label: "Name"
  },
  "isActive": {
    type: "radio",
    label: "Is Active?",
    items:["Yes", "No"],
    values:[1, 0],
    defaultVal: 1
  },
  "price": {
    type: "text",
    label: "Price"
  },
  "picture": {
    type: "text",
    label: "Picture",
    defaultVal: "http://placehold.it/400x200&text=Product+Image"
  },
  "desc": {
    type: "textarea",
    label: "Description"
  },
  "company": {
    type: "text",
    label: "Company"
  }

};
var LIST_VIEW = 1;
var GRID_VIEW = 0;

var DIALOG_ALL_PRODUCTS = 0; // hide modal
var DIALOG_EDIT_PRODUCT = 1; // open modal to edit product
var DIALOG_ADD_PRODUCT = 2; // open modal to add product

// Include CSS in webpack
require('normalize.css');
require('../styles/main.css');


var SynupApp = React.createClass({
    /* default state */
  getInitialState: function() {
    return ({
      products: [], // collection of products
      view: GRID_VIEW, // default grid view
      filterText: '', // store search query
      /* dialog
       * 0 = hide modal
       * 1 = open modal to edit product
       * 2 = open modal to add product
       */
      dialog: DIALOG_ALL_PRODUCTS,
      index: null // store product index to delete and edit
    });
  },
  /* make request to get data after component mounted */
  componentDidMount: function() {
    var self = this;
    $.get("getData.json", function(data) {
      if(self.isMounted()) {
        var state = self.state;
        state.products = data;
        self.setState(state);
      }

    });
  },
  /* add or update product */
  saveChanges: function(product) {

    //save previous state
    var state = this.state;

    // check for add product or edit product
    if(this.state.dialog === DIALOG_ADD_PRODUCT) {
      // add new product to products collection
      state.products.push(product);
    } else {
      // update collection at index
      state.products[state.index] = product;
    }
    // hide modal
    state.dialog = DIALOG_ALL_PRODUCTS;
    this.setState(state);

  },
  deleteProduct:function(index) {
    var state = this.state;
    // delete product object from array
    state.products.splice(index,1);
    this.setState(state);
  },
  addProduct: function() {
    var state = this.state;
    // to add product, index is not required so set it to null
    state.index = null;
    state.dialog = DIALOG_ADD_PRODUCT;
    this.setState(state);
  },
  editProduct: function(index) {
    var state = this.state;
    state.dialog = DIALOG_EDIT_PRODUCT;
    state.index = index;
    this.setState(state);
  },
  setListView: function(view) {
    var state = this.state;
    state.view = LIST_VIEW;
    this.setState(state);
  },
  setGridView: function(view) {
    var state = this.state;
    state.view = GRID_VIEW;
    this.setState(state);
  },
  closeModal: function() {
    var state = this.state;
    state.dialog = DIALOG_ALL_PRODUCTS;
    this.setState(state);
  },
  search: function(filterText) {
    var state = this.state;
    state.filterText = filterText;
    this.setState(state);
  },
  render: function() {
    // store filtered collection
    var items = [];

    // loop through all products

    this.state.products.forEach((function(product, index) {
      // match search text in product name, case insensative
      if(!(new RegExp(this.state.filterText, "i")).test(product.name)) {
        // return from here if it is not matched
        return false;
      }
      // add to collection if it is matched
      items.push(<ProductRow
                 index={index}
                 editProduct={this.editProduct}
                 view={this.state.view}
                 key={product._id}
                 product={product}
                 deleteProduct={this.deleteProduct}/>);
    }).bind(this));

    return (
      <div className='main'>

        <Actions
          search={this.search}
          setListView={this.setListView}
          setGridView={this.setGridView}
          addProduct={this.addProduct}/>

        <div id="products" className="row list-group">
          <ReactTransitionGroup transitionName="fade">
            {items}
          </ReactTransitionGroup>
        </div>

          <ReactTransitionGroup transitionName="fade">
            <AddProduct
              saveChanges={this.saveChanges}
              schema={SCHEMA}
              product={this.state.products[this.state.index]}
              closeModal={this.closeModal}
              addProduct={this.state.dialog === DIALOG_ADD_PRODUCT ? true : false}
              showModal={this.state.dialog === DIALOG_ALL_PRODUCTS ? false : true} />
          </ReactTransitionGroup>
      </div>
    );
  }
});



module.exports = SynupApp;
