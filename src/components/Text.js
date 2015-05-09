'use strict';

var React = require('react/addons');

var Text = React.createClass({
  render: function() {

    var field = this.props.field;
    var name = this.props.name
    var defaultValue = this.props.product[name];

    return (
      <div className="form-group" ref={name}>
        <label for="name" className="col-sm-2 control-label">{field.label}</label>
        <div className="col-sm-10">
          <input type="text" name={name} className="form-control" defaultValue={defaultValue} ref={name}/>
        </div>
      </div>
    )
  }
});

module.exports = Text;
