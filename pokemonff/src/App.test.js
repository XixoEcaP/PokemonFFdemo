import React, { useRef, useEffect, useCallback } from 'react';
import map1Src from '../images/map1.png'; // Adjust path to your image
import house1Src from '../images/house1.png'; // Adjust path to your image
import pokeballSrc from '../images/pokeball.png';
import playerSrc from '../images/player.png';

const tileSize = 32; // Assuming each tile is 32x32 pixels

const GameCanvas = ({ map, playerPosition, direction, frameIndex, events }) => {
  const canvasRef = useRef(null);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const mapImage = new Image();
    // Load the appropriate map image based on the current map
    mapImage.src = map.id === 'map1' ? map1Src : house1Src; // Replace with your actual image sources

    const handleImageLoad = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Render the map at (32, 192)
      const offsetX = 32; // Starting x position for map1
      const offsetY = 192; // Starting y position for map1

      // Draw the map
      context.drawImage(
        mapImage,
        0, 0, // Source coordinates (top-left of the image)
        map.dimensions.width * tileSize, map.dimensions.height * tileSize, // Width and height to draw
        offsetX, offsetY, // Destination coordinates on the canvas
        map.dimensions.width * tileSize, map.dimensions.height * tileSize // Scale to draw at
      );

      // Draw the Pokéballs if events are active
      if (events.pokeballLevia?.isActive && map.id === 'map1') {
        const { x: eventX, y: eventY } = events.pokeballLevia.position;
        context.drawImage(
          pokeballSrc,
          (eventX - offsetX / tileSize) * tileSize,
          (eventY - offsetY / tileSize) * tileSize,
          tileSize, tileSize
        );
      }

      if (events.pokeballRam?.isActive && map.id === 'map1') {
        const { x: eventX, y: eventY } = events.pokeballRam.position;
        context.drawImage(
          pokeballSrc,
          (eventX - offsetX / tileSize) * tileSize,
          (eventY - offsetY / tileSize) * tileSize,
          tileSize, tileSize
        );
      }

      // Draw the player sprite with the correct frame and direction
      const playerCanvasX = (playerPosition.x - offsetX / tileSize) * tileSize;
      const playerCanvasY = (playerPosition.y - offsetY / tileSize) * tileSize;
      context.drawImage(
        playerSrc,
        frameIndex * tileSize, direction * 48, tileSize, 48, // Frame and direction
        playerCanvasX, playerCanvasY,
        tileSize, 48
      );
    };

    // Ensure images are loaded before drawing
    mapImage.onload = handleImageLoad;
    // If the image is already cached
    handleImageLoad(); 
  }, [map, playerPosition, direction, frameIndex, events]);

  useEffect(() => {
    redrawCanvas(); // Initial render
  }, [redrawCanvas]);

  return (
    <canvas ref={canvasRef} width={640} height={480} /> // Adjust the canvas size as needed
  );
};

export default GameCanvas;
useEffect(() => {
  const handleKeyDown = (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      setManualFrameIndex((prevIndex) => (prevIndex + 1) % 4); 
      setManualFrameIndex((prevIndex) => (prevIndex + 1) % 4);// Cycle through frames
      redrawCanvas(); // Redraw with updated frame
    }
  };

  const handleKeyDown = (e) => {
    myPokemon.currentHp = myHP;
  
    if (!isAnimating) {
      // Handle main battle menu
      if (menuState === 'main') {
        if (e.key === 'x') {
          if (cursorPos === 0) {
            setMenuState('fight'); // Switch to fight menu
          } else if (cursorPos === 1) {
            // Pokémon menu selected
            setShowPokemonMenu(true); // Show the Pokémon menu
          } else if (cursorPos === 3) {
            onRun(); // Run action
          }
        }
      }
      
      // Handle Pokémon menu navigation and selection
      else if (showPokemonMenu) {
        if (e.key === 'ArrowUp') {
          setSelectedPokemonIndex((prev) => (prev - 1 + team.length) % team.length); // Cycle up
        } else if (e.key === 'ArrowDown') {
          setSelectedPokemonIndex((prev) => (prev + 1) % team.length); // Cycle down
        } else if (e.key === 'x') {
          handleSelectPokemon(); // Select the Pokémon to switch
        } else if (e.key === 'z') {
          setShowPokemonMenu(false); // Close the Pokémon menu and go back to main battle menu
        }
      }
  
      // Handle fighting logic
      else if (menuState === 'fight') {
        const selectedMove = moves[cursorPos];
  
        if (myPokemon.speed >= foePokemon.speed) {
          // Player attacks first
          handleAttackAnimation(myPokemon, foePokemon, selectedMove, true, () => {
            if (foeHP <= 0) {
              handleFoeDefeat();
            }
            if (myHP <= 0) {
              handlePokemonFaint(true);
            }
            if (foeHP > 0) {
              const randomFoeMove = foePokemon.moves[Math.floor(Math.random() * foePokemon.moves.length)];
              handleAttackAnimation(foePokemon, myPokemon, randomFoeMove, false, () => {
                setMenuState('main'); // Return to main menu after both attacks
              });
            } else {
              handleFoeDefeat(); // Return to main menu if foe is defeated
            }
          });
        } else {
          if (foeHP <= 0) {
            handleFoeDefeat();
          }
          if (myHP <= 0) {
            handlePokemonFaint(true);
          }
          const randomFoeMove = foePokemon.moves[Math.floor(Math.random() * foePokemon.moves.length)];
  
          // Foe attacks first
          handleAttackAnimation(foePokemon, myPokemon, randomFoeMove, false, () => {
            if (myHP > 0) {
              handleAttackAnimation(myPokemon, foePokemon, selectedMove, true, () => {
                setMenuState('main'); // Return to main menu after both attacks
              });
            } else {
              handlePokemonFaint(true);
            }
          });
        }
      }
  
      // Handle cursor movement for the main battle menu
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCursorPos((cursorPos - 1 + 4) % 4); // Move cursor up/left
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCursorPos((cursorPos + 1) % 4); // Move cursor down/right
      }
    }
  
    // General check for foe and player Pokémon faint
    if (foeHP <= 0) {
      handleFoeDefeat();
    }
    if (myHP <= 0) {
      handlePokemonFaint(true);
    }
  };
  const handleUsePokeball = () => {
    if (items[selectedBagItem].name === 'pokeball') {
      setEventMessage(`You used a Pokéball!`);
      setShowBagMenu(false); // Close the Bag menu
      setMenuState('main'); // Return to the main battle menu
      setCatching(true); // Set catching state in App.js to true
    }
  };
  
  const handleKeyDown = (e) => {
    myPokemon.currentHp = myHP;
  
    if (!isAnimating) {
      // Handle main battle menu
      if (menuState === 'main') {
        if (e.key === 'x') {
          if (cursorPos === 0) {
            setMenuState('fight'); // Switch to fight menu
          } else if (cursorPos === 1) {
            // Pokémon menu selected
            setShowPokemonMenu(true); // Show the Pokémon menu
          } else if (cursorPos === 3) {
            onRun(); // Run action
          }
        }
      }
      
      // Handle Pokémon menu navigation and selection
      else if (showPokemonMenu) {
        if (e.key === 'ArrowUp') {
          setSelectedPokemonIndex((prev) => (prev - 1 + team.length) % team.length); // Cycle up
        } else if (e.key === 'ArrowDown') {
          setSelectedPokemonIndex((prev) => (prev + 1) % team.length); // Cycle down
        } else if (e.key === 'x') {
          handleSelectPokemon(); // Select the Pokémon to switch
        } else if (e.key === 'z') {
          setShowPokemonMenu(false); // Close the Pokémon menu and go back to main battle menu
        }
      }
  
      // Handle fighting logic
      else if (menuState === 'fight') {
        const selectedMove = moves[cursorPos];
  
        if (myPokemon.speed >= foePokemon.speed) {
          // Player attacks first
          handleAttackAnimation(myPokemon, foePokemon, selectedMove, true, () => {
            if (foeHP <= 0) {
              handleFoeDefeat();
            }
            if (myHP <= 0) {
              handlePokemonFaint(true);
            }
            if (foeHP > 0) {
              const randomFoeMove = foePokemon.moves[Math.floor(Math.random() * foePokemon.moves.length)];
              handleAttackAnimation(foePokemon, myPokemon, randomFoeMove, false, () => {
                setMenuState('main'); // Return to main menu after both attacks
              });
            } else {
              handleFoeDefeat(); // Return to main menu if foe is defeated
            }
          });
        } else {
          if (foeHP <= 0) {
            handleFoeDefeat();
          }
          if (myHP <= 0) {
            handlePokemonFaint(true);
          }
          const randomFoeMove = foePokemon.moves[Math.floor(Math.random() * foePokemon.moves.length)];
  
          // Foe attacks first
          handleAttackAnimation(foePokemon, myPokemon, randomFoeMove, false, () => {
            if (myHP > 0) {
              handleAttackAnimation(myPokemon, foePokemon, selectedMove, true, () => {
                setMenuState('main'); // Return to main menu after both attacks
              });
            } else {
              handlePokemonFaint(true);
            }
          });
        }
      }
  
      // Handle cursor movement for the main battle menu
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCursorPos((cursorPos - 1 + 4) % 4); // Move cursor up/left
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCursorPos((cursorPos + 1) % 4); // Move cursor down/right
      }
    }
  
    if (foeHP <= 0) {
      handleFoeDefeat();
    }
    if (myHP <= 0) {
      handlePokemonFaint(true);
    }
    else if (showPokemonMenu) {
      if (e.key === 'ArrowUp') {
        setSelectedPokemonIndex((prev) => (prev - 1 + team.length) % team.length);
      } else if (e.key === 'ArrowDown') {
        setSelectedPokemonIndex((prev) => (prev + 1) % team.length);
      } else if (e.key === 'x') {
        handleSelectPokemon(); // Switch Pokémon
      } else if (e.key === 'z') {
        setShowPokemonMenu(false); // Close Pokémon menu
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
    
  };
  const switchToNextPokemon2 = () => {
    let nextIndex = currentPokemonIndex;
    
    // Find the next Pokémon with HP > 0
    for (let i = 1; i < team.length; i++) {
      const newIndex = (currentPokemonIndex + i) % team.length;
      if (team[newIndex].currentHp > 0) {
        nextIndex = newIndex;
        break;
      }
    }
    
    // Set the new Pokémon as the current Pokémon
    setCurrentPokemonIndex(nextIndex);
    setMypokemon(team[nextIndex]);
    setMyHP(team[nextIndex].currentHp);
  };
  const switchToNextPokemon = () => {
    setShowPokemonMenu(true)

  }
  const handleKeyDown = (e) => {
 



    if (!isAnimating) {
      // Handle main battle menu
      if (!showPokemonMenu && !showBagMenu && menuState === 'main' &&!stop) {
    
    
        if (e.key === 'x') {
    
  
   
       
          if (cursorPos === 0) {
            setMenuState('fight'); // Switch to fight menu
          } else if (cursorPos === 1) {
            setShowPokemonMenu(true); 
    
         
  
  
          } else if (cursorPos === 2) {
            setShowBagMenu(true); // Show Bag menu
          } else if (cursorPos === 3) {
            onRun(); // Run action
          }
        }
      }
  
      // Handle Pokémon menu
      else if (showPokemonMenu &&(!messages && messages.length < 0)) {
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
      else if (menuState === 'fight') {
        // Handle cursor movement in the fight menu
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          setCursorPos((prev) => (prev - 1 + moves.length) % moves.length); // Move cursor up/left
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          setCursorPos((prev) => (prev + 1) % moves.length); // Move cursor down/right
        }
  
        // Select a move and execute the attack
        if (e.key === 'x'||fightingStage === 'fight1') {
          const selectedMove = moves[cursorPos];
  
          // Player attacks first
          if (myPokemon.speed >= foePokemon.speed) {
  
            handleMyPokemonAttack(myPokemon, foePokemon, selectedMove, () => {
           if(foeHP-damage1 >= 0){
            console.log(foeHP-damage1)
                // Foe attacks after player if not fainted
                const randomFoeMove = foePokemon.moves[Math.floor(Math.random() * foePokemon.moves.length)];
                handleFoePokemonAttack(foePokemon, myPokemon, randomFoeMove, false, false, () => {
                  if (myHP <= 0) {
                    handlePokemonFaint(true); // Handle player Pokémon faint
                  } else {
                    setMenuState('main');
                    if (foeHP <= 0) {
                      handleFoeDefeat();
                  
                  
                    } // Return to main menu after both attacks // Return to main menu after attacks
                  }
                }
                
              );
            }else{
              setMessages(['']);
            }
            });
          } else {
            // Foe attacks first
            const randomFoeMove = foePokemon.moves[Math.floor(Math.random() * foePokemon.moves.length)];
            handleFoePokemonAttack(foePokemon, myPokemon, randomFoeMove, () => {
  
              if (myHP <= 0) {
                handlePokemonFaint(true); // Handle player Pokémon faint
              } else {
               
                // Player attacks after foe if not fainted
                handleMyPokemonAttack(myPokemon, foePokemon, selectedMove,false,false,  () => {
              
                  if (foeHP <= 0) {
                    // Handle foe's defeat
                  } else {
                    setMenuState('main');
                   // Return to main menu after both attacks
                  }
                });
              }
            });
           
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