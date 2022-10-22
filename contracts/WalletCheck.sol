// contracts/Issue.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract WalletCheck is ChainlinkClient{
    using Chainlink for Chainlink.Request;

    address private immutable oracle;
    bytes32 private immutable jobId;
    uint256 private immutable fee;

    bytes32 public data;

    /**
     * @notice Executes once when a contract is created to initialize state variables
     *
     * @param _oracle - address of the specific Chainlink node that a contract makes an API call from
     * @param _jobId - specific job for :_oracle: to run; each job is unique and returns different types of data
     * @param _fee - node operator price per API call / data request
     * @param _link - LINK token address on the corresponding network
     *
     * Network: Goerli
     * Oracle: 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7
     * Job ID: ca98366cc7314957b8c012c72f05aeeb
     * Fee: 0.1 LINK
     */
    constructor(
        address _oracle,
        bytes32 _jobId,
        uint256 _fee,
        address _link
    ) {
        if (_link == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_link);
        }
        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;
    }

    function requestWalletAddress(string memory username) public returns (bytes32) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        request.add("get", string.concat("https://raw.githubusercontent.com/", username, "/public-eth-wallet/main/address.txt"));
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, bytes32 _data)
        public
        recordChainlinkFulfillment(_requestId)
    {
        data = _data;
    }

    function withdrawLink() external {}
}
