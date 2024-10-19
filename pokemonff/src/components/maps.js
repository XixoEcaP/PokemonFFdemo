// maps.js
// maps.js
// maps.js
// maps.js
export const worldmap1 = {
    id: 'worldmap1',
    dimensions: { width: 64, height: 216 / 32 }, // Set dimensions based on the world map
    tiles: Array.from({ length: 216 / 32 }, () => Array(64).fill(0)), // Fill with your actual map data
  };
  
  export const map1 = {
    id: 'map1',
    dimensions: { width: 32, height: 24 }, // Portion of the world map
    tiles: Array.from({ length: 24 }, () => Array(32).fill(0)), // Tile data; can be modified as needed
  };
  
  // Function to get the map based on ID
  export const getCurrentMap = (currentMapId) => {
    const maps = { map1, worldmap1 }; // Include maps here
  
    if (maps[currentMapId]) {
      return maps[currentMapId]; // Return the found map
    }
  
    console.warn(`Map with ID ${currentMapId} not found. Returning null.`);
    return null; // Return null or handle as needed
  };
  
  
  
  