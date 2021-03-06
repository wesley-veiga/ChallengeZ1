import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = props => {
  const {
    title,
    onPress,
    backgroundColor,
    titleColor,
    containerStyle,
    titleStyle,
  } = props;

  return (
    <TouchableOpacity
      style={styles.container(backgroundColor, containerStyle)}
      onPress={() => onPress()}
      testID="button">
      <Text style={styles.title(titleColor, titleStyle)} testID="title">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (backgroundColor, containerStyle) => ({
    width: '80%',
    height: 70,
    backgroundColor: backgroundColor ? backgroundColor : 'green',
    justifyContent: 'center',
    borderRadius: 7,
    marginVertical: 5,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    ...containerStyle,
  }),
  title: (titleColor, titleStyle) => ({
    fontWeight: '400',
    fontSize: 25,
    color: titleColor ? titleColor : '#FFF',
    textAlign: 'center',
    ...titleStyle,
  }),
});
