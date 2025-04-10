let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartIcon = document.querySelector('.cart-icon');
const cartBadge = document.querySelector('.cart-badge');

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    let total = 0;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="5" class="text-center py-4">Tu carrito está vacío</td></tr>';
        cartBadge.textContent = '0';
        cartTotalElement.textContent = 'S/. 0.00';
        return;
    }
    
    cart.forEach((item, index) => {
        total += item.price;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <img src="${item.image}" width="50" height="50" class="rounded me-3" alt="${item.name}">
                    <span>${item.name}</span>
                </div>
            </td>
            <td>S/. ${item.price.toFixed(2)}</td>
            <td>1</td>
            <td>S/. ${item.price.toFixed(2)}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });
    
    cartBadge.textContent = cart.length;
    cartTotalElement.textContent = `S/. ${total.toFixed(2)}`;
    
    saveCart();
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cart.splice(index, 1);
            updateCart();
            
            showToast('Producto eliminado', 'El producto ha sido eliminado de tu carrito.');
        });
    });
}

function showToast(title, message) {
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.style.zIndex = '11';
    toast.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-danger text-white">
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body bg-dark">
                ${message}
            </div>
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = JSON.parse(this.getAttribute('data-product'));
        cart.push(product);
        updateCart();
        
        cartIcon.classList.add('animate__animated', 'animate__bounce');
        setTimeout(() => {
            cartIcon.classList.remove('animate__animated', 'animate__bounce');
        }, 1000);
        
        showToast('¡Producto agregado!', `${product.name} ha sido añadido al carrito.`);
    });
});

document.getElementById('addToCartBtn')?.addEventListener('click', function() {
    const product = JSON.parse(this.getAttribute('data-product'));
    cart.push(product);
    updateCart();
    
    const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    productModal.hide();
    
    cartIcon.classList.add('animate__animated', 'animate__bounce');
    setTimeout(() => {
        cartIcon.classList.remove('animate__animated', 'animate__bounce');
    }, 1000);
    
    showToast('¡Producto agregado!', `${product.name} ha sido añadido al carrito.`);
});

document.getElementById('checkoutBtn')?.addEventListener('click', function() {
    if (cart.length === 0) {
        showToast('Carrito vacío', 'Tu carrito está vacío. Agrega productos antes de finalizar.');
        return;
    }
    
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    cartModal.hide();
    
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
    
    cart = [];
    updateCart();
});

updateCart();

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.plan-selector input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const price = this.getAttribute('data-price');
            const months = this.getAttribute('data-months');
            const parentCard = this.closest('.service-card');
            
            parentCard.querySelector('.price-tag').textContent = `S/${parseFloat(price).toFixed(2)}`;
            
            const addToCartBtn = parentCard.querySelector('.add-to-cart');
            const productData = JSON.parse(addToCartBtn.getAttribute('data-product'));
            
            productData.name = productData.name.split(' (')[0] + ` (${months} Mes${months > 1 ? 'es' : ''})`;
            productData.price = parseFloat(price);
            
            addToCartBtn.setAttribute('data-product', JSON.stringify(productData));
        });
    });
});