pragma solidity 0.4.23;


import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';


contract MiniDonationRegistry {

    address public owner_;

    event NewDonation(address token, address to, uint256 amount);
    event DonationClaimed(address token, address from, uint256 amount);

    constructor() public {
        owner_ = msg.sender;
    }

    /**
     * @notice Recipient may claim value donated to them.
     * @dev Claim(transfer) a given token, transfer back to this contract.
     * @param _from Recipent claiming the donation
     * @param _token Token being sent.
     * @param _amount Quantity of tokens.
     */
    function claimDonation(
        address _from,
        address _token,
        uint256 _amount
    )   external
    {
        require(_amount > 0, "_amount <= 0");
        require(msg.sender == owner_, "msg.sender != owner");
        require(StandardToken(_token).balanceOf(_from) >= _amount, 'Balance insufficient');

        // All transfers are sent from this contract for now
        require(StandardToken(_token).transferFrom(_from, this, _amount));

        // All txs made from this contract for now
        emit DonationClaimed(_token, _from, _amount);
    }

    /**
     * @notice Donate a specific token to an address.
     * @dev Donate(transfer) a given token.
     * @param _to Recipent of the donation
     * @param _token Token being sent.
     * @param _amount Quantity of tokens.
     */
    function makeDonation(
        address _to,
        address _token,
        uint256 _amount
    )   external
    {
        require(_to != 0, "_to == 0.");
        require(_amount > 0, "_amount <= 0");
        require(msg.sender == owner_, "msg.sender != owner");

        // All transfers are sent from this contract for now
        require(StandardToken(_token).transfer(_to, _amount));

        // All txs made from this contract for now
        emit NewDonation(_token, _to, _amount);
    }
}
