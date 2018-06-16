pragma solidity 0.4.23;


import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import './lib/oraclizeAPI.sol';


contract DonationRegistry is usingOraclize {

    struct OraclizeRequest {
        address from;
        address to;
        uint256 ethAmount;
    }

    address public owner_;
    address public dai_;
    mapping(bytes32 => OraclizeRequest) oraclizeRequests_;

    event NewDonation(address from, address to, uint256 amount);
    event NewOraclizeQuery(string description);

    /**
     * @dev set the address of the dai contract
     * @param _dai Address of the deployed dai token contract.
     */
    constructor(address _dai) public {
        owner_ = msg.sender;
        dai_ = _dai;
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
    }

    /**
     * @notice Donate eth to a specific id.
     * @dev Eth converted to dai and allocated to the given id. Ensure that the eth
     * sent accounts for the transaction cost INCLUDING Oraclize fees!
     * @param _to Recipent of the donation
     */
    function donateEth(address _to) external payable {
        require(msg.value > 0, "msg.value <= 0");
        require(_to != 0, "_to == 0.");

        // Get the dai / eth ratio via oraclize and then allocate that much dai to the given address
        getDAIETHPrice(_to);
    }

    /**
     * Query kraken web api to retrieve the current dai / eth pairing.
     */
    function getDAIETHPrice(address _to) public payable {
      /* if (oraclize.getPrice("URL") > address(this).balance) {
        emit NewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");

      } else {
        emit NewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
        bytes32 queryId = oraclize_query("URL", "json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0");
      } */

      // TODO define how this is computed
      bytes32 queryId = 1;

      oraclizeRequests_[queryId] = OraclizeRequest(msg.sender, _to, msg.value);

      // Mock for now
      __callback(1, "700", "abc");
    }

    /**
     * Oraclize callback.
     * @param _myid The query id.
     * @param _result The result of the query.
     * @param _proof Oraclie generated proof. Stored in ipfs in this case.
     * Therefore is the ipfs multihash.
     */
    function __callback(
      bytes32 _myid,
      string _result,
      bytes _proof
    ) public
    {
      /* require(msg.sender == oraclize_cbAddress()); */
      uint256 daiEthRatio = parseInt(_result);

      OraclizeRequest memory request = oraclizeRequests_[_myid];
      uint256 donationAmount = request.ethAmount * daiEthRatio / 1e18; // ratio is per eth

      // Moving dai, donor token, from the owner to the recipient
      StandardToken(dai_).transferFrom(owner_, request.to, donationAmount);

      emit NewDonation(request.from, request.to, donationAmount);
    }
}
