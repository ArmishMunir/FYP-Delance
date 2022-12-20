/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { ethers } from "ethers";

function ShowBids(props) {
  const [show, setShow] = useState(false);
  const [bids, setBids] = useState([]); // state for all projects!

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };
  const serverUrl = "http://localhost:8080";
  const getBids = () => {
    
    let url = serverUrl + "/api/bid/getByProjectId/";
    axios
      .get(url + props.projectId)
      .then((res) => {
        setBids(res.data);
      })
      .catch((err) => console.log(`Error while fetching projects ${err}!`));
  };
  // fetching bids.
  const updatePrice = (_p) => {
    let url = serverUrl + "/api/projects/update/";
    axios
      .put(url + props.projectId, { price: _p })
      .catch((err) => console.log(`Error while updating projects ${err}!`));
  };

  useEffect(() => {
    // console.log("projectId: ", props.projectId);
    getBids();
  }, []);

  const postOnBlockchain = (_p) => {
    // alert('Are you sure?')
    let amount = ethers.utils.parseUnits(_p, "ether");
    console.log("amount post; ", amount);
    console.log("amount: ", _p);
    props.addJob(props.projectTitle, _p);
    updatePrice(_p);
    handleClose();
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow} id="btn">
        View Bids
      </Button>

      {/* <Button variant="secondary" onClick={completeProject} id="btn-2">
        Complete Project
      </Button> */}

      <Modal size="lg" show={show} onHide={handleClose} id="model">
        <Modal.Header closeButton id="header">
          <Modal.Title>Registered Bids</Modal.Title>
        </Modal.Header>

        <Modal.Body id="model">
          {/* {console.log(typeof bids.projectId, typeof props.projects.id)} */}
          {bids.map((bid, index) => {
            return (
              <div className="bid" key={bid._id}>
                <p>
                  <b id="head">Summary: </b>
                  {bid.summary}
                </p>
                <p>
                  <b id="head">Price: </b>
                  {bid.price + " eth"}
                </p>
                <Button
                  variant="success"
                  size="sm"
                  id="btn"
                  onClick={(e) => {
                    postOnBlockchain(bid.price);
                    window.location.reload();
                  }}
                >
                  Close Bid
                </Button>
              </div>
            );
          })}
        </Modal.Body>
        {/* <h1>Hello there!</h1> */}

        <Modal.Footer id="model">
          <Button variant="primary" onClick={handleClose} id="btn">
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShowBids;
