const fetchItem = async (item) => {
  if (!item) {
    return new Error('You must provide an url');
  }
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${item}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
