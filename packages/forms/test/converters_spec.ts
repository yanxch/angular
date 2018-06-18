import {Formatters} from '../src/converters';

describe('Converters', () => {
  describe('spaces', () => {
    fit('should return formatted value', () => {
      // Given
      const x = '1234567890';
      // When
      const formattedValue = Formatters.spaces(4)(x);
      // Then
      expect(formattedValue).toBe('1234 5678 900');
    });
  });
});