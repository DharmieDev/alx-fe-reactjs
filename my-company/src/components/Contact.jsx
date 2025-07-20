import { useState } from 'react'


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = (e) => {
       e.preventDefault();
       alert('Form submitted!');
     };

     const inputStyle = {
        width: "100px",
        height: "30px"
     }

  return (
    <div style={{}}>
      <h1 style={{
        fontFamily: "Michroma",
        fontSize: "40px",
        marginBottom: "50px",
      }}>Contact Us</h1>
      <form onSubmit={handleSubmit}>
           <input
             type="text"
             name="name"
             placeholder="Your Name"
             value={formData.name}
             onChange={handleChange}
             style={{ 
                display: 'block', 
                margin: '10px auto',
                width: "300px",
                height: "30px",
                borderRadius: "5px",
                border: "1px solid"
            }}
           />
           <input
             type="email"
             name="email"
             placeholder="Your Email"
             value={formData.email}
             onChange={handleChange}
             style={{ 
                display: 'block', 
                margin: '10px auto',
                width: "300px",
                height: "30px",
                borderRadius: "5px",
                border: "1px solid" 
            }}
           />
           <textarea
             name="message"
             placeholder="Your Message"
             value={formData.message}
             onChange={handleChange}
             style={{ 
                display: 'block', 
                margin: '10px auto',
                width: "300px",
                height: "30px",
                borderRadius: "5px",
                border: "1px solid" 
            }}
           />
           <button type="submit" style={{
            border: "none",
            padding: "10px 20px",
            backgroundColor: "hsl(240, 100%, 30%)",
            color: "white",
            borderRadius: "10px",
          }}>Send Message</button>
         </form>
    </div>
  )
}

export default Contact
