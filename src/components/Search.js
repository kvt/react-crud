'use strict';

var React = require('react/addons');

var Search = React.createClass({
    handleChange: function() {
        this.props.onUserInput(this.refs.filterTextInput.getDOMNode().value);
    },
    render: function() {
        return (
          <div className="form-group">
            <label className="sr-only">Search by product name</label>
                <input
                    type="text"
                    placeholder="Search product name..."
                    className="form-control"
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                />
          </div>
        );
    }
});

module.exports = Search;
