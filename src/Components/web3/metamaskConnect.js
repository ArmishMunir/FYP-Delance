import Web3 from 'web3'
import delance from '../../abis/Delance.json'
let selectedAccount;
  // const providerUrl = 'http://localhost:8545';
export const initConnection = async () => {
    let provider = window.ethereum;

    if(provider !== 'undefined') {
      provider.request({ method: "eth_requestAccounts" })
      .then(accounts => {
        selectedAccount = accounts[0];
        console.log(`Selected account is: ${selectedAccount}`);
      }).catch( err => {
        console.log(err);
      })

      window.ethereum.on('accountsChanged', function(accounts) {
        selectedAccount = accounts[0];
        console.log(`Account changed to: ${selectedAccount}`);
      });
    }

    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    console.log(`Network id is: ${networkId}`);
    // console.log(`Abi of contract: ${delance.abi}`);
    console.log(`Address of contract: ${delance.networks[5777].address}`);

   
    if(delance.networks[networkId]) {
      const delanceContract = new web3.eth.Contract(
        delance.abi, 
        delance.networks[networkId].address
      );
      console.log(delanceContract);
    } else {
      alert('Smart contract not deployed to the current detected network!');  
    }
    
}