import { useState } from "react";

export default function Button() {
    const topButtons = [0, 1, 2, 3, 4, 5, 6, 7];
    const bottomButtons = [...topButtons].reverse();

    const [topStates, setTopStates] = useState(Array(topButtons.length).fill(false));
    const [bottomStates, setBottomStates] = useState(Array(bottomButtons.length).fill(false));

    function handleTopClick(index) {
        setTopStates(prev => prev.map((val, i) => i === index ? !val : val));
    }

    function handleBottomClick(index) {
        setBottomStates(prev => prev.map((val, i) => i === index ? !val : val));
    }

    return (
<>
            <div className="button-row">
                {topButtons.map((num, index) => (
                    <button
                        key={`top-${index}`}
                        onClick={() => handleTopClick(index)}
                        className={`toggle-button ${topStates[index] ? 'active' : 'inactive'}`}
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
                        className={`toggle-button ${bottomStates[index] ? 'active' : 'inactive'}`}
                    >
                        {num}
                    </button>
                ))}
            </div>
   </>
    );
}
