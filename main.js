"use strict";

//counters for rounds won
let playerScore = 0;
let comScore = 0;

//randomly returns rock, paper or scissors
function computerPlay() {
    const options = ['rock', 'paper', 'scissors'];
    return options[randomInt(3)];
}

function randomInt(x) {
    return Math.floor(Math.random() * x);
}

function getPlayerOption() {
    return prompt('Will you choose rock, paper or scissors?');
}

function determineWinner(playerSel, computerSel) {
    let result;
    if (playerSel === computerSel) {
        result = 'The is round was a draw.';
    }
    else if(playerSel === 'rock') {
        if (computerSel === 'scissors') {
            result = 'You win! Rock beats scissors.';
            playerScore += 1;
        }
        else { //comp is paper
            result = 'You lose! Paper beats rock.';
            comScore += 1;
        }
    }
    else if(playerSel === 'paper') {
        if (computerSel === 'scissors') {
            result = 'You lose! Scissors beats paper.';
            comScore += 1;
        }
        else { //comp is rock
            result = 'You win! Paper beats rock.';
            playerScore += 1;
        }
    }
    else if(playerSel === 'scissors') {
        if (computerSel === 'paper') {
            result = 'You win! Scissors beats paper.';
            playerScore += 1;
        }
        else { //comp is rock
            result = 'You lose! Rock beats scissors.';
            comScore += 1;
        }
    }
    else {
        result = 'Your input was invalid.';
    }

    return result;
}

function displayPlayerStat(playerSelection) {
    const playerPara = document.querySelector('#player-selection');
    const playerScorePara = document.querySelector('#player-score');
    playerPara.innerText = playerSelection;
    playerScorePara.innerText = playerScore;
}

function displayComStat(computerSelection) {
    const comPara = document.querySelector('#com-selection');
    const comScorePara = document.querySelector('#com-score');
    comPara.innerText = computerSelection;
    comScorePara.innerText = comScore;
}

function displayRoundResult(result) {
    const resultPara = document.querySelector('.output > .result');
    resultPara.innerText = result;
}

function overallWinner() {
    if (playerScore === 5) {
        return 'player';
    }
    else if (comScore === 5) {
        return 'computer';
    }
    else {
        return false;
    }
}

function displayOverallWinner(winner) {
    document.body.innerText = winner.charAt(0).toUpperCase() + winner.slice(1) + ' is the winner of this 5 round match!';
    document.body.style.cssText = 'text-align: center; display: flex; flex-direction: column;'
    const retryButton = document.createElement('button');
    retryButton.innerText = 'Play Again';
    document.body.appendChild(retryButton);
    retryButton.addEventListener('click', () => {
        location.reload();
    });
}

//plays 1 round of rock, paper, scissors
function playRound(e) {
    const playerSelection = e.target.attributes[0].nodeValue;
    const computerSelection = computerPlay().toLowerCase();
    const result = determineWinner(playerSelection, computerSelection);

    displayRoundResult(result);
    displayPlayerStat(playerSelection);
    displayComStat(computerSelection);

    if (overallWinner()) {
        displayOverallWinner(overallWinner());
    }
}

//plays rounds number of rounds of RPS
function game(rounds) {
    for (let i = 0; i < rounds; i++) {
        playRound();
    }
}

const selections = document.querySelectorAll('.selection');
selections.forEach((selection) => {
    selection.addEventListener('click', playRound);
});