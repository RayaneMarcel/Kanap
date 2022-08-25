// retrieve product ID from url
const urlLocation = document.location.href;
const urlProduct = new URL(urlLocation)
const urlSearchProduct = new URLSearchParams(urlProduct.search);
let productId = urlSearchProduct.get('id');

// create an Element
function createNode(element) {
    return document.createElement(element);
  }

// request the product by ID on the API
const apiProductsUrl = 'http://localhost:3000/api/products/';
const productPage = apiProductsUrl + productId;
fetch(productPage)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })  
    .then((product) => {
        const productImageUrl = product.imageUrl;
        const productImageAlt = product.altTxt;
        const productName = product.name;
        const productPrice = product.price;
        const productDescription = product.description;
        const productColors = product.colors;

        // set the product attributes
        const itemImg = document.getElementsByClassName('item__img');
          itemImg[0].append(createNode('img'));
          itemImg[0].getElementsByTagName('img')[0].setAttribute('src', productImageUrl);
          itemImg[0].getElementsByTagName('img')[0].setAttribute('alt', productImageAlt);
        document.getElementsByTagName('title')[0].innerHTML = 'Canapé ' + productName; //title of the page
        document.getElementById('title').innerHTML = productName;
        document.getElementById('price').innerHTML = productPrice;
        document.getElementById('description').innerHTML = productDescription;

        const colorsTotal = productColors.length;
        
        // retrieve product colors and add to the select menu
        function addColor() {        
            for (let colorNumber=0; colorNumber < colorsTotal; colorNumber++) {            
              const productColor = product.colors[colorNumber];
              const colors = document.getElementById('colors');
                colors.appendChild(createNode('option'));
                colors.getElementsByTagName('option')[1+colorNumber].setAttribute('value', productColor);
                colors.getElementsByTagName('option')[1+colorNumber].innerText = productColor;
            }
        }
        addColor();
    })
    .catch(function(err) {
        // Une erreur est survenue
});

// get quantity input value
function quantityValue() {
  let quantity = document.getElementById("quantity");
  return quantity.value;
}

//get colors input value
function colorValue() {
  let color = document.getElementById("colors");
  return color.value;
}

// get products in cart (localstorage)
function getCart() {
    let cartProducts = [];
    if (localStorage.getItem("cart") != null) {
      cartProducts = JSON.parse(localStorage.getItem("cart")); // convert JSON data in javascript object
    }
    return cartProducts;
}

const colorsSection = document.getElementsByClassName('item__content__settings__color')[0];
const quantitySection = document.getElementsByClassName('item__content__settings__quantity')[0];


// add product in cart
function addToCart(productId, color, quantity) {
    // error message if not choose the color
    if (color == "") {      
      colorsSection.append(createNode('div'));
      colorsSection.getElementsByTagName('div')[0].innerHTML = 'Veuillez choisir une couleur.';
      colorsSection.getElementsByTagName('div')[0].style.color='red';
      return;
    }
    // error message if not choose the quantity
    if (quantity <= 0) {
      quantitySection.append(createNode('div'));
      quantitySection.getElementsByTagName('div')[0].innerHTML = 'Veuillez choisir une quantité.';
      quantitySection.getElementsByTagName('div')[0].style.color='red';
      return;
    }

    let cartProducts = getCart();
    if (cartProducts.length == 0) {
      cartProducts = [[productId, color, quantity]];  // create an array "product" on an array "cartProducts"
    } else {
      let searchProduct = false; // search the same product (id and color)
      for (let i = 0; i < cartProducts.length; i++) {
        if (productId === cartProducts[i][0] && color === cartProducts[i][1]) {
          searchProduct = true;
          cartProducts[i][2] += quantity; // if same product in cart (id and color) already exist => add input quantity
        }
      }
      if (searchProduct == false) {
        let product = [productId, color, quantity];
        cartProducts.push(product); // if not same product existed in cart => add new product in "cartProducts"
      }
    }
    localStorage.setItem("cart", JSON.stringify(cartProducts)); // convert the "cartProducts" in JSOn data and sent it to localStorage
   
    
}



// remove error message for colors choice
document.getElementById("colors").addEventListener('change', ( )=> {
    if (colorValue() != null && colorsSection.getElementsByTagName('div')[0]) {
      colorsSection.getElementsByTagName('div')[0].remove();
    }
});

// remove error message for quantity choice
document.getElementById("quantity").addEventListener('change', ( )=> {
  if (quantityValue() > 0 && quantitySection.getElementsByTagName('div')[0]) {
    quantitySection.getElementsByTagName('div')[0].remove();
  }
});

const itemSection = document.getElementsByClassName('item__content')[0];

// click on addToCart button
const addToCartButton = document.getElementById('addToCart');
let productsInCart = localStorage.length;
addToCartButton.addEventListener('click', () => {
    let quantity = parseInt(quantityValue());
    let color = colorValue();
    addToCart(productId, color, quantity);
    if(color != '' && quantity > 0) {
      document.getElementById("colors").value = '';
      document.getElementById("quantity").value = 0;
    }
    itemSection.append(createNode('div'));
    itemSection.getElementsByTagName('div')[6].style.textAlign='center';
    itemSection.getElementsByTagName('div')[6].style.paddingTop='20px';
    if (quantity == 1) {
      itemSection.getElementsByTagName('div')[6].innerHTML = 'Votre article a bien été ajouté au panier.';
    }
    if(quantity > 1) {
      itemSection.getElementsByTagName('div')[6].innerHTML = 'Vos ' +quantity+ ' articles ont bien été ajouté au panier.';
    }
    });

document.getElementById("colors").addEventListener('change', ( )=> {
    if(itemSection.getElementsByTagName('div')[6] == true) {
        itemSection.getElementsByTagName('div')[6].remove();
    }
});
document.getElementById("quantity").addEventListener('change', ( )=> {
  if(itemSection.getElementsByTagName('div')[6] == true) {
      itemSection.getElementsByTagName('div')[6].remove();
  }
});
