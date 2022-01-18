import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

const Container = props => {
  return (
    <SafeAreaView style={styles.container(props.backgroundColor)}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          props.backgroundColor ? props.backgroundColor : '#F9F9F9'
        }
      />
      {props.children}
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    flex: 1,
    backgroundColor: backgroundColor ? backgroundColor : '#F9F9F9',
  }),
});
