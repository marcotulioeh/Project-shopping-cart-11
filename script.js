const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const sumOfValues = () => {
  const childCartItems = cartItems.childNodes;
  let sum = 0;
  childCartItems.forEach((element) => {
    const price = element.innerHTML.split('$')[1];
    sum += parseFloat(price);
  });
  totalPrice.innerText = sum;
  getSavedCartItems();
};

const getSkuFromProductItem = (item) => {
  const splitSku = item.innerText.split(' ');
  return splitSku[1];
};

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
  getSkuFromProductItem(event.target);
  sumOfValues();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const emptyCart = () => {
  const btnEmptyCart = document.querySelector('.empty-cart');
  btnEmptyCart.addEventListener('click', () => {
    cartItems.innerHTML = '';
    localStorage.clear();
    sumOfValues();
  });
};

const getItem = async (itemId) => {
  const funcItem = await fetchItem(itemId);
  const { id, title, price } = funcItem;
  const result = createCartItemElement({ sku: id, name: title, salePrice: price });
  cartItems.appendChild(result);
  saveCartItems(cartItems.innerHTML);
  sumOfValues();
};

const getProduct = async () => {
  const funcProducts = await fetchProducts('computador');
  funcProducts.forEach((product) => {
    const { id, title, thumbnail } = product;
    const result = createProductItemElement({ sku: id, name: title, image: thumbnail });
    result.addEventListener('click', () => {
      getItem(id);
    });
    items.appendChild(result);
  });
};

const loadSaveCart = () => {
  const funcSaveCart = getSavedCartItems();
  cartItems.innerHTML = funcSaveCart;
  const objctKeys = Object.keys(cartItems.innerHTML);
  objctKeys.forEach((element) => {
    const cartElement = cartItems.children[element];
    cartElement.addEventListener('click', cartItemClickListener);
    getSkuFromProductItem(cartElement);
  });
};

window.onload = async () => { 
  await getProduct();
  emptyCart();
  loadSaveCart();
};
