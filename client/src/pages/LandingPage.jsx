import { useNavigate } from "react-router-dom";

function LandingPage() {

  const navigate = useNavigate();

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
          textAlign: "center",
          backgroundColor: "white",
          padding: "60px",
          borderRadius: "25px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
          width: "400px",
          transition: "0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >

        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
            color: "#222"
          }}
        >
          🛍️ My Store
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "40px"
          }}
        >
          Modern Ecommerce Website
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "20px",
            transition: "0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          User Login
        </button>

        <button
          onClick={() => navigate("/admin-login")}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Admin Login
        </button>

      </div>

    </div>

  );

}

export default LandingPage;