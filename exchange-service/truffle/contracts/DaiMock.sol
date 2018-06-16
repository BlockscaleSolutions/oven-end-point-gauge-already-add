pragma solidity 0.4.23;


import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';


contract DaiMock is StandardToken {
    constructor() public {
        // Large initial balance for testing
        balances[msg.sender] = 1e50;
    }

    /**
     * FIXME this is a hack to allow our accounts to fund themselves for testing purposes!
     */
    function mint(address _to, uint256 _amount) external {
        balances[_to] += _amount;
    }
}
