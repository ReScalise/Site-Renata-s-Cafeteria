const loadProducts = (products, divId) => {
  const parent = document.querySelector(divId)
  products.forEach(product => {
    const html = `
      <article class="prato">
        <img src="${product.image}" alt="${product.title}">
        <h4>${product.title}</h4>
        <h4>R$ ${product.value}</h4>
        <p>${product.description}</p>
        <button type="button" onclick="modalTrigger(${product.id})">Quero este prato</button>
      </article>
    `
    parent.insertAdjacentHTML('beforeend', html)
  })
}

const modalTrigger = (productId) => {
    const modal = document.querySelector('.modal')
    
    if (productId != null) {
      const product = produtos.filter( product => product.id == productId)[0]
      modal.querySelector('#title').value = product.title
    }
  
    modal.classList.contains('hide') == true ? modal.classList.remove('hide') : modal.classList.add('hide')
  }
  
  const whatsappLinkGenerator = (phoneNumber, productTitle, productQuantity, buyerName, buyerAddress, buyerPayment) => {
    const baseUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Olá eu quero: ${productQuantity} ${productTitle} - Entregar para ${buyerName} no endereco: ${buyerAddress} - A forma de pagamento será: ${buyerPayment}`
    window.location.href = baseUrl
  }
  
  const checkout = (phoneNumber) => {
    const form = document.querySelector('#form-product')
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const productTitle = form.querySelector('input#title').value
      const productQuantity = form.querySelector('input#quantity').value
      const buyerName = form.querySelector('input#name').value
      const buyerAddress = form.querySelector('input#address').value
      const buyerPayment = form.querySelector('select#payment_type').value
      console.log(productTitle, productQuantity, buyerName, buyerAddress, buyerPayment)
      whatsappLinkGenerator(phoneNumber, productTitle, productQuantity, buyerName, buyerAddress, buyerPayment)
    })
  }
  
  const search = (products, searchTerm) => products.filter( product => product.title.includes(`${searchTerm}`) || product.description.includes(`${searchTerm}`)) 
  
  const loadSearch = (form, productsDivId) => {
    const input = form.querySelector('#inputSearch')
    const productsDiv = document.querySelector(productsDivId)
  
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      if (input.value != '' && input.value != null) {
        productsDiv.querySelectorAll('.prato').forEach(prato => {
          prato.remove()
        })
  
        let results = search(produtos, input.value)
        results.forEach(product => {
          const html = `
            <article class="prato">
              <img src="${product.image}" alt="${product.title}">
              <h4>${product.title}</h4>
              <h4>R$ ${product.value}</h4>
              <p>${product.description}</p>
              <button type="button" onclick="modalTrigger(${product.id})">Quero este prato</button>
            </article>
          `
          productsDiv.insertAdjacentHTML('beforeend', html)
        })
      }
    })
  }
  
  loadProducts(produtos, '#pratos-div')
  checkout('5596984020861')
  
  const form = document.querySelector('#formSearch')
  loadSearch(form, '#pratos-div', '#buscas-div')