# SUPPLIERS AND PRODUCTS REST API

***

### DESCRIPTION

This is a simple REST service/API that returns a list of suppliers and their products, all products, add suppliers and products, delete products and suppliers and their products.

***

### TECH STACK

1. NodeJS
2. Express
3. MySQL

***

### RUN THE REST SERVICE

#### First Time

1. Install NodeJS [here](https://nodejs.org/en/)

1. Install Mysql or Xampp [here](https://www.apachefriends.org/index.html)

2. Check if NodeJS was installed successfully by running this command on CMD, Git Bash or Terminal: node -v

3. On  your CMD, Git Bash or Terminal:

* Install dependencies: npm install

* Run the REST Service: npm run start

Then the REST service is running, use [Postman](https://www.postman.com/) or other REST platform to send HTTP requests to get responses from the REST Service on PORT 1337.

#### Not First Time

...* Install dependencies: npm install

...* Run the REST Service: npm run start

Then the REST service is running, use [Postman](https://www.postman.com/) or other REST platform to send HTTP requests to get responses from the REST Service on PORT 1337.

***

### REST SERVICE ENDPOINTS

1. GET Suppliers and their products: http://localhost:1337/api/v1/suppliers

2. GET Supplier and his/her Products: http://localhost:1337/api/v1/suppliers/:SupplierID

3. POST ADD Supplier: http://localhost:1337/api/v1/suppliers

4. DELETE Delete Supplier and their Products: http://localhost:1337/api/v1/suppliers/:SupplierID

5. GET all Products: http://localhost:1337/api/v1/products

6. GET single Product: http://localhost:1337/api/v1/products/:ProductID

7. POST Add Product: http://localhost:1337/api/v1/products/

8. DELETE Delete Product: http://localhost:1337/api/v1/products//:ProductID





