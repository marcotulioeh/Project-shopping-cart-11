const fetchItem = async (item) => {
  if (!item) {
    return new Error('You must provide an url');
  }
  const ulr = `https://api.mercadolibre.com/items/${item}`;
    const response = await fetch(ulr);
    const data = await response.json();
    return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
