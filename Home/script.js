var btnThuTienToggle = document.getElementById('btnThuTien');
var trangMenu = document.getElementById('menu');
var trangThanhToan = document.getElementById('payment');
var trangGiaoHang = document.getElementById('shipInfo');
var trangZaloPay = document.getElementById('zaloPay');
var trangViettelPay = document.getElementById('viettelPay');
var trangTheNH = document.getElementById('creditCard');
var trangMOMO = document.getElementById('momo')

btnThuTienToggle.addEventListener('click', function(){
    loadProductCards();
        trangMenu.style.display = 'none';
        trangThanhToan.style.display = 'block';
    
});
function openMenu(){
    if(trangGiaoHang.style.display === 'block'){
        trangGiaoHang.style.display = 'none';
        trangThanhToan.style.display = 'block';
    }
    else{
        trangGiaoHang.style.display = 'none';
    }
}
function openGiaoHang() {
    var btn = document.getElementById('btnGiaoHang'); 
    btn.classList.add('active');  


    trangMenu.style.display = 'none';
    trangThanhToan.style.display = 'none';
    trangViettelPay.style.display = 'none';
    trangZaloPay.style.display = 'none';
    trangTheNH.style.display = 'none';
    trangMOMO.style.display = 'none';
    trangGiaoHang.style.display = 'block';
}
function openZaloPay() {
    var btn = document.getElementById('zlPay'); 
    btn.classList.add('active');  

    trangThanhToan.style.display = 'none';
    trangZaloPay.style.display = 'block';
}
function openViettelPay() {
    var btn = document.getElementById('vtPay'); 
    btn.classList.add('active');  

    trangThanhToan.style.display = 'none';
    trangViettelPay.style.display = 'block';
}
function openTheNH() {
    var btn = document.getElementById('btnVisa'); 
    btn.classList.add('active');  

    trangThanhToan.style.display = 'none';
    trangTheNH.style.display = 'block';
}

function openMOMO() {
    var btn = document.getElementById('btnMomo'); 
    btn.classList.add('active');  

    trangThanhToan.style.display = 'none';
    trangMOMO.style.display = 'block';
}

function quayLai() {
    trangThanhToan.style.display = 'none';
    trangMenu.style.display = 'block';

}
function quayLai2() {
    trangGiaoHang.style.display = 'none';
    trangMenu.style.display = 'block';

}
function quayLai3() {
    trangZaloPay.style.display = 'none';
    trangThanhToan.style.display = 'block';
}
function quayLai4() {
    trangViettelPay.style.display = 'none';
    trangThanhToan.style.display = 'block';
}
function quayLai5() {
    trangGiaoHang.style.display = 'none';
    trangThanhToan.style.display = 'block';
}
function quayLai6() {
    trangTheNH.style.display = 'none';
    trangThanhToan.style.display = 'block';
}
function quayLai7() {
    trangMOMO.style.display = 'none';
    trangThanhToan.style.display = 'block';
}


function showHoanTatDialog() {
    var dialogOverlay = document.getElementById("dialogOverlay");
    var dialogBox = document.getElementById("dialogBox");
    var dialogMessage = document.getElementById("dialogMessage");
  
    dialogMessage.innerText = "THANH TOÁN HOÀN TẤT!";
  
    dialogOverlay.style.display = "block";
    dialogBox.style.display = "block";
  }
  
  function closeDialog() {
    var dialogOverlay = document.getElementById("dialogOverlay");
    var dialogBox = document.getElementById("dialogBox");
  
    dialogOverlay.style.display = "none";
    dialogBox.style.display = "none";
    trangThanhToan.style.display = 'none';
    trangViettelPay.style.display = 'none';
    trangTheNH.style.display = 'none';
    trangMOMO.style.display = 'none';
    trangZaloPay.style.display = 'none';
    trangMenu.style.display = 'block';
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
    productNamePriceContainer.classList.add('col-7');
    productNamePriceContainer.style.padding = '0';


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
    quantityColumn.classList.add('col-12');
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
    deleteButtonColumn.classList.add('col-2');
    deleteButtonColumn.style.display = 'flex';
    deleteButtonColumn.style.justifyContent = 'center';
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
function deleteAll() {
    // Clear the product container on the screen
    var container = document.getElementById('productContainer');
    container.innerHTML = '';

    // Clear the product data in storage
    localStorage.removeItem('productCards');
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
    var tongTT = document.getElementById('tongThanhToan');
    tongTT.value = totalAmount.toFixed(0);
}

    loadProductCards();

    function increaseTotalAmount() {
        var increaseCheckbox = document.getElementById('increaseCheckbox');
        var thuInput = document.getElementById('thu');
        var truocThueInput = document.getElementById('truocThue');
        var sauThueInput = document.getElementById('sauThue');
        var productCards = JSON.parse(localStorage.getItem('productCards'));
      
        // Tính toán giá tiền ban đầu
        var originalAmount = 0;
        productCards.forEach(function(productInfo) {
          originalAmount += parseFloat(productInfo.price);
        });
      
        var truocThueAmount = originalAmount.toFixed(0);
        if (increaseCheckbox.checked) {
          // Tính toán giá tiền mới sau khi tăng 10%
          var increasedAmount = originalAmount * 1.1; // Tăng 10%
          var sauThueAmount = increasedAmount.toFixed(0);
      
          truocThueInput.value = truocThueAmount;
          thuInput.value = sauThueAmount;
          sauThueInput.value = sauThueAmount;
        } else {
          // Nếu checkbox không được tích, giữ nguyên giá trị ban đầu
          var originalAmountFormatted = originalAmount.toFixed(0);
          thuInput.value = originalAmountFormatted;
          sauThueInput.value = originalAmountFormatted;
        }
      }
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
        var tongTT = document.getElementById('tongThanhToan');
        tongInput.value = '0';
        thuInput.value = '0';
        tongTT.value = '0';
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
    var tongTT = document.getElementById('tongThanhToan');
    tongTT.value = totalAmount.toFixed(0);

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
    $("button").click(function() {
        $("button").removeClass("active");
        $(this).addClass("active");
    });

    // validate form ship hàng
    $("#btnLuu").click(function() {
        // Validate fields
        let isValid = true;

        // Validate Họ tên KH
        let ten = $("#txtTen").val();
        if (ten.trim() === "") {
            $("#errorTen").text("Họ tên không được bỏ trống");
            isValid = false;
        } else {
            $("#errorTen").text("");
        }

        // Validate Số điện thoại
        let sdt = $("#txtSDT").val();
        if (sdt.trim() === "") {
            $("#errorSDT").text("Số điện thoại không được bỏ trống");
            isValid = false;
        } else if (!/^\d+$/.test(sdt)) { // Check if it's only digits
            $("#errorSDT").text("Số điện thoại phải là số");
            isValid = false;
        } else {
            $("#errorSDT").text("");
        }

        // Validate Địa chỉ GH
        let diaChi = $("#txtDiaChi").val();
        if (diaChi.trim() === "") {
            $("#errorDiaChi").text("Địa chỉ không được bỏ trống");
            isValid = false;
        } else {
            $("#errorDiaChi").text("");
        }

        // If all fields are valid, proceed with saving
        if (isValid) {
            // Your code to save data goes here
            // Example: Display a success message
            alert("Lưu thành công!");
            $("#errorTen").text("");
            $("#errorSDT").text("");
            $("#errorDiaChi").text("");
        }
    });
}); 
function updateInput(value) {
    document.getElementById('khachdua').value = value;
    var tong = document.getElementById("thu").value;
    var tralai = value - tong;
    document.getElementById('tralai').value = tralai;
}      
window.onload = function() {
    var minutes = 1; // Số phút cần đếm ngược
    var seconds = 0; // Số giây cần đếm ngược
    var timer1 = document.getElementById('timer1');
    var timer2 = document.getElementById('timer2');
    var timer3 = document.getElementById('timer3');
  
    var countdown = setInterval(function() {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          timer1.textContent = "Hết giờ!";
          timer2.textContent = "Hết giờ!";
          timer3.textContent = "Hết giờ!";
          return;
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
  
      var displayMinutes = minutes < 10 ? "0" + minutes : minutes;
      var displaySeconds = seconds < 10 ? "0" + seconds : seconds;
      timer1.textContent = displayMinutes + ":" + displaySeconds;
      timer2.textContent = displayMinutes + ":" + displaySeconds;
      timer3.textContent = displayMinutes + ":" + displaySeconds;
    }, 1000);
  };



