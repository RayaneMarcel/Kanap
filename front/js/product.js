// retrieve product ID from url
const urlLocation = document.location.href;
const urlProduct = new URL(urlLocation)
const urlSearchProduct = new URLSearchParams(urlProduct.search);
let productId = urlSearchProduct.get('id');

// to create an Element
function createNode(element) {
    return document.createElement(element);
}

// to get products in cart (localstorage)
function getCart() {
  let cartProducts = [];
  if (localStorage.getItem("cart") != null) {
    cartProducts = JSON.parse(localStorage.getItem("cart")); // convert JSON data in javascript object
  }
  return cartProducts;
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
      setProductAttributes(product);    
      addColor(product);
    })
    .catch((error) => {
      //if error => display error message
      const sectionItem = document.getElementsByClassName('item')[0];
      sectionItem.innerHTML = 'Erreur de connexion...<br>Impossible de charger les produits !';
      sectionItem.style.fontSize = '20px';
      sectionItem.style.textAlign = 'center';
  });

 // to set the product attributes
function setProductAttributes(product) {
  const productImageUrl = product.imageUrl;
  const productImageAlt = product.altTxt;
  const productName = product.name;
  const productPrice = product.price;
  const productDescription = product.description;
  document.getElementsByClassName('item')[0].setAttribute('id', 'item');
  const itemImg = document.getElementsByClassName('item__img');
  const imageElement = createNode('img');
  imageElement.src = productImageUrl;
  imageElement.alt = productImageAlt;
  itemImg[0].appendChild(imageElement);
  document.getElementById('title').innerHTML = productName;
  document.getElementById('price').innerHTML = productPrice;
  document.getElementById('description').innerHTML = productDescription;
  //title of the page
  document.getElementsByTagName('title')[0].innerHTML = 'Canapé ' + productName;
}

// retrieve product colors and add to the select menu
function addColor(product) {
  const productColors = product.colors;
  const colorsTotal = productColors.length;
  // for each color of the product => add an option to the select list    
  for (let i=0; i < colorsTotal; i++) {            
    const productColor = product.colors[i];
    const colors = document.getElementById('colors');
    const addColors = document.createElement('option');
    addColors.value = productColor;
    addColors.innerText = productColor;
    colors.appendChild(addColors);
  }
}

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
    // if cart is empty => create an array "product" on an array "cartProducts"
    if (cartProducts.length == 0) {      
      cartProducts = [[productId, color, quantity]];
    } else {
      let searchProduct = false;
      for (let i = 0; i < cartProducts.length; i++) {
        // if same product in cart (id and color) already exist => add input quantity
        if (productId === cartProducts[i][0] && color === cartProducts[i][1]) {
          searchProduct = true;
          cartProducts[i][2] += quantity;
        }
      }
      // if not same product existed in cart => add new product in "cartProducts"
      if (searchProduct == false) {
        let product = [productId, color, quantity];
        cartProducts.push(product);
      }
    }
    // convert the "cartProducts" in JSOn data and sent it to localStorage
    localStorage.setItem("cart", JSON.stringify(cartProducts));

}

// to display a message to confirm added products
const articleSection = document.getElementsByTagName('article')[0];
function addToCartConfirm(quantity) {
  const confirmMsg = document.createElement('div');
  confirmMsg.id = 'addToCartConfirm';
  confirmMsg.style.textAlign='center';
  confirmMsg.style.paddingTop='20px';
  articleSection.append(confirmMsg);
  if (quantity == 1) {
    document.getElementById('addToCartConfirm').innerHTML = 'Votre article a bien été ajouté au panier.';
  }
  if(quantity > 1) {
    document.getElementById('addToCartConfirm').innerHTML = 'Vos ' +quantity+ ' articles ont bien été ajouté au panier.';
  }
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
      addToCartConfirm(quantity);
    }
});


// remove the confirm message when select another color
document.getElementById("colors").addEventListener('change', ( )=> {
    if(document.getElementById('addToCartConfirm')) {
      document.getElementById('addToCartConfirm').remove();
    }
});

// remove the confirm message when change quantity
document.getElementById("quantity").addEventListener('change', ( )=> {
  if(document.getElementById('addToCartConfirm')) {
    document.getElementById('addToCartConfirm').remove();
  }
});

