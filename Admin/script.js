$(document).ready(function() {
    var username_admin = sessionStorage.getItem("username_admin");
    document.getElementById("username").innerText = username_admin;
    //Sinh stt
    function autoSTT(tableID){
      var table = document.getElementById(tableID);
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
      var cell = document.createElement("td");
      cell.textContent = i + 1;
      rows[i].insertBefore(cell, rows[i].firstChild);
    }
    };
    autoSTT("table_danhmuc");
    autoSTT("table_douong");
    autoSTT("table_hoadon");
    autoSTT("table_nguyenlieu");
    autoSTT("table_thongkedoanhthu");
    autoSTT("table_quanlynhanvien");
    
    // Sinh tùy chọn
    function autoTuyChon(tableID, TuyChonClass) {
      var table = document.getElementById(tableID);
      var tbody = table.querySelector("tbody");
      
      var rows = tbody.getElementsByTagName("tr");
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        
        // Tạo ô tùy chọn và thêm các button vào
        var tuyChonTd = document.createElement("td");
        tuyChonTd.className = TuyChonClass;
        
        var editButton = document.createElement("button");
        editButton.className = "btn pt-0 m-0 list-inline-item";
        var editIcon = document.createElement("span");
        editIcon.className = "fas fa-edit";
        editButton.appendChild(editIcon);
        tuyChonTd.appendChild(editButton);
        
        var deleteButton = document.createElement("button");
        deleteButton.className = "btn pt-0 m-0 list-inline-item";
        var deleteIcon = document.createElement("span");
        deleteIcon.className = "fas fa-trash";
        deleteButton.appendChild(deleteIcon);
        tuyChonTd.appendChild(deleteButton);
        
        row.appendChild(tuyChonTd);
      }
    }
    autoTuyChon("table_danhmuc", "tuychon_danhmuc");
    autoTuyChon("table_douong", "tuychon_douong");
    autoTuyChon("table_nguyenlieu", "tuychon_nguyenlieu");
    autoTuyChon("table_quanlynhanvien","tuychon_quanlynhanvien");
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

      

});