import { useState } from "react";

export default function RegistrationForm() {
  // 1) One state object for all fields
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 2) Hold simple error messages per field
  const [problems, setProblems] = useState({});

  // 3) One onChange for all inputs (uses the input's `name`)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // keep the rest of the form, update just the one field
    setForm((prev) => ({ ...prev, [name]: value }));

    // clear the error for this field as the user fixes it
    if (problems[name]) {
      setProblems((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // 4) Basic "not empty" check on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const nextProblems = {};
    if (!form.username.trim()) nextProblems.username = "Please enter a username.";
    if (!form.email.trim()) nextProblems.email = "Please enter an email address.";
    if (!form.password.trim()) nextProblems.password = "Please enter a password.";

    // If any problems found, show them and stop
    if (Object.keys(nextProblems).length > 0) {
      setProblems(nextProblems);
      return;
    }

    // If we reach here, the form is filled in
    console.log("Submitted data:", form);
    alert(`Registered ${form.username}!`);

    // Optional: reset the form
    setForm({ username: "", email: "", password: "" });
    setProblems({});
  };

  // 5) Small UX touch: disable button until everything has text
  const isDisabled =
    !form.username.trim() || !form.email.trim() || !form.password.trim();

  return (
    // noValidate lets us show our own messages instead of the browser's default bubbles
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 420 }}>
      <h2>Create an account</h2>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="username">Username</label><br />
        <input
          id="username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          aria-invalid={!!problems.username}
          aria-describedby={problems.username ? "username-error" : undefined}
          placeholder="e.g. cool_dev_123"
          style={{ width: "100%", padding: 8 }}
        />
        {problems.username && (
          <p id="username-error" role="alert" style={{ color: "crimson", margin: "6px 0 0" }}>
            {problems.username}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="email">Email</label><br />
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          aria-invalid={!!problems.email}
          aria-describedby={problems.email ? "email-error" : undefined}
          placeholder="you@example.com"
          style={{ width: "100%", padding: 8 }}
        />
        {problems.email && (
          <p id="email-error" role="alert" style={{ color: "crimson", margin: "6px 0 0" }}>
            {problems.email}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="password">Password</label><br />
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          aria-invalid={!!problems.password}
          aria-describedby={problems.password ? "password-error" : undefined}
          placeholder="••••••••"
          style={{ width: "100%", padding: 8 }}
        />
        {problems.password && (
          <p id="password-error" role="alert" style={{ color: "crimson", margin: "6px 0 0" }}>
            {problems.password}
          </p>
        )}
      </div>

      <button type="submit" disabled={isDisabled} style={{ padding: "10px 14px" }}>
        Register
      </button>
    </form>
  );
}
