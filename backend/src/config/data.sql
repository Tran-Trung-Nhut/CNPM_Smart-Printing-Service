-- Bảng User
INSERT INTO `User` (`user_ID`, `email`, `password`, `name`, `role`, `pageBalance`)
VALUES 
(1, 'student1@example.com', 'password123', 'Student 1', 'student', 100),
(2, 'student2@example.com', 'password123', 'Student 2', 'student', 200),
(3, 'spso1@example.com', 'password123', 'SPSO 1', 'spso', 300);

-- Bảng FileType
INSERT INTO `FileType` (`type`, `spso_ID`)
VALUES 
('PDF', 3),
('DOCX', 3);

-- Bảng AutoPaper
INSERT INTO `AutoPaper` (`semester`, `number`, `scheduler`, `spso_ID`)
VALUES 
('Fall 2024', 100, '2024-11-01 08:00:00', 3),
('Spring 2025', 200, '2025-01-01 08:00:00', 3);

-- Bảng Location
INSERT INTO `Location` (`campus`, `building`, `room`)
VALUES 
('Campus A', 'Building 1', 'Room 101'),
('Campus B', 'Building 2', 'Room 202');

-- Bảng Printer
INSERT INTO `Printer` (`branchName`, `model`, `description`, `status`, `loc_ID`)
VALUES 
('Printer 1', 'Model X', 'High-speed printer', 'enable', 1),
('Printer 2', 'Model Y', 'Eco-friendly printer', 'disable', 2);

-- Bảng PrintConfiguration
INSERT INTO `PrintConfiguration` (`printStart`, `printEnd`, `user_ID`, `printer_ID`)
VALUES 
('2024-11-01 09:00:00', '2024-11-01 09:30:00', 1, 1),
('2024-11-02 10:00:00', '2024-11-02 10:45:00', 2, 2);

-- Bảng Document
INSERT INTO `Document` (`config_ID`, `DName`, `noPage`, `pageSize`, `docType`)
VALUES 
(1, 'Document 1', 10, 'A4', 'PDF'),
(2, 'Document 2', 20, 'A4', 'DOCX');

-- Bảng Properties
INSERT INTO `Properties` (`config_ID`, `pageSize`, `noCopy`, `noPage`, `startPage`, `endPage`, `scale`, `isDuplex`, `orientation`)
VALUES 
(1, 'A4', 1, 10, 1, 10, 100, '1', 'Dọc'),
(2, 'A3', 2, 20, 1, 20, 100, '2', 'Ngang');

-- Bảng Orders
INSERT INTO `Orders` (`user_ID`, `time`, `quantity`, `status`)
VALUES 
(1, '2024-11-20', 5, 'đã thanh toán'),
(2, '2024-11-21', 10, 'chưa thanh toán');

-- Bảng Paper_Package
INSERT INTO `Paper_Package` (`name`, `quantity`, `price`)
VALUES 
('Package A', 500, 1000),
('Package B', 1000, 1800);

-- Bảng Order_Package
INSERT INTO `Order_Package` (`order_ID`, `pp_ID`)
VALUES 
(1, 1),
(2, 2);
