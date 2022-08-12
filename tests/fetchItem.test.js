require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('2.1 - Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('2.2 - Verifica se a função fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('2.3 - Verifica se a função ultiliza o ENDPOINT correto', async () => {
    await fetchItem('MLB16157605');
    const ENDPOINT = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(ENDPOINT);
  });

  it('2.4 - Testa se o retorno da função é uma estrutura de dados igual ao objeto item', async () => {
    const funcao = await fetchItem('MLB1615760527');
    expect(funcao).toEqual(item);
  });

  it('2.5 - Testa se a função retorna um erro ao chamar sem argumento', () => {
    expect(fetchItem()).rejects.toThow(new Error('You must provide an url'));
  });
});
