CREATE DATABASE IF NOT EXISTS pahinungod;

USE pahinungod;

CREATE TABLE user (
    userid int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    is_admin boolean NOT NULL,
    PRIMARY KEY (userid)
);

INSERT INTO user(`username`, `password`, `first_name`, `last_name`, `is_admin`) VALUES('user','useruser', 'UserFirstName','UserLastName','0');

INSERT INTO user(`username`, `password`, `first_name`, `last_name`, `is_admin`) VALUES('admin','adminadmin', 'AdminFirstName','AdminLastName','1');

--SELECT * FROM user;

ALTER TABLE user
ADD email varchar(255);