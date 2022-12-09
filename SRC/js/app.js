const loadProducts = (produtos, productId ) => {
const parentDiv = document.querySelector(productId)
produtos.array.forEach(produto => {
    


    parentDiv.incertAdjacentHTML ('beforeend')
});
}