import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import logo from "./logo.png";

// Function to get the token from localStorage (or wherever you store it)
const getToken = () => {
  return localStorage.getItem("token");
};

const PrivateRoute = () => {
  const [verifiedToken, setVerifiedToken] = useState(null);
  const token = getToken();

  useEffect(() => {
    const authenticateSession = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/authenticatesession`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.validated === 1) {
          setVerifiedToken(true);
        } else {
          setVerifiedToken(false);
        }
      } catch (error) {
        console.error("Error fetching session authentication:", error);
        setVerifiedToken(false);
      }
    };

    authenticateSession();
  }, [token]);

  // Show a loading state while the authentication check is in progress
  if (verifiedToken === null) {
    return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
          <img
            alt=""
            src={logo}
            className="loading-indicator"
          />
      </div>
    );
  }

  return verifiedToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
