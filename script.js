fetch('https://fakestoreapi.com/products').then((data)=> {
    // console.log(data);
    return data.json();
}).then((completedata)=> {
    // console.log(completedata[2].title);
    // document.getElementById('root').
    // innerHTML = completedata[2].title;
    let data1="";
    completedata.map((values)=> {
        data1+=`
        <div class="card">
            <h1 class="title">${values.title}</h1>
            <img src="${values.image}" alt="image">
            <p>${values.description}</p>
            <p class="category">${values.category}</p>
            <p class="price text-center">${values.price}</p>
        </div>
        `;
    });
    document.getElementById("cards").innerHTML=data1;
}).catch((err)=> {
    console.log(err);
})


//cart section
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger');
    console.log(removeCartItemButtons);
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
// quantity inputs
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

// check if input is a valid number or not a negative number
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}


//update cart total
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        console.log(priceElement, quantityElement)
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100     //prevent long decimal numbers
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}