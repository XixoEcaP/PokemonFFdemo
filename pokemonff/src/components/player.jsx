import React, { useState, useCallback, useEffect } from 'react';

const Player = ({ position, onMove, map, onInteract, onDirectionAndFrameChange, onPauseToggle, inBattle, isPaused,stop,setCurrentPokemonIndex,setStop}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0 = down, 1 = left, 2 = right, 3 = up

  const handleKeyDown = useCallback((e) => {
    if (stop) {
      console.log("palyerstopped");
      return; // Disable player movement during battle
    }
    if (inBattle) {
      console.log("In battle, player movement is paused");
      return; // Disable player movement during battle
    }

    let newX = position.x;
    let newY = position.y;
    let newDirection = direction;

    // Check for pause menu (space key)
    if (e.key === ' ') {
      setCurrentPokemonIndex(0);
      const newPauseState = !isPaused;
      console.log("Paused toggled:", newPauseState);
      onPauseToggle(newPauseState); // Inform the parent component about the pause state
      return; // Stop further processing if the game is paused
    }

    if (isPaused) {
      console.log("Game is paused, no action allowed");
      return;
    }

    // Player movement logic
    switch (e.key) {
      case 'ArrowUp':
        newY = Math.max(0, position.y - 1); // Move up by 0.5 units
        newDirection = 3; // Direction up
        break;
      case 'ArrowDown':
        newY = Math.min(map.tiles.length - 1, position.y + 1); // Move down by 0.5 units
        newDirection = 0; // Direction down
        break;
      case 'ArrowLeft':
        newX = Math.max(0, position.x - 1); // Move left by 0.5 units
        newDirection = 1; // Direction left
        break;
      case 'ArrowRight':
        newX = Math.min(map.tiles[0].length - 1, position.x + 1); // Move right by 0.5 units
        newDirection = 2; // Direction right
        break;
      case 'x': // Interact key
      case 'X': {
                      setStop(false); // Allow movement again

        let interactX = Math.floor(newX);
        let interactY = Math.floor(newY);

        switch (newDirection) {
          case 0: // Down
            interactY += 1;
            break;
          case 1: // Left
            interactX -= 1;

            break;
          case 2: // Right
            interactX += 1;
   
            break;
          case 3: // Up
       interactY -= 1;
            break;
        }
        console.log(direction);
        console.log(map.id);
        console.log(interactX,interactY);
        return;
      }
      default:
        return;
    }

    // Check if the player can move to the new position
    if (map.tiles[Math.floor(newY)] && map.tiles[Math.floor(newY)][Math.floor(newX)] !== 1) {
      setDirection(newDirection);
      setFrameIndex((prevIndex) => (prevIndex + 1) % 4); // Cycle through 4 frames

      // Pass the movement details back to the parent (for canvas update)
      onMove({ x: newX, y: newY, mapId: map.id }); // Include map ID in position object
      onDirectionAndFrameChange(newDirection, frameIndex);
    }

  }, [position, direction, map, onMove, onInteract, onDirectionAndFrameChange, frameIndex, isPaused, onPauseToggle, inBattle,stop]);

  // Attach and detach the event listener for key presses
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return null;
};

export default Player;

















