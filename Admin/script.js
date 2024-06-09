$(document).ready(function() {
    var username_admin = sessionStorage.getItem("username_admin");
    document.getElementById("username").innerText = username_admin;
    //Sinh stt
    function autoSTT(tableID) {
      $("#" + tableID + " tbody tr").each(function (index) {
        var cell = $("<td></td>").text(index + 1);
        $(this).prepend(cell);
      });
    }
    
    $(document).ready(function () {
      autoSTT("table_danhmuc");
      autoSTT("table_douong");
      autoSTT("table_hoadon");
      autoSTT("table_nguyenlieu");
      autoSTT("table_thongkedoanhthu");
      autoSTT("table_quanlynhanvien");
    });
    function autoMa(tableID, tenma, x, y, maClass) {
      var rows = $("#" + tableID + " tbody tr");
      var count = 0;  
      rows.each(function () {
        var code = generateCategoryCode(tenma, count, x, y);
        $(this).find("td:eq(1)").text(code).addClass(maClass);
        count++;
      });
    }
    function generateCategoryCode(tenma, count, x, y) {
      var code = tenma + String(count + 1).padStart(x, y);
      return code;
    }
    $(document).ready(function () {
      autoMa("table_danhmuc", "DM", 3, "0", "madanhmuc");   
      autoMa("table_douong", "DU", 3, "0", "madouong");
      autoMa("table_hoadon", "HD", 5, "0", "mahoadon");
      autoMa("table_nguyenlieu", "NL", 3, "0", "manguyenlieu");
      autoMa("table_thongkedoanhthu", "DU", 3, "0", "madouong");
      autoMa("table_quanlynhanvien", "NV", 2, "0", "manhanvien");
    });
    // Sinh tùy chọn
    function autoTuyChon(tableID, TuyChonClass) {
      $("#" + tableID + " tbody tr").each(function () {
        var row = $(this);
    
        // Tạo ô tùy chọn và thêm các button vào
        var tuyChonTd = $("<td></td>").addClass(TuyChonClass);
    
        var editButton = $("<button></button>").addClass("btn pt-0 m-0 list-inline-item");
        var editIcon = $("<span></span>").addClass("fas fa-edit");
        editButton.append(editIcon);
        tuyChonTd.append(editButton);
    
        var deleteButton = $("<button></button>").addClass("btn pt-0 m-0 list-inline-item");
        var deleteIcon = $("<span></span>").addClass("fas fa-trash");
        deleteButton.append(deleteIcon);
        tuyChonTd.append(deleteButton);
    
        row.append(tuyChonTd);
      });
    }
    
    $(document).ready(function () {
      autoTuyChon("table_danhmuc", "tuychon_danhmuc");
      autoTuyChon("table_douong", "tuychon_douong");
      autoTuyChon("table_nguyenlieu", "tuychon_nguyenlieu");
      autoTuyChon("table_quanlynhanvien", "tuychon_quanlynhanvien");
    });
    $(".giaban").each(function(index){
      var giaban = parseInt($(this).text());
      $(".giaban").eq(index).text(giaban.toLocaleString('it-IT', {style: 'currency', currency: 'VND'}));
    });
    $(".gianhap").each(function(index){
      var gianhap = parseInt($(this).text());
      $(".gianhap").eq(index).text(gianhap.toLocaleString('it-IT', {style: 'currency', currency: 'VND'}));
    });
    $(".tongcong").each(function(index){
      var tongcong = parseInt($(this).text());
      $(".tongcong").eq(index).text(tongcong.toLocaleString('it-IT', {style: 'currency', currency: 'VND'}));
    });
    
      $(document).ready(function() {
        $(".songaycong").each(function(index) {
          var songaycong = parseInt($(this).text());
          var sogiotangca = parseInt($(".sogiotangca").eq(index).text());
          
          var mucluong = songaycong * 300000 + sogiotangca * 30000;
          var mucluongFormatted = mucluong.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
          $(".mucluong").eq(index).text(mucluongFormatted);
          var thuong = parseInt($(".thuong").eq(index).text());
          var phat = parseInt($(".phat").eq(index).text());
          var tongluong = mucluong - phat + thuong;
          var tongluongFormatted = tongluong.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
          $(".tongluong").eq(index).text(tongluongFormatted);
          $(".thuong").eq(index).text(thuong.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}));
          $(".phat").eq(index).text(phat.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}));
        });
      });
      $("#btn_them_danhmuc").click(function(){
        $("#danhmuc").hide();
        $("#themdanhmuc").show();
        var lastMaDanhMuc = $("#table_danhmuc tbody tr:last-child td:nth-child(2)").text();
        var newMaDanhMuc = "DM" + String(parseInt(lastMaDanhMuc.substr(2)) + 1).padStart(3, "0");
        $("#madanhmucmoi").text(newMaDanhMuc);
        $("#themdanhmuc tbody input[type='checkbox']").prop("checked", false);
        $("#tendanhmucmoi").val('');
      });
      $(".btn_quaylai_danhmuc").click(function(){
        $("#danhmuc").show();
        $("#themdanhmuc").hide();
        $("#suadanhmuc").hide();
      });
      
// Lấy thông tin từ bảng cũ sang bảng mới
  $(document).ready(function () {
    $("#table_douong tbody tr").each(function () {
      var maDoUong = $(this).find("td:nth-child(2)").text();
      var tenDoUong = $(this).find("td:nth-child(3)").text();
      var newRow = $("<tr></tr>");
      var newMaDoUong = $("<td></td>").text(maDoUong);
      var newTenDoUong = $("<td></td>").text(tenDoUong);
      var newCheckboxColumn = $("<td></td>");
      var newCheckbox = $("<input type='checkbox'>");
      newCheckboxColumn.append(newCheckbox);
      newRow.append(newMaDoUong, newTenDoUong, newCheckboxColumn);
      $("#themdanhmuc tbody").append(newRow);
    });
  }); 
  $("#btn_luu_danhmuc").click(function(){
    // Lấy giá trị từng cột từ input hoặc các nguồn dữ liệu khác
    var tendanhmuc = $("#tendanhmucmoi").val();    
    var lastSTT = $("#table_danhmuc tbody tr:last-child td:nth-child(1)").text();
    var newSTT = String(parseInt(lastSTT) + 1);
    var newMa = $("#madanhmucmoi").text();
    var newRow = $('<tr><td>' + newSTT + '</td><td>' + newMa + '</td><td>' + tendanhmuc + '</td>');
    var editButton = $("<button></button>").addClass("btn pt-0 m-0 list-inline-item");
    var editIcon = $("<span></span>").addClass("fas fa-edit");
    editButton.append(editIcon);
    var deleteButton = $("<button></button>").addClass("btn pt-0 m-0 list-inline-item");
    var deleteIcon = $("<span></span>").addClass("fas fa-trash");
    deleteButton.append(deleteIcon);
    var tuyChonTd = $("<td></td></tr>");
    tuyChonTd.append(editButton, deleteButton);
    newRow.append(tuyChonTd);
    $("#table_danhmuc tbody").append(newRow);
    $("#danhmuc").show();
    $("#themdanhmuc").hide(); 
  });
  $("#btn_sua_danhmuc").click(function(){
    $("#danhmuc").hide();
    $("#themdanhmuc").show();
    var lastMaDanhMuc = $("#table_danhmuc tbody tr:last-child td:nth-child(2)").text();
    var newMaDanhMuc = "DM" + String(parseInt(lastMaDanhMuc.substr(2)) + 1).padStart(3, "0");
    $("#madanhmucmoi").text(newMaDanhMuc);
    $("#themdanhmuc tbody input[type='checkbox']").prop("checked", false);
    $("#tendanhmucmoi").val('');
  });
  $(document).on("click", ".tuychon_danhmuc .fa-edit", function() {
    $("#danhmuc").hide();
    $("#suadanhmuc").show();
    var row = $(this).closest("tr");
    var maDanhMuc = row.find(".madanhmuc").text();
    $("#madanhmucsua").text(maDanhMuc);
    var tenDanhMuc = row.find(".tendanhmuc").text();
    $("#tendanhmucsua").val(tenDanhMuc);
    $("#btn_luu_danhmuc_sua").click(function(){
      var tenDanhMucSauSua = $("#tendanhmucsua").val();
      row.find(".tendanhmuc").text(tenDanhMucSauSua);
      $("#danhmuc").show();
      $("#suadanhmuc").hide();
    });
  });
  $(document).on("click", ".tuychon_danhmuc .fa-trash", function() {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa?',
      text: "Hành động này không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        var row = $(this).closest("tr");
        row.remove();
        Swal.fire(
          'Đã xóa!'
        );
      }
    });
  });
   $(document).ready(function () {
    $("#table_douong tbody tr").each(function () {
      var maDoUong = $(this).find("td:nth-child(2)").text();
      var tenDoUong = $(this).find("td:nth-child(3)").text();
      var newRow = $("<tr></tr>");
      var newMaDoUong = $("<td></td>").text(maDoUong);
      var newTenDoUong = $("<td></td>").text(tenDoUong);
      var newCheckboxColumn = $("<td></td>");
      var newCheckbox = $("<input type='checkbox'>");
      newCheckboxColumn.append(newCheckbox);
      newRow.append(newMaDoUong, newTenDoUong, newCheckboxColumn);
      $("#suadanhmuc tbody").append(newRow);
    });
    }); 
    

});