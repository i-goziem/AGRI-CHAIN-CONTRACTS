// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgriChain {
    struct Product {
        uint id;
        string name;
        address farmer;
        bool isPaid;
    }

    mapping(uint => Product) public products;
    uint public productCount = 0;

    function addProduct(string memory _name) public {
        productCount++;
        products[productCount] = Product(productCount, _name, msg.sender, false);
    }

    function makePayment(uint _id) public payable {
        require(_id > 0 && _id <= productCount, "Product not found.");
        Product storage product = products[_id];
        require(!product.isPaid, "Payment already made.");
        product.isPaid = true;
    }
}
