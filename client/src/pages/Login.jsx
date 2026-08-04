import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ecommerce-project-qvh0.onrender.com/login",
        { email, password }
      );

      // Store the JWT token — this is what proves the user is logged in.
      localStorage.setItem("token", response.data.token);

      // Store non-sensitive user info separately for display purposes (e.g. showing the username).
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login Successful");
      navigate("/home");
    } catch (error) {
      alert("Invalid Email Or Password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "350px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)"
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#222" }}>
          User Login
        </h1>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "15px"
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "15px"
            }}
          />

          <button
            type="submit"
            style={{
              padding: "14px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
          Don't have an account?
        </p>

        <div style={{ textAlign: "center" }}>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
          >
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
