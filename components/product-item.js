// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
  }
  
  connectedCallback() {
    const product = document.createElement('li');
    product.setAttribute('class','product');
    
    const image = product.appendChild(document.createElement('img'));
    image.src = this.getAttribute('src');
    image.alt = this.getAttribute('title');
    image.width = 200;

    const title = product.appendChild(document.createElement('p'));
    title.setAttribute('class','title');
    title.textContent = this.getAttribute('title');

    const price = product.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    price.textContent = '$'+this.getAttribute('price');

    const add = product.appendChild(document.createElement('button'));
    add.setAttribute('product-id', this.getAttribute('product-id'))

    function buy() {
      let count = document.getElementById('cart-count');
      count.innerHTML = Number(count.innerHTML)+1;
      add.innerHTML='Remove from Cart';

      let id = this.getAttribute('product-id');
      localStorage.setItem(id+'added','true');

      add.removeEventListener('click',buy);
      add.addEventListener('click',remove);
    }

    function remove() {
      let count = document.getElementById('cart-count');
      count.innerHTML = Number(count.innerHTML)-1;
      add.innerHTML='Add to Cart';

      let id = this.getAttribute('product-id');
      localStorage.setItem(id+'added','false');

      add.removeEventListener('click',remove);
      add.addEventListener('click',buy);
    }
    
    let product_id = this.getAttribute('product-id');
    if (localStorage.getItem(product_id+'added') === null || localStorage.getItem(product_id+'added')=='false'){
      add.addEventListener('click',buy);
      add.textContent = 'Add to Cart';
    }
    else {
      add.addEventListener('click',remove);
      add.textContent = 'Remove from Cart';
      let count = document.getElementById('cart-count');
      count.innerHTML = Number(count.innerHTML)+1;
    }


    const style = document.createElement('style');
    style.textContent = `
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
    `;

    this.shadowRoot.append(style, product);

  }
}

customElements.define('product-item', ProductItem);