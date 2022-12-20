import React, { Component } from "react";
import Web3 from "web3";
import "./styles.css";
import swal from "sweetalert";
import { DELANCE_CONTRACT_ADDRESS, DELANCE_ABI } from "../abi";
import ShowJobs from "../showJobs/ShowJobs";

class FetchData extends Component {
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
  }

  initConnection = async () => {
    // connenting with metamask!
    var provider = window.ethereum;
    let selectedAccount;
    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          selectedAccount = accounts[0];
          this.setState({ account: selectedAccount });
          // console.log(`Selected account is: ${selectedAccount}`);
        })
        .catch((err) => {
          console.log(err);
        });

      window.ethereum.on("accountsChanged", function(accounts) {
        selectedAccount = accounts[0];
        this.setState({ account: selectedAccount });
        console.log(`Account changed to: ${selectedAccount}`);
      });
    } else {
      swal({
        title: "Provider Undefined!",
        icon: "fail",
      });
    }
  };

  deployContract = async () => {
    var provider = window.ethereum;
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();

    // actual fetching plus posting data on the blockchian!!!

    if (DELANCE_CONTRACT_ADDRESS) {
      const delanceContract = new web3.eth.Contract(
        DELANCE_ABI,
        DELANCE_CONTRACT_ADDRESS
      );

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
      console.log(this.state.projects);
    } else {
      swal({
        title: "Smart contract not deployed",
        text: `Smart contract not deployed to the current detected network: ${networkId}!`,
        icon: "fail",
      });
    }
  };

  render() {
    return (
      <div>
        <ShowJobs jobs={this.state.projects} />
      </div>
    );
  }
}

export default FetchData;
