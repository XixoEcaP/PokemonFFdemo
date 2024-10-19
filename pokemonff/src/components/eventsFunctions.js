import App from "../App";
export const checkTile = (App,newPosition) => {
    // Find the evolved form in pokemonData
      if (App.currentMap.tiles[newPosition.y][newPosition.x] === 3) { 
        console.log(App.playerPosition);
        App.setTrainerTeam(App.trainerTeam2);
       App.setFoePokemon(App.trainerTeam2[0])  // Start with the trainer's first Pokémon
       App.handleTrainerBattle();
      
     
   
        map1.tiles[191][43] = 0;
        
       
      }
  };