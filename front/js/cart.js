// create an Element
function createNode(element) {
    return document.createElement(element);
}

// get products in cart (localstorage)
function getCart() {
  let cartProducts = [];
  if (localStorage.getItem("cart") != null) {
    cartProducts = JSON.parse(localStorage.getItem("cart")); // convert JSON data in javascript object
  }
  return cartProducts;
}

// create button
function createButton(parent, value, id) {
    parent.append(createNode('div'));
    parent.getElementsByTagName('div')[0].setAttribute('class', 'cart__order__form__submit');
    parent.getElementsByTagName('div')[0].append(createNode('input'));
    parent.getElementsByTagName('input')[0].setAttribute('type', 'submit');
    parent.getElementsByTagName('input')[0].setAttribute('value', value);
    parent.getElementsByTagName('input')[0].setAttribute('id', id);
}

// to clone a node in the DOM
function cloneArticle () {
  const cartItem = document.getElementsByClassName('cart__item')[0];
  const newCartItem = cartItem.cloneNode(true);
  const cartItemsSection = document.getElementById('cart__items');
  cartItemsSection.appendChild(newCartItem);              
}


// request the products on the API
const apiProductsUrl = 'http://localhost:3000/api/products';

let cartProducts = getCart();
let cartTotalQuantity = 0;
let cartTotalPrice = 0;

const h1 = document.getElementsByTagName('h1');
const cartSection = document.getElementsByClassName('cart');

const productFetch = function () {
  for (let i = 0; i < cartProducts.length; i++) {
    let cartProductId = cartProducts[i][0];
    let cartProductColor = cartProducts[i][1];
    let cartProductQuantity = cartProducts[i][2];
    if (i>0) {
        cloneArticle(); // clone the DOM elements for an article
    }
    fetch(apiProductsUrl)
      .then((response) => {
        if (response.ok) {
            return response.json();
        }
      })  
      .then((products) => {
        // find and compare the product id in cart and the product id on API => 
        function findId(products) {
            return products._id === cartProductId;
        }
        const foundProduct = products.find(findId);
        const productImageUrl = foundProduct.imageUrl;
        const productImageAlt = foundProduct.altTxt;
        const productName = foundProduct.name;
        const productPrice = foundProduct.price;
                    
        // set attributes for an article
        const cartItemArticle = document.getElementsByTagName('article');
        cartItemArticle[i].setAttribute('data-id', cartProductId);
        cartItemArticle[i].setAttribute('data-color', cartProductColor);
        cartItemArticle[i].getElementsByTagName('img')[0].setAttribute('src', productImageUrl);
        cartItemArticle[i].getElementsByTagName('img')[0].setAttribute('alt', productImageAlt);
        const cartItemDesc = document.getElementsByClassName('cart__item__content__description')[i];
        cartItemDesc.getElementsByTagName('h2')[0].innerHTML = productName;
        cartItemDesc.getElementsByTagName('p')[0].innerHTML = cartProductColor;
        cartItemDesc.getElementsByTagName('p')[1].innerHTML = productPrice+ ' €';
        document.getElementsByClassName('itemQuantity')[i].setAttribute('value', cartProductQuantity);
        cartTotalQuantity += parseInt(cartProductQuantity);
        document.getElementById('totalQuantity').innerHTML = cartTotalQuantity;
        cartTotalPrice += cartProductQuantity * productPrice;
        document.getElementById('totalPrice').innerHTML = cartTotalPrice;

        //Change quantity in cart
        const inputQuantity = document.getElementsByClassName('itemQuantity')[i];
        inputQuantity.addEventListener ('change', () => {
          changeCartQuantity (cartProductId, cartProductColor, inputQuantity)
        });

        //Delete items
        const deleteItemButton = document.getElementsByClassName('deleteItem')[i];
        deleteItemButton.addEventListener ('click', () => {
          deleteCartItem (cartProductId, cartProductColor);
        });           
      })
      .catch((error) => {
        //if error => display error message
        h1[0].innerHTML = 'Erreur de connexion...<br>Impossible de charger les produits !';
        h1[0].style.fontSize ='20px';
        h1[0].style.fontWeight = 'normal';
        cartSection[0].innerHTML = '';
      });
  } // end for
}

if (cartProducts.length == 0) {  // if empty Cart
    h1[0].innerHTML = 'Votre panier est vide.';
    cartSection[0].innerHTML = '';
} else {
  productFetch ();    
}

//to change quantity in cart
function changeCartQuantity(productId, productColor, ProductQuantity) {
  let cartProducts = getCart();
  for (let i = 0; i < cartProducts.length; i++) {
    if(productId === cartProducts[i][0] && productColor === cartProducts[i][1]) {
      if(ProductQuantity.value == 0) {
        deleteCartItem (productId, productColor);
      } else {
      cartProducts[i][2] = ProductQuantity.value;
      localStorage.setItem('cart', JSON.stringify(cartProducts));
      window.location.reload();
      }
    }                    
  }
}

// to delete items in cart
function deleteCartItem(productId, productColor) {
  let cartProducts = getCart();
  for (let i = 0; i < cartProducts.length; i++) {
    if(productId === cartProducts[i][0] && productColor === cartProducts[i][1]) {
      cartProducts.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(cartProducts));
      window.location.reload();  
    }
  }
}

const orderButton = document.getElementById('order');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const cityInput = document.getElementById('city');
const addressInput = document.getElementById('address');
const emailInput = document.getElementById('email');


// Regular expression :
// a-z lowercase, A-Z uppercase , all spécial language accent
// \s => allow space
//\,  \'  \- allow comma, simple quote and dash
// /^[...]*$/ match all between the brackets many times
// /i tets if don't match the regular expression
const regexName = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s\,\'\-]*$/i;
const regexAddress = /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s\,\'\-]*$/i;
const regexEmail = /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/i;

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");

/**
*
* Expects request to contain:
* contact: {
*   firstName: string,
*   lastName: string,
*   address: string,
*   city: string,
*   email: string
* }
* products: [string] <-- array of product _id
*
*/

// to transform data in JSON
function setDataJson() {
  let contact = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    address: addressInput.value,
    city: cityInput.value,
    email: emailInput.value,
  };      
  let cartProducts = getCart();
  let products =[];      
  for (i = 0; i < cartProducts.length; i++) {
    if (products.find((id) => id == cartProducts[i][0])) {
      console.log("Id already exist");
    } else {
      products.push(cartProducts[i][0]);
    }
  }
  let dataJSON = JSON.stringify({ contact, products });        
  return dataJSON;
}

// to order
if (cartProducts.length == 0) {    // if cart is empty, create a button to return to home page
    const parentSection = cartSection[0];
    let buttonValue = 'Pour commander !';
    let buttonId = 'returnHomePage';
    createButton(parentSection, buttonValue, buttonId);    
    document.getElementById(buttonId).addEventListener('click', () =>{
    window.location.href = "./index.html#items";
    })
} else {
    orderButton.addEventListener('click', (orderSubmit) => {
      orderSubmit.preventDefault(); //prevent submit button action

      const firstNameTest = regexName.test(firstNameInput.value);;
      const lastNameTest = regexName.test(lastNameInput.value);
      const addressTest = regexAddress.test(addressInput.value);
      const cityTest = regexName.test(cityInput.value);
      const emailTest = regexEmail.test(emailInput.value);

      console.log(firstNameTest);
      console.log(lastNameTest);
      console.log(addressTest);
      console.log(cityTest);
      console.log(emailTest);
     
      let dataJSON = setDataJson();

      // test form input
      if (
        firstNameTest == false || firstNameInput.value == '' ||        
        lastNameTest == false || lastNameInput.value == '' ||
        addressTest == false || addressInput.value == '' ||
        cityTest == false || cityInput.value == '' ||
        emailTest == false || emailInput.value == ''
      ) {
        if (firstNameTest == false || firstNameInput.value == '') {
          firstNameErrorMsg.innerHTML = 'Veuillez entrer un prénom sans chiffre ni caractères spéciaux.';
        } else {
          firstNameErrorMsg.innerHTML = null;
        }
        if (lastNameTest == false || lastNameInput.value == '') {
          lastNameErrorMsg.innerHTML = 'Veuillez entrer un nom sans chiffre ni caractères spéciaux.';
        } else {
          lastNameErrorMsg.innerHTML = null;
        }
        if (addressTest == false || addressInput.value == '') {
          addressErrorMsg.innerHTML = 'Veuillez entrer une adresse sans caractères spéciaux.';
        } else {
          addressErrorMsg.innerHTML = null;
        }
        if (cityTest == false || cityInput.value == '') {
          cityErrorMsg.innerHTML = 'Veuillez entrer une ville sans caractères spéciaux.';
        } else {
          cityErrorMsg.innerHTML = null;
        }
        if (emailTest == false || emailInput.value == '') {
          emailErrorMsg.innerHTML = 'Veuillez entrer une adresse Email valide.';
        } else {
          emailErrorMsg.innerHTML = null;
        }
        return;
      }
      
      // Send form data on the API bye POST method
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: dataJSON,
        headers: { 
          "Accept": "application/json", 
          "Content-Type": "application/json" 
          },
        })
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        window.location.href = "./confirmation.html?id=" + data.orderId + '#limitedWidthBlock';
        console.log(data);      
      });
    
    });
}

// to remove error message from form input
const formSection = document.getElementsByClassName('cart__order__form');
if(formSection || cartProducts.length != 0) {
    firstNameInput.addEventListener('change', ()=> {
      firstNameErrorMsg.innerHTML = '';
    });
    lastNameInput.addEventListener('change', ()=> {
      lastNameErrorMsg.innerHTML = '';
    });
    addressInput.addEventListener('change', ()=> {
      addressErrorMsg.innerHTML = '';
    });
    cityInput.addEventListener('change', ()=> {
      cityErrorMsg.innerHTML = '';
    });
    emailInput.addEventListener('change', ()=> {
      emailErrorMsg.innerHTML = '';
    });
}