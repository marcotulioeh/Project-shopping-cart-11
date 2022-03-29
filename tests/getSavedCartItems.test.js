const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    expect.assertions(1);
    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro', () => {
    expect.assertions(1);
    getSavedCartItems();
    
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
