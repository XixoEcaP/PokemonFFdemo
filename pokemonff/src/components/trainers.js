
import pokemons from './pokemonData';  // Correct import of pokemons
export const trainerTeam = [
  { ...pokemons.Levia, level: 1, currentHP: pokemons.Levia.hp, maxHp: pokemons.Levia.hp },
  { ...pokemons.Ram, level: 1, currentHP: pokemons.Ram.hp, maxHp: pokemons.Ram.hp }
];