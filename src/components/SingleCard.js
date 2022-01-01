import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };

    return (
        <div className="card">
            <div className={flipped ? 'flipped' : ''}>
                <img src={card.src} className="front" alt="card front" />
                <img
                    onClick={handleClick}
                    className="back"
                    src="/one-piece/flag.png"
                    alt="card back"
                />
            </div>
        </div>
    );
}
