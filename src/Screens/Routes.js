import React from 'react';
//React-navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import Home from './Home';
import Pokemons from './Pokemons';
import Pokemon from './Pokemon';
import Team from './Team';

const Routes = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Pokemons" component={Pokemons} />
        <Stack.Screen name="Pokemon" component={Pokemon} />
        <Stack.Screen name="Team" component={Team} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
