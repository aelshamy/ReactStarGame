var React = require('react'),
    StarsFrame  = require('./StarsFrame'),
    ButtonFrame  = require('./ButtonFrame'),
    AnswerFrame  = require('./AnswerFrame'),
    NumbersFrame  = require('./NumbersFrame');

var Game = React.createClass({
    getInitialState: function() {
        return {
            numberOfStars: Math.floor(Math.random() * 9) + 1,
            selectedNumbers: [],
            correct: null
        };
    },
    selectNumber: function(clickedNumber) {
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
            this.setState({selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)});
        }
    },
    unSelectNumber: function(clickedNumber) {
        var selectedNumbers = this.state.selectedNumbers,
            index = selectedNumbers.indexOf(clickedNumber);

        selectedNumbers.splice(index, 1);
        this.setState({selectedNumbers: selectedNumbers});
    },
    sumOfSelectedNumbers: function() {
        return this.state.selectedNumbers.reduce(function(p, n) {
            return p + n;
        }, 0);
    },
    checkAnswer: function() {
        var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
        this.setState({correct: correct})
    },
    render: function() {
        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr/>
                <div className="clearfix">
                    <StarsFrame numberOfStars={this.state.numberOfStars}/>
                    <ButtonFrame selectedNumbers={this.state.selectedNumbers} correct={this.state.correct} checkAnswer={this.checkAnswer}/>
                    <AnswerFrame selectedNumbers={this.state.selectedNumbers} unSelectNumber={this.unSelectNumber}/>
                </div>
                <NumbersFrame selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber}/>
            </div>
        );
    }
});

module.exports = Game;
