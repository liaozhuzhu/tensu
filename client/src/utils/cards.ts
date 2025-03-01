type PlayingCard = {
    suit: string;
    value: number;
}

type Deck = PlayingCard[];

const createDeck = (): Deck => {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const deck: Deck = [];
    
    // create all 52 cards
    for (let i = 0; i < suits.length; i++) {
        for (let j = 1; j <= 13; j++) {
            const card: PlayingCard = {
                suit: suits[i],
                value: j
            }
            deck.push(card);
        }
    }

    return deck;
}

const shuffleDeck = (): Deck => {
    const shuffledDeck: Deck = [];
    let newDeck: Deck = createDeck();
    while (newDeck.length) {
        // made up some brute force "shuffling" but maybe there's a faster way
        const randomIndex = Math.floor(Math.random() * newDeck.length);
        const randomCard = newDeck[randomIndex];
        shuffledDeck.push(randomCard);
        newDeck = [...newDeck.slice(0, randomIndex), ...newDeck.slice(randomIndex + 1)];
    }
    return shuffledDeck;
}

const drawCard = (shuffledDeck: Deck, numCards: number): Deck => {
    const DrawnCards: PlayingCard[] = [];
    for (let i = 0; i < numCards; i++) {
        const card = shuffledDeck.pop();
        if (card) {
            DrawnCards.push(card);
        }
    }
    return DrawnCards;
}

const shuffledDeck = shuffleDeck();
console.log(drawCard(shuffledDeck, 3));
console.log(drawCard(shuffledDeck, 1));
console.log(drawCard(shuffledDeck, 1));

export {createDeck, shuffleDeck}