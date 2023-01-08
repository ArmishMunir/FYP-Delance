/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import "./job-styles.css";
import axios from "axios";
import TaskAltTwoToneIcon from "@mui/icons-material/TaskAltTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import BidPopUp from "./BidPopUp";
import HashLoader from "react-spinners/HashLoader";
import { Card, Row, Col } from "react-bootstrap";
import download from 'downloadjs';
import { UserContext } from "../../UserContext";
import SearchIcon from "@mui/icons-material/Search";
import { joinSignature } from "ethers/lib/utils";

function ShowJobs() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const resetLoader = () => {
    setLoading(true);
  };

  setTimeout(() => {
    resetLoader();
  }, (Math.floor(Math.random() * 4) + 1) * 1000);
  
  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:8080/api/projects/download/${id}`, {
        responseType: 'blob'
      })
      .then(res => {
        console.log("File downloaded successfully!");
        const split = path.split('/');
        const filename = split[split.length - 1];
        setErrorMsg('');
        return download(res.data, filename, mimetype);
      })
      .catch((err) => console.log(`Error while downloading file ${err}!`));


    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  function renderTasks(job) {
    let ownerAddress = job.ownerAddress;
    // first 10 characters of ownerAddress
    let ownerAddressShort = ownerAddress.substring(0, 10);
    return (
      <Row key={job._id} className="Row">
        <Col xs={6} md={4} lg={8} className="Card">
          <Card>
            <Card.Body id="project">
              <div className="upper-row">
                <Card.Title id="project-title">
                  <TaskAltTwoToneIcon />
                  <b> {job.projectTitle}</b>
                  <p>{" - " + job.timeLine + " months"}</p>
                </Card.Title>

                <Card.Text id="ownerAddress">
                  <AccountCircleTwoToneIcon /> {job.ownerAddress}
                </Card.Text>
              </div>

              <Card.Text className="description">
                {job.projectDescription}
              </Card.Text>
              <div className="technologies">
                {/* skills:  */}
                {/* <p>{job.technologies}</p> */}
                <div className="tech">
                  {job.technologies.map((i) => {
                    return "●\t" + i + "\t";
                  })}
                </div>
              </div>

              <div className="price">
                <Card.Text id="price">
                  <b>{"Budget: " + job.price}</b>
                  <FontAwesomeIcon icon={faEthereum} />
                </Card.Text>
              </div>
              <div>
                <a
                  href="#/"
                  onClick={() => {
                    downloadFile(job._id, job.file_path, job.file_mimetype)
                  }}
                >Download Project Files</a>
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
  const [filteredProjects, setFilteredProjects] = useState([]);
  let url = serverUrl + "/api/projects/getall";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(`Error while fetching projects! ${err}`));
  });

  const { userState } = useContext(UserContext);
  // console.log("from showjobs: ", userState);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="jobs">
      {loading ? (
        <div className="Tasks">
          <div className="search">
            <input
              className="search__input"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearchInput(e.target.value);
                setFilteredProjects(projects.filter((job) => {
                  return job.technologies.find((tech) => {
                    return tech.toLowerCase().includes((searchInput.toLowerCase()));
                  })
                  // return job.technologies.toLowerCase().includes((searchInput.toLowerCase()));
                }));
              }}

            />
          </div>

          <div className="" id="">
            {searchInput === "" || searchInput === ' ' ? (
              <>
                {projects.map(renderTasks)}
              </>
            ) : (
                <>
                  {filteredProjects.map(renderTasks)}
                </>
              )
            }
            
          </div>
        </div>
      ) : (
        <>
          <HashLoader className="loader" color="#16a34a" size={100} />
        </>
      )}
    </div>
  );
}

export default ShowJobs;
