import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminUsers() {

const [users, setUsers] = useState([]);

const navigate = useNavigate();

useEffect(() => {

```
const admin = localStorage.getItem("admin");

if (!admin) {

  navigate("/admin-login");

  return;

}

axios
  .get("https://ecommerce-project-qvh0.onrender.com/users")
  .then((response) => {

    setUsers(response.data);

  })
  .catch((error) => {

    console.log(error);

  });
```

}, [navigate]);

return (

```
<div
  style={{
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "30px"
  }}
>

  <button
    onClick={() => navigate("/admin")}
    style={{
      padding: "10px 16px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "black",
      color: "white",
      cursor: "pointer",
      marginBottom: "20px"
    }}
  >
    ← Back
  </button>

  <h1
    style={{
      textAlign: "center",
      marginBottom: "40px"
    }}
  >
    All Users
  </h1>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center"
    }}
  >

    {
      users.map((user) => (

        <div
          key={user.id}
          style={{
            width: "240px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "18px",
            boxShadow: "0px 3px 12px rgba(0,0,0,0.08)",
            textAlign: "center",
            transition: "0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >

          <h2
            style={{
              marginBottom: "12px"
            }}
          >
            {user.username}
          </h2>

          <p
            style={{
              color: "#666"
            }}
          >
            {user.email}
          </p>

        </div>

      ))
    }

  </div>

</div>
```

);

}

export default AdminUsers;
