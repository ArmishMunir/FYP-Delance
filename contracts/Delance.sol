// SPDX-Lisence-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Delance {
    string public projectTitle;
    uint public productCount = 0;
    // mapping over all jobs
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string projectTitle;
        uint price;
        address owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string projectTitle,
        uint price,
        address owner,
        bool purchased
    );

    event ProjectComplete(
        uint id,
        string projectTitle,
        uint price,
        address owner,
        bool purchased
    );

    constructor() public{
        projectTitle = "Decentralized Freelance Platform";
    }

    function createProduct(string memory _projectTitle, uint _price) public {
        // Require a valid projectTitle
        // require(bytes(_projectTitle).length > 0);           
        // require(_price > 0);    // Require a valid price
        
        _price = _price * 10**18;
        // Create the product
        products[productCount] = 
            Product(productCount ,_projectTitle ,_price, msg.sender, false);
            
        productCount++;            // Increment product count
        // Trigger an event
        emit ProductCreated(productCount, _projectTitle,_price, msg.sender, false);
    }

    function completeJob(uint _id) public payable {
        Product memory _product = products[_id];
        address _seller = _product.owner;

        require(_product.id > 0 && _product.id <= productCount);
        // require(msg.value >= _product.price);           // Require that there is enough Ether in the transaction
        require(!_product.purchased);           // Require that the product has not been purchased already
        require(_seller != msg.sender);         // Require that the buyer is not the seller

        _product.owner = msg.sender;            // Transfer ownership to the buyer
        _product.purchased = true;
        products[_id] = _product;           // Update the product

        payable(_seller).transfer(msg.value);           // Pay the seller by sending them Ether
        emit ProjectComplete(productCount, _product.projectTitle, _product.price, msg.sender, true);
    }
}
