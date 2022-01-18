//Types
const Types = {
  ADD_POKEMON: 'pokemon/ADD_POKEMON',
  REMOVE_POKEMON: 'pokemon/REMOVE_POKEMON',
  CLEAR_POKEMON: 'pokemon/CLEAR_POKEMON',
};

//Reducers
const INITIAL_STATE = {
  list_pokemon: [],
};

export const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.ADD_POKEMON:
      return {
        ...state,
        list_pokemon: [...state.list_pokemon, action.payload],
      };
    case Types.REMOVE_POKEMON:
      return {
        ...state,
        list_pokemon: [
          ...state.list_pokemon.filter(f => f.id !== action.payload.id),
        ],
      };
    case Types.CLEAR_POKEMON:
      return {
        ...state,
        list_pokemon: [],
      };
    default:
      return state;
  }
};

//Actions
//Adiciona um novo pokemon na lista
export const addPokemon = pokemon => ({
  type: Types.ADD_POKEMON,
  payload: pokemon,
});

//Remove um pokemon da lista
export const removePokemon = pokemon => ({
  type: Types.REMOVE_POKEMON,
  payload: pokemon,
});

//Limpa a lista, removendo todos os pokemons
export const clearPokemon = () => ({
  type: Types.CLEAR_POKEMON,
});
