import React, { useState } from 'react';
import './style.css'; // Ensure this file contains the CSS adjustments we made
import Game from './Game'; // Import your Game component

const App = () => {
    const [pressedKey, setPressedKey] = useState(null);

    const handleKeyPress = (key) => {
        console.log(`Button pressed: ${key}`);
        setPressedKey(key);
        const event = new KeyboardEvent('keydown', { key });
        window.dispatchEvent(event);
    };

    const handleKeyRelease = (key) => {
        const event = new KeyboardEvent('keyup', { key });
        window.dispatchEvent(event);
        setPressedKey(null);
    };

    return (
        <div className="system-container" id="gbasp">
            <div className="screen-body">
                <div className="screen-border">
                    <div className="screen">
                        <Game />
                    </div>
                </div>
            </div>
            <div className="gamepad-body">
                <div className="pad-container dpad-container">
                    <div className="d-pad">
                        <button
                            className="dpad-button up"
                            onMouseDown={() => handleKeyPress('ArrowUp')}
                            onMouseUp={() => handleKeyRelease('ArrowUp')}
                        >↑</button>
                        <button
                            className="dpad-button down"
                            onMouseDown={() => handleKeyPress('ArrowDown')}
                            onMouseUp={() => handleKeyRelease('ArrowDown')}
                        >↓</button>
                        <button
                            className="dpad-button left"
                            onMouseDown={() => handleKeyPress('ArrowLeft')}
                            onMouseUp={() => handleKeyRelease('ArrowLeft')}
                        >←</button>
                        <button
                            className="dpad-button right"
                            onMouseDown={() => handleKeyPress('ArrowRight')}
                            onMouseUp={() => handleKeyRelease('ArrowRight')}
                        >→</button>
                    </div>
                </div>
                <div className="buttons-container">
                <button
                        className="a-button"
                        onMouseDown={() => handleKeyPress('x')}
                        onMouseUp={() => handleKeyRelease('x')}
                    >A</button>
                    <button
                        className="b-button"
                        onMouseDown={() => handleKeyPress('z')}
                        onMouseUp={() => handleKeyRelease('z')}
                    >B</button>
                    
                </div>
                {/* Start Button */}
                <div className="start-container">
                    <button
                        className="start-button"
                        onMouseDown={() => handleKeyPress(' ')}
                        onMouseUp={() => handleKeyRelease(' ')}
                    >Start</button>
                </div>
            </div>
        </div>
    );
};

export default App;




