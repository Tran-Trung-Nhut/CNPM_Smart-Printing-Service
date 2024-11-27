# Tài liệu API Quản lý Paper Package
<!-- Gỏ CTRL + Shift + V để trông OK hơn-->
<!-- Xem thử mẫu API: nhấp vào route api (nếu có) -->
Tài liệu này mô tả các route API và chức năng dùng để quản lý gói giấy (Paper Package) trong hệ thống.
API nguồn: http://localhost:3000/api/v1

---

## 1. Route: **[/paperpackage](http://localhost:3000/api/v1/paperpackage)**

- **Phương thức:** `GET`
- **Mục đích:** Lấy danh sách tất cả gói giấy.
- **Tham số yêu cầu:** Không có.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": [
        {
          "pp_ID": "integer",
          "name": "string",
          "quantity": "integer",
          "price": "integer"
        },
        ...
      ],
      "message": "Successfully All Paper Package Retrieved!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error ALL Retrieving Paper Package"
    }
    ```

---

## 2. Route: **[/paperpackage](http://localhost:3000/api/v1/paperpackage)**

- **Phương thức:** `POST`
- **Mục đích:** Tạo mới một gói giấy.
- **Dữ liệu yêu cầu:**
  - `name` (string): Tên của gói giấy.
  - `quantity` (integer): Số lượng giấy trong gói.
  - `price` (integer): Giá của gói giấy.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "pp_ID": "integer",
        "name": "string",
        "quantity": "integer",
        "price": "integer"
      },
      "message": "Successfully Create Paper Package!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Create Paper Package"
    }
    ```

---

## 3. Route: **/paperpackage/:id**

- **Phương thức:** `PUT`
- **Mục đích:** Cập nhật thông tin của một gói giấy cụ thể.
- **Tham số yêu cầu:**
  - `id` (integer): ID của gói giấy cần cập nhật.
- **Dữ liệu yêu cầu:**
  - Các trường có thể cập nhật:
    - `name` (string): Tên của gói giấy.
    - `quantity` (integer): Số lượng giấy trong gói.
    - `price` (integer): Giá của gói giấy.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "pp_ID": "integer",
        "name": "string",
        "quantity": "integer",
        "price": "integer"
      },
      "message": "Successfully Update Paper Package!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Update Paper Package"
    }
    ```

---

## 4. Route: **/paperpackage/:id**

- **Phương thức:** `DELETE`
- **Mục đích:** Xóa một gói giấy khỏi hệ thống.
- **Tham số yêu cầu:**
  - `id` (integer): ID của gói giấy cần xóa.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "pp_ID": "integer"
      },
      "message": "Successfully Delete Paper Package!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Delete Paper Package"
    }
    ```

---

## Chú thích

- **Paper Package** đại diện cho một gói giấy trong hệ thống, bao gồm thông tin như tên, số lượng giấy, và giá.
