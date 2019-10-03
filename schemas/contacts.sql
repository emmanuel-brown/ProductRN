CREATE TABLE contacts (
	contact_ID INT Primary Key AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100),
    address_ID INT,
    phoneNumber VARCHAR(11) NOT NULL,
    emails VARCHAR(500) NOT NULL
);