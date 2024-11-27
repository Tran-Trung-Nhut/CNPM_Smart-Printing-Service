# Tài liệu API Quản lý Documents
<!-- Gỏ CTRL + Shift + V để trông OK hơn-->
<!-- Xem thử mẫu API: nhấp vào route api (nếu có) -->
Tài liệu này mô tả các route API và chức năng dùng để quản lý tài liệu (Documents) trong hệ thống.
API nguồn: http://localhost:3000/api/v1
---

## 1. Route: **[/document](http://localhost:3000/api/v1/document)**

- **Phương thức:** `GET`
- **Mục đích:** Lấy danh sách tất cả các tài liệu.
- **Tham số yêu cầu:** Không có.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": [
        {
          "config_ID": "integer",
          "DName": "string",
          "noPage": "integer",
          "pageSize": "string"
        },
        ...
      ],
      "message": "Successfully All Document Retrieved!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error All Retrieving Document"
    }
    ```

---

## 2. Route: **/document**

- **Phương thức:** `POST`
- **Mục đích:** Tạo mới một tài liệu.
- **Dữ liệu yêu cầu:**
  - `config_ID` (integer): ID của cấu hình in.
  - `DName` (string): Tên của tài liệu.
  - `noPage` (integer): Số trang của tài liệu.
  - `pageSize` (string): Kích thước trang (ví dụ: "A4", "Letter").
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "config_ID": "integer",
        "DName": "string",
        "noPage": "integer",
        "pageSize": "string"
      },
      "message": "Successfully Create Document!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Create Document"
    }
    ```

---

## 3. Route: **/document/:id/:name**

- **Phương thức:** `PUT`
- **Mục đích:** Cập nhật thông tin của một tài liệu cụ thể.
- **Tham số yêu cầu:**
  - `id` (integer): ID của cấu hình in.
  - `name` (string): Tên của tài liệu.
- **Dữ liệu yêu cầu:** 
  - Các trường có thể cập nhật:
    - `noPage` (integer): Số trang của tài liệu.
    - `pageSize` (string): Kích thước trang.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "config_ID": "integer",
        "DName": "string",
        "noPage": "integer",
        "pageSize": "string"
      },
      "message": "Successfully Update Document!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Update Document"
    }
    ```

---

## 4. Route: **/document/:id/:name**

- **Phương thức:** `DELETE`
- **Mục đích:** Xóa một tài liệu khỏi hệ thống.
- **Tham số yêu cầu:**
  - `id` (integer): ID của cấu hình in.
  - `name` (string): Tên của tài liệu.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "config_ID": "integer",
        "DName": "string"
      },
      "message": "Successfully Delete Document!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Delete Document"
    }
    ```

---

## Chú thích

- **Documents** đại diện cho tài liệu được in trong hệ thống, với thông tin liên kết với cấu hình in (Print Configuration).

