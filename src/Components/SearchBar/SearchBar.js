import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

const SearchBar = ({...props} = this.props) => {
  return (
    <View style={styles.container}>
      <TextInput style={{flex: 1}} {...props} />
      <Icon name={'search'} color={'gray'} size={30} style={styles.iconStyle} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    alignItems: 'center',
    alignContent: 'center',
    height: 40,
    width: '90%',
    borderRadius: 15,
    borderWidth: 0,
    marginVertical: 20,
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    alignSelf: 'center',
  },
  iconStyle: {
    borderLeftWidth: 1,
    paddingLeft: 5,
    borderColor: '#999',
  },
});
