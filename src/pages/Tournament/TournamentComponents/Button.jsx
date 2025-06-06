import { useState } from "react";

export default function Button() {
    const topButtons = [0, 1, 2, 3, 4, 5, 6, 7];
    const bottomButtons = [...topButtons].reverse();

    const [topButtonActive, setTopButtonActive] = useState(null);
    const [bottomButtonActive, setBottomButtonActive] = useState(null);

    function handleTopClick(index) {
        setTopButtonActive(prev => (prev === index ? null : index));
    }

    function handleBottomClick(index) {
        setBottomButtonActive(prev => (prev === index ? null : index));
    }

    return (
        <>
            <div className="button-row">
                {topButtons.map((num, index) => (
                    <button
                        key={`top-${index}`}
                        onClick={() => handleTopClick(index)}
                        className={`toggle-button ${topButtonActive === index ? 'active' : 'inactive'}`}
                    >
                        {num}
                    </button>
                ))}
            </div>

            <span className="colon">:</span>

            <div className="button-row">
                {bottomButtons.map((num, index) => (
                    <button
                        key={`bottom-${index}`}
                        onClick={() => handleBottomClick(index)}
                        className={`toggle-button ${bottomButtonActive === index ? 'active' : 'inactive'}`}
                    >
                        {num}
                    </button>
                ))}
                <button className="setting-button-row">Confirm</button>
            </div>
        </>
    );
}
