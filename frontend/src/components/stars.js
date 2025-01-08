import React from "react";
import Star from "./star";
import { useLocalStorage } from "./useLocalStorage";

export default function StarRating({ ratingKey, totalStars = 5, defaultRating = 0 }) {
  const createArray = (length) => [...Array(length)];
  const [selectedStars, setSelectedStars] = useLocalStorage(ratingKey, defaultRating);

  return (
    <div className="star-rating">
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>
        {selectedStars} of {totalStars} stars selected.
      </p>
    </div>
  );
}
