const initialGameState = {
    flippedCards: [],
    cardShowTimeLength: 1000,
    timeoutId: null,
    numberOfMatchesToFind: null,
    numberOfMatchesFound: 0,
    numberOfMatchesTried: 0,
    secondsTaken: 0,
    secondsInterval: null,
};

var gameState = { ...initialGameState };

function createCard({ cardSymbol, onClick }) {
    const div = document.createElement('div');
    div.textContent = cardSymbol;
    div.className = 'card not-clicked';
    div.addEventListener('click', onClick);

    return div;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard(card) {
    card.classList.remove('not-clicked');
    card.classList.add('clicked');
}

function unflipCard(card) {
    card.classList.remove('clicked');
    card.classList.add('not-clicked');
}

function showPlayAgainModal() {
    document.querySelector('.modal').style.opacity = '1';
    document.querySelector('.modal').style.display = 'block';
}

function hidePlayAgainModal() {
    document.querySelector('.modal').style.opacity = '0';
    document.querySelector('.modal').style.display = 'none';
}

function isCardMatch(card1, card2) {
    return card1.textContent === card2.textContent;
}

function handleOnClickCard(event) {
    const target = event.target;

    if (
        target.classList.contains('clicked') ||
        target.classList.contains('matched')
    ) {
        return;
    } else {
        gameState.flippedCards.push(target);
        flipCard(target);
    }

    if (gameState.flippedCards.length === 2) {
        gameState.numberOfMatchesTried++;
        document.querySelector('.number-of-matches-tried').textContent =
            gameState.numberOfMatchesTried;

        if (isCardMatch(gameState.flippedCards[0], gameState.flippedCards[1])) {
            gameState.flippedCards.forEach((card) => {
                card.classList.add('matched');
            });
            gameState.numberOfMatchesFound++;

            if (
                gameState.numberOfMatchesFound ===
                gameState.numberOfMatchesToFind
            ) {
                clearInterval(gameState.secondsInterval);
                document.querySelector(
                    '.modal .number-of-matches-tried'
                ).textContent = gameState.numberOfMatchesTried;
                document.querySelector('.modal .seconds-counter').textContent =
                    gameState.secondsTaken;

                showPlayAgainModal();
            }
        } else {
            const cardsToUnflip = [...gameState.flippedCards];
            gameState.timeoutId = setTimeout(() => {
                cardsToUnflip.forEach((card) => {
                    unflipCard(card);
                });
            }, gameState.cardShowTimeLength);
        }

        gameState.flippedCards = [];
    }

    if (gameState.flippedCards.length > 2) {
        for (let i = 0; i < 2; i++) {
            unflipCard(gameState.flippedCards[i]);
        }

        gameState.flippedCards = [target];
        clearTimeout(gameState.timeoutId);
    }
}

function displayInitialCards(cards) {
    const cardsCreated = cards.map((cardSymbol) =>
        createCard({
            cardSymbol,
            onClick: handleOnClickCard,
        })
    );

    document.querySelector('.card-container').append(...cardsCreated);
}

function generateInitialCardList() {
    const cardSymbols = ['🐶', '🐰', '🐯', '🐻', '🐼', '🐭', '🦊', '🐦'];
    gameState.numberOfMatchesToFind = cardSymbols.length;

    const allCards = [...cardSymbols, ...cardSymbols];

    return shuffleArray(allCards);
}

function incrementSeconds() {
    gameState.secondsTaken++;
    document.querySelector('.seconds-counter').textContent =
        gameState.secondsTaken;
}

function resetGame() {
    document.querySelector('.card-container').innerHTML = '';
    document.querySelector('.number-of-matches-tried').textContent = '0';
    document.querySelector('.seconds-counter').textContent = '0';
    gameState = { ...initialGameState };

    displayInitialCards(generateInitialCardList());
    gameState.secondsInterval = setInterval(incrementSeconds, 1000);
}

document.querySelector('.play-again-button').addEventListener('click', () => {
    hidePlayAgainModal();
    resetGame();
});

displayInitialCards(generateInitialCardList());
gameState.secondsInterval = setInterval(incrementSeconds, 1000);
