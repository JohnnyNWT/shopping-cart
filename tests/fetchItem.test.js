require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('2.1 - Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
});
