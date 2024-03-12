const getStoredCart =()=>{
    const StoredCartString = localStorage.getItem('Cart')
    if(StoredCartString){
        return JSON.parse(StoredCartString);
    }
    return[];
}
const saveToLs = (cart) =>{
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('Cart', cartStringified);
}

const addToLs = id => {
    const cart = getStoredCart();
    cart.push(id);
    saveToLs(cart)
}

const removeLs = id => {
    const cart = getStoredCart()
    
}

export{addToLs,getStoredCart}