import React, { useState } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import Player from './components/player';
import Pokemon from './components/pokemon'
import Moves from './components/moves';
import BattleCanvas from './components/battlecanvas'; 
import pokemons from './components/pokemonData';  // Correct import of pokemons

const getRandomEncounter = (encounters) => {
  const randomIndex = Math.floor(Math.random() * encounters.length);
  return encounters[randomIndex];  // Return a random encounter from the array
};

const trainerTeam1 = [
  { ...pokemons.Ifurito, level: 1, currentHP: pokemons.Levia.hp, maxHp: pokemons.Levia.hp },
  { ...pokemons.Ifurito, level: 1, currentHP: pokemons.Ram.hp, maxHp: pokemons.Ram.hp }
];

const trainerTeam2 = [
  { ...pokemons.Levia, level: 80, currentHP: pokemons.Levia.hp, maxHp: pokemons.Levia.hp },
  { ...pokemons.Leviata, level: 80, currentHP: pokemons.Ram.hp, maxHp: pokemons.Ram.hp }
];

const encounterData = [
  { pokemon: pokemons.Ifurito, level: 5 },  // 25% chance to encounter Ifurito, level 5
  { pokemon: pokemons.Levia,  level: 5 },    // 25% chance to encounter Levia, level 6
  { pokemon: pokemons.Ram,  level: 5 }       // 50% chance to encounter Ram, level 7
];


// Define a larger map with walkable (0) and non-walkable (1) tiles (32x24 size)
const map1 = {
  id: 'map1',
  tiles: Array.from({ length: 216 }, () => Array(64).fill(0)), // Each row of 2 tiles
};
function redrawSection(map, newTiles, startY, startX) {
  // Ensure the starting positions and newTiles array do not exceed the map boundaries
  if (startY + newTiles.length > map.tiles.length || startX + newTiles[0].length > map.tiles[0].length) {
    console.error('Error: New tiles exceed map dimensions.');
    return;
  }

  // Iterate over newTiles rows
  for (let i = 0; i < newTiles.length; i++) {
    const currentRow = startY + i; // Calculate the row to modify
    // Replace the section of the row starting at startX with newTiles[i]
    map.tiles[currentRow].splice(startX, newTiles[i].length, ...newTiles[i]);
  }
}
const newTiles1 =  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  ]
;

const startY1 = 192; // Starting row
const startX1 = 32; 
redrawSection(map1, newTiles1, startY1, startX1);
const newTiles2 =  [

  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  [1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]  
]
const startY2 =144; // Starting row
redrawSection(map1, newTiles2, startY2, startX1);

const map2 = {
  id: 'map2',
  tiles: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1],
    
  ],
};




const App = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 44, y: 195 });
  const [direction, setDirection] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [currentMap, setCurrentMap] = useState(map1);
  const [inBattle, setInBattle] = useState(false); 
  const [team, setTeam] = useState([]);
  const [foePokemon, setFoePokemon] = useState(null);  // State for the encountered Pokémon
  const [events, setEvents] = useState({
    pokeballLevia: { isActive: true, position: { x: 44, y: 198 } },
    pokeballRam: { isActive: true, position: { x: 40, y: 196 } },
  });
  const [eventMessage, setEventMessage] = useState('');  // New state for event messages
  const [myCurrentHP, setMyCurrentHP] = useState(team[0]?.currentHP || (team[0]?.hp + team[0]?.level * 2) || 0);
  const [myHP, setMyHP] = useState(team[0]?.currentHP || (team[0]?.hp + team[0]?.level * 2) || 0);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [currentFoePokemonIndex, setCurrentFoePokemonIndex] = useState(0);
  const [trainerTeam, setTrainerTeam] = useState(null);

  const [isPaused, setIsPaused] = useState(false);  // Track if the game is paused
  const [trainerInBattle, setTrainerInBattle] = useState(false);  // New state for trainer battle
  const [trainerCurrentPokemonIndex, setTrainerCurrentPokemonIndex] = useState(0);  // Track which Pokémon the trainer is using
  
  const handleTrainerBattle = () => {
    setTrainerInBattle(true);
    setInBattle(true);
  };
  
  const handlePauseToggle = (paused) => {
    setIsPaused(paused);
    console.log(`Game is now ${paused ? 'paused' : 'resumed'}`);
  };

  // Function to close the pause menu
  const handleClosePauseMenu = () => {


    handlePauseToggle (false);
    console.log('Pause menu closed.');
  };
  // Catch Pokémon and add to team
  const catchPokemon = (pokemon, level, maxHp, currentHp) => {
    console.log(trainerTeam)
    // Add properties for level, max HP, and current HP to the pokemon object
    const newPokemon = {
      ...pokemon,
      level: level,
      maxHp: maxHp,
      currentHp: currentHp
    };
  
    if (team.length < 6) {
      setTeam(prevTeam => [...prevTeam, newPokemon]);
      setEventMessage(`${pokemon.name} added to your team at level ${level} with ${currentHp}/${maxHp} HP!`);  // Update message
      console.log(`${pokemon.name} added to your team at level ${level} with ${currentHp}/${maxHp} HP!`);
    } else {
      setEventMessage("Your team is full. Can't catch more Pokémon!");
      console.log("Your team is full. Can't catch more Pokémon!");
    }
  };
  

  const handlePlayerMove = (newPosition) => {
    const newX = Math.floor(newPosition.x);
    const newY = Math.floor(newPosition.y);
  
    if (newY >= 0 && newY < currentMap.tiles.length && newX >= 0 && newX < currentMap.tiles[0].length) {
      setPlayerPosition(newPosition);
      if (currentMap.tiles[newY][newX] === 3) { 
        console.log(playerPosition);
        setTrainerTeam(trainerTeam2);
        setFoePokemon(trainerTeam2[0])  // Start with the trainer's first Pokémon
        handleTrainerBattle();
      
     
        map1.tiles[192][40] = 0;
       
      }
      if (currentMap.tiles[newY][newX] === 4) { 
        setTrainerTeam(trainerTeam1);
        setFoePokemon(trainerTeam1[0]) // Assuming tile '3' triggers the trainer battle

    // Assuming tile '3' triggers the trainer battle
        handleTrainerBattle();
      }
      // Trigger battle when stepping on tile (value is 2)
      if (currentMap.tiles[newY][newX] === 2) {
        const random = Math.random();
        if (random > 0.96) {  // Or whatever probability you want for triggering an encounter
          const encounter = getRandomEncounter(encounterData);
          if (encounter) {
            const foe = { ...encounter.pokemon, level: encounter.level };
            setFoePokemon(foe);  // Set the encountered Pokémon
            setInBattle(true);
          }
        }
      }
    }
  };
  
  const resetPlayerPosition = () => {
   
    setCurrentMap(map2);// Reset player to start location
    setPlayerPosition({ x: 11, y: 9 });
    setCurrentPokemonIndex(0);
  };



  const handlePlayerInteract = (x, y) => {
    if (currentMap.id === 'map1' && x === 43 && y === 211) {
      setPlayerPosition({ x: 11, y: 9 });
      setCurrentMap(map2);
      setEventMessage('Player transferred to map2');
      console.log('Player transferred to map2');
    } else if (currentMap.id === 'map2' && x === 11 && y === 1) {
      setPlayerPosition({ x: 43, y: 211 });
      setCurrentMap(map1);
      setEventMessage('Player transferred back to map1');
      console.log('Player transferred back to map1');
    } else {
      if (currentMap.id === 'map1') {
        // Check if player interacts with Levia's Pokéball
        if (events.pokeballLevia.isActive && x === events.pokeballLevia.position.x && y === events.pokeballLevia.position.y) {
          catchPokemon(pokemons.Levia, 5,pokemons.Levia.hp , pokemons.Levia.hp);
          setEvents(prevEvents => ({
            ...prevEvents,
            pokeballLevia: { ...prevEvents.pokeballLevia, isActive: false },
          }));
          map1.tiles[events.pokeballLevia.position.y][events.pokeballLevia.position.x] = 0;
        }

        // Check if player interacts with Ram's Pokéball
        if (events.pokeballRam.isActive && x === events.pokeballRam.position.x && y === events.pokeballRam.position.y) {
          catchPokemon(pokemons.Ram, 5,pokemons.Ram.hp , pokemons.Levia.hp);
          setEvents(prevEvents => ({
            ...prevEvents,
            pokeballRam: { ...prevEvents.pokeballRam, isActive: false },
          }));
          map1.tiles[events.pokeballRam.position.y][events.pokeballRam.position.x] = 0;
        }
      }
    }
  };
    const handleRunFromBattle = () => {
    setInBattle(false); 
    return; // Exit battle mode
  };
  const handlePlayerFainted = () => {
    resetPlayerPosition();
    setInBattle(false); // Exit battle mode when all Pokémon faint
  };

  const handleBattleEnd = (updatedPokemon) => {

    setInBattle(false); // Exit battle mode
  };
  return (
    <div className="App" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      
      {/* GameCanvas container */}
      <div style={{ position: 'relative' }}>
        <GameCanvas
          map={currentMap}
          playerPosition={playerPosition}
          direction={direction}
          frameIndex={frameIndex}
          events={events}
          myCurrentHP={myCurrentHP}
          setEventMessage={setEventMessage}
          setMyCurrentHP={setMyCurrentHP}
        />

        {/* Player component for movement */}
        <Player
          position={playerPosition}
          onMove={handlePlayerMove}
          map={currentMap}
          onInteract={handlePlayerInteract}
          onDirectionAndFrameChange={setDirection}
          onPauseToggle={handlePauseToggle}
          inBattle={inBattle}  
          isPaused={isPaused} 
        />

        {/* PauseMenu on top of GameCanvas when paused */}
        {isPaused && (
 <div style={{
  position: 'absolute',
  top: '32px',
  right: '-32px',
  width: '160px',
  height: '288px',
  zIndex: 2
}}>
            <PauseMenu onClose={handleClosePauseMenu}team={team} />
          </div>
        )}
      </div>

      {/* BattleCanvas appears over the GameCanvas when in battle */}
      {inBattle && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <BattleCanvas
            myPokemon={team[currentPokemonIndex]}
            foePokemon={foePokemon}
            setFoePokemon={setFoePokemon}
            moves={team[currentPokemonIndex].moves}
            team={team}
            currentPokemonIndex={currentPokemonIndex}
            setCurrentPokemonIndex={setCurrentPokemonIndex}
            setTeam={setTeam}
            onRun={handleRunFromBattle}
            onBattleEnd={handleBattleEnd}
            playerFainted={handlePlayerFainted}
            setEventMessage={setEventMessage}
            eventMessage={eventMessage}
            isTrainerBattle={trainerInBattle}  // Pass trainer battle state
            currentFoePokemonIndex={currentFoePokemonIndex}
            setCurrentFoePokemonIndex={setCurrentFoePokemonIndex}
            setTrainerTeam={setTrainerTeam}
            trainerTeam={trainerTeam}
            resetPlayerPosition={resetPlayerPosition}
            
            

          />
        </div>
      )}
    </div>
  );
  
};  
export default App;