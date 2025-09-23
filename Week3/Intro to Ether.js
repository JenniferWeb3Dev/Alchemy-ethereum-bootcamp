 Complete the function donate
The function donate will take a private key and an array of charity addresses as it's two arguments.

The private key corresponds to an address pre-loaded with 10 ETH. 

You will need to donate at least one ether to each of the charities in the array.

  ```javascript
const { utils, providers, Wallet } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Donate at least 1 ether from the wallet to each charity
 * @param   {string} privateKey - a hex string private key for a wallet with 10 ETH
 * @param   {array} charities - an array of ethereum charity addresses 
 *
 * @returns {Promise} a promise that resolves after all donations have been sent
 */
async function donate(privateKey, charities) {
    const wallet = new Wallet(privateKey, provider);

    let nonce = await provider.getTransactionCount(wallet.address);
    const gasPrice = await provider.getGasPrice();

    const donationAmount = utils.parseEther('1.0'); // 1 ETH

    const txPromises = charities.map(async (charity) => {
        const tx = {
            to: charity,
            value: donationAmount,
            gasLimit: 21000,
            gasPrice,
            nonce: nonce++
        };

        const signedTx = await wallet.signTransaction(tx);
        return provider.sendTransaction(signedTx); // Returns a Promise
    });

    return Promise.all(txPromises);
}

module.exports = donate;
```
