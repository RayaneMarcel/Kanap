// create an Element
function createNode(element) {
  return document.createElement(element);
}

// request all products on the API
fetch('http://localhost:3000/api/products')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((products) => {
    const productsTotal = products.length;
    const sectionItems = document.getElementsByClassName('items')[0];   
    // add products on the page creating elements in the DOM
    function addItems() {
      for (let productNumber=0; productNumber<productsTotal; productNumber++){
        sectionItems.append(createNode('a'));
        sectionItems.getElementsByTagName('a')[productNumber].append(createNode('article'));
        sectionItems.getElementsByTagName('article')[productNumber].append(createNode('img'), createNode('h3'), createNode('p'));
        
        const productId = products[productNumber]._id;
        const productUrl = './product.html?id=' + productId;
          sectionItems.getElementsByTagName('a')[productNumber].setAttribute('href', productUrl);
        
        const imageSource = products[productNumber].imageUrl;
          sectionItems.getElementsByTagName('img')[productNumber].setAttribute('src', imageSource);
        
        const imageAlt = products[productNumber].altTxt;
          sectionItems.getElementsByTagName('img')[productNumber].setAttribute('alt', imageAlt);
        
        const productName = products[productNumber].name;
          sectionItems.getElementsByTagName('h3')[productNumber].setAttribute('class', 'productName');
          sectionItems.getElementsByClassName('productName')[productNumber].innerHTML = productName;
        
        const productDescription = products[productNumber].description;
          sectionItems.getElementsByTagName('p')[productNumber].setAttribute('class', 'productDescription');
          sectionItems.getElementsByClassName('productDescription')[productNumber].innerHTML = productDescription;
        }
    }
    addItems();
    console.log(products);
  });
