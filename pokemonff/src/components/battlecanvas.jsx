import React, { useState, useEffect, useRef, useLayoutEffect,useCallback } from 'react';
import battleBg1Src from '../images/battlebg1.png';  // Background image for battle
import battleBoxSrc from '../images/battlebox.png';  // Battle box
import cursorSrc from '../images/cursor.png';        // Cursor image (with the full menu)
import cursorSelectSrc from '../images/cursorselect.png';  // Cursor selection image (the selection overlay)
import fightCursorSrc from '../images/fightcursor.png';  // Fight cursor
import fightCursorSelectSrc from '../images/fightcursorselected.png'; // Fight cursor selected
import myDataBoxSrc from '../images/mydatabox.png';  // Player's data box
import foeDataBoxSrc from '../images/foedatabox.png';  // Foe's data box
import { checkLevelUp } from './experienceUtils.js'; 
import { check } from './experienceUtils.js'; 

import PokemonMenu from './PokemonMenu';
import BagMenu from './BagMenu';
import pauseMenuBg from '../images/pausemenu.png';
import MessageBox from './MessageBox';  // Assuming MessageBox is in the same folder
import pokemons from './pokemonData.js';

 

const typeEffectivenessChart = {
  Fire: { 
    strongAgainst: ['Bug', 'Grass', 'Ice', 'Steel'], 
    weakAgainst: ['Ground', 'Rock', 'Water'],
    immuneAgainst: []
  },
  Water: { 
    strongAgainst: ['Fire', 'Ground', 'Rock'], 
    weakAgainst: ['Electric', 'Grass'], 
    immuneAgainst: []
  },
  Electric: { 
    strongAgainst: ['Flying', 'Water'], 
    weakAgainst: ['Ground'], 
    immuneAgainst: []
  },
  Bug: { 
    strongAgainst: ['Grass', 'Dark', 'Psychic'], 
    weakAgainst: ['Fire', 'Flying', 'Rock'], 
    immuneAgainst: []
  },
  Dark: { 
    strongAgainst: ['Ghost', 'Psychic'], 
    weakAgainst: ['Bug', 'Fairy', 'Fighting'], 
    immuneAgainst: ['Psychic']
  },
  Dragon: { 
    strongAgainst: ['Dragon'], 
    weakAgainst: ['Dragon', 'Fairy', 'Ice'], 
    immuneAgainst: []
  },
  Fairy: { 
    strongAgainst: ['Fighting', 'Dark', 'Dragon'], 
    weakAgainst: ['Poison', 'Steel'], 
    immuneAgainst: ['Dragon']
  },
  Fighting: { 
    strongAgainst: ['Dark', 'Ice', 'Normal', 'Rock', 'Steel'], 
    weakAgainst: ['Fairy', 'Flying', 'Psychic'], 
    immuneAgainst: []
  },
  Flying: { 
    strongAgainst: ['Bug', 'Fighting', 'Grass'], 
    weakAgainst: ['Electric', 'Ice', 'Rock'], 
    immuneAgainst: ['Ground']
  },
  Ghost: { 
    strongAgainst: ['Ghost', 'Psychic'], 
    weakAgainst: ['Dark', 'Ghost'], 
    immuneAgainst: ['Normal', 'Fighting']
  },
  Grass: { 
    strongAgainst: ['Ground', 'Rock', 'Water'], 
    weakAgainst: ['Bug', 'Fire', 'Flying', 'Ice', 'Poison'], 
    immuneAgainst: []
  },
  Ground: { 
    strongAgainst: ['Electric', 'Fire', 'Poison', 'Rock', 'Steel'], 
    weakAgainst: ['Grass', 'Ice', 'Water'], 
    immuneAgainst: ['Electric']
  },
  Ice: { 
    strongAgainst: ['Dragon', 'Flying', 'Grass', 'Ground'], 
    weakAgainst: ['Fighting', 'Fire', 'Rock', 'Steel'], 
    immuneAgainst: []
  },
  Normal: { 
    strongAgainst: [], 
    weakAgainst: ['Fighting'], 
    immuneAgainst: ['Ghost']
  },
  Poison: { 
    strongAgainst: ['Fairy', 'Grass'], 
    weakAgainst: ['Ground', 'Psychic'], 
    immuneAgainst: []
  },
  Psychic: { 
    strongAgainst: ['Fighting', 'Poison'], 
    weakAgainst: ['Bug', 'Dark', 'Ghost'], 
    immuneAgainst: ['Dark']
  },
  Rock: { 
    strongAgainst: ['Bug', 'Fire', 'Flying', 'Ice'], 
    weakAgainst: ['Fighting', 'Grass', 'Ground', 'Steel', 'Water'], 
    immuneAgainst: []
  },
  Steel: { 
    strongAgainst: ['Fairy', 'Ice', 'Rock'], 
    weakAgainst: ['Fighting', 'Fire', 'Ground'], 
    immuneAgainst: ['Poison']
  }
};

const BattleCanvas = ({
  guy,
  foePokemon,
  moves,
  onRun,
  team,
  currentPokemonIndex,
  setTeam,
  setCurrentPokemonIndex,  // Add this prop
  setEventMessage={setEventMessage},  // Pass the event message setter
  onBattleEnd,
  eventMessage,
  setFoePokemon,
  trainerTeam,
  setTrainerTeam,
  resetPlayerPosition,
  myHP,
  setMyHP,
  items,
  setItems,
  handleCatchingPokemon,

  handlePlayerFainted,
  setMessages,
  messages,
  setMessageIndex,
  messageIndex,
  fightingStage,setFightingStage,
  died,setDied,
  onKeyPress, onKeyRelease 

  

}) => {
  const [myPokemon, setMypokemon] =  useState(guy);
  const [first, setFirst] =  useState(true);
  const [menuState, setMenuState] = useState('main'); // 'main' or 'fight'
  const [cursorPos, setCursorPos] = useState(0); // Cursor position
  const [foeHP, setFoeHP] = useState(foePokemon.hp + foePokemon.level * 2); // Foe Pokémon HP
  const [isAnimating, setIsAnimating] = useState(false); // Animation state
  const [myOffsetX, setMyOffsetX] = useState(0); // Player's Pokémon X offset for animation
  const [foeOffsetX, setFoeOffsetX] = useState(0); // Foe's Pokémon X offset for animation
  const [pressed,setPressed]=useState(false)
  const [messageVisible, setMessageVisible] = useState(false);
  const canvasRef = useRef(null); 
  const [currentFoePokemonIndex, setCurrentFoePokemonIndex] = useState(0);
  const [showPokemonMenu, setShowPokemonMenu] = useState(false); // Show the Pokémon selection menu
  const [showBagMenu, setShowBagMenu] = useState(false); // Show the Bag menu
  const [selectedBagItem, setSelectedBagItem] = useState(0); // Track selected item in Bag
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0); // Track selected Pokémon
  const [pendingPokemonIndex, setPendingPokemonIndex] = useState(currentPokemonIndex); // Local state for immediate feedback
const [skipAttack, setSkipAttack]= useState(false)
const[skip,setSkpip] = useState(false)
const[damage1,setDamage1]= useState(null);
const[selectedMove,setSelectedMove]=useState(myPokemon.moves[0])
const[stop1,setStop1]= useState(false);
const[lost,setLost]=useState(false);


  const handleUsePokeball = () => {
    if (trainerTeam.length <= 1){
    const pokeball = items[selectedBagItem];
    
    if (!pokeball || pokeball.name !== 'pokeball' || pokeball.count === 0 || team.length === 6) {
      // If no Pokéballs or team is full, display a message and return
      setEventMessage("You don't have any Pokéballs left or your team is full!");
      return;
    }
  
    // Use a Pokéball
    setEventMessage(`You used a Pokéball!`);
    setShowBagMenu(false);  // Close the Bag menu
    setMenuState('main');   // Return to the main battle menu
  
    // Try to catch the Pokémon
    const wasCaught = handleCatchingPokemon();  // Store the result of the catch attempt
    
    // Reduce the Pokéball count after attempting a catch
    setItems(prevItems => 
      prevItems.map(item =>
        item.name === 'pokeball' ? { ...item, count: item.count - 1 } : item
      )
    );
  
    // If the Pokémon was not caught, the foe attacks
    if (!wasCaught) {
      const randomFoeMove = foePokemon.moves[Math.floor(Math.random() * foePokemon.moves.length)];
      handleFoePokemonAttack(foePokemon, myPokemon, randomFoeMove, true);
      setStop1(false);
      setMenuState('main')
    }}else{
      setEventMessage("can't use")
    }
  };
  



  const handleSelectPokemon = useCallback(() => {
    // Clone the current team
    const updatedTeam = [...team];
  
    // Swap the first Pokémon with the currently selected Pokémon
    const temp = updatedTeam[0];
    updatedTeam[0] = updatedTeam[currentPokemonIndex];
    updatedTeam[currentPokemonIndex] = temp;
  
    // Update the team state with the swapped Pokémon
    setTeam(updatedTeam);
  
    // Get the updated first Pokémon (after the swap)
    const selectedPokemon = updatedTeam[0];
    // Create a new object for the selected Pokémon (if you need to modify other properties later)
    const updatedPokemon = {
      ...selectedPokemon, // Spread all the properties of the selected Pokémon
      // Add or modify properties if necessary (e.g., moves, stats, etc.)
    };
  
    // Update the myPokemon state with the newly selected Pokémon
    setMypokemon(updatedPokemon);
  
    // Close the Pokémon menu

    setSkpip(true);
    

  
    // Debugging log to verify the updated Pokémon
    console.log('Updated myPokemon:', updatedPokemon);
    setCurrentPokemonIndex(0)
    setShowPokemonMenu(false)

  }, [team, currentPokemonIndex, setTeam, setMypokemon, setShowPokemonMenu]);
  
  const switchToNextPokemon = () => {
    // Show the Pokémon menu to select the next Pokémon
    setShowPokemonMenu(true);
    setFightingStage('1')
    
    
  };
  
  


  const switchToNextFoePokemon = () => {
    // Check if the trainer's team exists and has Pokémon
    if (trainerTeam && trainerTeam.length > 0) {
      
      const nextIndex = currentFoePokemonIndex + 1;
  
      // Check if the next index is within bounds
      if (nextIndex < trainerTeam.length) {
        const nextPokemon = trainerTeam[nextIndex];
        setCurrentFoePokemonIndex(nextIndex);
        setFoePokemon(nextPokemon);
        setFoeHP(nextPokemon.hp + nextPokemon.level * 2); // Reset HP for next Pokémon
        const thisMessage = (`Foe ${trainerTeam[currentFoePokemonIndex + 1].name} has enter!`);
        addMessage(thisMessage,false)

      } else {
        // Handle case where all foe Pokémon have been defeated
        setFightingStage('1')
        onBattleEnd();
        setTrainerTeam(null);  // End the battle if no foes left
      }
    } else {
      // End the battle if no trainer team exists
      setFightingStage('1')
      onBattleEnd();
    }
  };
  
  
  const handleFoeDefeat = () => {

    setTeam(prevTeam => {
      const updatedTeam = [...prevTeam];
      updatedTeam[currentPokemonIndex].experience += 100;
      checkLevelUp(updatedTeam[currentPokemonIndex], setTeam, currentPokemonIndex); // Check if Pokémon levels up
      return updatedTeam;
    });
    switchToNextFoePokemon();  
  };
  





  const handlePokemonFaint = () => {
    // Mark the current Pokémon as fainted
    const updatedTeam = [...team];
    updatedTeam[currentPokemonIndex].currentHp = 0; // Ensure HP is set to 0
    
    setTeam(updatedTeam); // Update the team state
    
    // Check if there's any Pokémon with HP > 0
    if (updatedTeam.some(pokemon => pokemon.currentHp > 0)) {
      // Switch to the next available Pokémon
      switchToNextPokemon();
    } else {
      
      setDied(true)
      setLost(true)
      setFightingStage('1')
      setTrainerTeam(null);
      console.log("here")
      setStop1(true)
      setDied(true)
      console.log(died);
      handlePlayerFainted();
   
  
      
      
    }
  };
  
  




  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    // Ensure the canvas is not null
    if (!canvas) {
      console.error('Canvas not found!');
      return;
    }

    const ctx = canvas.getContext('2d');

    const battleBgImage = new Image();
    const battleBoxImage = new Image();
    const cursorImage = new Image();
    const cursorSelectImage = new Image();
    const fightCursorImage = new Image();
    const fightCursorSelectImage = new Image();
    const myPokemonSprite = new Image(); // Dynamically load the player Pokémon sprite
    const foePokemonSprite = new Image(); // Dynamically load the foe Pokémon sprite
    const myDataBoxImage = new Image();
    const foeDataBoxImage = new Image();

    battleBgImage.src = battleBg1Src;
    battleBoxImage.src = battleBoxSrc;
    cursorImage.src = cursorSrc;
    cursorSelectImage.src = cursorSelectSrc;
    fightCursorImage.src = fightCursorSrc;
    fightCursorSelectImage.src = fightCursorSelectSrc;
    myPokemonSprite.src = myPokemon.sprites.back;
    foePokemonSprite.src = foePokemon.sprites.front;
    myDataBoxImage.src = foeDataBoxSrc;
    foeDataBoxImage.src = foeDataBoxSrc;

    const handleImagesLoaded = () => {
      renderBattle(
        ctx,
        battleBgImage,
        battleBoxImage,
        cursorImage,
        cursorSelectImage,
        fightCursorImage,
        fightCursorSelectImage,
        myPokemonSprite,
        foePokemonSprite,
        myDataBoxImage,
        foeDataBoxImage
      );
    };

    battleBgImage.onload = handleImagesLoaded;
    battleBoxImage.onload = handleImagesLoaded;
    cursorImage.onload = handleImagesLoaded;
    cursorSelectImage.onload = handleImagesLoaded;
    fightCursorImage.onload = handleImagesLoaded;
    fightCursorSelectImage.onload = handleImagesLoaded;
    myPokemonSprite.onload = handleImagesLoaded;
    foePokemonSprite.onload = handleImagesLoaded;
    myDataBoxImage.onload = handleImagesLoaded;
    foeDataBoxImage.onload = handleImagesLoaded;

    if (battleBgImage.complete) handleImagesLoaded();
  }, [menuState, cursorPos, myHP, foeHP, myOffsetX, foeOffsetX]);

  const renderBattle = (
    ctx,
    battleBgImage,
    battleBoxImage,
    cursorImage,
    cursorSelectImage,
    fightCursorImage,
    fightCursorSelectImage,
    myPokemonSprite,
    foePokemonSprite,
    myDataBoxImage,
    foeDataBoxImage
  ) => {
    // Draw battle background
    ctx.drawImage(battleBgImage, 0, 0, 512, 288);
  
    // Draw battle box
    ctx.drawImage(battleBoxImage, 0, 288, 512, 96);
  
    // Draw Pokémon sprites with offset for animation
    ctx.drawImage(foePokemonSprite, 360 + foeOffsetX, 60); // Opponent's Pokémon
    ctx.drawImage(myPokemonSprite, 50 + myOffsetX, 128); // Player's Pokémon
  
    // Draw Data Boxes
    ctx.drawImage(foeDataBoxImage, 1, 1);
    ctx.drawImage(myDataBoxImage, 252, 226);
  
    // --- Draw HP bars ---
    const maxHPBarWidth1 = 96;
   // Max width for the HP bar
    const barHeight = 4; // Height of the HP bar
  
    // Calculate the percentage of HP remaining for player and foe
    const myHPPercentage = myHP / (myPokemon.hp + myPokemon.level * 2);
    const foeHPPercentage = foeHP / (foePokemon.hp + foePokemon.level * 2);
  
    // Draw player's HP bar
    ctx.fillStyle = 'green';
    ctx.fillRect(369, 267, myHPPercentage * maxHPBarWidth1, barHeight); // Player's HP bar
    
    // Draw foe's HP bar
    ctx.fillStyle = 'green';
    ctx.fillRect(119, 42, foeHPPercentage * maxHPBarWidth1, barHeight); // Foe's HP bar
  
    // Draw HP text to show health
    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`${myPokemon.name}  Level: ${myPokemon.level}`, 280, 250);
    ctx.fillText(`Level: ${foePokemon.level}`, 10, 30);
  
    if (menuState === 'main') {
      drawMainMenu(ctx, cursorImage, cursorSelectImage);
    } else if (menuState === 'fight') {
      drawFightMenu(ctx, fightCursorImage, fightCursorSelectImage, moves);
    }
  };
  

  const drawMainMenu = (ctx, cursorImage, cursorSelectImage) => {
    const buttonWidth = 127;
    const buttonHeight = 48;
    const menuWidth = 254;
    const menuHeight = 96;
    const canvasWidth = 512;
    const canvasHeight = 384;
    const offsetX = canvasWidth - menuWidth;
    const offsetY = canvasHeight - menuHeight;

    const positions = [
      { x: offsetX, y: offsetY },
      { x: offsetX + buttonWidth, y: offsetY },
      { x: offsetX, y: offsetY + buttonHeight },
      { x: offsetX + buttonWidth, y: offsetY + buttonHeight },
    ];

    ctx.drawImage(cursorImage, offsetX, offsetY, menuWidth, menuHeight);

    const selectSourceX = (cursorPos % 2) * buttonWidth;
    const selectSourceY = Math.floor(cursorPos / 2) * buttonHeight;
    ctx.drawImage(
      cursorSelectImage,
      selectSourceX,
      selectSourceY,
      buttonWidth,
      buttonHeight,
      positions[cursorPos].x,
      positions[cursorPos].y,
      buttonWidth,
      buttonHeight
    );
  };

  const drawFightMenu = (ctx, fightCursorImage, fightCursorSelectImage, moves) => {
  const buttonWidth = 228; // Adjusted width for each move button
  const buttonHeight = 48; // Adjusted height for each move button
  const cursorWidth = 170; // Actual width of the fight cursor
  const cursorHeight = 48; // Actual height of the fight cursor

  // Define the positions for the move buttons (and the text labels)
  const positions = [
    { x: 18, y: 288 },  // First move
    { x: 14, y: 336 },  // Second move
    { x: 274, y: 290 }, // Third move
    { x: 268, y: 336 }, // Fourth move
  ];

  // Draw the fight menu background
  ctx.drawImage(fightCursorImage, 0, 288, 512, 96);

  // Calculate the source X and Y positions for the fight cursor selection
  const selectSourceX = (cursorPos % 2) * cursorWidth+30;  // Calculate X position based on cursorPos
  const selectSourceY = Math.floor(cursorPos / 2) * cursorHeight;  // Calculate Y position based on cursorPos
  
  // Draw the fight cursor at the current cursor position
  ctx.drawImage(
    fightCursorSelectImage,
    selectSourceX, 
    selectSourceY, 
    cursorWidth, 
    cursorHeight,
    positions[cursorPos].x, 
    positions[cursorPos].y, 
    cursorWidth, 
    cursorHeight
  );

  // Render each move's name after the cursor, so the text is on top of the cursor
  for (let i = 0; i < moves.length; i++) {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(moves[i].name, positions[i].x + 10, positions[i].y + 25); // Move name inside the button
  }
};
const getTypeEffectiveness = (moveType, defenderTypes) => {
  let effectiveness = 1; // Default to neutral effectiveness
  let effectivenessMessage = ''; // Track effectiveness message

  defenderTypes.forEach(type => {
    if (typeEffectivenessChart[moveType].strongAgainst.includes(type)) {
      effectiveness *= 2; // Double damage for strong types
      effectivenessMessage = 'It\'s super effective!';
    } else if (typeEffectivenessChart[moveType].weakAgainst.includes(type)) {
      effectiveness *= 0.5; // Half damage for weak types
      effectivenessMessage = 'It\'s not very effective...';
    } else if (typeEffectivenessChart[moveType].immuneAgainst.includes(type)) {
      effectiveness *= 0; // No damage for immune types
      effectivenessMessage = 'It doesn\'t affect the foe...';
    }
  });

  return { effectiveness, effectivenessMessage };
};

const calculateDamage = (attacker, defender, move) => {
  if (!move || !move.type) {
    console.error("Move or move type is undefined:", move);
    return { damage: 0, effectivenessMessage: "No damage" };
  }

  // Ensure the defender's type is properly defined as an array
  const defenderTypes = Array.isArray(defender.type) ? defender.type : [];

  const level = attacker.level;
  const attackStat = move.category === 'Physical' ? attacker.attack : attacker.specialAttack;
  const defenseStat = move.category === 'Physical' ? defender.defense : defender.specialDefense;
  const power = move.power;

  // Same-Type Attack Bonus (STAB) - check for any match in attacker's type
  const typeBonus = attacker.type.some(t => t === move.type) ? 1.5 : 1;

  // Type Effectiveness
  const { effectiveness, effectivenessMessage } = getTypeEffectiveness(move.type, defenderTypes);

  // Random factor between 217 and 255
  const randomMultiplier = (Math.random() * (255 - 217) + 217) / 255;

  // Apply damage formula
  const damage = (((((2 * level) / 5 + 2) * attackStat * power) / defenseStat) / 50 + 2) * typeBonus * effectiveness * randomMultiplier;


  return { damage: Math.floor(damage), effectivenessMessage };
};


const addMessage = (newMessage, sendToEvent = true) => {
 
 if(!sendToEvent){ setMessages(prevMessages => {
    // Prevent adding duplicate messages by checking the last message
    if (prevMessages.length === 0 || prevMessages[prevMessages.length - 1] !== newMessage) {
      return [...prevMessages, newMessage];
    }
    return prevMessages; // No changes if the message is a duplicate
  });}
  
  // Set event message only if sendToEvent is true
  if (sendToEvent) {
    setEventMessage(newMessage);
  }
};

// Inside handleMyPokemonAttack and handleFoePokemonAttack
const handleMyPokemonAttack = (attacker, defender, move, onComplete, sendToEvent = true) => {
  setIsAnimating(true);
  setStop1(true); // Prevent automatic return to main menu during animation
  let animationFrames = 0;
  const maxFrames = 20;
  const offsetIncrement = 5;

  const animate = () => {
    animationFrames++;

    if (animationFrames <= maxFrames / 2) {
      setMyOffsetX((prev) => prev + offsetIncrement); // Move forward
    } else {
      setMyOffsetX((prev) => prev - offsetIncrement); // Move back
    }

    if (animationFrames < maxFrames) {
      requestAnimationFrame(animate);
    } else {
      setMyOffsetX(0); // Reset offset

      // Calculate damage
      const { damage, effectivenessMessage } = calculateDamage(attacker, defender, move);
      const newFoeHP = Math.max(0, foeHP - damage);
      setDamage1(damage);

      // Update HP and add the message
      setFoeHP(newFoeHP);
      const attackMessage = `Foe ${attacker.name} used ${move.name}! ${effectivenessMessage} It dealt ${damage} damage!`;
      addMessage(attackMessage, sendToEvent);

      if (newFoeHP <= 0) {
        addMessage(`Foe ${defender.name} has fainted!`, sendToEvent);
        
        handleFoeDefeat(); // Handle foe defeat
        setFightingStage('1'); // Reset to player's turn on faint
        setStop1(false); // Allow the game to proceed normally after defeat
        setMenuState('main'); // Return to main menu after the battle ends
      } else {
        setMenuState('main');
      }
      setCursorPos(0);
      setIsAnimating(false);

      // Call the provided onComplete function, if any
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }
  };

  animate();
};
const handleFoePokemonAttack = (attacker, defender, move, onComplete, sendToEvent = true) => {
  setIsAnimating(true);
  setStop1(true); // Prevent automatic transition to main menu during animation
  let animationFrames = 0;
  const maxFrames = 20;
  const offsetIncrement = 5;

  const animate = () => {
    animationFrames++;

    if (animationFrames <= maxFrames / 2) {
      setFoeOffsetX((prev) => prev - offsetIncrement); // Move forward (to the left)
    } else {
      setFoeOffsetX((prev) => prev + offsetIncrement); // Move back
    }

    if (animationFrames < maxFrames) {
      requestAnimationFrame(animate);
    } else {
      setFoeOffsetX(0); // Reset offset

      // Calculate damage
      const { damage, effectivenessMessage } = calculateDamage(attacker, defender, move);
      const newMyHP = Math.max(0, myHP - damage);
      setDamage1(damage);

      // Update HP and add the message
      setMyHP(newMyHP);
      const attackMessage = `${attacker.name} used ${move.name}! ${effectivenessMessage} It dealt ${damage} damage!`;
      addMessage(attackMessage, sendToEvent);
      const updatedTeam = [...team];
    updatedTeam[0].currentHp = newMyHP; // Ensure HP is set to 0
    
    setTeam(updatedTeam); // Update the team state

      if (newMyHP <= 0) {
        addMessage(`${defender.name} has fainted!`, sendToEvent);
        handlePokemonFaint(true); // Handle player faint logic
        setFightingStage('1'); // Reset to player's turn on faint
        setStop1(false); // Allow the game to proceed normally after defeat
        setMenuState('main'); // Return to main menu after the battle ends
      } else {
        setMenuState('main'); // Return to main menu after completing the round
      }
      setCursorPos(0);

      setIsAnimating(false);

      // Call the provided onComplete function, if any
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }
  };

  animate();
};






  

const handleKeyDown = (e) => {


 



  if (!isAnimating) {
    if(lost){
      onBattleEnd();
      setEventMessage("YOU LOST!")
      return
    }
    // Handle main battle menu
    if (!showPokemonMenu && !showBagMenu && menuState === 'main' &&!stop1) {
      if (fightingStage === '2') {


        // Handle the second part of the round (foe or player)
        if (myPokemon.speed >= foePokemon.speed) {
          const randomFoeMove = foePokemon.moves[Math.floor(Math.random() * foePokemon.moves.length)];
          handleFoePokemonAttack(foePokemon, myPokemon, randomFoeMove, () => {
            setFightingStage('1'); // Reset to player's turn for the next round
            setStop1(false);
            setMenuState('main'); // Back to the main menu after the second attack
          });
        return} else {
          handleMyPokemonAttack(myPokemon, foePokemon, selectedMove, () => {
            setFightingStage('1'); // Reset to player's turn for the next round
            setStop1(false);
            setMenuState('main'); // Back to the main menu after the second attack
          });
        return}
      }
      
  
      if (e.key === 'x') {
  

 
     
        if (cursorPos === 0) {
          setMenuState('fight'); // Switch to fight menu
        } else if (cursorPos === 1) {
          setShowPokemonMenu(true); 
  
       


        } else if (cursorPos === 2) {
          setShowBagMenu(true); // Show Bag menu
        } else if (cursorPos === 3) {
         if (trainerTeam.length <= 1){
          onRun();}
          else{
            console.log (trainerTeam)
            setEventMessage("Can't Run!")
          }
        }
       
      }
    }

    // Handle Pokémon menu
    else if (showPokemonMenu &&(!messages && messages.length)) {
      const oldPokemon = myPokemon
      if (e.key === 'ArrowUp') {
        // Update the selected Pokemon index when pressing the up arrow
        setCurrentPokemonIndex((prev) => {
          const newIndex = (prev - 1 + team.length) % team.length; // Move up the list
          console.log(`ArrowUp Pressed - New Index: ${newIndex}`); // Log updated value
          return newIndex;
        });
      } else if (e.key === 'ArrowDown') {
        // Update the selected Pokemon index when pressing the down arrow
        setCurrentPokemonIndex((prev) => {
          const newIndex = (prev + 1) % team.length;
          console.log(`ArrowDown Pressed - New Index: ${newIndex}`);
          return newIndex;
        });
      } else if (e.key === 'x') {

        handleSelectPokemon();
       

        
      } else
       if (e.key === 'z') {
        setShowPokemonMenu(false); // Close Pokémon menu
       }else{
        const randomFoeMove = foePokemon.moves[Math.floor(Math.random() * foePokemon.moves.length)]; 

        handleFoePokemonAttack(foePokemon, myPokemon, randomFoeMove, false)
       }
    }
    // Handle Bag menu
    else if (showBagMenu) {
   
      if (e.key === 'ArrowUp') {
        setSelectedBagItem((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowDown') {
        setSelectedBagItem((prev) => (prev + 1) % items.length);
      } else if (e.key === 'x') {
       
        handleUsePokeball(); // Use an item from the Bag
      } else if (e.key === 'z') {
        setShowBagMenu(false); // Close Bag menu
      }
    }

    // Handle fight logic and cursor movement
    else if (menuState === 'fight'&& !stop1) {
      if (e.key === 'z') {
        setMenuState('main');
        setFightingStage('1'); // Close Pokémon menu
       }
      // Handle cursor movement in the fight menu
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCursorPos((prev) => (prev - 1 + moves.length) % moves.length); // Move cursor up/left
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCursorPos((prev) => (prev + 1) % moves.length); // Move cursor down/right
      }
      
      // Select a move and execute the attack
      if (e.key === 'x') {
        setSelectedMove(moves[cursorPos]);
        if (!selectedMove) {
          return;
        }
        if (fightingStage === '1') {
          // Player's turn
          if (myPokemon.speed >= foePokemon.speed) {
            handleMyPokemonAttack(myPokemon, foePokemon, selectedMove, () => {
              // Set to foe's turn (Stage 2) after player finishes their attack
              setFightingStage('2');
              setStop1(false); // Enable the transition to the foe's turn
            });
          } else {
            const randomFoeMove = foePokemon.moves[Math.floor(Math.random() * foePokemon.moves.length)];
            handleFoePokemonAttack(foePokemon, myPokemon, randomFoeMove, () => {
              // Set to player's turn (Stage 2) after foe finishes their attack
              setFightingStage('2');
              setStop1(false);
            });
          }
        }  
      }
    }
    if (foeHP <= 0) {
      handleFoeDefeat();
  
  
    }
    if (myHP <= 0) {
      handlePokemonFaint(true);
    }

    // Handle cursor movement for the main battle menu
    if (!showPokemonMenu && !showBagMenu && menuState === 'main') {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCursorPos((prev) => (prev - 1 + 4) % 4); // Move cursor up/left in main menu
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCursorPos((prev) => (prev + 1) % 4); // Move cursor down/right in main menu
      }
    }
  }
};



  
useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [cursorPos, showPokemonMenu,team, showBagMenu, myHP, foeHP, menuState, isAnimating, eventMessage,myPokemon,setMypokemon,stop1,setStop1,skipAttack,setSkipAttack,setShowPokemonMenu,showPokemonMenu,first,setCurrentPokemonIndex,currentPokemonIndex,selectedPokemonIndex,selectedPokemonIndex,moves,setMessages,messageIndex,setMessageIndex,damage1,trainerTeam,setDied,died,onKeyPress,onKeyRelease]);


return (
  <div style={{ position: 'relative', width: '512px', height: '384px' }}>
    {/* Main game canvas */}
    <canvas ref={canvasRef} width={512} height={384} />

    {/* Display event message using MessageBox */}
    {eventMessage && (
      <div
        style={{
          position: 'absolute',
          bottom: '0', // Position MessageBox at the bottom inside the canvas
          left: '0',
          width: '100%',
          height: '96px',  // Fixed height for MessageBox
          zIndex: 10, // Ensure it appears above the canvas
        }}
      >
        <MessageBox message={eventMessage} />
      </div>
    )}

    {/* Pokémon Menu */}
    {showPokemonMenu && (
      <div
        style={{
          position: 'absolute',
          top: '0px',
          right: '0px', // Align the Pokémon Menu to the right of the canvas
          width: '160px',
          height: '288px',
          backgroundImage: `url(${pauseMenuBg})`,  // Use the sprite background
          backgroundSize: 'cover',
          zIndex: 10,  // Ensure it appears above the canvas
        }}
      >
        <PokemonMenu
          fromBattleCanvas={true}  // Set this to true when coming from BattleCanvas

          team={team}
          setTeam={setTeam}
          selectedPokemonIndex={selectedPokemonIndex}
          setSelectedPokemonIndex={setSelectedPokemonIndex}

          setMyHP={setMyHP}
          setMypokemon={setMypokemon}
          handleSelectPokemon={handleSelectPokemon}
          currentPokemonIndex={currentPokemonIndex}   // Make sure this is passed
          setCurrentPokemonIndex={setCurrentPokemonIndex} 
          setShowPokemonMenu={setShowPokemonMenu}
          showPokemonMenu={showPokemonMenu}
       

        
        />
      </div>
    )}

    {/* Bag Menu */}
    {showBagMenu && (
      <div
        style={{
          position: 'absolute',
          top: '0px',
          right: '0px', // Align the Bag Menu to the right of the canvas
          width: '160px',
          height: '288px',
          backgroundImage: `url(${pauseMenuBg})`,  // Use the sprite background
          backgroundSize: 'cover',
          zIndex: 10,  // Ensure it appears above the canvas
        }}
      >
        <BagMenu
          items={items}
          selectedBagItem={selectedBagItem}
          setSelectedBagItem={setSelectedBagItem}
        />
      </div>
    )}
  </div>
);
};

export default BattleCanvas;