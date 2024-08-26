import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline-success"
      className="justify-content-end invoice-modal-button"
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
