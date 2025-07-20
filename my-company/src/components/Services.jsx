
import React from 'react'

const Services = () => {
  return (
    <div>
      <h1 style={{
        fontFamily: "Michroma",
        fontSize: "40px",
        marginBottom: "50px",
      }}>Our Services</h1>
      <ul style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "220px",
      }}>
           <li style={{
            listStyle: "none",
            fontFamily: "Inter",
            fontSize: "18px",
            fontWeight: "500",
           }}>
               Technology Consulting
            </li>
           <li style={{
            listStyle: "none",
            fontFamily: "Inter",
            fontSize: "18px",
            fontWeight: "500",
            }}>
            Market Analysis
            </li>
           <li style={{
            listStyle: "none",
            fontFamily: "Inter",
            fontSize: "18px",
            fontWeight: "500",
            }}>
            Product Development
            </li>
         </ul>
         <div style={{
            display: "flex",
            gap: "80px",
            alignContent: "center",
            justifyContent: "center"
         }}>
             <img src="https://images.unsplash.com/photo-1536158614364-49b81421db1b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" style={{
                width: "300px",
                height: "300px",
                borderRadius: "20%",
            }}/>
             <img src="https://images.unsplash.com/photo-1536158614364-49b81421db1b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" style={{
                width: "300px",
                height: "300px",
                borderRadius: "20%",
            }}/>
             <img src="https://images.unsplash.com/photo-1536158614364-49b81421db1b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" style={{
                width: "300px",
                height: "300px",
                borderRadius: "20%",
            }}/>
         </div>
    </div>
  )
}

export default Services
