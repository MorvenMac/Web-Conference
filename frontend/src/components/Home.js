import React, { useState, useEffect } from "react";
import TalkList from "./TalkList";

function Home() {
  const [talks, setTalks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [session, setSession] = useState("");
  const [interestedTalks, setInterestedTalks] = useState([]);
  const [interestingTalks, setInterestingTalks] = useState([]); // For heart toggling

  // Fetch all talks from the backend
  useEffect(() => {
    fetch("http://localhost:3001/talks")
      .then((response) => response.json())
      .then((data) => setTalks(data))
      .catch((err) => console.error("Error fetching talks:", err));
  }, []);

  // Filter talks based on search term and session
  const filteredTalks = talks.filter((talk) => {
    const matchesSpeaker = talk.speaker
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSession = session ? talk.session === session : true;
    return matchesSpeaker && matchesSession;
  });

  // Handle adding talks to the itinerary
  const handleMarkAsInterested = (talk) => {
    if (!interestedTalks.some((t) => t.time === talk.time)) {
      setInterestedTalks([...interestedTalks, talk]);
      alert(`${talk.title} added to your itinerary.`);
    } else {
      alert("You already have a talk scheduled at this time.");
    }
  };

  // Handle removing talks from the itinerary
  const handleRemoveFromItinerary = (talkId) => {
    const updatedItinerary = interestedTalks.filter((talk) => talk.id !== talkId);
    setInterestedTalks(updatedItinerary);
    alert("Talk removed from your itinerary.");
  };

  // Handle toggling a talk as interesting
  const toggleInteresting = (talkId) => {
    setInterestingTalks((prev) =>
      prev.includes(talkId)
        ? prev.filter((id) => id !== talkId) // Remove if already interesting
        : [...prev, talkId] // Add if not interesting
    );
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Conference Planner</h1>

      {/* Search by Speaker */}
      <div className="search-section mb-4">
        <h2>Search by Speaker</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter speaker name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Browse by Session */}
      <div className="session-section mb-4">
        <h2>Browse Talks by Session</h2>
        <select
          className="form-control mb-3"
          value={session}
          onChange={(e) => setSession(e.target.value)}
        >
          <option value="">Select a Session</option>
          <option value="A">Session A</option>
          <option value="B">Session B</option>
          <option value="C">Session C</option>
        </select>
      </div>

      {/* Talks Display */}
      <TalkList
        talks={filteredTalks}
        onMarkAsInterested={handleMarkAsInterested}
        toggleInteresting={toggleInteresting}
        interestingTalks={interestingTalks}
        showRateTalk
      />

      {/* View Itinerary */}
      <div className="itinerary-section mt-4">
        <h2>Your Itinerary</h2>
        <TalkList
          talks={interestedTalks}
          onMarkAsInterested={handleMarkAsInterested}
          onRemoveFromItinerary={handleRemoveFromItinerary}
          toggleInteresting={toggleInteresting}
          interestingTalks={interestingTalks}
          showRateTalk={false} // No rating in itinerary
        />
      </div>
    </div>
  );
}

export default Home;
