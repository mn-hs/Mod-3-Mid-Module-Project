let productService = {
  allProducts: [
    {
      "productId": 1,
      "productSku": "MUG-023",
      "name": "Solar Geeks coffee mug",
      "description": "Start your day off right!",
      "price": 14.99,
      "imageName": "https://via.placeholder.com/350x250.jpg"
    },
    {
      "productId": 2,
      "productSku": "YET-001",
      "name": "Solar Geeks Yeti",
      "description": "Keep cool all day long.",
      "price": 21.99,
      "imageName": "https://via.placeholder.com/350x250.jpg"
    },
    {
      "productId": 3,
      "productSku": "ART-256",
      "name": "Galactic poster",
      "description": "Beautiful view of a galaxy",
      "price": 9.59,
      "imageName": "https://via.placeholder.com/350x250.jpg"
    },
    {
      "productId": 4,
      "productSku": "TOY-978",
      "name": "Toy rocket",
      "description": "To infinite imagination",
      "price": 39.99,
      "imageName": "https://via.placeholder.com/350x250.jpg"
    },
    {
      "productId": 5,
      "productSku": "EAT-235",
      "name": "Astronaut ice cream",
      "description": "As cold as space",
      "price": 5.79,
      "imageName": "https://via.placeholder.com/350x250.jpg"
    },
    {
      "productId": 6,
      "productSku": "HAT-928",
      "name": "Solar Geeks baseball cap",
      "description": "Look stylish with our logo",
      "price": 16.89,
      "imageName": "https://via.placeholder.com/350x250.jpg"
    },
    {
      "productId": 7,
      "productSku": "LIT-612",
      "name": "Intro to Astrophysics",
      "description": "Learn about astrophysics",
      "price": 7.99,
      "imageName": "https://via.placeholder.com/350x250.jpg"
    }
  ],

  getProducts() {
    return this.allProducts;
  },

};

function displayDescription(event){
  let messageWindow = document.getElementById('message-window');
  event.stopPropagation;
  let target = event.currentTarget;
  let dataId = target.getAttribute('data-id');
  for (let product of productService.allProducts){
    if(product.productId == dataId){
      messageWindow.innerText = product.description;
    }
  }
}

function addedToCartAlert(event){
  event.stopPropagation;
  let messageWindow = document.getElementById('message-window');
  let target = event.currentTarget;
  let dataId = target.getAttribute('data-id');
  for (let product of productService.allProducts){
    if(product.productId == dataId){
      messageWindow.innerText = `Added ${product.name} to cart`;
    }
  }
}

function removeAllCards(){
  let allCards = document.querySelectorAll('.product-card');
  allCards.forEach(card => {
    card.remove();
  });
}

function generateCard(product){
  let cardParent = document.getElementById('product-cards');

  let card = document.createElement('article');
  card.classList.add('product-card');

  let sku = document.createElement('div');
  sku.classList.add('sku');
  sku.innerText = product.productSku;
  card.insertAdjacentElement('beforeend', sku);

  let price = document.createElement('div');
  price.classList.add('price');
  const pricePoint = product.price;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  price.innerText = formatter.format(pricePoint);
  card.insertAdjacentElement('beforeend', price);

  let name = document.createElement('div');
  name.classList.add('product-name', 'action');
  name.setAttribute('data-id', product.productId);
  name.innerText = product.name;
  //event listener for name to get product description
  name.addEventListener('click', (event) => {
      displayDescription(event);
  });
  card.insertAdjacentElement('beforeend', name);

  let imgContainer = document.createElement('div');
  imgContainer.classList.add('product-image');
  let pic = document.createElement('img');
  pic.setAttribute('src', product.imageName);
  imgContainer.appendChild(pic);
  card.insertAdjacentElement('beforeend', imgContainer);

  let cart = document.createElement('div');
  cart.setAttribute('data-id', product.productId);
  //event listener for add to cart button
  cart.addEventListener('click', (event) => {
    addedToCartAlert(event);
  });
  cart.classList.add('cart');
  let cartIcon = document.createElement('i');
  cartIcon.classList.add('fa-solid', 'fa-cart-plus', 'icon', 'action');
  cartIcon.setAttribute('title', 'Add item to cart');
  cart.appendChild(cartIcon);
  card.insertAdjacentElement('beforeend', cart);

  cardParent.appendChild(card);
}

function createProductCards(productService){
  for (let product of productService.allProducts){
    generateCard(product);
  }
}

function searchProducts(searchTerm){
  if (searchTerm != null){
    removeAllCards();
    productService.allProducts.filter(product => {
      if (product.name.includes(searchTerm)){
        generateCard(product);
      }
    });
  }
  else createProductCards();
}

document.addEventListener('DOMContentLoaded', () => {
  let searchBar = document.querySelector('input[id="search"]')

  createProductCards(productService);

  searchBar.addEventListener('keyup', (event) => {
    let searchTerm = event.currentTarget.value;
    searchProducts(searchTerm);
  })
});