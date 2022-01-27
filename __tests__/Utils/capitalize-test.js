import {capitalize} from '../../src/Utils/capitalize';

describe('capitalize', () => {
  it('deve retornar uma string em branco quando o input não for uma string', () => {
    // Arrange
    const text = 8;

    // Act
    const result = capitalize(text);

    // Assert
    expect(result).toBe('');
  });

  it('deve retornar uma string com um número, caso o input for uma string com um número', () => {
    // Arrange
    const text = '8';

    // Act
    const result = capitalize(text);

    // Assert
    expect(result).toBe('8');
  });

  it('deve retornar a primeira letra maíuscula quando o input for apenas uma palavra', () => {
    // Arrange
    const text = 'pikachu';

    // Act
    const result = capitalize(text);

    // Assert
    expect(result).toBe('Pikachu');
  });

  it('deve retornar apenas a primeira letra maiuscula quando o input tiver mais de uma palavra', () => {
    // Arrange
    const text = 'happy pikachu';

    // Act
    const result = capitalize(text);

    // Assert
    expect(result).toBe('Happy pikachu');
  });
});
