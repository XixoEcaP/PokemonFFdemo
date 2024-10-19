import pokemons from './pokemonData';  // Correct import of pokemons

// Experience required for each level
export const levelExp = [
  0, 8, 19, 37, 61, 91, 127, 169, 217, 271, 331, 397, 469, 547, 631, 
  721, 817, 919, 1027, 1141, 1261, 1387, 1519, 1657, 1801, 
  1951, 2107, 2269, 2437, 2611, 2791, 2977, 3169, 3367, 3571, 
  3781, 3997, 4219, 4447, 4681, 4921, 5167, 5419, 5677, 5941, 
  6211, 6487, 6769, 7057, 7351, 7651, 7957, 8269, 8587, 8911, 
  9241, 9577, 9919, 10267, 10621, 10981, 11347, 11719, 12097, 
  12481, 12871, 13267, 13669, 14077, 14491, 14911, 15337, 
  15769, 16207, 16651, 17101, 17557, 18019, 18487, 18961, 
  19441, 19927, 20419, 20917, 21421, 21931, 22447, 22969, 
  23497, 24031, 24571, 25117, 25669, 26227, 26791, 27361, 
  27937, 28519, 29107, 29701
];

// Update the stats when leveling up
const updateStatsOnLevelUp = (pokemon) => {
  const baseStats = pokemons[pokemon.name];  // Get base stats from the pokemonData file

  // Assuming that max HP and other stats increase based on level
  pokemon.maxHp = baseStats.hp + pokemon.level * 2;
  // Set current HP to max HP on level up
};

// Check if the Pokémon should level up
export const checkLevelUp = (pokemon, setTeam, currentPokemonIndex) => {
  const { level, experience } = pokemon;

  if (experience >= levelExp[level]) {
    pokemon.level += 1;
    pokemon.experience = 0;

    console.log(`${pokemon.name} leveled up to level ${pokemon.level}!`);

    // Update stats after leveling up
    updateStatsOnLevelUp(pokemon);
    if (pokemon.Evolutions || pokemon.Evolutions.length > 0) {
    if (pokemon.level === pokemon.Evolutions[1]) {
      evolvePokemon(pokemon);
    }
  }
    setTeam(prevTeam => {
      const updatedTeam = [...prevTeam];
      updatedTeam[currentPokemonIndex] = { ...pokemon };
      return updatedTeam;
    });
  }
};

// Handle Pokémon evolution
export const evolvePokemon = (pokemon) => {
  // Check if the Pokémon has an Evolutions array and it's not empty
  if (!pokemon.Evolutions || pokemon.Evolutions.length === 0) {
    return;  // Exit the function if no evolution exists
  }

  // Find the evolved form in pokemonData
  const evolutionName = pokemon.Evolutions[0];
  console.log(`${pokemon.name} is evolving into ${evolutionName}!`);

  // Convert the pokemons object to an array of values
  const evolvedPokemon = Object.values(pokemons).find(p => p.name === evolutionName);

  if (evolvedPokemon) {
    // Copy all properties from the evolved Pokémon object to the current Pokémon
    Object.assign(pokemon, evolvedPokemon);
    updateStatsOnLevelUp(pokemon);  // Assuming you have this function to handle stat updates
  } else {
    console.error(`Evolved Pokémon ${evolutionName} not found in pokemonData!`);
  }
};


  