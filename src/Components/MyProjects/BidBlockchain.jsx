import React, { Component } from "react";
import Web3 from "web3";
import "./myProjects.css";
import swal from "sweetalert";
import { DELANCE_CONTRACT_ADDRESS, DELANCE_ABI } from "../abi";
// import MyProjects from "./MyProjects";
import MyProjects from "./MyProjects";
// eslint-disable-next-line no-unused-vars
import { ethers } from "ethers";

class BidBlockchain extends Component {
  async componentWillMount() {
    await this.initConnection();
    await this.deployContract();
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      projectsCount: 0,
      projects: [],
      delanceSmContaract: "",
    };
    this.addJob = this.addJob.bind(this);
  }

  initConnection = () => {
    // connenting with metamask!
    var provider = window.ethereum;
    // console.log('eht: ', window.ethereum);

    let selectedAccount;
    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          selectedAccount = accounts[0];
          this.setState({ account: selectedAccount });
          // setting account in local storage.
          localStorage.setItem("ownerAddress", this.state.account);
          console.log(`Selected account is: ${selectedAccount}`);
        })
        .catch((err) => {
          console.log(err);
        });

      window.ethereum.on("accountsChanged", function(accounts) {
        localStorage.removeItem("ownerAddress");
        selectedAccount = accounts[0];
        // updating new account in local storage.
        localStorage.setItem("ownerAddress", this.state.account);
        this.setState({account: selectedAccount})
        console.log(`Account changed to: ${selectedAccount}`);
      });
    }
  };

  deployContract = async () => {
    var provider = window.ethereum;
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    // console.log(`Network id is: ${networkId}`);

    // actual fetching plus posting data on the blockchian!!!

    if (DELANCE_CONTRACT_ADDRESS) {
      const delanceContract = new web3.eth.Contract(
        DELANCE_ABI,
        DELANCE_CONTRACT_ADDRESS
      );

      // setContract(delanceContract);
      this.setState({ delanceSmContaract: delanceContract });
      const currentJobCount = await delanceContract.methods
        .productCount()
        .call();
      // console.log(`current job count: ${currentJobCount}`);

      const _projectsCount = await delanceContract.methods
        .productCount()
        .call();
      this.setState({ projectsCount: _projectsCount });

      for (var i = 1; i <= _projectsCount; i++) {
        let _project = await delanceContract.methods.products(i).call();
        _project = Object.values(_project);
        this.setState({
          projects: [...this.state.projects, _project],
        });
      }
      // console.log(this.state.projects);
    } else {
      swal({
        title: "Smart contract not deployed",
        text: `Smart contract not deployed to the current detected network: ${networkId}!`,
        icon: "fail",
      });
    }
  };

  addJob = (_projectTitle, _price) => {
    // console.log("Hello from addJob: ", this.state.account);

    this.state.delanceSmContaract.methods
      .createProduct(_projectTitle, _price)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        swal({
          title: "Congratulations!",
          text: `${_projectTitle} bid has been closed.`,
          icon: "success",
        });
      });
    // console.log(`sender account: ${this.state.account}.. JOB ADDED!`);

    // sweet alert!
  };

  completeJob = async (receiverAddr, senderAddr, _amount) => {
    // console.log('Hello from addJob: ', this.state.account);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const decimals = 18;
    const input = _amount;
    let amount;
    if(_amount >= 1) {
      amount = ethers.BigNumber.from(input).mul(
        ethers.BigNumber.from(10).pow(decimals)
      );
    } else {
      amount = ethers.utils.parseUnits(_amount.toString(), "ether");
    }
    

    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to: receiverAddr,
      value: amount,
    });

    // console.log("tx: ", tx);

    // { ----------------------------------------------------------} Attempt-2
    // let ethereum = window.ethereum;
    // Request account access if needed
    // await ethereum.enable();

    // let provider = new ethers.providers.Web3Provider(ethereum);
    // const amount = ethers.BigNumber.from(_amount).mul(
    //   ethers.BigNumber.from(10).pow(decimals)
    // );

    // // Acccounts now exposed
    // const params = [
    //   {
    //     from: senderAddr,
    //     to: receiverAddr,
    //     value: toString(_amount),
    //   },
    // ];

    // const signer = provider.getSigner();
    // const tx = signer.sendUncheckedTransaction(params);
    // console.log(tx);

    // const transactionHash = await provider.send('eth_sendTransaction', params)
    // console.log('transactionHash is ' + transactionHash);

    // console.log(`sender account: ${this.state.account}.. JOB ADDED!`);

    // sweet alert!
  };

  render() {
    return (
      <div>
        <MyProjects addJob={this.addJob} completeJob={this.completeJob} />
      </div>
    );
  }
}

export default BidBlockchain;
