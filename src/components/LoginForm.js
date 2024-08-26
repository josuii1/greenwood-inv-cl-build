import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

// Inside your component

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function loginUser(username, password) {
    try {
      const response = await axios.post("https://greenwoodlm-inv-server-nrdel.ondigitalocean.app/login", { username, password });

      // Assuming the server returns a token on successful login
      const { token } = response.data;

      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem("token", token);

      return { success: true, token };
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error(
        "Login failed:",
        error.response?.data?.msg || error.message
      );

      // Return failure indicator with the error message
      return {
        success: false,
        message: error.response?.data?.msg || "Login failed",
      };
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await loginUser(username, password);

    if (result.success) {
      console.log("Login successful, token:", result.token);
      navigate("/"); // Programmatically navigate to the invoices page
    } else {
      setError(result.message);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">
            Contact Josue to Reset password
          </Form.Text>
        </Form.Group>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
