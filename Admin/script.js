$(document).ready(function () {
  // Đăng nhập bằng tên user
  var username_admin = sessionStorage.getItem("username_admin");
  document.getElementById("username").innerText = username_admin;
  //Sinh STT
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
  // Sinh mã các kiểu
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
  // Sinh 2 nút tùy chọn
  function autoTuyChon(tableID, TuyChonClass) {
    $("#" + tableID + " tbody tr").each(function () {
      var row = $(this);

      // Tạo ô tùy chọn và thêm các button vào
      var tuyChonTd = $("<td></td>").addClass(TuyChonClass);

      var editButton = $("<button></button>").addClass(
        "btn pt-0 m-0 list-inline-item"
      );
      var editIcon = $("<span></span>").addClass("fas fa-edit");
      editButton.append(editIcon);
      tuyChonTd.append(editButton);

      var deleteButton = $("<button></button>").addClass(
        "btn pt-0 m-0 list-inline-item"
      );
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
  // Set giá tiền theo kiểu VND
  $(".giaban").each(function (index) {
    var giaban = parseInt($(this).text());
    $(".giaban")
      .eq(index)
      .text(
        giaban.toLocaleString("it-IT", { style: "currency", currency: "VND" })
      );
  });
  $(".gianhap").each(function (index) {
    var gianhap = parseInt($(this).text());
    $(".gianhap")
      .eq(index)
      .text(
        gianhap.toLocaleString("it-IT", { style: "currency", currency: "VND" })
      );
  });
  $(".tongcong").each(function (index) {
    var tongcong = parseInt($(this).text());
    $(".tongcong")
      .eq(index)
      .text(
        tongcong.toLocaleString("it-IT", { style: "currency", currency: "VND" })
      );
  });
  // Tính tiền lương các kiểu
  $(document).ready(function () {
    $(".songaycong").each(function (index) {
      var songaycong = parseInt($(this).text());
      var sogiotangca = parseInt($(".sogiotangca").eq(index).text());

      var mucluong = songaycong * 300000 + sogiotangca * 30000;
      var mucluongFormatted = mucluong.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      $(".mucluong").eq(index).text(mucluongFormatted);
      var thuong = parseInt($(".thuong").eq(index).text());
      var phat = parseInt($(".phat").eq(index).text());
      var tongluong = mucluong - phat + thuong;
      var tongluongFormatted = tongluong.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      $(".tongluong").eq(index).text(tongluongFormatted);
      $(".thuong")
        .eq(index)
        .text(
          thuong.toLocaleString("it-IT", { style: "currency", currency: "VND" })
        );
      $(".phat")
        .eq(index)
        .text(
          phat.toLocaleString("it-IT", { style: "currency", currency: "VND" })
        );
    });
  });

  // DANH MỤC
  //hiện chi tiết danh mục
  $("#table_danhmuc tbody tr td:not(:last-child)").click(function () {
    $("#danhmuc").hide();
    $("#chitietdanhmuc").show();
    var madanhmuc = $(this).closest("tr").find(".madanhmuc").text();
    $("#madanhmucchitiet").text(madanhmuc);
    var tendanhmuc = $(this).closest("tr").find(".tendanhmuc").text();
    $("#tendanhmucchitiet").text(tendanhmuc);
    $("#table_douong tbody tr").each(function () {
      var maDoUong = $(this).find("td:nth-child(2)").text();
      var tenDoUong = $(this).find("td:nth-child(3)").text();
      var newRow = $("<tr></tr>");
      var newMaDoUong = $("<td></td>").text(maDoUong);
      var newTenDoUong = $("<td></td>").text(tenDoUong);
      newRow.append(newMaDoUong, newTenDoUong);
      $("#chitietdanhmuc tbody").append(newRow);
    });
  });
  //btn thêm danh mục
  $("#btn_them_danhmuc").click(function () {
    $("#danhmuc").hide();
    $("#themdanhmuc").show();
    var lastMaDanhMuc = $(
      "#table_danhmuc tbody tr:last-child td:nth-child(2)"
    ).text();
    var newMaDanhMuc =
      "DM" + String(parseInt(lastMaDanhMuc.substr(2)) + 1).padStart(3, "0");
    $("#madanhmucmoi").text(newMaDanhMuc);
    $("#themdanhmuc tbody input[type='checkbox']").prop("checked", false);
    $("#tendanhmucmoi").val("");
  });
  //btn hủy danh mục
  $(".btn_huy_danhmuc").click(function () {
    $("#danhmuc").show();
    $("#suadanhmuc").hide();
    $("#themdanhmuc").hide();
  });
  //btn quay lại danh mục
  $(".btn_quaylai_danhmuc").click(function () {
    $("#danhmuc").show();
    $("#themdanhmuc").hide();
    $("#suadanhmuc").hide();
    $("#chitietdanhmuc").hide();
  });
  //btn lưu danh mục
  $("#btn_luu_danhmuc").click(function () {
    // Lấy giá trị từng cột từ input hoặc các nguồn dữ liệu khác
    var tendanhmuc = $("#tendanhmucmoi").val();
    var lastSTT = $(
      "#table_danhmuc tbody tr:last-child td:nth-child(1)"
    ).text();
    var newSTT = String(parseInt(lastSTT) + 1);
    var newMa = $("#madanhmucmoi").text();
    var newRow = $("<tr><td>" +newSTT +"</td><td>" +newMa +"</td><td>" +tendanhmuc +"</td>"
    );
    var editButton = $("<button></button>").addClass(
      "btn pt-0 m-0 list-inline-item"
    );
    var editIcon = $("<span></span>").addClass("fas fa-edit");
    editButton.append(editIcon);
    var deleteButton = $("<button></button>").addClass(
      "btn pt-0 m-0 list-inline-item"
    );
    var deleteIcon = $("<span></span>").addClass("fas fa-trash");
    deleteButton.append(deleteIcon);
    var tuyChonTd = $("<td></td>").addClass("tuychon_danhmuc");
    var dongtable = $("</tr>");
    tuyChonTd.append(editButton, deleteButton);
    newRow.append(tuyChonTd);
    newRow.append(dongtable);
    $("#table_danhmuc tbody").append(newRow);
    $("#danhmuc").show();
    $("#themdanhmuc").hide();
  });
  // Nhấn btn sửa danh mục
  $(document).on("click", ".tuychon_danhmuc .fa-edit", function () {
    $("#danhmuc").hide();
    $("#suadanhmuc").show();
    var row = $(this).closest("tr");
    var maDanhMuc = row.find(".madanhmuc").text();
    $("#madanhmucsua").text(maDanhMuc);
    var tenDanhMuc = row.find(".tendanhmuc").text();
    $("#tendanhmucsua").val(tenDanhMuc);
    $("#btn_luu_danhmuc_sua").click(function () {
      var tenDanhMucSauSua = $("#tendanhmucsua").val();
      row.find(".tendanhmuc").text(tenDanhMucSauSua);
      $("#danhmuc").show();
      $("#suadanhmuc").hide();
    });
  });
  // Nhấn btn xóa danh mục
  $(document).on("click", ".tuychon_danhmuc .fa-trash", function () {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        var row = $(this).closest("tr");
        row.remove();
        Swal.fire("Đã xóa!");
      }
    });
  });
  // Lấy thông tin từ bảng đồ uống qua trang thêm danh mục
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
  // Lấy thông tin từ bảng đồ uống qua trang sửa danh mục
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

  // ĐỒ UỐNG
  //hiện thi tiết đồ uống
  $("#table_douong tbody tr td:not(:last-child)").click(function () {
    $("#douong").hide();
    $("#chitietdouong").show();
    var madouong = $(this).closest("tr").find(".madouong").text();
    $("#madouong").text(madouong);
    var tendouong = $(this).closest("tr").find(".tendouong").text();
    $("#tendouong").text(tendouong);
    var giaban = $(this).closest("tr").find(".giaban").text();
    $("#giaban").text(giaban);
  });
  // btn thêm đồ uống
  $("#btn_them_douong").click(function () {
    $("#douong").hide();
    $("#themdouong").show();
    var lastMaDoUong = $(
      "#table_douong tbody tr:last-child td:nth-child(2)"
    ).text();
    var newMaDoUong =
      "DU" + String(parseInt(lastMaDoUong.substr(2)) + 1).padStart(3, "0");
    $("#madouongmoi").text(newMaDoUong);
    $("#tendouongmoi").val("");
    $("#giabanmoi").val("");
  });
  // Nhấn nút hủy đồ uống
  $(".btn_huy_douong").click(function () {
    $("#douong").show();
    $("#suadouong").hide();
    $("#themdouong").hide();
  });
  // btn quay lại đồ uống
  $(".btn_quaylai_douong").click(function () {
    $("#douong").show();
    $("#chitietdouong").hide();
    $("#suadouong").hide();
    $("#themdouong").hide();
  });
  // btn lưu đồ uống
  $("#btn_luu_douong").click(function () {
    // Lấy giá trị từng cột từ input hoặc các nguồn dữ liệu khác
    var tendouong = $("#tendouongmoi").val();
    var giaban = parseInt($("#giabanmoi").val());
    var giabanFormatted = giaban.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    var lastSTT = $("#table_douong tbody tr:last-child td:nth-child(1)").text();
    var newSTT = String(parseInt(lastSTT) + 1);
    var newMa = $("#madouongmoi").text();
    var newRow = $(
      "<tr><td>" +
        newSTT +
        "</td><td>" +
        newMa +
        "</td><td>" +
        tendouong +
        "</td><td>" +
        giabanFormatted +
        "</td>"
    );
    var editButton = $("<button></button>").addClass(
      "btn pt-0 m-0 list-inline-item"
    );
    var editIcon = $("<span></span>").addClass("fas fa-edit");
    editButton.append(editIcon);
    var deleteButton = $("<button></button>").addClass(
      "btn pt-0 m-0 list-inline-item"
    );
    var deleteIcon = $("<span></span>").addClass("fas fa-trash");
    deleteButton.append(deleteIcon);
    var tuyChonTd = $("<td></td>").addClass("tuychon_douong");
    var dongtable = $("</tr>");
    tuyChonTd.append(editButton, deleteButton);
    newRow.append(tuyChonTd);
    newRow.append(dongtable);
    $("#table_douong tbody").append(newRow);
    $("#douong").show();
    $("#themdouong").hide();
  });
  // Nhấn nút sửa đồ uống
  $(document).on("click", ".tuychon_douong .fa-edit", function () {
    $("#douong").hide();
    $("#suadouong").show();
    var row = $(this).closest("tr");
    var maDoUong = row.find(".madouong").text();
    $("#madouongsua").text(maDoUong);
    var tenDoUong = row.find(".tendouong").text();
    $("#tendouongsua").val(tenDoUong);
    var giaBan = row.find(".giaban").text();
    $("#giabansua").val(giaBan);
    $("#btn_luu_douong_sua").click(function () {
      var tenDoUongSauSua = $("#tendouongsua").val();
      row.find(".tendouong").text(tenDoUongSauSua);
      var giaBanSauSua = parseInt($("#giabansua").val());
      var giaBanSauSuaFormatted = giaBanSauSua.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      row.find(".giaban").text(giaBanSauSuaFormatted);
      $("#douong").show();
      $("#suadouong").hide();
    });
  });
  // Nhấn btn xóa đồ uống
  $(document).on("click", ".tuychon_douong .fa-trash", function () {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        var row = $(this).closest("tr");
        row.remove();
        Swal.fire("Đã xóa!");
      }
    });
  });

  //Tìm hóa đơn
  $(document).ready(function () {
    $("#tukhoa").keyup(function (event) {
      var keyword = $(this).val().toLowerCase();
      $("#table_hoadon tbody tr").each(function () {
        var rowText = $(this).text().toLowerCase();
        if (rowText.indexOf(keyword) > -1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
  });
  $(document).ready(function () {
    $("#tuychonhoadon").change(function () {
      var selectedOption = $(this).val(); // Lấy giá trị của tùy chọn đã chọn

      if (selectedOption === "Tất cả") {
        // Hiển thị tất cả các hàng trong bảng
        $("#table_hoadon tbody tr").show();
      } else {
        // Lọc và hiển thị chỉ các hàng có thuộc tính data-tuychon hợp lệ
        $("#table_hoadon tbody tr")
          .hide()
          .filter(function () {
            return $(this).find(".hinhthuc").text() === selectedOption;
          })
          .show();
      }
    });
  });

  // NGUYÊN LIỆU
  //Hiện chi tiết nguyên liệu
  $("#table_nguyenlieu tbody tr td:not(:last-child)").click(function () {
    $("#nguyenlieu").hide();
    $("#chitietnguyenlieu").show();
    var manguyenlieu = $(this).closest("tr").find(".manguyenlieu").text();
    $("#manguyenlieu").text(manguyenlieu);
    var tennguyenlieu = $(this).closest("tr").find(".tennguyenlieu").text();
    $("#tennguyenlieu").text(tennguyenlieu);
    var gianhap = $(this).closest("tr").find(".gianhap").text();
    $("#gianhap").text(gianhap);
    var soluong = $(this).closest("tr").find(".soluong").text();
    $("#soluong").text(soluong);
  });
  //btn thêm nguyên liệu
  $("#btn_them_nguyenlieu").click(function () {
    $("#nguyenlieu").hide();
    $("#themnguyenlieu").show();
    var lastManguyenlieu = $("#table_nguyenlieu tbody tr:last-child td:nth-child(2)").text();
    var newManguyenlieu = "NL" + String(parseInt(lastManguyenlieu.substr(2)) + 1).padStart(3, "0");
    $("#manguyenlieumoi").text(newManguyenlieu);
    $("#tennguyenlieumoi").val("");
    $("#ngaynhapmoi").val("");
    $("#gianhapmoi").val("");
    $("#soluongmoi").val("");
  });
  //btn hủy nguyên liệu
  $(".btn_huy_nguyenlieu").click(function () {
    $("#nguyenlieu").show();
    $("#suanguyenlieu").hide();
    $("#themnguyenlieu").hide();
  });
  //btn Quay lại nguyên liệu
  $(".btn_quaylai_nguyenlieu").click(function () {
    $("#nguyenlieu").show();
    $("#chitietnguyenlieu").hide();
    $("#suanguyenlieu").hide();
    $("#themnguyenlieu").hide();
  });
  // btn lưu đồ uống
  $("#btn_luu_nguyenlieu").click(function () {
    // Lấy giá trị từng cột từ input hoặc các nguồn dữ liệu khác
    var tennguyenlieu = $("#tennguyenlieumoi").val();
    var ngaynhap = $("#ngaynhapmoi").val();
    var gianhap = parseInt($("#gianhapmoi").val());
    var gianhapFormatted = gianhap.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    var soluong = $("#soluongmoi").val();
    var lastSTT = $(
      "#table_nguyenlieu tbody tr:last-child td:nth-child(1)"
    ).text();
    var newSTT = String(parseInt(lastSTT) + 1);
    var newMa = $("#manguyenlieumoi").text();
    var newRow = $(
      "<tr><td>" +
        newSTT +
        "</td><td>" +
        newMa +
        "</td><td>" + 
        tennguyenlieu +
        "</td><td>" +
        ngaynhap +
        "</td><td>" +
        gianhapFormatted +
        "</td><td>" +
        soluong +
        "</td>"
    );
    var editButton = $("<button></button>").addClass(
      "btn pt-0 m-0 list-inline-item"
    );
    var editIcon = $("<span></span>").addClass("fas fa-edit");
    editButton.append(editIcon);
    var deleteButton = $("<button></button>").addClass(
      "btn pt-0 m-0 list-inline-item"
    );
    var deleteIcon = $("<span></span>").addClass("fas fa-trash");
    deleteButton.append(deleteIcon);
    var tuyChonTd = $("<td></td>").addClass("tuychon_nguyenlieu");
    var dongtable = $("</tr>");
    tuyChonTd.append(editButton, deleteButton);
    newRow.append(tuyChonTd);
    newRow.append(dongtable);
    $("#table_nguyenlieu tbody").append(newRow);
    $("#nguyenlieu").show();
    $("#themnguyenlieu").hide();
  });
  // Ấn nút sửa nguyên liệu
  $(document).on("click", ".tuychon_nguyenlieu .fa-edit", function () {
    $("#nguyenlieu").hide();
    $("#suanguyenlieu").show();
    var row = $(this).closest("tr");
    var manguyenlieu = row.find(".manguyenlieu").text();
    $("#manguyenlieusua").text(manguyenlieu);
    var tennguyenlieu = row.find(".tennguyenlieu").text();
    $("#tennguyenlieusua").val(tennguyenlieu);
    var giaNhap = row.find(".gianhap").text();
    $("#gianhapsua").val(giaNhap);
    var soLuong = row.find(".soluong").text();
    $("#soluongsua").val(soLuong);
    //Ấn nút lưu nguyên liệu sửa
    $("#btn_luu_nguyenlieu_sua").click(function () {
      var tennguyenlieuSauSua = $("#tennguyenlieusua").val();
      row.find(".tennguyenlieu").text(tennguyenlieuSauSua);
      var giaNhapSauSua = parseInt($("#gianhapsua").val());
      var giaNhapSauSuaFormatted = giaNhapSauSua.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      row.find(".gianhap").text(giaNhapSauSuaFormatted);
      var soluongSauSua = parseInt($("#soluong").val());
      row.find(".soluong").text(soluongSauSua);
      $("#nguyenlieu").show();
      $("#suanguyenlieu").hide();
    });
  });
  // Ấn nút xóa nguyên liệu
  $(document).on("click", ".tuychon_nguyenlieu .fa-trash", function () {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        var row = $(this).closest("tr");
        row.remove();
        Swal.fire("Đã xóa!");
      }
    });
  });

  //Thống kê thời gian
  $("#date").change(function () {
    var selectedDate = $(this).val();
    var formattedSelectedDate = moment(selectedDate).format("DD/MM/YYYY");
    var tableRows = $("#table_thongkedoanhthu tbody tr");

    // Hiển thị tất cả các hàng trong bảng
    tableRows.show();

    // Ẩn các hàng không phù hợp với ngày được chọn
    if (selectedDate) {
      tableRows.each(function () {
        var rowDate = $(this).find(".thoigian").text();
        if (rowDate !== formattedSelectedDate) {
          $(this).hide();
        }
      });
    }
  });

  //NHÂN VIÊN
  //Hiện chi tiết nhân viên
  $("#table_quanlynhanvien tbody tr td:not(:last-child)").click(function () {
    $("#quanlynhanvien").hide();
    $("#chitietnhanvien").show();
    var manhanvien = $(this).closest("tr").find(".manhanvien").text();
    $("#manhanvien").text(manhanvien);
    var tennhanvien = $(this).closest("tr").find(".tennhanvien").text();
    $("#tennhanvien").text(tennhanvien);
  });
  // btn thêm nhân viên
  $("#btn_them_nhanvien").click(function () {
    $("#quanlynhanvien").hide();
    $("#themnhanvien").show();
    var lastManhanvien = $(
      "#table_quanlynhanvien tbody tr:last-child td:nth-child(2)"
    ).text();
    var newManhanvien =
      "DU" + String(parseInt(lastManhanvien.substr(2)) + 1).padStart(3, "0");
    $("#manhanvienmoi").text(newManhanvien);
    $("#tennhanvienmoi").val("");
    $("#gioitinhmoi").val("");
    $("#namsinhmoi").val("");
    $("#mucluongmoi").val("");
  });
  // btn hủy nhân viên
  $(".btn_huy_nhanvien").click(function () {
    $("#quanlynhanvien").show();
    $("#suanhanvien").hide();
    $("#themnhanvien").hide();
  });
  // btn quay lại nhân viên
  $(".btn_quaylai_nhanvien").click(function () {
    $("#quanlynhanvien").show();
    $("#chitietnhanvien").hide();
    $("#suanhanvien").hide();
    $("#themnhanvien").hide();
  });
  // btn lưu nhân viên
  $("#btn_luu_nhanvien").click(function () {
    // Lấy giá trị từng cột từ input hoặc các nguồn dữ liệu khác
    var tennhanvien = $("#tennhanvienmoi").val();
    var mucluongmoi = parseInt($("#mucluongmoi").val());
    var mucluongFormatted = mucluong.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    var soluong = parseInt($("#soluongmoi").val());
    var lastSTT = $(
      "#table_quanlynhanvien tbody tr:last-child td:nth-child(1)"
    ).text();
    var newSTT = String(parseInt(lastSTT) + 1);
    var newMa = $("#manhanvienmoi").text();
    var newRow = $(
      "<tr><td>" +
        newSTT +
        "</td><td>" +
        newMa +
        "</td><td>" +
        tennhanvien +
        "</td><td>" +
        mucluongFormatted +
        "</td><td>" +
        soluong +
        "</td>"
    );
    var editButton = $("<button></button>").addClass(
      "btn pt-0 m-0 list-inline-item"
    );
    var editIcon = $("<span></span>").addClass("fas fa-edit");
    editButton.append(editIcon);
    var deleteButton = $("<button></button>").addClass(
      "btn pt-0 m-0 list-inline-item"
    );
    var deleteIcon = $("<span></span>").addClass("fas fa-trash");
    deleteButton.append(deleteIcon);
    var tuyChonTd = $("<td></td>").addClass("tuychon_nhanvien");
    var dongtable = $("</tr>");
    tuyChonTd.append(editButton, deleteButton);
    newRow.append(tuyChonTd);
    newRow.append(dongtable);
    $("#table_quanlynhanvien tbody").append(newRow);
    $("#quanlynhanvien").show();
    $("#themnhanvien").hide();
  });
  // Ấn nút sửa nhân viên
  $(document).on("click", ".tuychon_quanlynhanvien .fa-edit", function () {
    $("#quanlynhanvien").hide();
    $("#suanhanvien").show();
    var row = $(this).closest("tr");
    var manhanvien = row.find(".manhanvien").text();
    $("#manhanviensua").text(manhanvien);
    var tennhanvien = row.find(".tennhanvien").text();
    $("#tennhanviensua").val(tennhanvien);
    var songaycong = row.find(".songaycong").text();
    $("#songaycongsua").val(songaycong);
    var sogiotangca = row.find(".sogiotangca").text();
    $("#sogiotangcasua").val(sogiotangca);
    var thuong = row.find(".thuong").text();
    $("#thuongsua").val(thuong);
    var phat = row.find(".phat").text();
    $("#phatsua").val(phat);
    var phat = row.find(".phat").text();
    $("#phatsua").val(phat);
    //Ấn nút lưu nguyên liệu sửa
    $("#btn_luu_nhanvien_sua").click(function () {
      var tennhanvienSauSua = $("#tennhanviensua").val();
      row.find(".tennhanvien").text(tennhanvienSauSua);

      var mucluongSau = parseInt(
        parseInt($("#songaycongsua").val()) * 300000 +
          parseInt($("#sogiotangcasua").val()) * 30000
      );
      var mucluongSauFormatted = mucluongSau.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      row.find(".mucluong").text(mucluongSauFormatted);

      var tongluongSau =
        parseInt(mucluongSau) -
        parseInt($("#thuongsua").val()) +
        parseInt($("#phatsua").val());
      var tongluongSauFormatted = tongluongSau.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      row.find(".tongluong").text(tongluongSauFormatted);

      var thuongSauSua = parseInt($("#thuongsua").val());
      var thuongSauSuaFormatted = thuongSauSua.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      row.find(".thuongSauSua").text(thuongSauSuaFormatted);

      var phatSauSua = parseInt($("#phatsua").val());
      var phatSauSuaFormatted = phatSauSua.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      row.find(".phat").text(phatSauSuaFormatted);

      var songaycongSauSua = parseInt($("#songaycongsua").val());
      row.find(".songaycong").text(songaycongSauSua);
      var sogiotangcaSauSua = parseInt($("#sogiotangcasua").val());
      row.find(".sogiotangca").text(sogiotangcaSauSua);

      $("#quanlynhanvien").show();
      $("#suanhanvien").hide();
    });
  });
  // Ấn nút xóa nhân viên
  $(document).on("click", ".tuychon_quanlynhanvien .fa-trash", function () {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        var row = $(this).closest("tr");
        row.remove();
        Swal.fire("Đã xóa!");
      }
    });
  });
  $('#dangxuat').on('click', function() {
    window.location.href = "../Login/login.html";
    window.history.pushState({}, '', '../Admin/notfound.html');
    window.location.href = "../Login/login.html";
    });
    

});
