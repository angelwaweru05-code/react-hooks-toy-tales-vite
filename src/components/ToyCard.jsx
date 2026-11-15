import React from "react";

function ToyCard({ toy }) {
  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
    </div>
  );
}

export default ToyCard;
