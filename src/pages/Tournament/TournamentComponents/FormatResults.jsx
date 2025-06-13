export default function FormatResults({ resultArray }) {
    if (!resultArray || resultArray.length === 0) {
        return (
            <>
                <span>-</span> : <span>-</span>
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
