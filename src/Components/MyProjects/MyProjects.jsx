/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ChatIcon from "@mui/icons-material/Chat";
import ShowBids from "./ShowBids";
import "./myProjects.css";
import axios from "axios";
import { DELANCE_CONTRACT_ADDRESS, freeLancerAddr } from "../abi";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import Store from "../chat/Store";


function MyProjects(props) {
  // Rendering projects.
  const [loading, setLoading] = useState(false);
  // console.log("userState: ", userState);

  const toChat = (title, ownerAddress) => {
    return (
      <>
        <Store />
        {(window.location = "/chat")}
      </>
    );
    // window.location = "/chat";
  };

  const resetLoader = () => {
    setLoading(true);
  };
  const serverUrl = "http://localhost:8080";

  const deleteProject = (id) => {
    console.log("del: ", id);
    let url = serverUrl + "/api/projects/delete/";

    console.log(url);
    axios
      .delete(url + id)
      .catch((err) => console.log(`Error while deleting projects! ${err}`));
  };

  setTimeout(() => {
    resetLoader();
  }, (Math.floor(Math.random() * 1) + 0.5) * 1000);

  function renderProjects(job) {
    // console.log('jobs: ',job);
    let currentAccount = localStorage.getItem("ownerAddress");
    currentAccount = "0x3629d41f93137044ec4aeb65b49fbe4319747bdf";
    
    return job.ownerAddress === currentAccount ? (
      <Row key={job._id}>
        <Col xs={6} md={4} lg={8} className="Card">
          <Card>
            <Card.Body id="project">
              <div className="upper-row">
                <Card.Title id="project-title">
                  {/* <FontAwesomeIcon icon={faThumbtack} /> */}
                  <b className="title"> {job.projectTitle}</b>
                </Card.Title>
                <div className="chatIcon">
                  <ChatIcon
                    onClick={() => {
                      console.log(job.title);
                      localStorage.setItem("title", job.title)
                      toChat(job.title, job.ownerAddress);
                    }}
                  />
                </div>
              </div>

              <div className="description">
                <Card.Text id="owner">
                  {"   "}
                  {job.projectDescription}
                </Card.Text>
              </div>

              <div className="price">
                <Card.Text id="price-card">
                  <p>Rate: </p>
                  <b id="digit">{job.price} eth</b>

                  {/* <FontAwesomeIcon icon={faEthereum} /> */}
                </Card.Text>

                <Button
                  className="btn"
                  onClick={(e) => {
                    props.completeJob(
                      freeLancerAddr,
                      DELANCE_CONTRACT_ADDRESS,
                      job.price
                    );
                    deleteProject(job._id);
                  }}
                >
                  Complete Project
                </Button>
              </div>

              {/* all bids (popup). */}
              <ShowBids
                projectId={job._id}
                projectTitle={job.projectTitle}
                addJob={props.addJob}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    ) : (
      <></>
    );
  }

  const toPostProject = () => {
    window.location = "/job-post";
  };

  // FETCHING DATA!

  const [projects, setProjects] = useState([]); // state for all projects!
  const fetchProjects = () => {
    let url = serverUrl + "/api/projects/getall";
    axios
      .get(url)
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(`Error while fetching projects!`));
  };

  useEffect(() => {
    fetchProjects();
    // fetchBids();
  }, []);

  return (
    <div className="main">
      {loading ? (
        <>
          <div className="my-projects">
            <div className="personal-info">
              <h3>MY PROJECTS</h3>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={toPostProject}
              >
                <FontAwesomeIcon icon={faPlus} /> New Project
              </button>
            </div>
            <div className="col-md-12" id="">
              {projects.map(renderProjects)}
            </div>
            {/* <BidBlockchain addProject={props.addJob}/> */}
          </div>
        </>
      ) : (
        <div className="loader">
          <HashLoader className="loader" color="#16a34a" size={100} />
        </div>
      )}
    </div>
  );
}

export default MyProjects;
