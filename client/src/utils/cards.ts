type PlayingCard = {
    suit: string;
    value: number;
}

type Deck = PlayingCard[];

interface Player {
    id: number;
    hand: Deck;
}

const createDeck = (): Deck => {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const deck: Deck = [];
    
    // create all 52 cards
    for (let i = 0; i < suits.length; i++) {
        for (let j = 2; j <= 14; j++) {
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
    const DrawnCards: Deck = [];
    for (let i = 0; i < numCards; i++) {
        const card = shuffledDeck.pop();
        if (card) {
            DrawnCards.push(card);
        }
    }
    return DrawnCards;
}

const handRanks = new Map([
    ["highCard", 0],
    ["pair", 14],
    ["twoPair", 28],
    ["trips", 42],
    ["straight", 56],
    ["flush", 70],
    ["fullHouse", 84],
    ["quads", 98],
    ["straightFlush", 112],
    ["royalFlush", 126]
]);    

const getBoardScore = (sortedBoard: Deck) => {
    const cardCounts: number[] = Array<number>(14).fill(0); // length 14 (consider ace as 0 and 13)
    const suitCounts = new Map(Object.entries({
        "hearts": 0,
        "spades": 0,
        "diamonds": 0,
        "clubs": 0
    }));
    let boardScore = 0;

    for (let i = 0; i < 5; i++) {
        const card = sortedBoard[i];
        if (card.value == 14) {
            cardCounts[0]++;
        }
        cardCounts[card.value-1]++;
        const suitCount = suitCounts.get(card.suit) || 0;
        suitCounts.set(card.suit, suitCount + 1);
    }

    // check for flush
    let isFlush = false
    for (let suit of suitCounts) {
        if (suit[1] === 5) {
            isFlush = true;
        }
    }
    
    // check for straight
    let isStraight = false;
    for (let i = 1; i < 5; i++) {
        if (sortedBoard[i].value - 1 !== sortedBoard[i-1].value) {
            isStraight = false;
            break;
        } else {
            isStraight = true;
        }
    }

    // check for flushes or straights
    if (isStraight || isFlush) {
        // check if both
        if (isStraight && isFlush) {
            // check if royal or just normal straight flush
            if (sortedBoard[sortedBoard.length-1].value === 14) {
                boardScore = handRanks.get('royalFlush') || 0;
            } else {
                boardScore = handRanks.get('straightFlush') || 0 + sortedBoard[sortedBoard.length-1].value;
            }
        } else if (isStraight) {
            boardScore = handRanks.get('straight') || 0 + sortedBoard[sortedBoard.length-1].value;
        } else {
            boardScore = handRanks.get('flush') || 0 + sortedBoard[sortedBoard.length-1].value;
        }
    }

    // otherwise check the rest
    let isTrips = false;
    let isPair = false;
    let isQuads = false;
    for (let i = 0; i < 14; i++) {
        // check for quds
        if (cardCounts[i] === 4) {
            isQuads = true;
        }
        // check for trips
        if (cardCounts[i] === 3) {
            isTrips = true;
        }
        if (cardCounts[i] === 2) {
            isPair = true;
        }
    }

    if (isQuads) {
        // if the board contains quads, we need to readadjust our kicker in case our kicker is what we've already added
        for (let i = 13; i > -1; i++) {
            if (cardCounts[i] === 1) {
                boardScore += handRanks.get('quads') || 0 + (i + 1) // where i+1 represents the cards value
                break
            }
        }
    } else if (isTrips || isPair) {
        // check if fullHouse
        if (isTrips && isPair) {
            for (let i = 0; i < 14; i++) {
                if (cardCounts[i] === 2) {
                    boardScore += handRanks.get('fullHouse') || 0; // handle kicker later when comparing against players
                }
            }
        } else if (isTrips) {
            boardScore += handRanks.get('trips') || 0 
        }
    }

    console.log(board);
    return boardScore;
}

const determineWinner = (board: Deck, players: Player[]): void => {

    const sortedBoard = board.sort((a,b) => a.value - b.value);

    for (let player of players) {
        const [card1, card2] = player.hand;
    }

    // first determine the board's score
    getBoardScore(sortedBoard);
}

const shuffledDeck = shuffleDeck();
const player1: Player = {id: 1, hand: drawCard(shuffledDeck, 2)};
const player2: Player = {id: 2, hand: drawCard(shuffledDeck, 2)};
const board: Deck = drawCard(shuffledDeck, 5);
determineWinner(board, [player1, player2])

export {createDeck, shuffleDeck}