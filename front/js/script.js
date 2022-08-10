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

    const productsTotal = products.length;
    const sectionItems = document.getElementsByClassName('items')[0];
   
    // add elements tag in the DOM
    function addItems() {
      for (let productNumber=0; productNumber<productsTotal; productNumber++){
        sectionItems.append(createNode('a'));
        sectionItems.getElementsByTagName('a')[productNumber].append(createNode('article'));
        sectionItems.getElementsByTagName('article')[productNumber].append(createNode('img'), createNode('h3'), createNode('p'));
      }
    }
    // fill the differents elements whith products details
    function fillItems() {
      for (let productNumber=0; productNumber<productsTotal; productNumber++){
        const productId = products[productNumber]._id;
        const imageSource = products[productNumber].imageUrl;
        const imageAlt = products[productNumber].altTxt;
        const productName = products[productNumber].name;
        const productDescription = products[productNumber].description;
        const productUrl = './product.html?id=' + productId;
        sectionItems.getElementsByTagName('a')[productNumber].setAttribute('href', productUrl);
        sectionItems.getElementsByTagName('img')[productNumber].setAttribute('src', imageSource);
        sectionItems.getElementsByTagName('img')[productNumber].setAttribute('alt', imageAlt);
        sectionItems.getElementsByTagName('h3')[productNumber].setAttribute('class', 'productName');
        sectionItems.getElementsByTagName('p')[productNumber].setAttribute('class', 'productDescription');
        sectionItems.getElementsByClassName('productDescription')[productNumber].innerHTML = productDescription;
        sectionItems.getElementsByClassName('productName')[productNumber].innerHTML = productName;
      }
    }

    addItems();
    fillItems();
    console.log(products);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
