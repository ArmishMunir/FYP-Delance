/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import "./styles.css";
import axios from "axios";
import TaskAltTwoToneIcon from "@mui/icons-material/TaskAltTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import BidPopUp from "./BidPopUp";
import HashLoader from "react-spinners/HashLoader";
import { Card, Row, Col } from "react-bootstrap";
import { UserContext} from "../../UserContext";


function ShowJobs() {
  const [loading, setLoading] = useState(false);

  const resetLoader = () => {
    setLoading(true);
  };

  setTimeout(() => {
    resetLoader();
  }, (Math.floor(Math.random() * 4) + 1) * 1000);

  function renderTasks(job) {
    return (
      <Row key={job._id}>
        <Col xs={6} md={4} lg={8} className="Card">
          <Card>
            <Card.Body id="project">
              <div className="upper-row">
                <Card.Title id="project-title">
                  <TaskAltTwoToneIcon />
                  <b> {job.projectTitle}</b>
                </Card.Title>

                <Card.Text id="price">
                  <b>{job.price} </b>
                  <FontAwesomeIcon icon={faEthereum} />
                </Card.Text>
              </div>

              <Card.Text id="ownerAddress">
                <AccountCircleTwoToneIcon /> {job.ownerAddress}
              </Card.Text>
              <Card.Text id="">{job.projectDescription}</Card.Text>
              <div className="technologies">
                {/* skills:  */}
                {/* <p>{job.technologies}</p> */}
                <div className="tech">
                  <b>Technologies:</b>{" "}
                  {job.technologies.map((i) => {
                    return "●" + i + "\t";
                  })}
                </div>
                <div className="timeDuration">
                  <b>Time Duration:</b>
                  {"\t"} {job.timeLine}
                  <p>{"  months"}</p>
                </div>
              </div>

              <BidPopUp job={job} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  // FETCHING DATA!

  const serverUrl = "http://localhost:8080";
  const [projects, setProjects] = useState([]);
  let url = serverUrl + "/api/projects/getall";

  
  useEffect(() => {
    axios
      .get(url)
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(`Error while fetching projects! ${err}`));
  }, []);

  const { userState } = useContext(UserContext);
  console.log("from showjobs: ", userState);

  return (
    <div className="jobs">
      {loading ? (
        <div className="Tasks">
          <div className="col-md-12" id="">
            {projects.map(renderTasks)}
          </div>
        </div>
      ) : (
        <>
          <HashLoader
            className="loader"
            color="#16a34a"
            size={100}
          />
        </>
      )}
    </div>
  );
}

export default ShowJobs;
