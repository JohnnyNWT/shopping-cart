const section = document.getElementsByClassName('items');
const cartItems = document.querySelector('.cart__items');
const savedItems = document.getElementsByClassName('cart__items')[0];

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

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addCartItem = async (itemID) => {
  const api = await fetchItem(itemID);
  const { id, title, price } = api;
  cartItems.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  saveCartItems(cartItems.innerHTML);
};

const createProductItemElement = ({ sku, name, image }) => {
  const sectionElement = document.createElement('section');
  sectionElement.className = 'item';
  sectionElement.appendChild(createCustomElement('span', 'item__sku', sku));
  sectionElement.appendChild(createCustomElement('span', 'item__title', name));
  sectionElement.appendChild(createProductImageElement(image));

  const botao = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  botao.addEventListener('click', () => {
    addCartItem(sku);
  });
  sectionElement.appendChild(botao);
  return sectionElement;
};

const creatElementsHTML = async (product) => {
  const api = await fetchProducts(product);
  return api.results.forEach((element) => {
    const { id, title, thumbnail } = element;
    section[0].appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};

window.onload = () => {
  creatElementsHTML('computador');
  savedItems.innerHTML = getSavedCartItems();
};
