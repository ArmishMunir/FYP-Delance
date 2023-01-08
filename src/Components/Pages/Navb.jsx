import React, {useState, useEffect, useContext} from "react";
// import { Context } from "../../Context";
import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import "../../css/Navb.css";
import { UserContext } from "../../UserContext";

function Navb() {
  const { userState } = useContext(UserContext);
  console.log('from nav:',userState);
  const [login, setLogin] = useState(false);
  // setLogin(sessionStorage.getItem("login")); 

  useEffect(() => {
    setLogin(sessionStorage.getItem("login")); 
  }, [login]);



  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          {/* logo */}
          <Navbar.Brand href="/">
            <div className="logo">
              <img
                alt=""
                src="/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              <span>
                <h1 id="heading">Delance</h1>
              </span>
            </div>
          </Navbar.Brand>

          {/* remaining nav items! */}
          <div className="nav-content">
            {!login? 
            (
              <>
                <div className="login-link">
                  <Link to="/login" className="text-decoration-none">
                    Log in
                  </Link>
                </div>

                <div className="signup-link">
                  <Link to="/signup" className="text-decoration-none">
                    Sign up
                  </Link>
                </div>
              </>
            ) 
            
            : (
              <>
                <div className="jobpost-link">
                  <Link to="/job-post" className="text-decoration-none">
                    Add Job
                  </Link>
                </div>

                <div className="showjobs-link">
                  <Link to="/show-jobs" className="text-decoration-none">
                    Browse Jobs
                  </Link>
                </div>

                <div className="showjobs-link">
                  <Link to="/my-projects" className="text-decoration-none">
                    My Projects
                  </Link>
                </div>

                {/* <div className="showjobs-link" onClick={resetState}>
                  <Link to="/login" className="text-decoration-none">
                    <b>Log out</b>
                  </Link>
                </div> */}
              </>
            )}
            
            
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Navb;
