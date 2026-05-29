import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const admin = localStorage.getItem("admin");

if(!admin) {

  window.location.href = "/admin-login";

}

  const handleLogout = () => {

    localStorage.removeItem("admin");

    navigate("/admin-login");

  };

  const cardStyle = {

    height: "180px",

    backgroundColor: "white",

    borderRadius: "20px",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    fontSize: "24px",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",

    transition: "0.3s"

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          fontSize: "40px"
        }}
      >
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 240px)",
          justifyContent: "center",
          gap: "30px"
        }}
      >

        <div
          onClick={() => navigate("/add-product")}
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Add Product
        </div>

        <div
          onClick={() => navigate("/admin/products")}
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          All Products
        </div>

        <div
          onClick={() => navigate("/admin/users")}
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          User Info
        </div>

        <div
          onClick={handleLogout}
          style={{
            ...cardStyle,
            backgroundColor: "black",
            color: "white"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Logout
        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;