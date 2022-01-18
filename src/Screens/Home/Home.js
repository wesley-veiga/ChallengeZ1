import React from 'react';
import {StyleSheet, Image, Text} from 'react-native';
//componentes
import Button from '../../Components/Button/Button';
import Container from '../../Components/Container/Container';

const Home = ({navigation}) => {
  return (
    <Container backgroundColor={'#f9e48b'}>
      <Text style={styles.title}>Pokédex</Text>
      <Image
        source={require('../../Assets/homeimage.png')}
        style={styles.image}
      />
      <Button
        onPress={() => navigation.navigate('Pokemons')}
        title={'Listar Pokémons'}
        backgroundColor={'#8bf98c'}
        titleColor={'#000'}
      />
      <Button
        onPress={() => navigation.navigate('Team')}
        title={'Equipe'}
        backgroundColor={'#8ba0f9'}
        titleColor={'#000'}
      />
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontSize: 70,
    position: 'absolute',
    top: '45%',
    zIndex: 1,
    left: 30,
    letterSpacing: 7,
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  image: {
    flex: 2,
    width: '90%',
    height: '50%',
    resizeMode: 'contain',
    top: 50,
    left: 150,
  },
});
