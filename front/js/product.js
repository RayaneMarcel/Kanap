// retrieve product ID from url
const urlLocation = document.location.href;
const urlProduct = new URL(urlLocation)
const urlSearchProduct = new URLSearchParams(urlProduct.search);
const productId = urlSearchProduct.get('id');

// create an Element
function createNode(element) {
    return document.createElement(element);
  }

// request the products on the API
fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(products) {
        // find the Id on products array and retrieve all elements
        function findId(products) {
            return products._id === productId;
          }
        productImageUrl = products.find(findId).imageUrl;
        productImageAlt = products.find(findId).altTxt;
        productName = products.find(findId).name;
        productPrice = products.find(findId).price;
        productDescription = products.find(findId).description;
        productColors = products.find(findId).colors;
        
        // set the product attributes
        document.getElementsByClassName('item__img')[0].append(createNode('img'));
        document.getElementsByClassName('item__img')[0].getElementsByTagName('img')[0].setAttribute('src', productImageUrl);
        document.getElementsByClassName('item__img')[0].getElementsByTagName('img')[0].setAttribute('alt', productImageAlt);
        document.getElementById("title").innerHTML = productName;
        document.getElementById('price').innerHTML = productPrice;
        document.getElementById('description').innerHTML = productDescription;
        
        const colorsTotal = productColors.length;
        
        // retrieve product colors and add to the select menu
        function addColor() {        
        for (let colorNumber=0; colorNumber < colorsTotal; colorNumber++) {            
            const productColor = products.find(findId).colors[colorNumber];            
            document.getElementById('colors').appendChild(createNode('option'));
            document.getElementById('colors').getElementsByTagName('option')[1+colorNumber].setAttribute('value', productColor);
            document.getElementById('colors').getElementsByTagName('option')[1+colorNumber].innerText = productColor;
        }
    }
        addColor();
    })
    .catch(function(err) {
        // Une erreur est survenue
});