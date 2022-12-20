/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import "./styles.css";
import swal from "sweetalert";

function BidPopUp(props) {
  // bid form states.
  const [bid, setBid] = useState({
    bidSummart: "",
    price: 0,
    attatchments: [],
    timeDuration: 0,
    freeLancerAddress: "",
  });

  // model states.
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (_id) => {
    console.log();
    let ownerAddress = localStorage.getItem("ownerAddress");
    if (ownerAddress === props.job.ownerAddress) {
      alert("Sorry! You cannot bid on your own project!");
    } else setShow(true);
  };
  const handleSubmit = (e) => {
    console.log(bid);
    axios
      .post("http://localhost:8080/api/bid/add", {
        summary: bid.summary,
        timeLine: bid.timeDuration,
        ownerAddress: props.ownerAddress,
        price: bid.price,
        ownerId: props.job.ownerAddress,
        projectId: props.job._id,
        freeLancerAddress: window.ethereum.selectedAddress,
      })
      .then((res) => {
        console.log("form submitted: \t", res);
        swal({
          title: "Bid Added!",
          text: `Bid for ${props.job.projectTitle} has been added.`,
          icon: "success",
        });

        // window.location = '/my-projects';
      })
      .catch((err) => {
        console.log(`error in submitting form ${err}!`);
        swal({
          title: "Error in posting bid.",
          text: ``,
          icon: "fail",
        });
      });
    handleClose();
  };

  const fileSelectesHandler = (e) => {
    console.log(e);
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow} id="btn">
        Bid Now
        {/* {props.job.projectTitle} */}
      </Button>

      <Modal show={show} onHide={handleClose} id="model">
        <Modal.Header closeButton id="header">
          <Modal.Title>{props.job.projectTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body id="model">
          <form>
            <InputGroup className="mb-3" id="input">
              <InputGroup.Text id="basic-addon2">Summary</InputGroup.Text>
              <FormControl
                as="textarea"
                aria-describedby="basic-addon2"
                type="text"
                onChange={(e) => {
                  const value = e.target.value;
                  setBid({ ...bid, summary: value });
                }}
              />
            </InputGroup>

            <InputGroup className="mb-3" id="input">
              <InputGroup.Text id="basic-addon2">Price </InputGroup.Text>
              <FormControl
                aria-describedby="basic-addon2"
                type="string"
                onChange={(e) => {
                  const value = e.target.value;
                  setBid({ ...bid, price: value });
                }}
              />
            </InputGroup>

            <InputGroup className="mb-3" id="input">
              <InputGroup.Text id="basic-addon2">Time Required</InputGroup.Text>
              <FormControl
                aria-describedby="basic-addon2"
                type="number"
                onChange={(e) => {
                  const value = e.target.value;
                  setBid({ ...bid, timeDuration: value });
                }}
              />
            </InputGroup>

            <div className="upload">
              <input
                type="file"
                className="fileInput"
                onChange={() => {
                  fileSelectesHandler();
                }}
              />
            </div>

            {/* add attatchments. */}
          </form>
        </Modal.Body>

        <Modal.Footer id="model">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BidPopUp;
