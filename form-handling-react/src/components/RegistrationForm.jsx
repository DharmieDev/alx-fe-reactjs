import { useState } from "react";

export default function RegistrationForm() {
  // Each field has its own state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!username.trim()) newErrors.username = "Please enter a username.";
    if (!email.trim()) newErrors.email = "Please enter an email address.";
    if (!password.trim()) newErrors.password = "Please enter a password.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Submitted data:", { username, email, password });
    alert(`Registered ${username}!`);

    // Reset fields
    setUsername("");
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const isDisabled = !username.trim() || !email.trim() || !password.trim();

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Create an account</h2>

      {/* Username */}
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}           
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}               
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}            
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <button type="submit" disabled={isDisabled}>
        Register
      </button>
    </form>
  );
}
