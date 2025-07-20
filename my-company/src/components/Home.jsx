const Home = () => {
  const divStyle = {
    width: "100%",
    height: "650px",
    margin: "0",
    padding: "0",
    backgroundImage:
      "radial-gradient(circle, transparent ,rgba(0, 0, 0, 0.6), #0a0a23) ,url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
  };

  return (
    <div className="HomeDiv" style={divStyle}>
      <div
        style={{
          margin: "0",
          padding: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "650px",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            color: "white",
            fontFamily: "Michroma",
            margin: "0",
          }}
        >
          Welcome to Our Company
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "white",
            fontFamily: "Inter",

            maxWidth: "600px",
          }}
        >
          We are dedicated to delivering excellence in all our services.
        </p>
        <button
          style={{
            border: "none",
            padding: "10px 20px",
            backgroundColor: "hsl(240, 100%, 30%)",
            color: "white",
            borderRadius: "10px",
          }}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default Home;