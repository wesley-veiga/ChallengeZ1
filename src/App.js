import React from 'react';
import Routes from './Screens/Routes';
import {Provider} from 'react-redux';
import PokemonStore from './Redux';

const App = () => {
  return (
    <Provider store={PokemonStore}>
      <Routes />
    </Provider>
  );
};

export default App;
