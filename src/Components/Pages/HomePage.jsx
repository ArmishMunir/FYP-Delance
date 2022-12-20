import React from 'react'

function HomePage() {
    const handleLogOut = () => {
        localStorage.removeItem("token");
        window.location = '/'
    }
  return (
    <div>
        <h1>Welcome Home</h1>
        {/* {console.log(localStorage.getItem())} */}
        <button type='submit' onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default HomePage;