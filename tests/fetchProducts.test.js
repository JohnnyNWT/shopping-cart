require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('1 - Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('2 - Verifica se a função fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('3 - Verifica se a função ultiliza o ENDPOINT correto', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('4 - Testa se o retorno da função é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('5 - Testa se a função retorna um erro ao chamar sem argumento', () => {
    expect(fetchProducts()).rejects.toThrow(new Error('You must provide an url'));
  });
});
