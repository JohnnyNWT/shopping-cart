const section = document.getElementsByClassName('items');

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
  const sectionElement = document.createElement('section');
  sectionElement.className = 'item';
  sectionElement.appendChild(createCustomElement('span', 'item__sku', sku));
  sectionElement.appendChild(createCustomElement('span', 'item__title', name));
  sectionElement.appendChild(createProductImageElement(image));
  sectionElement.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return sectionElement;
};

const creatElementsHTML = async (product) => {
  const api = await fetchProducts(product);
  return api.results.forEach((element) => {
    const { id, title, thumbnail } = element;
    section[0].appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// const cartItemClickListener = (event) => {
//   // coloque seu código aqui
// };

// const createCartItemElement = ({ sku, name, salePrice }) => {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// };

window.onload = () => { creatElementsHTML('computador'); };
