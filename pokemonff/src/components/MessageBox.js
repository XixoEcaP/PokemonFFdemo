import React, { useEffect, useRef } from 'react';
import battleBoxSrc from '../images/battlebox.png';  // Adjust the path as needed

const MessageBox = ({ message }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const battleBoxImage = new Image();
    
    battleBoxImage.src = battleBoxSrc;

    battleBoxImage.onload = () => {
      // Clear the canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the battle box image (positioned at the bottom)
      ctx.drawImage(battleBoxImage, 0, 2, 512, 96);

      // Display the message inside the box
      ctx.font = '16px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(message, 20, 50);  // Position message text at (20, 50)
    };
  }, [message]);

  return (
    <div style={{ position: 'absolute', bottom: '0', left: '0', zIndex: 1 }}>
      <canvas ref={canvasRef} width={512} height={96} />
    </div>
  );
};

export default MessageBox;


