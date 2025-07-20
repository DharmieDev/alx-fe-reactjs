
import React from 'react'

const About = () => {
  return (
    <div>
      <h1 style={{
        fontFamily: "Michroma",
        fontSize: "40px",
      }}>About Us</h1>
      <img src="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="coding image" style={{
        width: "250px",
        height: "250px",
        borderRadius: "20%",
      }}/>
      <p style={{
        fontFamily: "Inter",
        fontSize: "20px",
        fontWeight: "500",
        width: "30%",
        margin: "20px auto",
      }}>
        Our company has been providing top-notch services since 1990. We specialize in various fields including technology, marketing, and consultancy.
        </p>
    </div>
  )
}

export default About
