-- Thêm dữ liệu vào bảng User
INSERT INTO User (user_ID, email, password, name, role, pageBalance) VALUES
(1, 'student1@example.com', 'password123', 'Student One', 'student', 100),
(2, 'student2@example.com', 'password123', 'Student Two', 'student', 50),
(3, 'spso1@example.com', 'password123', 'SPSO One', 'spso', 200);

-- Thêm dữ liệu vào bảng FileType
INSERT INTO FileType (type, spso_ID) VALUES
('PDF', 3),
('DOCX', 3),
('TXT', NULL);

-- Thêm dữ liệu vào bảng AutoPaper
INSERT INTO AutoPaper (semester, number, scheduler, spso_ID) VALUES
('2024_Fall', 5, '2024-09-01 09:00:00', 3),
('2024_Spring', 3, '2024-01-15 09:00:00', 3);

-- Thêm dữ liệu vào bảng Location
INSERT INTO Location (campus, building, room) VALUES
('Main Campus', 'Building A', '101'),
('Main Campus', 'Building B', '202'),
('North Campus', 'Building C', '303');

-- Thêm dữ liệu vào bảng Printer
INSERT INTO Printer (branchName, model, description, status, loc_ID) VALUES
('HP', 'LaserJet Pro MFP M428fdw', 'Fast printing, optimized for office', 'enable', 1),
('Canon', 'PIXMA TR8520', 'Compact, wireless printer', 'enable', 2),
('Brother', 'HL-L2350DW', 'Monochrome laser printer', 'disable', 3);

-- Thêm dữ liệu vào bảng PrintConfiguration
INSERT INTO PrintConfiguration (printStart, printEnd, student_ID, printer_ID) VALUES
('2024-11-01 08:00:00', '2024-11-01 10:00:00', 1, 1),
('2024-11-02 09:00:00', '2024-11-02 11:00:00', 2, 2);

-- Thêm dữ liệu vào bảng Document
INSERT INTO Document (config_ID, DName, noPage, pageSize) VALUES
(1, 'Report.pdf', 10, 'A4'),
(1, 'Assignment.docx', 5, 'A4'),
(2, 'Project.txt', 3, 'Letter');
