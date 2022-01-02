import './App.css';
import { useCallback, useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
    { src: '/one-piece/Luffy.png', matched: false },
    { src: '/one-piece/Zoro.png', matched: false },
    { src: '/one-piece/Nami.png', matched: false },
    { src: '/one-piece/Usopp.png', matched: false },
    { src: '/one-piece/Sogeking.png', matched: false },
    { src: '/one-piece/Sanji.png', matched: false },
    { src: '/one-piece/Chopper.png', matched: false },
    { src: '/one-piece/Robin.png', matched: false },
    { src: '/one-piece/Franky.png', matched: false },
    { src: '/one-piece/Brook.png', matched: false },
    { src: '/one-piece/Jinbe.png', matched: false },
    { src: '/one-piece/Law.png', matched: false },
    { src: '/one-piece/Ace.png', matched: false },
    { src: '/one-piece/Sabo.png', matched: false },
    { src: '/one-piece/Bartolomeo.png', matched: false },
    { src: '/one-piece/Shanks.png', matched: false },
    { src: '/one-piece/Whitebeard.png', matched: false },
    { src: '/one-piece/Big_Mom.png', matched: false },
    { src: '/one-piece/Mihawk.png', matched: false },
    { src: '/one-piece/Buggy.png', matched: false },
    { src: '/one-piece/Ivankov.png', matched: false },
    { src: '/one-piece/Teach.png', matched: false },
    { src: '/one-piece/Kid.png', matched: false },
    { src: '/one-piece/Koby.png', matched: false },
];

function App() {
    const easyMode = cardImages.slice(0, 6);
    const mediumMode = cardImages.slice(0, 12);
    const hardMode = cardImages.slice(0, 18);
    const expertMode = cardImages.slice(0, 24);

    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [mode, setMode] = useState(easyMode);

    //shuffle cards
    const shuffleCards = useCallback(() => {
        const shuffledCards = [...mode, ...mode]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
    }, [mode]);

    // for (let index = 0; index < cards.length; index++) {
    //     console.log(cards[index].matched);
    // }
    const finishedGame = (arr) => arr.every((i) => i.matched === true);

    //handle choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    //compare 2 selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    //reset choices and +turn
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
        setDisabled(false);
    };

    //start a new game automatically
    useEffect(() => {
        shuffleCards();
    }, [shuffleCards]);

    return (
        <div className="App">
            <h1>One Piece Memory Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className="difficulty">
                <button onClick={() => setMode(easyMode)}>Easy</button>
                <button onClick={() => setMode(mediumMode)}>Medium</button>
                <button onClick={() => setMode(hardMode)}>Hard</button>
                <button onClick={() => setMode(expertMode)}>Expert</button>
            </div>
            <div className="card-grid">
                {cards.map((card) => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={
                            card === choiceOne ||
                            card === choiceTwo ||
                            card.matched
                        }
                        disabled={disabled}
                    />
                ))}
            </div>
            {!finishedGame(cards) && <p>Turns: {turns}</p>}
            {finishedGame(cards) && <p>Game finished with {turns} turns</p>}
        </div>
    );
}

export default App;
