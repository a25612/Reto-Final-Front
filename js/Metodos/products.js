window.addEventListener('DOMContentLoaded', (event) => {
    const getProducts = async () => {
        const url = 'http://localhost:8080/Xeneburguer/Controller?ACTION=PRODUCTOS.FIND_ALL';
        try {
            const response = await fetch(url);
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const displayProducts = (products) => {
        products.sort((a, b) => a.id_producto - b.id_producto);
        const productList = document.querySelector('#products_table tbody');
        productList.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');

            const productDetails = `
                <td>${product.id_producto}</td>
                <td>${product.nombre}</td>
                <td>${product.descripcion}</td>
                <td>${product.precio.toFixed(2)}</td>
                <td>${product.id_tipo}</td>
                <td>
                    <button class="action-button view">UPDATE</button>
                </td>
            `;
            row.innerHTML = productDetails;
            productList.appendChild(row);
        });
    };

    const deleteProduct = async (productId) => {
        const url = `http://localhost:8080/Xeneburguer/Controller?ACTION=PRODUCTOS.DELETE&ID_PRODUCTO=${productId}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (response.ok) {
                alert('Producto eliminado exitosamente.');
                getProducts();
            } else {
                throw new Error('Error al eliminar producto.');
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    const addProduct = async (productId, productName, productDescription, productPrice, productType) => {
        const url = `http://localhost:8080/Xeneburguer/Controller?ACTION=PRODUCTOS.ADD&ID_PRODUCTO=${productId}&NOMBRE=${productName}&DESCRIPCION=${productDescription}&PRECIO=${productPrice}&ID_TIPO=${productType}`;
        try {
            const response = await fetch(url, { method: 'POST' });
            if (response.ok) {
                alert('Producto añadido exitosamente.');
                getProducts();
            } else {
                throw new Error('Error al añadir producto.');
            }
        } catch (error) {
            console.error('Error al añadir producto:', error);
        }
    };

    // Evento para eliminar un producto
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', () => {
        const productId = prompt('Ingrese el ID del producto que desea eliminar:');
        if (productId !== null && productId.trim() !== '') {
            deleteProduct(productId);
        } else {
            alert('Debe ingresar un ID válido.');
        }
    });

    // Evento para añadir un producto
    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', () => {
        const productId = prompt('Ingrese el ID del producto:');
        const productName = prompt('Ingrese el nombre del producto:');
        const productDescription = prompt('Ingrese la descripción del producto:');
        const productPrice = prompt('Ingrese el precio del producto:');
        const productType = prompt('Ingrese el ID del tipo de producto:');
        if (productId.trim() !== '' && productName.trim() !== '' && productDescription.trim() !== '' && productPrice.trim() !== '' && productType.trim() !== '') {
            addProduct(productId, productName, productDescription, productPrice, productType);
        } else {
            alert('Debe ingresar todos los campos.');
        }
    });

    getProducts();
});