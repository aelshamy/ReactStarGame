var React = require('react');

var ButtonFrame = React.createClass({
    render: function() {
        var disabled,
            button,
            correct = this.props.correct;
        switch (correct) {
            case true:
                button = (
                    <button className="btn btn-success btn-lg">
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                );
                break;
            case false:
                button = (
                    <button className="btn btn-danger btn-lg">
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                );
                break;
            default:
                disabled = this.props.selectedNumbers.length === 0;
                button = (
                    <button className="btn btn-primary btn-lg" disabled={disabled} onClick={this.props.checkAnswer}>=</button>
                );

                break;
        }
        return (
            <div id="button-frame">
                {button}
            </div>
        );
    }

});

module.exports = ButtonFrame;
