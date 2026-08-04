import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminProducts() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {

      navigate("/admin-login");

      return;

    }

    fetchProducts();

  }, [navigate]);

  const fetchProducts = () => {

    axios
      .get("https://ecommerce-project-qvh0.onrender.com/products")
      .then((response) => {

        setProducts(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  };

  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `https://ecommerce-project-qvh0.onrender.com/delete-product/${id}`
      );

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "30px"
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "40px"
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
            transition: "0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ← Back
        </button>

        <h1
          style={{
            margin: 0,
            color: "#222",
            flex: 1,
            textAlign: "center",
            marginRight: "90px"
          }}
        >
          All Products
        </h1>

      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center"
        }}
      >

        {
          products.map((product) => (

            <div
              key={product.id}
              style={{
                width: "220px",
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "18px",
                boxShadow: "0px 3px 12px rgba(0,0,0,0.08)",
                textAlign: "center",
                transition: "0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >

              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "170px",
                  objectFit: "cover",
                  borderRadius: "12px"
                }}
              />

              <h2
                style={{
                  fontSize: "20px",
                  marginTop: "12px",
                  color: "#222"
                }}
              >
                {product.name}
              </h2>

              <p
                style={{
                  color: "#666",
                  fontSize: "14px",
                  minHeight: "40px"
                }}
              >
                {product.description}
              </p>

              <h3
                style={{
                  marginTop: "10px",
                  marginBottom: "15px"
                }}
              >
                ₹ {product.price}
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center"
                }}
              >

                <button
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#2196f3",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default AdminProducts;
