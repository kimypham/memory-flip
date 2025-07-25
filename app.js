const gameState = {
    flippedCards: [],
    cardShowTimeLength: 1000,
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

    if (flippedCards.length === 2) {
        return;
    }

    const target = event.target;
    flippedCards.push(target);
    flipCard(target);

    if (flippedCards.length === 2) {
        if (isCardMatch(flippedCards[0], flippedCards[1])) {
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
            gameState.flippedCards = [];
        } else {
            setTimeout(() => {
                flippedCards.forEach((card) => {
                    unflipCard(card);
                });
                gameState.flippedCards = [];
            }, cardShowTimeLength);
        }
    }
}

function createInitialCards() {
    const cardSymbols = ['🐶', '🐰', '🐯', '🐻', '🐼', '🐭', '🦊', '🐦'];
    const allCards = [...cardSymbols, ...cardSymbols];

    const randomisedCards = shuffleArray(allCards);

    const cardsCreated = randomisedCards.map((cardSymbol) =>
        createCard({
            cardSymbol,
            onClick: handleOnClickCard,
        })
    );

    document.querySelector('.card-container').append(...cardsCreated);
}

createInitialCards();
