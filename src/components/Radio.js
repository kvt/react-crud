'use strict';

var React = require('react/addons');
var RadioItem = require('./RadioItem');

var Radio = React.createClass({
  render: function() {
    var items = [];

    var field = this.props.field;
    var name = this.props.name;
    var product = this.props.product;
    var defaultValue = product[name];

    field.values.forEach(function(value, i) {
      items.push(<RadioItem
                  field={field}
                  label={field.items[i]}
                  value={value}
                  product={product}
                  name={name} />);
    });

    return (
        <div className="form-group">
          <label for="active" className="col-sm-2 control-label">{field.label}</label>
          <div className="col-sm-10">
            <div className="checkbox">
              {items}
            </div>
          </div>
        </div>
    );
  }
});

module.exports = Radio;
