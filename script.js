const section = document.getElementsByClassName('items');
const cartItems = document.querySelector('.cart__items');
const savedItems = document.getElementsByClassName('cart__items')[0];
const listCart = document.getElementsByClassName('cart__item');
const totalPrice = document.querySelector('.total-price');
const emptyCart = document.querySelector('.empty-cart');

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
  saveCartItems(cartItems.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// const addTotalPrice = () => {
//   const span = document.createElement('span');
//   span.className = 'total-price';
//   span.innerText = 0;
//   return span;
// }

const addCartItem = async (itemID) => {
  const api = await fetchItem(itemID);
  const { id, title, price } = api;
  cartItems.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  totalPrice.innerText = (Number(totalPrice.innerText) + price);
  saveCartItems(cartItems.innerHTML);
  localStorage.setItem('totalPrice', totalPrice);
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

emptyCart.addEventListener('click', () => {
  cartItems.innerHTML = '';
  saveCartItems(cartItems.innerHTML);
});

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
  // totalPrice.innerHTML = localStorage.getItem('totalPrice');
  for (i = 0; i < listCart.length; i += 1) {
    listCart[i].addEventListener('click', cartItemClickListener);
  }
};
