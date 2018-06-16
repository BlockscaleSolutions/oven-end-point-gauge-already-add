pragma solidity 0.4.23;


import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';


contract MiniDonationRegistry {
    using SafeMath for uint256;

    address public owner_;
    address public reserveToken_;  // token used to allocate donation value

    uint256 public lockedReserve_; // Amount allocated to recipient
    // How much of the registries balance is still available
    uint256 public availableReserve_;

    // Split the reserve held by the donation registry into the donors and recipients
    mapping (address => uint256) public donationBalances_;

    event NewDonation(address to, uint256 amount);
    event DonationClaimed(address from, uint256 amount);

    /**
     * @notice create a new registry with a specific donation token.
     * @param _token the token to use as reserve and to allocate value of dontaions
     */
    constructor(address _token) public {
        owner_ = msg.sender;
        reserveToken_ = _token;
    }

    /**
     * @notice Recipient may claim value donated to them.
     * @dev Claim(transfer) a given token, transfer back to this contract.
     * @param _from Recipent claiming the donation
     * @param _amount Quantity of tokens.
     */
    function claimDonation(
        address _from,
        uint256 _amount
    )   external
    {
        require(_amount > 0, "_amount <= 0");
        require(msg.sender == owner_, "msg.sender != owner");
        require(balanceOf(_from) >= _amount, 'Balance insufficient');

        // Allocate the amount out of the reserve to the recipient and reduce avalable reserve
        donationBalances_[_from] = donationBalances_[_from].sub(_amount);
        availableReserve_ = availableReserve_.add(_amount);
        lockedReserve_ = lockedReserve_.sub(_amount);

        // All txs made from this contract for now
        emit DonationClaimed(_from, _amount);
    }

    /**
     * @notice Donate a specific token to an address.
     * @dev Donate(transfer) a given token.
     * @param _to Recipent of the donation
     * @param _amount Quantity of tokens.
     */
    function makeDonation(
        address _to,
        uint256 _amount
    )   external
    {
        require(_to != 0, "_to == 0.");
        require(_amount > 0, "_amount <= 0");
        require(msg.sender == owner_, "msg.sender != owner");

        // Ensure this contract has a sufficient reserve balance
        require(availableReserve_ >= _amount, 'Insufficient registry token reserve balance');

        // Allocate the amount out of the reserve to the recipient and reduce avalable reserve
        donationBalances_[_to] = donationBalances_[_to].add(_amount);
        availableReserve_ = availableReserve_.sub(_amount);
        lockedReserve_ = lockedReserve_.add(_amount);

        emit NewDonation(_to, _amount);
    }

    /**
     * @dev update the amount of registries balance that may allocated.
     */
    function setAvailableReserve() external {
        availableReserve_ = StandardToken(reserveToken_).balanceOf(this).sub(lockedReserve_);
    }

    // CONSTANTS

    /**
     * @notice Get donationRegistry balance.
     * @param _donationHolder address to check balance of
     * @return balance
     */
    function balanceOf(
        address _donationHolder
    )   view
        public
        returns(uint256)
    {
        return donationBalances_[_donationHolder];
    }
}
