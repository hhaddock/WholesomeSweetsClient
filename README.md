# ** NOTE THIS IS ONLY THE CLIENT.  PLEASE REFER TO THE API REPO FOR ALL BACKEND CODE **

https://github.com/hhaddock/WholesomeSweetsAPI
---

# Group Members:
---
 - Hayden Haddock 
 - Michael Douglas
 - Devin Cargill (Not in CS3380) 
 - David Auger   (Not in CS3380)

# WholesomeSweetsClient Description
---
For our final project, we decided to build a web application for our hypothetical bakery, Wholesome Sweets and Tasty Treats! Our application is fully capable of account creation, confirming an authentic user log in, and handling multiple/diverse orders that are sent and recorded in our database.

By using the Ionic Mobile APP framework and our normalized Database structure we were able to create our application accessible on desktop/mobile browser, and IOS/Android devices. Our end result is a high functioning bakery order application with a sleek and incredibly user-friendly UI.

## Meeting CRUD Criteria:
The app-user account that connects to the Database only has CRUD permissions (Cannot delete tables etc.)
**Create:** Anytime an account is created or an order is placed the Create criteria is made
**Read:** When authenticating a log in, the Select statement is used to check against the saved username and password saved in the database, it’s also used to get the products to load on screen after a successful log in
**Update:** The Update statement gets called inside user.js for our logout function and authentication function.
**Delete:** 

## Video Demo:
https://www.youtube.com/watch?v=SwiwvMNRdCk&feature=youtu.be

## ERD:
https://drive.google.com/file/d/1dK75cLmzy51K2m_s_t8B46oTtnXErWW5/view?usp=sharing

## Table Definitions:
User: 
```
CREATE TABLE user (
  email VARCHAR(128) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (email)
);
```
User Alias:
```
CREATE TABLE user_alias(
  fk_email VARCHAR(128) NOT NULL,
  alias VARCHAR(128),
  FOREIGN KEY (fk_email) REFERENCES  user (email)
  ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (fk_email)
);
```
Product:
```
CREATE TABLE product(
  product VARCHAR(128) NOT NULL,
  description TEXT NOT NULL,
  PRIMARY KEY (product)
);
```
Product Price:
```
CREATE TABLE product_price(
  fk_product VARCHAR(128) NOT NULL,
  price DECIMAL(11, 2),
  FOREIGN KEY(fk_product) REFERENCES product (product)
  ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY(fk_product)
);
```
Product Picture:
```
CREATE TABLE product_picture(
  fk_product VARCHAR(128) NOT NULL,
  path_to_picture VARCHAR(128),
  FOREIGN KEY(fk_product) REFERENCES product(product)
  ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY(fk_product)
);
```
Product Stock:
```
CREATE TABLE product_stock(
  fk_product VARCHAR(128) NOT NULL,
  stock INT(11),
  FOREIGN KEY(fk_product) REFERENCES product (product)
  ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY(fk_product)
);
```
Order:
```
CREATE TABLE `order`(
  order_num INT(11) NOT NULL AUTO_INCREMENT,
  fk_product VARCHAR(128) NOT NULL,
  fk_email VARCHAR(128) NOT NULL,
  quantity INT(11),
  FOREIGN KEY (fk_product) REFERENCES product (product),
  FOREIGN KEY (fk_email) REFERENCES user (email),
  PRIMARY KEY (order_num)
);
```
Order Complete:
```
CREATE TABLE order_complete(
  fk_order_num INT(11) NOT NULL,
  status VARCHAR(128) NOT NULL,
  FOREIGN KEY(fk_order_num) REFERENCES `order` (order_num)
  ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (fk_order_num)
);
```
Order Group:
```
DROP TABLE IF EXISTS order_group;      
CREATE TABLE `order_group` (
  `fk_order_num` int(11) NOT NULL,
  `order_group` varchar(128) NOT NULL,
  PRIMARY KEY (`fk_order_num`),
  KEY `fk_order_num` (`fk_order_num`),
  CONSTRAINT `order_group_ibfk_1` FOREIGN KEY (`fk_order_num`) REFERENCES `order` (`order_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
