import React, { useState, useEffect } from "react";

function Itinerary() {
    const [itinerary, setItinerary] = useState([]);

    useEffect(() => {
        const savedItinerary = JSON.parse(localStorage.getItem("itinerary")) || [];
        setItinerary(savedItinerary);
    }, []);

    const updateItinerary = (newItinerary) => {
        setItinerary(newItinerary);
        localStorage.setItem("itinerary", JSON.stringify(newItinerary));
    };

    const removeTalk = (id) => {
        const updatedItinerary = itinerary.filter((talk) => talk.id !== id);
        updateItinerary(updatedItinerary);
    };

    if (itinerary.length === 0) {
        return <p>Your itinerary is empty. Add some talks!</p>;
    }

    return (
        <div>
            <h1>Your Itinerary</h1>
            <ul>
                {itinerary.map((talk) => (
                    <li key={talk.id}>
                        <strong>{talk.title}</strong> by {talk.speaker}
                        <button onClick={() => removeTalk(talk.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Itinerary;
