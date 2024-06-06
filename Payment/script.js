

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
