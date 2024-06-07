var btnThuTienToggle = document.getElementById('btnThuTien');
var trangMenu = document.getElementById('menu');
var trangThanhToan = document.getElementById('payment');
var trangGiaoHang = document.getElementById('shipInfo');

btnThuTienToggle.addEventListener('click', function(){
    loadProductCards();
        trangMenu.style.display = 'none';
        trangThanhToan.style.display = 'block';
    
});

function openGiaoHang() {
    var activeButton = document.querySelector('.btn.btn-success.active');
    if (activeButton) {
        activeButton.classList.remove('active');
    }
    var btn = document.getElementById('btnGiaoHang'); 
    btn.classList.add('active');  

    trangMenu.style.display = 'none';
    trangGiaoHang.style.display = 'block';
}

function quayLai() {
    if (trangMenu.style.display === 'none') {
        trangMenu.style.display = 'block';
        trangThanhToan.style.display = 'none';
      } else {
        trangMenu.style.display = 'none';
        trangThanhToan.style.display = 'block';
      }

}
function quayLai2() {
    if (trangMenu.style.display === 'none') {
        trangMenu.style.display = 'block';
        trangGiaoHang.style.display = 'none';
      } else {
        trangMenu.style.display = 'none';
        trangGiaoHang.style.display = 'block';
      }

}
var cards = document.querySelectorAll('.card');

for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var image = card.querySelector('.card-img-top');

    card.addEventListener('click', function(event) {
        var productInfo = getProductInfo(event.currentTarget.parentNode);
        createProductCard(productInfo);
        saveProductCard(productInfo);
    });
} 

function getProductInfo(card) {
    var productImage = card.querySelector('.card-img-top').getAttribute('src');
    var productName = card.querySelector('.card-title').innerText;
    var productPrice = card.querySelector('.card-footer input').value + "đ";

    return {
        image: productImage,
        name: productName,
        price: productPrice
    };
}

function createProductCard(productInfo) {
    var productCardContainer = document.createElement('div');
    productCardContainer.classList.add('product-card');
    productCardContainer.classList.add('row');
    productCardContainer.style.marginBottom = '10px';

    var productImageColumn = document.createElement('div');
    productImageColumn.classList.add('col-3');
    productImageColumn.style.display = 'flex';
    productImageColumn.style.alignItems = 'start';

    var productImage = document.createElement('img');
    productImage.src = productInfo.image;
    productImage.style.width = '80px';
    productImage.style.marginRight = '10px';

    var productNamePriceContainer = document.createElement('div');
    productNamePriceContainer.classList.add('col-8');


    var namePriceRow = document.createElement('div');
    namePriceRow.classList.add('row');

    var productNameColumn = document.createElement('div');
    productNameColumn.classList.add('col-8');
    productNameColumn.style.alignItems = 'start';

    var productName = document.createElement('div');
    productName.innerText = productInfo.name;
    productName.style.fontWeight = '600';

    var productPriceColumn = document.createElement('div');
    productPriceColumn.classList.add('col-4');
    productPriceColumn.style.alignItems = 'start';


    var productPriceInput = document.createElement('input');
    productPriceInput.type = 'text';
    productPriceInput.value = productInfo.price;
    productPriceInput.style.color = 'red';
    productPriceInput.style.border = 'none';
    productPriceInput.style.width = '80px';
    productPriceInput.style.background = 'transparent';
    productPriceInput.style.fontWeight = 'bold';
    productPriceInput.disabled = true;

    var quantityColumn = document.createElement('div');
    quantityColumn.classList.add('col-8');
    quantityColumn.style.display = 'flex';
    quantityColumn.style.alignItems = 'center';

    var quantityLabel = document.createElement('label');
    quantityLabel.innerText = 'Số lượng: ';

    var quantityInput = document.createElement('input');
    quantityInput.type = 'text';
    quantityInput.value = '1';
    quantityInput.name = 'quantity';
    quantityInput.disabled = 'true';
    quantityInput.style.backgroundColor = 'transparent';
    quantityInput.style.color = 'black';
    quantityInput.style.width = '40px';
    quantityInput.style.textAlign = 'center';
    quantityInput.style.border = 'none'

    var deleteButtonColumn = document.createElement('div');
    deleteButtonColumn.classList.add('col-1');
    deleteButtonColumn.style.display = 'flex';
    deleteButtonColumn.style.justifyContent = 'start';
    deleteButtonColumn.style.alignItems = 'start';

    var deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.addEventListener('click', function() {
        deleteProduct(productInfo);
    });

    productImageColumn.appendChild(productImage);
    productNameColumn.appendChild(productName);
    productPriceColumn.appendChild(productPriceInput)

    namePriceRow.appendChild(productNameColumn);
    namePriceRow.appendChild(productPriceColumn);
    namePriceRow.appendChild(quantityColumn)

    quantityColumn.appendChild(quantityLabel);
    // quantityColumn.appendChild(decreaseButton);
    quantityColumn.appendChild(quantityInput);
    // quantityColumn.appendChild(increaseButton);

    deleteButtonColumn.appendChild(deleteButton);

    productCardContainer.appendChild(productImageColumn);
    productCardContainer.appendChild(productNamePriceContainer);
    productNamePriceContainer.appendChild(namePriceRow);
    productCardContainer.appendChild(deleteButtonColumn);

    var container = document.getElementById('productContainer');
    container.appendChild(productCardContainer);
    
    return productCardContainer;
}
function saveProductCard(productInfo) {
    // Lấy danh sách các thẻ sản phẩm đã lưu (nếu có)
    var savedProductCards = localStorage.getItem('productCards');
    var productCards = [];

    if (savedProductCards) {
        productCards = JSON.parse(savedProductCards);
    }

    // Thêm thông tin sản phẩm vào danh sách
    productCards.push(productInfo);

    // Lưu danh sách sản phẩm vào Local Storage
    localStorage.setItem('productCards', JSON.stringify(productCards));
}
function loadProductCards() {
    // Lấy danh sách các thẻ sản phẩm từ Local Storage
    var savedProductCards = localStorage.getItem('productCards');
    var productCards = [];

    if (savedProductCards) {
        productCards = JSON.parse(savedProductCards);
    }

    // Hiển thị các thẻ sản phẩm đã lưu
    var container = document.getElementById('productContainer');
    container.innerHTML = ''; // Xóa các thẻ sản phẩm hiện có trong container

    productCards.forEach(function(productInfo) {
        var productCard = createProductCard(productInfo);
        container.appendChild(productCard);
    });
    // Cập nhật tổng tiền
    var totalAmount = 0;
    productCards.forEach(function(productInfo) {
        var productPrice = parseFloat(productInfo.price);
        totalAmount += productPrice;
    });

    var tongInput = document.getElementById('tong');
    if (totalAmount < 0) {
        totalAmount = 0;
    }
    tongInput.value = totalAmount.toFixed(0);

    var thuInput = document.getElementById('thu');
    thuInput.value = totalAmount.toFixed(0);
}

    loadProductCards();
    function newOrder() {
        var orderInput = document.getElementById('orderNumber');
        var currentOrder = parseFloat(orderInput.value);
        var newOrder = currentOrder + 0.01;
        orderInput.value = newOrder.toFixed(2);
        // Xoá dữ liệu trong Local Storage
        localStorage.removeItem('productCards');
        loadProductCards();
        // Xoá danh sách sản phẩm trong DOM
        var productCardContainer = document.getElementById('productCardContainer');
        productCardContainer.innerHTML = '';
    
        var tongInput = document.getElementById('tong');
        var thuInput = document.getElementById('thu');
        tongInput.value = '0';
        thuInput.value = '0';
    }

// Khai báo biến global để lưu tổng giá tiền
var totalAmount = 0;

function deleteProduct(productInfo) {
    var productCardContainer = document.querySelector('.product-card');
    var productPrice = parseFloat(productCardContainer.querySelector('input[type="text"]').value);
    // Trừ giá tiền của sản phẩm khỏi tổng
    totalAmount -= productPrice;

    // Hiển thị tổng trong input:text có id "tong"
    var tongInput = document.getElementById('tong');
    if (totalAmount < 0) {
        totalAmount = 0;
    }
    tongInput.value = totalAmount.toFixed(0);

    var thuInput = document.getElementById('thu');
    thuInput.value = totalAmount.toFixed(0);

    productCardContainer.remove();
    console.log('Xoá sản phẩm: ', productInfo);

    // Xoá dữ liệu tương ứng trong Local Storage
    var savedProductCards = localStorage.getItem('productCards');
    var productCards = [];

    if (savedProductCards) {
        productCards = JSON.parse(savedProductCards);
    }

    // Tìm và xoá sản phẩm tương ứng trong danh sách sản phẩm
    var updatedProductCards = productCards.filter(function(card) {
        return card.name !== productInfo.name;
    });

    // Lưu danh sách sản phẩm đã xoá vào Local Storage
    localStorage.setItem('productCards', JSON.stringify(updatedProductCards));
}

// Hàm xử lý sự kiện khi bấm vào card


// Lấy danh sách các card
var cards = document.querySelectorAll('.card');
// Gán sự kiện click cho mỗi card
cards.forEach(function(card) {
    card.addEventListener('click', handleCardClick);
});
// Hàm xử lý sự kiện khi bấm vào nút xoá sản phẩm
function handleCardClick(event) {
    var card = event.currentTarget;
    var productPrice = parseFloat(card.querySelector('input[type="text"]').value);
    
    // Cộng giá tiền vào tổng
    totalAmount += productPrice;

    // Hiển thị tổng trong input:text có id "tong"
    var tongInput = document.getElementById('tong');
    tongInput.value = totalAmount.toFixed(0);

    // Kiểm tra xem card có còn tồn tại trong danh sách không
    if (card.parentNode) {
        // Gán lại sự kiện click cho card
        card.addEventListener('click', handleCardClick);
    }
}

// Xoá danh sách sản phẩm đã lưu khi cần thiết
function clearProductCards() {
    localStorage.removeItem('productCards');
}

const display = document.getElementById('khachdua');
const btns = document.getElementsByTagName('btn-number');
const refund = document.getElementById('tralai');
function noiChuoi(so){
        display.value+= so;
    }
function nhan1000(){
        display.value *= 1000;
}
function Xoa(){
    display.value = 0;
}
function XoaKyTuCuoi() {
    var currentValue = display.value;
    if (currentValue.length > 0) {
        display.value = currentValue.slice(0, -1);
    }else
        display.value = 0;

}

$(document).ready(function() {
    $('.btn-number').on('click', function() {
        
        var khachtra = parseFloat($("#khachdua").val());
        var tong = parseFloat($("#thu").val());
        refund.value = khachtra - tong;
        $("#tralai").text(refund);
    });
}); 
function updateInput(value) {
    document.getElementById('khachdua').value = value;
    var tong = document.getElementById("thu").value;
    var tralai = value - tong;
    document.getElementById('tralai').value = tralai;
}      
function selectItem(item) {
    document.getElementById('dropdownMenuButton').innerText = item;
} 



