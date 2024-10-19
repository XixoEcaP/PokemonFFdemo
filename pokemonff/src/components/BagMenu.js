// BagMenu.js
import React from 'react';

const BagMenu = ({ items, selectedBagItem, setSelectedBagItem }) => {
  return (
    <div style={{ padding: '2px', color: 'white', fontSize: '7px' }}>
      {items.map((item, index) => (
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
            {selectedBagItem === index ? '=> ' : ''}{item.name} (x{item.count})
          </div>
        </div>
      ))}
      <div style={{ marginTop: '0px' }}>Press 'z' to go back</div>
    </div>
  );
};

export default BagMenu;
