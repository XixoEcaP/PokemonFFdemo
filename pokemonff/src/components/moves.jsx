import React from 'react';

const Moves = ({ move }) => {
  const { name, type, category, accuracy, power, pp, target } = move;

  return (
    <div className="move">
      <h4>{name}</h4>
      <p>Type: {type}</p>
      <p>Category: {category}</p>
      <p>Accuracy: {accuracy}</p>
      <p>Power: {power}</p>
      <p>PP: {pp}</p>
      <p>Target: {target}</p>
    </div>
  );
};

export default Moves;
