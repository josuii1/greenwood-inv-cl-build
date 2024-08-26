import React, { useState } from "react";

function RegisterNewUser() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert invoiceNumber to an integer
      const dataToSend = {
        ...userData,
      };

      console.log("Sending data:", dataToSend); // Log the data being sent

      const response = await fetch("/register/newuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      console.log("Response:", response); // Log the response

      if (response.ok) {
        const result = await response.json();
        console.log("Success" + result);
        // Reset the form
        setUserData({
          username: "",
          password: "",
        });
      } else {
        const error = await response.json();
        console.log(`Error: ${error.message}`);
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Invoice</button>
      </form>
    </div>
  );
}

export default RegisterNewUser;
