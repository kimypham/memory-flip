const gameState = {
    flippedCards: [],
};

function createCard({ cardSymbol, text, onClick }) {
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

function handleOnClickCard(event) {
    const { flippedCards } = gameState;

    if (flippedCards.length === 2) {
        flippedCards.forEach((card) => {
            card.classList.remove('clicked');
            card.classList.add('not-clicked');
        });
        gameState.flippedCards = [];
    }

    const target = event.target;

    gameState.flippedCards.push(target);
    target.classList.remove('not-clicked');
    target.classList.add('clicked');
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
