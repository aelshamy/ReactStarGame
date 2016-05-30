var React = require('react');

var AnswerFrame = React.createClass({

    render: function() {
        var props = this.props,
            selectedNumbers = props.selectedNumbers.map(function(i) {
                return (
                    <span key={i} onClick={props.unSelectNumber.bind(null, i)}>{i}</span>
                )
            });
        return (
            <div id="answer-frame">
                <div className="well">
                    {selectedNumbers}
                </div>
            </div>
        );
    }

});

module.exports = AnswerFrame;
