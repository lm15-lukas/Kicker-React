export default function FormatResults({ resultArray }) {
    if (!resultArray || resultArray.length === 0) {
        return (
            <>
                <span className="Result">-</span> : <span className="Result">-</span>
            </>
        );
    }

    const [goalsA, goalsB] = resultArray[0].split(":");

    return (
        <>
            <span>{goalsA}</span> : <span>{goalsB}</span>
        </>
    );
}
