var React = require('react');
var PropTypes = React.PropTypes;

var NumbersFrame = React.createClass({

    render: function() {
        var numbers = [],
            className;

        for (var i = 1; i <= 9; i++) {
            className = "number selected-" + (this.props.selectedNumbers.indexOf(i) > -1)
            numbers.push(
                <div className={className} onClick={this.props.selectNumber.bind(null, i)}>{i}</div>
            );
        }

        return (
            <div id="numbers-frame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }

});

module.exports = NumbersFrame;
