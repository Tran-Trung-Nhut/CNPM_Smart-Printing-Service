# Tài liệu API Quản lý File Types
<!-- Gỏ CTRL + Shift + V để trông OK hơn-->
<!-- Xem thử mẫu API: nhấp vào route api (nếu có) -->
Tài liệu này mô tả các route API và chức năng dùng để quản lý loại file (File Types) trong hệ thống.
API nguồn: http://localhost:3000/api/v1
---

## 1. Route: **[/filetypes](http://localhost:3000/api/v1/filetypes)**

- **Phương thức:** `GET`
- **Mục đích:** Lấy danh sách tất cả các loại file.
- **Tham số yêu cầu:** Không có.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": [
        {
          "type": "string",
          "spso_ID": "integer"
        },
        ...
      ],
      "message": "Danh sách các loại file đã được lấy thành công!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Lỗi khi lấy danh sách các loại file"
    }
    ```

---

## 2. Route: **/filetypes**

- **Phương thức:** `POST`
- **Mục đích:** Tạo mới một loại file.
- **Dữ liệu yêu cầu:**
  - `type` (string): Tên của loại file.
  - `spso_ID` (integer): ID của người quản lý (SPSo).
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 201,
      "message": "Loại file mới đã được thêm thành công!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Lỗi khi thêm loại file mới"
    }
    ```

---

## 3. Route: **/filetypes/:type**

- **Phương thức:** `DELETE`
- **Mục đích:** Xóa một loại file cụ thể.
- **Tham số yêu cầu:**
  - `type` (string): Tên của loại file cần xóa.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "message": "Loại file đã được xóa thành công!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Lỗi khi xóa loại file"
    }
    ```

---

## 4. Route: **/filetypes/validate**

- **Phương thức:** `POST`
- **Mục đích:** Kiểm tra xem một loại file có hợp lệ hay không.
- **Dữ liệu yêu cầu:**
  - `type` (string): Tên của loại file cần kiểm tra.
- **Dữ liệu trả về:**
  - **Hợp lệ:**
    ```json
    {
      "status": 200,
      "message": "Loại file hợp lệ!"
    }
    ```
  - **Không hợp lệ:**
    ```json
    {
      "status": 400,
      "message": "Loại file không được phép"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Lỗi khi kiểm tra loại file"
    }
    ```

---

## Chú thích

- **File Types** đại diện cho các loại file được hỗ trợ trong hệ thống, có liên kết với người quản lý (SPSo).

