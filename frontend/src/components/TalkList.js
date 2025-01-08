import React, { useState } from "react";
import TalkDetail from "./TalkDetail";
import Heart from "./heart";

const TalkList = ({
    talks,
    onMarkAsInterested,
    onRemoveFromItinerary,
    toggleInteresting,
    interestingTalks = [], // Default to empty array
    showRateTalk,
}) => {
    const [expandedTalkId, setExpandedTalkId] = useState(null);

    // Sort talks by time
    const sortTalksByTime = (talks) => {
        const parseTime = (time) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes;
        };

        return [...talks].sort((a, b) => parseTime(a.time) - parseTime(b.time));
    };

    const sortedTalks = sortTalksByTime(talks);

    const calculateAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return "No ratings yet";
        const average = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
        return average.toFixed(1); // One decimal place
    };


    const toggleDescription = (talkId) => {
        setExpandedTalkId(expandedTalkId === talkId ? null : talkId);
    };

    if (!talks || talks.length === 0) {
        return <div className="text-center">No talks available.</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row g-4">
                {sortedTalks.map((talk) => (
                    <div key={talk.id} className="col-md-6">
                        <div className="card h-100 shadow-sm position-relative">
                            {/* Heart Icon */}
                            <div className="position-absolute top-0 end-0 p-2">
                                <Heart
                                    selected={interestingTalks.includes(talk.id)}
                                    onSelect={() => toggleInteresting(talk.id)}
                                />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">{talk.title}</h3>
                                <p className="card-text">
                                    <strong>Speaker:</strong> {talk.speaker}
                                </p>
                                <p>
                                    <strong>Time:</strong> {talk.time}
                                </p>
                                <p className="card-text">
                                    <strong>Session:</strong> {talk.session}
                                </p>
                                <p>
                                    <strong>Average Rating:</strong> {calculateAverageRating(talk.ratings)}
                                </p>

                                {expandedTalkId === talk.id ? (
                                    <>
                                        <TalkDetail talk={talk} />
                                        <button
                                            className="btn btn-secondary mt-3"
                                            onClick={() => toggleDescription(talk.id)}
                                        >
                                            Show Less
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-primary mt-3"
                                        onClick={() => toggleDescription(talk.id)}
                                    >
                                        Show More
                                    </button>
                                )}
                                {showRateTalk && (
                                    <button
                                        className="btn btn-success mt-3"
                                        onClick={() => onMarkAsInterested(talk)}
                                    >
                                        Add to Itinerary
                                    </button>
                                )}
                                {onRemoveFromItinerary && (
                                    <button
                                        className="btn btn-danger mt-3"
                                        onClick={() => onRemoveFromItinerary(talk.id)}
                                    >
                                        Remove from Itinerary
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TalkList;
