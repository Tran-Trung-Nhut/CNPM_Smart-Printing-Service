-- Bảng User
CREATE TABLE User (
    user_ID INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role ENUM('student', 'spso') NOT NULL,
    pageBalance INT DEFAULT 0
);

-- Bảng FileType
CREATE TABLE FileType (
    type VARCHAR(50) PRIMARY KEY,
    spso_ID INT,
    FOREIGN KEY (spso_ID) REFERENCES User(user_ID) ON DELETE SET NULL
);

-- Bảng AutoPaper
CREATE TABLE AutoPaper (
    semester VARCHAR(50) PRIMARY KEY,
    number INT NOT NULL,
    scheduler DATETIME,
    spso_ID INT,
    FOREIGN KEY (spso_ID) REFERENCES User(user_ID) ON DELETE SET NULL
);

-- Bảng Location
CREATE TABLE Location (
    location_ID INT PRIMARY KEY AUTO_INCREMENT,
    campus VARCHAR(255),
    building VARCHAR(255),
    room VARCHAR(50)
);

-- Bảng Printer
CREATE TABLE Printer (
    Printer_ID INT PRIMARY KEY AUTO_INCREMENT,
    branchName VARCHAR(255),
    model VARCHAR(255),
    description TEXT,
    status ENUM('enable', 'disable') DEFAULT 'enable',
    loc_ID INT,
    FOREIGN KEY (loc_ID) REFERENCES Location(location_ID) ON DELETE SET NULL
);

-- Bảng PrintConfiguration
CREATE TABLE PrintConfiguration (
    config_ID INT PRIMARY KEY AUTO_INCREMENT,
    printStart DATETIME,
    printEnd DATETIME,
    student_ID INT,
    printer_ID INT,
    FOREIGN KEY (student_ID) REFERENCES User(user_ID) ON DELETE SET NULL,
    FOREIGN KEY (printer_ID) REFERENCES Printer(Printer_ID) ON DELETE SET NULL
);

-- Bảng Document
CREATE TABLE Document (
    config_ID INT,
    DName VARCHAR(255) NOT NULL,
    noPage INT,
    pageSize VARCHAR(50),
    PRIMARY KEY (config_ID, DName),
    FOREIGN KEY (config_ID) REFERENCES PrintConfiguration(config_ID) ON DELETE CASCADE
);