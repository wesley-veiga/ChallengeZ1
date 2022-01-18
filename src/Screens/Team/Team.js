import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../Components/Button';
//Components
import Container from '../../Components/Container';
import {removePokemon} from '../../Redux/PokemonReducer/PokemonReducer';
//utils
import {capitalize} from '../../Utils/capitalize';

const Team = ({navigation}) => {
  const dispatch = useDispatch();

  //Pegando a lista de pokemons guardados no reducer
  const team = useSelector(store => store.PokemonReducer.list_pokemon);

  //Renderiza os itens da flatlist
  const _renderTeam = ({item}) => (
    <View style={styles.pokemonCardContainer}>
      <View style={styles.pokemonCardNameContainer}>
        <Text style={styles.pokemonCardNameText}>{capitalize(item.name)}</Text>
        {item.sprites && item.sprites.front_default && (
          <Image
            source={{uri: item.sprites.front_default}}
            style={styles.pokemonImage}
          />
        )}
      </View>
      <View style={styles.pokemonCardButtonContainer}>
        <Button
          title={'Remover'}
          containerStyle={{width: 150, height: 50}}
          backgroundColor={'red'}
          onPress={() => dispatch(removePokemon(item))}
        />
        <Button
          title={'Detalhes'}
          containerStyle={{width: 150, height: 50}}
          backgroundColor={'#8ba0f9'}
          onPress={() => {
            navigation.navigate('Pokemon', {
              pokemon: item,
              fromTeam: true,
            });
          }}
        />
      </View>
    </View>
  );

  //Caso não houver nenhum pokemon na lista, renderiza esse aviso ao usuário
  const _renderEmptyData = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Não há nenhum{'\n'}
          Pokémon na sua equipe,{'\n'}
          Vá e capture alguns Pokémons.
        </Text>
        <Image
          source={require('../../Assets/teamNoData.png')}
          style={styles.emptyImage}
        />
      </View>
    );
  };

  //Renderizando o cabeçalho do flatlist.
  const _renderHeader = () => {
    return (
      <View style={{marginTop: 10, marginLeft: 30}}>
        <Text
          style={{
            fontSize: 50,
            letterSpacing: 7,
          }}>
          Minha{'\n'}Pokédex
        </Text>
        <Text>Total: {team.length}</Text>
      </View>
    );
  };

  return (
    <Container>
      <FlatList
        data={team}
        renderItem={_renderTeam}
        ListHeaderComponent={_renderHeader}
        ListEmptyComponent={_renderEmptyData}
      />
    </Container>
  );
};

export default Team;

const styles = StyleSheet.create({
  pokemonCardContainer: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#CCC',
    marginVertical: 15,
    borderRadius: 7,
    width: '90%',
    minHeight: 100,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  pokemonCardNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  pokemonCardNameText: {
    fontSize: 30,
  },
  pokemonCardButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    marginHorizontal: 30,
    marginVertical: 50,
  },
  emptyText: {
    fontSize: 20,
  },
  emptyImage: {
    width: 200,
    resizeMode: 'contain',
    height: 200,
    alignSelf: 'flex-end',
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
    resizeMode: 'contain',
  },
});
