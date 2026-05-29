import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";

function Home() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    axios
      .get("https://ecommerce-project-qvh0.onrender.com/products")
      .then((response) => {

        setProducts(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  const addToCart = (product) => {

    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if(existingProduct) {

      existingProduct.quantity += 1;

    } else {

      cart.push({
        ...product,
        quantity: 1
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Product Added To Cart");

  };

  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/login";

  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px"
      }}
    >

      <div
        style={{
          position: "relative",
          marginBottom: "40px"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            fontSize: "34px",
            color: "#222",
            margin: 0
          }}
        >
          Welcome To My Store
        </h1>

        <div
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            display: "flex",
            alignItems: "center",
            gap: "15px"
          }}
        >

          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              fontSize: "30px"
            }}
          >
            🛒
          </Link>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 16px",
              backgroundColor: "#e53935",
              color: "white",
              border: "none",
              borderRadius: "8px",
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
            Logout
          </button>

        </div>

      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "35px"
        }}
      >

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "350px",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)"
          }}
        />

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
          filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />

          ))
        }

      </div>

    </div>

  );

}

export default Home;
