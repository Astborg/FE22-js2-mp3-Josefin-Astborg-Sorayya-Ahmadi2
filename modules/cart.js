let products = []
//let datavar = ''

async function getProducts(){
  try{
    const baseURL = 'https://webstore-22fa4-default-rtdb.europe-west1.firebasedatabase.app/'
    const url = baseURL + 'Products.json'
    const response = await fetch(url)
    let data = await response.json()
    console.log(data)
    products.push(data)
    //datavar = Object.keys(data)
    console.log(products)
    
    
  }catch(error){
    console.log(error)
  }
  

  }

getProducts()


// let products = [
//   {
//       id: 0,
//       namn: 'Sneaker1',
//       img: '1product',
//       pris: 1500,
//       lager: 10,
//       inCart: 0
//   },
//   {
//       id: 1,
//       namn: 'Sneaker2',
//       img: '2product',
//       pris: 1500,
//       lager: 10,
//       inCart: 0
//   },
//   {
//       id: 2,
//       namn: 'Sneaker3',
//       img: '3product',
//       pris: 1500,
//       lager: 10,
//       inCart: 0
//   },
//   {
//       id: 3,
//       namn: 'Sneaker4',
//       img: '4products',
//       pris: 1500,
//       lager: 10,
//       inCart: 0
//   },
//   {
//       id: 4,
//       namn: 'Sneaker5',
//       img: '5product',
//       pris: 1500,
//       lager: 10,
//       inCart: 0
//   }
// ]
function displayCart(){
let cartItems = localStorage.getItem('productsInCart')
cartItems = JSON.parse(cartItems)
let productGrid = document.querySelector('.grid')
let cartCost = localStorage.getItem('totalCost')
if(cartItems && productGrid){
  productGrid.innerHTML = ''
  Object.values(cartItems).map(item =>{
    productGrid.innerHTML += `
    <div class="product">
    <span>Produkt: ${item.namn}
    <div class="price">Pris: ${item.pris}kr</div>
    <div class="quantity">Antal: ${item.inCart}</div>
    <div class="total">Totalt: ${item.inCart * item.pris}kr</div>`
  })
  productGrid.innerHTML += 
  `<div class="cartTotal">Cart Total:${cartCost}</div>`
  productGrid.innerHTML += `<button onclick="emptyCart()">Empty cart</button>`
  productGrid.innerHTML += `<button onclick="checkout(id)">Checkout</button>`

  
}
}
function emptyCart(){
  let productGrid = document.querySelector('.grid')
  productGrid.innerHTML = ''
  localStorage.clear();
}

displayCart()



    //checkout
    function checkout(id){
            let cartItemsObj = localStorage.getItem('productsInCart')
            let garbo = JSON.parse(cartItemsObj)
            console.log(garbo)

        
            async function patchPost(products) {
              const baseURL = `https://webstore-22fa4-default-rtdb.europe-west1.firebasedatabase.app/`;
              const url = baseURL + `Products.json`;
          
              let cartItemsObj = localStorage.getItem("productsInCart");
              let garbo = JSON.parse(cartItemsObj);
              let cartArray = Object.values(garbo);
          
              let productsToUpdate = {};
          
              if (products) {
                cartArray.forEach((item) => {
                  const productId = item.id;
                  if (productId in products) {
                    const newLager = 10 - item.inCart;
                    const newCart = 0 + item.inCart
                    productsToUpdate[productId] = {
                      productId,
                      inCart: newCart,
                      lager: newLager,
                    };
                  }else{
                    const newLager = 10 - item.inCart;
                    const newCart = 0 + item.inCart
                    productsToUpdate[productId] = {
                      productId,
                      inCart: newCart,
                      lager: newLager,
                    };
                  }
                });
              }
             console.log(productsToUpdate)

              const init = {
                method: "PATCH",
                body: JSON.stringify(productsToUpdate),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              };
          
              const response = await fetch(url, init);
              const data = await response.json();
            }
          
            patchPost(products);
            emptyCart()
      }