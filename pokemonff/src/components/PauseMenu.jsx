import React, { useState, useEffect } from 'react';
import pauseMenuBg from '../images/pausemenu.png'; 
import PokemonMenu from './PokemonMenu';  // Import the new component
import BagMenu from './BagMenu';  // Import the Bag menu

export const PauseMenu = ({ onClose, team, items, setItems, setTeam,setCurrentPokemonIndex,currentPokemonIndex }) => {
  const menuOptions = ['Pokedex', 'Pokemon', 'Bag', 'Save', 'Exit'];
  const [selectedOption, setSelectedOption] = useState(0);
  const [showPokemonMenu, setShowPokemonMenu] = useState(false); // State for Pokémon menu
  const [showBagMenu, setShowBagMenu] = useState(false); // State for Bag menu
  const [selectedBagItem, setSelectedBagItem] = useState(0); // Track selected item in Bag
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0); // Track selected Pokémon

  // Handle key press for menu navigation
  const handleKeyDown = (e) => {
    console.log(`ArrowUp Pressed - New Index: ${currentPokemonIndex}`); // Log updated value

    if (!showPokemonMenu && !showBagMenu) {
      // Main menu navigation
      if (e.key === 'ArrowUp') {
        setSelectedOption((prev) => (prev - 1 + menuOptions.length) % menuOptions.length); // Cycle up
      } else if (e.key === 'ArrowDown') {
        setSelectedOption((prev) => (prev + 1) % menuOptions.length); // Cycle down
      } else if (e.key === 'Enter' || e.key === 'x') {
        if (menuOptions[selectedOption] === 'Exit') {
          onClose(); // Call the onClose function when selecting 'Exit'
        } else if (menuOptions[selectedOption] === 'Pokemon') {
          
          setShowPokemonMenu(true);
        } else if (menuOptions[selectedOption] === 'Bag') {
          setShowBagMenu(true); // Show the Bag menu when selected
        }
      }
    } else if (showPokemonMenu) {
      if (e.key === 'z') {
        setShowPokemonMenu(false); // Close Pokémon menu on 'z'
      }
    } else if (showBagMenu) {
      // Bag menu navigation
      if (e.key === 'z') {
        setShowBagMenu(false); // Close Bag menu on 'z'
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, showPokemonMenu, showBagMenu, selectedBagItem, selectedPokemonIndex, setCurrentPokemonIndex,currentPokemonIndex]);

  return (
    <div style={{
      position: 'absolute',
      top: '-32px',
      right: '32px',
      width: `${5 * 32}px`,
      height: `${9 * 32}px`,
      backgroundImage: `url(${pauseMenuBg})`,
      backgroundSize: 'cover',
      zIndex: 1000,
    }}>
      {!showPokemonMenu && !showBagMenu ? (
        <ul style={{ color: 'white', listStyleType: 'none', padding: '10px', fontSize: '16px' }}>
          {menuOptions.map((option, index) => (
            <li key={index} style={{ color: 'white' }}>
              {selectedOption === index ? '=> ' : ''}{option}
            </li>
          ))}
        </ul>
      ) : showPokemonMenu ? (
        <PokemonMenu
        setShowPokemonMenu={setShowPokemonMenu}
          team={team}
          selectedPokemonIndex={selectedPokemonIndex}
          setSelectedPokemonIndex={setSelectedPokemonIndex}
          setTeam={setTeam} // Pass setTeam to update the Pokémon list after swap
          setCurrentPokemonIndex={setCurrentPokemonIndex}
          currentPokemonIndex={currentPokemonIndex}
          fromBattleCanvas={false}  // Pass correctly named prop
        />
      ) : (
        <BagMenu
          items={items}
          selectedBagItem={selectedBagItem}
          setSelectedBagItem={setSelectedBagItem}
        />
      )}
    </div>
  );
};

export default PauseMenu;













