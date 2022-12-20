/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import {InputGroup, FormControl} from 'react-bootstrap'
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import swal from 'sweetalert'

// import showJobs from '../showJobs/ShowJobs';
import './job.css'

function JobForm(props) {
  // console.log(props.addJob('alpha', 12));

  const [skills, setSkills] = useState([]);
  const [ job, setJob] = useState({
    jobTitle: "",
    jobDescription: "",
    hourlyRate: 0,
    timeDuration: 0
  });

  

  const addSkill = (e)=> {
    if(e.key === "Enter" && e.target.value !== '' && e.target.value !== " ") {
      setSkills([...skills, e.target.value]);
      e.target.value = '';
    }
  }

  const removeSkill = (_index) => {
    setSkills(skills.filter((_, index) => index !== _index));
  }

  // const [error, setError] = useState();
  const handleSubmit = (e) => {
    
    e.preventDefault();

    // props.addJob(job.jobTitle, job.hourlyRate);
    e.target.value = '';
  }

  // POST QUERY!

  const postData = async (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/projects/add', {
      projectTitle: job.jobTitle,
      projectDescription: job.jobDescription,
      timeLine: job.timeDuration,
      ownerAddress: props.ownerAddress,
      price: job.hourlyRate,
      technologies: skills
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
        <div className="form">
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
                
            
            {/* {error} */}
            <div className="md-3" id='btn-signin'>
              <button 
                type='submit'
                className="md-6  btn btn-success"
                onClick={postData}
                disabled={ 
                  !job.jobTitle || !job.jobDescription || !job.timeDuration || !job.hourlyRate || !skills
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