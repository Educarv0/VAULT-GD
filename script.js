// Exibir produtos 
function displayProducts(productsArray) {
    const productsContainer = document.getElementById('productsContainer');

    if (!productsContainer) {
        console.error('Container de produtos não encontrado!');
        return;
    }

    productsContainer.innerHTML = '';

    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.setAttribute('data-category', product.category);

        let badgeHTML = '';
        if (product.badge) {
            badgeHTML = `<span class="product-badge">${product.badge}</span>`;
        }

        productCard.innerHTML = `
            ${badgeHTML}
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <div class="product-overlay">
                    <button class="quick-view" data-id="${product.id}">Visualizar</button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="product-stars">
                        ${generateStarRating(product.rating)}
                    </div>
                    <span class="product-reviews">(${product.reviews})</span>
                </div>
                <p class="product-price">${product.price}</p>
                <p class="product-category">${product.category}</p>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Adicionar ao carrinho
                </button>
            </div>
        `;
        productsContainer.appendChild(productCard);

        // Adicionar evento de clique ao botão de adicionar ao carrinho
        const addButton = productCard.querySelector('.add-to-cart');
        addButton.addEventListener('click', () => {
            addToCart(product.id);
        });

        // Adicionar evento de clique ao botão de visualização
        const viewButton = productCard.querySelector('.quick-view');
        viewButton.addEventListener('click', () => {
            openProductModal(product);
        });

        // Efeito de surgimento
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(20px)';
        productCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        }, 100);
    });
} // Dados dos produtos (mantendo 15 produtos)
const products = [{
        id: 1,
        name: "Blusa Selianne Francesa de Cetim",
        price: "R$ 61,99",
        category: "feminino",
        image: "https://img.ltwebstatic.com/v4/j/pi/2025/07/11/80/1752224487bb8217fc06e5a918ad34501a3d4075c5_thumbnail_405x.webp",
        badge: "Novo",
        rating: 4.5,
        reviews: 42,
    },
    {
        id: 2,
        name: "Manfinity Mode Camisa Social Masculina de Manga Longa",
        price: "R$ 95,95",
        category: "masculino",
        image: "https://img.ltwebstatic.com/images3_pi/2024/11/18/a4/17319229650c684511e01416679a6523adf6dd505b_thumbnail_560x.webp",
        rating: 4.2,
        reviews: 28,
    },
    {
        id: 3,
        name: "Tênis/Sapatenis Masculino em Couro Legítimo com Zíper Lateral – Marrom",
        price: "R$ 59,90",
        category: "calcados",
        image: "https://static.netshoes.com.br/produtos/tenis-sapatenis-couro-legitimo-confort-leve-macio/38/58X-1141-138/58X-1141-138_zoom1.jpg?ts=1695662785&ims=1088x",
        badge: "Promo",
        rating: 4.8,
        reviews: 67,
    },
    {
        id: 4,
        name: "Bolsa Feminina de Couro PU para Laptop 15,6 Impermeável",
        price: "R$ 259,00",
        category: "acessorios",
        image: "https://m.media-amazon.com/images/I/81cqlwpIxoL._AC_SX569_.jpg",
        rating: 4.3,
        reviews: 35,
    },
    {
        id: 5,
        name: "Vestido Maxi Montenegro",
        price: "R$ 299,00",
        category: "feminino",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_777622-MLB85540809432_062025-F-vestido-de-noite-preto-de-manga-comprida-a.webp",
        rating: 4.7,
        reviews: 53,
    },
    {
        id: 6,
        name: "PoloTech Marinho Navy",
        price: "R$ 149,90",
        category: "masculino",
        image: "https://acdn-us.mitiendanube.com/stores/005/697/673/products/basicus-12-057509-52e58754d5c9ca7c0e17487316048049-1024-1024.webp",
        badge: "Lançamento",
        rating: 4.0,
        reviews: 19,
    },
    {
        id: 7,
        name: "Sandália Feminina Casual Clássica Salto Médio Grosso Bloco",
        price: "R$ 54,50",
        category: "calcados",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_891270-MLB79754352877_102024-F-sandalia-feminina-casual-classica-salto-medio-grosso-bloco.webp",
        rating: 4.6,
        reviews: 1533,
    },
    {
        id: 8,
        name: "Óculos de Sol Oxer Redondo Adulto – Preto",
        price: "R$ 59,62",
        category: "acessorios",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_631390-MLU77387420409_072024-F.webp",
        rating: 4.4,
        reviews: 31,
    },
    {
        id: 9,
        name: "Saia Longa Feminina Couro Cintura Alta Plissada Elegante",
        price: "R$ 59,99",
        category: "feminino",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_936754-MLB84466088766_052025-F-saia-longa-feminina-couro-cintura-alta-plissada-elegante.webp",
        rating: 4.1,
        reviews: 24,
    },
    {
        id: 10,
        name: "Calça Alfataria Social com Cinto Feminina Pantalona",
        price: "R$ 50,99",
        category: "masculino",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_857588-MLB88227722990_072025-F-calca-masculina-jeans-reta-elastano-lisa-tradicional-casual.webp",
        badge: "Destaque",
        rating: 4.0,
        reviews: 18,
    },
    {
        id: 11,
        name: "Calça Alfataria Social com Cinto Feminina Pantalona",
        price: "R$ 29,90",
        category: "feminino",
        image: "https://img.ltwebstatic.com/v4/j/spmp/2025/04/24/4a/1745500450a70b9723d2e88986e6b119ff81b209bf_thumbnail_405x.webp",
        rating: 4.3,
        reviews: 81,
    },
    {
        id: 12,
        name: "Calvin Klein Cinto Em Couro Dupla Face Masculino Dia A Dia",
        price: "R$ 79,90",
        category: "acessorios",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_695599-MLB85246242961_052025-F-calvin-klein-cinto-em-couro-dupla-face-masculino-dia-a-dia.webp",
        rating: 4.7,
        reviews: 56,
    },
    {
        id: 13,
        name: "Blazer Feminino Alfaiataria com Lapela e Botão",
        price: "R$ 156,99",
        category: "feminino",
        image: "https://img.ltwebstatic.com/v4/j/spmp/2025/06/15/24/17499478421b27037379b6f2783a7c19076f620e18_thumbnail_405x.webp",
        badge: "Elegante",
        rating: 4.9,
        reviews: 72,
    },
    {
        id: 14,
        name: "Terno Italiano Slim",
        price: "R$ 169,90",
        category: "masculino",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_635728-MLB86163086262_062025-F-terno-italiano-slim-promoco-imperdivel-todas-as-cores.webp",
        rating: 4.2,
        reviews: 38,
    },
    {
        id: 15,
        name: "Coturno Feminino Bota Tratorada Salto Baixo Confortável",
        price: "R$ 69,99",
        category: "calcados",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_893251-MLB49291577009_032022-F-coturno-feminino-bota-tratorada-salto-baixo-confortavel.webp",
        rating: 4.6,
        reviews: 22996,
    }
];
// Elementos DOM
const productsContainer = document.getElementById('productsContainer');
const filterButtons = document.querySelectorAll('.filter-btn');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const loginBtn = document.getElementById('loginBtn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.querySelector('.cart-count');
const notification = document.getElementById('notification');
const cartModal = document.getElementById('cart-modal');
const overlay = document.getElementById('overlay');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartLink = document.getElementById('cart-link');
const selectAllCheckbox = document.getElementById('select-all');
const selectedCount = document.getElementById('selected-count');

// Elementos do carrossel
const carouselSlides = document.querySelector('.carousel-slides');
const carouselDots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

// Modal de produto
const productModal = document.getElementById('product-modal');
const productModalImage = document.getElementById('product-modal-image');
const productModalTitle = document.getElementById('product-modal-title');
const productModalPrice = document.getElementById('product-modal-price');
const productModalDescription = document.getElementById('product-modal-description');
const closeProductModal = document.getElementById('close-product-modal');
const addToCartFromModal = document.getElementById('add-to-cart-modal');

// Função de debug para verificar os produtos
function debugProducts() {
    console.log('=== DEBUG DOS PRODUTOS ===');
    products.forEach(product => {
        console.log(`ID: ${product.id}, Nome: ${product.name}, Categoria: ${product.category}, Subcategoria: ${product.subcategory}`);
    });

    // Verificar quantos produtos por subcategoria
    const countBySubcategory = {};
    products.forEach(product => {
        const key = `${product.category}-${product.subcategory}`;
        countBySubcategory[key] = (countBySubcategory[key] || 0) + 1;
    });
    console.log('=== CONTAGEM POR SUBCATEGORIA ===', countBySubcategory);
}

// Chame esta função
debugProducts();

// 3. FUNÇÃO DE FILTRAGEM SIMPLIFICADA
function filterProductsByCategory(category, subcategory = null) {
    console.log('=== FILTRO ATIVADO ===');
    console.log('Categoria:', category);
    console.log('Subcategoria:', subcategory);

    let filteredProducts = [];

    if (category === 'all') {
        filteredProducts = products;
    } else if (subcategory) {
        // Filtro por subcategoria
        filteredProducts = products.filter(product => {
            const match = product.category === category && product.subcategory === subcategory;
            console.log(`Produto ${product.id}: categoria=${product.category}, sub=${product.subcategory}, match=${match}`);
            return match;
        });
    } else {
        // Filtro por categoria principal
        filteredProducts = products.filter(product => product.category === category);
    }

    console.log('Produtos encontrados:', filteredProducts.length);
    console.log('Produtos:', filteredProducts);

    displayProducts(filteredProducts);

    // Fechar o menu hambúrguer (se estiver aberto)
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Rolar suavemente para a seção de produtos
    document.querySelector('.products').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// 4. EVENTOS DE CLIQUE - SOLUÇÃO ALTERNATIVA
document.addEventListener('click', function(e) {
    // Verificar se é um link do menu principal
    if (e.target.classList.contains('nav-link') && e.target.hasAttribute('data-category')) {
        e.preventDefault();
        const category = e.target.getAttribute('data-category');
        console.log('Menu principal clicado:', category);
        filterProductsByCategory(category);
    }

    // Verificar se é um link do submenu
    if (e.target.classList.contains('submenu-link')) {
        e.preventDefault();
        const category = e.target.getAttribute('data-category');
        const subcategory = e.target.getAttribute('data-subcategory');
        console.log('Submenu clicado:', category, subcategory);
        filterProductsByCategory(category, subcategory);
    }
});

// Evento para o link de Pedidos Finalizados
document.getElementById('orders-link').addEventListener('click', (e) => {
    e.preventDefault();

    // Fechar o menu hambúrguer (se estiver aberto)
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    alert('Funcionalidade de Pedidos Finalizados em desenvolvimento');
});

// Carrinho de compras
let cart = [];
let cartItemCount = 0;
let selectedItems = new Set();
let currentProduct = null;

// ==================== FIREBASE AUTHENTICATION ====================

// Verificar autenticação do usuário
function checkUserAuth() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('Usuário logado:', user);
            updateUIForLoggedInUser(user);
        } else {
            console.log('Usuário não logado');
            updateUIForLoggedOutUser();
        }
    });
}

function updateUIForLoggedInUser(user) {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        const displayName = user.displayName || 'Minha Conta';
        const shortName = displayName.length > 12 ? displayName.substring(0, 12) + '...' : displayName;

        loginBtn.innerHTML = `<i class="fas fa-user-check"></i> ${shortName}`;
        loginBtn.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
        loginBtn.onclick = function() {
            showUserMenu(user);
        };
    }
}

function updateUIForLoggedOutUser() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.innerHTML = '<i class="fas fa-user"></i> Entrar';
        loginBtn.style.background = 'linear-gradient(45deg, #001f6f, #0030a0)';
        loginBtn.onclick = function() {
            window.location.href = 'login.html';
        };
    }
}

function showUserMenu(user) {
    const menuHTML = `
        <div style="position: absolute; top: 100%; right: 0; background: white; color: #333; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); padding: 15px; min-width: 200px; z-index: 1000;">
            <div style="text-align: center; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;">
                <img src="${user.photoURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}" 
                     style="width: 50px; height: 50px; border-radius: 50%; margin-bottom: 5px;">
                <p style="margin: 5px 0; font-weight: bold;">${user.displayName || 'Usuário'}</p>
                <p style="margin: 0; font-size: 12px; color: #666;">${user.email}</p>
            </div>
            <button onclick="viewProfile()" style="width: 100%; padding: 8px; background: #26f7fe; color: white; border: none; border-radius: 4px; margin-bottom: 5px; cursor: pointer;">Meu Perfil</button>
            <button onclick="logout()" style="width: 100%; padding: 8px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">Sair</button>
        </div>
    `;

    const menuOverlay = document.createElement('div');
    menuOverlay.innerHTML = menuHTML;
    menuOverlay.style.position = 'fixed';
    menuOverlay.style.top = '0';
    menuOverlay.style.left = '0';
    menuOverlay.style.width = '100%';
    menuOverlay.style.height = '100%';
    menuOverlay.style.zIndex = '999';
    menuOverlay.style.background = 'transparent';

    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            document.body.removeChild(menuOverlay);
        }
    });

    document.body.appendChild(menuOverlay);
}

function logout() {
    firebase.auth().signOut().then(() => {
        localStorage.removeItem('user');
        alert('Logout realizado com sucesso!');
        window.location.reload();
    }).catch((error) => {
        console.error('Erro no logout:', error);
        alert('Erro ao fazer logout: ' + error.message);
    });
}

function viewProfile() {
    alert('Página de perfil em desenvolvimento!');
}

// ==================== FIM DO CÓDIGO FIREBASE ====================

// Função para gerar estrelas de avaliação
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';

    // Estrelas cheias
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    // Meia estrela
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    // Estrelas vazias
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

// Função para mostrar notificação
function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.querySelector('span').textContent = message;

    if (isError) {
        notification.classList.add('removed');
    } else {
        notification.classList.remove('removed');
    }

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Função para atualizar contador do carrinho
function updateCartCount() {
    cartCount.textContent = cartItemCount;

    // Animação no ícone do carrinho
    cartBtn.classList.add('added');
    cartCount.classList.add('added');

    setTimeout(() => {
        cartBtn.classList.remove('added');
        cartCount.classList.remove('added');
    }, 500);
}

// Função para abrir o carrinho
function openCart() {
    cartModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateCartDisplay();
}

// Adicionar evento de clique ao botão do carrinho no header
cartBtn.addEventListener('click', openCart);

// Adicionar evento de clique ao link do carrinho no menu
cartLink.addEventListener('click', function(e) {
    e.preventDefault();
    openCart();
});

// Adicionar evento de clique para fechar o carrinho
closeCart.addEventListener('click', closeCartModal);
overlay.addEventListener('click', closeCartModal);

// CSS para o botão Finalizar Compra - Adicione no seu styles.css
const finalizarCompraStyle = `
    .btn-finalizar {
        display: block;
        width: 100%;
        padding: 15px;
        background: linear-gradient(45deg, #26f7fe, #1a8f9e);
        color: white;
        text-decoration: none;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        margin-top: 15px;
        box-shadow: 0 4px 15px rgba(38, 247, 254, 0.3);
    }

    .btn-finalizar:hover {
        background: linear-gradient(45deg, #1a8f9e, #26f7fe);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(38, 247, 254, 0.5);
    }

    .btn-finalizar:disabled {
        background: #ccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

// Adicionar o CSS dinamicamente
const style = document.createElement('style');
style.textContent = finalizarCompraStyle;
document.head.appendChild(style);

// Função para fechar o carrinho
function closeCartModal() {
    cartModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Função para abrir a página de detalhes do produto
function openProductModal(product) {
    // Redirecionar para a página de detalhes do produto
    window.location.href = `detalhes-produto.html?id=${product.id}`;
}

// Função para fechar o modal de produto
function closeProductModalFunc() {
    productModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
        cartTotalPrice.textContent = 'R$ 0,00';
        document.querySelector('.cart-select-all').style.display = 'none';
        return;
    }

    let cartHTML = `
        <div class="cart-select-all">
            <label class="select-all-label">
                <input type="checkbox" id="select-all">
                <span class="checkmark"></span>
                Selecionar todos
            </label>
            <span class="selected-count" id="selected-count">0 selecionados</span>
        </div>
    `;

    let total = 0;

    cart.forEach(item => {
        const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
        const itemTotal = price * item.quantity;
        total += itemTotal;
        const isSelected = selectedItems.has(item.id);

        cartHTML += `
            <div class="cart-item ${isSelected ? 'selected' : ''}" data-id="${item.id}">
                <label class="item-select">
                    <input type="checkbox" class="item-checkbox" data-id="${item.id}" ${isSelected ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">${item.price}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartItems.innerHTML = cartHTML;
    cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    updateSelectedCount();

    // Adicionar eventos aos botões de quantidade
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            decreaseQuantity(id);
        });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            increaseQuantity(id);
        });
    });

    // Adicionar eventos aos botões de remover
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
            removeFromCart(id);
        });
    });

    // Adicionar eventos aos checkboxes
    document.querySelectorAll('.item-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            toggleItemSelection(id, e.target.checked);
        });
    });

    // Adicionar evento ao checkbox "Selecionar todos"
    const selectAll = document.getElementById('select-all');
    if (selectAll) {
        selectAll.addEventListener('change', (e) => {
            toggleSelectAll(e.target.checked);
        });

        // Atualizar estado do checkbox "Selecionar todos"
        selectAll.checked = selectedItems.size === cart.length && cart.length > 0;
    }
}

// Função para atualizar a contagem de itens selecionados
function updateSelectedCount() {
    const selectedCountElement = document.getElementById('selected-count');
    if (selectedCountElement) {
        selectedCountElement.textContent = `${selectedItems.size} selecionados`;
    }
}

// Função para selecionar/desselecionar todos os itens
function toggleSelectAll(checked) {
    if (checked) {
        cart.forEach(item => {
            selectedItems.add(item.id);
        });
    } else {
        selectedItems.clear();
    }
    updateCartDisplay();
}

// Função para alternar a seleção de um item
function toggleItemSelection(id, isSelected) {
    if (isSelected) {
        selectedItems.add(id);
    } else {
        selectedItems.delete(id);
    }
    updateSelectedCount();

    // Atualizar estado do checkbox "Selecionar todos"
    const selectAll = document.getElementById('select-all');
    if (selectAll) {
        selectAll.checked = selectedItems.size === cart.length && cart.length > 0;
    }
}

// Função para aumentar a quantidade de um item
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        cartItemCount += 1;
        updateCartCount();
        updateCartDisplay();
    }
}

// Função para diminuir a quantidade de um item
function decreaseQuantity(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
            cartItemCount -= 1;
        } else {
            cart.splice(itemIndex, 1);
            cartItemCount -= 1;
            selectedItems.delete(productId);
        }
        updateCartCount();
        updateCartDisplay();
    }
}

// Função para remover item do carrinho
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        const itemName = cart[itemIndex].name;
        cartItemCount -= cart[itemIndex].quantity;
        cart.splice(itemIndex, 1);
        selectedItems.delete(productId);
        updateCartCount();

        // Animação de remoção
        const itemElement = document.querySelector(`.cart-item[data-id="${productId}"]`);
        if (itemElement) {
            itemElement.style.opacity = '0';
            itemElement.style.transform = 'translateX(100px)';
            itemElement.style.transition = 'all 0.3s ease';

            setTimeout(() => {
                updateCartDisplay();
                showNotification(`${itemName} removido do carrinho!`, true);
            }, 300);
        } else {
            updateCartDisplay();
            showNotification(`${itemName} removido do carrinho!`, true);
        }
    }
}

// Função para adicionar produto ao carrinho
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);

    if (product) {
        // Verificar se o produto já está no carrinho
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        cartItemCount += quantity;
        updateCartCount();
        showNotification(`${quantity > 1 ? quantity + ' ' : ''}${product.name} adicionado ao carrinho!`);

        // Efeito visual no botão
        const addButton = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
        if (addButton) {
            addButton.classList.add('added');
            addButton.innerHTML = '<i class="fas fa-check"></i> Adicionado';

            setTimeout(() => {
                addButton.classList.remove('added');
                addButton.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar ao carrinho';
            }, 2000);
        }
    }
}

// Exibir produtos
function displayProducts(productsArray) {
    productsContainer.innerHTML = '';

    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.setAttribute('data-category', product.category);

        let badgeHTML = '';
        if (product.badge) {
            badgeHTML = `<span class="product-badge">${product.badge}</span>`;
        }

        productCard.innerHTML = `
            ${badgeHTML}
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <div class="product-overlay">
                    <button class="quick-view" data-id="${product.id}">Visualizar</button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="product-stars">
                        ${generateStarRating(product.rating)}
                    </div>
                    <span class="product-reviews">(${product.reviews})</span>
                </div>
                <p class="product-price">${product.price}</p>
                <p class="product-category">${product.category}</p>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Adicionar ao carrinho
                </button>
            </div>
        `;
        productsContainer.appendChild(productCard);

        // Adicionar evento de clique ao botão de adicionar ao carrinho
        const addButton = productCard.querySelector('.add-to-cart');
        addButton.addEventListener('click', () => {
            addToCart(product.id);
        });

        // Adicionar evento de clique ao botão de visualização
        const viewButton = productCard.querySelector('.quick-view');
        viewButton.addEventListener('click', () => {
            openProductModal(product);
        });

        // Efeito de surgimento
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(20px)';
        productCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Filtragem de produtos pelos botões
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover classe active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Adicionar classe active ao botão clicado
        button.classList.add('active');

        const category = button.getAttribute('data-category'); // Mudei de data-filter para data-category

        if (category === 'all') {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(product => product.category === category);
            displayProducts(filteredProducts);
        }
    });
});

// Menu hambúrguer
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Busca de produtos
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm.trim() === '') {
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        return;
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    displayProducts(filteredProducts);

    // Atualizar botões de filtro
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-filter="all"]').classList.add('active');
}

// Submenu em dispositivos móveis
if (window.innerWidth <= 900) {
    const navItems = document.querySelectorAll('.nav-menu > li');
    navItems.forEach(item => {
        if (item.querySelector('.submenu')) {
            item.addEventListener('click', function(e) {
                if (e.target === this || e.target.parentElement === this) {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            });
        }
    });
}

// Funcionalidade do carrossel
let currentSlide = 0;

function goToSlide(slideIndex) {
    if (slideIndex < 0) slideIndex = 3;
    if (slideIndex > 3) slideIndex = 0;

    currentSlide = slideIndex;
    carouselSlides.style.transform = `translateX(-${currentSlide * 25}%)`;

    // Atualizar dots
    carouselDots.forEach(dot => dot.classList.remove('active'));
    carouselDots[currentSlide].classList.add('active');
}

// Event listeners para navegação do carrossel
prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

// Event listeners para dots do carrossel
carouselDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        goToSlide(slideIndex);
    });
});

// Auto-play do carrossel
let carouselInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);

// Pausar auto-play ao passar o mouse sobre o carrossel
const carousel = document.querySelector('.hero-carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
});

// Função para os botões do carrossel
function setupCarouselButtons() {
    const heroButtons = document.querySelectorAll('.hero-btn');

    heroButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            switch (index) {
                case 0: // "Ver Coleção"
                    filterProductsByCategory('all');
                    break;
                case 1: // "Comprar Agora"
                    filterProductsByCategory('masculino');
                    break;
                case 2: // "Aproveitar Ofertas"
                    filterProductsByCategory('calcados');
                    break;
                case 3: // "Começar a Comprar"
                    filterProductsByCategory('acessorios');
                    break;
            }
        });
    });
}

// Função para mostrar produtos com desconto
function showDiscountedProducts() {
    const discountedProducts = products.filter(product =>
        product.badge && product.badge.toLowerCase().includes('promo')
    );

    displayProducts(discountedProducts);

    // Atualizar botões de filtro
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Adicionar destaque visual
    const productsSection = document.querySelector('.products');
    productsSection.scrollIntoView({ behavior: 'smooth' });

    // Efeito especial para produtos em promoção
    setTimeout(() => {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            if (card.querySelector('.product-badge')) {
                card.style.animation = 'pulse 2s infinite';
            }
        });
    }, 500);
}

// Função para verificar se todas as subcategorias estão corretas
function verifySubcategories() {
    console.log('=== VERIFICAÇÃO DE SUBCATEGORIAS ===');

    const subcategories = {};

    products.forEach(product => {
        if (!subcategories[product.category]) {
            subcategories[product.category] = new Set();
        }
        subcategories[product.category].add(product.subcategory);

        console.log(`Produto ${product.id}: ${product.name}`);
        console.log(`  Categoria: ${product.category}`);
        console.log(`  Subcategoria: ${product.subcategory}`);
    });

    console.log('=== RESUMO DAS SUBCATEGORIAS POR CATEGORIA ===');
    Object.keys(subcategories).forEach(category => {
        console.log(`${category}:`, Array.from(subcategories[category]));
    });
}

// Chame esta função para verificar
verifySubcategories();

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    checkUserAuth(); // ADICIONE ESTA LINHA
    displayProducts(products);
    setupCarouselButtons();
    goToSlide(0);
});

// Também adicione esta verificação quando a página for mostrada
window.addEventListener('pageshow', function() {
    checkUserAuth();
});

// ==================== FUNÇÕES GLOBAIS PARA O MENU ====================
// ADICIONE ISSO NO FINAL DO ARQUIVO

// Tornar as funções do menu globalmente acessíveis
window.logout = logout;
window.viewProfile = viewProfile;

// Verificar autenticação também quando a página for mostrada
window.addEventListener('pageshow', function() {
    checkUserAuth();
});