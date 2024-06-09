$(document).ready(function(){
    $('#eye').click(function(){
        $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa-eye-slash fa-eye');
        if($(this).hasClass('open')){
            $(this).prev().attr('type', 'text');
        }else{
            $(this).prev().attr('type', 'password');
        }
    });
});
var accounts = [
  { username: "ql1001", password:"abc123", role: "admin" },
  { username: "ql1002", password:"abc123", role: "admin" },
  { username: "nv1001", password:"abc123", role: "employee" },
  { username: "nv1002", password:"abc123", role: "employee" },
  // Thêm các tài khoản khác vào đây
];
function checkLogin() {
  var username = $("#username-input").val();
  var password = $("#password-input").val();
  var errorMessage = $("#error-message");

  if (username === "" || password === "") {
    // Người dùng chưa nhập đầy đủ thông tin
    errorMessage.text("Vui lòng nhập đầy đủ thông tin");
  } else {
    var account = findAccount(username);
    
    if (account) {
      if (password === account.password) {
        // Kiểm tra vai trò
        if (account.role === "admin") {
          sessionStorage.setItem("username_admin", account.username);
          window.location.href = "../Admin/home.html";
          // Vai trò admin => chuyển hướng đến trang quản trị
        } else if (account.role === "employee") {
          // Vai trò nhân viên => chuyển hướng đến trang nhân viên
          window.location.href = "../Home/home.html";
        }
      } else {
        // Mật khẩu không đúng
        errorMessage.text("Mật khẩu không đúng.");
      }
    } else {
      // Tài khoản không tồn tại
      errorMessage.text("Tài khoản hoặc mật khẩu không đúng");
    }
  }
  };
  function findAccount(username) {
    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].username === username) {
        return accounts[i];
      }
    }
    return null;
  };