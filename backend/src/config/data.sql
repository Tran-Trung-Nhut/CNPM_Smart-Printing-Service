-- Insert data for User table
INSERT INTO User (user_ID, email, password, name, role, pageBalance) VALUES
(1, 'student1@example.com', 'password123', 'Student One', 'student', 100),
(2, 'student2@example.com', 'password123', 'Student Two', 'student', 50),
(3, 'spso1@example.com', 'password123', 'SPSO One', 'spso', 200),
(4, 'spso2@example.com', 'password123', 'SPSO Two', 'spso', 150);

-- Insert data for FileType table
INSERT INTO FileType (type, spso_ID) VALUES
('PDF', 3),
('Word Document', 4),
('Excel Spreadsheet', 3);

-- Insert data for AutoPaper table
INSERT INTO AutoPaper (semester, number, scheduler, spso_ID) VALUES
('Fall 2024', 100, '2024-09-01 08:00:00', 3),
('Spring 2025', 150, '2025-01-15 09:00:00', 4);

-- Insert data for Location table
INSERT INTO Location (campus, building, room) VALUES
('Main Campus', 'Building A', 'Room 101'),
('West Campus', 'Building B', 'Room 202'),
('East Campus', 'Building C', 'Room 303');

-- Insert data for Printer table
INSERT INTO Printer (branchName, model, description, status, loc_ID) VALUES
('Printer1', 'HP LaserJet', 'High-speed printer', 'enable', 1),
('Printer2', 'Canon Pixma', 'Color printer', 'disable', 2),
('Printer3', 'Epson EcoTank', 'Eco-friendly printer', 'enable', 3);

-- Insert data for PrintConfiguration table
INSERT INTO PrintConfiguration (printStart, printEnd, student_ID, printer_ID) VALUES
('2024-11-01 08:00:00', '2024-11-01 09:00:00', 1, 1),
('2024-11-02 10:00:00', '2024-11-02 11:00:00', 2, 2),
('2024-11-03 13:00:00', '2024-11-03 14:00:00', 1, 3);

-- Insert data for Document table
INSERT INTO Document (config_ID, DName, noPage, pageSize) VALUES
(1, 'Document1', 10, 'A4'),
(2, 'Document2', 15, 'Letter'),
(3, 'Document3', 20, 'A3');

-- Insert data for Order table
INSERT INTO Orders (user_ID, time, quantity, status) VALUES
(1, '2024-10-25', 100, 'chưa thanh toán'),
(2, '2024-10-26', 50, 'chưa thanh toán'),
(1, '2024-10-27', 75, 'đã thanh toán');

-- Insert data for Paper_Package table
INSERT INTO Paper_Package (name, quantity, price) VALUES
('Package A', 500, 20000),
('Package B', 1000, 35000),
('Package C', 1500, 50000);

-- Insert data for Order_Package table
INSERT INTO Order_Package (order_ID, pp_ID) VALUES
(1, 1),
(2, 2),
(3, 3);
