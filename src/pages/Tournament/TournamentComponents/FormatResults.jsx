export default function FormatResults({ resultArray }) {
    if (!resultArray || resultArray.length === 0) {
        return (
            <>
            <div className="flex">
                <span className="Result">-</span> : <span className="Result">-</span>
                </div>
            </>
        );
    }

    const [goalsA, goalsB] = resultArray[0].split(":");

    return (
        <>
        <div className="flex">
            <span>{goalsA}</span> : <span>{goalsB}</span>
            </div>
        </>
    );
}
