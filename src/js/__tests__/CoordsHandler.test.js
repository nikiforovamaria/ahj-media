import CoordsHandler from '../CoordsHandler';

test('Coords should be correct', () => {
  const data = '60.12345,30.12345';
  const handler = new CoordsHandler();
  const coords = handler.split(data);
  expect(coords.latitude).toBe('60.12345');
  expect(coords.longitude).toBe('30.12345');
});

test('Coords should be correct', () => {
  const data = '60.12345, 30.12345';
  const handler = new CoordsHandler();
  const coords = handler.split(data);
  expect(coords.latitude).toBe('60.12345');
  expect(coords.longitude).toBe('30.12345');
});

test('Coords should be correct', () => {
  const data = '[60.12345, 30.12345]';
  const handler = new CoordsHandler();
  const coords = handler.split(data);
  expect(coords.latitude).toBe('60.12345');
  expect(coords.longitude).toBe('30.12345');
});
