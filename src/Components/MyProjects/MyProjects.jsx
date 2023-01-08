/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useRef } from "react";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ChatIcon from "@mui/icons-material/Chat";
import ShowBids from "./ShowBids";
import "./myProjects.css";
import axios from "axios";
import { DELANCE_CONTRACT_ADDRESS, freeLancerAddr } from "../abi";
import HashLoader from "react-spinners/HashLoader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import swal from 'sweetalert';
import Dropzone from "react-dropzone";
import download from 'downloadjs';

function MyProjects(props) {
  // Rendering projects.
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage

  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area


  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));

    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #ffffff';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  const resetLoader = () => {
    setLoading(true);
  };
  const serverUrl = "http://localhost:8080";

  const deleteProject = (id) => {
    let url = serverUrl + "/api/projects/delete/";
    axios
      .delete(url + id)
      .catch((err) => console.log(`Error while deleting projects! ${err}`));
  };


  setTimeout(() => {
    resetLoader();
  }, (Math.floor(Math.random() * 1) + 0.5) * 1000);

  function submitDeliveryFile() {
    console.log(file);

    const formData = new FormData();
    formData.append('file', file);

    setErrorMsg('');

    axios.post('http://localhost:8080/api/projects/submitDeliveryFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      console.log('file submitted: \t', res)
      swal({
        title: "File Submitted!",
        text: `${file.name} has been submitted.`,
        icon: "success"
      });
      
    })
    .catch(err => {
      console.log(`error in submitting file ${err}!`)
      swal({
        title: "Error in submitting file.",
        text: ``,
        icon: "fail"
      });
    });
  }

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:8080/api/projects/downloadDeliveryFile/${id}`, {
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

  function renderProjects(job) {
    // console.log('jobs: ',job);
    let currentAccount = localStorage.getItem("ownerAddress");
    // currentAccount = "0x3629d41f93137044ec4aeb65b49fbe4319747bdf";

    return job.ownerAddress === currentAccount ||
      job.freelancerAddress === currentAccount ? (
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
                      // console.log(job.title);
                      localStorage.setItem("title", job.title);
                      window.location = `/chatroom?title=${job.projectTitle}`;
                      // toChat(job.title, job.ownerAddress);
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
                  <p>Bidget: </p>
                  <b id="digit">{job.price} eth</b>

                  {/* <FontAwesomeIcon icon={faEthereum} /> */}
                </Card.Text>
                {job.ownerAddress === currentAccount ? (
                  <div className="btns">
                    <Button
                      className="btn btn-success btns__icon"
                      onClick={(e) => {
                        props.completeJob(
                          freeLancerAddr,
                          DELANCE_CONTRACT_ADDRESS,
                          job.price
                        );
                        deleteProject(job._id);
                      }}
                    >
                      <DoneAllIcon className="btn__icon"/>
                    </Button>
                      <Button className="btn btn-light"
                        onClick={() => {
                          downloadFile(job._id, job.file_path, job.file_mimetype)
                        }}
                        >
                        <FileDownloadIcon className="btn__icon btns__icon"/>
                      </Button>
                  </div>
                ) : (
                  <>                  
                  <div className="upload-section">
                    <Dropzone
                      onDrop={onDrop}
                      onDragEnter={() => updateBorder('over')}
                      onDragLeave={() => updateBorder('leave')}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                          <input {...getInputProps()} />
                          {/* <p>Drag and drop the delivery file OR click here to select a file</p> */}
                          <ul className='jobform--notes'> 
                            <Button className="btn btn-info btn-sm">
                              <CloudUploadIcon className='btn__icon'/>
                              Upload Files</Button>
                            {/* <li>Maximum file size: 15 MB</li> */}
                            {/* <li>In case of multiple files, zip them and upload</li> */}
                          </ul>
                          {file && (
                            <div>
                              <strong>Submitted file:</strong> {file.name}
                              {submitDeliveryFile()}
                            </div>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  </div>
                  </>
                )}
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
            <div className="col-md-10 all_projects" id="">
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
