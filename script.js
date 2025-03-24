let products = JSON.parse(localStorage.getItem('products')) || [];
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let sales = JSON.parse(localStorage.getItem('sales')) || [];

function showForm(formType) {
    let modalBody = document.getElementById("modal-body");
    
    if (formType === 'productForm') {
        modalBody.innerHTML = `
            <h2>Tambah Produk</h2>
            <label>Nama Produk:</label>
            <input type="text" id="productName">
            <label>Harga:</label>
            <input type="number" id="productPrice">
            <label>Stok:</label>
            <input type="number" id="productStock">
            <button onclick="saveProduct()">Simpan</button>
        `;
    } else if (formType === 'customerForm') {
        modalBody.innerHTML = `
            <h2>Tambah Pelanggan</h2>
            <label>Nama Pelanggan:</label>
            <input type="text" id="customerName">
            <label>No. HP:</label>
            <input type="text" id="customerPhone">
            <button onclick="saveCustomer()">Simpan</button>
        `;
    } else if (formType === 'salesForm') {
        modalBody.innerHTML = `
            <h2>Tambah Transaksi</h2>
            <label>Nama Produk:</label>
            <input type="text" id="saleProduct">
            <label>Jumlah:</label>
            <input type="number" id="saleQuantity">
            <button onclick="saveSale()">Simpan</button>
        `;
    }
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function saveProduct() {
    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;
    let stock = document.getElementById("productStock").value;
    products.push({ name, price, stock });
    localStorage.setItem('products', JSON.stringify(products));
    alert("Produk berhasil disimpan!");
    closeModal();
}

function saveCustomer() {
    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("customerPhone").value;
    customers.push({ name, phone });
    localStorage.setItem('customers', JSON.stringify(customers));
    alert("Pelanggan berhasil disimpan!");
    closeModal();
}

function saveSale() {
    let product = document.getElementById("saleProduct").value;
    let quantity = document.getElementById("saleQuantity").value;
    sales.push({ product, quantity, date: new Date().toLocaleDateString() });
    localStorage.setItem('sales', JSON.stringify(sales));
    alert("Transaksi berhasil disimpan!");
    closeModal();
}

function showReport(reportType) {
    let modalBody = document.getElementById("modal-body");
    if (reportType === 'stockReport') {
        modalBody.innerHTML = `<h2>Laporan Stok</h2>` + products.map(p => `<p>${p.name} - Stok: ${p.stock}</p>`).join('');
    } else if (reportType === 'customerReport') {
        modalBody.innerHTML = `<h2>Laporan Pelanggan</h2>` + customers.map(c => `<p>${c.name} - ${c.phone}</p>`).join('');
    } else if (reportType === 'salesReport') {
        modalBody.innerHTML = `<h2>Rekapitulasi Penjualan</h2>` + sales.map(s => `<p>${s.product} - Jumlah: ${s.quantity} - Tanggal: ${s.date}</p>`).join('');
    }
    document.getElementById("modal").style.display = "block";
}

function searchProduct() {
    let searchValue = document.getElementById("searchProduct").value.toLowerCase();
    let result = products.filter(p => p.name.toLowerCase().includes(searchValue));
    document.getElementById("searchResult").innerHTML = result.map(p => `<p>${p.name} - Rp${p.price}</p>`).join('');
}
