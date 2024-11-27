
# CÔNG NGHỆ PHẦN MỀM - ASSIGNMENT - HỆ THỐNG IN ẤN THÔNG MINH

## NHÓM xx

### GIỚI THIỆU

Nhóm tác giả xây dựng một ứng dụng web giúp sinh viên trong trường Đại học Bách khoa - ĐHQG-HCM có thể đăng ký in tài liệu trực tuyến một cách nhanh chóng và tiện lợi ở các máy in trong khuông viên trường

### ĐÓNG GÓP
Thành viên nhóm tác giả:

- Trần Trung Nhựt - 2212483 - nhut.trannov25th@hcmut.edu.vn
- Lâm Bảo Minh - 2212040 - minh.lamamaus@hcmut.edu.vn
- Đặng Tiến Đạt - 2210658 - dat.dang1202@hcmut.edu.vn
- Nguyễn Thanh Khánh - 2211527 - khanh.nguyen2211527@hcmut.edu.vn
- Đặng Nguyễn Minh Thư - 2320015 - thu.dangnm@hcmut.edu.vn
- Đặng Xuân Huy - 2211161 - huy.dang9999haloed@hcmut.edu.vn
- Nguyễn Minh Tú - 2213848 - tu.nguyenhydekiri@hcmut.edu.vn
  
### ĐIỀU KIỆN TIÊN QUYẾT
Trước khi tiếp tục, hãy chắc chắn bạn đáp ứng đủ những điều kiện sau:
- Thiết bị của bạn đã được cài đặt **Node js** phiên bản từ  **v18.15.0**

### KHỞI ĐỘNG ỨNG DỤNG
#### Back-end
1. `cd backend`: Nếu bạn đang không trong thư mục **backend**
2. `docker compose up -d`: Đóng gói image và chạy container của bakend app
3. [optional] `docker exec -i backend-sps-mysql-1 mysql -uroot -p123456 SPS_database < src/config/data.sql`: thêm dữ liệu trong data.sql để thử nghiệm 
4. `docker compose down`: Để dừng và xóa container của backend

#### Front-end
1. `cd frontend`:  Nếu bạn đang không trong thư mục **frontend**
2. `npm install`:  Tải cải tất cả các gói tin dependencies cần thiết
3. `npm start`:
    Chạy ứng dụng trong chế độ *nhà phát triển*.\
   Mở đường dẫn [http://localhost:3000]{http://localhost:3000} để xem giao diện trên trình duyệt.

   Trang sẽ tải lại mỗi khi có thay đổi trong source code.\
   Lỗi cũng sẽ được hiển thị ngay trên trình duyệt.
