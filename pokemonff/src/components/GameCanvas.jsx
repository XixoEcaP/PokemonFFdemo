import React, { useRef, useEffect, useState, useCallback } from 'react';
import map1Src from '../images/worldmap1.png';
import map2Src from '../images/house1.png'; 
import map3Src from '../images/house2.png'; 
import pokeballSrc from '../images/pokeball.png';
import playerSrc from '../images/player.png';
import auronSrc from '../images/characters/auron.png';
import MessageBox from './MessageBox';  // Assuming MessageBox is in the same folder
import vincentSrc from '../images/characters/vincent.png';
import squallSrc from '../images/characters/squall.png';
import chocoboSrc from '../images/characters/chocobo.png';
import moogleSrc from '../images/characters/moogle.png';
import cidSrc from '../images/characters/cid.png';

const tileSize = 32; // Tile size in pixels

const GameCanvas = ({ map, playerPosition, direction, frameIndex, events, setDirection, eventMessage, setEventMessage,stop,setStop,messages, messageIndex,setMessageIndex,setMessages,onInteract,onKeyPress, onKeyRelease }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 16;
  const canvasHeight = 12;
  const [manualFrameIndex, setManualFrameIndex] = useState(frameIndex); // Local frame index for debugging

  // Function to handle redrawing the canvas manually
  const redrawCanvas = useCallback(() => {

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const mapImage = new Image();
    const pokeballImage = new Image();
    const playerImage = new Image();
    const auronImage = new Image();
    const vincentImage = new Image();
    const squallImage = new Image();
    const chocoboImage = new Image();
    const cidImage = new Image();
    const moogleImage = new Image();

    if (map.id === 'map1') {
      mapImage.src = map1Src;
    } else if (map.id === 'map2') {
      mapImage.src = map2Src;
    } else if (map.id === 'map3') {
      mapImage.src = map3Src;
    }

    pokeballImage.src = pokeballSrc;
    playerImage.src = playerSrc;
    auronImage.src = auronSrc;
    chocoboImage.src = chocoboSrc;
    vincentImage.src = vincentSrc;
    squallImage.src = squallSrc;
    chocoboImage.src = chocoboSrc;
    cidImage.src = cidSrc;
    moogleImage.src = moogleSrc;


    const handleImageLoad = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const offsetX = Math.max(0, Math.min(playerPosition.x - Math.floor(canvasWidth / 2), map.tiles[0].length - canvasWidth)) * tileSize;
      const offsetY = Math.max(0, Math.min(playerPosition.y - Math.floor(canvasHeight / 2), map.tiles.length - canvasHeight)) * tileSize;

      // Draw the map
      context.drawImage(
        mapImage,
        offsetX, offsetY,
        canvasWidth * tileSize, canvasHeight * tileSize,
        0, 0, canvasWidth * tileSize, canvasHeight * tileSize
      );

      // Draw the Pokéballs if the events are active and the map is correct
      if (events.pokeballLevia?.isActive && map.id === 'map3') {
        const { x: eventX, y: eventY } = events.pokeballLevia.position;
        context.drawImage(
          pokeballImage,
          (eventX - offsetX / tileSize) * tileSize,
          ((eventY - offsetY / tileSize) * tileSize),
          tileSize, tileSize
        );
      }
      if (events.pokeballIfurito?.isActive && map.id === 'map3') {
        const { x: eventX, y: eventY } = events.pokeballIfurito.position;
        context.drawImage(
          pokeballImage,
          (eventX - offsetX / tileSize) * tileSize,
          ((eventY - offsetY / tileSize) * tileSize),
          tileSize, tileSize
        );
      }

      if (events.pokeballRam?.isActive && map.id === 'map3') {
        const { x: eventX, y: eventY } = events.pokeballRam.position;
        context.drawImage(
          pokeballImage,
          (eventX - offsetX / tileSize) * tileSize,
          ((eventY - offsetY / tileSize) * tileSize),
          tileSize, tileSize
        );
      }
      if (map.id === 'map1') {
        const { x: eventX, y: eventY } = events.auron.position;
        const auronCanvasX = (eventX - offsetX / tileSize) * tileSize;
        const auronCanvasY = ((eventY - offsetY / tileSize) * tileSize) - 16;
        context.drawImage(
          auronImage,
          manualFrameIndex * tileSize, 2 * 48, tileSize, 48,  // Frame and direction
          auronCanvasX, auronCanvasY,
          tileSize, 48
        );
      }

      // Draw Auron character in map1
      if (map.id === 'map1') {
   
        const vincentCanvasX = (48 - offsetX / tileSize) * tileSize;
        const vincentCanvasY = ((164 - offsetY / tileSize) * tileSize) - 16;
        context.drawImage(
          vincentImage,
          manualFrameIndex * tileSize, 0 * 48, tileSize, 48,  // Frame and direction
          vincentCanvasX, vincentCanvasY,
          tileSize, 48
        );
        const chocoboCanvasX1 = (54 - offsetX / tileSize) * tileSize;
        const chocoboCanvasY1 = ((209 - offsetY / tileSize) * tileSize) - 16;
        context.drawImage(
          chocoboImage,
          manualFrameIndex * tileSize, 1 * 48, tileSize, 48,  // Frame and direction
          chocoboCanvasX1, chocoboCanvasY1,
          tileSize, 48
        );
        const chocoboCanvasX2 = (41 - offsetX / tileSize) * tileSize;
        const chocoboCanvasY2 = ((156 - offsetY / tileSize) * tileSize) - 16;
        context.drawImage(
          chocoboImage,
          manualFrameIndex * tileSize, 3 * 48, tileSize, 48,  // Frame and direction
          chocoboCanvasX2, chocoboCanvasY2,
          tileSize, 48
        );
        const chocoboCanvasX3 = (43 - offsetX / tileSize) * tileSize;
        const chocoboCanvasY3 = ((156 - offsetY / tileSize) * tileSize) - 16;
        context.drawImage(
          chocoboImage,
          manualFrameIndex * tileSize, 3 * 48, tileSize, 48,  // Frame and direction
          chocoboCanvasX3, chocoboCanvasY3,
          tileSize, 48
        );
        const chocoboCanvasX4 = (45 - offsetX / tileSize) * tileSize;
        const chocoboCanvasY4 = ((156 - offsetY / tileSize) * tileSize) - 16;
        context.drawImage(
          chocoboImage,
          manualFrameIndex * tileSize, 3 * 48, tileSize, 48,  // Frame and direction
          chocoboCanvasX4, chocoboCanvasY4,
          tileSize, 48
        );
        const moogleCanvasX1 = (59 - offsetX / tileSize) * tileSize;
        const moogleCanvasY1 = ((140 - offsetY / tileSize) * tileSize) - 16;
        context.drawImage(
          moogleImage,
          manualFrameIndex * tileSize, 1 * 48, tileSize, 48,  // Frame and direction
          moogleCanvasX1, moogleCanvasY1,
          tileSize, 48
        );


      }
      if (map.id === 'map3') {
        const cidX = (7 - offsetX / tileSize) * tileSize;
        const cidY = ((7 - offsetY / tileSize) * tileSize) - 16;
        context.drawImage(
      cidImage,
          manualFrameIndex * tileSize, 0 * 48, tileSize, 48,  // Frame and direction
          cidX, cidY,
          tileSize, 48
        );
      }

      // Draw the player sprite with the correct frame and direction
      const playerCanvasX = (playerPosition.x - offsetX / tileSize) * tileSize;
      const playerCanvasY = ((playerPosition.y - offsetY / tileSize) * tileSize) - 16;
      context.drawImage(
        playerImage,
        manualFrameIndex * tileSize, direction * 48, tileSize, 48,  // Frame and direction
        playerCanvasX, playerCanvasY,
        tileSize, 48
      );
    };

    // Ensure images are loaded before drawing
    mapImage.onload = handleImageLoad;
    pokeballImage.onload = handleImageLoad;
    playerImage.onload = handleImageLoad;

    // If images are cached and loaded already, handleImageLoad needs to be called manually
    handleImageLoad();
  }, [map, playerPosition, direction, manualFrameIndex, events,messageIndex,messages,setMessages,setMessageIndex,onInteract]);

  useEffect(() => {
    redrawCanvas(); // Initial render
  }, [redrawCanvas]);

  // Key event to trigger redraw with frame change on arrow key press and clear the message
  useEffect(() => {
    const handleKeyDown = (e) => {
  

      switch (e.key) {
        case 'ArrowUp':
          if(stop){
            return
          }
          setDirection(3);  // Set direction for "up"
          break;
        case 'ArrowDown':
          if(stop){
            return
          }
          setDirection(0);  // Set direction for "down"
          break;
        case 'ArrowLeft':
          if(stop){
            return
          }
          setDirection(1);  // Set direction for "left"
          break;
        case 'ArrowRight':
          if(stop){
            return
          }
          setDirection(2);  // Set direction for "right"
          break;
          case 'x':
  
          if (messages && messages.length > -2) {
            console.log("aaaaaaa")
            const nextIndex = (messageIndex + 1) % messages.length;
            setMessageIndex(nextIndex);
            setEventMessage(messages[nextIndex]);
        
            // If the next message is empty, allow movement again
            if (messages[nextIndex] === '') {
              console.log("bbbbbb")
              setMessages([""]);
              setStop(false); // Allow movement again
              console.log(stop);
            }
          }
          {
            let interactX = Math.floor(playerPosition.x);
            let interactY = Math.floor(playerPosition.y);
    
            switch (direction) {
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
            onInteract(interactX, interactY); // Trigger interaction at adjusted position
            return;
          }
        
        
        default:
          return;  // Ignore other keys
      }

      // Cycle through frames for the current direction
      setManualFrameIndex((prevIndex) => (prevIndex + 1) % 4);
      redrawCanvas();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [redrawCanvas, eventMessage, setStop, setEventMessage,stop,messages,setMessages,onInteract,onKeyPress,onKeyRelease]);

  return (
    <div style={{ position: 'relative' }}>
      {/* Main game canvas */}
      <canvas ref={canvasRef} width={canvasWidth * tileSize} height={canvasHeight * tileSize} />

      {/* Display the event message using MessageBox */}
      {eventMessage && <MessageBox message={eventMessage} />}
    </div>
  );
};

export default GameCanvas;

  


















