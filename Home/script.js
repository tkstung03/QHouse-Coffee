
var cards = document.querySelectorAll('.card');

for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var image = card.querySelector('.card-img-top');

    image.addEventListener('click', function(event) {
        var productInfo = getProductInfo(event.currentTarget.parentNode);
        createProductCard(productInfo);
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

    var productNameColumn = document.createElement('div');
    productNameColumn.classList.add('col-6');
    productNameColumn.style.display = 'flex';
    productNameColumn.style.alignItems = 'start';

    var productName = document.createElement('div');
    productName.innerText = productInfo.name;
    productName.style.fontWeight = '600';

    var productPriceColumn = document.createElement('div');
    productPriceColumn.classList.add('col-2');
    productPriceColumn.style.display = 'flex';
    productPriceColumn.style.alignItems = 'start';

    var productPriceInput = document.createElement('input');
    productPriceInput.type = 'text';
    productPriceInput.value = productInfo.price;
    productPriceInput.style.color = 'red';
    productPriceInput.style.border = 'none';
    productPriceInput.style.width = '80px';
    productPriceInput.style.background = 'transparent';
    productPriceInput.style.fontWeight = 'bold';
    productPriceInput.readOnly = true;

    var deleteButtonColumn = document.createElement('div');
    deleteButtonColumn.classList.add('col-1');
    deleteButtonColumn.style.display = 'flex';
    deleteButtonColumn.style.justifyContent = 'start';
    deleteButtonColumn.style.alignItems = 'start';

    var deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.addEventListener('click', function() {
        // Gọi hàm xử lý việc xoá sản phẩm tại đây
        deleteProduct(productInfo);
    });

    productImageColumn.appendChild(productImage);
    productNameColumn.appendChild(productName);
    productPriceColumn.appendChild(productPriceInput);
    deleteButtonColumn.appendChild(deleteButton);

    productCardContainer.appendChild(productImageColumn);
    productCardContainer.appendChild(productNameColumn);
    productCardContainer.appendChild(productPriceColumn);
    productCardContainer.appendChild(deleteButtonColumn);

    var container = document.getElementById('productContainer');
    container.appendChild(productCardContainer);
    
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
    tongInput.value = totalAmount.toFixed(2);
    productCardContainer.remove();
    console.log('Xoá sản phẩm: ', productInfo);
}

// Hàm xử lý sự kiện khi bấm vào card
function handleCardClick(event) {
    var card = event.currentTarget;
    var productPrice = parseFloat(card.querySelector('input[type="text"]').value);
    
    // Cộng giá tiền vào tổng
    totalAmount += productPrice;

    // Hiển thị tổng trong input:text có id "tong"
    var tongInput = document.getElementById('tong');
    tongInput.value = totalAmount.toFixed(2);
}

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
    tongInput.value = totalAmount.toFixed(2);

    // Kiểm tra xem card có còn tồn tại trong danh sách không
    if (card.parentNode) {
        // Gán lại sự kiện click cho card
        card.addEventListener('click', handleCardClick);
    }
}


function newOrder() {
    var orderInput = document.getElementById('orderNumber');
    var currentOrder = parseFloat(orderInput.value);
    var newOrder = currentOrder + 0.1;
    orderInput.value = newOrder.toFixed(1);
}

