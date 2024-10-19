import React, { useEffect, useRef, useState } from 'react';
import { levelExp } from './experienceUtils.js';

const PokemonMenu = ({ team, setTeam, setCurrentPokemonIndex, currentPokemonIndex, fromBattleCanvas, setShowPokemonMenu,handleSelectPokemon,setMyHP}) => {
  const menuRef = useRef(null);
  const [isFirstSelection, setIsFirstSelection] = useState(true); // To track first selection
  const [firstSelectedIndex, setFirstSelectedIndex] = useState(null); // First Pokémon's index

  // Handle key navigation and selection
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        setCurrentPokemonIndex((prev) => (prev - 1 + team.length) % team.length);
     // Move up
      } else if (e.key === 'ArrowDown') {
        setCurrentPokemonIndex((prev) => (prev + 1) % team.length);
        // Move down
      } else if (e.key === 'x') {
        if (fromBattleCanvas) {
          setMyHP(team[currentPokemonIndex].currentHp)
          // Immediate swap if coming from Battle Canvas (no first selection needed)
          const updatedTeam = [...team];
          const temp = updatedTeam[0]; // Pokémon at index 0
          updatedTeam[0] = updatedTeam[currentPokemonIndex]; // Move selected Pokémon to index 0
          updatedTeam[currentPokemonIndex] = temp; // Swap Pokémon at current index with index 0

          // Update the team with the swapped Pokémon
          setTeam(updatedTeam);
      

          // Exit the menu after swap
         
          setIsFirstSelection(true);
          setFirstSelectedIndex(null);
          
          handleSelectPokemon();
       
          
        } else {
          // Normal behavior for Pause Menu: two-step selection
          if (isFirstSelection) {
            // First selection
            setFirstSelectedIndex(currentPokemonIndex); // Fix the first selected Pokémon
            setIsFirstSelection(false); 
          } else {
            // Swap the selected Pokémon with the first one
            const updatedTeam = [...team];
            const temp = updatedTeam[firstSelectedIndex]; // First selected Pokémon
            updatedTeam[firstSelectedIndex] = updatedTeam[currentPokemonIndex]; // Move selected Pokémon
            updatedTeam[currentPokemonIndex] = temp; // Put the first selected Pokémon to the current index

            // Update the team with swapped Pokémon
            setTeam(updatedTeam);

            // Reset to first selection mode
            setIsFirstSelection(true);
            setFirstSelectedIndex(null);
           
          }
        }
      } else if (e.key === 'z' || e.key === ' ') {
        // Exit the menu, reset index to 0
        setCurrentPokemonIndex(0);
        setIsFirstSelection(true);  // Reset selection mode
        setFirstSelectedIndex(null);
        setShowPokemonMenu(false); // Close Pokémon menu
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [team, currentPokemonIndex, setCurrentPokemonIndex, setTeam, setShowPokemonMenu, fromBattleCanvas, firstSelectedIndex, isFirstSelection]);

  // Set the currentPokemonIndex to 0 (the active Pokémon) when the menu opens
  useEffect(() => {
    if (fromBattleCanvas) {
      setCurrentPokemonIndex(0); // Preselect index 0 if coming from Battle Canvas
    }
  }, [fromBattleCanvas, setCurrentPokemonIndex]);

  // Focus on the menu when it's rendered
  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.focus();
    }
  }, []);

  return (
    <div
      id="pokemonMenu"
      ref={menuRef}
      tabIndex="0"
      style={{ padding: '2px', color: 'white', fontSize: '7px' }}
    >
      {team.map((pokemon, index) => (
        <div
          key={index}
          style={{
            marginBottom: '0px',
            borderBottom: '0.5px solid white',
            paddingBottom: '5px',
            fontSize: index === 0 ? '1.2em' : '1em',
          }}
        >
          <div style={{ fontSize: '1.2em', marginBottom: '0px' }}>
            {/* Show '=>' before the first selected or currently selected Pokémon */}
            {currentPokemonIndex === index ? '=> ' : ''}
            {pokemon.name} (Lvl: {pokemon.level}) - {pokemon.type.join(', ')}
          </div>
          <div style={{ fontSize: '0.9em' }}>
            HP: {pokemon.currentHp}/{pokemon.hp + pokemon.level * 2}
          </div>
          <div style={{ fontSize: '0.9em' }}>
            XP: {pokemon.experience}/{levelExp[pokemon.level]} to next level
          </div>

          {/* Moves displayed two per row */}
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {pokemon.moves.map((move, moveIndex) => (
              <div key={moveIndex} style={{ width: '50%', padding: '0px 0', fontSize: '0.9em' }}>
                {move.name} ({move.type})
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ marginTop: '0px' }}>Press 'z' to go back</div>
      <div>Press 'x' to select and swap Pokémon</div>
    </div>
  );
};

export default PokemonMenu;









