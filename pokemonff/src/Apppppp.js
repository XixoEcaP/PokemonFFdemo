import React, { useState } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import Player from './components/player';
import Pokemon from './components/pokemon'
import Moves from './components/moves';
import BattleCanvas from './components/battlecanvas'; 
import pokemons from './components/pokemonData';  // Correct import of pokemons
import PauseMenu from './components/PauseMenu.jsx'; // Adjust the path as needed
import StopHandler from './components/StopHandler.js';  // Assuming StopHandler is in the same folder





const getRandomEncounter = (encounters) => {
  const randomIndex = Math.floor(Math.random() * encounters.length);
  return encounters[randomIndex];  // Return a random encounter from the array
};

const trainerTeam1 = [
  { ...pokemons.Ifurito, level: 1, },
  { ...pokemons.Ifurito, level: 1, }
];

const trainerTeam2 = [
  { ...pokemons.Levia, level: 1,  },
  { ...pokemons.Leviata, level: 1 }
];

const encounterData = [
  { pokemon: pokemons.Snatch, level: 5 },  // 25% chance to encounter Ifurito, level 5
  { pokemon: pokemons.Bomb,  level: 5 },    // 25% chance to encounter Levia, level 6
  { pokemon: pokemons.OneEye,  level: 5 } , 
  { pokemon: pokemons.Morbol,  level: 5 } ,
  { pokemon: pokemons.Hecteyes,  level: 5 } ,
  { pokemon: pokemons.Coeurl,  level: 5 } ,
  { pokemon: pokemons.Goblin,  level: 5 } ,
  { pokemon: pokemons.Flan,  level: 5 } ,     // 50% chance to encounter Ram, level 7
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
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]
;

const startY1 = 192; // Starting row
const startX1 = 32; 
redrawSection(map1, newTiles1, startY1, startX1);
const newTiles2 =  [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 7, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 7, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 0, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  
]
const startY2 =143; // Starting row
redrawSection(map1, newTiles2, startY2, startX1);

const map2 = {
  id: 'map2',
  tiles: [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1,1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1],
    
  ],
};
const map3 = {
  id: 'map3',
  tiles: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1],
    [0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0,0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0,0],
    [0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,0],
    [0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,0],
    [0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0,0],
    [0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0,0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,0],
    [0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0,0],
    [0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0,0],
    [0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0,0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,0],
    [1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1,1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1],
    
  ],
};
const starter =  { ...pokemons.Leviata, level: 1,
  maxHp: pokemons.Leviata.hp+2,
  currentHp: pokemons.Leviata.hp+2 };




const App = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 11, y: 3 });
  const [direction, setDirection] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [currentMap, setCurrentMap] = useState(map2);
  const [inBattle, setInBattle] = useState(false); 

  const [team, setTeam] = useState([]);
  const [items, setItems] = useState([{name:'pokeball',count:50}]);
  const [foePokemon, setFoePokemon] = useState(null);  // State for the encountered Pokémon
  const [events, setEvents] = useState({
    pokeballLevia: { isActive: true, position: { x: 9, y: 8 } },
    pokeballRam: { isActive: true, position: { x: 10, y: 8 } },
    pokeballIfurito: {isActive: true, position: { x: 11, y: 8 }},
    auron: {isActive: true, position: { x: 40, y: 191 }}
  });
  const [eventMessage, setEventMessage] = useState('');  // New state for event messages
  const [myCurrentHP, setMyCurrentHP] = useState(team[0]?.currentHP || (team[0]?.hp + team[0]?.level * 2) || 0);
  const [myHP, setMyHP] = useState(team[0]?.currentHp || (team[0]?.hp + team[0]?.level * 2) || 0);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [currentFoePokemonIndex, setCurrentFoePokemonIndex] = useState(0);
  const [trainerTeam, setTrainerTeam] = useState(null);
  const [stop, setStop] = useState(null);
  const[fightingStage, setFightingStage]= useState('1');
  const [auron,setAuron] = useState(false)
  const[vincent,setVincent]= useState(false)
  const [myPokemon, setMypokemon] = useState(team[currentPokemonIndex]);
  const [messages, setMessages] = useState([
   ""
  ]);

  const [messageIndex, setMessageIndex] = useState(0); // Index of the current message
  const [died,setDied]= useState(false)



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
    // Add properties for level, max HP, and current HP to the pokemon object
    const newPokemon = {
      ...pokemon,
      level: level,
      maxHp: maxHp,
      currentHp: currentHp
    };
  
    if (team.length < 6) {
      setTeam(prevTeam => [...prevTeam, newPokemon]);
      setEventMessage(`${pokemon.name} added to your team at level ${level} `);
  
      // Check if the team has any Pokémon after adding the new one
      if (team.length === 0) {
        setMyHP(newPokemon.maxHp + newPokemon.level * 2);
      }
    } else {
      setEventMessage("Your team is full. Can't catch more Pokémon!");
      console.log("Your team is full. Can't catch more Pokémon!");
    }
  };
  
  

  const handlePlayerMove = (newPosition) => {
    console.log(`ArrowUp Pressed - New Index: ${currentPokemonIndex}`); // Log updated value

    const newX = Math.floor(newPosition.x);
    const newY = Math.floor(newPosition.y);
 
    if (newY >= 0 && newY < currentMap.tiles.length && newX >= 0 && newX < currentMap.tiles[0].length) {
      setPlayerPosition(newPosition);
      
      if (currentMap.tiles[newY][newX] === 3 && currentMap.id === 'map1') { 
        setFightingStage('1');
        setStop(true);
        setAuron(true)

      
        setEventMessage("Auron: Let's Battle");
   
      


        setTrainerTeam(trainerTeam2);
        setFoePokemon(trainerTeam2[0]) // Assuming tile '3' triggers the trainer battle

        setTimeout(() => {
          setEventMessage("Auron: Let's Battle");
           
          handleTrainerBattle(); 
          setStop(false);
          // Trigger the battle after delay
        }, 1000); 
     
       
        

      }  if (currentMap.tiles[newY][newX] === 7 && currentMap.id === 'map1') { 
        setFightingStage('1');
        setStop(true);
        setVincent(true)

      
        setEventMessage("Vincent: Let's Battle");
   
      


        setTrainerTeam(trainerTeam1);
        setFoePokemon(trainerTeam1[0]) // Assuming tile '3' triggers the trainer battle

        setTimeout(() => {
          setEventMessage("Vincent: Let's Battle");
           
          handleTrainerBattle(); 
          setStop(false);
          // Trigger the battle after delay
        }, 1000); 
     
       
        

      }
      // Trigger battle when stepping on tile (value is 2)
      if (currentMap.tiles[newY][newX] === 2&&currentMap.id === 'map1') {
        const random = Math.random();
        if (random > 0.85) {
          setFightingStage('1');  // Or whatever probability you want for triggering an encounter
          const encounter = getRandomEncounter(encounterData);
          if (encounter) {
            const foe = { ...encounter.pokemon, level: encounter.level };
            setTrainerTeam([foe]);
            setFoePokemon(foe);  // Set the encountered Pokémon
            setInBattle(true);
          }
        }
      }
      if (currentMap.id === 'map1' && currentMap.tiles[newY][newX] === 5) {
        setStop(true)
        setPlayerPosition({ x: 7, y: 21 });
        setCurrentMap(map3);

    setEventMessage('Player transferred back to map1');


      }
        if (currentMap.id === 'map3' &&  currentMap.tiles[newY][newX] === 5) {
        setStop(true)
        setPlayerPosition({ x: 50, y: 200 });
        setCurrentMap(map1);
        setEventMessage('Player transferred back to map1');
        console.log('Player transferred back to map1');
      } ;
      if (currentMap.id === 'map1' && currentMap.tiles[newY][newX] === 6) {
        setStop(true)
        setPlayerPosition({ x: 11, y: 10 });
        setCurrentMap(map2);
        setEventMessage('Player transferred to map2');
        console.log('Player transferred to map2');
      } 
       if (currentMap.id === 'map2' && currentMap.tiles[newY][newX] === 6) {
        setStop(true)
        setPlayerPosition({ x: 43, y: 212 });
        setCurrentMap(map1);
        setEventMessage('Player transferred back to map1');
        console.log('Player transferred back to map1');
      } 
    }
  };
  
  const resetPlayerPosition = () => {
    // Reset player to start location
    setCurrentMap(map2);
    setPlayerPosition({ x: 11, y: 9 });
    setCurrentPokemonIndex(0);
  
    // Use a for loop to set each Pokemon's currentHp to maxHp
    const updatedTeam = [...team]; // Create a copy of the team array
    for (let i = 0; i < updatedTeam.length; i++) {
      updatedTeam[i].currentHp = updatedTeam[i].maxHp; // Set currentHp to maxHp for each Pokemon
    }
  
    setTeam(updatedTeam); // Update the team with the modified array
    setMyHP(updatedTeam[0].maxHp + updatedTeam[0].level * 2); // Set player's HP to the first Pokemon's HP
  };
  


  const handlePlayerInteract = (x, y) => {
    if (currentMap.id === 'map1') {
      if(x===48&&y===164){
        setEventMessage("Vincent: Hi Hi XD")
        setStop(true)
              setTimeout(() => {
        setStop(false);
        console.log("Resetting stop to false after Auron interaction");
        setEventMessage('')
      }, 1000);  // Adjust delay as necessary


      }
      if(x===43&&y===192||!setTrainerInBattle){
        setEventMessage("Go get a Summon!")
        setStop(true)
              setTimeout(() => {
        setStop(false);
        setEventMessage('')
      }, 1000);  // Adjust delay as necessary
      }
    
   
      if(x===40&&y===191){
        setEventMessage("Auron: Hi Hi XD")
        setStop(true)
              setTimeout(() => {
        setStop(false);
        console.log("Resetting stop to false after Auron interaction");
        setEventMessage('')
      }, 1000);  // Adjust delay as necessary


      }
    }


    if (currentMap.id === 'map3') {
      if(x===7&&y===7){
        setEventMessage("Cid: It's Demo you may choose all 3 starters")
        setStop(true)
              setTimeout(() => {
        setStop(false);
        setEventMessage('')
      }, 2000);  // Adjust delay as necessary


      }
      // Check if player interacts with Levia's Pokéball
      if (events.pokeballLevia.isActive && x === events.pokeballLevia.position.x && y === events.pokeballLevia.position.y) {
        setStop(true)
        catchPokemon(pokemons.Levia, 5,pokemons.Levia.hp+10 , pokemons.Levia.hp+10);
        setEvents(prevEvents => ({
          ...prevEvents,
          pokeballLevia: { ...prevEvents.pokeballLevia, isActive: false },
        }));
        map1.tiles[192][43] = 0;
      }
      if (events.pokeballIfurito.isActive && x === events.pokeballIfurito.position.x && y === events.pokeballIfurito.position.y) {
        setStop(true)
        catchPokemon(pokemons.Ifurito, 5,pokemons.Ifurito.hp+10 , pokemons.Ifurito.hp+10);
        setEvents(prevEvents => ({
          ...prevEvents,
          pokeballIfurito: { ...prevEvents.pokeballIfurito, isActive: false },
        }));
        map1.tiles[192][43] = 0;
      }

      // Check if player interacts with Ram's Pokéball
      if (events.pokeballRam.isActive && x === events.pokeballRam.position.x && y === events.pokeballRam.position.y) {
        setStop(true)
        catchPokemon(pokemons.Ram, 5,pokemons.Ram.hp+10 , pokemons.Ram.hp+10);
        setEvents(prevEvents => ({
          ...prevEvents,
          pokeballRam: { ...prevEvents.pokeballRam, isActive: false },
        }));
        map1.tiles[192][43] = 0;
      }
    }


      
    
  };
    const handleRunFromBattle = () => {
    setInBattle(false); 
    return; // Exit battle mode
  };
  const handlePlayerFainted = () => {
    setDied(true);

    resetPlayerPosition();
    setInBattle(false); // Exit battle mode when all Pokémon faint
  
  };
  const handleCatchingPokemon = () => {
    // Random chance for catching the Pokémon (adjust catch probability here)
    const catchChance = Math.random();
    
    if (catchChance > 0.6) {
      // Pokémon caught successfully
      const maxHp = foePokemon.hp + foePokemon.level * 2;
      catchPokemon(foePokemon, foePokemon.level, maxHp, maxHp);
      setStop(true)
      setEventMessage(`${foePokemon.name} was caught!`);
      setFightingStage('1');
      handleBattleEnd();
    
      
      return true;  // Return true indicating the Pokémon was caught
    } else {
      // Pokémon escaped
      setEventMessage(`${foePokemon.name} escaped!`);
      return false;  // Return false indicating the Pokémon escaped
    }
  };
  
  

  const handleBattleEnd = (updatedPokemon) => {
    console.log(died);
  setFightingStage("1")
    setStop(true);
    setFoePokemon(null)
setMessages([""]);
    setInBattle(false); // Exit battle mode
    if(!died && auron){
    map1.tiles[191][43] = 0; 
    setDied(false);
    setAuron(false);
   }
   if(!died && vincent){
    map1.tiles[165][48] = 0; 
    map1.tiles[166][48] = 0; 
    map1.tiles[167][48] = 0; 
    map1.tiles[168][48] = 0; 
    setDied(false);
    setVincent(false);
   }
  };
  return (
    <div className="App" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100vh' }}>
        
      {/* GameCanvas container */}
      <div style={{ position: 'absolute', top: '0', width: '512px', height: '384px' }}>
        <GameCanvas
          map={currentMap}
          playerPosition={playerPosition}
          direction={direction}
          frameIndex={frameIndex}
          events={events}
          myCurrentHP={myHP}
          setEventMessage={setEventMessage}
          setMyCurrentHP={setMyHP}
          setDirection={setDirection}
          eventMessage={eventMessage}
          stop={stop}
          setStop={setStop}
          messages={messages}
          setMessages={setMessages}
          onInteract={handlePlayerInteract}
        messageIndex={messageIndex}
        setMessageIndex={setMessageIndex}
        fightingStage={fightingStage}
        setFightingStage={setFightingStage}
         
        />
  
        {/* Player component for movement */}
        <Player
          position={playerPosition}
          onMove={handlePlayerMove}
          map={currentMap}
         
          onDirectionAndFrameChange={setDirection}
          onPauseToggle={handlePauseToggle}
          inBattle={inBattle}
          isPaused={isPaused}
          stop={stop}
          setStop={setStop}
          currentPokemonIndex={currentPokemonIndex}
          setCurrentPokemonIndex={setCurrentPokemonIndex}
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
            <PauseMenu
              onClose={handleClosePauseMenu}
              team={team}
              items={items}
              setItems={setItems}
              setTeam={setTeam}
              currentPokemonIndex={currentPokemonIndex}
              setCurrentPokemonIndex={setCurrentPokemonIndex}
            />
          </div>
        )}
  
        {/* BattleCanvas appears over the GameCanvas when in battle */}
        {inBattle && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '512px',
            height: '384px'
          }}>
            <BattleCanvas
              guy={team[0]}
            died={died}
            setDied={setDied}
              items={items}
          stop={stop}
          setStop={setStop}
              setItems={setItems}
              foePokemon={foePokemon}
              setFoePokemon={setFoePokemon}
              moves={team[currentPokemonIndex].moves}
              team={team}
              currentPokemonIndex={currentPokemonIndex}
              setCurrentPokemonIndex={setCurrentPokemonIndex}
              setTeam={setTeam}
              onRun={handleRunFromBattle}
              onBattleEnd={handleBattleEnd}
              handlePlayerFainted={handlePlayerFainted}
              setEventMessage={setEventMessage}
              eventMessage={eventMessage}
              isTrainerBattle={trainerInBattle}
              trainerTeam={trainerTeam}
              setTrainerTeam={setTrainerTeam}
              resetPlayerPosition={resetPlayerPosition}
              myHP={myHP}
              setMyHP={setMyHP}
              handleCatchingPokemon={handleCatchingPokemon}
              messages={messages}
              setMessages={setMessages}
              messageIndex={messageIndex}
              setMessageIndex={setMessageIndex}
              fightingStage={fightingStage}
              setFightingStage={setFightingStage}
          
            />
          </div>
        )}
      </div>
    </div>
  );
};  

export default App;