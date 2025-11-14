import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => {
  
  return (
    <div  style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(178deg, rgba(255, 250, 205, 1) 0%, rgba(230, 230, 250, 1) 50%, rgba(230, 230, 250, 1) 100%)',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <Navbar/>
      <Header/>
    </div>
  )
}

export default Home
