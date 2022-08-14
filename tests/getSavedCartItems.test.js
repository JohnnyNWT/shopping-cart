const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('4.1 - Testa se o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.setItem).toBeCalled();
  });

  it('4.2 - Testa se o método localstorage.getItem é chamado com o "cartItems" como parâmetro', () => {
    getSavedCartItems();
    expect(localStorage.setItem).toBeCalledWith('cartItems');
  });
});
