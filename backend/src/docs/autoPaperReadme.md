# Tài liệu API Quản lý Auto Paper
<!-- Gỏ CTRL + Shift + V để trông OK hơn-->
<!-- Xem thử mẫu API: nhấp vào route api (nếu có) -->
Tài liệu này mô tả các route API và chức năng dùng để quản lý giấy tự động (Auto Paper) trong hệ thống.
API nguồn: http://localhost:3000/api/v1

---

## 1. Route: **[/paper](http://localhost:3000/api/v1/paper)**

- **Phương thức:** `GET`
- **Mục đích:** Lấy danh sách tất cả các kỳ học và số lượng giấy miễn phí được cấp phát.
- **Tham số yêu cầu:** Không có.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "data": [
        {
          "semester": "string",
          "number": "integer",
          "scheduler": "datetime",
          "spso_ID": "integer"
        },
        ...
      ],
      "message": "Danh sách các kỳ học và số lượng giấy miễn phí đã được lấy thành công!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Lỗi khi lấy danh sách các kỳ học"
    }
    ```

---

## 2. Route: **/paper**

- **Phương thức:** `POST`
- **Mục đích:** Thêm mới một kỳ học và số lượng giấy miễn phí.
- **Dữ liệu yêu cầu:**
  - `semester` (string): Tên kỳ học (ví dụ: "Fall 2024").
  - `number` (integer): Số lượng giấy miễn phí cấp phát.
  - `scheduler` (datetime): Thời gian cấp phát.
  - `spso_ID` (integer): ID của người quản lý (SPSo).
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 201,
      "message": "Kỳ học mới và số lượng giấy miễn phí đã được thêm thành công!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Lỗi khi thêm kỳ học mới"
    }
    ```

---

## 3. Route: **/paper/:semester**

- **Phương thức:** `PUT`
- **Mục đích:** Cập nhật thông tin của một kỳ học.
- **Tham số yêu cầu:**
  - `semester` (string): Tên kỳ học cần cập nhật.
- **Dữ liệu yêu cầu:**
  - Các trường có thể cập nhật:
    - `number` (integer): Số lượng giấy miễn phí cấp phát.
    - `scheduler` (datetime): Thời gian cấp phát.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "message": "Thông tin kỳ học đã được cập nhật thành công!"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Lỗi khi cập nhật thông tin kỳ học"
    }
    ```

---

## 4. Route: **/paper/buy**

- **Phương thức:** `POST`
- **Mục đích:** Mua thêm giấy in cho sinh viên.
- **Dữ liệu yêu cầu:**
  - `user_ID` (integer): ID của người dùng.
  - `additionalPages` (integer): Số trang giấy cần mua thêm.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "status": 200,
      "message": "Mua thêm {additionalPages} trang thành công! Số dư hiện tại: {newBalance} trang."
    }
    ```
  - **Lỗi:**
    ```json
    {
      "status": 500,
      "message": "Lỗi khi mua thêm giấy"
    }
    ```

---

## Chú thích

- **Auto Paper** đại diện cho các kỳ học và số lượng giấy miễn phí được cấp phát, cùng với chức năng mua thêm giấy cho người dùng.
- API hỗ trợ các chức năng CRUD (Create, Read, Update) và một chức năng đặc biệt để mua thêm giấy.
