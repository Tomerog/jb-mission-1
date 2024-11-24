const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productType = document.getElementById('productType');
const productImage = document.getElementById('productImage');
const productForm = document.getElementById('productForm');
const cartTableBody = document.querySelector('#cartTable tbody');

let products = [];

function addProduct(event) {
    event.preventDefault();
    const name = productName.value.trim();
    const price = parseFloat(productPrice.value.trim());
    const type = productType.value;
    const imageUrl = productImage.value.trim();

    if (!name || isNaN(price) || !type || !imageUrl) {
        alert('All fields are required!');
        return;
    }

    const product = { name, price, type, imageUrl };
    products.push(product);

    updateCartTable();
    productForm.reset();
}

function updateCartTable() {
    cartTableBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.type}</td>
            <td><img src="${product.imageUrl}" alt="${product.name}" style="max-width: 100px;"></td>
            <td><button class="deleteButton" data-index="${index}">Delete</button></td>
        `;
        cartTableBody.appendChild(row);

        row.querySelector('.deleteButton').addEventListener('click', () => {
            const productIndex = row.querySelector('.deleteButton').getAttribute('data-index');
            products.splice(productIndex, 1);
            updateCartTable();
        });
    });
}

productForm.addEventListener('submit', addProduct);
