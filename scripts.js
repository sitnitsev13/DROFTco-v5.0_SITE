let currentCarouselIndex = 0;
let carouselInterval;
const carouselImages = [
    'https://via.placeholder.com/600x400/ddd/333?text=Бытовка+1',
    'https://via.placeholder.com/600x400/ccc/333?text=Бытовка+2',
    'https://via.placeholder.com/600x400/bbb/333?text=Бытовка+3',
    'https://via.placeholder.com/600x400/aaa/333?text=Бытовка+4'
];

function toggleMenu() {
    const nav = document.getElementById('navbarNav');
    nav.classList.toggle('active');
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
    document.getElementById('navbarNav').classList.remove('active');
}

function showProductPage(type, category) {
    const productPage = document.getElementById('productTemplate');
    const title = document.getElementById('productTitle');
    const description = document.getElementById('productDescription');
    const typeText = type === 'stationary' ? 'Стационарная' : 'Мобильная';
    const categoryText = {
        'residential': 'жилая',
        'warehouse': 'складская',
        'kitchen': 'кухонная',
        'office': 'офисная'
    }[category];
    title.textContent = `${typeText} ${categoryText} бытовка`;
    description.textContent = `Качественная ${typeText.toLowerCase()} ${categoryText} бытовка от проверенных производителей. Подходит для ${category === 'residential' ? 'временного или постоянного проживания' : category === 'warehouse' ? 'хранения товаров и материалов' : category === 'kitchen' ? 'организации питания на объектах' : 'размещения офисных помещений'}.`;
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    productPage.style.display = 'block';
    startCarousel();
    document.getElementById('navbarNav').classList.remove('active');
    document.getElementById('stationaryMenu').classList.remove('active');
    document.getElementById('mobileMenu').classList.remove('active');
}

function startCarousel() {
    clearInterval(carouselInterval);
    currentCarouselIndex = 0;
    updateCarousel();
    carouselInterval = setInterval(() => {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
        updateCarousel();
    }, 5000);
}

function updateCarousel() {
    const img = document.getElementById('carouselImg');
    const dots = document.querySelectorAll('.carousel-dot');
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = carouselImages[currentCarouselIndex];
        img.style.opacity = '1';
    }, 250);
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCarouselIndex);
    });
}

function setCarouselImage(index) {
    currentCarouselIndex = index;
    updateCarousel();
}

function showDeliveryInfo(type) {
    const details = document.getElementById('deliveryDetails');
    const local = document.getElementById('localDelivery');
    const russia = document.getElementById('russiaDelivery');
    const prompt = document.getElementById('deliveryPrompt');
    details.style.display = 'block';
    prompt.style.display = 'none';
    if (type === 'local') {
        local.style.display = 'block';
        russia.style.display = 'none';
    } else {
        local.style.display = 'none';
        russia.style.display = 'block';
    }
}

if (window.innerWidth <= 768) {
    const stationaryBtn = document.getElementById('stationaryBtn');
    const mobileBtn = document.getElementById('mobileBtn');
    stationaryBtn.onclick = toggleMobileDropdown.bind(null, 'stationaryMenu');
    mobileBtn.onclick = toggleMobileDropdown.bind(null, 'mobileMenu');
}

function toggleMobileDropdown(menuId) {
    const menu = document.getElementById(menuId);
    const otherMenuId = menuId === 'stationaryMenu' ? 'mobileMenu' : 'stationaryMenu';
    const otherMenu = document.getElementById(otherMenuId);
    const button = menuId === 'stationaryMenu' ? document.getElementById('stationaryBtn') : document.getElementById('mobileBtn');

    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        button.classList.remove('active');
    } else {
        otherMenu.classList.remove('active');
        document.getElementById(otherMenuId === 'stationaryMenu' ? 'stationaryBtn' : 'mobileBtn').classList.remove('active');
        menu.classList.add('active');
        button.classList.add('active');
    }
}

document.addEventListener('click', function(event) {
    const menus = document.querySelectorAll('.dropdown-content');
    const buttons = document.querySelectorAll('.category-button');
    if (window.innerWidth <= 768) {
        let clickedOnButton = false;
        buttons.forEach(button => {
            if (button.contains(event.target)) {
                clickedOnButton = true;
            }
        });
        if (!clickedOnButton) {
            menus.forEach(menu => menu.classList.remove('active'));
            buttons.forEach(button => button.classList.remove('active'));
        }
    }
});