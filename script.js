const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
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
  });
};

const getItem = async (itemId) => {
  const funcItem = await fetchItem(itemId);
  const { id, title, price } = funcItem;
  const result = createCartItemElement({ sku: id, name: title, salePrice: price });
  cartItems.appendChild(result);
};

const getProduct = async () => {
  const funcProducts = await fetchProducts('computador');
  funcProducts.forEach((product) => {
    const { id, title, thumbnail } = product;
    const result = createProductItemElement({ sku: id, name: title, image: thumbnail });
    result.addEventListener('click', () => getItem(id));
    items.appendChild(result);
  });
};

// const priceContainer = document.querySelector('.sum-values');

// const sum = async (itemId) => {
//   const funcItem = await fetchItem(itemId);
//   if (priceContainer.innerText) {
//     const result = parseFloat(priceContainer.innerText, 10) - parseFloat(funcItem.price, 10);
//     priceContainer.innerText = result % 1 === 0 ? result : result.toFixed(2);
//   }
//   priceContainer.innerText = funcItem.price;
// };

// const sumOfValues = async () => {
//   const a = await createCustomElement('p', 'sum-values', 'Total:');
//   cartItems.appendChild(a);
// };

// sumOfValues();

// const saveCartLC = () => {
//   cartItems.innerHTML = getSavedCartItems();
//   Object.keys(cartItems.children)
//     .forEach((element) => {
//       cartItems.children[element].addEventListener('click', cartItemClickListener);
//       const sku = 
//     })
// };

window.onload = async () => { 
  await getProduct();
  emptyCart();
};
