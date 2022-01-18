import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
//Actions
import {
  addPokemon,
  removePokemon,
} from '../../Redux/PokemonReducer/PokemonReducer';
//Componentes
import Container from '../../Components/Container';
import Button from '../../Components/Button';
//utils
import {capitalize} from '../../Utils/capitalize';

const Pokemon = ({route, navigation}) => {
  const dispatch = useDispatch();

  //Pegando a lista de pokemons guardados no reducer
  const team = useSelector(store => store.PokemonReducer.list_pokemon);

  //Pegando os parâmetros passados ao trocar de tela.
  const {pokemon, fromTeam} = route.params;

  console.log(fromTeam);
  //Informações do pokemon guardadas no estado.
  const [pokemonDetails, setPokemonDetails] = useState({
    loading: true,
    error: false,
    pokemon: [],
  });

  //Função que busca os detalhes caso venha da lista de pokemons, ou insere os detalhes
  //caso vier da equipe
  const getDetails = () => {
    if (fromTeam) {
      console.log(' estou aqui : ', fromTeam);
      setPokemonDetails({...pokemonDetails, pokemon: pokemon, loading: false});
    } else {
      setPokemonDetails({...pokemonDetails, loading: true});
      fetch(pokemon.url)
        .then(res => res.json())
        .then(res => {
          console.log('res', res);
          setPokemonDetails({
            ...pokemonDetails,
            loading: false,
            pokemon: res,
          });
        })
        .catch(ex => {
          setPokemonDetails({
            ...pokemonDetails,
            loading: false,
            error: true,
            pokemon: [],
          });
        });
    }
  };

  //Função para salvar o pokemon na equipe.
  const savePokemon = () => {
    const pokemonSelected = pokemonDetails.pokemon;
    if (team.findIndex(f => f.id == pokemonSelected.id) != -1) {
      Alert.alert('Ops!', 'Esse pokémon já foi capturado!');
    } else {
      dispatch(addPokemon(pokemonSelected));
      Alert.alert('Eba!', 'Pokémon capturado com sucesso!');
    }
  };

  //Função para remover o pofemon da equipe
  const deletePokemon = () => {
    const remove = () => {
      dispatch(removePokemon(pokemonDetails.pokemon));
      navigation.goBack();
    };

    return Alert.alert('Atenção', 'Deseja remover o pokémon da sua equipe?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => remove(),
      },
    ]);
  };

  //Coleta as informações do pokemon (caso venha da lista de pokemons) ao abrir a tela.
  useFocusEffect(
    React.useCallback(() => {
      getDetails();
    }, []),
  );

  //criando um alias para facilitar acesso as informações do pokemon
  const pokemonInfo = pokemonDetails.pokemon;

  //Renderiza as habilidades do pokemon
  const _renderAbilities = () => {
    return pokemonInfo.abilities?.length > 0 ? (
      <Text style={styles.infoText}>
        {pokemonInfo.abilities.map((item, index) => [
          capitalize(item.ability.name),
          index < pokemonInfo.abilities?.length - 1 && ', ',
        ])}
      </Text>
    ) : (
      <Text style={styles.infoText}>Nenhuma habilidade</Text>
    );
  };

  //Renderiza as fotos do pokemon
  const _renderSprites = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        horizontal>
        {pokemonInfo.sprites && pokemonInfo.sprites.front_default && (
          <Image
            source={{uri: pokemonInfo.sprites.front_default}}
            style={styles.pokemonImage}
          />
        )}
        {pokemonInfo.sprites && pokemonInfo.sprites.front_female && (
          <Image
            source={{uri: pokemonInfo.sprites.front_female}}
            style={styles.pokemonImage}
          />
        )}
        {pokemonInfo.sprites && pokemonInfo.sprites.front_shiny && (
          <Image
            source={{uri: pokemonInfo.sprites.front_shiny}}
            style={styles.pokemonImage}
          />
        )}
        {pokemonInfo.sprites && pokemonInfo.sprites.front_shiny_female && (
          <Image
            source={{uri: pokemonInfo.sprites.front_shiny_female}}
            style={styles.pokemonImage}
          />
        )}
        {pokemonInfo.sprites && pokemonInfo.sprites.back_default && (
          <Image
            source={{uri: pokemonInfo.sprites.back_default}}
            style={styles.pokemonImage}
          />
        )}
        {pokemonInfo.sprites && pokemonInfo.sprites.back_female && (
          <Image
            source={{uri: pokemonInfo.sprites.back_female}}
            style={styles.pokemonImage}
          />
        )}
        {pokemonInfo.sprites && pokemonInfo.sprites.back_shiny && (
          <Image
            source={{uri: pokemonInfo.sprites.back_shiny}}
            style={styles.pokemonImage}
          />
        )}
        {pokemonInfo.sprites && pokemonInfo.sprites.back_shiny_female && (
          <Image
            source={{uri: pokemonInfo.sprites.back_shiny_female}}
            style={styles.pokemonImage}
          />
        )}
      </ScrollView>
    );
  };

  //renderiza os tipos do pokemon
  const _renderTypes = () => {
    return pokemonInfo.types?.length > 0 ? (
      <Text style={styles.infoText}>
        {pokemonInfo.types.map((item, index) => [
          capitalize(item.type.name),
          index < pokemonInfo.types?.length - 1 && ', ',
        ])}
      </Text>
    ) : (
      <Text style={styles.infoText}>Nenhum tipo</Text>
    );
  };

  //renderiza os cards das outras informações
  const _renderOthers = () => {
    return pokemonInfo.stats?.length > 0 ? (
      <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        horizontal>
        {pokemonInfo.stats.map((item, index) => [
          <View key={index} style={styles.pokemonStatusContainer}>
            <Text style={styles.pokemonStatusNumber}>{item.base_stat}</Text>
            <Text>{capitalize(item.stat.name)}</Text>
          </View>,
        ])}
      </ScrollView>
    ) : (
      <Text style={styles.infoText}>
        Nenhuma informação adicional disponível
      </Text>
    );
  };

  //Renderiza o card vermelho com as informações da equipe
  const _renderPokedexInfo = () => {
    return (
      <View style={styles.pokedexInfoContainer}>
        <Text style={styles.pokedexNumberText(team.length)}>
          {team.length == 0 ? 'Nenhum' : team.length}
        </Text>
        <Text style={styles.pokedexText}>
          Pokémon{team.length > 1 && 's'}
          {'\n'}capturado{team.length > 1 && 's'}
        </Text>
      </View>
    );
  };

  return (
    <Container>
      {pokemonDetails.loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <>
          <ScrollView style={styles.infoContainer}>
            {_renderPokedexInfo()}
            <Text style={styles.pokemonName}>
              {capitalize(pokemonInfo.name)}
            </Text>
            <Text style={styles.pokemonInfoTitle}>Imagens:</Text>
            {_renderSprites()}
            <Text style={styles.pokemonInfoTitle}>Habilidades:</Text>
            {_renderAbilities()}
            <Text style={styles.pokemonInfoTitle}>
              Tipo{pokemonInfo.types?.length > 0 && 's'}:
            </Text>
            {_renderTypes()}
            <Text style={styles.pokemonInfoTitle}>Espécie:</Text>
            <Text style={styles.infoText}>
              {capitalize(pokemonInfo.species.name)}
            </Text>
            <Text style={styles.pokemonInfoTitle}>Outras informações:</Text>
            {_renderOthers()}
          </ScrollView>
          <Button
            backgroundColor={fromTeam && 'red'}
            onPress={fromTeam ? () => deletePokemon() : () => savePokemon()}
            title={fromTeam ? 'Remover' : 'Capturar'}
          />
        </>
      )}
    </Container>
  );
};

export default Pokemon;

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  pokemonName: {
    fontSize: 50,
  },
  pokemonInfoTitle: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 10,
  },
  infoText: {
    flexWrap: 'wrap',
    fontSize: 20,
    color: '#000',
  },
  pokemonImage: {
    marginTop: 10,
    width: 200,
    height: 200,
    borderWidth: 0.5,
    borderColor: '#CCC',
    marginHorizontal: 5,
    borderRadius: 7,
    backgroundColor: '#FFF',
    resizeMode: 'contain',
  },
  pokemonStatusContainer: {
    borderWidth: 0.5,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
    width: 85,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  pokemonStatusNumber: {
    fontSize: 20,
  },
  pokedexInfoContainer: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    marginBottom: -25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  pokedexNumberText: number => ({
    fontSize: number == 0 ? 15 : 30,
    color: 'white',
  }),
  pokedexText: {
    textAlign: 'center',
    color: 'white',
  },
});
