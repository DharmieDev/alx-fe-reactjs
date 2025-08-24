// src/components/formikForm.js
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// 1) Yup validation schema (what counts as "valid")
const RegistrationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required("Please enter a username."),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

export default function FormikForm() {
  // 2) Starting values for all fields
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // 3) What happens when the form is valid and submitted
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      // Simulate a request (remove setTimeout in real app)
      await new Promise((res) => setTimeout(res, 500));

      console.log("Submitted with Formik:", values);
      alert(`Registered ${values.username}!`);

      resetForm(); // clear the form afterwards
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
      validateOnMount // make isValid accurate on first render
    >
      {({ isSubmitting, isValid, dirty, errors, touched }) => {
        // Helpers for aria-invalid
        const usernameInvalid = !!(touched.username && errors.username);
        const emailInvalid = !!(touched.email && errors.email);
        const passwordInvalid = !!(touched.password && errors.password);

        return (
          // Formik's <Form> renders a real <form> and wires up submit for you
          <Form noValidate style={{ maxWidth: 420 }}>
            <h2>Create an account (Formik)</h2>

            {/* USERNAME */}
            <div style={{ marginBottom: 12 }}>
              <label htmlFor="username">Username</label>
              <br />
              {/* Field connects this input to Formik by "name" */}
              <Field
                id="username"
                name="username"
                type="text"
                placeholder="e.g. cool_dev_123"
                aria-invalid={usernameInvalid}
                aria-describedby={usernameInvalid ? "username-error" : undefined}
                style={{ width: "100%", padding: 8 }}
              />
              {/* ErrorMessage shows the first validation error for this field */}
              <ErrorMessage
                name="username"
                component="p"
                id="username-error"
                // className works because ErrorMessage passes props to the rendered component
                className="field-error"
              />
            </div>

            {/* EMAIL */}
            <div style={{ marginBottom: 12 }}>
              <label htmlFor="email">Email</label>
              <br />
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                aria-invalid={emailInvalid}
                aria-describedby={emailInvalid ? "email-error" : undefined}
                style={{ width: "100%", padding: 8 }}
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="p"
                id="email-error"
                className="field-error"
              />
            </div>

            {/* PASSWORD */}
            <div style={{ marginBottom: 12 }}>
              <label htmlFor="password">Password</label>
              <br />
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                aria-invalid={passwordInvalid}
                aria-describedby={passwordInvalid ? "password-error" : undefined}
                style={{ width: "100%", padding: 8 }}
                autoComplete="new-password"
              />
              <ErrorMessage
                name="password"
                component="p"
                id="password-error"
                className="field-error"
              />
            </div>

            {/* Button is disabled until the user has typed (dirty) and the form is valid */}
            <button
              type="submit"
              disabled={!dirty || !isValid || isSubmitting}
              style={{ padding: "10px 14px" }}
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>

            {/* Optional tiny helper text */}
            <p style={{ fontSize: 12, color: "#666", marginTop: 10 }}>
              All fields are required. Password must be at least 6 characters.
            </p>
          </Form>
        );
      }}
    </Formik>
  );
}

