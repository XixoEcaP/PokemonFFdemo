import React from 'react';
import Moves from './moves';

const Pokemon = ({ pokemon }) => {
  const { name, level, experience, hp, attack, defense, specialAttack, specialDefense, speed, moves } = pokemon;

  return (
    <div className="pokemon">
      <h2>{name}</h2>
      <p>Level: {level}</p>
      <p>Experience: {experience}</p>
      <p>HP: {hp}</p>
      <p>Attack: {attack}</p>
      <p>Defense: {defense}</p>
      <p>Special Attack: {specialAttack}</p>
      <p>Special Defense: {specialDefense}</p>
      <p>Speed: {speed}</p>
      <h3>Moves:</h3>
      {moves.map((move, index) => (
        <Moves key={index} move={move} />
      ))}
    </div>
  );
};

export default Pokemon;
