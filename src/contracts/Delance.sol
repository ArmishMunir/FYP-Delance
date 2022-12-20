pragma solidity >= 0.5.0 <= 0.7.0;

contract Delance {
    string public projectTitle;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string projectTitle;
        uint price;
        address owner;
        // string productDescription;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string projectTitle,
        uint price,
        address owner,
        // string productDescription,
        bool purchased
    );

    constructor() public {
        projectTitle = "Decentralized Freelance Platform";
    }

    function createProduct(string memory _projectTitle, uint _price) public {
        // Require a valid projectTitle
        require(bytes(_projectTitle).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount ++;
        // Create the product
        products[productCount] = Product(productCount, _projectTitle, _price, msg.sender, false);
        // Trigger an event
        emit ProductCreated(productCount, _projectTitle, _price, msg.sender, false);
    }
}
