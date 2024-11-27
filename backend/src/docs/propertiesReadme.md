# Tài liệu API Quản lý Properties
<!-- Gỏ CTRL + Shift + V để trông OK hơn-->
<!-- Xem thử mẫu API: nhấp vào route api (nếu có) -->
Tài liệu này mô tả các route API và chức năng dùng để quản lý cấu hình (properties) trong hệ thống.
API nguồn: http://localhost:3000/api/v1
---

## 1. Route: **[/properties](http://localhost:3000/api/v1/properties)**

- **Phương thức:** `GET`
- **Mục đích:** Lấy danh sách tất cả cấu hình (properties).
- **Tham số yêu cầu:** Không có.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": [
        {
          "config_ID": "string",
          "pageSize": "string",
          "noCopy": "integer",
          "noPage": "integer",
          "startPage": "integer",
          "endPage": "integer",
          "scale": "float",
          "isDuplex": "boolean",
          "orientation": "string"
        },
        ...
      ],
      "message": "Successfully All Properties Retrieved!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error All Retrieving Properties"
    }
    ```

---

## 2. Route: **[/properties/:id](http://localhost:3000/api/v1/properties/1)**

- **Phương thức:** `GET`
- **Mục đích:** Lấy thông tin chi tiết của một cấu hình cụ thể theo ID.
- **Tham số yêu cầu:**
  - `id` (string): ID của cấu hình cần lấy.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "config_ID": "string",
        "pageSize": "string",
        "noCopy": "integer",
        "noPage": "integer",
        "startPage": "integer",
        "endPage": "integer",
        "scale": "float",
        "isDuplex": "boolean",
        "orientation": "string"
      },
      "message": "Successfully Properties Retrieved By Config ID!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Retrieving Properties By Config ID"
    }
    ```

---

## 3. Route: **/properties**

- **Phương thức:** `POST`
- **Mục đích:** Tạo mới một cấu hình (property).
- **Dữ liệu yêu cầu:**
  - `config_ID` (string): ID cấu hình.
  - `pageSize` (string): Kích thước trang (ví dụ: "A4", "Letter").
  - `noCopy` (integer): Số bản sao.
  - `noPage` (integer): Số trang.
  - `startPage` (integer): Trang bắt đầu.
  - `endPage` (integer): Trang kết thúc.
  - `scale` (float): Tỉ lệ phóng to/thu nhỏ.
  - `isDuplex` (boolean): In hai mặt (true/false).
  - `orientation` (string): Định hướng trang (ví dụ: "portrait", "landscape").
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "config_ID": "string",
        "pageSize": "string",
        "noCopy": "integer",
        "noPage": "integer",
        "startPage": "integer",
        "endPage": "integer",
        "scale": "float",
        "isDuplex": "boolean",
        "orientation": "string"
      },
      "message": "Successfully Create Properties!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Create Properties"
    }
    ```

---

## 4. Route: **/properties/:id**

- **Phương thức:** `PUT`
- **Mục đích:** Cập nhật thông tin của một cấu hình cụ thể.
- **Tham số yêu cầu:**
  - `id` (string): ID của cấu hình cần cập nhật.
- **Dữ liệu yêu cầu:** 
  - Các trường có thể cập nhật:
    - `pageSize` (string): Kích thước trang.
    - `noCopy` (integer): Số bản sao.
    - `noPage` (integer): Số trang.
    - `startPage` (integer): Trang bắt đầu.
    - `endPage` (integer): Trang kết thúc.
    - `scale` (float): Tỉ lệ phóng to/thu nhỏ.
    - `isDuplex` (boolean): In hai mặt.
    - `orientation` (string): Định hướng trang.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "config_ID": "string",
        "pageSize": "string",
        "noCopy": "integer",
        "noPage": "integer",
        "startPage": "integer",
        "endPage": "integer",
        "scale": "float",
        "isDuplex": "boolean",
        "orientation": "string"
      },
      "message": "Successfully Update Properties!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Update Properties"
    }
    ```

---

## 5. Route: **/properties/:id**

- **Phương thức:** `DELETE`
- **Mục đích:** Xóa một cấu hình khỏi hệ thống.
- **Tham số yêu cầu:**
  - `id` (string): ID của cấu hình cần xóa.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": {
        "config_ID": "string"
      },
      "message": "Successfully Delete Properties!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Error Delete Properties"
    }
    ```

---
