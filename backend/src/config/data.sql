-- Dữ liệu cho bảng User
INSERT INTO `User` (`user_ID`, `email`, `password`, `name`, `role`, `pageBalance`)
VALUES 
(1, 'student1@example.com', 'password123', 'Student One', 'student', 100),
(2, 'student2@example.com', 'password123', 'Student Two', 'student', 150),
(3, 'spso1@example.com', 'password123', 'SPSO One', 'spso', 0);

-- Dữ liệu cho bảng FileType
INSERT INTO `FileType` (`type`, `spso_ID`)
VALUES
('PDF', 3),
('DOCX', 3),
('JPEG', NULL);

-- Dữ liệu cho bảng AutoPaper
INSERT INTO `AutoPaper` (`semester`, `number`, `scheduler`, `spso_ID`)
VALUES
('Fall2024', 500, '2024-12-01 09:00:00', 3),
('Spring2025', 300, '2025-04-01 09:00:00', 3);

-- Dữ liệu cho bảng Location
INSERT INTO `Location` (`campus`, `building`, `room`)
VALUES
('Main Campus', 'Building A', '101'),
('Main Campus', 'Building B', '202'),
('North Campus', 'Building C', '303');

-- Dữ liệu cho bảng Printer
INSERT INTO `Printer` (`branchName`, `model`, `description`, `status`, `loc_ID`)
VALUES
('Printer Alpha', 'HP LaserJet 1020', 'Fast and reliable.', 'enable', 1),
('Printer Beta', 'Canon PIXMA MG3600', 'Great for color printing.', 'enable', 2),
('Printer Gamma', 'Epson EcoTank L3150', 'Cost-efficient.', 'disable', 3);

-- -- Dữ liệu cho bảng PrintConfiguration
-- INSERT INTO `PrintConfiguration` (`printStart`, `printEnd`, `user_ID`, `printer_ID`)
-- VALUES
-- ('2024-11-28 08:00:00', '2024-11-28 12:00:00', 1, 1),
-- ('2024-11-28 13:00:00', '2024-11-28 17:00:00', 2, 2);

-- -- Dữ liệu cho bảng Document
-- INSERT INTO `Document` (`config_ID`, `DName`, `noPage`, `pageSize`)
-- VALUES
-- (1, 'Thesis.pdf', 120, 'A4'),
-- (1, 'Report.docx', 30, 'A4'),
-- (2, 'Presentation.pptx', 15, 'A3');

-- -- Dữ liệu cho bảng Orders
-- INSERT INTO `Orders` (`user_ID`, `quantityPaper`, `quantityPackage1`, `quantityPackage2`, `quantityPackage3`, `dateOrder`, `datePaid`, `status`)
-- VALUES
-- (1, 100, 2, 1, 0, '2024-11-25', '2024-11-26', 'đã thanh toán'),
-- (2, 50, 0, 0, 1, '2024-11-26', NULL, 'chưa thanh toán');

-- -- Dữ liệu cho bảng Paper_Package
-- INSERT INTO `Paper_Package` (`name`, `quantity`, `price`)
-- VALUES
-- ('Package A', 100, 50),
-- ('Package B', 200, 90),
-- ('Package C', 500, 200);

-- -- Dữ liệu cho bảng Order_Package
-- INSERT INTO `Order_Package` (`order_ID`, `description`, `price`, `originalPrice`, `discount`)
-- VALUES
-- (1, 'Black Friday Discount', 45, 50, 5),
-- (2, 'Early Bird Discount', 85, 90, 5);
