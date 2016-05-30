var React = require('react'),
    config  = require('../config');

var NumbersFrame = React.createClass({

    render: function() {
        var numbers = [],
            selectedNumbers = this.props.selectedNumbers,
            usedNumbers = this.props.usedNumbers,
            className;

        for (var i = 1; i <= config.numberOfStars; i++) {
            className = "number selected-" + (selectedNumbers.indexOf(i) > -1);
            className += " used-" + (usedNumbers.indexOf(i) > -1);
            numbers.push(
                <div key={i} className={className} onClick={this.props.selectNumber.bind(null, i)}>{i}</div>
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
