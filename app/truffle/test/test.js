const Debt = artifacts.require('./Debt.sol');

let admin;
let owner;
let landRegistry;

contract('Debt', (accounts) => {
	before(async () => {
		[admin, owner, buyer, authority] = accounts;
	});

	beforeEach(async () => {
		debt = await Debt.new({ from: admin });
	});

	describe('', () => {
		it('should', async () => {
			const callRes = await debt.createLoanRequest.call(100, '0x1', '0x2', {from: owner});
			assert.equal(callRes, true, 'Call response incorrect');
		});

		it('should successfully call an error if sender is not an admin', async () => {
			const res = await debt.createLoanRequest(100, '0x1', '0x2', {from: owner});
      console.log(res);
      console.log(res);
    	assert.equal(res.logs[0].event, 'LoanCreated', 'Incorrect event');
		});
	});
});
