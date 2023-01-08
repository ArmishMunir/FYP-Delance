/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useRef } from 'react'
import './job_form.css';
import {InputGroup, FormControl} from 'react-bootstrap'
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import swal from 'sweetalert';
import Dropzone from 'react-dropzone';

// import showJobs from '../showJobs/ShowJobs';


function JobForm(props) {
  // console.log(props.addJob('alpha', 12));
  
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [skills, setSkills] = useState([]);
  const [ job, setJob] = useState({
    jobTitle: "",
    jobDescription: "",
    hourlyRate: 0,
    timeDuration: 0
  });

  
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  
  

  const addSkill = (e)=> {
    if(e.key === "Enter" && e.target.value !== '' && e.target.value !== " ") {
      setSkills([...skills, e.target.value]);
      e.target.value = '';
    }
  }

  const removeSkill = (_index) => {
    setSkills(skills.filter((_, index) => index !== _index));
  }
  
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

  // const handleFile = async (event) => {
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     setErrorMsg('');
  //     await axios.post(`http://localhost:8080/upload`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     props.history.push('/list'); // add this line
  //   }
  // }


  // const [error, setError] = useState();
  const handleSubmit = (e) => {
    
    e.preventDefault();

    // props.addJob(job.jobTitle, job.hourlyRate);
    e.target.value = '';
  }

  // POST QUERY!

  const postData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectTitle', job.jobTitle);
    formData.append('projectDescription', job.jobDescription);
    formData.append('timeLine', job.timeDuration);
    formData.append('ownerAddress', props.ownerAddress);
    formData.append('price', job.hourlyRate);
    formData.append('technologies', skills);

    setErrorMsg('');

    axios.post('http://localhost:8080/api/projects/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      console.log('form submitted: \t', res)
      swal({
        title: "Project Added!",
        text: `${job.jobTitle} has been added.`,
        icon: "success"
      });
      
      window.location = '/my-projects';
      
    })
    .catch(err => {
      console.log(`error in submitting form ${err}!`)
      swal({
        title: "Error in posting project.",
        text: ``,
        icon: "fail"
      });
    });

  }




  return (
    <div className='JobForm mb-6'>
        <div className="job__form">
        <>
          <div className="heading">
            <h1>Add a Project!</h1>
          </div>
          <form
            //  onSubmit={handleSubmit}
            method='POST'
           >
            {/* {JSON.stringify(signupState)} */}
            <InputGroup className="mb-3" id='input'>
              <InputGroup.Text id="basic-addon1">Project Title</InputGroup.Text>
              <FormControl
                aria-label="Job Title"
                aria-describedby="basic-addon1"
                type='text'
                onChange={(e)=> {
                  const value = e.target.value;
                  setJob({...job, jobTitle: value});
                }}
              />
            </InputGroup>

            <InputGroup className="mb-3" id='input'>
            <InputGroup.Text id="basic-addon2">Time Duration</InputGroup.Text>
              <FormControl
                aria-label="Time Duration"
                aria-describedby="basic-addon2"
                placeholder='Months'
                type='number'
                onChange={(e)=> {
                  const value = e.target.value;
                  setJob({...job, timeDuration: value});
                }}
              />
            </InputGroup>

            <InputGroup className="mb-3" id='input'>
            <InputGroup.Text id="basic-addon2">Price</InputGroup.Text>
              <FormControl
                placeholder="0.0"
                aria-label="Rate"
                aria-describedby="basic-addon2"
                type='float'
                onChange={(e)=> {
                  const value = e.target.value;
                  setJob({...job, hourlyRate: value});
                }}
              />
            <InputGroup.Text id="basic-addon2">eth</InputGroup.Text>
            </InputGroup>


            {/* TECHNOLOGIES. */}
              
            <div className="tags col-md-12">
              <div className="tags-input">
                <InputGroup className="mb-3" >
                <InputGroup.Text id="basic-addon2">Technologies</InputGroup.Text>
                  <FormControl
                    placeholder="Enter to add.."
                    type='text'
                    onKeyDown={e => e.key === "Enter" ? addSkill(e) : null}
                  />
                </InputGroup>
              </div>
              
              <ul id='tags__list-items'> 
                {
                  skills.map((skill, index) => 
                    <li key={index} id='listItem'>
                      <span>{skill}</span>
                      <CancelIcon onClick={() => removeSkill(index)} id='cancel'/>
                    </li>
                  )
                }
              </ul>
            </div>

            <InputGroup className="mb-3" >
            <InputGroup.Text id="basic-addon2">Description</InputGroup.Text>
              <FormControl as="textarea"
                id='text-area'
                placeholder="Job description..."
                aria-label="description"
                aria-describedby="basic-addon2"
                type='text'
                onChange={(e)=> {
                  const value = e.target.value;
                  setJob({...job, jobDescription: value});
                }}
              />
            </InputGroup>

            <div className="upload-section">
              <Dropzone 
                onDrop={onDrop}
                onDragEnter={() => updateBorder('over')}
                onDragLeave={() => updateBorder('leave')}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                    <input {...getInputProps()} />
                    <p>Drag and drop a file OR click here to select a file</p>
                    <ul className='jobform--notes'>Note:
                      <li>Maximum file size: 15 MB</li>
                      <li>In case of multiple files, zip them and upload</li>
                    </ul>
                    {file && (
                      <div>
                        <strong>Selected file:</strong> {file.name}
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
              {/* {previewSrc ? (
                isPreviewAvailable ? (
                  <div className="image-preview">
                    <img className="preview-image" src={previewSrc} alt="Preview" />
                  </div>
                ) : (
                  <div className="preview-message">
                    <p>No preview available for this file</p>
                  </div>
                )
              ) : (
                <div className="preview-message">
                  <p>Image preview will be shown here after selection</p>
                </div>
              )} */}
            </div>

            
            {/* {error} */}
            <div className="md-3" id='btn-signin'>
              <button 
                type='submit'
                className="md-6  btn btn-success"
                onClick={postData}
                disabled={ 
                  !job.jobTitle || !job.jobDescription || !job.timeDuration || !job.hourlyRate || !skills || !file
                }
              >
                Post 
              </button>
            </div>
          </form>


        </>
        </div>
        <div className="form-img">
          <img src="./jobPost.png" alt="can't load!"  id='form-img'/>
        </div>
    </div>
  )
}

export default JobForm;
