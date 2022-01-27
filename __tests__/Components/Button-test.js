import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
//Componente
import Button from '../../src/Components/Button';

describe('Button', () => {
  it('deve ter a cor padrão verde', () => {
    // Act
    const {getByTestId} = render(<Button />);
    const button = getByTestId('button');

    // Assert
    expect(button.props.style.backgroundColor).toEqual('green');
  });

  it('deve alterar a cor do botão', () => {
    // Arrange
    const color = '#F9F9F9';

    // Act
    const {getByTestId} = render(<Button backgroundColor={color} />);
    const button = getByTestId('button');

    // Assert
    expect(button.props.style.backgroundColor).toEqual(color);
  });

  it('deve exibir o titulo', () => {
    // Arrange
    const title = 'Titulo Botão';

    // Act
    const {getByText} = render(<Button title={title} />);

    // Assert
    getByText(title);
  });

  it('deve ter a cor do título padrão branco', () => {
    // Act
    const {getByTestId} = render(<Button />);
    const title = getByTestId('title');

    // Assert
    expect(title.props.style.color).toEqual('#FFF');
  });

  it('deve alterar a cor do título', () => {
    // Arrange
    const color = '#000';

    // Act
    const {getByTestId} = render(<Button titleColor={color} />);
    const button = getByTestId('title');

    // Assert
    expect(button.props.style.color).toEqual(color);
  });

  it('deve executar a ação (onPress) quando o botão é pressionado', () => {
    // Arrange
    const onPress = jest.fn();

    // Act
    const {getByTestId} = render(<Button onPress={onPress} />);
    const button = getByTestId('button');
    fireEvent.press(button);

    // Assert
    expect(onPress.mock.calls.length).toBe(1);
  });
});
