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
    const newDeck: Deck = createDeck();
    
}


export {createDeck, shuffleDeck}