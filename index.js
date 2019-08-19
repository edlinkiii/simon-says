const pieces = [];
const simonSays = [];
const guesses = [];
let listenForGuesses = false;
let pieceTimer;
let guessTimer;

const lightItUp = piece => {
    piece.classList.add('lit');
    setTimeout(() => {
        piece.classList.remove('lit');
    }, 500);
}

const doSimonSays = () => {
    simonSays.push(randomPiece());

    let i = 0;
    pieceTimer = setInterval(() => {
        lightItUp(pieces[simonSays[i]]);
        i++;
        if(i >= simonSays.length) {
            clearInterval(pieceTimer);
            listenForGuesses = true;
            startGuessTimer();
        }
    }, 1000);
}

const startGuessTimer = () => {
    guessTimer = setTimeout(() => {
        wrong();
    }, 3000);
}

const checkGuesses = () => {
    for(let i=0; i < guesses.length; i++) {
        if(guesses[i] === simonSays[i]) {
            // correct...
        }
        else {
            wrong();
            return false;
        }
    }
    if(listenForGuesses && guesses.length === simonSays.length) {
        listenForGuesses = false;
        guesses.length = 0;
        setTimeout(() => {
            doSimonSays();
        }, 2000);
    }
    else {
        startGuessTimer();
    }
}

const resetGame = () => {
    clearInterval(pieceTimer);
    simonSays.length = 0;
    guesses.length = 0;
}

const randomPiece = () => {
    return Math.floor(Math.random() * (3 - 0 + 1) + 0);
}

const wrong = () => {
    listenForGuesses = false;
    document.querySelector('body').style.backgroundColor = 'red';
    document.querySelector('#start').style.visibility = 'visible';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#game .piece').forEach(piece => {
        pieces.push(piece);
        piece.addEventListener('click', e => {
            if(listenForGuesses) {
                if(guessTimer) {
                    clearTimeout(guessTimer);
                }
                lightItUp(piece);
                guesses.push(parseInt(piece.id.substring(6)));
                checkGuesses();
            }
        });
    });
    document.querySelector('#start').addEventListener('click',() => {
        document.querySelector('body').style.backgroundColor = 'white';
        document.querySelector('#start').style.visibility = 'hidden';
        resetGame();
        doSimonSays();
    });
});
