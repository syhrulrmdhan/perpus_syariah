// Database Buku Sederhana
const books = [
    { id: 1, title: "Riyadush Shalihin", author: "Imam An-Nawawi", cat: "Kitab", desc: "Kumpulan hadits shahih tentang akhlak dan adab." },
    { id: 2, title: "Ekonomi Syariah", author: "Dr. Muhammad Syauqi", cat: "Ekonomi", desc: "Panduan sistem keuangan berbasis syariah modern." },
    { id: 3, title: "Sirah Nabawiyah", author: "Syaikh Al-Mubarakfuri", cat: "Sejarah", desc: "Sejarah lengkap perjalanan hidup Rasulullah SAW." },
    { id: 4, title: "Fathul Baari", author: "Ibnu Hajar Al-Asqalani", cat: "Kitab", desc: "Syarah kitab Shahih Al-Bukhari yang fenomenal." }
];

let cart = JSON.parse(localStorage.getItem('pustakaCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const bookGrid = document.getElementById('bookGrid');
    const searchInput = document.getElementById('searchInput');
    const cartCount = document.getElementById('cartCount');
    const modal = document.getElementById('bookModal');
    
    // 1. Fungsi Menampilkan Buku
    function renderBooks(data) {
        bookGrid.innerHTML = '';
        data.forEach(book => {
            const card = document.createElement('article');
            card.className = 'book-card';
            card.innerHTML = `
                <div class="book-visual ${book.cat}">${book.cat}</div>
                <h4>${book.title}</h4>
                <p style="color: #64748b; font-size: 0.9rem;">${book.author}</p>
                <button class="btn-add-cart" onclick="addToCart(${book.id}, event)">+ Pilih Buku</button>
            `;
            card.onclick = () => showDetail(book);
            bookGrid.appendChild(card);
        });
        document.getElementById('visibleCount').innerText = data.length;
    }

    // 2. Fungsi Detail (Modal)
    window.showDetail = (book) => {
        const body = document.getElementById('modalBody');
        body.innerHTML = `
            <span class="arabic-text" style="color: #b45309">Detail Kitab</span>
            <h2 style="margin: 10px 0">${book.title}</h2>
            <p><strong>Penulis:</strong> ${book.author}</p>
            <p style="margin-top: 15px; line-height: 1.6;">${book.desc}</p>
            <p style="margin-top: 10px; color: var(--emerald-light)">Kategori: ${book.cat}</p>
        `;
        modal.style.display = 'block';
    }

    // 3. Fungsi Keranjang
    window.addToCart = (id, event) => {
        event.stopPropagation(); // Mencegah modal terbuka saat klik tombol
        if (!cart.includes(id)) {
            cart.push(id);
            updateCart();
            alert("Buku berhasil ditambahkan ke daftar pinjam!");
        } else {
            alert("Buku sudah ada di daftar.");
        }
    }

    function updateCart() {
        cartCount.innerText = cart.length;
        localStorage.setItem('pustakaCart', JSON.stringify(cart));
    }

    // 4. Fitur Pencarian & Filter
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = books.filter(b => b.title.toLowerCase().includes(val) || b.author.toLowerCase().includes(val));
        renderBooks(filtered);
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.nav-item.active').classList.remove('active');
            item.classList.add('active');
            const filter = item.getAttribute('data-filter');
            const filtered = filter === 'all' ? books : books.filter(b => b.cat === filter);
            renderBooks(filtered);
        });
    });

    // 5. Close Modal
    document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; }

    // Checkout Action
    document.getElementById('checkoutBtn').onclick = () => {
        if(cart.length === 0) return alert("Pilih buku terlebih dahulu.");
        alert(`Syukron Syahrul Ramadhan! ${cart.length} buku berhasil diproses untuk dipinjam.`);
        cart = [];
        updateCart();
    }

    // Init
    renderBooks(books);
    updateCart();
});