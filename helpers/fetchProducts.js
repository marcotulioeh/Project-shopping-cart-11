const fetchProducts = async (element) => {
  if (!element) {
    return new Error('You must provide an url');
  }
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${element}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error.message;
  }
};

console.log(fetchProducts('computador'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
