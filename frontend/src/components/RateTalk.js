import React, { useState } from "react";
import StarRating from "./stars";

export default function RateTalk({ talkId, talkTitle }) {
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const feedback = {
            talkId,
            talkTitle,
            rating: parseInt(localStorage.getItem(talkId), 10) || 0, // Convert rating to a number
            comment,
            submittedAt: new Date().toISOString(),
        };

        console.log("Submitted Feedback:", feedback);
        setSubmitted(true);
        setComment("");
    };

    if (submitted) {
        return <p>Thank you for your feedback!</p>;
    }

    return (
        <div>
            <h5>Rate Talk: {talkTitle}</h5>
            <StarRating ratingKey={talkId} totalStars={5} defaultRating={3} />
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Leave a comment (optional)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
