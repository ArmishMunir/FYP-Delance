import React from 'react'
import '../../css/styles.css'
import axios from 'axios';
import { useState } from 'react'
import {InputGroup, FormControl, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
// import { data } from 'autoprefixer';
import {useNavigate} from 'react-router-dom'

function Signup() {

  const navigate = useNavigate();
  const [ signupState, setSignupState] = useState({
    name: "",
    email: "",
    phoneNumber: 0,
    password: "",
    role: ""
  });

  const [error, setError] = useState();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/signup";
      const {signupState:res} = await axios.post(url, signupState);
      navigate("/login")
      console.log(res.message); 
    } catch(err) {
      if(err.response && err.response.status >= 400 && err.response.status <= 500) {
        setError(err.response.signupState.message);
      }
    }
  }

  return (
    <div className='main__div mb-6'>
      <div className='sign-image' >
        <img src="./signup.svg" alt="can't load!"  id='signup-img'/>
      </div>
      <div className='login-form'>
        <>
          <div className="heading">
              <img
                alt=""
                src="/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                <span>
                  <h1>Delance</h1>
                </span>
                
            </div>
          <form onSubmit={handleSubmit}>
            {/* {JSON.stringify(signupState)} */}
            <InputGroup className="mb-3" id='input'>
              <InputGroup.Text id="basic-addon1">User Name</InputGroup.Text>
              <FormControl
                aria-label="Username"
                aria-describedby="basic-addon1"
                type='name'
                onChange={(e)=> {
                  const value = e.target.value;
                  setSignupState({...signupState, name: value});
                }}
              />
            </InputGroup>

            <InputGroup className="mb-3" id='input'>
            <InputGroup.Text id="basic-addon2">@</InputGroup.Text>
              <FormControl
                placeholder="Email"
                aria-label="email"
                aria-describedby="basic-addon2"
                type='email'
                onChange={(e)=> {
                  const value = e.target.value;
                  setSignupState({...signupState, email: value});
                }}
              />
            </InputGroup>

            <InputGroup className="mb-3" id='input'>
            <InputGroup.Text id="basic-addon2">Ph#</InputGroup.Text>
              <FormControl
                placeholder="+92"
                aria-label="number"
                aria-describedby="basic-addon2"
                type='number'
                onChange={(e)=> {
                  const value = e.target.value;
                  setSignupState({...signupState, phoneNumber: value});
                }}
              />
            </InputGroup>

            <InputGroup className="mb-3" id='input'>
            <InputGroup.Text id="basic-addon2">Password</InputGroup.Text>
              <FormControl
                placeholder="****"
                aria-label="password"
                aria-describedby="basic-addon2"
                type='password'
                onChange={(e)=> {
                  const value = e.target.value;
                  setSignupState({...signupState, password: value});
                }}
              />
            </InputGroup>
              
            <div className="mb-3" id='radio-btn'>
              <h4>Sign up as:</h4>
              <Form.Check
                inline
                value="Employer"
                label="Employer"
                onChange={(e)=> {
                  const value = e.target.value;
                  setSignupState({...signupState, role: value});
                }}
              />
              <Form.Check
                inline
                label="Freelancer"
                value="Freelancer"
                onChange={(e)=> {
                  const value = e.target.value;
                  setSignupState({...signupState, role: value});
                }}
              />
            </div>

            {error}
            <div className="md-3" id='btn-signin'>
              <button type="submit"
                className="md-6  btn btn-success"
                disabled={
                  !signupState.name || !signupState.email || !signupState.password || !signupState.phoneNumber
                }
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="no-account">
            <p>
              Already have an account? 
              <Link to="/login" id='link'> Log in </Link>
            </p>
          </div>

        </>
      </div>
    </div>
  )
}

export default Signup;