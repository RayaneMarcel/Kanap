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
  .then(products => addItems(products))
  .catch((error) => {
    //if error => display error message
    const sectionTitles = document.getElementsByClassName('titles')[0];
    const titlesH2 = sectionTitles.getElementsByTagName('h2')[0]
    titlesH2.innerHTML = 'Erreur de connexion...<br>Impossible de charger les produits !';
    titlesH2.style.fontSize = '20px';    
});

// creating elements in the DOM to add products on the home page
// like this structure : <a href="./product.html?id=42">
//                          <article>
//                              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
//                              <h3 class="productName">Kanap name1</h3>
//                              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
//                          </article>
//                      </a>

function addItems(products) {
  const productsTotal = products.length;
  const sectionItems = document.getElementsByClassName('items')[0];  
  for (let i=0; i<productsTotal; i++){
    sectionItems.appendChild(createNode('a'));
    sectionItems.getElementsByTagName('a')[i].append(createNode('article'));
    sectionItems.getElementsByTagName('article')[i].append(createNode('img'), createNode('h3'), createNode('p'));
    
    const productId = products[i]._id;
    const productUrl = './product.html?id=' + productId;
      sectionItems.getElementsByTagName('a')[i].setAttribute('href', productUrl);
    
    const imageSource = products[i].imageUrl;
      sectionItems.getElementsByTagName('img')[i].setAttribute('src', imageSource);
    
    const imageAlt = products[i].altTxt;
      sectionItems.getElementsByTagName('img')[i].setAttribute('alt', imageAlt);
    
    const productName = products[i].name;
      sectionItems.getElementsByTagName('h3')[i].setAttribute('class', 'productName');
      sectionItems.getElementsByClassName('productName')[i].innerHTML = productName;
    
    const productDescription = products[i].description;
      sectionItems.getElementsByTagName('p')[i].setAttribute('class', 'productDescription');
      sectionItems.getElementsByClassName('productDescription')[i].innerHTML = productDescription;
  }
}