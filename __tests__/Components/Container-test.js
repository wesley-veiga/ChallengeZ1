import {Text} from 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import Container from '../../src/Components/Container';

describe('Container', () => {
  it('deve ter a cor padrão #F9F9F9', () => {
    // Act
    const {getByTestId} = render(<Container />);
    const container = getByTestId('container');

    // Assert
    expect(container.props.style.backgroundColor).toEqual('#F9F9F9');
  });

  it('deve alterar a cor do fundo', () => {
    // Arrange
    const color = '#3333';

    // Act
    const {getByTestId} = render(<Container backgroundColor={color} />);
    const container = getByTestId('container');

    // Assert
    expect(container.props.style.backgroundColor).toEqual(color);
  });

  it('deve renderizar o componente filho', () => {
    // Arrange
    const text = 'Hello!';
    const children = <Text>{text}</Text>;

    // Act
    const {getByText} = render(<Container>{children}</Container>);

    // Assert
    getByText(text);
  });
});
