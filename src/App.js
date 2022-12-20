/* eslint-disable no-unused-vars */
import './App.css';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from './Components/Pages/Signup'
import Login from './Components/Pages/Login';
import Home from './Components/Pages/Home';
import Navb from './Components/Pages/Navb';
import HomePage from './Components/Pages/HomePage'
import Web3Integration from './Components/web3/Web3Integration';
import FetchData from './Components/showJobs/FetchData';
import BidBlockchain from './Components/MyProjects/BidBlockchain';
// import MyProjects from './Components/MyProjects/MyProjects';
import Chat from './Components/chat/Chat';

function App() {

  // const [users, setUsers] = useState([]);
  // const serverUrl = "http://localhost:8080";
  // let url = serverUrl + "/api/signup/getall";

  // useEffect(()=> {
  //   axios.get(url)
  //   .then(res => setUsers(res.data))
  //   .catch(err => console.log(`Error while fetching Users!\n ${}`));
  // }, []);

  
  return (
    <div className="App">
      <Router>
        <Navb />
        <div className='routes'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path='/job-post' element={<Web3Integration />}/>
            <Route path='/show-jobs' element={<FetchData />}/>
            <Route path='/my-projects' element={<BidBlockchain />}/>
            <Route path='/chat' element={<Chat />}/>
            {/* MISSING PAGE 404 */}
            {/* <Route path='*' element={<PageNotFound />}/> */}

          </Routes>
        </div>

        
      </Router>
    </div>
  );
}

export default App;
