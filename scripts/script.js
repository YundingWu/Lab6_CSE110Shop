// Script.js
if (localStorage.getItem("products") === null) {
  window.addEventListener('DOMContentLoaded', () => {
    fetch('https://fakestoreapi.com/products')
      .then(response=>response.json())
      .then(data=> {localStorage.setItem("products",JSON.stringify(data))});
  });
}

let products = JSON.parse(localStorage.getItem("products"));

let list = document.getElementById('product-list');

for (i=0; i<products.length; i++) {
  let product = document.createElement('product-item');
  product.setAttribute('src', products[i]['image']);
  product.setAttribute('title', products[i]['title']);
  product.setAttribute('price', products[i]['price']);
  product.setAttribute('product-id', products[i]['id'])
  list.appendChild(product);
}