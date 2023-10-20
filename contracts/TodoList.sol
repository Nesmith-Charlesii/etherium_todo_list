pragma solidity ^0.5.0; 

contract TodoList {
    // Create a state variable to keep track of the number of tasks (these are written to the blockchain)
    // access keyword "public" allows us to read the value 'taskCount'
    // uint is an unsigned integer. It cannot be negative
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    // mapping takes a key/value pair. The uint is an id for the Task struct
    // public allows read access to items from mapping
    mapping (uint => Task) public tasks; 

    constructor() public {
        createTask("Check out dappuniversity.com");
    }

    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }

    

}