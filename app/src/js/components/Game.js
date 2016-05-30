var React = require('react'),
    config  = require('../config'),
    StarsFrame  = require('./StarsFrame'),
    ButtonFrame  = require('./ButtonFrame'),
    AnswerFrame  = require('./AnswerFrame'),
    NumbersFrame  = require('./NumbersFrame'),
    DoneFrame  = require('./DoneFrame');


var Game = React.createClass({
    getInitialState: function() {
        return {
            numberOfStars: this.randomNumber(),
            selectedNumbers: [],
            usedNumbers:[],
            correct: null,
            redraws:5,
            doneStatus:null
        };
    },
    resetGame: function() {
            this.replaceState(this.getInitialState());
    },
    randomNumber:function() {
        return Math.floor(Math.random() * config.numberOfStars) + 1;
    },
    selectNumber: function(clickedNumber) {
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
                correct: null
            });
        }
    },
    unSelectNumber: function(clickedNumber) {
        var selectedNumbers = this.state.selectedNumbers,
            index = selectedNumbers.indexOf(clickedNumber);

        selectedNumbers.splice(index, 1);
        this.setState({
            selectedNumbers: selectedNumbers,
            correct: null
        });
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
    acceptAnswer: function() {
        var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
        this.setState({
            selectedNumbers:[],
            usedNumbers:usedNumbers,
            correct:null,
            numberOfStars:this.randomNumber()
        }, function() {
            this.updateDoneStatus();
        })
    },
    redraw: function() {
        var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers),
            redraws = this.state.redraws - 1;

        if( this.state.redraws > 0){
            this.setState({
                numberOfStars: this.randomNumber(),
                correct:null,
                selectedNumbers:[],
                redraws:redraws
            }, function() {
                this.updateDoneStatus();
            });
        }
    },
    possibleCombinationSum:function (arr, n) {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
          arr.pop();
          return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount ; i++ ) {
          var combinationSum = 0;
          for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
          }
          if (n === combinationSum) { return true; }
        }
        return false;
    },
    possibleSolution:function () {
        var numberOfStars = this.state.numberOfStars,
            possibleNumbers = [],
            usedNumbers = this.state.usedNumbers;

        for (var i = 1; i < config.numberOfStars; i++) {
            if(usedNumbers.indexOf(i)<0){
                possibleNumbers.push(i);
            }
        }

        return this.possibleCombinationSum(possibleNumbers, numberOfStars)
    },
    updateDoneStatus:function () {
        if(this.state.usedNumbers.length === config.numberOfStars){
            this.setState({
                doneStatus:config.winMessage
            });
            return;
        }
        if(this.state.redraws === 0 && !this.possibleSolution()){
            this.setState({
                doneStatus:config.loseMessage
            });
            return;
        }
    },
    render: function() {
        var selectedNumbers = this.state.selectedNumbers,
            usedNumbers = this.state.usedNumbers,
            numberOfStars = this.state.numberOfStars,
            correct= this.state.correct,
            doneStatus = this.state.doneStatus,
            redraws = this.state.redraws,
            bottomFrame;

            if(doneStatus){
                bottomFrame = ( <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/>);
            }else{

                bottomFrame = ( <NumbersFrame selectedNumbers={selectedNumbers}
                              usedNumbers={usedNumbers}
                              selectNumber={this.selectNumber} />);
            }
        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr/>
                <div className="clearfix">
                    <StarsFrame numberOfStars={numberOfStars}/>
                    <ButtonFrame selectedNumbers={selectedNumbers}
                                correct={correct}
                                checkAnswer={this.checkAnswer}
                                acceptAnswer={this.acceptAnswer}
                                redraw={this.redraw} redraws={redraws} />
                    <AnswerFrame selectedNumbers={selectedNumbers} unSelectNumber={this.unSelectNumber}/>
                </div>
                {bottomFrame}
            </div>
        );
    }
});

module.exports = Game;
