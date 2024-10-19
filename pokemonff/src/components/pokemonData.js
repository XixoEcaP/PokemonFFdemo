import moves from './moveData';  // Import moves from moveData

const pokemons = {
  Levia: {
    name: 'Levia',
    type: ['Water'],
    experience: 0,
    hp: 39,
    attack: 50,
    defense: 50,
    specialAttack: 60,
    specialDefense: 59,
    speed: 62,
    moves: [moves.attackMove, moves.waterMove],
    sprites: {
      front: require('../images/pokemons/levia.png'),
      back: require('../images/pokemons/leviaback.png')
    },
    Evolutions: ['Leviata', 10],  // Evolves into Leviata at level 10
  },
  Leviata: {
    name: 'Leviata',
    type: ['Water', 'Flying'],
    experience: 0,
    hp: 59,
    attack: 64,
    defense: 58,
    specialAttack: 80,
    specialDefense: 64,
    speed: 80,
    moves: [moves.attackMove, moves.waterMove,moves.aeroMove,moves.wateraMove],
    sprites: {
      front: require('../images/pokemons/leviata.png'),
      back: require('../images/pokemons/leviataback.png')
    },
    Evolutions: ['Leviathan', 15],
  },
  Leviathan: {
    name: 'Leviathan',
    type: ['Water', 'Flying'],
    experience: 0,
    hp: 80,
    attack: 85,
    defense: 80,
    specialAttack: 100,
    specialDefense: 85,
    speed: 100,
    moves: [moves.attackMove,moves.wateraMove,moves.tidalWaveMove,moves.aeroraMove],
    sprites: {
      front: require('../images/pokemons/leviathan.png'),
      back: require('../images/pokemons/leviathanback.png')
    }
  },
  Ram: {
    name: 'Ram',
    type: ['Electric'],
    experience: 0,
    hp: 41,
    attack: 48,
    defense: 49,
    specialAttack: 65,
    specialDefense: 63,
    speed: 54,
    moves: [moves.attackMove, moves.thunderMove],
    sprites: {
      front: require('../images/pokemons/ram.png'),
      back: require('../images/pokemons/ramback.png')
    },
    Evolutions: ['Indra', 10]  // Evolves into Indra at level 10
  },
  Indra: {
    name: 'Indra',
    type: ['Thunder', 'Psychic'],
    experience: 0,
    hp: 58,
    attack: 60,
    defense: 63,
    specialAttack: 80,
    specialDefense: 80,
    speed: 64,
    moves: [moves.attackMove, moves.thunderMove,moves.thundaraMove,moves.energyRayMove],
    sprites: {
      front: require('../images/pokemons/indra.png'),
      back: require('../images/pokemons/indraback.png')
    },
    Evolutions: ['Ramuh', 15],
  },
  Ramuh: {
    name: 'Ramuh',
    type: ['Thunder', 'Psychic'],
    experience: 0,
    hp: 80,
    attack: 75,
    defense: 75,
    specialAttack: 110,
    specialDefense: 100,
    speed: 90,
    moves: [moves.attackMove,moves.judgmentBoltMove,moves.mindBlastMove,moves.thundaraMove],
    sprites: {
      front: require('../images/pokemons/ramuh.png'),
      back: require('../images/pokemons/ramuhback.png')
    }
  },
  Ifurito: {
    name: 'Ifurito',
    type: ['Fire', 'Ground'],
    experience: 0,
    hp: 45,
    attack: 57,
    defense: 58,
    specialAttack: 54,
    specialDefense: 57,
    speed: 49,
    moves: [moves.attackMove, moves.fireMove],
    sprites: {
      front: require('../images/pokemons/ifurito.png'),
      back: require('../images/pokemons/ifuritoback.png')
    },
    Evolutions: ['Iflyte', 10]  // Evolves into Iflyte at level 10
  },
  Iflyte: {
    name: 'Iflyte',
    type: ['Fire', 'Ground'],
    experience: 0,
    hp: 60,
    attack: 80,
    defense: 80,
    specialAttack: 61,
    specialDefense: 64,
    speed: 60,
    moves: [moves.attackMove, moves.fireMove,moves.quakeMove,moves.firaMove],
    sprites: {
      front: require('../images/pokemons/iflyte.png'),
      back: require('../images/pokemons/iflyteback.png')
    },
    Evolutions: ['Ifrit', 15],
  },
  Ifrit: {
    name: 'Ifrit',
    type: ['Fire', 'Ground'],
    experience: 0,
    hp: 80,
    attack: 105,
    defense: 100,
    specialAttack: 80,
    specialDefense: 80,
    speed: 85,
    moves: [moves.attackMove,moves.firaMove,moves.quakejaMove,moves.gravityMove],
    sprites: {
      front: require('../images/pokemons/ifrit.png'),
      back: require('../images/pokemons/ifritback.png')
    }
  },
  Snatch: {
    name: 'Snatch',
    type: ['Normal'],
    experience: 0,
    hp: 30,
    attack: 56,
    defense: 35,
    specialAttack: 25,
    specialDefense: 34,
    speed: 35,
    moves: [moves.attackMove,moves.ruinMove],
    sprites: {
      front: require('../images/pokemons/snatch.png'),
      back: require('../images/pokemons/snatchback.png')
    },
    Evolutions: ['Bandersnatch', 10],
  },
  Bandersnatch: {
    name: 'Bandersnatch',
    type: ['Normal'],
    experience: 0,
    hp: 65,
    attack: 85,
    defense: 65,
    specialAttack: 50,
    specialDefense: 65,
    speed: 85,
    moves: [moves.attackMove,moves.ruinMove,moves.ruingaMove],
    sprites: {
      front: require('../images/pokemons/bandersnatch.png'),
      back: require('../images/pokemons/bandersnatchback.png')
    }
  },
  Coeurl: {
    name: 'Coeurl',
    type: ['Thunder'],
    experience: 0,
    hp: 35,
    attack: 52,
    defense: 48,
    specialAttack: 65,
    specialDefense: 50,
    speed: 55,
    moves: [moves.attackMove,moves.thunderMove],
    sprites: {
      front: require('../images/pokemons/coeurl.png'),
      back: require('../images/pokemons/coeurlback.png')
    },
    Evolutions: ['Coeurlregina', 10],
  },
  Coeurlregina: {
    name: 'Coeurlregina',
    type: ['Thunder'],
    experience: 0,
    hp: 65,
    attack: 70,
    defense: 65,
    specialAttack: 90,
    specialDefense: 75,
    speed: 100,
    moves: [moves.attackMove,moves.thunderMove,moves.thundaraMove,moves.ruinMove],
    sprites: {
      front: require('../images/pokemons/coeurlregina.png'),
      back: require('../images/pokemons/coeurlreginaback.png')
    }
  },
  Bomb: {
    name: 'Bomb',
    type: ['Fire', 'Rock'],
    experience: 0,
    hp: 40,
    attack: 55,
    defense: 95,
    specialAttack: 30,
    specialDefense: 120,
    speed: 80,
    moves: [moves.attackMove,moves.fireMove,moves.gravityMove],
    sprites: {
      front: require('../images/pokemons/bomb.png'),
      back: require('../images/pokemons/bombback.png')
    }
  },
  Goblin: {
    name: 'Goblin',
    type: ['Normal'],
    experience: 0,
    hp: 30,
    attack: 60,
    defense: 40,
    specialAttack: 40,
    specialDefense: 50,
    speed: 60,
    moves: [moves.attackMove,moves.goblinPunchMove],
    sprites: {
      front: require('../images/pokemons/goblin.png'),
      back: require('../images/pokemons/goblinback.png')
    },
    Evolutions: ['Hobgoblin', 10],
  },
  Hobgoblin: {
    name: 'Hobgoblin',
    type: ['Normal', 'Fighting'],
    experience: 0,
    hp: 75,
    attack: 95,
    defense: 60,
    specialAttack: 60,
    specialDefense: 65,
    speed: 70,
    moves: [moves.attackMove,moves.goblinPunchMove,moves.needleMove],
    sprites: {
      front: require('../images/pokemons/hobgoblin.png'),
      back: require('../images/pokemons/hobgoblinback.png')
    },
   
  },
  Morbol: {
    name: 'Morbol',
    type: ['Poison'],
    experience: 0,
    hp: 35,
    attack: 75,
    defense: 35,
    specialAttack: 70,
    specialDefense: 30,
    speed: 40,
    moves: [moves.attackMove,moves.maelstromMove],
    sprites: {
      front: require('../images/pokemons/morbol.png'),
      back: require('../images/pokemons/morbolback.png')
    },
    Evolutions: ['Leviathan', 10],
  },
  Malboro: {
    name: 'Malboro',
    type: ['Poison'],
    experience: 0,
    hp: 65,
    attack: 90,
    defense: 50,
    specialAttack: 85,
    specialDefense: 50,
    speed: 55,
    moves: [moves.attackMove,moves.maelstromMove,moves.needleMove],
    sprites: {
      front: require('../images/pokemons/malboro.png'),
      back: require('../images/pokemons/malboroback.png')
    },
    Evolutions: ['G. Malboro', 15],
  },
  GMalboro: {
    name: 'G. Malboro',
    type: ['Poison'],
    experience: 0,
    hp: 80,
    attack: 105,
    defense: 80,
    specialAttack: 105,
    specialDefense: 80,
    speed: 70,
    moves: [moves.attackMove,moves.badBreathMove,moves.poisonClawMove,moves.leafSwirlMove],
    sprites: {
      front: require('../images/pokemons/gmalboro.png'),
      back: require('../images/pokemons/gmalboroback.png')
    }
  },
  Hecteyes: {
    name: 'Hecteyes',
    type: ['Poison', 'Dark'],
    experience: 0,
    hp: 50,
    attack: 70,
    defense: 70,
    specialAttack: 70,
    specialDefense: 70,
    speed: 70,
    moves: [moves.attackMove,moves.demonEyeMove,moves.poisonClawMove,moves.ruinMove],
    sprites: {
      front: require('../images/pokemons/hecteyes.png'),
      back: require('../images/pokemons/hecteyesback.png')
    }
  },
  Flan: {
    name: 'Flan',
    type: ['Poison', 'Psychic'],
    experience: 0,
    hp: 40,
    attack: 25,
    defense: 85,
    specialAttack: 70,
    specialDefense: 40,
    speed: 45,
    moves: [moves.attackMove,moves.ruinMove,moves.maelstromMove],
    sprites: {
      front: require('../images/pokemons/flan.png'),
      back: require('../images/pokemons/flanback.png')
    },
    Evolutions: ['Giant Flan', 10],
  },
  GiantFlan: {
    name: 'Giant Flan',
    type: ['Poison', 'Psychic'],
    experience: 0,
    hp: 80,
    attack: 50,
    defense: 115,
    specialAttack: 95,
    specialDefense: 75,
    speed: 65,
    moves: [moves.attackMove,moves.ruinMove,moves.mindBlastMove,moves.maelstromMove],
    sprites: {
      front: require('../images/pokemons/giantflan.png'),
      back: require('../images/pokemons/giantflanback.png')
    }
  },
  OneEye: {
    name: 'One Eye',
    type: ['Dark', 'Flying'],
    experience: 0,
    hp: 45,
    attack: 68,
    defense: 51,
    specialAttack: 42,
    specialDefense: 55,
    speed: 67,
    moves: [moves.attackMove,moves.demonEyeMove],
    sprites: {
      front: require('../images/pokemons/oneeye.png'),
      back: require('../images/pokemons/oneeyeback.png')
    },
    Evolutions: ['Ahriman', 10],
  },
  Ahriman: {
    name: 'Ahriman',
    type: ['Dark', 'Flying'],
    experience: 0,
    hp: 65,
    attack: 105,
    defense: 65,
    specialAttack: 65,
    specialDefense: 80,
    speed: 115,
    moves: [moves.attackMove,moves.demonEyeMove,moves.aeroMove,moves.needleMove],
    sprites: {
      front: require('../images/pokemons/ahriman.png'),
      back: require('../images/pokemons/ahrimanback.png')
    }
  },
   Hemoth : {
    name: 'Hemoth',
    type: ['Ground'],
    experience: 0,
    hp: 45,
    attack: 54,
    defense: 55,
    specialAttack: 60,
    specialDefense: 57,
    speed: 49,
    moves: [moves.attackMove,moves.maelstromMove,moves.quakeMove],
    sprites: {
      front: require('../images/pokemons/hemoth.png'),
      back: require('../images/pokemons/hemothback.png'),
    },
    Evolutions: ['Humbaba', 10],
  },
  
   Humbaba : {
    name: 'Humbaba',
    type: ['Ground'],
    experience: 0,
    hp: 60,
    attack: 80,
    defense: 75,
    specialAttack: 66,
    specialDefense: 64,
    speed: 60,
    moves: [moves.attackMove,moves.maelstromMove,moves.quakeMove,moves.quakejaMove],
    sprites: {
      front: require('../images/pokemons/humbaba.png'),
      back: require('../images/pokemons/humbababack.png'),
    },
    Evolutions: ['Behemoth', 15],
  },
  
   Behemoth : {
    name: 'Behemoth',
    type: ['Ground', 'Dark'],
    experience: 0,
    hp: 80,
    attack: 105,
    defense: 95,
    specialAttack: 85,
    specialDefense: 85,
    speed: 70,
    moves: [moves.attackMove,moves.behemothHornMove,moves.quakejaMove,moves.maelstromMove],
    sprites: {
      front: require('../images/pokemons/behemoth.png'),
      back: require('../images/pokemons/behemothback.png'),
    }
  },
};

export default pokemons;


  