'use strict';

var React = require('react/addons');

var RadioItem = React.createClass({
  render: function() {

    var field = this.props.field;
    var name = this.props.name;
    var product = this.props.product;
    var value = product[name];
    var defaultChecked = (value == this.props.value ? true : false);

    return (
        <label>
          <input type="radio" defaultChecked={defaultChecked} value={this.props.value} name={name} ref={name}/>  {this.props.label}
        </label>
    );
  }
});


module.exports = RadioItem;
