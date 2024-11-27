# Tài liệu API Quản lý Order Package
<!-- Gỏ CTRL + Shift + V để trông OK hơn-->
<!-- Xem thử mẫu API: nhấp vào route api (nếu có) -->
Tài liệu này mô tả các route API và chức năng dùng để quản lý mối quan hệ giữa đơn hàng và gói giấy (Order Package) trong hệ thống.
API nguồn: http://localhost:3000/api/v1
---

## 1. Route: **[/orderpackage](http://localhost:3000/api/v1/orderpackage)**

- **Phương thức:** `GET`
- **Mục đích:** Lấy danh sách tất cả các mối quan hệ giữa đơn hàng và gói giấy.
- **Tham số yêu cầu:** Không có.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": [
        {
          "order_ID": "integer",
          "pp_ID": "integer"
        },
        ...
      ],
      "message": "Successfully Order Package Retrieved!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Retrieving Order Package"
    }
    ```

---

## 2. Route: **/orderpackage**

- **Phương thức:** `POST`
- **Mục đích:** Tạo mới một mối quan hệ giữa đơn hàng và gói giấy.
- **Dữ liệu yêu cầu:**
  - `order_ID` (integer): ID của đơn hàng.
  - `pp_ID` (integer): ID của gói giấy.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "order_ID": "integer",
        "pp_ID": "integer"
      },
      "message": "Successfully Create Order Package!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Create Order Package"
    }
    ```

---

## 3. Route: **/orderpackage/:id1/:id2**

- **Phương thức:** `PUT`
- **Mục đích:** Cập nhật thông tin mối quan hệ giữa đơn hàng và gói giấy cụ thể.
- **Tham số yêu cầu:**
  - `id1` (integer): ID của đơn hàng.
  - `id2` (integer): ID của gói giấy.
- **Dữ liệu yêu cầu:** 
  - Các trường có thể cập nhật:
    - `newOrder_ID` (integer): ID mới của đơn hàng.
    - `newPP_ID` (integer): ID mới của gói giấy.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "order_ID": "integer",
        "pp_ID": "integer"
      },
      "message": "Successfully Update Order Package!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Update Order Package"
    }
    ```

---

## 4. Route: **/orderpackage/:id1/:id2**

- **Phương thức:** `DELETE`
- **Mục đích:** Xóa mối quan hệ giữa đơn hàng và gói giấy khỏi hệ thống.
- **Tham số yêu cầu:**
  - `id1` (integer): ID của đơn hàng.
  - `id2` (integer): ID của gói giấy.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "order_ID": "integer",
        "pp_ID": "integer"
      },
      "message": "Successfully Delete Order Package!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Delete Order Package"
    }
    ```

---

## Chú thích

- **Order Package** đại diện cho mối quan hệ giữa các đơn hàng và các gói giấy, cho phép liên kết thông tin về số lượng gói giấy được đặt trong từng đơn hàng.
