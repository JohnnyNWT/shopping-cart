const fetchProducts = async (consulta) => {
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${consulta}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
