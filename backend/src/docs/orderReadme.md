# Tài liệu API Quản lý Order
<!-- Gỏ CTRL + Shift + V để trông OK hơn-->
<!-- Xem thử mẫu API: nhấp vào route api (nếu có) -->
Tài liệu này mô tả các route API và chức năng dùng để quản lý đơn hàng (Order) trong hệ thống.
API nguồn: http://localhost:3000/api/v1
---

## 1. Route: **[/order](http://localhost:3000/api/v1/order)**

- **Phương thức:** `GET`
- **Mục đích:** Lấy danh sách tất cả các đơn hàng.
- **Tham số yêu cầu:** Không có.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": [
        {
          "order_ID": "integer",
          "user_ID": "integer",
          "time": "date",
          "quantity": "integer",
          "status": "string"
        },
        ...
      ],
      "message": "Successfully All Order Retrieved!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error All Retrieving Order"
    }
    ```

---


## 2. Route: **/order**

- **Phương thức:** `POST`
- **Mục đích:** Tạo mới một đơn hàng.
- **Dữ liệu yêu cầu:**
  - `user_ID` (integer): ID của người dùng.
  - `time` (date): Ngày đặt hàng.
  - `quantity` (integer): Số lượng.
  - `status` (string): Trạng thái đơn hàng (ví dụ: "chưa thanh toán", "đã thanh toán").
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "order_ID": "integer",
        "user_ID": "integer",
        "time": "date",
        "quantity": "integer",
        "status": "string"
      },
      "message": "Successfully Create Order!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Create Order"
    }
    ```

---

## 3. Route: **/order/:id**

- **Phương thức:** `PUT`
- **Mục đích:** Cập nhật thông tin của một đơn hàng cụ thể.
- **Tham số yêu cầu:**
  - `id` (integer): ID của đơn hàng cần cập nhật.
- **Dữ liệu yêu cầu:** 
  - Các trường có thể cập nhật:
    - `user_ID` (integer): ID của người dùng.
    - `time` (date): Ngày đặt hàng.
    - `quantity` (integer): Số lượng.
    - `status` (string): Trạng thái đơn hàng.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "order_ID": "integer",
        "user_ID": "integer",
        "time": "date",
        "quantity": "integer",
        "status": "string"
      },
      "message": "Successfully Update Order!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Update Order"
    }
    ```

---

## 4. Route: **/order/:id**

- **Phương thức:** `DELETE`
- **Mục đích:** Xóa một đơn hàng khỏi hệ thống.
- **Tham số yêu cầu:**
  - `id` (integer): ID của đơn hàng cần xóa.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "order_ID": "integer"
      },
      "message": "Successfully Delete Order!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Delete Order"
    }
    ```

---

## Chú thích

- **Orders** đại diện cho các đơn đặt hàng trong hệ thống, bao gồm thông tin người dùng, ngày đặt, số lượng, và trạng thái.
