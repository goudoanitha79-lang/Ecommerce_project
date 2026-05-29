import { useState } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "http://ecommerce-project-qvh0.onrender.com/register",

        {
          username,
          email,
          password
        }

      );

      alert(response.data);

      navigate("/login");

    } catch(error) {

      console.log(error);

      alert("Registration Failed");

    }

  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >

      <form
        onSubmit={handleRegister}
        style={{
          width: "320px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
        }}
      >

        <h2 style={{ textAlign: "center" }}>
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Register
        </button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Already have account?
          <Link to="/login"> Login</Link>
        </p>

      </form>

    </div>

  );
}

export default Register;
