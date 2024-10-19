import React, { useEffect } from 'react';

const StopHandler = ({ setStop }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'x') {
        setStop(prev => !prev); // Toggles the stop state on each press of 'x'
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setStop]);

  return null; // No UI component, just logic for stop toggling
};

export default StopHandler;
