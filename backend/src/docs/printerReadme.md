# Tài liệu API Quản lý Máy in
<!-- Gỏ CTRL + Shift + V để trông OK hơn-->
<!-- Xem thử mẫu API: nhấp vào route api (nếu có) -->
Tài liệu này mô tả các route API và chức năng dùng để quản lý máy in trong hệ thống Smart Printing Service.
API nguồn: http://localhost:3000/api/v1
---
Printer đang trong quá trình build bởi team BE
## 1. Route: **[/printers](http://localhost:3000/api/v1/printers)**

- **Phương thức:** `GET`
- **Mục đích:** Lấy danh sách tất cả máy in.
- **Tham số yêu cầu:** Không có.
- **Dữ liệu trả về:**
    ```json
    {
      "status": 200,
      "data": [
        {
          "id": "integer",
          "name": "string",
          "model": "string",
          "status": "string",
          "location": "string"
        },
        ...
      ],
      "message": "Successfully Printers Retrieved!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Retrieving Printers"
    }
    ```

---
