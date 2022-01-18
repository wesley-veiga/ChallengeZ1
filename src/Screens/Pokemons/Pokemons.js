import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
//componentes
import SearchBar from '../../Components/SearchBar';
import Container from '../../Components/Container';
//Utils
import {capitalize} from '../../Utils/capitalize';

const Home = ({navigation}) => {
  //Guarda o estado dos pokemons e da aplicação.
  const [allPokemons, setAllPokemons] = useState({
    loading: false,
    error: false,
    pokemons: [],
    data: [],
    url: 'https:pokeapi.co/api/v2/pokemon?limit=1118&offset=0',
  });

  //Guarda o texto do input da barra de pesquisa
  const [searchData, setSearchData] = useState('');

  //Consulta a API e trás os nomes de todos os pokemons
  const getAllPokemons = () => {
    setAllPokemons({...allPokemons, loading: true});
    fetch(allPokemons.url)
      .then(res => res.json())
      .then(res => {
        //guarda a lista de pokemons
        setAllPokemons({
          ...allPokemons,
          loading: false,
          pokemons: res.results,
          data: res.results,
        });
      })
      .catch(ex => {
        //caso der algum erro, retorno o estado da aplicação para loading=false,
        // seto os pokemons e data para vazio.
        setAllPokemons({
          ...allPokemons,
          loading: false,
          pokemons: [],
          data: [],
          error: true,
        });
      });
  };

  //Faz o filtro na lista ao pesquisar na barra de pesquisa
  const onSearch = query => {
    let listPokemon = [...allPokemons.data];
    let listQuery = listPokemon.filter(f =>
      f.name.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchData(query);
    setAllPokemons({...allPokemons, pokemons: listQuery});
  };

  //Carrega a lista de todos os pokemons ao abrir a tela.

  useFocusEffect(
    React.useCallback(() => {
      //Verifico se o tamanho da lista de dados é igual a 0, caso for, faço a busca, se não mantenho
      //os dados já baixados.
      allPokemons.data.length == 0 && getAllPokemons();
    }, []),
  );

  //Renderiza os itens da flatlist
  const _renderPokemons = ({item}) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('Pokemon', {
          pokemon: item,
          fromTeam: false,
        });
      }}>
      <Text style={styles.itemName}>{capitalize(item.name)}</Text>
    </TouchableOpacity>
  );

  //Caso não não vier nenhum pokemon para allPokemons.data, exibo uma imagem pedindo para
  //tentar novamente.
  const _renderEmptyData = () => {
    if (allPokemons.data.length == 0 && allPokemons.loading === false) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Hmm...{'\n'}
            {'\n'}
            Parece que não tem nenhum pokémon por aqui! {'\n'}
            {'\n'}Puxe para atualizar.
          </Text>
          <Image
            source={require('../../Assets/loadError.png')}
            style={styles.emptyImage}
          />
        </View>
      );
    } else return <></>;
  };

  return (
    <Container>
      <SearchBar
        onChangeText={text => onSearch(text)}
        values={searchData.query}
        placeholder="Buscar..."
        placeholderTextColor={'#8888'}
        autoCorrect={false}
        maxLength={20}
      />
      <FlatList
        data={allPokemons.pokemons}
        refreshing={allPokemons.loading}
        onRefresh={() => getAllPokemons()}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={_renderPokemons}
        ListEmptyComponent={_renderEmptyData}
      />
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCC',
    marginVertical: 10,
    paddingVertical: 15,
    marginHorizontal: 25,
  },
  itemName: {
    fontSize: 20,
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
});
