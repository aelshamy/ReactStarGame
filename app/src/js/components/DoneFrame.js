var React = require('react');

var DoneFrame = React.createClass({

    render: function() {
        return (
            <div className="well text-center" >
                <h2>{this.props.doneStatus}</h2>
                <button onClick={this.props.resetGame} className="btn btn-default">
                    Play again
                </button>
            </div>
        );
    }

});

module.exports = DoneFrame;
