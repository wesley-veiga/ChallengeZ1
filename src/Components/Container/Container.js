import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

const Container = props => {
  const {backgroundColor, children} = props;

  return (
    <SafeAreaView style={styles.container(backgroundColor)} testID="container">
      <StatusBar
        testID="statusbar"
        barStyle="dark-content"
        backgroundColor={backgroundColor ? backgroundColor : '#F9F9F9'}
      />
      {children}
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
