const gameState = {
    flippedCards: [],
    cardShowTimeLength: 1000,
    timeoutId: null,
    numberOfMatchesToFind: null,
    numberOfMatchesFound: 0,
};

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

function isCardMatch(card1, card2) {
    return card1.textContent === card2.textContent;
}

function handleOnClickCard(event) {
    const { flippedCards, cardShowTimeLength } = gameState;

    const target = event.target;
    flippedCards.push(target);
    flipCard(target);

    if (flippedCards.length === 2) {
        if (isCardMatch(flippedCards[0], flippedCards[1])) {
            flippedCards.forEach((card) => {
                card.classList.add('matched');
            });
            gameState.numberOfMatchesFound++;

            if (
                gameState.numberOfMatchesFound ===
                gameState.numberOfMatchesToFind
            ) {
                alert('You won!');
            }
        } else {
            gameState.timeoutId = setTimeout(() => {
                flippedCards.forEach((card) => {
                    unflipCard(card);
                });
            }, cardShowTimeLength);
        }
        gameState.flippedCards = [];
    }

    if (flippedCards.length === 3) {
        for (let i = 0; i < 2; i++) {
            unflipCard(flippedCards[i]);
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

displayInitialCards(generateInitialCardList());
