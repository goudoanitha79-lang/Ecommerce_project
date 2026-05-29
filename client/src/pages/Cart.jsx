import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const increaseQuantity = (index) => {

    const updatedCart = [...cart];

    updatedCart[index].quantity += 1;

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

  };

  const decreaseQuantity = (index) => {

    const updatedCart = [...cart];

    if(updatedCart[index].quantity > 1) {

      updatedCart[index].quantity -= 1;

    }

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

  };

  const removeProduct = (index) => {

    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

  };

  const totalPrice = cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "30px"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "38px",
          color: "#222"
        }}
      >
        Cart Page
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
          cart.length === 0 ? (

            <h2>No Products In Cart</h2>

          ) : (

            cart.map((product, index) => (

              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  width: "180px",
                  borderRadius: "15px",
                  backgroundColor: "white",
                  textAlign: "center",
                  boxShadow: "0px 3px 12px rgba(0,0,0,0.08)",
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
                  src={`https://ecommerce-project-qvh0.onrender.com/uploads/${product.image}`}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    transition: "0.3s ease"
                  }}
                />

                <h3
                  style={{
                    margin: "12px 0 6px 0",
                    fontSize: "18px",
                    color: "#222"
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    margin: "5px 0",
                    color: "#666"
                  }}
                >
                  {product.description}
                </p>

                <h4
                  style={{
                    margin: "8px 0",
                    fontSize: "18px"
                  }}
                >
                  ₹ {product.price}
                </h4>

                <p
                  style={{
                    margin: "6px 0",
                    fontWeight: "bold"
                  }}
                >
                  Qty: {product.quantity}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px",
                    marginTop: "12px"
                  }}
                >

                  <button
                    onClick={() => increaseQuantity(index)}
                    style={{
                      padding: "5px 10px",
                      border: "none",
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    +
                  </button>

                  <button
                    onClick={() => decreaseQuantity(index)}
                    style={{
                      padding: "5px 10px",
                      border: "none",
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    -
                  </button>

                  <button
                    onClick={() => removeProduct(index)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))

          )
        }

      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "40px"
        }}
      >

        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          Total Price: ₹ {totalPrice}
        </h2>

        <button
          onClick={() => navigate("/home")}
          style={{
            padding: "12px 20px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
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
          Continue Shopping
        </button>

      </div>

    </div>

  );

}

export default Cart;
