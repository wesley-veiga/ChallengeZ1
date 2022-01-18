import {createStore, combineReducers} from 'redux';
import {PokemonReducer} from './PokemonReducer';

const PokemonStore = createStore(
  combineReducers({
    PokemonReducer,
  }),
);

export default PokemonStore;
