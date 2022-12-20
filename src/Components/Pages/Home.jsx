import React from 'react'
import '../../css/Home.css'
// import Navb from './Navb';
function Home() {
  return (
    <div className='main'>
        <div className="content">
            <div className="about-app">
                <div className="image-container">
                    <img src="./home.png" alt="" />
                </div>
                <div className="text-container">
                    <h1>Delance</h1>

                    <p>Delance is a blockchain based <br/>
                        decentralized freelance platform that<br/>
                        will facilitate the freelancers and clients.<br/>
                        Our platform provides low fees, scalability,<br/>
                        transparancy, fair and automated despute settlement.<br/>   
                    </p>
                </div>
                
            </div>
        </div>

    </div>
  )
}

export default Home;