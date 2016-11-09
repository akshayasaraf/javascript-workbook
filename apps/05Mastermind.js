'use strict';

var assert = require('assert');
var colors = require('colors/safe');
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var board = [];
var solution = '';
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var guess = ' ';

function printBoard() {
    for (var i = 0; i < board.length; i++) {
        console.log(board[i]);
    }
}

function generateSolution() {
    for (var i = 0; i < 4; i++) {
        var randomIndex = getRandomInt(0, letters.length);
        solution += letters[randomIndex];
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(solution, guess) {
    var solutionArray = solution.split('');
    var guessArray = guess.split('');
    var correctLetterLocations = 0;

    for (var i = 0; i <= solution.length - 1; i++) {
        if (solutionArray[i] === guessArray[i]) {
            correctLetterLocations++;
            solutionArray[i] = null;
        }
    }

    var correctLetters = 0;
    for (var i = 0; i <= solution.length - 1; i++) {
        var targetIndex = solutionArray.indexOf(guessArray[i]);
        if (targetIndex > -1) {
            correctLetters++;
            solutionArray[targetIndex] = null;
        }
    }
    return (correctLetterLocations + "-" + correctLetters);

}


function mastermind(guess) {
    board [0]= guess;
    console.log(generateHint(solution, guess));
    console.log(guess);
    console.log(solution);
    if (guess != 0 || guess != null) {
        if (guess === solution) {
            return ('You guessed it!');
        }

    }


}

function getPrompt() {
    // 
    rl.question('guess: ', (guess) => {
        console.log(mastermind(guess));
        // console.log(guess);
        printBoard(guess);
        getPrompt();
    });
}

// Tests

if (typeof describe === 'function') {

    describe('#mastermind()', function() {
        it('should register a guess and generate hints', function() {
            solution = 'abcd';
            mastermind('aabb');
            assert.equal(board.length, 1);
        });
        it('should be able to detect a win', function() {
            assert.equal(mastermind(solution), 'You guessed it!');
        });
    });

    describe('#generateHint()', function() {
        it('should generate hints', function() {
            assert.equal(generateHint('abcd', 'abdc'), '2-2');
        });
        it('should generate hints if solution has duplicates', function() {
            assert.equal(generateHint('abcd', 'aabb'), '1-1');
        });

    });

} else {
    generateSolution();
    getPrompt();
}
