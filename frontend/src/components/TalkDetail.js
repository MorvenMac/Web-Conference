import React from "react";
import RateTalk from "./RateTalk";

export default function TalkDetail({ talk }) {
    if (!talk) return null;

    return (
        <div className="talk-detail">
            <p>
                <strong>Description:</strong> {talk.description}
            </p>
            <RateTalk talkId={talk.id} />
        </div>
    );
}
